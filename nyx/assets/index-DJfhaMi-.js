(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const zt=1e-9;function du(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class ho{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return du(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let r=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+zt&&(r=s.bpm);const o=[{beat:t.beat,time:t.time,bpm:this.clamp(r)}];for(const s of a){if(s.beat<=t.beat+zt)continue;const l=this.clamp(s.bpm);l!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+zt){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-zt;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,r=.25){const o=this.bpmAt(n);if(!(a>0)||!(r>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/r));this.setTempoAt(o,n);for(let l=1;l<=s;l++)this.setTempoAt(o+(t-o)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new ho({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+zt)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+zt)return n[a];return n[0]}}const uu=Object.freeze({beatsPerBar:4,beatUnit:4}),Rt=1e-9;function pu(e){return Math.floor(e+Rt)}function dl(e,t,n=!1){if(!(t>0))return e;const r=Math.ceil(e/t-Rt)*t;return n&&r<=e+Rt?r+t:r}class hu{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new ho({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??uu}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-Rt&&(this.stopTime===null||t<this.stopTime-Rt)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-Rt?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=pu(t/n),r=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:r,barPhase:r/n}}nextBar(t,n=!1){return dl(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const ul="nc-clock/snapshot",pl=1;function fu(e,t="local"){return{format:ul,version:pl,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function mu(e,t){const n=gu(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const Pe=e=>typeof e=="number"&&Number.isFinite(e),$i=e=>e===null||Pe(e);function gu(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==ul&&n("format"),(!Pe(t.version)||Math.floor(t.version)!==pl)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!Pe(t.anchor.beat)||!Pe(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&Pe(a.beat)&&Pe(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!Pe(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!Pe(t.meter.beatUnit))&&n("meter"),(!$i(t.startTime)||!$i(t.stopTime)||!Pe(t.stoppedBeat))&&n("transport times"),t}class bu{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new hu(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){mu(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return fu(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const yu="nc-sync/1",wu=1,vu="nc-sync",xu="nc-sync-leader",ku=0,hl=.5,fl=.75;function $u(e){return typeof e=="number"&&Number.isFinite(e)&&e>=hl&&e<=fl?e:null}const Ka=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),ln=e=>typeof e=="number"&&Number.isFinite(e),In=e=>typeof e=="string"&&e.length>0;function Au(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==wu||!In(t.type)||!In(t.from)||!ln(t.term)||!ln(t.seq)||!ln(t.sentAt))return null;switch(t.type){case"hello":return In(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return ln(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&ln(t.slot)?t:null;case"ping":case"pong":return In(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function Eu(e,t,n,a,r){return{proto:yu,from:t,term:n,seq:a,sentAt:r,...e}}function te(){return(performance.timeOrigin+performance.now())/1e3}const Xa=.003,Su=3,Va=.002+1e-6,Mu=.01,Ai=500;class Ei{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Mu:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=Xa&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const r=n-(this.timeOrigin+a)/1e3,o=this.median(),s=r-o,l=Math.abs(r-this.preStepBase),c=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!c&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&c===this.pendingBack&&(c||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,o,c))):(this.pendingStep=s,this.pendingBack=c,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const r=this.heldBase()!==null,o=this.ctx.currentTime,s=o<=this.revertUntil;let l;if(a&&s){const c=this.offsets,d=this.preStep;c.length=0;for(let u=0;u<d.length;u++)c.push(d[u]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:o,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!s){const u=this.offsets,p=this.preStep;p.length=0;for(let h=0;h<u.length;h++)p.push(u[h]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?o+this.stepRevert:-1/0}const c=this.offsets,d=t-n;for(let u=0;u<c.length;u++)c[u]+=d;this.stepCount++,l={stepSeconds:t-n,confirmedAt:o,reanchors:this.stepCount,revert:!1}}if(!r)for(const c of[...this.stepListeners])c(l);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let o=0;o<a;o++){const s=t[o];let l=o-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const r=a>>1;return a%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const r=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(r&&Number.isFinite(r.contextTime)&&Number.isFinite(r.performanceTime)&&r.contextTime>=Xa&&r.performanceTime>0)if(this.waitSince=null,r.contextTime===this.lastStampC&&r.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Ai)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=r.contextTime,this.lastStampP=r.performanceTime,this.stampSince=this.perfNow(),n=r.contextTime-(this.timeOrigin+r.performanceTime)/1e3,a=!0;else if(!r||!(r.contextTime>=Xa)&&!(r.contextTime>0&&!(r.performanceTime>0))){if(r){const o=this.perfNow();if(this.waitSince===null&&(this.waitSince=o),o-this.waitSince<Ai)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(Su,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let r=-1,o=0;for(let l=0;l<n;l++){let c=0;for(let d=0;d<n;d++)Math.abs(t[d]-t[l])<=Va&&c++;c>o&&(r=l,o=c)}if(o<a)return;const s=t[r];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>Va&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-this.estimate())<=Va}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const r=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(r,2)};setTimeout(r,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(r)&&r>0?r:null}}class Lu{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...Ka,...t.capabilities},this.channelOption=t.channel??vu,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const r=this.o.now(),o=()=>{n===this.startWaits&&t(r)};return a.then(o,o),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const r=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(r),0)}else{const r=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?r:Math.max(t+this.o.gatedStartLeadSeconds,r),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[r,o]=this.tempoRange();t=Math.min(o,Math.max(r,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const c=s.beatAt(l+this.o.minLeadSeconds),d=Math.max(n??dl(c,1),c);a&&a>0?(s.tempo.rampTempo(t,d,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,d),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(fl,Math.max(hl,t)):ku;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=$u(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=Au(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...Ka,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...Ka},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(r=>{this.leader&&this.decideStart(r)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(xu,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,l)=>[o?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(r===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,r=o.id)}this.setLeader(r===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==r[0]?a[0]<r[0]:a[1]!==r[1]?a[1]<r[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const r=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>r&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(Eu(t,this.id,this.term,++this.seq,this.o.now()))}}const Tu="modulepreload",Cu=function(e){return"/nyx/"+e},Si={},Nu=function(t,n,a){let r=Promise.resolve();if(n&&n.length>0){let s=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");r=s(n.map(d=>{if(d=Cu(d),d in Si)return;Si[d]=!0;const u=d.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":Tu,u||(h.as="script"),h.crossOrigin="",h.href=d,c&&h.setAttribute("nonce",c),document.head.appendChild(h),u)return new Promise((m,g)=>{h.addEventListener("load",m),h.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return t().catch(o)})};var Fu=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],kr=[.25,.5,.75,1,1.5,2],zu=4.9,V={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},pt={fmt:"wet"},Se={fmt:"pct"},Pt={fmt:"db"},Rn={fmt:"signedPct"},Qa={fmt:"num",suffix:" ms"},K={div:100};function C(e,t,n,a,r,o,s,l){var c={key:e,label:t,min:n,max:a,default:r,step:1,k:o,unit:null,format:s};if(l)for(var d in l)c[d]=l[d];return c}function _n(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var bn=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[C("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:V.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[C("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:V.hpHz,astrid:!0,zero:"off"}),C("q","Resonance",0,100,0,2,{fmt:"q",law:V.hpQ},{dsp:{law:V.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[C("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:V.bpHz,astrid:!0},{dsp:{law:V.bpHz}}),C("q","Q",0,100,0,2,{fmt:"q",law:V.bpQ},{dsp:{law:V.bpQ}}),C("mix","Mix",0,100,100,3,pt,{dsp:K,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[C("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:_n(Fu),overriddenBy:"beats_free",tempoSynced:!0}),C("feedback","Feedback",0,90,35,2,Se,{dsp:K,unit:"%"}),C("mix","Wet/dry",0,100,0,3,pt,{dsp:K,unit:"%",astridKey:"wet"}),C("tone","Tone",0,100,100,4,{fmt:"hz",law:V.delayTone,offAt:100},{dsp:{div:99},more:!0}),C("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),C("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:_n([[0,"Insert"],[1,"Send"]]),more:!0}),C("send","Send",0,100,100,7,Se,{dsp:K,unit:"%",more:!0}),C("mod_send","Accent → send",-100,100,0,8,Rn,{dsp:K,unit:"%",more:!0}),C("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[C("predelay","Pre-delay",0,200,0,1,Qa,{dsp:{div:1e3},unit:"ms"}),C("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:K,unit:"%"}),C("decay","Decay",0,100,50,3,Se,{dsp:K,unit:"%"}),C("damping","Damping",0,100,0,4,Se,{dsp:K,unit:"%"}),C("mix","Mix",0,100,0,5,pt,{dsp:K,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[C("rate","Rate",0,100,26,1,{fmt:"rate",law:V.rate},{dsp:{law:V.rate}}),C("depth","Depth",0,100,70,2,Se,{dsp:K,unit:"%"}),C("feedback","Feedback",-90,90,50,3,Rn,{dsp:K,unit:"%"}),C("mix","Mix",0,100,50,4,pt,{dsp:K,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[C("rate","Rate",0,100,52,1,{fmt:"rate",law:V.rate},{dsp:{law:V.rate}}),C("depth","Depth",0,100,50,2,Se,{dsp:K,unit:"%"}),C("spread","Spread",0,100,70,3,Se,{dsp:K,unit:"%"}),C("mix","Mix",0,100,40,4,pt,{dsp:K,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[C("rate","Rate",0,100,39,1,{fmt:"rate",law:V.rate},{dsp:{law:V.rate}}),C("depth","Depth",0,100,70,2,Se,{dsp:K,unit:"%"}),C("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:_n([[4,"4"],[6,"6"],[8,"8"]])}),C("feedback","Feedback",0,90,30,4,Se,{dsp:K,unit:"%"}),C("mix","Mix",0,100,50,5,pt,{dsp:K,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[C("low_db","Low",-18,18,0,1,Pt,{unit:"dB"}),C("mid_db","Mid",-18,18,0,2,Pt,{unit:"dB"}),C("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:V.midHz,astrid:!0},{dsp:{law:V.midHz}}),C("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:V.eqQ},{dsp:{law:V.eqQ}}),C("high_db","High",-18,18,0,4,Pt,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[C("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),C("output_db","Output",-12,12,0,2,Pt,{unit:"dB"}),C("mix","Mix",0,100,100,3,pt,{dsp:K,unit:"%"}),C("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:_n([[0,"Smooth"],[1,"Acid"]]),more:!0}),C("tone","Tone",0,100,100,5,{fmt:"hz",law:V.driveTone,offAt:100},{dsp:{div:99},more:!0}),C("mod_drive","Accent → drive",-100,100,0,6,Rn,{dsp:K,unit:"%",more:!0}),C("mod_tone","Accent → tone",-100,100,0,7,Rn,{dsp:K,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[C("threshold_db","Threshold",-60,0,0,1,Pt,{unit:"dB"}),C("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:V.ratio},{dsp:{law:V.ratio}}),C("attack_ms","Attack",1,100,10,3,Qa,{unit:"ms"}),C("release_ms","Release",10,1e3,150,4,Qa,{unit:"ms"}),C("makeup_db","Makeup",0,24,0,5,Pt,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[C("width","Width",0,200,100,1,Se,{dsp:K,unit:"%"}),C("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:K})]}],Pu=bn.map(function(e){return e.type});bn.filter(function(e){return!e.hidden}).map(function(e){return e.type});var Bu={reverb:"plate"};function fo(e){var t=Bu[e]||e;return Pu.indexOf(t)>=0?t:null}function je(e){for(var t=fo(e),n=0;n<bn.length;n++)if(bn[n].type===t)return bn[n];return null}function qt(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function ml(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=qt(n.law,t);return a===null?0:a}function Mi(e,t){return Math.min(zu,e*60/(t>0?t:120))}var Li=function(e){return e>0?"+":e<0?"−":""};function Du(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function gl(e,t,n){var a=e.format,r;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:Li(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return Li(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(r=qt(a.law,t),r===null?a.zero||"open":a.astrid?Du(r):r+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+qt(a.law,t).toFixed(1);case"ratio":return qt(a.law,t).toFixed(1)+":1";case"rate":return r=qt(a.law,t),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var o=0;o<e.options.length;o++)if(e.options[o].value===t)return e.options[o].label;return String(t);case"tempoMs":return Math.round(Mi(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(Mi(t,n)*1e3)+" ms"}return String(t)}var Ou=1,Fa=["drive","delay","plate"];function qu(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,r){return gl(e,a,r)},t}var yn=Fa.map(function(e){var t=je(e),n={type:e,label:t.label,dials:t.dials.map(qu)};return t.tempoSynced&&(n.tempoSynced=!0),n}),Iu={reverb:"plate"};function sa(e){var t=Iu[e]||e;return Fa.indexOf(t)>=0?t:null}function za(e){for(var t=sa(e),n=0;n<yn.length;n++)if(yn[n].type===t)return yn[n];return null}function bl(e,t){var n=za(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function Gt(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function rt(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,r=1;r<e.options.length;r++)Math.abs(e.options[r].value-t)<Math.abs(a-t)&&(a=e.options[r].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*o)/o))+0}function Ru(){return{v:Ou,chain:yn.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function _u(e){return kr.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},kr[0])}function Ja(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ju(e){for(var t=Array.isArray(e)?e:Ja(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=Ru(),r={},o=[],s=0;s<t.length;s++){var l=t[s];if(Ja(l)){var c=sa(l.type);if(!c){typeof l.type=="string"&&o.push(l.type);continue}if(r[c]){o.push(c);continue}r[c]=!0;var d=a.chain[Fa.indexOf(c)],u=Ja(l.dials)?l.dials:{};c==="delay"&&u.mix===void 0&&u.wet!==void 0&&(u=Object.assign({},u,{mix:u.wet})),d.bypass=n?l.bypass===!0:l.bypass!==!1,za(c).dials.forEach(function(p){d.dials[p.key]=rt(p,u[p.key])}),Hu(c,d.dials,u)}}return{state:a,dropped:o}}function Hu(e,t,n){for(var a=za(e),r=0;r<a.dials.length;r++){var o=a.dials[r];o.stepWhen&&(t[o.key]=rt(o,n&&typeof n[o.key]=="number"?n[o.key]:t[o.key],Gt(o,t)))}}function $r(e){return ju(e).state}function Wu(e){return JSON.parse(JSON.stringify(e))}var Uu=24,Ar={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Er(e,t,n){if(t==="bypass")return n?0:1;var a=bl(e,t)||Gu(e,t);return a?ml(a,n):0}function Gu(e,t){var n=je(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var Yu={};yn.forEach(function(e){e.dials.forEach(function(t){Yu[e.type+"."+t.key]=t.format})});function Za(e,t){var n=new Float64Array(Uu),a=$r(e);return a.chain.forEach(function(r){var o=Ar[r.type];n[o.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[o[s]]=Er(r.type,s,r.dials[s])})}),n}var Ku=2,la=3,Xu=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function cn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function yl(e,t){var n=je(e);if(!n)return null;var a={};(t||[]).forEach(function(s){s&&s.id&&(a[s.id]=!0)});for(var r=1;a[n.type+"-"+r];)r++;var o={};return n.dials.forEach(function(s){o[s.key]=s.default}),{id:n.type+"-"+r,type:n.type,bypass:!1,dials:o}}function Vu(e){var t=je(e.type),n=/-(\d+)$/.exec(e.id||"");return(t?t.label:e.type)+(n&&+n[1]>1?" "+n[1]:"")}function Qu(e,t,n){var a=e.length-1,r=Math.max(0,Math.min(a,n));if(t<0||t>a||t===r)return e;var o=e.slice(),s=o.splice(t,1)[0];return o.splice(r,0,s),o}function Ju(e){return typeof e=="number"&&isFinite(e)?_u(e):e}function Ti(e,t,n){var a={};return e.dials.forEach(function(r){var o=t[r.key];o===void 0&&r.astridKey&&(o=t[r.astridKey]),n&&e.type==="delay"&&r.key==="delay_beats"&&(o=Ju(o)),a[r.key]=rt(r,o)}),e.dials.forEach(function(r){r.stepWhen&&(a[r.key]=rt(r,typeof t[r.key]=="number"?t[r.key]:a[r.key],Gt(r,a)))}),a}function Zu(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,r=1/0,o=e.min;o<=e.max;o++){var s=qt(n.law,o),l=s===null?1/0:Math.abs(s-t);l<r&&(r=l,a=o)}return a}}var ep={rate:"rate_hz"};function tp(e,t,n,a){var r={};return e.dials.forEach(function(o){if(!o.more){var s=o.astridKey||ep[o.key]||o.key;r[o.key]=Zu(o,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function np(e,t){var n=t>0?Math.floor(t):la,a=[],r=[],o=[],s=!1,l=!1;Array.isArray(e)?(o=e,l=!0):cn(e)&&Array.isArray(e.chain)&&(o=e.chain,s=e.v===1,l=e.schema===2);for(var c=[],d=0;d<o.length;d++){var u=o[d];if(cn(u)&&!(u.type==="limiter"||u.fixed===!0)){var p=fo(u.type),h=p&&je(p);if(!h||s&&["drive","delay","plate"].indexOf(p)<0){typeof u.type=="string"&&a.push(u.type);continue}if(c.length>=n){a.push(u.id||p);continue}var m;cn(u.params)&&!cn(u.dials)?m=Ti(h,tp(h,u.params,r,u.id||p),l):m=Ti(h,cn(u.dials)?u.dials:{},l);var g=yl(p,c),w=typeof u.id=="string"&&Xu.test(u.id)&&!c.some(function(b){return b.id===u.id})?u.id:g.id,f=s?u.bypass!==!1:u.bypass===!0;c.push({id:s?g.id:w,type:p,bypass:f,dials:m})}}return{state:{v:Ku,chain:c},dropped:a,notes:r}}function Qn(e,t){return np(e,t).state}function Bt(e){var t=je(e.type),n=[[0,e.bypass?0:1]];return t.dials.forEach(function(a){n.push([a.k,ml(a,e.dials[a.key])])}),n}function ap(e){var t=Qn(e,8),n=[],a=t.chain.map(function(r,o){var s=je(r.type),l={};return o>=la&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(c){var d=r.dials[c.key];if(c.more){d!==c.default&&n.push(r.id+"."+c.key);return}c.key==="delay_beats"&&kr.indexOf(d)<0&&n.push(r.id+".delay_beats"),l[c.astridKey||c.key]=d}),{id:r.id,type:r.type,bypass:r.bypass,dials:l}});return{hacks:a,lossy:n}}var rp="nc-fx@1",op=600,ip=256,sp=8,dn=typeof WeakMap=="function"?new WeakMap:null;function lp(e,t){var n=dn&&dn.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await Nu(async()=>{const{default:o}=await import("./worklet-source-BibsVBZk.js");return{default:o}},[])).default,r=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),dn&&(dn.set(e,n),n.catch(function(){dn.delete(e)})),n)}function Dt(e,t){return typeof e=="number"&&isFinite(e)?e:t}function wl(e,t,n,a){var r=Math.min(400,Math.max(20,Dt(t.bpm,120))),o=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",c=Dt(t.preGain,1),d=Math.max(0,Dt(t.crossfade,.012)),u=Dt(t.maxDelaySeconds,void 0),p=e.createGain(),h=e.createGain(),m=e.createGain(),g=e.createGain(),w=null;t.modInput===!0&&(w=e.createGain(),w.channelCount=1,w.channelCountMode="explicit",w.channelInterpretation="discrete"),g.gain.value=0,p.connect(m),m.connect(h),g.connect(h);var f={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r,mUsers:0,lv:null,lvAt:0},b=n(r);f.post=function($){f.node?f.node.port.postMessage($):f.disposed||(o.length>=ip&&(o=a().concat([{t:"tempo",bpm:f.bpm,when:0}]),f.mUsers>0&&o.push({t:"meter",on:!0})),o.push($))};function y($){var k=o.map(function(S){var M=Object.assign({},S);return M.when>$||(M.when=0,M.t!=="clear"&&(M.snap=!0)),M});return o=[],k}f.emit=function($){for(var k=0;k<f.listeners.length;k++)try{f.listeners[k]($)}catch(S){typeof console<"u"&&console.error(S)}},f.whenOf=function($){return typeof $=="number"&&isFinite($)&&$>0?$:0};var v=!1;f.tooFar=function($){return typeof $=="number"&&$>e.currentTime+op?(!v&&typeof console<"u"&&(v=!0,console.warn("nc-fx: ignoring a time "+Math.round($-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var x=lp(e,t.moduleUrl).then(function(){if(!f.disposed){var $=Object.assign({bpm:r,bypassMode:l,limiter:s,preGain:c,maxDelaySeconds:u},b);$.pending=y(e.currentTime),f.node=new AudioWorkletNode(e,rp,{numberOfInputs:w?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:$}),f.node.port.onmessage=function(S){var M=S.data;M&&M.t==="lv"&&f.mUsers>0&&(f.lv=M.d,f.lvAt=Ci())},p.connect(f.node),w&&w.connect(f.node,0,1),f.node.connect(g);var k=e.currentTime;k<=0||d===0?(m.gain.value=0,g.gain.value=1):(m.gain.setValueAtTime(1,k),m.gain.linearRampToValueAtTime(0,k+d),g.gain.setValueAtTime(0,k),g.gain.linearRampToValueAtTime(1,k+d)),f.status="ready"}},function($){f.status="unavailable",o=[],f.error=$});f.meterOpen=function(){return f.disposed||f.status==="unavailable"?!1:(f.mUsers++===0&&f.post({t:"meter",on:!0}),!0)},f.meterClose=function(){f.mUsers!==0&&--f.mUsers===0&&(f.lv=null,f.disposed||f.post({t:"meter",on:!1}))},f.levels=function(){return f.lv&&Ci()-f.lvAt<cp?f.lv:null};var A={};return f.meter=function($,k){if(A[$])return A[$];var S=0,M={in:0,out:0},_={open:function(){return f.meterOpen()?(S++,!0):!1},close:function(){S!==0&&(S--,f.meterClose())},read:function(){var j=S>0?f.levels():null;return M.in=0,M.out=0,j&&k(j,M),M}};return A[$]=_,_},f.core={input:p,output:h,modInput:w,ready:x,get status(){return f.status},get error(){return f.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function($,k){var S=Dt($,NaN);!(S>0)||f.disposed||f.tooFar(k)||(f.bpm=Math.min(400,Math.max(20,S)),f.post({t:"tempo",bpm:f.bpm,when:f.whenOf(k)}),f.emit({effect:null,key:"tempo",value:f.bpm}))},getTempo:function(){return f.bpm},clear:function($){var k=$&&typeof $=="object"?$:{at:$};if(!(f.disposed||f.tooFar(k.at))){var S=Dt(k.fadeMs,0);f.post({t:"clear",when:f.whenOf(k.at),fadeMs:S>0?Math.min(1e3,S):0})}},onChange:function($){return f.listeners.push($),function(){var k=f.listeners.indexOf($);k>=0&&f.listeners.splice(k,1)}},dispose:function(){if(!f.disposed){if(f.disposed=!0,f.status="disposed",o=[],f.listeners.length=0,f.node){f.node.port.postMessage({t:"dispose"}),f.node.port.close();try{f.node.disconnect()}catch{}}[p,m,g,h,w].forEach(function($){try{$&&$.disconnect()}catch{}})}}},f}var cp=250;function Ci(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function vl(e,t){t.in=e[0],t.out=e[1]}function dp(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function up(e,t){var n=t||{};if(n.slots)return pp(e,n);var a=$r(n.state),r=Array.from(Za(a)),o=wl(e,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(Za(a)),when:0}]}),s=o.core;function l(c){return a.chain[Fa.indexOf(c)]}return s.setParam=function(c,d,u,p){var h=sa(c);if(!(!h||o.disposed||o.tooFar(p))){var m=l(h),g;if(d==="bypass")g=!!u;else{var w=bl(h,d);if(!w)return;g=rt(w,u,Gt(w,m.dials))}return d==="bypass"?m.bypass=g:m.dials[d]=g,o.post({t:"p",i:Ar[h][d],v:Er(h,d,g),when:o.whenOf(p)}),o.emit({effect:h,key:d,value:g}),za(h).dials.forEach(function(f){if(!(!f.stepWhen||!f.stepWhen.some(function(v){return v.key===d}))){var b=m.dials[f.key],y=rt(f,b,Gt(f,m.dials));y!==b&&(m.dials[f.key]=y,o.post({t:"p",i:Ar[h][f.key],v:Er(h,f.key,y),when:o.whenOf(p)}),o.emit({effect:h,key:f.key,value:y}))}}),g}},s.meter=function(){return o.meter("",vl)},s.getParam=function(c,d){var u=sa(c);if(u){var p=l(u);return d==="bypass"?p.bypass:p.dials[d]}},s.getState=function(){return Wu(a)},s.setState=function(c,d){o.disposed||o.tooFar(d&&d.at)||(a=$r(c),o.post({t:"load",program:Array.from(Za(a)),when:o.whenOf(d&&d.at)}),o.emit({effect:null,key:null,value:null}))},s}function pp(e,t){var n=t.slots===!0?la:Math.max(1,Math.min(sp,Math.floor(+t.slots)||la)),a=Qn(t.state,n),r=1,o={};function s(f){return o[f.id]||(o[f.id]=r++),o[f.id]}function l(f){return f.map(function(b){return{uid:s(b),type:b.type,program:Bt(b)}})}var c=l(a.chain),d=a.chain.map(function(f){return o[f.id]}),u=wl(e,t,function(){return{slots:n,chain:c,order:d}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(f){return o[f.id]}),when:0}]}),p=u.core;function h(f){var b;for(b=0;b<a.chain.length;b++)if(a.chain[b].id===f)return a.chain[b];var y=fo(f);if(y){for(b=0;b<a.chain.length;b++)if(a.chain[b].type===y)return a.chain[b]}return null}function m(f,b){var y=s(f);u.post({t:"add",uid:y,type:f.type,when:b}),Bt(f).forEach(function(v){u.post({t:"ps",uid:y,k:v[0],v:v[1],when:b,snap:!0})})}function g(f){u.post({t:"order",uids:a.chain.map(function(b){return o[b.id]}),when:f})}function w(f,b){var y={};a.chain.forEach(function(A){y[A.id]=A});var v=a.chain.map(function(A){return o[A.id]}).join();f.chain.forEach(function(A){var $=y[A.id];if(!$||$.type!==A.type){delete o[A.id],m(A,b);return}var k={};Bt($).forEach(function(S){k[S[0]]=S[1]}),Bt(A).forEach(function(S){k[S[0]]!==S[1]&&u.post({t:"ps",uid:o[A.id],k:S[0],v:S[1],when:b})})});var x={};f.chain.forEach(function(A){x[A.id]=!0}),Object.keys(o).forEach(function(A){x[A]||delete o[A]}),a=f,a.chain.map(function(A){return o[A.id]}).join()!==v&&g(b)}return p.slots=n,p.meter=function(f){return f==null||f===""?u.meter("",vl):u.meter("#"+f,function(b,y){var v=h(f),x=v?o[v.id]:0,A=b[2];if(x){for(var $=3,k=0;k<A;k++,$+=3)if(b[$]===x){y.in=b[$+1],y.out=b[$+2];return}}})},p.setParam=function(f,b,y,v){var x=h(f);if(!(!x||u.disposed||u.tooFar(v))){var A=je(x.type),$,k=null;if(b==="bypass")$=!!y;else{for(var S=0;S<A.dials.length;S++)A.dials[S].key===b&&(k=A.dials[S]);if(!k)return;$=rt(k,y,Gt(k,x.dials))}var M={},_={};Bt(x).forEach(function(q){M[q[0]]=q[1]}),A.dials.forEach(function(q){q.stepWhen&&(_[q.key]=x.dials[q.key])}),b==="bypass"?x.bypass=$:x.dials[b]=$,A.dials.forEach(function(q){q.stepWhen&&(x.dials[q.key]=rt(q,x.dials[q.key],Gt(q,x.dials)))});var j=u.whenOf(v),ue=o[x.id];return Bt(x).forEach(function(q){(M[q[0]]!==q[1]||k&&q[0]===k.k)&&u.post({t:"ps",uid:ue,k:q[0],v:q[1],when:j})}),u.emit({effect:x.id,key:b,value:$}),Object.keys(_).forEach(function(q){q!==b&&x.dials[q]!==_[q]&&u.emit({effect:x.id,key:q,value:x.dials[q]})}),$}},p.getParam=function(f,b){var y=h(f);if(y)return b==="bypass"?y.bypass:y.dials[b]},p.getState=function(){return JSON.parse(JSON.stringify(a))},p.setState=function(f,b){u.disposed||u.tooFar(b&&b.at)||(w(Qn(f,n),u.whenOf(b&&b.at)),u.emit({effect:null,key:null,value:null}))},p.addEffect=function(f,b){var y=b||{},v=yl(f,a.chain);if(!(!v||a.chain.length>=n||u.disposed||u.tooFar(y.at))){if(y.dials){var x=Qn({v:2,chain:[{id:v.id,type:v.type,dials:y.dials}]},1).chain[0];v.dials=x.dials}y.bypass===!0&&(v.bypass=!0);var A=a.chain.slice(),$=typeof y.index=="number"?Math.max(0,Math.min(A.length,y.index)):A.length;return A.splice($,0,v),w({v:2,chain:A},u.whenOf(y.at)),u.emit({effect:v.id,key:"chain",value:"add"}),v.id}},p.removeEffect=function(f,b){var y=h(f),v=b&&b.at;return!y||u.disposed||u.tooFar(v)?!1:(w({v:2,chain:a.chain.filter(function(x){return x!==y})},u.whenOf(v)),u.emit({effect:y.id,key:"chain",value:"remove"}),!0)},p.moveEffect=function(f,b,y){var v=h(f),x=y&&y.at;if(!v||u.disposed||u.tooFar(x))return!1;var A=Qu(a.chain,a.chain.indexOf(v),b);return A===a.chain?!1:(w({v:2,chain:A},u.whenOf(x)),u.emit({effect:v.id,key:"chain",value:"move"}),!0)},p.getChain=function(){return a.chain.map(function(f){return{id:f.id,type:f.type,name:Vu(f),bypass:f.bypass}})},p.toAstrid=function(){return ap(a)},p}function Ni(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function hp(e,t,n){var a=n||{},r=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,o=typeof a.toAudioTime=="function"?a.toAudioTime:r?function(h){return r.toContextTime(h)}:t&&t.timebase==="shared"?null:function(h){return h},s=typeof a.now=="function"?a.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,l=t&&t.transport?t.transport:t,c=l&&l.tempo?l.tempo:l,d=!1;function u(h){if(!o){!d&&typeof console<"u"&&(d=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof h!="number")){var m=o(l.timeAt(h));return typeof m=="number"&&isFinite(m)?m:void 0}}function p(){var h=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(h)){var m=l&&typeof l.bpm=="number"?l.bpm:Ni(c,0);m>0&&e.setTempo(m);return}var g=Ni(c,h);g>0&&e.setTempo(g);for(var w=c&&(c.points||c.tempoPoints)||[],f=0;f<w.length;f++){var b=w[f];if(b.beat>h&&b.bpm>0){var y=u(b.beat);y!==void 0&&e.setTempo(b.bpm,y)}}}return p(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(h){h&&(h.kind==="tempo"&&h.bpm>0?e.setTempo(h.bpm,u(h.atBeat)):(h.kind==="snapshot"||h.kind==="start")&&p())})}const fp="/nyx/assets/worklet-CAv1bvAp.js";var mp="nc-ui",gp={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},mo={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},ca={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},bp={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Ze={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},yp={light:{color:gp.color,semantic:mo,component:ca,runtime:bp},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},fn=e=>`--${mp}-${e}`,Sr=mo["label-on-fill-dark"],Fi=mo["label-on-fill-light"],wp=Ze["label-min-contrast"],vp=/^#[0-9a-f]{6}$/i,xp=e=>typeof e=="string"&&vp.test(e),Jn=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function zi(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),r=o=>{let s=(o+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${Jn(r(0)*255)}${Jn(r(8)*255)}${Jn(r(4)*255)}`}function xl(e){let[t,n,a]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),r=Math.max(t,n,a),o=Math.min(t,n,a),s=(r+o)/2,l=r-o;if(!l)return{h:0,s:0,l:s};let c=l/(1-Math.abs(2*s-1));return{h:((r===t?60*((n-a)/l%6):r===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:c,l:s}}function Pi(e){let[t,n,a]=[1,3,5].map(r=>{let o=parseInt(e.slice(r,r+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function Mr(e,t){let[n,a]=[Pi(e),Pi(t)].sort((r,o)=>o-r);return(n+.05)/(a+.05)}var da=e=>Mr(e,Sr)>=Mr(e,Fi)?Sr:Fi;function kl(e,t,n,a=wp){let r=zi(e,t,n),o=da(r)===Sr?1:-1;for(let s=0;s<40&&Mr(r,da(r))<a;s++)n+=o*.01,r=zi(e,t,n);return r}function kp(e){let{h:t,s:n}=xl(e),a=kl(t,Math.min(n,Ze["surprise-on-max-saturation"]),Ze["surprise-on-lightness"]);return{fill:e,ink:da(e),on:a,onInk:da(a)}}var $p=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function Ap(e,t=Math.random){let[n,a]=Ze["surprise-saturation"],[r,o]=Ze["surprise-lightness"],s=Ze["surprise-min-hue-gap"],l=xp(e)?xl(e).h:null,c=t()*360;return l!==null&&$p(c,l)<s&&(c=(l+s+t()*(360-2*s))%360),kl(c,n+t()*(a-n),r+t()*(o-r))}function Ep(e){if(!e)return null;let t=kp(e);return{[fn("surprise-fill")]:t.fill,[fn("surprise-ink")]:t.ink,[fn("surprise-on")]:t.on,[fn("surprise-on-ink")]:t.onInk}}var Sp=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Mp=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Bi(e){let[t,n,a]=[1,3,5].map(l=>Sp(parseInt(e.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),o=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*r+.793617785*o-.0040720468*s,1.9779984951*r-2.428592205*o+.4505937099*s,.0259040371*r+.7827717662*o-.808675766*s]}function Lp([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,r=(e-.1055613458*t-.0638541728*n)**3,o=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*r+.2309699292*o,-1.2684380046*a+2.6097574011*r-.3413193965*o,-.0041960863*a-.7034186147*r+1.707614701*o].map(s=>Jn(Mp(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Tp=Ze["velocity-range"],$l={min:ca.rhythm["velocity-min"],max:ca.rhythm["velocity-max"]},Di=Object.fromEntries(Object.entries(yp).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Cp(e,t=$l){let[n,a]=Tp,r=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,o=(r-n)/(a-n),s=t.ink??ca.rhythm["step-cell-ink"];if(o<=0)return{velocity:r,t:0,fill:t.min.toUpperCase(),ink:s};if(o>=1)return{velocity:r,t:1,fill:t.max.toUpperCase(),ink:s};let l=Bi(t.min),c=Bi(t.max);return{velocity:r,t:o,fill:Lp(l.map((d,u)=>d+(c[u]-d)*o)),ink:s}}function Oi(e,t=$l){return{[fn("velocity-fill")]:Cp(e,t).fill}}var Al="data-nc-theme",qi="nc-ui-theme-change",Np="(prefers-color-scheme: dark)",El=e=>e?.documentElement??null,Sl=e=>e?.defaultView?.matchMedia?.(Np)??null,Fp=e=>e==="light"||e==="dark"?e:"system";function zp(e=globalThis.document){return Fp(El(e)?.getAttribute(Al))}function Lr(e=globalThis.document){let t=zp(e);return t!=="system"?t:Sl(e)?.matches?"dark":"light"}function Ml(e,t=globalThis.document){let n=El(t);if(!n)return()=>{};let a=Lr(t),r=()=>{let c=Lr(t);c!==a&&(a=c,e(c))},o=t.defaultView?.MutationObserver,s=o?new o(r):null;s?.observe(n,{attributes:!0,attributeFilter:[Al]});let l=Sl(t);return l?.addEventListener?.("change",r),t.addEventListener(qi,r),()=>{s?.disconnect(),l?.removeEventListener?.("change",r),t.removeEventListener(qi,r)}}var Pp={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Bp={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Dp={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Op={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Pa={};for(let[e,t]of Object.entries(Bp))Pa[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(Op))Pa[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Dp))Pa[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(Pp.renames.map(e=>[e.old,e.new]));function Ll(e){let t=Pa[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function U(e){return Ll(e).prop}function i(e){return`var(${U(e)})`}function qp(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(U(t)));return Number.isFinite(n)?n:0}function Z(e,t){let n=Ll(t),a=e.ownerDocument??document,r=a.createElement("span");r.dataset.ncLive=t,r.style.position="absolute",r.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=o:r.style.color=o,(e instanceof Element?e:a.documentElement).append(r);let s=(a.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function Tl(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function Ip(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=i("font-ui"),n.style.fontSize=i("label-size"),n.style.fontWeight=i("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var Rp="[data-modulated], [data-modulated] *";function er(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function Ii(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${i("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${i("hairline")} solid ${i("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function _p(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${U("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${U("divider")}: ${i(`module-div-stack-${a}`)};
      ${U("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${U("text-sub")}: ${i("module-sub-stack-1")};
      ${U("divider")}: ${i("module-div-stack-1")};
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
${Rp} { transition: none; }
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
  ${U("text-sub")}: ${i("module-sub-stack-1")};
  ${U("divider")}: ${i("module-div-stack-1")};
  ${U("slider-track")}: ${i("module-div-stack-1")};
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
  ${U("text-sub")}: ${i("module-sub-stack-1")};
  ${U("divider")}: ${i("module-div-stack-1")};
  ${U("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${i("control-gap")} ${i("module-pad")};
  padding-bottom: ${i("module-pad")};
  background: ${i("module-bg-stack-1")};
  ${U("text-sub")}: ${i("module-sub-stack-1")};
  ${U("divider")}: ${i("module-div-stack-1")};
  ${U("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${U("text-sub")}: inherit;
  ${U("divider")}: inherit;
  ${U("slider-track")}: inherit;
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
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${U("divider")}: color-mix(in oklab, ${i("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${U("meter-track")}: color-mix(in oklab, ${i("text-sub")} 30%, var(--nc-strip-shade)); }
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
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${U("divider")}: ${i("strip-divider")}; }
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
${Ii("")}
}
@media (max-width: 1023px) {
${Ii("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${er("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${er("")}
}
@media (max-width: 1023px) {
${er("html[data-nc-landscape] ")}
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
`}var tr=null,jp="nc-ui-fallback";function Cl(e=globalThis.document){if(!e?.documentElement||(e.documentElement,tr&&tr.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${jp} {
${_p()}
}
`,e.head.append(t),tr=t}var un=null,Hp=0,Wp=new URL("/nyx/assets/confirm-DwyQU4Nn.css",import.meta.url).href,Nl=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Wp,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Nl(document);function go(e){return Up(e).then(t=>!!t.ok)}function Up({title:e,body:t,lines:n=[],extra:a,confirmLabel:r="Confirm",cancelLabel:o="Cancel",danger:s=!1,root:l,returnFocus:c,signal:d},u){if(un||d?.aborted)return Promise.resolve({});let p=l?.ownerDocument??document,h=Nl(p),m=l??p.body,g=p.defaultView??globalThis,w=`nc-ui-confirm-${++Hp}`,f=(D,pe,oe)=>{let We=p.createElement(D);return We.className=`nc-ui-confirm${pe}`,oe!=null&&(We.textContent=oe),We},b=f("div","-layer");b.dataset.state="enter";let y=f("div","");y.setAttribute("role","alertdialog"),y.setAttribute("aria-modal","true"),y.setAttribute("aria-labelledby",`${w}-t`);let v=f("h2","-title",e);v.id=`${w}-t`;let x=f("p","-body",t);x.id=`${w}-b`;let A=n.map((D,pe)=>{let oe=f("p","-body",D?.text??D);return oe.id=`${w}-b${pe}`,D?.tone==="danger"&&(oe.dataset.tone="danger"),oe});y.setAttribute("aria-describedby",[x,...A].map(D=>D.id).join(" "));let $=a&&f("button","-extra",a.label);$&&($.type="button",$.dataset.ncConfirm="extra",$.addEventListener("click",()=>a.onAction?.()));let k=f("div","-actions"),S=(D,pe)=>{let oe=f("button","-btn",D);return oe.type="button",oe.dataset.ncConfirm=pe,oe.addEventListener("click",()=>Nt(pe==="ok")),oe},M=S(o,"cancel"),_=S(r,"ok");s&&(_.dataset.danger="true"),k.append(M,_);let[j,ue]=[];y.append(v,x,...A,...j?[j]:[],...$?[$]:[],k);let q=[ue,$,M,_].filter(Boolean);b.append(y);let He={layer:b};un=He;let Tt=c??p.activeElement,an=[];for(let D of m.children)D.hasAttribute("inert")||(D.setAttribute("inert",""),an.push(D));let Ct=()=>{if(un!==He)return;m.append(b),(ue??M).focus({preventScroll:!0});let D=g.requestAnimationFrame?.bind(g)??(pe=>setTimeout(pe,16));D(()=>D(()=>{b.dataset.state==="enter"&&(b.dataset.state="open")}))};h?h.then(Ct):Ct();let re=!1;b.addEventListener("pointerdown",D=>{re=D.target===b}),b.addEventListener("click",D=>{D.target===b&&re&&Nt(!1),re=!1});let rn=D=>{if(D.stopImmediatePropagation(),D.key==="Escape")D.preventDefault(),Nt(!1);else if(D.key==="Tab"){D.preventDefault();let pe=q.filter(We=>!We.disabled),oe=pe.length;pe[(pe.indexOf(p.activeElement)+(D.shiftKey?oe-1:1))%oe].focus()}else D.key==="Enter"&&(D.preventDefault(),p.activeElement===$?$.click():p.activeElement===M?Nt(!1):_.disabled||Nt(!0))},qn=D=>D.stopImmediatePropagation();g.addEventListener("keydown",rn,!0),g.addEventListener("keyup",qn,!0);let on=()=>Nt(!1);d?.addEventListener("abort",on);let sn,cu=new Promise(D=>{sn=D});function Nt(D){if(un!==He)return;un=null,g.removeEventListener("keydown",rn,!0),g.removeEventListener("keyup",qn,!0),d?.removeEventListener("abort",on);for(let Ft of an)Ft.removeAttribute("inert");b.dataset.state="closing",Tt?.isConnected&&typeof Tt.focus=="function"&&Tt.focus({preventScroll:!0});let pe=g.getComputedStyle?.(b),oe=Math.max(0,...String(pe?.transitionDuration??"").split(",").map(Ft=>Number.parseFloat(Ft)*(Ft.trim().endsWith("ms")?1:1e3)||0)),We=()=>b.remove();b.addEventListener("transitionend",Ft=>Ft.target===b&&We()),setTimeout(We,oe+50),sn({ok:D,value:ue?.value.trim()})}return cu}function Fl(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.dataset.ncOn="",r.textContent=e.onText??"On";let o=t.createElement("span");o.dataset.ncOff="",o.textContent=e.offText??"Off",a.append(r,o),n.append(a);let s=!1,l=d=>{s=d===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let c=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",c),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var zl=new WeakMap,Ri=.25;function Gp(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(a,r);let o=0,s=e.step??.005,l=e.onChange,c=e.onReset,d=f=>Math.min(1,Math.max(0,f)),u=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},p=f=>{let b=d(f);b!==o&&(o=b,u(),l?.(b))},h=0,m=!1;n.addEventListener("pointerdown",f=>{if(f.button!==0)return;f.preventDefault(),n.focus?.({preventScroll:!0});let b=n.getBoundingClientRect();f.target!==r&&b.height>0&&p(1-(f.clientY-b.top)/b.height),h=f.clientY,m=!0,n.dataset.dragging="true",n.setPointerCapture?.(f.pointerId)}),n.addEventListener("pointermove",f=>{if(!m)return;let b=n.getBoundingClientRect().height||1,y=(h-f.clientY)/b*(f.shiftKey?Ri:1);h=f.clientY,p(o+y)});let g=()=>{m=!1,delete n.dataset.dragging};n.addEventListener("pointerup",g),n.addEventListener("pointercancel",g),n.addEventListener("lostpointercapture",g),n.addEventListener("dblclick",f=>{f.preventDefault(),c?.()}),n.addEventListener("keydown",f=>{let b=f.shiftKey?s*Ri:s,y={ArrowUp:o+b,ArrowRight:o+b,ArrowDown:o-b,ArrowLeft:o-b,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};f.key in y&&(f.preventDefault(),p(y[f.key]))});let w={el:n,get value(){return o},get dragging(){return m},set(f){m||(o=d(Number(f)||0),u())},setText(f){f?n.setAttribute("aria-valuetext",f):n.removeAttribute("aria-valuetext")},setLabel(f){n.setAttribute("aria-label",f)},configure(f){typeof f.step=="number"&&f.step>0&&(s=f.step),f.onChange&&(l=f.onChange),f.onReset&&(c=f.onReset)}};return w.setLabel(e.label),w.set(e.value??0),w.setText(e.valueText),zl.set(n,w),w}function Yp(e){return zl.get(e)}var Pl=new WeakMap,Kp=.2,Xp=1.5,Vp=.5;function Qp(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function _i(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Qp(a.getComputedStyle(e).getPropertyValue(U(t)),n)}function Jp(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let r=t.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let o=t.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let w=0;w<n;w++){let f=t.createElement("span");f.className="nc-meter-bar";let b=t.createElement("span");b.className="nc-meter-peak";let y=t.createElement("span");y.className="nc-meter-rms";let v=t.createElement("span");v.className="nc-meter-hold",f.append(b,y,v),o.append(f),s.push({peak:b,rms:y,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(r,o);let l=e.label,c=e.onClear,d=!1,u=-1,p=-1,h=()=>{r.dataset.lit=d?"true":"false",r.setAttribute("aria-pressed",d?"true":"false"),r.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),r.title=d?"Clipped. Click to clear":"Clip light"},m=(w,f,b,y)=>{let v=Math.round(y*1e3)/1e3;b[f]!==v&&(b[f]=v,w.style.transform=f==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};r.addEventListener("click",()=>{g.clear(),c?.()});let g={el:a,get clipped(){return d},update(w,f){u<0&&(u=_i(a,"motion-meter-fall",Kp)),p<0&&(p=_i(a,"motion-meter-hold",Xp));let b=Math.max(0,Math.min(.25,Number(f)||0)),y=u>0?Math.exp(-b/u):0;s.forEach((v,x)=>{let A=w[x]??w[0]??{peak:0,rms:0},$=Math.min(1,Math.max(0,Number(A.peak)||0)),k=Math.min($,Math.max(0,Number(A.rms)||0));A.over&&g.clip(),v.level.peak=$>=v.level.peak?$:$+(v.level.peak-$)*y,v.level.rms=k>=v.level.rms?k:k+(v.level.rms-k)*y,v.holdAge+=b,$>=v.holdAt?(v.holdAt=$,v.holdAge=0):v.holdAge>p&&(v.holdAt=Math.max($,v.holdAt-Vp*b)),m(v.peak,"peak",v.shown,v.level.peak),m(v.rms,"rms",v.shown,v.level.rms),m(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,h())},clear(){d=!1,h()},reset(){for(let w of s)w.level.peak=0,w.level.rms=0,w.holdAt=0,w.holdAge=0,m(w.peak,"peak",w.shown,0),m(w.rms,"rms",w.shown,0),m(w.hold,"hold",w.shown,0),w.hold.dataset.off="true"},setLabel(w){l=w,h()},configure(w){w.onClear&&(c=w.onClear)}};return h(),g.reset(),Pl.set(a,g),g}function Zp(e){return e?Pl.get(e):void 0}var eh=3,th=new Set(["freq","q","rate","time","log"]);function bo(e,t,n){return!e||!th.has(e)||!(n>t)?"linear":t>0?"log":"power"}function Ba(e,t,n){return bo(e,t,n)!=="linear"}function ua(e,t,n,a){let r=Number(a);if(!(n>t)||!Number.isFinite(r))return 0;let o=Math.min(n,Math.max(t,r)),s=bo(e,t,n);if(s==="log")return Math.log(o/t)/Math.log(n/t);let l=(o-t)/(n-t);return s==="power"?Math.cbrt(l):l}function Bl(e,t,n,a){let r=Math.min(1,Math.max(0,Number(a)||0)),o=bo(e,t,n);return o==="log"?t*(n/t)**r:t+(n-t)*(o==="power"?r**eh:r)}function Dl(e,t,n,a){let r=Math.min(n,Math.max(t,e));if(a>0){r=t+Math.round((r-t)/a)*a;let o=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));r=Number(r.toFixed(o)),r=Math.min(n,Math.max(t,r))}return r}function yo(e,t,n,a){return Math.round(ua(e,t,n,a)*1e3)}function Tr(e,t,n,a,r){return Dl(Bl(e,t,n,Number(a)/1e3),t,n,r)}function nh(e,t,n=!1){let a=Number(e)||0,r=n?1:1e3/100,o=null;return t==="ArrowRight"||t==="ArrowUp"?o=a+r:t==="ArrowLeft"||t==="ArrowDown"?o=a-r:t==="PageUp"?o=a+1e3/10:t==="PageDown"?o=a-1e3/10:t==="Home"?o=0:t==="End"&&(o=1e3),o===null?null:Math.min(1e3,Math.max(0,Math.round(o)))}function Ol(e,t,n,a,r,o=!1,s){let l=yo(e,t,n,a),c=nh(l,r,o);if(c===null)return null;let d=Tr(e,t,n,c,s),u=Math.sign(c-l),p=Dl(Number(a),t,n,s);for(;u!==0&&d===p&&c>0&&c<1e3;)c+=u,d=Tr(e,t,n,c,s);return d}function ah(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function ji(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function rh(e,t,n,a=n/6){let r=e.some(u=>u===null),o=Math.max(0,n-(r?a:0)),s=e.reduce((u,p,h)=>p===null?u:u+ji(t[h]),0),l=s>0?o/s:0,c=e.map(u=>u===null?0:Math.min(o,ji(u)*l));if(r){let u=c.reduce((h,m)=>h+m,0),p=e.indexOf(null);c[p]=Math.max(a,n-u)}let d=[0];for(let u of c)d.push(Math.round((d[d.length-1]+u)*100)/100);return r&&(d[d.length-1]=n),d}function oh(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(t*a)),o=Math.max(1,Math.floor(n*a));(e.width!==r||e.height!==o)&&(e.width=r,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function Ue(e){return Math.max(0,Math.min(1,e))}function ql(e,t){let{ctx:n,w:a,h:r}=oh(e);if(!n)return;n.clearRect(0,0,a,r);let o=Ip(e);if(t.paint==="swatch"){let c=Z(e,"accent"),d=Z(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,a/2,r),n.fillStyle=d,n.fillRect(a/2,0,a/2,r);return}if(t.paint==="filter"&&typeof t.hz=="number"){lh(n,a,r,t,e,o);return}if(t.paint==="filter"){let c=t.mode??"lp",d=Z(e,Tl(c)),u=Z(e,"divider"),p=Ue(t.cutoff??.5),h=.08+(1-Ue(t.resonance??.2))*.22;n.strokeStyle=u,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(a,r*.72),n.stroke(),n.beginPath();for(let m=0;m<=a;m++){let g=m/Math.max(1,a),w=0;c==="lp"?w=g<p?1:Math.max(0,1-(g-p)/h):c==="hp"?w=g>p?1:Math.max(0,1-(p-g)/h):w=Math.max(0,1-Math.abs(g-p)/h);let f=r*.78-w*r*.62;m===0?n.moveTo(m,f):n.lineTo(m,f)}n.strokeStyle=d,n.stroke(),n.fillStyle=Z(e,"text-sub"),n.font=o,n.fillText(c.toUpperCase(),0,r),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=Z(e,"accent");let c=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[u,p,h]=rh([c,d],t.max??[1,4],a),m=2,g=r-1;n.beginPath(),n.moveTo(u,g),n.lineTo(p,m);let w=Math.max(1,Math.ceil(h-p));for(let f=1;f<=w;f++){let b=f/w;n.lineTo(p+(h-p)*b,g-(g-m)*Math.exp(-4.6*b)*(1-b*.01))}n.lineTo(h,g),n.lineTo(a,g),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[d,u]=Array.isArray(t.region)?t.region:[0,1],p=Z(e,"accent"),h=Z(e,"text-sub"),m=r/2;n.fillStyle=Z(e,"accent-soft"),n.fillRect(Ue(d)*a,0,(Ue(u)-Ue(d))*a,r),n.strokeStyle=Z(e,"divider"),n.beginPath(),n.moveTo(0,m),n.lineTo(a,m),n.stroke();let g=Math.floor(c.length/2);for(let w=0;w<g;w++){let f=(w+.5)/g*a,b=Math.max(-1,Math.min(1,c[w*2]??0)),y=Math.max(-1,Math.min(1,c[w*2+1]??0)),v=(w+.5)/g;n.strokeStyle=v>=d&&v<=u?p:h,n.beginPath(),n.moveTo(f,m-y*(m-1)),n.lineTo(f,m-b*(m-1)+.5),n.stroke()}n.strokeStyle=p;for(let w of[d,u,...Array.isArray(t.markers)?t.markers:[]]){let f=Math.round(Ue(w)*(a-1))+.5;n.beginPath(),n.moveTo(f,0),n.lineTo(f,r),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=Z(e,"text"),n.fillRect(Math.round(Ue(t.position)*(a-1)),0,1,r)),g||(n.fillStyle=h,n.font=o,n.fillText(t.empty??"Empty",0,m+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let c=Ue(t.level??0);n.fillStyle=Z(e,"divider"),n.fillRect(0,r*.4,a,r*.2),n.fillStyle=Z(e,"accent"),n.fillRect(0,r*.4,a*c,r*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=Z(e,"rhythm.step-cell-off"),n.fillRect(0,r*.45,a,r*.1),n.fillStyle=Z(e,"rhythm.playhead"),n.fillRect(l/s*a,r*.3,Math.max(1,a/s),r*.4),e.dataset.ncAccent=Z(e,"accent")}var wn=20,Cr=2e4,nr=24,Hi=-60;function ih(e,t,n,a,r=48e3){let o=2*Math.PI*Math.min(t,r*.49)/r,s=Math.cos(o),l=Math.sin(o)/(2*n),c,d,u;e==="hp"?[c,d,u]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[c,d,u]=[l,0,-l]:[c,d,u]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,h=-2*s,m=1-l,g=2*Math.PI*a/r,w=(v,x,A)=>v+x*Math.cos(g)+A*Math.cos(2*g),f=(v,x)=>-(v*Math.sin(g)+x*Math.sin(2*g)),b=Math.hypot(w(c,d,u),f(d,u)),y=Math.hypot(w(p,h,m),f(h,m));return y>0?b/y:0}function sh(e,t){return Math.log(Math.max(wn,Math.min(Cr,e))/wn)/Math.log(Cr/wn)*t}function Wi(e,t,n){let a=Math.max(Hi,Math.min(nr,e));return t+(nr-a)/(nr-Hi)*(n-t)}function lh(e,t,n,a,r,o){let s=a.mode??"lp",l=Z(r,Tl(s)),c=Z(r,"divider"),d=Z(r,"text-sub"),u=Number.parseFloat(String(o).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,h=Math.max(p+4,n-u-3),m=a.q??Math.SQRT1_2,g=Math.round(Wi(0,p,h))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,g),e.lineTo(t,g),e.stroke(),e.beginPath();for(let w=0;w<=t;w++){let f=wn*(Cr/wn)**(w/Math.max(1,t)),b=a.open?1:ih(s,a.hz,m,f,a.sampleRate),y=Wi(20*Math.log10(Math.max(1e-5,b)),p,h);w===0?e.moveTo(w,y):e.lineTo(w,y)}if(e.strokeStyle=l,e.stroke(),!a.open){let w=Math.round(sh(a.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(w,p),e.lineTo(w,h),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=o,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",r.dataset.ncAccent=l,r.dataset.ncFilterHz=String(Math.round(a.hz))}function Me(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let r=n.defaultView.getComputedStyle(a).color;return a.remove(),r}function ch(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var xt=20,Pn=2e4,wo=Math.log(Pn/xt),Nr=32,dh=250,uh=-100,ph=1200,hh=4.5,Ui=-6,ft=-96,fh=48,Gi=[100,1e3,1e4],mh=[6,12];function _t(e,t){return Math.log(Math.max(xt,Math.min(Pn,e))/xt)/wo*t}function Zn(e,t){return xt*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*wo)}function et(e,t,n,a){let r=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*r}function Fr(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var Il=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function gh(e,t,n,a){let r=n?3:1,o=c=>({db:Math.max(-a,Math.min(a,e.db+c*r))}),s=c=>({hz:Math.max(e.minHz??xt,Math.min(e.maxHz??Pn,e.hz*2**(c*r/6)))}),l=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*r)))});switch(t){case"ArrowUp":return o(1);case"ArrowDown":return o(-1);case"ArrowRight":return e.moveHz?s(1):o(1);case"ArrowLeft":return e.moveHz?s(-1):o(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function vo(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function bh(e,t,n,a,r,o,s,l,c){let d=c?.25:1,u={},p=Math.max(1,o/2-l);if(u.db=Math.max(-s,Math.min(s,t.db-a*d/p*s/vo(e))),e.moveHz){let h=t.hz*Math.exp(n*d/Math.max(1,r)*wo);u.hz=Math.max(e.minHz??xt,Math.min(e.maxHz??Pn,h))}return u}function yh(e,t,n,a,r){let o=Math.max(0,n.left)+1,s=Math.min(n.right,r)-1,l=Math.min(t.width*3+a*2,s-o),c=Math.max(o,Math.min(e.left,s-l));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var ae=new WeakMap;function wh(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let r=document.createElement("canvas");r.className="nc-eq-spectrum",r.setAttribute("aria-hidden","true");let o=document.createElement("canvas");o.className="nc-eq-curve",o.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(r,o);for(let c of e.bands)a.append(vh(n,c,t));a.append(s),a.addEventListener("click",c=>{if(!Ul(n)||c.button>0)return;let d=Wl(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),ae.set(n,{control:e,cache:null,spec:null,active:null}),_l(n,e),n}function Rl(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function vh(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let r=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},o=()=>r()?.bands.find(d=>d.id===t.id)??null,s=null;a.addEventListener("pointerdown",d=>{if(d.button!==0)return;let u=o();u&&(d.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(d.pointerId),s={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:u.hz,db:u.db}},a.dataset.drag="true",Ge(e,t.id))}),a.addEventListener("pointermove",d=>{if(!s||d.pointerId!==s.id)return;let u=r(),p=o(),h=ae.get(e);if(!u||!p||!h?.box)return;let{w:m,h:g,pad:w}=h.box;u.onBand(p.id,bh(p,s.start,d.clientX-s.x,d.clientY-s.y,m,g,u.range??18,w,d.shiftKey))});let l=d=>{!s||d.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&Ge(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",d=>{d.preventDefault(),r()?.onReset?.(t.id)}),a.addEventListener("keydown",d=>{let u=r(),p=o();if(!u||!p)return;let h=gh(p,d.key,d.shiftKey,u.range??18);h&&(d.preventDefault(),h==="reset"?u.onReset?.(p.id):u.onBand(p.id,h),Ge(e,p.id))});let c=null;return a.addEventListener("wheel",d=>{let u=r(),p=o();if(!u||!p?.moveQ)return;d.preventDefault();let h=d.timeStamp;(!c||h-c.t>400)&&(c={q:p.q,t:h});let m=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,c.q*2**(-m/240))),c.t=h,u.onBand(p.id,{q:c.q}),Ge(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>Ge(e,t.id)),a.addEventListener("focus",()=>Ge(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&Ge(e,null)}),a.addEventListener("blur",()=>{s||Ge(e,null)}),a}function Ge(e,t){let n=ae.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?Yt(e):xo(e)}function xo(e){let t=ae.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(g=>g.id===t.active):null;for(let g of e.querySelectorAll(".nc-eq-node"))g instanceof HTMLElement&&(a&&g.dataset.band===a.id?g.dataset.active="true":delete g.dataset.active);if(!a||!t.box){n.hidden=!0;return}let r=[a.label,Il(a.db)];a.kind==="peak"?r.push(Fr(a.hz),`Q ${a.q.toFixed(1)}`):r.push(`${a.kind==="lowshelf"?"below":"above"} ${Fr(a.hz)}`),n.textContent=r.join(" · "),n.dataset.tone=String(xh(t.control,a)),n.hidden=!1;let{w:o,h:s,pad:l}=t.box,c=_t(a.hz,o),d=et(a.db*vo(a),s,t.control.range??18,l),u=n.offsetWidth,p=n.offsetHeight,h=Math.max(0,Math.min(o-u,c-u/2)),m=d-p-l*1.5>=0?d-p-l*1.5:Math.min(s-p,d+l*1.5);n.style.left=`${Math.round(h)}px`,n.style.top=`${Math.round(m)}px`}function xh(e,t){return e.bands.indexOf(t)%3+1}function _l(e,t){let n=ae.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",ko(e);let a=t.range??18;t.bands.forEach((r,o)=>{let s=Rl(e,r.id);s instanceof HTMLElement&&(s.dataset.tone=String(o%3+1),s.dataset.kind=r.kind,s.setAttribute("aria-label",`${r.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(r.db)),s.setAttribute("aria-valuetext",r.valueText??`${Il(r.db)}, ${Fr(r.hz)}`),s.setAttribute("aria-keyshortcuts",r.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),r.help?s.setAttribute("data-nc-help",r.help):s.removeAttribute("data-nc-help"))}),Yt(e),Mh(e)}function jl(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.round(t*a)),o=Math.max(1,Math.round(n*a));(e.width!==r||e.height!==o)&&(e.width=r,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function Hl(e){return{curve:Me(e,"eq-curve"),fill:Me(e,"eq-fill"),quiet:Me(e,"text-sub"),grid:Me(e,"eq-grid"),zero:Me(e,"divider"),label:Me(e,"text-sub"),spectrum:Me(e,"eq-spectrum"),bands:[Me(e,"eq-band-1"),Me(e,"eq-band-2"),Me(e,"eq-band-3")]}}function kh(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Yt(e){ae.has(e)&&ko(e);let t=ae.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:r,w:o,h:s}=jl(n);if(!r)return;let l=Math.max(8,Math.round(s*.06)),c=a.range??18;t.box={w:o,h:s,pad:l},t.colours=Hl(e);let d=t.colours,u=kh(a,o);if(!t.cache||t.cache.key!==u){let x=Math.max(64,Math.ceil(o)+1),A=new Float64Array(x);for(let k=0;k<x;k++)A[k]=Zn(k/(x-1)*o,o);let $=null;try{$=typeof a.response=="function"?a.response(A):null}catch{$=null}t.cache={key:u,freqs:A,total:$?.total??new Float64Array(x),bands:$?.bands??[]}}r.clearRect(0,0,o,s);let p=ch(e),h=a.on!==!1;$h(r,o,s,c,l,d,p);let{freqs:m,total:g,bands:w}=t.cache,f=Array.from(m,x=>_t(x,o)),b=et(0,s,c,l);w.forEach((x,A)=>{if(!x||!x.some(S=>Math.abs(S)>.05))return;let $=h?d.bands[A%3]:d.quiet,k=Array.from(x,S=>et(S,s,c,l));r.save(),t.active&&a.bands[A]?.id===t.active&&(r.globalAlpha=.14,r.fillStyle=$,Yi(r,f,k,b)),r.globalAlpha=h?.75:.4,r.strokeStyle=$,r.lineWidth=.75,ar(r,f,k),r.restore()});let y=Array.from(g,x=>et(x,s,c,l)),v=h?d.curve:d.quiet;r.save(),r.fillStyle=h?d.fill:d.quiet,r.globalAlpha=h?.2:.08,Yi(r,f,y,b),r.restore(),r.save(),r.strokeStyle=h?d.fill:v,r.lineJoin="round",r.lineCap="round",h&&(r.globalAlpha=.16,r.lineWidth=4,ar(r,f,y)),r.globalAlpha=1,r.strokeStyle=v,r.lineWidth=1.25,ar(r,f,y),r.restore(),Ah(e),xo(e)}function $h(e,t,n,a,r,o,s){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let u=c*d;if(u<xt||u>Pn)continue;let p=Math.round(_t(u,t))+.5;e.globalAlpha=Gi.includes(u)?.9:.35,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let c of mh)if(!(c>a))for(let d of[1,-1]){let u=Math.round(et(c*d,n,a,r))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(0,u),e.lineTo(t,u),e.stroke()}e.globalAlpha=1,e.strokeStyle=o.zero;let l=Math.round(et(0,n,a,r))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=o.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of Gi){let d=c>=1e3?`${c/1e3}k`:String(c),u=e.measureText(d).width,p=_t(c,t)+3;e.fillText(d,p+u+2>t?_t(c,t)-u-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>a)continue;let d=et(c,n,a,r);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(d)-1)}e.restore()}function pa(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let r=(t[a]+t[a+1])/2,o=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],r,o)}e.lineTo(t[t.length-1],n[n.length-1])}function ar(e,t,n){e.beginPath(),pa(e,t,n),e.stroke()}function Yi(e,t,n,a){e.beginPath(),pa(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function Wl(e){return e.closest("[data-nc-maxable]")}function Ul(e){let t=Wl(e);return!!t&&!t.hasAttribute("data-nc-max")}function ko(e){let t=Ul(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=ae.get(e);n?.active&&(n.active=null,xo(e))}return t}function Ah(e){ko(e);let t=ae.get(e);if(!t?.box)return;let{w:n,h:a,pad:r}=t.box,o=t.control.range??18;for(let s of t.control.bands){let l=Rl(e,s.id);l instanceof HTMLElement&&(l.style.left=`${_t(s.hz,n).toFixed(1)}px`,l.style.top=`${et(s.db*vo(s),a,o,r).toFixed(1)}px`)}}function Eh(e,t,n,a){let r=a/2/n,o=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let c=0;c<e;c++){let d=(c-.5)/(e-1)*t,u=(c+.5)/(e-1)*t,p=Zn(d,t),h=Zn(u,t),m=Zn(c/(e-1)*t,t);o[c]=Math.min(n-1,p/r),s[c]=Math.min(n-1,h/r),l[c]=hh*Math.log2(m/1e3)}return{lo:o,hi:s,tilt:l}}function Sh(e,t,n){let a=Math.floor(t),r=Math.ceil(n);if(r-a<=1){let s=t-a,l=e[a]??-1/0,c=e[Math.min(e.length-1,a+1)]??l;return l+(c-l)*s}let o=-1/0;for(let s=a;s<=r&&s<e.length;s++)e[s]>o&&(o=e[s]);return o}function Mh(e){let t=ae.get(e);if(t){if(!t.control.spectrum){Yl(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let r=ae.get(e)?.spec;r&&(r.visible=a.some(o=>o.isIntersecting),zr(e))}),t.spec.io.observe(e)):t.spec.visible=!0}zr(e)}}function zr(e){let t=ae.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){Gl(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Pr(e),n.onVis||(n.onVis=()=>zr(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Br(e,!1)}function Pr(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function Br(e,t){let n=ae.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,rr(e,Pr(e))),dh):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(r=>(n.raf=0,rr(e,r))):n.timer=a.setTimeout(()=>(n.timer=0,rr(e,Pr(e))),Nr))}function Gl(e){let t=ae.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function Yl(e){let t=ae.get(e)?.spec;if(!t)return;Gl(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=ae.get(e);n&&(n.spec=null)}function rr(e,t){let n=ae.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){Yl(e);return}if(!a.analyser)return;if(t-a.last<Nr-4&&!a.idle){Br(e,!1);return}let r=a.last?Math.min(.25,(t-a.last)/1e3):Nr/1e3;a.last=t;let o=e.querySelector(".nc-eq-spectrum");if(!(o instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:c}=jl(o);if(!s)return;let d=Math.max(16,Math.round(l/2)),u=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==d||a.map.w!==l||a.map.sr!==u)&&(a.map={cols:d,w:l,sr:u,...Eh(d,l,a.buf.length,u)},a.disp=new Float32Array(d).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,h=fh*r,{lo:m,hi:g,tilt:w}=a.map;for(let b=0;b<d;b++){let y=Sh(a.buf,m[b],g[b]);y>p&&(p=y);let v=y+w[b],x=a.disp[b]-h;a.disp[b]=v>x?v:x}p>uh&&(a.loud=t);let f=t-a.loud>ph;s.clearRect(0,0,l,c),(!f||a.disp.some(b=>b>ft))&&Lh(s,l,c,a.disp,n.colours??Hl(e)),a.idle=f&&!a.disp.some(b=>b>ft),Br(e,a.idle)}function Lh(e,t,n,a,r){let o=a.length,s=new Array(o),l=new Array(o),c=d=>{let u=a[Math.max(0,Math.min(o-1,d))];return Number.isFinite(u)?u:ft};for(let d=0;d<o;d++){let u=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,p=(Math.max(ft,Math.min(Ui,Number.isFinite(u)?u:ft))-ft)/(Ui-ft);s[d]=d/(o-1)*t,l[d]=n-p*n}e.save(),e.fillStyle=r.spectrum,e.globalAlpha=.13,e.beginPath(),pa(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=r.spectrum,e.lineWidth=1,e.beginPath(),pa(e,s,l),e.stroke(),e.restore()}var ve=new WeakMap,Th=450,Ch=6,Nh=33,or=24,Fh="http://www.w3.org/2000/svg";function zh(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function Ph(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function Bh(e,t,n,a,r){let o=e.slice();if(t===a)return o[a]=r,o;let s=t<a?1:-1;for(let l=t;l!==a+s;l+=s){let c=(l-t)/(a-t);o[l]=Math.round((n+(r-n)*c)*100)/100}return o}function Dh(e,t){let n=e.steps[t],a=(e.shapes??[]).find(o=>o.value===n.shape),r=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${a?`, ${a.label}`:""}${r}`}function mt(e,t){let n=document.createElementNS(Fh,e);for(let[a,r]of Object.entries(t))n.setAttribute(a,String(r));return n}function Kl(e){let t=mt("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(mt("path",{d:e})),t}function Oh(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-lsteps-plot",a.tabIndex=0,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical"),a.setAttribute("aria-valuemin","0"),a.setAttribute("aria-valuemax","100"),a.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let r=document.createElement("div");r.className="nc-lsteps-axis",r.setAttribute("aria-hidden","true");let o=document.createElement("div");o.className="nc-lsteps-shapes",o.setAttribute("role","tablist");let s=document.createElement("div");s.className="nc-lsteps-pick",s.setAttribute("role","menu"),s.hidden=!0,n.append(a,r,o,s);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let c={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return ve.set(n,c),Ih(n,a),Rh(n,s),Xl(n,e),n}function xe(e){let t=ve.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function qh(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function ir(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),a=qh(e);return{i:Ph(t.clientX,a),level:zh(t.clientY-n.top,n.height)}}function Ih(e,t){let n=ve.get(e),a=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",o=>{let s=xe(e);if(!s||o.button>0||!s.steps.length)return;o.preventDefault(),ha(e),t.setPointerCapture?.(o.pointerId);let l=ir(t,o),c=s.steps.map(d=>d.level);n.drag={id:o.pointerId,x:o.clientX,y:o.clientY,start:c,levels:c,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,Ki(e,l.i,l.level,l.i,l.level,!1),a(),n.timer=setTimeout(()=>{n.timer=0;let d=n.drag;!d||d.moved||(d.long=!0,xe(e)?.onLevels(d.start.slice(),!0),sr(e,d.i))},Th)}),t.addEventListener("pointermove",o=>{let s=n.drag;if(!s||s.id!==o.pointerId||s.long||!s.moved&&Math.hypot(o.clientX-s.x,o.clientY-s.y)<Ch)return;s.moved=!0,a();let l=ir(t,o);Ki(e,s.i,s.level,l.i,l.level,!1),s.i=l.i,s.level=l.level});let r=o=>{let s=n.drag;!s||s.id!==o.pointerId||(a(),n.drag=null,t.releasePointerCapture?.(o.pointerId),s.long||xe(e)?.onLevels(s.levels.slice(),!0),Dr(e,-1))};t.addEventListener("pointerup",r),t.addEventListener("pointercancel",o=>{let s=n.drag;!s||s.id!==o.pointerId||(a(),n.drag=null,s.long||xe(e)?.onLevels(s.start.slice(),!0),Dr(e,-1))}),t.addEventListener("contextmenu",o=>{xe(e)?.onShape&&(o.preventDefault(),sr(e,ir(t,o).i))}),t.addEventListener("keydown",o=>{let s=xe(e);if(!s||!s.steps.length)return;let l=s.steps.length,c=Math.min(n.focus,l-1),d=s.steps[c].level,u=p=>{let h=s.steps.map(m=>m.level);h[c]=Math.round(Math.max(0,Math.min(1,p))*100)/100,s.onLevels(h,!0)};switch(o.key){case"ArrowLeft":n.focus=(c-1+l)%l;break;case"ArrowRight":n.focus=(c+1)%l;break;case"ArrowUp":u(d+(o.shiftKey?.01:.05));break;case"ArrowDown":u(d-(o.shiftKey?.01:.05));break;case"PageUp":u(d+.25);break;case"PageDown":u(d-.25);break;case"Home":u(1);break;case"End":u(0);break;case"Enter":case" ":if(!s.onShape)return;sr(e,c);break;default:return}o.preventDefault(),Or(e)}),t.addEventListener("focus",()=>Or(e)),t.addEventListener("blur",()=>{for(let o of t.querySelectorAll("[data-focus]"))o.removeAttribute("data-focus")})}function Ki(e,t,n,a,r,o){let s=ve.get(e).drag;s&&(s.levels=Bh(s.levels,t,n,a,r),Dr(e,a,s.levels[a]),xe(e)?.onLevels(s.levels.slice(),o))}function Dr(e,t,n){for(let a of e.querySelectorAll(".nc-lsteps-step"))Number(a.dataset.i)===t?(a.dataset.dragging="true",a.dataset.level=`${Math.round(n*100)}%`):a.removeAttribute("data-dragging")}function Or(e){let t=ve.get(e),n=e.querySelector(".nc-lsteps-plot"),a=xe(e);if(!n||!a)return;for(let o of n.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===t.focus?o.dataset.focus="true":o.removeAttribute("data-focus");let r=Math.min(t.focus,a.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((a.steps[r]?.level??0)*100))),n.setAttribute("aria-valuetext",Dh(a,r))}function Rh(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),ha(e,!0);return}let a=[...t.querySelectorAll("button")],r=a.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),a[(r+1)%a.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),a[(r-1+a.length)%a.length]?.focus())}),ve.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&ha(e)}}function sr(e,t){let n=xe(e),a=e.querySelector(".nc-lsteps-pick"),r=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!a||!r)return;let o=ve.get(e);o.focus=t,a.textContent="";let s=document.createElement("span");s.className="nc-lsteps-pick-head",s.textContent=`Step ${t+1}`,a.append(s);for(let m of n.shapes??[]){let g=document.createElement("button");g.type="button",g.setAttribute("role","menuitemradio"),g.setAttribute("aria-checked",n.steps[t]?.shape===m.value?"true":"false"),m.icon&&g.append(Kl(m.icon)),g.append(document.createTextNode(m.label)),g.addEventListener("click",()=>{xe(e)?.onShape?.(t,m.value),ha(e,!0)}),a.append(g)}a.setAttribute("aria-label",`Shape of step ${t+1}`),a.hidden=!1,e.ownerDocument.addEventListener("pointerdown",o.outside,!0);let l=r.querySelector(`.nc-lsteps-step[data-i="${t}"]`),c=e.getBoundingClientRect(),d=l?.getBoundingClientRect(),u=a.getBoundingClientRect().width,p=d?d.left+d.width/2-c.left:0,h=Math.max(0,Math.min(c.width-u,p-u/2));a.style.setProperty("--nc-lsteps-pick-x",`${Math.round(h)}px`),a.querySelector('[aria-checked="true"]')?.focus?.()??a.querySelector("button")?.focus?.()}function ha(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",ve.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function _h(e,t){let n=ve.get(e),a=e.querySelector(".nc-lsteps-plot"),r=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,a.textContent="",r.textContent="";for(let o=0;o<t;o++){let s=document.createElement("div");s.className="nc-lsteps-step",s.dataset.i=String(o),o%4===0&&o>0&&(s.dataset.beat="true");let l=mt("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(mt("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),mt("path",{class:"nc-lsteps-env",d:""}),mt("path",{class:"nc-lsteps-top",d:""}),mt("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),s.append(l),a.append(s);let c=document.createElement("span");o%4===0&&(c.textContent=String(o+1)),o%4===0&&o>0&&(c.dataset.beat="true"),r.append(c)}}}function Xl(e,t){let n=ve.get(e);if(!n)return;n.control=t;let a=t.steps.length;_h(e,a),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let r=e.querySelector(".nc-lsteps-plot");r.setAttribute("aria-label",t.label??"Steps");let o=Math.max(.5,Math.min(.75,t.swing??.5)),s=r.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((m,g)=>{let w=s[g];if(!w)return;let f=String((g%2?1-o:o)*2);w.style.setProperty("--nc-lsteps-grow",f),l[g]?.style.setProperty("--nc-lsteps-grow",f),t.played!==void 0&&g>=t.played?w.dataset.out="true":w.removeAttribute("data-out"),w.dataset.zero=m.level<=0?"true":"false";let b=Math.max(0,Math.min(1,m.level)),y=w.querySelector(".nc-lsteps-level");y.setAttribute("y",String(100-b*100)),y.setAttribute("height",String(b*100));let v=t.curve?t.curve(g,or):null,x="M0 100",A="";for(let $=0;$<=or;$++){let k=v?Math.max(0,Math.min(1,v[$]??b)):b,S=$/or*100,M=100-k*100;x+=` L${S.toFixed(2)} ${M.toFixed(2)}`,A+=`${$?" L":"M"}${S.toFixed(2)} ${M.toFixed(2)}`}w.querySelector(".nc-lsteps-env").setAttribute("d",`${x} L100 100 Z`),w.querySelector(".nc-lsteps-top").setAttribute("d",A)});let c=e.querySelector(".nc-lsteps-shapes"),d=(t.shapes??[]).map(m=>`${m.value}:${m.label}`).join();if(d!==n.shapeKey){n.shapeKey=d,c.textContent="";for(let m of t.shapes??[]){let g=document.createElement("button");g.type="button",g.className="nc-lsteps-shape",g.setAttribute("role","tab"),g.dataset.shape=String(m.value),m.icon&&g.append(Kl(m.icon)),g.append(document.createTextNode(m.label)),g.addEventListener("click",()=>xe(e)?.onShapeAll?.(m.value)),c.append(g)}}c.hidden=!(t.shapes?.length&&t.onShapeAll),c.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let u=t.played??a,p=t.steps[0]?.shape,h=t.steps.slice(0,u).every(m=>m.shape===p);for(let m of c.querySelectorAll(".nc-lsteps-shape")){let g=h&&m.dataset.shape===String(p);m.setAttribute("aria-selected",g?"true":"false"),m.tabIndex=g||!h&&m===c.firstElementChild?0:-1}n.focus>=a&&(n.focus=0),Or(e),n.last=-2,jh(e)}function jh(e){let t=ve.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&lr(e,null);return}let a=0,r=o=>{if(t.loop=0,!e.isConnected||!t.control.playhead){lr(e,null);return}o-a>=Nh&&(a=o,lr(e,t.control.playhead())),t.loop=n.requestAnimationFrame(r)};t.loop=n.requestAnimationFrame(r)}function lr(e,t){let n=ve.get(e),a=t&&Number.isInteger(t.step)?t.step:-1,r=!!t?.locked;if(!(n.last===a&&n.lastLocked===r)){n.last=a,n.lastLocked=r;for(let o of e.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===a?(o.dataset.playhead="true",o.dataset.locked=r?"true":"false"):(o.removeAttribute("data-playhead"),o.removeAttribute("data-locked"));e.dataset.free=t&&!r?"true":"false"}}var Hh=.8912509381337456,qr=32,Wh=250,Uh=1200,Gh=.2,Vl=1.5;function Yh(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function Kh(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let r=e.createElement("span");r.className="nc-fx-level-fill",a.append(r),t.append(a)}return t}var fa=new WeakMap,Xi=new WeakMap;function Vi(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let r=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),o=Number.parseFloat(r);return Number.isFinite(o)?r.endsWith("ms")?o/1e3:o:n}function Xh(e){let t=Xi.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(r=>{for(let o of r){let s=fa.get(o.target);s&&(s.seen.set(o.target,o.isIntersecting),vn(s))}It(t)})),e.addEventListener("visibilitychange",()=>{for(let r of t.recs)vn(r);It(t)}),Xi.set(e,t),t}var Ql=e=>e.els.some(t=>t.isConnected);function Vh(e){if(!e.loop.io)return Ql(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function vn(e){let t=!e.dead&&!!e.source&&Vh(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=$o(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),_r(e))}function $o(e){return e.doc.defaultView?.performance?.now()??Date.now()}function It(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){Jl(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=$o(e)),!e.raf&&!e.timer&&Ir(e,!1)}function Ir(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>Qi(e,$o(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),Wh):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(r=>(e.raf=0,Qi(e,r))):e.timer=n.setTimeout(()=>(e.timer=0,a()),qr)}function Jl(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Qi(e,t){if(t-e.last<qr-4&&!e.idle&&e.last){Ir(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):qr/1e3;e.last=t,e.frames++;let a=!1,r=!1;for(let o of e.recs){if(!Ql(o)){(o.placed||e.frames-o.born>90)&&Zl(o);continue}o.placed=!0,o.open&&(r=!0,Qh(o,n,t)&&(e.loud=t),(o.disp[0]>0||o.disp[1]>0)&&(a=!0))}if(!r){Jl(e);return}e.idle=t-e.loud>Uh&&!a,Ir(e,e.idle)}function Qh(e,t,n){if(e.fall<0){let h=e.els[0];e.fall=Vi(h,"motion-meter-fall",Gh),e.hold=Vi(h,"motion-meter-hold",Vl)}let a=null;try{a=e.source.read()}catch{a=null}let r=typeof a=="number",o=r?a:Number(a?.in)||0,s=!r&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,c=s?"2":"1";if(e.rows!==c){e.rows=c;for(let h of e.els)h.dataset.ncRows=c}let d=e.fall>0?Math.exp(-t/e.fall):0,u=[o,l],p=!1;for(let h=0;h<2;h++){let m=Yh(u[h]);m>0&&(p=!0),e.disp[h]=m>=e.disp[h]?m:m+(e.disp[h]-m)*d,e.disp[h]<.001&&(e.disp[h]=0),u[h]>=Hh&&(e.clipAt[h]=n);let g=e.clipAt[h]>0&&n-e.clipAt[h]<e.hold*1e3;Rr(e,h,e.disp[h],g)}return p}function Rr(e,t,n,a){let r=Math.round(n*1e3)/1e3,o=a?"true":"false";if(!(e.shown[t]===r&&e.clipShown[t]===o)){e.shown[t]=r,e.clipShown[t]=o;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${r})`,l.dataset.clip=o)}}}function _r(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Rr(e,0,0,!1),Rr(e,1,0,!1)}function Zl(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),fa.get(t)===e&&fa.delete(t)}function Jh(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,r=Xh(a),o={els:n,source:t??null,loop:r,open:!1,dead:!1,seen:new Map,born:r.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:Vl,rows:""};for(let s of n)fa.set(s,o),r.io?.observe(s);if(r.recs.add(o),_r(o),!r.io){let s=a.defaultView,l=()=>{vn(o),It(r)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!o.dead){if(l===o.source){vn(o),It(r);return}o.open&&(o.open=!1,o.source?.close?.(),_r(o)),o.source=l,vn(o),It(r)}},destroy(){o.dead||Zl(o),It(r)}}}var ec={slop:8,longPressMs:500,pitchPx:16},Zh=class{constructor(e,t,n=ec){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let r=this.hit(t,n);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let r=t-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-o/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function ef(e,t,n,a=ec){let r=!1,o=0,s=(d,u)=>{let p=e.ownerDocument.elementFromPoint?.(d,u),h=[...e.querySelectorAll(t)],m=p?h.findIndex(f=>f===p||f.contains(p)):-1;if(m>=0)return m;let g=-1,w=Number.POSITIVE_INFINITY;return h.forEach((f,b)=>{if(f.hidden)return;let y=f.getBoundingClientRect();if(u<y.top||u>y.bottom)return;let v=Math.abs(d-(y.left+y.width/2));v<w&&v<=y.width&&(g=b,w=v)}),g},l=new Zh(s,d=>{(d.kind==="paint"||d.kind==="long")&&(r=!0),n(d)},a),c=()=>{o&&clearTimeout(o),o=0};return e.addEventListener("pointerdown",d=>{d.button>0||(r=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),o=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),e.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{r&&(r=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var tc="netcomposer.groups.v1";function Ao(){try{return globalThis.localStorage??null}catch{return null}}function nc(e=Ao(),t=tc){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[r,o]of Object.entries(n))typeof o=="boolean"&&a.set(r,o);return a}catch{return new Map}}function tf(e,t,n,a=tc){let r=nc(e,a);r.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(r)))}catch{}}function nf(e,t=Ao()){return nc(t).get(e.id)??e.open===!0}function af(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let r=document.createElement("button");r.type="button",r.className="nc-group-toggle",r.id=`${e.id}-group-toggle`;let o=document.createElement("span");o.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),r.append(o,s,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",r.id),r.setAttribute("aria-controls",c.id);for(let d of e.controls)c.append(n(d,t));return r.addEventListener("click",()=>{let d=a.dataset.ncOpen!=="true";tf(Ao(),e.id,d),jr(a,d);let u=t(a);u?.type==="group"&&u.onToggle?.(d)}),a.append(r,c),ac(a,e),jr(a,nf(e)),rc(a,e),a}function jr(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let r=n?.querySelector(".nc-group-mark");r&&(r.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function ac(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function rc(e,t){ac(e,t)&&jr(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),r=t.summary??"";a&&a.textContent!==r&&(a.textContent=r)}var jn="application/x-nc-pad",Ji="http://www.w3.org/2000/svg";function rf(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],r=[];for(let o=0;o<n;o++){let s=Math.floor(o*t/n),l=Math.max(s+1,Math.floor((o+1)*t/n)),c=0,d=0;for(let p=s;p<l;p++)c=Math.min(c,e[2*p]??0),d=Math.max(d,e[2*p+1]??0);let u=n===1?50:o/(n-1)*100;a.push(`${u.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),r.push(`${u.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${a.join("L")}L${r.reverse().join("L")}Z`}function of(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((r,o)=>a.append(sf(n,o,t))),n.append(a),n.addEventListener("keydown",r=>{r.key==="Escape"&&ea(n)}),ic(n,e),n}function sf(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let r=document.createElement("span");r.className="nc-padgrid-pad-bar",r.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(Ji,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(Ji,"path");return c.append(d),a.append(r,o,s,l,c),cf(e,a,t,n),o.addEventListener("dblclick",()=>{let u=n(e);u?.type==="padGrid"&&u.onRename&&a.dataset.empty!=="true"&&oc(e,a,t,n)}),a.addEventListener("dragstart",u=>{if(a.dataset.empty==="true"||!u.dataTransfer){u.preventDefault();return}u.dataTransfer.setData(jn,String(t)),u.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",u=>{let p=u.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(jn)||(u.preventDefault(),u.stopPropagation(),u.dataTransfer&&(u.dataTransfer.dropEffect=p.includes(jn)&&!u.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",u=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let h=u.dataTransfer?.getData(jn);if(h!==void 0&&h!==""){u.preventDefault(),u.stopPropagation();let g=Number(h);g!==t&&p.onMove?.(g,t,u.altKey);return}let m=u.dataTransfer?.files?.[0];m&&(u.preventDefault(),u.stopPropagation(),p.onFile?.(t,m))}),a}function lf(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function cf(e,t,n,a){let r=0,o=!1,s=0,l=0,c=()=>{window.clearTimeout(r),r=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;o=!1,s=d.clientX,l=d.clientY,c();let u=a(e);u?.type==="padGrid"&&(u.onDown?.(n),!(u.onDown&&d.pointerType==="mouse")&&(r=window.setTimeout(()=>{r=0,o=Zi(e,t,n,a)},450)))}),t.addEventListener("pointermove",d=>{r&&Math.hypot(d.clientX-s,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,c);t.addEventListener("contextmenu",d=>{d.preventDefault(),c(),o=Zi(e,t,n,a)}),t.addEventListener("click",()=>{if(o){o=!1;return}lf(e,n,a)})}function Zi(e,t,n,a){let r=a(e);if(r?.type!=="padGrid"||!r.menu)return!1;let o=r.menu(n);if(!o.length)return!1;ea(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",u=>{u.preventDefault(),u.stopPropagation(),ea(e)}),s.addEventListener("click",u=>u.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let u of o){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=u.id,p.textContent=u.label,p.addEventListener("click",()=>{ea(e);let h=a(e);h?.type==="padGrid"&&(u.id==="rename"&&h.onRename?oc(e,t,n,a):h.onMenu?.(n,u.id))}),l.append(p)}e.append(s,l);let c=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function oc(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let r=a(e);if(r?.type!=="padGrid")return;let o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=r.nameMax??24,o.value=r.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.top-s.top}px`,o.style.width=`${l.width}px`;let c=!1,d=u=>{if(c)return;c=!0;let p=o.value.trim();o.remove(),t.focus();let h=a(e);u&&p&&h?.type==="padGrid"&&h.onRename?.(n,p)};o.addEventListener("keydown",u=>{u.stopPropagation(),u.key==="Enter"?d(!0):u.key==="Escape"&&d(!1)}),o.addEventListener("blur",()=>d(!0));for(let u of["pointerdown","click","dblclick"])o.addEventListener(u,p=>p.stopPropagation());e.append(o),o.focus(),o.select()}function ea(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function ic(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,r)=>{let o=n[r];if(!(o instanceof HTMLButtonElement))return;let s=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),c=o.querySelector(".nc-padgrid-pad-wave path"),d=o.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=a.empty?"":a.badge??""),o.draggable=!a.empty,a.empty?(o.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete o.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=a.hint??""),c?.setAttribute("d",rf(a.peaks))),!a.empty&&a.hint?o.dataset.hint="true":delete o.dataset.hint,a.lane?o.dataset.ncLane=String(a.lane):delete o.dataset.ncLane;let u=t.selected===r;u?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",u?"true":"false"),a.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",a.empty?`Pad ${r+1}, empty: load a sample`:`Pad ${r+1}, ${a.label}${a.hint?`, ${a.hint}`:""}${a.badgeLabel?`, ${a.badgeLabel}`:""}${u?", selected":""}`)})}function de(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Da(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(a,r),n}function es(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function An(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var df=450,ts=8;function Ce(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function uf(e){let t=qp(e,"target-min");return t>0?t:44}function pf(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=uf(e),a=n/2,r=t.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<t.length;o++){let s=t[o],l=r[o];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,u=c-a,p=c+a,h=d-a,m=d+a;for(let g=0;g<t.length;g++){if(o===g)continue;let w=r[g];if(!w||w.width===0)continue;let f=w.left+w.width/2,b=w.top+w.height/2;Math.abs(b-d)<a*2&&(f>c?p=Math.min(p,(c+f)/2):f<c&&(u=Math.max(u,(c+f)/2))),Math.abs(f-c)<a*2&&(b>d?m=Math.min(m,(d+b)/2):b<d&&(h=Math.max(h,(d+b)/2)))}u=Math.min(u,l.left),p=Math.max(p,l.right),h=Math.min(h,l.top),m=Math.max(m,l.bottom),s.style.left=`${u-l.left}px`,s.style.top=`${h-l.top}px`,s.style.width=`${Math.max(0,p-u)}px`,s.style.height=`${Math.max(0,m-h)}px`,s.style.transform="none"}}function sc(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function ns(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function yt(e,t){switch(e.type){case"slider":return hf(e,t);case"select":return mf(e,t);case"toggle":return gf(e,t);case"button":return bf(e,t);case"readout":return yf(e);case"label":return kf(e);case"note":return as(e);case"knob":return Ef(e,t);case"choice":return Sf(e,t);case"slotRow":return Mf(e,t);case"stepGrid":return Nf(e,t);case"canvas":return Bf(e);case"fx":return Wf(e,t);case"eqGraph":return wh(e,t);case"levelSteps":return Oh(e,t);case"group":return af(e,t,yt);case"strip":return Df(e,t);case"stripAdd":return Rf(e,t);case"padGrid":return of(e,t);case"moves":return vf(e,t);default:return as({id:"unknown",text:""})}}function $e(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,dc(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(lc(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let r=e.querySelector("[data-nc-readout]");r&&(r.textContent=t.valueText??An(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),es(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")es(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&tt(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&$f(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??An(t.value))}else if(t.type==="choice")uc(e,t);else if(t.type==="slotRow")hc(e,t);else if(t.type==="stepGrid")Wr(e,t);else if(t.type==="padGrid")ic(e,t);else if(t.type==="moves")cc(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&ql(n,t)}else if(t.type==="eqGraph")_l(e,t);else if(t.type==="levelSteps")Xl(e,t);else if(t.type==="strip"){bc(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${jt(n.id)}"]`);a instanceof Element&&$e(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")mc(e,t);else if(t.type==="group"){rc(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${jt(n.id)}"]`);a instanceof Element&&$e(a,n)}}else if(t.type==="fx"){Sc(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${jt(n.id)}"]`);a instanceof Element&&$e(a,n)}}}}function hf(e,t){let n=Da(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let r=Ba(e.taper,e.min,e.max);a.min=String(r?0:e.min),a.max=String(r?1e3:e.max),a.step=String(r?1:e.step),r&&(a.dataset.ncTaper=e.taper),a.value=String(lc(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let o=l=>r?Tr(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(o(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(o(l))}),r&&a.addEventListener("keydown",l=>{let c=t(a);if(c?.type!=="slider"||a.disabled)return;let d=c.taper??e.taper,u=Ol(d,c.min,c.max,c.value,l.key,l.shiftKey,c.step);u!==null&&(l.preventDefault(),a.value=String(yo(d,c.min,c.max,u)),c.onChange(u),c.onCommit?.(u))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(ff(e,a,t),s),n.append(de()),$e(n,e),n}function lc(e){return Ba(e.taper,e.min,e.max)?yo(e.taper,e.min,e.max,e.value):e.value}function ff(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(Ce());let r=o=>{let s=n(t);s?.type==="slider"&&s.onTap?.(o)};return a.addEventListener("pointerdown",o=>{o.button===0&&r(o.timeStamp)}),a.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),r(o.timeStamp))}),a}function mf(e,t){let n=Da(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let r=null;for(let o of e.options){let s=document.createElement("option");s.value=o.value,s.textContent=o.label,o.disabled&&(s.disabled=!0),o.group?r?.getAttribute("label")!==o.group&&(r=document.createElement("optgroup"),r.setAttribute("label",o.group),a.append(r)):r=null,(r??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let o=t(a);o?.type==="select"&&o.onChange(a.value)}),n.append(a,de()),n}function gf(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(de()),$e(n,e),n}function bf(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let o=t(n);o?.type==="button"&&o.onPress()}),n.append(de()),$e(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=e.id,r.setAttribute("aria-label","Surprise me"),r.title=e.sparkleTitle??"Surprise me",r.innerHTML=sc(),r.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&fc(o);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,r),a}function yf(e){let t=Da(e.id,e.label);return t.append(de()),$e(t,e),t}var wf=450;function vf(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let r=document.createElement("div");r.className="nc-moves-row",r.setAttribute("role","group"),r.setAttribute("aria-label",a.label),a.title&&(r.title=a.title);let o=document.createElement("span");o.className="nc-moves-label",o.setAttribute("aria-hidden","true"),o.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${a.label} ${l.text}`),c.append(xf(l.icon)),c.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),s.append(c)}r.append(o,s),n.append(r)}return cc(n,e),n}function cc(e,t){for(let n of t.groups)for(let a of n.moves){let r=e.querySelector(`[data-nc-move="${jt(a.id)}"]`);r instanceof HTMLButtonElement&&(r.disabled=a.disabled===!0)}}function xf(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function kf(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(de()),t}function as(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(de()),t}function rs(e){if(typeof e.valueText=="string")return e.valueText;let t=An(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function dc(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function $f(e,t){let n=ua(t.taper,t.min,t.max,t.value);dc(e,t.modulated===!0);let a=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(a)),t.bipolar){let r=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(ua(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(a,r))),e.style.setProperty("--knob-to",String(Math.max(a,r)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",rs(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${rs(t)}`}function Af(e,t){if(Ba(e.taper,e.min,e.max))return Ol(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,r=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+r:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-r:null}function Ef(e,t){let n=Da(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let r=document.createElement("i");r.className="nc-knob-mark",a.append(r);let o=0,s=0;a.addEventListener("pointerdown",d=>{o=d.clientY;let u=t(a);s=u&&"value"in u?Number(u.value):0,a.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",d=>{if(a.hasPointerCapture&&!a.hasPointerCapture(d.pointerId))return;let u=t(a);if(u?.type!=="knob")return;if(Ba(u.taper,u.min,u.max)){let m=ua(u.taper,u.min,u.max,s)-(d.clientY-o)/120;u.onChange(Bl(u.taper,u.min,u.max,m));return}let p=u.max-u.min||1,h=Math.min(u.max,Math.max(u.min,s-(d.clientY-o)*p/120));u.onChange(h)}),a.addEventListener("dblclick",()=>{let d=t(a);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),a.addEventListener("keydown",d=>{let u=t(a);if(u?.type!=="knob")return;let p=Af(u,d);p!==null&&(d.preventDefault(),u.onChange(Math.min(u.max,Math.max(u.min,p))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(a,c),n.append(de()),$e(n,e),n}function Sf(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let a=document.createElement("span");a.className="nc-label nc-choice-caption",a.setAttribute("aria-hidden","true"),a.textContent=e.caption,n.dataset.ncCaption="",n.append(a)}for(let a of e.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=a.value,r.setAttribute("role","tab"),r.textContent=a.label,r.addEventListener("click",()=>{let o=t(n);o?.type==="choice"&&o.onChange(a.value)}),r.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),c=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")c=(l+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")c=(l-1+s.length)%s.length;else if(o.key==="Home")c=0;else if(o.key==="End")c=s.length-1;else return;let d=s[c];d instanceof HTMLButtonElement&&(o.preventDefault(),d.focus(),d.click())}),n.append(r)}return n.append(de()),uc(n,e),n}function uc(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function Mf(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let u=0;u<e.slots.length;u++){let p=e.slots[u],h=document.createElement("span");h.className="nc-snap-wrap";let m=document.createElement("button");m.type="button",m.className="nc-snap",m.dataset.ncSlot=String(u),m.textContent=p.label,m.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",h.append(m,Ce()),Lf(h,m,n,u,t),a.append(h)}let r=e.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=sc(),r.append(Ce()),r.addEventListener("click",()=>{fc(n);let u=t(n);u?.type==="slotRow"&&u.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let u=t(n);u?.type==="slotRow"&&u.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",o.append(s,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(a,...r?[r]:[]),n.append(d,o,de()),pc(n,t),hc(n,e),n}function os(e,t,n,a){let r=n(e);if(r?.type!=="slotRow")return;mn(e);let o=a.shiftKey?"store":a.altKey?"clear":"recall";r.onSlot(t,o)}function Lf(e,t,n,a,r){let o=0,s=0,l=0,c=!1,d=!1,u=!1,p=!1,h=()=>{window.clearTimeout(o),o=0},m=b=>{let y=b.clientX-s,v=b.clientY-l;y*y+v*v>ts*ts&&(c=!0,h())},g=()=>{p&&(p=!1,window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",f))},w=b=>{let y=o!==0&&!c&&!d;h(),g(),y&&(u=!0,os(n,a,r,b))},f=()=>{c=!0,h(),g()};e.addEventListener("pointerdown",b=>{b.button===0&&(g(),d=!1,c=!1,u=!1,s=b.clientX,l=b.clientY,h(),o=window.setTimeout(()=>{o=0,!c&&(d=!0,Tf(n,t,a,r))},df),p=!0,window.addEventListener("pointermove",m),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",f))}),e.addEventListener("contextmenu",b=>b.preventDefault()),e.addEventListener("click",b=>{if(u||d||c){u=!1,d=!1,c=!1;return}os(n,a,r,b)})}function pc(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=is("Save","store"),r=is("Clear","clear");n.append(a,r);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),mn(e)}),o.addEventListener("click",s=>s.stopPropagation()),e.append(o,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),mn(e)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),mn(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&mn(e)})}function is(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Tf(e,t,n,a){pc(e,a);let r=e.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let o=e.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function mn(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function hc(e,t){for(let r of e.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let o=Number(r.dataset.ncSlot),s=t.slots[o];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function fc(e){let t=e.dataset.ncLastFill||null,n=Ap(t);e.dataset.ncLastFill=n;let a=Ep(n);if(a)for(let[r,o]of Object.entries(a))e.style.setProperty(r,o)}function Cf(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,r=o=>{if(a===o)return;a=o,n.setAttribute("aria-pressed",o?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),r(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>r(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||r(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),r(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function Nf(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let r=f=>{let b=document.createElement("button");return b.type="button",b.setAttribute("role","radio"),b.textContent=f,a.append(b),b},o=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=f=>{for(let b of[o,s]){let y=b===f;b.setAttribute("aria-checked",y?"true":"false"),b.tabIndex=y?0:-1}};l(o);for(let f of[o,s])f.addEventListener("click",()=>l(f));a.addEventListener("keydown",f=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(f.key))return;f.preventDefault();let b=s.getAttribute("aria-checked")==="true"?o:s;l(b),b.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(a),e.onFill&&c.append(Cf(n,t)),e.onClear){let f=document.createElement("button");f.type="button",f.className="nc-fill nc-clear",f.dataset.ncClear="",f.textContent=e.clearLabel??"Clear",f.title="Clear every step (Undo takes it back)",f.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.onClear?.()}),c.append(f)}n.append(c);for(let f of e.rows){let b=document.createElement("div");b.className="nc-row",b.dataset.ncRow="";let y=document.createElement("button");y.type="button",y.className="nc-name",y.textContent=f.label,y.setAttribute("aria-label",`Select ${f.label}`),f.lane&&(y.dataset.ncLane=String((f.lane-1)%4+1));let v=!1,x=0;y.addEventListener("pointerdown",k=>{v=!1,!(k.pointerType==="mouse"||k.button!==0)&&(x=window.setTimeout(()=>{let S=t(n);S?.type!=="stepGrid"||!S.selectedRows||(v=!0,S.onSelectRow?.(S.rows.findIndex(M=>M.id===f.id),!0))},wf))});for(let k of["pointerup","pointercancel","pointerleave"])y.addEventListener(k,()=>window.clearTimeout(x));y.addEventListener("contextmenu",k=>{v&&k.preventDefault()}),y.addEventListener("click",k=>{let S=t(n);if(S?.type!=="stepGrid")return;if(v){v=!1;return}let M=S.rows.findIndex(j=>j.id===f.id),_=!!S.selectedRows&&(k.shiftKey||k.metaKey||k.ctrlKey);S.onSelectRow?.(M,_)}),y.addEventListener("keydown",k=>Ff(n,y,k));let A=[];for(let k of["mute","solo"]){if(!(k==="mute"?e.onMute:e.onSolo))continue;let S=document.createElement("span");S.className="nc-ms-wrap";let M=document.createElement("button");M.type="button",M.className="nc-ms",M.dataset.ncMs=k,M.textContent=k==="mute"?"M":"S",M.setAttribute("aria-label",`${k==="mute"?"Mute":"Solo"} ${f.label}`),S.append(M,Ce()),S.addEventListener("click",()=>{let _=t(n);if(_?.type!=="stepGrid")return;let j=_.rows.findIndex(ue=>ue.id===f.id);(k==="mute"?_.onMute:_.onSolo)?.(j)}),A.push(S)}let $=document.createElement("div");$.className="nc-steps";for(let k=0;k<f.steps.length;k++){let S=document.createElement("span");S.className="nc-step-wrap";let M=document.createElement("button");M.type="button",M.className="nc-step",M.dataset.ncStep=`${f.id}:${k}`,M.setAttribute("aria-label",`${f.label} step ${k+1}`),S.append(M,Ce()),S.addEventListener("click",_=>{let j=t(n);if(j?.type!=="stepGrid")return;let ue=j.rows.findIndex(He=>He.id===f.id),q=s.getAttribute("aria-checked")==="true";j.onToggle(ue,k,_.shiftKey||q)}),$.append(S)}if(e.onLength&&$.append(zf(n,$,f,t)),b.append(...A,y,$),e.onDice){let k=document.createElement("button");k.type="button",k.className="nc-sparkle nc-row-dice",k.dataset.ncDice=f.id,k.setAttribute("aria-label",`Re-roll ${f.label}`),k.title=`Re-roll ${f.label}: new steps for this lane (Undo takes it back)`,k.innerHTML=ns(),k.append(Ce()),k.addEventListener("click",()=>{let S=t(n);S?.type==="stepGrid"&&S.onDice?.(S.rows.findIndex(M=>M.id===f.id))}),b.append(k)}b.addEventListener("click",k=>{if(k.target!==b)return;let S=t(n);S?.type==="stepGrid"&&S.onSelectRow?.(S.rows.findIndex(M=>M.id===f.id))}),ss(n,$,".nc-step-wrap",t,s,()=>f.id),n.append(b)}let d=document.createElement("div");d.className="nc-pads-head";let u=(f,b,y)=>{let v=document.createElement("button");return v.type="button",v.className=f,v.textContent=b,y&&v.setAttribute("aria-label",y),v},p=u("nc-pads-step","‹","Previous lane"),h=u("nc-pads-step","›","Next lane"),m=document.createElement(e.onLength?"button":"span");m.className="nc-pads-label",m.setAttribute("aria-live","polite"),e.onLength&&(m.type="button",m.dataset.ncLenToggle="",m.addEventListener("click",()=>{let f=t(n);f?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Wr(n,f))}));for(let[f,b]of[[p,-1],[h,1]])f.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid"||y.rows.length===0)return;let v=y.rows.length;y.onSelectRow?.(((Hn(y)+b)%v+v)%v)});if(d.append(p,m,h),e.onDice){let f=u("nc-pads-step nc-pads-dice","","Re-roll lane");f.dataset.ncPadsDice="",f.innerHTML=ns(),f.addEventListener("click",()=>{let b=t(n);if(b?.type!=="stepGrid")return;let y=Hn(b);y>=0&&b.onDice?.(y)}),d.append(f)}if(e.transport){let f=u("nc-pads-play","Play");f.dataset.ncPadsPlay="",f.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.transport?.onToggle()}),d.append(f)}n.append(d);let g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");let w=Math.max(0,...e.rows.map(f=>f.steps.length));for(let f=0;f<w;f++){let b=document.createElement("button");b.type="button",b.className="nc-pad",b.dataset.ncPad=String(f),b.textContent=String(f+1),b.addEventListener("click",y=>{let v=t(n);if(v?.type!=="stepGrid")return;let x=Hn(v);if(x<0)return;if(n.dataset.ncLenMode==="true"){v.onLength?.(x,f+1);return}let A=s.getAttribute("aria-checked")==="true";v.onToggle(x,f,y.shiftKey||A)}),g.append(b)}return ss(n,g,".nc-pad",t,s,()=>{let f=t(n);return f?.type==="stepGrid"?f.rows[Hn(f)]?.id:void 0}),n.append(g),n.append(de()),Wr(n,e),n}function Hn(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function ss(e,t,n,a,r,o){let s="on",l=!0,c=-1,d=(u,p)=>{let h=u.rows[c]?.steps[p];!h||p>=u.rows[c].length||(u.onSet?u.onSet(c,p,s,l):!!h[s]!==l&&u.onToggle(c,p,s==="accent"))};ef(t,n,u=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(u.kind!=="paint")return;let h=p.rows.findIndex(m=>m.id===o());h>=0&&p.rows[h].length!==u.pad+1&&p.onLength?.(h,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){let h=o();c=p.rows.findIndex(g=>g.id===h);let m=p.rows[c]?.steps[u.pad];if(!m)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!m[s]}d(p,u.pad)}else if(u.kind==="long"){let h=o(),m=p.rows.findIndex(w=>w.id===h),g=t.querySelectorAll(n)[u.pad];m>=0&&g instanceof HTMLElement&&p.onLongPress?.(m,u.pad,g)}}})}function Ff(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],r=a.indexOf(t),o=r;n.key==="ArrowDown"?o=r+1:n.key==="ArrowUp"?o=r-1:n.key==="Home"?o=0:o=a.length-1;let s=a[o];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function zf(e,t,n,a){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(Ce());let o=d=>{let u=a(e);if(u?.type!=="stepGrid")return;let p=u.rows.findIndex(g=>g.id===n.id),h=u.rows[p];if(!h)return;let m=Math.max(1,Math.min(h.steps.length,d));m!==h.length&&u.onLength?.(p,m)},s=d=>{let u=[...t.querySelectorAll(".nc-step")],p=1;return u.forEach((h,m)=>{let g=h.getBoundingClientRect();g.width>0&&d>=g.left+g.width/2&&(p=m+1)}),p},l=d=>o(s(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete r.dataset.dragging};return r.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),r.addEventListener("keydown",d=>{let u=a(e);if(u?.type!=="stepGrid")return;let p=u.rows.find(m=>m.id===n.id);if(!p)return;let h={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};d.key in h&&(d.preventDefault(),o(h[d.key]))}),r}var cr=new WeakMap,Wn=new WeakMap;function Pf(e){return e?(Wn.has(e)||(Wn.set(e,Lr(e)),Ml(t=>{Wn.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))Hr(n,Number(n.getAttribute("data-nc-velocity")))},e)),Wn.get(e)):"light"}function Hr(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:Pf(e.ownerDocument),r=n===null?null:`${a} ${n}`;if(!(cr.has(e)&&cr.get(e)===r)){if(cr.set(e,r),n===null){for(let o of Object.keys(Oi(1)))e.style.removeProperty(o);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[o,s]of Object.entries(Oi(n,Di[a]??Di.light)))e.style.setProperty(o,s)}}function ls(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function Wr(e,t){let n=t.rows.some(u=>u.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let r=e.querySelector(".nc-pads"),o=t.rows.find(u=>u.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&o&&(s.textContent=l?`${o.label} · ${o.length}`:o.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&o&&(c.setAttribute("aria-label",`Re-roll ${o.label}`),c.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let u=!!t.transport?.playing,p=t.transport?.label??(u?"Stop":"Play");d.textContent!==p&&(d.textContent=p),d.setAttribute("aria-pressed",u?"true":"false");let h=t.transport?.ariaLabel;h?d.setAttribute("aria-label",h):d.removeAttribute("aria-label")}if(r instanceof HTMLElement&&o){r.setAttribute("aria-label",`${o.label} steps`),o.lane&&(r.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?r.dataset.silent="true":delete r.dataset.silent;let u=o.length>0?(t.playhead%o.length+o.length)%o.length:-1;for(let p of r.querySelectorAll("[data-nc-pad]")){let h=Number(p.getAttribute("data-nc-pad")),m=o.steps[h];p instanceof HTMLButtonElement&&(p.hidden=!m||!l&&h>=o.length,l&&h>=o.length?p.dataset.out="true":delete p.dataset.out,l&&h===o.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${o.label} step ${h+1}${m?.markLabel?`, ${m.markLabel}`:""}`),ls(p,m),p.setAttribute("aria-pressed",m?.on?"true":"false"),m?.accent?p.dataset.accent="true":delete p.dataset.accent,m?.dim?p.dataset.dim="true":delete p.dataset.dim,Hr(p,m?.velocity),t.playhead>=0&&h===u?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let u of t.rows){for(let m=0;m<u.steps.length;m++){let g=u.steps[m],w=e.querySelector(`[data-nc-step="${u.id}:${m}"]`);if(!(w instanceof HTMLButtonElement))continue;let f=w.closest(".nc-row");if(f instanceof HTMLElement){t.selectedRow===u.id?f.dataset.selected="true":delete f.dataset.selected;let x=t.selectedRow!==u.id&&(t.selectedRows??[]).includes(u.id);x?f.dataset.picked="true":delete f.dataset.picked;let A=f.querySelector(".nc-name");A instanceof HTMLElement&&(A.setAttribute("aria-pressed",t.selectedRow===u.id||x?"true":"false"),A.textContent!==u.label&&(A.textContent=u.label,A.setAttribute("aria-label",`Select ${u.label}`))),u.mute||n&&!u.solo?f.dataset.silent="true":delete f.dataset.silent;for(let $ of f.querySelectorAll("[data-nc-ms]")){let k=$.getAttribute("data-nc-ms")==="mute"?u.mute:u.solo;$.setAttribute("aria-pressed",k?"true":"false")}}w.setAttribute("aria-pressed",g.on?"true":"false");let b=`${u.label} step ${m+1}${g.markLabel?`, ${g.markLabel}`:""}`;w.getAttribute("aria-label")!==b&&w.setAttribute("aria-label",b),ls(w,g),g.accent?w.dataset.accent="true":delete w.dataset.accent,g.dim?w.dataset.dim="true":delete w.dataset.dim,m%4===0?w.dataset.bar="true":delete w.dataset.bar,typeof g.velocity=="number"?(w.dataset.velocity="true",w.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,g.velocity))*100)}%`)):(delete w.dataset.velocity,w.style.removeProperty("--level")),Hr(w,g.velocity);let y=t.playhead>=0&&u.length>0?(t.playhead%u.length+u.length)%u.length:-1;m===y?w.dataset.playhead="true":delete w.dataset.playhead;let v=!!t.onLength&&t.selectedRow===u.id;w.hidden=m>=u.length&&!v,m>=u.length&&v?w.dataset.out="true":delete w.dataset.out}let p=e.querySelector(`[data-nc-len="${u.id}"]`),h=e.querySelector(`[data-nc-step="${u.id}:${Math.max(0,u.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&h&&h.nextElementSibling!==p){let m=document.activeElement===p;h.after(p),m&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(u.length)),p.setAttribute("aria-label",`${u.label} length, ${u.length} steps`),p.title=`${u.label}: drag to set the length (${u.length} steps)`)}}function Bf(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,de()),t}function Df(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let r=document.createElement("span");r.className="nc-strip-name",r.dataset.ncStripName="";let o=!e.master&&typeof e.onFold=="function",s=null;o&&(n.dataset.ncFoldable="",s=xc(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let v=t(n);v?.type==="strip"&&(v.onFold?.(v.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(r);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let v=document.createElement("span");v.className="nc-strip-grip-dots",v.setAttribute("aria-hidden","true"),l.append(v),l.addEventListener("keydown",x=>{if(x.key!=="ArrowLeft"&&x.key!=="ArrowRight"||x.ctrlKey||x.metaKey||x.shiftKey)return;let A=t(n);A?.type==="strip"&&(x.preventDefault(),A.onMove?.(x.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>us(n,l,t))),!e.master&&typeof e.onShade=="function"&&a.addEventListener("contextmenu",v=>{v.pointerType==="touch"||v.pointerType==="pen"||v.target instanceof Element&&v.target.closest("input, .nc-strip-remove")||(v.preventDefault(),us(n,a,t,{x:v.clientX,y:v.clientY}))}),e.onRemove){let v=document.createElement("button");v.type="button",v.className="nc-strip-remove",v.dataset.ncStripRemove="",v.textContent="×",v.addEventListener("click",()=>{let x=t(n);x?.type==="strip"&&x.onRemove?.(v)}),a.append(v)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let v=document.createElement("span");v.className="nc-hacks-wrap";let x=document.createElement("button");x.type="button",x.className="nc-hacks",x.dataset.ncHacks="",v.append(x,Ce()),v.addEventListener("click",()=>{let A=t(n);A?.type==="strip"&&A.onHacks?.()}),c.append(v)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let v=document.createElement("span");v.className="nc-hacks-wrap nc-sends-view-wrap";let x=document.createElement("button");x.type="button",x.className="nc-hacks nc-sends-view",x.dataset.ncSendsView="",v.append(x,Ce()),v.addEventListener("click",()=>{let A=t(n);A?.type==="strip"&&A.onSendsView?.()}),d.append(v)}for(let v of["mute","solo"]){if(!(v==="mute"?e.onMute:e.onSolo))continue;let x=document.createElement("span");x.className="nc-ms-wrap";let A=document.createElement("button");A.type="button",A.className="nc-ms",A.dataset.ncMs=v,A.textContent=v==="mute"?"M":"S",x.append(A,Ce()),x.addEventListener("click",()=>{let $=t(n);$?.type==="strip"&&(v==="mute"?$.onMute:$.onSolo)?.()}),d.append(x)}let u=document.createElement("div");u.className="nc-strip-sends";for(let v of e.sends??[])u.append(yt({...v,type:"knob",compact:!0},t));let p=document.createElement("div");p.className="nc-strip-pan",e.pan&&p.append(yt(Eo(e),t));let h=document.createElement("div");h.className="nc-strip-body";let m=document.createElement("span");m.className="nc-scale",m.setAttribute("aria-hidden","true");for(let v of e.ticks??[]){let x=document.createElement("span");x.className="nc-scale-tick",x.style.setProperty("--tick-pos",String(v.value)),x.textContent=v.label,m.append(x)}let g=Gp({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:v=>{let x=t(n);x?.type==="strip"&&x.onChange(v)},onReset:()=>{let v=t(n);v?.type==="strip"&&ds(v)}}),w=Jp({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let v=t(n);v?.type==="strip"&&v.onClipClear?.()}});if(h.append(m,g.el,w.el),o){let v=document.createElement("button");v.type="button",v.className="nc-ui-fx-fold nc-strip-fold",v.dataset.ncStripFold="",v.setAttribute("aria-expanded","false");let x=document.createElement("span");x.className="nc-strip-fold-cap",x.setAttribute("aria-hidden","true");let A=document.createElement("span");A.className="nc-ui-fx-fold-name",A.dataset.ncStripFoldName="";let $=document.createElement("span");$.className="nc-strip-fold-pan",$.setAttribute("aria-hidden","true"),$.hidden=!e.pan,v.append(x,$,A),v.addEventListener("click",()=>{let k=t(n);if(k?.type!=="strip")return;k.onFold?.(!1);let S=n.querySelector("[data-nc-strip-hide]");S instanceof HTMLElement&&S.focus()}),h.prepend(v)}let f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let b=0;f.addEventListener("click",v=>{let x=t(n);x?.type!=="strip"||!x.onTypeIn||(window.clearTimeout(b),v.detail===0?cs(n,f,t):v.detail===1&&(b=window.setTimeout(()=>cs(n,f,t),If)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(b);let v=t(n);v?.type==="strip"&&ds(v)});let y=document.createElement("div");return y.className="nc-strip-trim",e.trim&&y.append(yt(So(e),t)),s&&n.append(s),l&&n.append(l),n.append(a,y,c,d,u,p,h,f,de()),bc(n,e),n}function Eo(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??qf(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function So(e){let t=e.trim,n=t.min??-12,a=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:a,step:t.step??.5,value:t.value,valueText:t.valueText??Of(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:r=>t.onChange(r)}}function Of(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function qf(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var If=250;function cs(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=a.valueText??An(a.value),r.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(r),r.focus(),r.select?.();let o=!1,s=l=>{if(o)return;o=!0;let c=r.value;if(r.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(c)}t.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function Rf(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",a.append(r,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),c=s.value;gc(s),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(a,s,de()),mc(n,e),n}function mc(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let r=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],o=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==s&&(a.replaceChildren(...r.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),gc(a))}function gc(e){let t=e.options[0];t&&(t.selected=!0)}function ds(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function bc(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let r=e.querySelector(".nc-fader"),o=r?Yp(r):void 0;o&&(o.configure({step:t.step}),o.set(t.value),o.setText(t.valueText),o.setLabel(`${t.label} level`)),Zp(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let g=t.valueText??An(t.value);s.textContent!==g&&(s.textContent=g),s.setAttribute("aria-label",`${t.label} level ${g}`);let w=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${w}`:w}for(let g of e.querySelectorAll("[data-nc-ms]")){let w=g.getAttribute("data-nc-ms"),f=w==="mute"?t.mute===!0:t.solo===!0;g.setAttribute("aria-pressed",f?"true":"false"),g.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let g=t.hacksLabel??"Hacks";l.textContent!==g&&(l.textContent=g),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${g}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let g=t.sendsViewLabel??"Sends";c.textContent!==g&&(c.textContent=g),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${g}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),tt(c,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let u=yc(t);if(u?e.dataset.ncShade=String(u):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let g=e.querySelector(`.nc-strip-trim [data-nc-id="${jt(t.trim.id)}"]`);g&&$e(g,So(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let g=e.querySelector(`.nc-strip-pan [data-nc-id="${jt(t.pan.id)}"]`);g&&$e(g,Eo(t))}let p=!t.master&&typeof t.onFold=="function"&&t.folded===!0;p?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let h=e.querySelector("[data-nc-strip-hide]");h instanceof HTMLElement&&(kc(h,p,t.label),tt(h,t.foldHelp));let m=e.querySelector("[data-nc-strip-fold]");if(m instanceof HTMLElement){m.hidden=!p,m.setAttribute("aria-label",`Expand ${t.label}`);let g=m.querySelector("[data-nc-strip-fold-name]");g&&g.textContent!==t.label&&(g.textContent=t.label),tt(m,t.foldedHelp??t.foldHelp)}}function yc(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=wc?t:0}var wc=8,Un=null;function us(e,t,n,a){Un?.();let r=n(e);if(r?.type!=="strip")return null;let o=e.ownerDocument,s=o.defaultView??globalThis,l=o.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${r.label}: shade and place`);let c=o.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(r.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=o.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let u=yc(r),p=e.querySelector("[data-nc-strip-grip]")??t,h=(b=!1)=>{if(Un!==h)return;Un=null;let y=l.contains(o.activeElement);l.remove(),o.removeEventListener("keydown",g,!0),o.removeEventListener("pointerdown",w,!0),s.removeEventListener("resize",f),(b||y)&&p?.isConnected&&p.focus?.({preventScroll:!0})},m=[0,...Array.from({length:wc},(b,y)=>y+1)].map(b=>{let y=o.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.setAttribute("aria-checked",b===u?"true":"false"),y.setAttribute("tabindex",b===u?"0":"-1"),y.dataset.ncShadeChoice=String(b),b===0?(y.textContent="Auto",y.setAttribute("aria-label","Auto: alternate light and dark"),y.title="Auto: alternate light and dark"):(y.textContent=String(b),y.setAttribute("aria-label",`Shade ${b}`),y.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${b})`)),y.addEventListener("click",()=>{let v=n(e);h(!0),v?.type==="strip"&&v.onShade?.(b===0?null:b)}),y});if(d.append(...m),d.addEventListener("keydown",b=>{let y=m.indexOf(o.activeElement);if(y<0)return;let v=-1;b.key==="ArrowRight"||b.key==="ArrowDown"?v=(y+1)%m.length:b.key==="ArrowLeft"||b.key==="ArrowUp"?v=(y-1+m.length)%m.length:b.key==="Home"?v=0:b.key==="End"&&(v=m.length-1),!(v<0)&&(b.preventDefault(),m[y].setAttribute("tabindex","-1"),m[v].setAttribute("tabindex","0"),m[v].focus())}),l.append(c,d),typeof r.onMove=="function"){let b=[...e.parentElement?.children??[]].filter(v=>v.classList?.contains("nc-strip")&&!v.hasAttribute("data-nc-master")),y=b.indexOf(e);for(let[v,x,A]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let $=o.createElement("button");$.type="button",$.className="nc-strip-menu-item",$.dataset.ncStripMove=v<0?"left":"right";let k=o.createElement("span");k.textContent=x;let S=o.createElement("kbd");S.textContent=A,S.setAttribute("aria-hidden","true"),$.append(k,S),$.disabled=v<0?y<=0:y<0||y>=b.length-1,$.addEventListener("click",()=>{let M=n(e);h(!0),M?.type==="strip"&&M.onMove?.(v)}),l.append($)}}o.body.append(l),(()=>{let b=t.getBoundingClientRect?.()??{bottom:0,right:0},y=l.offsetWidth,v=l.offsetHeight,x=s.innerWidth||o.documentElement.clientWidth||y,A=s.innerHeight||o.documentElement.clientHeight||v,$=a?a.x:b.right-y,k=a?a.y:b.bottom+4;$=Math.max(4,Math.min($,x-y-4)),k+v>A-4&&(k=Math.max(4,(a?a.y:b.top)-v-4)),l.style.left=`${Math.round($)}px`,l.style.top=`${Math.round(k)}px`})();let g=b=>{if(b.key==="Escape")b.preventDefault(),b.stopPropagation(),h(!0);else if(b.key==="Tab"&&l.contains(o.activeElement)){let y=[...l.querySelectorAll("button:not([disabled])")].filter(x=>x.getAttribute("tabindex")!=="-1"),v=(y.indexOf(o.activeElement)+(b.shiftKey?-1:1)+y.length)%y.length;b.preventDefault(),y[v]?.focus()}},w=b=>{l.contains(b.target)||h(!1)},f=()=>h(!1);return o.addEventListener("keydown",g,!0),o.addEventListener("pointerdown",w,!0),s.addEventListener("resize",f),Un=h,(m.find(b=>b.getAttribute("tabindex")==="0")??m[0]).focus({preventScroll:!0}),{el:l,close:()=>h(!1)}}var Ur=typeof ResizeObserver=="function"?new ResizeObserver(_f):null;function _f(e){for(let t of e){if(!t.target.isConnected){Ur.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&jf(n)}}function jf(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,r=n instanceof HTMLElement?n.offsetHeight:0,o=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+r+o}px`)}function Hf(e){if(Ur)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))Ur.observe(t)}function Wf(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let r=typeof e.onFold=="function",o=!!e.meter,s=typeof e.onRemove=="function";if(e.on===void 0&&!r&&!ma(e)&&!o&&!s)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),o&&l.append(Ac(n,"head")),e.on!==void 0){let c=Fl({checked:e.on,labelledBy:a.id,onChange:d=>{let u=t(c.el);u?.type==="fx"&&u.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",l.append(c.el)}r&&l.append(Gf(n,t)),ma(e)&&l.append(Vf(n,t)),s&&l.append(Qf(t)),n.append(l)}r&&n.prepend(Yf(n,t)),o&&Ec(n,e);for(let l of e.controls)n.append(yt(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",l.append(c);for(let d of e.more)l.append(yt(d,t));n.append(l)}return n.append(de()),Sc(n,e),Hf(n),n}var Uf=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function vc(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&Uf(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function Gf(e,t){let n=xc();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),vc(e))}),n}function xc(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function kc(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function Yf(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let r=document.createElement("span");r.className="nc-ui-fx-fold-name",r.dataset.ncFxFoldName="";let o=document.createElement("span");return o.className="nc-fold-tri",o.setAttribute("aria-hidden","true"),n.append(o,a,r),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Ac(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),vc(e)}}),n}var Kt=new Set;function ta(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var ma=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),Kf="(max-width: 768px)";function Xf(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function Vf(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(Xf()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&($c(e,a,!Kt.has(a.id)),n.focus())}),n}function Qf(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function $c(e,t,n){n?Kt.add(t.id):Kt.delete(t.id),Mo(e,t)}function Jf(e,t){t?.type==="fx"&&Kt.has(t.id)&&$c(e,t,!1)}function Zf(e){return e.ownerDocument.defaultView?.matchMedia?.(Kf).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Mo(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=ma(t)&&Kt.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!ma(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),ta(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Yt(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",tt(n,t.maxHelp)),!a){e.dataset.ncMax&&ps(e);return}if(!e.isConnected){let s=()=>e.isConnected&&Kt.has(t.id)&&Mo(e,t);queueMicrotask(()=>{e.isConnected?s():ta(e.ownerDocument,s)});return}let r=Zf(e),o=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;o>0&&e.style.setProperty("--nc-fx-dials",String(o)),e.dataset.ncMax!==r&&(e.dataset.ncMax&&ps(e),e.dataset.ncMax=r,r==="over"&&em(e,t)),tm(e.ownerDocument),r==="over"&&Lo(e),ta(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Yt(s)})}function ps(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),ta(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Yt(n)})}function em(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let r=e.querySelector("[data-nc-fx-max]");r instanceof HTMLElement&&r.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function Lo(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,r=e.ownerDocument.defaultView,o=Number.parseFloat(r?.getComputedStyle(a).columnGap??"")||0,s=yh(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),o,r?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var hs=new WeakSet;function tm(e){hs.has(e)||(hs.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(r=>r.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&Lo(t)}))}var Gr=new WeakMap;function Ac(e,t){let n=Kh(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Ec(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let r of n)tt(r,t.meterHelp);let a=Gr.get(e);a?a.set(t.meter):Gr.set(e,Jh(n,t.meter))}function Sc(e,t){(t.meter||Gr.has(e))&&Ec(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let r=typeof t.onFold=="function"&&t.folded===!0;r?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let o=e.querySelector("[data-nc-fx-hide]");o instanceof HTMLElement&&(kc(o,r,t.title),tt(o,t.foldHelp)),Mo(e,t);let s=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;s.hidden=r,s.setAttribute("aria-label",c),s.title=c}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";l.hidden=!r,l.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let u=l.querySelector("[data-nc-fx-fold-name]");u&&(u.textContent=t.title),tt(l,t.foldHelp)}}function tt(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function jt(e){return e.replace(/["\\]/g,"\\$&")}function nm(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);a?.type==="canvas"&&ql(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Yt(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&Lo(n);pf(e)}var am=Ze["toast-duration"];function rm({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function om(e,t,n,a){let r=l=>({top:l,bottom:l+n}),o=l=>e.some(c=>c&&c.bottom>l.top&&c.top<l.bottom),s=r(t-a-n);return o(s)?o(r(a))?"bottom":"top":"bottom"}function im(e,t,n,a,r,o){let s=e.bottom+r,l=Math.max(o,Math.min(e.left,a-o-n.width));for(let c=!0,d=0;c&&d<8;d++){c=!1;for(let u of t)u&&u.bottom>s&&u.top<s+n.height&&u.right>l&&u.left<l+n.width&&(s=u.bottom+r,c=!0)}return{top:s,left:l}}var fs="data-nc-ui-toast-live";function sm(e,t){let n=t.querySelector(`[${fs}]`);return n||(n=e.createElement("div"),n.setAttribute(fs,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function lm({message:e,actionLabel:t,onAction:n,duration:a=am,onClose:r,avoid:o=[],anchor:s,host:l,document:c=globalThis.document}={}){l=l??c.body;let d=c.defaultView??globalThis,u=c.createElement("div");u.className="nc-ui-toast",u.setAttribute("data-state","enter");let p=c.createElement("span");p.className="nc-ui-toast-message",p.textContent=e,u.appendChild(p);let h=null;t&&(h=c.createElement("button"),h.type="button",h.className="nc-ui-toast-action",h.textContent=t,u.appendChild(h)),l.appendChild(u);let m="open",g=re=>re&&typeof re.getBoundingClientRect=="function"?re.getBoundingClientRect():null,w=g(u),f=w?.height||44,b=d.getComputedStyle?.(u),y=Number.parseFloat(b?.getPropertyValue(U("toast-offset")))||16,v=Number.parseFloat(b?.getPropertyValue(U("toast-anchor-gap")))||8,x=g(s),A=d.innerHeight??0,$=o.map(g).filter(Boolean),k=x&&x.bottom>0&&x.top<A?im(x,$,{width:w?.width||0,height:f},d.innerWidth??0,v,y):null;k&&k.top+f<=A?(u.setAttribute("data-placement","anchor"),u.style.top=`${k.top+(d.scrollY??0)}px`,u.style.left=`${k.left+(d.scrollX??0)}px`):u.setAttribute("data-placement",om($,A,f,y));let S=d.requestAnimationFrame?.bind(d)??(re=>setTimeout(re,16));S(()=>S(()=>{m==="open"&&u.setAttribute("data-state","open")})),sm(c,l).textContent=rm({message:e,actionLabel:t});let M,_,j=new Promise(re=>{_=re}),ue=re=>{clearTimeout(M),M=setTimeout(()=>Ct("timeout"),re)},q=a,He=Date.now(),Tt=()=>{m==="open"&&(clearTimeout(M),q=Math.max(0,q-(Date.now()-He)))},an=()=>{m==="open"&&(He=Date.now(),ue(q))};u.addEventListener("pointerenter",Tt),u.addEventListener("pointerleave",an),u.addEventListener("focusin",Tt),u.addEventListener("focusout",an),h?.addEventListener("click",()=>{if(m==="open")try{n?.()}finally{Ct("action")}}),Number.isFinite(a)&&ue(a);function Ct(re="close"){if(m!=="open")return;m="closing",clearTimeout(M),u.setAttribute("data-state","closing"),r?.(re);let rn=d.getComputedStyle?.(u),qn=rn?Math.max(0,...String(rn.transitionDuration||"").split(",").map(sn=>Number.parseFloat(sn)*(sn.trim().endsWith("ms")?1:1e3)||0)):0,on=()=>{m!=="gone"&&(m="gone",u.remove(),_(re))};u.addEventListener("transitionend",on),setTimeout(on,qn+50)}return{el:u,close:Ct,closed:j}}var ms="data-nc-help";function cm(e,t,n,a=0,r=6,o=8){let s=e.top-r-t.height,l=s>=a+o?"above":"below",c=l==="above"?s:e.bottom+r,d=Math.max(o,Math.min(e.left,n-o-t.width));return{top:Math.round(c),left:Math.round(d),side:l}}var dr=new WeakMap;function dm(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function um({document:e=globalThis.document,delay:t=1e3}={}){if(!e)return{uninstall(){},hide(){}};let n=dr.get(e);if(n)return n;let a=e.defaultView,r=null,o=null,s,l=!1,c,d=null,u=!1,p=0,h=()=>{clearTimeout(s),u&&!l&&(p=Date.now()+1500),u=!1,r&&(r.hidden=!0,delete r.dataset.pinned)},m=()=>{h(),clearTimeout(c),o=null,d=null,l=!1},g=(k,S)=>{clearTimeout(s),d=S;let M=Date.now()<p?Math.min(t,300):t;s=setTimeout(()=>{o===k&&k.isConnected&&!l&&b(k)&&(u=!0)},M)},w=k=>({x:Number(k.clientX)||0,y:Number(k.clientY)||0}),f=(k,S,M)=>!k||Math.hypot(k.x-S.x,k.y-S.y)>M,b=(k,S)=>{let M=S??k.getAttribute(ms);if(!M)return!1;r||(r=e.createElement("div"),r.className="nc-ui-help",r.setAttribute("role","tooltip"),r.dataset.testid="nc-help",r.style.position="fixed",r.style.pointerEvents="none",r.style.zIndex="6",e.body.appendChild(r)),r.textContent=M,r.hidden=!1,r.style.visibility="hidden",r.style.top="0px",r.style.left="0px";let _=k.getBoundingClientRect(),j=cm(_,{width:r.offsetWidth,height:r.offsetHeight},a.innerWidth,dm(e));return r.style.top=`${j.top}px`,r.style.left=`${j.left}px`,r.dataset.side=j.side,r.style.visibility="",!0},y=k=>{if(l||k.pointerType==="touch")return;let S=k.target&&k.target.closest?k.target.closest(`[${ms}]`):null;S!==o&&(m(),!(!S||k.buttons)&&(o=S,g(S,w(k))))},v=k=>{if(l||k.pointerType==="touch"||!o)return;if(k.buttons){h(),d=null;return}let S=w(k);u?f(d,S,8)&&(h(),g(o,S)):f(d,S,4)&&g(o,S)},x=k=>{!l&&!k.relatedTarget&&m()},A=k=>{(l||k.key==="Escape")&&m()};e.addEventListener("pointerover",y),e.addEventListener("pointermove",v,{passive:!0}),e.addEventListener("pointerout",x),e.addEventListener("pointerdown",m,!0),e.addEventListener("keydown",A),a.addEventListener("scroll",m,!0),a.addEventListener("blur",m);let $={hide:m,pin(k,S,{ms:M=0}={}){return m(),!k||!k.isConnected||!b(k,S)?!1:(l=!0,r.dataset.pinned="",M>0&&(c=setTimeout(m,M)),!0)},uninstall(){m(),e.removeEventListener("pointerover",y),e.removeEventListener("pointermove",v),e.removeEventListener("pointerout",x),e.removeEventListener("pointerdown",m,!0),e.removeEventListener("keydown",A),a.removeEventListener("scroll",m,!0),a.removeEventListener("blur",m),r?.remove(),r=null,dr.delete(e)}};return dr.set(e,$),$}var pm="(max-width: 768px)",hm='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',fm='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',mm=0;function gm({panel:e,button:t,label:n="Menu",media:a=pm}){let r=e.ownerDocument,o=r.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++mm}`);let s=t??r.createElement("button");t||(s.type="button",s.innerHTML=hm),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function c(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),r.addEventListener("keydown",u,!0),r.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(fm)].find(f=>!f.hidden&&f.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function d({focus:f}={}){if(!l())return;let b=e.contains(r.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),r.removeEventListener("keydown",u,!0),r.removeEventListener("pointerdown",p,!0),(f??b)&&s.focus?.({preventScroll:!0})}function u(f){f.key==="Escape"&&(f.preventDefault(),f.stopPropagation(),d({focus:!0}))}function p(f){let b=f.target;b instanceof o.Node&&(e.contains(b)||s.contains(b))||d({focus:!1})}let h=()=>l()?d({focus:!0}):c(),m=f=>{let b=f.target,y=b instanceof o.Element?b.closest("button"):null;!y||!e.contains(y)||y.closest("[data-nc-menu-stay]")||d({focus:!0})};s.addEventListener("click",h),e.addEventListener("click",m);let g=o.matchMedia?.(a),w=()=>{g?.matches||d({focus:!1})};return g?.addEventListener?.("change",w),{button:s,panel:e,open:c,close:d,isOpen:l,destroy(){d({focus:!1}),s.removeEventListener("click",h),e.removeEventListener("click",m),g?.removeEventListener?.("change",w)}}}var To="netcomposer.rhythm.hidden.v1",Be=new WeakMap;function ur(){try{return globalThis.localStorage??null}catch{return null}}function Mc(e,t=To){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function gs(e,t,n,a=To){let r=Mc(e,a);n?r.add(t):r.delete(t);try{e?.setItem(a,JSON.stringify([...r]))}catch{}}function Co(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(r=>r.controls)],n=[],a=r=>{if(n.push(r),r.type==="group")for(let o of r.controls)a(o)};for(let r of t)a(r),r.type==="fx"&&n.push(...r.controls,...r.more??[]),r.type==="strip"&&(n.push(...(r.sends??[]).map(o=>({...o,type:"knob",compact:!0}))),r.pan&&n.push(Eo(r)),r.trim&&n.push(So(r)));return n}function Lc(e,t){if(!(!e||!t))return Co(e).find(n=>n.id===t)}function bm(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${Co(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function ym(e,t){if(!t.title)return;if(!t.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=t.title,e.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(a,r),e.append(n),Tc(e,t)}function Tc(e,t){if(!t.panel)return;let n=[...e.children].find(o=>o.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),r&&(r.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function wm(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=Be.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Lc(n,a)}function vm(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],r=bm(t);if(e.dataset.ncSignature===r){for(let o of a){let s=e.querySelector(`[data-nc-section="${ys(o.id)}"]`);s&&Tc(s,o);for(let l of o.controls){let c=e.querySelector(`[data-nc-id="${ys(l.id)}"]`);c instanceof Element&&$e(c,l)}s instanceof HTMLElement&&Yr(s,o,n)}return}e.dataset.ncSignature=r,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let o of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=o.id,o.inset&&(s.dataset.ncInset="true"),o.area&&(s.dataset.ncArea=o.area),o.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",o.label)),o.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),o.title&&s.setAttribute("aria-label",o.title)),ym(s,o);let l=o.panel?document.createElement("div"):s;o.panel&&(l.className="nc-panel-body",s.append(l));for(let c of o.controls)l.append(yt(c,wm));e.append(s),Yr(s,o,n)}}function Cc(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,r=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,r))}}var xm="(max-width: 768px)",Nc=new WeakMap;function bs(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function km(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let r=bs("prev"),o=bs("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(r,s,o,l);let c=(d,u)=>{let p=Nc.get(e);if(!p||u.getAttribute("aria-disabled")==="true")return;let h=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:m}=Cc(h,p.pageSize,(t.pages.get(p.id)??0)+d);t.pages.set(p.id,m),p.onPage?.(m),Yr(e,{...p,page:m},t),u.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===u&&(u===r?o:r).focus(),t.redraw()};return r.addEventListener("click",()=>c(-1,r)),o.addEventListener("click",()=>c(1,o)),e.prepend(a),a}function Yr(e,t,n){Nc.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],r=t.pageSize??0,{pages:o,page:s}=Cc(a.length,r,t.page??n.pages.get(t.id)??0);if(r>0&&n.pages.set(t.id,s),o<=1){for(let f of[...e.children])f.classList.contains("nc-fx-pager")&&f.remove();delete e.dataset.ncPaged;for(let f of a)delete f.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(xm).matches===!0,c=e.closest(".nc-module");a.forEach((f,b)=>{let y=Math.floor(b/r)!==s;if(y?f.dataset.ncOffPage="":delete f.dataset.ncOffPage,y&&!l){let v=c instanceof HTMLElement?Be.get(c):void 0;Jf(f,Lc(v,f.dataset.ncId))}});let d=km(e,n),u=d.querySelector('[data-nc-fx-page="prev"]'),p=d.querySelector('[data-nc-fx-page="next"]');u.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===o-1?"true":"false");let h=d.querySelector("[data-nc-fx-page-count]"),m=`${s+1} / ${o}`;h.textContent!==m&&(h.textContent=m);let g=d.querySelector("[data-nc-fx-page-live]"),w=`Effects page ${s+1} of ${o}`;g.textContent!==w&&(g.textContent=w)}function ys(e){return e.replace(/["\\]/g,"\\$&")}function $m(e,t=To){Cl();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Mc(ur(),t).has(e.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=Fl({labelledBy:o.id,onChange:y=>(Be.get(n)??e).onToggle?.(y)});d.el.dataset.ncModuleSwitch="",s.append(d.el,l,c);let u=document.createElement("span");u.className="nc-snap-msg",u.dataset.ncStatus="",r.append(o,u,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let h=document.createElement("button");h.type="button",h.className="nc-slim";let m=document.createElement("span");m.className="nc-slim-lines",h.append(m);let g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",n.append(g,r,p,h),n.setAttribute("aria-labelledby",o.id);let w=y=>{let v=Be.get(n)??e;n.dataset.ncOpen=y?"false":"true",p.hidden=y,h.hidden=!y,l.textContent=y?"+":"−",l.setAttribute("aria-expanded",y?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${y?"Show":"Hide"} ${v.title}`),l.title=y?"Show":"Hide",y?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let y=n.dataset.ncOpen==="true";gs(ur(),(Be.get(n)??e).id,y,t),w(y),Kr(n.parentElement)}),h.addEventListener("click",()=>{gs(ur(),(Be.get(n)??e).id,!1,t),w(!1),Kr(n.parentElement)});let f={pages:new Map,redraw:()=>b.redraw()},b={el:n,update(y){Be.set(n,y),y.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=y.title,u.textContent=y.status??"",y.status!==void 0?u.setAttribute("aria-live","polite"):u.removeAttribute("aria-live"),m.textContent=y.summary??y.title,d.el.hidden=y.on===void 0,d.set(y.on===!0),y.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,h.setAttribute("aria-label",`Show ${y.title}`),vm(p,y,f),w(p.hidden),b.redraw()},redraw(){let y=Be.get(n);y&&nm(n,Co(y))}};return Be.set(n,e),w(a),b.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>b.redraw()).observe(n),Ml(()=>b.redraw(),n.ownerDocument),b}function Am(e,t,n="adjacent"){Cl(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((r,o)=>{let s=o%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=a;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(r.el),r.redraw()}),Kr(e)}function Kr(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=t.some(o=>o.hasAttribute("data-nc-lead")),a=t.map(o=>o.hasAttribute("data-nc-slim")?i("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let r=t.filter(o=>!o.hasAttribute("data-nc-slim"));n&&t.length===4&&r.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Em="https://musicmatter.art/library/library.json",Ht="musicmatter.art",Sm=["CC0-1.0","CC-BY-4.0","CC-BY-SA-4.0","PDM-1.0"],Fc=6,Mm=2,No=["kick","snare","clap","hat","tom","perc","cymbal","fx","tonal"],zc=["redistributable","personal","unknown"],ga=e=>typeof e=="number"&&Number.isFinite(e)&&e>=40&&e<=250;function Pc(e){const t=e.kind==="loop"?"loop":e.kind==="one-shot"?"one-shot":"";return{kind:t,bpm:t==="loop"&&ga(e.bpm)?e.bpm:0}}const Ve=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{},H=(e,t=300)=>typeof e=="string"?e.trim().slice(0,t):"",fe=(e,t=0)=>typeof e=="number"&&Number.isFinite(e)?e:t,be=e=>{const t=H(e,600);return/^https?:\/\/[^\s"'<>]+$/i.test(t)?t:""},Fo=/^[0-9a-f]{64}$/,Bc="0123456789abcdefghijklmnopqrstuvwxyz";function Lm(e){const t=Ve(e),n=Array.isArray(t.sounds)?t.sounds:[],a=new Set,r=[];for(const o of n){const s=Ve(o),l=H(s.id,160),c=H(s.role),d=H(s.license,40),u=be(s.audio),p=H(s.sha256,64).toLowerCase(),h=H(s.title,160);if(!l||a.has(l)||!No.includes(c)||!u||!h||!Sm.includes(d)||!Fo.test(p))continue;a.add(l);const m=Ve(s.measures),g=fe(m.gain_db),w=Ve(s.source);r.push({id:l,origin:"shelf",licenseStatus:"",permission:"",role:c,title:h,instrument:h.split(" · ")[0]??h,tags:(Array.isArray(s.tags)?s.tags:[]).filter(f=>typeof f=="string").map(f=>f.toLowerCase().slice(0,40)),license:d,licenseUrl:be(s.license_url)||zo(d),creator:H(s.creator,120)||"Unknown",creatorLink:be(s.creator_link),source:be(w.url),audio:u,manifest:be(s.manifest),sha256:p,measures:{length:fe(m.length_s,1),attack:fe(m.attack_ms,10),decay:fe(m.decay_s,.3),centroid:fe(m.centroid_hz,1e3),level:fe(m.hit_dbfs,-20)+g,gain:g},wave:typeof s.wave=="string"?Array.from(s.wave.slice(0,96),f=>Math.max(0,Bc.indexOf(f))/35):[],...Pc(s)})}return{name:H(t.name,120)||Ht,sounds:r}}function Xr(e){const t=H(e,400).replace(/\\/g,"/");if(!t||t.startsWith("/")||/^[a-z][a-z0-9+.-]*:/i.test(t)||t.includes("\0"))return"";const n=t.split("/");return n.some(a=>!a||a==="."||a==="..")?"":n.join("/")}const Tm="local:";function Dc(e,t){const n=Ve(e),a=Array.isArray(n.sounds)?n.sounds:[],r=new Set,o=[];for(const s of a){const l=Ve(s),c=H(l.id,160),d=`${Tm}${c}`,u=H(l.role),p=H(l.license,40)||"unknown",h=Xr(l.audio),m=H(l.sha256,64).toLowerCase(),g=H(l.title,160);if(!c||r.has(d)||!No.includes(u)||!h||!g||!Fo.test(m))continue;r.add(d);const w=Ve(l.measures),f=fe(w.gain_db),b=Ve(l.source),y=H(l.license_status,20);o.push({id:d,origin:"local",licenseStatus:zc.includes(y)?y:"unknown",permission:H(l.permission,300),role:u,title:g,instrument:g.split(" · ")[0]??g,tags:(Array.isArray(l.tags)?l.tags:[]).filter(v=>typeof v=="string").map(v=>v.toLowerCase().slice(0,40)),license:p,licenseUrl:be(l.license_url)||zo(p),creator:H(l.creator,120)||"Unknown",creatorLink:be(l.creator_link),source:be(b.url),audio:`local:${t}/${h}`,manifest:Xr(l.manifest),sha256:m,measures:{length:fe(w.length_s,1),attack:fe(w.attack_ms,10),decay:fe(w.decay_s,.3),centroid:fe(w.centroid_hz,1e3),level:fe(w.hit_dbfs,-20)+f,gain:f},wave:typeof l.wave=="string"?Array.from(l.wave.slice(0,96),v=>Math.max(0,Bc.indexOf(v))/35):[],...Pc(l)})}return{name:H(n.name,120)||"Local Library",sounds:o}}function Oc(e){const t=/^local:[^/]+\/(.+)$/.exec(e);return t?Xr(t[1]):""}function ws(e,...t){return{name:e,sounds:t.flatMap(n=>n?.sounds??[])}}function zo(e){return e==="CC0-1.0"?"https://creativecommons.org/publicdomain/zero/1.0/":e==="CC-BY-4.0"?"https://creativecommons.org/licenses/by/4.0/":e==="CC-BY-SA-4.0"?"https://creativecommons.org/licenses/by-sa/4.0/":e==="PDM-1.0"?"https://creativecommons.org/publicdomain/mark/1.0/":""}function Po(e,t="",n=""){return e==="CC0-1.0"?"CC0":e==="CC-BY-4.0"?"BY":e==="CC-BY-SA-4.0"?"BY-SA":e==="PDM-1.0"?"PD":e==="Permission-only"||n?"PERM":t==="personal"?"PERS":t==="unknown"||e==="unknown"?"?":e}function qc(e){return e.origin==="local"&&e.licenseStatus!=="redistributable"}function Oa(e,t=24){const n=e.trim();if(n.length<=t)return n;const[a=n,r=""]=n.split(" · "),o=r.split(/\s+/).at(-1)??"",s=/^(?:v|vl|rr|k)?\d{1,2}$|^(?:p{1,3}|mp|mf|f{1,3})\d*$/i.test(o)?o:"",l=s?`${a} ${s}`:"";return l&&l.length<=t?l:a.length<=t?a:n.slice(0,t).trim()}const Vr={kick:"kick",kicks:"kick",bd:"kick",bassdrum:"kick","bass drum":"kick","kick drum":"kick",snare:"snare",snares:"snare",sd:"snare","snare drum":"snare",rimshot:"snare",clap:"clap",claps:"clap",handclap:"clap",handclaps:"clap","hand clap":"clap","hand claps":"clap",hat:"hat",hats:"hat",hihat:"hat",hihats:"hat","hi-hat":"hat","hi-hats":"hat","hi hat":"hat","hi hats":"hat","high hat":"hat",hh:"hat",ch:"hat",oh:"hat",tom:"tom",toms:"tom",tomtom:"tom","floor tom":"tom",perc:"perc",percs:"perc",percussion:"perc",cymbal:"cymbal",cymbals:"cymbal",crash:"cymbal",ride:"cymbal",splash:"cymbal",china:"cymbal",fx:"fx",sfx:"fx",effect:"fx",effects:"fx",tonal:"tonal",melodic:"tonal",pitched:"tonal",bell:"tonal",bells:"tonal",mallet:"tonal",mallets:"tonal",chime:"tonal",chimes:"tonal"},Cm={ch:"closed",oh:"open"},vs={punchy:{wants:[{measure:"attack",dir:-1},{measure:"decay",dir:-1}],tag:"punchy"},tight:{wants:[{measure:"decay",dir:-1}],tag:"tight"},snappy:{wants:[{measure:"decay",dir:-1},{measure:"centroid",dir:1}],tag:"snappy"},short:{wants:[{measure:"length",dir:-1},{measure:"decay",dir:-1}],tag:"short"},dry:{wants:[{measure:"decay",dir:-1}]},long:{wants:[{measure:"length",dir:1},{measure:"decay",dir:1}],tag:"long"},ringing:{wants:[{measure:"decay",dir:1}]},wet:{wants:[{measure:"decay",dir:1}]},big:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}],tag:"boomy"},boomy:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}],tag:"boomy"},fat:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}]},deep:{wants:[{measure:"centroid",dir:-1}],tag:"deep"},dark:{wants:[{measure:"centroid",dir:-1}],tag:"dark"},warm:{wants:[{measure:"centroid",dir:-1}]},low:{wants:[{measure:"centroid",dir:-1}]},muffled:{wants:[{measure:"centroid",dir:-1}]},bright:{wants:[{measure:"centroid",dir:1}],tag:"bright"},crisp:{wants:[{measure:"centroid",dir:1},{measure:"decay",dir:-1}]},sharp:{wants:[{measure:"centroid",dir:1},{measure:"attack",dir:-1}]},high:{wants:[{measure:"centroid",dir:1}]},airy:{wants:[{measure:"centroid",dir:1}]},loud:{wants:[{measure:"level",dir:1}],tag:"hard"},hard:{wants:[{measure:"level",dir:1}],tag:"hard"},heavy:{wants:[{measure:"level",dir:1},{measure:"centroid",dir:-1}]},soft:{wants:[{measure:"level",dir:-1}],tag:"soft"},quiet:{wants:[{measure:"level",dir:-1}],tag:"soft"},gentle:{wants:[{measure:"level",dir:-1}],tag:"soft"},ghost:{wants:[{measure:"level",dir:-1}],tag:"soft"}},Qr={funk:["tight","punchy"],funky:["tight","punchy"],disco:["tight","bright"],dusty:["dark","soft"],lofi:["dark","soft"],"lo-fi":["dark","soft"],vintage:["dark"],"70s":["dark","tight"],"60s":["dark","soft"],old:["dark"],jazz:["soft","dark"],jazzy:["soft","dark"],rock:["hard","long"],metal:["hard","bright"],hiphop:["punchy","dark"],"hip-hop":["punchy","dark"],"boom bap":["punchy","dark"],boombap:["punchy","dark"],trap:["punchy","short"],techno:["tight","punchy"],house:["tight","punchy"],ambient:["long","soft"],cinematic:["big","long"],epic:["big","loud"]},Ic=new Set(["kit","kits","drumkit","drumkits","drums","set","drum kit"]),Nm=new Set("a an the some any with and or of for to me my give find get want need please like sound sounds sample samples one ones really very bit little more less that this".split(" "));function Fm(e){const t=e.toLowerCase().replace(/[^a-z0-9\s-]/g," ").split(/\s+/).filter(Boolean),n=[];for(let a=0;a<t.length;a++){const r=`${t[a]} ${t[a+1]??""}`;t[a+1]&&(r in Vr||r in Qr||Ic.has(r))?(n.push(r),a++):n.push(t[a])}return n}function Bo(e){return new Set(e.title.toLowerCase().split(/[^a-z0-9]+/).map(t=>t.replace(/\d+$/,"")).filter(t=>t.length>1))}function Jr(e,t){const n={text:e.trim(),roles:[],tags:[],softTags:[],wants:[],kit:!1,kind:"",unknown:[]},a=new Set;if(t)for(const o of t.sounds){for(const s of o.tags)a.add(s);for(const s of Bo(o))a.add(s)}const r=o=>{const s=vs[o];s&&(n.wants.push(...s.wants),s.tag&&!n.softTags.includes(s.tag)&&n.softTags.push(s.tag))};for(const o of Fm(e))if(Ic.has(o))n.kit=!0;else if(o in Vr){const s=Vr[o];n.roles.includes(s)||n.roles.push(s);const l=Cm[o];(l==="open"||l==="closed")&&(n.kind=l)}else if(o in vs)r(o);else if(o in Qr)for(const s of Qr[o]??[])r(s);else if(o==="open")n.kind="open";else if(o==="closed"||o==="close")n.kind="closed";else{if(Nm.has(o))continue;if(!t||a.has(o)||a.has(o.replace(/s$/,""))){const s=t&&!a.has(o)?o.replace(/s$/,""):o;n.tags.includes(s)||n.tags.push(s)}else n.unknown.push(o)}return n}function zm(e,t){const n=[...e].sort((o,s)=>o.measures[t]-s.measures[t]),a=new Map,r=Math.max(1,n.length-1);return n.forEach((o,s)=>a.set(o.id,s/r)),a}const Pm=[{measure:"level",dir:1,weight:.5},{measure:"length",dir:-1,weight:.2}],Bm=.2,Dm={kick:-1,tom:-1,snare:1,clap:1,hat:1};function Do(e,t){const n=new Set(t.wants.map(s=>s.measure)),a=new Map,r=(s,l)=>{let c=a.get(s);return c||(c=zm(e,s),a.set(s,c)),c.get(l)??.5},o=(s,l)=>s.reduce((c,d)=>{const u=r(d.measure,l);return c+(d.dir>0?u:1-u)},0)/Math.max(1,s.length);return e.map(s=>{const l=Bo(s);let c=0;for(const u of t.tags)c+=s.tags.includes(u)?2:l.has(u)?1:0;t.wants.length&&(c+=2*o(t.wants,s.id));const d=Dm[s.role];for(const u of[...Pm,...d?[{measure:"centroid",dir:d,weight:Bm}]:[]])n.has(u.measure)||(c+=2*u.weight*o([u],s.id));for(const u of t.softTags)s.tags.includes(u)&&(c+=.4);return{sound:s,score:c}})}const xs=(e,t)=>t.score-e.score||e.sound.title.localeCompare(t.sound.title)||e.sound.id.localeCompare(t.sound.id);function ba(e,t,n,a){let r=e.sounds.filter(o=>!a.has(o.id)&&(!t.length||t.includes(o.role)));if(n.length){const o=r.filter(s=>{const l=Bo(s);return n.some(c=>s.tags.includes(c)||l.has(c))});o.length&&(r=o)}return r}function Oo(e,t){const n=[...e].sort(xs),a=[],r=new Map;for(const o of n){if(a.length>=t)break;const s=r.get(o.sound.instrument)??0;s>=Mm||(r.set(o.sound.instrument,s+1),a.push(o))}for(const o of n){if(a.length>=t)break;a.includes(o)||a.push(o)}return a.sort(xs)}function Om(e,t){if(!t)return e;const n=e.filter(a=>a.role==="hat"&&En(a)===t);return n.length?n:e}function qm(e,t,n={}){const a=t.kind&&!t.roles.length?["hat"]:t.roles,r=Om(ba(e,a,t.tags,n.exclude??new Set),t.kind);return Oo(Do(r,t),n.limit??Fc)}const Im=[{key:"kick",label:"Kick",role:"kick",nearest:["tom","perc"]},{key:"snare",label:"Snare",role:"snare",nearest:["clap","perc"]},{key:"clap",label:"Clap",role:"clap",nearest:["snare","perc"]},{key:"closed-hat",label:"Closed hat",role:"hat",tag:"closed",nearest:["perc","cymbal"]},{key:"open-hat",label:"Open hat",role:"hat",tag:"open",nearest:["cymbal","perc"]},{key:"tom",label:"Tom",role:"tom",nearest:["perc","kick"]},{key:"perc",label:"Perc",role:"perc",nearest:["tom","tonal"]},{key:"fx",label:"FX",role:"fx",nearest:["tonal","cymbal","perc"]}];function En(e){if(e.tags.includes("closed"))return"closed";if(e.tags.includes("open"))return"open";const t=e.title.toLowerCase();return/\bclose[d]?\b|hitc\b/.test(t)?"closed":/\bopen\b|hito\b/.test(t)?"open":""}function Rm(e,t,n,a){const r=ba(e,[t.role],n.tags,a);if(t.tag){const o=r.filter(l=>En(l)===t.tag);if(o.length)return{list:o,role:t.role,kindMissing:!1};const s=r.filter(l=>En(l)==="");if(s.length)return{list:s,role:t.role,kindMissing:!0}}else if(r.length)return{list:r,role:t.role,kindMissing:!1};for(const o of t.nearest){const s=ba(e,[o],n.tags,a);if(s.length)return{list:s,role:o,kindMissing:!1}}return{list:[],role:t.role,kindMissing:!1}}const _m={kick:"a kick",snare:"a snare",clap:"a clap",hat:"a hat",tom:"a tom",perc:"a percussion sound",cymbal:"a cymbal",fx:"an effect",tonal:"a tonal sound"};function ks(e,t){const n=t.wants.some(o=>o.measure==="level")?t:{...t,wants:[...t.wants,{measure:"level",dir:1}]},a=new Set,r=[];for(const o of Im){const{list:s,role:l,kindMissing:c}=Rm(e,o,n,a),d=Oo(Do(s,n),1)[0];if(!d)continue;a.add(d.sound.id);const u=l!==o.role?`No ${o.label.toLowerCase()} in the Library: ${_m[l]} instead.`:c?`No ${o.label.toLowerCase()} labelled as one: the nearest hat instead.`:void 0;r.push({slot:o,sound:d.sound,...u?{note:u}:{}})}return r}const qo="your local Library";function Io(e,t){return{id:e.id,title:e.title,role:e.role,creator:e.creator,creatorLink:e.creatorLink,license:e.license,licenseUrl:e.licenseUrl,source:e.source,audio:e.audio,sha256:e.sha256,gainDb:e.measures.gain,curator:e.origin==="local"?qo:Ht,query:t.trim().slice(0,120),kind:e.role==="hat"?En(e):"",origin:e.origin,licenseStatus:e.licenseStatus}}function jm(e){if(!e||typeof e!="object"||Array.isArray(e))return null;const t=e,n=H(t.id,160),a=H(t.title,160),r=H(t.license,40),o=H(t.sha256,64).toLowerCase();if(!n||!a||!r)return null;const s=No.includes(t.role)?t.role:"perc",l=t.kind==="closed"||t.kind==="open"?t.kind:"",c=t.origin==="local"?"local":"shelf",d=H(t.licenseStatus,20),u=c==="local"?Oc(H(t.audio,600))?H(t.audio,600):"":be(t.audio);return{id:n,title:a,role:s,creator:H(t.creator,120)||"Unknown",creatorLink:be(t.creatorLink),license:r,licenseUrl:be(t.licenseUrl)||zo(r),source:be(t.source),audio:u,sha256:Fo.test(o)?o:"",gainDb:Math.max(-60,Math.min(60,fe(t.gainDb))),curator:H(t.curator,80)||(c==="local"?qo:Ht),query:H(t.query,120),kind:l,origin:c,licenseStatus:c==="local"&&zc.includes(d)?d:c==="local"?"unknown":""}}function Hm(e,t,n=new Set,a=3){const r=Jr(t.query,e),o=new Set([...n,t.id]);let s=ba(e,[t.role],r.tags,o);if(t.role==="hat"&&t.kind){const l=s.filter(c=>En(c)===t.kind);l.length&&(s=l)}return Oo(Do(s,{...r,roles:[t.role]}),a)}function Rc(e){const t=new Map;return e.forEach((n,a)=>{const r=n.provenance;if(!r)return;const o=t.get(r.id);o?o.pads.push(a+1):t.set(r.id,{...r,pads:[a+1]})}),[...t.values()]}function Wm(e){return["shelf","local"].map(n=>({origin:n,credits:e.filter(a=>(a.origin??"shelf")===n)})).filter(n=>n.credits.length)}const Um=-14,Gm=-1,_c=24,Ym=.05,Km=-80,$s=e=>e>0?20*Math.log10(e):Number.NEGATIVE_INFINITY;function Xm(e,t){const n=e[0]?.length??0,a=e.length;if(!n||!a)return{hit:Number.NEGATIVE_INFINITY,peak:Number.NEGATIVE_INFINITY};const r=Math.max(1,Math.round(Ym*t)),o=new Float64Array(n);let s=0;for(let d=0;d<n;d++){let u=0;for(const p of e){const h=p[d]??0;u+=h;const m=h<0?-h:h;m>s&&(s=m)}u/=a,o[d]=u*u}let l=0,c=0;for(let d=0;d<n;d++)l+=o[d]??0,d>=r&&(l-=o[d-r]??0),l>c&&(c=l);return{hit:$s(Math.sqrt(Math.max(0,c)/r)),peak:$s(s)}}function Vm(e){if(!Number.isFinite(e.hit)||e.hit<Km)return 0;let t=Math.min(Um-e.hit,_c);Number.isFinite(e.peak)&&(t=Math.min(t,Gm-e.peak));const n=Math.round(t*10)/10;return n===0?0:n}function Xt(e,t){return{on:!0,gainDb:Vm(Xm(e,t))}}const Qm=Object.freeze({on:!0,gainDb:0});function As(e){return e.normalize?e.normalize.on:e.provenance!==null}function Jm(e){const t=e.normalize;return t?t.on?t.gainDb:e.provenance?-e.provenance.gainDb:0:0}function Zm(e){const t=Jm(e);return t===0?1:10**(t/20)}function eg(e){if(!e||typeof e!="object"||Array.isArray(e))return null;const t=e;if(typeof t.on!="boolean")return null;const n=t.gainDb;return typeof n!="number"||!Number.isFinite(n)||n<-60||n>_c?null:{on:t.on,gainDb:n}}function tg(e){const t=Math.round(e*10)/10;return t===0?"0.0 dB":`${t>0?"+":"−"}${Math.abs(t).toFixed(1)} dB`}const Q=16,ne=16,Vt=10,jc=["1","2","3","4","5","6","7","8","9","0"],Hc=[0,2,4,8,16],Wc=[0,1,2,4,8],ya=["always","1:2","2:2","1:3","2:3","3:3","1:4","2:4","3:4","4:4","1:5","2:5","3:5","4:5","5:5","1:6","2:6","3:6","4:6","5:6","6:6","1:7","2:7","3:7","4:7","5:7","6:7","7:7","1:8","2:8","3:8","4:8","5:8","6:8","7:8","8:8","fill","!fill","pre","!pre"],wa={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}};function Ee(e){return{name:`Pad ${e+1}`,sample:null,mode:"oneshot",dir:"fwd",start:0,end:1,slices:0,cuts:[],tune:0,fine:0,fit:0,keepPitch:!0,attack:0,decay:4,cutoff:0,resonance:0,level:.8,pan:0,choke:0,provenance:null,normalize:null,offsetDb:0,follow:null,note:0}}function Sn(e){return!e.sample||e.fit>0?!1:e.follow??e.provenance?.role==="tonal"}function ng(e,t){const n=/^(\d):(\d)$/.exec(e.cond);return!e.on||!n?{}:{mark:n[1],markLabel:`${t===ne?"bar":"pass"} ${n[1]} of ${n[2]}`}}function Bn(){return{on:!1,accent:!1,velocity:.8,chance:1,slice:null,pitch:0,reverse:!1,cond:"always"}}function qa(){return{length:ne,mute:!1,solo:!1,steps:Array.from({length:ne},Bn)}}function Uc(){return{filter:{on:!0,mode:"lp",cutoff:1,resonance:.15},drive:structuredClone(wa.drive),compressor:structuredClone(wa.compressor)}}function Zr(){return{v:1,pads:Array.from({length:Q},(e,t)=>Ee(t)),lanes:Array.from({length:Q},qa),swing:.5,hacks:Uc(),slots:Array.from({length:Vt},()=>null),active:null,selected:0,master:1}}const qe=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{},ie=(e,t,n,a)=>typeof e=="number"&&Number.isFinite(e)?Math.min(n,Math.max(t,e)):a,Oe=(e,t,n,a)=>Math.round(ie(e,t,n,a)),nt=(e,t)=>typeof e=="boolean"?e:t,va=(e,t,n)=>t.includes(e)?e:n,Gn=/^[0-9a-f]{16,64}$/,ag=1e-6;function rg(e,t){const n=qe(e),a=Ee(t);let r=ie(n.start,0,1,0),o=ie(n.end,0,1,1);o-r<ag&&([r,o]=[0,1]);const s=Hc.includes(n.slices)?n.slices:0,l=typeof n.cuts=="string"&&n.cuts.length<=Yc?n.cuts.split(" ").map(Number):n.cuts,c=Array.isArray(l)?l.filter(d=>typeof d=="number"&&d>0&&d<1).sort((d,u)=>d-u).slice(0,15):[];return{name:typeof n.name=="string"&&n.name.trim()?n.name.trim().slice(0,24):a.name,sample:typeof n.sample=="string"&&Gn.test(n.sample)?n.sample:null,mode:va(n.mode,["oneshot","gate","loop"],a.mode),dir:va(n.dir,["fwd","rev","pingpong"],a.dir),start:r,end:o,slices:s,cuts:s?c:[],tune:Oe(n.tune,-24,24,0),fine:Oe(n.fine,-100,100,0),fit:Wc.includes(n.fit)?n.fit:0,keepPitch:nt(n.keepPitch,!0),attack:ie(n.attack,0,.1,a.attack),decay:ie(n.decay,.01,4,a.decay),cutoff:ie(n.cutoff,-1,1,0),resonance:ie(n.resonance,0,1,0),level:ie(n.level,0,1,a.level),pan:ie(n.pan,-1,1,0),choke:Oe(n.choke,0,4,0),provenance:typeof n.sample=="string"&&Gn.test(n.sample)?jm(n.provenance):null,normalize:typeof n.sample=="string"&&Gn.test(n.sample)?eg(n.normalize):null,offsetDb:typeof n.sample=="string"&&Gn.test(n.sample)?ie(n.offsetDb,-24,0,0):0,follow:typeof n.follow=="boolean"?n.follow:null,note:Oe(n.note,0,11,0)}}function og(e){const t=qe(e);return{on:nt(t.on,!1),accent:nt(t.accent,!1),velocity:ie(t.velocity,0,1,.8),chance:ie(t.chance,0,1,1),slice:t.slice===null||t.slice===void 0?null:Oe(t.slice,0,15,0),pitch:Oe(t.pitch,-12,12,0),reverse:nt(t.reverse,!1),cond:va(t.cond,ya,"always")}}function ig(e){const t=qe(e),n=Array.isArray(t.steps)?t.steps:typeof t.steps=="string"?fg(t.steps):[];return{length:Oe(t.length,1,ne,ne),mute:nt(t.mute,!1),solo:nt(t.solo,!1),steps:Array.from({length:ne},(a,r)=>og(n[r]))}}function Es(e,t){const n=qe(e),a={...t.dials};for(const[r,o]of Object.entries(qe(n.dials)))r in t.dials&&typeof o=="number"&&Number.isFinite(o)&&(a[r]=o);return{on:nt(n.on,t.on),dials:a}}function sg(e){const t=qe(e),n=qe(t.filter),a=Uc();return{filter:{on:nt(n.on,a.filter.on),mode:va(n.mode,["lp","hp","bp"],a.filter.mode),cutoff:ie(n.cutoff,0,1,a.filter.cutoff),resonance:ie(n.resonance,0,1,a.filter.resonance)},drive:Es(t.drive,wa.drive),compressor:Es(t.compressor,wa.compressor)}}function xa(e){const t=qe(e),n=Array.isArray(t.pads)?t.pads:[],a=Array.isArray(t.lanes)?t.lanes:[];return{pads:Array.from({length:Q},(r,o)=>rg(n[o],o)),lanes:Array.from({length:Q},(r,o)=>ig(a[o])),swing:ie(t.swing,.5,.75,.5),hacks:sg(t.hacks)}}function Gc(e){const t=qe(e);if(t.v!==1)return Zr();const n=Array.isArray(t.slots)?t.slots:[],a=xa(t),r=Array.from({length:Vt},(s,l)=>n[l]?xa(n[l]):null),o=t.active===null?null:Oe(t.active,0,Vt-1,-1);return{v:1,...a,slots:r,active:o!==null&&o>=0&&r[o]?o:null,selected:Oe(t.selected,0,Q-1,0),master:ie(t.master,0,1,1)}}function Ro(e,t){return structuredClone({index:t,pad:e.pads[t]??Ee(t),lane:e.lanes[t]??qa()})}function lg(e,t){const n=structuredClone(t);e.pads[n.index]=n.pad,e.lanes[n.index]=n.lane}function _o(e,t){const n=(o,s)=>o.index??s,a=t.map((o,s)=>Ro(e,n(o,s))),r=t.map((o,s)=>o.hat?e.pads[n(o,s)]?.choke??0:0).find(o=>o>0)??1;return t.forEach((o,s)=>{const l=Ee(n(o,s));l.sample=o.sample,l.name=o.name.slice(0,24)||l.name,l.provenance=o.provenance,l.normalize=o.normalize!==void 0?o.normalize&&{...o.normalize}:o.provenance?{on:!0,gainDb:0}:null,o.hat&&(l.choke=r),e.pads[n(o,s)]=l}),a}function cg(e,t){const n=Array.from({length:Q},(a,r)=>Ro(e,r));for(let a=0;a<Q;a++)e.pads[a]=Ee(a);return _o(e,t),n}const Mn=8;function dg(e,t,n,a=0){const r=e.pads[t],o=e.lanes[t];if(!r||!o)return;r.mode="oneshot",r.dir="fwd",r.decay=4,r.attack=0,r.fit=n,r.keepPitch=!0,r.slices=0,r.cuts=[],o.length=ne;for(const l of o.steps)Object.assign(l,Bn());const s=o.steps[0];n<=Mn&&s&&(s.on=!0,s.cond=n===1?"always":`${a%n+1}:${n}`)}function ug(e,t=Q){if(typeof e!="string"||!/^\d{1,3}$/.test(e))return-1;const n=Number(e)-1;return n>=0&&n<t?n:-1}function jo(e){return structuredClone({pads:e.pads,lanes:e.lanes,swing:e.swing,hacks:e.hacks})}const Yc=4096;function pg(e){const t=Bn(),n=e.map(a=>{let r="";return a.on!==t.on&&(r+="x"),a.accent!==t.accent&&(r+="a"),a.reverse!==t.reverse&&(r+="r"),a.velocity!==t.velocity&&(r+=`v${a.velocity}`),a.chance!==t.chance&&(r+=`c${a.chance}`),a.slice!==t.slice&&a.slice!==null&&(r+=`s${a.slice}`),a.pitch!==t.pitch&&(r+=`p${a.pitch}`),a.cond!==t.cond&&(r+=`k${a.cond}`),r||"-"});for(;n.at(-1)==="-";)n.pop();return n.join(" ")}const hg="-?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[+-]?\\d+)?",Ss=new RegExp(`[xar]|[vcsp]${hg}|k\\S+$`,"gy");function fg(e){return e.length>Yc?[]:e.split(" ").slice(0,ne).map(t=>{const n={};if(t==="-"||t==="")return n;Ss.lastIndex=0;let a=0;for(const r of t.matchAll(Ss)){const o=r[0];a+=o.length;const s=o.slice(1);o==="x"?n.on=!0:o==="a"?n.accent=!0:o==="r"?n.reverse=!0:o[0]==="v"?n.velocity=Number(s):o[0]==="c"?n.chance=Number(s):o[0]==="s"?n.slice=Number(s):o[0]==="p"?n.pitch=Number(s):o[0]==="k"&&(n.cond=s)}return a===t.length?n:{}})}function mg(e){const t=e.pads.map((a,r)=>{const o=Ee(r),s={};for(const[l,c]of Object.entries(a))l==="cuts"?a.cuts.length&&(s.cuts=a.cuts.join(" ")):o[l]!==c&&(s[l]=c);return s}),n=e.lanes.map(a=>({...a.length!==ne?{length:a.length}:{},...a.mute?{mute:!0}:{},...a.solo?{solo:!0}:{},steps:pg(a.steps)}));return structuredClone({pads:t,lanes:n,swing:e.swing,hacks:e.hacks})}function Ln(e){const t=new Set;for(const n of[e,...e.slots])for(const a of n?.pads??[])a.sample&&t.add(a.sample);return t}function Kc(){try{return globalThis.localStorage??null}catch{return null}}function gg(e,t=Kc()){try{const n=t?.getItem(e);return n?Gc(JSON.parse(n)):Zr()}catch{return Zr()}}function bg(e,t,n=Kc()){try{return n?.setItem(e,JSON.stringify(t)),!!n}catch{return!1}}const Ye=1e-6;function yg(e,t){return Math.min(127,Math.max(0,(t+1)*12+(e%12+12)%12))}class pr{entries=[];add(t){for(const n of t){let a=this.entries.find(o=>o.chord?.hit===n.hit&&Math.abs(o.startBeat-n.startBeat)<Ye);a||(a={startBeat:n.startBeat,chord:{root:n.root,notes:[],startBeat:n.startBeat,lengthBeats:0,sounding:!0,hit:n.hit}},this.insert(a));const r=a.chord;r.notes.includes(n.note)||(r.notes.push(n.note),r.notes.sort((o,s)=>o-s)),r.lengthBeats=Math.max(r.lengthBeats,n.lengthBeats)}}off(t){if(t===void 0){this.entries=[];return}this.entries=this.entries.filter(n=>n.startBeat<t-Ye),this.entries.push({startBeat:t,chord:null})}cut(t){this.entries=this.entries.filter(n=>n.startBeat<t-Ye)}points(t=Number.NEGATIVE_INFINITY){let n=0;for(let a=0;a<this.entries.length;a++)this.entries[a].startBeat<=t+Ye&&(n=a);return this.entries.slice(n).map(a=>({beat:a.startBeat,root:a.chord?a.chord.root:null}))}chordAt(t){let n=null;for(const r of this.entries){if(r.startBeat>t+Ye)break;n=r}if(!n?.chord)return null;const a=n.chord;return{...a,notes:[...a.notes],sounding:t<a.startBeat+a.lengthBeats-Ye}}pitchAt(t,{octave:n}={}){const a=this.chordAt(t);return a?n===void 0?a.root:yg(a.root,n):null}prune(t){let n=0;for(let a=0;a<this.entries.length;a++)this.entries[a].startBeat<=t+Ye&&(n=a);n>0&&this.entries.splice(0,n)}get size(){return this.entries.length}insert(t){let n=this.entries.length;for(;n>0&&this.entries[n-1].startBeat>t.startBeat+Ye;)n--;this.entries.splice(n,0,t)}}const Le=1,ka=1024,wg=48,Xc=128,eo=40,Ms=64,Ls=8,Ts=16,Cs=1024,Ho=16,Vc=36,Wo=255,vg=["chord","root","top"],xg=["chord","root","top","arp","note"],kg=e=>Vc+e-1;function $g(e){const t=e-Vc+1;return Number.isInteger(t)&&t>=1&&t<=Ho?t:null}const Yn=256,Ns=2,Fs=128;function Ag(e){const t=e.split("|");if(t.length<5)return null;const n=Number(t[t.length-4]);return Number.isInteger(n)?n:null}const Tn=e=>typeof e=="object"&&e!==null,he=e=>typeof e=="string"&&e.length>0&&e.length<=Xc,se=e=>typeof e=="number"&&Number.isFinite(e);function zs(e){return Tn(e)?he(e.id)?he(e.source)?!Number.isInteger(e.note)||e.note<0||e.note>127?"note must be a whole number 0–127":!se(e.velocity)||e.velocity<0||e.velocity>1?"velocity must be 0–1":se(e.startBeat)?!se(e.lengthBeats)||e.lengthBeats<0?"bad lengthBeats":!se(e.spanBeats)||e.spanBeats<=0?"bad spanBeats":!se(e.gate)||e.gate<=0||e.gate>1?"gate must be above 0, at most 1":!se(e.offsetSec)||Math.abs(e.offsetSec)>2?"bad offsetSec":typeof e.role!="string"||!xg.includes(e.role)?"bad role":Number.isInteger(e.hit)?!Number.isInteger(e.root)||e.root<0||e.root>127?"bad root":e.slice!==void 0&&!Qc(e.slice)?`slice must be a whole number 0–${Wo}`:null:"bad hit":"bad startBeat":"bad source":"bad id":"not an object"}const Qc=e=>Number.isInteger(e)&&e>=0&&e<=Wo,Eg=e=>Number.isInteger(e)&&e>=1&&e<=Ho;function Jc(e){return Tn(e)?he(e.id)?se(e.beat)?e.type==="slot"?!Number.isInteger(e.slot)||e.slot<1||e.slot>Ts?`slot must be a whole number 1–${Ts}`:null:e.type==="chordPad"?e.pad!==null&&!Eg(e.pad)?`pad must be a whole number 1–${Ho}, or null`:null:e.type==="take"?he(e.take)?!se(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>Yn?`lengthBeats must be above 0, at most ${Yn}`:e.gain!==void 0&&(!se(e.gain)||e.gain<0||e.gain>Ns)?`gain must be 0–${Ns}`:e.offsetBeats!==void 0&&(!se(e.offsetBeats)||e.offsetBeats<0||e.offsetBeats>=e.lengthBeats)?"offsetBeats must be from 0, below lengthBeats":e.peaks!==void 0&&!(Array.isArray(e.peaks)&&e.peaks.length<=Fs&&e.peaks.every(t=>se(t)&&t>=0&&t<=1))?`peaks must be at most ${Fs} values 0–1`:null:"bad take":e.type==="lap"?!se(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>Yn?`lengthBeats must be above 0, at most ${Yn}`:null:"bad type":"bad beat":"bad id":"not an object"}function Sg(e){if(!Tn(e))return"not an object";if(e.type!=="note")return Jc(e);if(!he(e.id))return"bad id";if(!se(e.beat))return"bad beat";if(typeof e.on!="boolean")return"on must be true or false";if(!Number.isInteger(e.note)||e.note<0||e.note>127)return"note must be a whole number 0–127";if(e.on){if(!se(e.velocity)||e.velocity<=0||e.velocity>1)return"velocity must be above 0, at most 1";if(e.slice!==void 0&&!Qc(e.slice))return`slice must be a whole number 0–${Wo}`;if(e.name!==void 0&&(typeof e.name!="string"||!e.name.length||e.name.length>eo))return`name must be 1–${eo} characters`}else if(e.velocity!==void 0||e.slice!==void 0||e.name!==void 0)return"an off has no velocity, slice or name";return null}function Ps(e,t){if(!Array.isArray(e))return"events must be a list";if(e.length>ka)return`more than ${ka} events`;for(let n=0;n<e.length;n++){const a=t(e[n]);if(a)return`event ${n}: ${a}`}return null}function Mg(e){if(!Tn(e))return"not an object";if(e.v!==Le)return`version ${String(e.v)} is not ${Le}`;if(e.kind==="notes"){if(!he(e.source))return"bad source";if(!Array.isArray(e.events))return"events must be a list";if(e.events.length>ka)return`more than ${ka} events`;for(let t=0;t<e.events.length;t++){const n=zs(e.events[t]);if(n)return`event ${t}: ${n}`;if(e.events[t].source!==e.source)return`event ${t}: from another source`}return null}if(e.kind==="audition"){if(!he(e.source))return"bad source";if(!Array.isArray(e.events))return"events must be a list";if(e.events.length>Ms)return`more than ${Ms} notes`;if(!se(e.holdSec)||e.holdSec<=0||e.holdSec>Ls)return`holdSec must be above 0, at most ${Ls}`;for(let t=0;t<e.events.length;t++){const n=zs(e.events[t]);if(n)return`event ${t}: ${n}`;if(e.events[t].source!==e.source)return`event ${t}: from another source`}return null}if(e.kind==="played")return he(e.source)?Ps(e.events,Sg):"bad source";if(e.kind==="controls")return he(e.source)?Ps(e.events,Jc):"bad source";if(e.kind==="off")return he(e.source)?["stop","removed","off","restart"].includes(e.reason)?e.atBeat!==void 0&&!se(e.atBeat)?"bad atBeat":null:"bad reason":"bad source";if(e.kind==="release"){if(!he(e.source))return"bad source";if(!Array.isArray(e.ids))return"ids must be a list";if(e.ids.length>Cs)return`more than ${Cs} ids`;for(let t=0;t<e.ids.length;t++)if(!he(e.ids[t]))return`id ${t}: bad id`;return null}if(e.kind==="routes"){if(!Array.isArray(e.routes)||e.routes.length>64)return"routes must be a list (at most 64)";for(const t of e.routes){if(!Tn(t)||!he(t.source)||typeof t.name!="string"||t.name.length>Xc)return"bad route";if(!vg.includes(t.role))return"bad route role";if(t.octave!==void 0&&!(Number.isInteger(t.octave)&&t.octave>=-1&&t.octave<=9))return"bad route octave";if(t.transpose!==void 0&&!(Number.isInteger(t.transpose)&&Math.abs(t.transpose)<=wg))return"bad route transpose";if(t.layer!==void 0&&typeof t.layer!="boolean")return"bad route layer"}return null}return"unknown kind"}const Bs=e=>({id:e.id,source:e.source,note:e.note,velocity:e.velocity,startBeat:e.startBeat,lengthBeats:e.lengthBeats,role:e.role,offsetSec:e.offsetSec,spanBeats:e.spanBeats,gate:e.gate,hit:e.hit,root:e.root,...e.slice===void 0?{}:{slice:e.slice}}),Zc=e=>e.type==="slot"?{type:"slot",id:e.id,beat:e.beat,slot:e.slot}:e.type==="take"?{type:"take",id:e.id,beat:e.beat,take:e.take,lengthBeats:e.lengthBeats,...e.gain===void 0?{}:{gain:e.gain},...e.offsetBeats===void 0?{}:{offsetBeats:e.offsetBeats},...e.peaks===void 0?{}:{peaks:[...e.peaks]}}:e.type==="lap"?{type:"lap",id:e.id,beat:e.beat,lengthBeats:e.lengthBeats}:{type:"chordPad",id:e.id,beat:e.beat,pad:e.pad},Lg=e=>e.type!=="note"?Zc(e):{type:"note",id:e.id,beat:e.beat,on:e.on,note:e.note,...e.on?{velocity:e.velocity}:{},...e.on&&e.slice!==void 0?{slice:e.slice}:{},...e.on&&e.name!==void 0?{name:e.name}:{}};function ed(e){if(Mg(e))return null;const t=e;return t.kind==="notes"?{v:Le,kind:"notes",source:t.source,events:t.events.map(Bs)}:t.kind==="audition"?{v:Le,kind:"audition",source:t.source,events:t.events.map(Bs),holdSec:t.holdSec}:t.kind==="played"?{v:Le,kind:"played",source:t.source,events:t.events.map(Lg)}:t.kind==="controls"?{v:Le,kind:"controls",source:t.source,events:t.events.map(Zc)}:t.kind==="off"?{v:Le,kind:"off",source:t.source,reason:t.reason,...t.atBeat===void 0?{}:{atBeat:t.atBeat}}:t.kind==="release"?{v:Le,kind:"release",source:t.source,ids:[...t.ids]}:{v:Le,kind:"routes",routes:t.routes.map(n=>({source:n.source,name:n.name,role:n.role,...n.octave===void 0?{}:{octave:n.octave},...n.transpose===void 0?{}:{transpose:n.transpose},...n.layer===void 0?{}:{layer:n.layer}}))}}const Tg=e=>({v:Le,kind:"routes",routes:e});class Cg{track=new pr;run=null;current=[];serial=0;stats={accepted:0,ignored:0,invalid:0};get routes(){return this.current}get route(){return this.current[0]??null}get active(){return this.current.length>0}get version(){return this.serial}receive(t){const n=ed(t);if(!n)return this.stats.invalid++,null;if(n.kind==="routes"){const o=this.route?.source??null;return this.current=n.routes,(this.route?.source??null)!==o&&this.reset(),n}const a=this.route?.source;if(n.source!==a)return this.stats.ignored++,n;if(n.kind==="off")return n.reason==="stop"&&n.atBeat===void 0||(n.reason==="restart"&&n.atBeat!==void 0?this.track.cut(n.atBeat):n.atBeat!==void 0?this.track.off(n.atBeat):this.track.off(),this.serial++),n;if(n.kind==="played"||n.kind==="controls"||n.kind==="release")return this.stats.ignored++,n;let r=!1;for(const o of n.events){const s=Ag(o.id);if(s!==null&&this.run!==null&&s<this.run){this.stats.ignored++;continue}s!==null&&(this.run===null||s>this.run)&&(this.track=new pr,this.run=s),this.track.add([o]),this.stats.accepted++,r=!0}return r&&this.serial++,n}rootAt(t){return this.active?this.track.chordAt(t)?.root??null:null}points(t=Number.NEGATIVE_INFINITY){return this.active?this.track.points(t):[]}prune(t){this.track.prune(t)}reset(){this.track=new pr,this.run=null,this.serial++}}const Ng=e=>e.offsetDb?10**(e.offsetDb/20):1,Fg=.25;function Uo(e){return e.slices?e.cuts.length===e.slices-1?[0,...e.cuts,1]:Array.from({length:e.slices+1},(t,n)=>n/e.slices):[0,1]}function td(e,t,n){const a=e.start*t.frames,r=e.end*t.frames;if(n===null||!e.slices)return[Math.floor(a),Math.ceil(r)];const o=Uo(e),s=Math.min(n,o.length-2);return[Math.floor(a+o[s]*(r-a)),Math.ceil(a+o[s+1]*(r-a))]}function zg(e,t,n,a=0){let o=2**((e.tune+e.fine/100+a)/12);if(e.fit){const s=(e.end-e.start)*t.frames/t.sampleRate,l=e.fit*4*(60/n);s>0&&l>0&&(o*=s/l)}return o}function nd(e,t,n){return Math.max(1,Math.round(e*4*60/Math.max(1,t)*n))}function Go(e,t,n){if(!e.fit)return 1;const a=(e.end-e.start)*t.frames/t.sampleRate;return a>0?a/(e.fit*4*(60/Math.max(1,n))):1}const Qt=[.75,1.5];function Pg(e,t,n){if(n===null||!e.slices)return[0,t];const a=Uo(e),r=Math.min(n,a.length-2);return[Math.floor((a[r]??0)*t),Math.ceil((a[r+1]??1)*t)]}const Bg=1.5;function Ia(e,t,n,a,r,o=!1,s){if(!n.on||!e.sample||!a)return null;const l=n.slice??(e.slices?t%e.slices:null),c=m=>s?Pg(e,s.frames,m):td(e,a,m);let[d,u]=c(l);const p=n.reverse?e.dir==="rev"?"fwd":"rev":e.dir;if(e.mode==="oneshot"&&l!==null&&e.slices&&!o){const[m,g]=c(null);p==="fwd"?u=g:p==="rev"&&(d=m)}const h=s?2**(n.pitch/12)*(s.frames/nd(e.fit,r,a.sampleRate)):zg(e,a,r,n.pitch);return{sample:s?s.sample:e.sample,from:d,to:u,rate:h,gain:Math.min(1.5,n.velocity*(n.accent?Bg:1))*e.level*Zm(e)*Ng(e),pan:e.pan,mode:e.mode,dir:p,attack:e.attack,decay:e.decay,cutoff:e.cutoff,resonance:e.resonance,choke:e.choke,chance:n.chance,cond:n.cond,fit:e.fit>0,...!o&&Sn(e)?{follow:e.note}:{}}}function ad(e,t,n,a=null,r){return Ia(e,0,{on:!0,accent:!1,velocity:.8,chance:1,slice:a,pitch:0,reverse:!1,cond:"always"},t,n,!0,r)}function Dg(e,t,n,a,r=null,o){return Ia(e,0,{on:!0,accent:!1,velocity:Math.min(1,Math.max(0,a)),chance:1,slice:r,pitch:0,reverse:!1,cond:"always"},t,n,!0,o)}function Og(e,t,n,a=()=>{}){const r=e.lanes.some(o=>o.solo);return{swing:e.swing,lanes:e.lanes.map((o,s)=>{const l=e.pads[s],c=l?.sample?t(l.sample):void 0,d=l?a(s):void 0;return{length:o.length,audible:r?o.solo:!o.mute,steps:o.steps.map((u,p)=>l?Ia(l,p,u,c,n,!1,d):null)}})}}const Yo=4,qg=.03,Ig=new Set(["oneshot","oneshots","shot","shots","hit","hits","stab","stabs","single"]),Rg=new Set(["loop","loops","break","breaks","breakbeat","groove","grooves","beat","riff"]);function rd(e){return e.replace(/^.*[\\/]/,"").replace(/\.[a-z0-9]{2,4}$/i,"").split(/[\s_\-.()[\],+&]+/).filter(Boolean)}function od(e){const t=rd(e);for(let n=0;n<t.length;n++){const a=t[n]??"",r=/^(\d{2,3})bpm$/i.exec(a)??/^bpm(\d{2,3})$/i.exec(a);if(r&&ga(Number(r[1])))return Number(r[1]);if(/^\d{2,3}$/.test(a)&&/^bpm$/i.test(t[n+1]??"")&&ga(Number(a)))return Number(a)}for(const n of t)if(/^[1-9]\d{1,2}$/.test(n)&&Number(n)>=50&&Number(n)<=200)return Number(n);return 0}function Ko(e){const t=rd(e).map(r=>r.toLowerCase());if(t.some((r,o)=>Ig.has(r)||r==="one"&&/^shots?$/.test(t[o+1]??"")))return{kind:"one-shot",bpm:0};const a=od(e);return a?{kind:"loop",bpm:a}:{kind:t.some(r=>Rg.has(r))?"loop":"",bpm:0}}function id(e,t,n=Yo,a=Wc){if(!(e>0)||!ga(t)||!(n>0))return 0;const r=e*t/60/n,o=Math.round(r);return o<1||Math.abs(r-o)>qg*o?0:a.includes(o)?o:0}function _g(e,t,n,a=Yo){if(t.kind!=="loop")return null;const r=id(e,t.bpm,a);if(!r)return null;const o=e/(r*a*(60/Math.max(1,n))),s=Number(o.toFixed(2));return{bars:r,bpm:t.bpm,speed:o,far:s<Qt[0]||s>Qt[1]}}function jg(e){const t=Number.isInteger(e.bpm)?String(e.bpm):e.bpm.toFixed(1);return`Fitted: ${e.bars} bar${e.bars===1?"":"s"}, ${t} BPM`}function Ds(e){return e.far?`×${e.speed.toFixed(2)} may smear`:""}const sd="nyx.autofit.v1",ld=()=>{try{return globalThis.localStorage??null}catch{return null}};function Hg(e=ld()){try{return e?.getItem(sd)!=="off"}catch{return!0}}function Wg(e,t=ld()){try{t?.setItem(sd,e?"on":"off")}catch{}}function cd(e,t){return!!(e&&t.sample===e.sample&&t.fit===e.fit.bars)}function Ug(e,t){t.fit=e.before.fit,t.keepPitch=e.before.keepPitch}const Os={"page:title":"NYX, the NetComposer sampler. The number is which copy of NYX this is.","page:master":"The volume of everything NYX plays, after the Hacks.","page:save":"Downloads the pattern as a file: pads, steps, Hacks and the ten slots. The samples stay in this browser.","page:load":"Opens a saved pattern file (with its slots, if it has them), or puts an audio file onto the selected pad.","page:panic":"Silences every voice and effect tail at once. NYX then sits out until you press Play.","module:transport":"Play and stop NYX, set the tempo and swing, and keep up to ten saved versions of the whole kit and pattern. Folded, the header's play icon does the same as Play.","module:pattern":"The 16-step grid, one lane per pad: a step that is on plays that lane's pad. The pads under the grid are the sounds.","module:params":"Everything about the selected pad: which part of the sample plays, its pitch, shape, filter and level. A selected step's locks show here too.","module:hacks":"Effects on everything NYX plays, in order: Filter, then Drive, then Compressor. They are saved with the pattern and its slots.","section:pads":"The 16 sounds: Q W E R A S D F play 1–8, Shift 9–16. Tap to play, double-click a name to rename; long-press or right-click to load or clear; drag to swap.",play:"Starts and stops NYX, including the play icon on the folded Transport header. In the Studio, Stop sits NYX out while the others play on, and Play brings it back on the next bar.","perform-label":"Effects you play live: hold a button down and NYX's sound changes until you let go. Nothing is saved.",perform:"Hold one of these down to change NYX's sound until you let go.",tempo:"Beats per minute: how fast the pattern plays. In the Studio every instrument shares this clock.",swing:"Pushes every second sixteenth note later for a looser, shuffled feel. 50% is straight.",status:"What NYX is doing now: stopped, playing, sitting out, or waiting to join on the next bar.","kit:slot":"A memory for the whole kit and pattern. Tap to recall it; Shift-click or long-press to store here, Option-click to clear.","kit:note":"Step tool: a tap on a step turns it on or off.","kit:accent":"Step tool: a tap on a step makes it an accent, played louder. Shift-click accents a step with either tool.","kit:fill":"Hold for a fill: steps set to play Only in Fill come in and Not in Fill steps drop out, until you let go.","kit:clear":"Turns every step off and resets lane lengths, mutes, solos and step locks; the pads keep their sounds. Undo brings it back.","kit:mute":"Mute: silences this lane. Its steps stay as they are.","kit:solo":"Solo: hear only the soloed lanes. Solo several to hear them together.","kit:length":"Drag to set how many steps this lane plays before it starts over. Lanes of different lengths drift against each other.","kit:lane-length":"Tap to set this lane's length, then tap the step it should end on.","kit:pad-key":"The key that plays this pad: lower case (q to f) is the key alone, upper case (Q to F) is Shift with it. A Gate pad holds while its key is down.","kit:pad-playing":"Playing: tap this pad, or press its key, to stop it. A sound under a second plays again instead, so drums stay playable.","kit:choke-badge":"Choke group: pads showing the same letter cut each other off, like an open and a closed hi-hat. Set it under Choke.",wave:"The selected pad's sample: the part between Start and End is what plays, lines mark the slices, and a cursor follows playback.",sample:"How much of the sample plays (between Start and End) out of its full length, and whether it is mono or stereo.",mode:"How the pad plays when hit: right through (One-shot), only as long as its step (Gate), or round and round (Loop).",dir:"Which way the pad plays through its sample: forwards, backwards, or forwards then back.",start:"Where the pad starts playing in the sample. Move it right to skip the beginning.",end:"Where the pad stops playing in the sample. Move it left to cut off the tail.",slices:"Cuts the played part into 2 to 16 pieces; each step plays the next piece in turn. Off plays the whole part every time.",chop:"Where the slices are cut: at equal spacing, or where the hits in the sound start.","chop-to-pads":"Cuts this pad's sound into up to 16 slices, one per pad, to play by hand or rearrange in the pattern.","chop:wave":"The slices and the pad each lands on. Tap a slice to hear it.","chop:close":"Closes Chop to pads without changing any pad.","chop:mode":"How the sound is cut: where its hits start, into equal parts, or on the beat.","chop:mode:transients":"Cuts where each hit starts, so a slice is one hit (a drum, a note, a word).","chop:mode:even":"Cuts into equal parts: 16, 8 or 4.","chop:mode:beats":"Cuts on the beat at the sound's tempo: every beat, eighth or sixteenth.","chop:sensitivity":"Higher finds quieter hits; lower keeps only the strongest.","chop:count":"The most slices to make (Even: exactly this many). Never more than the pads left from Fill from.","chop:every":"Beats: a slice every beat, eighth or sixteenth at the sound's tempo. Choices past 16 slices are off.","chop:first":"The pad the first slice goes on; the rest follow, up to pad 16.","chop:play-back":"Writes steps that play the slices in order, so the pattern sounds like the original. On when the tempo is known.","chop:more":"The tempo used, Choke and Snap to hits.","chop:tempo":"The sound's tempo: from its Fit, its name, a take, or the Studio's when the length fits; else a guess.","chop:choke":"On, the slices cut each other: a new slice stops the last one.","chop:snap":"Even and Beats: moves each cut to a hit that starts within 20 ms, so an early hit isn't split.","chop:go":"Puts the slices on the pads. Pads with sounds are replaced; Undo puts them back.","library:chop":"Loads this loop onto the selected pad and opens Chop to pads on it.","tune-shape":"Pitch, speed and shape of the selected pad. Closed, it lists what differs from a new pad; NYX remembers in this browser whether it's open.","transport-more":"On a phone, Swing folds away; the line shows it. Tap to show or hide it.","pad-more":"On a phone, the pad's pan, choke group and Clear pad fold away; the line shows pan and choke. Tap to show or hide them.","hacks-more":"On a phone, Drive and Compressor fold away under the Filter; the line says which are on. Tap to show them.","kit:group-toggle":"Opens or closes this section.","pitch-label":"How high or low the pad plays. Pitch changes speed too, like a record, unless Fit's Keep pitch is on.",tune:"Pitch in semitones, up to two octaves either way. Higher also plays faster, unless the pad is fitted with Keep pitch on.",fine:"Fine pitch in cents (hundredths of a semitone), for small corrections.",fit:"Makes the pad last exactly this many bars at the current tempo, and keeps it in time when the tempo changes. Off plays it as recorded.","keep-pitch":"On, Fit stretches the pad to its bars without changing its pitch, and Tune moves the pitch only. Off, it speeds up or slows down like a record.","fit-speed":"How fast the pad plays to fit its bars: ×1 is as recorded. With Keep pitch, stretching far past ×0.75 to ×1.5 may smear the sound.","auto-fit":"On, a loop that arrives with its tempo (picker, My samples, or a name like Loop_100_Am) is fitted to its bars with Keep pitch. One-shots never are.","auto-fit-note":"This loop came with its tempo, so NYX set Fit to its bars with Keep pitch on. It plays in time at any tempo.","auto-fit-far":"Keep pitch is stretching this loop past ×0.75 to ×1.5, where it may smear. Fit it to other bars, or turn Keep pitch off.","auto-fit-undo":"Turns this pad's automatic Fit off again: the loop plays as recorded. The sound stays.","shape-label":"How each hit's volume moves over time: how it fades in and how it dies away.",attack:"How long each hit takes to fade in. Zero is instant; more softens the start.",decay:"How quickly each hit fades away (in Gate, once its step ends). All the way up is Hold: no fade.",cutoff:"Left of centre cuts the highs (darker), right of centre cuts the lows (thinner). Centre leaves the pad open.",resonance:"Boosts the sound right at the filter's edge for a sharper, ringing tone. It does nothing while the filter is open.","out-label":"Where the pad sits in the mix: how loud, how far left or right, and which pads cut it off.",level:"How loud this pad plays.",normalize:"On, the pad plays at the Library's level, so a quiet file fits the kit; Level still sets how loud. Off, it plays as recorded.","normalize-label":"Plays the pad at the Library's level, so a quiet file fits the kit. Grabs and Takes are at mix level already.","normalize-gain":"What Normalize adds to this pad: the gain that brings your audio to the Library's level, never a peak past −1 dBFS.",pan:"Places the pad left or right in the stereo picture. C is the centre.",choke:"Pads in the same group cut each other off when one plays, like open and closed hi-hats. None lets it ring over the others.","clear-pad":"Removes this pad's sample and settings. Its steps in the grid stay.","lock-label":"Locks for this one step: settings here change only this step, not the whole pad. Long-press another step to edit it.","lock-velocity":"How loud this step plays, before any accent.","lock-chance":"The odds this step plays each time round. At 100% it always plays; lower leaves it out at random.","lock-slice":"Which slice this step plays. In order plays the slice that matches the step's place, so a chopped beat plays back as it was.","lock-pitch":"Moves this step up or down in semitones, on top of the pad's own Tune.","lock-cond":"When this step plays: always, only on some passes through the lane, only with Fill held or not, or only if the lane's last conditional step did or didn't.","lock-reverse":"Whether this step plays the pad's own way or the other way round.","lock-done":"Closes this step's locks and goes back to the pad's settings.","notes-label":"CALLIOPE plays this NYX: your pattern keeps its hits, and pads that follow take its chord's root.","pad-follow":"On: this pad's hits play at the root of CALLIOPE's chord. Off: its own pitch, as drums want.","pad-note":"The note this sample plays at as recorded. NYX tunes from it to CALLIOPE's root, never more than six semitones away.","notes-open":"Shows CALLIOPE, the Studio's note generator that tunes this NYX's pads now.","notes-mine":"Take the pitch back: CALLIOPE stops playing this NYX, and every pad plays its own pitch again.","grab-label":"Brings sound from the Studio onto the selected pad: Grab the bars that just played, or Take a performance as it happens.","grab-from":"Which Studio sound to grab or take from: the master mix or one instrument's channel.","grab-bars":"How many bars Grab takes. One bar is cut into 16 slices with every step on; longer grabs are sliced at the hits.",grab:"Copies the bars that just played onto the selected pad, cut on the bar lines (the music must be playing). It asks before replacing a pad that has a sound.","grab-undo":"Puts back what this Grab, Take, sent take, Library Load or Build kit replaced: old sounds, slices and steps. Cmd/Ctrl+Z does the same.",library:"Opens the Library: openly licensed sounds checked by a person, found by plain words. Load fills the selected pad; Build kit fills pads 1–8.",credit:"Who made this pad's sound, and its licence. Library › Credits has the full credit with links, and saved patterns keep it.","library:ask":"Plain words: a role (kick, snare, hat, clap, tom, perc, cymbal, fx) and a sound (punchy, tight, dark, bright, long, soft). Add kit for a whole kit.","library:close":"Closes the Library. Esc in the field does the same.","library:play":"Plays this sound through NYX's output, at the level it will have on a pad. Press again to stop.","library:load":"Puts this sound on the selected pad, named after it and with its credit; the steps stay. Undo brings the old sound back.","library:kit":"Fills pads 1–8 with a kit for your words (kick, snare, clap, hats, tom, perc, fx); the pattern stays and the hats cut each other. One Undo puts all eight back.","library:credits":"Every Library sound on the pads: who made it, its licence and its source. Saved patterns, slots and Studio Scenes keep these credits.","library:badge":"The licence. CC0 needs no credit (NYX credits it anyway); BY needs credit, and BY-SA credit plus the same licence on what you make.","library:wave":"The sound's shape, start to end: a tall start is a sharp hit, a long tail rings on.","library:source-shelf":"The curated shelf on musicmatter.art: openly licensed sounds, each checked by a person.","library:source-local":"My samples: your local Library, the folder the sample picker exported. Its sounds play in this browser and are never uploaded.","library:source-all":"Searches musicmatter.art and My samples (your local Library) together.","library:open-folder":"Opens a local Library folder (the sample picker's export) from this computer. NYX only reads it; nothing is uploaded.","library:reconnect":"Your local Library folder, remembered from last time: the browser asks once more before NYX can read it.","library:forget":"Closes your local Library and forgets the folder. The files stay where they are; pads keep their sounds.",take:"Records the chosen source onto the selected pad in whole bars until you press again (up to four minutes); takes of up to 8 bars loop. It asks first if the pad has a sound.","hack-filter":"A filter on all of NYX, to darken it, thin it or narrow it down. The switch turns it on.","filter-mode":"Which part the filter keeps: the lows (low pass), the highs (high pass) or a band in the middle (band pass).","filter-cutoff":"Where the filter cuts. In low pass, all the way up is open: no filtering.","filter-resonance":"Boosts the sound around the cutoff for a sharper, more nasal tone.","filter-curve":"A picture of the filter: how loud each pitch range comes out, lows on the left, highs on the right.","hack-meter":"The level going into this Hack (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. Off, it still shows the input, greyed.","hack-drive":"Distortion on all of NYX, from warm to gritty. The switch turns it on.","hack-drive-drive_db":"How hard the sound is pushed into distortion. 0 dB is clean.","hack-drive-output_db":"The level after the drive, to balance out the louder distorted sound.","hack-drive-mix":"How much of the driven sound is mixed with the clean one. 100% is all drive.","hack-drive-curve":"The kind of distortion: Smooth is warm and round, Acid is harder and buzzier.","hack-drive-tone":"Darkens the driven sound by cutting its highs. All the way up leaves it bright.","hack-compressor":"Evens out NYX's level: loud hits are turned down, so the whole sounds tighter and punchier. The switch turns it on.","hack-compressor-threshold_db":"The level above which the compressor starts turning the sound down. Lower catches more.","hack-compressor-ratio":"How strongly sound above the threshold is turned down. Higher is a firmer squeeze.","hack-compressor-attack_ms":"How fast the compressor reacts to a loud hit. Slower lets the start of each hit punch through.","hack-compressor-release_ms":"How fast the compressor lets go once the sound drops back below the threshold.","hack-compressor-makeup_db":"Turns the whole sound back up after compressing, to make up for the lost level.","kit:more":"More settings for this effect."},Gg={perform:{repeat16:"While held, repeats the last sixteenth note over and over, like a stutter.",repeat8:"While held, repeats the last eighth note over and over.",reverse:"While held, plays what NYX just played backwards.",half:"While held, plays on at half speed, an octave lower.",stop:"While held, slows to a halt like a tape machine switched off."},mode:{oneshot:"One-shot: plays on from the hit until it ends or the lane's next hit cuts it. Good for drums.",gate:"Gate: plays only as long as its step (or its key is held), then fades by Decay. Good for chopping long sounds.",loop:"Loop: plays round and round until the pad plays again or the music stops."},dir:{fwd:"Plays the sample the normal way, start to end.",rev:"Plays the sample backwards, end to start.",pingpong:"Plays forwards, then back again. In Loop it keeps bouncing."},normalize:{on:"Normalize on: the pad plays at the Library's level.",off:"Normalize off: the pad plays as recorded."},"keep-pitch":{on:"Keep pitch: the pad is stretched to its bars and stays at its pitch, whatever the tempo. Tune moves the pitch only.",off:"Varispeed: the pad speeds up or slows down to fit its bars, and its pitch moves with it, like a record."},"auto-fit":{on:"Auto-fit on: loops with a known tempo land fitted to their bars, Keep pitch on.",off:"Auto-fit off: loops land as recorded; set Fit yourself."},chop:{even:"Cuts the slices at equal spacing.",transients:"Cuts the slices where the hits in the sound start, so each slice is one hit."},"lock-reverse":{pad:"This step plays in the pad's own direction.",rev:"This step plays the other way round from the pad."}};function O(e){return Object.hasOwn(Os,e)?Os[e]:void 0}function Yg(e,t){const n=Gg[e];return(n&&Object.hasOwn(n,t)?n[t]:void 0)??O(e)}const xn="nyx-help-text",qs=new Map;function Kg(e,t){const n=qs.get(t);if(n&&e.getElementById(n))return n;let a=e.getElementById(xn);a||(a=e.createElement("div"),a.id=xn,a.hidden=!0,e.body.append(a));const r=e.createElement("span");return r.id=`${xn}-${a.children.length+1}`,r.textContent=t,a.append(r),qs.set(t,r.id),r.id}function R(e,t,n){if(!e||!t||(e.getAttribute("data-nc-help")!==t&&e.setAttribute("data-nc-help",t),e.hasAttribute("title")&&e.removeAttribute("title"),!n))return;const a=Kg(n.ownerDocument,t),r=(n.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);if(r.includes(a))return;const o=[...r.filter(s=>!s.startsWith(`${xn}-`)),a];n.setAttribute("aria-describedby",o.join(" "))}function Xg(e,t=e){if(e?.removeAttribute("data-nc-help"),!t)return;const n=(t.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean),a=n.filter(r=>!r.startsWith(`${xn}-`));a.length!==n.length&&(a.length?t.setAttribute("aria-describedby",a.join(" ")):t.removeAttribute("aria-describedby"))}function Vg(e){const t=O(e);return t?{"data-nc-help":t}:{}}const Qg=[['.nc-seg [role="radio"]:not([data-nc-accent-mode])',"kit:note"],['.nc-seg [role="radio"][data-nc-accent-mode]',"kit:accent"],["[data-nc-fill]:not([data-nc-clear])","kit:fill"],["[data-nc-clear]","kit:clear"],['.nc-ms[data-nc-ms="mute"]',"kit:mute"],['.nc-ms[data-nc-ms="solo"]',"kit:solo"],[".nc-len-handle","kit:length"],["[data-nc-len-toggle]","kit:lane-length"],["[data-nc-pads-play]","play"],[".nc-snap","kit:slot"]];function Xo(e){for(const t of e.querySelectorAll(".nc-module[data-nc-module]"))R(t.querySelector(".nc-module-hd .nc-title"),O(`module:${t.dataset.ncModule}`));for(const t of e.querySelectorAll("[data-nc-section]"))R(t.querySelector(":scope > .nc-ui-fx-name, :scope > .nc-panel-hd > .nc-panel-title"),O(`section:${t.dataset.ncSection}`));for(const t of e.querySelectorAll("[data-nc-id]")){const n=t.dataset.ncId??"";if(!t.matches("input, select, canvas"))if(t.classList.contains("nc-field")){const a=t.querySelector(":scope > input, :scope > select, :scope > canvas");R(t.querySelector(":scope > .nc-label"),O(n),a)}else if(t.classList.contains("nc-choice-row"))for(const a of t.querySelectorAll("[data-nc-choice]"))R(a,Yg(n,a.dataset.ncChoice??""),a);else t.classList.contains("nc-btn")?R(t,O(n),t):t.matches(".nc-label[data-nc-text]")?R(t,O(n)):t.classList.contains("nc-ui-fx")&&(R(t.querySelector(":scope > .nc-ui-fx-hd > .nc-ui-fx-name, :scope > .nc-ui-fx-name"),O(n),t.querySelector("[data-nc-fx-switch]")),R(t.querySelector(":scope > .nc-ui-more > summary"),O("kit:more")))}for(const[t,n]of Qg)for(const a of e.querySelectorAll(t)){const r=a.parentElement?.querySelector(":scope > .nc-hit")?a.parentElement:null;r&&a.removeAttribute("title"),R(r??a,O(n),a)}for(const t of e.querySelectorAll(".nc-group[data-nc-id]")){const n=t.querySelector(":scope > .nc-group-toggle");R(n?.querySelector(".nc-group-title")??null,O(t.dataset.ncId??""),n),R(n?.querySelector(".nc-group-mark")??null,O("kit:group-toggle"))}for(const t of e.querySelectorAll(".nc-padgrid-pad-badge"))t.textContent?R(t,O("kit:choke-badge")):t.removeAttribute("data-nc-help")}function Jg(e){return e.embedded&&e.running?e.sittingOut?{action:"rejoin"}:{action:"sit-out",outId:e.instanceId}:e.running?{action:"stop"}:{action:"start",claimId:e.embedded?e.instanceId:null}}function Vo(e){return e?"Stop":"Play"}const Is="http://www.w3.org/2000/svg";function Rs(e,t){const n=document.createElementNS(Is,"svg");n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nyx-fold-play-icon"),n.dataset.nyxIcon=e;const a=document.createElementNS(Is,"path");return a.setAttribute("fill","currentColor"),a.setAttribute("d",t),n.append(a),n}function Zg(e,t){const n=document.createElement("button");n.type="button",n.className="nyx-fold-play",n.dataset.nyxFoldPlay="",n.append(Rs("play","M4.5 2.8 12.8 8 4.5 13.2Z"),Rs("stop","M4.2 4.2h7.6v7.6H4.2Z")),t.description&&(R(n,t.description,n),n.removeAttribute("data-nc-help")),n.addEventListener("click",l=>{l.stopPropagation(),t.onPress()});const a=e.querySelector(".nc-module-end"),r=a?.querySelector(".nc-hide");a&&r?a.insertBefore(n,r):(e.querySelector(".nc-module-hd")??e).append(n);const o=()=>{const l=t.playing(),c=Vo(l);n.setAttribute("aria-label",c),n.title=c,n.setAttribute("aria-pressed",l?"true":"false"),n.dataset.on=l?"true":"false",n.querySelector('[data-nyx-icon="play"]')?.toggleAttribute("hidden",l),n.querySelector('[data-nyx-icon="stop"]')?.toggleAttribute("hidden",!l);const d=e.hasAttribute("data-nc-slim");n.hidden=!d,d?n.removeAttribute("aria-hidden"):n.setAttribute("aria-hidden","true")},s=new MutationObserver(()=>o());return s.observe(e,{attributes:!0,attributeFilter:["data-nc-slim"]}),o(),{button:n,sync:o,destroy(){s.disconnect(),n.remove()}}}const Ne=e=>`${Math.round(e*100)}%`,gt=e=>e<1?`${Math.round(e*1e3)} ms`:`${e.toFixed(2)} s`,to=e=>e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`,Cn=(e,t="")=>`${e>0?"+":""}${e}${t}`,eb=e=>`×${Number(e.toFixed(2))}`;function na(e){return Math.abs(e)<.001?"open":e<0?`LP ${to(2e4*(60/2e4)**-e)}`:`HP ${to(20*(8e3/20)**e)}`}const aa=e=>e>=3.99?"Hold":gt(e);function tb(e){const t=Ee(0),n=[];return e.tune!==t.tune&&n.push(Cn(e.tune," st")),e.fine!==t.fine&&n.push(Cn(e.fine," ct")),e.fit!==t.fit&&n.push(`fit ${e.fit} bar${e.fit===1?"":"s"}`),e.fit&&e.keepPitch!==t.keepPitch&&n.push("varispeed"),Math.abs(e.attack-t.attack)>=5e-4&&n.push(`attack ${gt(e.attack)}`),aa(e.decay)!==aa(t.decay)&&n.push(`decay ${aa(e.decay)}`),na(e.cutoff)!==na(t.cutoff)&&n.push(`filter ${na(e.cutoff)}`),Ne(e.resonance)!==Ne(t.resonance)&&n.push(`res ${Ne(e.resonance)}`),n.join(" · ")}function dd(e){const t=Math.max(0,Math.min(1,e));return Math.min(2e4,40*2**(t*10))}const Kn=e=>Math.max(0,Math.min(100,e));function Qo(e){const t=dd(e.cutoff),n=Kn(Math.max(0,Math.min(1,e.resonance))*100);return e.mode==="hp"?{type:"highpass",dials:{cutoff:t<=20?0:Kn(100*Math.log(t/20)/Math.log(100)),q:n}}:e.mode==="bp"?{type:"bandpass",dials:{centre_hz:Kn(100*Math.log(Math.max(100,t)/100)/Math.log(80)),q:n,mix:100}}:{type:"lowpass",dials:{cutoff:e.cutoff>=.999?0:Kn(100*Math.log(t/2e4)/Math.log(150/2e4))}}}function nb(e){const{type:t,dials:n}=Qo(e);if(t==="highpass"){const r=n.cutoff??0;return{hz:20*100**(r/100),q:Math.SQRT1_2*(8/Math.SQRT1_2)**((n.q??0)/100),open:r<=0}}if(t==="bandpass")return{hz:100*80**((n.centre_hz??0)/100),q:.4*20**((n.q??0)/100),open:!1};const a=n.cutoff??0;return{hz:2e4*(150/2e4)**(a/100),q:Math.SQRT1_2,open:a<=0}}const ud=e=>!e.on||e.mode==="lp"&&e.cutoff>=.999;function no(e){const t=Qo(e.filter);return{v:2,chain:[{id:`${t.type}-1`,type:t.type,bypass:ud(e.filter),dials:t.dials},{id:"drive-1",type:"drive",bypass:!e.drive.on,dials:{...e.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!e.compressor.on,dials:{...e.compressor.dials}}]}}function ab(e,t){if(!e||e.chain.length!==t.chain.length)return{whole:!0};if(e.chain.some((a,r)=>a.type!==t.chain[r]?.type))return{whole:!0};const n=[];return t.chain.forEach((a,r)=>{const o=e.chain[r];if(o){o.bypass!==a.bypass&&n.push([a.id,"bypass",a.bypass]);for(const[s,l]of Object.entries(a.dials))o.dials[s]!==l&&n.push([a.id,s,l])}}),{whole:!1,params:n}}const kn=["KeyQ","KeyW","KeyE","KeyR","KeyA","KeyS","KeyD","KeyF"],rb=Array.from({length:Q},(e,t)=>{const n=(kn[t%kn.length]??"").slice(3);return t<kn.length?n.toLowerCase():n.toUpperCase()});function pd(e){const t=kn.indexOf(e.code);if(t<0)return-1;const n=e.shiftKey?t+kn.length:t;return n<Q?n:-1}class ob{down=new Map;press(t){if(this.down.has(t.code))return-1;const n=pd(t);return n>=0&&this.down.set(t.code,n),n}release(t){const n=this.down.get(t.code);return n===void 0?-1:(this.down.delete(t.code),n)}releaseAll(){const t=[...this.down.values()];return this.down.clear(),t}}const ib="/nyx/assets/limiter-processor-BPr7zuRH.js",sb=.05,lb=50,cb=.8;function db(e){const t=e.outputLatency;if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t;const n=e.baseLatency;return typeof n=="number"&&Number.isFinite(n)&&n>0?n:0}function ub(e){const t=db(e.ctx),n=e.frameOrigin+e.eventMs,a=e.transport.beatAt(n/1e3-t);let r=null;try{const c=e.ctx.getOutputTimestamp?.();if(c&&Number.isFinite(c.contextTime)&&Number.isFinite(c.performanceTime)&&(c.contextTime??0)>0){const d=c.contextTime+(n-(e.ctxOrigin+c.performanceTime))/1e3;r=e.transport.beatAt(e.mapper.toSharedTime(d)-t)}}catch{r=null}if(r===null||!Number.isFinite(r))return{beat:a,wallBeat:a,audioBeat:r,fallback:!0};const o=n/1e3,s=Math.abs(e.transport.beatAt(o+1)-e.transport.beatAt(o))||1,l=Math.abs(r-a)/s>sb;return{beat:l?a:r,wallBeat:a,audioBeat:r,fallback:l}}function pb(e){const t=e.win.performance;let n=null;const a=p=>{n={stamp:p.timeStamp,seen:t.now()}},r=["keydown","keyup","pointerdown","pointerup","pointercancel","click"];for(const p of r)e.win.addEventListener(p,a,!0);const o=new Map;let s=0;const l={sent:0,fallbacks:0,skipped:0},c=()=>{const p=t.now(),h=n;return h&&p-h.seen<lb&&h.stamp<=p+1?h.stamp:p},d=p=>{const h=e.transport();if(!h.running){l.skipped++;return}const m=ub({eventMs:c(),frameOrigin:t.timeOrigin,ctxOrigin:e.ctxOrigin,ctx:e.ctx,mapper:e.mapper,transport:h});m.fallback&&l.fallbacks++;try{e.send({v:1,kind:"played",events:[{...p,beat:m.beat}]})&&l.sent++}catch{}},u=p=>{const h=o.get(p);h&&(o.delete(p),d({type:"note",id:h.id,on:!1,note:h.note}))};return{hit(p,h=null){if(!Number.isInteger(p)||p<0||p>15)return;o.has(p)&&u(p);const m=`p|${++s}`,g=kg(p+1);o.set(p,{id:m,note:g});let w;try{w=e.nameOf?.(p)?.trim().slice(0,eo)||void 0}catch{w=void 0}d({type:"note",id:m,on:!0,note:g,velocity:cb,...h==null?{}:{slice:h},...w?{name:w}:{}})},release:u,slot(p){!Number.isInteger(p)||p<0||p>9||d({type:"slot",id:`s|${++s}`,slot:p+1})},stats:l,dispose(){for(const p of r)e.win.removeEventListener(p,a,!0);o.clear()}}}function hb(e,t){const n=new Map,a={sent:0,duplicates:0,notPads:0,empty:0};return{notes(r,o){const s=[];for(const l of o){if(n.has(l.id)){a.duplicates++;continue}const c=$g(l.note);if(c===null){a.notPads++;continue}const d=t(c-1,l.slice??null,l.velocity);if(!d){a.empty++;continue}n.set(l.id,{beat:l.startBeat,source:r}),s.push({pad:c-1,hit:d,beat:l.startBeat,source:r,id:l.id})}s.length&&(a.sent+=s.length,e({type:"hits",hits:s}))},off(r,o){for(const[s,l]of n)l.source===r&&(o===void 0||l.beat>=o-1e-9)&&n.delete(s);e(o===void 0?{type:"unhits",source:r}:{type:"unhits",source:r,atBeat:o})},release(r,o){const s=o.filter(l=>l.startsWith(`${r}|`));s.length&&e({type:"unring",ids:s})},prune(r){for(const[o,s]of n)s.beat<r-16&&n.delete(o)},stats:a}}const fb=1,mb=3.99,gb=.25*Math.log(1e3);function bb(e,t){if(e.mode==="loop")return Number.POSITIVE_INFINITY;if(e.mode==="gate")return 0;const n=Math.abs(e.rate)*Math.max(1,t),a=e.dir==="pingpong"?2:1,r=Math.max(0,e.to-e.from)*a/Math.max(1e-6,n);return e.decay>=mb?r:Math.min(r,Math.max(.01,e.decay)*gb)}function yb(e,t){return bb(e,t)>=fb}const wb=1;class Jo{reported=new Set;pending=new Map;static SEEN_MS=40;report(t,n){const a=new Set;for(const r of t)(Number(r[4])||0)&wb&&a.add(Number(r[0]));this.reported=a;for(const[r,o]of this.pending)n-o>=Jo.SEEN_MS&&this.pending.delete(r)}posted(t,n,a){n?this.pending.set(t,a):(this.pending.delete(t),this.reported.delete(t))}stopped(t){this.pending.delete(t),this.reported.delete(t)}has(t){return this.reported.has(t)||this.pending.has(t)}pads(){return[...new Set([...this.reported,...this.pending.keys()])].sort((t,n)=>t-n)}}const vb="/nyx/assets/sampler-processor-CuoClmTs.js",xb=.001,kb=(e,t,n)=>{const a=new Float32Array(Math.max(0,n-t)),r=e.length||1;for(const o of e)for(let s=t;s<n;s++)a[s-t]+=(o[s]??0)/r;return a};function $b(e,t,n,a,r){const o=e.length;for(let s=0;s<o;s++){const l=r[s];if(l>s){const c=e[s];e[s]=e[l],e[l]=c;const d=t[s];t[s]=t[l],t[l]=d}}for(let s=2;s<=o;s<<=1){const l=s>>1,c=o/s;for(let d=0;d<o;d+=s)for(let u=0;u<l;u++){const p=n[u*c],h=a[u*c],m=d+u,g=m+l,w=e[g]*p+t[g]*h,f=t[g]*p-e[g]*h;e[g]=e[m]-w,t[g]=t[m]-f,e[m]+=w,t[m]+=f}}}function Ab(e,t){const n=t>64e3?2048:t>32e3?1024:512,a=n/4,r=Math.max(0,Math.floor((e.length-n)/a)+1),o=n/2,s=new Float32Array(n);for(let y=0;y<n;y++)s[y]=.5-.5*Math.cos(2*Math.PI*y/n);const l=new Float32Array(o),c=new Float32Array(o);for(let y=0;y<o;y++)l[y]=Math.cos(2*Math.PI*y/n),c[y]=Math.sin(2*Math.PI*y/n);const d=Math.log2(n),u=new Uint32Array(n);for(let y=0;y<n;y++){let v=0;for(let x=0;x<d;x++)v|=(y>>x&1)<<d-1-x;u[y]=v}const p=new Float32Array(n),h=new Float32Array(n);let m=new Float32Array(o),g=new Float32Array(o);const w=new Float32Array(r),f=4/n*1e3;let b=0;for(let y=0;y<r;y++){const v=y*a;for(let A=0;A<n;A++)p[A]=e[v+A]*s[A],h[A]=0;$b(p,h,l,c,u);for(let A=0;A<o;A++)g[A]=Math.log1p(f*Math.sqrt(p[A]*p[A]+h[A]*h[A]));let x=0;if(y>0)for(let A=1;A<o-1;A++){const $=Math.max(m[A-1],m[A],m[A+1]),k=g[A]-$;k>0&&(x+=k)}w[y]=x,x>b&&(b=x),[m,g]=[g,m]}if(b>0)for(let y=0;y<r;y++)w[y]/=b;return{flux:w,hop:a,size:n}}function Eb(e,t,n,a){const r=Math.max(8,Math.round(5e-4*t)),o=Math.max(0,n-Math.round(.01*t)),s=Math.min(e.length,a),l=[];for(let h=o;h<s;h+=r){let m=0;for(let g=Math.max(1,h);g<Math.min(s,h+r);g++)m=Math.max(m,Math.abs(e[g]-e[g-1]));l.push(m)}if(!l.length)return{at:n,contrast:0};let c=0;for(let h=1;h<l.length;h++)l[h]>l[c]&&(c=h);let d=l[c];for(let h=0;h<=c;h++)d=Math.min(d,l[h]);const u=d+.1*(l[c]-d);let p=c;for(;p>0&&l[p-1]>u;)p--;return{at:o+Math.max(0,p-1)*r,contrast:l[c]>0?1-d/l[c]:0}}function Sb(e,t,n){let a=Math.max(0,Math.min(e.length-1,t));for(let r=Math.max(0,t-n);r<=Math.min(e.length-1,t+n);r++)Math.abs(e[r])<Math.abs(e[a])&&(a=r);return a}function _s(e,t,n=0,a=e[0]?.length??0){const r=kb(e,n,a),{flux:o,hop:s,size:l}=Ab(r,t),c=t/s/1e3,d=Math.max(1,Math.round(100*c)),u=Math.max(1,Math.round(30*c)),p=Math.max(1,Math.round(25*c)),h=new Float64Array(o.length+1);for(let f=0;f<o.length;f++)h[f+1]=h[f]+o[f];const m=[],g=Math.round(xb*t),w=Math.round(5e-4*t);for(let f=1;f<o.length;f++){const b=o[f],y=Math.max(0,f-d),v=Math.min(o.length,f+u+1),x=b-(h[v]-h[y])/(v-y);if(x<.02)continue;let A=!0;for(let M=Math.max(0,f-p);M<=Math.min(o.length-1,f+p);M++)if(o[M]>b||o[M]===b&&M<f){A=!1;break}if(!A)continue;const{at:$,contrast:k}=Eb(r,t,f*s,f*s+l),S=Sb(r,$-g,w);m.push({cut:n+S,hit:n+$,strength:b*(.25+.75*k),margin:x})}return m.sort((f,b)=>b.strength-f.strength),{from:n,to:a,sampleRate:t,candidates:m}}function Mb(e){return .3*(1-Math.max(0,Math.min(1,e)))**1.6+.02}function js(e,t){const n=Mb(t);return e.candidates.filter(a=>a.margin>=n)}const Xe=16,Lb=.03,Tb=.002,Cb=.02,Nb=.7;function hd(e,t){const{from:n,to:a,sampleRate:r}=e,o=Math.round(Lb*r),s=Math.max(2,Math.min(Xe,Math.round(t.count??Xe)));if(a-n<o*2)return{cuts:[n,a],hits:[n]};if(t.mode==="transients"){const h=js(e,t.sensitivity??.5),m=h.find(w=>w.cut-n<o),g=[];for(const w of h){if(g.length>=s-1)break;w.cut-n<o||a-w.cut<o||g.every(f=>Math.abs(f.cut-w.cut)>=o)&&g.push(w)}return g.sort((w,f)=>w.cut-f.cut),{cuts:[n,...g.map(w=>w.cut),a],hits:[m?m.hit:n,...g.map(w=>w.hit)]}}let l,c=a;if(t.mode==="even")l=Array.from({length:s},(h,m)=>n+Math.round((a-n)*m/s));else{const h=60/(t.bpm&&t.bpm>0?t.bpm:120)/(t.perBeat??1)*r;l=[];for(let m=0;m<Xe&&n+m*h<a-o;m++)l.push(n+Math.round(m*h));l.length>=Xe&&(c=Math.min(a,n+Math.round(Xe*h)))}const d=t.snap===!1?0:Math.round(Cb*r),u=d?js(e,Nb):[];return{cuts:[...l.map((h,m)=>{if(m===0||!d)return h;let g=h,w=d+1;for(const f of u){const b=Math.abs(f.hit-h);b<=d&&b<w&&(w=b,g=f.cut)}return g}),c],hits:l}}function Fb(e,t){const n=e.to-e.from;if(t<2||n<64)return[];const r=hd(e,{mode:"transients",sensitivity:.5,count:t}).cuts.slice(1,-1).map(o=>(o-e.from)/n).filter(o=>o>.001&&o<.999);for(let o=1;r.length<t-1&&o<t;o++){const s=o/t;r.every(l=>Math.abs(l-s)>.5/t)&&r.push(s)}for(let o=1;r.length<t-1;o++)r.push(o/(t+1));return r.sort((o,s)=>o-s).slice(0,t-1)}function zb(e){const t=o=>Math.round(o*10)/10;if(e.fit>0&&e.seconds>0)return{bpm:t(e.fit*240/e.seconds),known:!0,from:"from its Fit"};if(e.given>0)return{bpm:e.given,known:!0,from:e.givenFrom??"from the take"};const n=od(e.name);if(n)return{bpm:n,known:!0,from:"from its name"};const a=id(e.seconds,e.studioBpm);if(a)return{bpm:t(a*240/e.seconds),known:!0,from:"the Studio's"};const r=Pb(e.seconds);return r?{bpm:r.bpm,known:!1,from:"guessed from its length"}:{bpm:e.studioBpm,known:!1,from:"the Studio's"}}function Pb(e,t=[]){let n=null;for(const a of[1,2,4,8]){const r=a*4*60/e;if(r<70||r>180)continue;const o=60/r/4,l=(t.length?t.reduce((c,d)=>c+Math.abs(d/o-Math.round(d/o)),0)/t.length:0)+Math.abs(r-110)/2e3;(!n||l<n.score)&&(n={bpm:r,bars:a,score:l})}return n?{bpm:Math.round(n.bpm*10)/10,bars:n.bars}:null}function Zo(e,t,n){const a=60/n/4*t,r=e.cuts[0],o=(e.cuts[e.cuts.length-1]-r)/a,s=Math.max(1,Math.ceil(o/ne-.06)),l=new Set;return{positions:e.hits.map(d=>{const u=Math.max(0,Math.round((d-r)/a));return l.has(u)?-1:(l.add(u),u)}),bars:s>8?0:s}}function fd(e,t,n){const{positions:a}=Zo(e,t,n),r=a.map(o=>o>=0);return{cuts:e.cuts.filter((o,s)=>s===e.cuts.length-1||r[s]),hits:e.hits.filter((o,s)=>r[s])}}const Bb=.006;function Db(e,t,n,a=Bb){const r=60/n/4*t,o=e.cuts[0]??0,s=e.cuts[e.cuts.length-1]??0,l=a*t,c=[...e.cuts],d=[...e.hits];for(let u=1;u<d.length;u++){const p=d[u]??0,h=o+Math.round(Math.round((p-o)/r)*r);Math.abs(p-h)<=l&&h>o&&h<s&&(c[u]=h,d[u]=h)}return fd({cuts:c,hits:d},t,n)}function Ob(e,t){return e.cuts.length-1<=t?e:{cuts:[...e.cuts.slice(0,t),e.cuts[e.cuts.length-1]],hits:e.hits.slice(0,t)}}function qb(e){return e.replace(/\.[a-z0-9]{2,4}$/i,"").split(/[\s_\-.()[\],+&]+/).filter(Boolean).filter((a,r,o)=>!/^\d{2,3}bpm$/i.test(a)&&!/^bpm\d{2,3}$/i.test(a)&&!/^bpm$/i.test(a)&&!(/^[1-9]\d{1,2}$/.test(a)&&Number(a)>=50&&Number(a)<=200)&&!(/^\d{2,3}$/.test(a)&&/^bpm$/i.test(o[r+1]??""))&&!/^[A-G](?:#|b|s|sharp|flat)?(?:m|min|maj|minor|major)?$/.test(a)).join(" ").trim()||"Loop"}function ra(e,t){const n=String(t+1);return`${e.slice(0,23-n.length).trim()} ${n}`}function Ib(e,t,n){const a=new Set(e.filter((r,o)=>(o<t||o>=t+n)&&r.sample&&r.choke).map(r=>r.choke));for(const r of[4,3,2,1])if(!a.has(r))return r;return 0}function Rb(e,t,n){const a=Math.min(t.cuts.length-1,Q-n.first),r=n.playBack?Zo(t,n.sampleRate,n.playBack.bpm):null,o=Math.round(Tb*n.sampleRate),s=[];for(let l=0;l<a;l++){const c=n.first+l,d=e.pads[c];if(!d)continue;const u=l<a-1?Math.min(n.frames,t.cuts[l+1]+o):t.cuts[l+1];if(Object.assign(d,{name:ra(n.stem,l),sample:n.sample,mode:"oneshot",dir:"fwd",start:t.cuts[l]/n.frames,end:u/n.frames,slices:0,cuts:[],tune:0,fine:0,fit:0,attack:0,decay:4,cutoff:0,resonance:0,level:n.source?.level??.8,pan:0,choke:n.choke??0,provenance:n.source?.provenance?structuredClone(n.source.provenance):null,normalize:n.source?.normalize?{...n.source.normalize}:null,offsetDb:n.source?.offsetDb??0,follow:!1,note:n.source?.note??0}),r?.bars){const p=e.lanes[c];p.length=ne,p.steps=Array.from({length:ne},()=>Bn());const h=r.positions[l];if(h!==void 0&&h>=0){const m=p.steps[h%ne];m.on=!0;const g=r.bars>1?`${Math.floor(h/ne)+1}:${r.bars}`:"always";m.cond=ya.includes(g)?g:"always"}}s.push(c)}return s}const md=827873614,_b=60;async function jb(e,t){const n=new Float64Array([t,e.length,e[0]?.length??0]),a=[new Uint8Array(n.buffer),...e.map(c=>new Uint8Array(c.buffer))],r=a.reduce((c,d)=>c+d.byteLength,0),o=new Uint8Array(r);let s=0;for(const c of a)o.set(c,s),s+=c.byteLength;const l=new Uint8Array(await crypto.subtle.digest("SHA-256",o));return Array.from(l.subarray(0,16),c=>c.toString(16).padStart(2,"0")).join("")}function Hb(e){const t=e.data[0]?.length??0,n=new Uint8Array(16+t*4*e.data.length);return new Uint32Array(n.buffer,0,4).set([md,e.sampleRate,e.data.length,t]),e.data.forEach((a,r)=>{n.set(new Uint8Array(a.buffer,a.byteOffset,t*4),16+r*t*4)}),n}function Wb(e,t){if(t.byteLength<16)return null;const[n,a,r,o]=new Uint32Array(t,0,4);if(n!==md||!r||r>2||t.byteLength!==16+o*4*r)return null;const s=Array.from({length:r},(l,c)=>new Float32Array(t.slice(16+c*o*4,16+(c+1)*o*4)));return{hash:e,data:s,sampleRate:a,channels:r,frames:o}}class Ub{constructor(t="nyx"){this.folderName=t}memory=new Map;dir=null;folder(){return this.dir??=(async()=>{try{const t=await navigator.storage?.getDirectory?.();return t?await t.getDirectoryHandle(this.folderName,{create:!0}):null}catch{return null}})(),this.dir}info(t){return this.memory.get(t)}held(t){return this.memory.get(t)}async put(t,n){const a=await jb(t,n),r={hash:a,data:t,sampleRate:n,channels:t.length,frames:t[0]?.length??0};this.memory.set(a,r);const o=await this.folder();if(!o)return{sample:r,saved:!1};try{const l=await(await o.getFileHandle(`${a}.f32`,{create:!0})).createWritable?.();return l?(await l.write(Hb(r)),await l.close(),{sample:r,saved:!0}):{sample:r,saved:!1}}catch{return{sample:r,saved:!1}}}async get(t){const n=this.memory.get(t);if(n)return n;const a=await this.folder();if(!a)return null;try{const r=await(await a.getFileHandle(`${t}.f32`)).getFile(),o=Wb(t,await r.arrayBuffer());return o&&this.memory.set(t,o),o}catch{return null}}async prune(t){for(const a of[...this.memory.keys()])t.has(a)||this.memory.delete(a);const n=await this.folder();if(n)try{const a=[];for await(const r of n.keys())a.push(r);for(const r of a){const o=r.replace(/\.f32$/,"");r.endsWith(".f32")&&!t.has(o)&&await n.removeEntry(r)}}catch{}}}function gd(e){const t=Math.min(e.length,Math.round(_b*e.sampleRate));return{data:Array.from({length:Math.min(2,e.numberOfChannels)},(a,r)=>{const o=new Float32Array(t);return o.set(e.getChannelData(r).subarray(0,t)),o}),trimmed:t<e.length}}function Hs(e,t=200){const n=e[0]?.length??0,a=[];if(!n)return a;const r=n/t;for(let o=0;o<t;o++){const s=Math.floor(o*r),l=Math.max(s+1,Math.floor((o+1)*r));let c=0,d=0;const u=Math.max(1,Math.floor((l-s)/256));for(let p=s;p<l&&p<n;p+=u){let h=0;for(const m of e)h+=m[p]??0;h/=e.length,h<c&&(c=h),h>d&&(d=h)}a.push(Math.max(-1,c),Math.min(1,d))}return a}function ao(e=Yb()){try{const t=JSON.parse(e?.getItem("lucy.state")??"null");return Array.isArray(t?.takes)?t.takes.flatMap(n=>{const a=n&&typeof n=="object"?n:{},r=o=>typeof a[o]=="number"&&Number.isFinite(a[o])?a[o]:0;return a.saved!==!0||!r("id")||!r("frames")||!r("sampleRate")?[]:[{id:r("id"),bars:r("bars"),bpm:r("bpm"),sampleRate:r("sampleRate"),channels:Math.min(2,Math.max(1,r("channels"))),frames:r("frames")}]}):[]}catch{return[]}}async function Gb(e){try{const t=await navigator.storage?.getDirectory?.();if(!t)return null;const a=await(await(await t.getDirectoryHandle("lucy")).getFileHandle(`lucy-take-${e.id}.f32`)).getFile(),r=new Float32Array(await a.arrayBuffer());return r.length<e.frames*e.channels?null:Array.from({length:e.channels},(o,s)=>r.slice(s*e.frames,(s+1)*e.frames))}catch{return null}}function Yb(){try{return globalThis.localStorage??null}catch{return null}}function Kb(e){const t=e.setTimer??((s,l)=>setTimeout(s,l)),n=e.clearTimer??(s=>clearTimeout(s)),a=new Map,r=new Set,o={scheduled:0,recalled:0,duplicates:0,late:0,cancelled:0,lastMs:0};return{controls(s,l){for(const c of l){if(c.type!=="slot")continue;const d=`${s}|${c.id}`;if(r.has(d)){o.duplicates++;continue}const u=e.timeAt(c.beat);if(u===null)continue;const p=u-e.now();if(p<-.25){o.late++;continue}r.add(d),r.size>512&&r.delete(r.values().next().value);const h=c.slot-1,m=t(()=>{a.delete(d),o.recalled++,o.lastMs=(e.now()-u)*1e3,e.recall(h)},Math.max(0,p*1e3));a.set(d,{source:s,beat:c.beat,timer:m}),o.scheduled++}},off(s,l){for(const[c,d]of a)d.source===s&&(l===void 0||d.beat>=l-1e-9)&&(n(d.timer),a.delete(c),r.delete(c),o.cancelled++)},stats:o,dispose(){for(const s of a.values())n(s.timer);a.clear()}}}const Xb=150,bd=96*1024*1024,Vb=e=>Math.round(e*10)/10;function Qb(e,t,n){if(!e.sample||!e.fit||!e.keepPitch||!t)return null;const[a,r]=td(e,t,null);if(r-a<2)return null;const o=Vb(n);return{sample:e.sample,from:a,to:r,bars:e.fit,bpm:o,semitones:e.tune+e.fine/100,sampleRate:t.sampleRate,frames:nd(e.fit,o,t.sampleRate)}}function Ot(e){return`${e.sample}:${e.from}-${e.to}:${e.bars}:${e.bpm.toFixed(1)}:${Math.round(e.semitones*100)}`}const Jb=e=>`stretch:${e}`,Zb=e=>e.startsWith("stretch:");class ey{constructor(t=bd,n=()=>{}){this.maxBytes=t,this.drop=n}map=new Map;bytes=0;get size(){return this.map.size}has(t){return this.map.has(t)}get(t){const n=this.map.get(t);return n&&(this.map.delete(t),this.map.set(t,n)),n}byId(t){for(const n of this.map.values())if(n.sample===t)return n}put(t,n=new Set){const a=this.map.get(t.key);a&&(this.bytes-=a.bytes),this.map.delete(t.key),this.map.set(t.key,t),this.bytes+=t.bytes;for(const[r,o]of this.map){if(this.bytes<=this.maxBytes)break;r===t.key||n.has(r)||(this.map.delete(r),this.bytes-=o.bytes,this.drop(o))}}}class ty{constructor(t,n=bd){this.host=t,this.cache=new ey(n,a=>t.drop(a))}cache;current=new Map;wanted=new Map;inFlight=new Set;timer=null;queue=Promise.resolve();missingSig="";renders=0;lastMs=0;failed=!1;plan(t,n,a){this.wanted.clear();const r=[];t.forEach((c,d)=>{const u=c.sample?n(c.sample):void 0,p=Qb(c,u,a),h=this.current.get(d);if(!p){this.current.delete(d);return}this.wanted.set(d,p);const m=Ot(p),g=this.cache.get(m);g?this.current.set(d,g):(h&&!ny(h.job,p)&&this.current.delete(d),this.inFlight.has(m)||r.push(m))});const o=r.join("|");if(!r.length||this.failed){this.missingSig="";return}if(o===this.missingSig&&this.timer!==null)return;this.missingSig=o;const s=this.host.clearTimeout??(c=>clearTimeout(c)),l=this.host.setTimeout??((c,d)=>setTimeout(c,d));this.timer!==null&&s(this.timer),this.timer=l(()=>{this.timer=null,this.missingSig="",this.renderWanted()},Xb)}stretchedFor(t){return this.current.get(t)}renderFor(t){return this.current.get(t)}pending(t){const n=this.wanted.get(t);return n?this.current.get(t)?.key!==Ot(n):!1}renderWanted(){for(const t of new Map([...this.wanted.values()].map(n=>[Ot(n),n])).values()){const n=Ot(t);this.cache.has(n)||this.inFlight.has(n)||(this.inFlight.add(n),this.queue=this.queue.then(()=>this.renderOne(n,t)))}}idle(){return this.queue}async renderOne(t,n){if(![...this.wanted.values()].some(s=>Ot(s)===t)){this.inFlight.delete(t);return}const a=Date.now();let r=null;try{r=await this.host.run(n)}catch(s){console.error("NYX stretch",s)}if(this.inFlight.delete(t),!r){this.failed=!0,this.host.changed();return}this.lastMs=Date.now()-a,this.renders++;const o={key:t,job:n,sample:Jb(t),frames:n.frames,bytes:r.reduce((s,l)=>s+l.byteLength,0)};this.host.deliver(o,r);for(const[s,l]of this.wanted)Ot(l)===t&&this.current.set(s,o);this.cache.put(o,new Set([...this.current.values()].map(s=>s.key))),this.host.changed()}}const ny=(e,t)=>e.sample===t.sample&&e.from===t.from&&e.to===t.to,ay=48e3;function yd(e,t){try{const n=e?.latency?.(t);return typeof n=="number"&&Number.isFinite(n)&&n>0&&n<=ay?Math.round(n):0}catch{return 0}}function ry(e,t){return{from:e.from+t,to:e.to+t}}const oy="instance",iy=99;function Ra(e=typeof location>"u"?"":location.search){const t=new URLSearchParams(e).get(oy)?.trim()??"";if(!/^\d+$/.test(t))return 1;const n=Number(t);return n>=2&&n<=iy?n:1}function sy(e,t){return t===1?e:`${e}#${t}`}function ly(e,t){return t===1?e:`${e} ${t}`}let ht;function cy(e,t=Ra()){if(ht!==void 0)return ht;ht=null;try{if(typeof window>"u"||window.parent===window)return ht;const n=window.parent.ncStudio;n&&n.version===1&&(ht=n.attach(e,{instance:t}))}catch{}return ht}function dy(){let e;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(e=a.syncScope)}}catch{}if(!e)return{};const t=`/studio/${e}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${t}`,locks:n?{request:(a,r,o)=>n.request(`${a}${t}`,r,o)}:null}}function uy(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1&&typeof e.fxWorklet=="string"&&e.fxWorklet?e.fxWorklet:null}catch{return null}}function ot(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.grab?e.grab:null}catch{return null}}function Jt(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.play?e.play:null}catch{return null}}function _a(e,t=Ra()){return t>1?`${e}#${t}`:e}function py(e,t=Ra()){const n=Jt()?.owner()??null;return n===null||n==="studio"||n===_a(e,t)}function hy(e){if(e.code!=="Space"&&e.code!=="Backspace")return!1;try{return ht?.studioKey?.({code:e.code,shiftKey:e.shiftKey===!0,repeat:e.repeat===!0})===!0}catch{return!1}}const Ws=48;function fy(e){const t=[];for(const n of e.points().slice(-64))t.push(n.beat,n.root===null?Number.NaN:n.root);return{type:"follow",points:t,transpose:e.route?.transpose??0}}function my(e){const t=Math.trunc((e.transpose??0)/12);return t?`Root, ${t>0?"+":"−"}${Math.abs(t)} oct`:"Root"}function gy(e,t,n=null){const a=e;if(typeof a?.notesIn!="function")return null;const r=new Cg,o=new Set;let s=-1,l="",c=!1;const d=()=>{c=!1;const p=JSON.stringify(r.route),h=p!==l;if(!h&&r.version===s)return;l=p;const m=r.points();m.length>Ws&&r.prune(m[m.length-Ws].beat),s=r.version,t(fy(r));for(const g of[...o])g(h)};try{let p=new Set;a.notesIn(h=>{const m=ed(h);let g=h;if(m?.kind==="routes")p=new Set(m.routes.filter(w=>w.layer).map(w=>w.source)),g=Tg(m.routes.filter(w=>!w.layer));else if(m&&"source"in m&&p.has(m.source)){m.kind==="notes"?n?.notes(m.source,m.events):m.kind==="off"?n?.off(m.source,m.atBeat):m.kind==="controls"?n?.controls?.(m.source,m.events):m.kind==="release"&&n?.release?.(m.source,m.ids);return}r.receive(g),c||(c=!0,queueMicrotask(d))},{takes:"pitch"})}catch{return null}const u=p=>{const h=r.route?.source;if(!h||typeof p!="function")return!1;try{return p.call(a,h),!0}catch{return!1}};return{follower:r,route:()=>r.route,resend(){s=-1,d()},takeBack:()=>u(a.notesTakeBack),open:()=>u(a.showInstance),onChange(p){o.add(p)}}}class by{constructor(t){this.make=t}worker=null;seq=0;calls=new Map;cache=new Map;times=[];workerNow(){if(this.worker||!this.make)return this.worker;try{const t=this.make();t.onmessage=n=>{const a=n.data;this.calls.get(a.id)?.(a),this.calls.delete(a.id)},t.onerror=n=>{for(const a of this.calls.values())a({error:n.message||"worker failed"});this.calls.clear()},this.worker=t}catch{this.worker=null}return this.worker}analysis(t,n,a,r,o){const s=`${t}:${r}:${o}`;let l=this.cache.get(s);return l||(l=this.run(n,a,r,o),this.cache.set(s,l),l.catch(()=>this.cache.delete(s)),this.cache.size>16&&this.cache.delete(this.cache.keys().next().value),l)}run(t,n,a,r){const o=this.workerNow();if(!o)return Promise.resolve(_s(t,n,a,r));const s=++this.seq;return new Promise(l=>{this.calls.set(s,c=>{c.analysis?(c.ms!==void 0&&this.times.push(c.ms),l(c.analysis)):l(_s(t,n,a,r))}),o.postMessage({id:s,channels:t.map(c=>c.slice(a,r)),sampleRate:n,from:a})})}}function I(e,t={},...n){const a=document.createElement(e);for(const[r,o]of Object.entries(t))a.setAttribute(r,o);return a.append(...n),a}const Ke=(e,t)=>R(e,O(t),e),yy=[{value:"transients",label:"At hits"},{value:"even",label:"Even"},{value:"beats",label:"Beats"}];class wy{constructor(t){this.host=t,this.canvas=I("canvas",{class:"nyx-chop-wave",role:"img","aria-label":"The slices","data-nyx-chop":"wave"}),Ke(this.canvas,"chop:wave"),this.canvas.addEventListener("click",r=>this.clickWave(r)),this.title=I("span",{class:"nc-readout nyx-chop-name","data-nyx-chop":"name"});const n=I("button",{type:"button",class:"nc-btn nyx-chop-close","data-nyx-chop":"close"},"Close");Ke(n,"chop:close"),n.addEventListener("click",()=>this.host.close()),this.body=I("div",{class:"nyx-chop-body"});const a=I("span",{class:"nc-label"},"Chop to pads");this.el=I("div",{class:"nyx-chop",role:"region","aria-label":"Chop to pads","data-nyx-chop":""},I("div",{class:"nyx-chop-head"},a,this.title,n),I("div",{class:"nyx-chop-wavebox"},this.canvas),this.body),typeof ResizeObserver<"u"&&new ResizeObserver(()=>this.paintWave()).observe(this.canvas)}el;isOpen=!1;src=null;analysisOf=null;mode="transients";sensitivity=.5;count=16;perBeat=2;first=0;playBack=!0;choke=!0;snap=!0;moreOpen=!1;result=null;status="";canvas;body;title;async open(){const t=await this.host.source();if(!t)return!1;this.isOpen=!0,this.src=t,this.first=t.pad,this.playBack=t.tempo.known,this.analysisOf=null,this.result=null,this.status="Finding the hits…",this.render();const n=await this.host.analysis(t);return this.src!==t||(this.analysisOf=n,this.status="",this.run()),!0}close(){this.isOpen=!1,this.src=null,this.analysisOf=null}set(t){Object.assign(this,t),this.run()}get preview(){return{chop:this.result,first:this.first,playBack:this.playBack,choke:this.choke,bpm:this.src?.tempo.bpm??0}}run(){this.compute(),this.render()}compute(){const t=this.src,n=this.analysisOf;if(!t||!n)return;const a=Q-this.first;let r=hd(n,{mode:this.mode,sensitivity:this.sensitivity,count:Math.min(this.count,a),bpm:t.tempo.bpm,perBeat:this.perBeat,snap:this.snap});this.playBack&&(r=this.mode==="transients"&&t.tempo.known?Db(r,t.sampleRate,t.tempo.bpm):fd(r,t.sampleRate,t.tempo.bpm)),this.result=Ob(r,a)}field(t,n,a,r=""){const o=I("label",{class:"nc-label",for:`nyx-chop-${t}`},n);return Ke(o,`chop:${t}`),I("div",{class:"nc-field","data-nc-row":"","data-nc-id":`chop-${t}`},o,I("span",{class:"nc-readout","data-nc-readout":""},r),a)}choices(t,n,a,r,o){const s=I("div",{class:"nc-choice-row",role:"tablist","aria-label":n,id:`nyx-chop-${t}`,"data-nyx-chop":t});for(const c of r){const d=I("button",{type:"button",class:"nc-choice",role:"tab","aria-selected":String(c.value===a),"data-nc-choice":c.value},c.label);Ke(d,O(`chop:${t}:${c.value}`)?`chop:${t}:${c.value}`:`chop:${t}`),c.disabled&&(d.disabled=!0),d.addEventListener("click",()=>o(c.value)),s.append(d)}const l=I("span",{class:"nc-label"},n);return Ke(l,`chop:${t}`),I("div",{class:"nc-field nyx-chop-choice","data-nc-row":"","data-nc-id":`chop-${t}`},l,s)}select(t,n,a,r){const o=I("select",{class:"nc-select",id:`nyx-chop-${t}`,"data-nyx-chop":t});for(const s of a)o.append(I("option",{value:s.value},s.label));return o.value=n,o.addEventListener("change",()=>r(o.value)),o}onOff(t,n,a,r,o=!1){return this.choices(t,n,a?"on":"off",[{value:"on",label:"On",disabled:o},{value:"off",label:"Off",disabled:o}],s=>r(s==="on"))}render(){const t=this.src;if(!t)return;const n=(t.to-t.from)/t.sampleRate;this.title.textContent=`${t.stem} · ${n<10?n.toFixed(2):n.toFixed(1)} s`;const a=this.result,r=[];if(r.push(this.choices("mode","Chop",this.mode,yy,h=>{this.mode=h,this.run()})),this.mode==="transients"){const h=I("input",{type:"range",class:"nc-range",id:"nyx-chop-sensitivity",min:"0",max:"1",step:"0.01","data-nyx-chop":"sensitivity"});h.value=String(this.sensitivity);const m=this.field("sensitivity","Sensitivity",h,`${Math.round(this.sensitivity*100)}%`);h.addEventListener("input",()=>{this.sensitivity=Number(h.value),this.compute();const g=m.querySelector(".nc-readout");g&&(g.textContent=`${Math.round(this.sensitivity*100)}%`),this.paintWave()}),h.addEventListener("change",()=>this.render()),m.setAttribute("data-nc-slider",""),m.append(m.querySelector(".nc-readout")),r.push(m)}if(this.mode!=="beats")r.push(this.field("count","Slices",this.select("count",String(this.count),[16,8,4].map(h=>({value:String(h),label:this.mode==="transients"?`Up to ${h}`:String(h)})),h=>{this.count=Number(h),this.run()})));else{const h=m=>Math.ceil(n*t.tempo.bpm/60*m-.05);r.push(this.choices("every","Every",String(this.perBeat),[{value:"1",label:"Beat",disabled:h(1)>Xe},{value:"2",label:"1/8",disabled:h(2)>Xe},{value:"4",label:"1/16",disabled:h(4)>Xe}],m=>{this.perBeat=Number(m),this.run()}))}r.push(this.field("first","Fill from",this.select("first",String(this.first),Array.from({length:Q},(h,m)=>({value:String(m),label:`Pad ${m+1}`})),h=>{this.first=Number(h),this.run()})));const o=a?Zo(a,t.sampleRate,t.tempo.bpm):null,s=o!==null&&o.bars===0;if(r.push(this.onOff("play-back","Play it back",this.playBack&&!s,h=>{this.playBack=h,this.run()},s)),this.status&&r.push(I("p",{class:"nc-note","data-nyx-chop":"status"},this.status)),a&&o){const h=a.cuts.length-1,m=this.first+h,g=h>1?`${ra(t.stem,0)} to ${ra(t.stem,h-1)}`:ra(t.stem,0),w=this.playBack&&o.bars?` Play it back writes ${o.bars===1?"a bar":`${o.bars} bars`} on their lanes.`:s?" Longer than 8 bars: no Play it back.":"";r.push(I("p",{class:"nc-note","data-nyx-chop":"summary"},`${h} slices onto pads ${this.first+1}–${m}: ${g}.${w}`));const f=this.host.pads().slice(this.first,m).filter((b,y)=>b.sample&&this.first+y!==t.pad).length;f&&r.push(I("p",{class:"nc-note nyx-chop-warn","data-nyx-chop":"warn"},`${f===1?"1 of those pads has a sound":`${f} of those pads have sounds`}. Chop replaces ${f===1?"it":"them"}; Undo puts ${f===1?"it":"them"} back.`))}const l=I("div",{class:"nc-group","data-nc-id":"chop-more","data-nc-open":String(this.moreOpen)}),c=I("button",{type:"button",class:"nc-group-toggle","aria-expanded":String(this.moreOpen),"data-nyx-chop":"more"},I("span",{class:"nc-group-title"},"More"),I("span",{class:"nc-group-summary"},`${t.tempo.bpm} BPM · choke ${this.choke?"on":"off"}${this.mode!=="transients"?` · snap ${this.snap?"on":"off"}`:""}`),I("span",{class:"nc-group-mark","aria-hidden":"true"},this.moreOpen?"−":"+"));Ke(c,"chop:more"),c.addEventListener("click",()=>{this.moreOpen=!this.moreOpen,this.render()});const d=I("div",{class:"nc-group-body",role:"group"});d.hidden=!this.moreOpen;const u=I("div",{class:"nc-field","data-nc-row":"","data-nc-id":"chop-tempo"},I("span",{class:"nc-label"},"Tempo"),I("span",{class:"nc-readout","data-nc-readout":""},`${t.tempo.bpm} BPM, ${t.tempo.from}`));Ke(u.firstElementChild,"chop:tempo"),d.append(u,this.onOff("choke","Choke",this.choke,h=>{this.choke=h,this.render()})),this.mode!=="transients"&&d.append(this.onOff("snap","Snap to hits",this.snap,h=>{this.snap=h,this.run()})),l.append(c,d),r.push(l);const p=I("button",{type:"button",class:"nc-btn nyx-chop-go","data-nyx-chop":"go"},"Chop to pads");Ke(p,"chop:go"),p.disabled=!a,p.addEventListener("click",()=>{this.src&&this.result&&this.host.apply(this.src,this.result,{first:this.first,playBack:this.playBack&&!s,choke:this.choke,bpm:this.src.tempo.bpm})}),r.push(p),this.body.replaceChildren(...r),this.paintWave()}clickWave(t){const n=this.src,a=this.result;if(!n||!a)return;const r=this.canvas.getBoundingClientRect(),o=n.from+(t.clientX-r.left)/Math.max(1,r.width)*(n.to-n.from);for(let s=0;s<a.cuts.length-1;s++)if(o>=a.cuts[s]&&o<a.cuts[s+1]){this.host.audition(n,a.cuts[s],a.cuts[s+1]);return}}paintWave(){const t=this.src,n=this.canvas,a=n.clientWidth,r=n.clientHeight;if(!t||!a||!r)return;const o=window.devicePixelRatio||1;n.width=Math.round(a*o),n.height=Math.round(r*o);const s=n.getContext("2d");if(!s)return;s.scale(o,o);const l=getComputedStyle(this.el),c=x=>l.getPropertyValue(x).trim(),d=c("--nc-ui-accent"),u=c("--nc-ui-accent-soft")||c("--nc-ui-divider"),p=c("--nc-ui-color-accent-pad")||c("--nc-ui-text-sub"),h=c("--nc-ui-font-readout")||"monospace",m=this.result;s.clearRect(0,0,a,r);const g=Math.max(1,t.to-t.from),w=x=>(x-t.from)/g*a,f=16,b=f+(r-f)/2,y=(r-f)/2-2;if(m)for(let x=1;x<m.cuts.length-1;x+=2)s.fillStyle=u,s.fillRect(w(m.cuts[x]),f,w(m.cuts[x+1])-w(m.cuts[x]),r-f);s.fillStyle=p;const v=g/a;for(let x=0;x<a;x++){const A=Math.floor(t.from+x*v),$=Math.min(t.to,Math.floor(t.from+(x+1)*v));let k=0,S=0;const M=Math.max(1,Math.floor(($-A)/64));for(let _=A;_<$;_+=M){let j=0;for(const ue of t.data)j+=ue[_]??0;j/=t.data.length||1,j<k&&(k=j),j>S&&(S=j)}s.fillRect(x,b-S*y,1,Math.max(1,(S-k)*y))}if(m){s.fillStyle=d,s.strokeStyle=d,s.lineWidth=1,s.font=`600 10px ${h}`,s.textBaseline="top";for(let x=0;x<m.cuts.length-1;x++){const A=Math.round(w(m.cuts[x]))+.5;s.beginPath(),s.moveTo(A,f-2),s.lineTo(A,r),s.stroke();const $=String(this.first+x+1);w(m.cuts[x+1])-w(m.cuts[x])>s.measureText($).width+6&&s.fillText($,A+3,1)}}}attach(t){if(!this.isOpen||!t){this.el.isConnected&&this.el.remove();return}t.nextElementSibling!==this.el&&t.after(this.el),this.paintWave()}}const Us="My samples";function hr(e){return e.permission?"used with permission":e.licenseStatus==="redistributable"?"shareable licence":e.licenseStatus==="personal"?"personal use":"licence unknown: personal use"}const Gs="http://www.w3.org/2000/svg";function B(e,t={},...n){const a=document.createElement(e);for(const[r,o]of Object.entries(t))a.setAttribute(r,o);return a.append(...n),a}function pn(e,t,n={}){return e?B("a",{href:e,target:"_blank",rel:"noopener noreferrer",...n},t):B("span",n,t)}function vy(e){const t=xy(e);if(!t.length)return"M0 1H48";const n=t.map(s=>Math.sqrt(Math.max(0,s))),a=n.length,r=n.map((s,l)=>`${(l+.5)*48/a} ${1-Math.max(.04,s)*.96}`),o=[...n].map((s,l)=>`${(l+.5)*48/a} ${1+Math.max(.04,s)*.96}`).reverse();return`M0 1L${r.join("L")}L48 1L${o.join("L")}Z`}function xy(e){let t=-1;for(let n=e.length-1;n>=0;n--)if((e[n]??0)>0){t=n;break}return t<0?[]:e.slice(0,Math.min(e.length,Math.max(8,t+2)))}function ky(e){const t=document.createElementNS(Gs,"svg");t.setAttribute("viewBox","0 0 48 2"),t.setAttribute("preserveAspectRatio","none"),t.setAttribute("class","nyx-lib-wave"),t.setAttribute("aria-hidden","true");const n=document.createElementNS(Gs,"path");return n.setAttribute("d",vy(e)),t.append(n),t}function $y(e){return e<1?`${e.toFixed(2)} s`:e<10?`${e.toFixed(1)} s`:`${Math.round(e)} s`}const Ay={kick:"Kick",snare:"Snare",clap:"Clap",hat:"Hat",tom:"Tom",perc:"Perc",cymbal:"Cymbal",fx:"FX",tonal:"Tonal"};class Ey{constructor(t){this.host=t,this.input=B("input",{type:"search",class:"nyx-lib-input",id:"nyx-library-ask",placeholder:"punchy kick, dusty funk kit",autocomplete:"off",spellcheck:"false",enterkeyhint:"search","aria-label":"Ask the Library","data-nyx-lib":"ask"});const n=B("label",{class:"nc-label",for:"nyx-library-ask"},"Ask");R(n,O("library:ask"),this.input),this.input.addEventListener("input",()=>this.schedule()),this.input.addEventListener("keydown",o=>{o.key==="Enter"?(o.preventDefault(),this.run()):o.key==="Escape"&&(o.preventDefault(),this.host.close())});const a=B("button",{type:"button",class:"nc-btn nyx-lib-close","data-nyx-lib":"close"},"Close");R(a,O("library:close"),a),a.addEventListener("click",()=>this.host.close()),this.forLine=B("p",{class:"nc-note nyx-lib-for","data-nyx-lib":"for"}),this.status=B("p",{class:"nc-note nyx-lib-status","data-nyx-lib":"status","aria-live":"polite"}),this.list=B("ul",{class:"nyx-lib-results","data-nyx-lib":"results"}),this.kitBtn=B("button",{type:"button",class:"nc-btn","data-nyx-lib":"kit"},"Build kit"),R(this.kitBtn,O("library:kit"),this.kitBtn),this.kitBtn.addEventListener("click",()=>void this.buildKit()),this.creditsBtn=B("button",{type:"button",class:"nc-btn","data-nyx-lib":"credits","aria-expanded":"false"},"Credits"),R(this.creditsBtn,O("library:credits"),this.creditsBtn),this.creditsBtn.addEventListener("click",()=>{this.creditsOpen=!this.creditsOpen,this.render()}),this.creditsEl=B("div",{class:"nyx-lib-credits",id:"nyx-library-credits","data-nyx-lib":"credits-list"}),this.creditsBtn.setAttribute("aria-controls",this.creditsEl.id),this.sourcesEl=B("div",{class:"nyx-lib-sources",role:"group","aria-label":"Library source","data-nyx-lib":"sources"}),this.fileInput=B("input",{type:"file",hidden:"","data-nyx-lib":"folder-input","aria-label":"Open a local Library folder"}),this.fileInput.webkitdirectory=!0,this.fileInput.multiple=!0,this.fileInput.addEventListener("change",()=>{const o=this.fileInput.files;o?.length&&this.host.local?.openFiles(o),this.fileInput.value=""});const r=this.host.local;if(r){let o=r.state.status;r.onChange(()=>{const s=r.state.status;s==="ready"&&o!=="ready"&&(this.source="local"),s!=="ready"&&this.source!=="shelf"&&s!=="opening"&&(this.source="shelf"),o=s,this.isOpen?this.run():this.render()})}this.el=B("div",{class:"nyx-library",role:"region","aria-label":"Library","data-nyx-library":""},B("div",{class:"nyx-lib-ask"},n,this.input,a),this.sourcesEl,this.fileInput,this.forLine,this.list,this.status,B("div",{class:"nyx-lib-actions"},this.kitBtn,this.creditsBtn),this.creditsEl)}el;input;forLine;status;list;kitBtn;creditsBtn;creditsEl;sourcesEl;fileInput;source="shelf";lib=null;loading=null;failed=!1;query=null;hits=[];kit=[];playing=null;busy=null;creditsOpen=!1;message="";timer=null;isOpen=!1;open(t){this.isOpen=!0,t!==void 0&&(this.input.value=t),this.ensure().then(()=>this.run()),this.render()}closePanel(){this.isOpen=!1,this.host.stopPreview(),this.playing=null}focus(){this.input.focus()}get catalog(){const t=this.host.local?.lib??null;return t?ws(Ht,this.lib,t):this.lib}catalogFor(t){return t==="local"?this.host.local?.lib??null:this.lib}active(){const t=this.host.local?.lib??null;return this.source==="local"?t:this.source==="all"?t||this.lib?ws("All",this.lib,t):null:this.lib}choose(t){t!=="shelf"&&!this.host.local?.lib||(this.source=t,this.run())}openFolder(){const t=this.host.local;t&&(t.canRemember?t.pick():this.fileInput.click())}ensure(){return this.lib?Promise.resolve(this.lib):(this.loading??=this.host.catalog().then(t=>(this.lib=t,this.failed=!1,this.render(),t),()=>(this.failed=!0,this.loading=null,this.render(),null)),this.render(),this.loading)}schedule(){this.timer&&clearTimeout(this.timer),this.timer=setTimeout(()=>this.run(),150)}run(){this.timer&&clearTimeout(this.timer),this.timer=null;const t=this.input.value;if(this.message="",!this.lib&&this.source!=="local"&&!this.failed&&(this.ensure().then(a=>a&&this.run()),this.source==="shelf"))return;const n=this.active();!n||!t.trim()?(this.query=null,this.hits=[],this.kit=[]):(this.query=Jr(t,n),this.kit=this.query.kit?ks(n,this.query):[],this.hits=this.query.kit?[]:qm(n,this.query,{limit:Fc})),this.render()}get results(){return{kit:!!this.query?.kit,ids:this.query?.kit?this.kit.map(t=>t.sound.id):this.hits.map(t=>t.sound.id),unknown:this.query?.unknown??[]}}async play(t){if(this.playing===t.id){this.host.stopPreview(),this.playing=null,this.render();return}this.playing=t.id,this.render();try{await this.host.preview(t)}finally{this.playing===t.id&&(this.playing=null,this.render())}}async load(t){if(!this.busy){this.busy=t.id,this.render();try{await this.host.load(t,this.input.value)}finally{this.busy=null,this.render()}}}async chopSound(t){if(!(this.busy||!this.host.chop)){this.busy=t.id,this.render();try{await this.host.chop(t,this.input.value)}finally{this.busy=null}}}async buildKit(){if(this.busy)return;this.source!=="local"&&!this.lib&&await this.ensure();const t=this.active();if(!t)return;const n=this.input.value,a=Jr(n,t),r=ks(t,{...a,roles:[],kit:!0});if(!r.length){this.message="The Library has nothing for a kit yet.",this.render();return}this.busy="kit",this.render();try{await this.host.buildKit(r,n)}finally{this.busy=null,this.render()}}row(t,n){const a=this.playing===t.id,r=B("button",{type:"button",class:"nyx-lib-play","data-nyx-lib":"play","aria-label":`${a?"Stop":"Play"} ${t.title}`,"aria-pressed":String(a)},a?"■":"▶");R(r,O("library:play"),r),r.addEventListener("click",()=>void this.play(t));const o=this.busy===t.id,s=B("button",{type:"button",class:"nc-btn nyx-lib-load","data-nyx-lib":"load","aria-label":`Load ${t.title} onto ${this.host.target().title}`},o?"Loading…":"Load");this.busy&&(s.disabled=!0),R(s,O("library:load"),s),s.addEventListener("click",()=>void this.load(t));const l=pn(t.licenseUrl,Po(t.license,t.licenseStatus,t.permission),{class:"nyx-lib-badge","data-nyx-lib":"badge",title:t.origin==="local"?`${t.license}: ${hr(t)}`:t.license});R(l,O("library:badge"));const c=Ay[t.role]??t.role,d=n?n.slot.role===t.role?n.slot.label:`${n.slot.label} · ${c}`:c,u=B("span",{class:"nyx-lib-meta"},...t.origin==="local"?[B("span",{class:"nyx-lib-chip","data-nyx-lib":"local-chip"},"LOCAL")," "]:[],`${d} · ${$y(t.measures.length)} · `,pn(t.creatorLink,t.creator,{class:"nyx-lib-creator"})),p=B("span",{class:"nyx-lib-name",title:t.title},t.title),h=B("span",{class:"nyx-lib-main"},p,u);n?.note&&h.append(B("span",{class:"nyx-lib-meta nyx-lib-warn"},n.note)),qc(t)&&h.append(B("span",{class:"nyx-lib-meta","data-nyx-lib":"personal"},t.license==="unknown"?"Licence unknown: personal use":`${t.license}, ${hr(t)}`));const m=B("span",{class:"nyx-lib-wavebox"},ky(t.wave));R(m,O("library:wave"));const g=this.host.chop&&t.origin==="local"&&(t.kind==="loop"||Ko(t.title).kind==="loop")?B("button",{type:"button",class:"nc-btn nyx-lib-load nyx-lib-chop","data-nyx-lib":"chop","aria-label":`Chop ${t.title} to pads`},"Chop"):null;g&&(this.busy&&(g.disabled=!0),R(g,O("library:chop"),g),g.addEventListener("click",()=>void this.chopSound(t)));const w=B("li",{class:"nyx-lib-row","data-nyx-sound":t.id,"data-nyx-role":t.role},r,h,m,l,g?B("span",{class:"nyx-lib-loads"},s,g):s);return a&&(w.dataset.nyxPlaying=""),w}renderCredits(){if(this.creditsBtn.setAttribute("aria-expanded",String(this.creditsOpen)),this.creditsEl.hidden=!this.creditsOpen,!this.creditsOpen)return;const t=this.host.pads(),n=Rc(t);if(!n.length){this.creditsEl.replaceChildren(B("p",{class:"nc-note"},"No Library sounds on the pads yet."));return}const a=Wm(n),r=[];for(const o of a){const s=o.origin==="local";a.length>1&&r.push(B("p",{class:"nc-label","data-nyx-lib":`credits-${o.origin}`},s?"Your local Library":Ht));const l=B("ul",{class:"nyx-lib-credit-list","data-nyx-origin":o.origin});for(const c of o.credits){const d=`On pad${c.pads.length>1?"s":""} ${c.pads.join(", ")}`;l.append(B("li",{class:"nyx-lib-credit","data-nyx-credit":c.id},B("span",{class:"nyx-lib-name"},c.title),B("span",{class:"nyx-lib-meta"},"by ",pn(c.creatorLink,c.creator)," · ",pn(c.licenseUrl,c.license),...s?[` (${hr(c)})`]:[],...c.source?[" · ",pn(c.source,"source")]:s?[]:[" · source"],s?` · from ${qo}`:` · via ${c.curator}`),B("span",{class:"nyx-lib-meta"},d)))}r.push(l)}this.creditsEl.replaceChildren(...r)}forText(){const t=this.host.target();return this.source==="local"?`Load goes on ${t.title}. Your local Library: it plays here and is never uploaded.`:this.source==="all"?`Load goes on ${t.title}. musicmatter.art and your local Library together.`:`Load goes on ${t.title}. Curated: every sound checked by a person.`}renderSources(){const t=this.host.local;if(!t){this.sourcesEl.hidden=!0;return}this.sourcesEl.hidden=!1;const n=t.state,a=(s,l,c="")=>{const d=B("button",{type:"button",class:"nc-btn","data-nyx-lib":`source-${s}`,...c?{title:c}:{},"aria-pressed":String(this.source===s),"data-on":String(this.source===s)},l);return R(d,O(`library:source-${s}`),d),d.addEventListener("click",()=>this.choose(s)),d},r=(s,l,c)=>{const d=B("button",{type:"button",class:"nc-btn","data-nyx-lib":s},l);return R(d,O(`library:${s}`),d),d.addEventListener("click",c),d},o=[a("shelf",Ht)];if(n.status==="ready"&&o.push(a("local",Us,n.name),a("all","All")),n.status==="reconnect"){const s=r("reconnect",`Reconnect ${Us}`,()=>void t.reconnect());s.title=n.name,o.push(s)}else n.status!=="ready"&&o.push(r("open-folder",n.status==="opening"?"Opening…":"Open folder…",()=>this.openFolder()));(n.status==="ready"||n.status==="reconnect")&&o.push(r("forget","Forget",()=>void t.forget())),this.sourcesEl.replaceChildren(...o)}localStatus(){const t=this.host.local;if(!t)return null;const n=t.state;return n.status==="error"?{text:n.message,danger:!0}:this.source==="shelf"?null:n.status==="ready"&&!n.remembered&&!this.query?{text:`${n.lib.sounds.length} local sounds. This browser can't keep the folder: open it again next visit.`,danger:!1}:null}render(){this.renderSources(),this.forLine.textContent=this.forText();const t=[];if(this.query?.kit)for(const s of this.kit)t.push(this.row(s.sound,s));else for(const s of this.hits)t.push(this.row(s.sound));this.list.replaceChildren(...t);let n=this.message,a=!1;const r=this.active(),o=this.localStatus();!n&&o?(n=o.text,a=o.danger):!n&&this.source==="local"&&!r?n="Open your local Library: the folder the sample picker exported.":n||(this.failed&&!r?(n="The Library couldn't be reached. Check the connection, then ask again.",a=!0):r?this.busy==="kit"?n="Building the kit…":this.query?this.query.kit?n=this.kit.length?"A kit for pads 1–8: Build kit puts it on them and keeps the pattern.":"Nothing for a kit.":this.hits.length?n="":n="Nothing matches. Try a role (kick, snare, hat) and a word like dark or tight.":n=`${r.sounds.length} sounds. Try "punchy kick" or "funk kit".`:n="Opening the Library…",this.query?.unknown.length&&(n=`${n?`${n} `:""}Not in the Library's words: ${this.query.unknown.join(", ")}.`.trim())),this.status.textContent=n,this.status.hidden=!n,a?this.status.dataset.ncTone="danger":delete this.status.dataset.ncTone,this.kitBtn.textContent=this.busy==="kit"?"Building…":"Build kit",this.kitBtn.disabled=!!this.busy||!r,this.renderCredits()}refresh(){const t=this.host.target(),n=this.forText();if(this.forLine.textContent!==n){this.forLine.textContent=n;for(const a of this.list.querySelectorAll('[data-nyx-lib="load"]')){const r=a.closest("li")?.querySelector(".nyx-lib-name")?.textContent??"";a.setAttribute("aria-label",`Load ${r} onto ${t.title}`)}}this.creditsOpen&&this.renderCredits()}attach(t){if(!this.isOpen||!t){this.el.isConnected&&this.el.remove();return}if(t.nextElementSibling===this.el)return;const n=document.activeElement===this.input,{selectionStart:a,selectionEnd:r}=this.input;t.after(this.el),n&&(this.input.focus(),a!==null&&r!==null&&this.input.setSelectionRange(a,r))}}const wt="nyx-local-library.json";function fr(e){return{name:e.name,async read(t){const n=t.split("/"),a=n.pop();let r=e;for(const o of n)r=await r.getDirectoryHandle(o);return(await r.getFileHandle(a)).getFile()}}}function Sy(e){const t=[...e].map(l=>({file:l,path:(l.webkitRelativePath||l.name).replace(/\\/g,"/")})),a=t.filter(l=>l.path===wt||l.path.endsWith(`/${wt}`)).sort((l,c)=>l.path.length-c.path.length)[0];if(!a)return null;const r=a.path.slice(0,a.path.length-wt.length),o=new Map;for(const l of t)l.path.startsWith(r)&&o.set(l.path.slice(r.length),l.file);return{name:r.replace(/\/$/,"").split("/").pop()||"Local Library",async read(l){const c=o.get(l);if(!c)throw new Error(`${l} isn't in the folder`);return c}}}function My(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60)||"local"}async function Ly(e){let t;try{t=await(await e.read(wt)).text()}catch{throw new Error(`${e.name} has no ${wt}. Open the folder the sample picker exported.`)}let n;try{n=JSON.parse(t)}catch{throw new Error(`${wt} in ${e.name} isn't readable JSON.`)}if(n?.kind!=="nyx-local-library")throw new Error(`${e.name} isn't a NYX local Library.`);return Dc(n,My(e.name))}async function Ty(e){const t=new Uint8Array(await crypto.subtle.digest("SHA-256",e));return Array.from(t,n=>n.toString(16).padStart(2,"0")).join("")}async function Cy(e,t){const n=Oc(t.audio);if(t.origin!=="local"||!n)throw new Error("it isn't a local sound");let a;try{a=await e.read(n)}catch{throw new Error(`${n} isn't in ${e.name} any more`)}const r=await a.arrayBuffer();if(await Ty(r)!==t.sha256)throw new Error("the file isn't the one the local Library lists");return r}const Ny="nyx-local-library",ro="handles",mr="folder";function Fy(){return new Promise((e,t)=>{const n=indexedDB.open(Ny,1);n.onupgradeneeded=()=>n.result.createObjectStore(ro),n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}function gr(e,t){return Fy().then(n=>new Promise((a,r)=>{const o=t(n.transaction(ro,e).objectStore(ro));o.onsuccess=()=>a(o.result),o.onerror=()=>r(o.error)}).finally(()=>n.close()))}function zy(){return typeof indexedDB>"u"?{get:async()=>null,set:async()=>{},clear:async()=>{}}:{get:()=>gr("readonly",e=>e.get(mr)).then(e=>e??null),set:e=>gr("readwrite",t=>t.put(e,mr)),clear:()=>gr("readwrite",e=>e.delete(mr))}}function Py(){const e=globalThis;return typeof e.showDirectoryPicker=="function"?e.showDirectoryPicker.bind(globalThis):null}class By{st={status:"none"};folder=null;handle=null;picker;handles;listeners=[];constructor(t={}){this.picker=t.picker===void 0?Py():t.picker,this.handles=t.handles??zy()}get state(){return this.st}get lib(){return this.st.status==="ready"?this.st.lib:null}get canRemember(){return!!this.picker}onChange(t){this.listeners.push(t)}set(t){this.st=t;for(const n of this.listeners)n()}async load(t,n){this.set({status:"opening",name:t.name});try{const a=await Ly(t);return this.folder=t,this.set({status:"ready",name:t.name,lib:a,remembered:n}),!0}catch(a){return this.folder=null,this.set({status:"error",message:a.message}),!1}}async restore(){if(!this.picker)return;let t=null;try{t=await this.handles.get()}catch{return}if(!t)return;this.handle=t,(await t.queryPermission?.({mode:"read"}).catch(()=>"prompt")??"granted")==="granted"?await this.load(fr(t),!0):this.set({status:"reconnect",name:t.name})}async reconnect(){const t=this.handle;return t?(await t.requestPermission?.({mode:"read"}).catch(()=>"denied")??"granted")!=="granted"?(this.set({status:"reconnect",name:t.name}),!1):this.load(fr(t),!0):this.pick()}async pick(){if(!this.picker)return!1;let t;try{t=await this.picker({mode:"read",id:"nyx-local-library"})}catch(a){return a.name==="AbortError"||this.set({status:"error",message:`The folder couldn't be opened: ${a.message}`}),!1}const n=await this.load(fr(t),!0);return n&&(this.handle=t,await this.handles.set(t).catch(()=>{})),n}async openFiles(t){const n=Sy(t);return n?this.load(n,!1):(this.set({status:"error",message:`That folder has no ${wt}. Open the folder the sample picker exported.`}),!1)}async forget(){this.folder=null,this.handle=null,await this.handles.clear().catch(()=>{}),this.set({status:"none"})}bytes(t){return this.folder?Cy(this.folder,t):Promise.reject(new Error("its local Library folder isn't open. Open or reconnect it"))}}const Dy="nyx-limiter",ei={knee:.6,ceiling:.944,range:4,points:8193};function Oy(e,{knee:t,ceiling:n}=ei){const a=Math.abs(e);if(a<=t)return e;const r=n-t;return Math.sign(e)*(t+r*Math.tanh((a-t)/r))}function qy({range:e,points:t}=ei){const n=new Float32Array(t);for(let a=0;a<t;a++)n[a]=Oy((2*a/(t-1)-1)*e);return n}function Iy(e){const t=e.createGain();t.gain.value=1/ei.range;const n=e.createWaveShaper();return n.curve=qy(),n.oversample="none",t.connect(n),{input:t,output:n}}const Ys="nyx-picker-bridge",Ks=1,Ry=3e3,_y=64*1024*1024,jy=new Set(["127.0.0.1","localhost","[::1]"]);function Hy(e){const t=new URLSearchParams(e).get("picker");if(!t)return null;let n;try{n=new URL(t)}catch{return null}return n.protocol!=="http:"||!jy.has(n.hostname)||!n.port||n.username||n.password||t.replace(/\/$/,"")!==n.origin?null:n.origin}function Wy(e){const t=e&&typeof e=="object"&&!Array.isArray(e)?e:{};if(t.kind!=="nyx-picker-kit")throw new Error("not a picker kit");const n=Array.isArray(t.sounds)?t.sounds:[];if(!n.length)throw new Error("the kit is empty");if(n.length>Q)throw new Error(`more than ${Q} sounds`);const a=new Set,r=[];for(const l of n){const c=l&&typeof l=="object"?l:{},d=c.pad;if(typeof d!="number"||!Number.isInteger(d)||d<1||d>Q||a.has(d))throw new Error("a sound has no pad of its own");const u=Dc({sounds:[c]},"sample-picker").sounds[0];if(!u)throw new Error(`pad ${d}'s sound isn't complete`);a.add(d),r.push({pad:d-1,sound:u})}const o=typeof t.id=="string"?t.id.slice(0,80):"",s=typeof t.name=="string"&&t.name.trim()?t.name.trim().slice(0,80):"Sample picker";return{id:o,name:s,sounds:r}}function Uy(e,t,n){if(n==="replace"){const o=[];for(let s=0;s<Q;s++)e[s]&&o.push(s);return{to:[...t],replaced:o,clear:!0}}const a=new Set;for(let o=0;o<Q;o++)e[o]||a.add(o);const r=t.map(o=>a.delete(o)?o:-1);for(let o=0;o<r.length;o++){if(r[o]!==-1)continue;const s=[...a].sort((l,c)=>l-c)[0];if(s===void 0)break;a.delete(s),r[o]=s}return{to:r,replaced:[],clear:!1}}function oo(e){const t=[...e].sort((n,a)=>n-a).map(n=>String(n+1));return t.length>1?`${t.slice(0,-1).join(", ")} and ${t[t.length-1]}`:t[0]??""}function Gy(e,t,n){const a=t.to.filter(d=>d>=0),r=t.to.length-a.length,o=a.length,s=`${o===1?"pad":"pads"} ${oo(a)}`,l=[],c=t.clear&&t.replaced.length>0;if(c){l.push(`This clears all 16 pads in NYX and loads your picker kit onto ${s}; the other pads stay empty.`);const d=t.replaced.map(u=>`${u+1} (${n(u)})`).join(", ");l.push(`Gone: pad${t.replaced.length===1?"":"s"} ${d}. Undo brings all 16 back as they were.`)}else if(l.push(`From the sample picker on this computer, onto ${s}.`),t.replaced.length){const d=t.replaced.map(u=>`${u+1} (${n(u)})`).join(", ");l.push(`Replaces pad${t.replaced.length===1?"":"s"} ${d}. Undo brings ${t.replaced.length===1?"it":"them"} back.`)}return r&&l.push(`${r} won't fit: no empty pads left.`),e.sounds.some(d=>d.sound.licenseStatus==="personal")&&l.push("Some are for personal use only."),l.push("The pattern stays."),{title:c?"Replace everything in NYX?":`Load ${o} sound${o===1?"":"s"} from the picker?`,body:l.join(" ")}}async function Yy(e){const t=new Uint8Array(await crypto.subtle.digest("SHA-256",e));return Array.from(t,n=>n.toString(16).padStart(2,"0")).join("")}async function Ky(e,t,n,a){const r=p=>({ok:!1,placed:[],left:[],message:p}),o=Uy(a.filled(),e.sounds.map(p=>p.pad),t),s=e.sounds.flatMap((p,h)=>{const m=o.to[h]??-1;return m>=0?[{k:p,to:m}]:[]}),l=e.sounds.flatMap((p,h)=>(o.to[h]??-1)<0?[p.pad+1]:[]);if(!s.length)return{...r("Nothing loaded: NYX has no empty pads."),left:l};if(!await a.ask(Gy(e,o,a.padName)))return{...r("Not loaded: cancelled in NYX."),left:l};const c=[];try{for(const{k:p,to:h}of s){const m=n.get(p.pad+1);if(!m)throw new Error(`pad ${p.pad+1}'s audio is missing`);if(await Yy(m)!==p.sound.sha256)throw new Error(`pad ${p.pad+1}'s audio isn't the file named`);const{data:g,rate:w}=await a.decode(p.sound,m);c.push({index:h,sound:p.sound,data:g,rate:w})}}catch(p){return{...r(`Not loaded: ${p.message}. NYX's pads are as they were.`),left:l}}await a.place(c,o.clear);const d=s.map(({k:p,to:h})=>({from:p.pad+1,to:h+1})),u=l.length?` ${l.length} didn't fit (no empty pads).`:"";return{ok:!0,placed:d,left:l,message:o.clear&&o.replaced.length?`Replaced everything in NYX: pad${d.length===1?"":"s"} ${oo(s.map(p=>p.to))} loaded, the others empty.`:`Loaded onto NYX pad${d.length===1?"":"s"} ${oo(s.map(p=>p.to))}.${u}`}}function Xy(e){return Object.prototype.toString.call(e)==="[object ArrayBuffer]"}function wd(e,t){const n=Wy(e),a=t&&typeof t=="object"?t:{},r=new Map;for(const{pad:o}of n.sounds){const s=a[String(o+1)];if(!Xy(s)||s.byteLength>_y)throw new Error(`pad ${o+1}'s audio is missing or too big`);r.set(o+1,s instanceof ArrayBuffer?s:new Uint8Array(s).slice().buffer)}return{kit:n,audio:r}}class Vy{constructor(t){this.o=t}last="";busy=!1;start(){return this.o.self.addEventListener("message",t=>void this.onMessage(t)),this.o.self.setInterval(()=>this.update(!0),Ry),this.update(!0),this}update(t=!1){const n=this.o.pads(),a=JSON.stringify(n);!t&&a===this.last||(this.last=a,this.post({type:"state",pads:n,busy:this.busy}))}post(t){try{this.o.picker.postMessage({nyx:Ys,v:Ks,...t},this.o.origin)}catch{}}async onMessage(t){if(t.origin!==this.o.origin||t.source!==this.o.picker)return;const n=t.data;if(!n||typeof n!="object"||n.nyx!==Ys||n.v!==Ks)return;if(n.type==="hello")return this.update(!0);if(n.type!=="kit")return;const a=typeof n.id=="string"?n.id.slice(0,80):"",r=c=>this.post({type:"result",id:a,...c});if(this.busy)return r({ok:!1,placed:[],left:[],message:"NYX is still loading the last kit."});let o,s;try{({kit:o,audio:s}=wd(n.kit,n.audio))}catch(c){return r({ok:!1,placed:[],left:[],message:`Not loaded: ${c.message}.`})}const l=n.mode==="fill"?"fill":"replace";this.busy=!0;try{r(await this.o.receive(o,l,s))}catch(c){r({ok:!1,placed:[],left:[],message:`Not loaded: ${c.message}.`})}finally{this.busy=!1,this.update(!0)}}}function Qy(e,t){const n=Hy(e.location.search),a=e.opener;return!n||!a||e.parent!==e?null:new Vy({self:e,picker:a,origin:n,...t}).start()}function Jy(e){let t=!1;return{pads:()=>e.pads(),async receive(n,a,r){const o=c=>({ok:!1,placed:[],left:[],message:c});if(t)return o("NYX is still loading the last kit.");let s,l;try{({kit:s,audio:l}=wd(JSON.parse(JSON.stringify(n??null)),r))}catch(c){return o(`Not loaded: ${c.message}.`)}t=!0;try{return await e.receive(s,a==="fill"?"fill":"replace",l)}catch(c){return o(`Not loaded: ${c.message}.`)}finally{t=!1}}}}const Zy="nyx",e0=1;function vd(e){const t={nyx:1,...jo(e)},n=Rc(e.pads);if(n.length&&(t.credits=n),Array.isArray(e.slots)){const a=Array.from({length:Vt},(o,s)=>{const l=e.slots?.[s];return l?mg(l):null}),r=typeof e.active=="number"&&a[e.active]?e.active:null;Object.assign(t,{slots:a,active:r})}return t}function xd(e){return kd(e),xa(e)}function t0(e){kd(e);const t=e;if(!Array.isArray(t.slots))return null;const n=t.slots,a=Array.from({length:Vt},(s,l)=>{const c=n[l];return c&&typeof c=="object"&&!Array.isArray(c)?xa(c):null}),r=t.active,o=typeof r=="number"&&Number.isInteger(r)&&r>=0&&r<Vt&&a[r]?r:null;return{slots:a,active:o}}function kd(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Not a NYX pattern.");const t=e.nyx;if(t!==1)throw new Error(`Not a NYX pattern${typeof t=="number"?` (version ${t})`:""}.`)}function ti(){try{return globalThis.localStorage??null}catch{return null}}function n0(e,t,n=ti()){let a;try{a=t?.storageKey?.(e)}catch{a=void 0}if(typeof a!="string"||!a||a===e)return e;try{if(t?.legacyCopy!==!1&&n&&n.getItem(a)===null){const r=n.getItem(e);r!==null&&n.setItem(a,r)}}catch{}return a}const a0="nyx.state",$d="nyx.scene-samples",r0=/^[0-9a-f]{16,64}$/;function Ad(e){try{const t=JSON.parse(e?.getItem($d)??"[]");return Array.isArray(t)?t.filter(n=>typeof n=="string"&&r0.test(n)):[]}catch{return[]}}function o0(e,t=ti()){if(!t)return;const n=new Set;for(const r of[e,...e.slots??[]])for(const o of r?.pads??[])o.sample&&n.add(o.sample);if(!n.size)return;const a=[...Ad(t).filter(r=>!n.has(r)),...n].slice(-2048);try{t.setItem($d,JSON.stringify(a))}catch{}}function i0(e,t=ti()){const n=Ln(e);if(!t)return n;try{for(let a=0;a<t.length;a++){const r=t.key(a);if(r?.startsWith(a0))try{for(const o of Ln(Gc(JSON.parse(t.getItem(r)??"null"))))n.add(o)}catch{}}}catch{return null}for(const a of Ad(t))n.add(a);return n}const s0="NYX Sampler",Dn="nyx",we=Ra(),X=cy(Dn,we),Ed=n0(sy("nyx.state",we),X),ni=.15,E=gg(Ed),Y=new Ub(we>1?`nyx-${we}`:"nyx"),ja=()=>bg(Ed,E),dt=()=>{const e=i0(E);if(e)for(const t of ge?.before??[])t.pad.sample&&e.add(t.pad.sample);if(e)for(const t of oi)e.add(t);e&&Y.prune(e)};let Ae=!1,it=0,me=null,Zt=!1,bt="",F="";const $a=new Map,io=new Map,l0=1600,c0=96,Xn=new Map;function Sd(e){$a.has(e.hash)||$a.set(e.hash,Hs(e.data)),io.has(e.hash)||io.set(e.hash,Hs(e.data,l0))}function d0(e){if(!e.sample)return;const t=io.get(e.sample);if(!t||e.start<=0&&e.end>=1)return $a.get(e.sample);const n=`${e.sample}:${e.start}:${e.end}`,a=Xn.get(n);if(a)return a;const r=t.length/2,o=Math.max(0,Math.min(r-1,Math.floor(e.start*r))),s=Math.max(o+1,Math.min(r,Math.ceil(e.end*r))),l=[],c=Math.min(c0,s-o);for(let d=0;d<c;d++){const u=o+Math.floor((s-o)*d/c),p=Math.max(u+1,o+Math.floor((s-o)*(d+1)/c));let h=0,m=0;for(let g=u;g<p;g++)h=Math.min(h,t[g*2]??0),m=Math.max(m,t[g*2+1]??0);l.push(h,m)}return Xn.size>256&&Xn.clear(),Xn.set(n,l),l}let Md=[];const at=new Jo;let en=new Map;const Ie=new bu({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let N=null,Wt=null;const u0=new Lu({...dy(),app:ly(s0,we),version:"0.1.0",clock:Ie,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const e=N?.state;return e==="running"?"running":e==="suspended"?"suspended":e?"none":"needs-gesture"},startGate:()=>Wt?.whenSettled?.()??null}),Nn=e=>e+(Wt?.offset??0),z=()=>Ie.transport,tn=()=>z().isPlayingAt(te()),kt=()=>tn()&&!Ae;let br=null,W=null;const Qe=X?hb(e=>W?.port.postMessage(e),(e,t,n)=>{const a=P(e);return a.sample?Dg(a,Y.info(a.sample),z().bpm,n,t,ze.stretchedFor(e)):null}):null,Aa=X?Kb({recall:e=>gi(e,"recall",!1),now:te,timeAt:e=>z().running?z().timeAt(e):null}):null,ke=gy(X,e=>W?.port.postMessage(e),Qe?{notes:(e,t)=>Qe.notes(e,t),release:(e,t)=>Qe.release(e,t),off:(e,t)=>{Qe.off(e,t),Aa?.off(e,t)},controls:(e,t)=>Aa?.controls(e,t)}:null);Qe&&setInterval(()=>{const e=z();e.running&&Qe.prune(e.beatAt(te()))},5e3);const Re=X&&typeof X.notesOut=="function"?pb({send:e=>X.notesOut?.(e)===!0,ctx:X.ctx,mapper:{toSharedTime:e=>e-(Wt?.offset??0)},transport:z,win:window,nameOf:e=>P(e).sample?P(e).name:null,ctxOrigin:(()=>{try{return window.parent.performance.timeOrigin}catch{return performance.timeOrigin}})()}):null,Ea=[];let Sa=!1,Te=null,$t=null,Xs=null;const Vs=new Set;function ce(){return Xs??=(async()=>{X?(N=X.ctx,br=X.output,Wt=X.mapper??new Ei(X.ctx)):(N=new AudioContext({latencyHint:"interactive"}),br=N.destination,Wt=new Ei(N)),Wt.start();try{await N.audioWorklet.addModule(vb),await N.audioWorklet.addModule(ib)}catch{return F="Audio could not start (the sampler's worklet did not load). Reload to try again.",T(),!1}W=new AudioWorkletNode(N,"nyx-sampler",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]}),W.port.onmessage=n=>p0(n.data),Te=up(N,{moduleUrl:uy()??fp,bpm:z().bpm,slots:3,state:no(E.hacks)}),so=no(E.hacks),$t=new GainNode(N,{gain:E.master}),W.connect(Te.input);const e=new AudioWorkletNode(N,Dy,{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),t=Iy(N);Te.output.connect($t).connect(e).connect(t.input),t.output.connect(br),hp(Te,Ie,{toAudioTime:Nn,now:te});for(const n of Ln(E))await St(n);return Mt(),ke?.resend(),Sa&&W.port.postMessage({type:"hitlog",on:!0}),nn(),!0})(),Xs}async function St(e){const t=await Y.get(e);return t?(Sd(t),W&&!Vs.has(e)&&(Vs.add(e),W.port.postMessage({type:"sample",hash:e,channels:t.data.map(n=>n.slice()),rate:t.sampleRate})),t):null}function p0(e){if(e.type==="hitlog"&&e.hits&&Sa){for(const t of e.hits)Ea.length<2e4&&Ea.push(t);return}e.type!=="pos"||!e.voices||(Md=e.voices,at.report(e.voices,performance.now()),en=new Map(e.voices.map(([t,n,a,r])=>{const o=Zb(r)?ze.cache.byId(r):void 0,s=o?Y.info(o.job.sample):void 0;return o&&s?[t,(o.job.from+n/o.frames*(o.job.to-o.job.from))/s.frames]:[t,n/Math.max(1,a)]})))}let oa=null,h0=0;const gn=new Map,Ld=[],f0=.25;function m0(){if(oa)return oa;const e=new Worker(new URL("/nyx/assets/stretch-worker-DVLOsvIo.js",import.meta.url),{type:"module"});return e.onmessage=t=>{const n=t.data;gn.get(n.id)?.(n),gn.delete(n.id)},e.onerror=t=>{console.error("NYX stretch worker",t.message);for(const n of gn.values())n({error:t.message||"worker failed"});gn.clear()},oa=e,e}async function Td(e){const t=await Y.get(e.sample);if(!t)return null;const n=Math.ceil(f0*e.sampleRate),a=Math.max(0,e.from-n),r=Math.min(t.frames,e.to+n),o=t.data.map(c=>c.slice(a,r)),s=++h0,l=m0();return new Promise(c=>{gn.set(s,d=>{if(d.error||!d.channels){console.error("NYX stretch",d.error),c(null);return}typeof d.ms=="number"&&Ld.push(Math.round(d.ms)),c(d.channels)}),l.postMessage({id:s,channels:o,sampleRate:e.sampleRate,from:e.from-a,to:e.to-a,frames:e.frames,semitones:e.semitones},o.map(d=>d.buffer))})}const ze=new ty({run:Td,deliver(e,t){W?.port.postMessage({type:"sample",hash:e.sample,channels:t,rate:e.job.sampleRate},t.map(n=>n.buffer))},drop(e){W?.port.postMessage({type:"drop",hash:e.sample})},changed(){ze.failed&&!F&&(F="Keep pitch couldn't start in this browser: fitted pads change speed and pitch instead."),Mt(),T()}});function Mt(){if(!W)return;const e=z().bpm,t=n=>Y.info(n);ze.plan(E.pads,t,e),W.port.postMessage({type:"program",program:Og(E,t,e,n=>ze.stretchedFor(n))})}let Qs="";function nn(e=!1){if(!W)return;const t=z(),n=tn(),a=kt();let r=0,o=t.bpm;if(t.running||t.isPlayingAt(te())){const l=Math.max(0,t.beatAt(te())),c=t.timeAt(l);o=60/(t.timeAt(l+1)-c),r=Nn(c)-l*60/o}const s=JSON.stringify([n,a,Math.round(r*2e3),o,it]);!e&&s===Qs||(Qs=s,W.port.postMessage({type:"clock",clock:{playing:n,pattern:a,zero:r,bpm:o,join:it}}))}let so=null;function Cd(){if(!Te)return;const e=no(E.hacks),t=ab(so,e);if(so=e,t.whole)Te.setState(e);else for(const[n,a,r]of t.params)Te.setParam(n,a,r)}let $n=null;function g0(){if($n){const t=$n;J(()=>{E.lanes=t}),F="Pattern back.",T();return}const e=structuredClone(E.lanes);e.some(t=>t.steps.some(n=>n.on)||t.mute||t.solo||t.length!==ne)&&(J(()=>{E.lanes=E.lanes.map(()=>qa())}),me=null,$n=e,F="Pattern cleared: press Undo to bring it back.",T())}function J(e){$n=null;const t=si(!1);e(),t&&dt(),E.active!==null&&(Zt=!0),bt="",ja(),Mt(),Cd(),T()}const P=e=>E.pads[e]??Ee(e),De=e=>E.lanes[e]??qa(),Nd=()=>P(E.selected);function st(e,t=E.selected){J(()=>e(P(t)))}async function b0(e,t){const n=P(e);if(n.normalize){st(r=>{r.normalize&&(r.normalize.on=t)},e);return}if(!n.sample)return;let a;if(n.provenance)a={on:t,gainDb:0};else{const r=Y.held(n.sample)??await Y.get(n.sample);if(!r)return;a={...Xt(r.data,r.sampleRate),on:t}}st(r=>{r.sample===n.sample&&(r.normalize=a)},e)}function Ma(e,t,n){J(()=>{const a=De(e).steps[t];a&&n(a)})}function Fe(e,t=!0,n=!1){E.selected=Math.max(0,Math.min(Q-1,e)),me&&me.lane!==E.selected&&(me=null),t&&Je(E.selected,null,!1,n),ja(),T()}function Js(e,t,n,a){if(!W)return!1;const r=P(e),o=r.sample?Y.info(r.sample):void 0,s=r.sample?ad(r,o,z().bpm,t,ze.stretchedFor(e)):null;return s&&(W.port.postMessage({type:"play",pad:e,hit:s,hold:n,manual:!0,toggle:a}),a&&at.has(e)?at.stopped(e):at.posted(e,yb(s,o?.sampleRate??48e3),performance.now())),!0}async function Je(e,t=null,n=!1,a=!1){N?.state==="running"&&Js(e,t,n,a)||!await ce()||!N||!W||(N.state!=="running"&&await N.resume().catch(()=>{}),Js(e,t,n,a))}let ia=Hg();const At=new Map;function Ha(e){return e.kind?{kind:e.kind,bpm:e.bpm}:e.origin==="local"?Ko(e.title):{kind:"",bpm:0}}function ai(e,t){At.delete(e);const n=P(e),a=n.sample?Y.info(n.sample):void 0;if(!ia||!t||!n.sample||!a)return;const r=_g(a.frames/a.sampleRate,t,z().bpm,Yo);r&&(At.set(e,{sample:n.sample,fit:r,before:{fit:n.fit,keepPitch:n.keepPitch}}),n.fit=r.bars,n.keepPitch=!0)}function y0(e){const t=At.get(e);cd(t,P(e))&&(At.delete(e),st(n=>Ug(t,n),e),F=`Fit undone: ${lt(e)} plays as recorded.`,T())}async function Lt(e,t,n,a,r=!0,o=null,s=null,l=null,c=0){const{sample:d,saved:u}=await Y.put(t,n);await St(d.hash),J(()=>{const p=P(e);p.sample=d.hash,p.provenance=o,p.normalize=l?{...l}:null,p.offsetDb=c,p.name=a.slice(0,24)||`Pad ${e+1}`,p.start=0,p.end=1,p.slices=0,p.cuts=[],p.fit=0,p.keepPitch=!0,p.follow=null,p.note=0,ai(e,s)}),F=u?"":"Kept until you reload: this browser has no file storage here.",dt(),r&&Je(e)}async function ri(e,t=E.selected){if(/\.json$/i.test(e.name)||e.type==="application/json"){await D0(e);return}if(!await ce()||!N)return;let n;try{n=await N.decodeAudioData(await e.arrayBuffer())}catch{F=`Couldn't read ${e.name}: not an audio file this browser can decode.`,T();return}const{data:a,trimmed:r}=gd(n);await Lt(t,a,n.sampleRate,e.name.replace(/\.[^.]+$/,""),!0,null,Ko(e.name),Xt(a,n.sampleRate)),r&&(F=`${e.name} was cut to its first minute.`,T())}const oi=new Set;let ge=null;function lt(e,t=P(e).name){const n=`Pad ${e+1}`;return t===n?n:`${n} (${t})`}async function ii(e,t,n=""){return P(e).sample?go({title:`Replace ${lt(e)}?`,body:t==="Grab"?"Grab replaces its sound, its slices and that lane's steps. Undo brings them back.":t==="Sent"?`${n} replaces its sound, its slices and that lane's steps. Undo brings them back.`:"The take replaces its sound, its slices and that lane's steps when it lands. Undo brings them back.",confirmLabel:"Replace",cancelLabel:"Cancel"}):!0}function _e(e){const t=Ro(E,e);return t.pad.sample&&oi.add(t.pad.sample),t}function ut(e,t,n){si();const a=Array.isArray(e)?e:[e],r=a[0],o=lm({message:n??(r?.pad.sample?`${t}: replaced ${lt(r.index,r.pad.name)}.`:`${t} onto Pad ${(r?.index??0)+1}.`),actionLabel:"Undo",onAction:()=>void li(),onClose:()=>{ge&&(ge.toast=null)}}),s=o.el.querySelector("button");s instanceof HTMLElement&&R(s,O("grab-undo"),s),ge={before:a,what:t,toast:o};for(const l of a)l.pad.sample&&oi.delete(l.pad.sample)}function si(e=!0){if(!ge)return!1;const t=ge;return ge=null,t.toast?.close(),e&&dt(),!0}async function li(){const e=ge;if(!e)return!1;ge=null,e.toast?.close();for(const n of e.before)n.pad.sample&&await St(n.pad.sample);J(()=>{for(const n of e.before)lg(E,n)}),me&&e.before.some(n=>n.index===me?.lane)&&(me=null);const t=e.before[0];return F=e.before.length===1&&t?`Undone: ${lt(t.index)} is back as it was.`:`Undone: pads ${e.before.map(n=>n.index+1).join(", ")} are back as they were.`,dt(),T(),!0}let yr=null;function Fd(){return yr??=fetch(Em,{mode:"cors"}).then(e=>{if(!e.ok)throw new Error(`Library: HTTP ${e.status}`);return e.json()}).then(e=>Lm(e)).catch(e=>{throw yr=null,e}),yr}const Wa=new By;Wa.restore();const zd=e=>`${e.id}#${e.sha256}`,hn=new Map;function w0(e){const t=zd(e);let n=hn.get(t);return!n&&e.origin==="local"&&(n=Wa.bytes(e),n.catch(()=>hn.delete(t)),hn.set(t,n)),n||(n=(async()=>{const a=await fetch(e.audio,{mode:"cors"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const r=await a.arrayBuffer(),o=new Uint8Array(await crypto.subtle.digest("SHA-256",r));if(Array.from(o,l=>l.toString(16).padStart(2,"0")).join("")!==e.sha256)throw new Error("the file isn't the one the Library lists");return r})(),n.catch(()=>hn.delete(t)),hn.set(t,n)),n}const wr=new Map;async function Pd(e){if(!await ce()||!N)throw new Error("NYX's audio didn't start");const t=N,n=zd(e);let a=wr.get(n);return a||(a=w0(e).then(r=>t.decodeAudioData(r.slice(0))),a.catch(()=>wr.delete(n)),wr.set(n,a)),a}const Bd=e=>10**(e/20);async function Dd(e){return Od(await Pd(e),e)}function Od(e,t){const{data:n}=gd(e),a=Bd(t.measures.gain);for(const r of n)for(let o=0;o<r.length;o++)r[o]=(r[o]??0)*a;return{data:n,rate:e.sampleRate}}let Ut=null;function qd(){const e=Ut;Ut=null;try{e?.src.stop()}catch{}}async function Id(e){qd();let t;try{t=await Pd(e)}catch(o){ci(`Couldn't play ${e.title}: ${o.message}.`);return}if(!N||!$t)return;N.state!=="running"&&await N.resume().catch(()=>{});const n=new AudioBufferSourceNode(N,{buffer:t}),a=new GainNode(N,{gain:Bd(e.measures.gain)*Ee(0).level});n.connect(a).connect($t);const r={src:n,id:e.id};Ut=r,await new Promise(o=>{n.onended=()=>{a.disconnect(),Ut===r&&(Ut=null),o()},n.start()})}function ci(e){F=e,T()}async function Ua(e,t,n=E.selected){let a;try{a=await Dd(e)}catch(o){return ci(`Couldn't load ${e.title}: ${o.message}.`),!1}const r=_e(n);return await Lt(n,a.data,a.rate,Oa(e.title),!0,Io(e,t),Ha(e),Qm),F=`${e.title} on Pad ${n+1}: ${e.creator}, ${Po(e.license,e.licenseStatus,e.permission)}${qc(e)?" (personal use)":""}.`,ut(r,"Library"),T(),!0}async function v0(e,t){if(!await ce())return!1;const n=await Promise.all(e.map(l=>Dd(l.sound).then(c=>({ok:!0,...c}),c=>({ok:!1,error:`${l.sound.title}: ${c.message}`})))),a=n.flatMap(l=>l.ok?[]:[l.error]);if(a.length)return ci(`The kit couldn't load (${a.join("; ")}). The pads are as they were.`),!1;const r=[];for(const l of n){if(!l.ok)continue;const c=await Y.put(l.data,l.rate);await St(c.sample.hash),r.push(c)}for(let l=0;l<e.length;l++)_e(l);let o=[];J(()=>{o=_o(E,e.map((l,c)=>({sample:r[c]?.sample.hash??"",name:Oa(l.sound.title),provenance:Io(l.sound,t),hat:l.slot.role==="hat"}))),e.forEach((l,c)=>ai(c,Ha(l.sound)))});const s=e.flatMap(l=>l.note?[l.note]:[]);return F=`Kit on pads 1–${e.length}${t.trim()?` for "${t.trim()}"`:""}; the pattern stays.${s.length?` ${s.join(" ")}`:""}${r.some(l=>!l.saved)?" Kept until you reload: this browser has no file storage here.":""}`,ut(o,"Build kit",`Build kit: pads 1–${e.length} replaced.`),dt(),T(),!0}async function x0(e,t){const n=[];for(const c of e){const d=await Y.put(c.data,c.rate);await St(d.sample.hash),n.push(d)}if(t)for(let c=0;c<Q;c++)_e(c);else for(const c of e)_e(c.index);const a=e.map((c,d)=>({index:c.index,sample:n[d]?.sample.hash??"",name:Oa(c.sound.title),provenance:Io(c.sound,""),hat:!1}));let r=[];J(()=>{r=t?cg(E,a):_o(E,a);for(const c of e)ai(c.index,Ha(c.sound))});const o=e.map(c=>c.index+1).join(", "),s=t&&r.some(c=>c.pad.sample),l=n.some(c=>!c.saved)?" Kept until you reload: this browser has no file storage here.":"";F=s?`From the sample picker: everything replaced, pad${e.length===1?"":"s"} ${o} loaded; the pattern stays.${l}`:`From the sample picker: pad${e.length===1?"":"s"} ${o}; the pattern stays.${l}`,ut(r,"Sample picker",s?"Sample picker: replaced everything in NYX.":`Sample picker: pad${e.length===1?"":"s"} ${o} loaded.`),dt(),T()}const Rd={pads:()=>E.pads.map((e,t)=>({pad:t+1,name:e.name,filled:!!e.sample})),receive:(e,t,n)=>Ky(e,t,n,{filled:()=>Array.from({length:Q},(a,r)=>!!E.pads[r]?.sample),padName:a=>P(a).name,ask:a=>(X?.reveal?.(),go({...a,confirmLabel:"Load",cancelLabel:"Cancel"})),decode:async(a,r)=>{if(!await ce()||!N)throw new Error("NYX's audio didn't start");return Od(await N.decodeAudioData(r),a)},place:x0})},k0=X?null:Qy(window,Rd),$0=X?.pickerTarget?.(Jy(Rd))??null;function di(e){const t=P(e).provenance,n=t?ye.catalogFor(t.origin):null;if(!t||!n)return[];const a=new Set(E.pads.flatMap((r,o)=>o!==e&&r.provenance?[r.provenance.id]:[]));return Hm(n,t,a).map(r=>r.sound)}const ye=new Ey({catalog:Fd,target:()=>({index:E.selected,title:lt(E.selected)}),pads:()=>E.pads,preview:Id,stopPreview:qd,load:(e,t)=>Ua(e,t),chop:(e,t)=>L0(e,t),buildKit:v0,close:()=>ct(!1),local:Wa}),ui=new by(typeof Worker>"u"?null:()=>new Worker(new URL("/nyx/assets/chop-worker-CbuieNQN.js",import.meta.url),{type:"module"})),Ga=new Map;async function A0(){const e=E.selected,t=P(e);if(!t.sample)return null;const n=await Y.get(t.sample);if(!n)return null;const a=Math.floor(t.start*n.frames),r=Math.min(n.frames,Math.ceil(t.end*n.frames)),o=Ga.get(e),s=o&&o.sample===t.sample?o:null;return{sample:t.sample,stem:qb(t.name),data:n.data,sampleRate:n.sampleRate,from:a,to:r,pad:e,tempo:zb({seconds:(r-a)/n.sampleRate,fit:t.fit,given:s?.bpm??0,givenFrom:s?.from,name:t.name,studioBpm:z().bpm})}}async function E0(e,t,n){if(!await ce()||!N||!W)return;N.state!=="running"&&await N.resume().catch(()=>{}),await St(e.sample);const r={...P(e.pad),start:0,end:1,slices:0,cuts:[],fit:0,tune:0,fine:0,dir:"fwd",mode:"oneshot"},o=ad(r,Y.info(e.sample),z().bpm,null);o&&W.port.postMessage({type:"play",pad:e.pad,hit:{...o,from:t,to:n}})}function S0(e,t,n){const a=Y.info(e.sample);if(!a)return;const r=Math.min(t.cuts.length-1,Q-n.first);if(r<1)return;const o=Array.from({length:r},(d,u)=>_e(n.first+u)),s=P(e.pad),l={provenance:s.provenance?structuredClone(s.provenance):null,normalize:s.normalize?{...s.normalize}:null,offsetDb:s.offsetDb,level:s.level,note:s.note},c=n.choke?Ib(E.pads,n.first,r):0;J(()=>{Rb(E,t,{sample:e.sample,frames:a.frames,sampleRate:e.sampleRate,first:n.first,stem:e.stem,source:l,choke:c,playBack:n.playBack?{bpm:n.bpm}:null});for(let d=0;d<r;d++)At.delete(n.first+d),Ga.delete(n.first+d)}),Et.close(),ut(o,"Chop",`Chopped ${e.stem} onto pads ${n.first+1}–${n.first+r}.`),Fe(n.first,!1),T()}const Et=new wy({source:A0,analysis:e=>ui.analysis(e.sample,e.data,e.sampleRate,e.from,e.to),pads:()=>E.pads,audition:(e,t,n)=>void E0(e,t,n),apply:S0,close:()=>{Et.close(),T()}});async function On(){ye.isOpen&&ct(!1),await Et.open()&&(T(),Et.el.scrollIntoView?.({block:"nearest",behavior:"smooth"}))}async function M0(e){const t=E.selected,n=_e(t);await Yd(e);const a=P(t).sample;a&&(e.bpm>0&&Ga.set(t,{sample:a,bpm:e.bpm,from:"from the take"}),ut(n,`LUCY take ${e.id}`),await On())}async function L0(e,t){const n=E.selected;if(!await Ua(e,t,n))return;const a=P(n).sample,r=Ha(e);a&&r.bpm>0&&Ga.set(n,{sample:a,bpm:r.bpm,from:"from My samples"}),ct(!1),await On()}function ct(e=!ye.isOpen,t){e?ye.open(t):ye.closePanel(),T(),e?ye.focus():le.querySelector('[data-nc-section="pads"] [data-nc-id="library"]')?.focus()}const G={from:"master",bars:1,busy:!1};async function pi(){const e=ot();if(!e||G.busy||!await ce()||!N)return;const t=z();if(!t.running){F="Play first: Grab takes the bars that just played.",T();return}const n=G.bars,a=Math.floor(t.beatAt(te())/4)*4,r=a-4*n;if(r<0){F=`Grab needs ${n} whole bar${n===1?"":"s"} played first.`,T();return}const o=N.sampleRate,{from:s,to:l}=ry({from:Math.round(Nn(t.timeAt(r))*o),to:Math.round(Nn(t.timeAt(a))*o)},yd(e,G.from)),c=E.selected;if(G.busy=!0,T(),!await ii(c,"Grab")){G.busy=!1,T();return}const d=e.takeResult?await e.takeResult(G.from,s,l):{channels:await e.take(G.from,s,l)},u=d.channels;G.busy=!1;const p=e.sources().find(g=>g.id===G.from)?.name??G.from;if(!u){F="reason"in d&&d.reason==="gone"?`Those bars of ${p} are gone (the Studio keeps the last 20 seconds): Grab again.`:`${p} isn't kept that far back yet: let it play ${n} more bar${n===1?"":"s"}, then Grab again.`,T();return}let h=0;for(const g of u)for(const w of g)h=Math.max(h,Math.abs(w));if(h<1e-4){F=`${p} was silent for those ${n===1?"bar":"bars"}.`,T();return}const m=_e(c);await Lt(c,u,o,`${p} grab`,!0,null,null,null,-5),n===1?(J(()=>{const g=P(c);g.fit=1,g.keepPitch=!0,g.slices=16,g.cuts=[],g.decay=4;const w=De(c);w.length=ne;for(const f of w.steps)Object.assign(f,Bn(),{on:!0})}),F=`Grabbed a bar of ${p}: 16 slices, every step on. Move, mute or lock steps to remix it.`):(st(g=>{g.fit=n,g.keepPitch=!0},c),await lo(8,"transients",c),F=`Grabbed ${n} bars of ${p}, fitted to ${n} bars and sliced at the hits.`),ut(m,`Grabbed ${n===1?"a bar":`${n} bars`}`),T()}const Zs=240,T0=.25,L={phase:"idle",startBeat:0,pad:0,source:"master",rec:null,timer:0,lastBar:0,lastBarFrame:0,fromFrame:0,latency:0,bpm:120,warned:!1,label:""};function hi(e){const t=Math.floor(e/4)*4;return e-t<T0?t:t+4}function C0(e){const t=N?.sampleRate??48e3;return Math.round(Nn(z().timeAt(e))*t)}function _d(e){const t=N?.sampleRate??48e3;return L.fromFrame+Math.round((e-L.startBeat)*60/L.bpm*t)}function La(e=L.source){return ot()?.sources().find(t=>t.id===e)?.name??e}function fi(){L.phase==="idle"?N0():L.phase==="armed"?(L.phase="idle",F="",T()):L.phase==="rec"&&mi()}async function N0(){const e=ot();if(!e?.record){F="Take needs the Studio (reload it to update).",T();return}if(!await ce()||!N)return;const t=E.selected;if(await ii(t,"Take")&&L.phase==="idle"){if(L.source=G.from,L.pad=t,e.listen(L.source),!z().running){L.phase="armed",F="Take armed: starts with the music.",T();return}jd()}}function jd(){const e=ot();if(!e?.record||!N){L.phase="idle";return}const t=z();L.startBeat=Math.max(0,hi(t.beatAt(te()))),L.fromFrame=C0(L.startBeat),L.bpm=t.bpm,L.latency=yd(e,L.source);const n=e.record(L.source,L.fromFrame+L.latency);if(!n){L.phase="idle",F=`${La()} can't be recorded.`,T();return}L.rec=n,L.phase="rec",L.warned=!1,L.lastBar=L.startBeat,L.lastBarFrame=L.fromFrame,F=`Taking ${La()}: stop on any bar.`,window.clearInterval(L.timer),L.timer=window.setInterval(F0,200),T()}function F0(){if(L.phase!=="rec")return;const e=z();if(!e.running)return;const t=e.beatAt(te()),n=Math.floor(t/4)*4;n>L.lastBar&&(L.lastBar=n,L.lastBarFrame=_d(n));const a=240/Math.max(1,e.bpm),r=(Math.max(L.startBeat+4,hi(t))-L.startBeat)*60/Math.max(1,e.bpm);if(r+a>Zs){mi();return}!L.warned&&r>Zs-30&&(L.warned=!0,F="Take stops at four minutes: about 30 seconds left.");const o=Hd();o!==L.label&&(L.label=o,T())}function Hd(){if(L.phase==="armed")return"Armed: waits for Play";if(L.phase==="saving")return"Saving take…";if(L.phase!=="rec")return"Take";const e=z().beatAt(te());return e<L.startBeat?"Starts on the bar…":`Stop take · bar ${Math.floor((e-L.startBeat)/4)+1}`}async function mi(e=!1){const t=L.rec;if(L.phase!=="rec"||!t)return;window.clearInterval(L.timer);let n,a;e?(n=L.lastBar,a=L.lastBarFrame):(n=Math.max(L.startBeat+4,hi(z().beatAt(te()))),a=_d(n));const r=Math.round((n-L.startBeat)/4);if(L.rec=null,r<1){t.cancel(),L.phase="idle",F="The music stopped before a whole bar was taken.",T();return}L.phase="saving",T();try{await z0(t,a,r,n)}finally{L.phase="idle",T()}}async function z0(e,t,n,a){let r=null;try{r=await e.stop(t+L.latency)}catch(l){console.error("NYX take",l)}const o=La();if(!r?.[0]?.length){F=`The take from ${o} came back empty.`,T();return}let s=0;for(const l of r)for(const c of l)s=Math.max(s,Math.abs(c));if(s<1e-4){F=`${o} was silent for the whole take.`,T();return}try{await P0(r,n,a,o)}catch(l){console.error("NYX take",l),F=`The take from ${o} couldn't be kept (${l instanceof Error?l.message:String(l)}).`,T()}}async function P0(e,t,n,a){const r=L.pad,o=`${a} take`.slice(0,20),s=E.pads.filter(d=>d.name.startsWith(o)).length+1,l=_e(r);await Wd(r,e,N?.sampleRate??48e3,t,Math.round(L.startBeat/4),{name:`${o} ${s}`,endBeat:n,offsetDb:-5}),ut(l,`Took ${t===1?"a bar":`${t} bars`}`),F=t<=Mn?`${t} bar${t===1?"":"s"} of ${a} on ${P(r).name}: it loops every ${t===1?"bar":`${t} bars`}. Tap the pad to play it any time.`:`${t} bars of ${a} on ${P(r).name}. Longer than ${Mn} bars, so it plays from the pad (tap or hold it), not the grid.`,T()}async function Wd(e,t,n,a,r,o){await Lt(e,t,n,o.name,!1,null,null,o.normalize??null,o.offsetDb??0);const s=a<=Mn;J(()=>dg(E,e,a,r));const l=z(),c=o.endBeat;if(c!==void 0&&s&&l.running&&W&&N){const d=P(e),u=De(e).steps[0],p=u?Ia(d,0,u,Y.info(d.sample??""),l.bpm,!1,ze.stretchedFor(e)):null,m=l.beatAt(te()+ni)-c;if(p&&m>0&&m<4*a){const g=Math.round(m*60/l.bpm*n*p.rate);p.from+g<p.to-1&&W.port.postMessage({type:"play",pad:e,hit:{...p,from:p.from+g,attack:.005}})}}}let vr=!1;function Ud(){return E.pads.map((e,t)=>({id:String(t+1),name:lt(t),...e.sample?{filled:!0}:{}}))}async function Gd(e,t){const n=ug(t,E.pads.length);if(n<0)return{ok:!1,reason:"refused",message:`NYX has no pad ${t}.`};if(vr||L.phase!=="idle"&&L.pad===n)return{ok:!1,reason:"busy",message:`Pad ${n+1} is busy: try again in a moment.`};if(!await ce()||!N)return{ok:!1,reason:"refused",message:"NYX's audio didn't start."};vr=!0;try{const a=`${e.fromName}'s ${e.name}`;if(Fe(n,!1),X?.reveal?.(),T(),P(n).sample&&!await ii(n,"Sent",a))return F=`Kept ${lt(n)}: ${a} was not placed.`,T(),{ok:!1,reason:"cancelled"};const r=e.channels.map(c=>new Float32Array(c)),o=e.bars,s=_e(n),l=e.name.slice(0,24);return o!==void 0&&Number.isInteger(o)&&o>=1?(await Wd(n,r,e.sampleRate,o,0,{name:l,normalize:Xt(r,e.sampleRate)}),F=o<=Mn?`${a} on Pad ${n+1}: fitted to ${o===1?"a bar":`${o} bars`}, it loops every ${o===1?"bar":`${o} bars`}.`:`${a} on Pad ${n+1}: ${o} bars, so it plays from the pad, not the grid.`):(await Lt(n,r,e.sampleRate,l,!1,null,null,Xt(r,e.sampleRate)),F=`${a} on Pad ${n+1}.`),ut(s,a),T(),{ok:!0,target:t,targetName:lt(n)}}finally{vr=!1}}async function Yd(e){const t=await Gb(e);if(!t){F=`LUCY take ${e.id} could not be read.`,T();return}await Lt(E.selected,t,e.sampleRate,`LUCY take ${e.id}`,!0,null,null,Xt(t,e.sampleRate))}async function Kd(){const e=E.selected,t=P(e);!t.sample||!await go({title:`Clear ${t.name}?`,body:"Its sample and settings go; its steps stay.",confirmLabel:"Clear"})||(J(()=>{E.pads[e]=Ee(e)}),dt())}async function lo(e,t,n=E.selected){const a=P(n);let r=[];if(e&&t==="transients"&&a.sample){const o=await Y.get(a.sample);if(o){const s=Math.floor(a.start*o.frames),l=Math.min(o.frames,Math.ceil(a.end*o.frames));r=Fb(await ui.analysis(a.sample,o.data,o.sampleRate,s,l),e)}}st(o=>{o.slices=e,o.cuts=r},n)}function gi(e,t,n=!0){const a=jc[e]??String(e+1);if(si(),t==="store")E.slots[e]=jo(E),E.active=e,Zt=!1,bt=`Stored in ${a}`;else if(t==="clear")E.slots[e]=null,E.active===e&&(E.active=null),bt=`Cleared ${a}`,dt();else{const r=E.slots[e];if(!r){bt=`${a} is empty: Shift-click or long-press to store`,T();return}Xd(r),E.active=e,Zt=!1,bt=`Recalled ${a}`,n&&Re?.slot(e)}ja(),Mt(),Cd(),T()}function Xd(e){const t=structuredClone(e);E.pads=t.pads,E.lanes=t.lanes,E.swing=t.swing,E.hacks=t.hacks,me=null;for(const n of Ln(E))St(n).then(()=>Mt())}async function bi(){await ce(),N&&N.state!=="running"&&await N.resume().catch(()=>{});const e=Jg({embedded:X!==null,running:tn(),sittingOut:Ae,instanceId:_a(Dn,we)});if(e.action==="sit-out"||e.action==="rejoin"){if(Ae=e.action==="sit-out",e.action==="rejoin"){const t=z();it=t.nextBar(t.beatAt(te()+ni))}nn(!0),T(),e.action==="sit-out"&&Jt()?.out?.(e.outId);return}if(e.action==="stop"){Ie.stop({at:te()});return}Ae=!1,it=0,e.claimId&&Jt()?.claim(e.claimId),Ie.play({at:te()})}let el=z().running;Ie.onChange(()=>{z().running&&!el&&X&&(Ae=!py(Dn,we)),el=z().running,z().running&&L.phase==="armed"&&jd(),!z().running&&L.phase==="rec"&&mi(!0),z().running||(Ae=!1,it=0),Mt(),nn(!0),T()});Jt()?.member?.(_a(Dn,we),()=>z().running&&!Ae);Jt()?.onAll(()=>{if(Ae){if(Ae=!1,tn()){const e=z();it=e.nextBar(e.beatAt(te()+ni))}nn(!0),T()}});function B0(){const e=vd(E),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=`nyx${we>1?`-${we}`:""}-pattern-${new Date().toISOString().slice(0,10)}.json`,n.hidden=!0,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e4)}async function D0(e){let t;try{t=JSON.parse(await e.text()),xd(t)}catch{F=`Couldn't read ${e.name}: not a NYX pattern.`,T();return}await Vd(t,`Loaded ${e.name}.`)}async function Vd(e,t){const n=xd(e),a=t0(e);J(()=>{a&&(E.slots=a.slots,E.active=a.active),Xd(n)}),a&&(Zt=E.active!==null&&JSON.stringify(jo(E))!==JSON.stringify(E.slots[E.active])),bt="";const r=[],o=new Set;for(const l of E.pads)l.sample&&!await Y.get(l.sample)&&r.push(l.name);for(const l of E.slots)for(const c of l?.pads??[])c.sample&&!E.pads.some(d=>d.sample===c.sample)&&o.add(c.sample);let s=0;for(const l of o)await Y.get(l)||s++;F=r.length?`Loaded. ${r.length===1?"One pad needs its":`${r.length} pads need their`} sample again (${r.join(", ")}): samples stay in the browser they were loaded in.`:s?`${t} ${s===1?"One sample":`${s} samples`} in the slots ${s===1?"isn't":"aren't"} in this browser: samples stay in the browser they were loaded in.`:t,Mt(),T()}function O0(){W?.port.postMessage({type:"stop"}),tn()&&(X?(Ae=!0,Jt()?.out?.(_a(Dn,we))):Ie.stop({at:te()})),nn(!0),Te?.clear({fadeMs:20}),T()}function q0(e){E.master=Math.min(1,Math.max(0,e)),ja(),$t&&N&&$t.gain.setTargetAtTime(E.master,N.currentTime,.01),Fn.value=String(E.master),yi.textContent=`${Math.round(E.master*100)}%`}const ee=(e,t={},...n)=>{const a=document.createElement(e);for(const[r,o]of Object.entries(t))a.setAttribute(r,o);return a.append(...n),a},Ya=document.getElementById("app");Ya.classList.add("nc","nc-page");um();const Qd=ee("header",{class:"nc-page-hd"},ee("div",{},ee("h1",{class:"nc-page-title",...Vg("page:title")},ee("span",{style:"color: var(--nc-ui-instrument-nyx)"},"NYX")," ",ee("span",{class:"nc-page-sep"},"/")," SAMPLER ",ee("span",{class:"nc-page-sep"},"/")," ",ee("span",{class:"nc-mono"},String(we).padStart(2,"0"))),ee("p",{class:"nc-page-sub"},"A NetComposer element."))),Fn=ee("input",{type:"range",class:"nc-range",id:"nyx-master",min:"0",max:"1",step:"0.01",value:String(E.master),"data-nc-id":"nyx-master"});Fn.addEventListener("input",()=>q0(Number(Fn.value)));const yi=ee("span",{class:"nc-readout","data-nc-readout":""});yi.textContent=`${Math.round(E.master*100)}%`;const tl="audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.aif,.aiff,.webm",vt=ee("input",{type:"file"});vt.hidden=!0;let nl="pad";vt.addEventListener("change",()=>{const e=vt.files?.[0];vt.value="",e&&ri(e)});function wi(e){nl=e,vt.accept=nl==="pad"?tl:`${tl},.json,application/json`,vt.click()}const co=(e,t)=>{const n=ee("button",{type:"button",class:"nc-page-action","data-nyx-action":e.toLowerCase()},e);return R(n,O(`page:${e.toLowerCase()}`),n),n.addEventListener("click",t),n},Jd=ee("label",{class:"nc-label",for:"nyx-master"},"Master");R(Jd,O("page:master"),Fn);const al=gm({panel:ee("div",{},ee("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},Jd,Fn,yi),co("Save",B0),co("Load",()=>wi("any")))});Qd.append(ee("div",{class:"nc-page-actions"},al.panel,co("Panic",O0),al.button,vt));const le=ee("div",{class:"nc-stack","data-nc-layout":"adjacent"});Ya.append(Qd,ee("main",{class:"nc-page-body"},le));Ya.addEventListener("dragover",e=>{e.dataTransfer?.types.includes("Files")&&e.preventDefault()});Ya.addEventListener("drop",e=>{const t=e.dataTransfer?.files?.[0];t&&(e.preventDefault(),ri(t))});function rl(e){return Math.abs(e)<.01?"C":`${e<0?"L":"R"}${Math.round(Math.abs(e)*100)}`}function Zd(){return tn()?Ae?"Sitting out":z().beatAt(te())<it?"Joining on the next bar":"Playing":E.pads.some(t=>t.sample)?"Stopped":"Load a sample to start"}function I0(e){if(e==="always")return"Always";if(e==="fill")return"Only in Fill";if(e==="!fill")return"Not in Fill";if(e==="pre")return"If the last one played";if(e==="!pre")return"If the last one didn't";const[t,n]=e.split(":");return`Pass ${t} of every ${n}`}const eu=[{mode:"repeat16",label:"1/16",title:"Repeat the last 16th while held"},{mode:"repeat8",label:"1/8",title:"Repeat the last 8th while held"},{mode:"reverse",label:"Rev",title:"Play what just happened backwards while held"},{mode:"half",label:"Half",title:"Half speed while held"},{mode:"stop",label:"Stop",title:"Slow to a halt like a tape machine while held"}],zn={fill:!1,perform:null};function Ta(e){zn.fill!==e&&(zn.fill=e,W?.port.postMessage({type:"fill",on:e}),T())}function uo(e){zn.perform!==e&&(zn.perform=e,W?.port.postMessage({type:"perform",mode:e}),T())}function R0(e){const t=r=>{const s=(r.target instanceof Element?r.target:null)?.closest('[data-nc-id="perform"] [data-nc-choice]'),l=s instanceof HTMLElement?s.dataset.ncChoice:void 0;return eu.some(c=>c.mode===l)?l:null},n=r=>{ce(),r==="fill"?Ta(!0):uo(r)},a=()=>{Ta(!1),uo(null)};e.addEventListener("pointerdown",r=>{const o=t(r);if(!o)return;r.preventDefault(),n(o);const s=()=>{a(),window.removeEventListener("pointerup",s),window.removeEventListener("pointercancel",s)};window.addEventListener("pointerup",s),window.addEventListener("pointercancel",s)}),e.addEventListener("keydown",r=>{if((r.key===" "||r.key==="Enter")&&!r.repeat){const o=t(r);if(!o)return;r.preventDefault(),n(o)}}),e.addEventListener("keyup",r=>{(r.key===" "||r.key==="Enter")&&t(r)&&a()}),window.addEventListener("blur",a)}function _0(){return{id:"transport",title:"Transport",status:bt,controls:[{type:"button",id:"play",label:Vo(kt()),on:kt(),onPress:()=>void bi()},{type:"label",id:"perform-label",text:"Hold to play"},{type:"choice",id:"perform",label:"Hold",value:zn.perform??"",options:eu.map(e=>({value:e.mode,label:e.label})),onChange:()=>{}},{type:"slider",id:"tempo",label:"Tempo",min:40,max:240,step:1,value:Math.round(z().bpm),valueText:`${Math.round(z().bpm)} BPM`,onChange:e=>{Ie.setTempo({bpm:e}),T()}},{type:"group",id:"transport-more",title:"Swing",collapse:"phone",summary:Ne(E.swing),controls:[{type:"slider",id:"swing",label:"Swing",min:.5,max:.75,step:.01,value:E.swing,valueText:Ne(E.swing),onChange:e=>J(()=>{E.swing=e})}]},{type:"readout",id:"status",label:"Status",value:Zd()},{type:"slotRow",id:"slots",morph:0,morphText:"",slots:jc.map((e,t)=>({label:e,filled:E.slots[t]!=null,active:E.active===t,edited:E.active===t&&Zt})),onMorph:()=>{},onSlot:(e,t)=>gi(e,t)}]}}function tu(){if(!kt())return-1;const e=z().beatAt(te());return e<0||e<it?-1:Math.floor(e/Fg)%ne}function j0(){const e=Nd(),t=tu();return{id:"pattern",title:"Pattern",lead:!0,summary:`${E.lanes.filter(n=>n.steps.some(a=>a.on)).length} lanes · ${e.name}`,sections:[{id:"grid",controls:[{type:"stepGrid",id:"grid",playhead:t,selectedRow:`pad-${E.selected}`,rows:E.lanes.map((n,a)=>({id:`pad-${a}`,label:P(a).name,length:n.length,lane:a%4+1,mute:n.mute,solo:n.solo,steps:n.steps.map(r=>({on:r.on,accent:r.accent,velocity:r.velocity,dim:!P(a).sample,...ng(r,n.length)}))})),onToggle:(n,a,r)=>Ma(n,a,o=>{r?(o.accent=o.on?!o.accent:!0,o.on=!0):(o.on=!o.on,o.on||(o.accent=!1))}),onSet:(n,a,r,o)=>Ma(n,a,s=>{r==="on"?(s.on=o,o||(s.accent=!1)):(s.accent=o,o&&(s.on=!0))}),onSelectRow:n=>Fe(n,!0,!0),onLongPress:(n,a)=>{me={lane:n,step:a},Fe(n,!1)},onMute:n=>J(()=>{De(n).mute=!De(n).mute}),onSolo:n=>J(()=>{De(n).solo=!De(n).solo}),onLength:(n,a)=>J(()=>{De(n).length=Math.max(1,Math.min(ne,a))}),transport:{playing:kt(),label:Vo(kt()),onToggle:()=>void bi()},onFill:n=>Ta(n),onClear:()=>g0(),clearLabel:$n?"Undo":"Clear"},{type:"note",id:"grid-help",text:"Tap a name to hear it. Long-press a step for its locks."}]},{id:"pads",title:"Pad",controls:[{type:"padGrid",id:"pads",label:"Pads",columns:4,selected:E.selected,pads:E.pads.map((n,a)=>({label:n.name,empty:!n.sample,peaks:d0(n),lane:a%4+1,playing:en.has(a),badge:n.choke?Na[n.choke-1]:void 0,badgeLabel:n.choke?`choke group ${Na[n.choke-1]}`:void 0,hint:ke?.route()&&Sn(n)?"tuned · CALLIOPE":void 0})),onDown:n=>U0(n),onPress:n=>G0(n),onFile:(n,a)=>{Fe(n,!1),ri(a,n)},onMove:(n,a,r)=>Y0(n,a,r),menu:n=>X0(n),onMenu:(n,a)=>void V0(n,a),onRename:(n,a)=>K0(n,a)},{type:"button",id:"library",label:"Library",on:!1,onPress:()=>ct()}]}]}}function H0(e){if(!me||me.lane!==E.selected)return[];const{lane:t,step:n}=me,a=De(t).steps[n];if(!a)return[];const r=o=>Ma(t,n,o);return[{type:"label",id:"lock-label",text:`Step ${n+1}`},{type:"slider",id:"lock-velocity",label:"Velocity",min:0,max:1,step:.01,value:a.velocity,valueText:Ne(a.velocity),onChange:o=>r(s=>{s.velocity=o})},{type:"slider",id:"lock-chance",label:"Chance",min:0,max:1,step:.05,value:a.chance,valueText:Ne(a.chance),onChange:o=>r(s=>{s.chance=o})},...e.slices?[{type:"select",id:"lock-slice",label:"Slice",value:a.slice===null?"auto":String(a.slice),options:[{value:"auto",label:`In order (${n%e.slices+1})`},...Array.from({length:e.slices},(o,s)=>({value:String(s),label:`Slice ${s+1}`}))],onChange:o=>r(s=>{s.slice=o==="auto"?null:Number(o)})}]:[],{type:"slider",id:"lock-pitch",label:"Pitch",min:-12,max:12,step:1,value:a.pitch,valueText:Cn(a.pitch," st"),onChange:o=>r(s=>{s.pitch=o})},{type:"select",id:"lock-cond",label:"Plays",value:a.cond,options:ya.map(o=>({value:o,label:I0(o)})),onChange:o=>r(s=>{ya.includes(o)&&(s.cond=o)})},{type:"choice",id:"lock-reverse",label:"Direction",value:a.reverse?"rev":"pad",options:[{value:"pad",label:"As the pad"},{value:"rev",label:"Reversed"}],onChange:o=>r(s=>{s.reverse=o==="rev"})},{type:"button",id:"lock-done",label:"Done",on:!1,onPress:()=>{me=null,T()}}]}function W0(){const e=ot();if(!e)return[];const t=e.sources();return[{type:"label",id:"grab-label",text:e.record?"Grab or take":"Grab the bar"},{type:"select",id:"grab-from",label:"From",value:G.from,options:t.map(n=>({value:n.id,label:n.name})),onChange:n=>{G.from=n,e.listen(n),T()}},{type:"choice",id:"grab-bars",label:"Bars",value:String(G.bars),options:[1,2,4].map(n=>({value:String(n),label:String(n)})),onChange:n=>{G.bars=n==="4"?4:n==="2"?2:1,T()}},{type:"button",id:"grab",label:G.busy?"Grabbing…":G.bars===1?"Grab last bar":`Grab last ${G.bars} bars`,on:G.busy,onPress:()=>void pi()},...e.record?[{type:"button",id:"take",label:Hd(),on:L.phase!=="idle",onPress:()=>fi()}]:[]]}let Ca=-1;function U0(e){if(!P(e).sample)return;Ca=e,nu(e);const t=()=>{Ca=-1,Re?.release(e)};window.addEventListener("pointerup",()=>setTimeout(t),{once:!0})}function nu(e){at.has(e)||Re?.hit(e),Fe(e,!0,!0)}function G0(e){if(Ca===e){Ca=-1;return}if(!P(e).sample){Fe(e,!1),wi("pad");return}nu(e),Re?.release(e)}function Y0(e,t,n){J(()=>{const a=structuredClone(P(e)),r=structuredClone(P(t));E.pads[t]=a,n||(E.pads[e]=r.sample?r:Ee(e))}),Fe(t,!1)}const Na=["A","B","C","D"];function K0(e,t){st(n=>{n.name=t.slice(0,24)},e)}function X0(e){const t=!!P(e).sample,n=[{id:"load",label:t?"Replace…":"Load a file…"}],a=ao().slice(-4).reverse();for(const s of a)n.push({id:`take-${s.id}`,label:`LUCY take ${s.id}`});const r=a[0];if(r&&n.push({id:`chop-take-${r.id}`,label:`Chop LUCY take ${r.id}…`}),ot()&&n.push({id:"grab",label:G.bars===1?"Grab the last bar":`Grab the last ${G.bars} bars`}),ot()?.record&&n.push({id:"record",label:L.phase==="rec"?"Stop the take":`Take from ${La(G.from)}`}),n.push({id:"library",label:"Library…"}),P(e).provenance){const s=di(e);if(s.length)for(const l of s)n.push({id:`alt-${l.id}`,label:`Alternative: ${Oa(l.title)}`});else ye.ensure().then(()=>T()),n.push({id:"alternatives",label:"Alternatives…"})}return t&&n.push({id:"chop",label:"Chop to pads…"}),t&&n.push({id:"rename",label:"Rename…"},{id:"clear",label:"Clear"}),n}async function V0(e,t){if(Fe(e,!1),t==="load")wi("pad");else if(t==="grab")await pi();else if(t==="record")fi();else if(t==="clear")await Kd();else if(t==="library")ct(!0);else if(t==="chop")await On();else if(t.startsWith("chop-take-")){const n=ao().find(a=>`chop-take-${a.id}`===t);n&&await M0(n)}else if(t==="alternatives"){const n=P(e).provenance;ct(!0,n?n.query||n.role:void 0)}else if(t.startsWith("alt-")){const n=di(e).find(a=>`alt-${a.id}`===t);n&&await Ua(n,P(e).provenance?.query??"",e)}else if(t.startsWith("take-")){const n=ao().find(a=>`take-${a.id}`===t);n&&await Yd(n)}}const vi=new ob;document.addEventListener("keydown",e=>{!ge||e.repeat||e.shiftKey||e.altKey||!(e.metaKey||e.ctrlKey)||e.key.toLowerCase()!=="z"||(e.target instanceof HTMLElement?e.target:null)?.closest("input, select, textarea, [contenteditable]")||(e.preventDefault(),li())});const au=e=>W?.port.postMessage({type:"release",pad:e});document.addEventListener("keydown",e=>{if(e.repeat||e.metaKey||e.ctrlKey||e.altKey||(e.target instanceof HTMLElement?e.target:null)?.closest("input, select, textarea, [contenteditable]"))return;const n=pd(e);n<0||!P(n).sample||(e.preventDefault(),!(vi.press(e)<0)&&(at.has(n)||Re?.hit(n),Je(n,null,!0,!0)))});document.addEventListener("keyup",e=>{const t=vi.release(e);t<0||(Re?.release(t),au(t))});window.addEventListener("blur",()=>{for(const e of vi.releaseAll())Re?.release(e),au(e)});document.addEventListener("keydown",e=>{e.code!=="Space"&&e.code!=="Backspace"||e.metaKey||e.ctrlKey||e.altKey||(e.target instanceof HTMLElement?e.target:null)?.closest("input, select, textarea, [contenteditable]")||hy(e)&&e.preventDefault()});function xi(e){const t=O("kit:pad-key");e.querySelectorAll('[data-nc-id="pads"] .nc-padgrid-pad').forEach((n,a)=>{const r=rb[a];if(!r)return;let o=n.querySelector(":scope > .nyx-pad-key");o||(o=ee("span",{class:"nyx-pad-key","aria-hidden":"true"}),n.append(o)),o.textContent!==r&&(o.textContent=r),R(o,t)})}function ru(e){const t=O("kit:pad-playing");e.querySelectorAll('[data-nc-id="pads"] .nc-padgrid-pad').forEach((n,a)=>{const r=at.has(a);n.hasAttribute("data-nyx-stop")!==r&&(n.toggleAttribute("data-nyx-stop",r),r?R(n,t,n):Xg(n))})}function ol(e,t){const n=Go(e,t,z().bpm),a=Number(n.toFixed(2));return{speed:n,far:e.keepPitch&&(a<Qt[0]||a>Qt[1])}}function ou(e){const t=e.querySelector('[data-nc-id="fit-speed"]');if(!t)return;const n=Nd(),a=n.sample?Y.info(n.sample):void 0,r=Number((a?Go(n,a,z().bpm):1).toFixed(2)),o=n.keepPitch&&(r<Qt[0]||r>Qt[1]);t.toggleAttribute("data-nyx-far",o)}const il=["C","C♯","D","E♭","E","F","F♯","G","A♭","A","B♭","B"];function Q0(e,t){const n=ke?.route();if(!n)return[];const a=Sn(t),r=s=>st(s),o=t.sample?t.fit>0?`Pad ${e+1} is fitted to bars: it keeps its pitch.`:a?`Pad ${e+1}'s hits play at the root of CALLIOPE's chord, from ${il[t.note]}. The pattern's own hits still play.`:`Pad ${e+1} keeps its own pitch. Follow tunes its hits to CALLIOPE's root.`:"Load a sound on this pad to tune it to CALLIOPE.";return[{type:"label",id:"notes-label",text:"Notes in"},{type:"note",id:"notes-by",text:`Played by ${n.name} · ${my(n)}`},...t.sample&&t.fit===0?[{type:"toggle",id:"pad-follow",label:"Follow CALLIOPE",pressed:a,onPress:()=>r(s=>{s.follow=!Sn(s)})},{type:"select",id:"pad-note",label:"Sample is",value:String(t.note),options:il.map((s,l)=>({value:String(l),label:s})),onChange:s=>r(l=>{l.note=Number(s)})}]:[],{type:"note",id:"notes-how",text:o},{type:"button",id:"notes-open",label:`Open ${n.name.split(" ")[0]}`,on:!1,onPress:()=>void ke?.open()},{type:"button",id:"notes-mine",label:"Play it myself",on:!1,onPress:()=>{ke?.takeBack()&&T()}}]}function J0(){const e=E.selected,t=P(e),n=t.sample?Y.info(t.sample):void 0,a=Uo(t).slice(1,-1),r=t.end-t.start,o=n?n.frames/n.sampleRate:0,s=!!t.sample,l=s&&!n,c=p=>st(p),d=At.get(e),u=s?[...t.provenance?[{type:"readout",id:"credit",label:"Credit",value:`${t.provenance.creator} · ${Po(t.provenance.license,t.provenance.licenseStatus)}`}]:[],{type:"readout",id:"sample",label:"Length",value:l?t.provenance?.origin==="local"?"Local sound, not here: open its local Library":"Not in this browser: load it again":`${gt(o*r)} of ${gt(o)} · ${n?.channels===2?"stereo":"mono"}`},...cd(d,t)&&n?[{type:"note",id:"auto-fit-note",text:jg(d.fit)},...Ds({...d.fit,...ol(t,n)})?[{type:"note",id:"auto-fit-far",text:Ds({...d.fit,...ol(t,n)})}]:[],{type:"button",id:"auto-fit-undo",label:"Undo fit",on:!1,onPress:()=>y0(e)}]:[],{type:"choice",id:"mode",label:"Mode",value:t.mode,options:[{value:"oneshot",label:"One-shot"},{value:"gate",label:"Gate"},{value:"loop",label:"Loop"}],onChange:p=>c(h=>{h.mode=p})},{type:"choice",id:"dir",label:"Direction",value:t.dir,options:[{value:"fwd",label:"Forward"},{value:"rev",label:"Reverse"},{value:"pingpong",label:"Ping-pong"}],onChange:p=>c(h=>{(p==="fwd"||p==="rev"||p==="pingpong")&&(h.dir=p)})},{type:"slider",id:"start",label:"Start",min:0,max:1,step:.001,value:t.start,valueText:gt(t.start*o),onChange:p=>c(h=>{h.start=Math.min(p,h.end-.002)}),onCommit:()=>void Je(e)},{type:"slider",id:"end",label:"End",min:0,max:1,step:.001,value:t.end,valueText:gt(t.end*o),onChange:p=>c(h=>{h.end=Math.max(p,h.start+.002)}),onCommit:()=>void Je(e)},{type:"select",id:"slices",label:"Slices",value:String(t.slices),options:Hc.map(p=>({value:String(p),label:p?`${p}`:"Off"})),onChange:p=>void lo(Number(p),t.cuts.length?"transients":"even")},...t.slices?[{type:"choice",id:"chop",label:"Chop",value:t.cuts.length?"transients":"even",options:[{value:"even",label:"Even"},{value:"transients",label:"At hits"}],onChange:p=>void lo(t.slices,p==="transients"?"transients":"even")}]:[],{type:"button",id:"chop-to-pads",label:"Chop to pads…",on:Et.isOpen,onPress:()=>void On()},{type:"group",id:"tune-shape",title:"Tune & shape",summary:tb(t),controls:[{type:"label",id:"pitch-label",text:"Pitch"},{type:"slider",id:"tune",label:"Tune",min:-24,max:24,step:1,value:t.tune,valueText:Cn(t.tune," st"),onChange:p=>c(h=>{h.tune=p}),onCommit:()=>void Je(e)},{type:"slider",id:"fine",label:"Fine",min:-100,max:100,step:1,value:t.fine,valueText:Cn(t.fine," ct"),onChange:p=>c(h=>{h.fine=p})},{type:"select",id:"fit",label:"Fit to bars",value:String(t.fit),options:[{value:"0",label:"Off"},...[1,2,4,8].map(p=>({value:String(p),label:`${p} bar${p===1?"":"s"}`}))],onChange:p=>{At.delete(e),c(h=>{h.fit=Number(p)})}},...t.fit&&n?[{type:"choice",id:"keep-pitch",label:"Keep pitch",value:t.keepPitch?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:p=>c(h=>{h.keepPitch=p==="on"})},{type:"readout",id:"fit-speed",label:"Speed",value:`${eb(Go(t,n,z().bpm))}${t.keepPitch&&ze.pending(e)&&!ze.failed?" · stretching…":""}`}]:[],{type:"choice",id:"auto-fit",label:"Auto-fit loops",value:ia?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:p=>{ia=p==="on",Wg(ia),T()}},{type:"label",id:"shape-label",text:"Shape"},{type:"slider",id:"attack",label:"Attack",min:0,max:.1,step:.001,taper:"time",value:t.attack,valueText:gt(t.attack),onChange:p=>c(h=>{h.attack=p})},{type:"slider",id:"decay",label:"Decay",min:.01,max:4,step:.01,taper:"time",value:t.decay,valueText:aa(t.decay),onChange:p=>c(h=>{h.decay=p}),onCommit:()=>void Je(e)},{type:"slider",id:"cutoff",label:"Filter",min:-1,max:1,step:.01,value:t.cutoff,valueText:na(t.cutoff),onChange:p=>c(h=>{h.cutoff=Math.abs(p)<.02?0:p})},{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:Ne(t.resonance),onChange:p=>c(h=>{h.resonance=p})}]},{type:"label",id:"out-label",text:"Output"},{type:"slider",id:"level",label:"Level",min:0,max:1,step:.01,value:t.level,valueText:Ne(t.level),onChange:p=>c(h=>{h.level=p})},...t.sample?[{type:"label",id:"normalize-label",text:"Normalize"},{type:"choice",id:"normalize",label:"Normalize",value:As(t)?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:p=>void b0(e,p==="on")},{type:"readout",id:"normalize-gain",label:"Gain",value:As(t)?t.provenance?"Library level":tg(t.normalize?.gainDb??0):"As recorded"}]:[],{type:"group",id:"pad-more",title:"Pan & choke",collapse:"phone",summary:`Pan ${rl(t.pan)} · Choke ${t.choke?Na[t.choke-1]:"none"}`,controls:[{type:"slider",id:"pan",label:"Pan",min:-1,max:1,step:.01,value:t.pan,valueText:rl(t.pan),onChange:p=>c(h=>{h.pan=Math.abs(p)<.02?0:p})},{type:"select",id:"choke",label:"Choke",value:String(t.choke),options:[{value:"0",label:"None"},...Na.map((p,h)=>({value:String(h+1),label:`Group ${p}`}))],onChange:p=>c(h=>{h.choke=Number(p)})},{type:"button",id:"clear-pad",label:"Clear pad",on:!1,onPress:()=>void Kd()}]}]:[];return{id:"params",title:"Params",summary:t.name,controls:[...s?[{type:"canvas",id:"wave",label:"Wave",paint:"waveform",peaks:t.sample?$a.get(t.sample)??[]:[],region:[t.start,t.end],markers:a.map(p=>t.start+p*r),position:en.get(e)??-1}]:[],...F?[{type:"note",id:"notice",text:F}]:[],...Q0(e,t),...H0(t),...u,...W0()]}}function po(e,t){J(()=>t(E.hacks[e]))}function Z0(e,t){const n=E.hacks[e].dials[t.key]??t.default,a=`hack-${e}-${t.key}`,r=o=>po(e,s=>{s.dials[t.key]=o});return t.options?{type:"select",id:a,label:t.label,value:String(n),options:t.options.map(o=>({value:String(o.value),label:o.label})),onChange:o=>r(Number(o))}:{type:"slider",id:a,label:t.label,min:t.min,max:t.max,step:t.step??1,taper:ah(t),value:n,valueText:gl(t,n,z().bpm),onChange:r}}const Vn=(e,t)=>(je(e)?.dials??[]).filter(n=>!n.key.startsWith("mod_")&&n.more===!0===t).map(n=>Z0(e,n)),sl=new Map;function xr(e){let t=sl.get(e);if(t)return t;let n=0,a=null;const r={in:0,out:0},o=()=>{const s=dp(Te,e);if(s!==a){for(let l=0;l<n;l++)a?.close();a=s;for(let l=0;l<n;l++)a?.open()}};return t={open:()=>(o(),n++,a?.open(),!0),close:()=>{n!==0&&(o(),n--,a?.close())},read:()=>(o(),a?.read()??r)},sl.set(e,t),t}function ew(){const e=E.hacks,t=e.filter,n=t.mode==="lp"&&t.cutoff>=.999,a=o=>J(()=>o(E.hacks.filter)),r=[ud(t)?"":"Filter",e.drive.on?"Drive":"",e.compressor.on?"Comp":""].filter(Boolean);return{id:"hacks",title:"Hacks",summary:r.length?r.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:t.on,meter:xr(`${Qo(t).type}-1`),meterHelp:O("hack-meter"),onToggle:o=>a(s=>{s.on=o}),controls:[{type:"select",id:"filter-mode",label:"Mode",value:t.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:o=>a(s=>{(o==="lp"||o==="hp"||o==="bp")&&(s.mode=o)})},{type:"canvas",id:"filter-curve",label:"Curve",paint:"filter",mode:t.mode,cutoff:t.cutoff,resonance:t.mode==="lp"?0:t.resonance,...nb(t)},{type:"slider",id:"filter-cutoff",label:"Cutoff",min:0,max:1,step:.01,value:t.cutoff,valueText:n?"open":to(dd(t.cutoff)),onChange:o=>a(s=>{s.cutoff=o})},...t.mode==="lp"?[]:[{type:"slider",id:"filter-resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:Ne(t.resonance),onChange:o=>a(s=>{s.resonance=o})}]]},{type:"group",id:"hacks-more",title:"Drive & Compressor",collapse:"phone",summary:`Drive ${e.drive.on?"on":"off"} · Compressor ${e.compressor.on?"on":"off"}`,controls:[{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:e.drive.on,meter:xr("drive-1"),meterHelp:O("hack-meter"),onToggle:o=>po("drive",s=>{s.on=o}),controls:Vn("drive",!1),more:Vn("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:e.compressor.on,meter:xr("compressor-1"),meterHelp:O("hack-meter"),onToggle:o=>po("compressor",s=>{s.on=o}),controls:Vn("compressor",!1),more:Vn("compressor",!0)}]}]}}const ki=[_0,j0,J0,ew].map(e=>({def:e,handle:$m(e())}));Am(le,ki.map(e=>e.handle),"adjacent");R0(le);xi(le);Xo(le);const ll=le.querySelector('[data-nc-module="transport"]'),iu=ll?Zg(ll,{playing:()=>kt(),onPress:()=>void bi(),description:O("play")}):null;function su(){const e=le.querySelector('[data-nc-section="pads"] [data-nc-id="library"]');ye.attach(e),Et.attach(e)}function T(){k0?.update(),$0?.changed();for(const e of ki)e.handle.update(e.def());su(),ye.isOpen&&ye.refresh(),xi(le),ru(le),ou(le),Xo(le),iu?.sync()}let cl="";function lu(){nn();const e=en.get(E.selected)??-1,t=JSON.stringify([tu(),Zd(),Math.round(e*400),[...en.keys()],at.pads()]);if(t!==cl){cl=t;for(const n of ki.slice(0,3))n.handle.update(n.def());su(),xi(le),ru(le),ou(le),Xo(le),iu?.sync()}requestAnimationFrame(lu)}requestAnimationFrame(lu);ke?.onChange(e=>{e&&T()});ke?.route()&&T();globalThis.__NC_NOTES__={read:()=>({routes:ke?[...ke.follower.routes]:[],points:ke?ke.follower.points():[],follows:E.pads.map(e=>Sn(e)),replay:Qe?{...Qe.stats}:null,out:Re?{...Re.stats}:null,slots:Aa?{...Aa.stats}:null}),log:{start(){Ea.length=0,Sa=!0,W?.port.postMessage({type:"hitlog",on:!0})},take:()=>Ea.splice(0),stop(){Sa=!1,W?.port.postMessage({type:"hitlog",on:!1})}}};u0.start();Promise.all([...Ln(E)].map(e=>Y.get(e))).then(e=>{for(const t of e)t&&Sd(t);T()});if(X)ce(),X.providePreset?.({format:Zy,version:e0,get:()=>(o0(E),vd(E)),set:async e=>{await Vd(e,"Loaded the Scene's pattern.")}}),ot()?.listen(G.from),X.onAudio?.({label:"Pad",targets:Ud,receive:Gd});else{const e=()=>{ce()};document.addEventListener("pointerdown",e,{once:!0,capture:!0}),document.addEventListener("keydown",e,{once:!0,capture:!0})}window.__nyx={state:E,clock:Ie,store:Y,stretcher:ze,stretchTimes:Ld,selectPad:e=>Fe(e,!1),edit:e=>J(()=>e(E)),runStretch:Td,get stretchLoaded(){return oa!==null},get ctx(){return N},get masterOut(){return $t},chop:{open:On,get panel(){return Et},get times(){return ui.times}},get fx(){return Te},get positions(){return en},get voices(){return Md},ensureAudio:ce,play:Je,async setSample(e,t,n,a="test"){await ce()&&await Lt(e,t,n,a,!0,null,null,Xt(t,n))},grab:G,grabBars:pi,get padUndo(){const e=ge?.before[0];return ge&&e?{index:e.index,sample:e.pad.sample,pads:ge.before.map(t=>t.index)}:null},undoPad:li,receiveAudio:Gd,padTargets:Ud,take:L,pressTake:fi,get notice(){return F},setPerform:uo,setFill:Ta,actSlot:gi,get edited(){return Zt},library:{get panel(){return ye},open:e=>ct(!0,e),close:()=>ct(!1),catalog:Fd,local:Wa,load:Ua,buildKit:()=>ye.buildKit(),alternatives:e=>di(e).map(t=>t.id),preview:Id,get previewing(){return Ut?.id??null}},toggleStep(e,t){Ma(e,t,n=>{n.on=!n.on})}};
