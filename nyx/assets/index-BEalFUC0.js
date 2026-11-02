(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const ot=1e-9;function Rl(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class ai{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return Rl(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let i=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+ot&&(i=s.bpm);const r=[{beat:t.beat,time:t.time,bpm:this.clamp(i)}];for(const s of a){if(s.beat<=t.beat+ot)continue;const l=this.clamp(s.bpm);l!==r[r.length-1].bpm&&r.push({beat:s.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+ot){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-ot;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,i=.25){const r=this.bpmAt(n);if(!(a>0)||!(i>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/i));this.setTempoAt(r,n);for(let l=1;l<=s;l++)this.setTempoAt(r+(t-r)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new ai({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+ot)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+ot)return n[a];return n[0]}}const Il=Object.freeze({beatsPerBar:4,beatUnit:4}),ht=1e-9;function jl(e){return Math.floor(e+ht)}function pr(e,t,n=!1){if(!(t>0))return e;const i=Math.ceil(e/t-ht)*t;return n&&i<=e+ht?i+t:i}class Hl{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new ai({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??Il}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-ht&&(this.stopTime===null||t<this.stopTime-ht)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-ht?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=jl(t/n),i=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:i,barPhase:i/n}}nextBar(t,n=!1){return pr(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const hr="nc-clock/snapshot",fr=1;function _l(e,t="local"){return{format:hr,version:fr,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function Wl(e,t){const n=Ul(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const xe=e=>typeof e=="number"&&Number.isFinite(e),Qi=e=>e===null||xe(e);function Ul(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==hr&&n("format"),(!xe(t.version)||Math.floor(t.version)!==fr)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!xe(t.anchor.beat)||!xe(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&xe(a.beat)&&xe(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!xe(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!xe(t.meter.beatUnit))&&n("meter"),(!Qi(t.startTime)||!Qi(t.stopTime)||!xe(t.stoppedBeat))&&n("transport times"),t}class Gl{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new Hl(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){Wl(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return _l(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const Yl="nc-sync/1",Kl=1,Xl="nc-sync",Vl="nc-sync-leader",Ql=0,mr=.5,gr=.75;function Jl(e){return typeof e=="number"&&Number.isFinite(e)&&e>=mr&&e<=gr?e:null}const ta=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Ft=e=>typeof e=="number"&&Number.isFinite(e),dn=e=>typeof e=="string"&&e.length>0;function Zl(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==Kl||!dn(t.type)||!dn(t.from)||!Ft(t.term)||!Ft(t.seq)||!Ft(t.sentAt))return null;switch(t.type){case"hello":return dn(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return Ft(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&Ft(t.slot)?t:null;case"ping":case"pong":return dn(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function ec(e,t,n,a,i){return{proto:Yl,from:t,term:n,seq:a,sentAt:i,...e}}function Q(){return(performance.timeOrigin+performance.now())/1e3}const na=.003,tc=3,aa=.002+1e-6,nc=.01,Ji=500;class Zi{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?nc:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=na&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const i=n-(this.timeOrigin+a)/1e3,r=this.median(),s=i-r,l=Math.abs(i-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!d&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(i,r,d))):(this.pendingStep=s,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const i=this.ctx.currentTime,r=i<=this.revertUntil;let s;if(a&&r){const l=this.offsets,d=this.preStep;l.length=0;for(let u=0;u<d.length;u++)l.push(d[u]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:i,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!r){const u=this.offsets,c=this.preStep;c.length=0;for(let p=0;p<u.length;p++)c.push(u[p]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?i+this.stepRevert:-1/0}const l=this.offsets,d=t-n;for(let u=0;u<l.length;u++)l[u]+=d;this.stepCount++,s={stepSeconds:t-n,confirmedAt:i,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let r=0;r<a;r++){const s=t[r];let l=r-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const i=a>>1;return a%2?n[i]:(n[i-1]+n[i])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.readLatency(!1);let n=null,a=!1;const i=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=na&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Ji)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),n=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3,a=!0;else if(!i||!(i.contextTime>=na)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<Ji)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(tc,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let i=-1,r=0;for(let l=0;l<n;l++){let d=0;for(let u=0;u<n;u++)Math.abs(t[u]-t[l])<=aa&&d++;d>r&&(i=l,r=d)}if(r<a)return;const s=t[i];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>aa&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-(this.offset-this.userOffsetMs/1e3))<=aa}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const i=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(i,2)};setTimeout(i,2)})}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,i=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(i)&&i>0?i:null}}class ac{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...ta,...t.capabilities},this.channelOption=t.channel??Xl,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const i=this.o.now(),r=()=>{n===this.startWaits&&t(i)};return a.then(r,r),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const i=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(i),0)}else{const i=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?i:Math.max(t+this.o.gatedStartLeadSeconds,i),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[i,r]=this.tempoRange();t=Math.min(r,Math.max(i,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const d=s.beatAt(l+this.o.minLeadSeconds),u=Math.max(n??pr(d,1),d);a&&a>0?(s.tempo.rampTempo(t,u,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,u),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(gr,Math.max(mr,t)):Ql;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=Jl(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=Zl(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const i=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...ta,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),i||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const r of this.peers.values())r.leader=r.id===n.from;const i=this.peers.get(n.from);i?i.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...ta},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(i=>{this.leader&&this.decideStart(i)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const i of[...this.snapshotListeners])i(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const i of[...this.messageListeners])i(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(Vl,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(r,s,l)=>[r?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),i=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const s=n(r.capabilities.prefersLeader,r.joinedAt,r.id);(i===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,i=r.id)}this.setLeader(i===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],i=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==i[0]?a[0]<i[0]:a[1]!==i[1]?a[1]<i[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const i=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>i&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(ec(t,this.id,this.term,++this.seq,this.o.now()))}}const ic="modulepreload",oc=function(e){return"/nyx/"+e},eo={},rc=function(t,n,a){let i=Promise.resolve();if(n&&n.length>0){let s=function(u){return Promise.all(u.map(c=>Promise.resolve(c).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),d=l?.nonce||l?.getAttribute("nonce");i=s(n.map(u=>{if(u=oc(u),u in eo)return;eo[u]=!0;const c=u.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":ic,c||(f.as="script"),f.crossOrigin="",f.href=u,d&&f.setAttribute("nonce",d),document.head.appendChild(f),c)return new Promise((g,w)=>{f.addEventListener("load",g),f.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return i.then(s=>{for(const l of s||[])l.status==="rejected"&&r(l.reason);return t().catch(r)})};var sc=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],xa=[.25,.5,.75,1,1.5,2],lc=4.9,_={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},Ue={fmt:"wet"},me={fmt:"pct"},rt={fmt:"db"},un={fmt:"signedPct"},ia={fmt:"num",suffix:" ms"},j={div:100};function L(e,t,n,a,i,r,s,l){var d={key:e,label:t,min:n,max:a,default:i,step:1,k:r,unit:null,format:s};if(l)for(var u in l)d[u]=l[u];return d}function pn(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var Rt=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[L("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:_.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[L("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:_.hpHz,astrid:!0,zero:"off"}),L("q","Resonance",0,100,0,2,{fmt:"q",law:_.hpQ},{dsp:{law:_.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[L("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:_.bpHz,astrid:!0},{dsp:{law:_.bpHz}}),L("q","Q",0,100,0,2,{fmt:"q",law:_.bpQ},{dsp:{law:_.bpQ}}),L("mix","Mix",0,100,100,3,Ue,{dsp:j,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[L("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:pn(sc),overriddenBy:"beats_free",tempoSynced:!0}),L("feedback","Feedback",0,90,35,2,me,{dsp:j,unit:"%"}),L("mix","Wet/dry",0,100,0,3,Ue,{dsp:j,unit:"%",astridKey:"wet"}),L("tone","Tone",0,100,100,4,{fmt:"hz",law:_.delayTone,offAt:100},{dsp:{div:99},more:!0}),L("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),L("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:pn([[0,"Insert"],[1,"Send"]]),more:!0}),L("send","Send",0,100,100,7,me,{dsp:j,unit:"%",more:!0}),L("mod_send","Accent → send",-100,100,0,8,un,{dsp:j,unit:"%",more:!0}),L("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[L("predelay","Pre-delay",0,200,0,1,ia,{dsp:{div:1e3},unit:"ms"}),L("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:j,unit:"%"}),L("decay","Decay",0,100,50,3,me,{dsp:j,unit:"%"}),L("damping","Damping",0,100,0,4,me,{dsp:j,unit:"%"}),L("mix","Mix",0,100,0,5,Ue,{dsp:j,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[L("rate","Rate",0,100,26,1,{fmt:"rate",law:_.rate},{dsp:{law:_.rate}}),L("depth","Depth",0,100,70,2,me,{dsp:j,unit:"%"}),L("feedback","Feedback",-90,90,50,3,un,{dsp:j,unit:"%"}),L("mix","Mix",0,100,50,4,Ue,{dsp:j,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[L("rate","Rate",0,100,52,1,{fmt:"rate",law:_.rate},{dsp:{law:_.rate}}),L("depth","Depth",0,100,50,2,me,{dsp:j,unit:"%"}),L("spread","Spread",0,100,70,3,me,{dsp:j,unit:"%"}),L("mix","Mix",0,100,40,4,Ue,{dsp:j,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[L("rate","Rate",0,100,39,1,{fmt:"rate",law:_.rate},{dsp:{law:_.rate}}),L("depth","Depth",0,100,70,2,me,{dsp:j,unit:"%"}),L("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:pn([[4,"4"],[6,"6"],[8,"8"]])}),L("feedback","Feedback",0,90,30,4,me,{dsp:j,unit:"%"}),L("mix","Mix",0,100,50,5,Ue,{dsp:j,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[L("low_db","Low",-18,18,0,1,rt,{unit:"dB"}),L("mid_db","Mid",-18,18,0,2,rt,{unit:"dB"}),L("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:_.midHz,astrid:!0},{dsp:{law:_.midHz}}),L("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:_.eqQ},{dsp:{law:_.eqQ}}),L("high_db","High",-18,18,0,4,rt,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[L("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),L("output_db","Output",-12,12,0,2,rt,{unit:"dB"}),L("mix","Mix",0,100,100,3,Ue,{dsp:j,unit:"%"}),L("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:pn([[0,"Smooth"],[1,"Acid"]]),more:!0}),L("tone","Tone",0,100,100,5,{fmt:"hz",law:_.driveTone,offAt:100},{dsp:{div:99},more:!0}),L("mod_drive","Accent → drive",-100,100,0,6,un,{dsp:j,unit:"%",more:!0}),L("mod_tone","Accent → tone",-100,100,0,7,un,{dsp:j,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[L("threshold_db","Threshold",-60,0,0,1,rt,{unit:"dB"}),L("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:_.ratio},{dsp:{law:_.ratio}}),L("attack_ms","Attack",1,100,10,3,ia,{unit:"ms"}),L("release_ms","Release",10,1e3,150,4,ia,{unit:"ms"}),L("makeup_db","Makeup",0,24,0,5,rt,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[L("width","Width",0,200,100,1,me,{dsp:j,unit:"%"}),L("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:j})]}],cc=Rt.map(function(e){return e.type});Rt.filter(function(e){return!e.hidden}).map(function(e){return e.type});var dc={reverb:"plate"};function ii(e){var t=dc[e]||e;return cc.indexOf(t)>=0?t:null}function Fe(e){for(var t=ii(e),n=0;n<Rt.length;n++)if(Rt[n].type===t)return Rt[n];return null}function ut(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function br(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=ut(n.law,t);return a===null?0:a}function to(e,t){return Math.min(lc,e*60/(t>0?t:120))}var no=function(e){return e>0?"+":e<0?"−":""};function uc(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function yr(e,t,n){var a=e.format,i;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:no(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return no(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(i=ut(a.law,t),i===null?a.zero||"open":a.astrid?uc(i):i+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+ut(a.law,t).toFixed(1);case"ratio":return ut(a.law,t).toFixed(1)+":1";case"rate":return i=ut(a.law,t),(i<1?i.toFixed(2):i<10?i.toFixed(1):i.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var r=0;r<e.options.length;r++)if(e.options[r].value===t)return e.options[r].label;return String(t);case"tempoMs":return Math.round(to(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(to(t,n)*1e3)+" ms"}return String(t)}var pc=1,Wn=["drive","delay","plate"];function hc(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,i){return yr(e,a,i)},t}var It=Wn.map(function(e){var t=Fe(e),n={type:e,label:t.label,dials:t.dials.map(hc)};return t.tempoSynced&&(n.tempoSynced=!0),n}),fc={reverb:"plate"};function Tn(e){var t=fc[e]||e;return Wn.indexOf(t)>=0?t:null}function Un(e){for(var t=Tn(e),n=0;n<It.length;n++)if(It[n].type===t)return It[n];return null}function wr(e,t){var n=Un(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function gt(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function He(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,i=1;i<e.options.length;i++)Math.abs(e.options[i].value-t)<Math.abs(a-t)&&(a=e.options[i].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var r=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*r)/r))+0}function mc(){return{v:pc,chain:It.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function gc(e){return xa.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},xa[0])}function oa(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function bc(e){for(var t=Array.isArray(e)?e:oa(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=mc(),i={},r=[],s=0;s<t.length;s++){var l=t[s];if(oa(l)){var d=Tn(l.type);if(!d){typeof l.type=="string"&&r.push(l.type);continue}if(i[d]){r.push(d);continue}i[d]=!0;var u=a.chain[Wn.indexOf(d)],c=oa(l.dials)?l.dials:{};d==="delay"&&c.mix===void 0&&c.wet!==void 0&&(c=Object.assign({},c,{mix:c.wet})),u.bypass=n?l.bypass===!0:l.bypass!==!1,Un(d).dials.forEach(function(p){u.dials[p.key]=He(p,c[p.key])}),yc(d,u.dials,c)}}return{state:a,dropped:r}}function yc(e,t,n){for(var a=Un(e),i=0;i<a.dials.length;i++){var r=a.dials[i];r.stepWhen&&(t[r.key]=He(r,n&&typeof n[r.key]=="number"?n[r.key]:t[r.key],gt(r,t)))}}function ka(e){return bc(e).state}function wc(e){return JSON.parse(JSON.stringify(e))}var vc=24,$a={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Ea(e,t,n){if(t==="bypass")return n?0:1;var a=wr(e,t)||xc(e,t);return a?br(a,n):0}function xc(e,t){var n=Fe(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var kc={};It.forEach(function(e){e.dials.forEach(function(t){kc[e.type+"."+t.key]=t.format})});function ra(e,t){var n=new Float64Array(vc),a=ka(e);return a.chain.forEach(function(i){var r=$a[i.type];n[r.bypass]=i.bypass?0:1,Object.keys(i.dials).forEach(function(s){n[r[s]]=Ea(i.type,s,i.dials[s])})}),n}var $c=2,Ln=3,Ec=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Nt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function vr(e,t){var n=Fe(e);if(!n)return null;var a={};(t||[]).forEach(function(s){s&&s.id&&(a[s.id]=!0)});for(var i=1;a[n.type+"-"+i];)i++;var r={};return n.dials.forEach(function(s){r[s.key]=s.default}),{id:n.type+"-"+i,type:n.type,bypass:!1,dials:r}}function Ac(e){var t=Fe(e.type),n=/-(\d+)$/.exec(e.id||"");return(t?t.label:e.type)+(n&&+n[1]>1?" "+n[1]:"")}function Sc(e,t,n){var a=e.length-1,i=Math.max(0,Math.min(a,n));if(t<0||t>a||t===i)return e;var r=e.slice(),s=r.splice(t,1)[0];return r.splice(i,0,s),r}function Mc(e){return typeof e=="number"&&isFinite(e)?gc(e):e}function ao(e,t,n){var a={};return e.dials.forEach(function(i){var r=t[i.key];r===void 0&&i.astridKey&&(r=t[i.astridKey]),n&&e.type==="delay"&&i.key==="delay_beats"&&(r=Mc(r)),a[i.key]=He(i,r)}),e.dials.forEach(function(i){i.stepWhen&&(a[i.key]=He(i,typeof t[i.key]=="number"?t[i.key]:a[i.key],gt(i,a)))}),a}function Tc(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,i=1/0,r=e.min;r<=e.max;r++){var s=ut(n.law,r),l=s===null?1/0:Math.abs(s-t);l<i&&(i=l,a=r)}return a}}var Lc={rate:"rate_hz"};function Cc(e,t,n,a){var i={};return e.dials.forEach(function(r){if(!r.more){var s=r.astridKey||Lc[r.key]||r.key;i[r.key]=Tc(r,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),i}function Fc(e,t){var n=t>0?Math.floor(t):Ln,a=[],i=[],r=[],s=!1,l=!1;Array.isArray(e)?(r=e,l=!0):Nt(e)&&Array.isArray(e.chain)&&(r=e.chain,s=e.v===1,l=e.schema===2);for(var d=[],u=0;u<r.length;u++){var c=r[u];if(Nt(c)&&!(c.type==="limiter"||c.fixed===!0)){var p=ii(c.type),f=p&&Fe(p);if(!f||s&&["drive","delay","plate"].indexOf(p)<0){typeof c.type=="string"&&a.push(c.type);continue}if(d.length>=n){a.push(c.id||p);continue}var g;Nt(c.params)&&!Nt(c.dials)?g=ao(f,Cc(f,c.params,i,c.id||p),l):g=ao(f,Nt(c.dials)?c.dials:{},l);var w=vr(p,d),y=typeof c.id=="string"&&Ec.test(c.id)&&!d.some(function(m){return m.id===c.id})?c.id:w.id,h=s?c.bypass!==!1:c.bypass===!0;d.push({id:s?w.id:y,type:p,bypass:h,dials:g})}}return{state:{v:$c,chain:d},dropped:a,notes:i}}function wn(e,t){return Fc(e,t).state}function st(e){var t=Fe(e.type),n=[[0,e.bypass?0:1]];return t.dials.forEach(function(a){n.push([a.k,br(a,e.dials[a.key])])}),n}function Nc(e){var t=wn(e,8),n=[],a=t.chain.map(function(i,r){var s=Fe(i.type),l={};return r>=Ln&&n.push(i.id+": ASTRID keeps three hacks"),s.dials.forEach(function(d){var u=i.dials[d.key];if(d.more){u!==d.default&&n.push(i.id+"."+d.key);return}d.key==="delay_beats"&&xa.indexOf(u)<0&&n.push(i.id+".delay_beats"),l[d.astridKey||d.key]=u}),{id:i.id,type:i.type,bypass:i.bypass,dials:l}});return{hacks:a,lossy:n}}var zc="nc-fx@1",Pc=600,Dc=256,qc=8,zt=typeof WeakMap=="function"?new WeakMap:null;function Bc(e,t){var n=zt&&zt.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await rc(async()=>{const{default:r}=await import("./worklet-source-BibsVBZk.js");return{default:r}},[])).default,i=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(i)}finally{URL.revokeObjectURL(i)}})(),zt&&(zt.set(e,n),n.catch(function(){zt.delete(e)})),n)}function lt(e,t){return typeof e=="number"&&isFinite(e)?e:t}function xr(e,t,n,a){var i=Math.min(400,Math.max(20,lt(t.bpm,120))),r=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",d=lt(t.preGain,1),u=Math.max(0,lt(t.crossfade,.012)),c=lt(t.maxDelaySeconds,void 0),p=e.createGain(),f=e.createGain(),g=e.createGain(),w=e.createGain(),y=null;t.modInput===!0&&(y=e.createGain(),y.channelCount=1,y.channelCountMode="explicit",y.channelInterpretation="discrete"),w.gain.value=0,p.connect(g),g.connect(f),w.connect(f);var h={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:i,mUsers:0,lv:null,lvAt:0},m=n(i);h.post=function($){h.node?h.node.port.postMessage($):h.disposed||(r.length>=Dc&&(r=a().concat([{t:"tempo",bpm:h.bpm,when:0}]),h.mUsers>0&&r.push({t:"meter",on:!0})),r.push($))};function b($){var x=r.map(function(M){var C=Object.assign({},M);return C.when>$||(C.when=0,C.t!=="clear"&&(C.snap=!0)),C});return r=[],x}h.emit=function($){for(var x=0;x<h.listeners.length;x++)try{h.listeners[x]($)}catch(M){typeof console<"u"&&console.error(M)}},h.whenOf=function($){return typeof $=="number"&&isFinite($)&&$>0?$:0};var v=!1;h.tooFar=function($){return typeof $=="number"&&$>e.currentTime+Pc?(!v&&typeof console<"u"&&(v=!0,console.warn("nc-fx: ignoring a time "+Math.round($-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var E=Bc(e,t.moduleUrl).then(function(){if(!h.disposed){var $=Object.assign({bpm:i,bypassMode:l,limiter:s,preGain:d,maxDelaySeconds:c},m);$.pending=b(e.currentTime),h.node=new AudioWorkletNode(e,zc,{numberOfInputs:y?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:$}),h.node.port.onmessage=function(M){var C=M.data;C&&C.t==="lv"&&h.mUsers>0&&(h.lv=C.d,h.lvAt=io())},p.connect(h.node),y&&y.connect(h.node,0,1),h.node.connect(w);var x=e.currentTime;x<=0||u===0?(g.gain.value=0,w.gain.value=1):(g.gain.setValueAtTime(1,x),g.gain.linearRampToValueAtTime(0,x+u),w.gain.setValueAtTime(0,x),w.gain.linearRampToValueAtTime(1,x+u)),h.status="ready"}},function($){h.status="unavailable",r=[],h.error=$});h.meterOpen=function(){return h.disposed||h.status==="unavailable"?!1:(h.mUsers++===0&&h.post({t:"meter",on:!0}),!0)},h.meterClose=function(){h.mUsers!==0&&--h.mUsers===0&&(h.lv=null,h.disposed||h.post({t:"meter",on:!1}))},h.levels=function(){return h.lv&&io()-h.lvAt<Oc?h.lv:null};var A={};return h.meter=function($,x){if(A[$])return A[$];var M=0,C={in:0,out:0},H={open:function(){return h.meterOpen()?(M++,!0):!1},close:function(){M!==0&&(M--,h.meterClose())},read:function(){var K=M>0?h.levels():null;return C.in=0,C.out=0,K&&x(K,C),C}};return A[$]=H,H},h.core={input:p,output:f,modInput:y,ready:E,get status(){return h.status},get error(){return h.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function($,x){var M=lt($,NaN);!(M>0)||h.disposed||h.tooFar(x)||(h.bpm=Math.min(400,Math.max(20,M)),h.post({t:"tempo",bpm:h.bpm,when:h.whenOf(x)}),h.emit({effect:null,key:"tempo",value:h.bpm}))},getTempo:function(){return h.bpm},clear:function($){var x=$&&typeof $=="object"?$:{at:$};if(!(h.disposed||h.tooFar(x.at))){var M=lt(x.fadeMs,0);h.post({t:"clear",when:h.whenOf(x.at),fadeMs:M>0?Math.min(1e3,M):0})}},onChange:function($){return h.listeners.push($),function(){var x=h.listeners.indexOf($);x>=0&&h.listeners.splice(x,1)}},dispose:function(){if(!h.disposed){if(h.disposed=!0,h.status="disposed",r=[],h.listeners.length=0,h.node){h.node.port.postMessage({t:"dispose"}),h.node.port.close();try{h.node.disconnect()}catch{}}[p,g,w,f,y].forEach(function($){try{$&&$.disconnect()}catch{}})}}},h}var Oc=250;function io(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function kr(e,t){t.in=e[0],t.out=e[1]}function Rc(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function Ic(e,t){var n=t||{};if(n.slots)return jc(e,n);var a=ka(n.state),i=Array.from(ra(a)),r=xr(e,n,function(){return{program:i}},function(){return[{t:"load",program:Array.from(ra(a)),when:0}]}),s=r.core;function l(d){return a.chain[Wn.indexOf(d)]}return s.setParam=function(d,u,c,p){var f=Tn(d);if(!(!f||r.disposed||r.tooFar(p))){var g=l(f),w;if(u==="bypass")w=!!c;else{var y=wr(f,u);if(!y)return;w=He(y,c,gt(y,g.dials))}return u==="bypass"?g.bypass=w:g.dials[u]=w,r.post({t:"p",i:$a[f][u],v:Ea(f,u,w),when:r.whenOf(p)}),r.emit({effect:f,key:u,value:w}),Un(f).dials.forEach(function(h){if(!(!h.stepWhen||!h.stepWhen.some(function(v){return v.key===u}))){var m=g.dials[h.key],b=He(h,m,gt(h,g.dials));b!==m&&(g.dials[h.key]=b,r.post({t:"p",i:$a[f][h.key],v:Ea(f,h.key,b),when:r.whenOf(p)}),r.emit({effect:f,key:h.key,value:b}))}}),w}},s.meter=function(){return r.meter("",kr)},s.getParam=function(d,u){var c=Tn(d);if(c){var p=l(c);return u==="bypass"?p.bypass:p.dials[u]}},s.getState=function(){return wc(a)},s.setState=function(d,u){r.disposed||r.tooFar(u&&u.at)||(a=ka(d),r.post({t:"load",program:Array.from(ra(a)),when:r.whenOf(u&&u.at)}),r.emit({effect:null,key:null,value:null}))},s}function jc(e,t){var n=t.slots===!0?Ln:Math.max(1,Math.min(qc,Math.floor(+t.slots)||Ln)),a=wn(t.state,n),i=1,r={};function s(h){return r[h.id]||(r[h.id]=i++),r[h.id]}function l(h){return h.map(function(m){return{uid:s(m),type:m.type,program:st(m)}})}var d=l(a.chain),u=a.chain.map(function(h){return r[h.id]}),c=xr(e,t,function(){return{slots:n,chain:d,order:u}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(h){return r[h.id]}),when:0}]}),p=c.core;function f(h){var m;for(m=0;m<a.chain.length;m++)if(a.chain[m].id===h)return a.chain[m];var b=ii(h);if(b){for(m=0;m<a.chain.length;m++)if(a.chain[m].type===b)return a.chain[m]}return null}function g(h,m){var b=s(h);c.post({t:"add",uid:b,type:h.type,when:m}),st(h).forEach(function(v){c.post({t:"ps",uid:b,k:v[0],v:v[1],when:m,snap:!0})})}function w(h){c.post({t:"order",uids:a.chain.map(function(m){return r[m.id]}),when:h})}function y(h,m){var b={};a.chain.forEach(function(A){b[A.id]=A});var v=a.chain.map(function(A){return r[A.id]}).join();h.chain.forEach(function(A){var $=b[A.id];if(!$||$.type!==A.type){delete r[A.id],g(A,m);return}var x={};st($).forEach(function(M){x[M[0]]=M[1]}),st(A).forEach(function(M){x[M[0]]!==M[1]&&c.post({t:"ps",uid:r[A.id],k:M[0],v:M[1],when:m})})});var E={};h.chain.forEach(function(A){E[A.id]=!0}),Object.keys(r).forEach(function(A){E[A]||delete r[A]}),a=h,a.chain.map(function(A){return r[A.id]}).join()!==v&&w(m)}return p.slots=n,p.meter=function(h){return h==null||h===""?c.meter("",kr):c.meter("#"+h,function(m,b){var v=f(h),E=v?r[v.id]:0,A=m[2];if(E){for(var $=3,x=0;x<A;x++,$+=3)if(m[$]===E){b.in=m[$+1],b.out=m[$+2];return}}})},p.setParam=function(h,m,b,v){var E=f(h);if(!(!E||c.disposed||c.tooFar(v))){var A=Fe(E.type),$,x=null;if(m==="bypass")$=!!b;else{for(var M=0;M<A.dials.length;M++)A.dials[M].key===m&&(x=A.dials[M]);if(!x)return;$=He(x,b,gt(x,E.dials))}var C={},H={};st(E).forEach(function(z){C[z[0]]=z[1]}),A.dials.forEach(function(z){z.stepWhen&&(H[z.key]=E.dials[z.key])}),m==="bypass"?E.bypass=$:E.dials[m]=$,A.dials.forEach(function(z){z.stepWhen&&(E.dials[z.key]=He(z,E.dials[z.key],gt(z,E.dials)))});var K=c.whenOf(v),fe=r[E.id];return st(E).forEach(function(z){(C[z[0]]!==z[1]||x&&z[0]===x.k)&&c.post({t:"ps",uid:fe,k:z[0],v:z[1],when:K})}),c.emit({effect:E.id,key:m,value:$}),Object.keys(H).forEach(function(z){z!==m&&E.dials[z]!==H[z]&&c.emit({effect:E.id,key:z,value:E.dials[z]})}),$}},p.getParam=function(h,m){var b=f(h);if(b)return m==="bypass"?b.bypass:b.dials[m]},p.getState=function(){return JSON.parse(JSON.stringify(a))},p.setState=function(h,m){c.disposed||c.tooFar(m&&m.at)||(y(wn(h,n),c.whenOf(m&&m.at)),c.emit({effect:null,key:null,value:null}))},p.addEffect=function(h,m){var b=m||{},v=vr(h,a.chain);if(!(!v||a.chain.length>=n||c.disposed||c.tooFar(b.at))){if(b.dials){var E=wn({v:2,chain:[{id:v.id,type:v.type,dials:b.dials}]},1).chain[0];v.dials=E.dials}b.bypass===!0&&(v.bypass=!0);var A=a.chain.slice(),$=typeof b.index=="number"?Math.max(0,Math.min(A.length,b.index)):A.length;return A.splice($,0,v),y({v:2,chain:A},c.whenOf(b.at)),c.emit({effect:v.id,key:"chain",value:"add"}),v.id}},p.removeEffect=function(h,m){var b=f(h),v=m&&m.at;return!b||c.disposed||c.tooFar(v)?!1:(y({v:2,chain:a.chain.filter(function(E){return E!==b})},c.whenOf(v)),c.emit({effect:b.id,key:"chain",value:"remove"}),!0)},p.moveEffect=function(h,m,b){var v=f(h),E=b&&b.at;if(!v||c.disposed||c.tooFar(E))return!1;var A=Sc(a.chain,a.chain.indexOf(v),m);return A===a.chain?!1:(y({v:2,chain:A},c.whenOf(E)),c.emit({effect:v.id,key:"chain",value:"move"}),!0)},p.getChain=function(){return a.chain.map(function(h){return{id:h.id,type:h.type,name:Ac(h),bypass:h.bypass}})},p.toAstrid=function(){return Nc(a)},p}function oo(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function Hc(e,t,n){var a=n||{},i=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,r=typeof a.toAudioTime=="function"?a.toAudioTime:i?function(f){return i.toContextTime(f)}:t&&t.timebase==="shared"?null:function(f){return f},s=typeof a.now=="function"?a.now:i&&typeof i.sharedNow=="function"?function(){return i.sharedNow()}:null,l=t&&t.transport?t.transport:t,d=l&&l.tempo?l.tempo:l,u=!1;function c(f){if(!r){!u&&typeof console<"u"&&(u=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof f!="number")){var g=r(l.timeAt(f));return typeof g=="number"&&isFinite(g)?g:void 0}}function p(){var f=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(f)){var g=l&&typeof l.bpm=="number"?l.bpm:oo(d,0);g>0&&e.setTempo(g);return}var w=oo(d,f);w>0&&e.setTempo(w);for(var y=d&&(d.points||d.tempoPoints)||[],h=0;h<y.length;h++){var m=y[h];if(m.beat>f&&m.bpm>0){var b=c(m.beat);b!==void 0&&e.setTempo(m.bpm,b)}}}return p(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(f){f&&(f.kind==="tempo"&&f.bpm>0?e.setTempo(f.bpm,c(f.atBeat)):(f.kind==="snapshot"||f.kind==="start")&&p())})}const _c="/nyx/assets/worklet-CAv1bvAp.js";var Wc="nc-ui",Uc={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","nyx-amber":"#FEAA02","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},oi={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#9B30FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Cn={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Gc={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Oe={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Yc={light:{color:Uc.color,semantic:oi,component:Cn,runtime:Gc},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},qt=e=>`--${Wc}-${e}`,Aa=oi["label-on-fill-dark"],ro=oi["label-on-fill-light"],Kc=Oe["label-min-contrast"],Xc=/^#[0-9a-f]{6}$/i,Vc=e=>typeof e=="string"&&Xc.test(e),vn=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function so(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),i=r=>{let s=(r+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${vn(i(0)*255)}${vn(i(8)*255)}${vn(i(4)*255)}`}function $r(e){let[t,n,a]=[1,3,5].map(u=>parseInt(e.slice(u,u+2),16)/255),i=Math.max(t,n,a),r=Math.min(t,n,a),s=(i+r)/2,l=i-r;if(!l)return{h:0,s:0,l:s};let d=l/(1-Math.abs(2*s-1));return{h:((i===t?60*((n-a)/l%6):i===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:d,l:s}}function lo(e){let[t,n,a]=[1,3,5].map(i=>{let r=parseInt(e.slice(i,i+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function Sa(e,t){let[n,a]=[lo(e),lo(t)].sort((i,r)=>r-i);return(n+.05)/(a+.05)}var Fn=e=>Sa(e,Aa)>=Sa(e,ro)?Aa:ro;function Er(e,t,n,a=Kc){let i=so(e,t,n),r=Fn(i)===Aa?1:-1;for(let s=0;s<40&&Sa(i,Fn(i))<a;s++)n+=r*.01,i=so(e,t,n);return i}function Qc(e){let{h:t,s:n}=$r(e),a=Er(t,Math.min(n,Oe["surprise-on-max-saturation"]),Oe["surprise-on-lightness"]);return{fill:e,ink:Fn(e),on:a,onInk:Fn(a)}}var Jc=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function Zc(e,t=Math.random){let[n,a]=Oe["surprise-saturation"],[i,r]=Oe["surprise-lightness"],s=Oe["surprise-min-hue-gap"],l=Vc(e)?$r(e).h:null,d=t()*360;return l!==null&&Jc(d,l)<s&&(d=(l+s+t()*(360-2*s))%360),Er(d,n+t()*(a-n),i+t()*(r-i))}function ed(e){if(!e)return null;let t=Qc(e);return{[qt("surprise-fill")]:t.fill,[qt("surprise-ink")]:t.ink,[qt("surprise-on")]:t.on,[qt("surprise-on-ink")]:t.onInk}}var td=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,nd=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function co(e){let[t,n,a]=[1,3,5].map(l=>td(parseInt(e.slice(l,l+2),16)/255)),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),r=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*i+.793617785*r-.0040720468*s,1.9779984951*i-2.428592205*r+.4505937099*s,.0259040371*i+.7827717662*r-.808675766*s]}function ad([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,i=(e-.1055613458*t-.0638541728*n)**3,r=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*i+.2309699292*r,-1.2684380046*a+2.6097574011*i-.3413193965*r,-.0041960863*a-.7034186147*i+1.707614701*r].map(s=>vn(nd(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var id=Oe["velocity-range"],Ar={min:Cn.rhythm["velocity-min"],max:Cn.rhythm["velocity-max"]},uo=Object.fromEntries(Object.entries(Yc).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function od(e,t=Ar){let[n,a]=id,i=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,r=(i-n)/(a-n),s=t.ink??Cn.rhythm["step-cell-ink"];if(r<=0)return{velocity:i,t:0,fill:t.min.toUpperCase(),ink:s};if(r>=1)return{velocity:i,t:1,fill:t.max.toUpperCase(),ink:s};let l=co(t.min),d=co(t.max);return{velocity:i,t:r,fill:ad(l.map((u,c)=>u+(d[c]-u)*r)),ink:s}}function po(e,t=Ar){return{[qt("velocity-fill")]:od(e,t).fill}}var Sr="data-nc-theme",ho="nc-ui-theme-change",rd="(prefers-color-scheme: dark)",Mr=e=>e?.documentElement??null,Tr=e=>e?.defaultView?.matchMedia?.(rd)??null,sd=e=>e==="light"||e==="dark"?e:"system";function ld(e=globalThis.document){return sd(Mr(e)?.getAttribute(Sr))}function Ma(e=globalThis.document){let t=ld(e);return t!=="system"?t:Tr(e)?.matches?"dark":"light"}function Lr(e,t=globalThis.document){let n=Mr(t);if(!n)return()=>{};let a=Ma(t),i=()=>{let d=Ma(t);d!==a&&(a=d,e(d))},r=t.defaultView?.MutationObserver,s=r?new r(i):null;s?.observe(n,{attributes:!0,attributeFilter:[Sr]});let l=Tr(t);return l?.addEventListener?.("change",i),t.addEventListener(ho,i),()=>{s?.disconnect(),l?.removeEventListener?.("change",i),t.removeEventListener(ho,i)}}var cd={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},dd={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","eq-graph-height":"length","eq-graph-height-max":"length","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},ud={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},pd={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Gn={};for(let[e,t]of Object.entries(dd))Gn[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(pd))Gn[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(ud))Gn[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(cd.renames.map(e=>[e.old,e.new]));function Cr(e){let t=Gn[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function W(e){return Cr(e).prop}function o(e){return`var(${W(e)})`}function hd(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(W(t)));return Number.isFinite(n)?n:0}function U(e,t){let n=Cr(t),a=e.ownerDocument??document,i=a.createElement("span");i.dataset.ncLive=t,i.style.position="absolute",i.style.pointerEvents="none";let r=`var(${n.prop})`;n.kind==="family"?i.style.fontFamily=r:n.kind==="length"||n.kind==="other"||n.kind==="duration"?i.style.paddingLeft=r:i.style.color=r,(e instanceof Element?e:a.documentElement).append(i);let s=(a.defaultView??window).getComputedStyle(i),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return i.remove(),l}function Fr(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function fd(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=o("font-ui"),n.style.fontSize=o("label-size"),n.style.fontWeight=o("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var md="[data-modulated], [data-modulated] *";function sa(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function fo(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${o("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${o("hairline")} solid ${o("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function gd(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${o(`module-bg-stack-${a}`)};
      ${W("text-sub")}: ${o(`module-sub-stack-${a}`)};
      ${W("divider")}: ${o(`module-div-stack-${a}`)};
      ${W("slider-track")}: ${o(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${o(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${o(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${o("module-bg-stack-1")};
      ${W("text-sub")}: ${o("module-sub-stack-1")};
      ${W("divider")}: ${o("module-div-stack-1")};
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
${md} { transition: none; }
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
  ${W("text-sub")}: ${o("module-sub-stack-1")};
  ${W("divider")}: ${o("module-div-stack-1")};
  ${W("slider-track")}: ${o("module-div-stack-1")};
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
  ${W("text-sub")}: ${o("module-sub-stack-1")};
  ${W("divider")}: ${o("module-div-stack-1")};
  ${W("slider-track")}: ${o("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${o("control-gap")} ${o("module-pad")};
  padding-bottom: ${o("module-pad")};
  background: ${o("module-bg-stack-1")};
  ${W("text-sub")}: ${o("module-sub-stack-1")};
  ${W("divider")}: ${o("module-div-stack-1")};
  ${W("slider-track")}: ${o("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${o("stack-card-pad-y")} ${o("module-pad")} ${o("module-pad")};
  ${W("text-sub")}: inherit;
  ${W("divider")}: inherit;
  ${W("slider-track")}: inherit;
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
${fo("")}
}
@media (max-width: 1023px) {
${fo("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${sa("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${sa("")}
}
@media (max-width: 1023px) {
${sa("html[data-nc-landscape] ")}
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
`}var la=null,bd="nc-ui-fallback";function Nr(e=globalThis.document){if(!e?.documentElement||(e.documentElement,la&&la.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${bd} {
${gd()}
}
`,e.head.append(t),la=t}var Pt=null,yd=0,wd=new URL("/nyx/assets/confirm-BSJWrX8s.css",import.meta.url).href,zr=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=wd,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&zr(document);function Pr(e){return vd(e).then(t=>!!t.ok)}function vd({title:e,body:t,confirmLabel:n="Confirm",cancelLabel:a="Cancel",danger:i=!1,root:r,returnFocus:s,signal:l},d){if(Pt||l?.aborted)return Promise.resolve({});let u=r?.ownerDocument??document,c=zr(u),p=r??u.body,f=u.defaultView??globalThis,g=`nc-ui-confirm-${++yd}`,w=(P,ee,de)=>{let Pe=u.createElement(P);return Pe.className=`nc-ui-confirm${ee}`,de!=null&&(Pe.textContent=de),Pe},y=w("div","-layer");y.dataset.state="enter";let h=w("div","");h.setAttribute("role","alertdialog"),h.setAttribute("aria-modal","true"),h.setAttribute("aria-labelledby",`${g}-t`),h.setAttribute("aria-describedby",`${g}-b`);let m=w("h2","-title",e);m.id=`${g}-t`;let b=w("p","-body",t);b.id=`${g}-b`;let v=w("div","-actions"),E=(P,ee)=>{let de=w("button","-btn",P);return de.type="button",de.dataset.ncConfirm=ee,de.addEventListener("click",()=>ze(ee==="ok")),de},A=E(a,"cancel"),$=E(n,"ok");i&&($.dataset.danger="true"),v.append(A,$);let[x,M]=[];h.append(m,b,...x?[x]:[],v);let C=[M,A,$].filter(Boolean);y.append(h);let H={layer:y};Pt=H;let K=s??u.activeElement,fe=[];for(let P of p.children)P.hasAttribute("inert")||(P.setAttribute("inert",""),fe.push(P));let z=()=>{if(Pt!==H)return;p.append(y),(M??A).focus({preventScroll:!0});let P=f.requestAnimationFrame?.bind(f)??(ee=>setTimeout(ee,16));P(()=>P(()=>{y.dataset.state==="enter"&&(y.dataset.state="open")}))};c?c.then(z):z();let Ne=!1;y.addEventListener("pointerdown",P=>{Ne=P.target===y}),y.addEventListener("click",P=>{P.target===y&&Ne&&ze(!1),Ne=!1});let Lt=P=>{if(P.stopImmediatePropagation(),P.key==="Escape")P.preventDefault(),ze(!1);else if(P.key==="Tab"){P.preventDefault();let ee=C.filter(Pe=>!Pe.disabled),de=ee.length;ee[(ee.indexOf(u.activeElement)+(P.shiftKey?de-1:1))%de].focus()}else P.key==="Enter"&&(P.preventDefault(),u.activeElement===A?ze(!1):$.disabled||ze(!0))},Ct=P=>P.stopImmediatePropagation();f.addEventListener("keydown",Lt,!0),f.addEventListener("keyup",Ct,!0);let at=()=>ze(!1);l?.addEventListener("abort",at);let Z,cn=new Promise(P=>{Z=P});function ze(P){if(Pt!==H)return;Pt=null,f.removeEventListener("keydown",Lt,!0),f.removeEventListener("keyup",Ct,!0),l?.removeEventListener("abort",at);for(let it of fe)it.removeAttribute("inert");y.dataset.state="closing",K?.isConnected&&typeof K.focus=="function"&&K.focus({preventScroll:!0});let ee=f.getComputedStyle?.(y),de=Math.max(0,...String(ee?.transitionDuration??"").split(",").map(it=>Number.parseFloat(it)*(it.trim().endsWith("ms")?1:1e3)||0)),Pe=()=>y.remove();y.addEventListener("transitionend",it=>it.target===y&&Pe()),setTimeout(Pe,de+50),Z({ok:P,value:M?.value.trim()})}return cn}function Dr(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let i=t.createElement("span");i.dataset.ncOn="",i.textContent=e.onText??"On";let r=t.createElement("span");r.dataset.ncOff="",r.textContent=e.offText??"Off",a.append(i,r),n.append(a);let s=!1,l=u=>{s=u===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let d=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",d),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",d),n.remove()}}}var qr=new WeakMap,mo=.25;function xd(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let i=t.createElement("span");i.className="nc-fader-cap",i.setAttribute("aria-hidden","true"),n.append(a,i);let r=0,s=e.step??.005,l=e.onChange,d=e.onReset,u=h=>Math.min(1,Math.max(0,h)),c=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},p=h=>{let m=u(h);m!==r&&(r=m,c(),l?.(m))},f=0,g=!1;n.addEventListener("pointerdown",h=>{if(h.button!==0)return;h.preventDefault(),n.focus?.({preventScroll:!0});let m=n.getBoundingClientRect();h.target!==i&&m.height>0&&p(1-(h.clientY-m.top)/m.height),f=h.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(h.pointerId)}),n.addEventListener("pointermove",h=>{if(!g)return;let m=n.getBoundingClientRect().height||1,b=(f-h.clientY)/m*(h.shiftKey?mo:1);f=h.clientY,p(r+b)});let w=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",w),n.addEventListener("pointercancel",w),n.addEventListener("lostpointercapture",w),n.addEventListener("dblclick",h=>{h.preventDefault(),d?.()}),n.addEventListener("keydown",h=>{let m=h.shiftKey?s*mo:s,b={ArrowUp:r+m,ArrowRight:r+m,ArrowDown:r-m,ArrowLeft:r-m,PageUp:r+s*10,PageDown:r-s*10,Home:0,End:1};h.key in b&&(h.preventDefault(),p(b[h.key]))});let y={el:n,get value(){return r},get dragging(){return g},set(h){g||(r=u(Number(h)||0),c())},setText(h){h?n.setAttribute("aria-valuetext",h):n.removeAttribute("aria-valuetext")},setLabel(h){n.setAttribute("aria-label",h)},configure(h){typeof h.step=="number"&&h.step>0&&(s=h.step),h.onChange&&(l=h.onChange),h.onReset&&(d=h.onReset)}};return y.setLabel(e.label),y.set(e.value??0),y.setText(e.valueText),qr.set(n,y),y}function kd(e){return qr.get(e)}var Br=new WeakMap,$d=.2,Ed=1.5,Ad=.5;function Sd(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function go(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Sd(a.getComputedStyle(e).getPropertyValue(W(t)),n)}function Md(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let i=t.createElement("button");i.type="button",i.className="nc-meter-clip",i.dataset.lit="false";let r=t.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let s=[];for(let y=0;y<n;y++){let h=t.createElement("span");h.className="nc-meter-bar";let m=t.createElement("span");m.className="nc-meter-peak";let b=t.createElement("span");b.className="nc-meter-rms";let v=t.createElement("span");v.className="nc-meter-hold",h.append(m,b,v),r.append(h),s.push({peak:m,rms:b,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(i,r);let l=e.label,d=e.onClear,u=!1,c=-1,p=-1,f=()=>{i.dataset.lit=u?"true":"false",i.setAttribute("aria-pressed",u?"true":"false"),i.setAttribute("aria-label",u?`${l} clipped: clear`:`${l} clip light`),i.title=u?"Clipped. Click to clear":"Clip light"},g=(y,h,m,b)=>{let v=Math.round(b*1e3)/1e3;m[h]!==v&&(m[h]=v,y.style.transform=h==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};i.addEventListener("click",()=>{w.clear(),d?.()});let w={el:a,get clipped(){return u},update(y,h){c<0&&(c=go(a,"motion-meter-fall",$d)),p<0&&(p=go(a,"motion-meter-hold",Ed));let m=Math.max(0,Math.min(.25,Number(h)||0)),b=c>0?Math.exp(-m/c):0;s.forEach((v,E)=>{let A=y[E]??y[0]??{peak:0,rms:0},$=Math.min(1,Math.max(0,Number(A.peak)||0)),x=Math.min($,Math.max(0,Number(A.rms)||0));A.over&&w.clip(),v.level.peak=$>=v.level.peak?$:$+(v.level.peak-$)*b,v.level.rms=x>=v.level.rms?x:x+(v.level.rms-x)*b,v.holdAge+=m,$>=v.holdAt?(v.holdAt=$,v.holdAge=0):v.holdAge>p&&(v.holdAt=Math.max($,v.holdAt-Ad*m)),g(v.peak,"peak",v.shown,v.level.peak),g(v.rms,"rms",v.shown,v.level.rms),g(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){u||(u=!0,f())},clear(){u=!1,f()},reset(){for(let y of s)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,g(y.peak,"peak",y.shown,0),g(y.rms,"rms",y.shown,0),g(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,f()},configure(y){y.onClear&&(d=y.onClear)}};return f(),w.reset(),Br.set(a,w),w}function Td(e){return e?Br.get(e):void 0}var Ld=3,Cd=new Set(["freq","q","rate","time","log"]);function ri(e,t,n){return!e||!Cd.has(e)||!(n>t)?"linear":t>0?"log":"power"}function Yn(e,t,n){return ri(e,t,n)!=="linear"}function si(e,t,n,a){let i=Number(a);if(!(n>t)||!Number.isFinite(i))return 0;let r=Math.min(n,Math.max(t,i)),s=ri(e,t,n);if(s==="log")return Math.log(r/t)/Math.log(n/t);let l=(r-t)/(n-t);return s==="power"?Math.cbrt(l):l}function Or(e,t,n,a){let i=Math.min(1,Math.max(0,Number(a)||0)),r=ri(e,t,n);return r==="log"?t*(n/t)**i:t+(n-t)*(r==="power"?i**Ld:i)}function Rr(e,t,n,a){let i=Math.min(n,Math.max(t,e));if(a>0){i=t+Math.round((i-t)/a)*a;let r=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));i=Number(i.toFixed(r)),i=Math.min(n,Math.max(t,i))}return i}function li(e,t,n,a){return Math.round(si(e,t,n,a)*1e3)}function Ta(e,t,n,a,i){return Rr(Or(e,t,n,Number(a)/1e3),t,n,i)}function Fd(e,t,n=!1){let a=Number(e)||0,i=n?1:1e3/100,r=null;return t==="ArrowRight"||t==="ArrowUp"?r=a+i:t==="ArrowLeft"||t==="ArrowDown"?r=a-i:t==="PageUp"?r=a+1e3/10:t==="PageDown"?r=a-1e3/10:t==="Home"?r=0:t==="End"&&(r=1e3),r===null?null:Math.min(1e3,Math.max(0,Math.round(r)))}function Ir(e,t,n,a,i,r=!1,s){let l=li(e,t,n,a),d=Fd(l,i,r);if(d===null)return null;let u=Ta(e,t,n,d,s),c=Math.sign(d-l),p=Rr(Number(a),t,n,s);for(;c!==0&&u===p&&d>0&&d<1e3;)d+=c,u=Ta(e,t,n,d,s);return u}function Nd(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function bo(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function zd(e,t,n,a=n/6){let i=e.some(c=>c===null),r=Math.max(0,n-(i?a:0)),s=e.reduce((c,p,f)=>p===null?c:c+bo(t[f]),0),l=s>0?r/s:0,d=e.map(c=>c===null?0:Math.min(r,bo(c)*l));if(i){let c=d.reduce((f,g)=>f+g,0),p=e.indexOf(null);d[p]=Math.max(a,n-c)}let u=[0];for(let c of d)u.push(Math.round((u[u.length-1]+c)*100)/100);return i&&(u[u.length-1]=n),u}function Pd(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.floor(t*a)),r=Math.max(1,Math.floor(n*a));(e.width!==i||e.height!==r)&&(e.width=i,e.height=r);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function De(e){return Math.max(0,Math.min(1,e))}function jr(e,t){let{ctx:n,w:a,h:i}=Pd(e);if(!n)return;n.clearRect(0,0,a,i);let r=fd(e);if(t.paint==="swatch"){let d=U(e,"accent"),u=U(e,"rhythm.step-cell-on");e.dataset.ncAccent=d,e.dataset.ncStep=u,n.fillStyle=d,n.fillRect(0,0,a/2,i),n.fillStyle=u,n.fillRect(a/2,0,a/2,i);return}if(t.paint==="filter"&&typeof t.hz=="number"){Bd(n,a,i,t,e,r);return}if(t.paint==="filter"){let d=t.mode??"lp",u=U(e,Fr(d)),c=U(e,"divider"),p=De(t.cutoff??.5),f=.08+(1-De(t.resonance??.2))*.22;n.strokeStyle=c,n.beginPath(),n.moveTo(0,i*.72),n.lineTo(a,i*.72),n.stroke(),n.beginPath();for(let g=0;g<=a;g++){let w=g/Math.max(1,a),y=0;d==="lp"?y=w<p?1:Math.max(0,1-(w-p)/f):d==="hp"?y=w>p?1:Math.max(0,1-(p-w)/f):y=Math.max(0,1-Math.abs(w-p)/f);let h=i*.78-y*i*.62;g===0?n.moveTo(g,h):n.lineTo(g,h)}n.strokeStyle=u,n.stroke(),n.fillStyle=U(e,"text-sub"),n.font=r,n.fillText(d.toUpperCase(),0,i),e.dataset.ncAccent=u;return}if(t.paint==="envelope"){n.strokeStyle=U(e,"accent");let d=Math.max(0,t.attack??0),u=Math.max(0,t.decay??.4),[c,p,f]=zd([d,u],t.max??[1,4],a),g=2,w=i-1;n.beginPath(),n.moveTo(c,w),n.lineTo(p,g);let y=Math.max(1,Math.ceil(f-p));for(let h=1;h<=y;h++){let m=h/y;n.lineTo(p+(f-p)*m,w-(w-g)*Math.exp(-4.6*m)*(1-m*.01))}n.lineTo(f,w),n.lineTo(a,w),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let d=Array.isArray(t.peaks)?t.peaks:[],[u,c]=Array.isArray(t.region)?t.region:[0,1],p=U(e,"accent"),f=U(e,"text-sub"),g=i/2;n.fillStyle=U(e,"accent-soft"),n.fillRect(De(u)*a,0,(De(c)-De(u))*a,i),n.strokeStyle=U(e,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(a,g),n.stroke();let w=Math.floor(d.length/2);for(let y=0;y<w;y++){let h=(y+.5)/w*a,m=Math.max(-1,Math.min(1,d[y*2]??0)),b=Math.max(-1,Math.min(1,d[y*2+1]??0)),v=(y+.5)/w;n.strokeStyle=v>=u&&v<=c?p:f,n.beginPath(),n.moveTo(h,g-b*(g-1)),n.lineTo(h,g-m*(g-1)+.5),n.stroke()}n.strokeStyle=p;for(let y of[u,c,...Array.isArray(t.markers)?t.markers:[]]){let h=Math.round(De(y)*(a-1))+.5;n.beginPath(),n.moveTo(h,0),n.lineTo(h,i),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=U(e,"text"),n.fillRect(Math.round(De(t.position)*(a-1)),0,1,i)),w||(n.fillStyle=f,n.font=r,n.fillText(t.empty??"Empty",0,g+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let d=De(t.level??0);n.fillStyle=U(e,"divider"),n.fillRect(0,i*.4,a,i*.2),n.fillStyle=U(e,"accent"),n.fillRect(0,i*.4,a*d,i*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=U(e,"rhythm.step-cell-off"),n.fillRect(0,i*.45,a,i*.1),n.fillStyle=U(e,"rhythm.playhead"),n.fillRect(l/s*a,i*.3,Math.max(1,a/s),i*.4),e.dataset.ncAccent=U(e,"accent")}var jt=20,La=2e4,ca=24,yo=-60;function Dd(e,t,n,a,i=48e3){let r=2*Math.PI*Math.min(t,i*.49)/i,s=Math.cos(r),l=Math.sin(r)/(2*n),d,u,c;e==="hp"?[d,u,c]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[d,u,c]=[l,0,-l]:[d,u,c]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,f=-2*s,g=1-l,w=2*Math.PI*a/i,y=(v,E,A)=>v+E*Math.cos(w)+A*Math.cos(2*w),h=(v,E)=>-(v*Math.sin(w)+E*Math.sin(2*w)),m=Math.hypot(y(d,u,c),h(u,c)),b=Math.hypot(y(p,f,g),h(f,g));return b>0?m/b:0}function qd(e,t){return Math.log(Math.max(jt,Math.min(La,e))/jt)/Math.log(La/jt)*t}function wo(e,t,n){let a=Math.max(yo,Math.min(ca,e));return t+(ca-a)/(ca-yo)*(n-t)}function Bd(e,t,n,a,i,r){let s=a.mode??"lp",l=U(i,Fr(s)),d=U(i,"divider"),u=U(i,"text-sub"),c=Number.parseFloat(String(r).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,f=Math.max(p+4,n-c-3),g=a.q??Math.SQRT1_2,w=Math.round(wo(0,p,f))+.5;e.strokeStyle=d,e.lineWidth=1,e.beginPath(),e.moveTo(0,w),e.lineTo(t,w),e.stroke(),e.beginPath();for(let y=0;y<=t;y++){let h=jt*(La/jt)**(y/Math.max(1,t)),m=a.open?1:Dd(s,a.hz,g,h,a.sampleRate),b=wo(20*Math.log10(Math.max(1e-5,m)),p,f);y===0?e.moveTo(y,b):e.lineTo(y,b)}if(e.strokeStyle=l,e.stroke(),!a.open){let y=Math.round(qd(a.hz,t))+.5;e.strokeStyle=u,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(y,p),e.lineTo(y,f),e.stroke(),e.setLineDash?.([])}e.fillStyle=u,e.font=r,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",i.dataset.ncAccent=l,i.dataset.ncFilterHz=String(Math.round(a.hz))}function ge(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let i=n.defaultView.getComputedStyle(a).color;return a.remove(),i}function Od(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var Qe=20,an=2e4,ci=Math.log(an/Qe),Ca=32,Rd=250,Id=-100,jd=1200,Hd=4.5,vo=-6,Ye=-96,_d=48,xo=[100,1e3,1e4],Wd=[6,12];function ft(e,t){return Math.log(Math.max(Qe,Math.min(an,e))/Qe)/ci*t}function xn(e,t){return Qe*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*ci)}function Re(e,t,n,a){let i=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*i}function Fa(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var Hr=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Ud(e,t,n,a){let i=n?3:1,r=d=>({db:Math.max(-a,Math.min(a,e.db+d*i))}),s=d=>({hz:Math.max(e.minHz??Qe,Math.min(e.maxHz??an,e.hz*2**(d*i/6)))}),l=d=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(d*i)))});switch(t){case"ArrowUp":return r(1);case"ArrowDown":return r(-1);case"ArrowRight":return e.moveHz?s(1):r(1);case"ArrowLeft":return e.moveHz?s(-1):r(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function di(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function Gd(e,t,n,a,i,r,s,l,d){let u=d?.25:1,c={},p=Math.max(1,r/2-l);if(c.db=Math.max(-s,Math.min(s,t.db-a*u/p*s/di(e))),e.moveHz){let f=t.hz*Math.exp(n*u/Math.max(1,i)*ci);c.hz=Math.max(e.minHz??Qe,Math.min(e.maxHz??an,f))}return c}function Yd(e,t,n,a,i){let r=Math.max(0,n.left)+1,s=Math.min(n.right,i)-1,l=Math.min(t.width*3+a*2,s-r),d=Math.max(r,Math.min(e.left,s-l));return{left:Math.round(d-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var V=new WeakMap;function Kd(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let i=document.createElement("canvas");i.className="nc-eq-spectrum",i.setAttribute("aria-hidden","true");let r=document.createElement("canvas");r.className="nc-eq-curve",r.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(i,r);for(let d of e.bands)a.append(Xd(n,d,t));a.append(s),a.addEventListener("click",d=>{if(!Kr(n)||d.button>0)return;let u=Yr(n)?.querySelector("[data-nc-max-toggle]");u instanceof HTMLElement&&u.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),V.set(n,{control:e,cache:null,spec:null,active:null}),Wr(n,e),n}function _r(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function Xd(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let i=()=>{let u=n(e);return u?.type==="eqGraph"?u:null},r=()=>i()?.bands.find(u=>u.id===t.id)??null,s=null;a.addEventListener("pointerdown",u=>{if(u.button!==0)return;let c=r();c&&(u.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(u.pointerId),s={id:u.pointerId,x:u.clientX,y:u.clientY,start:{hz:c.hz,db:c.db}},a.dataset.drag="true",qe(e,t.id))}),a.addEventListener("pointermove",u=>{if(!s||u.pointerId!==s.id)return;let c=i(),p=r(),f=V.get(e);if(!c||!p||!f?.box)return;let{w:g,h:w,pad:y}=f.box;c.onBand(p.id,Gd(p,s.start,u.clientX-s.x,u.clientY-s.y,g,w,c.range??18,y,u.shiftKey))});let l=u=>{!s||u.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&qe(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",u=>{u.preventDefault(),i()?.onReset?.(t.id)}),a.addEventListener("keydown",u=>{let c=i(),p=r();if(!c||!p)return;let f=Ud(p,u.key,u.shiftKey,c.range??18);f&&(u.preventDefault(),f==="reset"?c.onReset?.(p.id):c.onBand(p.id,f),qe(e,p.id))});let d=null;return a.addEventListener("wheel",u=>{let c=i(),p=r();if(!c||!p?.moveQ)return;u.preventDefault();let f=u.timeStamp;(!d||f-d.t>400)&&(d={q:p.q,t:f});let g=u.deltaMode===1?u.deltaY*16:u.deltaMode===2?u.deltaY*400:u.deltaY;d.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,d.q*2**(-g/240))),d.t=f,c.onBand(p.id,{q:d.q}),qe(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>qe(e,t.id)),a.addEventListener("focus",()=>qe(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&qe(e,null)}),a.addEventListener("blur",()=>{s||qe(e,null)}),a}function qe(e,t){let n=V.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?bt(e):ui(e)}function ui(e){let t=V.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(w=>w.id===t.active):null;for(let w of e.querySelectorAll(".nc-eq-node"))w instanceof HTMLElement&&(a&&w.dataset.band===a.id?w.dataset.active="true":delete w.dataset.active);if(!a||!t.box){n.hidden=!0;return}let i=[a.label,Hr(a.db)];a.kind==="peak"?i.push(Fa(a.hz),`Q ${a.q.toFixed(1)}`):i.push(`${a.kind==="lowshelf"?"below":"above"} ${Fa(a.hz)}`),n.textContent=i.join(" · "),n.dataset.tone=String(Vd(t.control,a)),n.hidden=!1;let{w:r,h:s,pad:l}=t.box,d=ft(a.hz,r),u=Re(a.db*di(a),s,t.control.range??18,l),c=n.offsetWidth,p=n.offsetHeight,f=Math.max(0,Math.min(r-c,d-c/2)),g=u-p-l*1.5>=0?u-p-l*1.5:Math.min(s-p,u+l*1.5);n.style.left=`${Math.round(f)}px`,n.style.top=`${Math.round(g)}px`}function Vd(e,t){return e.bands.indexOf(t)%3+1}function Wr(e,t){let n=V.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",pi(e);let a=t.range??18;t.bands.forEach((i,r)=>{let s=_r(e,i.id);s instanceof HTMLElement&&(s.dataset.tone=String(r%3+1),s.dataset.kind=i.kind,s.setAttribute("aria-label",`${i.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(i.db)),s.setAttribute("aria-valuetext",i.valueText??`${Hr(i.db)}, ${Fa(i.hz)}`),s.setAttribute("aria-keyshortcuts",i.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),i.help?s.setAttribute("data-nc-help",i.help):s.removeAttribute("data-nc-help"))}),bt(e),nu(e)}function Ur(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.round(t*a)),r=Math.max(1,Math.round(n*a));(e.width!==i||e.height!==r)&&(e.width=i,e.height=r);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function Gr(e){return{curve:ge(e,"eq-curve"),fill:ge(e,"eq-fill"),quiet:ge(e,"text-sub"),grid:ge(e,"eq-grid"),zero:ge(e,"divider"),label:ge(e,"text-sub"),spectrum:ge(e,"eq-spectrum"),bands:[ge(e,"eq-band-1"),ge(e,"eq-band-2"),ge(e,"eq-band-3")]}}function Qd(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function bt(e){V.has(e)&&pi(e);let t=V.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:i,w:r,h:s}=Ur(n);if(!i)return;let l=Math.max(8,Math.round(s*.06)),d=a.range??18;t.box={w:r,h:s,pad:l},t.colours=Gr(e);let u=t.colours,c=Qd(a,r);if(!t.cache||t.cache.key!==c){let E=Math.max(64,Math.ceil(r)+1),A=new Float64Array(E);for(let x=0;x<E;x++)A[x]=xn(x/(E-1)*r,r);let $=null;try{$=typeof a.response=="function"?a.response(A):null}catch{$=null}t.cache={key:c,freqs:A,total:$?.total??new Float64Array(E),bands:$?.bands??[]}}i.clearRect(0,0,r,s);let p=Od(e),f=a.on!==!1;Jd(i,r,s,d,l,u,p);let{freqs:g,total:w,bands:y}=t.cache,h=Array.from(g,E=>ft(E,r)),m=Re(0,s,d,l);y.forEach((E,A)=>{if(!E||!E.some(M=>Math.abs(M)>.05))return;let $=f?u.bands[A%3]:u.quiet,x=Array.from(E,M=>Re(M,s,d,l));i.save(),t.active&&a.bands[A]?.id===t.active&&(i.globalAlpha=.14,i.fillStyle=$,ko(i,h,x,m)),i.globalAlpha=f?.75:.4,i.strokeStyle=$,i.lineWidth=.75,da(i,h,x),i.restore()});let b=Array.from(w,E=>Re(E,s,d,l)),v=f?u.curve:u.quiet;i.save(),i.fillStyle=f?u.fill:u.quiet,i.globalAlpha=f?.2:.08,ko(i,h,b,m),i.restore(),i.save(),i.strokeStyle=f?u.fill:v,i.lineJoin="round",i.lineCap="round",f&&(i.globalAlpha=.16,i.lineWidth=4,da(i,h,b)),i.globalAlpha=1,i.strokeStyle=v,i.lineWidth=1.25,da(i,h,b),i.restore(),Zd(e),ui(e)}function Jd(e,t,n,a,i,r,s){e.save(),e.lineWidth=1;for(let d=10;d<=1e4;d*=10)for(let u=1;u<=9;u++){let c=d*u;if(c<Qe||c>an)continue;let p=Math.round(ft(c,t))+.5;e.globalAlpha=xo.includes(c)?.9:.35,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let d of Wd)if(!(d>a))for(let u of[1,-1]){let c=Math.round(Re(d*u,n,a,i))+.5;e.globalAlpha=d===12?.75:.4,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(0,c),e.lineTo(t,c),e.stroke()}e.globalAlpha=1,e.strokeStyle=r.zero;let l=Math.round(Re(0,n,a,i))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=r.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let d of xo){let u=d>=1e3?`${d/1e3}k`:String(d),c=e.measureText(u).width,p=ft(d,t)+3;e.fillText(u,p+c+2>t?ft(d,t)-c-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let d of[12,0,-12]){if(Math.abs(d)>a)continue;let u=Re(d,n,a,i);e.fillText(d>0?`+${d}`:d<0?`−${-d}`:"0",t-3,Math.round(u)-1)}e.restore()}function Nn(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let i=(t[a]+t[a+1])/2,r=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],i,r)}e.lineTo(t[t.length-1],n[n.length-1])}function da(e,t,n){e.beginPath(),Nn(e,t,n),e.stroke()}function ko(e,t,n,a){e.beginPath(),Nn(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function Yr(e){return e.closest("[data-nc-maxable]")}function Kr(e){let t=Yr(e);return!!t&&!t.hasAttribute("data-nc-max")}function pi(e){let t=Kr(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=V.get(e);n?.active&&(n.active=null,ui(e))}return t}function Zd(e){pi(e);let t=V.get(e);if(!t?.box)return;let{w:n,h:a,pad:i}=t.box,r=t.control.range??18;for(let s of t.control.bands){let l=_r(e,s.id);l instanceof HTMLElement&&(l.style.left=`${ft(s.hz,n).toFixed(1)}px`,l.style.top=`${Re(s.db*di(s),a,r,i).toFixed(1)}px`)}}function eu(e,t,n,a){let i=a/2/n,r=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let d=0;d<e;d++){let u=(d-.5)/(e-1)*t,c=(d+.5)/(e-1)*t,p=xn(u,t),f=xn(c,t),g=xn(d/(e-1)*t,t);r[d]=Math.min(n-1,p/i),s[d]=Math.min(n-1,f/i),l[d]=Hd*Math.log2(g/1e3)}return{lo:r,hi:s,tilt:l}}function tu(e,t,n){let a=Math.floor(t),i=Math.ceil(n);if(i-a<=1){let s=t-a,l=e[a]??-1/0,d=e[Math.min(e.length-1,a+1)]??l;return l+(d-l)*s}let r=-1/0;for(let s=a;s<=i&&s<e.length;s++)e[s]>r&&(r=e[s]);return r}function nu(e){let t=V.get(e);if(t){if(!t.control.spectrum){Vr(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let i=V.get(e)?.spec;i&&(i.visible=a.some(r=>r.isIntersecting),Na(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Na(e)}}function Na(e){let t=V.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){Xr(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=za(e),n.onVis||(n.onVis=()=>Na(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Pa(e,!1)}function za(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function Pa(e,t){let n=V.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,ua(e,za(e))),Rd):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(i=>(n.raf=0,ua(e,i))):n.timer=a.setTimeout(()=>(n.timer=0,ua(e,za(e))),Ca))}function Xr(e){let t=V.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function Vr(e){let t=V.get(e)?.spec;if(!t)return;Xr(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=V.get(e);n&&(n.spec=null)}function ua(e,t){let n=V.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){Vr(e);return}if(!a.analyser)return;if(t-a.last<Ca-4&&!a.idle){Pa(e,!1);return}let i=a.last?Math.min(.25,(t-a.last)/1e3):Ca/1e3;a.last=t;let r=e.querySelector(".nc-eq-spectrum");if(!(r instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:d}=Ur(r);if(!s)return;let u=Math.max(16,Math.round(l/2)),c=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==u||a.map.w!==l||a.map.sr!==c)&&(a.map={cols:u,w:l,sr:c,...eu(u,l,a.buf.length,c)},a.disp=new Float32Array(u).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,f=_d*i,{lo:g,hi:w,tilt:y}=a.map;for(let m=0;m<u;m++){let b=tu(a.buf,g[m],w[m]);b>p&&(p=b);let v=b+y[m],E=a.disp[m]-f;a.disp[m]=v>E?v:E}p>Id&&(a.loud=t);let h=t-a.loud>jd;s.clearRect(0,0,l,d),(!h||a.disp.some(m=>m>Ye))&&au(s,l,d,a.disp,n.colours??Gr(e)),a.idle=h&&!a.disp.some(m=>m>Ye),Pa(e,a.idle)}function au(e,t,n,a,i){let r=a.length,s=new Array(r),l=new Array(r),d=u=>{let c=a[Math.max(0,Math.min(r-1,u))];return Number.isFinite(c)?c:Ye};for(let u=0;u<r;u++){let c=d(u)*.36+(d(u-1)+d(u+1))*.22+(d(u-2)+d(u+2))*.1,p=(Math.max(Ye,Math.min(vo,Number.isFinite(c)?c:Ye))-Ye)/(vo-Ye);s[u]=u/(r-1)*t,l[u]=n-p*n}e.save(),e.fillStyle=i.spectrum,e.globalAlpha=.13,e.beginPath(),Nn(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=i.spectrum,e.lineWidth=1,e.beginPath(),Nn(e,s,l),e.stroke(),e.restore()}var iu=.8912509381337456,Da=32,ou=250,ru=1200,su=.2,Qr=1.5;function lu(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function cu(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let i=e.createElement("span");i.className="nc-fx-level-fill",a.append(i),t.append(a)}return t}var zn=new WeakMap,$o=new WeakMap;function Eo(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let i=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),r=Number.parseFloat(i);return Number.isFinite(r)?i.endsWith("ms")?r/1e3:r:n}function du(e){let t=$o.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(i=>{for(let r of i){let s=zn.get(r.target);s&&(s.seen.set(r.target,r.isIntersecting),Ht(s))}pt(t)})),e.addEventListener("visibilitychange",()=>{for(let i of t.recs)Ht(i);pt(t)}),$o.set(e,t),t}var Jr=e=>e.els.some(t=>t.isConnected);function uu(e){if(!e.loop.io)return Jr(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function Ht(e){let t=!e.dead&&!!e.source&&uu(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=hi(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Oa(e))}function hi(e){return e.doc.defaultView?.performance?.now()??Date.now()}function pt(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){Zr(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=hi(e)),!e.raf&&!e.timer&&qa(e,!1)}function qa(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>Ao(e,hi(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),ou):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(i=>(e.raf=0,Ao(e,i))):e.timer=n.setTimeout(()=>(e.timer=0,a()),Da)}function Zr(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Ao(e,t){if(t-e.last<Da-4&&!e.idle&&e.last){qa(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):Da/1e3;e.last=t,e.frames++;let a=!1,i=!1;for(let r of e.recs){if(!Jr(r)){(r.placed||e.frames-r.born>90)&&es(r);continue}r.placed=!0,r.open&&(i=!0,pu(r,n,t)&&(e.loud=t),(r.disp[0]>0||r.disp[1]>0)&&(a=!0))}if(!i){Zr(e);return}e.idle=t-e.loud>ru&&!a,qa(e,e.idle)}function pu(e,t,n){if(e.fall<0){let f=e.els[0];e.fall=Eo(f,"motion-meter-fall",su),e.hold=Eo(f,"motion-meter-hold",Qr)}let a=null;try{a=e.source.read()}catch{a=null}let i=typeof a=="number",r=i?a:Number(a?.in)||0,s=!i&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,d=s?"2":"1";if(e.rows!==d){e.rows=d;for(let f of e.els)f.dataset.ncRows=d}let u=e.fall>0?Math.exp(-t/e.fall):0,c=[r,l],p=!1;for(let f=0;f<2;f++){let g=lu(c[f]);g>0&&(p=!0),e.disp[f]=g>=e.disp[f]?g:g+(e.disp[f]-g)*u,e.disp[f]<.001&&(e.disp[f]=0),c[f]>=iu&&(e.clipAt[f]=n);let w=e.clipAt[f]>0&&n-e.clipAt[f]<e.hold*1e3;Ba(e,f,e.disp[f],w)}return p}function Ba(e,t,n,a){let i=Math.round(n*1e3)/1e3,r=a?"true":"false";if(!(e.shown[t]===i&&e.clipShown[t]===r)){e.shown[t]=i,e.clipShown[t]=r;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${i})`,l.dataset.clip=r)}}}function Oa(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Ba(e,0,0,!1),Ba(e,1,0,!1)}function es(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),zn.get(t)===e&&zn.delete(t)}function hu(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,i=du(a),r={els:n,source:t??null,loop:i,open:!1,dead:!1,seen:new Map,born:i.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:Qr,rows:""};for(let s of n)zn.set(s,r),i.io?.observe(s);if(i.recs.add(r),Oa(r),!i.io){let s=a.defaultView,l=()=>{Ht(r),pt(i)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!r.dead){if(l===r.source){Ht(r),pt(i);return}r.open&&(r.open=!1,r.source?.close?.(),Oa(r)),r.source=l,Ht(r),pt(i)}},destroy(){r.dead||es(r),pt(i)}}}var ts={slop:8,longPressMs:500,pitchPx:16},fu=class{constructor(e,t,n=ts){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let i=this.hit(t,n);return i<0?!1:(this.phase="pending",this.pointer=e,this.pad=i,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let i=t-this.x0,r=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(i,r)<this.config.slop)return;Math.abs(r)>=Math.abs(i)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-r/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function mu(e,t,n,a=ts){let i=!1,r=0,s=(u,c)=>{let p=e.ownerDocument.elementFromPoint?.(u,c),f=[...e.querySelectorAll(t)],g=p?f.findIndex(h=>h===p||h.contains(p)):-1;if(g>=0)return g;let w=-1,y=Number.POSITIVE_INFINITY;return f.forEach((h,m)=>{if(h.hidden)return;let b=h.getBoundingClientRect();if(c<b.top||c>b.bottom)return;let v=Math.abs(u-(b.left+b.width/2));v<y&&v<=b.width&&(w=m,y=v)}),w},l=new fu(s,u=>{(u.kind==="paint"||u.kind==="long")&&(i=!0),n(u)},a),d=()=>{r&&clearTimeout(r),r=0};return e.addEventListener("pointerdown",u=>{u.button>0||(i=!1,l.down(u.pointerId,u.clientX,u.clientY,u.timeStamp)&&(d(),r=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",u=>{l.state!=="idle"&&(l.move(u.pointerId,u.clientX,u.clientY,u.timeStamp),l.state!=="pending"&&d())}),e.addEventListener("pointerup",u=>{d(),l.up(u.pointerId,u.clientX,u.clientY,u.timeStamp)}),e.addEventListener("pointercancel",u=>{d(),l.cancel(u.pointerId)}),e.addEventListener("click",u=>{i&&(i=!1,u.stopPropagation(),u.preventDefault())},!0),e.addEventListener("contextmenu",u=>u.preventDefault()),l}var ns="netcomposer.groups.v1";function fi(){try{return globalThis.localStorage??null}catch{return null}}function as(e=fi(),t=ns){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[i,r]of Object.entries(n))typeof r=="boolean"&&a.set(i,r);return a}catch{return new Map}}function gu(e,t,n,a=ns){let i=as(e,a);i.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(i)))}catch{}}function bu(e,t=fi()){return as(t).get(e.id)??e.open===!0}function yu(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let i=document.createElement("button");i.type="button",i.className="nc-group-toggle",i.id=`${e.id}-group-toggle`;let r=document.createElement("span");r.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),i.append(r,s,l);let d=document.createElement("div");d.className="nc-group-body",d.id=`${e.id}-group-body`,d.setAttribute("role","group"),d.setAttribute("aria-labelledby",i.id),i.setAttribute("aria-controls",d.id);for(let u of e.controls)d.append(n(u,t));return i.addEventListener("click",()=>{let u=a.dataset.ncOpen!=="true";gu(fi(),e.id,u),Ra(a,u);let c=t(a);c?.type==="group"&&c.onToggle?.(u)}),a.append(i,d),is(a,e),Ra(a,bu(e)),os(a,e),a}function Ra(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let i=n?.querySelector(".nc-group-mark");i&&(i.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function is(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function os(e,t){is(e,t)&&Ra(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),i=t.summary??"";a&&a.textContent!==i&&(a.textContent=i)}var hn="application/x-nc-pad",So="http://www.w3.org/2000/svg";function wu(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],i=[];for(let r=0;r<n;r++){let s=Math.floor(r*t/n),l=Math.max(s+1,Math.floor((r+1)*t/n)),d=0,u=0;for(let p=s;p<l;p++)d=Math.min(d,e[2*p]??0),u=Math.max(u,e[2*p+1]??0);let c=n===1?50:r/(n-1)*100;a.push(`${c.toFixed(1)} ${(10-Math.min(1,u)*10).toFixed(2)}`),i.push(`${c.toFixed(1)} ${(10-Math.max(-1,d)*10).toFixed(2)}`)}return`M${a.join("L")}L${i.reverse().join("L")}Z`}function vu(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((i,r)=>a.append(xu(n,r,t))),n.append(a),n.addEventListener("keydown",i=>{i.key==="Escape"&&kn(n)}),ss(n,e),n}function xu(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let i=document.createElement("span");i.className="nc-padgrid-pad-bar",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let d=document.createElementNS(So,"svg");d.setAttribute("class","nc-padgrid-pad-wave"),d.setAttribute("viewBox","0 0 100 20"),d.setAttribute("preserveAspectRatio","none"),d.setAttribute("aria-hidden","true");let u=document.createElementNS(So,"path");return d.append(u),a.append(i,r,s,l,d),$u(e,a,t,n),r.addEventListener("dblclick",()=>{let c=n(e);c?.type==="padGrid"&&c.onRename&&a.dataset.empty!=="true"&&rs(e,a,t,n)}),a.addEventListener("dragstart",c=>{if(a.dataset.empty==="true"||!c.dataTransfer){c.preventDefault();return}c.dataTransfer.setData(hn,String(t)),c.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",c=>{let p=c.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(hn)||(c.preventDefault(),c.stopPropagation(),c.dataTransfer&&(c.dataTransfer.dropEffect=p.includes(hn)&&!c.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",c=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let f=c.dataTransfer?.getData(hn);if(f!==void 0&&f!==""){c.preventDefault(),c.stopPropagation();let w=Number(f);w!==t&&p.onMove?.(w,t,c.altKey);return}let g=c.dataTransfer?.files?.[0];g&&(c.preventDefault(),c.stopPropagation(),p.onFile?.(t,g))}),a}function ku(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function $u(e,t,n,a){let i=0,r=!1,s=0,l=0,d=()=>{window.clearTimeout(i),i=0};t.addEventListener("pointerdown",u=>{if(u.button!==0)return;r=!1,s=u.clientX,l=u.clientY,d();let c=a(e);c?.type==="padGrid"&&(c.onDown?.(n),!(c.onDown&&u.pointerType==="mouse")&&(i=window.setTimeout(()=>{i=0,r=Mo(e,t,n,a)},450)))}),t.addEventListener("pointermove",u=>{i&&Math.hypot(u.clientX-s,u.clientY-l)>8&&d()});for(let u of["pointerup","pointercancel","pointerleave"])t.addEventListener(u,d);t.addEventListener("contextmenu",u=>{u.preventDefault(),d(),r=Mo(e,t,n,a)}),t.addEventListener("click",()=>{if(r){r=!1;return}ku(e,n,a)})}function Mo(e,t,n,a){let i=a(e);if(i?.type!=="padGrid"||!i.menu)return!1;let r=i.menu(n);if(!r.length)return!1;kn(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),kn(e)}),s.addEventListener("click",c=>c.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let c of r){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=c.id,p.textContent=c.label,p.addEventListener("click",()=>{kn(e);let f=a(e);f?.type==="padGrid"&&(c.id==="rename"&&f.onRename?rs(e,t,n,a):f.onMenu?.(n,c.id))}),l.append(p)}e.append(s,l);let d=e.getBoundingClientRect(),u=t.getBoundingClientRect();return l.style.left=`${u.left-d.left}px`,l.style.top=`${u.bottom-d.top}px`,l.querySelector("button")?.focus(),!0}function rs(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let i=a(e);if(i?.type!=="padGrid")return;let r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=i.nameMax??24,r.value=i.pads[n]?.label??"",r.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.top-s.top}px`,r.style.width=`${l.width}px`;let d=!1,u=c=>{if(d)return;d=!0;let p=r.value.trim();r.remove(),t.focus();let f=a(e);c&&p&&f?.type==="padGrid"&&f.onRename?.(n,p)};r.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"?u(!0):c.key==="Escape"&&u(!1)}),r.addEventListener("blur",()=>u(!0));for(let c of["pointerdown","click","dblclick"])r.addEventListener(c,p=>p.stopPropagation());e.append(r),r.focus(),r.select()}function kn(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function ss(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,i)=>{let r=n[i];if(!(r instanceof HTMLButtonElement))return;let s=r.querySelector(".nc-padgrid-pad-name"),l=r.querySelector(".nc-padgrid-pad-hint"),d=r.querySelector(".nc-padgrid-pad-wave path"),u=r.querySelector(".nc-padgrid-pad-badge");u&&(u.textContent=a.empty?"":a.badge??""),r.draggable=!a.empty,a.empty?(r.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),d?.setAttribute("d","")):(delete r.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=""),d?.setAttribute("d",wu(a.peaks))),a.lane?r.dataset.ncLane=String(a.lane):delete r.dataset.ncLane;let c=t.selected===i;c?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",c?"true":"false"),a.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",a.empty?`Pad ${i+1}, empty: load a sample`:`Pad ${i+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${c?", selected":""}`)})}function ae(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Kn(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let i=document.createElement("span");return i.className="nc-readout",i.dataset.ncReadout="",n.append(a,i),n}function To(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function Yt(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Eu=450,Lo=8;function Ae(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Au(e){let t=hd(e,"target-min");return t>0?t:44}function Su(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=Au(e),a=n/2,i=t.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<t.length;r++){let s=t[r],l=i[r];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let d=l.left+l.width/2,u=l.top+l.height/2,c=d-a,p=d+a,f=u-a,g=u+a;for(let w=0;w<t.length;w++){if(r===w)continue;let y=i[w];if(!y||y.width===0)continue;let h=y.left+y.width/2,m=y.top+y.height/2;Math.abs(m-u)<a*2&&(h>d?p=Math.min(p,(d+h)/2):h<d&&(c=Math.max(c,(d+h)/2))),Math.abs(h-d)<a*2&&(m>u?g=Math.min(g,(u+m)/2):m<u&&(f=Math.max(f,(u+m)/2)))}c=Math.min(c,l.left),p=Math.max(p,l.right),f=Math.min(f,l.top),g=Math.max(g,l.bottom),s.style.left=`${c-l.left}px`,s.style.top=`${f-l.top}px`,s.style.width=`${Math.max(0,p-c)}px`,s.style.height=`${Math.max(0,g-f)}px`,s.style.transform="none"}}function ls(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Co(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function yt(e,t){switch(e.type){case"slider":return Mu(e,t);case"select":return Lu(e,t);case"toggle":return Cu(e,t);case"button":return Fu(e,t);case"readout":return Nu(e);case"label":return qu(e);case"note":return Fo(e);case"knob":return Ru(e,t);case"choice":return Iu(e,t);case"slotRow":return ju(e,t);case"stepGrid":return Uu(e,t);case"canvas":return Xu(e);case"fx":return ep(e,t);case"eqGraph":return Kd(e,t);case"group":return yu(e,t,yt);case"strip":return Vu(e,t);case"stripAdd":return Zu(e,t);case"padGrid":return vu(e,t);case"moves":return Pu(e,t);default:return Fo({id:"unknown",text:""})}}function ye(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,us(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(cs(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let i=e.querySelector("[data-nc-readout]");i&&(i.textContent=t.valueText??Yt(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),To(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")To(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&Je(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Bu(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??Yt(t.value))}else if(t.type==="choice")ps(e,t);else if(t.type==="slotRow")fs(e,t);else if(t.type==="stepGrid")ja(e,t);else if(t.type==="padGrid")ss(e,t);else if(t.type==="moves")ds(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&jr(n,t)}else if(t.type==="eqGraph")Wr(e,t);else if(t.type==="strip"){ys(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${_t(n.id)}"]`);a instanceof Element&&ye(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")gs(e,t);else if(t.type==="group"){os(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${_t(n.id)}"]`);a instanceof Element&&ye(a,n)}}else if(t.type==="fx"){As(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${_t(n.id)}"]`);a instanceof Element&&ye(a,n)}}}}function Mu(e,t){let n=Kn(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let i=Yn(e.taper,e.min,e.max);a.min=String(i?0:e.min),a.max=String(i?1e3:e.max),a.step=String(i?1:e.step),i&&(a.dataset.ncTaper=e.taper),a.value=String(cs(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let r=l=>i?Ta(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(r(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(r(l))}),i&&a.addEventListener("keydown",l=>{let d=t(a);if(d?.type!=="slider"||a.disabled)return;let u=d.taper??e.taper,c=Ir(u,d.min,d.max,d.value,l.key,l.shiftKey,d.step);c!==null&&(l.preventDefault(),a.value=String(li(u,d.min,d.max,c)),d.onChange(c),d.onCommit?.(c))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(Tu(e,a,t),s),n.append(ae()),ye(n,e),n}function cs(e){return Yn(e.taper,e.min,e.max)?li(e.taper,e.min,e.max,e.value):e.value}function Tu(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(Ae());let i=r=>{let s=n(t);s?.type==="slider"&&s.onTap?.(r)};return a.addEventListener("pointerdown",r=>{r.button===0&&i(r.timeStamp)}),a.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),i(r.timeStamp))}),a}function Lu(e,t){let n=Kn(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let i=null;for(let r of e.options){let s=document.createElement("option");s.value=r.value,s.textContent=r.label,r.disabled&&(s.disabled=!0),r.group?i?.getAttribute("label")!==r.group&&(i=document.createElement("optgroup"),i.setAttribute("label",r.group),a.append(i)):i=null,(i??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let r=t(a);r?.type==="select"&&r.onChange(a.value)}),n.append(a,ae()),n}function Cu(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(ae()),ye(n,e),n}function Fu(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let r=t(n);r?.type==="button"&&r.onPress()}),n.append(ae()),ye(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let i=document.createElement("button");return i.type="button",i.className="nc-sparkle-btn",i.dataset.ncSparkle=e.id,i.setAttribute("aria-label","Surprise me"),i.title=e.sparkleTitle??"Surprise me",i.innerHTML=ls(),i.addEventListener("click",()=>{let r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&ms(r);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,i),a}function Nu(e){let t=Kn(e.id,e.label);return t.append(ae()),ye(t,e),t}var zu=450;function Pu(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let i=document.createElement("div");i.className="nc-moves-row",i.setAttribute("role","group"),i.setAttribute("aria-label",a.label),a.title&&(i.title=a.title);let r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let d=document.createElement("button");d.type="button",d.className="nc-moves-btn",d.dataset.ncMove=l.id,d.title=l.title??l.text,d.setAttribute("aria-label",`${a.label} ${l.text}`),d.append(Du(l.icon)),d.addEventListener("click",()=>{let u=t(n);u?.type==="moves"&&u.onMove(l.id)}),s.append(d)}i.append(r,s),n.append(i)}return ds(n,e),n}function ds(e,t){for(let n of t.groups)for(let a of n.moves){let i=e.querySelector(`[data-nc-move="${_t(a.id)}"]`);i instanceof HTMLButtonElement&&(i.disabled=a.disabled===!0)}}function Du(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function qu(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(ae()),t}function Fo(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(ae()),t}function No(e){if(typeof e.valueText=="string")return e.valueText;let t=Yt(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function us(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Bu(e,t){let n=si(t.taper,t.min,t.max,t.value);us(e,t.modulated===!0);let a=Math.round(n*270);e.style.setProperty("--knob-turn",String(a)),t.bipolar&&(e.style.setProperty("--knob-from",String(Math.min(a,135))),e.style.setProperty("--knob-to",String(Math.max(a,135)))),e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",No(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${No(t)}`}function Ou(e,t){if(Yn(e.taper,e.min,e.max))return Ir(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,i=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+i:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-i:null}function Ru(e,t){let n=Kn(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let i=document.createElement("i");i.className="nc-knob-mark",a.append(i);let r=0,s=0;a.addEventListener("pointerdown",u=>{r=u.clientY;let c=t(a);s=c&&"value"in c?Number(c.value):0,a.setPointerCapture?.(u.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",u=>{if(a.hasPointerCapture&&!a.hasPointerCapture(u.pointerId))return;let c=t(a);if(c?.type!=="knob")return;if(Yn(c.taper,c.min,c.max)){let g=si(c.taper,c.min,c.max,s)-(u.clientY-r)/120;c.onChange(Or(c.taper,c.min,c.max,g));return}let p=c.max-c.min||1,f=Math.min(c.max,Math.max(c.min,s-(u.clientY-r)*p/120));c.onChange(f)}),a.addEventListener("dblclick",()=>{let u=t(a);u?.type==="knob"&&typeof u.defaultValue=="number"&&u.onChange(u.defaultValue)}),a.addEventListener("keydown",u=>{let c=t(a);if(c?.type!=="knob")return;let p=Ou(c,u);p!==null&&(u.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,p))))});let d=n.querySelector("[data-nc-readout]");return n.insertBefore(a,d),n.append(ae()),ye(n,e),n}function Iu(e,t){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label);for(let a of e.options){let i=document.createElement("button");i.type="button",i.className="nc-choice",i.dataset.ncChoice=a.value,i.setAttribute("role","tab"),i.textContent=a.label,i.addEventListener("click",()=>{let r=t(n);r?.type==="choice"&&r.onChange(a.value)}),i.addEventListener("keydown",r=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(i),d=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")d=(l+1)%s.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")d=(l-1+s.length)%s.length;else if(r.key==="Home")d=0;else if(r.key==="End")d=s.length-1;else return;let u=s[d];u instanceof HTMLButtonElement&&(r.preventDefault(),u.focus(),u.click())}),n.append(i)}return n.append(ae()),ps(n,e),n}function ps(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function ju(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let c=0;c<e.slots.length;c++){let p=e.slots[c],f=document.createElement("span");f.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(c),g.textContent=p.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(g,Ae()),Hu(f,g,n,c,t),a.append(f)}let i=e.onSparkle?document.createElement("button"):null;i&&(i.type="button",i.className="nc-sparkle",i.setAttribute("aria-label","Surprise me"),i.innerHTML=ls(),i.append(Ae()),i.addEventListener("click",()=>{ms(n);let c=t(n);c?.type==="slotRow"&&c.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let c=t(n);c?.type==="slotRow"&&c.onMorph(Number(l.value))});let d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",r.append(s,d,l);let u=document.createElement("div");return u.className="nc-slot-line",u.append(a,...i?[i]:[]),n.append(u,r,ae()),hs(n,t),fs(n,e),n}function zo(e,t,n,a){let i=n(e);if(i?.type!=="slotRow")return;Bt(e);let r=a.shiftKey?"store":a.altKey?"clear":"recall";i.onSlot(t,r)}function Hu(e,t,n,a,i){let r=0,s=0,l=0,d=!1,u=!1,c=!1,p=!1,f=()=>{window.clearTimeout(r),r=0},g=m=>{let b=m.clientX-s,v=m.clientY-l;b*b+v*v>Lo*Lo&&(d=!0,f())},w=()=>{p&&(p=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",h))},y=m=>{let b=r!==0&&!d&&!u;f(),w(),b&&(c=!0,zo(n,a,i,m))},h=()=>{d=!0,f(),w()};e.addEventListener("pointerdown",m=>{m.button===0&&(w(),u=!1,d=!1,c=!1,s=m.clientX,l=m.clientY,f(),r=window.setTimeout(()=>{r=0,!d&&(u=!0,_u(n,t,a,i))},Eu),p=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",h))}),e.addEventListener("contextmenu",m=>m.preventDefault()),e.addEventListener("click",m=>{if(c||u||d){c=!1,u=!1,d=!1;return}zo(n,a,i,m)})}function hs(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=Po("Save","store"),i=Po("Clear","clear");n.append(a,i);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),Bt(e)}),r.addEventListener("click",s=>s.stopPropagation()),e.append(r,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let d=t(e);if(d?.type!=="slotRow")return;let u=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(u,"store"),Bt(e)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(u,"clear"),Bt(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&Bt(e)})}function Po(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function _u(e,t,n,a){hs(e,a);let i=e.querySelector(".nc-slot-menu");if(!(i instanceof HTMLElement))return;let r=e.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),i.hidden=!1,i.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-s.left}px`,i.style.top=`${l.bottom-s.top}px`,i.querySelector("button")?.focus()}function Bt(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function fs(e,t){for(let i of e.querySelectorAll("[data-nc-slot]")){if(!(i instanceof HTMLButtonElement))continue;let r=Number(i.dataset.ncSlot),s=t.slots[r];if(!s)continue;i.textContent=s.label,s.filled?i.dataset.filled="true":delete i.dataset.filled,s.active?i.dataset.active="true":delete i.dataset.active,s.edited?i.dataset.edited="true":delete i.dataset.edited,s.queued?i.dataset.queued="true":delete i.dataset.queued,s.queued&&s.pulse?i.dataset.pulse="true":delete i.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];i.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function ms(e){let t=e.dataset.ncLastFill||null,n=Zc(t);e.dataset.ncLastFill=n;let a=ed(n);if(a)for(let[i,r]of Object.entries(a))e.style.setProperty(i,r)}function Wu(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,i=r=>{if(a===r)return;a=r,n.setAttribute("aria-pressed",r?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),i(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>i(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||i(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),i(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function Uu(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let i=h=>{let m=document.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.textContent=h,a.append(m),m},r=i("Note"),s=i("Accent");s.dataset.ncAccentMode="";let l=h=>{for(let m of[r,s]){let b=m===h;m.setAttribute("aria-checked",b?"true":"false"),m.tabIndex=b?0:-1}};l(r);for(let h of[r,s])h.addEventListener("click",()=>l(h));a.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();let m=s.getAttribute("aria-checked")==="true"?r:s;l(m),m.focus()});let d=document.createElement("div");if(d.className="nc-step-tools",d.append(a),e.onFill&&d.append(Wu(n,t)),e.onClear){let h=document.createElement("button");h.type="button",h.className="nc-fill nc-clear",h.dataset.ncClear="",h.textContent=e.clearLabel??"Clear",h.title="Clear every step (Undo takes it back)",h.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&m.onClear?.()}),d.append(h)}n.append(d);for(let h of e.rows){let m=document.createElement("div");m.className="nc-row",m.dataset.ncRow="";let b=document.createElement("button");b.type="button",b.className="nc-name",b.textContent=h.label,b.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(b.dataset.ncLane=String((h.lane-1)%4+1));let v=!1,E=0;b.addEventListener("pointerdown",x=>{v=!1,!(x.pointerType==="mouse"||x.button!==0)&&(E=window.setTimeout(()=>{let M=t(n);M?.type!=="stepGrid"||!M.selectedRows||(v=!0,M.onSelectRow?.(M.rows.findIndex(C=>C.id===h.id),!0))},zu))});for(let x of["pointerup","pointercancel","pointerleave"])b.addEventListener(x,()=>window.clearTimeout(E));b.addEventListener("contextmenu",x=>{v&&x.preventDefault()}),b.addEventListener("click",x=>{let M=t(n);if(M?.type!=="stepGrid")return;if(v){v=!1;return}let C=M.rows.findIndex(K=>K.id===h.id),H=!!M.selectedRows&&(x.shiftKey||x.metaKey||x.ctrlKey);M.onSelectRow?.(C,H)}),b.addEventListener("keydown",x=>Gu(n,b,x));let A=[];for(let x of["mute","solo"]){if(!(x==="mute"?e.onMute:e.onSolo))continue;let M=document.createElement("span");M.className="nc-ms-wrap";let C=document.createElement("button");C.type="button",C.className="nc-ms",C.dataset.ncMs=x,C.textContent=x==="mute"?"M":"S",C.setAttribute("aria-label",`${x==="mute"?"Mute":"Solo"} ${h.label}`),M.append(C,Ae()),M.addEventListener("click",()=>{let H=t(n);if(H?.type!=="stepGrid")return;let K=H.rows.findIndex(fe=>fe.id===h.id);(x==="mute"?H.onMute:H.onSolo)?.(K)}),A.push(M)}let $=document.createElement("div");$.className="nc-steps";for(let x=0;x<h.steps.length;x++){let M=document.createElement("span");M.className="nc-step-wrap";let C=document.createElement("button");C.type="button",C.className="nc-step",C.dataset.ncStep=`${h.id}:${x}`,C.setAttribute("aria-label",`${h.label} step ${x+1}`),M.append(C,Ae()),M.addEventListener("click",H=>{let K=t(n);if(K?.type!=="stepGrid")return;let fe=K.rows.findIndex(Ne=>Ne.id===h.id),z=s.getAttribute("aria-checked")==="true";K.onToggle(fe,x,H.shiftKey||z)}),$.append(M)}if(e.onLength&&$.append(Yu(n,$,h,t)),m.append(...A,b,$),e.onDice){let x=document.createElement("button");x.type="button",x.className="nc-sparkle nc-row-dice",x.dataset.ncDice=h.id,x.setAttribute("aria-label",`Re-roll ${h.label}`),x.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,x.innerHTML=Co(),x.append(Ae()),x.addEventListener("click",()=>{let M=t(n);M?.type==="stepGrid"&&M.onDice?.(M.rows.findIndex(C=>C.id===h.id))}),m.append(x)}m.addEventListener("click",x=>{if(x.target!==m)return;let M=t(n);M?.type==="stepGrid"&&M.onSelectRow?.(M.rows.findIndex(C=>C.id===h.id))}),Do(n,$,".nc-step-wrap",t,s,()=>h.id),n.append(m)}let u=document.createElement("div");u.className="nc-pads-head";let c=(h,m,b)=>{let v=document.createElement("button");return v.type="button",v.className=h,v.textContent=m,b&&v.setAttribute("aria-label",b),v},p=c("nc-pads-step","‹","Previous lane"),f=c("nc-pads-step","›","Next lane"),g=document.createElement(e.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),e.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let h=t(n);h?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",ja(n,h))}));for(let[h,m]of[[p,-1],[f,1]])h.addEventListener("click",()=>{let b=t(n);if(b?.type!=="stepGrid"||b.rows.length===0)return;let v=b.rows.length;b.onSelectRow?.(((fn(b)+m)%v+v)%v)});if(u.append(p,g,f),e.onDice){let h=c("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=Co(),h.addEventListener("click",()=>{let m=t(n);if(m?.type!=="stepGrid")return;let b=fn(m);b>=0&&m.onDice?.(b)}),u.append(h)}if(e.transport){let h=c("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&m.transport?.onToggle()}),u.append(h)}n.append(u);let w=document.createElement("div");w.className="nc-pads",w.setAttribute("role","group");let y=Math.max(0,...e.rows.map(h=>h.steps.length));for(let h=0;h<y;h++){let m=document.createElement("button");m.type="button",m.className="nc-pad",m.dataset.ncPad=String(h),m.textContent=String(h+1),m.addEventListener("click",b=>{let v=t(n);if(v?.type!=="stepGrid")return;let E=fn(v);if(E<0)return;if(n.dataset.ncLenMode==="true"){v.onLength?.(E,h+1);return}let A=s.getAttribute("aria-checked")==="true";v.onToggle(E,h,b.shiftKey||A)}),w.append(m)}return Do(n,w,".nc-pad",t,s,()=>{let h=t(n);return h?.type==="stepGrid"?h.rows[fn(h)]?.id:void 0}),n.append(w),n.append(ae()),ja(n,e),n}function fn(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function Do(e,t,n,a,i,r){let s="on",l=!0,d=-1,u=(c,p)=>{let f=c.rows[d]?.steps[p];!f||p>=c.rows[d].length||(c.onSet?c.onSet(d,p,s,l):!!f[s]!==l&&c.onToggle(d,p,s==="accent"))};mu(t,n,c=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(c.kind!=="paint")return;let f=p.rows.findIndex(g=>g.id===r());f>=0&&p.rows[f].length!==c.pad+1&&p.onLength?.(f,c.pad+1);return}if(c.kind==="paint"){if(c.phase==="start"){let f=r();d=p.rows.findIndex(w=>w.id===f);let g=p.rows[d]?.steps[c.pad];if(!g)return;s=i.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[s]}u(p,c.pad)}else if(c.kind==="long"){let f=r(),g=p.rows.findIndex(y=>y.id===f),w=t.querySelectorAll(n)[c.pad];g>=0&&w instanceof HTMLElement&&p.onLongPress?.(g,c.pad,w)}}})}function Gu(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],i=a.indexOf(t),r=i;n.key==="ArrowDown"?r=i+1:n.key==="ArrowUp"?r=i-1:n.key==="Home"?r=0:r=a.length-1;let s=a[r];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function Yu(e,t,n,a){let i=document.createElement("button");i.type="button",i.className="nc-len-handle",i.dataset.ncLen=n.id,i.setAttribute("role","slider"),i.setAttribute("aria-valuemin","1"),i.setAttribute("aria-valuemax",String(n.steps.length)),i.append(Ae());let r=u=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.findIndex(w=>w.id===n.id),f=c.rows[p];if(!f)return;let g=Math.max(1,Math.min(f.steps.length,u));g!==f.length&&c.onLength?.(p,g)},s=u=>{let c=[...t.querySelectorAll(".nc-step")],p=1;return c.forEach((f,g)=>{let w=f.getBoundingClientRect();w.width>0&&u>=w.left+w.width/2&&(p=g+1)}),p},l=u=>r(s(u.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete i.dataset.dragging};return i.addEventListener("pointerdown",u=>{u.button===0&&(u.preventDefault(),i.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),i.addEventListener("keydown",u=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.find(g=>g.id===n.id);if(!p)return;let f={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};u.key in f&&(u.preventDefault(),r(f[u.key]))}),i}var pa=new WeakMap,mn=new WeakMap;function Ku(e){return e?(mn.has(e)||(mn.set(e,Ma(e)),Lr(t=>{mn.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))Ia(n,Number(n.getAttribute("data-nc-velocity")))},e)),mn.get(e)):"light"}function Ia(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:Ku(e.ownerDocument),i=n===null?null:`${a} ${n}`;if(!(pa.has(e)&&pa.get(e)===i)){if(pa.set(e,i),n===null){for(let r of Object.keys(po(1)))e.style.removeProperty(r);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[r,s]of Object.entries(po(n,uo[a]??uo.light)))e.style.setProperty(r,s)}}function ja(e,t){let n=t.rows.some(c=>c.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let i=e.querySelector(".nc-pads"),r=t.rows.find(c=>c.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&r&&(s.textContent=l?`${r.label} · ${r.length}`:r.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let d=e.querySelector("[data-nc-pads-dice]");d instanceof HTMLElement&&r&&(d.setAttribute("aria-label",`Re-roll ${r.label}`),d.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let u=e.querySelector("[data-nc-pads-play]");if(u instanceof HTMLElement){let c=!!t.transport?.playing,p=t.transport?.label??(c?"Stop":"Play");u.textContent!==p&&(u.textContent=p),u.setAttribute("aria-pressed",c?"true":"false");let f=t.transport?.ariaLabel;f?u.setAttribute("aria-label",f):u.removeAttribute("aria-label")}if(i instanceof HTMLElement&&r){i.setAttribute("aria-label",`${r.label} steps`),r.lane&&(i.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?i.dataset.silent="true":delete i.dataset.silent;let c=r.length>0?(t.playhead%r.length+r.length)%r.length:-1;for(let p of i.querySelectorAll("[data-nc-pad]")){let f=Number(p.getAttribute("data-nc-pad")),g=r.steps[f];p instanceof HTMLButtonElement&&(p.hidden=!g||!l&&f>=r.length,l&&f>=r.length?p.dataset.out="true":delete p.dataset.out,l&&f===r.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${r.label} step ${f+1}`),p.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?p.dataset.accent="true":delete p.dataset.accent,g?.dim?p.dataset.dim="true":delete p.dataset.dim,Ia(p,g?.velocity),t.playhead>=0&&f===c?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let c of t.rows){for(let g=0;g<c.steps.length;g++){let w=c.steps[g],y=e.querySelector(`[data-nc-step="${c.id}:${g}"]`);if(!(y instanceof HTMLButtonElement))continue;let h=y.closest(".nc-row");if(h instanceof HTMLElement){t.selectedRow===c.id?h.dataset.selected="true":delete h.dataset.selected;let v=t.selectedRow!==c.id&&(t.selectedRows??[]).includes(c.id);v?h.dataset.picked="true":delete h.dataset.picked;let E=h.querySelector(".nc-name");E instanceof HTMLElement&&(E.setAttribute("aria-pressed",t.selectedRow===c.id||v?"true":"false"),E.textContent!==c.label&&(E.textContent=c.label,E.setAttribute("aria-label",`Select ${c.label}`))),c.mute||n&&!c.solo?h.dataset.silent="true":delete h.dataset.silent;for(let A of h.querySelectorAll("[data-nc-ms]")){let $=A.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;A.setAttribute("aria-pressed",$?"true":"false")}}y.setAttribute("aria-pressed",w.on?"true":"false"),w.accent?y.dataset.accent="true":delete y.dataset.accent,w.dim?y.dataset.dim="true":delete y.dataset.dim,g%4===0?y.dataset.bar="true":delete y.dataset.bar,typeof w.velocity=="number"?(y.dataset.velocity="true",y.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,w.velocity))*100)}%`)):(delete y.dataset.velocity,y.style.removeProperty("--level")),Ia(y,w.velocity);let m=t.playhead>=0&&c.length>0?(t.playhead%c.length+c.length)%c.length:-1;g===m?y.dataset.playhead="true":delete y.dataset.playhead;let b=!!t.onLength&&t.selectedRow===c.id;y.hidden=g>=c.length&&!b,g>=c.length&&b?y.dataset.out="true":delete y.dataset.out}let p=e.querySelector(`[data-nc-len="${c.id}"]`),f=e.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&f&&f.nextElementSibling!==p){let g=document.activeElement===p;f.after(p),g&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(c.length)),p.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),p.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function Xu(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,ae()),t}function Vu(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let i=document.createElement("span");i.className="nc-strip-name",i.dataset.ncStripName="";let r=!e.master&&typeof e.onFold=="function",s=null;if(r&&(n.dataset.ncFoldable="",s=vs(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let m=t(n);m?.type==="strip"&&(m.onFold?.(m.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(i),e.onRemove){let m=document.createElement("button");m.type="button",m.className="nc-strip-remove",m.dataset.ncStripRemove="",m.textContent="×",m.addEventListener("click",()=>{let b=t(n);b?.type==="strip"&&b.onRemove?.(m)}),a.append(m)}let l=document.createElement("div");if(l.className="nc-strip-hacks",e.onHacks){let m=document.createElement("span");m.className="nc-hacks-wrap";let b=document.createElement("button");b.type="button",b.className="nc-hacks",b.dataset.ncHacks="",m.append(b,Ae()),m.addEventListener("click",()=>{let v=t(n);v?.type==="strip"&&v.onHacks?.()}),l.append(m)}let d=document.createElement("div");d.className="nc-strip-ms";for(let m of["mute","solo"]){if(!(m==="mute"?e.onMute:e.onSolo))continue;let b=document.createElement("span");b.className="nc-ms-wrap";let v=document.createElement("button");v.type="button",v.className="nc-ms",v.dataset.ncMs=m,v.textContent=m==="mute"?"M":"S",b.append(v,Ae()),b.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&(m==="mute"?E.onMute:E.onSolo)?.()}),d.append(b)}let u=document.createElement("div");u.className="nc-strip-sends";for(let m of e.sends??[])u.append(yt({...m,type:"knob",compact:!0},t));let c=document.createElement("div");c.className="nc-strip-pan",e.pan&&c.append(yt(mi(e),t));let p=document.createElement("div");p.className="nc-strip-body";let f=document.createElement("span");f.className="nc-scale",f.setAttribute("aria-hidden","true");for(let m of e.ticks??[]){let b=document.createElement("span");b.className="nc-scale-tick",b.style.setProperty("--tick-pos",String(m.value)),b.textContent=m.label,f.append(b)}let g=xd({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:m=>{let b=t(n);b?.type==="strip"&&b.onChange(m)},onReset:()=>{let m=t(n);m?.type==="strip"&&Bo(m)}}),w=Md({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let m=t(n);m?.type==="strip"&&m.onClipClear?.()}});if(p.append(f,g.el,w.el),r){let m=document.createElement("button");m.type="button",m.className="nc-ui-fx-fold nc-strip-fold",m.dataset.ncStripFold="",m.setAttribute("aria-expanded","false");let b=document.createElement("span");b.className="nc-strip-fold-cap",b.setAttribute("aria-hidden","true");let v=document.createElement("span");v.className="nc-ui-fx-fold-name",v.dataset.ncStripFoldName="";let E=document.createElement("span");E.className="nc-strip-fold-pan",E.setAttribute("aria-hidden","true"),E.hidden=!e.pan,m.append(b,E,v),m.addEventListener("click",()=>{let A=t(n);if(A?.type!=="strip")return;A.onFold?.(!1);let $=n.querySelector("[data-nc-strip-hide]");$ instanceof HTMLElement&&$.focus()}),p.prepend(m)}let y=document.createElement("button");y.type="button",y.className="nc-strip-db",y.dataset.ncReadout="";let h=0;return y.addEventListener("click",m=>{let b=t(n);b?.type!=="strip"||!b.onTypeIn||(window.clearTimeout(h),m.detail===0?qo(n,y,t):m.detail===1&&(h=window.setTimeout(()=>qo(n,y,t),Ju)))}),y.addEventListener("dblclick",()=>{window.clearTimeout(h);let m=t(n);m?.type==="strip"&&Bo(m)}),s&&n.append(s),n.append(a,l,d,u,c,p,y,ae()),ys(n,e),n}function mi(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??Qu(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function Qu(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var Ju=250;function qo(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let i=document.createElement("input");i.type="text",i.className="nc-strip-db-input",i.inputMode="decimal",i.spellcheck=!1,i.autocomplete="off",i.value=a.valueText??Yt(a.value),i.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(i),i.focus(),i.select?.();let r=!1,s=l=>{if(r)return;r=!0;let d=i.value;if(i.remove(),t.hidden=!1,l){let u=n(e);u?.type==="strip"&&u.onTypeIn?.(d)}t.focus?.()};i.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),i.addEventListener("blur",()=>s(!1))}function Zu(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-strip-add-plus",i.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",a.append(i,r);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),d=s.value;bs(s),l?.type==="stripAdd"&&d&&l.onAdd(d)}),n.append(a,s,ae()),gs(n,e),n}function gs(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let i=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],r=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=i.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==s&&(a.replaceChildren(...i.map(l=>{let d=document.createElement("option");return d.value=l.value,d.textContent=l.label,d.disabled=l.disabled===!0,d})),bs(a))}function bs(e){let t=e.options[0];t&&(t.selected=!0)}function Bo(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function ys(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let i=e.querySelector(".nc-fader"),r=i?kd(i):void 0;r&&(r.configure({step:t.step}),r.set(t.value),r.setText(t.valueText),r.setLabel(`${t.label} level`)),Td(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let p=t.valueText??Yt(t.value);s.textContent!==p&&(s.textContent=p),s.setAttribute("aria-label",`${t.label} level ${p}`);let f=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${f}`:f}for(let p of e.querySelectorAll("[data-nc-ms]")){let f=p.getAttribute("data-nc-ms"),g=f==="mute"?t.mute===!0:t.solo===!0;p.setAttribute("aria-pressed",g?"true":"false"),p.setAttribute("aria-label",`${f==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let p=t.hacksLabel??"Hacks";l.textContent!==p&&(l.textContent=p),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${p}: ${t.label}`)}if(t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let p=e.querySelector(`.nc-strip-pan [data-nc-id="${_t(t.pan.id)}"]`);p&&ye(p,mi(t))}let d=!t.master&&typeof t.onFold=="function"&&t.folded===!0;d?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let u=e.querySelector("[data-nc-strip-hide]");u instanceof HTMLElement&&(xs(u,d,t.label),Je(u,t.foldHelp));let c=e.querySelector("[data-nc-strip-fold]");if(c instanceof HTMLElement){c.hidden=!d,c.setAttribute("aria-label",`Expand ${t.label}`);let p=c.querySelector("[data-nc-strip-fold-name]");p&&p.textContent!==t.label&&(p.textContent=t.label),Je(c,t.foldedHelp??t.foldHelp)}}function ep(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let i=typeof e.onFold=="function",r=!!e.meter;if(e.on===void 0&&!i&&!Pn(e)&&!r)n.append(a);else{let s=document.createElement("div");if(s.className="nc-ui-fx-hd",s.append(a),r&&s.append($s(n,"head")),e.on!==void 0){let l=Dr({checked:e.on,labelledBy:a.id,onChange:d=>{let u=t(l.el);u?.type==="fx"&&u.onToggle?.(d)}});l.el.dataset.ncFxSwitch="",s.append(l.el)}i&&s.append(np(n,t)),Pn(e)&&s.append(rp(n,t)),n.append(s)}i&&n.prepend(ap(n,t)),r&&Es(n,e);for(let s of e.controls)n.append(yt(s,t));if(e.more?.length){let s=document.createElement("details");s.className="nc-ui-more";let l=document.createElement("summary");l.textContent=e.moreLabel??"More",s.append(l);for(let d of e.more)s.append(yt(d,t));n.append(s)}return n.append(ae()),As(n,e),n}var tp=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function ws(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&tp(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function np(e,t){let n=vs();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),ws(e))}),n}function vs(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function xs(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function ap(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let i=document.createElement("span");i.className="nc-ui-fx-fold-name",i.dataset.ncFxFoldName="";let r=document.createElement("span");return r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),n.append(r,a,i),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append($s(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),ws(e)}}),n}var wt=new Set;function $n(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var Pn=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"),ip="(max-width: 768px)";function op(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function rp(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(op()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(ks(e,a,!wt.has(a.id)),n.focus())}),n}function ks(e,t,n){n?wt.add(t.id):wt.delete(t.id),gi(e,t)}function sp(e,t){t?.type==="fx"&&wt.has(t.id)&&ks(e,t,!1)}function lp(e){return e.ownerDocument.defaultView?.matchMedia?.(ip).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function gi(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=Pn(t)&&wt.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!Pn(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),$n(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&bt(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",Je(n,t.maxHelp)),!a){e.dataset.ncMax&&Oo(e);return}if(!e.isConnected){let s=()=>e.isConnected&&wt.has(t.id)&&gi(e,t);queueMicrotask(()=>{e.isConnected?s():$n(e.ownerDocument,s)});return}let i=lp(e),r=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;r>0&&e.style.setProperty("--nc-fx-dials",String(r)),e.dataset.ncMax!==i&&(e.dataset.ncMax&&Oo(e),e.dataset.ncMax=i,i==="over"&&cp(e,t)),dp(e.ownerDocument),i==="over"&&bi(e),$n(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&bt(s)})}function Oo(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),$n(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&bt(n)})}function cp(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let i=e.querySelector("[data-nc-fx-max]");i instanceof HTMLElement&&i.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function bi(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,i=e.ownerDocument.defaultView,r=Number.parseFloat(i?.getComputedStyle(a).columnGap??"")||0,s=Yd(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),r,i?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var Ro=new WeakSet;function dp(e){Ro.has(e)||(Ro.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(i=>i.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&bi(t)}))}var Ha=new WeakMap;function $s(e,t){let n=cu(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Es(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let i of n)Je(i,t.meterHelp);let a=Ha.get(e);a?a.set(t.meter):Ha.set(e,hu(n,t.meter))}function As(e,t){(t.meter||Ha.has(e))&&Es(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let i=typeof t.onFold=="function"&&t.folded===!0;i?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let r=e.querySelector("[data-nc-fx-hide]");r instanceof HTMLElement&&(xs(r,i,t.title),Je(r,t.foldHelp)),gi(e,t);let s=e.querySelector(":scope > [data-nc-fx-fold]");if(s instanceof HTMLElement){let l=t.on===void 0?"":t.on?"On":"Off";s.hidden=!i,s.setAttribute("aria-label",`Expand ${t.title}${l?`, ${l.toLowerCase()}`:""}`),s.dataset.on=t.on===!0?"true":"false";let d=s.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=l,d.hidden=l==="");let u=s.querySelector("[data-nc-fx-fold-name]");u&&(u.textContent=t.title),Je(s,t.foldHelp)}}function Je(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function _t(e){return e.replace(/["\\]/g,"\\$&")}function up(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(i=>i.type==="canvas"&&i.id===n.dataset.ncId);a?.type==="canvas"&&jr(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&bt(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&bi(n);Su(e)}var pp=Oe["toast-duration"];function hp({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function fp(e,t,n,a){let i=l=>({top:l,bottom:l+n}),r=l=>e.some(d=>d&&d.bottom>l.top&&d.top<l.bottom),s=i(t-a-n);return r(s)?r(i(a))?"bottom":"top":"bottom"}function mp(e,t,n,a,i,r){let s=e.bottom+i,l=Math.max(r,Math.min(e.left,a-r-n.width));for(let d=!0,u=0;d&&u<8;u++){d=!1;for(let c of t)c&&c.bottom>s&&c.top<s+n.height&&c.right>l&&c.left<l+n.width&&(s=c.bottom+i,d=!0)}return{top:s,left:l}}var Io="data-nc-ui-toast-live";function gp(e,t){let n=t.querySelector(`[${Io}]`);return n||(n=e.createElement("div"),n.setAttribute(Io,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function bp({message:e,actionLabel:t,onAction:n,duration:a=pp,onClose:i,avoid:r=[],anchor:s,host:l,document:d=globalThis.document}={}){l=l??d.body;let u=d.defaultView??globalThis,c=d.createElement("div");c.className="nc-ui-toast",c.setAttribute("data-state","enter");let p=d.createElement("span");p.className="nc-ui-toast-message",p.textContent=e,c.appendChild(p);let f=null;t&&(f=d.createElement("button"),f.type="button",f.className="nc-ui-toast-action",f.textContent=t,c.appendChild(f)),l.appendChild(c);let g="open",w=Z=>Z&&typeof Z.getBoundingClientRect=="function"?Z.getBoundingClientRect():null,y=w(c),h=y?.height||44,m=u.getComputedStyle?.(c),b=Number.parseFloat(m?.getPropertyValue(W("toast-offset")))||16,v=Number.parseFloat(m?.getPropertyValue(W("toast-anchor-gap")))||8,E=w(s),A=u.innerHeight??0,$=r.map(w).filter(Boolean),x=E&&E.bottom>0&&E.top<A?mp(E,$,{width:y?.width||0,height:h},u.innerWidth??0,v,b):null;x&&x.top+h<=A?(c.setAttribute("data-placement","anchor"),c.style.top=`${x.top+(u.scrollY??0)}px`,c.style.left=`${x.left+(u.scrollX??0)}px`):c.setAttribute("data-placement",fp($,A,h,b));let M=u.requestAnimationFrame?.bind(u)??(Z=>setTimeout(Z,16));M(()=>M(()=>{g==="open"&&c.setAttribute("data-state","open")})),gp(d,l).textContent=hp({message:e,actionLabel:t});let C,H,K=new Promise(Z=>{H=Z}),fe=Z=>{clearTimeout(C),C=setTimeout(()=>at("timeout"),Z)},z=a,Ne=Date.now(),Lt=()=>{g==="open"&&(clearTimeout(C),z=Math.max(0,z-(Date.now()-Ne)))},Ct=()=>{g==="open"&&(Ne=Date.now(),fe(z))};c.addEventListener("pointerenter",Lt),c.addEventListener("pointerleave",Ct),c.addEventListener("focusin",Lt),c.addEventListener("focusout",Ct),f?.addEventListener("click",()=>{if(g==="open")try{n?.()}finally{at("action")}}),Number.isFinite(a)&&fe(a);function at(Z="close"){if(g!=="open")return;g="closing",clearTimeout(C),c.setAttribute("data-state","closing"),i?.(Z);let cn=u.getComputedStyle?.(c),ze=cn?Math.max(0,...String(cn.transitionDuration||"").split(",").map(ee=>Number.parseFloat(ee)*(ee.trim().endsWith("ms")?1:1e3)||0)):0,P=()=>{g!=="gone"&&(g="gone",c.remove(),H(Z))};c.addEventListener("transitionend",P),setTimeout(P,ze+50)}return{el:c,close:at,closed:K}}var jo="data-nc-help";function yp(e,t,n,a=0,i=6,r=8){let s=e.top-i-t.height,l=s>=a+r?"above":"below",d=l==="above"?s:e.bottom+i,u=Math.max(r,Math.min(e.left,n-r-t.width));return{top:Math.round(d),left:Math.round(u),side:l}}var ha=new WeakMap;function wp(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function vp({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=ha.get(e);if(n)return n;let a=e.defaultView,i=null,r=null,s,l=()=>{clearTimeout(s),r=null,i&&(i.hidden=!0)},d=f=>{let g=f.getAttribute(jo);if(!g)return;i||(i=e.createElement("div"),i.className="nc-ui-help",i.setAttribute("role","tooltip"),i.dataset.testid="nc-help",i.style.position="fixed",i.style.pointerEvents="none",i.style.zIndex="6",e.body.appendChild(i)),i.textContent=g,i.hidden=!1,i.style.visibility="hidden",i.style.top="0px",i.style.left="0px";let w=f.getBoundingClientRect(),y=yp(w,{width:i.offsetWidth,height:i.offsetHeight},a.innerWidth,wp(e));i.style.top=`${y.top}px`,i.style.left=`${y.left}px`,i.dataset.side=y.side,i.style.visibility=""},u=f=>{if(f.pointerType==="touch")return;let g=f.target&&f.target.closest?f.target.closest(`[${jo}]`):null;g!==r&&(l(),g&&(r=g,s=setTimeout(()=>{r===g&&g.isConnected&&d(g)},t)))},c=f=>{f.key==="Escape"&&l()};e.addEventListener("pointerover",u),e.addEventListener("pointerdown",l,!0),e.addEventListener("keydown",c),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);let p={hide:l,uninstall(){l(),e.removeEventListener("pointerover",u),e.removeEventListener("pointerdown",l,!0),e.removeEventListener("keydown",c),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),i?.remove(),i=null,ha.delete(e)}};return ha.set(e,p),p}var xp="(max-width: 768px)",kp='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',$p='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',Ep=0;function Ap({panel:e,button:t,label:n="Menu",media:a=xp}){let i=e.ownerDocument,r=i.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++Ep}`);let s=t??i.createElement("button");t||(s.type="button",s.innerHTML=kp),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function d(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),i.addEventListener("keydown",c,!0),i.addEventListener("pointerdown",p,!0),[...e.querySelectorAll($p)].find(h=>!h.hidden&&h.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function u({focus:h}={}){if(!l())return;let m=e.contains(i.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),i.removeEventListener("keydown",c,!0),i.removeEventListener("pointerdown",p,!0),(h??m)&&s.focus?.({preventScroll:!0})}function c(h){h.key==="Escape"&&(h.preventDefault(),h.stopPropagation(),u({focus:!0}))}function p(h){let m=h.target;m instanceof r.Node&&(e.contains(m)||s.contains(m))||u({focus:!1})}let f=()=>l()?u({focus:!0}):d(),g=h=>{let m=h.target,b=m instanceof r.Element?m.closest("button"):null;!b||!e.contains(b)||b.closest("[data-nc-menu-stay]")||u({focus:!0})};s.addEventListener("click",f),e.addEventListener("click",g);let w=r.matchMedia?.(a),y=()=>{w?.matches||u({focus:!1})};return w?.addEventListener?.("change",y),{button:s,panel:e,open:d,close:u,isOpen:l,destroy(){u({focus:!1}),s.removeEventListener("click",f),e.removeEventListener("click",g),w?.removeEventListener?.("change",y)}}}var yi="netcomposer.rhythm.hidden.v1",ke=new WeakMap;function fa(){try{return globalThis.localStorage??null}catch{return null}}function Ss(e,t=yi){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Ho(e,t,n,a=yi){let i=Ss(e,a);n?i.add(t):i.delete(t);try{e?.setItem(a,JSON.stringify([...i]))}catch{}}function wi(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(i=>i.controls)],n=[],a=i=>{if(n.push(i),i.type==="group")for(let r of i.controls)a(r)};for(let i of t)a(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&(n.push(...(i.sends??[]).map(r=>({...r,type:"knob",compact:!0}))),i.pan&&n.push(mi(i)));return n}function Ms(e,t){if(!(!e||!t))return wi(e).find(n=>n.id===t)}function Sp(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${wi(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Mp(e,t){if(!t.title)return;if(!t.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=t.title,e.append(r);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let i=document.createElement("span");i.className="nc-panel-subject",i.dataset.ncPanelSubject="",n.append(a,i),e.append(n),Ts(e,t)}function Ts(e,t){if(!t.panel)return;let n=[...e.children].find(r=>r.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),i=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),i&&(i.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Tp(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=ke.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Ms(n,a)}function Lp(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],i=Sp(t);if(e.dataset.ncSignature===i){for(let r of a){let s=e.querySelector(`[data-nc-section="${Wo(r.id)}"]`);s&&Ts(s,r);for(let l of r.controls){let d=e.querySelector(`[data-nc-id="${Wo(l.id)}"]`);d instanceof Element&&ye(d,l)}s instanceof HTMLElement&&_a(s,r,n)}return}e.dataset.ncSignature=i,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let r of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=r.id,r.inset&&(s.dataset.ncInset="true"),r.area&&(s.dataset.ncArea=r.area),r.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",r.label)),r.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),r.title&&s.setAttribute("aria-label",r.title)),Mp(s,r);let l=r.panel?document.createElement("div"):s;r.panel&&(l.className="nc-panel-body",s.append(l));for(let d of r.controls)l.append(yt(d,Tp));e.append(s),_a(s,r,n)}}function Ls(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,i=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,i))}}var Cp="(max-width: 768px)",Cs=new WeakMap;function _o(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function Fp(e,t){let n=[...e.children].find(u=>u.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let i=_o("prev"),r=_o("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(i,s,r,l);let d=(u,c)=>{let p=Cs.get(e);if(!p||c.getAttribute("aria-disabled")==="true")return;let f=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:g}=Ls(f,p.pageSize,(t.pages.get(p.id)??0)+u);t.pages.set(p.id,g),p.onPage?.(g),_a(e,{...p,page:g},t),c.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===c&&(c===i?r:i).focus(),t.redraw()};return i.addEventListener("click",()=>d(-1,i)),r.addEventListener("click",()=>d(1,r)),e.prepend(a),a}function _a(e,t,n){Cs.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],i=t.pageSize??0,{pages:r,page:s}=Ls(a.length,i,t.page??n.pages.get(t.id)??0);if(i>0&&n.pages.set(t.id,s),r<=1){for(let h of[...e.children])h.classList.contains("nc-fx-pager")&&h.remove();delete e.dataset.ncPaged;for(let h of a)delete h.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(Cp).matches===!0,d=e.closest(".nc-module");a.forEach((h,m)=>{let b=Math.floor(m/i)!==s;if(b?h.dataset.ncOffPage="":delete h.dataset.ncOffPage,b&&!l){let v=d instanceof HTMLElement?ke.get(d):void 0;sp(h,Ms(v,h.dataset.ncId))}});let u=Fp(e,n),c=u.querySelector('[data-nc-fx-page="prev"]'),p=u.querySelector('[data-nc-fx-page="next"]');c.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===r-1?"true":"false");let f=u.querySelector("[data-nc-fx-page-count]"),g=`${s+1} / ${r}`;f.textContent!==g&&(f.textContent=g);let w=u.querySelector("[data-nc-fx-page-live]"),y=`Effects page ${s+1} of ${r}`;w.textContent!==y&&(w.textContent=y)}function Wo(e){return e.replace(/["\\]/g,"\\$&")}function Np(e,t=yi){Nr();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Ss(fa(),t).has(e.id),i=document.createElement("header");i.className="nc-module-hd",i.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";let u=Dr({labelledBy:r.id,onChange:b=>(ke.get(n)??e).onToggle?.(b)});u.el.dataset.ncModuleSwitch="",s.append(u.el,l,d);let c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",i.append(r,c,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",f.append(g);let w=document.createElement("i");w.className="nc-token-probe",w.dataset.ncProbe="",n.append(w,i,p,f),n.setAttribute("aria-labelledby",r.id);let y=b=>{let v=ke.get(n)??e;n.dataset.ncOpen=b?"false":"true",p.hidden=b,f.hidden=!b,l.textContent=b?"+":"−",l.setAttribute("aria-expanded",b?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${b?"Show":"Hide"} ${v.title}`),l.title=b?"Show":"Hide",b?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let b=n.dataset.ncOpen==="true";Ho(fa(),(ke.get(n)??e).id,b,t),y(b),Wa(n.parentElement)}),f.addEventListener("click",()=>{Ho(fa(),(ke.get(n)??e).id,!1,t),y(!1),Wa(n.parentElement)});let h={pages:new Map,redraw:()=>m.redraw()},m={el:n,update(b){ke.set(n,b),b.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=b.title,c.textContent=b.status??"",b.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),g.textContent=b.summary??b.title,u.el.hidden=b.on===void 0,u.set(b.on===!0),b.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,f.setAttribute("aria-label",`Show ${b.title}`),Lp(p,b,h),y(p.hidden),m.redraw()},redraw(){let b=ke.get(n);b&&up(n,wi(b))}};return ke.set(n,e),y(a),m.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>m.redraw()).observe(n),Lr(()=>m.redraw(),n.ownerDocument),m}function zp(e,t,n="adjacent"){Nr(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((i,r)=>{let s=r%4+1;i.el.dataset.ncShade=String(s),i.el.dataset.ncPlace=a;let l=i.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(i.el),i.redraw()}),Wa(e)}function Wa(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=t.some(r=>r.hasAttribute("data-nc-lead")),a=t.map(r=>r.hasAttribute("data-nc-slim")?o("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let i=t.filter(r=>!r.hasAttribute("data-nc-slim"));n&&t.length===4&&i.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Pp="https://musicmatter.art/library/library.json",vi="musicmatter.art",Dp=["CC0-1.0","CC-BY-4.0","CC-BY-SA-4.0","PDM-1.0"],Fs=6,qp=2,Ns=["kick","snare","clap","hat","tom","perc","cymbal","fx","tonal"],gn=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{},ne=(e,t=300)=>typeof e=="string"?e.trim().slice(0,t):"",Ge=(e,t=0)=>typeof e=="number"&&Number.isFinite(e)?e:t,$e=e=>{const t=ne(e,600);return/^https?:\/\/[^\s"'<>]+$/i.test(t)?t:""},zs=/^[0-9a-f]{64}$/,Bp="0123456789abcdefghijklmnopqrstuvwxyz";function Op(e){const t=gn(e),n=Array.isArray(t.sounds)?t.sounds:[],a=new Set,i=[];for(const r of n){const s=gn(r),l=ne(s.id,160),d=ne(s.role),u=ne(s.license,40),c=$e(s.audio),p=ne(s.sha256,64).toLowerCase(),f=ne(s.title,160);if(!l||a.has(l)||!Ns.includes(d)||!c||!f||!Dp.includes(u)||!zs.test(p))continue;a.add(l);const g=gn(s.measures),w=Ge(g.gain_db),y=gn(s.source);i.push({id:l,role:d,title:f,instrument:f.split(" · ")[0]??f,tags:(Array.isArray(s.tags)?s.tags:[]).filter(h=>typeof h=="string").map(h=>h.toLowerCase().slice(0,40)),license:u,licenseUrl:$e(s.license_url)||Ps(u),creator:ne(s.creator,120)||"Unknown",creatorLink:$e(s.creator_link),source:$e(y.url),audio:c,manifest:$e(s.manifest),sha256:p,measures:{length:Ge(g.length_s,1),attack:Ge(g.attack_ms,10),decay:Ge(g.decay_s,.3),centroid:Ge(g.centroid_hz,1e3),level:Ge(g.hit_dbfs,-20)+w,gain:w},wave:typeof s.wave=="string"?Array.from(s.wave.slice(0,96),h=>Math.max(0,Bp.indexOf(h))/35):[]})}return{name:ne(t.name,120)||vi,sounds:i}}function Ps(e){return e==="CC0-1.0"?"https://creativecommons.org/publicdomain/zero/1.0/":e==="CC-BY-4.0"?"https://creativecommons.org/licenses/by/4.0/":e==="CC-BY-SA-4.0"?"https://creativecommons.org/licenses/by-sa/4.0/":e==="PDM-1.0"?"https://creativecommons.org/publicdomain/mark/1.0/":""}function xi(e){return e==="CC0-1.0"?"CC0":e==="CC-BY-4.0"?"BY":e==="CC-BY-SA-4.0"?"BY-SA":e==="PDM-1.0"?"PD":e}function ki(e,t=24){const n=e.trim();if(n.length<=t)return n;const[a=n,i=""]=n.split(" · "),r=i.split(/\s+/).at(-1)??"",s=/^(?:v|vl|rr|k)?\d{1,2}$|^(?:p{1,3}|mp|mf|f{1,3})\d*$/i.test(r)?r:"",l=s?`${a} ${s}`:"";return l&&l.length<=t?l:a.length<=t?a:n.slice(0,t).trim()}const Ua={kick:"kick",kicks:"kick",bd:"kick",bassdrum:"kick","bass drum":"kick","kick drum":"kick",snare:"snare",snares:"snare",sd:"snare","snare drum":"snare",rimshot:"snare",clap:"clap",claps:"clap",handclap:"clap",handclaps:"clap","hand clap":"clap","hand claps":"clap",hat:"hat",hats:"hat",hihat:"hat",hihats:"hat","hi-hat":"hat","hi-hats":"hat","hi hat":"hat","hi hats":"hat","high hat":"hat",hh:"hat",ch:"hat",oh:"hat",tom:"tom",toms:"tom",tomtom:"tom","floor tom":"tom",perc:"perc",percs:"perc",percussion:"perc",cymbal:"cymbal",cymbals:"cymbal",crash:"cymbal",ride:"cymbal",splash:"cymbal",china:"cymbal",fx:"fx",sfx:"fx",effect:"fx",effects:"fx",tonal:"tonal",melodic:"tonal",pitched:"tonal",bell:"tonal",bells:"tonal",mallet:"tonal",mallets:"tonal",chime:"tonal",chimes:"tonal"},Rp={ch:"closed",oh:"open"},Uo={punchy:{wants:[{measure:"attack",dir:-1},{measure:"decay",dir:-1}],tag:"punchy"},tight:{wants:[{measure:"decay",dir:-1}],tag:"tight"},snappy:{wants:[{measure:"decay",dir:-1},{measure:"centroid",dir:1}],tag:"snappy"},short:{wants:[{measure:"length",dir:-1},{measure:"decay",dir:-1}],tag:"short"},dry:{wants:[{measure:"decay",dir:-1}]},long:{wants:[{measure:"length",dir:1},{measure:"decay",dir:1}],tag:"long"},ringing:{wants:[{measure:"decay",dir:1}]},wet:{wants:[{measure:"decay",dir:1}]},big:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}],tag:"boomy"},boomy:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}],tag:"boomy"},fat:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}]},deep:{wants:[{measure:"centroid",dir:-1}],tag:"deep"},dark:{wants:[{measure:"centroid",dir:-1}],tag:"dark"},warm:{wants:[{measure:"centroid",dir:-1}]},low:{wants:[{measure:"centroid",dir:-1}]},muffled:{wants:[{measure:"centroid",dir:-1}]},bright:{wants:[{measure:"centroid",dir:1}],tag:"bright"},crisp:{wants:[{measure:"centroid",dir:1},{measure:"decay",dir:-1}]},sharp:{wants:[{measure:"centroid",dir:1},{measure:"attack",dir:-1}]},high:{wants:[{measure:"centroid",dir:1}]},airy:{wants:[{measure:"centroid",dir:1}]},loud:{wants:[{measure:"level",dir:1}],tag:"hard"},hard:{wants:[{measure:"level",dir:1}],tag:"hard"},heavy:{wants:[{measure:"level",dir:1},{measure:"centroid",dir:-1}]},soft:{wants:[{measure:"level",dir:-1}],tag:"soft"},quiet:{wants:[{measure:"level",dir:-1}],tag:"soft"},gentle:{wants:[{measure:"level",dir:-1}],tag:"soft"},ghost:{wants:[{measure:"level",dir:-1}],tag:"soft"}},Ga={funk:["tight","punchy"],funky:["tight","punchy"],disco:["tight","bright"],dusty:["dark","soft"],lofi:["dark","soft"],"lo-fi":["dark","soft"],vintage:["dark"],"70s":["dark","tight"],"60s":["dark","soft"],old:["dark"],jazz:["soft","dark"],jazzy:["soft","dark"],rock:["hard","long"],metal:["hard","bright"],hiphop:["punchy","dark"],"hip-hop":["punchy","dark"],"boom bap":["punchy","dark"],boombap:["punchy","dark"],trap:["punchy","short"],techno:["tight","punchy"],house:["tight","punchy"],ambient:["long","soft"],cinematic:["big","long"],epic:["big","loud"]},Ds=new Set(["kit","kits","drumkit","drumkits","drums","set","drum kit"]),Ip=new Set("a an the some any with and or of for to me my give find get want need please like sound sounds sample samples one ones really very bit little more less that this".split(" "));function jp(e){const t=e.toLowerCase().replace(/[^a-z0-9\s-]/g," ").split(/\s+/).filter(Boolean),n=[];for(let a=0;a<t.length;a++){const i=`${t[a]} ${t[a+1]??""}`;t[a+1]&&(i in Ua||i in Ga||Ds.has(i))?(n.push(i),a++):n.push(t[a])}return n}function $i(e){return new Set(e.title.toLowerCase().split(/[^a-z0-9]+/).map(t=>t.replace(/\d+$/,"")).filter(t=>t.length>1))}function Ya(e,t){const n={text:e.trim(),roles:[],tags:[],softTags:[],wants:[],kit:!1,kind:"",unknown:[]},a=new Set;if(t)for(const r of t.sounds){for(const s of r.tags)a.add(s);for(const s of $i(r))a.add(s)}const i=r=>{const s=Uo[r];s&&(n.wants.push(...s.wants),s.tag&&!n.softTags.includes(s.tag)&&n.softTags.push(s.tag))};for(const r of jp(e))if(Ds.has(r))n.kit=!0;else if(r in Ua){const s=Ua[r];n.roles.includes(s)||n.roles.push(s);const l=Rp[r];(l==="open"||l==="closed")&&(n.kind=l)}else if(r in Uo)i(r);else if(r in Ga)for(const s of Ga[r]??[])i(s);else if(r==="open")n.kind="open";else if(r==="closed"||r==="close")n.kind="closed";else{if(Ip.has(r))continue;if(!t||a.has(r)||a.has(r.replace(/s$/,""))){const s=t&&!a.has(r)?r.replace(/s$/,""):r;n.tags.includes(s)||n.tags.push(s)}else n.unknown.push(r)}return n}function Hp(e,t){const n=[...e].sort((r,s)=>r.measures[t]-s.measures[t]),a=new Map,i=Math.max(1,n.length-1);return n.forEach((r,s)=>a.set(r.id,s/i)),a}const _p=[{measure:"level",dir:1,weight:.5},{measure:"length",dir:-1,weight:.2}],Wp=.2,Up={kick:-1,tom:-1,snare:1,clap:1,hat:1};function Ei(e,t){const n=new Set(t.wants.map(s=>s.measure)),a=new Map,i=(s,l)=>{let d=a.get(s);return d||(d=Hp(e,s),a.set(s,d)),d.get(l)??.5},r=(s,l)=>s.reduce((d,u)=>{const c=i(u.measure,l);return d+(u.dir>0?c:1-c)},0)/Math.max(1,s.length);return e.map(s=>{const l=$i(s);let d=0;for(const c of t.tags)d+=s.tags.includes(c)?2:l.has(c)?1:0;t.wants.length&&(d+=2*r(t.wants,s.id));const u=Up[s.role];for(const c of[..._p,...u?[{measure:"centroid",dir:u,weight:Wp}]:[]])n.has(c.measure)||(d+=2*c.weight*r([c],s.id));for(const c of t.softTags)s.tags.includes(c)&&(d+=.4);return{sound:s,score:d}})}const Go=(e,t)=>t.score-e.score||e.sound.title.localeCompare(t.sound.title)||e.sound.id.localeCompare(t.sound.id);function Dn(e,t,n,a){let i=e.sounds.filter(r=>!a.has(r.id)&&(!t.length||t.includes(r.role)));if(n.length){const r=i.filter(s=>{const l=$i(s);return n.some(d=>s.tags.includes(d)||l.has(d))});r.length&&(i=r)}return i}function Ai(e,t){const n=[...e].sort(Go),a=[],i=new Map;for(const r of n){if(a.length>=t)break;const s=i.get(r.sound.instrument)??0;s>=qp||(i.set(r.sound.instrument,s+1),a.push(r))}for(const r of n){if(a.length>=t)break;a.includes(r)||a.push(r)}return a.sort(Go)}function Gp(e,t){if(!t)return e;const n=e.filter(a=>a.role==="hat"&&Kt(a)===t);return n.length?n:e}function Yp(e,t,n={}){const a=t.kind&&!t.roles.length?["hat"]:t.roles,i=Gp(Dn(e,a,t.tags,n.exclude??new Set),t.kind);return Ai(Ei(i,t),n.limit??Fs)}const Kp=[{key:"kick",label:"Kick",role:"kick",nearest:["tom","perc"]},{key:"snare",label:"Snare",role:"snare",nearest:["clap","perc"]},{key:"clap",label:"Clap",role:"clap",nearest:["snare","perc"]},{key:"closed-hat",label:"Closed hat",role:"hat",tag:"closed",nearest:["perc","cymbal"]},{key:"open-hat",label:"Open hat",role:"hat",tag:"open",nearest:["cymbal","perc"]},{key:"tom",label:"Tom",role:"tom",nearest:["perc","kick"]},{key:"perc",label:"Perc",role:"perc",nearest:["tom","tonal"]},{key:"fx",label:"FX",role:"fx",nearest:["tonal","cymbal","perc"]}];function Kt(e){if(e.tags.includes("closed"))return"closed";if(e.tags.includes("open"))return"open";const t=e.title.toLowerCase();return/\bclose[d]?\b|hitc\b/.test(t)?"closed":/\bopen\b|hito\b/.test(t)?"open":""}function Xp(e,t,n,a){const i=Dn(e,[t.role],n.tags,a);if(t.tag){const r=i.filter(l=>Kt(l)===t.tag);if(r.length)return{list:r,role:t.role,kindMissing:!1};const s=i.filter(l=>Kt(l)==="");if(s.length)return{list:s,role:t.role,kindMissing:!0}}else if(i.length)return{list:i,role:t.role,kindMissing:!1};for(const r of t.nearest){const s=Dn(e,[r],n.tags,a);if(s.length)return{list:s,role:r,kindMissing:!1}}return{list:[],role:t.role,kindMissing:!1}}const Vp={kick:"a kick",snare:"a snare",clap:"a clap",hat:"a hat",tom:"a tom",perc:"a percussion sound",cymbal:"a cymbal",fx:"an effect",tonal:"a tonal sound"};function Yo(e,t){const n=t.wants.some(r=>r.measure==="level")?t:{...t,wants:[...t.wants,{measure:"level",dir:1}]},a=new Set,i=[];for(const r of Kp){const{list:s,role:l,kindMissing:d}=Xp(e,r,n,a),u=Ai(Ei(s,n),1)[0];if(!u)continue;a.add(u.sound.id);const c=l!==r.role?`No ${r.label.toLowerCase()} in the Library: ${Vp[l]} instead.`:d?`No ${r.label.toLowerCase()} labelled as one: the nearest hat instead.`:void 0;i.push({slot:r,sound:u.sound,...c?{note:c}:{}})}return i}function qs(e,t){return{id:e.id,title:e.title,role:e.role,creator:e.creator,creatorLink:e.creatorLink,license:e.license,licenseUrl:e.licenseUrl,source:e.source,audio:e.audio,sha256:e.sha256,gainDb:e.measures.gain,curator:vi,query:t.trim().slice(0,120),kind:e.role==="hat"?Kt(e):""}}function Qp(e){if(!e||typeof e!="object"||Array.isArray(e))return null;const t=e,n=ne(t.id,160),a=ne(t.title,160),i=ne(t.license,40),r=ne(t.sha256,64).toLowerCase();if(!n||!a||!i)return null;const s=Ns.includes(t.role)?t.role:"perc",l=t.kind==="closed"||t.kind==="open"?t.kind:"";return{id:n,title:a,role:s,creator:ne(t.creator,120)||"Unknown",creatorLink:$e(t.creatorLink),license:i,licenseUrl:$e(t.licenseUrl)||Ps(i),source:$e(t.source),audio:$e(t.audio),sha256:zs.test(r)?r:"",gainDb:Math.max(-60,Math.min(60,Ge(t.gainDb))),curator:ne(t.curator,80)||vi,query:ne(t.query,120),kind:l}}function Jp(e,t,n=new Set,a=3){const i=Ya(t.query,e),r=new Set([...n,t.id]);let s=Dn(e,[t.role],i.tags,r);if(t.role==="hat"&&t.kind){const l=s.filter(d=>Kt(d)===t.kind);l.length&&(s=l)}return Ai(Ei(s,{...i,roles:[t.role]}),a)}function Bs(e){const t=new Map;return e.forEach((n,a)=>{const i=n.provenance;if(!i)return;const r=t.get(i.id);r?r.pads.push(a+1):t.set(i.id,{...i,pads:[a+1]})}),[...t.values()]}const Me=16,pe=16,vt=10,Os=["1","2","3","4","5","6","7","8","9","0"],Rs=[0,2,4,8,16],Zp=[0,1,2,4,8],Ka=["always","1:2","2:2","1:3","2:3","3:3","1:4","2:4","3:4","4:4","1:5","2:5","3:5","4:5","5:5","1:6","2:6","3:6","4:6","5:6","6:6","1:7","2:7","3:7","4:7","5:7","6:7","7:7","1:8","2:8","3:8","4:8","5:8","6:8","7:8","8:8","fill","!fill","pre","!pre"],qn={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}};function ve(e){return{name:`Pad ${e+1}`,sample:null,mode:"oneshot",dir:"fwd",start:0,end:1,slices:0,cuts:[],tune:0,fine:0,fit:0,keepPitch:!0,attack:0,decay:4,cutoff:0,resonance:0,level:.8,pan:0,choke:0,provenance:null}}function Xn(){return{on:!1,accent:!1,velocity:.8,chance:1,slice:null,pitch:0,reverse:!1,cond:"always"}}function Vn(){return{length:pe,mute:!1,solo:!1,steps:Array.from({length:pe},Xn)}}function Is(){return{filter:{on:!0,mode:"lp",cutoff:1,resonance:.15},drive:structuredClone(qn.drive),compressor:structuredClone(qn.compressor)}}function Xa(){return{v:1,pads:Array.from({length:Me},(e,t)=>ve(t)),lanes:Array.from({length:Me},Vn),swing:.5,hacks:Is(),slots:Array.from({length:vt},()=>null),active:null,selected:0,master:1}}const Te=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{},te=(e,t,n,a)=>typeof e=="number"&&Number.isFinite(e)?Math.min(n,Math.max(t,e)):a,Ie=(e,t,n,a)=>Math.round(te(e,t,n,a)),je=(e,t)=>typeof e=="boolean"?e:t,Bn=(e,t,n)=>t.includes(e)?e:n,Ko=/^[0-9a-f]{16,64}$/;function eh(e,t){const n=Te(e),a=ve(t);let i=te(n.start,0,1,0),r=te(n.end,0,1,1);r-i<.001&&([i,r]=[0,1]);const s=Rs.includes(n.slices)?n.slices:0,l=typeof n.cuts=="string"&&n.cuts.length<=_s?n.cuts.split(" ").map(Number):n.cuts,d=Array.isArray(l)?l.filter(u=>typeof u=="number"&&u>0&&u<1).sort((u,c)=>u-c).slice(0,15):[];return{name:typeof n.name=="string"&&n.name.trim()?n.name.trim().slice(0,24):a.name,sample:typeof n.sample=="string"&&Ko.test(n.sample)?n.sample:null,mode:Bn(n.mode,["oneshot","gate","loop"],a.mode),dir:Bn(n.dir,["fwd","rev","pingpong"],a.dir),start:i,end:r,slices:s,cuts:s?d:[],tune:Ie(n.tune,-24,24,0),fine:Ie(n.fine,-100,100,0),fit:Zp.includes(n.fit)?n.fit:0,keepPitch:je(n.keepPitch,!0),attack:te(n.attack,0,.1,a.attack),decay:te(n.decay,.01,4,a.decay),cutoff:te(n.cutoff,-1,1,0),resonance:te(n.resonance,0,1,0),level:te(n.level,0,1,a.level),pan:te(n.pan,-1,1,0),choke:Ie(n.choke,0,4,0),provenance:typeof n.sample=="string"&&Ko.test(n.sample)?Qp(n.provenance):null}}function th(e){const t=Te(e);return{on:je(t.on,!1),accent:je(t.accent,!1),velocity:te(t.velocity,0,1,.8),chance:te(t.chance,0,1,1),slice:t.slice===null||t.slice===void 0?null:Ie(t.slice,0,15,0),pitch:Ie(t.pitch,-12,12,0),reverse:je(t.reverse,!1),cond:Bn(t.cond,Ka,"always")}}function nh(e){const t=Te(e),n=Array.isArray(t.steps)?t.steps:typeof t.steps=="string"?dh(t.steps):[];return{length:Ie(t.length,1,pe,pe),mute:je(t.mute,!1),solo:je(t.solo,!1),steps:Array.from({length:pe},(a,i)=>th(n[i]))}}function Xo(e,t){const n=Te(e),a={...t.dials};for(const[i,r]of Object.entries(Te(n.dials)))i in t.dials&&typeof r=="number"&&Number.isFinite(r)&&(a[i]=r);return{on:je(n.on,t.on),dials:a}}function ah(e){const t=Te(e),n=Te(t.filter),a=Is();return{filter:{on:je(n.on,a.filter.on),mode:Bn(n.mode,["lp","hp","bp"],a.filter.mode),cutoff:te(n.cutoff,0,1,a.filter.cutoff),resonance:te(n.resonance,0,1,a.filter.resonance)},drive:Xo(t.drive,qn.drive),compressor:Xo(t.compressor,qn.compressor)}}function On(e){const t=Te(e),n=Array.isArray(t.pads)?t.pads:[],a=Array.isArray(t.lanes)?t.lanes:[];return{pads:Array.from({length:Me},(i,r)=>eh(n[r],r)),lanes:Array.from({length:Me},(i,r)=>nh(a[r])),swing:te(t.swing,.5,.75,.5),hacks:ah(t.hacks)}}function js(e){const t=Te(e);if(t.v!==1)return Xa();const n=Array.isArray(t.slots)?t.slots:[],a=On(t),i=Array.from({length:vt},(s,l)=>n[l]?On(n[l]):null),r=t.active===null?null:Ie(t.active,0,vt-1,-1);return{v:1,...a,slots:i,active:r!==null&&r>=0&&i[r]?r:null,selected:Ie(t.selected,0,Me-1,0),master:te(t.master,0,1,1)}}function Hs(e,t){return structuredClone({index:t,pad:e.pads[t]??ve(t),lane:e.lanes[t]??Vn()})}function ih(e,t){const n=structuredClone(t);e.pads[n.index]=n.pad,e.lanes[n.index]=n.lane}function oh(e,t){const n=t.map((i,r)=>Hs(e,r)),a=t.map((i,r)=>i.hat?e.pads[r]?.choke??0:0).find(i=>i>0)??1;return t.forEach((i,r)=>{const s=ve(r);s.sample=i.sample,s.name=i.name.slice(0,24)||s.name,s.provenance=i.provenance,i.hat&&(s.choke=a),e.pads[r]=s}),n}const Xt=8;function rh(e,t,n,a=0){const i=e.pads[t],r=e.lanes[t];if(!i||!r)return;i.mode="oneshot",i.dir="fwd",i.decay=4,i.attack=0,i.fit=n,i.keepPitch=!0,i.slices=0,i.cuts=[],r.length=pe;for(const l of r.steps)Object.assign(l,Xn());const s=r.steps[0];n<=Xt&&s&&(s.on=!0,s.cond=n===1?"always":`${a%n+1}:${n}`)}function sh(e,t=Me){if(typeof e!="string"||!/^\d{1,3}$/.test(e))return-1;const n=Number(e)-1;return n>=0&&n<t?n:-1}function Si(e){return structuredClone({pads:e.pads,lanes:e.lanes,swing:e.swing,hacks:e.hacks})}const _s=4096;function lh(e){const t=Xn(),n=e.map(a=>{let i="";return a.on!==t.on&&(i+="x"),a.accent!==t.accent&&(i+="a"),a.reverse!==t.reverse&&(i+="r"),a.velocity!==t.velocity&&(i+=`v${a.velocity}`),a.chance!==t.chance&&(i+=`c${a.chance}`),a.slice!==t.slice&&a.slice!==null&&(i+=`s${a.slice}`),a.pitch!==t.pitch&&(i+=`p${a.pitch}`),a.cond!==t.cond&&(i+=`k${a.cond}`),i||"-"});for(;n.at(-1)==="-";)n.pop();return n.join(" ")}const ch="-?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[+-]?\\d+)?",Vo=new RegExp(`[xar]|[vcsp]${ch}|k\\S+$`,"gy");function dh(e){return e.length>_s?[]:e.split(" ").slice(0,pe).map(t=>{const n={};if(t==="-"||t==="")return n;Vo.lastIndex=0;let a=0;for(const i of t.matchAll(Vo)){const r=i[0];a+=r.length;const s=r.slice(1);r==="x"?n.on=!0:r==="a"?n.accent=!0:r==="r"?n.reverse=!0:r[0]==="v"?n.velocity=Number(s):r[0]==="c"?n.chance=Number(s):r[0]==="s"?n.slice=Number(s):r[0]==="p"?n.pitch=Number(s):r[0]==="k"&&(n.cond=s)}return a===t.length?n:{}})}function uh(e){const t=e.pads.map((a,i)=>{const r=ve(i),s={};for(const[l,d]of Object.entries(a))l==="cuts"?a.cuts.length&&(s.cuts=a.cuts.join(" ")):r[l]!==d&&(s[l]=d);return s}),n=e.lanes.map(a=>({...a.length!==pe?{length:a.length}:{},...a.mute?{mute:!0}:{},...a.solo?{solo:!0}:{},steps:lh(a.steps)}));return structuredClone({pads:t,lanes:n,swing:e.swing,hacks:e.hacks})}function Vt(e){const t=new Set;for(const n of[e,...e.slots])for(const a of n?.pads??[])a.sample&&t.add(a.sample);return t}function Ws(){try{return globalThis.localStorage??null}catch{return null}}function ph(e,t=Ws()){try{const n=t?.getItem(e);return n?js(JSON.parse(n)):Xa()}catch{return Xa()}}function hh(e,t,n=Ws()){try{return n?.setItem(e,JSON.stringify(t)),!!n}catch{return!1}}const we=e=>`${Math.round(e*100)}%`,Ke=e=>e<1?`${Math.round(e*1e3)} ms`:`${e.toFixed(2)} s`,Va=e=>e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`,Qt=(e,t="")=>`${e>0?"+":""}${e}${t}`,fh=e=>`×${Number(e.toFixed(2))}`;function En(e){return Math.abs(e)<.001?"open":e<0?`LP ${Va(2e4*(60/2e4)**-e)}`:`HP ${Va(20*(8e3/20)**e)}`}const An=e=>e>=3.99?"Hold":Ke(e);function mh(e){const t=ve(0),n=[];return e.tune!==t.tune&&n.push(Qt(e.tune," st")),e.fine!==t.fine&&n.push(Qt(e.fine," ct")),e.fit!==t.fit&&n.push(`fit ${e.fit} bar${e.fit===1?"":"s"}`),e.fit&&e.keepPitch!==t.keepPitch&&n.push("varispeed"),Math.abs(e.attack-t.attack)>=5e-4&&n.push(`attack ${Ke(e.attack)}`),An(e.decay)!==An(t.decay)&&n.push(`decay ${An(e.decay)}`),En(e.cutoff)!==En(t.cutoff)&&n.push(`filter ${En(e.cutoff)}`),we(e.resonance)!==we(t.resonance)&&n.push(`res ${we(e.resonance)}`),n.join(" · ")}function Us(e){const t=Math.max(0,Math.min(1,e));return Math.min(2e4,40*2**(t*10))}const bn=e=>Math.max(0,Math.min(100,e));function Mi(e){const t=Us(e.cutoff),n=bn(Math.max(0,Math.min(1,e.resonance))*100);return e.mode==="hp"?{type:"highpass",dials:{cutoff:t<=20?0:bn(100*Math.log(t/20)/Math.log(100)),q:n}}:e.mode==="bp"?{type:"bandpass",dials:{centre_hz:bn(100*Math.log(Math.max(100,t)/100)/Math.log(80)),q:n,mix:100}}:{type:"lowpass",dials:{cutoff:e.cutoff>=.999?0:bn(100*Math.log(t/2e4)/Math.log(150/2e4))}}}function gh(e){const{type:t,dials:n}=Mi(e);if(t==="highpass"){const i=n.cutoff??0;return{hz:20*100**(i/100),q:Math.SQRT1_2*(8/Math.SQRT1_2)**((n.q??0)/100),open:i<=0}}if(t==="bandpass")return{hz:100*80**((n.centre_hz??0)/100),q:.4*20**((n.q??0)/100),open:!1};const a=n.cutoff??0;return{hz:2e4*(150/2e4)**(a/100),q:Math.SQRT1_2,open:a<=0}}const Gs=e=>!e.on||e.mode==="lp"&&e.cutoff>=.999;function Qa(e){const t=Mi(e.filter);return{v:2,chain:[{id:`${t.type}-1`,type:t.type,bypass:Gs(e.filter),dials:t.dials},{id:"drive-1",type:"drive",bypass:!e.drive.on,dials:{...e.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!e.compressor.on,dials:{...e.compressor.dials}}]}}function bh(e,t){if(!e||e.chain.length!==t.chain.length)return{whole:!0};if(e.chain.some((a,i)=>a.type!==t.chain[i]?.type))return{whole:!0};const n=[];return t.chain.forEach((a,i)=>{const r=e.chain[i];if(r){r.bypass!==a.bypass&&n.push([a.id,"bypass",a.bypass]);for(const[s,l]of Object.entries(a.dials))r.dials[s]!==l&&n.push([a.id,s,l])}}),{whole:!1,params:n}}const Qo={"page:title":"NYX, the NetComposer sampler. The number is which copy of NYX this is.","page:master":"The volume of everything NYX plays, after the Hacks.","page:save":"Downloads the pattern as a file: pads, steps, Hacks and the ten slots. The samples stay in this browser.","page:load":"Opens a saved pattern file (with its slots, if it has them), or puts an audio file onto the selected pad.","page:panic":"Silences every voice and effect tail at once. NYX then sits out until you press Play.","module:transport":"Play and stop NYX, set the tempo and swing, and keep up to ten saved versions of the whole kit and pattern.","module:pattern":"The 16-step grid, one lane per pad: a step that is on plays that lane's pad. The pads under the grid are the sounds.","module:params":"Everything about the selected pad: which part of the sample plays, its pitch, shape, filter and level. A selected step's locks show here too.","module:hacks":"Effects on everything NYX plays, in order: Filter, then Drive, then Compressor. They are saved with the pattern and its slots.","section:pads":"The 16 sounds: Q W E R A S D F play 1–8, Shift 9–16. Tap to play, double-click a name to rename; long-press or right-click to load or clear; drag to swap.",play:"Starts and stops NYX. In the Studio, Stop sits NYX out while the others play on, and Play brings it back on the next bar.","perform-label":"Effects you play live: hold a button down and NYX's sound changes until you let go. Nothing is saved.",perform:"Hold one of these down to change NYX's sound until you let go.",tempo:"Beats per minute: how fast the pattern plays. In the Studio every instrument shares this clock.",swing:"Pushes every second sixteenth note later for a looser, shuffled feel. 50% is straight.",status:"What NYX is doing now: stopped, playing, sitting out, or waiting to join on the next bar.","kit:slot":"A memory for the whole kit and pattern. Tap to recall it; Shift-click or long-press to store here, Option-click to clear.","kit:note":"Step tool: a tap on a step turns it on or off.","kit:accent":"Step tool: a tap on a step makes it an accent, played louder. Shift-click accents a step with either tool.","kit:fill":"Hold for a fill: steps set to play Only in Fill come in and Not in Fill steps drop out, until you let go.","kit:clear":"Turns every step off and resets lane lengths, mutes, solos and step locks; the pads keep their sounds. Undo brings it back.","kit:mute":"Mute: silences this lane. Its steps stay as they are.","kit:solo":"Solo: hear only the soloed lanes. Solo several to hear them together.","kit:length":"Drag to set how many steps this lane plays before it starts over. Lanes of different lengths drift against each other.","kit:lane-length":"Tap to set this lane's length, then tap the step it should end on.","kit:pad-key":"The key that plays this pad: lower case (q to f) is the key alone, upper case (Q to F) is Shift with it. A Gate pad holds while its key is down.","kit:choke-badge":"Choke group: pads showing the same letter cut each other off, like an open and a closed hi-hat. Set it under Choke.",wave:"The selected pad's sample: the part between Start and End is what plays, lines mark the slices, and a cursor follows playback.",sample:"How much of the sample plays (between Start and End) out of its full length, and whether it is mono or stereo.",mode:"How the pad plays when hit: right through (One-shot), only as long as its step (Gate), or round and round (Loop).",dir:"Which way the pad plays through its sample: forwards, backwards, or forwards then back.",start:"Where the pad starts playing in the sample. Move it right to skip the beginning.",end:"Where the pad stops playing in the sample. Move it left to cut off the tail.",slices:"Cuts the played part into 2 to 16 pieces; each step plays the next piece in turn. Off plays the whole part every time.",chop:"Where the slices are cut: at equal spacing, or where the hits in the sound start.","tune-shape":"Pitch, speed and shape of the selected pad. Closed, it lists what differs from a new pad; NYX remembers in this browser whether it's open.","transport-more":"On a phone, Swing folds away; the line shows it. Tap to show or hide it.","pad-more":"On a phone, the pad's pan, choke group and Clear pad fold away; the line shows pan and choke. Tap to show or hide them.","hacks-more":"On a phone, Drive and Compressor fold away under the Filter; the line says which are on. Tap to show them.","kit:group-toggle":"Opens or closes this section.","pitch-label":"How high or low the pad plays. Pitch changes speed too, like a record, unless Fit's Keep pitch is on.",tune:"Pitch in semitones, up to two octaves either way. Higher also plays faster, unless the pad is fitted with Keep pitch on.",fine:"Fine pitch in cents (hundredths of a semitone), for small corrections.",fit:"Makes the pad last exactly this many bars at the current tempo, and keeps it in time when the tempo changes. Off plays it as recorded.","keep-pitch":"On, Fit stretches the pad to its bars without changing its pitch, and Tune moves the pitch only. Off, it speeds up or slows down like a record.","fit-speed":"How fast the pad plays to fit its bars: ×1 is as recorded. With Keep pitch, stretching far past ×0.75 to ×1.5 may smear the sound.","shape-label":"How each hit's volume moves over time: how it fades in and how it dies away.",attack:"How long each hit takes to fade in. Zero is instant; more softens the start.",decay:"How quickly each hit fades away (in Gate, once its step ends). All the way up is Hold: no fade.",cutoff:"Left of centre cuts the highs (darker), right of centre cuts the lows (thinner). Centre leaves the pad open.",resonance:"Boosts the sound right at the filter's edge for a sharper, ringing tone. It does nothing while the filter is open.","out-label":"Where the pad sits in the mix: how loud, how far left or right, and which pads cut it off.",level:"How loud this pad plays.",pan:"Places the pad left or right in the stereo picture. C is the centre.",choke:"Pads in the same group cut each other off when one plays, like open and closed hi-hats. None lets it ring over the others.","clear-pad":"Removes this pad's sample and settings. Its steps in the grid stay.","lock-label":"Locks for this one step: settings here change only this step, not the whole pad. Long-press another step to edit it.","lock-velocity":"How loud this step plays, before any accent.","lock-chance":"The odds this step plays each time round. At 100% it always plays; lower leaves it out at random.","lock-slice":"Which slice this step plays. In order plays the slice that matches the step's place, so a chopped beat plays back as it was.","lock-pitch":"Moves this step up or down in semitones, on top of the pad's own Tune.","lock-cond":"When this step plays: always, only on some passes through the lane, only with Fill held or not, or only if the lane's last conditional step did or didn't.","lock-reverse":"Whether this step plays the pad's own way or the other way round.","lock-done":"Closes this step's locks and goes back to the pad's settings.","grab-label":"Brings sound from the Studio onto the selected pad: Grab the bars that just played, or Take a performance as it happens.","grab-from":"Which Studio sound to grab or take from: the master mix or one instrument's channel.","grab-bars":"How many bars Grab takes. One bar is cut into 16 slices with every step on; longer grabs are sliced at the hits.",grab:"Copies the bars that just played onto the selected pad, cut on the bar lines (the music must be playing). It asks before replacing a pad that has a sound.","grab-undo":"Puts back what this Grab, Take, sent take, Library Load or Build kit replaced: old sounds, slices and steps. Cmd/Ctrl+Z does the same.",library:"Opens the Library: openly licensed sounds checked by a person, found by plain words. Load fills the selected pad; Build kit fills pads 1–8.",credit:"Who made this pad's sound, and its licence. Library › Credits has the full credit with links, and saved patterns keep it.","library:ask":"Plain words: a role (kick, snare, hat, clap, tom, perc, cymbal, fx) and a sound (punchy, tight, dark, bright, long, soft). Add kit for a whole kit.","library:close":"Closes the Library. Esc in the field does the same.","library:play":"Plays this sound through NYX's output, at the level it will have on a pad. Press again to stop.","library:load":"Puts this sound on the selected pad, named after it and with its credit; the steps stay. Undo brings the old sound back.","library:kit":"Fills pads 1–8 with a kit for your words (kick, snare, clap, hats, tom, perc, fx); the pattern stays and the hats cut each other. One Undo puts all eight back.","library:credits":"Every Library sound on the pads: who made it, its licence and its source. Saved patterns, slots and Studio Scenes keep these credits.","library:badge":"The licence. CC0 needs no credit (NYX credits it anyway); BY needs credit, and BY-SA credit plus the same licence on what you make.","library:wave":"The sound's shape, start to end: a tall start is a sharp hit, a long tail rings on.",take:"Records the chosen source onto the selected pad in whole bars until you press again (up to four minutes); takes of up to 8 bars loop. It asks first if the pad has a sound.","hack-filter":"A filter on all of NYX, to darken it, thin it or narrow it down. The switch turns it on.","filter-mode":"Which part the filter keeps: the lows (low pass), the highs (high pass) or a band in the middle (band pass).","filter-cutoff":"Where the filter cuts. In low pass, all the way up is open: no filtering.","filter-resonance":"Boosts the sound around the cutoff for a sharper, more nasal tone.","filter-curve":"A picture of the filter: how loud each pitch range comes out, lows on the left, highs on the right.","hack-meter":"The level going into this Hack (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. Off, it still shows the input, greyed.","hack-drive":"Distortion on all of NYX, from warm to gritty. The switch turns it on.","hack-drive-drive_db":"How hard the sound is pushed into distortion. 0 dB is clean.","hack-drive-output_db":"The level after the drive, to balance out the louder distorted sound.","hack-drive-mix":"How much of the driven sound is mixed with the clean one. 100% is all drive.","hack-drive-curve":"The kind of distortion: Smooth is warm and round, Acid is harder and buzzier.","hack-drive-tone":"Darkens the driven sound by cutting its highs. All the way up leaves it bright.","hack-compressor":"Evens out NYX's level: loud hits are turned down, so the whole sounds tighter and punchier. The switch turns it on.","hack-compressor-threshold_db":"The level above which the compressor starts turning the sound down. Lower catches more.","hack-compressor-ratio":"How strongly sound above the threshold is turned down. Higher is a firmer squeeze.","hack-compressor-attack_ms":"How fast the compressor reacts to a loud hit. Slower lets the start of each hit punch through.","hack-compressor-release_ms":"How fast the compressor lets go once the sound drops back below the threshold.","hack-compressor-makeup_db":"Turns the whole sound back up after compressing, to make up for the lost level.","kit:more":"More settings for this effect."},yh={perform:{repeat16:"While held, repeats the last sixteenth note over and over, like a stutter.",repeat8:"While held, repeats the last eighth note over and over.",reverse:"While held, plays what NYX just played backwards.",half:"While held, plays on at half speed, an octave lower.",stop:"While held, slows to a halt like a tape machine switched off."},mode:{oneshot:"One-shot: plays on from the hit until it ends or the lane's next hit cuts it. Good for drums.",gate:"Gate: plays only as long as its step (or its key is held), then fades by Decay. Good for chopping long sounds.",loop:"Loop: plays round and round until the pad plays again or the music stops."},dir:{fwd:"Plays the sample the normal way, start to end.",rev:"Plays the sample backwards, end to start.",pingpong:"Plays forwards, then back again. In Loop it keeps bouncing."},"keep-pitch":{on:"Keep pitch: the pad is stretched to its bars and stays at its pitch, whatever the tempo. Tune moves the pitch only.",off:"Varispeed: the pad speeds up or slows down to fit its bars, and its pitch moves with it, like a record."},chop:{even:"Cuts the slices at equal spacing.",transients:"Cuts the slices where the hits in the sound start, so each slice is one hit."},"lock-reverse":{pad:"This step plays in the pad's own direction.",rev:"This step plays the other way round from the pad."}};function B(e){return Object.hasOwn(Qo,e)?Qo[e]:void 0}function wh(e,t){const n=yh[e];return(n&&Object.hasOwn(n,t)?n[t]:void 0)??B(e)}const Sn="nyx-help-text",Jo=new Map;function vh(e,t){const n=Jo.get(t);if(n&&e.getElementById(n))return n;let a=e.getElementById(Sn);a||(a=e.createElement("div"),a.id=Sn,a.hidden=!0,e.body.append(a));const i=e.createElement("span");return i.id=`${Sn}-${a.children.length+1}`,i.textContent=t,a.append(i),Jo.set(t,i.id),i.id}function R(e,t,n){if(!e||!t||(e.getAttribute("data-nc-help")!==t&&e.setAttribute("data-nc-help",t),e.hasAttribute("title")&&e.removeAttribute("title"),!n))return;const a=vh(n.ownerDocument,t),i=(n.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);if(i.includes(a))return;const r=[...i.filter(s=>!s.startsWith(`${Sn}-`)),a];n.setAttribute("aria-describedby",r.join(" "))}function xh(e){const t=B(e);return t?{"data-nc-help":t}:{}}const kh=[['.nc-seg [role="radio"]:not([data-nc-accent-mode])',"kit:note"],['.nc-seg [role="radio"][data-nc-accent-mode]',"kit:accent"],["[data-nc-fill]:not([data-nc-clear])","kit:fill"],["[data-nc-clear]","kit:clear"],['.nc-ms[data-nc-ms="mute"]',"kit:mute"],['.nc-ms[data-nc-ms="solo"]',"kit:solo"],[".nc-len-handle","kit:length"],["[data-nc-len-toggle]","kit:lane-length"],["[data-nc-pads-play]","play"],[".nc-snap","kit:slot"]];function Ti(e){for(const t of e.querySelectorAll(".nc-module[data-nc-module]"))R(t.querySelector(".nc-module-hd .nc-title"),B(`module:${t.dataset.ncModule}`));for(const t of e.querySelectorAll("[data-nc-section]"))R(t.querySelector(":scope > .nc-ui-fx-name, :scope > .nc-panel-hd > .nc-panel-title"),B(`section:${t.dataset.ncSection}`));for(const t of e.querySelectorAll("[data-nc-id]")){const n=t.dataset.ncId??"";if(!t.matches("input, select, canvas"))if(t.classList.contains("nc-field")){const a=t.querySelector(":scope > input, :scope > select, :scope > canvas");R(t.querySelector(":scope > .nc-label"),B(n),a)}else if(t.classList.contains("nc-choice-row"))for(const a of t.querySelectorAll("[data-nc-choice]"))R(a,wh(n,a.dataset.ncChoice??""),a);else t.classList.contains("nc-btn")?R(t,B(n),t):t.matches(".nc-label[data-nc-text]")?R(t,B(n)):t.classList.contains("nc-ui-fx")&&(R(t.querySelector(":scope > .nc-ui-fx-hd > .nc-ui-fx-name, :scope > .nc-ui-fx-name"),B(n),t.querySelector("[data-nc-fx-switch]")),R(t.querySelector(":scope > .nc-ui-more > summary"),B("kit:more")))}for(const[t,n]of kh)for(const a of e.querySelectorAll(t)){const i=a.parentElement?.querySelector(":scope > .nc-hit")?a.parentElement:null;i&&a.removeAttribute("title"),R(i??a,B(n),a)}for(const t of e.querySelectorAll(".nc-group[data-nc-id]")){const n=t.querySelector(":scope > .nc-group-toggle");R(n?.querySelector(".nc-group-title")??null,B(t.dataset.ncId??""),n),R(n?.querySelector(".nc-group-mark")??null,B("kit:group-toggle"))}for(const t of e.querySelectorAll(".nc-padgrid-pad-badge"))t.textContent?R(t,B("kit:choke-badge")):t.removeAttribute("data-nc-help")}const Wt=["KeyQ","KeyW","KeyE","KeyR","KeyA","KeyS","KeyD","KeyF"],$h=Array.from({length:Me},(e,t)=>{const n=(Wt[t%Wt.length]??"").slice(3);return t<Wt.length?n.toLowerCase():n.toUpperCase()});function Ys(e){const t=Wt.indexOf(e.code);if(t<0)return-1;const n=e.shiftKey?t+Wt.length:t;return n<Me?n:-1}class Eh{down=new Map;press(t){if(this.down.has(t.code))return-1;const n=Ys(t);return n>=0&&this.down.set(t.code,n),n}release(t){const n=this.down.get(t.code);return n===void 0?-1:(this.down.delete(t.code),n)}releaseAll(){const t=[...this.down.values()];return this.down.clear(),t}}const Ah=.25;function Li(e){return e.slices?e.cuts.length===e.slices-1?[0,...e.cuts,1]:Array.from({length:e.slices+1},(t,n)=>n/e.slices):[0,1]}function Ks(e,t,n){const a=e.start*t.frames,i=e.end*t.frames;if(n===null||!e.slices)return[Math.floor(a),Math.ceil(i)];const r=Li(e),s=Math.min(n,r.length-2);return[Math.floor(a+r[s]*(i-a)),Math.ceil(a+r[s+1]*(i-a))]}function Sh(e,t,n,a=0){let r=2**((e.tune+e.fine/100+a)/12);if(e.fit){const s=(e.end-e.start)*t.frames/t.sampleRate,l=e.fit*4*(60/n);s>0&&l>0&&(r*=s/l)}return r}function Xs(e,t,n){return Math.max(1,Math.round(e*4*60/Math.max(1,t)*n))}function Vs(e,t,n){if(!e.fit)return 1;const a=(e.end-e.start)*t.frames/t.sampleRate;return a>0?a/(e.fit*4*(60/Math.max(1,n))):1}const Zo=[.75,1.5];function Mh(e,t,n){if(n===null||!e.slices)return[0,t];const a=Li(e),i=Math.min(n,a.length-2);return[Math.floor((a[i]??0)*t),Math.ceil((a[i+1]??1)*t)]}const Th=1.5;function Ci(e,t,n,a,i,r=!1,s){if(!n.on||!e.sample||!a)return null;const l=n.slice??(e.slices?t%e.slices:null),d=g=>s?Mh(e,s.frames,g):Ks(e,a,g);let[u,c]=d(l);const p=n.reverse?e.dir==="rev"?"fwd":"rev":e.dir;if(e.mode==="oneshot"&&l!==null&&e.slices&&!r){const[g,w]=d(null);p==="fwd"?c=w:p==="rev"&&(u=g)}const f=s?2**(n.pitch/12)*(s.frames/Xs(e.fit,i,a.sampleRate)):Sh(e,a,i,n.pitch);return{sample:s?s.sample:e.sample,from:u,to:c,rate:f,gain:Math.min(1.5,n.velocity*(n.accent?Th:1))*e.level,pan:e.pan,mode:e.mode,dir:p,attack:e.attack,decay:e.decay,cutoff:e.cutoff,resonance:e.resonance,choke:e.choke,chance:n.chance,cond:n.cond,fit:e.fit>0}}function Lh(e,t,n,a=null,i){return Ci(e,0,{on:!0,accent:!1,velocity:.8,chance:1,slice:a,pitch:0,reverse:!1,cond:"always"},t,n,!0,i)}function Ch(e,t,n,a=()=>{}){const i=e.lanes.some(r=>r.solo);return{swing:e.swing,lanes:e.lanes.map((r,s)=>{const l=e.pads[s],d=l?.sample?t(l.sample):void 0,u=l?a(s):void 0;return{length:r.length,audible:i?r.solo:!r.mute,steps:r.steps.map((c,p)=>l?Ci(l,p,c,d,n,!1,u):null)}})}}const Fh="/nyx/assets/sampler-processor-BdlrJ3MQ.js",Qs=827873614,Nh=60;async function zh(e,t){const n=new Float64Array([t,e.length,e[0]?.length??0]),a=[new Uint8Array(n.buffer),...e.map(d=>new Uint8Array(d.buffer))],i=a.reduce((d,u)=>d+u.byteLength,0),r=new Uint8Array(i);let s=0;for(const d of a)r.set(d,s),s+=d.byteLength;const l=new Uint8Array(await crypto.subtle.digest("SHA-256",r));return Array.from(l.subarray(0,16),d=>d.toString(16).padStart(2,"0")).join("")}function Ph(e){const t=e.data[0]?.length??0,n=new Uint8Array(16+t*4*e.data.length);return new Uint32Array(n.buffer,0,4).set([Qs,e.sampleRate,e.data.length,t]),e.data.forEach((a,i)=>{n.set(new Uint8Array(a.buffer,a.byteOffset,t*4),16+i*t*4)}),n}function Dh(e,t){if(t.byteLength<16)return null;const[n,a,i,r]=new Uint32Array(t,0,4);if(n!==Qs||!i||i>2||t.byteLength!==16+r*4*i)return null;const s=Array.from({length:i},(l,d)=>new Float32Array(t.slice(16+d*r*4,16+(d+1)*r*4)));return{hash:e,data:s,sampleRate:a,channels:i,frames:r}}class qh{constructor(t="nyx"){this.folderName=t}memory=new Map;dir=null;folder(){return this.dir??=(async()=>{try{const t=await navigator.storage?.getDirectory?.();return t?await t.getDirectoryHandle(this.folderName,{create:!0}):null}catch{return null}})(),this.dir}info(t){return this.memory.get(t)}held(t){return this.memory.get(t)}async put(t,n){const a=await zh(t,n),i={hash:a,data:t,sampleRate:n,channels:t.length,frames:t[0]?.length??0};this.memory.set(a,i);const r=await this.folder();if(!r)return{sample:i,saved:!1};try{const l=await(await r.getFileHandle(`${a}.f32`,{create:!0})).createWritable?.();return l?(await l.write(Ph(i)),await l.close(),{sample:i,saved:!0}):{sample:i,saved:!1}}catch{return{sample:i,saved:!1}}}async get(t){const n=this.memory.get(t);if(n)return n;const a=await this.folder();if(!a)return null;try{const i=await(await a.getFileHandle(`${t}.f32`)).getFile(),r=Dh(t,await i.arrayBuffer());return r&&this.memory.set(t,r),r}catch{return null}}async prune(t){for(const a of[...this.memory.keys()])t.has(a)||this.memory.delete(a);const n=await this.folder();if(n)try{const a=[];for await(const i of n.keys())a.push(i);for(const i of a){const r=i.replace(/\.f32$/,"");i.endsWith(".f32")&&!t.has(r)&&await n.removeEntry(i)}}catch{}}}function Js(e){const t=Math.min(e.length,Math.round(Nh*e.sampleRate));return{data:Array.from({length:Math.min(2,e.numberOfChannels)},(a,i)=>{const r=new Float32Array(t);return r.set(e.getChannelData(i).subarray(0,t)),r}),trimmed:t<e.length}}function Zs(e,t=200){const n=e[0]?.length??0,a=[];if(!n)return a;const i=n/t;for(let r=0;r<t;r++){const s=Math.floor(r*i),l=Math.max(s+1,Math.floor((r+1)*i));let d=0,u=0;const c=Math.max(1,Math.floor((l-s)/256));for(let p=s;p<l&&p<n;p+=c){let f=0;for(const g of e)f+=g[p]??0;f/=e.length,f<d&&(d=f),f>u&&(u=f)}a.push(Math.max(-1,d),Math.min(1,u))}return a}function Bh(e,t,n,a,i){const r=a-n;if(i<2||r<64)return[];const s=Math.max(32,Math.round(t*.01)),l=[];for(let g=n;g<a;g+=s){let w=0;for(const y of e)for(let h=g;h<Math.min(a,g+s);h++)w+=(y[h]??0)*(y[h]??0);l.push(Math.log10(w/s+1e-9))}const d=l.map((g,w)=>{const y=l.slice(Math.max(0,w-4),w),h=y.length?y.reduce((m,b)=>m+b,0)/y.length:g;return Math.max(0,g-h)}),u=Math.max(1,Math.floor(l.length/i/8)),c=d.map((g,w)=>({f:g,i:w})).filter(g=>g.i>0&&g.f>.3).sort((g,w)=>w.f-g.f),p=[];for(const g of c){if(p.length>=i-1)break;p.every(w=>Math.abs(w-g.i)>=u)&&p.push(g.i)}const f=p.map(g=>g*s/r).filter(g=>g>.001&&g<.999);for(let g=1;f.length<i-1&&g<i;g++){const w=g/i;f.every(y=>Math.abs(y-w)>.5/i)&&f.push(w)}for(let g=1;f.length<i-1;g++)f.push(g/(i+1));return f.sort((g,w)=>g-w).slice(0,i-1)}function el(e=Rh()){try{const t=JSON.parse(e?.getItem("lucy.state")??"null");return Array.isArray(t?.takes)?t.takes.flatMap(n=>{const a=n&&typeof n=="object"?n:{},i=r=>typeof a[r]=="number"&&Number.isFinite(a[r])?a[r]:0;return a.saved!==!0||!i("id")||!i("frames")||!i("sampleRate")?[]:[{id:i("id"),bars:i("bars"),bpm:i("bpm"),sampleRate:i("sampleRate"),channels:Math.min(2,Math.max(1,i("channels"))),frames:i("frames")}]}):[]}catch{return[]}}async function Oh(e){try{const t=await navigator.storage?.getDirectory?.();if(!t)return null;const a=await(await(await t.getDirectoryHandle("lucy")).getFileHandle(`lucy-take-${e.id}.f32`)).getFile(),i=new Float32Array(await a.arrayBuffer());return i.length<e.frames*e.channels?null:Array.from({length:e.channels},(r,s)=>i.slice(s*e.frames,(s+1)*e.frames))}catch{return null}}function Rh(){try{return globalThis.localStorage??null}catch{return null}}const Ih=150,tl=96*1024*1024,jh=e=>Math.round(e*10)/10;function Hh(e,t,n){if(!e.sample||!e.fit||!e.keepPitch||!t)return null;const[a,i]=Ks(e,t,null);if(i-a<2)return null;const r=jh(n);return{sample:e.sample,from:a,to:i,bars:e.fit,bpm:r,semitones:e.tune+e.fine/100,sampleRate:t.sampleRate,frames:Xs(e.fit,r,t.sampleRate)}}function ct(e){return`${e.sample}:${e.from}-${e.to}:${e.bars}:${e.bpm.toFixed(1)}:${Math.round(e.semitones*100)}`}const _h=e=>`stretch:${e}`,Wh=e=>e.startsWith("stretch:");class Uh{constructor(t=tl,n=()=>{}){this.maxBytes=t,this.drop=n}map=new Map;bytes=0;get size(){return this.map.size}has(t){return this.map.has(t)}get(t){const n=this.map.get(t);return n&&(this.map.delete(t),this.map.set(t,n)),n}byId(t){for(const n of this.map.values())if(n.sample===t)return n}put(t,n=new Set){const a=this.map.get(t.key);a&&(this.bytes-=a.bytes),this.map.delete(t.key),this.map.set(t.key,t),this.bytes+=t.bytes;for(const[i,r]of this.map){if(this.bytes<=this.maxBytes)break;i===t.key||n.has(i)||(this.map.delete(i),this.bytes-=r.bytes,this.drop(r))}}}class Gh{constructor(t,n=tl){this.host=t,this.cache=new Uh(n,a=>t.drop(a))}cache;current=new Map;wanted=new Map;inFlight=new Set;timer=null;queue=Promise.resolve();missingSig="";renders=0;lastMs=0;failed=!1;plan(t,n,a){this.wanted.clear();const i=[];t.forEach((d,u)=>{const c=d.sample?n(d.sample):void 0,p=Hh(d,c,a),f=this.current.get(u);if(!p){this.current.delete(u);return}this.wanted.set(u,p);const g=ct(p),w=this.cache.get(g);w?this.current.set(u,w):(f&&!Yh(f.job,p)&&this.current.delete(u),this.inFlight.has(g)||i.push(g))});const r=i.join("|");if(!i.length||this.failed){this.missingSig="";return}if(r===this.missingSig&&this.timer!==null)return;this.missingSig=r;const s=this.host.clearTimeout??(d=>clearTimeout(d)),l=this.host.setTimeout??((d,u)=>setTimeout(d,u));this.timer!==null&&s(this.timer),this.timer=l(()=>{this.timer=null,this.missingSig="",this.renderWanted()},Ih)}stretchedFor(t){return this.current.get(t)}renderFor(t){return this.current.get(t)}pending(t){const n=this.wanted.get(t);return n?this.current.get(t)?.key!==ct(n):!1}renderWanted(){for(const t of new Map([...this.wanted.values()].map(n=>[ct(n),n])).values()){const n=ct(t);this.cache.has(n)||this.inFlight.has(n)||(this.inFlight.add(n),this.queue=this.queue.then(()=>this.renderOne(n,t)))}}idle(){return this.queue}async renderOne(t,n){if(![...this.wanted.values()].some(s=>ct(s)===t)){this.inFlight.delete(t);return}const a=Date.now();let i=null;try{i=await this.host.run(n)}catch(s){console.error("NYX stretch",s)}if(this.inFlight.delete(t),!i){this.failed=!0,this.host.changed();return}this.lastMs=Date.now()-a,this.renders++;const r={key:t,job:n,sample:_h(t),frames:n.frames,bytes:i.reduce((s,l)=>s+l.byteLength,0)};this.host.deliver(r,i);for(const[s,l]of this.wanted)ct(l)===t&&this.current.set(s,r);this.cache.put(r,new Set([...this.current.values()].map(s=>s.key))),this.host.changed()}}const Yh=(e,t)=>e.sample===t.sample&&e.from===t.from&&e.to===t.to,Kh=48e3;function nl(e,t){try{const n=e?.latency?.(t);return typeof n=="number"&&Number.isFinite(n)&&n>0&&n<=Kh?Math.round(n):0}catch{return 0}}function Xh(e,t){return{from:e.from+t,to:e.to+t}}const Vh="instance",Qh=99;function Qn(e=typeof location>"u"?"":location.search){const t=new URLSearchParams(e).get(Vh)?.trim()??"";if(!/^\d+$/.test(t))return 1;const n=Number(t);return n>=2&&n<=Qh?n:1}function Jh(e,t){return t===1?e:`${e}#${t}`}function Zh(e,t){return t===1?e:`${e} ${t}`}let dt;function ef(e,t=Qn()){if(dt!==void 0)return dt;dt=null;try{if(typeof window>"u"||window.parent===window)return dt;const n=window.parent.ncStudio;n&&n.version===1&&(dt=n.attach(e,{instance:t}))}catch{}return dt}function tf(){let e;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(e=a.syncScope)}}catch{}if(!e)return{};const t=`/studio/${e}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${t}`,locks:n?{request:(a,i,r)=>n.request(`${a}${t}`,i,r)}:null}}function nf(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1&&typeof e.fxWorklet=="string"&&e.fxWorklet?e.fxWorklet:null}catch{return null}}function _e(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.grab?e.grab:null}catch{return null}}function xt(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.play?e.play:null}catch{return null}}function Jt(e,t=Qn()){return t>1?`${e}#${t}`:e}function af(e,t=Qn()){const n=xt()?.owner()??null;return n===null||n==="studio"||n===Jt(e,t)}const er="http://www.w3.org/2000/svg";function q(e,t={},...n){const a=document.createElement(e);for(const[i,r]of Object.entries(t))a.setAttribute(i,r);return a.append(...n),a}function Dt(e,t,n={}){return e?q("a",{href:e,target:"_blank",rel:"noopener noreferrer",...n},t):q("span",n,t)}function of(e){if(!e.length)return"M0 1H48";const t=e.map(r=>Math.sqrt(Math.max(0,r))),n=t.length,a=t.map((r,s)=>`${(s+.5)*48/n} ${1-Math.max(.04,r)*.96}`),i=[...t].map((r,s)=>`${(s+.5)*48/n} ${1+Math.max(.04,r)*.96}`).reverse();return`M0 1L${a.join("L")}L48 1L${i.join("L")}Z`}function rf(e){const t=document.createElementNS(er,"svg");t.setAttribute("viewBox","0 0 48 2"),t.setAttribute("preserveAspectRatio","none"),t.setAttribute("class","nyx-lib-wave"),t.setAttribute("aria-hidden","true");const n=document.createElementNS(er,"path");return n.setAttribute("d",of(e)),t.append(n),t}function sf(e){return e<1?`${e.toFixed(2)} s`:e<10?`${e.toFixed(1)} s`:`${Math.round(e)} s`}const lf={kick:"Kick",snare:"Snare",clap:"Clap",hat:"Hat",tom:"Tom",perc:"Perc",cymbal:"Cymbal",fx:"FX",tonal:"Tonal"};class cf{constructor(t){this.host=t,this.input=q("input",{type:"search",class:"nyx-lib-input",id:"nyx-library-ask",placeholder:"punchy kick, dusty funk kit",autocomplete:"off",spellcheck:"false",enterkeyhint:"search","aria-label":"Ask the Library","data-nyx-lib":"ask"});const n=q("label",{class:"nc-label",for:"nyx-library-ask"},"Ask");R(n,B("library:ask"),this.input),this.input.addEventListener("input",()=>this.schedule()),this.input.addEventListener("keydown",i=>{i.key==="Enter"?(i.preventDefault(),this.run()):i.key==="Escape"&&(i.preventDefault(),this.host.close())});const a=q("button",{type:"button",class:"nc-btn nyx-lib-close","data-nyx-lib":"close"},"Close");R(a,B("library:close"),a),a.addEventListener("click",()=>this.host.close()),this.forLine=q("p",{class:"nc-note nyx-lib-for","data-nyx-lib":"for"}),this.status=q("p",{class:"nc-note nyx-lib-status","data-nyx-lib":"status","aria-live":"polite"}),this.list=q("ul",{class:"nyx-lib-results","data-nyx-lib":"results"}),this.kitBtn=q("button",{type:"button",class:"nc-btn","data-nyx-lib":"kit"},"Build kit"),R(this.kitBtn,B("library:kit"),this.kitBtn),this.kitBtn.addEventListener("click",()=>void this.buildKit()),this.creditsBtn=q("button",{type:"button",class:"nc-btn","data-nyx-lib":"credits","aria-expanded":"false"},"Credits"),R(this.creditsBtn,B("library:credits"),this.creditsBtn),this.creditsBtn.addEventListener("click",()=>{this.creditsOpen=!this.creditsOpen,this.render()}),this.creditsEl=q("div",{class:"nyx-lib-credits",id:"nyx-library-credits","data-nyx-lib":"credits-list"}),this.creditsBtn.setAttribute("aria-controls",this.creditsEl.id),this.el=q("div",{class:"nyx-library",role:"region","aria-label":"Library","data-nyx-library":""},q("div",{class:"nyx-lib-ask"},n,this.input,a),this.forLine,this.list,this.status,q("div",{class:"nyx-lib-actions"},this.kitBtn,this.creditsBtn),this.creditsEl)}el;input;forLine;status;list;kitBtn;creditsBtn;creditsEl;lib=null;loading=null;failed=!1;query=null;hits=[];kit=[];playing=null;busy=null;creditsOpen=!1;message="";timer=null;isOpen=!1;open(t){this.isOpen=!0,t!==void 0&&(this.input.value=t),this.ensure().then(()=>this.run()),this.render()}closePanel(){this.isOpen=!1,this.host.stopPreview(),this.playing=null}focus(){this.input.focus()}get catalog(){return this.lib}ensure(){return this.lib?Promise.resolve(this.lib):(this.loading??=this.host.catalog().then(t=>(this.lib=t,this.failed=!1,this.render(),t),()=>(this.failed=!0,this.loading=null,this.render(),null)),this.render(),this.loading)}schedule(){this.timer&&clearTimeout(this.timer),this.timer=setTimeout(()=>this.run(),150)}run(){this.timer&&clearTimeout(this.timer),this.timer=null;const t=this.input.value;if(this.message="",!this.lib){this.ensure().then(n=>n&&this.run());return}t.trim()?(this.query=Ya(t,this.lib),this.kit=this.query.kit?Yo(this.lib,this.query):[],this.hits=this.query.kit?[]:Yp(this.lib,this.query,{limit:Fs})):(this.query=null,this.hits=[],this.kit=[]),this.render()}get results(){return{kit:!!this.query?.kit,ids:this.query?.kit?this.kit.map(t=>t.sound.id):this.hits.map(t=>t.sound.id),unknown:this.query?.unknown??[]}}async play(t){if(this.playing===t.id){this.host.stopPreview(),this.playing=null,this.render();return}this.playing=t.id,this.render();try{await this.host.preview(t)}finally{this.playing===t.id&&(this.playing=null,this.render())}}async load(t){if(!this.busy){this.busy=t.id,this.render();try{await this.host.load(t,this.input.value)}finally{this.busy=null,this.render()}}}async buildKit(){if(this.busy)return;const t=this.lib??await this.ensure();if(!t)return;const n=this.input.value,a=Ya(n,t),i=Yo(t,{...a,roles:[],kit:!0});if(!i.length){this.message="The Library has nothing for a kit yet.",this.render();return}this.busy="kit",this.render();try{await this.host.buildKit(i,n)}finally{this.busy=null,this.render()}}row(t,n){const a=this.playing===t.id,i=q("button",{type:"button",class:"nyx-lib-play","data-nyx-lib":"play","aria-label":`${a?"Stop":"Play"} ${t.title}`,"aria-pressed":String(a)},a?"■":"▶");R(i,B("library:play"),i),i.addEventListener("click",()=>void this.play(t));const r=this.busy===t.id,s=q("button",{type:"button",class:"nc-btn nyx-lib-load","data-nyx-lib":"load","aria-label":`Load ${t.title} onto ${this.host.target().title}`},r?"Loading…":"Load");this.busy&&(s.disabled=!0),R(s,B("library:load"),s),s.addEventListener("click",()=>void this.load(t));const l=Dt(t.licenseUrl,xi(t.license),{class:"nyx-lib-badge","data-nyx-lib":"badge"});R(l,B("library:badge"));const d=lf[t.role]??t.role,u=n?n.slot.role===t.role?n.slot.label:`${n.slot.label} · ${d}`:d,c=q("span",{class:"nyx-lib-meta"},`${u} · ${sf(t.measures.length)} · `,Dt(t.creatorLink,t.creator,{class:"nyx-lib-creator"})),p=q("span",{class:"nyx-lib-name",title:t.title},t.title),f=q("span",{class:"nyx-lib-main"},p,c);n?.note&&f.append(q("span",{class:"nyx-lib-meta nyx-lib-warn"},n.note));const g=q("span",{class:"nyx-lib-wavebox"},rf(t.wave));R(g,B("library:wave"));const w=q("li",{class:"nyx-lib-row","data-nyx-sound":t.id,"data-nyx-role":t.role},i,f,g,l,s);return a&&(w.dataset.nyxPlaying=""),w}renderCredits(){if(this.creditsBtn.setAttribute("aria-expanded",String(this.creditsOpen)),this.creditsEl.hidden=!this.creditsOpen,!this.creditsOpen)return;const t=this.host.pads(),n=Bs(t);if(!n.length){this.creditsEl.replaceChildren(q("p",{class:"nc-note"},"No Library sounds on the pads yet."));return}const a=q("ul",{class:"nyx-lib-credit-list"});for(const i of n){const r=`On pad${i.pads.length>1?"s":""} ${i.pads.join(", ")}`;a.append(q("li",{class:"nyx-lib-credit","data-nyx-credit":i.id},q("span",{class:"nyx-lib-name"},i.title),q("span",{class:"nyx-lib-meta"},"by ",Dt(i.creatorLink,i.creator)," · ",Dt(i.licenseUrl,i.license)," · ",Dt(i.source,"source"),` · via ${i.curator}`),q("span",{class:"nyx-lib-meta"},r)))}this.creditsEl.replaceChildren(a)}render(){const t=this.host.target();this.forLine.textContent=`Load goes on ${t.title}. Curated: every sound checked by a person.`;const n=[];if(this.query?.kit)for(const r of this.kit)n.push(this.row(r.sound,r));else for(const r of this.hits)n.push(this.row(r.sound));this.list.replaceChildren(...n);let a=this.message,i=!1;a||(this.failed?(a="The Library couldn't be reached. Check the connection, then ask again.",i=!0):this.lib?this.busy==="kit"?a="Building the kit…":this.query?this.query.kit?a=this.kit.length?"A kit for pads 1–8: Build kit puts it on them and keeps the pattern.":"Nothing for a kit.":this.hits.length?a="":a="Nothing matches. Try a role (kick, snare, hat) and a word like dark or tight.":a=`${this.lib.sounds.length} sounds. Try "punchy kick" or "funk kit".`:a="Opening the Library…",this.query?.unknown.length&&(a=`${a?`${a} `:""}Not in the Library's words: ${this.query.unknown.join(", ")}.`.trim())),this.status.textContent=a,this.status.hidden=!a,i?this.status.dataset.ncTone="danger":delete this.status.dataset.ncTone,this.kitBtn.textContent=this.busy==="kit"?"Building…":"Build kit",this.kitBtn.disabled=!!this.busy||!this.lib,this.renderCredits()}refresh(){const t=this.host.target(),n=`Load goes on ${t.title}. Curated: every sound checked by a person.`;if(this.forLine.textContent!==n){this.forLine.textContent=n;for(const a of this.list.querySelectorAll('[data-nyx-lib="load"]')){const i=a.closest("li")?.querySelector(".nyx-lib-name")?.textContent??"";a.setAttribute("aria-label",`Load ${i} onto ${t.title}`)}}this.creditsOpen&&this.renderCredits()}attach(t){if(!this.isOpen||!t){this.el.isConnected&&this.el.remove();return}if(t.nextElementSibling===this.el)return;const n=document.activeElement===this.input,{selectionStart:a,selectionEnd:i}=this.input;t.after(this.el),n&&(this.input.focus(),a!==null&&i!==null&&this.input.setSelectionRange(a,i))}}const Fi={knee:.6,ceiling:.944,range:4,points:8193};function df(e,{knee:t,ceiling:n}=Fi){const a=Math.abs(e);if(a<=t)return e;const i=n-t;return Math.sign(e)*(t+i*Math.tanh((a-t)/i))}function uf({range:e,points:t}=Fi){const n=new Float32Array(t);for(let a=0;a<t;a++)n[a]=df((2*a/(t-1)-1)*e);return n}function pf(e){const t=e.createGain();t.gain.value=1/Fi.range;const n=e.createWaveShaper();return n.curve=uf(),n.oversample="none",t.connect(n),{input:t,output:n}}const hf="nyx",ff=1;function al(e){const t={nyx:1,...Si(e)},n=Bs(e.pads);if(n.length&&(t.credits=n),Array.isArray(e.slots)){const a=Array.from({length:vt},(r,s)=>{const l=e.slots?.[s];return l?uh(l):null}),i=typeof e.active=="number"&&a[e.active]?e.active:null;Object.assign(t,{slots:a,active:i})}return t}function il(e){return ol(e),On(e)}function mf(e){ol(e);const t=e;if(!Array.isArray(t.slots))return null;const n=t.slots,a=Array.from({length:vt},(s,l)=>{const d=n[l];return d&&typeof d=="object"&&!Array.isArray(d)?On(d):null}),i=t.active,r=typeof i=="number"&&Number.isInteger(i)&&i>=0&&i<vt&&a[i]?i:null;return{slots:a,active:r}}function ol(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Not a NYX pattern.");const t=e.nyx;if(t!==1)throw new Error(`Not a NYX pattern${typeof t=="number"?` (version ${t})`:""}.`)}function Ni(){try{return globalThis.localStorage??null}catch{return null}}function gf(e,t,n=Ni()){let a;try{a=t?.storageKey?.(e)}catch{a=void 0}if(typeof a!="string"||!a||a===e)return e;try{if(n&&n.getItem(a)===null){const i=n.getItem(e);i!==null&&n.setItem(a,i)}}catch{}return a}const bf="nyx.state",rl="nyx.scene-samples",yf=/^[0-9a-f]{16,64}$/;function sl(e){try{const t=JSON.parse(e?.getItem(rl)??"[]");return Array.isArray(t)?t.filter(n=>typeof n=="string"&&yf.test(n)):[]}catch{return[]}}function wf(e,t=Ni()){if(!t)return;const n=new Set;for(const i of[e,...e.slots??[]])for(const r of i?.pads??[])r.sample&&n.add(r.sample);if(!n.size)return;const a=[...sl(t).filter(i=>!n.has(i)),...n].slice(-2048);try{t.setItem(rl,JSON.stringify(a))}catch{}}function vf(e,t=Ni()){const n=Vt(e);if(!t)return n;try{for(let a=0;a<t.length;a++){const i=t.key(a);if(i?.startsWith(bf))try{for(const r of Vt(js(JSON.parse(t.getItem(i)??"null"))))n.add(r)}catch{}}}catch{return null}for(const a of sl(t))n.add(a);return n}const xf="NYX Sampler",kt="nyx",le=Qn(),ie=ef(kt,le),ll=gf(Jh("nyx.state",le),ie),zi=.15,k=ph(ll),J=new qh(le>1?`nyx-${le}`:"nyx"),Jn=()=>hh(ll,k),et=()=>{const e=vf(k);if(e)for(const t of se?.before??[])t.pad.sample&&e.add(t.pad.sample);if(e)for(const t of Di)e.add(t);e&&J.prune(e)};let oe=!1,We=0,re=null,$t=!1,Xe="",F="";const Et=new Map;let cl=[],on=new Map;const Le=new Gl({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let N=null,Ut=null;const kf=new ac({...tf(),app:Zh(xf,le),version:"0.1.0",clock:Le,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const e=N?.state;return e==="running"?"running":e==="suspended"?"suspended":e?"none":"needs-gesture"},startGate:()=>Ut?.whenSettled?.()??null}),Zt=e=>e+(Ut?.offset??0),D=()=>Le.transport,At=()=>D().isPlayingAt(Q()),en=()=>At()&&!oe;let ma=null,Y=null,be=null,St=null,tr=null;const nr=new Set;function ce(){return tr??=(async()=>{ie?(N=ie.ctx,ma=ie.output,Ut=ie.mapper??new Zi(ie.ctx)):(N=new AudioContext({latencyHint:"interactive"}),ma=N.destination,Ut=new Zi(N)),Ut.start();try{await N.audioWorklet.addModule(Fh)}catch{return F="Audio could not start (the sampler's worklet did not load). Reload to try again.",T(),!1}Y=new AudioWorkletNode(N,"nyx-sampler",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]}),Y.port.onmessage=t=>$f(t.data),be=Ic(N,{moduleUrl:nf()??_c,bpm:D().bpm,slots:3,state:Qa(k.hacks)}),Ja=Qa(k.hacks),St=new GainNode(N,{gain:k.master}),Y.connect(be.input);const e=pf(N);be.output.connect(St).connect(e.input),e.output.connect(ma),Hc(be,Le,{toAudioTime:Zt,now:Q});for(const t of Vt(k))await rn(t);return tt(),Tt(),!0})(),tr}async function rn(e){const t=await J.get(e);return t?(Et.has(e)||Et.set(e,Zs(t.data)),Y&&!nr.has(e)&&(nr.add(e),Y.port.postMessage({type:"sample",hash:e,channels:t.data.map(n=>n.slice()),rate:t.sampleRate})),t):null}function $f(e){e.type!=="pos"||!e.voices||(cl=e.voices,on=new Map(e.voices.map(([t,n,a,i])=>{const r=Wh(i)?Ce.cache.byId(i):void 0,s=r?J.info(r.job.sample):void 0;return r&&s?[t,(r.job.from+n/r.frames*(r.job.to-r.job.from))/s.frames]:[t,n/Math.max(1,a)]})))}let Mn=null,Ef=0;const Ot=new Map,dl=[],Af=.25;function Sf(){if(Mn)return Mn;const e=new Worker(new URL("/nyx/assets/stretch-worker-DVLOsvIo.js",import.meta.url),{type:"module"});return e.onmessage=t=>{const n=t.data;Ot.get(n.id)?.(n),Ot.delete(n.id)},e.onerror=t=>{console.error("NYX stretch worker",t.message);for(const n of Ot.values())n({error:t.message||"worker failed"});Ot.clear()},Mn=e,e}async function Mf(e){const t=await J.get(e.sample);if(!t)return null;const n=Math.ceil(Af*e.sampleRate),a=Math.max(0,e.from-n),i=Math.min(t.frames,e.to+n),r=t.data.map(d=>d.slice(a,i)),s=++Ef,l=Sf();return new Promise(d=>{Ot.set(s,u=>{if(u.error||!u.channels){console.error("NYX stretch",u.error),d(null);return}typeof u.ms=="number"&&dl.push(Math.round(u.ms)),d(u.channels)}),l.postMessage({id:s,channels:r,sampleRate:e.sampleRate,from:e.from-a,to:e.to-a,frames:e.frames,semitones:e.semitones},r.map(u=>u.buffer))})}const Ce=new Gh({run:Mf,deliver(e,t){Y?.port.postMessage({type:"sample",hash:e.sample,channels:t,rate:e.job.sampleRate},t.map(n=>n.buffer))},drop(e){Y?.port.postMessage({type:"drop",hash:e.sample})},changed(){Ce.failed&&!F&&(F="Keep pitch couldn't start in this browser: fitted pads change speed and pitch instead."),tt(),T()}});function tt(){if(!Y)return;const e=D().bpm,t=n=>J.info(n);Ce.plan(k.pads,t,e),Y.port.postMessage({type:"program",program:Ch(k,t,e,n=>Ce.stretchedFor(n))})}let ar="";function Tt(e=!1){if(!Y)return;const t=D(),n=en();let a=0,i=t.bpm;if(t.running){const s=Math.max(0,t.beatAt(Q())),l=t.timeAt(s);i=60/(t.timeAt(s+1)-l),a=Zt(l)-s*60/i}const r=JSON.stringify([n,Math.round(a*2e3),i,We]);!e&&r===ar||(ar=r,Y.port.postMessage({type:"clock",clock:{playing:n,zero:a,bpm:i,join:We}}))}let Ja=null;function ul(){if(!be)return;const e=Qa(k.hacks),t=bh(Ja,e);if(Ja=e,t.whole)be.setState(e);else for(const[n,a,i]of t.params)be.setParam(n,a,i)}let Gt=null;function Tf(){if(Gt){const t=Gt;X(()=>{k.lanes=t}),F="Pattern back.",T();return}const e=structuredClone(k.lanes);e.some(t=>t.steps.some(n=>n.on)||t.mute||t.solo||t.length!==pe)&&(X(()=>{k.lanes=k.lanes.map(()=>Vn())}),re=null,Gt=e,F="Pattern cleared: press Undo to bring it back.",T())}function X(e){Gt=null;const t=Bi(!1);e(),t&&et(),k.active!==null&&($t=!0),Xe="",Jn(),tt(),ul(),T()}const O=e=>k.pads[e]??ve(e),Ee=e=>k.lanes[e]??Vn(),pl=()=>O(k.selected);function Zn(e,t=k.selected){X(()=>e(O(t)))}function Rn(e,t,n){X(()=>{const a=Ee(e).steps[t];a&&n(a)})}function Se(e,t=!0){k.selected=Math.max(0,Math.min(Me-1,e)),re&&re.lane!==k.selected&&(re=null),Jn(),t&&Be(k.selected),T()}async function Be(e,t=null,n=!1){if(!await ce()||!N||!Y)return;N.state!=="running"&&await N.resume().catch(()=>{});const a=O(e),i=a.sample?Lh(a,J.info(a.sample),D().bpm,t,Ce.stretchedFor(e)):null;i&&Y.port.postMessage({type:"play",pad:e,hit:i,hold:n})}async function nt(e,t,n,a,i=!0,r=null){const{sample:s,saved:l}=await J.put(t,n);await rn(s.hash),X(()=>{const d=O(e);d.sample=s.hash,d.provenance=r,d.name=a.slice(0,24)||`Pad ${e+1}`,d.start=0,d.end=1,d.slices=0,d.cuts=[],d.fit=0,d.keepPitch=!0}),F=l?"":"Kept until you reload: this browser has no file storage here.",et(),i&&Be(e)}async function Pi(e,t=k.selected){if(/\.json$/i.test(e.name)||e.type==="application/json"){await Rf(e);return}if(!await ce()||!N)return;let n;try{n=await N.decodeAudioData(await e.arrayBuffer())}catch{F=`Couldn't read ${e.name}: not an audio file this browser can decode.`,T();return}const{data:a,trimmed:i}=Js(n);await nt(t,a,n.sampleRate,e.name.replace(/\.[^.]+$/,"")),i&&(F=`${e.name} was cut to its first minute.`,T())}const Di=new Set;let se=null;function Ze(e,t=O(e).name){const n=`Pad ${e+1}`;return t===n?n:`${n} (${t})`}async function qi(e,t,n=""){return O(e).sample?Pr({title:`Replace ${Ze(e)}?`,body:t==="Grab"?"Grab replaces its sound, its slices and that lane's steps. Undo brings them back.":t==="Sent"?`${n} replaces its sound, its slices and that lane's steps. Undo brings them back.`:"The take replaces its sound, its slices and that lane's steps when it lands. Undo brings them back.",confirmLabel:"Replace",cancelLabel:"Cancel"}):!0}function sn(e){const t=Hs(k,e);return t.pad.sample&&Di.add(t.pad.sample),t}function ln(e,t,n){Bi();const a=Array.isArray(e)?e:[e],i=a[0],r=bp({message:n??(i?.pad.sample?`${t}: replaced ${Ze(i.index,i.pad.name)}.`:`${t} onto Pad ${(i?.index??0)+1}.`),actionLabel:"Undo",onAction:()=>void Oi(),onClose:()=>{se&&(se.toast=null)}}),s=r.el.querySelector("button");s instanceof HTMLElement&&R(s,B("grab-undo"),s),se={before:a,what:t,toast:r};for(const l of a)l.pad.sample&&Di.delete(l.pad.sample)}function Bi(e=!0){if(!se)return!1;const t=se;return se=null,t.toast?.close(),e&&et(),!0}async function Oi(){const e=se;if(!e)return!1;se=null,e.toast?.close();for(const n of e.before)n.pad.sample&&await rn(n.pad.sample);X(()=>{for(const n of e.before)ih(k,n)}),re&&e.before.some(n=>n.index===re?.lane)&&(re=null);const t=e.before[0];return F=e.before.length===1&&t?`Undone: ${Ze(t.index)} is back as it was.`:`Undone: pads ${e.before.map(n=>n.index+1).join(", ")} are back as they were.`,et(),T(),!0}let ga=null;function hl(){return ga??=fetch(Pp,{mode:"cors"}).then(e=>{if(!e.ok)throw new Error(`Library: HTTP ${e.status}`);return e.json()}).then(e=>Op(e)).catch(e=>{throw ga=null,e}),ga}const ba=new Map;function Lf(e){let t=ba.get(e.id);return t||(t=(async()=>{const n=await fetch(e.audio,{mode:"cors"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const a=await n.arrayBuffer(),i=new Uint8Array(await crypto.subtle.digest("SHA-256",a));if(Array.from(i,s=>s.toString(16).padStart(2,"0")).join("")!==e.sha256)throw new Error("the file isn't the one the Library lists");return a})(),t.catch(()=>ba.delete(e.id)),ba.set(e.id,t)),t}const ya=new Map;async function fl(e){if(!await ce()||!N)throw new Error("NYX's audio didn't start");const t=N;let n=ya.get(e.id);return n||(n=Lf(e).then(a=>t.decodeAudioData(a.slice(0))),n.catch(()=>ya.delete(e.id)),ya.set(e.id,n)),n}const ml=e=>10**(e/20);async function gl(e){const t=await fl(e),{data:n}=Js(t),a=ml(e.measures.gain);for(const i of n)for(let r=0;r<i.length;r++)i[r]=(i[r]??0)*a;return{data:n,rate:t.sampleRate}}let mt=null;function bl(){const e=mt;mt=null;try{e?.src.stop()}catch{}}async function yl(e){bl();let t;try{t=await fl(e)}catch(r){Ri(`Couldn't play ${e.title}: ${r.message}.`);return}if(!N||!St)return;N.state!=="running"&&await N.resume().catch(()=>{});const n=new AudioBufferSourceNode(N,{buffer:t}),a=new GainNode(N,{gain:ml(e.measures.gain)*ve(0).level});n.connect(a).connect(St);const i={src:n,id:e.id};mt=i,await new Promise(r=>{n.onended=()=>{a.disconnect(),mt===i&&(mt=null),r()},n.start()})}function Ri(e){F=e,T()}async function Ii(e,t,n=k.selected){let a;try{a=await gl(e)}catch(r){return Ri(`Couldn't load ${e.title}: ${r.message}.`),!1}const i=sn(n);return await nt(n,a.data,a.rate,ki(e.title),!0,qs(e,t)),F=`${e.title} on Pad ${n+1}: ${e.creator}, ${xi(e.license)}.`,ln(i,"Library"),T(),!0}async function Cf(e,t){if(!await ce())return!1;const n=await Promise.all(e.map(l=>gl(l.sound).then(d=>({ok:!0,...d}),d=>({ok:!1,error:`${l.sound.title}: ${d.message}`})))),a=n.flatMap(l=>l.ok?[]:[l.error]);if(a.length)return Ri(`The kit couldn't load (${a.join("; ")}). The pads are as they were.`),!1;const i=[];for(const l of n){if(!l.ok)continue;const d=await J.put(l.data,l.rate);await rn(d.sample.hash),i.push(d)}for(let l=0;l<e.length;l++)sn(l);let r=[];X(()=>{r=oh(k,e.map((l,d)=>({sample:i[d]?.sample.hash??"",name:ki(l.sound.title),provenance:qs(l.sound,t),hat:l.slot.role==="hat"})))});const s=e.flatMap(l=>l.note?[l.note]:[]);return F=`Kit on pads 1–${e.length}${t.trim()?` for "${t.trim()}"`:""}; the pattern stays.${s.length?` ${s.join(" ")}`:""}${i.some(l=>!l.saved)?" Kept until you reload: this browser has no file storage here.":""}`,ln(r,"Build kit",`Build kit: pads 1–${e.length} replaced.`),et(),T(),!0}function ji(e){const t=O(e).provenance,n=ue.catalog;if(!t||!n)return[];const a=new Set(k.pads.flatMap((i,r)=>r!==e&&i.provenance?[i.provenance.id]:[]));return Jp(n,t,a).map(i=>i.sound)}const ue=new cf({catalog:hl,target:()=>({index:k.selected,title:Ze(k.selected)}),pads:()=>k.pads,preview:yl,stopPreview:bl,load:(e,t)=>Ii(e,t),buildKit:Cf,close:()=>Mt(!1)});function Mt(e=!ue.isOpen,t){e?ue.open(t):ue.closePanel(),T(),e&&ue.focus()}const I={from:"master",bars:1,busy:!1};async function Hi(){const e=_e();if(!e||I.busy||!await ce()||!N)return;const t=D();if(!t.running){F="Play first: Grab takes the bars that just played.",T();return}const n=I.bars,a=Math.floor(t.beatAt(Q())/4)*4,i=a-4*n;if(i<0){F=`Grab needs ${n} whole bar${n===1?"":"s"} played first.`,T();return}const r=N.sampleRate,{from:s,to:l}=Xh({from:Math.round(Zt(t.timeAt(i))*r),to:Math.round(Zt(t.timeAt(a))*r)},nl(e,I.from)),d=k.selected;if(I.busy=!0,T(),!await qi(d,"Grab")){I.busy=!1,T();return}const u=e.takeResult?await e.takeResult(I.from,s,l):{channels:await e.take(I.from,s,l)},c=u.channels;I.busy=!1;const p=e.sources().find(w=>w.id===I.from)?.name??I.from;if(!c){F="reason"in u&&u.reason==="gone"?`Those bars of ${p} are gone (the Studio keeps the last 20 seconds): Grab again.`:`${p} isn't kept that far back yet: let it play ${n} more bar${n===1?"":"s"}, then Grab again.`,T();return}let f=0;for(const w of c)for(const y of w)f=Math.max(f,Math.abs(y));if(f<1e-4){F=`${p} was silent for those ${n===1?"bar":"bars"}.`,T();return}const g=sn(d);await nt(d,c,r,`${p} grab`),n===1?(X(()=>{const w=O(d);w.fit=1,w.keepPitch=!0,w.slices=16,w.cuts=[],w.decay=4;const y=Ee(d);y.length=pe;for(const h of y.steps)Object.assign(h,Xn(),{on:!0})}),F=`Grabbed a bar of ${p}: 16 slices, every step on. Move, mute or lock steps to remix it.`):(Zn(w=>{w.fit=n,w.keepPitch=!0},d),await Za(8,"transients",d),F=`Grabbed ${n} bars of ${p}, fitted to ${n} bars and sliced at the hits.`),ln(g,`Grabbed ${n===1?"a bar":`${n} bars`}`),T()}const ir=240,Ff=.25,S={phase:"idle",startBeat:0,pad:0,source:"master",rec:null,timer:0,lastBar:0,lastBarFrame:0,fromFrame:0,latency:0,bpm:120,warned:!1,label:""};function _i(e){const t=Math.floor(e/4)*4;return e-t<Ff?t:t+4}function Nf(e){const t=N?.sampleRate??48e3;return Math.round(Zt(D().timeAt(e))*t)}function wl(e){const t=N?.sampleRate??48e3;return S.fromFrame+Math.round((e-S.startBeat)*60/S.bpm*t)}function In(e=S.source){return _e()?.sources().find(t=>t.id===e)?.name??e}function Wi(){S.phase==="idle"?zf():S.phase==="armed"?(S.phase="idle",F="",T()):S.phase==="rec"&&Ui()}async function zf(){const e=_e();if(!e?.record){F="Take needs the Studio (reload it to update).",T();return}if(!await ce()||!N)return;const t=k.selected;if(await qi(t,"Take")&&S.phase==="idle"){if(S.source=I.from,S.pad=t,e.listen(S.source),!D().running){S.phase="armed",F="Take armed: starts with the music.",T();return}vl()}}function vl(){const e=_e();if(!e?.record||!N){S.phase="idle";return}const t=D();S.startBeat=Math.max(0,_i(t.beatAt(Q()))),S.fromFrame=Nf(S.startBeat),S.bpm=t.bpm,S.latency=nl(e,S.source);const n=e.record(S.source,S.fromFrame+S.latency);if(!n){S.phase="idle",F=`${In()} can't be recorded.`,T();return}S.rec=n,S.phase="rec",S.warned=!1,S.lastBar=S.startBeat,S.lastBarFrame=S.fromFrame,F=`Taking ${In()}: stop on any bar.`,window.clearInterval(S.timer),S.timer=window.setInterval(Pf,200),T()}function Pf(){if(S.phase!=="rec")return;const e=D();if(!e.running)return;const t=e.beatAt(Q()),n=Math.floor(t/4)*4;n>S.lastBar&&(S.lastBar=n,S.lastBarFrame=wl(n));const a=240/Math.max(1,e.bpm),i=(Math.max(S.startBeat+4,_i(t))-S.startBeat)*60/Math.max(1,e.bpm);if(i+a>ir){Ui();return}!S.warned&&i>ir-30&&(S.warned=!0,F="Take stops at four minutes: about 30 seconds left.");const r=xl();r!==S.label&&(S.label=r,T())}function xl(){if(S.phase==="armed")return"Armed: waits for Play";if(S.phase==="saving")return"Saving take…";if(S.phase!=="rec")return"Take";const e=D().beatAt(Q());return e<S.startBeat?"Starts on the bar…":`Stop take · bar ${Math.floor((e-S.startBeat)/4)+1}`}async function Ui(e=!1){const t=S.rec;if(S.phase!=="rec"||!t)return;window.clearInterval(S.timer);let n,a;e?(n=S.lastBar,a=S.lastBarFrame):(n=Math.max(S.startBeat+4,_i(D().beatAt(Q()))),a=wl(n));const i=Math.round((n-S.startBeat)/4);if(S.rec=null,i<1){t.cancel(),S.phase="idle",F="The music stopped before a whole bar was taken.",T();return}S.phase="saving",T();try{await Df(t,a,i,n)}finally{S.phase="idle",T()}}async function Df(e,t,n,a){let i=null;try{i=await e.stop(t+S.latency)}catch(l){console.error("NYX take",l)}const r=In();if(!i?.[0]?.length){F=`The take from ${r} came back empty.`,T();return}let s=0;for(const l of i)for(const d of l)s=Math.max(s,Math.abs(d));if(s<1e-4){F=`${r} was silent for the whole take.`,T();return}try{await qf(i,n,a,r)}catch(l){console.error("NYX take",l),F=`The take from ${r} couldn't be kept (${l instanceof Error?l.message:String(l)}).`,T()}}async function qf(e,t,n,a){const i=S.pad,r=`${a} take`.slice(0,20),s=k.pads.filter(u=>u.name.startsWith(r)).length+1,l=sn(i);await kl(i,e,N?.sampleRate??48e3,t,Math.round(S.startBeat/4),{name:`${r} ${s}`,endBeat:n}),ln(l,`Took ${t===1?"a bar":`${t} bars`}`),F=t<=Xt?`${t} bar${t===1?"":"s"} of ${a} on ${O(i).name}: it loops every ${t===1?"bar":`${t} bars`}. Tap the pad to play it any time.`:`${t} bars of ${a} on ${O(i).name}. Longer than ${Xt} bars, so it plays from the pad (tap or hold it), not the grid.`,T()}async function kl(e,t,n,a,i,r){await nt(e,t,n,r.name,!1);const s=a<=Xt;X(()=>rh(k,e,a,i));const l=D(),d=r.endBeat;if(d!==void 0&&s&&l.running&&Y&&N){const u=O(e),c=Ee(e).steps[0],p=c?Ci(u,0,c,J.info(u.sample??""),l.bpm,!1,Ce.stretchedFor(e)):null,g=l.beatAt(Q()+zi)-d;if(p&&g>0&&g<4*a){const w=Math.round(g*60/l.bpm*n*p.rate);p.from+w<p.to-1&&Y.port.postMessage({type:"play",pad:e,hit:{...p,from:p.from+w,attack:.005}})}}}let wa=!1;function $l(){return k.pads.map((e,t)=>({id:String(t+1),name:Ze(t),...e.sample?{filled:!0}:{}}))}async function El(e,t){const n=sh(t,k.pads.length);if(n<0)return{ok:!1,reason:"refused",message:`NYX has no pad ${t}.`};if(wa||S.phase!=="idle"&&S.pad===n)return{ok:!1,reason:"busy",message:`Pad ${n+1} is busy: try again in a moment.`};if(!await ce()||!N)return{ok:!1,reason:"refused",message:"NYX's audio didn't start."};wa=!0;try{const a=`${e.fromName}'s ${e.name}`;if(Se(n,!1),ie?.reveal?.(),T(),O(n).sample&&!await qi(n,"Sent",a))return F=`Kept ${Ze(n)}: ${a} was not placed.`,T(),{ok:!1,reason:"cancelled"};const i=e.channels.map(d=>new Float32Array(d)),r=e.bars,s=sn(n),l=e.name.slice(0,24);return r!==void 0&&Number.isInteger(r)&&r>=1?(await kl(n,i,e.sampleRate,r,0,{name:l}),F=r<=Xt?`${a} on Pad ${n+1}: fitted to ${r===1?"a bar":`${r} bars`}, it loops every ${r===1?"bar":`${r} bars`}.`:`${a} on Pad ${n+1}: ${r} bars, so it plays from the pad, not the grid.`):(await nt(n,i,e.sampleRate,l,!1),F=`${a} on Pad ${n+1}.`),ln(s,a),T(),{ok:!0,target:t,targetName:Ze(n)}}finally{wa=!1}}async function Bf(e){const t=await Oh(e);if(!t){F=`LUCY take ${e.id} could not be read.`,T();return}await nt(k.selected,t,e.sampleRate,`LUCY take ${e.id}`)}async function Al(){const e=k.selected,t=O(e);!t.sample||!await Pr({title:`Clear ${t.name}?`,body:"Its sample and settings go; its steps stay.",confirmLabel:"Clear"})||(X(()=>{k.pads[e]=ve(e)}),et())}async function Za(e,t,n=k.selected){const a=O(n);let i=[];if(e&&t==="transients"&&a.sample){const r=await J.get(a.sample);r&&(i=Bh(r.data,r.sampleRate,Math.floor(a.start*r.frames),Math.ceil(a.end*r.frames),e))}Zn(r=>{r.slices=e,r.cuts=i},n)}function Sl(e,t){const n=Os[e]??String(e+1);if(Bi(),t==="store")k.slots[e]=Si(k),k.active=e,$t=!1,Xe=`Stored in ${n}`;else if(t==="clear")k.slots[e]=null,k.active===e&&(k.active=null),Xe=`Cleared ${n}`,et();else{const a=k.slots[e];if(!a){Xe=`${n} is empty: Shift-click or long-press to store`,T();return}Ml(a),k.active=e,$t=!1,Xe=`Recalled ${n}`}Jn(),tt(),ul(),T()}function Ml(e){const t=structuredClone(e);k.pads=t.pads,k.lanes=t.lanes,k.swing=t.swing,k.hacks=t.hacks,re=null;for(const n of Vt(k))rn(n).then(()=>tt())}async function Tl(){if(await ce(),N&&N.state!=="running"&&await N.resume().catch(()=>{}),ie&&At()){if(oe=!oe,!oe){const e=D();We=e.nextBar(e.beatAt(Q()+zi))}Tt(!0),T(),oe&&xt()?.out?.(Jt(kt,le));return}At()?Le.stop({at:Q()}):(oe=!1,We=0,ie&&xt()?.claim(Jt(kt,le)),Le.play({at:Q()}))}let or=D().running;Le.onChange(()=>{D().running&&!or&&ie&&(oe=!af(kt,le)),or=D().running,D().running&&S.phase==="armed"&&vl(),!D().running&&S.phase==="rec"&&Ui(!0),D().running||(oe=!1,We=0),tt(),Tt(!0),T()});xt()?.member?.(Jt(kt,le),()=>D().running&&!oe);xt()?.onAll(()=>{if(oe){if(oe=!1,At()){const e=D();We=e.nextBar(e.beatAt(Q()+zi))}Tt(!0),T()}});function Of(){const e=al(k),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=`nyx${le>1?`-${le}`:""}-pattern-${new Date().toISOString().slice(0,10)}.json`,n.hidden=!0,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e4)}async function Rf(e){let t;try{t=JSON.parse(await e.text()),il(t)}catch{F=`Couldn't read ${e.name}: not a NYX pattern.`,T();return}await Ll(t,`Loaded ${e.name}.`)}async function Ll(e,t){const n=il(e),a=mf(e);X(()=>{a&&(k.slots=a.slots,k.active=a.active),Ml(n)}),a&&($t=k.active!==null&&JSON.stringify(Si(k))!==JSON.stringify(k.slots[k.active])),Xe="";const i=[],r=new Set;for(const l of k.pads)l.sample&&!await J.get(l.sample)&&i.push(l.name);for(const l of k.slots)for(const d of l?.pads??[])d.sample&&!k.pads.some(u=>u.sample===d.sample)&&r.add(d.sample);let s=0;for(const l of r)await J.get(l)||s++;F=i.length?`Loaded. ${i.length===1?"One pad needs its":`${i.length} pads need their`} sample again (${i.join(", ")}): samples stay in the browser they were loaded in.`:s?`${t} ${s===1?"One sample":`${s} samples`} in the slots ${s===1?"isn't":"aren't"} in this browser: samples stay in the browser they were loaded in.`:t,tt(),T()}function If(){Y?.port.postMessage({type:"stop"}),At()&&(ie?(oe=!0,xt()?.out?.(Jt(kt,le))):Le.stop({at:Q()})),Tt(!0),be?.clear({fadeMs:20}),T()}function jf(e){k.master=Math.min(1,Math.max(0,e)),Jn(),St&&N&&St.gain.setTargetAtTime(k.master,N.currentTime,.01),tn.value=String(k.master),Gi.textContent=`${Math.round(k.master*100)}%`}const G=(e,t={},...n)=>{const a=document.createElement(e);for(const[i,r]of Object.entries(t))a.setAttribute(i,r);return a.append(...n),a},ea=document.getElementById("app");ea.classList.add("nc","nc-page");vp();const Cl=G("header",{class:"nc-page-hd"},G("div",{},G("h1",{class:"nc-page-title",...xh("page:title")},G("span",{style:"color: var(--nc-ui-instrument-nyx)"},"NYX")," ",G("span",{class:"nc-page-sep"},"/")," SAMPLER ",G("span",{class:"nc-page-sep"},"/")," ",G("span",{class:"nc-mono"},String(le).padStart(2,"0"))),G("p",{class:"nc-page-sub"},"A NetComposer element."))),tn=G("input",{type:"range",class:"nc-range",id:"nyx-master",min:"0",max:"1",step:"0.01",value:String(k.master),"data-nc-id":"nyx-master"});tn.addEventListener("input",()=>jf(Number(tn.value)));const Gi=G("span",{class:"nc-readout","data-nc-readout":""});Gi.textContent=`${Math.round(k.master*100)}%`;const rr="audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.aif,.aiff,.webm",Ve=G("input",{type:"file"});Ve.hidden=!0;let sr="pad";Ve.addEventListener("change",()=>{const e=Ve.files?.[0];Ve.value="",e&&Pi(e)});function Yi(e){sr=e,Ve.accept=sr==="pad"?rr:`${rr},.json,application/json`,Ve.click()}const ei=(e,t)=>{const n=G("button",{type:"button",class:"nc-page-action","data-nyx-action":e.toLowerCase()},e);return R(n,B(`page:${e.toLowerCase()}`),n),n.addEventListener("click",t),n},Fl=G("label",{class:"nc-label",for:"nyx-master"},"Master");R(Fl,B("page:master"),tn);const lr=Ap({panel:G("div",{},G("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},Fl,tn,Gi),ei("Save",Of),ei("Load",()=>Yi("any")))});Cl.append(G("div",{class:"nc-page-actions"},lr.panel,ei("Panic",If),lr.button,Ve));const he=G("div",{class:"nc-stack","data-nc-layout":"adjacent"});ea.append(Cl,G("main",{class:"nc-page-body"},he));ea.addEventListener("dragover",e=>{e.dataTransfer?.types.includes("Files")&&e.preventDefault()});ea.addEventListener("drop",e=>{const t=e.dataTransfer?.files?.[0];t&&(e.preventDefault(),Pi(t))});function cr(e){return Math.abs(e)<.01?"C":`${e<0?"L":"R"}${Math.round(Math.abs(e)*100)}`}function Nl(){return At()?oe?"Sitting out":D().beatAt(Q())<We?"Joining on the next bar":"Playing":k.pads.some(t=>t.sample)?"Stopped":"Load a sample to start"}function Hf(e){if(e==="always")return"Always";if(e==="fill")return"Only in Fill";if(e==="!fill")return"Not in Fill";if(e==="pre")return"If the last one played";if(e==="!pre")return"If the last one didn't";const[t,n]=e.split(":");return`Pass ${t} of every ${n}`}const zl=[{mode:"repeat16",label:"1/16",title:"Repeat the last 16th while held"},{mode:"repeat8",label:"1/8",title:"Repeat the last 8th while held"},{mode:"reverse",label:"Rev",title:"Play what just happened backwards while held"},{mode:"half",label:"Half",title:"Half speed while held"},{mode:"stop",label:"Stop",title:"Slow to a halt like a tape machine while held"}],nn={fill:!1,perform:null};function jn(e){nn.fill!==e&&(nn.fill=e,Y?.port.postMessage({type:"fill",on:e}),T())}function ti(e){nn.perform!==e&&(nn.perform=e,Y?.port.postMessage({type:"perform",mode:e}),T())}function _f(e){const t=i=>{const s=(i.target instanceof Element?i.target:null)?.closest('[data-nc-id="perform"] [data-nc-choice]'),l=s instanceof HTMLElement?s.dataset.ncChoice:void 0;return zl.some(d=>d.mode===l)?l:null},n=i=>{ce(),i==="fill"?jn(!0):ti(i)},a=()=>{jn(!1),ti(null)};e.addEventListener("pointerdown",i=>{const r=t(i);if(!r)return;i.preventDefault(),n(r);const s=()=>{a(),window.removeEventListener("pointerup",s),window.removeEventListener("pointercancel",s)};window.addEventListener("pointerup",s),window.addEventListener("pointercancel",s)}),e.addEventListener("keydown",i=>{if((i.key===" "||i.key==="Enter")&&!i.repeat){const r=t(i);if(!r)return;i.preventDefault(),n(r)}}),e.addEventListener("keyup",i=>{(i.key===" "||i.key==="Enter")&&t(i)&&a()}),window.addEventListener("blur",a)}function Wf(){return{id:"transport",title:"Transport",status:Xe,controls:[{type:"button",id:"play",label:en()?"Stop":"Play",on:en(),onPress:()=>void Tl()},{type:"label",id:"perform-label",text:"Hold to play"},{type:"choice",id:"perform",label:"Hold",value:nn.perform??"",options:zl.map(e=>({value:e.mode,label:e.label})),onChange:()=>{}},{type:"slider",id:"tempo",label:"Tempo",min:40,max:240,step:1,value:Math.round(D().bpm),valueText:`${Math.round(D().bpm)} BPM`,onChange:e=>{Le.setTempo({bpm:e}),T()}},{type:"group",id:"transport-more",title:"Swing",collapse:"phone",summary:we(k.swing),controls:[{type:"slider",id:"swing",label:"Swing",min:.5,max:.75,step:.01,value:k.swing,valueText:we(k.swing),onChange:e=>X(()=>{k.swing=e})}]},{type:"readout",id:"status",label:"Status",value:Nl()},{type:"slotRow",id:"slots",morph:0,morphText:"",slots:Os.map((e,t)=>({label:e,filled:k.slots[t]!=null,active:k.active===t,edited:k.active===t&&$t})),onMorph:()=>{},onSlot:(e,t)=>Sl(e,t)}]}}function Pl(){if(!en())return-1;const e=D().beatAt(Q());return e<0||e<We?-1:Math.floor(e/Ah)%pe}function Uf(){const e=pl(),t=Pl();return{id:"pattern",title:"Pattern",lead:!0,summary:`${k.lanes.filter(n=>n.steps.some(a=>a.on)).length} lanes · ${e.name}`,sections:[{id:"grid",controls:[{type:"stepGrid",id:"grid",playhead:t,selectedRow:`pad-${k.selected}`,rows:k.lanes.map((n,a)=>({id:`pad-${a}`,label:O(a).name,length:n.length,lane:a%4+1,mute:n.mute,solo:n.solo,steps:n.steps.map(i=>({on:i.on,accent:i.accent,velocity:i.velocity,dim:!O(a).sample}))})),onToggle:(n,a,i)=>Rn(n,a,r=>{i?(r.accent=r.on?!r.accent:!0,r.on=!0):(r.on=!r.on,r.on||(r.accent=!1))}),onSet:(n,a,i,r)=>Rn(n,a,s=>{i==="on"?(s.on=r,r||(s.accent=!1)):(s.accent=r,r&&(s.on=!0))}),onSelectRow:n=>Se(n),onLongPress:(n,a)=>{re={lane:n,step:a},Se(n,!1)},onMute:n=>X(()=>{Ee(n).mute=!Ee(n).mute}),onSolo:n=>X(()=>{Ee(n).solo=!Ee(n).solo}),onLength:(n,a)=>X(()=>{Ee(n).length=Math.max(1,Math.min(pe,a))}),transport:{playing:en(),onToggle:()=>void Tl()},onFill:n=>jn(n),onClear:()=>Tf(),clearLabel:Gt?"Undo":"Clear"},{type:"note",id:"grid-help",text:"Tap a name to hear it. Long-press a step for its locks."}]},{id:"pads",title:"Pad",controls:[{type:"padGrid",id:"pads",label:"Pads",columns:4,selected:k.selected,pads:k.pads.map((n,a)=>({label:n.name,empty:!n.sample,peaks:n.sample?Et.get(n.sample):void 0,lane:a%4+1,playing:on.has(a),badge:n.choke?_n[n.choke-1]:void 0,badgeLabel:n.choke?`choke group ${_n[n.choke-1]}`:void 0})),onDown:n=>Kf(n),onPress:n=>Xf(n),onFile:(n,a)=>{Se(n,!1),Pi(a,n)},onMove:(n,a,i)=>Vf(n,a,i),menu:n=>Jf(n),onMenu:(n,a)=>void Zf(n,a),onRename:(n,a)=>Qf(n,a)},{type:"button",id:"library",label:ue.isOpen?"Close library":"Library",on:!1,onPress:()=>Mt()}]}]}}function Gf(e){if(!re||re.lane!==k.selected)return[];const{lane:t,step:n}=re,a=Ee(t).steps[n];if(!a)return[];const i=r=>Rn(t,n,r);return[{type:"label",id:"lock-label",text:`Step ${n+1}`},{type:"slider",id:"lock-velocity",label:"Velocity",min:0,max:1,step:.01,value:a.velocity,valueText:we(a.velocity),onChange:r=>i(s=>{s.velocity=r})},{type:"slider",id:"lock-chance",label:"Chance",min:0,max:1,step:.05,value:a.chance,valueText:we(a.chance),onChange:r=>i(s=>{s.chance=r})},...e.slices?[{type:"select",id:"lock-slice",label:"Slice",value:a.slice===null?"auto":String(a.slice),options:[{value:"auto",label:`In order (${n%e.slices+1})`},...Array.from({length:e.slices},(r,s)=>({value:String(s),label:`Slice ${s+1}`}))],onChange:r=>i(s=>{s.slice=r==="auto"?null:Number(r)})}]:[],{type:"slider",id:"lock-pitch",label:"Pitch",min:-12,max:12,step:1,value:a.pitch,valueText:Qt(a.pitch," st"),onChange:r=>i(s=>{s.pitch=r})},{type:"select",id:"lock-cond",label:"Plays",value:a.cond,options:Ka.map(r=>({value:r,label:Hf(r)})),onChange:r=>i(s=>{Ka.includes(r)&&(s.cond=r)})},{type:"choice",id:"lock-reverse",label:"Direction",value:a.reverse?"rev":"pad",options:[{value:"pad",label:"As the pad"},{value:"rev",label:"Reversed"}],onChange:r=>i(s=>{s.reverse=r==="rev"})},{type:"button",id:"lock-done",label:"Done",on:!1,onPress:()=>{re=null,T()}}]}function Yf(){const e=_e();if(!e)return[];const t=e.sources();return[{type:"label",id:"grab-label",text:e.record?"Grab or take":"Grab the bar"},{type:"select",id:"grab-from",label:"From",value:I.from,options:t.map(n=>({value:n.id,label:n.name})),onChange:n=>{I.from=n,e.listen(n),T()}},{type:"choice",id:"grab-bars",label:"Bars",value:String(I.bars),options:[1,2,4].map(n=>({value:String(n),label:String(n)})),onChange:n=>{I.bars=n==="4"?4:n==="2"?2:1,T()}},{type:"button",id:"grab",label:I.busy?"Grabbing…":I.bars===1?"Grab last bar":`Grab last ${I.bars} bars`,on:I.busy,onPress:()=>void Hi()},...e.record?[{type:"button",id:"take",label:xl(),on:S.phase!=="idle",onPress:()=>Wi()}]:[]]}let Hn=-1;function Kf(e){if(!O(e).sample)return;Hn=e,Se(e);const t=()=>{Hn=-1};window.addEventListener("pointerup",()=>setTimeout(t),{once:!0})}function Xf(e){if(Hn===e){Hn=-1;return}if(!O(e).sample){Se(e,!1),Yi("pad");return}Se(e)}function Vf(e,t,n){X(()=>{const a=structuredClone(O(e)),i=structuredClone(O(t));k.pads[t]=a,n||(k.pads[e]=i.sample?i:ve(e))}),Se(t,!1)}const _n=["A","B","C","D"];function Qf(e,t){Zn(n=>{n.name=t.slice(0,24)},e)}function Jf(e){const t=!!O(e).sample,n=[{id:"load",label:t?"Replace…":"Load a file…"}];for(const i of el().slice(-4).reverse())n.push({id:`take-${i.id}`,label:`LUCY take ${i.id}`});if(_e()&&n.push({id:"grab",label:I.bars===1?"Grab the last bar":`Grab the last ${I.bars} bars`}),_e()?.record&&n.push({id:"record",label:S.phase==="rec"?"Stop the take":`Take from ${In(I.from)}`}),n.push({id:"library",label:"Library…"}),O(e).provenance){const i=ji(e);if(i.length)for(const r of i)n.push({id:`alt-${r.id}`,label:`Alternative: ${ki(r.title)}`});else ue.ensure().then(()=>T()),n.push({id:"alternatives",label:"Alternatives…"})}return t&&n.push({id:"rename",label:"Rename…"},{id:"clear",label:"Clear"}),n}async function Zf(e,t){if(Se(e,!1),t==="load")Yi("pad");else if(t==="grab")await Hi();else if(t==="record")Wi();else if(t==="clear")await Al();else if(t==="library")Mt(!0);else if(t==="alternatives"){const n=O(e).provenance;Mt(!0,n?n.query||n.role:void 0)}else if(t.startsWith("alt-")){const n=ji(e).find(a=>`alt-${a.id}`===t);n&&await Ii(n,O(e).provenance?.query??"",e)}else if(t.startsWith("take-")){const n=el().find(a=>`take-${a.id}`===t);n&&await Bf(n)}}const Ki=new Eh;document.addEventListener("keydown",e=>{!se||e.repeat||e.shiftKey||e.altKey||!(e.metaKey||e.ctrlKey)||e.key.toLowerCase()!=="z"||(e.target instanceof HTMLElement?e.target:null)?.closest("input, select, textarea, [contenteditable]")||(e.preventDefault(),Oi())});const Dl=e=>Y?.port.postMessage({type:"release",pad:e});document.addEventListener("keydown",e=>{if(e.repeat||e.metaKey||e.ctrlKey||e.altKey||(e.target instanceof HTMLElement?e.target:null)?.closest("input, select, textarea, [contenteditable]"))return;const n=Ys(e);n<0||!O(n).sample||(e.preventDefault(),!(Ki.press(e)<0)&&Be(n,null,!0))});document.addEventListener("keyup",e=>{const t=Ki.release(e);t>=0&&Dl(t)});window.addEventListener("blur",()=>{for(const e of Ki.releaseAll())Dl(e)});function Xi(e){const t=B("kit:pad-key");e.querySelectorAll('[data-nc-id="pads"] .nc-padgrid-pad').forEach((n,a)=>{const i=$h[a];if(!i)return;let r=n.querySelector(":scope > .nyx-pad-key");r||(r=G("span",{class:"nyx-pad-key","aria-hidden":"true"}),n.append(r)),r.textContent!==i&&(r.textContent=i),R(r,t)})}function ql(e){const t=e.querySelector('[data-nc-id="fit-speed"]');if(!t)return;const n=pl(),a=n.sample?J.info(n.sample):void 0,i=Number((a?Vs(n,a,D().bpm):1).toFixed(2)),r=n.keepPitch&&(i<Zo[0]||i>Zo[1]);t.toggleAttribute("data-nyx-far",r)}function em(){const e=k.selected,t=O(e),n=t.sample?J.info(t.sample):void 0,a=Li(t).slice(1,-1),i=t.end-t.start,r=n?n.frames/n.sampleRate:0,s=!!t.sample,l=s&&!n,d=c=>Zn(c),u=s?[...t.provenance?[{type:"readout",id:"credit",label:"Credit",value:`${t.provenance.creator} · ${xi(t.provenance.license)}`}]:[],{type:"readout",id:"sample",label:"Length",value:l?"Not in this browser: load it again":`${Ke(r*i)} of ${Ke(r)} · ${n?.channels===2?"stereo":"mono"}`},{type:"choice",id:"mode",label:"Mode",value:t.mode,options:[{value:"oneshot",label:"One-shot"},{value:"gate",label:"Gate"},{value:"loop",label:"Loop"}],onChange:c=>d(p=>{p.mode=c})},{type:"choice",id:"dir",label:"Direction",value:t.dir,options:[{value:"fwd",label:"Forward"},{value:"rev",label:"Reverse"},{value:"pingpong",label:"Ping-pong"}],onChange:c=>d(p=>{(c==="fwd"||c==="rev"||c==="pingpong")&&(p.dir=c)})},{type:"slider",id:"start",label:"Start",min:0,max:1,step:.001,value:t.start,valueText:Ke(t.start*r),onChange:c=>d(p=>{p.start=Math.min(c,p.end-.002)}),onCommit:()=>void Be(e)},{type:"slider",id:"end",label:"End",min:0,max:1,step:.001,value:t.end,valueText:Ke(t.end*r),onChange:c=>d(p=>{p.end=Math.max(c,p.start+.002)}),onCommit:()=>void Be(e)},{type:"select",id:"slices",label:"Slices",value:String(t.slices),options:Rs.map(c=>({value:String(c),label:c?`${c}`:"Off"})),onChange:c=>void Za(Number(c),t.cuts.length?"transients":"even")},...t.slices?[{type:"choice",id:"chop",label:"Chop",value:t.cuts.length?"transients":"even",options:[{value:"even",label:"Even"},{value:"transients",label:"At hits"}],onChange:c=>void Za(t.slices,c==="transients"?"transients":"even")}]:[],{type:"group",id:"tune-shape",title:"Tune & shape",summary:mh(t),controls:[{type:"label",id:"pitch-label",text:"Pitch"},{type:"slider",id:"tune",label:"Tune",min:-24,max:24,step:1,value:t.tune,valueText:Qt(t.tune," st"),onChange:c=>d(p=>{p.tune=c}),onCommit:()=>void Be(e)},{type:"slider",id:"fine",label:"Fine",min:-100,max:100,step:1,value:t.fine,valueText:Qt(t.fine," ct"),onChange:c=>d(p=>{p.fine=c})},{type:"select",id:"fit",label:"Fit to bars",value:String(t.fit),options:[{value:"0",label:"Off"},...[1,2,4,8].map(c=>({value:String(c),label:`${c} bar${c===1?"":"s"}`}))],onChange:c=>d(p=>{p.fit=Number(c)})},...t.fit&&n?[{type:"choice",id:"keep-pitch",label:"Keep pitch",value:t.keepPitch?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:c=>d(p=>{p.keepPitch=c==="on"})},{type:"readout",id:"fit-speed",label:"Speed",value:`${fh(Vs(t,n,D().bpm))}${t.keepPitch&&Ce.pending(e)&&!Ce.failed?" · stretching…":""}`}]:[],{type:"label",id:"shape-label",text:"Shape"},{type:"slider",id:"attack",label:"Attack",min:0,max:.1,step:.001,taper:"time",value:t.attack,valueText:Ke(t.attack),onChange:c=>d(p=>{p.attack=c})},{type:"slider",id:"decay",label:"Decay",min:.01,max:4,step:.01,taper:"time",value:t.decay,valueText:An(t.decay),onChange:c=>d(p=>{p.decay=c}),onCommit:()=>void Be(e)},{type:"slider",id:"cutoff",label:"Filter",min:-1,max:1,step:.01,value:t.cutoff,valueText:En(t.cutoff),onChange:c=>d(p=>{p.cutoff=Math.abs(c)<.02?0:c})},{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:we(t.resonance),onChange:c=>d(p=>{p.resonance=c})}]},{type:"label",id:"out-label",text:"Output"},{type:"slider",id:"level",label:"Level",min:0,max:1,step:.01,value:t.level,valueText:we(t.level),onChange:c=>d(p=>{p.level=c})},{type:"group",id:"pad-more",title:"Pan & choke",collapse:"phone",summary:`Pan ${cr(t.pan)} · Choke ${t.choke?_n[t.choke-1]:"none"}`,controls:[{type:"slider",id:"pan",label:"Pan",min:-1,max:1,step:.01,value:t.pan,valueText:cr(t.pan),onChange:c=>d(p=>{p.pan=Math.abs(c)<.02?0:c})},{type:"select",id:"choke",label:"Choke",value:String(t.choke),options:[{value:"0",label:"None"},..._n.map((c,p)=>({value:String(p+1),label:`Group ${c}`}))],onChange:c=>d(p=>{p.choke=Number(c)})},{type:"button",id:"clear-pad",label:"Clear pad",on:!1,onPress:()=>void Al()}]}]:[];return{id:"params",title:"Params",summary:t.name,controls:[...s?[{type:"canvas",id:"wave",label:"Wave",paint:"waveform",peaks:t.sample?Et.get(t.sample)??[]:[],region:[t.start,t.end],markers:a.map(c=>t.start+c*i),position:on.get(e)??-1}]:[],...F?[{type:"note",id:"notice",text:F}]:[],...Gf(t),...u,...Yf()]}}function ni(e,t){X(()=>t(k.hacks[e]))}function tm(e,t){const n=k.hacks[e].dials[t.key]??t.default,a=`hack-${e}-${t.key}`,i=r=>ni(e,s=>{s.dials[t.key]=r});return t.options?{type:"select",id:a,label:t.label,value:String(n),options:t.options.map(r=>({value:String(r.value),label:r.label})),onChange:r=>i(Number(r))}:{type:"slider",id:a,label:t.label,min:t.min,max:t.max,step:t.step??1,taper:Nd(t),value:n,valueText:yr(t,n,D().bpm),onChange:i}}const yn=(e,t)=>(Fe(e)?.dials??[]).filter(n=>!n.key.startsWith("mod_")&&n.more===!0===t).map(n=>tm(e,n)),dr=new Map;function va(e){let t=dr.get(e);if(t)return t;let n=0,a=null;const i={in:0,out:0},r=()=>{const s=Rc(be,e);if(s!==a){for(let l=0;l<n;l++)a?.close();a=s;for(let l=0;l<n;l++)a?.open()}};return t={open:()=>(r(),n++,a?.open(),!0),close:()=>{n!==0&&(r(),n--,a?.close())},read:()=>(r(),a?.read()??i)},dr.set(e,t),t}function nm(){const e=k.hacks,t=e.filter,n=t.mode==="lp"&&t.cutoff>=.999,a=r=>X(()=>r(k.hacks.filter)),i=[Gs(t)?"":"Filter",e.drive.on?"Drive":"",e.compressor.on?"Comp":""].filter(Boolean);return{id:"hacks",title:"Hacks",summary:i.length?i.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:t.on,meter:va(`${Mi(t).type}-1`),meterHelp:B("hack-meter"),onToggle:r=>a(s=>{s.on=r}),controls:[{type:"select",id:"filter-mode",label:"Mode",value:t.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:r=>a(s=>{(r==="lp"||r==="hp"||r==="bp")&&(s.mode=r)})},{type:"slider",id:"filter-cutoff",label:"Cutoff",min:0,max:1,step:.01,value:t.cutoff,valueText:n?"open":Va(Us(t.cutoff)),onChange:r=>a(s=>{s.cutoff=r})},...t.mode==="lp"?[]:[{type:"slider",id:"filter-resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:we(t.resonance),onChange:r=>a(s=>{s.resonance=r})}],{type:"canvas",id:"filter-curve",label:"Curve",paint:"filter",mode:t.mode,cutoff:t.cutoff,resonance:t.mode==="lp"?0:t.resonance,...gh(t)}]},{type:"group",id:"hacks-more",title:"Drive & Compressor",collapse:"phone",summary:`Drive ${e.drive.on?"on":"off"} · Compressor ${e.compressor.on?"on":"off"}`,controls:[{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:e.drive.on,meter:va("drive-1"),meterHelp:B("hack-meter"),onToggle:r=>ni("drive",s=>{s.on=r}),controls:yn("drive",!1),more:yn("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:e.compressor.on,meter:va("compressor-1"),meterHelp:B("hack-meter"),onToggle:r=>ni("compressor",s=>{s.on=r}),controls:yn("compressor",!1),more:yn("compressor",!0)}]}]}}const Vi=[Wf,Uf,em,nm].map(e=>({def:e,handle:Np(e())}));zp(he,Vi.map(e=>e.handle),"adjacent");_f(he);Xi(he);Ti(he);function Bl(){ue.attach(he.querySelector('[data-nc-section="pads"] [data-nc-id="library"]'))}function T(){for(const e of Vi)e.handle.update(e.def());Bl(),ue.isOpen&&ue.refresh(),Xi(he),ql(he),Ti(he)}let ur="";function Ol(){Tt();const e=on.get(k.selected)??-1,t=JSON.stringify([Pl(),Nl(),Math.round(e*400)]);if(t!==ur){ur=t;for(const n of Vi.slice(0,3))n.handle.update(n.def());Bl(),Xi(he),ql(he),Ti(he)}requestAnimationFrame(Ol)}requestAnimationFrame(Ol);kf.start();Promise.all([...Vt(k)].map(e=>J.get(e))).then(e=>{for(const t of e)t&&!Et.has(t.hash)&&Et.set(t.hash,Zs(t.data));T()});if(ie)ce(),ie.providePreset?.({format:hf,version:ff,get:()=>(wf(k),al(k)),set:async e=>{await Ll(e,"Loaded the Scene's pattern.")}}),_e()?.listen(I.from),ie.onAudio?.({label:"Pad",targets:$l,receive:El});else{const e=()=>{ce()};document.addEventListener("pointerdown",e,{once:!0,capture:!0}),document.addEventListener("keydown",e,{once:!0,capture:!0})}window.__nyx={state:k,clock:Le,store:J,stretcher:Ce,stretchTimes:dl,get stretchLoaded(){return Mn!==null},get ctx(){return N},get fx(){return be},get positions(){return on},get voices(){return cl},ensureAudio:ce,play:Be,async setSample(e,t,n,a="test"){await ce()&&await nt(e,t,n,a)},grab:I,grabBars:Hi,get padUndo(){const e=se?.before[0];return se&&e?{index:e.index,sample:e.pad.sample,pads:se.before.map(t=>t.index)}:null},undoPad:Oi,receiveAudio:El,padTargets:$l,take:S,pressTake:Wi,get notice(){return F},setPerform:ti,setFill:jn,actSlot:Sl,get edited(){return $t},library:{get panel(){return ue},open:e=>Mt(!0,e),close:()=>Mt(!1),catalog:hl,load:Ii,buildKit:()=>ue.buildKit(),alternatives:e=>ji(e).map(t=>t.id),preview:yl,get previewing(){return mt?.id??null}},toggleStep(e,t){Rn(e,t,n=>{n.on=!n.on})}};
