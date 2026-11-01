(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const We=1e-9;function Jo(t,e,n,a=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,a))}class ha{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return Jo(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let r=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=e.beat+We&&(r=s.bpm);const o=[{beat:e.beat,time:e.time,bpm:this.clamp(r)}];for(const s of a){if(s.beat<=e.beat+We)continue;const l=this.clamp(s.bpm);l!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+We){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-We;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,a,r=.25){const o=this.bpmAt(n);if(!(a>0)||!(r>0)){this.setTempoAt(e,n);return}const s=Math.max(1,Math.round(a/r));this.setTempoAt(o,n);for(let l=1;l<=s;l++)this.setTempoAt(o+(e-o)*l/s,n+a*(l-1)/s)}prune(e){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=e&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new ha({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=e+We)return n[a];return n[0]}segAtTime(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=e+We)return n[a];return n[0]}}const Qo=Object.freeze({beatsPerBar:4,beatUnit:4}),Je=1e-9;function es(t){return Math.floor(t+Je)}function er(t,e,n=!1){if(!(e>0))return t;const r=Math.ceil(t/e-Je)*e;return n&&r<=t+Je?r+e:r}class ts{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new ha({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??Qo}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-Je&&(this.stopTime===null||e<this.stopTime-Je)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(e,a.beat),a.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-Je?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),a=es(e/n),r=Math.max(0,e-a*n);return{beat:e,bar:a,beatInBar:r,barPhase:r/n}}nextBar(e,n=!1){return er(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const tr="nc-clock/snapshot",nr=1;function ns(t,e="local"){return{format:tr,version:nr,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function as(t,e){const n=is(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}const fe=t=>typeof t=="number"&&Number.isFinite(t),Za=t=>t===null||fe(t);function is(t){const e=t,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==tr&&n("format"),(!fe(e.version)||Math.floor(e.version)!==nr)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!fe(e.anchor.beat)||!fe(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(a=>a&&fe(a.beat)&&fe(a.bpm)&&a.bpm>0))&&n("tempo"),(!e.meter||!fe(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!fe(e.meter.beatUnit))&&n("meter"),(!Za(e.startTime)||!Za(e.stopTime)||!fe(e.stoppedBeat))&&n("transport times"),e}class rs{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new ts(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,a){this.transport.start({at:e,beat:n,bpm:a}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const a=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(e){as(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return ns(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const os="nc-sync/1",ss=1,ls="nc-sync",cs="nc-sync-leader",ds=0,ar=.5,ir=.75;function us(t){return typeof t=="number"&&Number.isFinite(t)&&t>=ar&&t<=ir?t:null}const En=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),pt=t=>typeof t=="number"&&Number.isFinite(t),Dt=t=>typeof t=="string"&&t.length>0;function ps(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==ss||!Dt(e.type)||!Dt(e.from)||!pt(e.term)||!pt(e.seq)||!pt(e.sentAt))return null;switch(e.type){case"hello":return Dt(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return pt(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&pt(e.slot)?e:null;case"ping":case"pong":return Dt(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function ms(t,e,n,a,r){return{proto:os,from:e,term:n,seq:a,sentAt:r,...t}}function $e(){return(performance.timeOrigin+performance.now())/1e3}const An=.003,hs=3,Sn=.002+1e-6,fs=.01,Xa=500;class gs{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?fs:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,a=e?.performanceTime??0;if(!(n>=An&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const r=n-(this.timeOrigin+a)/1e3,o=this.median(),s=r-o,l=Math.abs(r-this.preStepBase),u=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!u&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&u===this.pendingBack&&(u||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,o,u))):(this.pendingStep=s,this.pendingBack=u,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,a){const r=this.ctx.currentTime,o=r<=this.revertUntil;let s;if(a&&o){const l=this.offsets,u=this.preStep;l.length=0;for(let c=0;c<u.length;c++)l.push(u[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:r,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!o){const c=this.offsets,d=this.preStep;d.length=0;for(let p=0;p<c.length;p++)d.push(c[p]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?r+this.stepRevert:-1/0}const l=this.offsets,u=e-n;for(let c=0;c<l.length;c++)l[c]+=u;this.stepCount++,s={stepSeconds:e-n,confirmedAt:r,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const e=this.offsets,n=this.scratch,a=e.length;n.length=a;for(let o=0;o<a;o++){const s=e[o];let l=o-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const r=a>>1;return a%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let n=null,a=!1;const r=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(r&&Number.isFinite(r.contextTime)&&Number.isFinite(r.performanceTime)&&r.contextTime>=An&&r.performanceTime>0)if(this.waitSince=null,r.contextTime===this.lastStampC&&r.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Xa)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=r.contextTime,this.lastStampP=r.performanceTime,this.stampSince=this.perfNow(),n=r.contextTime-(this.timeOrigin+r.performanceTime)/1e3,a=!0;else if(!r||!(r.contextTime>=An)&&!(r.contextTime>0&&!(r.performanceTime>0))){if(r){const o=this.perfNow();if(this.waitSince===null&&(this.waitSince=o),o-this.waitSince<Xa)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const e=this.offsets,n=e.length,a=Math.min(hs,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let r=-1,o=0;for(let l=0;l<n;l++){let u=0;for(let c=0;c<n;c++)Math.abs(e[c]-e[l])<=Sn&&u++;u>o&&(r=l,o=u)}if(o<a)return;const s=e[r];for(let l=n-1;l>=0;l--)Math.abs(e[l]-s)>Sn&&e.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!e||!e.contextTime||!e.performanceTime||!Number.isFinite(e.contextTime)||!Number.isFinite(e.performanceTime))return!0;const n=e.contextTime-(this.timeOrigin+e.performanceTime)/1e3;return Math.abs(n-(this.offset-this.userOffsetMs/1e3))<=Sn}whenSettled(e=1500){if(this.settledNow())return null;const n=this.perfNow()+e;return new Promise(a=>{const r=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(r,2)};setTimeout(r,2)})}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(r)&&r>0?r:null}}class bs{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...En,...e.capabilities},this.channelOption=e.channel??ls,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300,startGate:e.startGate??(()=>null),gatedStartLeadSeconds:e.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,a={}){this.send({type:"snapshot",op:e,slot:n,...a})}requestStart(e){this.gated(n=>this.startNow(e,n))||this.startNow(e)}startNow(e,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}gated(e){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const r=this.o.now(),o=()=>{n===this.startWaits&&e(r)};return a.then(o,o),!0}requestStop(e){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(e){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const r=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(r),0)}else{const r=a+this.o.startLeadSeconds;this.clock.commitStart(e===void 0?r:Math.max(e+this.o.gatedStartLeadSeconds,r),0)}this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,a){const[r,o]=this.tempoRange();e=Math.min(o,Math.max(r,e));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(e),this.broadcastState();return}const u=s.beatAt(l+this.o.minLeadSeconds),c=Math.max(n??er(u,1),u);a&&a>0?(s.tempo.rampTempo(e,c,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,c),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const a of this.peers.values())e=Math.max(e,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(ir,Math.max(ar,e)):ds;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=us(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(e){const n=ps(e);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...En,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...En},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(r=>{this.leader&&this.decideStart(r)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(cs,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,l)=>[o?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(r===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,r=o.id)}this.setLeader(r===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const a=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==r[0]?a[0]<r[0]:a[1]!==r[1]?a[1]<r[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const r=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-a.lastSeen>r&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(ms(e,this.id,this.term,++this.seq,this.o.now()))}}const ys="modulepreload",vs=function(t){return"/studio/"+t},Va={},ws=function(e,n,a){let r=Promise.resolve();if(n&&n.length>0){let s=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=l?.nonce||l?.getAttribute("nonce");r=s(n.map(c=>{if(c=vs(c),c in Va)return;Va[c]=!0;const d=c.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${p}`))return;const f=document.createElement("link");if(f.rel=d?"stylesheet":ys,d||(f.as="script"),f.crossOrigin="",f.href=c,u&&f.setAttribute("nonce",u),document.head.appendChild(f),d)return new Promise((g,b)=>{f.addEventListener("load",g),f.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return e().catch(o)})};var xs=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],_n=[.25,.5,.75,1,1.5,2],$s=4.9,H={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},Re={fmt:"wet"},ce={fmt:"pct"},Ge={fmt:"db"},Bt={fmt:"signedPct"},Mn={fmt:"num",suffix:" ms"},j={div:100};function T(t,e,n,a,r,o,s,l){var u={key:t,label:e,min:n,max:a,default:r,step:1,k:o,unit:null,format:s};if(l)for(var c in l)u[c]=l[c];return u}function Ot(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var vt=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[T("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:H.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[T("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:H.hpHz,astrid:!0,zero:"off"}),T("q","Resonance",0,100,0,2,{fmt:"q",law:H.hpQ},{dsp:{law:H.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[T("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:H.bpHz,astrid:!0},{dsp:{law:H.bpHz}}),T("q","Q",0,100,0,2,{fmt:"q",law:H.bpQ},{dsp:{law:H.bpQ}}),T("mix","Mix",0,100,100,3,Re,{dsp:j,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[T("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Ot(xs),overriddenBy:"beats_free",tempoSynced:!0}),T("feedback","Feedback",0,90,35,2,ce,{dsp:j,unit:"%"}),T("mix","Wet/dry",0,100,0,3,Re,{dsp:j,unit:"%",astridKey:"wet"}),T("tone","Tone",0,100,100,4,{fmt:"hz",law:H.delayTone,offAt:100},{dsp:{div:99},more:!0}),T("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),T("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Ot([[0,"Insert"],[1,"Send"]]),more:!0}),T("send","Send",0,100,100,7,ce,{dsp:j,unit:"%",more:!0}),T("mod_send","Accent → send",-100,100,0,8,Bt,{dsp:j,unit:"%",more:!0}),T("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[T("predelay","Pre-delay",0,200,0,1,Mn,{dsp:{div:1e3},unit:"ms"}),T("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:j,unit:"%"}),T("decay","Decay",0,100,50,3,ce,{dsp:j,unit:"%"}),T("damping","Damping",0,100,0,4,ce,{dsp:j,unit:"%"}),T("mix","Mix",0,100,0,5,Re,{dsp:j,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[T("rate","Rate",0,100,26,1,{fmt:"rate",law:H.rate},{dsp:{law:H.rate}}),T("depth","Depth",0,100,70,2,ce,{dsp:j,unit:"%"}),T("feedback","Feedback",-90,90,50,3,Bt,{dsp:j,unit:"%"}),T("mix","Mix",0,100,50,4,Re,{dsp:j,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[T("rate","Rate",0,100,52,1,{fmt:"rate",law:H.rate},{dsp:{law:H.rate}}),T("depth","Depth",0,100,50,2,ce,{dsp:j,unit:"%"}),T("spread","Spread",0,100,70,3,ce,{dsp:j,unit:"%"}),T("mix","Mix",0,100,40,4,Re,{dsp:j,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[T("rate","Rate",0,100,39,1,{fmt:"rate",law:H.rate},{dsp:{law:H.rate}}),T("depth","Depth",0,100,70,2,ce,{dsp:j,unit:"%"}),T("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Ot([[4,"4"],[6,"6"],[8,"8"]])}),T("feedback","Feedback",0,90,30,4,ce,{dsp:j,unit:"%"}),T("mix","Mix",0,100,50,5,Re,{dsp:j,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[T("low_db","Low",-18,18,0,1,Ge,{unit:"dB"}),T("mid_db","Mid",-18,18,0,2,Ge,{unit:"dB"}),T("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:H.midHz,astrid:!0},{dsp:{law:H.midHz}}),T("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:H.eqQ},{dsp:{law:H.eqQ}}),T("high_db","High",-18,18,0,4,Ge,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[T("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),T("output_db","Output",-12,12,0,2,Ge,{unit:"dB"}),T("mix","Mix",0,100,100,3,Re,{dsp:j,unit:"%"}),T("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Ot([[0,"Smooth"],[1,"Acid"]]),more:!0}),T("tone","Tone",0,100,100,5,{fmt:"hz",law:H.driveTone,offAt:100},{dsp:{div:99},more:!0}),T("mod_drive","Accent → drive",-100,100,0,6,Bt,{dsp:j,unit:"%",more:!0}),T("mod_tone","Accent → tone",-100,100,0,7,Bt,{dsp:j,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[T("threshold_db","Threshold",-60,0,0,1,Ge,{unit:"dB"}),T("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:H.ratio},{dsp:{law:H.ratio}}),T("attack_ms","Attack",1,100,10,3,Mn,{unit:"ms"}),T("release_ms","Release",10,1e3,150,4,Mn,{unit:"ms"}),T("makeup_db","Makeup",0,24,0,5,Ge,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[T("width","Width",0,200,100,1,ce,{dsp:j,unit:"%"}),T("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:j})]}],ks=vt.map(function(t){return t.type}),Es=vt.filter(function(t){return!t.hidden}).map(function(t){return t.type}),As={reverb:"plate"};function fa(t){var e=As[t]||t;return ks.indexOf(e)>=0?e:null}function se(t){for(var e=fa(t),n=0;n<vt.length;n++)if(vt[n].type===e)return vt[n];return null}function Ss(t,e){var n=se(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}function Ve(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function en(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var a=Ve(n.law,e);return a===null?0:a}function Ua(t,e){return Math.min($s,t*60/(e>0?e:120))}var Ka=function(t){return t>0?"+":t<0?"−":""};function Ms(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function rr(t,e,n){var a=t.format,r;switch(a.fmt){case"db":return e===0&&a.zero?a.zero:Ka(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return Ka(e)+Math.abs(e)+"%";case"num":return e+a.suffix;case"fixed":return(a.add+e/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&e>=a.offAt?"off":a.law?(r=Ve(a.law,e),r===null?a.zero||"open":a.astrid?Ms(r):r+" Hz"):e===0&&a.zero?a.zero:e+" Hz";case"q":return"Q "+Ve(a.law,e).toFixed(1);case"ratio":return Ve(a.law,e).toFixed(1)+":1";case"rate":return r=Ve(a.law,e),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var o=0;o<t.options.length;o++)if(t.options[o].value===e)return t.options[o].label;return String(e);case"tempoMs":return Math.round(Ua(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(Ua(e,n)*1e3)+" ms"}return String(e)}var Ls=1,gn=["drive","delay","plate"];function Ts(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(a,r){return rr(t,a,r)},e}var Qe=gn.map(function(t){var e=se(t),n={type:t,label:e.label,dials:e.dials.map(Ts)};return e.tempoSynced&&(n.tempoSynced=!0),n}),Cs={reverb:"plate"};function tn(t){var e=Cs[t]||t;return gn.indexOf(e)>=0?e:null}function bn(t){for(var e=tn(t),n=0;n<Qe.length;n++)if(Qe[n].type===e)return Qe[n];return null}function or(t,e){var n=bn(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}function it(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function Ne(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var a=t.options[0].value,r=1;r<t.options.length;r++)Math.abs(t.options[r].value-e)<Math.abs(a-e)&&(a=t.options[r].value);return a}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*o)/o))+0}function Ns(){return{v:Ls,chain:Qe.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function Fs(t){return _n.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},_n[0])}function Ln(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Is(t){for(var e=Array.isArray(t)?t:Ln(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),a=Ns(),r={},o=[],s=0;s<e.length;s++){var l=e[s];if(Ln(l)){var u=tn(l.type);if(!u){typeof l.type=="string"&&o.push(l.type);continue}if(r[u]){o.push(u);continue}r[u]=!0;var c=a.chain[gn.indexOf(u)],d=Ln(l.dials)?l.dials:{};u==="delay"&&d.mix===void 0&&d.wet!==void 0&&(d=Object.assign({},d,{mix:d.wet})),c.bypass=n?l.bypass===!0:l.bypass!==!1,bn(u).dials.forEach(function(p){c.dials[p.key]=Ne(p,d[p.key])}),zs(u,c.dials,d)}}return{state:a,dropped:o}}function zs(t,e,n){for(var a=bn(t),r=0;r<a.dials.length;r++){var o=a.dials[r];o.stepWhen&&(e[o.key]=Ne(o,n&&typeof n[o.key]=="number"?n[o.key]:e[o.key],it(o,e)))}}function nn(t){return Is(t).state}function Rs(t){return JSON.parse(JSON.stringify(t))}var Ds=24,Wn={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Gn(t,e,n){if(e==="bypass")return n?0:1;var a=or(t,e)||Bs(t,e);return a?en(a,n):0}function Bs(t,e){var n=se(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}var Os={};Qe.forEach(function(t){t.dials.forEach(function(e){Os[t.type+"."+e.key]=e.format})});function Tn(t,e){var n=new Float64Array(Ds),a=nn(t);return a.chain.forEach(function(r){var o=Wn[r.type];n[o.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[o[s]]=Gn(r.type,s,r.dials[s])})}),n}var qs=2,an=3,Ps=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function mt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function sr(t,e){var n=se(t);if(!n)return null;var a={};(e||[]).forEach(function(s){s&&s.id&&(a[s.id]=!0)});for(var r=1;a[n.type+"-"+r];)r++;var o={};return n.dials.forEach(function(s){o[s.key]=s.default}),{id:n.type+"-"+r,type:n.type,bypass:!1,dials:o}}function js(t){var e=se(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function Hs(t,e,n){var a=t.length-1,r=Math.max(0,Math.min(a,n));if(e<0||e>a||e===r)return t;var o=t.slice(),s=o.splice(e,1)[0];return o.splice(r,0,s),o}function _s(t){return typeof t=="number"&&isFinite(t)?Fs(t):t}function Ja(t,e,n){var a={};return t.dials.forEach(function(r){var o=e[r.key];o===void 0&&r.astridKey&&(o=e[r.astridKey]),n&&t.type==="delay"&&r.key==="delay_beats"&&(o=_s(o)),a[r.key]=Ne(r,o)}),t.dials.forEach(function(r){r.stepWhen&&(a[r.key]=Ne(r,typeof e[r.key]=="number"?e[r.key]:a[r.key],it(r,a)))}),a}function Ws(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var a=t.min,r=1/0,o=t.min;o<=t.max;o++){var s=Ve(n.law,o),l=s===null?1/0:Math.abs(s-e);l<r&&(r=l,a=o)}return a}}var Gs={rate:"rate_hz"};function Ys(t,e,n,a){var r={};return t.dials.forEach(function(o){if(!o.more){var s=o.astridKey||Gs[o.key]||o.key;r[o.key]=Ws(o,e[s])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function Zs(t,e){var n=e>0?Math.floor(e):an,a=[],r=[],o=[],s=!1,l=!1;Array.isArray(t)?(o=t,l=!0):mt(t)&&Array.isArray(t.chain)&&(o=t.chain,s=t.v===1,l=t.schema===2);for(var u=[],c=0;c<o.length;c++){var d=o[c];if(mt(d)&&!(d.type==="limiter"||d.fixed===!0)){var p=fa(d.type),f=p&&se(p);if(!f||s&&["drive","delay","plate"].indexOf(p)<0){typeof d.type=="string"&&a.push(d.type);continue}if(u.length>=n){a.push(d.id||p);continue}var g;mt(d.params)&&!mt(d.dials)?g=Ja(f,Ys(f,d.params,r,d.id||p),l):g=Ja(f,mt(d.dials)?d.dials:{},l);var b=sr(p,u),y=typeof d.id=="string"&&Ps.test(d.id)&&!u.some(function(h){return h.id===d.id})?d.id:b.id,m=s?d.bypass!==!1:d.bypass===!0;u.push({id:s?b.id:y,type:p,bypass:m,dials:g})}}return{state:{v:qs,chain:u},dropped:a,notes:r}}function Yt(t,e){return Zs(t,e).state}function Ye(t){var e=se(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(a){n.push([a.k,en(a,t.dials[a.key])])}),n}function Xs(t){var e=Yt(t,8),n=[],a=e.chain.map(function(r,o){var s=se(r.type),l={};return o>=an&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(u){var c=r.dials[u.key];if(u.more){c!==u.default&&n.push(r.id+"."+u.key);return}u.key==="delay_beats"&&_n.indexOf(c)<0&&n.push(r.id+".delay_beats"),l[u.astridKey||u.key]=c}),{id:r.id,type:r.type,bypass:r.bypass,dials:l}});return{hacks:a,lossy:n}}var Vs=150,Us=6e3,Ks=18,lr=6.283185307179586;function yn(t,e,n){return t<e?e:t>n?n:t}function Js(t,e,n,a,r){var o=Math.pow(10,n/40),s=lr*e/r,l=Math.cos(s),u=Math.sin(s),c,d,p,f,g,b,y,m;if(t===0||t===2){y=u/2*Math.SQRT2,m=2*Math.sqrt(o)*y;var h=t===0?1:-1;c=o*(o+1-h*(o-1)*l+m),d=h*2*o*(o-1-h*(o+1)*l),p=o*(o+1-h*(o-1)*l-m),f=o+1+h*(o-1)*l+m,g=-h*2*(o-1+h*(o+1)*l),b=o+1+h*(o-1)*l-m}else y=u/(2*a),c=1+y*o,d=-2*l,p=1-y*o,f=1+y/o,g=-2*l,b=1-y/o;return[c/f,d/f,p/f,g/f,b/f]}function Qs(t,e,n){var a=lr*e/n,r=Math.cos(a),o=Math.sin(a),s=Math.cos(2*a),l=Math.sin(2*a),u=t[0]+t[1]*r+t[2]*s,c=-(t[1]*o+t[2]*l),d=1+t[3]*r+t[4]*s,p=-(t[3]*o+t[4]*l);return 10*Math.log10((u*u+c*c)/(d*d+p*p))}var Qa={};function Fe(t){return Qa[t]||(Qa[t]=Ss("eq",t))}function Xe(t,e){var n=Fe(e),a=t&&typeof t[e]=="number"&&isFinite(t[e])?t[e]:n.default;return yn(a,n.min,n.max)}function cr(t){return[{id:"low",kind:0,hz:Vs,db:Xe(t,"low_db"),q:Math.SQRT1_2},{id:"mid",kind:1,hz:en(Fe("mid_hz"),Xe(t,"mid_hz")),db:Xe(t,"mid_db"),q:en(Fe("mid_q"),Xe(t,"mid_q"))},{id:"high",kind:2,hz:Us,db:Xe(t,"high_db"),q:Math.SQRT1_2}]}function el(t,e,n){for(var a=cr(t),r=n.length,o=new Float64Array(r),s=[],l=e/2,u=0;u<a.length;u++){var c=a[u],d=new Float64Array(r);if(c.db!==0)for(var p=Js(c.kind,c.hz,c.db,c.q,e),f=0;f<r;f++){var g=n[f]<l?n[f]:l*.9999;d[f]=Qs(p,g,e),o[f]+=d[f]}s.push(d)}return{total:o,bands:s}}function tl(t){var e=Fe("mid_hz").dsp.law;return yn(e.div*Math.log(t/e.pow[0])/Math.log(e.pow[1]),0,100)}function nl(t){var e=Fe("mid_q").dsp.law;return yn(e.div*Math.log(t/e.pow[0])/Math.log(e.pow[1]),0,100)}var rn={low:"low_db",mid:"mid_db",high:"high_db"},al={low:"Low",mid:"Mid",high:"High"};function il(t,e,n){var a=[];function r(o,s){var l=Fe(o),u=l.step||1;s=yn(Math.round(s/u)*u,l.min,l.max),s===0&&(s=0),s!==Xe(t,o)&&a.push([o,s])}return typeof n.db=="number"&&rn[e]&&r(rn[e],n.db),e==="mid"&&typeof n.hz=="number"&&n.hz>0&&r("mid_hz",tl(n.hz)),e==="mid"&&typeof n.q=="number"&&n.q>0&&r("mid_q",nl(n.q)),a}function rl(t){var e=t==="mid"?["mid_db","mid_hz","mid_q"]:rn[t]?[rn[t]]:[];return e.map(function(n){return[n,Fe(n).default]})}var qt=typeof WeakMap=="function"?new WeakMap:null;function ol(t){var e=t&&t.output;if(!e||!e.context||typeof e.context.createAnalyser!="function")return null;var n=qt&&qt.get(t);return n||(n={node:null,users:0,handle:null},n.handle={open:function(){return t.status==="disposed"?null:(n.node||(n.node=e.context.createAnalyser(),n.node.fftSize=4096,n.node.smoothingTimeConstant=.8,n.node.minDecibels=-110,n.node.maxDecibels=0),n.users++===0&&e.connect(n.node),n.node)},close:function(){if(n.users!==0&&--n.users===0&&n.node)try{e.disconnect(n.node)}catch{}}},qt&&qt.set(t,n)),n.handle}function sl(t,e,n){var a=n||{},r={};["low_db","mid_db","mid_hz","mid_q","high_db"].forEach(function(d){var p=t&&typeof t.getParam=="function"?t.getParam(e,d):void 0;r[d]=typeof p=="number"?p:Fe(d).default});var o=t&&t.output&&t.output.context,s=a.sampleRate||o&&o.sampleRate||48e3,l=a.help||{},u=cr(r).map(function(d){var p=(d.db>0?"+":d.db<0?"−":"")+Math.abs(d.db)+" dB",f=d.hz>=1e3?(d.hz/1e3).toFixed(d.hz>=1e4?0:1)+" kHz":Math.round(d.hz)+" Hz";return{id:d.id,label:al[d.id],kind:d.kind===0?"lowshelf":d.kind===1?"peak":"highshelf",hz:d.hz,db:d.db,q:d.q,moveHz:d.id==="mid",moveQ:d.id==="mid",minHz:d.id==="mid"?200:d.hz,maxHz:d.id==="mid"?5e3:d.hz,minQ:.3,maxQ:6,valueText:d.id==="mid"?p+" at "+f+", Q "+d.q.toFixed(1):p+(d.id==="low"?", shelf below ":", shelf above ")+f,help:l[d.id]}}),c=function(d){for(var p=0;p<d.length;p++)a.set(d[p][0],d[p][1])};return{type:"eqGraph",id:a.id,label:a.label||"EQ curve",range:Ks,sampleRate:s,on:a.on!==!1,bands:u,help:l.graph,response:function(d){return el(r,s,d)},spectrum:a.spectrum===!1?void 0:ol(t)||void 0,onBand:function(d,p){c(il(r,d,p))},onReset:function(d){c(rl(d).filter(function(p){return p[1]!==r[p[0]]}))}}}var ll="nc-fx@1",cl=600,dl=256,ul=8,ht=typeof WeakMap=="function"?new WeakMap:null;function pl(t,e){var n=ht&&ht.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var a=(await ws(async()=>{const{default:o}=await import("./worklet-source-Cg0XnXjY.js");return{default:o}},[])).default,r=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await t.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),ht&&(ht.set(t,n),n.catch(function(){ht.delete(t)})),n)}function Ze(t,e){return typeof t=="number"&&isFinite(t)?t:e}function dr(t,e,n,a){var r=Math.min(400,Math.max(20,Ze(e.bpm,120))),o=[],s=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",u=Ze(e.preGain,1),c=Math.max(0,Ze(e.crossfade,.012)),d=Ze(e.maxDelaySeconds,void 0),p=t.createGain(),f=t.createGain(),g=t.createGain(),b=t.createGain(),y=null;e.modInput===!0&&(y=t.createGain(),y.channelCount=1,y.channelCountMode="explicit",y.channelInterpretation="discrete"),b.gain.value=0,p.connect(g),g.connect(f),b.connect(f);var m={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r},h=n(r);m.post=function(x){m.node?m.node.port.postMessage(x):m.disposed||(o.length>=dl&&(o=a().concat([{t:"tempo",bpm:m.bpm,when:0}])),o.push(x))};function v(x){var A=o.map(function(E){var M=Object.assign({},E);return M.when>x||(M.when=0,M.t!=="clear"&&(M.snap=!0)),M});return o=[],A}m.emit=function(x){for(var A=0;A<m.listeners.length;A++)try{m.listeners[A](x)}catch(E){typeof console<"u"&&console.error(E)}},m.whenOf=function(x){return typeof x=="number"&&isFinite(x)&&x>0?x:0};var w=!1;m.tooFar=function(x){return typeof x=="number"&&x>t.currentTime+cl?(!w&&typeof console<"u"&&(w=!0,console.warn("nc-fx: ignoring a time "+Math.round(x-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var k=pl(t,e.moduleUrl).then(function(){if(!m.disposed){var x=Object.assign({bpm:r,bypassMode:l,limiter:s,preGain:u,maxDelaySeconds:d},h);x.pending=v(t.currentTime),m.node=new AudioWorkletNode(t,ll,{numberOfInputs:y?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:x}),p.connect(m.node),y&&y.connect(m.node,0,1),m.node.connect(b);var A=t.currentTime;A<=0||c===0?(g.gain.value=0,b.gain.value=1):(g.gain.setValueAtTime(1,A),g.gain.linearRampToValueAtTime(0,A+c),b.gain.setValueAtTime(0,A),b.gain.linearRampToValueAtTime(1,A+c)),m.status="ready"}},function(x){m.status="unavailable",o=[],m.error=x});return m.core={input:p,output:f,modInput:y,ready:k,get status(){return m.status},get error(){return m.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:s,setTempo:function(x,A){var E=Ze(x,NaN);!(E>0)||m.disposed||m.tooFar(A)||(m.bpm=Math.min(400,Math.max(20,E)),m.post({t:"tempo",bpm:m.bpm,when:m.whenOf(A)}),m.emit({effect:null,key:"tempo",value:m.bpm}))},getTempo:function(){return m.bpm},clear:function(x){var A=x&&typeof x=="object"?x:{at:x};if(!(m.disposed||m.tooFar(A.at))){var E=Ze(A.fadeMs,0);m.post({t:"clear",when:m.whenOf(A.at),fadeMs:E>0?Math.min(1e3,E):0})}},onChange:function(x){return m.listeners.push(x),function(){var A=m.listeners.indexOf(x);A>=0&&m.listeners.splice(A,1)}},dispose:function(){if(!m.disposed){if(m.disposed=!0,m.status="disposed",o=[],m.listeners.length=0,m.node){m.node.port.postMessage({t:"dispose"}),m.node.port.close();try{m.node.disconnect()}catch{}}[p,g,b,f,y].forEach(function(x){try{x&&x.disconnect()}catch{}})}}},m}function ei(t,e){var n=e||{};if(n.slots)return ml(t,n);var a=nn(n.state),r=Array.from(Tn(a)),o=dr(t,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(Tn(a)),when:0}]}),s=o.core;function l(u){return a.chain[gn.indexOf(u)]}return s.setParam=function(u,c,d,p){var f=tn(u);if(!(!f||o.disposed||o.tooFar(p))){var g=l(f),b;if(c==="bypass")b=!!d;else{var y=or(f,c);if(!y)return;b=Ne(y,d,it(y,g.dials))}return c==="bypass"?g.bypass=b:g.dials[c]=b,o.post({t:"p",i:Wn[f][c],v:Gn(f,c,b),when:o.whenOf(p)}),o.emit({effect:f,key:c,value:b}),bn(f).dials.forEach(function(m){if(!(!m.stepWhen||!m.stepWhen.some(function(w){return w.key===c}))){var h=g.dials[m.key],v=Ne(m,h,it(m,g.dials));v!==h&&(g.dials[m.key]=v,o.post({t:"p",i:Wn[f][m.key],v:Gn(f,m.key,v),when:o.whenOf(p)}),o.emit({effect:f,key:m.key,value:v}))}}),b}},s.getParam=function(u,c){var d=tn(u);if(d){var p=l(d);return c==="bypass"?p.bypass:p.dials[c]}},s.getState=function(){return Rs(a)},s.setState=function(u,c){o.disposed||o.tooFar(c&&c.at)||(a=nn(u),o.post({t:"load",program:Array.from(Tn(a)),when:o.whenOf(c&&c.at)}),o.emit({effect:null,key:null,value:null}))},s}function ml(t,e){var n=e.slots===!0?an:Math.max(1,Math.min(ul,Math.floor(+e.slots)||an)),a=Yt(e.state,n),r=1,o={};function s(m){return o[m.id]||(o[m.id]=r++),o[m.id]}function l(m){return m.map(function(h){return{uid:s(h),type:h.type,program:Ye(h)}})}var u=l(a.chain),c=a.chain.map(function(m){return o[m.id]}),d=dr(t,e,function(){return{slots:n,chain:u,order:c}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(m){return o[m.id]}),when:0}]}),p=d.core;function f(m){var h;for(h=0;h<a.chain.length;h++)if(a.chain[h].id===m)return a.chain[h];var v=fa(m);if(v){for(h=0;h<a.chain.length;h++)if(a.chain[h].type===v)return a.chain[h]}return null}function g(m,h){var v=s(m);d.post({t:"add",uid:v,type:m.type,when:h}),Ye(m).forEach(function(w){d.post({t:"ps",uid:v,k:w[0],v:w[1],when:h,snap:!0})})}function b(m){d.post({t:"order",uids:a.chain.map(function(h){return o[h.id]}),when:m})}function y(m,h){var v={};a.chain.forEach(function(x){v[x.id]=x});var w=a.chain.map(function(x){return o[x.id]}).join();m.chain.forEach(function(x){var A=v[x.id];if(!A||A.type!==x.type){delete o[x.id],g(x,h);return}var E={};Ye(A).forEach(function(M){E[M[0]]=M[1]}),Ye(x).forEach(function(M){E[M[0]]!==M[1]&&d.post({t:"ps",uid:o[x.id],k:M[0],v:M[1],when:h})})});var k={};m.chain.forEach(function(x){k[x.id]=!0}),Object.keys(o).forEach(function(x){k[x]||delete o[x]}),a=m,a.chain.map(function(x){return o[x.id]}).join()!==w&&b(h)}return p.slots=n,p.setParam=function(m,h,v,w){var k=f(m);if(!(!k||d.disposed||d.tooFar(w))){var x=se(k.type),A,E=null;if(h==="bypass")A=!!v;else{for(var M=0;M<x.dials.length;M++)x.dials[M].key===h&&(E=x.dials[M]);if(!E)return;A=Ne(E,v,it(E,k.dials))}var I={},q={};Ye(k).forEach(function(z){I[z[0]]=z[1]}),x.dials.forEach(function(z){z.stepWhen&&(q[z.key]=k.dials[z.key])}),h==="bypass"?k.bypass=A:k.dials[h]=A,x.dials.forEach(function(z){z.stepWhen&&(k.dials[z.key]=Ne(z,k.dials[z.key],it(z,k.dials)))});var Z=d.whenOf(w),ee=o[k.id];return Ye(k).forEach(function(z){(I[z[0]]!==z[1]||E&&z[0]===E.k)&&d.post({t:"ps",uid:ee,k:z[0],v:z[1],when:Z})}),d.emit({effect:k.id,key:h,value:A}),Object.keys(q).forEach(function(z){z!==h&&k.dials[z]!==q[z]&&d.emit({effect:k.id,key:z,value:k.dials[z]})}),A}},p.getParam=function(m,h){var v=f(m);if(v)return h==="bypass"?v.bypass:v.dials[h]},p.getState=function(){return JSON.parse(JSON.stringify(a))},p.setState=function(m,h){d.disposed||d.tooFar(h&&h.at)||(y(Yt(m,n),d.whenOf(h&&h.at)),d.emit({effect:null,key:null,value:null}))},p.addEffect=function(m,h){var v=h||{},w=sr(m,a.chain);if(!(!w||a.chain.length>=n||d.disposed||d.tooFar(v.at))){if(v.dials){var k=Yt({v:2,chain:[{id:w.id,type:w.type,dials:v.dials}]},1).chain[0];w.dials=k.dials}v.bypass===!0&&(w.bypass=!0);var x=a.chain.slice(),A=typeof v.index=="number"?Math.max(0,Math.min(x.length,v.index)):x.length;return x.splice(A,0,w),y({v:2,chain:x},d.whenOf(v.at)),d.emit({effect:w.id,key:"chain",value:"add"}),w.id}},p.removeEffect=function(m,h){var v=f(m),w=h&&h.at;return!v||d.disposed||d.tooFar(w)?!1:(y({v:2,chain:a.chain.filter(function(k){return k!==v})},d.whenOf(w)),d.emit({effect:v.id,key:"chain",value:"remove"}),!0)},p.moveEffect=function(m,h,v){var w=f(m),k=v&&v.at;if(!w||d.disposed||d.tooFar(k))return!1;var x=Hs(a.chain,a.chain.indexOf(w),h);return x===a.chain?!1:(y({v:2,chain:x},d.whenOf(k)),d.emit({effect:w.id,key:"chain",value:"move"}),!0)},p.getChain=function(){return a.chain.map(function(m){return{id:m.id,type:m.type,name:js(m),bypass:m.bypass}})},p.toAstrid=function(){return Xs(a)},p}function ti(t,e){return typeof t=="number"?t:t?typeof t.bpmAt=="function"?+t.bpmAt(e||0):typeof t.bpm=="number"?t.bpm:NaN:NaN}function ur(t,e,n){var a=n||{},r=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,o=typeof a.toAudioTime=="function"?a.toAudioTime:r?function(f){return r.toContextTime(f)}:e&&e.timebase==="shared"?null:function(f){return f},s=typeof a.now=="function"?a.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,l=e&&e.transport?e.transport:e,u=l&&l.tempo?l.tempo:l,c=!1;function d(f){if(!o){!c&&typeof console<"u"&&(c=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof f!="number")){var g=o(l.timeAt(f));return typeof g=="number"&&isFinite(g)?g:void 0}}function p(){var f=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(f)){var g=l&&typeof l.bpm=="number"?l.bpm:ti(u,0);g>0&&t.setTempo(g);return}var b=ti(u,f);b>0&&t.setTempo(b);for(var y=u&&(u.points||u.tempoPoints)||[],m=0;m<y.length;m++){var h=y[m];if(h.beat>f&&h.bpm>0){var v=d(h.beat);v!==void 0&&t.setTempo(h.bpm,v)}}}return p(),!e||typeof e.onChange!="function"?function(){}:e.onChange(function(f){f&&(f.kind==="tempo"&&f.bpm>0?t.setTempo(f.bpm,d(f.atBeat)):(f.kind==="snapshot"||f.kind==="start")&&p())})}const Yn="/studio/assets/worklet-CnpUVY5i.js";var hl="nc-ui",fl={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","nyx-amber":"#FEAA02","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},ga={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"112px","eq-graph-height-max":"248px","eq-node-size":"12px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#9A6B34","eq-band-2":"#B8443A","eq-band-3":"#774A84","eq-panel-layer":"10","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#9B30FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},on={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},gl={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Oe={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},bl={light:{color:fl.color,semantic:ga,component:on,runtime:gl},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#2C2B2A",accent:"#69A7D3","accent-wash":"rgba(105,167,211,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","shade-1":"#201F1E","shade-2":"#252423","shade-3":"#2A2928","shade-4":"#2F2E2D","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#9F9E9D","sub-1":"#8D8C8B","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#353433","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#5A8BAE","filter-red":"#DC746A","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#9F9E9D",divider:"#353433","surface-raised":"#2C2B2A",accent:"#69A7D3","accent-tint":"#272E32","accent-soft":"rgba(105,167,211,0.1)","accent-faint":"rgba(105,167,211,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#201F1E","module-bg-adjacent-2":"#252423","module-bg-adjacent-3":"#2A2928","module-bg-adjacent-4":"#2F2E2D","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#8D8C8B","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#353433","slider-progress":"#69A7D3","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#69A7D3",playhead:"#69A7D3","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#2C2B2A","slot-active-bg":"#69A7D3","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#4B91C3","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#69A7D3","meter-clip":"#DD7D6E","meter-track":"#353433","meter-width":"8px","clip-size":"6px","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#69A7D3","strip-bg":"#201F1E","strip-alt-bg":"#252423","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"112px","eq-graph-height-max":"248px","eq-node-size":"12px","eq-graph-bg":"#1A1918","eq-curve":"#69A7D3","eq-fill":"#6E9CD8","eq-grid":"#353433","eq-spectrum":"#90A0C1","eq-band-1":"#CC985C","eq-band-2":"#DC746A","eq-band-3":"#BB93C8","eq-panel-layer":"10","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#5A8BAE","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#69A7D3",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(105,167,211,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#69A7D3","track-mute":"#9F9E9D","track-solo":"#69A7D3","velocity-bar":"#69A7D3","velocity-min":"#5A8FB5","velocity-max":"#69A7D3","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#69A7D3","lane-3":"#CC985C","lane-4":"#9F9E9D","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#2C2B2A","surprise-ink":"#E8E7E6","surprise-on":"#69A7D3","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},gt=t=>`--${hl}-${t}`,Zn=ga["label-on-fill-dark"],ni=ga["label-on-fill-light"],yl=Oe["label-min-contrast"],vl=/^#[0-9a-f]{6}$/i,wl=t=>typeof t=="string"&&vl.test(t),Zt=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function ai(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));let a=e*Math.min(n,1-n),r=o=>{let s=(o+t/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${Zt(r(0)*255)}${Zt(r(8)*255)}${Zt(r(4)*255)}`}function pr(t){let[e,n,a]=[1,3,5].map(c=>parseInt(t.slice(c,c+2),16)/255),r=Math.max(e,n,a),o=Math.min(e,n,a),s=(r+o)/2,l=r-o;if(!l)return{h:0,s:0,l:s};let u=l/(1-Math.abs(2*s-1));return{h:((r===e?60*((n-a)/l%6):r===n?60*((a-e)/l+2):60*((e-n)/l+4))+360)%360,s:u,l:s}}function ii(t){let[e,n,a]=[1,3,5].map(r=>{let o=parseInt(t.slice(r,r+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*a}function Xn(t,e){let[n,a]=[ii(t),ii(e)].sort((r,o)=>o-r);return(n+.05)/(a+.05)}var sn=t=>Xn(t,Zn)>=Xn(t,ni)?Zn:ni;function mr(t,e,n,a=yl){let r=ai(t,e,n),o=sn(r)===Zn?1:-1;for(let s=0;s<40&&Xn(r,sn(r))<a;s++)n+=o*.01,r=ai(t,e,n);return r}function xl(t){let{h:e,s:n}=pr(t),a=mr(e,Math.min(n,Oe["surprise-on-max-saturation"]),Oe["surprise-on-lightness"]);return{fill:t,ink:sn(t),on:a,onInk:sn(a)}}var $l=(t,e)=>{let n=Math.abs(t-e)%360;return Math.min(n,360-n)};function kl(t,e=Math.random){let[n,a]=Oe["surprise-saturation"],[r,o]=Oe["surprise-lightness"],s=Oe["surprise-min-hue-gap"],l=wl(t)?pr(t).h:null,u=e()*360;return l!==null&&$l(u,l)<s&&(u=(l+s+e()*(360-2*s))%360),mr(u,n+e()*(a-n),r+e()*(o-r))}function El(t){if(!t)return null;let e=xl(t);return{[gt("surprise-fill")]:e.fill,[gt("surprise-ink")]:e.ink,[gt("surprise-on")]:e.on,[gt("surprise-on-ink")]:e.onInk}}var Al=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,Sl=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function ri(t){let[e,n,a]=[1,3,5].map(l=>Al(parseInt(t.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*a),o=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*a);return[.2104542553*r+.793617785*o-.0040720468*s,1.9779984951*r-2.428592205*o+.4505937099*s,.0259040371*r+.7827717662*o-.808675766*s]}function Ml([t,e,n]){let a=(t+.3963377774*e+.2158037573*n)**3,r=(t-.1055613458*e-.0638541728*n)**3,o=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*r+.2309699292*o,-1.2684380046*a+2.6097574011*r-.3413193965*o,-.0041960863*a-.7034186147*r+1.707614701*o].map(s=>Zt(Sl(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Ll=Oe["velocity-range"],hr={min:on.rhythm["velocity-min"],max:on.rhythm["velocity-max"]},oi=Object.fromEntries(Object.entries(bl).map(([t,e])=>[t,{min:e.component.rhythm["velocity-min"],max:e.component.rhythm["velocity-max"],ink:e.component.rhythm["step-cell-ink"]}]));function Tl(t,e=hr){let[n,a]=Ll,r=Number.isFinite(t)?Math.max(n,Math.min(a,t)):n,o=(r-n)/(a-n),s=e.ink??on.rhythm["step-cell-ink"];if(o<=0)return{velocity:r,t:0,fill:e.min.toUpperCase(),ink:s};if(o>=1)return{velocity:r,t:1,fill:e.max.toUpperCase(),ink:s};let l=ri(e.min),u=ri(e.max);return{velocity:r,t:o,fill:Ml(l.map((c,d)=>c+(u[d]-c)*o)),ink:s}}function si(t,e=hr){return{[gt("velocity-fill")]:Tl(t,e).fill}}var ln="data-nc-theme",Vn="nc-ui-theme-change",Cl=Object.freeze(["system","light","dark"]),Nl="netcomposer.studio.theme.v1",Fl="(prefers-color-scheme: dark)",ba=t=>t?.documentElement??null,fr=t=>t?.defaultView?.matchMedia?.(Fl)??null,ya=t=>t==="light"||t==="dark"?t:"system";function Il(t=globalThis.document){return ya(ba(t)?.getAttribute(ln))}function cn(t=globalThis.document){let e=Il(t);return e!=="system"?e:fr(t)?.matches?"dark":"light"}function va(t,e=globalThis.document){let n=ba(e);if(!n)return"light";let a=ya(t);a==="system"?n.removeAttribute(ln):n.setAttribute(ln,a);let r=cn(e),o=e.defaultView?.CustomEvent;return o&&e.dispatchEvent(new o(Vn,{detail:{choice:a,theme:r}})),r}function gr(t,e=globalThis.document){let n=ba(e);if(!n)return()=>{};let a=cn(e),r=()=>{let u=cn(e);u!==a&&(a=u,t(u))},o=e.defaultView?.MutationObserver,s=o?new o(r):null;s?.observe(n,{attributes:!0,attributeFilter:[ln]});let l=fr(e);return l?.addEventListener?.("change",r),e.addEventListener(Vn,r),()=>{s?.disconnect(),l?.removeEventListener?.("change",r),e.removeEventListener(Vn,r)}}var zl={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Rl={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","eq-graph-height":"length","eq-graph-height-max":"length","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Dl={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Bl={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},vn={};for(let[t,e]of Object.entries(Rl))vn[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(let[t,e]of Object.entries(Bl))vn[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(let[t,e]of Object.entries(Dl))vn[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map(zl.renames.map(t=>[t.old,t.new]));function br(t){let e=vn[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function G(t){return br(t).prop}function i(t){return`var(${G(t)})`}function Ol(t,e){if(!(t instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(t).getPropertyValue(G(e)));return Number.isFinite(n)?n:0}function U(t,e){let n=br(e),a=t.ownerDocument??document,r=a.createElement("span");r.dataset.ncLive=e,r.style.position="absolute",r.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=o:r.style.color=o,(t instanceof Element?t:a.documentElement).append(r);let s=(a.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function ql(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function Pl(t){let e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=i("font-ui"),n.style.fontSize=i("label-size"),n.style.fontWeight=i("label-weight"),(t instanceof Element?t:e.documentElement).append(n);let a=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var jl="[data-modulated], [data-modulated] *";function Hl(){let t=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${G("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${G("divider")}: ${i(`module-div-stack-${a}`)};
      ${G("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,e=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${G("text-sub")}: ${i("module-sub-stack-1")};
      ${G("divider")}: ${i("module-div-stack-1")};
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
.nc-section:has(> .nc-field[data-nc-slider]) { row-gap: ${i("module-pad")}; }
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
${jl} { transition: none; }
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
  box-shadow: 0 0 0 calc(${i("hairline")} * 2) ${i("eq-graph-bg")};
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
  .nc-fold-toggle::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${i("target-min")});
    height: max(100%, ${i("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-strip[data-nc-folded] > .nc-strip-ms { gap: 0; }
  .nc-strip[data-nc-folded] .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: 0; margin-top: calc(${i("module-gap")} * -1); }
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
  ${G("text-sub")}: ${i("module-sub-stack-1")};
  ${G("divider")}: ${i("module-div-stack-1")};
  ${G("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-template-columns: repeat(3, ${i("fx-card-width")});
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
  ${G("text-sub")}: ${i("module-sub-stack-1")};
  ${G("divider")}: ${i("module-div-stack-1")};
  ${G("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${i("control-gap")} ${i("module-pad")};
  padding-bottom: ${i("module-pad")};
  background: ${i("module-bg-stack-1")};
  ${G("text-sub")}: ${i("module-sub-stack-1")};
  ${G("divider")}: ${i("module-div-stack-1")};
  ${G("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${G("text-sub")}: inherit;
  ${G("divider")}: inherit;
  ${G("slider-track")}: inherit;
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { background: ${i("module-bg-adjacent-2")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { background: ${i("module-bg-adjacent-3")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { background: ${i("module-bg-adjacent-4")}; }
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
    width: ${i("fx-fold-width")};
    padding-inline: 0;
  }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd { display: none; }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-folded] > .nc-ui-fx-fold { display: flex; }
}
/* A maximized card in a console row takes three cards' width (the whole fx row), folded neighbours or not. */
@media (min-width: 769px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] > .nc-ui-fx[data-nc-max="row"] { grid-column: span 3; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx[data-nc-max="row"][data-nc-max="row"] {
    width: calc(${i("fx-card-width")} * 3);
  }
}
/* One channel strip: name, M and S, sends, then the fader with its scale and meter, then the readout. Every strip
   (the master too, with empty M/S and send rows) keeps the same row heights, so faders and ticks line up. */
.nc-strip {
  position: relative;
  flex: none;
  width: ${i("strip-width")};
  display: grid;
  /* Name, Inserts, M/S, sends, pan, the fader body, the readout. */
  grid-template-rows: auto ${i("slider-pitch")} ${i("slider-pitch")} calc(${i("knob-size")} + ${i("control-gap")} + ${i("label-size")} * ${i("label-leading")}) calc(${i("knob-size")} + ${i("control-gap")} + ${i("label-size")} * ${i("label-leading")}) auto auto;
  justify-items: center;
  row-gap: ${i("module-gap")};
  min-width: 0;
  padding-inline: ${i("control-gap")};
}
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
.nc-strip[data-nc-folded] { width: ${i("strip-fold-width")}; padding-inline: 0; align-content: start; }
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
.nc-strip[data-nc-folded] > .nc-strip-ms { grid-row: 2 / span 2; flex-direction: column; height: auto; gap: ${i("module-gap")}; }
.nc-strip[data-nc-folded] .nc-ms-wrap { width: ${i("slider-pitch")}; }
/* Touch: each folded M and S a full target-min box (after the rule above, so it wins). */
@media (pointer: coarse) {
  .nc-strip[data-nc-folded] .nc-ms-wrap { width: ${i("target-min")}; }
}
.nc-strip[data-nc-folded] > .nc-strip-body {
  grid-row: 6;
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
.nc-strip-ms { display: flex; gap: ${i("control-gap")}; height: ${i("slider-pitch")}; }
/* Hacks: a full-width toggle above M and S, in mixed case and a lighter grey (Peter); pressed while the console's fx area shows this strip's stack. */
.nc-strip-hacks { display: flex; width: 100%; height: ${i("slider-pitch")}; }
.nc-hacks-wrap { position: relative; flex: 1 1 auto; height: ${i("slider-pitch")}; }
.nc-hacks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  /* A light outline at rest (Peter, 2026-10-31): the divider; text-sub on hover, so it still reads as a button. */
  border: ${i("hairline")} solid ${i("divider")};
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
/* On the darker alternate strips the divider outline nearly vanishes: text-sub at 50% there (still lighter than the
   old outline); hover still takes it to text-sub. */
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) .nc-hacks:not([aria-pressed="true"]) {
  border-color: color-mix(in oklab, ${i("text-sub")} 50%, ${i("divider")});
}
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) .nc-hacks:not([aria-pressed="true"]):hover { border-color: ${i("text-sub")}; }
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
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
/* Tablets (769-1023 px): the fx row is full width under the strips; with a card folded, the open ones share the rest. */
@media (min-width: 769px) and (max-width: 1023px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx:not([data-nc-folded]) {
    flex: 1 1 0;
    width: auto;
    min-width: 0;
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
`}var Cn=null,_l="nc-ui-fallback";function yr(t=globalThis.document){if(!t?.documentElement||(t.documentElement,Cn&&Cn.ownerDocument===t))return;let e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${_l} {
${Hl()}
}
`,t.head.append(e),Cn=e}var ft=null,Wl=0,Gl=new URL("data:text/css;base64,LyogbmMtdWkgY29uZmlybSAoY29uZmlybS5qcyBsaW5rcyB0aGlzIGZpbGUgb25jZSBwZXIgZG9jdW1lbnQ7IG5vIGtpdC5qcyBuZWVkZWQpLiBPbmUgcXVlc3Rpb24gb3ZlciBhIGRpbW1lZCwKICAgaW5lcnQgcGFnZS4gQ2FuY2VsIGlzIGFuIG91dGxpbmVkIGJ1dHRvbiBsaWtlIC5uYy1idG47IHRoZSBhY3Rpb24gZmlsbHMgd2l0aCBkYW5nZXIgd2hlbiBpdCBpcyBkZXN0cnVjdGl2ZS4gVGhlCiAgIGxheWVyIGZhZGVzIGluIHdpdGggbW90aW9uLWZhZGUgYW5kIG91dCB3aXRoIG1vdGlvbi1mYWRlLW91dCwgdGhlIGJveCBzY2FsZXMgaW4gd2l0aCBtb3Rpb24tc2xpZGUuCiAgIFNlbWFudGljIHRva2VucyBvbmx5LiBFdmVyeSB2YXIoKSBjYXJyaWVzIHRoZSB0b2tlbidzIGN1cnJlbnQgdmFsdWUgYXMgaXRzIGZhbGxiYWNrLCBzbyB0aGUgZGlhbG9nIGxvb2tzIHRoZSBzYW1lCiAgIGluIGFuIGFwcCB3aXRob3V0IG5jLXVpIHRva2VucyAoQmFzcyk7IHRlc3QvY29uZmlybS50ZXN0Lm1qcyBjaGVja3MgZWFjaCBmYWxsYmFjayBhZ2FpbnN0IGRpc3QvdG9rZW5zLmpzLiAqLwoubmMtdWktY29uZmlybS1sYXllciwKLm5jLXVpLWNvbmZpcm0tbGF5ZXIgKiB7CiAgYm94LXNpemluZzogYm9yZGVyLWJveDsKfQoubmMtdWktY29uZmlybS1sYXllciB7CiAgcG9zaXRpb246IGZpeGVkOwogIGluc2V0OiAwOwogIHotaW5kZXg6IDMwOwogIGRpc3BsYXk6IGdyaWQ7CiAgcGxhY2UtaXRlbXM6IGNlbnRlcjsKICBwYWRkaW5nOiB2YXIoLS1uYy11aS1kaWFsb2ctcGFkLCAxNnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1kaWFsb2ctc2NyaW0sIHJnYmEoMzYsMzYsMzYsMC4zNSkpOwogIG9wYWNpdHk6IDA7CiAgdG91Y2gtYWN0aW9uOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUsIC4ycykgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtZWFzaW5nLCBlYXNlKTsKfQovKiBJbiB0aGUgU3R1ZGlvIHRoZSBpbnN0cnVtZW50J3MgZnJhbWUgaXMgYXMgdGFsbCBhcyBpdHMgcGFnZTogdGhlIGxheWVyIGNvdmVycyB0aGUgcGFydCB5b3UgY2FuIHNlZSAodGhlIFN0dWRpbwogICB3cml0ZXMgaXQgYXMgLS1uYy1ob3N0LXRvcCAvIC0tbmMtaG9zdC1ib3R0b20pLCBzbyB0aGUgcXVlc3Rpb24gc2l0cyBvbiBzY3JlZW4sIG5vdCBtaWQtcGFnZS4gKi8KaHRtbFtkYXRhLW5jLWhvc3RlZF0gLm5jLXVpLWNvbmZpcm0tbGF5ZXIgewogIHRvcDogdmFyKC0tbmMtaG9zdC10b3AsIDBweCk7CiAgYm90dG9tOiB2YXIoLS1uYy1ob3N0LWJvdHRvbSwgMHB4KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gewogIG9wYWNpdHk6IDE7Cn0KLm5jLXVpLWNvbmZpcm0tbGF5ZXJbZGF0YS1zdGF0ZT0iY2xvc2luZyJdIHsKICBvcGFjaXR5OiAwOwogIHBvaW50ZXItZXZlbnRzOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtb3V0LCAuMjVzKSB2YXIoLS1uYy11aS1tb3Rpb24tZmFkZS1vdXQtZWFzaW5nLCBlYXNlLW91dCk7Cn0KLm5jLXVpLWNvbmZpcm0gewogIGRpc3BsYXk6IGZsZXg7CiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1nYXAsIDEycHgpOwogIHdpZHRoOiBtaW4odmFyKC0tbmMtdWktZGlhbG9nLXdpZHRoLCAzMjBweCksIDEwMCUpOwogIHBhZGRpbmc6IHZhcigtLW5jLXVpLWRpYWxvZy1wYWQsIDE2cHgpOwogIGJvcmRlcjogdmFyKC0tbmMtdWktaGFpcmxpbmUsIDFweCkgc29saWQgdmFyKC0tbmMtdWktZGl2aWRlciwgI0RERERERCk7CiAgYm9yZGVyLXJhZGl1czogdmFyKC0tbmMtdWktZGlhbG9nLXJhZGl1cywgMnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXBhZ2UsICNGNUY1RjUpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LCAjMjQyNDI0KTsKICBmb250LWZhbWlseTogdmFyKC0tbmMtdWktZm9udC11aSwgJ0ludGVyJywgJ0dlaXN0Jywgc2Fucy1zZXJpZik7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGZvbnQtd2VpZ2h0OiB2YXIoLS1uYy11aS10aXRsZS13ZWlnaHQsIDQwMCk7CiAgbGluZS1oZWlnaHQ6IHZhcigtLW5jLXVpLWRpYWxvZy1sZWFkaW5nLCAxLjM1KTsKICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpOwogIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS1uYy11aS1tb3Rpb24tc2xpZGUsIC4yMnMpIHZhcigtLW5jLXVpLW1vdGlvbi1zbGlkZS1lYXNpbmcsIGVhc2Utb3V0KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gLm5jLXVpLWNvbmZpcm0gewogIHRyYW5zZm9ybTogbm9uZTsKfQoubmMtdWktY29uZmlybS10aXRsZSB7CiAgbWFyZ2luOiAwOwogIGZvbnQtc2l6ZTogdmFyKC0tbmMtdWktdGl0bGUtc2l6ZS1zbGltLCAxOHB4KTsKICBmb250LXdlaWdodDogdmFyKC0tbmMtdWktdGl0bGUtd2VpZ2h0LCA0MDApOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS10aXRsZS10cmFja2luZywgLS4wMWVtKTsKfQoubmMtdWktY29uZmlybS1ib2R5IHsKICBtYXJnaW46IDA7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LXN1YiwgIzU5NTk1OSk7Cn0KLm5jLXVpLWNvbmZpcm0tYWN0aW9ucyB7CiAgZGlzcGxheTogZmxleDsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1idXR0b24tZ2FwLCA4cHgpOwp9CmJ1dHRvbi5uYy11aS1jb25maXJtLWJ0biB7CiAgZmxleDogMSAxIDA7CiAgbWluLXdpZHRoOiAwOwogIG1pbi1oZWlnaHQ6IHZhcigtLW5jLXVpLXRhcmdldC1taW4sIDQ0cHgpOwogIG92ZXJmbG93OiBoaWRkZW47CiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7CiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICBib3JkZXI6IHZhcigtLW5jLXVpLWhhaXJsaW5lLCAxcHgpIHNvbGlkIHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGJvcmRlci1yYWRpdXM6IDA7CiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7CiAgY29sb3I6IHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGZvbnQ6IGluaGVyaXQ7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1yZWFkb3V0LXNpemUsIDEycHgpOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS1sYWJlbC10cmFja2luZywgLjE0ZW0pOwogIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgY3Vyc29yOiBwb2ludGVyOwogIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yLCBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3I7CiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogdmFyKC0tbmMtdWktdHJhbnNpdGlvbi1mZWVkYmFjaywgLjE1cyk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmhvdmVyIHsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXJhaXNlZCwgI0VBRUFFQSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuW2RhdGEtZGFuZ2VyPSJ0cnVlIl0gewogIGJvcmRlci1jb2xvcjogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgYmFja2dyb3VuZDogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgY29sb3I6IHZhcigtLW5jLXVpLW9uLWRhbmdlciwgI0Y1RjVGNSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmZvY3VzIHsKICBvdXRsaW5lOiB2YXIoLS1uYy11aS1mb2N1cy13aWR0aC1zdHJvbmcsIDJweCkgc29saWQgdmFyKC0tbmMtdWktZm9jdXMtcmluZywgIzAwMzE1Myk7CiAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLW5jLXVpLWZvY3VzLXdpZHRoLXN0cm9uZywgMnB4KTsKfQpAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkgewogIC5uYy11aS1jb25maXJtLWxheWVyLAogIC5uYy11aS1jb25maXJtLWxheWVyW2RhdGEtc3RhdGU9ImNsb3NpbmciXSwKICAubmMtdWktY29uZmlybSwKICBidXR0b24ubmMtdWktY29uZmlybS1idG4gewogICAgdHJhbnNpdGlvbjogbm9uZTsKICAgIGFuaW1hdGlvbjogbm9uZTsKICB9Cn0K",import.meta.url).href,vr=t=>{let e=t.querySelector?.("link[data-nc-ui-confirm]");return!e&&t.head&&(e=t.createElement("link"),e.rel="stylesheet",e.href=Gl,e.dataset.ncUiConfirm="",e.ncWait=new Promise(n=>{let a=()=>{e.ncWait=null,n()};e.onload=a,e.onerror=a}),t.head.append(e)),e?.ncWait};typeof document<"u"&&vr(document);function wa({title:t,body:e,confirmLabel:n="Confirm",cancelLabel:a="Cancel",danger:r=!1,root:o,returnFocus:s,signal:l}){if(ft||l?.aborted)return Promise.resolve(!1);let u=o?.ownerDocument??document,c=vr(u),d=o??u.body,p=u.defaultView??globalThis,f=`nc-ui-confirm-${++Wl}`,g=(R,te,P)=>{let $=u.createElement(R);return $.className=`nc-ui-confirm${te}`,P!=null&&($.textContent=P),$},b=g("div","-layer");b.dataset.state="enter";let y=g("div","");y.setAttribute("role","alertdialog"),y.setAttribute("aria-modal","true"),y.setAttribute("aria-labelledby",`${f}-t`),y.setAttribute("aria-describedby",`${f}-b`);let m=g("h2","-title",t);m.id=`${f}-t`;let h=g("p","-body",e);h.id=`${f}-b`;let v=g("div","-actions"),w=(R,te)=>{let P=g("button","-btn",R);return P.type="button",P.dataset.ncConfirm=te,P.addEventListener("click",()=>V(te==="ok")),P},k=w(a,"cancel"),x=w(n,"ok");r&&(x.dataset.danger="true"),v.append(k,x),y.append(m,h,v),b.append(y);let A={layer:b};ft=A;let E=s??u.activeElement,M=[];for(let R of d.children)R.hasAttribute("inert")||(R.setAttribute("inert",""),M.push(R));let I=()=>{if(ft!==A)return;d.append(b),k.focus({preventScroll:!0});let R=p.requestAnimationFrame?.bind(p)??(te=>setTimeout(te,16));R(()=>R(()=>{b.dataset.state==="enter"&&(b.dataset.state="open")}))};c?c.then(I):I();let q=!1;b.addEventListener("pointerdown",R=>{q=R.target===b}),b.addEventListener("click",R=>{R.target===b&&q&&V(!1),q=!1});let Z=R=>{R.stopImmediatePropagation(),R.key==="Escape"?(R.preventDefault(),V(!1)):R.key==="Tab"?(R.preventDefault(),(u.activeElement===k?x:k).focus()):R.key==="Enter"&&(R.preventDefault(),u.activeElement===x?V(!0):u.activeElement===k&&V(!1))},ee=R=>R.stopImmediatePropagation();p.addEventListener("keydown",Z,!0),p.addEventListener("keyup",ee,!0);let z=()=>V(!1);l?.addEventListener("abort",z);let X,zt=new Promise(R=>{X=R});function V(R){if(ft!==A)return;ft=null,p.removeEventListener("keydown",Z,!0),p.removeEventListener("keyup",ee,!0),l?.removeEventListener("abort",z);for(let S of M)S.removeAttribute("inert");b.dataset.state="closing",E?.isConnected&&typeof E.focus=="function"&&E.focus({preventScroll:!0});let te=p.getComputedStyle?.(b),P=Math.max(0,...String(te?.transitionDuration??"").split(",").map(S=>Number.parseFloat(S)*(S.trim().endsWith("ms")?1:1e3)||0)),$=()=>b.remove();b.addEventListener("transitionend",S=>S.target===b&&$()),setTimeout($,P+50),X(R)}return zt}function wr(t={}){let e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);let a=e.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let r=e.createElement("span");r.dataset.ncOn="",r.textContent=t.onText??"On";let o=e.createElement("span");o.dataset.ncOff="",o.textContent=t.offText??"Off",a.append(r,o),n.append(a);let s=!1,l=c=>{s=c===!0,n.setAttribute("aria-checked",s?"true":"false")};l(t.checked);let u=()=>{l(!s),t.onChange?.(s)};return n.addEventListener("click",u),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",u),n.remove()}}}var xr=new WeakMap,li=.25;function Yl(t){let e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=e.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let r=e.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(a,r);let o=0,s=t.step??.005,l=t.onChange,u=t.onReset,c=m=>Math.min(1,Math.max(0,m)),d=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},p=m=>{let h=c(m);h!==o&&(o=h,d(),l?.(h))},f=0,g=!1;n.addEventListener("pointerdown",m=>{if(m.button!==0)return;m.preventDefault(),n.focus?.({preventScroll:!0});let h=n.getBoundingClientRect();m.target!==r&&h.height>0&&p(1-(m.clientY-h.top)/h.height),f=m.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(m.pointerId)}),n.addEventListener("pointermove",m=>{if(!g)return;let h=n.getBoundingClientRect().height||1,v=(f-m.clientY)/h*(m.shiftKey?li:1);f=m.clientY,p(o+v)});let b=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",b),n.addEventListener("pointercancel",b),n.addEventListener("lostpointercapture",b),n.addEventListener("dblclick",m=>{m.preventDefault(),u?.()}),n.addEventListener("keydown",m=>{let h=m.shiftKey?s*li:s,v={ArrowUp:o+h,ArrowRight:o+h,ArrowDown:o-h,ArrowLeft:o-h,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};m.key in v&&(m.preventDefault(),p(v[m.key]))});let y={el:n,get value(){return o},get dragging(){return g},set(m){g||(o=c(Number(m)||0),d())},setText(m){m?n.setAttribute("aria-valuetext",m):n.removeAttribute("aria-valuetext")},setLabel(m){n.setAttribute("aria-label",m)},configure(m){typeof m.step=="number"&&m.step>0&&(s=m.step),m.onChange&&(l=m.onChange),m.onReset&&(u=m.onReset)}};return y.setLabel(t.label),y.set(t.value??0),y.setText(t.valueText),xr.set(n,y),y}function Zl(t){return xr.get(t)}var $r=new WeakMap,Xl=.2,Vl=1.5,Ul=.5;function Kl(t,e){let n=String(t??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:e}function ci(t,e,n){let a=t.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Kl(a.getComputedStyle(t).getPropertyValue(G(e)),n)}function Jl(t){let e=t.doc??globalThis.document,n=t.channels===2?2:1,a=e.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let r=e.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let o=e.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let y=0;y<n;y++){let m=e.createElement("span");m.className="nc-meter-bar";let h=e.createElement("span");h.className="nc-meter-peak";let v=e.createElement("span");v.className="nc-meter-rms";let w=e.createElement("span");w.className="nc-meter-hold",m.append(h,v,w),o.append(m),s.push({peak:h,rms:v,hold:w,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(r,o);let l=t.label,u=t.onClear,c=!1,d=-1,p=-1,f=()=>{r.dataset.lit=c?"true":"false",r.setAttribute("aria-pressed",c?"true":"false"),r.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),r.title=c?"Clipped. Click to clear":"Clip light"},g=(y,m,h,v)=>{let w=Math.round(v*1e3)/1e3;h[m]!==w&&(h[m]=w,y.style.transform=m==="hold"?`translateY(${Math.round((1-w)*1e3)/10}%)`:`scaleY(${w})`)};r.addEventListener("click",()=>{b.clear(),u?.()});let b={el:a,get clipped(){return c},update(y,m){d<0&&(d=ci(a,"motion-meter-fall",Xl)),p<0&&(p=ci(a,"motion-meter-hold",Vl));let h=Math.max(0,Math.min(.25,Number(m)||0)),v=d>0?Math.exp(-h/d):0;s.forEach((w,k)=>{let x=y[k]??y[0]??{peak:0,rms:0},A=Math.min(1,Math.max(0,Number(x.peak)||0)),E=Math.min(A,Math.max(0,Number(x.rms)||0));x.over&&b.clip(),w.level.peak=A>=w.level.peak?A:A+(w.level.peak-A)*v,w.level.rms=E>=w.level.rms?E:E+(w.level.rms-E)*v,w.holdAge+=h,A>=w.holdAt?(w.holdAt=A,w.holdAge=0):w.holdAge>p&&(w.holdAt=Math.max(A,w.holdAt-Ul*h)),g(w.peak,"peak",w.shown,w.level.peak),g(w.rms,"rms",w.shown,w.level.rms),g(w.hold,"hold",w.shown,w.holdAt),w.hold.dataset.off=w.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,f())},clear(){c=!1,f()},reset(){for(let y of s)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,g(y.peak,"peak",y.shown,0),g(y.rms,"rms",y.shown,0),g(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,f()},configure(y){y.onClear&&(u=y.onClear)}};return f(),b.reset(),$r.set(a,b),b}function kr(t){return t?$r.get(t):void 0}function Ql(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),a=t.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(e*a)),o=Math.max(1,Math.floor(n*a));(t.width!==r||t.height!==o)&&(t.width=r,t.height=o);let s=t.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:e,h:n}}function ke(t){return Math.max(0,Math.min(1,t))}function Er(t,e){let{ctx:n,w:a,h:r}=Ql(t);if(!n)return;n.clearRect(0,0,a,r);let o=Pl(t);if(e.paint==="swatch"){let u=U(t,"accent"),c=U(t,"rhythm.step-cell-on");t.dataset.ncAccent=u,t.dataset.ncStep=c,n.fillStyle=u,n.fillRect(0,0,a/2,r),n.fillStyle=c,n.fillRect(a/2,0,a/2,r);return}if(e.paint==="filter"){let u=e.mode??"lp",c=U(t,ql(u)),d=U(t,"divider"),p=ke(e.cutoff??.5),f=.08+(1-ke(e.resonance??.2))*.22;n.strokeStyle=d,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(a,r*.72),n.stroke(),n.beginPath();for(let g=0;g<=a;g++){let b=g/Math.max(1,a),y=0;u==="lp"?y=b<p?1:Math.max(0,1-(b-p)/f):u==="hp"?y=b>p?1:Math.max(0,1-(p-b)/f):y=Math.max(0,1-Math.abs(b-p)/f);let m=r*.78-y*r*.62;g===0?n.moveTo(g,m):n.lineTo(g,m)}n.strokeStyle=c,n.stroke(),n.fillStyle=U(t,"text-sub"),n.font=o,n.fillText(u.toUpperCase(),0,r),t.dataset.ncAccent=c;return}if(e.paint==="envelope"){n.strokeStyle=U(t,"accent"),n.beginPath();let u=Math.max(.05,e.decay??.4);for(let c=0;c<=a;c++){let d=c/Math.max(1,a),p=(r-4)*(1-Math.exp(-d*4/u));n.lineTo(c,r-p)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="waveform"){let u=Array.isArray(e.peaks)?e.peaks:[],[c,d]=Array.isArray(e.region)?e.region:[0,1],p=U(t,"accent"),f=U(t,"text-sub"),g=r/2;n.fillStyle=U(t,"accent-soft"),n.fillRect(ke(c)*a,0,(ke(d)-ke(c))*a,r),n.strokeStyle=U(t,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(a,g),n.stroke();let b=Math.floor(u.length/2);for(let y=0;y<b;y++){let m=(y+.5)/b*a,h=Math.max(-1,Math.min(1,u[y*2]??0)),v=Math.max(-1,Math.min(1,u[y*2+1]??0)),w=(y+.5)/b;n.strokeStyle=w>=c&&w<=d?p:f,n.beginPath(),n.moveTo(m,g-v*(g-1)),n.lineTo(m,g-h*(g-1)+.5),n.stroke()}n.strokeStyle=p;for(let y of[c,d,...Array.isArray(e.markers)?e.markers:[]]){let m=Math.round(ke(y)*(a-1))+.5;n.beginPath(),n.moveTo(m,0),n.lineTo(m,r),n.stroke()}typeof e.position=="number"&&e.position>=0&&(n.fillStyle=U(t,"text"),n.fillRect(Math.round(ke(e.position)*(a-1)),0,1,r)),b||(n.fillStyle=f,n.font=o,n.fillText(e.empty??"Empty",0,g+4)),t.dataset.ncAccent=p;return}if(e.paint==="meter"){let u=ke(e.level??0);n.fillStyle=U(t,"divider"),n.fillRect(0,r*.4,a,r*.2),n.fillStyle=U(t,"accent"),n.fillRect(0,r*.4,a*u,r*.2),t.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,e.steps??16),l=((e.step??0)%s+s)%s;n.fillStyle=U(t,"rhythm.step-cell-off"),n.fillRect(0,r*.45,a,r*.1),n.fillStyle=U(t,"rhythm.playhead"),n.fillRect(l/s*a,r*.3,Math.max(1,a/s),r*.4),t.dataset.ncAccent=U(t,"accent")}function de(t,e){let n=t.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${e})`,t.append(a);let r=n.defaultView.getComputedStyle(a).color;return a.remove(),r}function ec(t){let e=t.ownerDocument,n=e.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",t.append(n);let a=e.defaultView.getComputedStyle(n).font;return n.remove(),a}var Pe=20,Ct=2e4,xa=Math.log(Ct/Pe),Un=32,tc=250,nc=-100,ac=1200,ic=4.5,di=-6,Be=-96,rc=48,ui=[100,1e3,1e4],oc=[6,12];function et(t,e){return Math.log(Math.max(Pe,Math.min(Ct,t))/Pe)/xa*e}function Xt(t,e){return Pe*Math.exp(Math.max(0,Math.min(e,t))/Math.max(1,e)*xa)}function Ce(t,e,n,a){let r=e/2-a;return e/2-Math.max(-n,Math.min(n,t))/n*r}function Kn(t){return t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)} kHz`:`${Math.round(t)} Hz`}var Ar=t=>`${t>0?"+":t<0?"−":""}${Math.abs(Math.round(t*10)/10)} dB`;function sc(t,e,n,a){let r=n?3:1,o=u=>({db:Math.max(-a,Math.min(a,t.db+u*r))}),s=u=>({hz:Math.max(t.minHz??Pe,Math.min(t.maxHz??Ct,t.hz*2**(u*r/6)))}),l=u=>({q:Math.max(t.minQ??.1,Math.min(t.maxQ??20,t.q*1.25**(u*r)))});switch(e){case"ArrowUp":return o(1);case"ArrowDown":return o(-1);case"ArrowRight":return t.moveHz?s(1):o(1);case"ArrowLeft":return t.moveHz?s(-1):o(-1);case"PageUp":return t.moveQ?l(1):null;case"PageDown":return t.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function $a(t){return t.kind==="lowshelf"||t.kind==="highshelf"?.5:1}function lc(t,e,n,a,r,o,s,l,u){let c=u?.25:1,d={},p=Math.max(1,o/2-l);if(d.db=Math.max(-s,Math.min(s,e.db-a*c/p*s/$a(t))),t.moveHz){let f=e.hz*Math.exp(n*c/Math.max(1,r)*xa);d.hz=Math.max(t.minHz??Pe,Math.min(t.maxHz??Ct,f))}return d}function cc(t,e,n,a,r){let o=Math.max(0,n.left)+1,s=Math.min(n.right,r)-1,l=Math.min(e.width*3+a*2,s-o),u=Math.max(o,Math.min(t.left,s-l));return{left:Math.round(u-e.left),top:Math.round(t.top-e.top),width:Math.round(l)}}var J=new WeakMap;function dc(t,e){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=t.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let r=document.createElement("canvas");r.className="nc-eq-spectrum",r.setAttribute("aria-hidden","true");let o=document.createElement("canvas");o.className="nc-eq-curve",o.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(r,o);for(let u of t.bands)a.append(uc(n,u,e));a.append(s),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),J.set(n,{control:t,cache:null,spec:null,active:null}),Lr(n,t),n}function Sr(t,e){return[...t.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===e)??null}function uc(t,e,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=e.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let r=()=>{let c=n(t);return c?.type==="eqGraph"?c:null},o=()=>r()?.bands.find(c=>c.id===e.id)??null,s=null;a.addEventListener("pointerdown",c=>{if(c.button!==0)return;let d=o();d&&(c.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(c.pointerId),s={id:c.pointerId,x:c.clientX,y:c.clientY,start:{hz:d.hz,db:d.db}},a.dataset.drag="true",Ee(t,e.id))}),a.addEventListener("pointermove",c=>{if(!s||c.pointerId!==s.id)return;let d=r(),p=o(),f=J.get(t);if(!d||!p||!f?.box)return;let{w:g,h:b,pad:y}=f.box;d.onBand(p.id,lc(p,s.start,c.clientX-s.x,c.clientY-s.y,g,b,d.range??18,y,c.shiftKey))});let l=c=>{!s||c.pointerId!==s.id||(s=null,delete a.dataset.drag,t.ownerDocument.activeElement!==a&&!a.matches(":hover")&&Ee(t,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",c=>{c.preventDefault(),r()?.onReset?.(e.id)}),a.addEventListener("keydown",c=>{let d=r(),p=o();if(!d||!p)return;let f=sc(p,c.key,c.shiftKey,d.range??18);f&&(c.preventDefault(),f==="reset"?d.onReset?.(p.id):d.onBand(p.id,f),Ee(t,p.id))});let u=null;return a.addEventListener("wheel",c=>{let d=r(),p=o();if(!d||!p?.moveQ)return;c.preventDefault();let f=c.timeStamp;(!u||f-u.t>400)&&(u={q:p.q,t:f});let g=c.deltaMode===1?c.deltaY*16:c.deltaMode===2?c.deltaY*400:c.deltaY;u.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,u.q*2**(-g/240))),u.t=f,d.onBand(p.id,{q:u.q}),Ee(t,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>Ee(t,e.id)),a.addEventListener("focus",()=>Ee(t,e.id)),a.addEventListener("pointerleave",()=>{!s&&t.ownerDocument.activeElement!==a&&Ee(t,null)}),a.addEventListener("blur",()=>{s||Ee(t,null)}),a}function Ee(t,e){let n=J.get(t);if(!n)return;let a=n.active!==e;n.active=e,a?Nt(t):Mr(t)}function Mr(t){let e=J.get(t),n=t.querySelector(".nc-eq-tip");if(!e||!(n instanceof HTMLElement))return;let a=e.active?e.control.bands.find(b=>b.id===e.active):null;for(let b of t.querySelectorAll(".nc-eq-node"))b instanceof HTMLElement&&(a&&b.dataset.band===a.id?b.dataset.active="true":delete b.dataset.active);if(!a||!e.box){n.hidden=!0;return}let r=[a.label,Ar(a.db)];a.kind==="peak"?r.push(Kn(a.hz),`Q ${a.q.toFixed(1)}`):r.push(`${a.kind==="lowshelf"?"below":"above"} ${Kn(a.hz)}`),n.textContent=r.join(" · "),n.dataset.tone=String(pc(e.control,a)),n.hidden=!1;let{w:o,h:s,pad:l}=e.box,u=et(a.hz,o),c=Ce(a.db*$a(a),s,e.control.range??18,l),d=n.offsetWidth,p=n.offsetHeight,f=Math.max(0,Math.min(o-d,u-d/2)),g=c-p-l*1.5>=0?c-p-l*1.5:Math.min(s-p,c+l*1.5);n.style.left=`${Math.round(f)}px`,n.style.top=`${Math.round(g)}px`}function pc(t,e){return t.bands.indexOf(e)%3+1}function Lr(t,e){let n=J.get(t);if(!n)return;n.control=e,t.setAttribute("aria-label",e.label??"EQ curve"),e.help?t.setAttribute("data-nc-help",e.help):t.removeAttribute("data-nc-help"),t.dataset.on=e.on===!1?"false":"true";let a=e.range??18;e.bands.forEach((r,o)=>{let s=Sr(t,r.id);s instanceof HTMLElement&&(s.dataset.tone=String(o%3+1),s.dataset.kind=r.kind,s.setAttribute("aria-label",`${r.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(r.db)),s.setAttribute("aria-valuetext",r.valueText??`${Ar(r.db)}, ${Kn(r.hz)}`),s.setAttribute("aria-keyshortcuts",r.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),r.help?s.setAttribute("data-nc-help",r.help):s.removeAttribute("data-nc-help"))}),Nt(t),yc(t)}function Tr(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),a=t.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.round(e*a)),o=Math.max(1,Math.round(n*a));(t.width!==r||t.height!==o)&&(t.width=r,t.height=o);let s=t.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:e,h:n}}function Cr(t){return{curve:de(t,"eq-curve"),fill:de(t,"eq-fill"),quiet:de(t,"text-sub"),grid:de(t,"eq-grid"),zero:de(t,"divider"),label:de(t,"text-sub"),spectrum:de(t,"eq-spectrum"),bands:[de(t,"eq-band-1"),de(t,"eq-band-2"),de(t,"eq-band-3")]}}function mc(t,e){return`${e}|${t.sampleRate??""}|${t.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Nt(t){let e=J.get(t),n=t.querySelector(".nc-eq-curve");if(!e||!(n instanceof HTMLCanvasElement)||!t.isConnected)return;let a=e.control,{ctx:r,w:o,h:s}=Tr(n);if(!r)return;let l=Math.max(8,Math.round(s*.06)),u=a.range??18;e.box={w:o,h:s,pad:l},e.colours=Cr(t);let c=e.colours,d=mc(a,o);if(!e.cache||e.cache.key!==d){let k=Math.max(64,Math.ceil(o)+1),x=new Float64Array(k);for(let E=0;E<k;E++)x[E]=Xt(E/(k-1)*o,o);let A=null;try{A=typeof a.response=="function"?a.response(x):null}catch{A=null}e.cache={key:d,freqs:x,total:A?.total??new Float64Array(k),bands:A?.bands??[]}}r.clearRect(0,0,o,s);let p=ec(t),f=a.on!==!1;hc(r,o,s,u,l,c,p);let{freqs:g,total:b,bands:y}=e.cache,m=Array.from(g,k=>et(k,o)),h=Ce(0,s,u,l);y.forEach((k,x)=>{if(!k||!k.some(M=>Math.abs(M)>.05))return;let A=f?c.bands[x%3]:c.quiet,E=Array.from(k,M=>Ce(M,s,u,l));r.save(),e.active&&a.bands[x]?.id===e.active&&(r.globalAlpha=.14,r.fillStyle=A,pi(r,m,E,h)),r.globalAlpha=f?.7:.4,r.strokeStyle=A,r.lineWidth=1,Nn(r,m,E),r.restore()});let v=Array.from(b,k=>Ce(k,s,u,l)),w=f?c.curve:c.quiet;r.save(),r.fillStyle=f?c.fill:c.quiet,r.globalAlpha=f?.2:.08,pi(r,m,v,h),r.restore(),r.save(),r.strokeStyle=f?c.fill:w,r.lineJoin="round",r.lineCap="round",f&&(r.globalAlpha=.22,r.lineWidth=6,Nn(r,m,v)),r.globalAlpha=1,r.strokeStyle=w,r.lineWidth=2,Nn(r,m,v),r.restore(),fc(t),Mr(t)}function hc(t,e,n,a,r,o,s){t.save(),t.lineWidth=1;for(let u=10;u<=1e4;u*=10)for(let c=1;c<=9;c++){let d=u*c;if(d<Pe||d>Ct)continue;let p=Math.round(et(d,e))+.5;t.globalAlpha=ui.includes(d)?.9:.35,t.strokeStyle=o.grid,t.beginPath(),t.moveTo(p,0),t.lineTo(p,n),t.stroke()}for(let u of oc)if(!(u>a))for(let c of[1,-1]){let d=Math.round(Ce(u*c,n,a,r))+.5;t.globalAlpha=u===12?.75:.4,t.strokeStyle=o.grid,t.beginPath(),t.moveTo(0,d),t.lineTo(e,d),t.stroke()}t.globalAlpha=1,t.strokeStyle=o.zero;let l=Math.round(Ce(0,n,a,r))+.5;t.beginPath(),t.moveTo(0,l),t.lineTo(e,l),t.stroke(),t.font=s,t.fillStyle=o.label,t.globalAlpha=.9,t.textBaseline="bottom",t.textAlign="left";for(let u of ui){let c=u>=1e3?`${u/1e3}k`:String(u),d=t.measureText(c).width,p=et(u,e)+3;t.fillText(c,p+d+2>e?et(u,e)-d-3:p,n-2)}t.textBaseline="bottom",t.textAlign="right";for(let u of[12,0,-12]){if(Math.abs(u)>a)continue;let c=Ce(u,n,a,r);t.fillText(u>0?`+${u}`:u<0?`−${-u}`:"0",e-3,Math.round(c)-1)}t.restore()}function dn(t,e,n){t.moveTo(e[0],n[0]);for(let a=1;a<e.length-1;a++){let r=(e[a]+e[a+1])/2,o=(n[a]+n[a+1])/2;t.quadraticCurveTo(e[a],n[a],r,o)}t.lineTo(e[e.length-1],n[n.length-1])}function Nn(t,e,n){t.beginPath(),dn(t,e,n),t.stroke()}function pi(t,e,n,a){t.beginPath(),dn(t,e,n),t.lineTo(e[e.length-1],a),t.lineTo(e[0],a),t.closePath(),t.fill()}function fc(t){let e=J.get(t);if(!e?.box)return;let{w:n,h:a,pad:r}=e.box,o=e.control.range??18;for(let s of e.control.bands){let l=Sr(t,s.id);l instanceof HTMLElement&&(l.style.left=`${et(s.hz,n).toFixed(1)}px`,l.style.top=`${Ce(s.db*$a(s),a,o,r).toFixed(1)}px`)}}function gc(t,e,n,a){let r=a/2/n,o=new Float32Array(t),s=new Float32Array(t),l=new Float32Array(t);for(let u=0;u<t;u++){let c=(u-.5)/(t-1)*e,d=(u+.5)/(t-1)*e,p=Xt(c,e),f=Xt(d,e),g=Xt(u/(t-1)*e,e);o[u]=Math.min(n-1,p/r),s[u]=Math.min(n-1,f/r),l[u]=ic*Math.log2(g/1e3)}return{lo:o,hi:s,tilt:l}}function bc(t,e,n){let a=Math.floor(e),r=Math.ceil(n);if(r-a<=1){let s=e-a,l=t[a]??-1/0,u=t[Math.min(t.length-1,a+1)]??l;return l+(u-l)*s}let o=-1/0;for(let s=a;s<=r&&s<t.length;s++)t[s]>o&&(o=t[s]);return o}function yc(t){let e=J.get(t);if(e){if(!e.control.spectrum){Fr(t);return}if(!e.spec){e.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=t.ownerDocument.defaultView?.IntersectionObserver;n?(e.spec.io=new n(a=>{let r=J.get(t)?.spec;r&&(r.visible=a.some(o=>o.isIntersecting),Jn(t))}),e.spec.io.observe(t)):e.spec.visible=!0}Jn(t)}}function Jn(t){let e=J.get(t),n=e?.spec;if(!n)return;let a=t.ownerDocument;if(!(t.isConnected&&n.visible&&a.visibilityState!=="hidden"&&e.control.spectrum)){Nr(t);return}if(!n.analyser){if(n.source=e.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Qn(t),n.onVis||(n.onVis=()=>Jn(t),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&ea(t,!1)}function Qn(t){return t.ownerDocument.defaultView?.performance?.now()??Date.now()}function ea(t,e){let n=J.get(t)?.spec,a=t.ownerDocument.defaultView;!n||!a||(e?n.timer=a.setTimeout(()=>(n.timer=0,Fn(t,Qn(t))),tc):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(r=>(n.raf=0,Fn(t,r))):n.timer=a.setTimeout(()=>(n.timer=0,Fn(t,Qn(t))),Un))}function Nr(t){let e=J.get(t)?.spec;if(!e)return;let n=t.ownerDocument.defaultView;e.raf&&n?.cancelAnimationFrame?.(e.raf),e.timer&&n?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.analyser&&(e.source?.close?.(),e.analyser=null,e.source=null),e.disp&&e.disp.fill(-1/0);let a=t.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function Fr(t){let e=J.get(t)?.spec;if(!e)return;Nr(t),e.io?.disconnect(),e.onVis&&t.ownerDocument.removeEventListener("visibilitychange",e.onVis);let n=J.get(t);n&&(n.spec=null)}function Fn(t,e){let n=J.get(t),a=n?.spec;if(!n||!a)return;if(!t.isConnected){Fr(t);return}if(!a.analyser)return;if(e-a.last<Un-4&&!a.idle){ea(t,!1);return}let r=a.last?Math.min(.25,(e-a.last)/1e3):Un/1e3;a.last=e;let o=t.querySelector(".nc-eq-spectrum");if(!(o instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:u}=Tr(o);if(!s)return;let c=Math.max(16,Math.round(l/2)),d=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==c||a.map.w!==l||a.map.sr!==d)&&(a.map={cols:c,w:l,sr:d,...gc(c,l,a.buf.length,d)},a.disp=new Float32Array(c).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,f=rc*r,{lo:g,hi:b,tilt:y}=a.map;for(let h=0;h<c;h++){let v=bc(a.buf,g[h],b[h]);v>p&&(p=v);let w=v+y[h],k=a.disp[h]-f;a.disp[h]=w>k?w:k}p>nc&&(a.loud=e);let m=e-a.loud>ac;s.clearRect(0,0,l,u),(!m||a.disp.some(h=>h>Be))&&vc(s,l,u,a.disp,n.colours??Cr(t)),a.idle=m&&!a.disp.some(h=>h>Be),ea(t,a.idle)}function vc(t,e,n,a,r){let o=a.length,s=new Array(o),l=new Array(o),u=c=>{let d=a[Math.max(0,Math.min(o-1,c))];return Number.isFinite(d)?d:Be};for(let c=0;c<o;c++){let d=u(c)*.36+(u(c-1)+u(c+1))*.22+(u(c-2)+u(c+2))*.1,p=(Math.max(Be,Math.min(di,Number.isFinite(d)?d:Be))-Be)/(di-Be);s[c]=c/(o-1)*e,l[c]=n-p*n}t.save(),t.fillStyle=r.spectrum,t.globalAlpha=.13,t.beginPath(),dn(t,s,l),t.lineTo(e,n),t.lineTo(0,n),t.closePath(),t.fill(),t.globalAlpha=.32,t.strokeStyle=r.spectrum,t.lineWidth=1,t.beginPath(),dn(t,s,l),t.stroke(),t.restore()}var Ir={slop:8,longPressMs:500,pitchPx:16},wc=class{constructor(t,e,n=Ir){this.hit=t,this.emit=e,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(t,e,n,a){if(this.phase!=="idle")return!1;let r=this.hit(e,n);return r<0?!1:(this.phase="pending",this.pointer=t,this.pad=r,this.x0=e,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(t){this.phase==="pending"&&t-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(t,e,n,a){if(t!==this.pointer)return;let r=e-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-o/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(e,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(t,e,n,a){t===this.pointer&&(this.phase==="pending"&&this.move(t,e,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(t){t===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function xc(t,e,n,a=Ir){let r=!1,o=0,s=(c,d)=>{let p=t.ownerDocument.elementFromPoint?.(c,d),f=[...t.querySelectorAll(e)],g=p?f.findIndex(m=>m===p||m.contains(p)):-1;if(g>=0)return g;let b=-1,y=Number.POSITIVE_INFINITY;return f.forEach((m,h)=>{if(m.hidden)return;let v=m.getBoundingClientRect();if(d<v.top||d>v.bottom)return;let w=Math.abs(c-(v.left+v.width/2));w<y&&w<=v.width&&(b=h,y=w)}),b},l=new wc(s,c=>{(c.kind==="paint"||c.kind==="long")&&(r=!0),n(c)},a),u=()=>{o&&clearTimeout(o),o=0};return t.addEventListener("pointerdown",c=>{c.button>0||(r=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(u(),o=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),t.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&u())}),t.addEventListener("pointerup",c=>{u(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),t.addEventListener("pointercancel",c=>{u(),l.cancel(c.pointerId)}),t.addEventListener("click",c=>{r&&(r=!1,c.stopPropagation(),c.preventDefault())},!0),t.addEventListener("contextmenu",c=>c.preventDefault()),l}var zr="netcomposer.groups.v1";function ka(){try{return globalThis.localStorage??null}catch{return null}}function Rr(t=ka(),e=zr){try{let n=JSON.parse(t?.getItem(e)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[r,o]of Object.entries(n))typeof o=="boolean"&&a.set(r,o);return a}catch{return new Map}}function $c(t,e,n,a=zr){let r=Rr(t,a);r.set(e,n);try{t?.setItem(a,JSON.stringify(Object.fromEntries(r)))}catch{}}function kc(t,e=ka()){return Rr(e).get(t.id)??t.open===!0}function Ec(t,e,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=t.id;let r=document.createElement("button");r.type="button",r.className="nc-group-toggle",r.id=`${t.id}-group-toggle`;let o=document.createElement("span");o.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),r.append(o,s,l);let u=document.createElement("div");u.className="nc-group-body",u.id=`${t.id}-group-body`,u.setAttribute("role","group"),u.setAttribute("aria-labelledby",r.id),r.setAttribute("aria-controls",u.id);for(let c of t.controls)u.append(n(c,e));return r.addEventListener("click",()=>{let c=a.dataset.ncOpen!=="true";$c(ka(),t.id,c),mi(a,c);let d=e(a);d?.type==="group"&&d.onToggle?.(c)}),a.append(r,u),mi(a,kc(t)),Dr(a,t),a}function mi(t,e){t.dataset.ncOpen=e?"true":"false";let n=t.querySelector(":scope > .nc-group-toggle"),a=t.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",e?"true":"false");let r=n?.querySelector(".nc-group-mark");r&&(r.textContent=e?"−":"+"),a instanceof HTMLElement&&(a.hidden=!e)}function Dr(t,e){let n=t.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==e.title&&(n.textContent=e.title);let a=t.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),r=e.summary??"";a&&a.textContent!==r&&(a.textContent=r)}var Pt="application/x-nc-pad",hi="http://www.w3.org/2000/svg";function Ac(t){let e=Math.floor((t?.length??0)/2);if(!e)return"";let n=Math.min(48,e),a=[],r=[];for(let o=0;o<n;o++){let s=Math.floor(o*e/n),l=Math.max(s+1,Math.floor((o+1)*e/n)),u=0,c=0;for(let p=s;p<l;p++)u=Math.min(u,t[2*p]??0),c=Math.max(c,t[2*p+1]??0);let d=n===1?50:o/(n-1)*100;a.push(`${d.toFixed(1)} ${(10-Math.min(1,c)*10).toFixed(2)}`),r.push(`${d.toFixed(1)} ${(10-Math.max(-1,u)*10).toFixed(2)}`)}return`M${a.join("L")}L${r.reverse().join("L")}Z`}function Sc(t,e){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(t.columns??2),t.pads.forEach((r,o)=>a.append(Mc(n,o,e))),n.append(a),n.addEventListener("keydown",r=>{r.key==="Escape"&&Vt(n)}),Or(n,t),n}function Mc(t,e,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(e);let r=document.createElement("span");r.className="nc-padgrid-pad-bar",r.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let u=document.createElementNS(hi,"svg");u.setAttribute("class","nc-padgrid-pad-wave"),u.setAttribute("viewBox","0 0 100 20"),u.setAttribute("preserveAspectRatio","none"),u.setAttribute("aria-hidden","true");let c=document.createElementNS(hi,"path");return u.append(c),a.append(r,o,s,l,u),Tc(t,a,e,n),o.addEventListener("dblclick",()=>{let d=n(t);d?.type==="padGrid"&&d.onRename&&a.dataset.empty!=="true"&&Br(t,a,e,n)}),a.addEventListener("dragstart",d=>{if(a.dataset.empty==="true"||!d.dataTransfer){d.preventDefault();return}d.dataTransfer.setData(Pt,String(e)),d.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",d=>{let p=d.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(Pt)||(d.preventDefault(),d.stopPropagation(),d.dataTransfer&&(d.dataTransfer.dropEffect=p.includes(Pt)&&!d.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",d=>{delete a.dataset.drop;let p=n(t);if(p?.type!=="padGrid")return;let f=d.dataTransfer?.getData(Pt);if(f!==void 0&&f!==""){d.preventDefault(),d.stopPropagation();let b=Number(f);b!==e&&p.onMove?.(b,e,d.altKey);return}let g=d.dataTransfer?.files?.[0];g&&(d.preventDefault(),d.stopPropagation(),p.onFile?.(e,g))}),a}function Lc(t,e,n){let a=n(t);a?.type==="padGrid"&&a.onPress(e)}function Tc(t,e,n,a){let r=0,o=!1,s=0,l=0,u=()=>{window.clearTimeout(r),r=0};e.addEventListener("pointerdown",c=>{if(c.button!==0)return;o=!1,s=c.clientX,l=c.clientY,u();let d=a(t);d?.type==="padGrid"&&(d.onDown?.(n),!(d.onDown&&c.pointerType==="mouse")&&(r=window.setTimeout(()=>{r=0,o=fi(t,e,n,a)},450)))}),e.addEventListener("pointermove",c=>{r&&Math.hypot(c.clientX-s,c.clientY-l)>8&&u()});for(let c of["pointerup","pointercancel","pointerleave"])e.addEventListener(c,u);e.addEventListener("contextmenu",c=>{c.preventDefault(),u(),o=fi(t,e,n,a)}),e.addEventListener("click",()=>{if(o){o=!1;return}Lc(t,n,a)})}function fi(t,e,n,a){let r=a(t);if(r?.type!=="padGrid"||!r.menu)return!1;let o=r.menu(n);if(!o.length)return!1;Vt(t);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),Vt(t)}),s.addEventListener("click",d=>d.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",e.getAttribute("aria-label")??"Pad");for(let d of o){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=d.id,p.textContent=d.label,p.addEventListener("click",()=>{Vt(t);let f=a(t);f?.type==="padGrid"&&(d.id==="rename"&&f.onRename?Br(t,e,n,a):f.onMenu?.(n,d.id))}),l.append(p)}t.append(s,l);let u=t.getBoundingClientRect(),c=e.getBoundingClientRect();return l.style.left=`${c.left-u.left}px`,l.style.top=`${c.bottom-u.top}px`,l.querySelector("button")?.focus(),!0}function Br(t,e,n,a){t.querySelector(":scope > .nc-padgrid-rename")?.remove();let r=a(t);if(r?.type!=="padGrid")return;let o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=r.nameMax??24,o.value=r.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.top-s.top}px`,o.style.width=`${l.width}px`;let u=!1,c=d=>{if(u)return;u=!0;let p=o.value.trim();o.remove(),e.focus();let f=a(t);d&&p&&f?.type==="padGrid"&&f.onRename?.(n,p)};o.addEventListener("keydown",d=>{d.stopPropagation(),d.key==="Enter"?c(!0):d.key==="Escape"&&c(!1)}),o.addEventListener("blur",()=>c(!0));for(let d of["pointerdown","click","dblclick"])o.addEventListener(d,p=>p.stopPropagation());t.append(o),o.focus(),o.select()}function Vt(t){for(let e of t.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))e.remove()}function Or(t,e){let n=t.querySelectorAll(".nc-padgrid-pad");e.pads.forEach((a,r)=>{let o=n[r];if(!(o instanceof HTMLButtonElement))return;let s=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),u=o.querySelector(".nc-padgrid-pad-wave path"),c=o.querySelector(".nc-padgrid-pad-badge");c&&(c.textContent=a.empty?"":a.badge??""),o.draggable=!a.empty,a.empty?(o.dataset.empty="true",s&&(s.textContent=e.emptyLabel??"Load"),l&&(l.textContent=e.emptyHint??"tap or drop"),u?.setAttribute("d","")):(delete o.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=""),u?.setAttribute("d",Ac(a.peaks))),a.lane?o.dataset.ncLane=String(a.lane):delete o.dataset.ncLane;let d=e.selected===r;d?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",d?"true":"false"),a.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",a.empty?`Pad ${r+1}, empty: load a sample`:`Pad ${r+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${d?", selected":""}`)})}function Q(){let t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function wn(t,e){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;let a=document.createElement("label");a.className="nc-label",a.htmlFor=t,a.textContent=e;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(a,r),n}function gi(t,e){let n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function Et(t){if(!Number.isFinite(t))return"";let e=Math.round(t*100)/100;return String(e)}var Cc=450,bi=8;function be(){let t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function Nc(t){let e=Ol(t,"target-min");return e>0?e:44}function Fc(t){if(!(t instanceof HTMLElement))return;let e=[...t.querySelectorAll(".nc-hit")],n=Nc(t),a=n/2,r=e.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<e.length;o++){let s=e[o],l=r[o];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let u=l.left+l.width/2,c=l.top+l.height/2,d=u-a,p=u+a,f=c-a,g=c+a;for(let b=0;b<e.length;b++){if(o===b)continue;let y=r[b];if(!y||y.width===0)continue;let m=y.left+y.width/2,h=y.top+y.height/2;Math.abs(h-c)<a*2&&(m>u?p=Math.min(p,(u+m)/2):m<u&&(d=Math.max(d,(u+m)/2))),Math.abs(m-u)<a*2&&(h>c?g=Math.min(g,(c+h)/2):h<c&&(f=Math.max(f,(c+h)/2)))}d=Math.min(d,l.left),p=Math.max(p,l.right),f=Math.min(f,l.top),g=Math.max(g,l.bottom),s.style.left=`${d-l.left}px`,s.style.top=`${f-l.top}px`,s.style.width=`${Math.max(0,p-d)}px`,s.style.height=`${Math.max(0,g-f)}px`,s.style.transform="none"}}function qr(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function yi(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function rt(t,e){switch(t.type){case"slider":return Ic(t,e);case"select":return Rc(t,e);case"toggle":return Dc(t,e);case"button":return Bc(t,e);case"readout":return Oc(t);case"label":return Hc(t);case"note":return vi(t);case"knob":return Gc(t,e);case"choice":return Yc(t,e);case"slotRow":return Zc(t,e);case"stepGrid":return Kc(t,e);case"canvas":return td(t);case"fx":return od(t,e);case"eqGraph":return dc(t,e);case"group":return Ec(t,e,rt);case"strip":return nd(t,e);case"stripAdd":return rd(t,e);case"padGrid":return Sc(t,e);case"moves":return Pc(t,e);default:return vi({id:"unknown",text:""})}}function ue(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){let n=t.querySelector("input"),a=t.querySelector("label");a&&(a.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,jr(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));let r=t.querySelector("[data-nc-readout]");r&&(r.textContent=e.valueText??Et(e.value))}else if(e.type==="select"){let n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),gi(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){let n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")gi(t,e.text);else if(e.type==="knob"){t instanceof HTMLElement&&ot(t,e.help);let n=t.querySelector(".nc-knob");n instanceof HTMLElement&&_c(n,e);let a=t.querySelector("[data-nc-readout]");a&&(a.textContent=e.valueText??Et(e.value))}else if(e.type==="choice")Hr(t,e);else if(e.type==="slotRow")Wr(t,e);else if(e.type==="stepGrid")na(t,e);else if(e.type==="padGrid")Or(t,e);else if(e.type==="moves")Pr(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){let n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&Er(n,e)}else if(e.type==="eqGraph")Lr(t,e);else if(e.type==="strip"){Xr(t,e);for(let n of e.sends??[]){let a=t.querySelector(`[data-nc-id="${tt(n.id)}"]`);a instanceof Element&&ue(a,{...n,type:"knob",compact:!0})}}else if(e.type==="stripAdd")Yr(t,e);else if(e.type==="group"){Dr(t,e);for(let n of e.controls){let a=t.querySelector(`[data-nc-id="${tt(n.id)}"]`);a instanceof Element&&ue(a,n)}}else if(e.type==="fx"){Jr(t,e);for(let n of[...e.controls,...e.more??[]]){let a=t.querySelector(`[data-nc-id="${tt(n.id)}"]`);a instanceof Element&&ue(a,n)}}}}function Ic(t,e){let n=wn(t.id,t.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=t.id,a.min=String(t.min),a.max=String(t.max),a.step=String(t.step),a.value=String(t.value),a.disabled=t.disabled===!0,a.dataset.ncId=t.id,a.addEventListener("input",()=>{let o=e(a);o?.type==="slider"&&o.onChange(Number(a.value))}),a.addEventListener("change",()=>{let o=e(a);o?.type==="slider"&&o.onCommit?.(Number(a.value))});let r=n.querySelector("[data-nc-readout]");return n.insertBefore(a,r),t.onTap&&n.insertBefore(zc(t,a,e),r),n.append(Q()),ue(n,t),n}function zc(t,e,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=t.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),a.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,a.append(be());let r=o=>{let s=n(e);s?.type==="slider"&&s.onTap?.(o)};return a.addEventListener("pointerdown",o=>{o.button===0&&r(o.timeStamp)}),a.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),r(o.timeStamp))}),a}function Rc(t,e){let n=wn(t.id,t.label),a=document.createElement("select");a.className="nc-select",a.id=t.id,a.dataset.ncId=t.id;for(let r of t.options){let o=document.createElement("option");o.value=r.value,o.textContent=r.label,a.append(o)}return a.value=t.value,a.addEventListener("change",()=>{let r=e(a);r?.type==="select"&&r.onChange(a.value)}),n.append(a,Q()),n}function Dc(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{let a=e(n);a?.type==="toggle"&&a.onPress()}),n.append(Q()),ue(n,t),n}function Bc(t,e){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{let o=e(n);o?.type==="button"&&o.onPress()}),n.append(Q()),ue(n,t),!t.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=t.id,r.setAttribute("aria-label","Surprise me"),r.title=t.sparkleTitle??"Surprise me",r.innerHTML=qr(),r.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&Gr(o);let s=e(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,r),a}function Oc(t){let e=wn(t.id,t.label);return e.append(Q()),ue(e,t),e}var qc=450;function Pc(t,e){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Moves");for(let a of t.groups){let r=document.createElement("div");r.className="nc-moves-row",r.setAttribute("role","group"),r.setAttribute("aria-label",a.label),a.title&&(r.title=a.title);let o=document.createElement("span");o.className="nc-moves-label",o.setAttribute("aria-hidden","true"),o.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let u=document.createElement("button");u.type="button",u.className="nc-moves-btn",u.dataset.ncMove=l.id,u.title=l.title??l.text,u.setAttribute("aria-label",`${a.label} ${l.text}`),u.append(jc(l.icon)),u.addEventListener("click",()=>{let c=e(n);c?.type==="moves"&&c.onMove(l.id)}),s.append(u)}r.append(o,s),n.append(r)}return Pr(n,t),n}function Pr(t,e){for(let n of e.groups)for(let a of n.moves){let r=t.querySelector(`[data-nc-move="${tt(a.id)}"]`);r instanceof HTMLButtonElement&&(r.disabled=a.disabled===!0)}}function jc(t){let e="http://www.w3.org/2000/svg",n=document.createElementNS(e,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),t?.stroke){let a=document.createElementNS(e,"path");a.setAttribute("d",t.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(t?.fill){let a=document.createElementNS(e,"path");a.setAttribute("d",t.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function Hc(t){let e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(Q()),e}function vi(t){let e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(Q()),e}function wi(t){if(typeof t.valueText=="string")return t.valueText;let e=Et(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function jr(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function _c(t,e){let n=e.max-e.min||1,a=(e.value-e.min)/n;jr(t,e.modulated===!0);let r=Math.round(a*270);t.style.setProperty("--knob-turn",String(r)),e.bipolar&&(t.style.setProperty("--knob-from",String(Math.min(r,135))),t.style.setProperty("--knob-to",String(Math.max(r,135)))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",wi(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${wi(e)}`}function Wc(t,e){let n=t.max-t.min||1,a=typeof t.step=="number"&&t.step>0?t.step:n/100,r=e.shiftKey?a/10:a;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+a*10:e.key==="PageDown"?t.value-a*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+r:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-r:null}function Gc(t,e){let n=wn(t.id,t.label);t.compact&&(n.dataset.ncCompact=""),t.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=t.id;let r=document.createElement("i");r.className="nc-knob-mark",a.append(r);let o=0,s=0;a.addEventListener("pointerdown",c=>{o=c.clientY;let d=e(a);s=d&&"value"in d?Number(d.value):0,a.setPointerCapture?.(c.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",c=>{if(a.hasPointerCapture&&!a.hasPointerCapture(c.pointerId))return;let d=e(a);if(d?.type!=="knob")return;let p=d.max-d.min||1,f=Math.min(d.max,Math.max(d.min,s-(c.clientY-o)*p/120));d.onChange(f)}),a.addEventListener("dblclick",()=>{let c=e(a);c?.type==="knob"&&typeof c.defaultValue=="number"&&c.onChange(c.defaultValue)}),a.addEventListener("keydown",c=>{let d=e(a);if(d?.type!=="knob")return;let p=Wc(d,c);p!==null&&(c.preventDefault(),d.onChange(Math.min(d.max,Math.max(d.min,p))))});let u=n.querySelector("[data-nc-readout]");return n.insertBefore(a,u),n.append(Q()),ue(n,t),n}function Yc(t,e){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(let a of t.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=a.value,r.setAttribute("role","tab"),r.textContent=a.label,r.addEventListener("click",()=>{let o=e(n);o?.type==="choice"&&o.onChange(a.value)}),r.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),u=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")u=(l+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")u=(l-1+s.length)%s.length;else if(o.key==="Home")u=0;else if(o.key==="End")u=s.length-1;else return;let c=s[u];c instanceof HTMLButtonElement&&(o.preventDefault(),c.focus(),c.click())}),n.append(r)}return n.append(Q()),Hr(n,t),n}function Hr(t,e){for(let n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function Zc(t,e){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let d=0;d<t.slots.length;d++){let p=t.slots[d],f=document.createElement("span");f.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(d),g.textContent=p.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(g,be()),Xc(f,g,n,d,e),a.append(f)}let r=t.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=qr(),r.append(be()),r.addEventListener("click",()=>{Gr(n);let d=e(n);d?.type==="slotRow"&&d.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let d=e(n);d?.type==="slotRow"&&d.onMorph(Number(l.value))});let u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",o.append(s,u,l);let c=document.createElement("div");return c.className="nc-slot-line",c.append(a,...r?[r]:[]),n.append(c,o,Q()),_r(n,e),Wr(n,t),n}function xi(t,e,n,a){let r=n(t);if(r?.type!=="slotRow")return;bt(t);let o=a.shiftKey?"store":a.altKey?"clear":"recall";r.onSlot(e,o)}function Xc(t,e,n,a,r){let o=0,s=0,l=0,u=!1,c=!1,d=!1,p=!1,f=()=>{window.clearTimeout(o),o=0},g=h=>{let v=h.clientX-s,w=h.clientY-l;v*v+w*w>bi*bi&&(u=!0,f())},b=()=>{p&&(p=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",m))},y=h=>{let v=o!==0&&!u&&!c;f(),b(),v&&(d=!0,xi(n,a,r,h))},m=()=>{u=!0,f(),b()};t.addEventListener("pointerdown",h=>{h.button===0&&(b(),c=!1,u=!1,d=!1,s=h.clientX,l=h.clientY,f(),o=window.setTimeout(()=>{o=0,!u&&(c=!0,Vc(n,e,a,r))},Cc),p=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",m))}),t.addEventListener("contextmenu",h=>h.preventDefault()),t.addEventListener("click",h=>{if(d||c||u){d=!1,c=!1,u=!1;return}xi(n,a,r,h)})}function _r(t,e){if(t.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=$i("Save","store"),r=$i("Clear","clear");n.append(a,r);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),bt(t)}),o.addEventListener("click",s=>s.stopPropagation()),t.append(o,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let u=e(t);if(u?.type!=="slotRow")return;let c=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(u.onSlot(c,"store"),bt(t)):l.dataset.ncSlotOp==="clear"&&(u.onSlot(c,"clear"),bt(t))}),t.addEventListener("keydown",s=>{s.key==="Escape"&&bt(t)})}function $i(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function Vc(t,e,n,a){_r(t,a);let r=t.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let o=t.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function bt(t){let e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Wr(t,e){for(let r of t.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let o=Number(r.dataset.ncSlot),s=e.slots[o];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));let a=t.querySelector("[data-nc-morph]");a&&(a.textContent=e.morphText)}function Gr(t){let e=t.dataset.ncLastFill||null,n=kl(e);t.dataset.ncLastFill=n;let a=El(n);if(a)for(let[r,o]of Object.entries(a))t.style.setProperty(r,o)}function Uc(t,e){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,r=o=>{if(a===o)return;a=o,n.setAttribute("aria-pressed",o?"true":"false");let s=e(t);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),r(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>r(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||r(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),r(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function Kc(t,e){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let r=m=>{let h=document.createElement("button");return h.type="button",h.setAttribute("role","radio"),h.textContent=m,a.append(h),h},o=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=m=>{for(let h of[o,s]){let v=h===m;h.setAttribute("aria-checked",v?"true":"false"),h.tabIndex=v?0:-1}};l(o);for(let m of[o,s])m.addEventListener("click",()=>l(m));a.addEventListener("keydown",m=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(m.key))return;m.preventDefault();let h=s.getAttribute("aria-checked")==="true"?o:s;l(h),h.focus()});let u=document.createElement("div");if(u.className="nc-step-tools",u.append(a),t.onFill&&u.append(Uc(n,e)),t.onClear){let m=document.createElement("button");m.type="button",m.className="nc-fill nc-clear",m.dataset.ncClear="",m.textContent=t.clearLabel??"Clear",m.title="Clear every step (Undo takes it back)",m.addEventListener("click",()=>{let h=e(n);h?.type==="stepGrid"&&h.onClear?.()}),u.append(m)}n.append(u);for(let m of t.rows){let h=document.createElement("div");h.className="nc-row",h.dataset.ncRow="";let v=document.createElement("button");v.type="button",v.className="nc-name",v.textContent=m.label,v.setAttribute("aria-label",`Select ${m.label}`),m.lane&&(v.dataset.ncLane=String((m.lane-1)%4+1));let w=!1,k=0;v.addEventListener("pointerdown",E=>{w=!1,!(E.pointerType==="mouse"||E.button!==0)&&(k=window.setTimeout(()=>{let M=e(n);M?.type!=="stepGrid"||!M.selectedRows||(w=!0,M.onSelectRow?.(M.rows.findIndex(I=>I.id===m.id),!0))},qc))});for(let E of["pointerup","pointercancel","pointerleave"])v.addEventListener(E,()=>window.clearTimeout(k));v.addEventListener("contextmenu",E=>{w&&E.preventDefault()}),v.addEventListener("click",E=>{let M=e(n);if(M?.type!=="stepGrid")return;if(w){w=!1;return}let I=M.rows.findIndex(Z=>Z.id===m.id),q=!!M.selectedRows&&(E.shiftKey||E.metaKey||E.ctrlKey);M.onSelectRow?.(I,q)}),v.addEventListener("keydown",E=>Jc(n,v,E));let x=[];for(let E of["mute","solo"]){if(!(E==="mute"?t.onMute:t.onSolo))continue;let M=document.createElement("span");M.className="nc-ms-wrap";let I=document.createElement("button");I.type="button",I.className="nc-ms",I.dataset.ncMs=E,I.textContent=E==="mute"?"M":"S",I.setAttribute("aria-label",`${E==="mute"?"Mute":"Solo"} ${m.label}`),M.append(I,be()),M.addEventListener("click",()=>{let q=e(n);if(q?.type!=="stepGrid")return;let Z=q.rows.findIndex(ee=>ee.id===m.id);(E==="mute"?q.onMute:q.onSolo)?.(Z)}),x.push(M)}let A=document.createElement("div");A.className="nc-steps";for(let E=0;E<m.steps.length;E++){let M=document.createElement("span");M.className="nc-step-wrap";let I=document.createElement("button");I.type="button",I.className="nc-step",I.dataset.ncStep=`${m.id}:${E}`,I.setAttribute("aria-label",`${m.label} step ${E+1}`),M.append(I,be()),M.addEventListener("click",q=>{let Z=e(n);if(Z?.type!=="stepGrid")return;let ee=Z.rows.findIndex(X=>X.id===m.id),z=s.getAttribute("aria-checked")==="true";Z.onToggle(ee,E,q.shiftKey||z)}),A.append(M)}if(t.onLength&&A.append(Qc(n,A,m,e)),h.append(...x,v,A),t.onDice){let E=document.createElement("button");E.type="button",E.className="nc-sparkle nc-row-dice",E.dataset.ncDice=m.id,E.setAttribute("aria-label",`Re-roll ${m.label}`),E.title=`Re-roll ${m.label}: new steps for this lane (Undo takes it back)`,E.innerHTML=yi(),E.append(be()),E.addEventListener("click",()=>{let M=e(n);M?.type==="stepGrid"&&M.onDice?.(M.rows.findIndex(I=>I.id===m.id))}),h.append(E)}h.addEventListener("click",E=>{if(E.target!==h)return;let M=e(n);M?.type==="stepGrid"&&M.onSelectRow?.(M.rows.findIndex(I=>I.id===m.id))}),ki(n,A,".nc-step-wrap",e,s,()=>m.id),n.append(h)}let c=document.createElement("div");c.className="nc-pads-head";let d=(m,h,v)=>{let w=document.createElement("button");return w.type="button",w.className=m,w.textContent=h,v&&w.setAttribute("aria-label",v),w},p=d("nc-pads-step","‹","Previous lane"),f=d("nc-pads-step","›","Next lane"),g=document.createElement(t.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),t.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let m=e(n);m?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",na(n,m))}));for(let[m,h]of[[p,-1],[f,1]])m.addEventListener("click",()=>{let v=e(n);if(v?.type!=="stepGrid"||v.rows.length===0)return;let w=v.rows.length;v.onSelectRow?.(((jt(v)+h)%w+w)%w)});if(c.append(p,g,f),t.onDice){let m=d("nc-pads-step nc-pads-dice","","Re-roll lane");m.dataset.ncPadsDice="",m.innerHTML=yi(),m.addEventListener("click",()=>{let h=e(n);if(h?.type!=="stepGrid")return;let v=jt(h);v>=0&&h.onDice?.(v)}),c.append(m)}if(t.transport){let m=d("nc-pads-play","Play");m.dataset.ncPadsPlay="",m.addEventListener("click",()=>{let h=e(n);h?.type==="stepGrid"&&h.transport?.onToggle()}),c.append(m)}n.append(c);let b=document.createElement("div");b.className="nc-pads",b.setAttribute("role","group");let y=Math.max(0,...t.rows.map(m=>m.steps.length));for(let m=0;m<y;m++){let h=document.createElement("button");h.type="button",h.className="nc-pad",h.dataset.ncPad=String(m),h.textContent=String(m+1),h.addEventListener("click",v=>{let w=e(n);if(w?.type!=="stepGrid")return;let k=jt(w);if(k<0)return;if(n.dataset.ncLenMode==="true"){w.onLength?.(k,m+1);return}let x=s.getAttribute("aria-checked")==="true";w.onToggle(k,m,v.shiftKey||x)}),b.append(h)}return ki(n,b,".nc-pad",e,s,()=>{let m=e(n);return m?.type==="stepGrid"?m.rows[jt(m)]?.id:void 0}),n.append(b),n.append(Q()),na(n,t),n}function jt(t){let e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function ki(t,e,n,a,r,o){let s="on",l=!0,u=-1,c=(d,p)=>{let f=d.rows[u]?.steps[p];!f||p>=d.rows[u].length||(d.onSet?d.onSet(u,p,s,l):!!f[s]!==l&&d.onToggle(u,p,s==="accent"))};xc(e,n,d=>{let p=a(t);if(p?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(d.kind!=="paint")return;let f=p.rows.findIndex(g=>g.id===o());f>=0&&p.rows[f].length!==d.pad+1&&p.onLength?.(f,d.pad+1);return}if(d.kind==="paint"){if(d.phase==="start"){let f=o();u=p.rows.findIndex(b=>b.id===f);let g=p.rows[u]?.steps[d.pad];if(!g)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[s]}c(p,d.pad)}else if(d.kind==="long"){let f=o(),g=p.rows.findIndex(y=>y.id===f),b=e.querySelectorAll(n)[d.pad];g>=0&&b instanceof HTMLElement&&p.onLongPress?.(g,d.pad,b)}}})}function Jc(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...t.querySelectorAll(".nc-name")],r=a.indexOf(e),o=r;n.key==="ArrowDown"?o=r+1:n.key==="ArrowUp"?o=r-1:n.key==="Home"?o=0:o=a.length-1;let s=a[o];!(s instanceof HTMLElement)||s===e||(n.preventDefault(),s.focus(),s.click())}function Qc(t,e,n,a){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(be());let o=c=>{let d=a(t);if(d?.type!=="stepGrid")return;let p=d.rows.findIndex(b=>b.id===n.id),f=d.rows[p];if(!f)return;let g=Math.max(1,Math.min(f.steps.length,c));g!==f.length&&d.onLength?.(p,g)},s=c=>{let d=[...e.querySelectorAll(".nc-step")],p=1;return d.forEach((f,g)=>{let b=f.getBoundingClientRect();b.width>0&&c>=b.left+b.width/2&&(p=g+1)}),p},l=c=>o(s(c.clientX)),u=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete r.dataset.dragging};return r.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),r.addEventListener("keydown",c=>{let d=a(t);if(d?.type!=="stepGrid")return;let p=d.rows.find(g=>g.id===n.id);if(!p)return;let f={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};c.key in f&&(c.preventDefault(),o(f[c.key]))}),r}var In=new WeakMap,Ht=new WeakMap;function ed(t){return t?(Ht.has(t)||(Ht.set(t,cn(t)),gr(e=>{Ht.set(t,e);for(let n of t.querySelectorAll("[data-nc-velocity]"))ta(n,Number(n.getAttribute("data-nc-velocity")))},t)),Ht.get(t)):"light"}function ta(t,e){let n=typeof e=="number"&&Number.isFinite(e)?e:null,a=n===null?null:ed(t.ownerDocument),r=n===null?null:`${a} ${n}`;if(!(In.has(t)&&In.get(t)===r)){if(In.set(t,r),n===null){for(let o of Object.keys(si(1)))t.style.removeProperty(o);t.removeAttribute("data-nc-velocity");return}t.setAttribute("data-nc-velocity",String(n));for(let[o,s]of Object.entries(si(n,oi[a]??oi.light)))t.style.setProperty(o,s)}}function na(t,e){let n=e.rows.some(d=>d.solo),a=t.querySelector("[data-nc-clear]");a&&a.textContent!==(e.clearLabel??"Clear")&&(a.textContent=e.clearLabel??"Clear");let r=t.querySelector(".nc-pads"),o=e.rows.find(d=>d.id===e.selectedRow)??e.rows[0],s=t.querySelector(".nc-pads-label"),l=t.dataset.ncLenMode==="true"&&!!e.onLength;s instanceof HTMLElement&&o&&(s.textContent=l?`${o.label} · ${o.length}`:o.label,e.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let u=t.querySelector("[data-nc-pads-dice]");u instanceof HTMLElement&&o&&(u.setAttribute("aria-label",`Re-roll ${o.label}`),u.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let c=t.querySelector("[data-nc-pads-play]");if(c instanceof HTMLElement){let d=!!e.transport?.playing,p=e.transport?.label??(d?"Stop":"Play");c.textContent!==p&&(c.textContent=p),c.setAttribute("aria-pressed",d?"true":"false");let f=e.transport?.ariaLabel;f?c.setAttribute("aria-label",f):c.removeAttribute("aria-label")}if(r instanceof HTMLElement&&o){r.setAttribute("aria-label",`${o.label} steps`),o.lane&&(r.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?r.dataset.silent="true":delete r.dataset.silent;let d=o.length>0?(e.playhead%o.length+o.length)%o.length:-1;for(let p of r.querySelectorAll("[data-nc-pad]")){let f=Number(p.getAttribute("data-nc-pad")),g=o.steps[f];p instanceof HTMLButtonElement&&(p.hidden=!g||!l&&f>=o.length,l&&f>=o.length?p.dataset.out="true":delete p.dataset.out,l&&f===o.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${o.label} step ${f+1}`),p.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?p.dataset.accent="true":delete p.dataset.accent,g?.dim?p.dataset.dim="true":delete p.dataset.dim,ta(p,g?.velocity),e.playhead>=0&&f===d?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let d of e.rows){for(let g=0;g<d.steps.length;g++){let b=d.steps[g],y=t.querySelector(`[data-nc-step="${d.id}:${g}"]`);if(!(y instanceof HTMLButtonElement))continue;let m=y.closest(".nc-row");if(m instanceof HTMLElement){e.selectedRow===d.id?m.dataset.selected="true":delete m.dataset.selected;let w=e.selectedRow!==d.id&&(e.selectedRows??[]).includes(d.id);w?m.dataset.picked="true":delete m.dataset.picked;let k=m.querySelector(".nc-name");k instanceof HTMLElement&&(k.setAttribute("aria-pressed",e.selectedRow===d.id||w?"true":"false"),k.textContent!==d.label&&(k.textContent=d.label,k.setAttribute("aria-label",`Select ${d.label}`))),d.mute||n&&!d.solo?m.dataset.silent="true":delete m.dataset.silent;for(let x of m.querySelectorAll("[data-nc-ms]")){let A=x.getAttribute("data-nc-ms")==="mute"?d.mute:d.solo;x.setAttribute("aria-pressed",A?"true":"false")}}y.setAttribute("aria-pressed",b.on?"true":"false"),b.accent?y.dataset.accent="true":delete y.dataset.accent,b.dim?y.dataset.dim="true":delete y.dataset.dim,g%4===0?y.dataset.bar="true":delete y.dataset.bar,typeof b.velocity=="number"?(y.dataset.velocity="true",y.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,b.velocity))*100)}%`)):(delete y.dataset.velocity,y.style.removeProperty("--level")),ta(y,b.velocity);let h=e.playhead>=0&&d.length>0?(e.playhead%d.length+d.length)%d.length:-1;g===h?y.dataset.playhead="true":delete y.dataset.playhead;let v=!!e.onLength&&e.selectedRow===d.id;y.hidden=g>=d.length&&!v,g>=d.length&&v?y.dataset.out="true":delete y.dataset.out}let p=t.querySelector(`[data-nc-len="${d.id}"]`),f=t.querySelector(`[data-nc-step="${d.id}:${Math.max(0,d.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&f&&f.nextElementSibling!==p){let g=document.activeElement===p;f.after(p),g&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(d.length)),p.setAttribute("aria-label",`${d.label} length, ${d.length} steps`),p.title=`${d.label}: drag to set the length (${d.length} steps)`)}}function td(t){let e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;let n=document.createElement("span");n.className="nc-label",n.textContent=t.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=t.id,a.dataset.ncPaint=t.paint,e.append(n,a,Q()),e}function nd(t,e){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let r=document.createElement("span");r.className="nc-strip-name",r.dataset.ncStripName="";let o=!t.master&&typeof t.onFold=="function",s=null;if(o&&(n.dataset.ncFoldable="",s=Ur(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let h=e(n);h?.type==="strip"&&(h.onFold?.(h.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(r),t.onRemove){let h=document.createElement("button");h.type="button",h.className="nc-strip-remove",h.dataset.ncStripRemove="",h.textContent="×",h.addEventListener("click",()=>{let v=e(n);v?.type==="strip"&&v.onRemove?.(h)}),a.append(h)}let l=document.createElement("div");if(l.className="nc-strip-hacks",t.onHacks){let h=document.createElement("span");h.className="nc-hacks-wrap";let v=document.createElement("button");v.type="button",v.className="nc-hacks",v.dataset.ncHacks="",h.append(v,be()),h.addEventListener("click",()=>{let w=e(n);w?.type==="strip"&&w.onHacks?.()}),l.append(h)}let u=document.createElement("div");u.className="nc-strip-ms";for(let h of["mute","solo"]){if(!(h==="mute"?t.onMute:t.onSolo))continue;let v=document.createElement("span");v.className="nc-ms-wrap";let w=document.createElement("button");w.type="button",w.className="nc-ms",w.dataset.ncMs=h,w.textContent=h==="mute"?"M":"S",v.append(w,be()),v.addEventListener("click",()=>{let k=e(n);k?.type==="strip"&&(h==="mute"?k.onMute:k.onSolo)?.()}),u.append(v)}let c=document.createElement("div");c.className="nc-strip-sends";for(let h of t.sends??[])c.append(rt({...h,type:"knob",compact:!0},e));let d=document.createElement("div");d.className="nc-strip-pan",t.pan&&d.append(rt(Ea(t),e));let p=document.createElement("div");p.className="nc-strip-body";let f=document.createElement("span");f.className="nc-scale",f.setAttribute("aria-hidden","true");for(let h of t.ticks??[]){let v=document.createElement("span");v.className="nc-scale-tick",v.style.setProperty("--tick-pos",String(h.value)),v.textContent=h.label,f.append(v)}let g=Yl({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:h=>{let v=e(n);v?.type==="strip"&&v.onChange(h)},onReset:()=>{let h=e(n);h?.type==="strip"&&Ai(h)}}),b=Jl({channels:t.channels===2?2:1,label:t.label,onClear:()=>{let h=e(n);h?.type==="strip"&&h.onClipClear?.()}});if(p.append(f,g.el,b.el),o){let h=document.createElement("button");h.type="button",h.className="nc-ui-fx-fold nc-strip-fold",h.dataset.ncStripFold="",h.setAttribute("aria-expanded","false");let v=document.createElement("span");v.className="nc-strip-fold-cap",v.setAttribute("aria-hidden","true");let w=document.createElement("span");w.className="nc-ui-fx-fold-name",w.dataset.ncStripFoldName="";let k=document.createElement("span");k.className="nc-strip-fold-pan",k.setAttribute("aria-hidden","true"),k.hidden=!t.pan,h.append(v,k,w),h.addEventListener("click",()=>{let x=e(n);if(x?.type!=="strip")return;x.onFold?.(!1);let A=n.querySelector("[data-nc-strip-hide]");A instanceof HTMLElement&&A.focus()}),p.prepend(h)}let y=document.createElement("button");y.type="button",y.className="nc-strip-db",y.dataset.ncReadout="";let m=0;return y.addEventListener("click",h=>{let v=e(n);v?.type!=="strip"||!v.onTypeIn||(window.clearTimeout(m),h.detail===0?Ei(n,y,e):h.detail===1&&(m=window.setTimeout(()=>Ei(n,y,e),id)))}),y.addEventListener("dblclick",()=>{window.clearTimeout(m);let h=e(n);h?.type==="strip"&&Ai(h)}),s&&n.append(s),n.append(a,l,u,c,d,p,y,Q()),Xr(n,t),n}function Ea(t){let e=t.pan;return{type:"knob",id:e.id,label:e.label??"L R",ariaLabel:e.ariaLabel??`${t.label} pan`,min:-1,max:1,step:e.step??.05,value:e.value,valueText:e.valueText??ad(e.value),defaultValue:0,compact:!0,bipolar:!0,help:e.help,onChange:n=>e.onChange(n)}}function ad(t){let e=Math.round(Math.min(1,Math.max(-1,t))*100);return e===0?"C":e<0?`L ${-e}`:`R ${e}`}var id=250;function Ei(t,e,n){let a=n(t);if(a?.type!=="strip"||!a.onTypeIn||t.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=a.valueText??Et(a.value),r.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(r),r.focus(),r.select?.();let o=!1,s=l=>{if(o)return;o=!0;let u=r.value;if(r.remove(),e.hidden=!1,l){let c=n(t);c?.type==="strip"&&c.onTypeIn?.(u)}e.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function rd(t,e){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",a.append(r,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=e(n),u=s.value;Zr(s),l?.type==="stripAdd"&&u&&l.onAdd(u)}),n.append(a,s,Q()),Yr(n,t),n}function Yr(t,e){let n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);let a=t.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",e.ariaLabel??e.label);let r=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],o=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==s&&(a.replaceChildren(...r.map(l=>{let u=document.createElement("option");return u.value=l.value,u.textContent=l.label,u.disabled=l.disabled===!0,u})),Zr(a))}function Zr(t){let e=t.options[0];e&&(e.selected=!0)}function Ai(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function Xr(t,e){let n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);let a=t.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${e.label}`),a.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);let r=t.querySelector(".nc-fader"),o=r?Zl(r):void 0;o&&(o.configure({step:e.step}),o.set(e.value),o.setText(e.valueText),o.setLabel(`${e.label} level`)),kr(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);let s=t.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let p=e.valueText??Et(e.value);s.textContent!==p&&(s.textContent=p),s.setAttribute("aria-label",`${e.label} level ${p}`);let f=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";s.title=e.onTypeIn?`Click to type a value. ${f}`:f}for(let p of t.querySelectorAll("[data-nc-ms]")){let f=p.getAttribute("data-nc-ms"),g=f==="mute"?e.mute===!0:e.solo===!0;p.setAttribute("aria-pressed",g?"true":"false"),p.setAttribute("aria-label",`${f==="mute"?"Mute":"Solo"} ${e.label}`)}let l=t.querySelector("[data-nc-hacks]");if(l){let p=e.hacksLabel??"Hacks";l.textContent!==p&&(l.textContent=p),l.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${p}: ${e.label}`)}if(e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity,e.pan){t.style.setProperty("--nc-strip-pan",String(e.pan.value));let p=t.querySelector(`.nc-strip-pan [data-nc-id="${tt(e.pan.id)}"]`);p&&ue(p,Ea(e))}let u=!e.master&&typeof e.onFold=="function"&&e.folded===!0;u?t.dataset.ncFolded="true":delete t.dataset.ncFolded;let c=t.querySelector("[data-nc-strip-hide]");c instanceof HTMLElement&&(Kr(c,u,e.label),ot(c,e.foldHelp));let d=t.querySelector("[data-nc-strip-fold]");if(d instanceof HTMLElement){d.hidden=!u,d.setAttribute("aria-label",`Expand ${e.label}`);let p=d.querySelector("[data-nc-strip-fold-name]");p&&p.textContent!==e.label&&(p.textContent=e.label),ot(d,e.foldedHelp??e.foldHelp)}}function Si(t,e){let n=t?.querySelector?.(`.nc-strip[data-nc-id="${tt(e)}"]`);return kr(n?.querySelector(".nc-meter")??void 0)}function od(t,e){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${t.id}-name`,a.textContent=t.title;let r=typeof t.onFold=="function";if(t.on===void 0&&!r&&!un(t))n.append(a);else{let o=document.createElement("div");if(o.className="nc-ui-fx-hd",o.append(a),t.on!==void 0){let s=wr({checked:t.on,labelledBy:a.id,onChange:l=>{let u=e(s.el);u?.type==="fx"&&u.onToggle?.(l)}});s.el.dataset.ncFxSwitch="",o.append(s.el)}r&&o.append(ld(n,e)),un(t)&&o.append(pd(n,e)),n.append(o)}r&&n.prepend(cd(n,e));for(let o of t.controls)n.append(rt(o,e));if(t.more?.length){let o=document.createElement("details");o.className="nc-ui-more";let s=document.createElement("summary");s.textContent=t.moreLabel??"More",o.append(s);for(let l of t.more)o.append(rt(l,e));n.append(o)}return n.append(Q()),Jr(n,t),n}var sd=t=>typeof t.getClientRects=="function"?t.getClientRects().length>0:!t.hidden;function Vr(t){let e=t.querySelector(":scope > [data-nc-fx-fold]"),n=t.querySelector("[data-nc-fx-hide]"),a=t.dataset.ncFolded==="true"&&e&&sd(e)?e:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function ld(t,e){let n=Ur();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=e(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),Vr(t))}),n}function Ur(){let t=document.createElement("button");t.type="button",t.className="nc-fold-toggle";let e=document.createElement("span");return e.className="nc-fold-tri",e.setAttribute("aria-hidden","true"),t.append(e),t}function Kr(t,e,n){t.setAttribute("aria-expanded",e?"false":"true"),t.setAttribute("aria-label",`${e?"Expand":"Minimize"} ${n}`),t.title=e?"Expand":"Minimize"}function cd(t,e){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let r=document.createElement("span");r.className="nc-ui-fx-fold-name",r.dataset.ncFxFoldName="";let o=document.createElement("span");return o.className="nc-fold-tri",o.setAttribute("aria-hidden","true"),n.append(o,a,r),n.addEventListener("click",()=>{let s=e(n);s?.type==="fx"&&(s.onFold?.(!1),Vr(t))}),n}var At=new Set;function aa(t,e){let n=t.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(e):setTimeout(e,16)}var un=t=>t.maximize===!0||t.maximize!==!1&&t.controls.some(e=>e.type==="eqGraph"),dd="(max-width: 768px)";function ud(){let t=document.createElement("span");t.className="nc-fx-max-icon",t.setAttribute("aria-hidden","true");for(let e=0;e<4;e++)t.append(document.createElement("i"));return t}function pd(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.append(ud()),n.addEventListener("click",()=>{let a=e(n);a?.type==="fx"&&(md(t,a,!At.has(a.id)),n.focus())}),n}function md(t,e,n){n?At.add(e.id):At.delete(e.id),Aa(t,e)}function hd(t){return t.ownerDocument.defaultView?.matchMedia?.(dd).matches?"tall":t.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Aa(t,e){let n=t.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=un(e)&&At.has(e.id)&&!(typeof e.onFold=="function"&&e.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!un(e)||typeof e.onFold=="function"&&e.folded===!0,n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${e.title}`),n.title=a?"Restore (Esc)":"Maximize",ot(n,e.maxHelp)),!a){t.dataset.ncMax&&Mi(t);return}if(!t.isConnected){let o=()=>t.isConnected&&At.has(e.id)&&Aa(t,e);queueMicrotask(()=>{t.isConnected?o():aa(t.ownerDocument,o)});return}let r=hd(t);t.dataset.ncMax!==r&&(t.dataset.ncMax&&Mi(t),t.dataset.ncMax=r,r==="over"&&fd(t,e)),gd(t.ownerDocument),r==="over"&&Sa(t),aa(t.ownerDocument,()=>{for(let o of t.querySelectorAll(".nc-eq"))o instanceof HTMLElement&&Nt(o)})}function Mi(t){let e=t.dataset.ncMax;delete t.dataset.ncMax,e==="over"&&(t.previousElementSibling?.matches(".nc-fx-ghost")&&t.previousElementSibling.remove(),t.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),t.style.removeProperty("left"),t.style.removeProperty("top"),t.style.removeProperty("width"),t.removeAttribute("role"),t.removeAttribute("aria-label")),aa(t.ownerDocument,()=>{for(let n of t.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Nt(n)})}function fd(t,e){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${t.offsetHeight}px`,t.before(n),t.setAttribute("role","region"),t.setAttribute("aria-label",`${e.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${e.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let r=t.querySelector("[data-nc-fx-max]");r instanceof HTMLElement&&r.click()}),t.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function Sa(t){let e=t.previousElementSibling,n=t.closest(".nc-module");if(!(e instanceof HTMLElement)||!e.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,r=t.ownerDocument.defaultView,o=Number.parseFloat(r?.getComputedStyle(a).columnGap??"")||0,s=cc(e.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),o,r?.innerWidth??Number.POSITIVE_INFINITY);t.style.left=`${s.left}px`,t.style.top=`${s.top}px`,t.style.width=`${s.width}px`}var Li=new WeakSet;function gd(t){Li.has(t)||(Li.add(t),t.addEventListener("keydown",e=>{if(e.key!=="Escape"||e.defaultPrevented)return;let n=[...t.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(r=>r.contains(t.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(e.preventDefault(),a.click())}),t.defaultView?.addEventListener("resize",()=>{for(let e of t.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))e instanceof HTMLElement&&Sa(e)}))}function Jr(t,e){let n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);let a=t.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim;let r=typeof e.onFold=="function"&&e.folded===!0;r?t.dataset.ncFolded="true":delete t.dataset.ncFolded;let o=t.querySelector("[data-nc-fx-hide]");o instanceof HTMLElement&&(Kr(o,r,e.title),ot(o,e.foldHelp)),Aa(t,e);let s=t.querySelector(":scope > [data-nc-fx-fold]");if(s instanceof HTMLElement){let l=e.on===void 0?"":e.on?"On":"Off";s.hidden=!r,s.setAttribute("aria-label",`Expand ${e.title}${l?`, ${l.toLowerCase()}`:""}`),s.dataset.on=e.on===!0?"true":"false";let u=s.querySelector("[data-nc-fx-fold-state]");u&&(u.textContent=l,u.hidden=l==="");let c=s.querySelector("[data-nc-fx-fold-name]");c&&(c.textContent=e.title),ot(s,e.foldHelp)}}function ot(t,e){e?t.setAttribute("data-nc-help",e):t.removeAttribute("data-nc-help")}function tt(t){return t.replace(/["\\]/g,"\\$&")}function bd(t,e){for(let n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=e.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);a?.type==="canvas"&&Er(n,a)}for(let n of t.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Nt(n);for(let n of t.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&Sa(n);Fc(t)}var Ti="data-nc-help";function yd(t,e,n,a=0,r=6,o=8){let s=t.top-r-e.height,l=s>=a+o?"above":"below",u=l==="above"?s:t.bottom+r,c=Math.max(o,Math.min(t.left,n-o-e.width));return{top:Math.round(u),left:Math.round(c),side:l}}var zn=new WeakMap;function vd(t){let e=parseFloat(t.defaultView?.getComputedStyle(t.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(e)?e:0}function wd({document:t=globalThis.document,delay:e=350}={}){if(!t)return{uninstall(){},hide(){}};let n=zn.get(t);if(n)return n;let a=t.defaultView,r=null,o=null,s,l=()=>{clearTimeout(s),o=null,r&&(r.hidden=!0)},u=f=>{let g=f.getAttribute(Ti);if(!g)return;r||(r=t.createElement("div"),r.className="nc-ui-help",r.setAttribute("role","tooltip"),r.dataset.testid="nc-help",r.style.position="fixed",r.style.pointerEvents="none",r.style.zIndex="6",t.body.appendChild(r)),r.textContent=g,r.hidden=!1,r.style.visibility="hidden",r.style.top="0px",r.style.left="0px";let b=f.getBoundingClientRect(),y=yd(b,{width:r.offsetWidth,height:r.offsetHeight},a.innerWidth,vd(t));r.style.top=`${y.top}px`,r.style.left=`${y.left}px`,r.dataset.side=y.side,r.style.visibility=""},c=f=>{if(f.pointerType==="touch")return;let g=f.target&&f.target.closest?f.target.closest(`[${Ti}]`):null;g!==o&&(l(),g&&(o=g,s=setTimeout(()=>{o===g&&g.isConnected&&u(g)},e)))},d=f=>{f.key==="Escape"&&l()};t.addEventListener("pointerover",c),t.addEventListener("pointerdown",l,!0),t.addEventListener("keydown",d),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);let p={hide:l,uninstall(){l(),t.removeEventListener("pointerover",c),t.removeEventListener("pointerdown",l,!0),t.removeEventListener("keydown",d),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),r?.remove(),r=null,zn.delete(t)}};return zn.set(t,p),p}var Ma="netcomposer.rhythm.hidden.v1",Me=new WeakMap;function Rn(){try{return globalThis.localStorage??null}catch{return null}}function Qr(t,e=Ma){try{let n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Ci(t,e,n,a=Ma){let r=Qr(t,a);n?r.add(e):r.delete(e);try{t?.setItem(a,JSON.stringify([...r]))}catch{}}function La(t){let e=[...t.controls??[],...(t.sections??[]).flatMap(r=>r.controls)],n=[],a=r=>{if(n.push(r),r.type==="group")for(let o of r.controls)a(o)};for(let r of e)a(r),r.type==="fx"&&n.push(...r.controls,...r.more??[]),r.type==="strip"&&(n.push(...(r.sends??[]).map(o=>({...o,type:"knob",compact:!0}))),r.pan&&n.push(Ea(r)));return n}function xd(t,e){if(!(!t||!e))return La(t).find(n=>n.id===e)}function $d(t){return`${`${t.layout??""}:${(t.sections??[]).map(e=>`${e.id}${e.panel?":panel":""}${e.area?`@${e.area}`:""}`).join(",")}`}#${La(t).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="moves"?`moves:${e.id}:${e.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:e.type==="padGrid"?`padGrid:${e.id}:${e.pads.length}:${e.columns??2}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(n=>n.value).join(",")}`:e.type==="strip"?`strip:${e.id}:${e.channels??1}:${e.master?"master":""}:${e.onMute?"m":""}${e.onSolo?"s":""}${e.onRemove?"x":""}${e.onHacks?"h":""}${e.onFold?"f":""}${e.pan?`p=${e.pan.id}`:""}:${(e.sends??[]).map(n=>n.id).join(",")}:${(e.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:e.type==="group"?`group:${e.id}:${e.controls.map(n=>n.id).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.on===void 0?"":"sw"}${e.onFold?":fold":""}:${e.controls.map(n=>n.id).join(",")}/${(e.more??[]).map(n=>n.id).join(",")}`:`${e.type}:${e.id}`).join("|")}`}function kd(t,e){if(!e.title)return;if(!e.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=e.title,t.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=e.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(a,r),t.append(n),eo(t,e)}function eo(t,e){if(!e.panel)return;let n=[...t.children].find(o=>o.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");a&&(a.textContent=e.title??""),r&&(r.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function Ed(t){let e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;let n=Me.get(e),a=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return xd(n,a)}function Ad(t,e){let n=e.sections??[{id:"main",controls:e.controls??[]}],a=$d(e);if(t.dataset.ncSignature===a){for(let r of n){let o=t.querySelector(`[data-nc-section="${Ni(r.id)}"]`);o&&eo(o,r);for(let s of r.controls){let l=t.querySelector(`[data-nc-id="${Ni(s.id)}"]`);l instanceof Element&&ue(l,s)}}return}t.dataset.ncSignature=a,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(let r of n){let o=document.createElement("div");o.className="nc-section",o.dataset.ncSection=r.id,r.inset&&(o.dataset.ncInset="true"),r.area&&(o.dataset.ncArea=r.area),r.label&&(o.setAttribute("role","group"),o.setAttribute("aria-label",r.label)),r.panel&&(o.dataset.ncPanel="true",o.setAttribute("role","region"),r.title&&o.setAttribute("aria-label",r.title)),kd(o,r);let s=r.panel?document.createElement("div"):o;r.panel&&(s.className="nc-panel-body",o.append(s));for(let l of r.controls)s.append(rt(l,Ed));t.append(o)}}function Ni(t){return t.replace(/["\\]/g,"\\$&")}function Sd(t,e=Ma){yr();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");let a=Qr(Rn(),e).has(t.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${t.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="";let c=wr({labelledBy:o.id,onChange:h=>(Me.get(n)??t).onToggle?.(h)});c.el.dataset.ncModuleSwitch="",s.append(c.el,l,u);let d=document.createElement("span");d.className="nc-snap-msg",d.dataset.ncStatus="",r.append(o,d,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${t.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",f.append(g);let b=document.createElement("i");b.className="nc-token-probe",b.dataset.ncProbe="",n.append(b,r,p,f),n.setAttribute("aria-labelledby",o.id);let y=h=>{let v=Me.get(n)??t;n.dataset.ncOpen=h?"false":"true",p.hidden=h,f.hidden=!h,l.textContent=h?"+":"−",l.setAttribute("aria-expanded",h?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${h?"Show":"Hide"} ${v.title}`),l.title=h?"Show":"Hide",h?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let h=n.dataset.ncOpen==="true";Ci(Rn(),(Me.get(n)??t).id,h,e),y(h),ia(n.parentElement)}),f.addEventListener("click",()=>{Ci(Rn(),(Me.get(n)??t).id,!1,e),y(!1),ia(n.parentElement)});let m={el:n,update(h){Me.set(n,h),h.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=h.title,d.textContent=h.status??"",h.status!==void 0?d.setAttribute("aria-live","polite"):d.removeAttribute("aria-live"),g.textContent=h.summary??h.title,c.el.hidden=h.on===void 0,c.set(h.on===!0),h.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,f.setAttribute("aria-label",`Show ${h.title}`),Ad(p,h),y(p.hidden),m.redraw()},redraw(){let h=Me.get(n);h&&bd(n,La(h))}};return Me.set(n,t),y(a),m.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>m.redraw()).observe(n),gr(()=>m.redraw(),n.ownerDocument),m}function Md(t,e,n="adjacent"){yr(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();let a=n==="stack"?"stack":"adjacent";e.forEach((r,o)=>{let s=o%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=a;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),t.append(r.el),r.redraw()}),ia(t)}function ia(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}let e=[...t.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=e.some(o=>o.hasAttribute("data-nc-lead")),a=e.map(o=>o.hasAttribute("data-nc-slim")?i("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",a.join(" "));let r=e.filter(o=>!o.hasAttribute("data-nc-slim"));n&&e.length===4&&r.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}const to="netcomposer.studio.instances.v1",Fi="netcomposer.studio.types-seen.v1",Ld=["petra-rhythm","olive-bass"];function no(t,e){return e===1?t:`${t}#${e}`}function Ta(t){const e=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(t);if(!e?.[1])return null;const n=e[2]?Number(e[2]):1;return n===1&&e[2]?null:{type:e[1],n}}function Td(t,e){return e===1?t.name:`${t.name} ${e}`}function ct(t,e,n){const a=Td(t,e),r=io(n,a);return{id:no(t.id,e),type:t.id,n:e,name:r,src:t.src,...r!==a?{custom:!0}:{}}}const ao=20;function io(t,e){return typeof t!="string"?e:[...t.replace(/\s+/g," ").trim()].slice(0,ao).join("").trim()||e}function Cd(t,e,n,a){return t.map(r=>{if(r.id!==e)return r;const o=a.find(s=>s.id===r.type);return o?ct(o,r.n,n):r})}function Nd(t,e){const n=new URLSearchParams({instance:String(t.n)});return e&&n.set("measure",""),`${t.src}?${n.toString().replace(/=(&|$)/g,"$1")}`}function Fd(t,e){const n=new Set(t.filter(r=>r.type===e.id).map(r=>r.n));let a=1;for(;n.has(a);)a++;return ct(e,a)}function St(t){return t.filter(e=>e.available!==!1).map(e=>ct(e,1))}function Id(t,e){if(!Array.isArray(t))return St(e);const n=[];for(const a of t){const r=a&&typeof a=="object"?a:null,o=typeof a=="string"?a:r?.id;if(typeof o!="string")continue;const s=Ta(o),l=s&&e.find(u=>u.id===s.type&&u.available!==!1);!s||!l||n.some(u=>u.id===o)||n.push(ct(l,s.n,r?.name))}return n.length>0||t.length===0?n:St(e)}function Ca(){try{return globalThis.localStorage??null}catch{return null}}function zd(t,e=Ca()){try{const n=e?.getItem(to);return n?Id(JSON.parse(n),t):St(t)}catch{return St(t)}}function Rd(t,e,n=Ca()){let a=Ld;try{const s=JSON.parse(n?.getItem(Fi)??"null");Array.isArray(s)&&(a=s.filter(l=>typeof l=="string"))}catch{}const r=e.filter(s=>!a.includes(s.id)&&s.available!==!1);if(r.length===0)return[...t];const o=[...t];for(const s of r)o.some(l=>l.type===s.id)||o.push(ct(s,1));try{n?.setItem(Fi,JSON.stringify([...new Set([...a,...r.map(s=>s.id)])]))}catch{}return o.length!==t.length&&dt(o,n),o}function Dd(t){return t.map(e=>e.custom?{id:e.id,name:e.name}:e.id)}function dt(t,e=Ca()){try{e?.setItem(to,JSON.stringify(Dd(t)))}catch{}}function Bd(t,e){const n=new Map;return(a,r)=>{const o=Ta(a),s=o?.type??a,l=r?.instance!==void 0?Number(r.instance):a.includes("#")?o?.n:void 0,u=t().filter(d=>d.instance.type===s);let c;if(l!==void 0&&Number.isInteger(l)&&l>=1)c=u.find(d=>d.instance.n===l);else{const d=u.filter(p=>{const f=p.window();return f!=null&&f!==n.get(p.instance.id)});c=d.find(p=>p.readyState?.()!=="complete")??d[0]??u[0]}if(!c){if(e.some(p=>p.id===s))return null;const d=l!==void 0?no(s,l):a;return{id:d,name:d}}return n.set(c.instance.id,c.window()),{id:c.instance.id,name:c.instance.name}}}const Dn="netcomposer.studio.pending-presets.v1",Od=3e3,qd=6e4;function Ii(t){return!!t&&typeof t=="object"&&typeof t.format=="string"&&"data"in t}function Pd(t,e){return new Promise(n=>{const a=setTimeout(()=>n(void 0),e);t.then(r=>{clearTimeout(a),n(r)},()=>{clearTimeout(a),n(void 0)})})}function jd(t){const e=new Map,n=[],a=()=>{try{const s=JSON.parse(t()?.getItem(Dn)??"{}"),l={};if(s&&typeof s=="object")for(const[u,c]of Object.entries(s))Ii(c)&&(l[u]=c);return l}catch{return{}}},r=s=>{try{const l=t();if(!l)return;Object.keys(s).length?l.setItem(Dn,JSON.stringify(s)):l.removeItem(Dn)}catch{}},o=async(s,l)=>{const u=a(),c=u[s];if(!c)return;delete u[s],r(u);let d=c.format===l.format;if(d)try{await l.set(c.data)}catch{d=!1}for(const p of n)p(s,d)};return{provide(s,l){!l||typeof l.get!="function"||typeof l.set!="function"||(e.set(s,l),o(s,l))},provided:()=>[...e.keys()],async collect(s,l=Od){const u={};return await Promise.all(s.map(async c=>{const d=e.get(c);if(!d)return;const p=await Pd(Promise.resolve().then(()=>d.get()),l);p!=null&&(u[c]={format:d.format,...d.version!==void 0?{v:d.version}:{},data:p})})),u},stash(s){const l={};for(const[u,c]of Object.entries(s))Ii(c)&&(l[u]=c);r(l)},onApplied(s){n.push(s)},pending:()=>Object.keys(a()),dropPending(){const s=Object.keys(a());return r({}),s}}}function Hd(t,e){return`${t}@studio/${e}`}const _d=1,le=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX",identity:"instrument-nyx"}],Na=[...le];function Wd(t,e,n={}){const a=n.instruments??le;return{version:_d,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},...n.grab?{grab:n.grab}:{},...n.play?{play:n.play}:{},attach(r,o){if(typeof r!="string"||r.length===0||r.length>64)return null;const s=n.resolve?n.resolve(r,o):{id:r,name:a.find(p=>p.id===r)?.name??r};if(!s)return null;const l=e.attach(s.id,s.name),u=s.id,c=n.presets,d=n.share?.host(u);return{ctx:t,output:l,...n.mapper===void 0?{}:{mapper:n.mapper},instance:u,storageKey:p=>Hd(p,u),...n.holdFirstPlay?{holdFirstPlay:n.holdFirstPlay}:{},...c?{providePreset:p=>c.provide(u,p)}:{},...d?{audioReceivers:d.audioReceivers,sendAudio:d.sendAudio,onAudio:d.onAudio,reveal:d.reveal}:{}}}}}const Gd=1e4;function Yd(t=Gd,e=globalThis){const n=new Set;let a=[];const r=()=>{if(n.size>0)return;const o=a;a=[];for(const s of o)s()};return{hold(){const o={};n.add(o);const s=e.setTimeout(()=>l(),t),l=()=>{n.delete(o)&&(e.clearTimeout(s),r())};return l},get count(){return n.size},idle(){return n.size===0?Promise.resolve():new Promise(o=>a.push(o))}}}const ro="netcomposer.studio.fx-fold.v1",Bn={a:!1,b:!1,insert:!1};function oo(t){try{const e=t?.getItem(ro);if(!e)return Bn;const n=JSON.parse(e);if(!n||typeof n!="object")return Bn;const a=n;return{a:a.a===!0,b:a.b===!0,insert:a.insert===!0}}catch{return Bn}}function Zd(t,e,n){const a={...oo(t),[e]:n};try{t?.setItem(ro,JSON.stringify(a))}catch{}return a}const so="netcomposer.studio.insert-fold.v1";function lo(t){try{const e=t?.getItem(so),n=e?JSON.parse(e):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Xd(t,e,n){const a=[...lo(t)].filter(o=>o!==e);n&&a.push(e);const r=a.slice(-256);try{t?.setItem(so,JSON.stringify(r))}catch{}return new Set(r)}function ie(){try{return globalThis.localStorage??null}catch{return null}}const Vd={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function Ud(t,e){const n=e.fx[t],a=nn(n);for(const r of a.chain){const o=Vd[t][r.type];n===void 0&&o&&Object.assign(r.dials,o),t==="a"?(r.bypass=r.type!=="plate",r.type==="plate"&&(r.dials.mix=100)):t==="b"?(r.bypass=r.type!=="delay",r.type==="delay"&&(r.dials.mix=100,r.dials.mode=0,r.dials.send=100)):r.bypass=r.type!=="drive"||!e.insert.on}return a}const Kd={"no-source":"that source isn't there",empty:"the range is empty",gone:"that range is older than the 20 seconds kept","not-kept":"that source wasn't being kept yet when the range played",timeout:"no answer from the audio (is it running?)"};function Jd(t,e,n,a=2e3){return(Number.isFinite(t-e)?Math.max(0,t-e):0)/n*1e3+a}const _t=t=>({channels:null,reason:t,message:Kd[t]});function Qd(t,e){const n=new Map,a=new Map;let r=1;const o=l=>{const u=e.nodeFor(l);if(!u)return null;const c=n.get(l);if(c&&c.source===u)return c.node;c?.node.disconnect();const d=new AudioWorkletNode(t,"nc-studio-grab",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});return d.port.onmessage=p=>{const f=p.data;f.type!=="took"&&f.type!=="recorded"||(a.get(f.id)?.(f.channels,f.reason),a.delete(f.id))},u.connect(d),n.set(l,{node:d,source:u}),d},s=async(l,u,c)=>{await e.ready;const d=o(l);if(!d)return _t("no-source");if(!(c>u))return _t("empty");const p=r++;return new Promise(f=>{a.set(p,(g,b)=>f(g?{channels:g}:_t(b??"gone"))),d.port.postMessage({type:"take",id:p,from:u,to:c}),setTimeout(()=>{a.delete(p)&&f(_t("timeout"))},Jd(c,t.currentTime*t.sampleRate,t.sampleRate))})};return{record(l,u){if(!e.nodeFor(l))return null;const c=n.get(l)?.node??null,d=r++;let p=c;const f=b=>p?.port.postMessage(b);p?f({type:"record",id:d,from:u}):e.ready.then(()=>{p=o(l),f({type:"record",id:d,from:u})});let g=!1;return{stop(b){return g?Promise.resolve(null):(g=!0,new Promise(y=>{a.set(d,y),f({type:"record-end",id:d,to:b}),setTimeout(()=>{a.delete(d)&&y(null)},Math.max(0,(b-t.currentTime*t.sampleRate)/t.sampleRate)*1e3+5e3)}))},cancel(){g=!0,f({type:"record-cancel",id:d})}}},sources:()=>e.sources(),latency(l){if(typeof l!="string")return 0;const u=e.latencyFor?.(l)??0;return Number.isFinite(u)&&u>0?Math.round(u):0},listen(l){return e.nodeFor(l)?(e.ready.then(()=>o(l)),!0):!1},take:(l,u,c)=>s(l,u,c).then(d=>d.channels),takeResult:s}}function eu(t){const e=()=>{};return new Proxy(t,{get(n,a,r){if(a==="stop")return e;const o=Reflect.get(n,a,r);return typeof o=="function"?o.bind(n):o}})}const co={threshold:-3,knee:0,ratio:20,attack:.001,release:.1};function tu(t){return Math.floor(.006*t)}const ra=1024,zi=ra+8192,nu=.25;function au(t,e){let n=0;for(let a=e;a<t.length;a++)n=Math.max(n,Math.abs(t[a]??0));if(!(n>1e-6))return null;for(let a=e;a<t.length;a++)if(Math.abs(t[a]??0)>=n/2)return a-e;return null}async function iu(t,e,n=OfflineAudioContext){const a=new n(1,zi,t),r=a.createBuffer(1,zi,t);r.getChannelData(0)[ra]=nu;const o=new AudioBufferSourceNode(a,{buffer:r}),s=e(a);o.connect(s.input),s.output.connect(a.destination),o.start(0);const l=await a.startRendering();return au(l.getChannelData(0),ra)}function ru(t,e=()=>iu(t,n=>{const a=new DynamicsCompressorNode(n,co);return{input:a,output:a}})){let n=tu(t);const a=(async()=>{try{const r=await e();r!==null&&r>=0&&r<t/10&&(n=r)}catch{}})();return{get:()=>n,ready:a}}const ve=-54,Ft=6,pe=-ve/(Ft-ve),ou=-9,oa=(ou-ve)/(Ft-ve);function uo(t){const e=Math.min(1,Math.max(0,t));return e===0?Number.NEGATIVE_INFINITY:ve+e*(Ft-ve)}function su(t){return t===Number.NEGATIVE_INFINITY?0:10**(t/20)}function lu(t){return t<=0?Number.NEGATIVE_INFINITY:20*Math.log10(t)}function De(t){return su(uo(t))}function cu(t){if(t===Number.NEGATIVE_INFINITY||t<-99)return"−∞";const e=t.toFixed(1);return e.startsWith("-")?`−${e.slice(1)}`:t>.05?`+${e}`:e}function du(t){const e=t.some(n=>n.solo);return t.map(n=>n.mute||e&&!n.solo?0:De(n.position))}function Fa(t){return t===Number.NEGATIVE_INFINITY||Number.isNaN(t)?0:Math.min(1,Math.max(0,(t-ve)/(Ft-ve)))}function Ri(t){return Fa(lu(t))}const Di=[0,-6,-12,-24,-48].map(t=>({value:Fa(t),label:t===0?"0":`−${-t}`})),uu=1;function pu(t){let e=0,n=0;for(const a of t){const r=Math.abs(a);r>e&&(e=r),n+=a*a}return{peak:e,rms:t.length>0?Math.sqrt(n/t.length):0}}function Bi(t){const e=t.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(e==="")return null;if(e==="off"||e==="-inf"||e==="-∞"||e==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(e))return null;const n=Number(e.replace(",","."));return Number.isFinite(n)?n<ve?0:Fa(Math.min(Ft,n)):null}function mu(t){const e=Math.min(1,Math.max(-1,Number.isFinite(t)?t:0)),n=Math.cos(Math.abs(e)*Math.PI/2);return e>0?[n,1]:e<0?[1,n]:[1,1]}const po="netcomposer.studio.mix.v1",mo={position:oa,mute:!1,solo:!1,sendA:0,sendB:0,pan:0};function Mt(){return{v:1,channels:{},master:pe,returns:{a:{on:!0,level:pe},b:{on:!0,level:pe}},insert:{on:!1},fx:{},channelFx:{}}}const wt=(t,e)=>typeof t=="number"&&Number.isFinite(t)?Math.min(1,Math.max(0,t)):e,hu=t=>typeof t=="number"&&Number.isFinite(t)?Math.min(1,Math.max(-1,t)):0,pn=(t,e)=>typeof t=="boolean"?t:e,Le=t=>t&&typeof t=="object"&&!Array.isArray(t)?t:{};function fu(t){const e=Le(t);return{position:wt(e.position,mo.position),mute:pn(e.mute,!1),solo:pn(e.solo,!1),sendA:Math.min(pe,wt(e.sendA,0)),sendB:Math.min(pe,wt(e.sendB,0)),pan:hu(e.pan)}}function ho(t){const e=Mt(),n=Le(t);if(n.v!==1)return e;const a={};for(const[c,d]of Object.entries(Le(n.channels)))c.length>0&&c.length<=64&&(a[c]=fu(d));const r=Le(n.returns),o=(c,d)=>{const p=Le(c);return{on:pn(p.on,d.on),level:wt(p.level,d.level)}},s={},l=Le(n.fx);for(const c of["a","b","insert"])l[c]!==void 0&&(s[c]=l[c]);const u={};for(const[c,d]of Object.entries(Le(n.channelFx)))c.length>0&&c.length<=64&&d&&typeof d=="object"&&(u[c]=d);return{v:1,channels:a,master:wt(n.master,e.master),returns:{a:o(r.a,e.returns.a),b:o(r.b,e.returns.b)},insert:{on:pn(Le(n.insert).on,e.insert.on)},fx:s,channelFx:u}}function fo(){try{return globalThis.localStorage??null}catch{return null}}function gu(t=fo()){try{const e=t?.getItem(po);return e?ho(JSON.parse(e)):Mt()}catch{return Mt()}}function go(t,e=fo()){try{return e?.setItem(po,JSON.stringify(t)),e!==null}catch{return!1}}const K={"fx:fold":"Folds this effect sideways into a narrow column so the Mix takes less room. It keeps sounding as set; a click on the column (or its ▶) opens it again.","fx:max":"Widens this card to three cards so its graph is easy to see; the dials sit under it. Click again, or press Escape, to put it back.","eq:graph":"The EQ's curve over the sound coming out right now: boosts rise above the middle line, cuts fall below it. Drag a dot to shape it.","eq:low":"The lows, below 150 Hz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","eq:mid":"The middle band: drag up or down to boost or cut, sideways to move it, and scroll over it for narrower or wider. Double-click resets it.","eq:high":"The highs, above 6 kHz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","strip:fold":"Minimizes this channel sideways to a narrow column so more fit. It keeps playing at the same level; M and S still work, and ▶ expands it again.","strip:folded":"A minimized channel: its name, mute, solo and level meter. Click the name or ▶ to expand it. Drag the name to move it.","strip:pan":"Balance: moves this channel left or right in the stereo mix by turning the other side down (its sends follow). Drag or use the arrow keys; double-click to centre it.","strip:name":"This channel's instrument. Click to show it below, drag to move the channel, double-click to rename it.","strip:rename":"Type a new name (up to 20 characters) and press Enter; Escape cancels. Leave it empty to go back to the default name.","vu:add":"Adds analog VU meters for the finished mix beside the master: left on top, right below. 0 VU is −18 dBFS RMS.","vu:module":"The master's left (top) and right (bottom) as classic VU meters, which show average loudness. 0 VU is −18 dBFS RMS; the red is louder than that.","vu:remove":"Hides the VU meters. + Meters in the Mix header brings them back.","vu:fold":"Folds the meters to a narrow column with two thin level bars, L and R. The triangle opens them again."},bo="netcomposer.studio.strip-fold.v1";function yo(t){try{const e=t?.getItem(bo),n=e?JSON.parse(e):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function vo(t,e){try{t?.setItem(bo,JSON.stringify([...e].sort()))}catch{}return e}function wo(t,e,n){const a=new Set(yo(t));return n?a.add(e):a.delete(e),vo(t,a)}function bu(t,e){return wo(t,e,!1)}function yu(t,e){const n=new Set(e),a=yo(t),r=new Set([...a].filter(o=>n.has(o)));return r.size===a.size?a:vo(t,r)}const vu=-18,wu=-20,xo=3,xu=[-20,-10,-7,-5,-3,-2,-1,0,1,2,3],Oi=[-20,-10,-7,-5,-3,0,1,2,3],$u=.3,ku=6.638/$u,Eu=48;function Au(t){return t-vu}function $o(t){return Number.isFinite(t)?Math.min(1,Math.max(0,10**((t-xo)/20))):t>0?1:0}function Su(t){return t>0?$o(Au(20*Math.log10(t))):0}function Ia(t){return(Math.min(1,Math.max(0,t))*2-1)*Eu}const qi={x:0,v:0};function Mu(t,e,n,a=!1){if(a)return{x:e,v:0};if(!(n>0))return t;const r=ku,o=t.x-e,s=t.v+r*o,l=Math.exp(-r*n),u=e+(o+s*n)*l,c=(t.v-r*s*n)*l;return u>=1?{x:1,v:0}:u<=0?{x:0,v:0}:{x:u,v:c}}function Lu(t,e){return Math.abs(t.x-e)<1e-4&&Math.abs(t.v)<.001}const ko="netcomposer.studio.vu.v1";function Tu(t){try{return t?.getItem(ko)==="1"}catch{return!1}}function Cu(t,e){try{t?.setItem(ko,e?"1":"0")}catch{}}const Eo="netcomposer.studio.vu-fold.v1";function Nu(t){try{return t?.getItem(Eo)==="1"}catch{return!1}}function Fu(t,e){try{t?.setItem(Eo,e?"1":"0")}catch{}}const Iu="http://www.w3.org/2000/svg",sa=200,On=112,Ue=sa/2,xt=132,Pi=100,zu=108,Ru=105,Du=116,Bu=103,Ou=112,he=(t,e)=>{const n=document.createElementNS(Iu,t);for(const[a,r]of Object.entries(e))n.setAttribute(a,String(r));return n},ji=t=>Math.round(t*100)/100;function $t(t,e){const n=Ia($o(t))*Math.PI/180;return[ji(Ue+e*Math.sin(n)),ji(xt-e*Math.cos(n))]}function Hi(t,e,n){const[a,r]=$t(t,n),[o,s]=$t(e,n);return`M ${a} ${r} A ${n} ${n} 0 0 1 ${o} ${s}`}const qu=t=>t>0?`+${t}`:t<0?`−${-t}`:"0";function _i(t){const e=he("svg",{class:"vu-meter",viewBox:`0 0 ${sa} ${On}`,role:"img","aria-label":`${t==="L"?"Left":"Right"} VU meter`,"data-vu-side":t});e.append(he("rect",{class:"vu-face",x:.5,y:.5,width:sa-1,height:On-1,rx:4})),e.append(he("path",{class:"vu-arc",d:Hi(wu,0,Pi)})),e.append(he("path",{class:"vu-zone",d:Hi(0,xo,Bu)}));for(const o of xu){const[s,l]=$t(o,Pi),[u,c]=$t(o,Oi.includes(o)?zu:Ru);e.append(he("line",{class:o>0?"vu-tick vu-red":"vu-tick",x1:s,y1:l,x2:u,y2:c}))}for(const o of Oi){const[s,l]=$t(o,Du),u=he("text",{class:o>0?"vu-num vu-red":"vu-num",x:s,y:l,"text-anchor":"middle"});u.textContent=Math.abs(o)===20||o===3?qu(o):String(Math.abs(o)),e.append(u)}const n=he("text",{class:"vu-legend",x:Ue,y:92,"text-anchor":"middle"});n.textContent="VU";const a=he("text",{class:"vu-side",x:10,y:On-10});a.textContent=t;const r=he("line",{class:"vu-needle",x1:Ue,y1:xt,x2:Ue,y2:xt-Ou,transform:`rotate(${Ia(0)} ${Ue} ${xt})`});return e.append(n,a,r),{svg:e,needle:r}}function Pu(t){const e=document.createElement("div");e.className="vu",e.dataset.vu="",e.setAttribute("role","group"),e.setAttribute("aria-label","VU meters");const n=document.createElement("div");n.className="vu-hd";const a=document.createElement("button");a.type="button",a.className="nc-fold-toggle",a.dataset.vuFold="";const r=document.createElement("span");r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),a.append(r),a.setAttribute("data-nc-help",K["vu:fold"]);const o=document.createElement("span");o.className="nc-strip-name vu-name",o.textContent="Meters",o.setAttribute("data-nc-help",K["vu:module"]);const s=document.createElement("button");s.type="button",s.className="nc-page-action vu-hide",s.dataset.vuRemove="",s.textContent="Hide",s.setAttribute("aria-label","Hide VU meters"),s.setAttribute("data-nc-help",K["vu:remove"]),s.addEventListener("click",()=>t.onRemove(s)),n.append(a,o,s);const l=document.createElement("div");l.className="vu-mini",l.setAttribute("aria-hidden","true");const u=["L","R"].map(h=>{const v=document.createElement("span");v.className="vu-bar",v.dataset.side=h;const w=document.createElement("span");return w.className="vu-bar-fill",v.append(w),l.append(v),w});let c=t.folded;const d=()=>{e.toggleAttribute("data-folded",c),a.setAttribute("aria-expanded",c?"false":"true"),a.setAttribute("aria-label",c?"Expand VU meters":"Minimize VU meters"),a.title=c?"Expand":"Minimize"};d(),a.addEventListener("click",()=>{c=!c,d(),t.onFold(c)});const p=_i("L"),f=_i("R");e.append(n,p.svg,f.svg,l);const g=matchMedia("(prefers-reduced-motion: reduce)"),b=[qi,qi],y=[Number.NaN,Number.NaN],m=[p.needle,f.needle];return{el:e,frame(h,v){let w=!1;for(const k of[0,1]){const x=h?Su(h[k]):0;b[k]=Mu(b[k],x,v,g.matches),(!Lu(b[k],x)||x>0)&&(w=!0);const A=Math.round(Ia(b[k].x)*10)/10;A!==y[k]&&(y[k]=A,m[k].setAttribute("transform",`rotate(${A} ${Ue} ${xt})`),u[k].style.transform=`scaleY(${Math.max(0,Math.min(1,b[k].x)).toFixed(3)})`,e.dataset[k===0?"vuL":"vuR"]=A.toFixed(1))}return w}}}const ju="netcomposer.studio.hidden.v1",Wt=1/120,Ae="master",Wi="Inserts",Hu="(max-width: 768px)",Ut=8,Kt=t=>cu(uo(t)),Gi=t=>{const e=Kt(t);return e==="−∞"?"off":`${e} dB`};function _u(t,e){return Qe.find(n=>n.type===t)?.dials.find(n=>n.key===e)}function Wu(t,e,n){const a=n.bpm,r=$=>{const S=n.order(),C=S.indexOf($);return C<0?S.length:C},o=($,S,C,L)=>{const O=_u(C,L);if(!O||!S)return null;const ne=Number(S.getParam(C,L)??O.default),D=`mix-${$}-${L}`;return O.options?{type:"select",id:D,label:O.label,value:String(ne),options:O.options.map(W=>({value:String(W.value),label:W.label})),onChange:W=>{S.setParam(C,L,Number(W)),P.render()}}:{type:"slider",id:D,label:O.label,min:O.min,max:O.max,step:O.step??1,value:ne,valueText:O.format(ne,a()),onChange:W=>{S.setParam(C,L,W),P.render()}}},s=($,S,C,L)=>L.map(O=>o($,S,C,O)).filter(O=>O!==null),l=matchMedia(Hu);let u=l.matches?null:Ae;const c=$=>{u=$===null&&!l.matches?Ae:$,P.render()},d=$=>c(u===$?l.matches?null:Ae:$);l.addEventListener("change",()=>c(u));const p=($,S,C,L)=>{$.setParam(S,C,L),P.render()},f=($,S,C,L)=>sl(S,C,{id:`hack-${$}-${C}-graph`,on:L,set:(O,ne)=>p(S,C,O,ne),help:{graph:K["eq:graph"],low:K["eq:low"],mid:K["eq:mid"],high:K["eq:high"]}}),g=($,S,C,L)=>{const O=Number(S.getParam(C,L.key)??L.default),ne=`hack-${$}-${C}-${L.key}`,D=W=>p(S,C,L.key,W);return L.options?{type:"select",id:ne,label:L.label,value:String(O),options:L.options.map(W=>({value:String(W.value),label:W.label})),onChange:W=>D(Number(W))}:{type:"slider",id:ne,label:L.label,min:L.min,max:L.max,step:L.step??.001,value:O,valueText:rr(L,O,a()),onChange:D}},b="",y={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3}};let m=lo(ie());const h=$=>({folded:m.has($),onFold:S=>{m=Xd(ie(),$,S),P.render()},foldHelp:K["fx:fold"]}),v=($,S,C)=>{const L=C.getChain(),O=L.map((D,W)=>{const Ga=se(D.type)?.dials??[],Ya=ae=>{C.moveEffect(D.id,ae),P.render()},Rt=[];return W>0&&Rt.push({type:"button",id:`hack-${$}-${D.id}-left`,label:"Move left",on:!1,onPress:()=>Ya(W-1)}),W<L.length-1&&Rt.push({type:"button",id:`hack-${$}-${D.id}-right`,label:"Move right",on:!1,onPress:()=>Ya(W+1)}),Rt.push({type:"button",id:`hack-${$}-${D.id}-remove`,label:"Remove",ariaLabel:`Remove ${D.name} from ${S}`,on:!1,onPress:()=>{C.removeEffect(D.id),P.render()}}),{type:"fx",id:`hack-${$}-${D.id}`,title:`${W+1} · ${D.name}`,...h(`${$}/${D.id}`),depth:W%4+1,on:!D.bypass,onToggle:ae=>{C.setParam(D.id,"bypass",!ae),P.render()},controls:[...D.type==="eq"?[f($,C,D.id,!D.bypass)]:[],...Ga.filter(ae=>!ae.more).map(ae=>g($,C,D.id,ae))],maxHelp:K["fx:max"],more:[...Ga.filter(ae=>ae.more).map(ae=>g($,C,D.id,ae)),...Rt]}}),ne=L.length>=Ut;return O.push({type:"fx",id:`hack-${$}-add`,title:`${S} · Inserts`,...h(`${$}/add`),depth:L.length%4+1,controls:[{type:"note",id:`hack-${$}-note`,text:ne?`${L.length} of ${Ut}: the stack is full.`:L.length===0?"No effects yet.":`${L.length} of ${Ut}, first to last.`},...ne?[]:[{type:"select",id:`hack-${$}-add-type`,label:"Add",value:b,options:[{value:b,label:"Effect…"},...Es.map(D=>({value:D,label:se(D)?.label??D}))],onChange:D=>{D!==b&&(C.addEffect(D,{dials:y[D]}),P.render())}}]]}),O},w=$=>{const S=e.returns[$];return{type:"slider",id:`mix-${$}-return`,label:"Return",min:0,max:1,step:Wt,value:S.level,valueText:Gi(S.level),onChange:C=>e.setReturn($,{level:C})}};let k=yu(ie(),n.order());const x=()=>[...e.list()].sort(($,S)=>r($.id)-r(S.id)).map($=>({type:"strip",id:`strip-${$.id}`,label:$.name,value:$.strip.position,valueText:Kt($.strip.position),step:Wt,defaultValue:oa,resetText:`${Kt(oa)} dB`,ticks:[...Di],mute:$.strip.mute,solo:$.strip.solo,silent:$.silent,onChange:S=>e.set($.id,{position:S}),onTypeIn:S=>{const C=Bi(S);C!==null&&e.set($.id,{position:C})},onRemove:S=>n.onRemove($.id,S),folded:k.has($.id),onFold:S=>{k=wo(ie(),$.id,S),P.render()},foldHelp:K["strip:fold"],foldedHelp:K["strip:folded"],...$.fx?{hacks:u===$.id,hacksLabel:Wi,onHacks:()=>d($.id)}:{},pan:{id:`pan-${$.id}`,value:$.strip.pan,ariaLabel:`${$.name} pan`,help:K["strip:pan"],onChange:S=>e.set($.id,{pan:Math.abs(S)<.005?0:S})},onMute:()=>e.set($.id,{mute:!$.strip.mute}),onSolo:()=>e.set($.id,{solo:!$.strip.solo}),sends:["A","B"].map(S=>{const C=S==="A"?"sendA":"sendB",L=$.strip[C];return{id:`send-${S.toLowerCase()}-${$.id}`,label:S,ariaLabel:`${$.name} send ${S}`,min:0,max:pe,step:Wt*2,value:L,valueText:Gi(L),defaultValue:0,onChange:O=>e.set($.id,{[C]:O})}})})),A=()=>({type:"strip",id:`strip-${Ae}`,label:"Master",master:!0,hacks:u===Ae,hacksLabel:Wi,onHacks:()=>d(Ae),channels:2,value:e.masterPositionValue,valueText:Kt(e.masterPositionValue),step:Wt,defaultValue:pe,resetText:"0.0 dB",ticks:[...Di],onChange:$=>e.setMaster($),onTypeIn:$=>{const S=Bi($);S!==null&&e.setMaster(S)}});let E=oo(ie());const M=$=>({folded:E[$],onFold:S=>{E=Zd(ie(),$,S),P.render()},foldHelp:K["fx:fold"]});let I=Tu(ie()),q=null,Z=!0;const ee=$=>{I=$,Z=!0,Cu(ie(),$),P.render()},z=()=>{const $=e.returns.a,S=e.returns.b,C=e.list().find(L=>L.id===u&&L.fx);return!C&&u!==null&&(u=Ae),{id:"mix",title:"Mix",summary:`${e.list().map(L=>L.name).join(", ")||"No instruments"} · A Reverb · B Delay · Drive ${e.insertEnabled?"on":"off"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[...x(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(L=>({value:L.id,label:L.available===!1?`${L.name} (soon)`:L.name,disabled:L.available===!1})),onAdd:L=>n.onAdd(L)}]},{id:"fx",area:"fx",label:C?`${C.name} inserts`:"Effects",controls:C?.fx?v(C.id,C.name,C.fx):[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:$.on,onToggle:L=>e.setReturn("a",{on:L}),...M("a"),controls:[w("a"),...s("a",$.fx,"plate",["decay","size"])],more:s("a",$.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:S.on,onToggle:L=>e.setReturn("b",{on:L}),...M("b"),controls:[w("b"),...s("b",S.fx,"delay",["delay_beats","feedback"])],more:s("b",S.fx,"delay",["tone","low_cut"])},{type:"fx",id:"mix-insert",title:"Insert · Drive",depth:3,on:e.insertEnabled,onToggle:L=>e.setInsert(L),...M("insert"),controls:s("insert",e.insert,"drive",["drive_db","tone","output_db"]),more:s("insert",e.insert,"drive",["mix","curve"])}]},...I?[{id:"meters",area:"meters",label:"VU meters",controls:[]}]:[],{id:"master",area:"master",label:"Master",controls:[A()]}]}},X=Sd(z(),ju),zt=()=>X.el.toggleAttribute("data-hacks-folded",u===null);zt();const V=document.createElement("button");V.type="button",V.className="nc-page-action vu-add",V.dataset.vuAdd="",V.textContent="+ Meters",V.setAttribute("aria-label","Add VU meters"),V.setAttribute("data-nc-help",K["vu:add"]),V.addEventListener("click",()=>{ee(!0),q?.el.querySelector("[data-vu-remove]")?.focus()}),X.el.querySelector(".nc-module-end")?.prepend(V);const R=()=>{V.hidden=I;const $=X.el.querySelector('[data-nc-section="meters"]');!I||!$||(q??=Pu({onRemove:()=>{ee(!1),V.focus()},folded:Nu(ie()),onFold:S=>{Z=!0,Fu(ie(),S)}}),q.el.parentElement!==$&&$.append(q.el))};R(),Yu(X.el,n),Gu(X.el,e,n),Zi(X.el),Md(t,[X],"adjacent");const te=$=>({peak:Ri($.peak),rms:Ri($.rms),over:$.peak>=uu}),P={module:X,get hacksShown(){return u},showHacks:c,render(){X.update(z()),zt(),R(),Zi(X.el)},frame($){if(X.el.dataset.ncOpen!=="true")return;for(const C of e.list())Si(X.el,`strip-${C.id}`)?.update([te(C.levels())],$);const S=e.masterLevels();if(Si(X.el,`strip-${Ae}`)?.update(S.map(te),$),q&&I){const C=e.ctx.state==="running";C&&(Z=!0),Z&&(Z=q.frame(C?[S[0].rms,S[1].rms]:null,$))}}};return P}const qn="application/x-nc-strip",st=".nc-strip:not([data-nc-master])",Yi=`${st}, .nc-strip-add`,Jt=t=>t?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null;function Zi(t){for(const e of t.querySelectorAll(`${st} .nc-strip-hd > .nc-strip-name`))e.setAttribute("data-nc-help",K["strip:name"]);for(const e of t.querySelectorAll(`${st} :is(.nc-strip-hd, .nc-strip-fold)`))!(e instanceof HTMLElement)||e.draggable||e.hasAttribute("data-renaming")||(e.draggable=!0,e.title="Drag to move this channel")}function Gu(t,e,n){t.addEventListener("dblclick",a=>{const r=a.target instanceof Element?a.target.closest(".nc-strip-hd > .nc-strip-name"):null,o=r?.closest(st),s=Jt(o??null),l=r?.parentElement;if(!s||!l||!n.onRename||l.hasAttribute("data-renaming"))return;const u=e.list().find(f=>f.id===s)?.name??r.textContent??"",c=document.createElement("input");c.type="text",c.className="nc-strip-name-input",c.value=u,c.maxLength=ao,c.spellcheck=!1,c.autocomplete="off",c.setAttribute("aria-label",`Rename ${u}`),c.setAttribute("data-nc-help",K["strip:rename"]),l.setAttribute("data-renaming",""),l.draggable=!1,l.insertBefore(c,r),c.focus(),c.select();let d=!1;const p=f=>{if(d)return;d=!0;const g=c.value;c.remove(),l.removeAttribute("data-renaming"),l.draggable=!0,f&&g!==u&&n.onRename?.(s,g)};c.addEventListener("keydown",f=>{f.key==="Enter"?(f.preventDefault(),p(!0)):f.key==="Escape"&&(f.preventDefault(),p(!1))}),c.addEventListener("blur",()=>p(!0)),c.addEventListener("click",f=>f.stopPropagation()),c.addEventListener("dragstart",f=>f.preventDefault())})}function Yu(t,e){const n=()=>{for(const r of t.querySelectorAll("[data-drop]"))r.removeAttribute("data-drop");for(const r of t.querySelectorAll("[data-dragging]"))r.removeAttribute("data-dragging")},a=(r,o)=>{const s=r.getBoundingClientRect();return o<s.left+s.width/2?"before":"after"};t.addEventListener("dragstart",r=>{const s=(r.target instanceof Element?r.target.closest(".nc-strip-hd, .nc-strip-fold"):null)?.closest(st),l=Jt(s??null);!l||!r.dataTransfer||!(s instanceof HTMLElement)||(r.dataTransfer.setData(qn,l),r.dataTransfer.effectAllowed="move",r.dataTransfer.setDragImage(s,s.offsetWidth/2,16),s.setAttribute("data-dragging","true"))}),t.addEventListener("dragover",r=>{if(!r.dataTransfer?.types.includes(qn))return;const o=r.target instanceof Element?r.target.closest(Yi):null;if(!(o instanceof HTMLElement))return;r.preventDefault(),r.dataTransfer.dropEffect="move";const s=o.matches(".nc-strip-add")?"before":a(o,r.clientX);if(o.getAttribute("data-drop")!==s){for(const l of t.querySelectorAll("[data-drop]"))l.removeAttribute("data-drop");o.setAttribute("data-drop",s)}}),t.addEventListener("drop",r=>{const o=r.dataTransfer?.getData(qn),s=r.target instanceof Element?r.target.closest(Yi):null;if(!o||!(s instanceof HTMLElement))return n();if(r.preventDefault(),s.matches(".nc-strip-add")){n(),e.onReorder?.(o,null);return}const l=Jt(s),u=a(s,r.clientX);if(n(),!l||l===o)return;let c=l;if(u==="after"){const d=[...t.querySelectorAll(st)],p=d[d.indexOf(s)+1];if(c=p?Jt(p):null,c===o)return}e.onReorder?.(o,c)}),t.addEventListener("dragend",n)}const Se=.012,Pn=1024;class Zu{ctx;bus;insert;master;limiter;masterMeter;masterMeters;insertMeters;returns;recordOut;masterPosition=pe;insertOn=!1;channels=[];listeners=new Set;scratch=new Float32Array(Pn);restore;channelFx;constructor(e,n={}){this.ctx=e,this.restore=n.restore,this.channelFx=n.channelFx;const a=()=>new AnalyserNode(e,{fftSize:Pn});this.bus=new GainNode(e,{gain:1}),this.master=new GainNode(e,{gain:De(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(e,co),this.masterMeter=a(),this.masterMeters=[a(),a()],this.insertMeters={pre:a(),post:a()},this.recordOut=new MediaStreamAudioDestinationNode(e),this.insert=n.fx?.("insert")??null,this.bus.connect(this.insertMeters.pre),this.insert?(this.bus.connect(this.insert.input),this.insert.output.connect(this.master),this.insert.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(e.destination);const r=new ChannelSplitterNode(e,{numberOfOutputs:2});this.limiter.connect(r),r.connect(this.masterMeters[0],0),r.connect(this.masterMeters[1],1),this.limiter.connect(this.recordOut);const o=s=>{const l=new GainNode(e,{gain:1}),u=n.fx?.(s)??null,c=new GainNode(e,{gain:De(pe)}),d=a();return u?(l.connect(u.input),u.output.connect(c)):c.gain.value=0,c.connect(d),c.connect(this.bus),{bus:l,fx:u,gain:c,meter:d,on:u!==null,level:pe}};this.returns={a:o("a"),b:o("b")}}attach(e,n){let a=this.channels.find(r=>r.id===e);if(a)a.input.disconnect(),a.input=new GainNode(this.ctx,{gain:1}),a.input.connect(a.fx?.input??a.fader);else{const r=new GainNode(this.ctx,{gain:1}),o=new GainNode(this.ctx,{gain:0}),s=new AnalyserNode(this.ctx,{fftSize:Pn}),l=new GainNode(this.ctx,{gain:0}),u=new GainNode(this.ctx,{gain:0}),c=this.channelFx?.(e)??null;c?(r.connect(c.input),c.output.connect(o)):r.connect(o);const d=new GainNode(this.ctx,{gain:1,channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),p=new ChannelSplitterNode(this.ctx,{numberOfOutputs:2}),f=new GainNode(this.ctx,{gain:1}),g=new GainNode(this.ctx,{gain:1}),b=new ChannelMergerNode(this.ctx,{numberOfInputs:2});o.connect(s),o.connect(d).connect(p),p.connect(f,0).connect(b,0,0),p.connect(g,1).connect(b,0,1),b.connect(this.bus),b.connect(l).connect(this.returns.a.bus),b.connect(u).connect(this.returns.b.bus),a={id:e,name:n,input:r,fader:o,stereo:d,split:p,balL:f,balR:g,panner:b,meter:s,sendA:l,sendB:u,fx:c,strip:this.restore?.(e)??mo},this.channels.push(a),this.apply()}return this.emit(),a.input}rename(e,n){const a=this.channels.find(r=>r.id===e);!a||a.name===n||(a.name=n,this.emit())}detach(e){const n=this.channels.findIndex(r=>r.id===e);if(n<0)return;const[a]=this.channels.splice(n,1);if(a){for(const r of[a.input,a.fader,a.stereo,a.split,a.balL,a.balR,a.panner,a.meter,a.sendA,a.sendB])r.disconnect();a.fx?.output.disconnect(),a.fx?.dispose(),this.apply(),this.emit()}}tapNode(e){return e==="master"?this.limiter:this.channels.find(n=>n.id===e)?.panner??null}tapLatency(e,n){const a=o=>{const s=o?.latencySamples;return typeof s=="number"&&Number.isFinite(s)&&s>0?Math.round(s):0};if(e==="master")return Math.max(0,Math.round(n))+a(this.insert);const r=this.channels.find(o=>o.id===e);return r?a(r.fx):null}set(e,n){const a=this.channels.find(r=>r.id===e);a&&(a.strip={...a.strip,...n},this.apply(),this.emit())}setMaster(e){this.masterPosition=e,this.master.gain.setTargetAtTime(De(e),this.ctx.currentTime,Se),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(e,n){const a=this.returns[e],r=this.ctx.currentTime;n.on!==void 0&&(a.on=n.on&&a.fx!==null,a.bus.gain.setTargetAtTime(a.on?1:0,r,Se)),n.level!==void 0&&(a.level=n.level,a.fx&&a.gain.gain.setTargetAtTime(De(a.level),r,Se)),this.emit()}setInsert(e){this.insertOn=e,this.insert?.setParam("drive","bypass",!e),this.emit()}get insertEnabled(){return this.insertOn}setTempo(e,n){for(const a of[this.returns.a.fx,this.returns.b.fx,this.insert])a?.setTempo(e,n);for(const a of this.channels)a.fx?.setTempo(e,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(e){return this.levelsOf(this.returns[e].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const e=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||e&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}apply(){const e=du(this.channels.map(a=>a.strip)),n=this.ctx.currentTime;this.channels.forEach((a,r)=>{a.fader.gain.setTargetAtTime(e[r]??0,n,Se),a.sendA.gain.setTargetAtTime(De(a.strip.sendA),n,Se),a.sendB.gain.setTargetAtTime(De(a.strip.sendB),n,Se);const[o,s]=mu(a.strip.pan);a.balL.gain.setTargetAtTime(o,n,Se),a.balR.gain.setTargetAtTime(s,n,Se)})}levelsOf(e){return e.getFloatTimeDomainData(this.scratch),pu(this.scratch)}emit(){for(const e of this.listeners)e()}}const za="studio";function Xu(){let t=null;const e=new Set,n=new Set,a=new Set,r=new Map,o=c=>{try{return r.get(c)?.()===!0}catch{return!1}},s=c=>{for(const d of[...c])try{d()}catch{}},l=c=>{if(c!==t){t=c;for(const d of n)d()}},u=(c,d)=>(c.add(d),()=>{c.delete(d)});return{owner:()=>t,claim(c){t===null&&l(c)},claimAll(){l(za),s(e)},clear:()=>l(null),onAll:c=>u(e,c),member(c,d){return r.set(c,d),()=>{r.get(c)===d&&r.delete(c)}},out(c){for(const d of r.keys())if(d!==c&&o(d))return;s(a)},drop:c=>{r.delete(c)},onLastOut:c=>u(a,c),playing:()=>[...r.keys()].filter(o),onChange:c=>u(n,c)}}const Vu=["audio/webm;codecs=opus","audio/webm","audio/ogg;codecs=opus","audio/mp4"];function Uu(t){return Vu.find(e=>t(e))??null}function Ku(t){return t.startsWith("audio/mp4")?"m4a":t.startsWith("audio/ogg")?"ogg":"webm"}function Ju(t,e){const n=r=>String(r).padStart(2,"0");return`netcomposer-studio-${`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}-${n(t.getHours())}${n(t.getMinutes())}`}.${Ku(e)}`}class Qu{constructor(e){this.stream=e,this.mimeType=typeof MediaRecorder>"u"?null:Uu(n=>MediaRecorder.isTypeSupported(n))}recorder=null;chunks=[];startedAt=0;mimeType;get supported(){return this.mimeType!==null}get recording(){return this.recorder?.state==="recording"}start(){!this.mimeType||this.recording||(this.chunks=[],this.recorder=new MediaRecorder(this.stream,{mimeType:this.mimeType}),this.recorder.ondataavailable=e=>{e.data.size>0&&this.chunks.push(e.data)},this.startedAt=performance.now(),this.recorder.start(250))}stop(){const e=this.recorder,n=this.mimeType;return!e||!n||e.state==="inactive"?Promise.resolve(null):new Promise(a=>{e.onstop=()=>{this.recorder=null;const r=new Blob(this.chunks,{type:n});a({blob:r,name:Ju(new Date,n),seconds:(performance.now()-this.startedAt)/1e3})},e.stop()})}}const ep="NetComposer Studio",ye=[40,240],tp="nc-sync";function np(t,e=globalThis.navigator?.locks){const n=`/studio/${t}`;return{channel:`${tp}${n}`,locks:e?{request:(a,r,o)=>e.request(`${a}${n}`,r,o)}:null}}function ap(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}const ip=.2,Xi=.3;function rp(t,e,n){const a=new rs({bpm:120,minBpm:ye[0],maxBpm:ye[1],timebase:"shared"}),r=new bs({app:ep,version:"0.1.0",clock:a,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:ye},startLeadSeconds:ip,...n?{startGate:()=>n(),gatedStartLeadSeconds:Xi}:{},...e?{channel:e.channel,locks:e.locks}:{},audio:()=>{const u=t();return u==="running"?"running":u==="closed"?"none":"needs-gesture"}});let o=!1,s=0,l=!1;return{clock:a,peer:r,async start(){o||(o=!0,await r.start())},play(){const u=n?.()??null;if(!u){l=!1,a.play({at:$e()});return}const c=++s,d=$e();l=!0;const p=()=>{c!==s||!l||(l=!1,r.isLeader&&!a.transport.running?(a.commitStart(Math.max(d,$e())+Xi,0),r.publishState()):a.play({at:$e()}))};u.then(p,p)},stop(){l&&(l=!1,s++,!a.transport.running)||a.stop({at:$e()})},setTempo:u=>a.setTempo({bpm:op(u)}),playing:()=>a.transport.isPlayingAt($e()),running:()=>l||a.transport.running,bpm:()=>a.transport.bpm,position(){const u=a.transport,c=$e();return u.isPlayingAt(c)?sp(u.beatAt(c)):null},beatPhase(){const u=a.transport,c=$e();if(!u.isPlayingAt(c))return null;const d=u.beatAt(c);return d-Math.floor(d)},peers:()=>[...r.peers.values()]}}function op(t){return Number.isFinite(t)?Math.min(ye[1],Math.max(ye[0],Math.round(t*10)/10)):120}function sp(t){const e=Math.max(0,Math.floor(t));return{bar:Math.floor(e/4)+1,beat:e%4+1}}const la="netcomposer.scene",Ao=1,So="netcomposer.studio.tempo.v1",Mo="netcomposer.studio.scene-name.v1",mn=120,Ra="Untitled scene",lp=2*1024*1024;function xn(t){const e=typeof t=="number"?t:Number(t);return Number.isFinite(e)?Math.min(ye[1],Math.max(ye[0],Math.round(e*10)/10)):mn}function je(t){return(typeof t=="string"?t.replace(/\s+/g," ").trim().slice(0,60):"")||Ra}function cp(t){return{format:la,v:Ao,name:je(t.name),saved:(t.now??new Date).toISOString(),tempo:{bpm:xn(t.bpm)},meter:[4,4],instances:t.instances.map(e=>({id:e.id,type:e.type,name:e.name})),mix:t.mix,presets:t.presets??{},media:t.media??[]}}function dp(t,e){if(t.length>lp)return{ok:!1,error:"That file is too large to be a Scene."};let n;try{n=JSON.parse(t)}catch{return{ok:!1,error:"That file isn't a Scene (it isn't JSON)."}}if(!n||typeof n!="object")return{ok:!1,error:"That file isn't a Scene."};const a=n;if(a.format!==la)return{ok:!1,error:"That file isn't a Scene. Load an instrument's own file from that instrument."};if((typeof a.v=="number"?a.v:0)<1)return{ok:!1,error:"That Scene has no version."};const o=new Set,s=[];for(const c of Array.isArray(a.instances)?a.instances:[]){if(!c||typeof c!="object")continue;const d=c.id;if(typeof d!="string")continue;const p=Ta(d);if(!p||!e.includes(p.type)||o.has(d))continue;o.add(d);const f=c.name;s.push({id:d,type:p.type,name:io(f,"")})}if(!s.length)return{ok:!1,error:"That Scene has no instruments this Studio knows."};const l=a.tempo&&typeof a.tempo=="object"?a.tempo.bpm:void 0,u={};if(a.presets&&typeof a.presets=="object")for(const[c,d]of Object.entries(a.presets))o.has(c)&&(u[c]=d);return{ok:!0,scene:{format:la,v:Ao,name:je(a.name),saved:typeof a.saved=="string"?a.saved:"",tempo:{bpm:xn(l)},meter:[4,4],instances:s,mix:ho(a.mix??Mt()),presets:u,media:Array.isArray(a.media)?a.media:[]}}}function up(t){return`${je(t).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"scene"}.scene.json`}function pp(t){try{const e=t?.getItem(So);return e?xn(Number(e)):mn}catch{return mn}}function Lo(t,e){try{e?.setItem(So,String(xn(t)))}catch{}}function mp(t){try{return je(t?.getItem(Mo))}catch{return Ra}}function To(t,e){try{e?.setItem(Mo,je(t))}catch{}}const hp=300,fp=120*1e3;function gp(t){return Object.prototype.toString.call(t)==="[object Float32Array]"}function bp(t){const e=t&&typeof t=="object"?t:null;if(!e)return{ok:!1,message:"No audio."};const n=typeof e.name=="string"?e.name.trim().slice(0,64):"";if(!n)return{ok:!1,message:"The audio has no name."};const a=e.sampleRate;if(typeof a!="number"||!Number.isFinite(a)||a<8e3||a>192e3)return{ok:!1,message:"The sample rate is out of range (8–192 kHz)."};const r=e.channels;if(!Array.isArray(r)||r.length<1||r.length>2)return{ok:!1,message:"The audio needs one or two channels."};if(!r.every(gp))return{ok:!1,message:"Channels must be 32-bit float arrays."};const o=r[0].length;if(o===0)return{ok:!1,message:"The audio is empty."};if(r.some(u=>u.length!==o))return{ok:!1,message:"The channels differ in length."};if(o>hp*a)return{ok:!1,message:"The audio is longer than five minutes."};const s=typeof e.bars=="number"&&Number.isInteger(e.bars)&&e.bars>=1&&e.bars<=256?e.bars:void 0,l=typeof e.bpm=="number"&&Number.isFinite(e.bpm)&&e.bpm>=20&&e.bpm<=300?e.bpm:void 0;return{ok:!0,audio:{name:n,sampleRate:a,channels:r.map(u=>new Float32Array(u)),...s===void 0?{}:{bars:s},...l===void 0?{}:{bpm:l}}}}function Vi(t){try{const e=t.targets();return Array.isArray(e)?e.flatMap(n=>{if(!n||typeof n.id!="string"||!n.id)return[];const a=typeof n.name=="string"&&n.name?n.name.slice(0,64):n.id;return[{id:n.id,name:a,...n.filled?{filled:!0}:{}}]}):[]}catch{return[]}}function yp(t={}){const e=new Map,n=s=>t.live?.(s)??!0,a=s=>t.nameOf?.(s)??s,r=t.answerMs??fp,o=s=>[...e.entries()].filter(([l])=>l!==s&&n(l)).map(([l,u])=>{const c=t.brandOf?.(l);return{instance:l,name:a(l),...c?{brand:c}:{},label:typeof u.label=="string"&&u.label?u.label.slice(0,24):"Target",targets:Vi(u)}});return{forget(s){e.delete(s)},host(s){return{audioReceivers:()=>o(s),async sendAudio(l,u,c){const d=e.get(l);if(l===s||!d||!n(l))return{ok:!1,reason:"gone",message:"That instrument isn't in the Studio."};if(typeof c!="string"||!Vi(d).some(b=>b.id===c))return{ok:!1,reason:"invalid",message:`No ${c} there.`};const p=bp(u);if(!p.ok)return{ok:!1,reason:"invalid",message:p.message};const f={...p.audio,from:s,fromName:t.brandOf?.(s)??a(s)};let g;try{const b=await Promise.race([Promise.resolve(d.receive(f,c)),new Promise(y=>{g=setTimeout(()=>y({ok:!1,reason:"timeout",message:"No answer."}),r)})]);return!b||typeof b!="object"||typeof b.ok!="boolean"?{ok:!1,reason:"error",message:"The instrument didn't answer."}:b}catch(b){return{ok:!1,reason:"error",message:b instanceof Error?b.message:String(b)}}finally{clearTimeout(g)}},onAudio(l){return e.set(s,l),()=>{e.get(s)===l&&e.delete(s)}},reveal(){n(s)&&t.reveal?.(s)}}}}}const vp="/studio/assets/silence-processor-BT_UBYxP.js";function wp(t,e=Na){const n=e.find(o=>o.id===t.type),a=(n?.name??t.type).toUpperCase(),r=String(t.n).padStart(2,"0");return{brand:n?.brand??a,rest:t.custom&&t.name?` / ${t.name.toUpperCase()}`:` / ${a} / ${r}`,...n?.identity?{identity:n.identity}:{}}}const ca=Nl,ge=Cl,jn={system:"System",light:"Light",dark:"Dark"},xp={system:"◐",light:"○",dark:"●"};function $p(t){try{return ya(t?.getItem(ca))}catch{return"system"}}function kp(t,e){try{e==="system"?t?.removeItem(ca):t?.setItem(ca,e)}catch{}}const Ep=t=>ge[(ge.indexOf(t)+1)%ge.length]??"system";function Ap(t){try{return t.contentDocument?.documentElement?t.contentDocument:null}catch{return null}}function Co(t,e){const n=Ap(t);n&&va(e,n)}function Sp(t,e){const n=document.createElement("div");n.className="theme",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Theme"),n.dataset.theme="";let a=t;const r=ge.map(s=>{const l=document.createElement("button");l.type="button",l.className="ghost theme-choice",l.setAttribute("role","radio"),l.dataset.themeChoice=s;const u=document.createElement("span");u.className="theme-word",u.textContent=jn[s];const c=document.createElement("span");return c.className="theme-sign",c.setAttribute("aria-hidden","true"),c.textContent=xp[s],l.append(u,c),l.setAttribute("aria-label",`${jn[s]} theme`),l.title=s==="system"?"Follow this computer's light or dark setting":`${jn[s]} theme`,l.addEventListener("click",()=>{const d=s===a?Ep(s):s;o(d),e(d),r[ge.indexOf(d)]?.focus({preventScroll:!0})}),l});n.append(...r);function o(s){a=s;for(const l of r){const u=l.dataset.themeChoice===s;l.setAttribute("aria-checked",u?"true":"false"),l.tabIndex=u?0:-1}}return o(t),n.addEventListener("keydown",s=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(s.key))return;s.preventDefault();const l=s.key==="ArrowLeft"||s.key==="ArrowUp"?-1:1,u=(ge.indexOf(a)+l+ge.length)%ge.length,c=ge[u]??"system";o(c),e(c),r[u]?.focus()}),{el:n,get choice(){return a},set:o}}function Mp(t,e){const n=t.addModule.bind(t),a=new Map;return Object.defineProperty(t,"addModule",{value:(o,s)=>{const l=new URL(String(o),e).href;let u=a.get(l);return u||(u=n(o,s),a.set(l,u),u.catch(()=>{a.get(l)===u&&a.delete(l)})),u},configurable:!0}),t}const Y=new AudioContext({latencyHint:"interactive"});Mp(Y.audioWorklet,location.href);const re=gu(),qe={},Lp=Ut,Da=new Map,_=new Zu(Y,{restore:t=>re.channels[t],fx:t=>{const e=ei(Y,{moduleUrl:Yn,bpm:120,state:Ud(t,re)});return qe[t]=e,e},channelFx:t=>{fn.delete(t);const e=ei(Y,{moduleUrl:Yn,bpm:B.bpm(),slots:Lp,state:re.channelFx[t]??{v:2,chain:[]}}),n=ur(e,B.clock,{mapper:He}),a=e.dispose.bind(e);return e.dispose=()=>{n(),a()},e.onChange(kn),Da.set(t,e),e}});_.setMaster(re.master);_.setReturn("a",re.returns.a);_.setReturn("b",re.returns.b);_.setInsert(re.insert.on);const He=new gs(Y);He.start();const No=ap();let Fo=()=>{};const Io=ru(Y.sampleRate),zo=Qd(Y,{nodeFor:t=>_.tapNode(t),latencyFor:t=>_.tapLatency(t,Io.get()),sources:()=>[{id:"master",name:"Master"},..._.list().map(t=>({id:t.id,name:t.name}))],ready:new Promise(t=>{Fo=t})}),oe=Xu(),nt=jd(()=>{try{return globalThis.sessionStorage??null}catch{return null}}),Ro=yp({live:t=>F.some(e=>e.id===t),nameOf:t=>F.find(e=>e.id===t)?.name??t,brandOf:t=>{const e=F.find(a=>a.id===t),n=le.find(a=>a.id===e?.type)?.brand;return e&&n?e.n===1?n:`${n} ${e.n}`:void 0},reveal:t=>{we(t),document.getElementById(`tab-${t}`)?.scrollIntoView({block:"nearest"}),me.get(t)?.contentWindow?.focus()}});let Do=!1;const Ba=Yd();window.ncStudio=Wd(Y,_,{holdFirstPlay:()=>Ba.hold(),presets:nt,share:Ro,grab:zo,play:oe,mapper:eu(He),resolve:(t,e)=>zp(t,e),syncScope:No,fxWorklet:new URL(Yn,location.href).href});const B=rp(()=>Y.state,np(No),()=>Do&&Y.state==="running"&&He.ready&&Ba.count===0?null:qp());function Ie(){try{return globalThis.localStorage??null}catch{return null}}B.setTempo(pp(Ie()));const Qt=new Qu(_.recordOut.stream);let Gt=null;function N(t,e={},...n){const a=document.createElement(t);for(const[r,o]of Object.entries(e))o===void 0||o===!1||a.setAttribute(r,o===!0?"":String(o));return a.append(...n),a}const Lt=N("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),lt=N("input",{type:"number",class:"bpm",min:ye[0],max:ye[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),hn=N("output",{class:"position","aria-label":"Bar and beat"},"—"),Te=N("button",{type:"button",class:"btn rec","aria-pressed":"false"},"Rec"),yt=N("a",{class:"take",hidden:!0}),Oa=N("span",{class:"status",role:"status"}),Ke=N("input",{type:"text",class:"scene-name",maxlength:60,value:mp(Ie()),"aria-label":"Scene name",title:"Scene name (used when you Save)"}),Bo=N("button",{type:"button",class:"ghost","data-scene":"save",title:"Save this Scene as a file"},"Save"),Oo=N("button",{type:"button",class:"ghost","data-scene":"load",title:"Load a Scene file"},"Load"),qo=N("button",{type:"button",class:"ghost","data-scene":"new",title:"Start a new Scene"},"New"),kt=N("input",{type:"file",accept:".json,application/json",hidden:!0}),qa=Sp($p(Ie()),t=>{kp(Ie(),t),va(t);for(const e of me.values())Co(e,t)});va(qa.choice);const Tp=N("h1",{class:"brand","aria-label":"NetComposer Studio"},N("span",{"aria-hidden":"true"},"NetComposer",N("span",{class:"brand-sep"}," / "),"Studio")),da=N("span",{class:"beat-light","aria-hidden":"true"}),Pa=N("span",{class:"status-long"}),ja=N("span",{class:"status-short"});Oa.append(Pa,ja);const ua=N("header",{class:"top"},N("div",{class:"transport"},Lt,N("label",{class:"tempo"},lt,N("span",{class:"tempo-unit"},"BPM")),da,hn),N("div",{class:"record"},Te,yt),Oa),Cp=N("div",{class:"scene",role:"group","aria-label":"Scene"},Ke,Bo,Oo,qo,kt,qa.el);Qt.supported||(Te.disabled=!0,Te.title="This browser can't record audio");const ut=N("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),Po=N("div",{class:"stage"}),It=N("label",{class:"tab tab-add",title:"Add an instrument"},N("span",{"aria-hidden":"true"},"+")),at=N("select",{class:"tab-add-select","aria-label":"Add an instrument"});at.append(N("option",{value:""},"Add an instrument"),...Na.map(t=>{const e=N("option",{value:t.id},t.available===!1?`${t.name} (soon)`:t.name);return e.disabled=t.available===!1,e}));at.addEventListener("change",()=>{const t=at.value;at.value="",t&&Yo(t)});It.append(at);ut.append(It);wd();const Tt=N("div",{class:"spine","aria-hidden":"true"}),me=new Map;let F=Rd(zd(le),le),xe=F[0]?.id??"";const Np=new URLSearchParams(location.search).has("measure"),Ui=new Map,Fp=2e4;function jo(t){const e=N("button",{type:"button",role:"tab",id:`tab-${t.id}`,"aria-controls":`panel-${t.id}`,class:"tab"},t.name);e.addEventListener("click",()=>we(t.id)),ut.insertBefore(e,It);const a=(Ui.get(t.type)??Promise.resolve()).then(()=>new Promise(r=>{if(!F.some(l=>l.id===t.id))return r();const o=N("iframe",{id:`panel-${t.id}`,role:"tabpanel","aria-labelledby":`tab-${t.id}`,title:t.name,src:Nd(t,Np),allow:"autoplay; clipboard-read; clipboard-write; microphone"});me.set(t.id,o);const s=window.setTimeout(r,Fp);o.addEventListener("load",()=>Ip(o)),o.addEventListener("load",()=>{window.clearTimeout(s),r()},{once:!0}),Po.append(o),we(xe)}));return Ui.set(t.type,a),a}function Ip(t){let e=null;try{e=t.contentDocument}catch{return}if(!e?.documentElement)return;e.documentElement.dataset.ncHosted="",Co(t,qa.choice);const n=t.id.replace(/^panel-/,""),a=()=>{const o=e?.querySelector(".nc-page"),s=o?o.getBoundingClientRect().height:e?.documentElement.scrollHeight??0;s>0&&(t.style.height=`${Math.ceil(s)}px`);const l=e?.querySelector(".nc-page-hd, .nc-title-band");l&&(_o.set(n,Math.round(l.getBoundingClientRect().bottom)),n===xe&&Wo())};a();const r=e.querySelector(".nc-page")??e.body;r&&new ResizeObserver(()=>{a(),$n()}).observe(r),Ha.add(t),Ho(t)}const Ha=new Set;function Ho(t){let e;try{e=t.contentDocument?.documentElement}catch{return}if(!e||!t.isConnected){Ha.delete(t);return}const n=t.getBoundingClientRect();if(n.height<=0)return;const a=getComputedStyle(ua).position==="sticky"?ua.getBoundingClientRect().bottom:0,r=Math.min(n.height,Math.max(0,a-n.top)),o=Math.max(r,Math.min(n.height,window.innerHeight-n.top));e.style.setProperty("--nc-host-top",`${Math.round(r)}px`),e.style.setProperty("--nc-host-height",`${Math.round(o-r)}px`),e.style.setProperty("--nc-host-bottom",`${Math.round(n.height-o)}px`)}let Hn=!1;function $n(){Hn||(Hn=!0,requestAnimationFrame(()=>{Hn=!1;for(const t of Ha)Ho(t)}))}window.addEventListener("scroll",$n,{passive:!0});window.addEventListener("resize",$n);const _o=new Map;function Wo(){const t=_o.get(xe);t===void 0?Tt.style.removeProperty("--spine-top"):Tt.style.setProperty("--spine-top",`${t}px`)}function Go(t){if(!t){Tt.replaceChildren();return}const e=wp(t),n=N("span",{class:"spine-brand"},e.brand);e.identity&&(n.style.color=`var(--nc-ui-${e.identity})`),Tt.replaceChildren(N("span",{class:"spine-text"},n,N("span",{class:"spine-rest"},e.rest)))}function we(t){xe=t,Go(F.find(e=>e.id===t)),Wo(),$n();for(const e of F){const n=e.id===t;me.get(e.id)?.classList.toggle("shown",n);const a=document.getElementById(`tab-${e.id}`);a?.setAttribute("aria-selected",String(n)),a?.setAttribute("tabindex",n?"0":"-1")}}const zp=Bd(()=>F.map(t=>({instance:t,window:()=>me.get(t.id)?.contentWindow,readyState:()=>{try{return me.get(t.id)?.contentDocument?.readyState}catch{return}}})),le);function Yo(t){const e=le.find(r=>r.id===t);if(!e)return;const n=Fd(F,e),a=F.map(r=>r.type).lastIndexOf(n.type);F=a<0?[...F,n]:[...F.slice(0,a+1),n,...F.slice(a+1)],dt(F),jo(n);for(const r of F){const o=document.getElementById(`tab-${r.id}`);o&&ut.insertBefore(o,It)}we(n.id),_e?.render()}function Rp(t,e){const n=F.find(o=>o.id===t);if(!n)return;const a=F.filter(o=>o.id!==t),r=e===null?a.length:a.findIndex(o=>o.id===e);F=[...a.slice(0,r<0?a.length:r),n,...a.slice(r<0?a.length:r)],dt(F);for(const o of F){const s=document.getElementById(`tab-${o.id}`);s&&ut.insertBefore(s,It)}_e?.render()}function Dp(t,e){F=Cd(F,t,e,le),dt(F);const n=F.find(r=>r.id===t);if(!n)return;const a=document.getElementById(`tab-${t}`);a&&(a.textContent=n.name),me.get(t)?.setAttribute("title",n.name),xe===t&&Go(n),_.rename(t,n.name)}async function Bp(t,e){const a=F.find(l=>l.id===t)?.name??t;if(!await wa({title:`Remove ${a}?`,body:`Its channel, strip and mix settings go. ${a}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:e}))return;F=F.filter(l=>l.id!==t),dt(F),Ro.forget(t);const o=oe.playing().includes(t);oe.drop(t),o&&oe.out(t);const s=me.get(t);me.delete(t),s?.setAttribute("src","about:blank"),s?.remove(),document.getElementById(`tab-${t}`)?.remove(),_.detach(t),Op(t),bu(ie(),t),xe===t&&we(F[0]?.id??"")}const pa=N("div",{class:"mix"});pa.addEventListener("click",t=>{const n=t.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==xe&&F.some(a=>a.id===n)&&we(n)});let _e=null,ma=0;const fn=new Set;function Op(t){fn.add(t),delete re.channels[t],delete re.channelFx[t],Da.delete(t),kn()}let Zo=!1;function kn(){window.clearTimeout(ma),!Zo&&(ma=window.setTimeout(()=>{go(Xo())},300))}function Xo(){const t={...re.channels};for(const a of _.list())t[a.id]=a.strip;for(const a of fn)delete t[a];const e={};for(const a of["a","b","insert"]){const r=qe[a];r&&(e[a]=r.getState())}const n={...re.channelFx};for(const[a,r]of Da)n[a]=r.getState();for(const a of fn)delete n[a];return{v:1,channels:t,master:_.masterPositionValue,returns:{a:{on:_.returns.a.on,level:_.returns.a.level},b:{on:_.returns.b.on,level:_.returns.b.level}},insert:{on:_.insertEnabled},fx:e,channelFx:n}}_.onChange(()=>{_e?.render(),kn()});for(const t of Object.values(qe))t?.onChange(kn);async function _a(){Y.state!=="running"&&await Y.resume()}const Ki=1500;async function qp(){const t=performance.now()+Ki;await Promise.race([_a(),new Promise(e=>setTimeout(e,Ki))]),await He.whenSettled(Math.max(0,t-performance.now())),await Promise.race([Ba.idle(),new Promise(e=>setTimeout(e,Math.max(0,t-performance.now())))])}Lt.addEventListener("click",()=>{_a(),B.running()&&oe.owner()===za?B.stop():B.running()?oe.claimAll():(oe.claimAll(),B.play()),ze()});function Vo(){const t=Number(lt.value);B.setTempo(t),Lo(B.bpm(),Ie())}Ke.addEventListener("change",()=>{Ke.value=je(Ke.value),To(Ke.value,Ie())});function Pp(t,e,n){const a=URL.createObjectURL(new Blob([e],{type:n})),r=N("a",{href:a,download:t});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e4)}Bo.addEventListener("click",async()=>{const t=je(Ke.value),e=F.map(o=>o.id),n=await nt.collect(e),a=cp({name:t,bpm:B.bpm(),instances:F,mix:Xo(),presets:n});Pp(up(t),`${JSON.stringify(a,null,2)}
`,"application/json");const r=F.filter(o=>!n[o.id]).map(o=>o.name);Wa(r.length?`Saved “${t}” (without ${r.join(", ")}: ${r.length===1?"it hasn't":"they haven't"} loaded yet)`:`Saved “${t}”`)});Oo.addEventListener("click",()=>kt.click());kt.addEventListener("change",async()=>{const t=kt.files?.[0];if(kt.value="",!t)return;const e=dp(await t.text(),le.filter(r=>r.available!==!1).map(r=>r.id));if(!e.ok){Wa(e.error);return}const n=e.scene;await wa({title:`Load “${n.name}”?`,body:"The music stops and the Studio reloads with this Scene's instruments, their sounds and patterns, the mix and the tempo. Save the current Scene first to keep it.",confirmLabel:"Load"})&&Uo({name:n.name,bpm:n.tempo.bpm,instances:n.instances,mix:n.mix,presets:n.presets})});qo.addEventListener("click",async()=>{await wa({title:"Start a new Scene?",body:"The music stops and the Studio reloads with one of each instrument, a fresh mix and 120 BPM. Each instrument keeps its own sound and pattern. Save the current Scene first to keep it.",confirmLabel:"New"})&&Uo({name:Ra,bpm:mn,instances:St(le),mix:Mt()})});function Uo(t){B.running()&&B.stop(),Zo=!0,window.clearTimeout(ma);const e=t.instances.map(({id:n,name:a})=>{const[r,o]=n.split("#"),s=le.find(l=>l.id===r);return s?ct(s,o?Number(o):1,a):null}).filter(n=>n!==null);dt(e),go(t.mix),Lo(t.bpm,Ie()),To(t.name,Ie()),nt.stash({...t.presets??{}}),location.reload()}let Ji=0;function Wa(t){Pa.textContent=t,ja.textContent=t,window.clearTimeout(Ji),Ji=window.setTimeout(ze,4e3)}lt.addEventListener("change",Vo);lt.addEventListener("keydown",t=>{t.key==="Enter"&&Vo()});Te.addEventListener("click",async()=>{if(_a(),Qt.recording){const t=await Qt.stop();Te.setAttribute("aria-pressed","false"),Te.textContent="Rec",t&&(Gt&&URL.revokeObjectURL(Gt.url),Gt={url:URL.createObjectURL(t.blob),take:t},yt.href=Gt.url,yt.download=t.name,yt.textContent=`Save take (${t.seconds.toFixed(1)} s)`,yt.hidden=!1)}else Qt.start(),Te.setAttribute("aria-pressed","true"),Te.textContent="Stop rec"});document.addEventListener("keydown",t=>{if(t.code!=="Space"||t.repeat)return;const e=t.target;e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)||(t.preventDefault(),Lt.click())});ut.addEventListener("keydown",t=>{if(t.target===at)return;const e=F.map(r=>r.id),n=e.indexOf(xe),a=t.key==="ArrowRight"?e[(n+1)%e.length]:t.key==="ArrowLeft"?e[(n-1+e.length)%e.length]:null;a&&(t.preventDefault(),we(a),document.getElementById(`tab-${a}`)?.focus())});function ze(){const t=B.running()&&oe.owner()===za;Lt.textContent=t?"Stop":"Play",Lt.setAttribute("aria-pressed",String(t)),document.activeElement!==lt&&(lt.value=String(Math.round(B.bpm()*10)/10));const e=B.position();hn.value=e?`${e.bar}.${e.beat}`:"—";const n=B.peers().length;Pa.textContent=Y.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",ja.textContent=Y.state==="running"?"":"Audio off",Oa.classList.toggle("off",Y.state!=="running")}B.clock.onChange(()=>{B.clock.transport.running&&(Do=!0),B.running()||oe.clear(),ze()});oe.onChange(ze);oe.onLastOut(()=>{B.running()&&B.stop(),ze()});B.clock.onChange(()=>_e?.render());B.peer.onPeers(ze);Y.addEventListener("statechange",ze);const jp=.25;let Qi=performance.now();function Ko(t){const e=Math.min(.1,(t-Qi)/1e3);Qi=t,_e?.frame(e);const n=B.position(),a=n?`${n.bar}.${n.beat}`:"—";hn.value!==a&&(hn.value=a);const r=B.beatPhase(),o=r!==null&&r<jp;da.hasAttribute("data-on")!==o&&da.toggleAttribute("data-on",o),requestAnimationFrame(Ko)}async function Hp(){const t=document.getElementById("app");if(!t)throw new Error("Missing #app");t.append(Tp,ua,Cp,pa,N("main",{class:"instruments"},ut,N("div",{class:"bay"},Tt,Po))),_e=Wu(pa,_,{order:()=>F.map(e=>e.id),catalogue:Na,bpm:()=>B.bpm(),onAdd:Yo,onRemove:(e,n)=>void Bp(e,n),onReorder:(e,n)=>Rp(e,n),onRename:(e,n)=>Dp(e,n)}),Y.state==="running"&&await Y.suspend(),await Y.audioWorklet.addModule(vp),Fo(),await B.start();for(const e of[qe.a,qe.b,qe.insert])e&&ur(e,B.clock,{mapper:He});for(const e of F)jo(e);we(xe),ze(),requestAnimationFrame(Ko),document.documentElement.dataset.studioReady="",_p()}function _p(){const t=new Set(nt.pending());if(!t.size)return;const e=[],n=o=>F.find(s=>s.id===o)?.name??o,a=()=>{window.clearTimeout(r);const o=[...e,...nt.dropPending()].map(n);Wa(o.length?`Scene loaded; ${o.join(", ")} kept ${o.length===1?"its":"their"} own sound`:"Scene loaded")};nt.onApplied((o,s)=>{t.delete(o)&&(s||e.push(o),t.size||a())});const r=window.setTimeout(a,qd)}window.__studio={ctx:Y,mixer:_,grab:zo,limiterDelay:Io,mapper:He,transport:B,frames:me,show:we,get instances(){return F},fx:qe,get mix(){return _e}};Hp();
