(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const Gt=1e-9;function $p(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class as{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return $p(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(i=>Number.isFinite(i.beat)&&Number.isFinite(i.bpm)).slice().sort((i,l)=>i.beat-l.beat);let o=a.length?a[0].bpm:this.bpm;for(const i of a)i.beat<=t.beat+Gt&&(o=i.bpm);const r=[{beat:t.beat,time:t.time,bpm:this.clamp(o)}];for(const i of a){if(i.beat<=t.beat+Gt)continue;const l=this.clamp(i.bpm);l!==r[r.length-1].bpm&&r.push({beat:i.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+Gt){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-Gt;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,o=.25){const r=this.bpmAt(n);if(!(a>0)||!(o>0)){this.setTempoAt(t,n);return}const i=Math.max(1,Math.round(a/o));this.setTempoAt(r,n);for(let l=1;l<=i;l++)this.setTempoAt(r+(t-r)*l/i,n+a*(l-1)/i)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new as({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+Gt)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+Gt)return n[a];return n[0]}}const Sp=Object.freeze({beatsPerBar:4,beatUnit:4}),an=1e-9;function Ap(e){return Math.floor(e+an)}function cc(e,t,n=!1){if(!(t>0))return e;const o=Math.ceil(e/t-an)*t;return n&&o<=e+an?o+t:o}class Ep{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new as({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??Sp}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-an&&(this.stopTime===null||t<this.stopTime-an)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-an?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=Ap(t/n),o=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:o,barPhase:o/n}}nextBar(t,n=!1){return cc(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const dc="nc-clock/snapshot",uc=1;function Mp(e,t="local"){return{format:dc,version:uc,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function Lp(e,t){const n=Tp(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const Ke=e=>typeof e=="number"&&Number.isFinite(e),hi=e=>e===null||Ke(e);function Tp(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==dc&&n("format"),(!Ke(t.version)||Math.floor(t.version)!==uc)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!Ke(t.anchor.beat)||!Ke(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&Ke(a.beat)&&Ke(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!Ke(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!Ke(t.meter.beatUnit))&&n("meter"),(!hi(t.startTime)||!hi(t.stopTime)||!Ke(t.stoppedBeat))&&n("transport times"),t}class Cp{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new Ep(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){Lp(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return Mp(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const Np="nc-sync/1",Fp=1,Pp="nc-sync",zp="nc-sync-leader",Dp=0,pc=.5,hc=.75;function Bp(e){return typeof e=="number"&&Number.isFinite(e)&&e>=pc&&e<=hc?e:null}const No=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Mn=e=>typeof e=="number"&&Number.isFinite(e),fa=e=>typeof e=="string"&&e.length>0;function Op(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==Fp||!fa(t.type)||!fa(t.from)||!Mn(t.term)||!Mn(t.seq)||!Mn(t.sentAt))return null;switch(t.type){case"hello":return fa(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return Mn(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&Mn(t.slot)?t:null;case"ping":case"pong":return fa(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function Rp(e,t,n,a,o){return{proto:Np,from:t,term:n,seq:a,sentAt:o,...e}}function re(){return(performance.timeOrigin+performance.now())/1e3}const Fo=.003,Ip=3,Po=.002+1e-6,qp=.01,fi=500;class mi{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?qp:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=Fo&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const o=n-(this.timeOrigin+a)/1e3,r=this.median(),i=o-r,l=Math.abs(o-this.preStepBase),c=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(i);return!c&&Math.abs(i)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&c===this.pendingBack&&(c||Math.abs(i-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(o,r,c))):(this.pendingStep=i,this.pendingBack=c,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const o=this.heldBase()!==null,r=this.ctx.currentTime,i=r<=this.revertUntil;let l;if(a&&i){const c=this.offsets,d=this.preStep;c.length=0;for(let u=0;u<d.length;u++)c.push(d[u]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:r,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!i){const u=this.offsets,p=this.preStep;p.length=0;for(let h=0;h<u.length;h++)p.push(u[h]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?r+this.stepRevert:-1/0}const c=this.offsets,d=t-n;for(let u=0;u<c.length;u++)c[u]+=d;this.stepCount++,l={stepSeconds:t-n,confirmedAt:r,reanchors:this.stepCount,revert:!1}}if(!o)for(const c of[...this.stepListeners])c(l);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let r=0;r<a;r++){const i=t[r];let l=r-1;for(;l>=0&&n[l]>i;)n[l+1]=n[l],l--;n[l+1]=i}const o=a>>1;return a%2?n[o]:(n[o-1]+n[o])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const o=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(o&&Number.isFinite(o.contextTime)&&Number.isFinite(o.performanceTime)&&o.contextTime>=Fo&&o.performanceTime>0)if(this.waitSince=null,o.contextTime===this.lastStampC&&o.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<fi)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=o.contextTime,this.lastStampP=o.performanceTime,this.stampSince=this.perfNow(),n=o.contextTime-(this.timeOrigin+o.performanceTime)/1e3,a=!0;else if(!o||!(o.contextTime>=Fo)&&!(o.contextTime>0&&!(o.performanceTime>0))){if(o){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<fi)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(Ip,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let o=-1,r=0;for(let l=0;l<n;l++){let c=0;for(let d=0;d<n;d++)Math.abs(t[d]-t[l])<=Po&&c++;c>r&&(o=l,r=c)}if(r<a)return;const i=t[o];for(let l=n-1;l>=0;l--)Math.abs(t[l]-i)>Po&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-this.estimate())<=Po}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const o=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(o,2)};setTimeout(o,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,o=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(o)&&o>0?o:null}}class _p{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...No,...t.capabilities},this.channelOption=t.channel??Pp,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const o=this.o.now(),r=()=>{n===this.startWaits&&t(o)};return a.then(r,r),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const o=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(o),0)}else{const o=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?o:Math.max(t+this.o.gatedStartLeadSeconds,o),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[o,r]=this.tempoRange();t=Math.min(r,Math.max(o,t));const i=this.clock.transport,l=this.o.now();if(!i.running){this.clock.commitTempo(t),this.broadcastState();return}const c=i.beatAt(l+this.o.minLeadSeconds),d=Math.max(n??cc(c,1),c);a&&a>0?(i.tempo.rampTempo(t,d,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,d),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(hc,Math.max(pc,t)):Dp;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=Bp(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=Op(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const o=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...No,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),o||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const r of this.peers.values())r.leader=r.id===n.from;const o=this.peers.get(n.from);o?o.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...No},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(o=>{this.leader&&this.decideStart(o)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const o of[...this.snapshotListeners])o(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const o of[...this.messageListeners])o(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const i=this.releaseLock;this.releaseLock=null,i()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(zp,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(i=>{this.releaseLock=()=>{this.setLeader(!1),i()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(r,i,l)=>[r?0:1,i,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),o=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const i=n(r.capabilities.prefersLeader,r.joinedAt,r.id);(o===null||i[0]<a[0]||i[0]===a[0]&&(i[1]<a[1]||i[1]===a[1]&&i[2]<a[2]))&&(a=i,o=r.id)}this.setLeader(o===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],o=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==o[0]?a[0]<o[0]:a[1]!==o[1]?a[1]<o[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const o=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>o&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(Rp(t,this.id,this.term,++this.seq,this.o.now()))}}const Hp="modulepreload",jp=function(e){return"/nyx/"+e},gi={},Wp=function(t,n,a){let o=Promise.resolve();if(n&&n.length>0){let i=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");o=i(n.map(d=>{if(d=jp(d),d in gi)return;gi[d]=!0;const u=d.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":Hp,u||(h.as="script"),h.crossOrigin="",h.href=d,c&&h.setAttribute("nonce",c),document.head.appendChild(h),u)return new Promise((m,g)=>{h.addEventListener("load",m),h.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(i){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=i,window.dispatchEvent(l),!l.defaultPrevented)throw i}return o.then(i=>{for(const l of i||[])l.status==="rejected"&&r(l.reason);return t().catch(r)})};var Up=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],ir=[.25,.5,.75,1,1.5,2],Yp=4.9,ne={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},St={fmt:"wet"},Ie={fmt:"pct"},Kt={fmt:"db"},ma={fmt:"signedPct"},zo={fmt:"num",suffix:" ms"},Z={div:100};function N(e,t,n,a,o,r,i,l){var c={key:e,label:t,min:n,max:a,default:o,step:1,k:r,unit:null,format:i};if(l)for(var d in l)c[d]=l[d];return c}function ga(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var qn=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[N("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:ne.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[N("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:ne.hpHz,astrid:!0,zero:"off"}),N("q","Resonance",0,100,0,2,{fmt:"q",law:ne.hpQ},{dsp:{law:ne.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[N("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:ne.bpHz,astrid:!0},{dsp:{law:ne.bpHz}}),N("q","Q",0,100,0,2,{fmt:"q",law:ne.bpQ},{dsp:{law:ne.bpQ}}),N("mix","Mix",0,100,100,3,St,{dsp:Z,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[N("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:ga(Up),overriddenBy:"beats_free",tempoSynced:!0}),N("feedback","Feedback",0,90,35,2,Ie,{dsp:Z,unit:"%"}),N("mix","Wet/dry",0,100,0,3,St,{dsp:Z,unit:"%",astridKey:"wet"}),N("tone","Tone",0,100,100,4,{fmt:"hz",law:ne.delayTone,offAt:100},{dsp:{div:99},more:!0}),N("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),N("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:ga([[0,"Insert"],[1,"Send"]]),more:!0}),N("send","Send",0,100,100,7,Ie,{dsp:Z,unit:"%",more:!0}),N("mod_send","Accent → send",-100,100,0,8,ma,{dsp:Z,unit:"%",more:!0}),N("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[N("predelay","Pre-delay",0,200,0,1,zo,{dsp:{div:1e3},unit:"ms"}),N("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:Z,unit:"%"}),N("decay","Decay",0,100,50,3,Ie,{dsp:Z,unit:"%"}),N("damping","Damping",0,100,0,4,Ie,{dsp:Z,unit:"%"}),N("mix","Mix",0,100,0,5,St,{dsp:Z,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[N("rate","Rate",0,100,26,1,{fmt:"rate",law:ne.rate},{dsp:{law:ne.rate}}),N("depth","Depth",0,100,70,2,Ie,{dsp:Z,unit:"%"}),N("feedback","Feedback",-90,90,50,3,ma,{dsp:Z,unit:"%"}),N("mix","Mix",0,100,50,4,St,{dsp:Z,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[N("rate","Rate",0,100,52,1,{fmt:"rate",law:ne.rate},{dsp:{law:ne.rate}}),N("depth","Depth",0,100,50,2,Ie,{dsp:Z,unit:"%"}),N("spread","Spread",0,100,70,3,Ie,{dsp:Z,unit:"%"}),N("mix","Mix",0,100,40,4,St,{dsp:Z,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[N("rate","Rate",0,100,39,1,{fmt:"rate",law:ne.rate},{dsp:{law:ne.rate}}),N("depth","Depth",0,100,70,2,Ie,{dsp:Z,unit:"%"}),N("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:ga([[4,"4"],[6,"6"],[8,"8"]])}),N("feedback","Feedback",0,90,30,4,Ie,{dsp:Z,unit:"%"}),N("mix","Mix",0,100,50,5,St,{dsp:Z,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[N("low_db","Low",-18,18,0,1,Kt,{unit:"dB"}),N("mid_db","Mid",-18,18,0,2,Kt,{unit:"dB"}),N("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:ne.midHz,astrid:!0},{dsp:{law:ne.midHz}}),N("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:ne.eqQ},{dsp:{law:ne.eqQ}}),N("high_db","High",-18,18,0,4,Kt,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[N("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),N("output_db","Output",-12,12,0,2,Kt,{unit:"dB"}),N("mix","Mix",0,100,100,3,St,{dsp:Z,unit:"%"}),N("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:ga([[0,"Smooth"],[1,"Acid"]]),more:!0}),N("tone","Tone",0,100,100,5,{fmt:"hz",law:ne.driveTone,offAt:100},{dsp:{div:99},more:!0}),N("mod_drive","Accent → drive",-100,100,0,6,ma,{dsp:Z,unit:"%",more:!0}),N("mod_tone","Accent → tone",-100,100,0,7,ma,{dsp:Z,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[N("threshold_db","Threshold",-60,0,0,1,Kt,{unit:"dB"}),N("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:ne.ratio},{dsp:{law:ne.ratio}}),N("attack_ms","Attack",1,100,10,3,zo,{unit:"ms"}),N("release_ms","Release",10,1e3,150,4,zo,{unit:"ms"}),N("makeup_db","Makeup",0,24,0,5,Kt,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[N("width","Width",0,200,100,1,Ie,{dsp:Z,unit:"%"}),N("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:Z})]}],Xp=qn.map(function(e){return e.type});qn.filter(function(e){return!e.hidden}).map(function(e){return e.type});var Gp={reverb:"plate"};function os(e){var t=Gp[e]||e;return Xp.indexOf(t)>=0?t:null}function nt(e){for(var t=os(e),n=0;n<qn.length;n++)if(qn[n].type===t)return qn[n];return null}function tn(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function fc(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=tn(n.law,t);return a===null?0:a}function bi(e,t){return Math.min(Yp,e*60/(t>0?t:120))}var yi=function(e){return e>0?"+":e<0?"−":""};function Kp(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function mc(e,t,n){var a=e.format,o;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:yi(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return yi(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(o=tn(a.law,t),o===null?a.zero||"open":a.astrid?Kp(o):o+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+tn(a.law,t).toFixed(1);case"ratio":return tn(a.law,t).toFixed(1)+":1";case"rate":return o=tn(a.law,t),(o<1?o.toFixed(2):o<10?o.toFixed(1):o.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var r=0;r<e.options.length;r++)if(e.options[r].value===t)return e.options[r].label;return String(t);case"tempoMs":return Math.round(bi(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(bi(t,n)*1e3)+" ms"}return String(t)}var Vp=1,ho=["drive","delay","plate"];function Qp(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,o){return mc(e,a,o)},t}var _n=ho.map(function(e){var t=nt(e),n={type:e,label:t.label,dials:t.dials.map(Qp)};return t.tempoSynced&&(n.tempoSynced=!0),n}),Jp={reverb:"plate"};function Ra(e){var t=Jp[e]||e;return ho.indexOf(t)>=0?t:null}function fo(e){for(var t=Ra(e),n=0;n<_n.length;n++)if(_n[n].type===t)return _n[n];return null}function gc(e,t){var n=fo(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function hn(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function vt(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,o=1;o<e.options.length;o++)Math.abs(e.options[o].value-t)<Math.abs(a-t)&&(a=e.options[o].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var r=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*r)/r))+0}function Zp(){return{v:Vp,chain:_n.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function eh(e){return ir.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},ir[0])}function Do(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function th(e){for(var t=Array.isArray(e)?e:Do(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=Zp(),o={},r=[],i=0;i<t.length;i++){var l=t[i];if(Do(l)){var c=Ra(l.type);if(!c){typeof l.type=="string"&&r.push(l.type);continue}if(o[c]){r.push(c);continue}o[c]=!0;var d=a.chain[ho.indexOf(c)],u=Do(l.dials)?l.dials:{};c==="delay"&&u.mix===void 0&&u.wet!==void 0&&(u=Object.assign({},u,{mix:u.wet})),d.bypass=n?l.bypass===!0:l.bypass!==!1,fo(c).dials.forEach(function(p){d.dials[p.key]=vt(p,u[p.key])}),nh(c,d.dials,u)}}return{state:a,dropped:r}}function nh(e,t,n){for(var a=fo(e),o=0;o<a.dials.length;o++){var r=a.dials[o];r.stepWhen&&(t[r.key]=vt(r,n&&typeof n[r.key]=="number"?n[r.key]:t[r.key],hn(r,t)))}}function lr(e){return th(e).state}function ah(e){return JSON.parse(JSON.stringify(e))}var oh=24,cr={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function dr(e,t,n){if(t==="bypass")return n?0:1;var a=gc(e,t)||rh(e,t);return a?fc(a,n):0}function rh(e,t){var n=nt(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var sh={};_n.forEach(function(e){e.dials.forEach(function(t){sh[e.type+"."+t.key]=t.format})});function Bo(e,t){var n=new Float64Array(oh),a=lr(e);return a.chain.forEach(function(o){var r=cr[o.type];n[r.bypass]=o.bypass?0:1,Object.keys(o.dials).forEach(function(i){n[r[i]]=dr(o.type,i,o.dials[i])})}),n}var ih=2,Ia=3,lh=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Ln(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function bc(e,t){var n=nt(e);if(!n)return null;var a={};(t||[]).forEach(function(i){i&&i.id&&(a[i.id]=!0)});for(var o=1;a[n.type+"-"+o];)o++;var r={};return n.dials.forEach(function(i){r[i.key]=i.default}),{id:n.type+"-"+o,type:n.type,bypass:!1,dials:r}}function ch(e){var t=nt(e.type),n=/-(\d+)$/.exec(e.id||"");return(t?t.label:e.type)+(n&&+n[1]>1?" "+n[1]:"")}function dh(e,t,n){var a=e.length-1,o=Math.max(0,Math.min(a,n));if(t<0||t>a||t===o)return e;var r=e.slice(),i=r.splice(t,1)[0];return r.splice(o,0,i),r}function uh(e){return typeof e=="number"&&isFinite(e)?eh(e):e}function wi(e,t,n){var a={};return e.dials.forEach(function(o){var r=t[o.key];r===void 0&&o.astridKey&&(r=t[o.astridKey]),n&&e.type==="delay"&&o.key==="delay_beats"&&(r=uh(r)),a[o.key]=vt(o,r)}),e.dials.forEach(function(o){o.stepWhen&&(a[o.key]=vt(o,typeof t[o.key]=="number"?t[o.key]:a[o.key],hn(o,a)))}),a}function ph(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,o=1/0,r=e.min;r<=e.max;r++){var i=tn(n.law,r),l=i===null?1/0:Math.abs(i-t);l<o&&(o=l,a=r)}return a}}var hh={rate:"rate_hz"};function fh(e,t,n,a){var o={};return e.dials.forEach(function(r){if(!r.more){var i=r.astridKey||hh[r.key]||r.key;o[r.key]=ph(r,t[i])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),o}function mh(e,t){var n=t>0?Math.floor(t):Ia,a=[],o=[],r=[],i=!1,l=!1;Array.isArray(e)?(r=e,l=!0):Ln(e)&&Array.isArray(e.chain)&&(r=e.chain,i=e.v===1,l=e.schema===2);for(var c=[],d=0;d<r.length;d++){var u=r[d];if(Ln(u)&&!(u.type==="limiter"||u.fixed===!0)){var p=os(u.type),h=p&&nt(p);if(!h||i&&["drive","delay","plate"].indexOf(p)<0){typeof u.type=="string"&&a.push(u.type);continue}if(c.length>=n){a.push(u.id||p);continue}var m;Ln(u.params)&&!Ln(u.dials)?m=wi(h,fh(h,u.params,o,u.id||p),l):m=wi(h,Ln(u.dials)?u.dials:{},l);var g=bc(p,c),v=typeof u.id=="string"&&lh.test(u.id)&&!c.some(function(b){return b.id===u.id})?u.id:g.id,f=i?u.bypass!==!1:u.bypass===!0;c.push({id:i?g.id:v,type:p,bypass:f,dials:m})}}return{state:{v:ih,chain:c},dropped:a,notes:o}}function Ea(e,t){return mh(e,t).state}function Vt(e){var t=nt(e.type),n=[[0,e.bypass?0:1]];return t.dials.forEach(function(a){n.push([a.k,fc(a,e.dials[a.key])])}),n}function gh(e){var t=Ea(e,8),n=[],a=t.chain.map(function(o,r){var i=nt(o.type),l={};return r>=Ia&&n.push(o.id+": ASTRID keeps three hacks"),i.dials.forEach(function(c){var d=o.dials[c.key];if(c.more){d!==c.default&&n.push(o.id+"."+c.key);return}c.key==="delay_beats"&&ir.indexOf(d)<0&&n.push(o.id+".delay_beats"),l[c.astridKey||c.key]=d}),{id:o.id,type:o.type,bypass:o.bypass,dials:l}});return{hacks:a,lossy:n}}var bh="nc-fx@1",yh=600,wh=256,vh=8,Tn=typeof WeakMap=="function"?new WeakMap:null;function xh(e,t){var n=Tn&&Tn.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await Wp(async()=>{const{default:r}=await import("./worklet-source-BibsVBZk.js");return{default:r}},[])).default,o=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(o)}finally{URL.revokeObjectURL(o)}})(),Tn&&(Tn.set(e,n),n.catch(function(){Tn.delete(e)})),n)}function Qt(e,t){return typeof e=="number"&&isFinite(e)?e:t}function yc(e,t,n,a){var o=Math.min(400,Math.max(20,Qt(t.bpm,120))),r=[],i=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",c=Qt(t.preGain,1),d=Math.max(0,Qt(t.crossfade,.012)),u=Qt(t.maxDelaySeconds,void 0),p=e.createGain(),h=e.createGain(),m=e.createGain(),g=e.createGain(),v=null;t.modInput===!0&&(v=e.createGain(),v.channelCount=1,v.channelCountMode="explicit",v.channelInterpretation="discrete"),g.gain.value=0,p.connect(m),m.connect(h),g.connect(h);var f={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:o,mUsers:0,lv:null,lvAt:0},b=n(o);f.post=function($){f.node?f.node.port.postMessage($):f.disposed||(r.length>=wh&&(r=a().concat([{t:"tempo",bpm:f.bpm,when:0}]),f.mUsers>0&&r.push({t:"meter",on:!0})),r.push($))};function y($){var k=r.map(function(A){var M=Object.assign({},A);return M.when>$||(M.when=0,M.t!=="clear"&&(M.snap=!0)),M});return r=[],k}f.emit=function($){for(var k=0;k<f.listeners.length;k++)try{f.listeners[k]($)}catch(A){typeof console<"u"&&console.error(A)}},f.whenOf=function($){return typeof $=="number"&&isFinite($)&&$>0?$:0};var w=!1;f.tooFar=function($){return typeof $=="number"&&$>e.currentTime+yh?(!w&&typeof console<"u"&&(w=!0,console.warn("nc-fx: ignoring a time "+Math.round($-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var x=xh(e,t.moduleUrl).then(function(){if(!f.disposed){var $=Object.assign({bpm:o,bypassMode:l,limiter:i,preGain:c,maxDelaySeconds:u},b);$.pending=y(e.currentTime),f.node=new AudioWorkletNode(e,bh,{numberOfInputs:v?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:$}),f.node.port.onmessage=function(A){var M=A.data;M&&M.t==="lv"&&f.mUsers>0&&(f.lv=M.d,f.lvAt=vi())},p.connect(f.node),v&&v.connect(f.node,0,1),f.node.connect(g);var k=e.currentTime;k<=0||d===0?(m.gain.value=0,g.gain.value=1):(m.gain.setValueAtTime(1,k),m.gain.linearRampToValueAtTime(0,k+d),g.gain.setValueAtTime(0,k),g.gain.linearRampToValueAtTime(1,k+d)),f.status="ready"}},function($){f.status="unavailable",r=[],f.error=$});f.meterOpen=function(){return f.disposed||f.status==="unavailable"?!1:(f.mUsers++===0&&f.post({t:"meter",on:!0}),!0)},f.meterClose=function(){f.mUsers!==0&&--f.mUsers===0&&(f.lv=null,f.disposed||f.post({t:"meter",on:!1}))},f.levels=function(){return f.lv&&vi()-f.lvAt<kh?f.lv:null};var S={};return f.meter=function($,k){if(S[$])return S[$];var A=0,M={in:0,out:0},H={open:function(){return f.meterOpen()?(A++,!0):!1},close:function(){A!==0&&(A--,f.meterClose())},read:function(){var j=A>0?f.levels():null;return M.in=0,M.out=0,j&&k(j,M),M}};return S[$]=H,H},f.core={input:p,output:h,modInput:v,ready:x,get status(){return f.status},get error(){return f.error},latencySamples:i==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:i,setTempo:function($,k){var A=Qt($,NaN);!(A>0)||f.disposed||f.tooFar(k)||(f.bpm=Math.min(400,Math.max(20,A)),f.post({t:"tempo",bpm:f.bpm,when:f.whenOf(k)}),f.emit({effect:null,key:"tempo",value:f.bpm}))},getTempo:function(){return f.bpm},clear:function($){var k=$&&typeof $=="object"?$:{at:$};if(!(f.disposed||f.tooFar(k.at))){var A=Qt(k.fadeMs,0);f.post({t:"clear",when:f.whenOf(k.at),fadeMs:A>0?Math.min(1e3,A):0})}},onChange:function($){return f.listeners.push($),function(){var k=f.listeners.indexOf($);k>=0&&f.listeners.splice(k,1)}},dispose:function(){if(!f.disposed){if(f.disposed=!0,f.status="disposed",r=[],f.listeners.length=0,f.node){f.node.port.postMessage({t:"dispose"}),f.node.port.close();try{f.node.disconnect()}catch{}}[p,m,g,h,v].forEach(function($){try{$&&$.disconnect()}catch{}})}}},f}var kh=250;function vi(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function wc(e,t){t.in=e[0],t.out=e[1]}function $h(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function Sh(e,t){var n=t||{};if(n.slots)return Ah(e,n);var a=lr(n.state),o=Array.from(Bo(a)),r=yc(e,n,function(){return{program:o}},function(){return[{t:"load",program:Array.from(Bo(a)),when:0}]}),i=r.core;function l(c){return a.chain[ho.indexOf(c)]}return i.setParam=function(c,d,u,p){var h=Ra(c);if(!(!h||r.disposed||r.tooFar(p))){var m=l(h),g;if(d==="bypass")g=!!u;else{var v=gc(h,d);if(!v)return;g=vt(v,u,hn(v,m.dials))}return d==="bypass"?m.bypass=g:m.dials[d]=g,r.post({t:"p",i:cr[h][d],v:dr(h,d,g),when:r.whenOf(p)}),r.emit({effect:h,key:d,value:g}),fo(h).dials.forEach(function(f){if(!(!f.stepWhen||!f.stepWhen.some(function(w){return w.key===d}))){var b=m.dials[f.key],y=vt(f,b,hn(f,m.dials));y!==b&&(m.dials[f.key]=y,r.post({t:"p",i:cr[h][f.key],v:dr(h,f.key,y),when:r.whenOf(p)}),r.emit({effect:h,key:f.key,value:y}))}}),g}},i.meter=function(){return r.meter("",wc)},i.getParam=function(c,d){var u=Ra(c);if(u){var p=l(u);return d==="bypass"?p.bypass:p.dials[d]}},i.getState=function(){return ah(a)},i.setState=function(c,d){r.disposed||r.tooFar(d&&d.at)||(a=lr(c),r.post({t:"load",program:Array.from(Bo(a)),when:r.whenOf(d&&d.at)}),r.emit({effect:null,key:null,value:null}))},i}function Ah(e,t){var n=t.slots===!0?Ia:Math.max(1,Math.min(vh,Math.floor(+t.slots)||Ia)),a=Ea(t.state,n),o=1,r={};function i(f){return r[f.id]||(r[f.id]=o++),r[f.id]}function l(f){return f.map(function(b){return{uid:i(b),type:b.type,program:Vt(b)}})}var c=l(a.chain),d=a.chain.map(function(f){return r[f.id]}),u=yc(e,t,function(){return{slots:n,chain:c,order:d}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(f){return r[f.id]}),when:0}]}),p=u.core;function h(f){var b;for(b=0;b<a.chain.length;b++)if(a.chain[b].id===f)return a.chain[b];var y=os(f);if(y){for(b=0;b<a.chain.length;b++)if(a.chain[b].type===y)return a.chain[b]}return null}function m(f,b){var y=i(f);u.post({t:"add",uid:y,type:f.type,when:b}),Vt(f).forEach(function(w){u.post({t:"ps",uid:y,k:w[0],v:w[1],when:b,snap:!0})})}function g(f){u.post({t:"order",uids:a.chain.map(function(b){return r[b.id]}),when:f})}function v(f,b){var y={};a.chain.forEach(function(S){y[S.id]=S});var w=a.chain.map(function(S){return r[S.id]}).join();f.chain.forEach(function(S){var $=y[S.id];if(!$||$.type!==S.type){delete r[S.id],m(S,b);return}var k={};Vt($).forEach(function(A){k[A[0]]=A[1]}),Vt(S).forEach(function(A){k[A[0]]!==A[1]&&u.post({t:"ps",uid:r[S.id],k:A[0],v:A[1],when:b})})});var x={};f.chain.forEach(function(S){x[S.id]=!0}),Object.keys(r).forEach(function(S){x[S]||delete r[S]}),a=f,a.chain.map(function(S){return r[S.id]}).join()!==w&&g(b)}return p.slots=n,p.meter=function(f){return f==null||f===""?u.meter("",wc):u.meter("#"+f,function(b,y){var w=h(f),x=w?r[w.id]:0,S=b[2];if(x){for(var $=3,k=0;k<S;k++,$+=3)if(b[$]===x){y.in=b[$+1],y.out=b[$+2];return}}})},p.setParam=function(f,b,y,w){var x=h(f);if(!(!x||u.disposed||u.tooFar(w))){var S=nt(x.type),$,k=null;if(b==="bypass")$=!!y;else{for(var A=0;A<S.dials.length;A++)S.dials[A].key===b&&(k=S.dials[A]);if(!k)return;$=vt(k,y,hn(k,x.dials))}var M={},H={};Vt(x).forEach(function(P){M[P[0]]=P[1]}),S.dials.forEach(function(P){P.stepWhen&&(H[P.key]=x.dials[P.key])}),b==="bypass"?x.bypass=$:x.dials[b]=$,S.dials.forEach(function(P){P.stepWhen&&(x.dials[P.key]=vt(P,x.dials[P.key],hn(P,x.dials)))});var j=u.whenOf(w),O=r[x.id];return Vt(x).forEach(function(P){(M[P[0]]!==P[1]||k&&P[0]===k.k)&&u.post({t:"ps",uid:O,k:P[0],v:P[1],when:j})}),u.emit({effect:x.id,key:b,value:$}),Object.keys(H).forEach(function(P){P!==b&&x.dials[P]!==H[P]&&u.emit({effect:x.id,key:P,value:x.dials[P]})}),$}},p.getParam=function(f,b){var y=h(f);if(y)return b==="bypass"?y.bypass:y.dials[b]},p.getState=function(){return JSON.parse(JSON.stringify(a))},p.setState=function(f,b){u.disposed||u.tooFar(b&&b.at)||(v(Ea(f,n),u.whenOf(b&&b.at)),u.emit({effect:null,key:null,value:null}))},p.addEffect=function(f,b){var y=b||{},w=bc(f,a.chain);if(!(!w||a.chain.length>=n||u.disposed||u.tooFar(y.at))){if(y.dials){var x=Ea({v:2,chain:[{id:w.id,type:w.type,dials:y.dials}]},1).chain[0];w.dials=x.dials}y.bypass===!0&&(w.bypass=!0);var S=a.chain.slice(),$=typeof y.index=="number"?Math.max(0,Math.min(S.length,y.index)):S.length;return S.splice($,0,w),v({v:2,chain:S},u.whenOf(y.at)),u.emit({effect:w.id,key:"chain",value:"add"}),w.id}},p.removeEffect=function(f,b){var y=h(f),w=b&&b.at;return!y||u.disposed||u.tooFar(w)?!1:(v({v:2,chain:a.chain.filter(function(x){return x!==y})},u.whenOf(w)),u.emit({effect:y.id,key:"chain",value:"remove"}),!0)},p.moveEffect=function(f,b,y){var w=h(f),x=y&&y.at;if(!w||u.disposed||u.tooFar(x))return!1;var S=dh(a.chain,a.chain.indexOf(w),b);return S===a.chain?!1:(v({v:2,chain:S},u.whenOf(x)),u.emit({effect:w.id,key:"chain",value:"move"}),!0)},p.getChain=function(){return a.chain.map(function(f){return{id:f.id,type:f.type,name:ch(f),bypass:f.bypass}})},p.toAstrid=function(){return gh(a)},p}function xi(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function Eh(e,t,n){var a=n||{},o=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,r=typeof a.toAudioTime=="function"?a.toAudioTime:o?function(h){return o.toContextTime(h)}:t&&t.timebase==="shared"?null:function(h){return h},i=typeof a.now=="function"?a.now:o&&typeof o.sharedNow=="function"?function(){return o.sharedNow()}:null,l=t&&t.transport?t.transport:t,c=l&&l.tempo?l.tempo:l,d=!1;function u(h){if(!r){!d&&typeof console<"u"&&(d=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof h!="number")){var m=r(l.timeAt(h));return typeof m=="number"&&isFinite(m)?m:void 0}}function p(){var h=i&&l&&typeof l.beatAt=="function"?l.beatAt(i()):NaN;if(!isFinite(h)){var m=l&&typeof l.bpm=="number"?l.bpm:xi(c,0);m>0&&e.setTempo(m);return}var g=xi(c,h);g>0&&e.setTempo(g);for(var v=c&&(c.points||c.tempoPoints)||[],f=0;f<v.length;f++){var b=v[f];if(b.beat>h&&b.bpm>0){var y=u(b.beat);y!==void 0&&e.setTempo(b.bpm,y)}}}return p(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(h){h&&(h.kind==="tempo"&&h.bpm>0?e.setTempo(h.bpm,u(h.atBeat)):(h.kind==="snapshot"||h.kind==="start")&&p())})}const Mh="/nyx/assets/worklet-CAv1bvAp.js";var Lh="nc-ui",Th={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},rs={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},qa={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Ch={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},gt={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Nh={light:{color:Th.color,semantic:rs,component:qa,runtime:Ch},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},Dn=e=>`--${Lh}-${e}`,ur=rs["label-on-fill-dark"],ki=rs["label-on-fill-light"],Fh=gt["label-min-contrast"],Ph=/^#[0-9a-f]{6}$/i,zh=e=>typeof e=="string"&&Ph.test(e),Ma=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function $i(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),o=r=>{let i=(r+e/30)%12;return n-a*Math.max(-1,Math.min(i-3,9-i,1))};return`#${Ma(o(0)*255)}${Ma(o(8)*255)}${Ma(o(4)*255)}`}function vc(e){let[t,n,a]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),o=Math.max(t,n,a),r=Math.min(t,n,a),i=(o+r)/2,l=o-r;if(!l)return{h:0,s:0,l:i};let c=l/(1-Math.abs(2*i-1));return{h:((o===t?60*((n-a)/l%6):o===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:c,l:i}}function Si(e){let[t,n,a]=[1,3,5].map(o=>{let r=parseInt(e.slice(o,o+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function pr(e,t){let[n,a]=[Si(e),Si(t)].sort((o,r)=>r-o);return(n+.05)/(a+.05)}var _a=e=>pr(e,ur)>=pr(e,ki)?ur:ki;function xc(e,t,n,a=Fh){let o=$i(e,t,n),r=_a(o)===ur?1:-1;for(let i=0;i<40&&pr(o,_a(o))<a;i++)n+=r*.01,o=$i(e,t,n);return o}function Dh(e){let{h:t,s:n}=vc(e),a=xc(t,Math.min(n,gt["surprise-on-max-saturation"]),gt["surprise-on-lightness"]);return{fill:e,ink:_a(e),on:a,onInk:_a(a)}}var Bh=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function Oh(e,t=Math.random){let[n,a]=gt["surprise-saturation"],[o,r]=gt["surprise-lightness"],i=gt["surprise-min-hue-gap"],l=zh(e)?vc(e).h:null,c=t()*360;return l!==null&&Bh(c,l)<i&&(c=(l+i+t()*(360-2*i))%360),xc(c,n+t()*(a-n),o+t()*(r-o))}function Rh(e){if(!e)return null;let t=Dh(e);return{[Dn("surprise-fill")]:t.fill,[Dn("surprise-ink")]:t.ink,[Dn("surprise-on")]:t.on,[Dn("surprise-on-ink")]:t.onInk}}var Ih=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,qh=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Ai(e){let[t,n,a]=[1,3,5].map(l=>Ih(parseInt(e.slice(l,l+2),16)/255)),o=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),r=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),i=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*o+.793617785*r-.0040720468*i,1.9779984951*o-2.428592205*r+.4505937099*i,.0259040371*o+.7827717662*r-.808675766*i]}function _h([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,o=(e-.1055613458*t-.0638541728*n)**3,r=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*o+.2309699292*r,-1.2684380046*a+2.6097574011*o-.3413193965*r,-.0041960863*a-.7034186147*o+1.707614701*r].map(i=>Ma(qh(Math.max(0,Math.min(1,i)))*255)).join("")}`.toUpperCase()}var Hh=gt["velocity-range"],kc={min:qa.rhythm["velocity-min"],max:qa.rhythm["velocity-max"]},Ei=Object.fromEntries(Object.entries(Nh).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function jh(e,t=kc){let[n,a]=Hh,o=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,r=(o-n)/(a-n),i=t.ink??qa.rhythm["step-cell-ink"];if(r<=0)return{velocity:o,t:0,fill:t.min.toUpperCase(),ink:i};if(r>=1)return{velocity:o,t:1,fill:t.max.toUpperCase(),ink:i};let l=Ai(t.min),c=Ai(t.max);return{velocity:o,t:r,fill:_h(l.map((d,u)=>d+(c[u]-d)*r)),ink:i}}function Mi(e,t=kc){return{[Dn("velocity-fill")]:jh(e,t).fill}}var $c="data-nc-theme",Li="nc-ui-theme-change",Wh="(prefers-color-scheme: dark)",Sc=e=>e?.documentElement??null,Ac=e=>e?.defaultView?.matchMedia?.(Wh)??null,Uh=e=>e==="light"||e==="dark"?e:"system";function Yh(e=globalThis.document){return Uh(Sc(e)?.getAttribute($c))}function hr(e=globalThis.document){let t=Yh(e);return t!=="system"?t:Ac(e)?.matches?"dark":"light"}function Ec(e,t=globalThis.document){let n=Sc(t);if(!n)return()=>{};let a=hr(t),o=()=>{let c=hr(t);c!==a&&(a=c,e(c))},r=t.defaultView?.MutationObserver,i=r?new r(o):null;i?.observe(n,{attributes:!0,attributeFilter:[$c]});let l=Ac(t);return l?.addEventListener?.("change",o),t.addEventListener(Li,o),()=>{i?.disconnect(),l?.removeEventListener?.("change",o),t.removeEventListener(Li,o)}}var Xh={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Gh={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Kh={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Vh={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},mo={};for(let[e,t]of Object.entries(Gh))mo[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(Vh))mo[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Kh))mo[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(Xh.renames.map(e=>[e.old,e.new]));function Mc(e){let t=mo[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function G(e){return Mc(e).prop}function s(e){return`var(${G(e)})`}function Qh(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(G(t)));return Number.isFinite(n)?n:0}function se(e,t){let n=Mc(t),a=e.ownerDocument??document,o=a.createElement("span");o.dataset.ncLive=t,o.style.position="absolute",o.style.pointerEvents="none";let r=`var(${n.prop})`;n.kind==="family"?o.style.fontFamily=r:n.kind==="length"||n.kind==="other"||n.kind==="duration"?o.style.paddingLeft=r:o.style.color=r,(e instanceof Element?e:a.documentElement).append(o);let i=(a.defaultView??window).getComputedStyle(o),l=n.kind==="family"?i.fontFamily:n.kind==="color"?i.color:i.paddingLeft;return o.remove(),l}function Lc(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function Jh(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=s("font-ui"),n.style.fontSize=s("label-size"),n.style.fontWeight=s("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var Zh="[data-modulated], [data-modulated] *";function Oo(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function Ti(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${s("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${s("hairline")} solid ${s("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function ef(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${s(`module-bg-stack-${a}`)};
      ${G("text-sub")}: ${s(`module-sub-stack-${a}`)};
      ${G("divider")}: ${s(`module-div-stack-${a}`)};
      ${G("slider-track")}: ${s(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${s(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${s(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${s("module-bg-stack-1")};
      ${G("text-sub")}: ${s("module-sub-stack-1")};
      ${G("divider")}: ${s("module-div-stack-1")};
    }`;return`
*, *::before, *::after { box-sizing: border-box; }
html, body {
  margin: 0;
  background: ${s("surface-page")};
  color: ${s("text")};
  font-family: ${s("font-ui")};
  font-size: ${s("body-size")};
  font-weight: ${s("title-weight")};
  line-height: ${s("label-leading")};
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
  padding: ${s("page-pad-y")} ${s("page-pad-x")};
}
.nc-page-hd {
  display: flex;
  flex-direction: column;
  gap: ${s("page-action-gap")};
  min-width: 0;
  padding-bottom: ${s("page-head-gap")};
  border-bottom: ${s("hairline")} solid ${s("divider")};
  position: relative;
  /* Its own layer above the page body: the band sits behind the header's content, and a menu that opens from the
     header (Bass's and Rhythm's phone menu) draws over the modules, not under them. */
  z-index: ${s("page-head-layer")};
}
/* The title band (Peter): page-head-bg from the top of the page down to the header's divider, edge to edge. It
   reaches into the page's padding, so it never widens the page; the divider keeps its inset. */
.nc-page-hd::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: calc(${s("page-pad-y")} * -1);
  bottom: 0;
  left: calc(${s("page-pad-x")} * -1);
  right: calc(${s("page-pad-x")} * -1);
  background: ${s("page-head-bg")};
  pointer-events: none;
}
.nc-page-body { min-width: 0; padding-top: ${s("page-body-gap")}; }
/* Page title (ASTRID: "ASTRID / SYNTH / 01"), the line under it, and the header's text actions (Save, Load, Panic). */
.nc-page-title {
  margin: 0;
  font-size: ${s("page-title-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("page-title-tracking")};
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-page-sub { margin: ${s("page-sub-gap")} 0 0; font-size: ${s("page-sub-size")}; color: ${s("text-sub")}; }
.nc-page-title .nc-page-sep { color: ${s("text-sub")}; }
.nc-page-actions { display: flex; flex-wrap: wrap; align-items: flex-end; gap: ${s("control-gap")} ${s("page-action-gap")}; min-width: 0; }
.nc-page-action {
  border: 0;
  border-bottom: ${s("hairline")} solid transparent;
  background: transparent;
  padding: 0 0 ${s("control-gap")};
  color: ${s("text-sub")};
  font-size: ${s("label-size")};
  font-weight: ${s("control-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, border-color;
  transition-duration: ${s("transition-feedback")};
}
.nc-page-action:hover { color: ${s("text")}; border-bottom-color: ${s("text")}; }
.nc-page-action:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("control-gap")}; }
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
    min-width: ${s("target-min")};
    min-height: ${s("target-min")};
    /* The bars' right edge on the page gutter, as the text actions' last word. */
    margin-inline-end: calc((${s("target-min")} - ${s("target-min")} / 2.75) / -2);
    padding: 0;
    border: 0;
    background: transparent;
    color: ${s("text")};
    cursor: pointer;
  }
  .nc-page-menu-btn > svg { width: calc(${s("target-min")} / 2.75); height: calc(${s("target-min")} / 2.75); fill: currentColor; }
  .nc-page-menu-btn:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: calc(${s("focus-width")} * -1); }
  .nc-page-menu[data-nc-open] {
    position: absolute;
    top: calc(100% + ${s("hairline")});
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding-block: ${s("control-gap")};
    background: ${s("surface-page")};
    color: ${s("text")};
    border-bottom: ${s("hairline")} solid ${s("divider")};
  }
  /* Under a kit header: edge to edge, the items on the page gutter. */
  .nc-page-hd .nc-page-menu[data-nc-open] {
    left: calc(${s("page-pad-x")} * -1);
    right: calc(${s("page-pad-x")} * -1);
    padding-inline: ${s("page-pad-x")};
  }
  .nc-page-menu[data-nc-open] button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: ${s("target-min")};
    margin: 0;
    padding: 0;
    border: 0;
    text-align: left;
    color: ${s("text")};
  }
  .nc-page-menu[data-nc-open] button:focus-visible { outline-offset: calc(${s("focus-width")} * -1); }
  .nc-page-menu[data-nc-open] > .nc-field { width: auto !important; padding-block: ${s("control-gap")}; }
  /* The header with a menu keeps one row on a phone: the title at the left (cut only if it must be), the kept
     actions and the ☰ at the right. */
  .nc-page-hd:has(.nc-page-menu-btn) { flex-direction: row; align-items: center; justify-content: space-between; gap: ${s("header-gap")}; }
  .nc-page-hd:has(.nc-page-menu-btn) > :first-child { min-width: 0; }
  .nc-page-actions:has(> .nc-page-menu-btn) { flex: none; flex-wrap: nowrap; align-items: center; }
}
@media (min-width: 768px) and (max-width: 768px) {
  .nc-page-hd .nc-page-menu[data-nc-open] {
    left: calc(${s("page-pad-x-md")} * -1);
    right: calc(${s("page-pad-x-md")} * -1);
    padding-inline: ${s("page-pad-x-md")};
  }
}
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
  gap: ${s("header-gap")};
  min-width: 0;
}
.nc-module[data-nc-open="true"] .nc-module-hd { margin-bottom: ${s("head-margin")}; }
/* A compact header (defineModule compact): the title at the slim size and the index on one slim line, a small gap
   under it. For a module that sits over others (the Studio's Mix). */
.nc-module[data-nc-compact] .nc-title { font-size: ${s("title-size-slim")}; }
.nc-module[data-nc-compact][data-nc-open="true"] .nc-module-hd { margin-bottom: ${s("head-margin-compact")}; }
.nc-module[data-nc-compact]:not([data-nc-slim]) { padding-top: ${s("module-gap")}; }
.nc-module[data-nc-compact][data-nc-slim] { padding-block: ${s("module-gap")}; }
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
.nc-module-end { display: flex; align-items: baseline; gap: ${s("header-gap")}; flex: none; }
.nc-index {
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  color: ${s("text-sub")};
}
.nc-hide, .nc-slim {
  padding: 0 ${s("control-gap")};
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("body-size")};
  line-height: ${s("label-leading")};
  cursor: pointer;
  transition: none;
}
.nc-slim {
  display: flex;
  align-items: center;
  gap: ${s("module-gap")};
  flex: 1;
  min-width: 0;
  margin-top: ${s("module-gap")};
  text-align: left;
}
.nc-hide:hover, .nc-slim:hover { color: ${s("text")}; }
.nc-hide:focus-visible, .nc-slim:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("control-gap")};
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
.nc-section { display: flex; flex-direction: column; gap: ${s("module-gap")}; min-width: 0; }
.nc-row, .nc-field, .nc-controls, .nc-slot-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${s("module-gap")};
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
.nc-field .nc-label { flex: 0 1 auto; min-width: min(${s("name-width")}, 100%); }
/* A value never gives way to its label: it keeps its width (flex: none), so a long label is cut first and 0.3 stays
   0.3. Only a value that is itself longer than the row beside a name-width label is cut, with an ellipsis. The control
   beside it (range, knob, canvas, select) keeps its size. */
.nc-field .nc-readout {
  flex: none;
  min-width: 0;
  max-width: calc(100% - ${s("name-width")} - ${s("module-gap")});
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-field .nc-range, .nc-field .nc-canvas { flex: 1 1 0; min-width: 0; }
/* A display beside a label keeps the width it has next to a column-wide label: a long label is cut, not the display. */
.nc-field > .nc-label + .nc-canvas { min-width: calc(100% - ${s("name-width")} - ${s("module-gap")}); }
/* ASTRID slider rows: label and value on one baseline, the slider full width under them. */
.nc-field[data-nc-slider] {
  display: grid;
  grid-template-columns: minmax(min(${s("name-width")}, 100%), 1fr) auto;
  grid-template-areas: "label value" "range range";
  align-items: baseline;
  column-gap: ${s("module-gap")};
  row-gap: ${s("control-gap")};
  padding-bottom: ${s("module-gap")};
}
.nc-field[data-nc-slider] .nc-label { grid-area: label; min-width: 0; }
/* In the slider grid the value column is auto (sized to the value), so the flex-row cap does not apply. */
.nc-field[data-nc-slider] .nc-readout { grid-area: value; max-width: none; text-align: right; }
.nc-field[data-nc-slider] .nc-range { grid-area: range; width: 100%; margin: 0; }
/* Tap tempo: a small outlined button on the label line, between the label and the value. */
.nc-field[data-nc-slider]:has(> .nc-tap) {
  grid-template-columns: minmax(min(${s("name-width")}, 100%), 1fr) auto auto;
  grid-template-areas: "label tap value" "range range range";
}
.nc-tap {
  grid-area: tap;
  position: relative;
  align-self: center;
  padding: 0 ${s("control-gap")};
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  line-height: ${s("label-leading")};
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
  bottom: calc(-1 * ${s("control-gap")});
  width: max(100%, ${s("target-min")});
  height: max(100%, ${s("target-min")});
  transform: translateX(-50%);
}
/* The chip's ::before is already its touch box and stops at the slider; a hit pad on top of it covered the top
   half of the tempo slider, so a drag there tapped instead (Rhythm #40). */
.nc-tap > .nc-hit { display: none; }
.nc-tap:hover { border-color: ${s("text-sub")}; color: ${s("text")}; }
.nc-tap:active { background: ${s("text")}; border-color: ${s("text")}; color: ${s("surface-page")}; }
.nc-tap:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
/* ASTRID row spacing: a 48 px row every 72 px (measured on ASTRID's VCA at 1280 and 390). */
/* A flat phone-only group's sliders count as the section's own (group.js, collapse: "phone"). */
.nc-section:is(:has(> .nc-field[data-nc-slider]), :has(> .nc-group[data-nc-collapse="phone"] > .nc-group-body > .nc-field[data-nc-slider])) { row-gap: ${s("module-pad")}; }
.nc-section[data-nc-inset="true"] {
  margin-inline: calc(${s("module-pad")} * -1);
  margin-bottom: calc(${s("module-pad")} * -1);
  padding: ${s("module-pad")};
}
.nc-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: ${s("slider-pitch")};
  background: transparent;
  cursor: pointer;
  transition: none;
  accent-color: ${s("accent")};
}
/* Dimming is by colour, never opacity (plan 5.1): a disabled or bypassed control's label, value, track and thumb go
   to text-sub at full strength, so every pair keeps its contrast (Lucy's panel fix: 38 of 38 pairs pass). */
.nc-range:disabled { cursor: not-allowed; accent-color: ${s("text-sub")}; }
.nc-range:disabled::-webkit-slider-thumb { background: ${s("text-sub")}; }
.nc-range:disabled::-moz-range-thumb { background: ${s("text-sub")}; }
.nc-range:disabled::-moz-range-progress { background: ${s("text-sub")}; }
[data-nc-dim="true"] .nc-label, [data-nc-dim="true"] .nc-readout, [data-nc-dim="true"] .nc-ui-fx-name, [data-nc-dim="true"] .nc-ui-fx-fold-name,
[data-nc-dim="true"] .nc-select { color: ${s("text-sub")}; }
[data-nc-dim="true"] .nc-range { accent-color: ${s("text-sub")}; }
[data-nc-dim="true"] .nc-range::-webkit-slider-thumb { background: ${s("text-sub")}; }
[data-nc-dim="true"] .nc-range::-moz-range-thumb { background: ${s("text-sub")}; }
[data-nc-dim="true"] .nc-range::-moz-range-progress { background: ${s("text-sub")}; }
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
${Zh} { transition: none; }
.nc-range:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("control-gap")}; }
.nc-btn {
  width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: ${s("hairline")} solid ${s("text")};
  background: transparent;
  color: ${s("text")};
  min-height: ${s("target-min")};
  padding: ${s("button-pad-y")} 0;
  font-size: ${s("readout-size")};
  letter-spacing: ${s("button-tracking")};
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
  outline-offset: ${s("control-gap")};
}
.nc-btn:disabled { color: ${s("text-sub")}; border-color: ${s("divider")}; cursor: not-allowed; }
.nc-toggle {
  border: 0;
  border-bottom: ${s("hairline")} solid transparent;
  background: transparent;
  color: ${s("text-sub")};
  font-size: ${s("label-size")};
  font-weight: ${s("control-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  padding: 0 0 ${s("control-gap")};
  cursor: pointer;
  align-self: flex-start;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition-property: color, border-color;
  transition-duration: ${s("transition-feedback")};
}
.nc-toggle:hover, .nc-toggle[aria-pressed="true"] { color: ${s("text")}; }
.nc-toggle:hover { border-bottom-color: ${s("text")}; }
.nc-toggle[aria-pressed="true"] { border-bottom-color: ${s("accent")}; }
.nc-toggle[data-nc-role="mute"][aria-pressed="true"] { color: ${s("rhythm.track-mute")}; }
.nc-toggle[data-nc-role="solo"][aria-pressed="true"] {
  color: ${s("rhythm.track-solo")};
  border-bottom-color: ${s("rhythm.track-solo")};
}
.nc-toggle:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("control-gap")};
}
/* Underline tabs (ASTRID .nc-seg): words on a hairline, the chosen one in text with a tab-mark accent bar on the
   line. Radio semantics stay (role="radio", aria-checked). */
.nc-seg {
  display: flex;
  border-bottom: ${s("hairline")} solid ${s("divider")};
  margin-bottom: ${s("module-gap")};
  min-width: 0;
}
.nc-seg > button {
  flex: 1 1 0;
  position: relative;
  min-width: 0;
  padding: ${s("tab-pad-y")} 0;
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  font-size: ${s("tab-size")};
  font-weight: ${s("control-weight")};
  white-space: nowrap;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${s("transition-feedback")};
}
.nc-seg:has(> button:nth-child(4)) > button { font-size: ${s("label-size")}; padding-inline: ${s("control-gap")}; }
.nc-seg > button:hover { color: ${s("text")}; }
.nc-seg > button[aria-checked="true"] { color: ${s("text")}; }
.nc-seg > button[aria-checked="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${s("hairline")} * -1);
  height: ${s("tab-mark")};
  background: ${s("accent")};
}
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
  padding: ${s("control-gap")} ${s("select-pad-end")} ${s("control-gap")} 0;
  cursor: pointer;
  transition: none;
}
.nc-select:hover:not(:disabled) { border-bottom-color: ${s("text-sub")}; }
.nc-select:focus-visible { outline: none; border-bottom-color: ${s("accent")}; }
/* Slots on one line, Morph under them as a slider row (label and value, then the slider). */
.nc-slot-row { flex-direction: column; align-items: stretch; gap: ${s("module-gap")}; }
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
  line-height: ${s("label-leading")};
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
  top: ${s("control-gap")};
  right: ${s("control-gap")};
  width: ${s("control-gap")};
  height: ${s("control-gap")};
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
  gap: ${s("header-gap")};
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
  flex: 0 1 ${s("name-width")};
  width: ${s("name-width")};
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
/* Also selected (multi-select): the same tint, no marker; the name underlined. */
.nc-row[data-picked="true"] { background: ${s("accent-tint")}; }
.nc-row[data-picked="true"] .nc-name,
.nc-row[data-selected="true"] .nc-name {
  color: ${s("text")};
  text-decoration: underline;
  text-decoration-color: ${s("accent")};
  text-decoration-thickness: ${s("hairline")};
  text-underline-offset: ${s("control-gap")};
}
/* On the tint, off steps and unlit M/S are paper squares (step-cell-off), as in the mockup, so their outlines stay
   crisp instead of melting into the tint. */
.nc-row[data-selected="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-selected="true"] .nc-ms:not([aria-pressed="true"]),
.nc-row[data-picked="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-picked="true"] .nc-ms:not([aria-pressed="true"]) { background: ${s("rhythm.step-cell-off")}; }
/* Moves (renderMoves): a label column, then quiet square icon buttons that darken on hover (Bass's look). */
.nc-moves { display: flex; flex-direction: column; gap: ${s("move-row-gap")}; margin-top: ${s("page-body-gap")}; }
.nc-moves-row { display: flex; align-items: center; gap: ${s("module-gap")}; }
.nc-moves-label {
  flex: none;
  width: ${s("move-label-width")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  color: ${s("text-sub")};
}
.nc-moves-btns { display: flex; flex-wrap: wrap; gap: ${s("move-gap")}; min-width: 0; }
.nc-moves-btn {
  display: grid;
  place-items: center;
  width: ${s("move-size")};
  height: ${s("move-size")};
  padding: 0;
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text-sub")};
  cursor: pointer;
}
.nc-moves-icon { width: ${s("move-icon")}; height: ${s("move-icon")}; }
.nc-moves-btn:hover:not(:disabled) { color: ${s("text")}; border-color: ${s("text-sub")}; }
.nc-moves-btn:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-moves-btn:disabled { color: ${s("divider")}; cursor: default; }
@media (pointer: coarse) {
  .nc-moves-btn { width: ${s("target-min")}; height: ${s("target-min")}; }
}
/* Muted, or silenced by another lane's solo: the lane's steps dim by colour, not just its button. On steps fill with
   text-sub (the velocity shade is set aside while silent), off steps keep only a divider outline. */
.nc-row[data-silent="true"] .nc-step { border-color: ${s("divider")}; }
.nc-row[data-silent="true"] .nc-step[aria-pressed="true"] { background: ${s("text-sub")}; border-color: ${s("text-sub")}; }
.nc-name[data-nc-lane="1"] { color: ${s("rhythm.lane-1")}; }
.nc-name[data-nc-lane="2"] { color: ${s("rhythm.lane-2")}; }
.nc-name[data-nc-lane="3"] { color: ${s("rhythm.lane-3")}; }
.nc-name[data-nc-lane="4"] { color: ${s("rhythm.lane-4")}; }
.nc-ms-wrap {
  position: relative;
  flex: 0 0 ${s("slider-pitch")};
  height: ${s("slider-pitch")};
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
  max-height: ${s("slider-pitch")};
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
/* A step's mark (StepCell.mark, data-nc-mark): a short tag in the lower right corner, e.g. NYX's bar number on a step
   that plays in one bar only. In the step's own ink: text-sub on an empty step, the accent mark's paper on a filled
   one (tested on every fill of the velocity ramp); above the accent bar when the step is accented. */
:is(.nc-step, .nc-pad)[data-nc-mark]::after {
  content: attr(data-nc-mark);
  position: absolute;
  right: ${s("rhythm.step-mark-inset")};
  bottom: ${s("rhythm.step-mark-inset")};
  font-family: ${s("font-readout")};
  font-size: ${s("rhythm.step-mark-size")};
  font-weight: ${s("control-weight")};
  line-height: 1;
  color: ${s("text-sub")};
  pointer-events: none;
}
:is(.nc-step, .nc-pad)[aria-pressed="true"][data-nc-mark]::after { color: ${s("rhythm.accent-mark")}; }
:is(.nc-step, .nc-pad)[aria-pressed="true"][data-accent="true"][data-nc-mark]::after {
  bottom: calc(${s("rhythm.step-mark-inset")} + ${s("rhythm.accent-mark-size")});
}
/* Chance below 100%: a dashed outline at the same width (style only, no opacity, since shade means velocity). The fill
   stops at the padding box, so the dashes are the step's own colour with the row showing between them. */
.nc-step[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
/* Per-lane length: steps past the end are ghosted on the selected row; the end handle sits after the last step. */
.nc-step[data-out="true"] { border-color: ${s("divider")}; background: transparent; pointer-events: none; }
/* Every lane lays its handle out the same way, selected or not, and the handle takes no width in the row: its negative
   margins cancel its own width and the step gap it adds, so it sits centred in the gap after the last step and the
   cells never move when the selection changes. Unselected lanes keep it hidden (visibility, so it cannot be focused). */
.nc-len-handle {
  display: block;
  visibility: hidden;
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${s("control-gap")};
  margin-inline: calc((${s("control-gap")} + ${s("rhythm.step-gap")}) / -2);
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
.nc-pad[data-out="true"] { border-color: ${s("divider")}; border-style: dashed; background: transparent; color: ${s("text-sub")}; }
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
  gap: ${s("module-gap")};
  margin-bottom: ${s("module-gap")};
}
.nc-step-tools > .nc-seg { flex: 1 1 auto; align-self: flex-end; margin-bottom: 0; }
/* No margin (nor the sparkle's): the row gap already sets the dice off the length handle, and 1024 needs the
   width for 18 px cells now that beats are split by beat-gap. */
.nc-row-dice { flex: none; margin-inline: 0; }
.nc-pads-dice svg { width: calc(${s("target-min")} / 3); height: calc(${s("target-min")} / 3); display: block; margin: auto; }
.nc-fill { padding-inline: ${s("module-gap")}; touch-action: none; user-select: none; -webkit-user-select: none; }
/* Clear is a tap, not a hold: phones still scroll over it. */
.nc-clear { touch-action: manipulation; }
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
.nc-pads-play { padding-inline: ${s("module-gap")}; }
.nc-pads-play[aria-pressed="true"] { background: ${s("text")}; border-color: ${s("text")}; color: ${s("surface-page")}; }
.nc-pads-step:focus-visible, .nc-pads-play:focus-visible, .nc-fill:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
/* Fill and Clear are text actions, like the page's Save and Load (Peter, 2026-10-31: the buttons took too much
   height). Fill held reads as pressed: ink with an ink underline. On a coarse pointer an invisible pad keeps each a
   full target (below). */
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear) {
  min-width: 0;
  min-height: 0;
  align-self: center;
  border: 0;
  border-bottom: ${s("hairline")} solid transparent;
  border-radius: 0;
  background: transparent;
  padding: 0 0 ${s("control-gap")};
  color: ${s("text-sub")};
  font-weight: ${s("control-weight")};
  transition-property: color, border-color;
  transition-duration: ${s("transition-feedback")};
}
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):hover,
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear)[aria-pressed="true"] { background: transparent; color: ${s("text")}; border-bottom-color: ${s("text")}; }
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):focus-visible { outline-offset: ${s("control-gap")}; }
/* Two text actions side by side (Fill, Clear) get the page actions' gap. */
.nc-step-tools .nc-fill + .nc-fill { margin-left: ${s("page-action-gap")}; }
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
  padding: ${s("control-gap")} ${s("module-gap")};
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
.nc-pads[data-silent="true"] .nc-pad { border-color: ${s("divider")}; color: ${s("text-sub")}; }
.nc-pads[data-silent="true"] .nc-pad[aria-pressed="true"] { background: ${s("text-sub")}; border-color: ${s("text-sub")}; color: ${s("surface-page")}; }
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
.nc-ui-fx {
  margin-inline: calc(${s("module-pad")} * -1);
  padding: ${s("stack-card-pad-y")} ${s("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-ui-fx-name {
  margin: 0 0 ${s("module-gap")} 0;
  font-size: ${s("body-size")};
  font-weight: ${s("fx-name-weight")};
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
  gap: ${s("module-gap")};
  margin-bottom: ${s("module-gap")};
  min-width: 0;
}
.nc-ui-fx-hd > .nc-ui-fx-name { margin: 0 auto 0 0; }
/* A filter curve above the row it draws (Peter, 2026-11-07: "In Sampler, the filter slider belongs UNDER the
   graphic"): its 20 Hz and 20 kHz sit on the canvas's bottom edge, so the next row keeps a gap's distance. */
.nc-ui-fx > .nc-field:has(> .nc-canvas[data-nc-paint="filter"]) + .nc-field { margin-top: ${s("module-gap")}; }
/* Fold (onFold): a −/+ after the switch. Folded, the card keeps its header row only; in a console row from 769 px it
   is a narrow column instead (below). It folds and unfolds at once: no motion. */
.nc-ui-fx-hd > [data-nc-fx-hide] { flex: none; }
/* Like a channel strip's (Peter, 2026-11-01: "the minimize icon should be positioned in the same place as the
   instrument channels"): the fold triangle sits in the card's top-left corner, above the name. */
.nc-ui-fx:has(> .nc-ui-fx-hd > [data-nc-fx-hide]) { position: relative; }
.nc-ui-fx-hd > [data-nc-fx-hide] { position: absolute; top: ${s("control-gap")}; left: ${s("control-gap")}; z-index: 1; }
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
  padding: ${s("hairline")};
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  line-height: 1;
  cursor: pointer;
}
.nc-fold-toggle:hover { color: ${s("text")}; }
.nc-fold-toggle:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-fold-tri {
  display: block;
  width: calc(${s("control-gap")} * 1.5);
  height: calc(${s("control-gap")} * 2);
  background: currentColor;
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
  transition: transform ${s("motion-press")} ${s("motion-press-easing")};
}
.nc-fold-toggle[aria-expanded="false"] .nc-fold-tri,
.nc-ui-fx-fold > .nc-fold-tri { transform: scaleX(-1); }
.nc-ui-fx-fold > .nc-fold-tri { flex: none; color: ${s("text-sub")}; }
.nc-ui-fx-fold:hover > .nc-fold-tri { color: ${s("text")}; }
.nc-ui-fx-fold { display: none; }
/* A folded card's column width: fx-fold-width, or fx-fold-width-slim for a card with foldSlim (the Studio's send
   returns; Peter, 2026-11-01: "make send effect minimized state 50% thinner"). */
.nc-ui-fx { --nc-fx-fold-w: ${s("fx-fold-width")}; }
.nc-ui-fx[data-nc-fold-slim] { --nc-fx-fold-w: ${s("fx-fold-width-slim")}; }
.nc-ui-fx[data-nc-folded] > :not(.nc-ui-fx-hd, .nc-token-probe) { display: none; }
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd { margin-bottom: 0; }
.nc-ui-fx-fold {
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${s("module-gap")};
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  font: inherit;
  cursor: pointer;
  transition: none;
}
.nc-ui-fx-fold:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("control-gap")}; }
/* The on/off word as the switch draws it: off text-sub, on text with the accent hairline. */
.nc-ui-fx-fold-state {
  padding-bottom: ${s("control-gap")};
  border-bottom: ${s("hairline")} solid transparent;
  font-size: ${s("label-size")};
  font-weight: ${s("control-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  line-height: ${s("label-leading")};
}
.nc-ui-fx-fold[data-on="true"] .nc-ui-fx-fold-state { color: ${s("text")}; border-bottom-color: ${s("accent")}; }
/* The name read bottom to top (the Studio's instrument spine). */
.nc-ui-fx-fold-name {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: ${s("body-size")};
  font-weight: ${s("fx-name-weight")};
  color: ${s("text")};
  white-space: nowrap;
}
.nc-ui-fx-fold:hover .nc-ui-fx-fold-state { color: ${s("text")}; }
/* The slim column (fx-fold-width-slim): the same parts, the on/off word a step smaller so OFF fits with room. */
.nc-ui-fx[data-nc-fold-slim] .nc-ui-fx-fold-state { font-size: ${s("scale-size")}; letter-spacing: 0; }
.nc-ui-fx-visual { display: block; width: 100%; height: ${s("display-height")}; }
/* Level steps (level-steps.js, Gate's strip): a display like the EQ graph's, a column per step (beats a gap apart,
   swing widening the first of each pair), the level a soft bar, the shape's curve in the accent over it, the playing
   step ringed (the accent while locked to Play, quieter while it runs free). Under it the step numbers and the shape
   tabs. A long press opens the shape picker over the step. */
.nc-lsteps { position: relative; min-width: 0; margin-bottom: ${s("control-gap")}; }
.nc-lsteps-plot {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: ${s("slot-gap")};
  height: ${s("level-steps-height")};
  padding: calc(${s("slot-gap")} * 2);
  background: ${s("eq-graph-bg")};
  border-radius: ${s("slot-radius")};
  box-shadow: inset 0 0 0 ${s("hairline")} ${s("divider")};
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  cursor: ns-resize;
}
.nc-lsteps-plot:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-ui-fx[data-nc-max] .nc-lsteps-plot { height: ${s("level-steps-height-max")}; }
.nc-lsteps-step { position: relative; flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; border-radius: ${s("slot-radius")}; }
.nc-lsteps-step[data-beat="true"], .nc-lsteps-axis > span[data-beat="true"] { margin-inline-start: calc(${s("beat-gap")} - ${s("slot-gap")}); }
.nc-lsteps-step > svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; overflow: visible; pointer-events: none; }
.nc-lsteps-level { fill: ${s("level-steps-bar")}; }
.nc-lsteps-env { fill: ${s("level-steps-curve")}; }
.nc-lsteps-top { fill: none; stroke: ${s("level-steps-curve")}; stroke-width: ${s("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-floor { stroke: ${s("divider")}; stroke-width: ${s("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-step[data-zero="true"] .nc-lsteps-floor { stroke: ${s("text-sub")}; stroke-dasharray: 2 2; }
/* 1/8T with 16 steps: 13-16 don't play. Dashed and empty, as a step grid's out-of-range steps. */
.nc-lsteps-step[data-out="true"] { box-shadow: inset 0 0 0 ${s("hairline")} ${s("divider")}; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-level, .nc-lsteps-step[data-out="true"] .nc-lsteps-env { fill: transparent; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-top { stroke: ${s("divider")}; }
.nc-lsteps-step[data-playhead="true"] { z-index: 1; outline: ${s("playhead-width")} solid ${s("playhead")}; outline-offset: ${s("playhead-offset")}; }
.nc-lsteps-step[data-playhead="true"][data-locked="false"] { outline-color: ${s("level-steps-free")}; outline-width: ${s("hairline")}; }
.nc-lsteps-step[data-focus="true"] { box-shadow: inset 0 calc(${s("playhead-width")} * -1) 0 0 ${s("focus-ring")}; }
.nc-lsteps-plot:not(:focus-visible) .nc-lsteps-step[data-focus="true"] { box-shadow: none; }
.nc-lsteps[data-on="false"] .nc-lsteps-env, .nc-lsteps[data-on="false"] .nc-lsteps-level { fill: ${s("divider")}; }
.nc-lsteps[data-on="false"] .nc-lsteps-top { stroke: ${s("text-sub")}; }
.nc-lsteps-step[data-dragging="true"]::after {
  content: attr(data-level);
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, calc(calc(${s("slot-gap")} * 2) * -1));
  padding: calc(${s("slot-gap")} / 2) calc(${s("slot-gap")} * 2);
  border-radius: ${s("slot-radius")};
  background: ${s("accent")};
  color: ${s("on-accent")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  white-space: nowrap;
  pointer-events: none;
}
.nc-lsteps-axis {
  display: flex;
  gap: ${s("slot-gap")};
  padding: ${s("slot-gap")} calc(${s("slot-gap")} * 2) 0;
  font-family: ${s("font-readout")};
  font-size: ${s("slot-font-size")};
  line-height: 1;
  color: ${s("text-sub")};
}
.nc-lsteps-axis > span { flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; }
.nc-lsteps-shapes { display: flex; border-bottom: ${s("hairline")} solid ${s("divider")}; margin-top: ${s("control-gap")}; min-width: 0; }
.nc-lsteps-shapes[hidden] { display: none; }
.nc-lsteps-shape, .nc-lsteps-pick > button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${s("slot-gap")};
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  cursor: pointer;
  white-space: nowrap;
}
.nc-lsteps-shape { position: relative; flex: 1 1 0; min-width: 0; padding: ${s("slot-gap")} 0 ${s("control-gap")}; }
.nc-lsteps-shape:hover, .nc-lsteps-pick > button:hover { color: ${s("text")}; }
.nc-lsteps-shape[aria-selected="true"] { color: ${s("text")}; }
.nc-lsteps-shape[aria-selected="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${s("hairline")} * -1);
  height: ${s("tab-mark")};
  background: ${s("accent")};
}
.nc-lsteps-shape:focus-visible, .nc-lsteps-pick > button:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: calc(${s("focus-width")} * -1); }
.nc-lsteps-ico { width: calc(${s("label-size")} * 1.8); height: calc(${s("label-size")} * 0.9); overflow: visible; }
.nc-lsteps-ico path { fill: none; stroke: currentColor; stroke-width: ${s("curve-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-pick {
  position: absolute;
  z-index: 3;
  top: 0;
  left: var(--nc-lsteps-pick-x, 0);
  display: flex;
  align-items: stretch;
  gap: ${s("slot-gap")};
  padding: calc(${s("slot-gap")} * 2);
  background: ${s("surface-page")};
  border-radius: ${s("slot-radius")};
  box-shadow: 0 0 0 ${s("hairline")} ${s("divider")};
}
.nc-lsteps-pick[hidden] { display: none; }
.nc-lsteps-pick-head { align-self: center; padding: 0 calc(${s("slot-gap")} * 2); font-family: ${s("font-readout")}; font-size: ${s("readout-size-small")}; color: ${s("text-sub")}; white-space: nowrap; }
.nc-lsteps-pick > button { padding: calc(${s("slot-gap")} * 2); border-radius: ${s("slot-radius")}; }
.nc-lsteps-pick > button[aria-checked="true"] { color: ${s("on-accent")}; background: ${s("accent")}; }
@media (pointer: coarse) {
  .nc-lsteps-shape, .nc-lsteps-pick > button { min-height: ${s("target-min")}; justify-content: center; }
  .nc-lsteps-pick > button { min-width: ${s("target-min")}; }
}
/* EQ graph (eq-graph.js): a display at the top of an EQ card. A plot a touch off the card's shade, a hairline frame,
   the spectrum and curve canvases filling it, and one dot per band (its own colour) over them, each a 44 px target. */
.nc-eq { position: relative; min-width: 0; margin-bottom: ${s("control-gap")}; }
.nc-eq-plot {
  position: relative;
  height: ${s("eq-graph-height")};
  background: ${s("eq-graph-bg")};
  border-radius: ${s("slot-radius")};
  box-shadow: inset 0 0 0 ${s("hairline")} ${s("divider")};
}
.nc-eq-plot > canvas { position: absolute; inset: 0; display: block; width: 100%; height: 100%; pointer-events: none; }
.nc-eq-node {
  --nc-eq-tone: ${s("eq-curve")};
  position: absolute;
  width: ${s("eq-node-size")};
  height: ${s("eq-node-size")};
  margin: calc(${s("eq-node-size")} / -2) 0 0 calc(${s("eq-node-size")} / -2);
  border-radius: 50%;
  background: var(--nc-eq-tone);
  box-shadow: 0 0 0 ${s("hairline")} ${s("eq-graph-bg")};
  cursor: grab;
  touch-action: none;
  outline: none;
  z-index: 1;
}
.nc-eq-node[data-tone="1"] { --nc-eq-tone: ${s("eq-band-1")}; }
.nc-eq-node[data-tone="2"] { --nc-eq-tone: ${s("eq-band-2")}; }
.nc-eq-node[data-tone="3"] { --nc-eq-tone: ${s("eq-band-3")}; }
/* The hit area (target-min), and a soft halo in the band's colour while it is hovered, focused or dragged. */
.nc-eq-node::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${s("target-min")};
  height: ${s("target-min")};
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
.nc-eq-node::after {
  content: "";
  position: absolute;
  inset: calc(${s("control-gap")} * -1.5);
  border-radius: 50%;
  background: color-mix(in srgb, var(--nc-eq-tone) 24%, transparent);
  transform: scale(0);
  transition: transform ${s("motion-press")} ${s("motion-press-easing")};
  pointer-events: none;
}
.nc-eq-node:hover::after, .nc-eq-node[data-active="true"]::after { transform: scale(1); }
.nc-eq-node[data-drag="true"] { cursor: grabbing; }
.nc-eq-node:focus-visible { box-shadow: 0 0 0 calc(${s("hairline")} * 2) ${s("eq-graph-bg")}, 0 0 0 calc(${s("hairline")} * 2 + ${s("focus-width")}) ${s("focus-ring")}; }
.nc-eq[data-on="false"] .nc-eq-node { --nc-eq-tone: ${s("text-sub")}; }
/* Not maximized: a display. The dots are markers; a click on the plot maximizes the card. */
.nc-eq[data-locked] .nc-eq-plot { cursor: zoom-in; }
.nc-eq[data-locked] .nc-eq-node { pointer-events: none; cursor: inherit; }
/* The readout beside the band in use: "MID −18 dB · 938 Hz · Q 0.3". */
.nc-eq-tip {
  position: absolute;
  z-index: 2;
  padding: ${s("hairline")} ${s("control-gap")};
  border-radius: ${s("slot-radius")};
  background: ${s("eq-graph-bg")};
  box-shadow: inset 0 0 0 ${s("hairline")} ${s("divider")};
  color: ${s("text")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  line-height: ${s("label-leading")};
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
  padding: ${s("hairline")};
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  font: inherit;
  line-height: 1;
  cursor: pointer;
}
.nc-fx-max[hidden] { display: none; }
.nc-fx-max:hover, .nc-fx-close:hover { color: ${s("text")}; }
.nc-fx-max:focus-visible, .nc-fx-close:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-fx-close { font-size: ${s("title-size")}; padding-inline: ${s("control-gap")}; }
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
  padding: 0 ${s("hairline")};
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("body-size")};
  line-height: 1;
  cursor: pointer;
}
.nc-fx-remove::before {
  content: "";
  position: absolute;
  top: 50%;
  left: calc(${s("control-gap")} * -1);
  right: calc(${s("control-gap")} * -1);
  height: max(100%, calc(${s("control-gap")} * 5));
  transform: translateY(-50%);
}
.nc-fx-remove:hover { color: ${s("text")}; }
.nc-fx-remove:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-fx-remove[hidden],
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd > .nc-fx-remove,
.nc-ui-fx[data-nc-max="over"] > .nc-ui-fx-hd > .nc-fx-remove { display: none; }
.nc-fx-max-icon { position: relative; display: block; width: calc(${s("control-gap")} * 2.5); height: calc(${s("control-gap")} * 2.5); }
.nc-fx-max-icon > i {
  position: absolute;
  width: calc(${s("control-gap")} * 1.1);
  height: calc(${s("control-gap")} * 1.1);
  border: 0 solid currentColor;
  transition: transform ${s("motion-press")} ${s("motion-press-easing")};
}
.nc-fx-max-icon > i:nth-child(1) { left: 0; top: 0; border-left-width: calc(${s("hairline")} * 1.5); border-top-width: calc(${s("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(2) { right: 0; top: 0; border-right-width: calc(${s("hairline")} * 1.5); border-top-width: calc(${s("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(3) { left: 0; bottom: 0; border-left-width: calc(${s("hairline")} * 1.5); border-bottom-width: calc(${s("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(4) { right: 0; bottom: 0; border-right-width: calc(${s("hairline")} * 1.5); border-bottom-width: calc(${s("hairline")} * 1.5); }
.nc-fx-max[aria-pressed="true"] .nc-fx-max-icon > i { transform: rotate(180deg); }
/* Maximized: a taller plot, and the dials in columns under it (row and over). */
.nc-ui-fx[data-nc-max] .nc-eq-plot { height: ${s("eq-graph-height-max")}; }
.nc-ui-fx[data-nc-max="over"],
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-max="row"] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${s("fx-card-width")} * 0.6)), 1fr));
  column-gap: calc(${s("module-pad")} * 2);
  row-gap: ${s("module-gap")};
  align-content: start;
}
/* Maximized, the dials sit on one line (Peter, 2026-11-01): as many columns as the card has dials (--nc-fx-dials,
   set by controls.js), sharing the width. */
.nc-ui-fx[data-nc-max="over"][style*="--nc-fx-dials"],
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-max="row"][style*="--nc-fx-dials"] {
  grid-template-columns: repeat(var(--nc-fx-dials), minmax(0, 1fr));
  column-gap: ${s("module-pad")};
}
.nc-ui-fx[data-nc-max="row"] > :is(.nc-ui-fx-hd, .nc-eq, .nc-ui-more, .nc-ui-fx-fold, .nc-note),
.nc-ui-fx[data-nc-max="over"] > :is(.nc-ui-fx-hd, .nc-eq, .nc-ui-more, .nc-ui-fx-fold, .nc-note) { grid-column: 1 / -1; }
.nc-ui-fx[data-nc-max] > .nc-eq { margin-bottom: ${s("module-gap")}; }
/* Over the modules (an instrument's Hacks column): a panel three module widths wide, in its module, above the rest. */
.nc-module:has(.nc-ui-fx[data-nc-max="over"]) { position: relative; z-index: ${s("eq-panel-layer")}; }
.nc-ui-fx[data-nc-max="over"] {
  position: absolute;
  z-index: ${s("eq-panel-layer")};
  margin: 0;
  box-shadow: 0 0 0 ${s("hairline")} ${s("text-sub")};
}
.nc-fx-ghost { margin-inline: calc(${s("module-pad")} * -1); }
.nc-ui-more > summary {
  display: flex;
  align-items: center;
  padding-block: ${s("control-gap")};
  cursor: pointer;
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  color: ${s("text-sub")};
}
.nc-ui-more > summary:hover { color: ${s("text")}; }
.nc-ui-more > summary:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: calc(${s("focus-width")} * -1); }
/* Group (group.js): a collapsible run of a module's controls. Its header is the More toggle's look (label style,
   text-sub, hover to text) as a real button: the title with the -/+ mark at the end of its line, and while closed a
   quiet summary on its own line under them, wrapping rather than cut (a narrow column still shows all of it).
   Open or closed at once: no motion. Open, its controls space as the module's own do. */
.nc-group { display: flex; flex-direction: column; gap: ${s("module-pad")}; min-width: 0; }
.nc-group-toggle {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: baseline;
  column-gap: ${s("module-gap")};
  row-gap: ${s("control-gap")};
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: ${s("control-gap")} 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  text-align: start;
  color: ${s("text-sub")};
}
.nc-group-toggle:hover { color: ${s("text")}; }
.nc-group-toggle:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: calc(${s("focus-width")} * -1); }
.nc-group-title { grid-area: 1 / 1; min-width: 0; }
.nc-group-summary {
  grid-area: 2 / 1 / 3 / -1;
  min-width: 0;
  overflow-wrap: anywhere;
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  letter-spacing: normal;
  text-transform: none;
}
.nc-group-mark { grid-area: 1 / 2; font-family: ${s("font-readout")}; }
.nc-group-summary:empty, .nc-group[data-nc-open="true"] .nc-group-summary { display: none; }
.nc-group-body { display: flex; flex-direction: column; gap: ${s("module-pad")}; min-width: 0; }
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
  padding: 0 0 ${s("control-gap")};
  border: 0;
  border-bottom: ${s("hairline")} solid transparent;
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: ${s("label-size")};
  font-weight: ${s("control-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  color: ${s("text-sub")};
  transition-property: color, border-color;
  transition-duration: ${s("transition-feedback")};
}
.nc-ui-switch[aria-checked="true"] { color: ${s("text")}; border-bottom-color: ${s("accent")}; }
.nc-ui-switch:hover { color: ${s("text")}; border-bottom-color: ${s("text")}; }
.nc-ui-switch:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("control-gap")}; }
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
    width: max(100%, ${s("target-min")});
    height: max(100%, ${s("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-toggle { overflow: visible; text-overflow: clip; }
  .nc-select { min-height: ${s("target-min")}; }
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
  gap: ${s("module-gap")};
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
  height: ${s("display-height")};
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
.nc-note[data-nc-tone="danger"] { color: ${s("danger")}; }
.nc-knob {
  width: ${s("knob-size")};
  height: ${s("knob-size")};
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
  top: ${s("control-gap")};
  width: ${s("hairline")};
  height: ${s("control-gap")};
  background: ${s("text")};
  transform-origin: center ${s("module-gap")};
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
  gap: ${s("control-gap")} ${s("header-gap")};
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
  padding: ${s("control-gap")} 0;
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
/* A captioned row (Gate's Rate in a narrow FX card): the label, then the tabs packed close so short ones never cut. */
.nc-choice-caption { flex: 0 0 auto; margin-inline-end: auto; }
.nc-choice-row[data-nc-caption] { gap: ${s("control-gap")}; margin-bottom: ${s("control-gap")}; }
.nc-choice-row[data-nc-caption] > .nc-choice { flex: 0 0 auto; overflow: visible; }
.nc-choice[aria-selected="true"] {
  color: ${s("text")};
  border-bottom-color: ${s("accent")};
}
.nc-choice:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
/* Pad grid (NYX): pads as the way in. Empty pads are shaded and say Load; filled pads carry a lane-coloured bar and
   a mini waveform; the selected pad is outlined in the accent. */
.nc-padgrid { position: relative; }
.nc-padgrid-pads { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: ${s("control-gap")}; }
.nc-padgrid-pads[data-nc-columns="4"] { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.nc-padgrid-pad {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  align-content: start;
  min-width: 0;
  min-height: calc(${s("target-min")} * 1.5);
  padding: ${s("control-gap")} ${s("control-gap")} ${s("control-gap")} calc(${s("control-gap")} * 2);
  border: ${s("hairline")} solid ${s("text-sub")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text")};
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  text-align: left;
  cursor: pointer;
  -webkit-touch-callout: none;
  user-select: none;
  touch-action: manipulation;
}
.nc-padgrid-pad-bar {
  position: absolute;
  inset-block: ${s("control-gap")};
  inset-inline-start: ${s("hairline")};
  width: ${s("focus-width")};
  background: currentColor;
}
.nc-padgrid-pad-name { justify-self: start; align-self: flex-start; max-width: 100%; font-weight: ${s("control-weight")}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nc-padgrid-pad-hint { display: none; color: ${s("text-sub")}; font-size: ${s("readout-size-small")}; }
.nc-padgrid-pad-badge {
  position: absolute;
  inset-block-start: ${s("control-gap")};
  inset-inline-end: ${s("control-gap")};
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  line-height: 1;
}
.nc-padgrid-pad-badge:empty { display: none; }
.nc-padgrid-pad-wave { width: 100%; height: ${s("slider-pitch")}; align-self: end; }
.nc-padgrid-pad-wave path { fill: currentColor; fill-opacity: 0.35; stroke: currentColor; stroke-width: 0.6; vector-effect: non-scaling-stroke; }
.nc-padgrid-pad[data-nc-lane="1"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${s("rhythm.lane-1")}; }
.nc-padgrid-pad[data-nc-lane="2"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${s("rhythm.lane-2")}; }
.nc-padgrid-pad[data-nc-lane="3"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${s("rhythm.lane-3")}; }
.nc-padgrid-pad[data-nc-lane="4"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${s("rhythm.lane-4")}; }
.nc-padgrid-pad[data-empty="true"] {
  align-content: center;
  justify-items: center;
  text-align: center;
  padding-inline-start: ${s("control-gap")};
  border-color: ${s("divider")};
  background: ${s("divider")};
  color: ${s("text-sub")};
}
.nc-padgrid-pad[data-empty="true"] .nc-padgrid-pad-name { font-weight: inherit; font-size: ${s("body-size")}; }
.nc-padgrid-pad[data-empty="true"] .nc-padgrid-pad-hint { display: block; }
.nc-padgrid-pad[data-hint="true"] .nc-padgrid-pad-hint { display: block; justify-self: start; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nc-padgrid-pad[data-empty="true"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { display: none; }
.nc-padgrid-pad:hover { border-color: ${s("text")}; }
.nc-padgrid-pad[data-selected="true"] { border-color: ${s("accent")}; box-shadow: inset 0 0 0 ${s("hairline")} ${s("accent")}; }
.nc-padgrid-rename {
  position: absolute;
  z-index: 3;
  min-height: ${s("target-min")};
  padding: 0 ${s("control-gap")};
  border: ${s("hairline")} solid ${s("accent")};
  border-radius: ${s("slot-radius")};
  background: ${s("surface-page")};
  color: ${s("text")};
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  font-weight: ${s("control-weight")};
}
.nc-padgrid-rename:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-padgrid-pad[data-dragging="true"] { border-style: dashed; color: ${s("text-sub")}; }
.nc-padgrid-pad[data-drop="true"] { border-style: dashed; border-color: ${s("accent")}; }
.nc-padgrid-pad[data-playing="true"] .nc-padgrid-pad-wave path { fill-opacity: 0.7; }
.nc-padgrid-pad:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-slot-row { position: relative; }
.nc-slot-menu {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${s("control-gap")};
  min-width: ${s("name-width")};
  padding: ${s("control-gap")};
  background: ${s("surface-page")};
  border: ${s("hairline")} solid ${s("divider")};
  color: ${s("text")};
}
.nc-menu-btn {
  display: flex;
  align-items: center;
  min-height: ${s("target-min")};
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
/* 44 px on every pointer (desktop too): a touch band drawn at the 20 px slider pitch; the extra height overlaps the
   gaps, not the rows. */
.nc-field[data-nc-slider] .nc-range {
  height: ${s("target-min")};
  margin-block: calc((${s("slider-pitch")} - ${s("target-min")}) / 2);
}
/* M and S on touch: each a full target-min box (the button paints smaller inside), touching, never overlapping.
   Only on a coarse pointer: on every pointer it made each lane target-min tall on desktop (Rhythm #40). */
@media (pointer: coarse) {
  .nc-ms-wrap { flex-basis: ${s("target-min")}; height: ${s("target-min")}; }
  .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: calc(${s("module-gap")} * -1); }
  /* The ×'s touch target: target-min tall, out to the card's padding on the right; never over maximize. */
  .nc-fx-remove::before { height: max(100%, ${s("target-min")}); right: calc(${s("control-gap")} * -3); }
  .nc-fold-toggle::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${s("target-min")});
    height: max(100%, ${s("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-ms {
    inset: calc((${s("target-min")} - ${s("slider-pitch")}) / 2);
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
/* A hit pad grows a control that cannot grow its look to target-min, on every pointer. */
.nc-hit {
  display: block;
  position: absolute;
  pointer-events: auto;
  left: 50%;
  top: 50%;
  width: ${s("target-min")};
  height: ${s("target-min")};
  transform: translate(-50%, -50%);
}
@media (pointer: coarse) {
  .nc-hit { width: ${s("target-min-coarse")}; height: ${s("target-min-coarse")}; }
}
/* nc-ui step editor (openStepEditor): long-press a step for velocity and chance. Sits under the step;
   a bottom sheet at phone widths. Rows are 44 px so the sliders are thumb-sized. */
.nc-step-editor {
  position: fixed;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: ${s("module-gap")};
  width: calc(${s("name-width")} * 6);
  max-width: calc(100vw - 2 * ${s("module-gap")});
  padding: ${s("module-gap")};
  background: ${s("surface-page")};
  border: ${s("hairline")} solid ${s("divider")};
  color: ${s("text")};
}
/* The step being edited: a dark ring (as Bass marks its selected pad), full strength, fill unchanged. */
.nc-pad[data-editing="true"], .nc-step-wrap[data-editing="true"] .nc-step {
  outline: ${s("focus-width")} solid ${s("text")};
  outline-offset: ${s("hairline")};
}
.nc-step-editor-scrim[data-placement="sheet"] { z-index: 4; background: ${s("dialog-scrim")}; }
.nc-step-editor[data-placement="sheet"] { z-index: 5; }
.nc-step-editor-head { display: flex; align-items: center; justify-content: space-between; gap: ${s("module-gap")}; }
.nc-step-editor-row {
  display: flex;
  align-items: center;
  gap: ${s("module-gap")};
  min-height: ${s("target-min")};
}
.nc-step-editor-row .nc-label { flex: none; min-width: ${s("name-width")}; }
.nc-step-editor-row .nc-range { flex: 1 1 0; min-width: 0; height: ${s("target-min")}; }
.nc-step-editor-row .nc-readout { flex: none; min-width: ${s("name-width")}; text-align: right; }
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
  padding-bottom: calc(${s("module-gap")} + env(safe-area-inset-bottom));
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
  line-height: ${s("label-leading")};
  white-space: nowrap;
  pointer-events: auto;
  opacity: 0;
  transition: opacity ${s("motion-fade")} ${s("motion-fade-easing")};
}
.nc-ui-toast[data-placement="bottom"] { bottom: calc(${s("toast-offset")} + env(safe-area-inset-bottom)); }
.nc-ui-toast[data-placement="top"] { top: calc(${s("toast-offset")} + env(safe-area-inset-top)); }
/* In the Studio (html[data-nc-hosted]) the frame is as tall as its page: toasts and sheets keep to the part you can
   see, which the Studio writes as --nc-host-top / --nc-host-bottom. */
html[data-nc-hosted] .nc-ui-toast[data-placement="bottom"] { bottom: calc(var(--nc-host-bottom, 0px) + ${s("toast-offset")}); }
html[data-nc-hosted] .nc-ui-toast[data-placement="top"] { top: calc(var(--nc-host-top, 0px) + ${s("toast-offset")}); }
html[data-nc-hosted] .nc-step-editor[data-placement="sheet"] { bottom: var(--nc-host-bottom, 0px); }
.nc-ui-toast[data-placement="anchor"] { position: absolute; transform: none; }
.nc-ui-toast[data-state="open"] { opacity: 1; }
.nc-ui-toast[data-state="closing"] {
  opacity: 0;
  pointer-events: none;
  transition: opacity ${s("motion-fade-out")} ${s("motion-fade-out-easing")};
}
/* nc-ui help (installHelpTips): a label's description, shown when the pointer rests on it. The toast's dark slab,
   smaller and wrapping; it never takes the pointer, so it can't block the control under it. No motion. */
[data-nc-help] { cursor: help; }
[data-nc-help]:hover { text-decoration: underline dotted; text-underline-offset: 0.2em; }
.nc-ui-help {
  position: fixed;
  z-index: 6;
  max-width: 34ch;
  padding: calc(${s("toast-pad-x")} / 2) calc(${s("toast-pad-x")} * 0.75);
  border-radius: ${s("toast-radius")};
  background: ${s("toast-bg")};
  color: ${s("toast-text")};
  font-family: ${s("font-ui")};
  font-size: ${s("toast-font-size")};
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
/* Console (the Studio's Mix): channel strips, the FX cards, then the master strip, on one row. The body bleeds to the
   module's sides and bottom so each area is a shade block: strips on the module, the FX cards one adjacent shade
   darker each, and the master darkest (stack-1), so the row reads as the signal path ending on the right. */
.nc-module-body[data-nc-layout="console"] {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto auto;
  grid-template-areas: "strips fx meters master";
  align-items: stretch;
  gap: 0;
  margin-inline: calc(${s("module-pad")} * -1);
  margin-bottom: calc(${s("module-pad")} * -1);
  border-top: ${s("hairline")} solid ${s("divider")};
}
.nc-module-body[data-nc-layout="console"] > .nc-section { gap: 0; padding-top: ${s("stack-card-pad-y")}; }
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] {
  grid-area: strips;
  flex-direction: row;
  align-items: flex-start;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: thin;
  padding-inline: ${s("module-pad")} ${s("control-gap")};
  /* The strips run the full height (their own padding): no band above or below them. */
  padding-block: 0;
  /* The channel strips sit on the master's shade (Peter, 2026-10-30): the lightest step of the stack. */
  background: ${s("module-bg-stack-1")};
  ${G("text-sub")}: ${s("module-sub-stack-1")};
  ${G("divider")}: ${s("module-div-stack-1")};
  ${G("slider-track")}: ${s("module-div-stack-1")};
}
/* The fx area is as wide as the cards it shows (Peter, 2026-11-01: "Weird empty slot next to Master slider"): one
   column per shown card, none held empty, so the master sits right after the last card and the strips area (the
   flexible column) takes the rest. A paged area keeps three cards' width (below). */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${s("fx-card-width")};
  align-items: stretch;
  padding-top: 0;
}
/* An optional meters section (the Studio's VU meters): after the FX cards, just left of the master, on the master's
   shade with a hairline between them. Without one the column is empty. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="meters"] {
  grid-area: meters;
  padding: ${s("stack-card-pad-y")} ${s("module-pad")} ${s("module-pad")};
  border-inline-end: ${s("hairline")} solid ${s("module-div-stack-1")};
  background: ${s("module-bg-stack-1")};
  ${G("text-sub")}: ${s("module-sub-stack-1")};
  ${G("divider")}: ${s("module-div-stack-1")};
  ${G("slider-track")}: ${s("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${s("control-gap")} ${s("module-pad")};
  padding-bottom: ${s("module-pad")};
  background: ${s("module-bg-stack-1")};
  ${G("text-sub")}: ${s("module-sub-stack-1")};
  ${G("divider")}: ${s("module-div-stack-1")};
  ${G("slider-track")}: ${s("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${s("stack-card-pad-y")} ${s("module-pad")} ${s("module-pad")};
  ${G("text-sub")}: inherit;
  ${G("divider")}: inherit;
  ${G("slider-track")}: inherit;
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { --nc-fx-card-bg: ${s("module-bg-adjacent-2")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { --nc-fx-card-bg: ${s("module-bg-adjacent-3")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { --nc-fx-card-bg: ${s("module-bg-adjacent-4")}; background: var(--nc-fx-card-bg); }
/* In the console a card is a column: a select row gets the same space under it as a slider row. */
.nc-module-body[data-nc-layout="console"] .nc-ui-fx { display: flex; flex-direction: column; gap: ${s("module-gap")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx > .nc-field:not([data-nc-slider]) { padding-bottom: ${s("module-gap")}; }
/* Folded cards in a console row (769 px up): a narrow column, the whole column one button. Once any card is folded the
   fx area is a row of its cards' own widths, so the strips get the room back. */
@media (min-width: 769px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx { flex: none; width: ${s("fx-card-width")}; }
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
    width: calc(${s("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] > .nc-ui-fx[data-nc-max="row"] { grid-column: span 3; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx[data-nc-max="row"][data-nc-max="row"] {
    width: calc(${s("fx-card-width")} * 3);
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
    scroll-padding-top: var(--nc-fx-pin-h, ${s("module-gap")});
    /* The foot shade (scroll) shows while there is more below; the card's own colour at the end of its content (local)
       covers it once scrolled to the end, or when nothing overflows. */
    background-image:
      linear-gradient(transparent, var(--nc-fx-card-bg) 70%),
      linear-gradient(transparent, ${s("divider")});
    background-position: bottom, bottom;
    background-size: 100% calc(${s("module-gap")} * 3), 100% ${s("module-gap")};
    background-repeat: no-repeat;
    background-attachment: local, scroll;
  }
  /* The pinned header (or bare name) holds the card's top padding, so nothing scrolls by above it; its fold triangle
     keeps its corner (the header is its containing block now, edge to edge). */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > :is(.nc-ui-fx-hd, .nc-ui-fx-name) {
    position: sticky;
    top: 0;
    z-index: 2;
    margin: 0 calc(${s("module-pad")} * -1) calc(${s("module-gap")} * -1);
    padding: ${s("stack-card-pad-y")} ${s("module-pad")} calc(${s("module-gap")} * 2);
    background-color: var(--nc-fx-card-bg);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > .nc-eq {
    position: sticky;
    top: var(--nc-fx-hd-h, 0);
    z-index: 1;
    margin-bottom: 0;
    padding-bottom: ${s("control-gap")};
    background-color: var(--nc-fx-card-bg);
    /* The card's colour out to its edges beside the graph (no spread: nothing below it is covered). */
    box-shadow: calc(${s("module-pad")} * -1) 0 0 var(--nc-fx-card-bg), ${s("module-pad")} 0 0 var(--nc-fx-card-bg);
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
    padding-top: ${s("target-min")};
  }
  /* No card folded on this page: three cards' width, a part-filled last page too, so the strips never shift. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged]:not(:has(> .nc-ui-fx[data-nc-folded]:not([data-nc-off-page]))) {
    min-width: calc(${s("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx { flex: none; width: ${s("fx-card-width")}; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx[data-nc-off-page][data-nc-off-page][data-nc-off-page] {
    order: -1;
    flex: none;
    width: ${s("fx-card-width")};
    margin-inline-end: calc(${s("fx-card-width")} * -1);
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
    gap: ${s("module-gap")};
    height: ${s("target-min")};
  }
}
/* A chevron button: a full target, a square outline like Moves' buttons, the chevron in ink so it reads at a glance.
   At an end it stays focusable (aria-disabled) and dims by colour. */
.nc-fx-page-btn {
  display: grid;
  place-items: center;
  flex: none;
  width: ${s("target-min")};
  height: ${s("target-min")};
  margin: 0;
  padding: 0;
  border: ${s("hairline")} solid ${s("text-sub")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text")};
  cursor: pointer;
}
.nc-fx-page-btn:hover:not([aria-disabled="true"]) { border-color: ${s("text")}; }
.nc-fx-page-btn:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-fx-page-btn[aria-disabled="true"] { color: ${s("divider")}; border-color: ${s("divider")}; cursor: default; }
.nc-fx-page-icon {
  display: block;
  width: calc(${s("control-gap")} * 2.5);
  height: calc(${s("control-gap")} * 2.5);
  border-style: solid;
  border-color: currentColor;
  border-width: calc(${s("hairline")} * 2) calc(${s("hairline")} * 2) 0 0;
  transform: translateX(calc(${s("control-gap")} * -0.5)) rotate(45deg);
}
.nc-fx-page-btn[data-nc-fx-page="prev"] .nc-fx-page-icon { transform: translateX(calc(${s("control-gap")} * 0.5)) rotate(-135deg); }
.nc-fx-page-count {
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  font-variant-numeric: tabular-nums;
  color: ${s("text")};
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
  --nc-strip-ms-row: ${s("slider-pitch")};
  --nc-strip-knob-row: calc(${s("knob-size")} + ${s("control-gap")} + ${s("label-size")} * ${s("label-leading")});
  position: relative;
  flex: none;
  width: ${s("strip-width")};
  display: grid;
  grid-template-columns: ${s("control-gap")} minmax(0, 1fr) ${s("control-gap")};
  /* Name, Inserts, M/S, sends, pan, the fader body, the readout. */
  grid-template-rows: auto ${s("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
  justify-items: center;
  row-gap: ${s("module-gap")};
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
  .nc-strip { --nc-strip-ms-row: ${s("target-min")}; }
}
/* sendsHidden: no sends row (the host's "hide the sends"); give it to every strip so their rows still line up. */
.nc-strip[data-nc-sends-hidden] {
  grid-template-rows: auto ${s("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-sends-hidden] > .nc-strip-sends { display: none; }
.nc-strip + .nc-strip { border-inline-start: ${s("hairline")} solid ${s("divider")}; }
/* Channel strips alternate light and dark grey, full height, so a row of identical strips reads apart (Peter,
   2026-10-30); the master keeps the module's shade. */
.nc-strip:not([data-nc-master]) { --nc-strip-ground: var(--nc-strip-shade, ${s("strip-bg")}); background: var(--nc-strip-ground); }
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) { --nc-strip-ground: var(--nc-strip-shade, ${s("strip-alt-bg")}); }
/* A shade a player picked (shade, 1-8; Peter, 2026-11-04): one of eight neutral greys (strip-shade-1..8), in place of
   the alternation. 1 and 2 are the alternation's own greys. On the darker four (5-8) the Inserts word at rest takes
   text-sub, so it keeps its contrast (the lighter hacks grey falls to 2.2:1 there). */
${[1,2,3,4,5,6,7,8].map(a=>`.nc-strip[data-nc-shade="${a}"] { --nc-strip-shade: ${s(`strip-shade-${a}`)}; }`).join(`
`)}
/* A compact knob's centre is the strip's own grey (--nc-strip-ground), not the page's, so it never shows as a dot. On
   3-8 the M and S hairline is mixed from the strip's grey (strip-divider vanishes on the middle greys, and reads as a
   light box on the darkest). */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${G("divider")}: color-mix(in oklab, ${s("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${G("meter-track")}: color-mix(in oklab, ${s("text-sub")} 30%, var(--nc-strip-shade)); }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]) { color: ${s("text-sub")}; }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]):hover { color: ${s("text")}; }
/* The strip menu (onShade): a small sheet under the grip, or where the name was right-clicked: "Shade", a row of Auto
   and the eight swatches (the picked one ringed in ink), then Move left / Move right with their keys. Over the page,
   so it never shifts the layout; page ground and a hairline (the kit draws no shadows). */
.nc-strip-menu {
  position: fixed;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: ${s("control-gap")};
  min-width: calc(${s("strip-width")} * 2.5);
  padding: calc(${s("control-gap")} * 2) calc(${s("control-gap")} * 2.5);
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: ${s("surface-page")};
  color: ${s("text")};
  font-size: ${s("label-size")};
}
.nc-strip-menu-title { color: ${s("text-sub")}; font-weight: ${s("label-weight")}; letter-spacing: ${s("label-tracking")}; text-transform: uppercase; }
.nc-strip-menu-shades { display: flex; gap: ${s("control-gap")}; margin-bottom: ${s("control-gap")}; }
.nc-strip-menu-shades > button {
  flex: none;
  min-width: calc(${s("control-gap")} * 4.5);
  height: calc(${s("control-gap")} * 4.5);
  margin: 0;
  padding: 0 ${s("hairline")};
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: var(--nc-swatch, transparent);
  color: ${s("text-sub")};
  font: inherit;
  font-size: ${s("scale-size")};
  cursor: pointer;
}
.nc-strip-menu-shades > button[aria-checked="true"] { outline: calc(${s("hairline")} * 2) solid ${s("text")}; outline-offset: ${s("hairline")}; color: ${s("text")}; }
.nc-strip-menu-shades > button:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-strip-menu-item {
  display: flex;
  justify-content: space-between;
  gap: calc(${s("control-gap")} * 3);
  margin: 0;
  padding: ${s("control-gap")} 0;
  border: 0;
  border-top: ${s("hairline")} solid ${s("divider")};
  background: transparent;
  color: ${s("text")};
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.nc-strip-menu-item:disabled { color: ${s("text-sub")}; cursor: default; }
.nc-strip-menu-item > kbd { font: inherit; color: ${s("text-sub")}; }
.nc-strip-menu-item:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: calc(${s("focus-width")} * -1); }
@media (pointer: coarse) {
  .nc-strip-menu-shades > button { min-width: calc(${s("target-min")} * 0.7); height: calc(${s("target-min")} * 0.7); }
  .nc-strip-menu-item { min-height: ${s("target-min")}; align-items: center; }
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip {
  align-self: stretch;
  padding-block: ${s("stack-card-pad-y")} ${s("module-pad")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip-add { margin-block: ${s("stack-card-pad-y")} ${s("module-pad")}; }
.nc-strip[data-nc-master] { width: ${s("strip-width-master")}; }
/* Name row: the name, and the remove × when the strip can be removed. */
.nc-strip-hd { display: flex; align-items: baseline; justify-content: center; gap: ${s("control-gap")}; max-width: 100%; min-width: 0; }
.nc-strip-remove {
  position: relative;
  flex: none;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("label-size")};
  line-height: 1;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${s("transition-feedback")};
}
.nc-strip-remove::before { content: ""; position: absolute; inset: calc(${s("control-gap")} * -1); }
.nc-strip-remove:hover { color: ${s("danger")}; }
.nc-strip-remove:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-strip-name {
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  color: ${s("text")};
}
.nc-strip[data-silent="true"] .nc-strip-name, .nc-strip[data-silent="true"] .nc-strip-db { color: ${s("text-sub")}; }
/* Minimize (onFold): the fold triangle in the top-left corner, above the name; the name row and its × as before, so a
   minimize click can't land on remove. Folded, the strip is a narrow column on the same rows (meters still line up): the
   ▶ in the corner, the name row kept but unseen, M and S stacked over the Inserts and M/S rows, then the name read bottom to top under a small mark in the
   fader cap's colour (one button, the FX fold's look) beside a thin meter. At once: no motion. */
/* The triangle sits in the strip's top-left corner, above the name; folded, centred over the column. */
.nc-strip > [data-nc-strip-hide] { position: absolute; top: ${s("control-gap")}; left: ${s("control-gap")}; z-index: 1; }
.nc-strip[data-nc-folded] > [data-nc-strip-hide] { left: 50%; transform: translateX(-50%); }
/* Move (onMove): a grip of six dots in the top-right corner, across from the triangle, in text-sub (ink on hover), so a
   strip says it can be dragged. touch-action none: a drag from the grip moves the strip at once on touch, never the
   page. Not on a folded strip (its column is the handle there). */
.nc-strip > [data-nc-strip-grip] {
  position: absolute;
  top: ${s("control-gap")};
  right: ${s("control-gap")};
  /* Over the next strip's fold triangle, whose touch target reaches back across the strips' edge. */
  z-index: 2;
  display: inline-flex;
  margin: 0;
  padding: ${s("hairline")};
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  line-height: 1;
  cursor: grab;
  touch-action: none;
}
.nc-strip > [data-nc-strip-grip]:hover { color: ${s("text")}; }
.nc-strip > [data-nc-strip-grip]:active { cursor: grabbing; }
.nc-strip > [data-nc-strip-grip]:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-strip-grip-dots {
  display: block;
  width: calc(${s("control-gap")} * 1.5);
  height: calc(${s("control-gap")} * 2.25);
  background: radial-gradient(circle, currentColor ${s("hairline")}, transparent calc(${s("hairline")} * 1.5)) 0 0 / calc(${s("control-gap")} * 0.75) calc(${s("control-gap")} * 0.75);
}
.nc-strip[data-nc-folded] > [data-nc-strip-grip] { display: none; }
@media (pointer: coarse) {
  .nc-strip > [data-nc-strip-grip]::before {
    content: "";
    position: absolute;
    right: calc(${s("control-gap")} * -1);
    top: calc(${s("control-gap")} * -1);
    width: calc(${s("target-min")} / 2);
    height: calc(${s("target-min")} / 2);
  }
}
/* Folded: no gutters, and M and S take the Inserts, M/S and sends rows (sends hidden: the pan row) as one area, so the
   two fit stacked at full size with the rows unchanged. */
.nc-strip[data-nc-folded] {
  width: ${s("strip-fold-width")};
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
  grid-template-rows: auto var(--nc-strip-knob-row) ${s("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". trim ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-trim][data-nc-sends-hidden] {
  grid-template-rows: auto var(--nc-strip-knob-row) ${s("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
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
  grid-auto-columns: ${s("slider-pitch")};
  grid-auto-rows: ${s("slider-pitch")};
  gap: ${s("module-gap")};
  align-self: start;
  justify-self: center;
}
/* Touch: each folded M and S as wide as the column and target-min tall, touching (after the rule above, so it wins). */
@media (pointer: coarse) {
  .nc-strip[data-nc-folded] > .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-auto-rows: ${s("target-min")}; gap: 0; justify-self: stretch; }
}
.nc-strip[data-nc-folded] > .nc-strip-body {
  grid-template-columns: auto auto;
  column-gap: ${s("control-gap")};
}
.nc-strip[data-nc-folded] .nc-strip-body > .nc-strip-fold { display: flex; grid-column: 1; grid-row: 1 / span 2; width: auto; }
.nc-strip[data-nc-folded] .nc-strip-body > .nc-meter { grid-column: 2; }
.nc-strip[data-nc-folded] .nc-meter-bar { width: ${s("control-gap")}; }
.nc-strip-fold { gap: ${s("control-gap")}; }
.nc-strip-fold > .nc-ui-fx-fold-name { font-size: ${s("label-size")}; font-weight: ${s("label-weight")}; letter-spacing: ${s("label-tracking")}; text-transform: uppercase; }
.nc-strip[data-silent="true"] .nc-strip-fold > .nc-ui-fx-fold-name { color: ${s("text-sub")}; }
/* Folded with a pan: a tiny track with a dot where the pan sits (--nc-strip-pan, −1..1). */
.nc-strip-fold-pan {
  position: relative;
  flex: none;
  width: ${s("fader-cap-height")};
  height: ${s("control-gap")};
  background: linear-gradient(${s("divider")}, ${s("divider")}) center / 100% ${s("hairline")} no-repeat;
}
.nc-strip-fold-pan[hidden] { display: none; }
.nc-strip-fold-pan::after {
  content: "";
  position: absolute;
  top: 0;
  left: calc((var(--nc-strip-pan, 0) + 1) / 2 * (100% - ${s("control-gap")}));
  width: ${s("control-gap")};
  height: ${s("control-gap")};
  border-radius: 50%;
  background: ${s("text-sub")};
}
.nc-strip-fold-cap {
  flex: none;
  width: ${s("fader-cap-height")};
  height: ${s("control-gap")};
  background: var(--nc-strip-cap, ${s("fader-cap")});
}
/* M and S: an explicit two-column grid (never flex with overlapping margins), centred at the slider pitch; on touch
   it fills the strip's full width (the gutters too), two target-min boxes side by side, touching, nothing past the
   strip's edges. The kit's hit pads take any width short of target-min (the divider hairline) outward. */
.nc-strip-ms {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${s("slider-pitch")};
  grid-template-rows: ${s("slider-pitch")};
  column-gap: ${s("control-gap")};
  justify-self: center;
  align-self: start;
}
.nc-strip > .nc-strip-ms > .nc-ms-wrap { margin: 0; width: auto; }
/* The master's Sends button (onSendsView): Inserts' twin in the M/S row, the strip's width, the slider pitch tall. */
.nc-strip > .nc-strip-ms:has(> .nc-sends-view-wrap) { grid-auto-columns: minmax(0, 1fr); justify-self: stretch; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap { grid-column: 1 / -1; height: ${s("slider-pitch")}; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap > .nc-sends-view { inset-inline: ${s("control-gap")}; width: auto; }
@media (pointer: coarse) {
  .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-template-rows: ${s("target-min")}; column-gap: 0; justify-self: stretch; }
}
/* M and S on a channel strip: the kit's outlined squares, their hairline the one for the strip's own shade
   (strip-divider). The console's body hands its stack-1 hairline down, a near match for the light strip (gone there)
   but lighter than the alternate one (a light box there), so M and S showed boxes on every other strip only. */
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${G("divider")}: ${s("strip-divider")}; }
/* Hacks: a full-width toggle above M and S, in mixed case and a lighter grey (Peter); pressed while the console's fx area shows this strip's stack. */
.nc-strip-hacks { display: flex; width: 100%; height: ${s("slider-pitch")}; }
.nc-hacks-wrap { position: relative; flex: 1 1 auto; height: ${s("slider-pitch")}; }
.nc-hacks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  /* A light outline at rest, the same on every strip (Peter, 2026-11-01: the box only says the stack has effects):
     text-sub at 50% over the strip hairline; text-sub on hover, so it still reads as a button. */
  border: ${s("hairline")} solid color-mix(in oklab, ${s("text-sub")} 50%, ${s("strip-divider")});
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("strip-hacks-text")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  /* Stated, not left out: an older bundled copy of the kit (an app's fallback layer) set uppercase and tracking. */
  letter-spacing: normal;
  text-transform: none;
  cursor: pointer;
  transition: none;
}
.nc-hacks:hover { color: ${s("text")}; border-color: ${s("text-sub")}; }
/* hacksEmpty (no effects in the stack): the plain word, no box, hover too; still a button with its focus ring. */
.nc-hacks[data-nc-empty]:not([aria-pressed="true"]) { border-color: transparent; }
.nc-hacks[aria-pressed="true"] {
  background: ${s("fader-cap-master")};
  border-color: ${s("fader-cap-master")};
  color: ${s("surface-page")};
}
.nc-hacks:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-strip-sends { display: flex; align-items: flex-start; gap: ${s("module-gap")}; }
/* Pan: one compact bipolar knob, centred, in its own row (empty on the master, so the faders line up). */
.nc-strip-pan { display: flex; justify-content: center; align-items: flex-start; }
.nc-field[data-nc-compact] {
  flex-direction: column-reverse;
  align-items: center;
  gap: ${s("control-gap")};
}
.nc-field[data-nc-compact] .nc-label { min-width: 0; line-height: ${s("label-leading")}; }
.nc-field[data-nc-compact] .nc-readout { display: none; }
/* A compact knob draws its amount: a ring over its 270° travel, filled in the meter blue up to the value. */
.nc-field[data-nc-compact] .nc-knob {
  border: 0;
  background:
    radial-gradient(closest-side, var(--nc-strip-ground, ${s("surface-page")}) 70%, transparent 72%),
    conic-gradient(from 225deg, ${s("meter-fill")} calc(var(--knob-turn, 0) * 1deg), ${s("meter-track")} 0 270deg, transparent 0);
}
/* A bipolar knob (pan) fills from the top of its travel (the centre) to the value, either way. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-knob {
  background:
    radial-gradient(closest-side, var(--nc-strip-ground, ${s("surface-page")}) 70%, transparent 72%),
    conic-gradient(from 225deg, ${s("meter-track")} calc(var(--knob-from, 135) * 1deg), ${s("meter-fill")} 0 calc(var(--knob-to, 135) * 1deg), ${s("meter-track")} 0 270deg, transparent 0);
}
/* Its value ("C", "L 30") shows in the label's place while hovered, focused or dragged; no motion. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-readout {
  order: -1;
  flex: none;
  width: auto;
  min-width: max-content;
  max-width: none;
  text-align: center;
  font-size: ${s("label-size")};
  line-height: ${s("label-leading")};
  white-space: nowrap;
}
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-label { display: none; }
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-readout { display: block; }
/* Its mark starts at the bottom of the travel (7:30) and turns 270° to 4:30, along the ring. */
.nc-field[data-nc-compact] .nc-knob-mark { transform: rotate(calc((var(--knob-turn, 0) - 135) * 1deg)); }
.nc-strip-body {
  display: grid;
  grid-template-columns: ${s("fader-cap-width")} auto auto;
  grid-template-rows: ${s("clip-size")} ${s("fader-height")};
  justify-content: center;
  column-gap: ${s("control-gap")};
  row-gap: ${s("control-gap")};
  padding-block: calc(${s("fader-cap-height")} / 2);
}
.nc-strip-body > .nc-fader { grid-column: 1; grid-row: 2; }
.nc-strip-body > .nc-scale { grid-column: 2; grid-row: 2; }
.nc-strip-body > .nc-meter { grid-column: 3; grid-row: 1 / span 2; }
/* The dB scale between fader and meter: faint mono labels, each centred on its level. */
.nc-scale {
  position: relative;
  width: 3ch;
  font-family: ${s("font-readout")};
  font-size: ${s("scale-size")};
  font-variant-numeric: tabular-nums;
  color: ${s("text-sub")};
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
  width: ${s("fader-cap-width")};
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
  width: ${s("rule-strong")};
  transform: translateX(-50%);
  background: ${s("fader-track")};
}
.nc-fader-cap {
  position: absolute;
  left: 0;
  width: 100%;
  height: ${s("fader-cap-height")};
  top: calc((1 - var(--fader-pos, 0)) * 100%);
  transform: translateY(-50%);
  background: ${s("fader-cap")};
  transition: none;
}
.nc-fader-cap::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: ${s("hairline")};
  transform: translateY(-50%);
  background: ${s("fader-cap-line")};
}
/* A host can colour a channel's fader cap with --nc-strip-cap (Peter, 2026-10-31: the Studio uses each instrument's
   own colour, muted). The kit names no instrument colours. Unset, the cap stays ink; the master stays accent. */
.nc-strip .nc-fader-cap { background: var(--nc-strip-cap, ${s("fader-cap")}); }
.nc-fader[data-dragging="true"] .nc-fader-cap { background: ${s("accent")}; }
/* The master's cap in Prussian blue (Peter, 2026-10-30): the master reads apart from the channels at a glance. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] .nc-fader-cap { background: ${s("fader-cap-master")}; }
.nc-fader:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("control-gap")}; }
/* The level meter: peak over RMS in the lighter Prussian blue, a hold line, a clip light on top. It follows the audio
   every frame (transforms written by the meter's own ballistics), so nothing here transitions. */
.nc-meter {
  display: grid;
  grid-template-rows: subgrid;
  row-gap: ${s("control-gap")};
  justify-items: stretch;
}
.nc-meter-clip {
  position: relative;
  display: block;
  height: ${s("clip-size")};
  padding: 0;
  border: 0;
  background: ${s("meter-track")};
  cursor: pointer;
  transition: none;
}
.nc-meter-clip::before {
  content: "";
  position: absolute;
  inset: calc(${s("control-gap")} * -1);
}
.nc-meter-clip[data-lit="true"] { background: ${s("meter-clip")}; }
.nc-meter-clip:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-meter-bars { display: flex; gap: ${s("hairline")}; height: 100%; }
.nc-meter-bar {
  position: relative;
  width: ${s("meter-width")};
  height: 100%;
  overflow: hidden;
  background: ${s("meter-track")};
}
.nc-meter-peak, .nc-meter-rms {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  transition: none;
}
.nc-meter-peak { background: ${s("meter-peak")}; }
.nc-meter-rms { background: ${s("meter-fill")}; }
.nc-meter-hold {
  position: absolute;
  inset: 0;
  border-top: ${s("rule-strong")} solid ${s("meter-hold-mark")};
  transform: translateY(100%);
  transition: none;
}
.nc-meter-hold[data-off="true"] { visibility: hidden; }
/* An FX card's level meter (fx-level.js): two thin bars beside the switch, in (left) and out (right), on the card's own
   divider. Fixed size, so it never moves the header; the loop writes transforms, so nothing transitions. A bypassed
   card dims it by colour; the hot colour (ASTRID's title orange) shows only within 1 dB of full scale. Folded, it sits at the foot of the
   column and gives way when there is no room. */
.nc-fx-level { display: inline-flex; flex: none; align-items: stretch; gap: ${s("hairline")}; height: ${s("fx-level-height")}; }
.nc-fx-level-bar { position: relative; width: ${s("fx-level-bar")}; overflow: hidden; background: ${s("divider")}; }
.nc-fx-level[data-nc-rows="1"] > [data-nc-level="out"] { display: none; }
.nc-fx-level-fill {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  background: ${s("fx-level-in")};
  transition: none;
}
[data-nc-level="out"] > .nc-fx-level-fill { background: ${s("fx-level-out")}; }
[data-nc-dim="true"] .nc-fx-level-fill { background: ${s("text-sub")}; }
.nc-fx-level-fill[data-clip="true"], [data-nc-dim="true"] .nc-fx-level-fill[data-clip="true"] { background: ${s("fx-level-hot")}; }
.nc-ui-fx-fold > .nc-fx-level { margin-top: auto; height: auto; flex: 0 1 ${s("fx-level-fold-length")}; min-height: 0; }
.nc-strip-db {
  min-width: 0;
  max-width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size")};
  font-variant-numeric: tabular-nums;
  color: ${s("text")};
  white-space: nowrap;
  cursor: default;
  transition: none;
}
.nc-strip-db:not(:disabled) { cursor: text; }
.nc-strip-db:hover { text-decoration: underline; text-decoration-color: ${s("divider")}; text-underline-offset: ${s("control-gap")}; }
/* The type-in: the readout opened as a field, the same size and font, an accent hairline under it. */
.nc-strip-db-input {
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  border-bottom: ${s("hairline")} solid ${s("accent")};
  border-radius: 0;
  background: transparent;
  color: ${s("text")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size")};
  font-variant-numeric: tabular-nums;
  text-align: center;
}
.nc-strip-db-input:focus-visible { outline: none; }
/* The add slot: a ghost strip after the last channel, "+ Add" over a select of what can be added. */
.nc-strip-add {
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${s("strip-width")};
  margin-inline-start: ${s("module-gap")};
  border: ${s("hairline")} dashed ${s("divider")};
  color: ${s("text-sub")};
  transition-property: color, border-color;
  transition-duration: ${s("transition-feedback")};
}
.nc-strip-add:hover, .nc-strip-add:focus-within { color: ${s("text")}; border-color: ${s("text-sub")}; }
.nc-strip-add-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${s("control-gap")};
  pointer-events: none;
}
.nc-strip-add-plus { font-family: ${s("font-readout")}; font-size: ${s("title-size-slim")}; line-height: 1; }
.nc-strip-add-label {
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
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
  font-size: ${s("body-size")};
}
.nc-strip-add:has(.nc-strip-add-select:focus-visible) { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-strip-db:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
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
    border-top: ${s("hairline")} solid ${s("module-div-stack-1")};
  }
  /* Phones: the master as narrow as a channel strip, so the strips keep the room. */
  .nc-strip[data-nc-master] { width: ${s("strip-width")}; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] { padding-inline: 0; }
}
@media (min-width: 1024px) {
  .nc-module-body[data-nc-layout="console"] {
    margin-inline: calc(${s("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${s("module-pad-y-desktop")} * -1);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] {
    padding-inline-start: ${s("module-pad-x-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip {
    padding-bottom: ${s("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip-add {
    margin-bottom: ${s("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
    padding-inline-end: ${s("module-pad-x-desktop")};
    padding-bottom: ${s("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx {
    margin: 0;
    padding: ${s("stack-card-pad-y")} ${s("module-pad-x-desktop")} ${s("module-pad-y-desktop")};
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
  background: ${s("accent")};
  font-family: ${s("font-ui")};
  pointer-events: none;
}
@media (min-width: 768px) {
  .nc-page { padding: ${s("page-pad-y-md")} ${s("page-pad-x-md")}; }
  .nc-page-hd { flex-direction: row; align-items: flex-end; justify-content: space-between; padding-bottom: ${s("page-head-gap-md")}; }
  .nc-page-hd::before { top: calc(${s("page-pad-y-md")} * -1); left: calc(${s("page-pad-x-md")} * -1); right: calc(${s("page-pad-x-md")} * -1); }
}
/* A minimized full-width module (compact, e.g. the Studio's Mix): one slim bar at every width, title, then the summary
   on one line (cut with an ellipsis), then the index. Overrides the column-wise slim of side-by-side modules. */
.nc-module[data-nc-compact][data-nc-slim] {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  gap: ${s("header-gap")};
  padding-inline: ${s("module-pad")};
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
html[data-nc-hosted] .nc-page { padding-top: ${s("module-gap")}; min-height: 0; }
html[data-nc-hosted] .nc-page-hd {
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${s("module-gap")};
}
html[data-nc-hosted] .nc-page-hd::before { display: none; }
html[data-nc-hosted] .nc-page-hd > :first-child { display: none; }
html[data-nc-hosted] .nc-page-body { padding-top: ${s("module-gap")}; }
/* Tablets (769-1023 px): the same 2 x 5 slot grid as phones and desktop; one row of 10 drew 14 px slots here. */
@media (min-width: 769px) and (max-width: 1023px) {
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${s("control-gap")};
  }
  .nc-snap-wrap { width: 100%; max-width: none; height: ${s("target-min")}; }
  .nc-snap { font-size: ${s("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
}
@media (min-width: 1024px) {
  .nc-page-body { padding-top: ${s("page-body-gap-lg")}; }
}
@media (min-width: 1280px) {
  .nc-page { padding-inline: ${s("page-pad-x-xl")}; }
  .nc-page-hd::before { left: calc(${s("page-pad-x-xl")} * -1); right: calc(${s("page-pad-x-xl")} * -1); }
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
    gap: ${s("control-gap")};
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
  .nc-module[data-nc-slim] .nc-slim { margin-top: ${s("module-gap")}; }
  .nc-module[data-nc-slim] .nc-slim-lines { white-space: normal; }
  .nc-ui-fx {
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
    gap: ${s("module-gap")};
    padding-block: ${s("control-gap")};
    background: ${s("surface-page")};
    border-bottom: ${s("hairline")} solid ${s("divider")};
  }
  .nc-pads {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: ${s("module-gap")};
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
/* Phones in landscape (Peter, 2026-11-01: "these sections can be side by side in landscape mode"): a short, wide
   screen puts the modules side by side, as many columns as fit at two slim columns wide (two or three on a phone),
   each module at its own height, in reading order; the lead (a step grid) takes two columns and two rows. Tablets and
   desktops are unchanged. An instrument inside the Studio has a frame as tall as its page, so its own media never
   reads as landscape: the Studio sets html[data-nc-landscape] on the frame when the Studio's screen is (LANDSCAPE_PHONE). */
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Ti("")}
}
@media (max-width: 1023px) {
${Ti("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Oo("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Oo("")}
}
@media (max-width: 1023px) {
${Oo("html[data-nc-landscape] ")}
}
@media (prefers-reduced-motion: reduce) {
  .nc-btn, .nc-btn:active, .nc-toggle, .nc-seg > button, .nc-sparkle, .nc-sparkle-btn, .nc-sparkle-btn:active,
  .nc-ui-toast, .nc-ui-toast[data-state="closing"], .nc-ui-switch, .nc-select,
  .nc-meter, .nc-meter-fill, .nc-step[data-playhead="true"], .nc-fader-cap, .nc-meter-clip, .nc-ui-fx, .nc-ui-fx-fold, .nc-strip, .nc-eq-node::after, .nc-fx-max-icon > i, .nc-fold-tri {
    transition: none;
    animation: none;
  }
  .nc-snap[data-queued="true"][data-pulse="true"] {
    outline-color: ${s("accent-faint")};
    background: transparent;
    box-shadow: inset 0 calc(-1 * ${s("focus-width")} * 2) 0 ${s("accent-faint")};
  }
}
`}var Ro=null,tf="nc-ui-fallback";function Tc(e=globalThis.document){if(!e?.documentElement||(e.documentElement,Ro&&Ro.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${tf} {
${ef()}
}
`,e.head.append(t),Ro=t}var Cn=null,nf=0,af=new URL("/nyx/assets/confirm-DwyQU4Nn.css",import.meta.url).href,Cc=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=af,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Cc(document);function Nc(e){return of(e).then(t=>!!t.ok)}function of({title:e,body:t,lines:n=[],extra:a,confirmLabel:o="Confirm",cancelLabel:r="Cancel",danger:i=!1,root:l,returnFocus:c,signal:d},u){if(Cn||d?.aborted)return Promise.resolve({});let p=l?.ownerDocument??document,h=Cc(p),m=l??p.body,g=p.defaultView??globalThis,v=`nc-ui-confirm-${++nf}`,f=(q,ye,pe)=>{let rt=p.createElement(q);return rt.className=`nc-ui-confirm${ye}`,pe!=null&&(rt.textContent=pe),rt},b=f("div","-layer");b.dataset.state="enter";let y=f("div","");y.setAttribute("role","alertdialog"),y.setAttribute("aria-modal","true"),y.setAttribute("aria-labelledby",`${v}-t`);let w=f("h2","-title",e);w.id=`${v}-t`;let x=f("p","-body",t);x.id=`${v}-b`;let S=n.map((q,ye)=>{let pe=f("p","-body",q?.text??q);return pe.id=`${v}-b${ye}`,q?.tone==="danger"&&(pe.dataset.tone="danger"),pe});y.setAttribute("aria-describedby",[x,...S].map(q=>q.id).join(" "));let $=a&&f("button","-extra",a.label);$&&($.type="button",$.dataset.ncConfirm="extra",$.addEventListener("click",()=>a.onAction?.()));let k=f("div","-actions"),A=(q,ye)=>{let pe=f("button","-btn",q);return pe.type="button",pe.dataset.ncConfirm=ye,pe.addEventListener("click",()=>Yt(ye==="ok")),pe},M=A(r,"cancel"),H=A(o,"ok");i&&(H.dataset.danger="true"),k.append(M,H);let[j,O]=[];y.append(w,x,...S,...j?[j]:[],...$?[$]:[],k);let P=[O,$,M,H].filter(Boolean);b.append(y);let te={layer:b};Cn=te;let ae=c??p.activeElement,J=[];for(let q of m.children)q.hasAttribute("inert")||(q.setAttribute("inert",""),J.push(q));let Re=()=>{if(Cn!==te)return;m.append(b),(O??M).focus({preventScroll:!0});let q=g.requestAnimationFrame?.bind(g)??(ye=>setTimeout(ye,16));q(()=>q(()=>{b.dataset.state==="enter"&&(b.dataset.state="open")}))};h?h.then(Re):Re();let ue=!1;b.addEventListener("pointerdown",q=>{ue=q.target===b}),b.addEventListener("click",q=>{q.target===b&&ue&&Yt(!1),ue=!1});let Sn=q=>{if(q.stopImmediatePropagation(),q.key==="Escape")q.preventDefault(),Yt(!1);else if(q.key==="Tab"){q.preventDefault();let ye=P.filter(rt=>!rt.disabled),pe=ye.length;ye[(ye.indexOf(p.activeElement)+(q.shiftKey?pe-1:1))%pe].focus()}else q.key==="Enter"&&(q.preventDefault(),p.activeElement===$?$.click():p.activeElement===M?Yt(!1):H.disabled||Yt(!0))},ha=q=>q.stopImmediatePropagation();g.addEventListener("keydown",Sn,!0),g.addEventListener("keyup",ha,!0);let An=()=>Yt(!1);d?.addEventListener("abort",An);let En,kp=new Promise(q=>{En=q});function Yt(q){if(Cn!==te)return;Cn=null,g.removeEventListener("keydown",Sn,!0),g.removeEventListener("keyup",ha,!0),d?.removeEventListener("abort",An);for(let Xt of J)Xt.removeAttribute("inert");b.dataset.state="closing",ae?.isConnected&&typeof ae.focus=="function"&&ae.focus({preventScroll:!0});let ye=g.getComputedStyle?.(b),pe=Math.max(0,...String(ye?.transitionDuration??"").split(",").map(Xt=>Number.parseFloat(Xt)*(Xt.trim().endsWith("ms")?1:1e3)||0)),rt=()=>b.remove();b.addEventListener("transitionend",Xt=>Xt.target===b&&rt()),setTimeout(rt,pe+50),En({ok:q,value:O?.value.trim()})}return kp}function Fc(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let o=t.createElement("span");o.dataset.ncOn="",o.textContent=e.onText??"On";let r=t.createElement("span");r.dataset.ncOff="",r.textContent=e.offText??"Off",a.append(o,r),n.append(a);let i=!1,l=d=>{i=d===!0,n.setAttribute("aria-checked",i?"true":"false")};l(e.checked);let c=()=>{l(!i),e.onChange?.(i)};return n.addEventListener("click",c),{el:n,get checked(){return i},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var Pc=new WeakMap,Ci=.25;function rf(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let o=t.createElement("span");o.className="nc-fader-cap",o.setAttribute("aria-hidden","true"),n.append(a,o);let r=0,i=e.step??.005,l=e.onChange,c=e.onReset,d=f=>Math.min(1,Math.max(0,f)),u=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},p=f=>{let b=d(f);b!==r&&(r=b,u(),l?.(b))},h=0,m=!1;n.addEventListener("pointerdown",f=>{if(f.button!==0)return;f.preventDefault(),n.focus?.({preventScroll:!0});let b=n.getBoundingClientRect();f.target!==o&&b.height>0&&p(1-(f.clientY-b.top)/b.height),h=f.clientY,m=!0,n.dataset.dragging="true",n.setPointerCapture?.(f.pointerId)}),n.addEventListener("pointermove",f=>{if(!m)return;let b=n.getBoundingClientRect().height||1,y=(h-f.clientY)/b*(f.shiftKey?Ci:1);h=f.clientY,p(r+y)});let g=()=>{m=!1,delete n.dataset.dragging};n.addEventListener("pointerup",g),n.addEventListener("pointercancel",g),n.addEventListener("lostpointercapture",g),n.addEventListener("dblclick",f=>{f.preventDefault(),c?.()}),n.addEventListener("keydown",f=>{let b=f.shiftKey?i*Ci:i,y={ArrowUp:r+b,ArrowRight:r+b,ArrowDown:r-b,ArrowLeft:r-b,PageUp:r+i*10,PageDown:r-i*10,Home:0,End:1};f.key in y&&(f.preventDefault(),p(y[f.key]))});let v={el:n,get value(){return r},get dragging(){return m},set(f){m||(r=d(Number(f)||0),u())},setText(f){f?n.setAttribute("aria-valuetext",f):n.removeAttribute("aria-valuetext")},setLabel(f){n.setAttribute("aria-label",f)},configure(f){typeof f.step=="number"&&f.step>0&&(i=f.step),f.onChange&&(l=f.onChange),f.onReset&&(c=f.onReset)}};return v.setLabel(e.label),v.set(e.value??0),v.setText(e.valueText),Pc.set(n,v),v}function sf(e){return Pc.get(e)}var zc=new WeakMap,lf=.2,cf=1.5,df=.5;function uf(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function Ni(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:uf(a.getComputedStyle(e).getPropertyValue(G(t)),n)}function pf(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let o=t.createElement("button");o.type="button",o.className="nc-meter-clip",o.dataset.lit="false";let r=t.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let i=[];for(let v=0;v<n;v++){let f=t.createElement("span");f.className="nc-meter-bar";let b=t.createElement("span");b.className="nc-meter-peak";let y=t.createElement("span");y.className="nc-meter-rms";let w=t.createElement("span");w.className="nc-meter-hold",f.append(b,y,w),r.append(f),i.push({peak:b,rms:y,hold:w,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(o,r);let l=e.label,c=e.onClear,d=!1,u=-1,p=-1,h=()=>{o.dataset.lit=d?"true":"false",o.setAttribute("aria-pressed",d?"true":"false"),o.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),o.title=d?"Clipped. Click to clear":"Clip light"},m=(v,f,b,y)=>{let w=Math.round(y*1e3)/1e3;b[f]!==w&&(b[f]=w,v.style.transform=f==="hold"?`translateY(${Math.round((1-w)*1e3)/10}%)`:`scaleY(${w})`)};o.addEventListener("click",()=>{g.clear(),c?.()});let g={el:a,get clipped(){return d},update(v,f){u<0&&(u=Ni(a,"motion-meter-fall",lf)),p<0&&(p=Ni(a,"motion-meter-hold",cf));let b=Math.max(0,Math.min(.25,Number(f)||0)),y=u>0?Math.exp(-b/u):0;i.forEach((w,x)=>{let S=v[x]??v[0]??{peak:0,rms:0},$=Math.min(1,Math.max(0,Number(S.peak)||0)),k=Math.min($,Math.max(0,Number(S.rms)||0));S.over&&g.clip(),w.level.peak=$>=w.level.peak?$:$+(w.level.peak-$)*y,w.level.rms=k>=w.level.rms?k:k+(w.level.rms-k)*y,w.holdAge+=b,$>=w.holdAt?(w.holdAt=$,w.holdAge=0):w.holdAge>p&&(w.holdAt=Math.max($,w.holdAt-df*b)),m(w.peak,"peak",w.shown,w.level.peak),m(w.rms,"rms",w.shown,w.level.rms),m(w.hold,"hold",w.shown,w.holdAt),w.hold.dataset.off=w.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,h())},clear(){d=!1,h()},reset(){for(let v of i)v.level.peak=0,v.level.rms=0,v.holdAt=0,v.holdAge=0,m(v.peak,"peak",v.shown,0),m(v.rms,"rms",v.shown,0),m(v.hold,"hold",v.shown,0),v.hold.dataset.off="true"},setLabel(v){l=v,h()},configure(v){v.onClear&&(c=v.onClear)}};return h(),g.reset(),zc.set(a,g),g}function hf(e){return e?zc.get(e):void 0}var ff=3,mf=new Set(["freq","q","rate","time","log"]);function ss(e,t,n){return!e||!mf.has(e)||!(n>t)?"linear":t>0?"log":"power"}function go(e,t,n){return ss(e,t,n)!=="linear"}function Ha(e,t,n,a){let o=Number(a);if(!(n>t)||!Number.isFinite(o))return 0;let r=Math.min(n,Math.max(t,o)),i=ss(e,t,n);if(i==="log")return Math.log(r/t)/Math.log(n/t);let l=(r-t)/(n-t);return i==="power"?Math.cbrt(l):l}function Dc(e,t,n,a){let o=Math.min(1,Math.max(0,Number(a)||0)),r=ss(e,t,n);return r==="log"?t*(n/t)**o:t+(n-t)*(r==="power"?o**ff:o)}function Bc(e,t,n,a){let o=Math.min(n,Math.max(t,e));if(a>0){o=t+Math.round((o-t)/a)*a;let r=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));o=Number(o.toFixed(r)),o=Math.min(n,Math.max(t,o))}return o}function is(e,t,n,a){return Math.round(Ha(e,t,n,a)*1e3)}function fr(e,t,n,a,o){return Bc(Dc(e,t,n,Number(a)/1e3),t,n,o)}function gf(e,t,n=!1){let a=Number(e)||0,o=n?1:1e3/100,r=null;return t==="ArrowRight"||t==="ArrowUp"?r=a+o:t==="ArrowLeft"||t==="ArrowDown"?r=a-o:t==="PageUp"?r=a+1e3/10:t==="PageDown"?r=a-1e3/10:t==="Home"?r=0:t==="End"&&(r=1e3),r===null?null:Math.min(1e3,Math.max(0,Math.round(r)))}function Oc(e,t,n,a,o,r=!1,i){let l=is(e,t,n,a),c=gf(l,o,r);if(c===null)return null;let d=fr(e,t,n,c,i),u=Math.sign(c-l),p=Bc(Number(a),t,n,i);for(;u!==0&&d===p&&c>0&&c<1e3;)c+=u,d=fr(e,t,n,c,i);return d}function bf(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function Fi(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function yf(e,t,n,a=n/6){let o=e.some(u=>u===null),r=Math.max(0,n-(o?a:0)),i=e.reduce((u,p,h)=>p===null?u:u+Fi(t[h]),0),l=i>0?r/i:0,c=e.map(u=>u===null?0:Math.min(r,Fi(u)*l));if(o){let u=c.reduce((h,m)=>h+m,0),p=e.indexOf(null);c[p]=Math.max(a,n-u)}let d=[0];for(let u of c)d.push(Math.round((d[d.length-1]+u)*100)/100);return o&&(d[d.length-1]=n),d}function wf(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.floor(t*a)),r=Math.max(1,Math.floor(n*a));(e.width!==o||e.height!==r)&&(e.width=o,e.height=r);let i=e.getContext("2d");return i?.setTransform(a,0,0,a,0,0),{ctx:i,w:t,h:n}}function st(e){return Math.max(0,Math.min(1,e))}function Rc(e,t){let{ctx:n,w:a,h:o}=wf(e);if(!n)return;n.clearRect(0,0,a,o);let r=Jh(e);if(t.paint==="swatch"){let c=se(e,"accent"),d=se(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,a/2,o),n.fillStyle=d,n.fillRect(a/2,0,a/2,o);return}if(t.paint==="filter"&&typeof t.hz=="number"){kf(n,a,o,t,e,r);return}if(t.paint==="filter"){let c=t.mode??"lp",d=se(e,Lc(c)),u=se(e,"divider"),p=st(t.cutoff??.5),h=.08+(1-st(t.resonance??.2))*.22;n.strokeStyle=u,n.beginPath(),n.moveTo(0,o*.72),n.lineTo(a,o*.72),n.stroke(),n.beginPath();for(let m=0;m<=a;m++){let g=m/Math.max(1,a),v=0;c==="lp"?v=g<p?1:Math.max(0,1-(g-p)/h):c==="hp"?v=g>p?1:Math.max(0,1-(p-g)/h):v=Math.max(0,1-Math.abs(g-p)/h);let f=o*.78-v*o*.62;m===0?n.moveTo(m,f):n.lineTo(m,f)}n.strokeStyle=d,n.stroke(),n.fillStyle=se(e,"text-sub"),n.font=r,n.fillText(c.toUpperCase(),0,o),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=se(e,"accent");let c=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[u,p,h]=yf([c,d],t.max??[1,4],a),m=2,g=o-1;n.beginPath(),n.moveTo(u,g),n.lineTo(p,m);let v=Math.max(1,Math.ceil(h-p));for(let f=1;f<=v;f++){let b=f/v;n.lineTo(p+(h-p)*b,g-(g-m)*Math.exp(-4.6*b)*(1-b*.01))}n.lineTo(h,g),n.lineTo(a,g),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[d,u]=Array.isArray(t.region)?t.region:[0,1],p=se(e,"accent"),h=se(e,"text-sub"),m=o/2;n.fillStyle=se(e,"accent-soft"),n.fillRect(st(d)*a,0,(st(u)-st(d))*a,o),n.strokeStyle=se(e,"divider"),n.beginPath(),n.moveTo(0,m),n.lineTo(a,m),n.stroke();let g=Math.floor(c.length/2);for(let v=0;v<g;v++){let f=(v+.5)/g*a,b=Math.max(-1,Math.min(1,c[v*2]??0)),y=Math.max(-1,Math.min(1,c[v*2+1]??0)),w=(v+.5)/g;n.strokeStyle=w>=d&&w<=u?p:h,n.beginPath(),n.moveTo(f,m-y*(m-1)),n.lineTo(f,m-b*(m-1)+.5),n.stroke()}n.strokeStyle=p;for(let v of[d,u,...Array.isArray(t.markers)?t.markers:[]]){let f=Math.round(st(v)*(a-1))+.5;n.beginPath(),n.moveTo(f,0),n.lineTo(f,o),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=se(e,"text"),n.fillRect(Math.round(st(t.position)*(a-1)),0,1,o)),g||(n.fillStyle=h,n.font=r,n.fillText(t.empty??"Empty",0,m+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let c=st(t.level??0);n.fillStyle=se(e,"divider"),n.fillRect(0,o*.4,a,o*.2),n.fillStyle=se(e,"accent"),n.fillRect(0,o*.4,a*c,o*.2),e.dataset.ncAccent=n.fillStyle;return}let i=Math.max(1,t.steps??16),l=((t.step??0)%i+i)%i;n.fillStyle=se(e,"rhythm.step-cell-off"),n.fillRect(0,o*.45,a,o*.1),n.fillStyle=se(e,"rhythm.playhead"),n.fillRect(l/i*a,o*.3,Math.max(1,a/i),o*.4),e.dataset.ncAccent=se(e,"accent")}var Hn=20,mr=2e4,Io=24,Pi=-60;function vf(e,t,n,a,o=48e3){let r=2*Math.PI*Math.min(t,o*.49)/o,i=Math.cos(r),l=Math.sin(r)/(2*n),c,d,u;e==="hp"?[c,d,u]=[(1+i)/2,-(1+i),(1+i)/2]:e==="bp"?[c,d,u]=[l,0,-l]:[c,d,u]=[(1-i)/2,1-i,(1-i)/2];let p=1+l,h=-2*i,m=1-l,g=2*Math.PI*a/o,v=(w,x,S)=>w+x*Math.cos(g)+S*Math.cos(2*g),f=(w,x)=>-(w*Math.sin(g)+x*Math.sin(2*g)),b=Math.hypot(v(c,d,u),f(d,u)),y=Math.hypot(v(p,h,m),f(h,m));return y>0?b/y:0}function xf(e,t){return Math.log(Math.max(Hn,Math.min(mr,e))/Hn)/Math.log(mr/Hn)*t}function zi(e,t,n){let a=Math.max(Pi,Math.min(Io,e));return t+(Io-a)/(Io-Pi)*(n-t)}function kf(e,t,n,a,o,r){let i=a.mode??"lp",l=se(o,Lc(i)),c=se(o,"divider"),d=se(o,"text-sub"),u=Number.parseFloat(String(r).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,h=Math.max(p+4,n-u-3),m=a.q??Math.SQRT1_2,g=Math.round(zi(0,p,h))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,g),e.lineTo(t,g),e.stroke(),e.beginPath();for(let v=0;v<=t;v++){let f=Hn*(mr/Hn)**(v/Math.max(1,t)),b=a.open?1:vf(i,a.hz,m,f,a.sampleRate),y=zi(20*Math.log10(Math.max(1e-5,b)),p,h);v===0?e.moveTo(v,y):e.lineTo(v,y)}if(e.strokeStyle=l,e.stroke(),!a.open){let v=Math.round(xf(a.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(v,p),e.lineTo(v,h),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=r,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",o.dataset.ncAccent=l,o.dataset.ncFilterHz=String(Math.round(a.hz))}function qe(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let o=n.defaultView.getComputedStyle(a).color;return a.remove(),o}function $f(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var Ot=20,oa=2e4,ls=Math.log(oa/Ot),gr=32,Sf=250,Af=-100,Ef=1200,Mf=4.5,Di=-6,Lt=-96,Lf=48,Bi=[100,1e3,1e4],Tf=[6,12];function on(e,t){return Math.log(Math.max(Ot,Math.min(oa,e))/Ot)/ls*t}function La(e,t){return Ot*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*ls)}function bt(e,t,n,a){let o=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*o}function br(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var Ic=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Cf(e,t,n,a){let o=n?3:1,r=c=>({db:Math.max(-a,Math.min(a,e.db+c*o))}),i=c=>({hz:Math.max(e.minHz??Ot,Math.min(e.maxHz??oa,e.hz*2**(c*o/6)))}),l=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*o)))});switch(t){case"ArrowUp":return r(1);case"ArrowDown":return r(-1);case"ArrowRight":return e.moveHz?i(1):r(1);case"ArrowLeft":return e.moveHz?i(-1):r(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function cs(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function Nf(e,t,n,a,o,r,i,l,c){let d=c?.25:1,u={},p=Math.max(1,r/2-l);if(u.db=Math.max(-i,Math.min(i,t.db-a*d/p*i/cs(e))),e.moveHz){let h=t.hz*Math.exp(n*d/Math.max(1,o)*ls);u.hz=Math.max(e.minHz??Ot,Math.min(e.maxHz??oa,h))}return u}function Ff(e,t,n,a,o){let r=Math.max(0,n.left)+1,i=Math.min(n.right,o)-1,l=Math.min(t.width*3+a*2,i-r),c=Math.max(r,Math.min(e.left,i-l));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var de=new WeakMap;function Pf(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let o=document.createElement("canvas");o.className="nc-eq-spectrum",o.setAttribute("aria-hidden","true");let r=document.createElement("canvas");r.className="nc-eq-curve",r.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-eq-tip",i.setAttribute("aria-hidden","true"),i.hidden=!0,a.append(o,r);for(let c of e.bands)a.append(zf(n,c,t));a.append(i),a.addEventListener("click",c=>{if(!Uc(n)||c.button>0)return;let d=Wc(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),de.set(n,{control:e,cache:null,spec:null,active:null}),_c(n,e),n}function qc(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function zf(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let o=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},r=()=>o()?.bands.find(d=>d.id===t.id)??null,i=null;a.addEventListener("pointerdown",d=>{if(d.button!==0)return;let u=r();u&&(d.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(d.pointerId),i={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:u.hz,db:u.db}},a.dataset.drag="true",it(e,t.id))}),a.addEventListener("pointermove",d=>{if(!i||d.pointerId!==i.id)return;let u=o(),p=r(),h=de.get(e);if(!u||!p||!h?.box)return;let{w:m,h:g,pad:v}=h.box;u.onBand(p.id,Nf(p,i.start,d.clientX-i.x,d.clientY-i.y,m,g,u.range??18,v,d.shiftKey))});let l=d=>{!i||d.pointerId!==i.id||(i=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&it(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",d=>{d.preventDefault(),o()?.onReset?.(t.id)}),a.addEventListener("keydown",d=>{let u=o(),p=r();if(!u||!p)return;let h=Cf(p,d.key,d.shiftKey,u.range??18);h&&(d.preventDefault(),h==="reset"?u.onReset?.(p.id):u.onBand(p.id,h),it(e,p.id))});let c=null;return a.addEventListener("wheel",d=>{let u=o(),p=r();if(!u||!p?.moveQ)return;d.preventDefault();let h=d.timeStamp;(!c||h-c.t>400)&&(c={q:p.q,t:h});let m=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,c.q*2**(-m/240))),c.t=h,u.onBand(p.id,{q:c.q}),it(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>it(e,t.id)),a.addEventListener("focus",()=>it(e,t.id)),a.addEventListener("pointerleave",()=>{!i&&e.ownerDocument.activeElement!==a&&it(e,null)}),a.addEventListener("blur",()=>{i||it(e,null)}),a}function it(e,t){let n=de.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?fn(e):ds(e)}function ds(e){let t=de.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(g=>g.id===t.active):null;for(let g of e.querySelectorAll(".nc-eq-node"))g instanceof HTMLElement&&(a&&g.dataset.band===a.id?g.dataset.active="true":delete g.dataset.active);if(!a||!t.box){n.hidden=!0;return}let o=[a.label,Ic(a.db)];a.kind==="peak"?o.push(br(a.hz),`Q ${a.q.toFixed(1)}`):o.push(`${a.kind==="lowshelf"?"below":"above"} ${br(a.hz)}`),n.textContent=o.join(" · "),n.dataset.tone=String(Df(t.control,a)),n.hidden=!1;let{w:r,h:i,pad:l}=t.box,c=on(a.hz,r),d=bt(a.db*cs(a),i,t.control.range??18,l),u=n.offsetWidth,p=n.offsetHeight,h=Math.max(0,Math.min(r-u,c-u/2)),m=d-p-l*1.5>=0?d-p-l*1.5:Math.min(i-p,d+l*1.5);n.style.left=`${Math.round(h)}px`,n.style.top=`${Math.round(m)}px`}function Df(e,t){return e.bands.indexOf(t)%3+1}function _c(e,t){let n=de.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",us(e);let a=t.range??18;t.bands.forEach((o,r)=>{let i=qc(e,o.id);i instanceof HTMLElement&&(i.dataset.tone=String(r%3+1),i.dataset.kind=o.kind,i.setAttribute("aria-label",`${o.label} band`),i.setAttribute("aria-valuemin",String(-a)),i.setAttribute("aria-valuemax",String(a)),i.setAttribute("aria-valuenow",String(o.db)),i.setAttribute("aria-valuetext",o.valueText??`${Ic(o.db)}, ${br(o.hz)}`),i.setAttribute("aria-keyshortcuts",o.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),o.help?i.setAttribute("data-nc-help",o.help):i.removeAttribute("data-nc-help"))}),fn(e),_f(e)}function Hc(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.round(t*a)),r=Math.max(1,Math.round(n*a));(e.width!==o||e.height!==r)&&(e.width=o,e.height=r);let i=e.getContext("2d");return i?.setTransform(a,0,0,a,0,0),{ctx:i,w:t,h:n}}function jc(e){return{curve:qe(e,"eq-curve"),fill:qe(e,"eq-fill"),quiet:qe(e,"text-sub"),grid:qe(e,"eq-grid"),zero:qe(e,"divider"),label:qe(e,"text-sub"),spectrum:qe(e,"eq-spectrum"),bands:[qe(e,"eq-band-1"),qe(e,"eq-band-2"),qe(e,"eq-band-3")]}}function Bf(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function fn(e){de.has(e)&&us(e);let t=de.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:o,w:r,h:i}=Hc(n);if(!o)return;let l=Math.max(8,Math.round(i*.06)),c=a.range??18;t.box={w:r,h:i,pad:l},t.colours=jc(e);let d=t.colours,u=Bf(a,r);if(!t.cache||t.cache.key!==u){let x=Math.max(64,Math.ceil(r)+1),S=new Float64Array(x);for(let k=0;k<x;k++)S[k]=La(k/(x-1)*r,r);let $=null;try{$=typeof a.response=="function"?a.response(S):null}catch{$=null}t.cache={key:u,freqs:S,total:$?.total??new Float64Array(x),bands:$?.bands??[]}}o.clearRect(0,0,r,i);let p=$f(e),h=a.on!==!1;Of(o,r,i,c,l,d,p);let{freqs:m,total:g,bands:v}=t.cache,f=Array.from(m,x=>on(x,r)),b=bt(0,i,c,l);v.forEach((x,S)=>{if(!x||!x.some(A=>Math.abs(A)>.05))return;let $=h?d.bands[S%3]:d.quiet,k=Array.from(x,A=>bt(A,i,c,l));o.save(),t.active&&a.bands[S]?.id===t.active&&(o.globalAlpha=.14,o.fillStyle=$,Oi(o,f,k,b)),o.globalAlpha=h?.75:.4,o.strokeStyle=$,o.lineWidth=.75,qo(o,f,k),o.restore()});let y=Array.from(g,x=>bt(x,i,c,l)),w=h?d.curve:d.quiet;o.save(),o.fillStyle=h?d.fill:d.quiet,o.globalAlpha=h?.2:.08,Oi(o,f,y,b),o.restore(),o.save(),o.strokeStyle=h?d.fill:w,o.lineJoin="round",o.lineCap="round",h&&(o.globalAlpha=.16,o.lineWidth=4,qo(o,f,y)),o.globalAlpha=1,o.strokeStyle=w,o.lineWidth=1.25,qo(o,f,y),o.restore(),Rf(e),ds(e)}function Of(e,t,n,a,o,r,i){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let u=c*d;if(u<Ot||u>oa)continue;let p=Math.round(on(u,t))+.5;e.globalAlpha=Bi.includes(u)?.9:.35,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let c of Tf)if(!(c>a))for(let d of[1,-1]){let u=Math.round(bt(c*d,n,a,o))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(0,u),e.lineTo(t,u),e.stroke()}e.globalAlpha=1,e.strokeStyle=r.zero;let l=Math.round(bt(0,n,a,o))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=i,e.fillStyle=r.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of Bi){let d=c>=1e3?`${c/1e3}k`:String(c),u=e.measureText(d).width,p=on(c,t)+3;e.fillText(d,p+u+2>t?on(c,t)-u-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>a)continue;let d=bt(c,n,a,o);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(d)-1)}e.restore()}function ja(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let o=(t[a]+t[a+1])/2,r=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],o,r)}e.lineTo(t[t.length-1],n[n.length-1])}function qo(e,t,n){e.beginPath(),ja(e,t,n),e.stroke()}function Oi(e,t,n,a){e.beginPath(),ja(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function Wc(e){return e.closest("[data-nc-maxable]")}function Uc(e){let t=Wc(e);return!!t&&!t.hasAttribute("data-nc-max")}function us(e){let t=Uc(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=de.get(e);n?.active&&(n.active=null,ds(e))}return t}function Rf(e){us(e);let t=de.get(e);if(!t?.box)return;let{w:n,h:a,pad:o}=t.box,r=t.control.range??18;for(let i of t.control.bands){let l=qc(e,i.id);l instanceof HTMLElement&&(l.style.left=`${on(i.hz,n).toFixed(1)}px`,l.style.top=`${bt(i.db*cs(i),a,r,o).toFixed(1)}px`)}}function If(e,t,n,a){let o=a/2/n,r=new Float32Array(e),i=new Float32Array(e),l=new Float32Array(e);for(let c=0;c<e;c++){let d=(c-.5)/(e-1)*t,u=(c+.5)/(e-1)*t,p=La(d,t),h=La(u,t),m=La(c/(e-1)*t,t);r[c]=Math.min(n-1,p/o),i[c]=Math.min(n-1,h/o),l[c]=Mf*Math.log2(m/1e3)}return{lo:r,hi:i,tilt:l}}function qf(e,t,n){let a=Math.floor(t),o=Math.ceil(n);if(o-a<=1){let i=t-a,l=e[a]??-1/0,c=e[Math.min(e.length-1,a+1)]??l;return l+(c-l)*i}let r=-1/0;for(let i=a;i<=o&&i<e.length;i++)e[i]>r&&(r=e[i]);return r}function _f(e){let t=de.get(e);if(t){if(!t.control.spectrum){Xc(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let o=de.get(e)?.spec;o&&(o.visible=a.some(r=>r.isIntersecting),yr(e))}),t.spec.io.observe(e)):t.spec.visible=!0}yr(e)}}function yr(e){let t=de.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){Yc(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=wr(e),n.onVis||(n.onVis=()=>yr(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&vr(e,!1)}function wr(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function vr(e,t){let n=de.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,_o(e,wr(e))),Sf):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(o=>(n.raf=0,_o(e,o))):n.timer=a.setTimeout(()=>(n.timer=0,_o(e,wr(e))),gr))}function Yc(e){let t=de.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function Xc(e){let t=de.get(e)?.spec;if(!t)return;Yc(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=de.get(e);n&&(n.spec=null)}function _o(e,t){let n=de.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){Xc(e);return}if(!a.analyser)return;if(t-a.last<gr-4&&!a.idle){vr(e,!1);return}let o=a.last?Math.min(.25,(t-a.last)/1e3):gr/1e3;a.last=t;let r=e.querySelector(".nc-eq-spectrum");if(!(r instanceof HTMLCanvasElement))return;let{ctx:i,w:l,h:c}=Hc(r);if(!i)return;let d=Math.max(16,Math.round(l/2)),u=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==d||a.map.w!==l||a.map.sr!==u)&&(a.map={cols:d,w:l,sr:u,...If(d,l,a.buf.length,u)},a.disp=new Float32Array(d).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,h=Lf*o,{lo:m,hi:g,tilt:v}=a.map;for(let b=0;b<d;b++){let y=qf(a.buf,m[b],g[b]);y>p&&(p=y);let w=y+v[b],x=a.disp[b]-h;a.disp[b]=w>x?w:x}p>Af&&(a.loud=t);let f=t-a.loud>Ef;i.clearRect(0,0,l,c),(!f||a.disp.some(b=>b>Lt))&&Hf(i,l,c,a.disp,n.colours??jc(e)),a.idle=f&&!a.disp.some(b=>b>Lt),vr(e,a.idle)}function Hf(e,t,n,a,o){let r=a.length,i=new Array(r),l=new Array(r),c=d=>{let u=a[Math.max(0,Math.min(r-1,d))];return Number.isFinite(u)?u:Lt};for(let d=0;d<r;d++){let u=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,p=(Math.max(Lt,Math.min(Di,Number.isFinite(u)?u:Lt))-Lt)/(Di-Lt);i[d]=d/(r-1)*t,l[d]=n-p*n}e.save(),e.fillStyle=o.spectrum,e.globalAlpha=.13,e.beginPath(),ja(e,i,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=o.spectrum,e.lineWidth=1,e.beginPath(),ja(e,i,l),e.stroke(),e.restore()}var Le=new WeakMap,jf=450,Wf=6,Uf=33,Ho=24,Yf="http://www.w3.org/2000/svg";function Xf(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function Gf(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function Kf(e,t,n,a,o){let r=e.slice();if(t===a)return r[a]=o,r;let i=t<a?1:-1;for(let l=t;l!==a+i;l+=i){let c=(l-t)/(a-t);r[l]=Math.round((n+(o-n)*c)*100)/100}return r}function Vf(e,t){let n=e.steps[t],a=(e.shapes??[]).find(r=>r.value===n.shape),o=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${a?`, ${a.label}`:""}${o}`}function Tt(e,t){let n=document.createElementNS(Yf,e);for(let[a,o]of Object.entries(t))n.setAttribute(a,String(o));return n}function Gc(e){let t=Tt("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(Tt("path",{d:e})),t}function Qf(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-lsteps-plot",a.tabIndex=0,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical"),a.setAttribute("aria-valuemin","0"),a.setAttribute("aria-valuemax","100"),a.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let o=document.createElement("div");o.className="nc-lsteps-axis",o.setAttribute("aria-hidden","true");let r=document.createElement("div");r.className="nc-lsteps-shapes",r.setAttribute("role","tablist");let i=document.createElement("div");i.className="nc-lsteps-pick",i.setAttribute("role","menu"),i.hidden=!0,n.append(a,o,r,i);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let c={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return Le.set(n,c),Zf(n,a),em(n,i),Kc(n,e),n}function Ce(e){let t=Le.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function Jf(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function jo(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),a=Jf(e);return{i:Gf(t.clientX,a),level:Xf(t.clientY-n.top,n.height)}}function Zf(e,t){let n=Le.get(e),a=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",r=>{let i=Ce(e);if(!i||r.button>0||!i.steps.length)return;r.preventDefault(),Wa(e),t.setPointerCapture?.(r.pointerId);let l=jo(t,r),c=i.steps.map(d=>d.level);n.drag={id:r.pointerId,x:r.clientX,y:r.clientY,start:c,levels:c,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,Ri(e,l.i,l.level,l.i,l.level,!1),a(),n.timer=setTimeout(()=>{n.timer=0;let d=n.drag;!d||d.moved||(d.long=!0,Ce(e)?.onLevels(d.start.slice(),!0),Wo(e,d.i))},jf)}),t.addEventListener("pointermove",r=>{let i=n.drag;if(!i||i.id!==r.pointerId||i.long||!i.moved&&Math.hypot(r.clientX-i.x,r.clientY-i.y)<Wf)return;i.moved=!0,a();let l=jo(t,r);Ri(e,i.i,i.level,l.i,l.level,!1),i.i=l.i,i.level=l.level});let o=r=>{let i=n.drag;!i||i.id!==r.pointerId||(a(),n.drag=null,t.releasePointerCapture?.(r.pointerId),i.long||Ce(e)?.onLevels(i.levels.slice(),!0),xr(e,-1))};t.addEventListener("pointerup",o),t.addEventListener("pointercancel",r=>{let i=n.drag;!i||i.id!==r.pointerId||(a(),n.drag=null,i.long||Ce(e)?.onLevels(i.start.slice(),!0),xr(e,-1))}),t.addEventListener("contextmenu",r=>{Ce(e)?.onShape&&(r.preventDefault(),Wo(e,jo(t,r).i))}),t.addEventListener("keydown",r=>{let i=Ce(e);if(!i||!i.steps.length)return;let l=i.steps.length,c=Math.min(n.focus,l-1),d=i.steps[c].level,u=p=>{let h=i.steps.map(m=>m.level);h[c]=Math.round(Math.max(0,Math.min(1,p))*100)/100,i.onLevels(h,!0)};switch(r.key){case"ArrowLeft":n.focus=(c-1+l)%l;break;case"ArrowRight":n.focus=(c+1)%l;break;case"ArrowUp":u(d+(r.shiftKey?.01:.05));break;case"ArrowDown":u(d-(r.shiftKey?.01:.05));break;case"PageUp":u(d+.25);break;case"PageDown":u(d-.25);break;case"Home":u(1);break;case"End":u(0);break;case"Enter":case" ":if(!i.onShape)return;Wo(e,c);break;default:return}r.preventDefault(),kr(e)}),t.addEventListener("focus",()=>kr(e)),t.addEventListener("blur",()=>{for(let r of t.querySelectorAll("[data-focus]"))r.removeAttribute("data-focus")})}function Ri(e,t,n,a,o,r){let i=Le.get(e).drag;i&&(i.levels=Kf(i.levels,t,n,a,o),xr(e,a,i.levels[a]),Ce(e)?.onLevels(i.levels.slice(),r))}function xr(e,t,n){for(let a of e.querySelectorAll(".nc-lsteps-step"))Number(a.dataset.i)===t?(a.dataset.dragging="true",a.dataset.level=`${Math.round(n*100)}%`):a.removeAttribute("data-dragging")}function kr(e){let t=Le.get(e),n=e.querySelector(".nc-lsteps-plot"),a=Ce(e);if(!n||!a)return;for(let r of n.querySelectorAll(".nc-lsteps-step"))Number(r.dataset.i)===t.focus?r.dataset.focus="true":r.removeAttribute("data-focus");let o=Math.min(t.focus,a.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((a.steps[o]?.level??0)*100))),n.setAttribute("aria-valuetext",Vf(a,o))}function em(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),Wa(e,!0);return}let a=[...t.querySelectorAll("button")],o=a.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),a[(o+1)%a.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),a[(o-1+a.length)%a.length]?.focus())}),Le.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&Wa(e)}}function Wo(e,t){let n=Ce(e),a=e.querySelector(".nc-lsteps-pick"),o=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!a||!o)return;let r=Le.get(e);r.focus=t,a.textContent="";let i=document.createElement("span");i.className="nc-lsteps-pick-head",i.textContent=`Step ${t+1}`,a.append(i);for(let m of n.shapes??[]){let g=document.createElement("button");g.type="button",g.setAttribute("role","menuitemradio"),g.setAttribute("aria-checked",n.steps[t]?.shape===m.value?"true":"false"),m.icon&&g.append(Gc(m.icon)),g.append(document.createTextNode(m.label)),g.addEventListener("click",()=>{Ce(e)?.onShape?.(t,m.value),Wa(e,!0)}),a.append(g)}a.setAttribute("aria-label",`Shape of step ${t+1}`),a.hidden=!1,e.ownerDocument.addEventListener("pointerdown",r.outside,!0);let l=o.querySelector(`.nc-lsteps-step[data-i="${t}"]`),c=e.getBoundingClientRect(),d=l?.getBoundingClientRect(),u=a.getBoundingClientRect().width,p=d?d.left+d.width/2-c.left:0,h=Math.max(0,Math.min(c.width-u,p-u/2));a.style.setProperty("--nc-lsteps-pick-x",`${Math.round(h)}px`),a.querySelector('[aria-checked="true"]')?.focus?.()??a.querySelector("button")?.focus?.()}function Wa(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",Le.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function tm(e,t){let n=Le.get(e),a=e.querySelector(".nc-lsteps-plot"),o=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,a.textContent="",o.textContent="";for(let r=0;r<t;r++){let i=document.createElement("div");i.className="nc-lsteps-step",i.dataset.i=String(r),r%4===0&&r>0&&(i.dataset.beat="true");let l=Tt("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(Tt("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),Tt("path",{class:"nc-lsteps-env",d:""}),Tt("path",{class:"nc-lsteps-top",d:""}),Tt("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),i.append(l),a.append(i);let c=document.createElement("span");r%4===0&&(c.textContent=String(r+1)),r%4===0&&r>0&&(c.dataset.beat="true"),o.append(c)}}}function Kc(e,t){let n=Le.get(e);if(!n)return;n.control=t;let a=t.steps.length;tm(e,a),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let o=e.querySelector(".nc-lsteps-plot");o.setAttribute("aria-label",t.label??"Steps");let r=Math.max(.5,Math.min(.75,t.swing??.5)),i=o.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((m,g)=>{let v=i[g];if(!v)return;let f=String((g%2?1-r:r)*2);v.style.setProperty("--nc-lsteps-grow",f),l[g]?.style.setProperty("--nc-lsteps-grow",f),t.played!==void 0&&g>=t.played?v.dataset.out="true":v.removeAttribute("data-out"),v.dataset.zero=m.level<=0?"true":"false";let b=Math.max(0,Math.min(1,m.level)),y=v.querySelector(".nc-lsteps-level");y.setAttribute("y",String(100-b*100)),y.setAttribute("height",String(b*100));let w=t.curve?t.curve(g,Ho):null,x="M0 100",S="";for(let $=0;$<=Ho;$++){let k=w?Math.max(0,Math.min(1,w[$]??b)):b,A=$/Ho*100,M=100-k*100;x+=` L${A.toFixed(2)} ${M.toFixed(2)}`,S+=`${$?" L":"M"}${A.toFixed(2)} ${M.toFixed(2)}`}v.querySelector(".nc-lsteps-env").setAttribute("d",`${x} L100 100 Z`),v.querySelector(".nc-lsteps-top").setAttribute("d",S)});let c=e.querySelector(".nc-lsteps-shapes"),d=(t.shapes??[]).map(m=>`${m.value}:${m.label}`).join();if(d!==n.shapeKey){n.shapeKey=d,c.textContent="";for(let m of t.shapes??[]){let g=document.createElement("button");g.type="button",g.className="nc-lsteps-shape",g.setAttribute("role","tab"),g.dataset.shape=String(m.value),m.icon&&g.append(Gc(m.icon)),g.append(document.createTextNode(m.label)),g.addEventListener("click",()=>Ce(e)?.onShapeAll?.(m.value)),c.append(g)}}c.hidden=!(t.shapes?.length&&t.onShapeAll),c.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let u=t.played??a,p=t.steps[0]?.shape,h=t.steps.slice(0,u).every(m=>m.shape===p);for(let m of c.querySelectorAll(".nc-lsteps-shape")){let g=h&&m.dataset.shape===String(p);m.setAttribute("aria-selected",g?"true":"false"),m.tabIndex=g||!h&&m===c.firstElementChild?0:-1}n.focus>=a&&(n.focus=0),kr(e),n.last=-2,nm(e)}function nm(e){let t=Le.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&Uo(e,null);return}let a=0,o=r=>{if(t.loop=0,!e.isConnected||!t.control.playhead){Uo(e,null);return}r-a>=Uf&&(a=r,Uo(e,t.control.playhead())),t.loop=n.requestAnimationFrame(o)};t.loop=n.requestAnimationFrame(o)}function Uo(e,t){let n=Le.get(e),a=t&&Number.isInteger(t.step)?t.step:-1,o=!!t?.locked;if(!(n.last===a&&n.lastLocked===o)){n.last=a,n.lastLocked=o;for(let r of e.querySelectorAll(".nc-lsteps-step"))Number(r.dataset.i)===a?(r.dataset.playhead="true",r.dataset.locked=o?"true":"false"):(r.removeAttribute("data-playhead"),r.removeAttribute("data-locked"));e.dataset.free=t&&!o?"true":"false"}}var am=.8912509381337456,$r=32,om=250,rm=1200,sm=.2,Vc=1.5;function im(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function lm(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let o=e.createElement("span");o.className="nc-fx-level-fill",a.append(o),t.append(a)}return t}var Ua=new WeakMap,Ii=new WeakMap;function qi(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let o=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),r=Number.parseFloat(o);return Number.isFinite(r)?o.endsWith("ms")?r/1e3:r:n}function cm(e){let t=Ii.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(o=>{for(let r of o){let i=Ua.get(r.target);i&&(i.seen.set(r.target,r.isIntersecting),jn(i))}nn(t)})),e.addEventListener("visibilitychange",()=>{for(let o of t.recs)jn(o);nn(t)}),Ii.set(e,t),t}var Qc=e=>e.els.some(t=>t.isConnected);function dm(e){if(!e.loop.io)return Qc(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function jn(e){let t=!e.dead&&!!e.source&&dm(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=ps(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Er(e))}function ps(e){return e.doc.defaultView?.performance?.now()??Date.now()}function nn(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){Jc(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=ps(e)),!e.raf&&!e.timer&&Sr(e,!1)}function Sr(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>_i(e,ps(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),om):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(o=>(e.raf=0,_i(e,o))):e.timer=n.setTimeout(()=>(e.timer=0,a()),$r)}function Jc(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function _i(e,t){if(t-e.last<$r-4&&!e.idle&&e.last){Sr(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):$r/1e3;e.last=t,e.frames++;let a=!1,o=!1;for(let r of e.recs){if(!Qc(r)){(r.placed||e.frames-r.born>90)&&Zc(r);continue}r.placed=!0,r.open&&(o=!0,um(r,n,t)&&(e.loud=t),(r.disp[0]>0||r.disp[1]>0)&&(a=!0))}if(!o){Jc(e);return}e.idle=t-e.loud>rm&&!a,Sr(e,e.idle)}function um(e,t,n){if(e.fall<0){let h=e.els[0];e.fall=qi(h,"motion-meter-fall",sm),e.hold=qi(h,"motion-meter-hold",Vc)}let a=null;try{a=e.source.read()}catch{a=null}let o=typeof a=="number",r=o?a:Number(a?.in)||0,i=!o&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=i&&Number(a.out)||0,c=i?"2":"1";if(e.rows!==c){e.rows=c;for(let h of e.els)h.dataset.ncRows=c}let d=e.fall>0?Math.exp(-t/e.fall):0,u=[r,l],p=!1;for(let h=0;h<2;h++){let m=im(u[h]);m>0&&(p=!0),e.disp[h]=m>=e.disp[h]?m:m+(e.disp[h]-m)*d,e.disp[h]<.001&&(e.disp[h]=0),u[h]>=am&&(e.clipAt[h]=n);let g=e.clipAt[h]>0&&n-e.clipAt[h]<e.hold*1e3;Ar(e,h,e.disp[h],g)}return p}function Ar(e,t,n,a){let o=Math.round(n*1e3)/1e3,r=a?"true":"false";if(!(e.shown[t]===o&&e.clipShown[t]===r)){e.shown[t]=o,e.clipShown[t]=r;for(let i of e.els){let l=i.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${o})`,l.dataset.clip=r)}}}function Er(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Ar(e,0,0,!1),Ar(e,1,0,!1)}function Zc(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),Ua.get(t)===e&&Ua.delete(t)}function pm(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,o=cm(a),r={els:n,source:t??null,loop:o,open:!1,dead:!1,seen:new Map,born:o.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:Vc,rows:""};for(let i of n)Ua.set(i,r),o.io?.observe(i);if(o.recs.add(r),Er(r),!o.io){let i=a.defaultView,l=()=>{jn(r),nn(o)};typeof i?.requestAnimationFrame=="function"?i.requestAnimationFrame(l):setTimeout(l,0)}return{set(i){let l=i??null;if(!r.dead){if(l===r.source){jn(r),nn(o);return}r.open&&(r.open=!1,r.source?.close?.(),Er(r)),r.source=l,jn(r),nn(o)}},destroy(){r.dead||Zc(r),nn(o)}}}var ed={slop:8,longPressMs:500,pitchPx:16},hm=class{constructor(e,t,n=ed){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let o=this.hit(t,n);return o<0?!1:(this.phase="pending",this.pointer=e,this.pad=o,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let o=t-this.x0,r=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(o,r)<this.config.slop)return;Math.abs(r)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let i=Math.trunc(-r/this.config.pitchPx);i!==this.degrees&&(this.degrees=i,this.emit({kind:"pitch",pad:this.pad,degrees:i,phase:"move"}))}else if(this.phase==="paint"){let i=this.hit(t,n);i>=0&&i!==this.lastPad&&(this.lastPad=i,this.emit({kind:"paint",pad:i,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function fm(e,t,n,a=ed){let o=!1,r=0,i=(d,u)=>{let p=e.ownerDocument.elementFromPoint?.(d,u),h=[...e.querySelectorAll(t)],m=p?h.findIndex(f=>f===p||f.contains(p)):-1;if(m>=0)return m;let g=-1,v=Number.POSITIVE_INFINITY;return h.forEach((f,b)=>{if(f.hidden)return;let y=f.getBoundingClientRect();if(u<y.top||u>y.bottom)return;let w=Math.abs(d-(y.left+y.width/2));w<v&&w<=y.width&&(g=b,v=w)}),g},l=new hm(i,d=>{(d.kind==="paint"||d.kind==="long")&&(o=!0),n(d)},a),c=()=>{r&&clearTimeout(r),r=0};return e.addEventListener("pointerdown",d=>{d.button>0||(o=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),r=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),e.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{o&&(o=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var td="netcomposer.groups.v1";function hs(){try{return globalThis.localStorage??null}catch{return null}}function nd(e=hs(),t=td){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[o,r]of Object.entries(n))typeof r=="boolean"&&a.set(o,r);return a}catch{return new Map}}function mm(e,t,n,a=td){let o=nd(e,a);o.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(o)))}catch{}}function gm(e,t=hs()){return nd(t).get(e.id)??e.open===!0}function bm(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let o=document.createElement("button");o.type="button",o.className="nc-group-toggle",o.id=`${e.id}-group-toggle`;let r=document.createElement("span");r.className="nc-group-title";let i=document.createElement("span");i.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),o.append(r,i,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",o.id),o.setAttribute("aria-controls",c.id);for(let d of e.controls)c.append(n(d,t));return o.addEventListener("click",()=>{let d=a.dataset.ncOpen!=="true";mm(hs(),e.id,d),Mr(a,d);let u=t(a);u?.type==="group"&&u.onToggle?.(d)}),a.append(o,c),ad(a,e),Mr(a,gm(e)),od(a,e),a}function Mr(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let o=n?.querySelector(".nc-group-mark");o&&(o.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function ad(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function od(e,t){ad(e,t)&&Mr(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),o=t.summary??"";a&&a.textContent!==o&&(a.textContent=o)}var ba="application/x-nc-pad",Hi="http://www.w3.org/2000/svg";function ym(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],o=[];for(let r=0;r<n;r++){let i=Math.floor(r*t/n),l=Math.max(i+1,Math.floor((r+1)*t/n)),c=0,d=0;for(let p=i;p<l;p++)c=Math.min(c,e[2*p]??0),d=Math.max(d,e[2*p+1]??0);let u=n===1?50:r/(n-1)*100;a.push(`${u.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),o.push(`${u.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${a.join("L")}L${o.reverse().join("L")}Z`}function wm(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((o,r)=>a.append(vm(n,r,t))),n.append(a),n.addEventListener("keydown",o=>{o.key==="Escape"&&Ta(n)}),sd(n,e),n}function vm(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let o=document.createElement("span");o.className="nc-padgrid-pad-bar",o.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-padgrid-pad-name";let i=document.createElement("span");i.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(Hi,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(Hi,"path");return c.append(d),a.append(o,r,i,l,c),km(e,a,t,n),r.addEventListener("dblclick",()=>{let u=n(e);u?.type==="padGrid"&&u.onRename&&a.dataset.empty!=="true"&&rd(e,a,t,n)}),a.addEventListener("dragstart",u=>{if(a.dataset.empty==="true"||!u.dataTransfer){u.preventDefault();return}u.dataTransfer.setData(ba,String(t)),u.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",u=>{let p=u.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(ba)||(u.preventDefault(),u.stopPropagation(),u.dataTransfer&&(u.dataTransfer.dropEffect=p.includes(ba)&&!u.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",u=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let h=u.dataTransfer?.getData(ba);if(h!==void 0&&h!==""){u.preventDefault(),u.stopPropagation();let g=Number(h);g!==t&&p.onMove?.(g,t,u.altKey);return}let m=u.dataTransfer?.files?.[0];m&&(u.preventDefault(),u.stopPropagation(),p.onFile?.(t,m))}),a}function xm(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function km(e,t,n,a){let o=0,r=!1,i=0,l=0,c=()=>{window.clearTimeout(o),o=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;r=!1,i=d.clientX,l=d.clientY,c();let u=a(e);u?.type==="padGrid"&&(u.onDown?.(n),!(u.onDown&&d.pointerType==="mouse")&&(o=window.setTimeout(()=>{o=0,r=ji(e,t,n,a)},450)))}),t.addEventListener("pointermove",d=>{o&&Math.hypot(d.clientX-i,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,c);t.addEventListener("contextmenu",d=>{d.preventDefault(),c(),r=ji(e,t,n,a)}),t.addEventListener("click",()=>{if(r){r=!1;return}xm(e,n,a)})}function ji(e,t,n,a){let o=a(e);if(o?.type!=="padGrid"||!o.menu)return!1;let r=o.menu(n);if(!r.length)return!1;Ta(e);let i=document.createElement("div");i.className="nc-slot-scrim",i.setAttribute("aria-hidden","true"),i.addEventListener("pointerdown",u=>{u.preventDefault(),u.stopPropagation(),Ta(e)}),i.addEventListener("click",u=>u.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let u of r){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=u.id,p.textContent=u.label,p.addEventListener("click",()=>{Ta(e);let h=a(e);h?.type==="padGrid"&&(u.id==="rename"&&h.onRename?rd(e,t,n,a):h.onMenu?.(n,u.id))}),l.append(p)}e.append(i,l);let c=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function rd(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let o=a(e);if(o?.type!=="padGrid")return;let r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=o.nameMax??24,r.value=o.pads[n]?.label??"",r.setAttribute("aria-label",`Name of pad ${n+1}`);let i=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-i.left}px`,r.style.top=`${l.top-i.top}px`,r.style.width=`${l.width}px`;let c=!1,d=u=>{if(c)return;c=!0;let p=r.value.trim();r.remove(),t.focus();let h=a(e);u&&p&&h?.type==="padGrid"&&h.onRename?.(n,p)};r.addEventListener("keydown",u=>{u.stopPropagation(),u.key==="Enter"?d(!0):u.key==="Escape"&&d(!1)}),r.addEventListener("blur",()=>d(!0));for(let u of["pointerdown","click","dblclick"])r.addEventListener(u,p=>p.stopPropagation());e.append(r),r.focus(),r.select()}function Ta(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function sd(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,o)=>{let r=n[o];if(!(r instanceof HTMLButtonElement))return;let i=r.querySelector(".nc-padgrid-pad-name"),l=r.querySelector(".nc-padgrid-pad-hint"),c=r.querySelector(".nc-padgrid-pad-wave path"),d=r.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=a.empty?"":a.badge??""),r.draggable=!a.empty,a.empty?(r.dataset.empty="true",i&&(i.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete r.dataset.empty,i&&(i.textContent=a.label),l&&(l.textContent=a.hint??""),c?.setAttribute("d",ym(a.peaks))),!a.empty&&a.hint?r.dataset.hint="true":delete r.dataset.hint,a.lane?r.dataset.ncLane=String(a.lane):delete r.dataset.ncLane;let u=t.selected===o;u?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",u?"true":"false"),a.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",a.empty?`Pad ${o+1}, empty: load a sample`:`Pad ${o+1}, ${a.label}${a.hint?`, ${a.hint}`:""}${a.badgeLabel?`, ${a.badgeLabel}`:""}${u?", selected":""}`)})}function be(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function bo(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let o=document.createElement("span");return o.className="nc-readout",o.dataset.ncReadout="",n.append(a,o),n}function Wi(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function Yn(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var $m=450,Ui=8;function We(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Sm(e){let t=Qh(e,"target-min");return t>0?t:44}function Am(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=Sm(e),a=n/2,o=t.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<t.length;r++){let i=t[r],l=o[r];if(!(i instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){i.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,u=c-a,p=c+a,h=d-a,m=d+a;for(let g=0;g<t.length;g++){if(r===g)continue;let v=o[g];if(!v||v.width===0)continue;let f=v.left+v.width/2,b=v.top+v.height/2;Math.abs(b-d)<a*2&&(f>c?p=Math.min(p,(c+f)/2):f<c&&(u=Math.max(u,(c+f)/2))),Math.abs(f-c)<a*2&&(b>d?m=Math.min(m,(d+b)/2):b<d&&(h=Math.max(h,(d+b)/2)))}u=Math.min(u,l.left),p=Math.max(p,l.right),h=Math.min(h,l.top),m=Math.max(m,l.bottom),i.style.left=`${u-l.left}px`,i.style.top=`${h-l.top}px`,i.style.width=`${Math.max(0,p-u)}px`,i.style.height=`${Math.max(0,m-h)}px`,i.style.transform="none"}}function id(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Yi(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function zt(e,t){switch(e.type){case"slider":return Em(e,t);case"select":return Lm(e,t);case"toggle":return Tm(e,t);case"button":return Cm(e,t);case"readout":return Nm(e);case"label":return Dm(e);case"note":return Xi(e);case"knob":return Rm(e,t);case"choice":return Im(e,t);case"slotRow":return qm(e,t);case"stepGrid":return Wm(e,t);case"canvas":return Gm(e);case"fx":return ag(e,t);case"eqGraph":return Pf(e,t);case"levelSteps":return Qf(e,t);case"group":return bm(e,t,zt);case"strip":return Km(e,t);case"stripAdd":return Zm(e,t);case"padGrid":return wm(e,t);case"moves":return Pm(e,t);default:return Xi({id:"unknown",text:""})}}function Pe(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,dd(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(ld(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let o=e.querySelector("[data-nc-readout]");o&&(o.textContent=t.valueText??Yn(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Wi(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")Wi(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&yt(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Bm(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??Yn(t.value))}else if(t.type==="choice")ud(e,t);else if(t.type==="slotRow")hd(e,t);else if(t.type==="stepGrid")Tr(e,t);else if(t.type==="padGrid")sd(e,t);else if(t.type==="moves")cd(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&Rc(n,t)}else if(t.type==="eqGraph")_c(e,t);else if(t.type==="levelSteps")Kc(e,t);else if(t.type==="strip"){bd(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${rn(n.id)}"]`);a instanceof Element&&Pe(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")md(e,t);else if(t.type==="group"){od(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${rn(n.id)}"]`);a instanceof Element&&Pe(a,n)}}else if(t.type==="fx"){Ed(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${rn(n.id)}"]`);a instanceof Element&&Pe(a,n)}}}}function Em(e,t){let n=bo(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let o=go(e.taper,e.min,e.max);a.min=String(o?0:e.min),a.max=String(o?1e3:e.max),a.step=String(o?1:e.step),o&&(a.dataset.ncTaper=e.taper),a.value=String(ld(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let r=l=>o?fr(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(r(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(r(l))}),o&&a.addEventListener("keydown",l=>{let c=t(a);if(c?.type!=="slider"||a.disabled)return;let d=c.taper??e.taper,u=Oc(d,c.min,c.max,c.value,l.key,l.shiftKey,c.step);u!==null&&(l.preventDefault(),a.value=String(is(d,c.min,c.max,u)),c.onChange(u),c.onCommit?.(u))});let i=n.querySelector("[data-nc-readout]");return n.insertBefore(a,i),e.onTap&&n.insertBefore(Mm(e,a,t),i),n.append(be()),Pe(n,e),n}function ld(e){return go(e.taper,e.min,e.max)?is(e.taper,e.min,e.max,e.value):e.value}function Mm(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(We());let o=r=>{let i=n(t);i?.type==="slider"&&i.onTap?.(r)};return a.addEventListener("pointerdown",r=>{r.button===0&&o(r.timeStamp)}),a.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),o(r.timeStamp))}),a}function Lm(e,t){let n=bo(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let o=null;for(let r of e.options){let i=document.createElement("option");i.value=r.value,i.textContent=r.label,r.disabled&&(i.disabled=!0),r.group?o?.getAttribute("label")!==r.group&&(o=document.createElement("optgroup"),o.setAttribute("label",r.group),a.append(o)):o=null,(o??a).append(i)}return a.value=e.value,a.addEventListener("change",()=>{let r=t(a);r?.type==="select"&&r.onChange(a.value)}),n.append(a,be()),n}function Tm(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(be()),Pe(n,e),n}function Cm(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let r=t(n);r?.type==="button"&&r.onPress()}),n.append(be()),Pe(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let o=document.createElement("button");return o.type="button",o.className="nc-sparkle-btn",o.dataset.ncSparkle=e.id,o.setAttribute("aria-label","Surprise me"),o.title=e.sparkleTitle??"Surprise me",o.innerHTML=id(),o.addEventListener("click",()=>{let r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&fd(r);let i=t(n);i?.type==="button"&&i.onSparkle?.()}),a.append(n,o),a}function Nm(e){let t=bo(e.id,e.label);return t.append(be()),Pe(t,e),t}var Fm=450;function Pm(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let o=document.createElement("div");o.className="nc-moves-row",o.setAttribute("role","group"),o.setAttribute("aria-label",a.label),a.title&&(o.title=a.title);let r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=a.label;let i=document.createElement("div");i.className="nc-moves-btns";for(let l of a.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${a.label} ${l.text}`),c.append(zm(l.icon)),c.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),i.append(c)}o.append(r,i),n.append(o)}return cd(n,e),n}function cd(e,t){for(let n of t.groups)for(let a of n.moves){let o=e.querySelector(`[data-nc-move="${rn(a.id)}"]`);o instanceof HTMLButtonElement&&(o.disabled=a.disabled===!0)}}function zm(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function Dm(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(be()),t}function Xi(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(be()),t}function Gi(e){if(typeof e.valueText=="string")return e.valueText;let t=Yn(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function dd(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Bm(e,t){let n=Ha(t.taper,t.min,t.max,t.value);dd(e,t.modulated===!0);let a=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(a)),t.bipolar){let o=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(Ha(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(a,o))),e.style.setProperty("--knob-to",String(Math.max(a,o)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",Gi(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${Gi(t)}`}function Om(e,t){if(go(e.taper,e.min,e.max))return Oc(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,o=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+o:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-o:null}function Rm(e,t){let n=bo(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let o=document.createElement("i");o.className="nc-knob-mark",a.append(o);let r=0,i=0;a.addEventListener("pointerdown",d=>{r=d.clientY;let u=t(a);i=u&&"value"in u?Number(u.value):0,a.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",d=>{if(a.hasPointerCapture&&!a.hasPointerCapture(d.pointerId))return;let u=t(a);if(u?.type!=="knob")return;if(go(u.taper,u.min,u.max)){let m=Ha(u.taper,u.min,u.max,i)-(d.clientY-r)/120;u.onChange(Dc(u.taper,u.min,u.max,m));return}let p=u.max-u.min||1,h=Math.min(u.max,Math.max(u.min,i-(d.clientY-r)*p/120));u.onChange(h)}),a.addEventListener("dblclick",()=>{let d=t(a);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),a.addEventListener("keydown",d=>{let u=t(a);if(u?.type!=="knob")return;let p=Om(u,d);p!==null&&(d.preventDefault(),u.onChange(Math.min(u.max,Math.max(u.min,p))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(a,c),n.append(be()),Pe(n,e),n}function Im(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let a=document.createElement("span");a.className="nc-label nc-choice-caption",a.setAttribute("aria-hidden","true"),a.textContent=e.caption,n.dataset.ncCaption="",n.append(a)}for(let a of e.options){let o=document.createElement("button");o.type="button",o.className="nc-choice",o.dataset.ncChoice=a.value,o.setAttribute("role","tab"),o.textContent=a.label,o.addEventListener("click",()=>{let r=t(n);r?.type==="choice"&&r.onChange(a.value)}),o.addEventListener("keydown",r=>{let i=[...n.querySelectorAll("[data-nc-choice]")],l=i.indexOf(o),c=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")c=(l+1)%i.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")c=(l-1+i.length)%i.length;else if(r.key==="Home")c=0;else if(r.key==="End")c=i.length-1;else return;let d=i[c];d instanceof HTMLButtonElement&&(r.preventDefault(),d.focus(),d.click())}),n.append(o)}return n.append(be()),ud(n,e),n}function ud(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function qm(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let u=0;u<e.slots.length;u++){let p=e.slots[u],h=document.createElement("span");h.className="nc-snap-wrap";let m=document.createElement("button");m.type="button",m.className="nc-snap",m.dataset.ncSlot=String(u),m.textContent=p.label,m.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",h.append(m,We()),_m(h,m,n,u,t),a.append(h)}let o=e.onSparkle?document.createElement("button"):null;o&&(o.type="button",o.className="nc-sparkle",o.setAttribute("aria-label","Surprise me"),o.innerHTML=id(),o.append(We()),o.addEventListener("click",()=>{fd(n);let u=t(n);u?.type==="slotRow"&&u.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let i=document.createElement("span");i.className="nc-label",i.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let u=t(n);u?.type==="slotRow"&&u.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",r.append(i,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(a,...o?[o]:[]),n.append(d,r,be()),pd(n,t),hd(n,e),n}function Ki(e,t,n,a){let o=n(e);if(o?.type!=="slotRow")return;Bn(e);let r=a.shiftKey?"store":a.altKey?"clear":"recall";o.onSlot(t,r)}function _m(e,t,n,a,o){let r=0,i=0,l=0,c=!1,d=!1,u=!1,p=!1,h=()=>{window.clearTimeout(r),r=0},m=b=>{let y=b.clientX-i,w=b.clientY-l;y*y+w*w>Ui*Ui&&(c=!0,h())},g=()=>{p&&(p=!1,window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",v),window.removeEventListener("pointercancel",f))},v=b=>{let y=r!==0&&!c&&!d;h(),g(),y&&(u=!0,Ki(n,a,o,b))},f=()=>{c=!0,h(),g()};e.addEventListener("pointerdown",b=>{b.button===0&&(g(),d=!1,c=!1,u=!1,i=b.clientX,l=b.clientY,h(),r=window.setTimeout(()=>{r=0,!c&&(d=!0,Hm(n,t,a,o))},$m),p=!0,window.addEventListener("pointermove",m),window.addEventListener("pointerup",v),window.addEventListener("pointercancel",f))}),e.addEventListener("contextmenu",b=>b.preventDefault()),e.addEventListener("click",b=>{if(u||d||c){u=!1,d=!1,c=!1;return}Ki(n,a,o,b)})}function pd(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=Vi("Save","store"),o=Vi("Clear","clear");n.append(a,o);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation(),Bn(e)}),r.addEventListener("click",i=>i.stopPropagation()),e.append(r,n),n.addEventListener("click",i=>{let l=i.target;if(!(l instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),Bn(e)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),Bn(e))}),e.addEventListener("keydown",i=>{i.key==="Escape"&&Bn(e)})}function Vi(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Hm(e,t,n,a){pd(e,a);let o=e.querySelector(".nc-slot-menu");if(!(o instanceof HTMLElement))return;let r=e.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),o.hidden=!1,o.dataset.ncIndex=String(n);let i=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-i.left}px`,o.style.top=`${l.bottom-i.top}px`,o.querySelector("button")?.focus()}function Bn(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function hd(e,t){for(let o of e.querySelectorAll("[data-nc-slot]")){if(!(o instanceof HTMLButtonElement))continue;let r=Number(o.dataset.ncSlot),i=t.slots[r];if(!i)continue;o.textContent=i.label,i.filled?o.dataset.filled="true":delete o.dataset.filled,i.active?o.dataset.active="true":delete o.dataset.active,i.edited?o.dataset.edited="true":delete o.dataset.edited,i.queued?o.dataset.queued="true":delete o.dataset.queued,i.queued&&i.pulse?o.dataset.pulse="true":delete o.dataset.pulse;let l=[i.filled?"saved":"empty",i.active?"playing":"",i.edited?"edited":"",i.queued?"queued, tap again to switch now":""];o.setAttribute("aria-label",[i.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function fd(e){let t=e.dataset.ncLastFill||null,n=Oh(t);e.dataset.ncLastFill=n;let a=Rh(n);if(a)for(let[o,r]of Object.entries(a))e.style.setProperty(o,r)}function jm(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,o=r=>{if(a===r)return;a=r,n.setAttribute("aria-pressed",r?"true":"false");let i=t(e);i?.type==="stepGrid"&&i.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),o(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>o(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||o(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),o(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function Wm(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let o=f=>{let b=document.createElement("button");return b.type="button",b.setAttribute("role","radio"),b.textContent=f,a.append(b),b},r=o("Note"),i=o("Accent");i.dataset.ncAccentMode="";let l=f=>{for(let b of[r,i]){let y=b===f;b.setAttribute("aria-checked",y?"true":"false"),b.tabIndex=y?0:-1}};l(r);for(let f of[r,i])f.addEventListener("click",()=>l(f));a.addEventListener("keydown",f=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(f.key))return;f.preventDefault();let b=i.getAttribute("aria-checked")==="true"?r:i;l(b),b.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(a),e.onFill&&c.append(jm(n,t)),e.onClear){let f=document.createElement("button");f.type="button",f.className="nc-fill nc-clear",f.dataset.ncClear="",f.textContent=e.clearLabel??"Clear",f.title="Clear every step (Undo takes it back)",f.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.onClear?.()}),c.append(f)}n.append(c);for(let f of e.rows){let b=document.createElement("div");b.className="nc-row",b.dataset.ncRow="";let y=document.createElement("button");y.type="button",y.className="nc-name",y.textContent=f.label,y.setAttribute("aria-label",`Select ${f.label}`),f.lane&&(y.dataset.ncLane=String((f.lane-1)%4+1));let w=!1,x=0;y.addEventListener("pointerdown",k=>{w=!1,!(k.pointerType==="mouse"||k.button!==0)&&(x=window.setTimeout(()=>{let A=t(n);A?.type!=="stepGrid"||!A.selectedRows||(w=!0,A.onSelectRow?.(A.rows.findIndex(M=>M.id===f.id),!0))},Fm))});for(let k of["pointerup","pointercancel","pointerleave"])y.addEventListener(k,()=>window.clearTimeout(x));y.addEventListener("contextmenu",k=>{w&&k.preventDefault()}),y.addEventListener("click",k=>{let A=t(n);if(A?.type!=="stepGrid")return;if(w){w=!1;return}let M=A.rows.findIndex(j=>j.id===f.id),H=!!A.selectedRows&&(k.shiftKey||k.metaKey||k.ctrlKey);A.onSelectRow?.(M,H)}),y.addEventListener("keydown",k=>Um(n,y,k));let S=[];for(let k of["mute","solo"]){if(!(k==="mute"?e.onMute:e.onSolo))continue;let A=document.createElement("span");A.className="nc-ms-wrap";let M=document.createElement("button");M.type="button",M.className="nc-ms",M.dataset.ncMs=k,M.textContent=k==="mute"?"M":"S",M.setAttribute("aria-label",`${k==="mute"?"Mute":"Solo"} ${f.label}`),A.append(M,We()),A.addEventListener("click",()=>{let H=t(n);if(H?.type!=="stepGrid")return;let j=H.rows.findIndex(O=>O.id===f.id);(k==="mute"?H.onMute:H.onSolo)?.(j)}),S.push(A)}let $=document.createElement("div");$.className="nc-steps";for(let k=0;k<f.steps.length;k++){let A=document.createElement("span");A.className="nc-step-wrap";let M=document.createElement("button");M.type="button",M.className="nc-step",M.dataset.ncStep=`${f.id}:${k}`,M.setAttribute("aria-label",`${f.label} step ${k+1}`),A.append(M,We()),A.addEventListener("click",H=>{let j=t(n);if(j?.type!=="stepGrid")return;let O=j.rows.findIndex(te=>te.id===f.id),P=i.getAttribute("aria-checked")==="true";j.onToggle(O,k,H.shiftKey||P)}),$.append(A)}if(e.onLength&&$.append(Ym(n,$,f,t)),b.append(...S,y,$),e.onDice){let k=document.createElement("button");k.type="button",k.className="nc-sparkle nc-row-dice",k.dataset.ncDice=f.id,k.setAttribute("aria-label",`Re-roll ${f.label}`),k.title=`Re-roll ${f.label}: new steps for this lane (Undo takes it back)`,k.innerHTML=Yi(),k.append(We()),k.addEventListener("click",()=>{let A=t(n);A?.type==="stepGrid"&&A.onDice?.(A.rows.findIndex(M=>M.id===f.id))}),b.append(k)}b.addEventListener("click",k=>{if(k.target!==b)return;let A=t(n);A?.type==="stepGrid"&&A.onSelectRow?.(A.rows.findIndex(M=>M.id===f.id))}),Qi(n,$,".nc-step-wrap",t,i,()=>f.id),n.append(b)}let d=document.createElement("div");d.className="nc-pads-head";let u=(f,b,y)=>{let w=document.createElement("button");return w.type="button",w.className=f,w.textContent=b,y&&w.setAttribute("aria-label",y),w},p=u("nc-pads-step","‹","Previous lane"),h=u("nc-pads-step","›","Next lane"),m=document.createElement(e.onLength?"button":"span");m.className="nc-pads-label",m.setAttribute("aria-live","polite"),e.onLength&&(m.type="button",m.dataset.ncLenToggle="",m.addEventListener("click",()=>{let f=t(n);f?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Tr(n,f))}));for(let[f,b]of[[p,-1],[h,1]])f.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid"||y.rows.length===0)return;let w=y.rows.length;y.onSelectRow?.(((ya(y)+b)%w+w)%w)});if(d.append(p,m,h),e.onDice){let f=u("nc-pads-step nc-pads-dice","","Re-roll lane");f.dataset.ncPadsDice="",f.innerHTML=Yi(),f.addEventListener("click",()=>{let b=t(n);if(b?.type!=="stepGrid")return;let y=ya(b);y>=0&&b.onDice?.(y)}),d.append(f)}if(e.transport){let f=u("nc-pads-play","Play");f.dataset.ncPadsPlay="",f.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.transport?.onToggle()}),d.append(f)}n.append(d);let g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");let v=Math.max(0,...e.rows.map(f=>f.steps.length));for(let f=0;f<v;f++){let b=document.createElement("button");b.type="button",b.className="nc-pad",b.dataset.ncPad=String(f),b.textContent=String(f+1),b.addEventListener("click",y=>{let w=t(n);if(w?.type!=="stepGrid")return;let x=ya(w);if(x<0)return;if(n.dataset.ncLenMode==="true"){w.onLength?.(x,f+1);return}let S=i.getAttribute("aria-checked")==="true";w.onToggle(x,f,y.shiftKey||S)}),g.append(b)}return Qi(n,g,".nc-pad",t,i,()=>{let f=t(n);return f?.type==="stepGrid"?f.rows[ya(f)]?.id:void 0}),n.append(g),n.append(be()),Tr(n,e),n}function ya(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function Qi(e,t,n,a,o,r){let i="on",l=!0,c=-1,d=(u,p)=>{let h=u.rows[c]?.steps[p];!h||p>=u.rows[c].length||(u.onSet?u.onSet(c,p,i,l):!!h[i]!==l&&u.onToggle(c,p,i==="accent"))};fm(t,n,u=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(u.kind!=="paint")return;let h=p.rows.findIndex(m=>m.id===r());h>=0&&p.rows[h].length!==u.pad+1&&p.onLength?.(h,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){let h=r();c=p.rows.findIndex(g=>g.id===h);let m=p.rows[c]?.steps[u.pad];if(!m)return;i=o.getAttribute("aria-checked")==="true"?"accent":"on",l=!m[i]}d(p,u.pad)}else if(u.kind==="long"){let h=r(),m=p.rows.findIndex(v=>v.id===h),g=t.querySelectorAll(n)[u.pad];m>=0&&g instanceof HTMLElement&&p.onLongPress?.(m,u.pad,g)}}})}function Um(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],o=a.indexOf(t),r=o;n.key==="ArrowDown"?r=o+1:n.key==="ArrowUp"?r=o-1:n.key==="Home"?r=0:r=a.length-1;let i=a[r];!(i instanceof HTMLElement)||i===t||(n.preventDefault(),i.focus(),i.click())}function Ym(e,t,n,a){let o=document.createElement("button");o.type="button",o.className="nc-len-handle",o.dataset.ncLen=n.id,o.setAttribute("role","slider"),o.setAttribute("aria-valuemin","1"),o.setAttribute("aria-valuemax",String(n.steps.length)),o.append(We());let r=d=>{let u=a(e);if(u?.type!=="stepGrid")return;let p=u.rows.findIndex(g=>g.id===n.id),h=u.rows[p];if(!h)return;let m=Math.max(1,Math.min(h.steps.length,d));m!==h.length&&u.onLength?.(p,m)},i=d=>{let u=[...t.querySelectorAll(".nc-step")],p=1;return u.forEach((h,m)=>{let g=h.getBoundingClientRect();g.width>0&&d>=g.left+g.width/2&&(p=m+1)}),p},l=d=>r(i(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete o.dataset.dragging};return o.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),o.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),o.addEventListener("keydown",d=>{let u=a(e);if(u?.type!=="stepGrid")return;let p=u.rows.find(m=>m.id===n.id);if(!p)return;let h={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};d.key in h&&(d.preventDefault(),r(h[d.key]))}),o}var Yo=new WeakMap,wa=new WeakMap;function Xm(e){return e?(wa.has(e)||(wa.set(e,hr(e)),Ec(t=>{wa.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))Lr(n,Number(n.getAttribute("data-nc-velocity")))},e)),wa.get(e)):"light"}function Lr(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:Xm(e.ownerDocument),o=n===null?null:`${a} ${n}`;if(!(Yo.has(e)&&Yo.get(e)===o)){if(Yo.set(e,o),n===null){for(let r of Object.keys(Mi(1)))e.style.removeProperty(r);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[r,i]of Object.entries(Mi(n,Ei[a]??Ei.light)))e.style.setProperty(r,i)}}function Ji(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function Tr(e,t){let n=t.rows.some(u=>u.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let o=e.querySelector(".nc-pads"),r=t.rows.find(u=>u.id===t.selectedRow)??t.rows[0],i=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;i instanceof HTMLElement&&r&&(i.textContent=l?`${r.label} · ${r.length}`:r.label,t.onLength&&(i.setAttribute("aria-pressed",l?"true":"false"),i.setAttribute("aria-label",l?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&r&&(c.setAttribute("aria-label",`Re-roll ${r.label}`),c.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let u=!!t.transport?.playing,p=t.transport?.label??(u?"Stop":"Play");d.textContent!==p&&(d.textContent=p),d.setAttribute("aria-pressed",u?"true":"false");let h=t.transport?.ariaLabel;h?d.setAttribute("aria-label",h):d.removeAttribute("aria-label")}if(o instanceof HTMLElement&&r){o.setAttribute("aria-label",`${r.label} steps`),r.lane&&(o.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?o.dataset.silent="true":delete o.dataset.silent;let u=r.length>0?(t.playhead%r.length+r.length)%r.length:-1;for(let p of o.querySelectorAll("[data-nc-pad]")){let h=Number(p.getAttribute("data-nc-pad")),m=r.steps[h];p instanceof HTMLButtonElement&&(p.hidden=!m||!l&&h>=r.length,l&&h>=r.length?p.dataset.out="true":delete p.dataset.out,l&&h===r.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${r.label} step ${h+1}${m?.markLabel?`, ${m.markLabel}`:""}`),Ji(p,m),p.setAttribute("aria-pressed",m?.on?"true":"false"),m?.accent?p.dataset.accent="true":delete p.dataset.accent,m?.dim?p.dataset.dim="true":delete p.dataset.dim,Lr(p,m?.velocity),t.playhead>=0&&h===u?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let u of t.rows){for(let m=0;m<u.steps.length;m++){let g=u.steps[m],v=e.querySelector(`[data-nc-step="${u.id}:${m}"]`);if(!(v instanceof HTMLButtonElement))continue;let f=v.closest(".nc-row");if(f instanceof HTMLElement){t.selectedRow===u.id?f.dataset.selected="true":delete f.dataset.selected;let x=t.selectedRow!==u.id&&(t.selectedRows??[]).includes(u.id);x?f.dataset.picked="true":delete f.dataset.picked;let S=f.querySelector(".nc-name");S instanceof HTMLElement&&(S.setAttribute("aria-pressed",t.selectedRow===u.id||x?"true":"false"),S.textContent!==u.label&&(S.textContent=u.label,S.setAttribute("aria-label",`Select ${u.label}`))),u.mute||n&&!u.solo?f.dataset.silent="true":delete f.dataset.silent;for(let $ of f.querySelectorAll("[data-nc-ms]")){let k=$.getAttribute("data-nc-ms")==="mute"?u.mute:u.solo;$.setAttribute("aria-pressed",k?"true":"false")}}v.setAttribute("aria-pressed",g.on?"true":"false");let b=`${u.label} step ${m+1}${g.markLabel?`, ${g.markLabel}`:""}`;v.getAttribute("aria-label")!==b&&v.setAttribute("aria-label",b),Ji(v,g),g.accent?v.dataset.accent="true":delete v.dataset.accent,g.dim?v.dataset.dim="true":delete v.dataset.dim,m%4===0?v.dataset.bar="true":delete v.dataset.bar,typeof g.velocity=="number"?(v.dataset.velocity="true",v.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,g.velocity))*100)}%`)):(delete v.dataset.velocity,v.style.removeProperty("--level")),Lr(v,g.velocity);let y=t.playhead>=0&&u.length>0?(t.playhead%u.length+u.length)%u.length:-1;m===y?v.dataset.playhead="true":delete v.dataset.playhead;let w=!!t.onLength&&t.selectedRow===u.id;v.hidden=m>=u.length&&!w,m>=u.length&&w?v.dataset.out="true":delete v.dataset.out}let p=e.querySelector(`[data-nc-len="${u.id}"]`),h=e.querySelector(`[data-nc-step="${u.id}:${Math.max(0,u.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&h&&h.nextElementSibling!==p){let m=document.activeElement===p;h.after(p),m&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(u.length)),p.setAttribute("aria-label",`${u.label} length, ${u.length} steps`),p.title=`${u.label}: drag to set the length (${u.length} steps)`)}}function Gm(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,be()),t}function Km(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let o=document.createElement("span");o.className="nc-strip-name",o.dataset.ncStripName="";let r=!e.master&&typeof e.onFold=="function",i=null;r&&(n.dataset.ncFoldable="",i=xd(),i.dataset.ncStripHide="",i.addEventListener("click",()=>{let w=t(n);w?.type==="strip"&&(w.onFold?.(w.folded!==!0),document.activeElement!==i&&i.focus())})),a.append(o);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let w=document.createElement("span");w.className="nc-strip-grip-dots",w.setAttribute("aria-hidden","true"),l.append(w),l.addEventListener("keydown",x=>{if(x.key!=="ArrowLeft"&&x.key!=="ArrowRight"||x.ctrlKey||x.metaKey||x.shiftKey)return;let S=t(n);S?.type==="strip"&&(x.preventDefault(),S.onMove?.(x.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>tl(n,l,t))),!e.master&&typeof e.onShade=="function"&&a.addEventListener("contextmenu",w=>{w.pointerType==="touch"||w.pointerType==="pen"||w.target instanceof Element&&w.target.closest("input, .nc-strip-remove")||(w.preventDefault(),tl(n,a,t,{x:w.clientX,y:w.clientY}))}),e.onRemove){let w=document.createElement("button");w.type="button",w.className="nc-strip-remove",w.dataset.ncStripRemove="",w.textContent="×",w.addEventListener("click",()=>{let x=t(n);x?.type==="strip"&&x.onRemove?.(w)}),a.append(w)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let w=document.createElement("span");w.className="nc-hacks-wrap";let x=document.createElement("button");x.type="button",x.className="nc-hacks",x.dataset.ncHacks="",w.append(x,We()),w.addEventListener("click",()=>{let S=t(n);S?.type==="strip"&&S.onHacks?.()}),c.append(w)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let w=document.createElement("span");w.className="nc-hacks-wrap nc-sends-view-wrap";let x=document.createElement("button");x.type="button",x.className="nc-hacks nc-sends-view",x.dataset.ncSendsView="",w.append(x,We()),w.addEventListener("click",()=>{let S=t(n);S?.type==="strip"&&S.onSendsView?.()}),d.append(w)}for(let w of["mute","solo"]){if(!(w==="mute"?e.onMute:e.onSolo))continue;let x=document.createElement("span");x.className="nc-ms-wrap";let S=document.createElement("button");S.type="button",S.className="nc-ms",S.dataset.ncMs=w,S.textContent=w==="mute"?"M":"S",x.append(S,We()),x.addEventListener("click",()=>{let $=t(n);$?.type==="strip"&&(w==="mute"?$.onMute:$.onSolo)?.()}),d.append(x)}let u=document.createElement("div");u.className="nc-strip-sends";for(let w of e.sends??[])u.append(zt({...w,type:"knob",compact:!0},t));let p=document.createElement("div");p.className="nc-strip-pan",e.pan&&p.append(zt(fs(e),t));let h=document.createElement("div");h.className="nc-strip-body";let m=document.createElement("span");m.className="nc-scale",m.setAttribute("aria-hidden","true");for(let w of e.ticks??[]){let x=document.createElement("span");x.className="nc-scale-tick",x.style.setProperty("--tick-pos",String(w.value)),x.textContent=w.label,m.append(x)}let g=rf({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:w=>{let x=t(n);x?.type==="strip"&&x.onChange(w)},onReset:()=>{let w=t(n);w?.type==="strip"&&el(w)}}),v=pf({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let w=t(n);w?.type==="strip"&&w.onClipClear?.()}});if(h.append(m,g.el,v.el),r){let w=document.createElement("button");w.type="button",w.className="nc-ui-fx-fold nc-strip-fold",w.dataset.ncStripFold="",w.setAttribute("aria-expanded","false");let x=document.createElement("span");x.className="nc-strip-fold-cap",x.setAttribute("aria-hidden","true");let S=document.createElement("span");S.className="nc-ui-fx-fold-name",S.dataset.ncStripFoldName="";let $=document.createElement("span");$.className="nc-strip-fold-pan",$.setAttribute("aria-hidden","true"),$.hidden=!e.pan,w.append(x,$,S),w.addEventListener("click",()=>{let k=t(n);if(k?.type!=="strip")return;k.onFold?.(!1);let A=n.querySelector("[data-nc-strip-hide]");A instanceof HTMLElement&&A.focus()}),h.prepend(w)}let f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let b=0;f.addEventListener("click",w=>{let x=t(n);x?.type!=="strip"||!x.onTypeIn||(window.clearTimeout(b),w.detail===0?Zi(n,f,t):w.detail===1&&(b=window.setTimeout(()=>Zi(n,f,t),Jm)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(b);let w=t(n);w?.type==="strip"&&el(w)});let y=document.createElement("div");return y.className="nc-strip-trim",e.trim&&y.append(zt(ms(e),t)),i&&n.append(i),l&&n.append(l),n.append(a,y,c,d,u,p,h,f,be()),bd(n,e),n}function fs(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??Qm(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function ms(e){let t=e.trim,n=t.min??-12,a=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:a,step:t.step??.5,value:t.value,valueText:t.valueText??Vm(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:o=>t.onChange(o)}}function Vm(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function Qm(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var Jm=250;function Zi(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let o=document.createElement("input");o.type="text",o.className="nc-strip-db-input",o.inputMode="decimal",o.spellcheck=!1,o.autocomplete="off",o.value=a.valueText??Yn(a.value),o.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(o),o.focus(),o.select?.();let r=!1,i=l=>{if(r)return;r=!0;let c=o.value;if(o.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(c)}t.focus?.()};o.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),i(!0)):l.key==="Escape"&&(l.preventDefault(),i(!1))}),o.addEventListener("blur",()=>i(!1))}function Zm(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-strip-add-plus",o.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",a.append(o,r);let i=document.createElement("select");return i.className="nc-strip-add-select",i.addEventListener("change",()=>{let l=t(n),c=i.value;gd(i),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(a,i,be()),md(n,e),n}function md(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let o=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],r=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),i=o.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==i&&(a.replaceChildren(...o.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),gd(a))}function gd(e){let t=e.options[0];t&&(t.selected=!0)}function el(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function bd(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let o=e.querySelector(".nc-fader"),r=o?sf(o):void 0;r&&(r.configure({step:t.step}),r.set(t.value),r.setText(t.valueText),r.setLabel(`${t.label} level`)),hf(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let i=e.querySelector(".nc-strip-db");if(i instanceof HTMLElement){let g=t.valueText??Yn(t.value);i.textContent!==g&&(i.textContent=g),i.setAttribute("aria-label",`${t.label} level ${g}`);let v=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";i.title=t.onTypeIn?`Click to type a value. ${v}`:v}for(let g of e.querySelectorAll("[data-nc-ms]")){let v=g.getAttribute("data-nc-ms"),f=v==="mute"?t.mute===!0:t.solo===!0;g.setAttribute("aria-pressed",f?"true":"false"),g.setAttribute("aria-label",`${v==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let g=t.hacksLabel??"Hacks";l.textContent!==g&&(l.textContent=g),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${g}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let g=t.sendsViewLabel??"Sends";c.textContent!==g&&(c.textContent=g),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${g}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),yt(c,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let u=yd(t);if(u?e.dataset.ncShade=String(u):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let g=e.querySelector(`.nc-strip-trim [data-nc-id="${rn(t.trim.id)}"]`);g&&Pe(g,ms(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let g=e.querySelector(`.nc-strip-pan [data-nc-id="${rn(t.pan.id)}"]`);g&&Pe(g,fs(t))}let p=!t.master&&typeof t.onFold=="function"&&t.folded===!0;p?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let h=e.querySelector("[data-nc-strip-hide]");h instanceof HTMLElement&&(kd(h,p,t.label),yt(h,t.foldHelp));let m=e.querySelector("[data-nc-strip-fold]");if(m instanceof HTMLElement){m.hidden=!p,m.setAttribute("aria-label",`Expand ${t.label}`);let g=m.querySelector("[data-nc-strip-fold-name]");g&&g.textContent!==t.label&&(g.textContent=t.label),yt(m,t.foldedHelp??t.foldHelp)}}function yd(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=wd?t:0}var wd=8,va=null;function tl(e,t,n,a){va?.();let o=n(e);if(o?.type!=="strip")return null;let r=e.ownerDocument,i=r.defaultView??globalThis,l=r.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${o.label}: shade and place`);let c=r.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(o.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=r.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let u=yd(o),p=e.querySelector("[data-nc-strip-grip]")??t,h=(b=!1)=>{if(va!==h)return;va=null;let y=l.contains(r.activeElement);l.remove(),r.removeEventListener("keydown",g,!0),r.removeEventListener("pointerdown",v,!0),i.removeEventListener("resize",f),(b||y)&&p?.isConnected&&p.focus?.({preventScroll:!0})},m=[0,...Array.from({length:wd},(b,y)=>y+1)].map(b=>{let y=r.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.setAttribute("aria-checked",b===u?"true":"false"),y.setAttribute("tabindex",b===u?"0":"-1"),y.dataset.ncShadeChoice=String(b),b===0?(y.textContent="Auto",y.setAttribute("aria-label","Auto: alternate light and dark"),y.title="Auto: alternate light and dark"):(y.textContent=String(b),y.setAttribute("aria-label",`Shade ${b}`),y.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${b})`)),y.addEventListener("click",()=>{let w=n(e);h(!0),w?.type==="strip"&&w.onShade?.(b===0?null:b)}),y});if(d.append(...m),d.addEventListener("keydown",b=>{let y=m.indexOf(r.activeElement);if(y<0)return;let w=-1;b.key==="ArrowRight"||b.key==="ArrowDown"?w=(y+1)%m.length:b.key==="ArrowLeft"||b.key==="ArrowUp"?w=(y-1+m.length)%m.length:b.key==="Home"?w=0:b.key==="End"&&(w=m.length-1),!(w<0)&&(b.preventDefault(),m[y].setAttribute("tabindex","-1"),m[w].setAttribute("tabindex","0"),m[w].focus())}),l.append(c,d),typeof o.onMove=="function"){let b=[...e.parentElement?.children??[]].filter(w=>w.classList?.contains("nc-strip")&&!w.hasAttribute("data-nc-master")),y=b.indexOf(e);for(let[w,x,S]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let $=r.createElement("button");$.type="button",$.className="nc-strip-menu-item",$.dataset.ncStripMove=w<0?"left":"right";let k=r.createElement("span");k.textContent=x;let A=r.createElement("kbd");A.textContent=S,A.setAttribute("aria-hidden","true"),$.append(k,A),$.disabled=w<0?y<=0:y<0||y>=b.length-1,$.addEventListener("click",()=>{let M=n(e);h(!0),M?.type==="strip"&&M.onMove?.(w)}),l.append($)}}r.body.append(l),(()=>{let b=t.getBoundingClientRect?.()??{bottom:0,right:0},y=l.offsetWidth,w=l.offsetHeight,x=i.innerWidth||r.documentElement.clientWidth||y,S=i.innerHeight||r.documentElement.clientHeight||w,$=a?a.x:b.right-y,k=a?a.y:b.bottom+4;$=Math.max(4,Math.min($,x-y-4)),k+w>S-4&&(k=Math.max(4,(a?a.y:b.top)-w-4)),l.style.left=`${Math.round($)}px`,l.style.top=`${Math.round(k)}px`})();let g=b=>{if(b.key==="Escape")b.preventDefault(),b.stopPropagation(),h(!0);else if(b.key==="Tab"&&l.contains(r.activeElement)){let y=[...l.querySelectorAll("button:not([disabled])")].filter(x=>x.getAttribute("tabindex")!=="-1"),w=(y.indexOf(r.activeElement)+(b.shiftKey?-1:1)+y.length)%y.length;b.preventDefault(),y[w]?.focus()}},v=b=>{l.contains(b.target)||h(!1)},f=()=>h(!1);return r.addEventListener("keydown",g,!0),r.addEventListener("pointerdown",v,!0),i.addEventListener("resize",f),va=h,(m.find(b=>b.getAttribute("tabindex")==="0")??m[0]).focus({preventScroll:!0}),{el:l,close:()=>h(!1)}}var Cr=typeof ResizeObserver=="function"?new ResizeObserver(eg):null;function eg(e){for(let t of e){if(!t.target.isConnected){Cr.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&tg(n)}}function tg(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,o=n instanceof HTMLElement?n.offsetHeight:0,r=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+o+r}px`)}function ng(e){if(Cr)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))Cr.observe(t)}function ag(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let o=typeof e.onFold=="function",r=!!e.meter,i=typeof e.onRemove=="function";if(e.on===void 0&&!o&&!Ya(e)&&!r&&!i)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),r&&l.append(Sd(n,"head")),e.on!==void 0){let c=Fc({checked:e.on,labelledBy:a.id,onChange:d=>{let u=t(c.el);u?.type==="fx"&&u.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",l.append(c.el)}o&&l.append(rg(n,t)),Ya(e)&&l.append(cg(n,t)),i&&l.append(dg(t)),n.append(l)}o&&n.prepend(sg(n,t)),r&&Ad(n,e);for(let l of e.controls)n.append(zt(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",l.append(c);for(let d of e.more)l.append(zt(d,t));n.append(l)}return n.append(be()),Ed(n,e),ng(n),n}var og=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function vd(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&og(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function rg(e,t){let n=xd();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),vd(e))}),n}function xd(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function kd(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function sg(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let o=document.createElement("span");o.className="nc-ui-fx-fold-name",o.dataset.ncFxFoldName="";let r=document.createElement("span");return r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),n.append(r,a,o),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Sd(e,"fold")),n.addEventListener("click",()=>{let i=t(n);if(i?.type==="fx"){if(i.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}i.onFold?.(!1),vd(e)}}),n}var mn=new Set;function Ca(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var Ya=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),ig="(max-width: 768px)";function lg(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function cg(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(lg()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&($d(e,a,!mn.has(a.id)),n.focus())}),n}function dg(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function $d(e,t,n){n?mn.add(t.id):mn.delete(t.id),gs(e,t)}function ug(e,t){t?.type==="fx"&&mn.has(t.id)&&$d(e,t,!1)}function pg(e){return e.ownerDocument.defaultView?.matchMedia?.(ig).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function gs(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=Ya(t)&&mn.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!Ya(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Ca(e.ownerDocument,()=>{for(let i of e.querySelectorAll(".nc-eq"))i instanceof HTMLElement&&fn(i)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",yt(n,t.maxHelp)),!a){e.dataset.ncMax&&nl(e);return}if(!e.isConnected){let i=()=>e.isConnected&&mn.has(t.id)&&gs(e,t);queueMicrotask(()=>{e.isConnected?i():Ca(e.ownerDocument,i)});return}let o=pg(e),r=[...e.children].filter(i=>i.matches?.(".nc-field, [data-nc-slider]")).length;r>0&&e.style.setProperty("--nc-fx-dials",String(r)),e.dataset.ncMax!==o&&(e.dataset.ncMax&&nl(e),e.dataset.ncMax=o,o==="over"&&hg(e,t)),fg(e.ownerDocument),o==="over"&&bs(e),Ca(e.ownerDocument,()=>{for(let i of e.querySelectorAll(".nc-eq"))i instanceof HTMLElement&&fn(i)})}function nl(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Ca(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&fn(n)})}function hg(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let o=e.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&o.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function bs(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,o=e.ownerDocument.defaultView,r=Number.parseFloat(o?.getComputedStyle(a).columnGap??"")||0,i=Ff(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),r,o?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${i.left}px`,e.style.top=`${i.top}px`,e.style.width=`${i.width}px`}var al=new WeakSet;function fg(e){al.has(e)||(al.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(o=>o.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&bs(t)}))}var Nr=new WeakMap;function Sd(e,t){let n=lm(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Ad(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let o of n)yt(o,t.meterHelp);let a=Nr.get(e);a?a.set(t.meter):Nr.set(e,pm(n,t.meter))}function Ed(e,t){(t.meter||Nr.has(e))&&Ad(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let o=typeof t.onFold=="function"&&t.folded===!0;o?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let r=e.querySelector("[data-nc-fx-hide]");r instanceof HTMLElement&&(kd(r,o,t.title),yt(r,t.foldHelp)),gs(e,t);let i=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(i instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;i.hidden=o,i.setAttribute("aria-label",c),i.title=c}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";l.hidden=!o,l.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let u=l.querySelector("[data-nc-fx-fold-name]");u&&(u.textContent=t.title),yt(l,t.foldHelp)}}function yt(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function rn(e){return e.replace(/["\\]/g,"\\$&")}function mg(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(o=>o.type==="canvas"&&o.id===n.dataset.ncId);a?.type==="canvas"&&Rc(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&fn(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&bs(n);Am(e)}var gg=gt["toast-duration"];function bg({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function yg(e,t,n,a){let o=l=>({top:l,bottom:l+n}),r=l=>e.some(c=>c&&c.bottom>l.top&&c.top<l.bottom),i=o(t-a-n);return r(i)?r(o(a))?"bottom":"top":"bottom"}function wg(e,t,n,a,o,r){let i=e.bottom+o,l=Math.max(r,Math.min(e.left,a-r-n.width));for(let c=!0,d=0;c&&d<8;d++){c=!1;for(let u of t)u&&u.bottom>i&&u.top<i+n.height&&u.right>l&&u.left<l+n.width&&(i=u.bottom+o,c=!0)}return{top:i,left:l}}var ol="data-nc-ui-toast-live";function vg(e,t){let n=t.querySelector(`[${ol}]`);return n||(n=e.createElement("div"),n.setAttribute(ol,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function xg({message:e,actionLabel:t,onAction:n,duration:a=gg,onClose:o,avoid:r=[],anchor:i,host:l,document:c=globalThis.document}={}){l=l??c.body;let d=c.defaultView??globalThis,u=c.createElement("div");u.className="nc-ui-toast",u.setAttribute("data-state","enter");let p=c.createElement("span");p.className="nc-ui-toast-message",p.textContent=e,u.appendChild(p);let h=null;t&&(h=c.createElement("button"),h.type="button",h.className="nc-ui-toast-action",h.textContent=t,u.appendChild(h)),l.appendChild(u);let m="open",g=ue=>ue&&typeof ue.getBoundingClientRect=="function"?ue.getBoundingClientRect():null,v=g(u),f=v?.height||44,b=d.getComputedStyle?.(u),y=Number.parseFloat(b?.getPropertyValue(G("toast-offset")))||16,w=Number.parseFloat(b?.getPropertyValue(G("toast-anchor-gap")))||8,x=g(i),S=d.innerHeight??0,$=r.map(g).filter(Boolean),k=x&&x.bottom>0&&x.top<S?wg(x,$,{width:v?.width||0,height:f},d.innerWidth??0,w,y):null;k&&k.top+f<=S?(u.setAttribute("data-placement","anchor"),u.style.top=`${k.top+(d.scrollY??0)}px`,u.style.left=`${k.left+(d.scrollX??0)}px`):u.setAttribute("data-placement",yg($,S,f,y));let A=d.requestAnimationFrame?.bind(d)??(ue=>setTimeout(ue,16));A(()=>A(()=>{m==="open"&&u.setAttribute("data-state","open")})),vg(c,l).textContent=bg({message:e,actionLabel:t});let M,H,j=new Promise(ue=>{H=ue}),O=ue=>{clearTimeout(M),M=setTimeout(()=>Re("timeout"),ue)},P=a,te=Date.now(),ae=()=>{m==="open"&&(clearTimeout(M),P=Math.max(0,P-(Date.now()-te)))},J=()=>{m==="open"&&(te=Date.now(),O(P))};u.addEventListener("pointerenter",ae),u.addEventListener("pointerleave",J),u.addEventListener("focusin",ae),u.addEventListener("focusout",J),h?.addEventListener("click",()=>{if(m==="open")try{n?.()}finally{Re("action")}}),Number.isFinite(a)&&O(a);function Re(ue="close"){if(m!=="open")return;m="closing",clearTimeout(M),u.setAttribute("data-state","closing"),o?.(ue);let Sn=d.getComputedStyle?.(u),ha=Sn?Math.max(0,...String(Sn.transitionDuration||"").split(",").map(En=>Number.parseFloat(En)*(En.trim().endsWith("ms")?1:1e3)||0)):0,An=()=>{m!=="gone"&&(m="gone",u.remove(),H(ue))};u.addEventListener("transitionend",An),setTimeout(An,ha+50)}return{el:u,close:Re,closed:j}}var rl="data-nc-help";function kg(e,t,n,a=0,o=6,r=8){let i=e.top-o-t.height,l=i>=a+r?"above":"below",c=l==="above"?i:e.bottom+o,d=Math.max(r,Math.min(e.left,n-r-t.width));return{top:Math.round(c),left:Math.round(d),side:l}}var Xo=new WeakMap;function $g(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Sg({document:e=globalThis.document,delay:t=1e3}={}){if(!e)return{uninstall(){},hide(){}};let n=Xo.get(e);if(n)return n;let a=e.defaultView,o=null,r=null,i,l=!1,c,d=null,u=!1,p=0,h=()=>{clearTimeout(i),u&&!l&&(p=Date.now()+1500),u=!1,o&&(o.hidden=!0,delete o.dataset.pinned)},m=()=>{h(),clearTimeout(c),r=null,d=null,l=!1},g=(k,A)=>{clearTimeout(i),d=A;let M=Date.now()<p?Math.min(t,300):t;i=setTimeout(()=>{r===k&&k.isConnected&&!l&&b(k)&&(u=!0)},M)},v=k=>({x:Number(k.clientX)||0,y:Number(k.clientY)||0}),f=(k,A,M)=>!k||Math.hypot(k.x-A.x,k.y-A.y)>M,b=(k,A)=>{let M=A??k.getAttribute(rl);if(!M)return!1;o||(o=e.createElement("div"),o.className="nc-ui-help",o.setAttribute("role","tooltip"),o.dataset.testid="nc-help",o.style.position="fixed",o.style.pointerEvents="none",o.style.zIndex="6",e.body.appendChild(o)),o.textContent=M,o.hidden=!1,o.style.visibility="hidden",o.style.top="0px",o.style.left="0px";let H=k.getBoundingClientRect(),j=kg(H,{width:o.offsetWidth,height:o.offsetHeight},a.innerWidth,$g(e));return o.style.top=`${j.top}px`,o.style.left=`${j.left}px`,o.dataset.side=j.side,o.style.visibility="",!0},y=k=>{if(l||k.pointerType==="touch")return;let A=k.target&&k.target.closest?k.target.closest(`[${rl}]`):null;A!==r&&(m(),!(!A||k.buttons)&&(r=A,g(A,v(k))))},w=k=>{if(l||k.pointerType==="touch"||!r)return;if(k.buttons){h(),d=null;return}let A=v(k);u?f(d,A,8)&&(h(),g(r,A)):f(d,A,4)&&g(r,A)},x=k=>{!l&&!k.relatedTarget&&m()},S=k=>{(l||k.key==="Escape")&&m()};e.addEventListener("pointerover",y),e.addEventListener("pointermove",w,{passive:!0}),e.addEventListener("pointerout",x),e.addEventListener("pointerdown",m,!0),e.addEventListener("keydown",S),a.addEventListener("scroll",m,!0),a.addEventListener("blur",m);let $={hide:m,pin(k,A,{ms:M=0}={}){return m(),!k||!k.isConnected||!b(k,A)?!1:(l=!0,o.dataset.pinned="",M>0&&(c=setTimeout(m,M)),!0)},uninstall(){m(),e.removeEventListener("pointerover",y),e.removeEventListener("pointermove",w),e.removeEventListener("pointerout",x),e.removeEventListener("pointerdown",m,!0),e.removeEventListener("keydown",S),a.removeEventListener("scroll",m,!0),a.removeEventListener("blur",m),o?.remove(),o=null,Xo.delete(e)}};return Xo.set(e,$),$}var Ag="(max-width: 768px)",Eg='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',Mg='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',Lg=0;function Tg({panel:e,button:t,label:n="Menu",media:a=Ag}){let o=e.ownerDocument,r=o.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++Lg}`);let i=t??o.createElement("button");t||(i.type="button",i.innerHTML=Eg),i.classList.add("nc-page-menu-btn"),i.setAttribute("aria-label",n),i.setAttribute("aria-expanded","false"),i.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function c(){l()||(e.setAttribute("data-nc-open",""),i.setAttribute("aria-expanded","true"),o.addEventListener("keydown",u,!0),o.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(Mg)].find(f=>!f.hidden&&f.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function d({focus:f}={}){if(!l())return;let b=e.contains(o.activeElement);e.removeAttribute("data-nc-open"),i.setAttribute("aria-expanded","false"),o.removeEventListener("keydown",u,!0),o.removeEventListener("pointerdown",p,!0),(f??b)&&i.focus?.({preventScroll:!0})}function u(f){f.key==="Escape"&&(f.preventDefault(),f.stopPropagation(),d({focus:!0}))}function p(f){let b=f.target;b instanceof r.Node&&(e.contains(b)||i.contains(b))||d({focus:!1})}let h=()=>l()?d({focus:!0}):c(),m=f=>{let b=f.target,y=b instanceof r.Element?b.closest("button"):null;!y||!e.contains(y)||y.closest("[data-nc-menu-stay]")||d({focus:!0})};i.addEventListener("click",h),e.addEventListener("click",m);let g=r.matchMedia?.(a),v=()=>{g?.matches||d({focus:!1})};return g?.addEventListener?.("change",v),{button:i,panel:e,open:c,close:d,isOpen:l,destroy(){d({focus:!1}),i.removeEventListener("click",h),e.removeEventListener("click",m),g?.removeEventListener?.("change",v)}}}var ys="netcomposer.rhythm.hidden.v1",Ve=new WeakMap;function Go(){try{return globalThis.localStorage??null}catch{return null}}function Md(e,t=ys){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function sl(e,t,n,a=ys){let o=Md(e,a);n?o.add(t):o.delete(t);try{e?.setItem(a,JSON.stringify([...o]))}catch{}}function ws(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(o=>o.controls)],n=[],a=o=>{if(n.push(o),o.type==="group")for(let r of o.controls)a(r)};for(let o of t)a(o),o.type==="fx"&&n.push(...o.controls,...o.more??[]),o.type==="strip"&&(n.push(...(o.sends??[]).map(r=>({...r,type:"knob",compact:!0}))),o.pan&&n.push(fs(o)),o.trim&&n.push(ms(o)));return n}function Ld(e,t){if(!(!e||!t))return ws(e).find(n=>n.id===t)}function Cg(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${ws(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Ng(e,t){if(!t.title)return;if(!t.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=t.title,e.append(r);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let o=document.createElement("span");o.className="nc-panel-subject",o.dataset.ncPanelSubject="",n.append(a,o),e.append(n),Td(e,t)}function Td(e,t){if(!t.panel)return;let n=[...e.children].find(r=>r.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),o=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),o&&(o.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Fg(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=Ve.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Ld(n,a)}function Pg(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],o=Cg(t);if(e.dataset.ncSignature===o){for(let r of a){let i=e.querySelector(`[data-nc-section="${ll(r.id)}"]`);i&&Td(i,r);for(let l of r.controls){let c=e.querySelector(`[data-nc-id="${ll(l.id)}"]`);c instanceof Element&&Pe(c,l)}i instanceof HTMLElement&&Fr(i,r,n)}return}e.dataset.ncSignature=o,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let r of a){let i=document.createElement("div");i.className="nc-section",i.dataset.ncSection=r.id,r.inset&&(i.dataset.ncInset="true"),r.area&&(i.dataset.ncArea=r.area),r.label&&(i.setAttribute("role","group"),i.setAttribute("aria-label",r.label)),r.panel&&(i.dataset.ncPanel="true",i.setAttribute("role","region"),r.title&&i.setAttribute("aria-label",r.title)),Ng(i,r);let l=r.panel?document.createElement("div"):i;r.panel&&(l.className="nc-panel-body",i.append(l));for(let c of r.controls)l.append(zt(c,Fg));e.append(i),Fr(i,r,n)}}function Cd(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,o=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,o))}}var zg="(max-width: 768px)",Nd=new WeakMap;function il(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function Dg(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let o=il("prev"),r=il("next"),i=document.createElement("span");i.className="nc-fx-page-count",i.dataset.ncFxPageCount="",i.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(o,i,r,l);let c=(d,u)=>{let p=Nd.get(e);if(!p||u.getAttribute("aria-disabled")==="true")return;let h=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:m}=Cd(h,p.pageSize,(t.pages.get(p.id)??0)+d);t.pages.set(p.id,m),p.onPage?.(m),Fr(e,{...p,page:m},t),u.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===u&&(u===o?r:o).focus(),t.redraw()};return o.addEventListener("click",()=>c(-1,o)),r.addEventListener("click",()=>c(1,r)),e.prepend(a),a}function Fr(e,t,n){Nd.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],o=t.pageSize??0,{pages:r,page:i}=Cd(a.length,o,t.page??n.pages.get(t.id)??0);if(o>0&&n.pages.set(t.id,i),r<=1){for(let f of[...e.children])f.classList.contains("nc-fx-pager")&&f.remove();delete e.dataset.ncPaged;for(let f of a)delete f.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(zg).matches===!0,c=e.closest(".nc-module");a.forEach((f,b)=>{let y=Math.floor(b/o)!==i;if(y?f.dataset.ncOffPage="":delete f.dataset.ncOffPage,y&&!l){let w=c instanceof HTMLElement?Ve.get(c):void 0;ug(f,Ld(w,f.dataset.ncId))}});let d=Dg(e,n),u=d.querySelector('[data-nc-fx-page="prev"]'),p=d.querySelector('[data-nc-fx-page="next"]');u.setAttribute("aria-disabled",i===0?"true":"false"),p.setAttribute("aria-disabled",i===r-1?"true":"false");let h=d.querySelector("[data-nc-fx-page-count]"),m=`${i+1} / ${r}`;h.textContent!==m&&(h.textContent=m);let g=d.querySelector("[data-nc-fx-page-live]"),v=`Effects page ${i+1} of ${r}`;g.textContent!==v&&(g.textContent=v)}function ll(e){return e.replace(/["\\]/g,"\\$&")}function Bg(e,t=ys){Tc();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Md(Go(),t).has(e.id),o=document.createElement("header");o.className="nc-module-hd",o.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${e.id}-title`;let i=document.createElement("span");i.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=Fc({labelledBy:r.id,onChange:y=>(Ve.get(n)??e).onToggle?.(y)});d.el.dataset.ncModuleSwitch="",i.append(d.el,l,c);let u=document.createElement("span");u.className="nc-snap-msg",u.dataset.ncStatus="",o.append(r,u,i);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let h=document.createElement("button");h.type="button",h.className="nc-slim";let m=document.createElement("span");m.className="nc-slim-lines",h.append(m);let g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",n.append(g,o,p,h),n.setAttribute("aria-labelledby",r.id);let v=y=>{let w=Ve.get(n)??e;n.dataset.ncOpen=y?"false":"true",p.hidden=y,h.hidden=!y,l.textContent=y?"+":"−",l.setAttribute("aria-expanded",y?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${y?"Show":"Hide"} ${w.title}`),l.title=y?"Show":"Hide",y?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let y=n.dataset.ncOpen==="true";sl(Go(),(Ve.get(n)??e).id,y,t),v(y),Pr(n.parentElement)}),h.addEventListener("click",()=>{sl(Go(),(Ve.get(n)??e).id,!1,t),v(!1),Pr(n.parentElement)});let f={pages:new Map,redraw:()=>b.redraw()},b={el:n,update(y){Ve.set(n,y),y.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=y.title,u.textContent=y.status??"",y.status!==void 0?u.setAttribute("aria-live","polite"):u.removeAttribute("aria-live"),m.textContent=y.summary??y.title,d.el.hidden=y.on===void 0,d.set(y.on===!0),y.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,h.setAttribute("aria-label",`Show ${y.title}`),Pg(p,y,f),v(p.hidden),b.redraw()},redraw(){let y=Ve.get(n);y&&mg(n,ws(y))}};return Ve.set(n,e),v(a),b.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>b.redraw()).observe(n),Ec(()=>b.redraw(),n.ownerDocument),b}function Og(e,t,n="adjacent"){Tc(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((o,r)=>{let i=r%4+1;o.el.dataset.ncShade=String(i),o.el.dataset.ncPlace=a;let l=o.el.querySelector("[data-nc-index]");l&&(l.textContent=String(i).padStart(2,"0")),e.append(o.el),o.redraw()}),Pr(e)}function Pr(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=t.some(r=>r.hasAttribute("data-nc-lead")),a=t.map(r=>r.hasAttribute("data-nc-slim")?s("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let o=t.filter(r=>!r.hasAttribute("data-nc-slim"));n&&t.length===4&&o.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Rg="https://musicmatter.art/library/library.json",sn="musicmatter.art",Ig=["CC0-1.0","CC-BY-4.0","CC-BY-SA-4.0","PDM-1.0"],Fd=6,qg=2,vs=["kick","snare","clap","hat","tom","perc","cymbal","fx","tonal"],Pd=["redistributable","personal","unknown"],Xa=e=>typeof e=="number"&&Number.isFinite(e)&&e>=40&&e<=250;function zd(e){const t=e.kind==="loop"?"loop":e.kind==="one-shot"?"one-shot":"";return{kind:t,bpm:t==="loop"&&Xa(e.bpm)?e.bpm:0}}const ht=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{},X=(e,t=300)=>typeof e=="string"?e.trim().slice(0,t):"",xe=(e,t=0)=>typeof e=="number"&&Number.isFinite(e)?e:t,Ae=e=>{const t=X(e,600);return/^https?:\/\/[^\s"'<>]+$/i.test(t)?t:""},xs=/^[0-9a-f]{64}$/,Dd="0123456789abcdefghijklmnopqrstuvwxyz";function _g(e){const t=ht(e),n=Array.isArray(t.sounds)?t.sounds:[],a=new Set,o=[];for(const r of n){const i=ht(r),l=X(i.id,160),c=X(i.role),d=X(i.license,40),u=Ae(i.audio),p=X(i.sha256,64).toLowerCase(),h=X(i.title,160);if(!l||a.has(l)||!vs.includes(c)||!u||!h||!Ig.includes(d)||!xs.test(p))continue;a.add(l);const m=ht(i.measures),g=xe(m.gain_db),v=ht(i.source);o.push({id:l,origin:"shelf",licenseStatus:"",permission:"",role:c,title:h,instrument:h.split(" · ")[0]??h,tags:(Array.isArray(i.tags)?i.tags:[]).filter(f=>typeof f=="string").map(f=>f.toLowerCase().slice(0,40)),license:d,licenseUrl:Ae(i.license_url)||ks(d),creator:X(i.creator,120)||"Unknown",creatorLink:Ae(i.creator_link),source:Ae(v.url),audio:u,manifest:Ae(i.manifest),sha256:p,measures:{length:xe(m.length_s,1),attack:xe(m.attack_ms,10),decay:xe(m.decay_s,.3),centroid:xe(m.centroid_hz,1e3),level:xe(m.hit_dbfs,-20)+g,gain:g},wave:typeof i.wave=="string"?Array.from(i.wave.slice(0,96),f=>Math.max(0,Dd.indexOf(f))/35):[],...zd(i)})}return{name:X(t.name,120)||sn,sounds:o}}function zr(e){const t=X(e,400).replace(/\\/g,"/");if(!t||t.startsWith("/")||/^[a-z][a-z0-9+.-]*:/i.test(t)||t.includes("\0"))return"";const n=t.split("/");return n.some(a=>!a||a==="."||a==="..")?"":n.join("/")}const Hg="local:";function Bd(e,t){const n=ht(e),a=Array.isArray(n.sounds)?n.sounds:[],o=new Set,r=[];for(const i of a){const l=ht(i),c=X(l.id,160),d=`${Hg}${c}`,u=X(l.role),p=X(l.license,40)||"unknown",h=zr(l.audio),m=X(l.sha256,64).toLowerCase(),g=X(l.title,160);if(!c||o.has(d)||!vs.includes(u)||!h||!g||!xs.test(m))continue;o.add(d);const v=ht(l.measures),f=xe(v.gain_db),b=ht(l.source),y=X(l.license_status,20);r.push({id:d,origin:"local",licenseStatus:Pd.includes(y)?y:"unknown",permission:X(l.permission,300),role:u,title:g,instrument:g.split(" · ")[0]??g,tags:(Array.isArray(l.tags)?l.tags:[]).filter(w=>typeof w=="string").map(w=>w.toLowerCase().slice(0,40)),license:p,licenseUrl:Ae(l.license_url)||ks(p),creator:X(l.creator,120)||"Unknown",creatorLink:Ae(l.creator_link),source:Ae(b.url),audio:`local:${t}/${h}`,manifest:zr(l.manifest),sha256:m,measures:{length:xe(v.length_s,1),attack:xe(v.attack_ms,10),decay:xe(v.decay_s,.3),centroid:xe(v.centroid_hz,1e3),level:xe(v.hit_dbfs,-20)+f,gain:f},wave:typeof l.wave=="string"?Array.from(l.wave.slice(0,96),w=>Math.max(0,Dd.indexOf(w))/35):[],...zd(l)})}return{name:X(n.name,120)||"Local Library",sounds:r}}function Od(e){const t=/^local:[^/]+\/(.+)$/.exec(e);return t?zr(t[1]):""}function cl(e,...t){return{name:e,sounds:t.flatMap(n=>n?.sounds??[])}}function ks(e){return e==="CC0-1.0"?"https://creativecommons.org/publicdomain/zero/1.0/":e==="CC-BY-4.0"?"https://creativecommons.org/licenses/by/4.0/":e==="CC-BY-SA-4.0"?"https://creativecommons.org/licenses/by-sa/4.0/":e==="PDM-1.0"?"https://creativecommons.org/publicdomain/mark/1.0/":""}function $s(e,t="",n=""){return e==="CC0-1.0"?"CC0":e==="CC-BY-4.0"?"BY":e==="CC-BY-SA-4.0"?"BY-SA":e==="PDM-1.0"?"PD":e==="Permission-only"||n?"PERM":t==="personal"?"PERS":t==="unknown"||e==="unknown"?"?":e}function Rd(e){return e.origin==="local"&&e.licenseStatus!=="redistributable"}function gn(e,t=24){const n=e.trim();if(n.length<=t)return n;const[a=n,o=""]=n.split(" · "),r=o.split(/\s+/).at(-1)??"",i=/^(?:v|vl|rr|k)?\d{1,2}$|^(?:p{1,3}|mp|mf|f{1,3})\d*$/i.test(r)?r:"",l=i?`${a} ${i}`:"";return l&&l.length<=t?l:a.length<=t?a:n.slice(0,t).trim()}const Dr={kick:"kick",kicks:"kick",bd:"kick",bassdrum:"kick","bass drum":"kick","kick drum":"kick",snare:"snare",snares:"snare",sd:"snare","snare drum":"snare",rimshot:"snare",clap:"clap",claps:"clap",handclap:"clap",handclaps:"clap","hand clap":"clap","hand claps":"clap",hat:"hat",hats:"hat",hihat:"hat",hihats:"hat","hi-hat":"hat","hi-hats":"hat","hi hat":"hat","hi hats":"hat","high hat":"hat",hh:"hat",ch:"hat",oh:"hat",tom:"tom",toms:"tom",tomtom:"tom","floor tom":"tom",perc:"perc",percs:"perc",percussion:"perc",cymbal:"cymbal",cymbals:"cymbal",crash:"cymbal",ride:"cymbal",splash:"cymbal",china:"cymbal",fx:"fx",sfx:"fx",effect:"fx",effects:"fx",tonal:"tonal",melodic:"tonal",pitched:"tonal",bell:"tonal",bells:"tonal",mallet:"tonal",mallets:"tonal",chime:"tonal",chimes:"tonal"},jg={ch:"closed",oh:"open"},dl={punchy:{wants:[{measure:"attack",dir:-1},{measure:"decay",dir:-1}],tag:"punchy"},tight:{wants:[{measure:"decay",dir:-1}],tag:"tight"},snappy:{wants:[{measure:"decay",dir:-1},{measure:"centroid",dir:1}],tag:"snappy"},short:{wants:[{measure:"length",dir:-1},{measure:"decay",dir:-1}],tag:"short"},dry:{wants:[{measure:"decay",dir:-1}]},long:{wants:[{measure:"length",dir:1},{measure:"decay",dir:1}],tag:"long"},ringing:{wants:[{measure:"decay",dir:1}]},wet:{wants:[{measure:"decay",dir:1}]},big:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}],tag:"boomy"},boomy:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}],tag:"boomy"},fat:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}]},deep:{wants:[{measure:"centroid",dir:-1}],tag:"deep"},dark:{wants:[{measure:"centroid",dir:-1}],tag:"dark"},warm:{wants:[{measure:"centroid",dir:-1}]},low:{wants:[{measure:"centroid",dir:-1}]},muffled:{wants:[{measure:"centroid",dir:-1}]},bright:{wants:[{measure:"centroid",dir:1}],tag:"bright"},crisp:{wants:[{measure:"centroid",dir:1},{measure:"decay",dir:-1}]},sharp:{wants:[{measure:"centroid",dir:1},{measure:"attack",dir:-1}]},high:{wants:[{measure:"centroid",dir:1}]},airy:{wants:[{measure:"centroid",dir:1}]},loud:{wants:[{measure:"level",dir:1}],tag:"hard"},hard:{wants:[{measure:"level",dir:1}],tag:"hard"},heavy:{wants:[{measure:"level",dir:1},{measure:"centroid",dir:-1}]},soft:{wants:[{measure:"level",dir:-1}],tag:"soft"},quiet:{wants:[{measure:"level",dir:-1}],tag:"soft"},gentle:{wants:[{measure:"level",dir:-1}],tag:"soft"},ghost:{wants:[{measure:"level",dir:-1}],tag:"soft"}},Br={funk:["tight","punchy"],funky:["tight","punchy"],disco:["tight","bright"],dusty:["dark","soft"],lofi:["dark","soft"],"lo-fi":["dark","soft"],vintage:["dark"],"70s":["dark","tight"],"60s":["dark","soft"],old:["dark"],jazz:["soft","dark"],jazzy:["soft","dark"],rock:["hard","long"],metal:["hard","bright"],hiphop:["punchy","dark"],"hip-hop":["punchy","dark"],"boom bap":["punchy","dark"],boombap:["punchy","dark"],trap:["punchy","short"],techno:["tight","punchy"],house:["tight","punchy"],ambient:["long","soft"],cinematic:["big","long"],epic:["big","loud"]},Id=new Set(["kit","kits","drumkit","drumkits","drums","set","drum kit"]),Wg=new Set("a an the some any with and or of for to me my give find get want need please like sound sounds sample samples one ones really very bit little more less that this".split(" "));function Ug(e){const t=e.toLowerCase().replace(/[^a-z0-9\s-]/g," ").split(/\s+/).filter(Boolean),n=[];for(let a=0;a<t.length;a++){const o=`${t[a]} ${t[a+1]??""}`;t[a+1]&&(o in Dr||o in Br||Id.has(o))?(n.push(o),a++):n.push(t[a])}return n}function Ss(e){return new Set(e.title.toLowerCase().split(/[^a-z0-9]+/).map(t=>t.replace(/\d+$/,"")).filter(t=>t.length>1))}function Or(e,t){const n={text:e.trim(),roles:[],tags:[],softTags:[],wants:[],kit:!1,kind:"",unknown:[]},a=new Set;if(t)for(const r of t.sounds){for(const i of r.tags)a.add(i);for(const i of Ss(r))a.add(i)}const o=r=>{const i=dl[r];i&&(n.wants.push(...i.wants),i.tag&&!n.softTags.includes(i.tag)&&n.softTags.push(i.tag))};for(const r of Ug(e))if(Id.has(r))n.kit=!0;else if(r in Dr){const i=Dr[r];n.roles.includes(i)||n.roles.push(i);const l=jg[r];(l==="open"||l==="closed")&&(n.kind=l)}else if(r in dl)o(r);else if(r in Br)for(const i of Br[r]??[])o(i);else if(r==="open")n.kind="open";else if(r==="closed"||r==="close")n.kind="closed";else{if(Wg.has(r))continue;if(!t||a.has(r)||a.has(r.replace(/s$/,""))){const i=t&&!a.has(r)?r.replace(/s$/,""):r;n.tags.includes(i)||n.tags.push(i)}else n.unknown.push(r)}return n}function Yg(e,t){const n=[...e].sort((r,i)=>r.measures[t]-i.measures[t]),a=new Map,o=Math.max(1,n.length-1);return n.forEach((r,i)=>a.set(r.id,i/o)),a}const Xg=[{measure:"level",dir:1,weight:.5},{measure:"length",dir:-1,weight:.2}],Gg=.2,Kg={kick:-1,tom:-1,snare:1,clap:1,hat:1};function As(e,t){const n=new Set(t.wants.map(i=>i.measure)),a=new Map,o=(i,l)=>{let c=a.get(i);return c||(c=Yg(e,i),a.set(i,c)),c.get(l)??.5},r=(i,l)=>i.reduce((c,d)=>{const u=o(d.measure,l);return c+(d.dir>0?u:1-u)},0)/Math.max(1,i.length);return e.map(i=>{const l=Ss(i);let c=0;for(const u of t.tags)c+=i.tags.includes(u)?2:l.has(u)?1:0;t.wants.length&&(c+=2*r(t.wants,i.id));const d=Kg[i.role];for(const u of[...Xg,...d?[{measure:"centroid",dir:d,weight:Gg}]:[]])n.has(u.measure)||(c+=2*u.weight*r([u],i.id));for(const u of t.softTags)i.tags.includes(u)&&(c+=.4);return{sound:i,score:c}})}const ul=(e,t)=>t.score-e.score||e.sound.title.localeCompare(t.sound.title)||e.sound.id.localeCompare(t.sound.id);function Ga(e,t,n,a){let o=e.sounds.filter(r=>!a.has(r.id)&&(!t.length||t.includes(r.role)));if(n.length){const r=o.filter(i=>{const l=Ss(i);return n.some(c=>i.tags.includes(c)||l.has(c))});r.length&&(o=r)}return o}function Es(e,t){const n=[...e].sort(ul),a=[],o=new Map;for(const r of n){if(a.length>=t)break;const i=o.get(r.sound.instrument)??0;i>=qg||(o.set(r.sound.instrument,i+1),a.push(r))}for(const r of n){if(a.length>=t)break;a.includes(r)||a.push(r)}return a.sort(ul)}function Vg(e,t){if(!t)return e;const n=e.filter(a=>a.role==="hat"&&Xn(a)===t);return n.length?n:e}function Qg(e,t,n={}){const a=t.kind&&!t.roles.length?["hat"]:t.roles,o=Vg(Ga(e,a,t.tags,n.exclude??new Set),t.kind);return Es(As(o,t),n.limit??Fd)}const Jg=[{key:"kick",label:"Kick",role:"kick",nearest:["tom","perc"]},{key:"snare",label:"Snare",role:"snare",nearest:["clap","perc"]},{key:"clap",label:"Clap",role:"clap",nearest:["snare","perc"]},{key:"closed-hat",label:"Closed hat",role:"hat",tag:"closed",nearest:["perc","cymbal"]},{key:"open-hat",label:"Open hat",role:"hat",tag:"open",nearest:["cymbal","perc"]},{key:"tom",label:"Tom",role:"tom",nearest:["perc","kick"]},{key:"perc",label:"Perc",role:"perc",nearest:["tom","tonal"]},{key:"fx",label:"FX",role:"fx",nearest:["tonal","cymbal","perc"]}];function Xn(e){if(e.tags.includes("closed"))return"closed";if(e.tags.includes("open"))return"open";const t=e.title.toLowerCase();return/\bclose[d]?\b|hitc\b/.test(t)?"closed":/\bopen\b|hito\b/.test(t)?"open":""}function Zg(e,t,n,a){const o=Ga(e,[t.role],n.tags,a);if(t.tag){const r=o.filter(l=>Xn(l)===t.tag);if(r.length)return{list:r,role:t.role,kindMissing:!1};const i=o.filter(l=>Xn(l)==="");if(i.length)return{list:i,role:t.role,kindMissing:!0}}else if(o.length)return{list:o,role:t.role,kindMissing:!1};for(const r of t.nearest){const i=Ga(e,[r],n.tags,a);if(i.length)return{list:i,role:r,kindMissing:!1}}return{list:[],role:t.role,kindMissing:!1}}const eb={kick:"a kick",snare:"a snare",clap:"a clap",hat:"a hat",tom:"a tom",perc:"a percussion sound",cymbal:"a cymbal",fx:"an effect",tonal:"a tonal sound"};function pl(e,t){const n=t.wants.some(r=>r.measure==="level")?t:{...t,wants:[...t.wants,{measure:"level",dir:1}]},a=new Set,o=[];for(const r of Jg){const{list:i,role:l,kindMissing:c}=Zg(e,r,n,a),d=Es(As(i,n),1)[0];if(!d)continue;a.add(d.sound.id);const u=l!==r.role?`No ${r.label.toLowerCase()} in the Library: ${eb[l]} instead.`:c?`No ${r.label.toLowerCase()} labelled as one: the nearest hat instead.`:void 0;o.push({slot:r,sound:d.sound,...u?{note:u}:{}})}return o}const Ms="your local Library";function yo(e,t){return{id:e.id,title:e.title,role:e.role,creator:e.creator,creatorLink:e.creatorLink,license:e.license,licenseUrl:e.licenseUrl,source:e.source,audio:e.audio,sha256:e.sha256,gainDb:e.measures.gain,curator:e.origin==="local"?Ms:sn,query:t.trim().slice(0,120),kind:e.role==="hat"?Xn(e):"",origin:e.origin,licenseStatus:e.licenseStatus}}function tb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;const t=e,n=X(t.id,160),a=X(t.title,160),o=X(t.license,40),r=X(t.sha256,64).toLowerCase();if(!n||!a||!o)return null;const i=vs.includes(t.role)?t.role:"perc",l=t.kind==="closed"||t.kind==="open"?t.kind:"",c=t.origin==="local"?"local":"shelf",d=X(t.licenseStatus,20),u=c==="local"?Od(X(t.audio,600))?X(t.audio,600):"":Ae(t.audio);return{id:n,title:a,role:i,creator:X(t.creator,120)||"Unknown",creatorLink:Ae(t.creatorLink),license:o,licenseUrl:Ae(t.licenseUrl)||ks(o),source:Ae(t.source),audio:u,sha256:xs.test(r)?r:"",gainDb:Math.max(-60,Math.min(60,xe(t.gainDb))),curator:X(t.curator,80)||(c==="local"?Ms:sn),query:X(t.query,120),kind:l,origin:c,licenseStatus:c==="local"&&Pd.includes(d)?d:c==="local"?"unknown":""}}function nb(e,t,n=new Set,a=3){const o=Or(t.query,e),r=new Set([...n,t.id]);let i=Ga(e,[t.role],o.tags,r);if(t.role==="hat"&&t.kind){const l=i.filter(c=>Xn(c)===t.kind);l.length&&(i=l)}return Es(As(i,{...o,roles:[t.role]}),a)}function qd(e){const t=new Map;return e.forEach((n,a)=>{const o=n.provenance;if(!o)return;const r=t.get(o.id);r?r.pads.push(a+1):t.set(o.id,{...o,pads:[a+1]})}),[...t.values()]}function ab(e){return["shelf","local"].map(n=>({origin:n,credits:e.filter(a=>(a.origin??"shelf")===n)})).filter(n=>n.credits.length)}const ob=-14,rb=-1,_d=24,sb=.05,ib=-80,hl=e=>e>0?20*Math.log10(e):Number.NEGATIVE_INFINITY;function lb(e,t){const n=e[0]?.length??0,a=e.length;if(!n||!a)return{hit:Number.NEGATIVE_INFINITY,peak:Number.NEGATIVE_INFINITY};const o=Math.max(1,Math.round(sb*t)),r=new Float64Array(n);let i=0;for(let d=0;d<n;d++){let u=0;for(const p of e){const h=p[d]??0;u+=h;const m=h<0?-h:h;m>i&&(i=m)}u/=a,r[d]=u*u}let l=0,c=0;for(let d=0;d<n;d++)l+=r[d]??0,d>=o&&(l-=r[d-o]??0),l>c&&(c=l);return{hit:hl(Math.sqrt(Math.max(0,c)/o)),peak:hl(i)}}function cb(e){if(!Number.isFinite(e.hit)||e.hit<ib)return 0;let t=Math.min(ob-e.hit,_d);Number.isFinite(e.peak)&&(t=Math.min(t,rb-e.peak));const n=Math.round(t*10)/10;return n===0?0:n}function bn(e,t){return{on:!0,gainDb:cb(lb(e,t))}}const db=Object.freeze({on:!0,gainDb:0});function fl(e){return e.normalize?e.normalize.on:e.provenance!==null}function ub(e){const t=e.normalize;return t?t.on?t.gainDb:e.provenance?-e.provenance.gainDb:0:0}function pb(e){const t=ub(e);return t===0?1:10**(t/20)}function hb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;const t=e;if(typeof t.on!="boolean")return null;const n=t.gainDb;return typeof n!="number"||!Number.isFinite(n)||n<-60||n>_d?null:{on:t.on,gainDb:n}}function fb(e){const t=Math.round(e*10)/10;return t===0?"0.0 dB":`${t>0?"+":"−"}${Math.abs(t).toFixed(1)} dB`}const mb="nyx-limiter",Ls={knee:.6,ceiling:.944,range:4,points:8193};function gb(e,{knee:t,ceiling:n}=Ls){const a=Math.abs(e);if(a<=t)return e;const o=n-t;return Math.sign(e)*(t+o*Math.tanh((a-t)/o))}function bb({range:e,points:t}=Ls){const n=new Float32Array(t);for(let a=0;a<t;a++)n[a]=gb((2*a/(t-1)-1)*e);return n}function yb(e){const t=e.createGain();t.gain.value=1/Ls.range;const n=e.createWaveShaper();return n.curve=bb(),n.oversample="none",t.connect(n),{input:t,output:n}}const Gn=6,ke=-60,Ft=.75,Hd=1.6;function wb(e){return!Number.isFinite(e)||e<=ke?0:10**(Math.min(Gn,e)/20)}function vb(e){return!Number.isFinite(e)||e<=ke?0:e>=0?Ft+(1-Ft)*(Math.min(e,Gn)/Gn):Ft*((e-ke)/-ke)**Hd}function xb(e){const t=Math.min(1,Math.max(0,Number.isFinite(e)?e:0));let n;if(t>=Ft)n=(t-Ft)/(1-Ft)*Gn;else{if(t<=0)return ke;n=ke+-ke*(t/Ft)**(1/Hd)}const a=Math.round(n*10)/10;return a<=ke+.05?ke:Math.abs(a)<.25?0:a}function kb(e){if(!Number.isFinite(e)||e<=ke)return"−∞";const t=Math.round(e*10)/10;return t===0?"0.0 dB":`${t>0?"+":"−"}${Math.abs(t).toFixed(1)} dB`}const Jt=[[0,.4],[-1.94,0],[-6.02,-2.2],[-12.04,-7.7],[-20,-15.7]];function $b(e){if(!Number.isFinite(e)||e<=0)return ke;const t=20*Math.log10(Math.min(1,e)),n=Jt[0];if(t>=n[0])return n[1];for(let r=1;r<Jt.length;r++){const[i,l]=Jt[r],[c,d]=Jt[r-1];if(t>=i)return Math.round((d+(t-c)*(l-d)/(i-c))*10)/10}const[a,o]=Jt[Jt.length-1];return Math.max(ke,Math.round((t-a+o)*10)/10)}const Sb=.8,ln=["free","1/16","1/8","1/4","1/2","1","2","4","8"],Ab={free:0,"1/16":.25,"1/8":.5,"1/4":1,"1/2":2,1:4,2:8,4:16,8:32};function Mt(e){return e==="free"?"Free":e.includes("/")?e:e==="1"?"1 bar":`${e} bars`}const jd=[{id:"lfo",label:"NYX LFO",group:"nyx"},{id:"aria:phone-tilt-x",label:"Tilt X",group:"aria"},{id:"aria:phone-tilt-y",label:"Tilt Y",group:"aria"},{id:"aria:phone-heading",label:"Heading",group:"aria"},{id:"aria:phone-shake",label:"Shake",group:"aria"},{id:"aria:energy",label:"Ground Energy",group:"aria"}],ml=e=>typeof e=="string"&&jd.some(t=>t.id===e),gl=e=>!!e&&e.startsWith("aria:"),Wd=["sine","triangle","step"],Ud=[.25,.5,1,2,4,8,16],Na=2,Yd=3,Ts=16;function Cs(){return{startSource:null,startAmount:.5,lengthSource:null,lengthSteps:1,lfoBars:4,lfoShape:"sine"}}const ft=(e,t,n)=>e<t?t:e>n?n:e,bl=e=>typeof e=="number"&&Number.isFinite(e);function Eb(e){const t=Cs();if(typeof e!="object"||e===null)return t;const n=e;return{startSource:ml(n.startSource)?n.startSource:null,startAmount:bl(n.startAmount)?ft(n.startAmount,0,Na):t.startAmount,lengthSource:ml(n.lengthSource)?n.lengthSource:null,lengthSteps:bl(n.lengthSteps)?ft(Math.round(n.lengthSteps),1,Yd):t.lengthSteps,lfoBars:Ud.includes(n.lfoBars)?n.lfoBars:t.lfoBars,lfoShape:Wd.includes(n.lfoShape)?n.lfoShape:t.lfoShape}}const Ka=e=>!e.startSource&&!e.lengthSource;function cn(){return{aria:!1,tiltX:0,tiltY:0,heading:0,energy:.5,shakes:0,shakeRun:0,shakeBeat:Number.NEGATIVE_INFINITY}}function Mb(e,t){const n=t-e.shakeBeat<=Ts?e.shakeRun+1:1;return{...e,shakes:e.shakes+1,shakeRun:n,shakeBeat:t}}function Xd(e){let t=(Math.imul(e|0,2654435761)^2246822507)>>>0;return t=Math.imul(t^t>>>16,2146121005)>>>0,t=Math.imul(t^t>>>15,2221713035)>>>0,t=(t^t>>>16)>>>0,t/4294967295*2-1}function Lb(e,t){const n=Math.max(.25,e.lfoBars)*4,a=t/n,o=a-Math.floor(a);return e.lfoShape==="triangle"?o<.5?-1+4*o:3-4*o:e.lfoShape==="step"?Xd(Math.floor(a)):Math.sin(2*Math.PI*o)}function Gd(e,t,n,a){if(e==="lfo")return Lb(t,a);if(!n.aria)return 0;switch(e){case"aria:phone-tilt-x":return ft(n.tiltX,-1,1);case"aria:phone-tilt-y":return ft(n.tiltY,-1,1);case"aria:phone-heading":return ft(n.heading,0,1)*2-1;case"aria:energy":return ft(n.energy,0,1)*2-1;case"aria:phone-shake":return n.shakes>0?Xd(n.shakes):0}return 0}function Rr(e,t,n){return e.startSource?Gd(e.startSource,e,t,n)*e.startAmount:0}function Ir(e,t,n){const a=e.lengthSource;return a?a==="aria:phone-shake"?!t.aria||t.shakeRun<=0||n-t.shakeBeat>Ts?0:-Math.min(t.shakeRun,e.lengthSteps):Math.round(Gd(a,e,t,n)*e.lengthSteps):0}function On(e,t){if(e==="free"||!t)return e;const n=ft(ln.indexOf(e)+t,1,ln.length-1);return ln[n]??e}function Va(e,t,n,a){return Ab[e]*60/Math.max(1,t)*n*Math.max(.001,a)}function Tb(e,t,n,a){const{frames:o,sampleRate:r}=e,i=e.mod,l=i?Rr(i,t,n):0,c=Math.max(0,o-2),d=ft(Math.round(e.start+l*r),0,c),u=i?On(e.grid,Ir(i,t,n)):e.grid;let p,h=!1;return u==="free"?p=e.end+(d-e.start):p=d+Math.round(Va(u,a,r,e.rate)),p>o&&(p=o,h=u!=="free"),p<d+2&&(p=Math.min(o,d+2)),{from:d,to:p,grid:u,shift:l,clamped:h}}const Q=16,le=16,yn=10,Kd=["1","2","3","4","5","6","7","8","9","0"],Vd=[0,2,4,8,16],Qd=[0,1,2,4,8],Qa=["always","1:2","2:2","1:3","2:3","3:3","1:4","2:4","3:4","4:4","1:5","2:5","3:5","4:5","5:5","1:6","2:6","3:6","4:6","5:6","6:6","1:7","2:7","3:7","4:7","5:7","6:7","7:7","1:8","2:8","3:8","4:8","5:8","6:8","7:8","8:8","fill","!fill","pre","!pre"],Ja={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}};function Xe(e){return{name:`Pad ${e+1}`,sample:null,mode:"oneshot",dir:"fwd",start:0,end:1,slices:0,cuts:[],tune:0,fine:0,fit:0,keepPitch:!0,attack:0,decay:4,cutoff:0,resonance:0,levelDb:0,pan:0,choke:0,provenance:null,rights:null,normalize:null,offsetDb:0,follow:null,note:0,retrigger:"cut",length:"free",mod:Cs()}}function Kn(e){return!e.sample||e.fit>0?!1:e.follow??e.provenance?.role==="tonal"}function Cb(e,t){const n=/^(\d):(\d)$/.exec(e.cond);return!e.on||!n?{}:{mark:n[1],markLabel:`${t===le?"bar":"pass"} ${n[1]} of ${n[2]}`}}function ra(){return{on:!1,accent:!1,velocity:.8,chance:1,slice:null,pitch:0,reverse:!1,cond:"always"}}function wo(){return{length:le,mute:!1,solo:!1,steps:Array.from({length:le},ra)}}function Jd(){return{filter:{on:!0,mode:"lp",cutoff:1,resonance:.15},drive:structuredClone(Ja.drive),compressor:structuredClone(Ja.compressor)}}function qr(){return{v:1,pads:Array.from({length:Q},(e,t)=>Xe(t)),lanes:Array.from({length:Q},wo),swing:.5,hacks:Jd(),slots:Array.from({length:yn},()=>null),active:null,selected:0,master:1}}const Ze=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{},ce=(e,t,n,a)=>typeof e=="number"&&Number.isFinite(e)?Math.min(n,Math.max(t,e)):a,Qe=(e,t,n,a)=>Math.round(ce(e,t,n,a)),wt=(e,t)=>typeof e=="boolean"?e:t,Za=(e,t,n)=>t.includes(e)?e:n,Nn=/^[0-9a-f]{16,64}$/,Nb=1e-6;function Fb(e,t){const n=Ze(e),a=Xe(t);let o=ce(n.start,0,1,0),r=ce(n.end,0,1,1);r-o<Nb&&([o,r]=[0,1]);const i=Vd.includes(n.slices)?n.slices:0,l=typeof n.cuts=="string"&&n.cuts.length<=eu?n.cuts.split(" ").map(Number):n.cuts,c=Array.isArray(l)?l.filter(d=>typeof d=="number"&&d>0&&d<1).sort((d,u)=>d-u).slice(0,15):[];return{name:typeof n.name=="string"&&n.name.trim()?n.name.trim().slice(0,24):a.name,sample:typeof n.sample=="string"&&Nn.test(n.sample)?n.sample:null,mode:Za(n.mode,["oneshot","gate","loop"],a.mode),dir:Za(n.dir,["fwd","rev","pingpong"],a.dir),start:o,end:r,slices:i,cuts:i?c:[],tune:Qe(n.tune,-24,24,0),fine:Qe(n.fine,-100,100,0),fit:Qd.includes(n.fit)?n.fit:0,keepPitch:wt(n.keepPitch,!0),attack:ce(n.attack,0,.1,a.attack),decay:ce(n.decay,.01,4,a.decay),cutoff:ce(n.cutoff,-1,1,0),resonance:ce(n.resonance,0,1,0),levelDb:typeof n.levelDb=="number"&&Number.isFinite(n.levelDb)?ce(n.levelDb,ke,Gn,a.levelDb):typeof n.level=="number"?$b(ce(n.level,0,1,.8)):a.levelDb,pan:ce(n.pan,-1,1,0),choke:Qe(n.choke,0,4,0),provenance:typeof n.sample=="string"&&Nn.test(n.sample)?tb(n.provenance):null,rights:typeof n.sample=="string"&&Nn.test(n.sample)&&n.rights==="unknown"?"unknown":null,normalize:typeof n.sample=="string"&&Nn.test(n.sample)?hb(n.normalize):null,offsetDb:typeof n.sample=="string"&&Nn.test(n.sample)?ce(n.offsetDb,-24,0,0):0,follow:typeof n.follow=="boolean"?n.follow:null,note:Qe(n.note,0,11,0),retrigger:n.retrigger==="finish"?"finish":"cut",length:ln.includes(n.length)?n.length:"free",mod:Eb(n.mod)}}function Pb(e){const t=Ze(e);return{on:wt(t.on,!1),accent:wt(t.accent,!1),velocity:ce(t.velocity,0,1,.8),chance:ce(t.chance,0,1,1),slice:t.slice===null||t.slice===void 0?null:Qe(t.slice,0,15,0),pitch:Qe(t.pitch,-12,12,0),reverse:wt(t.reverse,!1),cond:Za(t.cond,Qa,"always")}}function zb(e){const t=Ze(e),n=Array.isArray(t.steps)?t.steps:typeof t.steps=="string"?Hb(t.steps):[];return{length:Qe(t.length,1,le,le),mute:wt(t.mute,!1),solo:wt(t.solo,!1),steps:Array.from({length:le},(a,o)=>Pb(n[o]))}}function yl(e,t){const n=Ze(e),a={...t.dials};for(const[o,r]of Object.entries(Ze(n.dials)))o in t.dials&&typeof r=="number"&&Number.isFinite(r)&&(a[o]=r);return{on:wt(n.on,t.on),dials:a}}function Db(e){const t=Ze(e),n=Ze(t.filter),a=Jd();return{filter:{on:wt(n.on,a.filter.on),mode:Za(n.mode,["lp","hp","bp"],a.filter.mode),cutoff:ce(n.cutoff,0,1,a.filter.cutoff),resonance:ce(n.resonance,0,1,a.filter.resonance)},drive:yl(t.drive,Ja.drive),compressor:yl(t.compressor,Ja.compressor)}}function eo(e){const t=Ze(e),n=Array.isArray(t.pads)?t.pads:[],a=Array.isArray(t.lanes)?t.lanes:[];return{pads:Array.from({length:Q},(o,r)=>Fb(n[r],r)),lanes:Array.from({length:Q},(o,r)=>zb(a[r])),swing:ce(t.swing,.5,.75,.5),hacks:Db(t.hacks)}}function Zd(e){const t=Ze(e);if(t.v!==1)return qr();const n=Array.isArray(t.slots)?t.slots:[],a=eo(t),o=Array.from({length:yn},(i,l)=>n[l]?eo(n[l]):null),r=t.active===null?null:Qe(t.active,0,yn-1,-1);return{v:1,...a,slots:o,active:r!==null&&r>=0&&o[r]?r:null,selected:Qe(t.selected,0,Q-1,0),master:ce(t.master,0,1,1)}}function Ns(e,t){return structuredClone({index:t,pad:e.pads[t]??Xe(t),lane:e.lanes[t]??wo()})}function Bb(e,t){const n=structuredClone(t);e.pads[n.index]=n.pad,e.lanes[n.index]=n.lane}function vo(e,t){const n=(r,i)=>r.index??i,a=t.map((r,i)=>Ns(e,n(r,i))),o=t.map((r,i)=>r.hat?e.pads[n(r,i)]?.choke??0:0).find(r=>r>0)??1;return t.forEach((r,i)=>{const l=Xe(n(r,i));l.sample=r.sample,l.name=r.name.slice(0,24)||l.name,l.provenance=r.provenance,l.normalize=r.normalize!==void 0?r.normalize&&{...r.normalize}:r.provenance?{on:!0,gainDb:0}:null,r.hat&&(l.choke=o),e.pads[n(r,i)]=l}),a}function Ob(e,t){const n=Array.from({length:Q},(a,o)=>Ns(e,o));for(let a=0;a<Q;a++)e.pads[a]=Xe(a);return vo(e,t),n}const Vn=8;function Rb(e,t,n,a=0){const o=e.pads[t],r=e.lanes[t];if(!o||!r)return;o.mode="oneshot",o.dir="fwd",o.decay=4,o.attack=0,o.fit=n,o.keepPitch=!0,o.slices=0,o.cuts=[],r.length=le;for(const l of r.steps)Object.assign(l,ra());const i=r.steps[0];n<=Vn&&i&&(i.on=!0,i.cond=n===1?"always":`${a%n+1}:${n}`)}function Ib(e,t=Q){if(typeof e!="string"||!/^\d{1,3}$/.test(e))return-1;const n=Number(e)-1;return n>=0&&n<t?n:-1}function Fs(e){return structuredClone({pads:e.pads,lanes:e.lanes,swing:e.swing,hacks:e.hacks})}const eu=4096;function qb(e){const t=ra(),n=e.map(a=>{let o="";return a.on!==t.on&&(o+="x"),a.accent!==t.accent&&(o+="a"),a.reverse!==t.reverse&&(o+="r"),a.velocity!==t.velocity&&(o+=`v${a.velocity}`),a.chance!==t.chance&&(o+=`c${a.chance}`),a.slice!==t.slice&&a.slice!==null&&(o+=`s${a.slice}`),a.pitch!==t.pitch&&(o+=`p${a.pitch}`),a.cond!==t.cond&&(o+=`k${a.cond}`),o||"-"});for(;n.at(-1)==="-";)n.pop();return n.join(" ")}const _b="-?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[+-]?\\d+)?",wl=new RegExp(`[xar]|[vcsp]${_b}|k\\S+$`,"gy");function Hb(e){return e.length>eu?[]:e.split(" ").slice(0,le).map(t=>{const n={};if(t==="-"||t==="")return n;wl.lastIndex=0;let a=0;for(const o of t.matchAll(wl)){const r=o[0];a+=r.length;const i=r.slice(1);r==="x"?n.on=!0:r==="a"?n.accent=!0:r==="r"?n.reverse=!0:r[0]==="v"?n.velocity=Number(i):r[0]==="c"?n.chance=Number(i):r[0]==="s"?n.slice=Number(i):r[0]==="p"?n.pitch=Number(i):r[0]==="k"&&(n.cond=i)}return a===t.length?n:{}})}function jb(e){const t=e.pads.map((a,o)=>{const r=Xe(o),i={};for(const[l,c]of Object.entries(a))l==="cuts"?a.cuts.length&&(i.cuts=a.cuts.join(" ")):l==="mod"?Ka(a.mod)||(i.mod=a.mod):r[l]!==c&&(i[l]=c);return i}),n=e.lanes.map(a=>({...a.length!==le?{length:a.length}:{},...a.mute?{mute:!0}:{},...a.solo?{solo:!0}:{},steps:qb(a.steps)}));return structuredClone({pads:t,lanes:n,swing:e.swing,hacks:e.hacks})}function Qn(e){const t=new Set;for(const n of[e,...e.slots])for(const a of n?.pads??[])a.sample&&t.add(a.sample);return t}function tu(){try{return globalThis.localStorage??null}catch{return null}}function Wb(e,t=tu()){try{const n=t?.getItem(e);return n?Zd(JSON.parse(n)):qr()}catch{return qr()}}function Ub(e,t,n=tu()){try{return n?.setItem(e,JSON.stringify(t)),!!n}catch{return!1}}const lt=1e-6;function Yb(e,t){return Math.min(127,Math.max(0,(t+1)*12+(e%12+12)%12))}class Ko{entries=[];add(t){for(const n of t){let a=this.entries.find(r=>r.chord?.hit===n.hit&&Math.abs(r.startBeat-n.startBeat)<lt);a||(a={startBeat:n.startBeat,chord:{root:n.root,notes:[],startBeat:n.startBeat,lengthBeats:0,sounding:!0,hit:n.hit}},this.insert(a));const o=a.chord;o.notes.includes(n.note)||(o.notes.push(n.note),o.notes.sort((r,i)=>r-i)),o.lengthBeats=Math.max(o.lengthBeats,n.lengthBeats)}}off(t){if(t===void 0){this.entries=[];return}this.entries=this.entries.filter(n=>n.startBeat<t-lt),this.entries.push({startBeat:t,chord:null})}cut(t){this.entries=this.entries.filter(n=>n.startBeat<t-lt)}points(t=Number.NEGATIVE_INFINITY){let n=0;for(let a=0;a<this.entries.length;a++)this.entries[a].startBeat<=t+lt&&(n=a);return this.entries.slice(n).map(a=>({beat:a.startBeat,root:a.chord?a.chord.root:null}))}chordAt(t){let n=null;for(const o of this.entries){if(o.startBeat>t+lt)break;n=o}if(!n?.chord)return null;const a=n.chord;return{...a,notes:[...a.notes],sounding:t<a.startBeat+a.lengthBeats-lt}}pitchAt(t,{octave:n}={}){const a=this.chordAt(t);return a?n===void 0?a.root:Yb(a.root,n):null}prune(t){let n=0;for(let a=0;a<this.entries.length;a++)this.entries[a].startBeat<=t+lt&&(n=a);n>0&&this.entries.splice(0,n)}get size(){return this.entries.length}insert(t){let n=this.entries.length;for(;n>0&&this.entries[n-1].startBeat>t.startBeat+lt;)n--;this.entries.splice(n,0,t)}}const _e=1,to=1024,Xb=48,nu=128,_r=40,vl=64,xl=8,kl=16,$l=1024,Ps=16,au=36,zs=255,Gb=["chord","root","top"],Kb=["chord","root","top","arp","note"],Vb=e=>au+e-1;function Qb(e){const t=e-au+1;return Number.isInteger(t)&&t>=1&&t<=Ps?t:null}const xa=256,Sl=2,Al=128;function Jb(e){const t=e.split("|");if(t.length<5)return null;const n=Number(t[t.length-4]);return Number.isInteger(n)?n:null}const Jn=e=>typeof e=="object"&&e!==null,ve=e=>typeof e=="string"&&e.length>0&&e.length<=nu,fe=e=>typeof e=="number"&&Number.isFinite(e);function El(e){return Jn(e)?ve(e.id)?ve(e.source)?!Number.isInteger(e.note)||e.note<0||e.note>127?"note must be a whole number 0–127":!fe(e.velocity)||e.velocity<0||e.velocity>1?"velocity must be 0–1":fe(e.startBeat)?!fe(e.lengthBeats)||e.lengthBeats<0?"bad lengthBeats":!fe(e.spanBeats)||e.spanBeats<=0?"bad spanBeats":!fe(e.gate)||e.gate<=0||e.gate>1?"gate must be above 0, at most 1":!fe(e.offsetSec)||Math.abs(e.offsetSec)>2?"bad offsetSec":typeof e.role!="string"||!Kb.includes(e.role)?"bad role":Number.isInteger(e.hit)?!Number.isInteger(e.root)||e.root<0||e.root>127?"bad root":e.slice!==void 0&&!ou(e.slice)?`slice must be a whole number 0–${zs}`:null:"bad hit":"bad startBeat":"bad source":"bad id":"not an object"}const ou=e=>Number.isInteger(e)&&e>=0&&e<=zs,Zb=e=>Number.isInteger(e)&&e>=1&&e<=Ps;function ru(e){return Jn(e)?ve(e.id)?fe(e.beat)?e.type==="slot"?!Number.isInteger(e.slot)||e.slot<1||e.slot>kl?`slot must be a whole number 1–${kl}`:null:e.type==="chordPad"?e.pad!==null&&!Zb(e.pad)?`pad must be a whole number 1–${Ps}, or null`:null:e.type==="take"?ve(e.take)?!fe(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>xa?`lengthBeats must be above 0, at most ${xa}`:e.gain!==void 0&&(!fe(e.gain)||e.gain<0||e.gain>Sl)?`gain must be 0–${Sl}`:e.offsetBeats!==void 0&&(!fe(e.offsetBeats)||e.offsetBeats<0||e.offsetBeats>=e.lengthBeats)?"offsetBeats must be from 0, below lengthBeats":e.peaks!==void 0&&!(Array.isArray(e.peaks)&&e.peaks.length<=Al&&e.peaks.every(t=>fe(t)&&t>=0&&t<=1))?`peaks must be at most ${Al} values 0–1`:null:"bad take":e.type==="lap"?!fe(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>xa?`lengthBeats must be above 0, at most ${xa}`:null:"bad type":"bad beat":"bad id":"not an object"}function ey(e){if(!Jn(e))return"not an object";if(e.type!=="note")return ru(e);if(!ve(e.id))return"bad id";if(!fe(e.beat))return"bad beat";if(typeof e.on!="boolean")return"on must be true or false";if(!Number.isInteger(e.note)||e.note<0||e.note>127)return"note must be a whole number 0–127";if(e.on){if(!fe(e.velocity)||e.velocity<=0||e.velocity>1)return"velocity must be above 0, at most 1";if(e.slice!==void 0&&!ou(e.slice))return`slice must be a whole number 0–${zs}`;if(e.name!==void 0&&(typeof e.name!="string"||!e.name.length||e.name.length>_r))return`name must be 1–${_r} characters`}else if(e.velocity!==void 0||e.slice!==void 0||e.name!==void 0)return"an off has no velocity, slice or name";return null}function Ml(e,t){if(!Array.isArray(e))return"events must be a list";if(e.length>to)return`more than ${to} events`;for(let n=0;n<e.length;n++){const a=t(e[n]);if(a)return`event ${n}: ${a}`}return null}function ty(e){if(!Jn(e))return"not an object";if(e.v!==_e)return`version ${String(e.v)} is not ${_e}`;if(e.kind==="notes"){if(!ve(e.source))return"bad source";if(!Array.isArray(e.events))return"events must be a list";if(e.events.length>to)return`more than ${to} events`;for(let t=0;t<e.events.length;t++){const n=El(e.events[t]);if(n)return`event ${t}: ${n}`;if(e.events[t].source!==e.source)return`event ${t}: from another source`}return null}if(e.kind==="audition"){if(!ve(e.source))return"bad source";if(!Array.isArray(e.events))return"events must be a list";if(e.events.length>vl)return`more than ${vl} notes`;if(!fe(e.holdSec)||e.holdSec<=0||e.holdSec>xl)return`holdSec must be above 0, at most ${xl}`;for(let t=0;t<e.events.length;t++){const n=El(e.events[t]);if(n)return`event ${t}: ${n}`;if(e.events[t].source!==e.source)return`event ${t}: from another source`}return null}if(e.kind==="played")return ve(e.source)?Ml(e.events,ey):"bad source";if(e.kind==="controls")return ve(e.source)?Ml(e.events,ru):"bad source";if(e.kind==="off")return ve(e.source)?["stop","removed","off","restart"].includes(e.reason)?e.atBeat!==void 0&&!fe(e.atBeat)?"bad atBeat":null:"bad reason":"bad source";if(e.kind==="release"){if(!ve(e.source))return"bad source";if(!Array.isArray(e.ids))return"ids must be a list";if(e.ids.length>$l)return`more than ${$l} ids`;for(let t=0;t<e.ids.length;t++)if(!ve(e.ids[t]))return`id ${t}: bad id`;return null}if(e.kind==="routes"){if(!Array.isArray(e.routes)||e.routes.length>64)return"routes must be a list (at most 64)";for(const t of e.routes){if(!Jn(t)||!ve(t.source)||typeof t.name!="string"||t.name.length>nu)return"bad route";if(!Gb.includes(t.role))return"bad route role";if(t.octave!==void 0&&!(Number.isInteger(t.octave)&&t.octave>=-1&&t.octave<=9))return"bad route octave";if(t.transpose!==void 0&&!(Number.isInteger(t.transpose)&&Math.abs(t.transpose)<=Xb))return"bad route transpose";if(t.layer!==void 0&&typeof t.layer!="boolean")return"bad route layer"}return null}return"unknown kind"}const Ll=e=>({id:e.id,source:e.source,note:e.note,velocity:e.velocity,startBeat:e.startBeat,lengthBeats:e.lengthBeats,role:e.role,offsetSec:e.offsetSec,spanBeats:e.spanBeats,gate:e.gate,hit:e.hit,root:e.root,...e.slice===void 0?{}:{slice:e.slice}}),su=e=>e.type==="slot"?{type:"slot",id:e.id,beat:e.beat,slot:e.slot}:e.type==="take"?{type:"take",id:e.id,beat:e.beat,take:e.take,lengthBeats:e.lengthBeats,...e.gain===void 0?{}:{gain:e.gain},...e.offsetBeats===void 0?{}:{offsetBeats:e.offsetBeats},...e.peaks===void 0?{}:{peaks:[...e.peaks]}}:e.type==="lap"?{type:"lap",id:e.id,beat:e.beat,lengthBeats:e.lengthBeats}:{type:"chordPad",id:e.id,beat:e.beat,pad:e.pad},ny=e=>e.type!=="note"?su(e):{type:"note",id:e.id,beat:e.beat,on:e.on,note:e.note,...e.on?{velocity:e.velocity}:{},...e.on&&e.slice!==void 0?{slice:e.slice}:{},...e.on&&e.name!==void 0?{name:e.name}:{}};function iu(e){if(ty(e))return null;const t=e;return t.kind==="notes"?{v:_e,kind:"notes",source:t.source,events:t.events.map(Ll)}:t.kind==="audition"?{v:_e,kind:"audition",source:t.source,events:t.events.map(Ll),holdSec:t.holdSec}:t.kind==="played"?{v:_e,kind:"played",source:t.source,events:t.events.map(ny)}:t.kind==="controls"?{v:_e,kind:"controls",source:t.source,events:t.events.map(su)}:t.kind==="off"?{v:_e,kind:"off",source:t.source,reason:t.reason,...t.atBeat===void 0?{}:{atBeat:t.atBeat}}:t.kind==="release"?{v:_e,kind:"release",source:t.source,ids:[...t.ids]}:{v:_e,kind:"routes",routes:t.routes.map(n=>({source:n.source,name:n.name,role:n.role,...n.octave===void 0?{}:{octave:n.octave},...n.transpose===void 0?{}:{transpose:n.transpose},...n.layer===void 0?{}:{layer:n.layer}}))}}const ay=e=>({v:_e,kind:"routes",routes:e});class oy{track=new Ko;run=null;current=[];serial=0;stats={accepted:0,ignored:0,invalid:0};get routes(){return this.current}get route(){return this.current[0]??null}get active(){return this.current.length>0}get version(){return this.serial}receive(t){const n=iu(t);if(!n)return this.stats.invalid++,null;if(n.kind==="routes"){const r=this.route?.source??null;return this.current=n.routes,(this.route?.source??null)!==r&&this.reset(),n}const a=this.route?.source;if(n.source!==a)return this.stats.ignored++,n;if(n.kind==="off")return n.reason==="stop"&&n.atBeat===void 0||(n.reason==="restart"&&n.atBeat!==void 0?this.track.cut(n.atBeat):n.atBeat!==void 0?this.track.off(n.atBeat):this.track.off(),this.serial++),n;if(n.kind==="played"||n.kind==="controls"||n.kind==="release")return this.stats.ignored++,n;let o=!1;for(const r of n.events){const i=Jb(r.id);if(i!==null&&this.run!==null&&i<this.run){this.stats.ignored++;continue}i!==null&&(this.run===null||i>this.run)&&(this.track=new Ko,this.run=i),this.track.add([r]),this.stats.accepted++,o=!0}return o&&this.serial++,n}rootAt(t){return this.active?this.track.chordAt(t)?.root??null:null}points(t=Number.NEGATIVE_INFINITY){return this.active?this.track.points(t):[]}prune(t){this.track.prune(t)}reset(){this.track=new Ko,this.run=null,this.serial++}}const ry=e=>e.offsetDb?10**(e.offsetDb/20):1,Hr=.25;function Ds(e){return e.slices?e.cuts.length===e.slices-1?[0,...e.cuts,1]:Array.from({length:e.slices+1},(t,n)=>n/e.slices):[0,1]}function Bs(e,t,n){const a=e.start*t.frames,o=e.end*t.frames;if(n===null||!e.slices)return[Math.floor(a),Math.ceil(o)];const r=Ds(e),i=Math.min(n,r.length-2);return[Math.floor(a+r[i]*(o-a)),Math.ceil(a+r[i+1]*(o-a))]}function no(e,t,n,a=0){let r=2**((e.tune+e.fine/100+a)/12);if(e.fit){const i=(e.end-e.start)*t.frames/t.sampleRate,l=e.fit*4*(60/n);i>0&&l>0&&(r*=i/l)}return r}function lu(e,t,n){return Math.max(1,Math.round(e*4*60/Math.max(1,t)*n))}function Os(e,t,n){if(!e.fit)return 1;const a=(e.end-e.start)*t.frames/t.sampleRate;return a>0?a/(e.fit*4*(60/Math.max(1,n))):1}const wn=[.75,1.5];function sy(e,t,n){if(n===null||!e.slices)return[0,t];const a=Ds(e),o=Math.min(n,a.length-2);return[Math.floor((a[o]??0)*t),Math.ceil((a[o+1]??1)*t)]}const iy=1.5;function xo(e,t,n,a,o,r=!1,i){if(!n.on||!e.sample||!a)return null;const l=n.slice??(e.slices?t%e.slices:null),c=m=>i?sy(e,i.frames,m):Bs(e,a,m);let[d,u]=c(l);const p=n.reverse?e.dir==="rev"?"fwd":"rev":e.dir;if(e.mode==="oneshot"&&l!==null&&e.slices&&!r){const[m,g]=c(null);p==="fwd"?u=g:p==="rev"&&(d=m)}const h=i?2**(n.pitch/12)*(i.frames/lu(e.fit,o,a.sampleRate)):no(e,a,o,n.pitch);return{sample:i?i.sample:e.sample,from:d,to:u,rate:h,trim:pb(e)*ry(e),gain:Math.min(1.5,n.velocity*(n.accent?iy:1))*wb(e.levelDb),pan:e.pan,mode:e.mode,dir:p,attack:e.attack,decay:e.decay,cutoff:e.cutoff,resonance:e.resonance,choke:e.choke,chance:n.chance,cond:n.cond,fit:e.fit>0,...!r&&Kn(e)?{follow:e.note}:{},...ly(e,a,i,h)??{},...!r&&e.retrigger==="finish"?{finish:!0}:{}}}function ly(e,t,n,a){if(!Ct(e)||n||e.length==="free"&&Ka(e.mod))return null;const[o,r]=Bs(e,t,null);return{region:{start:o,end:r,frames:t.frames,sampleRate:t.sampleRate,rate:a,grid:e.length,mod:Ka(e.mod)?null:e.mod}}}function Ct(e){return!e.slices&&!e.fit}function cu(e,t,n,a=null,o){return xo(e,0,{on:!0,accent:!1,velocity:.8,chance:1,slice:a,pitch:0,reverse:!1,cond:"always"},t,n,!0,o)}function cy(e,t,n,a,o=null,r){return xo(e,0,{on:!0,accent:!1,velocity:Math.min(1,Math.max(0,a)),chance:1,slice:o,pitch:0,reverse:!1,cond:"always"},t,n,!0,r)}function dy(e,t,n,a=()=>{}){const o=e.lanes.some(r=>r.solo);return{swing:e.swing,lanes:e.lanes.map((r,i)=>{const l=e.pads[i],c=l?.sample?t(l.sample):void 0,d=l?a(i):void 0;return{length:r.length,audible:o?r.solo:!r.mute,steps:r.steps.map((u,p)=>l?xo(l,p,u,c,n,!1,d):null)}})}}const Rs=4,uy=.03,py=new Set(["oneshot","oneshots","shot","shots","hit","hits","stab","stabs","single"]),hy=new Set(["loop","loops","break","breaks","breakbeat","groove","grooves","beat","riff"]);function du(e){return e.replace(/^.*[\\/]/,"").replace(/\.[a-z0-9]{2,4}$/i,"").split(/[\s_\-.()[\],+&]+/).filter(Boolean)}function uu(e){const t=du(e);for(let n=0;n<t.length;n++){const a=t[n]??"",o=/^(\d{2,3})bpm$/i.exec(a)??/^bpm(\d{2,3})$/i.exec(a);if(o&&Xa(Number(o[1])))return Number(o[1]);if(/^\d{2,3}$/.test(a)&&/^bpm$/i.test(t[n+1]??"")&&Xa(Number(a)))return Number(a)}for(const n of t)if(/^[1-9]\d{1,2}$/.test(n)&&Number(n)>=50&&Number(n)<=200)return Number(n);return 0}function Is(e){const t=du(e).map(o=>o.toLowerCase());if(t.some((o,r)=>py.has(o)||o==="one"&&/^shots?$/.test(t[r+1]??"")))return{kind:"one-shot",bpm:0};const a=uu(e);return a?{kind:"loop",bpm:a}:{kind:t.some(o=>hy.has(o))?"loop":"",bpm:0}}function pu(e,t,n=Rs,a=Qd){if(!(e>0)||!Xa(t)||!(n>0))return 0;const o=e*t/60/n,r=Math.round(o);return r<1||Math.abs(o-r)>uy*r?0:a.includes(r)?r:0}function fy(e,t,n,a=Rs){if(t.kind!=="loop")return null;const o=pu(e,t.bpm,a);if(!o)return null;const r=e/(o*a*(60/Math.max(1,n))),i=Number(r.toFixed(2));return{bars:o,bpm:t.bpm,speed:r,far:i<wn[0]||i>wn[1]}}function my(e){const t=Number.isInteger(e.bpm)?String(e.bpm):e.bpm.toFixed(1);return`Fitted: ${e.bars} bar${e.bars===1?"":"s"}, ${t} BPM`}function Tl(e){return e.far?`×${e.speed.toFixed(2)} may smear`:""}const hu="nyx.autofit.v1",fu=()=>{try{return globalThis.localStorage??null}catch{return null}};function gy(e=fu()){try{return e?.getItem(hu)!=="off"}catch{return!0}}function by(e,t=fu()){try{t?.setItem(hu,e?"on":"off")}catch{}}function mu(e,t){return!!(e&&t.sample===e.sample&&t.fit===e.fit.bars)}function yy(e,t){t.fit=e.before.fit,t.keepPitch=e.before.keepPitch}const Cl={"page:title":"NYX, the NetComposer sampler. The number is which copy of NYX this is.","page:master":"The volume of everything NYX plays, after the Hacks.","page:save":"Downloads the pattern as a file: pads, steps, Hacks and the ten slots. The samples stay in this browser.","page:load":"Opens a saved pattern file (with its slots, if it has them), or puts an audio file onto the selected pad.","page:panic":"Silences every voice and effect tail at once. NYX then sits out until you press Play.","module:transport":"Play and stop NYX, set the tempo and swing, and keep up to ten saved versions of the whole kit and pattern. Folded, the header's play icon does the same as Play.","module:pattern":"The 16-step grid, one lane per pad: a step that is on plays that lane's pad. The pads under the grid are the sounds.","module:params":"Everything about the selected pad: which part of the sample plays, its pitch, shape, filter and level. A selected step's locks show here too.","module:hacks":"Effects on everything NYX plays, in order: Filter, then Drive, then Compressor. They are saved with the pattern and its slots.","section:pads":"The 16 sounds: Q W E R A S D F play 1–8, Shift 9–16. Tap to play, double-click a name to rename; long-press or right-click to load or remove; Delete removes; drag to swap.",play:"Starts and stops NYX, including the play icon on the folded Transport header. In the Studio, Stop sits NYX out while the others play on, and Play brings it back on the next bar.","perform-label":"Effects you play live: hold a button down and NYX's sound changes until you let go. Nothing is saved.",perform:"Hold one of these down to change NYX's sound until you let go.",tempo:"Beats per minute: how fast the pattern plays. In the Studio every instrument shares this clock.",swing:"Pushes every second sixteenth note later for a looser, shuffled feel. 50% is straight.",status:"What NYX is doing now: stopped, playing, sitting out, or waiting to join on the next bar.","kit:slot":"A memory for the whole kit and pattern. Tap to recall it; Shift-click or long-press to store here, Option-click to clear.","kit:note":"Step tool: a tap on a step turns it on or off.","kit:accent":"Step tool: a tap on a step makes it an accent, played louder. Shift-click accents a step with either tool.","kit:fill":"Hold for a fill: steps set to play Only in Fill come in and Not in Fill steps drop out, until you let go.","kit:clear":"Turns every step off and resets lane lengths, mutes, solos and step locks; the pads keep their sounds. Undo brings it back.","kit:mute":"Mute: silences this lane. Its steps stay as they are.","kit:solo":"Solo: hear only the soloed lanes. Solo several to hear them together.","kit:length":"Drag to set how many steps this lane plays before it starts over. Lanes of different lengths drift against each other.","kit:lane-length":"Tap to set this lane's length, then tap the step it should end on.","kit:pad-key":"The key that plays this pad: lower case (q to f) is the key alone, upper case (Q to F) is Shift with it. A Gate pad holds while its key is down.","kit:pad-playing":"Playing: tap this pad, or press its key, to stop it. A sound under a second plays again instead, so drums stay playable.","kit:choke-badge":"Choke group: pads showing the same letter cut each other off, like an open and a closed hi-hat. Set it under Choke.",wave:"The selected pad's sample: the part between Start and End is what plays, lines mark the slices, and a cursor follows playback. Click it to edit the region large.",sample:"How much of the sample plays (between Start and End) out of its full length, and whether it is mono or stereo.",mode:"How the pad plays when hit: right through (One-shot), only as long as its step (Gate), or round and round (Loop).",dir:"Which way the pad plays through its sample: forwards, backwards, or forwards then back.",start:"Where the pad starts playing in the sample. Move it right to skip the beginning.",end:"Where the pad stops playing in the sample. Move it left to cut off the tail.",slices:"Cuts the played part into 2 to 16 pieces; each step plays the next piece in turn. Off plays the whole part every time.",chop:"Where the slices are cut: at equal spacing, or where the hits in the sound start.","chop-to-pads":"Cuts this pad's sound into up to 16 slices, one per pad, to play by hand or rearrange in the pattern.","chop:wave":"The slices and the pad each lands on. Tap a slice to hear it.",retrigger:"When the lane hits the pad again: Cut starts it again each time; Let it finish lets it play to its end first.","region:start":"Where the pad starts playing. Drag it (← → nudge it); with a length on the grid, End follows it.","region:end":"Where the pad stops. On the grid, drag it to the nearest note value or bar; on Free, anywhere.","region:overview":"The whole sample. The blue frame is what the stage shows: drag it, or tap to look there.","region:length":"How long the pad plays from Start: Free (where End is), or a note value or bars at the tempo, so End follows Start.","region:retrigger":"Cut: each of the lane's hits starts the sound again. Let it finish: hits while it still plays are skipped (a tap or a key always starts it).","region:start-mod":"What moves Start while you play, and how far either way. The move lands on the next hit, never in a sound already playing.","region:length-mod":"What moves the length on the grid while you play, and by how many steps. Shake makes it one step shorter per shake.","region:lfo":"NYX's own LFO for this pad: how long one cycle takes on the Studio's beat, and its shape.","region:start-source":"Nothing, NYX's LFO, or one of ARIA's signals (your phone's tilt, heading or shake; the ground's energy).","region:length-source":"Nothing, NYX's LFO, or one of ARIA's signals. ARIA's need an ARIA in this Studio.","region:reset":"Puts Start and End back to the whole sample, the length to Free, and nothing moving.","region:audition":"Plays the pad as a tap does; while it plays, stops it.","chop:close":"Closes Chop to pads without changing any pad.","chop:mode":"How the sound is cut: where its hits start, into equal parts, or on the beat.","chop:mode:transients":"Cuts where each hit starts, so a slice is one hit (a drum, a note, a word).","chop:mode:even":"Cuts into equal parts: 16, 8 or 4.","chop:mode:beats":"Cuts on the beat at the sound's tempo: every beat, eighth or sixteenth.","chop:sensitivity":"Higher finds quieter hits; lower keeps only the strongest.","chop:count":"The most slices to make (Even: exactly this many). Never more than the pads left from Fill from.","chop:every":"Beats: a slice every beat, eighth or sixteenth at the sound's tempo. Choices past 16 slices are off.","chop:first":"The pad the first slice goes on; the rest follow, up to pad 16.","chop:play-back":"Writes steps that play the slices in order, so the pattern sounds like the original. On when the tempo is known.","chop:more":"The tempo used, Choke and Snap to hits.","chop:tempo":"The sound's tempo: from its Fit, its name, a take, or the Studio's when the length fits; else a guess.","chop:choke":"On, the slices cut each other: a new slice stops the last one.","chop:snap":"Even and Beats: moves each cut to a hit that starts within 20 ms, so an early hit isn't split.","chop:go":"Puts the slices on the pads. Pads with sounds are replaced; Undo puts them back.","library:chop":"Loads this loop onto the selected pad and opens Chop to pads on it.","tune-shape":"Pitch, speed and shape of the selected pad. Closed, it lists what differs from a new pad; NYX remembers in this browser whether it's open.","transport-more":"On a phone, Swing folds away; the line shows it. Tap to show or hide it.","pad-more":"On a phone, the pad's pan, choke group and Clear pad fold away; the line shows pan and choke. Tap to show or hide them.","hacks-more":"On a phone, Drive and Compressor fold away under the Filter; the line says which are on. Tap to show them.","kit:group-toggle":"Opens or closes this section.","pitch-label":"How high or low the pad plays. Pitch changes speed too, like a record, unless Fit's Keep pitch is on.",tune:"Pitch in semitones, up to two octaves either way. Higher also plays faster, unless the pad is fitted with Keep pitch on.",fine:"Fine pitch in cents (hundredths of a semitone), for small corrections.",fit:"Makes the pad last exactly this many bars at the current tempo, and keeps it in time when the tempo changes. Off plays it as recorded.","keep-pitch":"On, Fit stretches the pad to its bars without changing its pitch, and Tune moves the pitch only. Off, it speeds up or slows down like a record.","fit-speed":"How fast the pad plays to fit its bars: ×1 is as recorded. With Keep pitch, stretching far past ×0.75 to ×1.5 may smear the sound.","auto-fit":"On, a loop that arrives with its tempo (picker, My samples, or a name like Loop_100_Am) is fitted to its bars with Keep pitch. One-shots never are.","auto-fit-note":"This loop came with its tempo, so NYX set Fit to its bars with Keep pitch on. It plays in time at any tempo.","auto-fit-far":"Keep pitch is stretching this loop past ×0.75 to ×1.5, where it may smear. Fit it to other bars, or turn Keep pitch off.","auto-fit-undo":"Turns this pad's automatic Fit off again: the loop plays as recorded. The sound stays.","shape-label":"How each hit's volume moves over time: how it fades in and how it dies away.",attack:"How long each hit takes to fade in. Zero is instant; more softens the start.",decay:"How quickly each hit fades away (in Gate, once its step ends). All the way up is Hold: no fade.",cutoff:"Left of centre cuts the highs (darker), right of centre cuts the lows (thinner). Centre leaves the pad open.",resonance:"Boosts the sound right at the filter's edge for a sharper, ringing tone. It does nothing while the filter is open.","out-label":"Where the pad sits in the mix: how loud, how far left or right, and which pads cut it off.",level:"How loud this pad plays, in dB. 0 dB is the Studio's house level; double-click to go back to it.",normalize:"On, the pad plays at the Library's level, so a quiet file fits the kit; Level still sets how loud. Off, it plays as recorded.","normalize-label":"Plays the pad at the Library's level, so a quiet file fits the kit. Grabs and Takes are at mix level already.","normalize-gain":"What Normalize adds to this pad: the gain that brings your audio to the Library's level, never a peak past −1 dBFS.",pan:"Places the pad left or right in the stereo picture. C is the centre.",choke:"Pads in the same group cut each other off when one plays, like open and closed hi-hats. None lets it ring over the others.","clear-pad":"Removes this pad's sample and settings at once; its steps stay. Undo brings it back.","lock-label":"Locks for this one step: settings here change only this step, not the whole pad. Long-press another step to edit it.","lock-velocity":"How loud this step plays, before any accent.","lock-chance":"The odds this step plays each time round. At 100% it always plays; lower leaves it out at random.","lock-slice":"Which slice this step plays. In order plays the slice that matches the step's place, so a chopped beat plays back as it was.","lock-pitch":"Moves this step up or down in semitones, on top of the pad's own Tune.","lock-cond":"When this step plays: always, only on some passes through the lane, only with Fill held or not, or only if the lane's last conditional step did or didn't.","lock-reverse":"Whether this step plays the pad's own way or the other way round.","lock-done":"Closes this step's locks and goes back to the pad's settings.","notes-label":"CALLIOPE plays this NYX: your pattern keeps its hits, and pads that follow take its chord's root.","pad-follow":"On: this pad's hits play at the root of CALLIOPE's chord. Off: its own pitch, as drums want.","pad-note":"The note this sample plays at as recorded. NYX tunes from it to CALLIOPE's root, never more than six semitones away.","notes-open":"Shows CALLIOPE, the Studio's note generator that tunes this NYX's pads now.","notes-mine":"Take the pitch back: CALLIOPE stops playing this NYX, and every pad plays its own pitch again.","grab-label":"Brings sound from the Studio onto the selected pad: Grab the bars that just played, or Take a performance as it happens.","grab-from":"Which Studio sound to grab or take from: the master mix or one instrument's channel.","grab-bars":"How many bars Grab takes. One bar is cut into 16 slices with every step on; longer grabs are sliced at the hits.",grab:"Copies the bars that just played onto the selected pad, cut on the bar lines (the music must be playing). It asks before replacing a pad that has a sound.","grab-undo":"Puts back what this Grab, Take, sent take, Library Load or Build kit replaced: old sounds, slices and steps. Cmd/Ctrl+Z does the same.",library:"Opens the Library: openly licensed sounds checked by a person, found by plain words. Load fills the selected pad; Build kit fills pads 1–8.",rights:"A recording of a tab's or another app's sound (LUCY's Computer audio): nobody here knows who owns it. Fine to play with; check the licence before you release anything with it.",credit:"Who made this pad's sound, and its licence. Library › Credits has the full credit with links, and saved patterns keep it.","library:ask":"Plain words: a role (kick, snare, hat, clap, tom, perc, cymbal, fx) and a sound (punchy, tight, dark, bright, long, soft). Add kit for a whole kit.","library:close":"Closes the Library. Esc in the field does the same.","library:play":"Plays this sound through NYX's output, at the level it will have on a pad. Press again to stop.","library:load":"Puts this sound on the selected pad, named after it and with its credit; the steps stay. Undo brings the old sound back.","library:kit":"Fills pads 1–8 with a kit for your words (kick, snare, clap, hats, tom, perc, fx); the pattern stays and the hats cut each other. One Undo puts all eight back.","library:credits":"Every Library sound on the pads: who made it, its licence and its source. Saved patterns, slots and Studio Scenes keep these credits.","library:badge":"The licence. CC0 needs no credit (NYX credits it anyway); BY needs credit, and BY-SA credit plus the same licence on what you make.","library:wave":"The sound's shape, start to end: a tall start is a sharp hit, a long tail rings on.","library:source-shelf":"The curated shelf on musicmatter.art: openly licensed sounds, each checked by a person.","library:source-local":"My samples: your local Library, the folder the sample picker exported. Its sounds play in this browser and are never uploaded.","library:source-all":"Searches musicmatter.art and My samples (your local Library) together.","library:open-folder":"Opens a local Library folder (the sample picker's export) from this computer. NYX only reads it; nothing is uploaded.","library:reconnect":"Your local Library folder, remembered from last time: the browser asks once more before NYX can read it.","library:forget":"Closes your local Library and forgets the folder. The files stay where they are; pads keep their sounds.",take:"Records the chosen source onto the selected pad in whole bars until you press again (up to four minutes); takes of up to 8 bars loop. It asks first if the pad has a sound.","hack-filter":"A filter on all of NYX, to darken it, thin it or narrow it down. The switch turns it on.","filter-mode":"Which part the filter keeps: the lows (low pass), the highs (high pass) or a band in the middle (band pass).","filter-cutoff":"Where the filter cuts. In low pass, all the way up is open: no filtering.","filter-resonance":"Boosts the sound around the cutoff for a sharper, more nasal tone.","filter-curve":"A picture of the filter: how loud each pitch range comes out, lows on the left, highs on the right.","hack-meter":"The level going into this Hack (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. Off, it still shows the input, greyed.","hack-drive":"Distortion on all of NYX, from warm to gritty. The switch turns it on.","hack-drive-drive_db":"How hard the sound is pushed into distortion. 0 dB is clean.","hack-drive-output_db":"The level after the drive, to balance out the louder distorted sound.","hack-drive-mix":"How much of the driven sound is mixed with the clean one. 100% is all drive.","hack-drive-curve":"The kind of distortion: Smooth is warm and round, Acid is harder and buzzier.","hack-drive-tone":"Darkens the driven sound by cutting its highs. All the way up leaves it bright.","hack-compressor":"Evens out NYX's level: loud hits are turned down, so the whole sounds tighter and punchier. The switch turns it on.","hack-compressor-threshold_db":"The level above which the compressor starts turning the sound down. Lower catches more.","hack-compressor-ratio":"How strongly sound above the threshold is turned down. Higher is a firmer squeeze.","hack-compressor-attack_ms":"How fast the compressor reacts to a loud hit. Slower lets the start of each hit punch through.","hack-compressor-release_ms":"How fast the compressor lets go once the sound drops back below the threshold.","hack-compressor-makeup_db":"Turns the whole sound back up after compressing, to make up for the lost level.","kit:more":"More settings for this effect."},wy={perform:{repeat16:"While held, repeats the last sixteenth note over and over, like a stutter.",repeat8:"While held, repeats the last eighth note over and over.",reverse:"While held, plays what NYX just played backwards.",half:"While held, plays on at half speed, an octave lower.",stop:"While held, slows to a halt like a tape machine switched off."},mode:{oneshot:"One-shot: plays on from the hit until it ends or the lane's next hit cuts it. Good for drums.",gate:"Gate: plays only as long as its step (or its key is held), then fades by Decay. Good for chopping long sounds.",loop:"Loop: plays round and round until the pad plays again or the music stops."},dir:{fwd:"Plays the sample the normal way, start to end.",rev:"Plays the sample backwards, end to start.",pingpong:"Plays forwards, then back again. In Loop it keeps bouncing."},retrigger:{cut:"Cut: each of the lane's hits starts the sound again.",finish:"Let it finish: the lane's hits wait while the sound still plays (they show striped). A tap or a key always starts it."},normalize:{on:"Normalize on: the pad plays at the Library's level.",off:"Normalize off: the pad plays as recorded."},"keep-pitch":{on:"Keep pitch: the pad is stretched to its bars and stays at its pitch, whatever the tempo. Tune moves the pitch only.",off:"Varispeed: the pad speeds up or slows down to fit its bars, and its pitch moves with it, like a record."},"auto-fit":{on:"Auto-fit on: loops with a known tempo land fitted to their bars, Keep pitch on.",off:"Auto-fit off: loops land as recorded; set Fit yourself."},chop:{even:"Cuts the slices at equal spacing.",transients:"Cuts the slices where the hits in the sound start, so each slice is one hit."},"lock-reverse":{pad:"This step plays in the pad's own direction.",rev:"This step plays the other way round from the pad."}};function I(e){return Object.hasOwn(Cl,e)?Cl[e]:void 0}function vy(e,t){const n=wy[e];return(n&&Object.hasOwn(n,t)?n[t]:void 0)??I(e)}const Wn="nyx-help-text",Nl=new Map;function xy(e,t){const n=Nl.get(t);if(n&&e.getElementById(n))return n;let a=e.getElementById(Wn);a||(a=e.createElement("div"),a.id=Wn,a.hidden=!0,e.body.append(a));const o=e.createElement("span");return o.id=`${Wn}-${a.children.length+1}`,o.textContent=t,a.append(o),Nl.set(t,o.id),o.id}function U(e,t,n){if(!e||!t||(e.getAttribute("data-nc-help")!==t&&e.setAttribute("data-nc-help",t),e.hasAttribute("title")&&e.removeAttribute("title"),!n))return;const a=xy(n.ownerDocument,t),o=(n.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);if(o.includes(a))return;const r=[...o.filter(i=>!i.startsWith(`${Wn}-`)),a];n.setAttribute("aria-describedby",r.join(" "))}function ky(e,t=e){if(e?.removeAttribute("data-nc-help"),!t)return;const n=(t.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean),a=n.filter(o=>!o.startsWith(`${Wn}-`));a.length!==n.length&&(a.length?t.setAttribute("aria-describedby",a.join(" ")):t.removeAttribute("aria-describedby"))}function $y(e){const t=I(e);return t?{"data-nc-help":t}:{}}const Sy=[['.nc-seg [role="radio"]:not([data-nc-accent-mode])',"kit:note"],['.nc-seg [role="radio"][data-nc-accent-mode]',"kit:accent"],["[data-nc-fill]:not([data-nc-clear])","kit:fill"],["[data-nc-clear]","kit:clear"],['.nc-ms[data-nc-ms="mute"]',"kit:mute"],['.nc-ms[data-nc-ms="solo"]',"kit:solo"],[".nc-len-handle","kit:length"],["[data-nc-len-toggle]","kit:lane-length"],["[data-nc-pads-play]","play"],[".nc-snap","kit:slot"]];function qs(e){for(const t of e.querySelectorAll(".nc-module[data-nc-module]"))U(t.querySelector(".nc-module-hd .nc-title"),I(`module:${t.dataset.ncModule}`));for(const t of e.querySelectorAll("[data-nc-section]"))U(t.querySelector(":scope > .nc-ui-fx-name, :scope > .nc-panel-hd > .nc-panel-title"),I(`section:${t.dataset.ncSection}`));for(const t of e.querySelectorAll("[data-nc-id]")){const n=t.dataset.ncId??"";if(!t.matches("input, select, canvas"))if(t.classList.contains("nc-field")){const a=t.querySelector(":scope > input, :scope > select, :scope > canvas");U(t.querySelector(":scope > .nc-label"),I(n),a)}else if(t.classList.contains("nc-choice-row"))for(const a of t.querySelectorAll("[data-nc-choice]"))U(a,vy(n,a.dataset.ncChoice??""),a);else t.classList.contains("nc-btn")?U(t,I(n),t):t.matches(".nc-label[data-nc-text]")?U(t,I(n)):t.classList.contains("nc-ui-fx")&&(U(t.querySelector(":scope > .nc-ui-fx-hd > .nc-ui-fx-name, :scope > .nc-ui-fx-name"),I(n),t.querySelector("[data-nc-fx-switch]")),U(t.querySelector(":scope > .nc-ui-more > summary"),I("kit:more")))}for(const[t,n]of Sy)for(const a of e.querySelectorAll(t)){const o=a.parentElement?.querySelector(":scope > .nc-hit")?a.parentElement:null;o&&a.removeAttribute("title"),U(o??a,I(n),a)}for(const t of e.querySelectorAll(".nc-group[data-nc-id]")){const n=t.querySelector(":scope > .nc-group-toggle");U(n?.querySelector(".nc-group-title")??null,I(t.dataset.ncId??""),n),U(n?.querySelector(".nc-group-mark")??null,I("kit:group-toggle"))}for(const t of e.querySelectorAll(".nc-padgrid-pad-badge"))t.textContent?U(t,I("kit:choke-badge")):t.removeAttribute("data-nc-help")}function Ay(e){return e.embedded&&e.running?e.sittingOut?{action:"rejoin"}:{action:"sit-out",outId:e.instanceId}:e.running?{action:"stop"}:{action:"start",claimId:e.embedded?e.instanceId:null}}function _s(e){return e?"Stop":"Play"}const Fl="http://www.w3.org/2000/svg";function Pl(e,t){const n=document.createElementNS(Fl,"svg");n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nyx-fold-play-icon"),n.dataset.nyxIcon=e;const a=document.createElementNS(Fl,"path");return a.setAttribute("fill","currentColor"),a.setAttribute("d",t),n.append(a),n}function Ey(e,t){const n=document.createElement("button");n.type="button",n.className="nyx-fold-play",n.dataset.nyxFoldPlay="",n.append(Pl("play","M4.5 2.8 12.8 8 4.5 13.2Z"),Pl("stop","M4.2 4.2h7.6v7.6H4.2Z")),t.description&&(U(n,t.description,n),n.removeAttribute("data-nc-help")),n.addEventListener("click",l=>{l.stopPropagation(),t.onPress()});const a=e.querySelector(".nc-module-end"),o=a?.querySelector(".nc-hide");a&&o?a.insertBefore(n,o):(e.querySelector(".nc-module-hd")??e).append(n);const r=()=>{const l=t.playing(),c=_s(l);n.setAttribute("aria-label",c),n.title=c,n.setAttribute("aria-pressed",l?"true":"false"),n.dataset.on=l?"true":"false",n.querySelector('[data-nyx-icon="play"]')?.toggleAttribute("hidden",l),n.querySelector('[data-nyx-icon="stop"]')?.toggleAttribute("hidden",!l);const d=e.hasAttribute("data-nc-slim");n.hidden=!d,d?n.removeAttribute("aria-hidden"):n.setAttribute("aria-hidden","true")},i=new MutationObserver(()=>r());return i.observe(e,{attributes:!0,attributeFilter:["data-nc-slim"]}),r(),{button:n,sync:r,destroy(){i.disconnect(),n.remove()}}}const Je=e=>`${Math.round(e*100)}%`,dt=e=>e<1?`${Math.round(e*1e3)} ms`:`${e.toFixed(2)} s`,jr=e=>e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`,Zn=(e,t="")=>`${e>0?"+":""}${e}${t}`,My=e=>`×${Number(e.toFixed(2))}`;function Fa(e){return Math.abs(e)<.001?"open":e<0?`LP ${jr(2e4*(60/2e4)**-e)}`:`HP ${jr(20*(8e3/20)**e)}`}const Pa=e=>e>=3.99?"Hold":dt(e);function Ly(e){const t=Xe(0),n=[];return e.tune!==t.tune&&n.push(Zn(e.tune," st")),e.fine!==t.fine&&n.push(Zn(e.fine," ct")),e.fit!==t.fit&&n.push(`fit ${e.fit} bar${e.fit===1?"":"s"}`),e.fit&&e.keepPitch!==t.keepPitch&&n.push("varispeed"),Math.abs(e.attack-t.attack)>=5e-4&&n.push(`attack ${dt(e.attack)}`),Pa(e.decay)!==Pa(t.decay)&&n.push(`decay ${Pa(e.decay)}`),Fa(e.cutoff)!==Fa(t.cutoff)&&n.push(`filter ${Fa(e.cutoff)}`),Je(e.resonance)!==Je(t.resonance)&&n.push(`res ${Je(e.resonance)}`),n.join(" · ")}function gu(e){const t=Math.max(0,Math.min(1,e));return Math.min(2e4,40*2**(t*10))}const ka=e=>Math.max(0,Math.min(100,e));function Hs(e){const t=gu(e.cutoff),n=ka(Math.max(0,Math.min(1,e.resonance))*100);return e.mode==="hp"?{type:"highpass",dials:{cutoff:t<=20?0:ka(100*Math.log(t/20)/Math.log(100)),q:n}}:e.mode==="bp"?{type:"bandpass",dials:{centre_hz:ka(100*Math.log(Math.max(100,t)/100)/Math.log(80)),q:n,mix:100}}:{type:"lowpass",dials:{cutoff:e.cutoff>=.999?0:ka(100*Math.log(t/2e4)/Math.log(150/2e4))}}}function Ty(e){const{type:t,dials:n}=Hs(e);if(t==="highpass"){const o=n.cutoff??0;return{hz:20*100**(o/100),q:Math.SQRT1_2*(8/Math.SQRT1_2)**((n.q??0)/100),open:o<=0}}if(t==="bandpass")return{hz:100*80**((n.centre_hz??0)/100),q:.4*20**((n.q??0)/100),open:!1};const a=n.cutoff??0;return{hz:2e4*(150/2e4)**(a/100),q:Math.SQRT1_2,open:a<=0}}const bu=e=>!e.on||e.mode==="lp"&&e.cutoff>=.999;function Wr(e){const t=Hs(e.filter);return{v:2,chain:[{id:`${t.type}-1`,type:t.type,bypass:bu(e.filter),dials:t.dials},{id:"drive-1",type:"drive",bypass:!e.drive.on,dials:{...e.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!e.compressor.on,dials:{...e.compressor.dials}}]}}function Cy(e,t){if(!e||e.chain.length!==t.chain.length)return{whole:!0};if(e.chain.some((a,o)=>a.type!==t.chain[o]?.type))return{whole:!0};const n=[];return t.chain.forEach((a,o)=>{const r=e.chain[o];if(r){r.bypass!==a.bypass&&n.push([a.id,"bypass",a.bypass]);for(const[i,l]of Object.entries(a.dials))r.dials[i]!==l&&n.push([a.id,i,l])}}),{whole:!1,params:n}}const dn=["KeyQ","KeyW","KeyE","KeyR","KeyA","KeyS","KeyD","KeyF"],Ny=Array.from({length:Q},(e,t)=>{const n=(dn[t%dn.length]??"").slice(3);return t<dn.length?n.toLowerCase():n.toUpperCase()});function yu(e){const t=dn.indexOf(e.code);if(t<0)return-1;const n=e.shiftKey?t+dn.length:t;return n<Q?n:-1}class Fy{down=new Map;press(t){if(this.down.has(t.code))return-1;const n=yu(t);return n>=0&&this.down.set(t.code,n),n}release(t){const n=this.down.get(t.code);return n===void 0?-1:(this.down.delete(t.code),n)}releaseAll(){const t=[...this.down.values()];return this.down.clear(),t}}const Rn="data-nc-pointer",Py=new Set(["range","button","checkbox","radio","submit","reset","file","color","image"]);function zy(e){const t=e;if(!t||typeof t.closest!="function")return!1;if(t.closest('textarea, [contenteditable]:not([contenteditable="false"])'))return!0;const n=t.closest("input");if(n&&!Py.has(String(n.type??"text").toLowerCase()))return!0;const a=t.closest("select");return!!a&&a.hasAttribute?.(Rn)!==!0}function Dy(e){const t=n=>n?.tagName==="SELECT";e.addEventListener("pointerdown",n=>{t(n.target)&&n.target.setAttribute(Rn,"")},!0),(e.defaultView??window).addEventListener("change",n=>{const a=n.target;t(a)&&a.hasAttribute(Rn)&&e.activeElement===a&&a.blur()}),e.addEventListener("focusout",n=>{t(n.target)&&n.target.removeAttribute(Rn)},!0),e.addEventListener("keydown",n=>{n.code==="Tab"&&t(e.activeElement)&&e.activeElement.removeAttribute(Rn)},!0)}const By="/nyx/assets/limiter-processor-BPr7zuRH.js",Oy=.05,Ry=50,Iy=.8;function qy(e){const t=e.outputLatency;if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t;const n=e.baseLatency;return typeof n=="number"&&Number.isFinite(n)&&n>0?n:0}function _y(e){const t=qy(e.ctx),n=e.frameOrigin+e.eventMs,a=e.transport.beatAt(n/1e3-t);let o=null;try{const c=e.ctx.getOutputTimestamp?.();if(c&&Number.isFinite(c.contextTime)&&Number.isFinite(c.performanceTime)&&(c.contextTime??0)>0){const d=c.contextTime+(n-(e.ctxOrigin+c.performanceTime))/1e3;o=e.transport.beatAt(e.mapper.toSharedTime(d)-t)}}catch{o=null}if(o===null||!Number.isFinite(o))return{beat:a,wallBeat:a,audioBeat:o,fallback:!0};const r=n/1e3,i=Math.abs(e.transport.beatAt(r+1)-e.transport.beatAt(r))||1,l=Math.abs(o-a)/i>Oy;return{beat:l?a:o,wallBeat:a,audioBeat:o,fallback:l}}function Hy(e){const t=e.win.performance;let n=null;const a=p=>{n={stamp:p.timeStamp,seen:t.now()}},o=["keydown","keyup","pointerdown","pointerup","pointercancel","click"];for(const p of o)e.win.addEventListener(p,a,!0);const r=new Map;let i=0;const l={sent:0,fallbacks:0,skipped:0},c=()=>{const p=t.now(),h=n;return h&&p-h.seen<Ry&&h.stamp<=p+1?h.stamp:p},d=p=>{const h=e.transport();if(!h.running){l.skipped++;return}const m=_y({eventMs:c(),frameOrigin:t.timeOrigin,ctxOrigin:e.ctxOrigin,ctx:e.ctx,mapper:e.mapper,transport:h});m.fallback&&l.fallbacks++;try{e.send({v:1,kind:"played",events:[{...p,beat:m.beat}]})&&l.sent++}catch{}},u=p=>{const h=r.get(p);h&&(r.delete(p),d({type:"note",id:h.id,on:!1,note:h.note}))};return{hit(p,h=null){if(!Number.isInteger(p)||p<0||p>15)return;r.has(p)&&u(p);const m=`p|${++i}`,g=Vb(p+1);r.set(p,{id:m,note:g});let v;try{v=e.nameOf?.(p)?.trim().slice(0,_r)||void 0}catch{v=void 0}d({type:"note",id:m,on:!0,note:g,velocity:Iy,...h==null?{}:{slice:h},...v?{name:v}:{}})},release:u,slot(p){!Number.isInteger(p)||p<0||p>9||d({type:"slot",id:`s|${++i}`,slot:p+1})},stats:l,dispose(){for(const p of o)e.win.removeEventListener(p,a,!0);r.clear()}}}function jy(e,t,n,a=2,o=4){const r=n.top+o,l=n.bottom-o-(e.bottom+a),c=e.top-a-r;let d=!1,u=e.bottom+a,p=null;t.h>l&&(t.h<=c?(d=!0,u=e.top-a-t.h):c>l?(d=!0,p=Math.max(0,c),u=e.top-a-p):p=Math.max(0,l));const h=n.right-o-t.w,m=Math.max(n.left+o,Math.min(e.left,h));return{left:Math.round(m),top:Math.round(u),up:d,maxHeight:p}}function Wy(e=document){const t=e.defaultView,n=e.documentElement,a=n.clientWidth||t?.innerWidth||0,o=t?.innerHeight||n.clientHeight||0,r=t?.getComputedStyle(n),i=Number.parseFloat(r?.getPropertyValue("--nc-host-top")??""),l=Number.parseFloat(r?.getPropertyValue("--nc-host-height")??"");return Number.isFinite(i)&&Number.isFinite(l)&&l>0?{top:i,bottom:i+l,left:0,right:a}:{top:0,bottom:o,left:0,right:a}}function Uy(e){let t=null;const n=()=>{try{return window.parent!==window?window.parent:null}catch{return null}},a=()=>{const d=n();t={x:window.scrollX,y:window.scrollY,px:d?.scrollX??0,py:d?.scrollY??0}};e.addEventListener("pointerdown",a,!0),e.addEventListener("contextmenu",a,!0);const o=()=>{if(!t)return;(window.scrollX!==t.x||window.scrollY!==t.y)&&window.scrollTo(t.x,t.y);const d=n();try{d&&(d.scrollX!==t.px||d.scrollY!==t.py)&&d.scrollTo(t.px,t.py)}catch{}t=null},r=d=>{const u=d.parentElement;if(!u)return;const p=u.getBoundingClientRect(),h=[...u.querySelectorAll(".nc-padgrid-pad")],m=Number.parseFloat(d.style.left),g=Number.parseFloat(d.style.top),v=h.find(y=>{const w=y.getBoundingClientRect();return Math.abs(w.left-p.left-m)<1&&Math.abs(w.bottom-p.top-g)<1})??h.find(y=>y.contains(document.activeElement));if(!v)return;d.style.maxHeight="";const f=v.getBoundingClientRect(),b=jy(f,{w:d.offsetWidth,h:d.offsetHeight},Wy());d.style.left=`${b.left-p.left}px`,d.style.top=`${b.top-p.top}px`,b.maxHeight!==null&&(d.style.maxHeight=`${b.maxHeight}px`),d.dataset.nyxUp=String(b.up),o(),d.querySelector("button")?.focus({preventScroll:!0})},i=new WeakSet,l=()=>{for(const d of e.querySelectorAll(".nc-padgrid-pad-menu"))i.has(d)||(i.add(d),r(d))},c=new MutationObserver(l);return c.observe(e,{childList:!0,subtree:!0}),()=>{c.disconnect(),e.removeEventListener("pointerdown",a,!0),e.removeEventListener("contextmenu",a,!0)}}function Yy(e,t){const n=new Map,a={sent:0,duplicates:0,notPads:0,empty:0};return{notes(o,r){const i=[];for(const l of r){if(n.has(l.id)){a.duplicates++;continue}const c=Qb(l.note);if(c===null){a.notPads++;continue}const d=t(c-1,l.slice??null,l.velocity);if(!d){a.empty++;continue}n.set(l.id,{beat:l.startBeat,source:o}),i.push({pad:c-1,hit:d,beat:l.startBeat,source:o,id:l.id})}i.length&&(a.sent+=i.length,e({type:"hits",hits:i}))},off(o,r){for(const[i,l]of n)l.source===o&&(r===void 0||l.beat>=r-1e-9)&&n.delete(i);e(r===void 0?{type:"unhits",source:o}:{type:"unhits",source:o,atBeat:r})},release(o,r){const i=r.filter(l=>l.startsWith(`${o}|`));i.length&&e({type:"unring",ids:i})},prune(o){for(const[r,i]of n)i.beat<o-16&&n.delete(r)},stats:a}}const Xy=1,Gy=3.99,Ky=.25*Math.log(1e3);function Vy(e,t){if(e.mode==="loop")return Number.POSITIVE_INFINITY;if(e.mode==="gate")return 0;const n=Math.abs(e.rate)*Math.max(1,t),a=e.dir==="pingpong"?2:1,o=Math.max(0,e.to-e.from)*a/Math.max(1e-6,n);return e.decay>=Gy?o:Math.min(o,Math.max(.01,e.decay)*Ky)}function Qy(e,t){return Vy(e,t)>=Xy}const Jy=1;class js{reported=new Set;pending=new Map;static SEEN_MS=40;report(t,n){const a=new Set;for(const o of t)(Number(o[4])||0)&Jy&&a.add(Number(o[0]));this.reported=a;for(const[o,r]of this.pending)n-r>=js.SEEN_MS&&this.pending.delete(o)}posted(t,n,a){n?this.pending.set(t,a):(this.pending.delete(t),this.reported.delete(t))}stopped(t){this.pending.delete(t),this.reported.delete(t)}has(t){return this.reported.has(t)||this.pending.has(t)}pads(){return[...new Set([...this.reported,...this.pending.keys()])].sort((t,n)=>t-n)}}function C(e,t={},...n){const a=document.createElement(e);for(const[o,r]of Object.entries(t))a.setAttribute(o,r);return a.append(...n),a}const At=(e,t)=>U(e,I(t),e),Te=(e,t,n)=>e<t?t:e>n?n:e,Zt=e=>`${e.toFixed(3)} s`,zl=e=>`${e>=0?"+":"−"}${Math.abs(e).toFixed(2)} s`,we=[1,2,4,8,16,32,64,128],Zy=e=>`${e%1?e.toFixed(1):e}×`,$a=9;class e0{constructor(t){this.host=t,this.wave=C("canvas",{class:"nyx-rgn-wave","aria-hidden":"true"}),this.live=C("canvas",{class:"nyx-rgn-live","aria-hidden":"true"}),this.labels=C("div",{class:"nyx-rgn-labels","aria-hidden":"true"}),this.startTag=C("button",{type:"button",class:"nyx-rgn-tag","data-nyx-rgn":"start","aria-label":"Start"},"Start"),this.endTag=C("button",{type:"button",class:"nyx-rgn-tag","data-nyx-rgn":"end","aria-label":"End"},"End"),At(this.startTag,"region:start"),At(this.endTag,"region:end");const n=C("span",{class:"nyx-rgn-hint"},"Drag Start or End · ⌥-drag moves the region · pinch or ⌘-scroll to zoom");this.stage=C("div",{class:"nyx-rgn-stage","data-nyx-rgn":"stage",role:"group","aria-label":"Waveform"},this.wave,this.live,this.labels,this.startTag,this.endTag,n),this.over=C("canvas",{class:"nyx-rgn-over","aria-hidden":"true"}),this.frame=C("div",{class:"nyx-rgn-frame","data-nyx-rgn":"frame"});const a=C("div",{class:"nyx-rgn-strip","data-nyx-rgn":"strip"},this.over,this.frame);At(a,"region:overview"),this.zoomRow=C("div",{class:"nyx-rgn-zoom",role:"group","aria-label":"Zoom"}),this.head=C("div",{class:"nyx-rgn-head"}),this.controls=C("div",{class:"nyx-rgn-ctl"}),this.foot=C("div",{class:"nyx-rgn-foot"}),this.dialog=C("div",{class:"nyx-rgn",role:"dialog","aria-modal":"true","aria-label":"Region","data-nyx-rgn":"dialog",tabindex:"-1"},this.head,this.stage,C("div",{class:"nyx-rgn-ov"},a,this.zoomRow),this.controls,this.foot),this.el=C("div",{class:"nyx-rgn-scrim","data-nyx-rgn":"scrim",hidden:""},this.dialog),this.el.addEventListener("pointerdown",o=>{o.target===this.el&&this.host.close()}),this.el.addEventListener("wheel",o=>{if(o.defaultPrevented)return;const r=this.dialog,i=r.contains(o.target),l=o.deltaY<0?r.scrollTop>0:r.scrollTop+r.clientHeight<r.scrollHeight-1;(!i||!l)&&o.preventDefault()},{passive:!1}),this.dialog.addEventListener("keydown",o=>this.key(o)),document.addEventListener("keydown",o=>{!this.isOpen||o.key!=="Escape"||this.dialog.contains(o.target)||(o.preventDefault(),o.stopPropagation(),this.host.close())},!0),this.wireStage(),this.wireStrip(a),this.wireTag(this.startTag,"start"),this.wireTag(this.endTag,"end"),typeof ResizeObserver<"u"&&new ResizeObserver(()=>{this.waveKey="",this.paint()}).observe(this.stage)}el;isOpen=!1;dialog;stage;wave;live;over;frame;startTag;endTag;labels;head;zoomRow;controls;foot;zoom=1;view=0;drag=null;touches=new Map;raf=0;waveKey="";colours=null;lastFocus=null;controlsKey="";open(){if(!this.host.sample())return!1;this.lastFocus=document.activeElement,this.isOpen=!0,this.el.hidden=!1,this.zoom=1,this.view=0,this.waveKey="",this.controlsKey="",this.colours=null,this.refresh(),document.documentElement.dataset.nyxRgnOpen="",this.dialog.focus({preventScroll:!0}),this.intoView();const n=()=>{this.isOpen&&(this.paintLive(),this.raf=requestAnimationFrame(n))};return this.raf=requestAnimationFrame(n),!0}close(){this.isOpen&&(this.isOpen=!1,this.el.hidden=!0,delete document.documentElement.dataset.nyxRgnOpen,cancelAnimationFrame(this.raf),this.lastFocus instanceof HTMLElement&&this.lastFocus.focus())}intoView(){const t=document.documentElement;if(!t.hasAttribute("data-nc-hosted"))return;const n=Number.parseFloat(getComputedStyle(t).getPropertyValue("--nc-host-height"));if(!Number.isFinite(n))return;let a=0;try{a=window.parent?.innerHeight??0}catch{a=0}const o=Number.parseFloat(getComputedStyle(this.el).paddingTop)*2||0,r=Math.min(this.dialog.scrollHeight+o,a||Number.POSITIVE_INFINITY);n+1>=r||t.scrollIntoView({block:"start",behavior:"instant"})}refresh(){if(!this.isOpen)return;const t=this.host.sample();if(!t){this.host.close();return}this.renderHead(t),this.renderZoom();const n=JSON.stringify([t.index,t.pad.length,t.pad.retrigger,t.pad.slices,t.pad.fit,t.pad.mod.startSource,t.pad.mod.lengthSource,t.pad.mod.lengthSteps,t.pad.mod.lfoBars,t.pad.mod.lfoShape,this.host.aria()]);n!==this.controlsKey?(this.controlsKey=n,this.renderControls(t),this.renderFoot()):this.updateReadouts(t),this.paint()}base(t){const n=no(t.pad,{sampleRate:t.sampleRate,frames:t.frames},this.host.bpm()),a=t.pad.start*t.frames;if(t.pad.length==="free"||!Ct(t.pad))return{start:a,end:t.pad.end*t.frames,rate:n,clamped:!1};const o=a+Va(t.pad.length,this.host.bpm(),t.sampleRate,n);return{start:a,end:Math.min(t.frames,o),rate:n,clamped:o>t.frames}}x(t,n){return(t-this.view)*this.zoom*n}f(t,n){return this.view+t/n/this.zoom}setView(t,n=this.zoom){this.zoom=Te(n,1,we[we.length-1]),this.view=Te(t,0,1-1/this.zoom),this.waveKey="";const a=this.zoomRow.contains(document.activeElement);this.renderZoom(),(a||document.activeElement===document.body)&&this.dialog.focus(),this.paint()}zoomAt(t,n){const a=this.stage.clientWidth||1,o=this.f(n,a),r=Te(this.zoom*t,1,we[we.length-1]);this.setView(o-n/a/r,r)}zoomStep(t){const n=we.findIndex(r=>r>=this.zoom-1e-6),a=t>0?we[Math.min(we.length-1,n+(we[n]>this.zoom+1e-6?0:1))]:we[Math.max(0,n-1)],o=this.stage.clientWidth||1;this.zoomAt((a??this.zoom)/this.zoom,o/2)}zoomToRegion(){const t=this.host.sample();if(!t)return;const n=this.base(t),a=n.start/t.frames,o=n.end/t.frames,r=Math.max(.002,o-a)*1.25,i=Te(1/r,1,we[we.length-1]);this.setView((a+o)/2-.5/i,i)}wireStage(){const t=this.stage;t.addEventListener("pointerdown",a=>{if(a.target.closest(".nyx-rgn-tag"))return;const o=this.host.sample();if(!o)return;t.setPointerCapture(a.pointerId),this.touches.set(a.pointerId,a.clientX);const r=t.getBoundingClientRect(),i=r.width||1,l=a.clientX-r.left;if(this.touches.size===2){const[h,m]=[...this.touches.values()];this.drag={kind:"pinch",x0:((h??0)+(m??0))/2-r.left,start0:0,end0:0,view0:this.view,zoom0:this.zoom,dist0:Math.max(10,Math.abs((h??0)-(m??0)))};return}const c=this.base(o),d=this.x(c.start/o.frames,i),u=this.x(c.end/o.frames,i),p={x0:a.clientX,start0:o.pad.start,end0:c.end/o.frames,view0:this.view};a.altKey&&l>d&&l<u?this.drag={kind:"move",...p}:Math.abs(l-d)<=$a?this.drag={kind:"start",...p}:Math.abs(l-u)<=$a?this.drag={kind:"end",...p}:this.drag={kind:"pan",...p},t.dataset.dragging=this.drag.kind}),t.addEventListener("pointermove",a=>{this.touches.has(a.pointerId)&&this.touches.set(a.pointerId,a.clientX);const o=this.drag,r=this.host.sample();if(!o||!r){this.hover(a);return}const i=t.clientWidth||1;if(o.kind==="pinch"){const[c,d]=[...this.touches.values()],u=Math.max(10,Math.abs((c??0)-(d??0))),p=Te((o.zoom0??1)*(u/(o.dist0??u)),1,we[we.length-1]),h=o.view0+o.x0/i/(o.zoom0??1);this.setView(h-o.x0/i/p,p);return}const l=(a.clientX-o.x0)/i/this.zoom;o.kind==="pan"?this.setView(o.view0-l):this.dragRegion(o.kind,o.start0,o.end0,l,r)});const n=a=>{this.touches.delete(a.pointerId),this.drag&&this.drag.kind!=="pan"&&this.drag.kind!=="pinch"&&this.host.audition(),this.drag=null,delete t.dataset.dragging};t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n),t.addEventListener("wheel",a=>{const o=t.getBoundingClientRect();if(a.ctrlKey||a.metaKey)a.preventDefault(),this.zoomAt(Math.exp(-a.deltaY*.01),a.clientX-o.left);else if(this.zoom>1&&(Math.abs(a.deltaX)>Math.abs(a.deltaY)||a.shiftKey)){a.preventDefault();const r=a.shiftKey&&!a.deltaX?a.deltaY:a.deltaX;this.setView(this.view+r/(o.width||1)/this.zoom)}},{passive:!1})}hover(t){const n=this.host.sample();if(!n)return;const a=this.stage.getBoundingClientRect(),o=a.width||1,r=t.clientX-a.left,i=this.base(n),l=Math.abs(r-this.x(i.start/n.frames,o))<=$a||Math.abs(r-this.x(i.end/n.frames,o))<=$a;this.stage.dataset.near=l?"true":"false"}dragRegion(t,n,a,o,r){const i=2/r.frames,l=r.pad.length!=="free"&&Ct(r.pad);this.host.edit(c=>{if(t==="start")c.start=Te(n+o,0,l?1-i:c.end-i);else if(t==="move"){const d=a-n,u=Te(n+o,0,1-d);c.start=u,c.end=u+d}else if(t==="end"){const d=Te(a+o,c.start+i,1);if(l){const u=no(c,{sampleRate:r.sampleRate,frames:r.frames},this.host.bpm()),p=(d-c.start)*r.frames;let h=c.length,m=Number.POSITIVE_INFINITY;for(const g of ln){if(g==="free")continue;const v=Math.abs(Math.log(Va(g,this.host.bpm(),r.sampleRate,u)/Math.max(1,p)));v<m&&(m=v,h=g)}c.length=h}else c.end=d}})}wireTag(t,n){t.addEventListener("pointerdown",o=>{const r=this.host.sample();r&&(o.stopPropagation(),t.setPointerCapture(o.pointerId),this.drag={kind:n,x0:o.clientX,start0:r.pad.start,end0:this.base(r).end/r.frames,view0:this.view},o.altKey&&(this.drag.kind="move"),this.stage.dataset.dragging=this.drag.kind)}),t.addEventListener("pointermove",o=>{const r=this.drag,i=this.host.sample();if(!r||!i||r.kind!==n&&r.kind!=="move")return;const l=this.stage.clientWidth||1;this.dragRegion(r.kind,r.start0,r.end0,(o.clientX-r.x0)/l/this.zoom,i)});const a=()=>{this.drag&&this.host.audition(),this.drag=null,delete this.stage.dataset.dragging};t.addEventListener("pointerup",a),t.addEventListener("pointercancel",a),t.addEventListener("keydown",o=>{const r=this.host.sample();if(!r)return;const i=o.key==="ArrowLeft"?-1:o.key==="ArrowRight"?1:0;if(!i)return;o.preventDefault();const l=o.shiftKey?.1:.01,c=i*l*r.sampleRate/r.frames;this.dragRegion(n,r.pad.start,this.base(r).end/r.frames,c,r)})}wireStrip(t){t.addEventListener("pointerdown",a=>{const o=t.getBoundingClientRect(),r=o.width||1,i=(a.clientX-o.left)/r;t.setPointerCapture(a.pointerId),(i<this.view||i>this.view+1/this.zoom)&&this.setView(i-.5/this.zoom),this.drag={kind:"frame",x0:a.clientX,start0:0,end0:0,view0:this.view}}),t.addEventListener("pointermove",a=>{if(this.drag?.kind!=="frame")return;const o=t.clientWidth||1;this.setView(this.drag.view0+(a.clientX-this.drag.x0)/o)});const n=()=>{this.drag?.kind==="frame"&&(this.drag=null)};t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n)}key(t){t.key==="Escape"?(t.preventDefault(),this.host.close()):(t.key==="="||t.key==="+")&&!t.metaKey&&!t.ctrlKey?(t.preventDefault(),this.zoomStep(1)):t.key==="-"&&!t.metaKey&&!t.ctrlKey&&(t.preventDefault(),this.zoomStep(-1)),t.stopPropagation()}renderHead(t){const n=C("button",{type:"button",class:"nyx-rgn-x","aria-label":"Close"},"×");n.addEventListener("click",()=>this.host.close());const a=t.frames/t.sampleRate;this.head.replaceChildren(C("span",{class:"nyx-rgn-brand"},"NYX"),C("span",{class:"nyx-rgn-pad"},`Pad ${t.index+1}`),C("span",{class:"nyx-rgn-file","data-nyx-rgn":"name"},t.pad.name),C("span",{class:"nyx-rgn-meta"},`${a.toFixed(2)} s · ${Math.round(this.host.bpm())} BPM`),n)}renderZoom(){const t=(a,o,r,i="")=>{const l=C("button",{type:"button",class:`nyx-rgn-zb ${i}`,"aria-label":o},a);return l.addEventListener("click",r),l},n=C("span",{class:"nyx-rgn-zlevel","data-nyx-rgn":"zoom"},Zy(this.zoom));this.zoomRow.replaceChildren(t("−","Zoom out",()=>this.zoomStep(-1),"nyx-rgn-zsign"),n,t("+","Zoom in",()=>this.zoomStep(1),"nyx-rgn-zsign"),C("i",{class:"nyx-rgn-sep"}),t("Fit","Show the whole sample",()=>this.setView(0,1)),t("Region","Zoom to the part that plays",()=>this.zoomToRegion()))}renderControls(t){const n=t.pad,a=Ct(n),o=[],r=(w,x,S,$,k)=>{const A=C("span",{class:"nyx-rgn-k"},x);At(A,w),o.push(A,C("div",{class:"nyx-rgn-v","data-nyx-rgn":k},S),C("div",{class:"nyx-rgn-read","data-nyx-rgn":`${k}-read`},$))},i=C("div",{class:"nyx-rgn-ticks",role:"radiogroup","aria-label":"Length from Start"});ln.forEach((w,x)=>{const S=C("button",{type:"button",role:"radio",class:"nyx-rgn-tick","aria-checked":String(n.length===w),"data-grid":w},Mt(w));a||(S.disabled=!0),S.addEventListener("click",()=>this.host.edit($=>{if($.length==="free"&&w!=="free")$.length=w;else if(w==="free"&&$.length!=="free"){const k=this.base(t);$.end=Te(k.end/t.frames,$.start+2/t.frames,1),$.length="free"}else $.length=w})),i.append(S),(x===0||x===4)&&i.append(C("i",{class:"nyx-rgn-sep"}))});const l=this.base(t),c=(l.end-l.start)/t.sampleRate,d=a?C("span",{},C("b",{},Zt(c)),` from ${Zt(l.start/t.sampleRate)}${l.clamped?" · cut at the end":""}`):n.slices?"Slices are on: the grid needs them off":"Fit to bars sets the length";r("region:length","Length from Start",i,d,"length");const u=C("div",{class:"nyx-rgn-tog",role:"radiogroup","aria-label":"When it's hit again"});for(const[w,x]of[["cut","Cut"],["finish","Let it finish"]]){const S=C("button",{type:"button",role:"radio",class:"nyx-rgn-tick","aria-checked":String(n.retrigger===w),"data-retrigger":w},x);S.addEventListener("click",()=>this.host.edit($=>{$.retrigger=w})),u.append(S)}r("region:retrigger","When it's hit again",u,n.retrigger==="finish"?"grid hits wait for the end":"each hit starts it again","retrigger");const p=n.mod,h=this.host.aria(),m=this.host.signals(),g=this.host.beat(),v=C("div",{class:"nyx-rgn-sentence"});if(v.append(this.sourcePill("start",p.startSource,a)),p.startSource){const w=C("input",{type:"range",class:"nyx-rgn-hair",min:"0",max:String(Na),step:"0.01",value:String(p.startAmount),"aria-label":"How far Start moves","data-nyx-rgn":"start-amount"});w.style.setProperty("--fill",`${(p.startAmount/Na*100).toFixed(1)}%`),w.addEventListener("input",()=>this.host.edit(x=>{x.mod.startAmount=Number(w.value)})),v.append(w,C("span",{class:"nyx-rgn-say"},`up to ${p.startAmount.toFixed(2)} s either way`))}const f=p.startSource&&gl(p.startSource)&&!h?"ARIA not in this Studio":p.startSource?C("span",{},"now ",C("b",{},zl(Rr(p,m,g)))):"";r("region:start-mod","Start moves with",v,f,"start-mod");const b=C("div",{class:"nyx-rgn-sentence"});b.append(this.sourcePill("length",p.lengthSource,a));let y="";if(p.lengthSource){const w=C("div",{class:"nyx-rgn-steps",role:"radiogroup","aria-label":"How many steps"});for(let x=1;x<=Yd;x++){const S=C("button",{type:"button",role:"radio",class:"nyx-rgn-tick","aria-checked":String(p.lengthSteps===x)},String(x));S.addEventListener("click",()=>this.host.edit($=>{$.mod.lengthSteps=x})),w.append(S)}b.append(C("span",{class:"nyx-rgn-say"},this.lengthSentence(n)),w),n.length==="free"?y="pick a length first":gl(p.lengthSource)&&!h?y="ARIA not in this Studio":y=C("span",{},"next hit ",C("b",{},Mt(On(n.length,Ir(p,m,g)))))}if(r("region:length-mod","Length moves with",b,y,"length-mod"),p.startSource==="lfo"||p.lengthSource==="lfo"){const w=C("div",{class:"nyx-rgn-sentence"}),x=C("select",{class:"nyx-rgn-inline","aria-label":"LFO period","data-nyx-rgn":"lfo-bars"});for(const $ of Ud)x.append(C("option",{value:String($)},$<1?`1/${1/$} bar`:$===1?"1 bar":`${$} bars`));x.value=String(p.lfoBars),x.addEventListener("change",()=>this.host.edit($=>{$.mod.lfoBars=Number(x.value)}));const S=C("div",{class:"nyx-rgn-steps",role:"radiogroup","aria-label":"LFO shape"});for(const $ of Wd){const k=C("button",{type:"button",role:"radio",class:"nyx-rgn-tick","aria-checked":String(p.lfoShape===$)},$==="sine"?"Sine":$==="triangle"?"Triangle":"Steps");k.addEventListener("click",()=>this.host.edit(A=>{A.mod.lfoShape=$})),S.append(k)}w.append(C("span",{class:"nyx-rgn-say"},"once every"),x,S),r("region:lfo","NYX LFO",w,"on the Studio's beat","lfo")}this.controls.replaceChildren(...o)}updateReadouts(t){const n=this.base(t),a=this.controls.querySelector('[data-nyx-rgn="length-read"]');a&&Ct(t.pad)&&a.replaceChildren(C("b",{},Zt((n.end-n.start)/t.sampleRate)),` from ${Zt(n.start/t.sampleRate)}${n.clamped?" · cut at the end":""}`);const o=this.controls.querySelector('[data-nyx-rgn="start-mod"] .nyx-rgn-say');o&&(o.textContent=`up to ${t.pad.mod.startAmount.toFixed(2)} s either way`);const r=this.controls.querySelector('[data-nyx-rgn="start-amount"]');r&&(document.activeElement!==r&&(r.value=String(t.pad.mod.startAmount)),r.style.setProperty("--fill",`${(t.pad.mod.startAmount/Na*100).toFixed(1)}%`))}lengthSentence(t){const n=t.mod;if(t.length==="free")return"moves the grid length";const a=Mt(On(t.length,-n.lengthSteps)),o=Mt(On(t.length,n.lengthSteps));return n.lengthSource==="aria:phone-shake"?`each shake shortens it a step, back to ${Mt(t.length)} after ${Ts/4} bars`:`steps between ${a} and ${o}`}sourcePill(t,n,a){const o=C("select",{class:"nyx-rgn-pick","aria-label":t==="start"?"Start moves with":"Length moves with","data-nyx-rgn":`${t}-source`});o.append(C("option",{value:""},"Nothing"));const r=C("optgroup",{label:"NYX"}),i=C("optgroup",{label:this.host.aria()??"ARIA"});for(const d of jd){const u=C("option",{value:d.id},d.group==="aria"?`ARIA · ${d.label}`:d.label);(d.group==="aria"?i:r).append(u)}o.append(r,i),o.value=n??"",o.disabled=!a,o.addEventListener("change",()=>this.host.edit(d=>{const u=o.value||null;t==="start"?d.mod.startSource=u:d.mod.lengthSource=u}));const c=C("span",{class:"nyx-rgn-pill","data-kind":n?n==="lfo"?"lfo":"aria":"none"},o);return At(c,`region:${t}-source`),c}renderFoot(){const t=C("button",{type:"button",class:"nyx-rgn-quiet","data-nyx-rgn":"reset"},"Reset region");At(t,"region:reset"),t.addEventListener("click",()=>this.host.edit(r=>{r.start=0,r.end=1,r.length="free",r.mod=Cs()}));const n=this.host.playPos()!==null,a=C("button",{type:"button",class:"nyx-rgn-play","data-nyx-rgn":"audition","aria-pressed":String(n)},n?"Stop":"Audition");At(a,"region:audition"),a.addEventListener("click",()=>this.host.audition());const o=C("button",{type:"button",class:"nyx-rgn-done","data-nyx-rgn":"done"},"Done");o.addEventListener("click",()=>this.host.close()),this.foot.replaceChildren(t,C("span",{class:"nyx-rgn-sp"}),a,o)}readColours(){if(this.colours)return this.colours;const t=getComputedStyle(this.dialog),n=a=>t.getPropertyValue(a).trim();return this.colours={top:n("--nyx-rgn-stage-top"),mid:n("--nyx-rgn-stage-mid"),bottom:n("--nyx-rgn-stage-bottom"),slate:n("--nyx-rgn-slate"),grid:n("--nyx-rgn-grid"),bar:n("--nyx-rgn-bar"),goldHi:n("--nyx-rgn-gold-hi"),gold:n("--nyx-rgn-gold"),goldLo:n("--nyx-rgn-gold-lo"),marker:n("--nyx-rgn-marker"),magma:n("--nyx-rgn-magma"),play:n("--nyx-rgn-play"),wash:n("--nyx-rgn-wash")},this.colours}fit(t){const n=t.clientWidth,a=t.clientHeight;if(!n||!a)return null;const o=Math.min(3,globalThis.devicePixelRatio||1);(t.width!==Math.round(n*o)||t.height!==Math.round(a*o))&&(t.width=Math.round(n*o),t.height=Math.round(a*o));const r=t.getContext("2d");return r?(r.setTransform(o,0,0,o,0,0),{ctx:r,w:n,h:a}):null}envelope(t,n,a,o){const r=new Float32Array(o),i=t.data,l=t.frames;for(let c=0;c<o;c++){const d=Math.floor((n+(a-n)*c/o)*l),u=Math.max(d+1,Math.floor((n+(a-n)*(c+1)/o)*l)),p=Math.max(1,Math.floor((u-d)/48));let h=0;for(let m=Math.max(0,d);m<Math.min(l,u);m+=p)for(const g of i){const v=Math.abs(g[m]??0);v>h&&(h=v)}r[c]=h}return r}paint(){if(!this.isOpen)return;const t=this.host.sample();if(!t)return;const n=this.base(t),a=JSON.stringify([t.pad.sample,n.start,n.end,this.zoom,this.view,this.host.bpm(),this.stage.clientWidth,this.stage.clientHeight,t.pad.mod.startSource?t.pad.mod.startAmount:-1,document.documentElement.dataset.theme??""]);a!==this.waveKey&&(this.waveKey=a,this.colours=null,this.paintWave(t,n),this.paintStrip(t,n)),this.paintLive()}paintWave(t,n){const a=this.fit(this.wave);if(!a)return;const{ctx:o,w:r,h:i}=a,l=this.readColours();o.clearRect(0,0,r,i);const c=o.createRadialGradient(r/2,0,0,r/2,0,Math.max(r,i)*1.1);c.addColorStop(0,l.top),c.addColorStop(.55,l.mid),c.addColorStop(1,l.bottom),o.fillStyle=c,o.fillRect(0,0,r,i);const d=Math.round(i*.14),u=d+(i-d)/2,p=(i-d)/2-6,h=this.view,m=this.zoom,g=1/m,v=60/Math.max(1,this.host.bpm())*t.sampleRate*n.rate/t.frames,f=n.start/t.frames,b=[];if(v*m*r>6){const O=Math.ceil((h-f)/v),P=Math.floor((h+g-f)/v);let te=Number.NEGATIVE_INFINITY;for(let ae=O;ae<=P&&ae-O<4e3;ae++){const J=this.x(f+ae*v,r),Re=ae%4===0;o.strokeStyle=Re?l.bar:l.grid,o.lineWidth=1,o.beginPath(),o.moveTo(Math.round(J)+.5,Re?d:d+(i-d)*.08),o.lineTo(Math.round(J)+.5,i),o.stroke(),Re&&ae>=0&&J-te>64&&(te=J,b.push(C("span",{class:"nyx-rgn-bar",style:`left:${(J/r*100).toFixed(3)}%`},`bar ${ae/4+1}`)))}}const y=Math.max(2,Math.round(r/2)),w=this.envelope(t,h,h+g,y);let x=0;for(const O of w)O>x&&(x=O);const S=x>0?.92/Math.max(x,.05):1,$=(O,P)=>{const te=new Path2D,ae=J=>J/y*r;te.moveTo(ae(O),u);for(let J=O;J<=P;J++)te.lineTo(ae(J),u-Math.min(1,(w[Math.min(y-1,J)]??0)*S)*p);for(let J=P;J>=O;J--)te.lineTo(ae(J),u+Math.min(1,(w[Math.min(y-1,J)]??0)*S)*p);return te.closePath(),te};o.fillStyle=l.slate,o.fill($(0,y-1));const k=this.x(f,r),A=this.x(n.end/t.frames,r),M=Te(Math.floor(k/r*y),0,y-1),H=Te(Math.ceil(A/r*y),0,y-1);if(A>0&&k<r&&H>M){const O=o.createLinearGradient(0,d,0,i);O.addColorStop(0,l.wash),O.addColorStop(1,"transparent"),o.fillStyle=O,o.fillRect(Math.max(0,k),d,Math.min(r,A)-Math.max(0,k),i-d);const P=o.createLinearGradient(0,u-p,0,u+p);P.addColorStop(0,l.goldHi),P.addColorStop(.5,l.gold),P.addColorStop(1,l.goldLo);const te=$(M,H);o.save(),o.beginPath(),o.rect(Math.max(0,k),0,Math.min(r,A)-Math.max(0,k),i),o.clip(),o.shadowColor=l.gold,o.shadowBlur=14,o.globalAlpha=.55,o.fillStyle=P,o.fill(te),o.shadowBlur=0,o.globalAlpha=1,o.fill(te),o.restore()}o.strokeStyle=l.marker,o.lineWidth=1.5;for(const O of[k,A])O>=-2&&O<=r+2&&(o.beginPath(),o.moveTo(O,d-4),o.lineTo(O,i),o.stroke());this.labels.replaceChildren(...b);const j=(O,P,te)=>{const ae=P>=-1&&P<=r+1;O.hidden=!ae,O.style.left=`${(P/r*100).toFixed(3)}%`,O.dataset.side=te};j(this.startTag,k,"l"),j(this.endTag,A,"r"),this.endTag.textContent=n.clamped?"End · cut":"End",this.startTag.setAttribute("aria-valuetext",Zt(n.start/t.sampleRate)),this.endTag.setAttribute("aria-valuetext",Zt(n.end/t.sampleRate))}paintStrip(t,n){const a=this.fit(this.over);if(!a)return;const{ctx:o,w:r,h:i}=a,l=this.readColours();o.clearRect(0,0,r,i),o.fillStyle=l.bottom,o.fillRect(0,0,r,i);const c=Math.max(2,Math.round(r/3)),d=this.envelope(t,0,1,c);let u=0;for(const g of d)g>u&&(u=g);const p=u>0?1/u:1,h=n.start/t.frames,m=n.end/t.frames;for(let g=0;g<c;g++){const v=(g+.5)/c,f=Math.max(.08,(d[g]??0)*p)*(i/2-2);o.fillStyle=v>=h&&v<=m?l.gold:l.slate,o.fillRect(g/c*r,i/2-f,Math.max(1,r/c-1),f*2)}this.frame.style.left=`${(this.view*100).toFixed(3)}%`,this.frame.style.width=`${(100/this.zoom).toFixed(3)}%`}paintLive(){const t=this.host.sample(),n=this.fit(this.live);if(!t||!n)return;const{ctx:a,w:o,h:r}=n;a.clearRect(0,0,o,r);const i=this.readColours(),l=Math.round(r*.14),c=t.pad.mod,d=this.base(t);if(c.startSource&&Ct(t.pad)&&!Ka(c)){const g=c.startAmount*t.sampleRate/t.frames,v=d.start/t.frames,f=this.x(Math.max(0,v-g),o),b=this.x(Math.min(1,v+g),o),y=a.createLinearGradient(f,0,b,0);y.addColorStop(0,"transparent"),y.addColorStop(.5,i.magma),y.addColorStop(1,"transparent"),a.globalAlpha=.22,a.fillStyle=y,a.fillRect(f,l,b-f,r-l),a.globalAlpha=1;const w=Tb({start:d.start,end:d.end,frames:t.frames,sampleRate:t.sampleRate,rate:d.rate,grid:t.pad.length,mod:c},this.host.signals(),this.host.beat(),this.host.bpm()),x=this.x(w.from/t.frames,o);a.strokeStyle=i.magma,a.lineWidth=1.2,a.setLineDash([3,4]),a.beginPath(),a.moveTo(x,l),a.lineTo(x,r),a.stroke(),a.setLineDash([]),a.fillStyle=i.magma,a.beginPath(),a.arc(x,r-8,3.5,0,Math.PI*2),a.fill()}const u=this.host.playPos();if(u!==null){const g=this.x(u,o);a.strokeStyle=i.play,a.globalAlpha=.85,a.lineWidth=1,a.beginPath(),a.moveTo(g,l),a.lineTo(g,r),a.stroke(),a.globalAlpha=1}const p=this.foot.querySelector('[data-nyx-rgn="audition"]');p&&p.getAttribute("aria-pressed")!==String(u!==null)&&(p.setAttribute("aria-pressed",String(u!==null)),p.textContent=u!==null?"Stop":"Audition");const h=this.controls.querySelector('[data-nyx-rgn="start-mod-read"] b');h&&c.startSource&&(h.textContent=zl(Rr(c,this.host.signals(),this.host.beat())));const m=this.controls.querySelector('[data-nyx-rgn="length-mod-read"] b');m&&c.lengthSource&&(m.textContent=Mt(On(t.pad.length,Ir(c,this.host.signals(),this.host.beat()))))}}const t0="/nyx/assets/sampler-processor-BAfNnJRz.js",n0=.001,a0=(e,t,n)=>{const a=new Float32Array(Math.max(0,n-t)),o=e.length||1;for(const r of e)for(let i=t;i<n;i++)a[i-t]+=(r[i]??0)/o;return a};function o0(e,t,n,a,o){const r=e.length;for(let i=0;i<r;i++){const l=o[i];if(l>i){const c=e[i];e[i]=e[l],e[l]=c;const d=t[i];t[i]=t[l],t[l]=d}}for(let i=2;i<=r;i<<=1){const l=i>>1,c=r/i;for(let d=0;d<r;d+=i)for(let u=0;u<l;u++){const p=n[u*c],h=a[u*c],m=d+u,g=m+l,v=e[g]*p+t[g]*h,f=t[g]*p-e[g]*h;e[g]=e[m]-v,t[g]=t[m]-f,e[m]+=v,t[m]+=f}}}function r0(e,t){const n=t>64e3?2048:t>32e3?1024:512,a=n/4,o=Math.max(0,Math.floor((e.length-n)/a)+1),r=n/2,i=new Float32Array(n);for(let y=0;y<n;y++)i[y]=.5-.5*Math.cos(2*Math.PI*y/n);const l=new Float32Array(r),c=new Float32Array(r);for(let y=0;y<r;y++)l[y]=Math.cos(2*Math.PI*y/n),c[y]=Math.sin(2*Math.PI*y/n);const d=Math.log2(n),u=new Uint32Array(n);for(let y=0;y<n;y++){let w=0;for(let x=0;x<d;x++)w|=(y>>x&1)<<d-1-x;u[y]=w}const p=new Float32Array(n),h=new Float32Array(n);let m=new Float32Array(r),g=new Float32Array(r);const v=new Float32Array(o),f=4/n*1e3;let b=0;for(let y=0;y<o;y++){const w=y*a;for(let S=0;S<n;S++)p[S]=e[w+S]*i[S],h[S]=0;o0(p,h,l,c,u);for(let S=0;S<r;S++)g[S]=Math.log1p(f*Math.sqrt(p[S]*p[S]+h[S]*h[S]));let x=0;if(y>0)for(let S=1;S<r-1;S++){const $=Math.max(m[S-1],m[S],m[S+1]),k=g[S]-$;k>0&&(x+=k)}v[y]=x,x>b&&(b=x),[m,g]=[g,m]}if(b>0)for(let y=0;y<o;y++)v[y]/=b;return{flux:v,hop:a,size:n}}function s0(e,t,n,a){const o=Math.max(8,Math.round(5e-4*t)),r=Math.max(0,n-Math.round(.01*t)),i=Math.min(e.length,a),l=[];for(let h=r;h<i;h+=o){let m=0;for(let g=Math.max(1,h);g<Math.min(i,h+o);g++)m=Math.max(m,Math.abs(e[g]-e[g-1]));l.push(m)}if(!l.length)return{at:n,contrast:0};let c=0;for(let h=1;h<l.length;h++)l[h]>l[c]&&(c=h);let d=l[c];for(let h=0;h<=c;h++)d=Math.min(d,l[h]);const u=d+.1*(l[c]-d);let p=c;for(;p>0&&l[p-1]>u;)p--;return{at:r+Math.max(0,p-1)*o,contrast:l[c]>0?1-d/l[c]:0}}function i0(e,t,n){let a=Math.max(0,Math.min(e.length-1,t));for(let o=Math.max(0,t-n);o<=Math.min(e.length-1,t+n);o++)Math.abs(e[o])<Math.abs(e[a])&&(a=o);return a}function Dl(e,t,n=0,a=e[0]?.length??0){const o=a0(e,n,a),{flux:r,hop:i,size:l}=r0(o,t),c=t/i/1e3,d=Math.max(1,Math.round(100*c)),u=Math.max(1,Math.round(30*c)),p=Math.max(1,Math.round(25*c)),h=new Float64Array(r.length+1);for(let f=0;f<r.length;f++)h[f+1]=h[f]+r[f];const m=[],g=Math.round(n0*t),v=Math.round(5e-4*t);for(let f=1;f<r.length;f++){const b=r[f],y=Math.max(0,f-d),w=Math.min(r.length,f+u+1),x=b-(h[w]-h[y])/(w-y);if(x<.02)continue;let S=!0;for(let M=Math.max(0,f-p);M<=Math.min(r.length-1,f+p);M++)if(r[M]>b||r[M]===b&&M<f){S=!1;break}if(!S)continue;const{at:$,contrast:k}=s0(o,t,f*i,f*i+l),A=i0(o,$-g,v);m.push({cut:n+A,hit:n+$,strength:b*(.25+.75*k),margin:x})}return m.sort((f,b)=>b.strength-f.strength),{from:n,to:a,sampleRate:t,candidates:m}}function l0(e){return .3*(1-Math.max(0,Math.min(1,e)))**1.6+.02}function Bl(e,t){const n=l0(t);return e.candidates.filter(a=>a.margin>=n)}const pt=16,c0=.03,d0=.002,u0=.02,p0=.7;function wu(e,t){const{from:n,to:a,sampleRate:o}=e,r=Math.round(c0*o),i=Math.max(2,Math.min(pt,Math.round(t.count??pt)));if(a-n<r*2)return{cuts:[n,a],hits:[n]};if(t.mode==="transients"){const h=Bl(e,t.sensitivity??.5),m=h.find(v=>v.cut-n<r),g=[];for(const v of h){if(g.length>=i-1)break;v.cut-n<r||a-v.cut<r||g.every(f=>Math.abs(f.cut-v.cut)>=r)&&g.push(v)}return g.sort((v,f)=>v.cut-f.cut),{cuts:[n,...g.map(v=>v.cut),a],hits:[m?m.hit:n,...g.map(v=>v.hit)]}}let l,c=a;if(t.mode==="even")l=Array.from({length:i},(h,m)=>n+Math.round((a-n)*m/i));else{const h=60/(t.bpm&&t.bpm>0?t.bpm:120)/(t.perBeat??1)*o;l=[];for(let m=0;m<pt&&n+m*h<a-r;m++)l.push(n+Math.round(m*h));l.length>=pt&&(c=Math.min(a,n+Math.round(pt*h)))}const d=t.snap===!1?0:Math.round(u0*o),u=d?Bl(e,p0):[];return{cuts:[...l.map((h,m)=>{if(m===0||!d)return h;let g=h,v=d+1;for(const f of u){const b=Math.abs(f.hit-h);b<=d&&b<v&&(v=b,g=f.cut)}return g}),c],hits:l}}function h0(e,t){const n=e.to-e.from;if(t<2||n<64)return[];const o=wu(e,{mode:"transients",sensitivity:.5,count:t}).cuts.slice(1,-1).map(r=>(r-e.from)/n).filter(r=>r>.001&&r<.999);for(let r=1;o.length<t-1&&r<t;r++){const i=r/t;o.every(l=>Math.abs(l-i)>.5/t)&&o.push(i)}for(let r=1;o.length<t-1;r++)o.push(r/(t+1));return o.sort((r,i)=>r-i).slice(0,t-1)}function f0(e){const t=r=>Math.round(r*10)/10;if(e.fit>0&&e.seconds>0)return{bpm:t(e.fit*240/e.seconds),known:!0,from:"from its Fit"};if(e.given>0)return{bpm:e.given,known:!0,from:e.givenFrom??"from the take"};const n=uu(e.name);if(n)return{bpm:n,known:!0,from:"from its name"};const a=pu(e.seconds,e.studioBpm);if(a)return{bpm:t(a*240/e.seconds),known:!0,from:"the Studio's"};const o=m0(e.seconds);return o?{bpm:o.bpm,known:!1,from:"guessed from its length"}:{bpm:e.studioBpm,known:!1,from:"the Studio's"}}function m0(e,t=[]){let n=null;for(const a of[1,2,4,8]){const o=a*4*60/e;if(o<70||o>180)continue;const r=60/o/4,l=(t.length?t.reduce((c,d)=>c+Math.abs(d/r-Math.round(d/r)),0)/t.length:0)+Math.abs(o-110)/2e3;(!n||l<n.score)&&(n={bpm:o,bars:a,score:l})}return n?{bpm:Math.round(n.bpm*10)/10,bars:n.bars}:null}function Ws(e,t,n){const a=60/n/4*t,o=e.cuts[0],r=(e.cuts[e.cuts.length-1]-o)/a,i=Math.max(1,Math.ceil(r/le-.06)),l=new Set;return{positions:e.hits.map(d=>{const u=Math.max(0,Math.round((d-o)/a));return l.has(u)?-1:(l.add(u),u)}),bars:i>8?0:i}}function vu(e,t,n){const{positions:a}=Ws(e,t,n),o=a.map(r=>r>=0);return{cuts:e.cuts.filter((r,i)=>i===e.cuts.length-1||o[i]),hits:e.hits.filter((r,i)=>o[i])}}const g0=.006;function b0(e,t,n,a=g0){const o=60/n/4*t,r=e.cuts[0]??0,i=e.cuts[e.cuts.length-1]??0,l=a*t,c=[...e.cuts],d=[...e.hits];for(let u=1;u<d.length;u++){const p=d[u]??0,h=r+Math.round(Math.round((p-r)/o)*o);Math.abs(p-h)<=l&&h>r&&h<i&&(c[u]=h,d[u]=h)}return vu({cuts:c,hits:d},t,n)}function y0(e,t){return e.cuts.length-1<=t?e:{cuts:[...e.cuts.slice(0,t),e.cuts[e.cuts.length-1]],hits:e.hits.slice(0,t)}}function w0(e){return e.replace(/\.[a-z0-9]{2,4}$/i,"").split(/[\s_\-.()[\],+&]+/).filter(Boolean).filter((a,o,r)=>!/^\d{2,3}bpm$/i.test(a)&&!/^bpm\d{2,3}$/i.test(a)&&!/^bpm$/i.test(a)&&!(/^[1-9]\d{1,2}$/.test(a)&&Number(a)>=50&&Number(a)<=200)&&!(/^\d{2,3}$/.test(a)&&/^bpm$/i.test(r[o+1]??""))&&!/^[A-G](?:#|b|s|sharp|flat)?(?:m|min|maj|minor|major)?$/.test(a)).join(" ").trim()||"Loop"}function za(e,t){const n=String(t+1);return`${e.slice(0,23-n.length).trim()} ${n}`}function v0(e,t,n){const a=new Set(e.filter((o,r)=>(r<t||r>=t+n)&&o.sample&&o.choke).map(o=>o.choke));for(const o of[4,3,2,1])if(!a.has(o))return o;return 0}function x0(e,t,n){const a=Math.min(t.cuts.length-1,Q-n.first),o=n.playBack?Ws(t,n.sampleRate,n.playBack.bpm):null,r=Math.round(d0*n.sampleRate),i=[];for(let l=0;l<a;l++){const c=n.first+l,d=e.pads[c];if(!d)continue;const u=l<a-1?Math.min(n.frames,t.cuts[l+1]+r):t.cuts[l+1];if(Object.assign(d,{name:za(n.stem,l),sample:n.sample,mode:"oneshot",dir:"fwd",start:t.cuts[l]/n.frames,end:u/n.frames,slices:0,cuts:[],tune:0,fine:0,fit:0,attack:0,decay:4,cutoff:0,resonance:0,levelDb:n.source?.levelDb??0,pan:0,choke:n.choke??0,provenance:n.source?.provenance?structuredClone(n.source.provenance):null,rights:n.source?.rights??null,normalize:n.source?.normalize?{...n.source.normalize}:null,offsetDb:n.source?.offsetDb??0,follow:!1,note:n.source?.note??0}),o?.bars){const p=e.lanes[c];p.length=le,p.steps=Array.from({length:le},()=>ra());const h=o.positions[l];if(h!==void 0&&h>=0){const m=p.steps[h%le];m.on=!0;const g=o.bars>1?`${Math.floor(h/le)+1}:${o.bars}`:"always";m.cond=Qa.includes(g)?g:"always"}}i.push(c)}return i}const xu=827873614,k0=60;async function $0(e,t){const n=new Float64Array([t,e.length,e[0]?.length??0]),a=[new Uint8Array(n.buffer),...e.map(c=>new Uint8Array(c.buffer))],o=a.reduce((c,d)=>c+d.byteLength,0),r=new Uint8Array(o);let i=0;for(const c of a)r.set(c,i),i+=c.byteLength;const l=new Uint8Array(await crypto.subtle.digest("SHA-256",r));return Array.from(l.subarray(0,16),c=>c.toString(16).padStart(2,"0")).join("")}function S0(e){const t=e.data[0]?.length??0,n=new Uint8Array(16+t*4*e.data.length);return new Uint32Array(n.buffer,0,4).set([xu,e.sampleRate,e.data.length,t]),e.data.forEach((a,o)=>{n.set(new Uint8Array(a.buffer,a.byteOffset,t*4),16+o*t*4)}),n}function A0(e,t){if(t.byteLength<16)return null;const[n,a,o,r]=new Uint32Array(t,0,4);if(n!==xu||!o||o>2||t.byteLength!==16+r*4*o)return null;const i=Array.from({length:o},(l,c)=>new Float32Array(t.slice(16+c*r*4,16+(c+1)*r*4)));return{hash:e,data:i,sampleRate:a,channels:o,frames:r}}class E0{constructor(t="nyx"){this.folderName=t}memory=new Map;dir=null;folder(){return this.dir??=(async()=>{try{const t=await navigator.storage?.getDirectory?.();return t?await t.getDirectoryHandle(this.folderName,{create:!0}):null}catch{return null}})(),this.dir}info(t){return this.memory.get(t)}held(t){return this.memory.get(t)}async put(t,n){const a=await $0(t,n),o={hash:a,data:t,sampleRate:n,channels:t.length,frames:t[0]?.length??0};this.memory.set(a,o);const r=await this.folder();if(!r)return{sample:o,saved:!1};try{const l=await(await r.getFileHandle(`${a}.f32`,{create:!0})).createWritable?.();return l?(await l.write(S0(o)),await l.close(),{sample:o,saved:!0}):{sample:o,saved:!1}}catch{return{sample:o,saved:!1}}}async get(t){const n=this.memory.get(t);if(n)return n;const a=await this.folder();if(!a)return null;try{const o=await(await a.getFileHandle(`${t}.f32`)).getFile(),r=A0(t,await o.arrayBuffer());return r&&this.memory.set(t,r),r}catch{return null}}async prune(t){for(const a of[...this.memory.keys()])t.has(a)||this.memory.delete(a);const n=await this.folder();if(n)try{const a=[];for await(const o of n.keys())a.push(o);for(const o of a){const r=o.replace(/\.f32$/,"");o.endsWith(".f32")&&!t.has(r)&&await n.removeEntry(o)}}catch{}}}function ku(e){const t=Math.min(e.length,Math.round(k0*e.sampleRate));return{data:Array.from({length:Math.min(2,e.numberOfChannels)},(a,o)=>{const r=new Float32Array(t);return r.set(e.getChannelData(o).subarray(0,t)),r}),trimmed:t<e.length}}function Ol(e,t=200){const n=e[0]?.length??0,a=[];if(!n)return a;const o=n/t;for(let r=0;r<t;r++){const i=Math.floor(r*o),l=Math.max(i+1,Math.floor((r+1)*o));let c=0,d=0;const u=Math.max(1,Math.floor((l-i)/256));for(let p=i;p<l&&p<n;p+=u){let h=0;for(const m of e)h+=m[p]??0;h/=e.length,h<c&&(c=h),h>d&&(d=h)}a.push(Math.max(-1,c),Math.min(1,d))}return a}function Ur(e=L0()){try{const t=JSON.parse(e?.getItem("lucy.state")??"null");return Array.isArray(t?.takes)?t.takes.flatMap(n=>{const a=n&&typeof n=="object"?n:{},o=r=>typeof a[r]=="number"&&Number.isFinite(a[r])?a[r]:0;return a.saved!==!0||!o("id")||!o("frames")||!o("sampleRate")?[]:[{id:o("id"),bars:o("bars"),bpm:o("bpm"),sampleRate:o("sampleRate"),channels:Math.min(2,Math.max(1,o("channels"))),frames:o("frames"),rights:a.source==="computer"?"unknown":null}]}):[]}catch{return[]}}async function M0(e){try{const t=await navigator.storage?.getDirectory?.();if(!t)return null;const a=await(await(await t.getDirectoryHandle("lucy")).getFileHandle(`lucy-take-${e.id}.f32`)).getFile(),o=new Float32Array(await a.arrayBuffer());return o.length<e.frames*e.channels?null:Array.from({length:e.channels},(r,i)=>o.slice(i*e.frames,(i+1)*e.frames))}catch{return null}}function L0(){try{return globalThis.localStorage??null}catch{return null}}const Et=1,Vo=1024,T0=[1,10,100],C0=32,N0=32,$u=128,F0=400,P0=["off","blocked","live","paused","none"],Da=e=>typeof e=="object"&&e!==null,he=e=>typeof e=="number"&&Number.isFinite(e),z0=(e,t=$u)=>typeof e=="string"&&e.length>0&&e.length<=t,Qo=e=>e<0?0:e>1?1:e,D0=["live","quiet","offline","off"],B0=["removed","hold"],Rl=e=>e<-1?-1:e>1?1:e,O0=/^[A-Z0-9?*-]{0,8}$/i;function Il(e){if(!Da(e))return null;const{net:t,sta:n,loc:a,cha:o,name:r,rate:i}=e;return typeof t!="string"||typeof n!="string"||typeof a!="string"||typeof o!="string"||![t,n,a,o].every(l=>O0.test(l))||!t||!n||typeof r!="string"||r.length>$u||!he(i)||i<0||i>1e4?null:{net:t,sta:n,loc:a,cha:o,name:r,rate:i}}function R0(e){const t=e?.length;if(!(e instanceof Float32Array)&&!Array.isArray(e)&&!ArrayBuffer.isView(e)||t!==Vo)return null;const n=new Float32Array(Vo),a=e;for(let o=0;o<Vo;o++){const r=Number(a[o]);if(!Number.isFinite(r))return null;n[o]=r<-1?-1:r>1?1:r}return n}function I0(e){if(!Da(e))return null;const t=e.v;if(typeof t!="number"||Math.floor(t)!==Et||!z0(e.source))return null;const n=e.source;switch(e.kind){case"energy":{if(!Array.isArray(e.frames))return null;const a=[];for(const o of e.frames.slice(0,C0)){if(!Da(o)||!he(o.at)||!he(o.value))return null;a.push({at:o.at,value:Qo(o.value)})}return{v:Et,kind:"energy",source:n,frames:a}}case"table":{if(!he(e.seq)||e.seq<0||!he(e.at)||!he(e.rms)||e.rms<0||!T0.includes(e.speed))return null;const a=R0(e.samples);if(!a)return null;const o=e.station===null?null:Il(e.station);if(e.station!==null&&!o)return null;const r=e.behindSec===null?null:he(e.behindSec)?e.behindSec:void 0;return r===void 0?null:{v:Et,kind:"table",source:n,seq:Math.floor(e.seq),at:e.at,speed:e.speed,station:o,behindSec:r,samples:a,rms:Math.min(1,e.rms)}}case"status":{if(!D0.includes(e.state))return null;const a=e.station===null?null:Il(e.station);if(e.station!==null&&!a)return null;const o=c=>c===null?null:he(c)?c:void 0,r=o(e.newestAgeSec),i=o(e.behindSec);if(r===void 0||i===void 0||typeof e.hold!="boolean"||typeof e.credit!="string"||e.credit.length>F0)return null;const l={v:Et,kind:"status",source:n,state:e.state,station:a,newestAgeSec:r,behindSec:i,hold:e.hold,credit:e.credit};return he(e.retryAt)&&(l.retryAt=e.retryAt),e.recorded===!0&&(l.recorded=!0),P0.includes(e.motion)&&(l.motion=e.motion),l}case"motion":{if(!Array.isArray(e.frames))return null;const a=[];for(const o of e.frames.slice(0,N0)){if(!Da(o)||!he(o.at)||!he(o.tiltX)||!he(o.tiltY)||!he(o.heading)||!he(o.shake))return null;const r=o.heading%1;a.push({at:o.at,tiltX:Rl(o.tiltX),tiltY:Rl(o.tiltY),heading:r<0?r+1:r,shake:Qo(o.shake)})}return{v:Et,kind:"motion",source:n,frames:a}}case"shake":return!he(e.at)||!he(e.strength)?null:{v:Et,kind:"shake",source:n,at:e.at,strength:Qo(e.strength)};case"off":return B0.includes(e.reason)?{v:Et,kind:"off",source:n,reason:e.reason}:null;default:return null}}const q0=["aria:phone-tilt-x","aria:phone-tilt-y","aria:phone-heading","aria:phone-shake"];function _0(e){let t=!1,n=!1;for(const a of e)if(a.sample)for(const o of[a.mod.startSource,a.mod.lengthSource])o&&q0.includes(o)&&(t=!0),o==="aria:energy"&&(n=!0);return!t&&!n?null:{...n?{energy:!0}:{},...t?{motion:!0}:{}}}const ql=e=>e?`${e.energy?"e":""}${e.motion?"m":""}`:"";function H0(e,t,n){const a=e;if(typeof a?.situationIn!="function")return null;let o=null,r="",i=cn();const l=()=>{try{return a.situationSources?.()??[]}catch{return[]}},c=h=>{i=h,t(i)},d=()=>{const h=l().length>0;h!==i.aria&&c(h?{...i,aria:h}:cn())},u=h=>{const m=I0(h);if(m)if(m.kind==="motion"){const g=m.frames[m.frames.length-1];g&&c({...i,aria:!0,tiltX:g.tiltX,tiltY:g.tiltY,heading:g.heading})}else if(m.kind==="energy"){const g=m.frames[m.frames.length-1];g&&c({...i,aria:!0,energy:g.value})}else m.kind==="shake"?c(Mb({...i,aria:!0},n())):m.kind==="off"&&m.reason==="removed"&&c(cn())},p=a.onSituationSources?.(d)??null;return d(),{update(h){const m=_0(h);if(ql(m)!==r&&(r=ql(m),o?.(),o=null,m))try{o=a.situationIn?.(u,m)??null}catch{o=null}},signals:()=>i,source:()=>l()[0]?.name??null,dispose(){o?.(),p?.()}}}function j0(e){const t=e.setTimer??((i,l)=>setTimeout(i,l)),n=e.clearTimer??(i=>clearTimeout(i)),a=new Map,o=new Set,r={scheduled:0,recalled:0,duplicates:0,late:0,cancelled:0,lastMs:0};return{controls(i,l){for(const c of l){if(c.type!=="slot")continue;const d=`${i}|${c.id}`;if(o.has(d)){r.duplicates++;continue}const u=e.timeAt(c.beat);if(u===null)continue;const p=u-e.now();if(p<-.25){r.late++;continue}o.add(d),o.size>512&&o.delete(o.values().next().value);const h=c.slot-1,m=t(()=>{a.delete(d),r.recalled++,r.lastMs=(e.now()-u)*1e3,e.recall(h)},Math.max(0,p*1e3));a.set(d,{source:i,beat:c.beat,timer:m}),r.scheduled++}},off(i,l){for(const[c,d]of a)d.source===i&&(l===void 0||d.beat>=l-1e-9)&&(n(d.timer),a.delete(c),o.delete(c),r.cancelled++)},stats:r,dispose(){for(const i of a.values())n(i.timer);a.clear()}}}const W0=150,Su=96*1024*1024,U0=e=>Math.round(e*10)/10;function Y0(e,t,n){if(!e.sample||!e.fit||!e.keepPitch||!t)return null;const[a,o]=Bs(e,t,null);if(o-a<2)return null;const r=U0(n);return{sample:e.sample,from:a,to:o,bars:e.fit,bpm:r,semitones:e.tune+e.fine/100,sampleRate:t.sampleRate,frames:lu(e.fit,r,t.sampleRate)}}function en(e){return`${e.sample}:${e.from}-${e.to}:${e.bars}:${e.bpm.toFixed(1)}:${Math.round(e.semitones*100)}`}const X0=e=>`stretch:${e}`,G0=e=>e.startsWith("stretch:");class K0{constructor(t=Su,n=()=>{}){this.maxBytes=t,this.drop=n}map=new Map;bytes=0;get size(){return this.map.size}has(t){return this.map.has(t)}get(t){const n=this.map.get(t);return n&&(this.map.delete(t),this.map.set(t,n)),n}byId(t){for(const n of this.map.values())if(n.sample===t)return n}put(t,n=new Set){const a=this.map.get(t.key);a&&(this.bytes-=a.bytes),this.map.delete(t.key),this.map.set(t.key,t),this.bytes+=t.bytes;for(const[o,r]of this.map){if(this.bytes<=this.maxBytes)break;o===t.key||n.has(o)||(this.map.delete(o),this.bytes-=r.bytes,this.drop(r))}}}class V0{constructor(t,n=Su){this.host=t,this.cache=new K0(n,a=>t.drop(a))}cache;current=new Map;wanted=new Map;inFlight=new Set;timer=null;queue=Promise.resolve();missingSig="";renders=0;lastMs=0;failed=!1;plan(t,n,a){this.wanted.clear();const o=[];t.forEach((c,d)=>{const u=c.sample?n(c.sample):void 0,p=Y0(c,u,a),h=this.current.get(d);if(!p){this.current.delete(d);return}this.wanted.set(d,p);const m=en(p),g=this.cache.get(m);g?this.current.set(d,g):(h&&!Q0(h.job,p)&&this.current.delete(d),this.inFlight.has(m)||o.push(m))});const r=o.join("|");if(!o.length||this.failed){this.missingSig="";return}if(r===this.missingSig&&this.timer!==null)return;this.missingSig=r;const i=this.host.clearTimeout??(c=>clearTimeout(c)),l=this.host.setTimeout??((c,d)=>setTimeout(c,d));this.timer!==null&&i(this.timer),this.timer=l(()=>{this.timer=null,this.missingSig="",this.renderWanted()},W0)}stretchedFor(t){return this.current.get(t)}renderFor(t){return this.current.get(t)}pending(t){const n=this.wanted.get(t);return n?this.current.get(t)?.key!==en(n):!1}renderWanted(){for(const t of new Map([...this.wanted.values()].map(n=>[en(n),n])).values()){const n=en(t);this.cache.has(n)||this.inFlight.has(n)||(this.inFlight.add(n),this.queue=this.queue.then(()=>this.renderOne(n,t)))}}idle(){return this.queue}async renderOne(t,n){if(![...this.wanted.values()].some(i=>en(i)===t)){this.inFlight.delete(t);return}const a=Date.now();let o=null;try{o=await this.host.run(n)}catch(i){console.error("NYX stretch",i)}if(this.inFlight.delete(t),!o){this.failed=!0,this.host.changed();return}this.lastMs=Date.now()-a,this.renders++;const r={key:t,job:n,sample:X0(t),frames:n.frames,bytes:o.reduce((i,l)=>i+l.byteLength,0)};this.host.deliver(r,o);for(const[i,l]of this.wanted)en(l)===t&&this.current.set(i,r);this.cache.put(r,new Set([...this.current.values()].map(i=>i.key))),this.host.changed()}}const Q0=(e,t)=>e.sample===t.sample&&e.from===t.from&&e.to===t.to,J0=48e3;function Au(e,t){try{const n=e?.latency?.(t);return typeof n=="number"&&Number.isFinite(n)&&n>0&&n<=J0?Math.round(n):0}catch{return 0}}function Z0(e,t){return{from:e.from+t,to:e.to+t}}const ew="instance",tw=99;function ko(e=typeof location>"u"?"":location.search){const t=new URLSearchParams(e).get(ew)?.trim()??"";if(!/^\d+$/.test(t))return 1;const n=Number(t);return n>=2&&n<=tw?n:1}function nw(e,t){return t===1?e:`${e}#${t}`}function aw(e,t){return t===1?e:`${e} ${t}`}let ut;function ow(e,t=ko()){if(ut!==void 0)return ut;ut=null;try{if(typeof window>"u"||window.parent===window)return ut;const n=window.parent.ncStudio;n&&n.version===1&&(ut=n.attach(e,{instance:t}))}catch{}return ut}function rw(){let e;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(e=a.syncScope)}}catch{}if(!e)return{};const t=`/studio/${e}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${t}`,locks:n?{request:(a,o,r)=>n.request(`${a}${t}`,o,r)}:null}}function sw(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1&&typeof e.fxWorklet=="string"&&e.fxWorklet?e.fxWorklet:null}catch{return null}}function xt(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.grab?e.grab:null}catch{return null}}function vn(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.play?e.play:null}catch{return null}}function $o(e,t=ko()){return t>1?`${e}#${t}`:e}function iw(e,t=ko()){const n=vn()?.owner()??null;return n===null||n==="studio"||n===$o(e,t)}function lw(e){if(e.code!=="Space"&&e.code!=="Backspace")return!1;try{return ut?.studioKey?.({code:e.code,shiftKey:e.shiftKey===!0,repeat:e.repeat===!0})===!0}catch{return!1}}function cw(e){try{return ut?.playKeys?.(e)??(()=>{})}catch{return()=>{}}}const _l=48;function dw(e){const t=[];for(const n of e.points().slice(-64))t.push(n.beat,n.root===null?Number.NaN:n.root);return{type:"follow",points:t,transpose:e.route?.transpose??0}}function uw(e){const t=Math.trunc((e.transpose??0)/12);return t?`Root, ${t>0?"+":"−"}${Math.abs(t)} oct`:"Root"}function pw(e,t,n=null){const a=e;if(typeof a?.notesIn!="function")return null;const o=new oy,r=new Set;let i=-1,l="",c=!1;const d=()=>{c=!1;const p=JSON.stringify(o.route),h=p!==l;if(!h&&o.version===i)return;l=p;const m=o.points();m.length>_l&&o.prune(m[m.length-_l].beat),i=o.version,t(dw(o));for(const g of[...r])g(h)};try{let p=new Set;a.notesIn(h=>{const m=iu(h);let g=h;if(m?.kind==="routes")p=new Set(m.routes.filter(v=>v.layer).map(v=>v.source)),g=ay(m.routes.filter(v=>!v.layer));else if(m&&"source"in m&&p.has(m.source)){m.kind==="notes"?n?.notes(m.source,m.events):m.kind==="off"?n?.off(m.source,m.atBeat):m.kind==="controls"?n?.controls?.(m.source,m.events):m.kind==="release"&&n?.release?.(m.source,m.ids);return}o.receive(g),c||(c=!0,queueMicrotask(d))},{takes:"pitch"})}catch{return null}const u=p=>{const h=o.route?.source;if(!h||typeof p!="function")return!1;try{return p.call(a,h),!0}catch{return!1}};return{follower:o,route:()=>o.route,resend(){i=-1,d()},takeBack:()=>u(a.notesTakeBack),open:()=>u(a.showInstance),onChange(p){r.add(p)}}}class hw{constructor(t){this.make=t}worker=null;seq=0;calls=new Map;cache=new Map;times=[];workerNow(){if(this.worker||!this.make)return this.worker;try{const t=this.make();t.onmessage=n=>{const a=n.data;this.calls.get(a.id)?.(a),this.calls.delete(a.id)},t.onerror=n=>{for(const a of this.calls.values())a({error:n.message||"worker failed"});this.calls.clear()},this.worker=t}catch{this.worker=null}return this.worker}analysis(t,n,a,o,r){const i=`${t}:${o}:${r}`;let l=this.cache.get(i);return l||(l=this.run(n,a,o,r),this.cache.set(i,l),l.catch(()=>this.cache.delete(i)),this.cache.size>16&&this.cache.delete(this.cache.keys().next().value),l)}run(t,n,a,o){const r=this.workerNow();if(!r)return Promise.resolve(Dl(t,n,a,o));const i=++this.seq;return new Promise(l=>{this.calls.set(i,c=>{c.analysis?(c.ms!==void 0&&this.times.push(c.ms),l(c.analysis)):l(Dl(t,n,a,o))}),r.postMessage({id:i,channels:t.map(c=>c.slice(a,o)),sampleRate:n,from:a})})}}function W(e,t={},...n){const a=document.createElement(e);for(const[o,r]of Object.entries(t))a.setAttribute(o,r);return a.append(...n),a}const ct=(e,t)=>U(e,I(t),e),fw=[{value:"transients",label:"At hits"},{value:"even",label:"Even"},{value:"beats",label:"Beats"}];class mw{constructor(t){this.host=t,this.canvas=W("canvas",{class:"nyx-chop-wave",role:"img","aria-label":"The slices","data-nyx-chop":"wave"}),ct(this.canvas,"chop:wave"),this.canvas.addEventListener("click",o=>this.clickWave(o)),this.title=W("span",{class:"nc-readout nyx-chop-name","data-nyx-chop":"name"});const n=W("button",{type:"button",class:"nc-btn nyx-chop-close","data-nyx-chop":"close"},"Close");ct(n,"chop:close"),n.addEventListener("click",()=>this.host.close()),this.body=W("div",{class:"nyx-chop-body"});const a=W("span",{class:"nc-label"},"Chop to pads");this.el=W("div",{class:"nyx-chop",role:"region","aria-label":"Chop to pads","data-nyx-chop":""},W("div",{class:"nyx-chop-head"},a,this.title,n),W("div",{class:"nyx-chop-wavebox"},this.canvas),this.body),typeof ResizeObserver<"u"&&new ResizeObserver(()=>this.paintWave()).observe(this.canvas)}el;isOpen=!1;src=null;analysisOf=null;mode="transients";sensitivity=.5;count=16;perBeat=2;first=0;playBack=!0;choke=!0;snap=!0;moreOpen=!1;result=null;status="";canvas;body;title;async open(){const t=await this.host.source();if(!t)return!1;this.isOpen=!0,this.src=t,this.first=t.pad,this.playBack=t.tempo.known,this.analysisOf=null,this.result=null,this.status="Finding the hits…",this.render();const n=await this.host.analysis(t);return this.src!==t||(this.analysisOf=n,this.status="",this.run()),!0}close(){this.isOpen=!1,this.src=null,this.analysisOf=null}set(t){Object.assign(this,t),this.run()}get preview(){return{chop:this.result,first:this.first,playBack:this.playBack,choke:this.choke,bpm:this.src?.tempo.bpm??0}}run(){this.compute(),this.render()}compute(){const t=this.src,n=this.analysisOf;if(!t||!n)return;const a=Q-this.first;let o=wu(n,{mode:this.mode,sensitivity:this.sensitivity,count:Math.min(this.count,a),bpm:t.tempo.bpm,perBeat:this.perBeat,snap:this.snap});this.playBack&&(o=this.mode==="transients"&&t.tempo.known?b0(o,t.sampleRate,t.tempo.bpm):vu(o,t.sampleRate,t.tempo.bpm)),this.result=y0(o,a)}field(t,n,a,o=""){const r=W("label",{class:"nc-label",for:`nyx-chop-${t}`},n);return ct(r,`chop:${t}`),W("div",{class:"nc-field","data-nc-row":"","data-nc-id":`chop-${t}`},r,W("span",{class:"nc-readout","data-nc-readout":""},o),a)}choices(t,n,a,o,r){const i=W("div",{class:"nc-choice-row",role:"tablist","aria-label":n,id:`nyx-chop-${t}`,"data-nyx-chop":t});for(const c of o){const d=W("button",{type:"button",class:"nc-choice",role:"tab","aria-selected":String(c.value===a),"data-nc-choice":c.value},c.label);ct(d,I(`chop:${t}:${c.value}`)?`chop:${t}:${c.value}`:`chop:${t}`),c.disabled&&(d.disabled=!0),d.addEventListener("click",()=>r(c.value)),i.append(d)}const l=W("span",{class:"nc-label"},n);return ct(l,`chop:${t}`),W("div",{class:"nc-field nyx-chop-choice","data-nc-row":"","data-nc-id":`chop-${t}`},l,i)}select(t,n,a,o){const r=W("select",{class:"nc-select",id:`nyx-chop-${t}`,"data-nyx-chop":t});for(const i of a)r.append(W("option",{value:i.value},i.label));return r.value=n,r.addEventListener("change",()=>o(r.value)),r}onOff(t,n,a,o,r=!1){return this.choices(t,n,a?"on":"off",[{value:"on",label:"On",disabled:r},{value:"off",label:"Off",disabled:r}],i=>o(i==="on"))}render(){const t=this.src;if(!t)return;const n=(t.to-t.from)/t.sampleRate;this.title.textContent=`${t.stem} · ${n<10?n.toFixed(2):n.toFixed(1)} s`;const a=this.result,o=[];if(o.push(this.choices("mode","Chop",this.mode,fw,h=>{this.mode=h,this.run()})),this.mode==="transients"){const h=W("input",{type:"range",class:"nc-range",id:"nyx-chop-sensitivity",min:"0",max:"1",step:"0.01","data-nyx-chop":"sensitivity"});h.value=String(this.sensitivity);const m=this.field("sensitivity","Sensitivity",h,`${Math.round(this.sensitivity*100)}%`);h.addEventListener("input",()=>{this.sensitivity=Number(h.value),this.compute();const g=m.querySelector(".nc-readout");g&&(g.textContent=`${Math.round(this.sensitivity*100)}%`),this.paintWave()}),h.addEventListener("change",()=>this.render()),m.setAttribute("data-nc-slider",""),m.append(m.querySelector(".nc-readout")),o.push(m)}if(this.mode!=="beats")o.push(this.field("count","Slices",this.select("count",String(this.count),[16,8,4].map(h=>({value:String(h),label:this.mode==="transients"?`Up to ${h}`:String(h)})),h=>{this.count=Number(h),this.run()})));else{const h=m=>Math.ceil(n*t.tempo.bpm/60*m-.05);o.push(this.choices("every","Every",String(this.perBeat),[{value:"1",label:"Beat",disabled:h(1)>pt},{value:"2",label:"1/8",disabled:h(2)>pt},{value:"4",label:"1/16",disabled:h(4)>pt}],m=>{this.perBeat=Number(m),this.run()}))}o.push(this.field("first","Fill from",this.select("first",String(this.first),Array.from({length:Q},(h,m)=>({value:String(m),label:`Pad ${m+1}`})),h=>{this.first=Number(h),this.run()})));const r=a?Ws(a,t.sampleRate,t.tempo.bpm):null,i=r!==null&&r.bars===0;if(o.push(this.onOff("play-back","Play it back",this.playBack&&!i,h=>{this.playBack=h,this.run()},i)),this.status&&o.push(W("p",{class:"nc-note","data-nyx-chop":"status"},this.status)),a&&r){const h=a.cuts.length-1,m=this.first+h,g=h>1?`${za(t.stem,0)} to ${za(t.stem,h-1)}`:za(t.stem,0),v=this.playBack&&r.bars?` Play it back writes ${r.bars===1?"a bar":`${r.bars} bars`} on their lanes.`:i?" Longer than 8 bars: no Play it back.":"";o.push(W("p",{class:"nc-note","data-nyx-chop":"summary"},`${h} slices onto pads ${this.first+1}–${m}: ${g}.${v}`));const f=this.host.pads().slice(this.first,m).filter((b,y)=>b.sample&&this.first+y!==t.pad).length;f&&o.push(W("p",{class:"nc-note nyx-chop-warn","data-nyx-chop":"warn"},`${f===1?"1 of those pads has a sound":`${f} of those pads have sounds`}. Chop replaces ${f===1?"it":"them"}; Undo puts ${f===1?"it":"them"} back.`))}const l=W("div",{class:"nc-group","data-nc-id":"chop-more","data-nc-open":String(this.moreOpen)}),c=W("button",{type:"button",class:"nc-group-toggle","aria-expanded":String(this.moreOpen),"data-nyx-chop":"more"},W("span",{class:"nc-group-title"},"More"),W("span",{class:"nc-group-summary"},`${t.tempo.bpm} BPM · choke ${this.choke?"on":"off"}${this.mode!=="transients"?` · snap ${this.snap?"on":"off"}`:""}`),W("span",{class:"nc-group-mark","aria-hidden":"true"},this.moreOpen?"−":"+"));ct(c,"chop:more"),c.addEventListener("click",()=>{this.moreOpen=!this.moreOpen,this.render()});const d=W("div",{class:"nc-group-body",role:"group"});d.hidden=!this.moreOpen;const u=W("div",{class:"nc-field","data-nc-row":"","data-nc-id":"chop-tempo"},W("span",{class:"nc-label"},"Tempo"),W("span",{class:"nc-readout","data-nc-readout":""},`${t.tempo.bpm} BPM, ${t.tempo.from}`));ct(u.firstElementChild,"chop:tempo"),d.append(u,this.onOff("choke","Choke",this.choke,h=>{this.choke=h,this.render()})),this.mode!=="transients"&&d.append(this.onOff("snap","Snap to hits",this.snap,h=>{this.snap=h,this.run()})),l.append(c,d),o.push(l);const p=W("button",{type:"button",class:"nc-btn nyx-chop-go","data-nyx-chop":"go"},"Chop to pads");ct(p,"chop:go"),p.disabled=!a,p.addEventListener("click",()=>{this.src&&this.result&&this.host.apply(this.src,this.result,{first:this.first,playBack:this.playBack&&!i,choke:this.choke,bpm:this.src.tempo.bpm})}),o.push(p),this.body.replaceChildren(...o),this.paintWave()}clickWave(t){const n=this.src,a=this.result;if(!n||!a)return;const o=this.canvas.getBoundingClientRect(),r=n.from+(t.clientX-o.left)/Math.max(1,o.width)*(n.to-n.from);for(let i=0;i<a.cuts.length-1;i++)if(r>=a.cuts[i]&&r<a.cuts[i+1]){this.host.audition(n,a.cuts[i],a.cuts[i+1]);return}}paintWave(){const t=this.src,n=this.canvas,a=n.clientWidth,o=n.clientHeight;if(!t||!a||!o)return;const r=window.devicePixelRatio||1;n.width=Math.round(a*r),n.height=Math.round(o*r);const i=n.getContext("2d");if(!i)return;i.scale(r,r);const l=getComputedStyle(this.el),c=x=>l.getPropertyValue(x).trim(),d=c("--nc-ui-accent"),u=c("--nc-ui-accent-soft")||c("--nc-ui-divider"),p=c("--nc-ui-color-accent-pad")||c("--nc-ui-text-sub"),h=c("--nc-ui-font-readout")||"monospace",m=this.result;i.clearRect(0,0,a,o);const g=Math.max(1,t.to-t.from),v=x=>(x-t.from)/g*a,f=16,b=f+(o-f)/2,y=(o-f)/2-2;if(m)for(let x=1;x<m.cuts.length-1;x+=2)i.fillStyle=u,i.fillRect(v(m.cuts[x]),f,v(m.cuts[x+1])-v(m.cuts[x]),o-f);i.fillStyle=p;const w=g/a;for(let x=0;x<a;x++){const S=Math.floor(t.from+x*w),$=Math.min(t.to,Math.floor(t.from+(x+1)*w));let k=0,A=0;const M=Math.max(1,Math.floor(($-S)/64));for(let H=S;H<$;H+=M){let j=0;for(const O of t.data)j+=O[H]??0;j/=t.data.length||1,j<k&&(k=j),j>A&&(A=j)}i.fillRect(x,b-A*y,1,Math.max(1,(A-k)*y))}if(m){i.fillStyle=d,i.strokeStyle=d,i.lineWidth=1,i.font=`600 10px ${h}`,i.textBaseline="top";for(let x=0;x<m.cuts.length-1;x++){const S=Math.round(v(m.cuts[x]))+.5;i.beginPath(),i.moveTo(S,f-2),i.lineTo(S,o),i.stroke();const $=String(this.first+x+1);v(m.cuts[x+1])-v(m.cuts[x])>i.measureText($).width+6&&i.fillText($,S+3,1)}}}attach(t){if(!this.isOpen||!t){this.el.isConnected&&this.el.remove();return}t.nextElementSibling!==this.el&&t.after(this.el),this.paintWave()}}const Hl="My samples";function Jo(e){return e.permission?"used with permission":e.licenseStatus==="redistributable"?"shareable licence":e.licenseStatus==="personal"?"personal use":"licence unknown: personal use"}const jl="http://www.w3.org/2000/svg";function R(e,t={},...n){const a=document.createElement(e);for(const[o,r]of Object.entries(t))a.setAttribute(o,r);return a.append(...n),a}function Fn(e,t,n={}){return e?R("a",{href:e,target:"_blank",rel:"noopener noreferrer",...n},t):R("span",n,t)}function gw(e){const t=bw(e);if(!t.length)return"M0 1H48";const n=t.map(i=>Math.sqrt(Math.max(0,i))),a=n.length,o=n.map((i,l)=>`${(l+.5)*48/a} ${1-Math.max(.04,i)*.96}`),r=[...n].map((i,l)=>`${(l+.5)*48/a} ${1+Math.max(.04,i)*.96}`).reverse();return`M0 1L${o.join("L")}L48 1L${r.join("L")}Z`}function bw(e){let t=-1;for(let n=e.length-1;n>=0;n--)if((e[n]??0)>0){t=n;break}return t<0?[]:e.slice(0,Math.min(e.length,Math.max(8,t+2)))}function yw(e){const t=document.createElementNS(jl,"svg");t.setAttribute("viewBox","0 0 48 2"),t.setAttribute("preserveAspectRatio","none"),t.setAttribute("class","nyx-lib-wave"),t.setAttribute("aria-hidden","true");const n=document.createElementNS(jl,"path");return n.setAttribute("d",gw(e)),t.append(n),t}function ww(e){return e<1?`${e.toFixed(2)} s`:e<10?`${e.toFixed(1)} s`:`${Math.round(e)} s`}const vw={kick:"Kick",snare:"Snare",clap:"Clap",hat:"Hat",tom:"Tom",perc:"Perc",cymbal:"Cymbal",fx:"FX",tonal:"Tonal"};class xw{constructor(t){this.host=t,this.input=R("input",{type:"search",class:"nyx-lib-input",id:"nyx-library-ask",placeholder:"punchy kick, dusty funk kit",autocomplete:"off",spellcheck:"false",enterkeyhint:"search","aria-label":"Ask the Library","data-nyx-lib":"ask"});const n=R("label",{class:"nc-label",for:"nyx-library-ask"},"Ask");U(n,I("library:ask"),this.input),this.input.addEventListener("input",()=>this.schedule()),this.input.addEventListener("keydown",r=>{r.key==="Enter"?(r.preventDefault(),this.run()):r.key==="Escape"&&(r.preventDefault(),this.host.close())});const a=R("button",{type:"button",class:"nc-btn nyx-lib-close","data-nyx-lib":"close"},"Close");U(a,I("library:close"),a),a.addEventListener("click",()=>this.host.close()),this.forLine=R("p",{class:"nc-note nyx-lib-for","data-nyx-lib":"for"}),this.status=R("p",{class:"nc-note nyx-lib-status","data-nyx-lib":"status","aria-live":"polite"}),this.list=R("ul",{class:"nyx-lib-results","data-nyx-lib":"results"}),this.kitBtn=R("button",{type:"button",class:"nc-btn","data-nyx-lib":"kit"},"Build kit"),U(this.kitBtn,I("library:kit"),this.kitBtn),this.kitBtn.addEventListener("click",()=>void this.buildKit()),this.creditsBtn=R("button",{type:"button",class:"nc-btn","data-nyx-lib":"credits","aria-expanded":"false"},"Credits"),U(this.creditsBtn,I("library:credits"),this.creditsBtn),this.creditsBtn.addEventListener("click",()=>{this.creditsOpen=!this.creditsOpen,this.render()}),this.creditsEl=R("div",{class:"nyx-lib-credits",id:"nyx-library-credits","data-nyx-lib":"credits-list"}),this.creditsBtn.setAttribute("aria-controls",this.creditsEl.id),this.sourcesEl=R("div",{class:"nyx-lib-sources",role:"group","aria-label":"Library source","data-nyx-lib":"sources"}),this.fileInput=R("input",{type:"file",hidden:"","data-nyx-lib":"folder-input","aria-label":"Open a local Library folder"}),this.fileInput.webkitdirectory=!0,this.fileInput.multiple=!0,this.fileInput.addEventListener("change",()=>{const r=this.fileInput.files;r?.length&&this.host.local?.openFiles(r),this.fileInput.value=""});const o=this.host.local;if(o){let r=o.state.status;o.onChange(()=>{const i=o.state.status;i==="ready"&&r!=="ready"&&(this.source="local"),i!=="ready"&&this.source!=="shelf"&&i!=="opening"&&(this.source="shelf"),r=i,this.isOpen?this.run():this.render()})}this.el=R("div",{class:"nyx-library",role:"region","aria-label":"Library","data-nyx-library":""},R("div",{class:"nyx-lib-ask"},n,this.input,a),this.sourcesEl,this.fileInput,this.forLine,this.list,this.status,R("div",{class:"nyx-lib-actions"},this.kitBtn,this.creditsBtn),this.creditsEl)}el;input;forLine;status;list;kitBtn;creditsBtn;creditsEl;sourcesEl;fileInput;source="shelf";lib=null;loading=null;failed=!1;query=null;hits=[];kit=[];playing=null;busy=null;creditsOpen=!1;message="";timer=null;isOpen=!1;open(t){this.isOpen=!0,t!==void 0&&(this.input.value=t),this.ensure().then(()=>this.run()),this.render()}closePanel(){this.isOpen=!1,this.host.stopPreview(),this.playing=null}focus(){this.input.focus()}get catalog(){const t=this.host.local?.lib??null;return t?cl(sn,this.lib,t):this.lib}catalogFor(t){return t==="local"?this.host.local?.lib??null:this.lib}active(){const t=this.host.local?.lib??null;return this.source==="local"?t:this.source==="all"?t||this.lib?cl("All",this.lib,t):null:this.lib}choose(t){t!=="shelf"&&!this.host.local?.lib||(this.source=t,this.run())}openFolder(){const t=this.host.local;t&&(t.canRemember?t.pick():this.fileInput.click())}ensure(){return this.lib?Promise.resolve(this.lib):(this.loading??=this.host.catalog().then(t=>(this.lib=t,this.failed=!1,this.render(),t),()=>(this.failed=!0,this.loading=null,this.render(),null)),this.render(),this.loading)}schedule(){this.timer&&clearTimeout(this.timer),this.timer=setTimeout(()=>this.run(),150)}run(){this.timer&&clearTimeout(this.timer),this.timer=null;const t=this.input.value;if(this.message="",!this.lib&&this.source!=="local"&&!this.failed&&(this.ensure().then(a=>a&&this.run()),this.source==="shelf"))return;const n=this.active();!n||!t.trim()?(this.query=null,this.hits=[],this.kit=[]):(this.query=Or(t,n),this.kit=this.query.kit?pl(n,this.query):[],this.hits=this.query.kit?[]:Qg(n,this.query,{limit:Fd})),this.render()}get results(){return{kit:!!this.query?.kit,ids:this.query?.kit?this.kit.map(t=>t.sound.id):this.hits.map(t=>t.sound.id),unknown:this.query?.unknown??[]}}async play(t){if(this.playing===t.id){this.host.stopPreview(),this.playing=null,this.render();return}this.playing=t.id,this.render();try{await this.host.preview(t)}finally{this.playing===t.id&&(this.playing=null,this.render())}}async load(t){if(!this.busy){this.busy=t.id,this.render();try{await this.host.load(t,this.input.value)}finally{this.busy=null,this.render()}}}async chopSound(t){if(!(this.busy||!this.host.chop)){this.busy=t.id,this.render();try{await this.host.chop(t,this.input.value)}finally{this.busy=null}}}async buildKit(){if(this.busy)return;this.source!=="local"&&!this.lib&&await this.ensure();const t=this.active();if(!t)return;const n=this.input.value,a=Or(n,t),o=pl(t,{...a,roles:[],kit:!0});if(!o.length){this.message="The Library has nothing for a kit yet.",this.render();return}this.busy="kit",this.render();try{await this.host.buildKit(o,n)}finally{this.busy=null,this.render()}}row(t,n){const a=this.playing===t.id,o=R("button",{type:"button",class:"nyx-lib-play","data-nyx-lib":"play","aria-label":`${a?"Stop":"Play"} ${t.title}`,"aria-pressed":String(a)},a?"■":"▶");U(o,I("library:play"),o),o.addEventListener("click",()=>void this.play(t));const r=this.busy===t.id,i=R("button",{type:"button",class:"nc-btn nyx-lib-load","data-nyx-lib":"load","aria-label":`Load ${t.title} onto ${this.host.target().title}`},r?"Loading…":"Load");this.busy&&(i.disabled=!0),U(i,I("library:load"),i),i.addEventListener("click",()=>void this.load(t));const l=Fn(t.licenseUrl,$s(t.license,t.licenseStatus,t.permission),{class:"nyx-lib-badge","data-nyx-lib":"badge",title:t.origin==="local"?`${t.license}: ${Jo(t)}`:t.license});U(l,I("library:badge"));const c=vw[t.role]??t.role,d=n?n.slot.role===t.role?n.slot.label:`${n.slot.label} · ${c}`:c,u=R("span",{class:"nyx-lib-meta"},...t.origin==="local"?[R("span",{class:"nyx-lib-chip","data-nyx-lib":"local-chip"},"LOCAL")," "]:[],`${d} · ${ww(t.measures.length)} · `,Fn(t.creatorLink,t.creator,{class:"nyx-lib-creator"})),p=R("span",{class:"nyx-lib-name",title:t.title},t.title),h=R("span",{class:"nyx-lib-main"},p,u);n?.note&&h.append(R("span",{class:"nyx-lib-meta nyx-lib-warn"},n.note)),Rd(t)&&h.append(R("span",{class:"nyx-lib-meta","data-nyx-lib":"personal"},t.license==="unknown"?"Licence unknown: personal use":`${t.license}, ${Jo(t)}`));const m=R("span",{class:"nyx-lib-wavebox"},yw(t.wave));U(m,I("library:wave"));const g=this.host.chop&&t.origin==="local"&&(t.kind==="loop"||Is(t.title).kind==="loop")?R("button",{type:"button",class:"nc-btn nyx-lib-load nyx-lib-chop","data-nyx-lib":"chop","aria-label":`Chop ${t.title} to pads`},"Chop"):null;g&&(this.busy&&(g.disabled=!0),U(g,I("library:chop"),g),g.addEventListener("click",()=>void this.chopSound(t)));const v=R("li",{class:"nyx-lib-row","data-nyx-sound":t.id,"data-nyx-role":t.role},o,h,m,l,g?R("span",{class:"nyx-lib-loads"},i,g):i);return a&&(v.dataset.nyxPlaying=""),v}renderCredits(){if(this.creditsBtn.setAttribute("aria-expanded",String(this.creditsOpen)),this.creditsEl.hidden=!this.creditsOpen,!this.creditsOpen)return;const t=this.host.pads(),n=qd(t);if(!n.length){this.creditsEl.replaceChildren(R("p",{class:"nc-note"},"No Library sounds on the pads yet."));return}const a=ab(n),o=[];for(const r of a){const i=r.origin==="local";a.length>1&&o.push(R("p",{class:"nc-label","data-nyx-lib":`credits-${r.origin}`},i?"Your local Library":sn));const l=R("ul",{class:"nyx-lib-credit-list","data-nyx-origin":r.origin});for(const c of r.credits){const d=`On pad${c.pads.length>1?"s":""} ${c.pads.join(", ")}`;l.append(R("li",{class:"nyx-lib-credit","data-nyx-credit":c.id},R("span",{class:"nyx-lib-name"},c.title),R("span",{class:"nyx-lib-meta"},"by ",Fn(c.creatorLink,c.creator)," · ",Fn(c.licenseUrl,c.license),...i?[` (${Jo(c)})`]:[],...c.source?[" · ",Fn(c.source,"source")]:i?[]:[" · source"],i?` · from ${Ms}`:` · via ${c.curator}`),R("span",{class:"nyx-lib-meta"},d)))}o.push(l)}this.creditsEl.replaceChildren(...o)}forText(){const t=this.host.target();return this.source==="local"?`Load goes on ${t.title}. Your local Library: it plays here and is never uploaded.`:this.source==="all"?`Load goes on ${t.title}. musicmatter.art and your local Library together.`:`Load goes on ${t.title}. Curated: every sound checked by a person.`}renderSources(){const t=this.host.local;if(!t){this.sourcesEl.hidden=!0;return}this.sourcesEl.hidden=!1;const n=t.state,a=(i,l,c="")=>{const d=R("button",{type:"button",class:"nc-btn","data-nyx-lib":`source-${i}`,...c?{title:c}:{},"aria-pressed":String(this.source===i),"data-on":String(this.source===i)},l);return U(d,I(`library:source-${i}`),d),d.addEventListener("click",()=>this.choose(i)),d},o=(i,l,c)=>{const d=R("button",{type:"button",class:"nc-btn","data-nyx-lib":i},l);return U(d,I(`library:${i}`),d),d.addEventListener("click",c),d},r=[a("shelf",sn)];if(n.status==="ready"&&r.push(a("local",Hl,n.name),a("all","All")),n.status==="reconnect"){const i=o("reconnect",`Reconnect ${Hl}`,()=>void t.reconnect());i.title=n.name,r.push(i)}else n.status!=="ready"&&r.push(o("open-folder",n.status==="opening"?"Opening…":"Open folder…",()=>this.openFolder()));(n.status==="ready"||n.status==="reconnect")&&r.push(o("forget","Forget",()=>void t.forget())),this.sourcesEl.replaceChildren(...r)}localStatus(){const t=this.host.local;if(!t)return null;const n=t.state;return n.status==="error"?{text:n.message,danger:!0}:this.source==="shelf"?null:n.status==="ready"&&!n.remembered&&!this.query?{text:`${n.lib.sounds.length} local sounds. This browser can't keep the folder: open it again next visit.`,danger:!1}:null}render(){this.renderSources(),this.forLine.textContent=this.forText();const t=[];if(this.query?.kit)for(const i of this.kit)t.push(this.row(i.sound,i));else for(const i of this.hits)t.push(this.row(i.sound));this.list.replaceChildren(...t);let n=this.message,a=!1;const o=this.active(),r=this.localStatus();!n&&r?(n=r.text,a=r.danger):!n&&this.source==="local"&&!o?n="Open your local Library: the folder the sample picker exported.":n||(this.failed&&!o?(n="The Library couldn't be reached. Check the connection, then ask again.",a=!0):o?this.busy==="kit"?n="Building the kit…":this.query?this.query.kit?n=this.kit.length?"A kit for pads 1–8: Build kit puts it on them and keeps the pattern.":"Nothing for a kit.":this.hits.length?n="":n="Nothing matches. Try a role (kick, snare, hat) and a word like dark or tight.":n=`${o.sounds.length} sounds. Try "punchy kick" or "funk kit".`:n="Opening the Library…",this.query?.unknown.length&&(n=`${n?`${n} `:""}Not in the Library's words: ${this.query.unknown.join(", ")}.`.trim())),this.status.textContent=n,this.status.hidden=!n,a?this.status.dataset.ncTone="danger":delete this.status.dataset.ncTone,this.kitBtn.textContent=this.busy==="kit"?"Building…":"Build kit",this.kitBtn.disabled=!!this.busy||!o,this.renderCredits()}refresh(){const t=this.host.target(),n=this.forText();if(this.forLine.textContent!==n){this.forLine.textContent=n;for(const a of this.list.querySelectorAll('[data-nyx-lib="load"]')){const o=a.closest("li")?.querySelector(".nyx-lib-name")?.textContent??"";a.setAttribute("aria-label",`Load ${o} onto ${t.title}`)}}this.creditsOpen&&this.renderCredits()}attach(t){if(!this.isOpen||!t){this.el.isConnected&&this.el.remove();return}if(t.nextElementSibling===this.el)return;const n=document.activeElement===this.input,{selectionStart:a,selectionEnd:o}=this.input;t.after(this.el),n&&(this.input.focus(),a!==null&&o!==null&&this.input.setSelectionRange(a,o))}}const Dt="nyx-local-library.json";function Zo(e){return{name:e.name,async read(t){const n=t.split("/"),a=n.pop();let o=e;for(const r of n)o=await o.getDirectoryHandle(r);return(await o.getFileHandle(a)).getFile()}}}function kw(e){const t=[...e].map(l=>({file:l,path:(l.webkitRelativePath||l.name).replace(/\\/g,"/")})),a=t.filter(l=>l.path===Dt||l.path.endsWith(`/${Dt}`)).sort((l,c)=>l.path.length-c.path.length)[0];if(!a)return null;const o=a.path.slice(0,a.path.length-Dt.length),r=new Map;for(const l of t)l.path.startsWith(o)&&r.set(l.path.slice(o.length),l.file);return{name:o.replace(/\/$/,"").split("/").pop()||"Local Library",async read(l){const c=r.get(l);if(!c)throw new Error(`${l} isn't in the folder`);return c}}}function $w(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60)||"local"}async function Sw(e){let t;try{t=await(await e.read(Dt)).text()}catch{throw new Error(`${e.name} has no ${Dt}. Open the folder the sample picker exported.`)}let n;try{n=JSON.parse(t)}catch{throw new Error(`${Dt} in ${e.name} isn't readable JSON.`)}if(n?.kind!=="nyx-local-library")throw new Error(`${e.name} isn't a NYX local Library.`);return Bd(n,$w(e.name))}async function Aw(e){const t=new Uint8Array(await crypto.subtle.digest("SHA-256",e));return Array.from(t,n=>n.toString(16).padStart(2,"0")).join("")}async function Ew(e,t){const n=Od(t.audio);if(t.origin!=="local"||!n)throw new Error("it isn't a local sound");let a;try{a=await e.read(n)}catch{throw new Error(`${n} isn't in ${e.name} any more`)}const o=await a.arrayBuffer();if(await Aw(o)!==t.sha256)throw new Error("the file isn't the one the local Library lists");return o}const Mw="nyx-local-library",Yr="handles",er="folder";function Lw(){return new Promise((e,t)=>{const n=indexedDB.open(Mw,1);n.onupgradeneeded=()=>n.result.createObjectStore(Yr),n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}function tr(e,t){return Lw().then(n=>new Promise((a,o)=>{const r=t(n.transaction(Yr,e).objectStore(Yr));r.onsuccess=()=>a(r.result),r.onerror=()=>o(r.error)}).finally(()=>n.close()))}function Tw(){return typeof indexedDB>"u"?{get:async()=>null,set:async()=>{},clear:async()=>{}}:{get:()=>tr("readonly",e=>e.get(er)).then(e=>e??null),set:e=>tr("readwrite",t=>t.put(e,er)),clear:()=>tr("readwrite",e=>e.delete(er))}}function Cw(){const e=globalThis;return typeof e.showDirectoryPicker=="function"?e.showDirectoryPicker.bind(globalThis):null}class Nw{st={status:"none"};folder=null;handle=null;picker;handles;listeners=[];constructor(t={}){this.picker=t.picker===void 0?Cw():t.picker,this.handles=t.handles??Tw()}get state(){return this.st}get lib(){return this.st.status==="ready"?this.st.lib:null}get canRemember(){return!!this.picker}onChange(t){this.listeners.push(t)}set(t){this.st=t;for(const n of this.listeners)n()}async load(t,n){this.set({status:"opening",name:t.name});try{const a=await Sw(t);return this.folder=t,this.set({status:"ready",name:t.name,lib:a,remembered:n}),!0}catch(a){return this.folder=null,this.set({status:"error",message:a.message}),!1}}async restore(){if(!this.picker)return;let t=null;try{t=await this.handles.get()}catch{return}if(!t)return;this.handle=t,(await t.queryPermission?.({mode:"read"}).catch(()=>"prompt")??"granted")==="granted"?await this.load(Zo(t),!0):this.set({status:"reconnect",name:t.name})}async reconnect(){const t=this.handle;return t?(await t.requestPermission?.({mode:"read"}).catch(()=>"denied")??"granted")!=="granted"?(this.set({status:"reconnect",name:t.name}),!1):this.load(Zo(t),!0):this.pick()}async pick(){if(!this.picker)return!1;let t;try{t=await this.picker({mode:"read",id:"nyx-local-library"})}catch(a){return a.name==="AbortError"||this.set({status:"error",message:`The folder couldn't be opened: ${a.message}`}),!1}const n=await this.load(Zo(t),!0);return n&&(this.handle=t,await this.handles.set(t).catch(()=>{})),n}async openFiles(t){const n=kw(t);return n?this.load(n,!1):(this.set({status:"error",message:`That folder has no ${Dt}. Open the folder the sample picker exported.`}),!1)}async forget(){this.folder=null,this.handle=null,await this.handles.clear().catch(()=>{}),this.set({status:"none"})}bytes(t){return this.folder?Ew(this.folder,t):Promise.reject(new Error("its local Library folder isn't open. Open or reconnect it"))}}const Wl="nyx-picker-bridge",Ul=1,Fw=3e3,Pw=64*1024*1024,zw=new Set(["127.0.0.1","localhost","[::1]"]);function Dw(e){const t=new URLSearchParams(e).get("picker");if(!t)return null;let n;try{n=new URL(t)}catch{return null}return n.protocol!=="http:"||!zw.has(n.hostname)||!n.port||n.username||n.password||t.replace(/\/$/,"")!==n.origin?null:n.origin}function Bw(e){const t=e&&typeof e=="object"&&!Array.isArray(e)?e:{};if(t.kind!=="nyx-picker-kit")throw new Error("not a picker kit");const n=Array.isArray(t.sounds)?t.sounds:[];if(!n.length)throw new Error("the kit is empty");if(n.length>Q)throw new Error(`more than ${Q} sounds`);const a=new Set,o=[];for(const l of n){const c=l&&typeof l=="object"?l:{},d=c.pad;if(typeof d!="number"||!Number.isInteger(d)||d<1||d>Q||a.has(d))throw new Error("a sound has no pad of its own");const u=Bd({sounds:[c]},"sample-picker").sounds[0];if(!u)throw new Error(`pad ${d}'s sound isn't complete`);a.add(d),o.push({pad:d-1,sound:u})}const r=typeof t.id=="string"?t.id.slice(0,80):"",i=typeof t.name=="string"&&t.name.trim()?t.name.trim().slice(0,80):"Sample picker";return{id:r,name:i,sounds:o}}function Ow(e,t,n){if(n==="replace"){const r=[];for(let i=0;i<Q;i++)e[i]&&r.push(i);return{to:[...t],replaced:r,clear:!0}}const a=new Set;for(let r=0;r<Q;r++)e[r]||a.add(r);const o=t.map(r=>a.delete(r)?r:-1);for(let r=0;r<o.length;r++){if(o[r]!==-1)continue;const i=[...a].sort((l,c)=>l-c)[0];if(i===void 0)break;a.delete(i),o[r]=i}return{to:o,replaced:[],clear:!1}}function Xr(e){const t=[...e].sort((n,a)=>n-a).map(n=>String(n+1));return t.length>1?`${t.slice(0,-1).join(", ")} and ${t[t.length-1]}`:t[0]??""}function Rw(e,t,n){const a=t.to.filter(d=>d>=0),o=t.to.length-a.length,r=a.length,i=`${r===1?"pad":"pads"} ${Xr(a)}`,l=[],c=t.clear&&t.replaced.length>0;if(c){l.push(`This clears all 16 pads in NYX and loads your picker kit onto ${i}; the other pads stay empty.`);const d=t.replaced.map(u=>`${u+1} (${n(u)})`).join(", ");l.push(`Gone: pad${t.replaced.length===1?"":"s"} ${d}. Undo brings all 16 back as they were.`)}else if(l.push(`From the sample picker on this computer, onto ${i}.`),t.replaced.length){const d=t.replaced.map(u=>`${u+1} (${n(u)})`).join(", ");l.push(`Replaces pad${t.replaced.length===1?"":"s"} ${d}. Undo brings ${t.replaced.length===1?"it":"them"} back.`)}return o&&l.push(`${o} won't fit: no empty pads left.`),e.sounds.some(d=>d.sound.licenseStatus==="personal")&&l.push("Some are for personal use only."),l.push("The pattern stays."),{title:c?"Replace everything in NYX?":`Load ${r} sound${r===1?"":"s"} from the picker?`,body:l.join(" ")}}async function Eu(e){const t=new Uint8Array(await crypto.subtle.digest("SHA-256",e));return Array.from(t,n=>n.toString(16).padStart(2,"0")).join("")}async function Iw(e,t,n,a){const o=p=>({ok:!1,placed:[],left:[],message:p}),r=Ow(a.filled(),e.sounds.map(p=>p.pad),t),i=e.sounds.flatMap((p,h)=>{const m=r.to[h]??-1;return m>=0?[{k:p,to:m}]:[]}),l=e.sounds.flatMap((p,h)=>(r.to[h]??-1)<0?[p.pad+1]:[]);if(!i.length)return{...o("Nothing loaded: NYX has no empty pads."),left:l};if(!await a.ask(Rw(e,r,a.padName)))return{...o("Not loaded: cancelled in NYX."),left:l};const c=[];try{for(const{k:p,to:h}of i){const m=n.get(p.pad+1);if(!m)throw new Error(`pad ${p.pad+1}'s audio is missing`);if(await Eu(m)!==p.sound.sha256)throw new Error(`pad ${p.pad+1}'s audio isn't the file named`);const{data:g,rate:v}=await a.decode(p.sound,m);c.push({index:h,sound:p.sound,data:g,rate:v})}}catch(p){return{...o(`Not loaded: ${p.message}. NYX's pads are as they were.`),left:l}}await a.place(c,r.clear);const d=i.map(({k:p,to:h})=>({from:p.pad+1,to:h+1})),u=l.length?` ${l.length} didn't fit (no empty pads).`:"";return{ok:!0,placed:d,left:l,message:r.clear&&r.replaced.length?`Replaced everything in NYX: pad${d.length===1?"":"s"} ${Xr(i.map(p=>p.to))} loaded, the others empty.`:`Loaded onto NYX pad${d.length===1?"":"s"} ${Xr(i.map(p=>p.to))}.${u}`}}const qw=["pad","undo","play","remove","stop"],_w=48,Hw="0123456789abcdefghijklmnopqrstuvwxyz";function jw(e,t=_w){const n=Math.floor((e?.length??0)/2);if(!e||!n)return"";const a=Math.min(t,n),o=[];let r=0;for(let i=0;i<a;i++){const l=Math.floor(i*n/a),c=Math.max(l+1,Math.floor((i+1)*n/a));let d=0;for(let u=l;u<c;u++)d=Math.max(d,Math.abs(e[2*u]??0),Math.abs(e[2*u+1]??0));o.push(d),r=Math.max(r,d)}return o.map(i=>Hw[Math.round((r?i/r:0)*35)]).join("")}function Ww(e,t,n){const a=Number(n);if(!Number.isInteger(a)||a<1||a>Q)throw new Error("no such pad");const{kit:o,audio:r}=Us(e,t);if(o.sounds.length!==1||o.sounds[0]?.pad!==a-1)throw new Error(`the sound isn't for pad ${a}`);return{kit:o,audio:r,pad:a-1}}async function Uw(e,t,n,a){const o=e.sounds[0];if(!o)return{ok:!1,placed:[],left:[],message:"Not loaded: no sound."};const r=o.pad+1;try{const i=t.get(r);if(!i)throw new Error(`pad ${r}'s audio is missing`);if(await Eu(i)!==o.sound.sha256)throw new Error("the audio isn't the file named");const{data:l,rate:c}=await a.decode(o.sound,i);await a.place({index:o.pad,sound:o.sound,data:l,rate:c},n)}catch(i){return{ok:!1,placed:[],left:[],message:`Not loaded: ${i.message}.`}}return{ok:!0,placed:[{from:r,to:r}],left:[],message:`Pad ${r} ← ${o.sound.title}`}}function Yw(e=8){const t=new Map;return{record(n,a){for(t.delete(n),t.set(n,a);t.size>e;)t.delete(t.keys().next().value)},get:n=>t.get(n)??null,drop(n){t.delete(n)},entries:()=>[...t.values()]}}function Xw(e,t){return e?t!==e.after?`Pad ${e.index+1} has changed since; nothing undone.`:null:"Nothing to undo: NYX doesn't know that load (reloaded?)."}function Mu(e){return qw.filter(t=>t==="pad"||t==="undo"?!!(e.receivePad&&e.undo):!!e[t])}function Gw(e){return Object.prototype.toString.call(e)==="[object ArrayBuffer]"}function Us(e,t){const n=Bw(e),a=t&&typeof t=="object"?t:{},o=new Map;for(const{pad:r}of n.sounds){const i=a[String(r+1)];if(!Gw(i)||i.byteLength>Pw)throw new Error(`pad ${r+1}'s audio is missing or too big`);o.set(r+1,i instanceof ArrayBuffer?i:new Uint8Array(i).slice().buffer)}return{kit:n,audio:o}}class Kw{constructor(t){this.o=t}last="";busy=!1;start(){return this.o.self.addEventListener("message",t=>void this.onMessage(t)),this.o.self.setInterval(()=>this.update(!0),Fw),this.update(!0),this}update(t=!1){const n=this.o.pads(),a=JSON.stringify(n);!t&&a===this.last||(this.last=a,this.post({type:"state",pads:n,busy:this.busy,can:this.can()}))}can(){return Mu(this.o)}post(t){try{this.o.picker.postMessage({nyx:Wl,v:Ul,...t},this.o.origin)}catch{}}padChain=Promise.resolve();onPadMessage(t,n,a){const o=this.padChain.then(async()=>{a(await Nt(t,this.o,n)),this.update(!0)});return this.padChain=o.catch(()=>{}),o}async onMessage(t){if(t.origin!==this.o.origin||t.source!==this.o.picker)return;const n=t.data;if(!n||typeof n!="object"||n.nyx!==Wl||n.v!==Ul)return;if(n.type==="hello")return this.update(!0);const a=typeof n.id=="string"?n.id.slice(0,80):"",o=c=>this.post({type:"result",id:a,...c});if(n.type==="play"||n.type==="stop")return void o(await Nt(n,this.o,a));if(n.type==="pad"||n.type==="undo"||n.type==="remove")return this.onPadMessage(n,a,o);if(n.type!=="kit")return;if(this.busy)return o({ok:!1,placed:[],left:[],message:"NYX is still loading the last kit."});let r,i;try{({kit:r,audio:i}=Us(n.kit,n.audio))}catch(c){return o({ok:!1,placed:[],left:[],message:`Not loaded: ${c.message}.`})}const l=n.mode==="fill"?"fill":"replace";this.busy=!0;try{o(await this.o.receive(r,l,i))}catch(c){o({ok:!1,placed:[],left:[],message:`Not loaded: ${c.message}.`})}finally{this.busy=!1,this.update(!0)}}}const Yl=e=>{const t=Number(e);return Number.isInteger(t)&&t>=1&&t<=Q?t:0};async function Nt(e,t,n){const a=o=>({ok:!1,placed:[],left:[],message:o});try{if(e.type==="stop"){const i=Number(e.pad)===0?0:Yl(e.pad);return Number(e.pad)!==0&&!i?a("No such pad."):t.stop?await t.stop(i):a("This NYX can't stop a pad for the picker.")}if(e.type==="play"||e.type==="remove"){const i=Yl(e.pad);return i?e.type==="play"?t.play?await t.play(i):a("This NYX can't play a pad for the picker."):t.remove?await t.remove(i,n):a("This NYX can't remove a sound for the picker."):a("No such pad.")}if(e.type==="undo")return t.undo?await t.undo(typeof e.of=="string"?e.of.slice(0,80):""):a("This NYX can't undo a picker load.");if(!t.receivePad)return a("This NYX can't load one pad.");const{kit:o,audio:r}=Ww(e.kit,e.audio,e.pad);return await t.receivePad(o,r,n)}catch(o){return a(`Not loaded: ${o.message}.`)}}function Vw(e,t){const n=Dw(e.location.search),a=e.opener;return!n||!a||e.parent!==e?null:new Kw({self:e,picker:a,origin:n,...t}).start()}function Qw(e){let t=!1,n=Promise.resolve();const a=o=>{const r=n.then(o);return n=r.catch(()=>{}),r};return{pads:()=>e.pads(),can:Mu(e),receivePad:(o,r,i,l)=>a(()=>Nt({type:"pad",kit:JSON.parse(JSON.stringify(o??null)),audio:r,pad:i},e,typeof l=="string"?l.slice(0,80):"")),undo:o=>a(()=>Nt({type:"undo",of:o},e,"")),play:o=>Nt({type:"play",pad:o},e,""),stop:o=>Nt({type:"stop",pad:o},e,""),remove:(o,r)=>a(()=>Nt({type:"remove",pad:o},e,typeof r=="string"?r.slice(0,80):"")),async receive(o,r,i){const l=u=>({ok:!1,placed:[],left:[],message:u});if(t)return l("NYX is still loading the last kit.");let c,d;try{({kit:c,audio:d}=Us(JSON.parse(JSON.stringify(o??null)),i))}catch(u){return l(`Not loaded: ${u.message}.`)}t=!0;try{return await e.receive(c,r==="fill"?"fill":"replace",d)}catch(u){return l(`Not loaded: ${u.message}.`)}finally{t=!1}}}}const Jw="nyx",Zw=1;function Lu(e){const t={nyx:1,...Fs(e)},n=qd(e.pads);if(n.length&&(t.credits=n),Array.isArray(e.slots)){const a=Array.from({length:yn},(r,i)=>{const l=e.slots?.[i];return l?jb(l):null}),o=typeof e.active=="number"&&a[e.active]?e.active:null;Object.assign(t,{slots:a,active:o})}return t}function Tu(e){return Cu(e),eo(e)}function ev(e){Cu(e);const t=e;if(!Array.isArray(t.slots))return null;const n=t.slots,a=Array.from({length:yn},(i,l)=>{const c=n[l];return c&&typeof c=="object"&&!Array.isArray(c)?eo(c):null}),o=t.active,r=typeof o=="number"&&Number.isInteger(o)&&o>=0&&o<yn&&a[o]?o:null;return{slots:a,active:r}}function Cu(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Not a NYX pattern.");const t=e.nyx;if(t!==1)throw new Error(`Not a NYX pattern${typeof t=="number"?` (version ${t})`:""}.`)}function Ys(){try{return globalThis.localStorage??null}catch{return null}}function tv(e,t,n=Ys()){let a;try{a=t?.storageKey?.(e)}catch{a=void 0}if(typeof a!="string"||!a||a===e)return e;try{if(t?.legacyCopy!==!1&&n&&n.getItem(a)===null){const o=n.getItem(e);o!==null&&n.setItem(a,o)}}catch{}return a}const nv="nyx.state",Nu="nyx.scene-samples",av=/^[0-9a-f]{16,64}$/;function Fu(e){try{const t=JSON.parse(e?.getItem(Nu)??"[]");return Array.isArray(t)?t.filter(n=>typeof n=="string"&&av.test(n)):[]}catch{return[]}}function ov(e,t=Ys()){if(!t)return;const n=new Set;for(const o of[e,...e.slots??[]])for(const r of o?.pads??[])r.sample&&n.add(r.sample);if(!n.size)return;const a=[...Fu(t).filter(o=>!n.has(o)),...n].slice(-2048);try{t.setItem(Nu,JSON.stringify(a))}catch{}}function rv(e,t=Ys()){const n=Qn(e);if(!t)return n;try{for(let a=0;a<t.length;a++){const o=t.key(a);if(o?.startsWith(nv))try{for(const r of Qn(Zd(JSON.parse(t.getItem(o)??"null"))))n.add(r)}catch{}}}catch{return null}for(const a of Fu(t))n.add(a);return n}const sv="NYX Sampler",sa="nyx",Me=ko(),K=ow(sa,Me),Pu=tv(nw("nyx.state",Me),K),Xs=.15,E=Wb(Pu),Y=new E0(Me>1?`nyx-${Me}`:"nyx"),So=()=>Ub(Pu,E),ea=Yw(),at=()=>{const e=rv(E);if(e)for(const t of Se?.before??[])t.pad.sample&&e.add(t.pad.sample);if(e)for(const t of Ks)e.add(t);if(e)for(const t of ea.entries())t.before.sample&&e.add(t.before.sample);e&&Y.prune(e)};let ze=!1,kt=0,ge=null,xn=!1,Pt="",z="";const ao=new Map,Gr=new Map,iv=1600,lv=96,Sa=new Map;function zu(e){ao.has(e.hash)||ao.set(e.hash,Ol(e.data)),Gr.has(e.hash)||Gr.set(e.hash,Ol(e.data,iv))}function Du(e){if(!e.sample)return;const t=Gr.get(e.sample);if(!t||e.start<=0&&e.end>=1)return ao.get(e.sample);const n=`${e.sample}:${e.start}:${e.end}`,a=Sa.get(n);if(a)return a;const o=t.length/2,r=Math.max(0,Math.min(o-1,Math.floor(e.start*o))),i=Math.max(r+1,Math.min(o,Math.ceil(e.end*o))),l=[],c=Math.min(lv,i-r);for(let d=0;d<c;d++){const u=r+Math.floor((i-r)*d/c),p=Math.max(u+1,r+Math.floor((i-r)*(d+1)/c));let h=0,m=0;for(let g=u;g<p;g++)h=Math.min(h,t[g*2]??0),m=Math.max(m,t[g*2+1]??0);l.push(h,m)}return Sa.size>256&&Sa.clear(),Sa.set(n,l),l}let Bu=[];const $e=new js;let Rt=new Map,Ou=null;const et=new Cp({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let F=null,un=null;const cv=new _p({...rw(),app:aw(sv,Me),version:"0.1.0",clock:et,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const e=F?.state;return e==="running"?"running":e==="suspended"?"suspended":e?"none":"needs-gesture"},startGate:()=>un?.whenSettled?.()??null}),ta=e=>e+(un?.offset??0),D=()=>et.transport,jt=()=>D().isPlayingAt(re()),It=()=>jt()&&!ze;let nr=null,_=null;const mt=K?Yy(e=>_?.port.postMessage(e),(e,t,n)=>{const a=B(e);return a.sample?cy(a,Y.info(a.sample),D().bpm,n,t,Ue.stretchedFor(e)):null}):null,oo=K?j0({recall:e=>ii(e,"recall",!1),now:re,timeAt:e=>D().running?D().timeAt(e):null}):null,Fe=pw(K,e=>_?.port.postMessage(e),mt?{notes:(e,t)=>mt.notes(e,t),release:(e,t)=>mt.release(e,t),off:(e,t)=>{mt.off(e,t),oo?.off(e,t)},controls:(e,t)=>oo?.controls(e,t)}:null);mt&&setInterval(()=>{const e=D();e.running&&mt.prune(e.beatAt(re()))},5e3);const tt=K&&typeof K.notesOut=="function"?Hy({send:e=>K.notesOut?.(e)===!0,ctx:K.ctx,mapper:{toSharedTime:e=>e-(un?.offset??0)},transport:D,win:window,nameOf:e=>B(e).sample?B(e).name:null,ctxOrigin:(()=>{try{return window.parent.performance.timeOrigin}catch{return performance.timeOrigin}})()}):null,ro=[];let so=!1,He=null,qt=null,Xl=null;const Kr=new Set;function me(){return Xl??=(async()=>{K?(F=K.ctx,nr=K.output,un=K.mapper??new mi(K.ctx)):(F=new AudioContext({latencyHint:"interactive"}),nr=F.destination,un=new mi(F)),un.start();try{await F.audioWorklet.addModule(t0),await F.audioWorklet.addModule(By)}catch{return z="Audio could not start (the sampler's worklet did not load). Reload to try again.",T(),!1}_=new AudioWorkletNode(F,"nyx-sampler",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]}),_.port.onmessage=n=>dv(n.data),He=Sh(F,{moduleUrl:sw()??Mh,bpm:D().bpm,slots:3,state:Wr(E.hacks)}),Vr=Wr(E.hacks),qt=new GainNode(F,{gain:E.master}),_.connect(He.input);const e=new AudioWorkletNode(F,mb,{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),t=yb(F);He.output.connect(qt).connect(e).connect(t.input),t.output.connect(nr),Eh(He,et,{toAudioTime:ta,now:re});for(const n of Qn(E))await ot(n);return Wt(),_.port.postMessage({type:"sig",sig:kn?.signals()??cn()}),Fe?.resend(),so&&_.port.postMessage({type:"hitlog",on:!0}),$n(),!0})(),Xl}async function ot(e){const t=await Y.get(e);return t?(zu(t),_&&!Kr.has(e)&&(Kr.add(e),_.port.postMessage({type:"sample",hash:e,channels:t.data.map(n=>n.slice()),rate:t.sampleRate})),t):null}function dv(e){if(e.type==="skip"&&e.hits){Tv(e.hits);return}if(e.type==="hitlog"&&e.hits&&so){for(const t of e.hits)ro.length<2e4&&ro.push(t);return}e.type!=="pos"||!e.voices||(Bu=e.voices,$e.report(e.voices,performance.now()),ei(),Rt=new Map(e.voices.map(([t,n,a,o])=>{const r=G0(o)?Ue.cache.byId(o):void 0,i=r?Y.info(r.job.sample):void 0;return r&&i?[t,(r.job.from+n/r.frames*(r.job.to-r.job.from))/i.frames]:[t,n/Math.max(1,a)]})))}let Ba=null,uv=0;const In=new Map,Ru=[],pv=.25;function hv(){if(Ba)return Ba;const e=new Worker(new URL("/nyx/assets/stretch-worker-DVLOsvIo.js",import.meta.url),{type:"module"});return e.onmessage=t=>{const n=t.data;In.get(n.id)?.(n),In.delete(n.id)},e.onerror=t=>{console.error("NYX stretch worker",t.message);for(const n of In.values())n({error:t.message||"worker failed"});In.clear()},Ba=e,e}async function Iu(e){const t=await Y.get(e.sample);if(!t)return null;const n=Math.ceil(pv*e.sampleRate),a=Math.max(0,e.from-n),o=Math.min(t.frames,e.to+n),r=t.data.map(c=>c.slice(a,o)),i=++uv,l=hv();return new Promise(c=>{In.set(i,d=>{if(d.error||!d.channels){console.error("NYX stretch",d.error),c(null);return}typeof d.ms=="number"&&Ru.push(Math.round(d.ms)),c(d.channels)}),l.postMessage({id:i,channels:r,sampleRate:e.sampleRate,from:e.from-a,to:e.to-a,frames:e.frames,semitones:e.semitones},r.map(d=>d.buffer))})}const Ue=new V0({run:Iu,deliver(e,t){_?.port.postMessage({type:"sample",hash:e.sample,channels:t,rate:e.job.sampleRate},t.map(n=>n.buffer))},drop(e){_?.port.postMessage({type:"drop",hash:e.sample})},changed(){Ue.failed&&!z&&(z="Keep pitch couldn't start in this browser: fitted pads change speed and pitch instead."),Wt(),T()}});function Wt(){if(kn?.update(E.pads),!_)return;const e=D().bpm,t=n=>Y.info(n);Ue.plan(E.pads,t,e),_.port.postMessage({type:"program",program:dy(E,t,e,n=>Ue.stretchedFor(n))})}let Gl="";function $n(e=!1){if(!_)return;const t=D(),n=jt(),a=It();let o=0,r=t.bpm;if(t.running||t.isPlayingAt(re())){const l=Math.max(0,t.beatAt(re())),c=t.timeAt(l);r=60/(t.timeAt(l+1)-c),o=ta(c)-l*60/r}const i=JSON.stringify([n,a,Math.round(o*2e3),r,kt]);!e&&i===Gl||(Gl=i,_.port.postMessage({type:"clock",clock:{playing:n,pattern:a,zero:o,bpm:r,join:kt}}))}let Vr=null;function qu(){if(!He)return;const e=Wr(E.hacks),t=Cy(Vr,e);if(Vr=e,t.whole)He.setState(e);else for(const[n,a,o]of t.params)He.setParam(n,a,o)}let Un=null;function fv(){if(Un){const t=Un;ee(()=>{E.lanes=t}),z="Pattern back.",T();return}const e=structuredClone(E.lanes);e.some(t=>t.steps.some(n=>n.on)||t.mute||t.solo||t.length!==le)&&(ee(()=>{E.lanes=E.lanes.map(()=>wo())}),ge=null,Un=e,z="Pattern cleared: press Undo to bring it back.",T())}function ee(e){Un=null;const t=Qs(!1);e(),t&&at(),E.active!==null&&(xn=!0),Pt="",So(),Wt(),qu(),T()}const B=e=>E.pads[e]??Xe(e),Ne=e=>E.lanes[e]??wo(),ia=()=>B(E.selected);function Ye(e,t=E.selected){ee(()=>e(B(t)))}async function mv(e,t){const n=B(e);if(n.normalize){Ye(o=>{o.normalize&&(o.normalize.on=t)},e);return}if(!n.sample)return;let a;if(n.provenance)a={on:t,gainDb:0};else{const o=Y.held(n.sample)??await Y.get(n.sample);if(!o)return;a={...bn(o.data,o.sampleRate),on:t}}Ye(o=>{o.sample===n.sample&&(o.normalize=a)},e)}function io(e,t,n){ee(()=>{const a=Ne(e).steps[t];a&&n(a)})}function De(e,t=!0,n=!1){E.selected=Math.max(0,Math.min(Q-1,e)),ge&&ge.lane!==E.selected&&(ge=null),t&&je(E.selected,null,!1,n),So(),T()}function Kl(e,t,n,a){if(!_)return!1;const o=B(e),r=o.sample?Y.info(o.sample):void 0,i=o.sample?cu(o,r,D().bpm,t,Ue.stretchedFor(e)):null;return i&&(_.port.postMessage({type:"play",pad:e,hit:i,hold:n,manual:!0,toggle:a}),a&&$e.has(e)?$e.stopped(e):$e.posted(e,Qy(i,r?.sampleRate??48e3),performance.now())),!0}async function je(e,t=null,n=!1,a=!1){F?.state==="running"&&Kl(e,t,n,a)||!await me()||!F||!_||(F.state!=="running"&&await F.resume().catch(()=>{}),Kl(e,t,n,a))}let Oa=gy();const _t=new Map;function la(e){return e.kind?{kind:e.kind,bpm:e.bpm}:e.origin==="local"?Is(e.title):{kind:"",bpm:0}}function Ao(e,t){_t.delete(e);const n=B(e),a=n.sample?Y.info(n.sample):void 0;if(!Oa||!t||!n.sample||!a)return;const o=fy(a.frames/a.sampleRate,t,D().bpm,Rs);o&&(_t.set(e,{sample:n.sample,fit:o,before:{fit:n.fit,keepPitch:n.keepPitch}}),n.fit=o.bars,n.keepPitch=!0)}function gv(e){const t=_t.get(e);mu(t,B(e))&&(_t.delete(e),Ye(n=>yy(t,n),e),z=`Fit undone: ${Be(e)} plays as recorded.`,T())}async function Ut(e,t,n,a,o=!0,r=null,i=null,l=null,c=0,d=null){const{sample:u,saved:p}=await Y.put(t,n);await ot(u.hash),ee(()=>{const h=B(e);h.sample=u.hash,h.provenance=r,h.rights=d,h.normalize=l?{...l}:null,h.offsetDb=c,h.name=a.slice(0,24)||`Pad ${e+1}`,h.start=0,h.end=1,h.slices=0,h.cuts=[],h.fit=0,h.keepPitch=!0,h.follow=null,h.note=0,Ao(e,i)}),z=p?"":"Kept until you reload: this browser has no file storage here.",at(),o&&je(e)}async function Gs(e,t=E.selected){if(/\.json$/i.test(e.name)||e.type==="application/json"){await Iv(e);return}if(!await me()||!F)return;let n;try{n=await F.decodeAudioData(await e.arrayBuffer())}catch{z=`Couldn't read ${e.name}: not an audio file this browser can decode.`,T();return}const{data:a,trimmed:o}=ku(n);await Ut(t,a,n.sampleRate,e.name.replace(/\.[^.]+$/,""),!0,null,Is(e.name),bn(a,n.sampleRate)),o&&(z=`${e.name} was cut to its first minute.`,T())}const Ks=new Set;let Se=null;function Be(e,t=B(e).name){const n=`Pad ${e+1}`;return t===n?n:`${n} (${t})`}async function Vs(e,t,n=""){return B(e).sample?Nc({title:`Replace ${Be(e)}?`,body:t==="Grab"?"Grab replaces its sound, its slices and that lane's steps. Undo brings them back.":t==="Sent"?`${n} replaces its sound, its slices and that lane's steps. Undo brings them back.`:"The take replaces its sound, its slices and that lane's steps when it lands. Undo brings them back.",confirmLabel:"Replace",cancelLabel:"Cancel"}):!0}function Oe(e){const t=Ns(E,e);return t.pad.sample&&Ks.add(t.pad.sample),t}function Ge(e,t,n){Qs();const a=Array.isArray(e)?e:[e],o=a[0],r=xg({message:n??(o?.pad.sample?`${t}: replaced ${Be(o.index,o.pad.name)}.`:`${t} onto Pad ${(o?.index??0)+1}.`),actionLabel:"Undo",onAction:()=>void Js(),onClose:()=>{Se&&(Se.toast=null)}}),i=r.el.querySelector("button");i instanceof HTMLElement&&U(i,I("grab-undo"),i),Se={before:a,what:t,toast:r};for(const l of a)l.pad.sample&&Ks.delete(l.pad.sample)}function Qs(e=!0){if(!Se)return!1;const t=Se;return Se=null,t.toast?.close(),e&&at(),!0}async function Js(){const e=Se;if(!e)return!1;Se=null,e.toast?.close();for(const n of e.before)n.pad.sample&&await ot(n.pad.sample);ee(()=>{for(const n of e.before)Bb(E,n)}),ge&&e.before.some(n=>n.index===ge?.lane)&&(ge=null);const t=e.before[0];return z=e.before.length===1&&t?`Undone: ${Be(t.index)} is back as it was.`:`Undone: pads ${e.before.map(n=>n.index+1).join(", ")} are back as they were.`,at(),T(),!0}let ar=null;function _u(){return ar??=fetch(Rg,{mode:"cors"}).then(e=>{if(!e.ok)throw new Error(`Library: HTTP ${e.status}`);return e.json()}).then(e=>_g(e)).catch(e=>{throw ar=null,e}),ar}const Eo=new Nw;Eo.restore();const Hu=e=>`${e.id}#${e.sha256}`,Pn=new Map;function bv(e){const t=Hu(e);let n=Pn.get(t);return!n&&e.origin==="local"&&(n=Eo.bytes(e),n.catch(()=>Pn.delete(t)),Pn.set(t,n)),n||(n=(async()=>{const a=await fetch(e.audio,{mode:"cors"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const o=await a.arrayBuffer(),r=new Uint8Array(await crypto.subtle.digest("SHA-256",o));if(Array.from(r,l=>l.toString(16).padStart(2,"0")).join("")!==e.sha256)throw new Error("the file isn't the one the Library lists");return o})(),n.catch(()=>Pn.delete(t)),Pn.set(t,n)),n}const or=new Map;async function ju(e){if(!await me()||!F)throw new Error("NYX's audio didn't start");const t=F,n=Hu(e);let a=or.get(n);return a||(a=bv(e).then(o=>t.decodeAudioData(o.slice(0))),a.catch(()=>or.delete(n)),or.set(n,a)),a}const Wu=e=>10**(e/20);async function Uu(e){return Qr(await ju(e),e)}function Qr(e,t){const{data:n}=ku(e),a=Wu(t.measures.gain);for(const o of n)for(let r=0;r<o.length;r++)o[r]=(o[r]??0)*a;return{data:n,rate:e.sampleRate}}let pn=null;function Yu(){const e=pn;pn=null;try{e?.src.stop()}catch{}}async function Xu(e){Yu();let t;try{t=await ju(e)}catch(r){Zs(`Couldn't play ${e.title}: ${r.message}.`);return}if(!F||!qt)return;F.state!=="running"&&await F.resume().catch(()=>{});const n=new AudioBufferSourceNode(F,{buffer:t}),a=new GainNode(F,{gain:Wu(e.measures.gain)*Sb});n.connect(a).connect(qt);const o={src:n,id:e.id};pn=o,await new Promise(r=>{n.onended=()=>{a.disconnect(),pn===o&&(pn=null),r()},n.start()})}function Zs(e){z=e,T()}async function Mo(e,t,n=E.selected){let a;try{a=await Uu(e)}catch(r){return Zs(`Couldn't load ${e.title}: ${r.message}.`),!1}const o=Oe(n);return await Ut(n,a.data,a.rate,gn(e.title),!0,yo(e,t),la(e),db),z=`${e.title} on Pad ${n+1}: ${e.creator}, ${$s(e.license,e.licenseStatus,e.permission)}${Rd(e)?" (personal use)":""}.`,Ge(o,"Library"),T(),!0}async function yv(e,t){if(!await me())return!1;const n=await Promise.all(e.map(l=>Uu(l.sound).then(c=>({ok:!0,...c}),c=>({ok:!1,error:`${l.sound.title}: ${c.message}`})))),a=n.flatMap(l=>l.ok?[]:[l.error]);if(a.length)return Zs(`The kit couldn't load (${a.join("; ")}). The pads are as they were.`),!1;const o=[];for(const l of n){if(!l.ok)continue;const c=await Y.put(l.data,l.rate);await ot(c.sample.hash),o.push(c)}for(let l=0;l<e.length;l++)Oe(l);let r=[];ee(()=>{r=vo(E,e.map((l,c)=>({sample:o[c]?.sample.hash??"",name:gn(l.sound.title),provenance:yo(l.sound,t),hat:l.slot.role==="hat"}))),e.forEach((l,c)=>Ao(c,la(l.sound)))});const i=e.flatMap(l=>l.note?[l.note]:[]);return z=`Kit on pads 1–${e.length}${t.trim()?` for "${t.trim()}"`:""}; the pattern stays.${i.length?` ${i.join(" ")}`:""}${o.some(l=>!l.saved)?" Kept until you reload: this browser has no file storage here.":""}`,Ge(r,"Build kit",`Build kit: pads 1–${e.length} replaced.`),at(),T(),!0}async function wv(e,t){const n=[];for(const c of e){const d=await Y.put(c.data,c.rate);await ot(d.sample.hash),n.push(d)}if(t)for(let c=0;c<Q;c++)Oe(c);else for(const c of e)Oe(c.index);const a=e.map((c,d)=>({index:c.index,sample:n[d]?.sample.hash??"",name:gn(c.sound.title),provenance:yo(c.sound,""),hat:!1}));let o=[];ee(()=>{o=t?Ob(E,a):vo(E,a);for(const c of e)Ao(c.index,la(c.sound))});const r=e.map(c=>c.index+1).join(", "),i=t&&o.some(c=>c.pad.sample),l=n.some(c=>!c.saved)?" Kept until you reload: this browser has no file storage here.":"";z=i?`From the sample picker: everything replaced, pad${e.length===1?"":"s"} ${r} loaded; the pattern stays.${l}`:`From the sample picker: pad${e.length===1?"":"s"} ${r}; the pattern stays.${l}`,Ge(o,"Sample picker",i?"Sample picker: replaced everything in NYX.":`Sample picker: pad${e.length===1?"":"s"} ${r} loaded.`),at(),T()}async function vv(e,t){const n=await Y.put(e.data,e.rate);await ot(n.sample.hash),Oe(e.index);let a=[];ee(()=>{a=vo(E,[{index:e.index,sample:n.sample.hash,name:gn(e.sound.title),provenance:yo(e.sound,""),hat:!1}]),Ao(e.index,la(e.sound))});const o=a[0];o&&ea.record(t,{index:e.index,before:o.pad,after:n.sample.hash}),z=`From the sample picker: pad ${e.index+1}; the pattern stays.${n.saved?"":" Kept until you reload: this browser has no file storage here."}`,Ge(a,"Sample picker",`Sample picker: pad ${e.index+1} ← ${gn(e.sound.title)}.`),at(),T()}async function xv(e){const t=ea.get(e),n=Xw(t,t?B(t.index).sample??"":null);return n||!t?{ok:!1,placed:[],left:[],message:n??""}:(t.before.sample&&await ot(t.before.sample),ee(()=>{E.pads[t.index]=structuredClone(t.before)}),ea.drop(e),z=`Undone: ${Be(t.index)} is back as it was.`,at(),T(),{ok:!0,placed:[],left:[],message:`Undone: pad ${t.index+1} is back as it was.`})}function kv(e,t){const n=e-1,a=B(n);if(!a.sample)return{ok:!1,placed:[],left:[],message:`Pad ${e} is already empty.`};const o=structuredClone(a),r=Be(n,a.name);return ua(n)?(t&&ea.record(t,{index:n,before:o,after:""}),z=`From the sample picker: ${r} removed from pad ${e}; its steps stay.`,T(),{ok:!0,placed:[],left:[],message:`Removed ${r} from pad ${e}.`}):{ok:!1,placed:[],left:[],message:`Pad ${e} wasn't removed.`}}let Vl="";function ei(){const e=$e.pads().join(",");e!==Vl&&(Vl=e,Ku?.update(),Vu?.changed())}async function $v(e){const t=e-1;if(!B(t).sample)return{ok:!1,placed:[],left:[],message:`Pad ${e} is empty.`};const n=$e.has(t);return!await Promise.race([je(t,null,!1,!0).then(()=>!0),new Promise(o=>setTimeout(()=>o(!1),1500))])||F?.state!=="running"?{ok:!1,placed:[],left:[],message:"NYX's sound isn't on yet: click anywhere in the Studio tab once, then try again."}:(ei(),{ok:!0,placed:[],left:[],message:n?`Pad ${e} stopped.`:`Pad ${e} plays.`})}async function Sv(e){const t=e===0?$e.pads():[e-1];for(const n of t)_?.port.postMessage({type:"halt",pad:n}),$e.stopped(n);return ei(),T(),{ok:!0,placed:[],left:[],message:e===0?"Stopped.":`Pad ${e} stopped.`}}const zn=new Map;function Av(e){if(!e.sample)return"";const t=`${e.sample}:${e.start}:${e.end}`,n=zn.get(t);if(n!==void 0)return n;const a=jw(Du(e));return a&&zn.set(t,a),zn.size>64&&zn.delete(zn.keys().next().value),a}const Gu={pads:()=>E.pads.map((e,t)=>{const n=Ne(t);return{pad:t+1,name:e.name,filled:!!e.sample,fp:e.sample?e.provenance?.sha256??"":"",sid:e.sample?e.provenance?.id??"":"",wave:Av(e),used:n.steps.slice(0,n.length).some(a=>a.on),playing:!!e.sample&&$e.has(t)}}),receivePad:(e,t,n)=>Uw(e,t,n,{decode:async(a,o)=>{if(!await me()||!F)throw new Error("NYX's audio didn't start");return Qr(await F.decodeAudioData(o),a)},place:vv}),undo:xv,play:$v,stop:Sv,remove:async(e,t)=>kv(e,t),receive:(e,t,n)=>Iw(e,t,n,{filled:()=>Array.from({length:Q},(a,o)=>!!E.pads[o]?.sample),padName:a=>B(a).name,ask:a=>(K?.reveal?.(),Nc({...a,confirmLabel:"Load",cancelLabel:"Cancel"})),decode:async(a,o)=>{if(!await me()||!F)throw new Error("NYX's audio didn't start");return Qr(await F.decodeAudioData(o),a)},place:wv})},Ku=K?null:Vw(window,Gu),Vu=K?.pickerTarget?.(Qw(Gu))??null;function ti(e){const t=B(e).provenance,n=t?Ee.catalogFor(t.origin):null;if(!t||!n)return[];const a=new Set(E.pads.flatMap((o,r)=>r!==e&&o.provenance?[o.provenance.id]:[]));return nb(n,t,a).map(o=>o.sound)}const Ee=new xw({catalog:_u,target:()=>({index:E.selected,title:Be(E.selected)}),pads:()=>E.pads,preview:Xu,stopPreview:Yu,load:(e,t)=>Mo(e,t),chop:(e,t)=>Nv(e,t),buildKit:yv,close:()=>$t(!1),local:Eo}),ni=new hw(typeof Worker>"u"?null:()=>new Worker(new URL("/nyx/assets/chop-worker-CbuieNQN.js",import.meta.url),{type:"module"})),Lo=new Map;async function Ev(){const e=E.selected,t=B(e);if(!t.sample)return null;const n=await Y.get(t.sample);if(!n)return null;const a=Math.floor(t.start*n.frames),o=Math.min(n.frames,Math.ceil(t.end*n.frames)),r=Lo.get(e),i=r&&r.sample===t.sample?r:null;return{sample:t.sample,stem:w0(t.name),data:n.data,sampleRate:n.sampleRate,from:a,to:o,pad:e,tempo:f0({seconds:(o-a)/n.sampleRate,fit:t.fit,given:i?.bpm??0,givenFrom:i?.from,name:t.name,studioBpm:D().bpm})}}async function Mv(e,t,n){if(!await me()||!F||!_)return;F.state!=="running"&&await F.resume().catch(()=>{}),await ot(e.sample);const o={...B(e.pad),start:0,end:1,slices:0,cuts:[],fit:0,tune:0,fine:0,dir:"fwd",mode:"oneshot"},r=cu(o,Y.info(e.sample),D().bpm,null);r&&_.port.postMessage({type:"play",pad:e.pad,hit:{...r,from:t,to:n}})}function Lv(e,t,n){const a=Y.info(e.sample);if(!a)return;const o=Math.min(t.cuts.length-1,Q-n.first);if(o<1)return;const r=Array.from({length:o},(d,u)=>Oe(n.first+u)),i=B(e.pad),l={provenance:i.provenance?structuredClone(i.provenance):null,rights:i.rights,normalize:i.normalize?{...i.normalize}:null,offsetDb:i.offsetDb,levelDb:i.levelDb,note:i.note},c=n.choke?v0(E.pads,n.first,o):0;ee(()=>{x0(E,t,{sample:e.sample,frames:a.frames,sampleRate:e.sampleRate,first:n.first,stem:e.stem,source:l,choke:c,playBack:n.playBack?{bpm:n.bpm}:null});for(let d=0;d<o;d++)_t.delete(n.first+d),Lo.delete(n.first+d)}),Ht.close(),Ge(r,"Chop",`Chopped ${e.stem} onto pads ${n.first+1}–${n.first+o}.`),De(n.first,!1),T()}const Ht=new mw({source:Ev,analysis:e=>ni.analysis(e.sample,e.data,e.sampleRate,e.from,e.to),pads:()=>E.pads,audition:(e,t,n)=>void Mv(e,t,n),apply:Lv,close:()=>{Ht.close(),T()}});async function ca(){Ee.isOpen&&$t(!1),await Ht.open()&&(T(),Ht.el.scrollIntoView?.({block:"nearest",behavior:"smooth"}))}function Qu(){const e=D();return jt()?e.beatAt(re()):(F?.currentTime??performance.now()/1e3)*Math.max(1,e.bpm)/60}const kn=K?H0(K,e=>{_?.port.postMessage({type:"sig",sig:e})},Qu):null;function Ql(e){const t=e.sample?Y.info(e.sample):void 0;if(!t||e.length==="free"||e.slices||e.fit)return e.end;const n=no(e,t,D().bpm);return Math.min(1,e.start+Va(e.length,D().bpm,t.sampleRate,n)/t.frames)}const da=new e0({sample:()=>{const e=E.selected,t=B(e),n=t.sample?Y.held(t.sample):void 0;return!t.sample||!n?null:{index:e,pad:t,data:n.data,sampleRate:n.sampleRate,frames:n.data[0]?.length??0}},bpm:()=>D().bpm,beat:Qu,signals:()=>kn?.signals()??cn(),aria:()=>kn?.source()??null,edit:e=>Ye(e),audition:()=>void je(E.selected,null,!1,!0),playPos:()=>Rt.get(E.selected)??null,close:()=>{da.close(),T()}});document.body.append(da.el);Ou=da;async function To(){const e=ia();e.sample&&(Y.held(e.sample)||await Y.get(e.sample),da.open()&&T())}function Ju(e){const n=!!ia().sample;for(const a of e.querySelectorAll('.nc-canvas[data-nc-id="wave"]')){const o=a.closest(".nc-field")??a;if(n){a.dataset.nyxRgnOpen!==""&&(a.dataset.nyxRgnOpen="",o.dataset.nyxRgnOpen=""),a.getAttribute("role")!=="button"&&a.setAttribute("role","button"),a.tabIndex!==0&&(a.tabIndex=0);const r=`Edit region of pad ${E.selected+1}`;a.getAttribute("aria-label")!==r&&a.setAttribute("aria-label",r),a.title!=="Edit region"&&(a.title="Edit region")}else a.dataset.nyxRgnOpen===""&&(delete a.dataset.nyxRgnOpen,delete o.dataset.nyxRgnOpen,a.removeAttribute("role"),a.removeAttribute("aria-label"),a.removeAttribute("tabindex"),a.title="")}}function Zu(e){return e.target?.closest?.('.nc-canvas[data-nc-id="wave"][data-nyx-rgn-open]')??null}document.addEventListener("click",e=>{Zu(e)&&(e.preventDefault(),To())});document.addEventListener("keydown",e=>{e.key!=="Enter"&&e.key!==" "||e.repeat||!Zu(e)||(e.preventDefault(),e.stopImmediatePropagation(),To())});const Jr=[];function Tv(e){const t=Hr*6e4/Math.max(1,D().bpm);for(const[n,a]of e){if(n===void 0||a===void 0)continue;Jr.length<2e3&&Jr.push([n,a]);const o=Ne(n).length,r=Math.floor(a/Hr+1e-6)%o;for(const i of document.querySelectorAll(`.nc-page [data-nc-step="pad-${n}:${r}"]`)){i.dataset.nyxSkip="";const l=Number(i.dataset.nyxSkipT??0);l&&clearTimeout(l),i.dataset.nyxSkipT=String(setTimeout(()=>{delete i.dataset.nyxSkip,delete i.dataset.nyxSkipT},Math.max(450,t*2)))}}}async function Cv(e){const t=E.selected,n=Oe(t);await sp(e);const a=B(t).sample;a&&(e.bpm>0&&Lo.set(t,{sample:a,bpm:e.bpm,from:"from the take"}),Ge(n,`LUCY take ${e.id}`),await ca())}async function Nv(e,t){const n=E.selected;if(!await Mo(e,t,n))return;const a=B(n).sample,o=la(e);a&&o.bpm>0&&Lo.set(n,{sample:a,bpm:o.bpm,from:"from My samples"}),$t(!1),await ca()}function $t(e=!Ee.isOpen,t){e?Ee.open(t):Ee.closePanel(),T(),e?Ee.focus():oe.querySelector('[data-nc-section="pads"] [data-nc-id="library"]')?.focus()}const V={from:"master",bars:1,busy:!1};async function ai(){const e=xt();if(!e||V.busy||!await me()||!F)return;const t=D();if(!t.running){z="Play first: Grab takes the bars that just played.",T();return}const n=V.bars,a=Math.floor(t.beatAt(re())/4)*4,o=a-4*n;if(o<0){z=`Grab needs ${n} whole bar${n===1?"":"s"} played first.`,T();return}const r=F.sampleRate,{from:i,to:l}=Z0({from:Math.round(ta(t.timeAt(o))*r),to:Math.round(ta(t.timeAt(a))*r)},Au(e,V.from)),c=E.selected;if(V.busy=!0,T(),!await Vs(c,"Grab")){V.busy=!1,T();return}const d=e.takeResult?await e.takeResult(V.from,i,l):{channels:await e.take(V.from,i,l)},u=d.channels;V.busy=!1;const p=e.sources().find(g=>g.id===V.from)?.name??V.from;if(!u){z="reason"in d&&d.reason==="gone"?`Those bars of ${p} are gone (the Studio keeps the last 20 seconds): Grab again.`:`${p} isn't kept that far back yet: let it play ${n} more bar${n===1?"":"s"}, then Grab again.`,T();return}let h=0;for(const g of u)for(const v of g)h=Math.max(h,Math.abs(v));if(h<1e-4){z=`${p} was silent for those ${n===1?"bar":"bars"}.`,T();return}const m=Oe(c);await Ut(c,u,r,`${p} grab`,!0,null,null,null,-5),n===1?(ee(()=>{const g=B(c);g.fit=1,g.keepPitch=!0,g.slices=16,g.cuts=[],g.decay=4;const v=Ne(c);v.length=le;for(const f of v.steps)Object.assign(f,ra(),{on:!0})}),z=`Grabbed a bar of ${p}: 16 slices, every step on. Move, mute or lock steps to remix it.`):(Ye(g=>{g.fit=n,g.keepPitch=!0},c),await Zr(8,"transients",c),z=`Grabbed ${n} bars of ${p}, fitted to ${n} bars and sliced at the hits.`),Ge(m,`Grabbed ${n===1?"a bar":`${n} bars`}`),T()}const Jl=240,Fv=.25,L={phase:"idle",startBeat:0,pad:0,source:"master",rec:null,timer:0,lastBar:0,lastBarFrame:0,fromFrame:0,latency:0,bpm:120,warned:!1,label:""};function oi(e){const t=Math.floor(e/4)*4;return e-t<Fv?t:t+4}function Pv(e){const t=F?.sampleRate??48e3;return Math.round(ta(D().timeAt(e))*t)}function ep(e){const t=F?.sampleRate??48e3;return L.fromFrame+Math.round((e-L.startBeat)*60/L.bpm*t)}function lo(e=L.source){return xt()?.sources().find(t=>t.id===e)?.name??e}function ri(){L.phase==="idle"?zv():L.phase==="armed"?(L.phase="idle",z="",T()):L.phase==="rec"&&si()}async function zv(){const e=xt();if(!e?.record){z="Take needs the Studio (reload it to update).",T();return}if(!await me()||!F)return;const t=E.selected;if(await Vs(t,"Take")&&L.phase==="idle"){if(L.source=V.from,L.pad=t,e.listen(L.source),!D().running){L.phase="armed",z="Take armed: starts with the music.",T();return}tp()}}function tp(){const e=xt();if(!e?.record||!F){L.phase="idle";return}const t=D();L.startBeat=Math.max(0,oi(t.beatAt(re()))),L.fromFrame=Pv(L.startBeat),L.bpm=t.bpm,L.latency=Au(e,L.source);const n=e.record(L.source,L.fromFrame+L.latency);if(!n){L.phase="idle",z=`${lo()} can't be recorded.`,T();return}L.rec=n,L.phase="rec",L.warned=!1,L.lastBar=L.startBeat,L.lastBarFrame=L.fromFrame,z=`Taking ${lo()}: stop on any bar.`,window.clearInterval(L.timer),L.timer=window.setInterval(Dv,200),T()}function Dv(){if(L.phase!=="rec")return;const e=D();if(!e.running)return;const t=e.beatAt(re()),n=Math.floor(t/4)*4;n>L.lastBar&&(L.lastBar=n,L.lastBarFrame=ep(n));const a=240/Math.max(1,e.bpm),o=(Math.max(L.startBeat+4,oi(t))-L.startBeat)*60/Math.max(1,e.bpm);if(o+a>Jl){si();return}!L.warned&&o>Jl-30&&(L.warned=!0,z="Take stops at four minutes: about 30 seconds left.");const r=np();r!==L.label&&(L.label=r,T())}function np(){if(L.phase==="armed")return"Armed: waits for Play";if(L.phase==="saving")return"Saving take…";if(L.phase!=="rec")return"Take";const e=D().beatAt(re());return e<L.startBeat?"Starts on the bar…":`Stop take · bar ${Math.floor((e-L.startBeat)/4)+1}`}async function si(e=!1){const t=L.rec;if(L.phase!=="rec"||!t)return;window.clearInterval(L.timer);let n,a;e?(n=L.lastBar,a=L.lastBarFrame):(n=Math.max(L.startBeat+4,oi(D().beatAt(re()))),a=ep(n));const o=Math.round((n-L.startBeat)/4);if(L.rec=null,o<1){t.cancel(),L.phase="idle",z="The music stopped before a whole bar was taken.",T();return}L.phase="saving",T();try{await Bv(t,a,o,n)}finally{L.phase="idle",T()}}async function Bv(e,t,n,a){let o=null;try{o=await e.stop(t+L.latency)}catch(l){console.error("NYX take",l)}const r=lo();if(!o?.[0]?.length){z=`The take from ${r} came back empty.`,T();return}let i=0;for(const l of o)for(const c of l)i=Math.max(i,Math.abs(c));if(i<1e-4){z=`${r} was silent for the whole take.`,T();return}try{await Ov(o,n,a,r)}catch(l){console.error("NYX take",l),z=`The take from ${r} couldn't be kept (${l instanceof Error?l.message:String(l)}).`,T()}}async function Ov(e,t,n,a){const o=L.pad,r=`${a} take`.slice(0,20),i=E.pads.filter(d=>d.name.startsWith(r)).length+1,l=Oe(o);await ap(o,e,F?.sampleRate??48e3,t,Math.round(L.startBeat/4),{name:`${r} ${i}`,endBeat:n,offsetDb:-5}),Ge(l,`Took ${t===1?"a bar":`${t} bars`}`),z=t<=Vn?`${t} bar${t===1?"":"s"} of ${a} on ${B(o).name}: it loops every ${t===1?"bar":`${t} bars`}. Tap the pad to play it any time.`:`${t} bars of ${a} on ${B(o).name}. Longer than ${Vn} bars, so it plays from the pad (tap or hold it), not the grid.`,T()}async function ap(e,t,n,a,o,r){await Ut(e,t,n,r.name,!1,null,null,r.normalize??null,r.offsetDb??0,r.rights??null);const i=a<=Vn;ee(()=>Rb(E,e,a,o));const l=D(),c=r.endBeat;if(c!==void 0&&i&&l.running&&_&&F){const d=B(e),u=Ne(e).steps[0],p=u?xo(d,0,u,Y.info(d.sample??""),l.bpm,!1,Ue.stretchedFor(e)):null,m=l.beatAt(re()+Xs)-c;if(p&&m>0&&m<4*a){const g=Math.round(m*60/l.bpm*n*p.rate);p.from+g<p.to-1&&_.port.postMessage({type:"play",pad:e,hit:{...p,from:p.from+g,attack:.005}})}}}let rr=!1;function op(){return E.pads.map((e,t)=>({id:String(t+1),name:Be(t),...e.sample?{filled:!0}:{}}))}async function rp(e,t){const n=Ib(t,E.pads.length);if(n<0)return{ok:!1,reason:"refused",message:`NYX has no pad ${t}.`};if(rr||L.phase!=="idle"&&L.pad===n)return{ok:!1,reason:"busy",message:`Pad ${n+1} is busy: try again in a moment.`};if(!await me()||!F)return{ok:!1,reason:"refused",message:"NYX's audio didn't start."};rr=!0;try{const a=`${e.fromName}'s ${e.name}`;if(De(n,!1),K?.reveal?.(),T(),B(n).sample&&!await Vs(n,"Sent",a))return z=`Kept ${Be(n)}: ${a} was not placed.`,T(),{ok:!1,reason:"cancelled"};const o=e.channels.map(d=>new Float32Array(d)),r=e.bars,i=Oe(n),l=e.name.slice(0,24),c=e.rights==="unknown"?"unknown":null;return r!==void 0&&Number.isInteger(r)&&r>=1?(await ap(n,o,e.sampleRate,r,0,{name:l,normalize:bn(o,e.sampleRate),rights:c}),z=r<=Vn?`${a} on Pad ${n+1}: fitted to ${r===1?"a bar":`${r} bars`}, it loops every ${r===1?"bar":`${r} bars`}.`:`${a} on Pad ${n+1}: ${r} bars, so it plays from the pad, not the grid.`):(await Ut(n,o,e.sampleRate,l,!1,null,null,bn(o,e.sampleRate),0,c),z=`${a} on Pad ${n+1}.`),Ge(i,a),T(),{ok:!0,target:t,targetName:Be(n)}}finally{rr=!1}}async function sp(e){const t=await M0(e);if(!t){z=`LUCY take ${e.id} could not be read.`,T();return}await Ut(E.selected,t,e.sampleRate,`LUCY take ${e.id}`,!0,null,null,bn(t,e.sampleRate),0,e.rights)}function ua(e=E.selected){const t=B(e);if(!t.sample)return!1;const n=t.sample;_?.port.postMessage({type:"silence",pad:e});const a=Oe(e);return ee(()=>{E.pads[e]=Xe(e)}),ge?.lane===e&&(ge=null),E.pads.some(o=>o.sample===n)||(_?.port.postMessage({type:"drop",hash:n}),Kr.delete(n)),Ge(a,"Remove",`Removed ${Be(e,a.pad.name)}.`),z="",T(),!0}async function Zr(e,t,n=E.selected){const a=B(n);let o=[];if(e&&t==="transients"&&a.sample){const r=await Y.get(a.sample);if(r){const i=Math.floor(a.start*r.frames),l=Math.min(r.frames,Math.ceil(a.end*r.frames));o=h0(await ni.analysis(a.sample,r.data,r.sampleRate,i,l),e)}}Ye(r=>{r.slices=e,r.cuts=o},n)}function ii(e,t,n=!0){const a=Kd[e]??String(e+1);if(Qs(),t==="store")E.slots[e]=Fs(E),E.active=e,xn=!1,Pt=`Stored in ${a}`;else if(t==="clear")E.slots[e]=null,E.active===e&&(E.active=null),Pt=`Cleared ${a}`,at();else{const o=E.slots[e];if(!o){Pt=`${a} is empty: Shift-click or long-press to store`,T();return}ip(o),E.active=e,xn=!1,Pt=`Recalled ${a}`,n&&tt?.slot(e)}So(),Wt(),qu(),T()}function ip(e){const t=structuredClone(e);E.pads=t.pads,E.lanes=t.lanes,E.swing=t.swing,E.hacks=t.hacks,ge=null;for(const n of Qn(E))ot(n).then(()=>Wt())}async function Co(){await me(),F&&F.state!=="running"&&await F.resume().catch(()=>{});const e=Ay({embedded:K!==null,running:jt(),sittingOut:ze,instanceId:$o(sa,Me)});if(e.action==="sit-out"||e.action==="rejoin"){if(ze=e.action==="sit-out",e.action==="rejoin"){const t=D();kt=t.nextBar(t.beatAt(re()+Xs))}$n(!0),T(),e.action==="sit-out"&&vn()?.out?.(e.outId);return}if(e.action==="stop"){et.stop({at:re()});return}ze=!1,kt=0,e.claimId&&vn()?.claim(e.claimId),et.play({at:re()})}let Zl=D().running;et.onChange(()=>{D().running&&!Zl&&K&&(ze=!iw(sa,Me)),Zl=D().running,D().running&&L.phase==="armed"&&tp(),!D().running&&L.phase==="rec"&&si(!0),D().running||(ze=!1,kt=0),Wt(),$n(!0),T()});vn()?.member?.($o(sa,Me),()=>D().running&&!ze);vn()?.onAll(()=>{if(ze){if(ze=!1,jt()){const e=D();kt=e.nextBar(e.beatAt(re()+Xs))}$n(!0),T()}});function Rv(){const e=Lu(E),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=`nyx${Me>1?`-${Me}`:""}-pattern-${new Date().toISOString().slice(0,10)}.json`,n.hidden=!0,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e4)}async function Iv(e){let t;try{t=JSON.parse(await e.text()),Tu(t)}catch{z=`Couldn't read ${e.name}: not a NYX pattern.`,T();return}await lp(t,`Loaded ${e.name}.`)}async function lp(e,t){const n=Tu(e),a=ev(e);ee(()=>{a&&(E.slots=a.slots,E.active=a.active),ip(n)}),a&&(xn=E.active!==null&&JSON.stringify(Fs(E))!==JSON.stringify(E.slots[E.active])),Pt="";const o=[],r=new Set;for(const l of E.pads)l.sample&&!await Y.get(l.sample)&&o.push(l.name);for(const l of E.slots)for(const c of l?.pads??[])c.sample&&!E.pads.some(d=>d.sample===c.sample)&&r.add(c.sample);let i=0;for(const l of r)await Y.get(l)||i++;z=o.length?`Loaded. ${o.length===1?"One pad needs its":`${o.length} pads need their`} sample again (${o.join(", ")}): samples stay in the browser they were loaded in.`:i?`${t} ${i===1?"One sample":`${i} samples`} in the slots ${i===1?"isn't":"aren't"} in this browser: samples stay in the browser they were loaded in.`:t,Wt(),T()}function qv(){_?.port.postMessage({type:"stop"}),jt()&&(K?(ze=!0,vn()?.out?.($o(sa,Me))):et.stop({at:re()})),$n(!0),He?.clear({fadeMs:20}),T()}function _v(e){E.master=Math.min(1,Math.max(0,e)),So(),qt&&F&&qt.gain.setTargetAtTime(E.master,F.currentTime,.01),na.value=String(E.master),li.textContent=`${Math.round(E.master*100)}%`}const ie=(e,t={},...n)=>{const a=document.createElement(e);for(const[o,r]of Object.entries(t))a.setAttribute(o,r);return a.append(...n),a},pa=document.getElementById("app");Uy(pa);pa.classList.add("nc","nc-page");Sg();const cp=ie("header",{class:"nc-page-hd"},ie("div",{},ie("h1",{class:"nc-page-title",...$y("page:title")},ie("span",{style:"color: var(--nc-ui-instrument-nyx)"},"NYX")," ",ie("span",{class:"nc-page-sep"},"/")," SAMPLER ",ie("span",{class:"nc-page-sep"},"/")," ",ie("span",{class:"nc-mono"},String(Me).padStart(2,"0"))),ie("p",{class:"nc-page-sub"},"A NetComposer element."))),na=ie("input",{type:"range",class:"nc-range",id:"nyx-master",min:"0",max:"1",step:"0.01",value:String(E.master),"data-nc-id":"nyx-master"});na.addEventListener("input",()=>_v(Number(na.value)));const li=ie("span",{class:"nc-readout","data-nc-readout":""});li.textContent=`${Math.round(E.master*100)}%`;const ec="audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.aif,.aiff,.webm",Bt=ie("input",{type:"file"});Bt.hidden=!0;let tc="pad";Bt.addEventListener("change",()=>{const e=Bt.files?.[0];Bt.value="",e&&Gs(e)});function ci(e){tc=e,Bt.accept=tc==="pad"?ec:`${ec},.json,application/json`,Bt.click()}const es=(e,t)=>{const n=ie("button",{type:"button",class:"nc-page-action","data-nyx-action":e.toLowerCase()},e);return U(n,I(`page:${e.toLowerCase()}`),n),n.addEventListener("click",t),n},dp=ie("label",{class:"nc-label",for:"nyx-master"},"Master");U(dp,I("page:master"),na);const nc=Tg({panel:ie("div",{},ie("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},dp,na,li),es("Save",Rv),es("Load",()=>ci("any")))});cp.append(ie("div",{class:"nc-page-actions"},nc.panel,es("Panic",qv),nc.button,Bt));const oe=ie("div",{class:"nc-stack","data-nc-layout":"adjacent"});pa.append(cp,ie("main",{class:"nc-page-body"},oe));pa.addEventListener("dragover",e=>{e.dataTransfer?.types.includes("Files")&&e.preventDefault()});pa.addEventListener("drop",e=>{const t=e.dataTransfer?.files?.[0];t&&(e.preventDefault(),Gs(t))});function ac(e){return Math.abs(e)<.01?"C":`${e<0?"L":"R"}${Math.round(Math.abs(e)*100)}`}function up(){return jt()?ze?"Sitting out":D().beatAt(re())<kt?"Joining on the next bar":"Playing":E.pads.some(t=>t.sample)?"Stopped":"Load a sample to start"}function Hv(e){if(e==="always")return"Always";if(e==="fill")return"Only in Fill";if(e==="!fill")return"Not in Fill";if(e==="pre")return"If the last one played";if(e==="!pre")return"If the last one didn't";const[t,n]=e.split(":");return`Pass ${t} of every ${n}`}const pp=[{mode:"repeat16",label:"1/16",title:"Repeat the last 16th while held"},{mode:"repeat8",label:"1/8",title:"Repeat the last 8th while held"},{mode:"reverse",label:"Rev",title:"Play what just happened backwards while held"},{mode:"half",label:"Half",title:"Half speed while held"},{mode:"stop",label:"Stop",title:"Slow to a halt like a tape machine while held"}],aa={fill:!1,perform:null};function co(e){aa.fill!==e&&(aa.fill=e,_?.port.postMessage({type:"fill",on:e}),T())}function ts(e){aa.perform!==e&&(aa.perform=e,_?.port.postMessage({type:"perform",mode:e}),T())}function jv(e){const t=o=>{const i=(o.target instanceof Element?o.target:null)?.closest('[data-nc-id="perform"] [data-nc-choice]'),l=i instanceof HTMLElement?i.dataset.ncChoice:void 0;return pp.some(c=>c.mode===l)?l:null},n=o=>{me(),o==="fill"?co(!0):ts(o)},a=()=>{co(!1),ts(null)};e.addEventListener("pointerdown",o=>{const r=t(o);if(!r)return;o.preventDefault(),n(r);const i=()=>{a(),window.removeEventListener("pointerup",i),window.removeEventListener("pointercancel",i)};window.addEventListener("pointerup",i),window.addEventListener("pointercancel",i)}),e.addEventListener("keydown",o=>{if((o.key===" "||o.key==="Enter")&&!o.repeat){const r=t(o);if(!r)return;o.preventDefault(),n(r)}}),e.addEventListener("keyup",o=>{(o.key===" "||o.key==="Enter")&&t(o)&&a()}),window.addEventListener("blur",a)}function Wv(){return{id:"transport",title:"Transport",status:Pt,controls:[{type:"button",id:"play",label:_s(It()),on:It(),onPress:()=>void Co()},{type:"label",id:"perform-label",text:"Hold to play"},{type:"choice",id:"perform",label:"Hold",value:aa.perform??"",options:pp.map(e=>({value:e.mode,label:e.label})),onChange:()=>{}},{type:"slider",id:"tempo",label:"Tempo",min:40,max:240,step:1,value:Math.round(D().bpm),valueText:`${Math.round(D().bpm)} BPM`,onChange:e=>{et.setTempo({bpm:e}),T()}},{type:"group",id:"transport-more",title:"Swing",collapse:"phone",summary:Je(E.swing),controls:[{type:"slider",id:"swing",label:"Swing",min:.5,max:.75,step:.01,value:E.swing,valueText:Je(E.swing),onChange:e=>ee(()=>{E.swing=e})}]},{type:"readout",id:"status",label:"Status",value:up()},{type:"slotRow",id:"slots",morph:0,morphText:"",slots:Kd.map((e,t)=>({label:e,filled:E.slots[t]!=null,active:E.active===t,edited:E.active===t&&xn})),onMorph:()=>{},onSlot:(e,t)=>ii(e,t)}]}}function hp(){if(!It())return-1;const e=D().beatAt(re());return e<0||e<kt?-1:Math.floor(e/Hr)%le}function Uv(){const e=ia(),t=hp();return{id:"pattern",title:"Pattern",lead:!0,summary:`${E.lanes.filter(n=>n.steps.some(a=>a.on)).length} lanes · ${e.name}`,sections:[{id:"grid",controls:[{type:"stepGrid",id:"grid",playhead:t,selectedRow:`pad-${E.selected}`,rows:E.lanes.map((n,a)=>({id:`pad-${a}`,label:B(a).name,length:n.length,lane:a%4+1,mute:n.mute,solo:n.solo,steps:n.steps.map(o=>({on:o.on,accent:o.accent,velocity:o.velocity,dim:!B(a).sample,...Cb(o,n.length)}))})),onToggle:(n,a,o)=>io(n,a,r=>{o?(r.accent=r.on?!r.accent:!0,r.on=!0):(r.on=!r.on,r.on||(r.accent=!1))}),onSet:(n,a,o,r)=>io(n,a,i=>{o==="on"?(i.on=r,r||(i.accent=!1)):(i.accent=r,r&&(i.on=!0))}),onSelectRow:n=>De(n,!0,!0),onLongPress:(n,a)=>{ge={lane:n,step:a},De(n,!1)},onMute:n=>ee(()=>{Ne(n).mute=!Ne(n).mute}),onSolo:n=>ee(()=>{Ne(n).solo=!Ne(n).solo}),onLength:(n,a)=>ee(()=>{Ne(n).length=Math.max(1,Math.min(le,a))}),transport:{playing:It(),label:_s(It()),onToggle:()=>void Co()},onFill:n=>co(n),onClear:()=>fv(),clearLabel:Un?"Undo":"Clear"},{type:"note",id:"grid-help",text:"Tap a name to hear it. Long-press a step for its locks."}]},{id:"pads",title:"Pad",controls:[{type:"padGrid",id:"pads",label:"Pads",columns:4,selected:E.selected,pads:E.pads.map((n,a)=>({label:n.name,empty:!n.sample,peaks:Du(n),lane:a%4+1,playing:Rt.has(a),badge:n.choke?po[n.choke-1]:void 0,badgeLabel:n.choke?`choke group ${po[n.choke-1]}`:void 0,hint:Fe?.route()&&Kn(n)?"tuned · CALLIOPE":void 0})),onDown:n=>Gv(n),onPress:n=>Kv(n),onFile:(n,a)=>{De(n,!1),Gs(a,n)},onMove:(n,a,o)=>Vv(n,a,o),menu:n=>Jv(n),onMenu:(n,a)=>void Zv(n,a),onRename:(n,a)=>Qv(n,a)},{type:"button",id:"library",label:"Library",on:!1,onPress:()=>$t()}]}]}}function Yv(e){if(!ge||ge.lane!==E.selected)return[];const{lane:t,step:n}=ge,a=Ne(t).steps[n];if(!a)return[];const o=r=>io(t,n,r);return[{type:"label",id:"lock-label",text:`Step ${n+1}`},{type:"slider",id:"lock-velocity",label:"Velocity",min:0,max:1,step:.01,value:a.velocity,valueText:Je(a.velocity),onChange:r=>o(i=>{i.velocity=r})},{type:"slider",id:"lock-chance",label:"Chance",min:0,max:1,step:.05,value:a.chance,valueText:Je(a.chance),onChange:r=>o(i=>{i.chance=r})},...e.slices?[{type:"select",id:"lock-slice",label:"Slice",value:a.slice===null?"auto":String(a.slice),options:[{value:"auto",label:`In order (${n%e.slices+1})`},...Array.from({length:e.slices},(r,i)=>({value:String(i),label:`Slice ${i+1}`}))],onChange:r=>o(i=>{i.slice=r==="auto"?null:Number(r)})}]:[],{type:"slider",id:"lock-pitch",label:"Pitch",min:-12,max:12,step:1,value:a.pitch,valueText:Zn(a.pitch," st"),onChange:r=>o(i=>{i.pitch=r})},{type:"select",id:"lock-cond",label:"Plays",value:a.cond,options:Qa.map(r=>({value:r,label:Hv(r)})),onChange:r=>o(i=>{Qa.includes(r)&&(i.cond=r)})},{type:"choice",id:"lock-reverse",label:"Direction",value:a.reverse?"rev":"pad",options:[{value:"pad",label:"As the pad"},{value:"rev",label:"Reversed"}],onChange:r=>o(i=>{i.reverse=r==="rev"})},{type:"button",id:"lock-done",label:"Done",on:!1,onPress:()=>{ge=null,T()}}]}function Xv(){const e=xt();if(!e)return[];const t=e.sources();return[{type:"label",id:"grab-label",text:e.record?"Grab or take":"Grab the bar"},{type:"select",id:"grab-from",label:"From",value:V.from,options:t.map(n=>({value:n.id,label:n.name})),onChange:n=>{V.from=n,e.listen(n),T()}},{type:"choice",id:"grab-bars",label:"Bars",value:String(V.bars),options:[1,2,4].map(n=>({value:String(n),label:String(n)})),onChange:n=>{V.bars=n==="4"?4:n==="2"?2:1,T()}},{type:"button",id:"grab",label:V.busy?"Grabbing…":V.bars===1?"Grab last bar":`Grab last ${V.bars} bars`,on:V.busy,onPress:()=>void ai()},...e.record?[{type:"button",id:"take",label:np(),on:L.phase!=="idle",onPress:()=>ri()}]:[]]}let uo=-1;function Gv(e){if(!B(e).sample)return;uo=e,fp(e);const t=()=>{uo=-1,tt?.release(e)};window.addEventListener("pointerup",()=>setTimeout(t),{once:!0})}function fp(e){$e.has(e)||tt?.hit(e),De(e,!0,!0)}function Kv(e){if(uo===e){uo=-1;return}if(!B(e).sample){De(e,!1),ci("pad");return}fp(e),tt?.release(e)}function Vv(e,t,n){ee(()=>{const a=structuredClone(B(e)),o=structuredClone(B(t));E.pads[t]=a,n||(E.pads[e]=o.sample?o:Xe(e))}),De(t,!1)}const po=["A","B","C","D"];function Qv(e,t){Ye(n=>{n.name=t.slice(0,24)},e)}function Jv(e){const t=!!B(e).sample,n=[{id:"load",label:t?"Replace…":"Load a file…"}],a=Ur().slice(-4).reverse();for(const i of a)n.push({id:`take-${i.id}`,label:`LUCY take ${i.id}`});const o=a[0];if(o&&n.push({id:`chop-take-${o.id}`,label:`Chop LUCY take ${o.id}…`}),xt()&&n.push({id:"grab",label:V.bars===1?"Grab the last bar":`Grab the last ${V.bars} bars`}),xt()?.record&&n.push({id:"record",label:L.phase==="rec"?"Stop the take":`Take from ${lo(V.from)}`}),n.push({id:"library",label:"Library…"}),B(e).provenance){const i=ti(e);if(i.length)for(const l of i)n.push({id:`alt-${l.id}`,label:`Alternative: ${gn(l.title)}`});else Ee.ensure().then(()=>T()),n.push({id:"alternatives",label:"Alternatives…"})}return t&&n.push({id:"region",label:"Edit region…"},{id:"chop",label:"Chop to pads…"}),t&&n.push({id:"rename",label:"Rename…"},{id:"remove",label:"Remove sample"}),n}async function Zv(e,t){if(De(e,!1),t==="load")ci("pad");else if(t==="grab")await ai();else if(t==="record")ri();else if(t==="remove"||t==="clear")ua(e);else if(t==="library")$t(!0);else if(t==="chop")await ca();else if(t==="region")await To();else if(t.startsWith("chop-take-")){const n=Ur().find(a=>`chop-take-${a.id}`===t);n&&await Cv(n)}else if(t==="alternatives"){const n=B(e).provenance;$t(!0,n?n.query||n.role:void 0)}else if(t.startsWith("alt-")){const n=ti(e).find(a=>`alt-${a.id}`===t);n&&await Mo(n,B(e).provenance?.query??"",e)}else if(t.startsWith("take-")){const n=Ur().find(a=>`take-${a.id}`===t);n&&await sp(n)}}const di=new Fy;document.addEventListener("keydown",e=>{!Se||e.repeat||e.shiftKey||e.altKey||!(e.metaKey||e.ctrlKey)||e.key.toLowerCase()!=="z"||(e.target instanceof HTMLElement?e.target:null)?.closest("input, select, textarea, [contenteditable]")||(e.preventDefault(),Js())});const mp=e=>_?.port.postMessage({type:"release",pad:e});cw(dn);Dy(document);document.addEventListener("keydown",e=>{if(e.repeat||e.metaKey||e.ctrlKey||e.altKey||zy(e.target))return;const t=yu(e);t<0||!B(t).sample||(e.preventDefault(),!(di.press(e)<0)&&($e.has(t)||tt?.hit(t),je(t,null,!0,!0)))});document.addEventListener("keyup",e=>{const t=di.release(e);t<0||(tt?.release(t),mp(t))});window.addEventListener("blur",()=>{for(const e of di.releaseAll())tt?.release(e),mp(e)});document.addEventListener("keydown",e=>{if(e.code!=="Space"&&e.code!=="Backspace"&&e.code!=="Delete"||e.metaKey||e.ctrlKey||e.altKey)return;const t=e.target instanceof HTMLElement?e.target:null;if(t?.closest("input, select, textarea, [contenteditable]"))return;if(e.code!=="Delete"&&lw(e)){e.preventDefault();return}if(e.code==="Space"||e.repeat||e.shiftKey)return;const n=t?.closest('[data-nc-id="pads"] .nc-padgrid-pad');if(!n)return;const a=[...document.querySelectorAll('[data-nc-id="pads"] .nc-padgrid-pad')].indexOf(n);a<0||!B(a).sample||(e.preventDefault(),De(a,!1),ua(a),n.focus())});function ui(e){const t=I("kit:pad-key");e.querySelectorAll('[data-nc-id="pads"] .nc-padgrid-pad').forEach((n,a)=>{const o=Ny[a];if(!o)return;let r=n.querySelector(":scope > .nyx-pad-key");r||(r=ie("span",{class:"nyx-pad-key","aria-hidden":"true"}),n.append(r)),r.textContent!==o&&(r.textContent=o),U(r,t)})}function gp(e){const t=I("kit:pad-playing");e.querySelectorAll('[data-nc-id="pads"] .nc-padgrid-pad').forEach((n,a)=>{const o=$e.has(a);n.hasAttribute("data-nyx-stop")!==o&&(n.toggleAttribute("data-nyx-stop",o),o?U(n,t,n):ky(n))})}function oc(e,t){const n=Os(e,t,D().bpm),a=Number(n.toFixed(2));return{speed:n,far:e.keepPitch&&(a<wn[0]||a>wn[1])}}function bp(e){const t=e.querySelector('[data-nc-id="fit-speed"]');if(!t)return;const n=ia(),a=n.sample?Y.info(n.sample):void 0,o=Number((a?Os(n,a,D().bpm):1).toFixed(2)),r=n.keepPitch&&(o<wn[0]||o>wn[1]);t.toggleAttribute("data-nyx-far",r)}function yp(e){const t=e.querySelector('[data-nc-id="level"][data-nc-slider]');!(t instanceof HTMLElement)||t.dataset.nyxLevel||(t.dataset.nyxLevel="",t.title="Double-click: back to 0 dB",t.addEventListener("dblclick",()=>{ia().levelDb!==0&&Ye(n=>{n.levelDb=0})}))}const rc=["C","C♯","D","E♭","E","F","F♯","G","A♭","A","B♭","B"];function ex(e,t){const n=Fe?.route();if(!n)return[];const a=Kn(t),o=i=>Ye(i),r=t.sample?t.fit>0?`Pad ${e+1} is fitted to bars: it keeps its pitch.`:a?`Pad ${e+1}'s hits play at the root of CALLIOPE's chord, from ${rc[t.note]}. The pattern's own hits still play.`:`Pad ${e+1} keeps its own pitch. Follow tunes its hits to CALLIOPE's root.`:"Load a sound on this pad to tune it to CALLIOPE.";return[{type:"label",id:"notes-label",text:"Notes in"},{type:"note",id:"notes-by",text:`Played by ${n.name} · ${uw(n)}`},...t.sample&&t.fit===0?[{type:"toggle",id:"pad-follow",label:"Follow CALLIOPE",pressed:a,onPress:()=>o(i=>{i.follow=!Kn(i)})},{type:"select",id:"pad-note",label:"Sample is",value:String(t.note),options:rc.map((i,l)=>({value:String(l),label:i})),onChange:i=>o(l=>{l.note=Number(i)})}]:[],{type:"note",id:"notes-how",text:r},{type:"button",id:"notes-open",label:`Open ${n.name.split(" ")[0]}`,on:!1,onPress:()=>void Fe?.open()},{type:"button",id:"notes-mine",label:"Play it myself",on:!1,onPress:()=>{Fe?.takeBack()&&T()}}]}function tx(){const e=E.selected,t=B(e),n=t.sample?Y.info(t.sample):void 0,a=Ds(t).slice(1,-1),o=t.end-t.start,r=n?n.frames/n.sampleRate:0,i=!!t.sample,l=i&&!n,c=p=>Ye(p),d=_t.get(e),u=i?[...t.rights==="unknown"?[{type:"readout",id:"rights",label:"Rights",value:"Unknown · computer audio"}]:[],...t.provenance?[{type:"readout",id:"credit",label:"Credit",value:`${t.provenance.creator} · ${$s(t.provenance.license,t.provenance.licenseStatus)}`}]:[],{type:"readout",id:"sample",label:"Length",value:l?t.provenance?.origin==="local"?"Local sound, not here: open its local Library":"Not in this browser: load it again":`${dt(r*o)} of ${dt(r)} · ${n?.channels===2?"stereo":"mono"}`},...mu(d,t)&&n?[{type:"note",id:"auto-fit-note",text:my(d.fit)},...Tl({...d.fit,...oc(t,n)})?[{type:"note",id:"auto-fit-far",text:Tl({...d.fit,...oc(t,n)})}]:[],{type:"button",id:"auto-fit-undo",label:"Undo fit",on:!1,onPress:()=>gv(e)}]:[],{type:"choice",id:"mode",label:"Mode",value:t.mode,options:[{value:"oneshot",label:"One-shot"},{value:"gate",label:"Gate"},{value:"loop",label:"Loop"}],onChange:p=>c(h=>{h.mode=p})},{type:"choice",id:"retrigger",label:"Retrigger",value:t.retrigger,options:[{value:"cut",label:"Cut"},{value:"finish",label:"Let it finish"}],onChange:p=>c(h=>{h.retrigger=p==="finish"?"finish":"cut"})},{type:"choice",id:"dir",label:"Direction",value:t.dir,options:[{value:"fwd",label:"Forward"},{value:"rev",label:"Reverse"},{value:"pingpong",label:"Ping-pong"}],onChange:p=>c(h=>{(p==="fwd"||p==="rev"||p==="pingpong")&&(h.dir=p)})},{type:"slider",id:"start",label:"Start",min:0,max:1,step:.001,value:t.start,valueText:dt(t.start*r),onChange:p=>c(h=>{h.start=Math.min(p,h.end-.002)}),onCommit:()=>void je(e)},{type:"slider",id:"end",label:"End",min:0,max:1,step:.001,value:Ql(t),valueText:t.length!=="free"&&Ct(t)?`${dt(Ql(t)*r)} · ${Mt(t.length)}`:dt(t.end*r),onChange:p=>c(h=>{h.length="free",h.end=Math.max(p,h.start+.002)}),onCommit:()=>void je(e)},{type:"select",id:"slices",label:"Slices",value:String(t.slices),options:Vd.map(p=>({value:String(p),label:p?`${p}`:"Off"})),onChange:p=>void Zr(Number(p),t.cuts.length?"transients":"even")},...t.slices?[{type:"choice",id:"chop",label:"Chop",value:t.cuts.length?"transients":"even",options:[{value:"even",label:"Even"},{value:"transients",label:"At hits"}],onChange:p=>void Zr(t.slices,p==="transients"?"transients":"even")}]:[],{type:"button",id:"chop-to-pads",label:"Chop to pads…",on:Ht.isOpen,onPress:()=>void ca()},{type:"group",id:"tune-shape",title:"Tune & shape",summary:Ly(t),controls:[{type:"label",id:"pitch-label",text:"Pitch"},{type:"slider",id:"tune",label:"Tune",min:-24,max:24,step:1,value:t.tune,valueText:Zn(t.tune," st"),onChange:p=>c(h=>{h.tune=p}),onCommit:()=>void je(e)},{type:"slider",id:"fine",label:"Fine",min:-100,max:100,step:1,value:t.fine,valueText:Zn(t.fine," ct"),onChange:p=>c(h=>{h.fine=p})},{type:"select",id:"fit",label:"Fit to bars",value:String(t.fit),options:[{value:"0",label:"Off"},...[1,2,4,8].map(p=>({value:String(p),label:`${p} bar${p===1?"":"s"}`}))],onChange:p=>{_t.delete(e),c(h=>{h.fit=Number(p)})}},...t.fit&&n?[{type:"choice",id:"keep-pitch",label:"Keep pitch",value:t.keepPitch?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:p=>c(h=>{h.keepPitch=p==="on"})},{type:"readout",id:"fit-speed",label:"Speed",value:`${My(Os(t,n,D().bpm))}${t.keepPitch&&Ue.pending(e)&&!Ue.failed?" · stretching…":""}`}]:[],{type:"choice",id:"auto-fit",label:"Auto-fit loops",value:Oa?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:p=>{Oa=p==="on",by(Oa),T()}},{type:"label",id:"shape-label",text:"Shape"},{type:"slider",id:"attack",label:"Attack",min:0,max:.1,step:.001,taper:"time",value:t.attack,valueText:dt(t.attack),onChange:p=>c(h=>{h.attack=p})},{type:"slider",id:"decay",label:"Decay",min:.01,max:4,step:.01,taper:"time",value:t.decay,valueText:Pa(t.decay),onChange:p=>c(h=>{h.decay=p}),onCommit:()=>void je(e)},{type:"slider",id:"cutoff",label:"Filter",min:-1,max:1,step:.01,value:t.cutoff,valueText:Fa(t.cutoff),onChange:p=>c(h=>{h.cutoff=Math.abs(p)<.02?0:p})},{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:Je(t.resonance),onChange:p=>c(h=>{h.resonance=p})}]},{type:"label",id:"out-label",text:"Output"},{type:"slider",id:"level",label:"Level",min:0,max:1,step:.001,value:vb(t.levelDb),valueText:kb(t.levelDb),onChange:p=>c(h=>{h.levelDb=xb(p)})},...t.sample?[{type:"label",id:"normalize-label",text:"Normalize"},{type:"choice",id:"normalize",label:"Normalize",value:fl(t)?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:p=>void mv(e,p==="on")},{type:"readout",id:"normalize-gain",label:"Gain",value:fl(t)?t.provenance?"Library level":fb(t.normalize?.gainDb??0):"As recorded"}]:[],{type:"group",id:"pad-more",title:"Pan & choke",collapse:"phone",summary:`Pan ${ac(t.pan)} · Choke ${t.choke?po[t.choke-1]:"none"}`,controls:[{type:"slider",id:"pan",label:"Pan",min:-1,max:1,step:.01,value:t.pan,valueText:ac(t.pan),onChange:p=>c(h=>{h.pan=Math.abs(p)<.02?0:p})},{type:"select",id:"choke",label:"Choke",value:String(t.choke),options:[{value:"0",label:"None"},...po.map((p,h)=>({value:String(h+1),label:`Group ${p}`}))],onChange:p=>c(h=>{h.choke=Number(p)})},{type:"button",id:"clear-pad",label:"Remove sample",on:!1,onPress:()=>void ua()}]}]:[];return{id:"params",title:"Params",summary:t.name,controls:[...i?[{type:"canvas",id:"wave",label:"Wave",paint:"waveform",peaks:t.sample?ao.get(t.sample)??[]:[],region:[t.start,t.end],markers:a.map(p=>t.start+p*o),position:Rt.get(e)??-1}]:[],...z?[{type:"note",id:"notice",text:z}]:[],...ex(e,t),...Yv(t),...u,...Xv()]}}function ns(e,t){ee(()=>t(E.hacks[e]))}function nx(e,t){const n=E.hacks[e].dials[t.key]??t.default,a=`hack-${e}-${t.key}`,o=r=>ns(e,i=>{i.dials[t.key]=r});return t.options?{type:"select",id:a,label:t.label,value:String(n),options:t.options.map(r=>({value:String(r.value),label:r.label})),onChange:r=>o(Number(r))}:{type:"slider",id:a,label:t.label,min:t.min,max:t.max,step:t.step??1,taper:bf(t),value:n,valueText:mc(t,n,D().bpm),onChange:o}}const Aa=(e,t)=>(nt(e)?.dials??[]).filter(n=>!n.key.startsWith("mod_")&&n.more===!0===t).map(n=>nx(e,n)),sc=new Map;function sr(e){let t=sc.get(e);if(t)return t;let n=0,a=null;const o={in:0,out:0},r=()=>{const i=$h(He,e);if(i!==a){for(let l=0;l<n;l++)a?.close();a=i;for(let l=0;l<n;l++)a?.open()}};return t={open:()=>(r(),n++,a?.open(),!0),close:()=>{n!==0&&(r(),n--,a?.close())},read:()=>(r(),a?.read()??o)},sc.set(e,t),t}function ax(){const e=E.hacks,t=e.filter,n=t.mode==="lp"&&t.cutoff>=.999,a=r=>ee(()=>r(E.hacks.filter)),o=[bu(t)?"":"Filter",e.drive.on?"Drive":"",e.compressor.on?"Comp":""].filter(Boolean);return{id:"hacks",title:"Hacks",summary:o.length?o.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:t.on,meter:sr(`${Hs(t).type}-1`),meterHelp:I("hack-meter"),onToggle:r=>a(i=>{i.on=r}),controls:[{type:"select",id:"filter-mode",label:"Mode",value:t.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:r=>a(i=>{(r==="lp"||r==="hp"||r==="bp")&&(i.mode=r)})},{type:"canvas",id:"filter-curve",label:"Curve",paint:"filter",mode:t.mode,cutoff:t.cutoff,resonance:t.mode==="lp"?0:t.resonance,...Ty(t)},{type:"slider",id:"filter-cutoff",label:"Cutoff",min:0,max:1,step:.01,value:t.cutoff,valueText:n?"open":jr(gu(t.cutoff)),onChange:r=>a(i=>{i.cutoff=r})},...t.mode==="lp"?[]:[{type:"slider",id:"filter-resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:Je(t.resonance),onChange:r=>a(i=>{i.resonance=r})}]]},{type:"group",id:"hacks-more",title:"Drive & Compressor",collapse:"phone",summary:`Drive ${e.drive.on?"on":"off"} · Compressor ${e.compressor.on?"on":"off"}`,controls:[{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:e.drive.on,meter:sr("drive-1"),meterHelp:I("hack-meter"),onToggle:r=>ns("drive",i=>{i.on=r}),controls:Aa("drive",!1),more:Aa("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:e.compressor.on,meter:sr("compressor-1"),meterHelp:I("hack-meter"),onToggle:r=>ns("compressor",i=>{i.on=r}),controls:Aa("compressor",!1),more:Aa("compressor",!0)}]}]}}const pi=[Wv,Uv,tx,ax].map(e=>({def:e,handle:Bg(e())}));Og(oe,pi.map(e=>e.handle),"adjacent");jv(oe);ui(oe);qs(oe);const ic=oe.querySelector('[data-nc-module="transport"]'),wp=ic?Ey(ic,{playing:()=>It(),onPress:()=>void Co(),description:I("play")}):null;function vp(){const e=oe.querySelector('[data-nc-section="pads"] [data-nc-id="library"]');Ee.attach(e),Ht.attach(e)}function T(){Ou?.refresh(),Ku?.update(),Vu?.changed();for(const e of pi)e.handle.update(e.def());vp(),Ee.isOpen&&Ee.refresh(),ui(oe),gp(oe),bp(oe),yp(oe),Ju(oe),qs(oe),wp?.sync()}let lc="";function xp(){$n();const e=Rt.get(E.selected)??-1,t=JSON.stringify([hp(),up(),Math.round(e*400),[...Rt.keys()],$e.pads()]);if(t!==lc){lc=t;for(const n of pi.slice(0,3))n.handle.update(n.def());vp(),ui(oe),gp(oe),bp(oe),yp(oe),Ju(oe),qs(oe),wp?.sync()}requestAnimationFrame(xp)}requestAnimationFrame(xp);Fe?.onChange(e=>{e&&T()});Fe?.route()&&T();globalThis.__NC_NOTES__={read:()=>({routes:Fe?[...Fe.follower.routes]:[],points:Fe?Fe.follower.points():[],follows:E.pads.map(e=>Kn(e)),replay:mt?{...mt.stats}:null,out:tt?{...tt.stats}:null,slots:oo?{...oo.stats}:null}),log:{start(){ro.length=0,so=!0,_?.port.postMessage({type:"hitlog",on:!0})},take:()=>ro.splice(0),stop(){so=!1,_?.port.postMessage({type:"hitlog",on:!1})}}};cv.start();Promise.all([...Qn(E)].map(e=>Y.get(e))).then(e=>{for(const t of e)t&&zu(t);T()});if(K)me(),K.providePreset?.({format:Jw,version:Zw,get:()=>(ov(E),Lu(E)),set:async e=>{await lp(e,"Loaded the Scene's pattern.")}}),xt()?.listen(V.from),K.onAudio?.({label:"Pad",targets:op,receive:rp});else{const e=()=>{me()};document.addEventListener("pointerdown",e,{once:!0,capture:!0}),document.addEventListener("keydown",e,{once:!0,capture:!0})}window.__nyx={state:E,clock:et,store:Y,stretcher:Ue,stretchTimes:Ru,selectPad:e=>De(e,!1),edit:e=>ee(()=>e(E)),runStretch:Iu,get stretchLoaded(){return Ba!==null},get ctx(){return F},get masterOut(){return qt},chop:{open:ca,get panel(){return Ht},get times(){return ni.times}},region:{open:To,get editor(){return da},get skips(){return Jr},signals:()=>kn?.signals()??null,signal(e){_?.port.postMessage({type:"sig",sig:{...cn(),aria:!0,...e}})},togglePlay:Co,get linked(){return kn!==null}},get fx(){return He},get positions(){return Rt},get voices(){return Bu},ensureAudio:me,play:je,async setSample(e,t,n,a="test"){await me()&&await Ut(e,t,n,a,!0,null,null,bn(t,n))},grab:V,grabBars:ai,get padUndo(){const e=Se?.before[0];return Se&&e?{index:e.index,sample:e.pad.sample,pads:Se.before.map(t=>t.index)}:null},undoPad:Js,removePad:ua,receiveAudio:rp,padTargets:op,take:L,pressTake:ri,get notice(){return z},setPerform:ts,setFill:co,actSlot:ii,get edited(){return xn},library:{get panel(){return Ee},open:e=>$t(!0,e),close:()=>$t(!1),catalog:_u,local:Eo,load:Mo,buildKit:()=>Ee.buildKit(),alternatives:e=>ti(e).map(t=>t.id),preview:Xu,get previewing(){return pn?.id??null}},toggleStep(e,t){io(e,t,n=>{n.on=!n.on})}};
