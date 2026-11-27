(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const _t=1e-9;function Hd(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class xr{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return Hd(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let r=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+_t&&(r=s.bpm);const o=[{beat:t.beat,time:t.time,bpm:this.clamp(r)}];for(const s of a){if(s.beat<=t.beat+_t)continue;const l=this.clamp(s.bpm);l!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+_t){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-_t;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,r=.25){const o=this.bpmAt(n);if(!(a>0)||!(r>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/r));this.setTempoAt(o,n);for(let l=1;l<=s;l++)this.setTempoAt(o+(t-o)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new xr({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+_t)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+_t)return n[a];return n[0]}}const Ud=Object.freeze({beatsPerBar:4,beatUnit:4}),Jt=1e-9;function Wd(e){return Math.floor(e+Jt)}function sl(e,t,n=!1){if(!(t>0))return e;const r=Math.ceil(e/t-Jt)*t;return n&&r<=e+Jt?r+t:r}class Gd{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new xr({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??Ud}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-Jt&&(this.stopTime===null||t<this.stopTime-Jt)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-Jt?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=Wd(t/n),r=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:r,barPhase:r/n}}nextBar(t,n=!1){return sl(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const ll="nc-clock/snapshot",cl=1;function Vd(e,t="local"){return{format:ll,version:cl,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function Yd(e,t){const n=Kd(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const Ve=e=>typeof e=="number"&&Number.isFinite(e),fo=e=>e===null||Ve(e);function Kd(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==ll&&n("format"),(!Ve(t.version)||Math.floor(t.version)!==cl)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!Ve(t.anchor.beat)||!Ve(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&Ve(a.beat)&&Ve(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!Ve(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!Ve(t.meter.beatUnit))&&n("meter"),(!fo(t.startTime)||!fo(t.stopTime)||!Ve(t.stoppedBeat))&&n("transport times"),t}class Xd{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new Gd(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){Yd(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return Vd(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const Qd="nc-sync/1",Jd=1,Zd="nc-sync",eu="nc-sync-leader",tu=0,dl=.5,ul=.75;function nu(e){return typeof e=="number"&&Number.isFinite(e)&&e>=dl&&e<=ul?e:null}const ai=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),mn=e=>typeof e=="number"&&Number.isFinite(e),Zn=e=>typeof e=="string"&&e.length>0;function au(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==Jd||!Zn(t.type)||!Zn(t.from)||!mn(t.term)||!mn(t.seq)||!mn(t.sentAt))return null;switch(t.type){case"hello":return Zn(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return mn(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&mn(t.slot)?t:null;case"ping":case"pong":return Zn(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function iu(e,t,n,a,r){return{proto:Qd,from:t,term:n,seq:a,sentAt:r,...e}}function le(){return(performance.timeOrigin+performance.now())/1e3}const ii=.003,ru=3,ri=.002+1e-6,ou=.01,mo=500;class go{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?ou:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=ii&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const r=n-(this.timeOrigin+a)/1e3,o=this.median(),s=r-o,l=Math.abs(r-this.preStepBase),c=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!c&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&c===this.pendingBack&&(c||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,o,c))):(this.pendingStep=s,this.pendingBack=c,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const r=this.heldBase()!==null,o=this.ctx.currentTime,s=o<=this.revertUntil;let l;if(a&&s){const c=this.offsets,d=this.preStep;c.length=0;for(let u=0;u<d.length;u++)c.push(d[u]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:o,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!s){const u=this.offsets,h=this.preStep;h.length=0;for(let f=0;f<u.length;f++)h.push(u[f]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?o+this.stepRevert:-1/0}const c=this.offsets,d=t-n;for(let u=0;u<c.length;u++)c[u]+=d;this.stepCount++,l={stepSeconds:t-n,confirmedAt:o,reanchors:this.stepCount,revert:!1}}if(!r)for(const c of[...this.stepListeners])c(l);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let o=0;o<a;o++){const s=t[o];let l=o-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const r=a>>1;return a%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const r=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(r&&Number.isFinite(r.contextTime)&&Number.isFinite(r.performanceTime)&&r.contextTime>=ii&&r.performanceTime>0)if(this.waitSince=null,r.contextTime===this.lastStampC&&r.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<mo)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=r.contextTime,this.lastStampP=r.performanceTime,this.stampSince=this.perfNow(),n=r.contextTime-(this.timeOrigin+r.performanceTime)/1e3,a=!0;else if(!r||!(r.contextTime>=ii)&&!(r.contextTime>0&&!(r.performanceTime>0))){if(r){const o=this.perfNow();if(this.waitSince===null&&(this.waitSince=o),o-this.waitSince<mo)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(ru,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let r=-1,o=0;for(let l=0;l<n;l++){let c=0;for(let d=0;d<n;d++)Math.abs(t[d]-t[l])<=ri&&c++;c>o&&(r=l,o=c)}if(o<a)return;const s=t[r];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>ri&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-this.estimate())<=ri}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const r=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(r,2)};setTimeout(r,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(r)&&r>0?r:null}}class su{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...ai,...t.capabilities},this.channelOption=t.channel??Zd,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const r=this.o.now(),o=()=>{n===this.startWaits&&t(r)};return a.then(o,o),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const r=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(r),0)}else{const r=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?r:Math.max(t+this.o.gatedStartLeadSeconds,r),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[r,o]=this.tempoRange();t=Math.min(o,Math.max(r,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const c=s.beatAt(l+this.o.minLeadSeconds),d=Math.max(n??sl(c,1),c);a&&a>0?(s.tempo.rampTempo(t,d,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,d),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(ul,Math.max(dl,t)):tu;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=nu(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=au(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...ai,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...ai},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(r=>{this.leader&&this.decideStart(r)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(eu,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,l)=>[o?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(r===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,r=o.id)}this.setLeader(r===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==r[0]?a[0]<r[0]:a[1]!==r[1]?a[1]<r[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const r=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>r&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(iu(t,this.id,this.term,++this.seq,this.o.now()))}}const lu="modulepreload",cu=function(e){return"/lucy/"+e},bo={},du=function(t,n,a){let r=Promise.resolve();if(n&&n.length>0){let s=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");r=s(n.map(d=>{if(d=cu(d),d in bo)return;bo[d]=!0;const u=d.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${h}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":lu,u||(f.as="script"),f.crossOrigin="",f.href=d,c&&f.setAttribute("nonce",c),document.head.appendChild(f),u)return new Promise((m,g)=>{f.addEventListener("load",m),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return t().catch(o)})};var uu=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Li=[.25,.5,.75,1,1.5,2],pu=4.9,W={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0},hallTone:{exp2:[1500,3.7],div:100,round:!0},crunchRate:{pow:[4e3,44100/4e3],div:100,round:!0}},qe={fmt:"wet"},ie={fmt:"pct"},jt={fmt:"db"},ea={fmt:"signedPct"},gn={fmt:"num",suffix:" ms"},P={div:100};function L(e,t,n,a,r,o,s,l){var c={key:e,label:t,min:n,max:a,default:r,step:1,k:o,unit:null,format:s};if(l)for(var d in l)c[d]=l[d];return c}function We(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var Sn=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[L("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:W.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[L("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:W.hpHz,astrid:!0,zero:"off"}),L("q","Resonance",0,100,0,2,{fmt:"q",law:W.hpQ},{dsp:{law:W.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[L("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:W.bpHz,astrid:!0},{dsp:{law:W.bpHz}}),L("q","Q",0,100,0,2,{fmt:"q",law:W.bpQ},{dsp:{law:W.bpQ}}),L("mix","Mix",0,100,100,3,qe,{dsp:P,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[L("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:We(uu),overriddenBy:"beats_free",tempoSynced:!0}),L("feedback","Feedback",0,90,35,2,ie,{dsp:P,unit:"%"}),L("mix","Wet/dry",0,100,0,3,qe,{dsp:P,unit:"%",astridKey:"wet"}),L("tone","Tone",0,100,100,4,{fmt:"hz",law:W.delayTone,offAt:100},{dsp:{div:99},more:!0}),L("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),L("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:We([[0,"Insert"],[1,"Send"]]),more:!0}),L("send","Send",0,100,100,7,ie,{dsp:P,unit:"%",more:!0}),L("mod_send","Accent → send",-100,100,0,8,ea,{dsp:P,unit:"%",more:!0}),L("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[L("predelay","Pre-delay",0,200,0,1,gn,{dsp:{div:1e3},unit:"ms"}),L("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:P,unit:"%"}),L("decay","Decay",0,100,50,3,ie,{dsp:P,unit:"%"}),L("damping","Damping",0,100,0,4,ie,{dsp:P,unit:"%"}),L("mix","Mix",0,100,0,5,qe,{dsp:P,unit:"%"})]},{type:"hall",label:"Hall",own:!0,dials:[L("size","Size",0,100,60,1,ie,{dsp:P,unit:"%"}),L("decay","Decay",5,120,35,2,{fmt:"fixed",div:10,add:0,digits:1,suffix:" s"},{dsp:{div:10},unit:"s"}),L("predelay","Pre-delay",0,250,20,3,gn,{dsp:{div:1e3},unit:"ms"}),L("tone","Tone",0,100,60,4,{fmt:"hz",law:W.hallTone,astrid:!0},{dsp:{law:W.hallTone}}),L("mix","Mix",0,100,25,5,qe,{dsp:P,unit:"%"}),L("low_cut","Low cut",0,1e3,120,6,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),L("width","Width",0,100,100,7,ie,{dsp:P,unit:"%",more:!0}),L("motion","Motion",0,100,30,8,ie,{dsp:P,unit:"%",more:!0})]},{type:"ensemble",label:"Ensemble",own:!0,dials:[L("rate","Rate",0,100,35,1,{fmt:"rate",law:W.rate},{dsp:{law:W.rate}}),L("depth","Depth",0,100,60,2,ie,{dsp:P,unit:"%"}),L("width","Width",0,100,80,3,ie,{dsp:P,unit:"%"}),L("mix","Mix",0,100,50,4,qe,{dsp:P,unit:"%"}),L("voices","Voices",3,6,3,5,{fmt:"option"},{step:null,options:We([[3,"3"],[6,"6"]]),more:!0}),L("vibrato","Vibrato",0,100,20,6,ie,{dsp:P,unit:"%",more:!0})]},{type:"gate",label:"Gate",own:!0,tempoSynced:!0,pattern:!0,dials:[L("rate","Rate",4,16,4,1,{fmt:"option"},{step:null,options:We([[4,"1/4"],[8,"1/8"],[16,"1/16"],[12,"1/8T"]])}),L("swing","Swing",0,100,0,3,ie,{dsp:P,unit:"%"}),L("depth","Depth",0,100,90,4,ie,{dsp:P,unit:"%"}),L("mix","Mix",0,100,100,5,qe,{dsp:P,unit:"%"}),L("steps","Steps",8,16,8,2,{fmt:"option"},{step:null,options:We([[8,"8"],[16,"16"]]),more:!0}),L("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:We([[0,"Volume"],[1,"Filter"]]),more:!0}),L("smooth","Smooth",1,20,4,7,gn,{unit:"ms",more:!0}),L("spread","Spread",0,100,0,8,ie,{dsp:P,unit:"%",more:!0}),L("res","Resonance",0,100,20,9,ie,{dsp:P,unit:"%",more:!0})]},{type:"crunch",label:"Crunch",own:!0,note:"Rate with no filter, then Bits: the S950 / SP-1200 grit.",dials:[L("rate","Rate",0,100,78,1,{fmt:"khz",law:W.crunchRate},{step:.1,dsp:{law:W.crunchRate}}),L("bits","Bits",4,16,12,2,{fmt:"num",suffix:"-bit"},{unit:"bits"}),L("hold","Steps",0,1,0,3,{fmt:"option"},{step:null,options:We([[0,"Hard"],[1,"Smooth"]]),more:!0})]},{type:"flanger",label:"Flanger",dials:[L("rate","Rate",0,100,26,1,{fmt:"rate",law:W.rate},{dsp:{law:W.rate}}),L("depth","Depth",0,100,70,2,ie,{dsp:P,unit:"%"}),L("feedback","Feedback",-90,90,50,3,ea,{dsp:P,unit:"%"}),L("mix","Mix",0,100,50,4,qe,{dsp:P,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[L("rate","Rate",0,100,52,1,{fmt:"rate",law:W.rate},{dsp:{law:W.rate}}),L("depth","Depth",0,100,50,2,ie,{dsp:P,unit:"%"}),L("spread","Spread",0,100,70,3,ie,{dsp:P,unit:"%"}),L("mix","Mix",0,100,40,4,qe,{dsp:P,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[L("rate","Rate",0,100,39,1,{fmt:"rate",law:W.rate},{dsp:{law:W.rate}}),L("depth","Depth",0,100,70,2,ie,{dsp:P,unit:"%"}),L("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:We([[4,"4"],[6,"6"],[8,"8"]])}),L("feedback","Feedback",0,90,30,4,ie,{dsp:P,unit:"%"}),L("mix","Mix",0,100,50,5,qe,{dsp:P,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[L("low_db","Low",-18,18,0,1,jt,{unit:"dB"}),L("mid_db","Mid",-18,18,0,2,jt,{unit:"dB"}),L("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:W.midHz,astrid:!0},{dsp:{law:W.midHz}}),L("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:W.eqQ},{dsp:{law:W.eqQ}}),L("high_db","High",-18,18,0,4,jt,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[L("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),L("output_db","Output",-12,12,0,2,jt,{unit:"dB"}),L("mix","Mix",0,100,100,3,qe,{dsp:P,unit:"%"}),L("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:We([[0,"Smooth"],[1,"Acid"]]),more:!0}),L("tone","Tone",0,100,100,5,{fmt:"hz",law:W.driveTone,offAt:100},{dsp:{div:99},more:!0}),L("mod_drive","Accent → drive",-100,100,0,6,ea,{dsp:P,unit:"%",more:!0}),L("mod_tone","Accent → tone",-100,100,0,7,ea,{dsp:P,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[L("threshold_db","Threshold",-60,0,0,1,jt,{unit:"dB"}),L("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:W.ratio},{dsp:{law:W.ratio}}),L("attack_ms","Attack",1,100,10,3,gn,{unit:"ms"}),L("release_ms","Release",10,1e3,150,4,gn,{unit:"ms"}),L("makeup_db","Makeup",0,24,0,5,jt,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[L("width","Width",0,200,100,1,ie,{dsp:P,unit:"%"}),L("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:P})]}],hu=Sn.map(function(e){return e.type});Sn.filter(function(e){return!e.hidden}).map(function(e){return e.type});var fu={reverb:"plate"},Ci={};function pl(e){return typeof e=="string"&&/^plugin:[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(e)&&e.length<=71}function $r(e){var t=fu[e]||e;return hu.indexOf(t)>=0||typeof t=="string"&&Ci[t]?t:null}function ye(e){for(var t=$r(e),n=0;n<Sn.length;n++)if(Sn[n].type===t)return Sn[n];return t&&Ci[t]?Ci[t]:null}function mu(e,t){var n=ye(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function $t(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function ba(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=$t(n.law,t);return a===null?0:a}function yo(e,t){return Math.min(pu,e*60/(t>0?t:120))}var vo=function(e){return e>0?"+":e<0?"−":""};function gu(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function hl(e,t,n){var a=e.format,r;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:vo(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return vo(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(r=$t(a.law,t),r===null?a.zero||"open":a.astrid?gu(r):r+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"khz":return($t(a.law,t)/1e3).toFixed(1)+" kHz";case"q":return"Q "+$t(a.law,t).toFixed(1);case"ratio":return $t(a.law,t).toFixed(1)+":1";case"rate":return r=$t(a.law,t),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var o=0;o<e.options.length;o++)if(e.options[o].value===t)return e.options[o].label;return String(t);case"tempoMs":return Math.round(yo(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(yo(t,n)*1e3)+" ms"}return String(t)}var bu=1,ja=["drive","delay","plate"];function yu(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,r){return hl(e,a,r)},t}var Tn=ja.map(function(e){var t=ye(e),n={type:e,label:t.label,dials:t.dials.map(yu)};return t.tempoSynced&&(n.tempoSynced=!0),n}),vu={reverb:"plate"};function ya(e){var t=vu[e]||e;return ja.indexOf(t)>=0?t:null}function Ha(e){for(var t=ya(e),n=0;n<Tn.length;n++)if(Tn[n].type===t)return Tn[n];return null}function fl(e,t){var n=Ha(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function on(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function Qe(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,r=1;r<e.options.length;r++)Math.abs(e.options[r].value-t)<Math.abs(a-t)&&(a=e.options[r].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*o)/o))+0}function wu(){return{v:bu,chain:Tn.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function ku(e){return Li.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},Li[0])}function oi(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function xu(e){for(var t=Array.isArray(e)?e:oi(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=wu(),r={},o=[],s=0;s<t.length;s++){var l=t[s];if(oi(l)){var c=ya(l.type);if(!c){typeof l.type=="string"&&o.push(l.type);continue}if(r[c]){o.push(c);continue}r[c]=!0;var d=a.chain[ja.indexOf(c)],u=oi(l.dials)?l.dials:{};c==="delay"&&u.mix===void 0&&u.wet!==void 0&&(u=Object.assign({},u,{mix:u.wet})),d.bypass=n?l.bypass===!0:l.bypass!==!1,Ha(c).dials.forEach(function(h){d.dials[h.key]=Qe(h,u[h.key])}),$u(c,d.dials,u)}}return{state:a,dropped:o}}function $u(e,t,n){for(var a=Ha(e),r=0;r<a.dials.length;r++){var o=a.dials[r];o.stepWhen&&(t[o.key]=Qe(o,n&&typeof n[o.key]=="number"?n[o.key]:t[o.key],on(o,t)))}}function Ni(e){return xu(e).state}function Au(e){return JSON.parse(JSON.stringify(e))}var Eu=24,Fi={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Di(e,t,n){if(t==="bypass")return n?0:1;var a=fl(e,t)||Mu(e,t);return a?ba(a,n):0}function Mu(e,t){var n=ye(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var Su={};Tn.forEach(function(e){e.dials.forEach(function(t){Su[e.type+"."+t.key]=t.format})});function si(e,t){var n=new Float64Array(Eu),a=Ni(e);return a.chain.forEach(function(r){var o=Fi[r.type];n[o.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[o[s]]=Di(r.type,s,r.dials[s])})}),n}var wo={1:"It failed to start.",2:"It crashed while playing.",3:"It made bad numbers (NaN, infinity or runaway level).",4:"It crashed when a dial moved.",5:"Its code is not loaded.",6:"It got stuck in a loop, so it was stopped."},Tu=["hard","pump","swell","blip","glide"],ml=16;function Ge(e){for(var t=[],n=0;n<ml;n++)t.push(e[n%e.length]);return t}var zi=[{name:"Ducker",note:"The four-on-the-floor duck: every beat dips and comes back.",dials:{rate:4,steps:8,swing:0,depth:90,mode:0},levels:Ge([100]),shapes:Ge([1])},{name:"Tide",note:"One slow breath a bar.",dials:{rate:8,steps:16,swing:0,depth:85,mode:0},levels:Ge([15,35,60,85,100,85,60,35]),shapes:Ge([4])},{name:"Stutter",note:"A sixteenth gate with gaps.",dials:{rate:16,steps:16,swing:0,depth:100,mode:0},levels:[100,0,100,100,0,100,0,100,100,0,100,100,0,100,100,0],shapes:Ge([0])},{name:"Lope",note:"Swung eighths, short hits.",dials:{rate:8,steps:16,swing:50,depth:100,mode:0},levels:Ge([100,55,85,40,100,55,85,70]),shapes:Ge([3])},{name:"Embers",note:"Each eighth swells and cuts; the bar fades.",dials:{rate:8,steps:8,swing:0,depth:100,mode:0},levels:Ge([100,85,70,60,50,40,30,20]),shapes:Ge([2])},{name:"Sieve",note:"Filter mode: sixteenths open a low-pass, a climb at the end of the bar.",dials:{rate:16,steps:16,swing:0,depth:85,mode:1,res:35},levels:[100,20,55,25,95,25,60,35,100,20,55,25,70,80,90,100],shapes:[3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0]}],Lu="Ducker";function gl(e){for(var t=String(e||"").toLowerCase(),n=0;n<zi.length;n++){var a=zi[n];if(a.name.toLowerCase()===t)return{name:a.name,dials:Object.assign({},a.dials),pattern:{levels:a.levels.slice(),shapes:a.shapes.slice()}}}return null}function ko(e,t,n,a){return typeof e!="number"||!isFinite(e)?a:(e=Math.round(e),e<t?t:e>n?n:e)}function Ar(e){for(var t=zi[0],n=e&&typeof e=="object"?e:{},a=Array.isArray(n.levels)?n.levels:[],r=Array.isArray(n.shapes)?n.shapes:[],o={levels:[],shapes:[]},s=0;s<ml;s++)o.levels.push(ko(a[s],0,100,t.levels[s])+0),o.shapes.push(ko(r[s],0,Tu.length-1,t.shapes[s])+0);return o}function Cu(e){var t=Ar(e),n=[],a,r,o;for(a=0;a<4;a++){for(o=0,r=3;r>=0;r--)o=o*101+t.levels[a*4+r];n.push([10+a,o])}for(a=0;a<2;a++){for(o=0,r=7;r>=0;r--)o=o*5+t.shapes[a*8+r];n.push([14+a,o])}return n}var Nu=2,va=3,xo=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function At(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var Fu=/^local:[A-Za-z0-9._@-]{1,200}$/,Du=/^\d+\.\d+\.\d+$/;function zu(e,t){var n=At(e)?e:{},a=t.slice(7),r={id:a,version:typeof n.version=="string"&&Du.test(n.version)?n.version:"0.0.0",url:"",name:a};return typeof n.url=="string"&&n.url.length<=2048&&(/^https?:\/\//.test(n.url)||Fu.test(n.url))&&(r.url=n.url),typeof n.name=="string"&&n.name.trim()&&(r.name=n.name.trim().slice(0,40)),r}function bl(e){var t=e.plugin;return{id:t.id,version:t.version,url:t.url,name:e.label}}function Bu(e){var t={},n=0;if(At(e))for(var a in e)n<16&&/^[a-z][a-z0-9_]{0,31}$/.test(a)&&typeof e[a]=="number"&&isFinite(e[a])&&(t[a]=e[a],n++);return t}function qu(e){return e.plugin?e.plugin.idBase:e.type}function Er(e,t){var n=ye(e);if(!n)return null;var a={};(t||[]).forEach(function(d){d&&d.id&&(a[d.id]=!0)});for(var r=1,o=qu(n);a[o+"-"+r];)r++;var s={};n.dials.forEach(function(d){s[d.key]=d.default});var l={id:o+"-"+r,type:n.type,bypass:!1,dials:s};if(n.plugin&&(l.plugin=bl(n)),n.pattern){var c=gl(Lu);Object.assign(l.dials,c.dials),l.pattern=c.pattern}return l}function Ru(e){var t=ye(e.type),n=/-(\d+)$/.exec(e.id||""),a=t?t.label:e.plugin&&e.plugin.name?e.plugin.name:e.type;return a+(n&&+n[1]>1?" "+n[1]:"")}function Iu(e,t,n){var a=e.length-1,r=Math.max(0,Math.min(a,n));if(t<0||t>a||t===r)return e;var o=e.slice(),s=o.splice(t,1)[0];return o.splice(r,0,s),o}function Pu(e){return typeof e=="number"&&isFinite(e)?ku(e):e}function $o(e,t,n){var a={};return e.dials.forEach(function(r){var o=t[r.key];o===void 0&&r.astridKey&&(o=t[r.astridKey]),n&&e.type==="delay"&&r.key==="delay_beats"&&(o=Pu(o)),a[r.key]=e.plugin?Qe(r,o,r.step):Qe(r,o)}),e.dials.forEach(function(r){r.stepWhen&&(a[r.key]=Qe(r,typeof t[r.key]=="number"?t[r.key]:a[r.key],on(r,a)))}),a}function Ou(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,r=1/0,o=e.min;o<=e.max;o++){var s=$t(n.law,o),l=s===null?1/0:Math.abs(s-t);l<r&&(r=l,a=o)}return a}}var _u={rate:"rate_hz"};function ju(e,t,n,a){var r={};return e.dials.forEach(function(o){if(!o.more){var s=o.astridKey||_u[o.key]||o.key;r[o.key]=Ou(o,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function Hu(e,t){var n=t>0?Math.floor(t):va,a=[],r=[],o=[],s=!1,l=!1;Array.isArray(e)?(o=e,l=!0):At(e)&&Array.isArray(e.chain)&&(o=e.chain,s=e.v===1,l=e.schema===2);for(var c=[],d=0;d<o.length;d++){var u=o[d];if(At(u)&&!(u.type==="limiter"||u.fixed===!0)){var h=$r(u.type),f=h&&ye(h);if(!f&&!s&&pl(u.type)){if(c.length>=n){a.push(u.id||u.type);continue}for(var m=zu(u.plugin,u.type),g=m.id.split(".").pop(),y=1;c.some(function(w){return w.id===g+"-"+y});)y++;var p=typeof u.id=="string"&&xo.test(u.id)&&!c.some(function(w){return w.id===u.id})?u.id:g+"-"+y;c.push({id:p,type:u.type,bypass:u.bypass===!0,dials:Bu(u.dials),plugin:m});continue}if(!f||s&&["drive","delay","plate"].indexOf(h)<0){typeof u.type=="string"&&a.push(u.type);continue}if(c.length>=n){a.push(u.id||h);continue}var b;At(u.params)&&!At(u.dials)?b=$o(f,ju(f,u.params,r,u.id||h),l):b=$o(f,At(u.dials)?u.dials:{},l);var x=Er(h,c),v=typeof u.id=="string"&&xo.test(u.id)&&!c.some(function(w){return w.id===u.id})?u.id:x.id,S=s?u.bypass!==!1:u.bypass===!0,$={id:s?x.id:v,type:h,bypass:S,dials:b};f.plugin&&($.plugin=bl(f)),f.pattern&&($.pattern=Ar(u.pattern)),c.push($)}}return{state:{v:Nu,chain:c},dropped:a,notes:r}}function Ln(e,t){return Hu(e,t).state}function ot(e){var t=ye(e.type),n=[[0,e.bypass?0:1]];return t&&(t.dials.forEach(function(a){n.push([a.k,ba(a,e.dials[a.key])])}),t.pattern&&(n=n.concat(Cu(e.pattern)))),n}function Uu(e){var t=Ln(e,8),n=[],a=t.chain.filter(function(r){if(r.plugin)return n.push(r.id+": ASTRID has no plugins"),!1;var o=ye(r.type);return o&&o.own?(n.push(r.id+": ASTRID has no "+o.label),!1):!0}).map(function(r,o){var s=ye(r.type),l={};return o>=va&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(c){var d=r.dials[c.key];if(c.more){d!==c.default&&n.push(r.id+"."+c.key);return}c.key==="delay_beats"&&Li.indexOf(d)<0&&n.push(r.id+".delay_beats"),l[c.astridKey||c.key]=d}),{id:r.id,type:r.type,bypass:r.bypass,dials:l}});return{hacks:a,lossy:n}}var Wu=150,Gu=6e3,Vu=18,yl=6.283185307179586;function Ua(e,t,n){return e<t?t:e>n?n:e}function Yu(e,t,n,a,r){var o=Math.pow(10,n/40),s=yl*t/r,l=Math.cos(s),c=Math.sin(s),d,u,h,f,m,g,y,p;if(e===0||e===2){y=c/2*Math.SQRT2,p=2*Math.sqrt(o)*y;var b=e===0?1:-1;d=o*(o+1-b*(o-1)*l+p),u=b*2*o*(o-1-b*(o+1)*l),h=o*(o+1-b*(o-1)*l-p),f=o+1+b*(o-1)*l+p,m=-b*2*(o-1+b*(o+1)*l),g=o+1+b*(o-1)*l-p}else y=c/(2*a),d=1+y*o,u=-2*l,h=1-y*o,f=1+y/o,m=-2*l,g=1-y/o;return[d/f,u/f,h/f,m/f,g/f]}function Ku(e,t,n){var a=yl*t/n,r=Math.cos(a),o=Math.sin(a),s=Math.cos(2*a),l=Math.sin(2*a),c=e[0]+e[1]*r+e[2]*s,d=-(e[1]*o+e[2]*l),u=1+e[3]*r+e[4]*s,h=-(e[3]*o+e[4]*l);return 10*Math.log10((c*c+d*d)/(u*u+h*h))}var Ao={};function gt(e){return Ao[e]||(Ao[e]=mu("eq",e))}function Yt(e,t){var n=gt(t),a=e&&typeof e[t]=="number"&&isFinite(e[t])?e[t]:n.default;return Ua(a,n.min,n.max)}function vl(e){return[{id:"low",kind:0,hz:Wu,db:Yt(e,"low_db"),q:Math.SQRT1_2},{id:"mid",kind:1,hz:ba(gt("mid_hz"),Yt(e,"mid_hz")),db:Yt(e,"mid_db"),q:ba(gt("mid_q"),Yt(e,"mid_q"))},{id:"high",kind:2,hz:Gu,db:Yt(e,"high_db"),q:Math.SQRT1_2}]}function Xu(e,t,n){for(var a=vl(e),r=n.length,o=new Float64Array(r),s=[],l=t/2,c=0;c<a.length;c++){var d=a[c],u=new Float64Array(r);if(d.db!==0)for(var h=Yu(d.kind,d.hz,d.db,d.q,t),f=0;f<r;f++){var m=n[f]<l?n[f]:l*.9999;u[f]=Ku(h,m,t),o[f]+=u[f]}s.push(u)}return{total:o,bands:s}}function Qu(e){var t=gt("mid_hz").dsp.law;return Ua(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}function Ju(e){var t=gt("mid_q").dsp.law;return Ua(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}var wa={low:"low_db",mid:"mid_db",high:"high_db"},Zu={low:"Low",mid:"Mid",high:"High"};function ep(e,t,n){var a=[];function r(o,s){var l=gt(o),c=l.step||1;s=Ua(Math.round(s/c)*c,l.min,l.max),s===0&&(s=0),s!==Yt(e,o)&&a.push([o,s])}return typeof n.db=="number"&&wa[t]&&r(wa[t],n.db),t==="mid"&&typeof n.hz=="number"&&n.hz>0&&r("mid_hz",Qu(n.hz)),t==="mid"&&typeof n.q=="number"&&n.q>0&&r("mid_q",Ju(n.q)),a}function tp(e){var t=e==="mid"?["mid_db","mid_hz","mid_q"]:wa[e]?[wa[e]]:[];return t.map(function(n){return[n,gt(n).default]})}var ta=typeof WeakMap=="function"?new WeakMap:null;function np(e){var t=e&&e.output;if(!t||!t.context||typeof t.context.createAnalyser!="function")return null;var n=ta&&ta.get(e);return n||(n={node:null,users:0,handle:null},n.handle={open:function(){return e.status==="disposed"?null:(n.node||(n.node=t.context.createAnalyser(),n.node.fftSize=4096,n.node.smoothingTimeConstant=.8,n.node.minDecibels=-110,n.node.maxDecibels=0),n.users++===0&&t.connect(n.node),n.node)},close:function(){if(n.users!==0&&--n.users===0&&n.node)try{t.disconnect(n.node)}catch{}}},ta&&ta.set(e,n)),n.handle}function ap(e,t,n){var a=n||{},r={};["low_db","mid_db","mid_hz","mid_q","high_db"].forEach(function(u){var h=e&&typeof e.getParam=="function"?e.getParam(t,u):void 0;r[u]=typeof h=="number"?h:gt(u).default});var o=e&&e.output&&e.output.context,s=a.sampleRate||o&&o.sampleRate||48e3,l=a.help||{},c=vl(r).map(function(u){var h=(u.db>0?"+":u.db<0?"−":"")+Math.abs(u.db)+" dB",f=u.hz>=1e3?(u.hz/1e3).toFixed(u.hz>=1e4?0:1)+" kHz":Math.round(u.hz)+" Hz";return{id:u.id,label:Zu[u.id],kind:u.kind===0?"lowshelf":u.kind===1?"peak":"highshelf",hz:u.hz,db:u.db,q:u.q,moveHz:u.id==="mid",moveQ:u.id==="mid",minHz:u.id==="mid"?200:u.hz,maxHz:u.id==="mid"?5e3:u.hz,minQ:.3,maxQ:6,valueText:u.id==="mid"?h+" at "+f+", Q "+u.q.toFixed(1):h+(u.id==="low"?", shelf below ":", shelf above ")+f,help:l[u.id]}}),d=function(u){for(var h=0;h<u.length;h++)a.set(u[h][0],u[h][1])};return{type:"eqGraph",id:a.id,label:a.label||"EQ curve",range:Vu,sampleRate:s,on:a.on!==!1,bands:c,help:l.graph,response:function(u){return Xu(r,s,u)},spectrum:a.spectrum===!1?void 0:np(e)||void 0,onBand:function(u,h){d(ep(r,u,h))},onReset:function(u){d(tp(u).filter(function(h){return h[1]!==r[h[0]]}))}}}var ip="nc-fx@1",rp=600,op=256,sp=8,bn=typeof WeakMap=="function"?new WeakMap:null;function lp(e,t){var n=bn&&bn.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await du(async()=>{const{default:o}=await import("./worklet-source-Bi3zqun9.js");return{default:o}},[])).default,r=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),bn&&(bn.set(e,n),n.catch(function(){bn.delete(e)})),n)}function st(e,t){return typeof e=="number"&&isFinite(e)?e:t}function wl(e,t,n,a){var r=Math.min(400,Math.max(20,st(t.bpm,120))),o=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",c=st(t.preGain,1),d=Math.max(0,st(t.crossfade,.012)),u=st(t.maxDelaySeconds,void 0),h=e.createGain(),f=e.createGain(),m=e.createGain(),g=e.createGain(),y=null;t.modInput===!0&&(y=e.createGain(),y.channelCount=1,y.channelCountMode="explicit",y.channelInterpretation="discrete"),g.gain.value=0,h.connect(m),m.connect(f),g.connect(f);var p={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r,mUsers:0,lv:null,lvAt:0,clk:null},b=n(r);p.post=function(w){p.node?p.node.port.postMessage(w):p.disposed||(o.length>=op&&(o=a().concat([{t:"tempo",bpm:p.bpm,when:0}]),p.mUsers>0&&o.push({t:"meter",on:!0})),o.push(w))};function x(w){var k=o.map(function(E){var M=Object.assign({},E);return M.when>w||(M.when=0,M.t!=="clear"&&(M.snap=!0)),M});return o=[],k}p.emit=function(w){for(var k=0;k<p.listeners.length;k++)try{p.listeners[k](w)}catch(E){typeof console<"u"&&console.error(E)}},p.whenOf=function(w){return typeof w=="number"&&isFinite(w)&&w>0?w:0};var v=!1;p.tooFar=function(w){return typeof w=="number"&&w>e.currentTime+rp?(!v&&typeof console<"u"&&(v=!0,console.warn("nc-fx: ignoring a time "+Math.round(w-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var S=lp(e,t.moduleUrl).then(function(){if(!p.disposed){var w=Object.assign({bpm:r,bypassMode:l,limiter:s,preGain:c,maxDelaySeconds:u},b);w.pending=x(e.currentTime),p.node=new AudioWorkletNode(e,ip,{numberOfInputs:y?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:w}),p.node.port.onmessage=function(E){var M=E.data;if(M&&M.t==="lv"&&p.mUsers>0)p.lv=M.d,p.lvAt=Eo();else if(M&&M.t==="clk"&&M.d)p.clk={beat:M.d[0],frame:M.d[1],perFrame:M.d[2],locked:M.d[3]===1,bar:M.d[4]||4};else if(M&&M.t==="perr"&&p.onPluginError&&M.d)for(var C=0;C<(M.n|0);C++)p.onPluginError(M.d[2*C],M.d[2*C+1])},h.connect(p.node),y&&y.connect(p.node,0,1),p.node.connect(g);var k=e.currentTime;k<=0||d===0?(m.gain.value=0,g.gain.value=1):(m.gain.setValueAtTime(1,k),m.gain.linearRampToValueAtTime(0,k+d),g.gain.setValueAtTime(0,k),g.gain.linearRampToValueAtTime(1,k+d)),p.status="ready"}},function(w){p.status="unavailable",o=[],p.error=w});p.meterOpen=function(){return p.disposed||p.status==="unavailable"?!1:(p.mUsers++===0&&p.post({t:"meter",on:!0}),!0)},p.meterClose=function(){p.mUsers!==0&&--p.mUsers===0&&(p.lv=null,p.disposed||p.post({t:"meter",on:!1}))},p.levels=function(){return p.lv&&Eo()-p.lvAt<cp?p.lv:null};var $={};return p.meter=function(w,k){if($[w])return $[w];var E=0,M={in:0,out:0,gr:0},C={open:function(){return p.meterOpen()?(E++,!0):!1},close:function(){E!==0&&(E--,p.meterClose())},read:function(){var z=E>0?p.levels():null;return M.in=0,M.out=0,M.gr=0,z&&k(z,M),M}};return $[w]=C,C},p.core={input:h,output:f,modInput:y,ready:S,get status(){return p.status},get error(){return p.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function(w,k){var E=st(w,NaN);!(E>0)||p.disposed||p.tooFar(k)||(p.bpm=Math.min(400,Math.max(20,E)),p.post({t:"tempo",bpm:p.bpm,when:p.whenOf(k)}),p.emit({effect:null,key:"tempo",value:p.bpm}))},getTempo:function(){return p.bpm},setBeat:function(w,k){var E=st(w,NaN);E!==E||p.disposed||p.tooFar(k)||p.post({t:"beat",beat:E,when:p.whenOf(k)})},freeRun:function(w){p.disposed||p.tooFar(w)||p.post({t:"free",when:p.whenOf(w)})},setBar:function(w,k){var E=Math.round(st(w,NaN));!(E>=1&&E<=16)||p.disposed||p.tooFar(k)||p.post({t:"bar",beats:E,when:p.whenOf(k)})},beatAt:function(w){var k=p.clk;if(!k)return null;var E=typeof w=="number"&&isFinite(w)?w:e.currentTime;return{beat:k.beat+(E*e.sampleRate-k.frame)*k.perFrame,bpm:k.perFrame*60*e.sampleRate,locked:k.locked,beatsPerBar:k.bar}},clear:function(w){var k=w&&typeof w=="object"?w:{at:w};if(!(p.disposed||p.tooFar(k.at))){var E=st(k.fadeMs,0);p.post({t:"clear",when:p.whenOf(k.at),fadeMs:E>0?Math.min(1e3,E):0})}},onChange:function(w){return p.listeners.push(w),function(){var k=p.listeners.indexOf(w);k>=0&&p.listeners.splice(k,1)}},dispose:function(){if(!p.disposed){if(p.disposed=!0,p.status="disposed",o=[],p.listeners.length=0,p.node){p.node.port.postMessage({t:"dispose"}),p.node.port.close();try{p.node.disconnect()}catch{}}[h,m,g,f,y].forEach(function(w){try{w&&w.disconnect()}catch{}})}}},p}var cp=250;function Eo(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function kl(e,t){t.in=e[0],t.out=e[1]}function xl(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function dp(e,t){var n=t||{};if(n.slots)return up(e,n);var a=Ni(n.state),r=Array.from(si(a)),o=wl(e,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(si(a)),when:0}]}),s=o.core;function l(c){return a.chain[ja.indexOf(c)]}return s.setParam=function(c,d,u,h){var f=ya(c);if(!(!f||o.disposed||o.tooFar(h))){var m=l(f),g;if(d==="bypass")g=!!u;else{var y=fl(f,d);if(!y)return;g=Qe(y,u,on(y,m.dials))}return d==="bypass"?m.bypass=g:m.dials[d]=g,o.post({t:"p",i:Fi[f][d],v:Di(f,d,g),when:o.whenOf(h)}),o.emit({effect:f,key:d,value:g}),Ha(f).dials.forEach(function(p){if(!(!p.stepWhen||!p.stepWhen.some(function(v){return v.key===d}))){var b=m.dials[p.key],x=Qe(p,b,on(p,m.dials));x!==b&&(m.dials[p.key]=x,o.post({t:"p",i:Fi[f][p.key],v:Di(f,p.key,x),when:o.whenOf(h)}),o.emit({effect:f,key:p.key,value:x}))}}),g}},s.meter=function(){return o.meter("",kl)},s.getParam=function(c,d){var u=ya(c);if(u){var h=l(u);return d==="bypass"?h.bypass:h.dials[d]}},s.getState=function(){return Au(a)},s.setState=function(c,d){o.disposed||o.tooFar(d&&d.at)||(a=Ni(c),o.post({t:"load",program:Array.from(si(a)),when:o.whenOf(d&&d.at)}),o.emit({effect:null,key:null,value:null}))},s}function up(e,t){var n=t.slots===!0?va:Math.max(1,Math.min(sp,Math.floor(+t.slots)||va)),a=Ln(t.state,n),r=1,o={},s={};function l($){return!pl($.type)||ye($.type)!==null}function c($){var w=ye($.type);return w&&w.plugin?w.plugin.engine:$.type}function d($){return o[$.id]||(o[$.id]=r++),o[$.id]}function u($){return $.filter(l).map(function(w){return{uid:d(w),type:c(w),program:ot(w)}})}function h(){return a.chain.filter(l).map(function($){return o[$.id]})}var f=u(a.chain),m=h(),g=wl(e,t,function(){return{slots:n,chain:f,order:m}},function(){return[{t:"sync",chain:u(a.chain),order:h(),when:0}]}),y=g.core;g.onPluginError=function($,w){for(var k in o)o[k]===$&&(s[k]=w,g.emit({effect:k,key:"error",value:w}))};function p($){var w;for(w=0;w<a.chain.length;w++)if(a.chain[w].id===$)return a.chain[w];var k=$r($);if(k){for(w=0;w<a.chain.length;w++)if(a.chain[w].type===k)return a.chain[w]}return null}function b($,w){var k=d($);g.post({t:"add",uid:k,type:c($),when:w}),ot($).forEach(function(E){g.post({t:"ps",uid:k,k:E[0],v:E[1],when:w,snap:!0})})}function x($){g.post({t:"order",uids:h(),when:$})}function v($,w){var k={};a.chain.forEach(function(C){k[C.id]=C});var E=h().join();$.chain.forEach(function(C){var z=k[C.id];if(!l(C)){delete o[C.id];return}if(!z||z.type!==C.type||!o[C.id]){delete o[C.id],delete s[C.id],b(C,w);return}var G={};ot(z).forEach(function(X){G[X[0]]=X[1]}),ot(C).forEach(function(X){G[X[0]]!==X[1]&&g.post({t:"ps",uid:o[C.id],k:X[0],v:X[1],when:w})})});var M={};$.chain.forEach(function(C){M[C.id]=!0}),Object.keys(o).forEach(function(C){M[C]||delete o[C]}),Object.keys(s).forEach(function(C){M[C]||delete s[C]}),a=$,h().join()!==E&&x(w)}var S=y.dispose;return y.dispose=function(){S()},y.slots=n,y.meter=function($){return $==null||$===""?g.meter("",kl):g.meter("#"+$,function(w,k){var E=p($),M=E?o[E.id]:0,C=w[2];if(M){for(var z=3,G=0;G<C;G++,z+=4)if(w[z]===M){k.in=w[z+1],k.out=w[z+2],k.gr=w[z+3];return}}})},y.setParam=function($,w,k,E){var M=p($);if(!(!M||g.disposed||g.tooFar(E))){var C=ye(M.type),z,G=null;if(!C)return w!=="bypass"?void 0:(M.bypass=!!k,g.emit({effect:M.id,key:w,value:M.bypass}),M.bypass);if(w==="bypass")z=!!k;else{for(var X=0;X<C.dials.length;X++)C.dials[X].key===w&&(G=C.dials[X]);if(!G)return;z=Qe(G,k,on(G,M.dials))}var ce={},Be={};ot(M).forEach(function(R){ce[R[0]]=R[1]}),C.dials.forEach(function(R){R.stepWhen&&(Be[R.key]=M.dials[R.key])}),w==="bypass"?M.bypass=z:M.dials[w]=z,C.dials.forEach(function(R){R.stepWhen&&(M.dials[R.key]=Qe(R,M.dials[R.key],on(R,M.dials)))});var rt=g.whenOf(E),Ae=o[M.id];return Ae&&ot(M).forEach(function(R){(ce[R[0]]!==R[1]||G&&R[0]===G.k)&&g.post({t:"ps",uid:Ae,k:R[0],v:R[1],when:rt})}),g.emit({effect:M.id,key:w,value:z}),Object.keys(Be).forEach(function(R){R!==w&&M.dials[R]!==Be[R]&&g.emit({effect:M.id,key:R,value:M.dials[R]})}),z}},y.getParam=function($,w){var k=p($);if(k)return w==="bypass"?k.bypass:k.dials[w]},y.setPattern=function($,w,k){var E=p($);if(!(!E||!E.pattern||g.disposed||g.tooFar(k))){var M=w&&typeof w=="object"?w:{},C=Ar({levels:Array.isArray(M.levels)?M.levels:E.pattern.levels,shapes:Array.isArray(M.shapes)?M.shapes:E.pattern.shapes}),z={};ot(E).forEach(function(ce){z[ce[0]]=ce[1]}),E.pattern=C;var G=o[E.id],X=g.whenOf(k);return G&&ot(E).forEach(function(ce){z[ce[0]]!==ce[1]&&g.post({t:"ps",uid:G,k:ce[0],v:ce[1],when:X})}),g.emit({effect:E.id,key:"pattern",value:JSON.parse(JSON.stringify(C))}),JSON.parse(JSON.stringify(C))}},y.getPattern=function($){var w=p($);return w&&w.pattern?JSON.parse(JSON.stringify(w.pattern)):void 0},y.setGatePattern=function($,w,k){var E=p($),M=gl(w);return!E||!E.pattern||!M||g.disposed||g.tooFar(k)?!1:(Object.keys(M.dials).forEach(function(C){y.setParam(E.id,C,M.dials[C],k)}),y.setPattern(E.id,M.pattern,k),!0)},y.getState=function(){return JSON.parse(JSON.stringify(a))},y.setState=function($,w){g.disposed||g.tooFar(w&&w.at)||(v(Ln($,n),g.whenOf(w&&w.at)),g.emit({effect:null,key:null,value:null}))},y.addEffect=function($,w){var k=w||{},E=Er($,a.chain);if(!(!E||a.chain.length>=n||g.disposed||g.tooFar(k.at))){if(k.dials){var M=Ln({v:2,chain:[{id:E.id,type:E.type,dials:k.dials}]},1).chain[0];E.dials=M.dials}k.bypass===!0&&(E.bypass=!0);var C=a.chain.slice(),z=typeof k.index=="number"?Math.max(0,Math.min(C.length,k.index)):C.length;return C.splice(z,0,E),v({v:2,chain:C},g.whenOf(k.at)),g.emit({effect:E.id,key:"chain",value:"add"}),E.id}},y.removeEffect=function($,w){var k=p($),E=w&&w.at;return!k||g.disposed||g.tooFar(E)?!1:(v({v:2,chain:a.chain.filter(function(M){return M!==k})},g.whenOf(E)),g.emit({effect:k.id,key:"chain",value:"remove"}),!0)},y.moveEffect=function($,w,k){var E=p($),M=k&&k.at;if(!E||g.disposed||g.tooFar(M))return!1;var C=Iu(a.chain,a.chain.indexOf(E),w);return C===a.chain?!1:(v({v:2,chain:C},g.whenOf(M)),g.emit({effect:E.id,key:"chain",value:"move"}),!0)},y.getChain=function(){return a.chain.map(function($){var w={id:$.id,type:$.type,name:Ru($),bypass:$.bypass};if($.plugin){var k=s[$.id]||0,E=!l($)||k===5;w.plugin={id:$.plugin.id,version:$.plugin.version,url:$.plugin.url,name:$.plugin.name,status:E?"missing":k?"failed":"ready"},k&&!E&&(w.plugin.error=wo[k]||wo[2])}return w})},y.toAstrid=function(){return Uu(a)},y}function Mo(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function pp(e,t,n){var a=n||{},r=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,o=typeof a.toAudioTime=="function"?a.toAudioTime:r?function(p){return r.toContextTime(p)}:t&&t.timebase==="shared"?null:function(p){return p},s=typeof a.now=="function"?a.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,l=t&&t.transport?t.transport:t,c=l&&l.tempo?l.tempo:l,d=!1;function u(p){if(!o){!d&&typeof console<"u"&&(d=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof p!="number")){var b=o(l.timeAt(p));return typeof b=="number"&&isFinite(b)?b:void 0}}function h(){var p=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(p)){var b=l&&typeof l.bpm=="number"?l.bpm:Mo(c,0);b>0&&e.setTempo(b);return}var x=Mo(c,p);x>0&&e.setTempo(x);for(var v=c&&(c.points||c.tempoPoints)||[],S=0;S<v.length;S++){var $=v[S];if($.beat>p&&$.bpm>0){var w=u($.beat);w!==void 0&&e.setTempo($.bpm,w)}}}var f=typeof e.setBeat=="function";function m(){var p=l&&l.meter,b=p&&typeof p.beatsPerBar=="number"?p.beatsPerBar:0;f&&b>=1&&typeof e.setBar=="function"&&e.setBar(b)}function g(p){if(!(!o||typeof p!="number"||!isFinite(p))){var b=o(p);return typeof b=="number"&&isFinite(b)?b:void 0}}function y(){if(f){if(m(),!l||!l.running){e.freeRun();return}var p=s&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;isFinite(p)&&e.setBeat(p,u(p))}}return h(),y(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(p){p&&(p.kind==="tempo"&&p.bpm>0?e.setTempo(p.bpm,u(p.atBeat)):p.kind==="snapshot"?(h(),y()):p.kind==="start"?(h(),f&&typeof p.beat=="number"&&isFinite(p.beat)&&(m(),e.setBeat(p.beat,g(p.at)))):p.kind==="stop"&&f&&e.freeRun(g(p.at)))})}const hp="/lucy/assets/worklet-CwdWwkqb.js";var fp="nc-ui",mp={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","triki-charcoal":"#2E2E2E","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Mr={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959","brand-ink":"#2E2E2E",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","fill-rack":"#E2E2E2","fill-panel":"#FCFCFC","fill-cell":"#E4E4E4","fill-radius":"6px","fill-cell-radius":"3px","fill-gutter":"4px","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","select-mark":"8px","select-mark-h":"4px","select-mark-inset":"3px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},ka={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},gp={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},pt={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},bp={light:{color:mp.color,semantic:Mr,component:ka,runtime:gp},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","triki-charcoal":"#BFBEBD","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD","brand-ink":"#BFBEBD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","fill-rack":"#141312","fill-panel":"#2C2B2A","fill-cell":"#383736","fill-radius":"6px","fill-cell-radius":"3px","fill-gutter":"4px","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","select-mark":"8px","select-mark-h":"4px","select-mark-inset":"3px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},Bi=[{id:"prussian",name:"Prussian",about:"True greys and Prussian blue.",default:!0,swatch:{light:{paper:"#F5F5F5",surf:"#EAEAEA",accent:"#003153"},dark:{paper:"#1E1D1C",surf:"#4C4B4A",accent:"#77B5E2"}}},{id:"graphite",name:"Graphite",about:"Pure mono: only the instruments carry colour.",swatch:{light:{paper:"#F5F5F5",surf:"#EAEAEA",accent:"#2E2E2E"},dark:{paper:"#1D1D1D",surf:"#4B4B4B",accent:"#D9D9D9"}}},{id:"oxide",name:"Oxide",about:"Warm stone grey with a tape-oxide brown accent.",swatch:{light:{paper:"#F7F5F3",surf:"#ECE9E7",accent:"#5E3420"},dark:{paper:"#211C18",surf:"#504A45",accent:"#C9997A"}}},{id:"steel",name:"Steel",about:"Cool charcoal with a steel-blue accent.",swatch:{light:{paper:"#F3F5F8",surf:"#E8EAED",accent:"#2F5878"},dark:{paper:"#181E24",surf:"#454C54",accent:"#8FB4D6"}}},{id:"verdigris",name:"Verdigris",about:"Cool blue-grey like weathered copper, with a deep teal accent.",swatch:{light:{paper:"#F2F6F7",surf:"#E6EBEC",accent:"#0C4C56"},dark:{paper:"#161F21",surf:"#434E4F",accent:"#60B0BE"}}}],$n=e=>`--${fp}-${e}`,$l="data-nc-theme",So="nc-ui-theme-change",yp="(prefers-color-scheme: dark)",Sr=e=>e?.documentElement??null,Al=e=>e?.defaultView?.matchMedia?.(yp)??null,vp=e=>e==="light"||e==="dark"?e:"system";function wp(e=globalThis.document){return vp(Sr(e)?.getAttribute($l))}function qi(e=globalThis.document){let t=wp(e);return t!=="system"?t:Al(e)?.matches?"dark":"light"}var El="data-nc-skin",kp=(Bi.find(e=>e.default)??Bi[0])?.id??"prussian",xp=e=>Bi.some(t=>t.id===e)?e:kp;function $p(e=globalThis.document){return xp(Sr(e)?.getAttribute(El))}function Ml(e,t=globalThis.document){let n=Sr(t);if(!n)return()=>{};let a=()=>`${qi(t)} ${$p(t)}`,r=a(),o=()=>{let d=a();d!==r&&(r=d,e(qi(t)))},s=t.defaultView?.MutationObserver,l=s?new s(o):null;l?.observe(n,{attributes:!0,attributeFilter:[$l,El]});let c=Al(t);return c?.addEventListener?.("change",o),t.addEventListener(So,o),()=>{l?.disconnect(),c?.removeEventListener?.("change",o),t.removeEventListener(So,o)}}var Ri=Mr["label-on-fill-dark"],To=Mr["label-on-fill-light"],Ap=pt["label-min-contrast"],Ep=/^#[0-9a-f]{6}$/i,Mp=e=>typeof e=="string"&&Ep.test(e),la=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Lo(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),r=o=>{let s=(o+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${la(r(0)*255)}${la(r(8)*255)}${la(r(4)*255)}`}function Sl(e){let[t,n,a]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),r=Math.max(t,n,a),o=Math.min(t,n,a),s=(r+o)/2,l=r-o;if(!l)return{h:0,s:0,l:s};let c=l/(1-Math.abs(2*s-1));return{h:((r===t?60*((n-a)/l%6):r===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:c,l:s}}function Co(e){let[t,n,a]=[1,3,5].map(r=>{let o=parseInt(e.slice(r,r+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function Ii(e,t){let[n,a]=[Co(e),Co(t)].sort((r,o)=>o-r);return(n+.05)/(a+.05)}var xa=e=>Ii(e,Ri)>=Ii(e,To)?Ri:To;function Tl(e,t,n,a=Ap){let r=Lo(e,t,n),o=xa(r)===Ri?1:-1;for(let s=0;s<40&&Ii(r,xa(r))<a;s++)n+=o*.01,r=Lo(e,t,n);return r}function Sp(e){let{h:t,s:n}=Sl(e),a=Tl(t,Math.min(n,pt["surprise-on-max-saturation"]),pt["surprise-on-lightness"]);return{fill:e,ink:xa(e),on:a,onInk:xa(a)}}var Tp=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function Lp(e,t=Math.random){let[n,a]=pt["surprise-saturation"],[r,o]=pt["surprise-lightness"],s=pt["surprise-min-hue-gap"],l=Mp(e)?Sl(e).h:null,c=t()*360;return l!==null&&Tp(c,l)<s&&(c=(l+s+t()*(360-2*s))%360),Tl(c,n+t()*(a-n),r+t()*(o-r))}function Cp(e){if(!e)return null;let t=Sp(e);return{[$n("surprise-fill")]:t.fill,[$n("surprise-ink")]:t.ink,[$n("surprise-on")]:t.on,[$n("surprise-on-ink")]:t.onInk}}var Np=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Fp=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function No(e){let[t,n,a]=[1,3,5].map(l=>Np(parseInt(e.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),o=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*r+.793617785*o-.0040720468*s,1.9779984951*r-2.428592205*o+.4505937099*s,.0259040371*r+.7827717662*o-.808675766*s]}function Dp([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,r=(e-.1055613458*t-.0638541728*n)**3,o=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*r+.2309699292*o,-1.2684380046*a+2.6097574011*r-.3413193965*o,-.0041960863*a-.7034186147*r+1.707614701*o].map(s=>la(Fp(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var zp=pt["velocity-range"],Ll={min:ka.rhythm["velocity-min"],max:ka.rhythm["velocity-max"]},Fo=Object.fromEntries(Object.entries(bp).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Bp(e,t=Ll){let[n,a]=zp,r=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,o=(r-n)/(a-n),s=t.ink??ka.rhythm["step-cell-ink"];if(o<=0)return{velocity:r,t:0,fill:t.min.toUpperCase(),ink:s};if(o>=1)return{velocity:r,t:1,fill:t.max.toUpperCase(),ink:s};let l=No(t.min),c=No(t.max);return{velocity:r,t:o,fill:Dp(l.map((d,u)=>d+(c[u]-d)*o)),ink:s}}function Do(e,t=Ll){return{[$n("velocity-fill")]:Bp(e,t).fill}}var qp={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Rp={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","select-mark":"length","select-mark-h":"length","select-mark-inset":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","fill-rack":"color","fill-panel":"color","fill-cell":"color","fill-radius":"length","fill-cell-radius":"length","fill-gutter":"length","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Ip={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Pp={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Wa={};for(let[e,t]of Object.entries(Rp))Wa[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(Pp))Wa[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Ip))Wa[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(qp.renames.map(e=>[e.old,e.new]));function Cl(e){let t=Wa[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function Y(e){return Cl(e).prop}function i(e){return`var(${Y(e)})`}function Op(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(Y(t)));return Number.isFinite(n)?n:0}function oe(e,t){let n=Cl(t),a=e.ownerDocument??document,r=a.createElement("span");r.dataset.ncLive=t,r.style.position="absolute",r.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=o:r.style.color=o,(e instanceof Element?e:a.documentElement).append(r);let s=(a.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function Nl(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function _p(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=i("font-ui"),n.style.fontSize=i("label-size"),n.style.fontWeight=i("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var jp="[data-modulated], [data-modulated] *";function li(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function zo(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${i("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${i("hairline")} solid ${i("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function ci(e){return`  background-image: conic-gradient(from -45deg at 50% 100%, ${i(e)} 90deg, transparent 0);`}function Hp(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${Y("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${Y("divider")}: ${i(`module-div-stack-${a}`)};
      ${Y("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${Y("text-sub")}: ${i("module-sub-stack-1")};
      ${Y("divider")}: ${i("module-div-stack-1")};
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
${jp} { transition: none; }
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
/* The ▾ (Peter, 2026-11-23: "1/8" and "50%" didn't look like dropdowns; 2026-11-24: ASTRID's ▾, 8×4 px, 3 px in, on
   every instrument). A small solid
   triangle at the select's end, inside its end padding, so the words keep their room: quiet (text-sub), the text
   colour on hover and focus, the divider grey when the select is off. Drawn as a background (a <select> has no
   ::after), so it is the same on every platform and font. .nc-dd puts the same ▾ on an app's own select. */
:is(.nc-select, .nc-dd) {
${ci("text-sub")}
  background-size: ${i("select-mark")} ${i("select-mark-h")};
  background-position: right ${i("select-mark-inset")} top 55%;
  background-repeat: no-repeat;
  background-origin: border-box;
}
.nc-dd { appearance: none; }
:is(.nc-select, .nc-dd):is(:hover, :focus):not(:disabled) {
${ci("text")}
}
:is(.nc-select, .nc-dd):disabled {
${ci("divider")}
}
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
  clip-path: polygon(0 0, 100% 50%, 0 100%);
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
  ${Y("text-sub")}: ${i("module-sub-stack-1")};
  ${Y("divider")}: ${i("module-div-stack-1")};
  ${Y("slider-track")}: ${i("module-div-stack-1")};
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
  ${Y("text-sub")}: ${i("module-sub-stack-1")};
  ${Y("divider")}: ${i("module-div-stack-1")};
  ${Y("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${i("control-gap")} ${i("module-pad")};
  padding-bottom: ${i("module-pad")};
  background: ${i("module-bg-stack-1")};
  ${Y("text-sub")}: ${i("module-sub-stack-1")};
  ${Y("divider")}: ${i("module-div-stack-1")};
  ${Y("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${Y("text-sub")}: inherit;
  ${Y("divider")}: inherit;
  ${Y("slider-track")}: inherit;
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
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${Y("divider")}: color-mix(in oklab, ${i("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${Y("meter-track")}: color-mix(in oklab, ${i("text-sub")} 30%, var(--nc-strip-shade)); }
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
   ◀ in the corner, the name row kept but unseen, M and S stacked over the Inserts and M/S rows, then the name read bottom to top under a small mark in the
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
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${Y("divider")}: ${i("strip-divider")}; }
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
${zo("")}
}
@media (max-width: 1023px) {
${zo("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${li("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${li("")}
}
@media (max-width: 1023px) {
${li("html[data-nc-landscape] ")}
}
/* Filled panels (data-nc-fill on <html>, Peter 2026-11-19), an option over any skin: the page is a darker ground,
   each module a raised card (an inset ring of the ground makes the gutter, so nothing moves), empty steps are soft
   solid cells instead of outlines, and a host may wash each console strip in its instrument's colour (a custom
   property it sets on the strip; README, Filled panels). A strip with a shade the player picked keeps that shade. */
:root[data-nc-fill], :root[data-nc-fill] body { background: ${i("fill-rack")}; }
:root[data-nc-fill] .nc-module,
:root[data-nc-fill] .nc-module[data-nc-place][data-nc-shade] {
  background: ${i("fill-panel")};
  border-radius: ${i("fill-radius")};
  box-shadow: inset 0 0 0 ${i("fill-gutter")} ${i("fill-rack")};
}
:root[data-nc-fill] .nc-module[data-nc-place="stack"] > .nc-module-hd { border-radius: ${i("fill-radius")} ${i("fill-radius")} 0 0; }
:root[data-nc-fill] .nc-step:not([aria-pressed="true"]):not([data-out="true"]) {
  background: ${i("fill-cell")};
  border-color: ${i("fill-cell")};
  border-radius: ${i("fill-cell-radius")};
}
:root[data-nc-fill] .nc-step[aria-pressed="true"] { border-radius: ${i("fill-cell-radius")}; }
:root[data-nc-fill] .nc-step[data-bar="true"]:not([aria-pressed="true"]):not([data-out="true"]) { border-bottom-color: ${i("rhythm.bar-accent")}; }
:root[data-nc-fill] .nc-strip:not([data-nc-master]):not([data-nc-shade]),
:root[data-nc-fill] .nc-strip:not([data-nc-master]):not([data-nc-shade]):nth-child(even of .nc-strip:not([data-nc-master])) {
  --nc-strip-ground: color-mix(in srgb, var(--nc-strip-identity, ${i("fill-panel")}) 9%, ${i("fill-panel")});
  border-radius: ${i("fill-radius")};
}
:root[data-nc-fill][data-nc-theme="dark"] .nc-strip:not([data-nc-master]):not([data-nc-shade]),
:root[data-nc-fill][data-nc-theme="dark"] .nc-strip:not([data-nc-master]):not([data-nc-shade]):nth-child(even of .nc-strip:not([data-nc-master])) {
  --nc-strip-ground: color-mix(in srgb, var(--nc-strip-identity, ${i("fill-panel")}) 14%, ${i("fill-panel")});
}
@media (prefers-color-scheme: dark) {
  :root[data-nc-fill]:not([data-nc-theme="light"]) .nc-strip:not([data-nc-master]):not([data-nc-shade]),
  :root[data-nc-fill]:not([data-nc-theme="light"]) .nc-strip:not([data-nc-master]):not([data-nc-shade]):nth-child(even of .nc-strip:not([data-nc-master])) {
    --nc-strip-ground: color-mix(in srgb, var(--nc-strip-identity, ${i("fill-panel")}) 14%, ${i("fill-panel")});
  }
}
:root[data-nc-fill] .nc-strip + .nc-strip { border-inline-start-color: ${i("fill-panel")}; }
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
`}var di=null,Up="nc-ui-fallback";function Fl(e=globalThis.document){if(!e?.documentElement||(e.documentElement,di&&di.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Up} {
${Hp()}
}
`,e.head.append(t),di=t}var Wp=new URL("/lucy/assets/confirm-DwyQU4Nn.css",import.meta.url).href,Gp=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Wp,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Gp(document);function Tr(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.dataset.ncOn="",r.textContent=e.onText??"On";let o=t.createElement("span");o.dataset.ncOff="",o.textContent=e.offText??"Off",a.append(r,o),n.append(a);let s=!1,l=d=>{s=d===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let c=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",c),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var Dl=new WeakMap,Bo=.25;function Vp(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(a,r);let o=0,s=e.step??.005,l=e.onChange,c=e.onReset,d=p=>Math.min(1,Math.max(0,p)),u=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},h=p=>{let b=d(p);b!==o&&(o=b,u(),l?.(b))},f=0,m=!1;n.addEventListener("pointerdown",p=>{if(p.button!==0)return;p.preventDefault(),n.focus?.({preventScroll:!0});let b=n.getBoundingClientRect();p.target!==r&&b.height>0&&h(1-(p.clientY-b.top)/b.height),f=p.clientY,m=!0,n.dataset.dragging="true",n.setPointerCapture?.(p.pointerId)}),n.addEventListener("pointermove",p=>{if(!m)return;let b=n.getBoundingClientRect().height||1,x=(f-p.clientY)/b*(p.shiftKey?Bo:1);f=p.clientY,h(o+x)});let g=()=>{m=!1,delete n.dataset.dragging};n.addEventListener("pointerup",g),n.addEventListener("pointercancel",g),n.addEventListener("lostpointercapture",g),n.addEventListener("dblclick",p=>{p.preventDefault(),c?.()}),n.addEventListener("keydown",p=>{let b=p.shiftKey?s*Bo:s,x={ArrowUp:o+b,ArrowRight:o+b,ArrowDown:o-b,ArrowLeft:o-b,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};p.key in x&&(p.preventDefault(),h(x[p.key]))});let y={el:n,get value(){return o},get dragging(){return m},set(p){m||(o=d(Number(p)||0),u())},setText(p){p?n.setAttribute("aria-valuetext",p):n.removeAttribute("aria-valuetext")},setLabel(p){n.setAttribute("aria-label",p)},configure(p){typeof p.step=="number"&&p.step>0&&(s=p.step),p.onChange&&(l=p.onChange),p.onReset&&(c=p.onReset)}};return y.setLabel(e.label),y.set(e.value??0),y.setText(e.valueText),Dl.set(n,y),y}function Yp(e){return Dl.get(e)}var zl=new WeakMap,Kp=.2,Xp=1.5,Qp=.5;function Jp(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function qo(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Jp(a.getComputedStyle(e).getPropertyValue(Y(t)),n)}function Zp(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let r=t.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let o=t.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let y=0;y<n;y++){let p=t.createElement("span");p.className="nc-meter-bar";let b=t.createElement("span");b.className="nc-meter-peak";let x=t.createElement("span");x.className="nc-meter-rms";let v=t.createElement("span");v.className="nc-meter-hold",p.append(b,x,v),o.append(p),s.push({peak:b,rms:x,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(r,o);let l=e.label,c=e.onClear,d=!1,u=-1,h=-1,f=()=>{r.dataset.lit=d?"true":"false",r.setAttribute("aria-pressed",d?"true":"false"),r.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),r.title=d?"Clipped. Click to clear":"Clip light"},m=(y,p,b,x)=>{let v=Math.round(x*1e3)/1e3;b[p]!==v&&(b[p]=v,y.style.transform=p==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};r.addEventListener("click",()=>{g.clear(),c?.()});let g={el:a,get clipped(){return d},update(y,p){u<0&&(u=qo(a,"motion-meter-fall",Kp)),h<0&&(h=qo(a,"motion-meter-hold",Xp));let b=Math.max(0,Math.min(.25,Number(p)||0)),x=u>0?Math.exp(-b/u):0;s.forEach((v,S)=>{let $=y[S]??y[0]??{peak:0,rms:0},w=Math.min(1,Math.max(0,Number($.peak)||0)),k=Math.min(w,Math.max(0,Number($.rms)||0));$.over&&g.clip(),v.level.peak=w>=v.level.peak?w:w+(v.level.peak-w)*x,v.level.rms=k>=v.level.rms?k:k+(v.level.rms-k)*x,v.holdAge+=b,w>=v.holdAt?(v.holdAt=w,v.holdAge=0):v.holdAge>h&&(v.holdAt=Math.max(w,v.holdAt-Qp*b)),m(v.peak,"peak",v.shown,v.level.peak),m(v.rms,"rms",v.shown,v.level.rms),m(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,f())},clear(){d=!1,f()},reset(){for(let y of s)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,m(y.peak,"peak",y.shown,0),m(y.rms,"rms",y.shown,0),m(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,f()},configure(y){y.onClear&&(c=y.onClear)}};return f(),g.reset(),zl.set(a,g),g}function eh(e){return e?zl.get(e):void 0}var th=3,nh=new Set(["freq","q","rate","time","log"]);function Lr(e,t,n){return!e||!nh.has(e)||!(n>t)?"linear":t>0?"log":"power"}function Ga(e,t,n){return Lr(e,t,n)!=="linear"}function $a(e,t,n,a){let r=Number(a);if(!(n>t)||!Number.isFinite(r))return 0;let o=Math.min(n,Math.max(t,r)),s=Lr(e,t,n);if(s==="log")return Math.log(o/t)/Math.log(n/t);let l=(o-t)/(n-t);return s==="power"?Math.cbrt(l):l}function Bl(e,t,n,a){let r=Math.min(1,Math.max(0,Number(a)||0)),o=Lr(e,t,n);return o==="log"?t*(n/t)**r:t+(n-t)*(o==="power"?r**th:r)}function ql(e,t,n,a){let r=Math.min(n,Math.max(t,e));if(a>0){r=t+Math.round((r-t)/a)*a;let o=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));r=Number(r.toFixed(o)),r=Math.min(n,Math.max(t,r))}return r}function Cr(e,t,n,a){return Math.round($a(e,t,n,a)*1e3)}function Pi(e,t,n,a,r){return ql(Bl(e,t,n,Number(a)/1e3),t,n,r)}function ah(e,t,n=!1){let a=Number(e)||0,r=n?1:1e3/100,o=null;return t==="ArrowRight"||t==="ArrowUp"?o=a+r:t==="ArrowLeft"||t==="ArrowDown"?o=a-r:t==="PageUp"?o=a+1e3/10:t==="PageDown"?o=a-1e3/10:t==="Home"?o=0:t==="End"&&(o=1e3),o===null?null:Math.min(1e3,Math.max(0,Math.round(o)))}function Rl(e,t,n,a,r,o=!1,s){let l=Cr(e,t,n,a),c=ah(l,r,o);if(c===null)return null;let d=Pi(e,t,n,c,s),u=Math.sign(c-l),h=ql(Number(a),t,n,s);for(;u!==0&&d===h&&c>0&&c<1e3;)c+=u,d=Pi(e,t,n,c,s);return d}function ih(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function Ro(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function rh(e,t,n,a=n/6){let r=e.some(u=>u===null),o=Math.max(0,n-(r?a:0)),s=e.reduce((u,h,f)=>h===null?u:u+Ro(t[f]),0),l=s>0?o/s:0,c=e.map(u=>u===null?0:Math.min(o,Ro(u)*l));if(r){let u=c.reduce((f,m)=>f+m,0),h=e.indexOf(null);c[h]=Math.max(a,n-u)}let d=[0];for(let u of c)d.push(Math.round((d[d.length-1]+u)*100)/100);return r&&(d[d.length-1]=n),d}function oh(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(t*a)),o=Math.max(1,Math.floor(n*a));(e.width!==r||e.height!==o)&&(e.width=r,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function lt(e){return Math.max(0,Math.min(1,e))}function Il(e,t){let{ctx:n,w:a,h:r}=oh(e);if(!n)return;n.clearRect(0,0,a,r);let o=_p(e);if(t.paint==="swatch"){let c=oe(e,"accent"),d=oe(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,a/2,r),n.fillStyle=d,n.fillRect(a/2,0,a/2,r);return}if(t.paint==="filter"&&typeof t.hz=="number"){ch(n,a,r,t,e,o);return}if(t.paint==="filter"){let c=t.mode??"lp",d=oe(e,Nl(c)),u=oe(e,"divider"),h=lt(t.cutoff??.5),f=.08+(1-lt(t.resonance??.2))*.22;n.strokeStyle=u,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(a,r*.72),n.stroke(),n.beginPath();for(let m=0;m<=a;m++){let g=m/Math.max(1,a),y=0;c==="lp"?y=g<h?1:Math.max(0,1-(g-h)/f):c==="hp"?y=g>h?1:Math.max(0,1-(h-g)/f):y=Math.max(0,1-Math.abs(g-h)/f);let p=r*.78-y*r*.62;m===0?n.moveTo(m,p):n.lineTo(m,p)}n.strokeStyle=d,n.stroke(),n.fillStyle=oe(e,"text-sub"),n.font=o,n.fillText(c.toUpperCase(),0,r),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=oe(e,"accent");let c=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[u,h,f]=rh([c,d],t.max??[1,4],a),m=2,g=r-1;n.beginPath(),n.moveTo(u,g),n.lineTo(h,m);let y=Math.max(1,Math.ceil(f-h));for(let p=1;p<=y;p++){let b=p/y;n.lineTo(h+(f-h)*b,g-(g-m)*Math.exp(-4.6*b)*(1-b*.01))}n.lineTo(f,g),n.lineTo(a,g),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[d,u]=Array.isArray(t.region)?t.region:[0,1],h=oe(e,"accent"),f=oe(e,"text-sub"),m=r/2;n.fillStyle=oe(e,"accent-soft"),n.fillRect(lt(d)*a,0,(lt(u)-lt(d))*a,r),n.strokeStyle=oe(e,"divider"),n.beginPath(),n.moveTo(0,m),n.lineTo(a,m),n.stroke();let g=Math.floor(c.length/2);for(let y=0;y<g;y++){let p=(y+.5)/g*a,b=Math.max(-1,Math.min(1,c[y*2]??0)),x=Math.max(-1,Math.min(1,c[y*2+1]??0)),v=(y+.5)/g;n.strokeStyle=v>=d&&v<=u?h:f,n.beginPath(),n.moveTo(p,m-x*(m-1)),n.lineTo(p,m-b*(m-1)+.5),n.stroke()}n.strokeStyle=h;for(let y of[d,u,...Array.isArray(t.markers)?t.markers:[]]){let p=Math.round(lt(y)*(a-1))+.5;n.beginPath(),n.moveTo(p,0),n.lineTo(p,r),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=oe(e,"text"),n.fillRect(Math.round(lt(t.position)*(a-1)),0,1,r)),g||(n.fillStyle=f,n.font=o,n.fillText(t.empty??"Empty",0,m+4)),e.dataset.ncAccent=h;return}if(t.paint==="meter"){let c=lt(t.level??0);n.fillStyle=oe(e,"divider"),n.fillRect(0,r*.4,a,r*.2),n.fillStyle=oe(e,"accent"),n.fillRect(0,r*.4,a*c,r*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=oe(e,"rhythm.step-cell-off"),n.fillRect(0,r*.45,a,r*.1),n.fillStyle=oe(e,"rhythm.playhead"),n.fillRect(l/s*a,r*.3,Math.max(1,a/s),r*.4),e.dataset.ncAccent=oe(e,"accent")}var Cn=20,Oi=2e4,ui=24,Io=-60;function sh(e,t,n,a,r=48e3){let o=2*Math.PI*Math.min(t,r*.49)/r,s=Math.cos(o),l=Math.sin(o)/(2*n),c,d,u;e==="hp"?[c,d,u]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[c,d,u]=[l,0,-l]:[c,d,u]=[(1-s)/2,1-s,(1-s)/2];let h=1+l,f=-2*s,m=1-l,g=2*Math.PI*a/r,y=(v,S,$)=>v+S*Math.cos(g)+$*Math.cos(2*g),p=(v,S)=>-(v*Math.sin(g)+S*Math.sin(2*g)),b=Math.hypot(y(c,d,u),p(d,u)),x=Math.hypot(y(h,f,m),p(f,m));return x>0?b/x:0}function lh(e,t){return Math.log(Math.max(Cn,Math.min(Oi,e))/Cn)/Math.log(Oi/Cn)*t}function Po(e,t,n){let a=Math.max(Io,Math.min(ui,e));return t+(ui-a)/(ui-Io)*(n-t)}function ch(e,t,n,a,r,o){let s=a.mode??"lp",l=oe(r,Nl(s)),c=oe(r,"divider"),d=oe(r,"text-sub"),u=Number.parseFloat(String(o).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),h=1,f=Math.max(h+4,n-u-3),m=a.q??Math.SQRT1_2,g=Math.round(Po(0,h,f))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,g),e.lineTo(t,g),e.stroke(),e.beginPath();for(let y=0;y<=t;y++){let p=Cn*(Oi/Cn)**(y/Math.max(1,t)),b=a.open?1:sh(s,a.hz,m,p,a.sampleRate),x=Po(20*Math.log10(Math.max(1e-5,b)),h,f);y===0?e.moveTo(y,x):e.lineTo(y,x)}if(e.strokeStyle=l,e.stroke(),!a.open){let y=Math.round(lh(a.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(y,h),e.lineTo(y,f),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=o,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",r.dataset.ncAccent=l,r.dataset.ncFilterHz=String(Math.round(a.hz))}function Re(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let r=n.defaultView.getComputedStyle(a).color;return a.remove(),r}function dh(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var Ct=20,Hn=2e4,Nr=Math.log(Hn/Ct),_i=32,uh=250,ph=-100,hh=1200,fh=4.5,Oo=-6,Et=-96,mh=48,_o=[100,1e3,1e4],gh=[6,12];function Zt(e,t){return Math.log(Math.max(Ct,Math.min(Hn,e))/Ct)/Nr*t}function ca(e,t){return Ct*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Nr)}function ht(e,t,n,a){let r=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*r}function ji(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var Pl=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function bh(e,t,n,a){let r=n?3:1,o=c=>({db:Math.max(-a,Math.min(a,e.db+c*r))}),s=c=>({hz:Math.max(e.minHz??Ct,Math.min(e.maxHz??Hn,e.hz*2**(c*r/6)))}),l=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*r)))});switch(t){case"ArrowUp":return o(1);case"ArrowDown":return o(-1);case"ArrowRight":return e.moveHz?s(1):o(1);case"ArrowLeft":return e.moveHz?s(-1):o(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Fr(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function yh(e,t,n,a,r,o,s,l,c){let d=c?.25:1,u={},h=Math.max(1,o/2-l);if(u.db=Math.max(-s,Math.min(s,t.db-a*d/h*s/Fr(e))),e.moveHz){let f=t.hz*Math.exp(n*d/Math.max(1,r)*Nr);u.hz=Math.max(e.minHz??Ct,Math.min(e.maxHz??Hn,f))}return u}function vh(e,t,n,a,r){let o=Math.max(0,n.left)+1,s=Math.min(n.right,r)-1,l=Math.min(t.width*3+a*2,s-o),c=Math.max(o,Math.min(e.left,s-l));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var he=new WeakMap;function wh(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let r=document.createElement("canvas");r.className="nc-eq-spectrum",r.setAttribute("aria-hidden","true");let o=document.createElement("canvas");o.className="nc-eq-curve",o.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(r,o);for(let c of e.bands)a.append(kh(n,c,t));a.append(s),a.addEventListener("click",c=>{if(!Wl(n)||c.button>0)return;let d=Ul(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),he.set(n,{control:e,cache:null,spec:null,active:null}),_l(n,e),n}function Ol(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function kh(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let r=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},o=()=>r()?.bands.find(d=>d.id===t.id)??null,s=null;a.addEventListener("pointerdown",d=>{if(d.button!==0)return;let u=o();u&&(d.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(d.pointerId),s={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:u.hz,db:u.db}},a.dataset.drag="true",ct(e,t.id))}),a.addEventListener("pointermove",d=>{if(!s||d.pointerId!==s.id)return;let u=r(),h=o(),f=he.get(e);if(!u||!h||!f?.box)return;let{w:m,h:g,pad:y}=f.box;u.onBand(h.id,yh(h,s.start,d.clientX-s.x,d.clientY-s.y,m,g,u.range??18,y,d.shiftKey))});let l=d=>{!s||d.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&ct(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",d=>{d.preventDefault(),r()?.onReset?.(t.id)}),a.addEventListener("keydown",d=>{let u=r(),h=o();if(!u||!h)return;let f=bh(h,d.key,d.shiftKey,u.range??18);f&&(d.preventDefault(),f==="reset"?u.onReset?.(h.id):u.onBand(h.id,f),ct(e,h.id))});let c=null;return a.addEventListener("wheel",d=>{let u=r(),h=o();if(!u||!h?.moveQ)return;d.preventDefault();let f=d.timeStamp;(!c||f-c.t>400)&&(c={q:h.q,t:f});let m=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(h.minQ??.1,Math.min(h.maxQ??20,c.q*2**(-m/240))),c.t=f,u.onBand(h.id,{q:c.q}),ct(e,h.id)},{passive:!1}),a.addEventListener("pointerenter",()=>ct(e,t.id)),a.addEventListener("focus",()=>ct(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&ct(e,null)}),a.addEventListener("blur",()=>{s||ct(e,null)}),a}function ct(e,t){let n=he.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?sn(e):Dr(e)}function Dr(e){let t=he.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(g=>g.id===t.active):null;for(let g of e.querySelectorAll(".nc-eq-node"))g instanceof HTMLElement&&(a&&g.dataset.band===a.id?g.dataset.active="true":delete g.dataset.active);if(!a||!t.box){n.hidden=!0;return}let r=[a.label,Pl(a.db)];a.kind==="peak"?r.push(ji(a.hz),`Q ${a.q.toFixed(1)}`):r.push(`${a.kind==="lowshelf"?"below":"above"} ${ji(a.hz)}`),n.textContent=r.join(" · "),n.dataset.tone=String(xh(t.control,a)),n.hidden=!1;let{w:o,h:s,pad:l}=t.box,c=Zt(a.hz,o),d=ht(a.db*Fr(a),s,t.control.range??18,l),u=n.offsetWidth,h=n.offsetHeight,f=Math.max(0,Math.min(o-u,c-u/2)),m=d-h-l*1.5>=0?d-h-l*1.5:Math.min(s-h,d+l*1.5);n.style.left=`${Math.round(f)}px`,n.style.top=`${Math.round(m)}px`}function xh(e,t){return e.bands.indexOf(t)%3+1}function _l(e,t){let n=he.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",zr(e);let a=t.range??18;t.bands.forEach((r,o)=>{let s=Ol(e,r.id);s instanceof HTMLElement&&(s.dataset.tone=String(o%3+1),s.dataset.kind=r.kind,s.setAttribute("aria-label",`${r.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(r.db)),s.setAttribute("aria-valuetext",r.valueText??`${Pl(r.db)}, ${ji(r.hz)}`),s.setAttribute("aria-keyshortcuts",r.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),r.help?s.setAttribute("data-nc-help",r.help):s.removeAttribute("data-nc-help"))}),sn(e),Th(e)}function jl(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.round(t*a)),o=Math.max(1,Math.round(n*a));(e.width!==r||e.height!==o)&&(e.width=r,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function Hl(e){return{curve:Re(e,"eq-curve"),fill:Re(e,"eq-fill"),quiet:Re(e,"text-sub"),grid:Re(e,"eq-grid"),zero:Re(e,"divider"),label:Re(e,"text-sub"),spectrum:Re(e,"eq-spectrum"),bands:[Re(e,"eq-band-1"),Re(e,"eq-band-2"),Re(e,"eq-band-3")]}}function $h(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function sn(e){he.has(e)&&zr(e);let t=he.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:r,w:o,h:s}=jl(n);if(!r)return;let l=Math.max(8,Math.round(s*.06)),c=a.range??18;t.box={w:o,h:s,pad:l},t.colours=Hl(e);let d=t.colours,u=$h(a,o);if(!t.cache||t.cache.key!==u){let S=Math.max(64,Math.ceil(o)+1),$=new Float64Array(S);for(let k=0;k<S;k++)$[k]=ca(k/(S-1)*o,o);let w=null;try{w=typeof a.response=="function"?a.response($):null}catch{w=null}t.cache={key:u,freqs:$,total:w?.total??new Float64Array(S),bands:w?.bands??[]}}r.clearRect(0,0,o,s);let h=dh(e),f=a.on!==!1;Ah(r,o,s,c,l,d,h);let{freqs:m,total:g,bands:y}=t.cache,p=Array.from(m,S=>Zt(S,o)),b=ht(0,s,c,l);y.forEach((S,$)=>{if(!S||!S.some(E=>Math.abs(E)>.05))return;let w=f?d.bands[$%3]:d.quiet,k=Array.from(S,E=>ht(E,s,c,l));r.save(),t.active&&a.bands[$]?.id===t.active&&(r.globalAlpha=.14,r.fillStyle=w,jo(r,p,k,b)),r.globalAlpha=f?.75:.4,r.strokeStyle=w,r.lineWidth=.75,pi(r,p,k),r.restore()});let x=Array.from(g,S=>ht(S,s,c,l)),v=f?d.curve:d.quiet;r.save(),r.fillStyle=f?d.fill:d.quiet,r.globalAlpha=f?.2:.08,jo(r,p,x,b),r.restore(),r.save(),r.strokeStyle=f?d.fill:v,r.lineJoin="round",r.lineCap="round",f&&(r.globalAlpha=.16,r.lineWidth=4,pi(r,p,x)),r.globalAlpha=1,r.strokeStyle=v,r.lineWidth=1.25,pi(r,p,x),r.restore(),Eh(e),Dr(e)}function Ah(e,t,n,a,r,o,s){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let u=c*d;if(u<Ct||u>Hn)continue;let h=Math.round(Zt(u,t))+.5;e.globalAlpha=_o.includes(u)?.9:.35,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(h,0),e.lineTo(h,n),e.stroke()}for(let c of gh)if(!(c>a))for(let d of[1,-1]){let u=Math.round(ht(c*d,n,a,r))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(0,u),e.lineTo(t,u),e.stroke()}e.globalAlpha=1,e.strokeStyle=o.zero;let l=Math.round(ht(0,n,a,r))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=o.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of _o){let d=c>=1e3?`${c/1e3}k`:String(c),u=e.measureText(d).width,h=Zt(c,t)+3;e.fillText(d,h+u+2>t?Zt(c,t)-u-3:h,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>a)continue;let d=ht(c,n,a,r);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(d)-1)}e.restore()}function Aa(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let r=(t[a]+t[a+1])/2,o=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],r,o)}e.lineTo(t[t.length-1],n[n.length-1])}function pi(e,t,n){e.beginPath(),Aa(e,t,n),e.stroke()}function jo(e,t,n,a){e.beginPath(),Aa(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function Ul(e){return e.closest("[data-nc-maxable]")}function Wl(e){let t=Ul(e);return!!t&&!t.hasAttribute("data-nc-max")}function zr(e){let t=Wl(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=he.get(e);n?.active&&(n.active=null,Dr(e))}return t}function Eh(e){zr(e);let t=he.get(e);if(!t?.box)return;let{w:n,h:a,pad:r}=t.box,o=t.control.range??18;for(let s of t.control.bands){let l=Ol(e,s.id);l instanceof HTMLElement&&(l.style.left=`${Zt(s.hz,n).toFixed(1)}px`,l.style.top=`${ht(s.db*Fr(s),a,o,r).toFixed(1)}px`)}}function Mh(e,t,n,a){let r=a/2/n,o=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let c=0;c<e;c++){let d=(c-.5)/(e-1)*t,u=(c+.5)/(e-1)*t,h=ca(d,t),f=ca(u,t),m=ca(c/(e-1)*t,t);o[c]=Math.min(n-1,h/r),s[c]=Math.min(n-1,f/r),l[c]=fh*Math.log2(m/1e3)}return{lo:o,hi:s,tilt:l}}function Sh(e,t,n){let a=Math.floor(t),r=Math.ceil(n);if(r-a<=1){let s=t-a,l=e[a]??-1/0,c=e[Math.min(e.length-1,a+1)]??l;return l+(c-l)*s}let o=-1/0;for(let s=a;s<=r&&s<e.length;s++)e[s]>o&&(o=e[s]);return o}function Th(e){let t=he.get(e);if(t){if(!t.control.spectrum){Vl(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let r=he.get(e)?.spec;r&&(r.visible=a.some(o=>o.isIntersecting),Hi(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Hi(e)}}function Hi(e){let t=he.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){Gl(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Ui(e),n.onVis||(n.onVis=()=>Hi(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Wi(e,!1)}function Ui(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function Wi(e,t){let n=he.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,hi(e,Ui(e))),uh):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(r=>(n.raf=0,hi(e,r))):n.timer=a.setTimeout(()=>(n.timer=0,hi(e,Ui(e))),_i))}function Gl(e){let t=he.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function Vl(e){let t=he.get(e)?.spec;if(!t)return;Gl(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=he.get(e);n&&(n.spec=null)}function hi(e,t){let n=he.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){Vl(e);return}if(!a.analyser)return;if(t-a.last<_i-4&&!a.idle){Wi(e,!1);return}let r=a.last?Math.min(.25,(t-a.last)/1e3):_i/1e3;a.last=t;let o=e.querySelector(".nc-eq-spectrum");if(!(o instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:c}=jl(o);if(!s)return;let d=Math.max(16,Math.round(l/2)),u=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==d||a.map.w!==l||a.map.sr!==u)&&(a.map={cols:d,w:l,sr:u,...Mh(d,l,a.buf.length,u)},a.disp=new Float32Array(d).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let h=-1/0,f=mh*r,{lo:m,hi:g,tilt:y}=a.map;for(let b=0;b<d;b++){let x=Sh(a.buf,m[b],g[b]);x>h&&(h=x);let v=x+y[b],S=a.disp[b]-f;a.disp[b]=v>S?v:S}h>ph&&(a.loud=t);let p=t-a.loud>hh;s.clearRect(0,0,l,c),(!p||a.disp.some(b=>b>Et))&&Lh(s,l,c,a.disp,n.colours??Hl(e)),a.idle=p&&!a.disp.some(b=>b>Et),Wi(e,a.idle)}function Lh(e,t,n,a,r){let o=a.length,s=new Array(o),l=new Array(o),c=d=>{let u=a[Math.max(0,Math.min(o-1,d))];return Number.isFinite(u)?u:Et};for(let d=0;d<o;d++){let u=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,h=(Math.max(Et,Math.min(Oo,Number.isFinite(u)?u:Et))-Et)/(Oo-Et);s[d]=d/(o-1)*t,l[d]=n-h*n}e.save(),e.fillStyle=r.spectrum,e.globalAlpha=.13,e.beginPath(),Aa(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=r.spectrum,e.lineWidth=1,e.beginPath(),Aa(e,s,l),e.stroke(),e.restore()}var $e=new WeakMap,Ch=450,Nh=6,Fh=33,fi=24,Dh="http://www.w3.org/2000/svg";function zh(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function Bh(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function qh(e,t,n,a,r){let o=e.slice();if(t===a)return o[a]=r,o;let s=t<a?1:-1;for(let l=t;l!==a+s;l+=s){let c=(l-t)/(a-t);o[l]=Math.round((n+(r-n)*c)*100)/100}return o}function Rh(e,t){let n=e.steps[t],a=(e.shapes??[]).find(o=>o.value===n.shape),r=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${a?`, ${a.label}`:""}${r}`}function Mt(e,t){let n=document.createElementNS(Dh,e);for(let[a,r]of Object.entries(t))n.setAttribute(a,String(r));return n}function Yl(e){let t=Mt("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(Mt("path",{d:e})),t}function Ih(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-lsteps-plot",a.tabIndex=0,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical"),a.setAttribute("aria-valuemin","0"),a.setAttribute("aria-valuemax","100"),a.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let r=document.createElement("div");r.className="nc-lsteps-axis",r.setAttribute("aria-hidden","true");let o=document.createElement("div");o.className="nc-lsteps-shapes",o.setAttribute("role","tablist");let s=document.createElement("div");s.className="nc-lsteps-pick",s.setAttribute("role","menu"),s.hidden=!0,n.append(a,r,o,s);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let c={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return $e.set(n,c),Oh(n,a),_h(n,s),Kl(n,e),n}function Ce(e){let t=$e.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function Ph(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function mi(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),a=Ph(e);return{i:Bh(t.clientX,a),level:zh(t.clientY-n.top,n.height)}}function Oh(e,t){let n=$e.get(e),a=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",o=>{let s=Ce(e);if(!s||o.button>0||!s.steps.length)return;o.preventDefault(),Ea(e),t.setPointerCapture?.(o.pointerId);let l=mi(t,o),c=s.steps.map(d=>d.level);n.drag={id:o.pointerId,x:o.clientX,y:o.clientY,start:c,levels:c,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,Ho(e,l.i,l.level,l.i,l.level,!1),a(),n.timer=setTimeout(()=>{n.timer=0;let d=n.drag;!d||d.moved||(d.long=!0,Ce(e)?.onLevels(d.start.slice(),!0),gi(e,d.i))},Ch)}),t.addEventListener("pointermove",o=>{let s=n.drag;if(!s||s.id!==o.pointerId||s.long||!s.moved&&Math.hypot(o.clientX-s.x,o.clientY-s.y)<Nh)return;s.moved=!0,a();let l=mi(t,o);Ho(e,s.i,s.level,l.i,l.level,!1),s.i=l.i,s.level=l.level});let r=o=>{let s=n.drag;!s||s.id!==o.pointerId||(a(),n.drag=null,t.releasePointerCapture?.(o.pointerId),s.long||Ce(e)?.onLevels(s.levels.slice(),!0),Gi(e,-1))};t.addEventListener("pointerup",r),t.addEventListener("pointercancel",o=>{let s=n.drag;!s||s.id!==o.pointerId||(a(),n.drag=null,s.long||Ce(e)?.onLevels(s.start.slice(),!0),Gi(e,-1))}),t.addEventListener("contextmenu",o=>{Ce(e)?.onShape&&(o.preventDefault(),gi(e,mi(t,o).i))}),t.addEventListener("keydown",o=>{let s=Ce(e);if(!s||!s.steps.length)return;let l=s.steps.length,c=Math.min(n.focus,l-1),d=s.steps[c].level,u=h=>{let f=s.steps.map(m=>m.level);f[c]=Math.round(Math.max(0,Math.min(1,h))*100)/100,s.onLevels(f,!0)};switch(o.key){case"ArrowLeft":n.focus=(c-1+l)%l;break;case"ArrowRight":n.focus=(c+1)%l;break;case"ArrowUp":u(d+(o.shiftKey?.01:.05));break;case"ArrowDown":u(d-(o.shiftKey?.01:.05));break;case"PageUp":u(d+.25);break;case"PageDown":u(d-.25);break;case"Home":u(1);break;case"End":u(0);break;case"Enter":case" ":if(!s.onShape)return;gi(e,c);break;default:return}o.preventDefault(),Vi(e)}),t.addEventListener("focus",()=>Vi(e)),t.addEventListener("blur",()=>{for(let o of t.querySelectorAll("[data-focus]"))o.removeAttribute("data-focus")})}function Ho(e,t,n,a,r,o){let s=$e.get(e).drag;s&&(s.levels=qh(s.levels,t,n,a,r),Gi(e,a,s.levels[a]),Ce(e)?.onLevels(s.levels.slice(),o))}function Gi(e,t,n){for(let a of e.querySelectorAll(".nc-lsteps-step"))Number(a.dataset.i)===t?(a.dataset.dragging="true",a.dataset.level=`${Math.round(n*100)}%`):a.removeAttribute("data-dragging")}function Vi(e){let t=$e.get(e),n=e.querySelector(".nc-lsteps-plot"),a=Ce(e);if(!n||!a)return;for(let o of n.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===t.focus?o.dataset.focus="true":o.removeAttribute("data-focus");let r=Math.min(t.focus,a.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((a.steps[r]?.level??0)*100))),n.setAttribute("aria-valuetext",Rh(a,r))}function _h(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),Ea(e,!0);return}let a=[...t.querySelectorAll("button")],r=a.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),a[(r+1)%a.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),a[(r-1+a.length)%a.length]?.focus())}),$e.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&Ea(e)}}function gi(e,t){let n=Ce(e),a=e.querySelector(".nc-lsteps-pick"),r=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!a||!r)return;let o=$e.get(e);o.focus=t,a.textContent="";let s=document.createElement("span");s.className="nc-lsteps-pick-head",s.textContent=`Step ${t+1}`,a.append(s);for(let m of n.shapes??[]){let g=document.createElement("button");g.type="button",g.setAttribute("role","menuitemradio"),g.setAttribute("aria-checked",n.steps[t]?.shape===m.value?"true":"false"),m.icon&&g.append(Yl(m.icon)),g.append(document.createTextNode(m.label)),g.addEventListener("click",()=>{Ce(e)?.onShape?.(t,m.value),Ea(e,!0)}),a.append(g)}a.setAttribute("aria-label",`Shape of step ${t+1}`),a.hidden=!1,e.ownerDocument.addEventListener("pointerdown",o.outside,!0);let l=r.querySelector(`.nc-lsteps-step[data-i="${t}"]`),c=e.getBoundingClientRect(),d=l?.getBoundingClientRect(),u=a.getBoundingClientRect().width,h=d?d.left+d.width/2-c.left:0,f=Math.max(0,Math.min(c.width-u,h-u/2));a.style.setProperty("--nc-lsteps-pick-x",`${Math.round(f)}px`),a.querySelector('[aria-checked="true"]')?.focus?.()??a.querySelector("button")?.focus?.()}function Ea(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",$e.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function jh(e,t){let n=$e.get(e),a=e.querySelector(".nc-lsteps-plot"),r=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,a.textContent="",r.textContent="";for(let o=0;o<t;o++){let s=document.createElement("div");s.className="nc-lsteps-step",s.dataset.i=String(o),o%4===0&&o>0&&(s.dataset.beat="true");let l=Mt("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(Mt("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),Mt("path",{class:"nc-lsteps-env",d:""}),Mt("path",{class:"nc-lsteps-top",d:""}),Mt("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),s.append(l),a.append(s);let c=document.createElement("span");o%4===0&&(c.textContent=String(o+1)),o%4===0&&o>0&&(c.dataset.beat="true"),r.append(c)}}}function Kl(e,t){let n=$e.get(e);if(!n)return;n.control=t;let a=t.steps.length;jh(e,a),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let r=e.querySelector(".nc-lsteps-plot");r.setAttribute("aria-label",t.label??"Steps");let o=Math.max(.5,Math.min(.75,t.swing??.5)),s=r.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((m,g)=>{let y=s[g];if(!y)return;let p=String((g%2?1-o:o)*2);y.style.setProperty("--nc-lsteps-grow",p),l[g]?.style.setProperty("--nc-lsteps-grow",p),t.played!==void 0&&g>=t.played?y.dataset.out="true":y.removeAttribute("data-out"),y.dataset.zero=m.level<=0?"true":"false";let b=Math.max(0,Math.min(1,m.level)),x=y.querySelector(".nc-lsteps-level");x.setAttribute("y",String(100-b*100)),x.setAttribute("height",String(b*100));let v=t.curve?t.curve(g,fi):null,S="M0 100",$="";for(let w=0;w<=fi;w++){let k=v?Math.max(0,Math.min(1,v[w]??b)):b,E=w/fi*100,M=100-k*100;S+=` L${E.toFixed(2)} ${M.toFixed(2)}`,$+=`${w?" L":"M"}${E.toFixed(2)} ${M.toFixed(2)}`}y.querySelector(".nc-lsteps-env").setAttribute("d",`${S} L100 100 Z`),y.querySelector(".nc-lsteps-top").setAttribute("d",$)});let c=e.querySelector(".nc-lsteps-shapes"),d=(t.shapes??[]).map(m=>`${m.value}:${m.label}`).join();if(d!==n.shapeKey){n.shapeKey=d,c.textContent="";for(let m of t.shapes??[]){let g=document.createElement("button");g.type="button",g.className="nc-lsteps-shape",g.setAttribute("role","tab"),g.dataset.shape=String(m.value),m.icon&&g.append(Yl(m.icon)),g.append(document.createTextNode(m.label)),g.addEventListener("click",()=>Ce(e)?.onShapeAll?.(m.value)),c.append(g)}}c.hidden=!(t.shapes?.length&&t.onShapeAll),c.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let u=t.played??a,h=t.steps[0]?.shape,f=t.steps.slice(0,u).every(m=>m.shape===h);for(let m of c.querySelectorAll(".nc-lsteps-shape")){let g=f&&m.dataset.shape===String(h);m.setAttribute("aria-selected",g?"true":"false"),m.tabIndex=g||!f&&m===c.firstElementChild?0:-1}n.focus>=a&&(n.focus=0),Vi(e),n.last=-2,Hh(e)}function Hh(e){let t=$e.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&bi(e,null);return}let a=0,r=o=>{if(t.loop=0,!e.isConnected||!t.control.playhead){bi(e,null);return}o-a>=Fh&&(a=o,bi(e,t.control.playhead())),t.loop=n.requestAnimationFrame(r)};t.loop=n.requestAnimationFrame(r)}function bi(e,t){let n=$e.get(e),a=t&&Number.isInteger(t.step)?t.step:-1,r=!!t?.locked;if(!(n.last===a&&n.lastLocked===r)){n.last=a,n.lastLocked=r;for(let o of e.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===a?(o.dataset.playhead="true",o.dataset.locked=r?"true":"false"):(o.removeAttribute("data-playhead"),o.removeAttribute("data-locked"));e.dataset.free=t&&!r?"true":"false"}}var Uh=.8912509381337456,Yi=32,Wh=250,Gh=1200,Vh=.2,Xl=1.5;function Yh(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function Kh(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let r=e.createElement("span");r.className="nc-fx-level-fill",a.append(r),t.append(a)}return t}var Ma=new WeakMap,Uo=new WeakMap;function Wo(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let r=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),o=Number.parseFloat(r);return Number.isFinite(o)?r.endsWith("ms")?o/1e3:o:n}function Xh(e){let t=Uo.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(r=>{for(let o of r){let s=Ma.get(o.target);s&&(s.seen.set(o.target,o.isIntersecting),Nn(s))}Xt(t)})),e.addEventListener("visibilitychange",()=>{for(let r of t.recs)Nn(r);Xt(t)}),Uo.set(e,t),t}var Ql=e=>e.els.some(t=>t.isConnected);function Qh(e){if(!e.loop.io)return Ql(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function Nn(e){let t=!e.dead&&!!e.source&&Qh(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Br(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Qi(e))}function Br(e){return e.doc.defaultView?.performance?.now()??Date.now()}function Xt(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){Jl(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Br(e)),!e.raf&&!e.timer&&Ki(e,!1)}function Ki(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>Go(e,Br(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),Wh):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(r=>(e.raf=0,Go(e,r))):e.timer=n.setTimeout(()=>(e.timer=0,a()),Yi)}function Jl(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Go(e,t){if(t-e.last<Yi-4&&!e.idle&&e.last){Ki(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):Yi/1e3;e.last=t,e.frames++;let a=!1,r=!1;for(let o of e.recs){if(!Ql(o)){(o.placed||e.frames-o.born>90)&&Zl(o);continue}o.placed=!0,o.open&&(r=!0,Jh(o,n,t)&&(e.loud=t),(o.disp[0]>0||o.disp[1]>0)&&(a=!0))}if(!r){Jl(e);return}e.idle=t-e.loud>Gh&&!a,Ki(e,e.idle)}function Jh(e,t,n){if(e.fall<0){let f=e.els[0];e.fall=Wo(f,"motion-meter-fall",Vh),e.hold=Wo(f,"motion-meter-hold",Xl)}let a=null;try{a=e.source.read()}catch{a=null}let r=typeof a=="number",o=r?a:Number(a?.in)||0,s=!r&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,c=s?"2":"1";if(e.rows!==c){e.rows=c;for(let f of e.els)f.dataset.ncRows=c}let d=e.fall>0?Math.exp(-t/e.fall):0,u=[o,l],h=!1;for(let f=0;f<2;f++){let m=Yh(u[f]);m>0&&(h=!0),e.disp[f]=m>=e.disp[f]?m:m+(e.disp[f]-m)*d,e.disp[f]<.001&&(e.disp[f]=0),u[f]>=Uh&&(e.clipAt[f]=n);let g=e.clipAt[f]>0&&n-e.clipAt[f]<e.hold*1e3;Xi(e,f,e.disp[f],g)}return h}function Xi(e,t,n,a){let r=Math.round(n*1e3)/1e3,o=a?"true":"false";if(!(e.shown[t]===r&&e.clipShown[t]===o)){e.shown[t]=r,e.clipShown[t]=o;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${r})`,l.dataset.clip=o)}}}function Qi(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Xi(e,0,0,!1),Xi(e,1,0,!1)}function Zl(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),Ma.get(t)===e&&Ma.delete(t)}function Zh(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,r=Xh(a),o={els:n,source:t??null,loop:r,open:!1,dead:!1,seen:new Map,born:r.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:Xl,rows:""};for(let s of n)Ma.set(s,o),r.io?.observe(s);if(r.recs.add(o),Qi(o),!r.io){let s=a.defaultView,l=()=>{Nn(o),Xt(r)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!o.dead){if(l===o.source){Nn(o),Xt(r);return}o.open&&(o.open=!1,o.source?.close?.(),Qi(o)),o.source=l,Nn(o),Xt(r)}},destroy(){o.dead||Zl(o),Xt(r)}}}var ec={slop:8,longPressMs:500,pitchPx:16},ef=class{constructor(e,t,n=ec){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let r=this.hit(t,n);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let r=t-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-o/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function tf(e,t,n,a=ec){let r=!1,o=0,s=(d,u)=>{let h=e.ownerDocument.elementFromPoint?.(d,u),f=[...e.querySelectorAll(t)],m=h?f.findIndex(p=>p===h||p.contains(h)):-1;if(m>=0)return m;let g=-1,y=Number.POSITIVE_INFINITY;return f.forEach((p,b)=>{if(p.hidden)return;let x=p.getBoundingClientRect();if(u<x.top||u>x.bottom)return;let v=Math.abs(d-(x.left+x.width/2));v<y&&v<=x.width&&(g=b,y=v)}),g},l=new ef(s,d=>{(d.kind==="paint"||d.kind==="long")&&(r=!0),n(d)},a),c=()=>{o&&clearTimeout(o),o=0};return e.addEventListener("pointerdown",d=>{d.button>0||(r=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),o=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),e.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{r&&(r=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var tc="netcomposer.groups.v1";function qr(){try{return globalThis.localStorage??null}catch{return null}}function nc(e=qr(),t=tc){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[r,o]of Object.entries(n))typeof o=="boolean"&&a.set(r,o);return a}catch{return new Map}}function nf(e,t,n,a=tc){let r=nc(e,a);r.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(r)))}catch{}}function af(e,t=qr()){return nc(t).get(e.id)??e.open===!0}function rf(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let r=document.createElement("button");r.type="button",r.className="nc-group-toggle",r.id=`${e.id}-group-toggle`;let o=document.createElement("span");o.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),r.append(o,s,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",r.id),r.setAttribute("aria-controls",c.id);for(let d of e.controls)c.append(n(d,t));return r.addEventListener("click",()=>{let d=a.dataset.ncOpen!=="true";nf(qr(),e.id,d),Ji(a,d);let u=t(a);u?.type==="group"&&u.onToggle?.(d)}),a.append(r,c),ac(a,e),Ji(a,af(e)),ic(a,e),a}function Ji(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let r=n?.querySelector(".nc-group-mark");r&&(r.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function ac(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function ic(e,t){ac(e,t)&&Ji(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),r=t.summary??"";a&&a.textContent!==r&&(a.textContent=r)}var na="application/x-nc-pad",Vo="http://www.w3.org/2000/svg";function of(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],r=[];for(let o=0;o<n;o++){let s=Math.floor(o*t/n),l=Math.max(s+1,Math.floor((o+1)*t/n)),c=0,d=0;for(let h=s;h<l;h++)c=Math.min(c,e[2*h]??0),d=Math.max(d,e[2*h+1]??0);let u=n===1?50:o/(n-1)*100;a.push(`${u.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),r.push(`${u.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${a.join("L")}L${r.reverse().join("L")}Z`}function sf(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((r,o)=>a.append(lf(n,o,t))),n.append(a),n.addEventListener("keydown",r=>{r.key==="Escape"&&da(n)}),oc(n,e),n}function lf(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let r=document.createElement("span");r.className="nc-padgrid-pad-bar",r.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(Vo,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(Vo,"path");return c.append(d),a.append(r,o,s,l,c),df(e,a,t,n),o.addEventListener("dblclick",()=>{let u=n(e);u?.type==="padGrid"&&u.onRename&&a.dataset.empty!=="true"&&rc(e,a,t,n)}),a.addEventListener("dragstart",u=>{if(a.dataset.empty==="true"||!u.dataTransfer){u.preventDefault();return}u.dataTransfer.setData(na,String(t)),u.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",u=>{let h=u.dataTransfer?.types??[];!h.includes("Files")&&!h.includes(na)||(u.preventDefault(),u.stopPropagation(),u.dataTransfer&&(u.dataTransfer.dropEffect=h.includes(na)&&!u.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",u=>{delete a.dataset.drop;let h=n(e);if(h?.type!=="padGrid")return;let f=u.dataTransfer?.getData(na);if(f!==void 0&&f!==""){u.preventDefault(),u.stopPropagation();let g=Number(f);g!==t&&h.onMove?.(g,t,u.altKey);return}let m=u.dataTransfer?.files?.[0];m&&(u.preventDefault(),u.stopPropagation(),h.onFile?.(t,m))}),a}function cf(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function df(e,t,n,a){let r=0,o=!1,s=0,l=0,c=()=>{window.clearTimeout(r),r=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;o=!1,s=d.clientX,l=d.clientY,c();let u=a(e);u?.type==="padGrid"&&(u.onDown?.(n),!(u.onDown&&d.pointerType==="mouse")&&(r=window.setTimeout(()=>{r=0,o=Yo(e,t,n,a)},450)))}),t.addEventListener("pointermove",d=>{r&&Math.hypot(d.clientX-s,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,c);t.addEventListener("contextmenu",d=>{d.preventDefault(),c(),o=Yo(e,t,n,a)}),t.addEventListener("click",()=>{if(o){o=!1;return}cf(e,n,a)})}function Yo(e,t,n,a){let r=a(e);if(r?.type!=="padGrid"||!r.menu)return!1;let o=r.menu(n);if(!o.length)return!1;da(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",u=>{u.preventDefault(),u.stopPropagation(),da(e)}),s.addEventListener("click",u=>u.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let u of o){let h=document.createElement("button");h.type="button",h.className="nc-menu-btn",h.setAttribute("role","menuitem"),h.dataset.ncMenuItem=u.id,h.textContent=u.label,h.addEventListener("click",()=>{da(e);let f=a(e);f?.type==="padGrid"&&(u.id==="rename"&&f.onRename?rc(e,t,n,a):f.onMenu?.(n,u.id))}),l.append(h)}e.append(s,l);let c=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function rc(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let r=a(e);if(r?.type!=="padGrid")return;let o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=r.nameMax??24,o.value=r.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.top-s.top}px`,o.style.width=`${l.width}px`;let c=!1,d=u=>{if(c)return;c=!0;let h=o.value.trim();o.remove(),t.focus();let f=a(e);u&&h&&f?.type==="padGrid"&&f.onRename?.(n,h)};o.addEventListener("keydown",u=>{u.stopPropagation(),u.key==="Enter"?d(!0):u.key==="Escape"&&d(!1)}),o.addEventListener("blur",()=>d(!0));for(let u of["pointerdown","click","dblclick"])o.addEventListener(u,h=>h.stopPropagation());e.append(o),o.focus(),o.select()}function da(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function oc(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,r)=>{let o=n[r];if(!(o instanceof HTMLButtonElement))return;let s=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),c=o.querySelector(".nc-padgrid-pad-wave path"),d=o.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=a.empty?"":a.badge??""),o.draggable=!a.empty,a.empty?(o.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete o.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=a.hint??""),c?.setAttribute("d",of(a.peaks))),!a.empty&&a.hint?o.dataset.hint="true":delete o.dataset.hint,a.lane?o.dataset.ncLane=String(a.lane):delete o.dataset.ncLane;let u=t.selected===r;u?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",u?"true":"false"),a.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",a.empty?`Pad ${r+1}, empty: load a sample`:`Pad ${r+1}, ${a.label}${a.hint?`, ${a.hint}`:""}${a.badgeLabel?`, ${a.badgeLabel}`:""}${u?", selected":""}`)})}function be(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Va(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(a,r),n}function Ko(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function Rn(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var uf=450,Xo=8;function Pe(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function pf(e){let t=Op(e,"target-min");return t>0?t:44}function hf(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=pf(e),a=n/2,r=t.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<t.length;o++){let s=t[o],l=r[o];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,u=c-a,h=c+a,f=d-a,m=d+a;for(let g=0;g<t.length;g++){if(o===g)continue;let y=r[g];if(!y||y.width===0)continue;let p=y.left+y.width/2,b=y.top+y.height/2;Math.abs(b-d)<a*2&&(p>c?h=Math.min(h,(c+p)/2):p<c&&(u=Math.max(u,(c+p)/2))),Math.abs(p-c)<a*2&&(b>d?m=Math.min(m,(d+b)/2):b<d&&(f=Math.max(f,(d+b)/2)))}u=Math.min(u,l.left),h=Math.max(h,l.right),f=Math.min(f,l.top),m=Math.max(m,l.bottom),s.style.left=`${u-l.left}px`,s.style.top=`${f-l.top}px`,s.style.width=`${Math.max(0,h-u)}px`,s.style.height=`${Math.max(0,m-f)}px`,s.style.transform="none"}}function sc(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Qo(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Tt(e,t){switch(e.type){case"slider":return ff(e,t);case"select":return gf(e,t);case"toggle":return bf(e,t);case"button":return yf(e,t);case"readout":return vf(e);case"label":return $f(e);case"note":return Jo(e);case"knob":return Mf(e,t);case"choice":return Sf(e,t);case"slotRow":return Tf(e,t);case"stepGrid":return Ff(e,t);case"canvas":return qf(e);case"fx":return Wf(e,t);case"eqGraph":return wh(e,t);case"levelSteps":return Ih(e,t);case"group":return rf(e,t,Tt);case"strip":return Rf(e,t);case"stripAdd":return _f(e,t);case"padGrid":return sf(e,t);case"moves":return kf(e,t);default:return Jo({id:"unknown",text:""})}}function ze(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,dc(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(lc(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let r=e.querySelector("[data-nc-readout]");r&&(r.textContent=t.valueText??Rn(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Ko(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")Ko(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&ft(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Af(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??Rn(t.value))}else if(t.type==="choice")uc(e,t);else if(t.type==="slotRow")hc(e,t);else if(t.type==="stepGrid")er(e,t);else if(t.type==="padGrid")oc(e,t);else if(t.type==="moves")cc(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&Il(n,t)}else if(t.type==="eqGraph")_l(e,t);else if(t.type==="levelSteps")Kl(e,t);else if(t.type==="strip"){bc(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${en(n.id)}"]`);a instanceof Element&&ze(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")mc(e,t);else if(t.type==="group"){ic(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${en(n.id)}"]`);a instanceof Element&&ze(a,n)}}else if(t.type==="fx"){Mc(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${en(n.id)}"]`);a instanceof Element&&ze(a,n)}}}}function ff(e,t){let n=Va(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let r=Ga(e.taper,e.min,e.max);a.min=String(r?0:e.min),a.max=String(r?1e3:e.max),a.step=String(r?1:e.step),r&&(a.dataset.ncTaper=e.taper),a.value=String(lc(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let o=l=>r?Pi(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(o(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(o(l))}),r&&a.addEventListener("keydown",l=>{let c=t(a);if(c?.type!=="slider"||a.disabled)return;let d=c.taper??e.taper,u=Rl(d,c.min,c.max,c.value,l.key,l.shiftKey,c.step);u!==null&&(l.preventDefault(),a.value=String(Cr(d,c.min,c.max,u)),c.onChange(u),c.onCommit?.(u))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(mf(e,a,t),s),n.append(be()),ze(n,e),n}function lc(e){return Ga(e.taper,e.min,e.max)?Cr(e.taper,e.min,e.max,e.value):e.value}function mf(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(Pe());let r=o=>{let s=n(t);s?.type==="slider"&&s.onTap?.(o)};return a.addEventListener("pointerdown",o=>{o.button===0&&r(o.timeStamp)}),a.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),r(o.timeStamp))}),a}function gf(e,t){let n=Va(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let r=null;for(let o of e.options){let s=document.createElement("option");s.value=o.value,s.textContent=o.label,o.disabled&&(s.disabled=!0),o.group?r?.getAttribute("label")!==o.group&&(r=document.createElement("optgroup"),r.setAttribute("label",o.group),a.append(r)):r=null,(r??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let o=t(a);o?.type==="select"&&o.onChange(a.value)}),n.append(a,be()),n}function bf(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(be()),ze(n,e),n}function yf(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let o=t(n);o?.type==="button"&&o.onPress()}),n.append(be()),ze(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=e.id,r.setAttribute("aria-label","Surprise me"),r.title=e.sparkleTitle??"Surprise me",r.innerHTML=sc(),r.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&fc(o);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,r),a}function vf(e){let t=Va(e.id,e.label);return t.append(be()),ze(t,e),t}var wf=450;function kf(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let r=document.createElement("div");r.className="nc-moves-row",r.setAttribute("role","group"),r.setAttribute("aria-label",a.label),a.title&&(r.title=a.title);let o=document.createElement("span");o.className="nc-moves-label",o.setAttribute("aria-hidden","true"),o.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${a.label} ${l.text}`),c.append(xf(l.icon)),c.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),s.append(c)}r.append(o,s),n.append(r)}return cc(n,e),n}function cc(e,t){for(let n of t.groups)for(let a of n.moves){let r=e.querySelector(`[data-nc-move="${en(a.id)}"]`);r instanceof HTMLButtonElement&&(r.disabled=a.disabled===!0)}}function xf(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function $f(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(be()),t}function Jo(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(be()),t}function Zo(e){if(typeof e.valueText=="string")return e.valueText;let t=Rn(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function dc(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Af(e,t){let n=$a(t.taper,t.min,t.max,t.value);dc(e,t.modulated===!0);let a=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(a)),t.bipolar){let r=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round($a(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(a,r))),e.style.setProperty("--knob-to",String(Math.max(a,r)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",Zo(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${Zo(t)}`}function Ef(e,t){if(Ga(e.taper,e.min,e.max))return Rl(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,r=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+r:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-r:null}function Mf(e,t){let n=Va(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let r=document.createElement("i");r.className="nc-knob-mark",a.append(r);let o=0,s=0;a.addEventListener("pointerdown",d=>{o=d.clientY;let u=t(a);s=u&&"value"in u?Number(u.value):0,a.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",d=>{if(a.hasPointerCapture&&!a.hasPointerCapture(d.pointerId))return;let u=t(a);if(u?.type!=="knob")return;if(Ga(u.taper,u.min,u.max)){let m=$a(u.taper,u.min,u.max,s)-(d.clientY-o)/120;u.onChange(Bl(u.taper,u.min,u.max,m));return}let h=u.max-u.min||1,f=Math.min(u.max,Math.max(u.min,s-(d.clientY-o)*h/120));u.onChange(f)}),a.addEventListener("dblclick",()=>{let d=t(a);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),a.addEventListener("keydown",d=>{let u=t(a);if(u?.type!=="knob")return;let h=Ef(u,d);h!==null&&(d.preventDefault(),u.onChange(Math.min(u.max,Math.max(u.min,h))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(a,c),n.append(be()),ze(n,e),n}function Sf(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let a=document.createElement("span");a.className="nc-label nc-choice-caption",a.setAttribute("aria-hidden","true"),a.textContent=e.caption,n.dataset.ncCaption="",n.append(a)}for(let a of e.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=a.value,r.setAttribute("role","tab"),r.textContent=a.label,r.addEventListener("click",()=>{let o=t(n);o?.type==="choice"&&o.onChange(a.value)}),r.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),c=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")c=(l+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")c=(l-1+s.length)%s.length;else if(o.key==="Home")c=0;else if(o.key==="End")c=s.length-1;else return;let d=s[c];d instanceof HTMLButtonElement&&(o.preventDefault(),d.focus(),d.click())}),n.append(r)}return n.append(be()),uc(n,e),n}function uc(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function Tf(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let u=0;u<e.slots.length;u++){let h=e.slots[u],f=document.createElement("span");f.className="nc-snap-wrap";let m=document.createElement("button");m.type="button",m.className="nc-snap",m.dataset.ncSlot=String(u),m.textContent=h.label,m.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(m,Pe()),Lf(f,m,n,u,t),a.append(f)}let r=e.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=sc(),r.append(Pe()),r.addEventListener("click",()=>{fc(n);let u=t(n);u?.type==="slotRow"&&u.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let u=t(n);u?.type==="slotRow"&&u.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",o.append(s,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(a,...r?[r]:[]),n.append(d,o,be()),pc(n,t),hc(n,e),n}function es(e,t,n,a){let r=n(e);if(r?.type!=="slotRow")return;An(e);let o=a.shiftKey?"store":a.altKey?"clear":"recall";r.onSlot(t,o)}function Lf(e,t,n,a,r){let o=0,s=0,l=0,c=!1,d=!1,u=!1,h=!1,f=()=>{window.clearTimeout(o),o=0},m=b=>{let x=b.clientX-s,v=b.clientY-l;x*x+v*v>Xo*Xo&&(c=!0,f())},g=()=>{h&&(h=!1,window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",p))},y=b=>{let x=o!==0&&!c&&!d;f(),g(),x&&(u=!0,es(n,a,r,b))},p=()=>{c=!0,f(),g()};e.addEventListener("pointerdown",b=>{b.button===0&&(g(),d=!1,c=!1,u=!1,s=b.clientX,l=b.clientY,f(),o=window.setTimeout(()=>{o=0,!c&&(d=!0,Cf(n,t,a,r))},uf),h=!0,window.addEventListener("pointermove",m),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",p))}),e.addEventListener("contextmenu",b=>b.preventDefault()),e.addEventListener("click",b=>{if(u||d||c){u=!1,d=!1,c=!1;return}es(n,a,r,b)})}function pc(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=ts("Save","store"),r=ts("Clear","clear");n.append(a,r);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),An(e)}),o.addEventListener("click",s=>s.stopPropagation()),e.append(o,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),An(e)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),An(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&An(e)})}function ts(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Cf(e,t,n,a){pc(e,a);let r=e.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let o=e.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function An(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function hc(e,t){for(let r of e.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let o=Number(r.dataset.ncSlot),s=t.slots[o];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function fc(e){let t=e.dataset.ncLastFill||null,n=Lp(t);e.dataset.ncLastFill=n;let a=Cp(n);if(a)for(let[r,o]of Object.entries(a))e.style.setProperty(r,o)}function Nf(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,r=o=>{if(a===o)return;a=o,n.setAttribute("aria-pressed",o?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),r(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>r(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||r(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),r(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function Ff(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let r=p=>{let b=document.createElement("button");return b.type="button",b.setAttribute("role","radio"),b.textContent=p,a.append(b),b},o=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=p=>{for(let b of[o,s]){let x=b===p;b.setAttribute("aria-checked",x?"true":"false"),b.tabIndex=x?0:-1}};l(o);for(let p of[o,s])p.addEventListener("click",()=>l(p));a.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();let b=s.getAttribute("aria-checked")==="true"?o:s;l(b),b.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(a),e.onFill&&c.append(Nf(n,t)),e.onClear){let p=document.createElement("button");p.type="button",p.className="nc-fill nc-clear",p.dataset.ncClear="",p.textContent=e.clearLabel??"Clear",p.title="Clear every step (Undo takes it back)",p.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.onClear?.()}),c.append(p)}n.append(c);for(let p of e.rows){let b=document.createElement("div");b.className="nc-row",b.dataset.ncRow="";let x=document.createElement("button");x.type="button",x.className="nc-name",x.textContent=p.label,x.setAttribute("aria-label",`Select ${p.label}`),p.lane&&(x.dataset.ncLane=String((p.lane-1)%4+1));let v=!1,S=0;x.addEventListener("pointerdown",k=>{v=!1,!(k.pointerType==="mouse"||k.button!==0)&&(S=window.setTimeout(()=>{let E=t(n);E?.type!=="stepGrid"||!E.selectedRows||(v=!0,E.onSelectRow?.(E.rows.findIndex(M=>M.id===p.id),!0))},wf))});for(let k of["pointerup","pointercancel","pointerleave"])x.addEventListener(k,()=>window.clearTimeout(S));x.addEventListener("contextmenu",k=>{v&&k.preventDefault()}),x.addEventListener("click",k=>{let E=t(n);if(E?.type!=="stepGrid")return;if(v){v=!1;return}let M=E.rows.findIndex(z=>z.id===p.id),C=!!E.selectedRows&&(k.shiftKey||k.metaKey||k.ctrlKey);E.onSelectRow?.(M,C)}),x.addEventListener("keydown",k=>Df(n,x,k));let $=[];for(let k of["mute","solo"]){if(!(k==="mute"?e.onMute:e.onSolo))continue;let E=document.createElement("span");E.className="nc-ms-wrap";let M=document.createElement("button");M.type="button",M.className="nc-ms",M.dataset.ncMs=k,M.textContent=k==="mute"?"M":"S",M.setAttribute("aria-label",`${k==="mute"?"Mute":"Solo"} ${p.label}`),E.append(M,Pe()),E.addEventListener("click",()=>{let C=t(n);if(C?.type!=="stepGrid")return;let z=C.rows.findIndex(G=>G.id===p.id);(k==="mute"?C.onMute:C.onSolo)?.(z)}),$.push(E)}let w=document.createElement("div");w.className="nc-steps";for(let k=0;k<p.steps.length;k++){let E=document.createElement("span");E.className="nc-step-wrap";let M=document.createElement("button");M.type="button",M.className="nc-step",M.dataset.ncStep=`${p.id}:${k}`,M.setAttribute("aria-label",`${p.label} step ${k+1}`),E.append(M,Pe()),E.addEventListener("click",C=>{let z=t(n);if(z?.type!=="stepGrid")return;let G=z.rows.findIndex(ce=>ce.id===p.id),X=s.getAttribute("aria-checked")==="true";z.onToggle(G,k,C.shiftKey||X)}),w.append(E)}if(e.onLength&&w.append(zf(n,w,p,t)),b.append(...$,x,w),e.onDice){let k=document.createElement("button");k.type="button",k.className="nc-sparkle nc-row-dice",k.dataset.ncDice=p.id,k.setAttribute("aria-label",`Re-roll ${p.label}`),k.title=`Re-roll ${p.label}: new steps for this lane (Undo takes it back)`,k.innerHTML=Qo(),k.append(Pe()),k.addEventListener("click",()=>{let E=t(n);E?.type==="stepGrid"&&E.onDice?.(E.rows.findIndex(M=>M.id===p.id))}),b.append(k)}b.addEventListener("click",k=>{if(k.target!==b)return;let E=t(n);E?.type==="stepGrid"&&E.onSelectRow?.(E.rows.findIndex(M=>M.id===p.id))}),ns(n,w,".nc-step-wrap",t,s,()=>p.id),n.append(b)}let d=document.createElement("div");d.className="nc-pads-head";let u=(p,b,x)=>{let v=document.createElement("button");return v.type="button",v.className=p,v.textContent=b,x&&v.setAttribute("aria-label",x),v},h=u("nc-pads-step","‹","Previous lane"),f=u("nc-pads-step","›","Next lane"),m=document.createElement(e.onLength?"button":"span");m.className="nc-pads-label",m.setAttribute("aria-live","polite"),e.onLength&&(m.type="button",m.dataset.ncLenToggle="",m.addEventListener("click",()=>{let p=t(n);p?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",er(n,p))}));for(let[p,b]of[[h,-1],[f,1]])p.addEventListener("click",()=>{let x=t(n);if(x?.type!=="stepGrid"||x.rows.length===0)return;let v=x.rows.length;x.onSelectRow?.(((aa(x)+b)%v+v)%v)});if(d.append(h,m,f),e.onDice){let p=u("nc-pads-step nc-pads-dice","","Re-roll lane");p.dataset.ncPadsDice="",p.innerHTML=Qo(),p.addEventListener("click",()=>{let b=t(n);if(b?.type!=="stepGrid")return;let x=aa(b);x>=0&&b.onDice?.(x)}),d.append(p)}if(e.transport){let p=u("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.transport?.onToggle()}),d.append(p)}n.append(d);let g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");let y=Math.max(0,...e.rows.map(p=>p.steps.length));for(let p=0;p<y;p++){let b=document.createElement("button");b.type="button",b.className="nc-pad",b.dataset.ncPad=String(p),b.textContent=String(p+1),b.addEventListener("click",x=>{let v=t(n);if(v?.type!=="stepGrid")return;let S=aa(v);if(S<0)return;if(n.dataset.ncLenMode==="true"){v.onLength?.(S,p+1);return}let $=s.getAttribute("aria-checked")==="true";v.onToggle(S,p,x.shiftKey||$)}),g.append(b)}return ns(n,g,".nc-pad",t,s,()=>{let p=t(n);return p?.type==="stepGrid"?p.rows[aa(p)]?.id:void 0}),n.append(g),n.append(be()),er(n,e),n}function aa(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function ns(e,t,n,a,r,o){let s="on",l=!0,c=-1,d=(u,h)=>{let f=u.rows[c]?.steps[h];!f||h>=u.rows[c].length||(u.onSet?u.onSet(c,h,s,l):!!f[s]!==l&&u.onToggle(c,h,s==="accent"))};tf(t,n,u=>{let h=a(e);if(h?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(u.kind!=="paint")return;let f=h.rows.findIndex(m=>m.id===o());f>=0&&h.rows[f].length!==u.pad+1&&h.onLength?.(f,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){let f=o();c=h.rows.findIndex(g=>g.id===f);let m=h.rows[c]?.steps[u.pad];if(!m)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!m[s]}d(h,u.pad)}else if(u.kind==="long"){let f=o(),m=h.rows.findIndex(y=>y.id===f),g=t.querySelectorAll(n)[u.pad];m>=0&&g instanceof HTMLElement&&h.onLongPress?.(m,u.pad,g)}}})}function Df(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],r=a.indexOf(t),o=r;n.key==="ArrowDown"?o=r+1:n.key==="ArrowUp"?o=r-1:n.key==="Home"?o=0:o=a.length-1;let s=a[o];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function zf(e,t,n,a){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(Pe());let o=d=>{let u=a(e);if(u?.type!=="stepGrid")return;let h=u.rows.findIndex(g=>g.id===n.id),f=u.rows[h];if(!f)return;let m=Math.max(1,Math.min(f.steps.length,d));m!==f.length&&u.onLength?.(h,m)},s=d=>{let u=[...t.querySelectorAll(".nc-step")],h=1;return u.forEach((f,m)=>{let g=f.getBoundingClientRect();g.width>0&&d>=g.left+g.width/2&&(h=m+1)}),h},l=d=>o(s(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete r.dataset.dragging};return r.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),r.addEventListener("keydown",d=>{let u=a(e);if(u?.type!=="stepGrid")return;let h=u.rows.find(m=>m.id===n.id);if(!h)return;let f={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};d.key in f&&(d.preventDefault(),o(f[d.key]))}),r}var yi=new WeakMap,ia=new WeakMap;function Bf(e){return e?(ia.has(e)||(ia.set(e,qi(e)),Ml(t=>{ia.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))Zi(n,Number(n.getAttribute("data-nc-velocity")))},e)),ia.get(e)):"light"}function Zi(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:Bf(e.ownerDocument),r=n===null?null:`${a} ${n}`;if(!(yi.has(e)&&yi.get(e)===r)){if(yi.set(e,r),n===null){for(let o of Object.keys(Do(1)))e.style.removeProperty(o);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[o,s]of Object.entries(Do(n,Fo[a]??Fo.light)))e.style.setProperty(o,s)}}function as(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function er(e,t){let n=t.rows.some(u=>u.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let r=e.querySelector(".nc-pads"),o=t.rows.find(u=>u.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&o&&(s.textContent=l?`${o.label} · ${o.length}`:o.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&o&&(c.setAttribute("aria-label",`Re-roll ${o.label}`),c.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let u=!!t.transport?.playing,h=t.transport?.label??(u?"Stop":"Play");d.textContent!==h&&(d.textContent=h),d.setAttribute("aria-pressed",u?"true":"false");let f=t.transport?.ariaLabel;f?d.setAttribute("aria-label",f):d.removeAttribute("aria-label")}if(r instanceof HTMLElement&&o){r.setAttribute("aria-label",`${o.label} steps`),o.lane&&(r.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?r.dataset.silent="true":delete r.dataset.silent;let u=o.length>0?(t.playhead%o.length+o.length)%o.length:-1;for(let h of r.querySelectorAll("[data-nc-pad]")){let f=Number(h.getAttribute("data-nc-pad")),m=o.steps[f];h instanceof HTMLButtonElement&&(h.hidden=!m||!l&&f>=o.length,l&&f>=o.length?h.dataset.out="true":delete h.dataset.out,l&&f===o.length-1?h.dataset.end="true":delete h.dataset.end,h.setAttribute("aria-label",`${o.label} step ${f+1}${m?.markLabel?`, ${m.markLabel}`:""}`),as(h,m),h.setAttribute("aria-pressed",m?.on?"true":"false"),m?.accent?h.dataset.accent="true":delete h.dataset.accent,m?.dim?h.dataset.dim="true":delete h.dataset.dim,Zi(h,m?.velocity),t.playhead>=0&&f===u?h.dataset.playhead="true":delete h.dataset.playhead)}}for(let u of t.rows){for(let m=0;m<u.steps.length;m++){let g=u.steps[m],y=e.querySelector(`[data-nc-step="${u.id}:${m}"]`);if(!(y instanceof HTMLButtonElement))continue;let p=y.closest(".nc-row");if(p instanceof HTMLElement){t.selectedRow===u.id?p.dataset.selected="true":delete p.dataset.selected;let S=t.selectedRow!==u.id&&(t.selectedRows??[]).includes(u.id);S?p.dataset.picked="true":delete p.dataset.picked;let $=p.querySelector(".nc-name");$ instanceof HTMLElement&&($.setAttribute("aria-pressed",t.selectedRow===u.id||S?"true":"false"),$.textContent!==u.label&&($.textContent=u.label,$.setAttribute("aria-label",`Select ${u.label}`))),u.mute||n&&!u.solo?p.dataset.silent="true":delete p.dataset.silent;for(let w of p.querySelectorAll("[data-nc-ms]")){let k=w.getAttribute("data-nc-ms")==="mute"?u.mute:u.solo;w.setAttribute("aria-pressed",k?"true":"false")}}y.setAttribute("aria-pressed",g.on?"true":"false");let b=`${u.label} step ${m+1}${g.markLabel?`, ${g.markLabel}`:""}`;y.getAttribute("aria-label")!==b&&y.setAttribute("aria-label",b),as(y,g),g.accent?y.dataset.accent="true":delete y.dataset.accent,g.dim?y.dataset.dim="true":delete y.dataset.dim,m%4===0?y.dataset.bar="true":delete y.dataset.bar,typeof g.velocity=="number"?(y.dataset.velocity="true",y.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,g.velocity))*100)}%`)):(delete y.dataset.velocity,y.style.removeProperty("--level")),Zi(y,g.velocity);let x=t.playhead>=0&&u.length>0?(t.playhead%u.length+u.length)%u.length:-1;m===x?y.dataset.playhead="true":delete y.dataset.playhead;let v=!!t.onLength&&t.selectedRow===u.id;y.hidden=m>=u.length&&!v,m>=u.length&&v?y.dataset.out="true":delete y.dataset.out}let h=e.querySelector(`[data-nc-len="${u.id}"]`),f=e.querySelector(`[data-nc-step="${u.id}:${Math.max(0,u.length-1)}"]`)?.closest(".nc-step-wrap");if(h instanceof HTMLElement&&f&&f.nextElementSibling!==h){let m=document.activeElement===h;f.after(h),m&&h.focus()}h instanceof HTMLElement&&(h.setAttribute("aria-valuenow",String(u.length)),h.setAttribute("aria-label",`${u.label} length, ${u.length} steps`),h.title=`${u.label}: drag to set the length (${u.length} steps)`)}}function qf(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,be()),t}function Rf(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let r=document.createElement("span");r.className="nc-strip-name",r.dataset.ncStripName="";let o=!e.master&&typeof e.onFold=="function",s=null;o&&(n.dataset.ncFoldable="",s=kc(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let v=t(n);v?.type==="strip"&&(v.onFold?.(v.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(r);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let v=document.createElement("span");v.className="nc-strip-grip-dots",v.setAttribute("aria-hidden","true"),l.append(v),l.addEventListener("keydown",S=>{if(S.key!=="ArrowLeft"&&S.key!=="ArrowRight"||S.ctrlKey||S.metaKey||S.shiftKey)return;let $=t(n);$?.type==="strip"&&(S.preventDefault(),$.onMove?.(S.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>os(n,l,t))),!e.master&&typeof e.onShade=="function"&&a.addEventListener("contextmenu",v=>{v.pointerType==="touch"||v.pointerType==="pen"||v.target instanceof Element&&v.target.closest("input, .nc-strip-remove")||(v.preventDefault(),os(n,a,t,{x:v.clientX,y:v.clientY}))}),e.onRemove){let v=document.createElement("button");v.type="button",v.className="nc-strip-remove",v.dataset.ncStripRemove="",v.textContent="×",v.addEventListener("click",()=>{let S=t(n);S?.type==="strip"&&S.onRemove?.(v)}),a.append(v)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let v=document.createElement("span");v.className="nc-hacks-wrap";let S=document.createElement("button");S.type="button",S.className="nc-hacks",S.dataset.ncHacks="",v.append(S,Pe()),v.addEventListener("click",()=>{let $=t(n);$?.type==="strip"&&$.onHacks?.()}),c.append(v)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let v=document.createElement("span");v.className="nc-hacks-wrap nc-sends-view-wrap";let S=document.createElement("button");S.type="button",S.className="nc-hacks nc-sends-view",S.dataset.ncSendsView="",v.append(S,Pe()),v.addEventListener("click",()=>{let $=t(n);$?.type==="strip"&&$.onSendsView?.()}),d.append(v)}for(let v of["mute","solo"]){if(!(v==="mute"?e.onMute:e.onSolo))continue;let S=document.createElement("span");S.className="nc-ms-wrap";let $=document.createElement("button");$.type="button",$.className="nc-ms",$.dataset.ncMs=v,$.textContent=v==="mute"?"M":"S",S.append($,Pe()),S.addEventListener("click",()=>{let w=t(n);w?.type==="strip"&&(v==="mute"?w.onMute:w.onSolo)?.()}),d.append(S)}let u=document.createElement("div");u.className="nc-strip-sends";for(let v of e.sends??[])u.append(Tt({...v,type:"knob",compact:!0},t));let h=document.createElement("div");h.className="nc-strip-pan",e.pan&&h.append(Tt(Rr(e),t));let f=document.createElement("div");f.className="nc-strip-body";let m=document.createElement("span");m.className="nc-scale",m.setAttribute("aria-hidden","true");for(let v of e.ticks??[]){let S=document.createElement("span");S.className="nc-scale-tick",S.style.setProperty("--tick-pos",String(v.value)),S.textContent=v.label,m.append(S)}let g=Vp({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:v=>{let S=t(n);S?.type==="strip"&&S.onChange(v)},onReset:()=>{let v=t(n);v?.type==="strip"&&rs(v)}}),y=Zp({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let v=t(n);v?.type==="strip"&&v.onClipClear?.()}});if(f.append(m,g.el,y.el),o){let v=document.createElement("button");v.type="button",v.className="nc-ui-fx-fold nc-strip-fold",v.dataset.ncStripFold="",v.setAttribute("aria-expanded","false");let S=document.createElement("span");S.className="nc-strip-fold-cap",S.setAttribute("aria-hidden","true");let $=document.createElement("span");$.className="nc-ui-fx-fold-name",$.dataset.ncStripFoldName="";let w=document.createElement("span");w.className="nc-strip-fold-pan",w.setAttribute("aria-hidden","true"),w.hidden=!e.pan,v.append(S,w,$),v.addEventListener("click",()=>{let k=t(n);if(k?.type!=="strip")return;k.onFold?.(!1);let E=n.querySelector("[data-nc-strip-hide]");E instanceof HTMLElement&&E.focus()}),f.prepend(v)}let p=document.createElement("button");p.type="button",p.className="nc-strip-db",p.dataset.ncReadout="";let b=0;p.addEventListener("click",v=>{let S=t(n);S?.type!=="strip"||!S.onTypeIn||(window.clearTimeout(b),v.detail===0?is(n,p,t):v.detail===1&&(b=window.setTimeout(()=>is(n,p,t),Of)))}),p.addEventListener("dblclick",()=>{window.clearTimeout(b);let v=t(n);v?.type==="strip"&&rs(v)});let x=document.createElement("div");return x.className="nc-strip-trim",e.trim&&x.append(Tt(Ir(e),t)),s&&n.append(s),l&&n.append(l),n.append(a,x,c,d,u,h,f,p,be()),bc(n,e),n}function Rr(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??Pf(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function Ir(e){let t=e.trim,n=t.min??-12,a=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:a,step:t.step??.5,value:t.value,valueText:t.valueText??If(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:r=>t.onChange(r)}}function If(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function Pf(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var Of=250;function is(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=a.valueText??Rn(a.value),r.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(r),r.focus(),r.select?.();let o=!1,s=l=>{if(o)return;o=!0;let c=r.value;if(r.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(c)}t.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function _f(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",a.append(r,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),c=s.value;gc(s),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(a,s,be()),mc(n,e),n}function mc(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let r=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],o=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==s&&(a.replaceChildren(...r.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),gc(a))}function gc(e){let t=e.options[0];t&&(t.selected=!0)}function rs(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function bc(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let r=e.querySelector(".nc-fader"),o=r?Yp(r):void 0;o&&(o.configure({step:t.step}),o.set(t.value),o.setText(t.valueText),o.setLabel(`${t.label} level`)),eh(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let g=t.valueText??Rn(t.value);s.textContent!==g&&(s.textContent=g),s.setAttribute("aria-label",`${t.label} level ${g}`);let y=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${y}`:y}for(let g of e.querySelectorAll("[data-nc-ms]")){let y=g.getAttribute("data-nc-ms"),p=y==="mute"?t.mute===!0:t.solo===!0;g.setAttribute("aria-pressed",p?"true":"false"),g.setAttribute("aria-label",`${y==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let g=t.hacksLabel??"Hacks";l.textContent!==g&&(l.textContent=g),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${g}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let g=t.sendsViewLabel??"Sends";c.textContent!==g&&(c.textContent=g),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${g}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),ft(c,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let u=yc(t);if(u?e.dataset.ncShade=String(u):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let g=e.querySelector(`.nc-strip-trim [data-nc-id="${en(t.trim.id)}"]`);g&&ze(g,Ir(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let g=e.querySelector(`.nc-strip-pan [data-nc-id="${en(t.pan.id)}"]`);g&&ze(g,Rr(t))}let h=!t.master&&typeof t.onFold=="function"&&t.folded===!0;h?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let f=e.querySelector("[data-nc-strip-hide]");f instanceof HTMLElement&&(xc(f,h,t.label),ft(f,t.foldHelp));let m=e.querySelector("[data-nc-strip-fold]");if(m instanceof HTMLElement){m.hidden=!h,m.setAttribute("aria-label",`Expand ${t.label}`);let g=m.querySelector("[data-nc-strip-fold-name]");g&&g.textContent!==t.label&&(g.textContent=t.label),ft(m,t.foldedHelp??t.foldHelp)}}function yc(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=vc?t:0}var vc=8,ra=null;function os(e,t,n,a){ra?.();let r=n(e);if(r?.type!=="strip")return null;let o=e.ownerDocument,s=o.defaultView??globalThis,l=o.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${r.label}: shade and place`);let c=o.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(r.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=o.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let u=yc(r),h=e.querySelector("[data-nc-strip-grip]")??t,f=(b=!1)=>{if(ra!==f)return;ra=null;let x=l.contains(o.activeElement);l.remove(),o.removeEventListener("keydown",g,!0),o.removeEventListener("pointerdown",y,!0),s.removeEventListener("resize",p),(b||x)&&h?.isConnected&&h.focus?.({preventScroll:!0})},m=[0,...Array.from({length:vc},(b,x)=>x+1)].map(b=>{let x=o.createElement("button");return x.type="button",x.setAttribute("role","radio"),x.setAttribute("aria-checked",b===u?"true":"false"),x.setAttribute("tabindex",b===u?"0":"-1"),x.dataset.ncShadeChoice=String(b),b===0?(x.textContent="Auto",x.setAttribute("aria-label","Auto: alternate light and dark"),x.title="Auto: alternate light and dark"):(x.textContent=String(b),x.setAttribute("aria-label",`Shade ${b}`),x.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${b})`)),x.addEventListener("click",()=>{let v=n(e);f(!0),v?.type==="strip"&&v.onShade?.(b===0?null:b)}),x});if(d.append(...m),d.addEventListener("keydown",b=>{let x=m.indexOf(o.activeElement);if(x<0)return;let v=-1;b.key==="ArrowRight"||b.key==="ArrowDown"?v=(x+1)%m.length:b.key==="ArrowLeft"||b.key==="ArrowUp"?v=(x-1+m.length)%m.length:b.key==="Home"?v=0:b.key==="End"&&(v=m.length-1),!(v<0)&&(b.preventDefault(),m[x].setAttribute("tabindex","-1"),m[v].setAttribute("tabindex","0"),m[v].focus())}),l.append(c,d),typeof r.onMove=="function"){let b=[...e.parentElement?.children??[]].filter(v=>v.classList?.contains("nc-strip")&&!v.hasAttribute("data-nc-master")),x=b.indexOf(e);for(let[v,S,$]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let w=o.createElement("button");w.type="button",w.className="nc-strip-menu-item",w.dataset.ncStripMove=v<0?"left":"right";let k=o.createElement("span");k.textContent=S;let E=o.createElement("kbd");E.textContent=$,E.setAttribute("aria-hidden","true"),w.append(k,E),w.disabled=v<0?x<=0:x<0||x>=b.length-1,w.addEventListener("click",()=>{let M=n(e);f(!0),M?.type==="strip"&&M.onMove?.(v)}),l.append(w)}}o.body.append(l),(()=>{let b=t.getBoundingClientRect?.()??{bottom:0,right:0},x=l.offsetWidth,v=l.offsetHeight,S=s.innerWidth||o.documentElement.clientWidth||x,$=s.innerHeight||o.documentElement.clientHeight||v,w=a?a.x:b.right-x,k=a?a.y:b.bottom+4;w=Math.max(4,Math.min(w,S-x-4)),k+v>$-4&&(k=Math.max(4,(a?a.y:b.top)-v-4)),l.style.left=`${Math.round(w)}px`,l.style.top=`${Math.round(k)}px`})();let g=b=>{if(b.key==="Escape")b.preventDefault(),b.stopPropagation(),f(!0);else if(b.key==="Tab"&&l.contains(o.activeElement)){let x=[...l.querySelectorAll("button:not([disabled])")].filter(S=>S.getAttribute("tabindex")!=="-1"),v=(x.indexOf(o.activeElement)+(b.shiftKey?-1:1)+x.length)%x.length;b.preventDefault(),x[v]?.focus()}},y=b=>{l.contains(b.target)||f(!1)},p=()=>f(!1);return o.addEventListener("keydown",g,!0),o.addEventListener("pointerdown",y,!0),s.addEventListener("resize",p),ra=f,(m.find(b=>b.getAttribute("tabindex")==="0")??m[0]).focus({preventScroll:!0}),{el:l,close:()=>f(!1)}}var tr=typeof ResizeObserver=="function"?new ResizeObserver(jf):null;function jf(e){for(let t of e){if(!t.target.isConnected){tr.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&Hf(n)}}function Hf(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,r=n instanceof HTMLElement?n.offsetHeight:0,o=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+r+o}px`)}function Uf(e){if(tr)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))tr.observe(t)}function Wf(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let r=typeof e.onFold=="function",o=!!e.meter,s=typeof e.onRemove=="function";if(e.on===void 0&&!r&&!Sa(e)&&!o&&!s)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),o&&l.append(Ac(n,"head")),e.on!==void 0){let c=Tr({checked:e.on,labelledBy:a.id,onChange:d=>{let u=t(c.el);u?.type==="fx"&&u.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",l.append(c.el)}r&&l.append(Vf(n,t)),Sa(e)&&l.append(Qf(n,t)),s&&l.append(Jf(t)),n.append(l)}r&&n.prepend(Yf(n,t)),o&&Ec(n,e);for(let l of e.controls)n.append(Tt(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",l.append(c);for(let d of e.more)l.append(Tt(d,t));n.append(l)}return n.append(be()),Mc(n,e),Uf(n),n}var Gf=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function wc(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&Gf(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function Vf(e,t){let n=kc();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),wc(e))}),n}function kc(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function xc(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function Yf(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let r=document.createElement("span");r.className="nc-ui-fx-fold-name",r.dataset.ncFxFoldName="";let o=document.createElement("span");return o.className="nc-fold-tri",o.setAttribute("aria-hidden","true"),n.append(o,a,r),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Ac(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),wc(e)}}),n}var ln=new Set;function ua(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var Sa=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),Kf="(max-width: 768px)";function Xf(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function Qf(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(Xf()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&($c(e,a,!ln.has(a.id)),n.focus())}),n}function Jf(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function $c(e,t,n){n?ln.add(t.id):ln.delete(t.id),Pr(e,t)}function Zf(e,t){t?.type==="fx"&&ln.has(t.id)&&$c(e,t,!1)}function em(e){return e.ownerDocument.defaultView?.matchMedia?.(Kf).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Pr(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=Sa(t)&&ln.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!Sa(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),ua(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&sn(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",ft(n,t.maxHelp)),!a){e.dataset.ncMax&&ss(e);return}if(!e.isConnected){let s=()=>e.isConnected&&ln.has(t.id)&&Pr(e,t);queueMicrotask(()=>{e.isConnected?s():ua(e.ownerDocument,s)});return}let r=em(e),o=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;o>0&&e.style.setProperty("--nc-fx-dials",String(o)),e.dataset.ncMax!==r&&(e.dataset.ncMax&&ss(e),e.dataset.ncMax=r,r==="over"&&tm(e,t)),nm(e.ownerDocument),r==="over"&&Or(e),ua(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&sn(s)})}function ss(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),ua(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&sn(n)})}function tm(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let r=e.querySelector("[data-nc-fx-max]");r instanceof HTMLElement&&r.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function Or(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,r=e.ownerDocument.defaultView,o=Number.parseFloat(r?.getComputedStyle(a).columnGap??"")||0,s=vh(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),o,r?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var ls=new WeakSet;function nm(e){ls.has(e)||(ls.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(r=>r.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&Or(t)}))}var nr=new WeakMap;function Ac(e,t){let n=Kh(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Ec(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let r of n)ft(r,t.meterHelp);let a=nr.get(e);a?a.set(t.meter):nr.set(e,Zh(n,t.meter))}function Mc(e,t){(t.meter||nr.has(e))&&Ec(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let r=typeof t.onFold=="function"&&t.folded===!0;r?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let o=e.querySelector("[data-nc-fx-hide]");o instanceof HTMLElement&&(xc(o,r,t.title),ft(o,t.foldHelp)),Pr(e,t);let s=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;s.hidden=r,s.setAttribute("aria-label",c),s.title=c}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";l.hidden=!r,l.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let u=l.querySelector("[data-nc-fx-fold-name]");u&&(u.textContent=t.title),ft(l,t.foldHelp)}}function ft(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function en(e){return e.replace(/["\\]/g,"\\$&")}function am(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);a?.type==="canvas"&&Il(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&sn(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&Or(n);hf(e)}var im=pt["toast-duration"];function rm({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function om(e,t,n,a){let r=l=>({top:l,bottom:l+n}),o=l=>e.some(c=>c&&c.bottom>l.top&&c.top<l.bottom),s=r(t-a-n);return o(s)?o(r(a))?"bottom":"top":"bottom"}function sm(e,t,n,a,r,o){let s=e.bottom+r,l=Math.max(o,Math.min(e.left,a-o-n.width));for(let c=!0,d=0;c&&d<8;d++){c=!1;for(let u of t)u&&u.bottom>s&&u.top<s+n.height&&u.right>l&&u.left<l+n.width&&(s=u.bottom+r,c=!0)}return{top:s,left:l}}var cs="data-nc-ui-toast-live";function lm(e,t){let n=t.querySelector(`[${cs}]`);return n||(n=e.createElement("div"),n.setAttribute(cs,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function cm({message:e,actionLabel:t,onAction:n,duration:a=im,onClose:r,avoid:o=[],anchor:s,host:l,document:c=globalThis.document}={}){l=l??c.body;let d=c.defaultView??globalThis,u=c.createElement("div");u.className="nc-ui-toast",u.setAttribute("data-state","enter");let h=c.createElement("span");h.className="nc-ui-toast-message",h.textContent=e,u.appendChild(h);let f=null;t&&(f=c.createElement("button"),f.type="button",f.className="nc-ui-toast-action",f.textContent=t,u.appendChild(f)),l.appendChild(u);let m="open",g=R=>R&&typeof R.getBoundingClientRect=="function"?R.getBoundingClientRect():null,y=g(u),p=y?.height||44,b=d.getComputedStyle?.(u),x=Number.parseFloat(b?.getPropertyValue(Y("toast-offset")))||16,v=Number.parseFloat(b?.getPropertyValue(Y("toast-anchor-gap")))||8,S=g(s),$=d.innerHeight??0,w=o.map(g).filter(Boolean),k=S&&S.bottom>0&&S.top<$?sm(S,w,{width:y?.width||0,height:p},d.innerWidth??0,v,x):null;k&&k.top+p<=$?(u.setAttribute("data-placement","anchor"),u.style.top=`${k.top+(d.scrollY??0)}px`,u.style.left=`${k.left+(d.scrollX??0)}px`):u.setAttribute("data-placement",om(w,$,p,x));let E=d.requestAnimationFrame?.bind(d)??(R=>setTimeout(R,16));E(()=>E(()=>{m==="open"&&u.setAttribute("data-state","open")})),lm(c,l).textContent=rm({message:e,actionLabel:t});let M,C,z=new Promise(R=>{C=R}),G=R=>{clearTimeout(M),M=setTimeout(()=>Ae("timeout"),R)},X=a,ce=Date.now(),Be=()=>{m==="open"&&(clearTimeout(M),X=Math.max(0,X-(Date.now()-ce)))},rt=()=>{m==="open"&&(ce=Date.now(),G(X))};u.addEventListener("pointerenter",Be),u.addEventListener("pointerleave",rt),u.addEventListener("focusin",Be),u.addEventListener("focusout",rt),f?.addEventListener("click",()=>{if(m==="open")try{n?.()}finally{Ae("action")}}),Number.isFinite(a)&&G(a);function Ae(R="close"){if(m!=="open")return;m="closing",clearTimeout(M),u.setAttribute("data-state","closing"),r?.(R);let It=d.getComputedStyle?.(u),fn=It?Math.max(0,...String(It.transitionDuration||"").split(",").map(Ot=>Number.parseFloat(Ot)*(Ot.trim().endsWith("ms")?1:1e3)||0)):0,Pt=()=>{m!=="gone"&&(m="gone",u.remove(),C(R))};u.addEventListener("transitionend",Pt),setTimeout(Pt,fn+50)}return{el:u,close:Ae,closed:z}}var Ta="data-nc-help";function dm(e,t,n,a=0,r=6,o=8){let s=e.top-r-t.height,l=s>=a+o?"above":"below",c=l==="above"?s:e.bottom+r,d=Math.max(o,Math.min(e.left,n-o-t.width));return{top:Math.round(c),left:Math.round(d),side:l}}var vi=new WeakMap;function um(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function pm({document:e=globalThis.document,delay:t=1e3}={}){if(!e)return{uninstall(){},hide(){}};let n=vi.get(e);if(n)return n;let a=e.defaultView,r=null,o=null,s,l=!1,c,d=null,u=!1,h=0,f=()=>{clearTimeout(s),u&&!l&&(h=Date.now()+1500),u=!1,r&&(r.hidden=!0,delete r.dataset.pinned)},m=()=>{f(),clearTimeout(c),o=null,d=null,l=!1},g=(k,E)=>{clearTimeout(s),d=E;let M=Date.now()<h?Math.min(t,300):t;s=setTimeout(()=>{o===k&&k.isConnected&&!l&&b(k)&&(u=!0)},M)},y=k=>({x:Number(k.clientX)||0,y:Number(k.clientY)||0}),p=(k,E,M)=>!k||Math.hypot(k.x-E.x,k.y-E.y)>M,b=(k,E)=>{let M=E??k.getAttribute(Ta);if(!M)return!1;r||(r=e.createElement("div"),r.className="nc-ui-help",r.setAttribute("role","tooltip"),r.dataset.testid="nc-help",r.style.position="fixed",r.style.pointerEvents="none",r.style.zIndex="6",e.body.appendChild(r)),r.textContent=M,r.hidden=!1,r.style.visibility="hidden",r.style.top="0px",r.style.left="0px";let C=k.getBoundingClientRect(),z=dm(C,{width:r.offsetWidth,height:r.offsetHeight},a.innerWidth,um(e));return r.style.top=`${z.top}px`,r.style.left=`${z.left}px`,r.dataset.side=z.side,r.style.visibility="",!0},x=k=>{if(l||k.pointerType==="touch")return;let E=k.target&&k.target.closest?k.target.closest(`[${Ta}]`):null;E!==o&&(m(),!(!E||k.buttons)&&(o=E,g(E,y(k))))},v=k=>{if(l||k.pointerType==="touch"||!o)return;if(k.buttons){f(),d=null;return}let E=y(k);u?p(d,E,8)&&(f(),g(o,E)):p(d,E,4)&&g(o,E)},S=k=>{!l&&!k.relatedTarget&&m()},$=k=>{(l||k.key==="Escape")&&m()};e.addEventListener("pointerover",x),e.addEventListener("pointermove",v,{passive:!0}),e.addEventListener("pointerout",S),e.addEventListener("pointerdown",m,!0),e.addEventListener("keydown",$),a.addEventListener("scroll",m,!0),a.addEventListener("blur",m);let w={hide:m,pin(k,E,{ms:M=0}={}){return m(),!k||!k.isConnected||!b(k,E)?!1:(l=!0,r.dataset.pinned="",M>0&&(c=setTimeout(m,M)),!0)},uninstall(){m(),e.removeEventListener("pointerover",x),e.removeEventListener("pointermove",v),e.removeEventListener("pointerout",S),e.removeEventListener("pointerdown",m,!0),e.removeEventListener("keydown",$),a.removeEventListener("scroll",m,!0),a.removeEventListener("blur",m),r?.remove(),r=null,vi.delete(e)}};return vi.set(e,w),w}var hm="(max-width: 768px)",fm='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',mm='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',gm=0;function bm({panel:e,button:t,label:n="Menu",media:a=hm}){let r=e.ownerDocument,o=r.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++gm}`);let s=t??r.createElement("button");t||(s.type="button",s.innerHTML=fm),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function c(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),r.addEventListener("keydown",u,!0),r.addEventListener("pointerdown",h,!0),[...e.querySelectorAll(mm)].find(p=>!p.hidden&&p.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function d({focus:p}={}){if(!l())return;let b=e.contains(r.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),r.removeEventListener("keydown",u,!0),r.removeEventListener("pointerdown",h,!0),(p??b)&&s.focus?.({preventScroll:!0})}function u(p){p.key==="Escape"&&(p.preventDefault(),p.stopPropagation(),d({focus:!0}))}function h(p){let b=p.target;b instanceof o.Node&&(e.contains(b)||s.contains(b))||d({focus:!1})}let f=()=>l()?d({focus:!0}):c(),m=p=>{let b=p.target,x=b instanceof o.Element?b.closest("button"):null;!x||!e.contains(x)||x.closest("[data-nc-menu-stay]")||d({focus:!0})};s.addEventListener("click",f),e.addEventListener("click",m);let g=o.matchMedia?.(a),y=()=>{g?.matches||d({focus:!1})};return g?.addEventListener?.("change",y),{button:s,panel:e,open:c,close:d,isOpen:l,destroy(){d({focus:!1}),s.removeEventListener("click",f),e.removeEventListener("click",m),g?.removeEventListener?.("change",y)}}}var _r="netcomposer.rhythm.hidden.v1",Ye=new WeakMap;function wi(){try{return globalThis.localStorage??null}catch{return null}}function Sc(e,t=_r){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function ds(e,t,n,a=_r){let r=Sc(e,a);n?r.add(t):r.delete(t);try{e?.setItem(a,JSON.stringify([...r]))}catch{}}function jr(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(r=>r.controls)],n=[],a=r=>{if(n.push(r),r.type==="group")for(let o of r.controls)a(o);r.type==="fx"&&n.push(...r.controls,...r.more??[]),r.type==="strip"&&(n.push(...(r.sends??[]).map(o=>({...o,type:"knob",compact:!0}))),r.pan&&n.push(Rr(r)),r.trim&&n.push(Ir(r)))};for(let r of t)a(r);return n}function Tc(e,t){if(!(!e||!t))return jr(e).find(n=>n.id===t)}function ym(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${jr(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function vm(e,t){if(!t.title)return;if(!t.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=t.title,e.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(a,r),e.append(n),Lc(e,t)}function Lc(e,t){if(!t.panel)return;let n=[...e.children].find(o=>o.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),r&&(r.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function wm(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=Ye.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Tc(n,a)}function km(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],r=ym(t);if(e.dataset.ncSignature===r){for(let o of a){let s=e.querySelector(`[data-nc-section="${ps(o.id)}"]`);s&&Lc(s,o);for(let l of o.controls){let c=e.querySelector(`[data-nc-id="${ps(l.id)}"]`);c instanceof Element&&ze(c,l)}s instanceof HTMLElement&&ar(s,o,n)}return}e.dataset.ncSignature=r,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let o of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=o.id,o.inset&&(s.dataset.ncInset="true"),o.area&&(s.dataset.ncArea=o.area),o.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",o.label)),o.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),o.title&&s.setAttribute("aria-label",o.title)),vm(s,o);let l=o.panel?document.createElement("div"):s;o.panel&&(l.className="nc-panel-body",s.append(l));for(let c of o.controls)l.append(Tt(c,wm));e.append(s),ar(s,o,n)}}function Cc(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,r=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,r))}}var xm="(max-width: 768px)",Nc=new WeakMap;function us(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function $m(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let r=us("prev"),o=us("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(r,s,o,l);let c=(d,u)=>{let h=Nc.get(e);if(!h||u.getAttribute("aria-disabled")==="true")return;let f=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:m}=Cc(f,h.pageSize,(t.pages.get(h.id)??0)+d);t.pages.set(h.id,m),h.onPage?.(m),ar(e,{...h,page:m},t),u.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===u&&(u===r?o:r).focus(),t.redraw()};return r.addEventListener("click",()=>c(-1,r)),o.addEventListener("click",()=>c(1,o)),e.prepend(a),a}function ar(e,t,n){Nc.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],r=t.pageSize??0,{pages:o,page:s}=Cc(a.length,r,t.page??n.pages.get(t.id)??0);if(r>0&&n.pages.set(t.id,s),o<=1){for(let p of[...e.children])p.classList.contains("nc-fx-pager")&&p.remove();delete e.dataset.ncPaged;for(let p of a)delete p.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(xm).matches===!0,c=e.closest(".nc-module");a.forEach((p,b)=>{let x=Math.floor(b/r)!==s;if(x?p.dataset.ncOffPage="":delete p.dataset.ncOffPage,x&&!l){let v=c instanceof HTMLElement?Ye.get(c):void 0;Zf(p,Tc(v,p.dataset.ncId))}});let d=$m(e,n),u=d.querySelector('[data-nc-fx-page="prev"]'),h=d.querySelector('[data-nc-fx-page="next"]');u.setAttribute("aria-disabled",s===0?"true":"false"),h.setAttribute("aria-disabled",s===o-1?"true":"false");let f=d.querySelector("[data-nc-fx-page-count]"),m=`${s+1} / ${o}`;f.textContent!==m&&(f.textContent=m);let g=d.querySelector("[data-nc-fx-page-live]"),y=`Effects page ${s+1} of ${o}`;g.textContent!==y&&(g.textContent=y)}function ps(e){return e.replace(/["\\]/g,"\\$&")}function Am(e,t=_r){Fl();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Sc(wi(),t).has(e.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=Tr({labelledBy:o.id,onChange:x=>(Ye.get(n)??e).onToggle?.(x)});d.el.dataset.ncModuleSwitch="",s.append(d.el,l,c);let u=document.createElement("span");u.className="nc-snap-msg",u.dataset.ncStatus="",r.append(o,u,s);let h=document.createElement("div");h.className="nc-module-body",h.id=`${e.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let m=document.createElement("span");m.className="nc-slim-lines",f.append(m);let g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",n.append(g,r,h,f),n.setAttribute("aria-labelledby",o.id);let y=x=>{let v=Ye.get(n)??e;n.dataset.ncOpen=x?"false":"true",h.hidden=x,f.hidden=!x,l.textContent=x?"+":"−",l.setAttribute("aria-expanded",x?"false":"true"),l.setAttribute("aria-controls",h.id),l.setAttribute("aria-label",`${x?"Show":"Hide"} ${v.title}`),l.title=x?"Show":"Hide",x?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let x=n.dataset.ncOpen==="true";ds(wi(),(Ye.get(n)??e).id,x,t),y(x),ir(n.parentElement)}),f.addEventListener("click",()=>{ds(wi(),(Ye.get(n)??e).id,!1,t),y(!1),ir(n.parentElement)});let p={pages:new Map,redraw:()=>b.redraw()},b={el:n,update(x){Ye.set(n,x),x.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=x.title,u.textContent=x.status??"",x.status!==void 0?u.setAttribute("aria-live","polite"):u.removeAttribute("aria-live"),m.textContent=x.summary??x.title,d.el.hidden=x.on===void 0,d.set(x.on===!0),x.on===!1?h.dataset.ncDim="true":delete h.dataset.ncDim,f.setAttribute("aria-label",`Show ${x.title}`),km(h,x,p),y(h.hidden),b.redraw()},redraw(){let x=Ye.get(n);x&&am(n,jr(x))}};return Ye.set(n,e),y(a),b.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>b.redraw()).observe(n),Ml(()=>b.redraw(),n.ownerDocument),b}function Em(e,t,n="adjacent"){Fl(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((r,o)=>{let s=o%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=a;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(r.el),r.redraw()}),ir(e)}function ir(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=t.some(o=>o.hasAttribute("data-nc-lead")),a=t.map(o=>o.hasAttribute("data-nc-slim")?i("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let r=t.filter(o=>!o.hasAttribute("data-nc-slim"));n&&t.length===4&&r.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Fn=-48,hs=24,Mm=-1,rr=32,Sm=250,Tm=1200,Lm=.2,Fc=1.5,Cm=[-48,-24,-12,0],or="−",fs=e=>e>0?20*Math.log10(e):-1/0;function In(e){return e>Fn?e>=0?1:(e-Fn)/-Fn:0}function Dc(e){return e>0?e>=hs?1:e/hs:0}function sr(e,t=!1){if(t)return`${e>.05?or:""}${Math.abs(e).toFixed(1)} dB`;if(!(e>Fn))return"—";const n=Math.round(e*10)/10;return`${n<0?or:n>0?"+":""}${Math.abs(n).toFixed(1)}`}function Se(e,t,n){const a=e.createElement("span");return a.className=t,n!==void 0&&(a.textContent=n),a}function Nm(e=globalThis.document){Dm(e);const t=e.createElement("div");t.className="nc-comp-gauge",t.setAttribute("aria-hidden","true");for(const[a,r]of[["in","In"],["gr","GR"],["out","Out"]]){t.append(Se(e,"nc-comp-gauge-label",r));const o=Se(e,"nc-comp-gauge-bar");o.dataset.ncGauge=a,o.append(Se(e,"nc-comp-gauge-fill"),Se(e,"nc-comp-gauge-peak")),a!=="gr"&&o.append(Se(e,"nc-comp-gauge-hot")),a==="in"&&o.append(Se(e,"nc-comp-gauge-th")),t.append(o,Se(e,"nc-comp-gauge-val",a==="gr"?sr(0,!0):sr(-1/0)))}const n=Se(e,"nc-comp-gauge-ticks");for(const a of Cm){const r=Se(e,"",a===0?"0":`${or}${-a}`);r.style.left=`${In(a)*100}%`,n.append(r)}return t.append(Se(e,""),n,Se(e,"")),t}const Fm=`
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
`;function Dm(e){if(!e?.head||e.head.querySelector("style[data-nc-comp-gauge]"))return;const t=e.createElement("style");t.dataset.ncCompGauge="",t.textContent=Fm,e.head.append(t)}const La=new WeakMap,ms=new WeakMap;function gs(e,t,n){const a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;const r=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),o=Number.parseFloat(r);return Number.isFinite(o)?r.endsWith("ms")?o/1e3:o:n}const Ca=e=>e.doc.defaultView?.performance?.now()??Date.now();function zm(e){let t=ms.get(e);if(t)return t;const n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1};const a=n?.IntersectionObserver;return a&&(t.io=new a(r=>{for(const o of r){const s=La.get(o.target);s&&(s.seen=o.isIntersecting,Na(s))}Fa(t)})),e.addEventListener("visibilitychange",()=>{for(const r of t.recs)Na(r);Fa(t)}),ms.set(e,t),t}function Na(e){const t=e.loop.io?e.seen&&e.el.isConnected:e.el.isConnected,n=!e.dead&&!!e.source&&t&&e.loop.doc.visibilityState!=="hidden";if(n&&!e.open){const a=typeof e.source.open=="function"?e.source.open():!0;e.open=a!==!1,e.open&&(e.loop.loud=Ca(e.loop))}else!n&&e.open&&(e.open=!1,e.source?.close?.(),cr(e))}function Fa(e){let t=!1;for(const n of e.recs)n.open&&(t=!0);if(!t)return zc(e);e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Ca(e)),!e.raf&&!e.timer&&lr(e,!1)}function lr(e,t){const n=e.doc.defaultView;n&&(t?e.timer=n.setTimeout(()=>(e.timer=0,ki(e,Ca(e))),Sm):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(a=>(e.raf=0,ki(e,a))):e.timer=n.setTimeout(()=>(e.timer=0,ki(e,Ca(e))),rr))}function zc(e){const t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function ki(e,t){if(e.last&&!e.idle&&t-e.last<rr-4)return lr(e,!1);const n=e.last?Math.min(.25,(t-e.last)/1e3):rr/1e3;e.last=t;let a=!1,r=!1;for(const o of e.recs){if(!o.el.isConnected){o.placed&&Bc(o);continue}o.placed=!0,o.open&&(a=!0,Bm(o,n,t)&&(e.loud=t),o.disp.some(s=>s>0)&&(r=!0))}if(!a)return zc(e);e.idle=t-e.loud>Tm&&!r,lr(e,e.idle)}function Bm(e,t,n){e.fall<0&&(e.fall=gs(e.el,"motion-meter-fall",Lm),e.hold=gs(e.el,"motion-meter-hold",Fc));let a=null;try{a=e.source.read()}catch{a=null}const r=e.on();!r&&e.wasOn&&(e.disp[1]=e.disp[2]=0,e.peakDb[1]=0,e.peakDb[2]=-1/0),e.wasOn=r;const o=fs(Number(a?.in)||0),s=r?fs(Number(a?.out)||0):-1/0,l=r?Math.max(0,Number(a?.gr)||0):0,c=[In(o),Dc(l),In(s)],d=[o,l,s],u=e.fall>0?Math.exp(-t/e.fall):0;for(let h=0;h<3;h++){const f=c[h];e.disp[h]=f>=e.disp[h]?f:f+(e.disp[h]-f)*u,e.disp[h]<.001&&(e.disp[h]=0);const m=d[h]>=e.peakDb[h];(m||n-e.peakAt[h]>e.hold*1e3)&&(m?(e.peakDb[h]=d[h],e.peakAt[h]=n):e.peakDb[h]=Math.max(h===1?l:d[h],e.peakDb[h]-t*20))}return Hr(e,r),o>Fn||l>0}function Hr(e,t){const n=e.el.querySelectorAll(":scope > .nc-comp-gauge-bar"),a=e.el.querySelectorAll(":scope > .nc-comp-gauge-val"),r=t?"false":"true";e.el.dataset.ncOff!==r&&(e.el.dataset.ncOff=r);for(let c=0;c<3;c++){const d=n[c];if(!d)continue;const u=c===1,h=Math.round(e.disp[c]*1e3)/1e3,f=u?Dc(e.peakDb[c]):In(e.peakDb[c]),m=!u&&e.peakDb[c]>=Mm?"true":"false",g=`${h}|${Math.round(f*1e3)}|${m}`;if(e.shown[c]!==g){e.shown[c]=g;const p=d.children[0],b=d.children[1];p.style.transform=`scaleX(${h})`,b.style.left=u?`${(1-f)*100}%`:`${f*100}%`,b.hidden=f<=0,d.dataset.hot=m}const y=sr(e.peakDb[c],u);a[c]&&a[c].textContent!==y&&(a[c].textContent=y)}const o=e.el.querySelector(".nc-comp-gauge-th"),s=e.threshold(),l=typeof s=="number"&&Number.isFinite(s)?`${In(s)*100}%`:"";o&&o.style.left!==l&&(o.style.left=l,o.hidden=!l)}function cr(e){e.disp=[0,0,0],e.peakDb=[-1/0,0,-1/0],e.peakAt=[0,0,0],e.shown=["","",""],Hr(e,e.on())}function Bc(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e),e.loop.io?.unobserve(e.el),La.get(e.el)===e&&La.delete(e.el)}function qm(e,t){const n=e.ownerDocument??globalThis.document,a=zm(n),r={el:e,loop:a,open:!1,dead:!1,seen:!1,placed:!1,source:t?.source??null,threshold:t?.threshold??(()=>null),on:t?.on??(()=>!0),wasOn:!0,disp:[0,0,0],peakDb:[-1/0,0,-1/0],peakAt:[0,0,0],shown:["","",""],fall:-1,hold:Fc};if(La.set(e,r),a.recs.add(r),a.io?.observe(e),cr(r),!a.io){const o=n.defaultView,s=()=>{Na(r),Fa(a)};typeof o?.requestAnimationFrame=="function"?o.requestAnimationFrame(s):setTimeout(s,0)}return{set(o){if(r.dead)return;r.threshold=o?.threshold??r.threshold,r.on=o?.on??r.on;const s=o?.source??null;s!==r.source&&(r.open&&(r.open=!1,r.source?.close?.()),r.source=s,cr(r)),Hr(r,r.on()),Na(r),Fa(a)},destroy(){Bc(r)}}}const bs=new WeakMap;function Rm(e,t){if(!e)return null;let n=bs.get(e);if(!n||!n.el.isConnected||n.el.parentElement!==e){n?.binding.destroy();const a=Nm(e.ownerDocument);t?.help&&(a.dataset.ncHelp=t.help);const r=t?.after??e.querySelector(":scope > .nc-ui-fx-hd");r&&r.parentElement===e?r.after(a):e.prepend(a),n={el:a,binding:qm(a,t)},bs.set(e,n)}else n.binding.set(t);return t?.color&&n.el.style.setProperty("--nc-gauge-gr",t.color),n.el}function Im(e,t,n,a){const r=Math.min(n,e.length);for(let o=Math.max(0,t);o<r;o++)if(Math.abs(e[o]??0)>=a)return o;return-1}function Pm(e,t,n,a=.35){let r=0;for(let l=0;l<e.length;l++)r=Math.max(r,Math.abs(e[l]??0));if(r<.01)return null;const o=[];for(const l of t){const c=Im(e,l,l+n,r*a);c>=0&&o.push(c-l)}if(o.length*2<t.length||o.length===0)return null;o.sort((l,c)=>l-c);const s=Math.floor(o.length/2);return o.length%2?o[s]??0:((o[s-1]??0)+(o[s]??0))/2}const Om="/lucy/assets/capture-processor-WFb8p4vo.js",H=4,pa=[1,2,4,8];function Da(e){return Math.ceil(e/H-1e-6)*H+0}function _m(e,t,n=0){let a=Da(e);return a-e<n&&(a+=H),{startBeat:a,endBeat:a+t*H}}function jm(e,t,n,a){const r=Math.round((e+n)*a);return{startFrame:r,endFrame:r+Math.round((t-e)*a)}}function Nt(e){return 60/e}function Hm(e,t,n){const a=o=>Math.round(o*4*Nt(n)*t),r=pa.find(o=>a(o)>=e)??pa[pa.length-1];return{bars:r,frames:a(r),trimmed:e>a(r)}}function Um(e,t,n=0){const a=e.currentTime;let r=null;try{r=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null}catch{r=null}if(r&&typeof r.contextTime=="number"&&typeof r.performanceTime=="number"){if(!(r.contextTime>0)||!(r.performanceTime>0))return Number.NEGATIVE_INFINITY;const s=r.contextTime+Math.max(0,t-(n+r.performanceTime))/1e3;if(Number.isFinite(s))return Math.min(a,s)}const o=(e.baseLatency??0)+(e.outputLatency??0);return a-(Number.isFinite(o)&&o>0?o:0)}const Wm=[0,4,8],Gm=["sound","visual","both"],qc=4,Rc="both";function Vm(e){return Wm.includes(e)?e:qc}function Ym(e){return Gm.includes(e)?e:Rc}const Km=e=>e!=="visual",Ur=e=>e!=="sound",Xm=1;function Ic(e,t,n,a=0,r=Xm){if(t){const s=Math.max(0,Math.floor(e/H)*H);if(e-s<=r){const l=s+Math.ceil(n/H)*H;return{countBeat:l-n,startBeat:l}}}const o=Math.max(0,Da(e+a+n));return{countBeat:o-n,startBeat:o}}function Qm(e,t,n){if(e>=n)return null;const a=n-t,r=Math.max(0,Math.floor(e-t+1e-6));return Math.max(1,a-r)}const ha=.03;function Jm(e,t,n,a=Number.NEGATIVE_INFINITY,r=n(t)){const o=[],s=t-e;for(let l=0;l<s;l++){const c=e+l,d=n(c);d<a||d+ha>r||o.push({time:d,accent:c%H===0,n:s-l})}return o}function Zm(e,t){return t===null?e:`${t} · ${e}`}const Qt=["eq","compressor"],eg={eq:{},compressor:{threshold_db:-18,ratio:40,makeup_db:3}};function Wr(e){if(e!==void 0){const n=Ln(e,Qt.length);if(n.chain.length===Qt.length&&n.chain.every((a,r)=>a.type===Qt[r]))return n}return{v:2,chain:Qt.flatMap(n=>{const a=Er(n);return a?[{...a,bypass:!0,dials:{...a.dials,...eg[n]}}]:[]})}}const ut={"page:title":"LUCY records a few bars from your mic, or the Studio's Master, and loops them in time with the clock. The number is this copy's, when the Studio holds more than one.",master:"LUCY's output level: the loop and the monitored mic together. Lower is quieter; 0% is silent.","action:save":"Downloads the selected take's region (between its markers) as a WAV file you can open in any audio app.","action:load":"Brings in an audio file as a new take, fitted to 1, 2, 4 or 8 bars at the current tempo. A file longer than 8 bars is trimmed.","action:panic":"Stops it all at once: cancels a take, stops the loop, turns Monitor off and clears effect tails. Play brings the loop back.","module:transport":"Play the loop, record a take and choose how many bars it lasts.","module:input":"What Record records: an input (your mic, an audio interface or a virtual cable, with its level, monitor and timing correction), a tab's or the computer's sound, or in the Studio its Master.","module:takes":"Everything you have recorded or loaded, kept in this browser, newest first. The outlined take is the one that loops.","module:hacks":"Effects on everything LUCY plays, the takes and the monitored mic: EQ, then Compressor. Both start off.",play:"Starts or stops the selected take's region looping in time. In the Studio, Stop sits LUCY out while the others play on, and Play brings it back on the next bar.",arm:"Records the chosen bars from the next bar line: the mic at once, the Master once the music plays. While Lupa jams: Record voice pass, its next loop as a pass.",mic:"The mic threshold: how loud the mic must get for a voice pass to be kept.","mic-threshold":"How loud the mic must get for a voice pass to be kept (default −45 dB): the mark on the meter. A loop quieter than this the whole way leaves nothing.","mic-meter":"What the mic hears now: past the mark it turns purple, loud enough for a voice pass. Drag the mark to change the threshold.","mic-mark":"The mic threshold. Drag it left if your voice doesn't reach it.",bars:"How many bars Record captures: 1, 2, 4 or 8. The new take loops at that length.","record-from":"Input: your mic, interface or a virtual cable (BlackHole); Computer audio: a tab's or the computer's sound; Master: the whole Studio mix, inside the page.","capture-label":"What Computer audio records: a browser tab's sound, or the whole computer's (another app or DAW).","input-device":"Which input LUCY records from, chosen here (your Mac's own setting is left alone; each LUCY remembers its own). Unplugged, it falls back to the default and says so.",share:"Opens the browser's picker: a tab with Also share tab audio, or Entire screen with Also share system audio for another app. Only the sound is kept.","share-how-app":"For another app or DAW, choose Entire screen in the picker: the whole computer's sound needs Chrome 141+ on macOS 14.2+.","share-how-tick":"In the picker, turn on Also share tab audio (a tab) or Also share system audio (the screen), or no sound comes.","share-how":"A tab's sound works in Chrome; the whole computer's sound needs Chrome 141+ on macOS 14.2+. Safari can't share sound.","computer-source":"What is being shared now: a tab, a window or the entire screen.","stop-sharing":"Stops sharing (the browser's own Stop sharing bar does the same). A take recording from it is cancelled.","rights-note":"Nobody here knows who owns a tab's or another app's sound, so takes from it are marked Unknown rights, and so is a Sampler pad they're sent to.","count-in":"Counts 4 or 8 beats before a take starts, mic or Master, so you come in on time. Off starts on the next bar line.",click:"The Studio's metronome while a take records, so you play to the beat. It never reaches the take.","count-in-label":"Counts 4 or 8 beats before a take starts, mic or Master, so you come in on time. Off starts on the next bar line.","cue-label":"How the count-in reaches you: a click on each beat, the number in big type here and over every Studio tab, or both.","click-label":"The Studio's metronome while a take records, so you play to the beat. It never reaches the take.",cue:"How the count-in reaches you: a click on each beat, the number in big type here and over every Studio tab, or both.",source:"The input LUCY records from: mono or stereo, and its sample rate (how many times a second it is measured).",allow:"Asks the browser for the microphone. LUCY needs it to record and to calibrate, and to show your inputs by name.","inputs-after":"The browser shows your inputs' names (mic, interface, BlackHole) only once the mic is allowed: then an Input menu appears here.",meter:"How loud your input is right now. Keep it below the top so takes don't distort.",monitor:"Lets you hear your input through LUCY as you play. Use headphones: on speakers it can feed back, and LUCY turns it off if it does.","input-more":"On a phone, timing correction folds away (round trip, Calibrate, Nudge): set it once. Tap to show or hide it.",count:"On a phone, the count-in, how it reaches you, and the click fold away. Tap to show or hide them.","hacks-cards":"On a phone, LUCY's effects fold away: the line says which are on. Tap to show the EQ and Compressor.","timing-label":"Allows for the delay between sound leaving and coming back in, so what you play on the beat lands on the beat.",roundtrip:"The delay from LUCY's output back to its input; takes are shifted by it. Until you Calibrate it is the browser's estimate.",calibrate:"Plays four clicks and listens for them to measure the round trip. Use speakers, not headphones, and keep quiet for two seconds.",nudge:"Fine-tunes the timing by up to 10 ms either way, on top of the round trip. Raise it if takes sound late, lower it if they sound early.","takes:empty":"Takes you record, or audio files you Load, appear here as cards, newest first.","take:card":"One take: click it to make it the one Record and Play act on. The outlined card is the selected one.","take:name":"The take's name. Double-click to rename it: Enter saves, Escape cancels.","take:region":"The part that plays, as bar.beat from Start to End, its length in bars and beats, and in seconds.","take:wave":"The take's sound, with its bar lines and fainter beats at the tempo it was recorded at. Outside the markers it is dimmed: that part is skipped.","take:start":"Where the take starts playing. Drag it (Alt or Option skips the snap) or use the arrow keys; double-click to put it back at the start.","take:end":"Where the take stops and loops back to Start. Drag it or use the arrow keys; double-click to put it back at the end.","take:timing":"Shifts this take earlier (◀) or later (▶) by a millisecond, ten with Shift; double-click the value for 0. The recording itself is never changed.","take:snap":"What the markers snap to: a bar, a beat, an eighth or a sixteenth at the take's tempo, or off. Snapped, the loop is whole beats, so it sits in time.","take:normalize":"On, the take plays at the TRIKI level, so a quiet one fits the mix. Off, it plays as recorded; the audio itself is never changed.","take:normalize-gain":"How much Normalize turns this take up or down to sit at the TRIKI level. It never pushes a peak past −3 dBFS.","take:play":"Plays this take, looping its region in time with the clock; Stop stops it. Only the part between the markers plays.","take:send":"Copies this take's region onto a Sampler pad. A region of a bar or more is fitted to the nearest whole bars; a shorter one lands unfitted.","take:more":"Download this take as a WAV file, or delete it.","take:download":"Saves this take's region (between the markers) as a WAV file you can open in any audio app.","take:delete":"Deletes this take from this browser. Undo on the message that follows brings it back.","take:recording":"The take being recorded: it waits for the bar line (or for the Master's music), then fills in as the audio arrives.","take:cancel":"Stops this recording and drops it. Nothing is kept.","take:source":"Where the take came from: your Mic (or another input), the Studio's Master, Computer audio, or a File you loaded.","take:rights":"A take of computer audio: nobody here knows who owns it, and a Sampler pad it's sent to says so too. Check the licence before you release anything with it.","take:fact:bars":"How many bars the whole take lasts at the tempo it was recorded at.","take:fact:secs":"How long the whole take lasts, in seconds.","take:fact:bpm":"The tempo it was recorded at. At another tempo it plays faster or slower, and its pitch follows.","take:fact:chans":"Mono (one channel) or stereo (two).","take:fact:rate":"Its sample rate: how many times a second the sound was measured.","take:fact:when":"When it was recorded or loaded. Rest on it for the full date and time.","send-to":"Which Sampler gets the take, when the Studio holds more than one.","send-pad":"The pad the take goes onto. A pad that has a sample is replaced only if you say so in the Sampler, and Undo there brings it back.","send-go":"Sends the region to the chosen pad and opens the Sampler, where Undo puts the pad back. If that pad has a sample, the Sampler asks first.","send-name":"An optional name for the sample in the Sampler. Leave it empty to use the take's own name.","send-cancel":"Closes the picker without sending anything.","hack:switch":"Turns this effect on or off. Off, the sound passes through unchanged.","hack:eq":"Tone control: boost or cut the lows (below 150 Hz), the highs (above 6 kHz) and a middle band you can move.","hack:eq:low_db":"Boosts or cuts the lows, below about 150 Hz. Up is fuller and boomier, down is thinner.","hack:eq:mid_db":"Boosts or cuts the middle band set by Mid at. Up pushes that range forward, down scoops it out.","hack:eq:mid_hz":"Where the middle band sits, from 200 Hz (low) to 5 kHz (high). Move it to the range you want to boost or cut.","hack:eq:mid_q":"How wide the middle band is. Higher is narrower and more focused, lower is broader and gentler.","hack:eq:high_db":"Boosts or cuts the highs, above about 6 kHz. Up is brighter and airier, down is darker.","hack:eq:graph":"The EQ's curve over what LUCY plays right now: boosts rise above the middle line, cuts fall below it. Click it to open it wide, then drag a dot to shape it.","hack:eq:node:low":"The lows, below 150 Hz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","hack:eq:node:mid":"The middle band: drag up or down to boost or cut, sideways to move it, and scroll over it for narrower or wider. Double-click resets it.","hack:eq:node:high":"The highs, above 6 kHz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","comp-gauge":"What reaches the compressor (In, the threshold as a tick), how much it turns down (GR) and what comes out (Out).","hack:meter":"The level going into this effect (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. Off, it still shows the input, greyed.","hack:max":"Opens this effect wide, over the modules beside it, so its graph is easy to see. Click again, the ×, or Escape puts it back.","hack:compressor":"Evens out the volume: loud moments are turned down, so the take sounds tighter and more even.","hack:compressor:threshold_db":"The level where turning down starts. Lower catches more of the sound, for a stronger, flatter effect.","hack:compressor:ratio":"How hard loud parts are turned down above the threshold. 1:1 does nothing; higher squashes more.","hack:compressor:attack_ms":"How quickly it turns down once the sound gets loud. Slower lets the start of each note punch through.","hack:compressor:release_ms":"How quickly it lets go once the sound gets quieter. Short recovers fast; long is smoother and steadier.","hack:compressor:makeup_db":"Turns the result back up after compression, to win back the lost volume."};function Pc(e){return`lucy-help-${e.replace(/[^\w-]/g,"-")}`}function tg(e=document){const t=e.querySelector("[data-lucy-help]");if(t)return t;const n=e.createElement("div");n.hidden=!0,n.dataset.lucyHelp="";for(const[a,r]of Object.entries(ut)){const o=e.createElement("span");o.id=Pc(a),o.textContent=r,n.append(o)}return e.body.append(n),n}function q(e,t,...n){const a=ut[e];if(!a)return;t&&t.getAttribute(Ta)!==a&&t.setAttribute(Ta,a);const r=Pc(e);for(const o of n)o&&o.getAttribute("aria-describedby")!==r&&o.setAttribute("aria-describedby",r)}function ng(e,t,n,a=r=>r){const r=`module:${t}`;q(r,e.querySelector(".nc-module-hd .nc-title")),q(r,e.querySelector(".nc-slim"));const o=l=>e.querySelector(`[data-nc-id="${l.replace(/["\\]/g,"\\$&")}"]`),s=l=>{const c=o(l.id);if(!c)return;const d=a(l.id);switch(l.type){case"slider":case"select":q(d,c.querySelector(".nc-label"),c.querySelector("input, select"));break;case"readout":case"canvas":q(d,c.querySelector(".nc-label"));break;case"button":q(d,c,c);break;case"choice":q(d,c,...c.querySelectorAll("[data-nc-choice]"));break;case"label":q(d,c);break;case"group":q(d,c.querySelector(":scope > .nc-group-toggle"),c.querySelector(":scope > .nc-group-toggle"));for(const u of l.controls??[])s(u);break;case"fx":{q(d,c.querySelector(".nc-ui-fx-name"),c.querySelector("[data-nc-fx-switch]")),q("hack:switch",c.querySelector("[data-nc-fx-switch]")),q("hack:meter",null,...c.querySelectorAll("[data-nc-fx-level]"));for(const u of[...l.controls??[],...l.more??[]])s(u);break}}};for(const l of n)s(l)}const ag=48e3;function ig(e,t){try{const n=e?.latency?.(t);return typeof n=="number"&&Number.isFinite(n)&&n>0&&n<=ag?Math.round(n):0}catch{return 0}}function rg(e,t){return{from:e.from+t,to:e.to+t}}const og="instance",sg=99;function Un(e=typeof location>"u"?"":location.search){const t=new URLSearchParams(e).get(og)?.trim()??"";if(!/^\d+$/.test(t))return 1;const n=Number(t);return n>=2&&n<=sg?n:1}function ys(e,t){return t===1?e:`${e}#${t}`}function lg(e,t){return t===1?e:`${e} ${t}`}let Ht;function cg(e,t=Un()){if(Ht!==void 0)return Ht;Ht=null;try{if(typeof window>"u"||window.parent===window)return Ht;const n=window.parent.ncStudio;n&&n.version===1&&(Ht=n.attach(e,{instance:t}))}catch{}return Ht}function dg(){let e;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(e=a.syncScope)}}catch{}if(!e)return{};const t=`/studio/${e}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${t}`,locks:n?{request:(a,r,o)=>n.request(`${a}${t}`,r,o)}:null}}function ug(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1&&typeof e.fxWorklet=="string"&&e.fxWorklet?e.fxWorklet:null}catch{return null}}function Gr(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.grab?e.grab:null}catch{return null}}function Oc(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.countIn?e.countIn:null}catch{return null}}function Ft(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.play?e.play:null}catch{return null}}function bt(e,t=Un()){return t>1?`${e}#${t}`:e}function pg(e,t=Un()){const n=Ft()?.owner()??null;return n===null||n==="studio"||n===bt(e,t)}const xi="master",hg=1,fg=6e3;function mg(e,t,n=0,a=hg){if(t){const o=Math.max(0,Math.floor(e/H)*H);return e-o<=a?o:Da(e)}let r=Math.max(0,Da(e));return r-e<n&&(r+=H),r}function gg(e,t,n,a){const r=Math.round(e*a);return{from:r,to:r+bg(t,n,a)}}function bg(e,t,n){return Math.round(e*H*60/t*n)}class yg{constructor(t){this.deps=t}current={kind:"idle"};rec=null;stopTimer=null;job=0;startSeconds=null;get phase(){return this.current}get busy(){return this.current.kind!=="idle"}press(){this.busy?this.cancel():this.arm()}arm(){if(this.busy)return!0;const t=this.deps.grab();return t?.record?(t.listen(xi),this.set({kind:"waiting"}),this.deps.running()&&this.start(!1),!0):(this.deps.failed("unavailable"),!1)}cancel(){this.drop(),this.set({kind:"idle"})}clockChanged(t){if(this.current.kind==="waiting"&&this.deps.running())this.start(t);else if(this.current.kind==="recording"&&!this.deps.running()){const n=this.current,a=this.deps.now?.();if(n.countBeat<n.startBeat&&a!==void 0&&a<(this.startSeconds??0)){this.drop(),this.set({kind:"waiting"});return}this.drop(),this.set({kind:"idle"}),this.deps.failed("stopped")}}start(t){const n=this.deps.grab(),a=this.deps.beatNow(),r=Math.max(0,Math.round(this.deps.countIn?.()??0)),{countBeat:o,startBeat:s}=r>0?Ic(a,t,r,this.deps.leadBeats()):(()=>{const b=mg(a,t,this.deps.leadBeats());return{countBeat:b,startBeat:b}})(),l=this.deps.bars(),c=this.deps.bpm(),d=this.deps.sampleRate(),{from:u,to:h}=rg(gg(this.deps.contextTime(s),l,c,d),ig(n??null,xi)),f=n?.record?.(xi,u)??null;if(!f){this.set({kind:"idle"}),this.deps.failed("unavailable");return}const m=++this.job,g=this.deps.nextId();this.rec=f,this.startSeconds=this.deps.contextTime(s),this.set({kind:"recording",id:g,countBeat:o,startBeat:s,endBeat:s+l*H,bars:l,bpm:c,from:u,to:h});const y=(h-u)/d*1e3,p=Math.max(0,(this.deps.contextTime(s)-this.nowContext())*1e3);this.stopTimer=this.deps.after(p+y+fg,()=>{m===this.job&&(this.drop(),this.set({kind:"idle"}),this.deps.failed("timeout"))}),f.stop(h).then(b=>this.finish(m,b),()=>this.finish(m,null))}nowContext(){return this.deps.contextTime(this.deps.beatNow())}finish(t,n){if(t!==this.job||this.current.kind!=="recording")return;const a=this.current;this.stopTimer?.(),this.stopTimer=null,this.rec=null,this.set({kind:"idle"});const r=n?.[0]?.length??0;if(!n||r===0){this.deps.failed("empty");return}this.deps.done({id:a.id,bars:a.bars,bpm:a.bpm,startBeat:a.startBeat,from:a.from,to:a.to,channels:n})}drop(){this.job++,this.stopTimer?.(),this.stopTimer=null,this.rec?.cancel(),this.rec=null,this.startSeconds=null}set(t){this.current=t,this.deps.changed()}}function vg(e){let t=0;for(const n of e)for(const a of n)t=Math.max(t,Math.abs(a));return t}const wg=-16,kg=-3,_c=24,xg=3,$g=-80,vs=e=>e>0?20*Math.log10(e):Number.NEGATIVE_INFINITY;function Ag(e,t,n=xg){const a=e[0]?.length??0;if(!a||!e.length)return{rmsDb:Number.NEGATIVE_INFINITY,peakDb:Number.NEGATIVE_INFINITY};const r=Math.max(1,Math.round(t*.01)),o=Math.ceil(a/r),s=new Float64Array(o);let l=0;for(const m of e)for(let g=0;g<a;g++){const y=m[g]??0;s[g/r|0]+=y*y;const p=y<0?-y:y;p>l&&(l=p)}const c=Math.min(o,Math.max(1,Math.round(n*t/r))),d=c===o?a:c*r;let u=0;for(let m=0;m<c;m++)u+=s[m];let h=u;for(let m=c;m<o;m++)u+=s[m]-s[m-c],u>h&&(h=u);const f=Math.max(0,h)/(d*e.length);return{rmsDb:vs(Math.sqrt(f)),peakDb:vs(l)}}function Eg(e){if(!Number.isFinite(e.rmsDb)||e.rmsDb<$g)return 0;let t=Math.min(wg-e.rmsDb,_c);return Number.isFinite(e.peakDb)&&(t=Math.min(t,kg-e.peakDb)),Math.round(t*10)/10}function cn(e,t){return Eg(Ag(e,t))}function jc(e){const t=e.normalize;return t?.on?10**(t.gainDb/20):1}function Mg(e){if(!e||typeof e!="object")return;const t=e;if(typeof t.on!="boolean")return;const n=t.gainDb;if(!(typeof n!="number"||!Number.isFinite(n)||n<-60||n>_c))return{on:t.on,gainDb:n}}function Sg(e){const t=Math.round(e*10)/10;return t===0?"0.0 dB":`${t>0?"+":"−"}${Math.abs(t).toFixed(1)} dB`}const Ya=600;class za{constructor(t,n=Ya){this.totalFrames=t,this.columns=n,this.peaks=new Float32Array(n*2)}peaks;at=0;get filled(){return this.totalFrames<=0?0:Math.min(this.columns,Math.ceil(this.at/this.totalFrames*this.columns))}get frames(){return this.at}add(t){const n=t[0]?.length??0;if(!n||this.totalFrames<=0)return;const a=this.totalFrames/this.columns;let r=0;for(;r<n&&this.at<this.totalFrames;){const o=Math.min(this.columns-1,Math.floor(this.at/a)),s=Math.min(this.totalFrames,Math.ceil((o+1)*a)),l=Math.max(1,Math.min(n-r,s-this.at));let c=this.peaks[o*2]??0,d=this.peaks[o*2+1]??0;for(const u of t)for(let h=r;h<r+l;h++){const f=u[h]??0;f<c&&(c=f),f>d&&(d=f)}this.peaks[o*2]=Math.max(-1,c),this.peaks[o*2+1]=Math.min(1,d),r+=l,this.at+=l}}}function Ka(e,t=Ya){const n=new za(e[0]?.length??0,t);return n.add(e),n.peaks}function ws(e,t=e.length/2,n=.01){const a=Math.min(e.length/2,Math.max(0,Math.floor(t)));if(!a)return"";const r=d=>Math.round(d*1e3)/1e3,o=[],s=[],l=d=>r(-Math.max(e[d*2+1]??0,n)),c=d=>r(-Math.min(e[d*2]??0,-n));o.push(`0 ${l(0)}`);for(let d=0;d<a;d++)o.push(`${d+.5} ${l(d)}`);o.push(`${a} ${l(a-1)}`),s.push(`${a} ${c(a-1)}`);for(let d=a-1;d>=0;d--)s.push(`${d+.5} ${c(d)}`);return s.push(`0 ${c(0)}`),`M${o.join("L")}L${s.join("L")}Z`}function Tg(e,t=Date.now()){const n=Date.parse(e);if(!Number.isFinite(n))return"";const a=Math.max(0,(t-n)/1e3);if(a<45)return"just now";const r=Math.round(a/60);if(r<60)return`${r} min ago`;const o=Math.round(r/60);if(o<24)return`${o} h ago`;const s=Math.round(o/24);return s===1?"yesterday":s<7?`${s} days ago`:new Date(n).toLocaleDateString(void 0,{day:"numeric",month:"short"})}function Lg(e){const t=Date.parse(e);return Number.isFinite(t)?new Date(t).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"}):""}const Le=1,Ba=1024,Cg=48,Hc=128,ks=40,xs=64,$s=8,As=16,Es=1024,Uc=16,Vr=255,Ng=["chord","root","top"],Fg=["chord","root","top","arp","note"],Ms=24,Ss=-60,Dg=["ask","armed","recording","cancel","quiet","added","undo","undone"],Ts=9999,Ut=256,dr=2,oa=128,Wc=64,ur=24,Ls=4,Pn=e=>typeof e=="object"&&e!==null,me=e=>typeof e=="string"&&e.length>0&&e.length<=Hc,J=e=>typeof e=="number"&&Number.isFinite(e);function Cs(e){return Pn(e)?me(e.id)?me(e.source)?!Number.isInteger(e.note)||e.note<0||e.note>127?"note must be a whole number 0–127":!J(e.velocity)||e.velocity<0||e.velocity>1?"velocity must be 0–1":J(e.startBeat)?!J(e.lengthBeats)||e.lengthBeats<0?"bad lengthBeats":!J(e.spanBeats)||e.spanBeats<=0?"bad spanBeats":!J(e.gate)||e.gate<=0||e.gate>1?"gate must be above 0, at most 1":!J(e.offsetSec)||Math.abs(e.offsetSec)>2?"bad offsetSec":typeof e.role!="string"||!Fg.includes(e.role)?"bad role":Number.isInteger(e.hit)?!Number.isInteger(e.root)||e.root<0||e.root>127?"bad root":e.slice!==void 0&&!Gc(e.slice)?`slice must be a whole number 0–${Vr}`:null:"bad hit":"bad startBeat":"bad source":"bad id":"not an object"}const Gc=e=>Number.isInteger(e)&&e>=0&&e<=Vr,zg=e=>Number.isInteger(e)&&e>=1&&e<=Uc;function Vc(e){return Pn(e)?me(e.id)?J(e.beat)?e.type==="slot"?!Number.isInteger(e.slot)||e.slot<1||e.slot>As?`slot must be a whole number 1–${As}`:null:e.type==="chordPad"?e.pad!==null&&!zg(e.pad)?`pad must be a whole number 1–${Uc}, or null`:null:e.type==="take"?me(e.take)?!J(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>Ut?`lengthBeats must be above 0, at most ${Ut}`:e.gain!==void 0&&(!J(e.gain)||e.gain<0||e.gain>dr)?`gain must be 0–${dr}`:e.offsetBeats!==void 0&&(!J(e.offsetBeats)||e.offsetBeats<0||e.offsetBeats>=e.lengthBeats)?"offsetBeats must be from 0, below lengthBeats":e.peaks!==void 0&&!(Array.isArray(e.peaks)&&e.peaks.length<=oa&&e.peaks.every(t=>J(t)&&t>=0&&t<=1))?`peaks must be at most ${oa} values 0–1`:e.normalize!==void 0&&typeof e.normalize!="boolean"?"normalize must be true or false":e.normalizeDb!==void 0&&(!J(e.normalizeDb)||e.normalizeDb<Ss||e.normalizeDb>Ms)?`normalizeDb must be ${Ss}–${Ms}`:null:"bad take":e.type==="lap"?!J(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>Ut?`lengthBeats must be above 0, at most ${Ut}`:null:e.type==="voice"?typeof e.state!="string"||!Dg.includes(e.state)?"bad voice state":e.lengthBeats!==void 0&&(!J(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>Ut)?`lengthBeats must be above 0, at most ${Ut}`:e.state==="armed"&&e.lengthBeats===void 0?"an armed voice pass needs lengthBeats":e.pass!==void 0&&!(Number.isInteger(e.pass)&&e.pass>=1&&e.pass<=Ts)?`pass must be a whole number 1–${Ts}`:e.take!==void 0&&!me(e.take)?"bad take":(e.state==="undo"||e.state==="undone")&&e.take===void 0?"undo needs its take":e.peaks!==void 0&&!(Array.isArray(e.peaks)&&e.peaks.length<=oa&&e.peaks.every(t=>J(t)&&t>=0&&t<=1))?`peaks must be at most ${oa} values 0–1`:null:e.type==="param"?typeof e.param!="string"||!Bg.test(e.param)?`param must be 1–${Wc} letters, digits, '.', '-' or '_'`:Ns(e.value)?e.label!==void 0&&!Fs(e.label)?`label must be 1–${ur} characters`:e.text!==void 0&&!Fs(e.text)?`text must be 1–${ur} characters`:e.from!==void 0&&!Ns(e.from)?"from must be 0–1":e.glide!==void 0&&(!J(e.glide)||e.glide<=0||e.glide>Ls)?`glide must be above 0, at most ${Ls} beats`:null:"value must be 0–1":"bad type":"bad beat":"bad id":"not an object"}const Bg=new RegExp(`^[A-Za-z0-9._-]{1,${Wc}}$`),Ns=e=>J(e)&&e>=0&&e<=1,Fs=e=>typeof e=="string"&&e.length>0&&e.length<=ur;function qg(e){if(!Pn(e))return"not an object";if(e.type==="sound")return me(e.id)?J(e.beat)?e.stopped!==void 0&&e.stopped!==!0?"stopped must be true when present":null:"bad beat":"bad id";if(e.type!=="note")return Vc(e);if(!me(e.id))return"bad id";if(!J(e.beat))return"bad beat";if(typeof e.on!="boolean")return"on must be true or false";if(e.pattern!==void 0&&e.pattern!==!0)return"pattern must be true when present";if(e.stopped!==void 0&&e.stopped!==!0)return"stopped must be true when present";if(e.pattern===!0&&e.stopped===!0)return"a pattern note plays on a running clock";if(!Number.isInteger(e.note)||e.note<0||e.note>127)return"note must be a whole number 0–127";if(e.on){if(!J(e.velocity)||e.velocity<=0||e.velocity>1)return"velocity must be above 0, at most 1";if(e.slice!==void 0&&!Gc(e.slice))return`slice must be a whole number 0–${Vr}`;if(e.name!==void 0&&(typeof e.name!="string"||!e.name.length||e.name.length>ks))return`name must be 1–${ks} characters`}else if(e.velocity!==void 0||e.slice!==void 0||e.name!==void 0)return"an off has no velocity, slice or name";return null}function Ds(e,t){if(!Array.isArray(e))return"events must be a list";if(e.length>Ba)return`more than ${Ba} events`;for(let n=0;n<e.length;n++){const a=t(e[n]);if(a)return`event ${n}: ${a}`}return null}function Rg(e){if(!Pn(e))return"not an object";if(e.v!==Le)return`version ${String(e.v)} is not ${Le}`;if(e.kind==="notes"){if(!me(e.source))return"bad source";if(!Array.isArray(e.events))return"events must be a list";if(e.events.length>Ba)return`more than ${Ba} events`;for(let t=0;t<e.events.length;t++){const n=Cs(e.events[t]);if(n)return`event ${t}: ${n}`;if(e.events[t].source!==e.source)return`event ${t}: from another source`}return null}if(e.kind==="audition"){if(!me(e.source))return"bad source";if(!Array.isArray(e.events))return"events must be a list";if(e.events.length>xs)return`more than ${xs} notes`;if(!J(e.holdSec)||e.holdSec<=0||e.holdSec>$s)return`holdSec must be above 0, at most ${$s}`;for(let t=0;t<e.events.length;t++){const n=Cs(e.events[t]);if(n)return`event ${t}: ${n}`;if(e.events[t].source!==e.source)return`event ${t}: from another source`}return null}if(e.kind==="played")return me(e.source)?Ds(e.events,qg):"bad source";if(e.kind==="controls")return me(e.source)?Ds(e.events,Vc):"bad source";if(e.kind==="off")return me(e.source)?["stop","removed","off","restart"].includes(e.reason)?e.atBeat!==void 0&&!J(e.atBeat)?"bad atBeat":null:"bad reason":"bad source";if(e.kind==="release"){if(!me(e.source))return"bad source";if(!Array.isArray(e.ids))return"ids must be a list";if(e.ids.length>Es)return`more than ${Es} ids`;for(let t=0;t<e.ids.length;t++)if(!me(e.ids[t]))return`id ${t}: bad id`;return null}if(e.kind==="routes"){if(!Array.isArray(e.routes)||e.routes.length>64)return"routes must be a list (at most 64)";for(const t of e.routes){if(!Pn(t)||!me(t.source)||typeof t.name!="string"||t.name.length>Hc)return"bad route";if(!Ng.includes(t.role))return"bad route role";if(t.octave!==void 0&&!(Number.isInteger(t.octave)&&t.octave>=-1&&t.octave<=9))return"bad route octave";if(t.transpose!==void 0&&!(Number.isInteger(t.transpose)&&Math.abs(t.transpose)<=Cg))return"bad route transpose";if(t.layer!==void 0&&typeof t.layer!="boolean")return"bad route layer"}return null}return"unknown kind"}const zs=e=>({id:e.id,source:e.source,note:e.note,velocity:e.velocity,startBeat:e.startBeat,lengthBeats:e.lengthBeats,role:e.role,offsetSec:e.offsetSec,spanBeats:e.spanBeats,gate:e.gate,hit:e.hit,root:e.root,...e.slice===void 0?{}:{slice:e.slice}}),Yc=e=>e.type==="slot"?{type:"slot",id:e.id,beat:e.beat,slot:e.slot}:e.type==="take"?{type:"take",id:e.id,beat:e.beat,take:e.take,lengthBeats:e.lengthBeats,...e.gain===void 0?{}:{gain:e.gain},...e.offsetBeats===void 0?{}:{offsetBeats:e.offsetBeats},...e.peaks===void 0?{}:{peaks:[...e.peaks]},...e.normalize===void 0?{}:{normalize:e.normalize},...e.normalizeDb===void 0?{}:{normalizeDb:e.normalizeDb}}:e.type==="lap"?{type:"lap",id:e.id,beat:e.beat,lengthBeats:e.lengthBeats}:e.type==="voice"?{type:"voice",id:e.id,beat:e.beat,state:e.state,...e.lengthBeats===void 0?{}:{lengthBeats:e.lengthBeats},...e.pass===void 0?{}:{pass:e.pass},...e.take===void 0?{}:{take:e.take},...e.peaks===void 0?{}:{peaks:[...e.peaks]}}:e.type==="param"?{type:"param",id:e.id,beat:e.beat,param:e.param,value:e.value,...e.label===void 0?{}:{label:e.label},...e.text===void 0?{}:{text:e.text},...e.from===void 0?{}:{from:e.from},...e.glide===void 0?{}:{glide:e.glide}}:{type:"chordPad",id:e.id,beat:e.beat,pad:e.pad},Ig=e=>e.type==="sound"?{type:"sound",id:e.id,beat:e.beat,...e.stopped===!0?{stopped:!0}:{}}:e.type!=="note"?Yc(e):{type:"note",id:e.id,beat:e.beat,on:e.on,note:e.note,...e.on?{velocity:e.velocity}:{},...e.on&&e.slice!==void 0?{slice:e.slice}:{},...e.on&&e.name!==void 0?{name:e.name}:{},...e.pattern===!0?{pattern:!0}:{},...e.stopped===!0?{stopped:!0}:{}};function Pg(e){if(Rg(e))return null;const t=e;return t.kind==="notes"?{v:Le,kind:"notes",source:t.source,events:t.events.map(zs)}:t.kind==="audition"?{v:Le,kind:"audition",source:t.source,events:t.events.map(zs),holdSec:t.holdSec}:t.kind==="played"?{v:Le,kind:"played",source:t.source,events:t.events.map(Ig)}:t.kind==="controls"?{v:Le,kind:"controls",source:t.source,events:t.events.map(Yc)}:t.kind==="off"?{v:Le,kind:"off",source:t.source,reason:t.reason,...t.atBeat===void 0?{}:{atBeat:t.atBeat}}:t.kind==="release"?{v:Le,kind:"release",source:t.source,ids:[...t.ids]}:{v:Le,kind:"routes",routes:t.routes.map(n=>({source:n.source,name:n.name,role:n.role,...n.octave===void 0?{}:{octave:n.octave},...n.transpose===void 0?{}:{transpose:n.transpose},...n.layer===void 0?{}:{layer:n.layer}}))}}const Kc=-45,yt=-70,Wn=-20,Bs=.05,Xc=128,Og=1e6,_g=3,jg=.25,Hg=.05,Ug=.01,fa=e=>10**(e/20),Wg={takes:"layer"};function Gg(e,t){return e?.notesIn?.(t,Wg)??(()=>{})}function Qc(e){return typeof e=="number"&&Number.isFinite(e)?Math.round(Math.max(yt,Math.min(Wn,e))):Kc}const Vg={thresholdDb:Kc,nextVoice:1,voices:[]};function qa(e){const t=e&&typeof e=="object"?e:{},n=Array.isArray(t.voices)?t.voices.filter(r=>!!r&&[r.id,r.frames,r.sampleRate,r.channels].every(o=>typeof o=="number"&&Number.isInteger(o)&&o>0)):[];for(const r of n)r.normalizeDb!==void 0&&!(Number.isFinite(r.normalizeDb)&&Math.abs(r.normalizeDb)<=60)&&Reflect.deleteProperty(r,"normalizeDb");const a=n.reduce((r,o)=>Math.max(r,o.id),0);return{thresholdDb:Qc(t.thresholdDb),nextVoice:Math.max(a+1,typeof t.nextVoice=="number"?Math.floor(t.nextVoice):1),voices:n}}const Yg=e=>`v${e}`;function Kg(e){const t=/^v(\d{1,9})$/.exec(e);return t?Number(t[1]):null}const Jc=e=>{const t=e>0?20*Math.log10(e):-120;return Math.round(Math.max(0,Math.min(1,(t+60)/60))*100)/100};function Xg(e,t=Xc){const n=e[0]?.length??0;if(!n)return[];const a=Math.min(t,n),r=[];for(let o=0;o<a;o++){const s=Math.floor(o*n/a),l=Math.max(s+1,Math.floor((o+1)*n/a));let c=0;for(const d of e)for(let u=s;u<l;u++){const h=Math.abs(d[u]??0);h>c&&(c=h)}r.push(Jc(c))}return r}function Qg(e,t){const n=e[0]?.length??0;let a=0;for(let r=0;r<n;r++)for(const o of e)if(Math.abs(o[r]??0)>=t){a++;break}return a}class qs{constructor(t,n=Xc){this.total=t,this.points=n,this.max=new Float32Array(n)}max;frames=0;add(t){const n=t[0]?.length??0;for(let a=0;a<n;a++){const r=this.frames+a;if(r>=this.total)break;const o=Math.min(this.points-1,Math.floor(r*this.points/this.total));for(const s of t){const l=Math.abs(s[a]??0);l>(this.max[o]??0)&&(this.max[o]=l)}}this.frames=Math.min(this.total,this.frames+n)}values(){const t=this.total>0?Math.floor(this.frames*this.points/this.total):0;return Array.from(this.max.subarray(0,t),Jc)}get fraction(){return this.total>0?this.frames/this.total:0}}class $i{constructor(t){this.deps=t}serial=0;takes=[];jam=null;buffers=new Map;view={kind:"idle"};job=null;askedAt=0;confirmed=new Map;stats={asked:0,kept:0,quiet:0,played:0,cancelled:0};setThreshold(t){this.deps.state().thresholdDb=Qc(t),this.deps.save(),this.deps.changed()}get voice(){return this.view}get busy(){const t=this.view.kind;return t==="asking"||t==="armed"||t==="recording"}clear(){this.busy||this.view.kind==="saving"||(this.view={kind:"idle"},this.deps.changed())}set(t){this.view=t,this.deps.changed()}message(t){const n=Pg(t);n&&(n.kind==="controls"?this.controls(n.events):n.kind==="off"&&this.off(n.atBeat))}controls(t){for(const n of t)n.type==="lap"?this.heardLap(n.beat,n.lengthBeats):n.type==="take"?this.playTake(n):n.type==="voice"&&this.fromLupa(n)}heardLap(t,n){const a=this.jam,r=!!a;!a||t>a.to+n+1e-6||t<a.from-n?this.jam={from:t,to:t+n,lapBeat:t,lengthBeats:n}:(a.to=Math.max(a.to,t+n),t>=a.lapBeat&&(a.lapBeat=t,a.lengthBeats=n)),r||this.deps.changed()}jamming(t){const n=this.jam;return!!n&&t>=n.from-1e-6&&t<n.to-1e-6}jammingNow(){const t=this.beatNow();return t!==null&&this.jamming(t)}loopAt(t){const n=this.jam;if(!n||!this.jamming(t))return null;const a=n.lengthBeats,r=((t-n.lapBeat)%a+a)%a;return{bar:Math.floor(r/4)+1,beat:Math.floor(r%4)+1,bars:Math.max(1,Math.round(a/4))}}beatNow(){try{const t=this.deps.beatNow?.()??null;return t===null||!Number.isFinite(t)?null:t}catch{return null}}ask(){if(this.busy||!this.jammingNow())return!1;const t=this.beatNow()??0;return this.stats.asked++,this.askedAt=this.deps.now(),this.set({kind:"asking"}),this.tell({state:"ask",beat:t})?!0:(this.view.kind==="asking"&&this.set({kind:"failed",text:"Lupa didn't hear. Try again."}),!1)}cancel(){this.busy&&(this.drop(),this.stats.cancelled++,this.tell({state:"cancel",beat:this.beatNow()??0}),this.set({kind:"idle"}))}undo(){const t=this.view;return t.kind!=="added"?!1:this.tell({state:"undo",beat:this.beatNow()??0,take:t.take})}drop(){this.job&&this.deps.cancel(this.job.id),this.job=null}tell(t){try{return this.deps.report({v:Le,kind:"played",events:[{type:"voice",id:`vp-${++this.serial}`,...t}]})}catch{return!1}}fromLupa(t){if(t.state==="armed"&&t.lengthBeats!==void 0)this.armed(t.beat,t.lengthBeats,t.pass??1);else if(t.state==="cancel"){if(!this.busy)return;this.drop(),this.set({kind:"idle"})}else if(t.state==="added"){t.take&&this.confirmed.set(t.take,t.pass??0);const n=this.view;n.kind==="added"&&(!t.take||t.take===n.take)&&this.set({...n,confirmed:!0,...t.pass?{pass:t.pass}:{}})}else if(t.state==="undone"){const n=this.view;n.kind==="added"&&t.take===n.take&&this.set({kind:"undone",pass:n.pass})}}async armed(t,n,a){if(this.job){if(Math.abs(this.job.beat-t)<1e-6)return;this.drop()}const r=this.view.kind!=="asking"&&!this.jammingNow(),o=Og+ ++this.serial,s={id:o,beat:t,lengthBeats:n,pass:a,started:r,frames:0,parts:[],peaks:new qs(1),loud:!1,queued:!1,sentAt:0};if(this.job=s,this.set({kind:"armed",beat:t,lengthBeats:n,pass:a,started:r}),!this.deps.micOpen()){const f=await this.deps.openMic?.().catch(()=>!1)??!1;if(this.job!==s)return;if(!f||!this.deps.micOpen()){this.job=null,this.tell({state:"cancel",beat:t}),this.set({kind:"failed",text:"Allow the mic to record a voice pass."});return}}const l=this.deps.sampleRate(),c=this.deps.roundTrip(),d=this.deps.timeAt(t);if(d-this.deps.now()<Hg){this.job=null,this.tell({state:"cancel",beat:t}),this.set({kind:"failed",text:"The mic opened too late for that loop. Try again."});return}const u=Math.round((d+c)*l),h=Math.round((this.deps.timeAt(t+n)+c)*l);h<=u||(s.frames=h-u,s.peaks=new qs(s.frames),s.queued=!0,this.deps.record({id:o,startFrame:u,endFrame:h,channels:this.deps.inputChannels(),gate:fa(this.deps.state().thresholdDb)}))}tick(){const t=this.view,n=this.deps.now();if(t.kind==="asking"&&n-this.askedAt>_g){this.set({kind:"failed",text:"Lupa didn't answer. Try again."});return}const a=this.job;if(a){if(t.kind==="armed"&&a.queued&&n>=this.deps.timeAt(a.beat)){this.set({kind:"recording",beat:a.beat,lengthBeats:a.lengthBeats,pass:a.pass,peaks:[],loud:a.loud});return}t.kind==="recording"&&n-a.sentAt>=jg&&a.parts.length&&(a.sentAt=n,this.tell({state:"recording",beat:a.beat,peaks:t.peaks}))}}level(t){const n=this.job;!n||this.view.kind!=="recording"||n.loud||t>=fa(this.deps.state().thresholdDb)&&(n.loud=!0,this.set({...this.view,loud:!0}))}owns(t){return t!==void 0&&this.job?.id===t}capture(t){const n=this.job;if(!n||t.id!==n.id)return;if(t.type==="chunk"&&t.channels){n.parts.push(t.channels),n.peaks.add(t.channels);const r=this.view;r.kind==="recording"&&this.set({...r,peaks:n.peaks.values()});return}if(t.type!=="done")return;this.job=null;const a=(t.loudFrames??0)/this.deps.sampleRate();this.finish(n,Rs(n.parts),a>=Bs,n.lengthBeats)}async finish(t,n,a,r){const o=Xg(n);if(!a||!n[0]?.length){this.stats.quiet++,this.tell({state:"quiet",beat:t.beat}),this.set({kind:"quiet",lengthBeats:t.lengthBeats,peaks:t.peaks.values()});return}this.set({kind:"saving",lengthBeats:t.lengthBeats,pass:t.pass,peaks:t.peaks.values()});const s=await this.keep(t.beat,r,n,o);if(!s){this.set({kind:"failed",text:"Lupa didn't take the voice pass."});return}const l=t.peaks.values(),c=this.confirmed.get(s);this.confirmed.clear(),this.set({kind:"added",pass:c||t.pass,take:s,lengthBeats:t.lengthBeats,keptBeats:r,peaks:l,confirmed:c!==void 0})}async keep(t,n,a,r){const o=a[0]?.length??0;if(!o)return null;const s=this.deps.state(),l={id:s.nextVoice++,frames:o,sampleRate:this.deps.sampleRate(),channels:a.length,normalizeDb:cn(a,this.deps.sampleRate())};s.voices.push(l),this.deps.save();const c=this.deps.storeVoice(l.id,a).catch(()=>!1);this.buffers.set(l.id,c.then(()=>this.deps.loadVoice(l))),await c;const d={type:"take",id:`lap-${l.id}`,beat:t,take:Yg(l.id),lengthBeats:n,peaks:r,...l.normalizeDb!==void 0?{normalizeDb:l.normalizeDb}:{}},u=this.deps.report({v:Le,kind:"played",events:[d]});return u&&this.stats.kept++,u?d.take:null}async playTake(t){const n=Kg(t.take),a=n===null?void 0:this.deps.state().voices.find(y=>y.id===n);if(!a||n===null)return;const r=t.offsetBeats??0,o={beat:t.beat,endBeat:t.beat+t.lengthBeats-r,playing:null,cancelled:!1};this.takes.push(o);let s=this.buffers.get(n);s||(s=this.deps.loadVoice(a),this.buffers.set(n,s));const l=await s;if(!l||o.cancelled){this.takes=this.takes.filter(y=>y!==o);return}const c=this.deps.beatSeconds();let d=this.deps.timeAt(t.beat),u=r*c;const h=this.deps.timeAt(o.endBeat),f=this.deps.now();d<f&&(u+=f-d,d=f);const m=Math.min(h-d,l.duration-u);if(m<=.02){this.takes=this.takes.filter(y=>y!==o);return}let g=Math.max(0,Math.min(dr,t.gain??1));if(t.normalize){if(a.normalizeDb===void 0){const y=Array.from({length:l.numberOfChannels},(p,b)=>l.getChannelData(b));a.normalizeDb=cn(y,l.sampleRate),this.deps.save()}g*=10**(a.normalizeDb/20)}o.playing=this.deps.play(l,d,u,m,g),this.stats.played++}off(t){if(t===void 0){const r=!!this.jam;this.jam=null,this.stopped(),r&&this.deps.changed()}const n=t===void 0?void 0:this.deps.timeAt(t),a=[];for(const r of this.takes){if(t!==void 0&&r.endBeat<=t){a.push(r);continue}r.cancelled=!0,r.playing?.stop(t!==void 0&&r.beat<t?n:void 0)}this.takes=a}stopped(){const t=this.view;if(t.kind==="asking"){this.set({kind:"idle"});return}const n=this.job;if(!n)return;const a=this.deps.now();if(t.kind==="armed"||a<this.deps.timeAt(n.beat)){this.drop(),this.set({kind:"idle"});return}this.drop();const r=Rs(n.parts),o=r[0]?.length??0,s=this.deps.sampleRate(),l=fa(this.deps.state().thresholdDb),c=Qg(r,l)/s>=Bs,d=this.deps.beatSeconds(),u=Math.max(.001,Math.min(n.lengthBeats,o/s/d));this.finish(n,r,c,u)}static fadeSeconds=Ug}function Rs(e){const t=e[0]?.length??0,n=e.reduce((a,r)=>a+(r[0]?.length??0),0);return Array.from({length:t},(a,r)=>{const o=new Float32Array(n);let s=0;for(const l of e){const c=l[r];c&&(o.set(c,s),s+=c.length)}return o})}const Kt=["off","bar","beat","8","16"],Jg="beat",Zg={off:"Off",bar:"Bar",beat:"Beat",8:"1/8",16:"1/16"};function Ze(e){return 60/e.bpm*e.sampleRate}function Zc(e,t){const n=Ze(e);switch(t){case"bar":return n*H;case"beat":return n;case"8":return n/2;case"16":return n/4;default:return null}}function ed(e){return Math.min(e.frames,Math.max(1,Math.round(Ze(e)/4)))}function at(e){return e.region??{start:0,end:e.frames}}function eb(e,t){return t.start<=0&&t.end>=e.frames}function tb(e,t,n){const a=Zc(e,n),r=Math.max(0,Math.min(e.frames,t));if(a===null)return Math.round(r);const o=Math.round(Math.round(r/a)*a);return Math.abs(e.frames-r)<Math.abs(o-r)?e.frames:Math.max(0,Math.min(e.frames,o))}function En(e,t,n){const a=at(e),r=ed(e),o=Math.round(n);return t==="start"?{start:Math.max(0,Math.min(o,a.end-r)),end:a.end}:{start:a.start,end:Math.min(e.frames,Math.max(o,a.start+r))}}function nb(e,t){if(!t||typeof t!="object")return;const n=t,a=n.start,r=n.end;if(typeof a!="number"||typeof r!="number"||!Number.isFinite(a)||!Number.isFinite(r))return;const o=Math.round(a),s=Math.round(r);if(!(o<0||s>e.frames||s-o<ed(e))&&!(o===0&&s===e.frames))return{start:o,end:s}}function Is(e,t,n,a,r=!1){const o=at(e),s=t==="start"?o.start:o.end,l=r?Ze(e)*H:Zc(e,a)??Ze(e)/4,c=s/l,u=Math.abs(c-Math.round(c))*l<.5?Math.round(c)+n:n>0?Math.ceil(c):Math.floor(c);let h=Math.round(u*l);return n>0&&h>e.frames&&(h=e.frames),n>0&&Math.abs(e.frames-h)<1&&(h=e.frames),En(e,t,h)}function Ps(e,t){const n=t/Ze(e)*4,a=Math.round(n),r=Math.abs(n-a)*(Ze(e)/4)<1,o=r?a:Math.floor(n),s=Math.floor(o/16)+1,l=Math.floor(o%16/4)+1,c=o%4+1;return`${r?"":"≈"}${s}.${l}${c===1?"":`.${c}`}`}function ab(e){const t=Math.round(e*1e3)/1e3,n=Math.floor((t+1e-9)/H),a=Math.round((t-n*H)*1e3)/1e3,r=[];if(n&&r.push(`${n} bar${n===1?"":"s"}`),a>0||!n){const o=Number.isInteger(a)?String(a):String(Math.round(a*100)/100);r.push(`${o} beat${a===1?"":"s"}`)}return r.join(" ")}function Yr(e,t=at(e)){return(t.end-t.start)/Ze(e)}function ib(e,t=at(e)){const n=(t.end-t.start)/e.sampleRate;return`${Ps(e,t.start)} → ${Ps(e,t.end)} · ${ab(Yr(e,t))} · ${n.toFixed(2)} s`}function rb(e,t,n){const a=Math.round(n/Ze(e)*4),r=Math.floor(a/16)+1,o=Math.floor(a%16/4)+1;return`${t==="start"?"Start":"End"}: ${(n/e.sampleRate).toFixed(2)} s, bar ${r} beat ${o}`}function ob(e,t=at(e)){const n=Yr(e,t)/H;return n>=1-1e-6?Math.max(1,Math.round(n)):void 0}function td(e,t){return e.map(n=>n.slice(t.start,t.end))}function Os(e,t,n=0){let a=Math.ceil(e/H-1e-6)*H+0;a-e<n&&(a+=H);const r=Math.max(1e-6,t),o=(a%r+r)%r;return{startBeat:a,offsetBeats:Math.abs(o-r)<1e-6?0:o}}function sb(e){const t=Ze(e),n=[],a=[],r=Math.floor(e.frames/t+1e-6);for(let o=1;o<=r;o++){const s=o*t/e.frames;if(s>=1-1e-6)break;(o%H===0?n:a).push(s)}return{bars:n,beats:a}}const dn=500,lb=2;function mt(e){return Math.round(e*10)/10}function Kr(e){return Number.isFinite(e)?mt(Math.max(-dn,Math.min(dn,e))):0}function cb(e,t,n){return Kr(e+t*(n?10:1))}function nd(e){const t=mt(e);if(t===0)return"0 ms";const n=Math.abs(t),a=Number.isInteger(n)?String(n):n.toFixed(1);return`${t<0?"−":"+"}${a} ms`}function db(e,t){return Math.round(e/1e3*t)}function ub(e,t,n){const a=db(t,n);return a===0?e:e.map(r=>{const o=new Float32Array(r.length);return a<0?o.set(r.subarray(Math.min(r.length,-a)),0):a<r.length&&o.set(r.subarray(0,r.length-a),a),o})}function pb(e,t){if(e.source!=="mic"||t.roundTripMs===null||e.timingNoteOff)return null;const n=mt(t.roundTripMs+t.nudgeMs),a=e.tripMs===void 0||e.tripEstimate===!0,r=mt(e.tripMs??t.estimateMs),o=e.shiftMs??0,s=mt(n-(r-o));return Math.abs(s)<=lb?null:{usedMs:r,estimate:a,nowMs:n,lateMs:s,matchMs:Kr(o-s)}}const hb={mic:"Mic",master:"Master",file:"File",computer:"Computer"};function ad(e){return Xr(e)==="computer"?"unknown":null}const id=40;function Xr(e){return e.source??(e.name===`Master ${e.id}`?"master":"mic")}function yn(e){return e.snap??Jg}function fb(e,t){e.source??=Xr(e);const n=t.replace(/\s+/g," ").trim().slice(0,id);return!n||n===`Take ${e.id}`?e.name=void 0:e.name=n,e.name}const tn={bars:2,monitor:!1,roundTripMs:null,nudgeMs:0,takes:[],selected:null,nextId:1,master:1,source:"mic",input:null,countIn:qc,cue:Rc,click:!0,lupa:Vg};function Ne(e){return e.name??`Take ${e.id}`}const _s=new Set([1,2,4,8]);function Gn(e){const t=e&&typeof e=="object"?e:{},n=(l,c,d)=>typeof l=="number"&&Number.isFinite(l)&&l>=c&&l<=d?l:null,a=Array.isArray(t.takes)?t.takes.flatMap(l=>{const c=l&&typeof l=="object"?l:{},d=n(c.id,1,1e9),u=n(c.bars,1,8),h=n(c.bpm,20,300),f=n(c.sampleRate,8e3,192e3),m=n(c.channels,1,2),g=n(c.frames,0,1e9);if(d===null||u===null||!_s.has(u)||h===null||f===null||m===null||g===null)return[];if(c.saved!==!0)return[];const y=typeof c.name=="string"&&c.name.trim()?c.name.trim().slice(0,id):void 0,p={id:d,bars:u,bpm:h,sampleRate:f,channels:m,frames:g,created:String(c.created??""),saved:!0,...y?{name:y}:{}};(c.source==="mic"||c.source==="master"||c.source==="file"||c.source==="computer")&&(p.source=c.source);const b=nb(p,c.region);b&&(p.region=b),typeof c.snap=="string"&&Kt.includes(c.snap)&&(p.snap=c.snap);const x=Mg(c.normalize);x&&(p.normalize=x);const v=n(c.shiftMs,-dn,dn);v&&(p.shiftMs=v);const S=n(c.tripMs,0,2e3);return S!==null&&(p.tripMs=S),c.tripEstimate===!0&&(p.tripEstimate=!0),c.timingNoteOff===!0&&(p.timingNoteOff=!0),[p]}):[],r=n(t.bars,1,8),o=n(t.selected,1,1e9),s=Math.max(n(t.nextId,1,1e9)??1,...a.map(l=>l.id+1));return{bars:r!==null&&_s.has(r)?r:tn.bars,monitor:typeof t.monitor=="boolean"?t.monitor:tn.monitor,roundTripMs:n(t.roundTripMs,0,1e3),nudgeMs:n(t.nudgeMs,-10,10)??0,takes:a,selected:o!==null&&a.some(l=>l.id===o)?o:a.at(-1)?.id??null,nextId:s,master:n(t.master,0,1)??tn.master,source:t.source==="master"||t.source==="computer"?t.source:"mic",input:mb(t.input),countIn:Vm(t.countIn),cue:Ym(t.cue),click:t.click!==!1,lupa:qa(t.lupa),...t.fx&&typeof t.fx=="object"?{fx:t.fx}:{}}}function mb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;const t=e,n=typeof t.id=="string"?t.id.slice(0,200):"",a=typeof t.label=="string"?t.label.replace(/\s+/g," ").trim().slice(0,80):"";return n&&n!=="default"?{id:n,label:a||"Input"}:null}function gb(e,t=Xa()){try{const n=t?.getItem(e);return n?Gn(JSON.parse(n)):{...tn,takes:[],lupa:qa(null)}}catch{return{...tn,takes:[],lupa:qa(null)}}}const rd="lucy.calibration.v1",pr=e=>e.roundTripMs!==null||e.nudgeMs!==0;function bb(e,t=Xa()){try{const n=t?.getItem(rd),a=n?Gn(JSON.parse(n)):null;a&&pr(a)?(e.roundTripMs=a.roundTripMs,e.nudgeMs=a.nudgeMs):pr(e)&&od(e,t)}catch{}return e}function od(e,t=Xa()){if(pr(e))try{t?.setItem(rd,JSON.stringify({roundTripMs:e.roundTripMs,nudgeMs:e.nudgeMs}))}catch{}}function yb(e,t){const n=`${t}-take-`;let a=0;for(const r of e){if(!r.startsWith(n))continue;const o=/^([1-9][0-9]{0,8})\.f32$/.exec(r.slice(n.length));o&&(a=Math.max(a,Number(o[1])))}return a}function vb(e,t,n=Xa()){try{n?.setItem(e,JSON.stringify(t))}catch{}}function Xa(){try{return globalThis.localStorage??null}catch{return null}}function wb(e,t){return(e??"").replace(/\s+/g," ").trim().slice(0,60)||Ne(t)}function kb(e,t){const n=at(e),a=ob(e,n);return{name:Ne(e),sampleRate:e.sampleRate,channels:td(t,n),...a!==void 0?{bars:a}:{},bpm:e.bpm,...ad(e)?{rights:"unknown"}:{}}}class xb{constructor(t,n){this.state=t,this.removeFile=n}pending=new Map;delete(t){const n=this.state.takes.findIndex(r=>r.id===t),a=this.state.takes[n];return a?(this.pending.set(t,{meta:a,index:n,selected:this.state.selected===t}),this.state.takes.splice(n,1),this.state.selected===t&&(this.state.selected=null),!0):!1}undo(t){const n=this.pending.get(t);return n?(this.pending.delete(t),this.state.takes.some(a=>a.id===t)||this.state.takes.splice(Math.min(n.index,this.state.takes.length),0,n.meta),n.selected&&(this.state.selected=t),n.meta):null}async settle(t){this.pending.delete(t)&&await this.removeFile(t)}get held(){return[...this.pending.keys()]}}function Wt(e,t){return`${e}-take-${t}.f32`}function $b(e){return e.channels*e.frames*4}class sd{constructor(t){this.prefix=t}memory=new Map;dir=null;ready=Promise.resolve();adopt(t,n){return t===this.prefix||!n.length?this.ready:(this.ready=(async()=>{const a=await this.folder();if(a)for(const r of n){try{await a.getFileHandle(Wt(this.prefix,r));continue}catch{}try{const o=await(await a.getFileHandle(Wt(t,r))).getFile(),l=await(await a.getFileHandle(Wt(this.prefix,r),{create:!0})).createWritable?.();if(!l)continue;await l.write(await o.arrayBuffer()),await l.close()}catch{}}})(),this.ready)}async highestOnDisk(){await this.ready;const t=await this.folder();if(!t)return 0;try{const n=[];for await(const a of t.keys())n.push(a);return yb(n,this.prefix)}catch{return 0}}folder(){return this.dir??=(async()=>{try{const t=await navigator.storage?.getDirectory?.();return t?await t.getDirectoryHandle("lucy",{create:!0}):null}catch{return null}})(),this.dir}async save(t,n){this.memory.set(t,n),await this.ready;const a=await this.folder();if(!a)return!1;try{const o=await(await a.getFileHandle(Wt(this.prefix,t),{create:!0})).createWritable?.();if(!o)return!1;for(const s of n)await o.write(s);return await o.close(),!0}catch{return!1}}async load(t){const n=this.memory.get(t.id);if(n)return n.length===t.channels&&n.every(r=>r.length===t.frames)?n:null;await this.ready;const a=await this.folder();if(!a)return null;try{const r=await(await a.getFileHandle(Wt(this.prefix,t.id))).getFile();if(r.size!==$b(t))return null;const o=new Float32Array(await r.arrayBuffer()),s=Array.from({length:t.channels},(l,c)=>o.slice(c*t.frames,(c+1)*t.frames));return this.memory.set(t.id,s),s}catch{return null}}async remove(t){this.memory.delete(t),await this.ready;const n=await this.folder();try{await n?.removeEntry(Wt(this.prefix,t))}catch{}}}function Ab(e,t){const n=e[0]?.length??0,a=e.length,r=n*a*4,o=new DataView(new ArrayBuffer(44+r)),s=(c,d)=>{for(let u=0;u<d.length;u++)o.setUint8(c+u,d.charCodeAt(u))};s(0,"RIFF"),o.setUint32(4,36+r,!0),s(8,"WAVE"),s(12,"fmt "),o.setUint32(16,16,!0),o.setUint16(20,3,!0),o.setUint16(22,a,!0),o.setUint32(24,t,!0),o.setUint32(28,t*a*4,!0),o.setUint16(32,a*4,!0),o.setUint16(34,32,!0),s(36,"data"),o.setUint32(40,r,!0);let l=44;for(let c=0;c<n;c++)for(let d=0;d<a;d++)o.setFloat32(l,e[d]?.[c]??0,!0),l+=4;return new Uint8Array(o.buffer)}const Qr="netcomposer.lucy",Ra=1;function Eb(e){const{roundTripMs:t,nudgeMs:n,...a}=Gn(JSON.parse(JSON.stringify(e)));return{format:Qr,v:Ra,...a,fx:Wr(a.fx)}}function Mb(e,t){const n=Sb(t);return{...n,roundTripMs:e.roundTripMs,nudgeMs:e.nudgeMs,nextId:Math.max(n.nextId,e.nextId)}}function Sb(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Not a LUCY preset: expected an object.");const t=e;if(t.format!==void 0&&t.format!==Qr)throw new Error(`Not a LUCY preset: format ${String(t.format)}.`);if(t.v!==void 0){if(typeof t.v!="number"||!Number.isInteger(t.v)||t.v<0)throw new Error("Not a LUCY preset: bad version.");if(t.v>Ra)throw new Error(`LUCY preset v${t.v} is newer than this LUCY (v${Ra}).`)}if(!Array.isArray(t.takes)||typeof t.bars!="number")throw new Error("Not a LUCY preset: no takes or length.");const n=Gn(t);return{...n,fx:Wr(n.fx)}}function Tb(e){return e.replace(/[\\/]/g,"~")}function Lb(e,t=Un()){const n=ys("lucy.state",t),a=ys("lucy",t),r=typeof e?.storageKey=="function"?e.storageKey.bind(e):null;return r?{state:r("lucy.state"),files:Tb(r("lucy")),legacyState:n,legacyFiles:a}:{state:n,files:a,legacyState:n,legacyFiles:a}}function Cb(e,t,n=!0){if(!n||!t||e.state===e.legacyState)return null;try{if(t.getItem(e.state)!==null)return null;const a=t.getItem(e.legacyState);let r={...tn,takes:[],lupa:qa(null)};if(a)try{r=Gn(JSON.parse(a))}catch{}return t.setItem(e.state,JSON.stringify(r)),a?r.takes.map(o=>o.id):null}catch{return null}}const Dn="http://www.w3.org/2000/svg";function Nb(e){const t=r=>`${Number.isInteger(r)?r:r.toFixed(1)} ms`,n=e.estimate?`the ${t(e.usedMs)} estimate`:t(e.usedMs),a=Math.abs(e.lateMs);return`Recorded with ${n}; this setup measures ${t(e.nowMs)}. It plays ${t(a)} ${e.lateMs>0?"late":"early"}.`}function N(e,t,n={},...a){const r=document.createElement(e);t&&(r.className=t);for(const[o,s]of Object.entries(n))r.setAttribute(o,s);return r.append(...a),r}function ne(e,t){e.textContent!==t&&(e.textContent=t)}function fe(e,t,n){n===null?e.hasAttribute(t)&&e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function Gt(e,t,n){fe(e,`data-${t}`,n?"true":null)}function js(){const e=document.createElementNS(Dn,"svg");e.setAttribute("class","lucy-wave-svg"),e.setAttribute("viewBox",`0 -1 ${Ya} 2`),e.setAttribute("preserveAspectRatio","none"),e.setAttribute("aria-hidden","true");const t=o=>{const s=document.createElementNS(Dn,"path");return s.setAttribute("class",o),e.append(s),s},n=t("lucy-wave-beats"),a=t("lucy-wave-bars"),r=t("lucy-wave-env");return{svg:e,beats:n,bars:a,env:r}}function Fb(){const e=document.createElementNS(Dn,"svg");e.setAttribute("class","lucy-take-play-icon"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");const t=document.createElementNS(Dn,"path");t.setAttribute("class","lucy-icon-play"),t.setAttribute("d","M7 5 L19 12 L7 19 Z");const n=document.createElementNS(Dn,"path");return n.setAttribute("class","lucy-icon-stop"),n.setAttribute("d","M6 6 H18 V18 H6 Z"),e.append(t,n),e}function Ai(e){return e.map(t=>`M${Math.round(t*Ya*100)/100} -1V1`).join("")}class Db{constructor(t){this.on=t,this.el=N("div","lucy-takes"),this.list=N("div","lucy-take-list",{role:"list"}),this.emptyLine=N("p","lucy-takes-empty"),q("takes:empty",this.emptyLine),this.el.append(this.emptyLine,this.list),document.addEventListener("pointerdown",n=>{this.openMenu&&!this.openMenu.root.querySelector(".lucy-take-more-wrap")?.contains(n.target)&&this.closeMenu()})}el;list;emptyLine;cards=new Map;live=null;openMenu=null;render(t){this.renderLive(t.live);const n=!t.takes.length&&!t.live;if(this.emptyLine.hidden=!n,n){ne(this.emptyLine,""),this.emptyLine.firstChild||this.emptyLine.append(N("span","lucy-takes-empty-line",{},"No takes yet. Record or load a WAV."),N("span","lucy-takes-empty-hint"));const o=this.emptyLine.querySelector(".lucy-takes-empty-hint");o&&ne(o,t.hint)}const a=new Set;let r=this.live?.root??null;for(const o of t.takes){a.add(o.id);let s=this.cards.get(o.id);s||(s=this.create(o),this.cards.set(o.id,s)),this.update(s,o,t),(r?r.nextElementSibling:this.list.firstElementChild)!==s.root&&(r?r.after(s.root):this.list.prepend(s.root)),r=s.root}for(const[o,s]of this.cards)a.has(o)||(this.openMenu===s&&(this.openMenu=null),s.root.remove(),this.cards.delete(o))}setPlayhead(t,n){for(const a of this.cards.values()){const r=a.id===t&&n>=0;if(r){const o=n.toFixed(4);a.wave.style.getPropertyValue("--lucy-at")!==o&&a.wave.style.setProperty("--lucy-at",o)}Gt(a.wave,"head",r)}}card(t){return this.cards.get(t)?.root}renderLive(t){if(!t){this.live?.root.remove(),this.live=null;return}if(!this.live){const o=N("span","lucy-take-live-label",{"aria-live":"polite"}),s=N("button","nc-page-action lucy-take-action",{type:"button"},"Cancel");s.addEventListener("click",()=>this.on.cancelRecording()),q("take:cancel",s,s);const{svg:l,bars:c,env:d}=js(),u=N("span","lucy-take-count",{"aria-hidden":"true",hidden:""}),h=N("div","lucy-take-wave",{"data-live":"true"},l,u),f=N("span","lucy-take-name lucy-take-name-live",{},"New take"),m=N("article","lucy-take",{"data-live":"true",role:"listitem","aria-label":"Recording"},N("div","lucy-take-hd",{},f,o,N("div","lucy-take-actions",{},s)),h);q("take:recording",o),this.list.prepend(m),this.live={root:m,label:o,count:u,env:d,bars:c,drawn:""}}ne(this.live.label,t.label);const n=t.count??null;this.live.count.hidden=n===null,ne(this.live.count,n===null?"":String(n));const a=t.bars.join(",");this.live.bars.dataset.key!==a&&(this.live.bars.dataset.key=a,this.live.bars.setAttribute("d",Ai(t.bars)));const r=t.peaks?`${t.filled}`:"";r!==this.live.drawn&&(this.live.drawn=r,this.live.env.setAttribute("d",t.peaks?ws(t.peaks,t.filled):"")),this.list.firstElementChild!==this.live.root&&this.list.prepend(this.live.root)}create(t){const n=t.id,a=N("h3","lucy-take-name",{tabindex:"0"}),r=N("span","lucy-take-region nc-readout"),o=(B,Q)=>{const Me=N("button","nc-page-action lucy-take-action",{type:"button","data-take-action":Q},B);return q(`take:${Q}`,Me,Me),Me},s=N("button","lucy-take-play",{type:"button","data-take-action":"play","aria-label":"Play","aria-pressed":"false"},Fb());q("take:play",s,s);const l=N("span","lucy-take-source");q("take:source",l);const c=N("span","lucy-take-source lucy-take-rights");q("take:rights",c);const d=o("Send to Sampler","send"),u=N("button","nc-page-action lucy-take-action lucy-take-more",{type:"button","aria-haspopup":"menu","aria-expanded":"false","aria-label":"More actions","data-take-action":"more"},"⋯");q("take:more",u,u);const h=N("button","lucy-take-menu-item",{type:"button",role:"menuitem","data-take-action":"download"},"Download WAV"),f=N("button","lucy-take-menu-item",{type:"button",role:"menuitem","data-take-action":"delete"},"Delete");q("take:download",h,h),q("take:delete",f,f);const m=N("div","lucy-take-menu",{role:"menu"},h,f);m.hidden=!0;const g=N("div","lucy-take-actions",{},d,N("span","lucy-take-more-wrap",{},u,m)),{svg:y,env:p}=js(),b=B=>{const Q=N("div","lucy-take-marker",{role:"slider",tabindex:"0","data-marker":B,"aria-orientation":"horizontal"});return q(`take:${B}`,Q,Q),Q},x={start:b("start"),end:b("end")},v=N("span","lucy-take-wave-empty"),S=N("div","lucy-take-barnums",{"aria-hidden":"true"}),$=N("div","lucy-take-wave",{role:"group"},S,y,N("div","lucy-take-dim",{"data-side":"start"}),N("div","lucy-take-dim",{"data-side":"end"}),N("div","lucy-take-playhead",{"aria-hidden":"true"},N("span","lucy-take-playhead-line")),x.start,x.end,v);$.style.setProperty("--lucy-at","-1"),q("take:wave",$);const w=B=>{const Q=N("span","lucy-take-fact",{"data-fact":B});return q(`take:fact:${B}`,Q),Q},k={bars:w("bars"),secs:w("secs"),bpm:w("bpm"),chans:w("chans"),rate:w("rate"),when:w("when")},E=N("span","lucy-take-snap-label",{id:`lucy-snap-${n}`},"Snap"),M=N("span","nc-choice-row lucy-take-snap",{role:"radiogroup","aria-labelledby":`lucy-snap-${n}`});for(const B of Kt){const Q=N("button","nc-choice lucy-take-snap-opt",{type:"button",role:"radio","data-snap":B,"aria-checked":"false",tabindex:"-1"},Zg[B]);Q.addEventListener("click",()=>this.on.setSnap(n,B)),M.append(Q)}M.addEventListener("keydown",B=>{const Q=B.key==="ArrowRight"||B.key==="ArrowDown"?1:B.key==="ArrowLeft"||B.key==="ArrowUp"?-1:0;if(!Q)return;B.preventDefault();const Me=Kt.indexOf(yn(Ee.meta)),Ue=Kt[(Me+Q+Kt.length)%Kt.length]??"beat";this.on.setSnap(n,Ue),M.querySelector(`[data-snap="${Ue}"]`)?.focus()}),q("take:snap",E,M);const C=N("span","lucy-take-snap-label",{id:`lucy-norm-${n}`},"Normalize"),z=Tr({checked:t.normalize?.on===!0,labelledBy:`lucy-norm-${n}`,onChange:B=>this.on.setNormalize(n,B)});z.el.classList.add("lucy-take-norm");const G=N("span","lucy-take-norm-gain");q("take:normalize",C,z.el),q("take:normalize-gain",G);const X=N("span","lucy-take-snap-label",{id:`lucy-timing-${n}`},"Timing"),ce=B=>{const Q=N("button","lucy-take-timing-step",{type:"button","aria-label":B<0?"Earlier":"Later","aria-describedby":`lucy-timing-${n}`},B<0?"◀":"▶");return Q.addEventListener("click",Me=>this.on.setShift(n,cb(Ee.meta.shiftMs??0,B,Me.shiftKey))),Q},Be=ce(-1),rt=ce(1),Ae=N("span","lucy-take-timing-value",{"aria-live":"polite"},"0 ms");Ae.addEventListener("dblclick",()=>this.on.setShift(n,0)),q("take:timing",X,Be,rt,Ae);const R=N("span","lucy-take-timing-text"),It=N("button","lucy-take-timing-match",{type:"button"},"Match calibration");It.addEventListener("click",()=>this.on.matchTiming(n));const fn=N("button","lucy-take-timing-quiet",{type:"button"},"Not now");fn.addEventListener("click",()=>this.on.dismissTiming(n));const Pt=N("button","lucy-take-timing-quiet",{type:"button"},"Undo");Pt.addEventListener("click",()=>this.on.undoTiming(n));const Ot=N("div","lucy-take-timing-note",{role:"status"},R,N("span","lucy-take-timing-actions",{},It,fn,Pt));Ot.hidden=!0;const jd=N("div","lucy-take-facts nc-readout",{},...Object.values(k),N("span","lucy-take-norm-wrap",{},C,z.el,G),N("span","lucy-take-timing",{},X,Be,Ae,rt),N("span","lucy-take-snap-wrap",{},E,M)),ei=N("div","lucy-take-picker");ei.hidden=!0;const ti=N("p","lucy-take-note",{"aria-live":"polite"});ti.hidden=!0;const ni=N("article","lucy-take",{role:"listitem","data-take":String(n)},N("div","lucy-take-hd",{},s,N("div","lucy-take-title",{},a,l,c,r),g),$,jd,Ot,ei,ti);q("take:card",null,ni),q("take:name",a),q("take:region",r);const Ee={id:n,root:ni,name:a,region:r,play:s,sourcePill:l,rightsPill:c,barNums:S,send:d,more:u,menu:m,download:h,remove:f,wave:$,env:p,empty:v,markers:x,facts:k,snap:M,normalize:z,normGain:G,timing:{earlier:Be,value:Ae,later:rt},timingNote:{root:Ot,text:R,match:It,notNow:fn,undo:Pt},picker:ei,note:ti,drawn:"none",gridKey:"",meta:t,draft:null,editing:!1};ni.addEventListener("click",B=>{B.target.closest("button, select, input, label, [role=slider], .lucy-take-picker")||this.on.select(n)}),s.addEventListener("click",()=>this.on.play(n)),s.addEventListener("pointerdown",()=>this.on.preload?.(n)),d.addEventListener("click",()=>this.on.openSend(n)),u.addEventListener("click",()=>this.openMenu===Ee?this.closeMenu():this.showMenu(Ee)),m.addEventListener("keydown",B=>{B.key==="Escape"&&(this.closeMenu(),u.focus())}),h.addEventListener("click",()=>{this.closeMenu(),this.on.download(n)}),f.addEventListener("click",()=>{this.closeMenu(),this.on.remove(n)});const ho=()=>{if(Ee.editing)return;Ee.editing=!0;const B=N("input","lucy-take-rename",{type:"text",maxlength:"40","aria-label":`Rename ${Ne(Ee.meta)}`,value:Ne(Ee.meta)});a.replaceWith(B),B.focus(),B.select();let Q=!1;const Me=Ue=>{Q||(Q=!0,Ee.editing=!1,B.replaceWith(a),Ue&&this.on.rename(n,B.value),a.focus())};B.addEventListener("keydown",Ue=>{Ue.key==="Enter"?(Ue.preventDefault(),Me(!0)):Ue.key==="Escape"&&(Ue.preventDefault(),Me(!1))}),B.addEventListener("blur",()=>Me(!0))};a.addEventListener("dblclick",ho),a.addEventListener("keydown",B=>{(B.key==="Enter"||B.key==="F2")&&(B.preventDefault(),ho())});for(const B of["start","end"])this.bindMarker(Ee,B);return Ee}showMenu(t){this.closeMenu(),this.openMenu=t,t.menu.hidden=!1,t.more.setAttribute("aria-expanded","true"),t.menu.querySelector("button:not(:disabled)")?.focus()}closeMenu(){const t=this.openMenu;t&&(this.openMenu=null,t.menu.hidden=!0,t.more.setAttribute("aria-expanded","false"))}bindMarker(t,n){const a=t.markers[n],r=()=>({...t.meta,region:t.draft??t.meta.region}),o=l=>{const c=t.wave.getBoundingClientRect();return(l-c.left)/Math.max(1,c.width)*t.meta.frames},s=(l,c)=>{t.draft=c?null:l,this.paintRegion(t,l),this.on.setRegion(t.id,l,c)};a.addEventListener("pointerdown",l=>{if(l.button!==0)return;l.preventDefault(),a.setPointerCapture(l.pointerId),a.focus(),t.root.dataset.dragging="true";let c=null;const d=h=>{const f=r(),m=o(h.clientX),g=h.altKey?m:tb(f,m,yn(f));c=En(f,n,g),s(c,!1)},u=h=>{a.removeEventListener("pointermove",d),a.removeEventListener("pointerup",u),a.removeEventListener("pointercancel",u),t.root.removeAttribute("data-dragging");try{a.releasePointerCapture(h.pointerId)}catch{}c&&s(c,!0)};a.addEventListener("pointermove",d),a.addEventListener("pointerup",u),a.addEventListener("pointercancel",u)}),a.addEventListener("dblclick",()=>{const l=r();s(En(l,n,n==="start"?0:l.frames),!0)}),a.addEventListener("keydown",l=>{const c=r();let d=null;l.key==="ArrowLeft"||l.key==="ArrowDown"?d=Is(c,n,-1,yn(c),l.shiftKey):l.key==="ArrowRight"||l.key==="ArrowUp"?d=Is(c,n,1,yn(c),l.shiftKey):l.key==="Home"?d=En(c,n,0):l.key==="End"&&(d=En(c,n,c.frames)),d&&(l.preventDefault(),s(d,!0))})}paintRegion(t,n){const a={...t.meta,region:n},r=Math.max(1,a.frames);t.wave.style.setProperty("--lucy-start",(n.start/r).toFixed(5)),t.wave.style.setProperty("--lucy-end",(n.end/r).toFixed(5)),ne(t.region,ib(a,n).replace(/(?<![·→]) (?![·→])/g," "));const o=s=>(s/a.sampleRate).toFixed(2);for(const s of["start","end"]){const l=t.markers[s],c=n[s];fe(l,"aria-label",`${s==="start"?"Start":"End"} of ${Ne(a)}`),fe(l,"aria-valuemin","0"),fe(l,"aria-valuemax",o(a.frames)),fe(l,"aria-valuenow",o(c)),fe(l,"aria-valuetext",rb(a,s,c))}}update(t,n,a){t.meta=n;const r=n.id,o=Ne(n);t.editing||ne(t.name,o),fe(t.root,"aria-label",o);const s=a.selected===r,l=a.playing===r;Gt(t.root,"selected",s),Gt(t.root,"playing",l),fe(t.root,"aria-current",s?"true":null),fe(t.play,"aria-label",`${l?"Stop":"Play"} ${o}`),fe(t.play,"aria-pressed",l?"true":"false");const c=a.peaks(r),d=c===null;Gt(t.root,"missing",d),Gt(t.root,"loading",c===void 0),t.drawn!==c&&(t.drawn=c,t.env.setAttribute("d",c?ws(c):"")),ne(t.empty,d?"Not in this browser":""),fe(t.wave,"aria-label",d?`${o}: audio not in this browser`:`${o}: waveform`);const u=`${n.bpm}:${n.sampleRate}:${n.frames}`;if(t.gridKey!==u){t.gridKey=u;const x=sb(n),v=t.wave.querySelector(".lucy-wave-beats"),S=t.wave.querySelector(".lucy-wave-bars");v?.setAttribute("d",Ai(x.beats)),S?.setAttribute("d",Ai(x.bars)),t.barNums.replaceChildren(...[0,...x.bars].map(($,w)=>{const k=N("span","lucy-take-barnum",{},String(w+1));return k.style.setProperty("--lucy-x",$.toFixed(5)),k}))}for(const x of Object.values(t.markers))x.hidden=d;t.draft||this.paintRegion(t,at(n));const h=n.frames/n.sampleRate;ne(t.sourcePill,hb[Xr(n)]),ne(t.rightsPill,ad(n)?"Unknown rights":""),ne(t.facts.bars,`${n.bars} bar${n.bars===1?"":"s"}`),ne(t.facts.secs,`${h.toFixed(1)} s`),ne(t.facts.bpm,`${Math.round(n.bpm*10)/10} BPM`),ne(t.facts.chans,n.channels===2?"Stereo":"Mono"),ne(t.facts.rate,`${Math.round(n.sampleRate/100)/10} kHz`),ne(t.facts.when,Tg(n.created,a.now)),fe(t.facts.when,"title",Lg(n.created)||null);const f=yn(n);for(const x of t.snap.querySelectorAll("[data-snap]")){const v=x.dataset.snap===f;fe(x,"aria-checked",v?"true":"false"),fe(x,"tabindex",v?"0":"-1"),x.disabled=d}const m=n.normalize;t.normalize.checked!==(m?.on===!0)&&t.normalize.set(m?.on===!0),t.normalize.el.disabled=d,ne(t.normGain,m?.on?Sg(m.gainDb):""),Gt(t.root,"normalized",m?.on===!0);const g=n.shiftMs??0;ne(t.timing.value,nd(g)),fe(t.timing.value,"data-moved",g?"":null),fe(t.timing.value,"title",g?"Double-click: back to 0 ms":null),t.timing.earlier.disabled=d||g<=-dn,t.timing.later.disabled=d||g>=dn;const y=a.timingDone?.take===r?a.timingDone.text:"",p=y?null:a.timing(n);t.timingNote.root.hidden=!y&&!p,t.timingNote.match.hidden=!p,t.timingNote.notNow.hidden=!p,t.timingNote.undo.hidden=!y,ne(t.timingNote.text,y||(p?Nb(p):"")),t.send.hidden=!a.canSend,ne(t.send,`Send to ${a.sendName}`),t.send.disabled=d,t.download.disabled=d,t.play.disabled=d,this.renderPicker(t,a);const b=a.sendNote?.take===r?a.sendNote.text:"";t.note.hidden=!b,ne(t.note,b)}renderPicker(t,n){const a=n.picker?.take===t.id&&n.canSend?n.picker:null;if(t.picker.hidden=!a,t.send.hidden=t.send.hidden||!!a,!a){t.picker.firstChild&&t.picker.replaceChildren();return}const r=a.receivers.find(u=>u.instance===a.to)??a.receivers[0],o=JSON.stringify([a.receivers.map(u=>[u.instance,u.targets.map(h=>h.id)]),a.to]);if(t.picker.dataset.key!==o){t.picker.dataset.key=o,t.picker.replaceChildren();const u=(p,b,x,v,S)=>{const $=`lucy-${p}-${t.id}`,w=N("select","nc-select lucy-take-pick",{id:$,"data-pick":p});for(const E of v)w.append(N("option","",{value:E.value},E.label));w.addEventListener("change",()=>S(w.value));const k=N("label","lucy-take-snap-label",{for:$},b);q(x,k,w),t.picker.append(N("span","lucy-take-pick-wrap",{},k,w))};a.receivers.length>1&&u("send-to","Sampler","send-to",a.receivers.map(p=>({value:p.instance,label:p.name})),p=>this.on.pickTo(p)),u("send-pad",r?.label??"Pad","send-pad",(r?.targets??[]).map(p=>({value:p.id,label:p.name})),p=>this.on.pickTarget(p));const h=`lucy-send-name-${t.id}`,f=N("input","lucy-take-pick-name",{id:h,type:"text","data-pick":"send-name",placeholder:a.defaultName,maxlength:"60",autocomplete:"off",spellcheck:"false"});f.addEventListener("input",()=>this.on.pickName(f.value)),f.addEventListener("keydown",p=>{p.key==="Enter"?(p.preventDefault(),this.on.send()):p.key==="Escape"&&(p.preventDefault(),this.on.cancelSend())});const m=N("label","lucy-take-snap-label",{for:h},"Name");q("send-name",m,f),t.picker.append(N("span","lucy-take-pick-wrap",{},m,f));const g=N("button","nc-page-action lucy-take-action",{type:"button","data-take-action":"send-go"},"Send");g.addEventListener("click",()=>this.on.send()),q("send-go",g,g);const y=N("button","nc-page-action lucy-take-action",{type:"button","data-take-action":"send-cancel"},"Cancel");y.addEventListener("click",()=>this.on.cancelSend()),q("send-cancel",y,y),t.picker.append(g,y)}const s=t.picker.querySelector('[data-pick="send-to"]');s&&s.value!==a.to&&(s.value=a.to);const l=t.picker.querySelector('[data-pick="send-pad"]');l&&l.value!==a.target&&(l.value=a.target);const c=t.picker.querySelector('[data-pick="send-name"]');c&&(c.value!==a.name&&document.activeElement!==c&&(c.value=a.name),c.placeholder=a.defaultName,c.disabled=a.sending);const d=t.picker.querySelector('[data-take-action="send-go"]');d&&(ne(d,a.sending?"Sending…":"Send"),d.disabled=a.sending)}}const Jr={knee:.6,ceiling:.944,range:4,points:8193};function zb(e,{knee:t,ceiling:n}=Jr){const a=Math.abs(e);if(a<=t)return e;const r=n-t;return Math.sign(e)*(t+r*Math.tanh((a-t)/r))}function Bb({range:e,points:t}=Jr){const n=new Float32Array(t);for(let a=0;a<t;a++)n[a]=zb((2*a/(t-1)-1)*e);return n}function qb(e){const t=e.createGain();t.gain.value=1/Jr.range;const n=e.createWaveShaper();return n.curve=Bb(),n.oversample="none",t.connect(n),{input:t,output:n}}const Rb="LUCY Audio",et="lucy",ve=Un(),Zr=.15,V=cg(et,ve),Vn=Lb(V,ve),Hs=Cb(Vn,Ib(),V?.legacyCopy!==!1),ld=Vn.state,A=bb(gb(ld)),it=new sd(Vn.files);Hs&&it.adopt(Vn.legacyFiles,Hs);const U=()=>{vb(ld,A),od(A)},Us=new sd(`${Vn.files}-lupa`),K=new $i({state:()=>A.lupa,save:U,sampleRate:()=>T?.sampleRate??48e3,now:()=>T?.currentTime??0,timeAt:e=>nt(_().timeAt(e)),beatSeconds:()=>Nt(_().bpm),roundTrip:()=>Qa(),micOpen:()=>!!se&&!!ee,openMic:async()=>{de()!=="mic"&&Kn("mic");const e=await _e();return e&&un(),e},inputChannels:()=>Yn,record:e=>ee?.port.postMessage({type:"record",queue:!0,...e}),cancel:e=>ee?.port.postMessage({type:"cancel",id:e}),storeVoice:(e,t)=>Us.save(e,t),loadVoice:async e=>{if(!await ke()||!T)return null;const t=await Us.load({id:e.id,channels:e.channels,frames:e.frames});if(!t?.length)return null;const n=new AudioBuffer({length:e.frames,numberOfChannels:t.length,sampleRate:e.sampleRate});return t.forEach((a,r)=>n.copyToChannel(a,r)),n},play:(e,t,n,a,r)=>{const o=T;if(!o||!j)return{stop:()=>{}};const s=new GainNode(o,{gain:r}),l=new AudioBufferSourceNode(o,{buffer:e});return l.connect(s).connect(j.input),l.start(t,n,a),l.onended=()=>s.disconnect(),{stop:c=>{const d=Math.max(o.currentTime,c??o.currentTime);s.gain.setTargetAtTime(0,d,$i.fadeSeconds/3);try{l.stop(d+$i.fadeSeconds*3)}catch{}}}},report:e=>V?.notesOut?.(e)??!1,beatNow:()=>_().running?_().beatAt(le()):null,changed:()=>F()});Gg(V,e=>K.message(e));it.highestOnDisk().then(e=>{e<A.nextId||(A.nextId=e+1,U())});function Ib(){try{return globalThis.localStorage??null}catch{return null}}let xe=!1,D={kind:"idle"},nn=!1,O="",Je=0,ma=0;const tt=new Xd({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let T=null,an=null;const Pb=new su({...dg(),app:lg(Rb,ve),version:"0.1.0",clock:tt,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const e=T?.state;return e==="running"?"running":e==="suspended"?"suspended":e?"none":"needs-gesture"},startGate:()=>an?.whenSettled?.()??null}),nt=e=>e+(an?.offset??0),_=()=>tt.transport,Dt=()=>_().running,cd=()=>!!V&&typeof Gr()?.record=="function",eo=()=>typeof navigator.mediaDevices?.getDisplayMedia=="function",de=()=>A.source==="master"&&cd()?"master":A.source==="computer"&&eo()?"computer":"mic",vt=()=>Dt()&&!xe;let Xe=null,ee=null,wt=null,j=null,Ia=null,se=null,hr=null,St="",ge=[],pe=null,Yn=1,dd=!1,Pa=null;function ke(){return Pa??=(async()=>{V?(T=V.ctx,Xe=V.output,an=V.mapper??new go(V.ctx)):(T=new AudioContext({latencyHint:"interactive"}),Xe=T.destination,an=new go(T)),an.start();const e=T;e.addEventListener("statechange",()=>{to&&e.state!=="running"&&document.visibilityState==="visible"&&e.resume().catch(()=>{})});try{await T.audioWorklet.addModule(Om)}catch{return O="Audio could not start (the recorder's worklet did not load). Reload to try again.",F(),!1}ee=new AudioWorkletNode(T,"lucy-capture",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[1],channelCount:2,channelCountMode:"explicit"}),ee.port.onmessage=a=>jb(a.data);const t=new GainNode(T,{gain:0});ee.connect(t).connect(Xe),j=dp(T,{moduleUrl:ug()??hp,bpm:_().bpm,slots:Qt.length,state:Wr(A.fx)}),Ia=new GainNode(T,{gain:A.master});const n=qb(T);return j.output.connect(Ia).connect(n.input),n.output.connect(Xe),pp(j,tt,{toAudioTime:nt,now:le}),j.onChange(()=>{A.fx=j?.getState(),U()}),wt=new GainNode(T,{gain:0}),wt.connect(j.input),kt(A.monitor),!0})(),Pa}let to=!1;function ud(){to=!0,ke().then(e=>{e&&T&&T.state!=="running"&&T.resume().catch(()=>{})})}for(const e of["pointerdown","touchstart","keydown"])addEventListener(e,ud,{capture:!0,passive:!0});document.addEventListener("visibilitychange",()=>{to&&document.visibilityState==="visible"&&ud()});const Ei={echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1,channelCount:{ideal:2,min:1}};async function _e(){if(se)return!0;if(!await ke()||!T||!ee||!wt)return!1;T.state!=="running"&&await T.resume().catch(()=>{});const e=A.input;let t=null,n=!1;try{if(e)try{t=await navigator.mediaDevices.getUserMedia({audio:{...Ei,deviceId:{exact:e.id}}})}catch(o){if(o?.name==="NotAllowedError")throw o;n=!0}if(t??=await navigator.mediaDevices.getUserMedia({audio:{...Ei}}),n&&e){await mr();const o=ge.find(s=>s.label===e.label);if(o)try{const s=await navigator.mediaDevices.getUserMedia({audio:{...Ei,deviceId:{exact:o.id}}});for(const l of t.getTracks())l.stop();t=s,A.input={...o},U(),n=!1}catch{}}}catch{return O="No mic: allow the microphone for this site (and, in the Studio, for the page), then try again.",F(),!1}const r=t.getAudioTracks()[0]?.getSettings()??{};return Yn=Math.max(1,Math.min(2,r.channelCount??1)),dd=!!(r.echoCancellation||r.noiseSuppression||r.autoGainControl),hr=t,St=r.deviceId??"",se=T.createMediaStreamSource(t),se.connect(wt),un(),O=n&&e?"Not connected: using the default.":"",await mr(),F(),!0}function fr(){if(se){try{se.disconnect()}catch{}for(const e of hr?.getTracks()??[])e.stop();se=null,hr=null,St=""}}async function mr(){try{ge=(await navigator.mediaDevices?.enumerateDevices?.()??[]).filter(t=>t.kind==="audioinput"&&t.deviceId&&t.deviceId!=="default"&&t.label).map(t=>({id:t.deviceId,label:t.label.replace(/\s+/g," ").trim().slice(0,80)}))}catch{ge=[]}}async function Ob(e){const t=ge.find(n=>n.id===e);A.input=t?{...t}:null,U(),D.kind!=="idle"&&de()==="mic"&&hn(!1),se?(fr(),await _e()):F()}navigator.mediaDevices?.addEventListener?.("devicechange",()=>{(async()=>{await mr();const e=A.input,t=!!St&&ge.some(n=>n.id===St);se&&ge.length&&!t?(ge.find(n=>n.id===St)?.label??e?.label,fr(),await _e(),O="Unplugged: using the default."):se&&e&&St!==e.id&&ge.some(n=>n.id===e.id)&&(fr(),await _e()),F()})()});async function pd(){if(!eo()||!await ke()||!T||!ee)return;T.state!=="running"&&await T.resume().catch(()=>{});let e;try{e=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1,suppressLocalAudioPlayback:!1},systemAudio:"include",selfBrowserSurface:"exclude",surfaceSwitching:"include",preferCurrentTab:!1})}catch(l){O=l?.name==="NotAllowedError"?"Nothing shared.":"Can't share a tab or screen here.",F();return}const t=e.getVideoTracks()[0],n=(t?.getSettings?.()??{}).displaySurface,a=t?.label??"";for(const l of e.getVideoTracks())l.stop(),e.removeTrack(l);const r=e.getAudioTracks()[0];if(!r){O=n==="browser"?"No sound: tick Share tab audio.":"No sound: tick Share system audio.",F();return}Oa(!1);const o=r.getSettings()??{},s=_b(n,a);pe={node:T.createMediaStreamSource(e),stream:e,label:s,channels:Math.max(1,Math.min(2,o.channelCount??2))},r.addEventListener("ended",()=>{pe?.stream===e&&(Oa(!1),O="Sharing ended.",F())}),A.source!=="computer"&&Kn("computer"),un(),O="",F()}function _b(e,t){const n=t.replace(/^(web-contents-media-stream|window|screen):\/\/.*$/i,"").trim();return e==="monitor"?"Entire screen":e==="window"?n?`Window · ${n}`:"A window":e==="browser"?n?`Tab · ${n}`:"A tab":n||"Computer audio"}function Oa(e=!0){if(pe){e&&D.kind!=="idle"&&de()==="computer"&&hn(!1);try{pe.node.disconnect()}catch{}for(const t of pe.stream.getTracks())t.stop();pe=null}}function un(){if(!ee)return;for(const t of[se,pe?.node])try{t?.disconnect(ee)}catch{}(de()==="computer"?pe?.node:de()==="mic"?se:null)?.connect(ee),Je=0}function kt(e){A.monitor=e,U(),wt&&T&&wt.gain.setTargetAtTime(e&&!nn&&de()==="mic"?1:0,T.currentTime,.01),ma=0,F()}let Ke=null,zn=null;function jb(e){if(e.type!=="level"&&K.owns(e.id)){K.capture(e);return}if(e.type==="level"&&typeof e.peak=="number"){Je=e.peak,K.level(e.peak);const t=performance.now();A.monitor&&se&&Je>.97?(ma||=t,t-ma>1500&&(kt(!1),O="Monitor off: the input was feeding back. Use headphones, then turn Monitor on again.")):ma=0,_0();return}if(e.type==="chunk"&&e.id!==void 0&&e.channels){(!Ke||Ke.id!==e.id)&&(Ke={id:e.id,parts:[]}),Ke.parts.push(e.channels),ae?.id===e.id&&(ae.builder.add(e.channels),Jn());return}if(e.type==="done"&&e.id!==void 0){const t=Ke?.id===e.id?Ke.parts:[];Ke=null;const n=Hb(t);if(zn&&e.id===kd){zn(n),zn=null;return}Qb(e.id,n)}}function Hb(e){const t=e[0]?.length??0,n=e.reduce((a,r)=>a+(r[0]?.length??0),0);return Array.from({length:t},(a,r)=>{const o=new Float32Array(n);let s=0;for(const l of e){const c=l[r];c&&(o.set(c,s),s+=c.length)}return o})}function Ub(){const e=T;return mt(((e?.baseLatency??0)+(e?.outputLatency??0)+.01)*1e3)}function hd(e){return pb(e,{roundTripMs:A.roundTripMs,nudgeMs:A.nudgeMs,estimateMs:Ub()})}let Fe=null;const Wb=8e3;async function no(e,t){const n=A.takes.find(r=>r.id===e);if(!n)return;const a=Kr(t);if((n.shiftMs??0)!==a){if(n.shiftMs=a||void 0,U(),Te.delete(e),He.delete(e),re?.id===e){const r=await io(n);re?.id===e&&r&&(n.shiftMs??0)===a&&(re={id:e,audio:r},xt(!0))}F()}}function Gb(e){const t=A.takes.find(o=>o.id===e),n=t&&hd(t);if(!t||!n)return;const a=t.shiftMs??0;Fe&&window.clearTimeout(Fe.timer);const r=mt(n.matchMs-a);Fe={take:e,before:a,text:`Shifted ${nd(r).replace(/^[−+]/,"")} ${r<0?"earlier":"later"} to match this setup.`,timer:window.setTimeout(()=>{Fe=null,F()},Wb)},no(e,n.matchMs)}function Vb(e){if(Fe?.take!==e)return;const t=Fe.before;window.clearTimeout(Fe.timer),Fe=null,no(e,t)}function Yb(e){const t=A.takes.find(n=>n.id===e);t&&(t.timingNoteOff=!0,U(),F())}function Qa(){const e=A.nudgeMs/1e3;if(A.roundTripMs!==null)return A.roundTripMs/1e3+e;const t=T;return(t?.baseLatency??0)+(t?.outputLatency??0)+.01+e}async function Kb(e,t){const n=performance.now()+t;for(;!e();){if(performance.now()>n)return!1;await new Promise(a=>setTimeout(a,20))}return!0}function Rt(){return K.busy||D.kind==="idle"&&!te.busy&&K.jammingNow()}async function Xb(){if(K.busy){K.cancel();return}K.voice.kind!=="saving"&&(de()!=="mic"&&(Kn("mic"),O="A voice pass records from Input."),!(!await _e()||!ee)&&(un(),K.ask()||(O="Lupa isn't playing now. Press Record again."),F()))}async function fd(){if(Rt()){await Xb();return}if(K.clear(),de()==="master"||te.busy){await n0();return}if(D.kind!=="idle"){ee?.port.postMessage({type:"cancel",id:D.id}),D={kind:"idle"},Ke=null,ae=null,zt(),F();return}const e=de()==="computer"?"computer":"mic";if(e==="computer"){if(!pe){O="Choose a tab or screen first.",F();return}if(!await ke()||!T||!ee)return}else if(!await _e()||!T||!ee)return;un();const t=!_().running;if(_().running||(V&&Ft()?.claim(bt(et,ve)),tt.play({at:le()})),xe=!1,!await Kb(()=>_().running,2e3)){O="The clock did not start.",F();return}const n=_(),a=Zr/Nt(n.bpm),r=Math.max(0,n.beatAt(le())),o=A.countIn?Ic(r,t,A.countIn,a):null,s=o?o.startBeat:_m(r,A.bars,a).startBeat,l=s+A.bars*H,c=nt(n.timeAt(s)),d=nt(n.timeAt(l)),u=e==="computer"?0:Qa();ga=e==="mic"?{ms:mt(u*1e3),estimate:A.roundTripMs===null}:null;const{startFrame:h,endFrame:f}=jm(c,d,u,T.sampleRate),m=A.nextId++;U();const g=e==="computer"?pe?.channels??2:Yn;ee.port.postMessage({type:"record",id:m,startFrame:h,endFrame:f,channels:g}),D={kind:"armed",id:m,from:e,startBeat:s,endBeat:l,...o?{countBeat:o.countBeat}:{}},ae={id:m,source:e,bars:A.bars,builder:new za(f-h)},O="",zt(),F()}let ga=null;async function Qb(e,t){if(D.kind==="idle"||D.id!==e||!T)return;const n=D.from;D={kind:"idle"},zt(),ae?.id===e&&(ae=null);const a=t[0]?.length??0;if(a===0){O="Nothing was recorded.",F();return}const r={id:e,bars:A.bars,bpm:_().bpm,sampleRate:T.sampleRate,channels:t.length,frames:a,created:new Date().toISOString(),saved:!1,source:n,normalize:{on:!0,gainDb:cn(t,T.sampleRate)}};n==="mic"&&ga&&(r.tripMs=ga.ms,ga.estimate&&(r.tripEstimate=!0)),He.set(e,Ka(t)),r.saved=await it.save(e,t),r.saved||(O="This take is kept until you reload: this browser has no file storage here."),A.takes.push(r),A.selected=e,U(),await je(e)}const te=new yg({grab:Gr,running:()=>_().running,beatNow:()=>_().beatAt(le()),bpm:()=>_().bpm,contextTime:e=>nt(_().timeAt(e)),sampleRate:()=>T?.sampleRate??48e3,leadBeats:()=>Zr/Nt(_().bpm),bars:()=>A.bars,countIn:()=>A.countIn,now:()=>T?.currentTime??0,nextId:()=>{const e=A.nextId++;return U(),e},after:(e,t)=>{const n=setTimeout(t,e);return()=>clearTimeout(n)},done:e=>void a0(e),failed:e=>{O=t0[e],ae=null,F()},changed:()=>{zt(),F()}});let De=null;function md(){const e=te.phase;return e.kind==="recording"&&e.countBeat<e.startBeat?e:D.kind!=="idle"&&D.countBeat!==void 0&&D.countBeat<D.startBeat?{id:D.id,countBeat:D.countBeat,startBeat:D.startBeat}:null}function zt(){Zb();const e=md();if(e&&De?.id===e.id||(ao(),!e||!T))return;const t=s=>nt(_().timeAt(s)),n=t(e.startBeat),a=Jm(e.countBeat,e.startBeat,t,T.currentTime,n),r=Km(A.cue)?a:[];De={id:e.id,clicks:r.map(e0),times:r.map(s=>s.time),badge:!1};const o=Oc();if(o&&Ur(A.cue)){const s=Array.from({length:e.startBeat-e.countBeat},(l,c)=>e.countBeat+c);o.show(bt(et,ve),{beats:s.map(t),accents:s.map(l=>l%H===0),until:n}),De.badge=!0}}let Mn=null,sa=[];function Jb(){const e=te.phase;return e.kind==="recording"?{id:e.id,startBeat:e.startBeat,endBeat:e.startBeat+e.bars*H}:D.kind!=="idle"?{id:D.id,startBeat:D.startBeat,endBeat:D.endBeat}:null}function Zb(){const e=V?.metronome,t=A.click&&e?Jb():null;if(t&&Mn===t.id)return;for(const r of sa)clearTimeout(r);if(sa=[],Mn!==null&&e?.want(!1),Mn=null,!t||!e)return;Mn=t.id;const n=_(),a=r=>Math.max(0,(n.timeAt(r)-le())*1e3);sa.push(setTimeout(()=>e.want(!0),a(t.startBeat-.5))),sa.push(setTimeout(()=>e.want(!1),a(t.endBeat)+50))}function ao(){if(De){for(const e of De.clicks)try{e.stop()}catch{}De.badge&&Oc()?.clear(bt(et,ve)),De=null}}const Ws={accent:.25,beat:.14};function e0(e){const t=T,n=new OscillatorNode(t,{frequency:e.accent?1760:1175}),a=new GainNode(t,{gain:0}),r=e.accent?Ws.accent:Ws.beat;return a.gain.setValueAtTime(0,e.time),a.gain.linearRampToValueAtTime(r,e.time+.002),a.gain.exponentialRampToValueAtTime(5e-4,e.time+ha-.002),a.gain.linearRampToValueAtTime(0,e.time+ha),n.connect(a).connect(t.destination),n.start(e.time),n.stop(e.time+ha),n.onended=()=>a.disconnect(),n}addEventListener("pagehide",()=>{ao(),Mn!==null&&V?.metronome?.want(!1)});function Bt(){const e=md();return e?Qm(_().beatAt(le()),e.countBeat,e.startBeat):null}const t0={cancelled:"",stopped:"Music stopped: no take.",unavailable:"Reload the Studio to record its Master.",empty:"The Master take came back empty.",timeout:"Master take timed out: no take."};async function n0(){if(te.busy){te.cancel(),ae=null,O="",F();return}!await ke()||!T||(O="",te.arm())}async function a0(e){if(!T)return;if(vg(e.channels)<1e-4){O="The Master was silent: no take.",F();return}const t=e.channels.map(a=>new Float32Array(a)),n={id:e.id,bars:e.bars,bpm:e.bpm,sampleRate:T.sampleRate,channels:t.length,frames:t[0]?.length??0,created:new Date().toISOString(),saved:!1,name:`Master ${e.id}`,source:"master",normalize:{on:!0,gainDb:cn(t,T.sampleRate)}};ae?.id===e.id&&(ae=null),He.set(e.id,Ka(t)),n.saved=await it.save(e.id,t),O=n.saved?"":"This take is kept until you reload: this browser has no file storage here.",A.takes.push(n),A.selected=e.id,Xn(),U(),await je(e.id)}function i0(e){A.cue=e,U(),ao(),zt(),F()}function Kn(e){hn(!1),e!=="mic"&&K.cancel(),A.source=e,O="",U(),kt(A.monitor),un(),e==="mic"&&!se&&ge.length&&_e(),F()}function pn(){try{return V?.sendAudio?V.audioReceivers?.()??[]:[]}catch{return[]}}let Z=null,Bn=!1,qt=null;function gd(e){return(e?.targets.find(t=>!t.filled)??e?.targets[0])?.id??""}function bd(e=A.selected){const t=pn()[0];!t||e===null||!A.takes.some(n=>n.id===e)||(Z={take:e,to:t.instance,target:gd(t)},qt=null,F())}function Xn(){Z=null}async function yd(){const e=Z,t=A.takes.find(l=>l.id===e?.take);if(!e||!t||!V?.sendAudio||Bn)return;const n=await Qn(t),a=pn().find(l=>l.instance===e.to),r=a?.name??"Sampler",o=`${a?.label??"Pad"} ${e.target}`;if(!n){qt={take:t.id,text:`${Ne(t)} could not be read.`},F();return}Bn=!0,F();let s;try{s=await V.sendAudio(e.to,{...kb(t,n),name:wb(e.name,t)},e.target)}catch(l){s={ok:!1,reason:"error",message:l instanceof Error?l.message:String(l)}}Bn=!1,Z=null,qt={take:t.id,text:s.ok?`Sent to ${r} · ${o}`:s.reason==="cancelled"?`Not sent: ${o} kept.`:`Not sent: ${s.message??s.reason}`},F()}let re=null;const Te=new Map,r0=4;async function Qn(e){const t=await it.load(e);return t&&e.shiftMs?ub(t,e.shiftMs,e.sampleRate):t}function io(e){const t=Te.get(e.id);if(t)return Te.delete(e.id),Te.set(e.id,t),t;const n=T,a=(async()=>{const r=await Qn(e);if(!r||!n)return null;const o=new AudioBuffer({length:e.frames,numberOfChannels:e.channels,sampleRate:e.sampleRate});return r.forEach((s,l)=>o.copyToChannel(s,l)),o})();for(Te.set(e.id,a),a.then(r=>{!r&&Te.get(e.id)===a&&Te.delete(e.id)});Te.size>r0;){const r=Te.keys().next().value;if(r===void 0||r===re?.id)break;Te.delete(r)}return a}function o0(e){const t=A.takes.find(n=>n.id===e);t&&ke().then(n=>{n&&io(t)})}let On=null,dt=null,Oe=null;async function je(e){e!==A.selected&&Xn(),A.selected=e,U();const t=A.takes.find(a=>a.id===e);if(!t||!T){re=null,xt(!0),F();return}const n=await io(t);A.selected===e&&(n?re={id:t.id,audio:n}:(O=`Take ${t.id} could not be read.`,re=null),xt(!0),F())}function gr(e){if(Oe){try{Oe.node.stop(e??0)}catch{}Oe=null}}let Lt=null,br=null;function xt(e=!1){const t=A.takes.find(x=>x.id===re?.id);if(!T||!Xe||!re||!t||!vt()){const x=_().stopTime;gr(x!==null&&T?Math.max(nt(x),T.currentTime):void 0),Lt=null,br=null;return}const n=_(),a=at(t),r=Zr/Nt(n.bpm),o=n.beatAt(le());On===t.id&&(On=null,dt={id:t.id,beat:Os(o,H,r).startBeat}),dt&&dt.id!==t.id&&(dt=null);const s=dt?.beat??0,l=JSON.stringify([re.id,n.startTime,n.bpm,a.start,a.end,s]);if(!e&&Oe?.stamp===l)return;const c=Os(o-s,Yr(t,a),r),d=c.startBeat+s,u=c.offsetBeats,h=Math.max(nt(n.timeAt(d)),T.currentTime);gr(h);const f=new AudioBufferSourceNode(T,{buffer:re.audio,loop:!0}),m=a.start/t.sampleRate,g=a.end/t.sampleRate;f.loopStart=m,f.loopEnd=g;const y=n.bpm/t.bpm;f.playbackRate.value=y;const p=new GainNode(T,{gain:jc(t)});f.connect(p).connect(j?.input??Xe);const b=Math.min(g-m,u*Nt(t.bpm));f.start(h,m+b),Oe={node:f,gain:p,stamp:l},br=Lt,Lt={id:t.id,when:h,offset:b,start:m,length:g-m,duration:t.frames/t.sampleRate,rate:y}}function vd(){return T?Um(T,performance.timeOrigin+performance.now(),s0()):0}function s0(){try{if(V&&window.parent!==window)return window.parent.performance.timeOrigin}catch{}return performance.timeOrigin}function wd(e=vd()){const t=Lt&&e>=Lt.when?Lt:br??null;if(!t||!Oe||e<t.when||!t.length)return{id:null,at:-1};const n=(((e-t.when)*t.rate+t.offset)%t.length+t.length)%t.length;return{id:t.id,at:(t.start+n)/t.duration}}const kd=0;async function l0(){if(nn||D.kind!=="idle"||te.busy||!await _e()||!T||!ee||!Xe)return;nn=!0,kt(A.monitor),O="Calibrating: speakers on, keep quiet for two seconds…",F();const e=T.sampleRate,t=T.currentTime+.3,n=[0,.5,1,1.5].map(d=>t+d),a=Math.round((t-.05)*e),r=Math.round((t+2.2)*e),o=new Promise(d=>{zn=d,setTimeout(()=>d(null),4e3)});ee.port.postMessage({type:"record",id:kd,startFrame:a,endFrame:r,channels:1});for(const d of n){const u=new OscillatorNode(T,{frequency:2e3}),h=new GainNode(T,{gain:0});h.gain.setValueAtTime(.8,d),h.gain.setValueAtTime(0,d+.004),u.connect(h).connect(Xe),u.start(d),u.stop(d+.01)}const s=await o;zn=null,nn=!1;const l=s?.[0],c=l?Pm(l,n.map(d=>Math.round(d*e)-a),Math.round(.4*e)):null;c===null?O="Calibration didn't hear the clicks: turn the speakers up (no headphones), then try again.":(A.roundTripMs=Math.round(c/e*1e4)/10,O=`Round trip ${A.roundTripMs} ms: takes are shifted by it.`,U()),kt(A.monitor)}async function yr(){if(dt=null,await ke(),T&&T.state!=="running"&&await T.resume().catch(()=>{}),V&&Dt()){xe=!xe,xt(!0),F(),xe&&Ft()?.out?.(bt(et,ve));return}Dt()?tt.stop({at:le()}):(xe=!1,V&&Ft()?.claim(bt(et,ve)),tt.play({at:le()}))}let Gs=_().running;tt.onChange(()=>{const e=_().running&&!Gs;e&&V&&(xe=!pg(et,ve)),Gs=_().running,_().running||(xe=!1,dt=null,On=null,D.kind!=="idle"&&(ee?.port.postMessage({type:"cancel"}),D={kind:"idle"})),te.clockChanged(e),xt(),F()});Ft()?.member?.(bt(et,ve),vt);Ft()?.onAll(()=>{xe&&(xe=!1,dt=null,xt(!0),F())});async function ro(e=A.selected){const t=A.takes.find(o=>o.id===e);if(!t){O="No take to save yet: record one, or Load an audio file.",F();return}const n=await Qn(t);if(!n){O=`${Ne(t)} is not in this browser: nothing to save.`,F();return}const a=new Blob([Ab(td(n,at(t)),t.sampleRate)],{type:"audio/wav"}),r=document.createElement("a");r.href=URL.createObjectURL(a),r.download=`lucy${ve>1?`-${ve}`:""}-take-${t.id}-${Math.round(t.bpm)}bpm-${t.created.slice(0,10)}.wav`,r.hidden=!0,document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(r.href),1e4)}async function c0(e){if(!await ke()||!T)return;let t;try{t=await T.decodeAudioData(await e.arrayBuffer())}catch{O=`Couldn't read ${e.name}: not an audio file this browser can decode.`,F();return}const n=_().bpm,a=Hm(t.length,t.sampleRate,n),r=[];for(let l=0;l<Math.min(2,t.numberOfChannels);l++){const c=new Float32Array(a.frames);c.set(t.getChannelData(l).subarray(0,a.frames)),r.push(c)}const o=A.nextId++,s={id:o,bars:a.bars,bpm:n,sampleRate:t.sampleRate,channels:r.length,frames:a.frames,created:new Date().toISOString(),saved:!1,source:"file",normalize:{on:!0,gainDb:cn(r,t.sampleRate)}};He.set(o,Ka(r)),s.saved=await it.save(o,r),O=`${e.name} is take ${o}: ${a.bars} bar${a.bars===1?"":"s"} at ${Math.round(n)} BPM${a.trimmed?", trimmed to fit":""}.${s.saved?"":" Kept until you reload: this browser has no file storage here."}`,A.takes.push(s),A.selected=o,U(),await je(o)}function d0(){hn(!1),Dt()&&(V?(xe=!0,Ft()?.out?.(bt(et,ve))):tt.stop({at:le()})),gr(),j?.clear({fadeMs:20}),kt(!1)}function xd(e){A.master=Math.min(1,Math.max(0,e)),U(),Ia&&T&&Ia.gain.setTargetAtTime(A.master,T.currentTime,.01),_n.value=String(A.master),oo.textContent=`${Math.round(A.master*100)}%`}async function u0(e){const t=Mb(A,e);hn(!1),Xn(),Object.assign(A,t),He.clear(),O="",U(),!(Pa&&!await Pa)&&(j?.setState(A.fx),xd(A.master),kt(A.monitor),await je(A.selected))}function hn(e=!0){te.busy&&te.cancel(),D.kind!=="idle"&&(ee?.port.postMessage({type:"cancel"}),D={kind:"idle"},Ke=null),ae=null,zt(),e&&F()}const qn=new xb(A,e=>(He.delete(e),it.remove(e)));async function $d(e=A.selected){if(e!==null&&re?.id!==e&&Te.delete(e),e===null)return;const t=A.takes.find(a=>a.id===e),n=A.selected===e;!t||!qn.delete(e)||(Z?.take===e&&Xn(),qt?.take===e&&(qt=null),U(),n?await je(A.takes.at(-1)?.id??null):F(),cm({message:`Deleted ${Ne(t)}`,actionLabel:"Undo",onAction:()=>{qn.undo(e)&&(U(),A.selected===e?je(e):F())},onClose:a=>{a!=="action"&&qn.settle(e)}}))}function Ad(e,t){const n=A.takes.find(a=>a.id===e);n&&(fb(n,t),U(),F())}function Ed(e,t,n){if(!n)return;const a=A.takes.find(r=>r.id===e);a&&(eb(a,t)?a.region=void 0:a.region={start:t.start,end:t.end},U(),re?.id===e&&xt(),F())}async function Md(e,t){const n=A.takes.find(a=>a.id===e);if(n){if(n.normalize)n.normalize.on=t;else{const a=t?await it.load(n):null;if(t&&!a)return;n.normalize={on:t,gainDb:a?cn(a,n.sampleRate):0}}U(),T&&Oe&&re?.id===e&&Oe.gain.gain.setTargetAtTime(jc(n),T.currentTime,.01),F()}}function Sd(e,t){const n=A.takes.find(a=>a.id===e);n&&(t==="beat"?n.snap=void 0:n.snap=t,U(),F())}async function Td(e){if(re?.id===e&&vt()){await yr();return}if(!await ke()||!T)return;const t=T;On=Dt()?e:null,await Promise.all([t.state==="running"?null:t.resume().catch(()=>{}),A.selected!==e||re?.id!==e?je(e):null]),vt()?On===e&&xt(!0):await yr()}const I=(e,t={},...n)=>{const a=document.createElement(e);for(const[r,o]of Object.entries(t))a.setAttribute(r,o);return a.append(...n),a},Ld=document.getElementById("app");Ld.classList.add("nc","nc-page");pm();tg();const Ja=I("header",{class:"nc-page-hd"},I("div",{},I("h1",{class:"nc-page-title"},I("span",{style:"color: var(--nc-ui-instrument-lucy)"},"LUCY")," ",I("span",{class:"nc-page-sep"},"/")," AUDIO ",I("span",{class:"nc-page-sep"},"/")," ",I("span",{class:"nc-mono"},String(ve).padStart(2,"0"))),I("p",{class:"nc-page-sub"},"A TRIKI instrument."))),_n=I("input",{type:"range",class:"nc-range",id:"lucy-master",min:"0",max:"1",step:"0.01",value:String(A.master),"data-nc-id":"lucy-master"});_n.addEventListener("input",()=>xd(Number(_n.value)));const oo=I("span",{class:"nc-readout","data-nc-readout":""});oo.textContent=`${Math.round(A.master*100)}%`;const rn=I("input",{type:"file",accept:"audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.webm"});rn.hidden=!0;rn.addEventListener("change",()=>{const e=rn.files?.[0];rn.value="",e&&c0(e)});const vr=(e,t)=>{const n=I("button",{type:"button",class:"nc-page-action","data-lucy-action":e.toLowerCase()},e);return n.addEventListener("click",t),q(`action:${e.toLowerCase()}`,n,n),n},Vs=bm({panel:I("div",{},I("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},I("label",{class:"nc-label",for:"lucy-master"},"Master"),_n,oo),vr("Save",()=>void ro()),vr("Load",()=>rn.click()))});Ja.append(I("div",{class:"nc-page-actions"},Vs.panel,vr("Panic",d0),Vs.button,rn));q("page:title",Ja.querySelector(".nc-page-title"));q("master",Ja.querySelector('label[for="lucy-master"]'),_n);const so=I("div",{class:"nc-stack","data-nc-layout":"adjacent"});Ld.append(Ja,I("main",{class:"nc-page-body"},so));function p0(){const e=_(),t=te.phase;if(t.kind==="waiting")return"Waiting for Master…";if(t.kind==="recording"){const a=e.beatAt(le()),r=Bt();if(r!==null)return`Count-in: ${r}`;if(a<t.startBeat)return"Waiting for Master…";const o=Math.floor((a-t.startBeat)/4)+1;return`Recording Master bar ${Math.min(o,t.bars)} of ${t.bars}`}if(D.kind!=="idle"){const a=e.beatAt(le()),r=Bt();if(r!==null)return`Count-in: ${r}`;if(a<D.startBeat){const s=Math.ceil((D.startBeat-a)/4);return`Armed: recording in ${s} bar${s===1?"":"s"}`}const o=Math.floor((a-D.startBeat)/4)+1;return`Recording bar ${Math.min(o,A.bars)} of ${A.bars}`}if(!Dt())return A.takes.length?"Stopped":de()==="master"?"Record to take the Master":"Arm to record a take";if(xe)return"Sitting out";const n=re?A.takes.find(a=>a.id===re?.id):void 0;return n?`Playing ${Ne(n)}`:"Playing (no take yet)"}function Cd(){if(Rt()){const e=K.voice.kind;return K.busy?"Cancel":e==="added"||e==="quiet"||e==="saving"?"Record another":"Record voice pass"}return h0()}function h0(){const e=te.phase;return e.kind==="waiting"?"Armed":e.kind==="recording"?_().beatAt(le())<e.startBeat?"Armed":"Recording":D.kind==="armed"?"Armed":D.kind==="recording"?"Recording":"Record"}function f0(){const e=Rt(),t=!e&&(D.kind!=="idle"||te.busy),n=A.lupa.thresholdDb;return{id:"transport",title:"Transport",controls:[{type:"button",id:"play",label:vt()?"Stop":"Play",on:vt(),onPress:()=>void yr()},{type:"button",id:"arm",label:Cd(),on:t,ariaLabel:e?K.busy?"Cancel the voice pass":"Record a voice pass: Lupa's next whole loop from the mic":t?"Cancel the take":de()==="master"?"Record the Master from the next bar line the music plays":"Record a take from the next bar",onPress:()=>void fd()},{type:"group",id:"mic",title:"Mic settings",collapse:"phone",controls:[{type:"slider",id:"mic-threshold",label:"Mic threshold",min:yt,max:Wn,step:1,value:n,valueText:m0(n),onChange:a=>K.setThreshold(a)}]},{type:"choice",id:"bars",label:"Length (bars)",value:String(A.bars),options:pa.map(a=>({value:String(a),label:`${a} bar${a===1?"":"s"}`})),onChange:a=>{A.bars=Number(a),U(),F()}},{type:"group",id:"count",title:"Count-in",collapse:"phone",summary:v0(),controls:[...k0(),...w0()]}]}}function m0(e){return`${e<0?"−":""}${Math.abs(e)} dB`}function Mi(){const e=[{value:"mic",label:"Input"},...eo()?[{value:"computer",label:"Computer audio"}]:[],...cd()?[{value:"master",label:"Master"}]:[]];return e.length<2?[]:[{type:"choice",id:"record-from",label:"Record from",value:de(),options:e,onChange:t=>Kn(t==="master"?"master":t==="computer"?"computer":"mic")}]}function g0(){const e=A.input,t=ge.map(n=>({value:n.id,label:n.label}));return e&&!ge.some(n=>n.id===e.id)&&t.push({value:e.id,label:`${e.label} (not connected)`}),[{value:"default",label:"Default input"},...t]}const _a=()=>O?[{type:"note",id:"notice",text:O}]:[];function b0(){return pe?[{type:"readout",id:"computer-source",label:"From",value:pe.label},{type:"canvas",id:"meter",label:"Level",paint:"meter",level:Math.min(1,Je)},{type:"button",id:"stop-sharing",label:"Stop sharing",on:!1,onPress:()=>{Oa(),O="",F()}},{type:"note",id:"rights-note",text:"Takes here: unknown rights."},..._a()]:[{type:"label",id:"capture-label",text:"What to capture"},{type:"button",id:"share",label:"Pick tab or screen",on:!0,onPress:()=>void pd()},{type:"note",id:"share-how",text:"Web page: pick its tab."},{type:"note",id:"share-how-app",text:"Another app: Entire screen."},{type:"note",id:"share-how-tick",text:"Then tick Share audio."},..._a()]}function y0(){return de()==="master"?{id:"input",title:"Input",controls:[...Mi(),{type:"note",id:"master-note",text:"Internal: no monitor, no nudge."},..._a()]}:de()==="computer"?{id:"input",title:"Input",controls:[...Mi(),...b0()]}:{id:"input",title:"Input",controls:[...Mi(),...ge.length?[{type:"select",id:"input-device",label:"Input",value:A.input?.id??"default",options:g0(),onChange:e=>void Ob(e)}]:[],se?{type:"readout",id:"source",label:ge.length?"Format":"Input",value:`${Yn===2?"Stereo":"Mono"} · ${Math.round((T?.sampleRate??48e3)/100)/10} kHz`}:{type:"button",id:"allow",label:"Allow the mic",on:!1,onPress:()=>void _e()},...se||ge.length?[]:[{type:"note",id:"inputs-after",text:"Then choose your input."}],{type:"canvas",id:"meter",label:"Level",paint:"meter",level:Math.min(1,Je)},{type:"choice",id:"monitor",label:"Monitor",value:A.monitor?"on":"off",options:[{value:"off",label:"Monitor off"},{value:"on",label:"Monitor on"}],onChange:e=>kt(e==="on")},...dd?[{type:"note",id:"processing",text:"Voice processing is on: takes may sound squashed."}]:[],..._a(),{type:"group",id:"input-more",title:"Timing",collapse:"phone",summary:`Round trip ${Nd()} · Nudge ${Fd()}`,controls:[{type:"label",id:"timing-label",text:"Timing"},...C0().controls??[]]}]}}function v0(){const e=V?.metronome?` · click ${A.click?"on":"off"}`:"";if(!A.countIn)return`Count-in off${e}`;const t=A.cue==="sound"?"Click":A.cue==="visual"?"Number":"Both";return`Count-in ${A.countIn} · ${t}${e}`}function Nd(){return A.roundTripMs===null?`${Math.round(Qa()*1e3)} ms (estimate)`:`${A.roundTripMs} ms`}function Fd(){return`${A.nudgeMs>0?"+":""}${A.nudgeMs} ms`}function w0(){return V?.metronome?[{type:"label",id:"click-label",text:"Click while recording"},{type:"choice",id:"click",label:"Click while recording",value:A.click?"on":"off",options:[{value:"off",label:"Off"},{value:"on",label:"On"}],onChange:e=>{A.click=e==="on",U(),zt(),F()}},{type:"note",id:"click-note",text:"Never in the take."}]:[]}function k0(){return[{type:"label",id:"count-in-label",text:"Count-in"},{type:"choice",id:"count-in",label:"Count-in",value:String(A.countIn),options:[{value:"0",label:"Off"},{value:"4",label:"4 beats"},{value:"8",label:"8 beats"}],onChange:e=>{A.countIn=Number(e)===4?4:Number(e)===8?8:0,U(),F()}},...A.countIn?[{type:"label",id:"cue-label",text:"Count-in cue"},{type:"choice",id:"cue",label:"Cue",value:A.cue,options:[{value:"sound",label:"Click"},{value:"visual",label:"Number"},{value:"both",label:"Both"}],onChange:e=>i0(e==="sound"||e==="visual"?e:"both")}]:[]]}function x0(){return{id:"takes",title:"Takes",summary:A.takes.length?`${A.takes.length} take${A.takes.length===1?"":"s"}`:"No takes",controls:[]}}const He=new Map,Si=new Set;let Ys=Promise.resolve();function $0(e){He.has(e.id)||Si.has(e.id)||(Si.add(e.id),Ys=Ys.then(async()=>{const t=await Qn(e).catch(()=>null);Si.delete(e.id),!(!A.takes.includes(e)&&!qn.held.includes(e.id))&&(He.set(e.id,t?Ka(t):null),Jn())}))}let ae=null,Ti=!1;function Dd(){const e=_(),t=te.phase;if(t.kind==="waiting")return"Waiting for Master…";if(t.kind==="recording"){const n=e.beatAt(le()),a=Bt();if(a!==null)return`Count-in · ${a}`;if(n<t.startBeat)return"Waiting for Master…";const r=Math.floor((n-t.startBeat)/H)+1;return`Recording · bar ${Math.min(r,t.bars)} of ${t.bars}`}if(D.kind!=="idle"){const n=e.beatAt(le()),a=Bt();if(a!==null)return`Count-in · ${a}`;if(n<D.startBeat){const o=Math.ceil((D.startBeat-n)/H);return`Armed · recording in ${o} bar${o===1?"":"s"}`}const r=Math.floor((n-D.startBeat)/H)+1;return`Recording · bar ${Math.min(r,A.bars)} of ${A.bars}`}return""}function A0(){const e=te.phase,t=Gr();if(!T||!t)return;if(e.kind==="waiting"){ae??={id:-1,source:"master",bars:A.bars,builder:new za(0)};return}if(e.kind!=="recording"||((!ae||ae.id!==e.id)&&(ae={id:e.id,source:"master",bars:e.bars,builder:new za(e.to-e.from)}),Ti))return;const n=e.from+ae.builder.frames,a=Math.min(e.to,Math.floor(T.currentTime*T.sampleRate)-2048);if(a-n<4096)return;Ti=!0;const r=ae;t.take("master",n,a).then(o=>{o&&ae===r&&(r.builder.add(o),Jn())}).catch(()=>{}).finally(()=>{Ti=!1})}function E0(){if(!(D.kind!=="idle"||te.busy))return null;const t=ae?.bars??A.bars,n=ae?.builder;return{label:Dd(),count:Ur(A.cue)?Bt():null,source:te.busy?"master":D.kind!=="idle"?D.from:"mic",peaks:n&&n.totalFrames>0?n.peaks:null,filled:n?.filled??0,bars:Array.from({length:Math.max(0,t-1)},(a,r)=>(r+1)/t)}}function M0(){const e=pn();for(const n of A.takes)$0(n);const t=e.find(n=>n.instance===Z?.to)??e[0];return{takes:[...A.takes].reverse(),selected:A.selected,playing:vt()&&re?re.id:null,peaks:n=>He.get(n),canSend:e.length>0,sendName:e.length===1?e[0]?.name??"Sampler":"Sampler",picker:Z&&t?{take:Z.take,receivers:e,to:t.instance,target:Z.target,name:Z.name??"",defaultName:(()=>{const n=A.takes.find(a=>a.id===Z?.take);return n?Ne(n):""})(),sending:Bn}:null,sendNote:qt,timing:n=>hd(n),timingDone:Fe?{take:Fe.take,text:Fe.text}:null,live:E0(),hint:de()==="master"?"Record takes the Master on the next bar.":"Record takes the mic on the next bar.",now:Date.now()}}const jn=new Db({select:e=>void je(e),play:e=>void Td(e),preload:e=>o0(e),rename:Ad,openSend:e=>bd(e),pickTo:e=>{const t=pn().find(n=>n.instance===e);t&&Z&&(Z={...Z,to:t.instance,target:gd(t)}),F()},pickTarget:e=>{Z&&(Z={...Z,target:e}),F()},pickName:e=>{Z&&(Z={...Z,name:e})},send:()=>void yd(),cancelSend:()=>{Bn||(Xn(),F())},download:e=>void ro(e),remove:e=>void $d(e),setRegion:Ed,setSnap:Sd,setNormalize:(e,t)=>void Md(e,t),setShift:(e,t)=>void no(e,t),matchTiming:Gb,dismissTiming:Yb,undoTiming:Vb,cancelRecording:()=>hn()});function Jn(){jn.render(M0())}const Za=new Map;function zd(e,t,n){j?.setParam(e,t,n),F()}function S0(e,t){const n="hacks-eq-graph";return Za.set(n,"hack:eq:graph"),ap(j,e,{id:n,on:t,set:(a,r)=>zd(e,a,r),help:{graph:ut["hack:eq:graph"],low:ut["hack:eq:node:low"],mid:ut["hack:eq:node:mid"],high:ut["hack:eq:node:high"]}})}function Ks(e,t,n){const a=Number(j?.getParam(t,n.key)??n.default),r=`hacks-${t}-${n.key}`;Za.set(r,`hack:${e}:${n.key}`);const o=s=>zd(t,n.key,s);return n.options?{type:"select",id:r,label:n.label,value:String(a),options:n.options.map(s=>({value:String(s.value),label:s.label})),onChange:s=>o(Number(s))}:{type:"slider",id:r,label:n.label,min:n.min,max:n.max,step:n.step??.001,taper:ih(n),value:a,valueText:hl(n,a,_().bpm),onChange:o}}function T0(e){const t=j?.getChain().find(n=>n.type===e)?.id??e;return j?j.getParam(t,"bypass")===!1:!1}function Xs(e,t){const n=j?.getChain().find(o=>o.type===e)?.id??e,a=ye(e),r=a?.dials??[];return Za.set(`hacks-${e}`,`hack:${e}`),{type:"fx",id:`hacks-${e}`,title:a?.label??e,depth:t,on:j?j.getParam(n,"bypass")===!1:!1,onToggle:o=>{j?.setParam(n,"bypass",!o),F()},controls:[...e==="eq"?[S0(n,j?j.getParam(n,"bypass")===!1:!1)]:[],...r.filter(o=>!o.more).map(o=>Ks(e,n,o))],more:r.filter(o=>o.more).map(o=>Ks(e,n,o)),maxHelp:ut["hack:max"],meter:xl(j,n)??void 0,meterHelp:ut["hack:meter"]}}function L0(){return{id:"hacks",title:"Hacks",controls:[{type:"group",id:"hacks-cards",title:"EQ & Compressor",collapse:"phone",summary:Qt.map(e=>`${ye(e)?.label??e} ${T0(e)?"on":"off"}`).join(" · "),controls:[Xs("eq",1),Xs("compressor",2)]}]}}function C0(){return{id:"timing",title:"Timing",controls:[{type:"readout",id:"roundtrip",label:"Round trip",value:Nd()},{type:"button",id:"calibrate",label:nn?"Listening…":"Calibrate",on:nn,onPress:()=>void l0()},{type:"slider",id:"nudge",label:"Nudge",min:-10,max:10,step:.5,value:A.nudgeMs,valueText:Fd(),onChange:e=>{A.nudgeMs=e,U(),F()}}]}}const N0="http://www.w3.org/2000/svg",Vt=(e,t)=>{const n=document.createElementNS(N0,e);for(const[a,r]of Object.entries(t))n.setAttribute(a,r);return n},wr=I("div",{class:"lucy-vp","data-lucy":"vp"}),Bd=I("span",{class:"lucy-meter-fill"}),lo=I("span",{class:"lucy-meter-mark","aria-hidden":"true"}),ue=I("div",{class:"lucy-meter",role:"meter","aria-label":"Mic level","aria-valuemin":String(yt),"aria-valuemax":String(Wn),"data-lucy":"meter"},Bd,lo),qd=I("span",{class:"nc-label"},"Mic"),F0=I("div",{class:"lucy-mic"},qd,ue),co=I("div",{class:"lucy-vp-body"});wr.append(F0,co);q("mic-meter",qd,ue);q("mic-mark",lo);let kr=Number.NEGATIVE_INFINITY;const Qs=1500,Js=e=>Math.max(0,Math.min(1,(e-yt)/(Wn-yt)));ue.addEventListener("pointerdown",e=>{const t=r=>{const o=ue.getBoundingClientRect();if(o.width<=0)return;const s=Math.max(0,Math.min(1,(r-o.left)/o.width));K.setThreshold(yt+s*(Wn-yt))};ue.setPointerCapture?.(e.pointerId),ue.dataset.drag="",t(e.clientX);const n=r=>t(r.clientX),a=()=>{delete ue.dataset.drag,ue.removeEventListener("pointermove",n),ue.removeEventListener("pointerup",a),ue.removeEventListener("pointercancel",a)};ue.addEventListener("pointermove",n),ue.addEventListener("pointerup",a),ue.addEventListener("pointercancel",a)});function D0(){const e=de()==="mic"?!!se:de()==="computer"?!!pe:!1,t=fa(A.lupa.thresholdDb),n=Je>0?20*Math.log10(Je):-120,a=e&&Je>=t;a&&(kr=performance.now()),Bd.style.width=`${e?Js(n)*100:0}%`,lo.style.left=`${Js(A.lupa.thresholdDb)*100}%`,ue.toggleAttribute("data-loud",a),ue.toggleAttribute("data-off",!e),ue.setAttribute("aria-valuenow",String(Math.max(yt,Math.round(n)))),ue.setAttribute("aria-valuetext",e?`${Math.round(n)} dB`:"Off")}function z0(){const e=de();return e==="master"?{text:"Recording the Master: no mic.",warn:!1,allow:!1}:e==="computer"?pe?performance.now()-kr<Qs?{text:"Computer audio on · loud enough",warn:!1,allow:!1}:{text:"Computer audio on · quiet",warn:!1,allow:!1}:{text:"Choose a tab or screen to record.",warn:!1,allow:!1}:se?performance.now()-kr<Qs?{text:"Mic on · loud enough",warn:!1,allow:!1}:{text:"Mic on · too quiet — sing louder or lower the threshold",warn:!0,allow:!1}:{text:"Allow the mic to record.",warn:!1,allow:!0}}function vn(e,t,n={}){const s=Vt("svg",{viewBox:"0 0 400 40",preserveAspectRatio:"none","aria-hidden":"true"});s.append(Vt("line",{class:"base",x1:"0",x2:String(400),y1:String(20),y2:String(20)}));for(let d=1;d<e;d++){const u=String(d*400/e);s.append(Vt("line",{class:"bar",x1:u,x2:u,y1:"0",y2:String(40)}))}if(t.length>1){const d=Math.min(1,t.length/128),u=t.map((m,g)=>{const y=g/Math.max(1,t.length-1)*d*400,p=n.quiet?.6:Math.max(.6,m*(40/2-3));return[y,p]}),h=u.map(([m,g])=>`${m.toFixed(1)},${(20-g).toFixed(1)}`),f=[...u].reverse().map(([m,g])=>`${m.toFixed(1)},${(20+g).toFixed(1)}`);s.append(Vt("path",{class:"wave",d:`M${h.join(" L")} L${f.join(" L")} Z`}))}if(n.kept!==void 0&&n.kept<1){const d=String(n.kept*400);s.append(Vt("line",{class:"cut",x1:d,x2:d,y1:"0",y2:String(40)}))}const l=Vt("line",{class:"head",x1:"0",x2:"0",y1:"0",y2:String(40)});l.setAttribute("visibility",n.head===null||n.head===void 0?"hidden":"visible"),n.head!==null&&n.head!==void 0&&(l.setAttribute("x1",String(n.head*400)),l.setAttribute("x2",String(n.head*400))),s.append(l);const c=I("div",{class:"lucy-strip","data-lucy":"strip"});return n.quiet&&(c.dataset.quiet=""),c.append(s),n.start&&c.append(I("span",{class:"lucy-dot lucy-strip-start","data-hollow":""})),c}const wn=e=>I("div",{class:"lucy-bars",style:`--lucy-bars:${e}`,"aria-hidden":"true"},...Array.from({length:e},(t,n)=>I("span",{},String(n+1)))),kn=(e=!1)=>I("span",{class:"lucy-dot","aria-hidden":"true",...e?{"data-hollow":""}:{}}),we=(e,...t)=>I("p",{class:"lucy-line",...e},...t),Ie=e=>I("span",{class:"lucy-sub"},e),xn=(...e)=>I("p",{class:"lucy-help"},...e),Rd=(e,t,n)=>{const a=I("button",{type:"button",class:"lucy-link","data-lucy":t},e);return a.addEventListener("click",n),a},Id=()=>Dt()?_().beatAt(le()):null;function Pd(e){if(e.kind!=="recording")return null;const t=Id();return t===null?null:Math.max(0,Math.min(1,(t-e.beat)/e.lengthBeats))}const B0=e=>{const t=Math.max(1,Math.ceil(e/4-1e-6));return t===1?"bar 1":`bars 1–${t}`};function q0(){const e=K.voice,t=K.jammingNow(),n=[];if(!Rt()&&(D.kind!=="idle"||te.busy)){const r=Bt(),s=_().beatAt(le()),l=te.phase;if(r!==null)return n.push(we({"data-lucy":"count"},I("span",{class:"lucy-big"},String(r)),Ie(`Count-in · then ${A.bars} bar${A.bars===1?"":"s"}`))),{key:`count|${r}`,nodes:n};if(l.kind==="waiting"||l.kind==="recording"&&s<l.startBeat)return n.push(we({"data-lucy":"take-line"},kn(!0),"Waiting for the Master")),{key:"master-wait",nodes:n};if(l.kind==="recording"){const c=Math.min(l.bars,Math.floor((s-l.startBeat)/4)+1);return n.push(we({"data-lucy":"take-line"},kn(),"Recording the Master",Ie(`· bar ${c} of ${l.bars}`))),{key:`master|${c}`,nodes:n}}if(D.kind!=="idle"&&s<D.startBeat){const c=Math.ceil((D.startBeat-s)/4);return n.push(we({"data-lucy":"take-line"},kn(!0),"Armed",Ie(`· recording in ${c} bar${c===1?"":"s"}`))),{key:`armed|${c}`,nodes:n}}if(D.kind!=="idle"){const c=Math.min(A.bars,Math.floor((s-D.startBeat)/4)+1);return n.push(we({"data-lucy":"take-line"},kn(),"Recording a take",Ie(`· bar ${c} of ${A.bars}`))),{key:`rec|${c}`,nodes:n}}}const a=r=>Math.max(1,Math.round(r/4));switch(e.kind){case"idle":return t&&n.push(xn("Lupa is playing · records the next loop as a pass")),{key:`idle|${t}`,nodes:n};case"asking":return n.push(we({"data-lucy":"voice-line"},Ie("Asking Lupa for its next loop…"))),{key:"asking",nodes:n};case"armed":{const r=Id(),o=r===null?null:Math.max(1,Math.ceil(e.beat-r-1e-9)),s=r===null?null:K.loopAt(r),l=e.started||!s?o!==null&&r!==null&&r>=e.beat-4?`Lupa is starting: count-in beat ${Math.min(4,Math.max(1,5-o))} of 4.`:"Lupa is starting.":`Lupa is on bar ${s.bar} of ${s.bars}, beat ${s.beat}. Records from bar 1.`;return n.push(I("div",{class:"lucy-big","data-lucy":"starts-in"},o===null?"Starts soon…":`Starts in ${o}…`),we({},Ie(l)),vn(a(e.lengthBeats),[],{start:!0}),wn(a(e.lengthBeats))),{key:`armed|${o}|${l}`,nodes:n}}case"recording":{const r=a(e.lengthBeats),o=Pd(e)??0,s=Math.min(r,Math.floor(o*r)+1);return n.push(we({"data-lucy":"voice-line"},kn(),`Recording voice pass ${e.pass}`,Ie(`· bar ${s} of ${r}`)),vn(r,e.peaks,{head:o}),wn(r),xn("Lupa records this one loop, then goes back to Play by itself. Cancel throws this loop away.")),{key:`rec|${s}|${e.peaks.length}`,nodes:n}}case"saving":{const r=a(e.lengthBeats);return n.push(we({"data-lucy":"voice-line"},Ie(`Keeping voice pass ${e.pass}…`)),vn(r,e.peaks),wn(r)),{key:`saving|${e.peaks.length}`,nodes:n}}case"added":{const r=a(e.lengthBeats),o=e.keptBeats<e.lengthBeats-.001;return n.push(we({"data-lucy":"voice-line","data-done":""},I("span",{"aria-hidden":"true"},"✓"),`Voice pass ${e.pass} added`,Ie(o?`(${B0(e.keptBeats)}, the jam stopped)`:t?"· Lupa is back in Play":"")),vn(r,e.peaks,{kept:e.keptBeats/e.lengthBeats}),wn(r),xn(Rd("Undo","undo",()=>K.undo())," removes it from Lupa.")),{key:`added|${e.pass}|${o}|${t}`,nodes:n}}case"quiet":{const r=a(e.lengthBeats);return n.push(we({"data-lucy":"voice-line","data-warn":""},"Too quiet: this loop was not kept"),vn(r,e.peaks,{quiet:!0}),wn(r),xn("The mic never reached the mark. Sing closer or louder, or drag the mark left, then press Record another.")),{key:`quiet|${t}`,nodes:n}}case"undone":return n.push(we({"data-lucy":"voice-line"},Ie(`Voice pass ${e.pass} is out of Lupa.`))),t&&n.push(xn("Lupa is playing · records the next loop as a pass")),{key:`undone|${t}`,nodes:n};case"failed":return n.push(we({"data-lucy":"voice-line","data-warn":""},e.text)),{key:`failed|${e.text}`,nodes:n}}}let Zs="",el=Number.NEGATIVE_INFINITY;function uo(e=!0){D0();const t=performance.now();(e||t-el>=100)&&(el=t,R0()),I0()}function R0(){const e=z0(),{key:t,nodes:n}=q0(),a=`${e.text}|${e.allow}|${t}`;if(a!==Zs){Zs=a;const r=I("p",{class:"lucy-status",role:"status","data-lucy":"mic-status"},e.text);e.warn&&(r.dataset.warn=""),e.allow&&r.append(" ",Rd("Allow the mic","allow-mic",()=>void _e())),co.replaceChildren(r,...n)}}function I0(){const e=Pd(K.voice);if(e!==null){const t=co.querySelector(".lucy-strip .head");if(t){const n=String(e*400);t.setAttribute("x1",n),t.setAttribute("x2",n)}}}function P0(e){const t=e?.querySelector('[data-nc-id="arm"]');if(!t||!e)return;let n=t;for(;n.parentElement&&n.parentElement!==e&&!n.parentElement.matches(".nc-module-body, .nc-section, [role=group]");)n=n.parentElement;n.nextElementSibling!==wr&&n.after(wr);const a=t.matches("button")?t:t.querySelector("button");if(a){const r=Rt()?K.busy?"stop":"rec":"";(a.getAttribute("data-lucy-mark")??"")!==r&&(r?a.setAttribute("data-lucy-mark",r):a.removeAttribute("data-lucy-mark"));const o=a.textContent??"";a.getAttribute("data-lucy-words")!==o&&(a.hasAttribute("data-lucy-words")&&(a.removeAttribute("data-lucy-fade"),a.offsetWidth,a.setAttribute("data-lucy-fade","")),a.setAttribute("data-lucy-words",o))}}function Od(e,t){if(e.update(t),t.id==="takes"){const a=e.el.querySelector(".nc-module-body");a&&jn.el.parentElement!==a&&a.append(jn.el)}const n=[...t.controls??[],...(t.sections??[]).flatMap(a=>a.controls)];ng(e.el,t.id,n,a=>Za.get(a)??a),t.id==="transport"&&(P0(e.el.querySelector(".nc-module-body")),uo())}const po=[f0,y0,x0,L0].map(e=>({def:e,handle:Am(e())}));Em(so,po.map(e=>e.handle),"adjacent");so.dataset.lucyLayout="";F();function F(){for(const e of po)Od(e.handle,e.def());Jn(),O0()}function O0(){const e=document.querySelector('[data-nc-id="hacks-compressor"]');if(!e)return;const t=j?.getChain().find(a=>a.type==="compressor")?.id??"compressor",n=Rm(e,{source:xl(j,t),color:"var(--nc-ui-instrument-lucy)",threshold:()=>{const a=j?.getParam(t,"threshold_db");return typeof a=="number"?a:null},on:()=>j?j.getParam(t,"bypass")===!1:!1});q("comp-gauge",n)}function _0(){const e=po[1];e&&Od(e.handle,e.def()),uo(!1)}let tl="";const j0=document.title;let nl="",al=0;const H0=matchMedia("(prefers-reduced-motion: reduce)");let il="",rl=0,ol=!1;function _d(e){K.tick();const t=Rt();if(t!==ol&&(ol=t,F()),uo(!1),e-rl>1e3){rl=e;const d=JSON.stringify(pn().map(u=>[u.instance,u.name,u.targets.map(h=>h.name)]));d!==il&&(il=d,F())}if(D.kind!=="idle"){const d=_();D.kind==="armed"&&d.beatAt(le())>=D.startBeat&&(D={...D,kind:"recording"})}const n=Ur(A.cue)?Bt():null,a=Zm(j0,n);document.title!==a&&(document.title=a);const r=p0(),o=Dd();(r!==tl||o!==nl)&&(tl=r,nl=o,F()),te.busy&&A0(),e-al>3e4&&(al=e,Jn());const s=wd(),l=s.id===null?void 0:A.takes.find(d=>d.id===s.id);let c=s.at;if(H0.matches&&l&&c>=0){const d=l.frames/l.sampleRate/Nt(l.bpm);c=Math.floor(c*d)/d}jn.setPlayhead(vt()?s.id:null,c),requestAnimationFrame(_d)}requestAnimationFrame(_d);Pb.start();if(V)ke().then(()=>je(A.selected)),V.providePreset?.({format:Qr,version:Ra,get:()=>Eb(A),set:u0});else{const e=()=>{ke().then(()=>je(A.selected))};document.addEventListener("pointerdown",e,{once:!0,capture:!0}),document.addEventListener("keydown",e,{once:!0,capture:!0})}window.__lucy={state:A,clock:tt,lupa:K,get recordLabel(){return Cd()},get voiceMode(){return Rt()},get ctx(){return T},get phase(){return D},get master(){return te.phase},get count(){return De&&{id:De.id,times:De.times,badge:De.badge}},pressRecord:()=>fd(),setSource:Kn,get inputs(){return ge},get inputDeviceId(){return St},get computer(){return pe&&{label:pe.label,channels:pe.channels}},get notice(){return O},shareComputer:pd,stopComputer:Oa,receivers:pn,openSend:bd,cards:jn,trash:qn,playheadAt:wd,heardNow:vd,beatAtContext:e=>_().beatAt(e-(an?.offset??0)),get playStart(){return Lt?.when??null},get out(){return Xe},get peaks(){return He},get live(){return ae},removeTake:$d,rename:Ad,setRegion:Ed,setSnap:Sd,setNormalize:Md,get playGain(){return Oe?Oe.gain.gain.value:null},playTake:Td,download:ro,get sendPick(){return Z},set sendPick(e){Z=e,F()},sendTake:yd,get sendNote(){return qt},get level(){return Je},get fx(){return j},roundTrip:Qa,toContext:nt,takeAudio:e=>{const t=A.takes.find(n=>n.id===e);return t?it.load(t):null},takePlayed:e=>{const t=A.takes.find(n=>n.id===e);return t?Qn(t):null},repaint:()=>F(),async testInput(e,t=1){if(!await ke()||!T||!ee||!wt)return;const n=e(T);n.connect(ee),n.connect(wt),se=n,Yn=t,F()}};
