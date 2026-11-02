(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const Qe=1e-9;function Gs(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class Ra{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return Gs(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let i=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+Qe&&(i=s.bpm);const r=[{beat:t.beat,time:t.time,bpm:this.clamp(i)}];for(const s of a){if(s.beat<=t.beat+Qe)continue;const l=this.clamp(s.bpm);l!==r[r.length-1].bpm&&r.push({beat:s.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+Qe){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-Qe;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,i=.25){const r=this.bpmAt(n);if(!(a>0)||!(i>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/i));this.setTempoAt(r,n);for(let l=1;l<=s;l++)this.setTempoAt(r+(t-r)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new Ra({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+Qe)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+Qe)return n[a];return n[0]}}const Ys=Object.freeze({beatsPerBar:4,beatUnit:4}),it=1e-9;function Ks(e){return Math.floor(e+it)}function Di(e,t,n=!1){if(!(t>0))return e;const i=Math.ceil(e/t-it)*t;return n&&i<=e+it?i+t:i}class Xs{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new Ra({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??Ys}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-it&&(this.stopTime===null||t<this.stopTime-it)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-it?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=Ks(t/n),i=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:i,barPhase:i/n}}nextBar(t,n=!1){return Di(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const qi="nc-clock/snapshot",Bi=1;function Vs(e,t="local"){return{format:qi,version:Bi,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function Qs(e,t){const n=Js(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const be=e=>typeof e=="number"&&Number.isFinite(e),So=e=>e===null||be(e);function Js(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==qi&&n("format"),(!be(t.version)||Math.floor(t.version)!==Bi)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!be(t.anchor.beat)||!be(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&be(a.beat)&&be(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!be(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!be(t.meter.beatUnit))&&n("meter"),(!So(t.startTime)||!So(t.stopTime)||!be(t.stoppedBeat))&&n("transport times"),t}class Zs{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new Xs(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){Qs(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return Vs(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const el="nc-sync/1",tl=1,nl="nc-sync",al="nc-sync-leader",ol=0,Ri=.5,Oi=.75;function il(e){return typeof e=="number"&&Number.isFinite(e)&&e>=Ri&&e<=Oi?e:null}const jn=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),$t=e=>typeof e=="number"&&Number.isFinite(e),Vt=e=>typeof e=="string"&&e.length>0;function rl(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==tl||!Vt(t.type)||!Vt(t.from)||!$t(t.term)||!$t(t.seq)||!$t(t.sentAt))return null;switch(t.type){case"hello":return Vt(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return $t(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&$t(t.slot)?t:null;case"ping":case"pong":return Vt(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function sl(e,t,n,a,i){return{proto:el,from:t,term:n,seq:a,sentAt:i,...e}}function V(){return(performance.timeOrigin+performance.now())/1e3}const _n=.003,ll=3,Wn=.002+1e-6,cl=.01,Mo=500;class To{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?cl:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=_n&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const i=n-(this.timeOrigin+a)/1e3,r=this.median(),s=i-r,l=Math.abs(i-this.preStepBase),u=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!u&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&u===this.pendingBack&&(u||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(i,r,u))):(this.pendingStep=s,this.pendingBack=u,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const i=this.ctx.currentTime,r=i<=this.revertUntil;let s;if(a&&r){const l=this.offsets,u=this.preStep;l.length=0;for(let d=0;d<u.length;d++)l.push(u[d]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:i,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!r){const d=this.offsets,c=this.preStep;c.length=0;for(let p=0;p<d.length;p++)c.push(d[p]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?i+this.stepRevert:-1/0}const l=this.offsets,u=t-n;for(let d=0;d<l.length;d++)l[d]+=u;this.stepCount++,s={stepSeconds:t-n,confirmedAt:i,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let r=0;r<a;r++){const s=t[r];let l=r-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const i=a>>1;return a%2?n[i]:(n[i-1]+n[i])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.readLatency(!1);let n=null,a=!1;const i=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=_n&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Mo)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),n=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3,a=!0;else if(!i||!(i.contextTime>=_n)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<Mo)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(ll,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let i=-1,r=0;for(let l=0;l<n;l++){let u=0;for(let d=0;d<n;d++)Math.abs(t[d]-t[l])<=Wn&&u++;u>r&&(i=l,r=u)}if(r<a)return;const s=t[i];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>Wn&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-(this.offset-this.userOffsetMs/1e3))<=Wn}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const i=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(i,2)};setTimeout(i,2)})}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,i=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(i)&&i>0?i:null}}class dl{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...jn,...t.capabilities},this.channelOption=t.channel??nl,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const i=this.o.now(),r=()=>{n===this.startWaits&&t(i)};return a.then(r,r),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const i=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(i),0)}else{const i=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?i:Math.max(t+this.o.gatedStartLeadSeconds,i),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[i,r]=this.tempoRange();t=Math.min(r,Math.max(i,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const u=s.beatAt(l+this.o.minLeadSeconds),d=Math.max(n??Di(u,1),u);a&&a>0?(s.tempo.rampTempo(t,d,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,d),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(Oi,Math.max(Ri,t)):ol;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=il(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=rl(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const i=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...jn,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),i||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const r of this.peers.values())r.leader=r.id===n.from;const i=this.peers.get(n.from);i?i.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...jn},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(i=>{this.leader&&this.decideStart(i)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const i of[...this.snapshotListeners])i(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const i of[...this.messageListeners])i(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(al,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(r,s,l)=>[r?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),i=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const s=n(r.capabilities.prefersLeader,r.joinedAt,r.id);(i===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,i=r.id)}this.setLeader(i===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],i=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==i[0]?a[0]<i[0]:a[1]!==i[1]?a[1]<i[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const i=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>i&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(sl(t,this.id,this.term,++this.seq,this.o.now()))}}const ul="modulepreload",pl=function(e){return"/nyx/"+e},Co={},hl=function(t,n,a){let i=Promise.resolve();if(n&&n.length>0){let s=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=l?.nonce||l?.getAttribute("nonce");i=s(n.map(d=>{if(d=pl(d),d in Co)return;Co[d]=!0;const c=d.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const m=document.createElement("link");if(m.rel=c?"stylesheet":ul,c||(m.as="script"),m.crossOrigin="",m.href=d,u&&m.setAttribute("nonce",u),document.head.appendChild(m),c)return new Promise((g,w)=>{m.addEventListener("load",g),m.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return i.then(s=>{for(const l of s||[])l.status==="rejected"&&r(l.reason);return t().catch(r)})};var ml=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],ia=[.25,.5,.75,1,1.5,2],fl=4.9,O={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},He={fmt:"wet"},pe={fmt:"pct"},Je={fmt:"db"},Qt={fmt:"signedPct"},Un={fmt:"num",suffix:" ms"},B={div:100};function T(e,t,n,a,i,r,s,l){var u={key:e,label:t,min:n,max:a,default:i,step:1,k:r,unit:null,format:s};if(l)for(var d in l)u[d]=l[d];return u}function Jt(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var Lt=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[T("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:O.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[T("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:O.hpHz,astrid:!0,zero:"off"}),T("q","Resonance",0,100,0,2,{fmt:"q",law:O.hpQ},{dsp:{law:O.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[T("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:O.bpHz,astrid:!0},{dsp:{law:O.bpHz}}),T("q","Q",0,100,0,2,{fmt:"q",law:O.bpQ},{dsp:{law:O.bpQ}}),T("mix","Mix",0,100,100,3,He,{dsp:B,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[T("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Jt(ml),overriddenBy:"beats_free",tempoSynced:!0}),T("feedback","Feedback",0,90,35,2,pe,{dsp:B,unit:"%"}),T("mix","Wet/dry",0,100,0,3,He,{dsp:B,unit:"%",astridKey:"wet"}),T("tone","Tone",0,100,100,4,{fmt:"hz",law:O.delayTone,offAt:100},{dsp:{div:99},more:!0}),T("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),T("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Jt([[0,"Insert"],[1,"Send"]]),more:!0}),T("send","Send",0,100,100,7,pe,{dsp:B,unit:"%",more:!0}),T("mod_send","Accent → send",-100,100,0,8,Qt,{dsp:B,unit:"%",more:!0}),T("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[T("predelay","Pre-delay",0,200,0,1,Un,{dsp:{div:1e3},unit:"ms"}),T("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:B,unit:"%"}),T("decay","Decay",0,100,50,3,pe,{dsp:B,unit:"%"}),T("damping","Damping",0,100,0,4,pe,{dsp:B,unit:"%"}),T("mix","Mix",0,100,0,5,He,{dsp:B,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[T("rate","Rate",0,100,26,1,{fmt:"rate",law:O.rate},{dsp:{law:O.rate}}),T("depth","Depth",0,100,70,2,pe,{dsp:B,unit:"%"}),T("feedback","Feedback",-90,90,50,3,Qt,{dsp:B,unit:"%"}),T("mix","Mix",0,100,50,4,He,{dsp:B,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[T("rate","Rate",0,100,52,1,{fmt:"rate",law:O.rate},{dsp:{law:O.rate}}),T("depth","Depth",0,100,50,2,pe,{dsp:B,unit:"%"}),T("spread","Spread",0,100,70,3,pe,{dsp:B,unit:"%"}),T("mix","Mix",0,100,40,4,He,{dsp:B,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[T("rate","Rate",0,100,39,1,{fmt:"rate",law:O.rate},{dsp:{law:O.rate}}),T("depth","Depth",0,100,70,2,pe,{dsp:B,unit:"%"}),T("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Jt([[4,"4"],[6,"6"],[8,"8"]])}),T("feedback","Feedback",0,90,30,4,pe,{dsp:B,unit:"%"}),T("mix","Mix",0,100,50,5,He,{dsp:B,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[T("low_db","Low",-18,18,0,1,Je,{unit:"dB"}),T("mid_db","Mid",-18,18,0,2,Je,{unit:"dB"}),T("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:O.midHz,astrid:!0},{dsp:{law:O.midHz}}),T("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:O.eqQ},{dsp:{law:O.eqQ}}),T("high_db","High",-18,18,0,4,Je,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[T("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),T("output_db","Output",-12,12,0,2,Je,{unit:"dB"}),T("mix","Mix",0,100,100,3,He,{dsp:B,unit:"%"}),T("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Jt([[0,"Smooth"],[1,"Acid"]]),more:!0}),T("tone","Tone",0,100,100,5,{fmt:"hz",law:O.driveTone,offAt:100},{dsp:{div:99},more:!0}),T("mod_drive","Accent → drive",-100,100,0,6,Qt,{dsp:B,unit:"%",more:!0}),T("mod_tone","Accent → tone",-100,100,0,7,Qt,{dsp:B,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[T("threshold_db","Threshold",-60,0,0,1,Je,{unit:"dB"}),T("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:O.ratio},{dsp:{law:O.ratio}}),T("attack_ms","Attack",1,100,10,3,Un,{unit:"ms"}),T("release_ms","Release",10,1e3,150,4,Un,{unit:"ms"}),T("makeup_db","Makeup",0,24,0,5,Je,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[T("width","Width",0,200,100,1,pe,{dsp:B,unit:"%"}),T("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:B})]}],gl=Lt.map(function(e){return e.type});Lt.filter(function(e){return!e.hidden}).map(function(e){return e.type});var bl={reverb:"plate"};function Oa(e){var t=bl[e]||e;return gl.indexOf(t)>=0?t:null}function Se(e){for(var t=Oa(e),n=0;n<Lt.length;n++)if(Lt[n].type===t)return Lt[n];return null}function at(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function Ii(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=at(n.law,t);return a===null?0:a}function Lo(e,t){return Math.min(fl,e*60/(t>0?t:120))}var Fo=function(e){return e>0?"+":e<0?"−":""};function yl(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function Hi(e,t,n){var a=e.format,i;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:Fo(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return Fo(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(i=at(a.law,t),i===null?a.zero||"open":a.astrid?yl(i):i+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+at(a.law,t).toFixed(1);case"ratio":return at(a.law,t).toFixed(1)+":1";case"rate":return i=at(a.law,t),(i<1?i.toFixed(2):i<10?i.toFixed(1):i.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var r=0;r<e.options.length;r++)if(e.options[r].value===t)return e.options[r].label;return String(t);case"tempoMs":return Math.round(Lo(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(Lo(t,n)*1e3)+" ms"}return String(t)}var wl=1,Ln=["drive","delay","plate"];function vl(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,i){return Hi(e,a,i)},t}var Ft=Ln.map(function(e){var t=Se(e),n={type:e,label:t.label,dials:t.dials.map(vl)};return t.tempoSynced&&(n.tempoSynced=!0),n}),xl={reverb:"plate"};function mn(e){var t=xl[e]||e;return Ln.indexOf(t)>=0?t:null}function Fn(e){for(var t=mn(e),n=0;n<Ft.length;n++)if(Ft[n].type===t)return Ft[n];return null}function ji(e,t){var n=Fn(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function st(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function Be(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,i=1;i<e.options.length;i++)Math.abs(e.options[i].value-t)<Math.abs(a-t)&&(a=e.options[i].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var r=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*r)/r))+0}function kl(){return{v:wl,chain:Ft.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function $l(e){return ia.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},ia[0])}function Gn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function El(e){for(var t=Array.isArray(e)?e:Gn(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=kl(),i={},r=[],s=0;s<t.length;s++){var l=t[s];if(Gn(l)){var u=mn(l.type);if(!u){typeof l.type=="string"&&r.push(l.type);continue}if(i[u]){r.push(u);continue}i[u]=!0;var d=a.chain[Ln.indexOf(u)],c=Gn(l.dials)?l.dials:{};u==="delay"&&c.mix===void 0&&c.wet!==void 0&&(c=Object.assign({},c,{mix:c.wet})),d.bypass=n?l.bypass===!0:l.bypass!==!1,Fn(u).dials.forEach(function(p){d.dials[p.key]=Be(p,c[p.key])}),Al(u,d.dials,c)}}return{state:a,dropped:r}}function Al(e,t,n){for(var a=Fn(e),i=0;i<a.dials.length;i++){var r=a.dials[i];r.stepWhen&&(t[r.key]=Be(r,n&&typeof n[r.key]=="number"?n[r.key]:t[r.key],st(r,t)))}}function ra(e){return El(e).state}function Sl(e){return JSON.parse(JSON.stringify(e))}var Ml=24,sa={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function la(e,t,n){if(t==="bypass")return n?0:1;var a=ji(e,t)||Tl(e,t);return a?Ii(a,n):0}function Tl(e,t){var n=Se(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var Cl={};Ft.forEach(function(e){e.dials.forEach(function(t){Cl[e.type+"."+t.key]=t.format})});function Yn(e,t){var n=new Float64Array(Ml),a=ra(e);return a.chain.forEach(function(i){var r=sa[i.type];n[r.bypass]=i.bypass?0:1,Object.keys(i.dials).forEach(function(s){n[r[s]]=la(i.type,s,i.dials[s])})}),n}var Ll=2,fn=3,Fl=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Et(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function _i(e,t){var n=Se(e);if(!n)return null;var a={};(t||[]).forEach(function(s){s&&s.id&&(a[s.id]=!0)});for(var i=1;a[n.type+"-"+i];)i++;var r={};return n.dials.forEach(function(s){r[s.key]=s.default}),{id:n.type+"-"+i,type:n.type,bypass:!1,dials:r}}function zl(e){var t=Se(e.type),n=/-(\d+)$/.exec(e.id||"");return(t?t.label:e.type)+(n&&+n[1]>1?" "+n[1]:"")}function Nl(e,t,n){var a=e.length-1,i=Math.max(0,Math.min(a,n));if(t<0||t>a||t===i)return e;var r=e.slice(),s=r.splice(t,1)[0];return r.splice(i,0,s),r}function Pl(e){return typeof e=="number"&&isFinite(e)?$l(e):e}function zo(e,t,n){var a={};return e.dials.forEach(function(i){var r=t[i.key];r===void 0&&i.astridKey&&(r=t[i.astridKey]),n&&e.type==="delay"&&i.key==="delay_beats"&&(r=Pl(r)),a[i.key]=Be(i,r)}),e.dials.forEach(function(i){i.stepWhen&&(a[i.key]=Be(i,typeof t[i.key]=="number"?t[i.key]:a[i.key],st(i,a)))}),a}function Dl(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,i=1/0,r=e.min;r<=e.max;r++){var s=at(n.law,r),l=s===null?1/0:Math.abs(s-t);l<i&&(i=l,a=r)}return a}}var ql={rate:"rate_hz"};function Bl(e,t,n,a){var i={};return e.dials.forEach(function(r){if(!r.more){var s=r.astridKey||ql[r.key]||r.key;i[r.key]=Dl(r,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),i}function Rl(e,t){var n=t>0?Math.floor(t):fn,a=[],i=[],r=[],s=!1,l=!1;Array.isArray(e)?(r=e,l=!0):Et(e)&&Array.isArray(e.chain)&&(r=e.chain,s=e.v===1,l=e.schema===2);for(var u=[],d=0;d<r.length;d++){var c=r[d];if(Et(c)&&!(c.type==="limiter"||c.fixed===!0)){var p=Oa(c.type),m=p&&Se(p);if(!m||s&&["drive","delay","plate"].indexOf(p)<0){typeof c.type=="string"&&a.push(c.type);continue}if(u.length>=n){a.push(c.id||p);continue}var g;Et(c.params)&&!Et(c.dials)?g=zo(m,Bl(m,c.params,i,c.id||p),l):g=zo(m,Et(c.dials)?c.dials:{},l);var w=_i(p,u),y=typeof c.id=="string"&&Fl.test(c.id)&&!u.some(function(f){return f.id===c.id})?c.id:w.id,h=s?c.bypass!==!1:c.bypass===!0;u.push({id:s?w.id:y,type:p,bypass:h,dials:g})}}return{state:{v:Ll,chain:u},dropped:a,notes:i}}function on(e,t){return Rl(e,t).state}function Ze(e){var t=Se(e.type),n=[[0,e.bypass?0:1]];return t.dials.forEach(function(a){n.push([a.k,Ii(a,e.dials[a.key])])}),n}function Ol(e){var t=on(e,8),n=[],a=t.chain.map(function(i,r){var s=Se(i.type),l={};return r>=fn&&n.push(i.id+": ASTRID keeps three hacks"),s.dials.forEach(function(u){var d=i.dials[u.key];if(u.more){d!==u.default&&n.push(i.id+"."+u.key);return}u.key==="delay_beats"&&ia.indexOf(d)<0&&n.push(i.id+".delay_beats"),l[u.astridKey||u.key]=d}),{id:i.id,type:i.type,bypass:i.bypass,dials:l}});return{hacks:a,lossy:n}}var Il="nc-fx@1",Hl=600,jl=256,_l=8,At=typeof WeakMap=="function"?new WeakMap:null;function Wl(e,t){var n=At&&At.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await hl(async()=>{const{default:r}=await import("./worklet-source-BibsVBZk.js");return{default:r}},[])).default,i=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(i)}finally{URL.revokeObjectURL(i)}})(),At&&(At.set(e,n),n.catch(function(){At.delete(e)})),n)}function et(e,t){return typeof e=="number"&&isFinite(e)?e:t}function Wi(e,t,n,a){var i=Math.min(400,Math.max(20,et(t.bpm,120))),r=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",u=et(t.preGain,1),d=Math.max(0,et(t.crossfade,.012)),c=et(t.maxDelaySeconds,void 0),p=e.createGain(),m=e.createGain(),g=e.createGain(),w=e.createGain(),y=null;t.modInput===!0&&(y=e.createGain(),y.channelCount=1,y.channelCountMode="explicit",y.channelInterpretation="discrete"),w.gain.value=0,p.connect(g),g.connect(m),w.connect(m);var h={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:i,mUsers:0,lv:null,lvAt:0},f=n(i);h.post=function(k){h.node?h.node.port.postMessage(k):h.disposed||(r.length>=jl&&(r=a().concat([{t:"tempo",bpm:h.bpm,when:0}]),h.mUsers>0&&r.push({t:"meter",on:!0})),r.push(k))};function b(k){var x=r.map(function(M){var L=Object.assign({},M);return L.when>k||(L.when=0,L.t!=="clear"&&(L.snap=!0)),L});return r=[],x}h.emit=function(k){for(var x=0;x<h.listeners.length;x++)try{h.listeners[x](k)}catch(M){typeof console<"u"&&console.error(M)}},h.whenOf=function(k){return typeof k=="number"&&isFinite(k)&&k>0?k:0};var v=!1;h.tooFar=function(k){return typeof k=="number"&&k>e.currentTime+Hl?(!v&&typeof console<"u"&&(v=!0,console.warn("nc-fx: ignoring a time "+Math.round(k-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var E=Wl(e,t.moduleUrl).then(function(){if(!h.disposed){var k=Object.assign({bpm:i,bypassMode:l,limiter:s,preGain:u,maxDelaySeconds:c},f);k.pending=b(e.currentTime),h.node=new AudioWorkletNode(e,Il,{numberOfInputs:y?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:k}),h.node.port.onmessage=function(M){var L=M.data;L&&L.t==="lv"&&h.mUsers>0&&(h.lv=L.d,h.lvAt=No())},p.connect(h.node),y&&y.connect(h.node,0,1),h.node.connect(w);var x=e.currentTime;x<=0||d===0?(g.gain.value=0,w.gain.value=1):(g.gain.setValueAtTime(1,x),g.gain.linearRampToValueAtTime(0,x+d),w.gain.setValueAtTime(0,x),w.gain.linearRampToValueAtTime(1,x+d)),h.status="ready"}},function(k){h.status="unavailable",r=[],h.error=k});h.meterOpen=function(){return h.disposed||h.status==="unavailable"?!1:(h.mUsers++===0&&h.post({t:"meter",on:!0}),!0)},h.meterClose=function(){h.mUsers!==0&&--h.mUsers===0&&(h.lv=null,h.disposed||h.post({t:"meter",on:!1}))},h.levels=function(){return h.lv&&No()-h.lvAt<Ul?h.lv:null};var A={};return h.meter=function(k,x){if(A[k])return A[k];var M=0,L={in:0,out:0},R={open:function(){return h.meterOpen()?(M++,!0):!1},close:function(){M!==0&&(M--,h.meterClose())},read:function(){var G=M>0?h.levels():null;return L.in=0,L.out=0,G&&x(G,L),L}};return A[k]=R,R},h.core={input:p,output:m,modInput:y,ready:E,get status(){return h.status},get error(){return h.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function(k,x){var M=et(k,NaN);!(M>0)||h.disposed||h.tooFar(x)||(h.bpm=Math.min(400,Math.max(20,M)),h.post({t:"tempo",bpm:h.bpm,when:h.whenOf(x)}),h.emit({effect:null,key:"tempo",value:h.bpm}))},getTempo:function(){return h.bpm},clear:function(k){var x=k&&typeof k=="object"?k:{at:k};if(!(h.disposed||h.tooFar(x.at))){var M=et(x.fadeMs,0);h.post({t:"clear",when:h.whenOf(x.at),fadeMs:M>0?Math.min(1e3,M):0})}},onChange:function(k){return h.listeners.push(k),function(){var x=h.listeners.indexOf(k);x>=0&&h.listeners.splice(x,1)}},dispose:function(){if(!h.disposed){if(h.disposed=!0,h.status="disposed",r=[],h.listeners.length=0,h.node){h.node.port.postMessage({t:"dispose"}),h.node.port.close();try{h.node.disconnect()}catch{}}[p,g,w,m,y].forEach(function(k){try{k&&k.disconnect()}catch{}})}}},h}var Ul=250;function No(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function Ui(e,t){t.in=e[0],t.out=e[1]}function Gl(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function Yl(e,t){var n=t||{};if(n.slots)return Kl(e,n);var a=ra(n.state),i=Array.from(Yn(a)),r=Wi(e,n,function(){return{program:i}},function(){return[{t:"load",program:Array.from(Yn(a)),when:0}]}),s=r.core;function l(u){return a.chain[Ln.indexOf(u)]}return s.setParam=function(u,d,c,p){var m=mn(u);if(!(!m||r.disposed||r.tooFar(p))){var g=l(m),w;if(d==="bypass")w=!!c;else{var y=ji(m,d);if(!y)return;w=Be(y,c,st(y,g.dials))}return d==="bypass"?g.bypass=w:g.dials[d]=w,r.post({t:"p",i:sa[m][d],v:la(m,d,w),when:r.whenOf(p)}),r.emit({effect:m,key:d,value:w}),Fn(m).dials.forEach(function(h){if(!(!h.stepWhen||!h.stepWhen.some(function(v){return v.key===d}))){var f=g.dials[h.key],b=Be(h,f,st(h,g.dials));b!==f&&(g.dials[h.key]=b,r.post({t:"p",i:sa[m][h.key],v:la(m,h.key,b),when:r.whenOf(p)}),r.emit({effect:m,key:h.key,value:b}))}}),w}},s.meter=function(){return r.meter("",Ui)},s.getParam=function(u,d){var c=mn(u);if(c){var p=l(c);return d==="bypass"?p.bypass:p.dials[d]}},s.getState=function(){return Sl(a)},s.setState=function(u,d){r.disposed||r.tooFar(d&&d.at)||(a=ra(u),r.post({t:"load",program:Array.from(Yn(a)),when:r.whenOf(d&&d.at)}),r.emit({effect:null,key:null,value:null}))},s}function Kl(e,t){var n=t.slots===!0?fn:Math.max(1,Math.min(_l,Math.floor(+t.slots)||fn)),a=on(t.state,n),i=1,r={};function s(h){return r[h.id]||(r[h.id]=i++),r[h.id]}function l(h){return h.map(function(f){return{uid:s(f),type:f.type,program:Ze(f)}})}var u=l(a.chain),d=a.chain.map(function(h){return r[h.id]}),c=Wi(e,t,function(){return{slots:n,chain:u,order:d}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(h){return r[h.id]}),when:0}]}),p=c.core;function m(h){var f;for(f=0;f<a.chain.length;f++)if(a.chain[f].id===h)return a.chain[f];var b=Oa(h);if(b){for(f=0;f<a.chain.length;f++)if(a.chain[f].type===b)return a.chain[f]}return null}function g(h,f){var b=s(h);c.post({t:"add",uid:b,type:h.type,when:f}),Ze(h).forEach(function(v){c.post({t:"ps",uid:b,k:v[0],v:v[1],when:f,snap:!0})})}function w(h){c.post({t:"order",uids:a.chain.map(function(f){return r[f.id]}),when:h})}function y(h,f){var b={};a.chain.forEach(function(A){b[A.id]=A});var v=a.chain.map(function(A){return r[A.id]}).join();h.chain.forEach(function(A){var k=b[A.id];if(!k||k.type!==A.type){delete r[A.id],g(A,f);return}var x={};Ze(k).forEach(function(M){x[M[0]]=M[1]}),Ze(A).forEach(function(M){x[M[0]]!==M[1]&&c.post({t:"ps",uid:r[A.id],k:M[0],v:M[1],when:f})})});var E={};h.chain.forEach(function(A){E[A.id]=!0}),Object.keys(r).forEach(function(A){E[A]||delete r[A]}),a=h,a.chain.map(function(A){return r[A.id]}).join()!==v&&w(f)}return p.slots=n,p.meter=function(h){return h==null||h===""?c.meter("",Ui):c.meter("#"+h,function(f,b){var v=m(h),E=v?r[v.id]:0,A=f[2];if(E){for(var k=3,x=0;x<A;x++,k+=3)if(f[k]===E){b.in=f[k+1],b.out=f[k+2];return}}})},p.setParam=function(h,f,b,v){var E=m(h);if(!(!E||c.disposed||c.tooFar(v))){var A=Se(E.type),k,x=null;if(f==="bypass")k=!!b;else{for(var M=0;M<A.dials.length;M++)A.dials[M].key===f&&(x=A.dials[M]);if(!x)return;k=Be(x,b,st(x,E.dials))}var L={},R={};Ze(E).forEach(function(z){L[z[0]]=z[1]}),A.dials.forEach(function(z){z.stepWhen&&(R[z.key]=E.dials[z.key])}),f==="bypass"?E.bypass=k:E.dials[f]=k,A.dials.forEach(function(z){z.stepWhen&&(E.dials[z.key]=Be(z,E.dials[z.key],st(z,E.dials)))});var G=c.whenOf(v),ce=r[E.id];return Ze(E).forEach(function(z){(L[z[0]]!==z[1]||x&&z[0]===x.k)&&c.post({t:"ps",uid:ce,k:z[0],v:z[1],when:G})}),c.emit({effect:E.id,key:f,value:k}),Object.keys(R).forEach(function(z){z!==f&&E.dials[z]!==R[z]&&c.emit({effect:E.id,key:z,value:E.dials[z]})}),k}},p.getParam=function(h,f){var b=m(h);if(b)return f==="bypass"?b.bypass:b.dials[f]},p.getState=function(){return JSON.parse(JSON.stringify(a))},p.setState=function(h,f){c.disposed||c.tooFar(f&&f.at)||(y(on(h,n),c.whenOf(f&&f.at)),c.emit({effect:null,key:null,value:null}))},p.addEffect=function(h,f){var b=f||{},v=_i(h,a.chain);if(!(!v||a.chain.length>=n||c.disposed||c.tooFar(b.at))){if(b.dials){var E=on({v:2,chain:[{id:v.id,type:v.type,dials:b.dials}]},1).chain[0];v.dials=E.dials}b.bypass===!0&&(v.bypass=!0);var A=a.chain.slice(),k=typeof b.index=="number"?Math.max(0,Math.min(A.length,b.index)):A.length;return A.splice(k,0,v),y({v:2,chain:A},c.whenOf(b.at)),c.emit({effect:v.id,key:"chain",value:"add"}),v.id}},p.removeEffect=function(h,f){var b=m(h),v=f&&f.at;return!b||c.disposed||c.tooFar(v)?!1:(y({v:2,chain:a.chain.filter(function(E){return E!==b})},c.whenOf(v)),c.emit({effect:b.id,key:"chain",value:"remove"}),!0)},p.moveEffect=function(h,f,b){var v=m(h),E=b&&b.at;if(!v||c.disposed||c.tooFar(E))return!1;var A=Nl(a.chain,a.chain.indexOf(v),f);return A===a.chain?!1:(y({v:2,chain:A},c.whenOf(E)),c.emit({effect:v.id,key:"chain",value:"move"}),!0)},p.getChain=function(){return a.chain.map(function(h){return{id:h.id,type:h.type,name:zl(h),bypass:h.bypass}})},p.toAstrid=function(){return Ol(a)},p}function Po(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function Xl(e,t,n){var a=n||{},i=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,r=typeof a.toAudioTime=="function"?a.toAudioTime:i?function(m){return i.toContextTime(m)}:t&&t.timebase==="shared"?null:function(m){return m},s=typeof a.now=="function"?a.now:i&&typeof i.sharedNow=="function"?function(){return i.sharedNow()}:null,l=t&&t.transport?t.transport:t,u=l&&l.tempo?l.tempo:l,d=!1;function c(m){if(!r){!d&&typeof console<"u"&&(d=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof m!="number")){var g=r(l.timeAt(m));return typeof g=="number"&&isFinite(g)?g:void 0}}function p(){var m=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(m)){var g=l&&typeof l.bpm=="number"?l.bpm:Po(u,0);g>0&&e.setTempo(g);return}var w=Po(u,m);w>0&&e.setTempo(w);for(var y=u&&(u.points||u.tempoPoints)||[],h=0;h<y.length;h++){var f=y[h];if(f.beat>m&&f.bpm>0){var b=c(f.beat);b!==void 0&&e.setTempo(f.bpm,b)}}}return p(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(m){m&&(m.kind==="tempo"&&m.bpm>0?e.setTempo(m.bpm,c(m.atBeat)):(m.kind==="snapshot"||m.kind==="start")&&p())})}const Vl="/nyx/assets/worklet-CAv1bvAp.js";var Ql="nc-ui",Jl={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","nyx-amber":"#FEAA02","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Ia={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#9B30FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},gn={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Zl={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Ne={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},ec={light:{color:Jl.color,semantic:Ia,component:gn,runtime:Zl},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},Mt=e=>`--${Ql}-${e}`,ca=Ia["label-on-fill-dark"],Do=Ia["label-on-fill-light"],tc=Ne["label-min-contrast"],nc=/^#[0-9a-f]{6}$/i,ac=e=>typeof e=="string"&&nc.test(e),rn=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function qo(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),i=r=>{let s=(r+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${rn(i(0)*255)}${rn(i(8)*255)}${rn(i(4)*255)}`}function Gi(e){let[t,n,a]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),i=Math.max(t,n,a),r=Math.min(t,n,a),s=(i+r)/2,l=i-r;if(!l)return{h:0,s:0,l:s};let u=l/(1-Math.abs(2*s-1));return{h:((i===t?60*((n-a)/l%6):i===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:u,l:s}}function Bo(e){let[t,n,a]=[1,3,5].map(i=>{let r=parseInt(e.slice(i,i+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function da(e,t){let[n,a]=[Bo(e),Bo(t)].sort((i,r)=>r-i);return(n+.05)/(a+.05)}var bn=e=>da(e,ca)>=da(e,Do)?ca:Do;function Yi(e,t,n,a=tc){let i=qo(e,t,n),r=bn(i)===ca?1:-1;for(let s=0;s<40&&da(i,bn(i))<a;s++)n+=r*.01,i=qo(e,t,n);return i}function oc(e){let{h:t,s:n}=Gi(e),a=Yi(t,Math.min(n,Ne["surprise-on-max-saturation"]),Ne["surprise-on-lightness"]);return{fill:e,ink:bn(e),on:a,onInk:bn(a)}}var ic=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function rc(e,t=Math.random){let[n,a]=Ne["surprise-saturation"],[i,r]=Ne["surprise-lightness"],s=Ne["surprise-min-hue-gap"],l=ac(e)?Gi(e).h:null,u=t()*360;return l!==null&&ic(u,l)<s&&(u=(l+s+t()*(360-2*s))%360),Yi(u,n+t()*(a-n),i+t()*(r-i))}function sc(e){if(!e)return null;let t=oc(e);return{[Mt("surprise-fill")]:t.fill,[Mt("surprise-ink")]:t.ink,[Mt("surprise-on")]:t.on,[Mt("surprise-on-ink")]:t.onInk}}var lc=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,cc=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Ro(e){let[t,n,a]=[1,3,5].map(l=>lc(parseInt(e.slice(l,l+2),16)/255)),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),r=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*i+.793617785*r-.0040720468*s,1.9779984951*i-2.428592205*r+.4505937099*s,.0259040371*i+.7827717662*r-.808675766*s]}function dc([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,i=(e-.1055613458*t-.0638541728*n)**3,r=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*i+.2309699292*r,-1.2684380046*a+2.6097574011*i-.3413193965*r,-.0041960863*a-.7034186147*i+1.707614701*r].map(s=>rn(cc(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var uc=Ne["velocity-range"],Ki={min:gn.rhythm["velocity-min"],max:gn.rhythm["velocity-max"]},Oo=Object.fromEntries(Object.entries(ec).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function pc(e,t=Ki){let[n,a]=uc,i=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,r=(i-n)/(a-n),s=t.ink??gn.rhythm["step-cell-ink"];if(r<=0)return{velocity:i,t:0,fill:t.min.toUpperCase(),ink:s};if(r>=1)return{velocity:i,t:1,fill:t.max.toUpperCase(),ink:s};let l=Ro(t.min),u=Ro(t.max);return{velocity:i,t:r,fill:dc(l.map((d,c)=>d+(u[c]-d)*r)),ink:s}}function Io(e,t=Ki){return{[Mt("velocity-fill")]:pc(e,t).fill}}var Xi="data-nc-theme",Ho="nc-ui-theme-change",hc="(prefers-color-scheme: dark)",Vi=e=>e?.documentElement??null,Qi=e=>e?.defaultView?.matchMedia?.(hc)??null,mc=e=>e==="light"||e==="dark"?e:"system";function fc(e=globalThis.document){return mc(Vi(e)?.getAttribute(Xi))}function ua(e=globalThis.document){let t=fc(e);return t!=="system"?t:Qi(e)?.matches?"dark":"light"}function Ji(e,t=globalThis.document){let n=Vi(t);if(!n)return()=>{};let a=ua(t),i=()=>{let u=ua(t);u!==a&&(a=u,e(u))},r=t.defaultView?.MutationObserver,s=r?new r(i):null;s?.observe(n,{attributes:!0,attributeFilter:[Xi]});let l=Qi(t);return l?.addEventListener?.("change",i),t.addEventListener(Ho,i),()=>{s?.disconnect(),l?.removeEventListener?.("change",i),t.removeEventListener(Ho,i)}}var gc={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},bc={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","eq-graph-height":"length","eq-graph-height-max":"length","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},yc={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},wc={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},zn={};for(let[e,t]of Object.entries(bc))zn[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(wc))zn[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(yc))zn[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(gc.renames.map(e=>[e.old,e.new]));function Zi(e){let t=zn[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function I(e){return Zi(e).prop}function o(e){return`var(${I(e)})`}function vc(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(I(t)));return Number.isFinite(n)?n:0}function _(e,t){let n=Zi(t),a=e.ownerDocument??document,i=a.createElement("span");i.dataset.ncLive=t,i.style.position="absolute",i.style.pointerEvents="none";let r=`var(${n.prop})`;n.kind==="family"?i.style.fontFamily=r:n.kind==="length"||n.kind==="other"||n.kind==="duration"?i.style.paddingLeft=r:i.style.color=r,(e instanceof Element?e:a.documentElement).append(i);let s=(a.defaultView??window).getComputedStyle(i),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return i.remove(),l}function er(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function xc(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=o("font-ui"),n.style.fontSize=o("label-size"),n.style.fontWeight=o("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var kc="[data-modulated], [data-modulated] *";function Kn(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function jo(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${o("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${o("hairline")} solid ${o("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function $c(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${o(`module-bg-stack-${a}`)};
      ${I("text-sub")}: ${o(`module-sub-stack-${a}`)};
      ${I("divider")}: ${o(`module-div-stack-${a}`)};
      ${I("slider-track")}: ${o(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${o(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${o(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${o("module-bg-stack-1")};
      ${I("text-sub")}: ${o("module-sub-stack-1")};
      ${I("divider")}: ${o("module-div-stack-1")};
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
${kc} { transition: none; }
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
/* Fold (onFold): a −/+ after the switch. Folded, the card keeps its header row only; in a console row from 769 px it
   is a narrow column instead (below). It folds and unfolds at once: no motion. */
.nc-ui-fx-hd > [data-nc-fx-hide] { flex: none; }
/* Like a channel strip's (Peter, 2026-11-01: "the minimize icon should be positioned in the same place as the
   instrument channels"): the fold triangle sits in the card's top-left corner, above the name. */
.nc-ui-fx:has(> .nc-ui-fx-hd > [data-nc-fx-hide]) { position: relative; }
.nc-ui-fx-hd > [data-nc-fx-hide] { position: absolute; top: ${o("control-gap")}; left: ${o("control-gap")}; z-index: 1; }
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
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
  transition: transform ${o("motion-press")} ${o("motion-press-easing")};
}
.nc-fold-toggle[aria-expanded="false"] .nc-fold-tri,
.nc-ui-fx-fold > .nc-fold-tri { transform: scaleX(-1); }
.nc-ui-fx-fold > .nc-fold-tri { flex: none; color: ${o("text-sub")}; }
.nc-ui-fx-fold:hover > .nc-fold-tri { color: ${o("text")}; }
.nc-ui-fx-fold { display: none; }
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
.nc-ui-fx-visual { display: block; width: 100%; height: ${o("display-height")}; }
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
  .nc-fold-toggle::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${o("target-min")});
    height: max(100%, ${o("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-strip[data-nc-folded] > .nc-strip-ms { gap: 0; }
  .nc-strip[data-nc-folded] .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: 0; margin-top: calc(${o("module-gap")} * -1); }
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
  ${I("text-sub")}: ${o("module-sub-stack-1")};
  ${I("divider")}: ${o("module-div-stack-1")};
  ${I("slider-track")}: ${o("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-template-columns: repeat(3, ${o("fx-card-width")});
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
  ${I("text-sub")}: ${o("module-sub-stack-1")};
  ${I("divider")}: ${o("module-div-stack-1")};
  ${I("slider-track")}: ${o("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${o("control-gap")} ${o("module-pad")};
  padding-bottom: ${o("module-pad")};
  background: ${o("module-bg-stack-1")};
  ${I("text-sub")}: ${o("module-sub-stack-1")};
  ${I("divider")}: ${o("module-div-stack-1")};
  ${I("slider-track")}: ${o("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${o("stack-card-pad-y")} ${o("module-pad")} ${o("module-pad")};
  ${I("text-sub")}: inherit;
  ${I("divider")}: inherit;
  ${I("slider-track")}: inherit;
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { background: ${o("module-bg-adjacent-2")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { background: ${o("module-bg-adjacent-3")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { background: ${o("module-bg-adjacent-4")}; }
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
    width: ${o("fx-fold-width")};
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
    width: ${o("fx-fold-width")};
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
    width: ${o("fx-fold-width")};
    margin-inline-end: calc(${o("fx-fold-width")} * -1);
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
   (the master too, with empty M/S and send rows) keeps the same row heights, so faders and ticks line up. */
.nc-strip {
  position: relative;
  flex: none;
  width: ${o("strip-width")};
  display: grid;
  /* Name, Inserts, M/S, sends, pan, the fader body, the readout. */
  grid-template-rows: auto ${o("slider-pitch")} ${o("slider-pitch")} calc(${o("knob-size")} + ${o("control-gap")} + ${o("label-size")} * ${o("label-leading")}) calc(${o("knob-size")} + ${o("control-gap")} + ${o("label-size")} * ${o("label-leading")}) auto auto;
  justify-items: center;
  row-gap: ${o("module-gap")};
  min-width: 0;
  padding-inline: ${o("control-gap")};
}
/* sendsHidden: no sends row (the host's "hide the sends"); give it to every strip so their rows still line up. */
.nc-strip[data-nc-sends-hidden] {
  grid-template-rows: auto ${o("slider-pitch")} ${o("slider-pitch")} calc(${o("knob-size")} + ${o("control-gap")} + ${o("label-size")} * ${o("label-leading")}) auto auto;
}
.nc-strip[data-nc-sends-hidden] > .nc-strip-sends { display: none; }
.nc-strip + .nc-strip { border-inline-start: ${o("hairline")} solid ${o("divider")}; }
/* Channel strips alternate light and dark grey, full height, so a row of identical strips reads apart (Peter,
   2026-10-30); the master keeps the module's shade. */
.nc-strip:not([data-nc-master]) { background: ${o("strip-bg")}; }
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) { background: ${o("strip-alt-bg")}; }
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
   ▶ in the corner, the name row kept but unseen, M and S stacked over the Inserts and M/S rows, then the name read bottom to top under a small mark in the
   fader cap's colour (one button, the FX fold's look) beside a thin meter. At once: no motion. */
/* The triangle sits in the strip's top-left corner, above the name; folded, centred over the column. */
.nc-strip > [data-nc-strip-hide] { position: absolute; top: ${o("control-gap")}; left: ${o("control-gap")}; z-index: 1; }
.nc-strip[data-nc-folded] > [data-nc-strip-hide] { left: 50%; transform: translateX(-50%); }
.nc-strip[data-nc-folded] { width: ${o("strip-fold-width")}; padding-inline: 0; align-content: start; }
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
.nc-strip[data-nc-folded] > .nc-strip-ms { grid-row: 2 / span 2; flex-direction: column; height: auto; gap: ${o("module-gap")}; }
.nc-strip[data-nc-folded] .nc-ms-wrap { width: ${o("slider-pitch")}; }
/* Touch: each folded M and S a full target-min box (after the rule above, so it wins). */
@media (pointer: coarse) {
  .nc-strip[data-nc-folded] .nc-ms-wrap { width: ${o("target-min")}; }
}
.nc-strip[data-nc-folded] > .nc-strip-body {
  grid-row: 6;
  grid-template-columns: auto auto;
  column-gap: ${o("control-gap")};
}
.nc-strip[data-nc-folded][data-nc-sends-hidden] > .nc-strip-body { grid-row: 5; }
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
.nc-strip-ms { display: flex; gap: ${o("control-gap")}; height: ${o("slider-pitch")}; }
/* Hacks: a full-width toggle above M and S, in mixed case and a lighter grey (Peter); pressed while the console's fx area shows this strip's stack. */
.nc-strip-hacks { display: flex; width: 100%; height: ${o("slider-pitch")}; }
.nc-hacks-wrap { position: relative; flex: 1 1 auto; height: ${o("slider-pitch")}; }
.nc-hacks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  /* A light outline at rest (Peter, 2026-10-31): the divider; text-sub on hover, so it still reads as a button. */
  border: ${o("hairline")} solid ${o("divider")};
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
/* On the darker alternate strips the divider outline nearly vanishes: text-sub at 50% there (still lighter than the
   old outline); hover still takes it to text-sub. */
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) .nc-hacks:not([aria-pressed="true"]) {
  border-color: color-mix(in oklab, ${o("text-sub")} 50%, ${o("divider")});
}
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) .nc-hacks:not([aria-pressed="true"]):hover { border-color: ${o("text-sub")}; }
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
    radial-gradient(closest-side, ${o("surface-page")} 70%, transparent 72%),
    conic-gradient(from 225deg, ${o("meter-fill")} calc(var(--knob-turn, 0) * 1deg), ${o("meter-track")} 0 270deg, transparent 0);
}
/* A bipolar knob (pan) fills from the top of its travel (the centre) to the value, either way. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-knob {
  background:
    radial-gradient(closest-side, ${o("surface-page")} 70%, transparent 72%),
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
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] { grid-template-columns: repeat(3, minmax(0, 1fr)); }
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
${jo("")}
}
@media (max-width: 1023px) {
${jo("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Kn("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Kn("")}
}
@media (max-width: 1023px) {
${Kn("html[data-nc-landscape] ")}
}
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
`}var Xn=null,Ec="nc-ui-fallback";function tr(e=globalThis.document){if(!e?.documentElement||(e.documentElement,Xn&&Xn.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Ec} {
${$c()}
}
`,e.head.append(t),Xn=t}var St=null,Ac=0,Sc=new URL("/nyx/assets/confirm-BSJWrX8s.css",import.meta.url).href,nr=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Sc,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&nr(document);function ar(e){return Mc(e).then(t=>!!t.ok)}function Mc({title:e,body:t,confirmLabel:n="Confirm",cancelLabel:a="Cancel",danger:i=!1,root:r,returnFocus:s,signal:l},u){if(St||l?.aborted)return Promise.resolve({});let d=r?.ownerDocument??document,c=nr(d),p=r??d.body,m=d.defaultView??globalThis,g=`nc-ui-confirm-${++Ac}`,w=(N,J,re)=>{let Ce=d.createElement(N);return Ce.className=`nc-ui-confirm${J}`,re!=null&&(Ce.textContent=re),Ce},y=w("div","-layer");y.dataset.state="enter";let h=w("div","");h.setAttribute("role","alertdialog"),h.setAttribute("aria-modal","true"),h.setAttribute("aria-labelledby",`${g}-t`),h.setAttribute("aria-describedby",`${g}-b`);let f=w("h2","-title",e);f.id=`${g}-t`;let b=w("p","-body",t);b.id=`${g}-b`;let v=w("div","-actions"),E=(N,J)=>{let re=w("button","-btn",N);return re.type="button",re.dataset.ncConfirm=J,re.addEventListener("click",()=>Te(J==="ok")),re},A=E(a,"cancel"),k=E(n,"ok");i&&(k.dataset.danger="true"),v.append(A,k);let[x,M]=[];h.append(f,b,...x?[x]:[],v);let L=[M,A,k].filter(Boolean);y.append(h);let R={layer:y};St=R;let G=s??d.activeElement,ce=[];for(let N of p.children)N.hasAttribute("inert")||(N.setAttribute("inert",""),ce.push(N));let z=()=>{if(St!==R)return;p.append(y),(M??A).focus({preventScroll:!0});let N=m.requestAnimationFrame?.bind(m)??(J=>setTimeout(J,16));N(()=>N(()=>{y.dataset.state==="enter"&&(y.dataset.state="open")}))};c?c.then(z):z();let Me=!1;y.addEventListener("pointerdown",N=>{Me=N.target===y}),y.addEventListener("click",N=>{N.target===y&&Me&&Te(!1),Me=!1});let xt=N=>{if(N.stopImmediatePropagation(),N.key==="Escape")N.preventDefault(),Te(!1);else if(N.key==="Tab"){N.preventDefault();let J=L.filter(Ce=>!Ce.disabled),re=J.length;J[(J.indexOf(d.activeElement)+(N.shiftKey?re-1:1))%re].focus()}else N.key==="Enter"&&(N.preventDefault(),d.activeElement===A?Te(!1):k.disabled||Te(!0))},kt=N=>N.stopImmediatePropagation();m.addEventListener("keydown",xt,!0),m.addEventListener("keyup",kt,!0);let Xe=()=>Te(!1);l?.addEventListener("abort",Xe);let Q,Xt=new Promise(N=>{Q=N});function Te(N){if(St!==R)return;St=null,m.removeEventListener("keydown",xt,!0),m.removeEventListener("keyup",kt,!0),l?.removeEventListener("abort",Xe);for(let Ve of ce)Ve.removeAttribute("inert");y.dataset.state="closing",G?.isConnected&&typeof G.focus=="function"&&G.focus({preventScroll:!0});let J=m.getComputedStyle?.(y),re=Math.max(0,...String(J?.transitionDuration??"").split(",").map(Ve=>Number.parseFloat(Ve)*(Ve.trim().endsWith("ms")?1:1e3)||0)),Ce=()=>y.remove();y.addEventListener("transitionend",Ve=>Ve.target===y&&Ce()),setTimeout(Ce,re+50),Q({ok:N,value:M?.value.trim()})}return Xt}function or(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let i=t.createElement("span");i.dataset.ncOn="",i.textContent=e.onText??"On";let r=t.createElement("span");r.dataset.ncOff="",r.textContent=e.offText??"Off",a.append(i,r),n.append(a);let s=!1,l=d=>{s=d===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let u=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",u),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",u),n.remove()}}}var ir=new WeakMap,_o=.25;function Tc(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let i=t.createElement("span");i.className="nc-fader-cap",i.setAttribute("aria-hidden","true"),n.append(a,i);let r=0,s=e.step??.005,l=e.onChange,u=e.onReset,d=h=>Math.min(1,Math.max(0,h)),c=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},p=h=>{let f=d(h);f!==r&&(r=f,c(),l?.(f))},m=0,g=!1;n.addEventListener("pointerdown",h=>{if(h.button!==0)return;h.preventDefault(),n.focus?.({preventScroll:!0});let f=n.getBoundingClientRect();h.target!==i&&f.height>0&&p(1-(h.clientY-f.top)/f.height),m=h.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(h.pointerId)}),n.addEventListener("pointermove",h=>{if(!g)return;let f=n.getBoundingClientRect().height||1,b=(m-h.clientY)/f*(h.shiftKey?_o:1);m=h.clientY,p(r+b)});let w=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",w),n.addEventListener("pointercancel",w),n.addEventListener("lostpointercapture",w),n.addEventListener("dblclick",h=>{h.preventDefault(),u?.()}),n.addEventListener("keydown",h=>{let f=h.shiftKey?s*_o:s,b={ArrowUp:r+f,ArrowRight:r+f,ArrowDown:r-f,ArrowLeft:r-f,PageUp:r+s*10,PageDown:r-s*10,Home:0,End:1};h.key in b&&(h.preventDefault(),p(b[h.key]))});let y={el:n,get value(){return r},get dragging(){return g},set(h){g||(r=d(Number(h)||0),c())},setText(h){h?n.setAttribute("aria-valuetext",h):n.removeAttribute("aria-valuetext")},setLabel(h){n.setAttribute("aria-label",h)},configure(h){typeof h.step=="number"&&h.step>0&&(s=h.step),h.onChange&&(l=h.onChange),h.onReset&&(u=h.onReset)}};return y.setLabel(e.label),y.set(e.value??0),y.setText(e.valueText),ir.set(n,y),y}function Cc(e){return ir.get(e)}var rr=new WeakMap,Lc=.2,Fc=1.5,zc=.5;function Nc(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function Wo(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Nc(a.getComputedStyle(e).getPropertyValue(I(t)),n)}function Pc(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let i=t.createElement("button");i.type="button",i.className="nc-meter-clip",i.dataset.lit="false";let r=t.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let s=[];for(let y=0;y<n;y++){let h=t.createElement("span");h.className="nc-meter-bar";let f=t.createElement("span");f.className="nc-meter-peak";let b=t.createElement("span");b.className="nc-meter-rms";let v=t.createElement("span");v.className="nc-meter-hold",h.append(f,b,v),r.append(h),s.push({peak:f,rms:b,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(i,r);let l=e.label,u=e.onClear,d=!1,c=-1,p=-1,m=()=>{i.dataset.lit=d?"true":"false",i.setAttribute("aria-pressed",d?"true":"false"),i.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),i.title=d?"Clipped. Click to clear":"Clip light"},g=(y,h,f,b)=>{let v=Math.round(b*1e3)/1e3;f[h]!==v&&(f[h]=v,y.style.transform=h==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};i.addEventListener("click",()=>{w.clear(),u?.()});let w={el:a,get clipped(){return d},update(y,h){c<0&&(c=Wo(a,"motion-meter-fall",Lc)),p<0&&(p=Wo(a,"motion-meter-hold",Fc));let f=Math.max(0,Math.min(.25,Number(h)||0)),b=c>0?Math.exp(-f/c):0;s.forEach((v,E)=>{let A=y[E]??y[0]??{peak:0,rms:0},k=Math.min(1,Math.max(0,Number(A.peak)||0)),x=Math.min(k,Math.max(0,Number(A.rms)||0));A.over&&w.clip(),v.level.peak=k>=v.level.peak?k:k+(v.level.peak-k)*b,v.level.rms=x>=v.level.rms?x:x+(v.level.rms-x)*b,v.holdAge+=f,k>=v.holdAt?(v.holdAt=k,v.holdAge=0):v.holdAge>p&&(v.holdAt=Math.max(k,v.holdAt-zc*f)),g(v.peak,"peak",v.shown,v.level.peak),g(v.rms,"rms",v.shown,v.level.rms),g(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,m())},clear(){d=!1,m()},reset(){for(let y of s)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,g(y.peak,"peak",y.shown,0),g(y.rms,"rms",y.shown,0),g(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,m()},configure(y){y.onClear&&(u=y.onClear)}};return m(),w.reset(),rr.set(a,w),w}function Dc(e){return e?rr.get(e):void 0}var qc=3,Bc=new Set(["freq","q","rate","time","log"]);function Ha(e,t,n){return!e||!Bc.has(e)||!(n>t)?"linear":t>0?"log":"power"}function Nn(e,t,n){return Ha(e,t,n)!=="linear"}function ja(e,t,n,a){let i=Number(a);if(!(n>t)||!Number.isFinite(i))return 0;let r=Math.min(n,Math.max(t,i)),s=Ha(e,t,n);if(s==="log")return Math.log(r/t)/Math.log(n/t);let l=(r-t)/(n-t);return s==="power"?Math.cbrt(l):l}function sr(e,t,n,a){let i=Math.min(1,Math.max(0,Number(a)||0)),r=Ha(e,t,n);return r==="log"?t*(n/t)**i:t+(n-t)*(r==="power"?i**qc:i)}function lr(e,t,n,a){let i=Math.min(n,Math.max(t,e));if(a>0){i=t+Math.round((i-t)/a)*a;let r=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));i=Number(i.toFixed(r)),i=Math.min(n,Math.max(t,i))}return i}function _a(e,t,n,a){return Math.round(ja(e,t,n,a)*1e3)}function pa(e,t,n,a,i){return lr(sr(e,t,n,Number(a)/1e3),t,n,i)}function Rc(e,t,n=!1){let a=Number(e)||0,i=n?1:1e3/100,r=null;return t==="ArrowRight"||t==="ArrowUp"?r=a+i:t==="ArrowLeft"||t==="ArrowDown"?r=a-i:t==="PageUp"?r=a+1e3/10:t==="PageDown"?r=a-1e3/10:t==="Home"?r=0:t==="End"&&(r=1e3),r===null?null:Math.min(1e3,Math.max(0,Math.round(r)))}function cr(e,t,n,a,i,r=!1,s){let l=_a(e,t,n,a),u=Rc(l,i,r);if(u===null)return null;let d=pa(e,t,n,u,s),c=Math.sign(u-l),p=lr(Number(a),t,n,s);for(;c!==0&&d===p&&u>0&&u<1e3;)u+=c,d=pa(e,t,n,u,s);return d}function Oc(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function Uo(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function Ic(e,t,n,a=n/6){let i=e.some(c=>c===null),r=Math.max(0,n-(i?a:0)),s=e.reduce((c,p,m)=>p===null?c:c+Uo(t[m]),0),l=s>0?r/s:0,u=e.map(c=>c===null?0:Math.min(r,Uo(c)*l));if(i){let c=u.reduce((m,g)=>m+g,0),p=e.indexOf(null);u[p]=Math.max(a,n-c)}let d=[0];for(let c of u)d.push(Math.round((d[d.length-1]+c)*100)/100);return i&&(d[d.length-1]=n),d}function Hc(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.floor(t*a)),r=Math.max(1,Math.floor(n*a));(e.width!==i||e.height!==r)&&(e.width=i,e.height=r);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function Le(e){return Math.max(0,Math.min(1,e))}function dr(e,t){let{ctx:n,w:a,h:i}=Hc(e);if(!n)return;n.clearRect(0,0,a,i);let r=xc(e);if(t.paint==="swatch"){let u=_(e,"accent"),d=_(e,"rhythm.step-cell-on");e.dataset.ncAccent=u,e.dataset.ncStep=d,n.fillStyle=u,n.fillRect(0,0,a/2,i),n.fillStyle=d,n.fillRect(a/2,0,a/2,i);return}if(t.paint==="filter"&&typeof t.hz=="number"){Wc(n,a,i,t,e,r);return}if(t.paint==="filter"){let u=t.mode??"lp",d=_(e,er(u)),c=_(e,"divider"),p=Le(t.cutoff??.5),m=.08+(1-Le(t.resonance??.2))*.22;n.strokeStyle=c,n.beginPath(),n.moveTo(0,i*.72),n.lineTo(a,i*.72),n.stroke(),n.beginPath();for(let g=0;g<=a;g++){let w=g/Math.max(1,a),y=0;u==="lp"?y=w<p?1:Math.max(0,1-(w-p)/m):u==="hp"?y=w>p?1:Math.max(0,1-(p-w)/m):y=Math.max(0,1-Math.abs(w-p)/m);let h=i*.78-y*i*.62;g===0?n.moveTo(g,h):n.lineTo(g,h)}n.strokeStyle=d,n.stroke(),n.fillStyle=_(e,"text-sub"),n.font=r,n.fillText(u.toUpperCase(),0,i),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=_(e,"accent");let u=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[c,p,m]=Ic([u,d],t.max??[1,4],a),g=2,w=i-1;n.beginPath(),n.moveTo(c,w),n.lineTo(p,g);let y=Math.max(1,Math.ceil(m-p));for(let h=1;h<=y;h++){let f=h/y;n.lineTo(p+(m-p)*f,w-(w-g)*Math.exp(-4.6*f)*(1-f*.01))}n.lineTo(m,w),n.lineTo(a,w),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let u=Array.isArray(t.peaks)?t.peaks:[],[d,c]=Array.isArray(t.region)?t.region:[0,1],p=_(e,"accent"),m=_(e,"text-sub"),g=i/2;n.fillStyle=_(e,"accent-soft"),n.fillRect(Le(d)*a,0,(Le(c)-Le(d))*a,i),n.strokeStyle=_(e,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(a,g),n.stroke();let w=Math.floor(u.length/2);for(let y=0;y<w;y++){let h=(y+.5)/w*a,f=Math.max(-1,Math.min(1,u[y*2]??0)),b=Math.max(-1,Math.min(1,u[y*2+1]??0)),v=(y+.5)/w;n.strokeStyle=v>=d&&v<=c?p:m,n.beginPath(),n.moveTo(h,g-b*(g-1)),n.lineTo(h,g-f*(g-1)+.5),n.stroke()}n.strokeStyle=p;for(let y of[d,c,...Array.isArray(t.markers)?t.markers:[]]){let h=Math.round(Le(y)*(a-1))+.5;n.beginPath(),n.moveTo(h,0),n.lineTo(h,i),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=_(e,"text"),n.fillRect(Math.round(Le(t.position)*(a-1)),0,1,i)),w||(n.fillStyle=m,n.font=r,n.fillText(t.empty??"Empty",0,g+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let u=Le(t.level??0);n.fillStyle=_(e,"divider"),n.fillRect(0,i*.4,a,i*.2),n.fillStyle=_(e,"accent"),n.fillRect(0,i*.4,a*u,i*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=_(e,"rhythm.step-cell-off"),n.fillRect(0,i*.45,a,i*.1),n.fillStyle=_(e,"rhythm.playhead"),n.fillRect(l/s*a,i*.3,Math.max(1,a/s),i*.4),e.dataset.ncAccent=_(e,"accent")}var zt=20,ha=2e4,Vn=24,Go=-60;function jc(e,t,n,a,i=48e3){let r=2*Math.PI*Math.min(t,i*.49)/i,s=Math.cos(r),l=Math.sin(r)/(2*n),u,d,c;e==="hp"?[u,d,c]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[u,d,c]=[l,0,-l]:[u,d,c]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,m=-2*s,g=1-l,w=2*Math.PI*a/i,y=(v,E,A)=>v+E*Math.cos(w)+A*Math.cos(2*w),h=(v,E)=>-(v*Math.sin(w)+E*Math.sin(2*w)),f=Math.hypot(y(u,d,c),h(d,c)),b=Math.hypot(y(p,m,g),h(m,g));return b>0?f/b:0}function _c(e,t){return Math.log(Math.max(zt,Math.min(ha,e))/zt)/Math.log(ha/zt)*t}function Yo(e,t,n){let a=Math.max(Go,Math.min(Vn,e));return t+(Vn-a)/(Vn-Go)*(n-t)}function Wc(e,t,n,a,i,r){let s=a.mode??"lp",l=_(i,er(s)),u=_(i,"divider"),d=_(i,"text-sub"),c=Number.parseFloat(String(r).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,m=Math.max(p+4,n-c-3),g=a.q??Math.SQRT1_2,w=Math.round(Yo(0,p,m))+.5;e.strokeStyle=u,e.lineWidth=1,e.beginPath(),e.moveTo(0,w),e.lineTo(t,w),e.stroke(),e.beginPath();for(let y=0;y<=t;y++){let h=zt*(ha/zt)**(y/Math.max(1,t)),f=a.open?1:jc(s,a.hz,g,h,a.sampleRate),b=Yo(20*Math.log10(Math.max(1e-5,f)),p,m);y===0?e.moveTo(y,b):e.lineTo(y,b)}if(e.strokeStyle=l,e.stroke(),!a.open){let y=Math.round(_c(a.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(y,p),e.lineTo(y,m),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=r,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",i.dataset.ncAccent=l,i.dataset.ncFilterHz=String(Math.round(a.hz))}function he(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let i=n.defaultView.getComputedStyle(a).color;return a.remove(),i}function Uc(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var Ge=20,Yt=2e4,Wa=Math.log(Yt/Ge),ma=32,Gc=250,Yc=-100,Kc=1200,Xc=4.5,Ko=-6,je=-96,Vc=48,Xo=[100,1e3,1e4],Qc=[6,12];function rt(e,t){return Math.log(Math.max(Ge,Math.min(Yt,e))/Ge)/Wa*t}function sn(e,t){return Ge*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Wa)}function Pe(e,t,n,a){let i=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*i}function fa(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var ur=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Jc(e,t,n,a){let i=n?3:1,r=u=>({db:Math.max(-a,Math.min(a,e.db+u*i))}),s=u=>({hz:Math.max(e.minHz??Ge,Math.min(e.maxHz??Yt,e.hz*2**(u*i/6)))}),l=u=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(u*i)))});switch(t){case"ArrowUp":return r(1);case"ArrowDown":return r(-1);case"ArrowRight":return e.moveHz?s(1):r(1);case"ArrowLeft":return e.moveHz?s(-1):r(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Ua(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function Zc(e,t,n,a,i,r,s,l,u){let d=u?.25:1,c={},p=Math.max(1,r/2-l);if(c.db=Math.max(-s,Math.min(s,t.db-a*d/p*s/Ua(e))),e.moveHz){let m=t.hz*Math.exp(n*d/Math.max(1,i)*Wa);c.hz=Math.max(e.minHz??Ge,Math.min(e.maxHz??Yt,m))}return c}function ed(e,t,n,a,i){let r=Math.max(0,n.left)+1,s=Math.min(n.right,i)-1,l=Math.min(t.width*3+a*2,s-r),u=Math.max(r,Math.min(e.left,s-l));return{left:Math.round(u-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var K=new WeakMap;function td(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let i=document.createElement("canvas");i.className="nc-eq-spectrum",i.setAttribute("aria-hidden","true");let r=document.createElement("canvas");r.className="nc-eq-curve",r.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(i,r);for(let u of e.bands)a.append(nd(n,u,t));a.append(s),a.addEventListener("click",u=>{if(!br(n)||u.button>0)return;let d=gr(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),K.set(n,{control:e,cache:null,spec:null,active:null}),hr(n,e),n}function pr(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function nd(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let i=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},r=()=>i()?.bands.find(d=>d.id===t.id)??null,s=null;a.addEventListener("pointerdown",d=>{if(d.button!==0)return;let c=r();c&&(d.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(d.pointerId),s={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:c.hz,db:c.db}},a.dataset.drag="true",Fe(e,t.id))}),a.addEventListener("pointermove",d=>{if(!s||d.pointerId!==s.id)return;let c=i(),p=r(),m=K.get(e);if(!c||!p||!m?.box)return;let{w:g,h:w,pad:y}=m.box;c.onBand(p.id,Zc(p,s.start,d.clientX-s.x,d.clientY-s.y,g,w,c.range??18,y,d.shiftKey))});let l=d=>{!s||d.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&Fe(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",d=>{d.preventDefault(),i()?.onReset?.(t.id)}),a.addEventListener("keydown",d=>{let c=i(),p=r();if(!c||!p)return;let m=Jc(p,d.key,d.shiftKey,c.range??18);m&&(d.preventDefault(),m==="reset"?c.onReset?.(p.id):c.onBand(p.id,m),Fe(e,p.id))});let u=null;return a.addEventListener("wheel",d=>{let c=i(),p=r();if(!c||!p?.moveQ)return;d.preventDefault();let m=d.timeStamp;(!u||m-u.t>400)&&(u={q:p.q,t:m});let g=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;u.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,u.q*2**(-g/240))),u.t=m,c.onBand(p.id,{q:u.q}),Fe(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>Fe(e,t.id)),a.addEventListener("focus",()=>Fe(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&Fe(e,null)}),a.addEventListener("blur",()=>{s||Fe(e,null)}),a}function Fe(e,t){let n=K.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?lt(e):Ga(e)}function Ga(e){let t=K.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(w=>w.id===t.active):null;for(let w of e.querySelectorAll(".nc-eq-node"))w instanceof HTMLElement&&(a&&w.dataset.band===a.id?w.dataset.active="true":delete w.dataset.active);if(!a||!t.box){n.hidden=!0;return}let i=[a.label,ur(a.db)];a.kind==="peak"?i.push(fa(a.hz),`Q ${a.q.toFixed(1)}`):i.push(`${a.kind==="lowshelf"?"below":"above"} ${fa(a.hz)}`),n.textContent=i.join(" · "),n.dataset.tone=String(ad(t.control,a)),n.hidden=!1;let{w:r,h:s,pad:l}=t.box,u=rt(a.hz,r),d=Pe(a.db*Ua(a),s,t.control.range??18,l),c=n.offsetWidth,p=n.offsetHeight,m=Math.max(0,Math.min(r-c,u-c/2)),g=d-p-l*1.5>=0?d-p-l*1.5:Math.min(s-p,d+l*1.5);n.style.left=`${Math.round(m)}px`,n.style.top=`${Math.round(g)}px`}function ad(e,t){return e.bands.indexOf(t)%3+1}function hr(e,t){let n=K.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Ya(e);let a=t.range??18;t.bands.forEach((i,r)=>{let s=pr(e,i.id);s instanceof HTMLElement&&(s.dataset.tone=String(r%3+1),s.dataset.kind=i.kind,s.setAttribute("aria-label",`${i.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(i.db)),s.setAttribute("aria-valuetext",i.valueText??`${ur(i.db)}, ${fa(i.hz)}`),s.setAttribute("aria-keyshortcuts",i.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),i.help?s.setAttribute("data-nc-help",i.help):s.removeAttribute("data-nc-help"))}),lt(e),cd(e)}function mr(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.round(t*a)),r=Math.max(1,Math.round(n*a));(e.width!==i||e.height!==r)&&(e.width=i,e.height=r);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function fr(e){return{curve:he(e,"eq-curve"),fill:he(e,"eq-fill"),quiet:he(e,"text-sub"),grid:he(e,"eq-grid"),zero:he(e,"divider"),label:he(e,"text-sub"),spectrum:he(e,"eq-spectrum"),bands:[he(e,"eq-band-1"),he(e,"eq-band-2"),he(e,"eq-band-3")]}}function od(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function lt(e){K.has(e)&&Ya(e);let t=K.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:i,w:r,h:s}=mr(n);if(!i)return;let l=Math.max(8,Math.round(s*.06)),u=a.range??18;t.box={w:r,h:s,pad:l},t.colours=fr(e);let d=t.colours,c=od(a,r);if(!t.cache||t.cache.key!==c){let E=Math.max(64,Math.ceil(r)+1),A=new Float64Array(E);for(let x=0;x<E;x++)A[x]=sn(x/(E-1)*r,r);let k=null;try{k=typeof a.response=="function"?a.response(A):null}catch{k=null}t.cache={key:c,freqs:A,total:k?.total??new Float64Array(E),bands:k?.bands??[]}}i.clearRect(0,0,r,s);let p=Uc(e),m=a.on!==!1;id(i,r,s,u,l,d,p);let{freqs:g,total:w,bands:y}=t.cache,h=Array.from(g,E=>rt(E,r)),f=Pe(0,s,u,l);y.forEach((E,A)=>{if(!E||!E.some(M=>Math.abs(M)>.05))return;let k=m?d.bands[A%3]:d.quiet,x=Array.from(E,M=>Pe(M,s,u,l));i.save(),t.active&&a.bands[A]?.id===t.active&&(i.globalAlpha=.14,i.fillStyle=k,Vo(i,h,x,f)),i.globalAlpha=m?.75:.4,i.strokeStyle=k,i.lineWidth=.75,Qn(i,h,x),i.restore()});let b=Array.from(w,E=>Pe(E,s,u,l)),v=m?d.curve:d.quiet;i.save(),i.fillStyle=m?d.fill:d.quiet,i.globalAlpha=m?.2:.08,Vo(i,h,b,f),i.restore(),i.save(),i.strokeStyle=m?d.fill:v,i.lineJoin="round",i.lineCap="round",m&&(i.globalAlpha=.16,i.lineWidth=4,Qn(i,h,b)),i.globalAlpha=1,i.strokeStyle=v,i.lineWidth=1.25,Qn(i,h,b),i.restore(),rd(e),Ga(e)}function id(e,t,n,a,i,r,s){e.save(),e.lineWidth=1;for(let u=10;u<=1e4;u*=10)for(let d=1;d<=9;d++){let c=u*d;if(c<Ge||c>Yt)continue;let p=Math.round(rt(c,t))+.5;e.globalAlpha=Xo.includes(c)?.9:.35,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let u of Qc)if(!(u>a))for(let d of[1,-1]){let c=Math.round(Pe(u*d,n,a,i))+.5;e.globalAlpha=u===12?.75:.4,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(0,c),e.lineTo(t,c),e.stroke()}e.globalAlpha=1,e.strokeStyle=r.zero;let l=Math.round(Pe(0,n,a,i))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=r.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let u of Xo){let d=u>=1e3?`${u/1e3}k`:String(u),c=e.measureText(d).width,p=rt(u,t)+3;e.fillText(d,p+c+2>t?rt(u,t)-c-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let u of[12,0,-12]){if(Math.abs(u)>a)continue;let d=Pe(u,n,a,i);e.fillText(u>0?`+${u}`:u<0?`−${-u}`:"0",t-3,Math.round(d)-1)}e.restore()}function yn(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let i=(t[a]+t[a+1])/2,r=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],i,r)}e.lineTo(t[t.length-1],n[n.length-1])}function Qn(e,t,n){e.beginPath(),yn(e,t,n),e.stroke()}function Vo(e,t,n,a){e.beginPath(),yn(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function gr(e){return e.closest("[data-nc-maxable]")}function br(e){let t=gr(e);return!!t&&!t.hasAttribute("data-nc-max")}function Ya(e){let t=br(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=K.get(e);n?.active&&(n.active=null,Ga(e))}return t}function rd(e){Ya(e);let t=K.get(e);if(!t?.box)return;let{w:n,h:a,pad:i}=t.box,r=t.control.range??18;for(let s of t.control.bands){let l=pr(e,s.id);l instanceof HTMLElement&&(l.style.left=`${rt(s.hz,n).toFixed(1)}px`,l.style.top=`${Pe(s.db*Ua(s),a,r,i).toFixed(1)}px`)}}function sd(e,t,n,a){let i=a/2/n,r=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let u=0;u<e;u++){let d=(u-.5)/(e-1)*t,c=(u+.5)/(e-1)*t,p=sn(d,t),m=sn(c,t),g=sn(u/(e-1)*t,t);r[u]=Math.min(n-1,p/i),s[u]=Math.min(n-1,m/i),l[u]=Xc*Math.log2(g/1e3)}return{lo:r,hi:s,tilt:l}}function ld(e,t,n){let a=Math.floor(t),i=Math.ceil(n);if(i-a<=1){let s=t-a,l=e[a]??-1/0,u=e[Math.min(e.length-1,a+1)]??l;return l+(u-l)*s}let r=-1/0;for(let s=a;s<=i&&s<e.length;s++)e[s]>r&&(r=e[s]);return r}function cd(e){let t=K.get(e);if(t){if(!t.control.spectrum){wr(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let i=K.get(e)?.spec;i&&(i.visible=a.some(r=>r.isIntersecting),ga(e))}),t.spec.io.observe(e)):t.spec.visible=!0}ga(e)}}function ga(e){let t=K.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){yr(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=ba(e),n.onVis||(n.onVis=()=>ga(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&ya(e,!1)}function ba(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function ya(e,t){let n=K.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,Jn(e,ba(e))),Gc):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(i=>(n.raf=0,Jn(e,i))):n.timer=a.setTimeout(()=>(n.timer=0,Jn(e,ba(e))),ma))}function yr(e){let t=K.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function wr(e){let t=K.get(e)?.spec;if(!t)return;yr(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=K.get(e);n&&(n.spec=null)}function Jn(e,t){let n=K.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){wr(e);return}if(!a.analyser)return;if(t-a.last<ma-4&&!a.idle){ya(e,!1);return}let i=a.last?Math.min(.25,(t-a.last)/1e3):ma/1e3;a.last=t;let r=e.querySelector(".nc-eq-spectrum");if(!(r instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:u}=mr(r);if(!s)return;let d=Math.max(16,Math.round(l/2)),c=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==d||a.map.w!==l||a.map.sr!==c)&&(a.map={cols:d,w:l,sr:c,...sd(d,l,a.buf.length,c)},a.disp=new Float32Array(d).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,m=Vc*i,{lo:g,hi:w,tilt:y}=a.map;for(let f=0;f<d;f++){let b=ld(a.buf,g[f],w[f]);b>p&&(p=b);let v=b+y[f],E=a.disp[f]-m;a.disp[f]=v>E?v:E}p>Yc&&(a.loud=t);let h=t-a.loud>Kc;s.clearRect(0,0,l,u),(!h||a.disp.some(f=>f>je))&&dd(s,l,u,a.disp,n.colours??fr(e)),a.idle=h&&!a.disp.some(f=>f>je),ya(e,a.idle)}function dd(e,t,n,a,i){let r=a.length,s=new Array(r),l=new Array(r),u=d=>{let c=a[Math.max(0,Math.min(r-1,d))];return Number.isFinite(c)?c:je};for(let d=0;d<r;d++){let c=u(d)*.36+(u(d-1)+u(d+1))*.22+(u(d-2)+u(d+2))*.1,p=(Math.max(je,Math.min(Ko,Number.isFinite(c)?c:je))-je)/(Ko-je);s[d]=d/(r-1)*t,l[d]=n-p*n}e.save(),e.fillStyle=i.spectrum,e.globalAlpha=.13,e.beginPath(),yn(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=i.spectrum,e.lineWidth=1,e.beginPath(),yn(e,s,l),e.stroke(),e.restore()}var ud=.8912509381337456,wa=32,pd=250,hd=1200,md=.2,vr=1.5;function fd(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function gd(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let i=e.createElement("span");i.className="nc-fx-level-fill",a.append(i),t.append(a)}return t}var wn=new WeakMap,Qo=new WeakMap;function Jo(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let i=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),r=Number.parseFloat(i);return Number.isFinite(r)?i.endsWith("ms")?r/1e3:r:n}function bd(e){let t=Qo.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(i=>{for(let r of i){let s=wn.get(r.target);s&&(s.seen.set(r.target,r.isIntersecting),Nt(s))}ot(t)})),e.addEventListener("visibilitychange",()=>{for(let i of t.recs)Nt(i);ot(t)}),Qo.set(e,t),t}var xr=e=>e.els.some(t=>t.isConnected);function yd(e){if(!e.loop.io)return xr(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function Nt(e){let t=!e.dead&&!!e.source&&yd(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Ka(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),ka(e))}function Ka(e){return e.doc.defaultView?.performance?.now()??Date.now()}function ot(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){kr(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Ka(e)),!e.raf&&!e.timer&&va(e,!1)}function va(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>Zo(e,Ka(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),pd):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(i=>(e.raf=0,Zo(e,i))):e.timer=n.setTimeout(()=>(e.timer=0,a()),wa)}function kr(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Zo(e,t){if(t-e.last<wa-4&&!e.idle&&e.last){va(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):wa/1e3;e.last=t,e.frames++;let a=!1,i=!1;for(let r of e.recs){if(!xr(r)){(r.placed||e.frames-r.born>90)&&$r(r);continue}r.placed=!0,r.open&&(i=!0,wd(r,n,t)&&(e.loud=t),(r.disp[0]>0||r.disp[1]>0)&&(a=!0))}if(!i){kr(e);return}e.idle=t-e.loud>hd&&!a,va(e,e.idle)}function wd(e,t,n){if(e.fall<0){let m=e.els[0];e.fall=Jo(m,"motion-meter-fall",md),e.hold=Jo(m,"motion-meter-hold",vr)}let a=null;try{a=e.source.read()}catch{a=null}let i=typeof a=="number",r=i?a:Number(a?.in)||0,s=!i&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,u=s?"2":"1";if(e.rows!==u){e.rows=u;for(let m of e.els)m.dataset.ncRows=u}let d=e.fall>0?Math.exp(-t/e.fall):0,c=[r,l],p=!1;for(let m=0;m<2;m++){let g=fd(c[m]);g>0&&(p=!0),e.disp[m]=g>=e.disp[m]?g:g+(e.disp[m]-g)*d,e.disp[m]<.001&&(e.disp[m]=0),c[m]>=ud&&(e.clipAt[m]=n);let w=e.clipAt[m]>0&&n-e.clipAt[m]<e.hold*1e3;xa(e,m,e.disp[m],w)}return p}function xa(e,t,n,a){let i=Math.round(n*1e3)/1e3,r=a?"true":"false";if(!(e.shown[t]===i&&e.clipShown[t]===r)){e.shown[t]=i,e.clipShown[t]=r;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${i})`,l.dataset.clip=r)}}}function ka(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,xa(e,0,0,!1),xa(e,1,0,!1)}function $r(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),wn.get(t)===e&&wn.delete(t)}function vd(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,i=bd(a),r={els:n,source:t??null,loop:i,open:!1,dead:!1,seen:new Map,born:i.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:vr,rows:""};for(let s of n)wn.set(s,r),i.io?.observe(s);if(i.recs.add(r),ka(r),!i.io){let s=a.defaultView,l=()=>{Nt(r),ot(i)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!r.dead){if(l===r.source){Nt(r),ot(i);return}r.open&&(r.open=!1,r.source?.close?.(),ka(r)),r.source=l,Nt(r),ot(i)}},destroy(){r.dead||$r(r),ot(i)}}}var Er={slop:8,longPressMs:500,pitchPx:16},xd=class{constructor(e,t,n=Er){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let i=this.hit(t,n);return i<0?!1:(this.phase="pending",this.pointer=e,this.pad=i,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let i=t-this.x0,r=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(i,r)<this.config.slop)return;Math.abs(r)>=Math.abs(i)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-r/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function kd(e,t,n,a=Er){let i=!1,r=0,s=(d,c)=>{let p=e.ownerDocument.elementFromPoint?.(d,c),m=[...e.querySelectorAll(t)],g=p?m.findIndex(h=>h===p||h.contains(p)):-1;if(g>=0)return g;let w=-1,y=Number.POSITIVE_INFINITY;return m.forEach((h,f)=>{if(h.hidden)return;let b=h.getBoundingClientRect();if(c<b.top||c>b.bottom)return;let v=Math.abs(d-(b.left+b.width/2));v<y&&v<=b.width&&(w=f,y=v)}),w},l=new xd(s,d=>{(d.kind==="paint"||d.kind==="long")&&(i=!0),n(d)},a),u=()=>{r&&clearTimeout(r),r=0};return e.addEventListener("pointerdown",d=>{d.button>0||(i=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(u(),r=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&u())}),e.addEventListener("pointerup",d=>{u(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{u(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{i&&(i=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var Ar="netcomposer.groups.v1";function Xa(){try{return globalThis.localStorage??null}catch{return null}}function Sr(e=Xa(),t=Ar){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[i,r]of Object.entries(n))typeof r=="boolean"&&a.set(i,r);return a}catch{return new Map}}function $d(e,t,n,a=Ar){let i=Sr(e,a);i.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(i)))}catch{}}function Ed(e,t=Xa()){return Sr(t).get(e.id)??e.open===!0}function Ad(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let i=document.createElement("button");i.type="button",i.className="nc-group-toggle",i.id=`${e.id}-group-toggle`;let r=document.createElement("span");r.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),i.append(r,s,l);let u=document.createElement("div");u.className="nc-group-body",u.id=`${e.id}-group-body`,u.setAttribute("role","group"),u.setAttribute("aria-labelledby",i.id),i.setAttribute("aria-controls",u.id);for(let d of e.controls)u.append(n(d,t));return i.addEventListener("click",()=>{let d=a.dataset.ncOpen!=="true";$d(Xa(),e.id,d),$a(a,d);let c=t(a);c?.type==="group"&&c.onToggle?.(d)}),a.append(i,u),Mr(a,e),$a(a,Ed(e)),Tr(a,e),a}function $a(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let i=n?.querySelector(".nc-group-mark");i&&(i.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function Mr(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function Tr(e,t){Mr(e,t)&&$a(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),i=t.summary??"";a&&a.textContent!==i&&(a.textContent=i)}var Zt="application/x-nc-pad",ei="http://www.w3.org/2000/svg";function Sd(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],i=[];for(let r=0;r<n;r++){let s=Math.floor(r*t/n),l=Math.max(s+1,Math.floor((r+1)*t/n)),u=0,d=0;for(let p=s;p<l;p++)u=Math.min(u,e[2*p]??0),d=Math.max(d,e[2*p+1]??0);let c=n===1?50:r/(n-1)*100;a.push(`${c.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),i.push(`${c.toFixed(1)} ${(10-Math.max(-1,u)*10).toFixed(2)}`)}return`M${a.join("L")}L${i.reverse().join("L")}Z`}function Md(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((i,r)=>a.append(Td(n,r,t))),n.append(a),n.addEventListener("keydown",i=>{i.key==="Escape"&&ln(n)}),Lr(n,e),n}function Td(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let i=document.createElement("span");i.className="nc-padgrid-pad-bar",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let u=document.createElementNS(ei,"svg");u.setAttribute("class","nc-padgrid-pad-wave"),u.setAttribute("viewBox","0 0 100 20"),u.setAttribute("preserveAspectRatio","none"),u.setAttribute("aria-hidden","true");let d=document.createElementNS(ei,"path");return u.append(d),a.append(i,r,s,l,u),Ld(e,a,t,n),r.addEventListener("dblclick",()=>{let c=n(e);c?.type==="padGrid"&&c.onRename&&a.dataset.empty!=="true"&&Cr(e,a,t,n)}),a.addEventListener("dragstart",c=>{if(a.dataset.empty==="true"||!c.dataTransfer){c.preventDefault();return}c.dataTransfer.setData(Zt,String(t)),c.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",c=>{let p=c.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(Zt)||(c.preventDefault(),c.stopPropagation(),c.dataTransfer&&(c.dataTransfer.dropEffect=p.includes(Zt)&&!c.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",c=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let m=c.dataTransfer?.getData(Zt);if(m!==void 0&&m!==""){c.preventDefault(),c.stopPropagation();let w=Number(m);w!==t&&p.onMove?.(w,t,c.altKey);return}let g=c.dataTransfer?.files?.[0];g&&(c.preventDefault(),c.stopPropagation(),p.onFile?.(t,g))}),a}function Cd(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function Ld(e,t,n,a){let i=0,r=!1,s=0,l=0,u=()=>{window.clearTimeout(i),i=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;r=!1,s=d.clientX,l=d.clientY,u();let c=a(e);c?.type==="padGrid"&&(c.onDown?.(n),!(c.onDown&&d.pointerType==="mouse")&&(i=window.setTimeout(()=>{i=0,r=ti(e,t,n,a)},450)))}),t.addEventListener("pointermove",d=>{i&&Math.hypot(d.clientX-s,d.clientY-l)>8&&u()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,u);t.addEventListener("contextmenu",d=>{d.preventDefault(),u(),r=ti(e,t,n,a)}),t.addEventListener("click",()=>{if(r){r=!1;return}Cd(e,n,a)})}function ti(e,t,n,a){let i=a(e);if(i?.type!=="padGrid"||!i.menu)return!1;let r=i.menu(n);if(!r.length)return!1;ln(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),ln(e)}),s.addEventListener("click",c=>c.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let c of r){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=c.id,p.textContent=c.label,p.addEventListener("click",()=>{ln(e);let m=a(e);m?.type==="padGrid"&&(c.id==="rename"&&m.onRename?Cr(e,t,n,a):m.onMenu?.(n,c.id))}),l.append(p)}e.append(s,l);let u=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-u.left}px`,l.style.top=`${d.bottom-u.top}px`,l.querySelector("button")?.focus(),!0}function Cr(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let i=a(e);if(i?.type!=="padGrid")return;let r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=i.nameMax??24,r.value=i.pads[n]?.label??"",r.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.top-s.top}px`,r.style.width=`${l.width}px`;let u=!1,d=c=>{if(u)return;u=!0;let p=r.value.trim();r.remove(),t.focus();let m=a(e);c&&p&&m?.type==="padGrid"&&m.onRename?.(n,p)};r.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"?d(!0):c.key==="Escape"&&d(!1)}),r.addEventListener("blur",()=>d(!0));for(let c of["pointerdown","click","dblclick"])r.addEventListener(c,p=>p.stopPropagation());e.append(r),r.focus(),r.select()}function ln(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function Lr(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,i)=>{let r=n[i];if(!(r instanceof HTMLButtonElement))return;let s=r.querySelector(".nc-padgrid-pad-name"),l=r.querySelector(".nc-padgrid-pad-hint"),u=r.querySelector(".nc-padgrid-pad-wave path"),d=r.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=a.empty?"":a.badge??""),r.draggable=!a.empty,a.empty?(r.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),u?.setAttribute("d","")):(delete r.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=""),u?.setAttribute("d",Sd(a.peaks))),a.lane?r.dataset.ncLane=String(a.lane):delete r.dataset.ncLane;let c=t.selected===i;c?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",c?"true":"false"),a.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",a.empty?`Pad ${i+1}, empty: load a sample`:`Pad ${i+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${c?", selected":""}`)})}function te(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Pn(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let i=document.createElement("span");return i.className="nc-readout",i.dataset.ncReadout="",n.append(a,i),n}function ni(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function Rt(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Fd=450,ai=8;function ve(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function zd(e){let t=vc(e,"target-min");return t>0?t:44}function Nd(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=zd(e),a=n/2,i=t.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<t.length;r++){let s=t[r],l=i[r];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let u=l.left+l.width/2,d=l.top+l.height/2,c=u-a,p=u+a,m=d-a,g=d+a;for(let w=0;w<t.length;w++){if(r===w)continue;let y=i[w];if(!y||y.width===0)continue;let h=y.left+y.width/2,f=y.top+y.height/2;Math.abs(f-d)<a*2&&(h>u?p=Math.min(p,(u+h)/2):h<u&&(c=Math.max(c,(u+h)/2))),Math.abs(h-u)<a*2&&(f>d?g=Math.min(g,(d+f)/2):f<d&&(m=Math.max(m,(d+f)/2)))}c=Math.min(c,l.left),p=Math.max(p,l.right),m=Math.min(m,l.top),g=Math.max(g,l.bottom),s.style.left=`${c-l.left}px`,s.style.top=`${m-l.top}px`,s.style.width=`${Math.max(0,p-c)}px`,s.style.height=`${Math.max(0,g-m)}px`,s.style.transform="none"}}function Fr(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function oi(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function ct(e,t){switch(e.type){case"slider":return Pd(e,t);case"select":return qd(e,t);case"toggle":return Bd(e,t);case"button":return Rd(e,t);case"readout":return Od(e);case"label":return _d(e);case"note":return ii(e);case"knob":return Gd(e,t);case"choice":return Yd(e,t);case"slotRow":return Kd(e,t);case"stepGrid":return Jd(e,t);case"canvas":return nu(e);case"fx":return su(e,t);case"eqGraph":return td(e,t);case"group":return Ad(e,t,ct);case"strip":return au(e,t);case"stripAdd":return ru(e,t);case"padGrid":return Md(e,t);case"moves":return Hd(e,t);default:return ii({id:"unknown",text:""})}}function fe(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Pr(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(zr(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let i=e.querySelector("[data-nc-readout]");i&&(i.textContent=t.valueText??Rt(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),ni(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")ni(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&Ye(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Wd(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??Rt(t.value))}else if(t.type==="choice")Dr(e,t);else if(t.type==="slotRow")Br(e,t);else if(t.type==="stepGrid")Aa(e,t);else if(t.type==="padGrid")Lr(e,t);else if(t.type==="moves")Nr(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&dr(n,t)}else if(t.type==="eqGraph")hr(e,t);else if(t.type==="strip"){Hr(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${Pt(n.id)}"]`);a instanceof Element&&fe(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Or(e,t);else if(t.type==="group"){Tr(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${Pt(n.id)}"]`);a instanceof Element&&fe(a,n)}}else if(t.type==="fx"){Kr(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${Pt(n.id)}"]`);a instanceof Element&&fe(a,n)}}}}function Pd(e,t){let n=Pn(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let i=Nn(e.taper,e.min,e.max);a.min=String(i?0:e.min),a.max=String(i?1e3:e.max),a.step=String(i?1:e.step),i&&(a.dataset.ncTaper=e.taper),a.value=String(zr(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let r=l=>i?pa(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(r(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(r(l))}),i&&a.addEventListener("keydown",l=>{let u=t(a);if(u?.type!=="slider"||a.disabled)return;let d=u.taper??e.taper,c=cr(d,u.min,u.max,u.value,l.key,l.shiftKey,u.step);c!==null&&(l.preventDefault(),a.value=String(_a(d,u.min,u.max,c)),u.onChange(c),u.onCommit?.(c))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(Dd(e,a,t),s),n.append(te()),fe(n,e),n}function zr(e){return Nn(e.taper,e.min,e.max)?_a(e.taper,e.min,e.max,e.value):e.value}function Dd(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(ve());let i=r=>{let s=n(t);s?.type==="slider"&&s.onTap?.(r)};return a.addEventListener("pointerdown",r=>{r.button===0&&i(r.timeStamp)}),a.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),i(r.timeStamp))}),a}function qd(e,t){let n=Pn(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let i=null;for(let r of e.options){let s=document.createElement("option");s.value=r.value,s.textContent=r.label,r.disabled&&(s.disabled=!0),r.group?i?.getAttribute("label")!==r.group&&(i=document.createElement("optgroup"),i.setAttribute("label",r.group),a.append(i)):i=null,(i??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let r=t(a);r?.type==="select"&&r.onChange(a.value)}),n.append(a,te()),n}function Bd(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(te()),fe(n,e),n}function Rd(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let r=t(n);r?.type==="button"&&r.onPress()}),n.append(te()),fe(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let i=document.createElement("button");return i.type="button",i.className="nc-sparkle-btn",i.dataset.ncSparkle=e.id,i.setAttribute("aria-label","Surprise me"),i.title=e.sparkleTitle??"Surprise me",i.innerHTML=Fr(),i.addEventListener("click",()=>{let r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&Rr(r);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,i),a}function Od(e){let t=Pn(e.id,e.label);return t.append(te()),fe(t,e),t}var Id=450;function Hd(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let i=document.createElement("div");i.className="nc-moves-row",i.setAttribute("role","group"),i.setAttribute("aria-label",a.label),a.title&&(i.title=a.title);let r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let u=document.createElement("button");u.type="button",u.className="nc-moves-btn",u.dataset.ncMove=l.id,u.title=l.title??l.text,u.setAttribute("aria-label",`${a.label} ${l.text}`),u.append(jd(l.icon)),u.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),s.append(u)}i.append(r,s),n.append(i)}return Nr(n,e),n}function Nr(e,t){for(let n of t.groups)for(let a of n.moves){let i=e.querySelector(`[data-nc-move="${Pt(a.id)}"]`);i instanceof HTMLButtonElement&&(i.disabled=a.disabled===!0)}}function jd(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function _d(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(te()),t}function ii(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(te()),t}function ri(e){if(typeof e.valueText=="string")return e.valueText;let t=Rt(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Pr(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Wd(e,t){let n=ja(t.taper,t.min,t.max,t.value);Pr(e,t.modulated===!0);let a=Math.round(n*270);e.style.setProperty("--knob-turn",String(a)),t.bipolar&&(e.style.setProperty("--knob-from",String(Math.min(a,135))),e.style.setProperty("--knob-to",String(Math.max(a,135)))),e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",ri(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${ri(t)}`}function Ud(e,t){if(Nn(e.taper,e.min,e.max))return cr(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,i=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+i:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-i:null}function Gd(e,t){let n=Pn(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let i=document.createElement("i");i.className="nc-knob-mark",a.append(i);let r=0,s=0;a.addEventListener("pointerdown",d=>{r=d.clientY;let c=t(a);s=c&&"value"in c?Number(c.value):0,a.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",d=>{if(a.hasPointerCapture&&!a.hasPointerCapture(d.pointerId))return;let c=t(a);if(c?.type!=="knob")return;if(Nn(c.taper,c.min,c.max)){let g=ja(c.taper,c.min,c.max,s)-(d.clientY-r)/120;c.onChange(sr(c.taper,c.min,c.max,g));return}let p=c.max-c.min||1,m=Math.min(c.max,Math.max(c.min,s-(d.clientY-r)*p/120));c.onChange(m)}),a.addEventListener("dblclick",()=>{let d=t(a);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),a.addEventListener("keydown",d=>{let c=t(a);if(c?.type!=="knob")return;let p=Ud(c,d);p!==null&&(d.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,p))))});let u=n.querySelector("[data-nc-readout]");return n.insertBefore(a,u),n.append(te()),fe(n,e),n}function Yd(e,t){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label);for(let a of e.options){let i=document.createElement("button");i.type="button",i.className="nc-choice",i.dataset.ncChoice=a.value,i.setAttribute("role","tab"),i.textContent=a.label,i.addEventListener("click",()=>{let r=t(n);r?.type==="choice"&&r.onChange(a.value)}),i.addEventListener("keydown",r=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(i),u=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")u=(l+1)%s.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")u=(l-1+s.length)%s.length;else if(r.key==="Home")u=0;else if(r.key==="End")u=s.length-1;else return;let d=s[u];d instanceof HTMLButtonElement&&(r.preventDefault(),d.focus(),d.click())}),n.append(i)}return n.append(te()),Dr(n,e),n}function Dr(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function Kd(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let c=0;c<e.slots.length;c++){let p=e.slots[c],m=document.createElement("span");m.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(c),g.textContent=p.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",m.append(g,ve()),Xd(m,g,n,c,t),a.append(m)}let i=e.onSparkle?document.createElement("button"):null;i&&(i.type="button",i.className="nc-sparkle",i.setAttribute("aria-label","Surprise me"),i.innerHTML=Fr(),i.append(ve()),i.addEventListener("click",()=>{Rr(n);let c=t(n);c?.type==="slotRow"&&c.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let c=t(n);c?.type==="slotRow"&&c.onMorph(Number(l.value))});let u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",r.append(s,u,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(a,...i?[i]:[]),n.append(d,r,te()),qr(n,t),Br(n,e),n}function si(e,t,n,a){let i=n(e);if(i?.type!=="slotRow")return;Tt(e);let r=a.shiftKey?"store":a.altKey?"clear":"recall";i.onSlot(t,r)}function Xd(e,t,n,a,i){let r=0,s=0,l=0,u=!1,d=!1,c=!1,p=!1,m=()=>{window.clearTimeout(r),r=0},g=f=>{let b=f.clientX-s,v=f.clientY-l;b*b+v*v>ai*ai&&(u=!0,m())},w=()=>{p&&(p=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",h))},y=f=>{let b=r!==0&&!u&&!d;m(),w(),b&&(c=!0,si(n,a,i,f))},h=()=>{u=!0,m(),w()};e.addEventListener("pointerdown",f=>{f.button===0&&(w(),d=!1,u=!1,c=!1,s=f.clientX,l=f.clientY,m(),r=window.setTimeout(()=>{r=0,!u&&(d=!0,Vd(n,t,a,i))},Fd),p=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",h))}),e.addEventListener("contextmenu",f=>f.preventDefault()),e.addEventListener("click",f=>{if(c||d||u){c=!1,d=!1,u=!1;return}si(n,a,i,f)})}function qr(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=li("Save","store"),i=li("Clear","clear");n.append(a,i);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),Tt(e)}),r.addEventListener("click",s=>s.stopPropagation()),e.append(r,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let u=t(e);if(u?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(u.onSlot(d,"store"),Tt(e)):l.dataset.ncSlotOp==="clear"&&(u.onSlot(d,"clear"),Tt(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&Tt(e)})}function li(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Vd(e,t,n,a){qr(e,a);let i=e.querySelector(".nc-slot-menu");if(!(i instanceof HTMLElement))return;let r=e.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),i.hidden=!1,i.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-s.left}px`,i.style.top=`${l.bottom-s.top}px`,i.querySelector("button")?.focus()}function Tt(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Br(e,t){for(let i of e.querySelectorAll("[data-nc-slot]")){if(!(i instanceof HTMLButtonElement))continue;let r=Number(i.dataset.ncSlot),s=t.slots[r];if(!s)continue;i.textContent=s.label,s.filled?i.dataset.filled="true":delete i.dataset.filled,s.active?i.dataset.active="true":delete i.dataset.active,s.edited?i.dataset.edited="true":delete i.dataset.edited,s.queued?i.dataset.queued="true":delete i.dataset.queued,s.queued&&s.pulse?i.dataset.pulse="true":delete i.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];i.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function Rr(e){let t=e.dataset.ncLastFill||null,n=rc(t);e.dataset.ncLastFill=n;let a=sc(n);if(a)for(let[i,r]of Object.entries(a))e.style.setProperty(i,r)}function Qd(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,i=r=>{if(a===r)return;a=r,n.setAttribute("aria-pressed",r?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),i(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>i(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||i(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),i(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function Jd(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let i=h=>{let f=document.createElement("button");return f.type="button",f.setAttribute("role","radio"),f.textContent=h,a.append(f),f},r=i("Note"),s=i("Accent");s.dataset.ncAccentMode="";let l=h=>{for(let f of[r,s]){let b=f===h;f.setAttribute("aria-checked",b?"true":"false"),f.tabIndex=b?0:-1}};l(r);for(let h of[r,s])h.addEventListener("click",()=>l(h));a.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();let f=s.getAttribute("aria-checked")==="true"?r:s;l(f),f.focus()});let u=document.createElement("div");if(u.className="nc-step-tools",u.append(a),e.onFill&&u.append(Qd(n,t)),e.onClear){let h=document.createElement("button");h.type="button",h.className="nc-fill nc-clear",h.dataset.ncClear="",h.textContent=e.clearLabel??"Clear",h.title="Clear every step (Undo takes it back)",h.addEventListener("click",()=>{let f=t(n);f?.type==="stepGrid"&&f.onClear?.()}),u.append(h)}n.append(u);for(let h of e.rows){let f=document.createElement("div");f.className="nc-row",f.dataset.ncRow="";let b=document.createElement("button");b.type="button",b.className="nc-name",b.textContent=h.label,b.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(b.dataset.ncLane=String((h.lane-1)%4+1));let v=!1,E=0;b.addEventListener("pointerdown",x=>{v=!1,!(x.pointerType==="mouse"||x.button!==0)&&(E=window.setTimeout(()=>{let M=t(n);M?.type!=="stepGrid"||!M.selectedRows||(v=!0,M.onSelectRow?.(M.rows.findIndex(L=>L.id===h.id),!0))},Id))});for(let x of["pointerup","pointercancel","pointerleave"])b.addEventListener(x,()=>window.clearTimeout(E));b.addEventListener("contextmenu",x=>{v&&x.preventDefault()}),b.addEventListener("click",x=>{let M=t(n);if(M?.type!=="stepGrid")return;if(v){v=!1;return}let L=M.rows.findIndex(G=>G.id===h.id),R=!!M.selectedRows&&(x.shiftKey||x.metaKey||x.ctrlKey);M.onSelectRow?.(L,R)}),b.addEventListener("keydown",x=>Zd(n,b,x));let A=[];for(let x of["mute","solo"]){if(!(x==="mute"?e.onMute:e.onSolo))continue;let M=document.createElement("span");M.className="nc-ms-wrap";let L=document.createElement("button");L.type="button",L.className="nc-ms",L.dataset.ncMs=x,L.textContent=x==="mute"?"M":"S",L.setAttribute("aria-label",`${x==="mute"?"Mute":"Solo"} ${h.label}`),M.append(L,ve()),M.addEventListener("click",()=>{let R=t(n);if(R?.type!=="stepGrid")return;let G=R.rows.findIndex(ce=>ce.id===h.id);(x==="mute"?R.onMute:R.onSolo)?.(G)}),A.push(M)}let k=document.createElement("div");k.className="nc-steps";for(let x=0;x<h.steps.length;x++){let M=document.createElement("span");M.className="nc-step-wrap";let L=document.createElement("button");L.type="button",L.className="nc-step",L.dataset.ncStep=`${h.id}:${x}`,L.setAttribute("aria-label",`${h.label} step ${x+1}`),M.append(L,ve()),M.addEventListener("click",R=>{let G=t(n);if(G?.type!=="stepGrid")return;let ce=G.rows.findIndex(Me=>Me.id===h.id),z=s.getAttribute("aria-checked")==="true";G.onToggle(ce,x,R.shiftKey||z)}),k.append(M)}if(e.onLength&&k.append(eu(n,k,h,t)),f.append(...A,b,k),e.onDice){let x=document.createElement("button");x.type="button",x.className="nc-sparkle nc-row-dice",x.dataset.ncDice=h.id,x.setAttribute("aria-label",`Re-roll ${h.label}`),x.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,x.innerHTML=oi(),x.append(ve()),x.addEventListener("click",()=>{let M=t(n);M?.type==="stepGrid"&&M.onDice?.(M.rows.findIndex(L=>L.id===h.id))}),f.append(x)}f.addEventListener("click",x=>{if(x.target!==f)return;let M=t(n);M?.type==="stepGrid"&&M.onSelectRow?.(M.rows.findIndex(L=>L.id===h.id))}),ci(n,k,".nc-step-wrap",t,s,()=>h.id),n.append(f)}let d=document.createElement("div");d.className="nc-pads-head";let c=(h,f,b)=>{let v=document.createElement("button");return v.type="button",v.className=h,v.textContent=f,b&&v.setAttribute("aria-label",b),v},p=c("nc-pads-step","‹","Previous lane"),m=c("nc-pads-step","›","Next lane"),g=document.createElement(e.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),e.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let h=t(n);h?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Aa(n,h))}));for(let[h,f]of[[p,-1],[m,1]])h.addEventListener("click",()=>{let b=t(n);if(b?.type!=="stepGrid"||b.rows.length===0)return;let v=b.rows.length;b.onSelectRow?.(((en(b)+f)%v+v)%v)});if(d.append(p,g,m),e.onDice){let h=c("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=oi(),h.addEventListener("click",()=>{let f=t(n);if(f?.type!=="stepGrid")return;let b=en(f);b>=0&&f.onDice?.(b)}),d.append(h)}if(e.transport){let h=c("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{let f=t(n);f?.type==="stepGrid"&&f.transport?.onToggle()}),d.append(h)}n.append(d);let w=document.createElement("div");w.className="nc-pads",w.setAttribute("role","group");let y=Math.max(0,...e.rows.map(h=>h.steps.length));for(let h=0;h<y;h++){let f=document.createElement("button");f.type="button",f.className="nc-pad",f.dataset.ncPad=String(h),f.textContent=String(h+1),f.addEventListener("click",b=>{let v=t(n);if(v?.type!=="stepGrid")return;let E=en(v);if(E<0)return;if(n.dataset.ncLenMode==="true"){v.onLength?.(E,h+1);return}let A=s.getAttribute("aria-checked")==="true";v.onToggle(E,h,b.shiftKey||A)}),w.append(f)}return ci(n,w,".nc-pad",t,s,()=>{let h=t(n);return h?.type==="stepGrid"?h.rows[en(h)]?.id:void 0}),n.append(w),n.append(te()),Aa(n,e),n}function en(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function ci(e,t,n,a,i,r){let s="on",l=!0,u=-1,d=(c,p)=>{let m=c.rows[u]?.steps[p];!m||p>=c.rows[u].length||(c.onSet?c.onSet(u,p,s,l):!!m[s]!==l&&c.onToggle(u,p,s==="accent"))};kd(t,n,c=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(c.kind!=="paint")return;let m=p.rows.findIndex(g=>g.id===r());m>=0&&p.rows[m].length!==c.pad+1&&p.onLength?.(m,c.pad+1);return}if(c.kind==="paint"){if(c.phase==="start"){let m=r();u=p.rows.findIndex(w=>w.id===m);let g=p.rows[u]?.steps[c.pad];if(!g)return;s=i.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[s]}d(p,c.pad)}else if(c.kind==="long"){let m=r(),g=p.rows.findIndex(y=>y.id===m),w=t.querySelectorAll(n)[c.pad];g>=0&&w instanceof HTMLElement&&p.onLongPress?.(g,c.pad,w)}}})}function Zd(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],i=a.indexOf(t),r=i;n.key==="ArrowDown"?r=i+1:n.key==="ArrowUp"?r=i-1:n.key==="Home"?r=0:r=a.length-1;let s=a[r];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function eu(e,t,n,a){let i=document.createElement("button");i.type="button",i.className="nc-len-handle",i.dataset.ncLen=n.id,i.setAttribute("role","slider"),i.setAttribute("aria-valuemin","1"),i.setAttribute("aria-valuemax",String(n.steps.length)),i.append(ve());let r=d=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.findIndex(w=>w.id===n.id),m=c.rows[p];if(!m)return;let g=Math.max(1,Math.min(m.steps.length,d));g!==m.length&&c.onLength?.(p,g)},s=d=>{let c=[...t.querySelectorAll(".nc-step")],p=1;return c.forEach((m,g)=>{let w=m.getBoundingClientRect();w.width>0&&d>=w.left+w.width/2&&(p=g+1)}),p},l=d=>r(s(d.clientX)),u=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete i.dataset.dragging};return i.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),i.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),i.addEventListener("keydown",d=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.find(g=>g.id===n.id);if(!p)return;let m={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};d.key in m&&(d.preventDefault(),r(m[d.key]))}),i}var Zn=new WeakMap,tn=new WeakMap;function tu(e){return e?(tn.has(e)||(tn.set(e,ua(e)),Ji(t=>{tn.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))Ea(n,Number(n.getAttribute("data-nc-velocity")))},e)),tn.get(e)):"light"}function Ea(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:tu(e.ownerDocument),i=n===null?null:`${a} ${n}`;if(!(Zn.has(e)&&Zn.get(e)===i)){if(Zn.set(e,i),n===null){for(let r of Object.keys(Io(1)))e.style.removeProperty(r);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[r,s]of Object.entries(Io(n,Oo[a]??Oo.light)))e.style.setProperty(r,s)}}function Aa(e,t){let n=t.rows.some(c=>c.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let i=e.querySelector(".nc-pads"),r=t.rows.find(c=>c.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&r&&(s.textContent=l?`${r.label} · ${r.length}`:r.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let u=e.querySelector("[data-nc-pads-dice]");u instanceof HTMLElement&&r&&(u.setAttribute("aria-label",`Re-roll ${r.label}`),u.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let c=!!t.transport?.playing,p=t.transport?.label??(c?"Stop":"Play");d.textContent!==p&&(d.textContent=p),d.setAttribute("aria-pressed",c?"true":"false");let m=t.transport?.ariaLabel;m?d.setAttribute("aria-label",m):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&r){i.setAttribute("aria-label",`${r.label} steps`),r.lane&&(i.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?i.dataset.silent="true":delete i.dataset.silent;let c=r.length>0?(t.playhead%r.length+r.length)%r.length:-1;for(let p of i.querySelectorAll("[data-nc-pad]")){let m=Number(p.getAttribute("data-nc-pad")),g=r.steps[m];p instanceof HTMLButtonElement&&(p.hidden=!g||!l&&m>=r.length,l&&m>=r.length?p.dataset.out="true":delete p.dataset.out,l&&m===r.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${r.label} step ${m+1}`),p.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?p.dataset.accent="true":delete p.dataset.accent,g?.dim?p.dataset.dim="true":delete p.dataset.dim,Ea(p,g?.velocity),t.playhead>=0&&m===c?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let c of t.rows){for(let g=0;g<c.steps.length;g++){let w=c.steps[g],y=e.querySelector(`[data-nc-step="${c.id}:${g}"]`);if(!(y instanceof HTMLButtonElement))continue;let h=y.closest(".nc-row");if(h instanceof HTMLElement){t.selectedRow===c.id?h.dataset.selected="true":delete h.dataset.selected;let v=t.selectedRow!==c.id&&(t.selectedRows??[]).includes(c.id);v?h.dataset.picked="true":delete h.dataset.picked;let E=h.querySelector(".nc-name");E instanceof HTMLElement&&(E.setAttribute("aria-pressed",t.selectedRow===c.id||v?"true":"false"),E.textContent!==c.label&&(E.textContent=c.label,E.setAttribute("aria-label",`Select ${c.label}`))),c.mute||n&&!c.solo?h.dataset.silent="true":delete h.dataset.silent;for(let A of h.querySelectorAll("[data-nc-ms]")){let k=A.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;A.setAttribute("aria-pressed",k?"true":"false")}}y.setAttribute("aria-pressed",w.on?"true":"false"),w.accent?y.dataset.accent="true":delete y.dataset.accent,w.dim?y.dataset.dim="true":delete y.dataset.dim,g%4===0?y.dataset.bar="true":delete y.dataset.bar,typeof w.velocity=="number"?(y.dataset.velocity="true",y.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,w.velocity))*100)}%`)):(delete y.dataset.velocity,y.style.removeProperty("--level")),Ea(y,w.velocity);let f=t.playhead>=0&&c.length>0?(t.playhead%c.length+c.length)%c.length:-1;g===f?y.dataset.playhead="true":delete y.dataset.playhead;let b=!!t.onLength&&t.selectedRow===c.id;y.hidden=g>=c.length&&!b,g>=c.length&&b?y.dataset.out="true":delete y.dataset.out}let p=e.querySelector(`[data-nc-len="${c.id}"]`),m=e.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&m&&m.nextElementSibling!==p){let g=document.activeElement===p;m.after(p),g&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(c.length)),p.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),p.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function nu(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,te()),t}function au(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let i=document.createElement("span");i.className="nc-strip-name",i.dataset.ncStripName="";let r=!e.master&&typeof e.onFold=="function",s=null;if(r&&(n.dataset.ncFoldable="",s=_r(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let f=t(n);f?.type==="strip"&&(f.onFold?.(f.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(i),e.onRemove){let f=document.createElement("button");f.type="button",f.className="nc-strip-remove",f.dataset.ncStripRemove="",f.textContent="×",f.addEventListener("click",()=>{let b=t(n);b?.type==="strip"&&b.onRemove?.(f)}),a.append(f)}let l=document.createElement("div");if(l.className="nc-strip-hacks",e.onHacks){let f=document.createElement("span");f.className="nc-hacks-wrap";let b=document.createElement("button");b.type="button",b.className="nc-hacks",b.dataset.ncHacks="",f.append(b,ve()),f.addEventListener("click",()=>{let v=t(n);v?.type==="strip"&&v.onHacks?.()}),l.append(f)}let u=document.createElement("div");u.className="nc-strip-ms";for(let f of["mute","solo"]){if(!(f==="mute"?e.onMute:e.onSolo))continue;let b=document.createElement("span");b.className="nc-ms-wrap";let v=document.createElement("button");v.type="button",v.className="nc-ms",v.dataset.ncMs=f,v.textContent=f==="mute"?"M":"S",b.append(v,ve()),b.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&(f==="mute"?E.onMute:E.onSolo)?.()}),u.append(b)}let d=document.createElement("div");d.className="nc-strip-sends";for(let f of e.sends??[])d.append(ct({...f,type:"knob",compact:!0},t));let c=document.createElement("div");c.className="nc-strip-pan",e.pan&&c.append(ct(Va(e),t));let p=document.createElement("div");p.className="nc-strip-body";let m=document.createElement("span");m.className="nc-scale",m.setAttribute("aria-hidden","true");for(let f of e.ticks??[]){let b=document.createElement("span");b.className="nc-scale-tick",b.style.setProperty("--tick-pos",String(f.value)),b.textContent=f.label,m.append(b)}let g=Tc({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:f=>{let b=t(n);b?.type==="strip"&&b.onChange(f)},onReset:()=>{let f=t(n);f?.type==="strip"&&ui(f)}}),w=Pc({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let f=t(n);f?.type==="strip"&&f.onClipClear?.()}});if(p.append(m,g.el,w.el),r){let f=document.createElement("button");f.type="button",f.className="nc-ui-fx-fold nc-strip-fold",f.dataset.ncStripFold="",f.setAttribute("aria-expanded","false");let b=document.createElement("span");b.className="nc-strip-fold-cap",b.setAttribute("aria-hidden","true");let v=document.createElement("span");v.className="nc-ui-fx-fold-name",v.dataset.ncStripFoldName="";let E=document.createElement("span");E.className="nc-strip-fold-pan",E.setAttribute("aria-hidden","true"),E.hidden=!e.pan,f.append(b,E,v),f.addEventListener("click",()=>{let A=t(n);if(A?.type!=="strip")return;A.onFold?.(!1);let k=n.querySelector("[data-nc-strip-hide]");k instanceof HTMLElement&&k.focus()}),p.prepend(f)}let y=document.createElement("button");y.type="button",y.className="nc-strip-db",y.dataset.ncReadout="";let h=0;return y.addEventListener("click",f=>{let b=t(n);b?.type!=="strip"||!b.onTypeIn||(window.clearTimeout(h),f.detail===0?di(n,y,t):f.detail===1&&(h=window.setTimeout(()=>di(n,y,t),iu)))}),y.addEventListener("dblclick",()=>{window.clearTimeout(h);let f=t(n);f?.type==="strip"&&ui(f)}),s&&n.append(s),n.append(a,l,u,d,c,p,y,te()),Hr(n,e),n}function Va(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??ou(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function ou(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var iu=250;function di(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let i=document.createElement("input");i.type="text",i.className="nc-strip-db-input",i.inputMode="decimal",i.spellcheck=!1,i.autocomplete="off",i.value=a.valueText??Rt(a.value),i.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(i),i.focus(),i.select?.();let r=!1,s=l=>{if(r)return;r=!0;let u=i.value;if(i.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(u)}t.focus?.()};i.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),i.addEventListener("blur",()=>s(!1))}function ru(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-strip-add-plus",i.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",a.append(i,r);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),u=s.value;Ir(s),l?.type==="stripAdd"&&u&&l.onAdd(u)}),n.append(a,s,te()),Or(n,e),n}function Or(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let i=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],r=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=i.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==s&&(a.replaceChildren(...i.map(l=>{let u=document.createElement("option");return u.value=l.value,u.textContent=l.label,u.disabled=l.disabled===!0,u})),Ir(a))}function Ir(e){let t=e.options[0];t&&(t.selected=!0)}function ui(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Hr(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let i=e.querySelector(".nc-fader"),r=i?Cc(i):void 0;r&&(r.configure({step:t.step}),r.set(t.value),r.setText(t.valueText),r.setLabel(`${t.label} level`)),Dc(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let p=t.valueText??Rt(t.value);s.textContent!==p&&(s.textContent=p),s.setAttribute("aria-label",`${t.label} level ${p}`);let m=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${m}`:m}for(let p of e.querySelectorAll("[data-nc-ms]")){let m=p.getAttribute("data-nc-ms"),g=m==="mute"?t.mute===!0:t.solo===!0;p.setAttribute("aria-pressed",g?"true":"false"),p.setAttribute("aria-label",`${m==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let p=t.hacksLabel??"Hacks";l.textContent!==p&&(l.textContent=p),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${p}: ${t.label}`)}if(t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let p=e.querySelector(`.nc-strip-pan [data-nc-id="${Pt(t.pan.id)}"]`);p&&fe(p,Va(t))}let u=!t.master&&typeof t.onFold=="function"&&t.folded===!0;u?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let d=e.querySelector("[data-nc-strip-hide]");d instanceof HTMLElement&&(Wr(d,u,t.label),Ye(d,t.foldHelp));let c=e.querySelector("[data-nc-strip-fold]");if(c instanceof HTMLElement){c.hidden=!u,c.setAttribute("aria-label",`Expand ${t.label}`);let p=c.querySelector("[data-nc-strip-fold-name]");p&&p.textContent!==t.label&&(p.textContent=t.label),Ye(c,t.foldedHelp??t.foldHelp)}}function su(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let i=typeof e.onFold=="function",r=!!e.meter;if(e.on===void 0&&!i&&!vn(e)&&!r)n.append(a);else{let s=document.createElement("div");if(s.className="nc-ui-fx-hd",s.append(a),r&&s.append(Gr(n,"head")),e.on!==void 0){let l=or({checked:e.on,labelledBy:a.id,onChange:u=>{let d=t(l.el);d?.type==="fx"&&d.onToggle?.(u)}});l.el.dataset.ncFxSwitch="",s.append(l.el)}i&&s.append(cu(n,t)),vn(e)&&s.append(hu(n,t)),n.append(s)}i&&n.prepend(du(n,t)),r&&Yr(n,e);for(let s of e.controls)n.append(ct(s,t));if(e.more?.length){let s=document.createElement("details");s.className="nc-ui-more";let l=document.createElement("summary");l.textContent=e.moreLabel??"More",s.append(l);for(let u of e.more)s.append(ct(u,t));n.append(s)}return n.append(te()),Kr(n,e),n}var lu=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function jr(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&lu(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function cu(e,t){let n=_r();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),jr(e))}),n}function _r(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Wr(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function du(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let i=document.createElement("span");i.className="nc-ui-fx-fold-name",i.dataset.ncFxFoldName="";let r=document.createElement("span");return r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),n.append(r,a,i),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Gr(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),jr(e)}}),n}var dt=new Set;function cn(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var vn=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"),uu="(max-width: 768px)";function pu(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function hu(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(pu()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(Ur(e,a,!dt.has(a.id)),n.focus())}),n}function Ur(e,t,n){n?dt.add(t.id):dt.delete(t.id),Qa(e,t)}function mu(e,t){t?.type==="fx"&&dt.has(t.id)&&Ur(e,t,!1)}function fu(e){return e.ownerDocument.defaultView?.matchMedia?.(uu).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Qa(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=vn(t)&&dt.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!vn(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),cn(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&lt(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",Ye(n,t.maxHelp)),!a){e.dataset.ncMax&&pi(e);return}if(!e.isConnected){let s=()=>e.isConnected&&dt.has(t.id)&&Qa(e,t);queueMicrotask(()=>{e.isConnected?s():cn(e.ownerDocument,s)});return}let i=fu(e),r=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;r>0&&e.style.setProperty("--nc-fx-dials",String(r)),e.dataset.ncMax!==i&&(e.dataset.ncMax&&pi(e),e.dataset.ncMax=i,i==="over"&&gu(e,t)),bu(e.ownerDocument),i==="over"&&Ja(e),cn(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&lt(s)})}function pi(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),cn(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&lt(n)})}function gu(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let i=e.querySelector("[data-nc-fx-max]");i instanceof HTMLElement&&i.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function Ja(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,i=e.ownerDocument.defaultView,r=Number.parseFloat(i?.getComputedStyle(a).columnGap??"")||0,s=ed(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),r,i?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var hi=new WeakSet;function bu(e){hi.has(e)||(hi.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(i=>i.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&Ja(t)}))}var Sa=new WeakMap;function Gr(e,t){let n=gd(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Yr(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let i of n)Ye(i,t.meterHelp);let a=Sa.get(e);a?a.set(t.meter):Sa.set(e,vd(n,t.meter))}function Kr(e,t){(t.meter||Sa.has(e))&&Yr(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let i=typeof t.onFold=="function"&&t.folded===!0;i?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let r=e.querySelector("[data-nc-fx-hide]");r instanceof HTMLElement&&(Wr(r,i,t.title),Ye(r,t.foldHelp)),Qa(e,t);let s=e.querySelector(":scope > [data-nc-fx-fold]");if(s instanceof HTMLElement){let l=t.on===void 0?"":t.on?"On":"Off";s.hidden=!i,s.setAttribute("aria-label",`Expand ${t.title}${l?`, ${l.toLowerCase()}`:""}`),s.dataset.on=t.on===!0?"true":"false";let u=s.querySelector("[data-nc-fx-fold-state]");u&&(u.textContent=l,u.hidden=l==="");let d=s.querySelector("[data-nc-fx-fold-name]");d&&(d.textContent=t.title),Ye(s,t.foldHelp)}}function Ye(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Pt(e){return e.replace(/["\\]/g,"\\$&")}function yu(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(i=>i.type==="canvas"&&i.id===n.dataset.ncId);a?.type==="canvas"&&dr(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&lt(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&Ja(n);Nd(e)}var wu=Ne["toast-duration"];function vu({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function xu(e,t,n,a){let i=l=>({top:l,bottom:l+n}),r=l=>e.some(u=>u&&u.bottom>l.top&&u.top<l.bottom),s=i(t-a-n);return r(s)?r(i(a))?"bottom":"top":"bottom"}function ku(e,t,n,a,i,r){let s=e.bottom+i,l=Math.max(r,Math.min(e.left,a-r-n.width));for(let u=!0,d=0;u&&d<8;d++){u=!1;for(let c of t)c&&c.bottom>s&&c.top<s+n.height&&c.right>l&&c.left<l+n.width&&(s=c.bottom+i,u=!0)}return{top:s,left:l}}var mi="data-nc-ui-toast-live";function $u(e,t){let n=t.querySelector(`[${mi}]`);return n||(n=e.createElement("div"),n.setAttribute(mi,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function Eu({message:e,actionLabel:t,onAction:n,duration:a=wu,onClose:i,avoid:r=[],anchor:s,host:l,document:u=globalThis.document}={}){l=l??u.body;let d=u.defaultView??globalThis,c=u.createElement("div");c.className="nc-ui-toast",c.setAttribute("data-state","enter");let p=u.createElement("span");p.className="nc-ui-toast-message",p.textContent=e,c.appendChild(p);let m=null;t&&(m=u.createElement("button"),m.type="button",m.className="nc-ui-toast-action",m.textContent=t,c.appendChild(m)),l.appendChild(c);let g="open",w=Q=>Q&&typeof Q.getBoundingClientRect=="function"?Q.getBoundingClientRect():null,y=w(c),h=y?.height||44,f=d.getComputedStyle?.(c),b=Number.parseFloat(f?.getPropertyValue(I("toast-offset")))||16,v=Number.parseFloat(f?.getPropertyValue(I("toast-anchor-gap")))||8,E=w(s),A=d.innerHeight??0,k=r.map(w).filter(Boolean),x=E&&E.bottom>0&&E.top<A?ku(E,k,{width:y?.width||0,height:h},d.innerWidth??0,v,b):null;x&&x.top+h<=A?(c.setAttribute("data-placement","anchor"),c.style.top=`${x.top+(d.scrollY??0)}px`,c.style.left=`${x.left+(d.scrollX??0)}px`):c.setAttribute("data-placement",xu(k,A,h,b));let M=d.requestAnimationFrame?.bind(d)??(Q=>setTimeout(Q,16));M(()=>M(()=>{g==="open"&&c.setAttribute("data-state","open")})),$u(u,l).textContent=vu({message:e,actionLabel:t});let L,R,G=new Promise(Q=>{R=Q}),ce=Q=>{clearTimeout(L),L=setTimeout(()=>Xe("timeout"),Q)},z=a,Me=Date.now(),xt=()=>{g==="open"&&(clearTimeout(L),z=Math.max(0,z-(Date.now()-Me)))},kt=()=>{g==="open"&&(Me=Date.now(),ce(z))};c.addEventListener("pointerenter",xt),c.addEventListener("pointerleave",kt),c.addEventListener("focusin",xt),c.addEventListener("focusout",kt),m?.addEventListener("click",()=>{if(g==="open")try{n?.()}finally{Xe("action")}}),Number.isFinite(a)&&ce(a);function Xe(Q="close"){if(g!=="open")return;g="closing",clearTimeout(L),c.setAttribute("data-state","closing"),i?.(Q);let Xt=d.getComputedStyle?.(c),Te=Xt?Math.max(0,...String(Xt.transitionDuration||"").split(",").map(J=>Number.parseFloat(J)*(J.trim().endsWith("ms")?1:1e3)||0)):0,N=()=>{g!=="gone"&&(g="gone",c.remove(),R(Q))};c.addEventListener("transitionend",N),setTimeout(N,Te+50)}return{el:c,close:Xe,closed:G}}var fi="data-nc-help";function Au(e,t,n,a=0,i=6,r=8){let s=e.top-i-t.height,l=s>=a+r?"above":"below",u=l==="above"?s:e.bottom+i,d=Math.max(r,Math.min(e.left,n-r-t.width));return{top:Math.round(u),left:Math.round(d),side:l}}var ea=new WeakMap;function Su(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Mu({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=ea.get(e);if(n)return n;let a=e.defaultView,i=null,r=null,s,l=()=>{clearTimeout(s),r=null,i&&(i.hidden=!0)},u=m=>{let g=m.getAttribute(fi);if(!g)return;i||(i=e.createElement("div"),i.className="nc-ui-help",i.setAttribute("role","tooltip"),i.dataset.testid="nc-help",i.style.position="fixed",i.style.pointerEvents="none",i.style.zIndex="6",e.body.appendChild(i)),i.textContent=g,i.hidden=!1,i.style.visibility="hidden",i.style.top="0px",i.style.left="0px";let w=m.getBoundingClientRect(),y=Au(w,{width:i.offsetWidth,height:i.offsetHeight},a.innerWidth,Su(e));i.style.top=`${y.top}px`,i.style.left=`${y.left}px`,i.dataset.side=y.side,i.style.visibility=""},d=m=>{if(m.pointerType==="touch")return;let g=m.target&&m.target.closest?m.target.closest(`[${fi}]`):null;g!==r&&(l(),g&&(r=g,s=setTimeout(()=>{r===g&&g.isConnected&&u(g)},t)))},c=m=>{m.key==="Escape"&&l()};e.addEventListener("pointerover",d),e.addEventListener("pointerdown",l,!0),e.addEventListener("keydown",c),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);let p={hide:l,uninstall(){l(),e.removeEventListener("pointerover",d),e.removeEventListener("pointerdown",l,!0),e.removeEventListener("keydown",c),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),i?.remove(),i=null,ea.delete(e)}};return ea.set(e,p),p}var Tu="(max-width: 768px)",Cu='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',Lu='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',Fu=0;function zu({panel:e,button:t,label:n="Menu",media:a=Tu}){let i=e.ownerDocument,r=i.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++Fu}`);let s=t??i.createElement("button");t||(s.type="button",s.innerHTML=Cu),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function u(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),i.addEventListener("keydown",c,!0),i.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(Lu)].find(h=>!h.hidden&&h.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function d({focus:h}={}){if(!l())return;let f=e.contains(i.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),i.removeEventListener("keydown",c,!0),i.removeEventListener("pointerdown",p,!0),(h??f)&&s.focus?.({preventScroll:!0})}function c(h){h.key==="Escape"&&(h.preventDefault(),h.stopPropagation(),d({focus:!0}))}function p(h){let f=h.target;f instanceof r.Node&&(e.contains(f)||s.contains(f))||d({focus:!1})}let m=()=>l()?d({focus:!0}):u(),g=h=>{let f=h.target,b=f instanceof r.Element?f.closest("button"):null;!b||!e.contains(b)||b.closest("[data-nc-menu-stay]")||d({focus:!0})};s.addEventListener("click",m),e.addEventListener("click",g);let w=r.matchMedia?.(a),y=()=>{w?.matches||d({focus:!1})};return w?.addEventListener?.("change",y),{button:s,panel:e,open:u,close:d,isOpen:l,destroy(){d({focus:!1}),s.removeEventListener("click",m),e.removeEventListener("click",g),w?.removeEventListener?.("change",y)}}}var Za="netcomposer.rhythm.hidden.v1",ye=new WeakMap;function ta(){try{return globalThis.localStorage??null}catch{return null}}function Xr(e,t=Za){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function gi(e,t,n,a=Za){let i=Xr(e,a);n?i.add(t):i.delete(t);try{e?.setItem(a,JSON.stringify([...i]))}catch{}}function eo(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(i=>i.controls)],n=[],a=i=>{if(n.push(i),i.type==="group")for(let r of i.controls)a(r)};for(let i of t)a(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&(n.push(...(i.sends??[]).map(r=>({...r,type:"knob",compact:!0}))),i.pan&&n.push(Va(i)));return n}function Vr(e,t){if(!(!e||!t))return eo(e).find(n=>n.id===t)}function Nu(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${eo(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Pu(e,t){if(!t.title)return;if(!t.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=t.title,e.append(r);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let i=document.createElement("span");i.className="nc-panel-subject",i.dataset.ncPanelSubject="",n.append(a,i),e.append(n),Qr(e,t)}function Qr(e,t){if(!t.panel)return;let n=[...e.children].find(r=>r.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),i=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),i&&(i.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Du(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=ye.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Vr(n,a)}function qu(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],i=Nu(t);if(e.dataset.ncSignature===i){for(let r of a){let s=e.querySelector(`[data-nc-section="${yi(r.id)}"]`);s&&Qr(s,r);for(let l of r.controls){let u=e.querySelector(`[data-nc-id="${yi(l.id)}"]`);u instanceof Element&&fe(u,l)}s instanceof HTMLElement&&Ma(s,r,n)}return}e.dataset.ncSignature=i,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let r of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=r.id,r.inset&&(s.dataset.ncInset="true"),r.area&&(s.dataset.ncArea=r.area),r.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",r.label)),r.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),r.title&&s.setAttribute("aria-label",r.title)),Pu(s,r);let l=r.panel?document.createElement("div"):s;r.panel&&(l.className="nc-panel-body",s.append(l));for(let u of r.controls)l.append(ct(u,Du));e.append(s),Ma(s,r,n)}}function Jr(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,i=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,i))}}var Bu="(max-width: 768px)",Zr=new WeakMap;function bi(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function Ru(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let i=bi("prev"),r=bi("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(i,s,r,l);let u=(d,c)=>{let p=Zr.get(e);if(!p||c.getAttribute("aria-disabled")==="true")return;let m=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:g}=Jr(m,p.pageSize,(t.pages.get(p.id)??0)+d);t.pages.set(p.id,g),p.onPage?.(g),Ma(e,{...p,page:g},t),c.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===c&&(c===i?r:i).focus(),t.redraw()};return i.addEventListener("click",()=>u(-1,i)),r.addEventListener("click",()=>u(1,r)),e.prepend(a),a}function Ma(e,t,n){Zr.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],i=t.pageSize??0,{pages:r,page:s}=Jr(a.length,i,t.page??n.pages.get(t.id)??0);if(i>0&&n.pages.set(t.id,s),r<=1){for(let h of[...e.children])h.classList.contains("nc-fx-pager")&&h.remove();delete e.dataset.ncPaged;for(let h of a)delete h.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(Bu).matches===!0,u=e.closest(".nc-module");a.forEach((h,f)=>{let b=Math.floor(f/i)!==s;if(b?h.dataset.ncOffPage="":delete h.dataset.ncOffPage,b&&!l){let v=u instanceof HTMLElement?ye.get(u):void 0;mu(h,Vr(v,h.dataset.ncId))}});let d=Ru(e,n),c=d.querySelector('[data-nc-fx-page="prev"]'),p=d.querySelector('[data-nc-fx-page="next"]');c.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===r-1?"true":"false");let m=d.querySelector("[data-nc-fx-page-count]"),g=`${s+1} / ${r}`;m.textContent!==g&&(m.textContent=g);let w=d.querySelector("[data-nc-fx-page-live]"),y=`Effects page ${s+1} of ${r}`;w.textContent!==y&&(w.textContent=y)}function yi(e){return e.replace(/["\\]/g,"\\$&")}function Ou(e,t=Za){tr();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Xr(ta(),t).has(e.id),i=document.createElement("header");i.className="nc-module-hd",i.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="";let d=or({labelledBy:r.id,onChange:b=>(ye.get(n)??e).onToggle?.(b)});d.el.dataset.ncModuleSwitch="",s.append(d.el,l,u);let c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",i.append(r,c,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let m=document.createElement("button");m.type="button",m.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",m.append(g);let w=document.createElement("i");w.className="nc-token-probe",w.dataset.ncProbe="",n.append(w,i,p,m),n.setAttribute("aria-labelledby",r.id);let y=b=>{let v=ye.get(n)??e;n.dataset.ncOpen=b?"false":"true",p.hidden=b,m.hidden=!b,l.textContent=b?"+":"−",l.setAttribute("aria-expanded",b?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${b?"Show":"Hide"} ${v.title}`),l.title=b?"Show":"Hide",b?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let b=n.dataset.ncOpen==="true";gi(ta(),(ye.get(n)??e).id,b,t),y(b),Ta(n.parentElement)}),m.addEventListener("click",()=>{gi(ta(),(ye.get(n)??e).id,!1,t),y(!1),Ta(n.parentElement)});let h={pages:new Map,redraw:()=>f.redraw()},f={el:n,update(b){ye.set(n,b),b.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=b.title,c.textContent=b.status??"",b.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),g.textContent=b.summary??b.title,d.el.hidden=b.on===void 0,d.set(b.on===!0),b.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,m.setAttribute("aria-label",`Show ${b.title}`),qu(p,b,h),y(p.hidden),f.redraw()},redraw(){let b=ye.get(n);b&&yu(n,eo(b))}};return ye.set(n,e),y(a),f.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>f.redraw()).observe(n),Ji(()=>f.redraw(),n.ownerDocument),f}function Iu(e,t,n="adjacent"){tr(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((i,r)=>{let s=r%4+1;i.el.dataset.ncShade=String(s),i.el.dataset.ncPlace=a;let l=i.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(i.el),i.redraw()}),Ta(e)}function Ta(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=t.some(r=>r.hasAttribute("data-nc-lead")),a=t.map(r=>r.hasAttribute("data-nc-slim")?o("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let i=t.filter(r=>!r.hasAttribute("data-nc-slim"));n&&t.length===4&&i.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const ke=16,le=16,ut=10,es=["1","2","3","4","5","6","7","8","9","0"],ts=[0,2,4,8,16],Hu=[0,1,2,4,8],Ca=["always","1:2","2:2","1:3","2:3","3:3","1:4","2:4","3:4","4:4","1:5","2:5","3:5","4:5","5:5","1:6","2:6","3:6","4:6","5:6","6:6","1:7","2:7","3:7","4:7","5:7","6:7","7:7","1:8","2:8","3:8","4:8","5:8","6:8","7:8","8:8","fill","!fill","pre","!pre"],xn={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}};function Ie(e){return{name:`Pad ${e+1}`,sample:null,mode:"oneshot",dir:"fwd",start:0,end:1,slices:0,cuts:[],tune:0,fine:0,fit:0,keepPitch:!0,attack:0,decay:4,cutoff:0,resonance:0,level:.8,pan:0,choke:0}}function Dn(){return{on:!1,accent:!1,velocity:.8,chance:1,slice:null,pitch:0,reverse:!1,cond:"always"}}function qn(){return{length:le,mute:!1,solo:!1,steps:Array.from({length:le},Dn)}}function ns(){return{filter:{on:!0,mode:"lp",cutoff:1,resonance:.15},drive:structuredClone(xn.drive),compressor:structuredClone(xn.compressor)}}function La(){return{v:1,pads:Array.from({length:ke},(e,t)=>Ie(t)),lanes:Array.from({length:ke},qn),swing:.5,hacks:ns(),slots:Array.from({length:ut},()=>null),active:null,selected:0,master:1}}const $e=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{},Z=(e,t,n,a)=>typeof e=="number"&&Number.isFinite(e)?Math.min(n,Math.max(t,e)):a,De=(e,t,n,a)=>Math.round(Z(e,t,n,a)),qe=(e,t)=>typeof e=="boolean"?e:t,kn=(e,t,n)=>t.includes(e)?e:n,ju=/^[0-9a-f]{16,64}$/;function _u(e,t){const n=$e(e),a=Ie(t);let i=Z(n.start,0,1,0),r=Z(n.end,0,1,1);r-i<.001&&([i,r]=[0,1]);const s=ts.includes(n.slices)?n.slices:0,l=typeof n.cuts=="string"&&n.cuts.length<=os?n.cuts.split(" ").map(Number):n.cuts,u=Array.isArray(l)?l.filter(d=>typeof d=="number"&&d>0&&d<1).sort((d,c)=>d-c).slice(0,15):[];return{name:typeof n.name=="string"&&n.name.trim()?n.name.trim().slice(0,24):a.name,sample:typeof n.sample=="string"&&ju.test(n.sample)?n.sample:null,mode:kn(n.mode,["oneshot","gate","loop"],a.mode),dir:kn(n.dir,["fwd","rev","pingpong"],a.dir),start:i,end:r,slices:s,cuts:s?u:[],tune:De(n.tune,-24,24,0),fine:De(n.fine,-100,100,0),fit:Hu.includes(n.fit)?n.fit:0,keepPitch:qe(n.keepPitch,!0),attack:Z(n.attack,0,.1,a.attack),decay:Z(n.decay,.01,4,a.decay),cutoff:Z(n.cutoff,-1,1,0),resonance:Z(n.resonance,0,1,0),level:Z(n.level,0,1,a.level),pan:Z(n.pan,-1,1,0),choke:De(n.choke,0,4,0)}}function Wu(e){const t=$e(e);return{on:qe(t.on,!1),accent:qe(t.accent,!1),velocity:Z(t.velocity,0,1,.8),chance:Z(t.chance,0,1,1),slice:t.slice===null||t.slice===void 0?null:De(t.slice,0,15,0),pitch:De(t.pitch,-12,12,0),reverse:qe(t.reverse,!1),cond:kn(t.cond,Ca,"always")}}function Uu(e){const t=$e(e),n=Array.isArray(t.steps)?t.steps:typeof t.steps=="string"?Zu(t.steps):[];return{length:De(t.length,1,le,le),mute:qe(t.mute,!1),solo:qe(t.solo,!1),steps:Array.from({length:le},(a,i)=>Wu(n[i]))}}function wi(e,t){const n=$e(e),a={...t.dials};for(const[i,r]of Object.entries($e(n.dials)))i in t.dials&&typeof r=="number"&&Number.isFinite(r)&&(a[i]=r);return{on:qe(n.on,t.on),dials:a}}function Gu(e){const t=$e(e),n=$e(t.filter),a=ns();return{filter:{on:qe(n.on,a.filter.on),mode:kn(n.mode,["lp","hp","bp"],a.filter.mode),cutoff:Z(n.cutoff,0,1,a.filter.cutoff),resonance:Z(n.resonance,0,1,a.filter.resonance)},drive:wi(t.drive,xn.drive),compressor:wi(t.compressor,xn.compressor)}}function $n(e){const t=$e(e),n=Array.isArray(t.pads)?t.pads:[],a=Array.isArray(t.lanes)?t.lanes:[];return{pads:Array.from({length:ke},(i,r)=>_u(n[r],r)),lanes:Array.from({length:ke},(i,r)=>Uu(a[r])),swing:Z(t.swing,.5,.75,.5),hacks:Gu(t.hacks)}}function as(e){const t=$e(e);if(t.v!==1)return La();const n=Array.isArray(t.slots)?t.slots:[],a=$n(t),i=Array.from({length:ut},(s,l)=>n[l]?$n(n[l]):null),r=t.active===null?null:De(t.active,0,ut-1,-1);return{v:1,...a,slots:i,active:r!==null&&r>=0&&i[r]?r:null,selected:De(t.selected,0,ke-1,0),master:Z(t.master,0,1,1)}}function Yu(e,t){return structuredClone({index:t,pad:e.pads[t]??Ie(t),lane:e.lanes[t]??qn()})}function Ku(e,t){const n=structuredClone(t);e.pads[n.index]=n.pad,e.lanes[n.index]=n.lane}const Ot=8;function Xu(e,t,n,a=0){const i=e.pads[t],r=e.lanes[t];if(!i||!r)return;i.mode="oneshot",i.dir="fwd",i.decay=4,i.attack=0,i.fit=n,i.keepPitch=!0,i.slices=0,i.cuts=[],r.length=le;for(const l of r.steps)Object.assign(l,Dn());const s=r.steps[0];n<=Ot&&s&&(s.on=!0,s.cond=n===1?"always":`${a%n+1}:${n}`)}function Vu(e,t=ke){if(typeof e!="string"||!/^\d{1,3}$/.test(e))return-1;const n=Number(e)-1;return n>=0&&n<t?n:-1}function to(e){return structuredClone({pads:e.pads,lanes:e.lanes,swing:e.swing,hacks:e.hacks})}const os=4096;function Qu(e){const t=Dn(),n=e.map(a=>{let i="";return a.on!==t.on&&(i+="x"),a.accent!==t.accent&&(i+="a"),a.reverse!==t.reverse&&(i+="r"),a.velocity!==t.velocity&&(i+=`v${a.velocity}`),a.chance!==t.chance&&(i+=`c${a.chance}`),a.slice!==t.slice&&a.slice!==null&&(i+=`s${a.slice}`),a.pitch!==t.pitch&&(i+=`p${a.pitch}`),a.cond!==t.cond&&(i+=`k${a.cond}`),i||"-"});for(;n.at(-1)==="-";)n.pop();return n.join(" ")}const Ju="-?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[+-]?\\d+)?",vi=new RegExp(`[xar]|[vcsp]${Ju}|k\\S+$`,"gy");function Zu(e){return e.length>os?[]:e.split(" ").slice(0,le).map(t=>{const n={};if(t==="-"||t==="")return n;vi.lastIndex=0;let a=0;for(const i of t.matchAll(vi)){const r=i[0];a+=r.length;const s=r.slice(1);r==="x"?n.on=!0:r==="a"?n.accent=!0:r==="r"?n.reverse=!0:r[0]==="v"?n.velocity=Number(s):r[0]==="c"?n.chance=Number(s):r[0]==="s"?n.slice=Number(s):r[0]==="p"?n.pitch=Number(s):r[0]==="k"&&(n.cond=s)}return a===t.length?n:{}})}function ep(e){const t=e.pads.map((a,i)=>{const r=Ie(i),s={};for(const[l,u]of Object.entries(a))l==="cuts"?a.cuts.length&&(s.cuts=a.cuts.join(" ")):r[l]!==u&&(s[l]=u);return s}),n=e.lanes.map(a=>({...a.length!==le?{length:a.length}:{},...a.mute?{mute:!0}:{},...a.solo?{solo:!0}:{},steps:Qu(a.steps)}));return structuredClone({pads:t,lanes:n,swing:e.swing,hacks:e.hacks})}function It(e){const t=new Set;for(const n of[e,...e.slots])for(const a of n?.pads??[])a.sample&&t.add(a.sample);return t}function is(){try{return globalThis.localStorage??null}catch{return null}}function tp(e,t=is()){try{const n=t?.getItem(e);return n?as(JSON.parse(n)):La()}catch{return La()}}function np(e,t,n=is()){try{return n?.setItem(e,JSON.stringify(t)),!!n}catch{return!1}}const ge=e=>`${Math.round(e*100)}%`,_e=e=>e<1?`${Math.round(e*1e3)} ms`:`${e.toFixed(2)} s`,Fa=e=>e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`,Ht=(e,t="")=>`${e>0?"+":""}${e}${t}`,ap=e=>`×${Number(e.toFixed(2))}`;function dn(e){return Math.abs(e)<.001?"open":e<0?`LP ${Fa(2e4*(60/2e4)**-e)}`:`HP ${Fa(20*(8e3/20)**e)}`}const un=e=>e>=3.99?"Hold":_e(e);function op(e){const t=Ie(0),n=[];return e.tune!==t.tune&&n.push(Ht(e.tune," st")),e.fine!==t.fine&&n.push(Ht(e.fine," ct")),e.fit!==t.fit&&n.push(`fit ${e.fit} bar${e.fit===1?"":"s"}`),e.fit&&e.keepPitch!==t.keepPitch&&n.push("varispeed"),Math.abs(e.attack-t.attack)>=5e-4&&n.push(`attack ${_e(e.attack)}`),un(e.decay)!==un(t.decay)&&n.push(`decay ${un(e.decay)}`),dn(e.cutoff)!==dn(t.cutoff)&&n.push(`filter ${dn(e.cutoff)}`),ge(e.resonance)!==ge(t.resonance)&&n.push(`res ${ge(e.resonance)}`),n.join(" · ")}function rs(e){const t=Math.max(0,Math.min(1,e));return Math.min(2e4,40*2**(t*10))}const nn=e=>Math.max(0,Math.min(100,e));function no(e){const t=rs(e.cutoff),n=nn(Math.max(0,Math.min(1,e.resonance))*100);return e.mode==="hp"?{type:"highpass",dials:{cutoff:t<=20?0:nn(100*Math.log(t/20)/Math.log(100)),q:n}}:e.mode==="bp"?{type:"bandpass",dials:{centre_hz:nn(100*Math.log(Math.max(100,t)/100)/Math.log(80)),q:n,mix:100}}:{type:"lowpass",dials:{cutoff:e.cutoff>=.999?0:nn(100*Math.log(t/2e4)/Math.log(150/2e4))}}}function ip(e){const{type:t,dials:n}=no(e);if(t==="highpass"){const i=n.cutoff??0;return{hz:20*100**(i/100),q:Math.SQRT1_2*(8/Math.SQRT1_2)**((n.q??0)/100),open:i<=0}}if(t==="bandpass")return{hz:100*80**((n.centre_hz??0)/100),q:.4*20**((n.q??0)/100),open:!1};const a=n.cutoff??0;return{hz:2e4*(150/2e4)**(a/100),q:Math.SQRT1_2,open:a<=0}}const ss=e=>!e.on||e.mode==="lp"&&e.cutoff>=.999;function za(e){const t=no(e.filter);return{v:2,chain:[{id:`${t.type}-1`,type:t.type,bypass:ss(e.filter),dials:t.dials},{id:"drive-1",type:"drive",bypass:!e.drive.on,dials:{...e.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!e.compressor.on,dials:{...e.compressor.dials}}]}}function rp(e,t){if(!e||e.chain.length!==t.chain.length)return{whole:!0};if(e.chain.some((a,i)=>a.type!==t.chain[i]?.type))return{whole:!0};const n=[];return t.chain.forEach((a,i)=>{const r=e.chain[i];if(r){r.bypass!==a.bypass&&n.push([a.id,"bypass",a.bypass]);for(const[s,l]of Object.entries(a.dials))r.dials[s]!==l&&n.push([a.id,s,l])}}),{whole:!1,params:n}}const xi={"page:title":"NYX, the NetComposer sampler. The number is which copy of NYX this is.","page:master":"The volume of everything NYX plays, after the Hacks.","page:save":"Downloads the pattern as a file: pads, steps, Hacks and the ten slots. The samples stay in this browser.","page:load":"Opens a saved pattern file (with its slots, if it has them), or puts an audio file onto the selected pad.","page:panic":"Silences every voice and effect tail at once. NYX then sits out until you press Play.","module:transport":"Play and stop NYX, set the tempo and swing, and keep up to ten saved versions of the whole kit and pattern.","module:pattern":"The 16-step grid, one lane per pad: a step that is on plays that lane's pad. The pads under the grid are the sounds.","module:params":"Everything about the selected pad: which part of the sample plays, its pitch, shape, filter and level. A selected step's locks show here too.","module:hacks":"Effects on everything NYX plays, in order: Filter, then Drive, then Compressor. They are saved with the pattern and its slots.","section:pads":"The 16 sounds: Q W E R A S D F play 1–8, Shift 9–16. Tap to play, double-click a name to rename; long-press or right-click to load or clear; drag to swap.",play:"Starts and stops NYX. In the Studio, Stop sits NYX out while the others play on, and Play brings it back on the next bar.","perform-label":"Effects you play live: hold a button down and NYX's sound changes until you let go. Nothing is saved.",perform:"Hold one of these down to change NYX's sound until you let go.",tempo:"Beats per minute: how fast the pattern plays. In the Studio every instrument shares this clock.",swing:"Pushes every second sixteenth note later for a looser, shuffled feel. 50% is straight.",status:"What NYX is doing now: stopped, playing, sitting out, or waiting to join on the next bar.","kit:slot":"A memory for the whole kit and pattern. Tap to recall it; Shift-click or long-press to store here, Option-click to clear.","kit:note":"Step tool: a tap on a step turns it on or off.","kit:accent":"Step tool: a tap on a step makes it an accent, played louder. Shift-click accents a step with either tool.","kit:fill":"Hold for a fill: steps set to play Only in Fill come in and Not in Fill steps drop out, until you let go.","kit:clear":"Turns every step off and resets lane lengths, mutes, solos and step locks; the pads keep their sounds. Undo brings it back.","kit:mute":"Mute: silences this lane. Its steps stay as they are.","kit:solo":"Solo: hear only the soloed lanes. Solo several to hear them together.","kit:length":"Drag to set how many steps this lane plays before it starts over. Lanes of different lengths drift against each other.","kit:lane-length":"Tap to set this lane's length, then tap the step it should end on.","kit:pad-key":"The key that plays this pad: lower case (q to f) is the key alone, upper case (Q to F) is Shift with it. A Gate pad holds while its key is down.","kit:choke-badge":"Choke group: pads showing the same letter cut each other off, like an open and a closed hi-hat. Set it under Choke.",wave:"The selected pad's sample: the part between Start and End is what plays, lines mark the slices, and a cursor follows playback.",sample:"How much of the sample plays (between Start and End) out of its full length, and whether it is mono or stereo.",mode:"How the pad plays when hit: right through (One-shot), only as long as its step (Gate), or round and round (Loop).",dir:"Which way the pad plays through its sample: forwards, backwards, or forwards then back.",start:"Where the pad starts playing in the sample. Move it right to skip the beginning.",end:"Where the pad stops playing in the sample. Move it left to cut off the tail.",slices:"Cuts the played part into 2 to 16 pieces; each step plays the next piece in turn. Off plays the whole part every time.",chop:"Where the slices are cut: at equal spacing, or where the hits in the sound start.","tune-shape":"Pitch, speed and shape of the selected pad. Closed, it lists what differs from a new pad; NYX remembers in this browser whether it's open.","transport-more":"On a phone, Swing folds away; the line shows it. Tap to show or hide it.","pad-more":"On a phone, the pad's pan, choke group and Clear pad fold away; the line shows pan and choke. Tap to show or hide them.","hacks-more":"On a phone, Drive and Compressor fold away under the Filter; the line says which are on. Tap to show them.","kit:group-toggle":"Opens or closes this section.","pitch-label":"How high or low the pad plays. Pitch changes speed too, like a record, unless Fit's Keep pitch is on.",tune:"Pitch in semitones, up to two octaves either way. Higher also plays faster, unless the pad is fitted with Keep pitch on.",fine:"Fine pitch in cents (hundredths of a semitone), for small corrections.",fit:"Makes the pad last exactly this many bars at the current tempo, and keeps it in time when the tempo changes. Off plays it as recorded.","keep-pitch":"On, Fit stretches the pad to its bars without changing its pitch, and Tune moves the pitch only. Off, it speeds up or slows down like a record.","fit-speed":"How fast the pad plays to fit its bars: ×1 is as recorded. With Keep pitch, stretching far past ×0.75 to ×1.5 may smear the sound.","shape-label":"How each hit's volume moves over time: how it fades in and how it dies away.",attack:"How long each hit takes to fade in. Zero is instant; more softens the start.",decay:"How quickly each hit fades away (in Gate, once its step ends). All the way up is Hold: no fade.",cutoff:"Left of centre cuts the highs (darker), right of centre cuts the lows (thinner). Centre leaves the pad open.",resonance:"Boosts the sound right at the filter's edge for a sharper, ringing tone. It does nothing while the filter is open.","out-label":"Where the pad sits in the mix: how loud, how far left or right, and which pads cut it off.",level:"How loud this pad plays.",pan:"Places the pad left or right in the stereo picture. C is the centre.",choke:"Pads in the same group cut each other off when one plays, like open and closed hi-hats. None lets it ring over the others.","clear-pad":"Removes this pad's sample and settings. Its steps in the grid stay.","lock-label":"Locks for this one step: settings here change only this step, not the whole pad. Long-press another step to edit it.","lock-velocity":"How loud this step plays, before any accent.","lock-chance":"The odds this step plays each time round. At 100% it always plays; lower leaves it out at random.","lock-slice":"Which slice this step plays. In order plays the slice that matches the step's place, so a chopped beat plays back as it was.","lock-pitch":"Moves this step up or down in semitones, on top of the pad's own Tune.","lock-cond":"When this step plays: always, only on some passes through the lane, only with Fill held or not, or only if the lane's last conditional step did or didn't.","lock-reverse":"Whether this step plays the pad's own way or the other way round.","lock-done":"Closes this step's locks and goes back to the pad's settings.","grab-label":"Brings sound from the Studio onto the selected pad: Grab the bars that just played, or Take a performance as it happens.","grab-from":"Which Studio sound to grab or take from: the master mix or one instrument's channel.","grab-bars":"How many bars Grab takes. One bar is cut into 16 slices with every step on; longer grabs are sliced at the hits.",grab:"Copies the bars that just played onto the selected pad, cut on the bar lines (the music must be playing). It asks before replacing a pad that has a sound.","grab-undo":"Puts the pad and its lane back as they were before this Grab, Take or take sent from LUCY: its old sound, slices and steps. Cmd/Ctrl+Z does the same.",take:"Records the chosen source onto the selected pad in whole bars until you press again (up to four minutes); takes of up to 8 bars loop. It asks first if the pad has a sound.","hack-filter":"A filter on all of NYX, to darken it, thin it or narrow it down. The switch turns it on.","filter-mode":"Which part the filter keeps: the lows (low pass), the highs (high pass) or a band in the middle (band pass).","filter-cutoff":"Where the filter cuts. In low pass, all the way up is open: no filtering.","filter-resonance":"Boosts the sound around the cutoff for a sharper, more nasal tone.","filter-curve":"A picture of the filter: how loud each pitch range comes out, lows on the left, highs on the right.","hack-meter":"The level going into this Hack (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. Off, it still shows the input, greyed.","hack-drive":"Distortion on all of NYX, from warm to gritty. The switch turns it on.","hack-drive-drive_db":"How hard the sound is pushed into distortion. 0 dB is clean.","hack-drive-output_db":"The level after the drive, to balance out the louder distorted sound.","hack-drive-mix":"How much of the driven sound is mixed with the clean one. 100% is all drive.","hack-drive-curve":"The kind of distortion: Smooth is warm and round, Acid is harder and buzzier.","hack-drive-tone":"Darkens the driven sound by cutting its highs. All the way up leaves it bright.","hack-compressor":"Evens out NYX's level: loud hits are turned down, so the whole sounds tighter and punchier. The switch turns it on.","hack-compressor-threshold_db":"The level above which the compressor starts turning the sound down. Lower catches more.","hack-compressor-ratio":"How strongly sound above the threshold is turned down. Higher is a firmer squeeze.","hack-compressor-attack_ms":"How fast the compressor reacts to a loud hit. Slower lets the start of each hit punch through.","hack-compressor-release_ms":"How fast the compressor lets go once the sound drops back below the threshold.","hack-compressor-makeup_db":"Turns the whole sound back up after compressing, to make up for the lost level.","kit:more":"More settings for this effect."},sp={perform:{repeat16:"While held, repeats the last sixteenth note over and over, like a stutter.",repeat8:"While held, repeats the last eighth note over and over.",reverse:"While held, plays what NYX just played backwards.",half:"While held, plays on at half speed, an octave lower.",stop:"While held, slows to a halt like a tape machine switched off."},mode:{oneshot:"One-shot: plays on from the hit until it ends or the lane's next hit cuts it. Good for drums.",gate:"Gate: plays only as long as its step (or its key is held), then fades by Decay. Good for chopping long sounds.",loop:"Loop: plays round and round until the pad plays again or the music stops."},dir:{fwd:"Plays the sample the normal way, start to end.",rev:"Plays the sample backwards, end to start.",pingpong:"Plays forwards, then back again. In Loop it keeps bouncing."},"keep-pitch":{on:"Keep pitch: the pad is stretched to its bars and stays at its pitch, whatever the tempo. Tune moves the pitch only.",off:"Varispeed: the pad speeds up or slows down to fit its bars, and its pitch moves with it, like a record."},chop:{even:"Cuts the slices at equal spacing.",transients:"Cuts the slices where the hits in the sound start, so each slice is one hit."},"lock-reverse":{pad:"This step plays in the pad's own direction.",rev:"This step plays the other way round from the pad."}};function j(e){return Object.hasOwn(xi,e)?xi[e]:void 0}function lp(e,t){const n=sp[e];return(n&&Object.hasOwn(n,t)?n[t]:void 0)??j(e)}const pn="nyx-help-text",ki=new Map;function cp(e,t){const n=ki.get(t);if(n&&e.getElementById(n))return n;let a=e.getElementById(pn);a||(a=e.createElement("div"),a.id=pn,a.hidden=!0,e.body.append(a));const i=e.createElement("span");return i.id=`${pn}-${a.children.length+1}`,i.textContent=t,a.append(i),ki.set(t,i.id),i.id}function X(e,t,n){if(!e||!t||(e.getAttribute("data-nc-help")!==t&&e.setAttribute("data-nc-help",t),e.hasAttribute("title")&&e.removeAttribute("title"),!n))return;const a=cp(n.ownerDocument,t),i=(n.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);if(i.includes(a))return;const r=[...i.filter(s=>!s.startsWith(`${pn}-`)),a];n.setAttribute("aria-describedby",r.join(" "))}function dp(e){const t=j(e);return t?{"data-nc-help":t}:{}}const up=[['.nc-seg [role="radio"]:not([data-nc-accent-mode])',"kit:note"],['.nc-seg [role="radio"][data-nc-accent-mode]',"kit:accent"],["[data-nc-fill]:not([data-nc-clear])","kit:fill"],["[data-nc-clear]","kit:clear"],['.nc-ms[data-nc-ms="mute"]',"kit:mute"],['.nc-ms[data-nc-ms="solo"]',"kit:solo"],[".nc-len-handle","kit:length"],["[data-nc-len-toggle]","kit:lane-length"],["[data-nc-pads-play]","play"],[".nc-snap","kit:slot"]];function ao(e){for(const t of e.querySelectorAll(".nc-module[data-nc-module]"))X(t.querySelector(".nc-module-hd .nc-title"),j(`module:${t.dataset.ncModule}`));for(const t of e.querySelectorAll("[data-nc-section]"))X(t.querySelector(":scope > .nc-ui-fx-name, :scope > .nc-panel-hd > .nc-panel-title"),j(`section:${t.dataset.ncSection}`));for(const t of e.querySelectorAll("[data-nc-id]")){const n=t.dataset.ncId??"";if(!t.matches("input, select, canvas"))if(t.classList.contains("nc-field")){const a=t.querySelector(":scope > input, :scope > select, :scope > canvas");X(t.querySelector(":scope > .nc-label"),j(n),a)}else if(t.classList.contains("nc-choice-row"))for(const a of t.querySelectorAll("[data-nc-choice]"))X(a,lp(n,a.dataset.ncChoice??""),a);else t.classList.contains("nc-btn")?X(t,j(n),t):t.matches(".nc-label[data-nc-text]")?X(t,j(n)):t.classList.contains("nc-ui-fx")&&(X(t.querySelector(":scope > .nc-ui-fx-hd > .nc-ui-fx-name, :scope > .nc-ui-fx-name"),j(n),t.querySelector("[data-nc-fx-switch]")),X(t.querySelector(":scope > .nc-ui-more > summary"),j("kit:more")))}for(const[t,n]of up)for(const a of e.querySelectorAll(t)){const i=a.parentElement?.querySelector(":scope > .nc-hit")?a.parentElement:null;i&&a.removeAttribute("title"),X(i??a,j(n),a)}for(const t of e.querySelectorAll(".nc-group[data-nc-id]")){const n=t.querySelector(":scope > .nc-group-toggle");X(n?.querySelector(".nc-group-title")??null,j(t.dataset.ncId??""),n),X(n?.querySelector(".nc-group-mark")??null,j("kit:group-toggle"))}for(const t of e.querySelectorAll(".nc-padgrid-pad-badge"))t.textContent?X(t,j("kit:choke-badge")):t.removeAttribute("data-nc-help")}const Dt=["KeyQ","KeyW","KeyE","KeyR","KeyA","KeyS","KeyD","KeyF"],pp=Array.from({length:ke},(e,t)=>{const n=(Dt[t%Dt.length]??"").slice(3);return t<Dt.length?n.toLowerCase():n.toUpperCase()});function ls(e){const t=Dt.indexOf(e.code);if(t<0)return-1;const n=e.shiftKey?t+Dt.length:t;return n<ke?n:-1}class hp{down=new Map;press(t){if(this.down.has(t.code))return-1;const n=ls(t);return n>=0&&this.down.set(t.code,n),n}release(t){const n=this.down.get(t.code);return n===void 0?-1:(this.down.delete(t.code),n)}releaseAll(){const t=[...this.down.values()];return this.down.clear(),t}}const mp=.25;function oo(e){return e.slices?e.cuts.length===e.slices-1?[0,...e.cuts,1]:Array.from({length:e.slices+1},(t,n)=>n/e.slices):[0,1]}function cs(e,t,n){const a=e.start*t.frames,i=e.end*t.frames;if(n===null||!e.slices)return[Math.floor(a),Math.ceil(i)];const r=oo(e),s=Math.min(n,r.length-2);return[Math.floor(a+r[s]*(i-a)),Math.ceil(a+r[s+1]*(i-a))]}function fp(e,t,n,a=0){let r=2**((e.tune+e.fine/100+a)/12);if(e.fit){const s=(e.end-e.start)*t.frames/t.sampleRate,l=e.fit*4*(60/n);s>0&&l>0&&(r*=s/l)}return r}function ds(e,t,n){return Math.max(1,Math.round(e*4*60/Math.max(1,t)*n))}function us(e,t,n){if(!e.fit)return 1;const a=(e.end-e.start)*t.frames/t.sampleRate;return a>0?a/(e.fit*4*(60/Math.max(1,n))):1}const $i=[.75,1.5];function gp(e,t,n){if(n===null||!e.slices)return[0,t];const a=oo(e),i=Math.min(n,a.length-2);return[Math.floor((a[i]??0)*t),Math.ceil((a[i+1]??1)*t)]}const bp=1.5;function io(e,t,n,a,i,r=!1,s){if(!n.on||!e.sample||!a)return null;const l=n.slice??(e.slices?t%e.slices:null),u=g=>s?gp(e,s.frames,g):cs(e,a,g);let[d,c]=u(l);const p=n.reverse?e.dir==="rev"?"fwd":"rev":e.dir;if(e.mode==="oneshot"&&l!==null&&e.slices&&!r){const[g,w]=u(null);p==="fwd"?c=w:p==="rev"&&(d=g)}const m=s?2**(n.pitch/12)*(s.frames/ds(e.fit,i,a.sampleRate)):fp(e,a,i,n.pitch);return{sample:s?s.sample:e.sample,from:d,to:c,rate:m,gain:Math.min(1.5,n.velocity*(n.accent?bp:1))*e.level,pan:e.pan,mode:e.mode,dir:p,attack:e.attack,decay:e.decay,cutoff:e.cutoff,resonance:e.resonance,choke:e.choke,chance:n.chance,cond:n.cond,fit:e.fit>0}}function yp(e,t,n,a=null,i){return io(e,0,{on:!0,accent:!1,velocity:.8,chance:1,slice:a,pitch:0,reverse:!1,cond:"always"},t,n,!0,i)}function wp(e,t,n,a=()=>{}){const i=e.lanes.some(r=>r.solo);return{swing:e.swing,lanes:e.lanes.map((r,s)=>{const l=e.pads[s],u=l?.sample?t(l.sample):void 0,d=l?a(s):void 0;return{length:r.length,audible:i?r.solo:!r.mute,steps:r.steps.map((c,p)=>l?io(l,p,c,u,n,!1,d):null)}})}}const vp="/nyx/assets/sampler-processor-BdlrJ3MQ.js",ps=827873614,xp=60;async function kp(e,t){const n=new Float64Array([t,e.length,e[0]?.length??0]),a=[new Uint8Array(n.buffer),...e.map(u=>new Uint8Array(u.buffer))],i=a.reduce((u,d)=>u+d.byteLength,0),r=new Uint8Array(i);let s=0;for(const u of a)r.set(u,s),s+=u.byteLength;const l=new Uint8Array(await crypto.subtle.digest("SHA-256",r));return Array.from(l.subarray(0,16),u=>u.toString(16).padStart(2,"0")).join("")}function $p(e){const t=e.data[0]?.length??0,n=new Uint8Array(16+t*4*e.data.length);return new Uint32Array(n.buffer,0,4).set([ps,e.sampleRate,e.data.length,t]),e.data.forEach((a,i)=>{n.set(new Uint8Array(a.buffer,a.byteOffset,t*4),16+i*t*4)}),n}function Ep(e,t){if(t.byteLength<16)return null;const[n,a,i,r]=new Uint32Array(t,0,4);if(n!==ps||!i||i>2||t.byteLength!==16+r*4*i)return null;const s=Array.from({length:i},(l,u)=>new Float32Array(t.slice(16+u*r*4,16+(u+1)*r*4)));return{hash:e,data:s,sampleRate:a,channels:i,frames:r}}class Ap{constructor(t="nyx"){this.folderName=t}memory=new Map;dir=null;folder(){return this.dir??=(async()=>{try{const t=await navigator.storage?.getDirectory?.();return t?await t.getDirectoryHandle(this.folderName,{create:!0}):null}catch{return null}})(),this.dir}info(t){return this.memory.get(t)}held(t){return this.memory.get(t)}async put(t,n){const a=await kp(t,n),i={hash:a,data:t,sampleRate:n,channels:t.length,frames:t[0]?.length??0};this.memory.set(a,i);const r=await this.folder();if(!r)return{sample:i,saved:!1};try{const l=await(await r.getFileHandle(`${a}.f32`,{create:!0})).createWritable?.();return l?(await l.write($p(i)),await l.close(),{sample:i,saved:!0}):{sample:i,saved:!1}}catch{return{sample:i,saved:!1}}}async get(t){const n=this.memory.get(t);if(n)return n;const a=await this.folder();if(!a)return null;try{const i=await(await a.getFileHandle(`${t}.f32`)).getFile(),r=Ep(t,await i.arrayBuffer());return r&&this.memory.set(t,r),r}catch{return null}}async prune(t){for(const a of[...this.memory.keys()])t.has(a)||this.memory.delete(a);const n=await this.folder();if(n)try{const a=[];for await(const i of n.keys())a.push(i);for(const i of a){const r=i.replace(/\.f32$/,"");i.endsWith(".f32")&&!t.has(r)&&await n.removeEntry(i)}}catch{}}}function Sp(e){const t=Math.min(e.length,Math.round(xp*e.sampleRate));return{data:Array.from({length:Math.min(2,e.numberOfChannels)},(a,i)=>{const r=new Float32Array(t);return r.set(e.getChannelData(i).subarray(0,t)),r}),trimmed:t<e.length}}function hs(e,t=200){const n=e[0]?.length??0,a=[];if(!n)return a;const i=n/t;for(let r=0;r<t;r++){const s=Math.floor(r*i),l=Math.max(s+1,Math.floor((r+1)*i));let u=0,d=0;const c=Math.max(1,Math.floor((l-s)/256));for(let p=s;p<l&&p<n;p+=c){let m=0;for(const g of e)m+=g[p]??0;m/=e.length,m<u&&(u=m),m>d&&(d=m)}a.push(Math.max(-1,u),Math.min(1,d))}return a}function Mp(e,t,n,a,i){const r=a-n;if(i<2||r<64)return[];const s=Math.max(32,Math.round(t*.01)),l=[];for(let g=n;g<a;g+=s){let w=0;for(const y of e)for(let h=g;h<Math.min(a,g+s);h++)w+=(y[h]??0)*(y[h]??0);l.push(Math.log10(w/s+1e-9))}const u=l.map((g,w)=>{const y=l.slice(Math.max(0,w-4),w),h=y.length?y.reduce((f,b)=>f+b,0)/y.length:g;return Math.max(0,g-h)}),d=Math.max(1,Math.floor(l.length/i/8)),c=u.map((g,w)=>({f:g,i:w})).filter(g=>g.i>0&&g.f>.3).sort((g,w)=>w.f-g.f),p=[];for(const g of c){if(p.length>=i-1)break;p.every(w=>Math.abs(w-g.i)>=d)&&p.push(g.i)}const m=p.map(g=>g*s/r).filter(g=>g>.001&&g<.999);for(let g=1;m.length<i-1&&g<i;g++){const w=g/i;m.every(y=>Math.abs(y-w)>.5/i)&&m.push(w)}for(let g=1;m.length<i-1;g++)m.push(g/(i+1));return m.sort((g,w)=>g-w).slice(0,i-1)}function ms(e=Cp()){try{const t=JSON.parse(e?.getItem("lucy.state")??"null");return Array.isArray(t?.takes)?t.takes.flatMap(n=>{const a=n&&typeof n=="object"?n:{},i=r=>typeof a[r]=="number"&&Number.isFinite(a[r])?a[r]:0;return a.saved!==!0||!i("id")||!i("frames")||!i("sampleRate")?[]:[{id:i("id"),bars:i("bars"),bpm:i("bpm"),sampleRate:i("sampleRate"),channels:Math.min(2,Math.max(1,i("channels"))),frames:i("frames")}]}):[]}catch{return[]}}async function Tp(e){try{const t=await navigator.storage?.getDirectory?.();if(!t)return null;const a=await(await(await t.getDirectoryHandle("lucy")).getFileHandle(`lucy-take-${e.id}.f32`)).getFile(),i=new Float32Array(await a.arrayBuffer());return i.length<e.frames*e.channels?null:Array.from({length:e.channels},(r,s)=>i.slice(s*e.frames,(s+1)*e.frames))}catch{return null}}function Cp(){try{return globalThis.localStorage??null}catch{return null}}const Lp=150,fs=96*1024*1024,Fp=e=>Math.round(e*10)/10;function zp(e,t,n){if(!e.sample||!e.fit||!e.keepPitch||!t)return null;const[a,i]=cs(e,t,null);if(i-a<2)return null;const r=Fp(n);return{sample:e.sample,from:a,to:i,bars:e.fit,bpm:r,semitones:e.tune+e.fine/100,sampleRate:t.sampleRate,frames:ds(e.fit,r,t.sampleRate)}}function tt(e){return`${e.sample}:${e.from}-${e.to}:${e.bars}:${e.bpm.toFixed(1)}:${Math.round(e.semitones*100)}`}const Np=e=>`stretch:${e}`,Pp=e=>e.startsWith("stretch:");class Dp{constructor(t=fs,n=()=>{}){this.maxBytes=t,this.drop=n}map=new Map;bytes=0;get size(){return this.map.size}has(t){return this.map.has(t)}get(t){const n=this.map.get(t);return n&&(this.map.delete(t),this.map.set(t,n)),n}byId(t){for(const n of this.map.values())if(n.sample===t)return n}put(t,n=new Set){const a=this.map.get(t.key);a&&(this.bytes-=a.bytes),this.map.delete(t.key),this.map.set(t.key,t),this.bytes+=t.bytes;for(const[i,r]of this.map){if(this.bytes<=this.maxBytes)break;i===t.key||n.has(i)||(this.map.delete(i),this.bytes-=r.bytes,this.drop(r))}}}class qp{constructor(t,n=fs){this.host=t,this.cache=new Dp(n,a=>t.drop(a))}cache;current=new Map;wanted=new Map;inFlight=new Set;timer=null;queue=Promise.resolve();missingSig="";renders=0;lastMs=0;failed=!1;plan(t,n,a){this.wanted.clear();const i=[];t.forEach((u,d)=>{const c=u.sample?n(u.sample):void 0,p=zp(u,c,a),m=this.current.get(d);if(!p){this.current.delete(d);return}this.wanted.set(d,p);const g=tt(p),w=this.cache.get(g);w?this.current.set(d,w):(m&&!Bp(m.job,p)&&this.current.delete(d),this.inFlight.has(g)||i.push(g))});const r=i.join("|");if(!i.length||this.failed){this.missingSig="";return}if(r===this.missingSig&&this.timer!==null)return;this.missingSig=r;const s=this.host.clearTimeout??(u=>clearTimeout(u)),l=this.host.setTimeout??((u,d)=>setTimeout(u,d));this.timer!==null&&s(this.timer),this.timer=l(()=>{this.timer=null,this.missingSig="",this.renderWanted()},Lp)}stretchedFor(t){return this.current.get(t)}renderFor(t){return this.current.get(t)}pending(t){const n=this.wanted.get(t);return n?this.current.get(t)?.key!==tt(n):!1}renderWanted(){for(const t of new Map([...this.wanted.values()].map(n=>[tt(n),n])).values()){const n=tt(t);this.cache.has(n)||this.inFlight.has(n)||(this.inFlight.add(n),this.queue=this.queue.then(()=>this.renderOne(n,t)))}}idle(){return this.queue}async renderOne(t,n){if(![...this.wanted.values()].some(s=>tt(s)===t)){this.inFlight.delete(t);return}const a=Date.now();let i=null;try{i=await this.host.run(n)}catch(s){console.error("NYX stretch",s)}if(this.inFlight.delete(t),!i){this.failed=!0,this.host.changed();return}this.lastMs=Date.now()-a,this.renders++;const r={key:t,job:n,sample:Np(t),frames:n.frames,bytes:i.reduce((s,l)=>s+l.byteLength,0)};this.host.deliver(r,i);for(const[s,l]of this.wanted)tt(l)===t&&this.current.set(s,r);this.cache.put(r,new Set([...this.current.values()].map(s=>s.key))),this.host.changed()}}const Bp=(e,t)=>e.sample===t.sample&&e.from===t.from&&e.to===t.to,Rp=48e3;function gs(e,t){try{const n=e?.latency?.(t);return typeof n=="number"&&Number.isFinite(n)&&n>0&&n<=Rp?Math.round(n):0}catch{return 0}}function Op(e,t){return{from:e.from+t,to:e.to+t}}const Ip="instance",Hp=99;function Bn(e=typeof location>"u"?"":location.search){const t=new URLSearchParams(e).get(Ip)?.trim()??"";if(!/^\d+$/.test(t))return 1;const n=Number(t);return n>=2&&n<=Hp?n:1}function jp(e,t){return t===1?e:`${e}#${t}`}function _p(e,t){return t===1?e:`${e} ${t}`}let nt;function Wp(e,t=Bn()){if(nt!==void 0)return nt;nt=null;try{if(typeof window>"u"||window.parent===window)return nt;const n=window.parent.ncStudio;n&&n.version===1&&(nt=n.attach(e,{instance:t}))}catch{}return nt}function Up(){let e;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(e=a.syncScope)}}catch{}if(!e)return{};const t=`/studio/${e}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${t}`,locks:n?{request:(a,i,r)=>n.request(`${a}${t}`,i,r)}:null}}function Gp(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1&&typeof e.fxWorklet=="string"&&e.fxWorklet?e.fxWorklet:null}catch{return null}}function Re(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.grab?e.grab:null}catch{return null}}function pt(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.play?e.play:null}catch{return null}}function jt(e,t=Bn()){return t>1?`${e}#${t}`:e}function Yp(e,t=Bn()){const n=pt()?.owner()??null;return n===null||n==="studio"||n===jt(e,t)}const ro={knee:.6,ceiling:.944,range:4,points:8193};function Kp(e,{knee:t,ceiling:n}=ro){const a=Math.abs(e);if(a<=t)return e;const i=n-t;return Math.sign(e)*(t+i*Math.tanh((a-t)/i))}function Xp({range:e,points:t}=ro){const n=new Float32Array(t);for(let a=0;a<t;a++)n[a]=Kp((2*a/(t-1)-1)*e);return n}function Vp(e){const t=e.createGain();t.gain.value=1/ro.range;const n=e.createWaveShaper();return n.curve=Xp(),n.oversample="none",t.connect(n),{input:t,output:n}}const Qp="nyx",Jp=1;function bs(e){const t={nyx:1,...to(e)};if(Array.isArray(e.slots)){const n=Array.from({length:ut},(i,r)=>{const s=e.slots?.[r];return s?ep(s):null}),a=typeof e.active=="number"&&n[e.active]?e.active:null;Object.assign(t,{slots:n,active:a})}return t}function ys(e){return ws(e),$n(e)}function Zp(e){ws(e);const t=e;if(!Array.isArray(t.slots))return null;const n=t.slots,a=Array.from({length:ut},(s,l)=>{const u=n[l];return u&&typeof u=="object"&&!Array.isArray(u)?$n(u):null}),i=t.active,r=typeof i=="number"&&Number.isInteger(i)&&i>=0&&i<ut&&a[i]?i:null;return{slots:a,active:r}}function ws(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Not a NYX pattern.");const t=e.nyx;if(t!==1)throw new Error(`Not a NYX pattern${typeof t=="number"?` (version ${t})`:""}.`)}function so(){try{return globalThis.localStorage??null}catch{return null}}function eh(e,t,n=so()){let a;try{a=t?.storageKey?.(e)}catch{a=void 0}if(typeof a!="string"||!a||a===e)return e;try{if(n&&n.getItem(a)===null){const i=n.getItem(e);i!==null&&n.setItem(a,i)}}catch{}return a}const th="nyx.state",vs="nyx.scene-samples",nh=/^[0-9a-f]{16,64}$/;function xs(e){try{const t=JSON.parse(e?.getItem(vs)??"[]");return Array.isArray(t)?t.filter(n=>typeof n=="string"&&nh.test(n)):[]}catch{return[]}}function ah(e,t=so()){if(!t)return;const n=new Set;for(const i of[e,...e.slots??[]])for(const r of i?.pads??[])r.sample&&n.add(r.sample);if(!n.size)return;const a=[...xs(t).filter(i=>!n.has(i)),...n].slice(-2048);try{t.setItem(vs,JSON.stringify(a))}catch{}}function oh(e,t=so()){const n=It(e);if(!t)return n;try{for(let a=0;a<t.length;a++){const i=t.key(a);if(i?.startsWith(th))try{for(const r of It(as(JSON.parse(t.getItem(i)??"null"))))n.add(r)}catch{}}}catch{return null}for(const a of xs(t))n.add(a);return n}const ih="NYX Sampler",ht="nyx",ie=Bn(),ne=Wp(ht,ie),ks=eh(jp("nyx.state",ie),ne),lo=.15,$=tp(ks),ee=new Ap(ie>1?`nyx-${ie}`:"nyx"),Rn=()=>np(ks,$),yt=()=>{const e=oh($);if(e&&ae?.before.pad.sample&&e.add(ae.before.pad.sample),e)for(const t of uo)e.add(t);e&&ee.prune(e)};let oe=!1,Oe=0,se=null,mt=!1,We="",F="";const ft=new Map;let $s=[],Kt=new Map;const Ee=new Zs({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let P=null,qt=null;const rh=new dl({...Up(),app:_p(ih,ie),version:"0.1.0",clock:Ee,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const e=P?.state;return e==="running"?"running":e==="suspended"?"suspended":e?"none":"needs-gesture"},startGate:()=>qt?.whenSettled?.()??null}),_t=e=>e+(qt?.offset??0),D=()=>Ee.transport,gt=()=>D().isPlayingAt(V()),Wt=()=>gt()&&!oe;let na=null,U=null,me=null,En=null,Ei=null;const Ai=new Set;function ue(){return Ei??=(async()=>{ne?(P=ne.ctx,na=ne.output,qt=ne.mapper??new To(ne.ctx)):(P=new AudioContext({latencyHint:"interactive"}),na=P.destination,qt=new To(P)),qt.start();try{await P.audioWorklet.addModule(vp)}catch{return F="Audio could not start (the sampler's worklet did not load). Reload to try again.",C(),!1}U=new AudioWorkletNode(P,"nyx-sampler",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]}),U.port.onmessage=t=>sh(t.data),me=Yl(P,{moduleUrl:Gp()??Vl,bpm:D().bpm,slots:3,state:za($.hacks)}),Na=za($.hacks),En=new GainNode(P,{gain:$.master}),U.connect(me.input);const e=Vp(P);me.output.connect(En).connect(e.input),e.output.connect(na),Xl(me,Ee,{toAudioTime:_t,now:V});for(const t of It($))await On(t);return Ke(),wt(),!0})(),Ei}async function On(e){const t=await ee.get(e);return t?(ft.has(e)||ft.set(e,hs(t.data)),U&&!Ai.has(e)&&(Ai.add(e),U.port.postMessage({type:"sample",hash:e,channels:t.data.map(n=>n.slice()),rate:t.sampleRate})),t):null}function sh(e){e.type!=="pos"||!e.voices||($s=e.voices,Kt=new Map(e.voices.map(([t,n,a,i])=>{const r=Pp(i)?Ae.cache.byId(i):void 0,s=r?ee.info(r.job.sample):void 0;return r&&s?[t,(r.job.from+n/r.frames*(r.job.to-r.job.from))/s.frames]:[t,n/Math.max(1,a)]})))}let hn=null,lh=0;const Ct=new Map,Es=[],ch=.25;function dh(){if(hn)return hn;const e=new Worker(new URL("/nyx/assets/stretch-worker-DVLOsvIo.js",import.meta.url),{type:"module"});return e.onmessage=t=>{const n=t.data;Ct.get(n.id)?.(n),Ct.delete(n.id)},e.onerror=t=>{console.error("NYX stretch worker",t.message);for(const n of Ct.values())n({error:t.message||"worker failed"});Ct.clear()},hn=e,e}async function uh(e){const t=await ee.get(e.sample);if(!t)return null;const n=Math.ceil(ch*e.sampleRate),a=Math.max(0,e.from-n),i=Math.min(t.frames,e.to+n),r=t.data.map(u=>u.slice(a,i)),s=++lh,l=dh();return new Promise(u=>{Ct.set(s,d=>{if(d.error||!d.channels){console.error("NYX stretch",d.error),u(null);return}typeof d.ms=="number"&&Es.push(Math.round(d.ms)),u(d.channels)}),l.postMessage({id:s,channels:r,sampleRate:e.sampleRate,from:e.from-a,to:e.to-a,frames:e.frames,semitones:e.semitones},r.map(d=>d.buffer))})}const Ae=new qp({run:uh,deliver(e,t){U?.port.postMessage({type:"sample",hash:e.sample,channels:t,rate:e.job.sampleRate},t.map(n=>n.buffer))},drop(e){U?.port.postMessage({type:"drop",hash:e.sample})},changed(){Ae.failed&&!F&&(F="Keep pitch couldn't start in this browser: fitted pads change speed and pitch instead."),Ke(),C()}});function Ke(){if(!U)return;const e=D().bpm,t=n=>ee.info(n);Ae.plan($.pads,t,e),U.port.postMessage({type:"program",program:wp($,t,e,n=>Ae.stretchedFor(n))})}let Si="";function wt(e=!1){if(!U)return;const t=D(),n=Wt();let a=0,i=t.bpm;if(t.running){const s=Math.max(0,t.beatAt(V())),l=t.timeAt(s);i=60/(t.timeAt(s+1)-l),a=_t(l)-s*60/i}const r=JSON.stringify([n,Math.round(a*2e3),i,Oe]);!e&&r===Si||(Si=r,U.port.postMessage({type:"clock",clock:{playing:n,zero:a,bpm:i,join:Oe}}))}let Na=null;function As(){if(!me)return;const e=za($.hacks),t=rp(Na,e);if(Na=e,t.whole)me.setState(e);else for(const[n,a,i]of t.params)me.setParam(n,a,i)}let Bt=null;function ph(){if(Bt){const t=Bt;Y(()=>{$.lanes=t}),F="Pattern back.",C();return}const e=structuredClone($.lanes);e.some(t=>t.steps.some(n=>n.on)||t.mute||t.solo||t.length!==le)&&(Y(()=>{$.lanes=$.lanes.map(()=>qn())}),se=null,Bt=e,F="Pattern cleared: press Undo to bring it back.",C())}function Y(e){Bt=null;const t=fo(!1);e(),t&&yt(),$.active!==null&&(mt=!0),We="",Rn(),Ke(),As(),C()}const H=e=>$.pads[e]??Ie(e),we=e=>$.lanes[e]??qn(),Ss=()=>H($.selected);function In(e,t=$.selected){Y(()=>e(H(t)))}function An(e,t,n){Y(()=>{const a=we(e).steps[t];a&&n(a)})}function xe(e,t=!0){$.selected=Math.max(0,Math.min(ke-1,e)),se&&se.lane!==$.selected&&(se=null),Rn(),t&&ze($.selected),C()}async function ze(e,t=null,n=!1){if(!await ue()||!P||!U)return;P.state!=="running"&&await P.resume().catch(()=>{});const a=H(e),i=a.sample?yp(a,ee.info(a.sample),D().bpm,t,Ae.stretchedFor(e)):null;i&&U.port.postMessage({type:"play",pad:e,hit:i,hold:n})}async function vt(e,t,n,a,i=!0){const{sample:r,saved:s}=await ee.put(t,n);await On(r.hash),Y(()=>{const l=H(e);l.sample=r.hash,l.name=a.slice(0,24)||`Pad ${e+1}`,l.start=0,l.end=1,l.slices=0,l.cuts=[],l.fit=0,l.keepPitch=!0}),F=s?"":"Kept until you reload: this browser has no file storage here.",yt(),i&&ze(e)}async function co(e,t=$.selected){if(/\.json$/i.test(e.name)||e.type==="application/json"){await xh(e);return}if(!await ue()||!P)return;let n;try{n=await P.decodeAudioData(await e.arrayBuffer())}catch{F=`Couldn't read ${e.name}: not an audio file this browser can decode.`,C();return}const{data:a,trimmed:i}=Sp(n);await vt(t,a,n.sampleRate,e.name.replace(/\.[^.]+$/,"")),i&&(F=`${e.name} was cut to its first minute.`,C())}const uo=new Set;let ae=null;function bt(e,t=H(e).name){const n=`Pad ${e+1}`;return t===n?n:`${n} (${t})`}async function po(e,t,n=""){return H(e).sample?ar({title:`Replace ${bt(e)}?`,body:t==="Grab"?"Grab replaces its sound, its slices and that lane's steps. Undo brings them back.":t==="Sent"?`${n} replaces its sound, its slices and that lane's steps. Undo brings them back.`:"The take replaces its sound, its slices and that lane's steps when it lands. Undo brings them back.",confirmLabel:"Replace",cancelLabel:"Cancel"}):!0}function ho(e){const t=Yu($,e);return t.pad.sample&&uo.add(t.pad.sample),t}function mo(e,t){fo();const n=Eu({message:e.pad.sample?`${t}: replaced ${bt(e.index,e.pad.name)}.`:`${t} onto Pad ${e.index+1}.`,actionLabel:"Undo",onAction:()=>void go(),onClose:()=>{ae&&(ae.toast=null)}}),a=n.el.querySelector("button");a instanceof HTMLElement&&X(a,j("grab-undo"),a),ae={before:e,what:t,toast:n},e.pad.sample&&uo.delete(e.pad.sample)}function fo(e=!0){if(!ae)return!1;const t=ae;return ae=null,t.toast?.close(),e&&yt(),!0}async function go(){const e=ae;if(!e)return!1;ae=null,e.toast?.close();const t=e.before.pad.sample;return t&&await On(t),Y(()=>Ku($,e.before)),se?.lane===e.before.index&&(se=null),F=`Undone: ${bt(e.before.index)} is back as it was.`,yt(),C(),!0}const q={from:"master",bars:1,busy:!1};async function bo(){const e=Re();if(!e||q.busy||!await ue()||!P)return;const t=D();if(!t.running){F="Play first: Grab takes the bars that just played.",C();return}const n=q.bars,a=Math.floor(t.beatAt(V())/4)*4,i=a-4*n;if(i<0){F=`Grab needs ${n} whole bar${n===1?"":"s"} played first.`,C();return}const r=P.sampleRate,{from:s,to:l}=Op({from:Math.round(_t(t.timeAt(i))*r),to:Math.round(_t(t.timeAt(a))*r)},gs(e,q.from)),u=$.selected;if(q.busy=!0,C(),!await po(u,"Grab")){q.busy=!1,C();return}const d=e.takeResult?await e.takeResult(q.from,s,l):{channels:await e.take(q.from,s,l)},c=d.channels;q.busy=!1;const p=e.sources().find(w=>w.id===q.from)?.name??q.from;if(!c){F="reason"in d&&d.reason==="gone"?`Those bars of ${p} are gone (the Studio keeps the last 20 seconds): Grab again.`:`${p} isn't kept that far back yet: let it play ${n} more bar${n===1?"":"s"}, then Grab again.`,C();return}let m=0;for(const w of c)for(const y of w)m=Math.max(m,Math.abs(y));if(m<1e-4){F=`${p} was silent for those ${n===1?"bar":"bars"}.`,C();return}const g=ho(u);await vt(u,c,r,`${p} grab`),n===1?(Y(()=>{const w=H(u);w.fit=1,w.keepPitch=!0,w.slices=16,w.cuts=[],w.decay=4;const y=we(u);y.length=le;for(const h of y.steps)Object.assign(h,Dn(),{on:!0})}),F=`Grabbed a bar of ${p}: 16 slices, every step on. Move, mute or lock steps to remix it.`):(In(w=>{w.fit=n,w.keepPitch=!0},u),await Pa(8,"transients",u),F=`Grabbed ${n} bars of ${p}, fitted to ${n} bars and sliced at the hits.`),mo(g,`Grabbed ${n===1?"a bar":`${n} bars`}`),C()}const Mi=240,hh=.25,S={phase:"idle",startBeat:0,pad:0,source:"master",rec:null,timer:0,lastBar:0,lastBarFrame:0,fromFrame:0,latency:0,bpm:120,warned:!1,label:""};function yo(e){const t=Math.floor(e/4)*4;return e-t<hh?t:t+4}function mh(e){const t=P?.sampleRate??48e3;return Math.round(_t(D().timeAt(e))*t)}function Ms(e){const t=P?.sampleRate??48e3;return S.fromFrame+Math.round((e-S.startBeat)*60/S.bpm*t)}function Sn(e=S.source){return Re()?.sources().find(t=>t.id===e)?.name??e}function wo(){S.phase==="idle"?fh():S.phase==="armed"?(S.phase="idle",F="",C()):S.phase==="rec"&&vo()}async function fh(){const e=Re();if(!e?.record){F="Take needs the Studio (reload it to update).",C();return}if(!await ue()||!P)return;const t=$.selected;if(await po(t,"Take")&&S.phase==="idle"){if(S.source=q.from,S.pad=t,e.listen(S.source),!D().running){S.phase="armed",F="Take armed: starts with the music.",C();return}Ts()}}function Ts(){const e=Re();if(!e?.record||!P){S.phase="idle";return}const t=D();S.startBeat=Math.max(0,yo(t.beatAt(V()))),S.fromFrame=mh(S.startBeat),S.bpm=t.bpm,S.latency=gs(e,S.source);const n=e.record(S.source,S.fromFrame+S.latency);if(!n){S.phase="idle",F=`${Sn()} can't be recorded.`,C();return}S.rec=n,S.phase="rec",S.warned=!1,S.lastBar=S.startBeat,S.lastBarFrame=S.fromFrame,F=`Taking ${Sn()}: stop on any bar.`,window.clearInterval(S.timer),S.timer=window.setInterval(gh,200),C()}function gh(){if(S.phase!=="rec")return;const e=D();if(!e.running)return;const t=e.beatAt(V()),n=Math.floor(t/4)*4;n>S.lastBar&&(S.lastBar=n,S.lastBarFrame=Ms(n));const a=240/Math.max(1,e.bpm),i=(Math.max(S.startBeat+4,yo(t))-S.startBeat)*60/Math.max(1,e.bpm);if(i+a>Mi){vo();return}!S.warned&&i>Mi-30&&(S.warned=!0,F="Take stops at four minutes: about 30 seconds left.");const r=Cs();r!==S.label&&(S.label=r,C())}function Cs(){if(S.phase==="armed")return"Armed: waits for Play";if(S.phase==="saving")return"Saving take…";if(S.phase!=="rec")return"Take";const e=D().beatAt(V());return e<S.startBeat?"Starts on the bar…":`Stop take · bar ${Math.floor((e-S.startBeat)/4)+1}`}async function vo(e=!1){const t=S.rec;if(S.phase!=="rec"||!t)return;window.clearInterval(S.timer);let n,a;e?(n=S.lastBar,a=S.lastBarFrame):(n=Math.max(S.startBeat+4,yo(D().beatAt(V()))),a=Ms(n));const i=Math.round((n-S.startBeat)/4);if(S.rec=null,i<1){t.cancel(),S.phase="idle",F="The music stopped before a whole bar was taken.",C();return}S.phase="saving",C();try{await bh(t,a,i,n)}finally{S.phase="idle",C()}}async function bh(e,t,n,a){let i=null;try{i=await e.stop(t+S.latency)}catch(l){console.error("NYX take",l)}const r=Sn();if(!i?.[0]?.length){F=`The take from ${r} came back empty.`,C();return}let s=0;for(const l of i)for(const u of l)s=Math.max(s,Math.abs(u));if(s<1e-4){F=`${r} was silent for the whole take.`,C();return}try{await yh(i,n,a,r)}catch(l){console.error("NYX take",l),F=`The take from ${r} couldn't be kept (${l instanceof Error?l.message:String(l)}).`,C()}}async function yh(e,t,n,a){const i=S.pad,r=`${a} take`.slice(0,20),s=$.pads.filter(d=>d.name.startsWith(r)).length+1,l=ho(i);await Ls(i,e,P?.sampleRate??48e3,t,Math.round(S.startBeat/4),{name:`${r} ${s}`,endBeat:n}),mo(l,`Took ${t===1?"a bar":`${t} bars`}`),F=t<=Ot?`${t} bar${t===1?"":"s"} of ${a} on ${H(i).name}: it loops every ${t===1?"bar":`${t} bars`}. Tap the pad to play it any time.`:`${t} bars of ${a} on ${H(i).name}. Longer than ${Ot} bars, so it plays from the pad (tap or hold it), not the grid.`,C()}async function Ls(e,t,n,a,i,r){await vt(e,t,n,r.name,!1);const s=a<=Ot;Y(()=>Xu($,e,a,i));const l=D(),u=r.endBeat;if(u!==void 0&&s&&l.running&&U&&P){const d=H(e),c=we(e).steps[0],p=c?io(d,0,c,ee.info(d.sample??""),l.bpm,!1,Ae.stretchedFor(e)):null,g=l.beatAt(V()+lo)-u;if(p&&g>0&&g<4*a){const w=Math.round(g*60/l.bpm*n*p.rate);p.from+w<p.to-1&&U.port.postMessage({type:"play",pad:e,hit:{...p,from:p.from+w,attack:.005}})}}}let aa=!1;function Fs(){return $.pads.map((e,t)=>({id:String(t+1),name:bt(t),...e.sample?{filled:!0}:{}}))}async function zs(e,t){const n=Vu(t,$.pads.length);if(n<0)return{ok:!1,reason:"refused",message:`NYX has no pad ${t}.`};if(aa||S.phase!=="idle"&&S.pad===n)return{ok:!1,reason:"busy",message:`Pad ${n+1} is busy: try again in a moment.`};if(!await ue()||!P)return{ok:!1,reason:"refused",message:"NYX's audio didn't start."};aa=!0;try{const a=`${e.fromName}'s ${e.name}`;if(xe(n,!1),ne?.reveal?.(),C(),H(n).sample&&!await po(n,"Sent",a))return F=`Kept ${bt(n)}: ${a} was not placed.`,C(),{ok:!1,reason:"cancelled"};const i=e.channels.map(u=>new Float32Array(u)),r=e.bars,s=ho(n),l=e.name.slice(0,24);return r!==void 0&&Number.isInteger(r)&&r>=1?(await Ls(n,i,e.sampleRate,r,0,{name:l}),F=r<=Ot?`${a} on Pad ${n+1}: fitted to ${r===1?"a bar":`${r} bars`}, it loops every ${r===1?"bar":`${r} bars`}.`:`${a} on Pad ${n+1}: ${r} bars, so it plays from the pad, not the grid.`):(await vt(n,i,e.sampleRate,l,!1),F=`${a} on Pad ${n+1}.`),mo(s,a),C(),{ok:!0,target:t,targetName:bt(n)}}finally{aa=!1}}async function wh(e){const t=await Tp(e);if(!t){F=`LUCY take ${e.id} could not be read.`,C();return}await vt($.selected,t,e.sampleRate,`LUCY take ${e.id}`)}async function Ns(){const e=$.selected,t=H(e);!t.sample||!await ar({title:`Clear ${t.name}?`,body:"Its sample and settings go; its steps stay.",confirmLabel:"Clear"})||(Y(()=>{$.pads[e]=Ie(e)}),yt())}async function Pa(e,t,n=$.selected){const a=H(n);let i=[];if(e&&t==="transients"&&a.sample){const r=await ee.get(a.sample);r&&(i=Mp(r.data,r.sampleRate,Math.floor(a.start*r.frames),Math.ceil(a.end*r.frames),e))}In(r=>{r.slices=e,r.cuts=i},n)}function Ps(e,t){const n=es[e]??String(e+1);if(fo(),t==="store")$.slots[e]=to($),$.active=e,mt=!1,We=`Stored in ${n}`;else if(t==="clear")$.slots[e]=null,$.active===e&&($.active=null),We=`Cleared ${n}`,yt();else{const a=$.slots[e];if(!a){We=`${n} is empty: Shift-click or long-press to store`,C();return}Ds(a),$.active=e,mt=!1,We=`Recalled ${n}`}Rn(),Ke(),As(),C()}function Ds(e){const t=structuredClone(e);$.pads=t.pads,$.lanes=t.lanes,$.swing=t.swing,$.hacks=t.hacks,se=null;for(const n of It($))On(n).then(()=>Ke())}async function qs(){if(await ue(),P&&P.state!=="running"&&await P.resume().catch(()=>{}),ne&&gt()){if(oe=!oe,!oe){const e=D();Oe=e.nextBar(e.beatAt(V()+lo))}wt(!0),C(),oe&&pt()?.out?.(jt(ht,ie));return}gt()?Ee.stop({at:V()}):(oe=!1,Oe=0,ne&&pt()?.claim(jt(ht,ie)),Ee.play({at:V()}))}let Ti=D().running;Ee.onChange(()=>{D().running&&!Ti&&ne&&(oe=!Yp(ht,ie)),Ti=D().running,D().running&&S.phase==="armed"&&Ts(),!D().running&&S.phase==="rec"&&vo(!0),D().running||(oe=!1,Oe=0),Ke(),wt(!0),C()});pt()?.member?.(jt(ht,ie),()=>D().running&&!oe);pt()?.onAll(()=>{if(oe){if(oe=!1,gt()){const e=D();Oe=e.nextBar(e.beatAt(V()+lo))}wt(!0),C()}});function vh(){const e=bs($),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=`nyx${ie>1?`-${ie}`:""}-pattern-${new Date().toISOString().slice(0,10)}.json`,n.hidden=!0,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e4)}async function xh(e){let t;try{t=JSON.parse(await e.text()),ys(t)}catch{F=`Couldn't read ${e.name}: not a NYX pattern.`,C();return}await Bs(t,`Loaded ${e.name}.`)}async function Bs(e,t){const n=ys(e),a=Zp(e);Y(()=>{a&&($.slots=a.slots,$.active=a.active),Ds(n)}),a&&(mt=$.active!==null&&JSON.stringify(to($))!==JSON.stringify($.slots[$.active])),We="";const i=[],r=new Set;for(const l of $.pads)l.sample&&!await ee.get(l.sample)&&i.push(l.name);for(const l of $.slots)for(const u of l?.pads??[])u.sample&&!$.pads.some(d=>d.sample===u.sample)&&r.add(u.sample);let s=0;for(const l of r)await ee.get(l)||s++;F=i.length?`Loaded. ${i.length===1?"One pad needs its":`${i.length} pads need their`} sample again (${i.join(", ")}): samples stay in the browser they were loaded in.`:s?`${t} ${s===1?"One sample":`${s} samples`} in the slots ${s===1?"isn't":"aren't"} in this browser: samples stay in the browser they were loaded in.`:t,Ke(),C()}function kh(){U?.port.postMessage({type:"stop"}),gt()&&(ne?(oe=!0,pt()?.out?.(jt(ht,ie))):Ee.stop({at:V()})),wt(!0),me?.clear({fadeMs:20}),C()}function $h(e){$.master=Math.min(1,Math.max(0,e)),Rn(),En&&P&&En.gain.setTargetAtTime($.master,P.currentTime,.01),Ut.value=String($.master),xo.textContent=`${Math.round($.master*100)}%`}const W=(e,t={},...n)=>{const a=document.createElement(e);for(const[i,r]of Object.entries(t))a.setAttribute(i,r);return a.append(...n),a},Hn=document.getElementById("app");Hn.classList.add("nc","nc-page");Mu();const Rs=W("header",{class:"nc-page-hd"},W("div",{},W("h1",{class:"nc-page-title",...dp("page:title")},W("span",{style:"color: var(--nc-ui-instrument-nyx)"},"NYX")," ",W("span",{class:"nc-page-sep"},"/")," SAMPLER ",W("span",{class:"nc-page-sep"},"/")," ",W("span",{class:"nc-mono"},String(ie).padStart(2,"0"))),W("p",{class:"nc-page-sub"},"A NetComposer element."))),Ut=W("input",{type:"range",class:"nc-range",id:"nyx-master",min:"0",max:"1",step:"0.01",value:String($.master),"data-nc-id":"nyx-master"});Ut.addEventListener("input",()=>$h(Number(Ut.value)));const xo=W("span",{class:"nc-readout","data-nc-readout":""});xo.textContent=`${Math.round($.master*100)}%`;const Ci="audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.aif,.aiff,.webm",Ue=W("input",{type:"file"});Ue.hidden=!0;let Li="pad";Ue.addEventListener("change",()=>{const e=Ue.files?.[0];Ue.value="",e&&co(e)});function ko(e){Li=e,Ue.accept=Li==="pad"?Ci:`${Ci},.json,application/json`,Ue.click()}const Da=(e,t)=>{const n=W("button",{type:"button",class:"nc-page-action","data-nyx-action":e.toLowerCase()},e);return X(n,j(`page:${e.toLowerCase()}`),n),n.addEventListener("click",t),n},Os=W("label",{class:"nc-label",for:"nyx-master"},"Master");X(Os,j("page:master"),Ut);const Fi=zu({panel:W("div",{},W("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},Os,Ut,xo),Da("Save",vh),Da("Load",()=>ko("any")))});Rs.append(W("div",{class:"nc-page-actions"},Fi.panel,Da("Panic",kh),Fi.button,Ue));const de=W("div",{class:"nc-stack","data-nc-layout":"adjacent"});Hn.append(Rs,W("main",{class:"nc-page-body"},de));Hn.addEventListener("dragover",e=>{e.dataTransfer?.types.includes("Files")&&e.preventDefault()});Hn.addEventListener("drop",e=>{const t=e.dataTransfer?.files?.[0];t&&(e.preventDefault(),co(t))});function zi(e){return Math.abs(e)<.01?"C":`${e<0?"L":"R"}${Math.round(Math.abs(e)*100)}`}function Is(){return gt()?oe?"Sitting out":D().beatAt(V())<Oe?"Joining on the next bar":"Playing":$.pads.some(t=>t.sample)?"Stopped":"Load a sample to start"}function Eh(e){if(e==="always")return"Always";if(e==="fill")return"Only in Fill";if(e==="!fill")return"Not in Fill";if(e==="pre")return"If the last one played";if(e==="!pre")return"If the last one didn't";const[t,n]=e.split(":");return`Pass ${t} of every ${n}`}const Hs=[{mode:"repeat16",label:"1/16",title:"Repeat the last 16th while held"},{mode:"repeat8",label:"1/8",title:"Repeat the last 8th while held"},{mode:"reverse",label:"Rev",title:"Play what just happened backwards while held"},{mode:"half",label:"Half",title:"Half speed while held"},{mode:"stop",label:"Stop",title:"Slow to a halt like a tape machine while held"}],Gt={fill:!1,perform:null};function Mn(e){Gt.fill!==e&&(Gt.fill=e,U?.port.postMessage({type:"fill",on:e}),C())}function qa(e){Gt.perform!==e&&(Gt.perform=e,U?.port.postMessage({type:"perform",mode:e}),C())}function Ah(e){const t=i=>{const s=(i.target instanceof Element?i.target:null)?.closest('[data-nc-id="perform"] [data-nc-choice]'),l=s instanceof HTMLElement?s.dataset.ncChoice:void 0;return Hs.some(u=>u.mode===l)?l:null},n=i=>{ue(),i==="fill"?Mn(!0):qa(i)},a=()=>{Mn(!1),qa(null)};e.addEventListener("pointerdown",i=>{const r=t(i);if(!r)return;i.preventDefault(),n(r);const s=()=>{a(),window.removeEventListener("pointerup",s),window.removeEventListener("pointercancel",s)};window.addEventListener("pointerup",s),window.addEventListener("pointercancel",s)}),e.addEventListener("keydown",i=>{if((i.key===" "||i.key==="Enter")&&!i.repeat){const r=t(i);if(!r)return;i.preventDefault(),n(r)}}),e.addEventListener("keyup",i=>{(i.key===" "||i.key==="Enter")&&t(i)&&a()}),window.addEventListener("blur",a)}function Sh(){return{id:"transport",title:"Transport",status:We,controls:[{type:"button",id:"play",label:Wt()?"Stop":"Play",on:Wt(),onPress:()=>void qs()},{type:"label",id:"perform-label",text:"Hold to play"},{type:"choice",id:"perform",label:"Hold",value:Gt.perform??"",options:Hs.map(e=>({value:e.mode,label:e.label})),onChange:()=>{}},{type:"slider",id:"tempo",label:"Tempo",min:40,max:240,step:1,value:Math.round(D().bpm),valueText:`${Math.round(D().bpm)} BPM`,onChange:e=>{Ee.setTempo({bpm:e}),C()}},{type:"group",id:"transport-more",title:"Swing",collapse:"phone",summary:ge($.swing),controls:[{type:"slider",id:"swing",label:"Swing",min:.5,max:.75,step:.01,value:$.swing,valueText:ge($.swing),onChange:e=>Y(()=>{$.swing=e})}]},{type:"readout",id:"status",label:"Status",value:Is()},{type:"slotRow",id:"slots",morph:0,morphText:"",slots:es.map((e,t)=>({label:e,filled:$.slots[t]!=null,active:$.active===t,edited:$.active===t&&mt})),onMorph:()=>{},onSlot:(e,t)=>Ps(e,t)}]}}function js(){if(!Wt())return-1;const e=D().beatAt(V());return e<0||e<Oe?-1:Math.floor(e/mp)%le}function Mh(){const e=Ss(),t=js();return{id:"pattern",title:"Pattern",lead:!0,summary:`${$.lanes.filter(n=>n.steps.some(a=>a.on)).length} lanes · ${e.name}`,sections:[{id:"grid",controls:[{type:"stepGrid",id:"grid",playhead:t,selectedRow:`pad-${$.selected}`,rows:$.lanes.map((n,a)=>({id:`pad-${a}`,label:H(a).name,length:n.length,lane:a%4+1,mute:n.mute,solo:n.solo,steps:n.steps.map(i=>({on:i.on,accent:i.accent,velocity:i.velocity,dim:!H(a).sample}))})),onToggle:(n,a,i)=>An(n,a,r=>{i?(r.accent=r.on?!r.accent:!0,r.on=!0):(r.on=!r.on,r.on||(r.accent=!1))}),onSet:(n,a,i,r)=>An(n,a,s=>{i==="on"?(s.on=r,r||(s.accent=!1)):(s.accent=r,r&&(s.on=!0))}),onSelectRow:n=>xe(n),onLongPress:(n,a)=>{se={lane:n,step:a},xe(n,!1)},onMute:n=>Y(()=>{we(n).mute=!we(n).mute}),onSolo:n=>Y(()=>{we(n).solo=!we(n).solo}),onLength:(n,a)=>Y(()=>{we(n).length=Math.max(1,Math.min(le,a))}),transport:{playing:Wt(),onToggle:()=>void qs()},onFill:n=>Mn(n),onClear:()=>ph(),clearLabel:Bt?"Undo":"Clear"},{type:"note",id:"grid-help",text:"Tap a name to hear it. Long-press a step for its locks."}]},{id:"pads",title:"Pad",controls:[{type:"padGrid",id:"pads",label:"Pads",columns:4,selected:$.selected,pads:$.pads.map((n,a)=>({label:n.name,empty:!n.sample,peaks:n.sample?ft.get(n.sample):void 0,lane:a%4+1,playing:Kt.has(a),badge:n.choke?Cn[n.choke-1]:void 0,badgeLabel:n.choke?`choke group ${Cn[n.choke-1]}`:void 0})),onDown:n=>Lh(n),onPress:n=>Fh(n),onFile:(n,a)=>{xe(n,!1),co(a,n)},onMove:(n,a,i)=>zh(n,a,i),menu:n=>Ph(n),onMenu:(n,a)=>void Dh(n,a),onRename:(n,a)=>Nh(n,a)}]}]}}function Th(e){if(!se||se.lane!==$.selected)return[];const{lane:t,step:n}=se,a=we(t).steps[n];if(!a)return[];const i=r=>An(t,n,r);return[{type:"label",id:"lock-label",text:`Step ${n+1}`},{type:"slider",id:"lock-velocity",label:"Velocity",min:0,max:1,step:.01,value:a.velocity,valueText:ge(a.velocity),onChange:r=>i(s=>{s.velocity=r})},{type:"slider",id:"lock-chance",label:"Chance",min:0,max:1,step:.05,value:a.chance,valueText:ge(a.chance),onChange:r=>i(s=>{s.chance=r})},...e.slices?[{type:"select",id:"lock-slice",label:"Slice",value:a.slice===null?"auto":String(a.slice),options:[{value:"auto",label:`In order (${n%e.slices+1})`},...Array.from({length:e.slices},(r,s)=>({value:String(s),label:`Slice ${s+1}`}))],onChange:r=>i(s=>{s.slice=r==="auto"?null:Number(r)})}]:[],{type:"slider",id:"lock-pitch",label:"Pitch",min:-12,max:12,step:1,value:a.pitch,valueText:Ht(a.pitch," st"),onChange:r=>i(s=>{s.pitch=r})},{type:"select",id:"lock-cond",label:"Plays",value:a.cond,options:Ca.map(r=>({value:r,label:Eh(r)})),onChange:r=>i(s=>{Ca.includes(r)&&(s.cond=r)})},{type:"choice",id:"lock-reverse",label:"Direction",value:a.reverse?"rev":"pad",options:[{value:"pad",label:"As the pad"},{value:"rev",label:"Reversed"}],onChange:r=>i(s=>{s.reverse=r==="rev"})},{type:"button",id:"lock-done",label:"Done",on:!1,onPress:()=>{se=null,C()}}]}function Ch(){const e=Re();if(!e)return[];const t=e.sources();return[{type:"label",id:"grab-label",text:e.record?"Grab or take":"Grab the bar"},{type:"select",id:"grab-from",label:"From",value:q.from,options:t.map(n=>({value:n.id,label:n.name})),onChange:n=>{q.from=n,e.listen(n),C()}},{type:"choice",id:"grab-bars",label:"Bars",value:String(q.bars),options:[1,2,4].map(n=>({value:String(n),label:String(n)})),onChange:n=>{q.bars=n==="4"?4:n==="2"?2:1,C()}},{type:"button",id:"grab",label:q.busy?"Grabbing…":q.bars===1?"Grab last bar":`Grab last ${q.bars} bars`,on:q.busy,onPress:()=>void bo()},...e.record?[{type:"button",id:"take",label:Cs(),on:S.phase!=="idle",onPress:()=>wo()}]:[]]}let Tn=-1;function Lh(e){if(!H(e).sample)return;Tn=e,xe(e);const t=()=>{Tn=-1};window.addEventListener("pointerup",()=>setTimeout(t),{once:!0})}function Fh(e){if(Tn===e){Tn=-1;return}if(!H(e).sample){xe(e,!1),ko("pad");return}xe(e)}function zh(e,t,n){Y(()=>{const a=structuredClone(H(e)),i=structuredClone(H(t));$.pads[t]=a,n||($.pads[e]=i.sample?i:Ie(e))}),xe(t,!1)}const Cn=["A","B","C","D"];function Nh(e,t){In(n=>{n.name=t.slice(0,24)},e)}function Ph(e){const t=!!H(e).sample,n=[{id:"load",label:t?"Replace…":"Load a file…"}];for(const a of ms().slice(-4).reverse())n.push({id:`take-${a.id}`,label:`LUCY take ${a.id}`});return Re()&&n.push({id:"grab",label:q.bars===1?"Grab the last bar":`Grab the last ${q.bars} bars`}),Re()?.record&&n.push({id:"record",label:S.phase==="rec"?"Stop the take":`Take from ${Sn(q.from)}`}),t&&n.push({id:"rename",label:"Rename…"},{id:"clear",label:"Clear"}),n}async function Dh(e,t){if(xe(e,!1),t==="load")ko("pad");else if(t==="grab")await bo();else if(t==="record")wo();else if(t==="clear")await Ns();else if(t.startsWith("take-")){const n=ms().find(a=>`take-${a.id}`===t);n&&await wh(n)}}const $o=new hp;document.addEventListener("keydown",e=>{!ae||e.repeat||e.shiftKey||e.altKey||!(e.metaKey||e.ctrlKey)||e.key.toLowerCase()!=="z"||(e.target instanceof HTMLElement?e.target:null)?.closest("input, select, textarea, [contenteditable]")||(e.preventDefault(),go())});const _s=e=>U?.port.postMessage({type:"release",pad:e});document.addEventListener("keydown",e=>{if(e.repeat||e.metaKey||e.ctrlKey||e.altKey||(e.target instanceof HTMLElement?e.target:null)?.closest("input, select, textarea, [contenteditable]"))return;const n=ls(e);n<0||!H(n).sample||(e.preventDefault(),!($o.press(e)<0)&&ze(n,null,!0))});document.addEventListener("keyup",e=>{const t=$o.release(e);t>=0&&_s(t)});window.addEventListener("blur",()=>{for(const e of $o.releaseAll())_s(e)});function Eo(e){const t=j("kit:pad-key");e.querySelectorAll('[data-nc-id="pads"] .nc-padgrid-pad').forEach((n,a)=>{const i=pp[a];if(!i)return;let r=n.querySelector(":scope > .nyx-pad-key");r||(r=W("span",{class:"nyx-pad-key","aria-hidden":"true"}),n.append(r)),r.textContent!==i&&(r.textContent=i),X(r,t)})}function Ws(e){const t=e.querySelector('[data-nc-id="fit-speed"]');if(!t)return;const n=Ss(),a=n.sample?ee.info(n.sample):void 0,i=Number((a?us(n,a,D().bpm):1).toFixed(2)),r=n.keepPitch&&(i<$i[0]||i>$i[1]);t.toggleAttribute("data-nyx-far",r)}function qh(){const e=$.selected,t=H(e),n=t.sample?ee.info(t.sample):void 0,a=oo(t).slice(1,-1),i=t.end-t.start,r=n?n.frames/n.sampleRate:0,s=!!t.sample,l=s&&!n,u=c=>In(c),d=s?[{type:"readout",id:"sample",label:"Length",value:l?"Not in this browser: load it again":`${_e(r*i)} of ${_e(r)} · ${n?.channels===2?"stereo":"mono"}`},{type:"choice",id:"mode",label:"Mode",value:t.mode,options:[{value:"oneshot",label:"One-shot"},{value:"gate",label:"Gate"},{value:"loop",label:"Loop"}],onChange:c=>u(p=>{p.mode=c})},{type:"choice",id:"dir",label:"Direction",value:t.dir,options:[{value:"fwd",label:"Forward"},{value:"rev",label:"Reverse"},{value:"pingpong",label:"Ping-pong"}],onChange:c=>u(p=>{(c==="fwd"||c==="rev"||c==="pingpong")&&(p.dir=c)})},{type:"slider",id:"start",label:"Start",min:0,max:1,step:.001,value:t.start,valueText:_e(t.start*r),onChange:c=>u(p=>{p.start=Math.min(c,p.end-.002)}),onCommit:()=>void ze(e)},{type:"slider",id:"end",label:"End",min:0,max:1,step:.001,value:t.end,valueText:_e(t.end*r),onChange:c=>u(p=>{p.end=Math.max(c,p.start+.002)}),onCommit:()=>void ze(e)},{type:"select",id:"slices",label:"Slices",value:String(t.slices),options:ts.map(c=>({value:String(c),label:c?`${c}`:"Off"})),onChange:c=>void Pa(Number(c),t.cuts.length?"transients":"even")},...t.slices?[{type:"choice",id:"chop",label:"Chop",value:t.cuts.length?"transients":"even",options:[{value:"even",label:"Even"},{value:"transients",label:"At hits"}],onChange:c=>void Pa(t.slices,c==="transients"?"transients":"even")}]:[],{type:"group",id:"tune-shape",title:"Tune & shape",summary:op(t),controls:[{type:"label",id:"pitch-label",text:"Pitch"},{type:"slider",id:"tune",label:"Tune",min:-24,max:24,step:1,value:t.tune,valueText:Ht(t.tune," st"),onChange:c=>u(p=>{p.tune=c}),onCommit:()=>void ze(e)},{type:"slider",id:"fine",label:"Fine",min:-100,max:100,step:1,value:t.fine,valueText:Ht(t.fine," ct"),onChange:c=>u(p=>{p.fine=c})},{type:"select",id:"fit",label:"Fit to bars",value:String(t.fit),options:[{value:"0",label:"Off"},...[1,2,4,8].map(c=>({value:String(c),label:`${c} bar${c===1?"":"s"}`}))],onChange:c=>u(p=>{p.fit=Number(c)})},...t.fit&&n?[{type:"choice",id:"keep-pitch",label:"Keep pitch",value:t.keepPitch?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:c=>u(p=>{p.keepPitch=c==="on"})},{type:"readout",id:"fit-speed",label:"Speed",value:`${ap(us(t,n,D().bpm))}${t.keepPitch&&Ae.pending(e)&&!Ae.failed?" · stretching…":""}`}]:[],{type:"label",id:"shape-label",text:"Shape"},{type:"slider",id:"attack",label:"Attack",min:0,max:.1,step:.001,taper:"time",value:t.attack,valueText:_e(t.attack),onChange:c=>u(p=>{p.attack=c})},{type:"slider",id:"decay",label:"Decay",min:.01,max:4,step:.01,taper:"time",value:t.decay,valueText:un(t.decay),onChange:c=>u(p=>{p.decay=c}),onCommit:()=>void ze(e)},{type:"slider",id:"cutoff",label:"Filter",min:-1,max:1,step:.01,value:t.cutoff,valueText:dn(t.cutoff),onChange:c=>u(p=>{p.cutoff=Math.abs(c)<.02?0:c})},{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:ge(t.resonance),onChange:c=>u(p=>{p.resonance=c})}]},{type:"label",id:"out-label",text:"Output"},{type:"slider",id:"level",label:"Level",min:0,max:1,step:.01,value:t.level,valueText:ge(t.level),onChange:c=>u(p=>{p.level=c})},{type:"group",id:"pad-more",title:"Pan & choke",collapse:"phone",summary:`Pan ${zi(t.pan)} · Choke ${t.choke?Cn[t.choke-1]:"none"}`,controls:[{type:"slider",id:"pan",label:"Pan",min:-1,max:1,step:.01,value:t.pan,valueText:zi(t.pan),onChange:c=>u(p=>{p.pan=Math.abs(c)<.02?0:c})},{type:"select",id:"choke",label:"Choke",value:String(t.choke),options:[{value:"0",label:"None"},...Cn.map((c,p)=>({value:String(p+1),label:`Group ${c}`}))],onChange:c=>u(p=>{p.choke=Number(c)})},{type:"button",id:"clear-pad",label:"Clear pad",on:!1,onPress:()=>void Ns()}]}]:[];return{id:"params",title:"Params",summary:t.name,controls:[...s?[{type:"canvas",id:"wave",label:"Wave",paint:"waveform",peaks:t.sample?ft.get(t.sample)??[]:[],region:[t.start,t.end],markers:a.map(c=>t.start+c*i),position:Kt.get(e)??-1}]:[],...F?[{type:"note",id:"notice",text:F}]:[],...Th(t),...d,...Ch()]}}function Ba(e,t){Y(()=>t($.hacks[e]))}function Bh(e,t){const n=$.hacks[e].dials[t.key]??t.default,a=`hack-${e}-${t.key}`,i=r=>Ba(e,s=>{s.dials[t.key]=r});return t.options?{type:"select",id:a,label:t.label,value:String(n),options:t.options.map(r=>({value:String(r.value),label:r.label})),onChange:r=>i(Number(r))}:{type:"slider",id:a,label:t.label,min:t.min,max:t.max,step:t.step??1,taper:Oc(t),value:n,valueText:Hi(t,n,D().bpm),onChange:i}}const an=(e,t)=>(Se(e)?.dials??[]).filter(n=>!n.key.startsWith("mod_")&&n.more===!0===t).map(n=>Bh(e,n)),Ni=new Map;function oa(e){let t=Ni.get(e);if(t)return t;let n=0,a=null;const i={in:0,out:0},r=()=>{const s=Gl(me,e);if(s!==a){for(let l=0;l<n;l++)a?.close();a=s;for(let l=0;l<n;l++)a?.open()}};return t={open:()=>(r(),n++,a?.open(),!0),close:()=>{n!==0&&(r(),n--,a?.close())},read:()=>(r(),a?.read()??i)},Ni.set(e,t),t}function Rh(){const e=$.hacks,t=e.filter,n=t.mode==="lp"&&t.cutoff>=.999,a=r=>Y(()=>r($.hacks.filter)),i=[ss(t)?"":"Filter",e.drive.on?"Drive":"",e.compressor.on?"Comp":""].filter(Boolean);return{id:"hacks",title:"Hacks",summary:i.length?i.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:t.on,meter:oa(`${no(t).type}-1`),meterHelp:j("hack-meter"),onToggle:r=>a(s=>{s.on=r}),controls:[{type:"select",id:"filter-mode",label:"Mode",value:t.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:r=>a(s=>{(r==="lp"||r==="hp"||r==="bp")&&(s.mode=r)})},{type:"slider",id:"filter-cutoff",label:"Cutoff",min:0,max:1,step:.01,value:t.cutoff,valueText:n?"open":Fa(rs(t.cutoff)),onChange:r=>a(s=>{s.cutoff=r})},...t.mode==="lp"?[]:[{type:"slider",id:"filter-resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:ge(t.resonance),onChange:r=>a(s=>{s.resonance=r})}],{type:"canvas",id:"filter-curve",label:"Curve",paint:"filter",mode:t.mode,cutoff:t.cutoff,resonance:t.mode==="lp"?0:t.resonance,...ip(t)}]},{type:"group",id:"hacks-more",title:"Drive & Compressor",collapse:"phone",summary:`Drive ${e.drive.on?"on":"off"} · Compressor ${e.compressor.on?"on":"off"}`,controls:[{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:e.drive.on,meter:oa("drive-1"),meterHelp:j("hack-meter"),onToggle:r=>Ba("drive",s=>{s.on=r}),controls:an("drive",!1),more:an("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:e.compressor.on,meter:oa("compressor-1"),meterHelp:j("hack-meter"),onToggle:r=>Ba("compressor",s=>{s.on=r}),controls:an("compressor",!1),more:an("compressor",!0)}]}]}}const Ao=[Sh,Mh,qh,Rh].map(e=>({def:e,handle:Ou(e())}));Iu(de,Ao.map(e=>e.handle),"adjacent");Ah(de);Eo(de);ao(de);function C(){for(const e of Ao)e.handle.update(e.def());Eo(de),Ws(de),ao(de)}let Pi="";function Us(){wt();const e=Kt.get($.selected)??-1,t=JSON.stringify([js(),Is(),Math.round(e*400)]);if(t!==Pi){Pi=t;for(const n of Ao.slice(0,3))n.handle.update(n.def());Eo(de),Ws(de),ao(de)}requestAnimationFrame(Us)}requestAnimationFrame(Us);rh.start();Promise.all([...It($)].map(e=>ee.get(e))).then(e=>{for(const t of e)t&&!ft.has(t.hash)&&ft.set(t.hash,hs(t.data));C()});if(ne)ue(),ne.providePreset?.({format:Qp,version:Jp,get:()=>(ah($),bs($)),set:async e=>{await Bs(e,"Loaded the Scene's pattern.")}}),Re()?.listen(q.from),ne.onAudio?.({label:"Pad",targets:Fs,receive:zs});else{const e=()=>{ue()};document.addEventListener("pointerdown",e,{once:!0,capture:!0}),document.addEventListener("keydown",e,{once:!0,capture:!0})}window.__nyx={state:$,clock:Ee,store:ee,stretcher:Ae,stretchTimes:Es,get stretchLoaded(){return hn!==null},get ctx(){return P},get fx(){return me},get positions(){return Kt},get voices(){return $s},ensureAudio:ue,play:ze,async setSample(e,t,n,a="test"){await ue()&&await vt(e,t,n,a)},grab:q,grabBars:bo,get padUndo(){return ae?{index:ae.before.index,sample:ae.before.pad.sample}:null},undoPad:go,receiveAudio:zs,padTargets:Fs,take:S,pressTake:wo,get notice(){return F},setPerform:qa,setFill:Mn,actSlot:Ps,get edited(){return mt},toggleStep(e,t){An(e,t,n=>{n.on=!n.on})}};
