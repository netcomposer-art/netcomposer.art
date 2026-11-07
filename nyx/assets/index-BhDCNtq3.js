(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const kt=1e-9;function md(t,e,n,a=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,a))}class Go{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return md(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let o=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=e.beat+kt&&(o=s.bpm);const i=[{beat:e.beat,time:e.time,bpm:this.clamp(o)}];for(const s of a){if(s.beat<=e.beat+kt)continue;const l=this.clamp(s.bpm);l!==i[i.length-1].bpm&&i.push({beat:s.beat,time:0,bpm:l})}this.segs=i,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+kt){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-kt;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,a,o=.25){const i=this.bpmAt(n);if(!(a>0)||!(o>0)){this.setTempoAt(e,n);return}const s=Math.max(1,Math.round(a/o));this.setTempoAt(i,n);for(let l=1;l<=s;l++)this.setTempoAt(i+(e-i)*l/s,n+a*(l-1)/s)}prune(e){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=e&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new Go({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=e+kt)return n[a];return n[0]}segAtTime(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=e+kt)return n[a];return n[0]}}const gd=Object.freeze({beatsPerBar:4,beatUnit:4}),Ct=1e-9;function bd(t){return Math.floor(t+Ct)}function Es(t,e,n=!1){if(!(e>0))return t;const o=Math.ceil(t/e-Ct)*e;return n&&o<=t+Ct?o+e:o}class yd{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new Go({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??gd}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-Ct&&(this.stopTime===null||e<this.stopTime-Ct)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(e,a.beat),a.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-Ct?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),a=bd(e/n),o=Math.max(0,e-a*n);return{beat:e,bar:a,beatInBar:o,barPhase:o/n}}nextBar(e,n=!1){return Es(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const As="nc-clock/snapshot",Ss=1;function wd(t,e="local"){return{format:As,version:Ss,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function vd(t,e){const n=xd(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}const Le=t=>typeof t=="number"&&Number.isFinite(t),Qi=t=>t===null||Le(t);function xd(t){const e=t,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==As&&n("format"),(!Le(e.version)||Math.floor(e.version)!==Ss)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!Le(e.anchor.beat)||!Le(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(a=>a&&Le(a.beat)&&Le(a.bpm)&&a.bpm>0))&&n("tempo"),(!e.meter||!Le(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!Le(e.meter.beatUnit))&&n("meter"),(!Qi(e.startTime)||!Qi(e.stopTime)||!Le(e.stoppedBeat))&&n("transport times"),e}class kd{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new yd(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,a){this.transport.start({at:e,beat:n,bpm:a}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const a=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(e){vd(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return wd(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const $d="nc-sync/1",Ed=1,Ad="nc-sync",Sd="nc-sync-leader",Md=0,Ms=.5,Ls=.75;function Ld(t){return typeof t=="number"&&Number.isFinite(t)&&t>=Ms&&t<=Ls?t:null}const za=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Kt=t=>typeof t=="number"&&Number.isFinite(t),Tn=t=>typeof t=="string"&&t.length>0;function Td(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==Ed||!Tn(e.type)||!Tn(e.from)||!Kt(e.term)||!Kt(e.seq)||!Kt(e.sentAt))return null;switch(e.type){case"hello":return Tn(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return Kt(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&Kt(e.slot)?e:null;case"ping":case"pong":return Tn(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function Cd(t,e,n,a,o){return{proto:$d,from:e,term:n,seq:a,sentAt:o,...t}}function ne(){return(performance.timeOrigin+performance.now())/1e3}const Pa=.003,Nd=3,Da=.002+1e-6,Fd=.01,Ji=500;class Zi{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Fd:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,a=e?.performanceTime??0;if(!(n>=Pa&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const o=n-(this.timeOrigin+a)/1e3,i=this.median(),s=o-i,l=Math.abs(o-this.preStepBase),c=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!c&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&c===this.pendingBack&&(c||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(o,i,c))):(this.pendingStep=s,this.pendingBack=c,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,a){const o=this.heldBase()!==null,i=this.ctx.currentTime,s=i<=this.revertUntil;let l;if(a&&s){const c=this.offsets,d=this.preStep;c.length=0;for(let u=0;u<d.length;u++)c.push(d[u]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:i,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!s){const u=this.offsets,p=this.preStep;p.length=0;for(let h=0;h<u.length;h++)p.push(u[h]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?i+this.stepRevert:-1/0}const c=this.offsets,d=e-n;for(let u=0;u<c.length;u++)c[u]+=d;this.stepCount++,l={stepSeconds:e-n,confirmedAt:i,reanchors:this.stepCount,revert:!1}}if(!o)for(const c of[...this.stepListeners])c(l);return!0}median(){const e=this.offsets,n=this.scratch,a=e.length;n.length=a;for(let i=0;i<a;i++){const s=e[i];let l=i-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const o=a>>1;return a%2?n[o]:(n[o-1]+n[o])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const o=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(o&&Number.isFinite(o.contextTime)&&Number.isFinite(o.performanceTime)&&o.contextTime>=Pa&&o.performanceTime>0)if(this.waitSince=null,o.contextTime===this.lastStampC&&o.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Ji)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=o.contextTime,this.lastStampP=o.performanceTime,this.stampSince=this.perfNow(),n=o.contextTime-(this.timeOrigin+o.performanceTime)/1e3,a=!0;else if(!o||!(o.contextTime>=Pa)&&!(o.contextTime>0&&!(o.performanceTime>0))){if(o){const i=this.perfNow();if(this.waitSince===null&&(this.waitSince=i),i-this.waitSince<Ji)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const e=this.offsets,n=e.length,a=Math.min(Nd,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let o=-1,i=0;for(let l=0;l<n;l++){let c=0;for(let d=0;d<n;d++)Math.abs(e[d]-e[l])<=Da&&c++;c>i&&(o=l,i=c)}if(i<a)return;const s=e[o];for(let l=n-1;l>=0;l--)Math.abs(e[l]-s)>Da&&e.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!e||!e.contextTime||!e.performanceTime||!Number.isFinite(e.contextTime)||!Number.isFinite(e.performanceTime))return!0;const n=e.contextTime-(this.timeOrigin+e.performanceTime)/1e3;return Math.abs(n-this.estimate())<=Da}whenSettled(e=1500){if(this.settledNow())return null;const n=this.perfNow()+e;return new Promise(a=>{const o=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(o,2)};setTimeout(o,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,o=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(o)&&o>0?o:null}}class zd{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...za,...e.capabilities},this.channelOption=e.channel??Ad,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300,startGate:e.startGate??(()=>null),gatedStartLeadSeconds:e.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,a={}){this.send({type:"snapshot",op:e,slot:n,...a})}requestStart(e){this.gated(n=>this.startNow(e,n))||this.startNow(e)}startNow(e,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}gated(e){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const o=this.o.now(),i=()=>{n===this.startWaits&&e(o)};return a.then(i,i),!0}requestStop(e){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(e){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const o=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(o),0)}else{const o=a+this.o.startLeadSeconds;this.clock.commitStart(e===void 0?o:Math.max(e+this.o.gatedStartLeadSeconds,o),0)}this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,a){const[o,i]=this.tempoRange();e=Math.min(i,Math.max(o,e));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(e),this.broadcastState();return}const c=s.beatAt(l+this.o.minLeadSeconds),d=Math.max(n??Es(c,1),c);a&&a>0?(s.tempo.rampTempo(e,d,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,d),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const a of this.peers.values())e=Math.max(e,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(Ls,Math.max(Ms,e)):Md;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=Ld(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(e){const n=Td(e);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const o=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...za,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),o||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const i of this.peers.values())i.leader=i.id===n.from;const o=this.peers.get(n.from);o?o.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...za},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(o=>{this.leader&&this.decideStart(o)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const o of[...this.snapshotListeners])o(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const o of[...this.messageListeners])o(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const i=new AbortController;this.lockAbort=i,this.locks.request(Sd,{signal:i.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===i&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(i,s,l)=>[i?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),o=this.caps.canLead?this.id:null;for(const i of this.peers.values()){if(!i.capabilities.canLead)continue;const s=n(i.capabilities.prefersLeader,i.joinedAt,i.id);(o===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,o=i.id)}this.setLeader(o===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const a=[this.caps.prefersLeader?0:1,this.joinedAt],o=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==o[0]?a[0]<o[0]:a[1]!==o[1]?a[1]<o[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const o=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-a.lastSeen>o&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(Cd(e,this.id,this.term,++this.seq,this.o.now()))}}const Pd="modulepreload",Dd=function(t){return"/nyx/"+t},er={},Bd=function(e,n,a){let o=Promise.resolve();if(n&&n.length>0){let s=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");o=s(n.map(d=>{if(d=Dd(d),d in er)return;er[d]=!0;const u=d.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":Pd,u||(h.as="script"),h.crossOrigin="",h.href=d,c&&h.setAttribute("nonce",c),document.head.appendChild(h),u)return new Promise((m,b)=>{h.addEventListener("load",m),h.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${d}`)))})}))}function i(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return o.then(s=>{for(const l of s||[])l.status==="rejected"&&i(l.reason);return e().catch(i)})};var Od=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],ao=[.25,.5,.75,1,1.5,2],qd=4.9,X={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},it={fmt:"wet"},$e={fmt:"pct"},$t={fmt:"db"},Cn={fmt:"signedPct"},Ba={fmt:"num",suffix:" ms"},Y={div:100};function C(t,e,n,a,o,i,s,l){var c={key:t,label:e,min:n,max:a,default:o,step:1,k:i,unit:null,format:s};if(l)for(var d in l)c[d]=l[d];return c}function Nn(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var an=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[C("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:X.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[C("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:X.hpHz,astrid:!0,zero:"off"}),C("q","Resonance",0,100,0,2,{fmt:"q",law:X.hpQ},{dsp:{law:X.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[C("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:X.bpHz,astrid:!0},{dsp:{law:X.bpHz}}),C("q","Q",0,100,0,2,{fmt:"q",law:X.bpQ},{dsp:{law:X.bpQ}}),C("mix","Mix",0,100,100,3,it,{dsp:Y,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[C("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Nn(Od),overriddenBy:"beats_free",tempoSynced:!0}),C("feedback","Feedback",0,90,35,2,$e,{dsp:Y,unit:"%"}),C("mix","Wet/dry",0,100,0,3,it,{dsp:Y,unit:"%",astridKey:"wet"}),C("tone","Tone",0,100,100,4,{fmt:"hz",law:X.delayTone,offAt:100},{dsp:{div:99},more:!0}),C("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),C("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Nn([[0,"Insert"],[1,"Send"]]),more:!0}),C("send","Send",0,100,100,7,$e,{dsp:Y,unit:"%",more:!0}),C("mod_send","Accent → send",-100,100,0,8,Cn,{dsp:Y,unit:"%",more:!0}),C("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[C("predelay","Pre-delay",0,200,0,1,Ba,{dsp:{div:1e3},unit:"ms"}),C("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:Y,unit:"%"}),C("decay","Decay",0,100,50,3,$e,{dsp:Y,unit:"%"}),C("damping","Damping",0,100,0,4,$e,{dsp:Y,unit:"%"}),C("mix","Mix",0,100,0,5,it,{dsp:Y,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[C("rate","Rate",0,100,26,1,{fmt:"rate",law:X.rate},{dsp:{law:X.rate}}),C("depth","Depth",0,100,70,2,$e,{dsp:Y,unit:"%"}),C("feedback","Feedback",-90,90,50,3,Cn,{dsp:Y,unit:"%"}),C("mix","Mix",0,100,50,4,it,{dsp:Y,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[C("rate","Rate",0,100,52,1,{fmt:"rate",law:X.rate},{dsp:{law:X.rate}}),C("depth","Depth",0,100,50,2,$e,{dsp:Y,unit:"%"}),C("spread","Spread",0,100,70,3,$e,{dsp:Y,unit:"%"}),C("mix","Mix",0,100,40,4,it,{dsp:Y,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[C("rate","Rate",0,100,39,1,{fmt:"rate",law:X.rate},{dsp:{law:X.rate}}),C("depth","Depth",0,100,70,2,$e,{dsp:Y,unit:"%"}),C("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Nn([[4,"4"],[6,"6"],[8,"8"]])}),C("feedback","Feedback",0,90,30,4,$e,{dsp:Y,unit:"%"}),C("mix","Mix",0,100,50,5,it,{dsp:Y,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[C("low_db","Low",-18,18,0,1,$t,{unit:"dB"}),C("mid_db","Mid",-18,18,0,2,$t,{unit:"dB"}),C("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:X.midHz,astrid:!0},{dsp:{law:X.midHz}}),C("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:X.eqQ},{dsp:{law:X.eqQ}}),C("high_db","High",-18,18,0,4,$t,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[C("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),C("output_db","Output",-12,12,0,2,$t,{unit:"dB"}),C("mix","Mix",0,100,100,3,it,{dsp:Y,unit:"%"}),C("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Nn([[0,"Smooth"],[1,"Acid"]]),more:!0}),C("tone","Tone",0,100,100,5,{fmt:"hz",law:X.driveTone,offAt:100},{dsp:{div:99},more:!0}),C("mod_drive","Accent → drive",-100,100,0,6,Cn,{dsp:Y,unit:"%",more:!0}),C("mod_tone","Accent → tone",-100,100,0,7,Cn,{dsp:Y,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[C("threshold_db","Threshold",-60,0,0,1,$t,{unit:"dB"}),C("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:X.ratio},{dsp:{law:X.ratio}}),C("attack_ms","Attack",1,100,10,3,Ba,{unit:"ms"}),C("release_ms","Release",10,1e3,150,4,Ba,{unit:"ms"}),C("makeup_db","Makeup",0,24,0,5,$t,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[C("width","Width",0,200,100,1,$e,{dsp:Y,unit:"%"}),C("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:Y})]}],Rd=an.map(function(t){return t.type});an.filter(function(t){return!t.hidden}).map(function(t){return t.type});var Id={reverb:"plate"};function Yo(t){var e=Id[t]||t;return Rd.indexOf(e)>=0?e:null}function Be(t){for(var e=Yo(t),n=0;n<an.length;n++)if(an[n].type===e)return an[n];return null}function Lt(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function Ts(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var a=Lt(n.law,e);return a===null?0:a}function tr(t,e){return Math.min(qd,t*60/(e>0?e:120))}var nr=function(t){return t>0?"+":t<0?"−":""};function jd(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function Cs(t,e,n){var a=t.format,o;switch(a.fmt){case"db":return e===0&&a.zero?a.zero:nr(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return nr(e)+Math.abs(e)+"%";case"num":return e+a.suffix;case"fixed":return(a.add+e/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&e>=a.offAt?"off":a.law?(o=Lt(a.law,e),o===null?a.zero||"open":a.astrid?jd(o):o+" Hz"):e===0&&a.zero?a.zero:e+" Hz";case"q":return"Q "+Lt(a.law,e).toFixed(1);case"ratio":return Lt(a.law,e).toFixed(1)+":1";case"rate":return o=Lt(a.law,e),(o<1?o.toFixed(2):o<10?o.toFixed(1):o.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var i=0;i<t.options.length;i++)if(t.options[i].value===e)return t.options[i].label;return String(e);case"tempoMs":return Math.round(tr(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(tr(e,n)*1e3)+" ms"}return String(e)}var _d=1,wa=["drive","delay","plate"];function Hd(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(a,o){return Cs(t,a,o)},e}var on=wa.map(function(t){var e=Be(t),n={type:t,label:e.label,dials:e.dials.map(Hd)};return e.tempoSynced&&(n.tempoSynced=!0),n}),Wd={reverb:"plate"};function Qn(t){var e=Wd[t]||t;return wa.indexOf(e)>=0?e:null}function va(t){for(var e=Qn(t),n=0;n<on.length;n++)if(on[n].type===e)return on[n];return null}function Ns(t,e){var n=va(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}function Dt(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function Qe(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var a=t.options[0].value,o=1;o<t.options.length;o++)Math.abs(t.options[o].value-e)<Math.abs(a-e)&&(a=t.options[o].value);return a}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var i=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*i)/i))+0}function Ud(){return{v:_d,chain:on.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function Gd(t){return ao.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},ao[0])}function Oa(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Yd(t){for(var e=Array.isArray(t)?t:Oa(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),a=Ud(),o={},i=[],s=0;s<e.length;s++){var l=e[s];if(Oa(l)){var c=Qn(l.type);if(!c){typeof l.type=="string"&&i.push(l.type);continue}if(o[c]){i.push(c);continue}o[c]=!0;var d=a.chain[wa.indexOf(c)],u=Oa(l.dials)?l.dials:{};c==="delay"&&u.mix===void 0&&u.wet!==void 0&&(u=Object.assign({},u,{mix:u.wet})),d.bypass=n?l.bypass===!0:l.bypass!==!1,va(c).dials.forEach(function(p){d.dials[p.key]=Qe(p,u[p.key])}),Kd(c,d.dials,u)}}return{state:a,dropped:i}}function Kd(t,e,n){for(var a=va(t),o=0;o<a.dials.length;o++){var i=a.dials[o];i.stepWhen&&(e[i.key]=Qe(i,n&&typeof n[i.key]=="number"?n[i.key]:e[i.key],Dt(i,e)))}}function oo(t){return Yd(t).state}function Xd(t){return JSON.parse(JSON.stringify(t))}var Vd=24,io={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function ro(t,e,n){if(e==="bypass")return n?0:1;var a=Ns(t,e)||Qd(t,e);return a?Ts(a,n):0}function Qd(t,e){var n=Be(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}var Jd={};on.forEach(function(t){t.dials.forEach(function(e){Jd[t.type+"."+e.key]=e.format})});function qa(t,e){var n=new Float64Array(Vd),a=oo(t);return a.chain.forEach(function(o){var i=io[o.type];n[i.bypass]=o.bypass?0:1,Object.keys(o.dials).forEach(function(s){n[i[s]]=ro(o.type,s,o.dials[s])})}),n}var Zd=2,Jn=3,eu=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Xt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Fs(t,e){var n=Be(t);if(!n)return null;var a={};(e||[]).forEach(function(s){s&&s.id&&(a[s.id]=!0)});for(var o=1;a[n.type+"-"+o];)o++;var i={};return n.dials.forEach(function(s){i[s.key]=s.default}),{id:n.type+"-"+o,type:n.type,bypass:!1,dials:i}}function tu(t){var e=Be(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function nu(t,e,n){var a=t.length-1,o=Math.max(0,Math.min(a,n));if(e<0||e>a||e===o)return t;var i=t.slice(),s=i.splice(e,1)[0];return i.splice(o,0,s),i}function au(t){return typeof t=="number"&&isFinite(t)?Gd(t):t}function ar(t,e,n){var a={};return t.dials.forEach(function(o){var i=e[o.key];i===void 0&&o.astridKey&&(i=e[o.astridKey]),n&&t.type==="delay"&&o.key==="delay_beats"&&(i=au(i)),a[o.key]=Qe(o,i)}),t.dials.forEach(function(o){o.stepWhen&&(a[o.key]=Qe(o,typeof e[o.key]=="number"?e[o.key]:a[o.key],Dt(o,a)))}),a}function ou(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var a=t.min,o=1/0,i=t.min;i<=t.max;i++){var s=Lt(n.law,i),l=s===null?1/0:Math.abs(s-e);l<o&&(o=l,a=i)}return a}}var iu={rate:"rate_hz"};function ru(t,e,n,a){var o={};return t.dials.forEach(function(i){if(!i.more){var s=i.astridKey||iu[i.key]||i.key;o[i.key]=ou(i,e[s])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),o}function su(t,e){var n=e>0?Math.floor(e):Jn,a=[],o=[],i=[],s=!1,l=!1;Array.isArray(t)?(i=t,l=!0):Xt(t)&&Array.isArray(t.chain)&&(i=t.chain,s=t.v===1,l=t.schema===2);for(var c=[],d=0;d<i.length;d++){var u=i[d];if(Xt(u)&&!(u.type==="limiter"||u.fixed===!0)){var p=Yo(u.type),h=p&&Be(p);if(!h||s&&["drive","delay","plate"].indexOf(p)<0){typeof u.type=="string"&&a.push(u.type);continue}if(c.length>=n){a.push(u.id||p);continue}var m;Xt(u.params)&&!Xt(u.dials)?m=ar(h,ru(h,u.params,o,u.id||p),l):m=ar(h,Xt(u.dials)?u.dials:{},l);var b=Fs(p,c),w=typeof u.id=="string"&&eu.test(u.id)&&!c.some(function(g){return g.id===u.id})?u.id:b.id,f=s?u.bypass!==!1:u.bypass===!0;c.push({id:s?b.id:w,type:p,bypass:f,dials:m})}}return{state:{v:Zd,chain:c},dropped:a,notes:o}}function In(t,e){return su(t,e).state}function Et(t){var e=Be(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(a){n.push([a.k,Ts(a,t.dials[a.key])])}),n}function lu(t){var e=In(t,8),n=[],a=e.chain.map(function(o,i){var s=Be(o.type),l={};return i>=Jn&&n.push(o.id+": ASTRID keeps three hacks"),s.dials.forEach(function(c){var d=o.dials[c.key];if(c.more){d!==c.default&&n.push(o.id+"."+c.key);return}c.key==="delay_beats"&&ao.indexOf(d)<0&&n.push(o.id+".delay_beats"),l[c.astridKey||c.key]=d}),{id:o.id,type:o.type,bypass:o.bypass,dials:l}});return{hacks:a,lossy:n}}var cu="nc-fx@1",du=600,uu=256,pu=8,Vt=typeof WeakMap=="function"?new WeakMap:null;function hu(t,e){var n=Vt&&Vt.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var a=(await Bd(async()=>{const{default:i}=await import("./worklet-source-BibsVBZk.js");return{default:i}},[])).default,o=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await t.audioWorklet.addModule(o)}finally{URL.revokeObjectURL(o)}})(),Vt&&(Vt.set(t,n),n.catch(function(){Vt.delete(t)})),n)}function At(t,e){return typeof t=="number"&&isFinite(t)?t:e}function zs(t,e,n,a){var o=Math.min(400,Math.max(20,At(e.bpm,120))),i=[],s=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",c=At(e.preGain,1),d=Math.max(0,At(e.crossfade,.012)),u=At(e.maxDelaySeconds,void 0),p=t.createGain(),h=t.createGain(),m=t.createGain(),b=t.createGain(),w=null;e.modInput===!0&&(w=t.createGain(),w.channelCount=1,w.channelCountMode="explicit",w.channelInterpretation="discrete"),b.gain.value=0,p.connect(m),m.connect(h),b.connect(h);var f={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:o,mUsers:0,lv:null,lvAt:0},g=n(o);f.post=function($){f.node?f.node.port.postMessage($):f.disposed||(i.length>=uu&&(i=a().concat([{t:"tempo",bpm:f.bpm,when:0}]),f.mUsers>0&&i.push({t:"meter",on:!0})),i.push($))};function y($){var E=i.map(function(S){var T=Object.assign({},S);return T.when>$||(T.when=0,T.t!=="clear"&&(T.snap=!0)),T});return i=[],E}f.emit=function($){for(var E=0;E<f.listeners.length;E++)try{f.listeners[E]($)}catch(S){typeof console<"u"&&console.error(S)}},f.whenOf=function($){return typeof $=="number"&&isFinite($)&&$>0?$:0};var v=!1;f.tooFar=function($){return typeof $=="number"&&$>t.currentTime+du?(!v&&typeof console<"u"&&(v=!0,console.warn("nc-fx: ignoring a time "+Math.round($-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var x=hu(t,e.moduleUrl).then(function(){if(!f.disposed){var $=Object.assign({bpm:o,bypassMode:l,limiter:s,preGain:c,maxDelaySeconds:u},g);$.pending=y(t.currentTime),f.node=new AudioWorkletNode(t,cu,{numberOfInputs:w?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:$}),f.node.port.onmessage=function(S){var T=S.data;T&&T.t==="lv"&&f.mUsers>0&&(f.lv=T.d,f.lvAt=or())},p.connect(f.node),w&&w.connect(f.node,0,1),f.node.connect(b);var E=t.currentTime;E<=0||d===0?(m.gain.value=0,b.gain.value=1):(m.gain.setValueAtTime(1,E),m.gain.linearRampToValueAtTime(0,E+d),b.gain.setValueAtTime(0,E),b.gain.linearRampToValueAtTime(1,E+d)),f.status="ready"}},function($){f.status="unavailable",i=[],f.error=$});f.meterOpen=function(){return f.disposed||f.status==="unavailable"?!1:(f.mUsers++===0&&f.post({t:"meter",on:!0}),!0)},f.meterClose=function(){f.mUsers!==0&&--f.mUsers===0&&(f.lv=null,f.disposed||f.post({t:"meter",on:!1}))},f.levels=function(){return f.lv&&or()-f.lvAt<fu?f.lv:null};var k={};return f.meter=function($,E){if(k[$])return k[$];var S=0,T={in:0,out:0},_={open:function(){return f.meterOpen()?(S++,!0):!1},close:function(){S!==0&&(S--,f.meterClose())},read:function(){var H=S>0?f.levels():null;return T.in=0,T.out=0,H&&E(H,T),T}};return k[$]=_,_},f.core={input:p,output:h,modInput:w,ready:x,get status(){return f.status},get error(){return f.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:s,setTempo:function($,E){var S=At($,NaN);!(S>0)||f.disposed||f.tooFar(E)||(f.bpm=Math.min(400,Math.max(20,S)),f.post({t:"tempo",bpm:f.bpm,when:f.whenOf(E)}),f.emit({effect:null,key:"tempo",value:f.bpm}))},getTempo:function(){return f.bpm},clear:function($){var E=$&&typeof $=="object"?$:{at:$};if(!(f.disposed||f.tooFar(E.at))){var S=At(E.fadeMs,0);f.post({t:"clear",when:f.whenOf(E.at),fadeMs:S>0?Math.min(1e3,S):0})}},onChange:function($){return f.listeners.push($),function(){var E=f.listeners.indexOf($);E>=0&&f.listeners.splice(E,1)}},dispose:function(){if(!f.disposed){if(f.disposed=!0,f.status="disposed",i=[],f.listeners.length=0,f.node){f.node.port.postMessage({t:"dispose"}),f.node.port.close();try{f.node.disconnect()}catch{}}[p,m,b,h,w].forEach(function($){try{$&&$.disconnect()}catch{}})}}},f}var fu=250;function or(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function Ps(t,e){e.in=t[0],e.out=t[1]}function mu(t,e){return t&&typeof t.meter=="function"?t.meter(e):null}function gu(t,e){var n=e||{};if(n.slots)return bu(t,n);var a=oo(n.state),o=Array.from(qa(a)),i=zs(t,n,function(){return{program:o}},function(){return[{t:"load",program:Array.from(qa(a)),when:0}]}),s=i.core;function l(c){return a.chain[wa.indexOf(c)]}return s.setParam=function(c,d,u,p){var h=Qn(c);if(!(!h||i.disposed||i.tooFar(p))){var m=l(h),b;if(d==="bypass")b=!!u;else{var w=Ns(h,d);if(!w)return;b=Qe(w,u,Dt(w,m.dials))}return d==="bypass"?m.bypass=b:m.dials[d]=b,i.post({t:"p",i:io[h][d],v:ro(h,d,b),when:i.whenOf(p)}),i.emit({effect:h,key:d,value:b}),va(h).dials.forEach(function(f){if(!(!f.stepWhen||!f.stepWhen.some(function(v){return v.key===d}))){var g=m.dials[f.key],y=Qe(f,g,Dt(f,m.dials));y!==g&&(m.dials[f.key]=y,i.post({t:"p",i:io[h][f.key],v:ro(h,f.key,y),when:i.whenOf(p)}),i.emit({effect:h,key:f.key,value:y}))}}),b}},s.meter=function(){return i.meter("",Ps)},s.getParam=function(c,d){var u=Qn(c);if(u){var p=l(u);return d==="bypass"?p.bypass:p.dials[d]}},s.getState=function(){return Xd(a)},s.setState=function(c,d){i.disposed||i.tooFar(d&&d.at)||(a=oo(c),i.post({t:"load",program:Array.from(qa(a)),when:i.whenOf(d&&d.at)}),i.emit({effect:null,key:null,value:null}))},s}function bu(t,e){var n=e.slots===!0?Jn:Math.max(1,Math.min(pu,Math.floor(+e.slots)||Jn)),a=In(e.state,n),o=1,i={};function s(f){return i[f.id]||(i[f.id]=o++),i[f.id]}function l(f){return f.map(function(g){return{uid:s(g),type:g.type,program:Et(g)}})}var c=l(a.chain),d=a.chain.map(function(f){return i[f.id]}),u=zs(t,e,function(){return{slots:n,chain:c,order:d}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(f){return i[f.id]}),when:0}]}),p=u.core;function h(f){var g;for(g=0;g<a.chain.length;g++)if(a.chain[g].id===f)return a.chain[g];var y=Yo(f);if(y){for(g=0;g<a.chain.length;g++)if(a.chain[g].type===y)return a.chain[g]}return null}function m(f,g){var y=s(f);u.post({t:"add",uid:y,type:f.type,when:g}),Et(f).forEach(function(v){u.post({t:"ps",uid:y,k:v[0],v:v[1],when:g,snap:!0})})}function b(f){u.post({t:"order",uids:a.chain.map(function(g){return i[g.id]}),when:f})}function w(f,g){var y={};a.chain.forEach(function(k){y[k.id]=k});var v=a.chain.map(function(k){return i[k.id]}).join();f.chain.forEach(function(k){var $=y[k.id];if(!$||$.type!==k.type){delete i[k.id],m(k,g);return}var E={};Et($).forEach(function(S){E[S[0]]=S[1]}),Et(k).forEach(function(S){E[S[0]]!==S[1]&&u.post({t:"ps",uid:i[k.id],k:S[0],v:S[1],when:g})})});var x={};f.chain.forEach(function(k){x[k.id]=!0}),Object.keys(i).forEach(function(k){x[k]||delete i[k]}),a=f,a.chain.map(function(k){return i[k.id]}).join()!==v&&b(g)}return p.slots=n,p.meter=function(f){return f==null||f===""?u.meter("",Ps):u.meter("#"+f,function(g,y){var v=h(f),x=v?i[v.id]:0,k=g[2];if(x){for(var $=3,E=0;E<k;E++,$+=3)if(g[$]===x){y.in=g[$+1],y.out=g[$+2];return}}})},p.setParam=function(f,g,y,v){var x=h(f);if(!(!x||u.disposed||u.tooFar(v))){var k=Be(x.type),$,E=null;if(g==="bypass")$=!!y;else{for(var S=0;S<k.dials.length;S++)k.dials[S].key===g&&(E=k.dials[S]);if(!E)return;$=Qe(E,y,Dt(E,x.dials))}var T={},_={};Et(x).forEach(function(D){T[D[0]]=D[1]}),k.dials.forEach(function(D){D.stepWhen&&(_[D.key]=x.dials[D.key])}),g==="bypass"?x.bypass=$:x.dials[g]=$,k.dials.forEach(function(D){D.stepWhen&&(x.dials[D.key]=Qe(D,x.dials[D.key],Dt(D,x.dials)))});var H=u.whenOf(v),ce=i[x.id];return Et(x).forEach(function(D){(T[D[0]]!==D[1]||E&&D[0]===E.k)&&u.post({t:"ps",uid:ce,k:D[0],v:D[1],when:H})}),u.emit({effect:x.id,key:g,value:$}),Object.keys(_).forEach(function(D){D!==g&&x.dials[D]!==_[D]&&u.emit({effect:x.id,key:D,value:x.dials[D]})}),$}},p.getParam=function(f,g){var y=h(f);if(y)return g==="bypass"?y.bypass:y.dials[g]},p.getState=function(){return JSON.parse(JSON.stringify(a))},p.setState=function(f,g){u.disposed||u.tooFar(g&&g.at)||(w(In(f,n),u.whenOf(g&&g.at)),u.emit({effect:null,key:null,value:null}))},p.addEffect=function(f,g){var y=g||{},v=Fs(f,a.chain);if(!(!v||a.chain.length>=n||u.disposed||u.tooFar(y.at))){if(y.dials){var x=In({v:2,chain:[{id:v.id,type:v.type,dials:y.dials}]},1).chain[0];v.dials=x.dials}y.bypass===!0&&(v.bypass=!0);var k=a.chain.slice(),$=typeof y.index=="number"?Math.max(0,Math.min(k.length,y.index)):k.length;return k.splice($,0,v),w({v:2,chain:k},u.whenOf(y.at)),u.emit({effect:v.id,key:"chain",value:"add"}),v.id}},p.removeEffect=function(f,g){var y=h(f),v=g&&g.at;return!y||u.disposed||u.tooFar(v)?!1:(w({v:2,chain:a.chain.filter(function(x){return x!==y})},u.whenOf(v)),u.emit({effect:y.id,key:"chain",value:"remove"}),!0)},p.moveEffect=function(f,g,y){var v=h(f),x=y&&y.at;if(!v||u.disposed||u.tooFar(x))return!1;var k=nu(a.chain,a.chain.indexOf(v),g);return k===a.chain?!1:(w({v:2,chain:k},u.whenOf(x)),u.emit({effect:v.id,key:"chain",value:"move"}),!0)},p.getChain=function(){return a.chain.map(function(f){return{id:f.id,type:f.type,name:tu(f),bypass:f.bypass}})},p.toAstrid=function(){return lu(a)},p}function ir(t,e){return typeof t=="number"?t:t?typeof t.bpmAt=="function"?+t.bpmAt(e||0):typeof t.bpm=="number"?t.bpm:NaN:NaN}function yu(t,e,n){var a=n||{},o=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,i=typeof a.toAudioTime=="function"?a.toAudioTime:o?function(h){return o.toContextTime(h)}:e&&e.timebase==="shared"?null:function(h){return h},s=typeof a.now=="function"?a.now:o&&typeof o.sharedNow=="function"?function(){return o.sharedNow()}:null,l=e&&e.transport?e.transport:e,c=l&&l.tempo?l.tempo:l,d=!1;function u(h){if(!i){!d&&typeof console<"u"&&(d=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof h!="number")){var m=i(l.timeAt(h));return typeof m=="number"&&isFinite(m)?m:void 0}}function p(){var h=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(h)){var m=l&&typeof l.bpm=="number"?l.bpm:ir(c,0);m>0&&t.setTempo(m);return}var b=ir(c,h);b>0&&t.setTempo(b);for(var w=c&&(c.points||c.tempoPoints)||[],f=0;f<w.length;f++){var g=w[f];if(g.beat>h&&g.bpm>0){var y=u(g.beat);y!==void 0&&t.setTempo(g.bpm,y)}}}return p(),!e||typeof e.onChange!="function"?function(){}:e.onChange(function(h){h&&(h.kind==="tempo"&&h.bpm>0?t.setTempo(h.bpm,u(h.atBeat)):(h.kind==="snapshot"||h.kind==="start")&&p())})}const wu="/nyx/assets/worklet-CAv1bvAp.js";var vu="nc-ui",xu={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Ko={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Zn={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},ku={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Ye={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},$u={light:{color:xu.color,semantic:Ko,component:Zn,runtime:ku},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},en=t=>`--${vu}-${t}`,so=Ko["label-on-fill-dark"],rr=Ko["label-on-fill-light"],Eu=Ye["label-min-contrast"],Au=/^#[0-9a-f]{6}$/i,Su=t=>typeof t=="string"&&Au.test(t),jn=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function sr(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));let a=e*Math.min(n,1-n),o=i=>{let s=(i+t/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${jn(o(0)*255)}${jn(o(8)*255)}${jn(o(4)*255)}`}function Ds(t){let[e,n,a]=[1,3,5].map(d=>parseInt(t.slice(d,d+2),16)/255),o=Math.max(e,n,a),i=Math.min(e,n,a),s=(o+i)/2,l=o-i;if(!l)return{h:0,s:0,l:s};let c=l/(1-Math.abs(2*s-1));return{h:((o===e?60*((n-a)/l%6):o===n?60*((a-e)/l+2):60*((e-n)/l+4))+360)%360,s:c,l:s}}function lr(t){let[e,n,a]=[1,3,5].map(o=>{let i=parseInt(t.slice(o,o+2),16)/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*a}function lo(t,e){let[n,a]=[lr(t),lr(e)].sort((o,i)=>i-o);return(n+.05)/(a+.05)}var ea=t=>lo(t,so)>=lo(t,rr)?so:rr;function Bs(t,e,n,a=Eu){let o=sr(t,e,n),i=ea(o)===so?1:-1;for(let s=0;s<40&&lo(o,ea(o))<a;s++)n+=i*.01,o=sr(t,e,n);return o}function Mu(t){let{h:e,s:n}=Ds(t),a=Bs(e,Math.min(n,Ye["surprise-on-max-saturation"]),Ye["surprise-on-lightness"]);return{fill:t,ink:ea(t),on:a,onInk:ea(a)}}var Lu=(t,e)=>{let n=Math.abs(t-e)%360;return Math.min(n,360-n)};function Tu(t,e=Math.random){let[n,a]=Ye["surprise-saturation"],[o,i]=Ye["surprise-lightness"],s=Ye["surprise-min-hue-gap"],l=Su(t)?Ds(t).h:null,c=e()*360;return l!==null&&Lu(c,l)<s&&(c=(l+s+e()*(360-2*s))%360),Bs(c,n+e()*(a-n),o+e()*(i-o))}function Cu(t){if(!t)return null;let e=Mu(t);return{[en("surprise-fill")]:e.fill,[en("surprise-ink")]:e.ink,[en("surprise-on")]:e.on,[en("surprise-on-ink")]:e.onInk}}var Nu=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,Fu=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function cr(t){let[e,n,a]=[1,3,5].map(l=>Nu(parseInt(t.slice(l,l+2),16)/255)),o=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*a),i=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*a);return[.2104542553*o+.793617785*i-.0040720468*s,1.9779984951*o-2.428592205*i+.4505937099*s,.0259040371*o+.7827717662*i-.808675766*s]}function zu([t,e,n]){let a=(t+.3963377774*e+.2158037573*n)**3,o=(t-.1055613458*e-.0638541728*n)**3,i=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*o+.2309699292*i,-1.2684380046*a+2.6097574011*o-.3413193965*i,-.0041960863*a-.7034186147*o+1.707614701*i].map(s=>jn(Fu(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Pu=Ye["velocity-range"],Os={min:Zn.rhythm["velocity-min"],max:Zn.rhythm["velocity-max"]},dr=Object.fromEntries(Object.entries($u).map(([t,e])=>[t,{min:e.component.rhythm["velocity-min"],max:e.component.rhythm["velocity-max"],ink:e.component.rhythm["step-cell-ink"]}]));function Du(t,e=Os){let[n,a]=Pu,o=Number.isFinite(t)?Math.max(n,Math.min(a,t)):n,i=(o-n)/(a-n),s=e.ink??Zn.rhythm["step-cell-ink"];if(i<=0)return{velocity:o,t:0,fill:e.min.toUpperCase(),ink:s};if(i>=1)return{velocity:o,t:1,fill:e.max.toUpperCase(),ink:s};let l=cr(e.min),c=cr(e.max);return{velocity:o,t:i,fill:zu(l.map((d,u)=>d+(c[u]-d)*i)),ink:s}}function ur(t,e=Os){return{[en("velocity-fill")]:Du(t,e).fill}}var qs="data-nc-theme",pr="nc-ui-theme-change",Bu="(prefers-color-scheme: dark)",Rs=t=>t?.documentElement??null,Is=t=>t?.defaultView?.matchMedia?.(Bu)??null,Ou=t=>t==="light"||t==="dark"?t:"system";function qu(t=globalThis.document){return Ou(Rs(t)?.getAttribute(qs))}function co(t=globalThis.document){let e=qu(t);return e!=="system"?e:Is(t)?.matches?"dark":"light"}function js(t,e=globalThis.document){let n=Rs(e);if(!n)return()=>{};let a=co(e),o=()=>{let c=co(e);c!==a&&(a=c,t(c))},i=e.defaultView?.MutationObserver,s=i?new i(o):null;s?.observe(n,{attributes:!0,attributeFilter:[qs]});let l=Is(e);return l?.addEventListener?.("change",o),e.addEventListener(pr,o),()=>{s?.disconnect(),l?.removeEventListener?.("change",o),e.removeEventListener(pr,o)}}var Ru={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Iu={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},ju={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},_u={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},xa={};for(let[t,e]of Object.entries(Iu))xa[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(let[t,e]of Object.entries(_u))xa[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(let[t,e]of Object.entries(ju))xa[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map(Ru.renames.map(t=>[t.old,t.new]));function _s(t){let e=xa[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function W(t){return _s(t).prop}function r(t){return`var(${W(t)})`}function Hu(t,e){if(!(t instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(t).getPropertyValue(W(e)));return Number.isFinite(n)?n:0}function J(t,e){let n=_s(e),a=t.ownerDocument??document,o=a.createElement("span");o.dataset.ncLive=e,o.style.position="absolute",o.style.pointerEvents="none";let i=`var(${n.prop})`;n.kind==="family"?o.style.fontFamily=i:n.kind==="length"||n.kind==="other"||n.kind==="duration"?o.style.paddingLeft=i:o.style.color=i,(t instanceof Element?t:a.documentElement).append(o);let s=(a.defaultView??window).getComputedStyle(o),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return o.remove(),l}function Hs(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function Wu(t){let e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=r("font-ui"),n.style.fontSize=r("label-size"),n.style.fontWeight=r("label-weight"),(t instanceof Element?t:e.documentElement).append(n);let a=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var Uu="[data-modulated], [data-modulated] *";function Ra(t){let e=`${t}.nc-group[data-nc-collapse="phone"]`;return`  ${e} { display: flex; }
  ${e} > .nc-group-toggle { display: grid; }
  ${e} > .nc-group-body { display: flex; }
  ${e}[data-nc-open="false"] > .nc-group-body { display: none; }`}function hr(t){let e=`${t}.nc-stack[data-nc-layout="adjacent"]`;return`  ${e} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${r("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${e} > .nc-module { border-inline-end: ${r("hairline")} solid ${r("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${e} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function Gu(){let t=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${r(`module-bg-stack-${a}`)};
      ${W("text-sub")}: ${r(`module-sub-stack-${a}`)};
      ${W("divider")}: ${r(`module-div-stack-${a}`)};
      ${W("slider-track")}: ${r(`module-div-stack-${a}`)};
    }`,e=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${r(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${r(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${r("module-bg-stack-1")};
      ${W("text-sub")}: ${r("module-sub-stack-1")};
      ${W("divider")}: ${r("module-div-stack-1")};
    }`;return`
*, *::before, *::after { box-sizing: border-box; }
html, body {
  margin: 0;
  background: ${r("surface-page")};
  color: ${r("text")};
  font-family: ${r("font-ui")};
  font-size: ${r("body-size")};
  font-weight: ${r("title-weight")};
  line-height: ${r("label-leading")};
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
  padding: ${r("page-pad-y")} ${r("page-pad-x")};
}
.nc-page-hd {
  display: flex;
  flex-direction: column;
  gap: ${r("page-action-gap")};
  min-width: 0;
  padding-bottom: ${r("page-head-gap")};
  border-bottom: ${r("hairline")} solid ${r("divider")};
  position: relative;
  /* Its own layer above the page body: the band sits behind the header's content, and a menu that opens from the
     header (Bass's and Rhythm's phone menu) draws over the modules, not under them. */
  z-index: ${r("page-head-layer")};
}
/* The title band (Peter): page-head-bg from the top of the page down to the header's divider, edge to edge. It
   reaches into the page's padding, so it never widens the page; the divider keeps its inset. */
.nc-page-hd::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: calc(${r("page-pad-y")} * -1);
  bottom: 0;
  left: calc(${r("page-pad-x")} * -1);
  right: calc(${r("page-pad-x")} * -1);
  background: ${r("page-head-bg")};
  pointer-events: none;
}
.nc-page-body { min-width: 0; padding-top: ${r("page-body-gap")}; }
/* Page title (ASTRID: "ASTRID / SYNTH / 01"), the line under it, and the header's text actions (Save, Load, Panic). */
.nc-page-title {
  margin: 0;
  font-size: ${r("page-title-size")};
  font-weight: ${r("label-weight")};
  letter-spacing: ${r("page-title-tracking")};
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-page-sub { margin: ${r("page-sub-gap")} 0 0; font-size: ${r("page-sub-size")}; color: ${r("text-sub")}; }
.nc-page-title .nc-page-sep { color: ${r("text-sub")}; }
.nc-page-actions { display: flex; flex-wrap: wrap; align-items: flex-end; gap: ${r("control-gap")} ${r("page-action-gap")}; min-width: 0; }
.nc-page-action {
  border: 0;
  border-bottom: ${r("hairline")} solid transparent;
  background: transparent;
  padding: 0 0 ${r("control-gap")};
  color: ${r("text-sub")};
  font-size: ${r("label-size")};
  font-weight: ${r("control-weight")};
  letter-spacing: ${r("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, border-color;
  transition-duration: ${r("transition-feedback")};
}
.nc-page-action:hover { color: ${r("text")}; border-bottom-color: ${r("text")}; }
.nc-page-action:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("control-gap")}; }
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
    min-width: ${r("target-min")};
    min-height: ${r("target-min")};
    /* The bars' right edge on the page gutter, as the text actions' last word. */
    margin-inline-end: calc((${r("target-min")} - ${r("target-min")} / 2.75) / -2);
    padding: 0;
    border: 0;
    background: transparent;
    color: ${r("text")};
    cursor: pointer;
  }
  .nc-page-menu-btn > svg { width: calc(${r("target-min")} / 2.75); height: calc(${r("target-min")} / 2.75); fill: currentColor; }
  .nc-page-menu-btn:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: calc(${r("focus-width")} * -1); }
  .nc-page-menu[data-nc-open] {
    position: absolute;
    top: calc(100% + ${r("hairline")});
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding-block: ${r("control-gap")};
    background: ${r("surface-page")};
    color: ${r("text")};
    border-bottom: ${r("hairline")} solid ${r("divider")};
  }
  /* Under a kit header: edge to edge, the items on the page gutter. */
  .nc-page-hd .nc-page-menu[data-nc-open] {
    left: calc(${r("page-pad-x")} * -1);
    right: calc(${r("page-pad-x")} * -1);
    padding-inline: ${r("page-pad-x")};
  }
  .nc-page-menu[data-nc-open] button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: ${r("target-min")};
    margin: 0;
    padding: 0;
    border: 0;
    text-align: left;
    color: ${r("text")};
  }
  .nc-page-menu[data-nc-open] button:focus-visible { outline-offset: calc(${r("focus-width")} * -1); }
  .nc-page-menu[data-nc-open] > .nc-field { width: auto !important; padding-block: ${r("control-gap")}; }
  /* The header with a menu keeps one row on a phone: the title at the left (cut only if it must be), the kept
     actions and the ☰ at the right. */
  .nc-page-hd:has(.nc-page-menu-btn) { flex-direction: row; align-items: center; justify-content: space-between; gap: ${r("header-gap")}; }
  .nc-page-hd:has(.nc-page-menu-btn) > :first-child { min-width: 0; }
  .nc-page-actions:has(> .nc-page-menu-btn) { flex: none; flex-wrap: nowrap; align-items: center; }
}
@media (min-width: 768px) and (max-width: 768px) {
  .nc-page-hd .nc-page-menu[data-nc-open] {
    left: calc(${r("page-pad-x-md")} * -1);
    right: calc(${r("page-pad-x-md")} * -1);
    padding-inline: ${r("page-pad-x-md")};
  }
}
.nc-module {
  background: ${r("module-bg-adjacent-1")};
  color: ${r("text")};
  padding: ${r("module-pad")};
  border: 0;
  border-bottom: ${r("hairline")} solid ${r("divider")};
  border-radius: 0;
  min-width: 0;
  position: relative;
  font-family: ${r("font-ui")};
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
  gap: ${r("header-gap")};
  min-width: 0;
}
.nc-module[data-nc-open="true"] .nc-module-hd { margin-bottom: ${r("head-margin")}; }
/* A compact header (defineModule compact): the title at the slim size and the index on one slim line, a small gap
   under it. For a module that sits over others (the Studio's Mix). */
.nc-module[data-nc-compact] .nc-title { font-size: ${r("title-size-slim")}; }
.nc-module[data-nc-compact][data-nc-open="true"] .nc-module-hd { margin-bottom: ${r("head-margin-compact")}; }
.nc-module[data-nc-compact]:not([data-nc-slim]) { padding-top: ${r("module-gap")}; }
.nc-module[data-nc-compact][data-nc-slim] { padding-block: ${r("module-gap")}; }
.nc-title {
  margin: 0;
  min-width: 0;
  font-size: ${r("title-size")};
  font-weight: ${r("title-weight")};
  letter-spacing: ${r("title-tracking")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module[data-nc-slim] .nc-title { font-size: ${r("title-size-slim")}; }
.nc-module-end { display: flex; align-items: baseline; gap: ${r("header-gap")}; flex: none; }
.nc-index {
  font-family: ${r("font-readout")};
  font-size: ${r("readout-size-small")};
  color: ${r("text-sub")};
}
.nc-hide, .nc-slim {
  padding: 0 ${r("control-gap")};
  border: 0;
  background: transparent;
  color: ${r("text-sub")};
  font-family: ${r("font-readout")};
  font-size: ${r("body-size")};
  line-height: ${r("label-leading")};
  cursor: pointer;
  transition: none;
}
.nc-slim {
  display: flex;
  align-items: center;
  gap: ${r("module-gap")};
  flex: 1;
  min-width: 0;
  margin-top: ${r("module-gap")};
  text-align: left;
}
.nc-hide:hover, .nc-slim:hover { color: ${r("text")}; }
.nc-hide:focus-visible, .nc-slim:focus-visible {
  outline: ${r("focus-width")} solid ${r("focus-ring")};
  outline-offset: ${r("control-gap")};
}
.nc-slim-lines {
  font-family: ${r("font-readout")};
  font-size: ${r("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module-body {
  display: flex;
  flex-direction: column;
  gap: ${r("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-section { display: flex; flex-direction: column; gap: ${r("module-gap")}; min-width: 0; }
.nc-row, .nc-field, .nc-controls, .nc-slot-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${r("module-gap")};
  min-width: 0;
}
.nc-label {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${r("label-size")};
  font-weight: ${r("label-weight")};
  letter-spacing: ${r("label-tracking")};
  text-transform: uppercase;
  color: ${r("text-sub")};
}
.nc-readout, .nc-mono {
  font-family: ${r("font-readout")};
  font-variant-numeric: tabular-nums;
  font-size: ${r("readout-size")};
  color: ${r("text")};
  white-space: nowrap;
}
/* One label column (the lane-name width), so the sliders in a module start together, as in ASTRID. A label is never
   cut below that column (TEMPO, SWING and DECAY stay whole), but longer text gives way on one line with an ellipsis
   instead of widening the page; the full text stays in the DOM, so the accessible name is never cut. */
.nc-field .nc-label { flex: 0 1 auto; min-width: min(${r("name-width")}, 100%); }
/* A value never gives way to its label: it keeps its width (flex: none), so a long label is cut first and 0.3 stays
   0.3. Only a value that is itself longer than the row beside a name-width label is cut, with an ellipsis. The control
   beside it (range, knob, canvas, select) keeps its size. */
.nc-field .nc-readout {
  flex: none;
  min-width: 0;
  max-width: calc(100% - ${r("name-width")} - ${r("module-gap")});
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-field .nc-range, .nc-field .nc-canvas { flex: 1 1 0; min-width: 0; }
/* A display beside a label keeps the width it has next to a column-wide label: a long label is cut, not the display. */
.nc-field > .nc-label + .nc-canvas { min-width: calc(100% - ${r("name-width")} - ${r("module-gap")}); }
/* ASTRID slider rows: label and value on one baseline, the slider full width under them. */
.nc-field[data-nc-slider] {
  display: grid;
  grid-template-columns: minmax(min(${r("name-width")}, 100%), 1fr) auto;
  grid-template-areas: "label value" "range range";
  align-items: baseline;
  column-gap: ${r("module-gap")};
  row-gap: ${r("control-gap")};
  padding-bottom: ${r("module-gap")};
}
.nc-field[data-nc-slider] .nc-label { grid-area: label; min-width: 0; }
/* In the slider grid the value column is auto (sized to the value), so the flex-row cap does not apply. */
.nc-field[data-nc-slider] .nc-readout { grid-area: value; max-width: none; text-align: right; }
.nc-field[data-nc-slider] .nc-range { grid-area: range; width: 100%; margin: 0; }
/* Tap tempo: a small outlined button on the label line, between the label and the value. */
.nc-field[data-nc-slider]:has(> .nc-tap) {
  grid-template-columns: minmax(min(${r("name-width")}, 100%), 1fr) auto auto;
  grid-template-areas: "label tap value" "range range range";
}
.nc-tap {
  grid-area: tap;
  position: relative;
  align-self: center;
  padding: 0 ${r("control-gap")};
  border: ${r("hairline")} solid ${r("divider")};
  border-radius: ${r("slot-radius")};
  background: transparent;
  color: ${r("text-sub")};
  font-family: ${r("font-ui")};
  font-size: ${r("label-size")};
  font-weight: ${r("label-weight")};
  letter-spacing: ${r("label-tracking")};
  line-height: ${r("label-leading")};
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
  bottom: calc(-1 * ${r("control-gap")});
  width: max(100%, ${r("target-min")});
  height: max(100%, ${r("target-min")});
  transform: translateX(-50%);
}
/* The chip's ::before is already its touch box and stops at the slider; a hit pad on top of it covered the top
   half of the tempo slider, so a drag there tapped instead (Rhythm #40). */
.nc-tap > .nc-hit { display: none; }
.nc-tap:hover { border-color: ${r("text-sub")}; color: ${r("text")}; }
.nc-tap:active { background: ${r("text")}; border-color: ${r("text")}; color: ${r("surface-page")}; }
.nc-tap:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("hairline")}; }
/* ASTRID row spacing: a 48 px row every 72 px (measured on ASTRID's VCA at 1280 and 390). */
/* A flat phone-only group's sliders count as the section's own (group.js, collapse: "phone"). */
.nc-section:is(:has(> .nc-field[data-nc-slider]), :has(> .nc-group[data-nc-collapse="phone"] > .nc-group-body > .nc-field[data-nc-slider])) { row-gap: ${r("module-pad")}; }
.nc-section[data-nc-inset="true"] {
  margin-inline: calc(${r("module-pad")} * -1);
  margin-bottom: calc(${r("module-pad")} * -1);
  padding: ${r("module-pad")};
}
.nc-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: ${r("slider-pitch")};
  background: transparent;
  cursor: pointer;
  transition: none;
  accent-color: ${r("accent")};
}
/* Dimming is by colour, never opacity (plan 5.1): a disabled or bypassed control's label, value, track and thumb go
   to text-sub at full strength, so every pair keeps its contrast (Lucy's panel fix: 38 of 38 pairs pass). */
.nc-range:disabled { cursor: not-allowed; accent-color: ${r("text-sub")}; }
.nc-range:disabled::-webkit-slider-thumb { background: ${r("text-sub")}; }
.nc-range:disabled::-moz-range-thumb { background: ${r("text-sub")}; }
.nc-range:disabled::-moz-range-progress { background: ${r("text-sub")}; }
[data-nc-dim="true"] .nc-label, [data-nc-dim="true"] .nc-readout, [data-nc-dim="true"] .nc-ui-fx-name, [data-nc-dim="true"] .nc-ui-fx-fold-name,
[data-nc-dim="true"] .nc-select { color: ${r("text-sub")}; }
[data-nc-dim="true"] .nc-range { accent-color: ${r("text-sub")}; }
[data-nc-dim="true"] .nc-range::-webkit-slider-thumb { background: ${r("text-sub")}; }
[data-nc-dim="true"] .nc-range::-moz-range-thumb { background: ${r("text-sub")}; }
[data-nc-dim="true"] .nc-range::-moz-range-progress { background: ${r("text-sub")}; }
.nc-range::-webkit-slider-runnable-track {
  height: ${r("hairline")};
  background: ${r("slider-track")};
  transition: none;
}
.nc-range::-moz-range-track {
  height: ${r("hairline")};
  background: ${r("slider-track")};
  transition: none;
}
.nc-range::-moz-range-progress {
  height: ${r("hairline")};
  background: ${r("slider-progress")};
  transition: none;
}
.nc-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: ${r("slider-thumb-size")};
  height: ${r("slider-thumb-size")};
  margin-top: calc(${r("slider-thumb-size")} / -2);
  border: 0;
  border-radius: 50%;
  background: ${r("slider-thumb")};
  transition: none;
}
.nc-range::-moz-range-thumb {
  width: ${r("slider-thumb-size")};
  height: ${r("slider-thumb-size")};
  border: 0;
  border-radius: 50%;
  background: ${r("slider-thumb")};
  transition: none;
}
${Uu} { transition: none; }
.nc-range:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("control-gap")}; }
.nc-btn {
  width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: ${r("hairline")} solid ${r("text")};
  background: transparent;
  color: ${r("text")};
  min-height: ${r("target-min")};
  padding: ${r("button-pad-y")} 0;
  font-size: ${r("readout-size")};
  letter-spacing: ${r("button-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, background-color, border-color, transform;
  transition-duration: ${r("transition-feedback")};
}
.nc-btn:hover { background: ${r("surface-raised")}; }
.nc-btn:active { transform: scale(0.985); }
.nc-btn[data-on="true"] {
  background: ${r("accent")};
  border-color: ${r("accent")};
  color: ${r("on-accent")};
}
.nc-btn:focus-visible {
  outline: ${r("focus-width-strong")} solid ${r("focus-ring")};
  outline-offset: ${r("control-gap")};
}
.nc-btn:disabled { color: ${r("text-sub")}; border-color: ${r("divider")}; cursor: not-allowed; }
.nc-toggle {
  border: 0;
  border-bottom: ${r("hairline")} solid transparent;
  background: transparent;
  color: ${r("text-sub")};
  font-size: ${r("label-size")};
  font-weight: ${r("control-weight")};
  letter-spacing: ${r("label-tracking")};
  text-transform: uppercase;
  padding: 0 0 ${r("control-gap")};
  cursor: pointer;
  align-self: flex-start;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition-property: color, border-color;
  transition-duration: ${r("transition-feedback")};
}
.nc-toggle:hover, .nc-toggle[aria-pressed="true"] { color: ${r("text")}; }
.nc-toggle:hover { border-bottom-color: ${r("text")}; }
.nc-toggle[aria-pressed="true"] { border-bottom-color: ${r("accent")}; }
.nc-toggle[data-nc-role="mute"][aria-pressed="true"] { color: ${r("rhythm.track-mute")}; }
.nc-toggle[data-nc-role="solo"][aria-pressed="true"] {
  color: ${r("rhythm.track-solo")};
  border-bottom-color: ${r("rhythm.track-solo")};
}
.nc-toggle:focus-visible {
  outline: ${r("focus-width")} solid ${r("focus-ring")};
  outline-offset: ${r("control-gap")};
}
/* Underline tabs (ASTRID .nc-seg): words on a hairline, the chosen one in text with a tab-mark accent bar on the
   line. Radio semantics stay (role="radio", aria-checked). */
.nc-seg {
  display: flex;
  border-bottom: ${r("hairline")} solid ${r("divider")};
  margin-bottom: ${r("module-gap")};
  min-width: 0;
}
.nc-seg > button {
  flex: 1 1 0;
  position: relative;
  min-width: 0;
  padding: ${r("tab-pad-y")} 0;
  border: 0;
  background: transparent;
  color: ${r("text-sub")};
  font-size: ${r("tab-size")};
  font-weight: ${r("control-weight")};
  white-space: nowrap;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${r("transition-feedback")};
}
.nc-seg:has(> button:nth-child(4)) > button { font-size: ${r("label-size")}; padding-inline: ${r("control-gap")}; }
.nc-seg > button:hover { color: ${r("text")}; }
.nc-seg > button[aria-checked="true"] { color: ${r("text")}; }
.nc-seg > button[aria-checked="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${r("hairline")} * -1);
  height: ${r("tab-mark")};
  background: ${r("accent")};
}
.nc-seg > button:focus-visible {
  outline: ${r("focus-width")} solid ${r("focus-ring")};
  outline-offset: calc(${r("focus-width")} * -1);
}
.nc-select {
  flex: 1 1 auto;
  min-width: 0;
  appearance: none;
  background: transparent;
  border: 0;
  border-bottom: ${r("hairline")} solid ${r("divider")};
  border-radius: 0;
  color: ${r("text")};
  font-size: ${r("body-size")};
  padding: ${r("control-gap")} ${r("select-pad-end")} ${r("control-gap")} 0;
  cursor: pointer;
  transition: none;
}
.nc-select:hover:not(:disabled) { border-bottom-color: ${r("text-sub")}; }
.nc-select:focus-visible { outline: none; border-bottom-color: ${r("accent")}; }
/* Slots on one line, Morph under them as a slider row (label and value, then the slider). */
.nc-slot-row { flex-direction: column; align-items: stretch; gap: ${r("module-gap")}; }
.nc-slot-line { display: flex; flex-wrap: nowrap; align-items: center; gap: ${r("slot-gap")}; min-width: 0; }
.nc-morph-field { padding-bottom: 0; }
.nc-snap-row {
  display: flex;
  flex-wrap: nowrap;
  gap: ${r("slot-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-snap-wrap {
  position: relative;
  flex: 1 1 ${r("slot-size")};
  width: ${r("slot-size")};
  max-width: ${r("slot-size")};
  min-width: 0;
  height: ${r("slot-size")};
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
  border: ${r("hairline")} solid ${r("divider")};
  border-radius: ${r("slot-radius")};
  background: transparent;
  color: ${r("text-sub")};
  font-family: ${r("font-readout")};
  font-size: ${r("slot-font-size")};
  line-height: ${r("label-leading")};
  padding: 0;
  cursor: pointer;
  transition: none;
}
.nc-snap:hover { border-color: ${r("text-sub")}; }
/* Has saved content: an ink outline and ink digit, as in Bass (no grey fill). Empty: hairline, sub ink. */
.nc-snap[data-filled="true"] {
  border-color: ${r("text-sub")};
  color: ${r("text")};
}
/* Active (Bass): the accent outline, ink and underline, in every theme and surprise palette. */
.nc-snap[data-active="true"] {
  background: transparent;
  border-color: ${r("accent")};
  color: ${r("accent")};
  box-shadow: inset 0 calc(-1 * ${r("focus-width")} * 2) 0 ${r("accent")};
}
/* Queued for the end of the bar (Bass): a faint accent underline and outline that go full accent on each beat
   (audio-driven, from the playhead), steady under reduced motion. A second tap switches now. */
.nc-snap[data-queued="true"] {
  color: ${r("accent")};
  outline: ${r("focus-width")} solid ${r("accent-faint")};
  outline-offset: ${r("hairline")};
  box-shadow: inset 0 calc(-1 * ${r("focus-width")} * 2) 0 ${r("accent-faint")};
}
.nc-snap[data-queued="true"][data-pulse="true"] {
  outline-color: ${r("accent")};
  background: ${r("accent-soft")};
  box-shadow: inset 0 calc(-1 * ${r("focus-width")} * 2) 0 ${r("accent")};
}
/* Edited since it was stored or recalled: a small dot in the corner, in the slot's ink. */
.nc-snap[data-edited="true"] { position: relative; }
.nc-snap[data-edited="true"]::after {
  content: "";
  position: absolute;
  top: ${r("control-gap")};
  right: ${r("control-gap")};
  width: ${r("control-gap")};
  height: ${r("control-gap")};
  border-radius: 50%;
  background: currentColor;
}
.nc-snap:focus-visible {
  outline: ${r("focus-width")} solid ${r("focus-ring")};
  outline-offset: ${r("hairline")};
}
.nc-sparkle {
  position: relative;
  flex: 0 0 ${r("sparkle-size")};
  width: ${r("sparkle-size")};
  height: ${r("sparkle-size")};
  margin-inline: ${r("rhythm.sparkle-gap")};
  padding: 0;
  border: 0;
  background: transparent;
  color: ${r("text-sub")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${r("transition-feedback")};
}
.nc-play-row {
  display: flex;
  align-items: stretch;
  gap: ${r("rhythm.sparkle-gap")};
}
.nc-play-row > .nc-btn { flex: 1 1 auto; width: auto; }
.nc-sparkle-btn {
  flex: 0 0 ${r("target-min")};
  width: ${r("target-min")};
  min-height: ${r("target-min")};
  padding: 0;
  border: ${r("hairline")} solid ${r("divider")};
  background: ${r("surprise-fill")};
  color: ${r("surprise-ink")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color, background-color, transform;
  transition-duration: ${r("transition-feedback")};
}
.nc-sparkle-btn svg { width: calc(${r("target-min")} / 2); height: calc(${r("target-min")} / 2); display: block; }
.nc-sparkle-btn:hover { background: ${r("surface-raised")}; }
.nc-sparkle-btn:active { transform: scale(0.985); }
.nc-sparkle-btn:focus-visible {
  outline: ${r("focus-width")} solid ${r("focus-ring")};
  outline-offset: ${r("hairline")};
}
.nc-sparkle svg { width: ${r("sparkle-icon-size")}; height: ${r("sparkle-icon-size")}; display: block; }
.nc-sparkle:hover { color: ${r("text")}; }
.nc-sparkle:focus-visible {
  outline: ${r("focus-width")} solid ${r("focus-ring")};
  outline-offset: ${r("hairline")};
}
.nc-module-hd:has(> .nc-snap-msg:not(:empty)) { flex-wrap: wrap; row-gap: 0; }
.nc-snap-msg:not(:empty) { order: 1; flex-basis: 100%; }
.nc-snap-msg {
  flex: 1 1 auto;
  min-width: 0;
  text-align: left;
  font-family: ${r("font-readout")};
  font-size: ${r("readout-size-small")};
  color: ${r("text-sub")};
  white-space: normal;
  overflow: hidden;
  transition: none;
}
.nc-module[data-nc-slim] {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${r("header-gap")};
}
.nc-module[data-nc-slim] .nc-module-hd { display: contents; }
.nc-module[data-nc-slim] .nc-title { order: 0; }
.nc-module[data-nc-slim] .nc-snap-msg { order: 1; }
.nc-module[data-nc-slim] .nc-slim { order: 2; margin-top: 0; }
.nc-module[data-nc-slim] .nc-module-end { order: 3; }
.nc-steps {
  display: flex;
  flex-wrap: nowrap;
  gap: ${r("rhythm.step-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-name {
  flex: 0 1 ${r("name-width")};
  width: ${r("name-width")};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${r("font-readout")};
  font-size: ${r("readout-size-small")};
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}
.nc-name:focus-visible {
  outline: ${r("focus-width")} solid ${r("focus-ring")};
  outline-offset: ${r("hairline")};
}
/* Beats read at a glance: every 4 steps the gap widens from step-gap to beat-gap (one beat = one pad row on phones). */
/* Counted among the cells only ("of .nc-step-wrap"): the lane's end handle sits between cells when the lane is short,
   and must not push a beat gap onto the wrong cell. */
.nc-steps > .nc-step-wrap:nth-child(4n + 1 of .nc-step-wrap):not(:first-child) {
  margin-inline-start: calc(${r("beat-gap")} - ${r("rhythm.step-gap")});
}
/* Every lane row bleeds a little into the module padding, so the selected one can be tinted edge to edge (M, S,
   name, steps, menu) with its marker clear of the M button, without moving anything when the selection changes. */
.nc-row[data-nc-row] {
  margin-inline: calc(-1 * ${r("row-inset")});
  padding-inline: ${r("row-inset")};
}
/* The selected lane is lit, not just underlined: the whole row tinted, with a solid accent bar at its start. */
.nc-row[data-selected="true"] {
  background: ${r("accent-tint")};
  box-shadow: inset ${r("marker-width")} 0 0 ${r("accent")};
}
/* Also selected (multi-select): the same tint, no marker; the name underlined. */
.nc-row[data-picked="true"] { background: ${r("accent-tint")}; }
.nc-row[data-picked="true"] .nc-name,
.nc-row[data-selected="true"] .nc-name {
  color: ${r("text")};
  text-decoration: underline;
  text-decoration-color: ${r("accent")};
  text-decoration-thickness: ${r("hairline")};
  text-underline-offset: ${r("control-gap")};
}
/* On the tint, off steps and unlit M/S are paper squares (step-cell-off), as in the mockup, so their outlines stay
   crisp instead of melting into the tint. */
.nc-row[data-selected="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-selected="true"] .nc-ms:not([aria-pressed="true"]),
.nc-row[data-picked="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-picked="true"] .nc-ms:not([aria-pressed="true"]) { background: ${r("rhythm.step-cell-off")}; }
/* Moves (renderMoves): a label column, then quiet square icon buttons that darken on hover (Bass's look). */
.nc-moves { display: flex; flex-direction: column; gap: ${r("move-row-gap")}; margin-top: ${r("page-body-gap")}; }
.nc-moves-row { display: flex; align-items: center; gap: ${r("module-gap")}; }
.nc-moves-label {
  flex: none;
  width: ${r("move-label-width")};
  font-size: ${r("label-size")};
  font-weight: ${r("label-weight")};
  letter-spacing: ${r("label-tracking")};
  text-transform: uppercase;
  color: ${r("text-sub")};
}
.nc-moves-btns { display: flex; flex-wrap: wrap; gap: ${r("move-gap")}; min-width: 0; }
.nc-moves-btn {
  display: grid;
  place-items: center;
  width: ${r("move-size")};
  height: ${r("move-size")};
  padding: 0;
  border: ${r("hairline")} solid ${r("divider")};
  border-radius: ${r("slot-radius")};
  background: transparent;
  color: ${r("text-sub")};
  cursor: pointer;
}
.nc-moves-icon { width: ${r("move-icon")}; height: ${r("move-icon")}; }
.nc-moves-btn:hover:not(:disabled) { color: ${r("text")}; border-color: ${r("text-sub")}; }
.nc-moves-btn:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("hairline")}; }
.nc-moves-btn:disabled { color: ${r("divider")}; cursor: default; }
@media (pointer: coarse) {
  .nc-moves-btn { width: ${r("target-min")}; height: ${r("target-min")}; }
}
/* Muted, or silenced by another lane's solo: the lane's steps dim by colour, not just its button. On steps fill with
   text-sub (the velocity shade is set aside while silent), off steps keep only a divider outline. */
.nc-row[data-silent="true"] .nc-step { border-color: ${r("divider")}; }
.nc-row[data-silent="true"] .nc-step[aria-pressed="true"] { background: ${r("text-sub")}; border-color: ${r("text-sub")}; }
.nc-name[data-nc-lane="1"] { color: ${r("rhythm.lane-1")}; }
.nc-name[data-nc-lane="2"] { color: ${r("rhythm.lane-2")}; }
.nc-name[data-nc-lane="3"] { color: ${r("rhythm.lane-3")}; }
.nc-name[data-nc-lane="4"] { color: ${r("rhythm.lane-4")}; }
.nc-ms-wrap {
  position: relative;
  flex: 0 0 ${r("slider-pitch")};
  height: ${r("slider-pitch")};
}
.nc-ms {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: ${r("hairline")} solid ${r("divider")};
  border-radius: ${r("slot-radius")};
  background: transparent;
  color: ${r("text-sub")};
  font-size: ${r("label-size")};
  font-weight: ${r("label-weight")};
  cursor: pointer;
  transition: none;
}
.nc-ms:hover { color: ${r("text")}; }
.nc-ms[data-nc-ms="mute"][aria-pressed="true"] {
  background: ${r("rhythm.track-mute")};
  border-color: ${r("rhythm.track-mute")};
  color: ${r("surface-page")};
}
.nc-ms[data-nc-ms="solo"][aria-pressed="true"] {
  background: ${r("rhythm.track-solo")};
  border-color: ${r("rhythm.track-solo")};
  color: ${r("surface-page")};
}
.nc-ms:focus-visible {
  outline: ${r("focus-width")} solid ${r("focus-ring")};
  outline-offset: ${r("hairline")};
}
.nc-step-wrap {
  position: relative;
  flex: 1 1 ${r("rhythm.step-cell-size")};
  min-width: 0;
  aspect-ratio: 1;
  max-height: ${r("slider-pitch")};
}
.nc-step {
  position: absolute;
  inset: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: ${r("hairline")} solid ${r("text-sub")};
  border-radius: ${r("slot-radius")};
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
  background: ${r("velocity-fill")};
  border-color: ${r("velocity-fill")};
  color: ${r("rhythm.step-cell-ink")};
}
.nc-step[aria-pressed="true"][data-accent="true"] {
  box-shadow: inset 0 calc(-1 * ${r("rhythm.accent-mark-size")}) 0 0 ${r("rhythm.accent-mark")};
}
/* The playing step, Bass's method: an accent ring outside the step, one hairline clear of it, so it reads the same on an
   empty step or a filled one at any velocity, and every lane's ring at the playhead forms one column. It lifts
   above its neighbours (the ring is wider than step-gap). No transition: it follows the audio clock, step by step. */
.nc-step[data-playhead="true"] {
  z-index: 1;
  outline: ${r("playhead-width")} solid ${r("rhythm.playhead")};
  outline-offset: ${r("playhead-offset")};
}
.nc-step[data-bar="true"] { border-bottom-color: ${r("rhythm.bar-accent")}; }
/* Chance below 100%: a dashed outline at the same width (style only, no opacity, since shade means velocity). The fill
   stops at the padding box, so the dashes are the step's own colour with the row showing between them. */
.nc-step[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
/* Per-lane length: steps past the end are ghosted on the selected row; the end handle sits after the last step. */
.nc-step[data-out="true"] { border-color: ${r("divider")}; background: transparent; pointer-events: none; }
/* Every lane lays its handle out the same way, selected or not, and the handle takes no width in the row: its negative
   margins cancel its own width and the step gap it adds, so it sits centred in the gap after the last step and the
   cells never move when the selection changes. Unselected lanes keep it hidden (visibility, so it cannot be focused). */
.nc-len-handle {
  display: block;
  visibility: hidden;
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${r("control-gap")};
  margin-inline: calc((${r("control-gap")} + ${r("rhythm.step-gap")}) / -2);
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
  width: ${r("hairline")};
  height: ${r("target-min")};
  max-height: calc(${r("target-min")} / 2);
  transform: translate(-50%, -50%);
  border-inline: ${r("hairline")} solid ${r("text-sub")};
  background: ${r("text-sub")};
}
.nc-row[data-selected="true"] .nc-len-handle { visibility: visible; z-index: 1; }
.nc-len-handle:hover::before, .nc-len-handle[data-dragging="true"]::before { background: ${r("text")}; border-color: ${r("text")}; }
.nc-len-handle:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("hairline")}; }
button.nc-pads-label {
  border: 0;
  background: transparent;
  min-height: ${r("target-min")};
  padding: 0;
  font-family: inherit;
  cursor: pointer;
}
button.nc-pads-label[aria-pressed="true"] { color: ${r("accent")}; }
.nc-pad[data-out="true"] { border-color: ${r("divider")}; border-style: dashed; background: transparent; color: ${r("text-sub")}; }
.nc-pad[data-end="true"] { box-shadow: inset calc(-1 * ${r("focus-width")} * 2) 0 0 ${r("text")}; }
.nc-pad[data-end="true"][aria-pressed="true"][data-accent="true"] {
  box-shadow: inset calc(-1 * ${r("focus-width")} * 2) 0 0 ${r("text")}, inset 0 calc(-1 * ${r("rhythm.accent-mark-size")}) 0 0 ${r("rhythm.accent-mark")};
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
  font-size: ${r("label-size")};
  font-weight: ${r("label-weight")};
  letter-spacing: ${r("label-tracking")};
  text-transform: uppercase;
  color: ${r("text")};
}
.nc-step-tools {
  display: flex;
  align-items: stretch;
  gap: ${r("module-gap")};
  margin-bottom: ${r("module-gap")};
}
.nc-step-tools > .nc-seg { flex: 1 1 auto; align-self: flex-end; margin-bottom: 0; }
/* No margin (nor the sparkle's): the row gap already sets the dice off the length handle, and 1024 needs the
   width for 18 px cells now that beats are split by beat-gap. */
.nc-row-dice { flex: none; margin-inline: 0; }
.nc-pads-dice svg { width: calc(${r("target-min")} / 3); height: calc(${r("target-min")} / 3); display: block; margin: auto; }
.nc-fill { padding-inline: ${r("module-gap")}; touch-action: none; user-select: none; -webkit-user-select: none; }
/* Clear is a tap, not a hold: phones still scroll over it. */
.nc-clear { touch-action: manipulation; }
.nc-fill[aria-pressed="true"] { background: ${r("text")}; border-color: ${r("text")}; color: ${r("surface-page")}; }
.nc-pads-step, .nc-pads-play, .nc-fill {
  flex: none;
  min-width: ${r("target-min")};
  min-height: ${r("target-min")};
  border: ${r("hairline")} solid ${r("divider")};
  border-radius: ${r("slot-radius")};
  background: ${r("surface-page")};
  color: ${r("text")};
  font-family: ${r("font-ui")};
  font-size: ${r("label-size")};
  font-weight: ${r("title-weight")};
  letter-spacing: ${r("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-pads-play { padding-inline: ${r("module-gap")}; }
.nc-pads-play[aria-pressed="true"] { background: ${r("text")}; border-color: ${r("text")}; color: ${r("surface-page")}; }
.nc-pads-step:focus-visible, .nc-pads-play:focus-visible, .nc-fill:focus-visible {
  outline: ${r("focus-width")} solid ${r("focus-ring")};
  outline-offset: ${r("hairline")};
}
/* Fill and Clear are text actions, like the page's Save and Load (Peter, 2026-10-31: the buttons took too much
   height). Fill held reads as pressed: ink with an ink underline. On a coarse pointer an invisible pad keeps each a
   full target (below). */
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear) {
  min-width: 0;
  min-height: 0;
  align-self: center;
  border: 0;
  border-bottom: ${r("hairline")} solid transparent;
  border-radius: 0;
  background: transparent;
  padding: 0 0 ${r("control-gap")};
  color: ${r("text-sub")};
  font-weight: ${r("control-weight")};
  transition-property: color, border-color;
  transition-duration: ${r("transition-feedback")};
}
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):hover,
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear)[aria-pressed="true"] { background: transparent; color: ${r("text")}; border-bottom-color: ${r("text")}; }
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):focus-visible { outline-offset: ${r("control-gap")}; }
/* Two text actions side by side (Fill, Clear) get the page actions' gap. */
.nc-step-tools .nc-fill + .nc-fill { margin-left: ${r("page-action-gap")}; }
.nc-pad {
  position: relative;
  overflow: hidden;
  min-height: calc(${r("target-min")} * 1.25);
  border: ${r("hairline")} solid ${r("text-sub")};
  border-radius: ${r("slot-radius")};
  background: transparent;
  color: ${r("text-sub")};
  font-family: ${r("font-readout")};
  font-size: ${r("readout-size-small")};
  text-align: start;
  vertical-align: top;
  padding: ${r("control-gap")} ${r("module-gap")};
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  transition: none;
}
/* Pads show the selected lane's steps, so they follow the same rules: fill = velocity, accent = the paper mark,
   chance below 100% = dashed outline. */
.nc-pad[aria-pressed="true"] {
  background: ${r("velocity-fill")};
  border-color: ${r("velocity-fill")};
  color: ${r("rhythm.step-cell-ink")};
}
.nc-pad[aria-pressed="true"][data-accent="true"] {
  box-shadow: inset 0 calc(-1 * ${r("rhythm.accent-mark-size")}) 0 0 ${r("rhythm.accent-mark")};
}
.nc-pad[data-playhead="true"] {
  outline: ${r("playhead-width")} solid ${r("rhythm.playhead")};
  outline-offset: ${r("playhead-offset")};
}
.nc-pad[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
.nc-pads[data-silent="true"] .nc-pad { border-color: ${r("divider")}; color: ${r("text-sub")}; }
.nc-pads[data-silent="true"] .nc-pad[aria-pressed="true"] { background: ${r("text-sub")}; border-color: ${r("text-sub")}; color: ${r("surface-page")}; }
.nc-pad:focus-visible {
  outline: ${r("focus-width")} solid ${r("focus-ring")};
  outline-offset: ${r("hairline")};
}
.nc-step:focus-visible {
  outline: ${r("focus-width")} solid ${r("focus-ring")};
  outline-offset: ${r("hairline")};
}
/* A focused step or pad that is also playing keeps the playhead ring (focus comes later at the same specificity and
   would thin it to focus-width; both are the accent). */
.nc-step[data-playhead="true"]:focus-visible, .nc-pad[data-playhead="true"]:focus-visible {
  outline-width: ${r("playhead-width")};
  outline-offset: ${r("playhead-offset")};
}
.nc-ui-fx {
  margin-inline: calc(${r("module-pad")} * -1);
  padding: ${r("stack-card-pad-y")} ${r("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-ui-fx-name {
  margin: 0 0 ${r("module-gap")} 0;
  font-size: ${r("body-size")};
  font-weight: ${r("fx-name-weight")};
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
  gap: ${r("module-gap")};
  margin-bottom: ${r("module-gap")};
  min-width: 0;
}
.nc-ui-fx-hd > .nc-ui-fx-name { margin: 0 auto 0 0; }
/* Fold (onFold): a −/+ after the switch. Folded, the card keeps its header row only; in a console row from 769 px it
   is a narrow column instead (below). It folds and unfolds at once: no motion. */
.nc-ui-fx-hd > [data-nc-fx-hide] { flex: none; }
/* Like a channel strip's (Peter, 2026-11-01: "the minimize icon should be positioned in the same place as the
   instrument channels"): the fold triangle sits in the card's top-left corner, above the name. */
.nc-ui-fx:has(> .nc-ui-fx-hd > [data-nc-fx-hide]) { position: relative; }
.nc-ui-fx-hd > [data-nc-fx-hide] { position: absolute; top: ${r("control-gap")}; left: ${r("control-gap")}; z-index: 1; }
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
  padding: ${r("hairline")};
  border: 0;
  background: transparent;
  color: ${r("text-sub")};
  line-height: 1;
  cursor: pointer;
}
.nc-fold-toggle:hover { color: ${r("text")}; }
.nc-fold-toggle:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("hairline")}; }
.nc-fold-tri {
  display: block;
  width: calc(${r("control-gap")} * 1.5);
  height: calc(${r("control-gap")} * 2);
  background: currentColor;
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
  transition: transform ${r("motion-press")} ${r("motion-press-easing")};
}
.nc-fold-toggle[aria-expanded="false"] .nc-fold-tri,
.nc-ui-fx-fold > .nc-fold-tri { transform: scaleX(-1); }
.nc-ui-fx-fold > .nc-fold-tri { flex: none; color: ${r("text-sub")}; }
.nc-ui-fx-fold:hover > .nc-fold-tri { color: ${r("text")}; }
.nc-ui-fx-fold { display: none; }
/* A folded card's column width: fx-fold-width, or fx-fold-width-slim for a card with foldSlim (the Studio's send
   returns; Peter, 2026-11-01: "make send effect minimized state 50% thinner"). */
.nc-ui-fx { --nc-fx-fold-w: ${r("fx-fold-width")}; }
.nc-ui-fx[data-nc-fold-slim] { --nc-fx-fold-w: ${r("fx-fold-width-slim")}; }
.nc-ui-fx[data-nc-folded] > :not(.nc-ui-fx-hd, .nc-token-probe) { display: none; }
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd { margin-bottom: 0; }
.nc-ui-fx-fold {
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${r("module-gap")};
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${r("text-sub")};
  font: inherit;
  cursor: pointer;
  transition: none;
}
.nc-ui-fx-fold:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("control-gap")}; }
/* The on/off word as the switch draws it: off text-sub, on text with the accent hairline. */
.nc-ui-fx-fold-state {
  padding-bottom: ${r("control-gap")};
  border-bottom: ${r("hairline")} solid transparent;
  font-size: ${r("label-size")};
  font-weight: ${r("control-weight")};
  letter-spacing: ${r("label-tracking")};
  text-transform: uppercase;
  line-height: ${r("label-leading")};
}
.nc-ui-fx-fold[data-on="true"] .nc-ui-fx-fold-state { color: ${r("text")}; border-bottom-color: ${r("accent")}; }
/* The name read bottom to top (the Studio's instrument spine). */
.nc-ui-fx-fold-name {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: ${r("body-size")};
  font-weight: ${r("fx-name-weight")};
  color: ${r("text")};
  white-space: nowrap;
}
.nc-ui-fx-fold:hover .nc-ui-fx-fold-state { color: ${r("text")}; }
/* The slim column (fx-fold-width-slim): the same parts, the on/off word a step smaller so OFF fits with room. */
.nc-ui-fx[data-nc-fold-slim] .nc-ui-fx-fold-state { font-size: ${r("scale-size")}; letter-spacing: 0; }
.nc-ui-fx-visual { display: block; width: 100%; height: ${r("display-height")}; }
/* EQ graph (eq-graph.js): a display at the top of an EQ card. A plot a touch off the card's shade, a hairline frame,
   the spectrum and curve canvases filling it, and one dot per band (its own colour) over them, each a 44 px target. */
.nc-eq { position: relative; min-width: 0; margin-bottom: ${r("control-gap")}; }
.nc-eq-plot {
  position: relative;
  height: ${r("eq-graph-height")};
  background: ${r("eq-graph-bg")};
  border-radius: ${r("slot-radius")};
  box-shadow: inset 0 0 0 ${r("hairline")} ${r("divider")};
}
.nc-eq-plot > canvas { position: absolute; inset: 0; display: block; width: 100%; height: 100%; pointer-events: none; }
.nc-eq-node {
  --nc-eq-tone: ${r("eq-curve")};
  position: absolute;
  width: ${r("eq-node-size")};
  height: ${r("eq-node-size")};
  margin: calc(${r("eq-node-size")} / -2) 0 0 calc(${r("eq-node-size")} / -2);
  border-radius: 50%;
  background: var(--nc-eq-tone);
  box-shadow: 0 0 0 ${r("hairline")} ${r("eq-graph-bg")};
  cursor: grab;
  touch-action: none;
  outline: none;
  z-index: 1;
}
.nc-eq-node[data-tone="1"] { --nc-eq-tone: ${r("eq-band-1")}; }
.nc-eq-node[data-tone="2"] { --nc-eq-tone: ${r("eq-band-2")}; }
.nc-eq-node[data-tone="3"] { --nc-eq-tone: ${r("eq-band-3")}; }
/* The hit area (target-min), and a soft halo in the band's colour while it is hovered, focused or dragged. */
.nc-eq-node::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${r("target-min")};
  height: ${r("target-min")};
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
.nc-eq-node::after {
  content: "";
  position: absolute;
  inset: calc(${r("control-gap")} * -1.5);
  border-radius: 50%;
  background: color-mix(in srgb, var(--nc-eq-tone) 24%, transparent);
  transform: scale(0);
  transition: transform ${r("motion-press")} ${r("motion-press-easing")};
  pointer-events: none;
}
.nc-eq-node:hover::after, .nc-eq-node[data-active="true"]::after { transform: scale(1); }
.nc-eq-node[data-drag="true"] { cursor: grabbing; }
.nc-eq-node:focus-visible { box-shadow: 0 0 0 calc(${r("hairline")} * 2) ${r("eq-graph-bg")}, 0 0 0 calc(${r("hairline")} * 2 + ${r("focus-width")}) ${r("focus-ring")}; }
.nc-eq[data-on="false"] .nc-eq-node { --nc-eq-tone: ${r("text-sub")}; }
/* Not maximized: a display. The dots are markers; a click on the plot maximizes the card. */
.nc-eq[data-locked] .nc-eq-plot { cursor: zoom-in; }
.nc-eq[data-locked] .nc-eq-node { pointer-events: none; cursor: inherit; }
/* The readout beside the band in use: "MID −18 dB · 938 Hz · Q 0.3". */
.nc-eq-tip {
  position: absolute;
  z-index: 2;
  padding: ${r("hairline")} ${r("control-gap")};
  border-radius: ${r("slot-radius")};
  background: ${r("eq-graph-bg")};
  box-shadow: inset 0 0 0 ${r("hairline")} ${r("divider")};
  color: ${r("text")};
  font-size: ${r("label-size")};
  font-weight: ${r("label-weight")};
  letter-spacing: ${r("label-tracking")};
  line-height: ${r("label-leading")};
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
  padding: ${r("hairline")};
  border: 0;
  background: transparent;
  color: ${r("text-sub")};
  font: inherit;
  line-height: 1;
  cursor: pointer;
}
.nc-fx-max[hidden] { display: none; }
.nc-fx-max:hover, .nc-fx-close:hover { color: ${r("text")}; }
.nc-fx-max:focus-visible, .nc-fx-close:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("hairline")}; }
.nc-fx-close { font-size: ${r("title-size")}; padding-inline: ${r("control-gap")}; }
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
  padding: 0 ${r("hairline")};
  border: 0;
  background: transparent;
  color: ${r("text-sub")};
  font-family: ${r("font-readout")};
  font-size: ${r("body-size")};
  line-height: 1;
  cursor: pointer;
}
.nc-fx-remove::before {
  content: "";
  position: absolute;
  top: 50%;
  left: calc(${r("control-gap")} * -1);
  right: calc(${r("control-gap")} * -1);
  height: max(100%, calc(${r("control-gap")} * 5));
  transform: translateY(-50%);
}
.nc-fx-remove:hover { color: ${r("text")}; }
.nc-fx-remove:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("hairline")}; }
.nc-fx-remove[hidden],
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd > .nc-fx-remove,
.nc-ui-fx[data-nc-max="over"] > .nc-ui-fx-hd > .nc-fx-remove { display: none; }
.nc-fx-max-icon { position: relative; display: block; width: calc(${r("control-gap")} * 2.5); height: calc(${r("control-gap")} * 2.5); }
.nc-fx-max-icon > i {
  position: absolute;
  width: calc(${r("control-gap")} * 1.1);
  height: calc(${r("control-gap")} * 1.1);
  border: 0 solid currentColor;
  transition: transform ${r("motion-press")} ${r("motion-press-easing")};
}
.nc-fx-max-icon > i:nth-child(1) { left: 0; top: 0; border-left-width: calc(${r("hairline")} * 1.5); border-top-width: calc(${r("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(2) { right: 0; top: 0; border-right-width: calc(${r("hairline")} * 1.5); border-top-width: calc(${r("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(3) { left: 0; bottom: 0; border-left-width: calc(${r("hairline")} * 1.5); border-bottom-width: calc(${r("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(4) { right: 0; bottom: 0; border-right-width: calc(${r("hairline")} * 1.5); border-bottom-width: calc(${r("hairline")} * 1.5); }
.nc-fx-max[aria-pressed="true"] .nc-fx-max-icon > i { transform: rotate(180deg); }
/* Maximized: a taller plot, and the dials in columns under it (row and over). */
.nc-ui-fx[data-nc-max] .nc-eq-plot { height: ${r("eq-graph-height-max")}; }
.nc-ui-fx[data-nc-max="over"],
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-max="row"] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${r("fx-card-width")} * 0.6)), 1fr));
  column-gap: calc(${r("module-pad")} * 2);
  row-gap: ${r("module-gap")};
  align-content: start;
}
/* Maximized, the dials sit on one line (Peter, 2026-11-01): as many columns as the card has dials (--nc-fx-dials,
   set by controls.js), sharing the width. */
.nc-ui-fx[data-nc-max="over"][style*="--nc-fx-dials"],
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-max="row"][style*="--nc-fx-dials"] {
  grid-template-columns: repeat(var(--nc-fx-dials), minmax(0, 1fr));
  column-gap: ${r("module-pad")};
}
.nc-ui-fx[data-nc-max="row"] > :is(.nc-ui-fx-hd, .nc-eq, .nc-ui-more, .nc-ui-fx-fold, .nc-note),
.nc-ui-fx[data-nc-max="over"] > :is(.nc-ui-fx-hd, .nc-eq, .nc-ui-more, .nc-ui-fx-fold, .nc-note) { grid-column: 1 / -1; }
.nc-ui-fx[data-nc-max] > .nc-eq { margin-bottom: ${r("module-gap")}; }
/* Over the modules (an instrument's Hacks column): a panel three module widths wide, in its module, above the rest. */
.nc-module:has(.nc-ui-fx[data-nc-max="over"]) { position: relative; z-index: ${r("eq-panel-layer")}; }
.nc-ui-fx[data-nc-max="over"] {
  position: absolute;
  z-index: ${r("eq-panel-layer")};
  margin: 0;
  box-shadow: 0 0 0 ${r("hairline")} ${r("text-sub")};
}
.nc-fx-ghost { margin-inline: calc(${r("module-pad")} * -1); }
.nc-ui-more > summary {
  display: flex;
  align-items: center;
  padding-block: ${r("control-gap")};
  cursor: pointer;
  font-size: ${r("label-size")};
  font-weight: ${r("label-weight")};
  letter-spacing: ${r("label-tracking")};
  text-transform: uppercase;
  color: ${r("text-sub")};
}
.nc-ui-more > summary:hover { color: ${r("text")}; }
.nc-ui-more > summary:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: calc(${r("focus-width")} * -1); }
/* Group (group.js): a collapsible run of a module's controls. Its header is the More toggle's look (label style,
   text-sub, hover to text) as a real button: the title with the -/+ mark at the end of its line, and while closed a
   quiet summary on its own line under them, wrapping rather than cut (a narrow column still shows all of it).
   Open or closed at once: no motion. Open, its controls space as the module's own do. */
.nc-group { display: flex; flex-direction: column; gap: ${r("module-pad")}; min-width: 0; }
.nc-group-toggle {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: baseline;
  column-gap: ${r("module-gap")};
  row-gap: ${r("control-gap")};
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: ${r("control-gap")} 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-family: ${r("font-ui")};
  font-size: ${r("label-size")};
  font-weight: ${r("label-weight")};
  letter-spacing: ${r("label-tracking")};
  text-transform: uppercase;
  text-align: start;
  color: ${r("text-sub")};
}
.nc-group-toggle:hover { color: ${r("text")}; }
.nc-group-toggle:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: calc(${r("focus-width")} * -1); }
.nc-group-title { grid-area: 1 / 1; min-width: 0; }
.nc-group-summary {
  grid-area: 2 / 1 / 3 / -1;
  min-width: 0;
  overflow-wrap: anywhere;
  font-family: ${r("font-readout")};
  font-size: ${r("readout-size-small")};
  letter-spacing: normal;
  text-transform: none;
}
.nc-group-mark { grid-area: 1 / 2; font-family: ${r("font-readout")}; }
.nc-group-summary:empty, .nc-group[data-nc-open="true"] .nc-group-summary { display: none; }
.nc-group-body { display: flex; flex-direction: column; gap: ${r("module-pad")}; min-width: 0; }
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
  padding: 0 0 ${r("control-gap")};
  border: 0;
  border-bottom: ${r("hairline")} solid transparent;
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: ${r("label-size")};
  font-weight: ${r("control-weight")};
  letter-spacing: ${r("label-tracking")};
  text-transform: uppercase;
  color: ${r("text-sub")};
  transition-property: color, border-color;
  transition-duration: ${r("transition-feedback")};
}
.nc-ui-switch[aria-checked="true"] { color: ${r("text")}; border-bottom-color: ${r("accent")}; }
.nc-ui-switch:hover { color: ${r("text")}; border-bottom-color: ${r("text")}; }
.nc-ui-switch:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("control-gap")}; }
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
    width: max(100%, ${r("target-min")});
    height: max(100%, ${r("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-toggle { overflow: visible; text-overflow: clip; }
  .nc-select { min-height: ${r("target-min")}; }
}
/* A panel (Rhythm's Parameters, under the grid): a page-coloured area, full bleed to the module's sides and
   bottom, a hairline above, a title and what it edits, and its controls in columns from 1024 px. */
.nc-section[data-nc-panel="true"] {
  flex: 1 0 auto;
  margin-inline: calc(${r("module-pad")} * -1);
  margin-bottom: calc(${r("module-pad")} * -1);
  padding: ${r("module-pad")};
  background: ${r("surface-page")};
  border-top: ${r("hairline")} solid ${r("divider")};
}
.nc-panel-hd {
  display: flex;
  align-items: baseline;
  gap: ${r("module-gap")};
  min-width: 0;
}
.nc-panel-title {
  margin: 0;
  font-size: ${r("title-size")};
  font-weight: ${r("title-weight")};
  letter-spacing: ${r("title-tracking")};
  white-space: nowrap;
}
.nc-panel-subject {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${r("font-readout")};
  font-size: ${r("readout-size-small")};
  color: ${r("text-sub")};
}
.nc-section[data-nc-lane="1"] .nc-panel-subject { color: ${r("rhythm.lane-1")}; }
.nc-section[data-nc-lane="2"] .nc-panel-subject { color: ${r("rhythm.lane-2")}; }
.nc-section[data-nc-lane="3"] .nc-panel-subject { color: ${r("rhythm.lane-3")}; }
.nc-section[data-nc-lane="4"] .nc-panel-subject { color: ${r("rhythm.lane-4")}; }
.nc-panel-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${r("module-pad")};
  min-width: 0;
}
.nc-canvas {
  width: 100%;
  height: ${r("display-height")};
  display: block;
  background: transparent;
}
.nc-note {
  /* The containing block for its absolute token probe, so overflow: hidden clips the probe after a long note. */
  position: relative;
  margin: 0;
  min-width: 0;
  color: ${r("text-sub")};
  font-family: ${r("font-readout")};
  font-size: ${r("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-note[data-nc-tone="danger"] { color: ${r("danger")}; }
.nc-knob {
  width: ${r("knob-size")};
  height: ${r("knob-size")};
  flex: none;
  border-radius: 50%;
  border: ${r("hairline")} solid ${r("divider")};
  background: ${r("surface-page")};
  position: relative;
  padding: 0;
  touch-action: none;
  cursor: pointer;
  transition: none;
}
.nc-knob-mark {
  position: absolute;
  left: 50%;
  top: ${r("control-gap")};
  width: ${r("hairline")};
  height: ${r("control-gap")};
  background: ${r("text")};
  transform-origin: center ${r("module-gap")};
  transform: rotate(calc(var(--knob-turn, 0) * 1deg));
  transition: none;
}
.nc-knob:focus-visible {
  outline: ${r("focus-width")} solid ${r("focus-ring")};
  outline-offset: ${r("hairline")};
}
/* Tabs stay on one line (no height jump); a tab that does not fit gives way with an ellipsis, and its full text stays
   its accessible name. */
.nc-choice-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${r("control-gap")} ${r("header-gap")};
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
  border-bottom: ${r("hairline")} solid transparent;
  background: transparent;
  color: ${r("text-sub")};
  font-family: ${r("font-readout")};
  font-size: ${r("readout-size-small")};
  padding: ${r("control-gap")} 0;
  cursor: pointer;
  transition: none;
}
/* On touch a tab cut to an ellipsis is still a full target: never narrower or shorter than target-min. */
@media (pointer: coarse) {
  .nc-choice { min-width: ${r("target-min")}; min-height: ${r("target-min")}; }
  /* Tabs that cannot shrink below target-min scroll within their row (no visible scrollbar), never the page. */
  .nc-choice-row { overflow-x: auto; scrollbar-width: none; }
  .nc-choice-row::-webkit-scrollbar { display: none; }
}
.nc-choice[aria-selected="true"] {
  color: ${r("text")};
  border-bottom-color: ${r("accent")};
}
.nc-choice:focus-visible {
  outline: ${r("focus-width")} solid ${r("focus-ring")};
  outline-offset: ${r("hairline")};
}
/* Pad grid (NYX): pads as the way in. Empty pads are shaded and say Load; filled pads carry a lane-coloured bar and
   a mini waveform; the selected pad is outlined in the accent. */
.nc-padgrid { position: relative; }
.nc-padgrid-pads { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: ${r("control-gap")}; }
.nc-padgrid-pads[data-nc-columns="4"] { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.nc-padgrid-pad {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  align-content: start;
  min-width: 0;
  min-height: calc(${r("target-min")} * 1.5);
  padding: ${r("control-gap")} ${r("control-gap")} ${r("control-gap")} calc(${r("control-gap")} * 2);
  border: ${r("hairline")} solid ${r("text-sub")};
  border-radius: ${r("slot-radius")};
  background: transparent;
  color: ${r("text")};
  font-family: ${r("font-ui")};
  font-size: ${r("label-size")};
  text-align: left;
  cursor: pointer;
  -webkit-touch-callout: none;
  user-select: none;
  touch-action: manipulation;
}
.nc-padgrid-pad-bar {
  position: absolute;
  inset-block: ${r("control-gap")};
  inset-inline-start: ${r("hairline")};
  width: ${r("focus-width")};
  background: currentColor;
}
.nc-padgrid-pad-name { justify-self: start; align-self: flex-start; max-width: 100%; font-weight: ${r("control-weight")}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nc-padgrid-pad-hint { display: none; color: ${r("text-sub")}; font-size: ${r("readout-size-small")}; }
.nc-padgrid-pad-badge {
  position: absolute;
  inset-block-start: ${r("control-gap")};
  inset-inline-end: ${r("control-gap")};
  color: ${r("text-sub")};
  font-family: ${r("font-readout")};
  font-size: ${r("readout-size-small")};
  line-height: 1;
}
.nc-padgrid-pad-badge:empty { display: none; }
.nc-padgrid-pad-wave { width: 100%; height: ${r("slider-pitch")}; align-self: end; }
.nc-padgrid-pad-wave path { fill: currentColor; fill-opacity: 0.35; stroke: currentColor; stroke-width: 0.6; vector-effect: non-scaling-stroke; }
.nc-padgrid-pad[data-nc-lane="1"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${r("rhythm.lane-1")}; }
.nc-padgrid-pad[data-nc-lane="2"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${r("rhythm.lane-2")}; }
.nc-padgrid-pad[data-nc-lane="3"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${r("rhythm.lane-3")}; }
.nc-padgrid-pad[data-nc-lane="4"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${r("rhythm.lane-4")}; }
.nc-padgrid-pad[data-empty="true"] {
  align-content: center;
  justify-items: center;
  text-align: center;
  padding-inline-start: ${r("control-gap")};
  border-color: ${r("divider")};
  background: ${r("divider")};
  color: ${r("text-sub")};
}
.nc-padgrid-pad[data-empty="true"] .nc-padgrid-pad-name { font-weight: inherit; font-size: ${r("body-size")}; }
.nc-padgrid-pad[data-empty="true"] .nc-padgrid-pad-hint { display: block; }
.nc-padgrid-pad[data-hint="true"] .nc-padgrid-pad-hint { display: block; justify-self: start; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nc-padgrid-pad[data-empty="true"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { display: none; }
.nc-padgrid-pad:hover { border-color: ${r("text")}; }
.nc-padgrid-pad[data-selected="true"] { border-color: ${r("accent")}; box-shadow: inset 0 0 0 ${r("hairline")} ${r("accent")}; }
.nc-padgrid-rename {
  position: absolute;
  z-index: 3;
  min-height: ${r("target-min")};
  padding: 0 ${r("control-gap")};
  border: ${r("hairline")} solid ${r("accent")};
  border-radius: ${r("slot-radius")};
  background: ${r("surface-page")};
  color: ${r("text")};
  font-family: ${r("font-ui")};
  font-size: ${r("label-size")};
  font-weight: ${r("control-weight")};
}
.nc-padgrid-rename:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("hairline")}; }
.nc-padgrid-pad[data-dragging="true"] { border-style: dashed; color: ${r("text-sub")}; }
.nc-padgrid-pad[data-drop="true"] { border-style: dashed; border-color: ${r("accent")}; }
.nc-padgrid-pad[data-playing="true"] .nc-padgrid-pad-wave path { fill-opacity: 0.7; }
.nc-padgrid-pad:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("hairline")}; }
.nc-slot-row { position: relative; }
.nc-slot-menu {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${r("control-gap")};
  min-width: ${r("name-width")};
  padding: ${r("control-gap")};
  background: ${r("surface-page")};
  border: ${r("hairline")} solid ${r("divider")};
  color: ${r("text")};
}
.nc-menu-btn {
  display: flex;
  align-items: center;
  min-height: ${r("target-min")};
  border: 0;
  background: transparent;
  color: ${r("text")};
  font-family: ${r("font-readout")};
  font-size: ${r("readout-size-small")};
  text-align: left;
  padding: 0;
  cursor: pointer;
  transition: none;
}
/* 44 px on every pointer (desktop too): a touch band drawn at the 20 px slider pitch; the extra height overlaps the
   gaps, not the rows. */
.nc-field[data-nc-slider] .nc-range {
  height: ${r("target-min")};
  margin-block: calc((${r("slider-pitch")} - ${r("target-min")}) / 2);
}
/* M and S on touch: each a full target-min box (the button paints smaller inside), touching, never overlapping.
   Only on a coarse pointer: on every pointer it made each lane target-min tall on desktop (Rhythm #40). */
@media (pointer: coarse) {
  .nc-ms-wrap { flex-basis: ${r("target-min")}; height: ${r("target-min")}; }
  .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: calc(${r("module-gap")} * -1); }
  /* The ×'s touch target: target-min tall, out to the card's padding on the right; never over maximize. */
  .nc-fx-remove::before { height: max(100%, ${r("target-min")}); right: calc(${r("control-gap")} * -3); }
  .nc-fold-toggle::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${r("target-min")});
    height: max(100%, ${r("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-ms {
    inset: calc((${r("target-min")} - ${r("slider-pitch")}) / 2);
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
  outline: ${r("focus-width")} solid ${r("focus-ring")};
  outline-offset: ${r("hairline")};
}
/* A hit pad grows a control that cannot grow its look to target-min, on every pointer. */
.nc-hit {
  display: block;
  position: absolute;
  pointer-events: auto;
  left: 50%;
  top: 50%;
  width: ${r("target-min")};
  height: ${r("target-min")};
  transform: translate(-50%, -50%);
}
@media (pointer: coarse) {
  .nc-hit { width: ${r("target-min-coarse")}; height: ${r("target-min-coarse")}; }
}
/* nc-ui step editor (openStepEditor): long-press a step for velocity and chance. Sits under the step;
   a bottom sheet at phone widths. Rows are 44 px so the sliders are thumb-sized. */
.nc-step-editor {
  position: fixed;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: ${r("module-gap")};
  width: calc(${r("name-width")} * 6);
  max-width: calc(100vw - 2 * ${r("module-gap")});
  padding: ${r("module-gap")};
  background: ${r("surface-page")};
  border: ${r("hairline")} solid ${r("divider")};
  color: ${r("text")};
}
/* The step being edited: a dark ring (as Bass marks its selected pad), full strength, fill unchanged. */
.nc-pad[data-editing="true"], .nc-step-wrap[data-editing="true"] .nc-step {
  outline: ${r("focus-width")} solid ${r("text")};
  outline-offset: ${r("hairline")};
}
.nc-step-editor-scrim[data-placement="sheet"] { z-index: 4; background: ${r("dialog-scrim")}; }
.nc-step-editor[data-placement="sheet"] { z-index: 5; }
.nc-step-editor-head { display: flex; align-items: center; justify-content: space-between; gap: ${r("module-gap")}; }
.nc-step-editor-row {
  display: flex;
  align-items: center;
  gap: ${r("module-gap")};
  min-height: ${r("target-min")};
}
.nc-step-editor-row .nc-label { flex: none; min-width: ${r("name-width")}; }
.nc-step-editor-row .nc-range { flex: 1 1 0; min-width: 0; height: ${r("target-min")}; }
.nc-step-editor-row .nc-readout { flex: none; min-width: ${r("name-width")}; text-align: right; }
.nc-step-editor-done {
  min-width: ${r("target-min")};
  min-height: ${r("target-min")};
  border: 0;
  background: none;
  color: ${r("text")};
  font-family: ${r("font-ui")};
  font-size: ${r("label-size")};
  font-weight: ${r("title-weight")};
  letter-spacing: ${r("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-step-editor-done:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("hairline")}; }
.nc-step-editor[data-placement="sheet"] {
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  max-width: none;
  padding-bottom: calc(${r("module-gap")} + env(safe-area-inset-bottom));
  border-width: ${r("hairline")} 0 0;
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
  gap: ${r("toast-gap")};
  max-width: calc(100vw - 2 * ${r("toast-offset")});
  min-height: ${r("toast-target")};
  padding: 0 0 0 ${r("toast-pad-x")};
  border-radius: ${r("toast-radius")};
  background: ${r("toast-bg")};
  color: ${r("toast-text")};
  font-family: ${r("font-ui")};
  font-size: ${r("toast-font-size")};
  line-height: ${r("label-leading")};
  white-space: nowrap;
  pointer-events: auto;
  opacity: 0;
  transition: opacity ${r("motion-fade")} ${r("motion-fade-easing")};
}
.nc-ui-toast[data-placement="bottom"] { bottom: calc(${r("toast-offset")} + env(safe-area-inset-bottom)); }
.nc-ui-toast[data-placement="top"] { top: calc(${r("toast-offset")} + env(safe-area-inset-top)); }
/* In the Studio (html[data-nc-hosted]) the frame is as tall as its page: toasts and sheets keep to the part you can
   see, which the Studio writes as --nc-host-top / --nc-host-bottom. */
html[data-nc-hosted] .nc-ui-toast[data-placement="bottom"] { bottom: calc(var(--nc-host-bottom, 0px) + ${r("toast-offset")}); }
html[data-nc-hosted] .nc-ui-toast[data-placement="top"] { top: calc(var(--nc-host-top, 0px) + ${r("toast-offset")}); }
html[data-nc-hosted] .nc-step-editor[data-placement="sheet"] { bottom: var(--nc-host-bottom, 0px); }
.nc-ui-toast[data-placement="anchor"] { position: absolute; transform: none; }
.nc-ui-toast[data-state="open"] { opacity: 1; }
.nc-ui-toast[data-state="closing"] {
  opacity: 0;
  pointer-events: none;
  transition: opacity ${r("motion-fade-out")} ${r("motion-fade-out-easing")};
}
/* nc-ui help (installHelpTips): a label's description, shown when the pointer rests on it. The toast's dark slab,
   smaller and wrapping; it never takes the pointer, so it can't block the control under it. No motion. */
[data-nc-help] { cursor: help; }
[data-nc-help]:hover { text-decoration: underline dotted; text-underline-offset: 0.2em; }
.nc-ui-help {
  position: fixed;
  z-index: 6;
  max-width: 34ch;
  padding: calc(${r("toast-pad-x")} / 2) calc(${r("toast-pad-x")} * 0.75);
  border-radius: ${r("toast-radius")};
  background: ${r("toast-bg")};
  color: ${r("toast-text")};
  font-family: ${r("font-ui")};
  font-size: ${r("toast-font-size")};
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
  min-width: ${r("toast-target")};
  min-height: ${r("toast-target")};
  padding: 0 ${r("toast-pad-x")};
  border: 0;
  background: none;
  color: ${r("toast-action")};
  font: inherit;
  font-weight: ${r("title-weight")};
  letter-spacing: ${r("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-ui-toast-action:focus-visible {
  outline: ${r("focus-width")} solid ${r("toast-action")};
  outline-offset: calc(-2 * ${r("focus-width")});
}
.nc-ui-toast-live {
  position: absolute;
  width: ${r("hairline")};
  height: ${r("hairline")};
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
  margin-inline: calc(${r("module-pad")} * -1);
  margin-bottom: calc(${r("module-pad")} * -1);
  border-top: ${r("hairline")} solid ${r("divider")};
}
.nc-module-body[data-nc-layout="console"] > .nc-section { gap: 0; padding-top: ${r("stack-card-pad-y")}; }
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] {
  grid-area: strips;
  flex-direction: row;
  align-items: flex-start;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: thin;
  padding-inline: ${r("module-pad")} ${r("control-gap")};
  /* The strips run the full height (their own padding): no band above or below them. */
  padding-block: 0;
  /* The channel strips sit on the master's shade (Peter, 2026-10-30): the lightest step of the stack. */
  background: ${r("module-bg-stack-1")};
  ${W("text-sub")}: ${r("module-sub-stack-1")};
  ${W("divider")}: ${r("module-div-stack-1")};
  ${W("slider-track")}: ${r("module-div-stack-1")};
}
/* The fx area is as wide as the cards it shows (Peter, 2026-11-01: "Weird empty slot next to Master slider"): one
   column per shown card, none held empty, so the master sits right after the last card and the strips area (the
   flexible column) takes the rest. A paged area keeps three cards' width (below). */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${r("fx-card-width")};
  align-items: stretch;
  padding-top: 0;
}
/* An optional meters section (the Studio's VU meters): after the FX cards, just left of the master, on the master's
   shade with a hairline between them. Without one the column is empty. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="meters"] {
  grid-area: meters;
  padding: ${r("stack-card-pad-y")} ${r("module-pad")} ${r("module-pad")};
  border-inline-end: ${r("hairline")} solid ${r("module-div-stack-1")};
  background: ${r("module-bg-stack-1")};
  ${W("text-sub")}: ${r("module-sub-stack-1")};
  ${W("divider")}: ${r("module-div-stack-1")};
  ${W("slider-track")}: ${r("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${r("control-gap")} ${r("module-pad")};
  padding-bottom: ${r("module-pad")};
  background: ${r("module-bg-stack-1")};
  ${W("text-sub")}: ${r("module-sub-stack-1")};
  ${W("divider")}: ${r("module-div-stack-1")};
  ${W("slider-track")}: ${r("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${r("stack-card-pad-y")} ${r("module-pad")} ${r("module-pad")};
  ${W("text-sub")}: inherit;
  ${W("divider")}: inherit;
  ${W("slider-track")}: inherit;
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { --nc-fx-card-bg: ${r("module-bg-adjacent-2")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { --nc-fx-card-bg: ${r("module-bg-adjacent-3")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { --nc-fx-card-bg: ${r("module-bg-adjacent-4")}; background: var(--nc-fx-card-bg); }
/* In the console a card is a column: a select row gets the same space under it as a slider row. */
.nc-module-body[data-nc-layout="console"] .nc-ui-fx { display: flex; flex-direction: column; gap: ${r("module-gap")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx > .nc-field:not([data-nc-slider]) { padding-bottom: ${r("module-gap")}; }
/* Folded cards in a console row (769 px up): a narrow column, the whole column one button. Once any card is folded the
   fx area is a row of its cards' own widths, so the strips get the room back. */
@media (min-width: 769px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx { flex: none; width: ${r("fx-card-width")}; }
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
    width: calc(${r("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] > .nc-ui-fx[data-nc-max="row"] { grid-column: span 3; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx[data-nc-max="row"][data-nc-max="row"] {
    width: calc(${r("fx-card-width")} * 3);
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
    scroll-padding-top: var(--nc-fx-pin-h, ${r("module-gap")});
    /* The foot shade (scroll) shows while there is more below; the card's own colour at the end of its content (local)
       covers it once scrolled to the end, or when nothing overflows. */
    background-image:
      linear-gradient(transparent, var(--nc-fx-card-bg) 70%),
      linear-gradient(transparent, ${r("divider")});
    background-position: bottom, bottom;
    background-size: 100% calc(${r("module-gap")} * 3), 100% ${r("module-gap")};
    background-repeat: no-repeat;
    background-attachment: local, scroll;
  }
  /* The pinned header (or bare name) holds the card's top padding, so nothing scrolls by above it; its fold triangle
     keeps its corner (the header is its containing block now, edge to edge). */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > :is(.nc-ui-fx-hd, .nc-ui-fx-name) {
    position: sticky;
    top: 0;
    z-index: 2;
    margin: 0 calc(${r("module-pad")} * -1) calc(${r("module-gap")} * -1);
    padding: ${r("stack-card-pad-y")} ${r("module-pad")} calc(${r("module-gap")} * 2);
    background-color: var(--nc-fx-card-bg);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > .nc-eq {
    position: sticky;
    top: var(--nc-fx-hd-h, 0);
    z-index: 1;
    margin-bottom: 0;
    padding-bottom: ${r("control-gap")};
    background-color: var(--nc-fx-card-bg);
    /* The card's colour out to its edges beside the graph (no spread: nothing below it is covered). */
    box-shadow: calc(${r("module-pad")} * -1) 0 0 var(--nc-fx-card-bg), ${r("module-pad")} 0 0 var(--nc-fx-card-bg);
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
    padding-top: ${r("target-min")};
  }
  /* No card folded on this page: three cards' width, a part-filled last page too, so the strips never shift. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged]:not(:has(> .nc-ui-fx[data-nc-folded]:not([data-nc-off-page]))) {
    min-width: calc(${r("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx { flex: none; width: ${r("fx-card-width")}; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx[data-nc-off-page][data-nc-off-page][data-nc-off-page] {
    order: -1;
    flex: none;
    width: ${r("fx-card-width")};
    margin-inline-end: calc(${r("fx-card-width")} * -1);
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
    gap: ${r("module-gap")};
    height: ${r("target-min")};
  }
}
/* A chevron button: a full target, a square outline like Moves' buttons, the chevron in ink so it reads at a glance.
   At an end it stays focusable (aria-disabled) and dims by colour. */
.nc-fx-page-btn {
  display: grid;
  place-items: center;
  flex: none;
  width: ${r("target-min")};
  height: ${r("target-min")};
  margin: 0;
  padding: 0;
  border: ${r("hairline")} solid ${r("text-sub")};
  border-radius: ${r("slot-radius")};
  background: transparent;
  color: ${r("text")};
  cursor: pointer;
}
.nc-fx-page-btn:hover:not([aria-disabled="true"]) { border-color: ${r("text")}; }
.nc-fx-page-btn:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("hairline")}; }
.nc-fx-page-btn[aria-disabled="true"] { color: ${r("divider")}; border-color: ${r("divider")}; cursor: default; }
.nc-fx-page-icon {
  display: block;
  width: calc(${r("control-gap")} * 2.5);
  height: calc(${r("control-gap")} * 2.5);
  border-style: solid;
  border-color: currentColor;
  border-width: calc(${r("hairline")} * 2) calc(${r("hairline")} * 2) 0 0;
  transform: translateX(calc(${r("control-gap")} * -0.5)) rotate(45deg);
}
.nc-fx-page-btn[data-nc-fx-page="prev"] .nc-fx-page-icon { transform: translateX(calc(${r("control-gap")} * 0.5)) rotate(-135deg); }
.nc-fx-page-count {
  font-size: ${r("label-size")};
  font-weight: ${r("label-weight")};
  letter-spacing: ${r("label-tracking")};
  font-variant-numeric: tabular-nums;
  color: ${r("text")};
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
  --nc-strip-ms-row: ${r("slider-pitch")};
  --nc-strip-knob-row: calc(${r("knob-size")} + ${r("control-gap")} + ${r("label-size")} * ${r("label-leading")});
  position: relative;
  flex: none;
  width: ${r("strip-width")};
  display: grid;
  grid-template-columns: ${r("control-gap")} minmax(0, 1fr) ${r("control-gap")};
  /* Name, Inserts, M/S, sends, pan, the fader body, the readout. */
  grid-template-rows: auto ${r("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
  justify-items: center;
  row-gap: ${r("module-gap")};
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
  .nc-strip { --nc-strip-ms-row: ${r("target-min")}; }
}
/* sendsHidden: no sends row (the host's "hide the sends"); give it to every strip so their rows still line up. */
.nc-strip[data-nc-sends-hidden] {
  grid-template-rows: auto ${r("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-sends-hidden] > .nc-strip-sends { display: none; }
.nc-strip + .nc-strip { border-inline-start: ${r("hairline")} solid ${r("divider")}; }
/* Channel strips alternate light and dark grey, full height, so a row of identical strips reads apart (Peter,
   2026-10-30); the master keeps the module's shade. */
.nc-strip:not([data-nc-master]) { --nc-strip-ground: var(--nc-strip-shade, ${r("strip-bg")}); background: var(--nc-strip-ground); }
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) { --nc-strip-ground: var(--nc-strip-shade, ${r("strip-alt-bg")}); }
/* A shade a player picked (shade, 1-8; Peter, 2026-11-04): one of eight neutral greys (strip-shade-1..8), in place of
   the alternation. 1 and 2 are the alternation's own greys. On the darker four (5-8) the Inserts word at rest takes
   text-sub, so it keeps its contrast (the lighter hacks grey falls to 2.2:1 there). */
${[1,2,3,4,5,6,7,8].map(a=>`.nc-strip[data-nc-shade="${a}"] { --nc-strip-shade: ${r(`strip-shade-${a}`)}; }`).join(`
`)}
/* A compact knob's centre is the strip's own grey (--nc-strip-ground), not the page's, so it never shows as a dot. On
   3-8 the M and S hairline is mixed from the strip's grey (strip-divider vanishes on the middle greys, and reads as a
   light box on the darkest). */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${W("divider")}: color-mix(in oklab, ${r("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${W("meter-track")}: color-mix(in oklab, ${r("text-sub")} 30%, var(--nc-strip-shade)); }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]) { color: ${r("text-sub")}; }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]):hover { color: ${r("text")}; }
/* The strip menu (onShade): a small sheet under the grip, or where the name was right-clicked: "Shade", a row of Auto
   and the eight swatches (the picked one ringed in ink), then Move left / Move right with their keys. Over the page,
   so it never shifts the layout; page ground and a hairline (the kit draws no shadows). */
.nc-strip-menu {
  position: fixed;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: ${r("control-gap")};
  min-width: calc(${r("strip-width")} * 2.5);
  padding: calc(${r("control-gap")} * 2) calc(${r("control-gap")} * 2.5);
  border: ${r("hairline")} solid ${r("divider")};
  border-radius: ${r("slot-radius")};
  background: ${r("surface-page")};
  color: ${r("text")};
  font-size: ${r("label-size")};
}
.nc-strip-menu-title { color: ${r("text-sub")}; font-weight: ${r("label-weight")}; letter-spacing: ${r("label-tracking")}; text-transform: uppercase; }
.nc-strip-menu-shades { display: flex; gap: ${r("control-gap")}; margin-bottom: ${r("control-gap")}; }
.nc-strip-menu-shades > button {
  flex: none;
  min-width: calc(${r("control-gap")} * 4.5);
  height: calc(${r("control-gap")} * 4.5);
  margin: 0;
  padding: 0 ${r("hairline")};
  border: ${r("hairline")} solid ${r("divider")};
  border-radius: ${r("slot-radius")};
  background: var(--nc-swatch, transparent);
  color: ${r("text-sub")};
  font: inherit;
  font-size: ${r("scale-size")};
  cursor: pointer;
}
.nc-strip-menu-shades > button[aria-checked="true"] { outline: calc(${r("hairline")} * 2) solid ${r("text")}; outline-offset: ${r("hairline")}; color: ${r("text")}; }
.nc-strip-menu-shades > button:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("hairline")}; }
.nc-strip-menu-item {
  display: flex;
  justify-content: space-between;
  gap: calc(${r("control-gap")} * 3);
  margin: 0;
  padding: ${r("control-gap")} 0;
  border: 0;
  border-top: ${r("hairline")} solid ${r("divider")};
  background: transparent;
  color: ${r("text")};
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.nc-strip-menu-item:disabled { color: ${r("text-sub")}; cursor: default; }
.nc-strip-menu-item > kbd { font: inherit; color: ${r("text-sub")}; }
.nc-strip-menu-item:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: calc(${r("focus-width")} * -1); }
@media (pointer: coarse) {
  .nc-strip-menu-shades > button { min-width: calc(${r("target-min")} * 0.7); height: calc(${r("target-min")} * 0.7); }
  .nc-strip-menu-item { min-height: ${r("target-min")}; align-items: center; }
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip {
  align-self: stretch;
  padding-block: ${r("stack-card-pad-y")} ${r("module-pad")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip-add { margin-block: ${r("stack-card-pad-y")} ${r("module-pad")}; }
.nc-strip[data-nc-master] { width: ${r("strip-width-master")}; }
/* Name row: the name, and the remove × when the strip can be removed. */
.nc-strip-hd { display: flex; align-items: baseline; justify-content: center; gap: ${r("control-gap")}; max-width: 100%; min-width: 0; }
.nc-strip-remove {
  position: relative;
  flex: none;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${r("text-sub")};
  font-family: ${r("font-readout")};
  font-size: ${r("label-size")};
  line-height: 1;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${r("transition-feedback")};
}
.nc-strip-remove::before { content: ""; position: absolute; inset: calc(${r("control-gap")} * -1); }
.nc-strip-remove:hover { color: ${r("danger")}; }
.nc-strip-remove:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("hairline")}; }
.nc-strip-name {
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${r("label-size")};
  font-weight: ${r("label-weight")};
  letter-spacing: ${r("label-tracking")};
  text-transform: uppercase;
  color: ${r("text")};
}
.nc-strip[data-silent="true"] .nc-strip-name, .nc-strip[data-silent="true"] .nc-strip-db { color: ${r("text-sub")}; }
/* Minimize (onFold): the fold triangle in the top-left corner, above the name; the name row and its × as before, so a
   minimize click can't land on remove. Folded, the strip is a narrow column on the same rows (meters still line up): the
   ▶ in the corner, the name row kept but unseen, M and S stacked over the Inserts and M/S rows, then the name read bottom to top under a small mark in the
   fader cap's colour (one button, the FX fold's look) beside a thin meter. At once: no motion. */
/* The triangle sits in the strip's top-left corner, above the name; folded, centred over the column. */
.nc-strip > [data-nc-strip-hide] { position: absolute; top: ${r("control-gap")}; left: ${r("control-gap")}; z-index: 1; }
.nc-strip[data-nc-folded] > [data-nc-strip-hide] { left: 50%; transform: translateX(-50%); }
/* Move (onMove): a grip of six dots in the top-right corner, across from the triangle, in text-sub (ink on hover), so a
   strip says it can be dragged. touch-action none: a drag from the grip moves the strip at once on touch, never the
   page. Not on a folded strip (its column is the handle there). */
.nc-strip > [data-nc-strip-grip] {
  position: absolute;
  top: ${r("control-gap")};
  right: ${r("control-gap")};
  /* Over the next strip's fold triangle, whose touch target reaches back across the strips' edge. */
  z-index: 2;
  display: inline-flex;
  margin: 0;
  padding: ${r("hairline")};
  border: 0;
  background: transparent;
  color: ${r("text-sub")};
  line-height: 1;
  cursor: grab;
  touch-action: none;
}
.nc-strip > [data-nc-strip-grip]:hover { color: ${r("text")}; }
.nc-strip > [data-nc-strip-grip]:active { cursor: grabbing; }
.nc-strip > [data-nc-strip-grip]:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("hairline")}; }
.nc-strip-grip-dots {
  display: block;
  width: calc(${r("control-gap")} * 1.5);
  height: calc(${r("control-gap")} * 2.25);
  background: radial-gradient(circle, currentColor ${r("hairline")}, transparent calc(${r("hairline")} * 1.5)) 0 0 / calc(${r("control-gap")} * 0.75) calc(${r("control-gap")} * 0.75);
}
.nc-strip[data-nc-folded] > [data-nc-strip-grip] { display: none; }
@media (pointer: coarse) {
  .nc-strip > [data-nc-strip-grip]::before {
    content: "";
    position: absolute;
    right: calc(${r("control-gap")} * -1);
    top: calc(${r("control-gap")} * -1);
    width: calc(${r("target-min")} / 2);
    height: calc(${r("target-min")} / 2);
  }
}
/* Folded: no gutters, and M and S take the Inserts, M/S and sends rows (sends hidden: the pan row) as one area, so the
   two fit stacked at full size with the rows unchanged. */
.nc-strip[data-nc-folded] {
  width: ${r("strip-fold-width")};
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
  grid-template-rows: auto var(--nc-strip-knob-row) ${r("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". trim ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-trim][data-nc-sends-hidden] {
  grid-template-rows: auto var(--nc-strip-knob-row) ${r("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
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
  grid-auto-columns: ${r("slider-pitch")};
  grid-auto-rows: ${r("slider-pitch")};
  gap: ${r("module-gap")};
  align-self: start;
  justify-self: center;
}
/* Touch: each folded M and S as wide as the column and target-min tall, touching (after the rule above, so it wins). */
@media (pointer: coarse) {
  .nc-strip[data-nc-folded] > .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-auto-rows: ${r("target-min")}; gap: 0; justify-self: stretch; }
}
.nc-strip[data-nc-folded] > .nc-strip-body {
  grid-template-columns: auto auto;
  column-gap: ${r("control-gap")};
}
.nc-strip[data-nc-folded] .nc-strip-body > .nc-strip-fold { display: flex; grid-column: 1; grid-row: 1 / span 2; width: auto; }
.nc-strip[data-nc-folded] .nc-strip-body > .nc-meter { grid-column: 2; }
.nc-strip[data-nc-folded] .nc-meter-bar { width: ${r("control-gap")}; }
.nc-strip-fold { gap: ${r("control-gap")}; }
.nc-strip-fold > .nc-ui-fx-fold-name { font-size: ${r("label-size")}; font-weight: ${r("label-weight")}; letter-spacing: ${r("label-tracking")}; text-transform: uppercase; }
.nc-strip[data-silent="true"] .nc-strip-fold > .nc-ui-fx-fold-name { color: ${r("text-sub")}; }
/* Folded with a pan: a tiny track with a dot where the pan sits (--nc-strip-pan, −1..1). */
.nc-strip-fold-pan {
  position: relative;
  flex: none;
  width: ${r("fader-cap-height")};
  height: ${r("control-gap")};
  background: linear-gradient(${r("divider")}, ${r("divider")}) center / 100% ${r("hairline")} no-repeat;
}
.nc-strip-fold-pan[hidden] { display: none; }
.nc-strip-fold-pan::after {
  content: "";
  position: absolute;
  top: 0;
  left: calc((var(--nc-strip-pan, 0) + 1) / 2 * (100% - ${r("control-gap")}));
  width: ${r("control-gap")};
  height: ${r("control-gap")};
  border-radius: 50%;
  background: ${r("text-sub")};
}
.nc-strip-fold-cap {
  flex: none;
  width: ${r("fader-cap-height")};
  height: ${r("control-gap")};
  background: var(--nc-strip-cap, ${r("fader-cap")});
}
/* M and S: an explicit two-column grid (never flex with overlapping margins), centred at the slider pitch; on touch
   it fills the strip's full width (the gutters too), two target-min boxes side by side, touching, nothing past the
   strip's edges. The kit's hit pads take any width short of target-min (the divider hairline) outward. */
.nc-strip-ms {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${r("slider-pitch")};
  grid-template-rows: ${r("slider-pitch")};
  column-gap: ${r("control-gap")};
  justify-self: center;
  align-self: start;
}
.nc-strip > .nc-strip-ms > .nc-ms-wrap { margin: 0; width: auto; }
/* The master's Sends button (onSendsView): Inserts' twin in the M/S row, the strip's width, the slider pitch tall. */
.nc-strip > .nc-strip-ms:has(> .nc-sends-view-wrap) { grid-auto-columns: minmax(0, 1fr); justify-self: stretch; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap { grid-column: 1 / -1; height: ${r("slider-pitch")}; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap > .nc-sends-view { inset-inline: ${r("control-gap")}; width: auto; }
@media (pointer: coarse) {
  .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-template-rows: ${r("target-min")}; column-gap: 0; justify-self: stretch; }
}
/* M and S on a channel strip: the kit's outlined squares, their hairline the one for the strip's own shade
   (strip-divider). The console's body hands its stack-1 hairline down, a near match for the light strip (gone there)
   but lighter than the alternate one (a light box there), so M and S showed boxes on every other strip only. */
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${W("divider")}: ${r("strip-divider")}; }
/* Hacks: a full-width toggle above M and S, in mixed case and a lighter grey (Peter); pressed while the console's fx area shows this strip's stack. */
.nc-strip-hacks { display: flex; width: 100%; height: ${r("slider-pitch")}; }
.nc-hacks-wrap { position: relative; flex: 1 1 auto; height: ${r("slider-pitch")}; }
.nc-hacks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  /* A light outline at rest, the same on every strip (Peter, 2026-11-01: the box only says the stack has effects):
     text-sub at 50% over the strip hairline; text-sub on hover, so it still reads as a button. */
  border: ${r("hairline")} solid color-mix(in oklab, ${r("text-sub")} 50%, ${r("strip-divider")});
  border-radius: ${r("slot-radius")};
  background: transparent;
  color: ${r("strip-hacks-text")};
  font-size: ${r("label-size")};
  font-weight: ${r("label-weight")};
  /* Stated, not left out: an older bundled copy of the kit (an app's fallback layer) set uppercase and tracking. */
  letter-spacing: normal;
  text-transform: none;
  cursor: pointer;
  transition: none;
}
.nc-hacks:hover { color: ${r("text")}; border-color: ${r("text-sub")}; }
/* hacksEmpty (no effects in the stack): the plain word, no box, hover too; still a button with its focus ring. */
.nc-hacks[data-nc-empty]:not([aria-pressed="true"]) { border-color: transparent; }
.nc-hacks[aria-pressed="true"] {
  background: ${r("fader-cap-master")};
  border-color: ${r("fader-cap-master")};
  color: ${r("surface-page")};
}
.nc-hacks:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("hairline")}; }
.nc-strip-sends { display: flex; align-items: flex-start; gap: ${r("module-gap")}; }
/* Pan: one compact bipolar knob, centred, in its own row (empty on the master, so the faders line up). */
.nc-strip-pan { display: flex; justify-content: center; align-items: flex-start; }
.nc-field[data-nc-compact] {
  flex-direction: column-reverse;
  align-items: center;
  gap: ${r("control-gap")};
}
.nc-field[data-nc-compact] .nc-label { min-width: 0; line-height: ${r("label-leading")}; }
.nc-field[data-nc-compact] .nc-readout { display: none; }
/* A compact knob draws its amount: a ring over its 270° travel, filled in the meter blue up to the value. */
.nc-field[data-nc-compact] .nc-knob {
  border: 0;
  background:
    radial-gradient(closest-side, var(--nc-strip-ground, ${r("surface-page")}) 70%, transparent 72%),
    conic-gradient(from 225deg, ${r("meter-fill")} calc(var(--knob-turn, 0) * 1deg), ${r("meter-track")} 0 270deg, transparent 0);
}
/* A bipolar knob (pan) fills from the top of its travel (the centre) to the value, either way. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-knob {
  background:
    radial-gradient(closest-side, var(--nc-strip-ground, ${r("surface-page")}) 70%, transparent 72%),
    conic-gradient(from 225deg, ${r("meter-track")} calc(var(--knob-from, 135) * 1deg), ${r("meter-fill")} 0 calc(var(--knob-to, 135) * 1deg), ${r("meter-track")} 0 270deg, transparent 0);
}
/* Its value ("C", "L 30") shows in the label's place while hovered, focused or dragged; no motion. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-readout {
  order: -1;
  flex: none;
  width: auto;
  min-width: max-content;
  max-width: none;
  text-align: center;
  font-size: ${r("label-size")};
  line-height: ${r("label-leading")};
  white-space: nowrap;
}
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-label { display: none; }
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-readout { display: block; }
/* Its mark starts at the bottom of the travel (7:30) and turns 270° to 4:30, along the ring. */
.nc-field[data-nc-compact] .nc-knob-mark { transform: rotate(calc((var(--knob-turn, 0) - 135) * 1deg)); }
.nc-strip-body {
  display: grid;
  grid-template-columns: ${r("fader-cap-width")} auto auto;
  grid-template-rows: ${r("clip-size")} ${r("fader-height")};
  justify-content: center;
  column-gap: ${r("control-gap")};
  row-gap: ${r("control-gap")};
  padding-block: calc(${r("fader-cap-height")} / 2);
}
.nc-strip-body > .nc-fader { grid-column: 1; grid-row: 2; }
.nc-strip-body > .nc-scale { grid-column: 2; grid-row: 2; }
.nc-strip-body > .nc-meter { grid-column: 3; grid-row: 1 / span 2; }
/* The dB scale between fader and meter: faint mono labels, each centred on its level. */
.nc-scale {
  position: relative;
  width: 3ch;
  font-family: ${r("font-readout")};
  font-size: ${r("scale-size")};
  font-variant-numeric: tabular-nums;
  color: ${r("text-sub")};
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
  width: ${r("fader-cap-width")};
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
  width: ${r("rule-strong")};
  transform: translateX(-50%);
  background: ${r("fader-track")};
}
.nc-fader-cap {
  position: absolute;
  left: 0;
  width: 100%;
  height: ${r("fader-cap-height")};
  top: calc((1 - var(--fader-pos, 0)) * 100%);
  transform: translateY(-50%);
  background: ${r("fader-cap")};
  transition: none;
}
.nc-fader-cap::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: ${r("hairline")};
  transform: translateY(-50%);
  background: ${r("fader-cap-line")};
}
/* A host can colour a channel's fader cap with --nc-strip-cap (Peter, 2026-10-31: the Studio uses each instrument's
   own colour, muted). The kit names no instrument colours. Unset, the cap stays ink; the master stays accent. */
.nc-strip .nc-fader-cap { background: var(--nc-strip-cap, ${r("fader-cap")}); }
.nc-fader[data-dragging="true"] .nc-fader-cap { background: ${r("accent")}; }
/* The master's cap in Prussian blue (Peter, 2026-10-30): the master reads apart from the channels at a glance. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] .nc-fader-cap { background: ${r("fader-cap-master")}; }
.nc-fader:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("control-gap")}; }
/* The level meter: peak over RMS in the lighter Prussian blue, a hold line, a clip light on top. It follows the audio
   every frame (transforms written by the meter's own ballistics), so nothing here transitions. */
.nc-meter {
  display: grid;
  grid-template-rows: subgrid;
  row-gap: ${r("control-gap")};
  justify-items: stretch;
}
.nc-meter-clip {
  position: relative;
  display: block;
  height: ${r("clip-size")};
  padding: 0;
  border: 0;
  background: ${r("meter-track")};
  cursor: pointer;
  transition: none;
}
.nc-meter-clip::before {
  content: "";
  position: absolute;
  inset: calc(${r("control-gap")} * -1);
}
.nc-meter-clip[data-lit="true"] { background: ${r("meter-clip")}; }
.nc-meter-clip:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("hairline")}; }
.nc-meter-bars { display: flex; gap: ${r("hairline")}; height: 100%; }
.nc-meter-bar {
  position: relative;
  width: ${r("meter-width")};
  height: 100%;
  overflow: hidden;
  background: ${r("meter-track")};
}
.nc-meter-peak, .nc-meter-rms {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  transition: none;
}
.nc-meter-peak { background: ${r("meter-peak")}; }
.nc-meter-rms { background: ${r("meter-fill")}; }
.nc-meter-hold {
  position: absolute;
  inset: 0;
  border-top: ${r("rule-strong")} solid ${r("meter-hold-mark")};
  transform: translateY(100%);
  transition: none;
}
.nc-meter-hold[data-off="true"] { visibility: hidden; }
/* An FX card's level meter (fx-level.js): two thin bars beside the switch, in (left) and out (right), on the card's own
   divider. Fixed size, so it never moves the header; the loop writes transforms, so nothing transitions. A bypassed
   card dims it by colour; the hot colour (ASTRID's title orange) shows only within 1 dB of full scale. Folded, it sits at the foot of the
   column and gives way when there is no room. */
.nc-fx-level { display: inline-flex; flex: none; align-items: stretch; gap: ${r("hairline")}; height: ${r("fx-level-height")}; }
.nc-fx-level-bar { position: relative; width: ${r("fx-level-bar")}; overflow: hidden; background: ${r("divider")}; }
.nc-fx-level[data-nc-rows="1"] > [data-nc-level="out"] { display: none; }
.nc-fx-level-fill {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  background: ${r("fx-level-in")};
  transition: none;
}
[data-nc-level="out"] > .nc-fx-level-fill { background: ${r("fx-level-out")}; }
[data-nc-dim="true"] .nc-fx-level-fill { background: ${r("text-sub")}; }
.nc-fx-level-fill[data-clip="true"], [data-nc-dim="true"] .nc-fx-level-fill[data-clip="true"] { background: ${r("fx-level-hot")}; }
.nc-ui-fx-fold > .nc-fx-level { margin-top: auto; height: auto; flex: 0 1 ${r("fx-level-fold-length")}; min-height: 0; }
.nc-strip-db {
  min-width: 0;
  max-width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: ${r("font-readout")};
  font-size: ${r("readout-size")};
  font-variant-numeric: tabular-nums;
  color: ${r("text")};
  white-space: nowrap;
  cursor: default;
  transition: none;
}
.nc-strip-db:not(:disabled) { cursor: text; }
.nc-strip-db:hover { text-decoration: underline; text-decoration-color: ${r("divider")}; text-underline-offset: ${r("control-gap")}; }
/* The type-in: the readout opened as a field, the same size and font, an accent hairline under it. */
.nc-strip-db-input {
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  border-bottom: ${r("hairline")} solid ${r("accent")};
  border-radius: 0;
  background: transparent;
  color: ${r("text")};
  font-family: ${r("font-readout")};
  font-size: ${r("readout-size")};
  font-variant-numeric: tabular-nums;
  text-align: center;
}
.nc-strip-db-input:focus-visible { outline: none; }
/* The add slot: a ghost strip after the last channel, "+ Add" over a select of what can be added. */
.nc-strip-add {
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${r("strip-width")};
  margin-inline-start: ${r("module-gap")};
  border: ${r("hairline")} dashed ${r("divider")};
  color: ${r("text-sub")};
  transition-property: color, border-color;
  transition-duration: ${r("transition-feedback")};
}
.nc-strip-add:hover, .nc-strip-add:focus-within { color: ${r("text")}; border-color: ${r("text-sub")}; }
.nc-strip-add-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${r("control-gap")};
  pointer-events: none;
}
.nc-strip-add-plus { font-family: ${r("font-readout")}; font-size: ${r("title-size-slim")}; line-height: 1; }
.nc-strip-add-label {
  font-size: ${r("label-size")};
  font-weight: ${r("label-weight")};
  letter-spacing: ${r("label-tracking")};
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
  font-size: ${r("body-size")};
}
.nc-strip-add:has(.nc-strip-add-select:focus-visible) { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("hairline")}; }
.nc-strip-db:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("hairline")}; }
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
    border-top: ${r("hairline")} solid ${r("module-div-stack-1")};
  }
  /* Phones: the master as narrow as a channel strip, so the strips keep the room. */
  .nc-strip[data-nc-master] { width: ${r("strip-width")}; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] { padding-inline: 0; }
}
@media (min-width: 1024px) {
  .nc-module-body[data-nc-layout="console"] {
    margin-inline: calc(${r("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${r("module-pad-y-desktop")} * -1);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] {
    padding-inline-start: ${r("module-pad-x-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip {
    padding-bottom: ${r("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip-add {
    margin-bottom: ${r("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
    padding-inline-end: ${r("module-pad-x-desktop")};
    padding-bottom: ${r("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx {
    margin: 0;
    padding: ${r("stack-card-pad-y")} ${r("module-pad-x-desktop")} ${r("module-pad-y-desktop")};
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
  background: ${r("accent")};
  font-family: ${r("font-ui")};
  pointer-events: none;
}
@media (min-width: 768px) {
  .nc-page { padding: ${r("page-pad-y-md")} ${r("page-pad-x-md")}; }
  .nc-page-hd { flex-direction: row; align-items: flex-end; justify-content: space-between; padding-bottom: ${r("page-head-gap-md")}; }
  .nc-page-hd::before { top: calc(${r("page-pad-y-md")} * -1); left: calc(${r("page-pad-x-md")} * -1); right: calc(${r("page-pad-x-md")} * -1); }
}
/* A minimized full-width module (compact, e.g. the Studio's Mix): one slim bar at every width, title, then the summary
   on one line (cut with an ellipsis), then the index. Overrides the column-wise slim of side-by-side modules. */
.nc-module[data-nc-compact][data-nc-slim] {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  gap: ${r("header-gap")};
  padding-inline: ${r("module-pad")};
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
html[data-nc-hosted] .nc-page { padding-top: ${r("module-gap")}; min-height: 0; }
html[data-nc-hosted] .nc-page-hd {
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${r("module-gap")};
}
html[data-nc-hosted] .nc-page-hd::before { display: none; }
html[data-nc-hosted] .nc-page-hd > :first-child { display: none; }
html[data-nc-hosted] .nc-page-body { padding-top: ${r("module-gap")}; }
/* Tablets (769-1023 px): the same 2 x 5 slot grid as phones and desktop; one row of 10 drew 14 px slots here. */
@media (min-width: 769px) and (max-width: 1023px) {
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${r("control-gap")};
  }
  .nc-snap-wrap { width: 100%; max-width: none; height: ${r("target-min")}; }
  .nc-snap { font-size: ${r("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
}
@media (min-width: 1024px) {
  .nc-page-body { padding-top: ${r("page-body-gap-lg")}; }
}
@media (min-width: 1280px) {
  .nc-page { padding-inline: ${r("page-pad-x-xl")}; }
  .nc-page-hd::before { left: calc(${r("page-pad-x-xl")} * -1); right: calc(${r("page-pad-x-xl")} * -1); }
}
@media (min-width: 1024px) {
  .nc-stack[data-nc-layout="adjacent"] {
    display: grid;
    grid-template-columns: var(--astrid-cols);
    align-items: stretch;
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module {
    border-bottom: 0;
    border-inline-end: ${r("hairline")} solid ${r("divider")};
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module:last-child { border-inline-end: 0; }
  .nc-module { padding: ${r("module-pad-y-desktop")} ${r("module-pad-x-desktop")}; }
  /* Desktop slots (item C): Bass's 2 x 5 grid across the column, each slot as tall as the Pattern buttons
     (target-min). One row of 10 left each slot 19 px wide at 1280 and 16 px at 1024. */
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${r("control-gap")};
  }
  .nc-snap-wrap {
    width: 100%;
    max-width: none;
    height: ${r("target-min")};
  }
  .nc-snap { font-size: ${r("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
  .nc-section[data-nc-inset="true"] {
    margin-inline: calc(${r("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${r("module-pad-y-desktop")} * -1);
    padding: ${r("module-pad-y-desktop")} ${r("module-pad-x-desktop")};
  }
  .nc-section[data-nc-panel="true"] {
    margin-inline: calc(${r("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${r("module-pad-y-desktop")} * -1);
    padding: ${r("module-pad-y-desktop")} ${r("module-pad-x-desktop")};
  }
  .nc-panel-body {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: ${r("module-pad-x-desktop")};
  }
  .nc-module[data-nc-slim] {
    display: block;
    padding-inline: ${r("module-pad-x-slim")};
  }
  .nc-module[data-nc-slim] .nc-module-hd { display: flex; }
  .nc-module[data-nc-slim] .nc-module-hd,
  .nc-module[data-nc-slim] .nc-slim {
    flex-direction: column;
    align-items: flex-start;
  }
  .nc-module[data-nc-slim] .nc-slim { margin-top: ${r("module-gap")}; }
  .nc-module[data-nc-slim] .nc-slim-lines { white-space: normal; }
  .nc-ui-fx {
    margin-inline: calc(${r("module-pad-x-desktop")} * -1);
    padding-inline: ${r("module-pad-x-desktop")};
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
    border-bottom: ${r("hairline")} solid ${r("divider")};
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
    gap: ${r("module-gap")};
    padding-block: ${r("control-gap")};
    background: ${r("surface-page")};
    border-bottom: ${r("hairline")} solid ${r("divider")};
  }
  .nc-pads {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: ${r("module-gap")};
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
    max-width: ${r("slot-span")};
    height: ${r("slot-block")};
    justify-self: center;
  }
  .nc-snap { font-size: ${r("readout-size")}; }
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
${hr("")}
}
@media (max-width: 1023px) {
${hr("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Ra("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Ra("")}
}
@media (max-width: 1023px) {
${Ra("html[data-nc-landscape] ")}
}
@media (prefers-reduced-motion: reduce) {
  .nc-btn, .nc-btn:active, .nc-toggle, .nc-seg > button, .nc-sparkle, .nc-sparkle-btn, .nc-sparkle-btn:active,
  .nc-ui-toast, .nc-ui-toast[data-state="closing"], .nc-ui-switch, .nc-select,
  .nc-meter, .nc-meter-fill, .nc-step[data-playhead="true"], .nc-fader-cap, .nc-meter-clip, .nc-ui-fx, .nc-ui-fx-fold, .nc-strip, .nc-eq-node::after, .nc-fx-max-icon > i, .nc-fold-tri {
    transition: none;
    animation: none;
  }
  .nc-snap[data-queued="true"][data-pulse="true"] {
    outline-color: ${r("accent-faint")};
    background: transparent;
    box-shadow: inset 0 calc(-1 * ${r("focus-width")} * 2) 0 ${r("accent-faint")};
  }
}
`}var Ia=null,Yu="nc-ui-fallback";function Ws(t=globalThis.document){if(!t?.documentElement||(t.documentElement,Ia&&Ia.ownerDocument===t))return;let e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${Yu} {
${Gu()}
}
`,t.head.append(e),Ia=e}var Qt=null,Ku=0,Xu=new URL("/nyx/assets/confirm-BSJWrX8s.css",import.meta.url).href,Us=t=>{let e=t.querySelector?.("link[data-nc-ui-confirm]");return!e&&t.head&&(e=t.createElement("link"),e.rel="stylesheet",e.href=Xu,e.dataset.ncUiConfirm="",e.ncWait=new Promise(n=>{let a=()=>{e.ncWait=null,n()};e.onload=a,e.onerror=a}),t.head.append(e)),e?.ncWait};typeof document<"u"&&Us(document);function Xo(t){return Vu(t).then(e=>!!e.ok)}function Vu({title:t,body:e,confirmLabel:n="Confirm",cancelLabel:a="Cancel",danger:o=!1,root:i,returnFocus:s,signal:l},c){if(Qt||l?.aborted)return Promise.resolve({});let d=i?.ownerDocument??document,u=Us(d),p=i??d.body,h=d.defaultView??globalThis,m=`nc-ui-confirm-${++Ku}`,b=(q,re,ge)=>{let Re=d.createElement(q);return Re.className=`nc-ui-confirm${re}`,ge!=null&&(Re.textContent=ge),Re},w=b("div","-layer");w.dataset.state="enter";let f=b("div","");f.setAttribute("role","alertdialog"),f.setAttribute("aria-modal","true"),f.setAttribute("aria-labelledby",`${m}-t`),f.setAttribute("aria-describedby",`${m}-b`);let g=b("h2","-title",t);g.id=`${m}-t`;let y=b("p","-body",e);y.id=`${m}-b`;let v=b("div","-actions"),x=(q,re)=>{let ge=b("button","-btn",q);return ge.type="button",ge.dataset.ncConfirm=re,ge.addEventListener("click",()=>qe(re==="ok")),ge},k=x(a,"cancel"),$=x(n,"ok");o&&($.dataset.danger="true"),v.append(k,$);let[E,S]=[];f.append(g,y,...E?[E]:[],v);let T=[S,k,$].filter(Boolean);w.append(f);let _={layer:w};Qt=_;let H=s??d.activeElement,ce=[];for(let q of p.children)q.hasAttribute("inert")||(q.setAttribute("inert",""),ce.push(q));let D=()=>{if(Qt!==_)return;p.append(w),(S??k).focus({preventScroll:!0});let q=h.requestAnimationFrame?.bind(h)??(re=>setTimeout(re,16));q(()=>q(()=>{w.dataset.state==="enter"&&(w.dataset.state="open")}))};u?u.then(D):D();let Oe=!1;w.addEventListener("pointerdown",q=>{Oe=q.target===w}),w.addEventListener("click",q=>{q.target===w&&Oe&&qe(!1),Oe=!1});let Gt=q=>{if(q.stopImmediatePropagation(),q.key==="Escape")q.preventDefault(),qe(!1);else if(q.key==="Tab"){q.preventDefault();let re=T.filter(Re=>!Re.disabled),ge=re.length;re[(re.indexOf(d.activeElement)+(q.shiftKey?ge-1:1))%ge].focus()}else q.key==="Enter"&&(q.preventDefault(),d.activeElement===k?qe(!1):$.disabled||qe(!0))},Yt=q=>q.stopImmediatePropagation();h.addEventListener("keydown",Gt,!0),h.addEventListener("keyup",Yt,!0);let vt=()=>qe(!1);l?.addEventListener("abort",vt);let ie,Ln=new Promise(q=>{ie=q});function qe(q){if(Qt!==_)return;Qt=null,h.removeEventListener("keydown",Gt,!0),h.removeEventListener("keyup",Yt,!0),l?.removeEventListener("abort",vt);for(let xt of ce)xt.removeAttribute("inert");w.dataset.state="closing",H?.isConnected&&typeof H.focus=="function"&&H.focus({preventScroll:!0});let re=h.getComputedStyle?.(w),ge=Math.max(0,...String(re?.transitionDuration??"").split(",").map(xt=>Number.parseFloat(xt)*(xt.trim().endsWith("ms")?1:1e3)||0)),Re=()=>w.remove();w.addEventListener("transitionend",xt=>xt.target===w&&Re()),setTimeout(Re,ge+50),ie({ok:q,value:S?.value.trim()})}return Ln}function Gs(t={}){let e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);let a=e.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let o=e.createElement("span");o.dataset.ncOn="",o.textContent=t.onText??"On";let i=e.createElement("span");i.dataset.ncOff="",i.textContent=t.offText??"Off",a.append(o,i),n.append(a);let s=!1,l=d=>{s=d===!0,n.setAttribute("aria-checked",s?"true":"false")};l(t.checked);let c=()=>{l(!s),t.onChange?.(s)};return n.addEventListener("click",c),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var Ys=new WeakMap,fr=.25;function Qu(t){let e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=e.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let o=e.createElement("span");o.className="nc-fader-cap",o.setAttribute("aria-hidden","true"),n.append(a,o);let i=0,s=t.step??.005,l=t.onChange,c=t.onReset,d=f=>Math.min(1,Math.max(0,f)),u=()=>{n.style.setProperty("--fader-pos",String(i)),n.setAttribute("aria-valuenow",String(Math.round(i*1e3)/1e3))},p=f=>{let g=d(f);g!==i&&(i=g,u(),l?.(g))},h=0,m=!1;n.addEventListener("pointerdown",f=>{if(f.button!==0)return;f.preventDefault(),n.focus?.({preventScroll:!0});let g=n.getBoundingClientRect();f.target!==o&&g.height>0&&p(1-(f.clientY-g.top)/g.height),h=f.clientY,m=!0,n.dataset.dragging="true",n.setPointerCapture?.(f.pointerId)}),n.addEventListener("pointermove",f=>{if(!m)return;let g=n.getBoundingClientRect().height||1,y=(h-f.clientY)/g*(f.shiftKey?fr:1);h=f.clientY,p(i+y)});let b=()=>{m=!1,delete n.dataset.dragging};n.addEventListener("pointerup",b),n.addEventListener("pointercancel",b),n.addEventListener("lostpointercapture",b),n.addEventListener("dblclick",f=>{f.preventDefault(),c?.()}),n.addEventListener("keydown",f=>{let g=f.shiftKey?s*fr:s,y={ArrowUp:i+g,ArrowRight:i+g,ArrowDown:i-g,ArrowLeft:i-g,PageUp:i+s*10,PageDown:i-s*10,Home:0,End:1};f.key in y&&(f.preventDefault(),p(y[f.key]))});let w={el:n,get value(){return i},get dragging(){return m},set(f){m||(i=d(Number(f)||0),u())},setText(f){f?n.setAttribute("aria-valuetext",f):n.removeAttribute("aria-valuetext")},setLabel(f){n.setAttribute("aria-label",f)},configure(f){typeof f.step=="number"&&f.step>0&&(s=f.step),f.onChange&&(l=f.onChange),f.onReset&&(c=f.onReset)}};return w.setLabel(t.label),w.set(t.value??0),w.setText(t.valueText),Ys.set(n,w),w}function Ju(t){return Ys.get(t)}var Ks=new WeakMap,Zu=.2,ep=1.5,tp=.5;function np(t,e){let n=String(t??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:e}function mr(t,e,n){let a=t.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:np(a.getComputedStyle(t).getPropertyValue(W(e)),n)}function ap(t){let e=t.doc??globalThis.document,n=t.channels===2?2:1,a=e.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let o=e.createElement("button");o.type="button",o.className="nc-meter-clip",o.dataset.lit="false";let i=e.createElement("div");i.className="nc-meter-bars",i.setAttribute("aria-hidden","true");let s=[];for(let w=0;w<n;w++){let f=e.createElement("span");f.className="nc-meter-bar";let g=e.createElement("span");g.className="nc-meter-peak";let y=e.createElement("span");y.className="nc-meter-rms";let v=e.createElement("span");v.className="nc-meter-hold",f.append(g,y,v),i.append(f),s.push({peak:g,rms:y,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(o,i);let l=t.label,c=t.onClear,d=!1,u=-1,p=-1,h=()=>{o.dataset.lit=d?"true":"false",o.setAttribute("aria-pressed",d?"true":"false"),o.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),o.title=d?"Clipped. Click to clear":"Clip light"},m=(w,f,g,y)=>{let v=Math.round(y*1e3)/1e3;g[f]!==v&&(g[f]=v,w.style.transform=f==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};o.addEventListener("click",()=>{b.clear(),c?.()});let b={el:a,get clipped(){return d},update(w,f){u<0&&(u=mr(a,"motion-meter-fall",Zu)),p<0&&(p=mr(a,"motion-meter-hold",ep));let g=Math.max(0,Math.min(.25,Number(f)||0)),y=u>0?Math.exp(-g/u):0;s.forEach((v,x)=>{let k=w[x]??w[0]??{peak:0,rms:0},$=Math.min(1,Math.max(0,Number(k.peak)||0)),E=Math.min($,Math.max(0,Number(k.rms)||0));k.over&&b.clip(),v.level.peak=$>=v.level.peak?$:$+(v.level.peak-$)*y,v.level.rms=E>=v.level.rms?E:E+(v.level.rms-E)*y,v.holdAge+=g,$>=v.holdAt?(v.holdAt=$,v.holdAge=0):v.holdAge>p&&(v.holdAt=Math.max($,v.holdAt-tp*g)),m(v.peak,"peak",v.shown,v.level.peak),m(v.rms,"rms",v.shown,v.level.rms),m(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,h())},clear(){d=!1,h()},reset(){for(let w of s)w.level.peak=0,w.level.rms=0,w.holdAt=0,w.holdAge=0,m(w.peak,"peak",w.shown,0),m(w.rms,"rms",w.shown,0),m(w.hold,"hold",w.shown,0),w.hold.dataset.off="true"},setLabel(w){l=w,h()},configure(w){w.onClear&&(c=w.onClear)}};return h(),b.reset(),Ks.set(a,b),b}function op(t){return t?Ks.get(t):void 0}var ip=3,rp=new Set(["freq","q","rate","time","log"]);function Vo(t,e,n){return!t||!rp.has(t)||!(n>e)?"linear":e>0?"log":"power"}function ka(t,e,n){return Vo(t,e,n)!=="linear"}function ta(t,e,n,a){let o=Number(a);if(!(n>e)||!Number.isFinite(o))return 0;let i=Math.min(n,Math.max(e,o)),s=Vo(t,e,n);if(s==="log")return Math.log(i/e)/Math.log(n/e);let l=(i-e)/(n-e);return s==="power"?Math.cbrt(l):l}function Xs(t,e,n,a){let o=Math.min(1,Math.max(0,Number(a)||0)),i=Vo(t,e,n);return i==="log"?e*(n/e)**o:e+(n-e)*(i==="power"?o**ip:o)}function Vs(t,e,n,a){let o=Math.min(n,Math.max(e,t));if(a>0){o=e+Math.round((o-e)/a)*a;let i=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));o=Number(o.toFixed(i)),o=Math.min(n,Math.max(e,o))}return o}function Qo(t,e,n,a){return Math.round(ta(t,e,n,a)*1e3)}function uo(t,e,n,a,o){return Vs(Xs(t,e,n,Number(a)/1e3),e,n,o)}function sp(t,e,n=!1){let a=Number(t)||0,o=n?1:1e3/100,i=null;return e==="ArrowRight"||e==="ArrowUp"?i=a+o:e==="ArrowLeft"||e==="ArrowDown"?i=a-o:e==="PageUp"?i=a+1e3/10:e==="PageDown"?i=a-1e3/10:e==="Home"?i=0:e==="End"&&(i=1e3),i===null?null:Math.min(1e3,Math.max(0,Math.round(i)))}function Qs(t,e,n,a,o,i=!1,s){let l=Qo(t,e,n,a),c=sp(l,o,i);if(c===null)return null;let d=uo(t,e,n,c,s),u=Math.sign(c-l),p=Vs(Number(a),e,n,s);for(;u!==0&&d===p&&c>0&&c<1e3;)c+=u,d=uo(t,e,n,c,s);return d}function lp(t){return!t||t.options?"linear":typeof t.taper=="string"?t.taper:t.curve==="log"?"freq":t.unit==="ms"||/_ms$/.test(String(t.key??""))||t.key==="predelay"?"time":"linear"}function gr(t){let e=Number(t);return e>0&&Number.isFinite(e)?Math.log1p(e/.03):0}function cp(t,e,n,a=n/6){let o=t.some(u=>u===null),i=Math.max(0,n-(o?a:0)),s=t.reduce((u,p,h)=>p===null?u:u+gr(e[h]),0),l=s>0?i/s:0,c=t.map(u=>u===null?0:Math.min(i,gr(u)*l));if(o){let u=c.reduce((h,m)=>h+m,0),p=t.indexOf(null);c[p]=Math.max(a,n-u)}let d=[0];for(let u of c)d.push(Math.round((d[d.length-1]+u)*100)/100);return o&&(d[d.length-1]=n),d}function dp(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),a=t.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.floor(e*a)),i=Math.max(1,Math.floor(n*a));(t.width!==o||t.height!==i)&&(t.width=o,t.height=i);let s=t.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:e,h:n}}function Ie(t){return Math.max(0,Math.min(1,t))}function Js(t,e){let{ctx:n,w:a,h:o}=dp(t);if(!n)return;n.clearRect(0,0,a,o);let i=Wu(t);if(e.paint==="swatch"){let c=J(t,"accent"),d=J(t,"rhythm.step-cell-on");t.dataset.ncAccent=c,t.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,a/2,o),n.fillStyle=d,n.fillRect(a/2,0,a/2,o);return}if(e.paint==="filter"&&typeof e.hz=="number"){hp(n,a,o,e,t,i);return}if(e.paint==="filter"){let c=e.mode??"lp",d=J(t,Hs(c)),u=J(t,"divider"),p=Ie(e.cutoff??.5),h=.08+(1-Ie(e.resonance??.2))*.22;n.strokeStyle=u,n.beginPath(),n.moveTo(0,o*.72),n.lineTo(a,o*.72),n.stroke(),n.beginPath();for(let m=0;m<=a;m++){let b=m/Math.max(1,a),w=0;c==="lp"?w=b<p?1:Math.max(0,1-(b-p)/h):c==="hp"?w=b>p?1:Math.max(0,1-(p-b)/h):w=Math.max(0,1-Math.abs(b-p)/h);let f=o*.78-w*o*.62;m===0?n.moveTo(m,f):n.lineTo(m,f)}n.strokeStyle=d,n.stroke(),n.fillStyle=J(t,"text-sub"),n.font=i,n.fillText(c.toUpperCase(),0,o),t.dataset.ncAccent=d;return}if(e.paint==="envelope"){n.strokeStyle=J(t,"accent");let c=Math.max(0,e.attack??0),d=Math.max(0,e.decay??.4),[u,p,h]=cp([c,d],e.max??[1,4],a),m=2,b=o-1;n.beginPath(),n.moveTo(u,b),n.lineTo(p,m);let w=Math.max(1,Math.ceil(h-p));for(let f=1;f<=w;f++){let g=f/w;n.lineTo(p+(h-p)*g,b-(b-m)*Math.exp(-4.6*g)*(1-g*.01))}n.lineTo(h,b),n.lineTo(a,b),n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="waveform"){let c=Array.isArray(e.peaks)?e.peaks:[],[d,u]=Array.isArray(e.region)?e.region:[0,1],p=J(t,"accent"),h=J(t,"text-sub"),m=o/2;n.fillStyle=J(t,"accent-soft"),n.fillRect(Ie(d)*a,0,(Ie(u)-Ie(d))*a,o),n.strokeStyle=J(t,"divider"),n.beginPath(),n.moveTo(0,m),n.lineTo(a,m),n.stroke();let b=Math.floor(c.length/2);for(let w=0;w<b;w++){let f=(w+.5)/b*a,g=Math.max(-1,Math.min(1,c[w*2]??0)),y=Math.max(-1,Math.min(1,c[w*2+1]??0)),v=(w+.5)/b;n.strokeStyle=v>=d&&v<=u?p:h,n.beginPath(),n.moveTo(f,m-y*(m-1)),n.lineTo(f,m-g*(m-1)+.5),n.stroke()}n.strokeStyle=p;for(let w of[d,u,...Array.isArray(e.markers)?e.markers:[]]){let f=Math.round(Ie(w)*(a-1))+.5;n.beginPath(),n.moveTo(f,0),n.lineTo(f,o),n.stroke()}typeof e.position=="number"&&e.position>=0&&(n.fillStyle=J(t,"text"),n.fillRect(Math.round(Ie(e.position)*(a-1)),0,1,o)),b||(n.fillStyle=h,n.font=i,n.fillText(e.empty??"Empty",0,m+4)),t.dataset.ncAccent=p;return}if(e.paint==="meter"){let c=Ie(e.level??0);n.fillStyle=J(t,"divider"),n.fillRect(0,o*.4,a,o*.2),n.fillStyle=J(t,"accent"),n.fillRect(0,o*.4,a*c,o*.2),t.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,e.steps??16),l=((e.step??0)%s+s)%s;n.fillStyle=J(t,"rhythm.step-cell-off"),n.fillRect(0,o*.45,a,o*.1),n.fillStyle=J(t,"rhythm.playhead"),n.fillRect(l/s*a,o*.3,Math.max(1,a/s),o*.4),t.dataset.ncAccent=J(t,"accent")}var rn=20,po=2e4,ja=24,br=-60;function up(t,e,n,a,o=48e3){let i=2*Math.PI*Math.min(e,o*.49)/o,s=Math.cos(i),l=Math.sin(i)/(2*n),c,d,u;t==="hp"?[c,d,u]=[(1+s)/2,-(1+s),(1+s)/2]:t==="bp"?[c,d,u]=[l,0,-l]:[c,d,u]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,h=-2*s,m=1-l,b=2*Math.PI*a/o,w=(v,x,k)=>v+x*Math.cos(b)+k*Math.cos(2*b),f=(v,x)=>-(v*Math.sin(b)+x*Math.sin(2*b)),g=Math.hypot(w(c,d,u),f(d,u)),y=Math.hypot(w(p,h,m),f(h,m));return y>0?g/y:0}function pp(t,e){return Math.log(Math.max(rn,Math.min(po,t))/rn)/Math.log(po/rn)*e}function yr(t,e,n){let a=Math.max(br,Math.min(ja,t));return e+(ja-a)/(ja-br)*(n-e)}function hp(t,e,n,a,o,i){let s=a.mode??"lp",l=J(o,Hs(s)),c=J(o,"divider"),d=J(o,"text-sub"),u=Number.parseFloat(String(i).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,h=Math.max(p+4,n-u-3),m=a.q??Math.SQRT1_2,b=Math.round(yr(0,p,h))+.5;t.strokeStyle=c,t.lineWidth=1,t.beginPath(),t.moveTo(0,b),t.lineTo(e,b),t.stroke(),t.beginPath();for(let w=0;w<=e;w++){let f=rn*(po/rn)**(w/Math.max(1,e)),g=a.open?1:up(s,a.hz,m,f,a.sampleRate),y=yr(20*Math.log10(Math.max(1e-5,g)),p,h);w===0?t.moveTo(w,y):t.lineTo(w,y)}if(t.strokeStyle=l,t.stroke(),!a.open){let w=Math.round(pp(a.hz,e))+.5;t.strokeStyle=d,t.setLineDash?.([2,3]),t.beginPath(),t.moveTo(w,p),t.lineTo(w,h),t.stroke(),t.setLineDash?.([])}t.fillStyle=d,t.font=i,t.textAlign="left",t.fillText("20 Hz",0,n-1),t.textAlign="right",t.fillText("20 kHz",e,n-1),t.textAlign="left",o.dataset.ncAccent=l,o.dataset.ncFilterHz=String(Math.round(a.hz))}function Ee(t,e){let n=t.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${e})`,t.append(a);let o=n.defaultView.getComputedStyle(a).color;return a.remove(),o}function fp(t){let e=t.ownerDocument,n=e.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",t.append(n);let a=e.defaultView.getComputedStyle(n).font;return n.remove(),a}var ht=20,En=2e4,Jo=Math.log(En/ht),ho=32,mp=250,gp=-100,bp=1200,yp=4.5,wr=-6,st=-96,wp=48,vr=[100,1e3,1e4],vp=[6,12];function Nt(t,e){return Math.log(Math.max(ht,Math.min(En,t))/ht)/Jo*e}function _n(t,e){return ht*Math.exp(Math.max(0,Math.min(e,t))/Math.max(1,e)*Jo)}function Ke(t,e,n,a){let o=e/2-a;return e/2-Math.max(-n,Math.min(n,t))/n*o}function fo(t){return t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)} kHz`:`${Math.round(t)} Hz`}var Zs=t=>`${t>0?"+":t<0?"−":""}${Math.abs(Math.round(t*10)/10)} dB`;function xp(t,e,n,a){let o=n?3:1,i=c=>({db:Math.max(-a,Math.min(a,t.db+c*o))}),s=c=>({hz:Math.max(t.minHz??ht,Math.min(t.maxHz??En,t.hz*2**(c*o/6)))}),l=c=>({q:Math.max(t.minQ??.1,Math.min(t.maxQ??20,t.q*1.25**(c*o)))});switch(e){case"ArrowUp":return i(1);case"ArrowDown":return i(-1);case"ArrowRight":return t.moveHz?s(1):i(1);case"ArrowLeft":return t.moveHz?s(-1):i(-1);case"PageUp":return t.moveQ?l(1):null;case"PageDown":return t.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Zo(t){return t.kind==="lowshelf"||t.kind==="highshelf"?.5:1}function kp(t,e,n,a,o,i,s,l,c){let d=c?.25:1,u={},p=Math.max(1,i/2-l);if(u.db=Math.max(-s,Math.min(s,e.db-a*d/p*s/Zo(t))),t.moveHz){let h=e.hz*Math.exp(n*d/Math.max(1,o)*Jo);u.hz=Math.max(t.minHz??ht,Math.min(t.maxHz??En,h))}return u}function $p(t,e,n,a,o){let i=Math.max(0,n.left)+1,s=Math.min(n.right,o)-1,l=Math.min(e.width*3+a*2,s-i),c=Math.max(i,Math.min(t.left,s-l));return{left:Math.round(c-e.left),top:Math.round(t.top-e.top),width:Math.round(l)}}var ae=new WeakMap;function Ep(t,e){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=t.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let o=document.createElement("canvas");o.className="nc-eq-spectrum",o.setAttribute("aria-hidden","true");let i=document.createElement("canvas");i.className="nc-eq-curve",i.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(o,i);for(let c of t.bands)a.append(Ap(n,c,e));a.append(s),a.addEventListener("click",c=>{if(!il(n)||c.button>0)return;let d=ol(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),ae.set(n,{control:t,cache:null,spec:null,active:null}),tl(n,t),n}function el(t,e){return[...t.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===e)??null}function Ap(t,e,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=e.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let o=()=>{let d=n(t);return d?.type==="eqGraph"?d:null},i=()=>o()?.bands.find(d=>d.id===e.id)??null,s=null;a.addEventListener("pointerdown",d=>{if(d.button!==0)return;let u=i();u&&(d.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(d.pointerId),s={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:u.hz,db:u.db}},a.dataset.drag="true",je(t,e.id))}),a.addEventListener("pointermove",d=>{if(!s||d.pointerId!==s.id)return;let u=o(),p=i(),h=ae.get(t);if(!u||!p||!h?.box)return;let{w:m,h:b,pad:w}=h.box;u.onBand(p.id,kp(p,s.start,d.clientX-s.x,d.clientY-s.y,m,b,u.range??18,w,d.shiftKey))});let l=d=>{!s||d.pointerId!==s.id||(s=null,delete a.dataset.drag,t.ownerDocument.activeElement!==a&&!a.matches(":hover")&&je(t,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",d=>{d.preventDefault(),o()?.onReset?.(e.id)}),a.addEventListener("keydown",d=>{let u=o(),p=i();if(!u||!p)return;let h=xp(p,d.key,d.shiftKey,u.range??18);h&&(d.preventDefault(),h==="reset"?u.onReset?.(p.id):u.onBand(p.id,h),je(t,p.id))});let c=null;return a.addEventListener("wheel",d=>{let u=o(),p=i();if(!u||!p?.moveQ)return;d.preventDefault();let h=d.timeStamp;(!c||h-c.t>400)&&(c={q:p.q,t:h});let m=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,c.q*2**(-m/240))),c.t=h,u.onBand(p.id,{q:c.q}),je(t,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>je(t,e.id)),a.addEventListener("focus",()=>je(t,e.id)),a.addEventListener("pointerleave",()=>{!s&&t.ownerDocument.activeElement!==a&&je(t,null)}),a.addEventListener("blur",()=>{s||je(t,null)}),a}function je(t,e){let n=ae.get(t);if(!n)return;let a=n.active!==e;n.active=e,a?Bt(t):ei(t)}function ei(t){let e=ae.get(t),n=t.querySelector(".nc-eq-tip");if(!e||!(n instanceof HTMLElement))return;let a=e.active?e.control.bands.find(b=>b.id===e.active):null;for(let b of t.querySelectorAll(".nc-eq-node"))b instanceof HTMLElement&&(a&&b.dataset.band===a.id?b.dataset.active="true":delete b.dataset.active);if(!a||!e.box){n.hidden=!0;return}let o=[a.label,Zs(a.db)];a.kind==="peak"?o.push(fo(a.hz),`Q ${a.q.toFixed(1)}`):o.push(`${a.kind==="lowshelf"?"below":"above"} ${fo(a.hz)}`),n.textContent=o.join(" · "),n.dataset.tone=String(Sp(e.control,a)),n.hidden=!1;let{w:i,h:s,pad:l}=e.box,c=Nt(a.hz,i),d=Ke(a.db*Zo(a),s,e.control.range??18,l),u=n.offsetWidth,p=n.offsetHeight,h=Math.max(0,Math.min(i-u,c-u/2)),m=d-p-l*1.5>=0?d-p-l*1.5:Math.min(s-p,d+l*1.5);n.style.left=`${Math.round(h)}px`,n.style.top=`${Math.round(m)}px`}function Sp(t,e){return t.bands.indexOf(e)%3+1}function tl(t,e){let n=ae.get(t);if(!n)return;n.control=e,t.setAttribute("aria-label",e.label??"EQ curve"),e.help?t.setAttribute("data-nc-help",e.help):t.removeAttribute("data-nc-help"),t.dataset.on=e.on===!1?"false":"true",ti(t);let a=e.range??18;e.bands.forEach((o,i)=>{let s=el(t,o.id);s instanceof HTMLElement&&(s.dataset.tone=String(i%3+1),s.dataset.kind=o.kind,s.setAttribute("aria-label",`${o.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(o.db)),s.setAttribute("aria-valuetext",o.valueText??`${Zs(o.db)}, ${fo(o.hz)}`),s.setAttribute("aria-keyshortcuts",o.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),o.help?s.setAttribute("data-nc-help",o.help):s.removeAttribute("data-nc-help"))}),Bt(t),Fp(t)}function nl(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),a=t.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.round(e*a)),i=Math.max(1,Math.round(n*a));(t.width!==o||t.height!==i)&&(t.width=o,t.height=i);let s=t.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:e,h:n}}function al(t){return{curve:Ee(t,"eq-curve"),fill:Ee(t,"eq-fill"),quiet:Ee(t,"text-sub"),grid:Ee(t,"eq-grid"),zero:Ee(t,"divider"),label:Ee(t,"text-sub"),spectrum:Ee(t,"eq-spectrum"),bands:[Ee(t,"eq-band-1"),Ee(t,"eq-band-2"),Ee(t,"eq-band-3")]}}function Mp(t,e){return`${e}|${t.sampleRate??""}|${t.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Bt(t){ae.has(t)&&ti(t);let e=ae.get(t),n=t.querySelector(".nc-eq-curve");if(!e||!(n instanceof HTMLCanvasElement)||!t.isConnected)return;let a=e.control,{ctx:o,w:i,h:s}=nl(n);if(!o)return;let l=Math.max(8,Math.round(s*.06)),c=a.range??18;e.box={w:i,h:s,pad:l},e.colours=al(t);let d=e.colours,u=Mp(a,i);if(!e.cache||e.cache.key!==u){let x=Math.max(64,Math.ceil(i)+1),k=new Float64Array(x);for(let E=0;E<x;E++)k[E]=_n(E/(x-1)*i,i);let $=null;try{$=typeof a.response=="function"?a.response(k):null}catch{$=null}e.cache={key:u,freqs:k,total:$?.total??new Float64Array(x),bands:$?.bands??[]}}o.clearRect(0,0,i,s);let p=fp(t),h=a.on!==!1;Lp(o,i,s,c,l,d,p);let{freqs:m,total:b,bands:w}=e.cache,f=Array.from(m,x=>Nt(x,i)),g=Ke(0,s,c,l);w.forEach((x,k)=>{if(!x||!x.some(S=>Math.abs(S)>.05))return;let $=h?d.bands[k%3]:d.quiet,E=Array.from(x,S=>Ke(S,s,c,l));o.save(),e.active&&a.bands[k]?.id===e.active&&(o.globalAlpha=.14,o.fillStyle=$,xr(o,f,E,g)),o.globalAlpha=h?.75:.4,o.strokeStyle=$,o.lineWidth=.75,_a(o,f,E),o.restore()});let y=Array.from(b,x=>Ke(x,s,c,l)),v=h?d.curve:d.quiet;o.save(),o.fillStyle=h?d.fill:d.quiet,o.globalAlpha=h?.2:.08,xr(o,f,y,g),o.restore(),o.save(),o.strokeStyle=h?d.fill:v,o.lineJoin="round",o.lineCap="round",h&&(o.globalAlpha=.16,o.lineWidth=4,_a(o,f,y)),o.globalAlpha=1,o.strokeStyle=v,o.lineWidth=1.25,_a(o,f,y),o.restore(),Tp(t),ei(t)}function Lp(t,e,n,a,o,i,s){t.save(),t.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let u=c*d;if(u<ht||u>En)continue;let p=Math.round(Nt(u,e))+.5;t.globalAlpha=vr.includes(u)?.9:.35,t.strokeStyle=i.grid,t.beginPath(),t.moveTo(p,0),t.lineTo(p,n),t.stroke()}for(let c of vp)if(!(c>a))for(let d of[1,-1]){let u=Math.round(Ke(c*d,n,a,o))+.5;t.globalAlpha=c===12?.75:.4,t.strokeStyle=i.grid,t.beginPath(),t.moveTo(0,u),t.lineTo(e,u),t.stroke()}t.globalAlpha=1,t.strokeStyle=i.zero;let l=Math.round(Ke(0,n,a,o))+.5;t.beginPath(),t.moveTo(0,l),t.lineTo(e,l),t.stroke(),t.font=s,t.fillStyle=i.label,t.globalAlpha=.9,t.textBaseline="bottom",t.textAlign="left";for(let c of vr){let d=c>=1e3?`${c/1e3}k`:String(c),u=t.measureText(d).width,p=Nt(c,e)+3;t.fillText(d,p+u+2>e?Nt(c,e)-u-3:p,n-2)}t.textBaseline="bottom",t.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>a)continue;let d=Ke(c,n,a,o);t.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",e-3,Math.round(d)-1)}t.restore()}function na(t,e,n){t.moveTo(e[0],n[0]);for(let a=1;a<e.length-1;a++){let o=(e[a]+e[a+1])/2,i=(n[a]+n[a+1])/2;t.quadraticCurveTo(e[a],n[a],o,i)}t.lineTo(e[e.length-1],n[n.length-1])}function _a(t,e,n){t.beginPath(),na(t,e,n),t.stroke()}function xr(t,e,n,a){t.beginPath(),na(t,e,n),t.lineTo(e[e.length-1],a),t.lineTo(e[0],a),t.closePath(),t.fill()}function ol(t){return t.closest("[data-nc-maxable]")}function il(t){let e=ol(t);return!!e&&!e.hasAttribute("data-nc-max")}function ti(t){let e=il(t);e?t.dataset.locked="":delete t.dataset.locked;for(let n of t.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",e?"-1":"0"),e?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(e){let n=ae.get(t);n?.active&&(n.active=null,ei(t))}return e}function Tp(t){ti(t);let e=ae.get(t);if(!e?.box)return;let{w:n,h:a,pad:o}=e.box,i=e.control.range??18;for(let s of e.control.bands){let l=el(t,s.id);l instanceof HTMLElement&&(l.style.left=`${Nt(s.hz,n).toFixed(1)}px`,l.style.top=`${Ke(s.db*Zo(s),a,i,o).toFixed(1)}px`)}}function Cp(t,e,n,a){let o=a/2/n,i=new Float32Array(t),s=new Float32Array(t),l=new Float32Array(t);for(let c=0;c<t;c++){let d=(c-.5)/(t-1)*e,u=(c+.5)/(t-1)*e,p=_n(d,e),h=_n(u,e),m=_n(c/(t-1)*e,e);i[c]=Math.min(n-1,p/o),s[c]=Math.min(n-1,h/o),l[c]=yp*Math.log2(m/1e3)}return{lo:i,hi:s,tilt:l}}function Np(t,e,n){let a=Math.floor(e),o=Math.ceil(n);if(o-a<=1){let s=e-a,l=t[a]??-1/0,c=t[Math.min(t.length-1,a+1)]??l;return l+(c-l)*s}let i=-1/0;for(let s=a;s<=o&&s<t.length;s++)t[s]>i&&(i=t[s]);return i}function Fp(t){let e=ae.get(t);if(e){if(!e.control.spectrum){sl(t);return}if(!e.spec){e.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=t.ownerDocument.defaultView?.IntersectionObserver;n?(e.spec.io=new n(a=>{let o=ae.get(t)?.spec;o&&(o.visible=a.some(i=>i.isIntersecting),mo(t))}),e.spec.io.observe(t)):e.spec.visible=!0}mo(t)}}function mo(t){let e=ae.get(t),n=e?.spec;if(!n)return;let a=t.ownerDocument;if(!(t.isConnected&&n.visible&&a.visibilityState!=="hidden"&&e.control.spectrum)){rl(t);return}if(!n.analyser){if(n.source=e.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=go(t),n.onVis||(n.onVis=()=>mo(t),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&bo(t,!1)}function go(t){return t.ownerDocument.defaultView?.performance?.now()??Date.now()}function bo(t,e){let n=ae.get(t)?.spec,a=t.ownerDocument.defaultView;!n||!a||(e?n.timer=a.setTimeout(()=>(n.timer=0,Ha(t,go(t))),mp):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(o=>(n.raf=0,Ha(t,o))):n.timer=a.setTimeout(()=>(n.timer=0,Ha(t,go(t))),ho))}function rl(t){let e=ae.get(t)?.spec;if(!e)return;let n=t.ownerDocument.defaultView;e.raf&&n?.cancelAnimationFrame?.(e.raf),e.timer&&n?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.analyser&&(e.source?.close?.(),e.analyser=null,e.source=null),e.disp&&e.disp.fill(-1/0);let a=t.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function sl(t){let e=ae.get(t)?.spec;if(!e)return;rl(t),e.io?.disconnect(),e.onVis&&t.ownerDocument.removeEventListener("visibilitychange",e.onVis);let n=ae.get(t);n&&(n.spec=null)}function Ha(t,e){let n=ae.get(t),a=n?.spec;if(!n||!a)return;if(!t.isConnected){sl(t);return}if(!a.analyser)return;if(e-a.last<ho-4&&!a.idle){bo(t,!1);return}let o=a.last?Math.min(.25,(e-a.last)/1e3):ho/1e3;a.last=e;let i=t.querySelector(".nc-eq-spectrum");if(!(i instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:c}=nl(i);if(!s)return;let d=Math.max(16,Math.round(l/2)),u=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==d||a.map.w!==l||a.map.sr!==u)&&(a.map={cols:d,w:l,sr:u,...Cp(d,l,a.buf.length,u)},a.disp=new Float32Array(d).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,h=wp*o,{lo:m,hi:b,tilt:w}=a.map;for(let g=0;g<d;g++){let y=Np(a.buf,m[g],b[g]);y>p&&(p=y);let v=y+w[g],x=a.disp[g]-h;a.disp[g]=v>x?v:x}p>gp&&(a.loud=e);let f=e-a.loud>bp;s.clearRect(0,0,l,c),(!f||a.disp.some(g=>g>st))&&zp(s,l,c,a.disp,n.colours??al(t)),a.idle=f&&!a.disp.some(g=>g>st),bo(t,a.idle)}function zp(t,e,n,a,o){let i=a.length,s=new Array(i),l=new Array(i),c=d=>{let u=a[Math.max(0,Math.min(i-1,d))];return Number.isFinite(u)?u:st};for(let d=0;d<i;d++){let u=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,p=(Math.max(st,Math.min(wr,Number.isFinite(u)?u:st))-st)/(wr-st);s[d]=d/(i-1)*e,l[d]=n-p*n}t.save(),t.fillStyle=o.spectrum,t.globalAlpha=.13,t.beginPath(),na(t,s,l),t.lineTo(e,n),t.lineTo(0,n),t.closePath(),t.fill(),t.globalAlpha=.32,t.strokeStyle=o.spectrum,t.lineWidth=1,t.beginPath(),na(t,s,l),t.stroke(),t.restore()}var Pp=.8912509381337456,yo=32,Dp=250,Bp=1200,Op=.2,ll=1.5;function qp(t){let e=Number(t);if(!(e>0))return 0;let n=(20*Math.log10(e)- -48)/48;return n<=0?0:n>=1?1:n}function Rp(t=globalThis.document){let e=t.createElement("span");e.className="nc-fx-level",e.setAttribute("aria-hidden","true"),e.dataset.ncRows="2";for(let n of["in","out"]){let a=t.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let o=t.createElement("span");o.className="nc-fx-level-fill",a.append(o),e.append(a)}return e}var aa=new WeakMap,kr=new WeakMap;function $r(t,e,n){let a=t.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let o=String(a.getComputedStyle(t).getPropertyValue(`--nc-ui-${e}`)??"").trim(),i=Number.parseFloat(o);return Number.isFinite(i)?o.endsWith("ms")?i/1e3:i:n}function Ip(t){let e=kr.get(t);if(e)return e;let n=t.defaultView;e={doc:t,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(e.io=new a(o=>{for(let i of o){let s=aa.get(i.target);s&&(s.seen.set(i.target,i.isIntersecting),sn(s))}Tt(e)})),t.addEventListener("visibilitychange",()=>{for(let o of e.recs)sn(o);Tt(e)}),kr.set(t,e),e}var cl=t=>t.els.some(e=>e.isConnected);function jp(t){if(!t.loop.io)return cl(t);for(let e of t.els)if(t.seen.get(e)===!0&&e.isConnected)return!0;return!1}function sn(t){let e=!t.dead&&!!t.source&&jp(t)&&t.loop.doc.visibilityState!=="hidden";if(e&&!t.open){let n=typeof t.source.open=="function"?t.source.open():!0;t.open=n!==!1,t.open&&(t.loop.loud=ni(t.loop))}else!e&&t.open&&(t.open=!1,t.source?.close?.(),xo(t))}function ni(t){return t.doc.defaultView?.performance?.now()??Date.now()}function Tt(t){let e=!1;for(let n of t.recs)n.open&&(e=!0);if(!e){dl(t);return}t.idle&&t.timer&&(t.doc.defaultView?.clearTimeout(t.timer),t.timer=0,t.idle=!1,t.loud=ni(t)),!t.raf&&!t.timer&&wo(t,!1)}function wo(t,e){let n=t.doc.defaultView;if(!n)return;let a=()=>Er(t,ni(t));e?t.timer=n.setTimeout(()=>(t.timer=0,a()),Dp):typeof n.requestAnimationFrame=="function"?t.raf=n.requestAnimationFrame(o=>(t.raf=0,Er(t,o))):t.timer=n.setTimeout(()=>(t.timer=0,a()),yo)}function dl(t){let e=t.doc.defaultView;t.raf&&e?.cancelAnimationFrame?.(t.raf),t.timer&&e?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.idle=!1,t.last=0}function Er(t,e){if(e-t.last<yo-4&&!t.idle&&t.last){wo(t,!1);return}let n=t.last?Math.min(.25,(e-t.last)/1e3):yo/1e3;t.last=e,t.frames++;let a=!1,o=!1;for(let i of t.recs){if(!cl(i)){(i.placed||t.frames-i.born>90)&&ul(i);continue}i.placed=!0,i.open&&(o=!0,_p(i,n,e)&&(t.loud=e),(i.disp[0]>0||i.disp[1]>0)&&(a=!0))}if(!o){dl(t);return}t.idle=e-t.loud>Bp&&!a,wo(t,t.idle)}function _p(t,e,n){if(t.fall<0){let h=t.els[0];t.fall=$r(h,"motion-meter-fall",Op),t.hold=$r(h,"motion-meter-hold",ll)}let a=null;try{a=t.source.read()}catch{a=null}let o=typeof a=="number",i=o?a:Number(a?.in)||0,s=!o&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,c=s?"2":"1";if(t.rows!==c){t.rows=c;for(let h of t.els)h.dataset.ncRows=c}let d=t.fall>0?Math.exp(-e/t.fall):0,u=[i,l],p=!1;for(let h=0;h<2;h++){let m=qp(u[h]);m>0&&(p=!0),t.disp[h]=m>=t.disp[h]?m:m+(t.disp[h]-m)*d,t.disp[h]<.001&&(t.disp[h]=0),u[h]>=Pp&&(t.clipAt[h]=n);let b=t.clipAt[h]>0&&n-t.clipAt[h]<t.hold*1e3;vo(t,h,t.disp[h],b)}return p}function vo(t,e,n,a){let o=Math.round(n*1e3)/1e3,i=a?"true":"false";if(!(t.shown[e]===o&&t.clipShown[e]===i)){t.shown[e]=o,t.clipShown[e]=i;for(let s of t.els){let l=s.children[e]?.firstElementChild;l&&(l.style.transform=`scaleY(${o})`,l.dataset.clip=i)}}}function xo(t){t.disp[0]=0,t.disp[1]=0,t.clipAt[0]=0,t.clipAt[1]=0,vo(t,0,0,!1),vo(t,1,0,!1)}function ul(t){t.open&&(t.open=!1,t.source?.close?.()),t.dead=!0,t.loop.recs.delete(t);for(let e of t.els)t.loop.io?.unobserve(e),aa.get(e)===t&&aa.delete(e)}function Hp(t,e){let n=(Array.isArray(t)?t:[t]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,o=Ip(a),i={els:n,source:e??null,loop:o,open:!1,dead:!1,seen:new Map,born:o.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:ll,rows:""};for(let s of n)aa.set(s,i),o.io?.observe(s);if(o.recs.add(i),xo(i),!o.io){let s=a.defaultView,l=()=>{sn(i),Tt(o)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!i.dead){if(l===i.source){sn(i),Tt(o);return}i.open&&(i.open=!1,i.source?.close?.(),xo(i)),i.source=l,sn(i),Tt(o)}},destroy(){i.dead||ul(i),Tt(o)}}}var pl={slop:8,longPressMs:500,pitchPx:16},Wp=class{constructor(t,e,n=pl){this.hit=t,this.emit=e,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(t,e,n,a){if(this.phase!=="idle")return!1;let o=this.hit(e,n);return o<0?!1:(this.phase="pending",this.pointer=t,this.pad=o,this.x0=e,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(t){this.phase==="pending"&&t-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(t,e,n,a){if(t!==this.pointer)return;let o=e-this.x0,i=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(o,i)<this.config.slop)return;Math.abs(i)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-i/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(e,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(t,e,n,a){t===this.pointer&&(this.phase==="pending"&&this.move(t,e,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(t){t===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Up(t,e,n,a=pl){let o=!1,i=0,s=(d,u)=>{let p=t.ownerDocument.elementFromPoint?.(d,u),h=[...t.querySelectorAll(e)],m=p?h.findIndex(f=>f===p||f.contains(p)):-1;if(m>=0)return m;let b=-1,w=Number.POSITIVE_INFINITY;return h.forEach((f,g)=>{if(f.hidden)return;let y=f.getBoundingClientRect();if(u<y.top||u>y.bottom)return;let v=Math.abs(d-(y.left+y.width/2));v<w&&v<=y.width&&(b=g,w=v)}),b},l=new Wp(s,d=>{(d.kind==="paint"||d.kind==="long")&&(o=!0),n(d)},a),c=()=>{i&&clearTimeout(i),i=0};return t.addEventListener("pointerdown",d=>{d.button>0||(o=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),i=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),t.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),t.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),t.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),t.addEventListener("click",d=>{o&&(o=!1,d.stopPropagation(),d.preventDefault())},!0),t.addEventListener("contextmenu",d=>d.preventDefault()),l}var hl="netcomposer.groups.v1";function ai(){try{return globalThis.localStorage??null}catch{return null}}function fl(t=ai(),e=hl){try{let n=JSON.parse(t?.getItem(e)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[o,i]of Object.entries(n))typeof i=="boolean"&&a.set(o,i);return a}catch{return new Map}}function Gp(t,e,n,a=hl){let o=fl(t,a);o.set(e,n);try{t?.setItem(a,JSON.stringify(Object.fromEntries(o)))}catch{}}function Yp(t,e=ai()){return fl(e).get(t.id)??t.open===!0}function Kp(t,e,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=t.id;let o=document.createElement("button");o.type="button",o.className="nc-group-toggle",o.id=`${t.id}-group-toggle`;let i=document.createElement("span");i.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),o.append(i,s,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${t.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",o.id),o.setAttribute("aria-controls",c.id);for(let d of t.controls)c.append(n(d,e));return o.addEventListener("click",()=>{let d=a.dataset.ncOpen!=="true";Gp(ai(),t.id,d),ko(a,d);let u=e(a);u?.type==="group"&&u.onToggle?.(d)}),a.append(o,c),ml(a,t),ko(a,Yp(t)),gl(a,t),a}function ko(t,e){t.dataset.ncOpen=e?"true":"false";let n=t.querySelector(":scope > .nc-group-toggle"),a=t.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",e?"true":"false");let o=n?.querySelector(".nc-group-mark");o&&(o.textContent=e?"−":"+"),a instanceof HTMLElement&&(a.hidden=!e&&t.dataset.ncCollapse!=="phone")}function ml(t,e){let n=e.collapse==="phone"?"phone":void 0;return t.dataset.ncCollapse===n?!1:(n?t.dataset.ncCollapse=n:delete t.dataset.ncCollapse,!0)}function gl(t,e){ml(t,e)&&ko(t,t.dataset.ncOpen==="true");let n=t.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==e.title&&(n.textContent=e.title);let a=t.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),o=e.summary??"";a&&a.textContent!==o&&(a.textContent=o)}var Fn="application/x-nc-pad",Ar="http://www.w3.org/2000/svg";function Xp(t){let e=Math.floor((t?.length??0)/2);if(!e)return"";let n=Math.min(48,e),a=[],o=[];for(let i=0;i<n;i++){let s=Math.floor(i*e/n),l=Math.max(s+1,Math.floor((i+1)*e/n)),c=0,d=0;for(let p=s;p<l;p++)c=Math.min(c,t[2*p]??0),d=Math.max(d,t[2*p+1]??0);let u=n===1?50:i/(n-1)*100;a.push(`${u.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),o.push(`${u.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${a.join("L")}L${o.reverse().join("L")}Z`}function Vp(t,e){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(t.columns??2),t.pads.forEach((o,i)=>a.append(Qp(n,i,e))),n.append(a),n.addEventListener("keydown",o=>{o.key==="Escape"&&Hn(n)}),yl(n,t),n}function Qp(t,e,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(e);let o=document.createElement("span");o.className="nc-padgrid-pad-bar",o.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(Ar,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(Ar,"path");return c.append(d),a.append(o,i,s,l,c),Zp(t,a,e,n),i.addEventListener("dblclick",()=>{let u=n(t);u?.type==="padGrid"&&u.onRename&&a.dataset.empty!=="true"&&bl(t,a,e,n)}),a.addEventListener("dragstart",u=>{if(a.dataset.empty==="true"||!u.dataTransfer){u.preventDefault();return}u.dataTransfer.setData(Fn,String(e)),u.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",u=>{let p=u.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(Fn)||(u.preventDefault(),u.stopPropagation(),u.dataTransfer&&(u.dataTransfer.dropEffect=p.includes(Fn)&&!u.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",u=>{delete a.dataset.drop;let p=n(t);if(p?.type!=="padGrid")return;let h=u.dataTransfer?.getData(Fn);if(h!==void 0&&h!==""){u.preventDefault(),u.stopPropagation();let b=Number(h);b!==e&&p.onMove?.(b,e,u.altKey);return}let m=u.dataTransfer?.files?.[0];m&&(u.preventDefault(),u.stopPropagation(),p.onFile?.(e,m))}),a}function Jp(t,e,n){let a=n(t);a?.type==="padGrid"&&a.onPress(e)}function Zp(t,e,n,a){let o=0,i=!1,s=0,l=0,c=()=>{window.clearTimeout(o),o=0};e.addEventListener("pointerdown",d=>{if(d.button!==0)return;i=!1,s=d.clientX,l=d.clientY,c();let u=a(t);u?.type==="padGrid"&&(u.onDown?.(n),!(u.onDown&&d.pointerType==="mouse")&&(o=window.setTimeout(()=>{o=0,i=Sr(t,e,n,a)},450)))}),e.addEventListener("pointermove",d=>{o&&Math.hypot(d.clientX-s,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])e.addEventListener(d,c);e.addEventListener("contextmenu",d=>{d.preventDefault(),c(),i=Sr(t,e,n,a)}),e.addEventListener("click",()=>{if(i){i=!1;return}Jp(t,n,a)})}function Sr(t,e,n,a){let o=a(t);if(o?.type!=="padGrid"||!o.menu)return!1;let i=o.menu(n);if(!i.length)return!1;Hn(t);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",u=>{u.preventDefault(),u.stopPropagation(),Hn(t)}),s.addEventListener("click",u=>u.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",e.getAttribute("aria-label")??"Pad");for(let u of i){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=u.id,p.textContent=u.label,p.addEventListener("click",()=>{Hn(t);let h=a(t);h?.type==="padGrid"&&(u.id==="rename"&&h.onRename?bl(t,e,n,a):h.onMenu?.(n,u.id))}),l.append(p)}t.append(s,l);let c=t.getBoundingClientRect(),d=e.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function bl(t,e,n,a){t.querySelector(":scope > .nc-padgrid-rename")?.remove();let o=a(t);if(o?.type!=="padGrid")return;let i=document.createElement("input");i.type="text",i.className="nc-padgrid-rename",i.maxLength=o.nameMax??24,i.value=o.pads[n]?.label??"",i.setAttribute("aria-label",`Name of pad ${n+1}`);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();i.style.left=`${l.left-s.left}px`,i.style.top=`${l.top-s.top}px`,i.style.width=`${l.width}px`;let c=!1,d=u=>{if(c)return;c=!0;let p=i.value.trim();i.remove(),e.focus();let h=a(t);u&&p&&h?.type==="padGrid"&&h.onRename?.(n,p)};i.addEventListener("keydown",u=>{u.stopPropagation(),u.key==="Enter"?d(!0):u.key==="Escape"&&d(!1)}),i.addEventListener("blur",()=>d(!0));for(let u of["pointerdown","click","dblclick"])i.addEventListener(u,p=>p.stopPropagation());t.append(i),i.focus(),i.select()}function Hn(t){for(let e of t.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))e.remove()}function yl(t,e){let n=t.querySelectorAll(".nc-padgrid-pad");e.pads.forEach((a,o)=>{let i=n[o];if(!(i instanceof HTMLButtonElement))return;let s=i.querySelector(".nc-padgrid-pad-name"),l=i.querySelector(".nc-padgrid-pad-hint"),c=i.querySelector(".nc-padgrid-pad-wave path"),d=i.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=a.empty?"":a.badge??""),i.draggable=!a.empty,a.empty?(i.dataset.empty="true",s&&(s.textContent=e.emptyLabel??"Load"),l&&(l.textContent=e.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete i.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=a.hint??""),c?.setAttribute("d",Xp(a.peaks))),!a.empty&&a.hint?i.dataset.hint="true":delete i.dataset.hint,a.lane?i.dataset.ncLane=String(a.lane):delete i.dataset.ncLane;let u=e.selected===o;u?i.dataset.selected="true":delete i.dataset.selected,i.setAttribute("aria-pressed",u?"true":"false"),a.playing?i.dataset.playing="true":delete i.dataset.playing,i.setAttribute("aria-label",a.empty?`Pad ${o+1}, empty: load a sample`:`Pad ${o+1}, ${a.label}${a.hint?`, ${a.hint}`:""}${a.badgeLabel?`, ${a.badgeLabel}`:""}${u?", selected":""}`)})}function le(){let t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function $a(t,e){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;let a=document.createElement("label");a.className="nc-label",a.htmlFor=t,a.textContent=e;let o=document.createElement("span");return o.className="nc-readout",o.dataset.ncReadout="",n.append(a,o),n}function Mr(t,e){let n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function hn(t){if(!Number.isFinite(t))return"";let e=Math.round(t*100)/100;return String(e)}var eh=450,Lr=8;function Se(){let t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function th(t){let e=Hu(t,"target-min");return e>0?e:44}function nh(t){if(!(t instanceof HTMLElement))return;let e=[...t.querySelectorAll(".nc-hit")],n=th(t),a=n/2,o=e.map(i=>i.parentElement?.getBoundingClientRect()??null);for(let i=0;i<e.length;i++){let s=e[i],l=o[i];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,u=c-a,p=c+a,h=d-a,m=d+a;for(let b=0;b<e.length;b++){if(i===b)continue;let w=o[b];if(!w||w.width===0)continue;let f=w.left+w.width/2,g=w.top+w.height/2;Math.abs(g-d)<a*2&&(f>c?p=Math.min(p,(c+f)/2):f<c&&(u=Math.max(u,(c+f)/2))),Math.abs(f-c)<a*2&&(g>d?m=Math.min(m,(d+g)/2):g<d&&(h=Math.max(h,(d+g)/2)))}u=Math.min(u,l.left),p=Math.max(p,l.right),h=Math.min(h,l.top),m=Math.max(m,l.bottom),s.style.left=`${u-l.left}px`,s.style.top=`${h-l.top}px`,s.style.width=`${Math.max(0,p-u)}px`,s.style.height=`${Math.max(0,m-h)}px`,s.style.transform="none"}}function wl(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Tr(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function dt(t,e){switch(t.type){case"slider":return ah(t,e);case"select":return ih(t,e);case"toggle":return rh(t,e);case"button":return sh(t,e);case"readout":return lh(t);case"label":return ph(t);case"note":return Cr(t);case"knob":return mh(t,e);case"choice":return gh(t,e);case"slotRow":return bh(t,e);case"stepGrid":return xh(t,e);case"canvas":return Ah(t);case"fx":return Ph(t,e);case"eqGraph":return Ep(t,e);case"group":return Kp(t,e,dt);case"strip":return Sh(t,e);case"stripAdd":return Ch(t,e);case"padGrid":return Vp(t,e);case"moves":return dh(t,e);default:return Cr({id:"unknown",text:""})}}function ve(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){let n=t.querySelector("input"),a=t.querySelector("label");a&&(a.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,kl(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(vl(e))),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));let o=t.querySelector("[data-nc-readout]");o&&(o.textContent=e.valueText??hn(e.value))}else if(e.type==="select"){let n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),Mr(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){let n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")Mr(t,e.text),e.type==="note"&&t instanceof HTMLElement&&(e.tone?t.dataset.ncTone=e.tone:delete t.dataset.ncTone);else if(e.type==="knob"){t instanceof HTMLElement&&Xe(t,e.help);let n=t.querySelector(".nc-knob");n instanceof HTMLElement&&hh(n,e);let a=t.querySelector("[data-nc-readout]");a&&(a.textContent=e.valueText??hn(e.value))}else if(e.type==="choice")$l(t,e);else if(e.type==="slotRow")Al(t,e);else if(e.type==="stepGrid")Eo(t,e);else if(e.type==="padGrid")yl(t,e);else if(e.type==="moves")xl(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){let n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&Js(n,e)}else if(e.type==="eqGraph")tl(t,e);else if(e.type==="strip"){Tl(t,e);for(let n of e.sends??[]){let a=t.querySelector(`[data-nc-id="${Ft(n.id)}"]`);a instanceof Element&&ve(a,{...n,type:"knob",compact:!0})}}else if(e.type==="stripAdd")Ml(t,e);else if(e.type==="group"){gl(t,e);for(let n of e.controls){let a=t.querySelector(`[data-nc-id="${Ft(n.id)}"]`);a instanceof Element&&ve(a,n)}}else if(e.type==="fx"){ql(t,e);for(let n of[...e.controls,...e.more??[]]){let a=t.querySelector(`[data-nc-id="${Ft(n.id)}"]`);a instanceof Element&&ve(a,n)}}}}function ah(t,e){let n=$a(t.id,t.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=t.id;let o=ka(t.taper,t.min,t.max);a.min=String(o?0:t.min),a.max=String(o?1e3:t.max),a.step=String(o?1:t.step),o&&(a.dataset.ncTaper=t.taper),a.value=String(vl(t)),a.disabled=t.disabled===!0,a.dataset.ncId=t.id;let i=l=>o?uo(l.taper??t.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=e(a);l?.type==="slider"&&l.onChange(i(l))}),a.addEventListener("change",()=>{let l=e(a);l?.type==="slider"&&l.onCommit?.(i(l))}),o&&a.addEventListener("keydown",l=>{let c=e(a);if(c?.type!=="slider"||a.disabled)return;let d=c.taper??t.taper,u=Qs(d,c.min,c.max,c.value,l.key,l.shiftKey,c.step);u!==null&&(l.preventDefault(),a.value=String(Qo(d,c.min,c.max,u)),c.onChange(u),c.onCommit?.(u))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),t.onTap&&n.insertBefore(oh(t,a,e),s),n.append(le()),ve(n,t),n}function vl(t){return ka(t.taper,t.min,t.max)?Qo(t.taper,t.min,t.max,t.value):t.value}function oh(t,e,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=t.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),a.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,a.append(Se());let o=i=>{let s=n(e);s?.type==="slider"&&s.onTap?.(i)};return a.addEventListener("pointerdown",i=>{i.button===0&&o(i.timeStamp)}),a.addEventListener("keydown",i=>{i.repeat||i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),o(i.timeStamp))}),a}function ih(t,e){let n=$a(t.id,t.label),a=document.createElement("select");a.className="nc-select",a.id=t.id,a.dataset.ncId=t.id;let o=null;for(let i of t.options){let s=document.createElement("option");s.value=i.value,s.textContent=i.label,i.disabled&&(s.disabled=!0),i.group?o?.getAttribute("label")!==i.group&&(o=document.createElement("optgroup"),o.setAttribute("label",i.group),a.append(o)):o=null,(o??a).append(s)}return a.value=t.value,a.addEventListener("change",()=>{let i=e(a);i?.type==="select"&&i.onChange(a.value)}),n.append(a,le()),n}function rh(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{let a=e(n);a?.type==="toggle"&&a.onPress()}),n.append(le()),ve(n,t),n}function sh(t,e){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{let i=e(n);i?.type==="button"&&i.onPress()}),n.append(le()),ve(n,t),!t.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let o=document.createElement("button");return o.type="button",o.className="nc-sparkle-btn",o.dataset.ncSparkle=t.id,o.setAttribute("aria-label","Surprise me"),o.title=t.sparkleTitle??"Surprise me",o.innerHTML=wl(),o.addEventListener("click",()=>{let i=n.closest(".nc-module")?.querySelector(".nc-slot-row");i instanceof HTMLElement&&Sl(i);let s=e(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,o),a}function lh(t){let e=$a(t.id,t.label);return e.append(le()),ve(e,t),e}var ch=450;function dh(t,e){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Moves");for(let a of t.groups){let o=document.createElement("div");o.className="nc-moves-row",o.setAttribute("role","group"),o.setAttribute("aria-label",a.label),a.title&&(o.title=a.title);let i=document.createElement("span");i.className="nc-moves-label",i.setAttribute("aria-hidden","true"),i.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${a.label} ${l.text}`),c.append(uh(l.icon)),c.addEventListener("click",()=>{let d=e(n);d?.type==="moves"&&d.onMove(l.id)}),s.append(c)}o.append(i,s),n.append(o)}return xl(n,t),n}function xl(t,e){for(let n of e.groups)for(let a of n.moves){let o=t.querySelector(`[data-nc-move="${Ft(a.id)}"]`);o instanceof HTMLButtonElement&&(o.disabled=a.disabled===!0)}}function uh(t){let e="http://www.w3.org/2000/svg",n=document.createElementNS(e,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),t?.stroke){let a=document.createElementNS(e,"path");a.setAttribute("d",t.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(t?.fill){let a=document.createElementNS(e,"path");a.setAttribute("d",t.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function ph(t){let e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(le()),e}function Cr(t){let e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",t.tone&&(e.dataset.ncTone=t.tone),e.textContent=t.text,e.append(le()),e}function Nr(t){if(typeof t.valueText=="string")return t.valueText;let e=hn(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function kl(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function hh(t,e){let n=ta(e.taper,e.min,e.max,e.value);kl(t,e.modulated===!0);let a=Math.round(n*270);if(t.style.setProperty("--knob-turn",String(a)),e.bipolar){let o=typeof e.origin=="number"&&Number.isFinite(e.origin)?Math.round(ta(e.taper,e.min,e.max,e.origin)*270):135;t.style.setProperty("--knob-from",String(Math.min(a,o))),t.style.setProperty("--knob-to",String(Math.max(a,o)))}t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",Nr(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${Nr(e)}`}function fh(t,e){if(ka(t.taper,t.min,t.max))return Qs(t.taper,t.min,t.max,t.value,e.key,e.shiftKey,t.step);let n=t.max-t.min||1,a=typeof t.step=="number"&&t.step>0?t.step:n/100,o=e.shiftKey?a/10:a;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+a*10:e.key==="PageDown"?t.value-a*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+o:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-o:null}function mh(t,e){let n=$a(t.id,t.label);t.compact&&(n.dataset.ncCompact=""),t.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=t.id;let o=document.createElement("i");o.className="nc-knob-mark",a.append(o);let i=0,s=0;a.addEventListener("pointerdown",d=>{i=d.clientY;let u=e(a);s=u&&"value"in u?Number(u.value):0,a.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",d=>{if(a.hasPointerCapture&&!a.hasPointerCapture(d.pointerId))return;let u=e(a);if(u?.type!=="knob")return;if(ka(u.taper,u.min,u.max)){let m=ta(u.taper,u.min,u.max,s)-(d.clientY-i)/120;u.onChange(Xs(u.taper,u.min,u.max,m));return}let p=u.max-u.min||1,h=Math.min(u.max,Math.max(u.min,s-(d.clientY-i)*p/120));u.onChange(h)}),a.addEventListener("dblclick",()=>{let d=e(a);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),a.addEventListener("keydown",d=>{let u=e(a);if(u?.type!=="knob")return;let p=fh(u,d);p!==null&&(d.preventDefault(),u.onChange(Math.min(u.max,Math.max(u.min,p))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(a,c),n.append(le()),ve(n,t),n}function gh(t,e){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(let a of t.options){let o=document.createElement("button");o.type="button",o.className="nc-choice",o.dataset.ncChoice=a.value,o.setAttribute("role","tab"),o.textContent=a.label,o.addEventListener("click",()=>{let i=e(n);i?.type==="choice"&&i.onChange(a.value)}),o.addEventListener("keydown",i=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(o),c=l;if(i.key==="ArrowRight"||i.key==="ArrowDown")c=(l+1)%s.length;else if(i.key==="ArrowLeft"||i.key==="ArrowUp")c=(l-1+s.length)%s.length;else if(i.key==="Home")c=0;else if(i.key==="End")c=s.length-1;else return;let d=s[c];d instanceof HTMLButtonElement&&(i.preventDefault(),d.focus(),d.click())}),n.append(o)}return n.append(le()),$l(n,t),n}function $l(t,e){for(let n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function bh(t,e){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let u=0;u<t.slots.length;u++){let p=t.slots[u],h=document.createElement("span");h.className="nc-snap-wrap";let m=document.createElement("button");m.type="button",m.className="nc-snap",m.dataset.ncSlot=String(u),m.textContent=p.label,m.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",h.append(m,Se()),yh(h,m,n,u,e),a.append(h)}let o=t.onSparkle?document.createElement("button"):null;o&&(o.type="button",o.className="nc-sparkle",o.setAttribute("aria-label","Surprise me"),o.innerHTML=wl(),o.append(Se()),o.addEventListener("click",()=>{Sl(n);let u=e(n);u?.type==="slotRow"&&u.onSparkle?.()}));let i=document.createElement("div");i.className="nc-field nc-morph-field",i.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let u=e(n);u?.type==="slotRow"&&u.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",i.append(s,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(a,...o?[o]:[]),n.append(d,i,le()),El(n,e),Al(n,t),n}function Fr(t,e,n,a){let o=n(t);if(o?.type!=="slotRow")return;tn(t);let i=a.shiftKey?"store":a.altKey?"clear":"recall";o.onSlot(e,i)}function yh(t,e,n,a,o){let i=0,s=0,l=0,c=!1,d=!1,u=!1,p=!1,h=()=>{window.clearTimeout(i),i=0},m=g=>{let y=g.clientX-s,v=g.clientY-l;y*y+v*v>Lr*Lr&&(c=!0,h())},b=()=>{p&&(p=!1,window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",f))},w=g=>{let y=i!==0&&!c&&!d;h(),b(),y&&(u=!0,Fr(n,a,o,g))},f=()=>{c=!0,h(),b()};t.addEventListener("pointerdown",g=>{g.button===0&&(b(),d=!1,c=!1,u=!1,s=g.clientX,l=g.clientY,h(),i=window.setTimeout(()=>{i=0,!c&&(d=!0,wh(n,e,a,o))},eh),p=!0,window.addEventListener("pointermove",m),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",f))}),t.addEventListener("contextmenu",g=>g.preventDefault()),t.addEventListener("click",g=>{if(u||d||c){u=!1,d=!1,c=!1;return}Fr(n,a,o,g)})}function El(t,e){if(t.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=zr("Save","store"),o=zr("Clear","clear");n.append(a,o);let i=document.createElement("div");i.className="nc-slot-scrim",i.hidden=!0,i.setAttribute("aria-hidden","true"),i.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),tn(t)}),i.addEventListener("click",s=>s.stopPropagation()),t.append(i,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let c=e(t);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),tn(t)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),tn(t))}),t.addEventListener("keydown",s=>{s.key==="Escape"&&tn(t)})}function zr(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function wh(t,e,n,a){El(t,a);let o=t.querySelector(".nc-slot-menu");if(!(o instanceof HTMLElement))return;let i=t.querySelector(".nc-slot-scrim");i instanceof HTMLElement&&(i.hidden=!1),o.hidden=!1,o.dataset.ncIndex=String(n);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.bottom-s.top}px`,o.querySelector("button")?.focus()}function tn(t){let e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Al(t,e){for(let o of t.querySelectorAll("[data-nc-slot]")){if(!(o instanceof HTMLButtonElement))continue;let i=Number(o.dataset.ncSlot),s=e.slots[i];if(!s)continue;o.textContent=s.label,s.filled?o.dataset.filled="true":delete o.dataset.filled,s.active?o.dataset.active="true":delete o.dataset.active,s.edited?o.dataset.edited="true":delete o.dataset.edited,s.queued?o.dataset.queued="true":delete o.dataset.queued,s.queued&&s.pulse?o.dataset.pulse="true":delete o.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];o.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));let a=t.querySelector("[data-nc-morph]");a&&(a.textContent=e.morphText)}function Sl(t){let e=t.dataset.ncLastFill||null,n=Tu(e);t.dataset.ncLastFill=n;let a=Cu(n);if(a)for(let[o,i]of Object.entries(a))t.style.setProperty(o,i)}function vh(t,e){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,o=i=>{if(a===i)return;a=i,n.setAttribute("aria-pressed",i?"true":"false");let s=e(t);s?.type==="stepGrid"&&s.onFill?.(i)};n.addEventListener("pointerdown",i=>{i.button===0&&(i.preventDefault(),n.setPointerCapture?.(i.pointerId),o(!0))});for(let i of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(i,()=>o(!1));return n.addEventListener("keydown",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),i.repeat||o(!0))}),n.addEventListener("keyup",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),o(!1))}),n.addEventListener("contextmenu",i=>i.preventDefault()),n}function xh(t,e){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let o=f=>{let g=document.createElement("button");return g.type="button",g.setAttribute("role","radio"),g.textContent=f,a.append(g),g},i=o("Note"),s=o("Accent");s.dataset.ncAccentMode="";let l=f=>{for(let g of[i,s]){let y=g===f;g.setAttribute("aria-checked",y?"true":"false"),g.tabIndex=y?0:-1}};l(i);for(let f of[i,s])f.addEventListener("click",()=>l(f));a.addEventListener("keydown",f=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(f.key))return;f.preventDefault();let g=s.getAttribute("aria-checked")==="true"?i:s;l(g),g.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(a),t.onFill&&c.append(vh(n,e)),t.onClear){let f=document.createElement("button");f.type="button",f.className="nc-fill nc-clear",f.dataset.ncClear="",f.textContent=t.clearLabel??"Clear",f.title="Clear every step (Undo takes it back)",f.addEventListener("click",()=>{let g=e(n);g?.type==="stepGrid"&&g.onClear?.()}),c.append(f)}n.append(c);for(let f of t.rows){let g=document.createElement("div");g.className="nc-row",g.dataset.ncRow="";let y=document.createElement("button");y.type="button",y.className="nc-name",y.textContent=f.label,y.setAttribute("aria-label",`Select ${f.label}`),f.lane&&(y.dataset.ncLane=String((f.lane-1)%4+1));let v=!1,x=0;y.addEventListener("pointerdown",E=>{v=!1,!(E.pointerType==="mouse"||E.button!==0)&&(x=window.setTimeout(()=>{let S=e(n);S?.type!=="stepGrid"||!S.selectedRows||(v=!0,S.onSelectRow?.(S.rows.findIndex(T=>T.id===f.id),!0))},ch))});for(let E of["pointerup","pointercancel","pointerleave"])y.addEventListener(E,()=>window.clearTimeout(x));y.addEventListener("contextmenu",E=>{v&&E.preventDefault()}),y.addEventListener("click",E=>{let S=e(n);if(S?.type!=="stepGrid")return;if(v){v=!1;return}let T=S.rows.findIndex(H=>H.id===f.id),_=!!S.selectedRows&&(E.shiftKey||E.metaKey||E.ctrlKey);S.onSelectRow?.(T,_)}),y.addEventListener("keydown",E=>kh(n,y,E));let k=[];for(let E of["mute","solo"]){if(!(E==="mute"?t.onMute:t.onSolo))continue;let S=document.createElement("span");S.className="nc-ms-wrap";let T=document.createElement("button");T.type="button",T.className="nc-ms",T.dataset.ncMs=E,T.textContent=E==="mute"?"M":"S",T.setAttribute("aria-label",`${E==="mute"?"Mute":"Solo"} ${f.label}`),S.append(T,Se()),S.addEventListener("click",()=>{let _=e(n);if(_?.type!=="stepGrid")return;let H=_.rows.findIndex(ce=>ce.id===f.id);(E==="mute"?_.onMute:_.onSolo)?.(H)}),k.push(S)}let $=document.createElement("div");$.className="nc-steps";for(let E=0;E<f.steps.length;E++){let S=document.createElement("span");S.className="nc-step-wrap";let T=document.createElement("button");T.type="button",T.className="nc-step",T.dataset.ncStep=`${f.id}:${E}`,T.setAttribute("aria-label",`${f.label} step ${E+1}`),S.append(T,Se()),S.addEventListener("click",_=>{let H=e(n);if(H?.type!=="stepGrid")return;let ce=H.rows.findIndex(Oe=>Oe.id===f.id),D=s.getAttribute("aria-checked")==="true";H.onToggle(ce,E,_.shiftKey||D)}),$.append(S)}if(t.onLength&&$.append($h(n,$,f,e)),g.append(...k,y,$),t.onDice){let E=document.createElement("button");E.type="button",E.className="nc-sparkle nc-row-dice",E.dataset.ncDice=f.id,E.setAttribute("aria-label",`Re-roll ${f.label}`),E.title=`Re-roll ${f.label}: new steps for this lane (Undo takes it back)`,E.innerHTML=Tr(),E.append(Se()),E.addEventListener("click",()=>{let S=e(n);S?.type==="stepGrid"&&S.onDice?.(S.rows.findIndex(T=>T.id===f.id))}),g.append(E)}g.addEventListener("click",E=>{if(E.target!==g)return;let S=e(n);S?.type==="stepGrid"&&S.onSelectRow?.(S.rows.findIndex(T=>T.id===f.id))}),Pr(n,$,".nc-step-wrap",e,s,()=>f.id),n.append(g)}let d=document.createElement("div");d.className="nc-pads-head";let u=(f,g,y)=>{let v=document.createElement("button");return v.type="button",v.className=f,v.textContent=g,y&&v.setAttribute("aria-label",y),v},p=u("nc-pads-step","‹","Previous lane"),h=u("nc-pads-step","›","Next lane"),m=document.createElement(t.onLength?"button":"span");m.className="nc-pads-label",m.setAttribute("aria-live","polite"),t.onLength&&(m.type="button",m.dataset.ncLenToggle="",m.addEventListener("click",()=>{let f=e(n);f?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Eo(n,f))}));for(let[f,g]of[[p,-1],[h,1]])f.addEventListener("click",()=>{let y=e(n);if(y?.type!=="stepGrid"||y.rows.length===0)return;let v=y.rows.length;y.onSelectRow?.(((zn(y)+g)%v+v)%v)});if(d.append(p,m,h),t.onDice){let f=u("nc-pads-step nc-pads-dice","","Re-roll lane");f.dataset.ncPadsDice="",f.innerHTML=Tr(),f.addEventListener("click",()=>{let g=e(n);if(g?.type!=="stepGrid")return;let y=zn(g);y>=0&&g.onDice?.(y)}),d.append(f)}if(t.transport){let f=u("nc-pads-play","Play");f.dataset.ncPadsPlay="",f.addEventListener("click",()=>{let g=e(n);g?.type==="stepGrid"&&g.transport?.onToggle()}),d.append(f)}n.append(d);let b=document.createElement("div");b.className="nc-pads",b.setAttribute("role","group");let w=Math.max(0,...t.rows.map(f=>f.steps.length));for(let f=0;f<w;f++){let g=document.createElement("button");g.type="button",g.className="nc-pad",g.dataset.ncPad=String(f),g.textContent=String(f+1),g.addEventListener("click",y=>{let v=e(n);if(v?.type!=="stepGrid")return;let x=zn(v);if(x<0)return;if(n.dataset.ncLenMode==="true"){v.onLength?.(x,f+1);return}let k=s.getAttribute("aria-checked")==="true";v.onToggle(x,f,y.shiftKey||k)}),b.append(g)}return Pr(n,b,".nc-pad",e,s,()=>{let f=e(n);return f?.type==="stepGrid"?f.rows[zn(f)]?.id:void 0}),n.append(b),n.append(le()),Eo(n,t),n}function zn(t){let e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function Pr(t,e,n,a,o,i){let s="on",l=!0,c=-1,d=(u,p)=>{let h=u.rows[c]?.steps[p];!h||p>=u.rows[c].length||(u.onSet?u.onSet(c,p,s,l):!!h[s]!==l&&u.onToggle(c,p,s==="accent"))};Up(e,n,u=>{let p=a(t);if(p?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(u.kind!=="paint")return;let h=p.rows.findIndex(m=>m.id===i());h>=0&&p.rows[h].length!==u.pad+1&&p.onLength?.(h,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){let h=i();c=p.rows.findIndex(b=>b.id===h);let m=p.rows[c]?.steps[u.pad];if(!m)return;s=o.getAttribute("aria-checked")==="true"?"accent":"on",l=!m[s]}d(p,u.pad)}else if(u.kind==="long"){let h=i(),m=p.rows.findIndex(w=>w.id===h),b=e.querySelectorAll(n)[u.pad];m>=0&&b instanceof HTMLElement&&p.onLongPress?.(m,u.pad,b)}}})}function kh(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...t.querySelectorAll(".nc-name")],o=a.indexOf(e),i=o;n.key==="ArrowDown"?i=o+1:n.key==="ArrowUp"?i=o-1:n.key==="Home"?i=0:i=a.length-1;let s=a[i];!(s instanceof HTMLElement)||s===e||(n.preventDefault(),s.focus(),s.click())}function $h(t,e,n,a){let o=document.createElement("button");o.type="button",o.className="nc-len-handle",o.dataset.ncLen=n.id,o.setAttribute("role","slider"),o.setAttribute("aria-valuemin","1"),o.setAttribute("aria-valuemax",String(n.steps.length)),o.append(Se());let i=d=>{let u=a(t);if(u?.type!=="stepGrid")return;let p=u.rows.findIndex(b=>b.id===n.id),h=u.rows[p];if(!h)return;let m=Math.max(1,Math.min(h.steps.length,d));m!==h.length&&u.onLength?.(p,m)},s=d=>{let u=[...e.querySelectorAll(".nc-step")],p=1;return u.forEach((h,m)=>{let b=h.getBoundingClientRect();b.width>0&&d>=b.left+b.width/2&&(p=m+1)}),p},l=d=>i(s(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete o.dataset.dragging};return o.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),o.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),o.addEventListener("keydown",d=>{let u=a(t);if(u?.type!=="stepGrid")return;let p=u.rows.find(m=>m.id===n.id);if(!p)return;let h={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};d.key in h&&(d.preventDefault(),i(h[d.key]))}),o}var Wa=new WeakMap,Pn=new WeakMap;function Eh(t){return t?(Pn.has(t)||(Pn.set(t,co(t)),js(e=>{Pn.set(t,e);for(let n of t.querySelectorAll("[data-nc-velocity]"))$o(n,Number(n.getAttribute("data-nc-velocity")))},t)),Pn.get(t)):"light"}function $o(t,e){let n=typeof e=="number"&&Number.isFinite(e)?e:null,a=n===null?null:Eh(t.ownerDocument),o=n===null?null:`${a} ${n}`;if(!(Wa.has(t)&&Wa.get(t)===o)){if(Wa.set(t,o),n===null){for(let i of Object.keys(ur(1)))t.style.removeProperty(i);t.removeAttribute("data-nc-velocity");return}t.setAttribute("data-nc-velocity",String(n));for(let[i,s]of Object.entries(ur(n,dr[a]??dr.light)))t.style.setProperty(i,s)}}function Eo(t,e){let n=e.rows.some(u=>u.solo),a=t.querySelector("[data-nc-clear]");a&&a.textContent!==(e.clearLabel??"Clear")&&(a.textContent=e.clearLabel??"Clear");let o=t.querySelector(".nc-pads"),i=e.rows.find(u=>u.id===e.selectedRow)??e.rows[0],s=t.querySelector(".nc-pads-label"),l=t.dataset.ncLenMode==="true"&&!!e.onLength;s instanceof HTMLElement&&i&&(s.textContent=l?`${i.label} · ${i.length}`:i.label,e.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${i.label} length ${i.length} steps: tap or drag the pads to set the end, tap here when done`:`${i.label}, ${i.length} steps: tap to set the length`)));let c=t.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&i&&(c.setAttribute("aria-label",`Re-roll ${i.label}`),c.title=`Re-roll ${i.label}: new steps for this lane (Undo takes it back)`);let d=t.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let u=!!e.transport?.playing,p=e.transport?.label??(u?"Stop":"Play");d.textContent!==p&&(d.textContent=p),d.setAttribute("aria-pressed",u?"true":"false");let h=e.transport?.ariaLabel;h?d.setAttribute("aria-label",h):d.removeAttribute("aria-label")}if(o instanceof HTMLElement&&i){o.setAttribute("aria-label",`${i.label} steps`),i.lane&&(o.dataset.ncLane=String((i.lane-1)%4+1)),i.mute||n&&!i.solo?o.dataset.silent="true":delete o.dataset.silent;let u=i.length>0?(e.playhead%i.length+i.length)%i.length:-1;for(let p of o.querySelectorAll("[data-nc-pad]")){let h=Number(p.getAttribute("data-nc-pad")),m=i.steps[h];p instanceof HTMLButtonElement&&(p.hidden=!m||!l&&h>=i.length,l&&h>=i.length?p.dataset.out="true":delete p.dataset.out,l&&h===i.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${i.label} step ${h+1}`),p.setAttribute("aria-pressed",m?.on?"true":"false"),m?.accent?p.dataset.accent="true":delete p.dataset.accent,m?.dim?p.dataset.dim="true":delete p.dataset.dim,$o(p,m?.velocity),e.playhead>=0&&h===u?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let u of e.rows){for(let m=0;m<u.steps.length;m++){let b=u.steps[m],w=t.querySelector(`[data-nc-step="${u.id}:${m}"]`);if(!(w instanceof HTMLButtonElement))continue;let f=w.closest(".nc-row");if(f instanceof HTMLElement){e.selectedRow===u.id?f.dataset.selected="true":delete f.dataset.selected;let v=e.selectedRow!==u.id&&(e.selectedRows??[]).includes(u.id);v?f.dataset.picked="true":delete f.dataset.picked;let x=f.querySelector(".nc-name");x instanceof HTMLElement&&(x.setAttribute("aria-pressed",e.selectedRow===u.id||v?"true":"false"),x.textContent!==u.label&&(x.textContent=u.label,x.setAttribute("aria-label",`Select ${u.label}`))),u.mute||n&&!u.solo?f.dataset.silent="true":delete f.dataset.silent;for(let k of f.querySelectorAll("[data-nc-ms]")){let $=k.getAttribute("data-nc-ms")==="mute"?u.mute:u.solo;k.setAttribute("aria-pressed",$?"true":"false")}}w.setAttribute("aria-pressed",b.on?"true":"false"),b.accent?w.dataset.accent="true":delete w.dataset.accent,b.dim?w.dataset.dim="true":delete w.dataset.dim,m%4===0?w.dataset.bar="true":delete w.dataset.bar,typeof b.velocity=="number"?(w.dataset.velocity="true",w.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,b.velocity))*100)}%`)):(delete w.dataset.velocity,w.style.removeProperty("--level")),$o(w,b.velocity);let g=e.playhead>=0&&u.length>0?(e.playhead%u.length+u.length)%u.length:-1;m===g?w.dataset.playhead="true":delete w.dataset.playhead;let y=!!e.onLength&&e.selectedRow===u.id;w.hidden=m>=u.length&&!y,m>=u.length&&y?w.dataset.out="true":delete w.dataset.out}let p=t.querySelector(`[data-nc-len="${u.id}"]`),h=t.querySelector(`[data-nc-step="${u.id}:${Math.max(0,u.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&h&&h.nextElementSibling!==p){let m=document.activeElement===p;h.after(p),m&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(u.length)),p.setAttribute("aria-label",`${u.label} length, ${u.length} steps`),p.title=`${u.label}: drag to set the length (${u.length} steps)`)}}function Ah(t){let e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;let n=document.createElement("span");n.className="nc-label",n.textContent=t.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=t.id,a.dataset.ncPaint=t.paint,e.append(n,a,le()),e}function Sh(t,e){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let o=document.createElement("span");o.className="nc-strip-name",o.dataset.ncStripName="";let i=!t.master&&typeof t.onFold=="function",s=null;i&&(n.dataset.ncFoldable="",s=zl(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let v=e(n);v?.type==="strip"&&(v.onFold?.(v.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(o);let l=null;if(!t.master&&typeof t.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let v=document.createElement("span");v.className="nc-strip-grip-dots",v.setAttribute("aria-hidden","true"),l.append(v),l.addEventListener("keydown",x=>{if(x.key!=="ArrowLeft"&&x.key!=="ArrowRight"||x.ctrlKey||x.metaKey||x.shiftKey)return;let k=e(n);k?.type==="strip"&&(x.preventDefault(),k.onMove?.(x.key==="ArrowLeft"?-1:1))})}if(l&&typeof t.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>Or(n,l,e))),!t.master&&typeof t.onShade=="function"&&a.addEventListener("contextmenu",v=>{v.pointerType==="touch"||v.pointerType==="pen"||v.target instanceof Element&&v.target.closest("input, .nc-strip-remove")||(v.preventDefault(),Or(n,a,e,{x:v.clientX,y:v.clientY}))}),t.onRemove){let v=document.createElement("button");v.type="button",v.className="nc-strip-remove",v.dataset.ncStripRemove="",v.textContent="×",v.addEventListener("click",()=>{let x=e(n);x?.type==="strip"&&x.onRemove?.(v)}),a.append(v)}let c=document.createElement("div");if(c.className="nc-strip-hacks",t.onHacks){let v=document.createElement("span");v.className="nc-hacks-wrap";let x=document.createElement("button");x.type="button",x.className="nc-hacks",x.dataset.ncHacks="",v.append(x,Se()),v.addEventListener("click",()=>{let k=e(n);k?.type==="strip"&&k.onHacks?.()}),c.append(v)}let d=document.createElement("div");if(d.className="nc-strip-ms",t.onSendsView){let v=document.createElement("span");v.className="nc-hacks-wrap nc-sends-view-wrap";let x=document.createElement("button");x.type="button",x.className="nc-hacks nc-sends-view",x.dataset.ncSendsView="",v.append(x,Se()),v.addEventListener("click",()=>{let k=e(n);k?.type==="strip"&&k.onSendsView?.()}),d.append(v)}for(let v of["mute","solo"]){if(!(v==="mute"?t.onMute:t.onSolo))continue;let x=document.createElement("span");x.className="nc-ms-wrap";let k=document.createElement("button");k.type="button",k.className="nc-ms",k.dataset.ncMs=v,k.textContent=v==="mute"?"M":"S",x.append(k,Se()),x.addEventListener("click",()=>{let $=e(n);$?.type==="strip"&&(v==="mute"?$.onMute:$.onSolo)?.()}),d.append(x)}let u=document.createElement("div");u.className="nc-strip-sends";for(let v of t.sends??[])u.append(dt({...v,type:"knob",compact:!0},e));let p=document.createElement("div");p.className="nc-strip-pan",t.pan&&p.append(dt(oi(t),e));let h=document.createElement("div");h.className="nc-strip-body";let m=document.createElement("span");m.className="nc-scale",m.setAttribute("aria-hidden","true");for(let v of t.ticks??[]){let x=document.createElement("span");x.className="nc-scale-tick",x.style.setProperty("--tick-pos",String(v.value)),x.textContent=v.label,m.append(x)}let b=Qu({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:v=>{let x=e(n);x?.type==="strip"&&x.onChange(v)},onReset:()=>{let v=e(n);v?.type==="strip"&&Br(v)}}),w=ap({channels:t.channels===2?2:1,label:t.label,onClear:()=>{let v=e(n);v?.type==="strip"&&v.onClipClear?.()}});if(h.append(m,b.el,w.el),i){let v=document.createElement("button");v.type="button",v.className="nc-ui-fx-fold nc-strip-fold",v.dataset.ncStripFold="",v.setAttribute("aria-expanded","false");let x=document.createElement("span");x.className="nc-strip-fold-cap",x.setAttribute("aria-hidden","true");let k=document.createElement("span");k.className="nc-ui-fx-fold-name",k.dataset.ncStripFoldName="";let $=document.createElement("span");$.className="nc-strip-fold-pan",$.setAttribute("aria-hidden","true"),$.hidden=!t.pan,v.append(x,$,k),v.addEventListener("click",()=>{let E=e(n);if(E?.type!=="strip")return;E.onFold?.(!1);let S=n.querySelector("[data-nc-strip-hide]");S instanceof HTMLElement&&S.focus()}),h.prepend(v)}let f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let g=0;f.addEventListener("click",v=>{let x=e(n);x?.type!=="strip"||!x.onTypeIn||(window.clearTimeout(g),v.detail===0?Dr(n,f,e):v.detail===1&&(g=window.setTimeout(()=>Dr(n,f,e),Th)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(g);let v=e(n);v?.type==="strip"&&Br(v)});let y=document.createElement("div");return y.className="nc-strip-trim",t.trim&&y.append(dt(ii(t),e)),s&&n.append(s),l&&n.append(l),n.append(a,y,c,d,u,p,h,f,le()),Tl(n,t),n}function oi(t){let e=t.pan;return{type:"knob",id:e.id,label:e.label??"L R",ariaLabel:e.ariaLabel??`${t.label} pan`,min:-1,max:1,step:e.step??.05,value:e.value,valueText:e.valueText??Lh(e.value),defaultValue:0,compact:!0,bipolar:!0,help:e.help,onChange:n=>e.onChange(n)}}function ii(t){let e=t.trim,n=e.min??-12,a=e.max??24;return{type:"knob",id:e.id,label:e.label??"Trim",ariaLabel:e.ariaLabel??`${t.label} trim`,min:n,max:a,step:e.step??.5,value:e.value,valueText:e.valueText??Mh(e.value),defaultValue:e.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:e.help,onChange:o=>e.onChange(o)}}function Mh(t){let e=Math.round((Number(t)||0)*10)/10;if(e===0)return"0 dB";let n=Number.isInteger(e)?String(Math.abs(e)):Math.abs(e).toFixed(1);return`${e>0?"+":"−"}${n} dB`}function Lh(t){let e=Math.round(Math.min(1,Math.max(-1,t))*100);return e===0?"C":e<0?`L ${-e}`:`R ${e}`}var Th=250;function Dr(t,e,n){let a=n(t);if(a?.type!=="strip"||!a.onTypeIn||t.querySelector(".nc-strip-db-input"))return;let o=document.createElement("input");o.type="text",o.className="nc-strip-db-input",o.inputMode="decimal",o.spellcheck=!1,o.autocomplete="off",o.value=a.valueText??hn(a.value),o.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(o),o.focus(),o.select?.();let i=!1,s=l=>{if(i)return;i=!0;let c=o.value;if(o.remove(),e.hidden=!1,l){let d=n(t);d?.type==="strip"&&d.onTypeIn?.(c)}e.focus?.()};o.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),o.addEventListener("blur",()=>s(!1))}function Ch(t,e){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-strip-add-plus",o.textContent="+";let i=document.createElement("span");i.className="nc-strip-add-label",a.append(o,i);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=e(n),c=s.value;Ll(s),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(a,s,le()),Ml(n,t),n}function Ml(t,e){let n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);let a=t.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",e.ariaLabel??e.label);let o=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],i=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=o.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");i!==s&&(a.replaceChildren(...o.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),Ll(a))}function Ll(t){let e=t.options[0];e&&(e.selected=!0)}function Br(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function Tl(t,e){let n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);let a=t.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${e.label}`),a.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label),t.toggleAttribute("data-nc-sends-hidden",e.sendsHidden===!0);let o=t.querySelector(".nc-fader"),i=o?Ju(o):void 0;i&&(i.configure({step:e.step}),i.set(e.value),i.setText(e.valueText),i.setLabel(`${e.label} level`)),op(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);let s=t.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let b=e.valueText??hn(e.value);s.textContent!==b&&(s.textContent=b),s.setAttribute("aria-label",`${e.label} level ${b}`);let w=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";s.title=e.onTypeIn?`Click to type a value. ${w}`:w}for(let b of t.querySelectorAll("[data-nc-ms]")){let w=b.getAttribute("data-nc-ms"),f=w==="mute"?e.mute===!0:e.solo===!0;b.setAttribute("aria-pressed",f?"true":"false"),b.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${e.label}`)}let l=t.querySelector("[data-nc-hacks]");if(l){let b=e.hacksLabel??"Hacks";l.textContent!==b&&(l.textContent=b),l.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${b}: ${e.label}`),l.toggleAttribute("data-nc-empty",e.hacksEmpty===!0)}let c=t.querySelector("[data-nc-sends-view]");if(c){let b=e.sendsViewLabel??"Sends";c.textContent!==b&&(c.textContent=b),c.setAttribute("aria-pressed",e.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${b}: ${e.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",e.sendsViewEmpty===!0),Xe(c,e.sendsViewHelp)}let d=t.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${e.label}`),d.title=e.moveHelp??"Drag to move this channel");let u=Cl(e);if(u?t.dataset.ncShade=String(u):delete t.dataset.ncShade,e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity,(e.trim||e.trimRow)&&!e.trimHidden?t.dataset.ncTrim="":delete t.dataset.ncTrim,e.trim){let b=t.querySelector(`.nc-strip-trim [data-nc-id="${Ft(e.trim.id)}"]`);b&&ve(b,ii(e))}if(e.pan){t.style.setProperty("--nc-strip-pan",String(e.pan.value));let b=t.querySelector(`.nc-strip-pan [data-nc-id="${Ft(e.pan.id)}"]`);b&&ve(b,oi(e))}let p=!e.master&&typeof e.onFold=="function"&&e.folded===!0;p?t.dataset.ncFolded="true":delete t.dataset.ncFolded;let h=t.querySelector("[data-nc-strip-hide]");h instanceof HTMLElement&&(Pl(h,p,e.label),Xe(h,e.foldHelp));let m=t.querySelector("[data-nc-strip-fold]");if(m instanceof HTMLElement){m.hidden=!p,m.setAttribute("aria-label",`Expand ${e.label}`);let b=m.querySelector("[data-nc-strip-fold-name]");b&&b.textContent!==e.label&&(b.textContent=e.label),Xe(m,e.foldedHelp??e.foldHelp)}}function Cl(t){let e=t?.shade;return!t?.master&&Number.isInteger(e)&&e>=1&&e<=Nl?e:0}var Nl=8,Dn=null;function Or(t,e,n,a){Dn?.();let o=n(t);if(o?.type!=="strip")return null;let i=t.ownerDocument,s=i.defaultView??globalThis,l=i.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${o.label}: shade and place`);let c=i.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(o.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=i.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let u=Cl(o),p=t.querySelector("[data-nc-strip-grip]")??e,h=(g=!1)=>{if(Dn!==h)return;Dn=null;let y=l.contains(i.activeElement);l.remove(),i.removeEventListener("keydown",b,!0),i.removeEventListener("pointerdown",w,!0),s.removeEventListener("resize",f),(g||y)&&p?.isConnected&&p.focus?.({preventScroll:!0})},m=[0,...Array.from({length:Nl},(g,y)=>y+1)].map(g=>{let y=i.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.setAttribute("aria-checked",g===u?"true":"false"),y.setAttribute("tabindex",g===u?"0":"-1"),y.dataset.ncShadeChoice=String(g),g===0?(y.textContent="Auto",y.setAttribute("aria-label","Auto: alternate light and dark"),y.title="Auto: alternate light and dark"):(y.textContent=String(g),y.setAttribute("aria-label",`Shade ${g}`),y.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${g})`)),y.addEventListener("click",()=>{let v=n(t);h(!0),v?.type==="strip"&&v.onShade?.(g===0?null:g)}),y});if(d.append(...m),d.addEventListener("keydown",g=>{let y=m.indexOf(i.activeElement);if(y<0)return;let v=-1;g.key==="ArrowRight"||g.key==="ArrowDown"?v=(y+1)%m.length:g.key==="ArrowLeft"||g.key==="ArrowUp"?v=(y-1+m.length)%m.length:g.key==="Home"?v=0:g.key==="End"&&(v=m.length-1),!(v<0)&&(g.preventDefault(),m[y].setAttribute("tabindex","-1"),m[v].setAttribute("tabindex","0"),m[v].focus())}),l.append(c,d),typeof o.onMove=="function"){let g=[...t.parentElement?.children??[]].filter(v=>v.classList?.contains("nc-strip")&&!v.hasAttribute("data-nc-master")),y=g.indexOf(t);for(let[v,x,k]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let $=i.createElement("button");$.type="button",$.className="nc-strip-menu-item",$.dataset.ncStripMove=v<0?"left":"right";let E=i.createElement("span");E.textContent=x;let S=i.createElement("kbd");S.textContent=k,S.setAttribute("aria-hidden","true"),$.append(E,S),$.disabled=v<0?y<=0:y<0||y>=g.length-1,$.addEventListener("click",()=>{let T=n(t);h(!0),T?.type==="strip"&&T.onMove?.(v)}),l.append($)}}i.body.append(l),(()=>{let g=e.getBoundingClientRect?.()??{bottom:0,right:0},y=l.offsetWidth,v=l.offsetHeight,x=s.innerWidth||i.documentElement.clientWidth||y,k=s.innerHeight||i.documentElement.clientHeight||v,$=a?a.x:g.right-y,E=a?a.y:g.bottom+4;$=Math.max(4,Math.min($,x-y-4)),E+v>k-4&&(E=Math.max(4,(a?a.y:g.top)-v-4)),l.style.left=`${Math.round($)}px`,l.style.top=`${Math.round(E)}px`})();let b=g=>{if(g.key==="Escape")g.preventDefault(),g.stopPropagation(),h(!0);else if(g.key==="Tab"&&l.contains(i.activeElement)){let y=[...l.querySelectorAll("button:not([disabled])")].filter(x=>x.getAttribute("tabindex")!=="-1"),v=(y.indexOf(i.activeElement)+(g.shiftKey?-1:1)+y.length)%y.length;g.preventDefault(),y[v]?.focus()}},w=g=>{l.contains(g.target)||h(!1)},f=()=>h(!1);return i.addEventListener("keydown",b,!0),i.addEventListener("pointerdown",w,!0),s.addEventListener("resize",f),Dn=h,(m.find(g=>g.getAttribute("tabindex")==="0")??m[0]).focus({preventScroll:!0}),{el:l,close:()=>h(!1)}}var Ao=typeof ResizeObserver=="function"?new ResizeObserver(Nh):null;function Nh(t){for(let e of t){if(!e.target.isConnected){Ao.unobserve(e.target);continue}let n=e.target.parentElement;n?.classList.contains("nc-ui-fx")&&Fh(n)}}function Fh(t){let e=t.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=t.querySelector(":scope > .nc-eq"),a=e instanceof HTMLElement?e.offsetHeight:0,o=n instanceof HTMLElement?n.offsetHeight:0,i=Number.parseFloat(getComputedStyle(t).rowGap)||0;t.style.setProperty("--nc-fx-hd-h",`${a}px`),t.style.setProperty("--nc-fx-pin-h",`${a+o+i}px`)}function zh(t){if(Ao)for(let e of t.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))Ao.observe(e)}function Ph(t,e){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${t.id}-name`,a.textContent=t.title;let o=typeof t.onFold=="function",i=!!t.meter,s=typeof t.onRemove=="function";if(t.on===void 0&&!o&&!oa(t)&&!i&&!s)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),i&&l.append(Bl(n,"head")),t.on!==void 0){let c=Gs({checked:t.on,labelledBy:a.id,onChange:d=>{let u=e(c.el);u?.type==="fx"&&u.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",l.append(c.el)}o&&l.append(Bh(n,e)),oa(t)&&l.append(Ih(n,e)),s&&l.append(jh(e)),n.append(l)}o&&n.prepend(Oh(n,e)),i&&Ol(n,t);for(let l of t.controls)n.append(dt(l,e));if(t.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let c=document.createElement("summary");c.textContent=t.moreLabel??"More",l.append(c);for(let d of t.more)l.append(dt(d,e));n.append(l)}return n.append(le()),ql(n,t),zh(n),n}var Dh=t=>typeof t.getClientRects=="function"?t.getClientRects().length>0:!t.hidden;function Fl(t){let e=t.querySelector(":scope > [data-nc-fx-fold]"),n=t.querySelector("[data-nc-fx-hide]"),a=t.dataset.ncFolded==="true"&&e&&Dh(e)?e:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function Bh(t,e){let n=zl();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=e(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),Fl(t))}),n}function zl(){let t=document.createElement("button");t.type="button",t.className="nc-fold-toggle";let e=document.createElement("span");return e.className="nc-fold-tri",e.setAttribute("aria-hidden","true"),t.append(e),t}function Pl(t,e,n){t.setAttribute("aria-expanded",e?"false":"true"),t.setAttribute("aria-label",`${e?"Expand":"Minimize"} ${n}`),t.title=e?"Expand":"Minimize"}function Oh(t,e){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let o=document.createElement("span");o.className="nc-ui-fx-fold-name",o.dataset.ncFxFoldName="";let i=document.createElement("span");return i.className="nc-fold-tri",i.setAttribute("aria-hidden","true"),n.append(i,a,o),t.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Bl(t,"fold")),n.addEventListener("click",()=>{let s=e(n);if(s?.type==="fx"){if(s.folded!==!0){let l=t.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),Fl(t)}}),n}var Ot=new Set;function Wn(t,e){let n=t.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(e):setTimeout(e,16)}var oa=t=>t.maximize===!0||t.maximize!==!1&&t.controls.some(e=>e.type==="eqGraph"),qh="(max-width: 768px)";function Rh(){let t=document.createElement("span");t.className="nc-fx-max-icon",t.setAttribute("aria-hidden","true");for(let e=0;e<4;e++)t.append(document.createElement("i"));return t}function Ih(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(Rh()),n.addEventListener("click",()=>{let a=e(n);a?.type==="fx"&&(Dl(t,a,!Ot.has(a.id)),n.focus())}),n}function jh(t){let e=document.createElement("button");return e.type="button",e.className="nc-fx-remove",e.dataset.ncFxRemove="",e.textContent="×",e.addEventListener("click",()=>{let n=t(e);n?.type==="fx"&&n.onRemove?.(e)}),e}function Dl(t,e,n){n?Ot.add(e.id):Ot.delete(e.id),ri(t,e)}function _h(t,e){e?.type==="fx"&&Ot.has(e.id)&&Dl(t,e,!1)}function Hh(t){return t.ownerDocument.defaultView?.matchMedia?.(qh).matches?"tall":t.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function ri(t,e){let n=t.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=oa(e)&&Ot.has(e.id)&&!(typeof e.onFold=="function"&&e.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!oa(e)||typeof e.onFold=="function"&&e.folded===!0,t.hasAttribute("data-nc-maxable")===n.hidden&&(t.toggleAttribute("data-nc-maxable",!n.hidden),Wn(t.ownerDocument,()=>{for(let s of t.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Bt(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${e.title}`),n.title=a?"Restore (Esc)":"Maximize",Xe(n,e.maxHelp)),!a){t.dataset.ncMax&&qr(t);return}if(!t.isConnected){let s=()=>t.isConnected&&Ot.has(e.id)&&ri(t,e);queueMicrotask(()=>{t.isConnected?s():Wn(t.ownerDocument,s)});return}let o=Hh(t),i=[...t.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;i>0&&t.style.setProperty("--nc-fx-dials",String(i)),t.dataset.ncMax!==o&&(t.dataset.ncMax&&qr(t),t.dataset.ncMax=o,o==="over"&&Wh(t,e)),Uh(t.ownerDocument),o==="over"&&si(t),Wn(t.ownerDocument,()=>{for(let s of t.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Bt(s)})}function qr(t){let e=t.dataset.ncMax;delete t.dataset.ncMax,t.style.removeProperty("--nc-fx-dials"),e==="over"&&(t.previousElementSibling?.matches(".nc-fx-ghost")&&t.previousElementSibling.remove(),t.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),t.style.removeProperty("left"),t.style.removeProperty("top"),t.style.removeProperty("width"),t.removeAttribute("role"),t.removeAttribute("aria-label")),Wn(t.ownerDocument,()=>{for(let n of t.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Bt(n)})}function Wh(t,e){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${t.offsetHeight}px`,t.before(n),t.setAttribute("role","region"),t.setAttribute("aria-label",`${e.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${e.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let o=t.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&o.click()}),t.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function si(t){let e=t.previousElementSibling,n=t.closest(".nc-module");if(!(e instanceof HTMLElement)||!e.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,o=t.ownerDocument.defaultView,i=Number.parseFloat(o?.getComputedStyle(a).columnGap??"")||0,s=$p(e.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),i,o?.innerWidth??Number.POSITIVE_INFINITY);t.style.left=`${s.left}px`,t.style.top=`${s.top}px`,t.style.width=`${s.width}px`}var Rr=new WeakSet;function Uh(t){Rr.has(t)||(Rr.add(t),t.addEventListener("keydown",e=>{if(e.key!=="Escape"||e.defaultPrevented)return;let n=[...t.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(o=>o.contains(t.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(e.preventDefault(),a.click())}),t.defaultView?.addEventListener("resize",()=>{for(let e of t.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))e instanceof HTMLElement&&si(e)}))}var So=new WeakMap;function Bl(t,e){let n=Rp(t.ownerDocument);return n.dataset.ncFxLevel=e,n}function Ol(t,e){let n=[...t.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let o of n)Xe(o,e.meterHelp);let a=So.get(t);a?a.set(e.meter):So.set(t,Hp(n,e.meter))}function ql(t,e){(e.meter||So.has(t))&&Ol(t,e);let n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);let a=t.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim;let o=typeof e.onFold=="function"&&e.folded===!0;o?t.dataset.ncFolded="true":delete t.dataset.ncFolded,e.foldSlim===!0?t.dataset.ncFoldSlim="":delete t.dataset.ncFoldSlim;let i=t.querySelector("[data-nc-fx-hide]");i instanceof HTMLElement&&(Pl(i,o,e.title),Xe(i,e.foldHelp)),ri(t,e);let s=t.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let c=e.removeLabel??`Remove ${e.title}`;s.hidden=o,s.setAttribute("aria-label",c),s.title=c}let l=t.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let c=e.on===void 0?"":e.on?"On":"Off";l.hidden=!o,l.setAttribute("aria-label",`Expand ${e.title}${c?`, ${c.toLowerCase()}`:""}`),l.dataset.on=e.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let u=l.querySelector("[data-nc-fx-fold-name]");u&&(u.textContent=e.title),Xe(l,e.foldHelp)}}function Xe(t,e){e?t.setAttribute("data-nc-help",e):t.removeAttribute("data-nc-help")}function Ft(t){return t.replace(/["\\]/g,"\\$&")}function Gh(t,e){for(let n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=e.find(o=>o.type==="canvas"&&o.id===n.dataset.ncId);a?.type==="canvas"&&Js(n,a)}for(let n of t.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Bt(n);for(let n of t.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&si(n);nh(t)}var Yh=Ye["toast-duration"];function Kh({message:t,actionLabel:e}){return e?`${t}, ${e}`:String(t)}function Xh(t,e,n,a){let o=l=>({top:l,bottom:l+n}),i=l=>t.some(c=>c&&c.bottom>l.top&&c.top<l.bottom),s=o(e-a-n);return i(s)?i(o(a))?"bottom":"top":"bottom"}function Vh(t,e,n,a,o,i){let s=t.bottom+o,l=Math.max(i,Math.min(t.left,a-i-n.width));for(let c=!0,d=0;c&&d<8;d++){c=!1;for(let u of e)u&&u.bottom>s&&u.top<s+n.height&&u.right>l&&u.left<l+n.width&&(s=u.bottom+o,c=!0)}return{top:s,left:l}}var Ir="data-nc-ui-toast-live";function Qh(t,e){let n=e.querySelector(`[${Ir}]`);return n||(n=t.createElement("div"),n.setAttribute(Ir,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",e.appendChild(n)),n}function Jh({message:t,actionLabel:e,onAction:n,duration:a=Yh,onClose:o,avoid:i=[],anchor:s,host:l,document:c=globalThis.document}={}){l=l??c.body;let d=c.defaultView??globalThis,u=c.createElement("div");u.className="nc-ui-toast",u.setAttribute("data-state","enter");let p=c.createElement("span");p.className="nc-ui-toast-message",p.textContent=t,u.appendChild(p);let h=null;e&&(h=c.createElement("button"),h.type="button",h.className="nc-ui-toast-action",h.textContent=e,u.appendChild(h)),l.appendChild(u);let m="open",b=ie=>ie&&typeof ie.getBoundingClientRect=="function"?ie.getBoundingClientRect():null,w=b(u),f=w?.height||44,g=d.getComputedStyle?.(u),y=Number.parseFloat(g?.getPropertyValue(W("toast-offset")))||16,v=Number.parseFloat(g?.getPropertyValue(W("toast-anchor-gap")))||8,x=b(s),k=d.innerHeight??0,$=i.map(b).filter(Boolean),E=x&&x.bottom>0&&x.top<k?Vh(x,$,{width:w?.width||0,height:f},d.innerWidth??0,v,y):null;E&&E.top+f<=k?(u.setAttribute("data-placement","anchor"),u.style.top=`${E.top+(d.scrollY??0)}px`,u.style.left=`${E.left+(d.scrollX??0)}px`):u.setAttribute("data-placement",Xh($,k,f,y));let S=d.requestAnimationFrame?.bind(d)??(ie=>setTimeout(ie,16));S(()=>S(()=>{m==="open"&&u.setAttribute("data-state","open")})),Qh(c,l).textContent=Kh({message:t,actionLabel:e});let T,_,H=new Promise(ie=>{_=ie}),ce=ie=>{clearTimeout(T),T=setTimeout(()=>vt("timeout"),ie)},D=a,Oe=Date.now(),Gt=()=>{m==="open"&&(clearTimeout(T),D=Math.max(0,D-(Date.now()-Oe)))},Yt=()=>{m==="open"&&(Oe=Date.now(),ce(D))};u.addEventListener("pointerenter",Gt),u.addEventListener("pointerleave",Yt),u.addEventListener("focusin",Gt),u.addEventListener("focusout",Yt),h?.addEventListener("click",()=>{if(m==="open")try{n?.()}finally{vt("action")}}),Number.isFinite(a)&&ce(a);function vt(ie="close"){if(m!=="open")return;m="closing",clearTimeout(T),u.setAttribute("data-state","closing"),o?.(ie);let Ln=d.getComputedStyle?.(u),qe=Ln?Math.max(0,...String(Ln.transitionDuration||"").split(",").map(re=>Number.parseFloat(re)*(re.trim().endsWith("ms")?1:1e3)||0)):0,q=()=>{m!=="gone"&&(m="gone",u.remove(),_(ie))};u.addEventListener("transitionend",q),setTimeout(q,qe+50)}return{el:u,close:vt,closed:H}}var jr="data-nc-help";function Zh(t,e,n,a=0,o=6,i=8){let s=t.top-o-e.height,l=s>=a+i?"above":"below",c=l==="above"?s:t.bottom+o,d=Math.max(i,Math.min(t.left,n-i-e.width));return{top:Math.round(c),left:Math.round(d),side:l}}var Ua=new WeakMap;function ef(t){let e=parseFloat(t.defaultView?.getComputedStyle(t.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(e)?e:0}function tf({document:t=globalThis.document,delay:e=350}={}){if(!t)return{uninstall(){},hide(){}};let n=Ua.get(t);if(n)return n;let a=t.defaultView,o=null,i=null,s,l=!1,c,d=()=>{clearTimeout(s),clearTimeout(c),i=null,l=!1,o&&(o.hidden=!0,delete o.dataset.pinned)},u=(b,w)=>{let f=w??b.getAttribute(jr);if(!f)return!1;o||(o=t.createElement("div"),o.className="nc-ui-help",o.setAttribute("role","tooltip"),o.dataset.testid="nc-help",o.style.position="fixed",o.style.pointerEvents="none",o.style.zIndex="6",t.body.appendChild(o)),o.textContent=f,o.hidden=!1,o.style.visibility="hidden",o.style.top="0px",o.style.left="0px";let g=b.getBoundingClientRect(),y=Zh(g,{width:o.offsetWidth,height:o.offsetHeight},a.innerWidth,ef(t));return o.style.top=`${y.top}px`,o.style.left=`${y.left}px`,o.dataset.side=y.side,o.style.visibility="",!0},p=b=>{if(l||b.pointerType==="touch")return;let w=b.target&&b.target.closest?b.target.closest(`[${jr}]`):null;w!==i&&(d(),w&&(i=w,s=setTimeout(()=>{i===w&&w.isConnected&&u(w)},e)))},h=b=>{(l||b.key==="Escape")&&d()};t.addEventListener("pointerover",p),t.addEventListener("pointerdown",d,!0),t.addEventListener("keydown",h),a.addEventListener("scroll",d,!0),a.addEventListener("blur",d);let m={hide:d,pin(b,w,{ms:f=0}={}){return d(),!b||!b.isConnected||!u(b,w)?!1:(l=!0,o.dataset.pinned="",f>0&&(c=setTimeout(d,f)),!0)},uninstall(){d(),t.removeEventListener("pointerover",p),t.removeEventListener("pointerdown",d,!0),t.removeEventListener("keydown",h),a.removeEventListener("scroll",d,!0),a.removeEventListener("blur",d),o?.remove(),o=null,Ua.delete(t)}};return Ua.set(t,m),m}var nf="(max-width: 768px)",af='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',of='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',rf=0;function sf({panel:t,button:e,label:n="Menu",media:a=nf}){let o=t.ownerDocument,i=o.defaultView??globalThis;t.classList.add("nc-page-menu"),t.id||(t.id=`nc-page-menu-${++rf}`);let s=e??o.createElement("button");e||(s.type="button",s.innerHTML=af),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",t.id);let l=()=>t.hasAttribute("data-nc-open");function c(){l()||(t.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),o.addEventListener("keydown",u,!0),o.addEventListener("pointerdown",p,!0),[...t.querySelectorAll(of)].find(f=>!f.hidden&&f.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function d({focus:f}={}){if(!l())return;let g=t.contains(o.activeElement);t.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),o.removeEventListener("keydown",u,!0),o.removeEventListener("pointerdown",p,!0),(f??g)&&s.focus?.({preventScroll:!0})}function u(f){f.key==="Escape"&&(f.preventDefault(),f.stopPropagation(),d({focus:!0}))}function p(f){let g=f.target;g instanceof i.Node&&(t.contains(g)||s.contains(g))||d({focus:!1})}let h=()=>l()?d({focus:!0}):c(),m=f=>{let g=f.target,y=g instanceof i.Element?g.closest("button"):null;!y||!t.contains(y)||y.closest("[data-nc-menu-stay]")||d({focus:!0})};s.addEventListener("click",h),t.addEventListener("click",m);let b=i.matchMedia?.(a),w=()=>{b?.matches||d({focus:!1})};return b?.addEventListener?.("change",w),{button:s,panel:t,open:c,close:d,isOpen:l,destroy(){d({focus:!1}),s.removeEventListener("click",h),t.removeEventListener("click",m),b?.removeEventListener?.("change",w)}}}var li="netcomposer.rhythm.hidden.v1",Te=new WeakMap;function Ga(){try{return globalThis.localStorage??null}catch{return null}}function Rl(t,e=li){try{let n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function _r(t,e,n,a=li){let o=Rl(t,a);n?o.add(e):o.delete(e);try{t?.setItem(a,JSON.stringify([...o]))}catch{}}function ci(t){let e=[...t.controls??[],...(t.sections??[]).flatMap(o=>o.controls)],n=[],a=o=>{if(n.push(o),o.type==="group")for(let i of o.controls)a(i)};for(let o of e)a(o),o.type==="fx"&&n.push(...o.controls,...o.more??[]),o.type==="strip"&&(n.push(...(o.sends??[]).map(i=>({...i,type:"knob",compact:!0}))),o.pan&&n.push(oi(o)),o.trim&&n.push(ii(o)));return n}function Il(t,e){if(!(!t||!e))return ci(t).find(n=>n.id===e)}function lf(t){return`${`${t.layout??""}:${(t.sections??[]).map(e=>`${e.id}${e.panel?":panel":""}${e.area?`@${e.area}`:""}`).join(",")}`}#${ci(t).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="moves"?`moves:${e.id}:${e.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:e.type==="padGrid"?`padGrid:${e.id}:${e.pads.length}:${e.columns??2}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:e.type==="strip"?`strip:${e.id}:${e.channels??1}:${e.master?"master":""}:${e.onMute?"m":""}${e.onSolo?"s":""}${e.onRemove?"x":""}${e.onHacks?"h":""}${e.onFold?"f":""}${e.pan?`p=${e.pan.id}`:""}${e.trim?`t=${e.trim.id}`:""}:${(e.sends??[]).map(n=>n.id).join(",")}:${(e.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:e.type==="group"?`group:${e.id}:${e.controls.map(n=>n.id).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.on===void 0?"":"sw"}${e.onFold?":fold":""}${e.onRemove?":x":""}:${e.controls.map(n=>n.id).join(",")}/${(e.more??[]).map(n=>n.id).join(",")}`:`${e.type}:${e.id}`).join("|")}`}function cf(t,e){if(!e.title)return;if(!e.panel){let i=document.createElement("h3");i.className="nc-ui-fx-name",i.textContent=e.title,t.append(i);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=e.title;let o=document.createElement("span");o.className="nc-panel-subject",o.dataset.ncPanelSubject="",n.append(a,o),t.append(n),jl(t,e)}function jl(t,e){if(!e.panel)return;let n=[...t.children].find(i=>i.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),o=n?.querySelector(".nc-panel-subject");a&&(a.textContent=e.title??""),o&&(o.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function df(t){let e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;let n=Te.get(e),a=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Il(n,a)}function uf(t,e,n){let a=e.sections??[{id:"main",controls:e.controls??[]}],o=lf(e);if(t.dataset.ncSignature===o){for(let i of a){let s=t.querySelector(`[data-nc-section="${Wr(i.id)}"]`);s&&jl(s,i);for(let l of i.controls){let c=t.querySelector(`[data-nc-id="${Wr(l.id)}"]`);c instanceof Element&&ve(c,l)}s instanceof HTMLElement&&Mo(s,i,n)}return}t.dataset.ncSignature=o,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(let i of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=i.id,i.inset&&(s.dataset.ncInset="true"),i.area&&(s.dataset.ncArea=i.area),i.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",i.label)),i.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),i.title&&s.setAttribute("aria-label",i.title)),cf(s,i);let l=i.panel?document.createElement("div"):s;i.panel&&(l.className="nc-panel-body",s.append(l));for(let c of i.controls)l.append(dt(c,df));t.append(s),Mo(s,i,n)}}function _l(t,e,n){let a=e>0?Math.max(1,Math.ceil(t/e)):1,o=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,o))}}var pf="(max-width: 768px)",Hl=new WeakMap;function Hr(t){let e=document.createElement("button");e.type="button",e.className="nc-fx-page-btn",e.dataset.ncFxPage=t;let n=t==="prev"?"Previous effects page":"Next effects page";e.setAttribute("aria-label",n),e.title=t==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),e.append(a),e}function hf(t,e){let n=[...t.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let o=Hr("prev"),i=Hr("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(o,s,i,l);let c=(d,u)=>{let p=Hl.get(t);if(!p||u.getAttribute("aria-disabled")==="true")return;let h=t.querySelectorAll(":scope > .nc-ui-fx").length,{page:m}=_l(h,p.pageSize,(e.pages.get(p.id)??0)+d);e.pages.set(p.id,m),p.onPage?.(m),Mo(t,{...p,page:m},e),u.getAttribute("aria-disabled")==="true"&&t.ownerDocument.activeElement===u&&(u===o?i:o).focus(),e.redraw()};return o.addEventListener("click",()=>c(-1,o)),i.addEventListener("click",()=>c(1,i)),t.prepend(a),a}function Mo(t,e,n){Hl.set(t,e);let a=[...t.querySelectorAll(":scope > .nc-ui-fx")],o=e.pageSize??0,{pages:i,page:s}=_l(a.length,o,e.page??n.pages.get(e.id)??0);if(o>0&&n.pages.set(e.id,s),i<=1){for(let f of[...t.children])f.classList.contains("nc-fx-pager")&&f.remove();delete t.dataset.ncPaged;for(let f of a)delete f.dataset.ncOffPage;return}t.dataset.ncPaged="";let l=t.ownerDocument.defaultView?.matchMedia?.(pf).matches===!0,c=t.closest(".nc-module");a.forEach((f,g)=>{let y=Math.floor(g/o)!==s;if(y?f.dataset.ncOffPage="":delete f.dataset.ncOffPage,y&&!l){let v=c instanceof HTMLElement?Te.get(c):void 0;_h(f,Il(v,f.dataset.ncId))}});let d=hf(t,n),u=d.querySelector('[data-nc-fx-page="prev"]'),p=d.querySelector('[data-nc-fx-page="next"]');u.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===i-1?"true":"false");let h=d.querySelector("[data-nc-fx-page-count]"),m=`${s+1} / ${i}`;h.textContent!==m&&(h.textContent=m);let b=d.querySelector("[data-nc-fx-page-live]"),w=`Effects page ${s+1} of ${i}`;b.textContent!==w&&(b.textContent=w)}function Wr(t){return t.replace(/["\\]/g,"\\$&")}function ff(t,e=li){Ws();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");let a=Rl(Ga(),e).has(t.id),o=document.createElement("header");o.className="nc-module-hd",o.dataset.ncRow="";let i=document.createElement("h2");i.className="nc-title",i.id=`${t.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=Gs({labelledBy:i.id,onChange:y=>(Te.get(n)??t).onToggle?.(y)});d.el.dataset.ncModuleSwitch="",s.append(d.el,l,c);let u=document.createElement("span");u.className="nc-snap-msg",u.dataset.ncStatus="",o.append(i,u,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${t.id}-body`;let h=document.createElement("button");h.type="button",h.className="nc-slim";let m=document.createElement("span");m.className="nc-slim-lines",h.append(m);let b=document.createElement("i");b.className="nc-token-probe",b.dataset.ncProbe="",n.append(b,o,p,h),n.setAttribute("aria-labelledby",i.id);let w=y=>{let v=Te.get(n)??t;n.dataset.ncOpen=y?"false":"true",p.hidden=y,h.hidden=!y,l.textContent=y?"+":"−",l.setAttribute("aria-expanded",y?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${y?"Show":"Hide"} ${v.title}`),l.title=y?"Show":"Hide",y?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let y=n.dataset.ncOpen==="true";_r(Ga(),(Te.get(n)??t).id,y,e),w(y),Lo(n.parentElement)}),h.addEventListener("click",()=>{_r(Ga(),(Te.get(n)??t).id,!1,e),w(!1),Lo(n.parentElement)});let f={pages:new Map,redraw:()=>g.redraw()},g={el:n,update(y){Te.set(n,y),y.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,i.textContent=y.title,u.textContent=y.status??"",y.status!==void 0?u.setAttribute("aria-live","polite"):u.removeAttribute("aria-live"),m.textContent=y.summary??y.title,d.el.hidden=y.on===void 0,d.set(y.on===!0),y.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,h.setAttribute("aria-label",`Show ${y.title}`),uf(p,y,f),w(p.hidden),g.redraw()},redraw(){let y=Te.get(n);y&&Gh(n,ci(y))}};return Te.set(n,t),w(a),g.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>g.redraw()).observe(n),js(()=>g.redraw(),n.ownerDocument),g}function mf(t,e,n="adjacent"){Ws(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();let a=n==="stack"?"stack":"adjacent";e.forEach((o,i)=>{let s=i%4+1;o.el.dataset.ncShade=String(s),o.el.dataset.ncPlace=a;let l=o.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),t.append(o.el),o.redraw()}),Lo(t)}function Lo(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}let e=[...t.children].filter(i=>i instanceof HTMLElement&&i.classList.contains("nc-module")),n=e.some(i=>i.hasAttribute("data-nc-lead")),a=e.map(i=>i.hasAttribute("data-nc-slim")?r("module-slim-column"):n?i.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",a.join(" "));let o=e.filter(i=>!i.hasAttribute("data-nc-slim"));n&&e.length===4&&o.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}const gf="https://musicmatter.art/library/library.json",zt="musicmatter.art",bf=["CC0-1.0","CC-BY-4.0","CC-BY-SA-4.0","PDM-1.0"],Wl=6,yf=2,di=["kick","snare","clap","hat","tom","perc","cymbal","fx","tonal"],Ul=["redistributable","personal","unknown"],ia=t=>typeof t=="number"&&Number.isFinite(t)&&t>=40&&t<=250;function Gl(t){const e=t.kind==="loop"?"loop":t.kind==="one-shot"?"one-shot":"";return{kind:e,bpm:e==="loop"&&ia(t.bpm)?t.bpm:0}}const Ue=t=>t&&typeof t=="object"&&!Array.isArray(t)?t:{},j=(t,e=300)=>typeof t=="string"?t.trim().slice(0,e):"",de=(t,e=0)=>typeof t=="number"&&Number.isFinite(t)?t:e,be=t=>{const e=j(t,600);return/^https?:\/\/[^\s"'<>]+$/i.test(e)?e:""},ui=/^[0-9a-f]{64}$/,Yl="0123456789abcdefghijklmnopqrstuvwxyz";function wf(t){const e=Ue(t),n=Array.isArray(e.sounds)?e.sounds:[],a=new Set,o=[];for(const i of n){const s=Ue(i),l=j(s.id,160),c=j(s.role),d=j(s.license,40),u=be(s.audio),p=j(s.sha256,64).toLowerCase(),h=j(s.title,160);if(!l||a.has(l)||!di.includes(c)||!u||!h||!bf.includes(d)||!ui.test(p))continue;a.add(l);const m=Ue(s.measures),b=de(m.gain_db),w=Ue(s.source);o.push({id:l,origin:"shelf",licenseStatus:"",permission:"",role:c,title:h,instrument:h.split(" · ")[0]??h,tags:(Array.isArray(s.tags)?s.tags:[]).filter(f=>typeof f=="string").map(f=>f.toLowerCase().slice(0,40)),license:d,licenseUrl:be(s.license_url)||pi(d),creator:j(s.creator,120)||"Unknown",creatorLink:be(s.creator_link),source:be(w.url),audio:u,manifest:be(s.manifest),sha256:p,measures:{length:de(m.length_s,1),attack:de(m.attack_ms,10),decay:de(m.decay_s,.3),centroid:de(m.centroid_hz,1e3),level:de(m.hit_dbfs,-20)+b,gain:b},wave:typeof s.wave=="string"?Array.from(s.wave.slice(0,96),f=>Math.max(0,Yl.indexOf(f))/35):[],...Gl(s)})}return{name:j(e.name,120)||zt,sounds:o}}function To(t){const e=j(t,400).replace(/\\/g,"/");if(!e||e.startsWith("/")||/^[a-z][a-z0-9+.-]*:/i.test(e)||e.includes("\0"))return"";const n=e.split("/");return n.some(a=>!a||a==="."||a==="..")?"":n.join("/")}const vf="local:";function Kl(t,e){const n=Ue(t),a=Array.isArray(n.sounds)?n.sounds:[],o=new Set,i=[];for(const s of a){const l=Ue(s),c=j(l.id,160),d=`${vf}${c}`,u=j(l.role),p=j(l.license,40)||"unknown",h=To(l.audio),m=j(l.sha256,64).toLowerCase(),b=j(l.title,160);if(!c||o.has(d)||!di.includes(u)||!h||!b||!ui.test(m))continue;o.add(d);const w=Ue(l.measures),f=de(w.gain_db),g=Ue(l.source),y=j(l.license_status,20);i.push({id:d,origin:"local",licenseStatus:Ul.includes(y)?y:"unknown",permission:j(l.permission,300),role:u,title:b,instrument:b.split(" · ")[0]??b,tags:(Array.isArray(l.tags)?l.tags:[]).filter(v=>typeof v=="string").map(v=>v.toLowerCase().slice(0,40)),license:p,licenseUrl:be(l.license_url)||pi(p),creator:j(l.creator,120)||"Unknown",creatorLink:be(l.creator_link),source:be(g.url),audio:`local:${e}/${h}`,manifest:To(l.manifest),sha256:m,measures:{length:de(w.length_s,1),attack:de(w.attack_ms,10),decay:de(w.decay_s,.3),centroid:de(w.centroid_hz,1e3),level:de(w.hit_dbfs,-20)+f,gain:f},wave:typeof l.wave=="string"?Array.from(l.wave.slice(0,96),v=>Math.max(0,Yl.indexOf(v))/35):[],...Gl(l)})}return{name:j(n.name,120)||"Local Library",sounds:i}}function Xl(t){const e=/^local:[^/]+\/(.+)$/.exec(t);return e?To(e[1]):""}function Ur(t,...e){return{name:t,sounds:e.flatMap(n=>n?.sounds??[])}}function pi(t){return t==="CC0-1.0"?"https://creativecommons.org/publicdomain/zero/1.0/":t==="CC-BY-4.0"?"https://creativecommons.org/licenses/by/4.0/":t==="CC-BY-SA-4.0"?"https://creativecommons.org/licenses/by-sa/4.0/":t==="PDM-1.0"?"https://creativecommons.org/publicdomain/mark/1.0/":""}function hi(t,e="",n=""){return t==="CC0-1.0"?"CC0":t==="CC-BY-4.0"?"BY":t==="CC-BY-SA-4.0"?"BY-SA":t==="PDM-1.0"?"PD":t==="Permission-only"||n?"PERM":e==="personal"?"PERS":e==="unknown"||t==="unknown"?"?":t}function Vl(t){return t.origin==="local"&&t.licenseStatus!=="redistributable"}function Ea(t,e=24){const n=t.trim();if(n.length<=e)return n;const[a=n,o=""]=n.split(" · "),i=o.split(/\s+/).at(-1)??"",s=/^(?:v|vl|rr|k)?\d{1,2}$|^(?:p{1,3}|mp|mf|f{1,3})\d*$/i.test(i)?i:"",l=s?`${a} ${s}`:"";return l&&l.length<=e?l:a.length<=e?a:n.slice(0,e).trim()}const Co={kick:"kick",kicks:"kick",bd:"kick",bassdrum:"kick","bass drum":"kick","kick drum":"kick",snare:"snare",snares:"snare",sd:"snare","snare drum":"snare",rimshot:"snare",clap:"clap",claps:"clap",handclap:"clap",handclaps:"clap","hand clap":"clap","hand claps":"clap",hat:"hat",hats:"hat",hihat:"hat",hihats:"hat","hi-hat":"hat","hi-hats":"hat","hi hat":"hat","hi hats":"hat","high hat":"hat",hh:"hat",ch:"hat",oh:"hat",tom:"tom",toms:"tom",tomtom:"tom","floor tom":"tom",perc:"perc",percs:"perc",percussion:"perc",cymbal:"cymbal",cymbals:"cymbal",crash:"cymbal",ride:"cymbal",splash:"cymbal",china:"cymbal",fx:"fx",sfx:"fx",effect:"fx",effects:"fx",tonal:"tonal",melodic:"tonal",pitched:"tonal",bell:"tonal",bells:"tonal",mallet:"tonal",mallets:"tonal",chime:"tonal",chimes:"tonal"},xf={ch:"closed",oh:"open"},Gr={punchy:{wants:[{measure:"attack",dir:-1},{measure:"decay",dir:-1}],tag:"punchy"},tight:{wants:[{measure:"decay",dir:-1}],tag:"tight"},snappy:{wants:[{measure:"decay",dir:-1},{measure:"centroid",dir:1}],tag:"snappy"},short:{wants:[{measure:"length",dir:-1},{measure:"decay",dir:-1}],tag:"short"},dry:{wants:[{measure:"decay",dir:-1}]},long:{wants:[{measure:"length",dir:1},{measure:"decay",dir:1}],tag:"long"},ringing:{wants:[{measure:"decay",dir:1}]},wet:{wants:[{measure:"decay",dir:1}]},big:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}],tag:"boomy"},boomy:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}],tag:"boomy"},fat:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}]},deep:{wants:[{measure:"centroid",dir:-1}],tag:"deep"},dark:{wants:[{measure:"centroid",dir:-1}],tag:"dark"},warm:{wants:[{measure:"centroid",dir:-1}]},low:{wants:[{measure:"centroid",dir:-1}]},muffled:{wants:[{measure:"centroid",dir:-1}]},bright:{wants:[{measure:"centroid",dir:1}],tag:"bright"},crisp:{wants:[{measure:"centroid",dir:1},{measure:"decay",dir:-1}]},sharp:{wants:[{measure:"centroid",dir:1},{measure:"attack",dir:-1}]},high:{wants:[{measure:"centroid",dir:1}]},airy:{wants:[{measure:"centroid",dir:1}]},loud:{wants:[{measure:"level",dir:1}],tag:"hard"},hard:{wants:[{measure:"level",dir:1}],tag:"hard"},heavy:{wants:[{measure:"level",dir:1},{measure:"centroid",dir:-1}]},soft:{wants:[{measure:"level",dir:-1}],tag:"soft"},quiet:{wants:[{measure:"level",dir:-1}],tag:"soft"},gentle:{wants:[{measure:"level",dir:-1}],tag:"soft"},ghost:{wants:[{measure:"level",dir:-1}],tag:"soft"}},No={funk:["tight","punchy"],funky:["tight","punchy"],disco:["tight","bright"],dusty:["dark","soft"],lofi:["dark","soft"],"lo-fi":["dark","soft"],vintage:["dark"],"70s":["dark","tight"],"60s":["dark","soft"],old:["dark"],jazz:["soft","dark"],jazzy:["soft","dark"],rock:["hard","long"],metal:["hard","bright"],hiphop:["punchy","dark"],"hip-hop":["punchy","dark"],"boom bap":["punchy","dark"],boombap:["punchy","dark"],trap:["punchy","short"],techno:["tight","punchy"],house:["tight","punchy"],ambient:["long","soft"],cinematic:["big","long"],epic:["big","loud"]},Ql=new Set(["kit","kits","drumkit","drumkits","drums","set","drum kit"]),kf=new Set("a an the some any with and or of for to me my give find get want need please like sound sounds sample samples one ones really very bit little more less that this".split(" "));function $f(t){const e=t.toLowerCase().replace(/[^a-z0-9\s-]/g," ").split(/\s+/).filter(Boolean),n=[];for(let a=0;a<e.length;a++){const o=`${e[a]} ${e[a+1]??""}`;e[a+1]&&(o in Co||o in No||Ql.has(o))?(n.push(o),a++):n.push(e[a])}return n}function fi(t){return new Set(t.title.toLowerCase().split(/[^a-z0-9]+/).map(e=>e.replace(/\d+$/,"")).filter(e=>e.length>1))}function Fo(t,e){const n={text:t.trim(),roles:[],tags:[],softTags:[],wants:[],kit:!1,kind:"",unknown:[]},a=new Set;if(e)for(const i of e.sounds){for(const s of i.tags)a.add(s);for(const s of fi(i))a.add(s)}const o=i=>{const s=Gr[i];s&&(n.wants.push(...s.wants),s.tag&&!n.softTags.includes(s.tag)&&n.softTags.push(s.tag))};for(const i of $f(t))if(Ql.has(i))n.kit=!0;else if(i in Co){const s=Co[i];n.roles.includes(s)||n.roles.push(s);const l=xf[i];(l==="open"||l==="closed")&&(n.kind=l)}else if(i in Gr)o(i);else if(i in No)for(const s of No[i]??[])o(s);else if(i==="open")n.kind="open";else if(i==="closed"||i==="close")n.kind="closed";else{if(kf.has(i))continue;if(!e||a.has(i)||a.has(i.replace(/s$/,""))){const s=e&&!a.has(i)?i.replace(/s$/,""):i;n.tags.includes(s)||n.tags.push(s)}else n.unknown.push(i)}return n}function Ef(t,e){const n=[...t].sort((i,s)=>i.measures[e]-s.measures[e]),a=new Map,o=Math.max(1,n.length-1);return n.forEach((i,s)=>a.set(i.id,s/o)),a}const Af=[{measure:"level",dir:1,weight:.5},{measure:"length",dir:-1,weight:.2}],Sf=.2,Mf={kick:-1,tom:-1,snare:1,clap:1,hat:1};function mi(t,e){const n=new Set(e.wants.map(s=>s.measure)),a=new Map,o=(s,l)=>{let c=a.get(s);return c||(c=Ef(t,s),a.set(s,c)),c.get(l)??.5},i=(s,l)=>s.reduce((c,d)=>{const u=o(d.measure,l);return c+(d.dir>0?u:1-u)},0)/Math.max(1,s.length);return t.map(s=>{const l=fi(s);let c=0;for(const u of e.tags)c+=s.tags.includes(u)?2:l.has(u)?1:0;e.wants.length&&(c+=2*i(e.wants,s.id));const d=Mf[s.role];for(const u of[...Af,...d?[{measure:"centroid",dir:d,weight:Sf}]:[]])n.has(u.measure)||(c+=2*u.weight*i([u],s.id));for(const u of e.softTags)s.tags.includes(u)&&(c+=.4);return{sound:s,score:c}})}const Yr=(t,e)=>e.score-t.score||t.sound.title.localeCompare(e.sound.title)||t.sound.id.localeCompare(e.sound.id);function ra(t,e,n,a){let o=t.sounds.filter(i=>!a.has(i.id)&&(!e.length||e.includes(i.role)));if(n.length){const i=o.filter(s=>{const l=fi(s);return n.some(c=>s.tags.includes(c)||l.has(c))});i.length&&(o=i)}return o}function gi(t,e){const n=[...t].sort(Yr),a=[],o=new Map;for(const i of n){if(a.length>=e)break;const s=o.get(i.sound.instrument)??0;s>=yf||(o.set(i.sound.instrument,s+1),a.push(i))}for(const i of n){if(a.length>=e)break;a.includes(i)||a.push(i)}return a.sort(Yr)}function Lf(t,e){if(!e)return t;const n=t.filter(a=>a.role==="hat"&&fn(a)===e);return n.length?n:t}function Tf(t,e,n={}){const a=e.kind&&!e.roles.length?["hat"]:e.roles,o=Lf(ra(t,a,e.tags,n.exclude??new Set),e.kind);return gi(mi(o,e),n.limit??Wl)}const Cf=[{key:"kick",label:"Kick",role:"kick",nearest:["tom","perc"]},{key:"snare",label:"Snare",role:"snare",nearest:["clap","perc"]},{key:"clap",label:"Clap",role:"clap",nearest:["snare","perc"]},{key:"closed-hat",label:"Closed hat",role:"hat",tag:"closed",nearest:["perc","cymbal"]},{key:"open-hat",label:"Open hat",role:"hat",tag:"open",nearest:["cymbal","perc"]},{key:"tom",label:"Tom",role:"tom",nearest:["perc","kick"]},{key:"perc",label:"Perc",role:"perc",nearest:["tom","tonal"]},{key:"fx",label:"FX",role:"fx",nearest:["tonal","cymbal","perc"]}];function fn(t){if(t.tags.includes("closed"))return"closed";if(t.tags.includes("open"))return"open";const e=t.title.toLowerCase();return/\bclose[d]?\b|hitc\b/.test(e)?"closed":/\bopen\b|hito\b/.test(e)?"open":""}function Nf(t,e,n,a){const o=ra(t,[e.role],n.tags,a);if(e.tag){const i=o.filter(l=>fn(l)===e.tag);if(i.length)return{list:i,role:e.role,kindMissing:!1};const s=o.filter(l=>fn(l)==="");if(s.length)return{list:s,role:e.role,kindMissing:!0}}else if(o.length)return{list:o,role:e.role,kindMissing:!1};for(const i of e.nearest){const s=ra(t,[i],n.tags,a);if(s.length)return{list:s,role:i,kindMissing:!1}}return{list:[],role:e.role,kindMissing:!1}}const Ff={kick:"a kick",snare:"a snare",clap:"a clap",hat:"a hat",tom:"a tom",perc:"a percussion sound",cymbal:"a cymbal",fx:"an effect",tonal:"a tonal sound"};function Kr(t,e){const n=e.wants.some(i=>i.measure==="level")?e:{...e,wants:[...e.wants,{measure:"level",dir:1}]},a=new Set,o=[];for(const i of Cf){const{list:s,role:l,kindMissing:c}=Nf(t,i,n,a),d=gi(mi(s,n),1)[0];if(!d)continue;a.add(d.sound.id);const u=l!==i.role?`No ${i.label.toLowerCase()} in the Library: ${Ff[l]} instead.`:c?`No ${i.label.toLowerCase()} labelled as one: the nearest hat instead.`:void 0;o.push({slot:i,sound:d.sound,...u?{note:u}:{}})}return o}const bi="your local Library";function yi(t,e){return{id:t.id,title:t.title,role:t.role,creator:t.creator,creatorLink:t.creatorLink,license:t.license,licenseUrl:t.licenseUrl,source:t.source,audio:t.audio,sha256:t.sha256,gainDb:t.measures.gain,curator:t.origin==="local"?bi:zt,query:e.trim().slice(0,120),kind:t.role==="hat"?fn(t):"",origin:t.origin,licenseStatus:t.licenseStatus}}function zf(t){if(!t||typeof t!="object"||Array.isArray(t))return null;const e=t,n=j(e.id,160),a=j(e.title,160),o=j(e.license,40),i=j(e.sha256,64).toLowerCase();if(!n||!a||!o)return null;const s=di.includes(e.role)?e.role:"perc",l=e.kind==="closed"||e.kind==="open"?e.kind:"",c=e.origin==="local"?"local":"shelf",d=j(e.licenseStatus,20),u=c==="local"?Xl(j(e.audio,600))?j(e.audio,600):"":be(e.audio);return{id:n,title:a,role:s,creator:j(e.creator,120)||"Unknown",creatorLink:be(e.creatorLink),license:o,licenseUrl:be(e.licenseUrl)||pi(o),source:be(e.source),audio:u,sha256:ui.test(i)?i:"",gainDb:Math.max(-60,Math.min(60,de(e.gainDb))),curator:j(e.curator,80)||(c==="local"?bi:zt),query:j(e.query,120),kind:l,origin:c,licenseStatus:c==="local"&&Ul.includes(d)?d:c==="local"?"unknown":""}}function Pf(t,e,n=new Set,a=3){const o=Fo(e.query,t),i=new Set([...n,e.id]);let s=ra(t,[e.role],o.tags,i);if(e.role==="hat"&&e.kind){const l=s.filter(c=>fn(c)===e.kind);l.length&&(s=l)}return gi(mi(s,{...o,roles:[e.role]}),a)}function Jl(t){const e=new Map;return t.forEach((n,a)=>{const o=n.provenance;if(!o)return;const i=e.get(o.id);i?i.pads.push(a+1):e.set(o.id,{...o,pads:[a+1]})}),[...e.values()]}function Df(t){return["shelf","local"].map(n=>({origin:n,credits:t.filter(a=>(a.origin??"shelf")===n)})).filter(n=>n.credits.length)}const Bf=-14,Of=-1,Zl=24,qf=.05,Rf=-80,Xr=t=>t>0?20*Math.log10(t):Number.NEGATIVE_INFINITY;function If(t,e){const n=t[0]?.length??0,a=t.length;if(!n||!a)return{hit:Number.NEGATIVE_INFINITY,peak:Number.NEGATIVE_INFINITY};const o=Math.max(1,Math.round(qf*e)),i=new Float64Array(n);let s=0;for(let d=0;d<n;d++){let u=0;for(const p of t){const h=p[d]??0;u+=h;const m=h<0?-h:h;m>s&&(s=m)}u/=a,i[d]=u*u}let l=0,c=0;for(let d=0;d<n;d++)l+=i[d]??0,d>=o&&(l-=i[d-o]??0),l>c&&(c=l);return{hit:Xr(Math.sqrt(Math.max(0,c)/o)),peak:Xr(s)}}function jf(t){if(!Number.isFinite(t.hit)||t.hit<Rf)return 0;let e=Math.min(Bf-t.hit,Zl);Number.isFinite(t.peak)&&(e=Math.min(e,Of-t.peak));const n=Math.round(e*10)/10;return n===0?0:n}function qt(t,e){return{on:!0,gainDb:jf(If(t,e))}}const _f=Object.freeze({on:!0,gainDb:0});function Vr(t){return t.normalize?t.normalize.on:t.provenance!==null}function Hf(t){const e=t.normalize;return e?e.on?e.gainDb:t.provenance?-t.provenance.gainDb:0:0}function Wf(t){const e=Hf(t);return e===0?1:10**(e/20)}function Uf(t){if(!t||typeof t!="object"||Array.isArray(t))return null;const e=t;if(typeof e.on!="boolean")return null;const n=e.gainDb;return typeof n!="number"||!Number.isFinite(n)||n<-60||n>Zl?null:{on:e.on,gainDb:n}}function Gf(t){const e=Math.round(t*10)/10;return e===0?"0.0 dB":`${e>0?"+":"−"}${Math.abs(e).toFixed(1)} dB`}const V=16,te=16,Rt=10,ec=["1","2","3","4","5","6","7","8","9","0"],tc=[0,2,4,8,16],nc=[0,1,2,4,8],sa=["always","1:2","2:2","1:3","2:3","3:3","1:4","2:4","3:4","4:4","1:5","2:5","3:5","4:5","5:5","1:6","2:6","3:6","4:6","5:6","6:6","1:7","2:7","3:7","4:7","5:7","6:7","7:7","1:8","2:8","3:8","4:8","5:8","6:8","7:8","8:8","fill","!fill","pre","!pre"],la={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}};function ke(t){return{name:`Pad ${t+1}`,sample:null,mode:"oneshot",dir:"fwd",start:0,end:1,slices:0,cuts:[],tune:0,fine:0,fit:0,keepPitch:!0,attack:0,decay:4,cutoff:0,resonance:0,level:.8,pan:0,choke:0,provenance:null,normalize:null,offsetDb:0,follow:null,note:0}}function mn(t){return!t.sample||t.fit>0?!1:t.follow??t.provenance?.role==="tonal"}function An(){return{on:!1,accent:!1,velocity:.8,chance:1,slice:null,pitch:0,reverse:!1,cond:"always"}}function Aa(){return{length:te,mute:!1,solo:!1,steps:Array.from({length:te},An)}}function ac(){return{filter:{on:!0,mode:"lp",cutoff:1,resonance:.15},drive:structuredClone(la.drive),compressor:structuredClone(la.compressor)}}function zo(){return{v:1,pads:Array.from({length:V},(t,e)=>ke(e)),lanes:Array.from({length:V},Aa),swing:.5,hacks:ac(),slots:Array.from({length:Rt},()=>null),active:null,selected:0,master:1}}const Fe=t=>t&&typeof t=="object"&&!Array.isArray(t)?t:{},oe=(t,e,n,a)=>typeof t=="number"&&Number.isFinite(t)?Math.min(n,Math.max(e,t)):a,Ne=(t,e,n,a)=>Math.round(oe(t,e,n,a)),Ve=(t,e)=>typeof t=="boolean"?t:e,ca=(t,e,n)=>e.includes(t)?t:n,Bn=/^[0-9a-f]{16,64}$/,Yf=1e-6;function Kf(t,e){const n=Fe(t),a=ke(e);let o=oe(n.start,0,1,0),i=oe(n.end,0,1,1);i-o<Yf&&([o,i]=[0,1]);const s=tc.includes(n.slices)?n.slices:0,l=typeof n.cuts=="string"&&n.cuts.length<=ic?n.cuts.split(" ").map(Number):n.cuts,c=Array.isArray(l)?l.filter(d=>typeof d=="number"&&d>0&&d<1).sort((d,u)=>d-u).slice(0,15):[];return{name:typeof n.name=="string"&&n.name.trim()?n.name.trim().slice(0,24):a.name,sample:typeof n.sample=="string"&&Bn.test(n.sample)?n.sample:null,mode:ca(n.mode,["oneshot","gate","loop"],a.mode),dir:ca(n.dir,["fwd","rev","pingpong"],a.dir),start:o,end:i,slices:s,cuts:s?c:[],tune:Ne(n.tune,-24,24,0),fine:Ne(n.fine,-100,100,0),fit:nc.includes(n.fit)?n.fit:0,keepPitch:Ve(n.keepPitch,!0),attack:oe(n.attack,0,.1,a.attack),decay:oe(n.decay,.01,4,a.decay),cutoff:oe(n.cutoff,-1,1,0),resonance:oe(n.resonance,0,1,0),level:oe(n.level,0,1,a.level),pan:oe(n.pan,-1,1,0),choke:Ne(n.choke,0,4,0),provenance:typeof n.sample=="string"&&Bn.test(n.sample)?zf(n.provenance):null,normalize:typeof n.sample=="string"&&Bn.test(n.sample)?Uf(n.normalize):null,offsetDb:typeof n.sample=="string"&&Bn.test(n.sample)?oe(n.offsetDb,-24,0,0):0,follow:typeof n.follow=="boolean"?n.follow:null,note:Ne(n.note,0,11,0)}}function Xf(t){const e=Fe(t);return{on:Ve(e.on,!1),accent:Ve(e.accent,!1),velocity:oe(e.velocity,0,1,.8),chance:oe(e.chance,0,1,1),slice:e.slice===null||e.slice===void 0?null:Ne(e.slice,0,15,0),pitch:Ne(e.pitch,-12,12,0),reverse:Ve(e.reverse,!1),cond:ca(e.cond,sa,"always")}}function Vf(t){const e=Fe(t),n=Array.isArray(e.steps)?e.steps:typeof e.steps=="string"?om(e.steps):[];return{length:Ne(e.length,1,te,te),mute:Ve(e.mute,!1),solo:Ve(e.solo,!1),steps:Array.from({length:te},(a,o)=>Xf(n[o]))}}function Qr(t,e){const n=Fe(t),a={...e.dials};for(const[o,i]of Object.entries(Fe(n.dials)))o in e.dials&&typeof i=="number"&&Number.isFinite(i)&&(a[o]=i);return{on:Ve(n.on,e.on),dials:a}}function Qf(t){const e=Fe(t),n=Fe(e.filter),a=ac();return{filter:{on:Ve(n.on,a.filter.on),mode:ca(n.mode,["lp","hp","bp"],a.filter.mode),cutoff:oe(n.cutoff,0,1,a.filter.cutoff),resonance:oe(n.resonance,0,1,a.filter.resonance)},drive:Qr(e.drive,la.drive),compressor:Qr(e.compressor,la.compressor)}}function da(t){const e=Fe(t),n=Array.isArray(e.pads)?e.pads:[],a=Array.isArray(e.lanes)?e.lanes:[];return{pads:Array.from({length:V},(o,i)=>Kf(n[i],i)),lanes:Array.from({length:V},(o,i)=>Vf(a[i])),swing:oe(e.swing,.5,.75,.5),hacks:Qf(e.hacks)}}function oc(t){const e=Fe(t);if(e.v!==1)return zo();const n=Array.isArray(e.slots)?e.slots:[],a=da(e),o=Array.from({length:Rt},(s,l)=>n[l]?da(n[l]):null),i=e.active===null?null:Ne(e.active,0,Rt-1,-1);return{v:1,...a,slots:o,active:i!==null&&i>=0&&o[i]?i:null,selected:Ne(e.selected,0,V-1,0),master:oe(e.master,0,1,1)}}function wi(t,e){return structuredClone({index:e,pad:t.pads[e]??ke(e),lane:t.lanes[e]??Aa()})}function Jf(t,e){const n=structuredClone(e);t.pads[n.index]=n.pad,t.lanes[n.index]=n.lane}function vi(t,e){const n=(i,s)=>i.index??s,a=e.map((i,s)=>wi(t,n(i,s))),o=e.map((i,s)=>i.hat?t.pads[n(i,s)]?.choke??0:0).find(i=>i>0)??1;return e.forEach((i,s)=>{const l=ke(n(i,s));l.sample=i.sample,l.name=i.name.slice(0,24)||l.name,l.provenance=i.provenance,l.normalize=i.normalize!==void 0?i.normalize&&{...i.normalize}:i.provenance?{on:!0,gainDb:0}:null,i.hat&&(l.choke=o),t.pads[n(i,s)]=l}),a}function Zf(t,e){const n=Array.from({length:V},(a,o)=>wi(t,o));for(let a=0;a<V;a++)t.pads[a]=ke(a);return vi(t,e),n}const gn=8;function em(t,e,n,a=0){const o=t.pads[e],i=t.lanes[e];if(!o||!i)return;o.mode="oneshot",o.dir="fwd",o.decay=4,o.attack=0,o.fit=n,o.keepPitch=!0,o.slices=0,o.cuts=[],i.length=te;for(const l of i.steps)Object.assign(l,An());const s=i.steps[0];n<=gn&&s&&(s.on=!0,s.cond=n===1?"always":`${a%n+1}:${n}`)}function tm(t,e=V){if(typeof t!="string"||!/^\d{1,3}$/.test(t))return-1;const n=Number(t)-1;return n>=0&&n<e?n:-1}function xi(t){return structuredClone({pads:t.pads,lanes:t.lanes,swing:t.swing,hacks:t.hacks})}const ic=4096;function nm(t){const e=An(),n=t.map(a=>{let o="";return a.on!==e.on&&(o+="x"),a.accent!==e.accent&&(o+="a"),a.reverse!==e.reverse&&(o+="r"),a.velocity!==e.velocity&&(o+=`v${a.velocity}`),a.chance!==e.chance&&(o+=`c${a.chance}`),a.slice!==e.slice&&a.slice!==null&&(o+=`s${a.slice}`),a.pitch!==e.pitch&&(o+=`p${a.pitch}`),a.cond!==e.cond&&(o+=`k${a.cond}`),o||"-"});for(;n.at(-1)==="-";)n.pop();return n.join(" ")}const am="-?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[+-]?\\d+)?",Jr=new RegExp(`[xar]|[vcsp]${am}|k\\S+$`,"gy");function om(t){return t.length>ic?[]:t.split(" ").slice(0,te).map(e=>{const n={};if(e==="-"||e==="")return n;Jr.lastIndex=0;let a=0;for(const o of e.matchAll(Jr)){const i=o[0];a+=i.length;const s=i.slice(1);i==="x"?n.on=!0:i==="a"?n.accent=!0:i==="r"?n.reverse=!0:i[0]==="v"?n.velocity=Number(s):i[0]==="c"?n.chance=Number(s):i[0]==="s"?n.slice=Number(s):i[0]==="p"?n.pitch=Number(s):i[0]==="k"&&(n.cond=s)}return a===e.length?n:{}})}function im(t){const e=t.pads.map((a,o)=>{const i=ke(o),s={};for(const[l,c]of Object.entries(a))l==="cuts"?a.cuts.length&&(s.cuts=a.cuts.join(" ")):i[l]!==c&&(s[l]=c);return s}),n=t.lanes.map(a=>({...a.length!==te?{length:a.length}:{},...a.mute?{mute:!0}:{},...a.solo?{solo:!0}:{},steps:nm(a.steps)}));return structuredClone({pads:e,lanes:n,swing:t.swing,hacks:t.hacks})}function bn(t){const e=new Set;for(const n of[t,...t.slots])for(const a of n?.pads??[])a.sample&&e.add(a.sample);return e}function rc(){try{return globalThis.localStorage??null}catch{return null}}function rm(t,e=rc()){try{const n=e?.getItem(t);return n?oc(JSON.parse(n)):zo()}catch{return zo()}}function sm(t,e,n=rc()){try{return n?.setItem(t,JSON.stringify(e)),!!n}catch{return!1}}const _e=1e-6;function lm(t,e){return Math.min(127,Math.max(0,(e+1)*12+(t%12+12)%12))}class Ya{entries=[];add(e){for(const n of e){let a=this.entries.find(i=>i.chord?.hit===n.hit&&Math.abs(i.startBeat-n.startBeat)<_e);a||(a={startBeat:n.startBeat,chord:{root:n.root,notes:[],startBeat:n.startBeat,lengthBeats:0,sounding:!0,hit:n.hit}},this.insert(a));const o=a.chord;o.notes.includes(n.note)||(o.notes.push(n.note),o.notes.sort((i,s)=>i-s)),o.lengthBeats=Math.max(o.lengthBeats,n.lengthBeats)}}off(e){if(e===void 0){this.entries=[];return}this.entries=this.entries.filter(n=>n.startBeat<e-_e),this.entries.push({startBeat:e,chord:null})}cut(e){this.entries=this.entries.filter(n=>n.startBeat<e-_e)}points(e=Number.NEGATIVE_INFINITY){let n=0;for(let a=0;a<this.entries.length;a++)this.entries[a].startBeat<=e+_e&&(n=a);return this.entries.slice(n).map(a=>({beat:a.startBeat,root:a.chord?a.chord.root:null}))}chordAt(e){let n=null;for(const o of this.entries){if(o.startBeat>e+_e)break;n=o}if(!n?.chord)return null;const a=n.chord;return{...a,notes:[...a.notes],sounding:e<a.startBeat+a.lengthBeats-_e}}pitchAt(e,{octave:n}={}){const a=this.chordAt(e);return a?n===void 0?a.root:lm(a.root,n):null}prune(e){let n=0;for(let a=0;a<this.entries.length;a++)this.entries[a].startBeat<=e+_e&&(n=a);n>0&&this.entries.splice(0,n)}get size(){return this.entries.length}insert(e){let n=this.entries.length;for(;n>0&&this.entries[n-1].startBeat>e.startBeat+_e;)n--;this.entries.splice(n,0,e)}}const ln=1,Zr=1024,cm=48,sc=128,dm=["chord","root","top"],um=["chord","root","top","arp","note"];function pm(t){const e=t.split("|");if(e.length<5)return null;const n=Number(e[e.length-4]);return Number.isInteger(n)?n:null}const Po=t=>typeof t=="object"&&t!==null,cn=t=>typeof t=="string"&&t.length>0&&t.length<=sc,rt=t=>typeof t=="number"&&Number.isFinite(t);function hm(t){return Po(t)?cn(t.id)?cn(t.source)?!Number.isInteger(t.note)||t.note<0||t.note>127?"note must be a whole number 0–127":!rt(t.velocity)||t.velocity<0||t.velocity>1?"velocity must be 0–1":rt(t.startBeat)?!rt(t.lengthBeats)||t.lengthBeats<0?"bad lengthBeats":!rt(t.spanBeats)||t.spanBeats<=0?"bad spanBeats":!rt(t.gate)||t.gate<=0||t.gate>1?"gate must be above 0, at most 1":!rt(t.offsetSec)||Math.abs(t.offsetSec)>2?"bad offsetSec":typeof t.role!="string"||!um.includes(t.role)?"bad role":Number.isInteger(t.hit)?!Number.isInteger(t.root)||t.root<0||t.root>127?"bad root":null:"bad hit":"bad startBeat":"bad source":"bad id":"not an object"}function fm(t){if(!Po(t))return"not an object";if(t.v!==ln)return`version ${String(t.v)} is not ${ln}`;if(t.kind==="notes"){if(!cn(t.source))return"bad source";if(!Array.isArray(t.events))return"events must be a list";if(t.events.length>Zr)return`more than ${Zr} events`;for(let e=0;e<t.events.length;e++){const n=hm(t.events[e]);if(n)return`event ${e}: ${n}`;if(t.events[e].source!==t.source)return`event ${e}: from another source`}return null}if(t.kind==="off")return cn(t.source)?["stop","removed","off","restart"].includes(t.reason)?t.atBeat!==void 0&&!rt(t.atBeat)?"bad atBeat":null:"bad reason":"bad source";if(t.kind==="routes"){if(!Array.isArray(t.routes)||t.routes.length>64)return"routes must be a list (at most 64)";for(const e of t.routes){if(!Po(e)||!cn(e.source)||typeof e.name!="string"||e.name.length>sc)return"bad route";if(!dm.includes(e.role))return"bad route role";if(e.octave!==void 0&&!(Number.isInteger(e.octave)&&e.octave>=-1&&e.octave<=9))return"bad route octave";if(e.transpose!==void 0&&!(Number.isInteger(e.transpose)&&Math.abs(e.transpose)<=cm))return"bad route transpose"}return null}return"unknown kind"}const mm=t=>({id:t.id,source:t.source,note:t.note,velocity:t.velocity,startBeat:t.startBeat,lengthBeats:t.lengthBeats,role:t.role,offsetSec:t.offsetSec,spanBeats:t.spanBeats,gate:t.gate,hit:t.hit,root:t.root});function gm(t){if(fm(t))return null;const e=t;return e.kind==="notes"?{v:ln,kind:"notes",source:e.source,events:e.events.map(mm)}:e.kind==="off"?{v:ln,kind:"off",source:e.source,reason:e.reason,...e.atBeat===void 0?{}:{atBeat:e.atBeat}}:{v:ln,kind:"routes",routes:e.routes.map(n=>({source:n.source,name:n.name,role:n.role,...n.octave===void 0?{}:{octave:n.octave},...n.transpose===void 0?{}:{transpose:n.transpose}}))}}class bm{track=new Ya;run=null;current=[];serial=0;stats={accepted:0,ignored:0,invalid:0};get routes(){return this.current}get route(){return this.current[0]??null}get active(){return this.current.length>0}get version(){return this.serial}receive(e){const n=gm(e);if(!n)return this.stats.invalid++,null;if(n.kind==="routes"){const i=this.route?.source??null;return this.current=n.routes,(this.route?.source??null)!==i&&this.reset(),n}const a=this.route?.source;if(n.source!==a)return this.stats.ignored++,n;if(n.kind==="off")return n.reason==="stop"&&n.atBeat===void 0||(n.reason==="restart"&&n.atBeat!==void 0?this.track.cut(n.atBeat):n.atBeat!==void 0?this.track.off(n.atBeat):this.track.off(),this.serial++),n;let o=!1;for(const i of n.events){const s=pm(i.id);if(s!==null&&this.run!==null&&s<this.run){this.stats.ignored++;continue}s!==null&&(this.run===null||s>this.run)&&(this.track=new Ya,this.run=s),this.track.add([i]),this.stats.accepted++,o=!0}return o&&this.serial++,n}rootAt(e){return this.active?this.track.chordAt(e)?.root??null:null}points(e=Number.NEGATIVE_INFINITY){return this.active?this.track.points(e):[]}prune(e){this.track.prune(e)}reset(){this.track=new Ya,this.run=null,this.serial++}}const ym=t=>t.offsetDb?10**(t.offsetDb/20):1,wm=.25;function ki(t){return t.slices?t.cuts.length===t.slices-1?[0,...t.cuts,1]:Array.from({length:t.slices+1},(e,n)=>n/t.slices):[0,1]}function lc(t,e,n){const a=t.start*e.frames,o=t.end*e.frames;if(n===null||!t.slices)return[Math.floor(a),Math.ceil(o)];const i=ki(t),s=Math.min(n,i.length-2);return[Math.floor(a+i[s]*(o-a)),Math.ceil(a+i[s+1]*(o-a))]}function vm(t,e,n,a=0){let i=2**((t.tune+t.fine/100+a)/12);if(t.fit){const s=(t.end-t.start)*e.frames/e.sampleRate,l=t.fit*4*(60/n);s>0&&l>0&&(i*=s/l)}return i}function cc(t,e,n){return Math.max(1,Math.round(t*4*60/Math.max(1,e)*n))}function $i(t,e,n){if(!t.fit)return 1;const a=(t.end-t.start)*e.frames/e.sampleRate;return a>0?a/(t.fit*4*(60/Math.max(1,n))):1}const It=[.75,1.5];function xm(t,e,n){if(n===null||!t.slices)return[0,e];const a=ki(t),o=Math.min(n,a.length-2);return[Math.floor((a[o]??0)*e),Math.ceil((a[o+1]??1)*e)]}const km=1.5;function Ei(t,e,n,a,o,i=!1,s){if(!n.on||!t.sample||!a)return null;const l=n.slice??(t.slices?e%t.slices:null),c=m=>s?xm(t,s.frames,m):lc(t,a,m);let[d,u]=c(l);const p=n.reverse?t.dir==="rev"?"fwd":"rev":t.dir;if(t.mode==="oneshot"&&l!==null&&t.slices&&!i){const[m,b]=c(null);p==="fwd"?u=b:p==="rev"&&(d=m)}const h=s?2**(n.pitch/12)*(s.frames/cc(t.fit,o,a.sampleRate)):vm(t,a,o,n.pitch);return{sample:s?s.sample:t.sample,from:d,to:u,rate:h,gain:Math.min(1.5,n.velocity*(n.accent?km:1))*t.level*Wf(t)*ym(t),pan:t.pan,mode:t.mode,dir:p,attack:t.attack,decay:t.decay,cutoff:t.cutoff,resonance:t.resonance,choke:t.choke,chance:n.chance,cond:n.cond,fit:t.fit>0,...!i&&mn(t)?{follow:t.note}:{}}}function dc(t,e,n,a=null,o){return Ei(t,0,{on:!0,accent:!1,velocity:.8,chance:1,slice:a,pitch:0,reverse:!1,cond:"always"},e,n,!0,o)}function $m(t,e,n,a=()=>{}){const o=t.lanes.some(i=>i.solo);return{swing:t.swing,lanes:t.lanes.map((i,s)=>{const l=t.pads[s],c=l?.sample?e(l.sample):void 0,d=l?a(s):void 0;return{length:i.length,audible:o?i.solo:!i.mute,steps:i.steps.map((u,p)=>l?Ei(l,p,u,c,n,!1,d):null)}})}}const Ai=4,Em=.03,Am=new Set(["oneshot","oneshots","shot","shots","hit","hits","stab","stabs","single"]),Sm=new Set(["loop","loops","break","breaks","breakbeat","groove","grooves","beat","riff"]);function uc(t){return t.replace(/^.*[\\/]/,"").replace(/\.[a-z0-9]{2,4}$/i,"").split(/[\s_\-.()[\],+&]+/).filter(Boolean)}function pc(t){const e=uc(t);for(let n=0;n<e.length;n++){const a=e[n]??"",o=/^(\d{2,3})bpm$/i.exec(a)??/^bpm(\d{2,3})$/i.exec(a);if(o&&ia(Number(o[1])))return Number(o[1]);if(/^\d{2,3}$/.test(a)&&/^bpm$/i.test(e[n+1]??"")&&ia(Number(a)))return Number(a)}for(const n of e)if(/^[1-9]\d{1,2}$/.test(n)&&Number(n)>=50&&Number(n)<=200)return Number(n);return 0}function Si(t){const e=uc(t).map(o=>o.toLowerCase());if(e.some((o,i)=>Am.has(o)||o==="one"&&/^shots?$/.test(e[i+1]??"")))return{kind:"one-shot",bpm:0};const a=pc(t);return a?{kind:"loop",bpm:a}:{kind:e.some(o=>Sm.has(o))?"loop":"",bpm:0}}function hc(t,e,n=Ai,a=nc){if(!(t>0)||!ia(e)||!(n>0))return 0;const o=t*e/60/n,i=Math.round(o);return i<1||Math.abs(o-i)>Em*i?0:a.includes(i)?i:0}function Mm(t,e,n,a=Ai){if(e.kind!=="loop")return null;const o=hc(t,e.bpm,a);if(!o)return null;const i=t/(o*a*(60/Math.max(1,n))),s=Number(i.toFixed(2));return{bars:o,bpm:e.bpm,speed:i,far:s<It[0]||s>It[1]}}function Lm(t){const e=Number.isInteger(t.bpm)?String(t.bpm):t.bpm.toFixed(1);return`Fitted: ${t.bars} bar${t.bars===1?"":"s"}, ${e} BPM`}function es(t){return t.far?`×${t.speed.toFixed(2)} may smear`:""}const fc="nyx.autofit.v1",mc=()=>{try{return globalThis.localStorage??null}catch{return null}};function Tm(t=mc()){try{return t?.getItem(fc)!=="off"}catch{return!0}}function Cm(t,e=mc()){try{e?.setItem(fc,t?"on":"off")}catch{}}function gc(t,e){return!!(t&&e.sample===t.sample&&e.fit===t.fit.bars)}function Nm(t,e){e.fit=t.before.fit,e.keepPitch=t.before.keepPitch}const Me=t=>`${Math.round(t*100)}%`,lt=t=>t<1?`${Math.round(t*1e3)} ms`:`${t.toFixed(2)} s`,Do=t=>t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)} kHz`:`${Math.round(t)} Hz`,yn=(t,e="")=>`${t>0?"+":""}${t}${e}`,Fm=t=>`×${Number(t.toFixed(2))}`;function Un(t){return Math.abs(t)<.001?"open":t<0?`LP ${Do(2e4*(60/2e4)**-t)}`:`HP ${Do(20*(8e3/20)**t)}`}const Gn=t=>t>=3.99?"Hold":lt(t);function zm(t){const e=ke(0),n=[];return t.tune!==e.tune&&n.push(yn(t.tune," st")),t.fine!==e.fine&&n.push(yn(t.fine," ct")),t.fit!==e.fit&&n.push(`fit ${t.fit} bar${t.fit===1?"":"s"}`),t.fit&&t.keepPitch!==e.keepPitch&&n.push("varispeed"),Math.abs(t.attack-e.attack)>=5e-4&&n.push(`attack ${lt(t.attack)}`),Gn(t.decay)!==Gn(e.decay)&&n.push(`decay ${Gn(t.decay)}`),Un(t.cutoff)!==Un(e.cutoff)&&n.push(`filter ${Un(t.cutoff)}`),Me(t.resonance)!==Me(e.resonance)&&n.push(`res ${Me(t.resonance)}`),n.join(" · ")}function bc(t){const e=Math.max(0,Math.min(1,t));return Math.min(2e4,40*2**(e*10))}const On=t=>Math.max(0,Math.min(100,t));function Mi(t){const e=bc(t.cutoff),n=On(Math.max(0,Math.min(1,t.resonance))*100);return t.mode==="hp"?{type:"highpass",dials:{cutoff:e<=20?0:On(100*Math.log(e/20)/Math.log(100)),q:n}}:t.mode==="bp"?{type:"bandpass",dials:{centre_hz:On(100*Math.log(Math.max(100,e)/100)/Math.log(80)),q:n,mix:100}}:{type:"lowpass",dials:{cutoff:t.cutoff>=.999?0:On(100*Math.log(e/2e4)/Math.log(150/2e4))}}}function Pm(t){const{type:e,dials:n}=Mi(t);if(e==="highpass"){const o=n.cutoff??0;return{hz:20*100**(o/100),q:Math.SQRT1_2*(8/Math.SQRT1_2)**((n.q??0)/100),open:o<=0}}if(e==="bandpass")return{hz:100*80**((n.centre_hz??0)/100),q:.4*20**((n.q??0)/100),open:!1};const a=n.cutoff??0;return{hz:2e4*(150/2e4)**(a/100),q:Math.SQRT1_2,open:a<=0}}const yc=t=>!t.on||t.mode==="lp"&&t.cutoff>=.999;function Bo(t){const e=Mi(t.filter);return{v:2,chain:[{id:`${e.type}-1`,type:e.type,bypass:yc(t.filter),dials:e.dials},{id:"drive-1",type:"drive",bypass:!t.drive.on,dials:{...t.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!t.compressor.on,dials:{...t.compressor.dials}}]}}function Dm(t,e){if(!t||t.chain.length!==e.chain.length)return{whole:!0};if(t.chain.some((a,o)=>a.type!==e.chain[o]?.type))return{whole:!0};const n=[];return e.chain.forEach((a,o)=>{const i=t.chain[o];if(i){i.bypass!==a.bypass&&n.push([a.id,"bypass",a.bypass]);for(const[s,l]of Object.entries(a.dials))i.dials[s]!==l&&n.push([a.id,s,l])}}),{whole:!1,params:n}}const ts={"page:title":"NYX, the NetComposer sampler. The number is which copy of NYX this is.","page:master":"The volume of everything NYX plays, after the Hacks.","page:save":"Downloads the pattern as a file: pads, steps, Hacks and the ten slots. The samples stay in this browser.","page:load":"Opens a saved pattern file (with its slots, if it has them), or puts an audio file onto the selected pad.","page:panic":"Silences every voice and effect tail at once. NYX then sits out until you press Play.","module:transport":"Play and stop NYX, set the tempo and swing, and keep up to ten saved versions of the whole kit and pattern.","module:pattern":"The 16-step grid, one lane per pad: a step that is on plays that lane's pad. The pads under the grid are the sounds.","module:params":"Everything about the selected pad: which part of the sample plays, its pitch, shape, filter and level. A selected step's locks show here too.","module:hacks":"Effects on everything NYX plays, in order: Filter, then Drive, then Compressor. They are saved with the pattern and its slots.","section:pads":"The 16 sounds: Q W E R A S D F play 1–8, Shift 9–16. Tap to play, double-click a name to rename; long-press or right-click to load or clear; drag to swap.",play:"Starts and stops NYX. In the Studio, Stop sits NYX out while the others play on, and Play brings it back on the next bar.","perform-label":"Effects you play live: hold a button down and NYX's sound changes until you let go. Nothing is saved.",perform:"Hold one of these down to change NYX's sound until you let go.",tempo:"Beats per minute: how fast the pattern plays. In the Studio every instrument shares this clock.",swing:"Pushes every second sixteenth note later for a looser, shuffled feel. 50% is straight.",status:"What NYX is doing now: stopped, playing, sitting out, or waiting to join on the next bar.","kit:slot":"A memory for the whole kit and pattern. Tap to recall it; Shift-click or long-press to store here, Option-click to clear.","kit:note":"Step tool: a tap on a step turns it on or off.","kit:accent":"Step tool: a tap on a step makes it an accent, played louder. Shift-click accents a step with either tool.","kit:fill":"Hold for a fill: steps set to play Only in Fill come in and Not in Fill steps drop out, until you let go.","kit:clear":"Turns every step off and resets lane lengths, mutes, solos and step locks; the pads keep their sounds. Undo brings it back.","kit:mute":"Mute: silences this lane. Its steps stay as they are.","kit:solo":"Solo: hear only the soloed lanes. Solo several to hear them together.","kit:length":"Drag to set how many steps this lane plays before it starts over. Lanes of different lengths drift against each other.","kit:lane-length":"Tap to set this lane's length, then tap the step it should end on.","kit:pad-key":"The key that plays this pad: lower case (q to f) is the key alone, upper case (Q to F) is Shift with it. A Gate pad holds while its key is down.","kit:choke-badge":"Choke group: pads showing the same letter cut each other off, like an open and a closed hi-hat. Set it under Choke.",wave:"The selected pad's sample: the part between Start and End is what plays, lines mark the slices, and a cursor follows playback.",sample:"How much of the sample plays (between Start and End) out of its full length, and whether it is mono or stereo.",mode:"How the pad plays when hit: right through (One-shot), only as long as its step (Gate), or round and round (Loop).",dir:"Which way the pad plays through its sample: forwards, backwards, or forwards then back.",start:"Where the pad starts playing in the sample. Move it right to skip the beginning.",end:"Where the pad stops playing in the sample. Move it left to cut off the tail.",slices:"Cuts the played part into 2 to 16 pieces; each step plays the next piece in turn. Off plays the whole part every time.",chop:"Where the slices are cut: at equal spacing, or where the hits in the sound start.","chop-to-pads":"Cuts this pad's sound into up to 16 slices, one per pad, to play by hand or rearrange in the pattern.","chop:wave":"The slices and the pad each lands on. Tap a slice to hear it.","chop:close":"Closes Chop to pads without changing any pad.","chop:mode":"How the sound is cut: where its hits start, into equal parts, or on the beat.","chop:mode:transients":"Cuts where each hit starts, so a slice is one hit (a drum, a note, a word).","chop:mode:even":"Cuts into equal parts: 16, 8 or 4.","chop:mode:beats":"Cuts on the beat at the sound's tempo: every beat, eighth or sixteenth.","chop:sensitivity":"Higher finds quieter hits; lower keeps only the strongest.","chop:count":"The most slices to make (Even: exactly this many). Never more than the pads left from Fill from.","chop:every":"Beats: a slice every beat, eighth or sixteenth at the sound's tempo. Choices past 16 slices are off.","chop:first":"The pad the first slice goes on; the rest follow, up to pad 16.","chop:play-back":"Writes steps that play the slices in order, so the pattern sounds like the original. On when the tempo is known.","chop:more":"The tempo used, Choke and Snap to hits.","chop:tempo":"The sound's tempo: from its Fit, its name, a take, or the Studio's when the length fits; else a guess.","chop:choke":"On, the slices cut each other: a new slice stops the last one.","chop:snap":"Even and Beats: moves each cut to a hit that starts within 20 ms, so an early hit isn't split.","chop:go":"Puts the slices on the pads. Pads with sounds are replaced; Undo puts them back.","library:chop":"Loads this loop onto the selected pad and opens Chop to pads on it.","tune-shape":"Pitch, speed and shape of the selected pad. Closed, it lists what differs from a new pad; NYX remembers in this browser whether it's open.","transport-more":"On a phone, Swing folds away; the line shows it. Tap to show or hide it.","pad-more":"On a phone, the pad's pan, choke group and Clear pad fold away; the line shows pan and choke. Tap to show or hide them.","hacks-more":"On a phone, Drive and Compressor fold away under the Filter; the line says which are on. Tap to show them.","kit:group-toggle":"Opens or closes this section.","pitch-label":"How high or low the pad plays. Pitch changes speed too, like a record, unless Fit's Keep pitch is on.",tune:"Pitch in semitones, up to two octaves either way. Higher also plays faster, unless the pad is fitted with Keep pitch on.",fine:"Fine pitch in cents (hundredths of a semitone), for small corrections.",fit:"Makes the pad last exactly this many bars at the current tempo, and keeps it in time when the tempo changes. Off plays it as recorded.","keep-pitch":"On, Fit stretches the pad to its bars without changing its pitch, and Tune moves the pitch only. Off, it speeds up or slows down like a record.","fit-speed":"How fast the pad plays to fit its bars: ×1 is as recorded. With Keep pitch, stretching far past ×0.75 to ×1.5 may smear the sound.","auto-fit":"On, a loop that arrives with its tempo (picker, My samples, or a name like Loop_100_Am) is fitted to its bars with Keep pitch. One-shots never are.","auto-fit-note":"This loop came with its tempo, so NYX set Fit to its bars with Keep pitch on. It plays in time at any tempo.","auto-fit-far":"Keep pitch is stretching this loop past ×0.75 to ×1.5, where it may smear. Fit it to other bars, or turn Keep pitch off.","auto-fit-undo":"Turns this pad's automatic Fit off again: the loop plays as recorded. The sound stays.","shape-label":"How each hit's volume moves over time: how it fades in and how it dies away.",attack:"How long each hit takes to fade in. Zero is instant; more softens the start.",decay:"How quickly each hit fades away (in Gate, once its step ends). All the way up is Hold: no fade.",cutoff:"Left of centre cuts the highs (darker), right of centre cuts the lows (thinner). Centre leaves the pad open.",resonance:"Boosts the sound right at the filter's edge for a sharper, ringing tone. It does nothing while the filter is open.","out-label":"Where the pad sits in the mix: how loud, how far left or right, and which pads cut it off.",level:"How loud this pad plays.",normalize:"On, the pad plays at the Library's level, so a quiet file fits the kit; Level still sets how loud. Off, it plays as recorded.","normalize-label":"Plays the pad at the Library's level, so a quiet file fits the kit. Grabs and Takes are at mix level already.","normalize-gain":"What Normalize adds to this pad: the gain that brings your audio to the Library's level, never a peak past −1 dBFS.",pan:"Places the pad left or right in the stereo picture. C is the centre.",choke:"Pads in the same group cut each other off when one plays, like open and closed hi-hats. None lets it ring over the others.","clear-pad":"Removes this pad's sample and settings. Its steps in the grid stay.","lock-label":"Locks for this one step: settings here change only this step, not the whole pad. Long-press another step to edit it.","lock-velocity":"How loud this step plays, before any accent.","lock-chance":"The odds this step plays each time round. At 100% it always plays; lower leaves it out at random.","lock-slice":"Which slice this step plays. In order plays the slice that matches the step's place, so a chopped beat plays back as it was.","lock-pitch":"Moves this step up or down in semitones, on top of the pad's own Tune.","lock-cond":"When this step plays: always, only on some passes through the lane, only with Fill held or not, or only if the lane's last conditional step did or didn't.","lock-reverse":"Whether this step plays the pad's own way or the other way round.","lock-done":"Closes this step's locks and goes back to the pad's settings.","notes-label":"CALLIOPE plays this NYX: your pattern keeps its hits, and pads that follow take its chord's root.","pad-follow":"On: this pad's hits play at the root of CALLIOPE's chord. Off: its own pitch, as drums want.","pad-note":"The note this sample plays at as recorded. NYX tunes from it to CALLIOPE's root, never more than six semitones away.","notes-open":"Shows CALLIOPE, the Studio's note generator that tunes this NYX's pads now.","notes-mine":"Take the pitch back: CALLIOPE stops playing this NYX, and every pad plays its own pitch again.","grab-label":"Brings sound from the Studio onto the selected pad: Grab the bars that just played, or Take a performance as it happens.","grab-from":"Which Studio sound to grab or take from: the master mix or one instrument's channel.","grab-bars":"How many bars Grab takes. One bar is cut into 16 slices with every step on; longer grabs are sliced at the hits.",grab:"Copies the bars that just played onto the selected pad, cut on the bar lines (the music must be playing). It asks before replacing a pad that has a sound.","grab-undo":"Puts back what this Grab, Take, sent take, Library Load or Build kit replaced: old sounds, slices and steps. Cmd/Ctrl+Z does the same.",library:"Opens the Library: openly licensed sounds checked by a person, found by plain words. Load fills the selected pad; Build kit fills pads 1–8.",credit:"Who made this pad's sound, and its licence. Library › Credits has the full credit with links, and saved patterns keep it.","library:ask":"Plain words: a role (kick, snare, hat, clap, tom, perc, cymbal, fx) and a sound (punchy, tight, dark, bright, long, soft). Add kit for a whole kit.","library:close":"Closes the Library. Esc in the field does the same.","library:play":"Plays this sound through NYX's output, at the level it will have on a pad. Press again to stop.","library:load":"Puts this sound on the selected pad, named after it and with its credit; the steps stay. Undo brings the old sound back.","library:kit":"Fills pads 1–8 with a kit for your words (kick, snare, clap, hats, tom, perc, fx); the pattern stays and the hats cut each other. One Undo puts all eight back.","library:credits":"Every Library sound on the pads: who made it, its licence and its source. Saved patterns, slots and Studio Scenes keep these credits.","library:badge":"The licence. CC0 needs no credit (NYX credits it anyway); BY needs credit, and BY-SA credit plus the same licence on what you make.","library:wave":"The sound's shape, start to end: a tall start is a sharp hit, a long tail rings on.","library:source-shelf":"The curated shelf on musicmatter.art: openly licensed sounds, each checked by a person.","library:source-local":"My samples: your local Library, the folder the sample picker exported. Its sounds play in this browser and are never uploaded.","library:source-all":"Searches musicmatter.art and My samples (your local Library) together.","library:open-folder":"Opens a local Library folder (the sample picker's export) from this computer. NYX only reads it; nothing is uploaded.","library:reconnect":"Your local Library folder, remembered from last time: the browser asks once more before NYX can read it.","library:forget":"Closes your local Library and forgets the folder. The files stay where they are; pads keep their sounds.",take:"Records the chosen source onto the selected pad in whole bars until you press again (up to four minutes); takes of up to 8 bars loop. It asks first if the pad has a sound.","hack-filter":"A filter on all of NYX, to darken it, thin it or narrow it down. The switch turns it on.","filter-mode":"Which part the filter keeps: the lows (low pass), the highs (high pass) or a band in the middle (band pass).","filter-cutoff":"Where the filter cuts. In low pass, all the way up is open: no filtering.","filter-resonance":"Boosts the sound around the cutoff for a sharper, more nasal tone.","filter-curve":"A picture of the filter: how loud each pitch range comes out, lows on the left, highs on the right.","hack-meter":"The level going into this Hack (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. Off, it still shows the input, greyed.","hack-drive":"Distortion on all of NYX, from warm to gritty. The switch turns it on.","hack-drive-drive_db":"How hard the sound is pushed into distortion. 0 dB is clean.","hack-drive-output_db":"The level after the drive, to balance out the louder distorted sound.","hack-drive-mix":"How much of the driven sound is mixed with the clean one. 100% is all drive.","hack-drive-curve":"The kind of distortion: Smooth is warm and round, Acid is harder and buzzier.","hack-drive-tone":"Darkens the driven sound by cutting its highs. All the way up leaves it bright.","hack-compressor":"Evens out NYX's level: loud hits are turned down, so the whole sounds tighter and punchier. The switch turns it on.","hack-compressor-threshold_db":"The level above which the compressor starts turning the sound down. Lower catches more.","hack-compressor-ratio":"How strongly sound above the threshold is turned down. Higher is a firmer squeeze.","hack-compressor-attack_ms":"How fast the compressor reacts to a loud hit. Slower lets the start of each hit punch through.","hack-compressor-release_ms":"How fast the compressor lets go once the sound drops back below the threshold.","hack-compressor-makeup_db":"Turns the whole sound back up after compressing, to make up for the lost level.","kit:more":"More settings for this effect."},Bm={perform:{repeat16:"While held, repeats the last sixteenth note over and over, like a stutter.",repeat8:"While held, repeats the last eighth note over and over.",reverse:"While held, plays what NYX just played backwards.",half:"While held, plays on at half speed, an octave lower.",stop:"While held, slows to a halt like a tape machine switched off."},mode:{oneshot:"One-shot: plays on from the hit until it ends or the lane's next hit cuts it. Good for drums.",gate:"Gate: plays only as long as its step (or its key is held), then fades by Decay. Good for chopping long sounds.",loop:"Loop: plays round and round until the pad plays again or the music stops."},dir:{fwd:"Plays the sample the normal way, start to end.",rev:"Plays the sample backwards, end to start.",pingpong:"Plays forwards, then back again. In Loop it keeps bouncing."},normalize:{on:"Normalize on: the pad plays at the Library's level.",off:"Normalize off: the pad plays as recorded."},"keep-pitch":{on:"Keep pitch: the pad is stretched to its bars and stays at its pitch, whatever the tempo. Tune moves the pitch only.",off:"Varispeed: the pad speeds up or slows down to fit its bars, and its pitch moves with it, like a record."},"auto-fit":{on:"Auto-fit on: loops with a known tempo land fitted to their bars, Keep pitch on.",off:"Auto-fit off: loops land as recorded; set Fit yourself."},chop:{even:"Cuts the slices at equal spacing.",transients:"Cuts the slices where the hits in the sound start, so each slice is one hit."},"lock-reverse":{pad:"This step plays in the pad's own direction.",rev:"This step plays the other way round from the pad."}};function B(t){return Object.hasOwn(ts,t)?ts[t]:void 0}function Om(t,e){const n=Bm[t];return(n&&Object.hasOwn(n,e)?n[e]:void 0)??B(t)}const Yn="nyx-help-text",ns=new Map;function qm(t,e){const n=ns.get(e);if(n&&t.getElementById(n))return n;let a=t.getElementById(Yn);a||(a=t.createElement("div"),a.id=Yn,a.hidden=!0,t.body.append(a));const o=t.createElement("span");return o.id=`${Yn}-${a.children.length+1}`,o.textContent=e,a.append(o),ns.set(e,o.id),o.id}function I(t,e,n){if(!t||!e||(t.getAttribute("data-nc-help")!==e&&t.setAttribute("data-nc-help",e),t.hasAttribute("title")&&t.removeAttribute("title"),!n))return;const a=qm(n.ownerDocument,e),o=(n.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);if(o.includes(a))return;const i=[...o.filter(s=>!s.startsWith(`${Yn}-`)),a];n.setAttribute("aria-describedby",i.join(" "))}function Rm(t){const e=B(t);return e?{"data-nc-help":e}:{}}const Im=[['.nc-seg [role="radio"]:not([data-nc-accent-mode])',"kit:note"],['.nc-seg [role="radio"][data-nc-accent-mode]',"kit:accent"],["[data-nc-fill]:not([data-nc-clear])","kit:fill"],["[data-nc-clear]","kit:clear"],['.nc-ms[data-nc-ms="mute"]',"kit:mute"],['.nc-ms[data-nc-ms="solo"]',"kit:solo"],[".nc-len-handle","kit:length"],["[data-nc-len-toggle]","kit:lane-length"],["[data-nc-pads-play]","play"],[".nc-snap","kit:slot"]];function Li(t){for(const e of t.querySelectorAll(".nc-module[data-nc-module]"))I(e.querySelector(".nc-module-hd .nc-title"),B(`module:${e.dataset.ncModule}`));for(const e of t.querySelectorAll("[data-nc-section]"))I(e.querySelector(":scope > .nc-ui-fx-name, :scope > .nc-panel-hd > .nc-panel-title"),B(`section:${e.dataset.ncSection}`));for(const e of t.querySelectorAll("[data-nc-id]")){const n=e.dataset.ncId??"";if(!e.matches("input, select, canvas"))if(e.classList.contains("nc-field")){const a=e.querySelector(":scope > input, :scope > select, :scope > canvas");I(e.querySelector(":scope > .nc-label"),B(n),a)}else if(e.classList.contains("nc-choice-row"))for(const a of e.querySelectorAll("[data-nc-choice]"))I(a,Om(n,a.dataset.ncChoice??""),a);else e.classList.contains("nc-btn")?I(e,B(n),e):e.matches(".nc-label[data-nc-text]")?I(e,B(n)):e.classList.contains("nc-ui-fx")&&(I(e.querySelector(":scope > .nc-ui-fx-hd > .nc-ui-fx-name, :scope > .nc-ui-fx-name"),B(n),e.querySelector("[data-nc-fx-switch]")),I(e.querySelector(":scope > .nc-ui-more > summary"),B("kit:more")))}for(const[e,n]of Im)for(const a of t.querySelectorAll(e)){const o=a.parentElement?.querySelector(":scope > .nc-hit")?a.parentElement:null;o&&a.removeAttribute("title"),I(o??a,B(n),a)}for(const e of t.querySelectorAll(".nc-group[data-nc-id]")){const n=e.querySelector(":scope > .nc-group-toggle");I(n?.querySelector(".nc-group-title")??null,B(e.dataset.ncId??""),n),I(n?.querySelector(".nc-group-mark")??null,B("kit:group-toggle"))}for(const e of t.querySelectorAll(".nc-padgrid-pad-badge"))e.textContent?I(e,B("kit:choke-badge")):e.removeAttribute("data-nc-help")}const dn=["KeyQ","KeyW","KeyE","KeyR","KeyA","KeyS","KeyD","KeyF"],jm=Array.from({length:V},(t,e)=>{const n=(dn[e%dn.length]??"").slice(3);return e<dn.length?n.toLowerCase():n.toUpperCase()});function wc(t){const e=dn.indexOf(t.code);if(e<0)return-1;const n=t.shiftKey?e+dn.length:e;return n<V?n:-1}class _m{down=new Map;press(e){if(this.down.has(e.code))return-1;const n=wc(e);return n>=0&&this.down.set(e.code,n),n}release(e){const n=this.down.get(e.code);return n===void 0?-1:(this.down.delete(e.code),n)}releaseAll(){const e=[...this.down.values()];return this.down.clear(),e}}const Hm="/nyx/assets/limiter-processor-BPr7zuRH.js",Wm="/nyx/assets/sampler-processor-DY8GjsXI.js",Um=.001,Gm=(t,e,n)=>{const a=new Float32Array(Math.max(0,n-e)),o=t.length||1;for(const i of t)for(let s=e;s<n;s++)a[s-e]+=(i[s]??0)/o;return a};function Ym(t,e,n,a,o){const i=t.length;for(let s=0;s<i;s++){const l=o[s];if(l>s){const c=t[s];t[s]=t[l],t[l]=c;const d=e[s];e[s]=e[l],e[l]=d}}for(let s=2;s<=i;s<<=1){const l=s>>1,c=i/s;for(let d=0;d<i;d+=s)for(let u=0;u<l;u++){const p=n[u*c],h=a[u*c],m=d+u,b=m+l,w=t[b]*p+e[b]*h,f=e[b]*p-t[b]*h;t[b]=t[m]-w,e[b]=e[m]-f,t[m]+=w,e[m]+=f}}}function Km(t,e){const n=e>64e3?2048:e>32e3?1024:512,a=n/4,o=Math.max(0,Math.floor((t.length-n)/a)+1),i=n/2,s=new Float32Array(n);for(let y=0;y<n;y++)s[y]=.5-.5*Math.cos(2*Math.PI*y/n);const l=new Float32Array(i),c=new Float32Array(i);for(let y=0;y<i;y++)l[y]=Math.cos(2*Math.PI*y/n),c[y]=Math.sin(2*Math.PI*y/n);const d=Math.log2(n),u=new Uint32Array(n);for(let y=0;y<n;y++){let v=0;for(let x=0;x<d;x++)v|=(y>>x&1)<<d-1-x;u[y]=v}const p=new Float32Array(n),h=new Float32Array(n);let m=new Float32Array(i),b=new Float32Array(i);const w=new Float32Array(o),f=4/n*1e3;let g=0;for(let y=0;y<o;y++){const v=y*a;for(let k=0;k<n;k++)p[k]=t[v+k]*s[k],h[k]=0;Ym(p,h,l,c,u);for(let k=0;k<i;k++)b[k]=Math.log1p(f*Math.sqrt(p[k]*p[k]+h[k]*h[k]));let x=0;if(y>0)for(let k=1;k<i-1;k++){const $=Math.max(m[k-1],m[k],m[k+1]),E=b[k]-$;E>0&&(x+=E)}w[y]=x,x>g&&(g=x),[m,b]=[b,m]}if(g>0)for(let y=0;y<o;y++)w[y]/=g;return{flux:w,hop:a,size:n}}function Xm(t,e,n,a){const o=Math.max(8,Math.round(5e-4*e)),i=Math.max(0,n-Math.round(.01*e)),s=Math.min(t.length,a),l=[];for(let h=i;h<s;h+=o){let m=0;for(let b=Math.max(1,h);b<Math.min(s,h+o);b++)m=Math.max(m,Math.abs(t[b]-t[b-1]));l.push(m)}if(!l.length)return{at:n,contrast:0};let c=0;for(let h=1;h<l.length;h++)l[h]>l[c]&&(c=h);let d=l[c];for(let h=0;h<=c;h++)d=Math.min(d,l[h]);const u=d+.1*(l[c]-d);let p=c;for(;p>0&&l[p-1]>u;)p--;return{at:i+Math.max(0,p-1)*o,contrast:l[c]>0?1-d/l[c]:0}}function Vm(t,e,n){let a=Math.max(0,Math.min(t.length-1,e));for(let o=Math.max(0,e-n);o<=Math.min(t.length-1,e+n);o++)Math.abs(t[o])<Math.abs(t[a])&&(a=o);return a}function as(t,e,n=0,a=t[0]?.length??0){const o=Gm(t,n,a),{flux:i,hop:s,size:l}=Km(o,e),c=e/s/1e3,d=Math.max(1,Math.round(100*c)),u=Math.max(1,Math.round(30*c)),p=Math.max(1,Math.round(25*c)),h=new Float64Array(i.length+1);for(let f=0;f<i.length;f++)h[f+1]=h[f]+i[f];const m=[],b=Math.round(Um*e),w=Math.round(5e-4*e);for(let f=1;f<i.length;f++){const g=i[f],y=Math.max(0,f-d),v=Math.min(i.length,f+u+1),x=g-(h[v]-h[y])/(v-y);if(x<.02)continue;let k=!0;for(let T=Math.max(0,f-p);T<=Math.min(i.length-1,f+p);T++)if(i[T]>g||i[T]===g&&T<f){k=!1;break}if(!k)continue;const{at:$,contrast:E}=Xm(o,e,f*s,f*s+l),S=Vm(o,$-b,w);m.push({cut:n+S,hit:n+$,strength:g*(.25+.75*E),margin:x})}return m.sort((f,g)=>g.strength-f.strength),{from:n,to:a,sampleRate:e,candidates:m}}function Qm(t){return .3*(1-Math.max(0,Math.min(1,t)))**1.6+.02}function os(t,e){const n=Qm(e);return t.candidates.filter(a=>a.margin>=n)}const We=16,Jm=.03,Zm=.002,eg=.02,tg=.7;function vc(t,e){const{from:n,to:a,sampleRate:o}=t,i=Math.round(Jm*o),s=Math.max(2,Math.min(We,Math.round(e.count??We)));if(a-n<i*2)return{cuts:[n,a],hits:[n]};if(e.mode==="transients"){const h=os(t,e.sensitivity??.5),m=h.find(w=>w.cut-n<i),b=[];for(const w of h){if(b.length>=s-1)break;w.cut-n<i||a-w.cut<i||b.every(f=>Math.abs(f.cut-w.cut)>=i)&&b.push(w)}return b.sort((w,f)=>w.cut-f.cut),{cuts:[n,...b.map(w=>w.cut),a],hits:[m?m.hit:n,...b.map(w=>w.hit)]}}let l,c=a;if(e.mode==="even")l=Array.from({length:s},(h,m)=>n+Math.round((a-n)*m/s));else{const h=60/(e.bpm&&e.bpm>0?e.bpm:120)/(e.perBeat??1)*o;l=[];for(let m=0;m<We&&n+m*h<a-i;m++)l.push(n+Math.round(m*h));l.length>=We&&(c=Math.min(a,n+Math.round(We*h)))}const d=e.snap===!1?0:Math.round(eg*o),u=d?os(t,tg):[];return{cuts:[...l.map((h,m)=>{if(m===0||!d)return h;let b=h,w=d+1;for(const f of u){const g=Math.abs(f.hit-h);g<=d&&g<w&&(w=g,b=f.cut)}return b}),c],hits:l}}function ng(t,e){const n=t.to-t.from;if(e<2||n<64)return[];const o=vc(t,{mode:"transients",sensitivity:.5,count:e}).cuts.slice(1,-1).map(i=>(i-t.from)/n).filter(i=>i>.001&&i<.999);for(let i=1;o.length<e-1&&i<e;i++){const s=i/e;o.every(l=>Math.abs(l-s)>.5/e)&&o.push(s)}for(let i=1;o.length<e-1;i++)o.push(i/(e+1));return o.sort((i,s)=>i-s).slice(0,e-1)}function ag(t){const e=i=>Math.round(i*10)/10;if(t.fit>0&&t.seconds>0)return{bpm:e(t.fit*240/t.seconds),known:!0,from:"from its Fit"};if(t.given>0)return{bpm:t.given,known:!0,from:t.givenFrom??"from the take"};const n=pc(t.name);if(n)return{bpm:n,known:!0,from:"from its name"};const a=hc(t.seconds,t.studioBpm);if(a)return{bpm:e(a*240/t.seconds),known:!0,from:"the Studio's"};const o=og(t.seconds);return o?{bpm:o.bpm,known:!1,from:"guessed from its length"}:{bpm:t.studioBpm,known:!1,from:"the Studio's"}}function og(t,e=[]){let n=null;for(const a of[1,2,4,8]){const o=a*4*60/t;if(o<70||o>180)continue;const i=60/o/4,l=(e.length?e.reduce((c,d)=>c+Math.abs(d/i-Math.round(d/i)),0)/e.length:0)+Math.abs(o-110)/2e3;(!n||l<n.score)&&(n={bpm:o,bars:a,score:l})}return n?{bpm:Math.round(n.bpm*10)/10,bars:n.bars}:null}function Ti(t,e,n){const a=60/n/4*e,o=t.cuts[0],i=(t.cuts[t.cuts.length-1]-o)/a,s=Math.max(1,Math.ceil(i/te-.06)),l=new Set;return{positions:t.hits.map(d=>{const u=Math.max(0,Math.round((d-o)/a));return l.has(u)?-1:(l.add(u),u)}),bars:s>8?0:s}}function xc(t,e,n){const{positions:a}=Ti(t,e,n),o=a.map(i=>i>=0);return{cuts:t.cuts.filter((i,s)=>s===t.cuts.length-1||o[s]),hits:t.hits.filter((i,s)=>o[s])}}const ig=.006;function rg(t,e,n,a=ig){const o=60/n/4*e,i=t.cuts[0]??0,s=t.cuts[t.cuts.length-1]??0,l=a*e,c=[...t.cuts],d=[...t.hits];for(let u=1;u<d.length;u++){const p=d[u]??0,h=i+Math.round(Math.round((p-i)/o)*o);Math.abs(p-h)<=l&&h>i&&h<s&&(c[u]=h,d[u]=h)}return xc({cuts:c,hits:d},e,n)}function sg(t,e){return t.cuts.length-1<=e?t:{cuts:[...t.cuts.slice(0,e),t.cuts[t.cuts.length-1]],hits:t.hits.slice(0,e)}}function lg(t){return t.replace(/\.[a-z0-9]{2,4}$/i,"").split(/[\s_\-.()[\],+&]+/).filter(Boolean).filter((a,o,i)=>!/^\d{2,3}bpm$/i.test(a)&&!/^bpm\d{2,3}$/i.test(a)&&!/^bpm$/i.test(a)&&!(/^[1-9]\d{1,2}$/.test(a)&&Number(a)>=50&&Number(a)<=200)&&!(/^\d{2,3}$/.test(a)&&/^bpm$/i.test(i[o+1]??""))&&!/^[A-G](?:#|b|s|sharp|flat)?(?:m|min|maj|minor|major)?$/.test(a)).join(" ").trim()||"Loop"}function Kn(t,e){const n=String(e+1);return`${t.slice(0,23-n.length).trim()} ${n}`}function cg(t,e,n){const a=new Set(t.filter((o,i)=>(i<e||i>=e+n)&&o.sample&&o.choke).map(o=>o.choke));for(const o of[4,3,2,1])if(!a.has(o))return o;return 0}function dg(t,e,n){const a=Math.min(e.cuts.length-1,V-n.first),o=n.playBack?Ti(e,n.sampleRate,n.playBack.bpm):null,i=Math.round(Zm*n.sampleRate),s=[];for(let l=0;l<a;l++){const c=n.first+l,d=t.pads[c];if(!d)continue;const u=l<a-1?Math.min(n.frames,e.cuts[l+1]+i):e.cuts[l+1];if(Object.assign(d,{name:Kn(n.stem,l),sample:n.sample,mode:"oneshot",dir:"fwd",start:e.cuts[l]/n.frames,end:u/n.frames,slices:0,cuts:[],tune:0,fine:0,fit:0,attack:0,decay:4,cutoff:0,resonance:0,level:n.source?.level??.8,pan:0,choke:n.choke??0,provenance:n.source?.provenance?structuredClone(n.source.provenance):null,normalize:n.source?.normalize?{...n.source.normalize}:null,offsetDb:n.source?.offsetDb??0,follow:!1,note:n.source?.note??0}),o?.bars){const p=t.lanes[c];p.length=te,p.steps=Array.from({length:te},()=>An());const h=o.positions[l];if(h!==void 0&&h>=0){const m=p.steps[h%te];m.on=!0;const b=o.bars>1?`${Math.floor(h/te)+1}:${o.bars}`:"always";m.cond=sa.includes(b)?b:"always"}}s.push(c)}return s}const kc=827873614,ug=60;async function pg(t,e){const n=new Float64Array([e,t.length,t[0]?.length??0]),a=[new Uint8Array(n.buffer),...t.map(c=>new Uint8Array(c.buffer))],o=a.reduce((c,d)=>c+d.byteLength,0),i=new Uint8Array(o);let s=0;for(const c of a)i.set(c,s),s+=c.byteLength;const l=new Uint8Array(await crypto.subtle.digest("SHA-256",i));return Array.from(l.subarray(0,16),c=>c.toString(16).padStart(2,"0")).join("")}function hg(t){const e=t.data[0]?.length??0,n=new Uint8Array(16+e*4*t.data.length);return new Uint32Array(n.buffer,0,4).set([kc,t.sampleRate,t.data.length,e]),t.data.forEach((a,o)=>{n.set(new Uint8Array(a.buffer,a.byteOffset,e*4),16+o*e*4)}),n}function fg(t,e){if(e.byteLength<16)return null;const[n,a,o,i]=new Uint32Array(e,0,4);if(n!==kc||!o||o>2||e.byteLength!==16+i*4*o)return null;const s=Array.from({length:o},(l,c)=>new Float32Array(e.slice(16+c*i*4,16+(c+1)*i*4)));return{hash:t,data:s,sampleRate:a,channels:o,frames:i}}class mg{constructor(e="nyx"){this.folderName=e}memory=new Map;dir=null;folder(){return this.dir??=(async()=>{try{const e=await navigator.storage?.getDirectory?.();return e?await e.getDirectoryHandle(this.folderName,{create:!0}):null}catch{return null}})(),this.dir}info(e){return this.memory.get(e)}held(e){return this.memory.get(e)}async put(e,n){const a=await pg(e,n),o={hash:a,data:e,sampleRate:n,channels:e.length,frames:e[0]?.length??0};this.memory.set(a,o);const i=await this.folder();if(!i)return{sample:o,saved:!1};try{const l=await(await i.getFileHandle(`${a}.f32`,{create:!0})).createWritable?.();return l?(await l.write(hg(o)),await l.close(),{sample:o,saved:!0}):{sample:o,saved:!1}}catch{return{sample:o,saved:!1}}}async get(e){const n=this.memory.get(e);if(n)return n;const a=await this.folder();if(!a)return null;try{const o=await(await a.getFileHandle(`${e}.f32`)).getFile(),i=fg(e,await o.arrayBuffer());return i&&this.memory.set(e,i),i}catch{return null}}async prune(e){for(const a of[...this.memory.keys()])e.has(a)||this.memory.delete(a);const n=await this.folder();if(n)try{const a=[];for await(const o of n.keys())a.push(o);for(const o of a){const i=o.replace(/\.f32$/,"");o.endsWith(".f32")&&!e.has(i)&&await n.removeEntry(o)}}catch{}}}function $c(t){const e=Math.min(t.length,Math.round(ug*t.sampleRate));return{data:Array.from({length:Math.min(2,t.numberOfChannels)},(a,o)=>{const i=new Float32Array(e);return i.set(t.getChannelData(o).subarray(0,e)),i}),trimmed:e<t.length}}function is(t,e=200){const n=t[0]?.length??0,a=[];if(!n)return a;const o=n/e;for(let i=0;i<e;i++){const s=Math.floor(i*o),l=Math.max(s+1,Math.floor((i+1)*o));let c=0,d=0;const u=Math.max(1,Math.floor((l-s)/256));for(let p=s;p<l&&p<n;p+=u){let h=0;for(const m of t)h+=m[p]??0;h/=t.length,h<c&&(c=h),h>d&&(d=h)}a.push(Math.max(-1,c),Math.min(1,d))}return a}function Oo(t=bg()){try{const e=JSON.parse(t?.getItem("lucy.state")??"null");return Array.isArray(e?.takes)?e.takes.flatMap(n=>{const a=n&&typeof n=="object"?n:{},o=i=>typeof a[i]=="number"&&Number.isFinite(a[i])?a[i]:0;return a.saved!==!0||!o("id")||!o("frames")||!o("sampleRate")?[]:[{id:o("id"),bars:o("bars"),bpm:o("bpm"),sampleRate:o("sampleRate"),channels:Math.min(2,Math.max(1,o("channels"))),frames:o("frames")}]}):[]}catch{return[]}}async function gg(t){try{const e=await navigator.storage?.getDirectory?.();if(!e)return null;const a=await(await(await e.getDirectoryHandle("lucy")).getFileHandle(`lucy-take-${t.id}.f32`)).getFile(),o=new Float32Array(await a.arrayBuffer());return o.length<t.frames*t.channels?null:Array.from({length:t.channels},(i,s)=>o.slice(s*t.frames,(s+1)*t.frames))}catch{return null}}function bg(){try{return globalThis.localStorage??null}catch{return null}}const yg=150,Ec=96*1024*1024,wg=t=>Math.round(t*10)/10;function vg(t,e,n){if(!t.sample||!t.fit||!t.keepPitch||!e)return null;const[a,o]=lc(t,e,null);if(o-a<2)return null;const i=wg(n);return{sample:t.sample,from:a,to:o,bars:t.fit,bpm:i,semitones:t.tune+t.fine/100,sampleRate:e.sampleRate,frames:cc(t.fit,i,e.sampleRate)}}function St(t){return`${t.sample}:${t.from}-${t.to}:${t.bars}:${t.bpm.toFixed(1)}:${Math.round(t.semitones*100)}`}const xg=t=>`stretch:${t}`,kg=t=>t.startsWith("stretch:");class $g{constructor(e=Ec,n=()=>{}){this.maxBytes=e,this.drop=n}map=new Map;bytes=0;get size(){return this.map.size}has(e){return this.map.has(e)}get(e){const n=this.map.get(e);return n&&(this.map.delete(e),this.map.set(e,n)),n}byId(e){for(const n of this.map.values())if(n.sample===e)return n}put(e,n=new Set){const a=this.map.get(e.key);a&&(this.bytes-=a.bytes),this.map.delete(e.key),this.map.set(e.key,e),this.bytes+=e.bytes;for(const[o,i]of this.map){if(this.bytes<=this.maxBytes)break;o===e.key||n.has(o)||(this.map.delete(o),this.bytes-=i.bytes,this.drop(i))}}}class Eg{constructor(e,n=Ec){this.host=e,this.cache=new $g(n,a=>e.drop(a))}cache;current=new Map;wanted=new Map;inFlight=new Set;timer=null;queue=Promise.resolve();missingSig="";renders=0;lastMs=0;failed=!1;plan(e,n,a){this.wanted.clear();const o=[];e.forEach((c,d)=>{const u=c.sample?n(c.sample):void 0,p=vg(c,u,a),h=this.current.get(d);if(!p){this.current.delete(d);return}this.wanted.set(d,p);const m=St(p),b=this.cache.get(m);b?this.current.set(d,b):(h&&!Ag(h.job,p)&&this.current.delete(d),this.inFlight.has(m)||o.push(m))});const i=o.join("|");if(!o.length||this.failed){this.missingSig="";return}if(i===this.missingSig&&this.timer!==null)return;this.missingSig=i;const s=this.host.clearTimeout??(c=>clearTimeout(c)),l=this.host.setTimeout??((c,d)=>setTimeout(c,d));this.timer!==null&&s(this.timer),this.timer=l(()=>{this.timer=null,this.missingSig="",this.renderWanted()},yg)}stretchedFor(e){return this.current.get(e)}renderFor(e){return this.current.get(e)}pending(e){const n=this.wanted.get(e);return n?this.current.get(e)?.key!==St(n):!1}renderWanted(){for(const e of new Map([...this.wanted.values()].map(n=>[St(n),n])).values()){const n=St(e);this.cache.has(n)||this.inFlight.has(n)||(this.inFlight.add(n),this.queue=this.queue.then(()=>this.renderOne(n,e)))}}idle(){return this.queue}async renderOne(e,n){if(![...this.wanted.values()].some(s=>St(s)===e)){this.inFlight.delete(e);return}const a=Date.now();let o=null;try{o=await this.host.run(n)}catch(s){console.error("NYX stretch",s)}if(this.inFlight.delete(e),!o){this.failed=!0,this.host.changed();return}this.lastMs=Date.now()-a,this.renders++;const i={key:e,job:n,sample:xg(e),frames:n.frames,bytes:o.reduce((s,l)=>s+l.byteLength,0)};this.host.deliver(i,o);for(const[s,l]of this.wanted)St(l)===e&&this.current.set(s,i);this.cache.put(i,new Set([...this.current.values()].map(s=>s.key))),this.host.changed()}}const Ag=(t,e)=>t.sample===e.sample&&t.from===e.from&&t.to===e.to,Sg=48e3;function Ac(t,e){try{const n=t?.latency?.(e);return typeof n=="number"&&Number.isFinite(n)&&n>0&&n<=Sg?Math.round(n):0}catch{return 0}}function Mg(t,e){return{from:t.from+e,to:t.to+e}}const Lg="instance",Tg=99;function Sa(t=typeof location>"u"?"":location.search){const e=new URLSearchParams(t).get(Lg)?.trim()??"";if(!/^\d+$/.test(e))return 1;const n=Number(e);return n>=2&&n<=Tg?n:1}function Cg(t,e){return e===1?t:`${t}#${e}`}function Ng(t,e){return e===1?t:`${t} ${e}`}let Mt;function Fg(t,e=Sa()){if(Mt!==void 0)return Mt;Mt=null;try{if(typeof window>"u"||window.parent===window)return Mt;const n=window.parent.ncStudio;n&&n.version===1&&(Mt=n.attach(t,{instance:e}))}catch{}return Mt}function zg(){let t;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(t=a.syncScope)}}catch{}if(!t)return{};const e=`/studio/${t}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:n?{request:(a,o,i)=>n.request(`${a}${e}`,o,i)}:null}}function Pg(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t&&t.version===1&&typeof t.fxWorklet=="string"&&t.fxWorklet?t.fxWorklet:null}catch{return null}}function Je(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.grab?t.grab:null}catch{return null}}function jt(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.play?t.play:null}catch{return null}}function wn(t,e=Sa()){return e>1?`${t}#${e}`:t}function Dg(t,e=Sa()){const n=jt()?.owner()??null;return n===null||n==="studio"||n===wn(t,e)}const rs=48;function Bg(t){const e=[];for(const n of t.points().slice(-64))e.push(n.beat,n.root===null?Number.NaN:n.root);return{type:"follow",points:e,transpose:t.route?.transpose??0}}function Og(t){const e=Math.trunc((t.transpose??0)/12);return e?`Root, ${e>0?"+":"−"}${Math.abs(e)} oct`:"Root"}function qg(t,e){const n=t;if(typeof n?.notesIn!="function")return null;const a=new bm,o=new Set;let i=-1,s="",l=!1;const c=()=>{l=!1;const u=JSON.stringify(a.route),p=u!==s;if(!p&&a.version===i)return;s=u;const h=a.points();h.length>rs&&a.prune(h[h.length-rs].beat),i=a.version,e(Bg(a));for(const m of[...o])m(p)};try{n.notesIn(u=>{a.receive(u),l||(l=!0,queueMicrotask(c))},{takes:"pitch"})}catch{return null}const d=u=>{const p=a.route?.source;if(!p||typeof u!="function")return!1;try{return u.call(n,p),!0}catch{return!1}};return{follower:a,route:()=>a.route,resend(){i=-1,c()},takeBack:()=>d(n.notesTakeBack),open:()=>d(n.showInstance),onChange(u){o.add(u)}}}class Rg{constructor(e){this.make=e}worker=null;seq=0;calls=new Map;cache=new Map;times=[];workerNow(){if(this.worker||!this.make)return this.worker;try{const e=this.make();e.onmessage=n=>{const a=n.data;this.calls.get(a.id)?.(a),this.calls.delete(a.id)},e.onerror=n=>{for(const a of this.calls.values())a({error:n.message||"worker failed"});this.calls.clear()},this.worker=e}catch{this.worker=null}return this.worker}analysis(e,n,a,o,i){const s=`${e}:${o}:${i}`;let l=this.cache.get(s);return l||(l=this.run(n,a,o,i),this.cache.set(s,l),l.catch(()=>this.cache.delete(s)),this.cache.size>16&&this.cache.delete(this.cache.keys().next().value),l)}run(e,n,a,o){const i=this.workerNow();if(!i)return Promise.resolve(as(e,n,a,o));const s=++this.seq;return new Promise(l=>{this.calls.set(s,c=>{c.analysis?(c.ms!==void 0&&this.times.push(c.ms),l(c.analysis)):l(as(e,n,a,o))}),i.postMessage({id:s,channels:e.map(c=>c.slice(a,o)),sampleRate:n,from:a})})}}function R(t,e={},...n){const a=document.createElement(t);for(const[o,i]of Object.entries(e))a.setAttribute(o,i);return a.append(...n),a}const He=(t,e)=>I(t,B(e),t),Ig=[{value:"transients",label:"At hits"},{value:"even",label:"Even"},{value:"beats",label:"Beats"}];class jg{constructor(e){this.host=e,this.canvas=R("canvas",{class:"nyx-chop-wave",role:"img","aria-label":"The slices","data-nyx-chop":"wave"}),He(this.canvas,"chop:wave"),this.canvas.addEventListener("click",o=>this.clickWave(o)),this.title=R("span",{class:"nc-readout nyx-chop-name","data-nyx-chop":"name"});const n=R("button",{type:"button",class:"nc-btn nyx-chop-close","data-nyx-chop":"close"},"Close");He(n,"chop:close"),n.addEventListener("click",()=>this.host.close()),this.body=R("div",{class:"nyx-chop-body"});const a=R("span",{class:"nc-label"},"Chop to pads");this.el=R("div",{class:"nyx-chop",role:"region","aria-label":"Chop to pads","data-nyx-chop":""},R("div",{class:"nyx-chop-head"},a,this.title,n),R("div",{class:"nyx-chop-wavebox"},this.canvas),this.body),typeof ResizeObserver<"u"&&new ResizeObserver(()=>this.paintWave()).observe(this.canvas)}el;isOpen=!1;src=null;analysisOf=null;mode="transients";sensitivity=.5;count=16;perBeat=2;first=0;playBack=!0;choke=!0;snap=!0;moreOpen=!1;result=null;status="";canvas;body;title;async open(){const e=await this.host.source();if(!e)return!1;this.isOpen=!0,this.src=e,this.first=e.pad,this.playBack=e.tempo.known,this.analysisOf=null,this.result=null,this.status="Finding the hits…",this.render();const n=await this.host.analysis(e);return this.src!==e||(this.analysisOf=n,this.status="",this.run()),!0}close(){this.isOpen=!1,this.src=null,this.analysisOf=null}set(e){Object.assign(this,e),this.run()}get preview(){return{chop:this.result,first:this.first,playBack:this.playBack,choke:this.choke,bpm:this.src?.tempo.bpm??0}}run(){this.compute(),this.render()}compute(){const e=this.src,n=this.analysisOf;if(!e||!n)return;const a=V-this.first;let o=vc(n,{mode:this.mode,sensitivity:this.sensitivity,count:Math.min(this.count,a),bpm:e.tempo.bpm,perBeat:this.perBeat,snap:this.snap});this.playBack&&(o=this.mode==="transients"&&e.tempo.known?rg(o,e.sampleRate,e.tempo.bpm):xc(o,e.sampleRate,e.tempo.bpm)),this.result=sg(o,a)}field(e,n,a,o=""){const i=R("label",{class:"nc-label",for:`nyx-chop-${e}`},n);return He(i,`chop:${e}`),R("div",{class:"nc-field","data-nc-row":"","data-nc-id":`chop-${e}`},i,R("span",{class:"nc-readout","data-nc-readout":""},o),a)}choices(e,n,a,o,i){const s=R("div",{class:"nc-choice-row",role:"tablist","aria-label":n,id:`nyx-chop-${e}`,"data-nyx-chop":e});for(const c of o){const d=R("button",{type:"button",class:"nc-choice",role:"tab","aria-selected":String(c.value===a),"data-nc-choice":c.value},c.label);He(d,B(`chop:${e}:${c.value}`)?`chop:${e}:${c.value}`:`chop:${e}`),c.disabled&&(d.disabled=!0),d.addEventListener("click",()=>i(c.value)),s.append(d)}const l=R("span",{class:"nc-label"},n);return He(l,`chop:${e}`),R("div",{class:"nc-field nyx-chop-choice","data-nc-row":"","data-nc-id":`chop-${e}`},l,s)}select(e,n,a,o){const i=R("select",{class:"nc-select",id:`nyx-chop-${e}`,"data-nyx-chop":e});for(const s of a)i.append(R("option",{value:s.value},s.label));return i.value=n,i.addEventListener("change",()=>o(i.value)),i}onOff(e,n,a,o,i=!1){return this.choices(e,n,a?"on":"off",[{value:"on",label:"On",disabled:i},{value:"off",label:"Off",disabled:i}],s=>o(s==="on"))}render(){const e=this.src;if(!e)return;const n=(e.to-e.from)/e.sampleRate;this.title.textContent=`${e.stem} · ${n<10?n.toFixed(2):n.toFixed(1)} s`;const a=this.result,o=[];if(o.push(this.choices("mode","Chop",this.mode,Ig,h=>{this.mode=h,this.run()})),this.mode==="transients"){const h=R("input",{type:"range",class:"nc-range",id:"nyx-chop-sensitivity",min:"0",max:"1",step:"0.01","data-nyx-chop":"sensitivity"});h.value=String(this.sensitivity);const m=this.field("sensitivity","Sensitivity",h,`${Math.round(this.sensitivity*100)}%`);h.addEventListener("input",()=>{this.sensitivity=Number(h.value),this.compute();const b=m.querySelector(".nc-readout");b&&(b.textContent=`${Math.round(this.sensitivity*100)}%`),this.paintWave()}),h.addEventListener("change",()=>this.render()),m.setAttribute("data-nc-slider",""),m.append(m.querySelector(".nc-readout")),o.push(m)}if(this.mode!=="beats")o.push(this.field("count","Slices",this.select("count",String(this.count),[16,8,4].map(h=>({value:String(h),label:this.mode==="transients"?`Up to ${h}`:String(h)})),h=>{this.count=Number(h),this.run()})));else{const h=m=>Math.ceil(n*e.tempo.bpm/60*m-.05);o.push(this.choices("every","Every",String(this.perBeat),[{value:"1",label:"Beat",disabled:h(1)>We},{value:"2",label:"1/8",disabled:h(2)>We},{value:"4",label:"1/16",disabled:h(4)>We}],m=>{this.perBeat=Number(m),this.run()}))}o.push(this.field("first","Fill from",this.select("first",String(this.first),Array.from({length:V},(h,m)=>({value:String(m),label:`Pad ${m+1}`})),h=>{this.first=Number(h),this.run()})));const i=a?Ti(a,e.sampleRate,e.tempo.bpm):null,s=i!==null&&i.bars===0;if(o.push(this.onOff("play-back","Play it back",this.playBack&&!s,h=>{this.playBack=h,this.run()},s)),this.status&&o.push(R("p",{class:"nc-note","data-nyx-chop":"status"},this.status)),a&&i){const h=a.cuts.length-1,m=this.first+h,b=h>1?`${Kn(e.stem,0)} to ${Kn(e.stem,h-1)}`:Kn(e.stem,0),w=this.playBack&&i.bars?` Play it back writes ${i.bars===1?"a bar":`${i.bars} bars`} on their lanes.`:s?" Longer than 8 bars: no Play it back.":"";o.push(R("p",{class:"nc-note","data-nyx-chop":"summary"},`${h} slices onto pads ${this.first+1}–${m}: ${b}.${w}`));const f=this.host.pads().slice(this.first,m).filter((g,y)=>g.sample&&this.first+y!==e.pad).length;f&&o.push(R("p",{class:"nc-note nyx-chop-warn","data-nyx-chop":"warn"},`${f===1?"1 of those pads has a sound":`${f} of those pads have sounds`}. Chop replaces ${f===1?"it":"them"}; Undo puts ${f===1?"it":"them"} back.`))}const l=R("div",{class:"nc-group","data-nc-id":"chop-more","data-nc-open":String(this.moreOpen)}),c=R("button",{type:"button",class:"nc-group-toggle","aria-expanded":String(this.moreOpen),"data-nyx-chop":"more"},R("span",{class:"nc-group-title"},"More"),R("span",{class:"nc-group-summary"},`${e.tempo.bpm} BPM · choke ${this.choke?"on":"off"}${this.mode!=="transients"?` · snap ${this.snap?"on":"off"}`:""}`),R("span",{class:"nc-group-mark","aria-hidden":"true"},this.moreOpen?"−":"+"));He(c,"chop:more"),c.addEventListener("click",()=>{this.moreOpen=!this.moreOpen,this.render()});const d=R("div",{class:"nc-group-body",role:"group"});d.hidden=!this.moreOpen;const u=R("div",{class:"nc-field","data-nc-row":"","data-nc-id":"chop-tempo"},R("span",{class:"nc-label"},"Tempo"),R("span",{class:"nc-readout","data-nc-readout":""},`${e.tempo.bpm} BPM, ${e.tempo.from}`));He(u.firstElementChild,"chop:tempo"),d.append(u,this.onOff("choke","Choke",this.choke,h=>{this.choke=h,this.render()})),this.mode!=="transients"&&d.append(this.onOff("snap","Snap to hits",this.snap,h=>{this.snap=h,this.run()})),l.append(c,d),o.push(l);const p=R("button",{type:"button",class:"nc-btn nyx-chop-go","data-nyx-chop":"go"},"Chop to pads");He(p,"chop:go"),p.disabled=!a,p.addEventListener("click",()=>{this.src&&this.result&&this.host.apply(this.src,this.result,{first:this.first,playBack:this.playBack&&!s,choke:this.choke,bpm:this.src.tempo.bpm})}),o.push(p),this.body.replaceChildren(...o),this.paintWave()}clickWave(e){const n=this.src,a=this.result;if(!n||!a)return;const o=this.canvas.getBoundingClientRect(),i=n.from+(e.clientX-o.left)/Math.max(1,o.width)*(n.to-n.from);for(let s=0;s<a.cuts.length-1;s++)if(i>=a.cuts[s]&&i<a.cuts[s+1]){this.host.audition(n,a.cuts[s],a.cuts[s+1]);return}}paintWave(){const e=this.src,n=this.canvas,a=n.clientWidth,o=n.clientHeight;if(!e||!a||!o)return;const i=window.devicePixelRatio||1;n.width=Math.round(a*i),n.height=Math.round(o*i);const s=n.getContext("2d");if(!s)return;s.scale(i,i);const l=getComputedStyle(this.el),c=x=>l.getPropertyValue(x).trim(),d=c("--nc-ui-accent"),u=c("--nc-ui-accent-soft")||c("--nc-ui-divider"),p=c("--nc-ui-color-accent-pad")||c("--nc-ui-text-sub"),h=c("--nc-ui-font-readout")||"monospace",m=this.result;s.clearRect(0,0,a,o);const b=Math.max(1,e.to-e.from),w=x=>(x-e.from)/b*a,f=16,g=f+(o-f)/2,y=(o-f)/2-2;if(m)for(let x=1;x<m.cuts.length-1;x+=2)s.fillStyle=u,s.fillRect(w(m.cuts[x]),f,w(m.cuts[x+1])-w(m.cuts[x]),o-f);s.fillStyle=p;const v=b/a;for(let x=0;x<a;x++){const k=Math.floor(e.from+x*v),$=Math.min(e.to,Math.floor(e.from+(x+1)*v));let E=0,S=0;const T=Math.max(1,Math.floor(($-k)/64));for(let _=k;_<$;_+=T){let H=0;for(const ce of e.data)H+=ce[_]??0;H/=e.data.length||1,H<E&&(E=H),H>S&&(S=H)}s.fillRect(x,g-S*y,1,Math.max(1,(S-E)*y))}if(m){s.fillStyle=d,s.strokeStyle=d,s.lineWidth=1,s.font=`600 10px ${h}`,s.textBaseline="top";for(let x=0;x<m.cuts.length-1;x++){const k=Math.round(w(m.cuts[x]))+.5;s.beginPath(),s.moveTo(k,f-2),s.lineTo(k,o),s.stroke();const $=String(this.first+x+1);w(m.cuts[x+1])-w(m.cuts[x])>s.measureText($).width+6&&s.fillText($,k+3,1)}}}attach(e){if(!this.isOpen||!e){this.el.isConnected&&this.el.remove();return}e.nextElementSibling!==this.el&&e.after(this.el),this.paintWave()}}const ss="My samples";function Ka(t){return t.permission?"used with permission":t.licenseStatus==="redistributable"?"shareable licence":t.licenseStatus==="personal"?"personal use":"licence unknown: personal use"}const ls="http://www.w3.org/2000/svg";function z(t,e={},...n){const a=document.createElement(t);for(const[o,i]of Object.entries(e))a.setAttribute(o,i);return a.append(...n),a}function Jt(t,e,n={}){return t?z("a",{href:t,target:"_blank",rel:"noopener noreferrer",...n},e):z("span",n,e)}function _g(t){const e=Hg(t);if(!e.length)return"M0 1H48";const n=e.map(s=>Math.sqrt(Math.max(0,s))),a=n.length,o=n.map((s,l)=>`${(l+.5)*48/a} ${1-Math.max(.04,s)*.96}`),i=[...n].map((s,l)=>`${(l+.5)*48/a} ${1+Math.max(.04,s)*.96}`).reverse();return`M0 1L${o.join("L")}L48 1L${i.join("L")}Z`}function Hg(t){let e=-1;for(let n=t.length-1;n>=0;n--)if((t[n]??0)>0){e=n;break}return e<0?[]:t.slice(0,Math.min(t.length,Math.max(8,e+2)))}function Wg(t){const e=document.createElementNS(ls,"svg");e.setAttribute("viewBox","0 0 48 2"),e.setAttribute("preserveAspectRatio","none"),e.setAttribute("class","nyx-lib-wave"),e.setAttribute("aria-hidden","true");const n=document.createElementNS(ls,"path");return n.setAttribute("d",_g(t)),e.append(n),e}function Ug(t){return t<1?`${t.toFixed(2)} s`:t<10?`${t.toFixed(1)} s`:`${Math.round(t)} s`}const Gg={kick:"Kick",snare:"Snare",clap:"Clap",hat:"Hat",tom:"Tom",perc:"Perc",cymbal:"Cymbal",fx:"FX",tonal:"Tonal"};class Yg{constructor(e){this.host=e,this.input=z("input",{type:"search",class:"nyx-lib-input",id:"nyx-library-ask",placeholder:"punchy kick, dusty funk kit",autocomplete:"off",spellcheck:"false",enterkeyhint:"search","aria-label":"Ask the Library","data-nyx-lib":"ask"});const n=z("label",{class:"nc-label",for:"nyx-library-ask"},"Ask");I(n,B("library:ask"),this.input),this.input.addEventListener("input",()=>this.schedule()),this.input.addEventListener("keydown",i=>{i.key==="Enter"?(i.preventDefault(),this.run()):i.key==="Escape"&&(i.preventDefault(),this.host.close())});const a=z("button",{type:"button",class:"nc-btn nyx-lib-close","data-nyx-lib":"close"},"Close");I(a,B("library:close"),a),a.addEventListener("click",()=>this.host.close()),this.forLine=z("p",{class:"nc-note nyx-lib-for","data-nyx-lib":"for"}),this.status=z("p",{class:"nc-note nyx-lib-status","data-nyx-lib":"status","aria-live":"polite"}),this.list=z("ul",{class:"nyx-lib-results","data-nyx-lib":"results"}),this.kitBtn=z("button",{type:"button",class:"nc-btn","data-nyx-lib":"kit"},"Build kit"),I(this.kitBtn,B("library:kit"),this.kitBtn),this.kitBtn.addEventListener("click",()=>void this.buildKit()),this.creditsBtn=z("button",{type:"button",class:"nc-btn","data-nyx-lib":"credits","aria-expanded":"false"},"Credits"),I(this.creditsBtn,B("library:credits"),this.creditsBtn),this.creditsBtn.addEventListener("click",()=>{this.creditsOpen=!this.creditsOpen,this.render()}),this.creditsEl=z("div",{class:"nyx-lib-credits",id:"nyx-library-credits","data-nyx-lib":"credits-list"}),this.creditsBtn.setAttribute("aria-controls",this.creditsEl.id),this.sourcesEl=z("div",{class:"nyx-lib-sources",role:"group","aria-label":"Library source","data-nyx-lib":"sources"}),this.fileInput=z("input",{type:"file",hidden:"","data-nyx-lib":"folder-input","aria-label":"Open a local Library folder"}),this.fileInput.webkitdirectory=!0,this.fileInput.multiple=!0,this.fileInput.addEventListener("change",()=>{const i=this.fileInput.files;i?.length&&this.host.local?.openFiles(i),this.fileInput.value=""});const o=this.host.local;if(o){let i=o.state.status;o.onChange(()=>{const s=o.state.status;s==="ready"&&i!=="ready"&&(this.source="local"),s!=="ready"&&this.source!=="shelf"&&s!=="opening"&&(this.source="shelf"),i=s,this.isOpen?this.run():this.render()})}this.el=z("div",{class:"nyx-library",role:"region","aria-label":"Library","data-nyx-library":""},z("div",{class:"nyx-lib-ask"},n,this.input,a),this.sourcesEl,this.fileInput,this.forLine,this.list,this.status,z("div",{class:"nyx-lib-actions"},this.kitBtn,this.creditsBtn),this.creditsEl)}el;input;forLine;status;list;kitBtn;creditsBtn;creditsEl;sourcesEl;fileInput;source="shelf";lib=null;loading=null;failed=!1;query=null;hits=[];kit=[];playing=null;busy=null;creditsOpen=!1;message="";timer=null;isOpen=!1;open(e){this.isOpen=!0,e!==void 0&&(this.input.value=e),this.ensure().then(()=>this.run()),this.render()}closePanel(){this.isOpen=!1,this.host.stopPreview(),this.playing=null}focus(){this.input.focus()}get catalog(){const e=this.host.local?.lib??null;return e?Ur(zt,this.lib,e):this.lib}catalogFor(e){return e==="local"?this.host.local?.lib??null:this.lib}active(){const e=this.host.local?.lib??null;return this.source==="local"?e:this.source==="all"?e||this.lib?Ur("All",this.lib,e):null:this.lib}choose(e){e!=="shelf"&&!this.host.local?.lib||(this.source=e,this.run())}openFolder(){const e=this.host.local;e&&(e.canRemember?e.pick():this.fileInput.click())}ensure(){return this.lib?Promise.resolve(this.lib):(this.loading??=this.host.catalog().then(e=>(this.lib=e,this.failed=!1,this.render(),e),()=>(this.failed=!0,this.loading=null,this.render(),null)),this.render(),this.loading)}schedule(){this.timer&&clearTimeout(this.timer),this.timer=setTimeout(()=>this.run(),150)}run(){this.timer&&clearTimeout(this.timer),this.timer=null;const e=this.input.value;if(this.message="",!this.lib&&this.source!=="local"&&!this.failed&&(this.ensure().then(a=>a&&this.run()),this.source==="shelf"))return;const n=this.active();!n||!e.trim()?(this.query=null,this.hits=[],this.kit=[]):(this.query=Fo(e,n),this.kit=this.query.kit?Kr(n,this.query):[],this.hits=this.query.kit?[]:Tf(n,this.query,{limit:Wl})),this.render()}get results(){return{kit:!!this.query?.kit,ids:this.query?.kit?this.kit.map(e=>e.sound.id):this.hits.map(e=>e.sound.id),unknown:this.query?.unknown??[]}}async play(e){if(this.playing===e.id){this.host.stopPreview(),this.playing=null,this.render();return}this.playing=e.id,this.render();try{await this.host.preview(e)}finally{this.playing===e.id&&(this.playing=null,this.render())}}async load(e){if(!this.busy){this.busy=e.id,this.render();try{await this.host.load(e,this.input.value)}finally{this.busy=null,this.render()}}}async chopSound(e){if(!(this.busy||!this.host.chop)){this.busy=e.id,this.render();try{await this.host.chop(e,this.input.value)}finally{this.busy=null}}}async buildKit(){if(this.busy)return;this.source!=="local"&&!this.lib&&await this.ensure();const e=this.active();if(!e)return;const n=this.input.value,a=Fo(n,e),o=Kr(e,{...a,roles:[],kit:!0});if(!o.length){this.message="The Library has nothing for a kit yet.",this.render();return}this.busy="kit",this.render();try{await this.host.buildKit(o,n)}finally{this.busy=null,this.render()}}row(e,n){const a=this.playing===e.id,o=z("button",{type:"button",class:"nyx-lib-play","data-nyx-lib":"play","aria-label":`${a?"Stop":"Play"} ${e.title}`,"aria-pressed":String(a)},a?"■":"▶");I(o,B("library:play"),o),o.addEventListener("click",()=>void this.play(e));const i=this.busy===e.id,s=z("button",{type:"button",class:"nc-btn nyx-lib-load","data-nyx-lib":"load","aria-label":`Load ${e.title} onto ${this.host.target().title}`},i?"Loading…":"Load");this.busy&&(s.disabled=!0),I(s,B("library:load"),s),s.addEventListener("click",()=>void this.load(e));const l=Jt(e.licenseUrl,hi(e.license,e.licenseStatus,e.permission),{class:"nyx-lib-badge","data-nyx-lib":"badge",title:e.origin==="local"?`${e.license}: ${Ka(e)}`:e.license});I(l,B("library:badge"));const c=Gg[e.role]??e.role,d=n?n.slot.role===e.role?n.slot.label:`${n.slot.label} · ${c}`:c,u=z("span",{class:"nyx-lib-meta"},...e.origin==="local"?[z("span",{class:"nyx-lib-chip","data-nyx-lib":"local-chip"},"LOCAL")," "]:[],`${d} · ${Ug(e.measures.length)} · `,Jt(e.creatorLink,e.creator,{class:"nyx-lib-creator"})),p=z("span",{class:"nyx-lib-name",title:e.title},e.title),h=z("span",{class:"nyx-lib-main"},p,u);n?.note&&h.append(z("span",{class:"nyx-lib-meta nyx-lib-warn"},n.note)),Vl(e)&&h.append(z("span",{class:"nyx-lib-meta","data-nyx-lib":"personal"},e.license==="unknown"?"Licence unknown: personal use":`${e.license}, ${Ka(e)}`));const m=z("span",{class:"nyx-lib-wavebox"},Wg(e.wave));I(m,B("library:wave"));const b=this.host.chop&&e.origin==="local"&&(e.kind==="loop"||Si(e.title).kind==="loop")?z("button",{type:"button",class:"nc-btn nyx-lib-load nyx-lib-chop","data-nyx-lib":"chop","aria-label":`Chop ${e.title} to pads`},"Chop"):null;b&&(this.busy&&(b.disabled=!0),I(b,B("library:chop"),b),b.addEventListener("click",()=>void this.chopSound(e)));const w=z("li",{class:"nyx-lib-row","data-nyx-sound":e.id,"data-nyx-role":e.role},o,h,m,l,b?z("span",{class:"nyx-lib-loads"},s,b):s);return a&&(w.dataset.nyxPlaying=""),w}renderCredits(){if(this.creditsBtn.setAttribute("aria-expanded",String(this.creditsOpen)),this.creditsEl.hidden=!this.creditsOpen,!this.creditsOpen)return;const e=this.host.pads(),n=Jl(e);if(!n.length){this.creditsEl.replaceChildren(z("p",{class:"nc-note"},"No Library sounds on the pads yet."));return}const a=Df(n),o=[];for(const i of a){const s=i.origin==="local";a.length>1&&o.push(z("p",{class:"nc-label","data-nyx-lib":`credits-${i.origin}`},s?"Your local Library":zt));const l=z("ul",{class:"nyx-lib-credit-list","data-nyx-origin":i.origin});for(const c of i.credits){const d=`On pad${c.pads.length>1?"s":""} ${c.pads.join(", ")}`;l.append(z("li",{class:"nyx-lib-credit","data-nyx-credit":c.id},z("span",{class:"nyx-lib-name"},c.title),z("span",{class:"nyx-lib-meta"},"by ",Jt(c.creatorLink,c.creator)," · ",Jt(c.licenseUrl,c.license),...s?[` (${Ka(c)})`]:[],...c.source?[" · ",Jt(c.source,"source")]:s?[]:[" · source"],s?` · from ${bi}`:` · via ${c.curator}`),z("span",{class:"nyx-lib-meta"},d)))}o.push(l)}this.creditsEl.replaceChildren(...o)}forText(){const e=this.host.target();return this.source==="local"?`Load goes on ${e.title}. Your local Library: it plays here and is never uploaded.`:this.source==="all"?`Load goes on ${e.title}. musicmatter.art and your local Library together.`:`Load goes on ${e.title}. Curated: every sound checked by a person.`}renderSources(){const e=this.host.local;if(!e){this.sourcesEl.hidden=!0;return}this.sourcesEl.hidden=!1;const n=e.state,a=(s,l,c="")=>{const d=z("button",{type:"button",class:"nc-btn","data-nyx-lib":`source-${s}`,...c?{title:c}:{},"aria-pressed":String(this.source===s),"data-on":String(this.source===s)},l);return I(d,B(`library:source-${s}`),d),d.addEventListener("click",()=>this.choose(s)),d},o=(s,l,c)=>{const d=z("button",{type:"button",class:"nc-btn","data-nyx-lib":s},l);return I(d,B(`library:${s}`),d),d.addEventListener("click",c),d},i=[a("shelf",zt)];if(n.status==="ready"&&i.push(a("local",ss,n.name),a("all","All")),n.status==="reconnect"){const s=o("reconnect",`Reconnect ${ss}`,()=>void e.reconnect());s.title=n.name,i.push(s)}else n.status!=="ready"&&i.push(o("open-folder",n.status==="opening"?"Opening…":"Open folder…",()=>this.openFolder()));(n.status==="ready"||n.status==="reconnect")&&i.push(o("forget","Forget",()=>void e.forget())),this.sourcesEl.replaceChildren(...i)}localStatus(){const e=this.host.local;if(!e)return null;const n=e.state;return n.status==="error"?{text:n.message,danger:!0}:this.source==="shelf"?null:n.status==="ready"&&!n.remembered&&!this.query?{text:`${n.lib.sounds.length} local sounds. This browser can't keep the folder: open it again next visit.`,danger:!1}:null}render(){this.renderSources(),this.forLine.textContent=this.forText();const e=[];if(this.query?.kit)for(const s of this.kit)e.push(this.row(s.sound,s));else for(const s of this.hits)e.push(this.row(s.sound));this.list.replaceChildren(...e);let n=this.message,a=!1;const o=this.active(),i=this.localStatus();!n&&i?(n=i.text,a=i.danger):!n&&this.source==="local"&&!o?n="Open your local Library: the folder the sample picker exported.":n||(this.failed&&!o?(n="The Library couldn't be reached. Check the connection, then ask again.",a=!0):o?this.busy==="kit"?n="Building the kit…":this.query?this.query.kit?n=this.kit.length?"A kit for pads 1–8: Build kit puts it on them and keeps the pattern.":"Nothing for a kit.":this.hits.length?n="":n="Nothing matches. Try a role (kick, snare, hat) and a word like dark or tight.":n=`${o.sounds.length} sounds. Try "punchy kick" or "funk kit".`:n="Opening the Library…",this.query?.unknown.length&&(n=`${n?`${n} `:""}Not in the Library's words: ${this.query.unknown.join(", ")}.`.trim())),this.status.textContent=n,this.status.hidden=!n,a?this.status.dataset.ncTone="danger":delete this.status.dataset.ncTone,this.kitBtn.textContent=this.busy==="kit"?"Building…":"Build kit",this.kitBtn.disabled=!!this.busy||!o,this.renderCredits()}refresh(){const e=this.host.target(),n=this.forText();if(this.forLine.textContent!==n){this.forLine.textContent=n;for(const a of this.list.querySelectorAll('[data-nyx-lib="load"]')){const o=a.closest("li")?.querySelector(".nyx-lib-name")?.textContent??"";a.setAttribute("aria-label",`Load ${o} onto ${e.title}`)}}this.creditsOpen&&this.renderCredits()}attach(e){if(!this.isOpen||!e){this.el.isConnected&&this.el.remove();return}if(e.nextElementSibling===this.el)return;const n=document.activeElement===this.input,{selectionStart:a,selectionEnd:o}=this.input;e.after(this.el),n&&(this.input.focus(),a!==null&&o!==null&&this.input.setSelectionRange(a,o))}}const ut="nyx-local-library.json";function Xa(t){return{name:t.name,async read(e){const n=e.split("/"),a=n.pop();let o=t;for(const i of n)o=await o.getDirectoryHandle(i);return(await o.getFileHandle(a)).getFile()}}}function Kg(t){const e=[...t].map(l=>({file:l,path:(l.webkitRelativePath||l.name).replace(/\\/g,"/")})),a=e.filter(l=>l.path===ut||l.path.endsWith(`/${ut}`)).sort((l,c)=>l.path.length-c.path.length)[0];if(!a)return null;const o=a.path.slice(0,a.path.length-ut.length),i=new Map;for(const l of e)l.path.startsWith(o)&&i.set(l.path.slice(o.length),l.file);return{name:o.replace(/\/$/,"").split("/").pop()||"Local Library",async read(l){const c=i.get(l);if(!c)throw new Error(`${l} isn't in the folder`);return c}}}function Xg(t){return t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60)||"local"}async function Vg(t){let e;try{e=await(await t.read(ut)).text()}catch{throw new Error(`${t.name} has no ${ut}. Open the folder the sample picker exported.`)}let n;try{n=JSON.parse(e)}catch{throw new Error(`${ut} in ${t.name} isn't readable JSON.`)}if(n?.kind!=="nyx-local-library")throw new Error(`${t.name} isn't a NYX local Library.`);return Kl(n,Xg(t.name))}async function Qg(t){const e=new Uint8Array(await crypto.subtle.digest("SHA-256",t));return Array.from(e,n=>n.toString(16).padStart(2,"0")).join("")}async function Jg(t,e){const n=Xl(e.audio);if(e.origin!=="local"||!n)throw new Error("it isn't a local sound");let a;try{a=await t.read(n)}catch{throw new Error(`${n} isn't in ${t.name} any more`)}const o=await a.arrayBuffer();if(await Qg(o)!==e.sha256)throw new Error("the file isn't the one the local Library lists");return o}const Zg="nyx-local-library",qo="handles",Va="folder";function eb(){return new Promise((t,e)=>{const n=indexedDB.open(Zg,1);n.onupgradeneeded=()=>n.result.createObjectStore(qo),n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}function Qa(t,e){return eb().then(n=>new Promise((a,o)=>{const i=e(n.transaction(qo,t).objectStore(qo));i.onsuccess=()=>a(i.result),i.onerror=()=>o(i.error)}).finally(()=>n.close()))}function tb(){return typeof indexedDB>"u"?{get:async()=>null,set:async()=>{},clear:async()=>{}}:{get:()=>Qa("readonly",t=>t.get(Va)).then(t=>t??null),set:t=>Qa("readwrite",e=>e.put(t,Va)),clear:()=>Qa("readwrite",t=>t.delete(Va))}}function nb(){const t=globalThis;return typeof t.showDirectoryPicker=="function"?t.showDirectoryPicker.bind(globalThis):null}class ab{st={status:"none"};folder=null;handle=null;picker;handles;listeners=[];constructor(e={}){this.picker=e.picker===void 0?nb():e.picker,this.handles=e.handles??tb()}get state(){return this.st}get lib(){return this.st.status==="ready"?this.st.lib:null}get canRemember(){return!!this.picker}onChange(e){this.listeners.push(e)}set(e){this.st=e;for(const n of this.listeners)n()}async load(e,n){this.set({status:"opening",name:e.name});try{const a=await Vg(e);return this.folder=e,this.set({status:"ready",name:e.name,lib:a,remembered:n}),!0}catch(a){return this.folder=null,this.set({status:"error",message:a.message}),!1}}async restore(){if(!this.picker)return;let e=null;try{e=await this.handles.get()}catch{return}if(!e)return;this.handle=e,(await e.queryPermission?.({mode:"read"}).catch(()=>"prompt")??"granted")==="granted"?await this.load(Xa(e),!0):this.set({status:"reconnect",name:e.name})}async reconnect(){const e=this.handle;return e?(await e.requestPermission?.({mode:"read"}).catch(()=>"denied")??"granted")!=="granted"?(this.set({status:"reconnect",name:e.name}),!1):this.load(Xa(e),!0):this.pick()}async pick(){if(!this.picker)return!1;let e;try{e=await this.picker({mode:"read",id:"nyx-local-library"})}catch(a){return a.name==="AbortError"||this.set({status:"error",message:`The folder couldn't be opened: ${a.message}`}),!1}const n=await this.load(Xa(e),!0);return n&&(this.handle=e,await this.handles.set(e).catch(()=>{})),n}async openFiles(e){const n=Kg(e);return n?this.load(n,!1):(this.set({status:"error",message:`That folder has no ${ut}. Open the folder the sample picker exported.`}),!1)}async forget(){this.folder=null,this.handle=null,await this.handles.clear().catch(()=>{}),this.set({status:"none"})}bytes(e){return this.folder?Jg(this.folder,e):Promise.reject(new Error("its local Library folder isn't open. Open or reconnect it"))}}const ob="nyx-limiter",Ci={knee:.6,ceiling:.944,range:4,points:8193};function ib(t,{knee:e,ceiling:n}=Ci){const a=Math.abs(t);if(a<=e)return t;const o=n-e;return Math.sign(t)*(e+o*Math.tanh((a-e)/o))}function rb({range:t,points:e}=Ci){const n=new Float32Array(e);for(let a=0;a<e;a++)n[a]=ib((2*a/(e-1)-1)*t);return n}function sb(t){const e=t.createGain();e.gain.value=1/Ci.range;const n=t.createWaveShaper();return n.curve=rb(),n.oversample="none",e.connect(n),{input:e,output:n}}const cs="nyx-picker-bridge",ds=1,lb=3e3,cb=64*1024*1024,db=new Set(["127.0.0.1","localhost","[::1]"]);function ub(t){const e=new URLSearchParams(t).get("picker");if(!e)return null;let n;try{n=new URL(e)}catch{return null}return n.protocol!=="http:"||!db.has(n.hostname)||!n.port||n.username||n.password||e.replace(/\/$/,"")!==n.origin?null:n.origin}function pb(t){const e=t&&typeof t=="object"&&!Array.isArray(t)?t:{};if(e.kind!=="nyx-picker-kit")throw new Error("not a picker kit");const n=Array.isArray(e.sounds)?e.sounds:[];if(!n.length)throw new Error("the kit is empty");if(n.length>V)throw new Error(`more than ${V} sounds`);const a=new Set,o=[];for(const l of n){const c=l&&typeof l=="object"?l:{},d=c.pad;if(typeof d!="number"||!Number.isInteger(d)||d<1||d>V||a.has(d))throw new Error("a sound has no pad of its own");const u=Kl({sounds:[c]},"sample-picker").sounds[0];if(!u)throw new Error(`pad ${d}'s sound isn't complete`);a.add(d),o.push({pad:d-1,sound:u})}const i=typeof e.id=="string"?e.id.slice(0,80):"",s=typeof e.name=="string"&&e.name.trim()?e.name.trim().slice(0,80):"Sample picker";return{id:i,name:s,sounds:o}}function hb(t,e,n){if(n==="replace"){const i=[];for(let s=0;s<V;s++)t[s]&&i.push(s);return{to:[...e],replaced:i,clear:!0}}const a=new Set;for(let i=0;i<V;i++)t[i]||a.add(i);const o=e.map(i=>a.delete(i)?i:-1);for(let i=0;i<o.length;i++){if(o[i]!==-1)continue;const s=[...a].sort((l,c)=>l-c)[0];if(s===void 0)break;a.delete(s),o[i]=s}return{to:o,replaced:[],clear:!1}}function Ro(t){const e=[...t].sort((n,a)=>n-a).map(n=>String(n+1));return e.length>1?`${e.slice(0,-1).join(", ")} and ${e[e.length-1]}`:e[0]??""}function fb(t,e,n){const a=e.to.filter(d=>d>=0),o=e.to.length-a.length,i=a.length,s=`${i===1?"pad":"pads"} ${Ro(a)}`,l=[],c=e.clear&&e.replaced.length>0;if(c){l.push(`This clears all 16 pads in NYX and loads your picker kit onto ${s}; the other pads stay empty.`);const d=e.replaced.map(u=>`${u+1} (${n(u)})`).join(", ");l.push(`Gone: pad${e.replaced.length===1?"":"s"} ${d}. Undo brings all 16 back as they were.`)}else if(l.push(`From the sample picker on this computer, onto ${s}.`),e.replaced.length){const d=e.replaced.map(u=>`${u+1} (${n(u)})`).join(", ");l.push(`Replaces pad${e.replaced.length===1?"":"s"} ${d}. Undo brings ${e.replaced.length===1?"it":"them"} back.`)}return o&&l.push(`${o} won't fit: no empty pads left.`),t.sounds.some(d=>d.sound.licenseStatus==="personal")&&l.push("Some are for personal use only."),l.push("The pattern stays."),{title:c?"Replace everything in NYX?":`Load ${i} sound${i===1?"":"s"} from the picker?`,body:l.join(" ")}}async function mb(t){const e=new Uint8Array(await crypto.subtle.digest("SHA-256",t));return Array.from(e,n=>n.toString(16).padStart(2,"0")).join("")}async function gb(t,e,n,a){const o=p=>({ok:!1,placed:[],left:[],message:p}),i=hb(a.filled(),t.sounds.map(p=>p.pad),e),s=t.sounds.flatMap((p,h)=>{const m=i.to[h]??-1;return m>=0?[{k:p,to:m}]:[]}),l=t.sounds.flatMap((p,h)=>(i.to[h]??-1)<0?[p.pad+1]:[]);if(!s.length)return{...o("Nothing loaded: NYX has no empty pads."),left:l};if(!await a.ask(fb(t,i,a.padName)))return{...o("Not loaded: cancelled in NYX."),left:l};const c=[];try{for(const{k:p,to:h}of s){const m=n.get(p.pad+1);if(!m)throw new Error(`pad ${p.pad+1}'s audio is missing`);if(await mb(m)!==p.sound.sha256)throw new Error(`pad ${p.pad+1}'s audio isn't the file named`);const{data:b,rate:w}=await a.decode(p.sound,m);c.push({index:h,sound:p.sound,data:b,rate:w})}}catch(p){return{...o(`Not loaded: ${p.message}. NYX's pads are as they were.`),left:l}}await a.place(c,i.clear);const d=s.map(({k:p,to:h})=>({from:p.pad+1,to:h+1})),u=l.length?` ${l.length} didn't fit (no empty pads).`:"";return{ok:!0,placed:d,left:l,message:i.clear&&i.replaced.length?`Replaced everything in NYX: pad${d.length===1?"":"s"} ${Ro(s.map(p=>p.to))} loaded, the others empty.`:`Loaded onto NYX pad${d.length===1?"":"s"} ${Ro(s.map(p=>p.to))}.${u}`}}function bb(t){return Object.prototype.toString.call(t)==="[object ArrayBuffer]"}function Sc(t,e){const n=pb(t),a=e&&typeof e=="object"?e:{},o=new Map;for(const{pad:i}of n.sounds){const s=a[String(i+1)];if(!bb(s)||s.byteLength>cb)throw new Error(`pad ${i+1}'s audio is missing or too big`);o.set(i+1,s instanceof ArrayBuffer?s:new Uint8Array(s).slice().buffer)}return{kit:n,audio:o}}class yb{constructor(e){this.o=e}last="";busy=!1;start(){return this.o.self.addEventListener("message",e=>void this.onMessage(e)),this.o.self.setInterval(()=>this.update(!0),lb),this.update(!0),this}update(e=!1){const n=this.o.pads(),a=JSON.stringify(n);!e&&a===this.last||(this.last=a,this.post({type:"state",pads:n,busy:this.busy}))}post(e){try{this.o.picker.postMessage({nyx:cs,v:ds,...e},this.o.origin)}catch{}}async onMessage(e){if(e.origin!==this.o.origin||e.source!==this.o.picker)return;const n=e.data;if(!n||typeof n!="object"||n.nyx!==cs||n.v!==ds)return;if(n.type==="hello")return this.update(!0);if(n.type!=="kit")return;const a=typeof n.id=="string"?n.id.slice(0,80):"",o=c=>this.post({type:"result",id:a,...c});if(this.busy)return o({ok:!1,placed:[],left:[],message:"NYX is still loading the last kit."});let i,s;try{({kit:i,audio:s}=Sc(n.kit,n.audio))}catch(c){return o({ok:!1,placed:[],left:[],message:`Not loaded: ${c.message}.`})}const l=n.mode==="fill"?"fill":"replace";this.busy=!0;try{o(await this.o.receive(i,l,s))}catch(c){o({ok:!1,placed:[],left:[],message:`Not loaded: ${c.message}.`})}finally{this.busy=!1,this.update(!0)}}}function wb(t,e){const n=ub(t.location.search),a=t.opener;return!n||!a||t.parent!==t?null:new yb({self:t,picker:a,origin:n,...e}).start()}function vb(t){let e=!1;return{pads:()=>t.pads(),async receive(n,a,o){const i=c=>({ok:!1,placed:[],left:[],message:c});if(e)return i("NYX is still loading the last kit.");let s,l;try{({kit:s,audio:l}=Sc(JSON.parse(JSON.stringify(n??null)),o))}catch(c){return i(`Not loaded: ${c.message}.`)}e=!0;try{return await t.receive(s,a==="fill"?"fill":"replace",l)}catch(c){return i(`Not loaded: ${c.message}.`)}finally{e=!1}}}}const xb="nyx",kb=1;function Mc(t){const e={nyx:1,...xi(t)},n=Jl(t.pads);if(n.length&&(e.credits=n),Array.isArray(t.slots)){const a=Array.from({length:Rt},(i,s)=>{const l=t.slots?.[s];return l?im(l):null}),o=typeof t.active=="number"&&a[t.active]?t.active:null;Object.assign(e,{slots:a,active:o})}return e}function Lc(t){return Tc(t),da(t)}function $b(t){Tc(t);const e=t;if(!Array.isArray(e.slots))return null;const n=e.slots,a=Array.from({length:Rt},(s,l)=>{const c=n[l];return c&&typeof c=="object"&&!Array.isArray(c)?da(c):null}),o=e.active,i=typeof o=="number"&&Number.isInteger(o)&&o>=0&&o<Rt&&a[o]?o:null;return{slots:a,active:i}}function Tc(t){if(!t||typeof t!="object"||Array.isArray(t))throw new Error("Not a NYX pattern.");const e=t.nyx;if(e!==1)throw new Error(`Not a NYX pattern${typeof e=="number"?` (version ${e})`:""}.`)}function Ni(){try{return globalThis.localStorage??null}catch{return null}}function Eb(t,e,n=Ni()){let a;try{a=e?.storageKey?.(t)}catch{a=void 0}if(typeof a!="string"||!a||a===t)return t;try{if(e?.legacyCopy!==!1&&n&&n.getItem(a)===null){const o=n.getItem(t);o!==null&&n.setItem(a,o)}}catch{}return a}const Ab="nyx.state",Cc="nyx.scene-samples",Sb=/^[0-9a-f]{16,64}$/;function Nc(t){try{const e=JSON.parse(t?.getItem(Cc)??"[]");return Array.isArray(e)?e.filter(n=>typeof n=="string"&&Sb.test(n)):[]}catch{return[]}}function Mb(t,e=Ni()){if(!e)return;const n=new Set;for(const o of[t,...t.slots??[]])for(const i of o?.pads??[])i.sample&&n.add(i.sample);if(!n.size)return;const a=[...Nc(e).filter(o=>!n.has(o)),...n].slice(-2048);try{e.setItem(Cc,JSON.stringify(a))}catch{}}function Lb(t,e=Ni()){const n=bn(t);if(!e)return n;try{for(let a=0;a<e.length;a++){const o=e.key(a);if(o?.startsWith(Ab))try{for(const i of bn(oc(JSON.parse(e.getItem(o)??"null"))))n.add(i)}catch{}}}catch{return null}for(const a of Nc(e))n.add(a);return n}const Tb="NYX Sampler",_t="nyx",me=Sa(),ee=Fg(_t,me),Fc=Eb(Cg("nyx.state",me),ee),Fi=.15,A=rm(Fc),K=new mg(me>1?`nyx-${me}`:"nyx"),Ma=()=>sm(Fc,A),at=()=>{const t=Lb(A);if(t)for(const e of he?.before??[])e.pad.sample&&t.add(e.pad.sample);if(t)for(const e of Di)t.add(e);t&&K.prune(t)};let ue=!1,Ze=0,pe=null,Ht=!1,ct="",F="";const ua=new Map,Io=new Map,Cb=1600,Nb=96,qn=new Map;function zc(t){ua.has(t.hash)||ua.set(t.hash,is(t.data)),Io.has(t.hash)||Io.set(t.hash,is(t.data,Cb))}function Fb(t){if(!t.sample)return;const e=Io.get(t.sample);if(!e||t.start<=0&&t.end>=1)return ua.get(t.sample);const n=`${t.sample}:${t.start}:${t.end}`,a=qn.get(n);if(a)return a;const o=e.length/2,i=Math.max(0,Math.min(o-1,Math.floor(t.start*o))),s=Math.max(i+1,Math.min(o,Math.ceil(t.end*o))),l=[],c=Math.min(Nb,s-i);for(let d=0;d<c;d++){const u=i+Math.floor((s-i)*d/c),p=Math.max(u+1,i+Math.floor((s-i)*(d+1)/c));let h=0,m=0;for(let b=u;b<p;b++)h=Math.min(h,e[b*2]??0),m=Math.max(m,e[b*2+1]??0);l.push(h,m)}return qn.size>256&&qn.clear(),qn.set(n,l),l}let Pc=[],Sn=new Map;const ze=new kd({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let N=null,un=null;const zb=new zd({...zg(),app:Ng(Tb,me),version:"0.1.0",clock:ze,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const t=N?.state;return t==="running"?"running":t==="suspended"?"suspended":t?"none":"needs-gesture"},startGate:()=>un?.whenSettled?.()??null}),vn=t=>t+(un?.offset??0),O=()=>ze.transport,Wt=()=>O().isPlayingAt(ne()),xn=()=>Wt()&&!ue;let Ja=null,U=null;const we=qg(ee,t=>U?.port.postMessage(t)),pa=[];let ha=!1,Ae=null,ft=null,us=null;const ps=new Set;function se(){return us??=(async()=>{ee?(N=ee.ctx,Ja=ee.output,un=ee.mapper??new Zi(ee.ctx)):(N=new AudioContext({latencyHint:"interactive"}),Ja=N.destination,un=new Zi(N)),un.start();try{await N.audioWorklet.addModule(Wm),await N.audioWorklet.addModule(Hm)}catch{return F="Audio could not start (the sampler's worklet did not load). Reload to try again.",L(),!1}U=new AudioWorkletNode(N,"nyx-sampler",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]}),U.port.onmessage=n=>Pb(n.data),Ae=gu(N,{moduleUrl:Pg()??wu,bpm:O().bpm,slots:3,state:Bo(A.hacks)}),jo=Bo(A.hacks),ft=new GainNode(N,{gain:A.master}),U.connect(Ae.input);const t=new AudioWorkletNode(N,ob,{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),e=sb(N);Ae.output.connect(ft).connect(t).connect(e.input),e.output.connect(Ja),yu(Ae,ze,{toAudioTime:vn,now:ne});for(const n of bn(A))await bt(n);return yt(),we?.resend(),ha&&U.port.postMessage({type:"hitlog",on:!0}),Ut(),!0})(),us}async function bt(t){const e=await K.get(t);return e?(zc(e),U&&!ps.has(t)&&(ps.add(t),U.port.postMessage({type:"sample",hash:t,channels:e.data.map(n=>n.slice()),rate:e.sampleRate})),e):null}function Pb(t){if(t.type==="hitlog"&&t.hits&&ha){for(const e of t.hits)pa.length<2e4&&pa.push(e);return}t.type!=="pos"||!t.voices||(Pc=t.voices,Sn=new Map(t.voices.map(([e,n,a,o])=>{const i=kg(o)?Pe.cache.byId(o):void 0,s=i?K.info(i.job.sample):void 0;return i&&s?[e,(i.job.from+n/i.frames*(i.job.to-i.job.from))/s.frames]:[e,n/Math.max(1,a)]})))}let Xn=null,Db=0;const nn=new Map,Dc=[],Bb=.25;function Ob(){if(Xn)return Xn;const t=new Worker(new URL("/nyx/assets/stretch-worker-DVLOsvIo.js",import.meta.url),{type:"module"});return t.onmessage=e=>{const n=e.data;nn.get(n.id)?.(n),nn.delete(n.id)},t.onerror=e=>{console.error("NYX stretch worker",e.message);for(const n of nn.values())n({error:e.message||"worker failed"});nn.clear()},Xn=t,t}async function Bc(t){const e=await K.get(t.sample);if(!e)return null;const n=Math.ceil(Bb*t.sampleRate),a=Math.max(0,t.from-n),o=Math.min(e.frames,t.to+n),i=e.data.map(c=>c.slice(a,o)),s=++Db,l=Ob();return new Promise(c=>{nn.set(s,d=>{if(d.error||!d.channels){console.error("NYX stretch",d.error),c(null);return}typeof d.ms=="number"&&Dc.push(Math.round(d.ms)),c(d.channels)}),l.postMessage({id:s,channels:i,sampleRate:t.sampleRate,from:t.from-a,to:t.to-a,frames:t.frames,semitones:t.semitones},i.map(d=>d.buffer))})}const Pe=new Eg({run:Bc,deliver(t,e){U?.port.postMessage({type:"sample",hash:t.sample,channels:e,rate:t.job.sampleRate},e.map(n=>n.buffer))},drop(t){U?.port.postMessage({type:"drop",hash:t.sample})},changed(){Pe.failed&&!F&&(F="Keep pitch couldn't start in this browser: fitted pads change speed and pitch instead."),yt(),L()}});function yt(){if(!U)return;const t=O().bpm,e=n=>K.info(n);Pe.plan(A.pads,e,t),U.port.postMessage({type:"program",program:$m(A,e,t,n=>Pe.stretchedFor(n))})}let hs="";function Ut(t=!1){if(!U)return;const e=O(),n=xn();let a=0,o=e.bpm;if(e.running||e.isPlayingAt(ne())){const s=Math.max(0,e.beatAt(ne())),l=e.timeAt(s);o=60/(e.timeAt(s+1)-l),a=vn(l)-s*60/o}const i=JSON.stringify([n,Math.round(a*2e3),o,Ze]);!t&&i===hs||(hs=i,U.port.postMessage({type:"clock",clock:{playing:n,zero:a,bpm:o,join:Ze}}))}let jo=null;function Oc(){if(!Ae)return;const t=Bo(A.hacks),e=Dm(jo,t);if(jo=t,e.whole)Ae.setState(t);else for(const[n,a,o]of e.params)Ae.setParam(n,a,o)}let pn=null;function qb(){if(pn){const e=pn;Q(()=>{A.lanes=e}),F="Pattern back.",L();return}const t=structuredClone(A.lanes);t.some(e=>e.steps.some(n=>n.on)||e.mute||e.solo||e.length!==te)&&(Q(()=>{A.lanes=A.lanes.map(()=>Aa())}),pe=null,pn=t,F="Pattern cleared: press Undo to bring it back.",L())}function Q(t){pn=null;const e=Oi(!1);t(),e&&at(),A.active!==null&&(Ht=!0),ct="",Ma(),yt(),Oc(),L()}const P=t=>A.pads[t]??ke(t),Ce=t=>A.lanes[t]??Aa(),qc=()=>P(A.selected);function et(t,e=A.selected){Q(()=>t(P(e)))}async function Rb(t,e){const n=P(t);if(n.normalize){et(o=>{o.normalize&&(o.normalize.on=e)},t);return}if(!n.sample)return;let a;if(n.provenance)a={on:e,gainDb:0};else{const o=K.held(n.sample)??await K.get(n.sample);if(!o)return;a={...qt(o.data,o.sampleRate),on:e}}et(o=>{o.sample===n.sample&&(o.normalize=a)},t)}function fa(t,e,n){Q(()=>{const a=Ce(t).steps[e];a&&n(a)})}function xe(t,e=!0){A.selected=Math.max(0,Math.min(V-1,t)),pe&&pe.lane!==A.selected&&(pe=null),Ma(),e&&Ge(A.selected),L()}async function Ge(t,e=null,n=!1){if(!await se()||!N||!U)return;N.state!=="running"&&await N.resume().catch(()=>{});const a=P(t),o=a.sample?dc(a,K.info(a.sample),O().bpm,e,Pe.stretchedFor(t)):null;o&&U.port.postMessage({type:"play",pad:t,hit:o,hold:n})}let Vn=Tm();const mt=new Map;function La(t){return t.kind?{kind:t.kind,bpm:t.bpm}:t.origin==="local"?Si(t.title):{kind:"",bpm:0}}function zi(t,e){mt.delete(t);const n=P(t),a=n.sample?K.info(n.sample):void 0;if(!Vn||!e||!n.sample||!a)return;const o=Mm(a.frames/a.sampleRate,e,O().bpm,Ai);o&&(mt.set(t,{sample:n.sample,fit:o,before:{fit:n.fit,keepPitch:n.keepPitch}}),n.fit=o.bars,n.keepPitch=!0)}function Ib(t){const e=mt.get(t);gc(e,P(t))&&(mt.delete(t),et(n=>Nm(e,n),t),F=`Fit undone: ${tt(t)} plays as recorded.`,L())}async function wt(t,e,n,a,o=!0,i=null,s=null,l=null,c=0){const{sample:d,saved:u}=await K.put(e,n);await bt(d.hash),Q(()=>{const p=P(t);p.sample=d.hash,p.provenance=i,p.normalize=l?{...l}:null,p.offsetDb=c,p.name=a.slice(0,24)||`Pad ${t+1}`,p.start=0,p.end=1,p.slices=0,p.cuts=[],p.fit=0,p.keepPitch=!0,p.follow=null,p.note=0,zi(t,s)}),F=u?"":"Kept until you reload: this browser has no file storage here.",at(),o&&Ge(t)}async function Pi(t,e=A.selected){if(/\.json$/i.test(t.name)||t.type==="application/json"){await oy(t);return}if(!await se()||!N)return;let n;try{n=await N.decodeAudioData(await t.arrayBuffer())}catch{F=`Couldn't read ${t.name}: not an audio file this browser can decode.`,L();return}const{data:a,trimmed:o}=$c(n);await wt(e,a,n.sampleRate,t.name.replace(/\.[^.]+$/,""),!0,null,Si(t.name),qt(a,n.sampleRate)),o&&(F=`${t.name} was cut to its first minute.`,L())}const Di=new Set;let he=null;function tt(t,e=P(t).name){const n=`Pad ${t+1}`;return e===n?n:`${n} (${e})`}async function Bi(t,e,n=""){return P(t).sample?Xo({title:`Replace ${tt(t)}?`,body:e==="Grab"?"Grab replaces its sound, its slices and that lane's steps. Undo brings them back.":e==="Sent"?`${n} replaces its sound, its slices and that lane's steps. Undo brings them back.`:"The take replaces its sound, its slices and that lane's steps when it lands. Undo brings them back.",confirmLabel:"Replace",cancelLabel:"Cancel"}):!0}function De(t){const e=wi(A,t);return e.pad.sample&&Di.add(e.pad.sample),e}function ot(t,e,n){Oi();const a=Array.isArray(t)?t:[t],o=a[0],i=Jh({message:n??(o?.pad.sample?`${e}: replaced ${tt(o.index,o.pad.name)}.`:`${e} onto Pad ${(o?.index??0)+1}.`),actionLabel:"Undo",onAction:()=>void qi(),onClose:()=>{he&&(he.toast=null)}}),s=i.el.querySelector("button");s instanceof HTMLElement&&I(s,B("grab-undo"),s),he={before:a,what:e,toast:i};for(const l of a)l.pad.sample&&Di.delete(l.pad.sample)}function Oi(t=!0){if(!he)return!1;const e=he;return he=null,e.toast?.close(),t&&at(),!0}async function qi(){const t=he;if(!t)return!1;he=null,t.toast?.close();for(const n of t.before)n.pad.sample&&await bt(n.pad.sample);Q(()=>{for(const n of t.before)Jf(A,n)}),pe&&t.before.some(n=>n.index===pe?.lane)&&(pe=null);const e=t.before[0];return F=t.before.length===1&&e?`Undone: ${tt(e.index)} is back as it was.`:`Undone: pads ${t.before.map(n=>n.index+1).join(", ")} are back as they were.`,at(),L(),!0}let Za=null;function Rc(){return Za??=fetch(gf,{mode:"cors"}).then(t=>{if(!t.ok)throw new Error(`Library: HTTP ${t.status}`);return t.json()}).then(t=>wf(t)).catch(t=>{throw Za=null,t}),Za}const Ta=new ab;Ta.restore();const Ic=t=>`${t.id}#${t.sha256}`,Zt=new Map;function jb(t){const e=Ic(t);let n=Zt.get(e);return!n&&t.origin==="local"&&(n=Ta.bytes(t),n.catch(()=>Zt.delete(e)),Zt.set(e,n)),n||(n=(async()=>{const a=await fetch(t.audio,{mode:"cors"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const o=await a.arrayBuffer(),i=new Uint8Array(await crypto.subtle.digest("SHA-256",o));if(Array.from(i,l=>l.toString(16).padStart(2,"0")).join("")!==t.sha256)throw new Error("the file isn't the one the Library lists");return o})(),n.catch(()=>Zt.delete(e)),Zt.set(e,n)),n}const eo=new Map;async function jc(t){if(!await se()||!N)throw new Error("NYX's audio didn't start");const e=N,n=Ic(t);let a=eo.get(n);return a||(a=jb(t).then(o=>e.decodeAudioData(o.slice(0))),a.catch(()=>eo.delete(n)),eo.set(n,a)),a}const _c=t=>10**(t/20);async function Hc(t){return Wc(await jc(t),t)}function Wc(t,e){const{data:n}=$c(t),a=_c(e.measures.gain);for(const o of n)for(let i=0;i<o.length;i++)o[i]=(o[i]??0)*a;return{data:n,rate:t.sampleRate}}let Pt=null;function Uc(){const t=Pt;Pt=null;try{t?.src.stop()}catch{}}async function Gc(t){Uc();let e;try{e=await jc(t)}catch(i){Ri(`Couldn't play ${t.title}: ${i.message}.`);return}if(!N||!ft)return;N.state!=="running"&&await N.resume().catch(()=>{});const n=new AudioBufferSourceNode(N,{buffer:e}),a=new GainNode(N,{gain:_c(t.measures.gain)*ke(0).level});n.connect(a).connect(ft);const o={src:n,id:t.id};Pt=o,await new Promise(i=>{n.onended=()=>{a.disconnect(),Pt===o&&(Pt=null),i()},n.start()})}function Ri(t){F=t,L()}async function Ca(t,e,n=A.selected){let a;try{a=await Hc(t)}catch(i){return Ri(`Couldn't load ${t.title}: ${i.message}.`),!1}const o=De(n);return await wt(n,a.data,a.rate,Ea(t.title),!0,yi(t,e),La(t),_f),F=`${t.title} on Pad ${n+1}: ${t.creator}, ${hi(t.license,t.licenseStatus,t.permission)}${Vl(t)?" (personal use)":""}.`,ot(o,"Library"),L(),!0}async function _b(t,e){if(!await se())return!1;const n=await Promise.all(t.map(l=>Hc(l.sound).then(c=>({ok:!0,...c}),c=>({ok:!1,error:`${l.sound.title}: ${c.message}`})))),a=n.flatMap(l=>l.ok?[]:[l.error]);if(a.length)return Ri(`The kit couldn't load (${a.join("; ")}). The pads are as they were.`),!1;const o=[];for(const l of n){if(!l.ok)continue;const c=await K.put(l.data,l.rate);await bt(c.sample.hash),o.push(c)}for(let l=0;l<t.length;l++)De(l);let i=[];Q(()=>{i=vi(A,t.map((l,c)=>({sample:o[c]?.sample.hash??"",name:Ea(l.sound.title),provenance:yi(l.sound,e),hat:l.slot.role==="hat"}))),t.forEach((l,c)=>zi(c,La(l.sound)))});const s=t.flatMap(l=>l.note?[l.note]:[]);return F=`Kit on pads 1–${t.length}${e.trim()?` for "${e.trim()}"`:""}; the pattern stays.${s.length?` ${s.join(" ")}`:""}${o.some(l=>!l.saved)?" Kept until you reload: this browser has no file storage here.":""}`,ot(i,"Build kit",`Build kit: pads 1–${t.length} replaced.`),at(),L(),!0}async function Hb(t,e){const n=[];for(const c of t){const d=await K.put(c.data,c.rate);await bt(d.sample.hash),n.push(d)}if(e)for(let c=0;c<V;c++)De(c);else for(const c of t)De(c.index);const a=t.map((c,d)=>({index:c.index,sample:n[d]?.sample.hash??"",name:Ea(c.sound.title),provenance:yi(c.sound,""),hat:!1}));let o=[];Q(()=>{o=e?Zf(A,a):vi(A,a);for(const c of t)zi(c.index,La(c.sound))});const i=t.map(c=>c.index+1).join(", "),s=e&&o.some(c=>c.pad.sample),l=n.some(c=>!c.saved)?" Kept until you reload: this browser has no file storage here.":"";F=s?`From the sample picker: everything replaced, pad${t.length===1?"":"s"} ${i} loaded; the pattern stays.${l}`:`From the sample picker: pad${t.length===1?"":"s"} ${i}; the pattern stays.${l}`,ot(o,"Sample picker",s?"Sample picker: replaced everything in NYX.":`Sample picker: pad${t.length===1?"":"s"} ${i} loaded.`),at(),L()}const Yc={pads:()=>A.pads.map((t,e)=>({pad:e+1,name:t.name,filled:!!t.sample})),receive:(t,e,n)=>gb(t,e,n,{filled:()=>Array.from({length:V},(a,o)=>!!A.pads[o]?.sample),padName:a=>P(a).name,ask:a=>(ee?.reveal?.(),Xo({...a,confirmLabel:"Load",cancelLabel:"Cancel"})),decode:async(a,o)=>{if(!await se()||!N)throw new Error("NYX's audio didn't start");return Wc(await N.decodeAudioData(o),a)},place:Hb})},Wb=ee?null:wb(window,Yc),Ub=ee?.pickerTarget?.(vb(Yc))??null;function Ii(t){const e=P(t).provenance,n=e?ye.catalogFor(e.origin):null;if(!e||!n)return[];const a=new Set(A.pads.flatMap((o,i)=>i!==t&&o.provenance?[o.provenance.id]:[]));return Pf(n,e,a).map(o=>o.sound)}const ye=new Yg({catalog:Rc,target:()=>({index:A.selected,title:tt(A.selected)}),pads:()=>A.pads,preview:Gc,stopPreview:Uc,load:(t,e)=>Ca(t,e),chop:(t,e)=>Vb(t,e),buildKit:_b,close:()=>nt(!1),local:Ta}),ji=new Rg(typeof Worker>"u"?null:()=>new Worker(new URL("/nyx/assets/chop-worker-CbuieNQN.js",import.meta.url),{type:"module"})),Na=new Map;async function Gb(){const t=A.selected,e=P(t);if(!e.sample)return null;const n=await K.get(e.sample);if(!n)return null;const a=Math.floor(e.start*n.frames),o=Math.min(n.frames,Math.ceil(e.end*n.frames)),i=Na.get(t),s=i&&i.sample===e.sample?i:null;return{sample:e.sample,stem:lg(e.name),data:n.data,sampleRate:n.sampleRate,from:a,to:o,pad:t,tempo:ag({seconds:(o-a)/n.sampleRate,fit:e.fit,given:s?.bpm??0,givenFrom:s?.from,name:e.name,studioBpm:O().bpm})}}async function Yb(t,e,n){if(!await se()||!N||!U)return;N.state!=="running"&&await N.resume().catch(()=>{}),await bt(t.sample);const o={...P(t.pad),start:0,end:1,slices:0,cuts:[],fit:0,tune:0,fine:0,dir:"fwd",mode:"oneshot"},i=dc(o,K.info(t.sample),O().bpm,null);i&&U.port.postMessage({type:"play",pad:t.pad,hit:{...i,from:e,to:n}})}function Kb(t,e,n){const a=K.info(t.sample);if(!a)return;const o=Math.min(e.cuts.length-1,V-n.first);if(o<1)return;const i=Array.from({length:o},(d,u)=>De(n.first+u)),s=P(t.pad),l={provenance:s.provenance?structuredClone(s.provenance):null,normalize:s.normalize?{...s.normalize}:null,offsetDb:s.offsetDb,level:s.level,note:s.note},c=n.choke?cg(A.pads,n.first,o):0;Q(()=>{dg(A,e,{sample:t.sample,frames:a.frames,sampleRate:t.sampleRate,first:n.first,stem:t.stem,source:l,choke:c,playBack:n.playBack?{bpm:n.bpm}:null});for(let d=0;d<o;d++)mt.delete(n.first+d),Na.delete(n.first+d)}),gt.close(),ot(i,"Chop",`Chopped ${t.stem} onto pads ${n.first+1}–${n.first+o}.`),xe(n.first,!1),L()}const gt=new jg({source:Gb,analysis:t=>ji.analysis(t.sample,t.data,t.sampleRate,t.from,t.to),pads:()=>A.pads,audition:(t,e,n)=>void Yb(t,e,n),apply:Kb,close:()=>{gt.close(),L()}});async function Mn(){ye.isOpen&&nt(!1),await gt.open()&&(L(),gt.el.scrollIntoView?.({block:"nearest",behavior:"smooth"}))}async function Xb(t){const e=A.selected,n=De(e);await ed(t);const a=P(e).sample;a&&(t.bpm>0&&Na.set(e,{sample:a,bpm:t.bpm,from:"from the take"}),ot(n,`LUCY take ${t.id}`),await Mn())}async function Vb(t,e){const n=A.selected;if(!await Ca(t,e,n))return;const a=P(n).sample,o=La(t);a&&o.bpm>0&&Na.set(n,{sample:a,bpm:o.bpm,from:"from My samples"}),nt(!1),await Mn()}function nt(t=!ye.isOpen,e){t?ye.open(e):ye.closePanel(),L(),t?ye.focus():fe.querySelector('[data-nc-section="pads"] [data-nc-id="library"]')?.focus()}const G={from:"master",bars:1,busy:!1};async function _i(){const t=Je();if(!t||G.busy||!await se()||!N)return;const e=O();if(!e.running){F="Play first: Grab takes the bars that just played.",L();return}const n=G.bars,a=Math.floor(e.beatAt(ne())/4)*4,o=a-4*n;if(o<0){F=`Grab needs ${n} whole bar${n===1?"":"s"} played first.`,L();return}const i=N.sampleRate,{from:s,to:l}=Mg({from:Math.round(vn(e.timeAt(o))*i),to:Math.round(vn(e.timeAt(a))*i)},Ac(t,G.from)),c=A.selected;if(G.busy=!0,L(),!await Bi(c,"Grab")){G.busy=!1,L();return}const d=t.takeResult?await t.takeResult(G.from,s,l):{channels:await t.take(G.from,s,l)},u=d.channels;G.busy=!1;const p=t.sources().find(b=>b.id===G.from)?.name??G.from;if(!u){F="reason"in d&&d.reason==="gone"?`Those bars of ${p} are gone (the Studio keeps the last 20 seconds): Grab again.`:`${p} isn't kept that far back yet: let it play ${n} more bar${n===1?"":"s"}, then Grab again.`,L();return}let h=0;for(const b of u)for(const w of b)h=Math.max(h,Math.abs(w));if(h<1e-4){F=`${p} was silent for those ${n===1?"bar":"bars"}.`,L();return}const m=De(c);await wt(c,u,i,`${p} grab`,!0,null,null,null,-5),n===1?(Q(()=>{const b=P(c);b.fit=1,b.keepPitch=!0,b.slices=16,b.cuts=[],b.decay=4;const w=Ce(c);w.length=te;for(const f of w.steps)Object.assign(f,An(),{on:!0})}),F=`Grabbed a bar of ${p}: 16 slices, every step on. Move, mute or lock steps to remix it.`):(et(b=>{b.fit=n,b.keepPitch=!0},c),await _o(8,"transients",c),F=`Grabbed ${n} bars of ${p}, fitted to ${n} bars and sliced at the hits.`),ot(m,`Grabbed ${n===1?"a bar":`${n} bars`}`),L()}const fs=240,Qb=.25,M={phase:"idle",startBeat:0,pad:0,source:"master",rec:null,timer:0,lastBar:0,lastBarFrame:0,fromFrame:0,latency:0,bpm:120,warned:!1,label:""};function Hi(t){const e=Math.floor(t/4)*4;return t-e<Qb?e:e+4}function Jb(t){const e=N?.sampleRate??48e3;return Math.round(vn(O().timeAt(t))*e)}function Kc(t){const e=N?.sampleRate??48e3;return M.fromFrame+Math.round((t-M.startBeat)*60/M.bpm*e)}function ma(t=M.source){return Je()?.sources().find(e=>e.id===t)?.name??t}function Wi(){M.phase==="idle"?Zb():M.phase==="armed"?(M.phase="idle",F="",L()):M.phase==="rec"&&Ui()}async function Zb(){const t=Je();if(!t?.record){F="Take needs the Studio (reload it to update).",L();return}if(!await se()||!N)return;const e=A.selected;if(await Bi(e,"Take")&&M.phase==="idle"){if(M.source=G.from,M.pad=e,t.listen(M.source),!O().running){M.phase="armed",F="Take armed: starts with the music.",L();return}Xc()}}function Xc(){const t=Je();if(!t?.record||!N){M.phase="idle";return}const e=O();M.startBeat=Math.max(0,Hi(e.beatAt(ne()))),M.fromFrame=Jb(M.startBeat),M.bpm=e.bpm,M.latency=Ac(t,M.source);const n=t.record(M.source,M.fromFrame+M.latency);if(!n){M.phase="idle",F=`${ma()} can't be recorded.`,L();return}M.rec=n,M.phase="rec",M.warned=!1,M.lastBar=M.startBeat,M.lastBarFrame=M.fromFrame,F=`Taking ${ma()}: stop on any bar.`,window.clearInterval(M.timer),M.timer=window.setInterval(ey,200),L()}function ey(){if(M.phase!=="rec")return;const t=O();if(!t.running)return;const e=t.beatAt(ne()),n=Math.floor(e/4)*4;n>M.lastBar&&(M.lastBar=n,M.lastBarFrame=Kc(n));const a=240/Math.max(1,t.bpm),o=(Math.max(M.startBeat+4,Hi(e))-M.startBeat)*60/Math.max(1,t.bpm);if(o+a>fs){Ui();return}!M.warned&&o>fs-30&&(M.warned=!0,F="Take stops at four minutes: about 30 seconds left.");const i=Vc();i!==M.label&&(M.label=i,L())}function Vc(){if(M.phase==="armed")return"Armed: waits for Play";if(M.phase==="saving")return"Saving take…";if(M.phase!=="rec")return"Take";const t=O().beatAt(ne());return t<M.startBeat?"Starts on the bar…":`Stop take · bar ${Math.floor((t-M.startBeat)/4)+1}`}async function Ui(t=!1){const e=M.rec;if(M.phase!=="rec"||!e)return;window.clearInterval(M.timer);let n,a;t?(n=M.lastBar,a=M.lastBarFrame):(n=Math.max(M.startBeat+4,Hi(O().beatAt(ne()))),a=Kc(n));const o=Math.round((n-M.startBeat)/4);if(M.rec=null,o<1){e.cancel(),M.phase="idle",F="The music stopped before a whole bar was taken.",L();return}M.phase="saving",L();try{await ty(e,a,o,n)}finally{M.phase="idle",L()}}async function ty(t,e,n,a){let o=null;try{o=await t.stop(e+M.latency)}catch(l){console.error("NYX take",l)}const i=ma();if(!o?.[0]?.length){F=`The take from ${i} came back empty.`,L();return}let s=0;for(const l of o)for(const c of l)s=Math.max(s,Math.abs(c));if(s<1e-4){F=`${i} was silent for the whole take.`,L();return}try{await ny(o,n,a,i)}catch(l){console.error("NYX take",l),F=`The take from ${i} couldn't be kept (${l instanceof Error?l.message:String(l)}).`,L()}}async function ny(t,e,n,a){const o=M.pad,i=`${a} take`.slice(0,20),s=A.pads.filter(d=>d.name.startsWith(i)).length+1,l=De(o);await Qc(o,t,N?.sampleRate??48e3,e,Math.round(M.startBeat/4),{name:`${i} ${s}`,endBeat:n,offsetDb:-5}),ot(l,`Took ${e===1?"a bar":`${e} bars`}`),F=e<=gn?`${e} bar${e===1?"":"s"} of ${a} on ${P(o).name}: it loops every ${e===1?"bar":`${e} bars`}. Tap the pad to play it any time.`:`${e} bars of ${a} on ${P(o).name}. Longer than ${gn} bars, so it plays from the pad (tap or hold it), not the grid.`,L()}async function Qc(t,e,n,a,o,i){await wt(t,e,n,i.name,!1,null,null,i.normalize??null,i.offsetDb??0);const s=a<=gn;Q(()=>em(A,t,a,o));const l=O(),c=i.endBeat;if(c!==void 0&&s&&l.running&&U&&N){const d=P(t),u=Ce(t).steps[0],p=u?Ei(d,0,u,K.info(d.sample??""),l.bpm,!1,Pe.stretchedFor(t)):null,m=l.beatAt(ne()+Fi)-c;if(p&&m>0&&m<4*a){const b=Math.round(m*60/l.bpm*n*p.rate);p.from+b<p.to-1&&U.port.postMessage({type:"play",pad:t,hit:{...p,from:p.from+b,attack:.005}})}}}let to=!1;function Jc(){return A.pads.map((t,e)=>({id:String(e+1),name:tt(e),...t.sample?{filled:!0}:{}}))}async function Zc(t,e){const n=tm(e,A.pads.length);if(n<0)return{ok:!1,reason:"refused",message:`NYX has no pad ${e}.`};if(to||M.phase!=="idle"&&M.pad===n)return{ok:!1,reason:"busy",message:`Pad ${n+1} is busy: try again in a moment.`};if(!await se()||!N)return{ok:!1,reason:"refused",message:"NYX's audio didn't start."};to=!0;try{const a=`${t.fromName}'s ${t.name}`;if(xe(n,!1),ee?.reveal?.(),L(),P(n).sample&&!await Bi(n,"Sent",a))return F=`Kept ${tt(n)}: ${a} was not placed.`,L(),{ok:!1,reason:"cancelled"};const o=t.channels.map(c=>new Float32Array(c)),i=t.bars,s=De(n),l=t.name.slice(0,24);return i!==void 0&&Number.isInteger(i)&&i>=1?(await Qc(n,o,t.sampleRate,i,0,{name:l,normalize:qt(o,t.sampleRate)}),F=i<=gn?`${a} on Pad ${n+1}: fitted to ${i===1?"a bar":`${i} bars`}, it loops every ${i===1?"bar":`${i} bars`}.`:`${a} on Pad ${n+1}: ${i} bars, so it plays from the pad, not the grid.`):(await wt(n,o,t.sampleRate,l,!1,null,null,qt(o,t.sampleRate)),F=`${a} on Pad ${n+1}.`),ot(s,a),L(),{ok:!0,target:e,targetName:tt(n)}}finally{to=!1}}async function ed(t){const e=await gg(t);if(!e){F=`LUCY take ${t.id} could not be read.`,L();return}await wt(A.selected,e,t.sampleRate,`LUCY take ${t.id}`,!0,null,null,qt(e,t.sampleRate))}async function td(){const t=A.selected,e=P(t);!e.sample||!await Xo({title:`Clear ${e.name}?`,body:"Its sample and settings go; its steps stay.",confirmLabel:"Clear"})||(Q(()=>{A.pads[t]=ke(t)}),at())}async function _o(t,e,n=A.selected){const a=P(n);let o=[];if(t&&e==="transients"&&a.sample){const i=await K.get(a.sample);if(i){const s=Math.floor(a.start*i.frames),l=Math.min(i.frames,Math.ceil(a.end*i.frames));o=ng(await ji.analysis(a.sample,i.data,i.sampleRate,s,l),t)}}et(i=>{i.slices=t,i.cuts=o},n)}function nd(t,e){const n=ec[t]??String(t+1);if(Oi(),e==="store")A.slots[t]=xi(A),A.active=t,Ht=!1,ct=`Stored in ${n}`;else if(e==="clear")A.slots[t]=null,A.active===t&&(A.active=null),ct=`Cleared ${n}`,at();else{const a=A.slots[t];if(!a){ct=`${n} is empty: Shift-click or long-press to store`,L();return}ad(a),A.active=t,Ht=!1,ct=`Recalled ${n}`}Ma(),yt(),Oc(),L()}function ad(t){const e=structuredClone(t);A.pads=e.pads,A.lanes=e.lanes,A.swing=e.swing,A.hacks=e.hacks,pe=null;for(const n of bn(A))bt(n).then(()=>yt())}async function od(){if(await se(),N&&N.state!=="running"&&await N.resume().catch(()=>{}),ee&&Wt()){if(ue=!ue,!ue){const t=O();Ze=t.nextBar(t.beatAt(ne()+Fi))}Ut(!0),L(),ue&&jt()?.out?.(wn(_t,me));return}Wt()?ze.stop({at:ne()}):(ue=!1,Ze=0,ee&&jt()?.claim(wn(_t,me)),ze.play({at:ne()}))}let ms=O().running;ze.onChange(()=>{O().running&&!ms&&ee&&(ue=!Dg(_t,me)),ms=O().running,O().running&&M.phase==="armed"&&Xc(),!O().running&&M.phase==="rec"&&Ui(!0),O().running||(ue=!1,Ze=0),yt(),Ut(!0),L()});jt()?.member?.(wn(_t,me),()=>O().running&&!ue);jt()?.onAll(()=>{if(ue){if(ue=!1,Wt()){const t=O();Ze=t.nextBar(t.beatAt(ne()+Fi))}Ut(!0),L()}});function ay(){const t=Mc(A),e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(e),n.download=`nyx${me>1?`-${me}`:""}-pattern-${new Date().toISOString().slice(0,10)}.json`,n.hidden=!0,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e4)}async function oy(t){let e;try{e=JSON.parse(await t.text()),Lc(e)}catch{F=`Couldn't read ${t.name}: not a NYX pattern.`,L();return}await id(e,`Loaded ${t.name}.`)}async function id(t,e){const n=Lc(t),a=$b(t);Q(()=>{a&&(A.slots=a.slots,A.active=a.active),ad(n)}),a&&(Ht=A.active!==null&&JSON.stringify(xi(A))!==JSON.stringify(A.slots[A.active])),ct="";const o=[],i=new Set;for(const l of A.pads)l.sample&&!await K.get(l.sample)&&o.push(l.name);for(const l of A.slots)for(const c of l?.pads??[])c.sample&&!A.pads.some(d=>d.sample===c.sample)&&i.add(c.sample);let s=0;for(const l of i)await K.get(l)||s++;F=o.length?`Loaded. ${o.length===1?"One pad needs its":`${o.length} pads need their`} sample again (${o.join(", ")}): samples stay in the browser they were loaded in.`:s?`${e} ${s===1?"One sample":`${s} samples`} in the slots ${s===1?"isn't":"aren't"} in this browser: samples stay in the browser they were loaded in.`:e,yt(),L()}function iy(){U?.port.postMessage({type:"stop"}),Wt()&&(ee?(ue=!0,jt()?.out?.(wn(_t,me))):ze.stop({at:ne()})),Ut(!0),Ae?.clear({fadeMs:20}),L()}function ry(t){A.master=Math.min(1,Math.max(0,t)),Ma(),ft&&N&&ft.gain.setTargetAtTime(A.master,N.currentTime,.01),kn.value=String(A.master),Gi.textContent=`${Math.round(A.master*100)}%`}const Z=(t,e={},...n)=>{const a=document.createElement(t);for(const[o,i]of Object.entries(e))a.setAttribute(o,i);return a.append(...n),a},Fa=document.getElementById("app");Fa.classList.add("nc","nc-page");tf();const rd=Z("header",{class:"nc-page-hd"},Z("div",{},Z("h1",{class:"nc-page-title",...Rm("page:title")},Z("span",{style:"color: var(--nc-ui-instrument-nyx)"},"NYX")," ",Z("span",{class:"nc-page-sep"},"/")," SAMPLER ",Z("span",{class:"nc-page-sep"},"/")," ",Z("span",{class:"nc-mono"},String(me).padStart(2,"0"))),Z("p",{class:"nc-page-sub"},"A NetComposer element."))),kn=Z("input",{type:"range",class:"nc-range",id:"nyx-master",min:"0",max:"1",step:"0.01",value:String(A.master),"data-nc-id":"nyx-master"});kn.addEventListener("input",()=>ry(Number(kn.value)));const Gi=Z("span",{class:"nc-readout","data-nc-readout":""});Gi.textContent=`${Math.round(A.master*100)}%`;const gs="audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.aif,.aiff,.webm",pt=Z("input",{type:"file"});pt.hidden=!0;let bs="pad";pt.addEventListener("change",()=>{const t=pt.files?.[0];pt.value="",t&&Pi(t)});function Yi(t){bs=t,pt.accept=bs==="pad"?gs:`${gs},.json,application/json`,pt.click()}const Ho=(t,e)=>{const n=Z("button",{type:"button",class:"nc-page-action","data-nyx-action":t.toLowerCase()},t);return I(n,B(`page:${t.toLowerCase()}`),n),n.addEventListener("click",e),n},sd=Z("label",{class:"nc-label",for:"nyx-master"},"Master");I(sd,B("page:master"),kn);const ys=sf({panel:Z("div",{},Z("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},sd,kn,Gi),Ho("Save",ay),Ho("Load",()=>Yi("any")))});rd.append(Z("div",{class:"nc-page-actions"},ys.panel,Ho("Panic",iy),ys.button,pt));const fe=Z("div",{class:"nc-stack","data-nc-layout":"adjacent"});Fa.append(rd,Z("main",{class:"nc-page-body"},fe));Fa.addEventListener("dragover",t=>{t.dataTransfer?.types.includes("Files")&&t.preventDefault()});Fa.addEventListener("drop",t=>{const e=t.dataTransfer?.files?.[0];e&&(t.preventDefault(),Pi(e))});function ws(t){return Math.abs(t)<.01?"C":`${t<0?"L":"R"}${Math.round(Math.abs(t)*100)}`}function ld(){return Wt()?ue?"Sitting out":O().beatAt(ne())<Ze?"Joining on the next bar":"Playing":A.pads.some(e=>e.sample)?"Stopped":"Load a sample to start"}function sy(t){if(t==="always")return"Always";if(t==="fill")return"Only in Fill";if(t==="!fill")return"Not in Fill";if(t==="pre")return"If the last one played";if(t==="!pre")return"If the last one didn't";const[e,n]=t.split(":");return`Pass ${e} of every ${n}`}const cd=[{mode:"repeat16",label:"1/16",title:"Repeat the last 16th while held"},{mode:"repeat8",label:"1/8",title:"Repeat the last 8th while held"},{mode:"reverse",label:"Rev",title:"Play what just happened backwards while held"},{mode:"half",label:"Half",title:"Half speed while held"},{mode:"stop",label:"Stop",title:"Slow to a halt like a tape machine while held"}],$n={fill:!1,perform:null};function ga(t){$n.fill!==t&&($n.fill=t,U?.port.postMessage({type:"fill",on:t}),L())}function Wo(t){$n.perform!==t&&($n.perform=t,U?.port.postMessage({type:"perform",mode:t}),L())}function ly(t){const e=o=>{const s=(o.target instanceof Element?o.target:null)?.closest('[data-nc-id="perform"] [data-nc-choice]'),l=s instanceof HTMLElement?s.dataset.ncChoice:void 0;return cd.some(c=>c.mode===l)?l:null},n=o=>{se(),o==="fill"?ga(!0):Wo(o)},a=()=>{ga(!1),Wo(null)};t.addEventListener("pointerdown",o=>{const i=e(o);if(!i)return;o.preventDefault(),n(i);const s=()=>{a(),window.removeEventListener("pointerup",s),window.removeEventListener("pointercancel",s)};window.addEventListener("pointerup",s),window.addEventListener("pointercancel",s)}),t.addEventListener("keydown",o=>{if((o.key===" "||o.key==="Enter")&&!o.repeat){const i=e(o);if(!i)return;o.preventDefault(),n(i)}}),t.addEventListener("keyup",o=>{(o.key===" "||o.key==="Enter")&&e(o)&&a()}),window.addEventListener("blur",a)}function cy(){return{id:"transport",title:"Transport",status:ct,controls:[{type:"button",id:"play",label:xn()?"Stop":"Play",on:xn(),onPress:()=>void od()},{type:"label",id:"perform-label",text:"Hold to play"},{type:"choice",id:"perform",label:"Hold",value:$n.perform??"",options:cd.map(t=>({value:t.mode,label:t.label})),onChange:()=>{}},{type:"slider",id:"tempo",label:"Tempo",min:40,max:240,step:1,value:Math.round(O().bpm),valueText:`${Math.round(O().bpm)} BPM`,onChange:t=>{ze.setTempo({bpm:t}),L()}},{type:"group",id:"transport-more",title:"Swing",collapse:"phone",summary:Me(A.swing),controls:[{type:"slider",id:"swing",label:"Swing",min:.5,max:.75,step:.01,value:A.swing,valueText:Me(A.swing),onChange:t=>Q(()=>{A.swing=t})}]},{type:"readout",id:"status",label:"Status",value:ld()},{type:"slotRow",id:"slots",morph:0,morphText:"",slots:ec.map((t,e)=>({label:t,filled:A.slots[e]!=null,active:A.active===e,edited:A.active===e&&Ht})),onMorph:()=>{},onSlot:(t,e)=>nd(t,e)}]}}function dd(){if(!xn())return-1;const t=O().beatAt(ne());return t<0||t<Ze?-1:Math.floor(t/wm)%te}function dy(){const t=qc(),e=dd();return{id:"pattern",title:"Pattern",lead:!0,summary:`${A.lanes.filter(n=>n.steps.some(a=>a.on)).length} lanes · ${t.name}`,sections:[{id:"grid",controls:[{type:"stepGrid",id:"grid",playhead:e,selectedRow:`pad-${A.selected}`,rows:A.lanes.map((n,a)=>({id:`pad-${a}`,label:P(a).name,length:n.length,lane:a%4+1,mute:n.mute,solo:n.solo,steps:n.steps.map(o=>({on:o.on,accent:o.accent,velocity:o.velocity,dim:!P(a).sample}))})),onToggle:(n,a,o)=>fa(n,a,i=>{o?(i.accent=i.on?!i.accent:!0,i.on=!0):(i.on=!i.on,i.on||(i.accent=!1))}),onSet:(n,a,o,i)=>fa(n,a,s=>{o==="on"?(s.on=i,i||(s.accent=!1)):(s.accent=i,i&&(s.on=!0))}),onSelectRow:n=>xe(n),onLongPress:(n,a)=>{pe={lane:n,step:a},xe(n,!1)},onMute:n=>Q(()=>{Ce(n).mute=!Ce(n).mute}),onSolo:n=>Q(()=>{Ce(n).solo=!Ce(n).solo}),onLength:(n,a)=>Q(()=>{Ce(n).length=Math.max(1,Math.min(te,a))}),transport:{playing:xn(),onToggle:()=>void od()},onFill:n=>ga(n),onClear:()=>qb(),clearLabel:pn?"Undo":"Clear"},{type:"note",id:"grid-help",text:"Tap a name to hear it. Long-press a step for its locks."}]},{id:"pads",title:"Pad",controls:[{type:"padGrid",id:"pads",label:"Pads",columns:4,selected:A.selected,pads:A.pads.map((n,a)=>({label:n.name,empty:!n.sample,peaks:Fb(n),lane:a%4+1,playing:Sn.has(a),badge:n.choke?ya[n.choke-1]:void 0,badgeLabel:n.choke?`choke group ${ya[n.choke-1]}`:void 0,hint:we?.route()&&mn(n)?"tuned · CALLIOPE":void 0})),onDown:n=>hy(n),onPress:n=>fy(n),onFile:(n,a)=>{xe(n,!1),Pi(a,n)},onMove:(n,a,o)=>my(n,a,o),menu:n=>by(n),onMenu:(n,a)=>void yy(n,a),onRename:(n,a)=>gy(n,a)},{type:"button",id:"library",label:"Library",on:!1,onPress:()=>nt()}]}]}}function uy(t){if(!pe||pe.lane!==A.selected)return[];const{lane:e,step:n}=pe,a=Ce(e).steps[n];if(!a)return[];const o=i=>fa(e,n,i);return[{type:"label",id:"lock-label",text:`Step ${n+1}`},{type:"slider",id:"lock-velocity",label:"Velocity",min:0,max:1,step:.01,value:a.velocity,valueText:Me(a.velocity),onChange:i=>o(s=>{s.velocity=i})},{type:"slider",id:"lock-chance",label:"Chance",min:0,max:1,step:.05,value:a.chance,valueText:Me(a.chance),onChange:i=>o(s=>{s.chance=i})},...t.slices?[{type:"select",id:"lock-slice",label:"Slice",value:a.slice===null?"auto":String(a.slice),options:[{value:"auto",label:`In order (${n%t.slices+1})`},...Array.from({length:t.slices},(i,s)=>({value:String(s),label:`Slice ${s+1}`}))],onChange:i=>o(s=>{s.slice=i==="auto"?null:Number(i)})}]:[],{type:"slider",id:"lock-pitch",label:"Pitch",min:-12,max:12,step:1,value:a.pitch,valueText:yn(a.pitch," st"),onChange:i=>o(s=>{s.pitch=i})},{type:"select",id:"lock-cond",label:"Plays",value:a.cond,options:sa.map(i=>({value:i,label:sy(i)})),onChange:i=>o(s=>{sa.includes(i)&&(s.cond=i)})},{type:"choice",id:"lock-reverse",label:"Direction",value:a.reverse?"rev":"pad",options:[{value:"pad",label:"As the pad"},{value:"rev",label:"Reversed"}],onChange:i=>o(s=>{s.reverse=i==="rev"})},{type:"button",id:"lock-done",label:"Done",on:!1,onPress:()=>{pe=null,L()}}]}function py(){const t=Je();if(!t)return[];const e=t.sources();return[{type:"label",id:"grab-label",text:t.record?"Grab or take":"Grab the bar"},{type:"select",id:"grab-from",label:"From",value:G.from,options:e.map(n=>({value:n.id,label:n.name})),onChange:n=>{G.from=n,t.listen(n),L()}},{type:"choice",id:"grab-bars",label:"Bars",value:String(G.bars),options:[1,2,4].map(n=>({value:String(n),label:String(n)})),onChange:n=>{G.bars=n==="4"?4:n==="2"?2:1,L()}},{type:"button",id:"grab",label:G.busy?"Grabbing…":G.bars===1?"Grab last bar":`Grab last ${G.bars} bars`,on:G.busy,onPress:()=>void _i()},...t.record?[{type:"button",id:"take",label:Vc(),on:M.phase!=="idle",onPress:()=>Wi()}]:[]]}let ba=-1;function hy(t){if(!P(t).sample)return;ba=t,xe(t);const e=()=>{ba=-1};window.addEventListener("pointerup",()=>setTimeout(e),{once:!0})}function fy(t){if(ba===t){ba=-1;return}if(!P(t).sample){xe(t,!1),Yi("pad");return}xe(t)}function my(t,e,n){Q(()=>{const a=structuredClone(P(t)),o=structuredClone(P(e));A.pads[e]=a,n||(A.pads[t]=o.sample?o:ke(t))}),xe(e,!1)}const ya=["A","B","C","D"];function gy(t,e){et(n=>{n.name=e.slice(0,24)},t)}function by(t){const e=!!P(t).sample,n=[{id:"load",label:e?"Replace…":"Load a file…"}],a=Oo().slice(-4).reverse();for(const s of a)n.push({id:`take-${s.id}`,label:`LUCY take ${s.id}`});const o=a[0];if(o&&n.push({id:`chop-take-${o.id}`,label:`Chop LUCY take ${o.id}…`}),Je()&&n.push({id:"grab",label:G.bars===1?"Grab the last bar":`Grab the last ${G.bars} bars`}),Je()?.record&&n.push({id:"record",label:M.phase==="rec"?"Stop the take":`Take from ${ma(G.from)}`}),n.push({id:"library",label:"Library…"}),P(t).provenance){const s=Ii(t);if(s.length)for(const l of s)n.push({id:`alt-${l.id}`,label:`Alternative: ${Ea(l.title)}`});else ye.ensure().then(()=>L()),n.push({id:"alternatives",label:"Alternatives…"})}return e&&n.push({id:"chop",label:"Chop to pads…"}),e&&n.push({id:"rename",label:"Rename…"},{id:"clear",label:"Clear"}),n}async function yy(t,e){if(xe(t,!1),e==="load")Yi("pad");else if(e==="grab")await _i();else if(e==="record")Wi();else if(e==="clear")await td();else if(e==="library")nt(!0);else if(e==="chop")await Mn();else if(e.startsWith("chop-take-")){const n=Oo().find(a=>`chop-take-${a.id}`===e);n&&await Xb(n)}else if(e==="alternatives"){const n=P(t).provenance;nt(!0,n?n.query||n.role:void 0)}else if(e.startsWith("alt-")){const n=Ii(t).find(a=>`alt-${a.id}`===e);n&&await Ca(n,P(t).provenance?.query??"",t)}else if(e.startsWith("take-")){const n=Oo().find(a=>`take-${a.id}`===e);n&&await ed(n)}}const Ki=new _m;document.addEventListener("keydown",t=>{!he||t.repeat||t.shiftKey||t.altKey||!(t.metaKey||t.ctrlKey)||t.key.toLowerCase()!=="z"||(t.target instanceof HTMLElement?t.target:null)?.closest("input, select, textarea, [contenteditable]")||(t.preventDefault(),qi())});const ud=t=>U?.port.postMessage({type:"release",pad:t});document.addEventListener("keydown",t=>{if(t.repeat||t.metaKey||t.ctrlKey||t.altKey||(t.target instanceof HTMLElement?t.target:null)?.closest("input, select, textarea, [contenteditable]"))return;const n=wc(t);n<0||!P(n).sample||(t.preventDefault(),!(Ki.press(t)<0)&&Ge(n,null,!0))});document.addEventListener("keyup",t=>{const e=Ki.release(t);e>=0&&ud(e)});window.addEventListener("blur",()=>{for(const t of Ki.releaseAll())ud(t)});function Xi(t){const e=B("kit:pad-key");t.querySelectorAll('[data-nc-id="pads"] .nc-padgrid-pad').forEach((n,a)=>{const o=jm[a];if(!o)return;let i=n.querySelector(":scope > .nyx-pad-key");i||(i=Z("span",{class:"nyx-pad-key","aria-hidden":"true"}),n.append(i)),i.textContent!==o&&(i.textContent=o),I(i,e)})}function vs(t,e){const n=$i(t,e,O().bpm),a=Number(n.toFixed(2));return{speed:n,far:t.keepPitch&&(a<It[0]||a>It[1])}}function pd(t){const e=t.querySelector('[data-nc-id="fit-speed"]');if(!e)return;const n=qc(),a=n.sample?K.info(n.sample):void 0,o=Number((a?$i(n,a,O().bpm):1).toFixed(2)),i=n.keepPitch&&(o<It[0]||o>It[1]);e.toggleAttribute("data-nyx-far",i)}const xs=["C","C♯","D","E♭","E","F","F♯","G","A♭","A","B♭","B"];function wy(t,e){const n=we?.route();if(!n)return[];const a=mn(e),o=s=>et(s),i=e.sample?e.fit>0?`Pad ${t+1} is fitted to bars: it keeps its pitch.`:a?`Pad ${t+1}'s hits play at the root of CALLIOPE's chord, from ${xs[e.note]}. The pattern's own hits still play.`:`Pad ${t+1} keeps its own pitch. Follow tunes its hits to CALLIOPE's root.`:"Load a sound on this pad to tune it to CALLIOPE.";return[{type:"label",id:"notes-label",text:"Notes in"},{type:"note",id:"notes-by",text:`Played by ${n.name} · ${Og(n)}`},...e.sample&&e.fit===0?[{type:"toggle",id:"pad-follow",label:"Follow CALLIOPE",pressed:a,onPress:()=>o(s=>{s.follow=!mn(s)})},{type:"select",id:"pad-note",label:"Sample is",value:String(e.note),options:xs.map((s,l)=>({value:String(l),label:s})),onChange:s=>o(l=>{l.note=Number(s)})}]:[],{type:"note",id:"notes-how",text:i},{type:"button",id:"notes-open",label:`Open ${n.name.split(" ")[0]}`,on:!1,onPress:()=>void we?.open()},{type:"button",id:"notes-mine",label:"Play it myself",on:!1,onPress:()=>{we?.takeBack()&&L()}}]}function vy(){const t=A.selected,e=P(t),n=e.sample?K.info(e.sample):void 0,a=ki(e).slice(1,-1),o=e.end-e.start,i=n?n.frames/n.sampleRate:0,s=!!e.sample,l=s&&!n,c=p=>et(p),d=mt.get(t),u=s?[...e.provenance?[{type:"readout",id:"credit",label:"Credit",value:`${e.provenance.creator} · ${hi(e.provenance.license,e.provenance.licenseStatus)}`}]:[],{type:"readout",id:"sample",label:"Length",value:l?e.provenance?.origin==="local"?"Local sound, not here: open its local Library":"Not in this browser: load it again":`${lt(i*o)} of ${lt(i)} · ${n?.channels===2?"stereo":"mono"}`},...gc(d,e)&&n?[{type:"note",id:"auto-fit-note",text:Lm(d.fit)},...es({...d.fit,...vs(e,n)})?[{type:"note",id:"auto-fit-far",text:es({...d.fit,...vs(e,n)})}]:[],{type:"button",id:"auto-fit-undo",label:"Undo fit",on:!1,onPress:()=>Ib(t)}]:[],{type:"choice",id:"mode",label:"Mode",value:e.mode,options:[{value:"oneshot",label:"One-shot"},{value:"gate",label:"Gate"},{value:"loop",label:"Loop"}],onChange:p=>c(h=>{h.mode=p})},{type:"choice",id:"dir",label:"Direction",value:e.dir,options:[{value:"fwd",label:"Forward"},{value:"rev",label:"Reverse"},{value:"pingpong",label:"Ping-pong"}],onChange:p=>c(h=>{(p==="fwd"||p==="rev"||p==="pingpong")&&(h.dir=p)})},{type:"slider",id:"start",label:"Start",min:0,max:1,step:.001,value:e.start,valueText:lt(e.start*i),onChange:p=>c(h=>{h.start=Math.min(p,h.end-.002)}),onCommit:()=>void Ge(t)},{type:"slider",id:"end",label:"End",min:0,max:1,step:.001,value:e.end,valueText:lt(e.end*i),onChange:p=>c(h=>{h.end=Math.max(p,h.start+.002)}),onCommit:()=>void Ge(t)},{type:"select",id:"slices",label:"Slices",value:String(e.slices),options:tc.map(p=>({value:String(p),label:p?`${p}`:"Off"})),onChange:p=>void _o(Number(p),e.cuts.length?"transients":"even")},...e.slices?[{type:"choice",id:"chop",label:"Chop",value:e.cuts.length?"transients":"even",options:[{value:"even",label:"Even"},{value:"transients",label:"At hits"}],onChange:p=>void _o(e.slices,p==="transients"?"transients":"even")}]:[],{type:"button",id:"chop-to-pads",label:"Chop to pads…",on:gt.isOpen,onPress:()=>void Mn()},{type:"group",id:"tune-shape",title:"Tune & shape",summary:zm(e),controls:[{type:"label",id:"pitch-label",text:"Pitch"},{type:"slider",id:"tune",label:"Tune",min:-24,max:24,step:1,value:e.tune,valueText:yn(e.tune," st"),onChange:p=>c(h=>{h.tune=p}),onCommit:()=>void Ge(t)},{type:"slider",id:"fine",label:"Fine",min:-100,max:100,step:1,value:e.fine,valueText:yn(e.fine," ct"),onChange:p=>c(h=>{h.fine=p})},{type:"select",id:"fit",label:"Fit to bars",value:String(e.fit),options:[{value:"0",label:"Off"},...[1,2,4,8].map(p=>({value:String(p),label:`${p} bar${p===1?"":"s"}`}))],onChange:p=>{mt.delete(t),c(h=>{h.fit=Number(p)})}},...e.fit&&n?[{type:"choice",id:"keep-pitch",label:"Keep pitch",value:e.keepPitch?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:p=>c(h=>{h.keepPitch=p==="on"})},{type:"readout",id:"fit-speed",label:"Speed",value:`${Fm($i(e,n,O().bpm))}${e.keepPitch&&Pe.pending(t)&&!Pe.failed?" · stretching…":""}`}]:[],{type:"choice",id:"auto-fit",label:"Auto-fit loops",value:Vn?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:p=>{Vn=p==="on",Cm(Vn),L()}},{type:"label",id:"shape-label",text:"Shape"},{type:"slider",id:"attack",label:"Attack",min:0,max:.1,step:.001,taper:"time",value:e.attack,valueText:lt(e.attack),onChange:p=>c(h=>{h.attack=p})},{type:"slider",id:"decay",label:"Decay",min:.01,max:4,step:.01,taper:"time",value:e.decay,valueText:Gn(e.decay),onChange:p=>c(h=>{h.decay=p}),onCommit:()=>void Ge(t)},{type:"slider",id:"cutoff",label:"Filter",min:-1,max:1,step:.01,value:e.cutoff,valueText:Un(e.cutoff),onChange:p=>c(h=>{h.cutoff=Math.abs(p)<.02?0:p})},{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:e.resonance,valueText:Me(e.resonance),onChange:p=>c(h=>{h.resonance=p})}]},{type:"label",id:"out-label",text:"Output"},{type:"slider",id:"level",label:"Level",min:0,max:1,step:.01,value:e.level,valueText:Me(e.level),onChange:p=>c(h=>{h.level=p})},...e.sample?[{type:"label",id:"normalize-label",text:"Normalize"},{type:"choice",id:"normalize",label:"Normalize",value:Vr(e)?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:p=>void Rb(t,p==="on")},{type:"readout",id:"normalize-gain",label:"Gain",value:Vr(e)?e.provenance?"Library level":Gf(e.normalize?.gainDb??0):"As recorded"}]:[],{type:"group",id:"pad-more",title:"Pan & choke",collapse:"phone",summary:`Pan ${ws(e.pan)} · Choke ${e.choke?ya[e.choke-1]:"none"}`,controls:[{type:"slider",id:"pan",label:"Pan",min:-1,max:1,step:.01,value:e.pan,valueText:ws(e.pan),onChange:p=>c(h=>{h.pan=Math.abs(p)<.02?0:p})},{type:"select",id:"choke",label:"Choke",value:String(e.choke),options:[{value:"0",label:"None"},...ya.map((p,h)=>({value:String(h+1),label:`Group ${p}`}))],onChange:p=>c(h=>{h.choke=Number(p)})},{type:"button",id:"clear-pad",label:"Clear pad",on:!1,onPress:()=>void td()}]}]:[];return{id:"params",title:"Params",summary:e.name,controls:[...s?[{type:"canvas",id:"wave",label:"Wave",paint:"waveform",peaks:e.sample?ua.get(e.sample)??[]:[],region:[e.start,e.end],markers:a.map(p=>e.start+p*o),position:Sn.get(t)??-1}]:[],...F?[{type:"note",id:"notice",text:F}]:[],...wy(t,e),...uy(e),...u,...py()]}}function Uo(t,e){Q(()=>e(A.hacks[t]))}function xy(t,e){const n=A.hacks[t].dials[e.key]??e.default,a=`hack-${t}-${e.key}`,o=i=>Uo(t,s=>{s.dials[e.key]=i});return e.options?{type:"select",id:a,label:e.label,value:String(n),options:e.options.map(i=>({value:String(i.value),label:i.label})),onChange:i=>o(Number(i))}:{type:"slider",id:a,label:e.label,min:e.min,max:e.max,step:e.step??1,taper:lp(e),value:n,valueText:Cs(e,n,O().bpm),onChange:o}}const Rn=(t,e)=>(Be(t)?.dials??[]).filter(n=>!n.key.startsWith("mod_")&&n.more===!0===e).map(n=>xy(t,n)),ks=new Map;function no(t){let e=ks.get(t);if(e)return e;let n=0,a=null;const o={in:0,out:0},i=()=>{const s=mu(Ae,t);if(s!==a){for(let l=0;l<n;l++)a?.close();a=s;for(let l=0;l<n;l++)a?.open()}};return e={open:()=>(i(),n++,a?.open(),!0),close:()=>{n!==0&&(i(),n--,a?.close())},read:()=>(i(),a?.read()??o)},ks.set(t,e),e}function ky(){const t=A.hacks,e=t.filter,n=e.mode==="lp"&&e.cutoff>=.999,a=i=>Q(()=>i(A.hacks.filter)),o=[yc(e)?"":"Filter",t.drive.on?"Drive":"",t.compressor.on?"Comp":""].filter(Boolean);return{id:"hacks",title:"Hacks",summary:o.length?o.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:e.on,meter:no(`${Mi(e).type}-1`),meterHelp:B("hack-meter"),onToggle:i=>a(s=>{s.on=i}),controls:[{type:"select",id:"filter-mode",label:"Mode",value:e.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:i=>a(s=>{(i==="lp"||i==="hp"||i==="bp")&&(s.mode=i)})},{type:"slider",id:"filter-cutoff",label:"Cutoff",min:0,max:1,step:.01,value:e.cutoff,valueText:n?"open":Do(bc(e.cutoff)),onChange:i=>a(s=>{s.cutoff=i})},...e.mode==="lp"?[]:[{type:"slider",id:"filter-resonance",label:"Resonance",min:0,max:1,step:.01,value:e.resonance,valueText:Me(e.resonance),onChange:i=>a(s=>{s.resonance=i})}],{type:"canvas",id:"filter-curve",label:"Curve",paint:"filter",mode:e.mode,cutoff:e.cutoff,resonance:e.mode==="lp"?0:e.resonance,...Pm(e)}]},{type:"group",id:"hacks-more",title:"Drive & Compressor",collapse:"phone",summary:`Drive ${t.drive.on?"on":"off"} · Compressor ${t.compressor.on?"on":"off"}`,controls:[{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:t.drive.on,meter:no("drive-1"),meterHelp:B("hack-meter"),onToggle:i=>Uo("drive",s=>{s.on=i}),controls:Rn("drive",!1),more:Rn("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:t.compressor.on,meter:no("compressor-1"),meterHelp:B("hack-meter"),onToggle:i=>Uo("compressor",s=>{s.on=i}),controls:Rn("compressor",!1),more:Rn("compressor",!0)}]}]}}const Vi=[cy,dy,vy,ky].map(t=>({def:t,handle:ff(t())}));mf(fe,Vi.map(t=>t.handle),"adjacent");ly(fe);Xi(fe);Li(fe);function hd(){const t=fe.querySelector('[data-nc-section="pads"] [data-nc-id="library"]');ye.attach(t),gt.attach(t)}function L(){Wb?.update(),Ub?.changed();for(const t of Vi)t.handle.update(t.def());hd(),ye.isOpen&&ye.refresh(),Xi(fe),pd(fe),Li(fe)}let $s="";function fd(){Ut();const t=Sn.get(A.selected)??-1,e=JSON.stringify([dd(),ld(),Math.round(t*400)]);if(e!==$s){$s=e;for(const n of Vi.slice(0,3))n.handle.update(n.def());hd(),Xi(fe),pd(fe),Li(fe)}requestAnimationFrame(fd)}requestAnimationFrame(fd);we?.onChange(t=>{t&&L()});we?.route()&&L();globalThis.__NC_NOTES__={read:()=>({routes:we?[...we.follower.routes]:[],points:we?we.follower.points():[],follows:A.pads.map(t=>mn(t))}),log:{start(){pa.length=0,ha=!0,U?.port.postMessage({type:"hitlog",on:!0})},take:()=>pa.splice(0),stop(){ha=!1,U?.port.postMessage({type:"hitlog",on:!1})}}};zb.start();Promise.all([...bn(A)].map(t=>K.get(t))).then(t=>{for(const e of t)e&&zc(e);L()});if(ee)se(),ee.providePreset?.({format:xb,version:kb,get:()=>(Mb(A),Mc(A)),set:async t=>{await id(t,"Loaded the Scene's pattern.")}}),Je()?.listen(G.from),ee.onAudio?.({label:"Pad",targets:Jc,receive:Zc});else{const t=()=>{se()};document.addEventListener("pointerdown",t,{once:!0,capture:!0}),document.addEventListener("keydown",t,{once:!0,capture:!0})}window.__nyx={state:A,clock:ze,store:K,stretcher:Pe,stretchTimes:Dc,selectPad:t=>xe(t,!1),edit:t=>Q(()=>t(A)),runStretch:Bc,get stretchLoaded(){return Xn!==null},get ctx(){return N},get masterOut(){return ft},chop:{open:Mn,get panel(){return gt},get times(){return ji.times}},get fx(){return Ae},get positions(){return Sn},get voices(){return Pc},ensureAudio:se,play:Ge,async setSample(t,e,n,a="test"){await se()&&await wt(t,e,n,a,!0,null,null,qt(e,n))},grab:G,grabBars:_i,get padUndo(){const t=he?.before[0];return he&&t?{index:t.index,sample:t.pad.sample,pads:he.before.map(e=>e.index)}:null},undoPad:qi,receiveAudio:Zc,padTargets:Jc,take:M,pressTake:Wi,get notice(){return F},setPerform:Wo,setFill:ga,actSlot:nd,get edited(){return Ht},library:{get panel(){return ye},open:t=>nt(!0,t),close:()=>nt(!1),catalog:Rc,local:Ta,load:Ca,buildKit:()=>ye.buildKit(),alternatives:t=>Ii(t).map(e=>e.id),preview:Gc,get previewing(){return Pt?.id??null}},toggleStep(t,e){fa(t,e,n=>{n.on=!n.on})}};
