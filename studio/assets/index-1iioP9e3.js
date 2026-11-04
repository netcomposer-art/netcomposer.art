(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();const wt=1e-9;function Sd(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class Oi{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return Sd(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let i=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+wt&&(i=s.bpm);const o=[{beat:t.beat,time:t.time,bpm:this.clamp(i)}];for(const s of a){if(s.beat<=t.beat+wt)continue;const l=this.clamp(s.bpm);l!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+wt){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-wt;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,i=.25){const o=this.bpmAt(n);if(!(a>0)||!(i>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/i));this.setTempoAt(o,n);for(let l=1;l<=s;l++)this.setTempoAt(o+(t-o)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new Oi({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+wt)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+wt)return n[a];return n[0]}}const Ad=Object.freeze({beatsPerBar:4,beatUnit:4}),Tt=1e-9;function Md(e){return Math.floor(e+Tt)}function ws(e,t,n=!1){if(!(t>0))return e;const i=Math.ceil(e/t-Tt)*t;return n&&i<=e+Tt?i+t:i}class Td{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new Oi({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??Ad}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-Tt&&(this.stopTime===null||t<this.stopTime-Tt)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-Tt?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=Md(t/n),i=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:i,barPhase:i/n}}nextBar(t,n=!1){return ws(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const vs="nc-clock/snapshot",xs=1;function Ld(e,t="local"){return{format:vs,version:xs,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function Cd(e,t){const n=Nd(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const Pe=e=>typeof e=="number"&&Number.isFinite(e),Rr=e=>e===null||Pe(e);function Nd(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==vs&&n("format"),(!Pe(t.version)||Math.floor(t.version)!==xs)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!Pe(t.anchor.beat)||!Pe(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&Pe(a.beat)&&Pe(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!Pe(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!Pe(t.meter.beatUnit))&&n("meter"),(!Rr(t.startTime)||!Rr(t.stopTime)||!Pe(t.stoppedBeat))&&n("transport times"),t}class Fd{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new Td(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){Cd(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return Ld(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const zd="nc-sync/1",Pd=1,Dd="nc-sync",Rd="nc-sync-leader",Od=0,$s=.5,ks=.75;function Id(e){return typeof e=="number"&&Number.isFinite(e)&&e>=$s&&e<=ks?e:null}const Ta=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Yt=e=>typeof e=="number"&&Number.isFinite(e),Tn=e=>typeof e=="string"&&e.length>0;function qd(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==Pd||!Tn(t.type)||!Tn(t.from)||!Yt(t.term)||!Yt(t.seq)||!Yt(t.sentAt))return null;switch(t.type){case"hello":return Tn(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return Yt(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&Yt(t.slot)?t:null;case"ping":case"pong":return Tn(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function _d(e,t,n,a,i){return{proto:zd,from:t,term:n,seq:a,sentAt:i,...e}}function De(){return(performance.timeOrigin+performance.now())/1e3}const La=.003,Bd=3,Ca=.002+1e-6,jd=.01,Or=500;class Hd{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?jd:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=La&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const i=n-(this.timeOrigin+a)/1e3,o=this.median(),s=i-o,l=Math.abs(i-this.preStepBase),u=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!u&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&u===this.pendingBack&&(u||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(i,o,u))):(this.pendingStep=s,this.pendingBack=u,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const i=this.heldBase()!==null,o=this.ctx.currentTime,s=o<=this.revertUntil;let l;if(a&&s){const u=this.offsets,d=this.preStep;u.length=0;for(let c=0;c<d.length;c++)u.push(d[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:o,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!s){const c=this.offsets,p=this.preStep;p.length=0;for(let h=0;h<c.length;h++)p.push(c[h]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?o+this.stepRevert:-1/0}const u=this.offsets,d=t-n;for(let c=0;c<u.length;c++)u[c]+=d;this.stepCount++,l={stepSeconds:t-n,confirmedAt:o,reanchors:this.stepCount,revert:!1}}if(!i)for(const u of[...this.stepListeners])u(l);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let o=0;o<a;o++){const s=t[o];let l=o-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const i=a>>1;return a%2?n[i]:(n[i-1]+n[i])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const i=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=La&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Or)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),n=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3,a=!0;else if(!i||!(i.contextTime>=La)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const o=this.perfNow();if(this.waitSince===null&&(this.waitSince=o),o-this.waitSince<Or)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(Bd,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let i=-1,o=0;for(let l=0;l<n;l++){let u=0;for(let d=0;d<n;d++)Math.abs(t[d]-t[l])<=Ca&&u++;u>o&&(i=l,o=u)}if(o<a)return;const s=t[i];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>Ca&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-this.estimate())<=Ca}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const i=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(i,2)};setTimeout(i,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,i=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(i)&&i>0?i:null}}class Ud{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...Ta,...t.capabilities},this.channelOption=t.channel??Dd,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const i=this.o.now(),o=()=>{n===this.startWaits&&t(i)};return a.then(o,o),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const i=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(i),0)}else{const i=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?i:Math.max(t+this.o.gatedStartLeadSeconds,i),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[i,o]=this.tempoRange();t=Math.min(o,Math.max(i,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const u=s.beatAt(l+this.o.minLeadSeconds),d=Math.max(n??ws(u,1),u);a&&a>0?(s.tempo.rampTempo(t,d,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,d),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(ks,Math.max($s,t)):Od;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=Id(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=qd(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const i=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...Ta,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),i||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const i=this.peers.get(n.from);i?i.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...Ta},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(i=>{this.leader&&this.decideStart(i)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const i of[...this.snapshotListeners])i(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const i of[...this.messageListeners])i(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(Rd,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,l)=>[o?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),i=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(i===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,i=o.id)}this.setLeader(i===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],i=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==i[0]?a[0]<i[0]:a[1]!==i[1]?a[1]<i[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const i=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>i&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(_d(t,this.id,this.term,++this.seq,this.o.now()))}}const Vd="modulepreload",Gd=function(e){return"/studio/"+e},Ir={},Wd=function(t,n,a){let i=Promise.resolve();if(n&&n.length>0){let s=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=l?.nonce||l?.getAttribute("nonce");i=s(n.map(d=>{if(d=Gd(d),d in Ir)return;Ir[d]=!0;const c=d.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const h=document.createElement("link");if(h.rel=c?"stylesheet":Vd,c||(h.as="script"),h.crossOrigin="",h.href=d,u&&h.setAttribute("nonce",u),document.head.appendChild(h),c)return new Promise((g,b)=>{h.addEventListener("load",g),h.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return i.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return t().catch(o)})};var Yd=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],ai=[.25,.5,.75,1,1.5,2],Kd=4.9,ie={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},lt={fmt:"wet"},Ae={fmt:"pct"},vt={fmt:"db"},Ln={fmt:"signedPct"},Na={fmt:"num",suffix:" ms"},ee={div:100};function R(e,t,n,a,i,o,s,l){var u={key:e,label:t,min:n,max:a,default:i,step:1,k:o,unit:null,format:s};if(l)for(var d in l)u[d]=l[d];return u}function Cn(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var rn=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[R("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:ie.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[R("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:ie.hpHz,astrid:!0,zero:"off"}),R("q","Resonance",0,100,0,2,{fmt:"q",law:ie.hpQ},{dsp:{law:ie.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[R("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:ie.bpHz,astrid:!0},{dsp:{law:ie.bpHz}}),R("q","Q",0,100,0,2,{fmt:"q",law:ie.bpQ},{dsp:{law:ie.bpQ}}),R("mix","Mix",0,100,100,3,lt,{dsp:ee,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[R("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Cn(Yd),overriddenBy:"beats_free",tempoSynced:!0}),R("feedback","Feedback",0,90,35,2,Ae,{dsp:ee,unit:"%"}),R("mix","Wet/dry",0,100,0,3,lt,{dsp:ee,unit:"%",astridKey:"wet"}),R("tone","Tone",0,100,100,4,{fmt:"hz",law:ie.delayTone,offAt:100},{dsp:{div:99},more:!0}),R("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),R("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Cn([[0,"Insert"],[1,"Send"]]),more:!0}),R("send","Send",0,100,100,7,Ae,{dsp:ee,unit:"%",more:!0}),R("mod_send","Accent → send",-100,100,0,8,Ln,{dsp:ee,unit:"%",more:!0}),R("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[R("predelay","Pre-delay",0,200,0,1,Na,{dsp:{div:1e3},unit:"ms"}),R("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:ee,unit:"%"}),R("decay","Decay",0,100,50,3,Ae,{dsp:ee,unit:"%"}),R("damping","Damping",0,100,0,4,Ae,{dsp:ee,unit:"%"}),R("mix","Mix",0,100,0,5,lt,{dsp:ee,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[R("rate","Rate",0,100,26,1,{fmt:"rate",law:ie.rate},{dsp:{law:ie.rate}}),R("depth","Depth",0,100,70,2,Ae,{dsp:ee,unit:"%"}),R("feedback","Feedback",-90,90,50,3,Ln,{dsp:ee,unit:"%"}),R("mix","Mix",0,100,50,4,lt,{dsp:ee,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[R("rate","Rate",0,100,52,1,{fmt:"rate",law:ie.rate},{dsp:{law:ie.rate}}),R("depth","Depth",0,100,50,2,Ae,{dsp:ee,unit:"%"}),R("spread","Spread",0,100,70,3,Ae,{dsp:ee,unit:"%"}),R("mix","Mix",0,100,40,4,lt,{dsp:ee,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[R("rate","Rate",0,100,39,1,{fmt:"rate",law:ie.rate},{dsp:{law:ie.rate}}),R("depth","Depth",0,100,70,2,Ae,{dsp:ee,unit:"%"}),R("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Cn([[4,"4"],[6,"6"],[8,"8"]])}),R("feedback","Feedback",0,90,30,4,Ae,{dsp:ee,unit:"%"}),R("mix","Mix",0,100,50,5,lt,{dsp:ee,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[R("low_db","Low",-18,18,0,1,vt,{unit:"dB"}),R("mid_db","Mid",-18,18,0,2,vt,{unit:"dB"}),R("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:ie.midHz,astrid:!0},{dsp:{law:ie.midHz}}),R("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:ie.eqQ},{dsp:{law:ie.eqQ}}),R("high_db","High",-18,18,0,4,vt,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[R("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),R("output_db","Output",-12,12,0,2,vt,{unit:"dB"}),R("mix","Mix",0,100,100,3,lt,{dsp:ee,unit:"%"}),R("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Cn([[0,"Smooth"],[1,"Acid"]]),more:!0}),R("tone","Tone",0,100,100,5,{fmt:"hz",law:ie.driveTone,offAt:100},{dsp:{div:99},more:!0}),R("mod_drive","Accent → drive",-100,100,0,6,Ln,{dsp:ee,unit:"%",more:!0}),R("mod_tone","Accent → tone",-100,100,0,7,Ln,{dsp:ee,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[R("threshold_db","Threshold",-60,0,0,1,vt,{unit:"dB"}),R("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:ie.ratio},{dsp:{law:ie.ratio}}),R("attack_ms","Attack",1,100,10,3,Na,{unit:"ms"}),R("release_ms","Release",10,1e3,150,4,Na,{unit:"ms"}),R("makeup_db","Makeup",0,24,0,5,vt,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[R("width","Width",0,200,100,1,Ae,{dsp:ee,unit:"%"}),R("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:ee})]}],Xd=rn.map(function(e){return e.type}),Jd=rn.filter(function(e){return!e.hidden}).map(function(e){return e.type}),Qd={reverb:"plate"},Dt={},Es=[],on=[];function Zd(e){Dt[e.type]||Es.push(e.type),Dt[e.type]=e;for(var t=0;t<on.length;t++)try{on[t](e.type)}catch(n){typeof console<"u"&&console.error(n)}}function eu(){return Es.map(function(e){return Dt[e]})}function tu(e){return on.push(e),function(){var t=on.indexOf(e);t>=0&&on.splice(t,1)}}function Ss(e){return typeof e=="string"&&/^plugin:[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(e)&&e.length<=71}function Ii(e){var t=Qd[e]||e;return Xd.indexOf(t)>=0||typeof t=="string"&&Dt[t]?t:null}function re(e){for(var t=Ii(e),n=0;n<rn.length;n++)if(rn[n].type===t)return rn[n];return t&&Dt[t]?Dt[t]:null}function nu(e,t){var n=re(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function St(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function Yn(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=St(n.law,t);return a===null?0:a}function qr(e,t){return Math.min(Kd,e*60/(t>0?t:120))}var _r=function(e){return e>0?"+":e<0?"−":""};function au(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function As(e,t,n){var a=e.format,i;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:_r(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return _r(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(i=St(a.law,t),i===null?a.zero||"open":a.astrid?au(i):i+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+St(a.law,t).toFixed(1);case"ratio":return St(a.law,t).toFixed(1)+":1";case"rate":return i=St(a.law,t),(i<1?i.toFixed(2):i<10?i.toFixed(1):i.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var o=0;o<e.options.length;o++)if(e.options[o].value===t)return e.options[o].label;return String(t);case"tempoMs":return Math.round(qr(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(qr(t,n)*1e3)+" ms"}return String(t)}var iu=1,ga=["drive","delay","plate"];function ru(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,i){return As(e,a,i)},t}var Lt=ga.map(function(e){var t=re(e),n={type:e,label:t.label,dials:t.dials.map(ru)};return t.tempoSynced&&(n.tempoSynced=!0),n}),ou={reverb:"plate"};function Kn(e){var t=ou[e]||e;return ga.indexOf(t)>=0?t:null}function ba(e){for(var t=Kn(e),n=0;n<Lt.length;n++)if(Lt[n].type===t)return Lt[n];return null}function Ms(e,t){var n=ba(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function Rt(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function Ie(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,i=1;i<e.options.length;i++)Math.abs(e.options[i].value-t)<Math.abs(a-t)&&(a=e.options[i].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*o)/o))+0}function su(){return{v:iu,chain:Lt.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function lu(e){return ai.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},ai[0])}function Fa(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function cu(e){for(var t=Array.isArray(e)?e:Fa(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=su(),i={},o=[],s=0;s<t.length;s++){var l=t[s];if(Fa(l)){var u=Kn(l.type);if(!u){typeof l.type=="string"&&o.push(l.type);continue}if(i[u]){o.push(u);continue}i[u]=!0;var d=a.chain[ga.indexOf(u)],c=Fa(l.dials)?l.dials:{};u==="delay"&&c.mix===void 0&&c.wet!==void 0&&(c=Object.assign({},c,{mix:c.wet})),d.bypass=n?l.bypass===!0:l.bypass!==!1,ba(u).dials.forEach(function(p){d.dials[p.key]=Ie(p,c[p.key])}),du(u,d.dials,c)}}return{state:a,dropped:o}}function du(e,t,n){for(var a=ba(e),i=0;i<a.dials.length;i++){var o=a.dials[i];o.stepWhen&&(t[o.key]=Ie(o,n&&typeof n[o.key]=="number"?n[o.key]:t[o.key],Rt(o,t)))}}function Xn(e){return cu(e).state}function uu(e){return JSON.parse(JSON.stringify(e))}var pu=24,ii={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function ri(e,t,n){if(t==="bypass")return n?0:1;var a=Ms(e,t)||hu(e,t);return a?Yn(a,n):0}function hu(e,t){var n=re(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var fu={};Lt.forEach(function(e){e.dials.forEach(function(t){fu[e.type+"."+t.key]=t.format})});function za(e,t){var n=new Float64Array(pu),a=Xn(e);return a.chain.forEach(function(i){var o=ii[i.type];n[o.bypass]=i.bypass?0:1,Object.keys(i.dials).forEach(function(s){n[o[s]]=ri(i.type,s,i.dials[s])})}),n}var mu="__ncFxLoop",gu=/^(?:return|typeof|instanceof|in|of|new|delete|void|throw|case|do|else|yield|await)$/,Br=/[A-Za-z_$\u0080-\uffff]/,Pa=/[A-Za-z0-9_$\u0080-\uffff]/;function bu(e){var t=[],n=0,a=e.length,i=[],o,s;function l(){var h=t.length?t[t.length-1]:null;return h?h.t==="name"?gu.test(h.v):h.t==="num"||h.t==="str"||h.t==="tpl"||h.t==="re"?!1:h.v!==")"&&h.v!=="]":!0}function u(){for(var h=n-1;n<a;){if(o=e[n],o==="\\"){n+=2;continue}if(o==="`"){n++,t.push({t:"tpl",v:"",s:h,e:n});return}if(o==="$"&&e[n+1]==="{"){n+=2,i.push("tpl"),t.push({t:"tpl",v:"",s:h,e:n});return}n++}t.push({t:"tpl",v:"",s:h,e:a})}for(;n<a;){if(o=e[n],o===" "||o==="	"||o===`
`||o==="\r"||o==="\f"||o==="\v"||o===" "||o==="\uFEFF"||o==="\u2028"||o==="\u2029"){n++;continue}if(o==="/"&&e[n+1]==="/"){for(;n<a&&e[n]!==`
`&&e[n]!=="\r";)n++;continue}if(o==="/"&&e[n+1]==="*"){var d=e.indexOf("*/",n+2);n=d<0?a:d+2;continue}if(s=n,o==='"'||o==="'"){for(n++;n<a&&e[n]!==o&&e[n]!==`
`;)n+=e[n]==="\\"?2:1;n++,t.push({t:"str",v:"",s,e:n});continue}if(o==="`"){n++,u();continue}if(o==="/"&&l()){n++;for(var c=!1;n<a;){if(o=e[n],o==="\\"){n+=2;continue}if(o===`
`)break;if(c)o==="]"&&(c=!1);else if(o==="[")c=!0;else if(o==="/"){n++;break}n++}for(;n<a&&Pa.test(e[n]);)n++;t.push({t:"re",v:"",s,e:n});continue}if(Br.test(o)||o==="\\"){for(n++;n<a&&(Pa.test(e[n])||e[n]==="\\");)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(o==="#"&&n+1<a&&Br.test(e[n+1])){for(n+=2;n<a&&Pa.test(e[n]);)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(o>="0"&&o<="9"||o==="."&&e[n+1]>="0"&&e[n+1]<="9"){for(n++;n<a&&/[0-9A-Za-z_.]/.test(e[n]);)(e[n]==="e"||e[n]==="E")&&(e[n+1]==="+"||e[n+1]==="-")&&!/^0[xX]/.test(e.slice(s,n))&&n++,n++;t.push({t:"num",v:"",s,e:n});continue}if(o==="{")i.push("{");else if(o==="}"){var p=i.pop();if(p==="tpl"){n++,u();continue}}if(o==="?"&&e[n+1]==="."&&!(e[n+2]>="0"&&e[n+2]<="9")){n+=2,t.push({t:"p",v:"?.",s,e:n});continue}if(o==="."&&e[n+1]==="."&&e[n+2]==="."){n+=3,t.push({t:"p",v:"...",s,e:n});continue}n++,t.push({t:"p",v:o,s,e:n})}return t}function yu(e,t){for(var n=0,a=t;a<e.length;a++){var i=e[a].t==="p"?e[a].v:"";if(i==="("||i==="["||i==="{")n++;else if((i===")"||i==="]"||i==="}")&&(n--,n===0))return i===")"?a:-1}return-1}function wu(e){for(var t=String(e),n=bu(t),a=[],i=mu+"()",o=0;o<n.length;o++){var s=n[o];if(!(s.t!=="name"||s.v!=="while"&&s.v!=="for")){var l=o>0?n[o-1]:null;if(!(l&&l.t==="p"&&(l.v==="."||l.v==="?."))){var u=o+1;if(!(s.v==="for"&&n[u]&&n[u].t==="name"&&n[u].v==="await")&&!(!n[u]||n[u].t!=="p"||n[u].v!=="(")){var d=yu(n,u);if(!(d<0)){if(s.v==="while"){if(d===u+1)continue;a.push([n[u].e,i+" && ("],[n[d].s,")"]);continue}for(var c=[],p=0,h=u+1;h<d;h++){var g=n[h].t==="p"?n[h].v:"";g==="("||g==="["||g==="{"?p++:g===")"||g==="]"||g==="}"?p--:g===";"&&p===0&&c.push(h)}c.length===2&&(c[1]===c[0]+1?a.push([n[c[0]].e," "+i]):a.push([n[c[0]].e," "+i+" && ("],[n[c[1]].s,")"]))}}}}}if(!a.length)return t;a.sort(function(w,m){return w[0]-m[0]});for(var b="",y=0,f=0;f<a.length;f++)b+=t.slice(y,a[f][0])+a[f][1],y=a[f][0];return b+t.slice(y)}var Da=1,jr=15,Ts=/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/,vu=/^[a-z][a-z0-9_]{0,31}$/,Ls=/^\d+\.\d+\.\d+$/,Cs=/^[A-Za-z0-9.+-]+(?: (?:AND|OR|WITH) [A-Za-z0-9.+-]+)*$/,xu=/^[A-Za-z0-9_-][A-Za-z0-9._-]{0,63}\.js$/,Hr=["$schema","ncPlugin","id","name","version","author","licence","description","website","keywords","dsp","params"],Ur=["id","label","type","defaultValue","minValue","maxValue","discreteStep","exponent","choices","units","more"],Jn={1:"It failed to start.",2:"It crashed while playing.",3:"It made bad numbers (NaN, infinity or runaway level).",4:"It crashed when a dial moved.",5:"Its code is not loaded.",6:"It got stuck in a loop, so it was stopped."};function sn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function xt(e){return typeof e=="number"&&isFinite(e)}function ct(e,t){return typeof e=="string"&&e.trim().length>0&&e.length<=t}function ya(e){var t=[],n=e,a=function(l,u){t.push(l+": "+u)};if(!sn(n))return{ok:!1,errors:["manifest: must be a JSON object"],manifest:null};Object.keys(n).forEach(function(l){Hr.indexOf(l)<0&&a(l,"unknown field (allowed: "+Hr.slice(1).join(", ")+")")}),n.ncPlugin!==Da&&a("ncPlugin","must be "+Da),(typeof n.id!="string"||!Ts.test(n.id)||n.id.length>64)&&a("id",'lowercase letters and digits, with dots or dashes between, up to 64 (e.g. "yourname.tremolo")'),ct(n.name,40)||a("name","a name of 1 to 40 characters"),(typeof n.version!="string"||!Ls.test(n.version))&&a("version",'x.y.z, e.g. "1.0.0"'),ct(n.author,80)||a("author","who made it, 1 to 80 characters"),(typeof n.licence!="string"||!Cs.test(n.licence)||n.licence.length>64)&&a("licence",'an SPDX licence id, e.g. "MIT"'),n.description!==void 0&&!(typeof n.description=="string"&&n.description.length<=200)&&a("description","up to 200 characters"),n.website!==void 0&&!(typeof n.website=="string"&&/^https:\/\/\S+$/.test(n.website)&&n.website.length<=2048)&&a("website","an https:// address"),n.keywords!==void 0&&!(Array.isArray(n.keywords)&&n.keywords.length<=8&&n.keywords.every(function(l){return ct(l,24)}))&&a("keywords","up to 8 short strings"),(typeof n.dsp!="string"||!xu.test(n.dsp))&&a("dsp",`the DSP file's name, in the same folder as plugin.json, ending in .js (e.g. "tremolo.dsp.js")`);var i=[];if(!Array.isArray(n.params))a("params","a list of params (may be empty)");else if(n.params.length>jr)a("params","at most "+jr);else{var o={};n.params.forEach(function(l,u){var d="params["+u+"]";if(!sn(l)){a(d,"must be an object");return}Object.keys(l).forEach(function(h){Ur.indexOf(h)<0&&a(d+"."+h,"unknown field (allowed: "+Ur.join(", ")+")")}),typeof l.id!="string"||!vu.test(l.id)||l.id==="bypass"?a(d+".id",'lowercase, starting with a letter: letters, digits, _ (not "bypass")'):o[l.id]?a(d+".id",'"'+l.id+'" is used twice'):o[l.id]=!0,ct(l.label,24)||a(d+".label","the dial's name, 1 to 24 characters");var c=l.type===void 0?"float":l.type;if(["float","int","boolean","choice"].indexOf(c)<0){a(d+".type","float, int, boolean or choice");return}var p={id:l.id,label:l.label,type:c};if(c==="choice"){if(!Array.isArray(l.choices)||l.choices.length<2||l.choices.length>16||!l.choices.every(function(h){return ct(h,24)})){a(d+".choices","2 to 16 names");return}p.choices=l.choices.slice(),p.minValue=0,p.maxValue=l.choices.length-1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==p.maxValue)&&a(d,"a choice's values are 0 to choices.length - 1: leave out minValue and maxValue")}else if(c==="boolean")p.minValue=0,p.maxValue=1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==1)&&a(d,"a boolean is 0 or 1: leave out minValue and maxValue");else{if(!xt(l.minValue)||!xt(l.maxValue)||!(l.minValue<l.maxValue)){a(d,"minValue and maxValue: numbers, minValue < maxValue");return}p.minValue=l.minValue,p.maxValue=l.maxValue,l.discreteStep!==void 0&&!(xt(l.discreteStep)&&l.discreteStep>0&&l.discreteStep<=l.maxValue-l.minValue)&&a(d+".discreteStep","a number > 0, at most the range"),p.discreteStep=c==="int"?Math.max(1,Math.round(l.discreteStep||1)):xt(l.discreteStep)&&l.discreteStep>0?l.discreteStep:$u(l.maxValue-l.minValue),c==="int"&&(!Number.isInteger(l.minValue)||!Number.isInteger(l.maxValue))&&a(d,"an int has whole-number minValue and maxValue")}l.defaultValue===void 0?p.defaultValue=p.minValue:!xt(l.defaultValue)||l.defaultValue<p.minValue||l.defaultValue>p.maxValue?a(d+".defaultValue","a number from "+p.minValue+" to "+p.maxValue):p.defaultValue=l.defaultValue,l.units!==void 0&&(typeof l.units=="string"&&l.units.length<=8?p.units=l.units:a(d+".units",'up to 8 characters, e.g. "Hz", "ms", "%", "dB"')),l.exponent!==void 0&&(xt(l.exponent)&&l.exponent>0?p.exponent=l.exponent:a(d+".exponent","a number > 0")),l.more!==void 0&&(typeof l.more=="boolean"?l.more&&(p.more=!0):a(d+".more","true or false")),i.push(p)})}if(t.length)return{ok:!1,errors:t,manifest:null};var s={ncPlugin:Da,id:n.id,name:n.name.trim(),version:n.version,author:n.author.trim(),licence:n.licence,dsp:n.dsp,params:i};return n.description&&(s.description=n.description),n.website&&(s.website=n.website),n.keywords&&(s.keywords=n.keywords.slice()),{ok:!0,errors:[],manifest:s}}function $u(e){var t=Math.pow(10,Math.floor(Math.log10(e/100)));return t<.001?.001:t>1?1:+t.toFixed(3)}function ku(e){for(var t=0;t<3&&Math.abs(Math.round(e*Math.pow(10,t))-e*Math.pow(10,t))>1e-9;)t++;return t}function wa(e){return"plugin:"+e}function Eu(e,t){var n=e,a=t||{},i=n.params.map(function(s,l){var u={key:s.id,label:s.label,min:s.minValue,max:s.maxValue,default:s.defaultValue,step:s.discreteStep,k:l+1,unit:s.units||null,format:null};if(s.type==="choice"||s.type==="boolean"){var d=s.type==="choice"?s.choices:["Off","On"];u.step=null,u.options=d.map(function(p,h){return{value:h,label:p}}),u.format={fmt:"option"}}else{var c=s.units?/^[%°×]/.test(s.units)?s.units:" "+s.units:"";u.format={fmt:"fixed",div:1,add:0,digits:ku(s.discreteStep),suffix:c}}return s.more&&(u.more=!0),u}),o={type:wa(n.id),label:n.name,dials:i,plugin:{id:n.id,version:n.version,author:n.author,licence:n.licence,engine:"plugin:"+n.id+"@"+n.version,idBase:n.id.split(".").pop(),url:typeof a.url=="string"?a.url:"",listed:a.listed===!0}};return n.description&&(o.note=n.description),n.website&&(o.plugin.website=n.website),o}function Ns(e,t){var n=ya(e);if(!n.ok)throw new Error("nc-fx plugin: "+n.errors.join("; "));var a=re(wa(n.manifest.id));if(a&&a.plugin.version!==n.manifest.version)throw new Error("nc-fx plugin: "+n.manifest.id+" "+a.plugin.version+" is already loaded on this page; reload to use "+n.manifest.version);if(a)return a;var i=Eu(n.manifest,t);return Zd(i),i}async function Fs(e){var t=globalThis.crypto&&globalThis.crypto.subtle;if(!t)throw new Error("nc-fx plugin: no WebCrypto here (integrity needs a secure context: https or localhost)");for(var n=new Uint8Array(await t.digest("SHA-256",e)),a="",i=0;i<n.length;i++)a+=String.fromCharCode(n[i]);return"sha256-"+btoa(a)}function Su(e){if(e.protocol!=="https:"&&!(e.protocol==="http:"&&/^(localhost|127\.0\.0\.1|\[::1\])$/.test(e.hostname)))throw new Error("nc-fx plugin: load plugins over https (http only from localhost): "+e.href)}async function Vr(e,t,n,a){var i=await t(e,{credentials:"omit",cache:"no-cache"});if(!i.ok)throw new Error("nc-fx plugin: "+a+" "+e+" answered "+i.status);var o=new Uint8Array(await i.arrayBuffer());if(n){var s=await Fs(o);if(s!==n)throw new Error("nc-fx plugin: "+a+" "+e+" does not match the registry (expected "+n+", got "+s+")")}return new TextDecoder().decode(o)}var Nn=typeof WeakMap=="function"?new WeakMap:null;function zs(e,t){var n=new Error("nc-fx plugin: "+e.name+" "+t+" is already loaded on this page. Reload the page to use "+e.version+".");return n.reload=!0,n}async function Ps(e,t,n,a,i){var o=t.id+"@"+t.version,s=Nn&&Nn.get(e);!s&&Nn&&(s={},Nn.set(e,s));var l=s&&s[o];if(l){var u=await l,d=await n();return{stale:d!==u}}var c=(async function(){var p=await n();await _s(e,i);var h=URL.createObjectURL(new Blob([wu(p)+`
//# sourceURL=`+a+`
`],{type:"text/javascript"}));try{await e.audioWorklet.addModule(h)}finally{URL.revokeObjectURL(h)}return p})();return s&&(s[o]=c,c.catch(function(){delete s[o]})),await c,{stale:!1}}async function Ds(e,t,n){var a=n||{},i=new URL(String(t),a.base||(typeof location<"u"?location.href:void 0));Su(i);var o=a.fetch||globalThis.fetch.bind(globalThis),s=a.integrity||{},l=await Vr(i.href,o,s.manifest,"plugin.json"),u;try{u=JSON.parse(l)}catch{throw new Error("nc-fx plugin: "+i.href+" is not JSON")}var d=ya(u);if(!d.ok)throw new Error("nc-fx plugin: "+i.href+": "+d.errors.join("; "));var c=d.manifest;if(a.expect&&(a.expect.id&&a.expect.id!==c.id||a.expect.version&&a.expect.version!==c.version))throw new Error("nc-fx plugin: "+i.href+" is "+c.id+" "+c.version+", not what the registry lists");var p=re(wa(c.id));if(p&&p.plugin.version!==c.version)throw zs(c,p.plugin.version);var h=new URL(c.dsp,i),g=await Ps(e,c,function(){return Vr(h.href,o,s.dsp,"DSP file")},h.href,a.moduleUrl),b=Ns(c,{url:i.href,listed:a.listed===!0});return{entry:b,manifest:c,url:i.href,stale:g.stale}}var Au=256*1024;async function Gr(e,t,n){var a=n||{},i=t||{},o=i.manifest;if(typeof o=="string")try{o=JSON.parse(o)}catch{throw new Error("nc-fx plugin: plugin.json is not JSON")}var s=ya(o);if(!s.ok)throw new Error("nc-fx plugin: plugin.json: "+s.errors.join("; "));var l=s.manifest;if(typeof i.dsp!="string"||!i.dsp.trim())throw new Error("nc-fx plugin: "+l.name+" needs its DSP file, "+l.dsp);if(typeof i.dspName=="string"&&i.dspName!==l.dsp)throw new Error("nc-fx plugin: plugin.json names its DSP file "+l.dsp+", not "+i.dspName);if(new TextEncoder().encode(i.dsp).length>Au)throw new Error("nc-fx plugin: "+l.dsp+" is over 256 KB");var u=typeof a.url=="string"&&a.url?a.url:"local:"+l.id,d=re(wa(l.id));if(d&&d.plugin.version!==l.version)throw zs(l,d.plugin.version);var c=i.dsp,p=await Ps(e,l,async function(){return c},u.replace(/[^A-Za-z0-9:._@\/-]/g,"_")+"/"+l.dsp,a.moduleUrl),h=Ns(l,{url:u,listed:!1});return{entry:h,manifest:l,url:u,stale:p.stale}}function Mu(e){var t=[];if(!sn(e)||e.v!==1||!Array.isArray(e.plugins))return{ok:!1,errors:['registry: { "v": 1, "plugins": [...] }'],registry:{v:1,plugins:[]}};var n=[],a={};return e.plugins.forEach(function(i,o){var s="plugins["+o+"]",l=[];if(!sn(i)){t.push(s+": must be an object");return}if((typeof i.id!="string"||!Ts.test(i.id))&&l.push("id"),ct(i.name,40)||l.push("name"),(typeof i.version!="string"||!Ls.test(i.version))&&l.push("version"),ct(i.author,80)||l.push("author"),(typeof i.licence!="string"||!Cs.test(i.licence))&&l.push("licence"),(typeof i.manifest!="string"||!i.manifest)&&l.push("manifest"),(!sn(i.integrity)||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(i.integrity.manifest||"")||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(i.integrity.dsp||""))&&l.push("integrity"),(typeof i.checked!="string"||!/^\d{4}-\d{2}-\d{2}/.test(i.checked))&&l.push("checked"),a[i.id]&&l.push("id (listed twice)"),l.length){t.push(s+": bad "+l.join(", "));return}a[i.id]=!0;var u={id:i.id,name:i.name,version:i.version,author:i.author,licence:i.licence,manifest:i.manifest,integrity:{manifest:i.integrity.manifest,dsp:i.integrity.dsp},checked:i.checked};typeof i.description=="string"&&(u.description=i.description.slice(0,200)),n.push(u)}),{ok:t.length===0,errors:t,registry:{v:1,plugins:n}}}async function Tu(e,t){var n=t||{},a=new URL(String(e),n.base||(typeof location<"u"?location.href:void 0)),i=await(n.fetch||globalThis.fetch.bind(globalThis))(a.href,{credentials:"omit",cache:"no-cache"});if(!i.ok)throw new Error("nc-fx plugins: the registry "+a.href+" answered "+i.status);var o=Mu(await i.json());return{registry:o.registry,url:a.href,errors:o.errors}}function Lu(e,t,n,a){return Ds(e,new URL(t.manifest,n).href,Object.assign({},a,{integrity:t.integrity,listed:!0,expect:{id:t.id,version:t.version}}))}function Cu(e,t){var n=t||{},a=n.stallMs>0?n.stallMs:1500,i=n.everyMs>0?n.everyMs:250,o=n.now||function(){return typeof performance<"u"?performance.now():Date.now()},s=n.setInterval||setInterval,l=n.clearInterval||clearInterval,u=e.currentTime,d=o(),c=0,p=!1,h=s(function(){var g=o(),b=g-d,y=e.currentTime;if(d=g,e.state!=="running"||y!==u){u=y,c=0,p&&e.state==="running"&&(p=!1,n.onResume&&n.onResume());return}if(b>4*i){c=0;return}c+=b,!p&&c>=a&&(p=!0,n.onStall&&n.onStall({frozenMs:c,at:y}))},i);return{stop:function(){l(h)},stalled:function(){return p}}}var Nu=2,Qn=3,Wr=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function dt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var Fu=/^local:[A-Za-z0-9._@-]{1,200}$/,zu=/^\d+\.\d+\.\d+$/;function Pu(e,t){var n=dt(e)?e:{},a=t.slice(7),i={id:a,version:typeof n.version=="string"&&zu.test(n.version)?n.version:"0.0.0",url:"",name:a};return typeof n.url=="string"&&n.url.length<=2048&&(/^https?:\/\//.test(n.url)||Fu.test(n.url))&&(i.url=n.url),typeof n.name=="string"&&n.name.trim()&&(i.name=n.name.trim().slice(0,40)),i}function Rs(e){var t=e.plugin;return{id:t.id,version:t.version,url:t.url,name:e.label}}function Du(e){var t={},n=0;if(dt(e))for(var a in e)n<16&&/^[a-z][a-z0-9_]{0,31}$/.test(a)&&typeof e[a]=="number"&&isFinite(e[a])&&(t[a]=e[a],n++);return t}function Ru(e){return e.plugin?e.plugin.idBase:e.type}function Os(e,t){var n=re(e);if(!n)return null;var a={};(t||[]).forEach(function(u){u&&u.id&&(a[u.id]=!0)});for(var i=1,o=Ru(n);a[o+"-"+i];)i++;var s={};n.dials.forEach(function(u){s[u.key]=u.default});var l={id:o+"-"+i,type:n.type,bypass:!1,dials:s};return n.plugin&&(l.plugin=Rs(n)),l}function Ou(e){var t=re(e.type),n=/-(\d+)$/.exec(e.id||""),a=t?t.label:e.plugin&&e.plugin.name?e.plugin.name:e.type;return a+(n&&+n[1]>1?" "+n[1]:"")}function Iu(e,t,n){var a=e.length-1,i=Math.max(0,Math.min(a,n));if(t<0||t>a||t===i)return e;var o=e.slice(),s=o.splice(t,1)[0];return o.splice(i,0,s),o}function qu(e){return typeof e=="number"&&isFinite(e)?lu(e):e}function Yr(e,t,n){var a={};return e.dials.forEach(function(i){var o=t[i.key];o===void 0&&i.astridKey&&(o=t[i.astridKey]),n&&e.type==="delay"&&i.key==="delay_beats"&&(o=qu(o)),a[i.key]=e.plugin?Ie(i,o,i.step):Ie(i,o)}),e.dials.forEach(function(i){i.stepWhen&&(a[i.key]=Ie(i,typeof t[i.key]=="number"?t[i.key]:a[i.key],Rt(i,a)))}),a}function _u(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,i=1/0,o=e.min;o<=e.max;o++){var s=St(n.law,o),l=s===null?1/0:Math.abs(s-t);l<i&&(i=l,a=o)}return a}}var Bu={rate:"rate_hz"};function ju(e,t,n,a){var i={};return e.dials.forEach(function(o){if(!o.more){var s=o.astridKey||Bu[o.key]||o.key;i[o.key]=_u(o,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),i}function Hu(e,t){var n=t>0?Math.floor(t):Qn,a=[],i=[],o=[],s=!1,l=!1;Array.isArray(e)?(o=e,l=!0):dt(e)&&Array.isArray(e.chain)&&(o=e.chain,s=e.v===1,l=e.schema===2);for(var u=[],d=0;d<o.length;d++){var c=o[d];if(dt(c)&&!(c.type==="limiter"||c.fixed===!0)){var p=Ii(c.type),h=p&&re(p);if(!h&&!s&&Ss(c.type)){if(u.length>=n){a.push(c.id||c.type);continue}for(var g=Pu(c.plugin,c.type),b=g.id.split(".").pop(),y=1;u.some(function(v){return v.id===b+"-"+y});)y++;var f=typeof c.id=="string"&&Wr.test(c.id)&&!u.some(function(v){return v.id===c.id})?c.id:b+"-"+y;u.push({id:f,type:c.type,bypass:c.bypass===!0,dials:Du(c.dials),plugin:g});continue}if(!h||s&&["drive","delay","plate"].indexOf(p)<0){typeof c.type=="string"&&a.push(c.type);continue}if(u.length>=n){a.push(c.id||p);continue}var w;dt(c.params)&&!dt(c.dials)?w=Yr(h,ju(h,c.params,i,c.id||p),l):w=Yr(h,dt(c.dials)?c.dials:{},l);var m=Os(p,u),$=typeof c.id=="string"&&Wr.test(c.id)&&!u.some(function(v){return v.id===c.id})?c.id:m.id,T=s?c.bypass!==!1:c.bypass===!0,S={id:s?m.id:$,type:p,bypass:T,dials:w};h.plugin&&(S.plugin=Rs(h)),u.push(S)}}return{state:{v:Nu,chain:u},dropped:a,notes:i}}function pt(e,t){return Hu(e,t).state}function $t(e){var t=re(e.type),n=[[0,e.bypass?0:1]];return t&&t.dials.forEach(function(a){n.push([a.k,Yn(a,e.dials[a.key])])}),n}function Uu(e){var t=pt(e,8),n=[],a=t.chain.filter(function(i){return i.plugin?(n.push(i.id+": ASTRID has no plugins"),!1):!0}).map(function(i,o){var s=re(i.type),l={};return o>=Qn&&n.push(i.id+": ASTRID keeps three hacks"),s.dials.forEach(function(u){var d=i.dials[u.key];if(u.more){d!==u.default&&n.push(i.id+"."+u.key);return}u.key==="delay_beats"&&ai.indexOf(d)<0&&n.push(i.id+".delay_beats"),l[u.astridKey||u.key]=d}),{id:i.id,type:i.type,bypass:i.bypass,dials:l}});return{hacks:a,lossy:n}}var Vu=150,Gu=6e3,Wu=18,Is=6.283185307179586;function va(e,t,n){return e<t?t:e>n?n:e}function Yu(e,t,n,a,i){var o=Math.pow(10,n/40),s=Is*t/i,l=Math.cos(s),u=Math.sin(s),d,c,p,h,g,b,y,f;if(e===0||e===2){y=u/2*Math.SQRT2,f=2*Math.sqrt(o)*y;var w=e===0?1:-1;d=o*(o+1-w*(o-1)*l+f),c=w*2*o*(o-1-w*(o+1)*l),p=o*(o+1-w*(o-1)*l-f),h=o+1+w*(o-1)*l+f,g=-w*2*(o-1+w*(o+1)*l),b=o+1+w*(o-1)*l-f}else y=u/(2*a),d=1+y*o,c=-2*l,p=1-y*o,h=1+y/o,g=-2*l,b=1-y/o;return[d/h,c/h,p/h,g/h,b/h]}function Ku(e,t,n){var a=Is*t/n,i=Math.cos(a),o=Math.sin(a),s=Math.cos(2*a),l=Math.sin(2*a),u=e[0]+e[1]*i+e[2]*s,d=-(e[1]*o+e[2]*l),c=1+e[3]*i+e[4]*s,p=-(e[3]*o+e[4]*l);return 10*Math.log10((u*u+d*d)/(c*c+p*p))}var Kr={};function it(e){return Kr[e]||(Kr[e]=nu("eq",e))}function Et(e,t){var n=it(t),a=e&&typeof e[t]=="number"&&isFinite(e[t])?e[t]:n.default;return va(a,n.min,n.max)}function qs(e){return[{id:"low",kind:0,hz:Vu,db:Et(e,"low_db"),q:Math.SQRT1_2},{id:"mid",kind:1,hz:Yn(it("mid_hz"),Et(e,"mid_hz")),db:Et(e,"mid_db"),q:Yn(it("mid_q"),Et(e,"mid_q"))},{id:"high",kind:2,hz:Gu,db:Et(e,"high_db"),q:Math.SQRT1_2}]}function Xu(e,t,n){for(var a=qs(e),i=n.length,o=new Float64Array(i),s=[],l=t/2,u=0;u<a.length;u++){var d=a[u],c=new Float64Array(i);if(d.db!==0)for(var p=Yu(d.kind,d.hz,d.db,d.q,t),h=0;h<i;h++){var g=n[h]<l?n[h]:l*.9999;c[h]=Ku(p,g,t),o[h]+=c[h]}s.push(c)}return{total:o,bands:s}}function Ju(e){var t=it("mid_hz").dsp.law;return va(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}function Qu(e){var t=it("mid_q").dsp.law;return va(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}var Zn={low:"low_db",mid:"mid_db",high:"high_db"},Zu={low:"Low",mid:"Mid",high:"High"};function ep(e,t,n){var a=[];function i(o,s){var l=it(o),u=l.step||1;s=va(Math.round(s/u)*u,l.min,l.max),s===0&&(s=0),s!==Et(e,o)&&a.push([o,s])}return typeof n.db=="number"&&Zn[t]&&i(Zn[t],n.db),t==="mid"&&typeof n.hz=="number"&&n.hz>0&&i("mid_hz",Ju(n.hz)),t==="mid"&&typeof n.q=="number"&&n.q>0&&i("mid_q",Qu(n.q)),a}function tp(e){var t=e==="mid"?["mid_db","mid_hz","mid_q"]:Zn[e]?[Zn[e]]:[];return t.map(function(n){return[n,it(n).default]})}var Fn=typeof WeakMap=="function"?new WeakMap:null;function np(e){var t=e&&e.output;if(!t||!t.context||typeof t.context.createAnalyser!="function")return null;var n=Fn&&Fn.get(e);return n||(n={node:null,users:0,handle:null},n.handle={open:function(){return e.status==="disposed"?null:(n.node||(n.node=t.context.createAnalyser(),n.node.fftSize=4096,n.node.smoothingTimeConstant=.8,n.node.minDecibels=-110,n.node.maxDecibels=0),n.users++===0&&t.connect(n.node),n.node)},close:function(){if(n.users!==0&&--n.users===0&&n.node)try{t.disconnect(n.node)}catch{}}},Fn&&Fn.set(e,n)),n.handle}function ap(e,t,n){var a=n||{},i={};["low_db","mid_db","mid_hz","mid_q","high_db"].forEach(function(c){var p=e&&typeof e.getParam=="function"?e.getParam(t,c):void 0;i[c]=typeof p=="number"?p:it(c).default});var o=e&&e.output&&e.output.context,s=a.sampleRate||o&&o.sampleRate||48e3,l=a.help||{},u=qs(i).map(function(c){var p=(c.db>0?"+":c.db<0?"−":"")+Math.abs(c.db)+" dB",h=c.hz>=1e3?(c.hz/1e3).toFixed(c.hz>=1e4?0:1)+" kHz":Math.round(c.hz)+" Hz";return{id:c.id,label:Zu[c.id],kind:c.kind===0?"lowshelf":c.kind===1?"peak":"highshelf",hz:c.hz,db:c.db,q:c.q,moveHz:c.id==="mid",moveQ:c.id==="mid",minHz:c.id==="mid"?200:c.hz,maxHz:c.id==="mid"?5e3:c.hz,minQ:.3,maxQ:6,valueText:c.id==="mid"?p+" at "+h+", Q "+c.q.toFixed(1):p+(c.id==="low"?", shelf below ":", shelf above ")+h,help:l[c.id]}}),d=function(c){for(var p=0;p<c.length;p++)a.set(c[p][0],c[p][1])};return{type:"eqGraph",id:a.id,label:a.label||"EQ curve",range:Wu,sampleRate:s,on:a.on!==!1,bands:u,help:l.graph,response:function(c){return Xu(i,s,c)},spectrum:a.spectrum===!1?void 0:np(e)||void 0,onBand:function(c,p){d(ep(i,c,p))},onReset:function(c){d(tp(c).filter(function(p){return p[1]!==i[p[0]]}))}}}var ip="nc-fx@1",rp=600,op=256,sp=8,Kt=typeof WeakMap=="function"?new WeakMap:null;function _s(e,t){var n=Kt&&Kt.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await Wd(async()=>{const{default:o}=await import("./worklet-source-Dvdj1jcP.js");return{default:o}},[])).default,i=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(i)}finally{URL.revokeObjectURL(i)}})(),Kt&&(Kt.set(e,n),n.catch(function(){Kt.delete(e)})),n)}function kt(e,t){return typeof e=="number"&&isFinite(e)?e:t}function Bs(e,t,n,a){var i=Math.min(400,Math.max(20,kt(t.bpm,120))),o=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",u=kt(t.preGain,1),d=Math.max(0,kt(t.crossfade,.012)),c=kt(t.maxDelaySeconds,void 0),p=e.createGain(),h=e.createGain(),g=e.createGain(),b=e.createGain(),y=null;t.modInput===!0&&(y=e.createGain(),y.channelCount=1,y.channelCountMode="explicit",y.channelInterpretation="discrete"),b.gain.value=0,p.connect(g),g.connect(h),b.connect(h);var f={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:i,mUsers:0,lv:null,lvAt:0},w=n(i);f.post=function(v){f.node?f.node.port.postMessage(v):f.disposed||(o.length>=op&&(o=a().concat([{t:"tempo",bpm:f.bpm,when:0}]),f.mUsers>0&&o.push({t:"meter",on:!0})),o.push(v))};function m(v){var x=o.map(function(A){var E=Object.assign({},A);return E.when>v||(E.when=0,E.t!=="clear"&&(E.snap=!0)),E});return o=[],x}f.emit=function(v){for(var x=0;x<f.listeners.length;x++)try{f.listeners[x](v)}catch(A){typeof console<"u"&&console.error(A)}},f.whenOf=function(v){return typeof v=="number"&&isFinite(v)&&v>0?v:0};var $=!1;f.tooFar=function(v){return typeof v=="number"&&v>e.currentTime+rp?(!$&&typeof console<"u"&&($=!0,console.warn("nc-fx: ignoring a time "+Math.round(v-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var T=_s(e,t.moduleUrl).then(function(){if(!f.disposed){var v=Object.assign({bpm:i,bypassMode:l,limiter:s,preGain:u,maxDelaySeconds:c},w);v.pending=m(e.currentTime),f.node=new AudioWorkletNode(e,ip,{numberOfInputs:y?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:v}),f.node.port.onmessage=function(A){var E=A.data;if(E&&E.t==="lv"&&f.mUsers>0)f.lv=E.d,f.lvAt=Xr();else if(E&&E.t==="perr"&&f.onPluginError&&E.d)for(var L=0;L<(E.n|0);L++)f.onPluginError(E.d[2*L],E.d[2*L+1])},p.connect(f.node),y&&y.connect(f.node,0,1),f.node.connect(b);var x=e.currentTime;x<=0||d===0?(g.gain.value=0,b.gain.value=1):(g.gain.setValueAtTime(1,x),g.gain.linearRampToValueAtTime(0,x+d),b.gain.setValueAtTime(0,x),b.gain.linearRampToValueAtTime(1,x+d)),f.status="ready"}},function(v){f.status="unavailable",o=[],f.error=v});f.meterOpen=function(){return f.disposed||f.status==="unavailable"?!1:(f.mUsers++===0&&f.post({t:"meter",on:!0}),!0)},f.meterClose=function(){f.mUsers!==0&&--f.mUsers===0&&(f.lv=null,f.disposed||f.post({t:"meter",on:!1}))},f.levels=function(){return f.lv&&Xr()-f.lvAt<lp?f.lv:null};var S={};return f.meter=function(v,x){if(S[v])return S[v];var A=0,E={in:0,out:0},L={open:function(){return f.meterOpen()?(A++,!0):!1},close:function(){A!==0&&(A--,f.meterClose())},read:function(){var N=A>0?f.levels():null;return E.in=0,E.out=0,N&&x(N,E),E}};return S[v]=L,L},f.core={input:p,output:h,modInput:y,ready:T,get status(){return f.status},get error(){return f.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function(v,x){var A=kt(v,NaN);!(A>0)||f.disposed||f.tooFar(x)||(f.bpm=Math.min(400,Math.max(20,A)),f.post({t:"tempo",bpm:f.bpm,when:f.whenOf(x)}),f.emit({effect:null,key:"tempo",value:f.bpm}))},getTempo:function(){return f.bpm},clear:function(v){var x=v&&typeof v=="object"?v:{at:v};if(!(f.disposed||f.tooFar(x.at))){var A=kt(x.fadeMs,0);f.post({t:"clear",when:f.whenOf(x.at),fadeMs:A>0?Math.min(1e3,A):0})}},onChange:function(v){return f.listeners.push(v),function(){var x=f.listeners.indexOf(v);x>=0&&f.listeners.splice(x,1)}},dispose:function(){if(!f.disposed){if(f.disposed=!0,f.status="disposed",o=[],f.listeners.length=0,f.node){f.node.port.postMessage({t:"dispose"}),f.node.port.close();try{f.node.disconnect()}catch{}}[p,g,b,h,y].forEach(function(v){try{v&&v.disconnect()}catch{}})}}},f}var lp=250;function Xr(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function js(e,t){t.in=e[0],t.out=e[1]}function Ra(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function Oa(e,t){var n=t||{};if(n.slots)return cp(e,n);var a=Xn(n.state),i=Array.from(za(a)),o=Bs(e,n,function(){return{program:i}},function(){return[{t:"load",program:Array.from(za(a)),when:0}]}),s=o.core;function l(u){return a.chain[ga.indexOf(u)]}return s.setParam=function(u,d,c,p){var h=Kn(u);if(!(!h||o.disposed||o.tooFar(p))){var g=l(h),b;if(d==="bypass")b=!!c;else{var y=Ms(h,d);if(!y)return;b=Ie(y,c,Rt(y,g.dials))}return d==="bypass"?g.bypass=b:g.dials[d]=b,o.post({t:"p",i:ii[h][d],v:ri(h,d,b),when:o.whenOf(p)}),o.emit({effect:h,key:d,value:b}),ba(h).dials.forEach(function(f){if(!(!f.stepWhen||!f.stepWhen.some(function($){return $.key===d}))){var w=g.dials[f.key],m=Ie(f,w,Rt(f,g.dials));m!==w&&(g.dials[f.key]=m,o.post({t:"p",i:ii[h][f.key],v:ri(h,f.key,m),when:o.whenOf(p)}),o.emit({effect:h,key:f.key,value:m}))}}),b}},s.meter=function(){return o.meter("",js)},s.getParam=function(u,d){var c=Kn(u);if(c){var p=l(c);return d==="bypass"?p.bypass:p.dials[d]}},s.getState=function(){return uu(a)},s.setState=function(u,d){o.disposed||o.tooFar(d&&d.at)||(a=Xn(u),o.post({t:"load",program:Array.from(za(a)),when:o.whenOf(d&&d.at)}),o.emit({effect:null,key:null,value:null}))},s}function cp(e,t){var n=t.slots===!0?Qn:Math.max(1,Math.min(sp,Math.floor(+t.slots)||Qn)),a=pt(t.state,n),i=1,o={},s={};function l(v){return!Ss(v.type)||re(v.type)!==null}function u(v){var x=re(v.type);return x&&x.plugin?x.plugin.engine:v.type}function d(v){return o[v.id]||(o[v.id]=i++),o[v.id]}function c(v){return v.filter(l).map(function(x){return{uid:d(x),type:u(x),program:$t(x)}})}function p(){return a.chain.filter(l).map(function(v){return o[v.id]})}var h=c(a.chain),g=p(),b=Bs(e,t,function(){return{slots:n,chain:h,order:g}},function(){return[{t:"sync",chain:c(a.chain),order:p(),when:0}]}),y=b.core;b.onPluginError=function(v,x){for(var A in o)o[A]===v&&(s[A]=x,b.emit({effect:A,key:"error",value:x}))};function f(v){var x;for(x=0;x<a.chain.length;x++)if(a.chain[x].id===v)return a.chain[x];var A=Ii(v);if(A){for(x=0;x<a.chain.length;x++)if(a.chain[x].type===A)return a.chain[x]}return null}function w(v,x){var A=d(v);b.post({t:"add",uid:A,type:u(v),when:x}),$t(v).forEach(function(E){b.post({t:"ps",uid:A,k:E[0],v:E[1],when:x,snap:!0})})}function m(v){b.post({t:"order",uids:p(),when:v})}function $(v,x){var A={};a.chain.forEach(function(N){A[N.id]=N});var E=p().join();v.chain.forEach(function(N){var q=A[N.id];if(!l(N)){delete o[N.id];return}if(!q||q.type!==N.type||!o[N.id]){delete o[N.id],delete s[N.id],w(N,x);return}var _={};$t(q).forEach(function(V){_[V[0]]=V[1]}),$t(N).forEach(function(V){_[V[0]]!==V[1]&&b.post({t:"ps",uid:o[N.id],k:V[0],v:V[1],when:x})})});var L={};v.chain.forEach(function(N){L[N.id]=!0}),Object.keys(o).forEach(function(N){L[N]||delete o[N]}),Object.keys(s).forEach(function(N){L[N]||delete s[N]}),a=v,p().join()!==E&&m(x)}var T=tu(function(v){if(!(b.disposed||!a.chain.some(function(A){return A.type===v}))){var x=JSON.parse(JSON.stringify(a));x.chain=x.chain.map(function(A){return A.type===v?pt({v:2,chain:[A]},1).chain[0]:A}),$(x,0),b.emit({effect:null,key:"plugin",value:v})}}),S=y.dispose;return y.dispose=function(){T(),S()},y.slots=n,y.meter=function(v){return v==null||v===""?b.meter("",js):b.meter("#"+v,function(x,A){var E=f(v),L=E?o[E.id]:0,N=x[2];if(L){for(var q=3,_=0;_<N;_++,q+=3)if(x[q]===L){A.in=x[q+1],A.out=x[q+2];return}}})},y.setParam=function(v,x,A,E){var L=f(v);if(!(!L||b.disposed||b.tooFar(E))){var N=re(L.type),q,_=null;if(!N)return x!=="bypass"?void 0:(L.bypass=!!A,b.emit({effect:L.id,key:x,value:L.bypass}),L.bypass);if(x==="bypass")q=!!A;else{for(var V=0;V<N.dials.length;V++)N.dials[V].key===x&&(_=N.dials[V]);if(!_)return;q=Ie(_,A,Rt(_,L.dials))}var de={},ue={};$t(L).forEach(function(B){de[B[0]]=B[1]}),N.dials.forEach(function(B){B.stepWhen&&(ue[B.key]=L.dials[B.key])}),x==="bypass"?L.bypass=q:L.dials[x]=q,N.dials.forEach(function(B){B.stepWhen&&(L.dials[B.key]=Ie(B,L.dials[B.key],Rt(B,L.dials)))});var Q=b.whenOf(E),Z=o[L.id];return Z&&$t(L).forEach(function(B){(de[B[0]]!==B[1]||_&&B[0]===_.k)&&b.post({t:"ps",uid:Z,k:B[0],v:B[1],when:Q})}),b.emit({effect:L.id,key:x,value:q}),Object.keys(ue).forEach(function(B){B!==x&&L.dials[B]!==ue[B]&&b.emit({effect:L.id,key:B,value:L.dials[B]})}),q}},y.getParam=function(v,x){var A=f(v);if(A)return x==="bypass"?A.bypass:A.dials[x]},y.getState=function(){return JSON.parse(JSON.stringify(a))},y.setState=function(v,x){b.disposed||b.tooFar(x&&x.at)||($(pt(v,n),b.whenOf(x&&x.at)),b.emit({effect:null,key:null,value:null}))},y.addEffect=function(v,x){var A=x||{},E=Os(v,a.chain);if(!(!E||a.chain.length>=n||b.disposed||b.tooFar(A.at))){if(A.dials){var L=pt({v:2,chain:[{id:E.id,type:E.type,dials:A.dials}]},1).chain[0];E.dials=L.dials}A.bypass===!0&&(E.bypass=!0);var N=a.chain.slice(),q=typeof A.index=="number"?Math.max(0,Math.min(N.length,A.index)):N.length;return N.splice(q,0,E),$({v:2,chain:N},b.whenOf(A.at)),b.emit({effect:E.id,key:"chain",value:"add"}),E.id}},y.removeEffect=function(v,x){var A=f(v),E=x&&x.at;return!A||b.disposed||b.tooFar(E)?!1:($({v:2,chain:a.chain.filter(function(L){return L!==A})},b.whenOf(E)),b.emit({effect:A.id,key:"chain",value:"remove"}),!0)},y.moveEffect=function(v,x,A){var E=f(v),L=A&&A.at;if(!E||b.disposed||b.tooFar(L))return!1;var N=Iu(a.chain,a.chain.indexOf(E),x);return N===a.chain?!1:($({v:2,chain:N},b.whenOf(L)),b.emit({effect:E.id,key:"chain",value:"move"}),!0)},y.getChain=function(){return a.chain.map(function(v){var x={id:v.id,type:v.type,name:Ou(v),bypass:v.bypass};if(v.plugin){var A=s[v.id]||0,E=!l(v)||A===5;x.plugin={id:v.plugin.id,version:v.plugin.version,url:v.plugin.url,name:v.plugin.name,status:E?"missing":A?"failed":"ready"},A&&!E&&(x.plugin.error=Jn[A]||Jn[2])}return x})},y.toAstrid=function(){return Uu(a)},y}function Jr(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function Hs(e,t,n){var a=n||{},i=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,o=typeof a.toAudioTime=="function"?a.toAudioTime:i?function(h){return i.toContextTime(h)}:t&&t.timebase==="shared"?null:function(h){return h},s=typeof a.now=="function"?a.now:i&&typeof i.sharedNow=="function"?function(){return i.sharedNow()}:null,l=t&&t.transport?t.transport:t,u=l&&l.tempo?l.tempo:l,d=!1;function c(h){if(!o){!d&&typeof console<"u"&&(d=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof h!="number")){var g=o(l.timeAt(h));return typeof g=="number"&&isFinite(g)?g:void 0}}function p(){var h=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(h)){var g=l&&typeof l.bpm=="number"?l.bpm:Jr(u,0);g>0&&e.setTempo(g);return}var b=Jr(u,h);b>0&&e.setTempo(b);for(var y=u&&(u.points||u.tempoPoints)||[],f=0;f<y.length;f++){var w=y[f];if(w.beat>h&&w.bpm>0){var m=c(w.beat);m!==void 0&&e.setTempo(w.bpm,m)}}}return p(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(h){h&&(h.kind==="tempo"&&h.bpm>0?e.setTempo(h.bpm,c(h.atBeat)):(h.kind==="snapshot"||h.kind==="start")&&p())})}const ln="/studio/assets/worklet-C1cegAfk.js";var dp="nc-ui",up={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","nyx-amber":"#FEAA02","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},qi={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#9B30FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},ea={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},pp={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},et={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},hp={light:{color:up.color,semantic:qi,component:ea,runtime:pp},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},Zt=e=>`--${dp}-${e}`,oi=qi["label-on-fill-dark"],Qr=qi["label-on-fill-light"],fp=et["label-min-contrast"],mp=/^#[0-9a-f]{6}$/i,gp=e=>typeof e=="string"&&mp.test(e),jn=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Zr(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),i=o=>{let s=(o+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${jn(i(0)*255)}${jn(i(8)*255)}${jn(i(4)*255)}`}function Us(e){let[t,n,a]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),i=Math.max(t,n,a),o=Math.min(t,n,a),s=(i+o)/2,l=i-o;if(!l)return{h:0,s:0,l:s};let u=l/(1-Math.abs(2*s-1));return{h:((i===t?60*((n-a)/l%6):i===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:u,l:s}}function eo(e){let[t,n,a]=[1,3,5].map(i=>{let o=parseInt(e.slice(i,i+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function si(e,t){let[n,a]=[eo(e),eo(t)].sort((i,o)=>o-i);return(n+.05)/(a+.05)}var ta=e=>si(e,oi)>=si(e,Qr)?oi:Qr;function Vs(e,t,n,a=fp){let i=Zr(e,t,n),o=ta(i)===oi?1:-1;for(let s=0;s<40&&si(i,ta(i))<a;s++)n+=o*.01,i=Zr(e,t,n);return i}function bp(e){let{h:t,s:n}=Us(e),a=Vs(t,Math.min(n,et["surprise-on-max-saturation"]),et["surprise-on-lightness"]);return{fill:e,ink:ta(e),on:a,onInk:ta(a)}}var yp=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function wp(e,t=Math.random){let[n,a]=et["surprise-saturation"],[i,o]=et["surprise-lightness"],s=et["surprise-min-hue-gap"],l=gp(e)?Us(e).h:null,u=t()*360;return l!==null&&yp(u,l)<s&&(u=(l+s+t()*(360-2*s))%360),Vs(u,n+t()*(a-n),i+t()*(o-i))}function vp(e){if(!e)return null;let t=bp(e);return{[Zt("surprise-fill")]:t.fill,[Zt("surprise-ink")]:t.ink,[Zt("surprise-on")]:t.on,[Zt("surprise-on-ink")]:t.onInk}}var xp=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,$p=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function to(e){let[t,n,a]=[1,3,5].map(l=>xp(parseInt(e.slice(l,l+2),16)/255)),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),o=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*i+.793617785*o-.0040720468*s,1.9779984951*i-2.428592205*o+.4505937099*s,.0259040371*i+.7827717662*o-.808675766*s]}function kp([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,i=(e-.1055613458*t-.0638541728*n)**3,o=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*i+.2309699292*o,-1.2684380046*a+2.6097574011*i-.3413193965*o,-.0041960863*a-.7034186147*i+1.707614701*o].map(s=>jn($p(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Ep=et["velocity-range"],Gs={min:ea.rhythm["velocity-min"],max:ea.rhythm["velocity-max"]},no=Object.fromEntries(Object.entries(hp).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Sp(e,t=Gs){let[n,a]=Ep,i=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,o=(i-n)/(a-n),s=t.ink??ea.rhythm["step-cell-ink"];if(o<=0)return{velocity:i,t:0,fill:t.min.toUpperCase(),ink:s};if(o>=1)return{velocity:i,t:1,fill:t.max.toUpperCase(),ink:s};let l=to(t.min),u=to(t.max);return{velocity:i,t:o,fill:kp(l.map((d,c)=>d+(u[c]-d)*o)),ink:s}}function ao(e,t=Gs){return{[Zt("velocity-fill")]:Sp(e,t).fill}}var na="data-nc-theme",li="nc-ui-theme-change",Ap=Object.freeze(["system","light","dark"]),Mp="netcomposer.studio.theme.v1",Tp="(prefers-color-scheme: dark)",_i=e=>e?.documentElement??null,Ws=e=>e?.defaultView?.matchMedia?.(Tp)??null,Bi=e=>e==="light"||e==="dark"?e:"system";function Lp(e=globalThis.document){return Bi(_i(e)?.getAttribute(na))}function aa(e=globalThis.document){let t=Lp(e);return t!=="system"?t:Ws(e)?.matches?"dark":"light"}function ji(e,t=globalThis.document){let n=_i(t);if(!n)return"light";let a=Bi(e);a==="system"?n.removeAttribute(na):n.setAttribute(na,a);let i=aa(t),o=t.defaultView?.CustomEvent;return o&&t.dispatchEvent(new o(li,{detail:{choice:a,theme:i}})),i}function Ys(e,t=globalThis.document){let n=_i(t);if(!n)return()=>{};let a=aa(t),i=()=>{let u=aa(t);u!==a&&(a=u,e(u))},o=t.defaultView?.MutationObserver,s=o?new o(i):null;s?.observe(n,{attributes:!0,attributeFilter:[na]});let l=Ws(t);return l?.addEventListener?.("change",i),t.addEventListener(li,i),()=>{s?.disconnect(),l?.removeEventListener?.("change",i),t.removeEventListener(li,i)}}var Cp={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Np={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Fp={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},zp={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},xa={};for(let[e,t]of Object.entries(Np))xa[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(zp))xa[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Fp))xa[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(Cp.renames.map(e=>[e.old,e.new]));function Ks(e){let t=xa[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function K(e){return Ks(e).prop}function r(e){return`var(${K(e)})`}function Pp(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(K(t)));return Number.isFinite(n)?n:0}function ce(e,t){let n=Ks(t),a=e.ownerDocument??document,i=a.createElement("span");i.dataset.ncLive=t,i.style.position="absolute",i.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?i.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?i.style.paddingLeft=o:i.style.color=o,(e instanceof Element?e:a.documentElement).append(i);let s=(a.defaultView??window).getComputedStyle(i),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return i.remove(),l}function Xs(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function Dp(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=r("font-ui"),n.style.fontSize=r("label-size"),n.style.fontWeight=r("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var Rp="[data-modulated], [data-modulated] *",Js="(orientation: landscape) and (max-height: 500px) and (max-width: 1023px)";function Ia(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function io(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${r("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${r("hairline")} solid ${r("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function Op(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${r(`module-bg-stack-${a}`)};
      ${K("text-sub")}: ${r(`module-sub-stack-${a}`)};
      ${K("divider")}: ${r(`module-div-stack-${a}`)};
      ${K("slider-track")}: ${r(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${r(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${r(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${r("module-bg-stack-1")};
      ${K("text-sub")}: ${r("module-sub-stack-1")};
      ${K("divider")}: ${r("module-div-stack-1")};
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
${Rp} { transition: none; }
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
  ${K("text-sub")}: ${r("module-sub-stack-1")};
  ${K("divider")}: ${r("module-div-stack-1")};
  ${K("slider-track")}: ${r("module-div-stack-1")};
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
  ${K("text-sub")}: ${r("module-sub-stack-1")};
  ${K("divider")}: ${r("module-div-stack-1")};
  ${K("slider-track")}: ${r("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${r("control-gap")} ${r("module-pad")};
  padding-bottom: ${r("module-pad")};
  background: ${r("module-bg-stack-1")};
  ${K("text-sub")}: ${r("module-sub-stack-1")};
  ${K("divider")}: ${r("module-div-stack-1")};
  ${K("slider-track")}: ${r("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${r("stack-card-pad-y")} ${r("module-pad")} ${r("module-pad")};
  ${K("text-sub")}: inherit;
  ${K("divider")}: inherit;
  ${K("slider-track")}: inherit;
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
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${K("divider")}: color-mix(in oklab, ${r("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${K("meter-track")}: color-mix(in oklab, ${r("text-sub")} 30%, var(--nc-strip-shade)); }
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
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${K("divider")}: ${r("strip-divider")}; }
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
${io("")}
}
@media (max-width: 1023px) {
${io("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Ia("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Ia("")}
}
@media (max-width: 1023px) {
${Ia("html[data-nc-landscape] ")}
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
`}var qa=null,Ip="nc-ui-fallback";function Qs(e=globalThis.document){if(!e?.documentElement||(e.documentElement,qa&&qa.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Ip} {
${Op()}
}
`,e.head.append(t),qa=t}var Xt=null,qp=0,_p=new URL("/studio/assets/confirm-BSJWrX8s.css",import.meta.url).href,Zs=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=_p,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Zs(document);function qe(e){return el(e).then(t=>!!t.ok)}function el({title:e,body:t,confirmLabel:n="Confirm",cancelLabel:a="Cancel",danger:i=!1,root:o,returnFocus:s,signal:l},u){if(Xt||l?.aborted)return Promise.resolve({});let d=o?.ownerDocument??document,c=Zs(d),p=o??d.body,h=d.defaultView??globalThis,g=`nc-ui-confirm-${++qp}`,b=(H,pe,fe)=>{let se=d.createElement(H);return se.className=`nc-ui-confirm${pe}`,fe!=null&&(se.textContent=fe),se},y=b("div","-layer");y.dataset.state="enter";let f=b("div","");f.setAttribute("role","alertdialog"),f.setAttribute("aria-modal","true"),f.setAttribute("aria-labelledby",`${g}-t`),f.setAttribute("aria-describedby",`${g}-b`);let w=b("h2","-title",e);w.id=`${g}-t`;let m=b("p","-body",t);m.id=`${g}-b`;let $=b("div","-actions"),T=(H,pe)=>{let fe=b("button","-btn",H);return fe.type="button",fe.dataset.ncConfirm=pe,fe.addEventListener("click",()=>Ee(pe==="ok")),fe},S=T(a,"cancel"),v=T(n,"ok");i&&(v.dataset.danger="true"),$.append(S,v);let[x,A]=u?.(b,v)??[];f.append(w,m,...x?[x]:[],$);let E=[A,S,v].filter(Boolean);y.append(f);let L={layer:y};Xt=L;let N=s??d.activeElement,q=[];for(let H of p.children)H.hasAttribute("inert")||(H.setAttribute("inert",""),q.push(H));let _=()=>{if(Xt!==L)return;p.append(y),(A??S).focus({preventScroll:!0});let H=h.requestAnimationFrame?.bind(h)??(pe=>setTimeout(pe,16));H(()=>H(()=>{y.dataset.state==="enter"&&(y.dataset.state="open")}))};c?c.then(_):_();let V=!1;y.addEventListener("pointerdown",H=>{V=H.target===y}),y.addEventListener("click",H=>{H.target===y&&V&&Ee(!1),V=!1});let de=H=>{if(H.stopImmediatePropagation(),H.key==="Escape")H.preventDefault(),Ee(!1);else if(H.key==="Tab"){H.preventDefault();let pe=E.filter(se=>!se.disabled),fe=pe.length;pe[(pe.indexOf(d.activeElement)+(H.shiftKey?fe-1:1))%fe].focus()}else H.key==="Enter"&&(H.preventDefault(),d.activeElement===S?Ee(!1):v.disabled||Ee(!0))},ue=H=>H.stopImmediatePropagation();h.addEventListener("keydown",de,!0),h.addEventListener("keyup",ue,!0);let Q=()=>Ee(!1);l?.addEventListener("abort",Q);let Z,B=new Promise(H=>{Z=H});function Ee(H){if(Xt!==L)return;Xt=null,h.removeEventListener("keydown",de,!0),h.removeEventListener("keyup",ue,!0),l?.removeEventListener("abort",Q);for(let Fe of q)Fe.removeAttribute("inert");y.dataset.state="closing",N?.isConnected&&typeof N.focus=="function"&&N.focus({preventScroll:!0});let pe=h.getComputedStyle?.(y),fe=Math.max(0,...String(pe?.transitionDuration??"").split(",").map(Fe=>Number.parseFloat(Fe)*(Fe.trim().endsWith("ms")?1:1e3)||0)),se=()=>y.remove();y.addEventListener("transitionend",Fe=>Fe.target===y&&se()),setTimeout(se,fe+50),Z({ok:H,value:A?.value.trim()})}return B}function Bp(e){let t=e.field??{};return el(e,(n,a)=>{let i=n("label","-field"),o=n("input","-input");o.type=t.type??"text",o.value=t.value??"",t.placeholder&&(o.placeholder=t.placeholder),o.spellcheck=!1,o.autocomplete="off";let s=()=>{a.disabled=o.value.trim()===""};return o.addEventListener("input",s),s(),i.append(n("span","-label",t.label??""),o),[i,o]}).then(n=>n.ok?n.value:null)}function tl(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let i=t.createElement("span");i.dataset.ncOn="",i.textContent=e.onText??"On";let o=t.createElement("span");o.dataset.ncOff="",o.textContent=e.offText??"Off",a.append(i,o),n.append(a);let s=!1,l=d=>{s=d===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let u=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",u),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",u),n.remove()}}}var nl=new WeakMap,ro=.25;function jp(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let i=t.createElement("span");i.className="nc-fader-cap",i.setAttribute("aria-hidden","true"),n.append(a,i);let o=0,s=e.step??.005,l=e.onChange,u=e.onReset,d=f=>Math.min(1,Math.max(0,f)),c=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},p=f=>{let w=d(f);w!==o&&(o=w,c(),l?.(w))},h=0,g=!1;n.addEventListener("pointerdown",f=>{if(f.button!==0)return;f.preventDefault(),n.focus?.({preventScroll:!0});let w=n.getBoundingClientRect();f.target!==i&&w.height>0&&p(1-(f.clientY-w.top)/w.height),h=f.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(f.pointerId)}),n.addEventListener("pointermove",f=>{if(!g)return;let w=n.getBoundingClientRect().height||1,m=(h-f.clientY)/w*(f.shiftKey?ro:1);h=f.clientY,p(o+m)});let b=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",b),n.addEventListener("pointercancel",b),n.addEventListener("lostpointercapture",b),n.addEventListener("dblclick",f=>{f.preventDefault(),u?.()}),n.addEventListener("keydown",f=>{let w=f.shiftKey?s*ro:s,m={ArrowUp:o+w,ArrowRight:o+w,ArrowDown:o-w,ArrowLeft:o-w,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};f.key in m&&(f.preventDefault(),p(m[f.key]))});let y={el:n,get value(){return o},get dragging(){return g},set(f){g||(o=d(Number(f)||0),c())},setText(f){f?n.setAttribute("aria-valuetext",f):n.removeAttribute("aria-valuetext")},setLabel(f){n.setAttribute("aria-label",f)},configure(f){typeof f.step=="number"&&f.step>0&&(s=f.step),f.onChange&&(l=f.onChange),f.onReset&&(u=f.onReset)}};return y.setLabel(e.label),y.set(e.value??0),y.setText(e.valueText),nl.set(n,y),y}function Hp(e){return nl.get(e)}var al=new WeakMap,Up=.2,Vp=1.5,Gp=.5;function Wp(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function oo(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Wp(a.getComputedStyle(e).getPropertyValue(K(t)),n)}function Yp(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let i=t.createElement("button");i.type="button",i.className="nc-meter-clip",i.dataset.lit="false";let o=t.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let y=0;y<n;y++){let f=t.createElement("span");f.className="nc-meter-bar";let w=t.createElement("span");w.className="nc-meter-peak";let m=t.createElement("span");m.className="nc-meter-rms";let $=t.createElement("span");$.className="nc-meter-hold",f.append(w,m,$),o.append(f),s.push({peak:w,rms:m,hold:$,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(i,o);let l=e.label,u=e.onClear,d=!1,c=-1,p=-1,h=()=>{i.dataset.lit=d?"true":"false",i.setAttribute("aria-pressed",d?"true":"false"),i.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),i.title=d?"Clipped. Click to clear":"Clip light"},g=(y,f,w,m)=>{let $=Math.round(m*1e3)/1e3;w[f]!==$&&(w[f]=$,y.style.transform=f==="hold"?`translateY(${Math.round((1-$)*1e3)/10}%)`:`scaleY(${$})`)};i.addEventListener("click",()=>{b.clear(),u?.()});let b={el:a,get clipped(){return d},update(y,f){c<0&&(c=oo(a,"motion-meter-fall",Up)),p<0&&(p=oo(a,"motion-meter-hold",Vp));let w=Math.max(0,Math.min(.25,Number(f)||0)),m=c>0?Math.exp(-w/c):0;s.forEach(($,T)=>{let S=y[T]??y[0]??{peak:0,rms:0},v=Math.min(1,Math.max(0,Number(S.peak)||0)),x=Math.min(v,Math.max(0,Number(S.rms)||0));S.over&&b.clip(),$.level.peak=v>=$.level.peak?v:v+($.level.peak-v)*m,$.level.rms=x>=$.level.rms?x:x+($.level.rms-x)*m,$.holdAge+=w,v>=$.holdAt?($.holdAt=v,$.holdAge=0):$.holdAge>p&&($.holdAt=Math.max(v,$.holdAt-Gp*w)),g($.peak,"peak",$.shown,$.level.peak),g($.rms,"rms",$.shown,$.level.rms),g($.hold,"hold",$.shown,$.holdAt),$.hold.dataset.off=$.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,h())},clear(){d=!1,h()},reset(){for(let y of s)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,g(y.peak,"peak",y.shown,0),g(y.rms,"rms",y.shown,0),g(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,h()},configure(y){y.onClear&&(u=y.onClear)}};return h(),b.reset(),al.set(a,b),b}function il(e){return e?al.get(e):void 0}var Kp=3,Xp=new Set(["freq","q","rate","time","log"]);function Hi(e,t,n){return!e||!Xp.has(e)||!(n>t)?"linear":t>0?"log":"power"}function $a(e,t,n){return Hi(e,t,n)!=="linear"}function Ui(e,t,n,a){let i=Number(a);if(!(n>t)||!Number.isFinite(i))return 0;let o=Math.min(n,Math.max(t,i)),s=Hi(e,t,n);if(s==="log")return Math.log(o/t)/Math.log(n/t);let l=(o-t)/(n-t);return s==="power"?Math.cbrt(l):l}function rl(e,t,n,a){let i=Math.min(1,Math.max(0,Number(a)||0)),o=Hi(e,t,n);return o==="log"?t*(n/t)**i:t+(n-t)*(o==="power"?i**Kp:i)}function ol(e,t,n,a){let i=Math.min(n,Math.max(t,e));if(a>0){i=t+Math.round((i-t)/a)*a;let o=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));i=Number(i.toFixed(o)),i=Math.min(n,Math.max(t,i))}return i}function Vi(e,t,n,a){return Math.round(Ui(e,t,n,a)*1e3)}function ci(e,t,n,a,i){return ol(rl(e,t,n,Number(a)/1e3),t,n,i)}function Jp(e,t,n=!1){let a=Number(e)||0,i=n?1:1e3/100,o=null;return t==="ArrowRight"||t==="ArrowUp"?o=a+i:t==="ArrowLeft"||t==="ArrowDown"?o=a-i:t==="PageUp"?o=a+1e3/10:t==="PageDown"?o=a-1e3/10:t==="Home"?o=0:t==="End"&&(o=1e3),o===null?null:Math.min(1e3,Math.max(0,Math.round(o)))}function sl(e,t,n,a,i,o=!1,s){let l=Vi(e,t,n,a),u=Jp(l,i,o);if(u===null)return null;let d=ci(e,t,n,u,s),c=Math.sign(u-l),p=ol(Number(a),t,n,s);for(;c!==0&&d===p&&u>0&&u<1e3;)u+=c,d=ci(e,t,n,u,s);return d}function so(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function lo(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function Qp(e,t,n,a=n/6){let i=e.some(c=>c===null),o=Math.max(0,n-(i?a:0)),s=e.reduce((c,p,h)=>p===null?c:c+lo(t[h]),0),l=s>0?o/s:0,u=e.map(c=>c===null?0:Math.min(o,lo(c)*l));if(i){let c=u.reduce((h,g)=>h+g,0),p=e.indexOf(null);u[p]=Math.max(a,n-c)}let d=[0];for(let c of u)d.push(Math.round((d[d.length-1]+c)*100)/100);return i&&(d[d.length-1]=n),d}function Zp(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.floor(t*a)),o=Math.max(1,Math.floor(n*a));(e.width!==i||e.height!==o)&&(e.width=i,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function Ve(e){return Math.max(0,Math.min(1,e))}function ll(e,t){let{ctx:n,w:a,h:i}=Zp(e);if(!n)return;n.clearRect(0,0,a,i);let o=Dp(e);if(t.paint==="swatch"){let u=ce(e,"accent"),d=ce(e,"rhythm.step-cell-on");e.dataset.ncAccent=u,e.dataset.ncStep=d,n.fillStyle=u,n.fillRect(0,0,a/2,i),n.fillStyle=d,n.fillRect(a/2,0,a/2,i);return}if(t.paint==="filter"&&typeof t.hz=="number"){nh(n,a,i,t,e,o);return}if(t.paint==="filter"){let u=t.mode??"lp",d=ce(e,Xs(u)),c=ce(e,"divider"),p=Ve(t.cutoff??.5),h=.08+(1-Ve(t.resonance??.2))*.22;n.strokeStyle=c,n.beginPath(),n.moveTo(0,i*.72),n.lineTo(a,i*.72),n.stroke(),n.beginPath();for(let g=0;g<=a;g++){let b=g/Math.max(1,a),y=0;u==="lp"?y=b<p?1:Math.max(0,1-(b-p)/h):u==="hp"?y=b>p?1:Math.max(0,1-(p-b)/h):y=Math.max(0,1-Math.abs(b-p)/h);let f=i*.78-y*i*.62;g===0?n.moveTo(g,f):n.lineTo(g,f)}n.strokeStyle=d,n.stroke(),n.fillStyle=ce(e,"text-sub"),n.font=o,n.fillText(u.toUpperCase(),0,i),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=ce(e,"accent");let u=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[c,p,h]=Qp([u,d],t.max??[1,4],a),g=2,b=i-1;n.beginPath(),n.moveTo(c,b),n.lineTo(p,g);let y=Math.max(1,Math.ceil(h-p));for(let f=1;f<=y;f++){let w=f/y;n.lineTo(p+(h-p)*w,b-(b-g)*Math.exp(-4.6*w)*(1-w*.01))}n.lineTo(h,b),n.lineTo(a,b),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let u=Array.isArray(t.peaks)?t.peaks:[],[d,c]=Array.isArray(t.region)?t.region:[0,1],p=ce(e,"accent"),h=ce(e,"text-sub"),g=i/2;n.fillStyle=ce(e,"accent-soft"),n.fillRect(Ve(d)*a,0,(Ve(c)-Ve(d))*a,i),n.strokeStyle=ce(e,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(a,g),n.stroke();let b=Math.floor(u.length/2);for(let y=0;y<b;y++){let f=(y+.5)/b*a,w=Math.max(-1,Math.min(1,u[y*2]??0)),m=Math.max(-1,Math.min(1,u[y*2+1]??0)),$=(y+.5)/b;n.strokeStyle=$>=d&&$<=c?p:h,n.beginPath(),n.moveTo(f,g-m*(g-1)),n.lineTo(f,g-w*(g-1)+.5),n.stroke()}n.strokeStyle=p;for(let y of[d,c,...Array.isArray(t.markers)?t.markers:[]]){let f=Math.round(Ve(y)*(a-1))+.5;n.beginPath(),n.moveTo(f,0),n.lineTo(f,i),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=ce(e,"text"),n.fillRect(Math.round(Ve(t.position)*(a-1)),0,1,i)),b||(n.fillStyle=h,n.font=o,n.fillText(t.empty??"Empty",0,g+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let u=Ve(t.level??0);n.fillStyle=ce(e,"divider"),n.fillRect(0,i*.4,a,i*.2),n.fillStyle=ce(e,"accent"),n.fillRect(0,i*.4,a*u,i*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=ce(e,"rhythm.step-cell-off"),n.fillRect(0,i*.45,a,i*.1),n.fillStyle=ce(e,"rhythm.playhead"),n.fillRect(l/s*a,i*.3,Math.max(1,a/s),i*.4),e.dataset.ncAccent=ce(e,"accent")}var cn=20,di=2e4,_a=24,co=-60;function eh(e,t,n,a,i=48e3){let o=2*Math.PI*Math.min(t,i*.49)/i,s=Math.cos(o),l=Math.sin(o)/(2*n),u,d,c;e==="hp"?[u,d,c]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[u,d,c]=[l,0,-l]:[u,d,c]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,h=-2*s,g=1-l,b=2*Math.PI*a/i,y=($,T,S)=>$+T*Math.cos(b)+S*Math.cos(2*b),f=($,T)=>-($*Math.sin(b)+T*Math.sin(2*b)),w=Math.hypot(y(u,d,c),f(d,c)),m=Math.hypot(y(p,h,g),f(h,g));return m>0?w/m:0}function th(e,t){return Math.log(Math.max(cn,Math.min(di,e))/cn)/Math.log(di/cn)*t}function uo(e,t,n){let a=Math.max(co,Math.min(_a,e));return t+(_a-a)/(_a-co)*(n-t)}function nh(e,t,n,a,i,o){let s=a.mode??"lp",l=ce(i,Xs(s)),u=ce(i,"divider"),d=ce(i,"text-sub"),c=Number.parseFloat(String(o).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,h=Math.max(p+4,n-c-3),g=a.q??Math.SQRT1_2,b=Math.round(uo(0,p,h))+.5;e.strokeStyle=u,e.lineWidth=1,e.beginPath(),e.moveTo(0,b),e.lineTo(t,b),e.stroke(),e.beginPath();for(let y=0;y<=t;y++){let f=cn*(di/cn)**(y/Math.max(1,t)),w=a.open?1:eh(s,a.hz,g,f,a.sampleRate),m=uo(20*Math.log10(Math.max(1e-5,w)),p,h);y===0?e.moveTo(y,m):e.lineTo(y,m)}if(e.strokeStyle=l,e.stroke(),!a.open){let y=Math.round(th(a.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(y,p),e.lineTo(y,h),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=o,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",i.dataset.ncAccent=l,i.dataset.ncFilterHz=String(Math.round(a.hz))}function Me(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let i=n.defaultView.getComputedStyle(a).color;return a.remove(),i}function ah(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var ft=20,kn=2e4,Gi=Math.log(kn/ft),ui=32,ih=250,rh=-100,oh=1200,sh=4.5,po=-6,ut=-96,lh=48,ho=[100,1e3,1e4],ch=[6,12];function Ct(e,t){return Math.log(Math.max(ft,Math.min(kn,e))/ft)/Gi*t}function Hn(e,t){return ft*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Gi)}function tt(e,t,n,a){let i=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*i}function pi(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var cl=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function dh(e,t,n,a){let i=n?3:1,o=u=>({db:Math.max(-a,Math.min(a,e.db+u*i))}),s=u=>({hz:Math.max(e.minHz??ft,Math.min(e.maxHz??kn,e.hz*2**(u*i/6)))}),l=u=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(u*i)))});switch(t){case"ArrowUp":return o(1);case"ArrowDown":return o(-1);case"ArrowRight":return e.moveHz?s(1):o(1);case"ArrowLeft":return e.moveHz?s(-1):o(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Wi(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function uh(e,t,n,a,i,o,s,l,u){let d=u?.25:1,c={},p=Math.max(1,o/2-l);if(c.db=Math.max(-s,Math.min(s,t.db-a*d/p*s/Wi(e))),e.moveHz){let h=t.hz*Math.exp(n*d/Math.max(1,i)*Gi);c.hz=Math.max(e.minHz??ft,Math.min(e.maxHz??kn,h))}return c}function ph(e,t,n,a,i){let o=Math.max(0,n.left)+1,s=Math.min(n.right,i)-1,l=Math.min(t.width*3+a*2,s-o),u=Math.max(o,Math.min(e.left,s-l));return{left:Math.round(u-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var he=new WeakMap;function hh(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let i=document.createElement("canvas");i.className="nc-eq-spectrum",i.setAttribute("aria-hidden","true");let o=document.createElement("canvas");o.className="nc-eq-curve",o.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(i,o);for(let u of e.bands)a.append(fh(n,u,t));a.append(s),a.addEventListener("click",u=>{if(!ml(n)||u.button>0)return;let d=fl(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),he.set(n,{control:e,cache:null,spec:null,active:null}),ul(n,e),n}function dl(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function fh(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let i=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},o=()=>i()?.bands.find(d=>d.id===t.id)??null,s=null;a.addEventListener("pointerdown",d=>{if(d.button!==0)return;let c=o();c&&(d.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(d.pointerId),s={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:c.hz,db:c.db}},a.dataset.drag="true",Ge(e,t.id))}),a.addEventListener("pointermove",d=>{if(!s||d.pointerId!==s.id)return;let c=i(),p=o(),h=he.get(e);if(!c||!p||!h?.box)return;let{w:g,h:b,pad:y}=h.box;c.onBand(p.id,uh(p,s.start,d.clientX-s.x,d.clientY-s.y,g,b,c.range??18,y,d.shiftKey))});let l=d=>{!s||d.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&Ge(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",d=>{d.preventDefault(),i()?.onReset?.(t.id)}),a.addEventListener("keydown",d=>{let c=i(),p=o();if(!c||!p)return;let h=dh(p,d.key,d.shiftKey,c.range??18);h&&(d.preventDefault(),h==="reset"?c.onReset?.(p.id):c.onBand(p.id,h),Ge(e,p.id))});let u=null;return a.addEventListener("wheel",d=>{let c=i(),p=o();if(!c||!p?.moveQ)return;d.preventDefault();let h=d.timeStamp;(!u||h-u.t>400)&&(u={q:p.q,t:h});let g=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;u.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,u.q*2**(-g/240))),u.t=h,c.onBand(p.id,{q:u.q}),Ge(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>Ge(e,t.id)),a.addEventListener("focus",()=>Ge(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&Ge(e,null)}),a.addEventListener("blur",()=>{s||Ge(e,null)}),a}function Ge(e,t){let n=he.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?Ot(e):Yi(e)}function Yi(e){let t=he.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(b=>b.id===t.active):null;for(let b of e.querySelectorAll(".nc-eq-node"))b instanceof HTMLElement&&(a&&b.dataset.band===a.id?b.dataset.active="true":delete b.dataset.active);if(!a||!t.box){n.hidden=!0;return}let i=[a.label,cl(a.db)];a.kind==="peak"?i.push(pi(a.hz),`Q ${a.q.toFixed(1)}`):i.push(`${a.kind==="lowshelf"?"below":"above"} ${pi(a.hz)}`),n.textContent=i.join(" · "),n.dataset.tone=String(mh(t.control,a)),n.hidden=!1;let{w:o,h:s,pad:l}=t.box,u=Ct(a.hz,o),d=tt(a.db*Wi(a),s,t.control.range??18,l),c=n.offsetWidth,p=n.offsetHeight,h=Math.max(0,Math.min(o-c,u-c/2)),g=d-p-l*1.5>=0?d-p-l*1.5:Math.min(s-p,d+l*1.5);n.style.left=`${Math.round(h)}px`,n.style.top=`${Math.round(g)}px`}function mh(e,t){return e.bands.indexOf(t)%3+1}function ul(e,t){let n=he.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Ki(e);let a=t.range??18;t.bands.forEach((i,o)=>{let s=dl(e,i.id);s instanceof HTMLElement&&(s.dataset.tone=String(o%3+1),s.dataset.kind=i.kind,s.setAttribute("aria-label",`${i.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(i.db)),s.setAttribute("aria-valuetext",i.valueText??`${cl(i.db)}, ${pi(i.hz)}`),s.setAttribute("aria-keyshortcuts",i.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),i.help?s.setAttribute("data-nc-help",i.help):s.removeAttribute("data-nc-help"))}),Ot(e),xh(e)}function pl(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.round(t*a)),o=Math.max(1,Math.round(n*a));(e.width!==i||e.height!==o)&&(e.width=i,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function hl(e){return{curve:Me(e,"eq-curve"),fill:Me(e,"eq-fill"),quiet:Me(e,"text-sub"),grid:Me(e,"eq-grid"),zero:Me(e,"divider"),label:Me(e,"text-sub"),spectrum:Me(e,"eq-spectrum"),bands:[Me(e,"eq-band-1"),Me(e,"eq-band-2"),Me(e,"eq-band-3")]}}function gh(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Ot(e){he.has(e)&&Ki(e);let t=he.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:i,w:o,h:s}=pl(n);if(!i)return;let l=Math.max(8,Math.round(s*.06)),u=a.range??18;t.box={w:o,h:s,pad:l},t.colours=hl(e);let d=t.colours,c=gh(a,o);if(!t.cache||t.cache.key!==c){let T=Math.max(64,Math.ceil(o)+1),S=new Float64Array(T);for(let x=0;x<T;x++)S[x]=Hn(x/(T-1)*o,o);let v=null;try{v=typeof a.response=="function"?a.response(S):null}catch{v=null}t.cache={key:c,freqs:S,total:v?.total??new Float64Array(T),bands:v?.bands??[]}}i.clearRect(0,0,o,s);let p=ah(e),h=a.on!==!1;bh(i,o,s,u,l,d,p);let{freqs:g,total:b,bands:y}=t.cache,f=Array.from(g,T=>Ct(T,o)),w=tt(0,s,u,l);y.forEach((T,S)=>{if(!T||!T.some(A=>Math.abs(A)>.05))return;let v=h?d.bands[S%3]:d.quiet,x=Array.from(T,A=>tt(A,s,u,l));i.save(),t.active&&a.bands[S]?.id===t.active&&(i.globalAlpha=.14,i.fillStyle=v,fo(i,f,x,w)),i.globalAlpha=h?.75:.4,i.strokeStyle=v,i.lineWidth=.75,Ba(i,f,x),i.restore()});let m=Array.from(b,T=>tt(T,s,u,l)),$=h?d.curve:d.quiet;i.save(),i.fillStyle=h?d.fill:d.quiet,i.globalAlpha=h?.2:.08,fo(i,f,m,w),i.restore(),i.save(),i.strokeStyle=h?d.fill:$,i.lineJoin="round",i.lineCap="round",h&&(i.globalAlpha=.16,i.lineWidth=4,Ba(i,f,m)),i.globalAlpha=1,i.strokeStyle=$,i.lineWidth=1.25,Ba(i,f,m),i.restore(),yh(e),Yi(e)}function bh(e,t,n,a,i,o,s){e.save(),e.lineWidth=1;for(let u=10;u<=1e4;u*=10)for(let d=1;d<=9;d++){let c=u*d;if(c<ft||c>kn)continue;let p=Math.round(Ct(c,t))+.5;e.globalAlpha=ho.includes(c)?.9:.35,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let u of ch)if(!(u>a))for(let d of[1,-1]){let c=Math.round(tt(u*d,n,a,i))+.5;e.globalAlpha=u===12?.75:.4,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(0,c),e.lineTo(t,c),e.stroke()}e.globalAlpha=1,e.strokeStyle=o.zero;let l=Math.round(tt(0,n,a,i))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=o.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let u of ho){let d=u>=1e3?`${u/1e3}k`:String(u),c=e.measureText(d).width,p=Ct(u,t)+3;e.fillText(d,p+c+2>t?Ct(u,t)-c-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let u of[12,0,-12]){if(Math.abs(u)>a)continue;let d=tt(u,n,a,i);e.fillText(u>0?`+${u}`:u<0?`−${-u}`:"0",t-3,Math.round(d)-1)}e.restore()}function ia(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let i=(t[a]+t[a+1])/2,o=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],i,o)}e.lineTo(t[t.length-1],n[n.length-1])}function Ba(e,t,n){e.beginPath(),ia(e,t,n),e.stroke()}function fo(e,t,n,a){e.beginPath(),ia(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function fl(e){return e.closest("[data-nc-maxable]")}function ml(e){let t=fl(e);return!!t&&!t.hasAttribute("data-nc-max")}function Ki(e){let t=ml(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=he.get(e);n?.active&&(n.active=null,Yi(e))}return t}function yh(e){Ki(e);let t=he.get(e);if(!t?.box)return;let{w:n,h:a,pad:i}=t.box,o=t.control.range??18;for(let s of t.control.bands){let l=dl(e,s.id);l instanceof HTMLElement&&(l.style.left=`${Ct(s.hz,n).toFixed(1)}px`,l.style.top=`${tt(s.db*Wi(s),a,o,i).toFixed(1)}px`)}}function wh(e,t,n,a){let i=a/2/n,o=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let u=0;u<e;u++){let d=(u-.5)/(e-1)*t,c=(u+.5)/(e-1)*t,p=Hn(d,t),h=Hn(c,t),g=Hn(u/(e-1)*t,t);o[u]=Math.min(n-1,p/i),s[u]=Math.min(n-1,h/i),l[u]=sh*Math.log2(g/1e3)}return{lo:o,hi:s,tilt:l}}function vh(e,t,n){let a=Math.floor(t),i=Math.ceil(n);if(i-a<=1){let s=t-a,l=e[a]??-1/0,u=e[Math.min(e.length-1,a+1)]??l;return l+(u-l)*s}let o=-1/0;for(let s=a;s<=i&&s<e.length;s++)e[s]>o&&(o=e[s]);return o}function xh(e){let t=he.get(e);if(t){if(!t.control.spectrum){bl(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let i=he.get(e)?.spec;i&&(i.visible=a.some(o=>o.isIntersecting),hi(e))}),t.spec.io.observe(e)):t.spec.visible=!0}hi(e)}}function hi(e){let t=he.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){gl(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=fi(e),n.onVis||(n.onVis=()=>hi(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&mi(e,!1)}function fi(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function mi(e,t){let n=he.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,ja(e,fi(e))),ih):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(i=>(n.raf=0,ja(e,i))):n.timer=a.setTimeout(()=>(n.timer=0,ja(e,fi(e))),ui))}function gl(e){let t=he.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function bl(e){let t=he.get(e)?.spec;if(!t)return;gl(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=he.get(e);n&&(n.spec=null)}function ja(e,t){let n=he.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){bl(e);return}if(!a.analyser)return;if(t-a.last<ui-4&&!a.idle){mi(e,!1);return}let i=a.last?Math.min(.25,(t-a.last)/1e3):ui/1e3;a.last=t;let o=e.querySelector(".nc-eq-spectrum");if(!(o instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:u}=pl(o);if(!s)return;let d=Math.max(16,Math.round(l/2)),c=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==d||a.map.w!==l||a.map.sr!==c)&&(a.map={cols:d,w:l,sr:c,...wh(d,l,a.buf.length,c)},a.disp=new Float32Array(d).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,h=lh*i,{lo:g,hi:b,tilt:y}=a.map;for(let w=0;w<d;w++){let m=vh(a.buf,g[w],b[w]);m>p&&(p=m);let $=m+y[w],T=a.disp[w]-h;a.disp[w]=$>T?$:T}p>rh&&(a.loud=t);let f=t-a.loud>oh;s.clearRect(0,0,l,u),(!f||a.disp.some(w=>w>ut))&&$h(s,l,u,a.disp,n.colours??hl(e)),a.idle=f&&!a.disp.some(w=>w>ut),mi(e,a.idle)}function $h(e,t,n,a,i){let o=a.length,s=new Array(o),l=new Array(o),u=d=>{let c=a[Math.max(0,Math.min(o-1,d))];return Number.isFinite(c)?c:ut};for(let d=0;d<o;d++){let c=u(d)*.36+(u(d-1)+u(d+1))*.22+(u(d-2)+u(d+2))*.1,p=(Math.max(ut,Math.min(po,Number.isFinite(c)?c:ut))-ut)/(po-ut);s[d]=d/(o-1)*t,l[d]=n-p*n}e.save(),e.fillStyle=i.spectrum,e.globalAlpha=.13,e.beginPath(),ia(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=i.spectrum,e.lineWidth=1,e.beginPath(),ia(e,s,l),e.stroke(),e.restore()}var kh=.8912509381337456,gi=32,Eh=250,Sh=1200,Ah=.2,yl=1.5;function Mh(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function Th(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let i=e.createElement("span");i.className="nc-fx-level-fill",a.append(i),t.append(a)}return t}var ra=new WeakMap,mo=new WeakMap;function go(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let i=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),o=Number.parseFloat(i);return Number.isFinite(o)?i.endsWith("ms")?o/1e3:o:n}function Lh(e){let t=mo.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(i=>{for(let o of i){let s=ra.get(o.target);s&&(s.seen.set(o.target,o.isIntersecting),dn(s))}At(t)})),e.addEventListener("visibilitychange",()=>{for(let i of t.recs)dn(i);At(t)}),mo.set(e,t),t}var wl=e=>e.els.some(t=>t.isConnected);function Ch(e){if(!e.loop.io)return wl(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function dn(e){let t=!e.dead&&!!e.source&&Ch(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Xi(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),wi(e))}function Xi(e){return e.doc.defaultView?.performance?.now()??Date.now()}function At(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){vl(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Xi(e)),!e.raf&&!e.timer&&bi(e,!1)}function bi(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>bo(e,Xi(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),Eh):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(i=>(e.raf=0,bo(e,i))):e.timer=n.setTimeout(()=>(e.timer=0,a()),gi)}function vl(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function bo(e,t){if(t-e.last<gi-4&&!e.idle&&e.last){bi(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):gi/1e3;e.last=t,e.frames++;let a=!1,i=!1;for(let o of e.recs){if(!wl(o)){(o.placed||e.frames-o.born>90)&&xl(o);continue}o.placed=!0,o.open&&(i=!0,Nh(o,n,t)&&(e.loud=t),(o.disp[0]>0||o.disp[1]>0)&&(a=!0))}if(!i){vl(e);return}e.idle=t-e.loud>Sh&&!a,bi(e,e.idle)}function Nh(e,t,n){if(e.fall<0){let h=e.els[0];e.fall=go(h,"motion-meter-fall",Ah),e.hold=go(h,"motion-meter-hold",yl)}let a=null;try{a=e.source.read()}catch{a=null}let i=typeof a=="number",o=i?a:Number(a?.in)||0,s=!i&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,u=s?"2":"1";if(e.rows!==u){e.rows=u;for(let h of e.els)h.dataset.ncRows=u}let d=e.fall>0?Math.exp(-t/e.fall):0,c=[o,l],p=!1;for(let h=0;h<2;h++){let g=Mh(c[h]);g>0&&(p=!0),e.disp[h]=g>=e.disp[h]?g:g+(e.disp[h]-g)*d,e.disp[h]<.001&&(e.disp[h]=0),c[h]>=kh&&(e.clipAt[h]=n);let b=e.clipAt[h]>0&&n-e.clipAt[h]<e.hold*1e3;yi(e,h,e.disp[h],b)}return p}function yi(e,t,n,a){let i=Math.round(n*1e3)/1e3,o=a?"true":"false";if(!(e.shown[t]===i&&e.clipShown[t]===o)){e.shown[t]=i,e.clipShown[t]=o;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${i})`,l.dataset.clip=o)}}}function wi(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,yi(e,0,0,!1),yi(e,1,0,!1)}function xl(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),ra.get(t)===e&&ra.delete(t)}function Fh(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,i=Lh(a),o={els:n,source:t??null,loop:i,open:!1,dead:!1,seen:new Map,born:i.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:yl,rows:""};for(let s of n)ra.set(s,o),i.io?.observe(s);if(i.recs.add(o),wi(o),!i.io){let s=a.defaultView,l=()=>{dn(o),At(i)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!o.dead){if(l===o.source){dn(o),At(i);return}o.open&&(o.open=!1,o.source?.close?.(),wi(o)),o.source=l,dn(o),At(i)}},destroy(){o.dead||xl(o),At(i)}}}var $l={slop:8,longPressMs:500,pitchPx:16},zh=class{constructor(e,t,n=$l){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let i=this.hit(t,n);return i<0?!1:(this.phase="pending",this.pointer=e,this.pad=i,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let i=t-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(i,o)<this.config.slop)return;Math.abs(o)>=Math.abs(i)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-o/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Ph(e,t,n,a=$l){let i=!1,o=0,s=(d,c)=>{let p=e.ownerDocument.elementFromPoint?.(d,c),h=[...e.querySelectorAll(t)],g=p?h.findIndex(f=>f===p||f.contains(p)):-1;if(g>=0)return g;let b=-1,y=Number.POSITIVE_INFINITY;return h.forEach((f,w)=>{if(f.hidden)return;let m=f.getBoundingClientRect();if(c<m.top||c>m.bottom)return;let $=Math.abs(d-(m.left+m.width/2));$<y&&$<=m.width&&(b=w,y=$)}),b},l=new zh(s,d=>{(d.kind==="paint"||d.kind==="long")&&(i=!0),n(d)},a),u=()=>{o&&clearTimeout(o),o=0};return e.addEventListener("pointerdown",d=>{d.button>0||(i=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(u(),o=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&u())}),e.addEventListener("pointerup",d=>{u(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{u(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{i&&(i=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var kl="netcomposer.groups.v1";function Ji(){try{return globalThis.localStorage??null}catch{return null}}function El(e=Ji(),t=kl){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[i,o]of Object.entries(n))typeof o=="boolean"&&a.set(i,o);return a}catch{return new Map}}function Dh(e,t,n,a=kl){let i=El(e,a);i.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(i)))}catch{}}function Rh(e,t=Ji()){return El(t).get(e.id)??e.open===!0}function Oh(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let i=document.createElement("button");i.type="button",i.className="nc-group-toggle",i.id=`${e.id}-group-toggle`;let o=document.createElement("span");o.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),i.append(o,s,l);let u=document.createElement("div");u.className="nc-group-body",u.id=`${e.id}-group-body`,u.setAttribute("role","group"),u.setAttribute("aria-labelledby",i.id),i.setAttribute("aria-controls",u.id);for(let d of e.controls)u.append(n(d,t));return i.addEventListener("click",()=>{let d=a.dataset.ncOpen!=="true";Dh(Ji(),e.id,d),vi(a,d);let c=t(a);c?.type==="group"&&c.onToggle?.(d)}),a.append(i,u),Sl(a,e),vi(a,Rh(e)),Al(a,e),a}function vi(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let i=n?.querySelector(".nc-group-mark");i&&(i.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function Sl(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function Al(e,t){Sl(e,t)&&vi(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),i=t.summary??"";a&&a.textContent!==i&&(a.textContent=i)}var zn="application/x-nc-pad",yo="http://www.w3.org/2000/svg";function Ih(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],i=[];for(let o=0;o<n;o++){let s=Math.floor(o*t/n),l=Math.max(s+1,Math.floor((o+1)*t/n)),u=0,d=0;for(let p=s;p<l;p++)u=Math.min(u,e[2*p]??0),d=Math.max(d,e[2*p+1]??0);let c=n===1?50:o/(n-1)*100;a.push(`${c.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),i.push(`${c.toFixed(1)} ${(10-Math.max(-1,u)*10).toFixed(2)}`)}return`M${a.join("L")}L${i.reverse().join("L")}Z`}function qh(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((i,o)=>a.append(_h(n,o,t))),n.append(a),n.addEventListener("keydown",i=>{i.key==="Escape"&&Un(n)}),Tl(n,e),n}function _h(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let i=document.createElement("span");i.className="nc-padgrid-pad-bar",i.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let u=document.createElementNS(yo,"svg");u.setAttribute("class","nc-padgrid-pad-wave"),u.setAttribute("viewBox","0 0 100 20"),u.setAttribute("preserveAspectRatio","none"),u.setAttribute("aria-hidden","true");let d=document.createElementNS(yo,"path");return u.append(d),a.append(i,o,s,l,u),jh(e,a,t,n),o.addEventListener("dblclick",()=>{let c=n(e);c?.type==="padGrid"&&c.onRename&&a.dataset.empty!=="true"&&Ml(e,a,t,n)}),a.addEventListener("dragstart",c=>{if(a.dataset.empty==="true"||!c.dataTransfer){c.preventDefault();return}c.dataTransfer.setData(zn,String(t)),c.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",c=>{let p=c.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(zn)||(c.preventDefault(),c.stopPropagation(),c.dataTransfer&&(c.dataTransfer.dropEffect=p.includes(zn)&&!c.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",c=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let h=c.dataTransfer?.getData(zn);if(h!==void 0&&h!==""){c.preventDefault(),c.stopPropagation();let b=Number(h);b!==t&&p.onMove?.(b,t,c.altKey);return}let g=c.dataTransfer?.files?.[0];g&&(c.preventDefault(),c.stopPropagation(),p.onFile?.(t,g))}),a}function Bh(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function jh(e,t,n,a){let i=0,o=!1,s=0,l=0,u=()=>{window.clearTimeout(i),i=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;o=!1,s=d.clientX,l=d.clientY,u();let c=a(e);c?.type==="padGrid"&&(c.onDown?.(n),!(c.onDown&&d.pointerType==="mouse")&&(i=window.setTimeout(()=>{i=0,o=wo(e,t,n,a)},450)))}),t.addEventListener("pointermove",d=>{i&&Math.hypot(d.clientX-s,d.clientY-l)>8&&u()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,u);t.addEventListener("contextmenu",d=>{d.preventDefault(),u(),o=wo(e,t,n,a)}),t.addEventListener("click",()=>{if(o){o=!1;return}Bh(e,n,a)})}function wo(e,t,n,a){let i=a(e);if(i?.type!=="padGrid"||!i.menu)return!1;let o=i.menu(n);if(!o.length)return!1;Un(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),Un(e)}),s.addEventListener("click",c=>c.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let c of o){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=c.id,p.textContent=c.label,p.addEventListener("click",()=>{Un(e);let h=a(e);h?.type==="padGrid"&&(c.id==="rename"&&h.onRename?Ml(e,t,n,a):h.onMenu?.(n,c.id))}),l.append(p)}e.append(s,l);let u=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-u.left}px`,l.style.top=`${d.bottom-u.top}px`,l.querySelector("button")?.focus(),!0}function Ml(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let i=a(e);if(i?.type!=="padGrid")return;let o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=i.nameMax??24,o.value=i.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.top-s.top}px`,o.style.width=`${l.width}px`;let u=!1,d=c=>{if(u)return;u=!0;let p=o.value.trim();o.remove(),t.focus();let h=a(e);c&&p&&h?.type==="padGrid"&&h.onRename?.(n,p)};o.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"?d(!0):c.key==="Escape"&&d(!1)}),o.addEventListener("blur",()=>d(!0));for(let c of["pointerdown","click","dblclick"])o.addEventListener(c,p=>p.stopPropagation());e.append(o),o.focus(),o.select()}function Un(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function Tl(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,i)=>{let o=n[i];if(!(o instanceof HTMLButtonElement))return;let s=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),u=o.querySelector(".nc-padgrid-pad-wave path"),d=o.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=a.empty?"":a.badge??""),o.draggable=!a.empty,a.empty?(o.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),u?.setAttribute("d","")):(delete o.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=""),u?.setAttribute("d",Ih(a.peaks))),a.lane?o.dataset.ncLane=String(a.lane):delete o.dataset.ncLane;let c=t.selected===i;c?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",c?"true":"false"),a.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",a.empty?`Pad ${i+1}, empty: load a sample`:`Pad ${i+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${c?", selected":""}`)})}function ge(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function ka(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let i=document.createElement("span");return i.className="nc-readout",i.dataset.ncReadout="",n.append(a,i),n}function vo(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function bn(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Hh=450,xo=8;function Te(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Uh(e){let t=Pp(e,"target-min");return t>0?t:44}function Vh(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=Uh(e),a=n/2,i=t.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<t.length;o++){let s=t[o],l=i[o];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let u=l.left+l.width/2,d=l.top+l.height/2,c=u-a,p=u+a,h=d-a,g=d+a;for(let b=0;b<t.length;b++){if(o===b)continue;let y=i[b];if(!y||y.width===0)continue;let f=y.left+y.width/2,w=y.top+y.height/2;Math.abs(w-d)<a*2&&(f>u?p=Math.min(p,(u+f)/2):f<u&&(c=Math.max(c,(u+f)/2))),Math.abs(f-u)<a*2&&(w>d?g=Math.min(g,(d+w)/2):w<d&&(h=Math.max(h,(d+w)/2)))}c=Math.min(c,l.left),p=Math.max(p,l.right),h=Math.min(h,l.top),g=Math.max(g,l.bottom),s.style.left=`${c-l.left}px`,s.style.top=`${h-l.top}px`,s.style.width=`${Math.max(0,p-c)}px`,s.style.height=`${Math.max(0,g-h)}px`,s.style.transform="none"}}function Ll(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function $o(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function It(e,t){switch(e.type){case"slider":return Gh(e,t);case"select":return Yh(e,t);case"toggle":return Kh(e,t);case"button":return Xh(e,t);case"readout":return Jh(e);case"label":return tf(e);case"note":return ko(e);case"knob":return rf(e,t);case"choice":return of(e,t);case"slotRow":return sf(e,t);case"stepGrid":return uf(e,t);case"canvas":return mf(e);case"fx":return kf(e,t);case"eqGraph":return hh(e,t);case"group":return Oh(e,t,It);case"strip":return gf(e,t);case"stripAdd":return wf(e,t);case"padGrid":return qh(e,t);case"moves":return Zh(e,t);default:return ko({id:"unknown",text:""})}}function Le(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Fl(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(Cl(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let i=e.querySelector("[data-nc-readout]");i&&(i.textContent=t.valueText??bn(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),vo(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")vo(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&nt(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&nf(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??bn(t.value))}else if(t.type==="choice")zl(e,t);else if(t.type==="slotRow")Dl(e,t);else if(t.type==="stepGrid")$i(e,t);else if(t.type==="padGrid")Tl(e,t);else if(t.type==="moves")Nl(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&ll(n,t)}else if(t.type==="eqGraph")ul(e,t);else if(t.type==="strip"){ql(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${Nt(n.id)}"]`);a instanceof Element&&Le(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Ol(e,t);else if(t.type==="group"){Al(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${Nt(n.id)}"]`);a instanceof Element&&Le(a,n)}}else if(t.type==="fx"){Yl(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${Nt(n.id)}"]`);a instanceof Element&&Le(a,n)}}}}function Gh(e,t){let n=ka(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let i=$a(e.taper,e.min,e.max);a.min=String(i?0:e.min),a.max=String(i?1e3:e.max),a.step=String(i?1:e.step),i&&(a.dataset.ncTaper=e.taper),a.value=String(Cl(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let o=l=>i?ci(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(o(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(o(l))}),i&&a.addEventListener("keydown",l=>{let u=t(a);if(u?.type!=="slider"||a.disabled)return;let d=u.taper??e.taper,c=sl(d,u.min,u.max,u.value,l.key,l.shiftKey,u.step);c!==null&&(l.preventDefault(),a.value=String(Vi(d,u.min,u.max,c)),u.onChange(c),u.onCommit?.(c))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(Wh(e,a,t),s),n.append(ge()),Le(n,e),n}function Cl(e){return $a(e.taper,e.min,e.max)?Vi(e.taper,e.min,e.max,e.value):e.value}function Wh(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(Te());let i=o=>{let s=n(t);s?.type==="slider"&&s.onTap?.(o)};return a.addEventListener("pointerdown",o=>{o.button===0&&i(o.timeStamp)}),a.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),i(o.timeStamp))}),a}function Yh(e,t){let n=ka(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let i=null;for(let o of e.options){let s=document.createElement("option");s.value=o.value,s.textContent=o.label,o.disabled&&(s.disabled=!0),o.group?i?.getAttribute("label")!==o.group&&(i=document.createElement("optgroup"),i.setAttribute("label",o.group),a.append(i)):i=null,(i??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let o=t(a);o?.type==="select"&&o.onChange(a.value)}),n.append(a,ge()),n}function Kh(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(ge()),Le(n,e),n}function Xh(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let o=t(n);o?.type==="button"&&o.onPress()}),n.append(ge()),Le(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let i=document.createElement("button");return i.type="button",i.className="nc-sparkle-btn",i.dataset.ncSparkle=e.id,i.setAttribute("aria-label","Surprise me"),i.title=e.sparkleTitle??"Surprise me",i.innerHTML=Ll(),i.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&Rl(o);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,i),a}function Jh(e){let t=ka(e.id,e.label);return t.append(ge()),Le(t,e),t}var Qh=450;function Zh(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let i=document.createElement("div");i.className="nc-moves-row",i.setAttribute("role","group"),i.setAttribute("aria-label",a.label),a.title&&(i.title=a.title);let o=document.createElement("span");o.className="nc-moves-label",o.setAttribute("aria-hidden","true"),o.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let u=document.createElement("button");u.type="button",u.className="nc-moves-btn",u.dataset.ncMove=l.id,u.title=l.title??l.text,u.setAttribute("aria-label",`${a.label} ${l.text}`),u.append(ef(l.icon)),u.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),s.append(u)}i.append(o,s),n.append(i)}return Nl(n,e),n}function Nl(e,t){for(let n of t.groups)for(let a of n.moves){let i=e.querySelector(`[data-nc-move="${Nt(a.id)}"]`);i instanceof HTMLButtonElement&&(i.disabled=a.disabled===!0)}}function ef(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function tf(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(ge()),t}function ko(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(ge()),t}function Eo(e){if(typeof e.valueText=="string")return e.valueText;let t=bn(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Fl(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function nf(e,t){let n=Ui(t.taper,t.min,t.max,t.value);Fl(e,t.modulated===!0);let a=Math.round(n*270);e.style.setProperty("--knob-turn",String(a)),t.bipolar&&(e.style.setProperty("--knob-from",String(Math.min(a,135))),e.style.setProperty("--knob-to",String(Math.max(a,135)))),e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",Eo(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${Eo(t)}`}function af(e,t){if($a(e.taper,e.min,e.max))return sl(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,i=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+i:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-i:null}function rf(e,t){let n=ka(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let i=document.createElement("i");i.className="nc-knob-mark",a.append(i);let o=0,s=0;a.addEventListener("pointerdown",d=>{o=d.clientY;let c=t(a);s=c&&"value"in c?Number(c.value):0,a.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",d=>{if(a.hasPointerCapture&&!a.hasPointerCapture(d.pointerId))return;let c=t(a);if(c?.type!=="knob")return;if($a(c.taper,c.min,c.max)){let g=Ui(c.taper,c.min,c.max,s)-(d.clientY-o)/120;c.onChange(rl(c.taper,c.min,c.max,g));return}let p=c.max-c.min||1,h=Math.min(c.max,Math.max(c.min,s-(d.clientY-o)*p/120));c.onChange(h)}),a.addEventListener("dblclick",()=>{let d=t(a);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),a.addEventListener("keydown",d=>{let c=t(a);if(c?.type!=="knob")return;let p=af(c,d);p!==null&&(d.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,p))))});let u=n.querySelector("[data-nc-readout]");return n.insertBefore(a,u),n.append(ge()),Le(n,e),n}function of(e,t){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label);for(let a of e.options){let i=document.createElement("button");i.type="button",i.className="nc-choice",i.dataset.ncChoice=a.value,i.setAttribute("role","tab"),i.textContent=a.label,i.addEventListener("click",()=>{let o=t(n);o?.type==="choice"&&o.onChange(a.value)}),i.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(i),u=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")u=(l+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")u=(l-1+s.length)%s.length;else if(o.key==="Home")u=0;else if(o.key==="End")u=s.length-1;else return;let d=s[u];d instanceof HTMLButtonElement&&(o.preventDefault(),d.focus(),d.click())}),n.append(i)}return n.append(ge()),zl(n,e),n}function zl(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function sf(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let c=0;c<e.slots.length;c++){let p=e.slots[c],h=document.createElement("span");h.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(c),g.textContent=p.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",h.append(g,Te()),lf(h,g,n,c,t),a.append(h)}let i=e.onSparkle?document.createElement("button"):null;i&&(i.type="button",i.className="nc-sparkle",i.setAttribute("aria-label","Surprise me"),i.innerHTML=Ll(),i.append(Te()),i.addEventListener("click",()=>{Rl(n);let c=t(n);c?.type==="slotRow"&&c.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let c=t(n);c?.type==="slotRow"&&c.onMorph(Number(l.value))});let u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",o.append(s,u,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(a,...i?[i]:[]),n.append(d,o,ge()),Pl(n,t),Dl(n,e),n}function So(e,t,n,a){let i=n(e);if(i?.type!=="slotRow")return;en(e);let o=a.shiftKey?"store":a.altKey?"clear":"recall";i.onSlot(t,o)}function lf(e,t,n,a,i){let o=0,s=0,l=0,u=!1,d=!1,c=!1,p=!1,h=()=>{window.clearTimeout(o),o=0},g=w=>{let m=w.clientX-s,$=w.clientY-l;m*m+$*$>xo*xo&&(u=!0,h())},b=()=>{p&&(p=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",f))},y=w=>{let m=o!==0&&!u&&!d;h(),b(),m&&(c=!0,So(n,a,i,w))},f=()=>{u=!0,h(),b()};e.addEventListener("pointerdown",w=>{w.button===0&&(b(),d=!1,u=!1,c=!1,s=w.clientX,l=w.clientY,h(),o=window.setTimeout(()=>{o=0,!u&&(d=!0,cf(n,t,a,i))},Hh),p=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",f))}),e.addEventListener("contextmenu",w=>w.preventDefault()),e.addEventListener("click",w=>{if(c||d||u){c=!1,d=!1,u=!1;return}So(n,a,i,w)})}function Pl(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=Ao("Save","store"),i=Ao("Clear","clear");n.append(a,i);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),en(e)}),o.addEventListener("click",s=>s.stopPropagation()),e.append(o,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let u=t(e);if(u?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(u.onSlot(d,"store"),en(e)):l.dataset.ncSlotOp==="clear"&&(u.onSlot(d,"clear"),en(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&en(e)})}function Ao(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function cf(e,t,n,a){Pl(e,a);let i=e.querySelector(".nc-slot-menu");if(!(i instanceof HTMLElement))return;let o=e.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),i.hidden=!1,i.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-s.left}px`,i.style.top=`${l.bottom-s.top}px`,i.querySelector("button")?.focus()}function en(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Dl(e,t){for(let i of e.querySelectorAll("[data-nc-slot]")){if(!(i instanceof HTMLButtonElement))continue;let o=Number(i.dataset.ncSlot),s=t.slots[o];if(!s)continue;i.textContent=s.label,s.filled?i.dataset.filled="true":delete i.dataset.filled,s.active?i.dataset.active="true":delete i.dataset.active,s.edited?i.dataset.edited="true":delete i.dataset.edited,s.queued?i.dataset.queued="true":delete i.dataset.queued,s.queued&&s.pulse?i.dataset.pulse="true":delete i.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];i.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function Rl(e){let t=e.dataset.ncLastFill||null,n=wp(t);e.dataset.ncLastFill=n;let a=vp(n);if(a)for(let[i,o]of Object.entries(a))e.style.setProperty(i,o)}function df(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,i=o=>{if(a===o)return;a=o,n.setAttribute("aria-pressed",o?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),i(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>i(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||i(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),i(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function uf(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let i=f=>{let w=document.createElement("button");return w.type="button",w.setAttribute("role","radio"),w.textContent=f,a.append(w),w},o=i("Note"),s=i("Accent");s.dataset.ncAccentMode="";let l=f=>{for(let w of[o,s]){let m=w===f;w.setAttribute("aria-checked",m?"true":"false"),w.tabIndex=m?0:-1}};l(o);for(let f of[o,s])f.addEventListener("click",()=>l(f));a.addEventListener("keydown",f=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(f.key))return;f.preventDefault();let w=s.getAttribute("aria-checked")==="true"?o:s;l(w),w.focus()});let u=document.createElement("div");if(u.className="nc-step-tools",u.append(a),e.onFill&&u.append(df(n,t)),e.onClear){let f=document.createElement("button");f.type="button",f.className="nc-fill nc-clear",f.dataset.ncClear="",f.textContent=e.clearLabel??"Clear",f.title="Clear every step (Undo takes it back)",f.addEventListener("click",()=>{let w=t(n);w?.type==="stepGrid"&&w.onClear?.()}),u.append(f)}n.append(u);for(let f of e.rows){let w=document.createElement("div");w.className="nc-row",w.dataset.ncRow="";let m=document.createElement("button");m.type="button",m.className="nc-name",m.textContent=f.label,m.setAttribute("aria-label",`Select ${f.label}`),f.lane&&(m.dataset.ncLane=String((f.lane-1)%4+1));let $=!1,T=0;m.addEventListener("pointerdown",x=>{$=!1,!(x.pointerType==="mouse"||x.button!==0)&&(T=window.setTimeout(()=>{let A=t(n);A?.type!=="stepGrid"||!A.selectedRows||($=!0,A.onSelectRow?.(A.rows.findIndex(E=>E.id===f.id),!0))},Qh))});for(let x of["pointerup","pointercancel","pointerleave"])m.addEventListener(x,()=>window.clearTimeout(T));m.addEventListener("contextmenu",x=>{$&&x.preventDefault()}),m.addEventListener("click",x=>{let A=t(n);if(A?.type!=="stepGrid")return;if($){$=!1;return}let E=A.rows.findIndex(N=>N.id===f.id),L=!!A.selectedRows&&(x.shiftKey||x.metaKey||x.ctrlKey);A.onSelectRow?.(E,L)}),m.addEventListener("keydown",x=>pf(n,m,x));let S=[];for(let x of["mute","solo"]){if(!(x==="mute"?e.onMute:e.onSolo))continue;let A=document.createElement("span");A.className="nc-ms-wrap";let E=document.createElement("button");E.type="button",E.className="nc-ms",E.dataset.ncMs=x,E.textContent=x==="mute"?"M":"S",E.setAttribute("aria-label",`${x==="mute"?"Mute":"Solo"} ${f.label}`),A.append(E,Te()),A.addEventListener("click",()=>{let L=t(n);if(L?.type!=="stepGrid")return;let N=L.rows.findIndex(q=>q.id===f.id);(x==="mute"?L.onMute:L.onSolo)?.(N)}),S.push(A)}let v=document.createElement("div");v.className="nc-steps";for(let x=0;x<f.steps.length;x++){let A=document.createElement("span");A.className="nc-step-wrap";let E=document.createElement("button");E.type="button",E.className="nc-step",E.dataset.ncStep=`${f.id}:${x}`,E.setAttribute("aria-label",`${f.label} step ${x+1}`),A.append(E,Te()),A.addEventListener("click",L=>{let N=t(n);if(N?.type!=="stepGrid")return;let q=N.rows.findIndex(V=>V.id===f.id),_=s.getAttribute("aria-checked")==="true";N.onToggle(q,x,L.shiftKey||_)}),v.append(A)}if(e.onLength&&v.append(hf(n,v,f,t)),w.append(...S,m,v),e.onDice){let x=document.createElement("button");x.type="button",x.className="nc-sparkle nc-row-dice",x.dataset.ncDice=f.id,x.setAttribute("aria-label",`Re-roll ${f.label}`),x.title=`Re-roll ${f.label}: new steps for this lane (Undo takes it back)`,x.innerHTML=$o(),x.append(Te()),x.addEventListener("click",()=>{let A=t(n);A?.type==="stepGrid"&&A.onDice?.(A.rows.findIndex(E=>E.id===f.id))}),w.append(x)}w.addEventListener("click",x=>{if(x.target!==w)return;let A=t(n);A?.type==="stepGrid"&&A.onSelectRow?.(A.rows.findIndex(E=>E.id===f.id))}),Mo(n,v,".nc-step-wrap",t,s,()=>f.id),n.append(w)}let d=document.createElement("div");d.className="nc-pads-head";let c=(f,w,m)=>{let $=document.createElement("button");return $.type="button",$.className=f,$.textContent=w,m&&$.setAttribute("aria-label",m),$},p=c("nc-pads-step","‹","Previous lane"),h=c("nc-pads-step","›","Next lane"),g=document.createElement(e.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),e.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let f=t(n);f?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",$i(n,f))}));for(let[f,w]of[[p,-1],[h,1]])f.addEventListener("click",()=>{let m=t(n);if(m?.type!=="stepGrid"||m.rows.length===0)return;let $=m.rows.length;m.onSelectRow?.(((Pn(m)+w)%$+$)%$)});if(d.append(p,g,h),e.onDice){let f=c("nc-pads-step nc-pads-dice","","Re-roll lane");f.dataset.ncPadsDice="",f.innerHTML=$o(),f.addEventListener("click",()=>{let w=t(n);if(w?.type!=="stepGrid")return;let m=Pn(w);m>=0&&w.onDice?.(m)}),d.append(f)}if(e.transport){let f=c("nc-pads-play","Play");f.dataset.ncPadsPlay="",f.addEventListener("click",()=>{let w=t(n);w?.type==="stepGrid"&&w.transport?.onToggle()}),d.append(f)}n.append(d);let b=document.createElement("div");b.className="nc-pads",b.setAttribute("role","group");let y=Math.max(0,...e.rows.map(f=>f.steps.length));for(let f=0;f<y;f++){let w=document.createElement("button");w.type="button",w.className="nc-pad",w.dataset.ncPad=String(f),w.textContent=String(f+1),w.addEventListener("click",m=>{let $=t(n);if($?.type!=="stepGrid")return;let T=Pn($);if(T<0)return;if(n.dataset.ncLenMode==="true"){$.onLength?.(T,f+1);return}let S=s.getAttribute("aria-checked")==="true";$.onToggle(T,f,m.shiftKey||S)}),b.append(w)}return Mo(n,b,".nc-pad",t,s,()=>{let f=t(n);return f?.type==="stepGrid"?f.rows[Pn(f)]?.id:void 0}),n.append(b),n.append(ge()),$i(n,e),n}function Pn(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function Mo(e,t,n,a,i,o){let s="on",l=!0,u=-1,d=(c,p)=>{let h=c.rows[u]?.steps[p];!h||p>=c.rows[u].length||(c.onSet?c.onSet(u,p,s,l):!!h[s]!==l&&c.onToggle(u,p,s==="accent"))};Ph(t,n,c=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(c.kind!=="paint")return;let h=p.rows.findIndex(g=>g.id===o());h>=0&&p.rows[h].length!==c.pad+1&&p.onLength?.(h,c.pad+1);return}if(c.kind==="paint"){if(c.phase==="start"){let h=o();u=p.rows.findIndex(b=>b.id===h);let g=p.rows[u]?.steps[c.pad];if(!g)return;s=i.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[s]}d(p,c.pad)}else if(c.kind==="long"){let h=o(),g=p.rows.findIndex(y=>y.id===h),b=t.querySelectorAll(n)[c.pad];g>=0&&b instanceof HTMLElement&&p.onLongPress?.(g,c.pad,b)}}})}function pf(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],i=a.indexOf(t),o=i;n.key==="ArrowDown"?o=i+1:n.key==="ArrowUp"?o=i-1:n.key==="Home"?o=0:o=a.length-1;let s=a[o];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function hf(e,t,n,a){let i=document.createElement("button");i.type="button",i.className="nc-len-handle",i.dataset.ncLen=n.id,i.setAttribute("role","slider"),i.setAttribute("aria-valuemin","1"),i.setAttribute("aria-valuemax",String(n.steps.length)),i.append(Te());let o=d=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.findIndex(b=>b.id===n.id),h=c.rows[p];if(!h)return;let g=Math.max(1,Math.min(h.steps.length,d));g!==h.length&&c.onLength?.(p,g)},s=d=>{let c=[...t.querySelectorAll(".nc-step")],p=1;return c.forEach((h,g)=>{let b=h.getBoundingClientRect();b.width>0&&d>=b.left+b.width/2&&(p=g+1)}),p},l=d=>o(s(d.clientX)),u=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete i.dataset.dragging};return i.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),i.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),i.addEventListener("keydown",d=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.find(g=>g.id===n.id);if(!p)return;let h={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};d.key in h&&(d.preventDefault(),o(h[d.key]))}),i}var Ha=new WeakMap,Dn=new WeakMap;function ff(e){return e?(Dn.has(e)||(Dn.set(e,aa(e)),Ys(t=>{Dn.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))xi(n,Number(n.getAttribute("data-nc-velocity")))},e)),Dn.get(e)):"light"}function xi(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:ff(e.ownerDocument),i=n===null?null:`${a} ${n}`;if(!(Ha.has(e)&&Ha.get(e)===i)){if(Ha.set(e,i),n===null){for(let o of Object.keys(ao(1)))e.style.removeProperty(o);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[o,s]of Object.entries(ao(n,no[a]??no.light)))e.style.setProperty(o,s)}}function $i(e,t){let n=t.rows.some(c=>c.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let i=e.querySelector(".nc-pads"),o=t.rows.find(c=>c.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&o&&(s.textContent=l?`${o.label} · ${o.length}`:o.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let u=e.querySelector("[data-nc-pads-dice]");u instanceof HTMLElement&&o&&(u.setAttribute("aria-label",`Re-roll ${o.label}`),u.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let c=!!t.transport?.playing,p=t.transport?.label??(c?"Stop":"Play");d.textContent!==p&&(d.textContent=p),d.setAttribute("aria-pressed",c?"true":"false");let h=t.transport?.ariaLabel;h?d.setAttribute("aria-label",h):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&o){i.setAttribute("aria-label",`${o.label} steps`),o.lane&&(i.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?i.dataset.silent="true":delete i.dataset.silent;let c=o.length>0?(t.playhead%o.length+o.length)%o.length:-1;for(let p of i.querySelectorAll("[data-nc-pad]")){let h=Number(p.getAttribute("data-nc-pad")),g=o.steps[h];p instanceof HTMLButtonElement&&(p.hidden=!g||!l&&h>=o.length,l&&h>=o.length?p.dataset.out="true":delete p.dataset.out,l&&h===o.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${o.label} step ${h+1}`),p.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?p.dataset.accent="true":delete p.dataset.accent,g?.dim?p.dataset.dim="true":delete p.dataset.dim,xi(p,g?.velocity),t.playhead>=0&&h===c?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let c of t.rows){for(let g=0;g<c.steps.length;g++){let b=c.steps[g],y=e.querySelector(`[data-nc-step="${c.id}:${g}"]`);if(!(y instanceof HTMLButtonElement))continue;let f=y.closest(".nc-row");if(f instanceof HTMLElement){t.selectedRow===c.id?f.dataset.selected="true":delete f.dataset.selected;let $=t.selectedRow!==c.id&&(t.selectedRows??[]).includes(c.id);$?f.dataset.picked="true":delete f.dataset.picked;let T=f.querySelector(".nc-name");T instanceof HTMLElement&&(T.setAttribute("aria-pressed",t.selectedRow===c.id||$?"true":"false"),T.textContent!==c.label&&(T.textContent=c.label,T.setAttribute("aria-label",`Select ${c.label}`))),c.mute||n&&!c.solo?f.dataset.silent="true":delete f.dataset.silent;for(let S of f.querySelectorAll("[data-nc-ms]")){let v=S.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;S.setAttribute("aria-pressed",v?"true":"false")}}y.setAttribute("aria-pressed",b.on?"true":"false"),b.accent?y.dataset.accent="true":delete y.dataset.accent,b.dim?y.dataset.dim="true":delete y.dataset.dim,g%4===0?y.dataset.bar="true":delete y.dataset.bar,typeof b.velocity=="number"?(y.dataset.velocity="true",y.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,b.velocity))*100)}%`)):(delete y.dataset.velocity,y.style.removeProperty("--level")),xi(y,b.velocity);let w=t.playhead>=0&&c.length>0?(t.playhead%c.length+c.length)%c.length:-1;g===w?y.dataset.playhead="true":delete y.dataset.playhead;let m=!!t.onLength&&t.selectedRow===c.id;y.hidden=g>=c.length&&!m,g>=c.length&&m?y.dataset.out="true":delete y.dataset.out}let p=e.querySelector(`[data-nc-len="${c.id}"]`),h=e.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&h&&h.nextElementSibling!==p){let g=document.activeElement===p;h.after(p),g&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(c.length)),p.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),p.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function mf(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,ge()),t}function gf(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let i=document.createElement("span");i.className="nc-strip-name",i.dataset.ncStripName="";let o=!e.master&&typeof e.onFold=="function",s=null;o&&(n.dataset.ncFoldable="",s=Hl(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let m=t(n);m?.type==="strip"&&(m.onFold?.(m.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(i);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let m=document.createElement("span");m.className="nc-strip-grip-dots",m.setAttribute("aria-hidden","true"),l.append(m),l.addEventListener("keydown",$=>{if($.key!=="ArrowLeft"&&$.key!=="ArrowRight"||$.ctrlKey||$.metaKey||$.shiftKey)return;let T=t(n);T?.type==="strip"&&($.preventDefault(),T.onMove?.($.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>Co(n,l,t))),!e.master&&typeof e.onShade=="function"&&a.addEventListener("contextmenu",m=>{m.pointerType==="touch"||m.pointerType==="pen"||m.target instanceof Element&&m.target.closest("input, .nc-strip-remove")||(m.preventDefault(),Co(n,a,t,{x:m.clientX,y:m.clientY}))}),e.onRemove){let m=document.createElement("button");m.type="button",m.className="nc-strip-remove",m.dataset.ncStripRemove="",m.textContent="×",m.addEventListener("click",()=>{let $=t(n);$?.type==="strip"&&$.onRemove?.(m)}),a.append(m)}let u=document.createElement("div");if(u.className="nc-strip-hacks",e.onHacks){let m=document.createElement("span");m.className="nc-hacks-wrap";let $=document.createElement("button");$.type="button",$.className="nc-hacks",$.dataset.ncHacks="",m.append($,Te()),m.addEventListener("click",()=>{let T=t(n);T?.type==="strip"&&T.onHacks?.()}),u.append(m)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let m=document.createElement("span");m.className="nc-hacks-wrap nc-sends-view-wrap";let $=document.createElement("button");$.type="button",$.className="nc-hacks nc-sends-view",$.dataset.ncSendsView="",m.append($,Te()),m.addEventListener("click",()=>{let T=t(n);T?.type==="strip"&&T.onSendsView?.()}),d.append(m)}for(let m of["mute","solo"]){if(!(m==="mute"?e.onMute:e.onSolo))continue;let $=document.createElement("span");$.className="nc-ms-wrap";let T=document.createElement("button");T.type="button",T.className="nc-ms",T.dataset.ncMs=m,T.textContent=m==="mute"?"M":"S",$.append(T,Te()),$.addEventListener("click",()=>{let S=t(n);S?.type==="strip"&&(m==="mute"?S.onMute:S.onSolo)?.()}),d.append($)}let c=document.createElement("div");c.className="nc-strip-sends";for(let m of e.sends??[])c.append(It({...m,type:"knob",compact:!0},t));let p=document.createElement("div");p.className="nc-strip-pan",e.pan&&p.append(It(Qi(e),t));let h=document.createElement("div");h.className="nc-strip-body";let g=document.createElement("span");g.className="nc-scale",g.setAttribute("aria-hidden","true");for(let m of e.ticks??[]){let $=document.createElement("span");$.className="nc-scale-tick",$.style.setProperty("--tick-pos",String(m.value)),$.textContent=m.label,g.append($)}let b=jp({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:m=>{let $=t(n);$?.type==="strip"&&$.onChange(m)},onReset:()=>{let m=t(n);m?.type==="strip"&&Lo(m)}}),y=Yp({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let m=t(n);m?.type==="strip"&&m.onClipClear?.()}});if(h.append(g,b.el,y.el),o){let m=document.createElement("button");m.type="button",m.className="nc-ui-fx-fold nc-strip-fold",m.dataset.ncStripFold="",m.setAttribute("aria-expanded","false");let $=document.createElement("span");$.className="nc-strip-fold-cap",$.setAttribute("aria-hidden","true");let T=document.createElement("span");T.className="nc-ui-fx-fold-name",T.dataset.ncStripFoldName="";let S=document.createElement("span");S.className="nc-strip-fold-pan",S.setAttribute("aria-hidden","true"),S.hidden=!e.pan,m.append($,S,T),m.addEventListener("click",()=>{let v=t(n);if(v?.type!=="strip")return;v.onFold?.(!1);let x=n.querySelector("[data-nc-strip-hide]");x instanceof HTMLElement&&x.focus()}),h.prepend(m)}let f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let w=0;return f.addEventListener("click",m=>{let $=t(n);$?.type!=="strip"||!$.onTypeIn||(window.clearTimeout(w),m.detail===0?To(n,f,t):m.detail===1&&(w=window.setTimeout(()=>To(n,f,t),yf)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(w);let m=t(n);m?.type==="strip"&&Lo(m)}),s&&n.append(s),l&&n.append(l),n.append(a,u,d,c,p,h,f,ge()),ql(n,e),n}function Qi(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??bf(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function bf(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var yf=250;function To(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let i=document.createElement("input");i.type="text",i.className="nc-strip-db-input",i.inputMode="decimal",i.spellcheck=!1,i.autocomplete="off",i.value=a.valueText??bn(a.value),i.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(i),i.focus(),i.select?.();let o=!1,s=l=>{if(o)return;o=!0;let u=i.value;if(i.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(u)}t.focus?.()};i.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),i.addEventListener("blur",()=>s(!1))}function wf(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-strip-add-plus",i.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",a.append(i,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),u=s.value;Il(s),l?.type==="stripAdd"&&u&&l.onAdd(u)}),n.append(a,s,ge()),Ol(n,e),n}function Ol(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let i=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],o=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=i.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==s&&(a.replaceChildren(...i.map(l=>{let u=document.createElement("option");return u.value=l.value,u.textContent=l.label,u.disabled=l.disabled===!0,u})),Il(a))}function Il(e){let t=e.options[0];t&&(t.selected=!0)}function Lo(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function ql(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let i=e.querySelector(".nc-fader"),o=i?Hp(i):void 0;o&&(o.configure({step:t.step}),o.set(t.value),o.setText(t.valueText),o.setLabel(`${t.label} level`)),il(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let b=t.valueText??bn(t.value);s.textContent!==b&&(s.textContent=b),s.setAttribute("aria-label",`${t.label} level ${b}`);let y=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${y}`:y}for(let b of e.querySelectorAll("[data-nc-ms]")){let y=b.getAttribute("data-nc-ms"),f=y==="mute"?t.mute===!0:t.solo===!0;b.setAttribute("aria-pressed",f?"true":"false"),b.setAttribute("aria-label",`${y==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let b=t.hacksLabel??"Hacks";l.textContent!==b&&(l.textContent=b),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${b}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let u=e.querySelector("[data-nc-sends-view]");if(u){let b=t.sendsViewLabel??"Sends";u.textContent!==b&&(u.textContent=b),u.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),u.setAttribute("aria-label",`${b}: ${t.sendsView===!0?"hide":"show"} the send effects`),u.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),nt(u,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let c=_l(t);if(c?e.dataset.ncShade=String(c):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let b=e.querySelector(`.nc-strip-pan [data-nc-id="${Nt(t.pan.id)}"]`);b&&Le(b,Qi(t))}let p=!t.master&&typeof t.onFold=="function"&&t.folded===!0;p?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let h=e.querySelector("[data-nc-strip-hide]");h instanceof HTMLElement&&(Ul(h,p,t.label),nt(h,t.foldHelp));let g=e.querySelector("[data-nc-strip-fold]");if(g instanceof HTMLElement){g.hidden=!p,g.setAttribute("aria-label",`Expand ${t.label}`);let b=g.querySelector("[data-nc-strip-fold-name]");b&&b.textContent!==t.label&&(b.textContent=t.label),nt(g,t.foldedHelp??t.foldHelp)}}function _l(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=Bl?t:0}var Bl=8,Rn=null;function Co(e,t,n,a){Rn?.();let i=n(e);if(i?.type!=="strip")return null;let o=e.ownerDocument,s=o.defaultView??globalThis,l=o.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${i.label}: shade and place`);let u=o.createElement("div");u.className="nc-strip-menu-title",u.id=`nc-strip-menu-title-${String(i.id).replace(/[^\w-]/g,"")}`,u.textContent="Shade";let d=o.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",u.id);let c=_l(i),p=e.querySelector("[data-nc-strip-grip]")??t,h=(w=!1)=>{if(Rn!==h)return;Rn=null;let m=l.contains(o.activeElement);l.remove(),o.removeEventListener("keydown",b,!0),o.removeEventListener("pointerdown",y,!0),s.removeEventListener("resize",f),(w||m)&&p?.isConnected&&p.focus?.({preventScroll:!0})},g=[0,...Array.from({length:Bl},(w,m)=>m+1)].map(w=>{let m=o.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.setAttribute("aria-checked",w===c?"true":"false"),m.setAttribute("tabindex",w===c?"0":"-1"),m.dataset.ncShadeChoice=String(w),w===0?(m.textContent="Auto",m.setAttribute("aria-label","Auto: alternate light and dark"),m.title="Auto: alternate light and dark"):(m.textContent=String(w),m.setAttribute("aria-label",`Shade ${w}`),m.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${w})`)),m.addEventListener("click",()=>{let $=n(e);h(!0),$?.type==="strip"&&$.onShade?.(w===0?null:w)}),m});if(d.append(...g),d.addEventListener("keydown",w=>{let m=g.indexOf(o.activeElement);if(m<0)return;let $=-1;w.key==="ArrowRight"||w.key==="ArrowDown"?$=(m+1)%g.length:w.key==="ArrowLeft"||w.key==="ArrowUp"?$=(m-1+g.length)%g.length:w.key==="Home"?$=0:w.key==="End"&&($=g.length-1),!($<0)&&(w.preventDefault(),g[m].setAttribute("tabindex","-1"),g[$].setAttribute("tabindex","0"),g[$].focus())}),l.append(u,d),typeof i.onMove=="function"){let w=[...e.parentElement?.children??[]].filter($=>$.classList?.contains("nc-strip")&&!$.hasAttribute("data-nc-master")),m=w.indexOf(e);for(let[$,T,S]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let v=o.createElement("button");v.type="button",v.className="nc-strip-menu-item",v.dataset.ncStripMove=$<0?"left":"right";let x=o.createElement("span");x.textContent=T;let A=o.createElement("kbd");A.textContent=S,A.setAttribute("aria-hidden","true"),v.append(x,A),v.disabled=$<0?m<=0:m<0||m>=w.length-1,v.addEventListener("click",()=>{let E=n(e);h(!0),E?.type==="strip"&&E.onMove?.($)}),l.append(v)}}o.body.append(l),(()=>{let w=t.getBoundingClientRect?.()??{bottom:0,right:0},m=l.offsetWidth,$=l.offsetHeight,T=s.innerWidth||o.documentElement.clientWidth||m,S=s.innerHeight||o.documentElement.clientHeight||$,v=a?a.x:w.right-m,x=a?a.y:w.bottom+4;v=Math.max(4,Math.min(v,T-m-4)),x+$>S-4&&(x=Math.max(4,(a?a.y:w.top)-$-4)),l.style.left=`${Math.round(v)}px`,l.style.top=`${Math.round(x)}px`})();let b=w=>{if(w.key==="Escape")w.preventDefault(),w.stopPropagation(),h(!0);else if(w.key==="Tab"&&l.contains(o.activeElement)){let m=[...l.querySelectorAll("button:not([disabled])")].filter(T=>T.getAttribute("tabindex")!=="-1"),$=(m.indexOf(o.activeElement)+(w.shiftKey?-1:1)+m.length)%m.length;w.preventDefault(),m[$]?.focus()}},y=w=>{l.contains(w.target)||h(!1)},f=()=>h(!1);return o.addEventListener("keydown",b,!0),o.addEventListener("pointerdown",y,!0),s.addEventListener("resize",f),Rn=h,(g.find(w=>w.getAttribute("tabindex")==="0")??g[0]).focus({preventScroll:!0}),{el:l,close:()=>h(!1)}}function No(e,t){let n=e?.querySelector?.(`.nc-strip[data-nc-id="${Nt(t)}"]`);return il(n?.querySelector(".nc-meter")??void 0)}var ki=typeof ResizeObserver=="function"?new ResizeObserver(vf):null;function vf(e){for(let t of e){if(!t.target.isConnected){ki.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&xf(n)}}function xf(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,i=n instanceof HTMLElement?n.offsetHeight:0,o=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+i+o}px`)}function $f(e){if(ki)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))ki.observe(t)}function kf(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let i=typeof e.onFold=="function",o=!!e.meter,s=typeof e.onRemove=="function";if(e.on===void 0&&!i&&!oa(e)&&!o&&!s)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),o&&l.append(Gl(n,"head")),e.on!==void 0){let u=tl({checked:e.on,labelledBy:a.id,onChange:d=>{let c=t(u.el);c?.type==="fx"&&c.onToggle?.(d)}});u.el.dataset.ncFxSwitch="",l.append(u.el)}i&&l.append(Sf(n,t)),oa(e)&&l.append(Lf(n,t)),s&&l.append(Cf(t)),n.append(l)}i&&n.prepend(Af(n,t)),o&&Wl(n,e);for(let l of e.controls)n.append(It(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let u=document.createElement("summary");u.textContent=e.moreLabel??"More",l.append(u);for(let d of e.more)l.append(It(d,t));n.append(l)}return n.append(ge()),Yl(n,e),$f(n),n}var Ef=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function jl(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&Ef(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function Sf(e,t){let n=Hl();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),jl(e))}),n}function Hl(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Ul(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function Af(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let i=document.createElement("span");i.className="nc-ui-fx-fold-name",i.dataset.ncFxFoldName="";let o=document.createElement("span");return o.className="nc-fold-tri",o.setAttribute("aria-hidden","true"),n.append(o,a,i),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Gl(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),jl(e)}}),n}var qt=new Set;function Vn(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var oa=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"),Mf="(max-width: 768px)";function Tf(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function Lf(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(Tf()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(Vl(e,a,!qt.has(a.id)),n.focus())}),n}function Cf(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function Vl(e,t,n){n?qt.add(t.id):qt.delete(t.id),Zi(e,t)}function Nf(e,t){t?.type==="fx"&&qt.has(t.id)&&Vl(e,t,!1)}function Ff(e){return e.ownerDocument.defaultView?.matchMedia?.(Mf).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Zi(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=oa(t)&&qt.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!oa(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Vn(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Ot(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",nt(n,t.maxHelp)),!a){e.dataset.ncMax&&Fo(e);return}if(!e.isConnected){let s=()=>e.isConnected&&qt.has(t.id)&&Zi(e,t);queueMicrotask(()=>{e.isConnected?s():Vn(e.ownerDocument,s)});return}let i=Ff(e),o=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;o>0&&e.style.setProperty("--nc-fx-dials",String(o)),e.dataset.ncMax!==i&&(e.dataset.ncMax&&Fo(e),e.dataset.ncMax=i,i==="over"&&zf(e,t)),Pf(e.ownerDocument),i==="over"&&er(e),Vn(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Ot(s)})}function Fo(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Vn(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Ot(n)})}function zf(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let i=e.querySelector("[data-nc-fx-max]");i instanceof HTMLElement&&i.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function er(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,i=e.ownerDocument.defaultView,o=Number.parseFloat(i?.getComputedStyle(a).columnGap??"")||0,s=ph(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),o,i?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var zo=new WeakSet;function Pf(e){zo.has(e)||(zo.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(i=>i.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&er(t)}))}var Ei=new WeakMap;function Gl(e,t){let n=Th(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Wl(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let i of n)nt(i,t.meterHelp);let a=Ei.get(e);a?a.set(t.meter):Ei.set(e,Fh(n,t.meter))}function Yl(e,t){(t.meter||Ei.has(e))&&Wl(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let i=typeof t.onFold=="function"&&t.folded===!0;i?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let o=e.querySelector("[data-nc-fx-hide]");o instanceof HTMLElement&&(Ul(o,i,t.title),nt(o,t.foldHelp)),Zi(e,t);let s=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let u=t.removeLabel??`Remove ${t.title}`;s.hidden=i,s.setAttribute("aria-label",u),s.title=u}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let u=t.on===void 0?"":t.on?"On":"Off";l.hidden=!i,l.setAttribute("aria-label",`Expand ${t.title}${u?`, ${u.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=u,d.hidden=u==="");let c=l.querySelector("[data-nc-fx-fold-name]");c&&(c.textContent=t.title),nt(l,t.foldHelp)}}function nt(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Nt(e){return e.replace(/["\\]/g,"\\$&")}function Df(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(i=>i.type==="canvas"&&i.id===n.dataset.ncId);a?.type==="canvas"&&ll(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Ot(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&er(n);Vh(e)}var Rf=et["toast-duration"];function Of({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function If(e,t,n,a){let i=l=>({top:l,bottom:l+n}),o=l=>e.some(u=>u&&u.bottom>l.top&&u.top<l.bottom),s=i(t-a-n);return o(s)?o(i(a))?"bottom":"top":"bottom"}function qf(e,t,n,a,i,o){let s=e.bottom+i,l=Math.max(o,Math.min(e.left,a-o-n.width));for(let u=!0,d=0;u&&d<8;d++){u=!1;for(let c of t)c&&c.bottom>s&&c.top<s+n.height&&c.right>l&&c.left<l+n.width&&(s=c.bottom+i,u=!0)}return{top:s,left:l}}var Po="data-nc-ui-toast-live";function _f(e,t){let n=t.querySelector(`[${Po}]`);return n||(n=e.createElement("div"),n.setAttribute(Po,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function tn({message:e,actionLabel:t,onAction:n,duration:a=Rf,onClose:i,avoid:o=[],anchor:s,host:l,document:u=globalThis.document}={}){l=l??u.body;let d=u.defaultView??globalThis,c=u.createElement("div");c.className="nc-ui-toast",c.setAttribute("data-state","enter");let p=u.createElement("span");p.className="nc-ui-toast-message",p.textContent=e,c.appendChild(p);let h=null;t&&(h=u.createElement("button"),h.type="button",h.className="nc-ui-toast-action",h.textContent=t,c.appendChild(h)),l.appendChild(c);let g="open",b=Z=>Z&&typeof Z.getBoundingClientRect=="function"?Z.getBoundingClientRect():null,y=b(c),f=y?.height||44,w=d.getComputedStyle?.(c),m=Number.parseFloat(w?.getPropertyValue(K("toast-offset")))||16,$=Number.parseFloat(w?.getPropertyValue(K("toast-anchor-gap")))||8,T=b(s),S=d.innerHeight??0,v=o.map(b).filter(Boolean),x=T&&T.bottom>0&&T.top<S?qf(T,v,{width:y?.width||0,height:f},d.innerWidth??0,$,m):null;x&&x.top+f<=S?(c.setAttribute("data-placement","anchor"),c.style.top=`${x.top+(d.scrollY??0)}px`,c.style.left=`${x.left+(d.scrollX??0)}px`):c.setAttribute("data-placement",If(v,S,f,m));let A=d.requestAnimationFrame?.bind(d)??(Z=>setTimeout(Z,16));A(()=>A(()=>{g==="open"&&c.setAttribute("data-state","open")})),_f(u,l).textContent=Of({message:e,actionLabel:t});let E,L,N=new Promise(Z=>{L=Z}),q=Z=>{clearTimeout(E),E=setTimeout(()=>Q("timeout"),Z)},_=a,V=Date.now(),de=()=>{g==="open"&&(clearTimeout(E),_=Math.max(0,_-(Date.now()-V)))},ue=()=>{g==="open"&&(V=Date.now(),q(_))};c.addEventListener("pointerenter",de),c.addEventListener("pointerleave",ue),c.addEventListener("focusin",de),c.addEventListener("focusout",ue),h?.addEventListener("click",()=>{if(g==="open")try{n?.()}finally{Q("action")}}),Number.isFinite(a)&&q(a);function Q(Z="close"){if(g!=="open")return;g="closing",clearTimeout(E),c.setAttribute("data-state","closing"),i?.(Z);let B=d.getComputedStyle?.(c),Ee=B?Math.max(0,...String(B.transitionDuration||"").split(",").map(pe=>Number.parseFloat(pe)*(pe.trim().endsWith("ms")?1:1e3)||0)):0,H=()=>{g!=="gone"&&(g="gone",c.remove(),L(Z))};c.addEventListener("transitionend",H),setTimeout(H,Ee+50)}return{el:c,close:Q,closed:N}}var Do="data-nc-help";function Bf(e,t,n,a=0,i=6,o=8){let s=e.top-i-t.height,l=s>=a+o?"above":"below",u=l==="above"?s:e.bottom+i,d=Math.max(o,Math.min(e.left,n-o-t.width));return{top:Math.round(u),left:Math.round(d),side:l}}var Ua=new WeakMap;function jf(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Hf({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=Ua.get(e);if(n)return n;let a=e.defaultView,i=null,o=null,s,l=()=>{clearTimeout(s),o=null,i&&(i.hidden=!0)},u=h=>{let g=h.getAttribute(Do);if(!g)return;i||(i=e.createElement("div"),i.className="nc-ui-help",i.setAttribute("role","tooltip"),i.dataset.testid="nc-help",i.style.position="fixed",i.style.pointerEvents="none",i.style.zIndex="6",e.body.appendChild(i)),i.textContent=g,i.hidden=!1,i.style.visibility="hidden",i.style.top="0px",i.style.left="0px";let b=h.getBoundingClientRect(),y=Bf(b,{width:i.offsetWidth,height:i.offsetHeight},a.innerWidth,jf(e));i.style.top=`${y.top}px`,i.style.left=`${y.left}px`,i.dataset.side=y.side,i.style.visibility=""},d=h=>{if(h.pointerType==="touch")return;let g=h.target&&h.target.closest?h.target.closest(`[${Do}]`):null;g!==o&&(l(),g&&(o=g,s=setTimeout(()=>{o===g&&g.isConnected&&u(g)},t)))},c=h=>{h.key==="Escape"&&l()};e.addEventListener("pointerover",d),e.addEventListener("pointerdown",l,!0),e.addEventListener("keydown",c),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);let p={hide:l,uninstall(){l(),e.removeEventListener("pointerover",d),e.removeEventListener("pointerdown",l,!0),e.removeEventListener("keydown",c),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),i?.remove(),i=null,Ua.delete(e)}};return Ua.set(e,p),p}var Kl="(max-width: 768px)",Uf='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',Vf='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',Gf=0;function Wf({panel:e,button:t,label:n="Menu",media:a=Kl}){let i=e.ownerDocument,o=i.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++Gf}`);let s=t??i.createElement("button");t||(s.type="button",s.innerHTML=Uf),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function u(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),i.addEventListener("keydown",c,!0),i.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(Vf)].find(f=>!f.hidden&&f.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function d({focus:f}={}){if(!l())return;let w=e.contains(i.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),i.removeEventListener("keydown",c,!0),i.removeEventListener("pointerdown",p,!0),(f??w)&&s.focus?.({preventScroll:!0})}function c(f){f.key==="Escape"&&(f.preventDefault(),f.stopPropagation(),d({focus:!0}))}function p(f){let w=f.target;w instanceof o.Node&&(e.contains(w)||s.contains(w))||d({focus:!1})}let h=()=>l()?d({focus:!0}):u(),g=f=>{let w=f.target,m=w instanceof o.Element?w.closest("button"):null;!m||!e.contains(m)||m.closest("[data-nc-menu-stay]")||d({focus:!0})};s.addEventListener("click",h),e.addEventListener("click",g);let b=o.matchMedia?.(a),y=()=>{b?.matches||d({focus:!1})};return b?.addEventListener?.("change",y),{button:s,panel:e,open:u,close:d,isOpen:l,destroy(){d({focus:!1}),s.removeEventListener("click",h),e.removeEventListener("click",g),b?.removeEventListener?.("change",y)}}}var tr="netcomposer.rhythm.hidden.v1",Re=new WeakMap;function Va(){try{return globalThis.localStorage??null}catch{return null}}function Xl(e,t=tr){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Ro(e,t,n,a=tr){let i=Xl(e,a);n?i.add(t):i.delete(t);try{e?.setItem(a,JSON.stringify([...i]))}catch{}}function nr(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(i=>i.controls)],n=[],a=i=>{if(n.push(i),i.type==="group")for(let o of i.controls)a(o)};for(let i of t)a(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&(n.push(...(i.sends??[]).map(o=>({...o,type:"knob",compact:!0}))),i.pan&&n.push(Qi(i)));return n}function Jl(e,t){if(!(!e||!t))return nr(e).find(n=>n.id===t)}function Yf(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${nr(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Kf(e,t){if(!t.title)return;if(!t.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=t.title,e.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let i=document.createElement("span");i.className="nc-panel-subject",i.dataset.ncPanelSubject="",n.append(a,i),e.append(n),Ql(e,t)}function Ql(e,t){if(!t.panel)return;let n=[...e.children].find(o=>o.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),i=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),i&&(i.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Xf(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=Re.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Jl(n,a)}function Jf(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],i=Yf(t);if(e.dataset.ncSignature===i){for(let o of a){let s=e.querySelector(`[data-nc-section="${Io(o.id)}"]`);s&&Ql(s,o);for(let l of o.controls){let u=e.querySelector(`[data-nc-id="${Io(l.id)}"]`);u instanceof Element&&Le(u,l)}s instanceof HTMLElement&&Si(s,o,n)}return}e.dataset.ncSignature=i,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let o of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=o.id,o.inset&&(s.dataset.ncInset="true"),o.area&&(s.dataset.ncArea=o.area),o.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",o.label)),o.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),o.title&&s.setAttribute("aria-label",o.title)),Kf(s,o);let l=o.panel?document.createElement("div"):s;o.panel&&(l.className="nc-panel-body",s.append(l));for(let u of o.controls)l.append(It(u,Xf));e.append(s),Si(s,o,n)}}function Zl(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,i=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,i))}}var Qf="(max-width: 768px)",ec=new WeakMap;function Oo(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function Zf(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let i=Oo("prev"),o=Oo("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(i,s,o,l);let u=(d,c)=>{let p=ec.get(e);if(!p||c.getAttribute("aria-disabled")==="true")return;let h=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:g}=Zl(h,p.pageSize,(t.pages.get(p.id)??0)+d);t.pages.set(p.id,g),p.onPage?.(g),Si(e,{...p,page:g},t),c.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===c&&(c===i?o:i).focus(),t.redraw()};return i.addEventListener("click",()=>u(-1,i)),o.addEventListener("click",()=>u(1,o)),e.prepend(a),a}function Si(e,t,n){ec.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],i=t.pageSize??0,{pages:o,page:s}=Zl(a.length,i,t.page??n.pages.get(t.id)??0);if(i>0&&n.pages.set(t.id,s),o<=1){for(let f of[...e.children])f.classList.contains("nc-fx-pager")&&f.remove();delete e.dataset.ncPaged;for(let f of a)delete f.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(Qf).matches===!0,u=e.closest(".nc-module");a.forEach((f,w)=>{let m=Math.floor(w/i)!==s;if(m?f.dataset.ncOffPage="":delete f.dataset.ncOffPage,m&&!l){let $=u instanceof HTMLElement?Re.get(u):void 0;Nf(f,Jl($,f.dataset.ncId))}});let d=Zf(e,n),c=d.querySelector('[data-nc-fx-page="prev"]'),p=d.querySelector('[data-nc-fx-page="next"]');c.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===o-1?"true":"false");let h=d.querySelector("[data-nc-fx-page-count]"),g=`${s+1} / ${o}`;h.textContent!==g&&(h.textContent=g);let b=d.querySelector("[data-nc-fx-page-live]"),y=`Effects page ${s+1} of ${o}`;b.textContent!==y&&(b.textContent=y)}function Io(e){return e.replace(/["\\]/g,"\\$&")}function em(e,t=tr){Qs();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Xl(Va(),t).has(e.id),i=document.createElement("header");i.className="nc-module-hd",i.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="";let d=tl({labelledBy:o.id,onChange:m=>(Re.get(n)??e).onToggle?.(m)});d.el.dataset.ncModuleSwitch="",s.append(d.el,l,u);let c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",i.append(o,c,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let h=document.createElement("button");h.type="button",h.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",h.append(g);let b=document.createElement("i");b.className="nc-token-probe",b.dataset.ncProbe="",n.append(b,i,p,h),n.setAttribute("aria-labelledby",o.id);let y=m=>{let $=Re.get(n)??e;n.dataset.ncOpen=m?"false":"true",p.hidden=m,h.hidden=!m,l.textContent=m?"+":"−",l.setAttribute("aria-expanded",m?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${m?"Show":"Hide"} ${$.title}`),l.title=m?"Show":"Hide",m?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let m=n.dataset.ncOpen==="true";Ro(Va(),(Re.get(n)??e).id,m,t),y(m),Ai(n.parentElement)}),h.addEventListener("click",()=>{Ro(Va(),(Re.get(n)??e).id,!1,t),y(!1),Ai(n.parentElement)});let f={pages:new Map,redraw:()=>w.redraw()},w={el:n,update(m){Re.set(n,m),m.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=m.title,c.textContent=m.status??"",m.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),g.textContent=m.summary??m.title,d.el.hidden=m.on===void 0,d.set(m.on===!0),m.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,h.setAttribute("aria-label",`Show ${m.title}`),Jf(p,m,f),y(p.hidden),w.redraw()},redraw(){let m=Re.get(n);m&&Df(n,nr(m))}};return Re.set(n,e),y(a),w.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>w.redraw()).observe(n),Ys(()=>w.redraw(),n.ownerDocument),w}function tm(e,t,n="adjacent"){Qs(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((i,o)=>{let s=o%4+1;i.el.dataset.ncShade=String(s),i.el.dataset.ncPlace=a;let l=i.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(i.el),i.redraw()}),Ai(e)}function Ai(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=t.some(o=>o.hasAttribute("data-nc-lead")),a=t.map(o=>o.hasAttribute("data-nc-slim")?r("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let i=t.filter(o=>!o.hasAttribute("data-nc-slim"));n&&t.length===4&&i.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const tc="netcomposer.studio.instances.v1",qo="netcomposer.studio.types-seen.v1",nm=["petra-rhythm","olive-bass"];function nc(e,t){return t===1?e:`${e}#${t}`}function ar(e){const t=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(e);if(!t?.[1])return null;const n=t[2]?Number(t[2]):1;return n===1&&t[2]?null:{type:t[1],n}}function am(e,t){return t===1?e.name:`${e.name} ${t}`}function jt(e,t,n){const a=am(e,t),i=ic(n,a);return{id:nc(e.id,t),type:e.id,n:t,name:i,src:e.src,...i!==a?{custom:!0}:{}}}const ac=20;function ic(e,t){return typeof e!="string"?t:[...e.replace(/\s+/g," ").trim()].slice(0,ac).join("").trim()||t}function im(e,t,n,a){return e.map(i=>{if(i.id!==t)return i;const o=a.find(s=>s.id===i.type);return o?jt(o,i.n,n):i})}function rm(e,t){const n=new URLSearchParams({instance:String(e.n)});return t&&n.set("measure",""),`${e.src}?${n.toString().replace(/=(&|$)/g,"$1")}`}function om(e,t){const n=new Set(e.filter(i=>i.type===t.id).map(i=>i.n));let a=1;for(;n.has(a);)a++;return jt(t,a)}function yn(e){return e.filter(t=>t.available!==!1).map(t=>jt(t,1))}function sm(e,t){if(!Array.isArray(e))return yn(t);const n=[];for(const a of e){const i=a&&typeof a=="object"?a:null,o=typeof a=="string"?a:i?.id;if(typeof o!="string")continue;const s=ar(o),l=s&&t.find(u=>u.id===s.type&&u.available!==!1);!s||!l||n.some(u=>u.id===o)||n.push(jt(l,s.n,i?.name))}return n.length>0||e.length===0?n:yn(t)}function ir(){try{return globalThis.localStorage??null}catch{return null}}function lm(e,t=ir()){try{const n=t?.getItem(tc);return n?sm(JSON.parse(n),e):yn(e)}catch{return yn(e)}}function cm(e,t,n=ir()){let a=nm;try{const s=JSON.parse(n?.getItem(qo)??"null");Array.isArray(s)&&(a=s.filter(l=>typeof l=="string"))}catch{}const i=t.filter(s=>!a.includes(s.id)&&s.available!==!1);if(i.length===0)return[...e];const o=[...e];for(const s of i)o.some(l=>l.type===s.id)||o.push(jt(s,1));try{n?.setItem(qo,JSON.stringify([...new Set([...a,...i.map(s=>s.id)])]))}catch{}return o.length!==e.length&&Ht(o,n),o}function dm(e){return e.map(t=>t.custom?{id:t.id,name:t.name}:t.id)}function Ht(e,t=ir()){try{t?.setItem(tc,JSON.stringify(dm(e)))}catch{}}function um(e,t){const n=new Map;return(a,i)=>{const o=ar(a),s=o?.type??a,l=i?.instance!==void 0?Number(i.instance):a.includes("#")?o?.n:void 0,u=e().filter(c=>c.instance.type===s);let d;if(l!==void 0&&Number.isInteger(l)&&l>=1)d=u.find(c=>c.instance.n===l);else{const c=u.filter(p=>{const h=p.window();return h!=null&&h!==n.get(p.instance.id)});d=c.find(p=>p.readyState?.()!=="complete")??c[0]??u[0]}if(!d){if(t.some(p=>p.id===s))return null;const c=l!==void 0?nc(s,l):a;return{id:c,name:c}}return n.set(d.instance.id,d.window()),{id:d.instance.id,name:d.instance.name}}}const Ga="netcomposer.studio.pending-presets.v1",pm=3e3,hm=6e4;function _o(e){return!!e&&typeof e=="object"&&typeof e.format=="string"&&"data"in e}function fm(e,t){return new Promise(n=>{const a=setTimeout(()=>n(void 0),t);e.then(i=>{clearTimeout(a),n(i)},()=>{clearTimeout(a),n(void 0)})})}function mm(e){const t=new Map,n=[],a=()=>{try{const s=JSON.parse(e()?.getItem(Ga)??"{}"),l={};if(s&&typeof s=="object")for(const[u,d]of Object.entries(s))_o(d)&&(l[u]=d);return l}catch{return{}}},i=s=>{try{const l=e();if(!l)return;Object.keys(s).length?l.setItem(Ga,JSON.stringify(s)):l.removeItem(Ga)}catch{}},o=async(s,l)=>{const u=a(),d=u[s];if(!d)return;delete u[s],i(u);let c=d.format===l.format;if(c)try{await l.set(d.data)}catch{c=!1}for(const p of n)p(s,c)};return{provide(s,l){!l||typeof l.get!="function"||typeof l.set!="function"||(t.set(s,l),o(s,l))},provided:()=>[...t.keys()],async collect(s,l=pm){const u={};return await Promise.all(s.map(async d=>{const c=t.get(d);if(!c)return;const p=await fm(Promise.resolve().then(()=>c.get()),l);p!=null&&(u[d]={format:c.format,...c.version!==void 0?{v:c.version}:{},data:p})})),u},stash(s){const l={};for(const[u,d]of Object.entries(s))_o(d)&&(l[u]=d);i(l)},onApplied(s){n.push(s)},pending:()=>Object.keys(a()),dropPending(){const s=Object.keys(a());return i({}),s}}}function gm(e,t){return`${e}@studio/${t}`}const bm=1,xe=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX",identity:"instrument-nyx"}],rr=[...xe];function ym(e,t,n={}){const a=n.instruments??xe;return{version:bm,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},...n.grab?{grab:n.grab}:{},...n.play?{play:n.play}:{},...n.countIn?{countIn:n.countIn}:{},attach(i,o){if(typeof i!="string"||i.length===0||i.length>64)return null;const s=n.resolve?n.resolve(i,o):{id:i,name:a.find(h=>h.id===i)?.name??i};if(!s)return null;const l=t.attach(s.id,s.name),u=s.id,d=n.presets,c=n.share?.host(u),p=n.picker?.host(u);return{ctx:e,output:l,...n.mapper===void 0?{}:{mapper:n.mapper},instance:u,storageKey:h=>gm(h,u),...n.holdFirstPlay?{holdFirstPlay:n.holdFirstPlay}:{},...d?{providePreset:h=>d.provide(u,h)}:{},...c?{audioReceivers:c.audioReceivers,sendAudio:c.sendAudio,onAudio:c.onAudio,reveal:c.reveal}:{},...p?{pickerTarget:p.pickerTarget}:{}}}}}const Bo=16,wm=30;function vm(e){if(!e||typeof e!="object")return null;const t=e,n=Array.isArray(t.beats)?t.beats.slice(0,Bo+1):[],a=t.until;if(n.length<1||n.length>Bo||!n.every(l=>typeof l=="number"&&Number.isFinite(l))||n.some((l,u)=>u>0&&l<=n[u-1]))return null;const i=n[0],o=n[n.length-1];if(typeof a!="number"||!Number.isFinite(a)||a<=o||a-i>wm)return null;const s=Array.isArray(t.accents)?t.accents:[];return{beats:[...n],accents:n.map((l,u)=>s[u]===!0),until:a}}function xm(e,t){if(t>=e.until)return null;let n=-1;for(;n+1<e.beats.length&&e.beats[n+1]<=t;)n++;return{n:e.beats.length-Math.max(0,n),accent:n>=0&&e.accents?.[n]===!0}}function $m(e,t){return t===null?e:`${t} · ${e}`}function km(e){let t=0;for(const n of e)Number.isFinite(n)&&n>t&&(t=n);return Math.round(t)}function Em(e){const t=e.doc??document,n=t.createElement("div");n.className="count-in",n.hidden=!0,n.setAttribute("role","status");const a=t.createElement("span");a.className="count-in-who";const i=t.createElement("span");i.className="count-in-n",n.append(a,i);const o=t.title,s=new Map;let l=!1;const u=()=>{const c=e.now();for(const[$,T]of s)c>=T.until&&s.delete($);const[p,h]=[...s][0]??[],g=h?xm(h,c):null;if(!p||!g){n.hidden=!0,delete n.dataset.accent,t.title=o,l=!1;return}n.hidden=!1;const b=e.clearOf?.()??[],y=`${km(b.map($=>$.getBoundingClientRect().bottom))}px`;n.style.getPropertyValue("--count-in-top")!==y&&n.style.setProperty("--count-in-top",y);const f=e.labelOf(p);a.textContent!==f&&(a.textContent=f);const w=String(g.n);i.textContent!==w&&(i.textContent=w),n.toggleAttribute("data-accent",g.accent),n.setAttribute("aria-label",`${f} count-in ${w}`);const m=$m(o,g.n);t.title!==m&&(t.title=m),requestAnimationFrame(u)},d=()=>{l||(l=!0,requestAnimationFrame(u))};return{el:n,api:{show(c,p){if(typeof c!="string"||!c)return;const h=vm(p);h&&(s.set(c,h),d())},clear(c){s.delete(c)&&d()}}}}const Sm=1e4;function Am(e=Sm,t=globalThis){const n=new Set;let a=[];const i=()=>{if(n.size>0)return;const o=a;a=[];for(const s of o)s()};return{hold(){const o={};n.add(o);const s=t.setTimeout(()=>l(),e),l=()=>{n.delete(o)&&(t.clearTimeout(s),i())};return l},get count(){return n.size},idle(){return n.size===0?Promise.resolve():new Promise(o=>a.push(o))}}}const rc="netcomposer.studio.fx-fold.v1",Mm=["a","b","insert"],oc={a:!0,b:!0,insert:!1};function sc(e){try{const t=e?.getItem(rc);if(!t)return{};const n=JSON.parse(t);if(!n||typeof n!="object")return{};const a=n,i={};for(const o of Mm)typeof a[o]=="boolean"&&(i[o]=a[o]);return i}catch{return{}}}function lc(e){return{...oc,...sc(e)}}function cc(e,t,n){const a={...sc(e),[t]:n};try{e?.setItem(rc,JSON.stringify(a))}catch{}return{...oc,...a}}const dc="netcomposer.studio.insert-fold.v1";function uc(e){try{const t=e?.getItem(dc),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function pc(e,t,n){const a=[...uc(e)].filter(o=>o!==t);n&&a.push(t);const i=a.slice(-256);try{e?.setItem(dc,JSON.stringify(i))}catch{}return new Set(i)}function Tm(e,t){return lc(e).insert?(cc(e,"insert",!1),pc(e,t,!0)):uc(e)}function be(){try{return globalThis.localStorage??null}catch{return null}}const Lm={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function hc(e,t){const n=t.fx[e],a=Xn(n);for(const i of a.chain){const o=Lm[e][i.type];n===void 0&&o&&Object.assign(i.dials,o),e==="a"?(i.bypass=i.type!=="plate",i.type==="plate"&&(i.dials.mix=100)):e==="b"?(i.bypass=i.type!=="delay",i.type==="delay"&&(i.dials.mix=100,i.dials.mode=0,i.dials.send=100)):i.bypass=i.type!=="drive"||!t.insert.on}return a}const fc="drive-1",Mi=3;function Cm(e,t){if(e.masterFx!==null&&e.masterFx!==void 0)return pt(e.masterFx,t);const n=e.insert.on?hc("insert",e).chain.find(a=>a.type==="drive"):void 0;return pt({v:2,chain:n?[{id:fc,type:"drive",bypass:!1,dials:{...n.dials}}]:[]},t)}function Nm(e){return e.chain.some(t=>t.type==="drive"&&!t.bypass)}const Fm={"no-source":"that source isn't there",empty:"the range is empty",gone:"that range is older than the 20 seconds kept","not-kept":"that source wasn't being kept yet when the range played",timeout:"no answer from the audio (is it running?)"};function zm(e,t,n,a=2e3){return(Number.isFinite(e-t)?Math.max(0,e-t):0)/n*1e3+a}const On=e=>({channels:null,reason:e,message:Fm[e]});function Pm(e,t){const n=new Map,a=new Map;let i=1;const o=l=>{const u=t.nodeFor(l);if(!u)return null;const d=n.get(l);if(d&&d.source===u)return d.node;d?.node.disconnect();const c=new AudioWorkletNode(e,"nc-studio-grab",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});return c.port.onmessage=p=>{const h=p.data;h.type!=="took"&&h.type!=="recorded"||(a.get(h.id)?.(h.channels,h.reason),a.delete(h.id))},u.connect(c),n.set(l,{node:c,source:u}),c},s=async(l,u,d)=>{await t.ready;const c=o(l);if(!c)return On("no-source");if(!(d>u))return On("empty");const p=i++;return new Promise(h=>{a.set(p,(g,b)=>h(g?{channels:g}:On(b??"gone"))),c.port.postMessage({type:"take",id:p,from:u,to:d}),setTimeout(()=>{a.delete(p)&&h(On("timeout"))},zm(d,e.currentTime*e.sampleRate,e.sampleRate))})};return{record(l,u){if(!t.nodeFor(l))return null;const d=n.get(l)?.node??null,c=i++;let p=d;const h=b=>p?.port.postMessage(b);p?h({type:"record",id:c,from:u}):t.ready.then(()=>{p=o(l),h({type:"record",id:c,from:u})});let g=!1;return{stop(b){return g?Promise.resolve(null):(g=!0,new Promise(y=>{a.set(c,y),h({type:"record-end",id:c,to:b}),setTimeout(()=>{a.delete(c)&&y(null)},Math.max(0,(b-e.currentTime*e.sampleRate)/e.sampleRate)*1e3+5e3)}))},cancel(){g=!0,h({type:"record-cancel",id:c})}}},sources:()=>t.sources(),latency(l){if(typeof l!="string")return 0;const u=t.latencyFor?.(l)??0;return Number.isFinite(u)&&u>0?Math.round(u):0},listen(l){return t.nodeFor(l)?(t.ready.then(()=>o(l)),!0):!1},take:(l,u,d)=>s(l,u,d).then(c=>c.channels),takeResult:s}}function Dm(e){const t=()=>{};return new Proxy(e,{get(n,a,i){if(a==="stop")return t;const o=Reflect.get(n,a,i);return typeof o=="function"?o.bind(n):o}})}const X={"picker:off":"Connects the Sample Picker on this computer, so its Send to NYX loads the pads of a NYX here. Off: the picker opens NYX on its own.","picker:connecting":"Connecting to the Sample Picker on this computer. Press to disconnect.","picker:on":"The Sample Picker is connected: its Send to NYX loads a NYX here (you choose which there). Press to disconnect.","picker:away":"The Sample Picker isn't answering: start it on this computer; the Studio keeps trying. Press to disconnect.","picker:ask":"The Sample Picker was connected. Press to connect again (Chrome may ask to let this site reach this computer).","picker:blocked":"Chrome blocks this site from reaching this computer. Allow it in the site's settings (Local network access), then press here.","transport:rec":"Records the Master to a WAV file. If nothing is sounding, Rec arms and waits: it starts on the first sound or on bar 1. Press again to cancel or stop.","mix:sends":"The two send effects every channel feeds with its A and B knobs. The master's Sends button shows and hides them. Folded, click a column to open it.","inserts:channel":"Shows this channel's own effects, applied before its fader and sends. Press again to close them.","inserts:master":"Shows the master's own effects on the whole mix: none until you add one, up to three (EQ, compressor, drive and so on). Press again to close them.","fx:fold":"Folds this effect sideways into a narrow column so the Mix takes less room. It keeps sounding as set; a click on the column (or its ▶) opens it again.","fx:meter":"The level going into this effect (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. It keeps showing the input, greyed, while the effect is off.","fx:meter-return":"The level the sends feed into this effect (left bar) and its return (right bar), from −48 dB up to full scale; orange near clipping. Silent while the return is off.","fx:max":"Widens this card to three cards so its graph is easy to see; the dials sit under it. Click again, or press Escape, to put it back.","eq:graph":"The EQ's curve over the sound coming out right now: boosts rise above the middle line, cuts fall below it. Click it to open it wide, then drag a dot to shape it.","eq:low":"The lows, below 150 Hz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","eq:mid":"The middle band: drag up or down to boost or cut, sideways to move it, and scroll over it for narrower or wider. Double-click resets it.","eq:high":"The highs, above 6 kHz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","strip:fold":"Minimizes this channel sideways to a narrow column so more fit. It keeps playing at the same level; M and S still work, and ▶ expands it again.","strip:folded":"A minimized channel: its name, mute, solo and level meter. Click the name or ▶ to expand it. Drag the name to move it.","strip:pan":"Balance: moves this channel left or right in the stereo mix by turning the other side down (its sends follow). Drag or use the arrow keys; double-click to centre it.","strip:name":"This channel's instrument. Click to show it below, drag (or touch and hold) to move the channel, double-click to rename it.","strip:rename":"Type a new name (up to 20 characters) and press Enter; Escape cancels. Leave it empty to go back to the default name.","sends:view":"Shows or hides the send effects, A · Reverb and B · Delay. Outlined while a channel sends to them. They keep sounding either way.","vu:add":"Adds analog VU meters for the finished mix beside the master: left on top, right below. 0 VU is −18 dBFS RMS.","vu:module":"The master's left (top) and right (bottom) as classic VU meters, which show average loudness. 0 VU is −18 dBFS RMS; the red is louder than that.","vu:remove":"Hides the VU meters. + Meters in the Mix header brings them back.","vu:fold":"Folds the meters to a narrow column with two thin level bars, L and R. The triangle opens them again."},mc={threshold:-3,knee:0,ratio:20,attack:.001,release:.1};function Rm(e){return Math.floor(.006*e)}const Ti=1024,jo=Ti+8192,Om=.25;function Im(e,t){let n=0;for(let a=t;a<e.length;a++)n=Math.max(n,Math.abs(e[a]??0));if(!(n>1e-6))return null;for(let a=t;a<e.length;a++)if(Math.abs(e[a]??0)>=n/2)return a-t;return null}async function qm(e,t,n=OfflineAudioContext){const a=new n(1,jo,e),i=a.createBuffer(1,jo,e);i.getChannelData(0)[Ti]=Om;const o=new AudioBufferSourceNode(a,{buffer:i}),s=t(a);o.connect(s.input),s.output.connect(a.destination),o.start(0);const l=await a.startRendering();return Im(l.getChannelData(0),Ti)}function _m(e,t=()=>qm(e,n=>{const a=new DynamicsCompressorNode(n,mc);return{input:a,output:a}})){let n=Rm(e);const a=(async()=>{try{const i=await t();i!==null&&i>=0&&i<e/10&&(n=i)}catch{}})();return{get:()=>n,ready:a}}const Jt={noManifest:"No plugin.json there. Pick the plugin's folder, or plugin.json and its DSP file.",noDsp:e=>`plugin.json names its DSP file ${e}. Pick that file too.`,badJson:"plugin.json is not JSON.",bad:e=>`plugin.json has a problem: ${e}`,tooBig:e=>`${e} is over 256 KB.`},Bm=256*1024,jm=e=>e.includes("/")?e.slice(0,e.lastIndexOf("/")+1):"",In=e=>e.webkitRelativePath||e.name;async function Hm(e){const t=[...e],a=t.filter(h=>h.name==="plugin.json").sort((h,g)=>In(h).split("/").length-In(g).split("/").length)[0];if(!a)throw new Error(Jt.noManifest);const i=await a.text();let o;try{o=JSON.parse(i)}catch{throw new Error(Jt.badJson)}const s=ya(o);if(!s.ok||!s.manifest)throw new Error(Jt.bad(s.errors.join("; ")));const l=s.manifest,u=jm(In(a))+l.dsp,d=l.dsp.split("/").pop()??l.dsp,c=t.find(h=>In(h)===u)??t.find(h=>h!==a&&h.name===d&&!h.webkitRelativePath);if(!c)throw new Error(Jt.noDsp(l.dsp));const p=await c.text();if(new TextEncoder().encode(p).length>Bm)throw new Error(Jt.tooBig(l.dsp));return{manifest:l,manifestText:i,dspName:l.dsp,dsp:p}}async function Um(e,t=Date.now()){return{id:e.manifest.id,version:e.manifest.version,name:e.manifest.name,author:e.manifest.author,licence:e.manifest.licence,manifest:e.manifestText,dspName:e.dspName,dsp:e.dsp,sha256:await Fs(new TextEncoder().encode(e.dsp)),added:t}}const Ho=e=>`local:${e}`,sa=e=>e.startsWith("local:"),gc=e=>({id:e.id,version:e.version,name:e.name,author:e.author,added:e.added});function bc(){const e=new Map;return{list:async()=>[...e.values()].sort((t,n)=>t.added-n.added).map(gc),get:async t=>e.get(t)??null,put:async t=>{e.set(t.id,t)},remove:async t=>{e.delete(t)}}}const Vm="netcomposer-studio-plugins",qn="plugins";function Gm(e=globalThis.indexedDB){const t=bc(),n=new Promise(o=>{if(!e)return o(null);try{const s=e.open(Vm,1);s.onupgradeneeded=()=>{s.result.objectStoreNames.contains(qn)||s.result.createObjectStore(qn,{keyPath:"id"})},s.onsuccess=()=>o(s.result),s.onerror=()=>o(null),s.onblocked=()=>o(null)}catch{o(null)}}),a=async(o,s,l)=>{const u=await n;return u?new Promise((d,c)=>{const p=u.transaction(qn,o),h=s(p.objectStore(qn));p.oncomplete=()=>d(h.result),p.onerror=()=>c(p.error??h.error),p.onabort=()=>c(p.error??h.error)}):l()},i=o=>{const s=o;return!!s&&typeof s.id=="string"&&typeof s.version=="string"&&typeof s.manifest=="string"&&typeof s.dsp=="string"};return{async list(){return(await a("readonly",s=>s.getAll(),async()=>{const s=await t.list();return Promise.all(s.map(l=>t.get(l.id)))})).filter(i).sort((s,l)=>s.added-l.added).map(gc)},async get(o){const s=await a("readonly",l=>l.get(o),()=>t.get(o));return i(s)?s:null},put:o=>a("readwrite",s=>s.put(o),()=>t.put(o)).then(()=>{}),remove:o=>a("readwrite",s=>s.delete(o),()=>t.remove(o)).then(()=>{})}}const Be=-54,En=6,Ce=-Be/(En-Be),Wm=-6,Li=(Wm-Be)/(En-Be);function yc(e){const t=Math.min(1,Math.max(0,e));return t===0?Number.NEGATIVE_INFINITY:Be+t*(En-Be)}function Ym(e){return e===Number.NEGATIVE_INFINITY?0:10**(e/20)}function Km(e){return e<=0?Number.NEGATIVE_INFINITY:20*Math.log10(e)}function Ke(e){return Ym(yc(e))}function Xm(e){if(e===Number.NEGATIVE_INFINITY||e<-99)return"−∞";const t=e.toFixed(1);return t.startsWith("-")?`−${t.slice(1)}`:e>.05?`+${t}`:t}function Jm(e){const t=e.some(n=>n.solo);return e.map(n=>n.mute||t&&!n.solo?0:Ke(n.position))}function or(e){return e===Number.NEGATIVE_INFINITY||Number.isNaN(e)?0:Math.min(1,Math.max(0,(e-Be)/(En-Be)))}function Uo(e){return or(Km(e))}const Vo=[0,-6,-12,-24,-48].map(e=>({value:or(e),label:e===0?"0":`−${-e}`})),Qm=1;function Zm(e){let t=0,n=0;for(const a of e){const i=Math.abs(a);i>t&&(t=i),n+=a*a}return{peak:t,rms:e.length>0?Math.sqrt(n/e.length):0}}function Go(e){const t=e.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(t==="")return null;if(t==="off"||t==="-inf"||t==="-∞"||t==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(t))return null;const n=Number(t.replace(",","."));return Number.isFinite(n)?n<Be?0:or(Math.min(En,n)):null}function eg(e){const t=Math.min(1,Math.max(-1,Number.isFinite(e)?e:0)),n=Math.cos(Math.abs(t)*Math.PI/2);return t>0?[n,1]:t<0?[1,n]:[1,1]}const wc="netcomposer.studio.mix.v1",vc={position:Li,mute:!1,solo:!1,sendA:0,sendB:0,pan:0,shade:0},tg=8;function ng(e){return typeof e=="number"&&Number.isInteger(e)&&e>=1&&e<=tg?e:0}function wn(){return{v:1,channels:{},master:Ce,returns:{a:{on:!0,level:Ce},b:{on:!0,level:Ce}},insert:{on:!1},fx:{},channelFx:{},masterFx:null}}const un=(e,t)=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t,ag=e=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(-1,e)):0,la=(e,t)=>typeof e=="boolean"?e:t,Xe=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{};function ig(e){const t=Xe(e);return{position:un(t.position,vc.position),mute:la(t.mute,!1),solo:la(t.solo,!1),sendA:Math.min(Ce,un(t.sendA,0)),sendB:Math.min(Ce,un(t.sendB,0)),pan:ag(t.pan),shade:ng(t.shade)}}function xc(e){const t=wn(),n=Xe(e);if(n.v!==1)return t;const a={};for(const[d,c]of Object.entries(Xe(n.channels)))d.length>0&&d.length<=64&&(a[d]=ig(c));const i=Xe(n.returns),o=(d,c)=>{const p=Xe(d);return{on:la(p.on,c.on),level:un(p.level,c.level)}},s={},l=Xe(n.fx);for(const d of["a","b","insert"])l[d]!==void 0&&(s[d]=l[d]);const u={};for(const[d,c]of Object.entries(Xe(n.channelFx)))d.length>0&&d.length<=64&&c&&typeof c=="object"&&(u[d]=c);return{v:1,channels:a,master:un(n.master,t.master),returns:{a:o(i.a,t.returns.a),b:o(i.b,t.returns.b)},insert:{on:la(Xe(n.insert).on,t.insert.on)},fx:s,channelFx:u,masterFx:n.masterFx&&typeof n.masterFx=="object"?n.masterFx:null}}function $c(){try{return globalThis.localStorage??null}catch{return null}}function rg(e=$c()){try{const t=e?.getItem(wc);return t?xc(JSON.parse(t)):wn()}catch{return wn()}}function kc(e,t=$c()){try{return t?.setItem(wc,JSON.stringify(e)),t!==null}catch{return!1}}const Ea=3;function og(e,t=Ea){return Math.max(1,Math.ceil(e/t))}function Wo(e,t=Ea){return Math.max(0,Math.floor(e/t))}function sg(e,t,n,a=null,i=Ea){const o=og(n.length,i)-1;if(!e||e.key!==t)return 0;const s=a===null?-1:n.indexOf(a);if(s>=0)return Wo(s,i);const l=new Set(e.ids);let u=-1;return n.forEach((d,c)=>{l.has(d)||(u=c)}),u>=0?Wo(u,i):Math.min(o,Math.max(0,e.page))}const Ec=e=>!!e&&typeof e=="object"&&Array.isArray(e.chain);function lg(e,t){if(!Ec(e))return null;const n=e.chain.findIndex(a=>a?.id===t);return n<0?null:{slot:JSON.parse(JSON.stringify(e.chain[n])),index:n}}function cg(e,t,n){if(!Ec(e)||e.chain.length>=n||e.chain.some(i=>i?.id===t.slot.id))return null;const a=e.chain.slice();return a.splice(Math.max(0,Math.min(a.length,t.index)),0,t.slot),{...e,v:2,chain:a}}const Yo="plugin-url",Wa="plugin-folder",Ko="plugin-files",Ya="kept:",Ka="forget:",Xa="listed:",dg="../plugins/registry.json",D={urlTitle:"Load a plugin from a URL",urlBody:"Paste the address of the plugin's plugin.json.",urlField:"Address",urlPlaceholder:"https://…/plugin.json",urlNext:"Next",warnTitle:"Run this plugin?",warnBody:e=>`This runs code from ${e} in your browser. Only load plugins from people you trust. Listed plugins are checked; this one is not.`,warnLoad:"Load and run",badUrl:"That isn't a plugin address. Use https://, or http://localhost while you build one.",badUrlLocal:"Plugins load from this computer for now: pick its files, or use http://localhost while you build one.",urlPlaceholderLocal:"http://localhost:…/plugin.json",folder:"Load plugin folder…",files:"Load plugin from files…",url:"Load plugin from URL…",thisComputer:"this computer",kept:e=>`${e} (this computer)`,fileWarnBody:(e,t)=>`This runs ${e} by ${t}, from files on this computer, in your browser. Only run code you made or trust. It is kept in this browser until you remove it.`,forget:e=>`Remove ${e} from this computer…`,forgetTitle:e=>`Remove ${e}?`,forgetBody:"This browser forgets its copy. Slots that use it keep their dials and play as a wire after a reload.",forgetConfirm:"Remove",forgotten:e=>`${e} is removed from this computer.`,reloadToUse:(e,t)=>`Kept ${e} ${t}. Reload the page to hear the new code.`,reloadToHear:e=>`${e} has new code. Reload the page to hear it; until then the old code plays.`,reloadAction:"Reload",newCode:"Reload page: new code.",stuck:(e,t)=>`${e} on ${t} got stuck in a loop and was stopped. The rest of the mix plays on.`,frozenTitle:"The sound stopped",frozenBody:e=>`${e} froze the audio on this page, and it can't be restarted here. In a new tab your mix comes back with ${e} off (add it again to retry). This page stops saving.`,frozenOpen:"Open new tab",frozenStay:"Stay here",frozenShort:"Stopped: froze audio.",notKept:"Not on this computer.",pickAgain:"Pick files…",badUrlShort:"Not a plugin address.",failedShort:"Couldn't load it.",missing:"Missing: not loaded.",missingNoUrl:"Missing: no address saved.",through:"Sound passes through.",dialsKept:"Its dials are kept.",from:e=>`From ${e}`,load:"Load",loadAsk:"Load…",loading:"Loading…",retry:"Remove, add to retry."};function ug(e){const t={1:"Stopped: failed to start.",2:"Stopped: it crashed.",3:"Stopped: bad numbers.",4:"Stopped: a dial crashed it.",5:"Stopped: code not loaded.",6:"Stopped: stuck in a loop."};for(const[n,a]of Object.entries(Jn))if(a===e)return t[Number(n)];return"Stopped."}function Qt(e){if(sa(e))return D.thisComputer;try{return new URL(e).host||e}catch{return e}}function pg(e,t,n=!0){let a;try{a=new URL(e.trim(),t)}catch{return null}const i=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(a.hostname);return a.protocol==="https:"&&(n||i)||a.protocol==="http:"&&i?a.href:null}function hg(e){const t=new URL(dg,e.base).href;let n=[];const a=new Set,i=new Map,o=[],s=new Set,l=()=>{for(const S of s)S()},u=S=>String(S?.message??S).replace(/^nc-fx plugins?: /,""),d=e.remote!==!1,c=e.store??bc();let p=[];const h=new Map,g=new Set,b=S=>{g.has(S)||(g.add(S),l())},y=e.frozen,f=async()=>{try{p=await c.list()}catch(S){console.warn(`Studio plugins: can't read this computer's plugins (${u(S)})`)}l()},w=f(),m=d?Tu(t,{fetch:e.fetch}).then(S=>{n=S.registry.plugins;for(const x of S.errors)console.warn(`Studio plugins: registry ${x}`);l();const v=o.splice(0);v.length&&T.restore(v)}).catch(S=>{console.info(`Studio plugins: no listed plugins (${u(S)})`)}):Promise.resolve(),$=async(S,v)=>{a.add(S),i.delete(S),l();try{const{entry:x,stale:A}=await v();return x.plugin&&(A&&b(x.plugin.id),y?.clear(x.plugin.id)),x.type}catch(x){throw i.set(S,u(x)),x}finally{a.delete(S),l()}},T={listed:()=>n,loaded:()=>eu().filter(S=>!S.plugin.listed&&!sa(S.plugin.url)),remote:d,local:()=>p,stale:S=>g.has(S),frozen:S=>!!y?.has(S),async addPicked(S){const v=await Um(S);y?.clear(v.id);const x=re(`plugin:${v.id}`);if(x){const E=x.plugin?.version===v.version&&h.get(v.id)===v.sha256;return await c.put(v),await f(),E||b(v.id),E?{type:x.type}:{reload:!0}}const A=await $(v.id,()=>Gr(e.ctx,{manifest:v.manifest,dsp:v.dsp,dspName:v.dspName},{moduleUrl:e.moduleUrl,url:Ho(v.id)}));return h.set(v.id,v.sha256),await c.put(v),await f(),{type:A}},async loadKept(S){y?.clear(S);const v=re(`plugin:${S}`),x=await c.get(S);if(v){const E=h.get(S);return x&&E&&E!==x.sha256&&b(S),v.type}if(!x)throw new Error(D.notKept);const A=await $(S,()=>Gr(e.ctx,{manifest:x.manifest,dsp:x.dsp,dspName:x.dspName},{moduleUrl:e.moduleUrl,url:Ho(S)}));return h.set(S,x.sha256),A},async forget(S){await c.remove(S),await f()},listingFor(S){const v=n.find(A=>A.id===S.id);if(!v)return null;const x=new URL(v.manifest,t).href;return!S.url||S.url===x?v:null},loading:S=>a.has(S),async loadListed(S){y?.clear(S);const v=re(`plugin:${S}`);if(v)return v.type;await m;const x=n.find(A=>A.id===S);if(!x)throw new Error(`${S} isn't listed`);return $(S,()=>Lu(e.ctx,x,t,{moduleUrl:e.moduleUrl,fetch:e.fetch}))},loadUrl(S){return $("url",()=>Ds(e.ctx,S,{moduleUrl:e.moduleUrl,fetch:e.fetch,base:e.base}))},restore(S){for(const v of S)if(!(v.status!=="missing"||a.has(v.id)||re(`plugin:${v.id}`))&&!y?.has(v.id)){if(sa(v.url)){w.then(()=>{p.some(x=>x.id===v.id)&&!a.has(v.id)&&!re(`plugin:${v.id}`)&&T.loadKept(v.id).catch(()=>{})});continue}if(d){if(!n.length){o.some(x=>x.id===v.id)||o.push(v);continue}T.listingFor(v)&&T.loadListed(v.id).catch(()=>{})}}},onChange(S){return s.add(S),()=>s.delete(S)},problem:S=>i.get(S)??null,clearProblem(S){i.delete(S)&&l()}};return T}const Sc="netcomposer.studio.sends.v2";function fg(e){try{return e?.getItem(Sc)==="1"}catch{return!1}}function mg(e,t){try{e?.setItem(Sc,t?"1":"0")}catch{}}function gg(e,t){try{return!!(e?.matchMedia(t.portrait).matches||e?.matchMedia(t.landscape).matches)}catch{return!1}}function Ci(e){return e.hacksShown!==null?{kind:"stack",id:e.hacksShown}:e.sendsShown?{kind:"sends"}:{kind:"none"}}function bg(e){return Ci(e).kind==="sends"?{hacksShown:null,sendsShown:!1}:{hacksShown:null,sendsShown:!0}}function yg(e){for(const t of e)if(t.sendA>0||t.sendB>0)return!0;return!1}function Xo(e,t){return e&&!t}const Ac="netcomposer.studio.strip-fold.v1";function Mc(e){try{const t=e?.getItem(Ac),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Tc(e,t){try{e?.setItem(Ac,JSON.stringify([...t].sort()))}catch{}return t}function Lc(e,t,n){const a=new Set(Mc(e));return n?a.add(t):a.delete(t),Tc(e,a)}function wg(e,t){return Lc(e,t,!1)}function vg(e,t){const n=new Set(t),a=Mc(e),i=new Set([...a].filter(o=>n.has(o)));return i.size===a.size?a:Tc(e,i)}function xg(e,t){if(!e.includes(t.id))return[...e];const n=e.filter(o=>o!==t.id),a=t.before===null?-1:n.indexOf(t.before),i=a<0?n.length:a;return[...n.slice(0,i),t.id,...n.slice(i)]}function $g(e,t,n){const a=e.indexOf(t);if(a<0)return null;const i=a+n;return i<0||i>=e.length?null:n<0?{id:t,before:e[i]}:{id:t,before:e[i+1]??null}}function kg(e,t){if(e.length===0)return null;let n=e[0],a=Number.POSITIVE_INFINITY;for(const i of e){const o=t<i.left?i.left-t:t>i.left+i.width?t-(i.left+i.width):0;o<a&&(n=i,a=o)}return{target:n.id,side:t<n.left+n.width/2?"before":"after"}}function Jo(e,t,n){const a=e.indexOf(n.target);if(a<0||!e.includes(t))return null;const i=n.side==="before"?n.target:e[a+1]??null;if(i===t)return null;const o={id:t,before:i};return xg(e,o).every((l,u)=>l===e[u])?null:o}const Eg=-18,Sg=-20,Cc=3,Ag=[-20,-10,-7,-5,-3,-2,-1,0,1,2,3],Qo=[-20,-10,-7,-5,-3,0,1,2,3],Mg=.3,Tg=6.638/Mg,Lg=48;function Cg(e){return e-Eg}function Nc(e){return Number.isFinite(e)?Math.min(1,Math.max(0,10**((e-Cc)/20))):e>0?1:0}function Ng(e){return e>0?Nc(Cg(20*Math.log10(e))):0}function sr(e){return(Math.min(1,Math.max(0,e))*2-1)*Lg}const Zo={x:0,v:0};function Fg(e,t,n,a=!1){if(a)return{x:t,v:0};if(!(n>0))return e;const i=Tg,o=e.x-t,s=e.v+i*o,l=Math.exp(-i*n),u=t+(o+s*n)*l,d=(e.v-i*s*n)*l;return u>=1?{x:1,v:0}:u<=0?{x:0,v:0}:{x:u,v:d}}function zg(e,t){return Math.abs(e.x-t)<1e-4&&Math.abs(e.v)<.001}const Fc="netcomposer.studio.vu.v1";function Pg(e){try{return e?.getItem(Fc)==="1"}catch{return!1}}function Dg(e,t){try{e?.setItem(Fc,t?"1":"0")}catch{}}const zc="netcomposer.studio.vu-fold.v1";function Rg(e){try{return e?.getItem(zc)==="1"}catch{return!1}}function Og(e,t){try{e?.setItem(zc,t?"1":"0")}catch{}}const Ig="http://www.w3.org/2000/svg",Ni=200,Ja=112,Mt=Ni/2,pn=132,es=100,qg=108,_g=105,Bg=116,jg=103,Hg=112,ze=(e,t)=>{const n=document.createElementNS(Ig,e);for(const[a,i]of Object.entries(t))n.setAttribute(a,String(i));return n},ts=e=>Math.round(e*100)/100;function hn(e,t){const n=sr(Nc(e))*Math.PI/180;return[ts(Mt+t*Math.sin(n)),ts(pn-t*Math.cos(n))]}function ns(e,t,n){const[a,i]=hn(e,n),[o,s]=hn(t,n);return`M ${a} ${i} A ${n} ${n} 0 0 1 ${o} ${s}`}const Ug=e=>e>0?`+${e}`:e<0?`−${-e}`:"0";function as(e){const t=ze("svg",{class:"vu-meter",viewBox:`0 0 ${Ni} ${Ja}`,role:"img","aria-label":`${e==="L"?"Left":"Right"} VU meter`,"data-vu-side":e});t.append(ze("rect",{class:"vu-face",x:.5,y:.5,width:Ni-1,height:Ja-1,rx:4})),t.append(ze("path",{class:"vu-arc",d:ns(Sg,0,es)})),t.append(ze("path",{class:"vu-zone",d:ns(0,Cc,jg)}));for(const o of Ag){const[s,l]=hn(o,es),[u,d]=hn(o,Qo.includes(o)?qg:_g);t.append(ze("line",{class:o>0?"vu-tick vu-red":"vu-tick",x1:s,y1:l,x2:u,y2:d}))}for(const o of Qo){const[s,l]=hn(o,Bg),u=ze("text",{class:o>0?"vu-num vu-red":"vu-num",x:s,y:l,"text-anchor":"middle"});u.textContent=Math.abs(o)===20||o===3?Ug(o):String(Math.abs(o)),t.append(u)}const n=ze("text",{class:"vu-legend",x:Mt,y:92,"text-anchor":"middle"});n.textContent="VU";const a=ze("text",{class:"vu-side",x:10,y:Ja-10});a.textContent=e;const i=ze("line",{class:"vu-needle",x1:Mt,y1:pn,x2:Mt,y2:pn-Hg,transform:`rotate(${sr(0)} ${Mt} ${pn})`});return t.append(n,a,i),{svg:t,needle:i}}function Vg(e){const t=document.createElement("div");t.className="vu",t.dataset.vu="",t.setAttribute("role","group"),t.setAttribute("aria-label","VU meters");const n=document.createElement("div");n.className="vu-hd";const a=document.createElement("button");a.type="button",a.className="nc-fold-toggle",a.dataset.vuFold="";const i=document.createElement("span");i.className="nc-fold-tri",i.setAttribute("aria-hidden","true"),a.append(i),a.setAttribute("data-nc-help",X["vu:fold"]);const o=document.createElement("span");o.className="nc-strip-name vu-name",o.textContent="Meters",o.setAttribute("data-nc-help",X["vu:module"]);const s=document.createElement("button");s.type="button",s.className="nc-page-action vu-hide",s.dataset.vuRemove="",s.textContent="Hide",s.setAttribute("aria-label","Hide VU meters"),s.setAttribute("data-nc-help",X["vu:remove"]),s.addEventListener("click",()=>e.onRemove(s)),n.append(a,o,s);const l=document.createElement("div");l.className="vu-mini",l.setAttribute("aria-hidden","true");const u=["L","R"].map(w=>{const m=document.createElement("span");m.className="vu-bar",m.dataset.side=w;const $=document.createElement("span");return $.className="vu-bar-fill",m.append($),l.append(m),$});let d=e.folded;const c=()=>{t.toggleAttribute("data-folded",d),a.setAttribute("aria-expanded",d?"false":"true"),a.setAttribute("aria-label",d?"Expand VU meters":"Minimize VU meters"),a.title=d?"Expand":"Minimize"};c(),a.addEventListener("click",()=>{d=!d,c(),e.onFold(d)});const p=as("L"),h=as("R");t.append(n,p.svg,h.svg,l);const g=matchMedia("(prefers-reduced-motion: reduce)"),b=[Zo,Zo],y=[Number.NaN,Number.NaN],f=[p.needle,h.needle];return{el:t,frame(w,m){let $=!1;for(const T of[0,1]){const S=w?Ng(w[T]):0;b[T]=Fg(b[T],S,m,g.matches),(!zg(b[T],S)||S>0)&&($=!0);const v=Math.round(sr(b[T].x)*10)/10;v!==y[T]&&(y[T]=v,f[T].setAttribute("transform",`rotate(${v} ${Mt} ${pn})`),u[T].style.transform=`scaleY(${Math.max(0,Math.min(1,b[T].x)).toFixed(3)})`,t.dataset[T===0?"vuL":"vuR"]=v.toFixed(1))}return $}}}const Gg="netcomposer.studio.hidden.v1",_n=1/120,We="master",is="Inserts",Wg="(max-width: 768px)",Pc=8,Gn=e=>Xm(yc(e)),rs=e=>{const t=Gn(e);return t==="−∞"?"off":`${t} dB`};function Yg(e,t){return Lt.find(n=>n.type===e)?.dials.find(n=>n.key===t)}function Kg(e,t,n){const a=n.bpm,i=k=>{const M=n.order(),C=M.indexOf(k);return C<0?M.length:C},o=(k,M,C,P)=>{const F=Yg(C,P);if(!F||!M)return null;const U=Number(M.getParam(C,P)??F.default),W=`mix-${k}-${P}`;return F.options?{type:"select",id:W,label:F.label,value:String(U),options:F.options.map(z=>({value:String(z.value),label:z.label})),onChange:z=>{M.setParam(C,P,Number(z)),J.render()}}:{type:"slider",id:W,label:F.label,min:F.min,max:F.max,step:F.step??1,taper:so(F),value:U,valueText:F.format(U,a()),onChange:z=>{M.setParam(C,P,z),J.render()}}},s=(k,M,C,P)=>P.map(F=>o(k,M,C,F)).filter(F=>F!==null),l=matchMedia(Wg);let u=null;const d=k=>{u=k,J.render()},c=k=>d(u===k?null:k);l.addEventListener("change",()=>J.render());const p=(k,M,C,P)=>{k.setParam(M,C,P),J.render()},h=(k,M,C,P)=>ap(M,C,{id:`hack-${k}-${C}-graph`,on:P,set:(F,U)=>p(M,C,F,U),help:{graph:X["eq:graph"],low:X["eq:low"],mid:X["eq:mid"],high:X["eq:high"]}}),g=(k,M,C,P)=>{const F=Number(M.getParam(C,P.key)??P.default),U=`hack-${k}-${C}-${P.key}`,W=z=>p(M,C,P.key,z);return P.options?{type:"select",id:U,label:P.label,value:String(F),options:P.options.map(z=>({value:String(z.value),label:z.label})),onChange:z=>W(Number(z))}:{type:"slider",id:U,label:P.label,min:P.min,max:P.max,step:P.step??.001,taper:so(P),value:F,valueText:As(P,F,a()),onChange:W}},b="",y={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3},drive:{drive_db:6}};let f=Tm(be(),`${We}/${fc}`);const w=k=>({folded:f.has(k),onFold:M=>{f=pc(be(),k,M),J.render()},foldHelp:X["fx:fold"]}),m=n.plugins;m?.onChange(()=>J.render());const $=new Map,T=k=>String(k?.message??k).replace(/^nc-fx plugins?: /,""),S=(k,M,C)=>{$.set(k,M),J.render(),tn({message:C,duration:9e3,anchor:ne.el.querySelector(`[data-nc-id='hack-${k}-add']`)})},v=(k,M)=>{const C=tn({message:M,duration:12e3,actionLabel:D.reloadAction,onAction:()=>location.reload(),anchor:ne.el.querySelector(`[data-nc-id='hack-${k}-add']`)});C.el.dataset.pluginReload=k},x=k=>re(k)?.label??k,A=k=>!!k&&k.startsWith("plugin:")&&!!m?.stale(k.slice(7)),E=async(k,M,C)=>{if(!m)return null;const P=C??await Bp({title:D.urlTitle,body:D.urlBody,field:{label:D.urlField,placeholder:m.remote?D.urlPlaceholder:D.urlPlaceholderLocal,type:"url"},confirmLabel:D.urlNext,returnFocus:M??void 0});if(!P)return null;const F=pg(P,location.href,m.remote);if(!F)return S(k,D.badUrlShort,m.remote?D.badUrl:D.badUrlLocal),null;if(!await qe({title:D.warnTitle,body:D.warnBody(Qt(F)),confirmLabel:D.warnLoad,danger:!0,returnFocus:M??void 0}))return null;try{const W=await m.loadUrl(F);return A(W)&&v(k,D.reloadToHear(x(W))),W}catch(W){return W?.reload?($.set(k,D.failedShort),J.render(),v(k,T(W))):S(k,D.failedShort,T(W)),null}},L=k=>{const M=document.createElement("input");return M.type="file",M.hidden=!0,M.dataset.ncId="plugin-files",k?M.webkitdirectory=!0:(M.multiple=!0,M.accept=".json,.js,.mjs,application/json,text/javascript"),document.body.append(M),new Promise(C=>{const P=F=>{M.remove(),C(F)};M.addEventListener("change",()=>P(M.files?.length?[...M.files]:null)),M.addEventListener("cancel",()=>P(null)),M.click()})},N=async(k,M,C)=>{if(!m)return null;const P=await L(C);if(!P)return null;let F;try{F=await Hm(P)}catch(W){return S(k,D.failedShort,T(W)),null}if(!await qe({title:D.warnTitle,body:D.fileWarnBody(F.manifest.name,F.manifest.author),confirmLabel:D.warnLoad,danger:!0,returnFocus:M??void 0}))return null;try{const W=await m.addPicked(F);return"reload"in W?(v(k,D.reloadToUse(F.manifest.name,F.manifest.version)),null):W.type}catch(W){return S(k,D.failedShort,T(W)),null}},q=async(k,M,C)=>{if(!m)return;const P=m.local().find(U=>U.id===M)?.name??M;await qe({title:D.forgetTitle(P),body:D.forgetBody,confirmLabel:D.forgetConfirm,danger:!0,returnFocus:C??void 0})&&(await m.forget(M),tn({message:D.forgotten(P),duration:5e3,anchor:ne.el.querySelector(`[data-nc-id='hack-${k}-add']`)}))},_=async(k,M,C,P)=>{$.delete(k);let F=C;if(C===Wa||C===Ko)F=await N(k,P,C===Wa);else if(C.startsWith(Ka))await q(k,C.slice(Ka.length),P),F=null;else if(C.startsWith(Ya)&&m){J.render();try{F=await m.loadKept(C.slice(Ya.length)),A(F)&&v(k,D.reloadToHear(x(F)))}catch(U){S(k,D.failedShort,T(U)),F=null}}else if(C===Yo)F=await E(k,P);else if(C.startsWith(Xa)&&m){J.render();try{F=await m.loadListed(C.slice(Xa.length))}catch(U){S(k,D.failedShort,T(U)),F=null}}F&&M.addEffect(F,{dials:y[F]}),J.render()},V=()=>m?[...m.listed().map(k=>({value:`${Xa}${k.id}`,label:k.name,group:"Plugins"})),...m.local().map(k=>({value:`${Ya}${k.id}`,label:D.kept(k.name),group:"Plugins"})),...m.loaded().map(k=>({value:k.type,label:`${k.label} (${Qt(k.plugin.url)})`,group:"Plugins"})),{value:Wa,label:D.folder,group:"Plugins"},{value:Ko,label:D.files,group:"Plugins"},{value:Yo,label:D.url,group:"Plugins"},...m.local().map(k=>({value:`${Ka}${k.id}`,label:D.forget(k.name),group:"Plugins"}))]:[];let de=null,ue=null,Q=null;const Z=k=>t.masterFx===k||t.list().some(M=>M.fx===k),B=k=>requestAnimationFrame(()=>ne.el.querySelector(k)?.focus()),Ee=(k,M,C,P,F,U,W)=>{const z=lg(C.getState(),P);if(!z||!C.removeEffect(P))return;const le=!!W&&W===document.activeElement;if(Q?.close(),J.render(),le){const ot=C.getChain()[z.index];B(ot?`[data-nc-id='hack-${k}-${ot.id}'] [data-nc-fx-remove]`:`#hack-${k}-add-type`)}const j=tn({message:`${F} removed from ${M}.`,actionLabel:"Undo",anchor:ne.el.querySelector("[data-nc-area='fx']"),onAction:()=>H(k,C,z,U),onClose:()=>{Q===j&&(Q=null)}});j.el.dataset.insertUndo=k,Q=j},H=(k,M,C,P)=>{if(!Z(M))return;const F=cg(M.getState(),C,P);let U=C.slot.id;if(F)M.setState(F);else{const{type:W,dials:z,bypass:le}=C.slot;U=M.addEffect(W,{index:C.index,dials:z,bypass:le})}U&&(u=k,ue=`hack-${k}-${U}`,J.render(),B(`[data-nc-id='hack-${k}-${U}'] [data-nc-fx-remove]`))},pe=(k,M,C,P)=>{const F=C.getChain(),U=F.map((z,le)=>{const j=re(z.type),ot=j?.dials??[],Nr=oe=>Ee(k,M,C,z.id,z.name,P,oe),Fr=oe=>{C.moveEffect(z.id,oe),ue=`hack-${k}-${z.id}`,J.render()},Wt=[];le>0&&Wt.push({type:"button",id:`hack-${k}-${z.id}-left`,label:"Move left",on:!1,onPress:()=>Fr(le-1)}),le<F.length-1&&Wt.push({type:"button",id:`hack-${k}-${z.id}-right`,label:"Move right",on:!1,onPress:()=>Fr(le+1)}),Wt.push({type:"button",id:`hack-${k}-${z.id}-remove`,label:"Remove",ariaLabel:`Remove ${z.name} from ${M}`,on:!1,onPress:()=>Nr(document.getElementById(`hack-${k}-${z.id}-remove`))});const zr={onRemove:oe=>Nr(oe),removeLabel:`Remove ${z.name}`},ae=z.plugin,ve=(oe,st,yt=!1)=>({type:"note",id:`hack-${k}-${z.id}-${oe}`,...yt?{tone:"danger"}:{},text:st});if(ae&&ae.status==="missing"){const oe=m?.listingFor(ae)??null,st=sa(ae.url),yt=st&&!!m?.local().some(Mn=>Mn.id===ae.id),Pr=m?.loading(ae.id)??!1,Dr=Pr?[ve("missing",D.loading)]:[ve("missing",m?.frozen(ae.id)?D.frozenShort:st&&!yt?D.notKept:ae.url?D.missing:D.missingNoUrl,!0),ve("through",D.through),ve("kept",D.dialsKept),...ae.url?[ve("from",D.from(Qt(ae.url)))]:[]];return m&&ae.url&&!Pr&&Dr.push({type:"button",id:`hack-${k}-${z.id}-load`,label:oe||yt?D.load:st?D.pickAgain:D.loadAsk,ariaLabel:oe||yt?`Load ${ae.name}`:st?`Pick ${ae.name}'s folder (asks first)`:`Load ${ae.name} from ${Qt(ae.url)} (asks first)`,on:!1,onPress:()=>{const Mn=document.getElementById(`hack-${k}-${z.id}-load`);oe?m.loadListed(ae.id).catch(()=>J.render()):yt?m.loadKept(ae.id).catch(()=>J.render()):st?N(k,Mn,!0).then(()=>J.render()):E(k,Mn,ae.url)}}),{type:"fx",id:`hack-${k}-${z.id}`,title:`${le+1} · ${z.name}`,...w(`${k}/${z.id}`),depth:le%4+1,controls:Dr,more:Wt,...zr}}const bt=j&&"plugin"in j?j.plugin:void 0,kd=bt?[ve("by",`By ${bt.author}`),ve("version",`${bt.licence} · ${bt.version}`),ve("source",bt.listed?"Listed":D.from(Qt(bt.url)))]:[],Ed=ae?.status==="failed"?[ve("failed",ug(ae.error),!0),ve("through",D.through),ve("retry",D.retry)]:ae&&m?.stale(ae.id)?[ve("newcode",D.newCode)]:[];return{type:"fx",id:`hack-${k}-${z.id}`,title:`${le+1} · ${z.name}`,...w(`${k}/${z.id}`),depth:le%4+1,on:!z.bypass,meter:Ra(C,z.id)??void 0,meterHelp:X["fx:meter"],onToggle:oe=>{C.setParam(z.id,"bypass",!oe),J.render()},controls:[...Ed,...z.type==="eq"?[h(k,C,z.id,!z.bypass)]:[],...ot.filter(oe=>!oe.more).map(oe=>g(k,C,z.id,oe))],maxHelp:X["fx:max"],...zr,more:[...ot.filter(oe=>oe.more).map(oe=>g(k,C,z.id,oe)),...kd,...Wt]}}),W=F.length>=P;return U.push({type:"fx",id:`hack-${k}-add`,title:`${M} · Inserts`,...w(`${k}/add`),depth:F.length%4+1,controls:[{type:"note",id:`hack-${k}-note`,...$.get(k)?{tone:"danger"}:{},text:$.get(k)??(m?.loading("url")||m?.listed().some(z=>m.loading(z.id))||m?.local().some(z=>m.loading(z.id))?D.loading:W?`${F.length} of ${P}: the stack is full.`:F.length===0?"No effects yet.":`${F.length} of ${P}, first to last.`)},...W?[]:[{type:"select",id:`hack-${k}-add-type`,label:"Add",value:b,options:[{value:b,label:"Effect…"},...Jd.map(z=>({value:z,label:re(z)?.label??z})),...V()],onChange:z=>{if(z===b)return;const le=document.getElementById(`hack-${k}-add-type`);le instanceof HTMLSelectElement&&(le.value=b),_(k,C,z,le)}}]]}),U},fe=k=>{const M=t.returns[k];return{type:"slider",id:`mix-${k}-return`,label:"Return",min:0,max:1,step:_n,value:M.level,valueText:rs(M.level),onChange:C=>t.setReturn(k,{level:C})}};let se=fg(be());const Fe=()=>gg(globalThis.window,{portrait:Kl,landscape:Js}),vd=()=>{const k=bg({hacksShown:u,sendsShown:se});u=k.hacksShown,k.sendsShown!==se&&(se=k.sendsShown,mg(be(),se)),J.render()},xr=(k,M,C)=>{const P=$g(n.order(),k,M);if(!P)return;n.onReorder?.(P.id,P.before);const U=ne.el.querySelector(`${Je}[data-nc-id="strip-${CSS.escape(k)}"]`)?.querySelector(C);U&&document.activeElement!==U&&U.focus()};let $r=vg(be(),n.order());const xd=()=>[...t.list()].sort((k,M)=>i(k.id)-i(M.id)).map(k=>({type:"strip",id:`strip-${k.id}`,label:k.name,value:k.strip.position,valueText:Gn(k.strip.position),step:_n,defaultValue:Li,resetText:`${Gn(Li)} dB`,ticks:[...Vo],mute:k.strip.mute,solo:k.strip.solo,silent:k.silent,sendsHidden:Xo(Fe(),se),onChange:M=>t.set(k.id,{position:M}),onTypeIn:M=>{const C=Go(M);C!==null&&t.set(k.id,{position:C})},onRemove:M=>n.onRemove(k.id,M),folded:$r.has(k.id),onFold:M=>{$r=Lc(be(),k.id,M),J.render()},foldHelp:X["strip:fold"],foldedHelp:X["strip:folded"],onMove:M=>xr(k.id,M,"[data-nc-strip-grip]"),shade:k.strip.shade,onShade:M=>t.set(k.id,{shade:M??0}),...k.fx?{hacks:u===k.id,hacksLabel:is,hacksEmpty:k.fx.getChain().length===0,onHacks:()=>c(k.id)}:{},pan:{id:`pan-${k.id}`,value:k.strip.pan,ariaLabel:`${k.name} pan`,help:X["strip:pan"],onChange:M=>t.set(k.id,{pan:Math.abs(M)<.005?0:M})},onMute:()=>t.set(k.id,{mute:!k.strip.mute}),onSolo:()=>t.set(k.id,{solo:!k.strip.solo}),sends:["A","B"].map(M=>{const C=M==="A"?"sendA":"sendB",P=k.strip[C];return{id:`send-${M.toLowerCase()}-${k.id}`,label:M,ariaLabel:`${k.name} send ${M}`,min:0,max:Ce,step:_n*2,value:P,valueText:rs(P),defaultValue:0,onChange:F=>t.set(k.id,{[C]:F})}})})),$d=()=>({type:"strip",id:`strip-${We}`,label:"Master",master:!0,sendsHidden:Xo(Fe(),se),onSendsView:vd,sendsView:Ci({hacksShown:u,sendsShown:se}).kind==="sends",sendsViewEmpty:!yg(t.list().map(k=>k.strip)),sendsViewLabel:"Sends",sendsViewHelp:X["sends:view"],...t.masterFx?{hacks:u===We,hacksLabel:is,hacksEmpty:t.masterFx.getChain().length===0,onHacks:()=>c(We)}:{},channels:2,value:t.masterPositionValue,valueText:Gn(t.masterPositionValue),step:_n,defaultValue:Ce,resetText:"0.0 dB",ticks:[...Vo],onChange:k=>t.setMaster(k),onTypeIn:k=>{const M=Go(k);M!==null&&t.setMaster(M)}});let kr=lc(be());const Er=k=>({folded:kr[k],foldSlim:!0,onFold:M=>{kr=cc(be(),k,M),J.render()},foldHelp:X["fx:fold"]});let Vt=Pg(be()),gt=null,Gt=!0;const Sr=k=>{Vt=k,Gt=!0,Dg(be(),k),J.render()},Ar=()=>{const k=t.returns.a,M=t.returns.b,C=u===We&&t.masterFx?{id:We,name:"Master",fx:t.masterFx}:(()=>{const j=t.list().find(ot=>ot.id===u);return j?.fx?{id:j.id,name:j.name,fx:j.fx}:null})();C||(u=null);const P=t.masterFx?.getChain()??[],F=[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:k.on,onToggle:j=>t.setReturn("a",{on:j}),meter:Ra(k.fx)??void 0,meterHelp:X["fx:meter-return"],...Er("a"),controls:[fe("a"),...s("a",k.fx,"plate",["decay","size"])],more:s("a",k.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:M.on,onToggle:j=>t.setReturn("b",{on:j}),meter:Ra(M.fx)??void 0,meterHelp:X["fx:meter-return"],...Er("b"),controls:[fe("b"),...s("b",M.fx,"delay",["delay_beats","feedback"])],more:s("b",M.fx,"delay",["tone","low_cut"])}],U=C?[...pe(C.id,C.name,C.fx,C.id===We?Mi:Pc)]:se?F:[],W=C?.id??"sends",z=U.map(j=>j.id),le=sg(de,W,z,ue);return de={key:W,ids:z,page:le},ue=null,{id:"mix",title:"Mix",summary:`${t.list().map(j=>j.name).join(", ")||"No instruments"} · A Reverb · B Delay · Master ${P.filter(j=>!j.bypass).map(j=>j.name).join(", ")||"no inserts on"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[...xd(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(j=>({value:j.id,label:j.available===!1?`${j.name} (soon)`:j.name,disabled:j.available===!1})),onAdd:j=>n.onAdd(j)}]},{id:"fx",area:"fx",label:C?`${C.name} inserts`:"Send effects",pageSize:Ea,page:le,onPage:j=>{de&&(de={...de,page:j})},controls:U},...Vt?[{id:"meters",area:"meters",label:"VU meters",controls:[]}]:[],{id:"master",area:"master",label:"Master",controls:[$d()]}]}},ne=em(Ar(),Gg),Mr=()=>ne.el.toggleAttribute("data-hacks-folded",Ci({hacksShown:u,sendsShown:se}).kind==="none"&&l.matches);Mr();const Se=document.createElement("button");Se.type="button",Se.className="nc-page-action vu-add",Se.dataset.vuAdd="",Se.textContent="+ Meters",Se.setAttribute("aria-label","Add VU meters"),Se.setAttribute("data-nc-help",X["vu:add"]),Se.addEventListener("click",()=>{Sr(!0),gt?.el.querySelector("[data-vu-remove]")?.focus()}),ne.el.querySelector(".nc-module-end")?.prepend(Se);const Tr=()=>ne.el.toggleAttribute("data-sends-hidden",!se);Tr();const Lr=()=>{Se.hidden=Vt;const k=ne.el.querySelector('[data-nc-section="meters"]');!Vt||!k||(gt??=Vg({onRemove:()=>{Sr(!1),Se.focus()},folded:Rg(be()),onFold:M=>{Gt=!0,Og(be(),M)}}),gt.el.parentElement!==k&&k.append(gt.el))};Lr(),eb(ne.el,n,xr),Zg(ne.el,t,n),ss(ne.el),os(ne.el),tm(e,[ne],"adjacent");const Cr=k=>({peak:Uo(k.peak),rms:Uo(k.rms),over:k.peak>=Qm}),J={module:ne,get hacksShown(){return u},showHacks:d,render(){ne.update(Ar()),Mr(),Lr(),Tr(),ss(ne.el),os(ne.el)},frame(k){if(ne.el.dataset.ncOpen!=="true")return;for(const C of t.list())No(ne.el,`strip-${C.id}`)?.update([Cr(C.levels())],k);const M=t.masterLevels();if(No(ne.el,`strip-${We}`)?.update(M.map(Cr),k),gt&&Vt){const C=t.ctx.state==="running";C&&(Gt=!0),Gt&&(Gt=gt.frame(C?[M[0].rms,M[1].rms]:null,k))}}};return J}const Je=".nc-strip:not([data-nc-master])",Wn=e=>e?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null,Xg="[data-nc-strip-grip], .nc-strip-hd, .nc-strip-fold",Jg=6,Qg=400,Bn=12;function os(e){for(const t of e.querySelectorAll(".nc-strip [data-nc-hacks]"))t.setAttribute("data-nc-help",t.closest("[data-nc-master]")?X["inserts:master"]:X["inserts:channel"]);for(const t of e.querySelectorAll(':is([data-nc-id="mix-a"], [data-nc-id="mix-b"]) .nc-ui-fx-hd .nc-ui-fx-name'))t.setAttribute("data-nc-help",X["mix:sends"])}function ss(e){for(const t of e.querySelectorAll(`${Je} .nc-strip-hd > .nc-strip-name`))t.setAttribute("data-nc-help",X["strip:name"]);for(const t of e.querySelectorAll(`${Je} .nc-strip-hd`))t.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight")}function Zg(e,t,n){e.addEventListener("dblclick",a=>{const i=a.target instanceof Element?a.target.closest(".nc-strip-hd > .nc-strip-name"):null,o=i?.closest(Je),s=Wn(o??null),l=i?.parentElement;if(!s||!l||!n.onRename||l.hasAttribute("data-renaming"))return;const u=t.list().find(h=>h.id===s)?.name??i.textContent??"",d=document.createElement("input");d.type="text",d.className="nc-strip-name-input",d.value=u,d.maxLength=ac,d.spellcheck=!1,d.autocomplete="off",d.setAttribute("aria-label",`Rename ${u}`),d.setAttribute("data-nc-help",X["strip:rename"]),l.setAttribute("data-renaming",""),l.insertBefore(d,i),d.focus(),d.select();let c=!1;const p=h=>{if(c)return;c=!0;const g=d.value;d.remove(),l.removeAttribute("data-renaming"),h&&g!==u&&n.onRename?.(s,g)};d.addEventListener("keydown",h=>{h.key==="Enter"?(h.preventDefault(),p(!0)):h.key==="Escape"&&(h.preventDefault(),p(!1))}),d.addEventListener("blur",()=>p(!0)),d.addEventListener("click",h=>h.stopPropagation())})}function eb(e,t,n){let a=null;const i=()=>{for(const c of e.querySelectorAll("[data-drop]"))c.removeAttribute("data-drop")},o=()=>{a&&(window.clearTimeout(a.timer),a.strip.removeAttribute("data-dragging"),e.removeAttribute("data-strip-drag"),i(),a=null)},s=c=>{c.active=!0,c.strip.setAttribute("data-dragging","true"),e.setAttribute("data-strip-drag",""),c.touch&&!c.grip&&navigator.vibrate?.(10)},l=()=>[...e.querySelectorAll(Je)].map(c=>{const p=c.getBoundingClientRect();return{id:Wn(c)??"",left:p.left,width:p.width}}),u=(c,p)=>{const h=c.strip.parentElement;if(h&&h.scrollWidth>h.clientWidth){const y=h.getBoundingClientRect();p<y.left+Bn*2?h.scrollLeft-=Bn:p>y.right-Bn*2&&(h.scrollLeft+=Bn)}const g=kg(l(),p),b=g?Jo(t.order(),c.id,g):null;c.mark=b?g:null,i(),c.mark&&e.querySelector(`${Je}[data-nc-id="strip-${CSS.escape(c.mark.target)}"]`)?.setAttribute("data-drop",c.mark.side)},d=()=>{const c=p=>{p.stopPropagation(),p.preventDefault()};e.addEventListener("click",c,{capture:!0,once:!0}),window.setTimeout(()=>e.removeEventListener("click",c,{capture:!0}),0)};e.addEventListener("pointerdown",c=>{if(a||c.pointerType==="mouse"&&c.button!==0)return;const p=c.target instanceof Element?c.target:null;if(!p||p.closest("input, .nc-strip-remove, [data-nc-strip-hide], [data-renaming]"))return;const h=p.closest(Xg),g=h?.closest(Je),b=Wn(g??null);if(!h||!g||!b)return;const y={id:b,strip:g,pointerId:c.pointerId,x0:c.clientX,y0:c.clientY,grip:h.matches("[data-nc-strip-grip]"),touch:c.pointerType!=="mouse",active:!1,timer:0,mark:null};a=y,y.touch&&!y.grip&&(y.timer=window.setTimeout(()=>{a===y&&!y.active&&s(y)},Qg)),y.grip&&!y.touch&&c.preventDefault()}),window.addEventListener("pointermove",c=>{const p=a;if(!(!p||c.pointerId!==p.pointerId)){if(!p.active){if(Math.hypot(c.clientX-p.x0,c.clientY-p.y0)<Jg)return;if(p.touch&&!p.grip)return o();s(p)}c.preventDefault(),u(p,c.clientX)}}),e.addEventListener("touchmove",c=>{a?.active&&c.preventDefault()},{passive:!1}),e.addEventListener("contextmenu",c=>{a?.touch&&c.preventDefault()}),window.addEventListener("pointerup",c=>{const p=a;if(!p||c.pointerId!==p.pointerId)return;const h=p.active?p.mark:null,g=p.active;if(o(),!g)return;d();const b=h?Jo(t.order(),p.id,h):null;b&&t.onReorder?.(b.id,b.before)}),window.addEventListener("pointercancel",c=>{a&&c.pointerId===a.pointerId&&o()}),window.addEventListener("keydown",c=>{c.key==="Escape"&&a?.active&&o()}),e.addEventListener("keydown",c=>{if(!c.altKey||c.ctrlKey||c.metaKey||c.shiftKey||c.key!=="ArrowLeft"&&c.key!=="ArrowRight")return;const p=c.target instanceof Element?c.target:null,h=p?.closest(".nc-strip-hd, [data-nc-strip-hide], .nc-strip-fold");if(!p||!h||p.closest("input, [data-nc-strip-grip]"))return;const g=Wn(h.closest(Je));if(!g)return;c.preventDefault();const b=h.matches("[data-nc-strip-hide]")?"[data-nc-strip-hide]":h.matches(".nc-strip-fold")?".nc-strip-fold":".nc-strip-hd :is(button, [tabindex])";n(g,c.key==="ArrowLeft"?-1:1,b)})}const tb=1e-5,nb=2e3,ab=500,fn={parked:!1,quietSince:null};function ib(e,t,n,a){if(t)return fn;if(e.parked)return e;if(!(n<tb))return fn;const i=e.quietSince??a;return{parked:a-i>=nb,quietSince:i}}const Ye=.012,Qa=1024;class rb{ctx;bus;masterFx;master;limiter;masterMeter;masterMeters;insertMeters;returns;park={a:fn,b:fn};masterPosition=Ce;channels=[];listeners=new Set;scratch=new Float32Array(Qa);restore;channelFx;constructor(t,n={}){this.ctx=t,this.restore=n.restore,this.channelFx=n.channelFx;const a=()=>new AnalyserNode(t,{fftSize:Qa});this.bus=new GainNode(t,{gain:1}),this.master=new GainNode(t,{gain:Ke(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(t,mc),this.masterMeter=a(),this.masterMeters=[a(),a()],this.insertMeters={pre:a(),post:a()},this.masterFx=n.masterFx?.()??null,this.bus.connect(this.insertMeters.pre),this.masterFx?(this.bus.connect(this.masterFx.input),this.masterFx.output.connect(this.master),this.masterFx.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(t.destination);const i=new ChannelSplitterNode(t,{numberOfOutputs:2});this.limiter.connect(i),i.connect(this.masterMeters[0],0),i.connect(this.masterMeters[1],1);const o=s=>{const l=new GainNode(t,{gain:1}),u=n.fx?.(s)??null,d=new GainNode(t,{gain:Ke(Ce)}),c=a();return u?(l.connect(u.input),u.output.connect(d)):d.gain.value=0,d.connect(c),d.connect(this.bus),{bus:l,fx:u,gain:d,meter:c,on:u!==null,level:Ce}};this.returns={a:o("a"),b:o("b")}}attach(t,n){let a=this.channels.find(i=>i.id===t);if(a)a.input.disconnect(),a.input=new GainNode(this.ctx,{gain:1}),a.input.connect(a.fx?.input??a.fader);else{const i=new GainNode(this.ctx,{gain:1}),o=new GainNode(this.ctx,{gain:0}),s=new AnalyserNode(this.ctx,{fftSize:Qa}),l=new GainNode(this.ctx,{gain:0}),u=new GainNode(this.ctx,{gain:0}),d=this.channelFx?.(t)??null;d?(i.connect(d.input),d.output.connect(o)):i.connect(o);const c=new GainNode(this.ctx,{gain:1,channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),p=new ChannelSplitterNode(this.ctx,{numberOfOutputs:2}),h=new GainNode(this.ctx,{gain:1}),g=new GainNode(this.ctx,{gain:1}),b=new ChannelMergerNode(this.ctx,{numberOfInputs:2});o.connect(s),o.connect(c).connect(p),p.connect(h,0).connect(b,0,0),p.connect(g,1).connect(b,0,1),b.connect(this.bus),b.connect(l).connect(this.returns.a.bus),b.connect(u).connect(this.returns.b.bus),a={id:t,name:n,input:i,fader:o,stereo:c,split:p,balL:h,balR:g,panner:b,meter:s,sendA:l,sendB:u,fx:d,strip:this.restore?.(t)??vc},this.channels.push(a),this.apply()}return this.emit(),a.input}rename(t,n){const a=this.channels.find(i=>i.id===t);!a||a.name===n||(a.name=n,this.emit())}detach(t){const n=this.channels.findIndex(i=>i.id===t);if(n<0)return;const[a]=this.channels.splice(n,1);if(a){for(const i of[a.input,a.fader,a.stereo,a.split,a.balL,a.balR,a.panner,a.meter,a.sendA,a.sendB])i.disconnect();a.fx?.output.disconnect(),a.fx?.dispose(),this.apply(),this.emit()}}tapNode(t){return t==="master"?this.limiter:this.channels.find(n=>n.id===t)?.panner??null}tapLatency(t,n){const a=o=>{const s=o?.latencySamples;return typeof s=="number"&&Number.isFinite(s)&&s>0?Math.round(s):0};if(t==="master")return Math.max(0,Math.round(n))+a(this.masterFx);const i=this.channels.find(o=>o.id===t);return i?a(i.fx):null}set(t,n){const a=this.channels.find(i=>i.id===t);a&&(a.strip={...a.strip,...n},this.apply(),this.emit())}setMaster(t){this.masterPosition=t,this.master.gain.setTargetAtTime(Ke(t),this.ctx.currentTime,Ye),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(t,n){const a=this.returns[t],i=this.ctx.currentTime;n.on!==void 0&&(a.on=n.on&&a.fx!==null,a.bus.gain.setTargetAtTime(a.on?1:0,i,Ye),this.wakeFed()),n.level!==void 0&&(a.level=n.level,a.fx&&a.gain.gain.setTargetAtTime(Ke(a.level),i,Ye)),this.emit()}fed(t){const n=this.returns[t];if(!n.on||!n.fx)return!1;const a=t==="a"?"sendA":"sendB";return this.channels.some(i=>Ke(i.strip[a])>0)}setParked(t,n){const a=this.returns[t];a.fx&&(n?(a.bus.disconnect(a.fx.input),a.fx.output.disconnect(a.gain)):(a.bus.connect(a.fx.input),a.fx.output.connect(a.gain)))}wakeFed(){for(const t of["a","b"])this.park[t].parked&&this.fed(t)&&(this.park[t]=fn,this.setParked(t,!1))}parkIdleReturns(t=performance.now()){for(const n of["a","b"]){const a=this.park[n],i=ib(a,this.fed(n),a.parked?0:this.levelsOf(this.returns[n].meter).peak,t);this.park[n]=i,i.parked!==a.parked&&this.setParked(n,i.parked)}}returnParked(t){return this.park[t].parked}setTempo(t,n){for(const a of[this.returns.a.fx,this.returns.b.fx,this.masterFx])a?.setTempo(t,n);for(const a of this.channels)a.fx?.setTempo(t,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(t){return this.levelsOf(this.returns[t].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const t=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||t&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}apply(){const t=Jm(this.channels.map(a=>a.strip)),n=this.ctx.currentTime;this.channels.forEach((a,i)=>{a.fader.gain.setTargetAtTime(t[i]??0,n,Ye),a.sendA.gain.setTargetAtTime(Ke(a.strip.sendA),n,Ye),a.sendB.gain.setTargetAtTime(Ke(a.strip.sendB),n,Ye);const[o,s]=eg(a.strip.pan);a.balL.gain.setTargetAtTime(o,n,Ye),a.balR.gain.setTargetAtTime(s,n,Ye)}),this.wakeFed()}levelsOf(t){return t.getFloatTimeDomainData(this.scratch),Zm(this.scratch)}emit(){for(const t of this.listeners)t()}}const lr="studio";function ob(){let e=null;const t=new Set,n=new Set,a=new Set,i=new Map,o=d=>{try{return i.get(d)?.()===!0}catch{return!1}},s=d=>{for(const c of[...d])try{c()}catch{}},l=d=>{if(d!==e){e=d;for(const c of n)c()}},u=(d,c)=>(d.add(c),()=>{d.delete(c)});return{owner:()=>e,claim(d){e===null&&l(d)},claimAll(){l(lr),s(t)},clear:()=>l(null),onAll:d=>u(t,d),member(d,c){return i.set(d,c),()=>{i.get(d)===c&&i.delete(d)}},out(d){for(const c of i.keys())if(c!==d&&o(c))return;s(a)},drop:d=>{i.delete(d)},onLastOut:d=>u(a,d),playing:()=>[...i.keys()].filter(o),onChange:d=>u(n,d)}}const ls="netcomposer.studio.plugins.frozen.v1",sb=2e3;function lb(e,t){const n=[],a=new Set;for(const i of t)i.plugin?.status!=="failed"||i.plugin.error!==Jn[6]||(a.add(i.id),e.has(i.id)||n.push(i));for(const i of[...e])a.has(i)||e.delete(i);for(const i of a)e.add(i);return n}function cb(e){const t=new Map;for(const n of e)for(const a of n)a.plugin?.status==="ready"&&!t.has(a.plugin.id)&&t.set(a.plugin.id,a.plugin.name);return[...t].map(([n,a])=>({id:n,name:a}))}function db(e){let t=[];const n=()=>{if(!e)return t;try{const i=JSON.parse(e.getItem(ls)??"[]");return Array.isArray(i)?i.filter(o=>typeof o=="string"):[]}catch{return[]}},a=i=>{t=i;try{e?.setItem(ls,JSON.stringify(i))}catch{}};return{has:i=>n().includes(i),list:n,add(i){a([...new Set([...n(),...i])])},clear(i){const o=n();o.includes(i)&&a(o.filter(s=>s!==i))}}}function ub(e){let t=!1;const n=(e.watch??Cu)(e.ctx,{stallMs:e.stallMs??sb,onStall:()=>{if(t)return;const a=e.running();a.length&&(t=!0,n.stop(),e.onFrozen(a))}});return{stop:()=>n.stop()}}const pb="audio/wav";function hb(e){const t=a=>String(a).padStart(2,"0");return`netcomposer-studio-${`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}-${t(e.getHours())}${t(e.getMinutes())}`}.wav`}function fb(e,t){const n=Math.min(e.length,t.length),a=new Uint8Array(n*6);let i=0;for(let o=0;o<n;o++)for(const s of[e[o]??0,t[o]??0]){const l=Math.max(-1,Math.min(1,s)),u=Math.round(l<0?l*8388608:l*8388607);a[i++]=u&255,a[i++]=u>>8&255,a[i++]=u>>16&255}return a}function mb(e,t){const i=e*2*3,o=new ArrayBuffer(44),s=new DataView(o),l=(u,d)=>{for(let c=0;c<4;c++)s.setUint8(u+c,d.charCodeAt(c))};return l(0,"RIFF"),s.setUint32(4,36+i,!0),l(8,"WAVE"),l(12,"fmt "),s.setUint32(16,16,!0),s.setUint16(20,1,!0),s.setUint16(22,2,!0),s.setUint32(24,t,!0),s.setUint32(28,t*2*3,!0),s.setUint16(32,6,!0),s.setUint16(34,24,!0),l(36,"data"),s.setUint32(40,i,!0),new Uint8Array(o)}class gb{constructor(t,n){this.ctx=t,this.source=n}node=null;id=0;phase="idle";parts=[];frames=0;from=0;why="now";done=null;listeners=new Set;attach(){const t=this.source();if(this.node||!t)return;const n=new AudioWorkletNode(this.ctx,"nc-studio-rec",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n}get supported(){return typeof AudioWorkletNode<"u"}get state(){return this.phase}get started(){return this.phase==="recording"||this.phase==="stopping"?{from:this.from,why:this.why}:null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}arm(t=!1){this.phase==="idle"&&(this.attach(),this.node&&(this.id++,this.parts=[],this.frames=0,this.set("arming"),this.node.port.postMessage({type:"arm",id:this.id,force:t})))}schedule(t){this.phase!=="arming"&&this.phase!=="armed"||this.node?.port.postMessage({type:"at",id:this.id,at:t})}cancel(){this.phase!=="arming"&&this.phase!=="armed"||(this.node?.port.postMessage({type:"cancel",id:this.id}),this.parts=[],this.id++,this.set("idle"))}stop(){return this.phase!=="recording"||!this.node?Promise.resolve(null):(this.set("stopping"),new Promise(t=>{this.done=t,this.node?.port.postMessage({type:"stop",id:this.id})}))}set(t){if(this.phase!==t){this.phase=t;for(const n of this.listeners)n()}}message(t){if(t.id===this.id){if(t.type==="rec")t.phase==="armed"&&this.phase==="arming"?this.set("armed"):t.phase==="recording"&&(this.phase==="arming"||this.phase==="armed")?(this.from=t.from??0,this.why=t.why??"now",this.set("recording")):t.phase==="idle"&&this.phase==="stopping"&&this.finish(null);else if(t.type==="rec-data"){const[n,a]=t.channels??[];if(!n||!a)return;this.parts.push(fb(n,a)),this.frames+=n.length}else if(t.type==="rec-done"){const n=t.sampleRate??this.ctx.sampleRate,a=new Blob([mb(this.frames,n),...this.parts],{type:pb});this.finish({blob:a,name:hb(new Date),seconds:this.frames/n,from:t.from??this.from,why:this.why})}}}finish(t){this.parts=[],this.frames=0;const n=this.done;this.done=null,this.set("idle"),n?.(t)}}const Dc="netcomposer.studio.picker.v1",cs="http://127.0.0.1:5177",bb=1,Ft=16,ds=64*1024*1024,us=[1e3,2e3,5e3,1e4],yb=new Set(["127.0.0.1","localhost","[::1]"]);function cr(e){if(typeof e!="string"||!e||e.length>64)return null;let t;try{t=new URL(e)}catch{return null}return t.protocol!=="http:"||!yb.has(t.hostname)||!t.port||t.username||t.password||e.replace(/\/$/,"")!==t.origin?null:t.origin}function Rc(e){try{const t=JSON.parse(e?.getItem(Dc)??"null"),n=t&&typeof t=="object"?t:{};return{on:n.on===!0,address:cr(n.address)??cs}}catch{return{on:!1,address:cs}}}function Fi(e,t){try{e?.setItem(Dc,JSON.stringify(t))}catch{}}function wb(e){let t=[];try{const n=e.pads();Array.isArray(n)&&(t=n)}catch{}return Array.from({length:Ft},(n,a)=>{const i=t[a]&&typeof t[a]=="object"?t[a]:{};return{pad:a+1,name:typeof i.name=="string"?i.name.slice(0,40):"",filled:i.filled===!0}})}const Za=e=>({ok:!1,placed:[],left:[],message:e}),ei=e=>Array.isArray(e)?e.filter(t=>Number.isInteger(t)&&t>=1&&t<=Ft).slice(0,16):[];function vb(e){const t=e&&typeof e=="object"?e:{};return{ok:t.ok===!0,placed:(Array.isArray(t.placed)?t.placed:[]).flatMap(n=>{const a=n&&typeof n=="object"?n:{},[i]=ei([a.from]),[o]=ei([a.to]);return i&&o?[{from:i,to:o}]:[]}).slice(0,Ft),left:ei(t.left),message:typeof t.message=="string"?t.message.slice(0,400):""}}function xb(e){const t=e&&typeof e=="object"?e:{};return t.type!=="kit"||typeof t.id!="string"||!/^[\w-]{1,40}$/.test(t.id)||typeof t.target!="string"||!t.target||t.target.length>64?null:{id:t.id,target:t.target,mode:t.mode==="fill"?"fill":"replace"}}function $b(e){const t=new Map,n=new Map,a=new Set,i=new Map,o=e.now??(()=>Date.now()),s=e.setTimeout??((E,L)=>setTimeout(E,L)),l=e.clearTimeout??(E=>clearTimeout(E)),u=E=>e.live?.(E)??!0;let d="off",c="",p=0,h=null,g=null,b="";const y=E=>{E!==d&&(d=E,e.onStatus?.(E))},f=()=>[...t.entries()].filter(([E])=>u(E)).map(([E,L])=>{const N=e.brandOf?.(E);return{id:E,name:(e.nameOf?.(E)??E).slice(0,40),...N?{brand:N.slice(0,40)}:{},shown:e.shown?.()===E,seen:n.get(E)??0,pads:wb(L)}}),w=E=>{const L=f();return b=JSON.stringify(L),JSON.stringify({v:bb,studio:e.studio,label:(e.label?.()??"Studio").slice(0,60),targets:L,results:[...i.entries()].map(([N,q])=>({id:N,...q})),wait:E})},m=(E,L)=>e.fetch(`${c}/api/studio/poll`,{method:"POST",headers:{"content-type":"application/json"},body:w(E),cache:"no-store",...L?{signal:L}:{},targetAddressSpace:"loopback"}),$=async(E,L)=>{if(!E.ok)throw new Error(`the picker said ${E.status}`);const N=await E.json();if(L!==p)return;if(y("on"),Array.isArray(N.ack))for(const _ of N.ack)typeof _=="string"&&i.delete(_);const q=Array.isArray(N.commands)?N.commands:[];for(const _ of q.slice(0,4)){const V=xb(_);V&&x(V,L)}},T=async E=>{let L=0,N=!1;for(;E===p;){const q=new AbortController;h=q;try{await $(await m(N,q.signal),E),L=0,N=!0}catch{if(E!==p)return;N=!1,y("away");const _=us[Math.min(L++,us.length-1)];await new Promise(V=>s(V,_))}}},S=()=>{!c||g!==null||(g=s(()=>{g=null;const E=p;!c||d!=="on"||!i.size&&JSON.stringify(f())===b||m(!1).then(L=>$(L,E)).catch(()=>{})},150))},v=async E=>{const L=await e.fetch(E,{cache:"no-store",targetAddressSpace:"loopback"});if(!L.ok){const N=await L.json().catch(()=>({}));throw new Error(typeof N.error=="string"?N.error.slice(0,120):`the picker said ${L.status}`)}return L},x=async(E,L)=>{if(i.has(E.id))return;let N;const q=t.get(E.target);if(!q||!u(E.target))N=Za("That NYX isn't in the Studio any more.");else if(a.has(E.target))N=Za("NYX is still loading the last kit.");else{a.add(E.target);try{const _=await(await v(`${c}/api/kit/manifest`)).json(),V=Array.isArray(_.sounds)?_.sounds:[];if(!V.length)throw new Error("the picker's pads are empty");if(V.length>Ft)throw new Error(`more than ${Ft} sounds`);const de={};for(const ue of V){const Q=ue&&typeof ue=="object"?ue.pad:null;if(typeof Q!="number"||!Number.isInteger(Q)||Q<1||Q>Ft||de[Q])throw new Error("a sound has no pad of its own");const Z=await v(`${c}/api/kit/audio?pad=${Q}`);if(Number(Z.headers.get("content-length")??0)>ds)throw new Error(`pad ${Q}'s sound is too big`);const B=await Z.arrayBuffer();if(B.byteLength>ds)throw new Error(`pad ${Q}'s sound is too big`);de[String(Q)]=B}if(L!==p)return;e.reveal?.(E.target),N=vb(await q.receive(_,E.mode,de))}catch(_){N=Za(`Not loaded: ${_.message||"it went wrong"}.`)}finally{a.delete(E.target)}}L===p&&(i.set(E.id,N),S())},A=()=>{p++,h?.abort(),h=null,g!==null&&l(g),g=null,c="",i.clear(),y("off")};return{host(E){return{pickerTarget(L){return t.set(E,L),S(),{changed:S,remove(){t.get(E)===L&&t.delete(E),S()}}}}},start(E){const L=cr(E);L&&(A(),c=L,y("connecting"),T(++p))},stop:A,seen(E){n.set(E,o()),t.has(E)&&S()},changed:S,forget(E){t.delete(E),n.delete(E),S()},targets:f,get status(){return d}}}const kb="NetComposer Studio",_e=[40,240],Eb="nc-sync";function Sb(e,t=globalThis.navigator?.locks){const n=`/studio/${e}`;return{channel:`${Eb}${n}`,locks:t?{request:(a,i,o)=>t.request(`${a}${n}`,i,o)}:null}}function Ab(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}const Mb=.2,ps=.5;function Tb(e,t,n){const a=new Fd({bpm:120,minBpm:_e[0],maxBpm:_e[1],timebase:"shared"}),i=new Ud({app:kb,version:"0.1.0",clock:a,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:_e},startLeadSeconds:Mb,...n?{startGate:()=>n(),gatedStartLeadSeconds:ps}:{},...t?{channel:t.channel,locks:t.locks}:{},audio:()=>{const u=e();return u==="running"?"running":u==="closed"?"none":"needs-gesture"}});let o=!1,s=0,l=!1;return{clock:a,peer:i,async start(){o||(o=!0,await i.start())},play(){const u=n?.()??null;if(!u){l=!1,a.play({at:De()});return}const d=++s,c=De();l=!0;const p=()=>{d!==s||!l||(l=!1,i.isLeader&&!a.transport.running?(a.commitStart(Math.max(c,De())+ps,0),i.publishState()):a.play({at:De()}))};u.then(p,p)},stop(){l&&(l=!1,s++,!a.transport.running)||a.stop({at:De()})},setTempo:u=>a.setTempo({bpm:Lb(u)}),playing:()=>a.transport.isPlayingAt(De()),running:()=>l||a.transport.running,bpm:()=>a.transport.bpm,position(){const u=a.transport,d=De();return u.isPlayingAt(d)?Cb(u.beatAt(d)):null},beatPhase(){const u=a.transport,d=De();if(!u.isPlayingAt(d))return null;const c=u.beatAt(d);return c-Math.floor(c)},peers:()=>[...i.peers.values()]}}function Lb(e){return Number.isFinite(e)?Math.min(_e[1],Math.max(_e[0],Math.round(e*10)/10)):120}function Cb(e){const t=Math.max(0,Math.floor(e));return{bar:Math.floor(t/4)+1,beat:t%4+1}}const zi="netcomposer.scene",Oc=1,Ic="netcomposer.studio.tempo.v1",qc="netcomposer.studio.scene-name.v1",ca=120,dr="Untitled scene",Nb=2*1024*1024;function Sa(e){const t=typeof e=="number"?e:Number(e);return Number.isFinite(t)?Math.min(_e[1],Math.max(_e[0],Math.round(t*10)/10)):ca}function mt(e){return(typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,60):"")||dr}function Fb(e){return{format:zi,v:Oc,name:mt(e.name),saved:(e.now??new Date).toISOString(),tempo:{bpm:Sa(e.bpm)},meter:[4,4],instances:e.instances.map(t=>({id:t.id,type:t.type,name:t.name})),mix:e.mix,presets:e.presets??{},media:e.media??[]}}function zb(e,t){if(e.length>Nb)return{ok:!1,error:"That file is too large to be a Scene."};let n;try{n=JSON.parse(e)}catch{return{ok:!1,error:"That file isn't a Scene (it isn't JSON)."}}if(!n||typeof n!="object")return{ok:!1,error:"That file isn't a Scene."};const a=n;if(a.format!==zi)return{ok:!1,error:"That file isn't a Scene. Load an instrument's own file from that instrument."};if((typeof a.v=="number"?a.v:0)<1)return{ok:!1,error:"That Scene has no version."};const o=new Set,s=[];for(const d of Array.isArray(a.instances)?a.instances:[]){if(!d||typeof d!="object")continue;const c=d.id;if(typeof c!="string")continue;const p=ar(c);if(!p||!t.includes(p.type)||o.has(c))continue;o.add(c);const h=d.name;s.push({id:c,type:p.type,name:ic(h,"")})}if(!s.length)return{ok:!1,error:"That Scene has no instruments this Studio knows."};const l=a.tempo&&typeof a.tempo=="object"?a.tempo.bpm:void 0,u={};if(a.presets&&typeof a.presets=="object")for(const[d,c]of Object.entries(a.presets))o.has(d)&&(u[d]=c);return{ok:!0,scene:{format:zi,v:Oc,name:mt(a.name),saved:typeof a.saved=="string"?a.saved:"",tempo:{bpm:Sa(l)},meter:[4,4],instances:s,mix:xc(a.mix??wn()),presets:u,media:Array.isArray(a.media)?a.media:[]}}}function Pb(e){return`${mt(e).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"scene"}.scene.json`}function Db(e){try{const t=e?.getItem(Ic);return t?Sa(Number(t)):ca}catch{return ca}}function _c(e,t){try{t?.setItem(Ic,String(Sa(e)))}catch{}}function Rb(e){try{return mt(e?.getItem(qc))}catch{return dr}}function Bc(e,t){try{t?.setItem(qc,mt(e))}catch{}}const Ob=300,Ib=120*1e3;function qb(e){return Object.prototype.toString.call(e)==="[object Float32Array]"}function _b(e){const t=e&&typeof e=="object"?e:null;if(!t)return{ok:!1,message:"No audio."};const n=typeof t.name=="string"?t.name.trim().slice(0,64):"";if(!n)return{ok:!1,message:"The audio has no name."};const a=t.sampleRate;if(typeof a!="number"||!Number.isFinite(a)||a<8e3||a>192e3)return{ok:!1,message:"The sample rate is out of range (8–192 kHz)."};const i=t.channels;if(!Array.isArray(i)||i.length<1||i.length>2)return{ok:!1,message:"The audio needs one or two channels."};if(!i.every(qb))return{ok:!1,message:"Channels must be 32-bit float arrays."};const o=i[0].length;if(o===0)return{ok:!1,message:"The audio is empty."};if(i.some(u=>u.length!==o))return{ok:!1,message:"The channels differ in length."};if(o>Ob*a)return{ok:!1,message:"The audio is longer than five minutes."};const s=typeof t.bars=="number"&&Number.isInteger(t.bars)&&t.bars>=1&&t.bars<=256?t.bars:void 0,l=typeof t.bpm=="number"&&Number.isFinite(t.bpm)&&t.bpm>=20&&t.bpm<=300?t.bpm:void 0;return{ok:!0,audio:{name:n,sampleRate:a,channels:i.map(u=>new Float32Array(u)),...s===void 0?{}:{bars:s},...l===void 0?{}:{bpm:l}}}}function hs(e){try{const t=e.targets();return Array.isArray(t)?t.flatMap(n=>{if(!n||typeof n.id!="string"||!n.id)return[];const a=typeof n.name=="string"&&n.name?n.name.slice(0,64):n.id;return[{id:n.id,name:a,...n.filled?{filled:!0}:{}}]}):[]}catch{return[]}}function Bb(e={}){const t=new Map,n=s=>e.live?.(s)??!0,a=s=>e.nameOf?.(s)??s,i=e.answerMs??Ib,o=s=>[...t.entries()].filter(([l])=>l!==s&&n(l)).map(([l,u])=>{const d=e.brandOf?.(l);return{instance:l,name:a(l),...d?{brand:d}:{},label:typeof u.label=="string"&&u.label?u.label.slice(0,24):"Target",targets:hs(u)}});return{forget(s){t.delete(s)},host(s){return{audioReceivers:()=>o(s),async sendAudio(l,u,d){const c=t.get(l);if(l===s||!c||!n(l))return{ok:!1,reason:"gone",message:"That instrument isn't in the Studio."};if(typeof d!="string"||!hs(c).some(b=>b.id===d))return{ok:!1,reason:"invalid",message:`No ${d} there.`};const p=_b(u);if(!p.ok)return{ok:!1,reason:"invalid",message:p.message};const h={...p.audio,from:s,fromName:e.brandOf?.(s)??a(s)};let g;try{const b=await Promise.race([Promise.resolve(c.receive(h,d)),new Promise(y=>{g=setTimeout(()=>y({ok:!1,reason:"timeout",message:"No answer."}),i)})]);return!b||typeof b!="object"||typeof b.ok!="boolean"?{ok:!1,reason:"error",message:"The instrument didn't answer."}:b}catch(b){return{ok:!1,reason:"error",message:b instanceof Error?b.message:String(b)}}finally{clearTimeout(g)}},onAudio(l){return t.set(s,l),()=>{t.get(s)===l&&t.delete(s)}},reveal(){n(s)&&e.reveal?.(s)}}}}}const jb="/studio/assets/silence-processor-CMfx2MIS.js";function Hb(e,t=rr){const n=t.find(o=>o.id===e.type),a=(n?.name??e.type).toUpperCase(),i=String(e.n).padStart(2,"0");return{brand:n?.brand??a,rest:e.custom&&e.name?` / ${e.name.toUpperCase()}`:` / ${a} / ${i}`,...n?.identity?{identity:n.identity}:{}}}const Pi=Mp,Oe=Ap,ti={system:"System",light:"Light",dark:"Dark"};function Ub(e){try{return Bi(e?.getItem(Pi))}catch{return"system"}}function Vb(e,t){try{t==="system"?e?.removeItem(Pi):e?.setItem(Pi,t)}catch{}}const Gb=e=>Oe[(Oe.indexOf(e)+1)%Oe.length]??"system";function Wb(e){try{return e.contentDocument?.documentElement?e.contentDocument:null}catch{return null}}function jc(e,t){const n=Wb(e);n&&ji(t,n)}function Yb(e,t){const n=document.createElement("div");n.className="theme",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Theme"),n.dataset.theme="";let a=e;const i=Oe.map(s=>{const l=document.createElement("button");l.type="button",l.className="ghost theme-choice",l.setAttribute("role","radio"),l.dataset.themeChoice=s;const u=document.createElement("span");return u.className="theme-word",u.textContent=ti[s],l.append(u),l.setAttribute("aria-label",`${ti[s]} theme`),l.title=s==="system"?"Follow this computer's light or dark setting":`${ti[s]} theme`,l.addEventListener("click",()=>{const d=n.closest(".nc-page-menu[data-nc-open]")!==null,c=s===a&&!d?Gb(s):s;o(c),t(c),i[Oe.indexOf(c)]?.focus({preventScroll:!0})}),l});n.append(...i);function o(s){a=s;for(const l of i){const u=l.dataset.themeChoice===s;l.setAttribute("aria-checked",u?"true":"false"),l.tabIndex=u?0:-1}}return o(e),n.addEventListener("keydown",s=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(s.key))return;s.preventDefault();const l=s.key==="ArrowLeft"||s.key==="ArrowUp"?-1:1,u=(Oe.indexOf(a)+l+Oe.length)%Oe.length,d=Oe[u]??"system";o(d),t(d),i[u]?.focus()}),{el:n,get choice(){return a},set:o}}function Kb(e,t){const n=e.addModule.bind(e),a=new Map;return Object.defineProperty(e,"addModule",{value:(o,s)=>{const l=new URL(String(o),t).href;let u=a.get(l);return u||(u=n(o,s),a.set(l,u),u.catch(()=>{a.get(l)===u&&a.delete(l)})),u},configurable:!0}),e}const Y=new AudioContext({latencyHint:"interactive"});Kb(Y.audioWorklet,location.href);const ur=db(be()),Xb=new URLSearchParams(location.search).has("plugins"),Jb=Xb,mn=hg({ctx:Y,moduleUrl:ln,base:location.href,remote:Jb,store:Gm(),frozen:ur});function fs(e,t){mn?.restore(e.getChain().flatMap(i=>i.plugin?[i.plugin]:[])),pr.add(e);let n=e.getChain().length;const a=new Set;return e.onChange(i=>{if(i.key==="error"||i.key==="plugin"){He?.render();for(const s of lb(a,e.getChain()))tn({message:D.stuck(s.plugin?.name??s.name,t()),duration:12e3,anchor:document.querySelector("[data-nc-area='fx']")}).el.dataset.pluginStuck=s.plugin?.id??s.id}const o=e.getChain().length;o!==n&&(n=o,queueMicrotask(()=>He?.render()))}),e}function Qb(e){return te.list().find(t=>t.id===e)?.name??e}const pr=new Set,ye=rg(),_t={},Zb=Pc,Aa=new Map,te=new rb(Y,{restore:e=>ye.channels[e],fx:e=>{const t=Oa(Y,{moduleUrl:ln,bpm:120,state:hc(e,ye)});return _t[e]=t,t},masterFx:()=>{const e=Oa(Y,{moduleUrl:ln,bpm:120,slots:Mi,state:Cm(ye,Mi)});return e.onChange($n),fs(e,()=>"Master")},channelFx:e=>{ma.delete(e);const t=Oa(Y,{moduleUrl:ln,bpm:G.bpm(),slots:Zb,state:ye.channelFx[e]??{v:2,chain:[]}}),n=Hs(t,G.clock,{mapper:rt}),a=t.dispose.bind(t);return t.dispose=()=>{n(),a()},t.onChange($n),Aa.set(e,t),t.dispose=(i=>()=>{pr.delete(t),i()})(t.dispose),fs(t,()=>Qb(e))}});te.setMaster(ye.master);te.setReturn("a",ye.returns.a);te.setReturn("b",ye.returns.b);let Hc=()=>!1;const rt=new Hd(Y,{hold:()=>Hc()});rt.start();const Uc=Ab();let Vc=()=>{};const Gc=_m(Y.sampleRate),hr=Pm(Y,{nodeFor:e=>te.tapNode(e),latencyFor:e=>te.tapLatency(e,Gc.get()),sources:()=>[{id:"master",name:"Master"},...te.list().map(e=>({id:e.id,name:e.name}))],ready:new Promise(e=>{Vc=e})}),$e=ob(),zt=mm(()=>{try{return globalThis.sessionStorage??null}catch{return null}}),Wc=e=>I.some(t=>t.id===e),Yc=e=>I.find(t=>t.id===e)?.name??e,Kc=e=>{const t=I.find(a=>a.id===e),n=xe.find(a=>a.id===t?.type)?.brand;return t&&n?t.n===1?n:`${n} ${t.n}`:void 0},Xc=e=>{je(e),document.getElementById(`tab-${e}`)?.scrollIntoView({block:"nearest"}),ke.get(e)?.contentWindow?.focus()},Jc=Bb({live:Wc,nameOf:Yc,brandOf:Kc,reveal:Xc}),Qe=$b({fetch:(e,t)=>fetch(e,t),studio:`studio-${Math.random().toString(36).slice(2,10)}`,label:()=>ht.value.trim()||"Studio",live:Wc,nameOf:Yc,brandOf:Kc,shown:()=>Ne,reveal:Xc,onStatus:e=>vr(e)});let Qc=!1;const fr=Am(),Zc=Em({now:()=>Y.currentTime,labelOf:e=>{const t=I.find(a=>a.id===e),n=xe.find(a=>a.id===t?.type)?.brand??t?.name??e;return t&&t.n>1?`${n} ${t.n}`:n},clearOf:()=>[ad,ha,rd]});window.ncStudio=ym(Y,te,{countIn:Zc.api,holdFirstPlay:()=>fr.hold(),presets:zt,share:Jc,picker:Qe,grab:hr,play:$e,mapper:Dm(rt),resolve:(e,t)=>iy(e,t),syncScope:Uc,fxWorklet:new URL(ln,location.href).href});const G=Tb(()=>Y.state,Sb(Uc),()=>Qc&&Y.state==="running"&&rt.ready&&fr.count===0?null:cy());Hc=()=>G.clock.transport.isPlayingAt(De());function we(){try{return globalThis.localStorage??null}catch{return null}}G.setTempo(Db(we()));const me=new gb(Y,()=>te.tapNode("master"));let nn=null;function O(e,t={},...n){const a=document.createElement(e);for(const[i,o]of Object.entries(t))o===void 0||o===!1||a.setAttribute(i,o===!0?"":String(o));return a.append(...n),a}const vn=O("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),Bt=O("input",{type:"number",class:"bpm",min:_e[0],max:_e[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),da=O("output",{class:"position","aria-label":"Bar and beat"},"—"),Ze=O("button",{type:"button",class:"btn rec","aria-pressed":"false","data-state":"idle","data-nc-help":X["transport:rec"]},"Rec"),an=O("a",{class:"take",hidden:!0}),mr=O("span",{class:"status",role:"status"}),ht=O("input",{type:"text",class:"scene-name",maxlength:60,value:Rb(we()),"aria-label":"Scene name",title:"Scene name (used when you Save)"}),ed=O("button",{type:"button",class:"ghost","data-scene":"save",title:"Save this Scene as a file"},"Save"),td=O("button",{type:"button",class:"ghost","data-scene":"load",title:"Load a Scene file"},"Load"),nd=O("button",{type:"button",class:"ghost","data-scene":"new",title:"Start a new Scene"},"New"),gn=O("input",{type:"file",accept:".json,application/json",hidden:!0}),at=O("button",{type:"button",class:"ghost picker-link","data-picker":"off","aria-pressed":"false"},O("span",{class:"picker-dot","aria-hidden":"true"}),"Picker"),gr=Yb(Ub(we()),e=>{Vb(we(),e),ji(e);for(const t of ke.values())jc(t,e)});ji(gr.choice);const ad=O("h1",{class:"brand","aria-label":"NetComposer Studio"},O("span",{"aria-hidden":"true"},"NetComposer",O("span",{class:"brand-sep"}," / "),"Studio")),Di=O("span",{class:"beat-light","aria-hidden":"true"}),ua=O("span",{class:"status-long"}),pa=O("span",{class:"status-short"});mr.append(ua,pa);const ha=O("header",{class:"top"},O("div",{class:"transport"},vn,O("label",{class:"tempo"},Bt,O("span",{class:"tempo-unit"},"BPM")),Di,da),O("div",{class:"record"},Ze,an),mr),id=O("div",{class:"scene-actions"},ht,ed,td,nd,at,gr.el),ey=Wf({panel:id}),rd=O("div",{class:"scene",role:"group","aria-label":"Scene"},id,gn,ey.button);me.supported||(Ze.disabled=!0,Ze.title="This browser can't record audio");const Ut=O("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),od=O("div",{class:"stage"}),Sn=O("label",{class:"tab tab-add",title:"Add an instrument"},O("span",{"aria-hidden":"true"},"+")),Pt=O("select",{class:"tab-add-select","aria-label":"Add an instrument"});Pt.append(O("option",{value:""},"Add an instrument"),...rr.map(e=>{const t=O("option",{value:e.id},e.available===!1?`${e.name} (soon)`:e.name);return t.disabled=e.available===!1,t}));Pt.addEventListener("change",()=>{const e=Pt.value;Pt.value="",e&&fd(e)});Sn.append(Pt);Ut.append(Sn);Hf();const xn=O("div",{class:"spine","aria-hidden":"true"}),ke=new Map;let I=cm(lm(xe),xe),Ne=I[0]?.id??"";const ty=new URLSearchParams(location.search).has("measure"),ms=new Map,ny=2e4;function sd(e){const t=O("button",{type:"button",role:"tab",id:`tab-${e.id}`,"aria-controls":`panel-${e.id}`,class:"tab"},e.name);t.addEventListener("click",()=>je(e.id)),Ut.insertBefore(t,Sn);const a=(ms.get(e.type)??Promise.resolve()).then(()=>new Promise(i=>{if(!I.some(l=>l.id===e.id))return i();const o=O("iframe",{id:`panel-${e.id}`,role:"tabpanel","aria-labelledby":`tab-${e.id}`,title:e.name,src:rm(e,ty),allow:"autoplay; clipboard-read; clipboard-write; microphone"});ke.set(e.id,o);const s=window.setTimeout(i,ny);o.addEventListener("load",()=>ay(o)),o.addEventListener("load",()=>{window.clearTimeout(s),i()},{once:!0}),od.append(o),je(Ne)}));return ms.set(e.type,a),a}const ld=window.matchMedia(Js);function cd(e){try{e.contentDocument?.documentElement.toggleAttribute("data-nc-landscape",ld.matches)}catch{}}ld.addEventListener("change",()=>{for(const e of ke.values())cd(e)});function ay(e){let t=null;try{t=e.contentDocument}catch{return}if(!t?.documentElement)return;t.documentElement.dataset.ncHosted="",jc(e,gr.choice),cd(e);const n=e.id.replace(/^panel-/,""),a=()=>{const o=t?.querySelector(".nc-page"),s=o?o.getBoundingClientRect().height:t?.documentElement.scrollHeight??0;s>0&&(e.style.height=`${Math.ceil(s)}px`);const l=t?.querySelector(".nc-page-hd, .nc-title-band");l&&(ud.set(n,Math.round(l.getBoundingClientRect().bottom)),n===Ne&&pd())};a();const i=t.querySelector(".nc-page")??t.body;i&&new ResizeObserver(()=>{a(),Ma()}).observe(i),br.add(e),dd(e)}const br=new Set;function dd(e){let t;try{t=e.contentDocument?.documentElement}catch{return}if(!t||!e.isConnected){br.delete(e);return}const n=e.getBoundingClientRect();if(n.height<=0)return;const a=getComputedStyle(ha).position==="sticky"?ha.getBoundingClientRect().bottom:0,i=Math.min(n.height,Math.max(0,a-n.top)),o=Math.max(i,Math.min(n.height,window.innerHeight-n.top));t.style.setProperty("--nc-host-top",`${Math.round(i)}px`),t.style.setProperty("--nc-host-height",`${Math.round(o-i)}px`),t.style.setProperty("--nc-host-bottom",`${Math.round(n.height-o)}px`)}let ni=!1;function Ma(){ni||(ni=!0,requestAnimationFrame(()=>{ni=!1;for(const e of br)dd(e)}))}window.addEventListener("scroll",Ma,{passive:!0});window.addEventListener("resize",Ma);const ud=new Map;function pd(){const e=ud.get(Ne);e===void 0?xn.style.removeProperty("--spine-top"):xn.style.setProperty("--spine-top",`${e}px`)}function hd(e){if(!e){xn.replaceChildren();return}const t=Hb(e),n=O("span",{class:"spine-brand"},t.brand);t.identity&&(n.style.color=`var(--nc-ui-${t.identity})`),xn.replaceChildren(O("span",{class:"spine-text"},n,O("span",{class:"spine-rest"},t.rest)))}function je(e){Ne=e,Qe.seen(e),hd(I.find(t=>t.id===e)),pd(),Ma();for(const t of I){const n=t.id===e;ke.get(t.id)?.classList.toggle("shown",n);const a=document.getElementById(`tab-${t.id}`);a?.setAttribute("aria-selected",String(n)),a?.setAttribute("tabindex",n?"0":"-1")}}const iy=um(()=>I.map(e=>({instance:e,window:()=>ke.get(e.id)?.contentWindow,readyState:()=>{try{return ke.get(e.id)?.contentDocument?.readyState}catch{return}}})),xe);function fd(e){const t=xe.find(i=>i.id===e);if(!t)return;const n=om(I,t),a=I.map(i=>i.type).lastIndexOf(n.type);I=a<0?[...I,n]:[...I.slice(0,a+1),n,...I.slice(a+1)],Ht(I),sd(n);for(const i of I){const o=document.getElementById(`tab-${i.id}`);o&&Ut.insertBefore(o,Sn)}je(n.id),He?.render()}function ry(e,t){const n=I.find(o=>o.id===e);if(!n)return;const a=I.filter(o=>o.id!==e),i=t===null?a.length:a.findIndex(o=>o.id===t);I=[...a.slice(0,i<0?a.length:i),n,...a.slice(i<0?a.length:i)],Ht(I);for(const o of I){const s=document.getElementById(`tab-${o.id}`);s&&Ut.insertBefore(s,Sn)}He?.render()}function oy(e,t){I=im(I,e,t,xe),Ht(I);const n=I.find(i=>i.id===e);if(!n)return;const a=document.getElementById(`tab-${e}`);a&&(a.textContent=n.name),ke.get(e)?.setAttribute("title",n.name),Ne===e&&hd(n),te.rename(e,n.name)}async function sy(e,t){const a=I.find(l=>l.id===e)?.name??e;if(!await qe({title:`Remove ${a}?`,body:`Its channel, strip and mix settings go. ${a}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:t}))return;I=I.filter(l=>l.id!==e),Ht(I),Jc.forget(e),Qe.forget(e);const o=$e.playing().includes(e);$e.drop(e),o&&$e.out(e);const s=ke.get(e);ke.delete(e),s?.setAttribute("src","about:blank"),s?.remove(),document.getElementById(`tab-${e}`)?.remove(),te.detach(e),ly(e),wg(be(),e),Ne===e&&je(I[0]?.id??"")}const Ri=O("div",{class:"mix"});Ri.addEventListener("click",e=>{const n=e.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==Ne&&I.some(a=>a.id===n)&&je(n)});let He=null,fa=0;const ma=new Set;function ly(e){ma.add(e),delete ye.channels[e],delete ye.channelFx[e],Aa.delete(e),$n()}let yr=!1;function $n(){window.clearTimeout(fa),!yr&&(fa=window.setTimeout(()=>{kc(md())},300))}function md(){const e={...ye.channels};for(const i of te.list())e[i.id]=i.strip;for(const i of ma)delete e[i];const t={};for(const i of["a","b"]){const o=_t[i];o&&(t[i]=o.getState())}const n=te.masterFx?.getState()??null,a={...ye.channelFx};for(const[i,o]of Aa)a[i]=o.getState();for(const i of ma)delete a[i];return{v:1,channels:e,master:te.masterPositionValue,returns:{a:{on:te.returns.a.on,level:te.returns.a.level},b:{on:te.returns.b.on,level:te.returns.b.level}},insert:{on:n?Nm(n):ye.insert.on},fx:t,channelFx:a,masterFx:n??ye.masterFx}}te.onChange(()=>{He?.render(),$n()});for(const e of Object.values(_t))e?.onChange($n);async function wr(){Y.state!=="running"&&await Y.resume()}const gs=1500;async function cy(){const e=performance.now()+gs;await Promise.race([wr(),new Promise(t=>setTimeout(t,gs))]),await rt.whenSettled(Math.max(0,e-performance.now())),await Promise.race([fr.idle(),new Promise(t=>setTimeout(t,Math.max(0,e-performance.now())))])}vn.addEventListener("click",()=>{wr(),G.running()&&$e.owner()===lr?G.stop():G.running()?$e.claimAll():($e.claimAll(),G.play()),Ue()});function gd(){const e=Number(Bt.value);G.setTempo(e),_c(G.bpm(),we())}ht.addEventListener("change",()=>{ht.value=mt(ht.value),Bc(ht.value,we())});function dy(e,t,n){const a=URL.createObjectURL(new Blob([t],{type:n})),i=O("a",{href:a,download:e});document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e4)}ed.addEventListener("click",async()=>{const e=mt(ht.value),t=I.map(o=>o.id),n=await zt.collect(t),a=Fb({name:e,bpm:G.bpm(),instances:I,mix:md(),presets:n});dy(Pb(e),`${JSON.stringify(a,null,2)}
`,"application/json");const i=I.filter(o=>!n[o.id]).map(o=>o.name);An(i.length?`Saved “${e}” (without ${i.join(", ")}: ${i.length===1?"it hasn't":"they haven't"} loaded yet)`:`Saved “${e}”`)});td.addEventListener("click",()=>gn.click());gn.addEventListener("change",async()=>{const e=gn.files?.[0];if(gn.value="",!e)return;const t=zb(await e.text(),xe.filter(i=>i.available!==!1).map(i=>i.id));if(!t.ok){An(t.error);return}const n=t.scene;await qe({title:`Load “${n.name}”?`,body:"The music stops and the Studio reloads with this Scene's instruments, their sounds and patterns, the mix and the tempo. Save the current Scene first to keep it.",confirmLabel:"Load"})&&bd({name:n.name,bpm:n.tempo.bpm,instances:n.instances,mix:n.mix,presets:n.presets})});nd.addEventListener("click",async()=>{await qe({title:"Start a new Scene?",body:"The music stops and the Studio reloads with one of each instrument, a fresh mix and 120 BPM. Each instrument keeps its own sound and pattern. Save the current Scene first to keep it.",confirmLabel:"New"})&&bd({name:dr,bpm:ca,instances:yn(xe),mix:wn()})});function bd(e){G.running()&&G.stop(),yr=!0,window.clearTimeout(fa);const t=e.instances.map(({id:n,name:a})=>{const[i,o]=n.split("#"),s=xe.find(l=>l.id===i);return s?jt(s,o?Number(o):1,a):null}).filter(n=>n!==null);Ht(t),kc(e.mix),_c(e.bpm,we()),Bc(e.name,we()),zt.stash({...e.presets??{}}),location.reload()}let bs=0;function An(e){ua.textContent=e,pa.textContent=e,window.clearTimeout(bs),bs=window.setTimeout(Ue,4e3)}Bt.addEventListener("change",gd);Bt.addEventListener("keydown",e=>{e.key==="Enter"&&gd()});Ze.addEventListener("click",()=>{wr();const e=me.state;e==="recording"?uy():e==="arming"||e==="armed"?(me.cancel(),An("Rec cancelled")):e==="idle"&&(me.arm(G.playing()),yd())});async function uy(){const e=await me.stop();e&&(nn&&URL.revokeObjectURL(nn.url),nn={url:URL.createObjectURL(e.blob),take:e},an.href=nn.url,an.download=e.name,an.textContent=`Save take (${e.seconds.toFixed(1)} s)`,an.hidden=!1)}function yd(){const e=me.state;if(e!=="arming"&&e!=="armed")return;const t=G.clock.transport;if(!t.running||t.startTime===null){me.schedule(null);return}const n=Math.round(rt.toContextTime(t.startTime)*Y.sampleRate);me.schedule(n+hr.latency("master"))}function py(){const e=me.state,t=e==="arming"||e==="armed",n=e==="recording"||e==="stopping";Ze.dataset.state=t?"armed":n?"recording":"idle",Ze.setAttribute("aria-pressed",String(n)),Ze.textContent=t?"Armed":n?"Stop rec":"Rec",Ze.disabled=e==="stopping"||!me.supported,Ue()}me.onChange(py);document.addEventListener("keydown",e=>{if(e.code!=="Space"||e.repeat)return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable)||(e.preventDefault(),vn.click())});Ut.addEventListener("keydown",e=>{if(e.target===Pt)return;const t=I.map(i=>i.id),n=t.indexOf(Ne),a=e.key==="ArrowRight"?t[(n+1)%t.length]:e.key==="ArrowLeft"?t[(n-1+t.length)%t.length]:null;a&&(e.preventDefault(),je(a),document.getElementById(`tab-${a}`)?.focus())});function Ue(){const e=G.running()&&$e.owner()===lr;vn.textContent=e?"Stop":"Play",vn.setAttribute("aria-pressed",String(e)),document.activeElement!==Bt&&(Bt.value=String(Math.round(G.bpm()*10)/10));const t=G.position();da.value=t?`${t.bar}.${t.beat}`:"—";const n=G.peers().length;ua.textContent=Y.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",pa.textContent=Y.state==="running"?"":"Audio off",(me.state==="arming"||me.state==="armed")&&(ua.textContent="Rec armed: waiting for sound",pa.textContent="Rec armed"),mr.classList.toggle("off",Y.state!=="running")}G.clock.onChange(()=>{G.clock.transport.running&&(Qc=!0),G.running()||$e.clear(),yd(),Ue()});$e.onChange(Ue);$e.onLastOut(()=>{G.running()&&G.stop(),Ue()});G.clock.onChange(()=>He?.render());G.peer.onPeers(Ue);Y.addEventListener("statechange",Ue);const hy=.25;let ys=performance.now();function wd(e){const t=Math.min(.1,(e-ys)/1e3);ys=e,He?.frame(t);const n=G.position(),a=n?`${n.bar}.${n.beat}`:"—";da.value!==a&&(da.value=a);const i=G.beatPhase(),o=i!==null&&i<hy;Di.hasAttribute("data-on")!==o&&Di.toggleAttribute("data-on",o),requestAnimationFrame(wd)}async function fy(){const e=document.getElementById("app");if(!e)throw new Error("Missing #app");e.append(ad,ha,rd,Ri,O("main",{class:"instruments"},Ut,O("div",{class:"bay"},xn,od)),Zc.el),He=Kg(Ri,te,{order:()=>I.map(t=>t.id),catalogue:rr,bpm:()=>G.bpm(),onAdd:fd,onRemove:(t,n)=>void sy(t,n),onReorder:(t,n)=>ry(t,n),onRename:(t,n)=>oy(t,n),...mn?{plugins:mn}:{}}),Y.state==="running"&&await Y.suspend(),await Y.audioWorklet.addModule(jb),Vc(),me.attach(),await G.start();for(const t of[_t.a,_t.b,te.masterFx])t&&Hs(t,G.clock,{mapper:rt});for(const t of I)sd(t);je(Ne),Ue(),requestAnimationFrame(wd),window.setInterval(()=>te.parkIdleReturns(),ab),document.documentElement.dataset.studioReady="",gy(),yy(),mn&&ub({ctx:Y,running:()=>cb([...pr].map(t=>t.getChain())),onFrozen:my})}async function my(e){ur.add(e.map(a=>a.id)),window.clearTimeout(fa),yr=!0;const t=e.map(a=>a.name).join(", ");document.documentElement.dataset.pluginsFrozen=e.map(a=>a.id).join(" "),An(`${t} froze the audio`),await qe({title:D.frozenTitle,body:D.frozenBody(t),confirmLabel:D.frozenOpen,cancelLabel:D.frozenStay})&&window.open(location.href,"_blank")}function gy(){const e=new Set(zt.pending());if(!e.size)return;const t=[],n=o=>I.find(s=>s.id===o)?.name??o,a=()=>{window.clearTimeout(i);const o=[...t,...zt.dropPending()].map(n);An(o.length?`Scene loaded; ${o.join(", ")} kept ${o.length===1?"its":"their"} own sound`:"Scene loaded")};zt.onApplied((o,s)=>{e.delete(o)&&(s||t.push(o),e.size||a())});const i=window.setTimeout(a,hm)}window.__studio={ctx:Y,mixer:te,grab:hr,recorder:me,get lastTake(){return nn?.take??null},limiterDelay:Gc,mapper:rt,transport:G,frames:ke,show:je,get instances(){return I},fx:_t,plugins:mn,frozen:ur,channelCores:Aa,get mix(){return He}};fy();function vr(e){at.dataset.picker=e,at.setAttribute("aria-pressed",String(e==="on"||e==="connecting"||e==="away")),at.dataset.ncHelp=X[`picker:${e}`]}vr("off");async function by(){if(["127.0.0.1","localhost","[::1]"].includes(location.hostname))return"granted";try{return(await navigator.permissions.query({name:"loopback-network"})).state}catch{return"unknown"}}async function yy(){let e=Rc(we());const t=new URLSearchParams(location.search).get("picker");if(t!==null){const a=t?cr(t):e.address;a&&(e={on:!0,address:a},Fi(we(),e))}if(!e.on)return;const n=await by();n==="granted"||n==="unknown"?Qe.start(e.address):vr(n==="denied"?"blocked":"ask")}at.addEventListener("click",()=>void wy());async function wy(){const e=Rc(we()),t=at.dataset.picker;if(t==="ask"||t==="blocked"){Qe.start(e.address);return}if(Qe.status!=="off"){if(!await qe({title:"Disconnect the Sample Picker?",body:"Its Send to NYX won't reach this Studio until you connect it again.",confirmLabel:"Disconnect",returnFocus:at}))return;Fi(we(),{...e,on:!1}),Qe.stop();return}await qe({title:"Connect the Sample Picker?",body:`The Studio talks to the Sample Picker on this computer (${e.address}), so its Send to NYX loads the pads of your NYX here. Chrome may ask to let this site reach this computer: allow it.`,confirmLabel:"Connect",returnFocus:at})&&(Fi(we(),{...e,on:!0}),Qe.start(e.address))}
