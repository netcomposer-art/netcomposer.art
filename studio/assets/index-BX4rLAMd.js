(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();const gt=1e-9;function Jc(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class Li{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return Jc(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let i=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+gt&&(i=s.bpm);const o=[{beat:t.beat,time:t.time,bpm:this.clamp(i)}];for(const s of a){if(s.beat<=t.beat+gt)continue;const l=this.clamp(s.bpm);l!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+gt){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-gt;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,i=.25){const o=this.bpmAt(n);if(!(a>0)||!(i>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/i));this.setTempoAt(o,n);for(let l=1;l<=s;l++)this.setTempoAt(o+(t-o)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new Li({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+gt)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+gt)return n[a];return n[0]}}const Zc=Object.freeze({beatsPerBar:4,beatUnit:4}),St=1e-9;function ed(e){return Math.floor(e+St)}function ns(e,t,n=!1){if(!(t>0))return e;const i=Math.ceil(e/t-St)*t;return n&&i<=e+St?i+t:i}class td{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new Li({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??Zc}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-St&&(this.stopTime===null||t<this.stopTime-St)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-St?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=ed(t/n),i=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:i,barPhase:i/n}}nextBar(t,n=!1){return ns(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const as="nc-clock/snapshot",is=1;function nd(e,t="local"){return{format:as,version:is,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function ad(e,t){const n=id(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const ze=e=>typeof e=="number"&&Number.isFinite(e),Er=e=>e===null||ze(e);function id(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==as&&n("format"),(!ze(t.version)||Math.floor(t.version)!==is)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!ze(t.anchor.beat)||!ze(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&ze(a.beat)&&ze(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!ze(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!ze(t.meter.beatUnit))&&n("meter"),(!Er(t.startTime)||!Er(t.stopTime)||!ze(t.stoppedBeat))&&n("transport times"),t}class rd{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new td(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){ad(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return nd(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const od="nc-sync/1",sd=1,ld="nc-sync",cd="nc-sync-leader",dd=0,rs=.5,os=.75;function ud(e){return typeof e=="number"&&Number.isFinite(e)&&e>=rs&&e<=os?e:null}const ka=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Gt=e=>typeof e=="number"&&Number.isFinite(e),An=e=>typeof e=="string"&&e.length>0;function pd(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==sd||!An(t.type)||!An(t.from)||!Gt(t.term)||!Gt(t.seq)||!Gt(t.sentAt))return null;switch(t.type){case"hello":return An(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return Gt(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&Gt(t.slot)?t:null;case"ping":case"pong":return An(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function hd(e,t,n,a,i){return{proto:od,from:t,term:n,seq:a,sentAt:i,...e}}function Ue(){return(performance.timeOrigin+performance.now())/1e3}const Ea=.003,fd=3,Aa=.002+1e-6,md=.01,Ar=500;class gd{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?md:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=Ea&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const i=n-(this.timeOrigin+a)/1e3,o=this.median(),s=i-o,l=Math.abs(i-this.preStepBase),u=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!u&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&u===this.pendingBack&&(u||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(i,o,u))):(this.pendingStep=s,this.pendingBack=u,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const i=this.ctx.currentTime,o=i<=this.revertUntil;let s;if(a&&o){const l=this.offsets,u=this.preStep;l.length=0;for(let c=0;c<u.length;c++)l.push(u[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:i,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!o){const c=this.offsets,d=this.preStep;d.length=0;for(let p=0;p<c.length;p++)d.push(c[p]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?i+this.stepRevert:-1/0}const l=this.offsets,u=t-n;for(let c=0;c<l.length;c++)l[c]+=u;this.stepCount++,s={stepSeconds:t-n,confirmedAt:i,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let o=0;o<a;o++){const s=t[o];let l=o-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const i=a>>1;return a%2?n[i]:(n[i-1]+n[i])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.readLatency(!1);let n=null,a=!1;const i=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=Ea&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Ar)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),n=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3,a=!0;else if(!i||!(i.contextTime>=Ea)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const o=this.perfNow();if(this.waitSince===null&&(this.waitSince=o),o-this.waitSince<Ar)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(fd,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let i=-1,o=0;for(let l=0;l<n;l++){let u=0;for(let c=0;c<n;c++)Math.abs(t[c]-t[l])<=Aa&&u++;u>o&&(i=l,o=u)}if(o<a)return;const s=t[i];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>Aa&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-(this.offset-this.userOffsetMs/1e3))<=Aa}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const i=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(i,2)};setTimeout(i,2)})}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,i=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(i)&&i>0?i:null}}class bd{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...ka,...t.capabilities},this.channelOption=t.channel??ld,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const i=this.o.now(),o=()=>{n===this.startWaits&&t(i)};return a.then(o,o),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const i=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(i),0)}else{const i=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?i:Math.max(t+this.o.gatedStartLeadSeconds,i),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[i,o]=this.tempoRange();t=Math.min(o,Math.max(i,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const u=s.beatAt(l+this.o.minLeadSeconds),c=Math.max(n??ns(u,1),u);a&&a>0?(s.tempo.rampTempo(t,c,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,c),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(os,Math.max(rs,t)):dd;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=ud(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=pd(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const i=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...ka,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),i||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const i=this.peers.get(n.from);i?i.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...ka},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(i=>{this.leader&&this.decideStart(i)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const i of[...this.snapshotListeners])i(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const i of[...this.messageListeners])i(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(cd,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,l)=>[o?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),i=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(i===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,i=o.id)}this.setLeader(i===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],i=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==i[0]?a[0]<i[0]:a[1]!==i[1]?a[1]<i[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const i=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>i&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(hd(t,this.id,this.term,++this.seq,this.o.now()))}}const yd="modulepreload",wd=function(e){return"/studio/"+e},Sr={},vd=function(t,n,a){let i=Promise.resolve();if(n&&n.length>0){let s=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=l?.nonce||l?.getAttribute("nonce");i=s(n.map(c=>{if(c=wd(c),c in Sr)return;Sr[c]=!0;const d=c.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${p}`))return;const h=document.createElement("link");if(h.rel=d?"stylesheet":yd,d||(h.as="script"),h.crossOrigin="",h.href=c,u&&h.setAttribute("nonce",u),document.head.appendChild(h),d)return new Promise((m,b)=>{h.addEventListener("load",m),h.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return i.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return t().catch(o)})};var xd=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Qa=[.25,.5,.75,1,1.5,2],$d=4.9,ee={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},at={fmt:"wet"},Ae={fmt:"pct"},bt={fmt:"db"},Sn={fmt:"signedPct"},Sa={fmt:"num",suffix:" ms"},Q={div:100};function R(e,t,n,a,i,o,s,l){var u={key:e,label:t,min:n,max:a,default:i,step:1,k:o,unit:null,format:s};if(l)for(var c in l)u[c]=l[c];return u}function Mn(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var nn=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[R("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:ee.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[R("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:ee.hpHz,astrid:!0,zero:"off"}),R("q","Resonance",0,100,0,2,{fmt:"q",law:ee.hpQ},{dsp:{law:ee.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[R("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:ee.bpHz,astrid:!0},{dsp:{law:ee.bpHz}}),R("q","Q",0,100,0,2,{fmt:"q",law:ee.bpQ},{dsp:{law:ee.bpQ}}),R("mix","Mix",0,100,100,3,at,{dsp:Q,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[R("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Mn(xd),overriddenBy:"beats_free",tempoSynced:!0}),R("feedback","Feedback",0,90,35,2,Ae,{dsp:Q,unit:"%"}),R("mix","Wet/dry",0,100,0,3,at,{dsp:Q,unit:"%",astridKey:"wet"}),R("tone","Tone",0,100,100,4,{fmt:"hz",law:ee.delayTone,offAt:100},{dsp:{div:99},more:!0}),R("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),R("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Mn([[0,"Insert"],[1,"Send"]]),more:!0}),R("send","Send",0,100,100,7,Ae,{dsp:Q,unit:"%",more:!0}),R("mod_send","Accent → send",-100,100,0,8,Sn,{dsp:Q,unit:"%",more:!0}),R("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[R("predelay","Pre-delay",0,200,0,1,Sa,{dsp:{div:1e3},unit:"ms"}),R("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:Q,unit:"%"}),R("decay","Decay",0,100,50,3,Ae,{dsp:Q,unit:"%"}),R("damping","Damping",0,100,0,4,Ae,{dsp:Q,unit:"%"}),R("mix","Mix",0,100,0,5,at,{dsp:Q,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[R("rate","Rate",0,100,26,1,{fmt:"rate",law:ee.rate},{dsp:{law:ee.rate}}),R("depth","Depth",0,100,70,2,Ae,{dsp:Q,unit:"%"}),R("feedback","Feedback",-90,90,50,3,Sn,{dsp:Q,unit:"%"}),R("mix","Mix",0,100,50,4,at,{dsp:Q,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[R("rate","Rate",0,100,52,1,{fmt:"rate",law:ee.rate},{dsp:{law:ee.rate}}),R("depth","Depth",0,100,50,2,Ae,{dsp:Q,unit:"%"}),R("spread","Spread",0,100,70,3,Ae,{dsp:Q,unit:"%"}),R("mix","Mix",0,100,40,4,at,{dsp:Q,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[R("rate","Rate",0,100,39,1,{fmt:"rate",law:ee.rate},{dsp:{law:ee.rate}}),R("depth","Depth",0,100,70,2,Ae,{dsp:Q,unit:"%"}),R("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Mn([[4,"4"],[6,"6"],[8,"8"]])}),R("feedback","Feedback",0,90,30,4,Ae,{dsp:Q,unit:"%"}),R("mix","Mix",0,100,50,5,at,{dsp:Q,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[R("low_db","Low",-18,18,0,1,bt,{unit:"dB"}),R("mid_db","Mid",-18,18,0,2,bt,{unit:"dB"}),R("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:ee.midHz,astrid:!0},{dsp:{law:ee.midHz}}),R("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:ee.eqQ},{dsp:{law:ee.eqQ}}),R("high_db","High",-18,18,0,4,bt,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[R("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),R("output_db","Output",-12,12,0,2,bt,{unit:"dB"}),R("mix","Mix",0,100,100,3,at,{dsp:Q,unit:"%"}),R("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Mn([[0,"Smooth"],[1,"Acid"]]),more:!0}),R("tone","Tone",0,100,100,5,{fmt:"hz",law:ee.driveTone,offAt:100},{dsp:{div:99},more:!0}),R("mod_drive","Accent → drive",-100,100,0,6,Sn,{dsp:Q,unit:"%",more:!0}),R("mod_tone","Accent → tone",-100,100,0,7,Sn,{dsp:Q,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[R("threshold_db","Threshold",-60,0,0,1,bt,{unit:"dB"}),R("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:ee.ratio},{dsp:{law:ee.ratio}}),R("attack_ms","Attack",1,100,10,3,Sa,{unit:"ms"}),R("release_ms","Release",10,1e3,150,4,Sa,{unit:"ms"}),R("makeup_db","Makeup",0,24,0,5,bt,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[R("width","Width",0,200,100,1,Ae,{dsp:Q,unit:"%"}),R("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:Q})]}],kd=nn.map(function(e){return e.type}),Ed=nn.filter(function(e){return!e.hidden}).map(function(e){return e.type}),Ad={reverb:"plate"},Nt={},ss=[],an=[];function Sd(e){Nt[e.type]||ss.push(e.type),Nt[e.type]=e;for(var t=0;t<an.length;t++)try{an[t](e.type)}catch(n){typeof console<"u"&&console.error(n)}}function Md(){return ss.map(function(e){return Nt[e]})}function Td(e){return an.push(e),function(){var t=an.indexOf(e);t>=0&&an.splice(t,1)}}function ls(e){return typeof e=="string"&&/^plugin:[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(e)&&e.length<=71}function Ci(e){var t=Ad[e]||e;return kd.indexOf(t)>=0||typeof t=="string"&&Nt[t]?t:null}function ne(e){for(var t=Ci(e),n=0;n<nn.length;n++)if(nn[n].type===t)return nn[n];return t&&Nt[t]?Nt[t]:null}function Ld(e,t){var n=ne(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function $t(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function Hn(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=$t(n.law,t);return a===null?0:a}function Mr(e,t){return Math.min($d,e*60/(t>0?t:120))}var Tr=function(e){return e>0?"+":e<0?"−":""};function Cd(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function cs(e,t,n){var a=e.format,i;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:Tr(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return Tr(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(i=$t(a.law,t),i===null?a.zero||"open":a.astrid?Cd(i):i+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+$t(a.law,t).toFixed(1);case"ratio":return $t(a.law,t).toFixed(1)+":1";case"rate":return i=$t(a.law,t),(i<1?i.toFixed(2):i<10?i.toFixed(1):i.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var o=0;o<e.options.length;o++)if(e.options[o].value===t)return e.options[o].label;return String(t);case"tempoMs":return Math.round(Mr(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(Mr(t,n)*1e3)+" ms"}return String(t)}var Fd=1,ua=["drive","delay","plate"];function Nd(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,i){return cs(e,a,i)},t}var Mt=ua.map(function(e){var t=ne(e),n={type:e,label:t.label,dials:t.dials.map(Nd)};return t.tempoSynced&&(n.tempoSynced=!0),n}),zd={reverb:"plate"};function Un(e){var t=zd[e]||e;return ua.indexOf(t)>=0?t:null}function pa(e){for(var t=Un(e),n=0;n<Mt.length;n++)if(Mt[n].type===t)return Mt[n];return null}function ds(e,t){var n=pa(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function zt(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function Re(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,i=1;i<e.options.length;i++)Math.abs(e.options[i].value-t)<Math.abs(a-t)&&(a=e.options[i].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*o)/o))+0}function Pd(){return{v:Fd,chain:Mt.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function Dd(e){return Qa.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},Qa[0])}function Ma(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Rd(e){for(var t=Array.isArray(e)?e:Ma(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=Pd(),i={},o=[],s=0;s<t.length;s++){var l=t[s];if(Ma(l)){var u=Un(l.type);if(!u){typeof l.type=="string"&&o.push(l.type);continue}if(i[u]){o.push(u);continue}i[u]=!0;var c=a.chain[ua.indexOf(u)],d=Ma(l.dials)?l.dials:{};u==="delay"&&d.mix===void 0&&d.wet!==void 0&&(d=Object.assign({},d,{mix:d.wet})),c.bypass=n?l.bypass===!0:l.bypass!==!1,pa(u).dials.forEach(function(p){c.dials[p.key]=Re(p,d[p.key])}),Od(u,c.dials,d)}}return{state:a,dropped:o}}function Od(e,t,n){for(var a=pa(e),i=0;i<a.dials.length;i++){var o=a.dials[i];o.stepWhen&&(t[o.key]=Re(o,n&&typeof n[o.key]=="number"?n[o.key]:t[o.key],zt(o,t)))}}function Vn(e){return Rd(e).state}function qd(e){return JSON.parse(JSON.stringify(e))}var Id=24,Ja={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Za(e,t,n){if(t==="bypass")return n?0:1;var a=ds(e,t)||_d(e,t);return a?Hn(a,n):0}function _d(e,t){var n=ne(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var Bd={};Mt.forEach(function(e){e.dials.forEach(function(t){Bd[e.type+"."+t.key]=t.format})});function Ta(e,t){var n=new Float64Array(Id),a=Vn(e);return a.chain.forEach(function(i){var o=Ja[i.type];n[o.bypass]=i.bypass?0:1,Object.keys(i.dials).forEach(function(s){n[o[s]]=Za(i.type,s,i.dials[s])})}),n}var jd="__ncFxLoop",Hd=/^(?:return|typeof|instanceof|in|of|new|delete|void|throw|case|do|else|yield|await)$/,Lr=/[A-Za-z_$\u0080-\uffff]/,La=/[A-Za-z0-9_$\u0080-\uffff]/;function Ud(e){var t=[],n=0,a=e.length,i=[],o,s;function l(){var h=t.length?t[t.length-1]:null;return h?h.t==="name"?Hd.test(h.v):h.t==="num"||h.t==="str"||h.t==="tpl"||h.t==="re"?!1:h.v!==")"&&h.v!=="]":!0}function u(){for(var h=n-1;n<a;){if(o=e[n],o==="\\"){n+=2;continue}if(o==="`"){n++,t.push({t:"tpl",v:"",s:h,e:n});return}if(o==="$"&&e[n+1]==="{"){n+=2,i.push("tpl"),t.push({t:"tpl",v:"",s:h,e:n});return}n++}t.push({t:"tpl",v:"",s:h,e:a})}for(;n<a;){if(o=e[n],o===" "||o==="	"||o===`
`||o==="\r"||o==="\f"||o==="\v"||o===" "||o==="\uFEFF"||o==="\u2028"||o==="\u2029"){n++;continue}if(o==="/"&&e[n+1]==="/"){for(;n<a&&e[n]!==`
`&&e[n]!=="\r";)n++;continue}if(o==="/"&&e[n+1]==="*"){var c=e.indexOf("*/",n+2);n=c<0?a:c+2;continue}if(s=n,o==='"'||o==="'"){for(n++;n<a&&e[n]!==o&&e[n]!==`
`;)n+=e[n]==="\\"?2:1;n++,t.push({t:"str",v:"",s,e:n});continue}if(o==="`"){n++,u();continue}if(o==="/"&&l()){n++;for(var d=!1;n<a;){if(o=e[n],o==="\\"){n+=2;continue}if(o===`
`)break;if(d)o==="]"&&(d=!1);else if(o==="[")d=!0;else if(o==="/"){n++;break}n++}for(;n<a&&La.test(e[n]);)n++;t.push({t:"re",v:"",s,e:n});continue}if(Lr.test(o)||o==="\\"){for(n++;n<a&&(La.test(e[n])||e[n]==="\\");)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(o==="#"&&n+1<a&&Lr.test(e[n+1])){for(n+=2;n<a&&La.test(e[n]);)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(o>="0"&&o<="9"||o==="."&&e[n+1]>="0"&&e[n+1]<="9"){for(n++;n<a&&/[0-9A-Za-z_.]/.test(e[n]);)(e[n]==="e"||e[n]==="E")&&(e[n+1]==="+"||e[n+1]==="-")&&!/^0[xX]/.test(e.slice(s,n))&&n++,n++;t.push({t:"num",v:"",s,e:n});continue}if(o==="{")i.push("{");else if(o==="}"){var p=i.pop();if(p==="tpl"){n++,u();continue}}if(o==="?"&&e[n+1]==="."&&!(e[n+2]>="0"&&e[n+2]<="9")){n+=2,t.push({t:"p",v:"?.",s,e:n});continue}if(o==="."&&e[n+1]==="."&&e[n+2]==="."){n+=3,t.push({t:"p",v:"...",s,e:n});continue}n++,t.push({t:"p",v:o,s,e:n})}return t}function Vd(e,t){for(var n=0,a=t;a<e.length;a++){var i=e[a].t==="p"?e[a].v:"";if(i==="("||i==="["||i==="{")n++;else if((i===")"||i==="]"||i==="}")&&(n--,n===0))return i===")"?a:-1}return-1}function Gd(e){for(var t=String(e),n=Ud(t),a=[],i=jd+"()",o=0;o<n.length;o++){var s=n[o];if(!(s.t!=="name"||s.v!=="while"&&s.v!=="for")){var l=o>0?n[o-1]:null;if(!(l&&l.t==="p"&&(l.v==="."||l.v==="?."))){var u=o+1;if(!(s.v==="for"&&n[u]&&n[u].t==="name"&&n[u].v==="await")&&!(!n[u]||n[u].t!=="p"||n[u].v!=="(")){var c=Vd(n,u);if(!(c<0)){if(s.v==="while"){if(c===u+1)continue;a.push([n[u].e,i+" && ("],[n[c].s,")"]);continue}for(var d=[],p=0,h=u+1;h<c;h++){var m=n[h].t==="p"?n[h].v:"";m==="("||m==="["||m==="{"?p++:m===")"||m==="]"||m==="}"?p--:m===";"&&p===0&&d.push(h)}d.length===2&&(d[1]===d[0]+1?a.push([n[d[0]].e," "+i]):a.push([n[d[0]].e," "+i+" && ("],[n[d[1]].s,")"]))}}}}}if(!a.length)return t;a.sort(function(g,w){return g[0]-w[0]});for(var b="",y=0,f=0;f<a.length;f++)b+=t.slice(y,a[f][0])+a[f][1],y=a[f][0];return b+t.slice(y)}var Ca=1,Cr=15,us=/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/,Wd=/^[a-z][a-z0-9_]{0,31}$/,ps=/^\d+\.\d+\.\d+$/,hs=/^[A-Za-z0-9.+-]+(?: (?:AND|OR|WITH) [A-Za-z0-9.+-]+)*$/,Yd=/^[A-Za-z0-9_-][A-Za-z0-9._-]{0,63}\.js$/,Fr=["$schema","ncPlugin","id","name","version","author","licence","description","website","keywords","dsp","params"],Nr=["id","label","type","defaultValue","minValue","maxValue","discreteStep","exponent","choices","units","more"],Gn={1:"It failed to start.",2:"It crashed while playing.",3:"It made bad numbers (NaN, infinity or runaway level).",4:"It crashed when a dial moved.",5:"Its code is not loaded.",6:"It got stuck in a loop, so it was stopped."};function rn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function yt(e){return typeof e=="number"&&isFinite(e)}function rt(e,t){return typeof e=="string"&&e.trim().length>0&&e.length<=t}function ha(e){var t=[],n=e,a=function(l,u){t.push(l+": "+u)};if(!rn(n))return{ok:!1,errors:["manifest: must be a JSON object"],manifest:null};Object.keys(n).forEach(function(l){Fr.indexOf(l)<0&&a(l,"unknown field (allowed: "+Fr.slice(1).join(", ")+")")}),n.ncPlugin!==Ca&&a("ncPlugin","must be "+Ca),(typeof n.id!="string"||!us.test(n.id)||n.id.length>64)&&a("id",'lowercase letters and digits, with dots or dashes between, up to 64 (e.g. "yourname.tremolo")'),rt(n.name,40)||a("name","a name of 1 to 40 characters"),(typeof n.version!="string"||!ps.test(n.version))&&a("version",'x.y.z, e.g. "1.0.0"'),rt(n.author,80)||a("author","who made it, 1 to 80 characters"),(typeof n.licence!="string"||!hs.test(n.licence)||n.licence.length>64)&&a("licence",'an SPDX licence id, e.g. "MIT"'),n.description!==void 0&&!(typeof n.description=="string"&&n.description.length<=200)&&a("description","up to 200 characters"),n.website!==void 0&&!(typeof n.website=="string"&&/^https:\/\/\S+$/.test(n.website)&&n.website.length<=2048)&&a("website","an https:// address"),n.keywords!==void 0&&!(Array.isArray(n.keywords)&&n.keywords.length<=8&&n.keywords.every(function(l){return rt(l,24)}))&&a("keywords","up to 8 short strings"),(typeof n.dsp!="string"||!Yd.test(n.dsp))&&a("dsp",`the DSP file's name, in the same folder as plugin.json, ending in .js (e.g. "tremolo.dsp.js")`);var i=[];if(!Array.isArray(n.params))a("params","a list of params (may be empty)");else if(n.params.length>Cr)a("params","at most "+Cr);else{var o={};n.params.forEach(function(l,u){var c="params["+u+"]";if(!rn(l)){a(c,"must be an object");return}Object.keys(l).forEach(function(h){Nr.indexOf(h)<0&&a(c+"."+h,"unknown field (allowed: "+Nr.join(", ")+")")}),typeof l.id!="string"||!Wd.test(l.id)||l.id==="bypass"?a(c+".id",'lowercase, starting with a letter: letters, digits, _ (not "bypass")'):o[l.id]?a(c+".id",'"'+l.id+'" is used twice'):o[l.id]=!0,rt(l.label,24)||a(c+".label","the dial's name, 1 to 24 characters");var d=l.type===void 0?"float":l.type;if(["float","int","boolean","choice"].indexOf(d)<0){a(c+".type","float, int, boolean or choice");return}var p={id:l.id,label:l.label,type:d};if(d==="choice"){if(!Array.isArray(l.choices)||l.choices.length<2||l.choices.length>16||!l.choices.every(function(h){return rt(h,24)})){a(c+".choices","2 to 16 names");return}p.choices=l.choices.slice(),p.minValue=0,p.maxValue=l.choices.length-1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==p.maxValue)&&a(c,"a choice's values are 0 to choices.length - 1: leave out minValue and maxValue")}else if(d==="boolean")p.minValue=0,p.maxValue=1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==1)&&a(c,"a boolean is 0 or 1: leave out minValue and maxValue");else{if(!yt(l.minValue)||!yt(l.maxValue)||!(l.minValue<l.maxValue)){a(c,"minValue and maxValue: numbers, minValue < maxValue");return}p.minValue=l.minValue,p.maxValue=l.maxValue,l.discreteStep!==void 0&&!(yt(l.discreteStep)&&l.discreteStep>0&&l.discreteStep<=l.maxValue-l.minValue)&&a(c+".discreteStep","a number > 0, at most the range"),p.discreteStep=d==="int"?Math.max(1,Math.round(l.discreteStep||1)):yt(l.discreteStep)&&l.discreteStep>0?l.discreteStep:Kd(l.maxValue-l.minValue),d==="int"&&(!Number.isInteger(l.minValue)||!Number.isInteger(l.maxValue))&&a(c,"an int has whole-number minValue and maxValue")}l.defaultValue===void 0?p.defaultValue=p.minValue:!yt(l.defaultValue)||l.defaultValue<p.minValue||l.defaultValue>p.maxValue?a(c+".defaultValue","a number from "+p.minValue+" to "+p.maxValue):p.defaultValue=l.defaultValue,l.units!==void 0&&(typeof l.units=="string"&&l.units.length<=8?p.units=l.units:a(c+".units",'up to 8 characters, e.g. "Hz", "ms", "%", "dB"')),l.exponent!==void 0&&(yt(l.exponent)&&l.exponent>0?p.exponent=l.exponent:a(c+".exponent","a number > 0")),l.more!==void 0&&(typeof l.more=="boolean"?l.more&&(p.more=!0):a(c+".more","true or false")),i.push(p)})}if(t.length)return{ok:!1,errors:t,manifest:null};var s={ncPlugin:Ca,id:n.id,name:n.name.trim(),version:n.version,author:n.author.trim(),licence:n.licence,dsp:n.dsp,params:i};return n.description&&(s.description=n.description),n.website&&(s.website=n.website),n.keywords&&(s.keywords=n.keywords.slice()),{ok:!0,errors:[],manifest:s}}function Kd(e){var t=Math.pow(10,Math.floor(Math.log10(e/100)));return t<.001?.001:t>1?1:+t.toFixed(3)}function Xd(e){for(var t=0;t<3&&Math.abs(Math.round(e*Math.pow(10,t))-e*Math.pow(10,t))>1e-9;)t++;return t}function fa(e){return"plugin:"+e}function Qd(e,t){var n=e,a=t||{},i=n.params.map(function(s,l){var u={key:s.id,label:s.label,min:s.minValue,max:s.maxValue,default:s.defaultValue,step:s.discreteStep,k:l+1,unit:s.units||null,format:null};if(s.type==="choice"||s.type==="boolean"){var c=s.type==="choice"?s.choices:["Off","On"];u.step=null,u.options=c.map(function(p,h){return{value:h,label:p}}),u.format={fmt:"option"}}else{var d=s.units?/^[%°×]/.test(s.units)?s.units:" "+s.units:"";u.format={fmt:"fixed",div:1,add:0,digits:Xd(s.discreteStep),suffix:d}}return s.more&&(u.more=!0),u}),o={type:fa(n.id),label:n.name,dials:i,plugin:{id:n.id,version:n.version,author:n.author,licence:n.licence,engine:"plugin:"+n.id+"@"+n.version,idBase:n.id.split(".").pop(),url:typeof a.url=="string"?a.url:"",listed:a.listed===!0}};return n.description&&(o.note=n.description),n.website&&(o.plugin.website=n.website),o}function fs(e,t){var n=ha(e);if(!n.ok)throw new Error("nc-fx plugin: "+n.errors.join("; "));var a=ne(fa(n.manifest.id));if(a&&a.plugin.version!==n.manifest.version)throw new Error("nc-fx plugin: "+n.manifest.id+" "+a.plugin.version+" is already loaded on this page; reload to use "+n.manifest.version);if(a)return a;var i=Qd(n.manifest,t);return Sd(i),i}async function ms(e){var t=globalThis.crypto&&globalThis.crypto.subtle;if(!t)throw new Error("nc-fx plugin: no WebCrypto here (integrity needs a secure context: https or localhost)");for(var n=new Uint8Array(await t.digest("SHA-256",e)),a="",i=0;i<n.length;i++)a+=String.fromCharCode(n[i]);return"sha256-"+btoa(a)}function Jd(e){if(e.protocol!=="https:"&&!(e.protocol==="http:"&&/^(localhost|127\.0\.0\.1|\[::1\])$/.test(e.hostname)))throw new Error("nc-fx plugin: load plugins over https (http only from localhost): "+e.href)}async function zr(e,t,n,a){var i=await t(e,{credentials:"omit",cache:"no-cache"});if(!i.ok)throw new Error("nc-fx plugin: "+a+" "+e+" answered "+i.status);var o=new Uint8Array(await i.arrayBuffer());if(n){var s=await ms(o);if(s!==n)throw new Error("nc-fx plugin: "+a+" "+e+" does not match the registry (expected "+n+", got "+s+")")}return new TextDecoder().decode(o)}var Tn=typeof WeakMap=="function"?new WeakMap:null;function gs(e,t){var n=new Error("nc-fx plugin: "+e.name+" "+t+" is already loaded on this page. Reload the page to use "+e.version+".");return n.reload=!0,n}async function bs(e,t,n,a,i){var o=t.id+"@"+t.version,s=Tn&&Tn.get(e);!s&&Tn&&(s={},Tn.set(e,s));var l=s&&s[o];if(l){var u=await l,c=await n();return{stale:c!==u}}var d=(async function(){var p=await n();await ks(e,i);var h=URL.createObjectURL(new Blob([Gd(p)+`
//# sourceURL=`+a+`
`],{type:"text/javascript"}));try{await e.audioWorklet.addModule(h)}finally{URL.revokeObjectURL(h)}return p})();return s&&(s[o]=d,d.catch(function(){delete s[o]})),await d,{stale:!1}}async function ys(e,t,n){var a=n||{},i=new URL(String(t),a.base||(typeof location<"u"?location.href:void 0));Jd(i);var o=a.fetch||globalThis.fetch.bind(globalThis),s=a.integrity||{},l=await zr(i.href,o,s.manifest,"plugin.json"),u;try{u=JSON.parse(l)}catch{throw new Error("nc-fx plugin: "+i.href+" is not JSON")}var c=ha(u);if(!c.ok)throw new Error("nc-fx plugin: "+i.href+": "+c.errors.join("; "));var d=c.manifest;if(a.expect&&(a.expect.id&&a.expect.id!==d.id||a.expect.version&&a.expect.version!==d.version))throw new Error("nc-fx plugin: "+i.href+" is "+d.id+" "+d.version+", not what the registry lists");var p=ne(fa(d.id));if(p&&p.plugin.version!==d.version)throw gs(d,p.plugin.version);var h=new URL(d.dsp,i),m=await bs(e,d,function(){return zr(h.href,o,s.dsp,"DSP file")},h.href,a.moduleUrl),b=fs(d,{url:i.href,listed:a.listed===!0});return{entry:b,manifest:d,url:i.href,stale:m.stale}}var Zd=256*1024;async function Pr(e,t,n){var a=n||{},i=t||{},o=i.manifest;if(typeof o=="string")try{o=JSON.parse(o)}catch{throw new Error("nc-fx plugin: plugin.json is not JSON")}var s=ha(o);if(!s.ok)throw new Error("nc-fx plugin: plugin.json: "+s.errors.join("; "));var l=s.manifest;if(typeof i.dsp!="string"||!i.dsp.trim())throw new Error("nc-fx plugin: "+l.name+" needs its DSP file, "+l.dsp);if(typeof i.dspName=="string"&&i.dspName!==l.dsp)throw new Error("nc-fx plugin: plugin.json names its DSP file "+l.dsp+", not "+i.dspName);if(new TextEncoder().encode(i.dsp).length>Zd)throw new Error("nc-fx plugin: "+l.dsp+" is over 256 KB");var u=typeof a.url=="string"&&a.url?a.url:"local:"+l.id,c=ne(fa(l.id));if(c&&c.plugin.version!==l.version)throw gs(l,c.plugin.version);var d=i.dsp,p=await bs(e,l,async function(){return d},u.replace(/[^A-Za-z0-9:._@\/-]/g,"_")+"/"+l.dsp,a.moduleUrl),h=fs(l,{url:u,listed:!1});return{entry:h,manifest:l,url:u,stale:p.stale}}function eu(e){var t=[];if(!rn(e)||e.v!==1||!Array.isArray(e.plugins))return{ok:!1,errors:['registry: { "v": 1, "plugins": [...] }'],registry:{v:1,plugins:[]}};var n=[],a={};return e.plugins.forEach(function(i,o){var s="plugins["+o+"]",l=[];if(!rn(i)){t.push(s+": must be an object");return}if((typeof i.id!="string"||!us.test(i.id))&&l.push("id"),rt(i.name,40)||l.push("name"),(typeof i.version!="string"||!ps.test(i.version))&&l.push("version"),rt(i.author,80)||l.push("author"),(typeof i.licence!="string"||!hs.test(i.licence))&&l.push("licence"),(typeof i.manifest!="string"||!i.manifest)&&l.push("manifest"),(!rn(i.integrity)||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(i.integrity.manifest||"")||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(i.integrity.dsp||""))&&l.push("integrity"),(typeof i.checked!="string"||!/^\d{4}-\d{2}-\d{2}/.test(i.checked))&&l.push("checked"),a[i.id]&&l.push("id (listed twice)"),l.length){t.push(s+": bad "+l.join(", "));return}a[i.id]=!0;var u={id:i.id,name:i.name,version:i.version,author:i.author,licence:i.licence,manifest:i.manifest,integrity:{manifest:i.integrity.manifest,dsp:i.integrity.dsp},checked:i.checked};typeof i.description=="string"&&(u.description=i.description.slice(0,200)),n.push(u)}),{ok:t.length===0,errors:t,registry:{v:1,plugins:n}}}async function tu(e,t){var n=t||{},a=new URL(String(e),n.base||(typeof location<"u"?location.href:void 0)),i=await(n.fetch||globalThis.fetch.bind(globalThis))(a.href,{credentials:"omit",cache:"no-cache"});if(!i.ok)throw new Error("nc-fx plugins: the registry "+a.href+" answered "+i.status);var o=eu(await i.json());return{registry:o.registry,url:a.href,errors:o.errors}}function nu(e,t,n,a){return ys(e,new URL(t.manifest,n).href,Object.assign({},a,{integrity:t.integrity,listed:!0,expect:{id:t.id,version:t.version}}))}function au(e,t){var n=t||{},a=n.stallMs>0?n.stallMs:1500,i=n.everyMs>0?n.everyMs:250,o=n.now||function(){return typeof performance<"u"?performance.now():Date.now()},s=n.setInterval||setInterval,l=n.clearInterval||clearInterval,u=e.currentTime,c=o(),d=0,p=!1,h=s(function(){var m=o(),b=m-c,y=e.currentTime;if(c=m,e.state!=="running"||y!==u){u=y,d=0,p&&e.state==="running"&&(p=!1,n.onResume&&n.onResume());return}if(b>4*i){d=0;return}d+=b,!p&&d>=a&&(p=!0,n.onStall&&n.onStall({frozenMs:d,at:y}))},i);return{stop:function(){l(h)},stalled:function(){return p}}}var iu=2,Wn=3,Dr=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function ot(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var ru=/^local:[A-Za-z0-9._@-]{1,200}$/,ou=/^\d+\.\d+\.\d+$/;function su(e,t){var n=ot(e)?e:{},a=t.slice(7),i={id:a,version:typeof n.version=="string"&&ou.test(n.version)?n.version:"0.0.0",url:"",name:a};return typeof n.url=="string"&&n.url.length<=2048&&(/^https?:\/\//.test(n.url)||ru.test(n.url))&&(i.url=n.url),typeof n.name=="string"&&n.name.trim()&&(i.name=n.name.trim().slice(0,40)),i}function ws(e){var t=e.plugin;return{id:t.id,version:t.version,url:t.url,name:e.label}}function lu(e){var t={},n=0;if(ot(e))for(var a in e)n<16&&/^[a-z][a-z0-9_]{0,31}$/.test(a)&&typeof e[a]=="number"&&isFinite(e[a])&&(t[a]=e[a],n++);return t}function cu(e){return e.plugin?e.plugin.idBase:e.type}function vs(e,t){var n=ne(e);if(!n)return null;var a={};(t||[]).forEach(function(u){u&&u.id&&(a[u.id]=!0)});for(var i=1,o=cu(n);a[o+"-"+i];)i++;var s={};n.dials.forEach(function(u){s[u.key]=u.default});var l={id:o+"-"+i,type:n.type,bypass:!1,dials:s};return n.plugin&&(l.plugin=ws(n)),l}function du(e){var t=ne(e.type),n=/-(\d+)$/.exec(e.id||""),a=t?t.label:e.plugin&&e.plugin.name?e.plugin.name:e.type;return a+(n&&+n[1]>1?" "+n[1]:"")}function uu(e,t,n){var a=e.length-1,i=Math.max(0,Math.min(a,n));if(t<0||t>a||t===i)return e;var o=e.slice(),s=o.splice(t,1)[0];return o.splice(i,0,s),o}function pu(e){return typeof e=="number"&&isFinite(e)?Dd(e):e}function Rr(e,t,n){var a={};return e.dials.forEach(function(i){var o=t[i.key];o===void 0&&i.astridKey&&(o=t[i.astridKey]),n&&e.type==="delay"&&i.key==="delay_beats"&&(o=pu(o)),a[i.key]=e.plugin?Re(i,o,i.step):Re(i,o)}),e.dials.forEach(function(i){i.stepWhen&&(a[i.key]=Re(i,typeof t[i.key]=="number"?t[i.key]:a[i.key],zt(i,a)))}),a}function hu(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,i=1/0,o=e.min;o<=e.max;o++){var s=$t(n.law,o),l=s===null?1/0:Math.abs(s-t);l<i&&(i=l,a=o)}return a}}var fu={rate:"rate_hz"};function mu(e,t,n,a){var i={};return e.dials.forEach(function(o){if(!o.more){var s=o.astridKey||fu[o.key]||o.key;i[o.key]=hu(o,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),i}function gu(e,t){var n=t>0?Math.floor(t):Wn,a=[],i=[],o=[],s=!1,l=!1;Array.isArray(e)?(o=e,l=!0):ot(e)&&Array.isArray(e.chain)&&(o=e.chain,s=e.v===1,l=e.schema===2);for(var u=[],c=0;c<o.length;c++){var d=o[c];if(ot(d)&&!(d.type==="limiter"||d.fixed===!0)){var p=Ci(d.type),h=p&&ne(p);if(!h&&!s&&ls(d.type)){if(u.length>=n){a.push(d.id||d.type);continue}for(var m=su(d.plugin,d.type),b=m.id.split(".").pop(),y=1;u.some(function(v){return v.id===b+"-"+y});)y++;var f=typeof d.id=="string"&&Dr.test(d.id)&&!u.some(function(v){return v.id===d.id})?d.id:b+"-"+y;u.push({id:f,type:d.type,bypass:d.bypass===!0,dials:lu(d.dials),plugin:m});continue}if(!h||s&&["drive","delay","plate"].indexOf(p)<0){typeof d.type=="string"&&a.push(d.type);continue}if(u.length>=n){a.push(d.id||p);continue}var g;ot(d.params)&&!ot(d.dials)?g=Rr(h,mu(h,d.params,i,d.id||p),l):g=Rr(h,ot(d.dials)?d.dials:{},l);var w=vs(p,u),k=typeof d.id=="string"&&Dr.test(d.id)&&!u.some(function(v){return v.id===d.id})?d.id:w.id,L=s?d.bypass!==!1:d.bypass===!0,A={id:s?w.id:k,type:p,bypass:L,dials:g};h.plugin&&(A.plugin=ws(h)),u.push(A)}}return{state:{v:iu,chain:u},dropped:a,notes:i}}function lt(e,t){return gu(e,t).state}function wt(e){var t=ne(e.type),n=[[0,e.bypass?0:1]];return t&&t.dials.forEach(function(a){n.push([a.k,Hn(a,e.dials[a.key])])}),n}function bu(e){var t=lt(e,8),n=[],a=t.chain.filter(function(i){return i.plugin?(n.push(i.id+": ASTRID has no plugins"),!1):!0}).map(function(i,o){var s=ne(i.type),l={};return o>=Wn&&n.push(i.id+": ASTRID keeps three hacks"),s.dials.forEach(function(u){var c=i.dials[u.key];if(u.more){c!==u.default&&n.push(i.id+"."+u.key);return}u.key==="delay_beats"&&Qa.indexOf(c)<0&&n.push(i.id+".delay_beats"),l[u.astridKey||u.key]=c}),{id:i.id,type:i.type,bypass:i.bypass,dials:l}});return{hacks:a,lossy:n}}var yu=150,wu=6e3,vu=18,xs=6.283185307179586;function ma(e,t,n){return e<t?t:e>n?n:e}function xu(e,t,n,a,i){var o=Math.pow(10,n/40),s=xs*t/i,l=Math.cos(s),u=Math.sin(s),c,d,p,h,m,b,y,f;if(e===0||e===2){y=u/2*Math.SQRT2,f=2*Math.sqrt(o)*y;var g=e===0?1:-1;c=o*(o+1-g*(o-1)*l+f),d=g*2*o*(o-1-g*(o+1)*l),p=o*(o+1-g*(o-1)*l-f),h=o+1+g*(o-1)*l+f,m=-g*2*(o-1+g*(o+1)*l),b=o+1+g*(o-1)*l-f}else y=u/(2*a),c=1+y*o,d=-2*l,p=1-y*o,h=1+y/o,m=-2*l,b=1-y/o;return[c/h,d/h,p/h,m/h,b/h]}function $u(e,t,n){var a=xs*t/n,i=Math.cos(a),o=Math.sin(a),s=Math.cos(2*a),l=Math.sin(2*a),u=e[0]+e[1]*i+e[2]*s,c=-(e[1]*o+e[2]*l),d=1+e[3]*i+e[4]*s,p=-(e[3]*o+e[4]*l);return 10*Math.log10((u*u+c*c)/(d*d+p*p))}var Or={};function Je(e){return Or[e]||(Or[e]=Ld("eq",e))}function xt(e,t){var n=Je(t),a=e&&typeof e[t]=="number"&&isFinite(e[t])?e[t]:n.default;return ma(a,n.min,n.max)}function $s(e){return[{id:"low",kind:0,hz:yu,db:xt(e,"low_db"),q:Math.SQRT1_2},{id:"mid",kind:1,hz:Hn(Je("mid_hz"),xt(e,"mid_hz")),db:xt(e,"mid_db"),q:Hn(Je("mid_q"),xt(e,"mid_q"))},{id:"high",kind:2,hz:wu,db:xt(e,"high_db"),q:Math.SQRT1_2}]}function ku(e,t,n){for(var a=$s(e),i=n.length,o=new Float64Array(i),s=[],l=t/2,u=0;u<a.length;u++){var c=a[u],d=new Float64Array(i);if(c.db!==0)for(var p=xu(c.kind,c.hz,c.db,c.q,t),h=0;h<i;h++){var m=n[h]<l?n[h]:l*.9999;d[h]=$u(p,m,t),o[h]+=d[h]}s.push(d)}return{total:o,bands:s}}function Eu(e){var t=Je("mid_hz").dsp.law;return ma(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}function Au(e){var t=Je("mid_q").dsp.law;return ma(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}var Yn={low:"low_db",mid:"mid_db",high:"high_db"},Su={low:"Low",mid:"Mid",high:"High"};function Mu(e,t,n){var a=[];function i(o,s){var l=Je(o),u=l.step||1;s=ma(Math.round(s/u)*u,l.min,l.max),s===0&&(s=0),s!==xt(e,o)&&a.push([o,s])}return typeof n.db=="number"&&Yn[t]&&i(Yn[t],n.db),t==="mid"&&typeof n.hz=="number"&&n.hz>0&&i("mid_hz",Eu(n.hz)),t==="mid"&&typeof n.q=="number"&&n.q>0&&i("mid_q",Au(n.q)),a}function Tu(e){var t=e==="mid"?["mid_db","mid_hz","mid_q"]:Yn[e]?[Yn[e]]:[];return t.map(function(n){return[n,Je(n).default]})}var Ln=typeof WeakMap=="function"?new WeakMap:null;function Lu(e){var t=e&&e.output;if(!t||!t.context||typeof t.context.createAnalyser!="function")return null;var n=Ln&&Ln.get(e);return n||(n={node:null,users:0,handle:null},n.handle={open:function(){return e.status==="disposed"?null:(n.node||(n.node=t.context.createAnalyser(),n.node.fftSize=4096,n.node.smoothingTimeConstant=.8,n.node.minDecibels=-110,n.node.maxDecibels=0),n.users++===0&&t.connect(n.node),n.node)},close:function(){if(n.users!==0&&--n.users===0&&n.node)try{t.disconnect(n.node)}catch{}}},Ln&&Ln.set(e,n)),n.handle}function Cu(e,t,n){var a=n||{},i={};["low_db","mid_db","mid_hz","mid_q","high_db"].forEach(function(d){var p=e&&typeof e.getParam=="function"?e.getParam(t,d):void 0;i[d]=typeof p=="number"?p:Je(d).default});var o=e&&e.output&&e.output.context,s=a.sampleRate||o&&o.sampleRate||48e3,l=a.help||{},u=$s(i).map(function(d){var p=(d.db>0?"+":d.db<0?"−":"")+Math.abs(d.db)+" dB",h=d.hz>=1e3?(d.hz/1e3).toFixed(d.hz>=1e4?0:1)+" kHz":Math.round(d.hz)+" Hz";return{id:d.id,label:Su[d.id],kind:d.kind===0?"lowshelf":d.kind===1?"peak":"highshelf",hz:d.hz,db:d.db,q:d.q,moveHz:d.id==="mid",moveQ:d.id==="mid",minHz:d.id==="mid"?200:d.hz,maxHz:d.id==="mid"?5e3:d.hz,minQ:.3,maxQ:6,valueText:d.id==="mid"?p+" at "+h+", Q "+d.q.toFixed(1):p+(d.id==="low"?", shelf below ":", shelf above ")+h,help:l[d.id]}}),c=function(d){for(var p=0;p<d.length;p++)a.set(d[p][0],d[p][1])};return{type:"eqGraph",id:a.id,label:a.label||"EQ curve",range:vu,sampleRate:s,on:a.on!==!1,bands:u,help:l.graph,response:function(d){return ku(i,s,d)},spectrum:a.spectrum===!1?void 0:Lu(e)||void 0,onBand:function(d,p){c(Mu(i,d,p))},onReset:function(d){c(Tu(d).filter(function(p){return p[1]!==i[p[0]]}))}}}var Fu="nc-fx@1",Nu=600,zu=256,Pu=8,Wt=typeof WeakMap=="function"?new WeakMap:null;function ks(e,t){var n=Wt&&Wt.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await vd(async()=>{const{default:o}=await import("./worklet-source-Dvdj1jcP.js");return{default:o}},[])).default,i=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(i)}finally{URL.revokeObjectURL(i)}})(),Wt&&(Wt.set(e,n),n.catch(function(){Wt.delete(e)})),n)}function vt(e,t){return typeof e=="number"&&isFinite(e)?e:t}function Es(e,t,n,a){var i=Math.min(400,Math.max(20,vt(t.bpm,120))),o=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",u=vt(t.preGain,1),c=Math.max(0,vt(t.crossfade,.012)),d=vt(t.maxDelaySeconds,void 0),p=e.createGain(),h=e.createGain(),m=e.createGain(),b=e.createGain(),y=null;t.modInput===!0&&(y=e.createGain(),y.channelCount=1,y.channelCountMode="explicit",y.channelInterpretation="discrete"),b.gain.value=0,p.connect(m),m.connect(h),b.connect(h);var f={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:i,mUsers:0,lv:null,lvAt:0},g=n(i);f.post=function(v){f.node?f.node.port.postMessage(v):f.disposed||(o.length>=zu&&(o=a().concat([{t:"tempo",bpm:f.bpm,when:0}]),f.mUsers>0&&o.push({t:"meter",on:!0})),o.push(v))};function w(v){var x=o.map(function(E){var T=Object.assign({},E);return T.when>v||(T.when=0,T.t!=="clear"&&(T.snap=!0)),T});return o=[],x}f.emit=function(v){for(var x=0;x<f.listeners.length;x++)try{f.listeners[x](v)}catch(E){typeof console<"u"&&console.error(E)}},f.whenOf=function(v){return typeof v=="number"&&isFinite(v)&&v>0?v:0};var k=!1;f.tooFar=function(v){return typeof v=="number"&&v>e.currentTime+Nu?(!k&&typeof console<"u"&&(k=!0,console.warn("nc-fx: ignoring a time "+Math.round(v-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var L=ks(e,t.moduleUrl).then(function(){if(!f.disposed){var v=Object.assign({bpm:i,bypassMode:l,limiter:s,preGain:u,maxDelaySeconds:d},g);v.pending=w(e.currentTime),f.node=new AudioWorkletNode(e,Fu,{numberOfInputs:y?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:v}),f.node.port.onmessage=function(E){var T=E.data;if(T&&T.t==="lv"&&f.mUsers>0)f.lv=T.d,f.lvAt=qr();else if(T&&T.t==="perr"&&f.onPluginError&&T.d)for(var N=0;N<(T.n|0);N++)f.onPluginError(T.d[2*N],T.d[2*N+1])},p.connect(f.node),y&&y.connect(f.node,0,1),f.node.connect(b);var x=e.currentTime;x<=0||c===0?(m.gain.value=0,b.gain.value=1):(m.gain.setValueAtTime(1,x),m.gain.linearRampToValueAtTime(0,x+c),b.gain.setValueAtTime(0,x),b.gain.linearRampToValueAtTime(1,x+c)),f.status="ready"}},function(v){f.status="unavailable",o=[],f.error=v});f.meterOpen=function(){return f.disposed||f.status==="unavailable"?!1:(f.mUsers++===0&&f.post({t:"meter",on:!0}),!0)},f.meterClose=function(){f.mUsers!==0&&--f.mUsers===0&&(f.lv=null,f.disposed||f.post({t:"meter",on:!1}))},f.levels=function(){return f.lv&&qr()-f.lvAt<Du?f.lv:null};var A={};return f.meter=function(v,x){if(A[v])return A[v];var E=0,T={in:0,out:0},N={open:function(){return f.meterOpen()?(E++,!0):!1},close:function(){E!==0&&(E--,f.meterClose())},read:function(){var z=E>0?f.levels():null;return T.in=0,T.out=0,z&&x(z,T),T}};return A[v]=N,N},f.core={input:p,output:h,modInput:y,ready:L,get status(){return f.status},get error(){return f.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function(v,x){var E=vt(v,NaN);!(E>0)||f.disposed||f.tooFar(x)||(f.bpm=Math.min(400,Math.max(20,E)),f.post({t:"tempo",bpm:f.bpm,when:f.whenOf(x)}),f.emit({effect:null,key:"tempo",value:f.bpm}))},getTempo:function(){return f.bpm},clear:function(v){var x=v&&typeof v=="object"?v:{at:v};if(!(f.disposed||f.tooFar(x.at))){var E=vt(x.fadeMs,0);f.post({t:"clear",when:f.whenOf(x.at),fadeMs:E>0?Math.min(1e3,E):0})}},onChange:function(v){return f.listeners.push(v),function(){var x=f.listeners.indexOf(v);x>=0&&f.listeners.splice(x,1)}},dispose:function(){if(!f.disposed){if(f.disposed=!0,f.status="disposed",o=[],f.listeners.length=0,f.node){f.node.port.postMessage({t:"dispose"}),f.node.port.close();try{f.node.disconnect()}catch{}}[p,m,b,h,y].forEach(function(v){try{v&&v.disconnect()}catch{}})}}},f}var Du=250;function qr(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function As(e,t){t.in=e[0],t.out=e[1]}function Fa(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function Na(e,t){var n=t||{};if(n.slots)return Ru(e,n);var a=Vn(n.state),i=Array.from(Ta(a)),o=Es(e,n,function(){return{program:i}},function(){return[{t:"load",program:Array.from(Ta(a)),when:0}]}),s=o.core;function l(u){return a.chain[ua.indexOf(u)]}return s.setParam=function(u,c,d,p){var h=Un(u);if(!(!h||o.disposed||o.tooFar(p))){var m=l(h),b;if(c==="bypass")b=!!d;else{var y=ds(h,c);if(!y)return;b=Re(y,d,zt(y,m.dials))}return c==="bypass"?m.bypass=b:m.dials[c]=b,o.post({t:"p",i:Ja[h][c],v:Za(h,c,b),when:o.whenOf(p)}),o.emit({effect:h,key:c,value:b}),pa(h).dials.forEach(function(f){if(!(!f.stepWhen||!f.stepWhen.some(function(k){return k.key===c}))){var g=m.dials[f.key],w=Re(f,g,zt(f,m.dials));w!==g&&(m.dials[f.key]=w,o.post({t:"p",i:Ja[h][f.key],v:Za(h,f.key,w),when:o.whenOf(p)}),o.emit({effect:h,key:f.key,value:w}))}}),b}},s.meter=function(){return o.meter("",As)},s.getParam=function(u,c){var d=Un(u);if(d){var p=l(d);return c==="bypass"?p.bypass:p.dials[c]}},s.getState=function(){return qd(a)},s.setState=function(u,c){o.disposed||o.tooFar(c&&c.at)||(a=Vn(u),o.post({t:"load",program:Array.from(Ta(a)),when:o.whenOf(c&&c.at)}),o.emit({effect:null,key:null,value:null}))},s}function Ru(e,t){var n=t.slots===!0?Wn:Math.max(1,Math.min(Pu,Math.floor(+t.slots)||Wn)),a=lt(t.state,n),i=1,o={},s={};function l(v){return!ls(v.type)||ne(v.type)!==null}function u(v){var x=ne(v.type);return x&&x.plugin?x.plugin.engine:v.type}function c(v){return o[v.id]||(o[v.id]=i++),o[v.id]}function d(v){return v.filter(l).map(function(x){return{uid:c(x),type:u(x),program:wt(x)}})}function p(){return a.chain.filter(l).map(function(v){return o[v.id]})}var h=d(a.chain),m=p(),b=Es(e,t,function(){return{slots:n,chain:h,order:m}},function(){return[{t:"sync",chain:d(a.chain),order:p(),when:0}]}),y=b.core;b.onPluginError=function(v,x){for(var E in o)o[E]===v&&(s[E]=x,b.emit({effect:E,key:"error",value:x}))};function f(v){var x;for(x=0;x<a.chain.length;x++)if(a.chain[x].id===v)return a.chain[x];var E=Ci(v);if(E){for(x=0;x<a.chain.length;x++)if(a.chain[x].type===E)return a.chain[x]}return null}function g(v,x){var E=c(v);b.post({t:"add",uid:E,type:u(v),when:x}),wt(v).forEach(function(T){b.post({t:"ps",uid:E,k:T[0],v:T[1],when:x,snap:!0})})}function w(v){b.post({t:"order",uids:p(),when:v})}function k(v,x){var E={};a.chain.forEach(function(z){E[z.id]=z});var T=p().join();v.chain.forEach(function(z){var U=E[z.id];if(!l(z)){delete o[z.id];return}if(!U||U.type!==z.type||!o[z.id]){delete o[z.id],delete s[z.id],g(z,x);return}var K={};wt(U).forEach(function(X){K[X[0]]=X[1]}),wt(z).forEach(function(X){K[X[0]]!==X[1]&&b.post({t:"ps",uid:o[z.id],k:X[0],v:X[1],when:x})})});var N={};v.chain.forEach(function(z){N[z.id]=!0}),Object.keys(o).forEach(function(z){N[z]||delete o[z]}),Object.keys(s).forEach(function(z){N[z]||delete s[z]}),a=v,p().join()!==T&&w(x)}var L=Td(function(v){if(!(b.disposed||!a.chain.some(function(E){return E.type===v}))){var x=JSON.parse(JSON.stringify(a));x.chain=x.chain.map(function(E){return E.type===v?lt({v:2,chain:[E]},1).chain[0]:E}),k(x,0),b.emit({effect:null,key:"plugin",value:v})}}),A=y.dispose;return y.dispose=function(){L(),A()},y.slots=n,y.meter=function(v){return v==null||v===""?b.meter("",As):b.meter("#"+v,function(x,E){var T=f(v),N=T?o[T.id]:0,z=x[2];if(N){for(var U=3,K=0;K<z;K++,U+=3)if(x[U]===N){E.in=x[U+1],E.out=x[U+2];return}}})},y.setParam=function(v,x,E,T){var N=f(v);if(!(!N||b.disposed||b.tooFar(T))){var z=ne(N.type),U,K=null;if(!z)return x!=="bypass"?void 0:(N.bypass=!!E,b.emit({effect:N.id,key:x,value:N.bypass}),N.bypass);if(x==="bypass")U=!!E;else{for(var X=0;X<z.dials.length;X++)z.dials[X].key===x&&(K=z.dials[X]);if(!K)return;U=Re(K,E,zt(K,N.dials))}var fe={},me={};wt(N).forEach(function(B){fe[B[0]]=B[1]}),z.dials.forEach(function(B){B.stepWhen&&(me[B.key]=N.dials[B.key])}),x==="bypass"?N.bypass=U:N.dials[x]=U,z.dials.forEach(function(B){B.stepWhen&&(N.dials[B.key]=Re(B,N.dials[B.key],zt(B,N.dials)))});var be=b.whenOf(T),re=o[N.id];return re&&wt(N).forEach(function(B){(fe[B[0]]!==B[1]||K&&B[0]===K.k)&&b.post({t:"ps",uid:re,k:B[0],v:B[1],when:be})}),b.emit({effect:N.id,key:x,value:U}),Object.keys(me).forEach(function(B){B!==x&&N.dials[B]!==me[B]&&b.emit({effect:N.id,key:B,value:N.dials[B]})}),U}},y.getParam=function(v,x){var E=f(v);if(E)return x==="bypass"?E.bypass:E.dials[x]},y.getState=function(){return JSON.parse(JSON.stringify(a))},y.setState=function(v,x){b.disposed||b.tooFar(x&&x.at)||(k(lt(v,n),b.whenOf(x&&x.at)),b.emit({effect:null,key:null,value:null}))},y.addEffect=function(v,x){var E=x||{},T=vs(v,a.chain);if(!(!T||a.chain.length>=n||b.disposed||b.tooFar(E.at))){if(E.dials){var N=lt({v:2,chain:[{id:T.id,type:T.type,dials:E.dials}]},1).chain[0];T.dials=N.dials}E.bypass===!0&&(T.bypass=!0);var z=a.chain.slice(),U=typeof E.index=="number"?Math.max(0,Math.min(z.length,E.index)):z.length;return z.splice(U,0,T),k({v:2,chain:z},b.whenOf(E.at)),b.emit({effect:T.id,key:"chain",value:"add"}),T.id}},y.removeEffect=function(v,x){var E=f(v),T=x&&x.at;return!E||b.disposed||b.tooFar(T)?!1:(k({v:2,chain:a.chain.filter(function(N){return N!==E})},b.whenOf(T)),b.emit({effect:E.id,key:"chain",value:"remove"}),!0)},y.moveEffect=function(v,x,E){var T=f(v),N=E&&E.at;if(!T||b.disposed||b.tooFar(N))return!1;var z=uu(a.chain,a.chain.indexOf(T),x);return z===a.chain?!1:(k({v:2,chain:z},b.whenOf(N)),b.emit({effect:T.id,key:"chain",value:"move"}),!0)},y.getChain=function(){return a.chain.map(function(v){var x={id:v.id,type:v.type,name:du(v),bypass:v.bypass};if(v.plugin){var E=s[v.id]||0,T=!l(v)||E===5;x.plugin={id:v.plugin.id,version:v.plugin.version,url:v.plugin.url,name:v.plugin.name,status:T?"missing":E?"failed":"ready"},E&&!T&&(x.plugin.error=Gn[E]||Gn[2])}return x})},y.toAstrid=function(){return bu(a)},y}function Ir(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function Ss(e,t,n){var a=n||{},i=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,o=typeof a.toAudioTime=="function"?a.toAudioTime:i?function(h){return i.toContextTime(h)}:t&&t.timebase==="shared"?null:function(h){return h},s=typeof a.now=="function"?a.now:i&&typeof i.sharedNow=="function"?function(){return i.sharedNow()}:null,l=t&&t.transport?t.transport:t,u=l&&l.tempo?l.tempo:l,c=!1;function d(h){if(!o){!c&&typeof console<"u"&&(c=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof h!="number")){var m=o(l.timeAt(h));return typeof m=="number"&&isFinite(m)?m:void 0}}function p(){var h=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(h)){var m=l&&typeof l.bpm=="number"?l.bpm:Ir(u,0);m>0&&e.setTempo(m);return}var b=Ir(u,h);b>0&&e.setTempo(b);for(var y=u&&(u.points||u.tempoPoints)||[],f=0;f<y.length;f++){var g=y[f];if(g.beat>h&&g.bpm>0){var w=d(g.beat);w!==void 0&&e.setTempo(g.bpm,w)}}}return p(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(h){h&&(h.kind==="tempo"&&h.bpm>0?e.setTempo(h.bpm,d(h.atBeat)):(h.kind==="snapshot"||h.kind==="start")&&p())})}const on="/studio/assets/worklet-C1cegAfk.js";var Ou="nc-ui",qu={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","nyx-amber":"#FEAA02","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Fi={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#9B30FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Kn={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Iu={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Xe={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},_u={light:{color:qu.color,semantic:Fi,component:Kn,runtime:Iu},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},Qt=e=>`--${Ou}-${e}`,ei=Fi["label-on-fill-dark"],_r=Fi["label-on-fill-light"],Bu=Xe["label-min-contrast"],ju=/^#[0-9a-f]{6}$/i,Hu=e=>typeof e=="string"&&ju.test(e),On=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Br(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),i=o=>{let s=(o+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${On(i(0)*255)}${On(i(8)*255)}${On(i(4)*255)}`}function Ms(e){let[t,n,a]=[1,3,5].map(c=>parseInt(e.slice(c,c+2),16)/255),i=Math.max(t,n,a),o=Math.min(t,n,a),s=(i+o)/2,l=i-o;if(!l)return{h:0,s:0,l:s};let u=l/(1-Math.abs(2*s-1));return{h:((i===t?60*((n-a)/l%6):i===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:u,l:s}}function jr(e){let[t,n,a]=[1,3,5].map(i=>{let o=parseInt(e.slice(i,i+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function ti(e,t){let[n,a]=[jr(e),jr(t)].sort((i,o)=>o-i);return(n+.05)/(a+.05)}var Xn=e=>ti(e,ei)>=ti(e,_r)?ei:_r;function Ts(e,t,n,a=Bu){let i=Br(e,t,n),o=Xn(i)===ei?1:-1;for(let s=0;s<40&&ti(i,Xn(i))<a;s++)n+=o*.01,i=Br(e,t,n);return i}function Uu(e){let{h:t,s:n}=Ms(e),a=Ts(t,Math.min(n,Xe["surprise-on-max-saturation"]),Xe["surprise-on-lightness"]);return{fill:e,ink:Xn(e),on:a,onInk:Xn(a)}}var Vu=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function Gu(e,t=Math.random){let[n,a]=Xe["surprise-saturation"],[i,o]=Xe["surprise-lightness"],s=Xe["surprise-min-hue-gap"],l=Hu(e)?Ms(e).h:null,u=t()*360;return l!==null&&Vu(u,l)<s&&(u=(l+s+t()*(360-2*s))%360),Ts(u,n+t()*(a-n),i+t()*(o-i))}function Wu(e){if(!e)return null;let t=Uu(e);return{[Qt("surprise-fill")]:t.fill,[Qt("surprise-ink")]:t.ink,[Qt("surprise-on")]:t.on,[Qt("surprise-on-ink")]:t.onInk}}var Yu=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Ku=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Hr(e){let[t,n,a]=[1,3,5].map(l=>Yu(parseInt(e.slice(l,l+2),16)/255)),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),o=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*i+.793617785*o-.0040720468*s,1.9779984951*i-2.428592205*o+.4505937099*s,.0259040371*i+.7827717662*o-.808675766*s]}function Xu([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,i=(e-.1055613458*t-.0638541728*n)**3,o=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*i+.2309699292*o,-1.2684380046*a+2.6097574011*i-.3413193965*o,-.0041960863*a-.7034186147*i+1.707614701*o].map(s=>On(Ku(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Qu=Xe["velocity-range"],Ls={min:Kn.rhythm["velocity-min"],max:Kn.rhythm["velocity-max"]},Ur=Object.fromEntries(Object.entries(_u).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Ju(e,t=Ls){let[n,a]=Qu,i=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,o=(i-n)/(a-n),s=t.ink??Kn.rhythm["step-cell-ink"];if(o<=0)return{velocity:i,t:0,fill:t.min.toUpperCase(),ink:s};if(o>=1)return{velocity:i,t:1,fill:t.max.toUpperCase(),ink:s};let l=Hr(t.min),u=Hr(t.max);return{velocity:i,t:o,fill:Xu(l.map((c,d)=>c+(u[d]-c)*o)),ink:s}}function Vr(e,t=Ls){return{[Qt("velocity-fill")]:Ju(e,t).fill}}var Qn="data-nc-theme",ni="nc-ui-theme-change",Zu=Object.freeze(["system","light","dark"]),ep="netcomposer.studio.theme.v1",tp="(prefers-color-scheme: dark)",Ni=e=>e?.documentElement??null,Cs=e=>e?.defaultView?.matchMedia?.(tp)??null,zi=e=>e==="light"||e==="dark"?e:"system";function np(e=globalThis.document){return zi(Ni(e)?.getAttribute(Qn))}function Jn(e=globalThis.document){let t=np(e);return t!=="system"?t:Cs(e)?.matches?"dark":"light"}function Pi(e,t=globalThis.document){let n=Ni(t);if(!n)return"light";let a=zi(e);a==="system"?n.removeAttribute(Qn):n.setAttribute(Qn,a);let i=Jn(t),o=t.defaultView?.CustomEvent;return o&&t.dispatchEvent(new o(ni,{detail:{choice:a,theme:i}})),i}function Fs(e,t=globalThis.document){let n=Ni(t);if(!n)return()=>{};let a=Jn(t),i=()=>{let u=Jn(t);u!==a&&(a=u,e(u))},o=t.defaultView?.MutationObserver,s=o?new o(i):null;s?.observe(n,{attributes:!0,attributeFilter:[Qn]});let l=Cs(t);return l?.addEventListener?.("change",i),t.addEventListener(ni,i),()=>{s?.disconnect(),l?.removeEventListener?.("change",i),t.removeEventListener(ni,i)}}var ap={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},ip={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},rp={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},op={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},ga={};for(let[e,t]of Object.entries(ip))ga[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(op))ga[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(rp))ga[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(ap.renames.map(e=>[e.old,e.new]));function Ns(e){let t=ga[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function J(e){return Ns(e).prop}function r(e){return`var(${J(e)})`}function sp(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(J(t)));return Number.isFinite(n)?n:0}function se(e,t){let n=Ns(t),a=e.ownerDocument??document,i=a.createElement("span");i.dataset.ncLive=t,i.style.position="absolute",i.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?i.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?i.style.paddingLeft=o:i.style.color=o,(e instanceof Element?e:a.documentElement).append(i);let s=(a.defaultView??window).getComputedStyle(i),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return i.remove(),l}function zs(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function lp(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=r("font-ui"),n.style.fontSize=r("label-size"),n.style.fontWeight=r("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var cp="[data-modulated], [data-modulated] *",Ps="(orientation: landscape) and (max-height: 500px) and (max-width: 1023px)";function za(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function Gr(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${r("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${r("hairline")} solid ${r("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function dp(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${r(`module-bg-stack-${a}`)};
      ${J("text-sub")}: ${r(`module-sub-stack-${a}`)};
      ${J("divider")}: ${r(`module-div-stack-${a}`)};
      ${J("slider-track")}: ${r(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${r(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${r(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${r("module-bg-stack-1")};
      ${J("text-sub")}: ${r("module-sub-stack-1")};
      ${J("divider")}: ${r("module-div-stack-1")};
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
${cp} { transition: none; }
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
  ${J("text-sub")}: ${r("module-sub-stack-1")};
  ${J("divider")}: ${r("module-div-stack-1")};
  ${J("slider-track")}: ${r("module-div-stack-1")};
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
  ${J("text-sub")}: ${r("module-sub-stack-1")};
  ${J("divider")}: ${r("module-div-stack-1")};
  ${J("slider-track")}: ${r("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${r("control-gap")} ${r("module-pad")};
  padding-bottom: ${r("module-pad")};
  background: ${r("module-bg-stack-1")};
  ${J("text-sub")}: ${r("module-sub-stack-1")};
  ${J("divider")}: ${r("module-div-stack-1")};
  ${J("slider-track")}: ${r("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${r("stack-card-pad-y")} ${r("module-pad")} ${r("module-pad")};
  ${J("text-sub")}: inherit;
  ${J("divider")}: inherit;
  ${J("slider-track")}: inherit;
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
@media (pointer: coarse) {
  .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-template-rows: ${r("target-min")}; column-gap: 0; justify-self: stretch; }
}
/* M and S on a channel strip: the kit's outlined squares, their hairline the one for the strip's own shade
   (strip-divider). The console's body hands its stack-1 hairline down, a near match for the light strip (gone there)
   but lighter than the alternate one (a light box there), so M and S showed boxes on every other strip only. */
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${J("divider")}: ${r("strip-divider")}; }
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
${Gr("")}
}
@media (max-width: 1023px) {
${Gr("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${za("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${za("")}
}
@media (max-width: 1023px) {
${za("html[data-nc-landscape] ")}
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
`}var Pa=null,up="nc-ui-fallback";function Ds(e=globalThis.document){if(!e?.documentElement||(e.documentElement,Pa&&Pa.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${up} {
${dp()}
}
`,e.head.append(t),Pa=t}var Yt=null,pp=0,hp=new URL("/studio/assets/confirm-BSJWrX8s.css",import.meta.url).href,Rs=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=hp,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Rs(document);function ct(e){return Os(e).then(t=>!!t.ok)}function Os({title:e,body:t,confirmLabel:n="Confirm",cancelLabel:a="Cancel",danger:i=!1,root:o,returnFocus:s,signal:l},u){if(Yt||l?.aborted)return Promise.resolve({});let c=o?.ownerDocument??document,d=Rs(c),p=o??c.body,h=c.defaultView??globalThis,m=`nc-ui-confirm-${++pp}`,b=(_,ce,ue)=>{let le=c.createElement(_);return le.className=`nc-ui-confirm${ce}`,ue!=null&&(le.textContent=ue),le},y=b("div","-layer");y.dataset.state="enter";let f=b("div","");f.setAttribute("role","alertdialog"),f.setAttribute("aria-modal","true"),f.setAttribute("aria-labelledby",`${m}-t`),f.setAttribute("aria-describedby",`${m}-b`);let g=b("h2","-title",e);g.id=`${m}-t`;let w=b("p","-body",t);w.id=`${m}-b`;let k=b("div","-actions"),L=(_,ce)=>{let ue=b("button","-btn",_);return ue.type="button",ue.dataset.ncConfirm=ce,ue.addEventListener("click",()=>Ee(ce==="ok")),ue},A=L(a,"cancel"),v=L(n,"ok");i&&(v.dataset.danger="true"),k.append(A,v);let[x,E]=u?.(b,v)??[];f.append(g,w,...x?[x]:[],k);let T=[E,A,v].filter(Boolean);y.append(f);let N={layer:y};Yt=N;let z=s??c.activeElement,U=[];for(let _ of p.children)_.hasAttribute("inert")||(_.setAttribute("inert",""),U.push(_));let K=()=>{if(Yt!==N)return;p.append(y),(E??A).focus({preventScroll:!0});let _=h.requestAnimationFrame?.bind(h)??(ce=>setTimeout(ce,16));_(()=>_(()=>{y.dataset.state==="enter"&&(y.dataset.state="open")}))};d?d.then(K):K();let X=!1;y.addEventListener("pointerdown",_=>{X=_.target===y}),y.addEventListener("click",_=>{_.target===y&&X&&Ee(!1),X=!1});let fe=_=>{if(_.stopImmediatePropagation(),_.key==="Escape")_.preventDefault(),Ee(!1);else if(_.key==="Tab"){_.preventDefault();let ce=T.filter(le=>!le.disabled),ue=ce.length;ce[(ce.indexOf(c.activeElement)+(_.shiftKey?ue-1:1))%ue].focus()}else _.key==="Enter"&&(_.preventDefault(),c.activeElement===A?Ee(!1):v.disabled||Ee(!0))},me=_=>_.stopImmediatePropagation();h.addEventListener("keydown",fe,!0),h.addEventListener("keyup",me,!0);let be=()=>Ee(!1);l?.addEventListener("abort",be);let re,B=new Promise(_=>{re=_});function Ee(_){if(Yt!==N)return;Yt=null,h.removeEventListener("keydown",fe,!0),h.removeEventListener("keyup",me,!0),l?.removeEventListener("abort",be);for(let Le of U)Le.removeAttribute("inert");y.dataset.state="closing",z?.isConnected&&typeof z.focus=="function"&&z.focus({preventScroll:!0});let ce=h.getComputedStyle?.(y),ue=Math.max(0,...String(ce?.transitionDuration??"").split(",").map(Le=>Number.parseFloat(Le)*(Le.trim().endsWith("ms")?1:1e3)||0)),le=()=>y.remove();y.addEventListener("transitionend",Le=>Le.target===y&&le()),setTimeout(le,ue+50),re({ok:_,value:E?.value.trim()})}return B}function fp(e){let t=e.field??{};return Os(e,(n,a)=>{let i=n("label","-field"),o=n("input","-input");o.type=t.type??"text",o.value=t.value??"",t.placeholder&&(o.placeholder=t.placeholder),o.spellcheck=!1,o.autocomplete="off";let s=()=>{a.disabled=o.value.trim()===""};return o.addEventListener("input",s),s(),i.append(n("span","-label",t.label??""),o),[i,o]}).then(n=>n.ok?n.value:null)}function qs(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let i=t.createElement("span");i.dataset.ncOn="",i.textContent=e.onText??"On";let o=t.createElement("span");o.dataset.ncOff="",o.textContent=e.offText??"Off",a.append(i,o),n.append(a);let s=!1,l=c=>{s=c===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let u=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",u),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",u),n.remove()}}}var Is=new WeakMap,Wr=.25;function mp(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let i=t.createElement("span");i.className="nc-fader-cap",i.setAttribute("aria-hidden","true"),n.append(a,i);let o=0,s=e.step??.005,l=e.onChange,u=e.onReset,c=f=>Math.min(1,Math.max(0,f)),d=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},p=f=>{let g=c(f);g!==o&&(o=g,d(),l?.(g))},h=0,m=!1;n.addEventListener("pointerdown",f=>{if(f.button!==0)return;f.preventDefault(),n.focus?.({preventScroll:!0});let g=n.getBoundingClientRect();f.target!==i&&g.height>0&&p(1-(f.clientY-g.top)/g.height),h=f.clientY,m=!0,n.dataset.dragging="true",n.setPointerCapture?.(f.pointerId)}),n.addEventListener("pointermove",f=>{if(!m)return;let g=n.getBoundingClientRect().height||1,w=(h-f.clientY)/g*(f.shiftKey?Wr:1);h=f.clientY,p(o+w)});let b=()=>{m=!1,delete n.dataset.dragging};n.addEventListener("pointerup",b),n.addEventListener("pointercancel",b),n.addEventListener("lostpointercapture",b),n.addEventListener("dblclick",f=>{f.preventDefault(),u?.()}),n.addEventListener("keydown",f=>{let g=f.shiftKey?s*Wr:s,w={ArrowUp:o+g,ArrowRight:o+g,ArrowDown:o-g,ArrowLeft:o-g,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};f.key in w&&(f.preventDefault(),p(w[f.key]))});let y={el:n,get value(){return o},get dragging(){return m},set(f){m||(o=c(Number(f)||0),d())},setText(f){f?n.setAttribute("aria-valuetext",f):n.removeAttribute("aria-valuetext")},setLabel(f){n.setAttribute("aria-label",f)},configure(f){typeof f.step=="number"&&f.step>0&&(s=f.step),f.onChange&&(l=f.onChange),f.onReset&&(u=f.onReset)}};return y.setLabel(e.label),y.set(e.value??0),y.setText(e.valueText),Is.set(n,y),y}function gp(e){return Is.get(e)}var _s=new WeakMap,bp=.2,yp=1.5,wp=.5;function vp(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function Yr(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:vp(a.getComputedStyle(e).getPropertyValue(J(t)),n)}function xp(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let i=t.createElement("button");i.type="button",i.className="nc-meter-clip",i.dataset.lit="false";let o=t.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let y=0;y<n;y++){let f=t.createElement("span");f.className="nc-meter-bar";let g=t.createElement("span");g.className="nc-meter-peak";let w=t.createElement("span");w.className="nc-meter-rms";let k=t.createElement("span");k.className="nc-meter-hold",f.append(g,w,k),o.append(f),s.push({peak:g,rms:w,hold:k,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(i,o);let l=e.label,u=e.onClear,c=!1,d=-1,p=-1,h=()=>{i.dataset.lit=c?"true":"false",i.setAttribute("aria-pressed",c?"true":"false"),i.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),i.title=c?"Clipped. Click to clear":"Clip light"},m=(y,f,g,w)=>{let k=Math.round(w*1e3)/1e3;g[f]!==k&&(g[f]=k,y.style.transform=f==="hold"?`translateY(${Math.round((1-k)*1e3)/10}%)`:`scaleY(${k})`)};i.addEventListener("click",()=>{b.clear(),u?.()});let b={el:a,get clipped(){return c},update(y,f){d<0&&(d=Yr(a,"motion-meter-fall",bp)),p<0&&(p=Yr(a,"motion-meter-hold",yp));let g=Math.max(0,Math.min(.25,Number(f)||0)),w=d>0?Math.exp(-g/d):0;s.forEach((k,L)=>{let A=y[L]??y[0]??{peak:0,rms:0},v=Math.min(1,Math.max(0,Number(A.peak)||0)),x=Math.min(v,Math.max(0,Number(A.rms)||0));A.over&&b.clip(),k.level.peak=v>=k.level.peak?v:v+(k.level.peak-v)*w,k.level.rms=x>=k.level.rms?x:x+(k.level.rms-x)*w,k.holdAge+=g,v>=k.holdAt?(k.holdAt=v,k.holdAge=0):k.holdAge>p&&(k.holdAt=Math.max(v,k.holdAt-wp*g)),m(k.peak,"peak",k.shown,k.level.peak),m(k.rms,"rms",k.shown,k.level.rms),m(k.hold,"hold",k.shown,k.holdAt),k.hold.dataset.off=k.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,h())},clear(){c=!1,h()},reset(){for(let y of s)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,m(y.peak,"peak",y.shown,0),m(y.rms,"rms",y.shown,0),m(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,h()},configure(y){y.onClear&&(u=y.onClear)}};return h(),b.reset(),_s.set(a,b),b}function Bs(e){return e?_s.get(e):void 0}var $p=3,kp=new Set(["freq","q","rate","time","log"]);function Di(e,t,n){return!e||!kp.has(e)||!(n>t)?"linear":t>0?"log":"power"}function ba(e,t,n){return Di(e,t,n)!=="linear"}function Ri(e,t,n,a){let i=Number(a);if(!(n>t)||!Number.isFinite(i))return 0;let o=Math.min(n,Math.max(t,i)),s=Di(e,t,n);if(s==="log")return Math.log(o/t)/Math.log(n/t);let l=(o-t)/(n-t);return s==="power"?Math.cbrt(l):l}function js(e,t,n,a){let i=Math.min(1,Math.max(0,Number(a)||0)),o=Di(e,t,n);return o==="log"?t*(n/t)**i:t+(n-t)*(o==="power"?i**$p:i)}function Hs(e,t,n,a){let i=Math.min(n,Math.max(t,e));if(a>0){i=t+Math.round((i-t)/a)*a;let o=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));i=Number(i.toFixed(o)),i=Math.min(n,Math.max(t,i))}return i}function Oi(e,t,n,a){return Math.round(Ri(e,t,n,a)*1e3)}function ai(e,t,n,a,i){return Hs(js(e,t,n,Number(a)/1e3),t,n,i)}function Ep(e,t,n=!1){let a=Number(e)||0,i=n?1:1e3/100,o=null;return t==="ArrowRight"||t==="ArrowUp"?o=a+i:t==="ArrowLeft"||t==="ArrowDown"?o=a-i:t==="PageUp"?o=a+1e3/10:t==="PageDown"?o=a-1e3/10:t==="Home"?o=0:t==="End"&&(o=1e3),o===null?null:Math.min(1e3,Math.max(0,Math.round(o)))}function Us(e,t,n,a,i,o=!1,s){let l=Oi(e,t,n,a),u=Ep(l,i,o);if(u===null)return null;let c=ai(e,t,n,u,s),d=Math.sign(u-l),p=Hs(Number(a),t,n,s);for(;d!==0&&c===p&&u>0&&u<1e3;)u+=d,c=ai(e,t,n,u,s);return c}function Kr(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function Xr(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function Ap(e,t,n,a=n/6){let i=e.some(d=>d===null),o=Math.max(0,n-(i?a:0)),s=e.reduce((d,p,h)=>p===null?d:d+Xr(t[h]),0),l=s>0?o/s:0,u=e.map(d=>d===null?0:Math.min(o,Xr(d)*l));if(i){let d=u.reduce((h,m)=>h+m,0),p=e.indexOf(null);u[p]=Math.max(a,n-d)}let c=[0];for(let d of u)c.push(Math.round((c[c.length-1]+d)*100)/100);return i&&(c[c.length-1]=n),c}function Sp(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.floor(t*a)),o=Math.max(1,Math.floor(n*a));(e.width!==i||e.height!==o)&&(e.width=i,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function Ve(e){return Math.max(0,Math.min(1,e))}function Vs(e,t){let{ctx:n,w:a,h:i}=Sp(e);if(!n)return;n.clearRect(0,0,a,i);let o=lp(e);if(t.paint==="swatch"){let u=se(e,"accent"),c=se(e,"rhythm.step-cell-on");e.dataset.ncAccent=u,e.dataset.ncStep=c,n.fillStyle=u,n.fillRect(0,0,a/2,i),n.fillStyle=c,n.fillRect(a/2,0,a/2,i);return}if(t.paint==="filter"&&typeof t.hz=="number"){Lp(n,a,i,t,e,o);return}if(t.paint==="filter"){let u=t.mode??"lp",c=se(e,zs(u)),d=se(e,"divider"),p=Ve(t.cutoff??.5),h=.08+(1-Ve(t.resonance??.2))*.22;n.strokeStyle=d,n.beginPath(),n.moveTo(0,i*.72),n.lineTo(a,i*.72),n.stroke(),n.beginPath();for(let m=0;m<=a;m++){let b=m/Math.max(1,a),y=0;u==="lp"?y=b<p?1:Math.max(0,1-(b-p)/h):u==="hp"?y=b>p?1:Math.max(0,1-(p-b)/h):y=Math.max(0,1-Math.abs(b-p)/h);let f=i*.78-y*i*.62;m===0?n.moveTo(m,f):n.lineTo(m,f)}n.strokeStyle=c,n.stroke(),n.fillStyle=se(e,"text-sub"),n.font=o,n.fillText(u.toUpperCase(),0,i),e.dataset.ncAccent=c;return}if(t.paint==="envelope"){n.strokeStyle=se(e,"accent");let u=Math.max(0,t.attack??0),c=Math.max(0,t.decay??.4),[d,p,h]=Ap([u,c],t.max??[1,4],a),m=2,b=i-1;n.beginPath(),n.moveTo(d,b),n.lineTo(p,m);let y=Math.max(1,Math.ceil(h-p));for(let f=1;f<=y;f++){let g=f/y;n.lineTo(p+(h-p)*g,b-(b-m)*Math.exp(-4.6*g)*(1-g*.01))}n.lineTo(h,b),n.lineTo(a,b),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let u=Array.isArray(t.peaks)?t.peaks:[],[c,d]=Array.isArray(t.region)?t.region:[0,1],p=se(e,"accent"),h=se(e,"text-sub"),m=i/2;n.fillStyle=se(e,"accent-soft"),n.fillRect(Ve(c)*a,0,(Ve(d)-Ve(c))*a,i),n.strokeStyle=se(e,"divider"),n.beginPath(),n.moveTo(0,m),n.lineTo(a,m),n.stroke();let b=Math.floor(u.length/2);for(let y=0;y<b;y++){let f=(y+.5)/b*a,g=Math.max(-1,Math.min(1,u[y*2]??0)),w=Math.max(-1,Math.min(1,u[y*2+1]??0)),k=(y+.5)/b;n.strokeStyle=k>=c&&k<=d?p:h,n.beginPath(),n.moveTo(f,m-w*(m-1)),n.lineTo(f,m-g*(m-1)+.5),n.stroke()}n.strokeStyle=p;for(let y of[c,d,...Array.isArray(t.markers)?t.markers:[]]){let f=Math.round(Ve(y)*(a-1))+.5;n.beginPath(),n.moveTo(f,0),n.lineTo(f,i),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=se(e,"text"),n.fillRect(Math.round(Ve(t.position)*(a-1)),0,1,i)),b||(n.fillStyle=h,n.font=o,n.fillText(t.empty??"Empty",0,m+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let u=Ve(t.level??0);n.fillStyle=se(e,"divider"),n.fillRect(0,i*.4,a,i*.2),n.fillStyle=se(e,"accent"),n.fillRect(0,i*.4,a*u,i*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=se(e,"rhythm.step-cell-off"),n.fillRect(0,i*.45,a,i*.1),n.fillStyle=se(e,"rhythm.playhead"),n.fillRect(l/s*a,i*.3,Math.max(1,a/s),i*.4),e.dataset.ncAccent=se(e,"accent")}var sn=20,ii=2e4,Da=24,Qr=-60;function Mp(e,t,n,a,i=48e3){let o=2*Math.PI*Math.min(t,i*.49)/i,s=Math.cos(o),l=Math.sin(o)/(2*n),u,c,d;e==="hp"?[u,c,d]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[u,c,d]=[l,0,-l]:[u,c,d]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,h=-2*s,m=1-l,b=2*Math.PI*a/i,y=(k,L,A)=>k+L*Math.cos(b)+A*Math.cos(2*b),f=(k,L)=>-(k*Math.sin(b)+L*Math.sin(2*b)),g=Math.hypot(y(u,c,d),f(c,d)),w=Math.hypot(y(p,h,m),f(h,m));return w>0?g/w:0}function Tp(e,t){return Math.log(Math.max(sn,Math.min(ii,e))/sn)/Math.log(ii/sn)*t}function Jr(e,t,n){let a=Math.max(Qr,Math.min(Da,e));return t+(Da-a)/(Da-Qr)*(n-t)}function Lp(e,t,n,a,i,o){let s=a.mode??"lp",l=se(i,zs(s)),u=se(i,"divider"),c=se(i,"text-sub"),d=Number.parseFloat(String(o).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,h=Math.max(p+4,n-d-3),m=a.q??Math.SQRT1_2,b=Math.round(Jr(0,p,h))+.5;e.strokeStyle=u,e.lineWidth=1,e.beginPath(),e.moveTo(0,b),e.lineTo(t,b),e.stroke(),e.beginPath();for(let y=0;y<=t;y++){let f=sn*(ii/sn)**(y/Math.max(1,t)),g=a.open?1:Mp(s,a.hz,m,f,a.sampleRate),w=Jr(20*Math.log10(Math.max(1e-5,g)),p,h);y===0?e.moveTo(y,w):e.lineTo(y,w)}if(e.strokeStyle=l,e.stroke(),!a.open){let y=Math.round(Tp(a.hz,t))+.5;e.strokeStyle=c,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(y,p),e.lineTo(y,h),e.stroke(),e.setLineDash?.([])}e.fillStyle=c,e.font=o,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",i.dataset.ncAccent=l,i.dataset.ncFilterHz=String(Math.round(a.hz))}function Se(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let i=n.defaultView.getComputedStyle(a).color;return a.remove(),i}function Cp(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var dt=20,vn=2e4,qi=Math.log(vn/dt),ri=32,Fp=250,Np=-100,zp=1200,Pp=4.5,Zr=-6,st=-96,Dp=48,eo=[100,1e3,1e4],Rp=[6,12];function Tt(e,t){return Math.log(Math.max(dt,Math.min(vn,e))/dt)/qi*t}function qn(e,t){return dt*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*qi)}function Qe(e,t,n,a){let i=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*i}function oi(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var Gs=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Op(e,t,n,a){let i=n?3:1,o=u=>({db:Math.max(-a,Math.min(a,e.db+u*i))}),s=u=>({hz:Math.max(e.minHz??dt,Math.min(e.maxHz??vn,e.hz*2**(u*i/6)))}),l=u=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(u*i)))});switch(t){case"ArrowUp":return o(1);case"ArrowDown":return o(-1);case"ArrowRight":return e.moveHz?s(1):o(1);case"ArrowLeft":return e.moveHz?s(-1):o(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Ii(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function qp(e,t,n,a,i,o,s,l,u){let c=u?.25:1,d={},p=Math.max(1,o/2-l);if(d.db=Math.max(-s,Math.min(s,t.db-a*c/p*s/Ii(e))),e.moveHz){let h=t.hz*Math.exp(n*c/Math.max(1,i)*qi);d.hz=Math.max(e.minHz??dt,Math.min(e.maxHz??vn,h))}return d}function Ip(e,t,n,a,i){let o=Math.max(0,n.left)+1,s=Math.min(n.right,i)-1,l=Math.min(t.width*3+a*2,s-o),u=Math.max(o,Math.min(e.left,s-l));return{left:Math.round(u-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var de=new WeakMap;function _p(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let i=document.createElement("canvas");i.className="nc-eq-spectrum",i.setAttribute("aria-hidden","true");let o=document.createElement("canvas");o.className="nc-eq-curve",o.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(i,o);for(let u of e.bands)a.append(Bp(n,u,t));a.append(s),a.addEventListener("click",u=>{if(!Js(n)||u.button>0)return;let c=Qs(n)?.querySelector("[data-nc-max-toggle]");c instanceof HTMLElement&&c.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),de.set(n,{control:e,cache:null,spec:null,active:null}),Ys(n,e),n}function Ws(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function Bp(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let i=()=>{let c=n(e);return c?.type==="eqGraph"?c:null},o=()=>i()?.bands.find(c=>c.id===t.id)??null,s=null;a.addEventListener("pointerdown",c=>{if(c.button!==0)return;let d=o();d&&(c.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(c.pointerId),s={id:c.pointerId,x:c.clientX,y:c.clientY,start:{hz:d.hz,db:d.db}},a.dataset.drag="true",Ge(e,t.id))}),a.addEventListener("pointermove",c=>{if(!s||c.pointerId!==s.id)return;let d=i(),p=o(),h=de.get(e);if(!d||!p||!h?.box)return;let{w:m,h:b,pad:y}=h.box;d.onBand(p.id,qp(p,s.start,c.clientX-s.x,c.clientY-s.y,m,b,d.range??18,y,c.shiftKey))});let l=c=>{!s||c.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&Ge(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",c=>{c.preventDefault(),i()?.onReset?.(t.id)}),a.addEventListener("keydown",c=>{let d=i(),p=o();if(!d||!p)return;let h=Op(p,c.key,c.shiftKey,d.range??18);h&&(c.preventDefault(),h==="reset"?d.onReset?.(p.id):d.onBand(p.id,h),Ge(e,p.id))});let u=null;return a.addEventListener("wheel",c=>{let d=i(),p=o();if(!d||!p?.moveQ)return;c.preventDefault();let h=c.timeStamp;(!u||h-u.t>400)&&(u={q:p.q,t:h});let m=c.deltaMode===1?c.deltaY*16:c.deltaMode===2?c.deltaY*400:c.deltaY;u.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,u.q*2**(-m/240))),u.t=h,d.onBand(p.id,{q:u.q}),Ge(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>Ge(e,t.id)),a.addEventListener("focus",()=>Ge(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&Ge(e,null)}),a.addEventListener("blur",()=>{s||Ge(e,null)}),a}function Ge(e,t){let n=de.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?Pt(e):_i(e)}function _i(e){let t=de.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(b=>b.id===t.active):null;for(let b of e.querySelectorAll(".nc-eq-node"))b instanceof HTMLElement&&(a&&b.dataset.band===a.id?b.dataset.active="true":delete b.dataset.active);if(!a||!t.box){n.hidden=!0;return}let i=[a.label,Gs(a.db)];a.kind==="peak"?i.push(oi(a.hz),`Q ${a.q.toFixed(1)}`):i.push(`${a.kind==="lowshelf"?"below":"above"} ${oi(a.hz)}`),n.textContent=i.join(" · "),n.dataset.tone=String(jp(t.control,a)),n.hidden=!1;let{w:o,h:s,pad:l}=t.box,u=Tt(a.hz,o),c=Qe(a.db*Ii(a),s,t.control.range??18,l),d=n.offsetWidth,p=n.offsetHeight,h=Math.max(0,Math.min(o-d,u-d/2)),m=c-p-l*1.5>=0?c-p-l*1.5:Math.min(s-p,c+l*1.5);n.style.left=`${Math.round(h)}px`,n.style.top=`${Math.round(m)}px`}function jp(e,t){return e.bands.indexOf(t)%3+1}function Ys(e,t){let n=de.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Bi(e);let a=t.range??18;t.bands.forEach((i,o)=>{let s=Ws(e,i.id);s instanceof HTMLElement&&(s.dataset.tone=String(o%3+1),s.dataset.kind=i.kind,s.setAttribute("aria-label",`${i.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(i.db)),s.setAttribute("aria-valuetext",i.valueText??`${Gs(i.db)}, ${oi(i.hz)}`),s.setAttribute("aria-keyshortcuts",i.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),i.help?s.setAttribute("data-nc-help",i.help):s.removeAttribute("data-nc-help"))}),Pt(e),Yp(e)}function Ks(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.round(t*a)),o=Math.max(1,Math.round(n*a));(e.width!==i||e.height!==o)&&(e.width=i,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function Xs(e){return{curve:Se(e,"eq-curve"),fill:Se(e,"eq-fill"),quiet:Se(e,"text-sub"),grid:Se(e,"eq-grid"),zero:Se(e,"divider"),label:Se(e,"text-sub"),spectrum:Se(e,"eq-spectrum"),bands:[Se(e,"eq-band-1"),Se(e,"eq-band-2"),Se(e,"eq-band-3")]}}function Hp(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Pt(e){de.has(e)&&Bi(e);let t=de.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:i,w:o,h:s}=Ks(n);if(!i)return;let l=Math.max(8,Math.round(s*.06)),u=a.range??18;t.box={w:o,h:s,pad:l},t.colours=Xs(e);let c=t.colours,d=Hp(a,o);if(!t.cache||t.cache.key!==d){let L=Math.max(64,Math.ceil(o)+1),A=new Float64Array(L);for(let x=0;x<L;x++)A[x]=qn(x/(L-1)*o,o);let v=null;try{v=typeof a.response=="function"?a.response(A):null}catch{v=null}t.cache={key:d,freqs:A,total:v?.total??new Float64Array(L),bands:v?.bands??[]}}i.clearRect(0,0,o,s);let p=Cp(e),h=a.on!==!1;Up(i,o,s,u,l,c,p);let{freqs:m,total:b,bands:y}=t.cache,f=Array.from(m,L=>Tt(L,o)),g=Qe(0,s,u,l);y.forEach((L,A)=>{if(!L||!L.some(E=>Math.abs(E)>.05))return;let v=h?c.bands[A%3]:c.quiet,x=Array.from(L,E=>Qe(E,s,u,l));i.save(),t.active&&a.bands[A]?.id===t.active&&(i.globalAlpha=.14,i.fillStyle=v,to(i,f,x,g)),i.globalAlpha=h?.75:.4,i.strokeStyle=v,i.lineWidth=.75,Ra(i,f,x),i.restore()});let w=Array.from(b,L=>Qe(L,s,u,l)),k=h?c.curve:c.quiet;i.save(),i.fillStyle=h?c.fill:c.quiet,i.globalAlpha=h?.2:.08,to(i,f,w,g),i.restore(),i.save(),i.strokeStyle=h?c.fill:k,i.lineJoin="round",i.lineCap="round",h&&(i.globalAlpha=.16,i.lineWidth=4,Ra(i,f,w)),i.globalAlpha=1,i.strokeStyle=k,i.lineWidth=1.25,Ra(i,f,w),i.restore(),Vp(e),_i(e)}function Up(e,t,n,a,i,o,s){e.save(),e.lineWidth=1;for(let u=10;u<=1e4;u*=10)for(let c=1;c<=9;c++){let d=u*c;if(d<dt||d>vn)continue;let p=Math.round(Tt(d,t))+.5;e.globalAlpha=eo.includes(d)?.9:.35,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let u of Rp)if(!(u>a))for(let c of[1,-1]){let d=Math.round(Qe(u*c,n,a,i))+.5;e.globalAlpha=u===12?.75:.4,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(0,d),e.lineTo(t,d),e.stroke()}e.globalAlpha=1,e.strokeStyle=o.zero;let l=Math.round(Qe(0,n,a,i))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=o.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let u of eo){let c=u>=1e3?`${u/1e3}k`:String(u),d=e.measureText(c).width,p=Tt(u,t)+3;e.fillText(c,p+d+2>t?Tt(u,t)-d-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let u of[12,0,-12]){if(Math.abs(u)>a)continue;let c=Qe(u,n,a,i);e.fillText(u>0?`+${u}`:u<0?`−${-u}`:"0",t-3,Math.round(c)-1)}e.restore()}function Zn(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let i=(t[a]+t[a+1])/2,o=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],i,o)}e.lineTo(t[t.length-1],n[n.length-1])}function Ra(e,t,n){e.beginPath(),Zn(e,t,n),e.stroke()}function to(e,t,n,a){e.beginPath(),Zn(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function Qs(e){return e.closest("[data-nc-maxable]")}function Js(e){let t=Qs(e);return!!t&&!t.hasAttribute("data-nc-max")}function Bi(e){let t=Js(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=de.get(e);n?.active&&(n.active=null,_i(e))}return t}function Vp(e){Bi(e);let t=de.get(e);if(!t?.box)return;let{w:n,h:a,pad:i}=t.box,o=t.control.range??18;for(let s of t.control.bands){let l=Ws(e,s.id);l instanceof HTMLElement&&(l.style.left=`${Tt(s.hz,n).toFixed(1)}px`,l.style.top=`${Qe(s.db*Ii(s),a,o,i).toFixed(1)}px`)}}function Gp(e,t,n,a){let i=a/2/n,o=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let u=0;u<e;u++){let c=(u-.5)/(e-1)*t,d=(u+.5)/(e-1)*t,p=qn(c,t),h=qn(d,t),m=qn(u/(e-1)*t,t);o[u]=Math.min(n-1,p/i),s[u]=Math.min(n-1,h/i),l[u]=Pp*Math.log2(m/1e3)}return{lo:o,hi:s,tilt:l}}function Wp(e,t,n){let a=Math.floor(t),i=Math.ceil(n);if(i-a<=1){let s=t-a,l=e[a]??-1/0,u=e[Math.min(e.length-1,a+1)]??l;return l+(u-l)*s}let o=-1/0;for(let s=a;s<=i&&s<e.length;s++)e[s]>o&&(o=e[s]);return o}function Yp(e){let t=de.get(e);if(t){if(!t.control.spectrum){el(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let i=de.get(e)?.spec;i&&(i.visible=a.some(o=>o.isIntersecting),si(e))}),t.spec.io.observe(e)):t.spec.visible=!0}si(e)}}function si(e){let t=de.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){Zs(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=li(e),n.onVis||(n.onVis=()=>si(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&ci(e,!1)}function li(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function ci(e,t){let n=de.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,Oa(e,li(e))),Fp):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(i=>(n.raf=0,Oa(e,i))):n.timer=a.setTimeout(()=>(n.timer=0,Oa(e,li(e))),ri))}function Zs(e){let t=de.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function el(e){let t=de.get(e)?.spec;if(!t)return;Zs(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=de.get(e);n&&(n.spec=null)}function Oa(e,t){let n=de.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){el(e);return}if(!a.analyser)return;if(t-a.last<ri-4&&!a.idle){ci(e,!1);return}let i=a.last?Math.min(.25,(t-a.last)/1e3):ri/1e3;a.last=t;let o=e.querySelector(".nc-eq-spectrum");if(!(o instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:u}=Ks(o);if(!s)return;let c=Math.max(16,Math.round(l/2)),d=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==c||a.map.w!==l||a.map.sr!==d)&&(a.map={cols:c,w:l,sr:d,...Gp(c,l,a.buf.length,d)},a.disp=new Float32Array(c).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,h=Dp*i,{lo:m,hi:b,tilt:y}=a.map;for(let g=0;g<c;g++){let w=Wp(a.buf,m[g],b[g]);w>p&&(p=w);let k=w+y[g],L=a.disp[g]-h;a.disp[g]=k>L?k:L}p>Np&&(a.loud=t);let f=t-a.loud>zp;s.clearRect(0,0,l,u),(!f||a.disp.some(g=>g>st))&&Kp(s,l,u,a.disp,n.colours??Xs(e)),a.idle=f&&!a.disp.some(g=>g>st),ci(e,a.idle)}function Kp(e,t,n,a,i){let o=a.length,s=new Array(o),l=new Array(o),u=c=>{let d=a[Math.max(0,Math.min(o-1,c))];return Number.isFinite(d)?d:st};for(let c=0;c<o;c++){let d=u(c)*.36+(u(c-1)+u(c+1))*.22+(u(c-2)+u(c+2))*.1,p=(Math.max(st,Math.min(Zr,Number.isFinite(d)?d:st))-st)/(Zr-st);s[c]=c/(o-1)*t,l[c]=n-p*n}e.save(),e.fillStyle=i.spectrum,e.globalAlpha=.13,e.beginPath(),Zn(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=i.spectrum,e.lineWidth=1,e.beginPath(),Zn(e,s,l),e.stroke(),e.restore()}var Xp=.8912509381337456,di=32,Qp=250,Jp=1200,Zp=.2,tl=1.5;function eh(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function th(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let i=e.createElement("span");i.className="nc-fx-level-fill",a.append(i),t.append(a)}return t}var ea=new WeakMap,no=new WeakMap;function ao(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let i=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),o=Number.parseFloat(i);return Number.isFinite(o)?i.endsWith("ms")?o/1e3:o:n}function nh(e){let t=no.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(i=>{for(let o of i){let s=ea.get(o.target);s&&(s.seen.set(o.target,o.isIntersecting),ln(s))}kt(t)})),e.addEventListener("visibilitychange",()=>{for(let i of t.recs)ln(i);kt(t)}),no.set(e,t),t}var nl=e=>e.els.some(t=>t.isConnected);function ah(e){if(!e.loop.io)return nl(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function ln(e){let t=!e.dead&&!!e.source&&ah(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=ji(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),hi(e))}function ji(e){return e.doc.defaultView?.performance?.now()??Date.now()}function kt(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){al(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=ji(e)),!e.raf&&!e.timer&&ui(e,!1)}function ui(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>io(e,ji(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),Qp):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(i=>(e.raf=0,io(e,i))):e.timer=n.setTimeout(()=>(e.timer=0,a()),di)}function al(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function io(e,t){if(t-e.last<di-4&&!e.idle&&e.last){ui(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):di/1e3;e.last=t,e.frames++;let a=!1,i=!1;for(let o of e.recs){if(!nl(o)){(o.placed||e.frames-o.born>90)&&il(o);continue}o.placed=!0,o.open&&(i=!0,ih(o,n,t)&&(e.loud=t),(o.disp[0]>0||o.disp[1]>0)&&(a=!0))}if(!i){al(e);return}e.idle=t-e.loud>Jp&&!a,ui(e,e.idle)}function ih(e,t,n){if(e.fall<0){let h=e.els[0];e.fall=ao(h,"motion-meter-fall",Zp),e.hold=ao(h,"motion-meter-hold",tl)}let a=null;try{a=e.source.read()}catch{a=null}let i=typeof a=="number",o=i?a:Number(a?.in)||0,s=!i&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,u=s?"2":"1";if(e.rows!==u){e.rows=u;for(let h of e.els)h.dataset.ncRows=u}let c=e.fall>0?Math.exp(-t/e.fall):0,d=[o,l],p=!1;for(let h=0;h<2;h++){let m=eh(d[h]);m>0&&(p=!0),e.disp[h]=m>=e.disp[h]?m:m+(e.disp[h]-m)*c,e.disp[h]<.001&&(e.disp[h]=0),d[h]>=Xp&&(e.clipAt[h]=n);let b=e.clipAt[h]>0&&n-e.clipAt[h]<e.hold*1e3;pi(e,h,e.disp[h],b)}return p}function pi(e,t,n,a){let i=Math.round(n*1e3)/1e3,o=a?"true":"false";if(!(e.shown[t]===i&&e.clipShown[t]===o)){e.shown[t]=i,e.clipShown[t]=o;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${i})`,l.dataset.clip=o)}}}function hi(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,pi(e,0,0,!1),pi(e,1,0,!1)}function il(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),ea.get(t)===e&&ea.delete(t)}function rh(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,i=nh(a),o={els:n,source:t??null,loop:i,open:!1,dead:!1,seen:new Map,born:i.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:tl,rows:""};for(let s of n)ea.set(s,o),i.io?.observe(s);if(i.recs.add(o),hi(o),!i.io){let s=a.defaultView,l=()=>{ln(o),kt(i)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!o.dead){if(l===o.source){ln(o),kt(i);return}o.open&&(o.open=!1,o.source?.close?.(),hi(o)),o.source=l,ln(o),kt(i)}},destroy(){o.dead||il(o),kt(i)}}}var rl={slop:8,longPressMs:500,pitchPx:16},oh=class{constructor(e,t,n=rl){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let i=this.hit(t,n);return i<0?!1:(this.phase="pending",this.pointer=e,this.pad=i,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let i=t-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(i,o)<this.config.slop)return;Math.abs(o)>=Math.abs(i)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-o/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function sh(e,t,n,a=rl){let i=!1,o=0,s=(c,d)=>{let p=e.ownerDocument.elementFromPoint?.(c,d),h=[...e.querySelectorAll(t)],m=p?h.findIndex(f=>f===p||f.contains(p)):-1;if(m>=0)return m;let b=-1,y=Number.POSITIVE_INFINITY;return h.forEach((f,g)=>{if(f.hidden)return;let w=f.getBoundingClientRect();if(d<w.top||d>w.bottom)return;let k=Math.abs(c-(w.left+w.width/2));k<y&&k<=w.width&&(b=g,y=k)}),b},l=new oh(s,c=>{(c.kind==="paint"||c.kind==="long")&&(i=!0),n(c)},a),u=()=>{o&&clearTimeout(o),o=0};return e.addEventListener("pointerdown",c=>{c.button>0||(i=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(u(),o=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&u())}),e.addEventListener("pointerup",c=>{u(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),e.addEventListener("pointercancel",c=>{u(),l.cancel(c.pointerId)}),e.addEventListener("click",c=>{i&&(i=!1,c.stopPropagation(),c.preventDefault())},!0),e.addEventListener("contextmenu",c=>c.preventDefault()),l}var ol="netcomposer.groups.v1";function Hi(){try{return globalThis.localStorage??null}catch{return null}}function sl(e=Hi(),t=ol){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[i,o]of Object.entries(n))typeof o=="boolean"&&a.set(i,o);return a}catch{return new Map}}function lh(e,t,n,a=ol){let i=sl(e,a);i.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(i)))}catch{}}function ch(e,t=Hi()){return sl(t).get(e.id)??e.open===!0}function dh(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let i=document.createElement("button");i.type="button",i.className="nc-group-toggle",i.id=`${e.id}-group-toggle`;let o=document.createElement("span");o.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),i.append(o,s,l);let u=document.createElement("div");u.className="nc-group-body",u.id=`${e.id}-group-body`,u.setAttribute("role","group"),u.setAttribute("aria-labelledby",i.id),i.setAttribute("aria-controls",u.id);for(let c of e.controls)u.append(n(c,t));return i.addEventListener("click",()=>{let c=a.dataset.ncOpen!=="true";lh(Hi(),e.id,c),fi(a,c);let d=t(a);d?.type==="group"&&d.onToggle?.(c)}),a.append(i,u),ll(a,e),fi(a,ch(e)),cl(a,e),a}function fi(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let i=n?.querySelector(".nc-group-mark");i&&(i.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function ll(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function cl(e,t){ll(e,t)&&fi(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),i=t.summary??"";a&&a.textContent!==i&&(a.textContent=i)}var Cn="application/x-nc-pad",ro="http://www.w3.org/2000/svg";function uh(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],i=[];for(let o=0;o<n;o++){let s=Math.floor(o*t/n),l=Math.max(s+1,Math.floor((o+1)*t/n)),u=0,c=0;for(let p=s;p<l;p++)u=Math.min(u,e[2*p]??0),c=Math.max(c,e[2*p+1]??0);let d=n===1?50:o/(n-1)*100;a.push(`${d.toFixed(1)} ${(10-Math.min(1,c)*10).toFixed(2)}`),i.push(`${d.toFixed(1)} ${(10-Math.max(-1,u)*10).toFixed(2)}`)}return`M${a.join("L")}L${i.reverse().join("L")}Z`}function ph(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((i,o)=>a.append(hh(n,o,t))),n.append(a),n.addEventListener("keydown",i=>{i.key==="Escape"&&In(n)}),ul(n,e),n}function hh(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let i=document.createElement("span");i.className="nc-padgrid-pad-bar",i.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let u=document.createElementNS(ro,"svg");u.setAttribute("class","nc-padgrid-pad-wave"),u.setAttribute("viewBox","0 0 100 20"),u.setAttribute("preserveAspectRatio","none"),u.setAttribute("aria-hidden","true");let c=document.createElementNS(ro,"path");return u.append(c),a.append(i,o,s,l,u),mh(e,a,t,n),o.addEventListener("dblclick",()=>{let d=n(e);d?.type==="padGrid"&&d.onRename&&a.dataset.empty!=="true"&&dl(e,a,t,n)}),a.addEventListener("dragstart",d=>{if(a.dataset.empty==="true"||!d.dataTransfer){d.preventDefault();return}d.dataTransfer.setData(Cn,String(t)),d.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",d=>{let p=d.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(Cn)||(d.preventDefault(),d.stopPropagation(),d.dataTransfer&&(d.dataTransfer.dropEffect=p.includes(Cn)&&!d.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",d=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let h=d.dataTransfer?.getData(Cn);if(h!==void 0&&h!==""){d.preventDefault(),d.stopPropagation();let b=Number(h);b!==t&&p.onMove?.(b,t,d.altKey);return}let m=d.dataTransfer?.files?.[0];m&&(d.preventDefault(),d.stopPropagation(),p.onFile?.(t,m))}),a}function fh(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function mh(e,t,n,a){let i=0,o=!1,s=0,l=0,u=()=>{window.clearTimeout(i),i=0};t.addEventListener("pointerdown",c=>{if(c.button!==0)return;o=!1,s=c.clientX,l=c.clientY,u();let d=a(e);d?.type==="padGrid"&&(d.onDown?.(n),!(d.onDown&&c.pointerType==="mouse")&&(i=window.setTimeout(()=>{i=0,o=oo(e,t,n,a)},450)))}),t.addEventListener("pointermove",c=>{i&&Math.hypot(c.clientX-s,c.clientY-l)>8&&u()});for(let c of["pointerup","pointercancel","pointerleave"])t.addEventListener(c,u);t.addEventListener("contextmenu",c=>{c.preventDefault(),u(),o=oo(e,t,n,a)}),t.addEventListener("click",()=>{if(o){o=!1;return}fh(e,n,a)})}function oo(e,t,n,a){let i=a(e);if(i?.type!=="padGrid"||!i.menu)return!1;let o=i.menu(n);if(!o.length)return!1;In(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),In(e)}),s.addEventListener("click",d=>d.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let d of o){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=d.id,p.textContent=d.label,p.addEventListener("click",()=>{In(e);let h=a(e);h?.type==="padGrid"&&(d.id==="rename"&&h.onRename?dl(e,t,n,a):h.onMenu?.(n,d.id))}),l.append(p)}e.append(s,l);let u=e.getBoundingClientRect(),c=t.getBoundingClientRect();return l.style.left=`${c.left-u.left}px`,l.style.top=`${c.bottom-u.top}px`,l.querySelector("button")?.focus(),!0}function dl(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let i=a(e);if(i?.type!=="padGrid")return;let o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=i.nameMax??24,o.value=i.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.top-s.top}px`,o.style.width=`${l.width}px`;let u=!1,c=d=>{if(u)return;u=!0;let p=o.value.trim();o.remove(),t.focus();let h=a(e);d&&p&&h?.type==="padGrid"&&h.onRename?.(n,p)};o.addEventListener("keydown",d=>{d.stopPropagation(),d.key==="Enter"?c(!0):d.key==="Escape"&&c(!1)}),o.addEventListener("blur",()=>c(!0));for(let d of["pointerdown","click","dblclick"])o.addEventListener(d,p=>p.stopPropagation());e.append(o),o.focus(),o.select()}function In(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function ul(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,i)=>{let o=n[i];if(!(o instanceof HTMLButtonElement))return;let s=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),u=o.querySelector(".nc-padgrid-pad-wave path"),c=o.querySelector(".nc-padgrid-pad-badge");c&&(c.textContent=a.empty?"":a.badge??""),o.draggable=!a.empty,a.empty?(o.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),u?.setAttribute("d","")):(delete o.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=""),u?.setAttribute("d",uh(a.peaks))),a.lane?o.dataset.ncLane=String(a.lane):delete o.dataset.ncLane;let d=t.selected===i;d?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",d?"true":"false"),a.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",a.empty?`Pad ${i+1}, empty: load a sample`:`Pad ${i+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${d?", selected":""}`)})}function he(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function ya(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let i=document.createElement("span");return i.className="nc-readout",i.dataset.ncReadout="",n.append(a,i),n}function so(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function fn(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var gh=450,lo=8;function Oe(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function bh(e){let t=sp(e,"target-min");return t>0?t:44}function yh(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=bh(e),a=n/2,i=t.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<t.length;o++){let s=t[o],l=i[o];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let u=l.left+l.width/2,c=l.top+l.height/2,d=u-a,p=u+a,h=c-a,m=c+a;for(let b=0;b<t.length;b++){if(o===b)continue;let y=i[b];if(!y||y.width===0)continue;let f=y.left+y.width/2,g=y.top+y.height/2;Math.abs(g-c)<a*2&&(f>u?p=Math.min(p,(u+f)/2):f<u&&(d=Math.max(d,(u+f)/2))),Math.abs(f-u)<a*2&&(g>c?m=Math.min(m,(c+g)/2):g<c&&(h=Math.max(h,(c+g)/2)))}d=Math.min(d,l.left),p=Math.max(p,l.right),h=Math.min(h,l.top),m=Math.max(m,l.bottom),s.style.left=`${d-l.left}px`,s.style.top=`${h-l.top}px`,s.style.width=`${Math.max(0,p-d)}px`,s.style.height=`${Math.max(0,m-h)}px`,s.style.transform="none"}}function pl(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function co(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Dt(e,t){switch(e.type){case"slider":return wh(e,t);case"select":return xh(e,t);case"toggle":return $h(e,t);case"button":return kh(e,t);case"readout":return Eh(e);case"label":return Th(e);case"note":return uo(e);case"knob":return Fh(e,t);case"choice":return Nh(e,t);case"slotRow":return zh(e,t);case"stepGrid":return Oh(e,t);case"canvas":return Bh(e);case"fx":return Kh(e,t);case"eqGraph":return _p(e,t);case"group":return dh(e,t,Dt);case"strip":return jh(e,t);case"stripAdd":return Vh(e,t);case"padGrid":return ph(e,t);case"moves":return Sh(e,t);default:return uo({id:"unknown",text:""})}}function Me(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,ml(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(hl(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let i=e.querySelector("[data-nc-readout]");i&&(i.textContent=t.valueText??fn(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),so(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")so(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&ut(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Lh(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??fn(t.value))}else if(t.type==="choice")gl(e,t);else if(t.type==="slotRow")yl(e,t);else if(t.type==="stepGrid")gi(e,t);else if(t.type==="padGrid")ul(e,t);else if(t.type==="moves")fl(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&Vs(n,t)}else if(t.type==="eqGraph")Ys(e,t);else if(t.type==="strip"){$l(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${Lt(n.id)}"]`);a instanceof Element&&Me(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")vl(e,t);else if(t.type==="group"){cl(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${Lt(n.id)}"]`);a instanceof Element&&Me(a,n)}}else if(t.type==="fx"){Ll(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${Lt(n.id)}"]`);a instanceof Element&&Me(a,n)}}}}function wh(e,t){let n=ya(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let i=ba(e.taper,e.min,e.max);a.min=String(i?0:e.min),a.max=String(i?1e3:e.max),a.step=String(i?1:e.step),i&&(a.dataset.ncTaper=e.taper),a.value=String(hl(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let o=l=>i?ai(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(o(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(o(l))}),i&&a.addEventListener("keydown",l=>{let u=t(a);if(u?.type!=="slider"||a.disabled)return;let c=u.taper??e.taper,d=Us(c,u.min,u.max,u.value,l.key,l.shiftKey,u.step);d!==null&&(l.preventDefault(),a.value=String(Oi(c,u.min,u.max,d)),u.onChange(d),u.onCommit?.(d))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(vh(e,a,t),s),n.append(he()),Me(n,e),n}function hl(e){return ba(e.taper,e.min,e.max)?Oi(e.taper,e.min,e.max,e.value):e.value}function vh(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(Oe());let i=o=>{let s=n(t);s?.type==="slider"&&s.onTap?.(o)};return a.addEventListener("pointerdown",o=>{o.button===0&&i(o.timeStamp)}),a.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),i(o.timeStamp))}),a}function xh(e,t){let n=ya(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let i=null;for(let o of e.options){let s=document.createElement("option");s.value=o.value,s.textContent=o.label,o.disabled&&(s.disabled=!0),o.group?i?.getAttribute("label")!==o.group&&(i=document.createElement("optgroup"),i.setAttribute("label",o.group),a.append(i)):i=null,(i??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let o=t(a);o?.type==="select"&&o.onChange(a.value)}),n.append(a,he()),n}function $h(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(he()),Me(n,e),n}function kh(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let o=t(n);o?.type==="button"&&o.onPress()}),n.append(he()),Me(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let i=document.createElement("button");return i.type="button",i.className="nc-sparkle-btn",i.dataset.ncSparkle=e.id,i.setAttribute("aria-label","Surprise me"),i.title=e.sparkleTitle??"Surprise me",i.innerHTML=pl(),i.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&wl(o);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,i),a}function Eh(e){let t=ya(e.id,e.label);return t.append(he()),Me(t,e),t}var Ah=450;function Sh(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let i=document.createElement("div");i.className="nc-moves-row",i.setAttribute("role","group"),i.setAttribute("aria-label",a.label),a.title&&(i.title=a.title);let o=document.createElement("span");o.className="nc-moves-label",o.setAttribute("aria-hidden","true"),o.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let u=document.createElement("button");u.type="button",u.className="nc-moves-btn",u.dataset.ncMove=l.id,u.title=l.title??l.text,u.setAttribute("aria-label",`${a.label} ${l.text}`),u.append(Mh(l.icon)),u.addEventListener("click",()=>{let c=t(n);c?.type==="moves"&&c.onMove(l.id)}),s.append(u)}i.append(o,s),n.append(i)}return fl(n,e),n}function fl(e,t){for(let n of t.groups)for(let a of n.moves){let i=e.querySelector(`[data-nc-move="${Lt(a.id)}"]`);i instanceof HTMLButtonElement&&(i.disabled=a.disabled===!0)}}function Mh(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function Th(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(he()),t}function uo(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(he()),t}function po(e){if(typeof e.valueText=="string")return e.valueText;let t=fn(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function ml(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Lh(e,t){let n=Ri(t.taper,t.min,t.max,t.value);ml(e,t.modulated===!0);let a=Math.round(n*270);e.style.setProperty("--knob-turn",String(a)),t.bipolar&&(e.style.setProperty("--knob-from",String(Math.min(a,135))),e.style.setProperty("--knob-to",String(Math.max(a,135)))),e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",po(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${po(t)}`}function Ch(e,t){if(ba(e.taper,e.min,e.max))return Us(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,i=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+i:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-i:null}function Fh(e,t){let n=ya(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let i=document.createElement("i");i.className="nc-knob-mark",a.append(i);let o=0,s=0;a.addEventListener("pointerdown",c=>{o=c.clientY;let d=t(a);s=d&&"value"in d?Number(d.value):0,a.setPointerCapture?.(c.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",c=>{if(a.hasPointerCapture&&!a.hasPointerCapture(c.pointerId))return;let d=t(a);if(d?.type!=="knob")return;if(ba(d.taper,d.min,d.max)){let m=Ri(d.taper,d.min,d.max,s)-(c.clientY-o)/120;d.onChange(js(d.taper,d.min,d.max,m));return}let p=d.max-d.min||1,h=Math.min(d.max,Math.max(d.min,s-(c.clientY-o)*p/120));d.onChange(h)}),a.addEventListener("dblclick",()=>{let c=t(a);c?.type==="knob"&&typeof c.defaultValue=="number"&&c.onChange(c.defaultValue)}),a.addEventListener("keydown",c=>{let d=t(a);if(d?.type!=="knob")return;let p=Ch(d,c);p!==null&&(c.preventDefault(),d.onChange(Math.min(d.max,Math.max(d.min,p))))});let u=n.querySelector("[data-nc-readout]");return n.insertBefore(a,u),n.append(he()),Me(n,e),n}function Nh(e,t){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label);for(let a of e.options){let i=document.createElement("button");i.type="button",i.className="nc-choice",i.dataset.ncChoice=a.value,i.setAttribute("role","tab"),i.textContent=a.label,i.addEventListener("click",()=>{let o=t(n);o?.type==="choice"&&o.onChange(a.value)}),i.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(i),u=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")u=(l+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")u=(l-1+s.length)%s.length;else if(o.key==="Home")u=0;else if(o.key==="End")u=s.length-1;else return;let c=s[u];c instanceof HTMLButtonElement&&(o.preventDefault(),c.focus(),c.click())}),n.append(i)}return n.append(he()),gl(n,e),n}function gl(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function zh(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let d=0;d<e.slots.length;d++){let p=e.slots[d],h=document.createElement("span");h.className="nc-snap-wrap";let m=document.createElement("button");m.type="button",m.className="nc-snap",m.dataset.ncSlot=String(d),m.textContent=p.label,m.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",h.append(m,Oe()),Ph(h,m,n,d,t),a.append(h)}let i=e.onSparkle?document.createElement("button"):null;i&&(i.type="button",i.className="nc-sparkle",i.setAttribute("aria-label","Surprise me"),i.innerHTML=pl(),i.append(Oe()),i.addEventListener("click",()=>{wl(n);let d=t(n);d?.type==="slotRow"&&d.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let d=t(n);d?.type==="slotRow"&&d.onMorph(Number(l.value))});let u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",o.append(s,u,l);let c=document.createElement("div");return c.className="nc-slot-line",c.append(a,...i?[i]:[]),n.append(c,o,he()),bl(n,t),yl(n,e),n}function ho(e,t,n,a){let i=n(e);if(i?.type!=="slotRow")return;Jt(e);let o=a.shiftKey?"store":a.altKey?"clear":"recall";i.onSlot(t,o)}function Ph(e,t,n,a,i){let o=0,s=0,l=0,u=!1,c=!1,d=!1,p=!1,h=()=>{window.clearTimeout(o),o=0},m=g=>{let w=g.clientX-s,k=g.clientY-l;w*w+k*k>lo*lo&&(u=!0,h())},b=()=>{p&&(p=!1,window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",f))},y=g=>{let w=o!==0&&!u&&!c;h(),b(),w&&(d=!0,ho(n,a,i,g))},f=()=>{u=!0,h(),b()};e.addEventListener("pointerdown",g=>{g.button===0&&(b(),c=!1,u=!1,d=!1,s=g.clientX,l=g.clientY,h(),o=window.setTimeout(()=>{o=0,!u&&(c=!0,Dh(n,t,a,i))},gh),p=!0,window.addEventListener("pointermove",m),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",f))}),e.addEventListener("contextmenu",g=>g.preventDefault()),e.addEventListener("click",g=>{if(d||c||u){d=!1,c=!1,u=!1;return}ho(n,a,i,g)})}function bl(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=fo("Save","store"),i=fo("Clear","clear");n.append(a,i);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),Jt(e)}),o.addEventListener("click",s=>s.stopPropagation()),e.append(o,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let u=t(e);if(u?.type!=="slotRow")return;let c=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(u.onSlot(c,"store"),Jt(e)):l.dataset.ncSlotOp==="clear"&&(u.onSlot(c,"clear"),Jt(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&Jt(e)})}function fo(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Dh(e,t,n,a){bl(e,a);let i=e.querySelector(".nc-slot-menu");if(!(i instanceof HTMLElement))return;let o=e.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),i.hidden=!1,i.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-s.left}px`,i.style.top=`${l.bottom-s.top}px`,i.querySelector("button")?.focus()}function Jt(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function yl(e,t){for(let i of e.querySelectorAll("[data-nc-slot]")){if(!(i instanceof HTMLButtonElement))continue;let o=Number(i.dataset.ncSlot),s=t.slots[o];if(!s)continue;i.textContent=s.label,s.filled?i.dataset.filled="true":delete i.dataset.filled,s.active?i.dataset.active="true":delete i.dataset.active,s.edited?i.dataset.edited="true":delete i.dataset.edited,s.queued?i.dataset.queued="true":delete i.dataset.queued,s.queued&&s.pulse?i.dataset.pulse="true":delete i.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];i.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function wl(e){let t=e.dataset.ncLastFill||null,n=Gu(t);e.dataset.ncLastFill=n;let a=Wu(n);if(a)for(let[i,o]of Object.entries(a))e.style.setProperty(i,o)}function Rh(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,i=o=>{if(a===o)return;a=o,n.setAttribute("aria-pressed",o?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),i(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>i(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||i(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),i(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function Oh(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let i=f=>{let g=document.createElement("button");return g.type="button",g.setAttribute("role","radio"),g.textContent=f,a.append(g),g},o=i("Note"),s=i("Accent");s.dataset.ncAccentMode="";let l=f=>{for(let g of[o,s]){let w=g===f;g.setAttribute("aria-checked",w?"true":"false"),g.tabIndex=w?0:-1}};l(o);for(let f of[o,s])f.addEventListener("click",()=>l(f));a.addEventListener("keydown",f=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(f.key))return;f.preventDefault();let g=s.getAttribute("aria-checked")==="true"?o:s;l(g),g.focus()});let u=document.createElement("div");if(u.className="nc-step-tools",u.append(a),e.onFill&&u.append(Rh(n,t)),e.onClear){let f=document.createElement("button");f.type="button",f.className="nc-fill nc-clear",f.dataset.ncClear="",f.textContent=e.clearLabel??"Clear",f.title="Clear every step (Undo takes it back)",f.addEventListener("click",()=>{let g=t(n);g?.type==="stepGrid"&&g.onClear?.()}),u.append(f)}n.append(u);for(let f of e.rows){let g=document.createElement("div");g.className="nc-row",g.dataset.ncRow="";let w=document.createElement("button");w.type="button",w.className="nc-name",w.textContent=f.label,w.setAttribute("aria-label",`Select ${f.label}`),f.lane&&(w.dataset.ncLane=String((f.lane-1)%4+1));let k=!1,L=0;w.addEventListener("pointerdown",x=>{k=!1,!(x.pointerType==="mouse"||x.button!==0)&&(L=window.setTimeout(()=>{let E=t(n);E?.type!=="stepGrid"||!E.selectedRows||(k=!0,E.onSelectRow?.(E.rows.findIndex(T=>T.id===f.id),!0))},Ah))});for(let x of["pointerup","pointercancel","pointerleave"])w.addEventListener(x,()=>window.clearTimeout(L));w.addEventListener("contextmenu",x=>{k&&x.preventDefault()}),w.addEventListener("click",x=>{let E=t(n);if(E?.type!=="stepGrid")return;if(k){k=!1;return}let T=E.rows.findIndex(z=>z.id===f.id),N=!!E.selectedRows&&(x.shiftKey||x.metaKey||x.ctrlKey);E.onSelectRow?.(T,N)}),w.addEventListener("keydown",x=>qh(n,w,x));let A=[];for(let x of["mute","solo"]){if(!(x==="mute"?e.onMute:e.onSolo))continue;let E=document.createElement("span");E.className="nc-ms-wrap";let T=document.createElement("button");T.type="button",T.className="nc-ms",T.dataset.ncMs=x,T.textContent=x==="mute"?"M":"S",T.setAttribute("aria-label",`${x==="mute"?"Mute":"Solo"} ${f.label}`),E.append(T,Oe()),E.addEventListener("click",()=>{let N=t(n);if(N?.type!=="stepGrid")return;let z=N.rows.findIndex(U=>U.id===f.id);(x==="mute"?N.onMute:N.onSolo)?.(z)}),A.push(E)}let v=document.createElement("div");v.className="nc-steps";for(let x=0;x<f.steps.length;x++){let E=document.createElement("span");E.className="nc-step-wrap";let T=document.createElement("button");T.type="button",T.className="nc-step",T.dataset.ncStep=`${f.id}:${x}`,T.setAttribute("aria-label",`${f.label} step ${x+1}`),E.append(T,Oe()),E.addEventListener("click",N=>{let z=t(n);if(z?.type!=="stepGrid")return;let U=z.rows.findIndex(X=>X.id===f.id),K=s.getAttribute("aria-checked")==="true";z.onToggle(U,x,N.shiftKey||K)}),v.append(E)}if(e.onLength&&v.append(Ih(n,v,f,t)),g.append(...A,w,v),e.onDice){let x=document.createElement("button");x.type="button",x.className="nc-sparkle nc-row-dice",x.dataset.ncDice=f.id,x.setAttribute("aria-label",`Re-roll ${f.label}`),x.title=`Re-roll ${f.label}: new steps for this lane (Undo takes it back)`,x.innerHTML=co(),x.append(Oe()),x.addEventListener("click",()=>{let E=t(n);E?.type==="stepGrid"&&E.onDice?.(E.rows.findIndex(T=>T.id===f.id))}),g.append(x)}g.addEventListener("click",x=>{if(x.target!==g)return;let E=t(n);E?.type==="stepGrid"&&E.onSelectRow?.(E.rows.findIndex(T=>T.id===f.id))}),mo(n,v,".nc-step-wrap",t,s,()=>f.id),n.append(g)}let c=document.createElement("div");c.className="nc-pads-head";let d=(f,g,w)=>{let k=document.createElement("button");return k.type="button",k.className=f,k.textContent=g,w&&k.setAttribute("aria-label",w),k},p=d("nc-pads-step","‹","Previous lane"),h=d("nc-pads-step","›","Next lane"),m=document.createElement(e.onLength?"button":"span");m.className="nc-pads-label",m.setAttribute("aria-live","polite"),e.onLength&&(m.type="button",m.dataset.ncLenToggle="",m.addEventListener("click",()=>{let f=t(n);f?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",gi(n,f))}));for(let[f,g]of[[p,-1],[h,1]])f.addEventListener("click",()=>{let w=t(n);if(w?.type!=="stepGrid"||w.rows.length===0)return;let k=w.rows.length;w.onSelectRow?.(((Fn(w)+g)%k+k)%k)});if(c.append(p,m,h),e.onDice){let f=d("nc-pads-step nc-pads-dice","","Re-roll lane");f.dataset.ncPadsDice="",f.innerHTML=co(),f.addEventListener("click",()=>{let g=t(n);if(g?.type!=="stepGrid")return;let w=Fn(g);w>=0&&g.onDice?.(w)}),c.append(f)}if(e.transport){let f=d("nc-pads-play","Play");f.dataset.ncPadsPlay="",f.addEventListener("click",()=>{let g=t(n);g?.type==="stepGrid"&&g.transport?.onToggle()}),c.append(f)}n.append(c);let b=document.createElement("div");b.className="nc-pads",b.setAttribute("role","group");let y=Math.max(0,...e.rows.map(f=>f.steps.length));for(let f=0;f<y;f++){let g=document.createElement("button");g.type="button",g.className="nc-pad",g.dataset.ncPad=String(f),g.textContent=String(f+1),g.addEventListener("click",w=>{let k=t(n);if(k?.type!=="stepGrid")return;let L=Fn(k);if(L<0)return;if(n.dataset.ncLenMode==="true"){k.onLength?.(L,f+1);return}let A=s.getAttribute("aria-checked")==="true";k.onToggle(L,f,w.shiftKey||A)}),b.append(g)}return mo(n,b,".nc-pad",t,s,()=>{let f=t(n);return f?.type==="stepGrid"?f.rows[Fn(f)]?.id:void 0}),n.append(b),n.append(he()),gi(n,e),n}function Fn(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function mo(e,t,n,a,i,o){let s="on",l=!0,u=-1,c=(d,p)=>{let h=d.rows[u]?.steps[p];!h||p>=d.rows[u].length||(d.onSet?d.onSet(u,p,s,l):!!h[s]!==l&&d.onToggle(u,p,s==="accent"))};sh(t,n,d=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(d.kind!=="paint")return;let h=p.rows.findIndex(m=>m.id===o());h>=0&&p.rows[h].length!==d.pad+1&&p.onLength?.(h,d.pad+1);return}if(d.kind==="paint"){if(d.phase==="start"){let h=o();u=p.rows.findIndex(b=>b.id===h);let m=p.rows[u]?.steps[d.pad];if(!m)return;s=i.getAttribute("aria-checked")==="true"?"accent":"on",l=!m[s]}c(p,d.pad)}else if(d.kind==="long"){let h=o(),m=p.rows.findIndex(y=>y.id===h),b=t.querySelectorAll(n)[d.pad];m>=0&&b instanceof HTMLElement&&p.onLongPress?.(m,d.pad,b)}}})}function qh(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],i=a.indexOf(t),o=i;n.key==="ArrowDown"?o=i+1:n.key==="ArrowUp"?o=i-1:n.key==="Home"?o=0:o=a.length-1;let s=a[o];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function Ih(e,t,n,a){let i=document.createElement("button");i.type="button",i.className="nc-len-handle",i.dataset.ncLen=n.id,i.setAttribute("role","slider"),i.setAttribute("aria-valuemin","1"),i.setAttribute("aria-valuemax",String(n.steps.length)),i.append(Oe());let o=c=>{let d=a(e);if(d?.type!=="stepGrid")return;let p=d.rows.findIndex(b=>b.id===n.id),h=d.rows[p];if(!h)return;let m=Math.max(1,Math.min(h.steps.length,c));m!==h.length&&d.onLength?.(p,m)},s=c=>{let d=[...t.querySelectorAll(".nc-step")],p=1;return d.forEach((h,m)=>{let b=h.getBoundingClientRect();b.width>0&&c>=b.left+b.width/2&&(p=m+1)}),p},l=c=>o(s(c.clientX)),u=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete i.dataset.dragging};return i.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),i.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),i.addEventListener("keydown",c=>{let d=a(e);if(d?.type!=="stepGrid")return;let p=d.rows.find(m=>m.id===n.id);if(!p)return;let h={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};c.key in h&&(c.preventDefault(),o(h[c.key]))}),i}var qa=new WeakMap,Nn=new WeakMap;function _h(e){return e?(Nn.has(e)||(Nn.set(e,Jn(e)),Fs(t=>{Nn.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))mi(n,Number(n.getAttribute("data-nc-velocity")))},e)),Nn.get(e)):"light"}function mi(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:_h(e.ownerDocument),i=n===null?null:`${a} ${n}`;if(!(qa.has(e)&&qa.get(e)===i)){if(qa.set(e,i),n===null){for(let o of Object.keys(Vr(1)))e.style.removeProperty(o);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[o,s]of Object.entries(Vr(n,Ur[a]??Ur.light)))e.style.setProperty(o,s)}}function gi(e,t){let n=t.rows.some(d=>d.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let i=e.querySelector(".nc-pads"),o=t.rows.find(d=>d.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&o&&(s.textContent=l?`${o.label} · ${o.length}`:o.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let u=e.querySelector("[data-nc-pads-dice]");u instanceof HTMLElement&&o&&(u.setAttribute("aria-label",`Re-roll ${o.label}`),u.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let c=e.querySelector("[data-nc-pads-play]");if(c instanceof HTMLElement){let d=!!t.transport?.playing,p=t.transport?.label??(d?"Stop":"Play");c.textContent!==p&&(c.textContent=p),c.setAttribute("aria-pressed",d?"true":"false");let h=t.transport?.ariaLabel;h?c.setAttribute("aria-label",h):c.removeAttribute("aria-label")}if(i instanceof HTMLElement&&o){i.setAttribute("aria-label",`${o.label} steps`),o.lane&&(i.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?i.dataset.silent="true":delete i.dataset.silent;let d=o.length>0?(t.playhead%o.length+o.length)%o.length:-1;for(let p of i.querySelectorAll("[data-nc-pad]")){let h=Number(p.getAttribute("data-nc-pad")),m=o.steps[h];p instanceof HTMLButtonElement&&(p.hidden=!m||!l&&h>=o.length,l&&h>=o.length?p.dataset.out="true":delete p.dataset.out,l&&h===o.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${o.label} step ${h+1}`),p.setAttribute("aria-pressed",m?.on?"true":"false"),m?.accent?p.dataset.accent="true":delete p.dataset.accent,m?.dim?p.dataset.dim="true":delete p.dataset.dim,mi(p,m?.velocity),t.playhead>=0&&h===d?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let d of t.rows){for(let m=0;m<d.steps.length;m++){let b=d.steps[m],y=e.querySelector(`[data-nc-step="${d.id}:${m}"]`);if(!(y instanceof HTMLButtonElement))continue;let f=y.closest(".nc-row");if(f instanceof HTMLElement){t.selectedRow===d.id?f.dataset.selected="true":delete f.dataset.selected;let k=t.selectedRow!==d.id&&(t.selectedRows??[]).includes(d.id);k?f.dataset.picked="true":delete f.dataset.picked;let L=f.querySelector(".nc-name");L instanceof HTMLElement&&(L.setAttribute("aria-pressed",t.selectedRow===d.id||k?"true":"false"),L.textContent!==d.label&&(L.textContent=d.label,L.setAttribute("aria-label",`Select ${d.label}`))),d.mute||n&&!d.solo?f.dataset.silent="true":delete f.dataset.silent;for(let A of f.querySelectorAll("[data-nc-ms]")){let v=A.getAttribute("data-nc-ms")==="mute"?d.mute:d.solo;A.setAttribute("aria-pressed",v?"true":"false")}}y.setAttribute("aria-pressed",b.on?"true":"false"),b.accent?y.dataset.accent="true":delete y.dataset.accent,b.dim?y.dataset.dim="true":delete y.dataset.dim,m%4===0?y.dataset.bar="true":delete y.dataset.bar,typeof b.velocity=="number"?(y.dataset.velocity="true",y.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,b.velocity))*100)}%`)):(delete y.dataset.velocity,y.style.removeProperty("--level")),mi(y,b.velocity);let g=t.playhead>=0&&d.length>0?(t.playhead%d.length+d.length)%d.length:-1;m===g?y.dataset.playhead="true":delete y.dataset.playhead;let w=!!t.onLength&&t.selectedRow===d.id;y.hidden=m>=d.length&&!w,m>=d.length&&w?y.dataset.out="true":delete y.dataset.out}let p=e.querySelector(`[data-nc-len="${d.id}"]`),h=e.querySelector(`[data-nc-step="${d.id}:${Math.max(0,d.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&h&&h.nextElementSibling!==p){let m=document.activeElement===p;h.after(p),m&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(d.length)),p.setAttribute("aria-label",`${d.label} length, ${d.length} steps`),p.title=`${d.label}: drag to set the length (${d.length} steps)`)}}function Bh(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,he()),t}function jh(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let i=document.createElement("span");i.className="nc-strip-name",i.dataset.ncStripName="";let o=!e.master&&typeof e.onFold=="function",s=null;if(o&&(n.dataset.ncFoldable="",s=El(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let g=t(n);g?.type==="strip"&&(g.onFold?.(g.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(i),e.onRemove){let g=document.createElement("button");g.type="button",g.className="nc-strip-remove",g.dataset.ncStripRemove="",g.textContent="×",g.addEventListener("click",()=>{let w=t(n);w?.type==="strip"&&w.onRemove?.(g)}),a.append(g)}let l=document.createElement("div");if(l.className="nc-strip-hacks",e.onHacks){let g=document.createElement("span");g.className="nc-hacks-wrap";let w=document.createElement("button");w.type="button",w.className="nc-hacks",w.dataset.ncHacks="",g.append(w,Oe()),g.addEventListener("click",()=>{let k=t(n);k?.type==="strip"&&k.onHacks?.()}),l.append(g)}let u=document.createElement("div");u.className="nc-strip-ms";for(let g of["mute","solo"]){if(!(g==="mute"?e.onMute:e.onSolo))continue;let w=document.createElement("span");w.className="nc-ms-wrap";let k=document.createElement("button");k.type="button",k.className="nc-ms",k.dataset.ncMs=g,k.textContent=g==="mute"?"M":"S",w.append(k,Oe()),w.addEventListener("click",()=>{let L=t(n);L?.type==="strip"&&(g==="mute"?L.onMute:L.onSolo)?.()}),u.append(w)}let c=document.createElement("div");c.className="nc-strip-sends";for(let g of e.sends??[])c.append(Dt({...g,type:"knob",compact:!0},t));let d=document.createElement("div");d.className="nc-strip-pan",e.pan&&d.append(Dt(Ui(e),t));let p=document.createElement("div");p.className="nc-strip-body";let h=document.createElement("span");h.className="nc-scale",h.setAttribute("aria-hidden","true");for(let g of e.ticks??[]){let w=document.createElement("span");w.className="nc-scale-tick",w.style.setProperty("--tick-pos",String(g.value)),w.textContent=g.label,h.append(w)}let m=mp({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:g=>{let w=t(n);w?.type==="strip"&&w.onChange(g)},onReset:()=>{let g=t(n);g?.type==="strip"&&bo(g)}}),b=xp({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let g=t(n);g?.type==="strip"&&g.onClipClear?.()}});if(p.append(h,m.el,b.el),o){let g=document.createElement("button");g.type="button",g.className="nc-ui-fx-fold nc-strip-fold",g.dataset.ncStripFold="",g.setAttribute("aria-expanded","false");let w=document.createElement("span");w.className="nc-strip-fold-cap",w.setAttribute("aria-hidden","true");let k=document.createElement("span");k.className="nc-ui-fx-fold-name",k.dataset.ncStripFoldName="";let L=document.createElement("span");L.className="nc-strip-fold-pan",L.setAttribute("aria-hidden","true"),L.hidden=!e.pan,g.append(w,L,k),g.addEventListener("click",()=>{let A=t(n);if(A?.type!=="strip")return;A.onFold?.(!1);let v=n.querySelector("[data-nc-strip-hide]");v instanceof HTMLElement&&v.focus()}),p.prepend(g)}let y=document.createElement("button");y.type="button",y.className="nc-strip-db",y.dataset.ncReadout="";let f=0;return y.addEventListener("click",g=>{let w=t(n);w?.type!=="strip"||!w.onTypeIn||(window.clearTimeout(f),g.detail===0?go(n,y,t):g.detail===1&&(f=window.setTimeout(()=>go(n,y,t),Uh)))}),y.addEventListener("dblclick",()=>{window.clearTimeout(f);let g=t(n);g?.type==="strip"&&bo(g)}),s&&n.append(s),n.append(a,l,u,c,d,p,y,he()),$l(n,e),n}function Ui(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??Hh(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function Hh(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var Uh=250;function go(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let i=document.createElement("input");i.type="text",i.className="nc-strip-db-input",i.inputMode="decimal",i.spellcheck=!1,i.autocomplete="off",i.value=a.valueText??fn(a.value),i.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(i),i.focus(),i.select?.();let o=!1,s=l=>{if(o)return;o=!0;let u=i.value;if(i.remove(),t.hidden=!1,l){let c=n(e);c?.type==="strip"&&c.onTypeIn?.(u)}t.focus?.()};i.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),i.addEventListener("blur",()=>s(!1))}function Vh(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-strip-add-plus",i.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",a.append(i,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),u=s.value;xl(s),l?.type==="stripAdd"&&u&&l.onAdd(u)}),n.append(a,s,he()),vl(n,e),n}function vl(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let i=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],o=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=i.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==s&&(a.replaceChildren(...i.map(l=>{let u=document.createElement("option");return u.value=l.value,u.textContent=l.label,u.disabled=l.disabled===!0,u})),xl(a))}function xl(e){let t=e.options[0];t&&(t.selected=!0)}function bo(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function $l(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let i=e.querySelector(".nc-fader"),o=i?gp(i):void 0;o&&(o.configure({step:t.step}),o.set(t.value),o.setText(t.valueText),o.setLabel(`${t.label} level`)),Bs(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let p=t.valueText??fn(t.value);s.textContent!==p&&(s.textContent=p),s.setAttribute("aria-label",`${t.label} level ${p}`);let h=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${h}`:h}for(let p of e.querySelectorAll("[data-nc-ms]")){let h=p.getAttribute("data-nc-ms"),m=h==="mute"?t.mute===!0:t.solo===!0;p.setAttribute("aria-pressed",m?"true":"false"),p.setAttribute("aria-label",`${h==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let p=t.hacksLabel??"Hacks";l.textContent!==p&&(l.textContent=p),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${p}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}if(t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let p=e.querySelector(`.nc-strip-pan [data-nc-id="${Lt(t.pan.id)}"]`);p&&Me(p,Ui(t))}let u=!t.master&&typeof t.onFold=="function"&&t.folded===!0;u?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let c=e.querySelector("[data-nc-strip-hide]");c instanceof HTMLElement&&(Al(c,u,t.label),ut(c,t.foldHelp));let d=e.querySelector("[data-nc-strip-fold]");if(d instanceof HTMLElement){d.hidden=!u,d.setAttribute("aria-label",`Expand ${t.label}`);let p=d.querySelector("[data-nc-strip-fold-name]");p&&p.textContent!==t.label&&(p.textContent=t.label),ut(d,t.foldedHelp??t.foldHelp)}}function yo(e,t){let n=e?.querySelector?.(`.nc-strip[data-nc-id="${Lt(t)}"]`);return Bs(n?.querySelector(".nc-meter")??void 0)}var bi=typeof ResizeObserver=="function"?new ResizeObserver(Gh):null;function Gh(e){for(let t of e){if(!t.target.isConnected){bi.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&Wh(n)}}function Wh(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,i=n instanceof HTMLElement?n.offsetHeight:0,o=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+i+o}px`)}function Yh(e){if(bi)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))bi.observe(t)}function Kh(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let i=typeof e.onFold=="function",o=!!e.meter,s=typeof e.onRemove=="function";if(e.on===void 0&&!i&&!ta(e)&&!o&&!s)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),o&&l.append(Ml(n,"head")),e.on!==void 0){let u=qs({checked:e.on,labelledBy:a.id,onChange:c=>{let d=t(u.el);d?.type==="fx"&&d.onToggle?.(c)}});u.el.dataset.ncFxSwitch="",l.append(u.el)}i&&l.append(Qh(n,t)),ta(e)&&l.append(tf(n,t)),s&&l.append(nf(t)),n.append(l)}i&&n.prepend(Jh(n,t)),o&&Tl(n,e);for(let l of e.controls)n.append(Dt(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let u=document.createElement("summary");u.textContent=e.moreLabel??"More",l.append(u);for(let c of e.more)l.append(Dt(c,t));n.append(l)}return n.append(he()),Ll(n,e),Yh(n),n}var Xh=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function kl(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&Xh(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function Qh(e,t){let n=El();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),kl(e))}),n}function El(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Al(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function Jh(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let i=document.createElement("span");i.className="nc-ui-fx-fold-name",i.dataset.ncFxFoldName="";let o=document.createElement("span");return o.className="nc-fold-tri",o.setAttribute("aria-hidden","true"),n.append(o,a,i),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Ml(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),kl(e)}}),n}var Rt=new Set;function _n(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var ta=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"),Zh="(max-width: 768px)";function ef(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function tf(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(ef()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(Sl(e,a,!Rt.has(a.id)),n.focus())}),n}function nf(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function Sl(e,t,n){n?Rt.add(t.id):Rt.delete(t.id),Vi(e,t)}function af(e,t){t?.type==="fx"&&Rt.has(t.id)&&Sl(e,t,!1)}function rf(e){return e.ownerDocument.defaultView?.matchMedia?.(Zh).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Vi(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=ta(t)&&Rt.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!ta(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),_n(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Pt(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",ut(n,t.maxHelp)),!a){e.dataset.ncMax&&wo(e);return}if(!e.isConnected){let s=()=>e.isConnected&&Rt.has(t.id)&&Vi(e,t);queueMicrotask(()=>{e.isConnected?s():_n(e.ownerDocument,s)});return}let i=rf(e),o=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;o>0&&e.style.setProperty("--nc-fx-dials",String(o)),e.dataset.ncMax!==i&&(e.dataset.ncMax&&wo(e),e.dataset.ncMax=i,i==="over"&&of(e,t)),sf(e.ownerDocument),i==="over"&&Gi(e),_n(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Pt(s)})}function wo(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),_n(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Pt(n)})}function of(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let i=e.querySelector("[data-nc-fx-max]");i instanceof HTMLElement&&i.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function Gi(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,i=e.ownerDocument.defaultView,o=Number.parseFloat(i?.getComputedStyle(a).columnGap??"")||0,s=Ip(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),o,i?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var vo=new WeakSet;function sf(e){vo.has(e)||(vo.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(i=>i.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&Gi(t)}))}var yi=new WeakMap;function Ml(e,t){let n=th(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Tl(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let i of n)ut(i,t.meterHelp);let a=yi.get(e);a?a.set(t.meter):yi.set(e,rh(n,t.meter))}function Ll(e,t){(t.meter||yi.has(e))&&Tl(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let i=typeof t.onFold=="function"&&t.folded===!0;i?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let o=e.querySelector("[data-nc-fx-hide]");o instanceof HTMLElement&&(Al(o,i,t.title),ut(o,t.foldHelp)),Vi(e,t);let s=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let u=t.removeLabel??`Remove ${t.title}`;s.hidden=i,s.setAttribute("aria-label",u),s.title=u}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let u=t.on===void 0?"":t.on?"On":"Off";l.hidden=!i,l.setAttribute("aria-label",`Expand ${t.title}${u?`, ${u.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let c=l.querySelector("[data-nc-fx-fold-state]");c&&(c.textContent=u,c.hidden=u==="");let d=l.querySelector("[data-nc-fx-fold-name]");d&&(d.textContent=t.title),ut(l,t.foldHelp)}}function ut(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Lt(e){return e.replace(/["\\]/g,"\\$&")}function lf(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(i=>i.type==="canvas"&&i.id===n.dataset.ncId);a?.type==="canvas"&&Vs(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Pt(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&Gi(n);yh(e)}var cf=Xe["toast-duration"];function df({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function uf(e,t,n,a){let i=l=>({top:l,bottom:l+n}),o=l=>e.some(u=>u&&u.bottom>l.top&&u.top<l.bottom),s=i(t-a-n);return o(s)?o(i(a))?"bottom":"top":"bottom"}function pf(e,t,n,a,i,o){let s=e.bottom+i,l=Math.max(o,Math.min(e.left,a-o-n.width));for(let u=!0,c=0;u&&c<8;c++){u=!1;for(let d of t)d&&d.bottom>s&&d.top<s+n.height&&d.right>l&&d.left<l+n.width&&(s=d.bottom+i,u=!0)}return{top:s,left:l}}var xo="data-nc-ui-toast-live";function hf(e,t){let n=t.querySelector(`[${xo}]`);return n||(n=e.createElement("div"),n.setAttribute(xo,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function Zt({message:e,actionLabel:t,onAction:n,duration:a=cf,onClose:i,avoid:o=[],anchor:s,host:l,document:u=globalThis.document}={}){l=l??u.body;let c=u.defaultView??globalThis,d=u.createElement("div");d.className="nc-ui-toast",d.setAttribute("data-state","enter");let p=u.createElement("span");p.className="nc-ui-toast-message",p.textContent=e,d.appendChild(p);let h=null;t&&(h=u.createElement("button"),h.type="button",h.className="nc-ui-toast-action",h.textContent=t,d.appendChild(h)),l.appendChild(d);let m="open",b=re=>re&&typeof re.getBoundingClientRect=="function"?re.getBoundingClientRect():null,y=b(d),f=y?.height||44,g=c.getComputedStyle?.(d),w=Number.parseFloat(g?.getPropertyValue(J("toast-offset")))||16,k=Number.parseFloat(g?.getPropertyValue(J("toast-anchor-gap")))||8,L=b(s),A=c.innerHeight??0,v=o.map(b).filter(Boolean),x=L&&L.bottom>0&&L.top<A?pf(L,v,{width:y?.width||0,height:f},c.innerWidth??0,k,w):null;x&&x.top+f<=A?(d.setAttribute("data-placement","anchor"),d.style.top=`${x.top+(c.scrollY??0)}px`,d.style.left=`${x.left+(c.scrollX??0)}px`):d.setAttribute("data-placement",uf(v,A,f,w));let E=c.requestAnimationFrame?.bind(c)??(re=>setTimeout(re,16));E(()=>E(()=>{m==="open"&&d.setAttribute("data-state","open")})),hf(u,l).textContent=df({message:e,actionLabel:t});let T,N,z=new Promise(re=>{N=re}),U=re=>{clearTimeout(T),T=setTimeout(()=>be("timeout"),re)},K=a,X=Date.now(),fe=()=>{m==="open"&&(clearTimeout(T),K=Math.max(0,K-(Date.now()-X)))},me=()=>{m==="open"&&(X=Date.now(),U(K))};d.addEventListener("pointerenter",fe),d.addEventListener("pointerleave",me),d.addEventListener("focusin",fe),d.addEventListener("focusout",me),h?.addEventListener("click",()=>{if(m==="open")try{n?.()}finally{be("action")}}),Number.isFinite(a)&&U(a);function be(re="close"){if(m!=="open")return;m="closing",clearTimeout(T),d.setAttribute("data-state","closing"),i?.(re);let B=c.getComputedStyle?.(d),Ee=B?Math.max(0,...String(B.transitionDuration||"").split(",").map(ce=>Number.parseFloat(ce)*(ce.trim().endsWith("ms")?1:1e3)||0)):0,_=()=>{m!=="gone"&&(m="gone",d.remove(),N(re))};d.addEventListener("transitionend",_),setTimeout(_,Ee+50)}return{el:d,close:be,closed:z}}var $o="data-nc-help";function ff(e,t,n,a=0,i=6,o=8){let s=e.top-i-t.height,l=s>=a+o?"above":"below",u=l==="above"?s:e.bottom+i,c=Math.max(o,Math.min(e.left,n-o-t.width));return{top:Math.round(u),left:Math.round(c),side:l}}var Ia=new WeakMap;function mf(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function gf({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=Ia.get(e);if(n)return n;let a=e.defaultView,i=null,o=null,s,l=()=>{clearTimeout(s),o=null,i&&(i.hidden=!0)},u=h=>{let m=h.getAttribute($o);if(!m)return;i||(i=e.createElement("div"),i.className="nc-ui-help",i.setAttribute("role","tooltip"),i.dataset.testid="nc-help",i.style.position="fixed",i.style.pointerEvents="none",i.style.zIndex="6",e.body.appendChild(i)),i.textContent=m,i.hidden=!1,i.style.visibility="hidden",i.style.top="0px",i.style.left="0px";let b=h.getBoundingClientRect(),y=ff(b,{width:i.offsetWidth,height:i.offsetHeight},a.innerWidth,mf(e));i.style.top=`${y.top}px`,i.style.left=`${y.left}px`,i.dataset.side=y.side,i.style.visibility=""},c=h=>{if(h.pointerType==="touch")return;let m=h.target&&h.target.closest?h.target.closest(`[${$o}]`):null;m!==o&&(l(),m&&(o=m,s=setTimeout(()=>{o===m&&m.isConnected&&u(m)},t)))},d=h=>{h.key==="Escape"&&l()};e.addEventListener("pointerover",c),e.addEventListener("pointerdown",l,!0),e.addEventListener("keydown",d),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);let p={hide:l,uninstall(){l(),e.removeEventListener("pointerover",c),e.removeEventListener("pointerdown",l,!0),e.removeEventListener("keydown",d),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),i?.remove(),i=null,Ia.delete(e)}};return Ia.set(e,p),p}var Cl="(max-width: 768px)",bf='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',yf='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',wf=0;function vf({panel:e,button:t,label:n="Menu",media:a=Cl}){let i=e.ownerDocument,o=i.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++wf}`);let s=t??i.createElement("button");t||(s.type="button",s.innerHTML=bf),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function u(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),i.addEventListener("keydown",d,!0),i.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(yf)].find(f=>!f.hidden&&f.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function c({focus:f}={}){if(!l())return;let g=e.contains(i.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),i.removeEventListener("keydown",d,!0),i.removeEventListener("pointerdown",p,!0),(f??g)&&s.focus?.({preventScroll:!0})}function d(f){f.key==="Escape"&&(f.preventDefault(),f.stopPropagation(),c({focus:!0}))}function p(f){let g=f.target;g instanceof o.Node&&(e.contains(g)||s.contains(g))||c({focus:!1})}let h=()=>l()?c({focus:!0}):u(),m=f=>{let g=f.target,w=g instanceof o.Element?g.closest("button"):null;!w||!e.contains(w)||w.closest("[data-nc-menu-stay]")||c({focus:!0})};s.addEventListener("click",h),e.addEventListener("click",m);let b=o.matchMedia?.(a),y=()=>{b?.matches||c({focus:!1})};return b?.addEventListener?.("change",y),{button:s,panel:e,open:u,close:c,isOpen:l,destroy(){c({focus:!1}),s.removeEventListener("click",h),e.removeEventListener("click",m),b?.removeEventListener?.("change",y)}}}var Wi="netcomposer.rhythm.hidden.v1",Pe=new WeakMap;function _a(){try{return globalThis.localStorage??null}catch{return null}}function Fl(e,t=Wi){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function ko(e,t,n,a=Wi){let i=Fl(e,a);n?i.add(t):i.delete(t);try{e?.setItem(a,JSON.stringify([...i]))}catch{}}function Yi(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(i=>i.controls)],n=[],a=i=>{if(n.push(i),i.type==="group")for(let o of i.controls)a(o)};for(let i of t)a(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&(n.push(...(i.sends??[]).map(o=>({...o,type:"knob",compact:!0}))),i.pan&&n.push(Ui(i)));return n}function Nl(e,t){if(!(!e||!t))return Yi(e).find(n=>n.id===t)}function xf(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${Yi(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function $f(e,t){if(!t.title)return;if(!t.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=t.title,e.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let i=document.createElement("span");i.className="nc-panel-subject",i.dataset.ncPanelSubject="",n.append(a,i),e.append(n),zl(e,t)}function zl(e,t){if(!t.panel)return;let n=[...e.children].find(o=>o.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),i=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),i&&(i.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function kf(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=Pe.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Nl(n,a)}function Ef(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],i=xf(t);if(e.dataset.ncSignature===i){for(let o of a){let s=e.querySelector(`[data-nc-section="${Ao(o.id)}"]`);s&&zl(s,o);for(let l of o.controls){let u=e.querySelector(`[data-nc-id="${Ao(l.id)}"]`);u instanceof Element&&Me(u,l)}s instanceof HTMLElement&&wi(s,o,n)}return}e.dataset.ncSignature=i,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let o of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=o.id,o.inset&&(s.dataset.ncInset="true"),o.area&&(s.dataset.ncArea=o.area),o.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",o.label)),o.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),o.title&&s.setAttribute("aria-label",o.title)),$f(s,o);let l=o.panel?document.createElement("div"):s;o.panel&&(l.className="nc-panel-body",s.append(l));for(let u of o.controls)l.append(Dt(u,kf));e.append(s),wi(s,o,n)}}function Pl(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,i=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,i))}}var Af="(max-width: 768px)",Dl=new WeakMap;function Eo(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function Sf(e,t){let n=[...e.children].find(c=>c.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let i=Eo("prev"),o=Eo("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(i,s,o,l);let u=(c,d)=>{let p=Dl.get(e);if(!p||d.getAttribute("aria-disabled")==="true")return;let h=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:m}=Pl(h,p.pageSize,(t.pages.get(p.id)??0)+c);t.pages.set(p.id,m),p.onPage?.(m),wi(e,{...p,page:m},t),d.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===d&&(d===i?o:i).focus(),t.redraw()};return i.addEventListener("click",()=>u(-1,i)),o.addEventListener("click",()=>u(1,o)),e.prepend(a),a}function wi(e,t,n){Dl.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],i=t.pageSize??0,{pages:o,page:s}=Pl(a.length,i,t.page??n.pages.get(t.id)??0);if(i>0&&n.pages.set(t.id,s),o<=1){for(let f of[...e.children])f.classList.contains("nc-fx-pager")&&f.remove();delete e.dataset.ncPaged;for(let f of a)delete f.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(Af).matches===!0,u=e.closest(".nc-module");a.forEach((f,g)=>{let w=Math.floor(g/i)!==s;if(w?f.dataset.ncOffPage="":delete f.dataset.ncOffPage,w&&!l){let k=u instanceof HTMLElement?Pe.get(u):void 0;af(f,Nl(k,f.dataset.ncId))}});let c=Sf(e,n),d=c.querySelector('[data-nc-fx-page="prev"]'),p=c.querySelector('[data-nc-fx-page="next"]');d.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===o-1?"true":"false");let h=c.querySelector("[data-nc-fx-page-count]"),m=`${s+1} / ${o}`;h.textContent!==m&&(h.textContent=m);let b=c.querySelector("[data-nc-fx-page-live]"),y=`Effects page ${s+1} of ${o}`;b.textContent!==y&&(b.textContent=y)}function Ao(e){return e.replace(/["\\]/g,"\\$&")}function Mf(e,t=Wi){Ds();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Fl(_a(),t).has(e.id),i=document.createElement("header");i.className="nc-module-hd",i.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="";let c=qs({labelledBy:o.id,onChange:w=>(Pe.get(n)??e).onToggle?.(w)});c.el.dataset.ncModuleSwitch="",s.append(c.el,l,u);let d=document.createElement("span");d.className="nc-snap-msg",d.dataset.ncStatus="",i.append(o,d,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let h=document.createElement("button");h.type="button",h.className="nc-slim";let m=document.createElement("span");m.className="nc-slim-lines",h.append(m);let b=document.createElement("i");b.className="nc-token-probe",b.dataset.ncProbe="",n.append(b,i,p,h),n.setAttribute("aria-labelledby",o.id);let y=w=>{let k=Pe.get(n)??e;n.dataset.ncOpen=w?"false":"true",p.hidden=w,h.hidden=!w,l.textContent=w?"+":"−",l.setAttribute("aria-expanded",w?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${w?"Show":"Hide"} ${k.title}`),l.title=w?"Show":"Hide",w?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let w=n.dataset.ncOpen==="true";ko(_a(),(Pe.get(n)??e).id,w,t),y(w),vi(n.parentElement)}),h.addEventListener("click",()=>{ko(_a(),(Pe.get(n)??e).id,!1,t),y(!1),vi(n.parentElement)});let f={pages:new Map,redraw:()=>g.redraw()},g={el:n,update(w){Pe.set(n,w),w.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=w.title,d.textContent=w.status??"",w.status!==void 0?d.setAttribute("aria-live","polite"):d.removeAttribute("aria-live"),m.textContent=w.summary??w.title,c.el.hidden=w.on===void 0,c.set(w.on===!0),w.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,h.setAttribute("aria-label",`Show ${w.title}`),Ef(p,w,f),y(p.hidden),g.redraw()},redraw(){let w=Pe.get(n);w&&lf(n,Yi(w))}};return Pe.set(n,e),y(a),g.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>g.redraw()).observe(n),Fs(()=>g.redraw(),n.ownerDocument),g}function Tf(e,t,n="adjacent"){Ds(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((i,o)=>{let s=o%4+1;i.el.dataset.ncShade=String(s),i.el.dataset.ncPlace=a;let l=i.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(i.el),i.redraw()}),vi(e)}function vi(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=t.some(o=>o.hasAttribute("data-nc-lead")),a=t.map(o=>o.hasAttribute("data-nc-slim")?r("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let i=t.filter(o=>!o.hasAttribute("data-nc-slim"));n&&t.length===4&&i.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Rl="netcomposer.studio.instances.v1",So="netcomposer.studio.types-seen.v1",Lf=["petra-rhythm","olive-bass"];function Ol(e,t){return t===1?e:`${e}#${t}`}function Ki(e){const t=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(e);if(!t?.[1])return null;const n=t[2]?Number(t[2]):1;return n===1&&t[2]?null:{type:t[1],n}}function Cf(e,t){return t===1?e.name:`${e.name} ${t}`}function _t(e,t,n){const a=Cf(e,t),i=Il(n,a);return{id:Ol(e.id,t),type:e.id,n:t,name:i,src:e.src,...i!==a?{custom:!0}:{}}}const ql=20;function Il(e,t){return typeof e!="string"?t:[...e.replace(/\s+/g," ").trim()].slice(0,ql).join("").trim()||t}function Ff(e,t,n,a){return e.map(i=>{if(i.id!==t)return i;const o=a.find(s=>s.id===i.type);return o?_t(o,i.n,n):i})}function Nf(e,t){const n=new URLSearchParams({instance:String(e.n)});return t&&n.set("measure",""),`${e.src}?${n.toString().replace(/=(&|$)/g,"$1")}`}function zf(e,t){const n=new Set(e.filter(i=>i.type===t.id).map(i=>i.n));let a=1;for(;n.has(a);)a++;return _t(t,a)}function mn(e){return e.filter(t=>t.available!==!1).map(t=>_t(t,1))}function Pf(e,t){if(!Array.isArray(e))return mn(t);const n=[];for(const a of e){const i=a&&typeof a=="object"?a:null,o=typeof a=="string"?a:i?.id;if(typeof o!="string")continue;const s=Ki(o),l=s&&t.find(u=>u.id===s.type&&u.available!==!1);!s||!l||n.some(u=>u.id===o)||n.push(_t(l,s.n,i?.name))}return n.length>0||e.length===0?n:mn(t)}function Xi(){try{return globalThis.localStorage??null}catch{return null}}function Df(e,t=Xi()){try{const n=t?.getItem(Rl);return n?Pf(JSON.parse(n),e):mn(e)}catch{return mn(e)}}function Rf(e,t,n=Xi()){let a=Lf;try{const s=JSON.parse(n?.getItem(So)??"null");Array.isArray(s)&&(a=s.filter(l=>typeof l=="string"))}catch{}const i=t.filter(s=>!a.includes(s.id)&&s.available!==!1);if(i.length===0)return[...e];const o=[...e];for(const s of i)o.some(l=>l.type===s.id)||o.push(_t(s,1));try{n?.setItem(So,JSON.stringify([...new Set([...a,...i.map(s=>s.id)])]))}catch{}return o.length!==e.length&&Bt(o,n),o}function Of(e){return e.map(t=>t.custom?{id:t.id,name:t.name}:t.id)}function Bt(e,t=Xi()){try{t?.setItem(Rl,JSON.stringify(Of(e)))}catch{}}function qf(e,t){const n=new Map;return(a,i)=>{const o=Ki(a),s=o?.type??a,l=i?.instance!==void 0?Number(i.instance):a.includes("#")?o?.n:void 0,u=e().filter(d=>d.instance.type===s);let c;if(l!==void 0&&Number.isInteger(l)&&l>=1)c=u.find(d=>d.instance.n===l);else{const d=u.filter(p=>{const h=p.window();return h!=null&&h!==n.get(p.instance.id)});c=d.find(p=>p.readyState?.()!=="complete")??d[0]??u[0]}if(!c){if(t.some(p=>p.id===s))return null;const d=l!==void 0?Ol(s,l):a;return{id:d,name:d}}return n.set(c.instance.id,c.window()),{id:c.instance.id,name:c.instance.name}}}const Ba="netcomposer.studio.pending-presets.v1",If=3e3,_f=6e4;function Mo(e){return!!e&&typeof e=="object"&&typeof e.format=="string"&&"data"in e}function Bf(e,t){return new Promise(n=>{const a=setTimeout(()=>n(void 0),t);e.then(i=>{clearTimeout(a),n(i)},()=>{clearTimeout(a),n(void 0)})})}function jf(e){const t=new Map,n=[],a=()=>{try{const s=JSON.parse(e()?.getItem(Ba)??"{}"),l={};if(s&&typeof s=="object")for(const[u,c]of Object.entries(s))Mo(c)&&(l[u]=c);return l}catch{return{}}},i=s=>{try{const l=e();if(!l)return;Object.keys(s).length?l.setItem(Ba,JSON.stringify(s)):l.removeItem(Ba)}catch{}},o=async(s,l)=>{const u=a(),c=u[s];if(!c)return;delete u[s],i(u);let d=c.format===l.format;if(d)try{await l.set(c.data)}catch{d=!1}for(const p of n)p(s,d)};return{provide(s,l){!l||typeof l.get!="function"||typeof l.set!="function"||(t.set(s,l),o(s,l))},provided:()=>[...t.keys()],async collect(s,l=If){const u={};return await Promise.all(s.map(async c=>{const d=t.get(c);if(!d)return;const p=await Bf(Promise.resolve().then(()=>d.get()),l);p!=null&&(u[c]={format:d.format,...d.version!==void 0?{v:d.version}:{},data:p})})),u},stash(s){const l={};for(const[u,c]of Object.entries(s))Mo(c)&&(l[u]=c);i(l)},onApplied(s){n.push(s)},pending:()=>Object.keys(a()),dropPending(){const s=Object.keys(a());return i({}),s}}}function Hf(e,t){return`${e}@studio/${t}`}const Uf=1,ve=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX",identity:"instrument-nyx"}],Qi=[...ve];function Vf(e,t,n={}){const a=n.instruments??ve;return{version:Uf,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},...n.grab?{grab:n.grab}:{},...n.play?{play:n.play}:{},...n.countIn?{countIn:n.countIn}:{},attach(i,o){if(typeof i!="string"||i.length===0||i.length>64)return null;const s=n.resolve?n.resolve(i,o):{id:i,name:a.find(p=>p.id===i)?.name??i};if(!s)return null;const l=t.attach(s.id,s.name),u=s.id,c=n.presets,d=n.share?.host(u);return{ctx:e,output:l,...n.mapper===void 0?{}:{mapper:n.mapper},instance:u,storageKey:p=>Hf(p,u),...n.holdFirstPlay?{holdFirstPlay:n.holdFirstPlay}:{},...c?{providePreset:p=>c.provide(u,p)}:{},...d?{audioReceivers:d.audioReceivers,sendAudio:d.sendAudio,onAudio:d.onAudio,reveal:d.reveal}:{}}}}}const To=16,Gf=30;function Wf(e){if(!e||typeof e!="object")return null;const t=e,n=Array.isArray(t.beats)?t.beats.slice(0,To+1):[],a=t.until;if(n.length<1||n.length>To||!n.every(l=>typeof l=="number"&&Number.isFinite(l))||n.some((l,u)=>u>0&&l<=n[u-1]))return null;const i=n[0],o=n[n.length-1];if(typeof a!="number"||!Number.isFinite(a)||a<=o||a-i>Gf)return null;const s=Array.isArray(t.accents)?t.accents:[];return{beats:[...n],accents:n.map((l,u)=>s[u]===!0),until:a}}function Yf(e,t){if(t>=e.until)return null;let n=-1;for(;n+1<e.beats.length&&e.beats[n+1]<=t;)n++;return{n:e.beats.length-Math.max(0,n),accent:n>=0&&e.accents?.[n]===!0}}function Kf(e,t){return t===null?e:`${t} · ${e}`}function Xf(e){let t=0;for(const n of e)Number.isFinite(n)&&n>t&&(t=n);return Math.round(t)}function Qf(e){const t=e.doc??document,n=t.createElement("div");n.className="count-in",n.hidden=!0,n.setAttribute("role","status");const a=t.createElement("span");a.className="count-in-who";const i=t.createElement("span");i.className="count-in-n",n.append(a,i);const o=t.title,s=new Map;let l=!1;const u=()=>{const d=e.now();for(const[k,L]of s)d>=L.until&&s.delete(k);const[p,h]=[...s][0]??[],m=h?Yf(h,d):null;if(!p||!m){n.hidden=!0,delete n.dataset.accent,t.title=o,l=!1;return}n.hidden=!1;const b=e.clearOf?.()??[],y=`${Xf(b.map(k=>k.getBoundingClientRect().bottom))}px`;n.style.getPropertyValue("--count-in-top")!==y&&n.style.setProperty("--count-in-top",y);const f=e.labelOf(p);a.textContent!==f&&(a.textContent=f);const g=String(m.n);i.textContent!==g&&(i.textContent=g),n.toggleAttribute("data-accent",m.accent),n.setAttribute("aria-label",`${f} count-in ${g}`);const w=Kf(o,m.n);t.title!==w&&(t.title=w),requestAnimationFrame(u)},c=()=>{l||(l=!0,requestAnimationFrame(u))};return{el:n,api:{show(d,p){if(typeof d!="string"||!d)return;const h=Wf(p);h&&(s.set(d,h),c())},clear(d){s.delete(d)&&c()}}}}const Jf=1e4;function Zf(e=Jf,t=globalThis){const n=new Set;let a=[];const i=()=>{if(n.size>0)return;const o=a;a=[];for(const s of o)s()};return{hold(){const o={};n.add(o);const s=t.setTimeout(()=>l(),e),l=()=>{n.delete(o)&&(t.clearTimeout(s),i())};return l},get count(){return n.size},idle(){return n.size===0?Promise.resolve():new Promise(o=>a.push(o))}}}const _l="netcomposer.studio.fx-fold.v1",em=["a","b","insert"],Bl={a:!0,b:!0,insert:!1};function jl(e){try{const t=e?.getItem(_l);if(!t)return{};const n=JSON.parse(t);if(!n||typeof n!="object")return{};const a=n,i={};for(const o of em)typeof a[o]=="boolean"&&(i[o]=a[o]);return i}catch{return{}}}function Hl(e){return{...Bl,...jl(e)}}function Ul(e,t,n){const a={...jl(e),[t]:n};try{e?.setItem(_l,JSON.stringify(a))}catch{}return{...Bl,...a}}const Vl="netcomposer.studio.insert-fold.v1";function Gl(e){try{const t=e?.getItem(Vl),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Wl(e,t,n){const a=[...Gl(e)].filter(o=>o!==t);n&&a.push(t);const i=a.slice(-256);try{e?.setItem(Vl,JSON.stringify(i))}catch{}return new Set(i)}function tm(e,t){return Hl(e).insert?(Ul(e,"insert",!1),Wl(e,t,!0)):Gl(e)}function ge(){try{return globalThis.localStorage??null}catch{return null}}const nm={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function Yl(e,t){const n=t.fx[e],a=Vn(n);for(const i of a.chain){const o=nm[e][i.type];n===void 0&&o&&Object.assign(i.dials,o),e==="a"?(i.bypass=i.type!=="plate",i.type==="plate"&&(i.dials.mix=100)):e==="b"?(i.bypass=i.type!=="delay",i.type==="delay"&&(i.dials.mix=100,i.dials.mode=0,i.dials.send=100)):i.bypass=i.type!=="drive"||!t.insert.on}return a}const Kl="drive-1",xi=3;function am(e,t){if(e.masterFx!==null&&e.masterFx!==void 0)return lt(e.masterFx,t);const n=e.insert.on?Yl("insert",e).chain.find(a=>a.type==="drive"):void 0;return lt({v:2,chain:n?[{id:Kl,type:"drive",bypass:!1,dials:{...n.dials}}]:[]},t)}function im(e){return e.chain.some(t=>t.type==="drive"&&!t.bypass)}const rm={"no-source":"that source isn't there",empty:"the range is empty",gone:"that range is older than the 20 seconds kept","not-kept":"that source wasn't being kept yet when the range played",timeout:"no answer from the audio (is it running?)"};function om(e,t,n,a=2e3){return(Number.isFinite(e-t)?Math.max(0,e-t):0)/n*1e3+a}const zn=e=>({channels:null,reason:e,message:rm[e]});function sm(e,t){const n=new Map,a=new Map;let i=1;const o=l=>{const u=t.nodeFor(l);if(!u)return null;const c=n.get(l);if(c&&c.source===u)return c.node;c?.node.disconnect();const d=new AudioWorkletNode(e,"nc-studio-grab",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});return d.port.onmessage=p=>{const h=p.data;h.type!=="took"&&h.type!=="recorded"||(a.get(h.id)?.(h.channels,h.reason),a.delete(h.id))},u.connect(d),n.set(l,{node:d,source:u}),d},s=async(l,u,c)=>{await t.ready;const d=o(l);if(!d)return zn("no-source");if(!(c>u))return zn("empty");const p=i++;return new Promise(h=>{a.set(p,(m,b)=>h(m?{channels:m}:zn(b??"gone"))),d.port.postMessage({type:"take",id:p,from:u,to:c}),setTimeout(()=>{a.delete(p)&&h(zn("timeout"))},om(c,e.currentTime*e.sampleRate,e.sampleRate))})};return{record(l,u){if(!t.nodeFor(l))return null;const c=n.get(l)?.node??null,d=i++;let p=c;const h=b=>p?.port.postMessage(b);p?h({type:"record",id:d,from:u}):t.ready.then(()=>{p=o(l),h({type:"record",id:d,from:u})});let m=!1;return{stop(b){return m?Promise.resolve(null):(m=!0,new Promise(y=>{a.set(d,y),h({type:"record-end",id:d,to:b}),setTimeout(()=>{a.delete(d)&&y(null)},Math.max(0,(b-e.currentTime*e.sampleRate)/e.sampleRate)*1e3+5e3)}))},cancel(){m=!0,h({type:"record-cancel",id:d})}}},sources:()=>t.sources(),latency(l){if(typeof l!="string")return 0;const u=t.latencyFor?.(l)??0;return Number.isFinite(u)&&u>0?Math.round(u):0},listen(l){return t.nodeFor(l)?(t.ready.then(()=>o(l)),!0):!1},take:(l,u,c)=>s(l,u,c).then(d=>d.channels),takeResult:s}}function lm(e){const t=()=>{};return new Proxy(e,{get(n,a,i){if(a==="stop")return t;const o=Reflect.get(n,a,i);return typeof o=="function"?o.bind(n):o}})}const Y={"transport:rec":"Records the Master to a WAV file. If nothing is sounding, Rec arms and waits: it starts on the first sound or on bar 1. Press again to cancel or stop.","mix:sends":"The two send effects every channel feeds with its A and B knobs. Shown while no Inserts button is lit. They start folded: click a column to open it.","inserts:channel":"Shows this channel's own effects, applied before its fader and sends. Press again to go back to Reverb and Delay.","inserts:master":"Shows the master's own effects on the whole mix: none until you add one, up to three (EQ, compressor, drive and so on). Press again to go back to Reverb and Delay.","fx:fold":"Folds this effect sideways into a narrow column so the Mix takes less room. It keeps sounding as set; a click on the column (or its ▶) opens it again.","fx:meter":"The level going into this effect (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. It keeps showing the input, greyed, while the effect is off.","fx:meter-return":"The level the sends feed into this effect (left bar) and its return (right bar), from −48 dB up to full scale; orange near clipping. Silent while the return is off.","fx:max":"Widens this card to three cards so its graph is easy to see; the dials sit under it. Click again, or press Escape, to put it back.","eq:graph":"The EQ's curve over the sound coming out right now: boosts rise above the middle line, cuts fall below it. Click it to open it wide, then drag a dot to shape it.","eq:low":"The lows, below 150 Hz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","eq:mid":"The middle band: drag up or down to boost or cut, sideways to move it, and scroll over it for narrower or wider. Double-click resets it.","eq:high":"The highs, above 6 kHz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","strip:fold":"Minimizes this channel sideways to a narrow column so more fit. It keeps playing at the same level; M and S still work, and ▶ expands it again.","strip:folded":"A minimized channel: its name, mute, solo and level meter. Click the name or ▶ to expand it. Drag the name to move it.","strip:pan":"Balance: moves this channel left or right in the stereo mix by turning the other side down (its sends follow). Drag or use the arrow keys; double-click to centre it.","strip:name":"This channel's instrument. Click to show it below, drag to move the channel, double-click to rename it.","strip:rename":"Type a new name (up to 20 characters) and press Enter; Escape cancels. Leave it empty to go back to the default name.","sends:toggle":"Hides or shows the send effects: the A · Reverb and B · Delay cards and every channel's A and B knobs. Only the view changes: the sends keep sounding as set. Inserts still opens a stack.","vu:add":"Adds analog VU meters for the finished mix beside the master: left on top, right below. 0 VU is −18 dBFS RMS.","vu:module":"The master's left (top) and right (bottom) as classic VU meters, which show average loudness. 0 VU is −18 dBFS RMS; the red is louder than that.","vu:remove":"Hides the VU meters. + Meters in the Mix header brings them back.","vu:fold":"Folds the meters to a narrow column with two thin level bars, L and R. The triangle opens them again."},Xl={threshold:-3,knee:0,ratio:20,attack:.001,release:.1};function cm(e){return Math.floor(.006*e)}const $i=1024,Lo=$i+8192,dm=.25;function um(e,t){let n=0;for(let a=t;a<e.length;a++)n=Math.max(n,Math.abs(e[a]??0));if(!(n>1e-6))return null;for(let a=t;a<e.length;a++)if(Math.abs(e[a]??0)>=n/2)return a-t;return null}async function pm(e,t,n=OfflineAudioContext){const a=new n(1,Lo,e),i=a.createBuffer(1,Lo,e);i.getChannelData(0)[$i]=dm;const o=new AudioBufferSourceNode(a,{buffer:i}),s=t(a);o.connect(s.input),s.output.connect(a.destination),o.start(0);const l=await a.startRendering();return um(l.getChannelData(0),$i)}function hm(e,t=()=>pm(e,n=>{const a=new DynamicsCompressorNode(n,Xl);return{input:a,output:a}})){let n=cm(e);const a=(async()=>{try{const i=await t();i!==null&&i>=0&&i<e/10&&(n=i)}catch{}})();return{get:()=>n,ready:a}}const Kt={noManifest:"No plugin.json there. Pick the plugin's folder, or plugin.json and its DSP file.",noDsp:e=>`plugin.json names its DSP file ${e}. Pick that file too.`,badJson:"plugin.json is not JSON.",bad:e=>`plugin.json has a problem: ${e}`,tooBig:e=>`${e} is over 256 KB.`},fm=256*1024,mm=e=>e.includes("/")?e.slice(0,e.lastIndexOf("/")+1):"",Pn=e=>e.webkitRelativePath||e.name;async function gm(e){const t=[...e],a=t.filter(h=>h.name==="plugin.json").sort((h,m)=>Pn(h).split("/").length-Pn(m).split("/").length)[0];if(!a)throw new Error(Kt.noManifest);const i=await a.text();let o;try{o=JSON.parse(i)}catch{throw new Error(Kt.badJson)}const s=ha(o);if(!s.ok||!s.manifest)throw new Error(Kt.bad(s.errors.join("; ")));const l=s.manifest,u=mm(Pn(a))+l.dsp,c=l.dsp.split("/").pop()??l.dsp,d=t.find(h=>Pn(h)===u)??t.find(h=>h!==a&&h.name===c&&!h.webkitRelativePath);if(!d)throw new Error(Kt.noDsp(l.dsp));const p=await d.text();if(new TextEncoder().encode(p).length>fm)throw new Error(Kt.tooBig(l.dsp));return{manifest:l,manifestText:i,dspName:l.dsp,dsp:p}}async function bm(e,t=Date.now()){return{id:e.manifest.id,version:e.manifest.version,name:e.manifest.name,author:e.manifest.author,licence:e.manifest.licence,manifest:e.manifestText,dspName:e.dspName,dsp:e.dsp,sha256:await ms(new TextEncoder().encode(e.dsp)),added:t}}const Co=e=>`local:${e}`,na=e=>e.startsWith("local:"),Ql=e=>({id:e.id,version:e.version,name:e.name,author:e.author,added:e.added});function Jl(){const e=new Map;return{list:async()=>[...e.values()].sort((t,n)=>t.added-n.added).map(Ql),get:async t=>e.get(t)??null,put:async t=>{e.set(t.id,t)},remove:async t=>{e.delete(t)}}}const ym="netcomposer-studio-plugins",Dn="plugins";function wm(e=globalThis.indexedDB){const t=Jl(),n=new Promise(o=>{if(!e)return o(null);try{const s=e.open(ym,1);s.onupgradeneeded=()=>{s.result.objectStoreNames.contains(Dn)||s.result.createObjectStore(Dn,{keyPath:"id"})},s.onsuccess=()=>o(s.result),s.onerror=()=>o(null),s.onblocked=()=>o(null)}catch{o(null)}}),a=async(o,s,l)=>{const u=await n;return u?new Promise((c,d)=>{const p=u.transaction(Dn,o),h=s(p.objectStore(Dn));p.oncomplete=()=>c(h.result),p.onerror=()=>d(p.error??h.error),p.onabort=()=>d(p.error??h.error)}):l()},i=o=>{const s=o;return!!s&&typeof s.id=="string"&&typeof s.version=="string"&&typeof s.manifest=="string"&&typeof s.dsp=="string"};return{async list(){return(await a("readonly",s=>s.getAll(),async()=>{const s=await t.list();return Promise.all(s.map(l=>t.get(l.id)))})).filter(i).sort((s,l)=>s.added-l.added).map(Ql)},async get(o){const s=await a("readonly",l=>l.get(o),()=>t.get(o));return i(s)?s:null},put:o=>a("readwrite",s=>s.put(o),()=>t.put(o)).then(()=>{}),remove:o=>a("readwrite",s=>s.delete(o),()=>t.remove(o)).then(()=>{})}}const Ie=-54,xn=6,Te=-Ie/(xn-Ie),vm=-9,ki=(vm-Ie)/(xn-Ie);function Zl(e){const t=Math.min(1,Math.max(0,e));return t===0?Number.NEGATIVE_INFINITY:Ie+t*(xn-Ie)}function xm(e){return e===Number.NEGATIVE_INFINITY?0:10**(e/20)}function $m(e){return e<=0?Number.NEGATIVE_INFINITY:20*Math.log10(e)}function it(e){return xm(Zl(e))}function km(e){if(e===Number.NEGATIVE_INFINITY||e<-99)return"−∞";const t=e.toFixed(1);return t.startsWith("-")?`−${t.slice(1)}`:e>.05?`+${t}`:t}function Em(e){const t=e.some(n=>n.solo);return e.map(n=>n.mute||t&&!n.solo?0:it(n.position))}function Ji(e){return e===Number.NEGATIVE_INFINITY||Number.isNaN(e)?0:Math.min(1,Math.max(0,(e-Ie)/(xn-Ie)))}function Fo(e){return Ji($m(e))}const No=[0,-6,-12,-24,-48].map(e=>({value:Ji(e),label:e===0?"0":`−${-e}`})),Am=1;function Sm(e){let t=0,n=0;for(const a of e){const i=Math.abs(a);i>t&&(t=i),n+=a*a}return{peak:t,rms:e.length>0?Math.sqrt(n/e.length):0}}function zo(e){const t=e.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(t==="")return null;if(t==="off"||t==="-inf"||t==="-∞"||t==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(t))return null;const n=Number(t.replace(",","."));return Number.isFinite(n)?n<Ie?0:Ji(Math.min(xn,n)):null}function Mm(e){const t=Math.min(1,Math.max(-1,Number.isFinite(e)?e:0)),n=Math.cos(Math.abs(t)*Math.PI/2);return t>0?[n,1]:t<0?[1,n]:[1,1]}const ec="netcomposer.studio.mix.v1",tc={position:ki,mute:!1,solo:!1,sendA:0,sendB:0,pan:0};function gn(){return{v:1,channels:{},master:Te,returns:{a:{on:!0,level:Te},b:{on:!0,level:Te}},insert:{on:!1},fx:{},channelFx:{},masterFx:null}}const cn=(e,t)=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t,Tm=e=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(-1,e)):0,aa=(e,t)=>typeof e=="boolean"?e:t,Ye=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{};function Lm(e){const t=Ye(e);return{position:cn(t.position,tc.position),mute:aa(t.mute,!1),solo:aa(t.solo,!1),sendA:Math.min(Te,cn(t.sendA,0)),sendB:Math.min(Te,cn(t.sendB,0)),pan:Tm(t.pan)}}function nc(e){const t=gn(),n=Ye(e);if(n.v!==1)return t;const a={};for(const[c,d]of Object.entries(Ye(n.channels)))c.length>0&&c.length<=64&&(a[c]=Lm(d));const i=Ye(n.returns),o=(c,d)=>{const p=Ye(c);return{on:aa(p.on,d.on),level:cn(p.level,d.level)}},s={},l=Ye(n.fx);for(const c of["a","b","insert"])l[c]!==void 0&&(s[c]=l[c]);const u={};for(const[c,d]of Object.entries(Ye(n.channelFx)))c.length>0&&c.length<=64&&d&&typeof d=="object"&&(u[c]=d);return{v:1,channels:a,master:cn(n.master,t.master),returns:{a:o(i.a,t.returns.a),b:o(i.b,t.returns.b)},insert:{on:aa(Ye(n.insert).on,t.insert.on)},fx:s,channelFx:u,masterFx:n.masterFx&&typeof n.masterFx=="object"?n.masterFx:null}}function ac(){try{return globalThis.localStorage??null}catch{return null}}function Cm(e=ac()){try{const t=e?.getItem(ec);return t?nc(JSON.parse(t)):gn()}catch{return gn()}}function ic(e,t=ac()){try{return t?.setItem(ec,JSON.stringify(e)),t!==null}catch{return!1}}const wa=3;function Fm(e,t=wa){return Math.max(1,Math.ceil(e/t))}function Po(e,t=wa){return Math.max(0,Math.floor(e/t))}function Nm(e,t,n,a=null,i=wa){const o=Fm(n.length,i)-1;if(!e||e.key!==t)return 0;const s=a===null?-1:n.indexOf(a);if(s>=0)return Po(s,i);const l=new Set(e.ids);let u=-1;return n.forEach((c,d)=>{l.has(c)||(u=d)}),u>=0?Po(u,i):Math.min(o,Math.max(0,e.page))}const rc=e=>!!e&&typeof e=="object"&&Array.isArray(e.chain);function zm(e,t){if(!rc(e))return null;const n=e.chain.findIndex(a=>a?.id===t);return n<0?null:{slot:JSON.parse(JSON.stringify(e.chain[n])),index:n}}function Pm(e,t,n){if(!rc(e)||e.chain.length>=n||e.chain.some(i=>i?.id===t.slot.id))return null;const a=e.chain.slice();return a.splice(Math.max(0,Math.min(a.length,t.index)),0,t.slot),{...e,v:2,chain:a}}const Do="plugin-url",ja="plugin-folder",Ro="plugin-files",Ha="kept:",Ua="forget:",Va="listed:",Dm="../plugins/registry.json",P={urlTitle:"Load a plugin from a URL",urlBody:"Paste the address of the plugin's plugin.json.",urlField:"Address",urlPlaceholder:"https://…/plugin.json",urlNext:"Next",warnTitle:"Run this plugin?",warnBody:e=>`This runs code from ${e} in your browser. Only load plugins from people you trust. Listed plugins are checked; this one is not.`,warnLoad:"Load and run",badUrl:"That isn't a plugin address. Use https://, or http://localhost while you build one.",badUrlLocal:"Plugins load from this computer for now: pick its files, or use http://localhost while you build one.",urlPlaceholderLocal:"http://localhost:…/plugin.json",folder:"Load plugin folder…",files:"Load plugin from files…",url:"Load plugin from URL…",thisComputer:"this computer",kept:e=>`${e} (this computer)`,fileWarnBody:(e,t)=>`This runs ${e} by ${t}, from files on this computer, in your browser. Only run code you made or trust. It is kept in this browser until you remove it.`,forget:e=>`Remove ${e} from this computer…`,forgetTitle:e=>`Remove ${e}?`,forgetBody:"This browser forgets its copy. Slots that use it keep their dials and play as a wire after a reload.",forgetConfirm:"Remove",forgotten:e=>`${e} is removed from this computer.`,reloadToUse:(e,t)=>`Kept ${e} ${t}. Reload the page to hear the new code.`,reloadToHear:e=>`${e} has new code. Reload the page to hear it; until then the old code plays.`,reloadAction:"Reload",newCode:"Reload page: new code.",stuck:(e,t)=>`${e} on ${t} got stuck in a loop and was stopped. The rest of the mix plays on.`,frozenTitle:"The sound stopped",frozenBody:e=>`${e} froze the audio on this page, and it can't be restarted here. In a new tab your mix comes back with ${e} off (add it again to retry). This page stops saving.`,frozenOpen:"Open new tab",frozenStay:"Stay here",frozenShort:"Stopped: froze audio.",notKept:"Not on this computer.",pickAgain:"Pick files…",badUrlShort:"Not a plugin address.",failedShort:"Couldn't load it.",missing:"Missing: not loaded.",missingNoUrl:"Missing: no address saved.",through:"Sound passes through.",dialsKept:"Its dials are kept.",from:e=>`From ${e}`,load:"Load",loadAsk:"Load…",loading:"Loading…",retry:"Remove, add to retry."};function Rm(e){const t={1:"Stopped: failed to start.",2:"Stopped: it crashed.",3:"Stopped: bad numbers.",4:"Stopped: a dial crashed it.",5:"Stopped: code not loaded.",6:"Stopped: stuck in a loop."};for(const[n,a]of Object.entries(Gn))if(a===e)return t[Number(n)];return"Stopped."}function Xt(e){if(na(e))return P.thisComputer;try{return new URL(e).host||e}catch{return e}}function Om(e,t,n=!0){let a;try{a=new URL(e.trim(),t)}catch{return null}const i=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(a.hostname);return a.protocol==="https:"&&(n||i)||a.protocol==="http:"&&i?a.href:null}function qm(e){const t=new URL(Dm,e.base).href;let n=[];const a=new Set,i=new Map,o=[],s=new Set,l=()=>{for(const A of s)A()},u=A=>String(A?.message??A).replace(/^nc-fx plugins?: /,""),c=e.remote!==!1,d=e.store??Jl();let p=[];const h=new Map,m=new Set,b=A=>{m.has(A)||(m.add(A),l())},y=e.frozen,f=async()=>{try{p=await d.list()}catch(A){console.warn(`Studio plugins: can't read this computer's plugins (${u(A)})`)}l()},g=f(),w=c?tu(t,{fetch:e.fetch}).then(A=>{n=A.registry.plugins;for(const x of A.errors)console.warn(`Studio plugins: registry ${x}`);l();const v=o.splice(0);v.length&&L.restore(v)}).catch(A=>{console.info(`Studio plugins: no listed plugins (${u(A)})`)}):Promise.resolve(),k=async(A,v)=>{a.add(A),i.delete(A),l();try{const{entry:x,stale:E}=await v();return x.plugin&&(E&&b(x.plugin.id),y?.clear(x.plugin.id)),x.type}catch(x){throw i.set(A,u(x)),x}finally{a.delete(A),l()}},L={listed:()=>n,loaded:()=>Md().filter(A=>!A.plugin.listed&&!na(A.plugin.url)),remote:c,local:()=>p,stale:A=>m.has(A),frozen:A=>!!y?.has(A),async addPicked(A){const v=await bm(A);y?.clear(v.id);const x=ne(`plugin:${v.id}`);if(x){const T=x.plugin?.version===v.version&&h.get(v.id)===v.sha256;return await d.put(v),await f(),T||b(v.id),T?{type:x.type}:{reload:!0}}const E=await k(v.id,()=>Pr(e.ctx,{manifest:v.manifest,dsp:v.dsp,dspName:v.dspName},{moduleUrl:e.moduleUrl,url:Co(v.id)}));return h.set(v.id,v.sha256),await d.put(v),await f(),{type:E}},async loadKept(A){y?.clear(A);const v=ne(`plugin:${A}`),x=await d.get(A);if(v){const T=h.get(A);return x&&T&&T!==x.sha256&&b(A),v.type}if(!x)throw new Error(P.notKept);const E=await k(A,()=>Pr(e.ctx,{manifest:x.manifest,dsp:x.dsp,dspName:x.dspName},{moduleUrl:e.moduleUrl,url:Co(A)}));return h.set(A,x.sha256),E},async forget(A){await d.remove(A),await f()},listingFor(A){const v=n.find(E=>E.id===A.id);if(!v)return null;const x=new URL(v.manifest,t).href;return!A.url||A.url===x?v:null},loading:A=>a.has(A),async loadListed(A){y?.clear(A);const v=ne(`plugin:${A}`);if(v)return v.type;await w;const x=n.find(E=>E.id===A);if(!x)throw new Error(`${A} isn't listed`);return k(A,()=>nu(e.ctx,x,t,{moduleUrl:e.moduleUrl,fetch:e.fetch}))},loadUrl(A){return k("url",()=>ys(e.ctx,A,{moduleUrl:e.moduleUrl,fetch:e.fetch,base:e.base}))},restore(A){for(const v of A)if(!(v.status!=="missing"||a.has(v.id)||ne(`plugin:${v.id}`))&&!y?.has(v.id)){if(na(v.url)){g.then(()=>{p.some(x=>x.id===v.id)&&!a.has(v.id)&&!ne(`plugin:${v.id}`)&&L.loadKept(v.id).catch(()=>{})});continue}if(c){if(!n.length){o.some(x=>x.id===v.id)||o.push(v);continue}L.listingFor(v)&&L.loadListed(v.id).catch(()=>{})}}},onChange(A){return s.add(A),()=>s.delete(A)},problem:A=>i.get(A)??null,clearProblem(A){i.delete(A)&&l()}};return L}const oc="netcomposer.studio.sends.v1";function Im(e,t=!1){try{const n=e?.getItem(oc);if(n==="0")return!1;if(n==="1")return!0}catch{}return!t}function _m(e,t){try{return!!(e?.matchMedia(t.portrait).matches||e?.matchMedia(t.landscape).matches)}catch{return!1}}function Bm(e,t){try{e?.setItem(oc,t?"1":"0")}catch{}}function jm(e){return e?{text:"− Sends",aria:"Hide the send effects"}:{text:"+ Sends",aria:"Show the send effects"}}const sc="netcomposer.studio.strip-fold.v1";function lc(e){try{const t=e?.getItem(sc),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function cc(e,t){try{e?.setItem(sc,JSON.stringify([...t].sort()))}catch{}return t}function dc(e,t,n){const a=new Set(lc(e));return n?a.add(t):a.delete(t),cc(e,a)}function Hm(e,t){return dc(e,t,!1)}function Um(e,t){const n=new Set(t),a=lc(e),i=new Set([...a].filter(o=>n.has(o)));return i.size===a.size?a:cc(e,i)}const Vm=-18,Gm=-20,uc=3,Wm=[-20,-10,-7,-5,-3,-2,-1,0,1,2,3],Oo=[-20,-10,-7,-5,-3,0,1,2,3],Ym=.3,Km=6.638/Ym,Xm=48;function Qm(e){return e-Vm}function pc(e){return Number.isFinite(e)?Math.min(1,Math.max(0,10**((e-uc)/20))):e>0?1:0}function Jm(e){return e>0?pc(Qm(20*Math.log10(e))):0}function Zi(e){return(Math.min(1,Math.max(0,e))*2-1)*Xm}const qo={x:0,v:0};function Zm(e,t,n,a=!1){if(a)return{x:t,v:0};if(!(n>0))return e;const i=Km,o=e.x-t,s=e.v+i*o,l=Math.exp(-i*n),u=t+(o+s*n)*l,c=(e.v-i*s*n)*l;return u>=1?{x:1,v:0}:u<=0?{x:0,v:0}:{x:u,v:c}}function eg(e,t){return Math.abs(e.x-t)<1e-4&&Math.abs(e.v)<.001}const hc="netcomposer.studio.vu.v1";function tg(e){try{return e?.getItem(hc)==="1"}catch{return!1}}function ng(e,t){try{e?.setItem(hc,t?"1":"0")}catch{}}const fc="netcomposer.studio.vu-fold.v1";function ag(e){try{return e?.getItem(fc)==="1"}catch{return!1}}function ig(e,t){try{e?.setItem(fc,t?"1":"0")}catch{}}const rg="http://www.w3.org/2000/svg",Ei=200,Ga=112,Et=Ei/2,dn=132,Io=100,og=108,sg=105,lg=116,cg=103,dg=112,Fe=(e,t)=>{const n=document.createElementNS(rg,e);for(const[a,i]of Object.entries(t))n.setAttribute(a,String(i));return n},_o=e=>Math.round(e*100)/100;function un(e,t){const n=Zi(pc(e))*Math.PI/180;return[_o(Et+t*Math.sin(n)),_o(dn-t*Math.cos(n))]}function Bo(e,t,n){const[a,i]=un(e,n),[o,s]=un(t,n);return`M ${a} ${i} A ${n} ${n} 0 0 1 ${o} ${s}`}const ug=e=>e>0?`+${e}`:e<0?`−${-e}`:"0";function jo(e){const t=Fe("svg",{class:"vu-meter",viewBox:`0 0 ${Ei} ${Ga}`,role:"img","aria-label":`${e==="L"?"Left":"Right"} VU meter`,"data-vu-side":e});t.append(Fe("rect",{class:"vu-face",x:.5,y:.5,width:Ei-1,height:Ga-1,rx:4})),t.append(Fe("path",{class:"vu-arc",d:Bo(Gm,0,Io)})),t.append(Fe("path",{class:"vu-zone",d:Bo(0,uc,cg)}));for(const o of Wm){const[s,l]=un(o,Io),[u,c]=un(o,Oo.includes(o)?og:sg);t.append(Fe("line",{class:o>0?"vu-tick vu-red":"vu-tick",x1:s,y1:l,x2:u,y2:c}))}for(const o of Oo){const[s,l]=un(o,lg),u=Fe("text",{class:o>0?"vu-num vu-red":"vu-num",x:s,y:l,"text-anchor":"middle"});u.textContent=Math.abs(o)===20||o===3?ug(o):String(Math.abs(o)),t.append(u)}const n=Fe("text",{class:"vu-legend",x:Et,y:92,"text-anchor":"middle"});n.textContent="VU";const a=Fe("text",{class:"vu-side",x:10,y:Ga-10});a.textContent=e;const i=Fe("line",{class:"vu-needle",x1:Et,y1:dn,x2:Et,y2:dn-dg,transform:`rotate(${Zi(0)} ${Et} ${dn})`});return t.append(n,a,i),{svg:t,needle:i}}function pg(e){const t=document.createElement("div");t.className="vu",t.dataset.vu="",t.setAttribute("role","group"),t.setAttribute("aria-label","VU meters");const n=document.createElement("div");n.className="vu-hd";const a=document.createElement("button");a.type="button",a.className="nc-fold-toggle",a.dataset.vuFold="";const i=document.createElement("span");i.className="nc-fold-tri",i.setAttribute("aria-hidden","true"),a.append(i),a.setAttribute("data-nc-help",Y["vu:fold"]);const o=document.createElement("span");o.className="nc-strip-name vu-name",o.textContent="Meters",o.setAttribute("data-nc-help",Y["vu:module"]);const s=document.createElement("button");s.type="button",s.className="nc-page-action vu-hide",s.dataset.vuRemove="",s.textContent="Hide",s.setAttribute("aria-label","Hide VU meters"),s.setAttribute("data-nc-help",Y["vu:remove"]),s.addEventListener("click",()=>e.onRemove(s)),n.append(a,o,s);const l=document.createElement("div");l.className="vu-mini",l.setAttribute("aria-hidden","true");const u=["L","R"].map(g=>{const w=document.createElement("span");w.className="vu-bar",w.dataset.side=g;const k=document.createElement("span");return k.className="vu-bar-fill",w.append(k),l.append(w),k});let c=e.folded;const d=()=>{t.toggleAttribute("data-folded",c),a.setAttribute("aria-expanded",c?"false":"true"),a.setAttribute("aria-label",c?"Expand VU meters":"Minimize VU meters"),a.title=c?"Expand":"Minimize"};d(),a.addEventListener("click",()=>{c=!c,d(),e.onFold(c)});const p=jo("L"),h=jo("R");t.append(n,p.svg,h.svg,l);const m=matchMedia("(prefers-reduced-motion: reduce)"),b=[qo,qo],y=[Number.NaN,Number.NaN],f=[p.needle,h.needle];return{el:t,frame(g,w){let k=!1;for(const L of[0,1]){const A=g?Jm(g[L]):0;b[L]=Zm(b[L],A,w,m.matches),(!eg(b[L],A)||A>0)&&(k=!0);const v=Math.round(Zi(b[L].x)*10)/10;v!==y[L]&&(y[L]=v,f[L].setAttribute("transform",`rotate(${v} ${Et} ${dn})`),u[L].style.transform=`scaleY(${Math.max(0,Math.min(1,b[L].x)).toFixed(3)})`,t.dataset[L===0?"vuL":"vuR"]=v.toFixed(1))}return k}}}const hg="netcomposer.studio.hidden.v1",Rn=1/120,Ne="master",Ho="Inserts",fg="(max-width: 768px)",mc=8,Bn=e=>km(Zl(e)),Uo=e=>{const t=Bn(e);return t==="−∞"?"off":`${t} dB`};function mg(e,t){return Mt.find(n=>n.type===e)?.dials.find(n=>n.key===t)}function gg(e,t,n){const a=n.bpm,i=$=>{const S=n.order(),M=S.indexOf($);return M<0?S.length:M},o=($,S,M,D)=>{const C=mg(M,D);if(!C||!S)return null;const V=Number(S.getParam(M,D)??C.default),j=`mix-${$}-${D}`;return C.options?{type:"select",id:j,label:C.label,value:String(V),options:C.options.map(F=>({value:String(F.value),label:F.label})),onChange:F=>{S.setParam(M,D,Number(F)),W.render()}}:{type:"slider",id:j,label:C.label,min:C.min,max:C.max,step:C.step??1,taper:Kr(C),value:V,valueText:C.format(V,a()),onChange:F=>{S.setParam(M,D,F),W.render()}}},s=($,S,M,D)=>D.map(C=>o($,S,M,C)).filter(C=>C!==null),l=matchMedia(fg);let u=null;const c=$=>{u=$,W.render()},d=$=>c(u===$?null:$);l.addEventListener("change",()=>W.render());const p=($,S,M,D)=>{$.setParam(S,M,D),W.render()},h=($,S,M,D)=>Cu(S,M,{id:`hack-${$}-${M}-graph`,on:D,set:(C,V)=>p(S,M,C,V),help:{graph:Y["eq:graph"],low:Y["eq:low"],mid:Y["eq:mid"],high:Y["eq:high"]}}),m=($,S,M,D)=>{const C=Number(S.getParam(M,D.key)??D.default),V=`hack-${$}-${M}-${D.key}`,j=F=>p(S,M,D.key,F);return D.options?{type:"select",id:V,label:D.label,value:String(C),options:D.options.map(F=>({value:String(F.value),label:F.label})),onChange:F=>j(Number(F))}:{type:"slider",id:V,label:D.label,min:D.min,max:D.max,step:D.step??.001,taper:Kr(D),value:C,valueText:cs(D,C,a()),onChange:j}},b="",y={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3},drive:{drive_db:6}};let f=tm(ge(),`${Ne}/${Kl}`);const g=$=>({folded:f.has($),onFold:S=>{f=Wl(ge(),$,S),W.render()},foldHelp:Y["fx:fold"]}),w=n.plugins;w?.onChange(()=>W.render());const k=new Map,L=$=>String($?.message??$).replace(/^nc-fx plugins?: /,""),A=($,S,M)=>{k.set($,S),W.render(),Zt({message:M,duration:9e3,anchor:ae.el.querySelector(`[data-nc-id='hack-${$}-add']`)})},v=($,S)=>{const M=Zt({message:S,duration:12e3,actionLabel:P.reloadAction,onAction:()=>location.reload(),anchor:ae.el.querySelector(`[data-nc-id='hack-${$}-add']`)});M.el.dataset.pluginReload=$},x=$=>ne($)?.label??$,E=$=>!!$&&$.startsWith("plugin:")&&!!w?.stale($.slice(7)),T=async($,S,M)=>{if(!w)return null;const D=M??await fp({title:P.urlTitle,body:P.urlBody,field:{label:P.urlField,placeholder:w.remote?P.urlPlaceholder:P.urlPlaceholderLocal,type:"url"},confirmLabel:P.urlNext,returnFocus:S??void 0});if(!D)return null;const C=Om(D,location.href,w.remote);if(!C)return A($,P.badUrlShort,w.remote?P.badUrl:P.badUrlLocal),null;if(!await ct({title:P.warnTitle,body:P.warnBody(Xt(C)),confirmLabel:P.warnLoad,danger:!0,returnFocus:S??void 0}))return null;try{const j=await w.loadUrl(C);return E(j)&&v($,P.reloadToHear(x(j))),j}catch(j){return j?.reload?(k.set($,P.failedShort),W.render(),v($,L(j))):A($,P.failedShort,L(j)),null}},N=$=>{const S=document.createElement("input");return S.type="file",S.hidden=!0,S.dataset.ncId="plugin-files",$?S.webkitdirectory=!0:(S.multiple=!0,S.accept=".json,.js,.mjs,application/json,text/javascript"),document.body.append(S),new Promise(M=>{const D=C=>{S.remove(),M(C)};S.addEventListener("change",()=>D(S.files?.length?[...S.files]:null)),S.addEventListener("cancel",()=>D(null)),S.click()})},z=async($,S,M)=>{if(!w)return null;const D=await N(M);if(!D)return null;let C;try{C=await gm(D)}catch(j){return A($,P.failedShort,L(j)),null}if(!await ct({title:P.warnTitle,body:P.fileWarnBody(C.manifest.name,C.manifest.author),confirmLabel:P.warnLoad,danger:!0,returnFocus:S??void 0}))return null;try{const j=await w.addPicked(C);return"reload"in j?(v($,P.reloadToUse(C.manifest.name,C.manifest.version)),null):j.type}catch(j){return A($,P.failedShort,L(j)),null}},U=async($,S,M)=>{if(!w)return;const D=w.local().find(V=>V.id===S)?.name??S;await ct({title:P.forgetTitle(D),body:P.forgetBody,confirmLabel:P.forgetConfirm,danger:!0,returnFocus:M??void 0})&&(await w.forget(S),Zt({message:P.forgotten(D),duration:5e3,anchor:ae.el.querySelector(`[data-nc-id='hack-${$}-add']`)}))},K=async($,S,M,D)=>{k.delete($);let C=M;if(M===ja||M===Ro)C=await z($,D,M===ja);else if(M.startsWith(Ua))await U($,M.slice(Ua.length),D),C=null;else if(M.startsWith(Ha)&&w){W.render();try{C=await w.loadKept(M.slice(Ha.length)),E(C)&&v($,P.reloadToHear(x(C)))}catch(V){A($,P.failedShort,L(V)),C=null}}else if(M===Do)C=await T($,D);else if(M.startsWith(Va)&&w){W.render();try{C=await w.loadListed(M.slice(Va.length))}catch(V){A($,P.failedShort,L(V)),C=null}}C&&S.addEffect(C,{dials:y[C]}),W.render()},X=()=>w?[...w.listed().map($=>({value:`${Va}${$.id}`,label:$.name,group:"Plugins"})),...w.local().map($=>({value:`${Ha}${$.id}`,label:P.kept($.name),group:"Plugins"})),...w.loaded().map($=>({value:$.type,label:`${$.label} (${Xt($.plugin.url)})`,group:"Plugins"})),{value:ja,label:P.folder,group:"Plugins"},{value:Ro,label:P.files,group:"Plugins"},{value:Do,label:P.url,group:"Plugins"},...w.local().map($=>({value:`${Ua}${$.id}`,label:P.forget($.name),group:"Plugins"}))]:[];let fe=null,me=null,be=null;const re=$=>t.masterFx===$||t.list().some(S=>S.fx===$),B=$=>requestAnimationFrame(()=>ae.el.querySelector($)?.focus()),Ee=($,S,M,D,C,V,j)=>{const F=zm(M.getState(),D);if(!F||!M.removeEffect(D))return;const oe=!!j&&j===document.activeElement;if(be?.close(),W.render(),oe){const tt=M.getChain()[F.index];B(tt?`[data-nc-id='hack-${$}-${tt.id}'] [data-nc-fx-remove]`:`#hack-${$}-add-type`)}const I=Zt({message:`${C} removed from ${S}.`,actionLabel:"Undo",anchor:ae.el.querySelector("[data-nc-area='fx']"),onAction:()=>_($,M,F,V),onClose:()=>{be===I&&(be=null)}});I.el.dataset.insertUndo=$,be=I},_=($,S,M,D)=>{if(!re(S))return;const C=Pm(S.getState(),M,D);let V=M.slot.id;if(C)S.setState(C);else{const{type:j,dials:F,bypass:oe}=M.slot;V=S.addEffect(j,{index:M.index,dials:F,bypass:oe})}V&&(u=$,me=`hack-${$}-${V}`,W.render(),B(`[data-nc-id='hack-${$}-${V}'] [data-nc-fx-remove]`))},ce=($,S,M,D)=>{const C=M.getChain(),V=C.map((F,oe)=>{const I=ne(F.type),tt=I?.dials??[],wr=ie=>Ee($,S,M,F.id,F.name,D,ie),vr=ie=>{M.moveEffect(F.id,ie),me=`hack-${$}-${F.id}`,W.render()},Vt=[];oe>0&&Vt.push({type:"button",id:`hack-${$}-${F.id}-left`,label:"Move left",on:!1,onPress:()=>vr(oe-1)}),oe<C.length-1&&Vt.push({type:"button",id:`hack-${$}-${F.id}-right`,label:"Move right",on:!1,onPress:()=>vr(oe+1)}),Vt.push({type:"button",id:`hack-${$}-${F.id}-remove`,label:"Remove",ariaLabel:`Remove ${F.name} from ${S}`,on:!1,onPress:()=>wr(document.getElementById(`hack-${$}-${F.id}-remove`))});const xr={onRemove:ie=>wr(ie),removeLabel:`Remove ${F.name}`},Z=F.plugin,we=(ie,nt,mt=!1)=>({type:"note",id:`hack-${$}-${F.id}-${ie}`,...mt?{tone:"danger"}:{},text:nt});if(Z&&Z.status==="missing"){const ie=w?.listingFor(Z)??null,nt=na(Z.url),mt=nt&&!!w?.local().some(En=>En.id===Z.id),$r=w?.loading(Z.id)??!1,kr=$r?[we("missing",P.loading)]:[we("missing",w?.frozen(Z.id)?P.frozenShort:nt&&!mt?P.notKept:Z.url?P.missing:P.missingNoUrl,!0),we("through",P.through),we("kept",P.dialsKept),...Z.url?[we("from",P.from(Xt(Z.url)))]:[]];return w&&Z.url&&!$r&&kr.push({type:"button",id:`hack-${$}-${F.id}-load`,label:ie||mt?P.load:nt?P.pickAgain:P.loadAsk,ariaLabel:ie||mt?`Load ${Z.name}`:nt?`Pick ${Z.name}'s folder (asks first)`:`Load ${Z.name} from ${Xt(Z.url)} (asks first)`,on:!1,onPress:()=>{const En=document.getElementById(`hack-${$}-${F.id}-load`);ie?w.loadListed(Z.id).catch(()=>W.render()):mt?w.loadKept(Z.id).catch(()=>W.render()):nt?z($,En,!0).then(()=>W.render()):T($,En,Z.url)}}),{type:"fx",id:`hack-${$}-${F.id}`,title:`${oe+1} · ${F.name}`,...g(`${$}/${F.id}`),depth:oe%4+1,controls:kr,more:Vt,...xr}}const ft=I&&"plugin"in I?I.plugin:void 0,Xc=ft?[we("by",`By ${ft.author}`),we("version",`${ft.licence} · ${ft.version}`),we("source",ft.listed?"Listed":P.from(Xt(ft.url)))]:[],Qc=Z?.status==="failed"?[we("failed",Rm(Z.error),!0),we("through",P.through),we("retry",P.retry)]:Z&&w?.stale(Z.id)?[we("newcode",P.newCode)]:[];return{type:"fx",id:`hack-${$}-${F.id}`,title:`${oe+1} · ${F.name}`,...g(`${$}/${F.id}`),depth:oe%4+1,on:!F.bypass,meter:Fa(M,F.id)??void 0,meterHelp:Y["fx:meter"],onToggle:ie=>{M.setParam(F.id,"bypass",!ie),W.render()},controls:[...Qc,...F.type==="eq"?[h($,M,F.id,!F.bypass)]:[],...tt.filter(ie=>!ie.more).map(ie=>m($,M,F.id,ie))],maxHelp:Y["fx:max"],...xr,more:[...tt.filter(ie=>ie.more).map(ie=>m($,M,F.id,ie)),...Xc,...Vt]}}),j=C.length>=D;return V.push({type:"fx",id:`hack-${$}-add`,title:`${S} · Inserts`,...g(`${$}/add`),depth:C.length%4+1,controls:[{type:"note",id:`hack-${$}-note`,...k.get($)?{tone:"danger"}:{},text:k.get($)??(w?.loading("url")||w?.listed().some(F=>w.loading(F.id))||w?.local().some(F=>w.loading(F.id))?P.loading:j?`${C.length} of ${D}: the stack is full.`:C.length===0?"No effects yet.":`${C.length} of ${D}, first to last.`)},...j?[]:[{type:"select",id:`hack-${$}-add-type`,label:"Add",value:b,options:[{value:b,label:"Effect…"},...Ed.map(F=>({value:F,label:ne(F)?.label??F})),...X()],onChange:F=>{if(F===b)return;const oe=document.getElementById(`hack-${$}-add-type`);oe instanceof HTMLSelectElement&&(oe.value=b),K($,M,F,oe)}}]]}),V},ue=$=>{const S=t.returns[$];return{type:"slider",id:`mix-${$}-return`,label:"Return",min:0,max:1,step:Rn,value:S.level,valueText:Uo(S.level),onChange:M=>t.setReturn($,{level:M})}};let le=Im(ge(),_m(globalThis.window,{portrait:Cl,landscape:Ps})),Le=Um(ge(),n.order());const Yc=()=>[...t.list()].sort(($,S)=>i($.id)-i(S.id)).map($=>({type:"strip",id:`strip-${$.id}`,label:$.name,value:$.strip.position,valueText:Bn($.strip.position),step:Rn,defaultValue:ki,resetText:`${Bn(ki)} dB`,ticks:[...No],mute:$.strip.mute,solo:$.strip.solo,silent:$.silent,sendsHidden:!le,onChange:S=>t.set($.id,{position:S}),onTypeIn:S=>{const M=zo(S);M!==null&&t.set($.id,{position:M})},onRemove:S=>n.onRemove($.id,S),folded:Le.has($.id),onFold:S=>{Le=dc(ge(),$.id,S),W.render()},foldHelp:Y["strip:fold"],foldedHelp:Y["strip:folded"],...$.fx?{hacks:u===$.id,hacksLabel:Ho,hacksEmpty:$.fx.getChain().length===0,onHacks:()=>d($.id)}:{},pan:{id:`pan-${$.id}`,value:$.strip.pan,ariaLabel:`${$.name} pan`,help:Y["strip:pan"],onChange:S=>t.set($.id,{pan:Math.abs(S)<.005?0:S})},onMute:()=>t.set($.id,{mute:!$.strip.mute}),onSolo:()=>t.set($.id,{solo:!$.strip.solo}),sends:["A","B"].map(S=>{const M=S==="A"?"sendA":"sendB",D=$.strip[M];return{id:`send-${S.toLowerCase()}-${$.id}`,label:S,ariaLabel:`${$.name} send ${S}`,min:0,max:Te,step:Rn*2,value:D,valueText:Uo(D),defaultValue:0,onChange:C=>t.set($.id,{[M]:C})}})})),Kc=()=>({type:"strip",id:`strip-${Ne}`,label:"Master",master:!0,sendsHidden:!le,...t.masterFx?{hacks:u===Ne,hacksLabel:Ho,hacksEmpty:t.masterFx.getChain().length===0,onHacks:()=>d(Ne)}:{},channels:2,value:t.masterPositionValue,valueText:Bn(t.masterPositionValue),step:Rn,defaultValue:Te,resetText:"0.0 dB",ticks:[...No],onChange:$=>t.setMaster($),onTypeIn:$=>{const S=zo($);S!==null&&t.setMaster(S)}});let ur=Hl(ge());const pr=$=>({folded:ur[$],foldSlim:!0,onFold:S=>{ur=Ul(ge(),$,S),W.render()},foldHelp:Y["fx:fold"]});let Ht=tg(ge()),ht=null,Ut=!0;const hr=$=>{Ht=$,Ut=!0,ng(ge(),$),W.render()},fr=()=>{const $=t.returns.a,S=t.returns.b,M=u===Ne&&t.masterFx?{id:Ne,name:"Master",fx:t.masterFx}:(()=>{const I=t.list().find(tt=>tt.id===u);return I?.fx?{id:I.id,name:I.name,fx:I.fx}:null})();M||(u=null);const D=t.masterFx?.getChain()??[],C=[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:$.on,onToggle:I=>t.setReturn("a",{on:I}),meter:Fa($.fx)??void 0,meterHelp:Y["fx:meter-return"],...pr("a"),controls:[ue("a"),...s("a",$.fx,"plate",["decay","size"])],more:s("a",$.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:S.on,onToggle:I=>t.setReturn("b",{on:I}),meter:Fa(S.fx)??void 0,meterHelp:Y["fx:meter-return"],...pr("b"),controls:[ue("b"),...s("b",S.fx,"delay",["delay_beats","feedback"])],more:s("b",S.fx,"delay",["tone","low_cut"])}],V=M?[...M.id===Ne&&l.matches&&le?C:[],...ce(M.id,M.name,M.fx,M.id===Ne?xi:mc)]:le?C:[],j=M?.id??"sends",F=V.map(I=>I.id),oe=Nm(fe,j,F,me);return fe={key:j,ids:F,page:oe},me=null,{id:"mix",title:"Mix",summary:`${t.list().map(I=>I.name).join(", ")||"No instruments"} · A Reverb · B Delay · Master ${D.filter(I=>!I.bypass).map(I=>I.name).join(", ")||"no inserts on"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[...Yc(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(I=>({value:I.id,label:I.available===!1?`${I.name} (soon)`:I.name,disabled:I.available===!1})),onAdd:I=>n.onAdd(I)}]},{id:"fx",area:"fx",label:M?`${M.name} inserts`:"Send effects",pageSize:wa,page:oe,onPage:I=>{fe&&(fe={...fe,page:I})},controls:V},...Ht?[{id:"meters",area:"meters",label:"VU meters",controls:[]}]:[],{id:"master",area:"master",label:"Master",controls:[Kc()]}]}},ae=Mf(fr(),hg),mr=()=>ae.el.toggleAttribute("data-hacks-folded",u===null&&l.matches);mr();const xe=document.createElement("button");xe.type="button",xe.className="nc-page-action vu-add",xe.dataset.vuAdd="",xe.textContent="+ Meters",xe.setAttribute("aria-label","Add VU meters"),xe.setAttribute("data-nc-help",Y["vu:add"]),xe.addEventListener("click",()=>{hr(!0),ht?.el.querySelector("[data-vu-remove]")?.focus()}),ae.el.querySelector(".nc-module-end")?.prepend(xe);const Ce=document.createElement("button");Ce.type="button",Ce.className="nc-page-action sends-toggle",Ce.dataset.sendsToggle="",Ce.setAttribute("data-nc-help",Y["sends:toggle"]),Ce.addEventListener("click",()=>{le=!le,Bm(ge(),le),W.render()}),xe.after(Ce);const gr=()=>{const{text:$,aria:S}=jm(le);Ce.textContent!==$&&(Ce.textContent=$),Ce.setAttribute("aria-label",S),ae.el.toggleAttribute("data-sends-hidden",!le)};gr();const br=()=>{xe.hidden=Ht;const $=ae.el.querySelector('[data-nc-section="meters"]');!Ht||!$||(ht??=pg({onRemove:()=>{hr(!1),xe.focus()},folded:ag(ge()),onFold:S=>{Ut=!0,ig(ge(),S)}}),ht.el.parentElement!==$&&$.append(ht.el))};br(),yg(ae.el,n),bg(ae.el,t,n),Wo(ae.el),Go(ae.el),Tf(e,[ae],"adjacent");const yr=$=>({peak:Fo($.peak),rms:Fo($.rms),over:$.peak>=Am}),W={module:ae,get hacksShown(){return u},showHacks:c,render(){ae.update(fr()),mr(),br(),gr(),Wo(ae.el),Go(ae.el)},frame($){if(ae.el.dataset.ncOpen!=="true")return;for(const M of t.list())yo(ae.el,`strip-${M.id}`)?.update([yr(M.levels())],$);const S=t.masterLevels();if(yo(ae.el,`strip-${Ne}`)?.update(S.map(yr),$),ht&&Ht){const M=t.ctx.state==="running";M&&(Ut=!0),Ut&&(Ut=ht.frame(M?[S[0].rms,S[1].rms]:null,$))}}};return W}const Wa="application/x-nc-strip",Ot=".nc-strip:not([data-nc-master])",Vo=`${Ot}, .nc-strip-add`,jn=e=>e?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null;function Go(e){for(const t of e.querySelectorAll(".nc-strip [data-nc-hacks]"))t.setAttribute("data-nc-help",t.closest("[data-nc-master]")?Y["inserts:master"]:Y["inserts:channel"]);for(const t of e.querySelectorAll(':is([data-nc-id="mix-a"], [data-nc-id="mix-b"]) .nc-ui-fx-hd .nc-ui-fx-name'))t.setAttribute("data-nc-help",Y["mix:sends"])}function Wo(e){for(const t of e.querySelectorAll(`${Ot} .nc-strip-hd > .nc-strip-name`))t.setAttribute("data-nc-help",Y["strip:name"]);for(const t of e.querySelectorAll(`${Ot} :is(.nc-strip-hd, .nc-strip-fold)`))!(t instanceof HTMLElement)||t.draggable||t.hasAttribute("data-renaming")||(t.draggable=!0,t.title="Drag to move this channel")}function bg(e,t,n){e.addEventListener("dblclick",a=>{const i=a.target instanceof Element?a.target.closest(".nc-strip-hd > .nc-strip-name"):null,o=i?.closest(Ot),s=jn(o??null),l=i?.parentElement;if(!s||!l||!n.onRename||l.hasAttribute("data-renaming"))return;const u=t.list().find(h=>h.id===s)?.name??i.textContent??"",c=document.createElement("input");c.type="text",c.className="nc-strip-name-input",c.value=u,c.maxLength=ql,c.spellcheck=!1,c.autocomplete="off",c.setAttribute("aria-label",`Rename ${u}`),c.setAttribute("data-nc-help",Y["strip:rename"]),l.setAttribute("data-renaming",""),l.draggable=!1,l.insertBefore(c,i),c.focus(),c.select();let d=!1;const p=h=>{if(d)return;d=!0;const m=c.value;c.remove(),l.removeAttribute("data-renaming"),l.draggable=!0,h&&m!==u&&n.onRename?.(s,m)};c.addEventListener("keydown",h=>{h.key==="Enter"?(h.preventDefault(),p(!0)):h.key==="Escape"&&(h.preventDefault(),p(!1))}),c.addEventListener("blur",()=>p(!0)),c.addEventListener("click",h=>h.stopPropagation()),c.addEventListener("dragstart",h=>h.preventDefault())})}function yg(e,t){const n=()=>{for(const i of e.querySelectorAll("[data-drop]"))i.removeAttribute("data-drop");for(const i of e.querySelectorAll("[data-dragging]"))i.removeAttribute("data-dragging")},a=(i,o)=>{const s=i.getBoundingClientRect();return o<s.left+s.width/2?"before":"after"};e.addEventListener("dragstart",i=>{const s=(i.target instanceof Element?i.target.closest(".nc-strip-hd, .nc-strip-fold"):null)?.closest(Ot),l=jn(s??null);!l||!i.dataTransfer||!(s instanceof HTMLElement)||(i.dataTransfer.setData(Wa,l),i.dataTransfer.effectAllowed="move",i.dataTransfer.setDragImage(s,s.offsetWidth/2,16),s.setAttribute("data-dragging","true"))}),e.addEventListener("dragover",i=>{if(!i.dataTransfer?.types.includes(Wa))return;const o=i.target instanceof Element?i.target.closest(Vo):null;if(!(o instanceof HTMLElement))return;i.preventDefault(),i.dataTransfer.dropEffect="move";const s=o.matches(".nc-strip-add")?"before":a(o,i.clientX);if(o.getAttribute("data-drop")!==s){for(const l of e.querySelectorAll("[data-drop]"))l.removeAttribute("data-drop");o.setAttribute("data-drop",s)}}),e.addEventListener("drop",i=>{const o=i.dataTransfer?.getData(Wa),s=i.target instanceof Element?i.target.closest(Vo):null;if(!o||!(s instanceof HTMLElement))return n();if(i.preventDefault(),s.matches(".nc-strip-add")){n(),t.onReorder?.(o,null);return}const l=jn(s),u=a(s,i.clientX);if(n(),!l||l===o)return;let c=l;if(u==="after"){const d=[...e.querySelectorAll(Ot)],p=d[d.indexOf(s)+1];if(c=p?jn(p):null,c===o)return}t.onReorder?.(o,c)}),e.addEventListener("dragend",n)}const We=.012,Ya=1024;class wg{ctx;bus;masterFx;master;limiter;masterMeter;masterMeters;insertMeters;returns;masterPosition=Te;channels=[];listeners=new Set;scratch=new Float32Array(Ya);restore;channelFx;constructor(t,n={}){this.ctx=t,this.restore=n.restore,this.channelFx=n.channelFx;const a=()=>new AnalyserNode(t,{fftSize:Ya});this.bus=new GainNode(t,{gain:1}),this.master=new GainNode(t,{gain:it(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(t,Xl),this.masterMeter=a(),this.masterMeters=[a(),a()],this.insertMeters={pre:a(),post:a()},this.masterFx=n.masterFx?.()??null,this.bus.connect(this.insertMeters.pre),this.masterFx?(this.bus.connect(this.masterFx.input),this.masterFx.output.connect(this.master),this.masterFx.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(t.destination);const i=new ChannelSplitterNode(t,{numberOfOutputs:2});this.limiter.connect(i),i.connect(this.masterMeters[0],0),i.connect(this.masterMeters[1],1);const o=s=>{const l=new GainNode(t,{gain:1}),u=n.fx?.(s)??null,c=new GainNode(t,{gain:it(Te)}),d=a();return u?(l.connect(u.input),u.output.connect(c)):c.gain.value=0,c.connect(d),c.connect(this.bus),{bus:l,fx:u,gain:c,meter:d,on:u!==null,level:Te}};this.returns={a:o("a"),b:o("b")}}attach(t,n){let a=this.channels.find(i=>i.id===t);if(a)a.input.disconnect(),a.input=new GainNode(this.ctx,{gain:1}),a.input.connect(a.fx?.input??a.fader);else{const i=new GainNode(this.ctx,{gain:1}),o=new GainNode(this.ctx,{gain:0}),s=new AnalyserNode(this.ctx,{fftSize:Ya}),l=new GainNode(this.ctx,{gain:0}),u=new GainNode(this.ctx,{gain:0}),c=this.channelFx?.(t)??null;c?(i.connect(c.input),c.output.connect(o)):i.connect(o);const d=new GainNode(this.ctx,{gain:1,channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),p=new ChannelSplitterNode(this.ctx,{numberOfOutputs:2}),h=new GainNode(this.ctx,{gain:1}),m=new GainNode(this.ctx,{gain:1}),b=new ChannelMergerNode(this.ctx,{numberOfInputs:2});o.connect(s),o.connect(d).connect(p),p.connect(h,0).connect(b,0,0),p.connect(m,1).connect(b,0,1),b.connect(this.bus),b.connect(l).connect(this.returns.a.bus),b.connect(u).connect(this.returns.b.bus),a={id:t,name:n,input:i,fader:o,stereo:d,split:p,balL:h,balR:m,panner:b,meter:s,sendA:l,sendB:u,fx:c,strip:this.restore?.(t)??tc},this.channels.push(a),this.apply()}return this.emit(),a.input}rename(t,n){const a=this.channels.find(i=>i.id===t);!a||a.name===n||(a.name=n,this.emit())}detach(t){const n=this.channels.findIndex(i=>i.id===t);if(n<0)return;const[a]=this.channels.splice(n,1);if(a){for(const i of[a.input,a.fader,a.stereo,a.split,a.balL,a.balR,a.panner,a.meter,a.sendA,a.sendB])i.disconnect();a.fx?.output.disconnect(),a.fx?.dispose(),this.apply(),this.emit()}}tapNode(t){return t==="master"?this.limiter:this.channels.find(n=>n.id===t)?.panner??null}tapLatency(t,n){const a=o=>{const s=o?.latencySamples;return typeof s=="number"&&Number.isFinite(s)&&s>0?Math.round(s):0};if(t==="master")return Math.max(0,Math.round(n))+a(this.masterFx);const i=this.channels.find(o=>o.id===t);return i?a(i.fx):null}set(t,n){const a=this.channels.find(i=>i.id===t);a&&(a.strip={...a.strip,...n},this.apply(),this.emit())}setMaster(t){this.masterPosition=t,this.master.gain.setTargetAtTime(it(t),this.ctx.currentTime,We),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(t,n){const a=this.returns[t],i=this.ctx.currentTime;n.on!==void 0&&(a.on=n.on&&a.fx!==null,a.bus.gain.setTargetAtTime(a.on?1:0,i,We)),n.level!==void 0&&(a.level=n.level,a.fx&&a.gain.gain.setTargetAtTime(it(a.level),i,We)),this.emit()}setTempo(t,n){for(const a of[this.returns.a.fx,this.returns.b.fx,this.masterFx])a?.setTempo(t,n);for(const a of this.channels)a.fx?.setTempo(t,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(t){return this.levelsOf(this.returns[t].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const t=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||t&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}apply(){const t=Em(this.channels.map(a=>a.strip)),n=this.ctx.currentTime;this.channels.forEach((a,i)=>{a.fader.gain.setTargetAtTime(t[i]??0,n,We),a.sendA.gain.setTargetAtTime(it(a.strip.sendA),n,We),a.sendB.gain.setTargetAtTime(it(a.strip.sendB),n,We);const[o,s]=Mm(a.strip.pan);a.balL.gain.setTargetAtTime(o,n,We),a.balR.gain.setTargetAtTime(s,n,We)})}levelsOf(t){return t.getFloatTimeDomainData(this.scratch),Sm(this.scratch)}emit(){for(const t of this.listeners)t()}}const er="studio";function vg(){let e=null;const t=new Set,n=new Set,a=new Set,i=new Map,o=c=>{try{return i.get(c)?.()===!0}catch{return!1}},s=c=>{for(const d of[...c])try{d()}catch{}},l=c=>{if(c!==e){e=c;for(const d of n)d()}},u=(c,d)=>(c.add(d),()=>{c.delete(d)});return{owner:()=>e,claim(c){e===null&&l(c)},claimAll(){l(er),s(t)},clear:()=>l(null),onAll:c=>u(t,c),member(c,d){return i.set(c,d),()=>{i.get(c)===d&&i.delete(c)}},out(c){for(const d of i.keys())if(d!==c&&o(d))return;s(a)},drop:c=>{i.delete(c)},onLastOut:c=>u(a,c),playing:()=>[...i.keys()].filter(o),onChange:c=>u(n,c)}}const Yo="netcomposer.studio.plugins.frozen.v1",xg=2e3;function $g(e,t){const n=[],a=new Set;for(const i of t)i.plugin?.status!=="failed"||i.plugin.error!==Gn[6]||(a.add(i.id),e.has(i.id)||n.push(i));for(const i of[...e])a.has(i)||e.delete(i);for(const i of a)e.add(i);return n}function kg(e){const t=new Map;for(const n of e)for(const a of n)a.plugin?.status==="ready"&&!t.has(a.plugin.id)&&t.set(a.plugin.id,a.plugin.name);return[...t].map(([n,a])=>({id:n,name:a}))}function Eg(e){let t=[];const n=()=>{if(!e)return t;try{const i=JSON.parse(e.getItem(Yo)??"[]");return Array.isArray(i)?i.filter(o=>typeof o=="string"):[]}catch{return[]}},a=i=>{t=i;try{e?.setItem(Yo,JSON.stringify(i))}catch{}};return{has:i=>n().includes(i),list:n,add(i){a([...new Set([...n(),...i])])},clear(i){const o=n();o.includes(i)&&a(o.filter(s=>s!==i))}}}function Ag(e){let t=!1;const n=(e.watch??au)(e.ctx,{stallMs:e.stallMs??xg,onStall:()=>{if(t)return;const a=e.running();a.length&&(t=!0,n.stop(),e.onFrozen(a))}});return{stop:()=>n.stop()}}const Sg="audio/wav";function Mg(e){const t=a=>String(a).padStart(2,"0");return`netcomposer-studio-${`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}-${t(e.getHours())}${t(e.getMinutes())}`}.wav`}function Tg(e,t){const n=Math.min(e.length,t.length),a=new Uint8Array(n*6);let i=0;for(let o=0;o<n;o++)for(const s of[e[o]??0,t[o]??0]){const l=Math.max(-1,Math.min(1,s)),u=Math.round(l<0?l*8388608:l*8388607);a[i++]=u&255,a[i++]=u>>8&255,a[i++]=u>>16&255}return a}function Lg(e,t){const i=e*2*3,o=new ArrayBuffer(44),s=new DataView(o),l=(u,c)=>{for(let d=0;d<4;d++)s.setUint8(u+d,c.charCodeAt(d))};return l(0,"RIFF"),s.setUint32(4,36+i,!0),l(8,"WAVE"),l(12,"fmt "),s.setUint32(16,16,!0),s.setUint16(20,1,!0),s.setUint16(22,2,!0),s.setUint32(24,t,!0),s.setUint32(28,t*2*3,!0),s.setUint16(32,6,!0),s.setUint16(34,24,!0),l(36,"data"),s.setUint32(40,i,!0),new Uint8Array(o)}class Cg{constructor(t,n){this.ctx=t,this.source=n}node=null;id=0;phase="idle";parts=[];frames=0;from=0;why="now";done=null;listeners=new Set;attach(){const t=this.source();if(this.node||!t)return;const n=new AudioWorkletNode(this.ctx,"nc-studio-rec",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n}get supported(){return typeof AudioWorkletNode<"u"}get state(){return this.phase}get started(){return this.phase==="recording"||this.phase==="stopping"?{from:this.from,why:this.why}:null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}arm(t=!1){this.phase==="idle"&&(this.attach(),this.node&&(this.id++,this.parts=[],this.frames=0,this.set("arming"),this.node.port.postMessage({type:"arm",id:this.id,force:t})))}schedule(t){this.phase!=="arming"&&this.phase!=="armed"||this.node?.port.postMessage({type:"at",id:this.id,at:t})}cancel(){this.phase!=="arming"&&this.phase!=="armed"||(this.node?.port.postMessage({type:"cancel",id:this.id}),this.parts=[],this.id++,this.set("idle"))}stop(){return this.phase!=="recording"||!this.node?Promise.resolve(null):(this.set("stopping"),new Promise(t=>{this.done=t,this.node?.port.postMessage({type:"stop",id:this.id})}))}set(t){if(this.phase!==t){this.phase=t;for(const n of this.listeners)n()}}message(t){if(t.id===this.id){if(t.type==="rec")t.phase==="armed"&&this.phase==="arming"?this.set("armed"):t.phase==="recording"&&(this.phase==="arming"||this.phase==="armed")?(this.from=t.from??0,this.why=t.why??"now",this.set("recording")):t.phase==="idle"&&this.phase==="stopping"&&this.finish(null);else if(t.type==="rec-data"){const[n,a]=t.channels??[];if(!n||!a)return;this.parts.push(Tg(n,a)),this.frames+=n.length}else if(t.type==="rec-done"){const n=t.sampleRate??this.ctx.sampleRate,a=new Blob([Lg(this.frames,n),...this.parts],{type:Sg});this.finish({blob:a,name:Mg(new Date),seconds:this.frames/n,from:t.from??this.from,why:this.why})}}}finish(t){this.parts=[],this.frames=0;const n=this.done;this.done=null,this.set("idle"),n?.(t)}}const Fg="NetComposer Studio",qe=[40,240],Ng="nc-sync";function zg(e,t=globalThis.navigator?.locks){const n=`/studio/${e}`;return{channel:`${Ng}${n}`,locks:t?{request:(a,i,o)=>t.request(`${a}${n}`,i,o)}:null}}function Pg(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}const Dg=.2,Ko=.5;function Rg(e,t,n){const a=new rd({bpm:120,minBpm:qe[0],maxBpm:qe[1],timebase:"shared"}),i=new bd({app:Fg,version:"0.1.0",clock:a,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:qe},startLeadSeconds:Dg,...n?{startGate:()=>n(),gatedStartLeadSeconds:Ko}:{},...t?{channel:t.channel,locks:t.locks}:{},audio:()=>{const u=e();return u==="running"?"running":u==="closed"?"none":"needs-gesture"}});let o=!1,s=0,l=!1;return{clock:a,peer:i,async start(){o||(o=!0,await i.start())},play(){const u=n?.()??null;if(!u){l=!1,a.play({at:Ue()});return}const c=++s,d=Ue();l=!0;const p=()=>{c!==s||!l||(l=!1,i.isLeader&&!a.transport.running?(a.commitStart(Math.max(d,Ue())+Ko,0),i.publishState()):a.play({at:Ue()}))};u.then(p,p)},stop(){l&&(l=!1,s++,!a.transport.running)||a.stop({at:Ue()})},setTempo:u=>a.setTempo({bpm:Og(u)}),playing:()=>a.transport.isPlayingAt(Ue()),running:()=>l||a.transport.running,bpm:()=>a.transport.bpm,position(){const u=a.transport,c=Ue();return u.isPlayingAt(c)?qg(u.beatAt(c)):null},beatPhase(){const u=a.transport,c=Ue();if(!u.isPlayingAt(c))return null;const d=u.beatAt(c);return d-Math.floor(d)},peers:()=>[...i.peers.values()]}}function Og(e){return Number.isFinite(e)?Math.min(qe[1],Math.max(qe[0],Math.round(e*10)/10)):120}function qg(e){const t=Math.max(0,Math.floor(e));return{bar:Math.floor(t/4)+1,beat:t%4+1}}const Ai="netcomposer.scene",gc=1,bc="netcomposer.studio.tempo.v1",yc="netcomposer.studio.scene-name.v1",ia=120,tr="Untitled scene",Ig=2*1024*1024;function va(e){const t=typeof e=="number"?e:Number(e);return Number.isFinite(t)?Math.min(qe[1],Math.max(qe[0],Math.round(t*10)/10)):ia}function pt(e){return(typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,60):"")||tr}function _g(e){return{format:Ai,v:gc,name:pt(e.name),saved:(e.now??new Date).toISOString(),tempo:{bpm:va(e.bpm)},meter:[4,4],instances:e.instances.map(t=>({id:t.id,type:t.type,name:t.name})),mix:e.mix,presets:e.presets??{},media:e.media??[]}}function Bg(e,t){if(e.length>Ig)return{ok:!1,error:"That file is too large to be a Scene."};let n;try{n=JSON.parse(e)}catch{return{ok:!1,error:"That file isn't a Scene (it isn't JSON)."}}if(!n||typeof n!="object")return{ok:!1,error:"That file isn't a Scene."};const a=n;if(a.format!==Ai)return{ok:!1,error:"That file isn't a Scene. Load an instrument's own file from that instrument."};if((typeof a.v=="number"?a.v:0)<1)return{ok:!1,error:"That Scene has no version."};const o=new Set,s=[];for(const c of Array.isArray(a.instances)?a.instances:[]){if(!c||typeof c!="object")continue;const d=c.id;if(typeof d!="string")continue;const p=Ki(d);if(!p||!t.includes(p.type)||o.has(d))continue;o.add(d);const h=c.name;s.push({id:d,type:p.type,name:Il(h,"")})}if(!s.length)return{ok:!1,error:"That Scene has no instruments this Studio knows."};const l=a.tempo&&typeof a.tempo=="object"?a.tempo.bpm:void 0,u={};if(a.presets&&typeof a.presets=="object")for(const[c,d]of Object.entries(a.presets))o.has(c)&&(u[c]=d);return{ok:!0,scene:{format:Ai,v:gc,name:pt(a.name),saved:typeof a.saved=="string"?a.saved:"",tempo:{bpm:va(l)},meter:[4,4],instances:s,mix:nc(a.mix??gn()),presets:u,media:Array.isArray(a.media)?a.media:[]}}}function jg(e){return`${pt(e).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"scene"}.scene.json`}function Hg(e){try{const t=e?.getItem(bc);return t?va(Number(t)):ia}catch{return ia}}function wc(e,t){try{t?.setItem(bc,String(va(e)))}catch{}}function Ug(e){try{return pt(e?.getItem(yc))}catch{return tr}}function vc(e,t){try{t?.setItem(yc,pt(e))}catch{}}const Vg=300,Gg=120*1e3;function Wg(e){return Object.prototype.toString.call(e)==="[object Float32Array]"}function Yg(e){const t=e&&typeof e=="object"?e:null;if(!t)return{ok:!1,message:"No audio."};const n=typeof t.name=="string"?t.name.trim().slice(0,64):"";if(!n)return{ok:!1,message:"The audio has no name."};const a=t.sampleRate;if(typeof a!="number"||!Number.isFinite(a)||a<8e3||a>192e3)return{ok:!1,message:"The sample rate is out of range (8–192 kHz)."};const i=t.channels;if(!Array.isArray(i)||i.length<1||i.length>2)return{ok:!1,message:"The audio needs one or two channels."};if(!i.every(Wg))return{ok:!1,message:"Channels must be 32-bit float arrays."};const o=i[0].length;if(o===0)return{ok:!1,message:"The audio is empty."};if(i.some(u=>u.length!==o))return{ok:!1,message:"The channels differ in length."};if(o>Vg*a)return{ok:!1,message:"The audio is longer than five minutes."};const s=typeof t.bars=="number"&&Number.isInteger(t.bars)&&t.bars>=1&&t.bars<=256?t.bars:void 0,l=typeof t.bpm=="number"&&Number.isFinite(t.bpm)&&t.bpm>=20&&t.bpm<=300?t.bpm:void 0;return{ok:!0,audio:{name:n,sampleRate:a,channels:i.map(u=>new Float32Array(u)),...s===void 0?{}:{bars:s},...l===void 0?{}:{bpm:l}}}}function Xo(e){try{const t=e.targets();return Array.isArray(t)?t.flatMap(n=>{if(!n||typeof n.id!="string"||!n.id)return[];const a=typeof n.name=="string"&&n.name?n.name.slice(0,64):n.id;return[{id:n.id,name:a,...n.filled?{filled:!0}:{}}]}):[]}catch{return[]}}function Kg(e={}){const t=new Map,n=s=>e.live?.(s)??!0,a=s=>e.nameOf?.(s)??s,i=e.answerMs??Gg,o=s=>[...t.entries()].filter(([l])=>l!==s&&n(l)).map(([l,u])=>{const c=e.brandOf?.(l);return{instance:l,name:a(l),...c?{brand:c}:{},label:typeof u.label=="string"&&u.label?u.label.slice(0,24):"Target",targets:Xo(u)}});return{forget(s){t.delete(s)},host(s){return{audioReceivers:()=>o(s),async sendAudio(l,u,c){const d=t.get(l);if(l===s||!d||!n(l))return{ok:!1,reason:"gone",message:"That instrument isn't in the Studio."};if(typeof c!="string"||!Xo(d).some(b=>b.id===c))return{ok:!1,reason:"invalid",message:`No ${c} there.`};const p=Yg(u);if(!p.ok)return{ok:!1,reason:"invalid",message:p.message};const h={...p.audio,from:s,fromName:e.brandOf?.(s)??a(s)};let m;try{const b=await Promise.race([Promise.resolve(d.receive(h,c)),new Promise(y=>{m=setTimeout(()=>y({ok:!1,reason:"timeout",message:"No answer."}),i)})]);return!b||typeof b!="object"||typeof b.ok!="boolean"?{ok:!1,reason:"error",message:"The instrument didn't answer."}:b}catch(b){return{ok:!1,reason:"error",message:b instanceof Error?b.message:String(b)}}finally{clearTimeout(m)}},onAudio(l){return t.set(s,l),()=>{t.get(s)===l&&t.delete(s)}},reveal(){n(s)&&e.reveal?.(s)}}}}}const Xg="/studio/assets/silence-processor-CMfx2MIS.js";function Qg(e,t=Qi){const n=t.find(o=>o.id===e.type),a=(n?.name??e.type).toUpperCase(),i=String(e.n).padStart(2,"0");return{brand:n?.brand??a,rest:e.custom&&e.name?` / ${e.name.toUpperCase()}`:` / ${a} / ${i}`,...n?.identity?{identity:n.identity}:{}}}const Si=ep,De=Zu,Ka={system:"System",light:"Light",dark:"Dark"};function Jg(e){try{return zi(e?.getItem(Si))}catch{return"system"}}function Zg(e,t){try{t==="system"?e?.removeItem(Si):e?.setItem(Si,t)}catch{}}const eb=e=>De[(De.indexOf(e)+1)%De.length]??"system";function tb(e){try{return e.contentDocument?.documentElement?e.contentDocument:null}catch{return null}}function xc(e,t){const n=tb(e);n&&Pi(t,n)}function nb(e,t){const n=document.createElement("div");n.className="theme",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Theme"),n.dataset.theme="";let a=e;const i=De.map(s=>{const l=document.createElement("button");l.type="button",l.className="ghost theme-choice",l.setAttribute("role","radio"),l.dataset.themeChoice=s;const u=document.createElement("span");return u.className="theme-word",u.textContent=Ka[s],l.append(u),l.setAttribute("aria-label",`${Ka[s]} theme`),l.title=s==="system"?"Follow this computer's light or dark setting":`${Ka[s]} theme`,l.addEventListener("click",()=>{const c=n.closest(".nc-page-menu[data-nc-open]")!==null,d=s===a&&!c?eb(s):s;o(d),t(d),i[De.indexOf(d)]?.focus({preventScroll:!0})}),l});n.append(...i);function o(s){a=s;for(const l of i){const u=l.dataset.themeChoice===s;l.setAttribute("aria-checked",u?"true":"false"),l.tabIndex=u?0:-1}}return o(e),n.addEventListener("keydown",s=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(s.key))return;s.preventDefault();const l=s.key==="ArrowLeft"||s.key==="ArrowUp"?-1:1,u=(De.indexOf(a)+l+De.length)%De.length,c=De[u]??"system";o(c),t(c),i[u]?.focus()}),{el:n,get choice(){return a},set:o}}function ab(e,t){const n=e.addModule.bind(e),a=new Map;return Object.defineProperty(e,"addModule",{value:(o,s)=>{const l=new URL(String(o),t).href;let u=a.get(l);return u||(u=n(o,s),a.set(l,u),u.catch(()=>{a.get(l)===u&&a.delete(l)})),u},configurable:!0}),e}const G=new AudioContext({latencyHint:"interactive"});ab(G.audioWorklet,location.href);const nr=Eg(ge()),ib=new URLSearchParams(location.search).has("plugins"),rb=ib,pn=qm({ctx:G,moduleUrl:on,base:location.href,remote:rb,store:wm(),frozen:nr});function Qo(e,t){pn?.restore(e.getChain().flatMap(i=>i.plugin?[i.plugin]:[])),ar.add(e);let n=e.getChain().length;const a=new Set;return e.onChange(i=>{if(i.key==="error"||i.key==="plugin"){Be?.render();for(const s of $g(a,e.getChain()))Zt({message:P.stuck(s.plugin?.name??s.name,t()),duration:12e3,anchor:document.querySelector("[data-nc-area='fx']")}).el.dataset.pluginStuck=s.plugin?.id??s.id}const o=e.getChain().length;o!==n&&(n=o,queueMicrotask(()=>Be?.render()))}),e}function ob(e){return te.list().find(t=>t.id===e)?.name??e}const ar=new Set,ye=Cm(),qt={},sb=mc,xa=new Map,te=new wg(G,{restore:e=>ye.channels[e],fx:e=>{const t=Na(G,{moduleUrl:on,bpm:120,state:Yl(e,ye)});return qt[e]=t,t},masterFx:()=>{const e=Na(G,{moduleUrl:on,bpm:120,slots:xi,state:am(ye,xi)});return e.onChange(wn),Qo(e,()=>"Master")},channelFx:e=>{da.delete(e);const t=Na(G,{moduleUrl:on,bpm:H.bpm(),slots:sb,state:ye.channelFx[e]??{v:2,chain:[]}}),n=Ss(t,H.clock,{mapper:et}),a=t.dispose.bind(t);return t.dispose=()=>{n(),a()},t.onChange(wn),xa.set(e,t),t.dispose=(i=>()=>{ar.delete(t),i()})(t.dispose),Qo(t,()=>ob(e))}});te.setMaster(ye.master);te.setReturn("a",ye.returns.a);te.setReturn("b",ye.returns.b);const et=new gd(G);et.start();const $c=Pg();let kc=()=>{};const Ec=hm(G.sampleRate),ir=sm(G,{nodeFor:e=>te.tapNode(e),latencyFor:e=>te.tapLatency(e,Ec.get()),sources:()=>[{id:"master",name:"Master"},...te.list().map(e=>({id:e.id,name:e.name}))],ready:new Promise(e=>{kc=e})}),$e=vg(),Ct=jf(()=>{try{return globalThis.sessionStorage??null}catch{return null}}),Ac=Kg({live:e=>q.some(t=>t.id===e),nameOf:e=>q.find(t=>t.id===e)?.name??e,brandOf:e=>{const t=q.find(a=>a.id===e),n=ve.find(a=>a.id===t?.type)?.brand;return t&&n?t.n===1?n:`${n} ${t.n}`:void 0},reveal:e=>{_e(e),document.getElementById(`tab-${e}`)?.scrollIntoView({block:"nearest"}),ke.get(e)?.contentWindow?.focus()}});let Sc=!1;const rr=Zf(),Mc=Qf({now:()=>G.currentTime,labelOf:e=>{const t=q.find(a=>a.id===e),n=ve.find(a=>a.id===t?.type)?.brand??t?.name??e;return t&&t.n>1?`${n} ${t.n}`:n},clearOf:()=>[Fc,la,zc]});window.ncStudio=Vf(G,te,{countIn:Mc.api,holdFirstPlay:()=>rr.hold(),presets:Ct,share:Ac,grab:ir,play:$e,mapper:lm(et),resolve:(e,t)=>pb(e,t),syncScope:$c,fxWorklet:new URL(on,location.href).href});const H=Rg(()=>G.state,zg($c),()=>Sc&&G.state==="running"&&et.ready&&rr.count===0?null:bb());function Ze(){try{return globalThis.localStorage??null}catch{return null}}H.setTempo(Hg(Ze()));const pe=new Cg(G,()=>te.tapNode("master"));let en=null;function O(e,t={},...n){const a=document.createElement(e);for(const[i,o]of Object.entries(t))o===void 0||o===!1||a.setAttribute(i,o===!0?"":String(o));return a.append(...n),a}const bn=O("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),It=O("input",{type:"number",class:"bpm",min:qe[0],max:qe[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),ra=O("output",{class:"position","aria-label":"Bar and beat"},"—"),Ke=O("button",{type:"button",class:"btn rec","aria-pressed":"false","data-state":"idle","data-nc-help":Y["transport:rec"]},"Rec"),tn=O("a",{class:"take",hidden:!0}),or=O("span",{class:"status",role:"status"}),At=O("input",{type:"text",class:"scene-name",maxlength:60,value:Ug(Ze()),"aria-label":"Scene name",title:"Scene name (used when you Save)"}),Tc=O("button",{type:"button",class:"ghost","data-scene":"save",title:"Save this Scene as a file"},"Save"),Lc=O("button",{type:"button",class:"ghost","data-scene":"load",title:"Load a Scene file"},"Load"),Cc=O("button",{type:"button",class:"ghost","data-scene":"new",title:"Start a new Scene"},"New"),hn=O("input",{type:"file",accept:".json,application/json",hidden:!0}),sr=nb(Jg(Ze()),e=>{Zg(Ze(),e),Pi(e);for(const t of ke.values())xc(t,e)});Pi(sr.choice);const Fc=O("h1",{class:"brand","aria-label":"NetComposer Studio"},O("span",{"aria-hidden":"true"},"NetComposer",O("span",{class:"brand-sep"}," / "),"Studio")),Mi=O("span",{class:"beat-light","aria-hidden":"true"}),oa=O("span",{class:"status-long"}),sa=O("span",{class:"status-short"});or.append(oa,sa);const la=O("header",{class:"top"},O("div",{class:"transport"},bn,O("label",{class:"tempo"},It,O("span",{class:"tempo-unit"},"BPM")),Mi,ra),O("div",{class:"record"},Ke,tn),or),Nc=O("div",{class:"scene-actions"},At,Tc,Lc,Cc,sr.el),lb=vf({panel:Nc}),zc=O("div",{class:"scene",role:"group","aria-label":"Scene"},Nc,hn,lb.button);pe.supported||(Ke.disabled=!0,Ke.title="This browser can't record audio");const jt=O("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),Pc=O("div",{class:"stage"}),$n=O("label",{class:"tab tab-add",title:"Add an instrument"},O("span",{"aria-hidden":"true"},"+")),Ft=O("select",{class:"tab-add-select","aria-label":"Add an instrument"});Ft.append(O("option",{value:""},"Add an instrument"),...Qi.map(e=>{const t=O("option",{value:e.id},e.available===!1?`${e.name} (soon)`:e.name);return t.disabled=e.available===!1,t}));Ft.addEventListener("change",()=>{const e=Ft.value;Ft.value="",e&&jc(e)});$n.append(Ft);jt.append($n);gf();const yn=O("div",{class:"spine","aria-hidden":"true"}),ke=new Map;let q=Rf(Df(ve),ve),je=q[0]?.id??"";const cb=new URLSearchParams(location.search).has("measure"),Jo=new Map,db=2e4;function Dc(e){const t=O("button",{type:"button",role:"tab",id:`tab-${e.id}`,"aria-controls":`panel-${e.id}`,class:"tab"},e.name);t.addEventListener("click",()=>_e(e.id)),jt.insertBefore(t,$n);const a=(Jo.get(e.type)??Promise.resolve()).then(()=>new Promise(i=>{if(!q.some(l=>l.id===e.id))return i();const o=O("iframe",{id:`panel-${e.id}`,role:"tabpanel","aria-labelledby":`tab-${e.id}`,title:e.name,src:Nf(e,cb),allow:"autoplay; clipboard-read; clipboard-write; microphone"});ke.set(e.id,o);const s=window.setTimeout(i,db);o.addEventListener("load",()=>ub(o)),o.addEventListener("load",()=>{window.clearTimeout(s),i()},{once:!0}),Pc.append(o),_e(je)}));return Jo.set(e.type,a),a}const Rc=window.matchMedia(Ps);function Oc(e){try{e.contentDocument?.documentElement.toggleAttribute("data-nc-landscape",Rc.matches)}catch{}}Rc.addEventListener("change",()=>{for(const e of ke.values())Oc(e)});function ub(e){let t=null;try{t=e.contentDocument}catch{return}if(!t?.documentElement)return;t.documentElement.dataset.ncHosted="",xc(e,sr.choice),Oc(e);const n=e.id.replace(/^panel-/,""),a=()=>{const o=t?.querySelector(".nc-page"),s=o?o.getBoundingClientRect().height:t?.documentElement.scrollHeight??0;s>0&&(e.style.height=`${Math.ceil(s)}px`);const l=t?.querySelector(".nc-page-hd, .nc-title-band");l&&(Ic.set(n,Math.round(l.getBoundingClientRect().bottom)),n===je&&_c())};a();const i=t.querySelector(".nc-page")??t.body;i&&new ResizeObserver(()=>{a(),$a()}).observe(i),lr.add(e),qc(e)}const lr=new Set;function qc(e){let t;try{t=e.contentDocument?.documentElement}catch{return}if(!t||!e.isConnected){lr.delete(e);return}const n=e.getBoundingClientRect();if(n.height<=0)return;const a=getComputedStyle(la).position==="sticky"?la.getBoundingClientRect().bottom:0,i=Math.min(n.height,Math.max(0,a-n.top)),o=Math.max(i,Math.min(n.height,window.innerHeight-n.top));t.style.setProperty("--nc-host-top",`${Math.round(i)}px`),t.style.setProperty("--nc-host-height",`${Math.round(o-i)}px`),t.style.setProperty("--nc-host-bottom",`${Math.round(n.height-o)}px`)}let Xa=!1;function $a(){Xa||(Xa=!0,requestAnimationFrame(()=>{Xa=!1;for(const e of lr)qc(e)}))}window.addEventListener("scroll",$a,{passive:!0});window.addEventListener("resize",$a);const Ic=new Map;function _c(){const e=Ic.get(je);e===void 0?yn.style.removeProperty("--spine-top"):yn.style.setProperty("--spine-top",`${e}px`)}function Bc(e){if(!e){yn.replaceChildren();return}const t=Qg(e),n=O("span",{class:"spine-brand"},t.brand);t.identity&&(n.style.color=`var(--nc-ui-${t.identity})`),yn.replaceChildren(O("span",{class:"spine-text"},n,O("span",{class:"spine-rest"},t.rest)))}function _e(e){je=e,Bc(q.find(t=>t.id===e)),_c(),$a();for(const t of q){const n=t.id===e;ke.get(t.id)?.classList.toggle("shown",n);const a=document.getElementById(`tab-${t.id}`);a?.setAttribute("aria-selected",String(n)),a?.setAttribute("tabindex",n?"0":"-1")}}const pb=qf(()=>q.map(e=>({instance:e,window:()=>ke.get(e.id)?.contentWindow,readyState:()=>{try{return ke.get(e.id)?.contentDocument?.readyState}catch{return}}})),ve);function jc(e){const t=ve.find(i=>i.id===e);if(!t)return;const n=zf(q,t),a=q.map(i=>i.type).lastIndexOf(n.type);q=a<0?[...q,n]:[...q.slice(0,a+1),n,...q.slice(a+1)],Bt(q),Dc(n);for(const i of q){const o=document.getElementById(`tab-${i.id}`);o&&jt.insertBefore(o,$n)}_e(n.id),Be?.render()}function hb(e,t){const n=q.find(o=>o.id===e);if(!n)return;const a=q.filter(o=>o.id!==e),i=t===null?a.length:a.findIndex(o=>o.id===t);q=[...a.slice(0,i<0?a.length:i),n,...a.slice(i<0?a.length:i)],Bt(q);for(const o of q){const s=document.getElementById(`tab-${o.id}`);s&&jt.insertBefore(s,$n)}Be?.render()}function fb(e,t){q=Ff(q,e,t,ve),Bt(q);const n=q.find(i=>i.id===e);if(!n)return;const a=document.getElementById(`tab-${e}`);a&&(a.textContent=n.name),ke.get(e)?.setAttribute("title",n.name),je===e&&Bc(n),te.rename(e,n.name)}async function mb(e,t){const a=q.find(l=>l.id===e)?.name??e;if(!await ct({title:`Remove ${a}?`,body:`Its channel, strip and mix settings go. ${a}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:t}))return;q=q.filter(l=>l.id!==e),Bt(q),Ac.forget(e);const o=$e.playing().includes(e);$e.drop(e),o&&$e.out(e);const s=ke.get(e);ke.delete(e),s?.setAttribute("src","about:blank"),s?.remove(),document.getElementById(`tab-${e}`)?.remove(),te.detach(e),gb(e),Hm(ge(),e),je===e&&_e(q[0]?.id??"")}const Ti=O("div",{class:"mix"});Ti.addEventListener("click",e=>{const n=e.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==je&&q.some(a=>a.id===n)&&_e(n)});let Be=null,ca=0;const da=new Set;function gb(e){da.add(e),delete ye.channels[e],delete ye.channelFx[e],xa.delete(e),wn()}let cr=!1;function wn(){window.clearTimeout(ca),!cr&&(ca=window.setTimeout(()=>{ic(Hc())},300))}function Hc(){const e={...ye.channels};for(const i of te.list())e[i.id]=i.strip;for(const i of da)delete e[i];const t={};for(const i of["a","b"]){const o=qt[i];o&&(t[i]=o.getState())}const n=te.masterFx?.getState()??null,a={...ye.channelFx};for(const[i,o]of xa)a[i]=o.getState();for(const i of da)delete a[i];return{v:1,channels:e,master:te.masterPositionValue,returns:{a:{on:te.returns.a.on,level:te.returns.a.level},b:{on:te.returns.b.on,level:te.returns.b.level}},insert:{on:n?im(n):ye.insert.on},fx:t,channelFx:a,masterFx:n??ye.masterFx}}te.onChange(()=>{Be?.render(),wn()});for(const e of Object.values(qt))e?.onChange(wn);async function dr(){G.state!=="running"&&await G.resume()}const Zo=1500;async function bb(){const e=performance.now()+Zo;await Promise.race([dr(),new Promise(t=>setTimeout(t,Zo))]),await et.whenSettled(Math.max(0,e-performance.now())),await Promise.race([rr.idle(),new Promise(t=>setTimeout(t,Math.max(0,e-performance.now())))])}bn.addEventListener("click",()=>{dr(),H.running()&&$e.owner()===er?H.stop():H.running()?$e.claimAll():($e.claimAll(),H.play()),He()});function Uc(){const e=Number(It.value);H.setTempo(e),wc(H.bpm(),Ze())}At.addEventListener("change",()=>{At.value=pt(At.value),vc(At.value,Ze())});function yb(e,t,n){const a=URL.createObjectURL(new Blob([t],{type:n})),i=O("a",{href:a,download:e});document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e4)}Tc.addEventListener("click",async()=>{const e=pt(At.value),t=q.map(o=>o.id),n=await Ct.collect(t),a=_g({name:e,bpm:H.bpm(),instances:q,mix:Hc(),presets:n});yb(jg(e),`${JSON.stringify(a,null,2)}
`,"application/json");const i=q.filter(o=>!n[o.id]).map(o=>o.name);kn(i.length?`Saved “${e}” (without ${i.join(", ")}: ${i.length===1?"it hasn't":"they haven't"} loaded yet)`:`Saved “${e}”`)});Lc.addEventListener("click",()=>hn.click());hn.addEventListener("change",async()=>{const e=hn.files?.[0];if(hn.value="",!e)return;const t=Bg(await e.text(),ve.filter(i=>i.available!==!1).map(i=>i.id));if(!t.ok){kn(t.error);return}const n=t.scene;await ct({title:`Load “${n.name}”?`,body:"The music stops and the Studio reloads with this Scene's instruments, their sounds and patterns, the mix and the tempo. Save the current Scene first to keep it.",confirmLabel:"Load"})&&Vc({name:n.name,bpm:n.tempo.bpm,instances:n.instances,mix:n.mix,presets:n.presets})});Cc.addEventListener("click",async()=>{await ct({title:"Start a new Scene?",body:"The music stops and the Studio reloads with one of each instrument, a fresh mix and 120 BPM. Each instrument keeps its own sound and pattern. Save the current Scene first to keep it.",confirmLabel:"New"})&&Vc({name:tr,bpm:ia,instances:mn(ve),mix:gn()})});function Vc(e){H.running()&&H.stop(),cr=!0,window.clearTimeout(ca);const t=e.instances.map(({id:n,name:a})=>{const[i,o]=n.split("#"),s=ve.find(l=>l.id===i);return s?_t(s,o?Number(o):1,a):null}).filter(n=>n!==null);Bt(t),ic(e.mix),wc(e.bpm,Ze()),vc(e.name,Ze()),Ct.stash({...e.presets??{}}),location.reload()}let es=0;function kn(e){oa.textContent=e,sa.textContent=e,window.clearTimeout(es),es=window.setTimeout(He,4e3)}It.addEventListener("change",Uc);It.addEventListener("keydown",e=>{e.key==="Enter"&&Uc()});Ke.addEventListener("click",()=>{dr();const e=pe.state;e==="recording"?wb():e==="arming"||e==="armed"?(pe.cancel(),kn("Rec cancelled")):e==="idle"&&(pe.arm(H.playing()),Gc())});async function wb(){const e=await pe.stop();e&&(en&&URL.revokeObjectURL(en.url),en={url:URL.createObjectURL(e.blob),take:e},tn.href=en.url,tn.download=e.name,tn.textContent=`Save take (${e.seconds.toFixed(1)} s)`,tn.hidden=!1)}function Gc(){const e=pe.state;if(e!=="arming"&&e!=="armed")return;const t=H.clock.transport;if(!t.running||t.startTime===null){pe.schedule(null);return}const n=Math.round(et.toContextTime(t.startTime)*G.sampleRate);pe.schedule(n+ir.latency("master"))}function vb(){const e=pe.state,t=e==="arming"||e==="armed",n=e==="recording"||e==="stopping";Ke.dataset.state=t?"armed":n?"recording":"idle",Ke.setAttribute("aria-pressed",String(n)),Ke.textContent=t?"Armed":n?"Stop rec":"Rec",Ke.disabled=e==="stopping"||!pe.supported,He()}pe.onChange(vb);document.addEventListener("keydown",e=>{if(e.code!=="Space"||e.repeat)return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable)||(e.preventDefault(),bn.click())});jt.addEventListener("keydown",e=>{if(e.target===Ft)return;const t=q.map(i=>i.id),n=t.indexOf(je),a=e.key==="ArrowRight"?t[(n+1)%t.length]:e.key==="ArrowLeft"?t[(n-1+t.length)%t.length]:null;a&&(e.preventDefault(),_e(a),document.getElementById(`tab-${a}`)?.focus())});function He(){const e=H.running()&&$e.owner()===er;bn.textContent=e?"Stop":"Play",bn.setAttribute("aria-pressed",String(e)),document.activeElement!==It&&(It.value=String(Math.round(H.bpm()*10)/10));const t=H.position();ra.value=t?`${t.bar}.${t.beat}`:"—";const n=H.peers().length;oa.textContent=G.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",sa.textContent=G.state==="running"?"":"Audio off",(pe.state==="arming"||pe.state==="armed")&&(oa.textContent="Rec armed: waiting for sound",sa.textContent="Rec armed"),or.classList.toggle("off",G.state!=="running")}H.clock.onChange(()=>{H.clock.transport.running&&(Sc=!0),H.running()||$e.clear(),Gc(),He()});$e.onChange(He);$e.onLastOut(()=>{H.running()&&H.stop(),He()});H.clock.onChange(()=>Be?.render());H.peer.onPeers(He);G.addEventListener("statechange",He);const xb=.25;let ts=performance.now();function Wc(e){const t=Math.min(.1,(e-ts)/1e3);ts=e,Be?.frame(t);const n=H.position(),a=n?`${n.bar}.${n.beat}`:"—";ra.value!==a&&(ra.value=a);const i=H.beatPhase(),o=i!==null&&i<xb;Mi.hasAttribute("data-on")!==o&&Mi.toggleAttribute("data-on",o),requestAnimationFrame(Wc)}async function $b(){const e=document.getElementById("app");if(!e)throw new Error("Missing #app");e.append(Fc,la,zc,Ti,O("main",{class:"instruments"},jt,O("div",{class:"bay"},yn,Pc)),Mc.el),Be=gg(Ti,te,{order:()=>q.map(t=>t.id),catalogue:Qi,bpm:()=>H.bpm(),onAdd:jc,onRemove:(t,n)=>void mb(t,n),onReorder:(t,n)=>hb(t,n),onRename:(t,n)=>fb(t,n),...pn?{plugins:pn}:{}}),G.state==="running"&&await G.suspend(),await G.audioWorklet.addModule(Xg),kc(),pe.attach(),await H.start();for(const t of[qt.a,qt.b,te.masterFx])t&&Ss(t,H.clock,{mapper:et});for(const t of q)Dc(t);_e(je),He(),requestAnimationFrame(Wc),document.documentElement.dataset.studioReady="",Eb(),pn&&Ag({ctx:G,running:()=>kg([...ar].map(t=>t.getChain())),onFrozen:kb})}async function kb(e){nr.add(e.map(a=>a.id)),window.clearTimeout(ca),cr=!0;const t=e.map(a=>a.name).join(", ");document.documentElement.dataset.pluginsFrozen=e.map(a=>a.id).join(" "),kn(`${t} froze the audio`),await ct({title:P.frozenTitle,body:P.frozenBody(t),confirmLabel:P.frozenOpen,cancelLabel:P.frozenStay})&&window.open(location.href,"_blank")}function Eb(){const e=new Set(Ct.pending());if(!e.size)return;const t=[],n=o=>q.find(s=>s.id===o)?.name??o,a=()=>{window.clearTimeout(i);const o=[...t,...Ct.dropPending()].map(n);kn(o.length?`Scene loaded; ${o.join(", ")} kept ${o.length===1?"its":"their"} own sound`:"Scene loaded")};Ct.onApplied((o,s)=>{e.delete(o)&&(s||t.push(o),e.size||a())});const i=window.setTimeout(a,_f)}window.__studio={ctx:G,mixer:te,grab:ir,recorder:pe,get lastTake(){return en?.take??null},limiterDelay:Ec,mapper:et,transport:H,frames:ke,show:_e,get instances(){return q},fx:qt,plugins:pn,frozen:nr,channelCores:xa,get mix(){return Be}};$b();
