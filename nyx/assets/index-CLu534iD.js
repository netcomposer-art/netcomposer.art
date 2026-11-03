(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();const lt=1e-9;function cc(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class fi{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return cc(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let i=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+lt&&(i=s.bpm);const o=[{beat:t.beat,time:t.time,bpm:this.clamp(i)}];for(const s of a){if(s.beat<=t.beat+lt)continue;const l=this.clamp(s.bpm);l!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+lt){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-lt;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,i=.25){const o=this.bpmAt(n);if(!(a>0)||!(i>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/i));this.setTempoAt(o,n);for(let l=1;l<=s;l++)this.setTempoAt(o+(t-o)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new fi({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+lt)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+lt)return n[a];return n[0]}}const dc=Object.freeze({beatsPerBar:4,beatUnit:4}),gt=1e-9;function uc(e){return Math.floor(e+gt)}function zo(e,t,n=!1){if(!(t>0))return e;const i=Math.ceil(e/t-gt)*t;return n&&i<=e+gt?i+t:i}class pc{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new fi({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??dc}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-gt&&(this.stopTime===null||t<this.stopTime-gt)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-gt?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=uc(t/n),i=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:i,barPhase:i/n}}nextBar(t,n=!1){return zo(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const Po="nc-clock/snapshot",Do=1;function hc(e,t="local"){return{format:Po,version:Do,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function fc(e,t){const n=mc(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const Ee=e=>typeof e=="number"&&Number.isFinite(e),fr=e=>e===null||Ee(e);function mc(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==Po&&n("format"),(!Ee(t.version)||Math.floor(t.version)!==Do)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!Ee(t.anchor.beat)||!Ee(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&Ee(a.beat)&&Ee(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!Ee(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!Ee(t.meter.beatUnit))&&n("meter"),(!fr(t.startTime)||!fr(t.stopTime)||!Ee(t.stoppedBeat))&&n("transport times"),t}class gc{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new pc(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){fc(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return hc(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const bc="nc-sync/1",yc=1,wc="nc-sync",vc="nc-sync-leader",xc=0,qo=.5,Bo=.75;function kc(e){return typeof e=="number"&&Number.isFinite(e)&&e>=qo&&e<=Bo?e:null}const oa=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Bt=e=>typeof e=="number"&&Number.isFinite(e),fn=e=>typeof e=="string"&&e.length>0;function $c(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==yc||!fn(t.type)||!fn(t.from)||!Bt(t.term)||!Bt(t.seq)||!Bt(t.sentAt))return null;switch(t.type){case"hello":return fn(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return Bt(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&Bt(t.slot)?t:null;case"ping":case"pong":return fn(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function Ec(e,t,n,a,i){return{proto:bc,from:t,term:n,seq:a,sentAt:i,...e}}function te(){return(performance.timeOrigin+performance.now())/1e3}const sa=.003,Ac=3,la=.002+1e-6,Sc=.01,mr=500;class gr{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Sc:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=sa&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const i=n-(this.timeOrigin+a)/1e3,o=this.median(),s=i-o,l=Math.abs(i-this.preStepBase),c=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!c&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&c===this.pendingBack&&(c||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(i,o,c))):(this.pendingStep=s,this.pendingBack=c,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const i=this.ctx.currentTime,o=i<=this.revertUntil;let s;if(a&&o){const l=this.offsets,c=this.preStep;l.length=0;for(let u=0;u<c.length;u++)l.push(c[u]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:i,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!o){const u=this.offsets,d=this.preStep;d.length=0;for(let p=0;p<u.length;p++)d.push(u[p]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?i+this.stepRevert:-1/0}const l=this.offsets,c=t-n;for(let u=0;u<l.length;u++)l[u]+=c;this.stepCount++,s={stepSeconds:t-n,confirmedAt:i,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let o=0;o<a;o++){const s=t[o];let l=o-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const i=a>>1;return a%2?n[i]:(n[i-1]+n[i])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.readLatency(!1);let n=null,a=!1;const i=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=sa&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<mr)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),n=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3,a=!0;else if(!i||!(i.contextTime>=sa)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const o=this.perfNow();if(this.waitSince===null&&(this.waitSince=o),o-this.waitSince<mr)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(Ac,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let i=-1,o=0;for(let l=0;l<n;l++){let c=0;for(let u=0;u<n;u++)Math.abs(t[u]-t[l])<=la&&c++;c>o&&(i=l,o=c)}if(o<a)return;const s=t[i];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>la&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-(this.offset-this.userOffsetMs/1e3))<=la}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const i=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(i,2)};setTimeout(i,2)})}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,i=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(i)&&i>0?i:null}}class Mc{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...oa,...t.capabilities},this.channelOption=t.channel??wc,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const i=this.o.now(),o=()=>{n===this.startWaits&&t(i)};return a.then(o,o),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const i=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(i),0)}else{const i=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?i:Math.max(t+this.o.gatedStartLeadSeconds,i),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[i,o]=this.tempoRange();t=Math.min(o,Math.max(i,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const c=s.beatAt(l+this.o.minLeadSeconds),u=Math.max(n??zo(c,1),c);a&&a>0?(s.tempo.rampTempo(t,u,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,u),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(Bo,Math.max(qo,t)):xc;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=kc(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=$c(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const i=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...oa,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),i||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const i=this.peers.get(n.from);i?i.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...oa},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(i=>{this.leader&&this.decideStart(i)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const i of[...this.snapshotListeners])i(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const i of[...this.messageListeners])i(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(vc,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,l)=>[o?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),i=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(i===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,i=o.id)}this.setLeader(i===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],i=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==i[0]?a[0]<i[0]:a[1]!==i[1]?a[1]<i[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const i=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>i&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(Ec(t,this.id,this.term,++this.seq,this.o.now()))}}const Lc="modulepreload",Tc=function(e){return"/nyx/"+e},br={},Cc=function(t,n,a){let i=Promise.resolve();if(n&&n.length>0){let s=function(u){return Promise.all(u.map(d=>Promise.resolve(d).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");i=s(n.map(u=>{if(u=Tc(u),u in br)return;br[u]=!0;const d=u.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const f=document.createElement("link");if(f.rel=d?"stylesheet":Lc,d||(f.as="script"),f.crossOrigin="",f.href=u,c&&f.setAttribute("nonce",c),document.head.appendChild(f),d)return new Promise((m,w)=>{f.addEventListener("load",m),f.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return i.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return t().catch(o)})};var Fc=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Ta=[.25,.5,.75,1,1.5,2],Nc=4.9,U={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},Ke={fmt:"wet"},we={fmt:"pct"},ct={fmt:"db"},mn={fmt:"signedPct"},ca={fmt:"num",suffix:" ms"},H={div:100};function T(e,t,n,a,i,o,s,l){var c={key:e,label:t,min:n,max:a,default:i,step:1,k:o,unit:null,format:s};if(l)for(var u in l)c[u]=l[u];return c}function gn(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var Yt=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[T("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:U.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[T("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:U.hpHz,astrid:!0,zero:"off"}),T("q","Resonance",0,100,0,2,{fmt:"q",law:U.hpQ},{dsp:{law:U.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[T("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:U.bpHz,astrid:!0},{dsp:{law:U.bpHz}}),T("q","Q",0,100,0,2,{fmt:"q",law:U.bpQ},{dsp:{law:U.bpQ}}),T("mix","Mix",0,100,100,3,Ke,{dsp:H,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[T("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:gn(Fc),overriddenBy:"beats_free",tempoSynced:!0}),T("feedback","Feedback",0,90,35,2,we,{dsp:H,unit:"%"}),T("mix","Wet/dry",0,100,0,3,Ke,{dsp:H,unit:"%",astridKey:"wet"}),T("tone","Tone",0,100,100,4,{fmt:"hz",law:U.delayTone,offAt:100},{dsp:{div:99},more:!0}),T("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),T("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:gn([[0,"Insert"],[1,"Send"]]),more:!0}),T("send","Send",0,100,100,7,we,{dsp:H,unit:"%",more:!0}),T("mod_send","Accent → send",-100,100,0,8,mn,{dsp:H,unit:"%",more:!0}),T("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[T("predelay","Pre-delay",0,200,0,1,ca,{dsp:{div:1e3},unit:"ms"}),T("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:H,unit:"%"}),T("decay","Decay",0,100,50,3,we,{dsp:H,unit:"%"}),T("damping","Damping",0,100,0,4,we,{dsp:H,unit:"%"}),T("mix","Mix",0,100,0,5,Ke,{dsp:H,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[T("rate","Rate",0,100,26,1,{fmt:"rate",law:U.rate},{dsp:{law:U.rate}}),T("depth","Depth",0,100,70,2,we,{dsp:H,unit:"%"}),T("feedback","Feedback",-90,90,50,3,mn,{dsp:H,unit:"%"}),T("mix","Mix",0,100,50,4,Ke,{dsp:H,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[T("rate","Rate",0,100,52,1,{fmt:"rate",law:U.rate},{dsp:{law:U.rate}}),T("depth","Depth",0,100,50,2,we,{dsp:H,unit:"%"}),T("spread","Spread",0,100,70,3,we,{dsp:H,unit:"%"}),T("mix","Mix",0,100,40,4,Ke,{dsp:H,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[T("rate","Rate",0,100,39,1,{fmt:"rate",law:U.rate},{dsp:{law:U.rate}}),T("depth","Depth",0,100,70,2,we,{dsp:H,unit:"%"}),T("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:gn([[4,"4"],[6,"6"],[8,"8"]])}),T("feedback","Feedback",0,90,30,4,we,{dsp:H,unit:"%"}),T("mix","Mix",0,100,50,5,Ke,{dsp:H,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[T("low_db","Low",-18,18,0,1,ct,{unit:"dB"}),T("mid_db","Mid",-18,18,0,2,ct,{unit:"dB"}),T("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:U.midHz,astrid:!0},{dsp:{law:U.midHz}}),T("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:U.eqQ},{dsp:{law:U.eqQ}}),T("high_db","High",-18,18,0,4,ct,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[T("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),T("output_db","Output",-12,12,0,2,ct,{unit:"dB"}),T("mix","Mix",0,100,100,3,Ke,{dsp:H,unit:"%"}),T("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:gn([[0,"Smooth"],[1,"Acid"]]),more:!0}),T("tone","Tone",0,100,100,5,{fmt:"hz",law:U.driveTone,offAt:100},{dsp:{div:99},more:!0}),T("mod_drive","Accent → drive",-100,100,0,6,mn,{dsp:H,unit:"%",more:!0}),T("mod_tone","Accent → tone",-100,100,0,7,mn,{dsp:H,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[T("threshold_db","Threshold",-60,0,0,1,ct,{unit:"dB"}),T("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:U.ratio},{dsp:{law:U.ratio}}),T("attack_ms","Attack",1,100,10,3,ca,{unit:"ms"}),T("release_ms","Release",10,1e3,150,4,ca,{unit:"ms"}),T("makeup_db","Makeup",0,24,0,5,ct,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[T("width","Width",0,200,100,1,we,{dsp:H,unit:"%"}),T("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:H})]}],zc=Yt.map(function(e){return e.type});Yt.filter(function(e){return!e.hidden}).map(function(e){return e.type});var Pc={reverb:"plate"};function mi(e){var t=Pc[e]||e;return zc.indexOf(t)>=0?t:null}function Ne(e){for(var t=mi(e),n=0;n<Yt.length;n++)if(Yt[n].type===t)return Yt[n];return null}function ft(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function Oo(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=ft(n.law,t);return a===null?0:a}function yr(e,t){return Math.min(Nc,e*60/(t>0?t:120))}var wr=function(e){return e>0?"+":e<0?"−":""};function Dc(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function Ro(e,t,n){var a=e.format,i;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:wr(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return wr(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(i=ft(a.law,t),i===null?a.zero||"open":a.astrid?Dc(i):i+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+ft(a.law,t).toFixed(1);case"ratio":return ft(a.law,t).toFixed(1)+":1";case"rate":return i=ft(a.law,t),(i<1?i.toFixed(2):i<10?i.toFixed(1):i.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var o=0;o<e.options.length;o++)if(e.options[o].value===t)return e.options[o].label;return String(t);case"tempoMs":return Math.round(yr(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(yr(t,n)*1e3)+" ms"}return String(t)}var qc=1,Gn=["drive","delay","plate"];function Bc(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,i){return Ro(e,a,i)},t}var Gt=Gn.map(function(e){var t=Ne(e),n={type:e,label:t.label,dials:t.dials.map(Bc)};return t.tempoSynced&&(n.tempoSynced=!0),n}),Oc={reverb:"plate"};function Fn(e){var t=Oc[e]||e;return Gn.indexOf(t)>=0?t:null}function Kn(e){for(var t=Fn(e),n=0;n<Gt.length;n++)if(Gt[n].type===t)return Gt[n];return null}function Io(e,t){var n=Kn(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function vt(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function Ue(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,i=1;i<e.options.length;i++)Math.abs(e.options[i].value-t)<Math.abs(a-t)&&(a=e.options[i].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*o)/o))+0}function Rc(){return{v:qc,chain:Gt.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function Ic(e){return Ta.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},Ta[0])}function da(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function jc(e){for(var t=Array.isArray(e)?e:da(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=Rc(),i={},o=[],s=0;s<t.length;s++){var l=t[s];if(da(l)){var c=Fn(l.type);if(!c){typeof l.type=="string"&&o.push(l.type);continue}if(i[c]){o.push(c);continue}i[c]=!0;var u=a.chain[Gn.indexOf(c)],d=da(l.dials)?l.dials:{};c==="delay"&&d.mix===void 0&&d.wet!==void 0&&(d=Object.assign({},d,{mix:d.wet})),u.bypass=n?l.bypass===!0:l.bypass!==!1,Kn(c).dials.forEach(function(p){u.dials[p.key]=Ue(p,d[p.key])}),Hc(c,u.dials,d)}}return{state:a,dropped:o}}function Hc(e,t,n){for(var a=Kn(e),i=0;i<a.dials.length;i++){var o=a.dials[i];o.stepWhen&&(t[o.key]=Ue(o,n&&typeof n[o.key]=="number"?n[o.key]:t[o.key],vt(o,t)))}}function Ca(e){return jc(e).state}function _c(e){return JSON.parse(JSON.stringify(e))}var Uc=24,Fa={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Na(e,t,n){if(t==="bypass")return n?0:1;var a=Io(e,t)||Wc(e,t);return a?Oo(a,n):0}function Wc(e,t){var n=Ne(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var Yc={};Gt.forEach(function(e){e.dials.forEach(function(t){Yc[e.type+"."+t.key]=t.format})});function ua(e,t){var n=new Float64Array(Uc),a=Ca(e);return a.chain.forEach(function(i){var o=Fa[i.type];n[o.bypass]=i.bypass?0:1,Object.keys(i.dials).forEach(function(s){n[o[s]]=Na(i.type,s,i.dials[s])})}),n}var Gc=2,Nn=3,Kc=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Ot(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function jo(e,t){var n=Ne(e);if(!n)return null;var a={};(t||[]).forEach(function(s){s&&s.id&&(a[s.id]=!0)});for(var i=1;a[n.type+"-"+i];)i++;var o={};return n.dials.forEach(function(s){o[s.key]=s.default}),{id:n.type+"-"+i,type:n.type,bypass:!1,dials:o}}function Xc(e){var t=Ne(e.type),n=/-(\d+)$/.exec(e.id||"");return(t?t.label:e.type)+(n&&+n[1]>1?" "+n[1]:"")}function Vc(e,t,n){var a=e.length-1,i=Math.max(0,Math.min(a,n));if(t<0||t>a||t===i)return e;var o=e.slice(),s=o.splice(t,1)[0];return o.splice(i,0,s),o}function Qc(e){return typeof e=="number"&&isFinite(e)?Ic(e):e}function vr(e,t,n){var a={};return e.dials.forEach(function(i){var o=t[i.key];o===void 0&&i.astridKey&&(o=t[i.astridKey]),n&&e.type==="delay"&&i.key==="delay_beats"&&(o=Qc(o)),a[i.key]=Ue(i,o)}),e.dials.forEach(function(i){i.stepWhen&&(a[i.key]=Ue(i,typeof t[i.key]=="number"?t[i.key]:a[i.key],vt(i,a)))}),a}function Jc(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,i=1/0,o=e.min;o<=e.max;o++){var s=ft(n.law,o),l=s===null?1/0:Math.abs(s-t);l<i&&(i=l,a=o)}return a}}var Zc={rate:"rate_hz"};function ed(e,t,n,a){var i={};return e.dials.forEach(function(o){if(!o.more){var s=o.astridKey||Zc[o.key]||o.key;i[o.key]=Jc(o,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),i}function td(e,t){var n=t>0?Math.floor(t):Nn,a=[],i=[],o=[],s=!1,l=!1;Array.isArray(e)?(o=e,l=!0):Ot(e)&&Array.isArray(e.chain)&&(o=e.chain,s=e.v===1,l=e.schema===2);for(var c=[],u=0;u<o.length;u++){var d=o[u];if(Ot(d)&&!(d.type==="limiter"||d.fixed===!0)){var p=mi(d.type),f=p&&Ne(p);if(!f||s&&["drive","delay","plate"].indexOf(p)<0){typeof d.type=="string"&&a.push(d.type);continue}if(c.length>=n){a.push(d.id||p);continue}var m;Ot(d.params)&&!Ot(d.dials)?m=vr(f,ed(f,d.params,i,d.id||p),l):m=vr(f,Ot(d.dials)?d.dials:{},l);var w=jo(p,c),b=typeof d.id=="string"&&Kc.test(d.id)&&!c.some(function(g){return g.id===d.id})?d.id:w.id,h=s?d.bypass!==!1:d.bypass===!0;c.push({id:s?w.id:b,type:p,bypass:h,dials:m})}}return{state:{v:Gc,chain:c},dropped:a,notes:i}}function kn(e,t){return td(e,t).state}function dt(e){var t=Ne(e.type),n=[[0,e.bypass?0:1]];return t.dials.forEach(function(a){n.push([a.k,Oo(a,e.dials[a.key])])}),n}function nd(e){var t=kn(e,8),n=[],a=t.chain.map(function(i,o){var s=Ne(i.type),l={};return o>=Nn&&n.push(i.id+": ASTRID keeps three hacks"),s.dials.forEach(function(c){var u=i.dials[c.key];if(c.more){u!==c.default&&n.push(i.id+"."+c.key);return}c.key==="delay_beats"&&Ta.indexOf(u)<0&&n.push(i.id+".delay_beats"),l[c.astridKey||c.key]=u}),{id:i.id,type:i.type,bypass:i.bypass,dials:l}});return{hacks:a,lossy:n}}var ad="nc-fx@1",id=600,rd=256,od=8,Rt=typeof WeakMap=="function"?new WeakMap:null;function sd(e,t){var n=Rt&&Rt.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await Cc(async()=>{const{default:o}=await import("./worklet-source-BibsVBZk.js");return{default:o}},[])).default,i=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(i)}finally{URL.revokeObjectURL(i)}})(),Rt&&(Rt.set(e,n),n.catch(function(){Rt.delete(e)})),n)}function ut(e,t){return typeof e=="number"&&isFinite(e)?e:t}function Ho(e,t,n,a){var i=Math.min(400,Math.max(20,ut(t.bpm,120))),o=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",c=ut(t.preGain,1),u=Math.max(0,ut(t.crossfade,.012)),d=ut(t.maxDelaySeconds,void 0),p=e.createGain(),f=e.createGain(),m=e.createGain(),w=e.createGain(),b=null;t.modInput===!0&&(b=e.createGain(),b.channelCount=1,b.channelCountMode="explicit",b.channelInterpretation="discrete"),w.gain.value=0,p.connect(m),m.connect(f),w.connect(f);var h={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:i,mUsers:0,lv:null,lvAt:0},g=n(i);h.post=function($){h.node?h.node.port.postMessage($):h.disposed||(o.length>=rd&&(o=a().concat([{t:"tempo",bpm:h.bpm,when:0}]),h.mUsers>0&&o.push({t:"meter",on:!0})),o.push($))};function y($){var k=o.map(function(M){var C=Object.assign({},M);return C.when>$||(C.when=0,C.t!=="clear"&&(C.snap=!0)),C});return o=[],k}h.emit=function($){for(var k=0;k<h.listeners.length;k++)try{h.listeners[k]($)}catch(M){typeof console<"u"&&console.error(M)}},h.whenOf=function($){return typeof $=="number"&&isFinite($)&&$>0?$:0};var v=!1;h.tooFar=function($){return typeof $=="number"&&$>e.currentTime+id?(!v&&typeof console<"u"&&(v=!0,console.warn("nc-fx: ignoring a time "+Math.round($-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var E=sd(e,t.moduleUrl).then(function(){if(!h.disposed){var $=Object.assign({bpm:i,bypassMode:l,limiter:s,preGain:c,maxDelaySeconds:d},g);$.pending=y(e.currentTime),h.node=new AudioWorkletNode(e,ad,{numberOfInputs:b?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:$}),h.node.port.onmessage=function(M){var C=M.data;C&&C.t==="lv"&&h.mUsers>0&&(h.lv=C.d,h.lvAt=xr())},p.connect(h.node),b&&b.connect(h.node,0,1),h.node.connect(w);var k=e.currentTime;k<=0||u===0?(m.gain.value=0,w.gain.value=1):(m.gain.setValueAtTime(1,k),m.gain.linearRampToValueAtTime(0,k+u),w.gain.setValueAtTime(0,k),w.gain.linearRampToValueAtTime(1,k+u)),h.status="ready"}},function($){h.status="unavailable",o=[],h.error=$});h.meterOpen=function(){return h.disposed||h.status==="unavailable"?!1:(h.mUsers++===0&&h.post({t:"meter",on:!0}),!0)},h.meterClose=function(){h.mUsers!==0&&--h.mUsers===0&&(h.lv=null,h.disposed||h.post({t:"meter",on:!1}))},h.levels=function(){return h.lv&&xr()-h.lvAt<ld?h.lv:null};var A={};return h.meter=function($,k){if(A[$])return A[$];var M=0,C={in:0,out:0},_={open:function(){return h.meterOpen()?(M++,!0):!1},close:function(){M!==0&&(M--,h.meterClose())},read:function(){var V=M>0?h.levels():null;return C.in=0,C.out=0,V&&k(V,C),C}};return A[$]=_,_},h.core={input:p,output:f,modInput:b,ready:E,get status(){return h.status},get error(){return h.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function($,k){var M=ut($,NaN);!(M>0)||h.disposed||h.tooFar(k)||(h.bpm=Math.min(400,Math.max(20,M)),h.post({t:"tempo",bpm:h.bpm,when:h.whenOf(k)}),h.emit({effect:null,key:"tempo",value:h.bpm}))},getTempo:function(){return h.bpm},clear:function($){var k=$&&typeof $=="object"?$:{at:$};if(!(h.disposed||h.tooFar(k.at))){var M=ut(k.fadeMs,0);h.post({t:"clear",when:h.whenOf(k.at),fadeMs:M>0?Math.min(1e3,M):0})}},onChange:function($){return h.listeners.push($),function(){var k=h.listeners.indexOf($);k>=0&&h.listeners.splice(k,1)}},dispose:function(){if(!h.disposed){if(h.disposed=!0,h.status="disposed",o=[],h.listeners.length=0,h.node){h.node.port.postMessage({t:"dispose"}),h.node.port.close();try{h.node.disconnect()}catch{}}[p,m,w,f,b].forEach(function($){try{$&&$.disconnect()}catch{}})}}},h}var ld=250;function xr(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function _o(e,t){t.in=e[0],t.out=e[1]}function cd(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function dd(e,t){var n=t||{};if(n.slots)return ud(e,n);var a=Ca(n.state),i=Array.from(ua(a)),o=Ho(e,n,function(){return{program:i}},function(){return[{t:"load",program:Array.from(ua(a)),when:0}]}),s=o.core;function l(c){return a.chain[Gn.indexOf(c)]}return s.setParam=function(c,u,d,p){var f=Fn(c);if(!(!f||o.disposed||o.tooFar(p))){var m=l(f),w;if(u==="bypass")w=!!d;else{var b=Io(f,u);if(!b)return;w=Ue(b,d,vt(b,m.dials))}return u==="bypass"?m.bypass=w:m.dials[u]=w,o.post({t:"p",i:Fa[f][u],v:Na(f,u,w),when:o.whenOf(p)}),o.emit({effect:f,key:u,value:w}),Kn(f).dials.forEach(function(h){if(!(!h.stepWhen||!h.stepWhen.some(function(v){return v.key===u}))){var g=m.dials[h.key],y=Ue(h,g,vt(h,m.dials));y!==g&&(m.dials[h.key]=y,o.post({t:"p",i:Fa[f][h.key],v:Na(f,h.key,y),when:o.whenOf(p)}),o.emit({effect:f,key:h.key,value:y}))}}),w}},s.meter=function(){return o.meter("",_o)},s.getParam=function(c,u){var d=Fn(c);if(d){var p=l(d);return u==="bypass"?p.bypass:p.dials[u]}},s.getState=function(){return _c(a)},s.setState=function(c,u){o.disposed||o.tooFar(u&&u.at)||(a=Ca(c),o.post({t:"load",program:Array.from(ua(a)),when:o.whenOf(u&&u.at)}),o.emit({effect:null,key:null,value:null}))},s}function ud(e,t){var n=t.slots===!0?Nn:Math.max(1,Math.min(od,Math.floor(+t.slots)||Nn)),a=kn(t.state,n),i=1,o={};function s(h){return o[h.id]||(o[h.id]=i++),o[h.id]}function l(h){return h.map(function(g){return{uid:s(g),type:g.type,program:dt(g)}})}var c=l(a.chain),u=a.chain.map(function(h){return o[h.id]}),d=Ho(e,t,function(){return{slots:n,chain:c,order:u}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(h){return o[h.id]}),when:0}]}),p=d.core;function f(h){var g;for(g=0;g<a.chain.length;g++)if(a.chain[g].id===h)return a.chain[g];var y=mi(h);if(y){for(g=0;g<a.chain.length;g++)if(a.chain[g].type===y)return a.chain[g]}return null}function m(h,g){var y=s(h);d.post({t:"add",uid:y,type:h.type,when:g}),dt(h).forEach(function(v){d.post({t:"ps",uid:y,k:v[0],v:v[1],when:g,snap:!0})})}function w(h){d.post({t:"order",uids:a.chain.map(function(g){return o[g.id]}),when:h})}function b(h,g){var y={};a.chain.forEach(function(A){y[A.id]=A});var v=a.chain.map(function(A){return o[A.id]}).join();h.chain.forEach(function(A){var $=y[A.id];if(!$||$.type!==A.type){delete o[A.id],m(A,g);return}var k={};dt($).forEach(function(M){k[M[0]]=M[1]}),dt(A).forEach(function(M){k[M[0]]!==M[1]&&d.post({t:"ps",uid:o[A.id],k:M[0],v:M[1],when:g})})});var E={};h.chain.forEach(function(A){E[A.id]=!0}),Object.keys(o).forEach(function(A){E[A]||delete o[A]}),a=h,a.chain.map(function(A){return o[A.id]}).join()!==v&&w(g)}return p.slots=n,p.meter=function(h){return h==null||h===""?d.meter("",_o):d.meter("#"+h,function(g,y){var v=f(h),E=v?o[v.id]:0,A=g[2];if(E){for(var $=3,k=0;k<A;k++,$+=3)if(g[$]===E){y.in=g[$+1],y.out=g[$+2];return}}})},p.setParam=function(h,g,y,v){var E=f(h);if(!(!E||d.disposed||d.tooFar(v))){var A=Ne(E.type),$,k=null;if(g==="bypass")$=!!y;else{for(var M=0;M<A.dials.length;M++)A.dials[M].key===g&&(k=A.dials[M]);if(!k)return;$=Ue(k,y,vt(k,E.dials))}var C={},_={};dt(E).forEach(function(P){C[P[0]]=P[1]}),A.dials.forEach(function(P){P.stepWhen&&(_[P.key]=E.dials[P.key])}),g==="bypass"?E.bypass=$:E.dials[g]=$,A.dials.forEach(function(P){P.stepWhen&&(E.dials[P.key]=Ue(P,E.dials[P.key],vt(P,E.dials)))});var V=d.whenOf(v),be=o[E.id];return dt(E).forEach(function(P){(C[P[0]]!==P[1]||k&&P[0]===k.k)&&d.post({t:"ps",uid:be,k:P[0],v:P[1],when:V})}),d.emit({effect:E.id,key:g,value:$}),Object.keys(_).forEach(function(P){P!==g&&E.dials[P]!==_[P]&&d.emit({effect:E.id,key:P,value:E.dials[P]})}),$}},p.getParam=function(h,g){var y=f(h);if(y)return g==="bypass"?y.bypass:y.dials[g]},p.getState=function(){return JSON.parse(JSON.stringify(a))},p.setState=function(h,g){d.disposed||d.tooFar(g&&g.at)||(b(kn(h,n),d.whenOf(g&&g.at)),d.emit({effect:null,key:null,value:null}))},p.addEffect=function(h,g){var y=g||{},v=jo(h,a.chain);if(!(!v||a.chain.length>=n||d.disposed||d.tooFar(y.at))){if(y.dials){var E=kn({v:2,chain:[{id:v.id,type:v.type,dials:y.dials}]},1).chain[0];v.dials=E.dials}y.bypass===!0&&(v.bypass=!0);var A=a.chain.slice(),$=typeof y.index=="number"?Math.max(0,Math.min(A.length,y.index)):A.length;return A.splice($,0,v),b({v:2,chain:A},d.whenOf(y.at)),d.emit({effect:v.id,key:"chain",value:"add"}),v.id}},p.removeEffect=function(h,g){var y=f(h),v=g&&g.at;return!y||d.disposed||d.tooFar(v)?!1:(b({v:2,chain:a.chain.filter(function(E){return E!==y})},d.whenOf(v)),d.emit({effect:y.id,key:"chain",value:"remove"}),!0)},p.moveEffect=function(h,g,y){var v=f(h),E=y&&y.at;if(!v||d.disposed||d.tooFar(E))return!1;var A=Vc(a.chain,a.chain.indexOf(v),g);return A===a.chain?!1:(b({v:2,chain:A},d.whenOf(E)),d.emit({effect:v.id,key:"chain",value:"move"}),!0)},p.getChain=function(){return a.chain.map(function(h){return{id:h.id,type:h.type,name:Xc(h),bypass:h.bypass}})},p.toAstrid=function(){return nd(a)},p}function kr(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function pd(e,t,n){var a=n||{},i=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,o=typeof a.toAudioTime=="function"?a.toAudioTime:i?function(f){return i.toContextTime(f)}:t&&t.timebase==="shared"?null:function(f){return f},s=typeof a.now=="function"?a.now:i&&typeof i.sharedNow=="function"?function(){return i.sharedNow()}:null,l=t&&t.transport?t.transport:t,c=l&&l.tempo?l.tempo:l,u=!1;function d(f){if(!o){!u&&typeof console<"u"&&(u=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof f!="number")){var m=o(l.timeAt(f));return typeof m=="number"&&isFinite(m)?m:void 0}}function p(){var f=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(f)){var m=l&&typeof l.bpm=="number"?l.bpm:kr(c,0);m>0&&e.setTempo(m);return}var w=kr(c,f);w>0&&e.setTempo(w);for(var b=c&&(c.points||c.tempoPoints)||[],h=0;h<b.length;h++){var g=b[h];if(g.beat>f&&g.bpm>0){var y=d(g.beat);y!==void 0&&e.setTempo(g.bpm,y)}}}return p(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(f){f&&(f.kind==="tempo"&&f.bpm>0?e.setTempo(f.bpm,d(f.atBeat)):(f.kind==="snapshot"||f.kind==="start")&&p())})}const hd="/nyx/assets/worklet-CAv1bvAp.js";var fd="nc-ui",md={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","nyx-amber":"#FEAA02","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},gi={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#9B30FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},zn={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},gd={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Ie={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},bd={light:{color:md.color,semantic:gi,component:zn,runtime:gd},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},_t=e=>`--${fd}-${e}`,za=gi["label-on-fill-dark"],$r=gi["label-on-fill-light"],yd=Ie["label-min-contrast"],wd=/^#[0-9a-f]{6}$/i,vd=e=>typeof e=="string"&&wd.test(e),$n=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Er(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),i=o=>{let s=(o+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${$n(i(0)*255)}${$n(i(8)*255)}${$n(i(4)*255)}`}function Uo(e){let[t,n,a]=[1,3,5].map(u=>parseInt(e.slice(u,u+2),16)/255),i=Math.max(t,n,a),o=Math.min(t,n,a),s=(i+o)/2,l=i-o;if(!l)return{h:0,s:0,l:s};let c=l/(1-Math.abs(2*s-1));return{h:((i===t?60*((n-a)/l%6):i===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:c,l:s}}function Ar(e){let[t,n,a]=[1,3,5].map(i=>{let o=parseInt(e.slice(i,i+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function Pa(e,t){let[n,a]=[Ar(e),Ar(t)].sort((i,o)=>o-i);return(n+.05)/(a+.05)}var Pn=e=>Pa(e,za)>=Pa(e,$r)?za:$r;function Wo(e,t,n,a=yd){let i=Er(e,t,n),o=Pn(i)===za?1:-1;for(let s=0;s<40&&Pa(i,Pn(i))<a;s++)n+=o*.01,i=Er(e,t,n);return i}function xd(e){let{h:t,s:n}=Uo(e),a=Wo(t,Math.min(n,Ie["surprise-on-max-saturation"]),Ie["surprise-on-lightness"]);return{fill:e,ink:Pn(e),on:a,onInk:Pn(a)}}var kd=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function $d(e,t=Math.random){let[n,a]=Ie["surprise-saturation"],[i,o]=Ie["surprise-lightness"],s=Ie["surprise-min-hue-gap"],l=vd(e)?Uo(e).h:null,c=t()*360;return l!==null&&kd(c,l)<s&&(c=(l+s+t()*(360-2*s))%360),Wo(c,n+t()*(a-n),i+t()*(o-i))}function Ed(e){if(!e)return null;let t=xd(e);return{[_t("surprise-fill")]:t.fill,[_t("surprise-ink")]:t.ink,[_t("surprise-on")]:t.on,[_t("surprise-on-ink")]:t.onInk}}var Ad=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Sd=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Sr(e){let[t,n,a]=[1,3,5].map(l=>Ad(parseInt(e.slice(l,l+2),16)/255)),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),o=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*i+.793617785*o-.0040720468*s,1.9779984951*i-2.428592205*o+.4505937099*s,.0259040371*i+.7827717662*o-.808675766*s]}function Md([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,i=(e-.1055613458*t-.0638541728*n)**3,o=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*i+.2309699292*o,-1.2684380046*a+2.6097574011*i-.3413193965*o,-.0041960863*a-.7034186147*i+1.707614701*o].map(s=>$n(Sd(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Ld=Ie["velocity-range"],Yo={min:zn.rhythm["velocity-min"],max:zn.rhythm["velocity-max"]},Mr=Object.fromEntries(Object.entries(bd).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Td(e,t=Yo){let[n,a]=Ld,i=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,o=(i-n)/(a-n),s=t.ink??zn.rhythm["step-cell-ink"];if(o<=0)return{velocity:i,t:0,fill:t.min.toUpperCase(),ink:s};if(o>=1)return{velocity:i,t:1,fill:t.max.toUpperCase(),ink:s};let l=Sr(t.min),c=Sr(t.max);return{velocity:i,t:o,fill:Md(l.map((u,d)=>u+(c[d]-u)*o)),ink:s}}function Lr(e,t=Yo){return{[_t("velocity-fill")]:Td(e,t).fill}}var Go="data-nc-theme",Tr="nc-ui-theme-change",Cd="(prefers-color-scheme: dark)",Ko=e=>e?.documentElement??null,Xo=e=>e?.defaultView?.matchMedia?.(Cd)??null,Fd=e=>e==="light"||e==="dark"?e:"system";function Nd(e=globalThis.document){return Fd(Ko(e)?.getAttribute(Go))}function Da(e=globalThis.document){let t=Nd(e);return t!=="system"?t:Xo(e)?.matches?"dark":"light"}function Vo(e,t=globalThis.document){let n=Ko(t);if(!n)return()=>{};let a=Da(t),i=()=>{let c=Da(t);c!==a&&(a=c,e(c))},o=t.defaultView?.MutationObserver,s=o?new o(i):null;s?.observe(n,{attributes:!0,attributeFilter:[Go]});let l=Xo(t);return l?.addEventListener?.("change",i),t.addEventListener(Tr,i),()=>{s?.disconnect(),l?.removeEventListener?.("change",i),t.removeEventListener(Tr,i)}}var zd={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Pd={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","eq-graph-height":"length","eq-graph-height-max":"length","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Dd={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},qd={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Xn={};for(let[e,t]of Object.entries(Pd))Xn[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(qd))Xn[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Dd))Xn[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(zd.renames.map(e=>[e.old,e.new]));function Qo(e){let t=Xn[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function W(e){return Qo(e).prop}function r(e){return`var(${W(e)})`}function Bd(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(W(t)));return Number.isFinite(n)?n:0}function Y(e,t){let n=Qo(t),a=e.ownerDocument??document,i=a.createElement("span");i.dataset.ncLive=t,i.style.position="absolute",i.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?i.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?i.style.paddingLeft=o:i.style.color=o,(e instanceof Element?e:a.documentElement).append(i);let s=(a.defaultView??window).getComputedStyle(i),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return i.remove(),l}function Jo(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function Od(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=r("font-ui"),n.style.fontSize=r("label-size"),n.style.fontWeight=r("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var Rd="[data-modulated], [data-modulated] *";function pa(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function Cr(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${r("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${r("hairline")} solid ${r("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function Id(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${r(`module-bg-stack-${a}`)};
      ${W("text-sub")}: ${r(`module-sub-stack-${a}`)};
      ${W("divider")}: ${r(`module-div-stack-${a}`)};
      ${W("slider-track")}: ${r(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${r(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${r(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
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
${Rd} { transition: none; }
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
  .nc-fold-toggle::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${r("target-min")});
    height: max(100%, ${r("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-strip[data-nc-folded] > .nc-strip-ms { gap: 0; }
  .nc-strip[data-nc-folded] .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: 0; margin-top: calc(${r("module-gap")} * -1); }
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
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-template-columns: repeat(3, ${r("fx-card-width")});
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
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { background: ${r("module-bg-adjacent-2")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { background: ${r("module-bg-adjacent-3")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { background: ${r("module-bg-adjacent-4")}; }
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
    width: ${r("fx-fold-width")};
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
    width: ${r("fx-fold-width")};
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
    width: ${r("fx-fold-width")};
    margin-inline-end: calc(${r("fx-fold-width")} * -1);
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
   (the master too, with empty M/S and send rows) keeps the same row heights, so faders and ticks line up. */
.nc-strip {
  position: relative;
  flex: none;
  width: ${r("strip-width")};
  display: grid;
  /* Name, Inserts, M/S, sends, pan, the fader body, the readout. */
  grid-template-rows: auto ${r("slider-pitch")} ${r("slider-pitch")} calc(${r("knob-size")} + ${r("control-gap")} + ${r("label-size")} * ${r("label-leading")}) calc(${r("knob-size")} + ${r("control-gap")} + ${r("label-size")} * ${r("label-leading")}) auto auto;
  justify-items: center;
  row-gap: ${r("module-gap")};
  min-width: 0;
  padding-inline: ${r("control-gap")};
}
/* sendsHidden: no sends row (the host's "hide the sends"); give it to every strip so their rows still line up. */
.nc-strip[data-nc-sends-hidden] {
  grid-template-rows: auto ${r("slider-pitch")} ${r("slider-pitch")} calc(${r("knob-size")} + ${r("control-gap")} + ${r("label-size")} * ${r("label-leading")}) auto auto;
}
.nc-strip[data-nc-sends-hidden] > .nc-strip-sends { display: none; }
.nc-strip + .nc-strip { border-inline-start: ${r("hairline")} solid ${r("divider")}; }
/* Channel strips alternate light and dark grey, full height, so a row of identical strips reads apart (Peter,
   2026-10-30); the master keeps the module's shade. */
.nc-strip:not([data-nc-master]) { background: ${r("strip-bg")}; }
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) { background: ${r("strip-alt-bg")}; }
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
.nc-strip[data-nc-folded] { width: ${r("strip-fold-width")}; padding-inline: 0; align-content: start; }
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
.nc-strip[data-nc-folded] > .nc-strip-ms { grid-row: 2 / span 2; flex-direction: column; height: auto; gap: ${r("module-gap")}; }
.nc-strip[data-nc-folded] .nc-ms-wrap { width: ${r("slider-pitch")}; }
/* Touch: each folded M and S a full target-min box (after the rule above, so it wins). */
@media (pointer: coarse) {
  .nc-strip[data-nc-folded] .nc-ms-wrap { width: ${r("target-min")}; }
}
.nc-strip[data-nc-folded] > .nc-strip-body {
  grid-row: 6;
  grid-template-columns: auto auto;
  column-gap: ${r("control-gap")};
}
.nc-strip[data-nc-folded][data-nc-sends-hidden] > .nc-strip-body { grid-row: 5; }
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
.nc-strip-ms { display: flex; gap: ${r("control-gap")}; height: ${r("slider-pitch")}; }
/* Hacks: a full-width toggle above M and S, in mixed case and a lighter grey (Peter); pressed while the console's fx area shows this strip's stack. */
.nc-strip-hacks { display: flex; width: 100%; height: ${r("slider-pitch")}; }
.nc-hacks-wrap { position: relative; flex: 1 1 auto; height: ${r("slider-pitch")}; }
.nc-hacks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  /* A light outline at rest (Peter, 2026-10-31): the divider; text-sub on hover, so it still reads as a button. */
  border: ${r("hairline")} solid ${r("divider")};
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
/* On the darker alternate strips the divider outline nearly vanishes: text-sub at 50% there (still lighter than the
   old outline); hover still takes it to text-sub. */
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) .nc-hacks:not([aria-pressed="true"]) {
  border-color: color-mix(in oklab, ${r("text-sub")} 50%, ${r("divider")});
}
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) .nc-hacks:not([aria-pressed="true"]):hover { border-color: ${r("text-sub")}; }
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
    radial-gradient(closest-side, ${r("surface-page")} 70%, transparent 72%),
    conic-gradient(from 225deg, ${r("meter-fill")} calc(var(--knob-turn, 0) * 1deg), ${r("meter-track")} 0 270deg, transparent 0);
}
/* A bipolar knob (pan) fills from the top of its travel (the centre) to the value, either way. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-knob {
  background:
    radial-gradient(closest-side, ${r("surface-page")} 70%, transparent 72%),
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
${Cr("")}
}
@media (max-width: 1023px) {
${Cr("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${pa("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${pa("")}
}
@media (max-width: 1023px) {
${pa("html[data-nc-landscape] ")}
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
`}var ha=null,jd="nc-ui-fallback";function Zo(e=globalThis.document){if(!e?.documentElement||(e.documentElement,ha&&ha.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${jd} {
${Id()}
}
`,e.head.append(t),ha=t}var It=null,Hd=0,_d=new URL("/nyx/assets/confirm-BSJWrX8s.css",import.meta.url).href,es=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=_d,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&es(document);function bi(e){return Ud(e).then(t=>!!t.ok)}function Ud({title:e,body:t,confirmLabel:n="Confirm",cancelLabel:a="Cancel",danger:i=!1,root:o,returnFocus:s,signal:l},c){if(It||l?.aborted)return Promise.resolve({});let u=o?.ownerDocument??document,d=es(u),p=o??u.body,f=u.defaultView??globalThis,m=`nc-ui-confirm-${++Hd}`,w=(D,ae,pe)=>{let De=u.createElement(D);return De.className=`nc-ui-confirm${ae}`,pe!=null&&(De.textContent=pe),De},b=w("div","-layer");b.dataset.state="enter";let h=w("div","");h.setAttribute("role","alertdialog"),h.setAttribute("aria-modal","true"),h.setAttribute("aria-labelledby",`${m}-t`),h.setAttribute("aria-describedby",`${m}-b`);let g=w("h2","-title",e);g.id=`${m}-t`;let y=w("p","-body",t);y.id=`${m}-b`;let v=w("div","-actions"),E=(D,ae)=>{let pe=w("button","-btn",D);return pe.type="button",pe.dataset.ncConfirm=ae,pe.addEventListener("click",()=>Pe(ae==="ok")),pe},A=E(a,"cancel"),$=E(n,"ok");i&&($.dataset.danger="true"),v.append(A,$);let[k,M]=[];h.append(g,y,...k?[k]:[],v);let C=[M,A,$].filter(Boolean);b.append(h);let _={layer:b};It=_;let V=s??u.activeElement,be=[];for(let D of p.children)D.hasAttribute("inert")||(D.setAttribute("inert",""),be.push(D));let P=()=>{if(It!==_)return;p.append(b),(M??A).focus({preventScroll:!0});let D=f.requestAnimationFrame?.bind(f)??(ae=>setTimeout(ae,16));D(()=>D(()=>{b.dataset.state==="enter"&&(b.dataset.state="open")}))};d?d.then(P):P();let ze=!1;b.addEventListener("pointerdown",D=>{ze=D.target===b}),b.addEventListener("click",D=>{D.target===b&&ze&&Pe(!1),ze=!1});let Dt=D=>{if(D.stopImmediatePropagation(),D.key==="Escape")D.preventDefault(),Pe(!1);else if(D.key==="Tab"){D.preventDefault();let ae=C.filter(De=>!De.disabled),pe=ae.length;ae[(ae.indexOf(u.activeElement)+(D.shiftKey?pe-1:1))%pe].focus()}else D.key==="Enter"&&(D.preventDefault(),u.activeElement===A?Pe(!1):$.disabled||Pe(!0))},qt=D=>D.stopImmediatePropagation();f.addEventListener("keydown",Dt,!0),f.addEventListener("keyup",qt,!0);let ot=()=>Pe(!1);l?.addEventListener("abort",ot);let ne,hn=new Promise(D=>{ne=D});function Pe(D){if(It!==_)return;It=null,f.removeEventListener("keydown",Dt,!0),f.removeEventListener("keyup",qt,!0),l?.removeEventListener("abort",ot);for(let st of be)st.removeAttribute("inert");b.dataset.state="closing",V?.isConnected&&typeof V.focus=="function"&&V.focus({preventScroll:!0});let ae=f.getComputedStyle?.(b),pe=Math.max(0,...String(ae?.transitionDuration??"").split(",").map(st=>Number.parseFloat(st)*(st.trim().endsWith("ms")?1:1e3)||0)),De=()=>b.remove();b.addEventListener("transitionend",st=>st.target===b&&De()),setTimeout(De,pe+50),ne({ok:D,value:M?.value.trim()})}return hn}function ts(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let i=t.createElement("span");i.dataset.ncOn="",i.textContent=e.onText??"On";let o=t.createElement("span");o.dataset.ncOff="",o.textContent=e.offText??"Off",a.append(i,o),n.append(a);let s=!1,l=u=>{s=u===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let c=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",c),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var ns=new WeakMap,Fr=.25;function Wd(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let i=t.createElement("span");i.className="nc-fader-cap",i.setAttribute("aria-hidden","true"),n.append(a,i);let o=0,s=e.step??.005,l=e.onChange,c=e.onReset,u=h=>Math.min(1,Math.max(0,h)),d=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},p=h=>{let g=u(h);g!==o&&(o=g,d(),l?.(g))},f=0,m=!1;n.addEventListener("pointerdown",h=>{if(h.button!==0)return;h.preventDefault(),n.focus?.({preventScroll:!0});let g=n.getBoundingClientRect();h.target!==i&&g.height>0&&p(1-(h.clientY-g.top)/g.height),f=h.clientY,m=!0,n.dataset.dragging="true",n.setPointerCapture?.(h.pointerId)}),n.addEventListener("pointermove",h=>{if(!m)return;let g=n.getBoundingClientRect().height||1,y=(f-h.clientY)/g*(h.shiftKey?Fr:1);f=h.clientY,p(o+y)});let w=()=>{m=!1,delete n.dataset.dragging};n.addEventListener("pointerup",w),n.addEventListener("pointercancel",w),n.addEventListener("lostpointercapture",w),n.addEventListener("dblclick",h=>{h.preventDefault(),c?.()}),n.addEventListener("keydown",h=>{let g=h.shiftKey?s*Fr:s,y={ArrowUp:o+g,ArrowRight:o+g,ArrowDown:o-g,ArrowLeft:o-g,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};h.key in y&&(h.preventDefault(),p(y[h.key]))});let b={el:n,get value(){return o},get dragging(){return m},set(h){m||(o=u(Number(h)||0),d())},setText(h){h?n.setAttribute("aria-valuetext",h):n.removeAttribute("aria-valuetext")},setLabel(h){n.setAttribute("aria-label",h)},configure(h){typeof h.step=="number"&&h.step>0&&(s=h.step),h.onChange&&(l=h.onChange),h.onReset&&(c=h.onReset)}};return b.setLabel(e.label),b.set(e.value??0),b.setText(e.valueText),ns.set(n,b),b}function Yd(e){return ns.get(e)}var as=new WeakMap,Gd=.2,Kd=1.5,Xd=.5;function Vd(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function Nr(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Vd(a.getComputedStyle(e).getPropertyValue(W(t)),n)}function Qd(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let i=t.createElement("button");i.type="button",i.className="nc-meter-clip",i.dataset.lit="false";let o=t.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let b=0;b<n;b++){let h=t.createElement("span");h.className="nc-meter-bar";let g=t.createElement("span");g.className="nc-meter-peak";let y=t.createElement("span");y.className="nc-meter-rms";let v=t.createElement("span");v.className="nc-meter-hold",h.append(g,y,v),o.append(h),s.push({peak:g,rms:y,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(i,o);let l=e.label,c=e.onClear,u=!1,d=-1,p=-1,f=()=>{i.dataset.lit=u?"true":"false",i.setAttribute("aria-pressed",u?"true":"false"),i.setAttribute("aria-label",u?`${l} clipped: clear`:`${l} clip light`),i.title=u?"Clipped. Click to clear":"Clip light"},m=(b,h,g,y)=>{let v=Math.round(y*1e3)/1e3;g[h]!==v&&(g[h]=v,b.style.transform=h==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};i.addEventListener("click",()=>{w.clear(),c?.()});let w={el:a,get clipped(){return u},update(b,h){d<0&&(d=Nr(a,"motion-meter-fall",Gd)),p<0&&(p=Nr(a,"motion-meter-hold",Kd));let g=Math.max(0,Math.min(.25,Number(h)||0)),y=d>0?Math.exp(-g/d):0;s.forEach((v,E)=>{let A=b[E]??b[0]??{peak:0,rms:0},$=Math.min(1,Math.max(0,Number(A.peak)||0)),k=Math.min($,Math.max(0,Number(A.rms)||0));A.over&&w.clip(),v.level.peak=$>=v.level.peak?$:$+(v.level.peak-$)*y,v.level.rms=k>=v.level.rms?k:k+(v.level.rms-k)*y,v.holdAge+=g,$>=v.holdAt?(v.holdAt=$,v.holdAge=0):v.holdAge>p&&(v.holdAt=Math.max($,v.holdAt-Xd*g)),m(v.peak,"peak",v.shown,v.level.peak),m(v.rms,"rms",v.shown,v.level.rms),m(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){u||(u=!0,f())},clear(){u=!1,f()},reset(){for(let b of s)b.level.peak=0,b.level.rms=0,b.holdAt=0,b.holdAge=0,m(b.peak,"peak",b.shown,0),m(b.rms,"rms",b.shown,0),m(b.hold,"hold",b.shown,0),b.hold.dataset.off="true"},setLabel(b){l=b,f()},configure(b){b.onClear&&(c=b.onClear)}};return f(),w.reset(),as.set(a,w),w}function Jd(e){return e?as.get(e):void 0}var Zd=3,eu=new Set(["freq","q","rate","time","log"]);function yi(e,t,n){return!e||!eu.has(e)||!(n>t)?"linear":t>0?"log":"power"}function Vn(e,t,n){return yi(e,t,n)!=="linear"}function wi(e,t,n,a){let i=Number(a);if(!(n>t)||!Number.isFinite(i))return 0;let o=Math.min(n,Math.max(t,i)),s=yi(e,t,n);if(s==="log")return Math.log(o/t)/Math.log(n/t);let l=(o-t)/(n-t);return s==="power"?Math.cbrt(l):l}function is(e,t,n,a){let i=Math.min(1,Math.max(0,Number(a)||0)),o=yi(e,t,n);return o==="log"?t*(n/t)**i:t+(n-t)*(o==="power"?i**Zd:i)}function rs(e,t,n,a){let i=Math.min(n,Math.max(t,e));if(a>0){i=t+Math.round((i-t)/a)*a;let o=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));i=Number(i.toFixed(o)),i=Math.min(n,Math.max(t,i))}return i}function vi(e,t,n,a){return Math.round(wi(e,t,n,a)*1e3)}function qa(e,t,n,a,i){return rs(is(e,t,n,Number(a)/1e3),t,n,i)}function tu(e,t,n=!1){let a=Number(e)||0,i=n?1:1e3/100,o=null;return t==="ArrowRight"||t==="ArrowUp"?o=a+i:t==="ArrowLeft"||t==="ArrowDown"?o=a-i:t==="PageUp"?o=a+1e3/10:t==="PageDown"?o=a-1e3/10:t==="Home"?o=0:t==="End"&&(o=1e3),o===null?null:Math.min(1e3,Math.max(0,Math.round(o)))}function os(e,t,n,a,i,o=!1,s){let l=vi(e,t,n,a),c=tu(l,i,o);if(c===null)return null;let u=qa(e,t,n,c,s),d=Math.sign(c-l),p=rs(Number(a),t,n,s);for(;d!==0&&u===p&&c>0&&c<1e3;)c+=d,u=qa(e,t,n,c,s);return u}function nu(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function zr(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function au(e,t,n,a=n/6){let i=e.some(d=>d===null),o=Math.max(0,n-(i?a:0)),s=e.reduce((d,p,f)=>p===null?d:d+zr(t[f]),0),l=s>0?o/s:0,c=e.map(d=>d===null?0:Math.min(o,zr(d)*l));if(i){let d=c.reduce((f,m)=>f+m,0),p=e.indexOf(null);c[p]=Math.max(a,n-d)}let u=[0];for(let d of c)u.push(Math.round((u[u.length-1]+d)*100)/100);return i&&(u[u.length-1]=n),u}function iu(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.floor(t*a)),o=Math.max(1,Math.floor(n*a));(e.width!==i||e.height!==o)&&(e.width=i,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function qe(e){return Math.max(0,Math.min(1,e))}function ss(e,t){let{ctx:n,w:a,h:i}=iu(e);if(!n)return;n.clearRect(0,0,a,i);let o=Od(e);if(t.paint==="swatch"){let c=Y(e,"accent"),u=Y(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=u,n.fillStyle=c,n.fillRect(0,0,a/2,i),n.fillStyle=u,n.fillRect(a/2,0,a/2,i);return}if(t.paint==="filter"&&typeof t.hz=="number"){su(n,a,i,t,e,o);return}if(t.paint==="filter"){let c=t.mode??"lp",u=Y(e,Jo(c)),d=Y(e,"divider"),p=qe(t.cutoff??.5),f=.08+(1-qe(t.resonance??.2))*.22;n.strokeStyle=d,n.beginPath(),n.moveTo(0,i*.72),n.lineTo(a,i*.72),n.stroke(),n.beginPath();for(let m=0;m<=a;m++){let w=m/Math.max(1,a),b=0;c==="lp"?b=w<p?1:Math.max(0,1-(w-p)/f):c==="hp"?b=w>p?1:Math.max(0,1-(p-w)/f):b=Math.max(0,1-Math.abs(w-p)/f);let h=i*.78-b*i*.62;m===0?n.moveTo(m,h):n.lineTo(m,h)}n.strokeStyle=u,n.stroke(),n.fillStyle=Y(e,"text-sub"),n.font=o,n.fillText(c.toUpperCase(),0,i),e.dataset.ncAccent=u;return}if(t.paint==="envelope"){n.strokeStyle=Y(e,"accent");let c=Math.max(0,t.attack??0),u=Math.max(0,t.decay??.4),[d,p,f]=au([c,u],t.max??[1,4],a),m=2,w=i-1;n.beginPath(),n.moveTo(d,w),n.lineTo(p,m);let b=Math.max(1,Math.ceil(f-p));for(let h=1;h<=b;h++){let g=h/b;n.lineTo(p+(f-p)*g,w-(w-m)*Math.exp(-4.6*g)*(1-g*.01))}n.lineTo(f,w),n.lineTo(a,w),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[u,d]=Array.isArray(t.region)?t.region:[0,1],p=Y(e,"accent"),f=Y(e,"text-sub"),m=i/2;n.fillStyle=Y(e,"accent-soft"),n.fillRect(qe(u)*a,0,(qe(d)-qe(u))*a,i),n.strokeStyle=Y(e,"divider"),n.beginPath(),n.moveTo(0,m),n.lineTo(a,m),n.stroke();let w=Math.floor(c.length/2);for(let b=0;b<w;b++){let h=(b+.5)/w*a,g=Math.max(-1,Math.min(1,c[b*2]??0)),y=Math.max(-1,Math.min(1,c[b*2+1]??0)),v=(b+.5)/w;n.strokeStyle=v>=u&&v<=d?p:f,n.beginPath(),n.moveTo(h,m-y*(m-1)),n.lineTo(h,m-g*(m-1)+.5),n.stroke()}n.strokeStyle=p;for(let b of[u,d,...Array.isArray(t.markers)?t.markers:[]]){let h=Math.round(qe(b)*(a-1))+.5;n.beginPath(),n.moveTo(h,0),n.lineTo(h,i),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=Y(e,"text"),n.fillRect(Math.round(qe(t.position)*(a-1)),0,1,i)),w||(n.fillStyle=f,n.font=o,n.fillText(t.empty??"Empty",0,m+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let c=qe(t.level??0);n.fillStyle=Y(e,"divider"),n.fillRect(0,i*.4,a,i*.2),n.fillStyle=Y(e,"accent"),n.fillRect(0,i*.4,a*c,i*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=Y(e,"rhythm.step-cell-off"),n.fillRect(0,i*.45,a,i*.1),n.fillStyle=Y(e,"rhythm.playhead"),n.fillRect(l/s*a,i*.3,Math.max(1,a/s),i*.4),e.dataset.ncAccent=Y(e,"accent")}var Kt=20,Ba=2e4,fa=24,Pr=-60;function ru(e,t,n,a,i=48e3){let o=2*Math.PI*Math.min(t,i*.49)/i,s=Math.cos(o),l=Math.sin(o)/(2*n),c,u,d;e==="hp"?[c,u,d]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[c,u,d]=[l,0,-l]:[c,u,d]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,f=-2*s,m=1-l,w=2*Math.PI*a/i,b=(v,E,A)=>v+E*Math.cos(w)+A*Math.cos(2*w),h=(v,E)=>-(v*Math.sin(w)+E*Math.sin(2*w)),g=Math.hypot(b(c,u,d),h(u,d)),y=Math.hypot(b(p,f,m),h(f,m));return y>0?g/y:0}function ou(e,t){return Math.log(Math.max(Kt,Math.min(Ba,e))/Kt)/Math.log(Ba/Kt)*t}function Dr(e,t,n){let a=Math.max(Pr,Math.min(fa,e));return t+(fa-a)/(fa-Pr)*(n-t)}function su(e,t,n,a,i,o){let s=a.mode??"lp",l=Y(i,Jo(s)),c=Y(i,"divider"),u=Y(i,"text-sub"),d=Number.parseFloat(String(o).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,f=Math.max(p+4,n-d-3),m=a.q??Math.SQRT1_2,w=Math.round(Dr(0,p,f))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,w),e.lineTo(t,w),e.stroke(),e.beginPath();for(let b=0;b<=t;b++){let h=Kt*(Ba/Kt)**(b/Math.max(1,t)),g=a.open?1:ru(s,a.hz,m,h,a.sampleRate),y=Dr(20*Math.log10(Math.max(1e-5,g)),p,f);b===0?e.moveTo(b,y):e.lineTo(b,y)}if(e.strokeStyle=l,e.stroke(),!a.open){let b=Math.round(ou(a.hz,t))+.5;e.strokeStyle=u,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(b,p),e.lineTo(b,f),e.stroke(),e.setLineDash?.([])}e.fillStyle=u,e.font=o,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",i.dataset.ncAccent=l,i.dataset.ncFilterHz=String(Math.round(a.hz))}function ve(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let i=n.defaultView.getComputedStyle(a).color;return a.remove(),i}function lu(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var et=20,un=2e4,xi=Math.log(un/et),Oa=32,cu=250,du=-100,uu=1200,pu=4.5,qr=-6,Xe=-96,hu=48,Br=[100,1e3,1e4],fu=[6,12];function bt(e,t){return Math.log(Math.max(et,Math.min(un,e))/et)/xi*t}function En(e,t){return et*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*xi)}function je(e,t,n,a){let i=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*i}function Ra(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var ls=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function mu(e,t,n,a){let i=n?3:1,o=c=>({db:Math.max(-a,Math.min(a,e.db+c*i))}),s=c=>({hz:Math.max(e.minHz??et,Math.min(e.maxHz??un,e.hz*2**(c*i/6)))}),l=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*i)))});switch(t){case"ArrowUp":return o(1);case"ArrowDown":return o(-1);case"ArrowRight":return e.moveHz?s(1):o(1);case"ArrowLeft":return e.moveHz?s(-1):o(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function ki(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function gu(e,t,n,a,i,o,s,l,c){let u=c?.25:1,d={},p=Math.max(1,o/2-l);if(d.db=Math.max(-s,Math.min(s,t.db-a*u/p*s/ki(e))),e.moveHz){let f=t.hz*Math.exp(n*u/Math.max(1,i)*xi);d.hz=Math.max(e.minHz??et,Math.min(e.maxHz??un,f))}return d}function bu(e,t,n,a,i){let o=Math.max(0,n.left)+1,s=Math.min(n.right,i)-1,l=Math.min(t.width*3+a*2,s-o),c=Math.max(o,Math.min(e.left,s-l));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var Z=new WeakMap;function yu(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let i=document.createElement("canvas");i.className="nc-eq-spectrum",i.setAttribute("aria-hidden","true");let o=document.createElement("canvas");o.className="nc-eq-curve",o.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(i,o);for(let c of e.bands)a.append(wu(n,c,t));a.append(s),a.addEventListener("click",c=>{if(!fs(n)||c.button>0)return;let u=hs(n)?.querySelector("[data-nc-max-toggle]");u instanceof HTMLElement&&u.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),Z.set(n,{control:e,cache:null,spec:null,active:null}),ds(n,e),n}function cs(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function wu(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let i=()=>{let u=n(e);return u?.type==="eqGraph"?u:null},o=()=>i()?.bands.find(u=>u.id===t.id)??null,s=null;a.addEventListener("pointerdown",u=>{if(u.button!==0)return;let d=o();d&&(u.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(u.pointerId),s={id:u.pointerId,x:u.clientX,y:u.clientY,start:{hz:d.hz,db:d.db}},a.dataset.drag="true",Be(e,t.id))}),a.addEventListener("pointermove",u=>{if(!s||u.pointerId!==s.id)return;let d=i(),p=o(),f=Z.get(e);if(!d||!p||!f?.box)return;let{w:m,h:w,pad:b}=f.box;d.onBand(p.id,gu(p,s.start,u.clientX-s.x,u.clientY-s.y,m,w,d.range??18,b,u.shiftKey))});let l=u=>{!s||u.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&Be(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",u=>{u.preventDefault(),i()?.onReset?.(t.id)}),a.addEventListener("keydown",u=>{let d=i(),p=o();if(!d||!p)return;let f=mu(p,u.key,u.shiftKey,d.range??18);f&&(u.preventDefault(),f==="reset"?d.onReset?.(p.id):d.onBand(p.id,f),Be(e,p.id))});let c=null;return a.addEventListener("wheel",u=>{let d=i(),p=o();if(!d||!p?.moveQ)return;u.preventDefault();let f=u.timeStamp;(!c||f-c.t>400)&&(c={q:p.q,t:f});let m=u.deltaMode===1?u.deltaY*16:u.deltaMode===2?u.deltaY*400:u.deltaY;c.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,c.q*2**(-m/240))),c.t=f,d.onBand(p.id,{q:c.q}),Be(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>Be(e,t.id)),a.addEventListener("focus",()=>Be(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&Be(e,null)}),a.addEventListener("blur",()=>{s||Be(e,null)}),a}function Be(e,t){let n=Z.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?xt(e):$i(e)}function $i(e){let t=Z.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(w=>w.id===t.active):null;for(let w of e.querySelectorAll(".nc-eq-node"))w instanceof HTMLElement&&(a&&w.dataset.band===a.id?w.dataset.active="true":delete w.dataset.active);if(!a||!t.box){n.hidden=!0;return}let i=[a.label,ls(a.db)];a.kind==="peak"?i.push(Ra(a.hz),`Q ${a.q.toFixed(1)}`):i.push(`${a.kind==="lowshelf"?"below":"above"} ${Ra(a.hz)}`),n.textContent=i.join(" · "),n.dataset.tone=String(vu(t.control,a)),n.hidden=!1;let{w:o,h:s,pad:l}=t.box,c=bt(a.hz,o),u=je(a.db*ki(a),s,t.control.range??18,l),d=n.offsetWidth,p=n.offsetHeight,f=Math.max(0,Math.min(o-d,c-d/2)),m=u-p-l*1.5>=0?u-p-l*1.5:Math.min(s-p,u+l*1.5);n.style.left=`${Math.round(f)}px`,n.style.top=`${Math.round(m)}px`}function vu(e,t){return e.bands.indexOf(t)%3+1}function ds(e,t){let n=Z.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Ei(e);let a=t.range??18;t.bands.forEach((i,o)=>{let s=cs(e,i.id);s instanceof HTMLElement&&(s.dataset.tone=String(o%3+1),s.dataset.kind=i.kind,s.setAttribute("aria-label",`${i.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(i.db)),s.setAttribute("aria-valuetext",i.valueText??`${ls(i.db)}, ${Ra(i.hz)}`),s.setAttribute("aria-keyshortcuts",i.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),i.help?s.setAttribute("data-nc-help",i.help):s.removeAttribute("data-nc-help"))}),xt(e),Su(e)}function us(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.round(t*a)),o=Math.max(1,Math.round(n*a));(e.width!==i||e.height!==o)&&(e.width=i,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function ps(e){return{curve:ve(e,"eq-curve"),fill:ve(e,"eq-fill"),quiet:ve(e,"text-sub"),grid:ve(e,"eq-grid"),zero:ve(e,"divider"),label:ve(e,"text-sub"),spectrum:ve(e,"eq-spectrum"),bands:[ve(e,"eq-band-1"),ve(e,"eq-band-2"),ve(e,"eq-band-3")]}}function xu(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function xt(e){Z.has(e)&&Ei(e);let t=Z.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:i,w:o,h:s}=us(n);if(!i)return;let l=Math.max(8,Math.round(s*.06)),c=a.range??18;t.box={w:o,h:s,pad:l},t.colours=ps(e);let u=t.colours,d=xu(a,o);if(!t.cache||t.cache.key!==d){let E=Math.max(64,Math.ceil(o)+1),A=new Float64Array(E);for(let k=0;k<E;k++)A[k]=En(k/(E-1)*o,o);let $=null;try{$=typeof a.response=="function"?a.response(A):null}catch{$=null}t.cache={key:d,freqs:A,total:$?.total??new Float64Array(E),bands:$?.bands??[]}}i.clearRect(0,0,o,s);let p=lu(e),f=a.on!==!1;ku(i,o,s,c,l,u,p);let{freqs:m,total:w,bands:b}=t.cache,h=Array.from(m,E=>bt(E,o)),g=je(0,s,c,l);b.forEach((E,A)=>{if(!E||!E.some(M=>Math.abs(M)>.05))return;let $=f?u.bands[A%3]:u.quiet,k=Array.from(E,M=>je(M,s,c,l));i.save(),t.active&&a.bands[A]?.id===t.active&&(i.globalAlpha=.14,i.fillStyle=$,Or(i,h,k,g)),i.globalAlpha=f?.75:.4,i.strokeStyle=$,i.lineWidth=.75,ma(i,h,k),i.restore()});let y=Array.from(w,E=>je(E,s,c,l)),v=f?u.curve:u.quiet;i.save(),i.fillStyle=f?u.fill:u.quiet,i.globalAlpha=f?.2:.08,Or(i,h,y,g),i.restore(),i.save(),i.strokeStyle=f?u.fill:v,i.lineJoin="round",i.lineCap="round",f&&(i.globalAlpha=.16,i.lineWidth=4,ma(i,h,y)),i.globalAlpha=1,i.strokeStyle=v,i.lineWidth=1.25,ma(i,h,y),i.restore(),$u(e),$i(e)}function ku(e,t,n,a,i,o,s){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let u=1;u<=9;u++){let d=c*u;if(d<et||d>un)continue;let p=Math.round(bt(d,t))+.5;e.globalAlpha=Br.includes(d)?.9:.35,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let c of fu)if(!(c>a))for(let u of[1,-1]){let d=Math.round(je(c*u,n,a,i))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(0,d),e.lineTo(t,d),e.stroke()}e.globalAlpha=1,e.strokeStyle=o.zero;let l=Math.round(je(0,n,a,i))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=o.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of Br){let u=c>=1e3?`${c/1e3}k`:String(c),d=e.measureText(u).width,p=bt(c,t)+3;e.fillText(u,p+d+2>t?bt(c,t)-d-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>a)continue;let u=je(c,n,a,i);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(u)-1)}e.restore()}function Dn(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let i=(t[a]+t[a+1])/2,o=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],i,o)}e.lineTo(t[t.length-1],n[n.length-1])}function ma(e,t,n){e.beginPath(),Dn(e,t,n),e.stroke()}function Or(e,t,n,a){e.beginPath(),Dn(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function hs(e){return e.closest("[data-nc-maxable]")}function fs(e){let t=hs(e);return!!t&&!t.hasAttribute("data-nc-max")}function Ei(e){let t=fs(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=Z.get(e);n?.active&&(n.active=null,$i(e))}return t}function $u(e){Ei(e);let t=Z.get(e);if(!t?.box)return;let{w:n,h:a,pad:i}=t.box,o=t.control.range??18;for(let s of t.control.bands){let l=cs(e,s.id);l instanceof HTMLElement&&(l.style.left=`${bt(s.hz,n).toFixed(1)}px`,l.style.top=`${je(s.db*ki(s),a,o,i).toFixed(1)}px`)}}function Eu(e,t,n,a){let i=a/2/n,o=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let c=0;c<e;c++){let u=(c-.5)/(e-1)*t,d=(c+.5)/(e-1)*t,p=En(u,t),f=En(d,t),m=En(c/(e-1)*t,t);o[c]=Math.min(n-1,p/i),s[c]=Math.min(n-1,f/i),l[c]=pu*Math.log2(m/1e3)}return{lo:o,hi:s,tilt:l}}function Au(e,t,n){let a=Math.floor(t),i=Math.ceil(n);if(i-a<=1){let s=t-a,l=e[a]??-1/0,c=e[Math.min(e.length-1,a+1)]??l;return l+(c-l)*s}let o=-1/0;for(let s=a;s<=i&&s<e.length;s++)e[s]>o&&(o=e[s]);return o}function Su(e){let t=Z.get(e);if(t){if(!t.control.spectrum){gs(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let i=Z.get(e)?.spec;i&&(i.visible=a.some(o=>o.isIntersecting),Ia(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Ia(e)}}function Ia(e){let t=Z.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){ms(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=ja(e),n.onVis||(n.onVis=()=>Ia(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Ha(e,!1)}function ja(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function Ha(e,t){let n=Z.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,ga(e,ja(e))),cu):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(i=>(n.raf=0,ga(e,i))):n.timer=a.setTimeout(()=>(n.timer=0,ga(e,ja(e))),Oa))}function ms(e){let t=Z.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function gs(e){let t=Z.get(e)?.spec;if(!t)return;ms(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=Z.get(e);n&&(n.spec=null)}function ga(e,t){let n=Z.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){gs(e);return}if(!a.analyser)return;if(t-a.last<Oa-4&&!a.idle){Ha(e,!1);return}let i=a.last?Math.min(.25,(t-a.last)/1e3):Oa/1e3;a.last=t;let o=e.querySelector(".nc-eq-spectrum");if(!(o instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:c}=us(o);if(!s)return;let u=Math.max(16,Math.round(l/2)),d=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==u||a.map.w!==l||a.map.sr!==d)&&(a.map={cols:u,w:l,sr:d,...Eu(u,l,a.buf.length,d)},a.disp=new Float32Array(u).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,f=hu*i,{lo:m,hi:w,tilt:b}=a.map;for(let g=0;g<u;g++){let y=Au(a.buf,m[g],w[g]);y>p&&(p=y);let v=y+b[g],E=a.disp[g]-f;a.disp[g]=v>E?v:E}p>du&&(a.loud=t);let h=t-a.loud>uu;s.clearRect(0,0,l,c),(!h||a.disp.some(g=>g>Xe))&&Mu(s,l,c,a.disp,n.colours??ps(e)),a.idle=h&&!a.disp.some(g=>g>Xe),Ha(e,a.idle)}function Mu(e,t,n,a,i){let o=a.length,s=new Array(o),l=new Array(o),c=u=>{let d=a[Math.max(0,Math.min(o-1,u))];return Number.isFinite(d)?d:Xe};for(let u=0;u<o;u++){let d=c(u)*.36+(c(u-1)+c(u+1))*.22+(c(u-2)+c(u+2))*.1,p=(Math.max(Xe,Math.min(qr,Number.isFinite(d)?d:Xe))-Xe)/(qr-Xe);s[u]=u/(o-1)*t,l[u]=n-p*n}e.save(),e.fillStyle=i.spectrum,e.globalAlpha=.13,e.beginPath(),Dn(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=i.spectrum,e.lineWidth=1,e.beginPath(),Dn(e,s,l),e.stroke(),e.restore()}var Lu=.8912509381337456,_a=32,Tu=250,Cu=1200,Fu=.2,bs=1.5;function Nu(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function zu(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let i=e.createElement("span");i.className="nc-fx-level-fill",a.append(i),t.append(a)}return t}var qn=new WeakMap,Rr=new WeakMap;function Ir(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let i=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),o=Number.parseFloat(i);return Number.isFinite(o)?i.endsWith("ms")?o/1e3:o:n}function Pu(e){let t=Rr.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(i=>{for(let o of i){let s=qn.get(o.target);s&&(s.seen.set(o.target,o.isIntersecting),Xt(s))}mt(t)})),e.addEventListener("visibilitychange",()=>{for(let i of t.recs)Xt(i);mt(t)}),Rr.set(e,t),t}var ys=e=>e.els.some(t=>t.isConnected);function Du(e){if(!e.loop.io)return ys(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function Xt(e){let t=!e.dead&&!!e.source&&Du(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Ai(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Ya(e))}function Ai(e){return e.doc.defaultView?.performance?.now()??Date.now()}function mt(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){ws(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Ai(e)),!e.raf&&!e.timer&&Ua(e,!1)}function Ua(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>jr(e,Ai(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),Tu):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(i=>(e.raf=0,jr(e,i))):e.timer=n.setTimeout(()=>(e.timer=0,a()),_a)}function ws(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function jr(e,t){if(t-e.last<_a-4&&!e.idle&&e.last){Ua(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):_a/1e3;e.last=t,e.frames++;let a=!1,i=!1;for(let o of e.recs){if(!ys(o)){(o.placed||e.frames-o.born>90)&&vs(o);continue}o.placed=!0,o.open&&(i=!0,qu(o,n,t)&&(e.loud=t),(o.disp[0]>0||o.disp[1]>0)&&(a=!0))}if(!i){ws(e);return}e.idle=t-e.loud>Cu&&!a,Ua(e,e.idle)}function qu(e,t,n){if(e.fall<0){let f=e.els[0];e.fall=Ir(f,"motion-meter-fall",Fu),e.hold=Ir(f,"motion-meter-hold",bs)}let a=null;try{a=e.source.read()}catch{a=null}let i=typeof a=="number",o=i?a:Number(a?.in)||0,s=!i&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,c=s?"2":"1";if(e.rows!==c){e.rows=c;for(let f of e.els)f.dataset.ncRows=c}let u=e.fall>0?Math.exp(-t/e.fall):0,d=[o,l],p=!1;for(let f=0;f<2;f++){let m=Nu(d[f]);m>0&&(p=!0),e.disp[f]=m>=e.disp[f]?m:m+(e.disp[f]-m)*u,e.disp[f]<.001&&(e.disp[f]=0),d[f]>=Lu&&(e.clipAt[f]=n);let w=e.clipAt[f]>0&&n-e.clipAt[f]<e.hold*1e3;Wa(e,f,e.disp[f],w)}return p}function Wa(e,t,n,a){let i=Math.round(n*1e3)/1e3,o=a?"true":"false";if(!(e.shown[t]===i&&e.clipShown[t]===o)){e.shown[t]=i,e.clipShown[t]=o;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${i})`,l.dataset.clip=o)}}}function Ya(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Wa(e,0,0,!1),Wa(e,1,0,!1)}function vs(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),qn.get(t)===e&&qn.delete(t)}function Bu(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,i=Pu(a),o={els:n,source:t??null,loop:i,open:!1,dead:!1,seen:new Map,born:i.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:bs,rows:""};for(let s of n)qn.set(s,o),i.io?.observe(s);if(i.recs.add(o),Ya(o),!i.io){let s=a.defaultView,l=()=>{Xt(o),mt(i)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!o.dead){if(l===o.source){Xt(o),mt(i);return}o.open&&(o.open=!1,o.source?.close?.(),Ya(o)),o.source=l,Xt(o),mt(i)}},destroy(){o.dead||vs(o),mt(i)}}}var xs={slop:8,longPressMs:500,pitchPx:16},Ou=class{constructor(e,t,n=xs){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let i=this.hit(t,n);return i<0?!1:(this.phase="pending",this.pointer=e,this.pad=i,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let i=t-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(i,o)<this.config.slop)return;Math.abs(o)>=Math.abs(i)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-o/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Ru(e,t,n,a=xs){let i=!1,o=0,s=(u,d)=>{let p=e.ownerDocument.elementFromPoint?.(u,d),f=[...e.querySelectorAll(t)],m=p?f.findIndex(h=>h===p||h.contains(p)):-1;if(m>=0)return m;let w=-1,b=Number.POSITIVE_INFINITY;return f.forEach((h,g)=>{if(h.hidden)return;let y=h.getBoundingClientRect();if(d<y.top||d>y.bottom)return;let v=Math.abs(u-(y.left+y.width/2));v<b&&v<=y.width&&(w=g,b=v)}),w},l=new Ou(s,u=>{(u.kind==="paint"||u.kind==="long")&&(i=!0),n(u)},a),c=()=>{o&&clearTimeout(o),o=0};return e.addEventListener("pointerdown",u=>{u.button>0||(i=!1,l.down(u.pointerId,u.clientX,u.clientY,u.timeStamp)&&(c(),o=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",u=>{l.state!=="idle"&&(l.move(u.pointerId,u.clientX,u.clientY,u.timeStamp),l.state!=="pending"&&c())}),e.addEventListener("pointerup",u=>{c(),l.up(u.pointerId,u.clientX,u.clientY,u.timeStamp)}),e.addEventListener("pointercancel",u=>{c(),l.cancel(u.pointerId)}),e.addEventListener("click",u=>{i&&(i=!1,u.stopPropagation(),u.preventDefault())},!0),e.addEventListener("contextmenu",u=>u.preventDefault()),l}var ks="netcomposer.groups.v1";function Si(){try{return globalThis.localStorage??null}catch{return null}}function $s(e=Si(),t=ks){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[i,o]of Object.entries(n))typeof o=="boolean"&&a.set(i,o);return a}catch{return new Map}}function Iu(e,t,n,a=ks){let i=$s(e,a);i.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(i)))}catch{}}function ju(e,t=Si()){return $s(t).get(e.id)??e.open===!0}function Hu(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let i=document.createElement("button");i.type="button",i.className="nc-group-toggle",i.id=`${e.id}-group-toggle`;let o=document.createElement("span");o.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),i.append(o,s,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",i.id),i.setAttribute("aria-controls",c.id);for(let u of e.controls)c.append(n(u,t));return i.addEventListener("click",()=>{let u=a.dataset.ncOpen!=="true";Iu(Si(),e.id,u),Ga(a,u);let d=t(a);d?.type==="group"&&d.onToggle?.(u)}),a.append(i,c),Es(a,e),Ga(a,ju(e)),As(a,e),a}function Ga(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let i=n?.querySelector(".nc-group-mark");i&&(i.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function Es(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function As(e,t){Es(e,t)&&Ga(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),i=t.summary??"";a&&a.textContent!==i&&(a.textContent=i)}var bn="application/x-nc-pad",Hr="http://www.w3.org/2000/svg";function _u(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],i=[];for(let o=0;o<n;o++){let s=Math.floor(o*t/n),l=Math.max(s+1,Math.floor((o+1)*t/n)),c=0,u=0;for(let p=s;p<l;p++)c=Math.min(c,e[2*p]??0),u=Math.max(u,e[2*p+1]??0);let d=n===1?50:o/(n-1)*100;a.push(`${d.toFixed(1)} ${(10-Math.min(1,u)*10).toFixed(2)}`),i.push(`${d.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${a.join("L")}L${i.reverse().join("L")}Z`}function Uu(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((i,o)=>a.append(Wu(n,o,t))),n.append(a),n.addEventListener("keydown",i=>{i.key==="Escape"&&An(n)}),Ms(n,e),n}function Wu(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let i=document.createElement("span");i.className="nc-padgrid-pad-bar",i.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(Hr,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let u=document.createElementNS(Hr,"path");return c.append(u),a.append(i,o,s,l,c),Gu(e,a,t,n),o.addEventListener("dblclick",()=>{let d=n(e);d?.type==="padGrid"&&d.onRename&&a.dataset.empty!=="true"&&Ss(e,a,t,n)}),a.addEventListener("dragstart",d=>{if(a.dataset.empty==="true"||!d.dataTransfer){d.preventDefault();return}d.dataTransfer.setData(bn,String(t)),d.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",d=>{let p=d.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(bn)||(d.preventDefault(),d.stopPropagation(),d.dataTransfer&&(d.dataTransfer.dropEffect=p.includes(bn)&&!d.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",d=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let f=d.dataTransfer?.getData(bn);if(f!==void 0&&f!==""){d.preventDefault(),d.stopPropagation();let w=Number(f);w!==t&&p.onMove?.(w,t,d.altKey);return}let m=d.dataTransfer?.files?.[0];m&&(d.preventDefault(),d.stopPropagation(),p.onFile?.(t,m))}),a}function Yu(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function Gu(e,t,n,a){let i=0,o=!1,s=0,l=0,c=()=>{window.clearTimeout(i),i=0};t.addEventListener("pointerdown",u=>{if(u.button!==0)return;o=!1,s=u.clientX,l=u.clientY,c();let d=a(e);d?.type==="padGrid"&&(d.onDown?.(n),!(d.onDown&&u.pointerType==="mouse")&&(i=window.setTimeout(()=>{i=0,o=_r(e,t,n,a)},450)))}),t.addEventListener("pointermove",u=>{i&&Math.hypot(u.clientX-s,u.clientY-l)>8&&c()});for(let u of["pointerup","pointercancel","pointerleave"])t.addEventListener(u,c);t.addEventListener("contextmenu",u=>{u.preventDefault(),c(),o=_r(e,t,n,a)}),t.addEventListener("click",()=>{if(o){o=!1;return}Yu(e,n,a)})}function _r(e,t,n,a){let i=a(e);if(i?.type!=="padGrid"||!i.menu)return!1;let o=i.menu(n);if(!o.length)return!1;An(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),An(e)}),s.addEventListener("click",d=>d.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let d of o){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=d.id,p.textContent=d.label,p.addEventListener("click",()=>{An(e);let f=a(e);f?.type==="padGrid"&&(d.id==="rename"&&f.onRename?Ss(e,t,n,a):f.onMenu?.(n,d.id))}),l.append(p)}e.append(s,l);let c=e.getBoundingClientRect(),u=t.getBoundingClientRect();return l.style.left=`${u.left-c.left}px`,l.style.top=`${u.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function Ss(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let i=a(e);if(i?.type!=="padGrid")return;let o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=i.nameMax??24,o.value=i.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.top-s.top}px`,o.style.width=`${l.width}px`;let c=!1,u=d=>{if(c)return;c=!0;let p=o.value.trim();o.remove(),t.focus();let f=a(e);d&&p&&f?.type==="padGrid"&&f.onRename?.(n,p)};o.addEventListener("keydown",d=>{d.stopPropagation(),d.key==="Enter"?u(!0):d.key==="Escape"&&u(!1)}),o.addEventListener("blur",()=>u(!0));for(let d of["pointerdown","click","dblclick"])o.addEventListener(d,p=>p.stopPropagation());e.append(o),o.focus(),o.select()}function An(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function Ms(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,i)=>{let o=n[i];if(!(o instanceof HTMLButtonElement))return;let s=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),c=o.querySelector(".nc-padgrid-pad-wave path"),u=o.querySelector(".nc-padgrid-pad-badge");u&&(u.textContent=a.empty?"":a.badge??""),o.draggable=!a.empty,a.empty?(o.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete o.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=""),c?.setAttribute("d",_u(a.peaks))),a.lane?o.dataset.ncLane=String(a.lane):delete o.dataset.ncLane;let d=t.selected===i;d?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",d?"true":"false"),a.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",a.empty?`Pad ${i+1}, empty: load a sample`:`Pad ${i+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${d?", selected":""}`)})}function re(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Qn(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let i=document.createElement("span");return i.className="nc-readout",i.dataset.ncReadout="",n.append(a,i),n}function Ur(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function en(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Ku=450,Wr=8;function Me(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Xu(e){let t=Bd(e,"target-min");return t>0?t:44}function Vu(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=Xu(e),a=n/2,i=t.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<t.length;o++){let s=t[o],l=i[o];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let c=l.left+l.width/2,u=l.top+l.height/2,d=c-a,p=c+a,f=u-a,m=u+a;for(let w=0;w<t.length;w++){if(o===w)continue;let b=i[w];if(!b||b.width===0)continue;let h=b.left+b.width/2,g=b.top+b.height/2;Math.abs(g-u)<a*2&&(h>c?p=Math.min(p,(c+h)/2):h<c&&(d=Math.max(d,(c+h)/2))),Math.abs(h-c)<a*2&&(g>u?m=Math.min(m,(u+g)/2):g<u&&(f=Math.max(f,(u+g)/2)))}d=Math.min(d,l.left),p=Math.max(p,l.right),f=Math.min(f,l.top),m=Math.max(m,l.bottom),s.style.left=`${d-l.left}px`,s.style.top=`${f-l.top}px`,s.style.width=`${Math.max(0,p-d)}px`,s.style.height=`${Math.max(0,m-f)}px`,s.style.transform="none"}}function Ls(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Yr(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function kt(e,t){switch(e.type){case"slider":return Qu(e,t);case"select":return Zu(e,t);case"toggle":return ep(e,t);case"button":return tp(e,t);case"readout":return np(e);case"label":return op(e);case"note":return Gr(e);case"knob":return cp(e,t);case"choice":return dp(e,t);case"slotRow":return up(e,t);case"stepGrid":return mp(e,t);case"canvas":return wp(e);case"fx":return Ep(e,t);case"eqGraph":return yu(e,t);case"group":return Hu(e,t,kt);case"strip":return vp(e,t);case"stripAdd":return $p(e,t);case"padGrid":return Uu(e,t);case"moves":return ip(e,t);default:return Gr({id:"unknown",text:""})}}function ke(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Fs(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(Ts(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let i=e.querySelector("[data-nc-readout]");i&&(i.textContent=t.valueText??en(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Ur(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")Ur(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&tt(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&sp(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??en(t.value))}else if(t.type==="choice")Ns(e,t);else if(t.type==="slotRow")Ps(e,t);else if(t.type==="stepGrid")Xa(e,t);else if(t.type==="padGrid")Ms(e,t);else if(t.type==="moves")Cs(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&ss(n,t)}else if(t.type==="eqGraph")ds(e,t);else if(t.type==="strip"){Os(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${Vt(n.id)}"]`);a instanceof Element&&ke(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")qs(e,t);else if(t.type==="group"){As(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${Vt(n.id)}"]`);a instanceof Element&&ke(a,n)}}else if(t.type==="fx"){Ws(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${Vt(n.id)}"]`);a instanceof Element&&ke(a,n)}}}}function Qu(e,t){let n=Qn(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let i=Vn(e.taper,e.min,e.max);a.min=String(i?0:e.min),a.max=String(i?1e3:e.max),a.step=String(i?1:e.step),i&&(a.dataset.ncTaper=e.taper),a.value=String(Ts(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let o=l=>i?qa(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(o(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(o(l))}),i&&a.addEventListener("keydown",l=>{let c=t(a);if(c?.type!=="slider"||a.disabled)return;let u=c.taper??e.taper,d=os(u,c.min,c.max,c.value,l.key,l.shiftKey,c.step);d!==null&&(l.preventDefault(),a.value=String(vi(u,c.min,c.max,d)),c.onChange(d),c.onCommit?.(d))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(Ju(e,a,t),s),n.append(re()),ke(n,e),n}function Ts(e){return Vn(e.taper,e.min,e.max)?vi(e.taper,e.min,e.max,e.value):e.value}function Ju(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(Me());let i=o=>{let s=n(t);s?.type==="slider"&&s.onTap?.(o)};return a.addEventListener("pointerdown",o=>{o.button===0&&i(o.timeStamp)}),a.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),i(o.timeStamp))}),a}function Zu(e,t){let n=Qn(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let i=null;for(let o of e.options){let s=document.createElement("option");s.value=o.value,s.textContent=o.label,o.disabled&&(s.disabled=!0),o.group?i?.getAttribute("label")!==o.group&&(i=document.createElement("optgroup"),i.setAttribute("label",o.group),a.append(i)):i=null,(i??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let o=t(a);o?.type==="select"&&o.onChange(a.value)}),n.append(a,re()),n}function ep(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(re()),ke(n,e),n}function tp(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let o=t(n);o?.type==="button"&&o.onPress()}),n.append(re()),ke(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let i=document.createElement("button");return i.type="button",i.className="nc-sparkle-btn",i.dataset.ncSparkle=e.id,i.setAttribute("aria-label","Surprise me"),i.title=e.sparkleTitle??"Surprise me",i.innerHTML=Ls(),i.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&Ds(o);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,i),a}function np(e){let t=Qn(e.id,e.label);return t.append(re()),ke(t,e),t}var ap=450;function ip(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let i=document.createElement("div");i.className="nc-moves-row",i.setAttribute("role","group"),i.setAttribute("aria-label",a.label),a.title&&(i.title=a.title);let o=document.createElement("span");o.className="nc-moves-label",o.setAttribute("aria-hidden","true"),o.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${a.label} ${l.text}`),c.append(rp(l.icon)),c.addEventListener("click",()=>{let u=t(n);u?.type==="moves"&&u.onMove(l.id)}),s.append(c)}i.append(o,s),n.append(i)}return Cs(n,e),n}function Cs(e,t){for(let n of t.groups)for(let a of n.moves){let i=e.querySelector(`[data-nc-move="${Vt(a.id)}"]`);i instanceof HTMLButtonElement&&(i.disabled=a.disabled===!0)}}function rp(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function op(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(re()),t}function Gr(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(re()),t}function Kr(e){if(typeof e.valueText=="string")return e.valueText;let t=en(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Fs(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function sp(e,t){let n=wi(t.taper,t.min,t.max,t.value);Fs(e,t.modulated===!0);let a=Math.round(n*270);e.style.setProperty("--knob-turn",String(a)),t.bipolar&&(e.style.setProperty("--knob-from",String(Math.min(a,135))),e.style.setProperty("--knob-to",String(Math.max(a,135)))),e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",Kr(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${Kr(t)}`}function lp(e,t){if(Vn(e.taper,e.min,e.max))return os(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,i=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+i:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-i:null}function cp(e,t){let n=Qn(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let i=document.createElement("i");i.className="nc-knob-mark",a.append(i);let o=0,s=0;a.addEventListener("pointerdown",u=>{o=u.clientY;let d=t(a);s=d&&"value"in d?Number(d.value):0,a.setPointerCapture?.(u.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",u=>{if(a.hasPointerCapture&&!a.hasPointerCapture(u.pointerId))return;let d=t(a);if(d?.type!=="knob")return;if(Vn(d.taper,d.min,d.max)){let m=wi(d.taper,d.min,d.max,s)-(u.clientY-o)/120;d.onChange(is(d.taper,d.min,d.max,m));return}let p=d.max-d.min||1,f=Math.min(d.max,Math.max(d.min,s-(u.clientY-o)*p/120));d.onChange(f)}),a.addEventListener("dblclick",()=>{let u=t(a);u?.type==="knob"&&typeof u.defaultValue=="number"&&u.onChange(u.defaultValue)}),a.addEventListener("keydown",u=>{let d=t(a);if(d?.type!=="knob")return;let p=lp(d,u);p!==null&&(u.preventDefault(),d.onChange(Math.min(d.max,Math.max(d.min,p))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(a,c),n.append(re()),ke(n,e),n}function dp(e,t){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label);for(let a of e.options){let i=document.createElement("button");i.type="button",i.className="nc-choice",i.dataset.ncChoice=a.value,i.setAttribute("role","tab"),i.textContent=a.label,i.addEventListener("click",()=>{let o=t(n);o?.type==="choice"&&o.onChange(a.value)}),i.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(i),c=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")c=(l+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")c=(l-1+s.length)%s.length;else if(o.key==="Home")c=0;else if(o.key==="End")c=s.length-1;else return;let u=s[c];u instanceof HTMLButtonElement&&(o.preventDefault(),u.focus(),u.click())}),n.append(i)}return n.append(re()),Ns(n,e),n}function Ns(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function up(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let d=0;d<e.slots.length;d++){let p=e.slots[d],f=document.createElement("span");f.className="nc-snap-wrap";let m=document.createElement("button");m.type="button",m.className="nc-snap",m.dataset.ncSlot=String(d),m.textContent=p.label,m.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(m,Me()),pp(f,m,n,d,t),a.append(f)}let i=e.onSparkle?document.createElement("button"):null;i&&(i.type="button",i.className="nc-sparkle",i.setAttribute("aria-label","Surprise me"),i.innerHTML=Ls(),i.append(Me()),i.addEventListener("click",()=>{Ds(n);let d=t(n);d?.type==="slotRow"&&d.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let d=t(n);d?.type==="slotRow"&&d.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",o.append(s,c,l);let u=document.createElement("div");return u.className="nc-slot-line",u.append(a,...i?[i]:[]),n.append(u,o,re()),zs(n,t),Ps(n,e),n}function Xr(e,t,n,a){let i=n(e);if(i?.type!=="slotRow")return;Ut(e);let o=a.shiftKey?"store":a.altKey?"clear":"recall";i.onSlot(t,o)}function pp(e,t,n,a,i){let o=0,s=0,l=0,c=!1,u=!1,d=!1,p=!1,f=()=>{window.clearTimeout(o),o=0},m=g=>{let y=g.clientX-s,v=g.clientY-l;y*y+v*v>Wr*Wr&&(c=!0,f())},w=()=>{p&&(p=!1,window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",h))},b=g=>{let y=o!==0&&!c&&!u;f(),w(),y&&(d=!0,Xr(n,a,i,g))},h=()=>{c=!0,f(),w()};e.addEventListener("pointerdown",g=>{g.button===0&&(w(),u=!1,c=!1,d=!1,s=g.clientX,l=g.clientY,f(),o=window.setTimeout(()=>{o=0,!c&&(u=!0,hp(n,t,a,i))},Ku),p=!0,window.addEventListener("pointermove",m),window.addEventListener("pointerup",b),window.addEventListener("pointercancel",h))}),e.addEventListener("contextmenu",g=>g.preventDefault()),e.addEventListener("click",g=>{if(d||u||c){d=!1,u=!1,c=!1;return}Xr(n,a,i,g)})}function zs(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=Vr("Save","store"),i=Vr("Clear","clear");n.append(a,i);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),Ut(e)}),o.addEventListener("click",s=>s.stopPropagation()),e.append(o,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let u=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(u,"store"),Ut(e)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(u,"clear"),Ut(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&Ut(e)})}function Vr(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function hp(e,t,n,a){zs(e,a);let i=e.querySelector(".nc-slot-menu");if(!(i instanceof HTMLElement))return;let o=e.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),i.hidden=!1,i.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-s.left}px`,i.style.top=`${l.bottom-s.top}px`,i.querySelector("button")?.focus()}function Ut(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Ps(e,t){for(let i of e.querySelectorAll("[data-nc-slot]")){if(!(i instanceof HTMLButtonElement))continue;let o=Number(i.dataset.ncSlot),s=t.slots[o];if(!s)continue;i.textContent=s.label,s.filled?i.dataset.filled="true":delete i.dataset.filled,s.active?i.dataset.active="true":delete i.dataset.active,s.edited?i.dataset.edited="true":delete i.dataset.edited,s.queued?i.dataset.queued="true":delete i.dataset.queued,s.queued&&s.pulse?i.dataset.pulse="true":delete i.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];i.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function Ds(e){let t=e.dataset.ncLastFill||null,n=$d(t);e.dataset.ncLastFill=n;let a=Ed(n);if(a)for(let[i,o]of Object.entries(a))e.style.setProperty(i,o)}function fp(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,i=o=>{if(a===o)return;a=o,n.setAttribute("aria-pressed",o?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),i(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>i(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||i(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),i(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function mp(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let i=h=>{let g=document.createElement("button");return g.type="button",g.setAttribute("role","radio"),g.textContent=h,a.append(g),g},o=i("Note"),s=i("Accent");s.dataset.ncAccentMode="";let l=h=>{for(let g of[o,s]){let y=g===h;g.setAttribute("aria-checked",y?"true":"false"),g.tabIndex=y?0:-1}};l(o);for(let h of[o,s])h.addEventListener("click",()=>l(h));a.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();let g=s.getAttribute("aria-checked")==="true"?o:s;l(g),g.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(a),e.onFill&&c.append(fp(n,t)),e.onClear){let h=document.createElement("button");h.type="button",h.className="nc-fill nc-clear",h.dataset.ncClear="",h.textContent=e.clearLabel??"Clear",h.title="Clear every step (Undo takes it back)",h.addEventListener("click",()=>{let g=t(n);g?.type==="stepGrid"&&g.onClear?.()}),c.append(h)}n.append(c);for(let h of e.rows){let g=document.createElement("div");g.className="nc-row",g.dataset.ncRow="";let y=document.createElement("button");y.type="button",y.className="nc-name",y.textContent=h.label,y.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(y.dataset.ncLane=String((h.lane-1)%4+1));let v=!1,E=0;y.addEventListener("pointerdown",k=>{v=!1,!(k.pointerType==="mouse"||k.button!==0)&&(E=window.setTimeout(()=>{let M=t(n);M?.type!=="stepGrid"||!M.selectedRows||(v=!0,M.onSelectRow?.(M.rows.findIndex(C=>C.id===h.id),!0))},ap))});for(let k of["pointerup","pointercancel","pointerleave"])y.addEventListener(k,()=>window.clearTimeout(E));y.addEventListener("contextmenu",k=>{v&&k.preventDefault()}),y.addEventListener("click",k=>{let M=t(n);if(M?.type!=="stepGrid")return;if(v){v=!1;return}let C=M.rows.findIndex(V=>V.id===h.id),_=!!M.selectedRows&&(k.shiftKey||k.metaKey||k.ctrlKey);M.onSelectRow?.(C,_)}),y.addEventListener("keydown",k=>gp(n,y,k));let A=[];for(let k of["mute","solo"]){if(!(k==="mute"?e.onMute:e.onSolo))continue;let M=document.createElement("span");M.className="nc-ms-wrap";let C=document.createElement("button");C.type="button",C.className="nc-ms",C.dataset.ncMs=k,C.textContent=k==="mute"?"M":"S",C.setAttribute("aria-label",`${k==="mute"?"Mute":"Solo"} ${h.label}`),M.append(C,Me()),M.addEventListener("click",()=>{let _=t(n);if(_?.type!=="stepGrid")return;let V=_.rows.findIndex(be=>be.id===h.id);(k==="mute"?_.onMute:_.onSolo)?.(V)}),A.push(M)}let $=document.createElement("div");$.className="nc-steps";for(let k=0;k<h.steps.length;k++){let M=document.createElement("span");M.className="nc-step-wrap";let C=document.createElement("button");C.type="button",C.className="nc-step",C.dataset.ncStep=`${h.id}:${k}`,C.setAttribute("aria-label",`${h.label} step ${k+1}`),M.append(C,Me()),M.addEventListener("click",_=>{let V=t(n);if(V?.type!=="stepGrid")return;let be=V.rows.findIndex(ze=>ze.id===h.id),P=s.getAttribute("aria-checked")==="true";V.onToggle(be,k,_.shiftKey||P)}),$.append(M)}if(e.onLength&&$.append(bp(n,$,h,t)),g.append(...A,y,$),e.onDice){let k=document.createElement("button");k.type="button",k.className="nc-sparkle nc-row-dice",k.dataset.ncDice=h.id,k.setAttribute("aria-label",`Re-roll ${h.label}`),k.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,k.innerHTML=Yr(),k.append(Me()),k.addEventListener("click",()=>{let M=t(n);M?.type==="stepGrid"&&M.onDice?.(M.rows.findIndex(C=>C.id===h.id))}),g.append(k)}g.addEventListener("click",k=>{if(k.target!==g)return;let M=t(n);M?.type==="stepGrid"&&M.onSelectRow?.(M.rows.findIndex(C=>C.id===h.id))}),Qr(n,$,".nc-step-wrap",t,s,()=>h.id),n.append(g)}let u=document.createElement("div");u.className="nc-pads-head";let d=(h,g,y)=>{let v=document.createElement("button");return v.type="button",v.className=h,v.textContent=g,y&&v.setAttribute("aria-label",y),v},p=d("nc-pads-step","‹","Previous lane"),f=d("nc-pads-step","›","Next lane"),m=document.createElement(e.onLength?"button":"span");m.className="nc-pads-label",m.setAttribute("aria-live","polite"),e.onLength&&(m.type="button",m.dataset.ncLenToggle="",m.addEventListener("click",()=>{let h=t(n);h?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Xa(n,h))}));for(let[h,g]of[[p,-1],[f,1]])h.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid"||y.rows.length===0)return;let v=y.rows.length;y.onSelectRow?.(((yn(y)+g)%v+v)%v)});if(u.append(p,m,f),e.onDice){let h=d("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=Yr(),h.addEventListener("click",()=>{let g=t(n);if(g?.type!=="stepGrid")return;let y=yn(g);y>=0&&g.onDice?.(y)}),u.append(h)}if(e.transport){let h=d("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{let g=t(n);g?.type==="stepGrid"&&g.transport?.onToggle()}),u.append(h)}n.append(u);let w=document.createElement("div");w.className="nc-pads",w.setAttribute("role","group");let b=Math.max(0,...e.rows.map(h=>h.steps.length));for(let h=0;h<b;h++){let g=document.createElement("button");g.type="button",g.className="nc-pad",g.dataset.ncPad=String(h),g.textContent=String(h+1),g.addEventListener("click",y=>{let v=t(n);if(v?.type!=="stepGrid")return;let E=yn(v);if(E<0)return;if(n.dataset.ncLenMode==="true"){v.onLength?.(E,h+1);return}let A=s.getAttribute("aria-checked")==="true";v.onToggle(E,h,y.shiftKey||A)}),w.append(g)}return Qr(n,w,".nc-pad",t,s,()=>{let h=t(n);return h?.type==="stepGrid"?h.rows[yn(h)]?.id:void 0}),n.append(w),n.append(re()),Xa(n,e),n}function yn(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function Qr(e,t,n,a,i,o){let s="on",l=!0,c=-1,u=(d,p)=>{let f=d.rows[c]?.steps[p];!f||p>=d.rows[c].length||(d.onSet?d.onSet(c,p,s,l):!!f[s]!==l&&d.onToggle(c,p,s==="accent"))};Ru(t,n,d=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(d.kind!=="paint")return;let f=p.rows.findIndex(m=>m.id===o());f>=0&&p.rows[f].length!==d.pad+1&&p.onLength?.(f,d.pad+1);return}if(d.kind==="paint"){if(d.phase==="start"){let f=o();c=p.rows.findIndex(w=>w.id===f);let m=p.rows[c]?.steps[d.pad];if(!m)return;s=i.getAttribute("aria-checked")==="true"?"accent":"on",l=!m[s]}u(p,d.pad)}else if(d.kind==="long"){let f=o(),m=p.rows.findIndex(b=>b.id===f),w=t.querySelectorAll(n)[d.pad];m>=0&&w instanceof HTMLElement&&p.onLongPress?.(m,d.pad,w)}}})}function gp(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],i=a.indexOf(t),o=i;n.key==="ArrowDown"?o=i+1:n.key==="ArrowUp"?o=i-1:n.key==="Home"?o=0:o=a.length-1;let s=a[o];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function bp(e,t,n,a){let i=document.createElement("button");i.type="button",i.className="nc-len-handle",i.dataset.ncLen=n.id,i.setAttribute("role","slider"),i.setAttribute("aria-valuemin","1"),i.setAttribute("aria-valuemax",String(n.steps.length)),i.append(Me());let o=u=>{let d=a(e);if(d?.type!=="stepGrid")return;let p=d.rows.findIndex(w=>w.id===n.id),f=d.rows[p];if(!f)return;let m=Math.max(1,Math.min(f.steps.length,u));m!==f.length&&d.onLength?.(p,m)},s=u=>{let d=[...t.querySelectorAll(".nc-step")],p=1;return d.forEach((f,m)=>{let w=f.getBoundingClientRect();w.width>0&&u>=w.left+w.width/2&&(p=m+1)}),p},l=u=>o(s(u.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete i.dataset.dragging};return i.addEventListener("pointerdown",u=>{u.button===0&&(u.preventDefault(),i.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),i.addEventListener("keydown",u=>{let d=a(e);if(d?.type!=="stepGrid")return;let p=d.rows.find(m=>m.id===n.id);if(!p)return;let f={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};u.key in f&&(u.preventDefault(),o(f[u.key]))}),i}var ba=new WeakMap,wn=new WeakMap;function yp(e){return e?(wn.has(e)||(wn.set(e,Da(e)),Vo(t=>{wn.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))Ka(n,Number(n.getAttribute("data-nc-velocity")))},e)),wn.get(e)):"light"}function Ka(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:yp(e.ownerDocument),i=n===null?null:`${a} ${n}`;if(!(ba.has(e)&&ba.get(e)===i)){if(ba.set(e,i),n===null){for(let o of Object.keys(Lr(1)))e.style.removeProperty(o);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[o,s]of Object.entries(Lr(n,Mr[a]??Mr.light)))e.style.setProperty(o,s)}}function Xa(e,t){let n=t.rows.some(d=>d.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let i=e.querySelector(".nc-pads"),o=t.rows.find(d=>d.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&o&&(s.textContent=l?`${o.label} · ${o.length}`:o.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&o&&(c.setAttribute("aria-label",`Re-roll ${o.label}`),c.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let u=e.querySelector("[data-nc-pads-play]");if(u instanceof HTMLElement){let d=!!t.transport?.playing,p=t.transport?.label??(d?"Stop":"Play");u.textContent!==p&&(u.textContent=p),u.setAttribute("aria-pressed",d?"true":"false");let f=t.transport?.ariaLabel;f?u.setAttribute("aria-label",f):u.removeAttribute("aria-label")}if(i instanceof HTMLElement&&o){i.setAttribute("aria-label",`${o.label} steps`),o.lane&&(i.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?i.dataset.silent="true":delete i.dataset.silent;let d=o.length>0?(t.playhead%o.length+o.length)%o.length:-1;for(let p of i.querySelectorAll("[data-nc-pad]")){let f=Number(p.getAttribute("data-nc-pad")),m=o.steps[f];p instanceof HTMLButtonElement&&(p.hidden=!m||!l&&f>=o.length,l&&f>=o.length?p.dataset.out="true":delete p.dataset.out,l&&f===o.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${o.label} step ${f+1}`),p.setAttribute("aria-pressed",m?.on?"true":"false"),m?.accent?p.dataset.accent="true":delete p.dataset.accent,m?.dim?p.dataset.dim="true":delete p.dataset.dim,Ka(p,m?.velocity),t.playhead>=0&&f===d?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let d of t.rows){for(let m=0;m<d.steps.length;m++){let w=d.steps[m],b=e.querySelector(`[data-nc-step="${d.id}:${m}"]`);if(!(b instanceof HTMLButtonElement))continue;let h=b.closest(".nc-row");if(h instanceof HTMLElement){t.selectedRow===d.id?h.dataset.selected="true":delete h.dataset.selected;let v=t.selectedRow!==d.id&&(t.selectedRows??[]).includes(d.id);v?h.dataset.picked="true":delete h.dataset.picked;let E=h.querySelector(".nc-name");E instanceof HTMLElement&&(E.setAttribute("aria-pressed",t.selectedRow===d.id||v?"true":"false"),E.textContent!==d.label&&(E.textContent=d.label,E.setAttribute("aria-label",`Select ${d.label}`))),d.mute||n&&!d.solo?h.dataset.silent="true":delete h.dataset.silent;for(let A of h.querySelectorAll("[data-nc-ms]")){let $=A.getAttribute("data-nc-ms")==="mute"?d.mute:d.solo;A.setAttribute("aria-pressed",$?"true":"false")}}b.setAttribute("aria-pressed",w.on?"true":"false"),w.accent?b.dataset.accent="true":delete b.dataset.accent,w.dim?b.dataset.dim="true":delete b.dataset.dim,m%4===0?b.dataset.bar="true":delete b.dataset.bar,typeof w.velocity=="number"?(b.dataset.velocity="true",b.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,w.velocity))*100)}%`)):(delete b.dataset.velocity,b.style.removeProperty("--level")),Ka(b,w.velocity);let g=t.playhead>=0&&d.length>0?(t.playhead%d.length+d.length)%d.length:-1;m===g?b.dataset.playhead="true":delete b.dataset.playhead;let y=!!t.onLength&&t.selectedRow===d.id;b.hidden=m>=d.length&&!y,m>=d.length&&y?b.dataset.out="true":delete b.dataset.out}let p=e.querySelector(`[data-nc-len="${d.id}"]`),f=e.querySelector(`[data-nc-step="${d.id}:${Math.max(0,d.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&f&&f.nextElementSibling!==p){let m=document.activeElement===p;f.after(p),m&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(d.length)),p.setAttribute("aria-label",`${d.label} length, ${d.length} steps`),p.title=`${d.label}: drag to set the length (${d.length} steps)`)}}function wp(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,re()),t}function vp(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let i=document.createElement("span");i.className="nc-strip-name",i.dataset.ncStripName="";let o=!e.master&&typeof e.onFold=="function",s=null;if(o&&(n.dataset.ncFoldable="",s=Is(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let g=t(n);g?.type==="strip"&&(g.onFold?.(g.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(i),e.onRemove){let g=document.createElement("button");g.type="button",g.className="nc-strip-remove",g.dataset.ncStripRemove="",g.textContent="×",g.addEventListener("click",()=>{let y=t(n);y?.type==="strip"&&y.onRemove?.(g)}),a.append(g)}let l=document.createElement("div");if(l.className="nc-strip-hacks",e.onHacks){let g=document.createElement("span");g.className="nc-hacks-wrap";let y=document.createElement("button");y.type="button",y.className="nc-hacks",y.dataset.ncHacks="",g.append(y,Me()),g.addEventListener("click",()=>{let v=t(n);v?.type==="strip"&&v.onHacks?.()}),l.append(g)}let c=document.createElement("div");c.className="nc-strip-ms";for(let g of["mute","solo"]){if(!(g==="mute"?e.onMute:e.onSolo))continue;let y=document.createElement("span");y.className="nc-ms-wrap";let v=document.createElement("button");v.type="button",v.className="nc-ms",v.dataset.ncMs=g,v.textContent=g==="mute"?"M":"S",y.append(v,Me()),y.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&(g==="mute"?E.onMute:E.onSolo)?.()}),c.append(y)}let u=document.createElement("div");u.className="nc-strip-sends";for(let g of e.sends??[])u.append(kt({...g,type:"knob",compact:!0},t));let d=document.createElement("div");d.className="nc-strip-pan",e.pan&&d.append(kt(Mi(e),t));let p=document.createElement("div");p.className="nc-strip-body";let f=document.createElement("span");f.className="nc-scale",f.setAttribute("aria-hidden","true");for(let g of e.ticks??[]){let y=document.createElement("span");y.className="nc-scale-tick",y.style.setProperty("--tick-pos",String(g.value)),y.textContent=g.label,f.append(y)}let m=Wd({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:g=>{let y=t(n);y?.type==="strip"&&y.onChange(g)},onReset:()=>{let g=t(n);g?.type==="strip"&&Zr(g)}}),w=Qd({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let g=t(n);g?.type==="strip"&&g.onClipClear?.()}});if(p.append(f,m.el,w.el),o){let g=document.createElement("button");g.type="button",g.className="nc-ui-fx-fold nc-strip-fold",g.dataset.ncStripFold="",g.setAttribute("aria-expanded","false");let y=document.createElement("span");y.className="nc-strip-fold-cap",y.setAttribute("aria-hidden","true");let v=document.createElement("span");v.className="nc-ui-fx-fold-name",v.dataset.ncStripFoldName="";let E=document.createElement("span");E.className="nc-strip-fold-pan",E.setAttribute("aria-hidden","true"),E.hidden=!e.pan,g.append(y,E,v),g.addEventListener("click",()=>{let A=t(n);if(A?.type!=="strip")return;A.onFold?.(!1);let $=n.querySelector("[data-nc-strip-hide]");$ instanceof HTMLElement&&$.focus()}),p.prepend(g)}let b=document.createElement("button");b.type="button",b.className="nc-strip-db",b.dataset.ncReadout="";let h=0;return b.addEventListener("click",g=>{let y=t(n);y?.type!=="strip"||!y.onTypeIn||(window.clearTimeout(h),g.detail===0?Jr(n,b,t):g.detail===1&&(h=window.setTimeout(()=>Jr(n,b,t),kp)))}),b.addEventListener("dblclick",()=>{window.clearTimeout(h);let g=t(n);g?.type==="strip"&&Zr(g)}),s&&n.append(s),n.append(a,l,c,u,d,p,b,re()),Os(n,e),n}function Mi(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??xp(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function xp(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var kp=250;function Jr(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let i=document.createElement("input");i.type="text",i.className="nc-strip-db-input",i.inputMode="decimal",i.spellcheck=!1,i.autocomplete="off",i.value=a.valueText??en(a.value),i.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(i),i.focus(),i.select?.();let o=!1,s=l=>{if(o)return;o=!0;let c=i.value;if(i.remove(),t.hidden=!1,l){let u=n(e);u?.type==="strip"&&u.onTypeIn?.(c)}t.focus?.()};i.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),i.addEventListener("blur",()=>s(!1))}function $p(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-strip-add-plus",i.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",a.append(i,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),c=s.value;Bs(s),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(a,s,re()),qs(n,e),n}function qs(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let i=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],o=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=i.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==s&&(a.replaceChildren(...i.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),Bs(a))}function Bs(e){let t=e.options[0];t&&(t.selected=!0)}function Zr(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Os(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let i=e.querySelector(".nc-fader"),o=i?Yd(i):void 0;o&&(o.configure({step:t.step}),o.set(t.value),o.setText(t.valueText),o.setLabel(`${t.label} level`)),Jd(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let p=t.valueText??en(t.value);s.textContent!==p&&(s.textContent=p),s.setAttribute("aria-label",`${t.label} level ${p}`);let f=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${f}`:f}for(let p of e.querySelectorAll("[data-nc-ms]")){let f=p.getAttribute("data-nc-ms"),m=f==="mute"?t.mute===!0:t.solo===!0;p.setAttribute("aria-pressed",m?"true":"false"),p.setAttribute("aria-label",`${f==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let p=t.hacksLabel??"Hacks";l.textContent!==p&&(l.textContent=p),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${p}: ${t.label}`)}if(t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let p=e.querySelector(`.nc-strip-pan [data-nc-id="${Vt(t.pan.id)}"]`);p&&ke(p,Mi(t))}let c=!t.master&&typeof t.onFold=="function"&&t.folded===!0;c?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let u=e.querySelector("[data-nc-strip-hide]");u instanceof HTMLElement&&(js(u,c,t.label),tt(u,t.foldHelp));let d=e.querySelector("[data-nc-strip-fold]");if(d instanceof HTMLElement){d.hidden=!c,d.setAttribute("aria-label",`Expand ${t.label}`);let p=d.querySelector("[data-nc-strip-fold-name]");p&&p.textContent!==t.label&&(p.textContent=t.label),tt(d,t.foldedHelp??t.foldHelp)}}function Ep(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let i=typeof e.onFold=="function",o=!!e.meter;if(e.on===void 0&&!i&&!Bn(e)&&!o)n.append(a);else{let s=document.createElement("div");if(s.className="nc-ui-fx-hd",s.append(a),o&&s.append(_s(n,"head")),e.on!==void 0){let l=ts({checked:e.on,labelledBy:a.id,onChange:c=>{let u=t(l.el);u?.type==="fx"&&u.onToggle?.(c)}});l.el.dataset.ncFxSwitch="",s.append(l.el)}i&&s.append(Sp(n,t)),Bn(e)&&s.append(Cp(n,t)),n.append(s)}i&&n.prepend(Mp(n,t)),o&&Us(n,e);for(let s of e.controls)n.append(kt(s,t));if(e.more?.length){let s=document.createElement("details");s.className="nc-ui-more";let l=document.createElement("summary");l.textContent=e.moreLabel??"More",s.append(l);for(let c of e.more)s.append(kt(c,t));n.append(s)}return n.append(re()),Ws(n,e),n}var Ap=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function Rs(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&Ap(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function Sp(e,t){let n=Is();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),Rs(e))}),n}function Is(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function js(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function Mp(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let i=document.createElement("span");i.className="nc-ui-fx-fold-name",i.dataset.ncFxFoldName="";let o=document.createElement("span");return o.className="nc-fold-tri",o.setAttribute("aria-hidden","true"),n.append(o,a,i),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(_s(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),Rs(e)}}),n}var $t=new Set;function Sn(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var Bn=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"),Lp="(max-width: 768px)";function Tp(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function Cp(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(Tp()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(Hs(e,a,!$t.has(a.id)),n.focus())}),n}function Hs(e,t,n){n?$t.add(t.id):$t.delete(t.id),Li(e,t)}function Fp(e,t){t?.type==="fx"&&$t.has(t.id)&&Hs(e,t,!1)}function Np(e){return e.ownerDocument.defaultView?.matchMedia?.(Lp).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Li(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=Bn(t)&&$t.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!Bn(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Sn(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&xt(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",tt(n,t.maxHelp)),!a){e.dataset.ncMax&&eo(e);return}if(!e.isConnected){let s=()=>e.isConnected&&$t.has(t.id)&&Li(e,t);queueMicrotask(()=>{e.isConnected?s():Sn(e.ownerDocument,s)});return}let i=Np(e),o=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;o>0&&e.style.setProperty("--nc-fx-dials",String(o)),e.dataset.ncMax!==i&&(e.dataset.ncMax&&eo(e),e.dataset.ncMax=i,i==="over"&&zp(e,t)),Pp(e.ownerDocument),i==="over"&&Ti(e),Sn(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&xt(s)})}function eo(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Sn(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&xt(n)})}function zp(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let i=e.querySelector("[data-nc-fx-max]");i instanceof HTMLElement&&i.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function Ti(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,i=e.ownerDocument.defaultView,o=Number.parseFloat(i?.getComputedStyle(a).columnGap??"")||0,s=bu(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),o,i?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var to=new WeakSet;function Pp(e){to.has(e)||(to.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(i=>i.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&Ti(t)}))}var Va=new WeakMap;function _s(e,t){let n=zu(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Us(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let i of n)tt(i,t.meterHelp);let a=Va.get(e);a?a.set(t.meter):Va.set(e,Bu(n,t.meter))}function Ws(e,t){(t.meter||Va.has(e))&&Us(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let i=typeof t.onFold=="function"&&t.folded===!0;i?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let o=e.querySelector("[data-nc-fx-hide]");o instanceof HTMLElement&&(js(o,i,t.title),tt(o,t.foldHelp)),Li(e,t);let s=e.querySelector(":scope > [data-nc-fx-fold]");if(s instanceof HTMLElement){let l=t.on===void 0?"":t.on?"On":"Off";s.hidden=!i,s.setAttribute("aria-label",`Expand ${t.title}${l?`, ${l.toLowerCase()}`:""}`),s.dataset.on=t.on===!0?"true":"false";let c=s.querySelector("[data-nc-fx-fold-state]");c&&(c.textContent=l,c.hidden=l==="");let u=s.querySelector("[data-nc-fx-fold-name]");u&&(u.textContent=t.title),tt(s,t.foldHelp)}}function tt(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Vt(e){return e.replace(/["\\]/g,"\\$&")}function Dp(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(i=>i.type==="canvas"&&i.id===n.dataset.ncId);a?.type==="canvas"&&ss(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&xt(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&Ti(n);Vu(e)}var qp=Ie["toast-duration"];function Bp({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function Op(e,t,n,a){let i=l=>({top:l,bottom:l+n}),o=l=>e.some(c=>c&&c.bottom>l.top&&c.top<l.bottom),s=i(t-a-n);return o(s)?o(i(a))?"bottom":"top":"bottom"}function Rp(e,t,n,a,i,o){let s=e.bottom+i,l=Math.max(o,Math.min(e.left,a-o-n.width));for(let c=!0,u=0;c&&u<8;u++){c=!1;for(let d of t)d&&d.bottom>s&&d.top<s+n.height&&d.right>l&&d.left<l+n.width&&(s=d.bottom+i,c=!0)}return{top:s,left:l}}var no="data-nc-ui-toast-live";function Ip(e,t){let n=t.querySelector(`[${no}]`);return n||(n=e.createElement("div"),n.setAttribute(no,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function jp({message:e,actionLabel:t,onAction:n,duration:a=qp,onClose:i,avoid:o=[],anchor:s,host:l,document:c=globalThis.document}={}){l=l??c.body;let u=c.defaultView??globalThis,d=c.createElement("div");d.className="nc-ui-toast",d.setAttribute("data-state","enter");let p=c.createElement("span");p.className="nc-ui-toast-message",p.textContent=e,d.appendChild(p);let f=null;t&&(f=c.createElement("button"),f.type="button",f.className="nc-ui-toast-action",f.textContent=t,d.appendChild(f)),l.appendChild(d);let m="open",w=ne=>ne&&typeof ne.getBoundingClientRect=="function"?ne.getBoundingClientRect():null,b=w(d),h=b?.height||44,g=u.getComputedStyle?.(d),y=Number.parseFloat(g?.getPropertyValue(W("toast-offset")))||16,v=Number.parseFloat(g?.getPropertyValue(W("toast-anchor-gap")))||8,E=w(s),A=u.innerHeight??0,$=o.map(w).filter(Boolean),k=E&&E.bottom>0&&E.top<A?Rp(E,$,{width:b?.width||0,height:h},u.innerWidth??0,v,y):null;k&&k.top+h<=A?(d.setAttribute("data-placement","anchor"),d.style.top=`${k.top+(u.scrollY??0)}px`,d.style.left=`${k.left+(u.scrollX??0)}px`):d.setAttribute("data-placement",Op($,A,h,y));let M=u.requestAnimationFrame?.bind(u)??(ne=>setTimeout(ne,16));M(()=>M(()=>{m==="open"&&d.setAttribute("data-state","open")})),Ip(c,l).textContent=Bp({message:e,actionLabel:t});let C,_,V=new Promise(ne=>{_=ne}),be=ne=>{clearTimeout(C),C=setTimeout(()=>ot("timeout"),ne)},P=a,ze=Date.now(),Dt=()=>{m==="open"&&(clearTimeout(C),P=Math.max(0,P-(Date.now()-ze)))},qt=()=>{m==="open"&&(ze=Date.now(),be(P))};d.addEventListener("pointerenter",Dt),d.addEventListener("pointerleave",qt),d.addEventListener("focusin",Dt),d.addEventListener("focusout",qt),f?.addEventListener("click",()=>{if(m==="open")try{n?.()}finally{ot("action")}}),Number.isFinite(a)&&be(a);function ot(ne="close"){if(m!=="open")return;m="closing",clearTimeout(C),d.setAttribute("data-state","closing"),i?.(ne);let hn=u.getComputedStyle?.(d),Pe=hn?Math.max(0,...String(hn.transitionDuration||"").split(",").map(ae=>Number.parseFloat(ae)*(ae.trim().endsWith("ms")?1:1e3)||0)):0,D=()=>{m!=="gone"&&(m="gone",d.remove(),_(ne))};d.addEventListener("transitionend",D),setTimeout(D,Pe+50)}return{el:d,close:ot,closed:V}}var ao="data-nc-help";function Hp(e,t,n,a=0,i=6,o=8){let s=e.top-i-t.height,l=s>=a+o?"above":"below",c=l==="above"?s:e.bottom+i,u=Math.max(o,Math.min(e.left,n-o-t.width));return{top:Math.round(c),left:Math.round(u),side:l}}var ya=new WeakMap;function _p(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Up({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=ya.get(e);if(n)return n;let a=e.defaultView,i=null,o=null,s,l=()=>{clearTimeout(s),o=null,i&&(i.hidden=!0)},c=f=>{let m=f.getAttribute(ao);if(!m)return;i||(i=e.createElement("div"),i.className="nc-ui-help",i.setAttribute("role","tooltip"),i.dataset.testid="nc-help",i.style.position="fixed",i.style.pointerEvents="none",i.style.zIndex="6",e.body.appendChild(i)),i.textContent=m,i.hidden=!1,i.style.visibility="hidden",i.style.top="0px",i.style.left="0px";let w=f.getBoundingClientRect(),b=Hp(w,{width:i.offsetWidth,height:i.offsetHeight},a.innerWidth,_p(e));i.style.top=`${b.top}px`,i.style.left=`${b.left}px`,i.dataset.side=b.side,i.style.visibility=""},u=f=>{if(f.pointerType==="touch")return;let m=f.target&&f.target.closest?f.target.closest(`[${ao}]`):null;m!==o&&(l(),m&&(o=m,s=setTimeout(()=>{o===m&&m.isConnected&&c(m)},t)))},d=f=>{f.key==="Escape"&&l()};e.addEventListener("pointerover",u),e.addEventListener("pointerdown",l,!0),e.addEventListener("keydown",d),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);let p={hide:l,uninstall(){l(),e.removeEventListener("pointerover",u),e.removeEventListener("pointerdown",l,!0),e.removeEventListener("keydown",d),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),i?.remove(),i=null,ya.delete(e)}};return ya.set(e,p),p}var Wp="(max-width: 768px)",Yp='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',Gp='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',Kp=0;function Xp({panel:e,button:t,label:n="Menu",media:a=Wp}){let i=e.ownerDocument,o=i.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++Kp}`);let s=t??i.createElement("button");t||(s.type="button",s.innerHTML=Yp),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function c(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),i.addEventListener("keydown",d,!0),i.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(Gp)].find(h=>!h.hidden&&h.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function u({focus:h}={}){if(!l())return;let g=e.contains(i.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),i.removeEventListener("keydown",d,!0),i.removeEventListener("pointerdown",p,!0),(h??g)&&s.focus?.({preventScroll:!0})}function d(h){h.key==="Escape"&&(h.preventDefault(),h.stopPropagation(),u({focus:!0}))}function p(h){let g=h.target;g instanceof o.Node&&(e.contains(g)||s.contains(g))||u({focus:!1})}let f=()=>l()?u({focus:!0}):c(),m=h=>{let g=h.target,y=g instanceof o.Element?g.closest("button"):null;!y||!e.contains(y)||y.closest("[data-nc-menu-stay]")||u({focus:!0})};s.addEventListener("click",f),e.addEventListener("click",m);let w=o.matchMedia?.(a),b=()=>{w?.matches||u({focus:!1})};return w?.addEventListener?.("change",b),{button:s,panel:e,open:c,close:u,isOpen:l,destroy(){u({focus:!1}),s.removeEventListener("click",f),e.removeEventListener("click",m),w?.removeEventListener?.("change",b)}}}var Ci="netcomposer.rhythm.hidden.v1",Ae=new WeakMap;function wa(){try{return globalThis.localStorage??null}catch{return null}}function Ys(e,t=Ci){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function io(e,t,n,a=Ci){let i=Ys(e,a);n?i.add(t):i.delete(t);try{e?.setItem(a,JSON.stringify([...i]))}catch{}}function Fi(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(i=>i.controls)],n=[],a=i=>{if(n.push(i),i.type==="group")for(let o of i.controls)a(o)};for(let i of t)a(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&(n.push(...(i.sends??[]).map(o=>({...o,type:"knob",compact:!0}))),i.pan&&n.push(Mi(i)));return n}function Gs(e,t){if(!(!e||!t))return Fi(e).find(n=>n.id===t)}function Vp(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${Fi(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Qp(e,t){if(!t.title)return;if(!t.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=t.title,e.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let i=document.createElement("span");i.className="nc-panel-subject",i.dataset.ncPanelSubject="",n.append(a,i),e.append(n),Ks(e,t)}function Ks(e,t){if(!t.panel)return;let n=[...e.children].find(o=>o.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),i=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),i&&(i.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Jp(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=Ae.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Gs(n,a)}function Zp(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],i=Vp(t);if(e.dataset.ncSignature===i){for(let o of a){let s=e.querySelector(`[data-nc-section="${oo(o.id)}"]`);s&&Ks(s,o);for(let l of o.controls){let c=e.querySelector(`[data-nc-id="${oo(l.id)}"]`);c instanceof Element&&ke(c,l)}s instanceof HTMLElement&&Qa(s,o,n)}return}e.dataset.ncSignature=i,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let o of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=o.id,o.inset&&(s.dataset.ncInset="true"),o.area&&(s.dataset.ncArea=o.area),o.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",o.label)),o.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),o.title&&s.setAttribute("aria-label",o.title)),Qp(s,o);let l=o.panel?document.createElement("div"):s;o.panel&&(l.className="nc-panel-body",s.append(l));for(let c of o.controls)l.append(kt(c,Jp));e.append(s),Qa(s,o,n)}}function Xs(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,i=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,i))}}var eh="(max-width: 768px)",Vs=new WeakMap;function ro(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function th(e,t){let n=[...e.children].find(u=>u.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let i=ro("prev"),o=ro("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(i,s,o,l);let c=(u,d)=>{let p=Vs.get(e);if(!p||d.getAttribute("aria-disabled")==="true")return;let f=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:m}=Xs(f,p.pageSize,(t.pages.get(p.id)??0)+u);t.pages.set(p.id,m),p.onPage?.(m),Qa(e,{...p,page:m},t),d.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===d&&(d===i?o:i).focus(),t.redraw()};return i.addEventListener("click",()=>c(-1,i)),o.addEventListener("click",()=>c(1,o)),e.prepend(a),a}function Qa(e,t,n){Vs.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],i=t.pageSize??0,{pages:o,page:s}=Xs(a.length,i,t.page??n.pages.get(t.id)??0);if(i>0&&n.pages.set(t.id,s),o<=1){for(let h of[...e.children])h.classList.contains("nc-fx-pager")&&h.remove();delete e.dataset.ncPaged;for(let h of a)delete h.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(eh).matches===!0,c=e.closest(".nc-module");a.forEach((h,g)=>{let y=Math.floor(g/i)!==s;if(y?h.dataset.ncOffPage="":delete h.dataset.ncOffPage,y&&!l){let v=c instanceof HTMLElement?Ae.get(c):void 0;Fp(h,Gs(v,h.dataset.ncId))}});let u=th(e,n),d=u.querySelector('[data-nc-fx-page="prev"]'),p=u.querySelector('[data-nc-fx-page="next"]');d.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===o-1?"true":"false");let f=u.querySelector("[data-nc-fx-page-count]"),m=`${s+1} / ${o}`;f.textContent!==m&&(f.textContent=m);let w=u.querySelector("[data-nc-fx-page-live]"),b=`Effects page ${s+1} of ${o}`;w.textContent!==b&&(w.textContent=b)}function oo(e){return e.replace(/["\\]/g,"\\$&")}function nh(e,t=Ci){Zo();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Ys(wa(),t).has(e.id),i=document.createElement("header");i.className="nc-module-hd",i.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let u=ts({labelledBy:o.id,onChange:y=>(Ae.get(n)??e).onToggle?.(y)});u.el.dataset.ncModuleSwitch="",s.append(u.el,l,c);let d=document.createElement("span");d.className="nc-snap-msg",d.dataset.ncStatus="",i.append(o,d,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let m=document.createElement("span");m.className="nc-slim-lines",f.append(m);let w=document.createElement("i");w.className="nc-token-probe",w.dataset.ncProbe="",n.append(w,i,p,f),n.setAttribute("aria-labelledby",o.id);let b=y=>{let v=Ae.get(n)??e;n.dataset.ncOpen=y?"false":"true",p.hidden=y,f.hidden=!y,l.textContent=y?"+":"−",l.setAttribute("aria-expanded",y?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${y?"Show":"Hide"} ${v.title}`),l.title=y?"Show":"Hide",y?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let y=n.dataset.ncOpen==="true";io(wa(),(Ae.get(n)??e).id,y,t),b(y),Ja(n.parentElement)}),f.addEventListener("click",()=>{io(wa(),(Ae.get(n)??e).id,!1,t),b(!1),Ja(n.parentElement)});let h={pages:new Map,redraw:()=>g.redraw()},g={el:n,update(y){Ae.set(n,y),y.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=y.title,d.textContent=y.status??"",y.status!==void 0?d.setAttribute("aria-live","polite"):d.removeAttribute("aria-live"),m.textContent=y.summary??y.title,u.el.hidden=y.on===void 0,u.set(y.on===!0),y.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,f.setAttribute("aria-label",`Show ${y.title}`),Zp(p,y,h),b(p.hidden),g.redraw()},redraw(){let y=Ae.get(n);y&&Dp(n,Fi(y))}};return Ae.set(n,e),b(a),g.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>g.redraw()).observe(n),Vo(()=>g.redraw(),n.ownerDocument),g}function ah(e,t,n="adjacent"){Zo(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((i,o)=>{let s=o%4+1;i.el.dataset.ncShade=String(s),i.el.dataset.ncPlace=a;let l=i.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(i.el),i.redraw()}),Ja(e)}function Ja(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=t.some(o=>o.hasAttribute("data-nc-lead")),a=t.map(o=>o.hasAttribute("data-nc-slim")?r("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let i=t.filter(o=>!o.hasAttribute("data-nc-slim"));n&&t.length===4&&i.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const ih="https://musicmatter.art/library/library.json",yt="musicmatter.art",rh=["CC0-1.0","CC-BY-4.0","CC-BY-SA-4.0","PDM-1.0"],Qs=6,oh=2,Ni=["kick","snare","clap","hat","tom","perc","cymbal","fx","tonal"],Js=["redistributable","personal","unknown"],Oe=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{},O=(e,t=300)=>typeof e=="string"?e.trim().slice(0,t):"",se=(e,t=0)=>typeof e=="number"&&Number.isFinite(e)?e:t,he=e=>{const t=O(e,600);return/^https?:\/\/[^\s"'<>]+$/i.test(t)?t:""},zi=/^[0-9a-f]{64}$/,Zs="0123456789abcdefghijklmnopqrstuvwxyz";function sh(e){const t=Oe(e),n=Array.isArray(t.sounds)?t.sounds:[],a=new Set,i=[];for(const o of n){const s=Oe(o),l=O(s.id,160),c=O(s.role),u=O(s.license,40),d=he(s.audio),p=O(s.sha256,64).toLowerCase(),f=O(s.title,160);if(!l||a.has(l)||!Ni.includes(c)||!d||!f||!rh.includes(u)||!zi.test(p))continue;a.add(l);const m=Oe(s.measures),w=se(m.gain_db),b=Oe(s.source);i.push({id:l,origin:"shelf",licenseStatus:"",permission:"",role:c,title:f,instrument:f.split(" · ")[0]??f,tags:(Array.isArray(s.tags)?s.tags:[]).filter(h=>typeof h=="string").map(h=>h.toLowerCase().slice(0,40)),license:u,licenseUrl:he(s.license_url)||Pi(u),creator:O(s.creator,120)||"Unknown",creatorLink:he(s.creator_link),source:he(b.url),audio:d,manifest:he(s.manifest),sha256:p,measures:{length:se(m.length_s,1),attack:se(m.attack_ms,10),decay:se(m.decay_s,.3),centroid:se(m.centroid_hz,1e3),level:se(m.hit_dbfs,-20)+w,gain:w},wave:typeof s.wave=="string"?Array.from(s.wave.slice(0,96),h=>Math.max(0,Zs.indexOf(h))/35):[]})}return{name:O(t.name,120)||yt,sounds:i}}function Za(e){const t=O(e,400).replace(/\\/g,"/");if(!t||t.startsWith("/")||/^[a-z][a-z0-9+.-]*:/i.test(t)||t.includes("\0"))return"";const n=t.split("/");return n.some(a=>!a||a==="."||a==="..")?"":n.join("/")}const lh="local:";function el(e,t){const n=Oe(e),a=Array.isArray(n.sounds)?n.sounds:[],i=new Set,o=[];for(const s of a){const l=Oe(s),c=O(l.id,160),u=`${lh}${c}`,d=O(l.role),p=O(l.license,40)||"unknown",f=Za(l.audio),m=O(l.sha256,64).toLowerCase(),w=O(l.title,160);if(!c||i.has(u)||!Ni.includes(d)||!f||!w||!zi.test(m))continue;i.add(u);const b=Oe(l.measures),h=se(b.gain_db),g=Oe(l.source),y=O(l.license_status,20);o.push({id:u,origin:"local",licenseStatus:Js.includes(y)?y:"unknown",permission:O(l.permission,300),role:d,title:w,instrument:w.split(" · ")[0]??w,tags:(Array.isArray(l.tags)?l.tags:[]).filter(v=>typeof v=="string").map(v=>v.toLowerCase().slice(0,40)),license:p,licenseUrl:he(l.license_url)||Pi(p),creator:O(l.creator,120)||"Unknown",creatorLink:he(l.creator_link),source:he(g.url),audio:`local:${t}/${f}`,manifest:Za(l.manifest),sha256:m,measures:{length:se(b.length_s,1),attack:se(b.attack_ms,10),decay:se(b.decay_s,.3),centroid:se(b.centroid_hz,1e3),level:se(b.hit_dbfs,-20)+h,gain:h},wave:typeof l.wave=="string"?Array.from(l.wave.slice(0,96),v=>Math.max(0,Zs.indexOf(v))/35):[]})}return{name:O(n.name,120)||"Local Library",sounds:o}}function tl(e){const t=/^local:[^/]+\/(.+)$/.exec(e);return t?Za(t[1]):""}function so(e,...t){return{name:e,sounds:t.flatMap(n=>n?.sounds??[])}}function Pi(e){return e==="CC0-1.0"?"https://creativecommons.org/publicdomain/zero/1.0/":e==="CC-BY-4.0"?"https://creativecommons.org/licenses/by/4.0/":e==="CC-BY-SA-4.0"?"https://creativecommons.org/licenses/by-sa/4.0/":e==="PDM-1.0"?"https://creativecommons.org/publicdomain/mark/1.0/":""}function Di(e,t="",n=""){return e==="CC0-1.0"?"CC0":e==="CC-BY-4.0"?"BY":e==="CC-BY-SA-4.0"?"BY-SA":e==="PDM-1.0"?"PD":e==="Permission-only"||n?"PERM":t==="personal"?"PERS":t==="unknown"||e==="unknown"?"?":e}function nl(e){return e.origin==="local"&&e.licenseStatus!=="redistributable"}function Jn(e,t=24){const n=e.trim();if(n.length<=t)return n;const[a=n,i=""]=n.split(" · "),o=i.split(/\s+/).at(-1)??"",s=/^(?:v|vl|rr|k)?\d{1,2}$|^(?:p{1,3}|mp|mf|f{1,3})\d*$/i.test(o)?o:"",l=s?`${a} ${s}`:"";return l&&l.length<=t?l:a.length<=t?a:n.slice(0,t).trim()}const ei={kick:"kick",kicks:"kick",bd:"kick",bassdrum:"kick","bass drum":"kick","kick drum":"kick",snare:"snare",snares:"snare",sd:"snare","snare drum":"snare",rimshot:"snare",clap:"clap",claps:"clap",handclap:"clap",handclaps:"clap","hand clap":"clap","hand claps":"clap",hat:"hat",hats:"hat",hihat:"hat",hihats:"hat","hi-hat":"hat","hi-hats":"hat","hi hat":"hat","hi hats":"hat","high hat":"hat",hh:"hat",ch:"hat",oh:"hat",tom:"tom",toms:"tom",tomtom:"tom","floor tom":"tom",perc:"perc",percs:"perc",percussion:"perc",cymbal:"cymbal",cymbals:"cymbal",crash:"cymbal",ride:"cymbal",splash:"cymbal",china:"cymbal",fx:"fx",sfx:"fx",effect:"fx",effects:"fx",tonal:"tonal",melodic:"tonal",pitched:"tonal",bell:"tonal",bells:"tonal",mallet:"tonal",mallets:"tonal",chime:"tonal",chimes:"tonal"},ch={ch:"closed",oh:"open"},lo={punchy:{wants:[{measure:"attack",dir:-1},{measure:"decay",dir:-1}],tag:"punchy"},tight:{wants:[{measure:"decay",dir:-1}],tag:"tight"},snappy:{wants:[{measure:"decay",dir:-1},{measure:"centroid",dir:1}],tag:"snappy"},short:{wants:[{measure:"length",dir:-1},{measure:"decay",dir:-1}],tag:"short"},dry:{wants:[{measure:"decay",dir:-1}]},long:{wants:[{measure:"length",dir:1},{measure:"decay",dir:1}],tag:"long"},ringing:{wants:[{measure:"decay",dir:1}]},wet:{wants:[{measure:"decay",dir:1}]},big:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}],tag:"boomy"},boomy:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}],tag:"boomy"},fat:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}]},deep:{wants:[{measure:"centroid",dir:-1}],tag:"deep"},dark:{wants:[{measure:"centroid",dir:-1}],tag:"dark"},warm:{wants:[{measure:"centroid",dir:-1}]},low:{wants:[{measure:"centroid",dir:-1}]},muffled:{wants:[{measure:"centroid",dir:-1}]},bright:{wants:[{measure:"centroid",dir:1}],tag:"bright"},crisp:{wants:[{measure:"centroid",dir:1},{measure:"decay",dir:-1}]},sharp:{wants:[{measure:"centroid",dir:1},{measure:"attack",dir:-1}]},high:{wants:[{measure:"centroid",dir:1}]},airy:{wants:[{measure:"centroid",dir:1}]},loud:{wants:[{measure:"level",dir:1}],tag:"hard"},hard:{wants:[{measure:"level",dir:1}],tag:"hard"},heavy:{wants:[{measure:"level",dir:1},{measure:"centroid",dir:-1}]},soft:{wants:[{measure:"level",dir:-1}],tag:"soft"},quiet:{wants:[{measure:"level",dir:-1}],tag:"soft"},gentle:{wants:[{measure:"level",dir:-1}],tag:"soft"},ghost:{wants:[{measure:"level",dir:-1}],tag:"soft"}},ti={funk:["tight","punchy"],funky:["tight","punchy"],disco:["tight","bright"],dusty:["dark","soft"],lofi:["dark","soft"],"lo-fi":["dark","soft"],vintage:["dark"],"70s":["dark","tight"],"60s":["dark","soft"],old:["dark"],jazz:["soft","dark"],jazzy:["soft","dark"],rock:["hard","long"],metal:["hard","bright"],hiphop:["punchy","dark"],"hip-hop":["punchy","dark"],"boom bap":["punchy","dark"],boombap:["punchy","dark"],trap:["punchy","short"],techno:["tight","punchy"],house:["tight","punchy"],ambient:["long","soft"],cinematic:["big","long"],epic:["big","loud"]},al=new Set(["kit","kits","drumkit","drumkits","drums","set","drum kit"]),dh=new Set("a an the some any with and or of for to me my give find get want need please like sound sounds sample samples one ones really very bit little more less that this".split(" "));function uh(e){const t=e.toLowerCase().replace(/[^a-z0-9\s-]/g," ").split(/\s+/).filter(Boolean),n=[];for(let a=0;a<t.length;a++){const i=`${t[a]} ${t[a+1]??""}`;t[a+1]&&(i in ei||i in ti||al.has(i))?(n.push(i),a++):n.push(t[a])}return n}function qi(e){return new Set(e.title.toLowerCase().split(/[^a-z0-9]+/).map(t=>t.replace(/\d+$/,"")).filter(t=>t.length>1))}function ni(e,t){const n={text:e.trim(),roles:[],tags:[],softTags:[],wants:[],kit:!1,kind:"",unknown:[]},a=new Set;if(t)for(const o of t.sounds){for(const s of o.tags)a.add(s);for(const s of qi(o))a.add(s)}const i=o=>{const s=lo[o];s&&(n.wants.push(...s.wants),s.tag&&!n.softTags.includes(s.tag)&&n.softTags.push(s.tag))};for(const o of uh(e))if(al.has(o))n.kit=!0;else if(o in ei){const s=ei[o];n.roles.includes(s)||n.roles.push(s);const l=ch[o];(l==="open"||l==="closed")&&(n.kind=l)}else if(o in lo)i(o);else if(o in ti)for(const s of ti[o]??[])i(s);else if(o==="open")n.kind="open";else if(o==="closed"||o==="close")n.kind="closed";else{if(dh.has(o))continue;if(!t||a.has(o)||a.has(o.replace(/s$/,""))){const s=t&&!a.has(o)?o.replace(/s$/,""):o;n.tags.includes(s)||n.tags.push(s)}else n.unknown.push(o)}return n}function ph(e,t){const n=[...e].sort((o,s)=>o.measures[t]-s.measures[t]),a=new Map,i=Math.max(1,n.length-1);return n.forEach((o,s)=>a.set(o.id,s/i)),a}const hh=[{measure:"level",dir:1,weight:.5},{measure:"length",dir:-1,weight:.2}],fh=.2,mh={kick:-1,tom:-1,snare:1,clap:1,hat:1};function Bi(e,t){const n=new Set(t.wants.map(s=>s.measure)),a=new Map,i=(s,l)=>{let c=a.get(s);return c||(c=ph(e,s),a.set(s,c)),c.get(l)??.5},o=(s,l)=>s.reduce((c,u)=>{const d=i(u.measure,l);return c+(u.dir>0?d:1-d)},0)/Math.max(1,s.length);return e.map(s=>{const l=qi(s);let c=0;for(const d of t.tags)c+=s.tags.includes(d)?2:l.has(d)?1:0;t.wants.length&&(c+=2*o(t.wants,s.id));const u=mh[s.role];for(const d of[...hh,...u?[{measure:"centroid",dir:u,weight:fh}]:[]])n.has(d.measure)||(c+=2*d.weight*o([d],s.id));for(const d of t.softTags)s.tags.includes(d)&&(c+=.4);return{sound:s,score:c}})}const co=(e,t)=>t.score-e.score||e.sound.title.localeCompare(t.sound.title)||e.sound.id.localeCompare(t.sound.id);function On(e,t,n,a){let i=e.sounds.filter(o=>!a.has(o.id)&&(!t.length||t.includes(o.role)));if(n.length){const o=i.filter(s=>{const l=qi(s);return n.some(c=>s.tags.includes(c)||l.has(c))});o.length&&(i=o)}return i}function Oi(e,t){const n=[...e].sort(co),a=[],i=new Map;for(const o of n){if(a.length>=t)break;const s=i.get(o.sound.instrument)??0;s>=oh||(i.set(o.sound.instrument,s+1),a.push(o))}for(const o of n){if(a.length>=t)break;a.includes(o)||a.push(o)}return a.sort(co)}function gh(e,t){if(!t)return e;const n=e.filter(a=>a.role==="hat"&&tn(a)===t);return n.length?n:e}function bh(e,t,n={}){const a=t.kind&&!t.roles.length?["hat"]:t.roles,i=gh(On(e,a,t.tags,n.exclude??new Set),t.kind);return Oi(Bi(i,t),n.limit??Qs)}const yh=[{key:"kick",label:"Kick",role:"kick",nearest:["tom","perc"]},{key:"snare",label:"Snare",role:"snare",nearest:["clap","perc"]},{key:"clap",label:"Clap",role:"clap",nearest:["snare","perc"]},{key:"closed-hat",label:"Closed hat",role:"hat",tag:"closed",nearest:["perc","cymbal"]},{key:"open-hat",label:"Open hat",role:"hat",tag:"open",nearest:["cymbal","perc"]},{key:"tom",label:"Tom",role:"tom",nearest:["perc","kick"]},{key:"perc",label:"Perc",role:"perc",nearest:["tom","tonal"]},{key:"fx",label:"FX",role:"fx",nearest:["tonal","cymbal","perc"]}];function tn(e){if(e.tags.includes("closed"))return"closed";if(e.tags.includes("open"))return"open";const t=e.title.toLowerCase();return/\bclose[d]?\b|hitc\b/.test(t)?"closed":/\bopen\b|hito\b/.test(t)?"open":""}function wh(e,t,n,a){const i=On(e,[t.role],n.tags,a);if(t.tag){const o=i.filter(l=>tn(l)===t.tag);if(o.length)return{list:o,role:t.role,kindMissing:!1};const s=i.filter(l=>tn(l)==="");if(s.length)return{list:s,role:t.role,kindMissing:!0}}else if(i.length)return{list:i,role:t.role,kindMissing:!1};for(const o of t.nearest){const s=On(e,[o],n.tags,a);if(s.length)return{list:s,role:o,kindMissing:!1}}return{list:[],role:t.role,kindMissing:!1}}const vh={kick:"a kick",snare:"a snare",clap:"a clap",hat:"a hat",tom:"a tom",perc:"a percussion sound",cymbal:"a cymbal",fx:"an effect",tonal:"a tonal sound"};function uo(e,t){const n=t.wants.some(o=>o.measure==="level")?t:{...t,wants:[...t.wants,{measure:"level",dir:1}]},a=new Set,i=[];for(const o of yh){const{list:s,role:l,kindMissing:c}=wh(e,o,n,a),u=Oi(Bi(s,n),1)[0];if(!u)continue;a.add(u.sound.id);const d=l!==o.role?`No ${o.label.toLowerCase()} in the Library: ${vh[l]} instead.`:c?`No ${o.label.toLowerCase()} labelled as one: the nearest hat instead.`:void 0;i.push({slot:o,sound:u.sound,...d?{note:d}:{}})}return i}const Ri="your local Library";function Ii(e,t){return{id:e.id,title:e.title,role:e.role,creator:e.creator,creatorLink:e.creatorLink,license:e.license,licenseUrl:e.licenseUrl,source:e.source,audio:e.audio,sha256:e.sha256,gainDb:e.measures.gain,curator:e.origin==="local"?Ri:yt,query:t.trim().slice(0,120),kind:e.role==="hat"?tn(e):"",origin:e.origin,licenseStatus:e.licenseStatus}}function xh(e){if(!e||typeof e!="object"||Array.isArray(e))return null;const t=e,n=O(t.id,160),a=O(t.title,160),i=O(t.license,40),o=O(t.sha256,64).toLowerCase();if(!n||!a||!i)return null;const s=Ni.includes(t.role)?t.role:"perc",l=t.kind==="closed"||t.kind==="open"?t.kind:"",c=t.origin==="local"?"local":"shelf",u=O(t.licenseStatus,20),d=c==="local"?tl(O(t.audio,600))?O(t.audio,600):"":he(t.audio);return{id:n,title:a,role:s,creator:O(t.creator,120)||"Unknown",creatorLink:he(t.creatorLink),license:i,licenseUrl:he(t.licenseUrl)||Pi(i),source:he(t.source),audio:d,sha256:zi.test(o)?o:"",gainDb:Math.max(-60,Math.min(60,se(t.gainDb))),curator:O(t.curator,80)||(c==="local"?Ri:yt),query:O(t.query,120),kind:l,origin:c,licenseStatus:c==="local"&&Js.includes(u)?u:c==="local"?"unknown":""}}function kh(e,t,n=new Set,a=3){const i=ni(t.query,e),o=new Set([...n,t.id]);let s=On(e,[t.role],i.tags,o);if(t.role==="hat"&&t.kind){const l=s.filter(c=>tn(c)===t.kind);l.length&&(s=l)}return Oi(Bi(s,{...i,roles:[t.role]}),a)}function il(e){const t=new Map;return e.forEach((n,a)=>{const i=n.provenance;if(!i)return;const o=t.get(i.id);o?o.pads.push(a+1):t.set(i.id,{...i,pads:[a+1]})}),[...t.values()]}function $h(e){return["shelf","local"].map(n=>({origin:n,credits:e.filter(a=>(a.origin??"shelf")===n)})).filter(n=>n.credits.length)}const Q=16,me=16,Et=10,rl=["1","2","3","4","5","6","7","8","9","0"],ol=[0,2,4,8,16],Eh=[0,1,2,4,8],ai=["always","1:2","2:2","1:3","2:3","3:3","1:4","2:4","3:4","4:4","1:5","2:5","3:5","4:5","5:5","1:6","2:6","3:6","4:6","5:6","6:6","1:7","2:7","3:7","4:7","5:7","6:7","7:7","1:8","2:8","3:8","4:8","5:8","6:8","7:8","8:8","fill","!fill","pre","!pre"],Rn={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}};function ye(e){return{name:`Pad ${e+1}`,sample:null,mode:"oneshot",dir:"fwd",start:0,end:1,slices:0,cuts:[],tune:0,fine:0,fit:0,keepPitch:!0,attack:0,decay:4,cutoff:0,resonance:0,level:.8,pan:0,choke:0,provenance:null}}function Zn(){return{on:!1,accent:!1,velocity:.8,chance:1,slice:null,pitch:0,reverse:!1,cond:"always"}}function ea(){return{length:me,mute:!1,solo:!1,steps:Array.from({length:me},Zn)}}function sl(){return{filter:{on:!0,mode:"lp",cutoff:1,resonance:.15},drive:structuredClone(Rn.drive),compressor:structuredClone(Rn.compressor)}}function ii(){return{v:1,pads:Array.from({length:Q},(e,t)=>ye(t)),lanes:Array.from({length:Q},ea),swing:.5,hacks:sl(),slots:Array.from({length:Et},()=>null),active:null,selected:0,master:1}}const Te=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{},ie=(e,t,n,a)=>typeof e=="number"&&Number.isFinite(e)?Math.min(n,Math.max(t,e)):a,He=(e,t,n,a)=>Math.round(ie(e,t,n,a)),_e=(e,t)=>typeof e=="boolean"?e:t,In=(e,t,n)=>t.includes(e)?e:n,po=/^[0-9a-f]{16,64}$/;function Ah(e,t){const n=Te(e),a=ye(t);let i=ie(n.start,0,1,0),o=ie(n.end,0,1,1);o-i<.001&&([i,o]=[0,1]);const s=ol.includes(n.slices)?n.slices:0,l=typeof n.cuts=="string"&&n.cuts.length<=cl?n.cuts.split(" ").map(Number):n.cuts,c=Array.isArray(l)?l.filter(u=>typeof u=="number"&&u>0&&u<1).sort((u,d)=>u-d).slice(0,15):[];return{name:typeof n.name=="string"&&n.name.trim()?n.name.trim().slice(0,24):a.name,sample:typeof n.sample=="string"&&po.test(n.sample)?n.sample:null,mode:In(n.mode,["oneshot","gate","loop"],a.mode),dir:In(n.dir,["fwd","rev","pingpong"],a.dir),start:i,end:o,slices:s,cuts:s?c:[],tune:He(n.tune,-24,24,0),fine:He(n.fine,-100,100,0),fit:Eh.includes(n.fit)?n.fit:0,keepPitch:_e(n.keepPitch,!0),attack:ie(n.attack,0,.1,a.attack),decay:ie(n.decay,.01,4,a.decay),cutoff:ie(n.cutoff,-1,1,0),resonance:ie(n.resonance,0,1,0),level:ie(n.level,0,1,a.level),pan:ie(n.pan,-1,1,0),choke:He(n.choke,0,4,0),provenance:typeof n.sample=="string"&&po.test(n.sample)?xh(n.provenance):null}}function Sh(e){const t=Te(e);return{on:_e(t.on,!1),accent:_e(t.accent,!1),velocity:ie(t.velocity,0,1,.8),chance:ie(t.chance,0,1,1),slice:t.slice===null||t.slice===void 0?null:He(t.slice,0,15,0),pitch:He(t.pitch,-12,12,0),reverse:_e(t.reverse,!1),cond:In(t.cond,ai,"always")}}function Mh(e){const t=Te(e),n=Array.isArray(t.steps)?t.steps:typeof t.steps=="string"?Dh(t.steps):[];return{length:He(t.length,1,me,me),mute:_e(t.mute,!1),solo:_e(t.solo,!1),steps:Array.from({length:me},(a,i)=>Sh(n[i]))}}function ho(e,t){const n=Te(e),a={...t.dials};for(const[i,o]of Object.entries(Te(n.dials)))i in t.dials&&typeof o=="number"&&Number.isFinite(o)&&(a[i]=o);return{on:_e(n.on,t.on),dials:a}}function Lh(e){const t=Te(e),n=Te(t.filter),a=sl();return{filter:{on:_e(n.on,a.filter.on),mode:In(n.mode,["lp","hp","bp"],a.filter.mode),cutoff:ie(n.cutoff,0,1,a.filter.cutoff),resonance:ie(n.resonance,0,1,a.filter.resonance)},drive:ho(t.drive,Rn.drive),compressor:ho(t.compressor,Rn.compressor)}}function jn(e){const t=Te(e),n=Array.isArray(t.pads)?t.pads:[],a=Array.isArray(t.lanes)?t.lanes:[];return{pads:Array.from({length:Q},(i,o)=>Ah(n[o],o)),lanes:Array.from({length:Q},(i,o)=>Mh(a[o])),swing:ie(t.swing,.5,.75,.5),hacks:Lh(t.hacks)}}function ll(e){const t=Te(e);if(t.v!==1)return ii();const n=Array.isArray(t.slots)?t.slots:[],a=jn(t),i=Array.from({length:Et},(s,l)=>n[l]?jn(n[l]):null),o=t.active===null?null:He(t.active,0,Et-1,-1);return{v:1,...a,slots:i,active:o!==null&&o>=0&&i[o]?o:null,selected:He(t.selected,0,Q-1,0),master:ie(t.master,0,1,1)}}function ji(e,t){return structuredClone({index:t,pad:e.pads[t]??ye(t),lane:e.lanes[t]??ea()})}function Th(e,t){const n=structuredClone(t);e.pads[n.index]=n.pad,e.lanes[n.index]=n.lane}function Hi(e,t){const n=(o,s)=>o.index??s,a=t.map((o,s)=>ji(e,n(o,s))),i=t.map((o,s)=>o.hat?e.pads[n(o,s)]?.choke??0:0).find(o=>o>0)??1;return t.forEach((o,s)=>{const l=ye(n(o,s));l.sample=o.sample,l.name=o.name.slice(0,24)||l.name,l.provenance=o.provenance,o.hat&&(l.choke=i),e.pads[n(o,s)]=l}),a}function Ch(e,t){const n=Array.from({length:Q},(a,i)=>ji(e,i));for(let a=0;a<Q;a++)e.pads[a]=ye(a);return Hi(e,t),n}const nn=8;function Fh(e,t,n,a=0){const i=e.pads[t],o=e.lanes[t];if(!i||!o)return;i.mode="oneshot",i.dir="fwd",i.decay=4,i.attack=0,i.fit=n,i.keepPitch=!0,i.slices=0,i.cuts=[],o.length=me;for(const l of o.steps)Object.assign(l,Zn());const s=o.steps[0];n<=nn&&s&&(s.on=!0,s.cond=n===1?"always":`${a%n+1}:${n}`)}function Nh(e,t=Q){if(typeof e!="string"||!/^\d{1,3}$/.test(e))return-1;const n=Number(e)-1;return n>=0&&n<t?n:-1}function _i(e){return structuredClone({pads:e.pads,lanes:e.lanes,swing:e.swing,hacks:e.hacks})}const cl=4096;function zh(e){const t=Zn(),n=e.map(a=>{let i="";return a.on!==t.on&&(i+="x"),a.accent!==t.accent&&(i+="a"),a.reverse!==t.reverse&&(i+="r"),a.velocity!==t.velocity&&(i+=`v${a.velocity}`),a.chance!==t.chance&&(i+=`c${a.chance}`),a.slice!==t.slice&&a.slice!==null&&(i+=`s${a.slice}`),a.pitch!==t.pitch&&(i+=`p${a.pitch}`),a.cond!==t.cond&&(i+=`k${a.cond}`),i||"-"});for(;n.at(-1)==="-";)n.pop();return n.join(" ")}const Ph="-?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[+-]?\\d+)?",fo=new RegExp(`[xar]|[vcsp]${Ph}|k\\S+$`,"gy");function Dh(e){return e.length>cl?[]:e.split(" ").slice(0,me).map(t=>{const n={};if(t==="-"||t==="")return n;fo.lastIndex=0;let a=0;for(const i of t.matchAll(fo)){const o=i[0];a+=o.length;const s=o.slice(1);o==="x"?n.on=!0:o==="a"?n.accent=!0:o==="r"?n.reverse=!0:o[0]==="v"?n.velocity=Number(s):o[0]==="c"?n.chance=Number(s):o[0]==="s"?n.slice=Number(s):o[0]==="p"?n.pitch=Number(s):o[0]==="k"&&(n.cond=s)}return a===t.length?n:{}})}function qh(e){const t=e.pads.map((a,i)=>{const o=ye(i),s={};for(const[l,c]of Object.entries(a))l==="cuts"?a.cuts.length&&(s.cuts=a.cuts.join(" ")):o[l]!==c&&(s[l]=c);return s}),n=e.lanes.map(a=>({...a.length!==me?{length:a.length}:{},...a.mute?{mute:!0}:{},...a.solo?{solo:!0}:{},steps:zh(a.steps)}));return structuredClone({pads:t,lanes:n,swing:e.swing,hacks:e.hacks})}function an(e){const t=new Set;for(const n of[e,...e.slots])for(const a of n?.pads??[])a.sample&&t.add(a.sample);return t}function dl(){try{return globalThis.localStorage??null}catch{return null}}function Bh(e,t=dl()){try{const n=t?.getItem(e);return n?ll(JSON.parse(n)):ii()}catch{return ii()}}function Oh(e,t,n=dl()){try{return n?.setItem(e,JSON.stringify(t)),!!n}catch{return!1}}const $e=e=>`${Math.round(e*100)}%`,Ve=e=>e<1?`${Math.round(e*1e3)} ms`:`${e.toFixed(2)} s`,ri=e=>e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`,rn=(e,t="")=>`${e>0?"+":""}${e}${t}`,Rh=e=>`×${Number(e.toFixed(2))}`;function Mn(e){return Math.abs(e)<.001?"open":e<0?`LP ${ri(2e4*(60/2e4)**-e)}`:`HP ${ri(20*(8e3/20)**e)}`}const Ln=e=>e>=3.99?"Hold":Ve(e);function Ih(e){const t=ye(0),n=[];return e.tune!==t.tune&&n.push(rn(e.tune," st")),e.fine!==t.fine&&n.push(rn(e.fine," ct")),e.fit!==t.fit&&n.push(`fit ${e.fit} bar${e.fit===1?"":"s"}`),e.fit&&e.keepPitch!==t.keepPitch&&n.push("varispeed"),Math.abs(e.attack-t.attack)>=5e-4&&n.push(`attack ${Ve(e.attack)}`),Ln(e.decay)!==Ln(t.decay)&&n.push(`decay ${Ln(e.decay)}`),Mn(e.cutoff)!==Mn(t.cutoff)&&n.push(`filter ${Mn(e.cutoff)}`),$e(e.resonance)!==$e(t.resonance)&&n.push(`res ${$e(e.resonance)}`),n.join(" · ")}function ul(e){const t=Math.max(0,Math.min(1,e));return Math.min(2e4,40*2**(t*10))}const vn=e=>Math.max(0,Math.min(100,e));function Ui(e){const t=ul(e.cutoff),n=vn(Math.max(0,Math.min(1,e.resonance))*100);return e.mode==="hp"?{type:"highpass",dials:{cutoff:t<=20?0:vn(100*Math.log(t/20)/Math.log(100)),q:n}}:e.mode==="bp"?{type:"bandpass",dials:{centre_hz:vn(100*Math.log(Math.max(100,t)/100)/Math.log(80)),q:n,mix:100}}:{type:"lowpass",dials:{cutoff:e.cutoff>=.999?0:vn(100*Math.log(t/2e4)/Math.log(150/2e4))}}}function jh(e){const{type:t,dials:n}=Ui(e);if(t==="highpass"){const i=n.cutoff??0;return{hz:20*100**(i/100),q:Math.SQRT1_2*(8/Math.SQRT1_2)**((n.q??0)/100),open:i<=0}}if(t==="bandpass")return{hz:100*80**((n.centre_hz??0)/100),q:.4*20**((n.q??0)/100),open:!1};const a=n.cutoff??0;return{hz:2e4*(150/2e4)**(a/100),q:Math.SQRT1_2,open:a<=0}}const pl=e=>!e.on||e.mode==="lp"&&e.cutoff>=.999;function oi(e){const t=Ui(e.filter);return{v:2,chain:[{id:`${t.type}-1`,type:t.type,bypass:pl(e.filter),dials:t.dials},{id:"drive-1",type:"drive",bypass:!e.drive.on,dials:{...e.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!e.compressor.on,dials:{...e.compressor.dials}}]}}function Hh(e,t){if(!e||e.chain.length!==t.chain.length)return{whole:!0};if(e.chain.some((a,i)=>a.type!==t.chain[i]?.type))return{whole:!0};const n=[];return t.chain.forEach((a,i)=>{const o=e.chain[i];if(o){o.bypass!==a.bypass&&n.push([a.id,"bypass",a.bypass]);for(const[s,l]of Object.entries(a.dials))o.dials[s]!==l&&n.push([a.id,s,l])}}),{whole:!1,params:n}}const mo={"page:title":"NYX, the NetComposer sampler. The number is which copy of NYX this is.","page:master":"The volume of everything NYX plays, after the Hacks.","page:save":"Downloads the pattern as a file: pads, steps, Hacks and the ten slots. The samples stay in this browser.","page:load":"Opens a saved pattern file (with its slots, if it has them), or puts an audio file onto the selected pad.","page:panic":"Silences every voice and effect tail at once. NYX then sits out until you press Play.","module:transport":"Play and stop NYX, set the tempo and swing, and keep up to ten saved versions of the whole kit and pattern.","module:pattern":"The 16-step grid, one lane per pad: a step that is on plays that lane's pad. The pads under the grid are the sounds.","module:params":"Everything about the selected pad: which part of the sample plays, its pitch, shape, filter and level. A selected step's locks show here too.","module:hacks":"Effects on everything NYX plays, in order: Filter, then Drive, then Compressor. They are saved with the pattern and its slots.","section:pads":"The 16 sounds: Q W E R A S D F play 1–8, Shift 9–16. Tap to play, double-click a name to rename; long-press or right-click to load or clear; drag to swap.",play:"Starts and stops NYX. In the Studio, Stop sits NYX out while the others play on, and Play brings it back on the next bar.","perform-label":"Effects you play live: hold a button down and NYX's sound changes until you let go. Nothing is saved.",perform:"Hold one of these down to change NYX's sound until you let go.",tempo:"Beats per minute: how fast the pattern plays. In the Studio every instrument shares this clock.",swing:"Pushes every second sixteenth note later for a looser, shuffled feel. 50% is straight.",status:"What NYX is doing now: stopped, playing, sitting out, or waiting to join on the next bar.","kit:slot":"A memory for the whole kit and pattern. Tap to recall it; Shift-click or long-press to store here, Option-click to clear.","kit:note":"Step tool: a tap on a step turns it on or off.","kit:accent":"Step tool: a tap on a step makes it an accent, played louder. Shift-click accents a step with either tool.","kit:fill":"Hold for a fill: steps set to play Only in Fill come in and Not in Fill steps drop out, until you let go.","kit:clear":"Turns every step off and resets lane lengths, mutes, solos and step locks; the pads keep their sounds. Undo brings it back.","kit:mute":"Mute: silences this lane. Its steps stay as they are.","kit:solo":"Solo: hear only the soloed lanes. Solo several to hear them together.","kit:length":"Drag to set how many steps this lane plays before it starts over. Lanes of different lengths drift against each other.","kit:lane-length":"Tap to set this lane's length, then tap the step it should end on.","kit:pad-key":"The key that plays this pad: lower case (q to f) is the key alone, upper case (Q to F) is Shift with it. A Gate pad holds while its key is down.","kit:choke-badge":"Choke group: pads showing the same letter cut each other off, like an open and a closed hi-hat. Set it under Choke.",wave:"The selected pad's sample: the part between Start and End is what plays, lines mark the slices, and a cursor follows playback.",sample:"How much of the sample plays (between Start and End) out of its full length, and whether it is mono or stereo.",mode:"How the pad plays when hit: right through (One-shot), only as long as its step (Gate), or round and round (Loop).",dir:"Which way the pad plays through its sample: forwards, backwards, or forwards then back.",start:"Where the pad starts playing in the sample. Move it right to skip the beginning.",end:"Where the pad stops playing in the sample. Move it left to cut off the tail.",slices:"Cuts the played part into 2 to 16 pieces; each step plays the next piece in turn. Off plays the whole part every time.",chop:"Where the slices are cut: at equal spacing, or where the hits in the sound start.","tune-shape":"Pitch, speed and shape of the selected pad. Closed, it lists what differs from a new pad; NYX remembers in this browser whether it's open.","transport-more":"On a phone, Swing folds away; the line shows it. Tap to show or hide it.","pad-more":"On a phone, the pad's pan, choke group and Clear pad fold away; the line shows pan and choke. Tap to show or hide them.","hacks-more":"On a phone, Drive and Compressor fold away under the Filter; the line says which are on. Tap to show them.","kit:group-toggle":"Opens or closes this section.","pitch-label":"How high or low the pad plays. Pitch changes speed too, like a record, unless Fit's Keep pitch is on.",tune:"Pitch in semitones, up to two octaves either way. Higher also plays faster, unless the pad is fitted with Keep pitch on.",fine:"Fine pitch in cents (hundredths of a semitone), for small corrections.",fit:"Makes the pad last exactly this many bars at the current tempo, and keeps it in time when the tempo changes. Off plays it as recorded.","keep-pitch":"On, Fit stretches the pad to its bars without changing its pitch, and Tune moves the pitch only. Off, it speeds up or slows down like a record.","fit-speed":"How fast the pad plays to fit its bars: ×1 is as recorded. With Keep pitch, stretching far past ×0.75 to ×1.5 may smear the sound.","shape-label":"How each hit's volume moves over time: how it fades in and how it dies away.",attack:"How long each hit takes to fade in. Zero is instant; more softens the start.",decay:"How quickly each hit fades away (in Gate, once its step ends). All the way up is Hold: no fade.",cutoff:"Left of centre cuts the highs (darker), right of centre cuts the lows (thinner). Centre leaves the pad open.",resonance:"Boosts the sound right at the filter's edge for a sharper, ringing tone. It does nothing while the filter is open.","out-label":"Where the pad sits in the mix: how loud, how far left or right, and which pads cut it off.",level:"How loud this pad plays.",pan:"Places the pad left or right in the stereo picture. C is the centre.",choke:"Pads in the same group cut each other off when one plays, like open and closed hi-hats. None lets it ring over the others.","clear-pad":"Removes this pad's sample and settings. Its steps in the grid stay.","lock-label":"Locks for this one step: settings here change only this step, not the whole pad. Long-press another step to edit it.","lock-velocity":"How loud this step plays, before any accent.","lock-chance":"The odds this step plays each time round. At 100% it always plays; lower leaves it out at random.","lock-slice":"Which slice this step plays. In order plays the slice that matches the step's place, so a chopped beat plays back as it was.","lock-pitch":"Moves this step up or down in semitones, on top of the pad's own Tune.","lock-cond":"When this step plays: always, only on some passes through the lane, only with Fill held or not, or only if the lane's last conditional step did or didn't.","lock-reverse":"Whether this step plays the pad's own way or the other way round.","lock-done":"Closes this step's locks and goes back to the pad's settings.","grab-label":"Brings sound from the Studio onto the selected pad: Grab the bars that just played, or Take a performance as it happens.","grab-from":"Which Studio sound to grab or take from: the master mix or one instrument's channel.","grab-bars":"How many bars Grab takes. One bar is cut into 16 slices with every step on; longer grabs are sliced at the hits.",grab:"Copies the bars that just played onto the selected pad, cut on the bar lines (the music must be playing). It asks before replacing a pad that has a sound.","grab-undo":"Puts back what this Grab, Take, sent take, Library Load or Build kit replaced: old sounds, slices and steps. Cmd/Ctrl+Z does the same.",library:"Opens the Library: openly licensed sounds checked by a person, found by plain words. Load fills the selected pad; Build kit fills pads 1–8.",credit:"Who made this pad's sound, and its licence. Library › Credits has the full credit with links, and saved patterns keep it.","library:ask":"Plain words: a role (kick, snare, hat, clap, tom, perc, cymbal, fx) and a sound (punchy, tight, dark, bright, long, soft). Add kit for a whole kit.","library:close":"Closes the Library. Esc in the field does the same.","library:play":"Plays this sound through NYX's output, at the level it will have on a pad. Press again to stop.","library:load":"Puts this sound on the selected pad, named after it and with its credit; the steps stay. Undo brings the old sound back.","library:kit":"Fills pads 1–8 with a kit for your words (kick, snare, clap, hats, tom, perc, fx); the pattern stays and the hats cut each other. One Undo puts all eight back.","library:credits":"Every Library sound on the pads: who made it, its licence and its source. Saved patterns, slots and Studio Scenes keep these credits.","library:badge":"The licence. CC0 needs no credit (NYX credits it anyway); BY needs credit, and BY-SA credit plus the same licence on what you make.","library:wave":"The sound's shape, start to end: a tall start is a sharp hit, a long tail rings on.","library:source-shelf":"The curated shelf on musicmatter.art: openly licensed sounds, each checked by a person.","library:source-local":"My samples: your local Library, the folder the sample picker exported. Its sounds play in this browser and are never uploaded.","library:source-all":"Searches musicmatter.art and My samples (your local Library) together.","library:open-folder":"Opens a local Library folder (the sample picker's export) from this computer. NYX only reads it; nothing is uploaded.","library:reconnect":"Your local Library folder, remembered from last time: the browser asks once more before NYX can read it.","library:forget":"Closes your local Library and forgets the folder. The files stay where they are; pads keep their sounds.",take:"Records the chosen source onto the selected pad in whole bars until you press again (up to four minutes); takes of up to 8 bars loop. It asks first if the pad has a sound.","hack-filter":"A filter on all of NYX, to darken it, thin it or narrow it down. The switch turns it on.","filter-mode":"Which part the filter keeps: the lows (low pass), the highs (high pass) or a band in the middle (band pass).","filter-cutoff":"Where the filter cuts. In low pass, all the way up is open: no filtering.","filter-resonance":"Boosts the sound around the cutoff for a sharper, more nasal tone.","filter-curve":"A picture of the filter: how loud each pitch range comes out, lows on the left, highs on the right.","hack-meter":"The level going into this Hack (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. Off, it still shows the input, greyed.","hack-drive":"Distortion on all of NYX, from warm to gritty. The switch turns it on.","hack-drive-drive_db":"How hard the sound is pushed into distortion. 0 dB is clean.","hack-drive-output_db":"The level after the drive, to balance out the louder distorted sound.","hack-drive-mix":"How much of the driven sound is mixed with the clean one. 100% is all drive.","hack-drive-curve":"The kind of distortion: Smooth is warm and round, Acid is harder and buzzier.","hack-drive-tone":"Darkens the driven sound by cutting its highs. All the way up leaves it bright.","hack-compressor":"Evens out NYX's level: loud hits are turned down, so the whole sounds tighter and punchier. The switch turns it on.","hack-compressor-threshold_db":"The level above which the compressor starts turning the sound down. Lower catches more.","hack-compressor-ratio":"How strongly sound above the threshold is turned down. Higher is a firmer squeeze.","hack-compressor-attack_ms":"How fast the compressor reacts to a loud hit. Slower lets the start of each hit punch through.","hack-compressor-release_ms":"How fast the compressor lets go once the sound drops back below the threshold.","hack-compressor-makeup_db":"Turns the whole sound back up after compressing, to make up for the lost level.","kit:more":"More settings for this effect."},_h={perform:{repeat16:"While held, repeats the last sixteenth note over and over, like a stutter.",repeat8:"While held, repeats the last eighth note over and over.",reverse:"While held, plays what NYX just played backwards.",half:"While held, plays on at half speed, an octave lower.",stop:"While held, slows to a halt like a tape machine switched off."},mode:{oneshot:"One-shot: plays on from the hit until it ends or the lane's next hit cuts it. Good for drums.",gate:"Gate: plays only as long as its step (or its key is held), then fades by Decay. Good for chopping long sounds.",loop:"Loop: plays round and round until the pad plays again or the music stops."},dir:{fwd:"Plays the sample the normal way, start to end.",rev:"Plays the sample backwards, end to start.",pingpong:"Plays forwards, then back again. In Loop it keeps bouncing."},"keep-pitch":{on:"Keep pitch: the pad is stretched to its bars and stays at its pitch, whatever the tempo. Tune moves the pitch only.",off:"Varispeed: the pad speeds up or slows down to fit its bars, and its pitch moves with it, like a record."},chop:{even:"Cuts the slices at equal spacing.",transients:"Cuts the slices where the hits in the sound start, so each slice is one hit."},"lock-reverse":{pad:"This step plays in the pad's own direction.",rev:"This step plays the other way round from the pad."}};function q(e){return Object.hasOwn(mo,e)?mo[e]:void 0}function Uh(e,t){const n=_h[e];return(n&&Object.hasOwn(n,t)?n[t]:void 0)??q(e)}const Tn="nyx-help-text",go=new Map;function Wh(e,t){const n=go.get(t);if(n&&e.getElementById(n))return n;let a=e.getElementById(Tn);a||(a=e.createElement("div"),a.id=Tn,a.hidden=!0,e.body.append(a));const i=e.createElement("span");return i.id=`${Tn}-${a.children.length+1}`,i.textContent=t,a.append(i),go.set(t,i.id),i.id}function I(e,t,n){if(!e||!t||(e.getAttribute("data-nc-help")!==t&&e.setAttribute("data-nc-help",t),e.hasAttribute("title")&&e.removeAttribute("title"),!n))return;const a=Wh(n.ownerDocument,t),i=(n.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);if(i.includes(a))return;const o=[...i.filter(s=>!s.startsWith(`${Tn}-`)),a];n.setAttribute("aria-describedby",o.join(" "))}function Yh(e){const t=q(e);return t?{"data-nc-help":t}:{}}const Gh=[['.nc-seg [role="radio"]:not([data-nc-accent-mode])',"kit:note"],['.nc-seg [role="radio"][data-nc-accent-mode]',"kit:accent"],["[data-nc-fill]:not([data-nc-clear])","kit:fill"],["[data-nc-clear]","kit:clear"],['.nc-ms[data-nc-ms="mute"]',"kit:mute"],['.nc-ms[data-nc-ms="solo"]',"kit:solo"],[".nc-len-handle","kit:length"],["[data-nc-len-toggle]","kit:lane-length"],["[data-nc-pads-play]","play"],[".nc-snap","kit:slot"]];function Wi(e){for(const t of e.querySelectorAll(".nc-module[data-nc-module]"))I(t.querySelector(".nc-module-hd .nc-title"),q(`module:${t.dataset.ncModule}`));for(const t of e.querySelectorAll("[data-nc-section]"))I(t.querySelector(":scope > .nc-ui-fx-name, :scope > .nc-panel-hd > .nc-panel-title"),q(`section:${t.dataset.ncSection}`));for(const t of e.querySelectorAll("[data-nc-id]")){const n=t.dataset.ncId??"";if(!t.matches("input, select, canvas"))if(t.classList.contains("nc-field")){const a=t.querySelector(":scope > input, :scope > select, :scope > canvas");I(t.querySelector(":scope > .nc-label"),q(n),a)}else if(t.classList.contains("nc-choice-row"))for(const a of t.querySelectorAll("[data-nc-choice]"))I(a,Uh(n,a.dataset.ncChoice??""),a);else t.classList.contains("nc-btn")?I(t,q(n),t):t.matches(".nc-label[data-nc-text]")?I(t,q(n)):t.classList.contains("nc-ui-fx")&&(I(t.querySelector(":scope > .nc-ui-fx-hd > .nc-ui-fx-name, :scope > .nc-ui-fx-name"),q(n),t.querySelector("[data-nc-fx-switch]")),I(t.querySelector(":scope > .nc-ui-more > summary"),q("kit:more")))}for(const[t,n]of Gh)for(const a of e.querySelectorAll(t)){const i=a.parentElement?.querySelector(":scope > .nc-hit")?a.parentElement:null;i&&a.removeAttribute("title"),I(i??a,q(n),a)}for(const t of e.querySelectorAll(".nc-group[data-nc-id]")){const n=t.querySelector(":scope > .nc-group-toggle");I(n?.querySelector(".nc-group-title")??null,q(t.dataset.ncId??""),n),I(n?.querySelector(".nc-group-mark")??null,q("kit:group-toggle"))}for(const t of e.querySelectorAll(".nc-padgrid-pad-badge"))t.textContent?I(t,q("kit:choke-badge")):t.removeAttribute("data-nc-help")}const Qt=["KeyQ","KeyW","KeyE","KeyR","KeyA","KeyS","KeyD","KeyF"],Kh=Array.from({length:Q},(e,t)=>{const n=(Qt[t%Qt.length]??"").slice(3);return t<Qt.length?n.toLowerCase():n.toUpperCase()});function hl(e){const t=Qt.indexOf(e.code);if(t<0)return-1;const n=e.shiftKey?t+Qt.length:t;return n<Q?n:-1}class Xh{down=new Map;press(t){if(this.down.has(t.code))return-1;const n=hl(t);return n>=0&&this.down.set(t.code,n),n}release(t){const n=this.down.get(t.code);return n===void 0?-1:(this.down.delete(t.code),n)}releaseAll(){const t=[...this.down.values()];return this.down.clear(),t}}const Vh=.25;function Yi(e){return e.slices?e.cuts.length===e.slices-1?[0,...e.cuts,1]:Array.from({length:e.slices+1},(t,n)=>n/e.slices):[0,1]}function fl(e,t,n){const a=e.start*t.frames,i=e.end*t.frames;if(n===null||!e.slices)return[Math.floor(a),Math.ceil(i)];const o=Yi(e),s=Math.min(n,o.length-2);return[Math.floor(a+o[s]*(i-a)),Math.ceil(a+o[s+1]*(i-a))]}function Qh(e,t,n,a=0){let o=2**((e.tune+e.fine/100+a)/12);if(e.fit){const s=(e.end-e.start)*t.frames/t.sampleRate,l=e.fit*4*(60/n);s>0&&l>0&&(o*=s/l)}return o}function ml(e,t,n){return Math.max(1,Math.round(e*4*60/Math.max(1,t)*n))}function gl(e,t,n){if(!e.fit)return 1;const a=(e.end-e.start)*t.frames/t.sampleRate;return a>0?a/(e.fit*4*(60/Math.max(1,n))):1}const bo=[.75,1.5];function Jh(e,t,n){if(n===null||!e.slices)return[0,t];const a=Yi(e),i=Math.min(n,a.length-2);return[Math.floor((a[i]??0)*t),Math.ceil((a[i+1]??1)*t)]}const Zh=1.5;function Gi(e,t,n,a,i,o=!1,s){if(!n.on||!e.sample||!a)return null;const l=n.slice??(e.slices?t%e.slices:null),c=m=>s?Jh(e,s.frames,m):fl(e,a,m);let[u,d]=c(l);const p=n.reverse?e.dir==="rev"?"fwd":"rev":e.dir;if(e.mode==="oneshot"&&l!==null&&e.slices&&!o){const[m,w]=c(null);p==="fwd"?d=w:p==="rev"&&(u=m)}const f=s?2**(n.pitch/12)*(s.frames/ml(e.fit,i,a.sampleRate)):Qh(e,a,i,n.pitch);return{sample:s?s.sample:e.sample,from:u,to:d,rate:f,gain:Math.min(1.5,n.velocity*(n.accent?Zh:1))*e.level,pan:e.pan,mode:e.mode,dir:p,attack:e.attack,decay:e.decay,cutoff:e.cutoff,resonance:e.resonance,choke:e.choke,chance:n.chance,cond:n.cond,fit:e.fit>0}}function ef(e,t,n,a=null,i){return Gi(e,0,{on:!0,accent:!1,velocity:.8,chance:1,slice:a,pitch:0,reverse:!1,cond:"always"},t,n,!0,i)}function tf(e,t,n,a=()=>{}){const i=e.lanes.some(o=>o.solo);return{swing:e.swing,lanes:e.lanes.map((o,s)=>{const l=e.pads[s],c=l?.sample?t(l.sample):void 0,u=l?a(s):void 0;return{length:o.length,audible:i?o.solo:!o.mute,steps:o.steps.map((d,p)=>l?Gi(l,p,d,c,n,!1,u):null)}})}}const nf="/nyx/assets/sampler-processor-BdlrJ3MQ.js",bl=827873614,af=60;async function rf(e,t){const n=new Float64Array([t,e.length,e[0]?.length??0]),a=[new Uint8Array(n.buffer),...e.map(c=>new Uint8Array(c.buffer))],i=a.reduce((c,u)=>c+u.byteLength,0),o=new Uint8Array(i);let s=0;for(const c of a)o.set(c,s),s+=c.byteLength;const l=new Uint8Array(await crypto.subtle.digest("SHA-256",o));return Array.from(l.subarray(0,16),c=>c.toString(16).padStart(2,"0")).join("")}function of(e){const t=e.data[0]?.length??0,n=new Uint8Array(16+t*4*e.data.length);return new Uint32Array(n.buffer,0,4).set([bl,e.sampleRate,e.data.length,t]),e.data.forEach((a,i)=>{n.set(new Uint8Array(a.buffer,a.byteOffset,t*4),16+i*t*4)}),n}function sf(e,t){if(t.byteLength<16)return null;const[n,a,i,o]=new Uint32Array(t,0,4);if(n!==bl||!i||i>2||t.byteLength!==16+o*4*i)return null;const s=Array.from({length:i},(l,c)=>new Float32Array(t.slice(16+c*o*4,16+(c+1)*o*4)));return{hash:e,data:s,sampleRate:a,channels:i,frames:o}}class lf{constructor(t="nyx"){this.folderName=t}memory=new Map;dir=null;folder(){return this.dir??=(async()=>{try{const t=await navigator.storage?.getDirectory?.();return t?await t.getDirectoryHandle(this.folderName,{create:!0}):null}catch{return null}})(),this.dir}info(t){return this.memory.get(t)}held(t){return this.memory.get(t)}async put(t,n){const a=await rf(t,n),i={hash:a,data:t,sampleRate:n,channels:t.length,frames:t[0]?.length??0};this.memory.set(a,i);const o=await this.folder();if(!o)return{sample:i,saved:!1};try{const l=await(await o.getFileHandle(`${a}.f32`,{create:!0})).createWritable?.();return l?(await l.write(of(i)),await l.close(),{sample:i,saved:!0}):{sample:i,saved:!1}}catch{return{sample:i,saved:!1}}}async get(t){const n=this.memory.get(t);if(n)return n;const a=await this.folder();if(!a)return null;try{const i=await(await a.getFileHandle(`${t}.f32`)).getFile(),o=sf(t,await i.arrayBuffer());return o&&this.memory.set(t,o),o}catch{return null}}async prune(t){for(const a of[...this.memory.keys()])t.has(a)||this.memory.delete(a);const n=await this.folder();if(n)try{const a=[];for await(const i of n.keys())a.push(i);for(const i of a){const o=i.replace(/\.f32$/,"");i.endsWith(".f32")&&!t.has(o)&&await n.removeEntry(i)}}catch{}}}function yl(e){const t=Math.min(e.length,Math.round(af*e.sampleRate));return{data:Array.from({length:Math.min(2,e.numberOfChannels)},(a,i)=>{const o=new Float32Array(t);return o.set(e.getChannelData(i).subarray(0,t)),o}),trimmed:t<e.length}}function wl(e,t=200){const n=e[0]?.length??0,a=[];if(!n)return a;const i=n/t;for(let o=0;o<t;o++){const s=Math.floor(o*i),l=Math.max(s+1,Math.floor((o+1)*i));let c=0,u=0;const d=Math.max(1,Math.floor((l-s)/256));for(let p=s;p<l&&p<n;p+=d){let f=0;for(const m of e)f+=m[p]??0;f/=e.length,f<c&&(c=f),f>u&&(u=f)}a.push(Math.max(-1,c),Math.min(1,u))}return a}function cf(e,t,n,a,i){const o=a-n;if(i<2||o<64)return[];const s=Math.max(32,Math.round(t*.01)),l=[];for(let m=n;m<a;m+=s){let w=0;for(const b of e)for(let h=m;h<Math.min(a,m+s);h++)w+=(b[h]??0)*(b[h]??0);l.push(Math.log10(w/s+1e-9))}const c=l.map((m,w)=>{const b=l.slice(Math.max(0,w-4),w),h=b.length?b.reduce((g,y)=>g+y,0)/b.length:m;return Math.max(0,m-h)}),u=Math.max(1,Math.floor(l.length/i/8)),d=c.map((m,w)=>({f:m,i:w})).filter(m=>m.i>0&&m.f>.3).sort((m,w)=>w.f-m.f),p=[];for(const m of d){if(p.length>=i-1)break;p.every(w=>Math.abs(w-m.i)>=u)&&p.push(m.i)}const f=p.map(m=>m*s/o).filter(m=>m>.001&&m<.999);for(let m=1;f.length<i-1&&m<i;m++){const w=m/i;f.every(b=>Math.abs(b-w)>.5/i)&&f.push(w)}for(let m=1;f.length<i-1;m++)f.push(m/(i+1));return f.sort((m,w)=>m-w).slice(0,i-1)}function vl(e=uf()){try{const t=JSON.parse(e?.getItem("lucy.state")??"null");return Array.isArray(t?.takes)?t.takes.flatMap(n=>{const a=n&&typeof n=="object"?n:{},i=o=>typeof a[o]=="number"&&Number.isFinite(a[o])?a[o]:0;return a.saved!==!0||!i("id")||!i("frames")||!i("sampleRate")?[]:[{id:i("id"),bars:i("bars"),bpm:i("bpm"),sampleRate:i("sampleRate"),channels:Math.min(2,Math.max(1,i("channels"))),frames:i("frames")}]}):[]}catch{return[]}}async function df(e){try{const t=await navigator.storage?.getDirectory?.();if(!t)return null;const a=await(await(await t.getDirectoryHandle("lucy")).getFileHandle(`lucy-take-${e.id}.f32`)).getFile(),i=new Float32Array(await a.arrayBuffer());return i.length<e.frames*e.channels?null:Array.from({length:e.channels},(o,s)=>i.slice(s*e.frames,(s+1)*e.frames))}catch{return null}}function uf(){try{return globalThis.localStorage??null}catch{return null}}const pf=150,xl=96*1024*1024,hf=e=>Math.round(e*10)/10;function ff(e,t,n){if(!e.sample||!e.fit||!e.keepPitch||!t)return null;const[a,i]=fl(e,t,null);if(i-a<2)return null;const o=hf(n);return{sample:e.sample,from:a,to:i,bars:e.fit,bpm:o,semitones:e.tune+e.fine/100,sampleRate:t.sampleRate,frames:ml(e.fit,o,t.sampleRate)}}function pt(e){return`${e.sample}:${e.from}-${e.to}:${e.bars}:${e.bpm.toFixed(1)}:${Math.round(e.semitones*100)}`}const mf=e=>`stretch:${e}`,gf=e=>e.startsWith("stretch:");class bf{constructor(t=xl,n=()=>{}){this.maxBytes=t,this.drop=n}map=new Map;bytes=0;get size(){return this.map.size}has(t){return this.map.has(t)}get(t){const n=this.map.get(t);return n&&(this.map.delete(t),this.map.set(t,n)),n}byId(t){for(const n of this.map.values())if(n.sample===t)return n}put(t,n=new Set){const a=this.map.get(t.key);a&&(this.bytes-=a.bytes),this.map.delete(t.key),this.map.set(t.key,t),this.bytes+=t.bytes;for(const[i,o]of this.map){if(this.bytes<=this.maxBytes)break;i===t.key||n.has(i)||(this.map.delete(i),this.bytes-=o.bytes,this.drop(o))}}}class yf{constructor(t,n=xl){this.host=t,this.cache=new bf(n,a=>t.drop(a))}cache;current=new Map;wanted=new Map;inFlight=new Set;timer=null;queue=Promise.resolve();missingSig="";renders=0;lastMs=0;failed=!1;plan(t,n,a){this.wanted.clear();const i=[];t.forEach((c,u)=>{const d=c.sample?n(c.sample):void 0,p=ff(c,d,a),f=this.current.get(u);if(!p){this.current.delete(u);return}this.wanted.set(u,p);const m=pt(p),w=this.cache.get(m);w?this.current.set(u,w):(f&&!wf(f.job,p)&&this.current.delete(u),this.inFlight.has(m)||i.push(m))});const o=i.join("|");if(!i.length||this.failed){this.missingSig="";return}if(o===this.missingSig&&this.timer!==null)return;this.missingSig=o;const s=this.host.clearTimeout??(c=>clearTimeout(c)),l=this.host.setTimeout??((c,u)=>setTimeout(c,u));this.timer!==null&&s(this.timer),this.timer=l(()=>{this.timer=null,this.missingSig="",this.renderWanted()},pf)}stretchedFor(t){return this.current.get(t)}renderFor(t){return this.current.get(t)}pending(t){const n=this.wanted.get(t);return n?this.current.get(t)?.key!==pt(n):!1}renderWanted(){for(const t of new Map([...this.wanted.values()].map(n=>[pt(n),n])).values()){const n=pt(t);this.cache.has(n)||this.inFlight.has(n)||(this.inFlight.add(n),this.queue=this.queue.then(()=>this.renderOne(n,t)))}}idle(){return this.queue}async renderOne(t,n){if(![...this.wanted.values()].some(s=>pt(s)===t)){this.inFlight.delete(t);return}const a=Date.now();let i=null;try{i=await this.host.run(n)}catch(s){console.error("NYX stretch",s)}if(this.inFlight.delete(t),!i){this.failed=!0,this.host.changed();return}this.lastMs=Date.now()-a,this.renders++;const o={key:t,job:n,sample:mf(t),frames:n.frames,bytes:i.reduce((s,l)=>s+l.byteLength,0)};this.host.deliver(o,i);for(const[s,l]of this.wanted)pt(l)===t&&this.current.set(s,o);this.cache.put(o,new Set([...this.current.values()].map(s=>s.key))),this.host.changed()}}const wf=(e,t)=>e.sample===t.sample&&e.from===t.from&&e.to===t.to,vf=48e3;function kl(e,t){try{const n=e?.latency?.(t);return typeof n=="number"&&Number.isFinite(n)&&n>0&&n<=vf?Math.round(n):0}catch{return 0}}function xf(e,t){return{from:e.from+t,to:e.to+t}}const kf="instance",$f=99;function ta(e=typeof location>"u"?"":location.search){const t=new URLSearchParams(e).get(kf)?.trim()??"";if(!/^\d+$/.test(t))return 1;const n=Number(t);return n>=2&&n<=$f?n:1}function Ef(e,t){return t===1?e:`${e}#${t}`}function Af(e,t){return t===1?e:`${e} ${t}`}let ht;function Sf(e,t=ta()){if(ht!==void 0)return ht;ht=null;try{if(typeof window>"u"||window.parent===window)return ht;const n=window.parent.ncStudio;n&&n.version===1&&(ht=n.attach(e,{instance:t}))}catch{}return ht}function Mf(){let e;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(e=a.syncScope)}}catch{}if(!e)return{};const t=`/studio/${e}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${t}`,locks:n?{request:(a,i,o)=>n.request(`${a}${t}`,i,o)}:null}}function Lf(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1&&typeof e.fxWorklet=="string"&&e.fxWorklet?e.fxWorklet:null}catch{return null}}function We(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.grab?e.grab:null}catch{return null}}function At(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.play?e.play:null}catch{return null}}function on(e,t=ta()){return t>1?`${e}#${t}`:e}function Tf(e,t=ta()){const n=At()?.owner()??null;return n===null||n==="studio"||n===on(e,t)}const yo="My samples";function va(e){return e.permission?"used with permission":e.licenseStatus==="redistributable"?"shareable licence":e.licenseStatus==="personal"?"personal use":"licence unknown: personal use"}const wo="http://www.w3.org/2000/svg";function z(e,t={},...n){const a=document.createElement(e);for(const[i,o]of Object.entries(t))a.setAttribute(i,o);return a.append(...n),a}function jt(e,t,n={}){return e?z("a",{href:e,target:"_blank",rel:"noopener noreferrer",...n},t):z("span",n,t)}function Cf(e){if(!e.length)return"M0 1H48";const t=e.map(o=>Math.sqrt(Math.max(0,o))),n=t.length,a=t.map((o,s)=>`${(s+.5)*48/n} ${1-Math.max(.04,o)*.96}`),i=[...t].map((o,s)=>`${(s+.5)*48/n} ${1+Math.max(.04,o)*.96}`).reverse();return`M0 1L${a.join("L")}L48 1L${i.join("L")}Z`}function Ff(e){const t=document.createElementNS(wo,"svg");t.setAttribute("viewBox","0 0 48 2"),t.setAttribute("preserveAspectRatio","none"),t.setAttribute("class","nyx-lib-wave"),t.setAttribute("aria-hidden","true");const n=document.createElementNS(wo,"path");return n.setAttribute("d",Cf(e)),t.append(n),t}function Nf(e){return e<1?`${e.toFixed(2)} s`:e<10?`${e.toFixed(1)} s`:`${Math.round(e)} s`}const zf={kick:"Kick",snare:"Snare",clap:"Clap",hat:"Hat",tom:"Tom",perc:"Perc",cymbal:"Cymbal",fx:"FX",tonal:"Tonal"};class Pf{constructor(t){this.host=t,this.input=z("input",{type:"search",class:"nyx-lib-input",id:"nyx-library-ask",placeholder:"punchy kick, dusty funk kit",autocomplete:"off",spellcheck:"false",enterkeyhint:"search","aria-label":"Ask the Library","data-nyx-lib":"ask"});const n=z("label",{class:"nc-label",for:"nyx-library-ask"},"Ask");I(n,q("library:ask"),this.input),this.input.addEventListener("input",()=>this.schedule()),this.input.addEventListener("keydown",o=>{o.key==="Enter"?(o.preventDefault(),this.run()):o.key==="Escape"&&(o.preventDefault(),this.host.close())});const a=z("button",{type:"button",class:"nc-btn nyx-lib-close","data-nyx-lib":"close"},"Close");I(a,q("library:close"),a),a.addEventListener("click",()=>this.host.close()),this.forLine=z("p",{class:"nc-note nyx-lib-for","data-nyx-lib":"for"}),this.status=z("p",{class:"nc-note nyx-lib-status","data-nyx-lib":"status","aria-live":"polite"}),this.list=z("ul",{class:"nyx-lib-results","data-nyx-lib":"results"}),this.kitBtn=z("button",{type:"button",class:"nc-btn","data-nyx-lib":"kit"},"Build kit"),I(this.kitBtn,q("library:kit"),this.kitBtn),this.kitBtn.addEventListener("click",()=>void this.buildKit()),this.creditsBtn=z("button",{type:"button",class:"nc-btn","data-nyx-lib":"credits","aria-expanded":"false"},"Credits"),I(this.creditsBtn,q("library:credits"),this.creditsBtn),this.creditsBtn.addEventListener("click",()=>{this.creditsOpen=!this.creditsOpen,this.render()}),this.creditsEl=z("div",{class:"nyx-lib-credits",id:"nyx-library-credits","data-nyx-lib":"credits-list"}),this.creditsBtn.setAttribute("aria-controls",this.creditsEl.id),this.sourcesEl=z("div",{class:"nyx-lib-sources",role:"group","aria-label":"Library source","data-nyx-lib":"sources"}),this.fileInput=z("input",{type:"file",hidden:"","data-nyx-lib":"folder-input","aria-label":"Open a local Library folder"}),this.fileInput.webkitdirectory=!0,this.fileInput.multiple=!0,this.fileInput.addEventListener("change",()=>{const o=this.fileInput.files;o?.length&&this.host.local?.openFiles(o),this.fileInput.value=""});const i=this.host.local;if(i){let o=i.state.status;i.onChange(()=>{const s=i.state.status;s==="ready"&&o!=="ready"&&(this.source="local"),s!=="ready"&&this.source!=="shelf"&&s!=="opening"&&(this.source="shelf"),o=s,this.isOpen?this.run():this.render()})}this.el=z("div",{class:"nyx-library",role:"region","aria-label":"Library","data-nyx-library":""},z("div",{class:"nyx-lib-ask"},n,this.input,a),this.sourcesEl,this.fileInput,this.forLine,this.list,this.status,z("div",{class:"nyx-lib-actions"},this.kitBtn,this.creditsBtn),this.creditsEl)}el;input;forLine;status;list;kitBtn;creditsBtn;creditsEl;sourcesEl;fileInput;source="shelf";lib=null;loading=null;failed=!1;query=null;hits=[];kit=[];playing=null;busy=null;creditsOpen=!1;message="";timer=null;isOpen=!1;open(t){this.isOpen=!0,t!==void 0&&(this.input.value=t),this.ensure().then(()=>this.run()),this.render()}closePanel(){this.isOpen=!1,this.host.stopPreview(),this.playing=null}focus(){this.input.focus()}get catalog(){const t=this.host.local?.lib??null;return t?so(yt,this.lib,t):this.lib}catalogFor(t){return t==="local"?this.host.local?.lib??null:this.lib}active(){const t=this.host.local?.lib??null;return this.source==="local"?t:this.source==="all"?t||this.lib?so("All",this.lib,t):null:this.lib}choose(t){t!=="shelf"&&!this.host.local?.lib||(this.source=t,this.run())}openFolder(){const t=this.host.local;t&&(t.canRemember?t.pick():this.fileInput.click())}ensure(){return this.lib?Promise.resolve(this.lib):(this.loading??=this.host.catalog().then(t=>(this.lib=t,this.failed=!1,this.render(),t),()=>(this.failed=!0,this.loading=null,this.render(),null)),this.render(),this.loading)}schedule(){this.timer&&clearTimeout(this.timer),this.timer=setTimeout(()=>this.run(),150)}run(){this.timer&&clearTimeout(this.timer),this.timer=null;const t=this.input.value;if(this.message="",!this.lib&&this.source!=="local"&&!this.failed&&(this.ensure().then(a=>a&&this.run()),this.source==="shelf"))return;const n=this.active();!n||!t.trim()?(this.query=null,this.hits=[],this.kit=[]):(this.query=ni(t,n),this.kit=this.query.kit?uo(n,this.query):[],this.hits=this.query.kit?[]:bh(n,this.query,{limit:Qs})),this.render()}get results(){return{kit:!!this.query?.kit,ids:this.query?.kit?this.kit.map(t=>t.sound.id):this.hits.map(t=>t.sound.id),unknown:this.query?.unknown??[]}}async play(t){if(this.playing===t.id){this.host.stopPreview(),this.playing=null,this.render();return}this.playing=t.id,this.render();try{await this.host.preview(t)}finally{this.playing===t.id&&(this.playing=null,this.render())}}async load(t){if(!this.busy){this.busy=t.id,this.render();try{await this.host.load(t,this.input.value)}finally{this.busy=null,this.render()}}}async buildKit(){if(this.busy)return;this.source!=="local"&&!this.lib&&await this.ensure();const t=this.active();if(!t)return;const n=this.input.value,a=ni(n,t),i=uo(t,{...a,roles:[],kit:!0});if(!i.length){this.message="The Library has nothing for a kit yet.",this.render();return}this.busy="kit",this.render();try{await this.host.buildKit(i,n)}finally{this.busy=null,this.render()}}row(t,n){const a=this.playing===t.id,i=z("button",{type:"button",class:"nyx-lib-play","data-nyx-lib":"play","aria-label":`${a?"Stop":"Play"} ${t.title}`,"aria-pressed":String(a)},a?"■":"▶");I(i,q("library:play"),i),i.addEventListener("click",()=>void this.play(t));const o=this.busy===t.id,s=z("button",{type:"button",class:"nc-btn nyx-lib-load","data-nyx-lib":"load","aria-label":`Load ${t.title} onto ${this.host.target().title}`},o?"Loading…":"Load");this.busy&&(s.disabled=!0),I(s,q("library:load"),s),s.addEventListener("click",()=>void this.load(t));const l=jt(t.licenseUrl,Di(t.license,t.licenseStatus,t.permission),{class:"nyx-lib-badge","data-nyx-lib":"badge",title:t.origin==="local"?`${t.license}: ${va(t)}`:t.license});I(l,q("library:badge"));const c=zf[t.role]??t.role,u=n?n.slot.role===t.role?n.slot.label:`${n.slot.label} · ${c}`:c,d=z("span",{class:"nyx-lib-meta"},...t.origin==="local"?[z("span",{class:"nyx-lib-chip","data-nyx-lib":"local-chip"},"LOCAL")," "]:[],`${u} · ${Nf(t.measures.length)} · `,jt(t.creatorLink,t.creator,{class:"nyx-lib-creator"})),p=z("span",{class:"nyx-lib-name",title:t.title},t.title),f=z("span",{class:"nyx-lib-main"},p,d);n?.note&&f.append(z("span",{class:"nyx-lib-meta nyx-lib-warn"},n.note)),nl(t)&&f.append(z("span",{class:"nyx-lib-meta","data-nyx-lib":"personal"},t.license==="unknown"?"Licence unknown: personal use":`${t.license}, ${va(t)}`));const m=z("span",{class:"nyx-lib-wavebox"},Ff(t.wave));I(m,q("library:wave"));const w=z("li",{class:"nyx-lib-row","data-nyx-sound":t.id,"data-nyx-role":t.role},i,f,m,l,s);return a&&(w.dataset.nyxPlaying=""),w}renderCredits(){if(this.creditsBtn.setAttribute("aria-expanded",String(this.creditsOpen)),this.creditsEl.hidden=!this.creditsOpen,!this.creditsOpen)return;const t=this.host.pads(),n=il(t);if(!n.length){this.creditsEl.replaceChildren(z("p",{class:"nc-note"},"No Library sounds on the pads yet."));return}const a=$h(n),i=[];for(const o of a){const s=o.origin==="local";a.length>1&&i.push(z("p",{class:"nc-label","data-nyx-lib":`credits-${o.origin}`},s?"Your local Library":yt));const l=z("ul",{class:"nyx-lib-credit-list","data-nyx-origin":o.origin});for(const c of o.credits){const u=`On pad${c.pads.length>1?"s":""} ${c.pads.join(", ")}`;l.append(z("li",{class:"nyx-lib-credit","data-nyx-credit":c.id},z("span",{class:"nyx-lib-name"},c.title),z("span",{class:"nyx-lib-meta"},"by ",jt(c.creatorLink,c.creator)," · ",jt(c.licenseUrl,c.license),...s?[` (${va(c)})`]:[],...c.source?[" · ",jt(c.source,"source")]:s?[]:[" · source"],s?` · from ${Ri}`:` · via ${c.curator}`),z("span",{class:"nyx-lib-meta"},u)))}i.push(l)}this.creditsEl.replaceChildren(...i)}forText(){const t=this.host.target();return this.source==="local"?`Load goes on ${t.title}. Your local Library: it plays here and is never uploaded.`:this.source==="all"?`Load goes on ${t.title}. musicmatter.art and your local Library together.`:`Load goes on ${t.title}. Curated: every sound checked by a person.`}renderSources(){const t=this.host.local;if(!t){this.sourcesEl.hidden=!0;return}this.sourcesEl.hidden=!1;const n=t.state,a=(s,l,c="")=>{const u=z("button",{type:"button",class:"nc-btn","data-nyx-lib":`source-${s}`,...c?{title:c}:{},"aria-pressed":String(this.source===s),"data-on":String(this.source===s)},l);return I(u,q(`library:source-${s}`),u),u.addEventListener("click",()=>this.choose(s)),u},i=(s,l,c)=>{const u=z("button",{type:"button",class:"nc-btn","data-nyx-lib":s},l);return I(u,q(`library:${s}`),u),u.addEventListener("click",c),u},o=[a("shelf",yt)];if(n.status==="ready"&&o.push(a("local",yo,n.name),a("all","All")),n.status==="reconnect"){const s=i("reconnect",`Reconnect ${yo}`,()=>void t.reconnect());s.title=n.name,o.push(s)}else n.status!=="ready"&&o.push(i("open-folder",n.status==="opening"?"Opening…":"Open folder…",()=>this.openFolder()));(n.status==="ready"||n.status==="reconnect")&&o.push(i("forget","Forget",()=>void t.forget())),this.sourcesEl.replaceChildren(...o)}localStatus(){const t=this.host.local;if(!t)return null;const n=t.state;return n.status==="error"?{text:n.message,danger:!0}:this.source==="shelf"?null:n.status==="ready"&&!n.remembered&&!this.query?{text:`${n.lib.sounds.length} local sounds. This browser can't keep the folder: open it again next visit.`,danger:!1}:null}render(){this.renderSources(),this.forLine.textContent=this.forText();const t=[];if(this.query?.kit)for(const s of this.kit)t.push(this.row(s.sound,s));else for(const s of this.hits)t.push(this.row(s.sound));this.list.replaceChildren(...t);let n=this.message,a=!1;const i=this.active(),o=this.localStatus();!n&&o?(n=o.text,a=o.danger):!n&&this.source==="local"&&!i?n="Open your local Library: the folder the sample picker exported.":n||(this.failed&&!i?(n="The Library couldn't be reached. Check the connection, then ask again.",a=!0):i?this.busy==="kit"?n="Building the kit…":this.query?this.query.kit?n=this.kit.length?"A kit for pads 1–8: Build kit puts it on them and keeps the pattern.":"Nothing for a kit.":this.hits.length?n="":n="Nothing matches. Try a role (kick, snare, hat) and a word like dark or tight.":n=`${i.sounds.length} sounds. Try "punchy kick" or "funk kit".`:n="Opening the Library…",this.query?.unknown.length&&(n=`${n?`${n} `:""}Not in the Library's words: ${this.query.unknown.join(", ")}.`.trim())),this.status.textContent=n,this.status.hidden=!n,a?this.status.dataset.ncTone="danger":delete this.status.dataset.ncTone,this.kitBtn.textContent=this.busy==="kit"?"Building…":"Build kit",this.kitBtn.disabled=!!this.busy||!i,this.renderCredits()}refresh(){const t=this.host.target(),n=this.forText();if(this.forLine.textContent!==n){this.forLine.textContent=n;for(const a of this.list.querySelectorAll('[data-nyx-lib="load"]')){const i=a.closest("li")?.querySelector(".nyx-lib-name")?.textContent??"";a.setAttribute("aria-label",`Load ${i} onto ${t.title}`)}}this.creditsOpen&&this.renderCredits()}attach(t){if(!this.isOpen||!t){this.el.isConnected&&this.el.remove();return}if(t.nextElementSibling===this.el)return;const n=document.activeElement===this.input,{selectionStart:a,selectionEnd:i}=this.input;t.after(this.el),n&&(this.input.focus(),a!==null&&i!==null&&this.input.setSelectionRange(a,i))}}const Je="nyx-local-library.json";function xa(e){return{name:e.name,async read(t){const n=t.split("/"),a=n.pop();let i=e;for(const o of n)i=await i.getDirectoryHandle(o);return(await i.getFileHandle(a)).getFile()}}}function Df(e){const t=[...e].map(l=>({file:l,path:(l.webkitRelativePath||l.name).replace(/\\/g,"/")})),a=t.filter(l=>l.path===Je||l.path.endsWith(`/${Je}`)).sort((l,c)=>l.path.length-c.path.length)[0];if(!a)return null;const i=a.path.slice(0,a.path.length-Je.length),o=new Map;for(const l of t)l.path.startsWith(i)&&o.set(l.path.slice(i.length),l.file);return{name:i.replace(/\/$/,"").split("/").pop()||"Local Library",async read(l){const c=o.get(l);if(!c)throw new Error(`${l} isn't in the folder`);return c}}}function qf(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60)||"local"}async function Bf(e){let t;try{t=await(await e.read(Je)).text()}catch{throw new Error(`${e.name} has no ${Je}. Open the folder the sample picker exported.`)}let n;try{n=JSON.parse(t)}catch{throw new Error(`${Je} in ${e.name} isn't readable JSON.`)}if(n?.kind!=="nyx-local-library")throw new Error(`${e.name} isn't a NYX local Library.`);return el(n,qf(e.name))}async function Of(e){const t=new Uint8Array(await crypto.subtle.digest("SHA-256",e));return Array.from(t,n=>n.toString(16).padStart(2,"0")).join("")}async function Rf(e,t){const n=tl(t.audio);if(t.origin!=="local"||!n)throw new Error("it isn't a local sound");let a;try{a=await e.read(n)}catch{throw new Error(`${n} isn't in ${e.name} any more`)}const i=await a.arrayBuffer();if(await Of(i)!==t.sha256)throw new Error("the file isn't the one the local Library lists");return i}const If="nyx-local-library",si="handles",ka="folder";function jf(){return new Promise((e,t)=>{const n=indexedDB.open(If,1);n.onupgradeneeded=()=>n.result.createObjectStore(si),n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}function $a(e,t){return jf().then(n=>new Promise((a,i)=>{const o=t(n.transaction(si,e).objectStore(si));o.onsuccess=()=>a(o.result),o.onerror=()=>i(o.error)}).finally(()=>n.close()))}function Hf(){return typeof indexedDB>"u"?{get:async()=>null,set:async()=>{},clear:async()=>{}}:{get:()=>$a("readonly",e=>e.get(ka)).then(e=>e??null),set:e=>$a("readwrite",t=>t.put(e,ka)),clear:()=>$a("readwrite",e=>e.delete(ka))}}function _f(){const e=globalThis;return typeof e.showDirectoryPicker=="function"?e.showDirectoryPicker.bind(globalThis):null}class Uf{st={status:"none"};folder=null;handle=null;picker;handles;listeners=[];constructor(t={}){this.picker=t.picker===void 0?_f():t.picker,this.handles=t.handles??Hf()}get state(){return this.st}get lib(){return this.st.status==="ready"?this.st.lib:null}get canRemember(){return!!this.picker}onChange(t){this.listeners.push(t)}set(t){this.st=t;for(const n of this.listeners)n()}async load(t,n){this.set({status:"opening",name:t.name});try{const a=await Bf(t);return this.folder=t,this.set({status:"ready",name:t.name,lib:a,remembered:n}),!0}catch(a){return this.folder=null,this.set({status:"error",message:a.message}),!1}}async restore(){if(!this.picker)return;let t=null;try{t=await this.handles.get()}catch{return}if(!t)return;this.handle=t,(await t.queryPermission?.({mode:"read"}).catch(()=>"prompt")??"granted")==="granted"?await this.load(xa(t),!0):this.set({status:"reconnect",name:t.name})}async reconnect(){const t=this.handle;return t?(await t.requestPermission?.({mode:"read"}).catch(()=>"denied")??"granted")!=="granted"?(this.set({status:"reconnect",name:t.name}),!1):this.load(xa(t),!0):this.pick()}async pick(){if(!this.picker)return!1;let t;try{t=await this.picker({mode:"read",id:"nyx-local-library"})}catch(a){return a.name==="AbortError"||this.set({status:"error",message:`The folder couldn't be opened: ${a.message}`}),!1}const n=await this.load(xa(t),!0);return n&&(this.handle=t,await this.handles.set(t).catch(()=>{})),n}async openFiles(t){const n=Df(t);return n?this.load(n,!1):(this.set({status:"error",message:`That folder has no ${Je}. Open the folder the sample picker exported.`}),!1)}async forget(){this.folder=null,this.handle=null,await this.handles.clear().catch(()=>{}),this.set({status:"none"})}bytes(t){return this.folder?Rf(this.folder,t):Promise.reject(new Error("its local Library folder isn't open. Open or reconnect it"))}}const Ki={knee:.6,ceiling:.944,range:4,points:8193};function Wf(e,{knee:t,ceiling:n}=Ki){const a=Math.abs(e);if(a<=t)return e;const i=n-t;return Math.sign(e)*(t+i*Math.tanh((a-t)/i))}function Yf({range:e,points:t}=Ki){const n=new Float32Array(t);for(let a=0;a<t;a++)n[a]=Wf((2*a/(t-1)-1)*e);return n}function Gf(e){const t=e.createGain();t.gain.value=1/Ki.range;const n=e.createWaveShaper();return n.curve=Yf(),n.oversample="none",t.connect(n),{input:t,output:n}}const vo="nyx-picker-bridge",xo=1,Kf=3e3,Xf=64*1024*1024,Vf=new Set(["127.0.0.1","localhost","[::1]"]);function Qf(e){const t=new URLSearchParams(e).get("picker");if(!t)return null;let n;try{n=new URL(t)}catch{return null}return n.protocol!=="http:"||!Vf.has(n.hostname)||!n.port||n.username||n.password||t.replace(/\/$/,"")!==n.origin?null:n.origin}function Jf(e){const t=e&&typeof e=="object"&&!Array.isArray(e)?e:{};if(t.kind!=="nyx-picker-kit")throw new Error("not a picker kit");const n=Array.isArray(t.sounds)?t.sounds:[];if(!n.length)throw new Error("the kit is empty");if(n.length>Q)throw new Error(`more than ${Q} sounds`);const a=new Set,i=[];for(const l of n){const c=l&&typeof l=="object"?l:{},u=c.pad;if(typeof u!="number"||!Number.isInteger(u)||u<1||u>Q||a.has(u))throw new Error("a sound has no pad of its own");const d=el({sounds:[c]},"sample-picker").sounds[0];if(!d)throw new Error(`pad ${u}'s sound isn't complete`);a.add(u),i.push({pad:u-1,sound:d})}const o=typeof t.id=="string"?t.id.slice(0,80):"",s=typeof t.name=="string"&&t.name.trim()?t.name.trim().slice(0,80):"Sample picker";return{id:o,name:s,sounds:i}}function Zf(e,t,n){if(n==="replace"){const o=[];for(let s=0;s<Q;s++)e[s]&&o.push(s);return{to:[...t],replaced:o,clear:!0}}const a=new Set;for(let o=0;o<Q;o++)e[o]||a.add(o);const i=t.map(o=>a.delete(o)?o:-1);for(let o=0;o<i.length;o++){if(i[o]!==-1)continue;const s=[...a].sort((l,c)=>l-c)[0];if(s===void 0)break;a.delete(s),i[o]=s}return{to:i,replaced:[],clear:!1}}function li(e){const t=[...e].sort((n,a)=>n-a).map(n=>String(n+1));return t.length>1?`${t.slice(0,-1).join(", ")} and ${t[t.length-1]}`:t[0]??""}function em(e,t,n){const a=t.to.filter(u=>u>=0),i=t.to.length-a.length,o=a.length,s=`${o===1?"pad":"pads"} ${li(a)}`,l=[],c=t.clear&&t.replaced.length>0;if(c){l.push(`This clears all 16 pads in NYX and loads your picker kit onto ${s}; the other pads stay empty.`);const u=t.replaced.map(d=>`${d+1} (${n(d)})`).join(", ");l.push(`Gone: pad${t.replaced.length===1?"":"s"} ${u}. Undo brings all 16 back as they were.`)}else if(l.push(`From the sample picker on this computer, onto ${s}.`),t.replaced.length){const u=t.replaced.map(d=>`${d+1} (${n(d)})`).join(", ");l.push(`Replaces pad${t.replaced.length===1?"":"s"} ${u}. Undo brings ${t.replaced.length===1?"it":"them"} back.`)}return i&&l.push(`${i} won't fit: no empty pads left.`),e.sounds.some(u=>u.sound.licenseStatus==="personal")&&l.push("Some are for personal use only."),l.push("The pattern stays."),{title:c?"Replace everything in NYX?":`Load ${o} sound${o===1?"":"s"} from the picker?`,body:l.join(" ")}}async function tm(e){const t=new Uint8Array(await crypto.subtle.digest("SHA-256",e));return Array.from(t,n=>n.toString(16).padStart(2,"0")).join("")}async function nm(e,t,n,a){const i=p=>({ok:!1,placed:[],left:[],message:p}),o=Zf(a.filled(),e.sounds.map(p=>p.pad),t),s=e.sounds.flatMap((p,f)=>{const m=o.to[f]??-1;return m>=0?[{k:p,to:m}]:[]}),l=e.sounds.flatMap((p,f)=>(o.to[f]??-1)<0?[p.pad+1]:[]);if(!s.length)return{...i("Nothing loaded: NYX has no empty pads."),left:l};if(!await a.ask(em(e,o,a.padName)))return{...i("Not loaded: cancelled in NYX."),left:l};const c=[];try{for(const{k:p,to:f}of s){const m=n.get(p.pad+1);if(!m)throw new Error(`pad ${p.pad+1}'s audio is missing`);if(await tm(m)!==p.sound.sha256)throw new Error(`pad ${p.pad+1}'s audio isn't the file named`);const{data:w,rate:b}=await a.decode(p.sound,m);c.push({index:f,sound:p.sound,data:w,rate:b})}}catch(p){return{...i(`Not loaded: ${p.message}. NYX's pads are as they were.`),left:l}}await a.place(c,o.clear);const u=s.map(({k:p,to:f})=>({from:p.pad+1,to:f+1})),d=l.length?` ${l.length} didn't fit (no empty pads).`:"";return{ok:!0,placed:u,left:l,message:o.clear&&o.replaced.length?`Replaced everything in NYX: pad${u.length===1?"":"s"} ${li(s.map(p=>p.to))} loaded, the others empty.`:`Loaded onto NYX pad${u.length===1?"":"s"} ${li(s.map(p=>p.to))}.${d}`}}function am(e){return Object.prototype.toString.call(e)==="[object ArrayBuffer]"}function $l(e,t){const n=Jf(e),a=t&&typeof t=="object"?t:{},i=new Map;for(const{pad:o}of n.sounds){const s=a[String(o+1)];if(!am(s)||s.byteLength>Xf)throw new Error(`pad ${o+1}'s audio is missing or too big`);i.set(o+1,s instanceof ArrayBuffer?s:new Uint8Array(s).slice().buffer)}return{kit:n,audio:i}}class im{constructor(t){this.o=t}last="";busy=!1;start(){return this.o.self.addEventListener("message",t=>void this.onMessage(t)),this.o.self.setInterval(()=>this.update(!0),Kf),this.update(!0),this}update(t=!1){const n=this.o.pads(),a=JSON.stringify(n);!t&&a===this.last||(this.last=a,this.post({type:"state",pads:n,busy:this.busy}))}post(t){try{this.o.picker.postMessage({nyx:vo,v:xo,...t},this.o.origin)}catch{}}async onMessage(t){if(t.origin!==this.o.origin||t.source!==this.o.picker)return;const n=t.data;if(!n||typeof n!="object"||n.nyx!==vo||n.v!==xo)return;if(n.type==="hello")return this.update(!0);if(n.type!=="kit")return;const a=typeof n.id=="string"?n.id.slice(0,80):"",i=c=>this.post({type:"result",id:a,...c});if(this.busy)return i({ok:!1,placed:[],left:[],message:"NYX is still loading the last kit."});let o,s;try{({kit:o,audio:s}=$l(n.kit,n.audio))}catch(c){return i({ok:!1,placed:[],left:[],message:`Not loaded: ${c.message}.`})}const l=n.mode==="fill"?"fill":"replace";this.busy=!0;try{i(await this.o.receive(o,l,s))}catch(c){i({ok:!1,placed:[],left:[],message:`Not loaded: ${c.message}.`})}finally{this.busy=!1,this.update(!0)}}}function rm(e,t){const n=Qf(e.location.search),a=e.opener;return!n||!a||e.parent!==e?null:new im({self:e,picker:a,origin:n,...t}).start()}function om(e){let t=!1;return{pads:()=>e.pads(),async receive(n,a,i){const o=c=>({ok:!1,placed:[],left:[],message:c});if(t)return o("NYX is still loading the last kit.");let s,l;try{({kit:s,audio:l}=$l(JSON.parse(JSON.stringify(n??null)),i))}catch(c){return o(`Not loaded: ${c.message}.`)}t=!0;try{return await e.receive(s,a==="fill"?"fill":"replace",l)}catch(c){return o(`Not loaded: ${c.message}.`)}finally{t=!1}}}}const sm="nyx",lm=1;function El(e){const t={nyx:1,..._i(e)},n=il(e.pads);if(n.length&&(t.credits=n),Array.isArray(e.slots)){const a=Array.from({length:Et},(o,s)=>{const l=e.slots?.[s];return l?qh(l):null}),i=typeof e.active=="number"&&a[e.active]?e.active:null;Object.assign(t,{slots:a,active:i})}return t}function Al(e){return Sl(e),jn(e)}function cm(e){Sl(e);const t=e;if(!Array.isArray(t.slots))return null;const n=t.slots,a=Array.from({length:Et},(s,l)=>{const c=n[l];return c&&typeof c=="object"&&!Array.isArray(c)?jn(c):null}),i=t.active,o=typeof i=="number"&&Number.isInteger(i)&&i>=0&&i<Et&&a[i]?i:null;return{slots:a,active:o}}function Sl(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Not a NYX pattern.");const t=e.nyx;if(t!==1)throw new Error(`Not a NYX pattern${typeof t=="number"?` (version ${t})`:""}.`)}function Xi(){try{return globalThis.localStorage??null}catch{return null}}function dm(e,t,n=Xi()){let a;try{a=t?.storageKey?.(e)}catch{a=void 0}if(typeof a!="string"||!a||a===e)return e;try{if(n&&n.getItem(a)===null){const i=n.getItem(e);i!==null&&n.setItem(a,i)}}catch{}return a}const um="nyx.state",Ml="nyx.scene-samples",pm=/^[0-9a-f]{16,64}$/;function Ll(e){try{const t=JSON.parse(e?.getItem(Ml)??"[]");return Array.isArray(t)?t.filter(n=>typeof n=="string"&&pm.test(n)):[]}catch{return[]}}function hm(e,t=Xi()){if(!t)return;const n=new Set;for(const i of[e,...e.slots??[]])for(const o of i?.pads??[])o.sample&&n.add(o.sample);if(!n.size)return;const a=[...Ll(t).filter(i=>!n.has(i)),...n].slice(-2048);try{t.setItem(Ml,JSON.stringify(a))}catch{}}function fm(e,t=Xi()){const n=an(e);if(!t)return n;try{for(let a=0;a<t.length;a++){const i=t.key(a);if(i?.startsWith(um))try{for(const o of an(ll(JSON.parse(t.getItem(i)??"null"))))n.add(o)}catch{}}}catch{return null}for(const a of Ll(t))n.add(a);return n}const mm="NYX Sampler",St="nyx",ue=ta(),J=Sf(St,ue),Tl=dm(Ef("nyx.state",ue),J),Vi=.15,x=Bh(Tl),ee=new lf(ue>1?`nyx-${ue}`:"nyx"),na=()=>Oh(Tl,x),Ge=()=>{const e=fm(x);if(e)for(const t of de?.before??[])t.pad.sample&&e.add(t.pad.sample);if(e)for(const t of Ji)e.add(t);e&&ee.prune(e)};let le=!1,Ye=0,ce=null,Mt=!1,Qe="",N="";const Lt=new Map;let Cl=[],pn=new Map;const Ce=new gc({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let F=null,Jt=null;const gm=new Mc({...Mf(),app:Af(mm,ue),version:"0.1.0",clock:Ce,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const e=F?.state;return e==="running"?"running":e==="suspended"?"suspended":e?"none":"needs-gesture"},startGate:()=>Jt?.whenSettled?.()??null}),sn=e=>e+(Jt?.offset??0),B=()=>Ce.transport,Tt=()=>B().isPlayingAt(te()),ln=()=>Tt()&&!le;let Ea=null,K=null,xe=null,Ct=null,ko=null;const $o=new Set;function oe(){return ko??=(async()=>{J?(F=J.ctx,Ea=J.output,Jt=J.mapper??new gr(J.ctx)):(F=new AudioContext({latencyHint:"interactive"}),Ea=F.destination,Jt=new gr(F)),Jt.start();try{await F.audioWorklet.addModule(nf)}catch{return N="Audio could not start (the sampler's worklet did not load). Reload to try again.",L(),!1}K=new AudioWorkletNode(F,"nyx-sampler",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]}),K.port.onmessage=t=>bm(t.data),xe=dd(F,{moduleUrl:Lf()??hd,bpm:B().bpm,slots:3,state:oi(x.hacks)}),ci=oi(x.hacks),Ct=new GainNode(F,{gain:x.master}),K.connect(xe.input);const e=Gf(F);xe.output.connect(Ct).connect(e.input),e.output.connect(Ea),pd(xe,Ce,{toAudioTime:sn,now:te});for(const t of an(x))await Nt(t);return it(),zt(),!0})(),ko}async function Nt(e){const t=await ee.get(e);return t?(Lt.has(e)||Lt.set(e,wl(t.data)),K&&!$o.has(e)&&($o.add(e),K.port.postMessage({type:"sample",hash:e,channels:t.data.map(n=>n.slice()),rate:t.sampleRate})),t):null}function bm(e){e.type!=="pos"||!e.voices||(Cl=e.voices,pn=new Map(e.voices.map(([t,n,a,i])=>{const o=gf(i)?Fe.cache.byId(i):void 0,s=o?ee.info(o.job.sample):void 0;return o&&s?[t,(o.job.from+n/o.frames*(o.job.to-o.job.from))/s.frames]:[t,n/Math.max(1,a)]})))}let Cn=null,ym=0;const Wt=new Map,Fl=[],wm=.25;function vm(){if(Cn)return Cn;const e=new Worker(new URL("/nyx/assets/stretch-worker-DVLOsvIo.js",import.meta.url),{type:"module"});return e.onmessage=t=>{const n=t.data;Wt.get(n.id)?.(n),Wt.delete(n.id)},e.onerror=t=>{console.error("NYX stretch worker",t.message);for(const n of Wt.values())n({error:t.message||"worker failed"});Wt.clear()},Cn=e,e}async function xm(e){const t=await ee.get(e.sample);if(!t)return null;const n=Math.ceil(wm*e.sampleRate),a=Math.max(0,e.from-n),i=Math.min(t.frames,e.to+n),o=t.data.map(c=>c.slice(a,i)),s=++ym,l=vm();return new Promise(c=>{Wt.set(s,u=>{if(u.error||!u.channels){console.error("NYX stretch",u.error),c(null);return}typeof u.ms=="number"&&Fl.push(Math.round(u.ms)),c(u.channels)}),l.postMessage({id:s,channels:o,sampleRate:e.sampleRate,from:e.from-a,to:e.to-a,frames:e.frames,semitones:e.semitones},o.map(u=>u.buffer))})}const Fe=new yf({run:xm,deliver(e,t){K?.port.postMessage({type:"sample",hash:e.sample,channels:t,rate:e.job.sampleRate},t.map(n=>n.buffer))},drop(e){K?.port.postMessage({type:"drop",hash:e.sample})},changed(){Fe.failed&&!N&&(N="Keep pitch couldn't start in this browser: fitted pads change speed and pitch instead."),it(),L()}});function it(){if(!K)return;const e=B().bpm,t=n=>ee.info(n);Fe.plan(x.pads,t,e),K.port.postMessage({type:"program",program:tf(x,t,e,n=>Fe.stretchedFor(n))})}let Eo="";function zt(e=!1){if(!K)return;const t=B(),n=ln();let a=0,i=t.bpm;if(t.running){const s=Math.max(0,t.beatAt(te())),l=t.timeAt(s);i=60/(t.timeAt(s+1)-l),a=sn(l)-s*60/i}const o=JSON.stringify([n,Math.round(a*2e3),i,Ye]);!e&&o===Eo||(Eo=o,K.port.postMessage({type:"clock",clock:{playing:n,zero:a,bpm:i,join:Ye}}))}let ci=null;function Nl(){if(!xe)return;const e=oi(x.hacks),t=Hh(ci,e);if(ci=e,t.whole)xe.setState(e);else for(const[n,a,i]of t.params)xe.setParam(n,a,i)}let Zt=null;function km(){if(Zt){const t=Zt;X(()=>{x.lanes=t}),N="Pattern back.",L();return}const e=structuredClone(x.lanes);e.some(t=>t.steps.some(n=>n.on)||t.mute||t.solo||t.length!==me)&&(X(()=>{x.lanes=x.lanes.map(()=>ea())}),ce=null,Zt=e,N="Pattern cleared: press Undo to bring it back.",L())}function X(e){Zt=null;const t=er(!1);e(),t&&Ge(),x.active!==null&&(Mt=!0),Qe="",na(),it(),Nl(),L()}const R=e=>x.pads[e]??ye(e),Se=e=>x.lanes[e]??ea(),zl=()=>R(x.selected);function aa(e,t=x.selected){X(()=>e(R(t)))}function Hn(e,t,n){X(()=>{const a=Se(e).steps[t];a&&n(a)})}function Le(e,t=!0){x.selected=Math.max(0,Math.min(Q-1,e)),ce&&ce.lane!==x.selected&&(ce=null),na(),t&&Re(x.selected),L()}async function Re(e,t=null,n=!1){if(!await oe()||!F||!K)return;F.state!=="running"&&await F.resume().catch(()=>{});const a=R(e),i=a.sample?ef(a,ee.info(a.sample),B().bpm,t,Fe.stretchedFor(e)):null;i&&K.port.postMessage({type:"play",pad:e,hit:i,hold:n})}async function rt(e,t,n,a,i=!0,o=null){const{sample:s,saved:l}=await ee.put(t,n);await Nt(s.hash),X(()=>{const c=R(e);c.sample=s.hash,c.provenance=o,c.name=a.slice(0,24)||`Pad ${e+1}`,c.start=0,c.end=1,c.slices=0,c.cuts=[],c.fit=0,c.keepPitch=!0}),N=l?"":"Kept until you reload: this browser has no file storage here.",Ge(),i&&Re(e)}async function Qi(e,t=x.selected){if(/\.json$/i.test(e.name)||e.type==="application/json"){await qm(e);return}if(!await oe()||!F)return;let n;try{n=await F.decodeAudioData(await e.arrayBuffer())}catch{N=`Couldn't read ${e.name}: not an audio file this browser can decode.`,L();return}const{data:a,trimmed:i}=yl(n);await rt(t,a,n.sampleRate,e.name.replace(/\.[^.]+$/,"")),i&&(N=`${e.name} was cut to its first minute.`,L())}const Ji=new Set;let de=null;function nt(e,t=R(e).name){const n=`Pad ${e+1}`;return t===n?n:`${n} (${t})`}async function Zi(e,t,n=""){return R(e).sample?bi({title:`Replace ${nt(e)}?`,body:t==="Grab"?"Grab replaces its sound, its slices and that lane's steps. Undo brings them back.":t==="Sent"?`${n} replaces its sound, its slices and that lane's steps. Undo brings them back.`:"The take replaces its sound, its slices and that lane's steps when it lands. Undo brings them back.",confirmLabel:"Replace",cancelLabel:"Cancel"}):!0}function at(e){const t=ji(x,e);return t.pad.sample&&Ji.add(t.pad.sample),t}function Pt(e,t,n){er();const a=Array.isArray(e)?e:[e],i=a[0],o=jp({message:n??(i?.pad.sample?`${t}: replaced ${nt(i.index,i.pad.name)}.`:`${t} onto Pad ${(i?.index??0)+1}.`),actionLabel:"Undo",onAction:()=>void tr(),onClose:()=>{de&&(de.toast=null)}}),s=o.el.querySelector("button");s instanceof HTMLElement&&I(s,q("grab-undo"),s),de={before:a,what:t,toast:o};for(const l of a)l.pad.sample&&Ji.delete(l.pad.sample)}function er(e=!0){if(!de)return!1;const t=de;return de=null,t.toast?.close(),e&&Ge(),!0}async function tr(){const e=de;if(!e)return!1;de=null,e.toast?.close();for(const n of e.before)n.pad.sample&&await Nt(n.pad.sample);X(()=>{for(const n of e.before)Th(x,n)}),ce&&e.before.some(n=>n.index===ce?.lane)&&(ce=null);const t=e.before[0];return N=e.before.length===1&&t?`Undone: ${nt(t.index)} is back as it was.`:`Undone: pads ${e.before.map(n=>n.index+1).join(", ")} are back as they were.`,Ge(),L(),!0}let Aa=null;function Pl(){return Aa??=fetch(ih,{mode:"cors"}).then(e=>{if(!e.ok)throw new Error(`Library: HTTP ${e.status}`);return e.json()}).then(e=>sh(e)).catch(e=>{throw Aa=null,e}),Aa}const ia=new Uf;ia.restore();const Dl=e=>`${e.id}#${e.sha256}`,Ht=new Map;function $m(e){const t=Dl(e);let n=Ht.get(t);return!n&&e.origin==="local"&&(n=ia.bytes(e),n.catch(()=>Ht.delete(t)),Ht.set(t,n)),n||(n=(async()=>{const a=await fetch(e.audio,{mode:"cors"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const i=await a.arrayBuffer(),o=new Uint8Array(await crypto.subtle.digest("SHA-256",i));if(Array.from(o,l=>l.toString(16).padStart(2,"0")).join("")!==e.sha256)throw new Error("the file isn't the one the Library lists");return i})(),n.catch(()=>Ht.delete(t)),Ht.set(t,n)),n}const Sa=new Map;async function ql(e){if(!await oe()||!F)throw new Error("NYX's audio didn't start");const t=F,n=Dl(e);let a=Sa.get(n);return a||(a=$m(e).then(i=>t.decodeAudioData(i.slice(0))),a.catch(()=>Sa.delete(n)),Sa.set(n,a)),a}const Bl=e=>10**(e/20);async function Ol(e){return Rl(await ql(e),e)}function Rl(e,t){const{data:n}=yl(e),a=Bl(t.measures.gain);for(const i of n)for(let o=0;o<i.length;o++)i[o]=(i[o]??0)*a;return{data:n,rate:e.sampleRate}}let wt=null;function Il(){const e=wt;wt=null;try{e?.src.stop()}catch{}}async function jl(e){Il();let t;try{t=await ql(e)}catch(o){nr(`Couldn't play ${e.title}: ${o.message}.`);return}if(!F||!Ct)return;F.state!=="running"&&await F.resume().catch(()=>{});const n=new AudioBufferSourceNode(F,{buffer:t}),a=new GainNode(F,{gain:Bl(e.measures.gain)*ye(0).level});n.connect(a).connect(Ct);const i={src:n,id:e.id};wt=i,await new Promise(o=>{n.onended=()=>{a.disconnect(),wt===i&&(wt=null),o()},n.start()})}function nr(e){N=e,L()}async function ar(e,t,n=x.selected){let a;try{a=await Ol(e)}catch(o){return nr(`Couldn't load ${e.title}: ${o.message}.`),!1}const i=at(n);return await rt(n,a.data,a.rate,Jn(e.title),!0,Ii(e,t)),N=`${e.title} on Pad ${n+1}: ${e.creator}, ${Di(e.license,e.licenseStatus,e.permission)}${nl(e)?" (personal use)":""}.`,Pt(i,"Library"),L(),!0}async function Em(e,t){if(!await oe())return!1;const n=await Promise.all(e.map(l=>Ol(l.sound).then(c=>({ok:!0,...c}),c=>({ok:!1,error:`${l.sound.title}: ${c.message}`})))),a=n.flatMap(l=>l.ok?[]:[l.error]);if(a.length)return nr(`The kit couldn't load (${a.join("; ")}). The pads are as they were.`),!1;const i=[];for(const l of n){if(!l.ok)continue;const c=await ee.put(l.data,l.rate);await Nt(c.sample.hash),i.push(c)}for(let l=0;l<e.length;l++)at(l);let o=[];X(()=>{o=Hi(x,e.map((l,c)=>({sample:i[c]?.sample.hash??"",name:Jn(l.sound.title),provenance:Ii(l.sound,t),hat:l.slot.role==="hat"})))});const s=e.flatMap(l=>l.note?[l.note]:[]);return N=`Kit on pads 1–${e.length}${t.trim()?` for "${t.trim()}"`:""}; the pattern stays.${s.length?` ${s.join(" ")}`:""}${i.some(l=>!l.saved)?" Kept until you reload: this browser has no file storage here.":""}`,Pt(o,"Build kit",`Build kit: pads 1–${e.length} replaced.`),Ge(),L(),!0}async function Am(e,t){const n=[];for(const c of e){const u=await ee.put(c.data,c.rate);await Nt(u.sample.hash),n.push(u)}if(t)for(let c=0;c<Q;c++)at(c);else for(const c of e)at(c.index);const a=e.map((c,u)=>({index:c.index,sample:n[u]?.sample.hash??"",name:Jn(c.sound.title),provenance:Ii(c.sound,""),hat:!1}));let i=[];X(()=>{i=t?Ch(x,a):Hi(x,a)});const o=e.map(c=>c.index+1).join(", "),s=t&&i.some(c=>c.pad.sample),l=n.some(c=>!c.saved)?" Kept until you reload: this browser has no file storage here.":"";N=s?`From the sample picker: everything replaced, pad${e.length===1?"":"s"} ${o} loaded; the pattern stays.${l}`:`From the sample picker: pad${e.length===1?"":"s"} ${o}; the pattern stays.${l}`,Pt(i,"Sample picker",s?"Sample picker: replaced everything in NYX.":`Sample picker: pad${e.length===1?"":"s"} ${o} loaded.`),Ge(),L()}const Hl={pads:()=>x.pads.map((e,t)=>({pad:t+1,name:e.name,filled:!!e.sample})),receive:(e,t,n)=>nm(e,t,n,{filled:()=>Array.from({length:Q},(a,i)=>!!x.pads[i]?.sample),padName:a=>R(a).name,ask:a=>(J?.reveal?.(),bi({...a,confirmLabel:"Load",cancelLabel:"Cancel"})),decode:async(a,i)=>{if(!await oe()||!F)throw new Error("NYX's audio didn't start");return Rl(await F.decodeAudioData(i),a)},place:Am})},Sm=J?null:rm(window,Hl),Mm=J?.pickerTarget?.(om(Hl))??null;function ir(e){const t=R(e).provenance,n=t?fe.catalogFor(t.origin):null;if(!t||!n)return[];const a=new Set(x.pads.flatMap((i,o)=>o!==e&&i.provenance?[i.provenance.id]:[]));return kh(n,t,a).map(i=>i.sound)}const fe=new Pf({catalog:Pl,target:()=>({index:x.selected,title:nt(x.selected)}),pads:()=>x.pads,preview:jl,stopPreview:Il,load:(e,t)=>ar(e,t),buildKit:Em,close:()=>Ft(!1),local:ia});function Ft(e=!fe.isOpen,t){e?fe.open(t):fe.closePanel(),L(),e&&fe.focus()}const j={from:"master",bars:1,busy:!1};async function rr(){const e=We();if(!e||j.busy||!await oe()||!F)return;const t=B();if(!t.running){N="Play first: Grab takes the bars that just played.",L();return}const n=j.bars,a=Math.floor(t.beatAt(te())/4)*4,i=a-4*n;if(i<0){N=`Grab needs ${n} whole bar${n===1?"":"s"} played first.`,L();return}const o=F.sampleRate,{from:s,to:l}=xf({from:Math.round(sn(t.timeAt(i))*o),to:Math.round(sn(t.timeAt(a))*o)},kl(e,j.from)),c=x.selected;if(j.busy=!0,L(),!await Zi(c,"Grab")){j.busy=!1,L();return}const u=e.takeResult?await e.takeResult(j.from,s,l):{channels:await e.take(j.from,s,l)},d=u.channels;j.busy=!1;const p=e.sources().find(w=>w.id===j.from)?.name??j.from;if(!d){N="reason"in u&&u.reason==="gone"?`Those bars of ${p} are gone (the Studio keeps the last 20 seconds): Grab again.`:`${p} isn't kept that far back yet: let it play ${n} more bar${n===1?"":"s"}, then Grab again.`,L();return}let f=0;for(const w of d)for(const b of w)f=Math.max(f,Math.abs(b));if(f<1e-4){N=`${p} was silent for those ${n===1?"bar":"bars"}.`,L();return}const m=at(c);await rt(c,d,o,`${p} grab`),n===1?(X(()=>{const w=R(c);w.fit=1,w.keepPitch=!0,w.slices=16,w.cuts=[],w.decay=4;const b=Se(c);b.length=me;for(const h of b.steps)Object.assign(h,Zn(),{on:!0})}),N=`Grabbed a bar of ${p}: 16 slices, every step on. Move, mute or lock steps to remix it.`):(aa(w=>{w.fit=n,w.keepPitch=!0},c),await di(8,"transients",c),N=`Grabbed ${n} bars of ${p}, fitted to ${n} bars and sliced at the hits.`),Pt(m,`Grabbed ${n===1?"a bar":`${n} bars`}`),L()}const Ao=240,Lm=.25,S={phase:"idle",startBeat:0,pad:0,source:"master",rec:null,timer:0,lastBar:0,lastBarFrame:0,fromFrame:0,latency:0,bpm:120,warned:!1,label:""};function or(e){const t=Math.floor(e/4)*4;return e-t<Lm?t:t+4}function Tm(e){const t=F?.sampleRate??48e3;return Math.round(sn(B().timeAt(e))*t)}function _l(e){const t=F?.sampleRate??48e3;return S.fromFrame+Math.round((e-S.startBeat)*60/S.bpm*t)}function _n(e=S.source){return We()?.sources().find(t=>t.id===e)?.name??e}function sr(){S.phase==="idle"?Cm():S.phase==="armed"?(S.phase="idle",N="",L()):S.phase==="rec"&&lr()}async function Cm(){const e=We();if(!e?.record){N="Take needs the Studio (reload it to update).",L();return}if(!await oe()||!F)return;const t=x.selected;if(await Zi(t,"Take")&&S.phase==="idle"){if(S.source=j.from,S.pad=t,e.listen(S.source),!B().running){S.phase="armed",N="Take armed: starts with the music.",L();return}Ul()}}function Ul(){const e=We();if(!e?.record||!F){S.phase="idle";return}const t=B();S.startBeat=Math.max(0,or(t.beatAt(te()))),S.fromFrame=Tm(S.startBeat),S.bpm=t.bpm,S.latency=kl(e,S.source);const n=e.record(S.source,S.fromFrame+S.latency);if(!n){S.phase="idle",N=`${_n()} can't be recorded.`,L();return}S.rec=n,S.phase="rec",S.warned=!1,S.lastBar=S.startBeat,S.lastBarFrame=S.fromFrame,N=`Taking ${_n()}: stop on any bar.`,window.clearInterval(S.timer),S.timer=window.setInterval(Fm,200),L()}function Fm(){if(S.phase!=="rec")return;const e=B();if(!e.running)return;const t=e.beatAt(te()),n=Math.floor(t/4)*4;n>S.lastBar&&(S.lastBar=n,S.lastBarFrame=_l(n));const a=240/Math.max(1,e.bpm),i=(Math.max(S.startBeat+4,or(t))-S.startBeat)*60/Math.max(1,e.bpm);if(i+a>Ao){lr();return}!S.warned&&i>Ao-30&&(S.warned=!0,N="Take stops at four minutes: about 30 seconds left.");const o=Wl();o!==S.label&&(S.label=o,L())}function Wl(){if(S.phase==="armed")return"Armed: waits for Play";if(S.phase==="saving")return"Saving take…";if(S.phase!=="rec")return"Take";const e=B().beatAt(te());return e<S.startBeat?"Starts on the bar…":`Stop take · bar ${Math.floor((e-S.startBeat)/4)+1}`}async function lr(e=!1){const t=S.rec;if(S.phase!=="rec"||!t)return;window.clearInterval(S.timer);let n,a;e?(n=S.lastBar,a=S.lastBarFrame):(n=Math.max(S.startBeat+4,or(B().beatAt(te()))),a=_l(n));const i=Math.round((n-S.startBeat)/4);if(S.rec=null,i<1){t.cancel(),S.phase="idle",N="The music stopped before a whole bar was taken.",L();return}S.phase="saving",L();try{await Nm(t,a,i,n)}finally{S.phase="idle",L()}}async function Nm(e,t,n,a){let i=null;try{i=await e.stop(t+S.latency)}catch(l){console.error("NYX take",l)}const o=_n();if(!i?.[0]?.length){N=`The take from ${o} came back empty.`,L();return}let s=0;for(const l of i)for(const c of l)s=Math.max(s,Math.abs(c));if(s<1e-4){N=`${o} was silent for the whole take.`,L();return}try{await zm(i,n,a,o)}catch(l){console.error("NYX take",l),N=`The take from ${o} couldn't be kept (${l instanceof Error?l.message:String(l)}).`,L()}}async function zm(e,t,n,a){const i=S.pad,o=`${a} take`.slice(0,20),s=x.pads.filter(u=>u.name.startsWith(o)).length+1,l=at(i);await Yl(i,e,F?.sampleRate??48e3,t,Math.round(S.startBeat/4),{name:`${o} ${s}`,endBeat:n}),Pt(l,`Took ${t===1?"a bar":`${t} bars`}`),N=t<=nn?`${t} bar${t===1?"":"s"} of ${a} on ${R(i).name}: it loops every ${t===1?"bar":`${t} bars`}. Tap the pad to play it any time.`:`${t} bars of ${a} on ${R(i).name}. Longer than ${nn} bars, so it plays from the pad (tap or hold it), not the grid.`,L()}async function Yl(e,t,n,a,i,o){await rt(e,t,n,o.name,!1);const s=a<=nn;X(()=>Fh(x,e,a,i));const l=B(),c=o.endBeat;if(c!==void 0&&s&&l.running&&K&&F){const u=R(e),d=Se(e).steps[0],p=d?Gi(u,0,d,ee.info(u.sample??""),l.bpm,!1,Fe.stretchedFor(e)):null,m=l.beatAt(te()+Vi)-c;if(p&&m>0&&m<4*a){const w=Math.round(m*60/l.bpm*n*p.rate);p.from+w<p.to-1&&K.port.postMessage({type:"play",pad:e,hit:{...p,from:p.from+w,attack:.005}})}}}let Ma=!1;function Gl(){return x.pads.map((e,t)=>({id:String(t+1),name:nt(t),...e.sample?{filled:!0}:{}}))}async function Kl(e,t){const n=Nh(t,x.pads.length);if(n<0)return{ok:!1,reason:"refused",message:`NYX has no pad ${t}.`};if(Ma||S.phase!=="idle"&&S.pad===n)return{ok:!1,reason:"busy",message:`Pad ${n+1} is busy: try again in a moment.`};if(!await oe()||!F)return{ok:!1,reason:"refused",message:"NYX's audio didn't start."};Ma=!0;try{const a=`${e.fromName}'s ${e.name}`;if(Le(n,!1),J?.reveal?.(),L(),R(n).sample&&!await Zi(n,"Sent",a))return N=`Kept ${nt(n)}: ${a} was not placed.`,L(),{ok:!1,reason:"cancelled"};const i=e.channels.map(c=>new Float32Array(c)),o=e.bars,s=at(n),l=e.name.slice(0,24);return o!==void 0&&Number.isInteger(o)&&o>=1?(await Yl(n,i,e.sampleRate,o,0,{name:l}),N=o<=nn?`${a} on Pad ${n+1}: fitted to ${o===1?"a bar":`${o} bars`}, it loops every ${o===1?"bar":`${o} bars`}.`:`${a} on Pad ${n+1}: ${o} bars, so it plays from the pad, not the grid.`):(await rt(n,i,e.sampleRate,l,!1),N=`${a} on Pad ${n+1}.`),Pt(s,a),L(),{ok:!0,target:t,targetName:nt(n)}}finally{Ma=!1}}async function Pm(e){const t=await df(e);if(!t){N=`LUCY take ${e.id} could not be read.`,L();return}await rt(x.selected,t,e.sampleRate,`LUCY take ${e.id}`)}async function Xl(){const e=x.selected,t=R(e);!t.sample||!await bi({title:`Clear ${t.name}?`,body:"Its sample and settings go; its steps stay.",confirmLabel:"Clear"})||(X(()=>{x.pads[e]=ye(e)}),Ge())}async function di(e,t,n=x.selected){const a=R(n);let i=[];if(e&&t==="transients"&&a.sample){const o=await ee.get(a.sample);o&&(i=cf(o.data,o.sampleRate,Math.floor(a.start*o.frames),Math.ceil(a.end*o.frames),e))}aa(o=>{o.slices=e,o.cuts=i},n)}function Vl(e,t){const n=rl[e]??String(e+1);if(er(),t==="store")x.slots[e]=_i(x),x.active=e,Mt=!1,Qe=`Stored in ${n}`;else if(t==="clear")x.slots[e]=null,x.active===e&&(x.active=null),Qe=`Cleared ${n}`,Ge();else{const a=x.slots[e];if(!a){Qe=`${n} is empty: Shift-click or long-press to store`,L();return}Ql(a),x.active=e,Mt=!1,Qe=`Recalled ${n}`}na(),it(),Nl(),L()}function Ql(e){const t=structuredClone(e);x.pads=t.pads,x.lanes=t.lanes,x.swing=t.swing,x.hacks=t.hacks,ce=null;for(const n of an(x))Nt(n).then(()=>it())}async function Jl(){if(await oe(),F&&F.state!=="running"&&await F.resume().catch(()=>{}),J&&Tt()){if(le=!le,!le){const e=B();Ye=e.nextBar(e.beatAt(te()+Vi))}zt(!0),L(),le&&At()?.out?.(on(St,ue));return}Tt()?Ce.stop({at:te()}):(le=!1,Ye=0,J&&At()?.claim(on(St,ue)),Ce.play({at:te()}))}let So=B().running;Ce.onChange(()=>{B().running&&!So&&J&&(le=!Tf(St,ue)),So=B().running,B().running&&S.phase==="armed"&&Ul(),!B().running&&S.phase==="rec"&&lr(!0),B().running||(le=!1,Ye=0),it(),zt(!0),L()});At()?.member?.(on(St,ue),()=>B().running&&!le);At()?.onAll(()=>{if(le){if(le=!1,Tt()){const e=B();Ye=e.nextBar(e.beatAt(te()+Vi))}zt(!0),L()}});function Dm(){const e=El(x),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=`nyx${ue>1?`-${ue}`:""}-pattern-${new Date().toISOString().slice(0,10)}.json`,n.hidden=!0,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e4)}async function qm(e){let t;try{t=JSON.parse(await e.text()),Al(t)}catch{N=`Couldn't read ${e.name}: not a NYX pattern.`,L();return}await Zl(t,`Loaded ${e.name}.`)}async function Zl(e,t){const n=Al(e),a=cm(e);X(()=>{a&&(x.slots=a.slots,x.active=a.active),Ql(n)}),a&&(Mt=x.active!==null&&JSON.stringify(_i(x))!==JSON.stringify(x.slots[x.active])),Qe="";const i=[],o=new Set;for(const l of x.pads)l.sample&&!await ee.get(l.sample)&&i.push(l.name);for(const l of x.slots)for(const c of l?.pads??[])c.sample&&!x.pads.some(u=>u.sample===c.sample)&&o.add(c.sample);let s=0;for(const l of o)await ee.get(l)||s++;N=i.length?`Loaded. ${i.length===1?"One pad needs its":`${i.length} pads need their`} sample again (${i.join(", ")}): samples stay in the browser they were loaded in.`:s?`${t} ${s===1?"One sample":`${s} samples`} in the slots ${s===1?"isn't":"aren't"} in this browser: samples stay in the browser they were loaded in.`:t,it(),L()}function Bm(){K?.port.postMessage({type:"stop"}),Tt()&&(J?(le=!0,At()?.out?.(on(St,ue))):Ce.stop({at:te()})),zt(!0),xe?.clear({fadeMs:20}),L()}function Om(e){x.master=Math.min(1,Math.max(0,e)),na(),Ct&&F&&Ct.gain.setTargetAtTime(x.master,F.currentTime,.01),cn.value=String(x.master),cr.textContent=`${Math.round(x.master*100)}%`}const G=(e,t={},...n)=>{const a=document.createElement(e);for(const[i,o]of Object.entries(t))a.setAttribute(i,o);return a.append(...n),a},ra=document.getElementById("app");ra.classList.add("nc","nc-page");Up();const ec=G("header",{class:"nc-page-hd"},G("div",{},G("h1",{class:"nc-page-title",...Yh("page:title")},G("span",{style:"color: var(--nc-ui-instrument-nyx)"},"NYX")," ",G("span",{class:"nc-page-sep"},"/")," SAMPLER ",G("span",{class:"nc-page-sep"},"/")," ",G("span",{class:"nc-mono"},String(ue).padStart(2,"0"))),G("p",{class:"nc-page-sub"},"A NetComposer element."))),cn=G("input",{type:"range",class:"nc-range",id:"nyx-master",min:"0",max:"1",step:"0.01",value:String(x.master),"data-nc-id":"nyx-master"});cn.addEventListener("input",()=>Om(Number(cn.value)));const cr=G("span",{class:"nc-readout","data-nc-readout":""});cr.textContent=`${Math.round(x.master*100)}%`;const Mo="audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.aif,.aiff,.webm",Ze=G("input",{type:"file"});Ze.hidden=!0;let Lo="pad";Ze.addEventListener("change",()=>{const e=Ze.files?.[0];Ze.value="",e&&Qi(e)});function dr(e){Lo=e,Ze.accept=Lo==="pad"?Mo:`${Mo},.json,application/json`,Ze.click()}const ui=(e,t)=>{const n=G("button",{type:"button",class:"nc-page-action","data-nyx-action":e.toLowerCase()},e);return I(n,q(`page:${e.toLowerCase()}`),n),n.addEventListener("click",t),n},tc=G("label",{class:"nc-label",for:"nyx-master"},"Master");I(tc,q("page:master"),cn);const To=Xp({panel:G("div",{},G("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},tc,cn,cr),ui("Save",Dm),ui("Load",()=>dr("any")))});ec.append(G("div",{class:"nc-page-actions"},To.panel,ui("Panic",Bm),To.button,Ze));const ge=G("div",{class:"nc-stack","data-nc-layout":"adjacent"});ra.append(ec,G("main",{class:"nc-page-body"},ge));ra.addEventListener("dragover",e=>{e.dataTransfer?.types.includes("Files")&&e.preventDefault()});ra.addEventListener("drop",e=>{const t=e.dataTransfer?.files?.[0];t&&(e.preventDefault(),Qi(t))});function Co(e){return Math.abs(e)<.01?"C":`${e<0?"L":"R"}${Math.round(Math.abs(e)*100)}`}function nc(){return Tt()?le?"Sitting out":B().beatAt(te())<Ye?"Joining on the next bar":"Playing":x.pads.some(t=>t.sample)?"Stopped":"Load a sample to start"}function Rm(e){if(e==="always")return"Always";if(e==="fill")return"Only in Fill";if(e==="!fill")return"Not in Fill";if(e==="pre")return"If the last one played";if(e==="!pre")return"If the last one didn't";const[t,n]=e.split(":");return`Pass ${t} of every ${n}`}const ac=[{mode:"repeat16",label:"1/16",title:"Repeat the last 16th while held"},{mode:"repeat8",label:"1/8",title:"Repeat the last 8th while held"},{mode:"reverse",label:"Rev",title:"Play what just happened backwards while held"},{mode:"half",label:"Half",title:"Half speed while held"},{mode:"stop",label:"Stop",title:"Slow to a halt like a tape machine while held"}],dn={fill:!1,perform:null};function Un(e){dn.fill!==e&&(dn.fill=e,K?.port.postMessage({type:"fill",on:e}),L())}function pi(e){dn.perform!==e&&(dn.perform=e,K?.port.postMessage({type:"perform",mode:e}),L())}function Im(e){const t=i=>{const s=(i.target instanceof Element?i.target:null)?.closest('[data-nc-id="perform"] [data-nc-choice]'),l=s instanceof HTMLElement?s.dataset.ncChoice:void 0;return ac.some(c=>c.mode===l)?l:null},n=i=>{oe(),i==="fill"?Un(!0):pi(i)},a=()=>{Un(!1),pi(null)};e.addEventListener("pointerdown",i=>{const o=t(i);if(!o)return;i.preventDefault(),n(o);const s=()=>{a(),window.removeEventListener("pointerup",s),window.removeEventListener("pointercancel",s)};window.addEventListener("pointerup",s),window.addEventListener("pointercancel",s)}),e.addEventListener("keydown",i=>{if((i.key===" "||i.key==="Enter")&&!i.repeat){const o=t(i);if(!o)return;i.preventDefault(),n(o)}}),e.addEventListener("keyup",i=>{(i.key===" "||i.key==="Enter")&&t(i)&&a()}),window.addEventListener("blur",a)}function jm(){return{id:"transport",title:"Transport",status:Qe,controls:[{type:"button",id:"play",label:ln()?"Stop":"Play",on:ln(),onPress:()=>void Jl()},{type:"label",id:"perform-label",text:"Hold to play"},{type:"choice",id:"perform",label:"Hold",value:dn.perform??"",options:ac.map(e=>({value:e.mode,label:e.label})),onChange:()=>{}},{type:"slider",id:"tempo",label:"Tempo",min:40,max:240,step:1,value:Math.round(B().bpm),valueText:`${Math.round(B().bpm)} BPM`,onChange:e=>{Ce.setTempo({bpm:e}),L()}},{type:"group",id:"transport-more",title:"Swing",collapse:"phone",summary:$e(x.swing),controls:[{type:"slider",id:"swing",label:"Swing",min:.5,max:.75,step:.01,value:x.swing,valueText:$e(x.swing),onChange:e=>X(()=>{x.swing=e})}]},{type:"readout",id:"status",label:"Status",value:nc()},{type:"slotRow",id:"slots",morph:0,morphText:"",slots:rl.map((e,t)=>({label:e,filled:x.slots[t]!=null,active:x.active===t,edited:x.active===t&&Mt})),onMorph:()=>{},onSlot:(e,t)=>Vl(e,t)}]}}function ic(){if(!ln())return-1;const e=B().beatAt(te());return e<0||e<Ye?-1:Math.floor(e/Vh)%me}function Hm(){const e=zl(),t=ic();return{id:"pattern",title:"Pattern",lead:!0,summary:`${x.lanes.filter(n=>n.steps.some(a=>a.on)).length} lanes · ${e.name}`,sections:[{id:"grid",controls:[{type:"stepGrid",id:"grid",playhead:t,selectedRow:`pad-${x.selected}`,rows:x.lanes.map((n,a)=>({id:`pad-${a}`,label:R(a).name,length:n.length,lane:a%4+1,mute:n.mute,solo:n.solo,steps:n.steps.map(i=>({on:i.on,accent:i.accent,velocity:i.velocity,dim:!R(a).sample}))})),onToggle:(n,a,i)=>Hn(n,a,o=>{i?(o.accent=o.on?!o.accent:!0,o.on=!0):(o.on=!o.on,o.on||(o.accent=!1))}),onSet:(n,a,i,o)=>Hn(n,a,s=>{i==="on"?(s.on=o,o||(s.accent=!1)):(s.accent=o,o&&(s.on=!0))}),onSelectRow:n=>Le(n),onLongPress:(n,a)=>{ce={lane:n,step:a},Le(n,!1)},onMute:n=>X(()=>{Se(n).mute=!Se(n).mute}),onSolo:n=>X(()=>{Se(n).solo=!Se(n).solo}),onLength:(n,a)=>X(()=>{Se(n).length=Math.max(1,Math.min(me,a))}),transport:{playing:ln(),onToggle:()=>void Jl()},onFill:n=>Un(n),onClear:()=>km(),clearLabel:Zt?"Undo":"Clear"},{type:"note",id:"grid-help",text:"Tap a name to hear it. Long-press a step for its locks."}]},{id:"pads",title:"Pad",controls:[{type:"padGrid",id:"pads",label:"Pads",columns:4,selected:x.selected,pads:x.pads.map((n,a)=>({label:n.name,empty:!n.sample,peaks:n.sample?Lt.get(n.sample):void 0,lane:a%4+1,playing:pn.has(a),badge:n.choke?Yn[n.choke-1]:void 0,badgeLabel:n.choke?`choke group ${Yn[n.choke-1]}`:void 0})),onDown:n=>Wm(n),onPress:n=>Ym(n),onFile:(n,a)=>{Le(n,!1),Qi(a,n)},onMove:(n,a,i)=>Gm(n,a,i),menu:n=>Xm(n),onMenu:(n,a)=>void Vm(n,a),onRename:(n,a)=>Km(n,a)},{type:"button",id:"library",label:fe.isOpen?"Close library":"Library",on:!1,onPress:()=>Ft()}]}]}}function _m(e){if(!ce||ce.lane!==x.selected)return[];const{lane:t,step:n}=ce,a=Se(t).steps[n];if(!a)return[];const i=o=>Hn(t,n,o);return[{type:"label",id:"lock-label",text:`Step ${n+1}`},{type:"slider",id:"lock-velocity",label:"Velocity",min:0,max:1,step:.01,value:a.velocity,valueText:$e(a.velocity),onChange:o=>i(s=>{s.velocity=o})},{type:"slider",id:"lock-chance",label:"Chance",min:0,max:1,step:.05,value:a.chance,valueText:$e(a.chance),onChange:o=>i(s=>{s.chance=o})},...e.slices?[{type:"select",id:"lock-slice",label:"Slice",value:a.slice===null?"auto":String(a.slice),options:[{value:"auto",label:`In order (${n%e.slices+1})`},...Array.from({length:e.slices},(o,s)=>({value:String(s),label:`Slice ${s+1}`}))],onChange:o=>i(s=>{s.slice=o==="auto"?null:Number(o)})}]:[],{type:"slider",id:"lock-pitch",label:"Pitch",min:-12,max:12,step:1,value:a.pitch,valueText:rn(a.pitch," st"),onChange:o=>i(s=>{s.pitch=o})},{type:"select",id:"lock-cond",label:"Plays",value:a.cond,options:ai.map(o=>({value:o,label:Rm(o)})),onChange:o=>i(s=>{ai.includes(o)&&(s.cond=o)})},{type:"choice",id:"lock-reverse",label:"Direction",value:a.reverse?"rev":"pad",options:[{value:"pad",label:"As the pad"},{value:"rev",label:"Reversed"}],onChange:o=>i(s=>{s.reverse=o==="rev"})},{type:"button",id:"lock-done",label:"Done",on:!1,onPress:()=>{ce=null,L()}}]}function Um(){const e=We();if(!e)return[];const t=e.sources();return[{type:"label",id:"grab-label",text:e.record?"Grab or take":"Grab the bar"},{type:"select",id:"grab-from",label:"From",value:j.from,options:t.map(n=>({value:n.id,label:n.name})),onChange:n=>{j.from=n,e.listen(n),L()}},{type:"choice",id:"grab-bars",label:"Bars",value:String(j.bars),options:[1,2,4].map(n=>({value:String(n),label:String(n)})),onChange:n=>{j.bars=n==="4"?4:n==="2"?2:1,L()}},{type:"button",id:"grab",label:j.busy?"Grabbing…":j.bars===1?"Grab last bar":`Grab last ${j.bars} bars`,on:j.busy,onPress:()=>void rr()},...e.record?[{type:"button",id:"take",label:Wl(),on:S.phase!=="idle",onPress:()=>sr()}]:[]]}let Wn=-1;function Wm(e){if(!R(e).sample)return;Wn=e,Le(e);const t=()=>{Wn=-1};window.addEventListener("pointerup",()=>setTimeout(t),{once:!0})}function Ym(e){if(Wn===e){Wn=-1;return}if(!R(e).sample){Le(e,!1),dr("pad");return}Le(e)}function Gm(e,t,n){X(()=>{const a=structuredClone(R(e)),i=structuredClone(R(t));x.pads[t]=a,n||(x.pads[e]=i.sample?i:ye(e))}),Le(t,!1)}const Yn=["A","B","C","D"];function Km(e,t){aa(n=>{n.name=t.slice(0,24)},e)}function Xm(e){const t=!!R(e).sample,n=[{id:"load",label:t?"Replace…":"Load a file…"}];for(const i of vl().slice(-4).reverse())n.push({id:`take-${i.id}`,label:`LUCY take ${i.id}`});if(We()&&n.push({id:"grab",label:j.bars===1?"Grab the last bar":`Grab the last ${j.bars} bars`}),We()?.record&&n.push({id:"record",label:S.phase==="rec"?"Stop the take":`Take from ${_n(j.from)}`}),n.push({id:"library",label:"Library…"}),R(e).provenance){const i=ir(e);if(i.length)for(const o of i)n.push({id:`alt-${o.id}`,label:`Alternative: ${Jn(o.title)}`});else fe.ensure().then(()=>L()),n.push({id:"alternatives",label:"Alternatives…"})}return t&&n.push({id:"rename",label:"Rename…"},{id:"clear",label:"Clear"}),n}async function Vm(e,t){if(Le(e,!1),t==="load")dr("pad");else if(t==="grab")await rr();else if(t==="record")sr();else if(t==="clear")await Xl();else if(t==="library")Ft(!0);else if(t==="alternatives"){const n=R(e).provenance;Ft(!0,n?n.query||n.role:void 0)}else if(t.startsWith("alt-")){const n=ir(e).find(a=>`alt-${a.id}`===t);n&&await ar(n,R(e).provenance?.query??"",e)}else if(t.startsWith("take-")){const n=vl().find(a=>`take-${a.id}`===t);n&&await Pm(n)}}const ur=new Xh;document.addEventListener("keydown",e=>{!de||e.repeat||e.shiftKey||e.altKey||!(e.metaKey||e.ctrlKey)||e.key.toLowerCase()!=="z"||(e.target instanceof HTMLElement?e.target:null)?.closest("input, select, textarea, [contenteditable]")||(e.preventDefault(),tr())});const rc=e=>K?.port.postMessage({type:"release",pad:e});document.addEventListener("keydown",e=>{if(e.repeat||e.metaKey||e.ctrlKey||e.altKey||(e.target instanceof HTMLElement?e.target:null)?.closest("input, select, textarea, [contenteditable]"))return;const n=hl(e);n<0||!R(n).sample||(e.preventDefault(),!(ur.press(e)<0)&&Re(n,null,!0))});document.addEventListener("keyup",e=>{const t=ur.release(e);t>=0&&rc(t)});window.addEventListener("blur",()=>{for(const e of ur.releaseAll())rc(e)});function pr(e){const t=q("kit:pad-key");e.querySelectorAll('[data-nc-id="pads"] .nc-padgrid-pad').forEach((n,a)=>{const i=Kh[a];if(!i)return;let o=n.querySelector(":scope > .nyx-pad-key");o||(o=G("span",{class:"nyx-pad-key","aria-hidden":"true"}),n.append(o)),o.textContent!==i&&(o.textContent=i),I(o,t)})}function oc(e){const t=e.querySelector('[data-nc-id="fit-speed"]');if(!t)return;const n=zl(),a=n.sample?ee.info(n.sample):void 0,i=Number((a?gl(n,a,B().bpm):1).toFixed(2)),o=n.keepPitch&&(i<bo[0]||i>bo[1]);t.toggleAttribute("data-nyx-far",o)}function Qm(){const e=x.selected,t=R(e),n=t.sample?ee.info(t.sample):void 0,a=Yi(t).slice(1,-1),i=t.end-t.start,o=n?n.frames/n.sampleRate:0,s=!!t.sample,l=s&&!n,c=d=>aa(d),u=s?[...t.provenance?[{type:"readout",id:"credit",label:"Credit",value:`${t.provenance.creator} · ${Di(t.provenance.license,t.provenance.licenseStatus)}`}]:[],{type:"readout",id:"sample",label:"Length",value:l?t.provenance?.origin==="local"?"Local sound, not here: open its local Library":"Not in this browser: load it again":`${Ve(o*i)} of ${Ve(o)} · ${n?.channels===2?"stereo":"mono"}`},{type:"choice",id:"mode",label:"Mode",value:t.mode,options:[{value:"oneshot",label:"One-shot"},{value:"gate",label:"Gate"},{value:"loop",label:"Loop"}],onChange:d=>c(p=>{p.mode=d})},{type:"choice",id:"dir",label:"Direction",value:t.dir,options:[{value:"fwd",label:"Forward"},{value:"rev",label:"Reverse"},{value:"pingpong",label:"Ping-pong"}],onChange:d=>c(p=>{(d==="fwd"||d==="rev"||d==="pingpong")&&(p.dir=d)})},{type:"slider",id:"start",label:"Start",min:0,max:1,step:.001,value:t.start,valueText:Ve(t.start*o),onChange:d=>c(p=>{p.start=Math.min(d,p.end-.002)}),onCommit:()=>void Re(e)},{type:"slider",id:"end",label:"End",min:0,max:1,step:.001,value:t.end,valueText:Ve(t.end*o),onChange:d=>c(p=>{p.end=Math.max(d,p.start+.002)}),onCommit:()=>void Re(e)},{type:"select",id:"slices",label:"Slices",value:String(t.slices),options:ol.map(d=>({value:String(d),label:d?`${d}`:"Off"})),onChange:d=>void di(Number(d),t.cuts.length?"transients":"even")},...t.slices?[{type:"choice",id:"chop",label:"Chop",value:t.cuts.length?"transients":"even",options:[{value:"even",label:"Even"},{value:"transients",label:"At hits"}],onChange:d=>void di(t.slices,d==="transients"?"transients":"even")}]:[],{type:"group",id:"tune-shape",title:"Tune & shape",summary:Ih(t),controls:[{type:"label",id:"pitch-label",text:"Pitch"},{type:"slider",id:"tune",label:"Tune",min:-24,max:24,step:1,value:t.tune,valueText:rn(t.tune," st"),onChange:d=>c(p=>{p.tune=d}),onCommit:()=>void Re(e)},{type:"slider",id:"fine",label:"Fine",min:-100,max:100,step:1,value:t.fine,valueText:rn(t.fine," ct"),onChange:d=>c(p=>{p.fine=d})},{type:"select",id:"fit",label:"Fit to bars",value:String(t.fit),options:[{value:"0",label:"Off"},...[1,2,4,8].map(d=>({value:String(d),label:`${d} bar${d===1?"":"s"}`}))],onChange:d=>c(p=>{p.fit=Number(d)})},...t.fit&&n?[{type:"choice",id:"keep-pitch",label:"Keep pitch",value:t.keepPitch?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:d=>c(p=>{p.keepPitch=d==="on"})},{type:"readout",id:"fit-speed",label:"Speed",value:`${Rh(gl(t,n,B().bpm))}${t.keepPitch&&Fe.pending(e)&&!Fe.failed?" · stretching…":""}`}]:[],{type:"label",id:"shape-label",text:"Shape"},{type:"slider",id:"attack",label:"Attack",min:0,max:.1,step:.001,taper:"time",value:t.attack,valueText:Ve(t.attack),onChange:d=>c(p=>{p.attack=d})},{type:"slider",id:"decay",label:"Decay",min:.01,max:4,step:.01,taper:"time",value:t.decay,valueText:Ln(t.decay),onChange:d=>c(p=>{p.decay=d}),onCommit:()=>void Re(e)},{type:"slider",id:"cutoff",label:"Filter",min:-1,max:1,step:.01,value:t.cutoff,valueText:Mn(t.cutoff),onChange:d=>c(p=>{p.cutoff=Math.abs(d)<.02?0:d})},{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:$e(t.resonance),onChange:d=>c(p=>{p.resonance=d})}]},{type:"label",id:"out-label",text:"Output"},{type:"slider",id:"level",label:"Level",min:0,max:1,step:.01,value:t.level,valueText:$e(t.level),onChange:d=>c(p=>{p.level=d})},{type:"group",id:"pad-more",title:"Pan & choke",collapse:"phone",summary:`Pan ${Co(t.pan)} · Choke ${t.choke?Yn[t.choke-1]:"none"}`,controls:[{type:"slider",id:"pan",label:"Pan",min:-1,max:1,step:.01,value:t.pan,valueText:Co(t.pan),onChange:d=>c(p=>{p.pan=Math.abs(d)<.02?0:d})},{type:"select",id:"choke",label:"Choke",value:String(t.choke),options:[{value:"0",label:"None"},...Yn.map((d,p)=>({value:String(p+1),label:`Group ${d}`}))],onChange:d=>c(p=>{p.choke=Number(d)})},{type:"button",id:"clear-pad",label:"Clear pad",on:!1,onPress:()=>void Xl()}]}]:[];return{id:"params",title:"Params",summary:t.name,controls:[...s?[{type:"canvas",id:"wave",label:"Wave",paint:"waveform",peaks:t.sample?Lt.get(t.sample)??[]:[],region:[t.start,t.end],markers:a.map(d=>t.start+d*i),position:pn.get(e)??-1}]:[],...N?[{type:"note",id:"notice",text:N}]:[],..._m(t),...u,...Um()]}}function hi(e,t){X(()=>t(x.hacks[e]))}function Jm(e,t){const n=x.hacks[e].dials[t.key]??t.default,a=`hack-${e}-${t.key}`,i=o=>hi(e,s=>{s.dials[t.key]=o});return t.options?{type:"select",id:a,label:t.label,value:String(n),options:t.options.map(o=>({value:String(o.value),label:o.label})),onChange:o=>i(Number(o))}:{type:"slider",id:a,label:t.label,min:t.min,max:t.max,step:t.step??1,taper:nu(t),value:n,valueText:Ro(t,n,B().bpm),onChange:i}}const xn=(e,t)=>(Ne(e)?.dials??[]).filter(n=>!n.key.startsWith("mod_")&&n.more===!0===t).map(n=>Jm(e,n)),Fo=new Map;function La(e){let t=Fo.get(e);if(t)return t;let n=0,a=null;const i={in:0,out:0},o=()=>{const s=cd(xe,e);if(s!==a){for(let l=0;l<n;l++)a?.close();a=s;for(let l=0;l<n;l++)a?.open()}};return t={open:()=>(o(),n++,a?.open(),!0),close:()=>{n!==0&&(o(),n--,a?.close())},read:()=>(o(),a?.read()??i)},Fo.set(e,t),t}function Zm(){const e=x.hacks,t=e.filter,n=t.mode==="lp"&&t.cutoff>=.999,a=o=>X(()=>o(x.hacks.filter)),i=[pl(t)?"":"Filter",e.drive.on?"Drive":"",e.compressor.on?"Comp":""].filter(Boolean);return{id:"hacks",title:"Hacks",summary:i.length?i.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:t.on,meter:La(`${Ui(t).type}-1`),meterHelp:q("hack-meter"),onToggle:o=>a(s=>{s.on=o}),controls:[{type:"select",id:"filter-mode",label:"Mode",value:t.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:o=>a(s=>{(o==="lp"||o==="hp"||o==="bp")&&(s.mode=o)})},{type:"slider",id:"filter-cutoff",label:"Cutoff",min:0,max:1,step:.01,value:t.cutoff,valueText:n?"open":ri(ul(t.cutoff)),onChange:o=>a(s=>{s.cutoff=o})},...t.mode==="lp"?[]:[{type:"slider",id:"filter-resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:$e(t.resonance),onChange:o=>a(s=>{s.resonance=o})}],{type:"canvas",id:"filter-curve",label:"Curve",paint:"filter",mode:t.mode,cutoff:t.cutoff,resonance:t.mode==="lp"?0:t.resonance,...jh(t)}]},{type:"group",id:"hacks-more",title:"Drive & Compressor",collapse:"phone",summary:`Drive ${e.drive.on?"on":"off"} · Compressor ${e.compressor.on?"on":"off"}`,controls:[{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:e.drive.on,meter:La("drive-1"),meterHelp:q("hack-meter"),onToggle:o=>hi("drive",s=>{s.on=o}),controls:xn("drive",!1),more:xn("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:e.compressor.on,meter:La("compressor-1"),meterHelp:q("hack-meter"),onToggle:o=>hi("compressor",s=>{s.on=o}),controls:xn("compressor",!1),more:xn("compressor",!0)}]}]}}const hr=[jm,Hm,Qm,Zm].map(e=>({def:e,handle:nh(e())}));ah(ge,hr.map(e=>e.handle),"adjacent");Im(ge);pr(ge);Wi(ge);function sc(){fe.attach(ge.querySelector('[data-nc-section="pads"] [data-nc-id="library"]'))}function L(){Sm?.update(),Mm?.changed();for(const e of hr)e.handle.update(e.def());sc(),fe.isOpen&&fe.refresh(),pr(ge),oc(ge),Wi(ge)}let No="";function lc(){zt();const e=pn.get(x.selected)??-1,t=JSON.stringify([ic(),nc(),Math.round(e*400)]);if(t!==No){No=t;for(const n of hr.slice(0,3))n.handle.update(n.def());sc(),pr(ge),oc(ge),Wi(ge)}requestAnimationFrame(lc)}requestAnimationFrame(lc);gm.start();Promise.all([...an(x)].map(e=>ee.get(e))).then(e=>{for(const t of e)t&&!Lt.has(t.hash)&&Lt.set(t.hash,wl(t.data));L()});if(J)oe(),J.providePreset?.({format:sm,version:lm,get:()=>(hm(x),El(x)),set:async e=>{await Zl(e,"Loaded the Scene's pattern.")}}),We()?.listen(j.from),J.onAudio?.({label:"Pad",targets:Gl,receive:Kl});else{const e=()=>{oe()};document.addEventListener("pointerdown",e,{once:!0,capture:!0}),document.addEventListener("keydown",e,{once:!0,capture:!0})}window.__nyx={state:x,clock:Ce,store:ee,stretcher:Fe,stretchTimes:Fl,get stretchLoaded(){return Cn!==null},get ctx(){return F},get fx(){return xe},get positions(){return pn},get voices(){return Cl},ensureAudio:oe,play:Re,async setSample(e,t,n,a="test"){await oe()&&await rt(e,t,n,a)},grab:j,grabBars:rr,get padUndo(){const e=de?.before[0];return de&&e?{index:e.index,sample:e.pad.sample,pads:de.before.map(t=>t.index)}:null},undoPad:tr,receiveAudio:Kl,padTargets:Gl,take:S,pressTake:sr,get notice(){return N},setPerform:pi,setFill:Un,actSlot:Vl,get edited(){return Mt},library:{get panel(){return fe},open:e=>Ft(!0,e),close:()=>Ft(!1),catalog:Pl,local:ia,load:ar,buildKit:()=>fe.buildKit(),alternatives:e=>ir(e).map(t=>t.id),preview:jl,get previewing(){return wt?.id??null}},toggleStep(e,t){Hn(e,t,n=>{n.on=!n.on})}};
