(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const Ne=1e-9;function tr(t,e,n,a=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,a))}class ia{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return tr(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const a=n.filter(r=>Number.isFinite(r.beat)&&Number.isFinite(r.bpm)).slice().sort((r,l)=>r.beat-l.beat);let s=a.length?a[0].bpm:this.bpm;for(const r of a)r.beat<=e.beat+Ne&&(s=r.bpm);const o=[{beat:e.beat,time:e.time,bpm:this.clamp(s)}];for(const r of a){if(r.beat<=e.beat+Ne)continue;const l=this.clamp(r.bpm);l!==o[o.length-1].bpm&&o.push({beat:r.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+Ne){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-Ne;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,a,s=.25){const o=this.bpmAt(n);if(!(a>0)||!(s>0)){this.setTempoAt(e,n);return}const r=Math.max(1,Math.round(a/s));this.setTempoAt(o,n);for(let l=1;l<=r;l++)this.setTempoAt(o+(e-o)*l/r,n+a*(l-1)/r)}prune(e){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=e&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new ia({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=e+Ne)return n[a];return n[0]}segAtTime(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=e+Ne)return n[a];return n[0]}}const nr=Object.freeze({beatsPerBar:4,beatUnit:4}),je=1e-9;function ar(t){return Math.floor(t+je)}function Xi(t,e,n=!1){if(!(e>0))return t;const s=Math.ceil(t/e-je)*e;return n&&s<=t+je?s+e:s}class ir{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new ia({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??nr}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-je&&(this.stopTime===null||e<this.stopTime-je)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(e,a.beat),a.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-je?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),a=ar(e/n),s=Math.max(0,e-a*n);return{beat:e,bar:a,beatInBar:s,barPhase:s/n}}nextBar(e,n=!1){return Xi(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const Ji="nc-clock/snapshot",Qi=1;function sr(t,e="local"){return{format:Ji,version:Qi,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function or(t,e){const n=lr(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}function rr(t,e,n=t.timebase){const a=s=>s===null?null:s+e;return{...t,timebase:n,anchor:{beat:t.anchor.beat,time:t.anchor.time+e},tempo:t.tempo.map(s=>({...s})),meter:{...t.meter},startTime:a(t.startTime),stopTime:a(t.stopTime)}}const ie=t=>typeof t=="number"&&Number.isFinite(t),Oa=t=>t===null||ie(t);function lr(t){const e=t,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==Ji&&n("format"),(!ie(e.version)||Math.floor(e.version)!==Qi)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!ie(e.anchor.beat)||!ie(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(a=>a&&ie(a.beat)&&ie(a.bpm)&&a.bpm>0))&&n("tempo"),(!e.meter||!ie(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!ie(e.meter.beatUnit))&&n("meter"),(!Oa(e.startTime)||!Oa(e.stopTime)||!ie(e.stoppedBeat))&&n("transport times"),e}class cr{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new ir(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,a){this.transport.start({at:e,beat:n,bpm:a}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const a=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(e){or(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return sr(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const dr="nc-sync/1",ur=1,pr="nc-sync",hr="nc-sync-leader",mr=0,Zi=.5,es=.75;function fr(t){return typeof t=="number"&&Number.isFinite(t)&&t>=Zi&&t<=es?t:null}const hn=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Ze=t=>typeof t=="number"&&Number.isFinite(t),Et=t=>typeof t=="string"&&t.length>0;function gr(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==ur||!Et(e.type)||!Et(e.from)||!Ze(e.term)||!Ze(e.seq)||!Ze(e.sentAt))return null;switch(e.type){case"hello":return Et(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return Ze(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&Ze(e.slot)?e:null;case"ping":case"pong":return Et(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function br(t,e,n,a,s){return{proto:dr,from:e,term:n,seq:a,sentAt:s,...t}}function B(){return(performance.timeOrigin+performance.now())/1e3}const mn=.003,yr=3,fn=.002+1e-6,wr=.01,Ba=500;class vr{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?wr:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,a=e?.performanceTime??0;if(!(n>=mn&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const s=n-(this.timeOrigin+a)/1e3,o=this.median(),r=s-o,l=Math.abs(s-this.preStepBase),u=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(r);return!u&&Math.abs(r)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&u===this.pendingBack&&(u||Math.abs(r-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(s,o,u))):(this.pendingStep=r,this.pendingBack=u,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,a){const s=this.heldBase()!==null,o=this.ctx.currentTime,r=o<=this.revertUntil;let l;if(a&&r){const u=this.offsets,c=this.preStep;u.length=0;for(let d=0;d<c.length;d++)u.push(c[d]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:o,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!r){const d=this.offsets,p=this.preStep;p.length=0;for(let f=0;f<d.length;f++)p.push(d[f]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?o+this.stepRevert:-1/0}const u=this.offsets,c=e-n;for(let d=0;d<u.length;d++)u[d]+=c;this.stepCount++,l={stepSeconds:e-n,confirmedAt:o,reanchors:this.stepCount,revert:!1}}if(!s)for(const u of[...this.stepListeners])u(l);return!0}median(){const e=this.offsets,n=this.scratch,a=e.length;n.length=a;for(let o=0;o<a;o++){const r=e[o];let l=o-1;for(;l>=0&&n[l]>r;)n[l+1]=n[l],l--;n[l+1]=r}const s=a>>1;return a%2?n[s]:(n[s-1]+n[s])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const s=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(s&&Number.isFinite(s.contextTime)&&Number.isFinite(s.performanceTime)&&s.contextTime>=mn&&s.performanceTime>0)if(this.waitSince=null,s.contextTime===this.lastStampC&&s.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Ba)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=s.contextTime,this.lastStampP=s.performanceTime,this.stampSince=this.perfNow(),n=s.contextTime-(this.timeOrigin+s.performanceTime)/1e3,a=!0;else if(!s||!(s.contextTime>=mn)&&!(s.contextTime>0&&!(s.performanceTime>0))){if(s){const o=this.perfNow();if(this.waitSince===null&&(this.waitSince=o),o-this.waitSince<Ba)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const e=this.offsets,n=e.length,a=Math.min(yr,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let s=-1,o=0;for(let l=0;l<n;l++){let u=0;for(let c=0;c<n;c++)Math.abs(e[c]-e[l])<=fn&&u++;u>o&&(s=l,o=u)}if(o<a)return;const r=e[s];for(let l=n-1;l>=0;l--)Math.abs(e[l]-r)>fn&&e.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!e||!e.contextTime||!e.performanceTime||!Number.isFinite(e.contextTime)||!Number.isFinite(e.performanceTime))return!0;const n=e.contextTime-(this.timeOrigin+e.performanceTime)/1e3;return Math.abs(n-this.estimate())<=fn}whenSettled(e=1500){if(this.settledNow())return null;const n=this.perfNow()+e;return new Promise(a=>{const s=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(s,2)};setTimeout(s,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,s=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(s)&&s>0?s:null}}class kr{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...hn,...e.capabilities},this.channelOption=e.channel??pr,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300,startGate:e.startGate??(()=>null),gatedStartLeadSeconds:e.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,a={}){this.send({type:"snapshot",op:e,slot:n,...a})}requestStart(e){this.gated(n=>this.startNow(e,n))||this.startNow(e)}startNow(e,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}gated(e){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const s=this.o.now(),o=()=>{n===this.startWaits&&e(s)};return a.then(o,o),!0}requestStop(e){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(e){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const s=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(s),0)}else{const s=a+this.o.startLeadSeconds;this.clock.commitStart(e===void 0?s:Math.max(e+this.o.gatedStartLeadSeconds,s),0)}this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,a){const[s,o]=this.tempoRange();e=Math.min(o,Math.max(s,e));const r=this.clock.transport,l=this.o.now();if(!r.running){this.clock.commitTempo(e),this.broadcastState();return}const u=r.beatAt(l+this.o.minLeadSeconds),c=Math.max(n??Xi(u,1),u);a&&a>0?(r.tempo.rampTempo(e,c,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,c),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const a of this.peers.values())e=Math.max(e,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(es,Math.max(Zi,e)):mr;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=fr(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(e){const n=gr(e);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const s=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...hn,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),s||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const s=this.peers.get(n.from);s?s.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...hn},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(s=>{this.leader&&this.decideStart(s)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const s of[...this.snapshotListeners])s(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const s of[...this.messageListeners])s(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const r=this.releaseLock;this.releaseLock=null,r()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(hr,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(r=>{this.releaseLock=()=>{this.setLeader(!1),r()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,r,l)=>[o?0:1,r,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),s=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const r=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(s===null||r[0]<a[0]||r[0]===a[0]&&(r[1]<a[1]||r[1]===a[1]&&r[2]<a[2]))&&(a=r,s=o.id)}this.setLeader(s===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const a=[this.caps.prefersLeader?0:1,this.joinedAt],s=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==s[0]?a[0]<s[0]:a[1]!==s[1]?a[1]<s[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const s=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-a.lastSeen>s&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(br(e,this.id,this.term,++this.seq,this.o.now()))}}const Ha={ride:{tune:4300,decay:3.9,tone:.5,snap:.5,drive:0,level:.5},crash:{tune:6600,decay:5.5,tone:.5,snap:.5,drive:0,level:.5}},ja=.02,xr=.06,$r={shaker:{tune:6500,decay:.025,tone:.55,snap:.55,drive:.5,level:.3}},ts=["kick","snare","clap","rim","hat","hatOpen","tom","metal","shaker","ride","crash"],Nn=[205.3,304.4,369.6,522.7,540,800],Y=(t,e)=>({bits:t,rate:e}),Er=[540,800],Sr=[612,873,1327,1741],qt={808:{id:"808",name:"808",line:"Deep thump, crisp noise snare, bright hats",trimDb:0,bus:{},voices:{kick:{len:2.4,body:{f0:80,f1:48,pt:.012,d1:.2,d2:.45,mix:.55,lvl:1},click:{mode:"hp",f:2500,d:.005,lvl:.9},drive:1.8,level:.9},snare:{len:.6,body:{f0:210,f1:190,pt:.005,d1:.025,lvl:.18},click:{mode:"hp",f:2200,d:.004,lvl:1},noise:{mode:"bp",f:2600,q:.45,d:.12,lvl:1.3},noise2:{mode:"hp",f:6500,d:.18,lvl:.8},drive:1.6,level:.8},clap:{len:.6,clap:{bursts:4,gap:.0105,bd:.006,tail:.17,f:1300,q:.7,lvl:2},noise2:{mode:"hp",f:7e3,d:.12,lvl:.35},level:.7},rim:{len:.1,click:{mode:"bp",f:3200,q:1.5,d:.008,lvl:2.2},noise:{mode:"hp",f:5e3,d:.012,lvl:.6},drive:1.8,level:.5},hat:{len:.3,noise:{mode:"hp",f:8e3,d:.04,lvl:1},noise2:{mode:"bp",f:11e3,q:1,d:.03,lvl:.8},metal:{base:1,ratios:Nn,f:1e4,q:.8,hp:7e3,d:.035,lvl:.6},level:.32},hatOpen:{len:1.2,noise:{mode:"hp",f:7500,d:.3,lvl:1},noise2:{mode:"bp",f:10500,q:1,d:.25,lvl:.8},metal:{base:1,ratios:Nn,f:1e4,q:.8,hp:7e3,d:.25,lvl:.5},level:.4},tom:{len:1,body:{f0:150,f1:118,pt:.02,d1:.18,lvl:.5},noise:{mode:"lp",f:1400,d:.1,lvl:1.1},click:{mode:"hp",f:2e3,d:.004,lvl:.5},level:.55},metal:{len:.35,click:{mode:"bp",f:3200,q:.9,d:.004,lvl:1.2},noise:{mode:"bp",f:2500,q:.5,d:.05,lvl:1.6},noise2:{mode:"hp",f:5e3,d:.03,lvl:.5},metal:{base:1,ratios:Er,f:2600,q:.6,hp:600,d:.045,lvl:1},drive:2.2,level:.4},ride:{len:6,click:{mode:"bp",f:4400,q:.45,d:.0015,lvl:2.4},noise:{mode:"bp",f:5500,q:.5,d:.05,lvl:.36},noise2:{mode:"hp",f:700,d:1.3,lvl:.15},sweep:{from:11e3,to:2100,t:.35},knobs:{tone:[-.35,1],decay:[.14,2]},vel:{dark:.8,curve:.8},level:.4},crash:{len:9,click:{mode:"bp",f:6800,q:.5,d:.006,lvl:2.8},noise:{mode:"bp",f:6200,q:.5,d:.05,lvl:1.1},noise2:{mode:"hp",f:600,d:2.2,lvl:.28},sweep:{from:13e3,to:1800,t:.35},knobs:{tone:[-.6,1],decay:[.09,2]},level:.62},shaker:{len:.2,noise:{mode:"bp",f:7500,q:.8,a:.006,d:.035,lvl:1.2},level:.4}}},lofi:{id:"lofi",name:"Lo-fi",line:"Dusty and warm: soft crush, hiss and crackle",trimDb:0,bus:{sat:1.7,crush:Y(12,26e3),lp:9e3,hp:40,hiss:.004,crackle:3e-4},voices:{kick:{len:.9,body:{f0:85,f1:54,pt:.01,d1:.14,d2:.28,mix:.3,lvl:1},click:{mode:"bp",f:1800,q:.6,d:.008,lvl:1},drive:3,filt:{mode:"lp",f:3500},level:.85},snare:{len:.6,body:{f0:200,f1:185,pt:.005,d1:.03,lvl:.2},click:{mode:"bp",f:1800,q:.7,d:.006,lvl:1},noise:{mode:"bp",f:2e3,q:.4,d:.17,lvl:1.4},noise2:{mode:"hp",f:4500,d:.13,lvl:.5},drive:2.6,filt:{mode:"lp",f:7e3},level:.8},clap:{len:.6,clap:{bursts:3,gap:.011,bd:.007,tail:.16,f:1300,q:.45,lvl:2},noise2:{mode:"hp",f:4500,d:.1,lvl:.4},drive:1.8,filt:{mode:"lp",f:7e3},level:.6},rim:{len:.15,click:{mode:"bp",f:2200,q:1,d:.01,lvl:2},noise:{mode:"bp",f:3500,q:1,d:.015,lvl:.5},drive:2,level:.45},hat:{len:.25,noise:{mode:"hp",f:6500,d:.035,lvl:1},noise2:{mode:"bp",f:8500,q:.8,d:.03,lvl:.6},filt:{mode:"lp",f:9500},level:.6},hatOpen:{len:.8,noise:{mode:"hp",f:6e3,d:.2,lvl:1},filt:{mode:"lp",f:9500},level:.4},tom:{len:.8,body:{f0:135,f1:110,pt:.018,d1:.16,lvl:.35},noise:{mode:"lp",f:1200,d:.09,lvl:1.1},click:{mode:"bp",f:1500,q:.6,d:.006,lvl:.6},drive:1.8,filt:{mode:"lp",f:5e3},level:.55},metal:{len:1.4,noise:{mode:"hp",f:5e3,d:.45,lvl:.9},noise2:{mode:"bp",f:7500,q:1,d:.35,lvl:.6},filt:{mode:"lp",f:9e3},level:.4},ride:{len:6,click:{mode:"bp",f:4200,q:.35,d:.0017,lvl:2.4},noise:{mode:"bp",f:5200,q:.4,d:.05,lvl:.36},noise2:{mode:"hp",f:600,d:1.2,lvl:.16},sweep:{from:1e4,to:1800,t:.3},knobs:{tone:[-.35,1],decay:[.14,2]},vel:{dark:.4,curve:.8},level:.45},crash:{len:9,click:{mode:"bp",f:5800,q:.5,d:.007,lvl:2.6},noise:{mode:"bp",f:5e3,q:.5,d:.03,lvl:1.1},noise2:{mode:"hp",f:500,d:2,lvl:.26},sweep:{from:9e3,to:1300,t:.35},knobs:{tone:[-.6,1],decay:[.09,2]},drive:1.2,level:.5},shaker:{len:.2,noise:{mode:"bp",f:5500,q:.8,a:.01,d:.04,lvl:1},level:.3}}},linn:{id:"linn",name:"Linn",line:"8-bit and punchy: big snare and clap in a small room",trimDb:2.8,bus:{room:{mix:.45,fb:.5},sat:1.2,hp:30},voices:{kick:{len:.6,body:{f0:85,f1:58,pt:.008,d1:.1,lvl:1},click:{mode:"hp",f:2e3,d:.004,lvl:1.1},drive:1.6,crush:Y(8,28e3),level:.9},snare:{len:.7,body:{f0:190,f1:180,pt:.005,d1:.03,lvl:.18},click:{mode:"hp",f:2500,d:.004,lvl:1},noise:{mode:"bp",f:3200,q:.45,d:.2,lvl:1.4},noise2:{mode:"hp",f:7e3,d:.22,lvl:.8},drive:1.4,crush:Y(8,28e3),level:.8},clap:{len:.6,clap:{bursts:3,gap:.012,bd:.007,tail:.21,f:1500,q:.7,lvl:2},noise2:{mode:"hp",f:7e3,d:.15,lvl:.3},crush:Y(8,28e3),level:.8},rim:{len:.12,click:{mode:"bp",f:2600,q:1.3,d:.009,lvl:2.2},noise:{mode:"bp",f:4500,q:.9,d:.014,lvl:.6},drive:1.5,crush:Y(8,28e3),level:.45},hat:{len:.25,noise:{mode:"bp",f:9500,q:.8,hp:7e3,d:.045,lvl:2},noise2:{mode:"hp",f:11e3,d:.035,lvl:.6},crush:Y(8,28e3),level:.28},hatOpen:{len:.9,noise:{mode:"bp",f:9e3,q:.8,hp:6500,d:.3,lvl:2},crush:Y(8,28e3),level:.3},tom:{len:.9,body:{f0:140,f1:112,pt:.02,d1:.22,lvl:.5},noise:{mode:"lp",f:1600,d:.12,lvl:1.1},click:{mode:"hp",f:2e3,d:.004,lvl:.5},crush:Y(8,28e3),level:.55},metal:{len:.3,click:{mode:"bp",f:4200,q:1.2,d:.005,lvl:1.4},noise:{mode:"bp",f:4500,q:.6,d:.035,lvl:1.4},metal:{base:1,ratios:Sr,f:3400,q:.7,hp:1200,d:.035,lvl:1},drive:1.6,crush:Y(8,28e3),level:.32},ride:{len:6,click:{mode:"bp",f:4200,q:.45,d:.0015,lvl:2.4},noise:{mode:"bp",f:5200,q:.5,d:.05,lvl:.36},noise2:{mode:"hp",f:700,d:1.3,lvl:.16},sweep:{from:1e4,to:2e3,t:.35},knobs:{tone:[-.35,1],decay:[.16,2]},vel:{dark:.8,curve:.8},crush:Y(8,28e3),level:.36},crash:{len:9,click:{mode:"bp",f:6500,q:.5,d:.006,lvl:2.8},noise:{mode:"bp",f:6e3,q:.5,d:.05,lvl:1.1},noise2:{mode:"hp",f:600,d:2.2,lvl:.3},sweep:{from:11e3,to:1500,t:.35},knobs:{tone:[-.6,1],decay:[.09,2]},crush:Y(8,28e3),level:.55},shaker:{len:.2,noise:{mode:"hp",f:6e3,a:.004,d:.03,lvl:1},crush:Y(8,28e3),level:.2}}},minimal:{id:"minimal",name:"Minimal",line:"Tight and dry: short ticks, clicks and a firm kick",trimDb:4.9,bus:{room:{mix:.18,fb:.35}},voices:{kick:{len:.5,body:{f0:72,f1:50,pt:.006,d1:.12,lvl:1},click:{mode:"hp",f:4e3,d:.002,lvl:1},drive:1.3,level:.95},snare:{len:.35,body:{f0:230,f1:210,pt:.004,d1:.018,lvl:.12},click:{mode:"hp",f:3e3,d:.003,lvl:1},noise:{mode:"bp",f:3500,q:.5,d:.07,lvl:1.3},noise2:{mode:"hp",f:8e3,d:.06,lvl:.6},drive:1.3,level:.55},clap:{len:.25,clap:{bursts:2,gap:.006,bd:.004,tail:.05,f:2200,q:.8,lvl:2},level:.4},rim:{len:.08,click:{mode:"bp",f:4500,q:2,d:.004,lvl:2.5},noise:{mode:"hp",f:6e3,d:.006,lvl:.5},level:.25},hat:{len:.1,noise:{mode:"hp",f:9500,d:.012,lvl:1},noise2:{mode:"bp",f:12e3,q:1,d:.01,lvl:.6},level:.55},hatOpen:{len:.5,noise:{mode:"hp",f:8e3,d:.09,lvl:1},noise2:{mode:"bp",f:11e3,q:1.2,d:.08,lvl:.7},level:.35},tom:{len:.3,click:{mode:"bp",f:900,q:1.2,d:.03,lvl:2},level:.35},metal:{len:.3,click:{mode:"bp",f:1600,q:1.1,d:.025,lvl:2.5},noise:{mode:"hp",f:7e3,d:.01,lvl:.4},level:.3},ride:{len:2.5,click:{mode:"bp",f:5e3,q:.45,d:.0012,lvl:2.4},noise:{mode:"bp",f:6500,q:.5,d:.035,lvl:.36},noise2:{mode:"hp",f:900,d:.5,lvl:.16},sweep:{from:12e3,to:2600,t:.2},knobs:{tone:[-.35,1],decay:[.32,2]},vel:{dark:.8,curve:.8},level:.4},crash:{len:3.5,click:{mode:"bp",f:7200,q:.5,d:.005,lvl:2.8},noise:{mode:"bp",f:7e3,q:.5,d:.04,lvl:1.1},noise2:{mode:"hp",f:900,d:.85,lvl:.38},sweep:{from:14e3,to:2600,t:.25},knobs:{tone:[-.6,1],decay:[.2,2]},level:.55},shaker:{len:.15,noise:{mode:"bp",f:8e3,q:.9,a:.003,d:.018,lvl:1.2},level:.3}}}},at=["808","lofi","linn","minimal"],xt=2,Ar=[1,2],Tr={808:{len:1.5,noise:{mode:"hp",f:6e3,d:.5,lvl:.9},noise2:{mode:"bp",f:9e3,q:1.2,d:.4,lvl:.8},metal:{base:1,ratios:Nn,f:8e3,q:.7,hp:5e3,d:.45,lvl:.4},level:.3},linn:{len:1.8,noise:{mode:"hp",f:5500,d:.7,lvl:.9},noise2:{mode:"bp",f:8500,q:1.1,d:.55,lvl:.7},crush:Y(8,28e3),level:.25}},Mr=Object.fromEntries(Object.keys(qt).map(t=>{const e=qt[t],n=Tr[t];return[t,n?{...e,voices:{...e.voices,metal:n}}:e]})),Lr={tune:{min:-12,max:12,step:.1},decay:{min:.25,max:4,step:.01},body:{min:0,max:2,step:.01},snap:{min:0,max:2,step:.01},noise:{min:-2,max:2,step:.01},sizzle:{min:0,max:2,step:.01},drive:{min:0,max:1,step:.01},level:{min:0,max:2,step:.01}},ns={room:{min:0,max:1,step:.01},grit:{min:0,max:1,step:.01},hiss:{min:0,max:1,step:.01},sat:{min:0,max:1,step:.01},lowCut:{min:20,max:400,step:1},highCut:{min:1e3,max:2e4,step:10}},as=["tune","decay","body","snap","noise","sizzle","drive","level"],is=["room","grit","hiss","sat","lowCut","highCut"],Cr=.01;function Nr(t){return{tune:0,decay:1,body:1,snap:1,noise:0,sizzle:1,drive:t.drive?Pt((t.drive-1)/5):0,level:1}}function sa(t){const e=t.bus;return{room:e.room?.mix??0,grit:e.crush?Pt((16-e.crush.bits)/10):0,hiss:e.hiss?Pt(e.hiss/Cr):0,sat:e.sat?Pt((e.sat-1)/3):0,lowCut:e.hp??20,highCut:e.lp??2e4}}function ke(t,e=xt){const n=e===1?Mr:qt;return n[t??"808"]??n[808]}function oa(t){return t.sweep!==void 0}function ss(t,e){if(oa(t)){const n=t.knobs;if(e==="noise")return{min:n?.tone[0]??-1,max:n?.tone[1]??1,step:.01};if(e==="decay")return{min:n?.decay[0]??.09,max:n?.decay[1]??2,step:.01}}return Lr[e]}function Fr(t){if(oa(t)){const n=["noise","decay"];return t.click&&n.push("snap"),t.noise2&&n.push("sizzle"),n.push("drive","level"),n}const e=[];return(t.body||t.metal||t.click)&&e.push("tune"),e.push("decay"),t.body&&e.push("body"),(t.click||t.clap)&&e.push("snap"),(t.noise||t.noise2||t.clap||t.metal)&&e.push("noise"),(t.noise2||t.metal)&&e.push("sizzle"),e.push("drive","level"),e}function Pt(t){return Math.round(t*1e3)/1e3}const os="808";function ra(t=os){return{kit:t,character:sa(ke(t)),version:xt}}function Je(t,e,n=xt){return Nr(ke(t,n).voices[e])}function zr(t){return t==="deep"?"deep":"classic"}function Pr(t){return at.includes(t)?t:os}function rs(t,e,n,a){return typeof t!="number"||!Number.isFinite(t)?a:t<e?e:t>n?n:t}function _r(t){const e=t&&typeof t=="object"?t:{},n=Pr(e.kit),a=sa(ke(n)),s=e.character&&typeof e.character=="object"?e.character:{},o={...a};for(const l of is){const u=ns[l];o[l]=rs(s[l],u.min,u.max,a[l])}const r=Ar.includes(e.version)?e.version:1;return{kit:n,character:o,version:r}}function Dr(t,e,n,a=xt){const s=Je(e,n,a);if(!t||typeof t!="object")return s;const o=t,r={...s},l=ke(e,a).voices[n];for(const u of as){const c=ss(l,u);r[u]=rs(o[u],c.min,c.max,s[u])}return r}function Ir(t,e,n,a=xt){const s=Je(t,e,a);return as.some(o=>Math.abs(s[o]-n[o])>1e-6)}function Rr(t){const e=sa(ke(t.kit));return is.some(n=>Math.abs(e[n]-t.character[n])>1e-6)}const re=10,Fn=["1","2","3","4","5","6","7","8","9","0"];function ls(){return{slots:Array.from({length:re},()=>null),active:null}}function la(t){return{swing:t.swing,fx:structuredClone(t.fx),tracks:structuredClone(t.tracks),engine:t.engine,deep:structuredClone(t.deep)}}function Or(t,e,n){const a=t.slots.slice();return a[e]=la(n),{slots:a,active:e}}function Br(t,e){const n=t.slots.slice();return n[e]=null,{slots:n,active:t.active===e?null:t.active}}function qa(t,e,n,a){const s=t.slots[e];return s?{bank:{slots:t.slots,active:e},document:{...n,bpm:n.bpm,swing:s.swing,fx:structuredClone(s.fx),tracks:structuredClone(s.tracks),engine:s.engine??n.engine,deep:structuredClone(s.deep??n.deep)},glideSeconds:a>0?a:0,applied:!0}:{bank:t,document:n,glideSeconds:0,applied:!1}}function Hr(t,e){if(t.active==null||!t.slots[t.active])return t;const n=t.slots.slice();return n[t.active]=la(e),{slots:n,active:t.active}}const cs=16,jr=[2,6,10,14],qr=[2,3,6,10,11,14],pt=[0,2,4,6,8,10,12,14],Ur=[2,6,10,14],Gr=[1,3,7,9,11,15],Ua=[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],pt,[2,6,10,14]],ds=[pt,[0,4,8,12]],Wr=[32,64],Kr=.95,Vr=.55,Yr=.15,Xr=.3,Jr={kick:{tune:[40,75],decay:[.28,.6],level:[.7,.9]},tom:{tune:[70,140],decay:[.2,.5],level:[.5,.75]},snare:{tune:[140,240],decay:[.12,.32],level:[.45,.7]},clap:{tune:[150,260],decay:[.1,.3],level:[.3,.55]},rim:{tune:[280,620],decay:[.04,.12],level:[.25,.5]},hat:{tune:[280,440],decay:[.03,.09],level:[.25,.45]},hatOpen:{tune:[250,380],decay:[.1,.28],level:[.22,.42]},metal:{tune:[180,340],decay:[.08,.28],level:[.25,.5]},shaker:{tune:[5200,9e3],decay:[.02,.028],level:[.24,.36]},ride:{tune:[3800,4800],decay:[3.2,4.6],level:[.42,.55]},crash:{tune:[6e3,7200],decay:[4.6,6.5],level:[.45,.55]}},Qr=new Set(["ride","crash"]);function j(){return Array.from({length:cs},()=>!1)}function be(t,e,n,a=!1){const s=e+t()*(n-e);return a?Math.round(s):Math.round(s*100)/100}function gn(t,e,n){return be(t,Math.max(0,e-n),Math.min(1,e+n))}function Zr(t){const e=j();e[0]=!0,t()<.85&&(e[8]=!0),t()<.75&&(e[4]=!0),t()<.75&&(e[12]=!0);const n=[3,6,10,14],a=n[Math.floor(t()*n.length)]??6;return t()<.35&&(e[a]=!0),e}function el(t){const e=j();e[4]=t()<.85,e[12]=t()<.85,!e[4]&&!e[12]&&(e[t()<.5?4:12]=!0);const n=jr.filter(()=>t()<.22);for(const a of n.slice(0,2))e[a]=!0;return e}function tl(t,e){const n=j();return t[4]&&e()<.65&&(n[4]=!0),t[12]&&e()<.65&&(n[12]=!0),n}function nl(t,e){const n=j();let a=0;for(const s of qr)a>=3||t[s]||e()<.35&&(n[s]=!0,a+=1);return n}function al(t){const e=j();let n=0;for(const a of Ur){if(n>=2)break;t()<.4&&(e[a]=!0,n+=1)}return e}function il(t,e){const n=j();for(const r of pt)n[r]=!t[r];const a=pt.filter(r=>n[r]&&r!==0),s=1+Math.floor(e()*3);for(let r=0;r<s&&a.length>0;r+=1){const l=Math.floor(e()*a.length),u=a.splice(l,1)[0];u!==void 0&&(n[u]=!1)}let o=0;for(const r of[1,3,5,7,9,11,13,15]){if(o>=2)break;e()<.12&&(n[r]=!0,o+=1)}return n}function sl(t,e){const n=j(),a=t[12]?[13,14,15]:[12,13,14,15];let s=0;for(const o of a){if(s>=3)break;e()<.45&&(n[o]=!0,s+=1)}return n}function ol(t,e,n){const a=j();let s=0;for(const o of Gr)s>=2||t[o]||e[o]||n()<.35&&(a[o]=!0,s+=1);return a}function us(t,e){const n=j(),a=t[Math.floor(e()*t.length)]??t[0]??[];for(const s of a)n[s]=!0;return n}function ps(t){const e=j(),n=Ua[Math.floor(t()*Ua.length)]??pt;for(const a of n)e[a]=!0;return e}function Ut(t,e,n){return Array.from({length:e},(a,s)=>{const o=t[s]===!0,r=o&&n(s);return{on:o,accent:r,velocity:r?1:.8}})}function hs(t,e){return t==="kick"?e===0||e===8:t==="snare"?e===4||e===12:t==="shaker"?e%4===2:!1}function zn(t,e,n){const a=Jr[t];return{tune:be(n,a.tune[0],a.tune[1],!0),decay:t==="shaker"?Math.round((a.decay[0]+n()*(a.decay[1]-a.decay[0]))*1e3)/1e3:be(n,a.decay[0],a.decay[1]),tone:gn(n,e.tone,.15),snap:gn(n,e.snap,.15),drive:gn(n,e.drive,.1),level:be(n,a.level[0],a.level[1])}}function ms(t,e=!1){const n=Zr(t),a=el(t),s=al(t);return{kick:n,snare:a,clap:tl(a,t),rim:nl(n,t),hat:il(s,t),hatOpen:s,tom:sl(a,t),metal:ol(n,a,t),shaker:e?ps(t):j(),ride:j(),crash:j()}}function rl(t,e,n){const a=t.tracks[e];if(!a)return t;const s=l=>l.every((u,c)=>u.on===(a.steps[c]?.on??!1));if(a.voice==="crash"){const l=Wr.filter(d=>d!==a.length),u=l[Math.floor(n()*l.length)]??64,c={...a,...gs(u)};return{...t,tracks:t.tracks.map((d,p)=>p===e?c:d)}}let o=a.steps;for(let l=0;l<6;l++){const u=a.voice==="ride"?us(ds,n):ms(n,a.voice==="shaker")[a.voice];if(o=a.voice==="ride"?fs(u,a.length):Ut(u,a.length,c=>hs(a.voice,c)),!s(o)&&o.some(c=>c.on))break}const r=a.steps.slice(a.length);return{...t,tracks:t.tracks.map((l,u)=>u===e?{...l,steps:[...o,...r]}:l)}}function ll(t){return{...t,tracks:t.tracks.map(e=>{const n=Math.max(0,e.length-4),a=e.steps.map((s,o)=>{if(o<n||o>=e.length)return s;const r=o-n;return e.voice==="snare"?{on:!0,accent:r===3,velocity:[.55,.7,.85,1][r]??1}:e.voice==="tom"?{on:r%2===1,accent:!1,velocity:.9}:e.voice==="hat"?{...s,on:!1,accent:!1}:s});return{...e,steps:a}})}}function cl(t,e){return ul(dl(t,e),e)}function dl(t,e){const n=ms(e),a=e()<.4?.5:be(e,.5,.62),s=e(),o=s<.8?"lp":s<.9?"hp":"bp";return{...t,bpm:t.bpm,swing:a,fx:{...t.fx,mode:o,cutoff:be(e,.55,.9),resonance:be(e,.05,.3),drive:be(e,.02,.18)},tracks:t.tracks.map(r=>{if(Qr.has(r.voice))return r;const l=zn(r.voice,r.params,e),u=r.voice==="shaker"?e()<.5?j():ps(e):n[r.voice];return{...r,mute:r.mute,solo:r.solo,params:l,steps:Ut(u,r.length,c=>hs(r.voice,c))}})}}function fs(t,e){return Array.from({length:e},(n,a)=>({on:t[a%cs]===!0,accent:!1,velocity:a%4===0?Kr:Vr}))}function gs(t){return{length:t,steps:Array.from({length:t},(e,n)=>({on:n===0,accent:n===0,velocity:1}))}}function ul(t,e){const n=t.tracks.find(c=>c.voice==="ride"),a=t.tracks.find(c=>c.voice==="crash");if(!n&&!a)return t;const s=n?zn("ride",n.params,e):null,o=a?zn("crash",a.params,e):null,r=n!==void 0&&e()<Yr,l=r?us(ds,e):j(),u=a!==void 0&&e()<Xr;return{...t,tracks:t.tracks.map(c=>c.voice==="ride"&&s?{...c,params:s,steps:fs(l,c.length)}:c.voice==="crash"&&o?u?{...c,params:o,...gs(64)}:{...c,params:o,steps:Ut(j(),c.length,()=>!1)}:c.voice==="hat"&&r?{...c,steps:Ut(j(),c.length,()=>!1)}:c)}}function pl(t,e=Math.random){const n=[];let a=null;for(let o=0;o<re;o+=1){const r=la(cl(t,e));n.push(r),o===0&&(a=r)}const s=a?{...t,bpm:t.bpm,swing:a.swing,fx:structuredClone(a.fx),tracks:structuredClone(a.tracks)}:t;return{bank:{slots:n,active:0},document:s}}function J(t){return`${Math.round(t*100)}%`}function Ga(t){return J(t)}function hl(t,e){return t==="tune"?`${Math.round(e)} Hz`:J(e)}function ml(t){return t.charAt(0).toUpperCase()+t.slice(1)}function Wa(t){return`${Math.round(t*1e3)} ms`}const fl={tune:{label:"Shell",min:3e3,max:12e3,step:10,text:t=>`${Math.round(t)} Hz`},decay:{label:"Length",min:.006,max:.06,step:.001,text:Wa},tone:{label:"Bright",min:0,max:1,step:.01,text:J},snap:{label:"Beads",min:0,max:1,step:.01,text:J},drive:{label:"Attack",min:0,max:1,step:.01,text:t=>Wa(ja+(xr-ja)*t)},level:{label:"Level",min:0,max:1,step:.01,text:J}};function Ka(t){const e=t==="ride";return{tune:{label:"Tone",min:e?3e3:3500,max:e?8e3:12e3,step:10,text:n=>`${(n/1e3).toFixed(1)} kHz`},decay:{label:"Decay",min:.5,max:e?8:11,step:.01,text:n=>`${n.toFixed(1)} s`},tone:{label:"Wash",min:0,max:1,step:.01,text:J},snap:{label:"Hit",min:0,max:1,step:.01,text:J},drive:{label:"Drive",min:0,max:1,step:.01,text:J},level:{label:"Level",min:0,max:1,step:.01,text:J}}}const gl={ride:Ka("ride"),crash:Ka("crash")};function bl(t){return t==="shaker"||t==="ride"||t==="crash"}function yl(t,e){return t==="shaker"?fl[e]:t==="ride"||t==="crash"?gl[t][e]:{label:ml(e),min:e==="tune"?20:0,max:e==="tune"?800:1,step:e==="tune"?1:.01,text:n=>hl(e,n)}}const Oe=3,bs=64;function ys(t,e){const{version:n,...a}=t,s={...a,version:Oe,slots:Array.from({length:re},(o,r)=>{const l=e.slots[r];return l?{...l,seed:(l.seed??0)>>>0}:null}),active:e.active};return JSON.stringify(s)}function Va(t){return Array.isArray(t)&&t.length<=bs}function ws(t){if(El(t)>vl)return{ok:!1,errors:["File exceeds the byte cap"]};let e;try{e=JSON.parse(t)}catch{return{ok:!1,errors:["Not a Rhythm file (invalid JSON)"]}}if(!e||typeof e!="object")return{ok:!1,errors:["Not a Rhythm file"]};const n=e;if(n.format!==en)return{ok:!1,errors:["Not a Rhythm file"]};if(typeof n.version=="number"&&Number.isInteger(n.version)&&n.version>Oe)return{ok:!1,errors:[`${ks} (file version ${n.version})`]};if(n.version!==1&&n.version!==2&&n.version!==Oe)return{ok:!1,errors:[`Unsupported version ${String(n.version)}`]};const a=n.version,{slots:s,active:o,...r}=n,l=s===void 0&&(a===1||a===2),c=mt({...r,version:l?a:a===Oe?Ke:1});if(!c.ok||!c.document)return{ok:!1,errors:c.errors};const d=c.document,p=[];for(const g of d.tracks)Va(g.steps)||p.push(`More than ${bs} steps on ${g.id}`);const f={slots:Array.from({length:re},()=>null),active:null};return!l&&a>=2&&(!Array.isArray(s)||s.length!==re?p.push(`Expected ${re} slots`):s.forEach((g,w)=>{if(g==null)return;const b=Ss(d,a===Oe?g:{...g,engine:void 0,deep:void 0});if(!b||!b.tracks.every(m=>Va(m.steps))){p.push(`Slot ${w+1} is malformed`);return}const h=typeof g.seed=="number"&&Number.isFinite(g.seed)?g.seed>>>0:0;f.slots[w]={...b,seed:h}}),o!=null&&(!Number.isInteger(o)||o<0||o>=re||!f.slots[o]?p.push("Active slot is empty or out of range"):f.active=o)),p.length>0?{ok:!1,errors:p}:{ok:!0,errors:[],document:d,bank:f,from:l?1:a}}const Ya={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}},Xa=(t,e)=>{const n=t&&typeof t=="object"?t:{},a={...e.dials};for(const[s,o]of Object.entries(n.dials??{}))s in e.dials&&typeof o=="number"&&Number.isFinite(o)&&(a[s]=o);return{on:typeof n.on=="boolean"?n.on:e.on,dials:a}};function ht(t){const e=t.hacks??{};return{filter:typeof e.filter=="boolean"?e.filter:!0,drive:Xa(e.drive,Ya.drive),compressor:Xa(e.compressor,Ya.compressor)}}function vs(t){const e=Math.max(0,Math.min(1,t));return Math.min(2e4,40*2**(e*10))}const St=t=>Math.max(0,Math.min(100,t));function wl(t){const e=vs(t.cutoff),n=St(Math.max(0,Math.min(1,t.resonance))*100);return t.mode==="hp"?{type:"highpass",dials:{cutoff:e<=20?0:St(100*Math.log(e/20)/Math.log(100)),q:n}}:t.mode==="bp"?{type:"bandpass",dials:{centre_hz:St(100*Math.log(Math.max(100,e)/100)/Math.log(80)),q:n,mix:100}}:{type:"lowpass",dials:{cutoff:t.cutoff>=.999?0:St(100*Math.log(e/2e4)/Math.log(150/2e4))}}}const en="netcomposer.rhythm",Ke=2,ks="Saved by a newer Rhythm, so it can't be opened here",_t="Saved by an older Rhythm (no Shaker lane), so it can't be opened",vl=256*1024,xs="netcomposer.rhythm.preset.",kl=new Set(ts),Ja=["kick","snare","clap","rim","hat","hatOpen","ride","crash","tom","metal","shaker"],$s=["ride","crash"],xl=ts.filter(t=>!$s.includes(t)),$l={kick:"Kick",snare:"Snare",clap:"Clap",rim:"Rim",hat:"Hat",hatOpen:"Open",ride:"Ride",crash:"Crash",tom:"Tom",metal:"Metal",shaker:"Shaker"};function Es(t){return`${xs}${t}`}function El(t){let e=0;for(const n of t){const a=n.codePointAt(0)??0;a<=127?e+=1:a<=2047?e+=2:a<=65535?e+=3:e+=4}return e}function mt(t){const e=[];if(!t||typeof t!="object")return{ok:!1,errors:["Document is not an object"]};const n=t;n.format!==en&&e.push("Unknown format");const a=n.version;if(typeof a=="number"&&Number.isInteger(a)&&a>Ke)return{ok:!1,errors:[ks]};if(a!==1&&a!==Ke&&e.push("Unsupported version"),(typeof n.id!="string"||!n.id.startsWith(xs))&&e.push("Preset id is outside the rhythm namespace"),(typeof n.name!="string"||n.name.length===0)&&e.push("Missing name"),(typeof n.bpm!="number"||!Number.isFinite(n.bpm)||n.bpm<=0)&&e.push("Invalid tempo"),(typeof n.swing!="number"||n.swing<.5||n.swing>.75)&&e.push("Swing is outside 0.5 to 0.75"),(!n.meter||n.meter.beatsPerBar<=0||n.meter.beatUnit<=0)&&e.push("Invalid meter"),(!n.fx||n.fx.mode!=="lp"&&n.fx.mode!=="hp"&&n.fx.mode!=="bp")&&e.push("Invalid filter"),!Array.isArray(n.tracks)||n.tracks.length===0||n.tracks.length>16)e.push("Expected 1 to 16 tracks");else for(const o of n.tracks)kl.has(o.voice)||e.push(`Unknown voice ${o.voice}`),(!Number.isInteger(o.length)||o.length<1||o.length>64)&&e.push(`Bad length on ${o.id}`),(!Array.isArray(o.steps)||o.steps.length<o.length)&&e.push(`Steps shorter than length on ${o.id}`);if(e.length>0)return{ok:!1,errors:e};const s=n.tracks;return xl.some(o=>!s.some(r=>r.voice===o))?{ok:!1,errors:[_t]}:{ok:!0,errors:[],document:Sl(n,a===1)}}function Ss(t,e){if(!e||typeof e!="object")return null;const n=e,a=n.engine===void 0,s=mt({...t,version:a?1:Ke,swing:n.swing,fx:n.fx,tracks:n.tracks,engine:n.engine,deep:n.deep});if(!s.ok||!s.document)return null;const o=s.document;return{swing:o.swing,fx:o.fx,tracks:o.tracks,engine:o.engine,deep:o.deep,...typeof n.seed=="number"?{seed:n.seed}:{}}}function Sl(t,e){const n=e?ra():_r(t.deep),a=t.tracks.map(s=>({...s,deep:e?Je(n.kit,s.voice,n.version):Dr(s.deep,n.kit,s.voice,n.version)}));return{...t,version:Ke,engine:e?"classic":zr(t.engine),deep:n,tracks:Tl(a,n)}}function Al(t,e){return{id:t,name:$l[t],voice:t,length:16,mute:!1,solo:!1,steps:ca([]),params:{...As[t]},deep:Je(e.kit,t,e.version)}}function Tl(t,e){let n=t;for(const a of $s){if(n.some(o=>o.voice===a)||n.length>=16)continue;let s=0;for(let o=Ja.indexOf(a)-1;o>=0;o--){const r=n.findIndex(l=>l.voice===Ja[o]);if(r>=0){s=r+1;break}}n=[...n.slice(0,s),Al(a,e),...n.slice(s)]}return n}function Ml(t,e,n){const a=t[n]?.voice,s=a===void 0?-1:e.findIndex(o=>o.voice===a);return s>=0?s:0}function ca(t,e=[]){return Array.from({length:16},(n,a)=>({on:t.includes(a),accent:e.includes(a),velocity:e.includes(a)?1:.8}))}const As={kick:{tune:55,decay:.4,tone:.4,snap:.5,drive:.2,level:.8},tom:{tune:90,decay:.35,tone:.4,snap:.4,drive:.15,level:.7},snare:{tune:180,decay:.2,tone:.5,snap:.6,drive:.15,level:.55},clap:{tune:180,decay:.2,tone:.55,snap:.7,drive:.1,level:.45},rim:{tune:400,decay:.08,tone:.6,snap:.8,drive:.05,level:.4},hat:{tune:320,decay:.05,tone:.7,snap:.4,drive:.1,level:.35},hatOpen:{tune:300,decay:.18,tone:.65,snap:.35,drive:.08,level:.32},metal:{tune:240,decay:.18,tone:.6,snap:.7,drive:.2,level:.4},shaker:{...$r.shaker},ride:{...Ha.ride},crash:{...Ha.crash}};function Ts(){const t=[{voice:"kick",name:"Kick",on:[0,4,8,12],accent:[0]},{voice:"snare",name:"Snare",on:[4,12],accent:[4]},{voice:"clap",name:"Clap",on:[4,12]},{voice:"rim",name:"Rim",on:[6,14]},{voice:"hat",name:"Hat",on:[0,2,4,6,8,10,12,14]},{voice:"hatOpen",name:"Open",on:[2,10]},{voice:"ride",name:"Ride",on:[]},{voice:"crash",name:"Crash",on:[]},{voice:"tom",name:"Tom",on:[14]},{voice:"metal",name:"Metal",on:[10]},{voice:"shaker",name:"Shaker",on:[]}];return{format:en,version:Ke,id:Es("default"),name:"Default",bpm:120,swing:.5,meter:{beatsPerBar:4,beatUnit:4},fx:{mode:"lp",cutoff:.72,resonance:.15,drive:.08},engine:"classic",deep:ra(),tracks:t.map(e=>({id:e.voice,name:e.name,voice:e.voice,length:16,mute:!1,solo:!1,steps:ca(e.on,e.accent),params:{...As[e.voice]},deep:Je("808",e.voice)}))}}function Ll(){const t=Ts();return{...t,id:Es("untitled"),name:"Untitled",tracks:t.tracks.map(e=>({...e,steps:ca([])}))}}const Cl="Tap to join",Ms="Tap to join the playing beat";function Dt(t,e){return t&&e?"join":e?"stop":"play"}function Ls(t){return t==="join"?Cl:t==="stop"?"Stop":"Play"}function Nl(t,e,n={}){const a=n.beatsPerBar??4,s=(n.leadSeconds??.15)*e/60;return Math.max(0,Math.ceil((t+s)/a-1e-9)*a)}class Fl{constructor(e={}){this.options=e}joining=!1;joinedBy=!1;entry=null;shown="play";mode(e,n){return this.shown=Dt(e,n),this.shown}gesture(e,n,a=!1){return this.joinedBy=!1,a||this.joining||Dt(e,n)!=="join"?!1:(this.joining=!0,this.joinedBy=!0,!0)}swallowClick(e,n){const a=this.joinedBy||this.joining||Dt(e,n)==="join";return this.joinedBy=!1,a}get pending(){return this.joining}enter(e,n){return this.joining=!1,this.entry=Nl(e,n,this.options),this.entry}cancel(){this.joining=!1}toJSON(){return{mode:this.shown,joining:this.joining,gesture:this.joinedBy,entryBeat:this.entry}}}class zl{constructor(e=n=>JSON.stringify(n)){this.key=e}value;has=!1;lastKey;listeners=new Set;set(e,n=!1){const a=this.key(e);if(this.value=e,this.has=!0,!n&&a===this.lastKey)return!1;this.lastKey=a;for(const s of this.listeners)s(e);return!0}get current(){return this.value}subscribe(e){return this.listeners.add(e),this.has&&e(this.value),()=>{this.listeners.delete(e)}}get size(){return this.listeners.size}}class da{queued=null;held=null;seq=0;taken=0;get pending(){return this.held}get lastTaken(){return this.taken}tap(e,n){return!n||this.queued===e?(this.queued=null,this.drop(),{kind:"now",index:e}):(this.queued=e,{kind:"queue",index:e})}recall(e,n,a,s={}){const o=s.id??this.seq+1;this.seq=Math.max(this.seq,o);const r=s.atBeat??Cs(n,s.beatsPerBar);return this.held={id:o,slot:e,atBeat:r,payload:a},this.queued=e,this.held}due(e){const n=this.held;return!n||e<n.atBeat?null:this.finish(n)}takeHeld(e){const n=this.held;return!n||n.id!==e?null:this.finish(n)}drop(){const e=this.held;return e?(this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e):null}spent(e){return e<=this.taken}live(e){return e<this.taken?!1:(this.held&&e>=this.held.id&&this.drop(),!0)}hold(e){this.queued=e}take(){const e=this.queued;return this.queued=null,this.drop(),e}cancel(e){(e===void 0||this.queued===e)&&(this.queued=null,this.drop())}toJSON(){return{queued:this.queued,held:this.held,seq:this.seq,taken:this.taken}}static fromJSON(e){const n=new da;return n.queued=e.queued,n.held=e.held,n.seq=e.seq,n.taken=e.taken,n}finish(e){return this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e}}function Cs(t,e=4){return t<0?0:(Math.floor(t/e+1e-9)+1)*e}class Pl{constructor(e){this.options=e}taps=[];tap(e){const{window:n=4,resetMs:a=2e3,jump:s=.4}=this.options,o=this.taps[this.taps.length-1];if(o===void 0||e-o>a||e<=o)return this.taps=[e],null;const r=e-o,l=this.meanInterval();l!==null&&Math.abs(r-l)>l*s&&(this.taps=[o]),this.taps.push(e),this.taps.length>n+1&&this.taps.splice(0,this.taps.length-n-1);const u=this.meanInterval();return u===null?null:Math.min(this.options.max,Math.max(this.options.min,Math.round(6e4/u)))}get count(){return this.taps.length}reset(){this.taps=[]}meanInterval(){if(this.taps.length<2)return null;const e=this.taps[0];return(this.taps[this.taps.length-1]-e)/(this.taps.length-1)}}const Ns=globalThis,_l="linkslots",Dl=new Set(["0","false","off","no"]);function Il(t,e=Ns.location?.search??"",n=Ol()){const a=new URLSearchParams(e).get(_l);if(a!==null)return!Dl.has(a.trim().toLowerCase());try{return n?.getItem(t)==="1"}catch{return!1}}function Rl(t,e,n){return n||e===t}function Ol(){try{return Ns.localStorage??null}catch{return null}}function Bl(t){return Number.isFinite(t)?Math.min(.75,Math.max(.5,t)):.5}function Hl(t,e){const n=Math.floor(t/2),a=Bl(e);return n*.5+(t%2===0?0:a*.5)}function jl(t,e){let n=(Math.imul(t+1,2654435761)^Math.imul(e|0,2246822519))>>>0;return n=Math.imul(n^n>>>16,2146121005),n=Math.imul(n^n>>>15,2221713035),n^=n>>>16,(n>>>0)/4294967296}function ql(t,e,n,a){const s=[];if(!(a>n))return s;let o=!1;for(const u of t)u.solo&&(o=!0);const r=Math.max(0,Math.floor(n*4)-2),l=Math.ceil(a*4)+2;for(let u=r;u<=l;u++){const c=Hl(u,e);if(!(c<n||c>=a))for(let d=0;d<t.length;d++){const p=t[d];if(p.mute||o&&!p.solo)continue;const f=Math.max(1,p.length),g=p.steps[(u%f+f)%f];if(!g?.on)continue;const w=g.probability;w!==void 0&&w<1&&jl(d,u)>=w||s.push({beat:c,step:u,voice:p.voice,velocity:g.velocity,accent:g.accent})}}return s}const Ul="nc-ui",Fs={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"},breakpoint:{md:"768px"}},ua={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Gt={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Gl={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},ye={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Wl={light:{color:Fs.color,semantic:ua,component:Gt,runtime:Gl},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},it=t=>`--${Ul}-${t}`,Pn=ua["label-on-fill-dark"],Qa=ua["label-on-fill-light"],Kl=ye["label-min-contrast"],Vl=/^#[0-9a-f]{6}$/i,Yl=t=>typeof t=="string"&&Vl.test(t),It=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function Za(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));const a=e*Math.min(n,1-n),s=o=>{const r=(o+t/30)%12;return n-a*Math.max(-1,Math.min(r-3,9-r,1))};return`#${It(s(0)*255)}${It(s(8)*255)}${It(s(4)*255)}`}function zs(t){const[e,n,a]=[1,3,5].map(d=>parseInt(t.slice(d,d+2),16)/255),s=Math.max(e,n,a),o=Math.min(e,n,a),r=(s+o)/2,l=s-o;if(!l)return{h:0,s:0,l:r};const u=l/(1-Math.abs(2*r-1));return{h:((s===e?60*((n-a)/l%6):s===n?60*((a-e)/l+2):60*((e-n)/l+4))+360)%360,s:u,l:r}}function ei(t){const[e,n,a]=[1,3,5].map(s=>{const o=parseInt(t.slice(s,s+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*a}function _n(t,e){const[n,a]=[ei(t),ei(e)].sort((s,o)=>o-s);return(n+.05)/(a+.05)}const Wt=t=>_n(t,Pn)>=_n(t,Qa)?Pn:Qa;function Ps(t,e,n,a=Kl){let s=Za(t,e,n);const o=Wt(s)===Pn?1:-1;for(let r=0;r<40&&_n(s,Wt(s))<a;r++)n+=o*.01,s=Za(t,e,n);return s}function Xl(t){const{h:e,s:n}=zs(t),a=Ps(e,Math.min(n,ye["surprise-on-max-saturation"]),ye["surprise-on-lightness"]);return{fill:t,ink:Wt(t),on:a,onInk:Wt(a)}}const Jl=(t,e)=>{const n=Math.abs(t-e)%360;return Math.min(n,360-n)};function Ql(t,e=Math.random){const[n,a]=ye["surprise-saturation"],[s,o]=ye["surprise-lightness"],r=ye["surprise-min-hue-gap"],l=Yl(t)?zs(t).h:null;let u=e()*360;return l!==null&&Jl(u,l)<r&&(u=(l+r+e()*(360-2*r))%360),Ps(u,n+e()*(a-n),s+e()*(o-s))}function Zl(t){if(!t)return null;const e=Xl(t);return{[it("surprise-fill")]:e.fill,[it("surprise-ink")]:e.ink,[it("surprise-on")]:e.on,[it("surprise-on-ink")]:e.onInk}}const ec=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,tc=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function ti(t){const[e,n,a]=[1,3,5].map(l=>ec(parseInt(t.slice(l,l+2),16)/255)),s=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*a),o=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*a),r=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*a);return[.2104542553*s+.793617785*o-.0040720468*r,1.9779984951*s-2.428592205*o+.4505937099*r,.0259040371*s+.7827717662*o-.808675766*r]}function nc([t,e,n]){const a=(t+.3963377774*e+.2158037573*n)**3,s=(t-.1055613458*e-.0638541728*n)**3,o=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*s+.2309699292*o,-1.2684380046*a+2.6097574011*s-.3413193965*o,-.0041960863*a-.7034186147*s+1.707614701*o].map(l=>It(tc(Math.max(0,Math.min(1,l)))*255)).join("")}`.toUpperCase()}const ac=ye["velocity-range"],_s={min:Gt.rhythm["velocity-min"],max:Gt.rhythm["velocity-max"]},ni=Object.fromEntries(Object.entries(Wl).map(([t,e])=>[t,{min:e.component.rhythm["velocity-min"],max:e.component.rhythm["velocity-max"],ink:e.component.rhythm["step-cell-ink"]}]));function ic(t,e=_s){const[n,a]=ac,s=Number.isFinite(t)?Math.max(n,Math.min(a,t)):n,o=(s-n)/(a-n),r=e.ink??Gt.rhythm["step-cell-ink"];if(o<=0)return{velocity:s,t:0,fill:e.min.toUpperCase(),ink:r};if(o>=1)return{velocity:s,t:1,fill:e.max.toUpperCase(),ink:r};const l=ti(e.min),u=ti(e.max);return{velocity:s,t:o,fill:nc(l.map((c,d)=>c+(u[d]-c)*o)),ink:r}}function ai(t,e=_s){return{[it("velocity-fill")]:ic(t,e).fill}}const Ds="data-nc-theme",ii="nc-ui-theme-change",sc="(prefers-color-scheme: dark)",Is=t=>t?.documentElement??null,Rs=t=>t?.defaultView?.matchMedia?.(sc)??null,oc=t=>t==="light"||t==="dark"?t:"system";function rc(t=globalThis.document){return oc(Is(t)?.getAttribute(Ds))}function Dn(t=globalThis.document){const e=rc(t);return e!=="system"?e:Rs(t)?.matches?"dark":"light"}function Os(t,e=globalThis.document){const n=Is(e);if(!n)return()=>{};let a=Dn(e);const s=()=>{const u=Dn(e);u!==a&&(a=u,t(u))},o=e.defaultView?.MutationObserver,r=o?new o(s):null;r?.observe(n,{attributes:!0,attributeFilter:[Ds]});const l=Rs(e);return l?.addEventListener?.("change",s),e.addEventListener(ii,s),()=>{r?.disconnect(),l?.removeEventListener?.("change",s),e.removeEventListener(ii,s)}}const lc=[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}],cc={renames:lc},dc={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},uc={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},pc={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},tn={};for(const[t,e]of Object.entries(dc))tn[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(const[t,e]of Object.entries(pc))tn[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(const[t,e]of Object.entries(uc))tn[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map(cc.renames.map(t=>[t.old,t.new]));function Bs(t){const e=tn[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function D(t){return Bs(t).prop}function i(t){return`var(${D(t)})`}function hc(t,e){if(!(t instanceof Element))return 0;const n=Number.parseFloat(getComputedStyle(t).getPropertyValue(D(e)));return Number.isFinite(n)?n:0}function q(t,e){const n=Bs(e),a=t.ownerDocument??document,s=a.createElement("span");s.dataset.ncLive=e,s.style.position="absolute",s.style.pointerEvents="none";const o=`var(${n.prop})`;n.kind==="family"?s.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?s.style.paddingLeft=o:s.style.color=o,(t instanceof Element?t:a.documentElement).append(s);const u=(a.defaultView??window).getComputedStyle(s),c=n.kind==="family"?u.fontFamily:n.kind==="color"?u.color:u.paddingLeft;return s.remove(),c}function mc(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function fc(t){const e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=i("font-ui"),n.style.fontSize=i("label-size"),n.style.fontWeight=i("label-weight"),(t instanceof Element?t:e.documentElement).append(n);const s=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),s}const gc="[data-modulated], [data-modulated] *";function bc(){const t=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${D("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${D("divider")}: ${i(`module-div-stack-${a}`)};
      ${D("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,e=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${D("text-sub")}: ${i("module-sub-stack-1")};
      ${D("divider")}: ${i("module-div-stack-1")};
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
${gc} { transition: none; }
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
  ${D("text-sub")}: ${i("module-sub-stack-1")};
  ${D("divider")}: ${i("module-div-stack-1")};
  ${D("slider-track")}: ${i("module-div-stack-1")};
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
  ${D("text-sub")}: ${i("module-sub-stack-1")};
  ${D("divider")}: ${i("module-div-stack-1")};
  ${D("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${i("control-gap")} ${i("module-pad")};
  padding-bottom: ${i("module-pad")};
  background: ${i("module-bg-stack-1")};
  ${D("text-sub")}: ${i("module-sub-stack-1")};
  ${D("divider")}: ${i("module-div-stack-1")};
  ${D("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${D("text-sub")}: inherit;
  ${D("divider")}: inherit;
  ${D("slider-track")}: inherit;
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
  .nc-meter, .nc-meter-fill, .nc-step[data-playhead="true"], .nc-fader-cap, .nc-meter-clip, .nc-ui-fx, .nc-ui-fx-fold, .nc-strip, .nc-fold-tri {
    transition: none;
    animation: none;
  }
  .nc-snap[data-queued="true"][data-pulse="true"] {
    outline-color: ${i("accent-faint")};
    background: transparent;
    box-shadow: inset 0 calc(-1 * ${i("focus-width")} * 2) 0 ${i("accent-faint")};
  }
}
`}let bn=null;const yc="nc-ui-fallback";function Hs(t=globalThis.document){if(!t?.documentElement||(t.documentElement,bn&&bn.ownerDocument===t))return;const e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${yc} {
${bc()}
}
`,t.head.append(e),bn=e}function js(t={}){const e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);const a=e.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");const s=e.createElement("span");s.dataset.ncOn="",s.textContent=t.onText??"On";const o=e.createElement("span");o.dataset.ncOff="",o.textContent=t.offText??"Off",a.append(s,o),n.append(a);let r=!1;const l=c=>{r=c===!0,n.setAttribute("aria-checked",r?"true":"false")};l(t.checked);const u=()=>{l(!r),t.onChange?.(r)};return n.addEventListener("click",u),{el:n,get checked(){return r},set:l,destroy(){n.removeEventListener("click",u),n.remove()}}}const qs=new WeakMap,si=.25;function wc(t){const e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");const a=e.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");const s=e.createElement("span");s.className="nc-fader-cap",s.setAttribute("aria-hidden","true"),n.append(a,s);let o=0,r=t.step??.005,l=t.onChange,u=t.onReset;const c=h=>Math.min(1,Math.max(0,h)),d=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},p=h=>{const m=c(h);m!==o&&(o=m,d(),l?.(m))};let f=0,g=!1;n.addEventListener("pointerdown",h=>{if(h.button!==0)return;h.preventDefault(),n.focus?.({preventScroll:!0});const m=n.getBoundingClientRect();h.target!==s&&m.height>0&&p(1-(h.clientY-m.top)/m.height),f=h.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(h.pointerId)}),n.addEventListener("pointermove",h=>{if(!g)return;const m=n.getBoundingClientRect().height||1,y=(f-h.clientY)/m*(h.shiftKey?si:1);f=h.clientY,p(o+y)});const w=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",w),n.addEventListener("pointercancel",w),n.addEventListener("lostpointercapture",w),n.addEventListener("dblclick",h=>{h.preventDefault(),u?.()}),n.addEventListener("keydown",h=>{const m=h.shiftKey?r*si:r,y={ArrowUp:o+m,ArrowRight:o+m,ArrowDown:o-m,ArrowLeft:o-m,PageUp:o+r*10,PageDown:o-r*10,Home:0,End:1};h.key in y&&(h.preventDefault(),p(y[h.key]))});const b={el:n,get value(){return o},get dragging(){return g},set(h){g||(o=c(Number(h)||0),d())},setText(h){h?n.setAttribute("aria-valuetext",h):n.removeAttribute("aria-valuetext")},setLabel(h){n.setAttribute("aria-label",h)},configure(h){typeof h.step=="number"&&h.step>0&&(r=h.step),h.onChange&&(l=h.onChange),h.onReset&&(u=h.onReset)}};return b.setLabel(t.label),b.set(t.value??0),b.setText(t.valueText),qs.set(n,b),b}function vc(t){return qs.get(t)}const Us=new WeakMap,kc=.2,xc=1.5,$c=.5;function Ec(t,e){const n=String(t??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:e}function oi(t,e,n){const a=t.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Ec(a.getComputedStyle(t).getPropertyValue(D(e)),n)}function Sc(t){const e=t.doc??globalThis.document,n=t.channels===2?2:1,a=e.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);const s=e.createElement("button");s.type="button",s.className="nc-meter-clip",s.dataset.lit="false";const o=e.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");const r=[];for(let b=0;b<n;b++){const h=e.createElement("span");h.className="nc-meter-bar";const m=e.createElement("span");m.className="nc-meter-peak";const y=e.createElement("span");y.className="nc-meter-rms";const k=e.createElement("span");k.className="nc-meter-hold",h.append(m,y,k),o.append(h),r.push({peak:m,rms:y,hold:k,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(s,o);let l=t.label,u=t.onClear,c=!1,d=-1,p=-1;const f=()=>{s.dataset.lit=c?"true":"false",s.setAttribute("aria-pressed",c?"true":"false"),s.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),s.title=c?"Clipped. Click to clear":"Clip light"},g=(b,h,m,y)=>{const k=Math.round(y*1e3)/1e3;m[h]!==k&&(m[h]=k,b.style.transform=h==="hold"?`translateY(${Math.round((1-k)*1e3)/10}%)`:`scaleY(${k})`)};s.addEventListener("click",()=>{w.clear(),u?.()});const w={el:a,get clipped(){return c},update(b,h){d<0&&(d=oi(a,"motion-meter-fall",kc)),p<0&&(p=oi(a,"motion-meter-hold",xc));const m=Math.max(0,Math.min(.25,Number(h)||0)),y=d>0?Math.exp(-m/d):0;r.forEach((k,E)=>{const x=b[E]??b[0]??{peak:0,rms:0},S=Math.min(1,Math.max(0,Number(x.peak)||0)),$=Math.min(S,Math.max(0,Number(x.rms)||0));x.over&&w.clip(),k.level.peak=S>=k.level.peak?S:S+(k.level.peak-S)*y,k.level.rms=$>=k.level.rms?$:$+(k.level.rms-$)*y,k.holdAge+=m,S>=k.holdAt?(k.holdAt=S,k.holdAge=0):k.holdAge>p&&(k.holdAt=Math.max(S,k.holdAt-$c*m)),g(k.peak,"peak",k.shown,k.level.peak),g(k.rms,"rms",k.shown,k.level.rms),g(k.hold,"hold",k.shown,k.holdAt),k.hold.dataset.off=k.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,f())},clear(){c=!1,f()},reset(){for(const b of r)b.level.peak=0,b.level.rms=0,b.holdAt=0,b.holdAge=0,g(b.peak,"peak",b.shown,0),g(b.rms,"rms",b.shown,0),g(b.hold,"hold",b.shown,0),b.hold.dataset.off="true"},setLabel(b){l=b,f()},configure(b){b.onClear&&(u=b.onClear)}};return f(),w.reset(),Us.set(a,w),w}function Ac(t){return t?Us.get(t):void 0}function Tc(t){const e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),a=t.ownerDocument.defaultView?.devicePixelRatio||1,s=Math.max(1,Math.floor(e*a)),o=Math.max(1,Math.floor(n*a));(t.width!==s||t.height!==o)&&(t.width=s,t.height=o);const r=t.getContext("2d");return r?.setTransform(a,0,0,a,0,0),{ctx:r,w:e,h:n}}function fe(t){return Math.max(0,Math.min(1,t))}function Gs(t,e){const{ctx:n,w:a,h:s}=Tc(t);if(!n)return;n.clearRect(0,0,a,s);const o=fc(t);if(e.paint==="swatch"){const u=q(t,"accent"),c=q(t,"rhythm.step-cell-on");t.dataset.ncAccent=u,t.dataset.ncStep=c,n.fillStyle=u,n.fillRect(0,0,a/2,s),n.fillStyle=c,n.fillRect(a/2,0,a/2,s);return}if(e.paint==="filter"){const u=e.mode??"lp",c=q(t,mc(u)),d=q(t,"divider"),p=fe(e.cutoff??.5),f=.08+(1-fe(e.resonance??.2))*.22;n.strokeStyle=d,n.beginPath(),n.moveTo(0,s*.72),n.lineTo(a,s*.72),n.stroke(),n.beginPath();for(let g=0;g<=a;g++){const w=g/Math.max(1,a);let b=0;u==="lp"?b=w<p?1:Math.max(0,1-(w-p)/f):u==="hp"?b=w>p?1:Math.max(0,1-(p-w)/f):b=Math.max(0,1-Math.abs(w-p)/f);const h=s*.78-b*s*.62;g===0?n.moveTo(g,h):n.lineTo(g,h)}n.strokeStyle=c,n.stroke(),n.fillStyle=q(t,"text-sub"),n.font=o,n.fillText(u.toUpperCase(),0,s),t.dataset.ncAccent=c;return}if(e.paint==="envelope"){n.strokeStyle=q(t,"accent"),n.beginPath();const u=Math.max(.05,e.decay??.4);for(let c=0;c<=a;c++){const d=c/Math.max(1,a),p=(s-4)*(1-Math.exp(-d*4/u));n.lineTo(c,s-p)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="waveform"){const u=Array.isArray(e.peaks)?e.peaks:[],[c,d]=Array.isArray(e.region)?e.region:[0,1],p=q(t,"accent"),f=q(t,"text-sub"),g=s/2;n.fillStyle=q(t,"accent-soft"),n.fillRect(fe(c)*a,0,(fe(d)-fe(c))*a,s),n.strokeStyle=q(t,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(a,g),n.stroke();const w=Math.floor(u.length/2);for(let b=0;b<w;b++){const h=(b+.5)/w*a,m=Math.max(-1,Math.min(1,u[b*2]??0)),y=Math.max(-1,Math.min(1,u[b*2+1]??0)),k=(b+.5)/w;n.strokeStyle=k>=c&&k<=d?p:f,n.beginPath(),n.moveTo(h,g-y*(g-1)),n.lineTo(h,g-m*(g-1)+.5),n.stroke()}n.strokeStyle=p;for(const b of[c,d,...Array.isArray(e.markers)?e.markers:[]]){const h=Math.round(fe(b)*(a-1))+.5;n.beginPath(),n.moveTo(h,0),n.lineTo(h,s),n.stroke()}typeof e.position=="number"&&e.position>=0&&(n.fillStyle=q(t,"text"),n.fillRect(Math.round(fe(e.position)*(a-1)),0,1,s)),w||(n.fillStyle=f,n.font=o,n.fillText(e.empty??"Empty",0,g+4)),t.dataset.ncAccent=p;return}if(e.paint==="meter"){const u=fe(e.level??0);n.fillStyle=q(t,"divider"),n.fillRect(0,s*.4,a,s*.2),n.fillStyle=q(t,"accent"),n.fillRect(0,s*.4,a*u,s*.2),t.dataset.ncAccent=n.fillStyle;return}const r=Math.max(1,e.steps??16),l=((e.step??0)%r+r)%r;n.fillStyle=q(t,"rhythm.step-cell-off"),n.fillRect(0,s*.45,a,s*.1),n.fillStyle=q(t,"rhythm.playhead"),n.fillRect(l/r*a,s*.3,Math.max(1,a/r),s*.4),t.dataset.ncAccent=q(t,"accent")}const Ws={slop:8,longPressMs:500,pitchPx:16};class Mc{constructor(e,n,a=Ws){this.hit=e,this.emit=n,this.config=a,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,n,a,s){if(this.phase!=="idle")return!1;const o=this.hit(n,a);return o<0?!1:(this.phase="pending",this.pointer=e,this.pad=o,this.x0=n,this.y0=a,this.t0=s,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,n,a,s){if(e!==this.pointer)return;const o=n-this.x0,r=a-this.y0;if(this.phase==="pending"){if(this.tick(s),this.phase!=="pending"||Math.hypot(o,r)<this.config.slop)return;Math.abs(r)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){const l=Math.trunc(-r/this.config.pitchPx);l!==this.degrees&&(this.degrees=l,this.emit({kind:"pitch",pad:this.pad,degrees:l,phase:"move"}))}else if(this.phase==="paint"){const l=this.hit(n,a);l>=0&&l!==this.lastPad&&(this.lastPad=l,this.emit({kind:"paint",pad:l,phase:"enter"}))}}up(e,n,a,s){e===this.pointer&&(this.phase==="pending"&&this.move(e,n,a,s),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}}function Lc(t,e,n,a=Ws){let s=!1,o=0;const r=(c,d)=>{const f=t.ownerDocument.elementFromPoint?.(c,d),g=[...t.querySelectorAll(e)],w=f?g.findIndex(m=>m===f||m.contains(f)):-1;if(w>=0)return w;let b=-1,h=Number.POSITIVE_INFINITY;return g.forEach((m,y)=>{if(m.hidden)return;const k=m.getBoundingClientRect();if(d<k.top||d>k.bottom)return;const E=Math.abs(c-(k.left+k.width/2));E<h&&E<=k.width&&(b=y,h=E)}),b},l=new Mc(r,c=>{(c.kind==="paint"||c.kind==="long")&&(s=!0),n(c)},a),u=()=>{o&&clearTimeout(o),o=0};return t.addEventListener("pointerdown",c=>{c.button>0||(s=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(u(),o=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),t.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&u())}),t.addEventListener("pointerup",c=>{u(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),t.addEventListener("pointercancel",c=>{u(),l.cancel(c.pointerId)}),t.addEventListener("click",c=>{s&&(s=!1,c.stopPropagation(),c.preventDefault())},!0),t.addEventListener("contextmenu",c=>c.preventDefault()),l}const Ks="netcomposer.groups.v1";function pa(){try{return globalThis.localStorage??null}catch{return null}}function Vs(t=pa(),e=Ks){try{const n=JSON.parse(t?.getItem(e)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(const[s,o]of Object.entries(n))typeof o=="boolean"&&a.set(s,o);return a}catch{return new Map}}function Cc(t,e,n,a=Ks){const s=Vs(t,a);s.set(e,n);try{t?.setItem(a,JSON.stringify(Object.fromEntries(s)))}catch{}}function Nc(t,e=pa()){return Vs(e).get(t.id)??t.open===!0}function Fc(t,e,n){const a=document.createElement("div");a.className="nc-group",a.dataset.ncId=t.id;const s=document.createElement("button");s.type="button",s.className="nc-group-toggle",s.id=`${t.id}-group-toggle`;const o=document.createElement("span");o.className="nc-group-title";const r=document.createElement("span");r.className="nc-group-summary";const l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),s.append(o,r,l);const u=document.createElement("div");u.className="nc-group-body",u.id=`${t.id}-group-body`,u.setAttribute("role","group"),u.setAttribute("aria-labelledby",s.id),s.setAttribute("aria-controls",u.id);for(const c of t.controls)u.append(n(c,e));return s.addEventListener("click",()=>{const c=a.dataset.ncOpen!=="true";Cc(pa(),t.id,c),ri(a,c);const d=e(a);d?.type==="group"&&d.onToggle?.(c)}),a.append(s,u),ri(a,Nc(t)),Ys(a,t),a}function ri(t,e){t.dataset.ncOpen=e?"true":"false";const n=t.querySelector(":scope > .nc-group-toggle"),a=t.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",e?"true":"false");const s=n?.querySelector(".nc-group-mark");s&&(s.textContent=e?"−":"+"),a instanceof HTMLElement&&(a.hidden=!e)}function Ys(t,e){const n=t.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==e.title&&(n.textContent=e.title);const a=t.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),s=e.summary??"";a&&a.textContent!==s&&(a.textContent=s)}const zc=450,At="application/x-nc-pad",li="http://www.w3.org/2000/svg",Pc=48;function _c(t){const e=Math.floor((t?.length??0)/2);if(!e)return"";const n=Math.min(Pc,e),a=[],s=[];for(let o=0;o<n;o++){const r=Math.floor(o*e/n),l=Math.max(r+1,Math.floor((o+1)*e/n));let u=0,c=0;for(let p=r;p<l;p++)u=Math.min(u,t[2*p]??0),c=Math.max(c,t[2*p+1]??0);const d=n===1?50:o/(n-1)*100;a.push(`${d.toFixed(1)} ${(10-Math.min(1,c)*10).toFixed(2)}`),s.push(`${d.toFixed(1)} ${(10-Math.max(-1,u)*10).toFixed(2)}`)}return`M${a.join("L")}L${s.reverse().join("L")}Z`}function Dc(t,e){const n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Pads");const a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(t.columns??2),t.pads.forEach((s,o)=>a.append(Ic(n,o,e))),n.append(a),n.addEventListener("keydown",s=>{s.key==="Escape"&&Rt(n)}),Js(n,t),n}function Ic(t,e,n){const a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(e);const s=document.createElement("span");s.className="nc-padgrid-pad-bar",s.setAttribute("aria-hidden","true");const o=document.createElement("span");o.className="nc-padgrid-pad-name";const r=document.createElement("span");r.className="nc-padgrid-pad-hint";const l=document.createElement("span");l.className="nc-padgrid-pad-badge";const u=document.createElementNS(li,"svg");u.setAttribute("class","nc-padgrid-pad-wave"),u.setAttribute("viewBox","0 0 100 20"),u.setAttribute("preserveAspectRatio","none"),u.setAttribute("aria-hidden","true");const c=document.createElementNS(li,"path");return u.append(c),a.append(s,o,r,l,u),Oc(t,a,e,n),o.addEventListener("dblclick",()=>{const d=n(t);d?.type==="padGrid"&&d.onRename&&a.dataset.empty!=="true"&&Xs(t,a,e,n)}),a.addEventListener("dragstart",d=>{if(a.dataset.empty==="true"||!d.dataTransfer){d.preventDefault();return}d.dataTransfer.setData(At,String(e)),d.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",d=>{const p=d.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(At)||(d.preventDefault(),d.stopPropagation(),d.dataTransfer&&(d.dataTransfer.dropEffect=p.includes(At)&&!d.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",d=>{delete a.dataset.drop;const p=n(t);if(p?.type!=="padGrid")return;const f=d.dataTransfer?.getData(At);if(f!==void 0&&f!==""){d.preventDefault(),d.stopPropagation();const w=Number(f);w!==e&&p.onMove?.(w,e,d.altKey);return}const g=d.dataTransfer?.files?.[0];g&&(d.preventDefault(),d.stopPropagation(),p.onFile?.(e,g))}),a}function Rc(t,e,n){const a=n(t);a?.type==="padGrid"&&a.onPress(e)}function Oc(t,e,n,a){let s=0,o=!1,r=0,l=0;const u=()=>{window.clearTimeout(s),s=0};e.addEventListener("pointerdown",c=>{if(c.button!==0)return;o=!1,r=c.clientX,l=c.clientY,u();const d=a(t);d?.type==="padGrid"&&(d.onDown?.(n),!(d.onDown&&c.pointerType==="mouse")&&(s=window.setTimeout(()=>{s=0,o=ci(t,e,n,a)},zc)))}),e.addEventListener("pointermove",c=>{s&&Math.hypot(c.clientX-r,c.clientY-l)>8&&u()});for(const c of["pointerup","pointercancel","pointerleave"])e.addEventListener(c,u);e.addEventListener("contextmenu",c=>{c.preventDefault(),u(),o=ci(t,e,n,a)}),e.addEventListener("click",()=>{if(o){o=!1;return}Rc(t,n,a)})}function ci(t,e,n,a){const s=a(t);if(s?.type!=="padGrid"||!s.menu)return!1;const o=s.menu(n);if(!o.length)return!1;Rt(t);const r=document.createElement("div");r.className="nc-slot-scrim",r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),Rt(t)}),r.addEventListener("click",d=>d.stopPropagation());const l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",e.getAttribute("aria-label")??"Pad");for(const d of o){const p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=d.id,p.textContent=d.label,p.addEventListener("click",()=>{Rt(t);const f=a(t);f?.type==="padGrid"&&(d.id==="rename"&&f.onRename?Xs(t,e,n,a):f.onMenu?.(n,d.id))}),l.append(p)}t.append(r,l);const u=t.getBoundingClientRect(),c=e.getBoundingClientRect();return l.style.left=`${c.left-u.left}px`,l.style.top=`${c.bottom-u.top}px`,l.querySelector("button")?.focus(),!0}function Xs(t,e,n,a){t.querySelector(":scope > .nc-padgrid-rename")?.remove();const s=a(t);if(s?.type!=="padGrid")return;const o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=s.nameMax??24,o.value=s.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);const r=t.getBoundingClientRect(),l=e.getBoundingClientRect();o.style.left=`${l.left-r.left}px`,o.style.top=`${l.top-r.top}px`,o.style.width=`${l.width}px`;let u=!1;const c=d=>{if(u)return;u=!0;const p=o.value.trim();o.remove(),e.focus();const f=a(t);d&&p&&f?.type==="padGrid"&&f.onRename?.(n,p)};o.addEventListener("keydown",d=>{d.stopPropagation(),d.key==="Enter"?c(!0):d.key==="Escape"&&c(!1)}),o.addEventListener("blur",()=>c(!0));for(const d of["pointerdown","click","dblclick"])o.addEventListener(d,p=>p.stopPropagation());t.append(o),o.focus(),o.select()}function Rt(t){for(const e of t.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))e.remove()}function Js(t,e){const n=t.querySelectorAll(".nc-padgrid-pad");e.pads.forEach((a,s)=>{const o=n[s];if(!(o instanceof HTMLButtonElement))return;const r=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),u=o.querySelector(".nc-padgrid-pad-wave path"),c=o.querySelector(".nc-padgrid-pad-badge");c&&(c.textContent=a.empty?"":a.badge??""),o.draggable=!a.empty,a.empty?(o.dataset.empty="true",r&&(r.textContent=e.emptyLabel??"Load"),l&&(l.textContent=e.emptyHint??"tap or drop"),u?.setAttribute("d","")):(delete o.dataset.empty,r&&(r.textContent=a.label),l&&(l.textContent=""),u?.setAttribute("d",_c(a.peaks))),a.lane?o.dataset.ncLane=String(a.lane):delete o.dataset.ncLane;const d=e.selected===s;d?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",d?"true":"false"),a.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",a.empty?`Pad ${s+1}, empty: load a sample`:`Pad ${s+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${d?", selected":""}`)})}function W(){const t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function nn(t,e){const n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;const a=document.createElement("label");a.className="nc-label",a.htmlFor=t,a.textContent=e;const s=document.createElement("span");return s.className="nc-readout",s.dataset.ncReadout="",n.append(a,s),n}function di(t,e){const n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function ft(t){if(!Number.isFinite(t))return"";const e=Math.round(t*100)/100;return String(e)}const Bc=450,ui=8;function le(){const t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function Hc(t){const e=hc(t,"target-min");return e>0?e:44}function jc(t){if(!(t instanceof HTMLElement))return;const e=[...t.querySelectorAll(".nc-hit")],n=Hc(t),a=n/2,s=e.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<e.length;o++){const r=e[o],l=s[o];if(!(r instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){r.style.display="none";continue}const u=l.left+l.width/2,c=l.top+l.height/2;let d=u-a,p=u+a,f=c-a,g=c+a;for(let w=0;w<e.length;w++){if(o===w)continue;const b=s[w];if(!b||b.width===0)continue;const h=b.left+b.width/2,m=b.top+b.height/2;Math.abs(m-c)<a*2&&(h>u?p=Math.min(p,(u+h)/2):h<u&&(d=Math.max(d,(u+h)/2))),Math.abs(h-u)<a*2&&(m>c?g=Math.min(g,(c+m)/2):m<c&&(f=Math.max(f,(c+m)/2)))}d=Math.min(d,l.left),p=Math.max(p,l.right),f=Math.min(f,l.top),g=Math.max(g,l.bottom),r.style.left=`${d-l.left}px`,r.style.top=`${f-l.top}px`,r.style.width=`${Math.max(0,p-d)}px`,r.style.height=`${Math.max(0,g-f)}px`,r.style.transform="none"}}function Qs(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function pi(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Ve(t,e){switch(t.type){case"slider":return qc(t,e);case"select":return Gc(t,e);case"toggle":return Wc(t,e);case"button":return Kc(t,e);case"readout":return Vc(t);case"label":return Qc(t);case"note":return hi(t);case"knob":return td(t,e);case"choice":return nd(t,e);case"slotRow":return ad(t,e);case"stepGrid":return rd(t,e);case"canvas":return ud(t);case"fx":return gd(t,e);case"group":return Fc(t,e,Ve);case"strip":return pd(t,e);case"stripAdd":return fd(t,e);case"padGrid":return Dc(t,e);case"moves":return Xc(t,e);default:return hi({id:"unknown",text:""})}}function te(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){const n=t.querySelector("input"),a=t.querySelector("label");a&&(a.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,eo(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));const s=t.querySelector("[data-nc-readout]");s&&(s.textContent=e.valueText??ft(e.value))}else if(e.type==="select"){const n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),di(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){const n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")di(t,e.text);else if(e.type==="knob"){t instanceof HTMLElement&&gt(t,e.help);const n=t.querySelector(".nc-knob");n instanceof HTMLElement&&Zc(n,e);const a=t.querySelector("[data-nc-readout]");a&&(a.textContent=e.valueText??ft(e.value))}else if(e.type==="choice")to(t,e);else if(e.type==="slotRow")ao(t,e);else if(e.type==="stepGrid")Rn(t,e);else if(e.type==="padGrid")Js(t,e);else if(e.type==="moves")Zs(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){const n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&Gs(n,e)}else if(e.type==="strip"){ro(t,e);for(const n of e.sends??[]){const a=t.querySelector(`[data-nc-id="${rt(n.id)}"]`);a instanceof Element&&te(a,{...n,type:"knob"})}}else if(e.type==="stripAdd")so(t,e);else if(e.type==="group"){Ys(t,e);for(const n of e.controls){const a=t.querySelector(`[data-nc-id="${rt(n.id)}"]`);a instanceof Element&&te(a,n)}}else if(e.type==="fx"){po(t,e);for(const n of[...e.controls,...e.more??[]]){const a=t.querySelector(`[data-nc-id="${rt(n.id)}"]`);a instanceof Element&&te(a,n)}}}}function qc(t,e){const n=nn(t.id,t.label);n.dataset.ncSlider="";const a=document.createElement("input");a.type="range",a.className="nc-range",a.id=t.id,a.min=String(t.min),a.max=String(t.max),a.step=String(t.step),a.value=String(t.value),a.disabled=t.disabled===!0,a.dataset.ncId=t.id,a.addEventListener("input",()=>{const o=e(a);o?.type==="slider"&&o.onChange(Number(a.value))}),a.addEventListener("change",()=>{const o=e(a);o?.type==="slider"&&o.onCommit?.(Number(a.value))});const s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),t.onTap&&n.insertBefore(Uc(t,a,e),s),n.append(W()),te(n,t),n}function Uc(t,e,n){const a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=t.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),a.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,a.append(le());const s=o=>{const r=n(e);r?.type==="slider"&&r.onTap?.(o)};return a.addEventListener("pointerdown",o=>{o.button===0&&s(o.timeStamp)}),a.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),s(o.timeStamp))}),a}function Gc(t,e){const n=nn(t.id,t.label),a=document.createElement("select");a.className="nc-select",a.id=t.id,a.dataset.ncId=t.id;for(const s of t.options){const o=document.createElement("option");o.value=s.value,o.textContent=s.label,a.append(o)}return a.value=t.value,a.addEventListener("change",()=>{const s=e(a);s?.type==="select"&&s.onChange(a.value)}),n.append(a,W()),n}function Wc(t,e){const n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{const a=e(n);a?.type==="toggle"&&a.onPress()}),n.append(W()),te(n,t),n}function Kc(t,e){const n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{const o=e(n);o?.type==="button"&&o.onPress()}),n.append(W()),te(n,t),!t.onSparkle)return n;const a=document.createElement("div");a.className="nc-play-row";const s=document.createElement("button");return s.type="button",s.className="nc-sparkle-btn",s.dataset.ncSparkle=t.id,s.setAttribute("aria-label","Surprise me"),s.title=t.sparkleTitle??"Surprise me",s.innerHTML=Qs(),s.addEventListener("click",()=>{const o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&io(o);const r=e(n);r?.type==="button"&&r.onSparkle?.()}),a.append(n,s),a}function Vc(t){const e=nn(t.id,t.label);return e.append(W()),te(e,t),e}const Yc=450;function Xc(t,e){const n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Moves");for(const a of t.groups){const s=document.createElement("div");s.className="nc-moves-row",s.setAttribute("role","group"),s.setAttribute("aria-label",a.label),a.title&&(s.title=a.title);const o=document.createElement("span");o.className="nc-moves-label",o.setAttribute("aria-hidden","true"),o.textContent=a.label;const r=document.createElement("div");r.className="nc-moves-btns";for(const l of a.moves){const u=document.createElement("button");u.type="button",u.className="nc-moves-btn",u.dataset.ncMove=l.id,u.title=l.title??l.text,u.setAttribute("aria-label",`${a.label} ${l.text}`),u.append(Jc(l.icon)),u.addEventListener("click",()=>{const c=e(n);c?.type==="moves"&&c.onMove(l.id)}),r.append(u)}s.append(o,r),n.append(s)}return Zs(n,t),n}function Zs(t,e){for(const n of e.groups)for(const a of n.moves){const s=t.querySelector(`[data-nc-move="${rt(a.id)}"]`);s instanceof HTMLButtonElement&&(s.disabled=a.disabled===!0)}}function Jc(t){const e="http://www.w3.org/2000/svg",n=document.createElementNS(e,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),t?.stroke){const a=document.createElementNS(e,"path");a.setAttribute("d",t.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(t?.fill){const a=document.createElementNS(e,"path");a.setAttribute("d",t.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function Qc(t){const e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(W()),e}function hi(t){const e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(W()),e}function mi(t){if(typeof t.valueText=="string")return t.valueText;const e=ft(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function eo(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function Zc(t,e){const n=e.max-e.min||1,a=(e.value-e.min)/n;eo(t,e.modulated===!0);const s=Math.round(a*270);t.style.setProperty("--knob-turn",String(s)),e.bipolar&&(t.style.setProperty("--knob-from",String(Math.min(s,135))),t.style.setProperty("--knob-to",String(Math.max(s,135)))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",mi(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${mi(e)}`}function ed(t,e){const n=t.max-t.min||1,a=typeof t.step=="number"&&t.step>0?t.step:n/100,s=e.shiftKey?a/10:a;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+a*10:e.key==="PageDown"?t.value-a*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+s:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-s:null}function td(t,e){const n=nn(t.id,t.label);t.compact&&(n.dataset.ncCompact=""),t.bipolar&&(n.dataset.ncBipolar="");const a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=t.id;const s=document.createElement("i");s.className="nc-knob-mark",a.append(s);let o=0,r=0;a.addEventListener("pointerdown",c=>{o=c.clientY;const d=e(a);r=d&&"value"in d?Number(d.value):0,a.setPointerCapture?.(c.pointerId),n.dataset.ncDragging="true"});const l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",c=>{if(a.hasPointerCapture&&!a.hasPointerCapture(c.pointerId))return;const d=e(a);if(d?.type!=="knob")return;const p=d.max-d.min||1,f=Math.min(d.max,Math.max(d.min,r-(c.clientY-o)*p/120));d.onChange(f)}),a.addEventListener("dblclick",()=>{const c=e(a);c?.type==="knob"&&typeof c.defaultValue=="number"&&c.onChange(c.defaultValue)}),a.addEventListener("keydown",c=>{const d=e(a);if(d?.type!=="knob")return;const p=ed(d,c);p!==null&&(c.preventDefault(),d.onChange(Math.min(d.max,Math.max(d.min,p))))});const u=n.querySelector("[data-nc-readout]");return n.insertBefore(a,u),n.append(W()),te(n,t),n}function nd(t,e){const n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(const a of t.options){const s=document.createElement("button");s.type="button",s.className="nc-choice",s.dataset.ncChoice=a.value,s.setAttribute("role","tab"),s.textContent=a.label,s.addEventListener("click",()=>{const o=e(n);o?.type==="choice"&&o.onChange(a.value)}),s.addEventListener("keydown",o=>{const r=[...n.querySelectorAll("[data-nc-choice]")],l=r.indexOf(s);let u=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")u=(l+1)%r.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")u=(l-1+r.length)%r.length;else if(o.key==="Home")u=0;else if(o.key==="End")u=r.length-1;else return;const c=r[u];c instanceof HTMLButtonElement&&(o.preventDefault(),c.focus(),c.click())}),n.append(s)}return n.append(W()),to(n,t),n}function to(t,e){for(const n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;const a=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function ad(t,e){const n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;const a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let d=0;d<t.slots.length;d++){const p=t.slots[d],f=document.createElement("span");f.className="nc-snap-wrap";const g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(d),g.textContent=p.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(g,le()),id(f,g,n,d,e),a.append(f)}const s=t.onSparkle?document.createElement("button"):null;s&&(s.type="button",s.className="nc-sparkle",s.setAttribute("aria-label","Surprise me"),s.innerHTML=Qs(),s.append(le()),s.addEventListener("click",()=>{io(n);const d=e(n);d?.type==="slotRow"&&d.onSparkle?.()}));const o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";const r=document.createElement("span");r.className="nc-label",r.textContent="Morph";const l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{const d=e(n);d?.type==="slotRow"&&d.onMorph(Number(l.value))});const u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",o.append(r,u,l);const c=document.createElement("div");return c.className="nc-slot-line",c.append(a,...s?[s]:[]),n.append(c,o,W()),no(n,e),ao(n,t),n}function fi(t,e,n,a){const s=n(t);if(s?.type!=="slotRow")return;st(t);const o=a.shiftKey?"store":a.altKey?"clear":"recall";s.onSlot(e,o)}function id(t,e,n,a,s){let o=0,r=0,l=0,u=!1,c=!1,d=!1,p=!1;const f=()=>{window.clearTimeout(o),o=0},g=m=>{const y=m.clientX-r,k=m.clientY-l;y*y+k*k>ui*ui&&(u=!0,f())},w=()=>{p&&(p=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",h))},b=m=>{const y=o!==0&&!u&&!c;f(),w(),y&&(d=!0,fi(n,a,s,m))},h=()=>{u=!0,f(),w()};t.addEventListener("pointerdown",m=>{m.button===0&&(w(),c=!1,u=!1,d=!1,r=m.clientX,l=m.clientY,f(),o=window.setTimeout(()=>{o=0,!u&&(c=!0,sd(n,e,a,s))},Bc),p=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",b),window.addEventListener("pointercancel",h))}),t.addEventListener("contextmenu",m=>m.preventDefault()),t.addEventListener("click",m=>{if(d||c||u){d=!1,c=!1,u=!1;return}fi(n,a,s,m)})}function no(t,e){if(t.querySelector(".nc-slot-menu"))return;const n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");const a=gi("Save","store"),s=gi("Clear","clear");n.append(a,s);const o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),st(t)}),o.addEventListener("click",r=>r.stopPropagation()),t.append(o,n),n.addEventListener("click",r=>{const l=r.target;if(!(l instanceof HTMLButtonElement))return;const u=e(t);if(u?.type!=="slotRow")return;const c=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(u.onSlot(c,"store"),st(t)):l.dataset.ncSlotOp==="clear"&&(u.onSlot(c,"clear"),st(t))}),t.addEventListener("keydown",r=>{r.key==="Escape"&&st(t)})}function gi(t,e){const n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function sd(t,e,n,a){no(t,a);const s=t.querySelector(".nc-slot-menu");if(!(s instanceof HTMLElement))return;const o=t.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),s.hidden=!1,s.dataset.ncIndex=String(n);const r=t.getBoundingClientRect(),l=e.getBoundingClientRect();s.style.left=`${l.left-r.left}px`,s.style.top=`${l.bottom-r.top}px`,s.querySelector("button")?.focus()}function st(t){const e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function ao(t,e){for(const s of t.querySelectorAll("[data-nc-slot]")){if(!(s instanceof HTMLButtonElement))continue;const o=Number(s.dataset.ncSlot),r=e.slots[o];if(!r)continue;s.textContent=r.label,r.filled?s.dataset.filled="true":delete s.dataset.filled,r.active?s.dataset.active="true":delete s.dataset.active,r.edited?s.dataset.edited="true":delete s.dataset.edited,r.queued?s.dataset.queued="true":delete s.dataset.queued,r.queued&&r.pulse?s.dataset.pulse="true":delete s.dataset.pulse;const l=[r.filled?"saved":"empty",r.active?"playing":"",r.edited?"edited":"",r.queued?"queued, tap again to switch now":""];s.setAttribute("aria-label",[r.label,...l.filter(Boolean)].join(", "))}const n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));const a=t.querySelector("[data-nc-morph]");a&&(a.textContent=e.morphText)}function io(t){const e=t.dataset.ncLastFill||null,n=Ql(e);t.dataset.ncLastFill=n;const a=Zl(n);if(a)for(const[s,o]of Object.entries(a))t.style.setProperty(s,o)}function od(t,e){const n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1;const s=o=>{if(a===o)return;a=o,n.setAttribute("aria-pressed",o?"true":"false");const r=e(t);r?.type==="stepGrid"&&r.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),s(!0))});for(const o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>s(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||s(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),s(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function rd(t,e){const n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;const a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");const s=h=>{const m=document.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.textContent=h,a.append(m),m},o=s("Note"),r=s("Accent");r.dataset.ncAccentMode="";const l=h=>{for(const m of[o,r]){const y=m===h;m.setAttribute("aria-checked",y?"true":"false"),m.tabIndex=y?0:-1}};l(o);for(const h of[o,r])h.addEventListener("click",()=>l(h));a.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();const m=r.getAttribute("aria-checked")==="true"?o:r;l(m),m.focus()});const u=document.createElement("div");if(u.className="nc-step-tools",u.append(a),t.onFill&&u.append(od(n,e)),t.onClear){const h=document.createElement("button");h.type="button",h.className="nc-fill nc-clear",h.dataset.ncClear="",h.textContent=t.clearLabel??"Clear",h.title="Clear every step (Undo takes it back)",h.addEventListener("click",()=>{const m=e(n);m?.type==="stepGrid"&&m.onClear?.()}),u.append(h)}n.append(u);for(const h of t.rows){const m=document.createElement("div");m.className="nc-row",m.dataset.ncRow="";const y=document.createElement("button");y.type="button",y.className="nc-name",y.textContent=h.label,y.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(y.dataset.ncLane=String((h.lane-1)%4+1));let k=!1,E=0;y.addEventListener("pointerdown",$=>{k=!1,!($.pointerType==="mouse"||$.button!==0)&&(E=window.setTimeout(()=>{const A=e(n);A?.type!=="stepGrid"||!A.selectedRows||(k=!0,A.onSelectRow?.(A.rows.findIndex(N=>N.id===h.id),!0))},Yc))});for(const $ of["pointerup","pointercancel","pointerleave"])y.addEventListener($,()=>window.clearTimeout(E));y.addEventListener("contextmenu",$=>{k&&$.preventDefault()}),y.addEventListener("click",$=>{const A=e(n);if(A?.type!=="stepGrid")return;if(k){k=!1;return}const N=A.rows.findIndex(K=>K.id===h.id),H=!!A.selectedRows&&($.shiftKey||$.metaKey||$.ctrlKey);A.onSelectRow?.(N,H)}),y.addEventListener("keydown",$=>ld(n,y,$));const x=[];for(const $ of["mute","solo"]){if(!($==="mute"?t.onMute:t.onSolo))continue;const N=document.createElement("span");N.className="nc-ms-wrap";const H=document.createElement("button");H.type="button",H.className="nc-ms",H.dataset.ncMs=$,H.textContent=$==="mute"?"M":"S",H.setAttribute("aria-label",`${$==="mute"?"Mute":"Solo"} ${h.label}`),N.append(H,le()),N.addEventListener("click",()=>{const K=e(n);if(K?.type!=="stepGrid")return;const me=K.rows.findIndex(F=>F.id===h.id);($==="mute"?K.onMute:K.onSolo)?.(me)}),x.push(N)}const S=document.createElement("div");S.className="nc-steps";for(let $=0;$<h.steps.length;$++){const A=document.createElement("span");A.className="nc-step-wrap";const N=document.createElement("button");N.type="button",N.className="nc-step",N.dataset.ncStep=`${h.id}:${$}`,N.setAttribute("aria-label",`${h.label} step ${$+1}`),A.append(N,le()),A.addEventListener("click",H=>{const K=e(n);if(K?.type!=="stepGrid")return;const me=K.rows.findIndex($t=>$t.id===h.id),F=r.getAttribute("aria-checked")==="true";K.onToggle(me,$,H.shiftKey||F)}),S.append(A)}if(t.onLength&&S.append(cd(n,S,h,e)),m.append(...x,y,S),t.onDice){const $=document.createElement("button");$.type="button",$.className="nc-sparkle nc-row-dice",$.dataset.ncDice=h.id,$.setAttribute("aria-label",`Re-roll ${h.label}`),$.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,$.innerHTML=pi(),$.append(le()),$.addEventListener("click",()=>{const A=e(n);A?.type==="stepGrid"&&A.onDice?.(A.rows.findIndex(N=>N.id===h.id))}),m.append($)}m.addEventListener("click",$=>{if($.target!==m)return;const A=e(n);A?.type==="stepGrid"&&A.onSelectRow?.(A.rows.findIndex(N=>N.id===h.id))}),bi(n,S,".nc-step-wrap",e,r,()=>h.id),n.append(m)}const c=document.createElement("div");c.className="nc-pads-head";const d=(h,m,y)=>{const k=document.createElement("button");return k.type="button",k.className=h,k.textContent=m,y&&k.setAttribute("aria-label",y),k},p=d("nc-pads-step","‹","Previous lane"),f=d("nc-pads-step","›","Next lane"),g=document.createElement(t.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),t.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{const h=e(n);h?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Rn(n,h))}));for(const[h,m]of[[p,-1],[f,1]])h.addEventListener("click",()=>{const y=e(n);if(y?.type!=="stepGrid"||y.rows.length===0)return;const k=y.rows.length;y.onSelectRow?.(((Tt(y)+m)%k+k)%k)});if(c.append(p,g,f),t.onDice){const h=d("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=pi(),h.addEventListener("click",()=>{const m=e(n);if(m?.type!=="stepGrid")return;const y=Tt(m);y>=0&&m.onDice?.(y)}),c.append(h)}if(t.transport){const h=d("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{const m=e(n);m?.type==="stepGrid"&&m.transport?.onToggle()}),c.append(h)}n.append(c);const w=document.createElement("div");w.className="nc-pads",w.setAttribute("role","group");const b=Math.max(0,...t.rows.map(h=>h.steps.length));for(let h=0;h<b;h++){const m=document.createElement("button");m.type="button",m.className="nc-pad",m.dataset.ncPad=String(h),m.textContent=String(h+1),m.addEventListener("click",y=>{const k=e(n);if(k?.type!=="stepGrid")return;const E=Tt(k);if(E<0)return;if(n.dataset.ncLenMode==="true"){k.onLength?.(E,h+1);return}const x=r.getAttribute("aria-checked")==="true";k.onToggle(E,h,y.shiftKey||x)}),w.append(m)}return bi(n,w,".nc-pad",e,r,()=>{const h=e(n);return h?.type==="stepGrid"?h.rows[Tt(h)]?.id:void 0}),n.append(w),n.append(W()),Rn(n,t),n}function Tt(t){const e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function bi(t,e,n,a,s,o){let r="on",l=!0,u=-1;const c=(d,p)=>{const f=d.rows[u]?.steps[p];!f||p>=d.rows[u].length||(d.onSet?d.onSet(u,p,r,l):!!f[r]!==l&&d.onToggle(u,p,r==="accent"))};Lc(e,n,d=>{const p=a(t);if(p?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(d.kind!=="paint")return;const f=p.rows.findIndex(g=>g.id===o());f>=0&&p.rows[f].length!==d.pad+1&&p.onLength?.(f,d.pad+1);return}if(d.kind==="paint"){if(d.phase==="start"){const f=o();u=p.rows.findIndex(w=>w.id===f);const g=p.rows[u]?.steps[d.pad];if(!g)return;r=s.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[r]}c(p,d.pad)}else if(d.kind==="long"){const f=o(),g=p.rows.findIndex(b=>b.id===f),w=e.querySelectorAll(n)[d.pad];g>=0&&w instanceof HTMLElement&&p.onLongPress?.(g,d.pad,w)}}})}function ld(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;const a=[...t.querySelectorAll(".nc-name")],s=a.indexOf(e);let o=s;n.key==="ArrowDown"?o=s+1:n.key==="ArrowUp"?o=s-1:n.key==="Home"?o=0:o=a.length-1;const r=a[o];!(r instanceof HTMLElement)||r===e||(n.preventDefault(),r.focus(),r.click())}function cd(t,e,n,a){const s=document.createElement("button");s.type="button",s.className="nc-len-handle",s.dataset.ncLen=n.id,s.setAttribute("role","slider"),s.setAttribute("aria-valuemin","1"),s.setAttribute("aria-valuemax",String(n.steps.length)),s.append(le());const o=c=>{const d=a(t);if(d?.type!=="stepGrid")return;const p=d.rows.findIndex(w=>w.id===n.id),f=d.rows[p];if(!f)return;const g=Math.max(1,Math.min(f.steps.length,c));g!==f.length&&d.onLength?.(p,g)},r=c=>{const d=[...e.querySelectorAll(".nc-step")];let p=1;return d.forEach((f,g)=>{const w=f.getBoundingClientRect();w.width>0&&c>=w.left+w.width/2&&(p=g+1)}),p},l=c=>o(r(c.clientX)),u=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete s.dataset.dragging};return s.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),s.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),s.addEventListener("keydown",c=>{const d=a(t);if(d?.type!=="stepGrid")return;const p=d.rows.find(g=>g.id===n.id);if(!p)return;const f={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};c.key in f&&(c.preventDefault(),o(f[c.key]))}),s}const yn=new WeakMap,Mt=new WeakMap;function dd(t){return t?(Mt.has(t)||(Mt.set(t,Dn(t)),Os(e=>{Mt.set(t,e);for(const n of t.querySelectorAll("[data-nc-velocity]"))In(n,Number(n.getAttribute("data-nc-velocity")))},t)),Mt.get(t)):"light"}function In(t,e){const n=typeof e=="number"&&Number.isFinite(e)?e:null,a=n===null?null:dd(t.ownerDocument),s=n===null?null:`${a} ${n}`;if(!(yn.has(t)&&yn.get(t)===s)){if(yn.set(t,s),n===null){for(const o of Object.keys(ai(1)))t.style.removeProperty(o);t.removeAttribute("data-nc-velocity");return}t.setAttribute("data-nc-velocity",String(n));for(const[o,r]of Object.entries(ai(n,ni[a]??ni.light)))t.style.setProperty(o,r)}}function Rn(t,e){const n=e.rows.some(d=>d.solo),a=t.querySelector("[data-nc-clear]");a&&a.textContent!==(e.clearLabel??"Clear")&&(a.textContent=e.clearLabel??"Clear");const s=t.querySelector(".nc-pads"),o=e.rows.find(d=>d.id===e.selectedRow)??e.rows[0],r=t.querySelector(".nc-pads-label"),l=t.dataset.ncLenMode==="true"&&!!e.onLength;r instanceof HTMLElement&&o&&(r.textContent=l?`${o.label} · ${o.length}`:o.label,e.onLength&&(r.setAttribute("aria-pressed",l?"true":"false"),r.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));const u=t.querySelector("[data-nc-pads-dice]");u instanceof HTMLElement&&o&&(u.setAttribute("aria-label",`Re-roll ${o.label}`),u.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);const c=t.querySelector("[data-nc-pads-play]");if(c instanceof HTMLElement){const d=!!e.transport?.playing,p=e.transport?.label??(d?"Stop":"Play");c.textContent!==p&&(c.textContent=p),c.setAttribute("aria-pressed",d?"true":"false");const f=e.transport?.ariaLabel;f?c.setAttribute("aria-label",f):c.removeAttribute("aria-label")}if(s instanceof HTMLElement&&o){s.setAttribute("aria-label",`${o.label} steps`),o.lane&&(s.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?s.dataset.silent="true":delete s.dataset.silent;const d=o.length>0?(e.playhead%o.length+o.length)%o.length:-1;for(const p of s.querySelectorAll("[data-nc-pad]")){const f=Number(p.getAttribute("data-nc-pad")),g=o.steps[f];p instanceof HTMLButtonElement&&(p.hidden=!g||!l&&f>=o.length,l&&f>=o.length?p.dataset.out="true":delete p.dataset.out,l&&f===o.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${o.label} step ${f+1}`),p.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?p.dataset.accent="true":delete p.dataset.accent,g?.dim?p.dataset.dim="true":delete p.dataset.dim,In(p,g?.velocity),e.playhead>=0&&f===d?p.dataset.playhead="true":delete p.dataset.playhead)}}for(const d of e.rows){for(let w=0;w<d.steps.length;w++){const b=d.steps[w],h=t.querySelector(`[data-nc-step="${d.id}:${w}"]`);if(!(h instanceof HTMLButtonElement))continue;const m=h.closest(".nc-row");if(m instanceof HTMLElement){e.selectedRow===d.id?m.dataset.selected="true":delete m.dataset.selected;const E=e.selectedRow!==d.id&&(e.selectedRows??[]).includes(d.id);E?m.dataset.picked="true":delete m.dataset.picked;const x=m.querySelector(".nc-name");x instanceof HTMLElement&&(x.setAttribute("aria-pressed",e.selectedRow===d.id||E?"true":"false"),x.textContent!==d.label&&(x.textContent=d.label,x.setAttribute("aria-label",`Select ${d.label}`))),d.mute||n&&!d.solo?m.dataset.silent="true":delete m.dataset.silent;for(const $ of m.querySelectorAll("[data-nc-ms]")){const A=$.getAttribute("data-nc-ms")==="mute"?d.mute:d.solo;$.setAttribute("aria-pressed",A?"true":"false")}}h.setAttribute("aria-pressed",b.on?"true":"false"),b.accent?h.dataset.accent="true":delete h.dataset.accent,b.dim?h.dataset.dim="true":delete h.dataset.dim,w%4===0?h.dataset.bar="true":delete h.dataset.bar,typeof b.velocity=="number"?(h.dataset.velocity="true",h.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,b.velocity))*100)}%`)):(delete h.dataset.velocity,h.style.removeProperty("--level")),In(h,b.velocity);const y=e.playhead>=0&&d.length>0?(e.playhead%d.length+d.length)%d.length:-1;w===y?h.dataset.playhead="true":delete h.dataset.playhead;const k=!!e.onLength&&e.selectedRow===d.id;h.hidden=w>=d.length&&!k,w>=d.length&&k?h.dataset.out="true":delete h.dataset.out}const p=t.querySelector(`[data-nc-len="${d.id}"]`),g=t.querySelector(`[data-nc-step="${d.id}:${Math.max(0,d.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&g&&g.nextElementSibling!==p){const w=document.activeElement===p;g.after(p),w&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(d.length)),p.setAttribute("aria-label",`${d.label} length, ${d.length} steps`),p.title=`${d.label}: drag to set the length (${d.length} steps)`)}}function ud(t){const e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;const n=document.createElement("span");n.className="nc-label",n.textContent=t.label;const a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=t.id,a.dataset.ncPaint=t.paint,e.append(n,a,W()),e}function pd(t,e){const n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");const a=document.createElement("div");a.className="nc-strip-hd";const s=document.createElement("span");s.className="nc-strip-name",s.dataset.ncStripName="";const o=!t.master&&typeof t.onFold=="function";let r=null;if(o&&(n.dataset.ncFoldable="",r=co(),r.dataset.ncStripHide="",r.addEventListener("click",()=>{const m=e(n);m?.type==="strip"&&(m.onFold?.(m.folded!==!0),document.activeElement!==r&&r.focus())})),a.append(s),t.onRemove){const m=document.createElement("button");m.type="button",m.className="nc-strip-remove",m.dataset.ncStripRemove="",m.textContent="×",m.addEventListener("click",()=>{const y=e(n);y?.type==="strip"&&y.onRemove?.(m)}),a.append(m)}const l=document.createElement("div");if(l.className="nc-strip-hacks",t.onHacks){const m=document.createElement("span");m.className="nc-hacks-wrap";const y=document.createElement("button");y.type="button",y.className="nc-hacks",y.dataset.ncHacks="",m.append(y,le()),m.addEventListener("click",()=>{const k=e(n);k?.type==="strip"&&k.onHacks?.()}),l.append(m)}const u=document.createElement("div");u.className="nc-strip-ms";for(const m of["mute","solo"]){if(!(m==="mute"?t.onMute:t.onSolo))continue;const k=document.createElement("span");k.className="nc-ms-wrap";const E=document.createElement("button");E.type="button",E.className="nc-ms",E.dataset.ncMs=m,E.textContent=m==="mute"?"M":"S",k.append(E,le()),k.addEventListener("click",()=>{const x=e(n);x?.type==="strip"&&(m==="mute"?x.onMute:x.onSolo)?.()}),u.append(k)}const c=document.createElement("div");c.className="nc-strip-sends";for(const m of t.sends??[])c.append(Ve({...m,type:"knob",compact:!0},e));const d=document.createElement("div");d.className="nc-strip-pan",t.pan&&d.append(Ve(ha(t),e));const p=document.createElement("div");p.className="nc-strip-body";const f=document.createElement("span");f.className="nc-scale",f.setAttribute("aria-hidden","true");for(const m of t.ticks??[]){const y=document.createElement("span");y.className="nc-scale-tick",y.style.setProperty("--tick-pos",String(m.value)),y.textContent=m.label,f.append(y)}const g=wc({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:m=>{const y=e(n);y?.type==="strip"&&y.onChange(m)},onReset:()=>{const m=e(n);m?.type==="strip"&&wi(m)}}),w=Sc({channels:t.channels===2?2:1,label:t.label,onClear:()=>{const m=e(n);m?.type==="strip"&&m.onClipClear?.()}});if(p.append(f,g.el,w.el),o){const m=document.createElement("button");m.type="button",m.className="nc-ui-fx-fold nc-strip-fold",m.dataset.ncStripFold="",m.setAttribute("aria-expanded","false");const y=document.createElement("span");y.className="nc-strip-fold-cap",y.setAttribute("aria-hidden","true");const k=document.createElement("span");k.className="nc-ui-fx-fold-name",k.dataset.ncStripFoldName="";const E=document.createElement("span");E.className="nc-strip-fold-pan",E.setAttribute("aria-hidden","true"),E.hidden=!t.pan,m.append(y,E,k),m.addEventListener("click",()=>{const x=e(n);if(x?.type!=="strip")return;x.onFold?.(!1);const S=n.querySelector("[data-nc-strip-hide]");S instanceof HTMLElement&&S.focus()}),p.prepend(m)}const b=document.createElement("button");b.type="button",b.className="nc-strip-db",b.dataset.ncReadout="";let h=0;return b.addEventListener("click",m=>{const y=e(n);y?.type!=="strip"||!y.onTypeIn||(window.clearTimeout(h),m.detail===0?yi(n,b,e):m.detail===1&&(h=window.setTimeout(()=>yi(n,b,e),md)))}),b.addEventListener("dblclick",()=>{window.clearTimeout(h);const m=e(n);m?.type==="strip"&&wi(m)}),r&&n.append(r),n.append(a,l,u,c,d,p,b,W()),ro(n,t),n}function ha(t){const e=t.pan;return{type:"knob",id:e.id,label:e.label??"L R",ariaLabel:e.ariaLabel??`${t.label} pan`,min:-1,max:1,step:e.step??.05,value:e.value,valueText:e.valueText??hd(e.value),defaultValue:0,compact:!0,bipolar:!0,help:e.help,onChange:n=>e.onChange(n)}}function hd(t){const e=Math.round(Math.min(1,Math.max(-1,t))*100);return e===0?"C":e<0?`L ${-e}`:`R ${e}`}const md=250;function yi(t,e,n){const a=n(t);if(a?.type!=="strip"||!a.onTypeIn||t.querySelector(".nc-strip-db-input"))return;const s=document.createElement("input");s.type="text",s.className="nc-strip-db-input",s.inputMode="decimal",s.spellcheck=!1,s.autocomplete="off",s.value=a.valueText??ft(a.value),s.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(s),s.focus(),s.select?.();let o=!1;const r=l=>{if(o)return;o=!0;const u=s.value;if(s.remove(),e.hidden=!1,l){const c=n(t);c?.type==="strip"&&c.onTypeIn?.(u)}e.focus?.()};s.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),r(!0)):l.key==="Escape"&&(l.preventDefault(),r(!1))}),s.addEventListener("blur",()=>r(!1))}function fd(t,e){const n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;const a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");const s=document.createElement("span");s.className="nc-strip-add-plus",s.textContent="+";const o=document.createElement("span");o.className="nc-strip-add-label",a.append(s,o);const r=document.createElement("select");return r.className="nc-strip-add-select",r.addEventListener("change",()=>{const l=e(n),u=r.value;oo(r),l?.type==="stripAdd"&&u&&l.onAdd(u)}),n.append(a,r,W()),so(n,t),n}function so(t,e){const n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);const a=t.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",e.ariaLabel??e.label);const s=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],o=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),r=s.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==r&&(a.replaceChildren(...s.map(l=>{const u=document.createElement("option");return u.value=l.value,u.textContent=l.label,u.disabled=l.disabled===!0,u})),oo(a))}function oo(t){const e=t.options[0];e&&(e.selected=!0)}function wi(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function ro(t,e){const n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);const a=t.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${e.label}`),a.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);const s=t.querySelector(".nc-fader"),o=s?vc(s):void 0;o&&(o.configure({step:e.step}),o.set(e.value),o.setText(e.valueText),o.setLabel(`${e.label} level`)),Ac(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);const r=t.querySelector(".nc-strip-db");if(r instanceof HTMLElement){const p=e.valueText??ft(e.value);r.textContent!==p&&(r.textContent=p),r.setAttribute("aria-label",`${e.label} level ${p}`);const f=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";r.title=e.onTypeIn?`Click to type a value. ${f}`:f}for(const p of t.querySelectorAll("[data-nc-ms]")){const f=p.getAttribute("data-nc-ms"),g=f==="mute"?e.mute===!0:e.solo===!0;p.setAttribute("aria-pressed",g?"true":"false"),p.setAttribute("aria-label",`${f==="mute"?"Mute":"Solo"} ${e.label}`)}const l=t.querySelector("[data-nc-hacks]");if(l){const p=e.hacksLabel??"Hacks";l.textContent!==p&&(l.textContent=p),l.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${p}: ${e.label}`)}if(e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity,e.pan){t.style.setProperty("--nc-strip-pan",String(e.pan.value));const p=t.querySelector(`.nc-strip-pan [data-nc-id="${rt(e.pan.id)}"]`);p&&te(p,ha(e))}const u=!e.master&&typeof e.onFold=="function"&&e.folded===!0;u?t.dataset.ncFolded="true":delete t.dataset.ncFolded;const c=t.querySelector("[data-nc-strip-hide]");c instanceof HTMLElement&&(uo(c,u,e.label),gt(c,e.foldHelp));const d=t.querySelector("[data-nc-strip-fold]");if(d instanceof HTMLElement){d.hidden=!u,d.setAttribute("aria-label",`Expand ${e.label}`);const p=d.querySelector("[data-nc-strip-fold-name]");p&&p.textContent!==e.label&&(p.textContent=e.label),gt(d,e.foldedHelp??e.foldHelp)}}function gd(t,e){const n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);const a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${t.id}-name`,a.textContent=t.title;const s=typeof t.onFold=="function";if(t.on===void 0&&!s)n.append(a);else{const o=document.createElement("div");if(o.className="nc-ui-fx-hd",o.append(a),t.on!==void 0){const r=js({checked:t.on,labelledBy:a.id,onChange:l=>{const u=e(r.el);u?.type==="fx"&&u.onToggle?.(l)}});r.el.dataset.ncFxSwitch="",o.append(r.el)}s&&o.append(yd(n,e)),n.append(o)}s&&n.prepend(wd(n,e));for(const o of t.controls)n.append(Ve(o,e));if(t.more?.length){const o=document.createElement("details");o.className="nc-ui-more";const r=document.createElement("summary");r.textContent=t.moreLabel??"More",o.append(r);for(const l of t.more)o.append(Ve(l,e));n.append(o)}return n.append(W()),po(n,t),n}const bd=t=>typeof t.getClientRects=="function"?t.getClientRects().length>0:!t.hidden;function lo(t){const e=t.querySelector(":scope > [data-nc-fx-fold]"),n=t.querySelector("[data-nc-fx-hide]"),s=t.dataset.ncFolded==="true"&&e&&bd(e)?e:n;s instanceof HTMLElement&&document.activeElement!==s&&s.focus()}function yd(t,e){const n=co();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{const a=e(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),lo(t))}),n}function co(){const t=document.createElement("button");t.type="button",t.className="nc-fold-toggle";const e=document.createElement("span");return e.className="nc-fold-tri",e.setAttribute("aria-hidden","true"),t.append(e),t}function uo(t,e,n){t.setAttribute("aria-expanded",e?"false":"true"),t.setAttribute("aria-label",`${e?"Expand":"Minimize"} ${n}`),t.title=e?"Expand":"Minimize"}function wd(t,e){const n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");const a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";const s=document.createElement("span");s.className="nc-ui-fx-fold-name",s.dataset.ncFxFoldName="";const o=document.createElement("span");return o.className="nc-fold-tri",o.setAttribute("aria-hidden","true"),n.append(o,a,s),n.addEventListener("click",()=>{const r=e(n);r?.type==="fx"&&(r.onFold?.(!1),lo(t))}),n}function po(t,e){const n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);const a=t.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim;const s=typeof e.onFold=="function"&&e.folded===!0;s?t.dataset.ncFolded="true":delete t.dataset.ncFolded;const o=t.querySelector("[data-nc-fx-hide]");o instanceof HTMLElement&&(uo(o,s,e.title),gt(o,e.foldHelp));const r=t.querySelector(":scope > [data-nc-fx-fold]");if(r instanceof HTMLElement){const l=e.on===void 0?"":e.on?"On":"Off";r.hidden=!s,r.setAttribute("aria-label",`Expand ${e.title}${l?`, ${l.toLowerCase()}`:""}`),r.dataset.on=e.on===!0?"true":"false";const u=r.querySelector("[data-nc-fx-fold-state]");u&&(u.textContent=l,u.hidden=l==="");const c=r.querySelector("[data-nc-fx-fold-name]");c&&(c.textContent=e.title),gt(r,e.foldHelp)}}function gt(t,e){e?t.setAttribute("data-nc-help",e):t.removeAttribute("data-nc-help")}function rt(t){return t.replace(/["\\]/g,"\\$&")}function vd(t,e){for(const n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;const a=e.find(s=>s.type==="canvas"&&s.id===n.dataset.ncId);a?.type==="canvas"&&Gs(n,a)}jc(t)}const kd=ye["toast-duration"];function xd({message:t,actionLabel:e}){return e?`${t}, ${e}`:String(t)}function $d(t,e,n,a){const s=l=>({top:l,bottom:l+n}),o=l=>t.some(u=>u&&u.bottom>l.top&&u.top<l.bottom),r=s(e-a-n);return o(r)?o(s(a))?"bottom":"top":"bottom"}function ho(t,e,n,a,s,o){let r=t.bottom+s;const l=Math.max(o,Math.min(t.left,a-o-n.width));for(let u=!0,c=0;u&&c<8;c++){u=!1;for(const d of e)d&&d.bottom>r&&d.top<r+n.height&&d.right>l&&d.left<l+n.width&&(r=d.bottom+s,u=!0)}return{top:r,left:l}}const vi="data-nc-ui-toast-live";function Ed(t,e){let n=e.querySelector(`[${vi}]`);return n||(n=t.createElement("div"),n.setAttribute(vi,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",e.appendChild(n)),n}function Sd({message:t,actionLabel:e,onAction:n,duration:a=kd,onClose:s,avoid:o=[],anchor:r,host:l,document:u=globalThis.document}={}){l=l??u.body;const c=u.defaultView??globalThis,d=u.createElement("div");d.className="nc-ui-toast",d.setAttribute("data-state","enter");const p=u.createElement("span");p.className="nc-ui-toast-message",p.textContent=t,d.appendChild(p);let f=null;e&&(f=u.createElement("button"),f.type="button",f.className="nc-ui-toast-action",f.textContent=e,d.appendChild(f)),l.appendChild(d);let g="open";const w=X=>X&&typeof X.getBoundingClientRect=="function"?X.getBoundingClientRect():null,b=w(d),h=b?.height||44,m=c.getComputedStyle?.(d),y=Number.parseFloat(m?.getPropertyValue(D("toast-offset")))||16,k=Number.parseFloat(m?.getPropertyValue(D("toast-anchor-gap")))||8,E=w(r),x=c.innerHeight??0,S=o.map(w).filter(Boolean),$=E&&E.bottom>0&&E.top<x?ho(E,S,{width:b?.width||0,height:h},c.innerWidth??0,k,y):null;$&&$.top+h<=x?(d.setAttribute("data-placement","anchor"),d.style.top=`${$.top+(c.scrollY??0)}px`,d.style.left=`${$.left+(c.scrollX??0)}px`):d.setAttribute("data-placement",$d(S,x,h,y));const A=c.requestAnimationFrame?.bind(c)??(X=>setTimeout(X,16));A(()=>A(()=>{g==="open"&&d.setAttribute("data-state","open")})),Ed(u,l).textContent=xd({message:t,actionLabel:e});let N,H;const K=new Promise(X=>{H=X}),me=X=>{clearTimeout(N),N=setTimeout(()=>pn("timeout"),X)};let F=a,$t=Date.now();const Pa=()=>{g==="open"&&(clearTimeout(N),F=Math.max(0,F-(Date.now()-$t)))},_a=()=>{g==="open"&&($t=Date.now(),me(F))};d.addEventListener("pointerenter",Pa),d.addEventListener("pointerleave",_a),d.addEventListener("focusin",Pa),d.addEventListener("focusout",_a),f?.addEventListener("click",()=>{if(g==="open")try{n?.()}finally{pn("action")}}),Number.isFinite(a)&&me(a);function pn(X="close"){if(g!=="open")return;g="closing",clearTimeout(N),d.setAttribute("data-state","closing"),s?.(X);const Da=c.getComputedStyle?.(d),er=Da?Math.max(0,...String(Da.transitionDuration||"").split(",").map(Ra=>Number.parseFloat(Ra)*(Ra.trim().endsWith("ms")?1:1e3)||0)):0,Ia=()=>{g!=="gone"&&(g="gone",d.remove(),H(X))};d.addEventListener("transitionend",Ia),setTimeout(Ia,er+50)}return{el:d,close:pn,closed:K}}function ki(t){return`${Math.round(Math.min(1,Math.max(0,Number(t)||0))*100)}%`}function Ad({anchor:t,title:e,velocity:n,probability:a,onChange:s,onClose:o,host:r,document:l=globalThis.document}){r=r??l.body;const u=l.defaultView??globalThis,c={velocity:n,probability:a},d=l.createElement("div");d.className="nc-slot-scrim nc-step-editor-scrim";const p=l.createElement("div");p.className="nc-step-editor",p.setAttribute("role","dialog"),p.setAttribute("aria-label",e);const f=l.createElement("div");f.className="nc-step-editor-head";const g=l.createElement("span");g.className="nc-label",g.textContent=e;const w=l.createElement("button");w.type="button",w.className="nc-step-editor-done",w.textContent="Done",f.append(g,w),p.appendChild(f);const b=[];for(const[E,x]of[["velocity","Velocity"],["probability","Chance"]]){const S=l.createElement("label");S.className="nc-step-editor-row";const $=l.createElement("span");$.className="nc-label",$.textContent=x;const A=l.createElement("input");A.type="range",A.className="nc-range",A.min=E==="velocity"?"0.05":"0",A.max="1",A.step="0.05",A.value=String(c[E]),A.setAttribute("data-nc-edit",E);const N=l.createElement("output");N.className="nc-readout",N.textContent=ki(c[E]),A.setAttribute("aria-valuetext",N.textContent),A.addEventListener("input",()=>{c[E]=Number(A.value),N.textContent=ki(c[E]),A.setAttribute("aria-valuetext",N.textContent),s({velocity:c.velocity,probability:c.probability})}),S.append($,A,N),p.appendChild(S),b.push(A)}if(r.append(d,p),t?.setAttribute?.("data-editing","true"),u.matchMedia?.(`(max-width: ${Fs.breakpoint.md})`).matches??!1)p.setAttribute("data-placement","sheet"),d.setAttribute("data-placement","sheet");else{const E=t?.getBoundingClientRect?.(),x=p.getBoundingClientRect(),S=Number.parseFloat(u.getComputedStyle(p).getPropertyValue("row-gap"))||8;if(E){let{top:$,left:A}=ho(E,[],{width:x.width,height:x.height},u.innerWidth,S,S);$+x.height>u.innerHeight&&($=Math.max(S,E.top-S-x.height)),p.style.top=`${$}px`,p.style.left=`${A}px`}p.setAttribute("data-placement","anchor")}b[0]?.focus({preventScroll:!0});let m=!0;const y=E=>{E.key==="Escape"&&(E.preventDefault(),k())};function k(){m&&(m=!1,l.removeEventListener("keydown",y,!0),d.remove(),p.remove(),t?.removeAttribute?.("data-editing"),t?.isConnected&&typeof t.focus=="function"&&t.focus({preventScroll:!0}),o?.())}return l.addEventListener("keydown",y,!0),d.addEventListener("pointerdown",E=>{E.preventDefault(),k()}),w.addEventListener("click",k),{el:p,close:k}}const lt="data-nc-help",Td=350;function Md(t,e,n,a=0,s=6,o=8){const r=t.top-s-e.height,l=r>=a+o?"above":"below",u=l==="above"?r:t.bottom+s,c=Math.max(o,Math.min(t.left,n-o-e.width));return{top:Math.round(u),left:Math.round(c),side:l}}const wn=new WeakMap;function Ld(t){const e=parseFloat(t.defaultView?.getComputedStyle(t.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(e)?e:0}function Cd({document:t=globalThis.document,delay:e=Td}={}){if(!t)return{uninstall(){},hide(){}};const n=wn.get(t);if(n)return n;const a=t.defaultView;let s=null,o=null,r;const l=()=>{clearTimeout(r),o=null,s&&(s.hidden=!0)},u=f=>{const g=f.getAttribute(lt);if(!g)return;s||(s=t.createElement("div"),s.className="nc-ui-help",s.setAttribute("role","tooltip"),s.dataset.testid="nc-help",s.style.position="fixed",s.style.pointerEvents="none",s.style.zIndex="6",t.body.appendChild(s)),s.textContent=g,s.hidden=!1,s.style.visibility="hidden",s.style.top="0px",s.style.left="0px";const w=f.getBoundingClientRect(),b=Md(w,{width:s.offsetWidth,height:s.offsetHeight},a.innerWidth,Ld(t));s.style.top=`${b.top}px`,s.style.left=`${b.left}px`,s.dataset.side=b.side,s.style.visibility=""},c=f=>{if(f.pointerType==="touch")return;const g=f.target&&f.target.closest?f.target.closest(`[${lt}]`):null;g!==o&&(l(),g&&(o=g,r=setTimeout(()=>{o===g&&g.isConnected&&u(g)},e)))},d=f=>{f.key==="Escape"&&l()};t.addEventListener("pointerover",c),t.addEventListener("pointerdown",l,!0),t.addEventListener("keydown",d),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);const p={hide:l,uninstall(){l(),t.removeEventListener("pointerover",c),t.removeEventListener("pointerdown",l,!0),t.removeEventListener("keydown",d),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),s?.remove(),s=null,wn.delete(t)}};return wn.set(t,p),p}const ma="netcomposer.rhythm.hidden.v1",ge=new WeakMap;function vn(){try{return globalThis.localStorage??null}catch{return null}}function mo(t,e=ma){try{const n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function xi(t,e,n,a=ma){const s=mo(t,a);n?s.add(e):s.delete(e);try{t?.setItem(a,JSON.stringify([...s]))}catch{}}function fa(t){const e=[...t.controls??[],...(t.sections??[]).flatMap(s=>s.controls)],n=[],a=s=>{if(n.push(s),s.type==="group")for(const o of s.controls)a(o)};for(const s of e)a(s),s.type==="fx"&&n.push(...s.controls,...s.more??[]),s.type==="strip"&&(n.push(...(s.sends??[]).map(o=>({...o,type:"knob",compact:!0}))),s.pan&&n.push(ha(s)));return n}function Nd(t,e){if(!(!t||!e))return fa(t).find(n=>n.id===e)}function Fd(t){return`${`${t.layout??""}:${(t.sections??[]).map(n=>`${n.id}${n.panel?":panel":""}${n.area?`@${n.area}`:""}`).join(",")}`}#${fa(t).map(n=>n.type==="stepGrid"?`stepGrid:${n.id}:${n.rows.map(a=>`${a.id}/${a.steps.length}`).join(",")}${n.onMute?":m":""}${n.onSolo?":s":""}`:n.type==="moves"?`moves:${n.id}:${n.groups.map(a=>`${a.id}=${a.moves.map(s=>s.id).join("+")}`).join(",")}`:n.type==="padGrid"?`padGrid:${n.id}:${n.pads.length}:${n.columns??2}`:n.type==="slotRow"?`slotRow:${n.id}:${n.slots.length}${n.onSparkle?":spark":""}`:n.type==="button"?`button:${n.id}${n.onSparkle?":spark":""}`:n.type==="select"?`select:${n.id}:${n.options.map(a=>a.value).join(",")}`:n.type==="strip"?`strip:${n.id}:${n.channels??1}:${n.master?"master":""}:${n.onMute?"m":""}${n.onSolo?"s":""}${n.onRemove?"x":""}${n.onHacks?"h":""}${n.onFold?"f":""}${n.pan?`p=${n.pan.id}`:""}:${(n.sends??[]).map(a=>a.id).join(",")}:${(n.ticks??[]).map(a=>`${a.label}@${a.value}`).join(",")}`:n.type==="group"?`group:${n.id}:${n.controls.map(a=>a.id).join(",")}`:n.type==="fx"?`fx:${n.id}:${n.depth}:${n.on===void 0?"":"sw"}${n.onFold?":fold":""}:${n.controls.map(a=>a.id).join(",")}/${(n.more??[]).map(a=>a.id).join(",")}`:`${n.type}:${n.id}`).join("|")}`}function zd(t,e){if(!e.title)return;if(!e.panel){const o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=e.title,t.append(o);return}const n=document.createElement("div");n.className="nc-panel-hd";const a=document.createElement("h3");a.className="nc-panel-title",a.textContent=e.title;const s=document.createElement("span");s.className="nc-panel-subject",s.dataset.ncPanelSubject="",n.append(a,s),t.append(n),fo(t,e)}function fo(t,e){if(!e.panel)return;const n=[...t.children].find(o=>o.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),s=n?.querySelector(".nc-panel-subject");a&&(a.textContent=e.title??""),s&&(s.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function Pd(t){const e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;const n=ge.get(e),a=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Nd(n,a)}function _d(t,e){const n=e.sections??[{id:"main",controls:e.controls??[]}],a=Fd(e);if(t.dataset.ncSignature===a){for(const s of n){const o=t.querySelector(`[data-nc-section="${$i(s.id)}"]`);o&&fo(o,s);for(const r of s.controls){const l=t.querySelector(`[data-nc-id="${$i(r.id)}"]`);l instanceof Element&&te(l,r)}}return}t.dataset.ncSignature=a,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(const s of n){const o=document.createElement("div");o.className="nc-section",o.dataset.ncSection=s.id,s.inset&&(o.dataset.ncInset="true"),s.area&&(o.dataset.ncArea=s.area),s.label&&(o.setAttribute("role","group"),o.setAttribute("aria-label",s.label)),s.panel&&(o.dataset.ncPanel="true",o.setAttribute("role","region"),s.title&&o.setAttribute("aria-label",s.title)),zd(o,s);const r=s.panel?document.createElement("div"):o;s.panel&&(r.className="nc-panel-body",o.append(r));for(const l of s.controls)r.append(Ve(l,Pd));t.append(o)}}function $i(t){return t.replace(/["\\]/g,"\\$&")}function ga(t,e=ma){Hs();const n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");const a=mo(vn(),e).has(t.id),s=document.createElement("header");s.className="nc-module-hd",s.dataset.ncRow="";const o=document.createElement("h2");o.className="nc-title",o.id=`${t.id}-title`;const r=document.createElement("span");r.className="nc-module-end";const l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";const u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="";const c=js({labelledBy:o.id,onChange:m=>(ge.get(n)??t).onToggle?.(m)});c.el.dataset.ncModuleSwitch="",r.append(c.el,l,u);const d=document.createElement("span");d.className="nc-snap-msg",d.dataset.ncStatus="",s.append(o,d,r);const p=document.createElement("div");p.className="nc-module-body",p.id=`${t.id}-body`;const f=document.createElement("button");f.type="button",f.className="nc-slim";const g=document.createElement("span");g.className="nc-slim-lines",f.append(g);const w=document.createElement("i");w.className="nc-token-probe",w.dataset.ncProbe="",n.append(w,s,p,f),n.setAttribute("aria-labelledby",o.id);const b=m=>{const y=ge.get(n)??t;n.dataset.ncOpen=m?"false":"true",p.hidden=m,f.hidden=!m,l.textContent=m?"+":"−",l.setAttribute("aria-expanded",m?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${m?"Show":"Hide"} ${y.title}`),l.title=m?"Show":"Hide",m?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{const m=n.dataset.ncOpen==="true";xi(vn(),(ge.get(n)??t).id,m,e),b(m),On(n.parentElement)}),f.addEventListener("click",()=>{xi(vn(),(ge.get(n)??t).id,!1,e),b(!1),On(n.parentElement)});const h={el:n,update(m){ge.set(n,m),m.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=m.title,d.textContent=m.status??"",m.status!==void 0?d.setAttribute("aria-live","polite"):d.removeAttribute("aria-live"),g.textContent=m.summary??m.title,c.el.hidden=m.on===void 0,c.set(m.on===!0),m.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,f.setAttribute("aria-label",`Show ${m.title}`),_d(p,m),b(p.hidden),h.redraw()},redraw(){const m=ge.get(n);m&&vd(n,fa(m))}};return ge.set(n,t),b(a),h.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>h.redraw()).observe(n),Os(()=>h.redraw(),n.ownerDocument),h}function Dd(t,e,n="adjacent"){Hs(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();const a=n==="stack"?"stack":"adjacent";e.forEach((s,o)=>{const r=o%4+1;s.el.dataset.ncShade=String(r),s.el.dataset.ncPlace=a;const l=s.el.querySelector("[data-nc-index]");l&&(l.textContent=String(r).padStart(2,"0")),t.append(s.el),s.redraw()}),On(t)}function On(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}const e=[...t.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=e.some(o=>o.hasAttribute("data-nc-lead")),a=e.map(o=>o.hasAttribute("data-nc-slim")?i("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",a.join(" "));const s=e.filter(o=>!o.hasAttribute("data-nc-slim"));n&&e.length===4&&s.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}function go(){return new Promise(t=>{if(typeof requestAnimationFrame!="function"){setTimeout(t,0);return}requestAnimationFrame(()=>setTimeout(t,0))})}function Id(t=200){return new Promise(e=>{const n=globalThis.requestIdleCallback;typeof n=="function"?n(()=>e(),{timeout:t}):setTimeout(e,0)})}function Rd(t,e={}){const n=new Set,a=(async()=>{await go();for(const s of t)await Id(e.timeoutMs??200),s.build(),n.add(s)})();return{ready:s=>n.has(s),done:a,toJSON:()=>({built:n.size,total:t.length})}}function ba(){const t=globalThis.scheduler;return typeof t?.yield=="function"?t.yield():typeof MessageChannel!="function"?new Promise(e=>setTimeout(e,0)):new Promise(e=>{const n=new MessageChannel;n.port1.onmessage=()=>{n.port1.close(),e()},n.port2.postMessage(null)})}const Od="modulepreload",Bd=function(t){return"/rhythm/"+t},Ei={},Hd=function(e,n,a){let s=Promise.resolve();if(n&&n.length>0){let r=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=l?.nonce||l?.getAttribute("nonce");s=r(n.map(c=>{if(c=Bd(c),c in Ei)return;Ei[c]=!0;const d=c.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${p}`))return;const f=document.createElement("link");if(f.rel=d?"stylesheet":Od,d||(f.as="script"),f.crossOrigin="",f.href=c,u&&f.setAttribute("nonce",u),document.head.appendChild(f),d)return new Promise((g,w)=>{f.addEventListener("load",g),f.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(r){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=r,window.dispatchEvent(l),!l.defaultPrevented)throw r}return s.then(r=>{for(const l of r||[])l.status==="rejected"&&o(l.reason);return e().catch(o)})};var jd=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Bn=[.25,.5,.75,1,1.5,2],qd=4.9,_={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},xe={fmt:"wet"},ee={fmt:"pct"},Fe={fmt:"db"},Lt={fmt:"signedPct"},kn={fmt:"num",suffix:" ms"},P={div:100};function T(t,e,n,a,s,o,r,l){var u={key:t,label:e,min:n,max:a,default:s,step:1,k:o,unit:null,format:r};if(l)for(var c in l)u[c]=l[c];return u}function Ct(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var ct=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[T("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:_.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[T("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:_.hpHz,astrid:!0,zero:"off"}),T("q","Resonance",0,100,0,2,{fmt:"q",law:_.hpQ},{dsp:{law:_.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[T("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:_.bpHz,astrid:!0},{dsp:{law:_.bpHz}}),T("q","Q",0,100,0,2,{fmt:"q",law:_.bpQ},{dsp:{law:_.bpQ}}),T("mix","Mix",0,100,100,3,xe,{dsp:P,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[T("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Ct(jd),overriddenBy:"beats_free",tempoSynced:!0}),T("feedback","Feedback",0,90,35,2,ee,{dsp:P,unit:"%"}),T("mix","Wet/dry",0,100,0,3,xe,{dsp:P,unit:"%",astridKey:"wet"}),T("tone","Tone",0,100,100,4,{fmt:"hz",law:_.delayTone,offAt:100},{dsp:{div:99},more:!0}),T("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),T("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Ct([[0,"Insert"],[1,"Send"]]),more:!0}),T("send","Send",0,100,100,7,ee,{dsp:P,unit:"%",more:!0}),T("mod_send","Accent → send",-100,100,0,8,Lt,{dsp:P,unit:"%",more:!0}),T("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[T("predelay","Pre-delay",0,200,0,1,kn,{dsp:{div:1e3},unit:"ms"}),T("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:P,unit:"%"}),T("decay","Decay",0,100,50,3,ee,{dsp:P,unit:"%"}),T("damping","Damping",0,100,0,4,ee,{dsp:P,unit:"%"}),T("mix","Mix",0,100,0,5,xe,{dsp:P,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[T("rate","Rate",0,100,26,1,{fmt:"rate",law:_.rate},{dsp:{law:_.rate}}),T("depth","Depth",0,100,70,2,ee,{dsp:P,unit:"%"}),T("feedback","Feedback",-90,90,50,3,Lt,{dsp:P,unit:"%"}),T("mix","Mix",0,100,50,4,xe,{dsp:P,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[T("rate","Rate",0,100,52,1,{fmt:"rate",law:_.rate},{dsp:{law:_.rate}}),T("depth","Depth",0,100,50,2,ee,{dsp:P,unit:"%"}),T("spread","Spread",0,100,70,3,ee,{dsp:P,unit:"%"}),T("mix","Mix",0,100,40,4,xe,{dsp:P,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[T("rate","Rate",0,100,39,1,{fmt:"rate",law:_.rate},{dsp:{law:_.rate}}),T("depth","Depth",0,100,70,2,ee,{dsp:P,unit:"%"}),T("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Ct([[4,"4"],[6,"6"],[8,"8"]])}),T("feedback","Feedback",0,90,30,4,ee,{dsp:P,unit:"%"}),T("mix","Mix",0,100,50,5,xe,{dsp:P,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[T("low_db","Low",-18,18,0,1,Fe,{unit:"dB"}),T("mid_db","Mid",-18,18,0,2,Fe,{unit:"dB"}),T("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:_.midHz,astrid:!0},{dsp:{law:_.midHz}}),T("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:_.eqQ},{dsp:{law:_.eqQ}}),T("high_db","High",-18,18,0,4,Fe,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[T("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),T("output_db","Output",-12,12,0,2,Fe,{unit:"dB"}),T("mix","Mix",0,100,100,3,xe,{dsp:P,unit:"%"}),T("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Ct([[0,"Smooth"],[1,"Acid"]]),more:!0}),T("tone","Tone",0,100,100,5,{fmt:"hz",law:_.driveTone,offAt:100},{dsp:{div:99},more:!0}),T("mod_drive","Accent → drive",-100,100,0,6,Lt,{dsp:P,unit:"%",more:!0}),T("mod_tone","Accent → tone",-100,100,0,7,Lt,{dsp:P,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[T("threshold_db","Threshold",-60,0,0,1,Fe,{unit:"dB"}),T("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:_.ratio},{dsp:{law:_.ratio}}),T("attack_ms","Attack",1,100,10,3,kn,{unit:"ms"}),T("release_ms","Release",10,1e3,150,4,kn,{unit:"ms"}),T("makeup_db","Makeup",0,24,0,5,Fe,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[T("width","Width",0,200,100,1,ee,{dsp:P,unit:"%"}),T("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:P})]}],Ud=ct.map(function(t){return t.type});ct.filter(function(t){return!t.hidden}).map(function(t){return t.type});var Gd={reverb:"plate"};function ya(t){var e=Gd[t]||t;return Ud.indexOf(e)>=0?e:null}function pe(t){for(var e=ya(t),n=0;n<ct.length;n++)if(ct[n].type===e)return ct[n];return null}function Be(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function bo(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var a=Be(n.law,e);return a===null?0:a}function Si(t,e){return Math.min(qd,t*60/(e>0?e:120))}var Ai=function(t){return t>0?"+":t<0?"−":""};function Wd(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function yo(t,e,n){var a=t.format,s;switch(a.fmt){case"db":return e===0&&a.zero?a.zero:Ai(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return Ai(e)+Math.abs(e)+"%";case"num":return e+a.suffix;case"fixed":return(a.add+e/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&e>=a.offAt?"off":a.law?(s=Be(a.law,e),s===null?a.zero||"open":a.astrid?Wd(s):s+" Hz"):e===0&&a.zero?a.zero:e+" Hz";case"q":return"Q "+Be(a.law,e).toFixed(1);case"ratio":return Be(a.law,e).toFixed(1)+":1";case"rate":return s=Be(a.law,e),(s<1?s.toFixed(2):s<10?s.toFixed(1):s.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var o=0;o<t.options.length;o++)if(t.options[o].value===e)return t.options[o].label;return String(e);case"tempoMs":return Math.round(Si(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(Si(e,n)*1e3)+" ms"}return String(e)}var Kd=1,an=["drive","delay","plate"];function Vd(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(a,s){return yo(t,a,s)},e}var dt=an.map(function(t){var e=pe(t),n={type:t,label:e.label,dials:e.dials.map(Vd)};return e.tempoSynced&&(n.tempoSynced=!0),n}),Yd={reverb:"plate"};function Kt(t){var e=Yd[t]||t;return an.indexOf(e)>=0?e:null}function sn(t){for(var e=Kt(t),n=0;n<dt.length;n++)if(dt[n].type===e)return dt[n];return null}function wo(t,e){var n=sn(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}function Ye(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function we(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var a=t.options[0].value,s=1;s<t.options.length;s++)Math.abs(t.options[s].value-e)<Math.abs(a-e)&&(a=t.options[s].value);return a}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*o)/o))+0}function Xd(){return{v:Kd,chain:dt.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function Jd(t){return Bn.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},Bn[0])}function xn(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Qd(t){for(var e=Array.isArray(t)?t:xn(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),a=Xd(),s={},o=[],r=0;r<e.length;r++){var l=e[r];if(xn(l)){var u=Kt(l.type);if(!u){typeof l.type=="string"&&o.push(l.type);continue}if(s[u]){o.push(u);continue}s[u]=!0;var c=a.chain[an.indexOf(u)],d=xn(l.dials)?l.dials:{};u==="delay"&&d.mix===void 0&&d.wet!==void 0&&(d=Object.assign({},d,{mix:d.wet})),c.bypass=n?l.bypass===!0:l.bypass!==!1,sn(u).dials.forEach(function(p){c.dials[p.key]=we(p,d[p.key])}),Zd(u,c.dials,d)}}return{state:a,dropped:o}}function Zd(t,e,n){for(var a=sn(t),s=0;s<a.dials.length;s++){var o=a.dials[s];o.stepWhen&&(e[o.key]=we(o,n&&typeof n[o.key]=="number"?n[o.key]:e[o.key],Ye(o,e)))}}function Hn(t){return Qd(t).state}function eu(t){return JSON.parse(JSON.stringify(t))}var tu=24,jn={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function qn(t,e,n){if(e==="bypass")return n?0:1;var a=wo(t,e)||nu(t,e);return a?bo(a,n):0}function nu(t,e){var n=pe(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}var au={};dt.forEach(function(t){t.dials.forEach(function(e){au[t.type+"."+e.key]=e.format})});function $n(t,e){var n=new Float64Array(tu),a=Hn(t);return a.chain.forEach(function(s){var o=jn[s.type];n[o.bypass]=s.bypass?0:1,Object.keys(s.dials).forEach(function(r){n[o[r]]=qn(s.type,r,s.dials[r])})}),n}var iu=2,Vt=3,su=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function et(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function vo(t,e){var n=pe(t);if(!n)return null;var a={};(e||[]).forEach(function(r){r&&r.id&&(a[r.id]=!0)});for(var s=1;a[n.type+"-"+s];)s++;var o={};return n.dials.forEach(function(r){o[r.key]=r.default}),{id:n.type+"-"+s,type:n.type,bypass:!1,dials:o}}function ou(t){var e=pe(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function ru(t,e,n){var a=t.length-1,s=Math.max(0,Math.min(a,n));if(e<0||e>a||e===s)return t;var o=t.slice(),r=o.splice(e,1)[0];return o.splice(s,0,r),o}function lu(t){return typeof t=="number"&&isFinite(t)?Jd(t):t}function Ti(t,e,n){var a={};return t.dials.forEach(function(s){var o=e[s.key];o===void 0&&s.astridKey&&(o=e[s.astridKey]),n&&t.type==="delay"&&s.key==="delay_beats"&&(o=lu(o)),a[s.key]=we(s,o)}),t.dials.forEach(function(s){s.stepWhen&&(a[s.key]=we(s,typeof e[s.key]=="number"?e[s.key]:a[s.key],Ye(s,a)))}),a}function cu(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var a=t.min,s=1/0,o=t.min;o<=t.max;o++){var r=Be(n.law,o),l=r===null?1/0:Math.abs(r-e);l<s&&(s=l,a=o)}return a}}var du={rate:"rate_hz"};function uu(t,e,n,a){var s={};return t.dials.forEach(function(o){if(!o.more){var r=o.astridKey||du[o.key]||o.key;s[o.key]=cu(o,e[r])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),s}function pu(t,e){var n=e>0?Math.floor(e):Vt,a=[],s=[],o=[],r=!1,l=!1;Array.isArray(t)?(o=t,l=!0):et(t)&&Array.isArray(t.chain)&&(o=t.chain,r=t.v===1,l=t.schema===2);for(var u=[],c=0;c<o.length;c++){var d=o[c];if(et(d)&&!(d.type==="limiter"||d.fixed===!0)){var p=ya(d.type),f=p&&pe(p);if(!f||r&&["drive","delay","plate"].indexOf(p)<0){typeof d.type=="string"&&a.push(d.type);continue}if(u.length>=n){a.push(d.id||p);continue}var g;et(d.params)&&!et(d.dials)?g=Ti(f,uu(f,d.params,s,d.id||p),l):g=Ti(f,et(d.dials)?d.dials:{},l);var w=vo(p,u),b=typeof d.id=="string"&&su.test(d.id)&&!u.some(function(m){return m.id===d.id})?d.id:w.id,h=r?d.bypass!==!1:d.bypass===!0;u.push({id:r?w.id:b,type:p,bypass:h,dials:g})}}return{state:{v:iu,chain:u},dropped:a,notes:s}}function Ot(t,e){return pu(t,e).state}function ze(t){var e=pe(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(a){n.push([a.k,bo(a,t.dials[a.key])])}),n}function hu(t){var e=Ot(t,8),n=[],a=e.chain.map(function(s,o){var r=pe(s.type),l={};return o>=Vt&&n.push(s.id+": ASTRID keeps three hacks"),r.dials.forEach(function(u){var c=s.dials[u.key];if(u.more){c!==u.default&&n.push(s.id+"."+u.key);return}u.key==="delay_beats"&&Bn.indexOf(c)<0&&n.push(s.id+".delay_beats"),l[u.astridKey||u.key]=c}),{id:s.id,type:s.type,bypass:s.bypass,dials:l}});return{hacks:a,lossy:n}}var mu="nc-fx@1",fu=600,gu=256,bu=8,tt=typeof WeakMap=="function"?new WeakMap:null;function yu(t,e){var n=tt&&tt.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var a=(await Hd(async()=>{const{default:o}=await import("./worklet-source-Cg0XnXjY.js");return{default:o}},[])).default,s=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await t.audioWorklet.addModule(s)}finally{URL.revokeObjectURL(s)}})(),tt&&(tt.set(t,n),n.catch(function(){tt.delete(t)})),n)}function Pe(t,e){return typeof t=="number"&&isFinite(t)?t:e}function ko(t,e,n,a){var s=Math.min(400,Math.max(20,Pe(e.bpm,120))),o=[],r=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",u=Pe(e.preGain,1),c=Math.max(0,Pe(e.crossfade,.012)),d=Pe(e.maxDelaySeconds,void 0),p=t.createGain(),f=t.createGain(),g=t.createGain(),w=t.createGain(),b=null;e.modInput===!0&&(b=t.createGain(),b.channelCount=1,b.channelCountMode="explicit",b.channelInterpretation="discrete"),w.gain.value=0,p.connect(g),g.connect(f),w.connect(f);var h={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:s},m=n(s);h.post=function(x){h.node?h.node.port.postMessage(x):h.disposed||(o.length>=gu&&(o=a().concat([{t:"tempo",bpm:h.bpm,when:0}])),o.push(x))};function y(x){var S=o.map(function($){var A=Object.assign({},$);return A.when>x||(A.when=0,A.t!=="clear"&&(A.snap=!0)),A});return o=[],S}h.emit=function(x){for(var S=0;S<h.listeners.length;S++)try{h.listeners[S](x)}catch($){typeof console<"u"&&console.error($)}},h.whenOf=function(x){return typeof x=="number"&&isFinite(x)&&x>0?x:0};var k=!1;h.tooFar=function(x){return typeof x=="number"&&x>t.currentTime+fu?(!k&&typeof console<"u"&&(k=!0,console.warn("nc-fx: ignoring a time "+Math.round(x-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var E=yu(t,e.moduleUrl).then(function(){if(!h.disposed){var x=Object.assign({bpm:s,bypassMode:l,limiter:r,preGain:u,maxDelaySeconds:d},m);x.pending=y(t.currentTime),h.node=new AudioWorkletNode(t,mu,{numberOfInputs:b?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:x}),p.connect(h.node),b&&b.connect(h.node,0,1),h.node.connect(w);var S=t.currentTime;S<=0||c===0?(g.gain.value=0,w.gain.value=1):(g.gain.setValueAtTime(1,S),g.gain.linearRampToValueAtTime(0,S+c),w.gain.setValueAtTime(0,S),w.gain.linearRampToValueAtTime(1,S+c)),h.status="ready"}},function(x){h.status="unavailable",o=[],h.error=x});return h.core={input:p,output:f,modInput:b,ready:E,get status(){return h.status},get error(){return h.error},latencySamples:r==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:r,setTempo:function(x,S){var $=Pe(x,NaN);!($>0)||h.disposed||h.tooFar(S)||(h.bpm=Math.min(400,Math.max(20,$)),h.post({t:"tempo",bpm:h.bpm,when:h.whenOf(S)}),h.emit({effect:null,key:"tempo",value:h.bpm}))},getTempo:function(){return h.bpm},clear:function(x){var S=x&&typeof x=="object"?x:{at:x};if(!(h.disposed||h.tooFar(S.at))){var $=Pe(S.fadeMs,0);h.post({t:"clear",when:h.whenOf(S.at),fadeMs:$>0?Math.min(1e3,$):0})}},onChange:function(x){return h.listeners.push(x),function(){var S=h.listeners.indexOf(x);S>=0&&h.listeners.splice(S,1)}},dispose:function(){if(!h.disposed){if(h.disposed=!0,h.status="disposed",o=[],h.listeners.length=0,h.node){h.node.port.postMessage({t:"dispose"}),h.node.port.close();try{h.node.disconnect()}catch{}}[p,g,w,f,b].forEach(function(x){try{x&&x.disconnect()}catch{}})}}},h}function wu(t,e){var n=e||{};if(n.slots)return vu(t,n);var a=Hn(n.state),s=Array.from($n(a)),o=ko(t,n,function(){return{program:s}},function(){return[{t:"load",program:Array.from($n(a)),when:0}]}),r=o.core;function l(u){return a.chain[an.indexOf(u)]}return r.setParam=function(u,c,d,p){var f=Kt(u);if(!(!f||o.disposed||o.tooFar(p))){var g=l(f),w;if(c==="bypass")w=!!d;else{var b=wo(f,c);if(!b)return;w=we(b,d,Ye(b,g.dials))}return c==="bypass"?g.bypass=w:g.dials[c]=w,o.post({t:"p",i:jn[f][c],v:qn(f,c,w),when:o.whenOf(p)}),o.emit({effect:f,key:c,value:w}),sn(f).dials.forEach(function(h){if(!(!h.stepWhen||!h.stepWhen.some(function(k){return k.key===c}))){var m=g.dials[h.key],y=we(h,m,Ye(h,g.dials));y!==m&&(g.dials[h.key]=y,o.post({t:"p",i:jn[f][h.key],v:qn(f,h.key,y),when:o.whenOf(p)}),o.emit({effect:f,key:h.key,value:y}))}}),w}},r.getParam=function(u,c){var d=Kt(u);if(d){var p=l(d);return c==="bypass"?p.bypass:p.dials[c]}},r.getState=function(){return eu(a)},r.setState=function(u,c){o.disposed||o.tooFar(c&&c.at)||(a=Hn(u),o.post({t:"load",program:Array.from($n(a)),when:o.whenOf(c&&c.at)}),o.emit({effect:null,key:null,value:null}))},r}function vu(t,e){var n=e.slots===!0?Vt:Math.max(1,Math.min(bu,Math.floor(+e.slots)||Vt)),a=Ot(e.state,n),s=1,o={};function r(h){return o[h.id]||(o[h.id]=s++),o[h.id]}function l(h){return h.map(function(m){return{uid:r(m),type:m.type,program:ze(m)}})}var u=l(a.chain),c=a.chain.map(function(h){return o[h.id]}),d=ko(t,e,function(){return{slots:n,chain:u,order:c}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(h){return o[h.id]}),when:0}]}),p=d.core;function f(h){var m;for(m=0;m<a.chain.length;m++)if(a.chain[m].id===h)return a.chain[m];var y=ya(h);if(y){for(m=0;m<a.chain.length;m++)if(a.chain[m].type===y)return a.chain[m]}return null}function g(h,m){var y=r(h);d.post({t:"add",uid:y,type:h.type,when:m}),ze(h).forEach(function(k){d.post({t:"ps",uid:y,k:k[0],v:k[1],when:m,snap:!0})})}function w(h){d.post({t:"order",uids:a.chain.map(function(m){return o[m.id]}),when:h})}function b(h,m){var y={};a.chain.forEach(function(x){y[x.id]=x});var k=a.chain.map(function(x){return o[x.id]}).join();h.chain.forEach(function(x){var S=y[x.id];if(!S||S.type!==x.type){delete o[x.id],g(x,m);return}var $={};ze(S).forEach(function(A){$[A[0]]=A[1]}),ze(x).forEach(function(A){$[A[0]]!==A[1]&&d.post({t:"ps",uid:o[x.id],k:A[0],v:A[1],when:m})})});var E={};h.chain.forEach(function(x){E[x.id]=!0}),Object.keys(o).forEach(function(x){E[x]||delete o[x]}),a=h,a.chain.map(function(x){return o[x.id]}).join()!==k&&w(m)}return p.slots=n,p.setParam=function(h,m,y,k){var E=f(h);if(!(!E||d.disposed||d.tooFar(k))){var x=pe(E.type),S,$=null;if(m==="bypass")S=!!y;else{for(var A=0;A<x.dials.length;A++)x.dials[A].key===m&&($=x.dials[A]);if(!$)return;S=we($,y,Ye($,E.dials))}var N={},H={};ze(E).forEach(function(F){N[F[0]]=F[1]}),x.dials.forEach(function(F){F.stepWhen&&(H[F.key]=E.dials[F.key])}),m==="bypass"?E.bypass=S:E.dials[m]=S,x.dials.forEach(function(F){F.stepWhen&&(E.dials[F.key]=we(F,E.dials[F.key],Ye(F,E.dials)))});var K=d.whenOf(k),me=o[E.id];return ze(E).forEach(function(F){(N[F[0]]!==F[1]||$&&F[0]===$.k)&&d.post({t:"ps",uid:me,k:F[0],v:F[1],when:K})}),d.emit({effect:E.id,key:m,value:S}),Object.keys(H).forEach(function(F){F!==m&&E.dials[F]!==H[F]&&d.emit({effect:E.id,key:F,value:E.dials[F]})}),S}},p.getParam=function(h,m){var y=f(h);if(y)return m==="bypass"?y.bypass:y.dials[m]},p.getState=function(){return JSON.parse(JSON.stringify(a))},p.setState=function(h,m){d.disposed||d.tooFar(m&&m.at)||(b(Ot(h,n),d.whenOf(m&&m.at)),d.emit({effect:null,key:null,value:null}))},p.addEffect=function(h,m){var y=m||{},k=vo(h,a.chain);if(!(!k||a.chain.length>=n||d.disposed||d.tooFar(y.at))){if(y.dials){var E=Ot({v:2,chain:[{id:k.id,type:k.type,dials:y.dials}]},1).chain[0];k.dials=E.dials}y.bypass===!0&&(k.bypass=!0);var x=a.chain.slice(),S=typeof y.index=="number"?Math.max(0,Math.min(x.length,y.index)):x.length;return x.splice(S,0,k),b({v:2,chain:x},d.whenOf(y.at)),d.emit({effect:k.id,key:"chain",value:"add"}),k.id}},p.removeEffect=function(h,m){var y=f(h),k=m&&m.at;return!y||d.disposed||d.tooFar(k)?!1:(b({v:2,chain:a.chain.filter(function(E){return E!==y})},d.whenOf(k)),d.emit({effect:y.id,key:"chain",value:"remove"}),!0)},p.moveEffect=function(h,m,y){var k=f(h),E=y&&y.at;if(!k||d.disposed||d.tooFar(E))return!1;var x=ru(a.chain,a.chain.indexOf(k),m);return x===a.chain?!1:(b({v:2,chain:x},d.whenOf(E)),d.emit({effect:k.id,key:"chain",value:"move"}),!0)},p.getChain=function(){return a.chain.map(function(h){return{id:h.id,type:h.type,name:ou(h),bypass:h.bypass}})},p.toAstrid=function(){return hu(a)},p}const ku="/rhythm/assets/worklet-CnpUVY5i.js",qe="petra-rhythm.state",xo=2,$o=new Set([1,xo]),Eo=400,xu=2e3;function $u(t){return JSON.stringify({v:xo,doc:t.doc,bank:t.bank,selectedTrack:t.selectedTrack})}function Eu(t,e,n){return!e||typeof e!="object"?null:Ss(t,n?{...e,engine:void 0,deep:void 0}:e)}function So(t){if(!t)return null;let e;try{e=JSON.parse(t)}catch{return null}if(!e||!$o.has(e.v))return null;const n=e.v===1,a=mt(n&&e.doc&&typeof e.doc=="object"?{...e.doc,version:1}:e.doc);if(!a.ok||!a.document)return null;const s=a.document,o=e.bank;if(!o||!Array.isArray(o.slots)||o.slots.length!==re)return null;const r=[];for(const p of o.slots){if(p===null){r.push(null);continue}const f=Eu(s,p,n);if(!f)return null;r.push(f)}const l=Number.isInteger(o.active)&&r[o.active]?o.active:null,u=e.selectedTrack,c=e.doc.tracks??[],d=Number.isInteger(u)&&u>=0&&u<c.length?Ml(c,s.tracks,u):0;return{doc:s,bank:{slots:r,active:l},selectedTrack:d}}function Su(t,e,n=Eo,a=qe){let s,o=0,r="";const l=()=>{clearTimeout(s),s=void 0,o=0;try{const u=$u(e());if(u===r)return;t.setItem(a,u),r=u}catch{}};return{schedule(){const u=Date.now();o||(o=u),clearTimeout(s),s=setTimeout(l,Math.min(n,Math.max(0,o+xu-u)))},flush:l}}function Au(t,e,n=qe){if(new URLSearchParams(e).has("fresh"))return null;let a;try{a=t.getItem(n)}catch{return null}if(!a||So(a)!==null)return null;let s=null;try{s=JSON.parse(a)}catch{}return s!==null&&typeof s=="object"&&(!$o.has(s.v)||mt(s.doc).errors[0]===_t||Array.isArray(s.bank?.slots)&&s.bank.slots.some(r=>r!==null&&typeof r=="object"&&mt({...s?.doc,...r}).errors[0]===_t))?`Couldn't open your last session: ${_t}`:"Couldn't open your last session: it is malformed"}function Tu(t,e,n=qe){if(new URLSearchParams(e).has("fresh"))return null;try{return So(t.getItem(n))}catch{return null}}const En={maker:"PETRA",instrument:"RHYTHM",number:"01"},Mu="PETRA Rhythm";let Mi=!1;function Lu(){return`
.petra-head-name {
  margin: 0;
  font-size: ${i("rhythm.brand-size")};
  font-weight: ${i("rhythm.brand-weight")};
  letter-spacing: ${i("rhythm.brand-tracking")};
}
.petra-head-sep { color: ${i("text-sub")}; }
.petra-head-num { font-family: ${i("font-readout")}; }
.petra-head-line {
  margin: ${i("rhythm.brand-sub-gap")} 0 0;
  font-size: ${i("rhythm.brand-sub-size")};
  color: ${i("text-sub")};
}
/* The ⋯ menu (Bass's header menu): Save, Load, New. Phone: a 44 px ⋯ that opens a small panel.
   Desktop: the buttons sit inline in the header and the ⋯ hides. */
/* The frame (gutters, padding, the divider under the header) is the kit's .nc-page-hd, as in ASTRID. */
/* The kit's title band isolates the header (nc-ui 6884367: position relative, isolation: isolate), so the ⋯ panel's
   z-index only counts inside it; lifting the header over the page body keeps the open panel above the modules. */
.petra-head { position: relative; z-index: 20; }
.petra-head-title { flex: 1 1 auto; min-width: 0; }
.petra-menu > summary {
  list-style: none;
  display: grid;
  place-items: center;
  min-width: ${i("target-min")};
  min-height: ${i("target-min")};
  color: ${i("text-sub")};
  cursor: pointer;
}
.petra-menu > summary::-webkit-details-marker { display: none; }
.petra-menu > summary svg { width: calc(${i("target-min")} / 2.75); height: calc(${i("target-min")} / 2.75); fill: currentColor; }
.petra-menu-body {
  position: absolute;
  right: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  padding: ${i("control-gap")};
  background: ${i("surface-page")};
  border: ${i("hairline")} solid ${i("text-sub")};
  border-radius: ${i("slot-radius")};
}
.petra-menu-body button {
  min-height: ${i("target-min")};
  padding: 0 ${i("module-pad")};
  border: 0;
  background: transparent;
  color: ${i("text")};
  font-family: ${i("font-ui")};
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  text-align: left;
  cursor: pointer;
}
.petra-menu-body button:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; }
@media (min-width: 1024px) {
  .petra-menu > summary { display: none; }
  .petra-menu-body { position: static; flex-direction: row; padding: 0; border: 0; background: transparent; }
  .petra-menu-body button { color: ${i("text-sub")}; padding: 0 ${i("module-gap")}; }
  /* The last word sits on the page gutter, as ASTRID's header does. */
  .petra-menu-body button:last-of-type { padding-inline-end: 0; }
  .petra-menu-body button:hover { color: ${i("text")}; }
}
`}function Cu(t){const e=t.ownerDocument;if(!Mi){const c=e.createElement("style");c.dataset.petraHead="",c.textContent=Lu(),e.head.append(c),Mi=!0}const n=e.createElement("header");n.className="nc-page-hd petra-head";const a=e.createElement("h1");a.className="petra-head-name";const s=()=>{const c=e.createElement("span");return c.className="petra-head-sep",c.textContent="/",c},o=e.createElement("span");o.className="petra-head-num",o.textContent=En.number;const r=e.createElement("span");r.className="petra-head-maker",r.style.color=i("instrument-petra"),r.textContent=En.maker,a.append(r," ",s(),` ${En.instrument} `,s()," ",o);const l=e.createElement("p");l.className="petra-head-line",l.textContent="A NetComposer element.";const u=e.createElement("div");return u.className="petra-head-title",u.append(a,l),n.append(u),t.before(n),n}function Nu(t,e){const n=t.ownerDocument,a=n.createElement("details");a.className="petra-menu";const s=n.createElement("summary");s.setAttribute("aria-label","Menu"),s.innerHTML='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6.5h3v3H2zM6.5 6.5h3v3h-3zM11 6.5h3v3h-3z"/></svg>';const o=n.createElement("div");o.className="petra-menu-body";const r=n.createElement("input");r.type="file",r.accept=".rhythm,.json,application/json",r.hidden=!0,r.addEventListener("change",async()=>{const d=r.files?.[0];r.value="",d&&e.load(await d.text(),d.name)});const l=(d,p)=>{const f=n.createElement("button");return f.type="button",f.textContent=d,f.dataset.petraMenu=d.toLowerCase(),f.addEventListener("click",()=>{p(),u||(a.open=!1)}),f};o.append(l("Save",e.save),l("Load",()=>r.click()),l("New",e.create),...e.panic?[l("Panic",e.panic)]:[],r),a.append(s,o),t.append(a);let u=null;const c=()=>{const d=getComputedStyle(s).display==="none";d!==u&&(a.open=d),u=d};return window.addEventListener("resize",c),c(),a}const Li=t=>`${Math.round(t*100)}%`;function Ci(t,e){if(t==="tune"){const n=Math.round(e*10)/10;return n===0?"0 st":`${n>0?"+":"−"}${Math.abs(n)} st`}if(t==="noise"){const n=Math.round(e*100)/100;return n===0?"0 oct":`${n>0?"brighter":"darker"} ${Math.abs(n).toFixed(2)} oct`}if(t==="level"){if(e<=.001)return"off";const n=20*Math.log10(e),a=Math.round(n*10)/10;return a===0?"0 dB":`${a>0?"+":"−"}${Math.abs(a).toFixed(1)} dB`}return t==="drive"&&e<=0?"clean":Li(e)}const Fu={tune:"Tune",decay:"Decay",body:"Body",snap:"Snap",noise:"Noise",sizzle:"Sizzle",drive:"Drive",level:"Level"};function Nt(t,e){return Math.abs(t-e)<.5?"off":t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)} kHz`:`${Math.round(t)} Hz`}const Bt=8,ut=72,wa=240,va=.03,zu=4,Ao=wa/Math.log1p(zu/va),Un=t=>t>0?Math.log1p(t/va)*Ao:0,Pu=t=>va*Math.expm1(t/Ao),$e=(t,e,n)=>t<0?0:t<e?t/e:Math.exp(-(t-e)/n);function _u(t,e,n=96){const a=e.decay,s=t.len*(a>1?a:1),o=[];let r=0;for(let l=0;l<=n;l++){const u=Pu(l/n*wa);let c=0;const d=t.body;if(d){const g=d.a??5e-4,w=u<g?u/g:(1-(d.mix??0))*Math.exp(-(u-g)/(d.d1*a))+(d.mix??0)*Math.exp(-(u-g)/((d.d2??d.d1)*a));c+=w*d.lvl*e.body,d.second&&(c+=$e(u,5e-4,d.second.d*a)*d.second.lvl*e.body)}t.click&&(c+=$e(u,2e-4,t.click.d)*t.click.lvl*e.snap*.5),t.noise&&(c+=$e(u,t.noise.a??5e-4,t.noise.d*a)*t.noise.lvl*.5),t.noise2&&(c+=$e(u,t.noise2.a??5e-4,t.noise2.d*a)*t.noise2.lvl*e.sizzle*.5),t.metal&&(c+=$e(u,3e-4,t.metal.d*a)*t.metal.lvl*e.sizzle*.33);const p=t.clap;if(p){let g=0;for(let w=0;w<p.bursts;w++)g+=$e(u-w*p.gap,3e-4,p.bd)*(w===p.bursts-1?1:.8)*e.snap;g+=$e(u-p.bursts*p.gap,.002,p.tail*a)*.6,c+=g*p.lvl*.5}const f=s-u;f<=0?c=0:f<.08&&(c*=f/.08),o.push([u,c]),c>r&&(r=c)}if(r>0)for(const l of o)l[1]/=r;return o}const Du="http://www.w3.org/2000/svg";function _e(t,e={}){const n=document.createElementNS(Du,t);for(const[a,s]of Object.entries(e))n.setAttribute(a,s);return n}const Iu=t=>Math.round((ut-Math.max(0,Math.min(1,t))*(ut-Bt))*100)/100;function Ru(t){return t.map(([e,n],a)=>`${a?"L":"M"}${Math.round(Un(e)*100)/100},${Iu(n)}`).join(" ")}const Ou=[[.01,"10 ms"],[.1,"100 ms"],[1,"1 s"]],Bu=t=>t<1?`${Math.round(t*1e3)} ms`:`${Number(t.toFixed(1))} s`;function Hu(t){const e=document.createElement("div");e.className="petra-deep-env",e.dataset.petraDeep="envelope";const n=_e("svg",{viewBox:"-1 0 242 88",preserveAspectRatio:"none",role:"button",tabindex:"0","data-testid":"deep-envelope"}),a="non-scaling-stroke",s=c=>_e("line",{class:"petra-deep-grid",x1:"0",x2:String(wa),y1:String(c),y2:String(c),"vector-effect":a}),o=Ou.map(([c,d])=>{const p=String(Math.round(Un(c)*100)/100),f=_e("line",{class:"petra-deep-guide",x1:p,x2:p,y1:String(Bt),y2:String(ut),"vector-effect":a}),g=_e("text",{class:"petra-deep-label",x:p,y:"86","text-anchor":"middle"});return g.textContent=d,[f,g]}),r=_e("line",{class:"petra-deep-end",y1:String(Bt),y2:String(ut),"vector-effect":a}),l=_e("path",{class:"petra-deep-curve",fill:"none","stroke-linejoin":"round","vector-effect":a});n.append(s(Bt),s(ut),...o.flat(),r,l),e.append(n),n.addEventListener("click",t),n.addEventListener("keydown",c=>{c.key!=="Enter"&&c.key!==" "||(c.preventDefault(),t())});let u="";return{el:e,set(c,d,p){const f=_u(c,d),g=Ru(f),w=c.len*(d.decay>1?d.decay:1);let b=w;for(const[y,k]of f)y>.001&&k>.0316&&(b=y);b=Math.min(b,w);const h=`${g}|${p}`;if(h===u)return;u=h,l.setAttribute("d",g);const m=String(Math.round(Un(b)*100)/100);r.setAttribute("x1",m),r.setAttribute("x2",m),n.setAttribute("aria-label",`${p}'s loudness over time: heard for about ${Bu(b)}. Click to hear it.`)}}}function ju(t){const e=document.createElement("div");e.className="petra-kit",e.dataset.petraDeep="kit";const n=document.createElement("div");n.className="petra-kit-row";const a=document.createElement("output");a.className="petra-kit-name",a.setAttribute("aria-live","polite"),a.dataset.testid="deep-kit-name";const s=document.createElement("output");s.className="petra-kit-line";let o="808";const r=(l,u,c,d)=>{const p=document.createElement("button");return p.type="button",p.className="petra-kit-step",p.dataset.petraHelp=d,p.setAttribute("aria-label",c),p.textContent=u,p.addEventListener("click",()=>{const f=at.indexOf(o),g=at[(f+l+at.length)%at.length];g&&t(g)}),p};return n.append(r(-1,"‹","Previous kit","kit-prev"),a,r(1,"›","Next kit","kit-next")),e.append(n,s),{el:e,set(l,u){o=l;const c=qt[l];a.textContent=c.name,s.textContent=u?`Edited · ${c.line}`:c.line}}}function Ni(t,e,n){const a=t.querySelector(`[data-nc-id="${e}"]`);return a?(a.nextElementSibling!==n&&a.after(n),!0):(n.remove(),!1)}let Fi=!1;function qu(){return`
:root { --petra-deep-curve: ${i("text")}; }
.petra-kit-row {
  display: flex;
  align-items: center;
  gap: ${i("control-gap")};
  max-width: calc(${i("slot-span")} * 5);
  margin-inline: auto;
}
.petra-kit-step {
  flex: none;
  inline-size: calc(${i("target-min")} * 0.75);
  block-size: calc(${i("target-min")} * 0.75);
  padding: 0;
  border: ${i("hairline")} solid ${i("divider")};
  border-radius: ${i("slot-radius")};
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: ${i("body-size")};
  line-height: 1;
  cursor: pointer;
}
.petra-kit-step:hover { border-color: ${i("text-sub")}; }
.petra-kit-step:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
@media (pointer: coarse) {
  .petra-kit-step { inline-size: ${i("target-min")}; block-size: ${i("target-min")}; }
}
.petra-kit-name {
  flex: 1;
  min-width: 0;
  text-align: center;
  font-size: ${i("tab-size")};
  font-weight: ${i("label-weight")};
}
.petra-kit-line {
  display: block;
  margin-top: ${i("control-gap")};
  text-align: center;
  font: ${i("readout-size-small")} ${i("font-readout")};
  color: ${i("text-sub")};
}
.petra-deep-env svg {
  display: block;
  width: 100%;
  height: calc(${i("slot-span")} * 1.6);
  overflow: visible;
  cursor: pointer;
}
.petra-deep-env svg:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("control-gap")}; }
.petra-deep-grid, .petra-deep-guide, .petra-deep-end { stroke: ${i("divider")}; stroke-width: ${i("grid-stroke")}; }
.petra-deep-guide, .petra-deep-end { stroke-dasharray: 2 3; }
.petra-deep-end { stroke: ${i("text-sub")}; }
.petra-deep-curve { stroke: var(--petra-deep-curve); stroke-width: ${i("curve-stroke")}; }
.petra-deep-label { fill: ${i("text-sub")}; font: ${i("readout-size-small")} ${i("font-readout")}; }
@media (min-width: 1024px) {
  .nc-panel-body > .nc-group[data-nc-id="deep-more"] > .nc-group-body,
  .nc-panel-body > .nc-group[data-nc-id="deep-kit-more"] > .nc-group-body { column-gap: ${i("module-pad-x-desktop")}; }
}
`}function Uu(t=document){if(Fi)return;const e=t.createElement("style");e.dataset.petraDeep="",e.textContent=qu(),t.head.append(e),Fi=!0}const Ht={brand:"PETRA Rhythm, a drum machine and one of the NetComposer instruments. Open with the others, it plays on their clock.",menu:"Save, Load, New and Panic.","menu:save":"Downloads the pattern and all 10 slots as a .rhythm file you can load again later.","menu:load":"Opens a .rhythm file, replacing the pattern and all 10 slots. Undo in the message that follows brings back what was there.","menu:new":"Starts over with the default kit, every lane empty and every slot cleared. Undo in the message that follows brings it back.","menu:panic":"Silences every sound that is still ringing, at once. The beat keeps playing.","module:transport":"Starts and stops the beat, sets its speed and swing, and holds the 10 pattern slots.","module:pattern":"The drum pattern: one lane per drum, one square per 16th note. Click squares to add hits; click a drum's name to shape its sound.","module:filter":"Effects on the whole kit, in this order: Filter, Drive, Compressor. They are saved with the pattern and its slots.",hide:"Folds this module down to a slim bar to save room. Press again to open it.",index:"This module's number on the page.",slim:"This module is folded away. Click to open it again.",play:"Starts and stops the beat; Space does the same. When it reads Tap to join, the beat is already playing: tap and you come in on the next bar.",surprise:"Fills all 10 slots with new grooves and plays the first. Undo (or Cmd/Ctrl+Z) puts everything back.",bpm:"The speed of the beat in beats per minute (BPM), from 40 to 240. Higher is faster.",tap:"Tap this in time with the music, two taps or more, and Tempo follows your taps.",swing:"Pushes every second 16th note later for a shuffled, laid-back feel. 50% is straight; higher swings harder, up to 75%.","petra-presets":"The ten slots, folded away until you open them; the line says how many hold a pattern and which is playing. Keys 1 to 0 recall a slot either way.","transport-more":"On a phone, Swing (and the Sync line, with another tab open) folds away; the line shows them. Tap to show or hide it.","moves-more":"On a phone, the pattern moves (Shift, Groove, Hits) fold away; the line names the lane they act on. Tap to show or hide them.","params-more":"On a phone, the drum's three shaping sliders fold away under one line with their values. Tap to show or hide them.","hacks-more":"On a phone, Drive, Compressor and the meter fold away under the Filter; the line says which are on. Tap to show them.","swing-note":"Whose swing this tab plays. Join the beat (Tap to join or Play) to follow the leading tab's swing; Save then stores it in a slot.",role:"With other NetComposer tabs open, one leads the shared tempo and clock and the others follow it. This tab's part is shown here.",slots:"Ten pattern slots. Click a saved one to play it (while playing, it switches on the next bar); Shift-click or long-press saves, Option-click clears.","slots@touch":"Ten pattern slots. Tap a saved one to play it (while playing, it switches on the next bar); long-press to save or clear.","slot-save":"Saves the pattern as it is now into this slot.","slot-clear":"Empties this slot. Undo in the message that follows puts it back.",morph:"How long a slot change glides from the old sound to the new one. 0 s switches at once.","tool-note":"In Note mode, clicking a square adds or removes a hit. Long-press a square to set its velocity and chance.","tool-note@touch":"In Note mode, tapping a square adds or removes a hit. Long-press a square to set its velocity and chance.","tool-accent@touch":"In Accent mode, tapping a square adds or removes an accent, a louder hit. An empty square gets the hit too.","tool-accent":"In Accent mode, clicking a square adds or removes an accent, a louder hit (an empty square gets the hit too). Shift-click does this in Note mode.",fill:"Hold it for a fill over the last beat: a snare roll, tom answers, the closed hat drops out. Let go and the pattern is as it was.",clear:"Turns every square off on every lane; the sounds and lengths stay. Undo takes it back.",mute:"Mute: silences this lane. Press again to hear it.",solo:"Solo: plays only the soloed lanes. Solo more than one to hear them together.",lane:"Click to shape its sound below; Shift- or Cmd-click adds it to the lanes Moves act on.","lane@touch":"Tap to shape its sound below; long-press adds it to the lanes Moves act on.","drum@kick":"Kick drum, the low thump.","drum@snare":"Snare drum, the crack on the backbeat.","drum@clap":"Hand clap, a quick burst of noise.","drum@rim":"Rimshot, a short knock.","drum@hat":"Closed hi-hat, a short tick that cuts the open hat short.","drum@hatOpen":"Open hi-hat, a longer sizzle that a closed-hat hit cuts short.","drum@ride":"Ride cymbal, a stick's tick on a long wash that nothing cuts short.","drum@crash":"Crash cymbal, a bright splash with a long tail that nothing cuts short.","drum@tom":"Tom, a pitched drum.","drum@metal":"Metal, a clanging, bell-like hit.","drum@shaker":"Shaker, beads in a shell.",length:"Drag to set how many steps this lane plays before it starts over. A shorter lane drifts against the others for shifting patterns.",dice:"New steps for this lane only; its sound and length stay. Undo takes it back.","pads-prev":"Shows the previous lane on the pads.","pads-next":"Shows the next lane on the pads.","pads-lane":"The lane on the pads. Tap it, then tap a pad to set where the lane ends; tap it again when done.","moves:shift":"Moves the selected lanes' hits together, wrapping round the end. Shift-click lane names to move several at once.","moves:shift@touch":"Moves the selected lanes' hits together, wrapping round the end. Long-press lane names to move several at once.","moves:groove":"Moves the accents and velocities from hit to hit; the hits stay where they are.","moves:hits":"Trades hits between the selected lanes, or nudges a few so the part evolves.","move:shift-left":"Every hit one step earlier; the first wraps round to the end.","move:shift-right":"Every hit one step later; the last wraps round to the start.","move:shift-random":"Shifts by a random number of steps, every selected lane by the same amount.","move:reverse":"Plays the selected lanes backwards.","move:groove-left":"Each hit takes the next hit's accent and velocity.","move:groove-right":"Each hit takes the previous hit's accent and velocity.","move:shuffle":"Trades hits between the selected lanes, step by step. Select two lanes or more first.","move:mutate":"Moves or adds one or two hits on each selected lane, so the part evolves.","edit-step":"The step you are editing. Long-press another square to edit that one.","edit-velocity":"How hard this step hits. Lower is softer.","edit-chance":"How often this step plays: 100% every time, 50% about every other time. Steps under 100% show dimmed.","edit-done":"Closes the step editor.","section:parameters":"The sound of the selected lane. Click a drum's name in the grid to pick another.","panel-subject":"The lane these sliders shape. Click another drum's name in the grid to switch.",tune:"The drum's pitch in hertz (Hz, vibrations per second). Lower is deeper; higher is tighter.","tune@kick":"The pitch the kick settles on, in hertz (Hz, vibrations per second). Lower is deeper and boomier; higher is punchier.","tune@tom":"The pitch the tom settles on, in hertz (Hz, vibrations per second). Lower is a deep floor tom; higher is a small tom.","tune@snare":"The pitch of the snare's ringing body under the noise, in hertz (Hz). Lower is deeper; higher is tighter.","tune@rim":"The pitch of the rimshot's knock, in hertz (Hz). Lower is woodier; higher is sharper.","tune@clap":"A clap has no pitched body, so Tune does nothing on this lane.","tune@hat":"The pitch of the hat's metallic ring, in hertz (Hz). Lower is darker and trashier; higher is thinner.","tune@hatOpen":"The pitch of the hat's metallic ring, in hertz (Hz). Lower is darker and trashier; higher is thinner.","tune@metal":"The pitch of the clang, in hertz (Hz). Lower is a deep gong; higher is a small bell.",decay:"How long each hit rings before it fades. Short is tight; long rings on.","decay@kick":"How long the kick booms, and how slowly its pitch falls. Short is a tight thud; long is a deep boom.","decay@tom":"How long the tom rings, and how slowly its pitch falls. Short is a thud; long rings on.","decay@hatOpen":"How long the open hat sizzles; it rings far longer than the closed hat at the same setting. A closed-hat hit still cuts it short.",tone:"How bright the hit is. Lower is darker; higher is brighter.","tone@kick":"How bright the click at the start of each hit is. Lower is softer; higher is sharper.","tone@tom":"How bright the click at the start of each hit is. Lower is softer; higher is sharper.","tone@snare":"How bright the noise is. Lower is dull and dark; higher is crisp.","tone@clap":"How bright the noise is. Lower is dull and dark; higher is crisp.","tone@rim":"How bright the noise is. Lower is dull and dark; higher is crisp.","tone@hat":"How full the metal sounds. Lower keeps only a thin top sizzle; higher lets more of the ring through.","tone@hatOpen":"How full the metal sounds. Lower keeps only a thin top sizzle; higher lets more of the ring through.","tone@metal":"How much the clang rings with extra overtones. Lower is a purer tone; higher is harsher.",snap:"How sharp the start of each hit is. More is punchier.","snap@kick":"How far the pitch drops at the start of each hit, plus the click. More is punchier; 0 is a soft, round tone.","snap@tom":"How far the pitch drops at the start of each hit, plus the click. More is punchier; 0 is a soft, round tone.","snap@snare":"Noise rattle against the drum's body. More is a noisier crack; less is more tone.","snap@rim":"Noise against the knock's body. More is a noisier click; less is more tone.","snap@clap":"How tight the clap's bursts are and how much noise they carry. More is a tighter, snappier clap.","snap@hat":"How much hiss mixes in with the metal. More is noisier and breathier.","snap@hatOpen":"How much hiss mixes in with the metal. More is noisier and breathier.","snap@metal":"Moves the clang's overtones for a different metallic colour. Try a few settings to hear each one.",drive:"Saturation on this drum alone. More is fatter and grittier; 0 is clean.",level:"How loud this lane is. Turn it down to sit it back in the mix.","shaker-tune":"The shell's resonance in hertz (Hz, vibrations per second). Lower is a bigger, darker shaker; higher is smaller and brighter.","shaker-decay":"How long each shake rings after its peak. Short is a tight tick; long is a smoother swish.","shaker-tone":"How bright and ringing the shell is. Higher is brighter and thinner; lower is softer.","shaker-snap":"How many beads: few is a coarse, ticking cabasa, many is a dense, soft egg shaker.","shaker-drive":"How quickly each stroke swells in. Short is a sharp chick; long is a soft swish.","shaker-level":"How loud the shaker is. Turn it down to sit it back in the mix.","ride-tune":"The ride's tone, from darker to brighter, in kilohertz (kHz). The wash darkens from there as it fades.","ride-decay":"About how long the ride rings, in seconds, until it has faded away. Short is a tight ping; long is a big ride.","ride-tone":"How loud the smooth wash is under the click. Lower is a dry tick; higher is washier.","ride-snap":"How hard the stick's click is. More is a clearer ping on every beat.","ride-drive":"Saturation on the ride alone. More is grittier; 0 is clean.","ride-level":"How loud the ride is. It keeps time, so it usually sits under the kit.","crash-tune":"The crash's tone, from darker to brighter, in kilohertz (kHz). The tail darkens from there as it fades.","crash-decay":"About how long the crash rings, in seconds, until it has faded away. Short is a quick splash; long is a big crash.","crash-tone":"How loud the long wash is after the burst. Lower is a short splash; higher is a big, washy crash.","crash-snap":"How hard the crash's first burst is. More is a sharper accent.","crash-drive":"Saturation on the crash alone. More is grittier; 0 is clean.","crash-level":"How loud the crash is. It is an accent, so it usually sits on top.","section:sound":"The whole kit's sound: which engine plays, and in Deep the kit and its character. The pattern stays as it is.",engine:"Classic is PETRA's original drum voices. Deep is noise-first drums with more snap and sizzle, in four kits; each engine keeps its own settings.","deep-kit":"The Deep kit: 808, Lo-fi, Linn or Minimal. Choosing one sets every drum and the character to that kit's sound.","sound-subject":"The engine playing, and in Deep the kit.","kit-prev":"The previous Deep kit. Every drum and the character take its sound.","kit-next":"The next Deep kit. Every drum and the character take its sound.","deep-room":"A small room around the whole kit. 0 is dry; more is a bigger, wetter space.","deep-grit":"Bit and sample-rate crush on the whole kit, for an old sampler's grit. 0 is clean.","deep-hiss":"Tape hiss and vinyl crackle under the kit while it plays. 0 is silent.","deep-kit-more":"Saturation and the kit's low and high cut. The line shows their settings.","deep-sat":"Warm saturation on the whole kit. 0 is off; more is fatter and louder.","deep-lowCut":"Takes the rumble below this pitch out of the whole kit. All the way down is off.","deep-highCut":"Takes the top above this pitch off the whole kit, for a darker sound. All the way up is off.","deep-env":"How the selected drum's loudness falls over time, on a stretched time scale. Click it to hear the drum.","deep-tune":"The pitch of the drum's tone and ring, in semitones. Lower is deeper.","deep-tune@kick":"The kick's pitch, in semitones. Lower is a deeper thump; higher is tighter.","deep-tune@tom":"The tom's pitch, in semitones. Lower is a floor tom; higher is a small tom.","deep-decay":"How long the drum rings. 100% is the kit's own; lower is tighter, higher rings on.","deep-body":"How much of the drum's tone sounds under the noise. Lower is more noise and snap; higher is rounder.","deep-snap":"How hard the attack clicks. More is a sharper, punchier start.","deep-snap@clap":"How sharp the clap's quick bursts are. More is a snappier clap.","deep-noise@ride":"The ride's tone, from darker to brighter: the click, the wash and how it darkens all move together, with no pitch.","deep-noise@crash":"The crash's tone, from darker to brighter: the burst, the wash and how it darkens all move together, with no pitch.","deep-decay@ride":"How long the ride's wash rings on. 100% is the kit's own; lower is a tight ping, higher a big wash.","deep-decay@crash":"How long the crash's tail rings on. 100% is the kit's own; lower is a quick splash, higher a long wash.","deep-snap@ride":"How loud the stick's tick is on top of the wash. More is a clearer ping.","deep-snap@crash":"How hard the crash's first splash is. More is a bigger hit.","deep-noise":"The colour of the drum's noise, in octaves. Brighter moves it up; darker moves it down.","deep-sizzle":"How much high sizzle sits on the drum. More is brighter and airier.","deep-drive":"Saturation on this drum alone. More is fatter and grittier; clean is none.","deep-level":"How loud this drum is in the kit, in decibels (dB). 0 dB is the kit's own.","deep-more":"The drum's Body, Noise colour and Drive. The line shows their settings.","hack:hack-filter":"A filter on the whole kit: it takes away part of the sound to make it darker or thinner.","hack:hack-drive":"Saturation on the whole kit for warmth and grit. It also tames the loudest peaks.","hack:hack-compressor":"Evens out the loud and quiet parts of the kit for a tighter, punchier sound.","hack-switch":"Turns this effect on or off. Off, the sound passes through untouched and the settings are kept.",more:"More settings for this effect.",mode:"Low pass keeps the lows and cuts the highs; High pass does the opposite. Band pass keeps only a band around Cutoff.",cutoff:"Where the filter cuts, in hertz (Hz). In Low pass, lower is darker and all the way up is open; in High pass, higher is thinner.",resonance:"Boosts the sound right at the Cutoff for a sharper, ringing edge. 0 is smooth.",curve:"A picture of the filter: low pitches on the left, high on the right. Where the line is high the sound passes; where it drops, it is cut.",meter:"How loud the kit is right now, after the Hacks.","hack-drive-drive_db":"How hard the sound is pushed into saturation, in decibels (dB). More is grittier; 0 is clean.","hack-drive-output_db":"The level after the drive, in decibels (dB). Use it to match the loudness with Drive on and off.","hack-drive-mix":"The blend of driven and clean sound. 100% is all driven; lower mixes the clean kit back in.","hack-drive-curve":"The drive's character. Smooth is warm and keeps the level steady; Acid is harder and rawer.","hack-drive-tone":"Darkens the driven sound by cutting its highs. All the way up is off; lower is darker.","hack-compressor-threshold_db":"The level, in decibels (dB), above which the compressor turns the sound down. Lower acts on more of the sound.","hack-compressor-ratio":"How strongly sound above the Threshold is turned down. 1:1 does nothing; higher squashes harder.","hack-compressor-attack_ms":"How quickly the compressor clamps down, in milliseconds (ms). Slower lets each hit's punch through first.","hack-compressor-release_ms":"How quickly the compressor lets go after a hit, in milliseconds (ms). Shorter pumps with the beat; longer is smoother.","hack-compressor-makeup_db":"Turns the compressed kit back up, in decibels (dB), to make up for what the compressor took off.","toast-undo":"Takes back the last surprise, re-roll, clear, move, slot clear or load."};function zi(t,e,n=!1){return(e?Ht[`${t}@${e}`]:void 0)??(n?Ht[`${t}@touch`]:void 0)??Ht[t]}function Gu(t,e=!1){if(t.key!=="lane")return zi(t.key,t.voice,e);const n=t.voice?Ht[`drum@${t.voice}`]:void 0,a=zi("lane",void 0,e);return n&&a?`${n} ${a}`:a}const ae=(t,e)=>t.dataset?.[e];function Wu(t,e){const n=[],a=(o,r)=>{for(const l of Array.from(t.querySelectorAll(o))){const u=r(l);u&&n.push({el:l,...u})}},s=o=>()=>({key:o});return a(".petra-head-title",s("brand")),a(".petra-menu > summary",s("menu")),a("[data-petra-menu]",o=>({key:`menu:${ae(o,"petraMenu")}`})),a(".nc-module-hd > .nc-title",o=>{const r=o.closest("[data-nc-module]")?.getAttribute("data-nc-module");return r?{key:`module:${r}`}:null}),a("[data-nc-hide]",s("hide")),a("[data-nc-index]",s("index")),a(".nc-slim",s("slim")),a(".nc-field",o=>{const r=Array.from(o.children).find(p=>p.classList.contains("nc-label"));if(!r)return null;const l=o.classList.contains("nc-morph-field")?"morph":ae(o,"ncId");if(!l)return null;const u=r.getAttribute("for"),c=u?o.ownerDocument.getElementById(u)??null:o.querySelector("input, select"),d=o.closest('[data-nc-section="parameters"]')?e.selectedVoice():void 0;return{key:l,voice:d,control:c,el:r}}),a(".nc-group[data-nc-id] > .nc-group-toggle",o=>({key:o.parentElement?.getAttribute("data-nc-id")??"",control:o})),a(".nc-btn[data-nc-id]",o=>({key:ae(o,"ncId")??""})),a("[data-nc-sparkle]",s("surprise")),a("[data-nc-tap]",s("tap")),a(".nc-snap[data-nc-slot]",s("slots")),a("[data-nc-slot-op]",o=>({key:`slot-${ae(o,"ncSlotOp")==="store"?"save":"clear"}`})),a(".nc-note[data-nc-id]",o=>({key:ae(o,"ncId")??""})),a(".nc-choice-row[data-nc-id]",o=>({key:ae(o,"ncId")??""})),a("[data-petra-help]",o=>({key:ae(o,"petraHelp")??""})),a(".petra-kit-name",s("deep-kit")),a(".petra-deep-env > svg",s("deep-env")),a('.nc-seg[aria-label="Step tool"] > button',o=>({key:o.hasAttribute("data-nc-accent-mode")?"tool-accent":"tool-note"})),a("[data-nc-fill]:not([data-nc-clear])",s("fill")),a("[data-nc-clear]",s("clear")),a("[data-nc-ms]",o=>({key:ae(o,"ncMs")==="solo"?"solo":"mute"})),a(".nc-row > .nc-name",o=>{const r=o.closest(".nc-row"),l=r?.querySelector("[data-nc-dice]")?.getAttribute("data-nc-dice")??r?.querySelector("[data-nc-len]")?.getAttribute("data-nc-len")??void 0;return{key:"lane",voice:l?e.voiceOf(l):void 0}}),a(".nc-len-handle",s("length")),a(".nc-row-dice, [data-nc-pads-dice]",s("dice")),a(".nc-pads-step:not([data-nc-pads-dice])",o=>({key:o.getAttribute("aria-label")?.startsWith("Next")?"pads-next":"pads-prev"})),a(".nc-pads-label",s("pads-lane")),a("[data-nc-pads-play]",s("play")),a(".nc-moves-row > .nc-moves-label",o=>({key:`moves:${(o.parentElement?.getAttribute("aria-label")??"").toLowerCase()}`,control:o.parentElement})),a("[data-nc-move]",o=>({key:`move:${ae(o,"ncMove")}`})),a(".nc-panel-title",o=>{const r=o.closest("[data-nc-section]")?.getAttribute("data-nc-section");return r?{key:`section:${r}`}:null}),a(".nc-panel-subject",o=>({key:o.closest('[data-nc-section="sound"]')?"sound-subject":"panel-subject"})),a(".nc-ui-fx > .nc-ui-fx-hd > .nc-ui-fx-name",o=>{const r=o.closest(".nc-ui-fx")?.getAttribute("data-nc-id");return r?{key:`hack:${r}`}:null}),a("[data-nc-fx-switch]",s("hack-switch")),a("details.nc-ui-more > summary",s("more")),a(".nc-step-editor-head > .nc-label",s("edit-step")),a(".nc-step-editor-done",s("edit-done")),a(".nc-step-editor-row > .nc-label",o=>{const r=o.parentElement?.querySelector("input[data-nc-edit]");return{key:`edit-${r?.getAttribute("data-nc-edit")==="probability"?"chance":"velocity"}`,control:r??null}}),a(".nc-ui-toast-action",s("toast-undo")),n}const Pi="rhythm-help-",Ku="button, input, select, summary, [role]";function Vu(t,e=document){Cd({document:e});const n=e.createElement("div");n.id="rhythm-help",n.hidden=!0,e.body.append(n);const a=new Map,s=c=>{let d=a.get(c);if(!d){d=`${Pi}${a.size+1}`;const p=e.createElement("span");p.id=d,p.textContent=c,n.append(p),a.set(c,d)}return d},o=(c,d)=>{const p=c.getAttribute("aria-describedby")??"",g=[...p.split(/\s+/).filter(w=>w&&!w.startsWith(Pi)),d].join(" ");g!==p&&c.setAttribute("aria-describedby",g)};let r;const l=()=>{r=t.selectedVoice();const c=e.defaultView?.matchMedia?.("(pointer: coarse)").matches??!1;for(const d of Wu(e,t)){const p=Gu(d,c);if(!p)continue;d.el.getAttribute(lt)!==p&&d.el.setAttribute(lt,p),d.el.removeAttribute("title"),d.control?.classList.contains("nc-moves-row")&&d.control.removeAttribute("title");const f=d.control??(d.el.matches(Ku)?d.el:null);f&&o(f,s(p))}},u=new MutationObserver(c=>{let d=!1;for(const p of c){if(p.type==="attributes"){const f=p.target;f.hasAttribute("title")&&f.hasAttribute(lt)&&f.removeAttribute("title");continue}if(!(p.target===n||p.target.localName==="canvas"))for(const f of Array.from(p.addedNodes))f.nodeType===1&&!f.matches(".nc-ui-help, [data-nc-probe]")&&(d=!0)}d&&l()});return u.observe(e.body,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["title"]}),l(),{refresh:l,follow(){t.selectedVoice()!==r&&l()},disconnect(){u.disconnect(),n.remove()}}}const To={on:!1,accent:!1,velocity:.8},Z=t=>({...t??To});function ne(t){return Math.max(1,Math.min(t.length,t.steps.length))}function Sn(t,e){const n=ne(t),a=t.steps.map(Z);for(let s=0;s<n;s++)a[((s+e)%n+n)%n]=Z(t.steps[s]);return{...t,steps:a}}function Yu(t){const e=ne(t),n=t.steps.map(Z);for(let a=0;a<e;a++)n[e-1-a]=Z(t.steps[a]);return{...t,steps:n}}function _i(t,e){const n=ne(t),a=[];for(let r=0;r<n;r++)t.steps[r]?.on&&a.push(r);if(a.length<2)return{...t,steps:t.steps.map(Z)};const s=a.map(r=>t.steps[r]),o=t.steps.map(Z);return a.forEach((r,l)=>{const u=s[((l-e)%a.length+a.length)%a.length];o[r]={on:!0,accent:u.accent,velocity:u.velocity,...u.probability!==void 0?{probability:u.probability}:{}}}),{...t,steps:o}}function Xu(t,e){const n=t.map(s=>({...s,steps:s.steps.map(Z)})),a=Math.max(0,...t.map(ne));for(let s=0;s<a;s++){const o=t.flatMap((l,u)=>s<ne(l)?[u]:[]);if(o.length<2)continue;const r=o.map(l=>Z(t[l]?.steps[s]));for(let l=r.length-1;l>0;l--){const u=Math.floor(e()*(l+1));[r[l],r[u]]=[r[u],r[l]]}o.forEach((l,u)=>{const c=n[l];c&&(c.steps[s]=r[u])})}return n}function Ju(t,e){const n=ne(t),a=t.steps.map(Z),s=e()<.5?1:2;for(let o=0;o<s;o++){const r=[],l=[];for(let c=0;c<n;c++)(a[c]?.on?r:l).push(c);if(!l.length)break;const u=r.flatMap(c=>[-1,1].map(d=>[c,(c+d+n)%n]).filter(([,d])=>!a[d]?.on));if(u.length&&e()<.7){const[c,d]=u[Math.floor(e()*u.length)];a[d]=Z(a[c]),a[c]=Z(To)}else{const c=l[Math.floor(e()*l.length)];a[c]={on:!0,accent:!1,velocity:.55}}}return{...t,steps:a}}function Qu(t,e){const n=s=>s.steps.slice(0,ne(s)).filter(o=>o.on).length,a=e.some(s=>n(s)>0);switch(t){case"shift-left":case"shift-right":case"shift-random":case"reverse":return e.some(s=>n(s)>0&&n(s)<ne(s));case"groove-left":case"groove-right":return e.some(s=>{const o=s.steps.slice(0,ne(s)).filter(r=>r.on);return o.length>1&&o.some(r=>r.accent!==o[0]?.accent||r.velocity!==o[0]?.velocity)});case"shuffle":return e.length>1&&a;case"mutate":return e.length>0}}function Zu(t,e,n){switch(t){case"shift-left":return e.map(a=>Sn(a,-1));case"shift-right":return e.map(a=>Sn(a,1));case"shift-random":{const a=Math.min(...e.map(ne)),s=a>1?1+Math.floor(n()*(a-1)):0;return e.map(o=>Sn(o,s))}case"reverse":return e.map(Yu);case"groove-left":return e.map(a=>_i(a,-1));case"groove-right":return e.map(a=>_i(a,1));case"shuffle":return Xu(e,n);case"mutate":return e.map(a=>Ju(a,n))}}class ep{doc=Ts();bank=ls();morphSeconds=0;get recallGlideSeconds(){return 0}playing=!1;edited=null;glidePending=null;selectedTrack=0;sparkleUndo=null;sparkleEdited=!1;selectTrack(e){!Number.isInteger(e)||e<0||e>=this.doc.tracks.length||(this.selectedTrack=e)}edit(e){this.retireSparkle(),e(this.doc),this.writeActive(),this.glidePending=0}writeActive(){const e=this.bank.active;e==null||!this.bank.slots[e]||(this.bank=Hr(this.bank,this.doc),this.edited=e)}store(e){this.retireSparkle(),this.doc.swing=this.liveSwing,this.bank=Or(this.bank,e,this.doc),this.edited=null}replace(e,n){this.retireSparkle();const a={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};this.doc={...structuredClone(e),bpm:this.doc.bpm},this.bank=structuredClone(n),this.edited=null,this.selectedTrack=Math.min(this.selectedTrack,this.doc.tracks.length-1),this.glidePending=0,this.sparkleUndo=a}clear(e){this.retireSparkle();const n={bank:structuredClone(this.bank),edited:this.edited,doc:null,selectedTrack:this.selectedTrack};this.bank=Br(this.bank,e),this.edited===e&&(this.edited=null),this.sparkleUndo=n}peek(e){const n=qa(this.bank,e,this.doc,0);return n.applied?n.document:null}recall(e,n=this.recallGlideSeconds){const a=qa(this.bank,e,this.doc,n);return a.applied?(this.retireSparkle(),this.bank=a.bank,this.doc=a.document,this.edited=null,this.glidePending=a.glideSeconds,!0):!1}surprise(e=Math.random){const n={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},a=pl(this.doc,e);this.sparkleUndo=n,this.bank=a.bank,this.doc=a.document,this.edited=null,this.glidePending=0}diceLane(e,n=Math.random){if(!this.doc.tracks[e])return!1;const a={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};return this.doc=rl(this.doc,e,n),this.writeActive(),this.sparkleUndo=a,this.glidePending=0,!0}clearSteps(){if(!this.doc.tracks.some(a=>a.steps.some(s=>s.on)))return!1;const e={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},n=structuredClone(this.doc);for(const a of n.tracks)a.steps=a.steps.map(()=>({on:!1,accent:!1,velocity:.8}));return this.doc=n,this.writeActive(),this.sparkleUndo=e,this.glidePending=0,!0}moveTracks(e,n,a=Math.random){const s=e.filter(c=>this.doc.tracks[c]);if(!s.length)return!1;const o=s.map(c=>this.doc.tracks[c]),r=Zu(n,o,a);if(JSON.stringify(r)===JSON.stringify(o))return!1;const l={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},u=structuredClone(this.doc);return s.forEach((c,d)=>{const p=r[d];p&&(u.tracks[c]=structuredClone(p))}),this.doc=u,this.writeActive(),this.sparkleUndo=l,this.glidePending=0,!0}undoSurprise(){const e=this.sparkleUndo;return e?(this.bank=e.bank,this.edited=e.edited,this.sparkleUndo=null,e.doc&&(this.doc=e.doc,this.selectedTrack=e.selectedTrack,this.glidePending=0),!0):!1}takeSurpriseEdit(){const e=this.sparkleEdited;return this.sparkleEdited=!1,e}retireSparkle(){this.sparkleUndo&&(this.sparkleUndo=null,this.sparkleEdited=!0)}followSwing=null;get liveSwing(){return this.followSwing??this.doc.swing}adoptSwing(e){if(e==null||e===0||!Number.isFinite(e))return!1;const n=Math.min(.75,Math.max(.5,e)),a=this.liveSwing;return this.followSwing=n,n===a?!1:(this.glidePending=0,!0)}setSwing(e){this.followSwing=null,this.edit(n=>{n.swing=e})}consumeGlide(){if(this.glidePending===null)return;const e=this.glidePending;return this.glidePending=null,e}}let Di=!1;function tp(){return`
#app .nc-morph-field { display: none; }
button[data-nc-help], summary[data-nc-help] { cursor: pointer; }
.nc-len-handle[data-nc-help] { cursor: ew-resize; }
.nc-btn[data-nc-help]:disabled { cursor: not-allowed; }
.nc-moves-btn[data-nc-help]:disabled { cursor: default; }
/* nc-ui help/slider-labels (not vendored yet): the slider's hit band covers most of its label, so with a mouse the
   label sits above it and opens its description. In the fallback layer, as the kit is: the live kit takes over. */
@layer nc-ui-fallback {
  @media (hover: hover) and (pointer: fine) {
    .nc-field[data-nc-slider] > .nc-label[data-nc-help] { position: relative; z-index: 1; }
  }
  /* nc-ui 29f443d (#73, not vendored yet): the row under a filter curve in an FX card keeps a gap from its 20 Hz and
     20 kHz (the Hacks Filter's Cutoff, Peter 2026-11-07). Drop it when re-pinning past 29f443d. */
  .nc-ui-fx > .nc-field:has(> .nc-canvas[data-nc-paint="filter"]) + .nc-field { margin-top: ${i("module-gap")}; }
}
`}function np(t=document){if(Di)return;const e=t.createElement("style");e.dataset.rhythmKitOverrides="",e.textContent=tp(),t.head.append(e),Di=!0}function ap(t){const e=t.getOutputTimestamp?.(),n=e?.contextTime,a=e?.performanceTime;if(n===void 0||a===void 0||!(n>0)||!(a>0))return null;const s=Number.isFinite(t.outputLatency)?t.outputLatency*1e3:0;return{contextTime:n,performanceTime:a,timeOrigin:performance.timeOrigin,latencyMs:s,wallMs:performance.timeOrigin+performance.now(),hidden:document.hidden}}function Ii(t,e){const n=t.getOutputTimestamp?.(),a=n?.contextTime,s=n?.performanceTime;if(a===void 0||s===void 0||!(a>0)||!(s>0)||!Number.isFinite(e))return null;const o=s+(e-a)*1e3,r=Number.isFinite(t.outputLatency)?t.outputLatency*1e3:0,l=performance.timeOrigin+o;return{playedMs:l,plusLatencyMs:l+r,latencyMs:r,stampContextTime:a,stampPerformanceTime:s}}const ip=new Set(["transport-more","moves-more","params-more","hacks-more"]);function on(t){for(const e of Array.from(t.querySelectorAll(".nc-group[data-nc-id]")))ip.has(e.dataset.ncId??"")&&(e.dataset.ncCollapse!=="phone"&&(e.dataset.ncCollapse="phone"),Ri(e),!e.dataset.petraFold&&(e.dataset.petraFold="",Mo(e,"nc-group-toggle")?.addEventListener("click",()=>Ri(e))))}function Ri(t){const e=Mo(t,"nc-group-body");e?.hidden&&(e.hidden=!1)}function Mo(t,e){return Array.from(t.children).find(n=>n instanceof HTMLElement&&n.classList.contains(e))}function rn(t){return t.map(([e,n])=>`${e} ${n}`).join(" · ")}const sp="petra-presets";function op(t,e,n){const a=t.filter(Boolean).length,s=[a?`${a} of ${t.length} saved`:"none saved"];return e!=null&&t[e]&&s.push(`slot ${n[e]??e+1}`),s.join(" · ")}const rp=1400;function An(t,e,n,a=!1){return t==="store"?null:t==="clear"?n?`Cleared ${e}`:null:n?null:a?`${e} is empty · hold to save`:`${e} is empty · Shift+${e} stores`}function lp(t){return t===0?"0 s":`${Math.round(t*100)/100} s`}class cp{constructor(e){this.repaint=e}text="";timer=0;say(e,n=rp){window.clearTimeout(this.timer),this.timer=0,this.text=e??"",e&&(this.timer=window.setTimeout(()=>{this.timer=0,this.text="",this.repaint()},n))}}const dp=50;function up(t,e,n,a=dp){if(n)return 0;const s=t-e;return s>=a?0:a-s}const Se=1e3;function ka(t,e,n){return t==="linear"||!(n>e)?"linear":e>0?"log":"power"}function pp(t,e,n,a){if(!(n>e)||!Number.isFinite(a))return 0;const s=Math.min(n,Math.max(e,a)),o=ka(t,e,n);if(o==="log")return Math.log(s/e)/Math.log(n/e);const r=(s-e)/(n-e);return o==="power"?Math.cbrt(r):r}function hp(t,e,n,a){const s=Math.min(1,Math.max(0,a||0)),o=ka(t,e,n);return o==="log"?e*(n/e)**s:e+(n-e)*(o==="power"?s**3:s)}function mp(t,e,n,a){let s=Math.min(n,Math.max(e,t));if(a&&a>0){s=e+Math.round((s-e)/a)*a;const o=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));s=Math.min(n,Math.max(e,Number(s.toFixed(o))))}return s}const Lo=(t,e,n,a)=>Math.round(pp(t,e,n,a)*Se),Yt=(t,e,n,a,s)=>mp(hp(t,e,n,a/Se),e,n,s),Co=new Map;let Oi=!1;function fp(){Oi||typeof document>"u"||(Oi=!0,document.addEventListener("keydown",t=>{const e=t.target;if(!(e instanceof HTMLInputElement)||e.type!=="range"||e.disabled)return;const n=Co.get(e.id);if(!n)return;const a=Lo(n.taper,n.min,n.max,n.value),s=t.shiftKey?1:Se/100,o={ArrowRight:s,ArrowUp:s,ArrowLeft:-s,ArrowDown:-s,PageUp:100,PageDown:-100};let r=t.key==="Home"?0:t.key==="End"?Se:o[t.key]===void 0?null:a+o[t.key];if(r===null)return;t.preventDefault(),r=Math.min(Se,Math.max(0,Math.round(r)));const l=Math.sign(r-a);let u=Yt(n.taper,n.min,n.max,r,n.step);for(;l!==0&&u===n.value&&r>0&&r<Se;)r+=l,u=Yt(n.taper,n.min,n.max,r,n.step);e.value=String(r),n.set(u)},!0))}function ln(t,e){const{min:n,max:a,step:s}=t;return ka(e,n,a)==="linear"?t:(Co.set(t.id,{taper:e,min:n,max:a,step:s,value:t.value,set:o=>t.onChange(o)}),fp(),{...t,min:0,max:Se,step:1,value:Lo(e,n,a,t.value),onChange:o=>t.onChange(Yt(e,n,a,o,s)),...t.onCommit?{onCommit:o=>t.onCommit?.(Yt(e,n,a,o,s))}:{}})}class gp{constructor(e,n=()=>null){this.host=e,this.anchor=n}handle=null;get open(){return this.handle!==null}show(e,n="Surprise applied"){this.handle?.close();const a=Sd({message:n,actionLabel:"Undo",onAction:e,host:this.host,anchor:this.anchor(),onClose:()=>{this.handle===a&&(this.handle=null,this.clearLive())}});this.handle=a}dismiss(){const e=this.handle;this.handle=null,e?.close(),this.clearLive()}clearLive(){const e=this.host.querySelector("[data-nc-ui-toast-live]");e&&(e.textContent="")}}function Bi(t,e){const n=new AudioContext(e);let a="loading";const s=(async()=>{n.state==="running"&&await n.suspend();for(const o of t)await n.audioWorklet.addModule(o)})().then(()=>{a="loaded"},o=>{throw a="failed",o});return s.catch(()=>{}),{context:n,ready:s,get status(){return a},async start(){return a==="loaded"&&Ee(n),await s,n.state!=="running"&&await n.resume(),n.state}}}function Ee(t){t.state==="running"||t.state==="closed"||t.resume().catch(()=>{})}const bp=5e3;function yp(){return typeof navigator<"u"&&"userAgentData"in navigator}function wp(t,e,n,a={}){const s=a.restartsOnWorkletReady??yp(),o=a.preloadTimeoutMs??bp;let r=null,l=!1,u=null,c=null;async function d(){const b=new AudioContext(e);Ee(b);try{for(const h of t)await b.audioWorklet.addModule(h);return b}catch(h){throw b.close().catch(()=>{}),h}}function p(b,h=!1){l=!0,r=null,b.context.close().catch(()=>{}),h?n?.(new Error(`audio preload still loading after ${o} ms`)):b.ready.catch(m=>n?.(m))}async function f(b){const{context:h}=b;n?.(new Error(`audio preload still loading after ${o} ms; loading into its context again`)),Ee(h);const m=(async()=>{for(const y of t)await h.audioWorklet.addModule(y)})();try{return await Promise.race([b.ready.then(()=>{},()=>m),m]),h}catch(y){throw l=!0,r===b&&(r=null),h.close().catch(()=>{}),y}}function g(b){let h;const m=new Promise(y=>{h=setTimeout(()=>y("timeout"),o)});return Promise.race([b.ready.then(()=>"ready"),m]).finally(()=>clearTimeout(h))}async function w(){if(!l){r??=Bi(t,e);const b=r;if(b.status==="failed")p(b);else{const h=b.status==="loaded"||!s;if(h&&Ee(b.context),b.status==="loading"){let m;try{m=await g(b)}catch{return p(b),d()}if(m==="timeout")return s?(p(b,!0),d()):f(b)}return b.context.state==="closed"?(r===b&&(r=null),w()):(h||Ee(b.context),b.context)}}return d()}return{preload(){r||u||c||l||(r=Bi(t,e))},load(){return u&&u.state!=="closed"?(Ee(u),Promise.resolve(u)):c?(r&&(r.status==="loaded"||!s)&&Ee(r.context),c):(c=w().then(b=>(u=b,r=null,b)).finally(()=>{c=null}),c)}}}const No={kick:36,rim:37,snare:38,clap:39,hat:42,tom:45,hatOpen:46,crash:49,ride:51,metal:56,shaker:70},vp=new Map(Object.entries(No).map(([t,e])=>[e,t])),kp=t=>vp.get(t)??null,xp=.5,$p=.25,Ep=1.2;function Sp(t){let e=Number.NEGATIVE_INFINITY,n=0;const a={hits:0,messages:0,refused:0};return{tick(s){if(s.beat===null){e=Number.NEGATIVE_INFINITY;return}const o=Math.max(e,Math.max(0,s.beat),s.entry),r=s.beat+xp;if(!(r>o))return;e=r;const l=ql(s.tracks,s.swing,o,r);if(!l.length)return;const u=[];for(const c of l){const d=`r|${++n}`,p=No[c.voice],f=Math.min(1,Math.max(.01,c.velocity*(c.accent?Ep:1)));u.push({type:"note",id:d,beat:c.beat,on:!0,note:p,velocity:f,pattern:!0},{type:"note",id:d,beat:c.beat+$p,on:!1,note:p,pattern:!0})}try{t({v:1,kind:"played",events:u})?(a.messages++,a.hits+=l.length):a.refused++}catch{a.refused++}},reset(){e=Number.NEGATIVE_INFINITY},stats:a}}const Hi=t=>typeof t=="object"&&t!==null,Tn=t=>typeof t=="number"&&Number.isFinite(t),Ap=t=>typeof t=="string"&&t.length>0&&t.length<=128;function Tp(t){const e=new Map,n={hits:0,duplicates:0,notDrums:0,refused:0};return{message(a){if(!Hi(a)||a.v!==1){n.refused++;return}if(a.kind==="off"){const o=a.atBeat;if(o!==void 0&&!Tn(o)){n.refused++;return}for(const[r,l]of e)(o===void 0||l>=o-1e-9)&&e.delete(r);t(o===void 0?{type:"unlayer"}:{type:"unlayer",atBeat:o});return}if(a.kind!=="notes"||!Array.isArray(a.events)||a.events.length>1024)return;const s=[];for(const o of a.events){if(!Hi(o)||!Ap(o.id)||!Number.isInteger(o.note)||!Tn(o.startBeat)||!Tn(o.velocity)||o.velocity<0||o.velocity>1){n.refused++;continue}if(e.has(o.id)){n.duplicates++;continue}const r=kp(o.note);if(!r){n.notDrums++;continue}e.set(o.id,o.startBeat),s.push({beat:o.startBeat,voice:r,velocity:o.velocity})}if(e.size>4096){const o=Math.max(...e.values());for(const[r,l]of e)l<o-64&&e.delete(r)}s.length&&(n.hits+=s.length,t({type:"layer",hits:s}))},stats:n}}const Mp=-11,Fo=10**(Mp/20),xa={knee:.6,ceiling:.944,range:4,points:8193};function Lp(t,{knee:e,ceiling:n}=xa){const a=Math.abs(t);if(a<=e)return t;const s=n-e;return Math.sign(t)*(e+s*Math.tanh((a-e)/s))}function Cp({range:t,points:e}=xa){const n=new Float32Array(e);for(let a=0;a<e;a++)n[a]=Lp((2*a/(e-1)-1)*t);return n}function Np(t){const e=t.createGain();e.gain.value=Fo;const n=t.createGain();n.gain.value=1/xa.range;const a=t.createWaveShaper();return a.curve=Cp(),a.oversample="none",e.connect(n).connect(a),{input:e,output:a}}const ji="/rhythm/assets/processor-B1k3cEeT.js";function Fp(){try{return globalThis.localStorage??null}catch{return null}}function zo(t,e,n=e,a=Fp()){if(!t||typeof t.storageKey!="function")return n;const s=t.storageKey(e);if(typeof s!="string"||!s||s===n)return n;try{if(t.legacyCopy!==!1&&a&&a.getItem(s)===null){const o=a.getItem(n);o!==null&&a.setItem(s,o)}}catch{}return s}const zp="instance",Pp=99;function cn(t=typeof location>"u"?"":location.search){const e=new URLSearchParams(t).get(zp)?.trim()??"";if(!/^\d+$/.test(e))return 1;const n=Number(e);return n>=2&&n<=Pp?n:1}function Gn(t,e){return e===1?t:`${t}#${e}`}function _p(t,e){return e===1?t:`${t} ${e}`}let De;function Dp(t,e=cn()){if(De!==void 0)return De;De=null;try{if(typeof window>"u"||window.parent===window)return De;const n=window.parent.ncStudio;n&&n.version===1&&(De=n.attach(t,{instance:e}))}catch{}return De}function Ip(){let t;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(t=a.syncScope)}}catch{}if(!t)return{};const e=`/studio/${t}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:n?{request:(a,s,o)=>n.request(`${a}${e}`,s,o)}:null}}function Rp(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t&&t.version===1&&typeof t.fxWorklet=="string"&&t.fxWorklet?t.fxWorklet:null}catch{return null}}function bt(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.play?t.play:null}catch{return null}}function Xt(t,e=cn()){return e>1?`${t}#${e}`:t}function Op(t,e=cn()){const n=bt()?.owner()??null;return n===null||n==="studio"||n===Xt(t,e)}function Bp(t,e,n,a){return e&&!t.running&&n?!a():t.sittingOut}function Hp(t,e=4){return Number.isFinite(t)&&t>=0&&t<e}function jp(t,e=globalThis){typeof e.requestIdleCallback=="function"?e.requestIdleCallback(t,{timeout:250}):e.setTimeout(t,50)}function qp(t,e){return JSON.parse(ys(t,e))}function Up(t){let e;try{e=typeof t=="string"?t:JSON.stringify(t)}catch{throw new Error("Not a Rhythm file")}if(typeof e!="string")throw new Error("Not a Rhythm file");const n=ws(e);if(!n.ok||!n.document||!n.bank)throw new Error(n.errors[0]??"Not a Rhythm file");return{document:n.document,bank:n.bank}}function Gp(t,e){return{format:en,version:Oe,get:()=>{const{doc:n,bank:a}=t();return qp(n,a)},set:n=>{const{document:a,bank:s}=Up(n);e(a,s)}}}function Wp(t,e){let n=null;const a=()=>(n??=(async()=>{for(const s of e)await t.audioWorklet.addModule(s);return t})(),n.catch(()=>{n=null}),n);return{preload(){a().catch(()=>{})},load:a}}const Po=new URLSearchParams(location.search),V=Po.has("measure"),ue=cn(),O=Dp("petra-rhythm",ue),qi=O?.holdFirstPlay?.()??(()=>{}),$a=_p(Mu,ue),Kp=zo(O,"petra-rhythm.linkslots",Gn("petra-rhythm.linkslots",ue)),Vp=Il(Kp),Yp=!(V&&Po.get("clockStepFix")==="0");let Wn=0;const Xp=.05;V&&(window.__onsets=[],window.__render=[],window.__stamps=[],window.__ts=[],window.__steps=[],window.__kicks=[],window.__recalls=[],window.__ignoredRecalls=[],window.__posts=[]);const Te=[40,240],v=new ep,Ea=V?Gn(qe,ue):zo(O,qe,Gn(qe,ue)),ot=V?null:Tu(localStorage,location.search,Ea),Ui=V||ot?null:Au(localStorage,location.search,Ea);ot&&(v.doc=ot.doc,v.bank=ot.bank,v.selectTrack(ot.selectedTrack));const dn=V?null:Su(localStorage,()=>({doc:v.doc,bank:v.bank,selectedTrack:v.selectedTrack}),Eo,Ea);if(V){for(const e of v.doc.tracks)e.solo=e.voice==="kick";const t=v.doc.tracks.find(e=>e.voice==="kick");t&&(t.params.decay=Xp)}const z=new cr({bpm:v.doc.bpm,minBpm:Te[0],maxBpm:Te[1],timebase:"shared"}),Sa=document.querySelector("#app");if(!(Sa instanceof HTMLElement))throw new Error("Missing #app");const Jp=Cu(Sa);np();Uu();const Qp=Vu({voiceOf:t=>v.doc.tracks.find(e=>e.id===t)?.voice,selectedVoice:()=>v.doc.tracks[he()]?.voice}),ve=new gp(document.body,()=>{const t=document.querySelector("#play")?.closest(".nc-module");return t&&t.getBoundingClientRect().width<window.innerWidth/2?t:null});let M=null;V&&(window.__audioInfo=()=>M?{sampleRate:M.sampleRate,outputLatency:M.outputLatency,baseLatency:M.baseLatency,state:M.state,hidden:document.hidden}:null,window.__errors=[],window.addEventListener("unhandledrejection",t=>{window.__errors?.push(String(t.reason))}),window.__toggle=()=>Ho(),window.__clockStep=t=>{Wn=t},window.__debug=()=>({audio:M?.state??null,onsets:window.__onsets?.length??0,stamps:window.__stamps?.length??0,render:window.__render?.length??0,ts:M?.getOutputTimestamp?.()??null,currentTime:M?.currentTime??null,reanchors:ce?.reanchors??0,play:document.querySelector("#play")?.textContent??null,errors:window.__errors??[]}));let G=null,se=null,ce=null,Jt=0,Kn=0;function Zp(){return M?M.state==="running"?"running":M.state==="suspended"?"suspended":M.state==="interrupted"?"interrupted":"none":"needs-gesture"}const I=new kr({...Ip(),app:$a,version:"0.1.0",clock:z,capabilities:{prefersLeader:!0,sampleAccurate:!0,swing:!0,tempoRamps:!0,meter:!0,tempoRange:Te},audio:Zp,outputLatencyMs:()=>ce?.outputLatencyMs??null,swing:()=>v.liveSwing,startGate:()=>ce?ce.whenSettled():null});let He="",_o=0,Do=!1,Gi=Number.NEGATIVE_INFINITY,Ie=null;const R=new da;let Q=!1,Vn=Number.NEGATIVE_INFINITY;function U(t=B()){return!Q&&z.transport.isPlayingAt(t)}function yt(t){if(!I.isLeader)return;const e=up(performance.now(),Gi,t);if(e>0){Ie===null&&(Ie=setTimeout(()=>{Ie=null,yt(!0)},e));return}Ie!==null&&(clearTimeout(Ie),Ie=null),I.publishState()&&(Gi=performance.now())}function Yn(){const t=Do?ll(v.doc).tracks:v.doc.tracks;return Q?t.map(e=>({...e,mute:!0})):t}function wt(){if(!ce)return null;const t=Math.round(ce.offset*1e4)/1e4;return{offset:t,shifted:rr(z.toSnapshot(),t,"audio")}}const Aa=new zl(({offset:t,shifted:e})=>JSON.stringify([t,e.anchor,e.startTime,e.stopTime,e.tempo,e.playing]));function Xn(t=!1){const e=wt();e&&Aa.set(e,t)}const eh={mode:"lp",cutoff:1,resonance:0,drive:0};function Jn(t){const e=ht(t),n=wl(t);return{v:2,chain:[{id:`${n.type}-1`,type:n.type,bypass:!e.filter||t.mode==="lp"&&t.cutoff>=.999,dials:n.dials},{id:"drive-1",type:"drive",bypass:!e.drive.on,dials:{...e.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!e.compressor.on,dials:{...e.compressor.dials}}]}}let Qn=null;function th(){if(!se)return;const t=Jn(v.doc.fx),e=Qn;if(Qn=t,!e||e.chain.some((n,a)=>n.type!==t.chain[a]?.type)){se.setState(t);return}t.chain.forEach((n,a)=>{const s=e.chain[a];if(s){s.bypass!==n.bypass&&se?.setParam(n.id,"bypass",n.bypass);for(const[o,r]of Object.entries(n.dials))s.dials[o]!==r&&se?.setParam(n.id,o,r)}})}function Io(t,e,n,a){return{clock:t,measure:V,swing:v.followSwing??e.swing,fx:eh,...a===void 0?{}:{glideSeconds:a},tracks:n.map(s=>({id:s.id,voice:s.voice,length:s.length,mute:s.mute,solo:s.solo,steps:s.steps})),params:e.tracks.map(s=>({voice:s.voice,params:{...s.params},deep:{...s.deep}})),engine:e.engine,deep:{kit:e.deep.kit,character:{...e.deep.character},version:e.deep.version}}}let oe=null;function C(t="state"){const e=t==="state"?wt():Aa.current??wt();if(!G||!e)return;lh(),t!=="state"&&(He="");const{offset:n,shifted:a}=e,s=oe;s!==null&&(oe=null,He="",Vn=s);const o=v.consumeGlide(),r=JSON.stringify({seen:R.lastTaken,offset:n,anchor:a.anchor,start:a.startTime,stop:a.stopTime,tempo:a.tempo,swing:v.liveSwing,glide:o??null,tracks:Yn(),fx:v.doc.fx,engine:v.doc.engine,deep:v.doc.deep});if(th(),r===He)return;He=r;const l={...Io(a,v.doc,Yn(),o),seen:R.lastTaken,...s===null?{}:{enterBeat:s}};_o=n,G.port.postMessage({type:"state",state:l}),window.__posts?.push({why:t,anchor:a.anchor.time,start:a.startTime??Number.NaN,wallMs:performance.timeOrigin+performance.now()})}const Ta=O?Wp(O.ctx,[ji]):wp([ji],void 0,t=>console.warn("[rhythm] audio preload failed; loading on Play instead",t));async function Qe(){const t=Ta.load();if(M)return;const e=await t;if(M){e!==M&&e.close().catch(()=>{});return}if(M=e,V){const s=M,o=s.getOutputTimestamp.bind(s);s.getOutputTimestamp=()=>{const r=o(),l=!Wn||!r.contextTime?r:{contextTime:r.contextTime+Wn/1e3,performanceTime:r.performanceTime},u=window.__ts;return u&&u.length<2e5&&u.push([performance.timeOrigin+performance.now(),l.contextTime??0,l.performanceTime??0]),l}}M.addEventListener("statechange",()=>{L(),Ce()}),ce=O?.mapper??new vr(M,Yp?{}:{stepThresholdMs:0}),ce.onStep(s=>{window.__steps?.push({wallMs:performance.timeOrigin+performance.now(),stepMs:s.stepSeconds*1e3,confirmedAt:s.confirmedAt,reanchors:s.reanchors,revert:s.revert===!0}),Xn(!0)}),ce.start(),G=new AudioWorkletNode(M,"rhythm"),G.port.onmessage=s=>{if(s.data.switched!==void 0&&ch(s.data.switched),s.data.level!==void 0&&s.data.step!==void 0&&(Kn=s.data.level*Fo,Jt!==s.data.step&&(Jt=s.data.step,L())),!(!V||!M)){for(const o of s.data.onsets??[])window.__kicks?.push({step:o.step,beat:o.beat,shared:o.contextTime-_o});for(const o of s.data.onsets??[]){const r=Ii(M,o.contextTime);r&&window.__onsets?.push({app:$a,beat:o.beat,contextTime:o.contextTime,hidden:document.hidden,stampAgeMs:(M.currentTime-o.contextTime)*1e3,...r})}for(const o of s.data.render??[]){const r=Ii(M,o.contextTime);r&&window.__render?.push({contextTime:o.contextTime,peak:o.peak,playedMs:r.playedMs})}}},se=wu(M,{moduleUrl:Rp()??ku,slots:3,state:Jn(v.doc.fx)}),Qn=Jn(v.doc.fx),G.connect(se.input),window.__hacks=()=>({state:se?.getState(),status:se?.status}),window.__rhythmLevel=()=>Kn;const n=Np(M);se.output.connect(n.input),n.output.connect(O?.output??M.destination);let a=!1;Aa.subscribe(()=>C(a?"clock":"attach")),z.subscribe(s=>Xn(s.kind==="snapshot"&&s.replay===!0)),a=!0}const Ae=new Fl;let Ma=!1,jt=null,Ue=null;function un(){return!M||M.state!=="running"}function nh(){return Ue=Ae.mode(un(),U()),Ue}function La(){return jt??=(async()=>{try{oe=Number.POSITIVE_INFINITY,M&&C(),await Qe(),M&&M.state!=="running"&&await M.resume();const t=z.transport;oe=Ae.enter(t.beatAt(B()),t.bpm),Zn&&(Zn=!1,oe=Math.floor(t.beatAt(B())/4)*4);const e=oe;Ma=!0,Na(),C(),V&&(window.__join={...Ae.toJSON(),tapBeat:Ro,sentBeat:e})}catch(t){throw Ae.cancel(),oe=Number.NEGATIVE_INFINITY,C(),t}})().finally(()=>{jt=null,L(),Ce()}),jt}let Ro=Number.NaN,Zn=!1;function Oo(t){const e=t instanceof KeyboardEvent&&t.repeat;Ae.gesture(un(),U(),e)&&(Ro=z.transport.beatAt(B()),La().catch(Bo))}document.addEventListener("pointerdown",Oo,{capture:!0});document.addEventListener("keydown",Oo,{capture:!0});document.addEventListener("pointerup",()=>{Ae.pending&&M&&M.state!=="running"&&M.resume()},{capture:!0});function Bo(t){console.warn("[rhythm] audio couldn't start",t),de.say("Audio couldn't start. Press Play to try again."),L()}function Ca(){ah().catch(Bo)}async function ah(){if(Ae.swallowClick(un(),U())){await La();return}await Ho()}let nt=null;function Ce(){if(nt!==null&&(clearTimeout(nt),nt=null),!un())return;Dt(!0,U())!==Ue&&L();const t=B(),{startTime:e,stopTime:n}=z.transport,a=[e,n].filter(o=>o!==null&&o>t);if(a.length===0)return;const s=Math.min((Math.min(...a)-t)*1e3+1,2**31-1);nt=setTimeout(()=>{nt=null,Ce()},s)}const ih=1500;function sh(t){let e,n;const a=new Promise(r=>{e=setTimeout(()=>r(!1),ih)}),s=new Promise(r=>{n=()=>{t.state==="running"&&r(!0)},t.addEventListener("statechange",n)}),o=t.resume().then(()=>t.state==="running",()=>!1);return Promise.race([o,s,a]).finally(()=>{clearTimeout(e),n&&t.removeEventListener("statechange",n)})}let Mn=!1;function oh(){M?M.state!=="running"&&M.resume().catch(()=>{}):Ta.load().catch(()=>{})}async function Ho(){if(Mn){oh();return}Mn=!0;try{if(await Qe(),!M)return;if(M.state!=="running"&&!await sh(M)&&!U()){de.say("Tap Play to start audio"),L();return}}finally{Mn=!1}if(O&&z.transport.isPlayingAt(B())){Q?(Q=!1,oe=Math.ceil(z.transport.beatAt(B())/4-1e-9)*4):Q=!0,v.playing=U(),He="",C(),L(),Q&&bt()?.out?.(Xt("petra-rhythm",ue));return}if(U()){z.stop({at:B()});return}O&&bt()?.claim(Xt("petra-rhythm",ue)),z.play({at:B()}),!I.isLeader&&[...I.peers.values()].some(t=>t.leader)&&(Ma=!0,Na(),L())}const de=new cp(()=>L()),rh=6e3;Ui&&de.say(Ui,rh);function Me(){return Ma&&!I.isLeader}function Na(){!Me()||!v.adoptSwing(I.swing)||(C(),L())}function jo(t,e,n){const a=v.peek(t),s=wt();if(!a||!G||!s)return!1;const o=z.transport.beatAt(B()),r=R.recall(t,o,{glide:e},n===void 0?{}:{atBeat:n});return Wo(r,a,s.shifted),!0}let qo="";function Uo(t){return Me()?v.followSwing??t.swing:t.swing}function Go(t,e){return JSON.stringify([t,Uo(e),e.fx,e.tracks,e.engine,e.deep])}function Wo(t,e,n){if(!G)return;qo=Go(t.id,e);const a={...Io(n,e,e.tracks,t.payload.glide),swing:Uo(e),atBeat:t.atBeat,switchId:t.id,slot:t.slot};G.port.postMessage({type:"state",state:a})}function lh(){const t=R.pending;if(!t||!G)return;const e=v.peek(t.slot);if(!e){R.cancel();return}if(Go(t.id,e)===qo)return;const n=wt();n&&Wo(t,e,n.shifted)}function Fa(t,e){const n=v.liveSwing;return v.recall(t,e)?(Me()||(v.followSwing=null),v.liveSwing!==n&&yt(!0),!0):!1}function ch(t){const e=R.takeHeld(t);e&&(Fa(e.slot,e.payload.glide),v.consumeGlide(),C(),L())}function Ko(t){if(R.cancel(),!Fa(t,v.recallGlideSeconds))return;const e=v.recallGlideSeconds>0?v.recallGlideSeconds:0;I.sendSnapshot("recall",t,{atBeat:z.transport.beatAt(B()),...e>0?{glide:{seconds:e}}:{}})}function dh(t){if(R.tap(t,U()).kind==="queue"){const n=v.recallGlideSeconds>0?v.recallGlideSeconds:0;if(jo(t,n,Cs(z.transport.beatAt(B())))){const a=R.pending?.atBeat;I.sendSnapshot("recall",t,{...a===void 0?{}:{atBeat:a},...n>0?{glide:{seconds:n}}:{}});return}}Ko(t)}function Ge(t,e){const n=Fn[t]??"";if(e==="store")v.store(t),de.say(An(e,n,!0));else if(e==="clear"){const a=v.bank.slots[t]!=null;if(R.queued===t){const s=R.drop();R.cancel();const o=v.bank.active;s&&o!=null&&I.sendSnapshot("recall",o,{atBeat:s.atBeat})}v.clear(t),de.say(An(e,n,a)),a&&ve.show(Le,`Slot ${n} cleared`)}else v.bank.slots[t]==null?de.say(An(e,n,!1,matchMedia("(pointer: coarse)").matches)):dh(t);C(),L()}function Le(){v.undoSurprise()&&(ve.dismiss(),C(),L())}function uh(t){const e=t.target;if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)return;if((t.metaKey||t.ctrlKey)&&t.key==="z"&&!t.shiftKey){t.preventDefault(),Le();return}if(t.code==="Space"){t.preventDefault(),t.repeat||Ca();return}const n=t.code.startsWith("Digit")?Number(t.code.slice(5)):Number.NaN;if(!Number.isInteger(n))return;const a=n===0?9:n-1;a<0||a>=re||(t.preventDefault(),t.shiftKey?Ge(a,"store"):t.altKey?Ge(a,"clear"):Ge(a,"recall"))}const ph=new Pl({min:Te[0],max:Te[1]});function ea(t){v.doc.bpm=t,z.setTempo({bpm:t}),C(),L()}function hh(){return Me()?"Leader's swing · Save stores it":"Own swing · join to follow"}function Vo(){const t=U(),e=nh(),n=Me();return{id:"transport",title:"Transport",summary:t?"playing":"stopped",status:de.text,controls:[{type:"button",id:"play",label:Ls(e),on:e==="stop",...e==="join"?{ariaLabel:Ms}:{},onPress:()=>Ca(),onSparkle:()=>{v.surprise(),C(),L(),ve.show(Le)}},...O?[]:[{type:"slider",id:"bpm",label:"Tempo",min:Te[0],max:Te[1],step:1,value:z.transport.bpm,onChange:ea,onTap:a=>{const s=ph.tap(a);s!==null&&s!==z.transport.bpm&&ea(s)}}],{type:"group",id:"transport-more",title:Ln()?"Swing & sync":"Swing",summary:rn([["Swing",Ga(v.liveSwing)],...Ln()?[["Sync",I.isLeader?"leader":"follower"]]:[]]),controls:[{type:"slider",id:"swing",label:n?"Swing (leader)":"Swing",min:.5,max:.75,step:.01,value:v.liveSwing,valueText:Ga(v.liveSwing),disabled:n,modulated:n&&v.followSwing!=null,onChange:a=>{Me()||jt||(v.setSwing(a),yt(!1),C(),L())},onCommit:()=>{yt(!0)}},...I.isLeader||O?[]:[{type:"note",id:"swing-note",text:hh()}],...Ln()?[{type:"readout",id:"role",label:"Sync",value:I.isLeader?"leader":"follower"}]:[]]},{type:"group",id:sp,title:"Presets",summary:op(v.bank.slots.map(a=>a!=null),v.bank.active??null,Fn),controls:[{type:"slotRow",id:"slots",morph:v.morphSeconds,morphText:lp(v.morphSeconds),slots:Fn.map((a,s)=>({label:a,filled:v.bank.slots[s]!=null,active:v.bank.active===s,edited:v.edited===s,queued:R.queued===s,pulse:R.queued===s&&t&&Jt%4<2})),onMorph:a=>{v.morphSeconds=a,L()},onSlot:(a,s)=>{Ge(a,s)}}]}]}}function Ln(){return!O&&I.peers.size>0}function he(){const t=v.doc.tracks.length;return t===0?0:Math.min(v.selectedTrack,t-1)}let Re=[];function We(){const t=v.doc.tracks,e=t[he()]?.id,n=Re.filter(a=>t.some(s=>s.id===a));return e&&!n.includes(e)&&n.unshift(e),n}function mh(t,e=!1){const n=v.doc.tracks,a=n[t]?.id;if(!a)return;if(!e){Re=[],v.selectTrack(t);return}const s=We();if(s.includes(a)&&s.length>1){if(Re=s.filter(o=>o!==a),n[he()]?.id===a){const o=n.findIndex(r=>r.id===Re[Re.length-1]);o>=0&&v.selectTrack(o)}}else Re=s.includes(a)?s:[...s,a],v.selectTrack(t)}const Wi={stroke:"M13 8H3M7 4 3 8l4 4"},Ki={stroke:"M3 8h10M9 4l4 4-4 4"},Vi=[{id:"shift",label:"Shift",moves:[{id:"shift-left",text:"Left",icon:Wi},{id:"shift-right",text:"Right",icon:Ki},{id:"shift-random",text:"Random",icon:{stroke:"M3 3h10v10H3zM6 6h0M8 8h0M10 10h0"}},{id:"reverse",text:"Reverse",icon:{stroke:"M2 5h11M10 2l3 3-3 3M14 11H3M6 8l-3 3 3 3"}}]},{id:"groove",label:"Groove",moves:[{id:"groove-left",text:"Left",icon:Wi},{id:"groove-right",text:"Right",icon:Ki}]},{id:"hits",label:"Hits",moves:[{id:"shuffle",text:"Shuffle",icon:{stroke:"M2 4.5h2.5l6 7H14M2 11.5h2.5l6-7H14M12 2.5l2 2-2 2M12 9.5l2 2-2 2"}},{id:"mutate",text:"Mutate",icon:{fill:"M8 1.5 9.3 6.7 14.5 8 9.3 9.3 8 14.5 6.7 9.3 1.5 8 6.7 6.7Z"}}]}];function fh(){const t=We(),e=v.doc.tracks.filter(n=>t.includes(n.id));return{type:"moves",id:"moves",label:"Pattern moves",groups:Vi.map(n=>({...n,moves:n.moves.map(a=>({...a,disabled:!Qu(a.id,e)}))})),onMove:n=>{const a=Vi.flatMap(l=>l.moves.map(u=>({...u,group:l.label}))).find(l=>l.id===n);if(!a)return;const s=We(),o=v.doc.tracks.flatMap((l,u)=>s.includes(l.id)?[u]:[]);if(!v.moveTracks(o,a.id))return;C(),L();const r=o.length===1?v.doc.tracks[o[0]??0]?.name??"":`${o.length} tracks`;ve.show(Le,`${a.group} ${a.text.toLowerCase()}: ${r}`)}}}function Yo(){const t=v.doc.tracks[he()];return{id:"pattern",title:"Pattern",lead:!0,summary:t?`${v.doc.tracks.length} tracks · ${t.name}`:`${v.doc.tracks.length} tracks`,sections:[{id:"grid",controls:[{type:"stepGrid",transport:{playing:Ue==="stop",label:Ls(Ue??"play"),...Ue==="join"?{ariaLabel:Ms}:{},onToggle:()=>Ca()},id:"grid",playhead:U()?Jt:-1,selectedRow:t?.id,selectedRows:We(),onSelectRow:(e,n)=>{mh(e,n),L()},onDice:e=>{const n=v.doc.tracks[e]?.name??"Lane";v.diceLane(e)&&(C(),L(),ve.show(Le,`New ${n} steps`))},onFill:e=>{Do=e,C(),L()},onClear:()=>{v.clearSteps()&&(C(),L(),ve.show(Le,"Pattern cleared"))},onLength:(e,n)=>{v.edit(a=>{const s=a.tracks[e];s&&(s.length=Math.max(1,Math.min(s.steps.length,Math.round(n))))}),C(),L()},onMute:e=>{v.edit(n=>{const a=n.tracks[e];a&&(a.mute=!a.mute)}),C(),L()},onSolo:e=>{v.edit(n=>{const a=n.tracks[e];a&&(a.solo=!a.solo)}),C(),L()},onToggle:(e,n,a)=>{v.edit(s=>{const o=s.tracks[e]?.steps[n];o&&(a?(o.accent=!o.accent,o.accent&&(o.on=!0)):(o.on=!o.on,o.on||(o.accent=!1)))}),C(),L()},onLongPress:(e,n,a)=>{const s=v.doc.tracks[e],o=s?.steps[n];!s||!o||Ad({anchor:a,title:`${s.name} · step ${n+1}`,velocity:o.velocity,probability:o.probability??1,onChange:({velocity:r,probability:l})=>{v.edit(u=>{const c=u.tracks[e]?.steps[n];c&&(c.on=!0,c.velocity=r,c.probability=l>=1?void 0:l)}),C(),L()}})},onSet:(e,n,a,s)=>{v.edit(o=>{const r=o.tracks[e]?.steps[n];r&&(a==="accent"?(r.accent=s,s&&(r.on=!0)):(r.on=s,s||(r.accent=!1)))}),C(),L()},rows:v.doc.tracks.map((e,n)=>({id:e.id,label:e.name,lane:n%4+1,mute:e.mute,solo:e.solo,length:e.length,steps:e.steps.map(a=>({on:a.on,accent:a.accent,velocity:a.velocity,dim:(a.probability??1)<1}))}))},{type:"group",id:"moves-more",title:"Moves",summary:`Shift · Groove · Hits on ${We().length>1?`${We().length} lanes`:t?.name??"the lane"}`,controls:[fh()]}]},bh(),kh()]}}function gh(t,e=!1){if(!e&&U())return;const n=()=>G?.port.postMessage({type:"audition",voice:t,velocity:.8});if(O){M?.state==="running"&&n();return}Qe().then(async()=>{M&&M.state!=="running"&&await M.resume(),n()}).catch(()=>{})}function vt(t=!1){const e=v.doc.tracks[he()];e&&gh(e.voice,t)}function bh(){const t=v.doc,e=t.engine==="deep",n=ke(t.deep.kit),a=[{type:"choice",id:"engine",label:"Engine",value:t.engine,options:[{value:"classic",label:"Classic"},{value:"deep",label:"Deep"}],onChange:s=>{s!=="classic"&&s!=="deep"||s!==v.doc.engine&&(v.edit(o=>{o.engine=s}),C(),L(),vt())}}];if(e){const s=t.deep.character,o=(u,c,d)=>{const p=ns[u];return ln({type:"slider",id:`deep-${u}`,label:c,min:p.min,max:p.max,step:p.step,value:s[u],valueText:d(s[u]),onChange:f=>{v.edit(g=>{g.deep.character[u]=f}),C(),L()},onCommit:()=>vt()},u==="lowCut"||u==="highCut"?"freq":"linear")},r=u=>u<=0?"off":J(u),l=[o("sat","Saturation",r),o("lowCut","Low cut",u=>Nt(u,20)),o("highCut","High cut",u=>Nt(u,2e4))];a.push({type:"note",id:"deep-kit",text:n.line},o("room","Room",r),o("grit","Grit",r),o("hiss","Hiss",r),{type:"group",id:"deep-kit-more",title:"More",summary:rn([["Saturation",r(s.sat)],["Low cut",Nt(s.lowCut,20)],["High cut",Nt(s.highCut,2e4)]]),controls:l})}return{id:"sound",title:"Sound",panel:!0,subject:e?`Deep · ${n.name}`:"Classic",controls:a}}function yh(t){v.edit(e=>{e.deep=ra(t);for(const n of e.tracks)n.deep=Je(t,n.voice)}),C(),L(),vt()}const wh=["tune","decay","snap","sizzle","level"];function vh(t){if(!t)return[];const e=ke(v.doc.deep.kit,v.doc.deep.version).voices[t.voice],n=Fr(e),a=oa(e),s=c=>a&&c==="noise"?"Tone":Fu[c],o=c=>{const d=ss(e,c),p=t.deep[c];return ln({type:"slider",id:`deep-${c}`,label:s(c),min:d.min,max:d.max,step:d.step,value:p,valueText:Ci(c,p),onChange:f=>{v.edit(g=>{const w=g.tracks[he()];w&&(w.deep[c]=f)}),C(),L()},onCommit:()=>vt()},c==="decay"&&!a?"time":"linear")},r=c=>wh.includes(c)||a&&c==="noise",l=n.filter(r).map(o),u=n.filter(c=>!r(c));return[{type:"note",id:"deep-env",text:""},...l,{type:"group",id:"deep-more",title:"More",summary:rn(u.map(c=>[s(c),Ci(c,t.deep[c])])),controls:u.map(o)}]}let Ft=null,zt=null;function Xo(){if(v.doc.engine!=="deep"){Ft?.el.remove(),zt?.el.remove();return}const t=Xe.el;Ft??=ju(yh),zt??=Hu(()=>vt(!0));const e=v.doc;Ni(t,"deep-kit",Ft.el)&&Ft.set(e.deep.kit,Rr(e.deep)||e.tracks.some(a=>Ir(e.deep.kit,a.voice,a.deep,e.deep.version)));const n=e.tracks[he()];n&&Ni(t,"deep-env",zt.el)&&zt.set(ke(e.deep.kit,e.deep.version).voices[n.voice],n.deep,n.name)}function kh(){const t=he(),e=v.doc.tracks[t],n=["tune","decay","tone","snap","drive","level"];return{id:"parameters",title:"Params",panel:!0,subject:e?.name??"",lane:t%4+1,controls:v.doc.engine==="deep"?vh(e):Eh(n,e)}}const xh={tune:"freq",decay:"time",tone:"linear",snap:"linear",drive:"linear",level:"linear"},$h=t=>t.curve==="log"?"freq":/_ms$/.test(t.key)||t.key==="predelay"?"time":"linear";function Eh(t,e){const n=t.map(o=>{const r=yl(e?.voice,o);return ln({type:"slider",id:bl(e?.voice)?`${e?.voice}-${o}`:o,label:r.label,valueText:r.text(e?.params[o]??0),min:r.min,max:r.max,step:r.step,value:e?.params[o]??0,onChange:l=>{v.edit(u=>{const c=u.tracks[he()];c&&(c.params[o]=l)}),C(),L()}},xh[o])}),a=n.slice(2,5),s=a.map(o=>o.label.toLowerCase());return[...n.slice(0,2),{type:"group",id:"params-more",title:`${s[0]}, ${s[1]} & ${s[2]}`.replace(/^./,o=>o.toUpperCase()),summary:rn(a.map(o=>[o.label,o.valueText??""])),controls:a},...n.slice(5)]}function ta(t,e){v.edit(n=>{const a=ht(n.fx);e(a[t]),n.fx.hacks=a}),C(),L()}function Sh(t,e){const n=ht(v.doc.fx)[t].dials[e.key]??e.default,a=`hack-${t}-${e.key}`,s=o=>ta(t,r=>{r.dials[e.key]=o});return e.options?{type:"select",id:a,label:e.label,value:String(n),options:e.options.map(o=>({value:String(o.value),label:o.label})),onChange:o=>s(Number(o))}:ln({type:"slider",id:a,label:e.label,min:e.min,max:e.max,step:e.step??1,value:n,valueText:yo(e,n,v.doc.bpm),onChange:s},$h(e))}const Cn=(t,e)=>(pe(t)?.dials??[]).filter(n=>!n.key.startsWith("mod_")&&n.more===!0===e).map(n=>Sh(t,n));function Ah(t){return t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)} kHz`:`${Math.round(t)} Hz`}function za(){const t=v.doc.fx,e=ht(t),n=t.mode==="lp"&&t.cutoff>=.999,a=o=>{v.edit(o),C(),L()},s=[e.filter&&!n?"Filter":"",e.drive.on?"Drive":"",e.compressor.on?"Comp":""].filter(Boolean);return{id:"filter",title:"Hacks",summary:s.length?s.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:e.filter,onToggle:o=>a(r=>{r.fx.hacks={...ht(r.fx),filter:o}}),controls:[{type:"select",id:"mode",label:"Mode",value:t.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:o=>a(r=>{(o==="lp"||o==="hp"||o==="bp")&&(r.fx.mode=o)})},{type:"canvas",id:"curve",label:"Curve",paint:"filter",mode:t.mode,cutoff:t.cutoff,resonance:t.mode==="lp"?0:t.resonance},{type:"slider",id:"cutoff",label:"Cutoff",min:0,max:1,step:.01,value:t.cutoff,valueText:n?"open":Ah(vs(t.cutoff)),onChange:o=>a(r=>{r.fx.cutoff=o})},...t.mode==="lp"?[]:[{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:J(t.resonance),onChange:o=>a(r=>{r.fx.resonance=o})}]]},{type:"group",id:"hacks-more",title:"Drive & Compressor",summary:`Drive ${e.drive.on?"on":"off"} · Compressor ${e.compressor.on?"on":"off"}`,controls:[{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:e.drive.on,onToggle:o=>ta("drive",r=>{r.on=o}),controls:Cn("drive",!1),more:Cn("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:e.compressor.on,onToggle:o=>ta("compressor",r=>{r.on=o}),controls:Cn("compressor",!1)},{type:"canvas",id:"meter",label:"Meter",paint:"meter",level:Kn}]}]}}await go();const Qt=ga(Vo());on(Qt.el);await ba();const Xe=ga({id:"pattern",title:"Pattern",lead:!0}),kt=ga({id:"filter",title:za().title}),Jo={build:()=>{Xe.update(Yo()),on(Xe.el),Xo()}},Qo={build:()=>{kt.update(za()),on(kt.el)}};let Zt=null;function L(){v.takeSurpriseEdit()&&ve.dismiss(),Qt.update(Vo()),Zt?.ready(Jo)&&(Xe.update(Yo()),Xo()),Zt?.ready(Qo)&&kt.update(za());for(const t of[Qt,Xe,kt])on(t.el);Qp.follow(),dn?.schedule()}window.addEventListener("pagehide",()=>dn?.flush());function na(t,e,n){R.cancel(),v.replace(t,e),C(),L(),dn?.schedule(),ve.show(Le,n)}Nu(Jp,{save:()=>{const t=v.doc.name||"rhythm",e=URL.createObjectURL(new Blob([ys(v.doc,v.bank)],{type:"application/json"})),n=document.createElement("a");n.href=e,n.download=`${t}.rhythm`,n.click(),setTimeout(()=>URL.revokeObjectURL(e),0),de.say(`Saved ${t}.rhythm`)},load:(t,e)=>{const n=ws(t);if(!n.ok||!n.document||!n.bank){de.say(`Couldn't load ${e}: ${n.errors[0]??"not a Rhythm file"}`);return}na(n.document,n.bank,`Loaded ${e}`)},create:()=>na(Ll(),ls(),"New pattern"),panic:()=>G?.port.postMessage({type:"panic"})});O?.providePreset?.(Gp(()=>({doc:v.doc,bank:v.bank}),(t,e)=>{na(t,e,"Loaded the Scene's pattern"),dn?.flush()}));let Yi=z.transport.running;z.onChange(()=>{if(Q=Bp({sittingOut:Q,running:Yi},z.transport.running,!!O,()=>Op("petra-rhythm",ue)),Yi=z.transport.running,v.playing=U(),!v.playing&&R.pending){const t=R.drop();t&&Ko(t.slot)}v.doc.bpm=z.transport.bpm,C(),L(),Ce()});bt()?.member?.(Xt("petra-rhythm",ue),()=>z.transport.running&&!Q);bt()?.onAll(()=>{Q&&(Q=!1,z.transport.isPlayingAt(B())&&(oe=Math.ceil(z.transport.beatAt(B())/4-1e-9)*4),v.playing=U(),He="",C(),L())});const aa=O?.notesOut?Sp(t=>O.notesOut?.(t)===!0):null;aa&&setInterval(()=>{const t=z.transport,e=G&&t.running?t.beatAt(B()):null;t.running||(Vn=Number.NEGATIVE_INFINITY),aa.tick({beat:e,tracks:Yn(),swing:v.liveSwing,entry:Vn})},50);const Zo=Tp(t=>{G?G.port.postMessage(t):Qe().then(()=>G?.port.postMessage(t))});O?.notesIn?.(t=>Zo.message(t),{takes:"layer"});window.__lupa={out:aa?.stats??null,layer:Zo.stats};I.onSwing(t=>{Me()&&v.adoptSwing(t)&&C(),L()});I.onSnapshot(t=>{if(t.op!=="recall")return;const e=I.peers.get(t.from)?.app;if(!Rl($a,e,Vp)){window.__ignoredRecalls?.push({slot:t.slot,app:e??null});return}window.__recalls?.push({slot:t.slot,atBeat:t.atBeat??null,shared:B()});const n=t.glide?.seconds??0;if(U()&&jo(t.slot,n,t.atBeat)){L();return}R.cancel(),Fa(t.slot,n),C(),L()});I.onRole(()=>{Na(),L(),Ce()});I.onPeers(()=>{L(),Ce()});V&&(window.__rhythm={setKick:t=>{v.edit(e=>{const n=e.tracks.find(a=>a.voice==="kick");n&&n.steps.forEach((a,s)=>{a.on=t.includes(s)})}),C(),L()},store:t=>Ge(t,"store"),tap:t=>Ge(t,"recall"),tempo:t=>ea(t),beat:()=>z.transport.beatAt(B()),timeAt:t=>z.transport.timeAt(t),slots:()=>({active:v.bank.active??null,queued:R.queued}),swing:()=>{const t=v.bank.active;return{live:v.liveSwing,doc:v.doc.swing,slot:t==null?null:v.bank.slots[t]?.swing??null,leader:I.isLeader}},setSwing:t=>{v.setSwing(t),yt(!0),C(),L()},lateEnter:()=>{Zn=!0},audio:async()=>(await Qe(),await M?.resume(),M?.state??"none")});await ba();await I.start();document.addEventListener("keydown",uh);Dd(Sa,[Qt,Xe,kt],"adjacent");await ba();L();Zt=Rd([Jo,Qo]);Ce();Zt.done.then(()=>{Ta.preload(),O&&Qe().then(()=>{jp(qi),!(!U()||M?.state!=="running")&&(Hp(z.transport.beatAt(B()))||La())}).catch(qi),document.documentElement.dataset.rhythmReady=""});setInterval(()=>{const t=U();if(t!==v.playing&&(v.playing=t,L()),Xn(),C(),!V||!M)return;const e=ap(M);e&&window.__stamps?.push(e)},250);
