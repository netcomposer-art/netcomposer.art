(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const sn=1e-9;function Th(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class qi{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return Th(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(i=>Number.isFinite(i.beat)&&Number.isFinite(i.bpm)).slice().sort((i,l)=>i.beat-l.beat);let s=a.length?a[0].bpm:this.bpm;for(const i of a)i.beat<=t.beat+sn&&(s=i.bpm);const o=[{beat:t.beat,time:t.time,bpm:this.clamp(s)}];for(const i of a){if(i.beat<=t.beat+sn)continue;const l=this.clamp(i.bpm);l!==o[o.length-1].bpm&&o.push({beat:i.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+sn){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-sn;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,s=.25){const o=this.bpmAt(n);if(!(a>0)||!(s>0)){this.setTempoAt(t,n);return}const i=Math.max(1,Math.round(a/s));this.setTempoAt(o,n);for(let l=1;l<=i;l++)this.setTempoAt(o+(t-o)*l/i,n+a*(l-1)/i)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new qi({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+sn)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+sn)return n[a];return n[0]}}const Ch=Object.freeze({beatsPerBar:4,beatUnit:4}),fn=1e-9;function Nh(e){return Math.floor(e+fn)}function rd(e,t,n=!1){if(!(t>0))return e;const s=Math.ceil(e/t-fn)*t;return n&&s<=e+fn?s+t:s}class Fh{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new qi({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??Ch}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-fn&&(this.stopTime===null||t<this.stopTime-fn)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-fn?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=Nh(t/n),s=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:s,barPhase:s/n}}nextBar(t,n=!1){return rd(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const ld="nc-clock/snapshot",cd=1;function Ph(e,t="local"){return{format:ld,version:cd,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function zh(e,t){const n=Oh(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const ot=e=>typeof e=="number"&&Number.isFinite(e),Zr=e=>e===null||ot(e);function Oh(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==ld&&n("format"),(!ot(t.version)||Math.floor(t.version)!==cd)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!ot(t.anchor.beat)||!ot(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&ot(a.beat)&&ot(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!ot(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!ot(t.meter.beatUnit))&&n("meter"),(!Zr(t.startTime)||!Zr(t.stopTime)||!ot(t.stoppedBeat))&&n("transport times"),t}class Dh{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new Fh(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){zh(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return Ph(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const Bh="nc-sync/1",Rh=1,Ih="nc-sync",qh="nc-sync-leader",_h=0,dd=.5,ud=.75;function Hh(e){return typeof e=="number"&&Number.isFinite(e)&&e>=dd&&e<=ud?e:null}const to=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),In=e=>typeof e=="number"&&Number.isFinite(e),Ta=e=>typeof e=="string"&&e.length>0;function jh(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==Rh||!Ta(t.type)||!Ta(t.from)||!In(t.term)||!In(t.seq)||!In(t.sentAt))return null;switch(t.type){case"hello":return Ta(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return In(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&In(t.slot)?t:null;case"ping":case"pong":return Ta(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function Wh(e,t,n,a,s){return{proto:Bh,from:t,term:n,seq:a,sentAt:s,...e}}function le(){return(performance.timeOrigin+performance.now())/1e3}const no=.003,Uh=3,ao=.002+1e-6,Yh=.01,el=500;class tl{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Yh:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=no&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const s=n-(this.timeOrigin+a)/1e3,o=this.median(),i=s-o,l=Math.abs(s-this.preStepBase),c=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(i);return!c&&Math.abs(i)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&c===this.pendingBack&&(c||Math.abs(i-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(s,o,c))):(this.pendingStep=i,this.pendingBack=c,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const s=this.heldBase()!==null,o=this.ctx.currentTime,i=o<=this.revertUntil;let l;if(a&&i){const c=this.offsets,d=this.preStep;c.length=0;for(let u=0;u<d.length;u++)c.push(d[u]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:o,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!i){const u=this.offsets,h=this.preStep;h.length=0;for(let p=0;p<u.length;p++)h.push(u[p]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?o+this.stepRevert:-1/0}const c=this.offsets,d=t-n;for(let u=0;u<c.length;u++)c[u]+=d;this.stepCount++,l={stepSeconds:t-n,confirmedAt:o,reanchors:this.stepCount,revert:!1}}if(!s)for(const c of[...this.stepListeners])c(l);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let o=0;o<a;o++){const i=t[o];let l=o-1;for(;l>=0&&n[l]>i;)n[l+1]=n[l],l--;n[l+1]=i}const s=a>>1;return a%2?n[s]:(n[s-1]+n[s])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const s=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(s&&Number.isFinite(s.contextTime)&&Number.isFinite(s.performanceTime)&&s.contextTime>=no&&s.performanceTime>0)if(this.waitSince=null,s.contextTime===this.lastStampC&&s.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<el)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=s.contextTime,this.lastStampP=s.performanceTime,this.stampSince=this.perfNow(),n=s.contextTime-(this.timeOrigin+s.performanceTime)/1e3,a=!0;else if(!s||!(s.contextTime>=no)&&!(s.contextTime>0&&!(s.performanceTime>0))){if(s){const o=this.perfNow();if(this.waitSince===null&&(this.waitSince=o),o-this.waitSince<el)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(Uh,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let s=-1,o=0;for(let l=0;l<n;l++){let c=0;for(let d=0;d<n;d++)Math.abs(t[d]-t[l])<=ao&&c++;c>o&&(s=l,o=c)}if(o<a)return;const i=t[s];for(let l=n-1;l>=0;l--)Math.abs(t[l]-i)>ao&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-this.estimate())<=ao}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const s=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(s,2)};setTimeout(s,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,s=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(s)&&s>0?s:null}}class Kh{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...to,...t.capabilities},this.channelOption=t.channel??Ih,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const s=this.o.now(),o=()=>{n===this.startWaits&&t(s)};return a.then(o,o),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const s=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(s),0)}else{const s=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?s:Math.max(t+this.o.gatedStartLeadSeconds,s),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[s,o]=this.tempoRange();t=Math.min(o,Math.max(s,t));const i=this.clock.transport,l=this.o.now();if(!i.running){this.clock.commitTempo(t),this.broadcastState();return}const c=i.beatAt(l+this.o.minLeadSeconds),d=Math.max(n??rd(c,1),c);a&&a>0?(i.tempo.rampTempo(t,d,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,d),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(ud,Math.max(dd,t)):_h;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=Hh(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=jh(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const s=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...to,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),s||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const s=this.peers.get(n.from);s?s.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...to},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(s=>{this.leader&&this.decideStart(s)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const s of[...this.snapshotListeners])s(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const s of[...this.messageListeners])s(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const i=this.releaseLock;this.releaseLock=null,i()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(qh,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(i=>{this.releaseLock=()=>{this.setLeader(!1),i()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,i,l)=>[o?0:1,i,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),s=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const i=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(s===null||i[0]<a[0]||i[0]===a[0]&&(i[1]<a[1]||i[1]===a[1]&&i[2]<a[2]))&&(a=i,s=o.id)}this.setLeader(s===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],s=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==s[0]?a[0]<s[0]:a[1]!==s[1]?a[1]<s[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const s=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>s&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(Wh(t,this.id,this.term,++this.seq,this.o.now()))}}const Xh="modulepreload",Gh=function(e){return"/nyx/"+e},nl={},Vh=function(t,n,a){let s=Promise.resolve();if(n&&n.length>0){let i=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");s=i(n.map(d=>{if(d=Gh(d),d in nl)return;nl[d]=!0;const u=d.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${h}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":Xh,u||(p.as="script"),p.crossOrigin="",p.href=d,c&&p.setAttribute("nonce",c),document.head.appendChild(p),u)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(i){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=i,window.dispatchEvent(l),!l.defaultPrevented)throw i}return s.then(i=>{for(const l of i||[])l.status==="rejected"&&o(l.reason);return t().catch(o)})};var Qh=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Do=[.25,.5,.75,1,1.5,2],Jh=4.9,oe={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},zt={fmt:"wet"},Xe={fmt:"pct"},on={fmt:"db"},Ca={fmt:"signedPct"},so={fmt:"num",suffix:" ms"},ae={div:100};function P(e,t,n,a,s,o,i,l){var c={key:e,label:t,min:n,max:a,default:s,step:1,k:o,unit:null,format:i};if(l)for(var d in l)c[d]=l[d];return c}function Na(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var Zn=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[P("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:oe.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[P("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:oe.hpHz,astrid:!0,zero:"off"}),P("q","Resonance",0,100,0,2,{fmt:"q",law:oe.hpQ},{dsp:{law:oe.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[P("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:oe.bpHz,astrid:!0},{dsp:{law:oe.bpHz}}),P("q","Q",0,100,0,2,{fmt:"q",law:oe.bpQ},{dsp:{law:oe.bpQ}}),P("mix","Mix",0,100,100,3,zt,{dsp:ae,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[P("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Na(Qh),overriddenBy:"beats_free",tempoSynced:!0}),P("feedback","Feedback",0,90,35,2,Xe,{dsp:ae,unit:"%"}),P("mix","Wet/dry",0,100,0,3,zt,{dsp:ae,unit:"%",astridKey:"wet"}),P("tone","Tone",0,100,100,4,{fmt:"hz",law:oe.delayTone,offAt:100},{dsp:{div:99},more:!0}),P("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),P("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Na([[0,"Insert"],[1,"Send"]]),more:!0}),P("send","Send",0,100,100,7,Xe,{dsp:ae,unit:"%",more:!0}),P("mod_send","Accent → send",-100,100,0,8,Ca,{dsp:ae,unit:"%",more:!0}),P("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[P("predelay","Pre-delay",0,200,0,1,so,{dsp:{div:1e3},unit:"ms"}),P("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:ae,unit:"%"}),P("decay","Decay",0,100,50,3,Xe,{dsp:ae,unit:"%"}),P("damping","Damping",0,100,0,4,Xe,{dsp:ae,unit:"%"}),P("mix","Mix",0,100,0,5,zt,{dsp:ae,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[P("rate","Rate",0,100,26,1,{fmt:"rate",law:oe.rate},{dsp:{law:oe.rate}}),P("depth","Depth",0,100,70,2,Xe,{dsp:ae,unit:"%"}),P("feedback","Feedback",-90,90,50,3,Ca,{dsp:ae,unit:"%"}),P("mix","Mix",0,100,50,4,zt,{dsp:ae,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[P("rate","Rate",0,100,52,1,{fmt:"rate",law:oe.rate},{dsp:{law:oe.rate}}),P("depth","Depth",0,100,50,2,Xe,{dsp:ae,unit:"%"}),P("spread","Spread",0,100,70,3,Xe,{dsp:ae,unit:"%"}),P("mix","Mix",0,100,40,4,zt,{dsp:ae,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[P("rate","Rate",0,100,39,1,{fmt:"rate",law:oe.rate},{dsp:{law:oe.rate}}),P("depth","Depth",0,100,70,2,Xe,{dsp:ae,unit:"%"}),P("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Na([[4,"4"],[6,"6"],[8,"8"]])}),P("feedback","Feedback",0,90,30,4,Xe,{dsp:ae,unit:"%"}),P("mix","Mix",0,100,50,5,zt,{dsp:ae,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[P("low_db","Low",-18,18,0,1,on,{unit:"dB"}),P("mid_db","Mid",-18,18,0,2,on,{unit:"dB"}),P("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:oe.midHz,astrid:!0},{dsp:{law:oe.midHz}}),P("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:oe.eqQ},{dsp:{law:oe.eqQ}}),P("high_db","High",-18,18,0,4,on,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[P("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),P("output_db","Output",-12,12,0,2,on,{unit:"dB"}),P("mix","Mix",0,100,100,3,zt,{dsp:ae,unit:"%"}),P("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Na([[0,"Smooth"],[1,"Acid"]]),more:!0}),P("tone","Tone",0,100,100,5,{fmt:"hz",law:oe.driveTone,offAt:100},{dsp:{div:99},more:!0}),P("mod_drive","Accent → drive",-100,100,0,6,Ca,{dsp:ae,unit:"%",more:!0}),P("mod_tone","Accent → tone",-100,100,0,7,Ca,{dsp:ae,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[P("threshold_db","Threshold",-60,0,0,1,on,{unit:"dB"}),P("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:oe.ratio},{dsp:{law:oe.ratio}}),P("attack_ms","Attack",1,100,10,3,so,{unit:"ms"}),P("release_ms","Release",10,1e3,150,4,so,{unit:"ms"}),P("makeup_db","Makeup",0,24,0,5,on,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[P("width","Width",0,200,100,1,Xe,{dsp:ae,unit:"%"}),P("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:ae})]}],Zh=Zn.map(function(e){return e.type});Zn.filter(function(e){return!e.hidden}).map(function(e){return e.type});var ef={reverb:"plate"};function _i(e){var t=ef[e]||e;return Zh.indexOf(t)>=0?t:null}function ht(e){for(var t=_i(e),n=0;n<Zn.length;n++)if(Zn[n].type===t)return Zn[n];return null}function pn(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function pd(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=pn(n.law,t);return a===null?0:a}function al(e,t){return Math.min(Jh,e*60/(t>0?t:120))}var sl=function(e){return e>0?"+":e<0?"−":""};function tf(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function hd(e,t,n){var a=e.format,s;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:sl(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return sl(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(s=pn(a.law,t),s===null?a.zero||"open":a.astrid?tf(s):s+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+pn(a.law,t).toFixed(1);case"ratio":return pn(a.law,t).toFixed(1)+":1";case"rate":return s=pn(a.law,t),(s<1?s.toFixed(2):s<10?s.toFixed(1):s.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var o=0;o<e.options.length;o++)if(e.options[o].value===t)return e.options[o].label;return String(t);case"tempoMs":return Math.round(al(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(al(t,n)*1e3)+" ms"}return String(t)}var nf=1,Ns=["drive","delay","plate"];function af(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,s){return hd(e,a,s)},t}var ea=Ns.map(function(e){var t=ht(e),n={type:e,label:t.label,dials:t.dials.map(af)};return t.tempoSynced&&(n.tempoSynced=!0),n}),sf={reverb:"plate"};function ss(e){var t=sf[e]||e;return Ns.indexOf(t)>=0?t:null}function Fs(e){for(var t=ss(e),n=0;n<ea.length;n++)if(ea[n].type===t)return ea[n];return null}function fd(e,t){var n=Fs(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function kn(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function Tt(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,s=1;s<e.options.length;s++)Math.abs(e.options[s].value-t)<Math.abs(a-t)&&(a=e.options[s].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*o)/o))+0}function of(){return{v:nf,chain:ea.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function rf(e){return Do.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},Do[0])}function oo(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function lf(e){for(var t=Array.isArray(e)?e:oo(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=of(),s={},o=[],i=0;i<t.length;i++){var l=t[i];if(oo(l)){var c=ss(l.type);if(!c){typeof l.type=="string"&&o.push(l.type);continue}if(s[c]){o.push(c);continue}s[c]=!0;var d=a.chain[Ns.indexOf(c)],u=oo(l.dials)?l.dials:{};c==="delay"&&u.mix===void 0&&u.wet!==void 0&&(u=Object.assign({},u,{mix:u.wet})),d.bypass=n?l.bypass===!0:l.bypass!==!1,Fs(c).dials.forEach(function(h){d.dials[h.key]=Tt(h,u[h.key])}),cf(c,d.dials,u)}}return{state:a,dropped:o}}function cf(e,t,n){for(var a=Fs(e),s=0;s<a.dials.length;s++){var o=a.dials[s];o.stepWhen&&(t[o.key]=Tt(o,n&&typeof n[o.key]=="number"?n[o.key]:t[o.key],kn(o,t)))}}function Bo(e){return lf(e).state}function df(e){return JSON.parse(JSON.stringify(e))}var uf=24,Ro={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Io(e,t,n){if(t==="bypass")return n?0:1;var a=fd(e,t)||pf(e,t);return a?pd(a,n):0}function pf(e,t){var n=ht(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var hf={};ea.forEach(function(e){e.dials.forEach(function(t){hf[e.type+"."+t.key]=t.format})});function io(e,t){var n=new Float64Array(uf),a=Bo(e);return a.chain.forEach(function(s){var o=Ro[s.type];n[o.bypass]=s.bypass?0:1,Object.keys(s.dials).forEach(function(i){n[o[i]]=Io(s.type,i,s.dials[i])})}),n}var ff=2,os=3,mf=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function qn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function md(e,t){var n=ht(e);if(!n)return null;var a={};(t||[]).forEach(function(i){i&&i.id&&(a[i.id]=!0)});for(var s=1;a[n.type+"-"+s];)s++;var o={};return n.dials.forEach(function(i){o[i.key]=i.default}),{id:n.type+"-"+s,type:n.type,bypass:!1,dials:o}}function gf(e){var t=ht(e.type),n=/-(\d+)$/.exec(e.id||"");return(t?t.label:e.type)+(n&&+n[1]>1?" "+n[1]:"")}function bf(e,t,n){var a=e.length-1,s=Math.max(0,Math.min(a,n));if(t<0||t>a||t===s)return e;var o=e.slice(),i=o.splice(t,1)[0];return o.splice(s,0,i),o}function yf(e){return typeof e=="number"&&isFinite(e)?rf(e):e}function ol(e,t,n){var a={};return e.dials.forEach(function(s){var o=t[s.key];o===void 0&&s.astridKey&&(o=t[s.astridKey]),n&&e.type==="delay"&&s.key==="delay_beats"&&(o=yf(o)),a[s.key]=Tt(s,o)}),e.dials.forEach(function(s){s.stepWhen&&(a[s.key]=Tt(s,typeof t[s.key]=="number"?t[s.key]:a[s.key],kn(s,a)))}),a}function vf(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,s=1/0,o=e.min;o<=e.max;o++){var i=pn(n.law,o),l=i===null?1/0:Math.abs(i-t);l<s&&(s=l,a=o)}return a}}var wf={rate:"rate_hz"};function xf(e,t,n,a){var s={};return e.dials.forEach(function(o){if(!o.more){var i=o.astridKey||wf[o.key]||o.key;s[o.key]=vf(o,t[i])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),s}function kf(e,t){var n=t>0?Math.floor(t):os,a=[],s=[],o=[],i=!1,l=!1;Array.isArray(e)?(o=e,l=!0):qn(e)&&Array.isArray(e.chain)&&(o=e.chain,i=e.v===1,l=e.schema===2);for(var c=[],d=0;d<o.length;d++){var u=o[d];if(qn(u)&&!(u.type==="limiter"||u.fixed===!0)){var h=_i(u.type),p=h&&ht(h);if(!p||i&&["drive","delay","plate"].indexOf(h)<0){typeof u.type=="string"&&a.push(u.type);continue}if(c.length>=n){a.push(u.id||h);continue}var f;qn(u.params)&&!qn(u.dials)?f=ol(p,xf(p,u.params,s,u.id||h),l):f=ol(p,qn(u.dials)?u.dials:{},l);var g=md(h,c),w=typeof u.id=="string"&&mf.test(u.id)&&!c.some(function(b){return b.id===u.id})?u.id:g.id,m=i?u.bypass!==!1:u.bypass===!0;c.push({id:i?g.id:w,type:h,bypass:m,dials:f})}}return{state:{v:ff,chain:c},dropped:a,notes:s}}function Wa(e,t){return kf(e,t).state}function rn(e){var t=ht(e.type),n=[[0,e.bypass?0:1]];return t.dials.forEach(function(a){n.push([a.k,pd(a,e.dials[a.key])])}),n}function $f(e){var t=Wa(e,8),n=[],a=t.chain.map(function(s,o){var i=ht(s.type),l={};return o>=os&&n.push(s.id+": ASTRID keeps three hacks"),i.dials.forEach(function(c){var d=s.dials[c.key];if(c.more){d!==c.default&&n.push(s.id+"."+c.key);return}c.key==="delay_beats"&&Do.indexOf(d)<0&&n.push(s.id+".delay_beats"),l[c.astridKey||c.key]=d}),{id:s.id,type:s.type,bypass:s.bypass,dials:l}});return{hacks:a,lossy:n}}var Sf="nc-fx@1",Ef=600,Af=256,Mf=8,_n=typeof WeakMap=="function"?new WeakMap:null;function Lf(e,t){var n=_n&&_n.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await Vh(async()=>{const{default:o}=await import("./worklet-source-BibsVBZk.js");return{default:o}},[])).default,s=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(s)}finally{URL.revokeObjectURL(s)}})(),_n&&(_n.set(e,n),n.catch(function(){_n.delete(e)})),n)}function ln(e,t){return typeof e=="number"&&isFinite(e)?e:t}function gd(e,t,n,a){var s=Math.min(400,Math.max(20,ln(t.bpm,120))),o=[],i=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",c=ln(t.preGain,1),d=Math.max(0,ln(t.crossfade,.012)),u=ln(t.maxDelaySeconds,void 0),h=e.createGain(),p=e.createGain(),f=e.createGain(),g=e.createGain(),w=null;t.modInput===!0&&(w=e.createGain(),w.channelCount=1,w.channelCountMode="explicit",w.channelInterpretation="discrete"),g.gain.value=0,h.connect(f),f.connect(p),g.connect(p);var m={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:s,mUsers:0,lv:null,lvAt:0},b=n(s);m.post=function(k){m.node?m.node.port.postMessage(k):m.disposed||(o.length>=Af&&(o=a().concat([{t:"tempo",bpm:m.bpm,when:0}]),m.mUsers>0&&o.push({t:"meter",on:!0})),o.push(k))};function v(k){var $=o.map(function(A){var M=Object.assign({},A);return M.when>k||(M.when=0,M.t!=="clear"&&(M.snap=!0)),M});return o=[],$}m.emit=function(k){for(var $=0;$<m.listeners.length;$++)try{m.listeners[$](k)}catch(A){typeof console<"u"&&console.error(A)}},m.whenOf=function(k){return typeof k=="number"&&isFinite(k)&&k>0?k:0};var y=!1;m.tooFar=function(k){return typeof k=="number"&&k>e.currentTime+Ef?(!y&&typeof console<"u"&&(y=!0,console.warn("nc-fx: ignoring a time "+Math.round(k-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var x=Lf(e,t.moduleUrl).then(function(){if(!m.disposed){var k=Object.assign({bpm:s,bypassMode:l,limiter:i,preGain:c,maxDelaySeconds:u},b);k.pending=v(e.currentTime),m.node=new AudioWorkletNode(e,Sf,{numberOfInputs:w?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:k}),m.node.port.onmessage=function(A){var M=A.data;M&&M.t==="lv"&&m.mUsers>0&&(m.lv=M.d,m.lvAt=il())},h.connect(m.node),w&&w.connect(m.node,0,1),m.node.connect(g);var $=e.currentTime;$<=0||d===0?(f.gain.value=0,g.gain.value=1):(f.gain.setValueAtTime(1,$),f.gain.linearRampToValueAtTime(0,$+d),g.gain.setValueAtTime(0,$),g.gain.linearRampToValueAtTime(1,$+d)),m.status="ready"}},function(k){m.status="unavailable",o=[],m.error=k});m.meterOpen=function(){return m.disposed||m.status==="unavailable"?!1:(m.mUsers++===0&&m.post({t:"meter",on:!0}),!0)},m.meterClose=function(){m.mUsers!==0&&--m.mUsers===0&&(m.lv=null,m.disposed||m.post({t:"meter",on:!1}))},m.levels=function(){return m.lv&&il()-m.lvAt<Tf?m.lv:null};var S={};return m.meter=function(k,$){if(S[k])return S[k];var A=0,M={in:0,out:0},R={open:function(){return m.meterOpen()?(A++,!0):!1},close:function(){A!==0&&(A--,m.meterClose())},read:function(){var K=A>0?m.levels():null;return M.in=0,M.out=0,K&&$(K,M),M}};return S[k]=R,R},m.core={input:h,output:p,modInput:w,ready:x,get status(){return m.status},get error(){return m.error},latencySamples:i==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:i,setTempo:function(k,$){var A=ln(k,NaN);!(A>0)||m.disposed||m.tooFar($)||(m.bpm=Math.min(400,Math.max(20,A)),m.post({t:"tempo",bpm:m.bpm,when:m.whenOf($)}),m.emit({effect:null,key:"tempo",value:m.bpm}))},getTempo:function(){return m.bpm},clear:function(k){var $=k&&typeof k=="object"?k:{at:k};if(!(m.disposed||m.tooFar($.at))){var A=ln($.fadeMs,0);m.post({t:"clear",when:m.whenOf($.at),fadeMs:A>0?Math.min(1e3,A):0})}},onChange:function(k){return m.listeners.push(k),function(){var $=m.listeners.indexOf(k);$>=0&&m.listeners.splice($,1)}},dispose:function(){if(!m.disposed){if(m.disposed=!0,m.status="disposed",o=[],m.listeners.length=0,m.node){m.node.port.postMessage({t:"dispose"}),m.node.port.close();try{m.node.disconnect()}catch{}}[h,f,g,p,w].forEach(function(k){try{k&&k.disconnect()}catch{}})}}},m}var Tf=250;function il(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function bd(e,t){t.in=e[0],t.out=e[1]}function Cf(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function Nf(e,t){var n=t||{};if(n.slots)return Ff(e,n);var a=Bo(n.state),s=Array.from(io(a)),o=gd(e,n,function(){return{program:s}},function(){return[{t:"load",program:Array.from(io(a)),when:0}]}),i=o.core;function l(c){return a.chain[Ns.indexOf(c)]}return i.setParam=function(c,d,u,h){var p=ss(c);if(!(!p||o.disposed||o.tooFar(h))){var f=l(p),g;if(d==="bypass")g=!!u;else{var w=fd(p,d);if(!w)return;g=Tt(w,u,kn(w,f.dials))}return d==="bypass"?f.bypass=g:f.dials[d]=g,o.post({t:"p",i:Ro[p][d],v:Io(p,d,g),when:o.whenOf(h)}),o.emit({effect:p,key:d,value:g}),Fs(p).dials.forEach(function(m){if(!(!m.stepWhen||!m.stepWhen.some(function(y){return y.key===d}))){var b=f.dials[m.key],v=Tt(m,b,kn(m,f.dials));v!==b&&(f.dials[m.key]=v,o.post({t:"p",i:Ro[p][m.key],v:Io(p,m.key,v),when:o.whenOf(h)}),o.emit({effect:p,key:m.key,value:v}))}}),g}},i.meter=function(){return o.meter("",bd)},i.getParam=function(c,d){var u=ss(c);if(u){var h=l(u);return d==="bypass"?h.bypass:h.dials[d]}},i.getState=function(){return df(a)},i.setState=function(c,d){o.disposed||o.tooFar(d&&d.at)||(a=Bo(c),o.post({t:"load",program:Array.from(io(a)),when:o.whenOf(d&&d.at)}),o.emit({effect:null,key:null,value:null}))},i}function Ff(e,t){var n=t.slots===!0?os:Math.max(1,Math.min(Mf,Math.floor(+t.slots)||os)),a=Wa(t.state,n),s=1,o={};function i(m){return o[m.id]||(o[m.id]=s++),o[m.id]}function l(m){return m.map(function(b){return{uid:i(b),type:b.type,program:rn(b)}})}var c=l(a.chain),d=a.chain.map(function(m){return o[m.id]}),u=gd(e,t,function(){return{slots:n,chain:c,order:d}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(m){return o[m.id]}),when:0}]}),h=u.core;function p(m){var b;for(b=0;b<a.chain.length;b++)if(a.chain[b].id===m)return a.chain[b];var v=_i(m);if(v){for(b=0;b<a.chain.length;b++)if(a.chain[b].type===v)return a.chain[b]}return null}function f(m,b){var v=i(m);u.post({t:"add",uid:v,type:m.type,when:b}),rn(m).forEach(function(y){u.post({t:"ps",uid:v,k:y[0],v:y[1],when:b,snap:!0})})}function g(m){u.post({t:"order",uids:a.chain.map(function(b){return o[b.id]}),when:m})}function w(m,b){var v={};a.chain.forEach(function(S){v[S.id]=S});var y=a.chain.map(function(S){return o[S.id]}).join();m.chain.forEach(function(S){var k=v[S.id];if(!k||k.type!==S.type){delete o[S.id],f(S,b);return}var $={};rn(k).forEach(function(A){$[A[0]]=A[1]}),rn(S).forEach(function(A){$[A[0]]!==A[1]&&u.post({t:"ps",uid:o[S.id],k:A[0],v:A[1],when:b})})});var x={};m.chain.forEach(function(S){x[S.id]=!0}),Object.keys(o).forEach(function(S){x[S]||delete o[S]}),a=m,a.chain.map(function(S){return o[S.id]}).join()!==y&&g(b)}return h.slots=n,h.meter=function(m){return m==null||m===""?u.meter("",bd):u.meter("#"+m,function(b,v){var y=p(m),x=y?o[y.id]:0,S=b[2];if(x){for(var k=3,$=0;$<S;$++,k+=3)if(b[k]===x){v.in=b[k+1],v.out=b[k+2];return}}})},h.setParam=function(m,b,v,y){var x=p(m);if(!(!x||u.disposed||u.tooFar(y))){var S=ht(x.type),k,$=null;if(b==="bypass")k=!!v;else{for(var A=0;A<S.dials.length;A++)S.dials[A].key===b&&($=S.dials[A]);if(!$)return;k=Tt($,v,kn($,x.dials))}var M={},R={};rn(x).forEach(function(H){M[H[0]]=H[1]}),S.dials.forEach(function(H){H.stepWhen&&(R[H.key]=x.dials[H.key])}),b==="bypass"?x.bypass=k:x.dials[b]=k,S.dials.forEach(function(H){H.stepWhen&&(x.dials[H.key]=Tt(H,x.dials[H.key],kn(H,x.dials)))});var K=u.whenOf(y),de=o[x.id];return rn(x).forEach(function(H){(M[H[0]]!==H[1]||$&&H[0]===$.k)&&u.post({t:"ps",uid:de,k:H[0],v:H[1],when:K})}),u.emit({effect:x.id,key:b,value:k}),Object.keys(R).forEach(function(H){H!==b&&x.dials[H]!==R[H]&&u.emit({effect:x.id,key:H,value:x.dials[H]})}),k}},h.getParam=function(m,b){var v=p(m);if(v)return b==="bypass"?v.bypass:v.dials[b]},h.getState=function(){return JSON.parse(JSON.stringify(a))},h.setState=function(m,b){u.disposed||u.tooFar(b&&b.at)||(w(Wa(m,n),u.whenOf(b&&b.at)),u.emit({effect:null,key:null,value:null}))},h.addEffect=function(m,b){var v=b||{},y=md(m,a.chain);if(!(!y||a.chain.length>=n||u.disposed||u.tooFar(v.at))){if(v.dials){var x=Wa({v:2,chain:[{id:y.id,type:y.type,dials:v.dials}]},1).chain[0];y.dials=x.dials}v.bypass===!0&&(y.bypass=!0);var S=a.chain.slice(),k=typeof v.index=="number"?Math.max(0,Math.min(S.length,v.index)):S.length;return S.splice(k,0,y),w({v:2,chain:S},u.whenOf(v.at)),u.emit({effect:y.id,key:"chain",value:"add"}),y.id}},h.removeEffect=function(m,b){var v=p(m),y=b&&b.at;return!v||u.disposed||u.tooFar(y)?!1:(w({v:2,chain:a.chain.filter(function(x){return x!==v})},u.whenOf(y)),u.emit({effect:v.id,key:"chain",value:"remove"}),!0)},h.moveEffect=function(m,b,v){var y=p(m),x=v&&v.at;if(!y||u.disposed||u.tooFar(x))return!1;var S=bf(a.chain,a.chain.indexOf(y),b);return S===a.chain?!1:(w({v:2,chain:S},u.whenOf(x)),u.emit({effect:y.id,key:"chain",value:"move"}),!0)},h.getChain=function(){return a.chain.map(function(m){return{id:m.id,type:m.type,name:gf(m),bypass:m.bypass}})},h.toAstrid=function(){return $f(a)},h}function rl(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function Pf(e,t,n){var a=n||{},s=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,o=typeof a.toAudioTime=="function"?a.toAudioTime:s?function(p){return s.toContextTime(p)}:t&&t.timebase==="shared"?null:function(p){return p},i=typeof a.now=="function"?a.now:s&&typeof s.sharedNow=="function"?function(){return s.sharedNow()}:null,l=t&&t.transport?t.transport:t,c=l&&l.tempo?l.tempo:l,d=!1;function u(p){if(!o){!d&&typeof console<"u"&&(d=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof p!="number")){var f=o(l.timeAt(p));return typeof f=="number"&&isFinite(f)?f:void 0}}function h(){var p=i&&l&&typeof l.beatAt=="function"?l.beatAt(i()):NaN;if(!isFinite(p)){var f=l&&typeof l.bpm=="number"?l.bpm:rl(c,0);f>0&&e.setTempo(f);return}var g=rl(c,p);g>0&&e.setTempo(g);for(var w=c&&(c.points||c.tempoPoints)||[],m=0;m<w.length;m++){var b=w[m];if(b.beat>p&&b.bpm>0){var v=u(b.beat);v!==void 0&&e.setTempo(b.bpm,v)}}}return h(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(p){p&&(p.kind==="tempo"&&p.bpm>0?e.setTempo(p.bpm,u(p.atBeat)):(p.kind==="snapshot"||p.kind==="start")&&h())})}const zf="/nyx/assets/worklet-CAv1bvAp.js";var Of="nc-ui",Df={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Hi={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},is={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Bf={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Et={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Rf={light:{color:Df.color,semantic:Hi,component:is,runtime:Bf},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},Xn=e=>`--${Of}-${e}`,qo=Hi["label-on-fill-dark"],ll=Hi["label-on-fill-light"],If=Et["label-min-contrast"],qf=/^#[0-9a-f]{6}$/i,_f=e=>typeof e=="string"&&qf.test(e),Ua=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function cl(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),s=o=>{let i=(o+e/30)%12;return n-a*Math.max(-1,Math.min(i-3,9-i,1))};return`#${Ua(s(0)*255)}${Ua(s(8)*255)}${Ua(s(4)*255)}`}function yd(e){let[t,n,a]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),s=Math.max(t,n,a),o=Math.min(t,n,a),i=(s+o)/2,l=s-o;if(!l)return{h:0,s:0,l:i};let c=l/(1-Math.abs(2*i-1));return{h:((s===t?60*((n-a)/l%6):s===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:c,l:i}}function dl(e){let[t,n,a]=[1,3,5].map(s=>{let o=parseInt(e.slice(s,s+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function _o(e,t){let[n,a]=[dl(e),dl(t)].sort((s,o)=>o-s);return(n+.05)/(a+.05)}var rs=e=>_o(e,qo)>=_o(e,ll)?qo:ll;function vd(e,t,n,a=If){let s=cl(e,t,n),o=rs(s)===qo?1:-1;for(let i=0;i<40&&_o(s,rs(s))<a;i++)n+=o*.01,s=cl(e,t,n);return s}function Hf(e){let{h:t,s:n}=yd(e),a=vd(t,Math.min(n,Et["surprise-on-max-saturation"]),Et["surprise-on-lightness"]);return{fill:e,ink:rs(e),on:a,onInk:rs(a)}}var jf=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function Wf(e,t=Math.random){let[n,a]=Et["surprise-saturation"],[s,o]=Et["surprise-lightness"],i=Et["surprise-min-hue-gap"],l=_f(e)?yd(e).h:null,c=t()*360;return l!==null&&jf(c,l)<i&&(c=(l+i+t()*(360-2*i))%360),vd(c,n+t()*(a-n),s+t()*(o-s))}function Uf(e){if(!e)return null;let t=Hf(e);return{[Xn("surprise-fill")]:t.fill,[Xn("surprise-ink")]:t.ink,[Xn("surprise-on")]:t.on,[Xn("surprise-on-ink")]:t.onInk}}var Yf=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Kf=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function ul(e){let[t,n,a]=[1,3,5].map(l=>Yf(parseInt(e.slice(l,l+2),16)/255)),s=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),o=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),i=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*s+.793617785*o-.0040720468*i,1.9779984951*s-2.428592205*o+.4505937099*i,.0259040371*s+.7827717662*o-.808675766*i]}function Xf([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,s=(e-.1055613458*t-.0638541728*n)**3,o=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*s+.2309699292*o,-1.2684380046*a+2.6097574011*s-.3413193965*o,-.0041960863*a-.7034186147*s+1.707614701*o].map(i=>Ua(Kf(Math.max(0,Math.min(1,i)))*255)).join("")}`.toUpperCase()}var Gf=Et["velocity-range"],wd={min:is.rhythm["velocity-min"],max:is.rhythm["velocity-max"]},pl=Object.fromEntries(Object.entries(Rf).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Vf(e,t=wd){let[n,a]=Gf,s=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,o=(s-n)/(a-n),i=t.ink??is.rhythm["step-cell-ink"];if(o<=0)return{velocity:s,t:0,fill:t.min.toUpperCase(),ink:i};if(o>=1)return{velocity:s,t:1,fill:t.max.toUpperCase(),ink:i};let l=ul(t.min),c=ul(t.max);return{velocity:s,t:o,fill:Xf(l.map((d,u)=>d+(c[u]-d)*o)),ink:i}}function hl(e,t=wd){return{[Xn("velocity-fill")]:Vf(e,t).fill}}var xd="data-nc-theme",fl="nc-ui-theme-change",Qf="(prefers-color-scheme: dark)",kd=e=>e?.documentElement??null,$d=e=>e?.defaultView?.matchMedia?.(Qf)??null,Jf=e=>e==="light"||e==="dark"?e:"system";function Zf(e=globalThis.document){return Jf(kd(e)?.getAttribute(xd))}function Ho(e=globalThis.document){let t=Zf(e);return t!=="system"?t:$d(e)?.matches?"dark":"light"}function Sd(e,t=globalThis.document){let n=kd(t);if(!n)return()=>{};let a=Ho(t),s=()=>{let c=Ho(t);c!==a&&(a=c,e(c))},o=t.defaultView?.MutationObserver,i=o?new o(s):null;i?.observe(n,{attributes:!0,attributeFilter:[xd]});let l=$d(t);return l?.addEventListener?.("change",s),t.addEventListener(fl,s),()=>{i?.disconnect(),l?.removeEventListener?.("change",s),t.removeEventListener(fl,s)}}var em={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},tm={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},nm={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},am={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Ps={};for(let[e,t]of Object.entries(tm))Ps[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(am))Ps[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(nm))Ps[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(em.renames.map(e=>[e.old,e.new]));function Ed(e){let t=Ps[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function ee(e){return Ed(e).prop}function r(e){return`var(${ee(e)})`}function sm(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(ee(t)));return Number.isFinite(n)?n:0}function ce(e,t){let n=Ed(t),a=e.ownerDocument??document,s=a.createElement("span");s.dataset.ncLive=t,s.style.position="absolute",s.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?s.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?s.style.paddingLeft=o:s.style.color=o,(e instanceof Element?e:a.documentElement).append(s);let i=(a.defaultView??window).getComputedStyle(s),l=n.kind==="family"?i.fontFamily:n.kind==="color"?i.color:i.paddingLeft;return s.remove(),l}function Ad(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function om(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=r("font-ui"),n.style.fontSize=r("label-size"),n.style.fontWeight=r("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var im="[data-modulated], [data-modulated] *";function ro(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function ml(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${r("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${r("hairline")} solid ${r("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function rm(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${r(`module-bg-stack-${a}`)};
      ${ee("text-sub")}: ${r(`module-sub-stack-${a}`)};
      ${ee("divider")}: ${r(`module-div-stack-${a}`)};
      ${ee("slider-track")}: ${r(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${r(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${r(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${r("module-bg-stack-1")};
      ${ee("text-sub")}: ${r("module-sub-stack-1")};
      ${ee("divider")}: ${r("module-div-stack-1")};
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
${im} { transition: none; }
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
/* A step's mark (StepCell.mark, data-nc-mark): a short tag in the lower right corner, e.g. NYX's bar number on a step
   that plays in one bar only. In the step's own ink: text-sub on an empty step, the accent mark's paper on a filled
   one (tested on every fill of the velocity ramp); above the accent bar when the step is accented. */
:is(.nc-step, .nc-pad)[data-nc-mark]::after {
  content: attr(data-nc-mark);
  position: absolute;
  right: ${r("rhythm.step-mark-inset")};
  bottom: ${r("rhythm.step-mark-inset")};
  font-family: ${r("font-readout")};
  font-size: ${r("rhythm.step-mark-size")};
  font-weight: ${r("control-weight")};
  line-height: 1;
  color: ${r("text-sub")};
  pointer-events: none;
}
:is(.nc-step, .nc-pad)[aria-pressed="true"][data-nc-mark]::after { color: ${r("rhythm.accent-mark")}; }
:is(.nc-step, .nc-pad)[aria-pressed="true"][data-accent="true"][data-nc-mark]::after {
  bottom: calc(${r("rhythm.step-mark-inset")} + ${r("rhythm.accent-mark-size")});
}
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
/* A filter curve above the row it draws (Peter, 2026-11-07: "In Sampler, the filter slider belongs UNDER the
   graphic"): its 20 Hz and 20 kHz sit on the canvas's bottom edge, so the next row keeps a gap's distance. */
.nc-ui-fx > .nc-field:has(> .nc-canvas[data-nc-paint="filter"]) + .nc-field { margin-top: ${r("module-gap")}; }
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
/* Level steps (level-steps.js, Gate's strip): a display like the EQ graph's, a column per step (beats a gap apart,
   swing widening the first of each pair), the level a soft bar, the shape's curve in the accent over it, the playing
   step ringed (the accent while locked to Play, quieter while it runs free). Under it the step numbers and the shape
   tabs. A long press opens the shape picker over the step. */
.nc-lsteps { position: relative; min-width: 0; margin-bottom: ${r("control-gap")}; }
.nc-lsteps-plot {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: ${r("slot-gap")};
  height: ${r("level-steps-height")};
  padding: calc(${r("slot-gap")} * 2);
  background: ${r("eq-graph-bg")};
  border-radius: ${r("slot-radius")};
  box-shadow: inset 0 0 0 ${r("hairline")} ${r("divider")};
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  cursor: ns-resize;
}
.nc-lsteps-plot:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: ${r("hairline")}; }
.nc-ui-fx[data-nc-max] .nc-lsteps-plot { height: ${r("level-steps-height-max")}; }
.nc-lsteps-step { position: relative; flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; border-radius: ${r("slot-radius")}; }
.nc-lsteps-step[data-beat="true"], .nc-lsteps-axis > span[data-beat="true"] { margin-inline-start: calc(${r("beat-gap")} - ${r("slot-gap")}); }
.nc-lsteps-step > svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; overflow: visible; pointer-events: none; }
.nc-lsteps-level { fill: ${r("level-steps-bar")}; }
.nc-lsteps-env { fill: ${r("level-steps-curve")}; }
.nc-lsteps-top { fill: none; stroke: ${r("level-steps-curve")}; stroke-width: ${r("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-floor { stroke: ${r("divider")}; stroke-width: ${r("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-step[data-zero="true"] .nc-lsteps-floor { stroke: ${r("text-sub")}; stroke-dasharray: 2 2; }
/* 1/8T with 16 steps: 13-16 don't play. Dashed and empty, as a step grid's out-of-range steps. */
.nc-lsteps-step[data-out="true"] { box-shadow: inset 0 0 0 ${r("hairline")} ${r("divider")}; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-level, .nc-lsteps-step[data-out="true"] .nc-lsteps-env { fill: transparent; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-top { stroke: ${r("divider")}; }
.nc-lsteps-step[data-playhead="true"] { z-index: 1; outline: ${r("playhead-width")} solid ${r("playhead")}; outline-offset: ${r("playhead-offset")}; }
.nc-lsteps-step[data-playhead="true"][data-locked="false"] { outline-color: ${r("level-steps-free")}; outline-width: ${r("hairline")}; }
.nc-lsteps-step[data-focus="true"] { box-shadow: inset 0 calc(${r("playhead-width")} * -1) 0 0 ${r("focus-ring")}; }
.nc-lsteps-plot:not(:focus-visible) .nc-lsteps-step[data-focus="true"] { box-shadow: none; }
.nc-lsteps[data-on="false"] .nc-lsteps-env, .nc-lsteps[data-on="false"] .nc-lsteps-level { fill: ${r("divider")}; }
.nc-lsteps[data-on="false"] .nc-lsteps-top { stroke: ${r("text-sub")}; }
.nc-lsteps-step[data-dragging="true"]::after {
  content: attr(data-level);
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, calc(calc(${r("slot-gap")} * 2) * -1));
  padding: calc(${r("slot-gap")} / 2) calc(${r("slot-gap")} * 2);
  border-radius: ${r("slot-radius")};
  background: ${r("accent")};
  color: ${r("on-accent")};
  font-family: ${r("font-readout")};
  font-size: ${r("readout-size-small")};
  white-space: nowrap;
  pointer-events: none;
}
.nc-lsteps-axis {
  display: flex;
  gap: ${r("slot-gap")};
  padding: ${r("slot-gap")} calc(${r("slot-gap")} * 2) 0;
  font-family: ${r("font-readout")};
  font-size: ${r("slot-font-size")};
  line-height: 1;
  color: ${r("text-sub")};
}
.nc-lsteps-axis > span { flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; }
.nc-lsteps-shapes { display: flex; border-bottom: ${r("hairline")} solid ${r("divider")}; margin-top: ${r("control-gap")}; min-width: 0; }
.nc-lsteps-shapes[hidden] { display: none; }
.nc-lsteps-shape, .nc-lsteps-pick > button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${r("slot-gap")};
  border: 0;
  background: transparent;
  color: ${r("text-sub")};
  font-family: ${r("font-ui")};
  font-size: ${r("label-size")};
  cursor: pointer;
  white-space: nowrap;
}
.nc-lsteps-shape { position: relative; flex: 1 1 0; min-width: 0; padding: ${r("slot-gap")} 0 ${r("control-gap")}; }
.nc-lsteps-shape:hover, .nc-lsteps-pick > button:hover { color: ${r("text")}; }
.nc-lsteps-shape[aria-selected="true"] { color: ${r("text")}; }
.nc-lsteps-shape[aria-selected="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${r("hairline")} * -1);
  height: ${r("tab-mark")};
  background: ${r("accent")};
}
.nc-lsteps-shape:focus-visible, .nc-lsteps-pick > button:focus-visible { outline: ${r("focus-width")} solid ${r("focus-ring")}; outline-offset: calc(${r("focus-width")} * -1); }
.nc-lsteps-ico { width: calc(${r("label-size")} * 1.8); height: calc(${r("label-size")} * 0.9); overflow: visible; }
.nc-lsteps-ico path { fill: none; stroke: currentColor; stroke-width: ${r("curve-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-pick {
  position: absolute;
  z-index: 3;
  top: 0;
  left: var(--nc-lsteps-pick-x, 0);
  display: flex;
  align-items: stretch;
  gap: ${r("slot-gap")};
  padding: calc(${r("slot-gap")} * 2);
  background: ${r("surface-page")};
  border-radius: ${r("slot-radius")};
  box-shadow: 0 0 0 ${r("hairline")} ${r("divider")};
}
.nc-lsteps-pick[hidden] { display: none; }
.nc-lsteps-pick-head { align-self: center; padding: 0 calc(${r("slot-gap")} * 2); font-family: ${r("font-readout")}; font-size: ${r("readout-size-small")}; color: ${r("text-sub")}; white-space: nowrap; }
.nc-lsteps-pick > button { padding: calc(${r("slot-gap")} * 2); border-radius: ${r("slot-radius")}; }
.nc-lsteps-pick > button[aria-checked="true"] { color: ${r("on-accent")}; background: ${r("accent")}; }
@media (pointer: coarse) {
  .nc-lsteps-shape, .nc-lsteps-pick > button { min-height: ${r("target-min")}; justify-content: center; }
  .nc-lsteps-pick > button { min-width: ${r("target-min")}; }
}
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
/* A captioned row (Gate's Rate in a narrow FX card): the label, then the tabs packed close so short ones never cut. */
.nc-choice-caption { flex: 0 0 auto; margin-inline-end: auto; }
.nc-choice-row[data-nc-caption] { gap: ${r("control-gap")}; margin-bottom: ${r("control-gap")}; }
.nc-choice-row[data-nc-caption] > .nc-choice { flex: 0 0 auto; overflow: visible; }
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
  ${ee("text-sub")}: ${r("module-sub-stack-1")};
  ${ee("divider")}: ${r("module-div-stack-1")};
  ${ee("slider-track")}: ${r("module-div-stack-1")};
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
  ${ee("text-sub")}: ${r("module-sub-stack-1")};
  ${ee("divider")}: ${r("module-div-stack-1")};
  ${ee("slider-track")}: ${r("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${r("control-gap")} ${r("module-pad")};
  padding-bottom: ${r("module-pad")};
  background: ${r("module-bg-stack-1")};
  ${ee("text-sub")}: ${r("module-sub-stack-1")};
  ${ee("divider")}: ${r("module-div-stack-1")};
  ${ee("slider-track")}: ${r("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${r("stack-card-pad-y")} ${r("module-pad")} ${r("module-pad")};
  ${ee("text-sub")}: inherit;
  ${ee("divider")}: inherit;
  ${ee("slider-track")}: inherit;
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
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${ee("divider")}: color-mix(in oklab, ${r("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${ee("meter-track")}: color-mix(in oklab, ${r("text-sub")} 30%, var(--nc-strip-shade)); }
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
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${ee("divider")}: ${r("strip-divider")}; }
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
${ml("")}
}
@media (max-width: 1023px) {
${ml("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${ro("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${ro("")}
}
@media (max-width: 1023px) {
${ro("html[data-nc-landscape] ")}
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
`}var lo=null,lm="nc-ui-fallback";function Md(e=globalThis.document){if(!e?.documentElement||(e.documentElement,lo&&lo.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${lm} {
${rm()}
}
`,e.head.append(t),lo=t}var Hn=null,cm=0,dm=new URL("/nyx/assets/confirm-DwyQU4Nn.css",import.meta.url).href,Ld=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=dm,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Ld(document);function Td(e){return um(e).then(t=>!!t.ok)}function um({title:e,body:t,lines:n=[],extra:a,confirmLabel:s="Confirm",cancelLabel:o="Cancel",danger:i=!1,root:l,returnFocus:c,signal:d},u){if(Hn||d?.aborted)return Promise.resolve({});let h=l?.ownerDocument??document,p=Ld(h),f=l??h.body,g=h.defaultView??globalThis,w=`nc-ui-confirm-${++cm}`,m=(j,ke,be)=>{let mt=h.createElement(j);return mt.className=`nc-ui-confirm${ke}`,be!=null&&(mt.textContent=be),mt},b=m("div","-layer");b.dataset.state="enter";let v=m("div","");v.setAttribute("role","alertdialog"),v.setAttribute("aria-modal","true"),v.setAttribute("aria-labelledby",`${w}-t`);let y=m("h2","-title",e);y.id=`${w}-t`;let x=m("p","-body",t);x.id=`${w}-b`;let S=n.map((j,ke)=>{let be=m("p","-body",j?.text??j);return be.id=`${w}-b${ke}`,j?.tone==="danger"&&(be.dataset.tone="danger"),be});v.setAttribute("aria-describedby",[x,...S].map(j=>j.id).join(" "));let k=a&&m("button","-extra",a.label);k&&(k.type="button",k.dataset.ncConfirm="extra",k.addEventListener("click",()=>a.onAction?.()));let $=m("div","-actions"),A=(j,ke)=>{let be=m("button","-btn",j);return be.type="button",be.dataset.ncConfirm=ke,be.addEventListener("click",()=>nn(ke==="ok")),be},M=A(o,"cancel"),R=A(s,"ok");i&&(R.dataset.danger="true"),$.append(M,R);let[K,de]=[];v.append(y,x,...S,...K?[K]:[],...k?[k]:[],$);let H=[de,k,M,R].filter(Boolean);b.append(v);let qe={layer:b};Hn=qe;let B=c??h.activeElement,G=[];for(let j of f.children)j.hasAttribute("inert")||(j.setAttribute("inert",""),G.push(j));let Z=()=>{if(Hn!==qe)return;f.append(b),(de??M).focus({preventScroll:!0});let j=g.requestAnimationFrame?.bind(g)??(ke=>setTimeout(ke,16));j(()=>j(()=>{b.dataset.state==="enter"&&(b.dataset.state="open")}))};p?p.then(Z):Z();let W=!1;b.addEventListener("pointerdown",j=>{W=j.target===b}),b.addEventListener("click",j=>{j.target===b&&W&&nn(!1),W=!1});let Q=j=>{if(j.stopImmediatePropagation(),j.key==="Escape")j.preventDefault(),nn(!1);else if(j.key==="Tab"){j.preventDefault();let ke=H.filter(mt=>!mt.disabled),be=ke.length;ke[(ke.indexOf(h.activeElement)+(j.shiftKey?be-1:1))%be].focus()}else j.key==="Enter"&&(j.preventDefault(),h.activeElement===k?k.click():h.activeElement===M?nn(!1):R.disabled||nn(!0))},Se=j=>j.stopImmediatePropagation();g.addEventListener("keydown",Q,!0),g.addEventListener("keyup",Se,!0);let Bn=()=>nn(!1);d?.addEventListener("abort",Bn);let Rn,Lh=new Promise(j=>{Rn=j});function nn(j){if(Hn!==qe)return;Hn=null,g.removeEventListener("keydown",Q,!0),g.removeEventListener("keyup",Se,!0),d?.removeEventListener("abort",Bn);for(let an of G)an.removeAttribute("inert");b.dataset.state="closing",B?.isConnected&&typeof B.focus=="function"&&B.focus({preventScroll:!0});let ke=g.getComputedStyle?.(b),be=Math.max(0,...String(ke?.transitionDuration??"").split(",").map(an=>Number.parseFloat(an)*(an.trim().endsWith("ms")?1:1e3)||0)),mt=()=>b.remove();b.addEventListener("transitionend",an=>an.target===b&&mt()),setTimeout(mt,be+50),Rn({ok:j,value:de?.value.trim()})}return Lh}function Cd(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let s=t.createElement("span");s.dataset.ncOn="",s.textContent=e.onText??"On";let o=t.createElement("span");o.dataset.ncOff="",o.textContent=e.offText??"Off",a.append(s,o),n.append(a);let i=!1,l=d=>{i=d===!0,n.setAttribute("aria-checked",i?"true":"false")};l(e.checked);let c=()=>{l(!i),e.onChange?.(i)};return n.addEventListener("click",c),{el:n,get checked(){return i},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var Nd=new WeakMap,gl=.25;function pm(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let s=t.createElement("span");s.className="nc-fader-cap",s.setAttribute("aria-hidden","true"),n.append(a,s);let o=0,i=e.step??.005,l=e.onChange,c=e.onReset,d=m=>Math.min(1,Math.max(0,m)),u=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},h=m=>{let b=d(m);b!==o&&(o=b,u(),l?.(b))},p=0,f=!1;n.addEventListener("pointerdown",m=>{if(m.button!==0)return;m.preventDefault(),n.focus?.({preventScroll:!0});let b=n.getBoundingClientRect();m.target!==s&&b.height>0&&h(1-(m.clientY-b.top)/b.height),p=m.clientY,f=!0,n.dataset.dragging="true",n.setPointerCapture?.(m.pointerId)}),n.addEventListener("pointermove",m=>{if(!f)return;let b=n.getBoundingClientRect().height||1,v=(p-m.clientY)/b*(m.shiftKey?gl:1);p=m.clientY,h(o+v)});let g=()=>{f=!1,delete n.dataset.dragging};n.addEventListener("pointerup",g),n.addEventListener("pointercancel",g),n.addEventListener("lostpointercapture",g),n.addEventListener("dblclick",m=>{m.preventDefault(),c?.()}),n.addEventListener("keydown",m=>{let b=m.shiftKey?i*gl:i,v={ArrowUp:o+b,ArrowRight:o+b,ArrowDown:o-b,ArrowLeft:o-b,PageUp:o+i*10,PageDown:o-i*10,Home:0,End:1};m.key in v&&(m.preventDefault(),h(v[m.key]))});let w={el:n,get value(){return o},get dragging(){return f},set(m){f||(o=d(Number(m)||0),u())},setText(m){m?n.setAttribute("aria-valuetext",m):n.removeAttribute("aria-valuetext")},setLabel(m){n.setAttribute("aria-label",m)},configure(m){typeof m.step=="number"&&m.step>0&&(i=m.step),m.onChange&&(l=m.onChange),m.onReset&&(c=m.onReset)}};return w.setLabel(e.label),w.set(e.value??0),w.setText(e.valueText),Nd.set(n,w),w}function hm(e){return Nd.get(e)}var Fd=new WeakMap,fm=.2,mm=1.5,gm=.5;function bm(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function bl(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:bm(a.getComputedStyle(e).getPropertyValue(ee(t)),n)}function ym(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let s=t.createElement("button");s.type="button",s.className="nc-meter-clip",s.dataset.lit="false";let o=t.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let i=[];for(let w=0;w<n;w++){let m=t.createElement("span");m.className="nc-meter-bar";let b=t.createElement("span");b.className="nc-meter-peak";let v=t.createElement("span");v.className="nc-meter-rms";let y=t.createElement("span");y.className="nc-meter-hold",m.append(b,v,y),o.append(m),i.push({peak:b,rms:v,hold:y,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(s,o);let l=e.label,c=e.onClear,d=!1,u=-1,h=-1,p=()=>{s.dataset.lit=d?"true":"false",s.setAttribute("aria-pressed",d?"true":"false"),s.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),s.title=d?"Clipped. Click to clear":"Clip light"},f=(w,m,b,v)=>{let y=Math.round(v*1e3)/1e3;b[m]!==y&&(b[m]=y,w.style.transform=m==="hold"?`translateY(${Math.round((1-y)*1e3)/10}%)`:`scaleY(${y})`)};s.addEventListener("click",()=>{g.clear(),c?.()});let g={el:a,get clipped(){return d},update(w,m){u<0&&(u=bl(a,"motion-meter-fall",fm)),h<0&&(h=bl(a,"motion-meter-hold",mm));let b=Math.max(0,Math.min(.25,Number(m)||0)),v=u>0?Math.exp(-b/u):0;i.forEach((y,x)=>{let S=w[x]??w[0]??{peak:0,rms:0},k=Math.min(1,Math.max(0,Number(S.peak)||0)),$=Math.min(k,Math.max(0,Number(S.rms)||0));S.over&&g.clip(),y.level.peak=k>=y.level.peak?k:k+(y.level.peak-k)*v,y.level.rms=$>=y.level.rms?$:$+(y.level.rms-$)*v,y.holdAge+=b,k>=y.holdAt?(y.holdAt=k,y.holdAge=0):y.holdAge>h&&(y.holdAt=Math.max(k,y.holdAt-gm*b)),f(y.peak,"peak",y.shown,y.level.peak),f(y.rms,"rms",y.shown,y.level.rms),f(y.hold,"hold",y.shown,y.holdAt),y.hold.dataset.off=y.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,p())},clear(){d=!1,p()},reset(){for(let w of i)w.level.peak=0,w.level.rms=0,w.holdAt=0,w.holdAge=0,f(w.peak,"peak",w.shown,0),f(w.rms,"rms",w.shown,0),f(w.hold,"hold",w.shown,0),w.hold.dataset.off="true"},setLabel(w){l=w,p()},configure(w){w.onClear&&(c=w.onClear)}};return p(),g.reset(),Fd.set(a,g),g}function vm(e){return e?Fd.get(e):void 0}var wm=3,xm=new Set(["freq","q","rate","time","log"]);function ji(e,t,n){return!e||!xm.has(e)||!(n>t)?"linear":t>0?"log":"power"}function zs(e,t,n){return ji(e,t,n)!=="linear"}function ls(e,t,n,a){let s=Number(a);if(!(n>t)||!Number.isFinite(s))return 0;let o=Math.min(n,Math.max(t,s)),i=ji(e,t,n);if(i==="log")return Math.log(o/t)/Math.log(n/t);let l=(o-t)/(n-t);return i==="power"?Math.cbrt(l):l}function Pd(e,t,n,a){let s=Math.min(1,Math.max(0,Number(a)||0)),o=ji(e,t,n);return o==="log"?t*(n/t)**s:t+(n-t)*(o==="power"?s**wm:s)}function zd(e,t,n,a){let s=Math.min(n,Math.max(t,e));if(a>0){s=t+Math.round((s-t)/a)*a;let o=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));s=Number(s.toFixed(o)),s=Math.min(n,Math.max(t,s))}return s}function Wi(e,t,n,a){return Math.round(ls(e,t,n,a)*1e3)}function jo(e,t,n,a,s){return zd(Pd(e,t,n,Number(a)/1e3),t,n,s)}function km(e,t,n=!1){let a=Number(e)||0,s=n?1:1e3/100,o=null;return t==="ArrowRight"||t==="ArrowUp"?o=a+s:t==="ArrowLeft"||t==="ArrowDown"?o=a-s:t==="PageUp"?o=a+1e3/10:t==="PageDown"?o=a-1e3/10:t==="Home"?o=0:t==="End"&&(o=1e3),o===null?null:Math.min(1e3,Math.max(0,Math.round(o)))}function Od(e,t,n,a,s,o=!1,i){let l=Wi(e,t,n,a),c=km(l,s,o);if(c===null)return null;let d=jo(e,t,n,c,i),u=Math.sign(c-l),h=zd(Number(a),t,n,i);for(;u!==0&&d===h&&c>0&&c<1e3;)c+=u,d=jo(e,t,n,c,i);return d}function $m(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function yl(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function Sm(e,t,n,a=n/6){let s=e.some(u=>u===null),o=Math.max(0,n-(s?a:0)),i=e.reduce((u,h,p)=>h===null?u:u+yl(t[p]),0),l=i>0?o/i:0,c=e.map(u=>u===null?0:Math.min(o,yl(u)*l));if(s){let u=c.reduce((p,f)=>p+f,0),h=e.indexOf(null);c[h]=Math.max(a,n-u)}let d=[0];for(let u of c)d.push(Math.round((d[d.length-1]+u)*100)/100);return s&&(d[d.length-1]=n),d}function Em(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,s=Math.max(1,Math.floor(t*a)),o=Math.max(1,Math.floor(n*a));(e.width!==s||e.height!==o)&&(e.width=s,e.height=o);let i=e.getContext("2d");return i?.setTransform(a,0,0,a,0,0),{ctx:i,w:t,h:n}}function gt(e){return Math.max(0,Math.min(1,e))}function Dd(e,t){let{ctx:n,w:a,h:s}=Em(e);if(!n)return;n.clearRect(0,0,a,s);let o=om(e);if(t.paint==="swatch"){let c=ce(e,"accent"),d=ce(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,a/2,s),n.fillStyle=d,n.fillRect(a/2,0,a/2,s);return}if(t.paint==="filter"&&typeof t.hz=="number"){Lm(n,a,s,t,e,o);return}if(t.paint==="filter"){let c=t.mode??"lp",d=ce(e,Ad(c)),u=ce(e,"divider"),h=gt(t.cutoff??.5),p=.08+(1-gt(t.resonance??.2))*.22;n.strokeStyle=u,n.beginPath(),n.moveTo(0,s*.72),n.lineTo(a,s*.72),n.stroke(),n.beginPath();for(let f=0;f<=a;f++){let g=f/Math.max(1,a),w=0;c==="lp"?w=g<h?1:Math.max(0,1-(g-h)/p):c==="hp"?w=g>h?1:Math.max(0,1-(h-g)/p):w=Math.max(0,1-Math.abs(g-h)/p);let m=s*.78-w*s*.62;f===0?n.moveTo(f,m):n.lineTo(f,m)}n.strokeStyle=d,n.stroke(),n.fillStyle=ce(e,"text-sub"),n.font=o,n.fillText(c.toUpperCase(),0,s),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=ce(e,"accent");let c=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[u,h,p]=Sm([c,d],t.max??[1,4],a),f=2,g=s-1;n.beginPath(),n.moveTo(u,g),n.lineTo(h,f);let w=Math.max(1,Math.ceil(p-h));for(let m=1;m<=w;m++){let b=m/w;n.lineTo(h+(p-h)*b,g-(g-f)*Math.exp(-4.6*b)*(1-b*.01))}n.lineTo(p,g),n.lineTo(a,g),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[d,u]=Array.isArray(t.region)?t.region:[0,1],h=ce(e,"accent"),p=ce(e,"text-sub"),f=s/2;n.fillStyle=ce(e,"accent-soft"),n.fillRect(gt(d)*a,0,(gt(u)-gt(d))*a,s),n.strokeStyle=ce(e,"divider"),n.beginPath(),n.moveTo(0,f),n.lineTo(a,f),n.stroke();let g=Math.floor(c.length/2);for(let w=0;w<g;w++){let m=(w+.5)/g*a,b=Math.max(-1,Math.min(1,c[w*2]??0)),v=Math.max(-1,Math.min(1,c[w*2+1]??0)),y=(w+.5)/g;n.strokeStyle=y>=d&&y<=u?h:p,n.beginPath(),n.moveTo(m,f-v*(f-1)),n.lineTo(m,f-b*(f-1)+.5),n.stroke()}n.strokeStyle=h;for(let w of[d,u,...Array.isArray(t.markers)?t.markers:[]]){let m=Math.round(gt(w)*(a-1))+.5;n.beginPath(),n.moveTo(m,0),n.lineTo(m,s),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=ce(e,"text"),n.fillRect(Math.round(gt(t.position)*(a-1)),0,1,s)),g||(n.fillStyle=p,n.font=o,n.fillText(t.empty??"Empty",0,f+4)),e.dataset.ncAccent=h;return}if(t.paint==="meter"){let c=gt(t.level??0);n.fillStyle=ce(e,"divider"),n.fillRect(0,s*.4,a,s*.2),n.fillStyle=ce(e,"accent"),n.fillRect(0,s*.4,a*c,s*.2),e.dataset.ncAccent=n.fillStyle;return}let i=Math.max(1,t.steps??16),l=((t.step??0)%i+i)%i;n.fillStyle=ce(e,"rhythm.step-cell-off"),n.fillRect(0,s*.45,a,s*.1),n.fillStyle=ce(e,"rhythm.playhead"),n.fillRect(l/i*a,s*.3,Math.max(1,a/i),s*.4),e.dataset.ncAccent=ce(e,"accent")}var ta=20,Wo=2e4,co=24,vl=-60;function Am(e,t,n,a,s=48e3){let o=2*Math.PI*Math.min(t,s*.49)/s,i=Math.cos(o),l=Math.sin(o)/(2*n),c,d,u;e==="hp"?[c,d,u]=[(1+i)/2,-(1+i),(1+i)/2]:e==="bp"?[c,d,u]=[l,0,-l]:[c,d,u]=[(1-i)/2,1-i,(1-i)/2];let h=1+l,p=-2*i,f=1-l,g=2*Math.PI*a/s,w=(y,x,S)=>y+x*Math.cos(g)+S*Math.cos(2*g),m=(y,x)=>-(y*Math.sin(g)+x*Math.sin(2*g)),b=Math.hypot(w(c,d,u),m(d,u)),v=Math.hypot(w(h,p,f),m(p,f));return v>0?b/v:0}function Mm(e,t){return Math.log(Math.max(ta,Math.min(Wo,e))/ta)/Math.log(Wo/ta)*t}function wl(e,t,n){let a=Math.max(vl,Math.min(co,e));return t+(co-a)/(co-vl)*(n-t)}function Lm(e,t,n,a,s,o){let i=a.mode??"lp",l=ce(s,Ad(i)),c=ce(s,"divider"),d=ce(s,"text-sub"),u=Number.parseFloat(String(o).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),h=1,p=Math.max(h+4,n-u-3),f=a.q??Math.SQRT1_2,g=Math.round(wl(0,h,p))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,g),e.lineTo(t,g),e.stroke(),e.beginPath();for(let w=0;w<=t;w++){let m=ta*(Wo/ta)**(w/Math.max(1,t)),b=a.open?1:Am(i,a.hz,f,m,a.sampleRate),v=wl(20*Math.log10(Math.max(1e-5,b)),h,p);w===0?e.moveTo(w,v):e.lineTo(w,v)}if(e.strokeStyle=l,e.stroke(),!a.open){let w=Math.round(Mm(a.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(w,h),e.lineTo(w,p),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=o,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",s.dataset.ncAccent=l,s.dataset.ncFilterHz=String(Math.round(a.hz))}function Ge(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let s=n.defaultView.getComputedStyle(a).color;return a.remove(),s}function Tm(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var Yt=20,ka=2e4,Ui=Math.log(ka/Yt),Uo=32,Cm=250,Nm=-100,Fm=1200,Pm=4.5,xl=-6,Bt=-96,zm=48,kl=[100,1e3,1e4],Om=[6,12];function mn(e,t){return Math.log(Math.max(Yt,Math.min(ka,e))/Yt)/Ui*t}function Ya(e,t){return Yt*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Ui)}function At(e,t,n,a){let s=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*s}function Yo(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var Bd=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Dm(e,t,n,a){let s=n?3:1,o=c=>({db:Math.max(-a,Math.min(a,e.db+c*s))}),i=c=>({hz:Math.max(e.minHz??Yt,Math.min(e.maxHz??ka,e.hz*2**(c*s/6)))}),l=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*s)))});switch(t){case"ArrowUp":return o(1);case"ArrowDown":return o(-1);case"ArrowRight":return e.moveHz?i(1):o(1);case"ArrowLeft":return e.moveHz?i(-1):o(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Yi(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function Bm(e,t,n,a,s,o,i,l,c){let d=c?.25:1,u={},h=Math.max(1,o/2-l);if(u.db=Math.max(-i,Math.min(i,t.db-a*d/h*i/Yi(e))),e.moveHz){let p=t.hz*Math.exp(n*d/Math.max(1,s)*Ui);u.hz=Math.max(e.minHz??Yt,Math.min(e.maxHz??ka,p))}return u}function Rm(e,t,n,a,s){let o=Math.max(0,n.left)+1,i=Math.min(n.right,s)-1,l=Math.min(t.width*3+a*2,i-o),c=Math.max(o,Math.min(e.left,i-l));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var me=new WeakMap;function Im(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let s=document.createElement("canvas");s.className="nc-eq-spectrum",s.setAttribute("aria-hidden","true");let o=document.createElement("canvas");o.className="nc-eq-curve",o.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-eq-tip",i.setAttribute("aria-hidden","true"),i.hidden=!0,a.append(s,o);for(let c of e.bands)a.append(qm(n,c,t));a.append(i),a.addEventListener("click",c=>{if(!jd(n)||c.button>0)return;let d=Hd(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),me.set(n,{control:e,cache:null,spec:null,active:null}),Id(n,e),n}function Rd(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function qm(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let s=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},o=()=>s()?.bands.find(d=>d.id===t.id)??null,i=null;a.addEventListener("pointerdown",d=>{if(d.button!==0)return;let u=o();u&&(d.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(d.pointerId),i={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:u.hz,db:u.db}},a.dataset.drag="true",bt(e,t.id))}),a.addEventListener("pointermove",d=>{if(!i||d.pointerId!==i.id)return;let u=s(),h=o(),p=me.get(e);if(!u||!h||!p?.box)return;let{w:f,h:g,pad:w}=p.box;u.onBand(h.id,Bm(h,i.start,d.clientX-i.x,d.clientY-i.y,f,g,u.range??18,w,d.shiftKey))});let l=d=>{!i||d.pointerId!==i.id||(i=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&bt(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",d=>{d.preventDefault(),s()?.onReset?.(t.id)}),a.addEventListener("keydown",d=>{let u=s(),h=o();if(!u||!h)return;let p=Dm(h,d.key,d.shiftKey,u.range??18);p&&(d.preventDefault(),p==="reset"?u.onReset?.(h.id):u.onBand(h.id,p),bt(e,h.id))});let c=null;return a.addEventListener("wheel",d=>{let u=s(),h=o();if(!u||!h?.moveQ)return;d.preventDefault();let p=d.timeStamp;(!c||p-c.t>400)&&(c={q:h.q,t:p});let f=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(h.minQ??.1,Math.min(h.maxQ??20,c.q*2**(-f/240))),c.t=p,u.onBand(h.id,{q:c.q}),bt(e,h.id)},{passive:!1}),a.addEventListener("pointerenter",()=>bt(e,t.id)),a.addEventListener("focus",()=>bt(e,t.id)),a.addEventListener("pointerleave",()=>{!i&&e.ownerDocument.activeElement!==a&&bt(e,null)}),a.addEventListener("blur",()=>{i||bt(e,null)}),a}function bt(e,t){let n=me.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?$n(e):Ki(e)}function Ki(e){let t=me.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(g=>g.id===t.active):null;for(let g of e.querySelectorAll(".nc-eq-node"))g instanceof HTMLElement&&(a&&g.dataset.band===a.id?g.dataset.active="true":delete g.dataset.active);if(!a||!t.box){n.hidden=!0;return}let s=[a.label,Bd(a.db)];a.kind==="peak"?s.push(Yo(a.hz),`Q ${a.q.toFixed(1)}`):s.push(`${a.kind==="lowshelf"?"below":"above"} ${Yo(a.hz)}`),n.textContent=s.join(" · "),n.dataset.tone=String(_m(t.control,a)),n.hidden=!1;let{w:o,h:i,pad:l}=t.box,c=mn(a.hz,o),d=At(a.db*Yi(a),i,t.control.range??18,l),u=n.offsetWidth,h=n.offsetHeight,p=Math.max(0,Math.min(o-u,c-u/2)),f=d-h-l*1.5>=0?d-h-l*1.5:Math.min(i-h,d+l*1.5);n.style.left=`${Math.round(p)}px`,n.style.top=`${Math.round(f)}px`}function _m(e,t){return e.bands.indexOf(t)%3+1}function Id(e,t){let n=me.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Xi(e);let a=t.range??18;t.bands.forEach((s,o)=>{let i=Rd(e,s.id);i instanceof HTMLElement&&(i.dataset.tone=String(o%3+1),i.dataset.kind=s.kind,i.setAttribute("aria-label",`${s.label} band`),i.setAttribute("aria-valuemin",String(-a)),i.setAttribute("aria-valuemax",String(a)),i.setAttribute("aria-valuenow",String(s.db)),i.setAttribute("aria-valuetext",s.valueText??`${Bd(s.db)}, ${Yo(s.hz)}`),i.setAttribute("aria-keyshortcuts",s.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),s.help?i.setAttribute("data-nc-help",s.help):i.removeAttribute("data-nc-help"))}),$n(e),Km(e)}function qd(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,s=Math.max(1,Math.round(t*a)),o=Math.max(1,Math.round(n*a));(e.width!==s||e.height!==o)&&(e.width=s,e.height=o);let i=e.getContext("2d");return i?.setTransform(a,0,0,a,0,0),{ctx:i,w:t,h:n}}function _d(e){return{curve:Ge(e,"eq-curve"),fill:Ge(e,"eq-fill"),quiet:Ge(e,"text-sub"),grid:Ge(e,"eq-grid"),zero:Ge(e,"divider"),label:Ge(e,"text-sub"),spectrum:Ge(e,"eq-spectrum"),bands:[Ge(e,"eq-band-1"),Ge(e,"eq-band-2"),Ge(e,"eq-band-3")]}}function Hm(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function $n(e){me.has(e)&&Xi(e);let t=me.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:s,w:o,h:i}=qd(n);if(!s)return;let l=Math.max(8,Math.round(i*.06)),c=a.range??18;t.box={w:o,h:i,pad:l},t.colours=_d(e);let d=t.colours,u=Hm(a,o);if(!t.cache||t.cache.key!==u){let x=Math.max(64,Math.ceil(o)+1),S=new Float64Array(x);for(let $=0;$<x;$++)S[$]=Ya($/(x-1)*o,o);let k=null;try{k=typeof a.response=="function"?a.response(S):null}catch{k=null}t.cache={key:u,freqs:S,total:k?.total??new Float64Array(x),bands:k?.bands??[]}}s.clearRect(0,0,o,i);let h=Tm(e),p=a.on!==!1;jm(s,o,i,c,l,d,h);let{freqs:f,total:g,bands:w}=t.cache,m=Array.from(f,x=>mn(x,o)),b=At(0,i,c,l);w.forEach((x,S)=>{if(!x||!x.some(A=>Math.abs(A)>.05))return;let k=p?d.bands[S%3]:d.quiet,$=Array.from(x,A=>At(A,i,c,l));s.save(),t.active&&a.bands[S]?.id===t.active&&(s.globalAlpha=.14,s.fillStyle=k,$l(s,m,$,b)),s.globalAlpha=p?.75:.4,s.strokeStyle=k,s.lineWidth=.75,uo(s,m,$),s.restore()});let v=Array.from(g,x=>At(x,i,c,l)),y=p?d.curve:d.quiet;s.save(),s.fillStyle=p?d.fill:d.quiet,s.globalAlpha=p?.2:.08,$l(s,m,v,b),s.restore(),s.save(),s.strokeStyle=p?d.fill:y,s.lineJoin="round",s.lineCap="round",p&&(s.globalAlpha=.16,s.lineWidth=4,uo(s,m,v)),s.globalAlpha=1,s.strokeStyle=y,s.lineWidth=1.25,uo(s,m,v),s.restore(),Wm(e),Ki(e)}function jm(e,t,n,a,s,o,i){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let u=c*d;if(u<Yt||u>ka)continue;let h=Math.round(mn(u,t))+.5;e.globalAlpha=kl.includes(u)?.9:.35,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(h,0),e.lineTo(h,n),e.stroke()}for(let c of Om)if(!(c>a))for(let d of[1,-1]){let u=Math.round(At(c*d,n,a,s))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(0,u),e.lineTo(t,u),e.stroke()}e.globalAlpha=1,e.strokeStyle=o.zero;let l=Math.round(At(0,n,a,s))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=i,e.fillStyle=o.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of kl){let d=c>=1e3?`${c/1e3}k`:String(c),u=e.measureText(d).width,h=mn(c,t)+3;e.fillText(d,h+u+2>t?mn(c,t)-u-3:h,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>a)continue;let d=At(c,n,a,s);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(d)-1)}e.restore()}function cs(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let s=(t[a]+t[a+1])/2,o=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],s,o)}e.lineTo(t[t.length-1],n[n.length-1])}function uo(e,t,n){e.beginPath(),cs(e,t,n),e.stroke()}function $l(e,t,n,a){e.beginPath(),cs(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function Hd(e){return e.closest("[data-nc-maxable]")}function jd(e){let t=Hd(e);return!!t&&!t.hasAttribute("data-nc-max")}function Xi(e){let t=jd(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=me.get(e);n?.active&&(n.active=null,Ki(e))}return t}function Wm(e){Xi(e);let t=me.get(e);if(!t?.box)return;let{w:n,h:a,pad:s}=t.box,o=t.control.range??18;for(let i of t.control.bands){let l=Rd(e,i.id);l instanceof HTMLElement&&(l.style.left=`${mn(i.hz,n).toFixed(1)}px`,l.style.top=`${At(i.db*Yi(i),a,o,s).toFixed(1)}px`)}}function Um(e,t,n,a){let s=a/2/n,o=new Float32Array(e),i=new Float32Array(e),l=new Float32Array(e);for(let c=0;c<e;c++){let d=(c-.5)/(e-1)*t,u=(c+.5)/(e-1)*t,h=Ya(d,t),p=Ya(u,t),f=Ya(c/(e-1)*t,t);o[c]=Math.min(n-1,h/s),i[c]=Math.min(n-1,p/s),l[c]=Pm*Math.log2(f/1e3)}return{lo:o,hi:i,tilt:l}}function Ym(e,t,n){let a=Math.floor(t),s=Math.ceil(n);if(s-a<=1){let i=t-a,l=e[a]??-1/0,c=e[Math.min(e.length-1,a+1)]??l;return l+(c-l)*i}let o=-1/0;for(let i=a;i<=s&&i<e.length;i++)e[i]>o&&(o=e[i]);return o}function Km(e){let t=me.get(e);if(t){if(!t.control.spectrum){Ud(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let s=me.get(e)?.spec;s&&(s.visible=a.some(o=>o.isIntersecting),Ko(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Ko(e)}}function Ko(e){let t=me.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){Wd(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Xo(e),n.onVis||(n.onVis=()=>Ko(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Go(e,!1)}function Xo(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function Go(e,t){let n=me.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,po(e,Xo(e))),Cm):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(s=>(n.raf=0,po(e,s))):n.timer=a.setTimeout(()=>(n.timer=0,po(e,Xo(e))),Uo))}function Wd(e){let t=me.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function Ud(e){let t=me.get(e)?.spec;if(!t)return;Wd(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=me.get(e);n&&(n.spec=null)}function po(e,t){let n=me.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){Ud(e);return}if(!a.analyser)return;if(t-a.last<Uo-4&&!a.idle){Go(e,!1);return}let s=a.last?Math.min(.25,(t-a.last)/1e3):Uo/1e3;a.last=t;let o=e.querySelector(".nc-eq-spectrum");if(!(o instanceof HTMLCanvasElement))return;let{ctx:i,w:l,h:c}=qd(o);if(!i)return;let d=Math.max(16,Math.round(l/2)),u=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==d||a.map.w!==l||a.map.sr!==u)&&(a.map={cols:d,w:l,sr:u,...Um(d,l,a.buf.length,u)},a.disp=new Float32Array(d).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let h=-1/0,p=zm*s,{lo:f,hi:g,tilt:w}=a.map;for(let b=0;b<d;b++){let v=Ym(a.buf,f[b],g[b]);v>h&&(h=v);let y=v+w[b],x=a.disp[b]-p;a.disp[b]=y>x?y:x}h>Nm&&(a.loud=t);let m=t-a.loud>Fm;i.clearRect(0,0,l,c),(!m||a.disp.some(b=>b>Bt))&&Xm(i,l,c,a.disp,n.colours??_d(e)),a.idle=m&&!a.disp.some(b=>b>Bt),Go(e,a.idle)}function Xm(e,t,n,a,s){let o=a.length,i=new Array(o),l=new Array(o),c=d=>{let u=a[Math.max(0,Math.min(o-1,d))];return Number.isFinite(u)?u:Bt};for(let d=0;d<o;d++){let u=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,h=(Math.max(Bt,Math.min(xl,Number.isFinite(u)?u:Bt))-Bt)/(xl-Bt);i[d]=d/(o-1)*t,l[d]=n-h*n}e.save(),e.fillStyle=s.spectrum,e.globalAlpha=.13,e.beginPath(),cs(e,i,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=s.spectrum,e.lineWidth=1,e.beginPath(),cs(e,i,l),e.stroke(),e.restore()}var Ie=new WeakMap,Gm=450,Vm=6,Qm=33,ho=24,Jm="http://www.w3.org/2000/svg";function Zm(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function eg(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function tg(e,t,n,a,s){let o=e.slice();if(t===a)return o[a]=s,o;let i=t<a?1:-1;for(let l=t;l!==a+i;l+=i){let c=(l-t)/(a-t);o[l]=Math.round((n+(s-n)*c)*100)/100}return o}function ng(e,t){let n=e.steps[t],a=(e.shapes??[]).find(o=>o.value===n.shape),s=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${a?`, ${a.label}`:""}${s}`}function Rt(e,t){let n=document.createElementNS(Jm,e);for(let[a,s]of Object.entries(t))n.setAttribute(a,String(s));return n}function Yd(e){let t=Rt("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(Rt("path",{d:e})),t}function ag(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-lsteps-plot",a.tabIndex=0,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical"),a.setAttribute("aria-valuemin","0"),a.setAttribute("aria-valuemax","100"),a.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let s=document.createElement("div");s.className="nc-lsteps-axis",s.setAttribute("aria-hidden","true");let o=document.createElement("div");o.className="nc-lsteps-shapes",o.setAttribute("role","tablist");let i=document.createElement("div");i.className="nc-lsteps-pick",i.setAttribute("role","menu"),i.hidden=!0,n.append(a,s,o,i);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let c={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return Ie.set(n,c),og(n,a),ig(n,i),Kd(n,e),n}function _e(e){let t=Ie.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function sg(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function fo(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),a=sg(e);return{i:eg(t.clientX,a),level:Zm(t.clientY-n.top,n.height)}}function og(e,t){let n=Ie.get(e),a=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",o=>{let i=_e(e);if(!i||o.button>0||!i.steps.length)return;o.preventDefault(),ds(e),t.setPointerCapture?.(o.pointerId);let l=fo(t,o),c=i.steps.map(d=>d.level);n.drag={id:o.pointerId,x:o.clientX,y:o.clientY,start:c,levels:c,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,Sl(e,l.i,l.level,l.i,l.level,!1),a(),n.timer=setTimeout(()=>{n.timer=0;let d=n.drag;!d||d.moved||(d.long=!0,_e(e)?.onLevels(d.start.slice(),!0),mo(e,d.i))},Gm)}),t.addEventListener("pointermove",o=>{let i=n.drag;if(!i||i.id!==o.pointerId||i.long||!i.moved&&Math.hypot(o.clientX-i.x,o.clientY-i.y)<Vm)return;i.moved=!0,a();let l=fo(t,o);Sl(e,i.i,i.level,l.i,l.level,!1),i.i=l.i,i.level=l.level});let s=o=>{let i=n.drag;!i||i.id!==o.pointerId||(a(),n.drag=null,t.releasePointerCapture?.(o.pointerId),i.long||_e(e)?.onLevels(i.levels.slice(),!0),Vo(e,-1))};t.addEventListener("pointerup",s),t.addEventListener("pointercancel",o=>{let i=n.drag;!i||i.id!==o.pointerId||(a(),n.drag=null,i.long||_e(e)?.onLevels(i.start.slice(),!0),Vo(e,-1))}),t.addEventListener("contextmenu",o=>{_e(e)?.onShape&&(o.preventDefault(),mo(e,fo(t,o).i))}),t.addEventListener("keydown",o=>{let i=_e(e);if(!i||!i.steps.length)return;let l=i.steps.length,c=Math.min(n.focus,l-1),d=i.steps[c].level,u=h=>{let p=i.steps.map(f=>f.level);p[c]=Math.round(Math.max(0,Math.min(1,h))*100)/100,i.onLevels(p,!0)};switch(o.key){case"ArrowLeft":n.focus=(c-1+l)%l;break;case"ArrowRight":n.focus=(c+1)%l;break;case"ArrowUp":u(d+(o.shiftKey?.01:.05));break;case"ArrowDown":u(d-(o.shiftKey?.01:.05));break;case"PageUp":u(d+.25);break;case"PageDown":u(d-.25);break;case"Home":u(1);break;case"End":u(0);break;case"Enter":case" ":if(!i.onShape)return;mo(e,c);break;default:return}o.preventDefault(),Qo(e)}),t.addEventListener("focus",()=>Qo(e)),t.addEventListener("blur",()=>{for(let o of t.querySelectorAll("[data-focus]"))o.removeAttribute("data-focus")})}function Sl(e,t,n,a,s,o){let i=Ie.get(e).drag;i&&(i.levels=tg(i.levels,t,n,a,s),Vo(e,a,i.levels[a]),_e(e)?.onLevels(i.levels.slice(),o))}function Vo(e,t,n){for(let a of e.querySelectorAll(".nc-lsteps-step"))Number(a.dataset.i)===t?(a.dataset.dragging="true",a.dataset.level=`${Math.round(n*100)}%`):a.removeAttribute("data-dragging")}function Qo(e){let t=Ie.get(e),n=e.querySelector(".nc-lsteps-plot"),a=_e(e);if(!n||!a)return;for(let o of n.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===t.focus?o.dataset.focus="true":o.removeAttribute("data-focus");let s=Math.min(t.focus,a.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((a.steps[s]?.level??0)*100))),n.setAttribute("aria-valuetext",ng(a,s))}function ig(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),ds(e,!0);return}let a=[...t.querySelectorAll("button")],s=a.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),a[(s+1)%a.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),a[(s-1+a.length)%a.length]?.focus())}),Ie.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&ds(e)}}function mo(e,t){let n=_e(e),a=e.querySelector(".nc-lsteps-pick"),s=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!a||!s)return;let o=Ie.get(e);o.focus=t,a.textContent="";let i=document.createElement("span");i.className="nc-lsteps-pick-head",i.textContent=`Step ${t+1}`,a.append(i);for(let f of n.shapes??[]){let g=document.createElement("button");g.type="button",g.setAttribute("role","menuitemradio"),g.setAttribute("aria-checked",n.steps[t]?.shape===f.value?"true":"false"),f.icon&&g.append(Yd(f.icon)),g.append(document.createTextNode(f.label)),g.addEventListener("click",()=>{_e(e)?.onShape?.(t,f.value),ds(e,!0)}),a.append(g)}a.setAttribute("aria-label",`Shape of step ${t+1}`),a.hidden=!1,e.ownerDocument.addEventListener("pointerdown",o.outside,!0);let l=s.querySelector(`.nc-lsteps-step[data-i="${t}"]`),c=e.getBoundingClientRect(),d=l?.getBoundingClientRect(),u=a.getBoundingClientRect().width,h=d?d.left+d.width/2-c.left:0,p=Math.max(0,Math.min(c.width-u,h-u/2));a.style.setProperty("--nc-lsteps-pick-x",`${Math.round(p)}px`),a.querySelector('[aria-checked="true"]')?.focus?.()??a.querySelector("button")?.focus?.()}function ds(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",Ie.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function rg(e,t){let n=Ie.get(e),a=e.querySelector(".nc-lsteps-plot"),s=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,a.textContent="",s.textContent="";for(let o=0;o<t;o++){let i=document.createElement("div");i.className="nc-lsteps-step",i.dataset.i=String(o),o%4===0&&o>0&&(i.dataset.beat="true");let l=Rt("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(Rt("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),Rt("path",{class:"nc-lsteps-env",d:""}),Rt("path",{class:"nc-lsteps-top",d:""}),Rt("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),i.append(l),a.append(i);let c=document.createElement("span");o%4===0&&(c.textContent=String(o+1)),o%4===0&&o>0&&(c.dataset.beat="true"),s.append(c)}}}function Kd(e,t){let n=Ie.get(e);if(!n)return;n.control=t;let a=t.steps.length;rg(e,a),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let s=e.querySelector(".nc-lsteps-plot");s.setAttribute("aria-label",t.label??"Steps");let o=Math.max(.5,Math.min(.75,t.swing??.5)),i=s.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((f,g)=>{let w=i[g];if(!w)return;let m=String((g%2?1-o:o)*2);w.style.setProperty("--nc-lsteps-grow",m),l[g]?.style.setProperty("--nc-lsteps-grow",m),t.played!==void 0&&g>=t.played?w.dataset.out="true":w.removeAttribute("data-out"),w.dataset.zero=f.level<=0?"true":"false";let b=Math.max(0,Math.min(1,f.level)),v=w.querySelector(".nc-lsteps-level");v.setAttribute("y",String(100-b*100)),v.setAttribute("height",String(b*100));let y=t.curve?t.curve(g,ho):null,x="M0 100",S="";for(let k=0;k<=ho;k++){let $=y?Math.max(0,Math.min(1,y[k]??b)):b,A=k/ho*100,M=100-$*100;x+=` L${A.toFixed(2)} ${M.toFixed(2)}`,S+=`${k?" L":"M"}${A.toFixed(2)} ${M.toFixed(2)}`}w.querySelector(".nc-lsteps-env").setAttribute("d",`${x} L100 100 Z`),w.querySelector(".nc-lsteps-top").setAttribute("d",S)});let c=e.querySelector(".nc-lsteps-shapes"),d=(t.shapes??[]).map(f=>`${f.value}:${f.label}`).join();if(d!==n.shapeKey){n.shapeKey=d,c.textContent="";for(let f of t.shapes??[]){let g=document.createElement("button");g.type="button",g.className="nc-lsteps-shape",g.setAttribute("role","tab"),g.dataset.shape=String(f.value),f.icon&&g.append(Yd(f.icon)),g.append(document.createTextNode(f.label)),g.addEventListener("click",()=>_e(e)?.onShapeAll?.(f.value)),c.append(g)}}c.hidden=!(t.shapes?.length&&t.onShapeAll),c.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let u=t.played??a,h=t.steps[0]?.shape,p=t.steps.slice(0,u).every(f=>f.shape===h);for(let f of c.querySelectorAll(".nc-lsteps-shape")){let g=p&&f.dataset.shape===String(h);f.setAttribute("aria-selected",g?"true":"false"),f.tabIndex=g||!p&&f===c.firstElementChild?0:-1}n.focus>=a&&(n.focus=0),Qo(e),n.last=-2,lg(e)}function lg(e){let t=Ie.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&go(e,null);return}let a=0,s=o=>{if(t.loop=0,!e.isConnected||!t.control.playhead){go(e,null);return}o-a>=Qm&&(a=o,go(e,t.control.playhead())),t.loop=n.requestAnimationFrame(s)};t.loop=n.requestAnimationFrame(s)}function go(e,t){let n=Ie.get(e),a=t&&Number.isInteger(t.step)?t.step:-1,s=!!t?.locked;if(!(n.last===a&&n.lastLocked===s)){n.last=a,n.lastLocked=s;for(let o of e.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===a?(o.dataset.playhead="true",o.dataset.locked=s?"true":"false"):(o.removeAttribute("data-playhead"),o.removeAttribute("data-locked"));e.dataset.free=t&&!s?"true":"false"}}var cg=.8912509381337456,Jo=32,dg=250,ug=1200,pg=.2,Xd=1.5;function hg(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function fg(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let s=e.createElement("span");s.className="nc-fx-level-fill",a.append(s),t.append(a)}return t}var us=new WeakMap,El=new WeakMap;function Al(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let s=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),o=Number.parseFloat(s);return Number.isFinite(o)?s.endsWith("ms")?o/1e3:o:n}function mg(e){let t=El.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(s=>{for(let o of s){let i=us.get(o.target);i&&(i.seen.set(o.target,o.isIntersecting),na(i))}hn(t)})),e.addEventListener("visibilitychange",()=>{for(let s of t.recs)na(s);hn(t)}),El.set(e,t),t}var Gd=e=>e.els.some(t=>t.isConnected);function gg(e){if(!e.loop.io)return Gd(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function na(e){let t=!e.dead&&!!e.source&&gg(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Gi(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),ti(e))}function Gi(e){return e.doc.defaultView?.performance?.now()??Date.now()}function hn(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){Vd(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Gi(e)),!e.raf&&!e.timer&&Zo(e,!1)}function Zo(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>Ml(e,Gi(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),dg):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(s=>(e.raf=0,Ml(e,s))):e.timer=n.setTimeout(()=>(e.timer=0,a()),Jo)}function Vd(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Ml(e,t){if(t-e.last<Jo-4&&!e.idle&&e.last){Zo(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):Jo/1e3;e.last=t,e.frames++;let a=!1,s=!1;for(let o of e.recs){if(!Gd(o)){(o.placed||e.frames-o.born>90)&&Qd(o);continue}o.placed=!0,o.open&&(s=!0,bg(o,n,t)&&(e.loud=t),(o.disp[0]>0||o.disp[1]>0)&&(a=!0))}if(!s){Vd(e);return}e.idle=t-e.loud>ug&&!a,Zo(e,e.idle)}function bg(e,t,n){if(e.fall<0){let p=e.els[0];e.fall=Al(p,"motion-meter-fall",pg),e.hold=Al(p,"motion-meter-hold",Xd)}let a=null;try{a=e.source.read()}catch{a=null}let s=typeof a=="number",o=s?a:Number(a?.in)||0,i=!s&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=i&&Number(a.out)||0,c=i?"2":"1";if(e.rows!==c){e.rows=c;for(let p of e.els)p.dataset.ncRows=c}let d=e.fall>0?Math.exp(-t/e.fall):0,u=[o,l],h=!1;for(let p=0;p<2;p++){let f=hg(u[p]);f>0&&(h=!0),e.disp[p]=f>=e.disp[p]?f:f+(e.disp[p]-f)*d,e.disp[p]<.001&&(e.disp[p]=0),u[p]>=cg&&(e.clipAt[p]=n);let g=e.clipAt[p]>0&&n-e.clipAt[p]<e.hold*1e3;ei(e,p,e.disp[p],g)}return h}function ei(e,t,n,a){let s=Math.round(n*1e3)/1e3,o=a?"true":"false";if(!(e.shown[t]===s&&e.clipShown[t]===o)){e.shown[t]=s,e.clipShown[t]=o;for(let i of e.els){let l=i.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${s})`,l.dataset.clip=o)}}}function ti(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,ei(e,0,0,!1),ei(e,1,0,!1)}function Qd(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),us.get(t)===e&&us.delete(t)}function yg(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,s=mg(a),o={els:n,source:t??null,loop:s,open:!1,dead:!1,seen:new Map,born:s.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:Xd,rows:""};for(let i of n)us.set(i,o),s.io?.observe(i);if(s.recs.add(o),ti(o),!s.io){let i=a.defaultView,l=()=>{na(o),hn(s)};typeof i?.requestAnimationFrame=="function"?i.requestAnimationFrame(l):setTimeout(l,0)}return{set(i){let l=i??null;if(!o.dead){if(l===o.source){na(o),hn(s);return}o.open&&(o.open=!1,o.source?.close?.(),ti(o)),o.source=l,na(o),hn(s)}},destroy(){o.dead||Qd(o),hn(s)}}}var Jd={slop:8,longPressMs:500,pitchPx:16},vg=class{constructor(e,t,n=Jd){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let s=this.hit(t,n);return s<0?!1:(this.phase="pending",this.pointer=e,this.pad=s,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let s=t-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(s,o)<this.config.slop)return;Math.abs(o)>=Math.abs(s)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let i=Math.trunc(-o/this.config.pitchPx);i!==this.degrees&&(this.degrees=i,this.emit({kind:"pitch",pad:this.pad,degrees:i,phase:"move"}))}else if(this.phase==="paint"){let i=this.hit(t,n);i>=0&&i!==this.lastPad&&(this.lastPad=i,this.emit({kind:"paint",pad:i,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function wg(e,t,n,a=Jd){let s=!1,o=0,i=(d,u)=>{let h=e.ownerDocument.elementFromPoint?.(d,u),p=[...e.querySelectorAll(t)],f=h?p.findIndex(m=>m===h||m.contains(h)):-1;if(f>=0)return f;let g=-1,w=Number.POSITIVE_INFINITY;return p.forEach((m,b)=>{if(m.hidden)return;let v=m.getBoundingClientRect();if(u<v.top||u>v.bottom)return;let y=Math.abs(d-(v.left+v.width/2));y<w&&y<=v.width&&(g=b,w=y)}),g},l=new vg(i,d=>{(d.kind==="paint"||d.kind==="long")&&(s=!0),n(d)},a),c=()=>{o&&clearTimeout(o),o=0};return e.addEventListener("pointerdown",d=>{d.button>0||(s=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),o=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),e.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{s&&(s=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var Zd="netcomposer.groups.v1";function Vi(){try{return globalThis.localStorage??null}catch{return null}}function eu(e=Vi(),t=Zd){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[s,o]of Object.entries(n))typeof o=="boolean"&&a.set(s,o);return a}catch{return new Map}}function xg(e,t,n,a=Zd){let s=eu(e,a);s.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(s)))}catch{}}function kg(e,t=Vi()){return eu(t).get(e.id)??e.open===!0}function $g(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let s=document.createElement("button");s.type="button",s.className="nc-group-toggle",s.id=`${e.id}-group-toggle`;let o=document.createElement("span");o.className="nc-group-title";let i=document.createElement("span");i.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),s.append(o,i,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",s.id),s.setAttribute("aria-controls",c.id);for(let d of e.controls)c.append(n(d,t));return s.addEventListener("click",()=>{let d=a.dataset.ncOpen!=="true";xg(Vi(),e.id,d),ni(a,d);let u=t(a);u?.type==="group"&&u.onToggle?.(d)}),a.append(s,c),tu(a,e),ni(a,kg(e)),nu(a,e),a}function ni(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let s=n?.querySelector(".nc-group-mark");s&&(s.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function tu(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function nu(e,t){tu(e,t)&&ni(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),s=t.summary??"";a&&a.textContent!==s&&(a.textContent=s)}var Fa="application/x-nc-pad",Ll="http://www.w3.org/2000/svg";function Sg(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],s=[];for(let o=0;o<n;o++){let i=Math.floor(o*t/n),l=Math.max(i+1,Math.floor((o+1)*t/n)),c=0,d=0;for(let h=i;h<l;h++)c=Math.min(c,e[2*h]??0),d=Math.max(d,e[2*h+1]??0);let u=n===1?50:o/(n-1)*100;a.push(`${u.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),s.push(`${u.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${a.join("L")}L${s.reverse().join("L")}Z`}function Eg(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((s,o)=>a.append(Ag(n,o,t))),n.append(a),n.addEventListener("keydown",s=>{s.key==="Escape"&&Ka(n)}),su(n,e),n}function Ag(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let s=document.createElement("span");s.className="nc-padgrid-pad-bar",s.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-padgrid-pad-name";let i=document.createElement("span");i.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(Ll,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(Ll,"path");return c.append(d),a.append(s,o,i,l,c),Lg(e,a,t,n),o.addEventListener("dblclick",()=>{let u=n(e);u?.type==="padGrid"&&u.onRename&&a.dataset.empty!=="true"&&au(e,a,t,n)}),a.addEventListener("dragstart",u=>{if(a.dataset.empty==="true"||!u.dataTransfer){u.preventDefault();return}u.dataTransfer.setData(Fa,String(t)),u.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",u=>{let h=u.dataTransfer?.types??[];!h.includes("Files")&&!h.includes(Fa)||(u.preventDefault(),u.stopPropagation(),u.dataTransfer&&(u.dataTransfer.dropEffect=h.includes(Fa)&&!u.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",u=>{delete a.dataset.drop;let h=n(e);if(h?.type!=="padGrid")return;let p=u.dataTransfer?.getData(Fa);if(p!==void 0&&p!==""){u.preventDefault(),u.stopPropagation();let g=Number(p);g!==t&&h.onMove?.(g,t,u.altKey);return}let f=u.dataTransfer?.files?.[0];f&&(u.preventDefault(),u.stopPropagation(),h.onFile?.(t,f))}),a}function Mg(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function Lg(e,t,n,a){let s=0,o=!1,i=0,l=0,c=()=>{window.clearTimeout(s),s=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;o=!1,i=d.clientX,l=d.clientY,c();let u=a(e);u?.type==="padGrid"&&(u.onDown?.(n),!(u.onDown&&d.pointerType==="mouse")&&(s=window.setTimeout(()=>{s=0,o=Tl(e,t,n,a)},450)))}),t.addEventListener("pointermove",d=>{s&&Math.hypot(d.clientX-i,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,c);t.addEventListener("contextmenu",d=>{d.preventDefault(),c(),o=Tl(e,t,n,a)}),t.addEventListener("click",()=>{if(o){o=!1;return}Mg(e,n,a)})}function Tl(e,t,n,a){let s=a(e);if(s?.type!=="padGrid"||!s.menu)return!1;let o=s.menu(n);if(!o.length)return!1;Ka(e);let i=document.createElement("div");i.className="nc-slot-scrim",i.setAttribute("aria-hidden","true"),i.addEventListener("pointerdown",u=>{u.preventDefault(),u.stopPropagation(),Ka(e)}),i.addEventListener("click",u=>u.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let u of o){let h=document.createElement("button");h.type="button",h.className="nc-menu-btn",h.setAttribute("role","menuitem"),h.dataset.ncMenuItem=u.id,h.textContent=u.label,h.addEventListener("click",()=>{Ka(e);let p=a(e);p?.type==="padGrid"&&(u.id==="rename"&&p.onRename?au(e,t,n,a):p.onMenu?.(n,u.id))}),l.append(h)}e.append(i,l);let c=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function au(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let s=a(e);if(s?.type!=="padGrid")return;let o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=s.nameMax??24,o.value=s.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);let i=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-i.left}px`,o.style.top=`${l.top-i.top}px`,o.style.width=`${l.width}px`;let c=!1,d=u=>{if(c)return;c=!0;let h=o.value.trim();o.remove(),t.focus();let p=a(e);u&&h&&p?.type==="padGrid"&&p.onRename?.(n,h)};o.addEventListener("keydown",u=>{u.stopPropagation(),u.key==="Enter"?d(!0):u.key==="Escape"&&d(!1)}),o.addEventListener("blur",()=>d(!0));for(let u of["pointerdown","click","dblclick"])o.addEventListener(u,h=>h.stopPropagation());e.append(o),o.focus(),o.select()}function Ka(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function su(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,s)=>{let o=n[s];if(!(o instanceof HTMLButtonElement))return;let i=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),c=o.querySelector(".nc-padgrid-pad-wave path"),d=o.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=a.empty?"":a.badge??""),o.draggable=!a.empty,a.empty?(o.dataset.empty="true",i&&(i.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete o.dataset.empty,i&&(i.textContent=a.label),l&&(l.textContent=a.hint??""),c?.setAttribute("d",Sg(a.peaks))),!a.empty&&a.hint?o.dataset.hint="true":delete o.dataset.hint,a.lane?o.dataset.ncLane=String(a.lane):delete o.dataset.ncLane;let u=t.selected===s;u?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",u?"true":"false"),a.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",a.empty?`Pad ${s+1}, empty: load a sample`:`Pad ${s+1}, ${a.label}${a.hint?`, ${a.hint}`:""}${a.badgeLabel?`, ${a.badgeLabel}`:""}${u?", selected":""}`)})}function xe(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Os(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let s=document.createElement("span");return s.className="nc-readout",s.dataset.ncReadout="",n.append(a,s),n}function Cl(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function ia(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Tg=450,Nl=8;function et(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Cg(e){let t=sm(e,"target-min");return t>0?t:44}function Ng(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=Cg(e),a=n/2,s=t.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<t.length;o++){let i=t[o],l=s[o];if(!(i instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){i.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,u=c-a,h=c+a,p=d-a,f=d+a;for(let g=0;g<t.length;g++){if(o===g)continue;let w=s[g];if(!w||w.width===0)continue;let m=w.left+w.width/2,b=w.top+w.height/2;Math.abs(b-d)<a*2&&(m>c?h=Math.min(h,(c+m)/2):m<c&&(u=Math.max(u,(c+m)/2))),Math.abs(m-c)<a*2&&(b>d?f=Math.min(f,(d+b)/2):b<d&&(p=Math.max(p,(d+b)/2)))}u=Math.min(u,l.left),h=Math.max(h,l.right),p=Math.min(p,l.top),f=Math.max(f,l.bottom),i.style.left=`${u-l.left}px`,i.style.top=`${p-l.top}px`,i.style.width=`${Math.max(0,h-u)}px`,i.style.height=`${Math.max(0,f-p)}px`,i.style.transform="none"}}function ou(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Fl(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Ht(e,t){switch(e.type){case"slider":return Fg(e,t);case"select":return zg(e,t);case"toggle":return Og(e,t);case"button":return Dg(e,t);case"readout":return Bg(e);case"label":return _g(e);case"note":return Pl(e);case"knob":return Wg(e,t);case"choice":return Ug(e,t);case"slotRow":return Yg(e,t);case"stepGrid":return Vg(e,t);case"canvas":return eb(e);case"fx":return cb(e,t);case"eqGraph":return Im(e,t);case"levelSteps":return ag(e,t);case"group":return $g(e,t,Ht);case"strip":return tb(e,t);case"stripAdd":return ob(e,t);case"padGrid":return Eg(e,t);case"moves":return Ig(e,t);default:return Pl({id:"unknown",text:""})}}function Ue(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,lu(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(iu(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let s=e.querySelector("[data-nc-readout]");s&&(s.textContent=t.valueText??ia(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Cl(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")Cl(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&Mt(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Hg(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??ia(t.value))}else if(t.type==="choice")cu(e,t);else if(t.type==="slotRow")uu(e,t);else if(t.type==="stepGrid")si(e,t);else if(t.type==="padGrid")su(e,t);else if(t.type==="moves")ru(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&Dd(n,t)}else if(t.type==="eqGraph")Id(e,t);else if(t.type==="levelSteps")Kd(e,t);else if(t.type==="strip"){mu(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${gn(n.id)}"]`);a instanceof Element&&Ue(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")hu(e,t);else if(t.type==="group"){nu(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${gn(n.id)}"]`);a instanceof Element&&Ue(a,n)}}else if(t.type==="fx"){Su(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${gn(n.id)}"]`);a instanceof Element&&Ue(a,n)}}}}function Fg(e,t){let n=Os(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let s=zs(e.taper,e.min,e.max);a.min=String(s?0:e.min),a.max=String(s?1e3:e.max),a.step=String(s?1:e.step),s&&(a.dataset.ncTaper=e.taper),a.value=String(iu(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let o=l=>s?jo(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(o(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(o(l))}),s&&a.addEventListener("keydown",l=>{let c=t(a);if(c?.type!=="slider"||a.disabled)return;let d=c.taper??e.taper,u=Od(d,c.min,c.max,c.value,l.key,l.shiftKey,c.step);u!==null&&(l.preventDefault(),a.value=String(Wi(d,c.min,c.max,u)),c.onChange(u),c.onCommit?.(u))});let i=n.querySelector("[data-nc-readout]");return n.insertBefore(a,i),e.onTap&&n.insertBefore(Pg(e,a,t),i),n.append(xe()),Ue(n,e),n}function iu(e){return zs(e.taper,e.min,e.max)?Wi(e.taper,e.min,e.max,e.value):e.value}function Pg(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(et());let s=o=>{let i=n(t);i?.type==="slider"&&i.onTap?.(o)};return a.addEventListener("pointerdown",o=>{o.button===0&&s(o.timeStamp)}),a.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),s(o.timeStamp))}),a}function zg(e,t){let n=Os(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let s=null;for(let o of e.options){let i=document.createElement("option");i.value=o.value,i.textContent=o.label,o.disabled&&(i.disabled=!0),o.group?s?.getAttribute("label")!==o.group&&(s=document.createElement("optgroup"),s.setAttribute("label",o.group),a.append(s)):s=null,(s??a).append(i)}return a.value=e.value,a.addEventListener("change",()=>{let o=t(a);o?.type==="select"&&o.onChange(a.value)}),n.append(a,xe()),n}function Og(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(xe()),Ue(n,e),n}function Dg(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let o=t(n);o?.type==="button"&&o.onPress()}),n.append(xe()),Ue(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let s=document.createElement("button");return s.type="button",s.className="nc-sparkle-btn",s.dataset.ncSparkle=e.id,s.setAttribute("aria-label","Surprise me"),s.title=e.sparkleTitle??"Surprise me",s.innerHTML=ou(),s.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&pu(o);let i=t(n);i?.type==="button"&&i.onSparkle?.()}),a.append(n,s),a}function Bg(e){let t=Os(e.id,e.label);return t.append(xe()),Ue(t,e),t}var Rg=450;function Ig(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let s=document.createElement("div");s.className="nc-moves-row",s.setAttribute("role","group"),s.setAttribute("aria-label",a.label),a.title&&(s.title=a.title);let o=document.createElement("span");o.className="nc-moves-label",o.setAttribute("aria-hidden","true"),o.textContent=a.label;let i=document.createElement("div");i.className="nc-moves-btns";for(let l of a.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${a.label} ${l.text}`),c.append(qg(l.icon)),c.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),i.append(c)}s.append(o,i),n.append(s)}return ru(n,e),n}function ru(e,t){for(let n of t.groups)for(let a of n.moves){let s=e.querySelector(`[data-nc-move="${gn(a.id)}"]`);s instanceof HTMLButtonElement&&(s.disabled=a.disabled===!0)}}function qg(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function _g(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(xe()),t}function Pl(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(xe()),t}function zl(e){if(typeof e.valueText=="string")return e.valueText;let t=ia(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function lu(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Hg(e,t){let n=ls(t.taper,t.min,t.max,t.value);lu(e,t.modulated===!0);let a=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(a)),t.bipolar){let s=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(ls(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(a,s))),e.style.setProperty("--knob-to",String(Math.max(a,s)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",zl(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${zl(t)}`}function jg(e,t){if(zs(e.taper,e.min,e.max))return Od(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,s=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+s:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-s:null}function Wg(e,t){let n=Os(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let s=document.createElement("i");s.className="nc-knob-mark",a.append(s);let o=0,i=0;a.addEventListener("pointerdown",d=>{o=d.clientY;let u=t(a);i=u&&"value"in u?Number(u.value):0,a.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",d=>{if(a.hasPointerCapture&&!a.hasPointerCapture(d.pointerId))return;let u=t(a);if(u?.type!=="knob")return;if(zs(u.taper,u.min,u.max)){let f=ls(u.taper,u.min,u.max,i)-(d.clientY-o)/120;u.onChange(Pd(u.taper,u.min,u.max,f));return}let h=u.max-u.min||1,p=Math.min(u.max,Math.max(u.min,i-(d.clientY-o)*h/120));u.onChange(p)}),a.addEventListener("dblclick",()=>{let d=t(a);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),a.addEventListener("keydown",d=>{let u=t(a);if(u?.type!=="knob")return;let h=jg(u,d);h!==null&&(d.preventDefault(),u.onChange(Math.min(u.max,Math.max(u.min,h))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(a,c),n.append(xe()),Ue(n,e),n}function Ug(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let a=document.createElement("span");a.className="nc-label nc-choice-caption",a.setAttribute("aria-hidden","true"),a.textContent=e.caption,n.dataset.ncCaption="",n.append(a)}for(let a of e.options){let s=document.createElement("button");s.type="button",s.className="nc-choice",s.dataset.ncChoice=a.value,s.setAttribute("role","tab"),s.textContent=a.label,s.addEventListener("click",()=>{let o=t(n);o?.type==="choice"&&o.onChange(a.value)}),s.addEventListener("keydown",o=>{let i=[...n.querySelectorAll("[data-nc-choice]")],l=i.indexOf(s),c=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")c=(l+1)%i.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")c=(l-1+i.length)%i.length;else if(o.key==="Home")c=0;else if(o.key==="End")c=i.length-1;else return;let d=i[c];d instanceof HTMLButtonElement&&(o.preventDefault(),d.focus(),d.click())}),n.append(s)}return n.append(xe()),cu(n,e),n}function cu(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function Yg(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let u=0;u<e.slots.length;u++){let h=e.slots[u],p=document.createElement("span");p.className="nc-snap-wrap";let f=document.createElement("button");f.type="button",f.className="nc-snap",f.dataset.ncSlot=String(u),f.textContent=h.label,f.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",p.append(f,et()),Kg(p,f,n,u,t),a.append(p)}let s=e.onSparkle?document.createElement("button"):null;s&&(s.type="button",s.className="nc-sparkle",s.setAttribute("aria-label","Surprise me"),s.innerHTML=ou(),s.append(et()),s.addEventListener("click",()=>{pu(n);let u=t(n);u?.type==="slotRow"&&u.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let i=document.createElement("span");i.className="nc-label",i.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let u=t(n);u?.type==="slotRow"&&u.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",o.append(i,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(a,...s?[s]:[]),n.append(d,o,xe()),du(n,t),uu(n,e),n}function Ol(e,t,n,a){let s=n(e);if(s?.type!=="slotRow")return;Gn(e);let o=a.shiftKey?"store":a.altKey?"clear":"recall";s.onSlot(t,o)}function Kg(e,t,n,a,s){let o=0,i=0,l=0,c=!1,d=!1,u=!1,h=!1,p=()=>{window.clearTimeout(o),o=0},f=b=>{let v=b.clientX-i,y=b.clientY-l;v*v+y*y>Nl*Nl&&(c=!0,p())},g=()=>{h&&(h=!1,window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",m))},w=b=>{let v=o!==0&&!c&&!d;p(),g(),v&&(u=!0,Ol(n,a,s,b))},m=()=>{c=!0,p(),g()};e.addEventListener("pointerdown",b=>{b.button===0&&(g(),d=!1,c=!1,u=!1,i=b.clientX,l=b.clientY,p(),o=window.setTimeout(()=>{o=0,!c&&(d=!0,Xg(n,t,a,s))},Tg),h=!0,window.addEventListener("pointermove",f),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",m))}),e.addEventListener("contextmenu",b=>b.preventDefault()),e.addEventListener("click",b=>{if(u||d||c){u=!1,d=!1,c=!1;return}Ol(n,a,s,b)})}function du(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=Dl("Save","store"),s=Dl("Clear","clear");n.append(a,s);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation(),Gn(e)}),o.addEventListener("click",i=>i.stopPropagation()),e.append(o,n),n.addEventListener("click",i=>{let l=i.target;if(!(l instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),Gn(e)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),Gn(e))}),e.addEventListener("keydown",i=>{i.key==="Escape"&&Gn(e)})}function Dl(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Xg(e,t,n,a){du(e,a);let s=e.querySelector(".nc-slot-menu");if(!(s instanceof HTMLElement))return;let o=e.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),s.hidden=!1,s.dataset.ncIndex=String(n);let i=e.getBoundingClientRect(),l=t.getBoundingClientRect();s.style.left=`${l.left-i.left}px`,s.style.top=`${l.bottom-i.top}px`,s.querySelector("button")?.focus()}function Gn(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function uu(e,t){for(let s of e.querySelectorAll("[data-nc-slot]")){if(!(s instanceof HTMLButtonElement))continue;let o=Number(s.dataset.ncSlot),i=t.slots[o];if(!i)continue;s.textContent=i.label,i.filled?s.dataset.filled="true":delete s.dataset.filled,i.active?s.dataset.active="true":delete s.dataset.active,i.edited?s.dataset.edited="true":delete s.dataset.edited,i.queued?s.dataset.queued="true":delete s.dataset.queued,i.queued&&i.pulse?s.dataset.pulse="true":delete s.dataset.pulse;let l=[i.filled?"saved":"empty",i.active?"playing":"",i.edited?"edited":"",i.queued?"queued, tap again to switch now":""];s.setAttribute("aria-label",[i.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function pu(e){let t=e.dataset.ncLastFill||null,n=Wf(t);e.dataset.ncLastFill=n;let a=Uf(n);if(a)for(let[s,o]of Object.entries(a))e.style.setProperty(s,o)}function Gg(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,s=o=>{if(a===o)return;a=o,n.setAttribute("aria-pressed",o?"true":"false");let i=t(e);i?.type==="stepGrid"&&i.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),s(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>s(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||s(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),s(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function Vg(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let s=m=>{let b=document.createElement("button");return b.type="button",b.setAttribute("role","radio"),b.textContent=m,a.append(b),b},o=s("Note"),i=s("Accent");i.dataset.ncAccentMode="";let l=m=>{for(let b of[o,i]){let v=b===m;b.setAttribute("aria-checked",v?"true":"false"),b.tabIndex=v?0:-1}};l(o);for(let m of[o,i])m.addEventListener("click",()=>l(m));a.addEventListener("keydown",m=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(m.key))return;m.preventDefault();let b=i.getAttribute("aria-checked")==="true"?o:i;l(b),b.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(a),e.onFill&&c.append(Gg(n,t)),e.onClear){let m=document.createElement("button");m.type="button",m.className="nc-fill nc-clear",m.dataset.ncClear="",m.textContent=e.clearLabel??"Clear",m.title="Clear every step (Undo takes it back)",m.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.onClear?.()}),c.append(m)}n.append(c);for(let m of e.rows){let b=document.createElement("div");b.className="nc-row",b.dataset.ncRow="";let v=document.createElement("button");v.type="button",v.className="nc-name",v.textContent=m.label,v.setAttribute("aria-label",`Select ${m.label}`),m.lane&&(v.dataset.ncLane=String((m.lane-1)%4+1));let y=!1,x=0;v.addEventListener("pointerdown",$=>{y=!1,!($.pointerType==="mouse"||$.button!==0)&&(x=window.setTimeout(()=>{let A=t(n);A?.type!=="stepGrid"||!A.selectedRows||(y=!0,A.onSelectRow?.(A.rows.findIndex(M=>M.id===m.id),!0))},Rg))});for(let $ of["pointerup","pointercancel","pointerleave"])v.addEventListener($,()=>window.clearTimeout(x));v.addEventListener("contextmenu",$=>{y&&$.preventDefault()}),v.addEventListener("click",$=>{let A=t(n);if(A?.type!=="stepGrid")return;if(y){y=!1;return}let M=A.rows.findIndex(K=>K.id===m.id),R=!!A.selectedRows&&($.shiftKey||$.metaKey||$.ctrlKey);A.onSelectRow?.(M,R)}),v.addEventListener("keydown",$=>Qg(n,v,$));let S=[];for(let $ of["mute","solo"]){if(!($==="mute"?e.onMute:e.onSolo))continue;let A=document.createElement("span");A.className="nc-ms-wrap";let M=document.createElement("button");M.type="button",M.className="nc-ms",M.dataset.ncMs=$,M.textContent=$==="mute"?"M":"S",M.setAttribute("aria-label",`${$==="mute"?"Mute":"Solo"} ${m.label}`),A.append(M,et()),A.addEventListener("click",()=>{let R=t(n);if(R?.type!=="stepGrid")return;let K=R.rows.findIndex(de=>de.id===m.id);($==="mute"?R.onMute:R.onSolo)?.(K)}),S.push(A)}let k=document.createElement("div");k.className="nc-steps";for(let $=0;$<m.steps.length;$++){let A=document.createElement("span");A.className="nc-step-wrap";let M=document.createElement("button");M.type="button",M.className="nc-step",M.dataset.ncStep=`${m.id}:${$}`,M.setAttribute("aria-label",`${m.label} step ${$+1}`),A.append(M,et()),A.addEventListener("click",R=>{let K=t(n);if(K?.type!=="stepGrid")return;let de=K.rows.findIndex(qe=>qe.id===m.id),H=i.getAttribute("aria-checked")==="true";K.onToggle(de,$,R.shiftKey||H)}),k.append(A)}if(e.onLength&&k.append(Jg(n,k,m,t)),b.append(...S,v,k),e.onDice){let $=document.createElement("button");$.type="button",$.className="nc-sparkle nc-row-dice",$.dataset.ncDice=m.id,$.setAttribute("aria-label",`Re-roll ${m.label}`),$.title=`Re-roll ${m.label}: new steps for this lane (Undo takes it back)`,$.innerHTML=Fl(),$.append(et()),$.addEventListener("click",()=>{let A=t(n);A?.type==="stepGrid"&&A.onDice?.(A.rows.findIndex(M=>M.id===m.id))}),b.append($)}b.addEventListener("click",$=>{if($.target!==b)return;let A=t(n);A?.type==="stepGrid"&&A.onSelectRow?.(A.rows.findIndex(M=>M.id===m.id))}),Bl(n,k,".nc-step-wrap",t,i,()=>m.id),n.append(b)}let d=document.createElement("div");d.className="nc-pads-head";let u=(m,b,v)=>{let y=document.createElement("button");return y.type="button",y.className=m,y.textContent=b,v&&y.setAttribute("aria-label",v),y},h=u("nc-pads-step","‹","Previous lane"),p=u("nc-pads-step","›","Next lane"),f=document.createElement(e.onLength?"button":"span");f.className="nc-pads-label",f.setAttribute("aria-live","polite"),e.onLength&&(f.type="button",f.dataset.ncLenToggle="",f.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",si(n,m))}));for(let[m,b]of[[h,-1],[p,1]])m.addEventListener("click",()=>{let v=t(n);if(v?.type!=="stepGrid"||v.rows.length===0)return;let y=v.rows.length;v.onSelectRow?.(((Pa(v)+b)%y+y)%y)});if(d.append(h,f,p),e.onDice){let m=u("nc-pads-step nc-pads-dice","","Re-roll lane");m.dataset.ncPadsDice="",m.innerHTML=Fl(),m.addEventListener("click",()=>{let b=t(n);if(b?.type!=="stepGrid")return;let v=Pa(b);v>=0&&b.onDice?.(v)}),d.append(m)}if(e.transport){let m=u("nc-pads-play","Play");m.dataset.ncPadsPlay="",m.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.transport?.onToggle()}),d.append(m)}n.append(d);let g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");let w=Math.max(0,...e.rows.map(m=>m.steps.length));for(let m=0;m<w;m++){let b=document.createElement("button");b.type="button",b.className="nc-pad",b.dataset.ncPad=String(m),b.textContent=String(m+1),b.addEventListener("click",v=>{let y=t(n);if(y?.type!=="stepGrid")return;let x=Pa(y);if(x<0)return;if(n.dataset.ncLenMode==="true"){y.onLength?.(x,m+1);return}let S=i.getAttribute("aria-checked")==="true";y.onToggle(x,m,v.shiftKey||S)}),g.append(b)}return Bl(n,g,".nc-pad",t,i,()=>{let m=t(n);return m?.type==="stepGrid"?m.rows[Pa(m)]?.id:void 0}),n.append(g),n.append(xe()),si(n,e),n}function Pa(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function Bl(e,t,n,a,s,o){let i="on",l=!0,c=-1,d=(u,h)=>{let p=u.rows[c]?.steps[h];!p||h>=u.rows[c].length||(u.onSet?u.onSet(c,h,i,l):!!p[i]!==l&&u.onToggle(c,h,i==="accent"))};wg(t,n,u=>{let h=a(e);if(h?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(u.kind!=="paint")return;let p=h.rows.findIndex(f=>f.id===o());p>=0&&h.rows[p].length!==u.pad+1&&h.onLength?.(p,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){let p=o();c=h.rows.findIndex(g=>g.id===p);let f=h.rows[c]?.steps[u.pad];if(!f)return;i=s.getAttribute("aria-checked")==="true"?"accent":"on",l=!f[i]}d(h,u.pad)}else if(u.kind==="long"){let p=o(),f=h.rows.findIndex(w=>w.id===p),g=t.querySelectorAll(n)[u.pad];f>=0&&g instanceof HTMLElement&&h.onLongPress?.(f,u.pad,g)}}})}function Qg(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],s=a.indexOf(t),o=s;n.key==="ArrowDown"?o=s+1:n.key==="ArrowUp"?o=s-1:n.key==="Home"?o=0:o=a.length-1;let i=a[o];!(i instanceof HTMLElement)||i===t||(n.preventDefault(),i.focus(),i.click())}function Jg(e,t,n,a){let s=document.createElement("button");s.type="button",s.className="nc-len-handle",s.dataset.ncLen=n.id,s.setAttribute("role","slider"),s.setAttribute("aria-valuemin","1"),s.setAttribute("aria-valuemax",String(n.steps.length)),s.append(et());let o=d=>{let u=a(e);if(u?.type!=="stepGrid")return;let h=u.rows.findIndex(g=>g.id===n.id),p=u.rows[h];if(!p)return;let f=Math.max(1,Math.min(p.steps.length,d));f!==p.length&&u.onLength?.(h,f)},i=d=>{let u=[...t.querySelectorAll(".nc-step")],h=1;return u.forEach((p,f)=>{let g=p.getBoundingClientRect();g.width>0&&d>=g.left+g.width/2&&(h=f+1)}),h},l=d=>o(i(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete s.dataset.dragging};return s.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),s.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),s.addEventListener("keydown",d=>{let u=a(e);if(u?.type!=="stepGrid")return;let h=u.rows.find(f=>f.id===n.id);if(!h)return;let p={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};d.key in p&&(d.preventDefault(),o(p[d.key]))}),s}var bo=new WeakMap,za=new WeakMap;function Zg(e){return e?(za.has(e)||(za.set(e,Ho(e)),Sd(t=>{za.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))ai(n,Number(n.getAttribute("data-nc-velocity")))},e)),za.get(e)):"light"}function ai(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:Zg(e.ownerDocument),s=n===null?null:`${a} ${n}`;if(!(bo.has(e)&&bo.get(e)===s)){if(bo.set(e,s),n===null){for(let o of Object.keys(hl(1)))e.style.removeProperty(o);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[o,i]of Object.entries(hl(n,pl[a]??pl.light)))e.style.setProperty(o,i)}}function Rl(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function si(e,t){let n=t.rows.some(u=>u.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let s=e.querySelector(".nc-pads"),o=t.rows.find(u=>u.id===t.selectedRow)??t.rows[0],i=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;i instanceof HTMLElement&&o&&(i.textContent=l?`${o.label} · ${o.length}`:o.label,t.onLength&&(i.setAttribute("aria-pressed",l?"true":"false"),i.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&o&&(c.setAttribute("aria-label",`Re-roll ${o.label}`),c.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let u=!!t.transport?.playing,h=t.transport?.label??(u?"Stop":"Play");d.textContent!==h&&(d.textContent=h),d.setAttribute("aria-pressed",u?"true":"false");let p=t.transport?.ariaLabel;p?d.setAttribute("aria-label",p):d.removeAttribute("aria-label")}if(s instanceof HTMLElement&&o){s.setAttribute("aria-label",`${o.label} steps`),o.lane&&(s.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?s.dataset.silent="true":delete s.dataset.silent;let u=o.length>0?(t.playhead%o.length+o.length)%o.length:-1;for(let h of s.querySelectorAll("[data-nc-pad]")){let p=Number(h.getAttribute("data-nc-pad")),f=o.steps[p];h instanceof HTMLButtonElement&&(h.hidden=!f||!l&&p>=o.length,l&&p>=o.length?h.dataset.out="true":delete h.dataset.out,l&&p===o.length-1?h.dataset.end="true":delete h.dataset.end,h.setAttribute("aria-label",`${o.label} step ${p+1}${f?.markLabel?`, ${f.markLabel}`:""}`),Rl(h,f),h.setAttribute("aria-pressed",f?.on?"true":"false"),f?.accent?h.dataset.accent="true":delete h.dataset.accent,f?.dim?h.dataset.dim="true":delete h.dataset.dim,ai(h,f?.velocity),t.playhead>=0&&p===u?h.dataset.playhead="true":delete h.dataset.playhead)}}for(let u of t.rows){for(let f=0;f<u.steps.length;f++){let g=u.steps[f],w=e.querySelector(`[data-nc-step="${u.id}:${f}"]`);if(!(w instanceof HTMLButtonElement))continue;let m=w.closest(".nc-row");if(m instanceof HTMLElement){t.selectedRow===u.id?m.dataset.selected="true":delete m.dataset.selected;let x=t.selectedRow!==u.id&&(t.selectedRows??[]).includes(u.id);x?m.dataset.picked="true":delete m.dataset.picked;let S=m.querySelector(".nc-name");S instanceof HTMLElement&&(S.setAttribute("aria-pressed",t.selectedRow===u.id||x?"true":"false"),S.textContent!==u.label&&(S.textContent=u.label,S.setAttribute("aria-label",`Select ${u.label}`))),u.mute||n&&!u.solo?m.dataset.silent="true":delete m.dataset.silent;for(let k of m.querySelectorAll("[data-nc-ms]")){let $=k.getAttribute("data-nc-ms")==="mute"?u.mute:u.solo;k.setAttribute("aria-pressed",$?"true":"false")}}w.setAttribute("aria-pressed",g.on?"true":"false");let b=`${u.label} step ${f+1}${g.markLabel?`, ${g.markLabel}`:""}`;w.getAttribute("aria-label")!==b&&w.setAttribute("aria-label",b),Rl(w,g),g.accent?w.dataset.accent="true":delete w.dataset.accent,g.dim?w.dataset.dim="true":delete w.dataset.dim,f%4===0?w.dataset.bar="true":delete w.dataset.bar,typeof g.velocity=="number"?(w.dataset.velocity="true",w.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,g.velocity))*100)}%`)):(delete w.dataset.velocity,w.style.removeProperty("--level")),ai(w,g.velocity);let v=t.playhead>=0&&u.length>0?(t.playhead%u.length+u.length)%u.length:-1;f===v?w.dataset.playhead="true":delete w.dataset.playhead;let y=!!t.onLength&&t.selectedRow===u.id;w.hidden=f>=u.length&&!y,f>=u.length&&y?w.dataset.out="true":delete w.dataset.out}let h=e.querySelector(`[data-nc-len="${u.id}"]`),p=e.querySelector(`[data-nc-step="${u.id}:${Math.max(0,u.length-1)}"]`)?.closest(".nc-step-wrap");if(h instanceof HTMLElement&&p&&p.nextElementSibling!==h){let f=document.activeElement===h;p.after(h),f&&h.focus()}h instanceof HTMLElement&&(h.setAttribute("aria-valuenow",String(u.length)),h.setAttribute("aria-label",`${u.label} length, ${u.length} steps`),h.title=`${u.label}: drag to set the length (${u.length} steps)`)}}function eb(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,xe()),t}function tb(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let s=document.createElement("span");s.className="nc-strip-name",s.dataset.ncStripName="";let o=!e.master&&typeof e.onFold=="function",i=null;o&&(n.dataset.ncFoldable="",i=vu(),i.dataset.ncStripHide="",i.addEventListener("click",()=>{let y=t(n);y?.type==="strip"&&(y.onFold?.(y.folded!==!0),document.activeElement!==i&&i.focus())})),a.append(s);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let y=document.createElement("span");y.className="nc-strip-grip-dots",y.setAttribute("aria-hidden","true"),l.append(y),l.addEventListener("keydown",x=>{if(x.key!=="ArrowLeft"&&x.key!=="ArrowRight"||x.ctrlKey||x.metaKey||x.shiftKey)return;let S=t(n);S?.type==="strip"&&(x.preventDefault(),S.onMove?.(x.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>_l(n,l,t))),!e.master&&typeof e.onShade=="function"&&a.addEventListener("contextmenu",y=>{y.pointerType==="touch"||y.pointerType==="pen"||y.target instanceof Element&&y.target.closest("input, .nc-strip-remove")||(y.preventDefault(),_l(n,a,t,{x:y.clientX,y:y.clientY}))}),e.onRemove){let y=document.createElement("button");y.type="button",y.className="nc-strip-remove",y.dataset.ncStripRemove="",y.textContent="×",y.addEventListener("click",()=>{let x=t(n);x?.type==="strip"&&x.onRemove?.(y)}),a.append(y)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let y=document.createElement("span");y.className="nc-hacks-wrap";let x=document.createElement("button");x.type="button",x.className="nc-hacks",x.dataset.ncHacks="",y.append(x,et()),y.addEventListener("click",()=>{let S=t(n);S?.type==="strip"&&S.onHacks?.()}),c.append(y)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let y=document.createElement("span");y.className="nc-hacks-wrap nc-sends-view-wrap";let x=document.createElement("button");x.type="button",x.className="nc-hacks nc-sends-view",x.dataset.ncSendsView="",y.append(x,et()),y.addEventListener("click",()=>{let S=t(n);S?.type==="strip"&&S.onSendsView?.()}),d.append(y)}for(let y of["mute","solo"]){if(!(y==="mute"?e.onMute:e.onSolo))continue;let x=document.createElement("span");x.className="nc-ms-wrap";let S=document.createElement("button");S.type="button",S.className="nc-ms",S.dataset.ncMs=y,S.textContent=y==="mute"?"M":"S",x.append(S,et()),x.addEventListener("click",()=>{let k=t(n);k?.type==="strip"&&(y==="mute"?k.onMute:k.onSolo)?.()}),d.append(x)}let u=document.createElement("div");u.className="nc-strip-sends";for(let y of e.sends??[])u.append(Ht({...y,type:"knob",compact:!0},t));let h=document.createElement("div");h.className="nc-strip-pan",e.pan&&h.append(Ht(Qi(e),t));let p=document.createElement("div");p.className="nc-strip-body";let f=document.createElement("span");f.className="nc-scale",f.setAttribute("aria-hidden","true");for(let y of e.ticks??[]){let x=document.createElement("span");x.className="nc-scale-tick",x.style.setProperty("--tick-pos",String(y.value)),x.textContent=y.label,f.append(x)}let g=pm({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:y=>{let x=t(n);x?.type==="strip"&&x.onChange(y)},onReset:()=>{let y=t(n);y?.type==="strip"&&ql(y)}}),w=ym({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let y=t(n);y?.type==="strip"&&y.onClipClear?.()}});if(p.append(f,g.el,w.el),o){let y=document.createElement("button");y.type="button",y.className="nc-ui-fx-fold nc-strip-fold",y.dataset.ncStripFold="",y.setAttribute("aria-expanded","false");let x=document.createElement("span");x.className="nc-strip-fold-cap",x.setAttribute("aria-hidden","true");let S=document.createElement("span");S.className="nc-ui-fx-fold-name",S.dataset.ncStripFoldName="";let k=document.createElement("span");k.className="nc-strip-fold-pan",k.setAttribute("aria-hidden","true"),k.hidden=!e.pan,y.append(x,k,S),y.addEventListener("click",()=>{let $=t(n);if($?.type!=="strip")return;$.onFold?.(!1);let A=n.querySelector("[data-nc-strip-hide]");A instanceof HTMLElement&&A.focus()}),p.prepend(y)}let m=document.createElement("button");m.type="button",m.className="nc-strip-db",m.dataset.ncReadout="";let b=0;m.addEventListener("click",y=>{let x=t(n);x?.type!=="strip"||!x.onTypeIn||(window.clearTimeout(b),y.detail===0?Il(n,m,t):y.detail===1&&(b=window.setTimeout(()=>Il(n,m,t),sb)))}),m.addEventListener("dblclick",()=>{window.clearTimeout(b);let y=t(n);y?.type==="strip"&&ql(y)});let v=document.createElement("div");return v.className="nc-strip-trim",e.trim&&v.append(Ht(Ji(e),t)),i&&n.append(i),l&&n.append(l),n.append(a,v,c,d,u,h,p,m,xe()),mu(n,e),n}function Qi(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??ab(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function Ji(e){let t=e.trim,n=t.min??-12,a=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:a,step:t.step??.5,value:t.value,valueText:t.valueText??nb(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:s=>t.onChange(s)}}function nb(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function ab(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var sb=250;function Il(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let s=document.createElement("input");s.type="text",s.className="nc-strip-db-input",s.inputMode="decimal",s.spellcheck=!1,s.autocomplete="off",s.value=a.valueText??ia(a.value),s.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(s),s.focus(),s.select?.();let o=!1,i=l=>{if(o)return;o=!0;let c=s.value;if(s.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(c)}t.focus?.()};s.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),i(!0)):l.key==="Escape"&&(l.preventDefault(),i(!1))}),s.addEventListener("blur",()=>i(!1))}function ob(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-strip-add-plus",s.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",a.append(s,o);let i=document.createElement("select");return i.className="nc-strip-add-select",i.addEventListener("change",()=>{let l=t(n),c=i.value;fu(i),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(a,i,xe()),hu(n,e),n}function hu(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let s=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],o=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),i=s.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==i&&(a.replaceChildren(...s.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),fu(a))}function fu(e){let t=e.options[0];t&&(t.selected=!0)}function ql(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function mu(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let s=e.querySelector(".nc-fader"),o=s?hm(s):void 0;o&&(o.configure({step:t.step}),o.set(t.value),o.setText(t.valueText),o.setLabel(`${t.label} level`)),vm(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let i=e.querySelector(".nc-strip-db");if(i instanceof HTMLElement){let g=t.valueText??ia(t.value);i.textContent!==g&&(i.textContent=g),i.setAttribute("aria-label",`${t.label} level ${g}`);let w=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";i.title=t.onTypeIn?`Click to type a value. ${w}`:w}for(let g of e.querySelectorAll("[data-nc-ms]")){let w=g.getAttribute("data-nc-ms"),m=w==="mute"?t.mute===!0:t.solo===!0;g.setAttribute("aria-pressed",m?"true":"false"),g.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let g=t.hacksLabel??"Hacks";l.textContent!==g&&(l.textContent=g),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${g}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let g=t.sendsViewLabel??"Sends";c.textContent!==g&&(c.textContent=g),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${g}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),Mt(c,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let u=gu(t);if(u?e.dataset.ncShade=String(u):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let g=e.querySelector(`.nc-strip-trim [data-nc-id="${gn(t.trim.id)}"]`);g&&Ue(g,Ji(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let g=e.querySelector(`.nc-strip-pan [data-nc-id="${gn(t.pan.id)}"]`);g&&Ue(g,Qi(t))}let h=!t.master&&typeof t.onFold=="function"&&t.folded===!0;h?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let p=e.querySelector("[data-nc-strip-hide]");p instanceof HTMLElement&&(wu(p,h,t.label),Mt(p,t.foldHelp));let f=e.querySelector("[data-nc-strip-fold]");if(f instanceof HTMLElement){f.hidden=!h,f.setAttribute("aria-label",`Expand ${t.label}`);let g=f.querySelector("[data-nc-strip-fold-name]");g&&g.textContent!==t.label&&(g.textContent=t.label),Mt(f,t.foldedHelp??t.foldHelp)}}function gu(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=bu?t:0}var bu=8,Oa=null;function _l(e,t,n,a){Oa?.();let s=n(e);if(s?.type!=="strip")return null;let o=e.ownerDocument,i=o.defaultView??globalThis,l=o.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${s.label}: shade and place`);let c=o.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(s.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=o.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let u=gu(s),h=e.querySelector("[data-nc-strip-grip]")??t,p=(b=!1)=>{if(Oa!==p)return;Oa=null;let v=l.contains(o.activeElement);l.remove(),o.removeEventListener("keydown",g,!0),o.removeEventListener("pointerdown",w,!0),i.removeEventListener("resize",m),(b||v)&&h?.isConnected&&h.focus?.({preventScroll:!0})},f=[0,...Array.from({length:bu},(b,v)=>v+1)].map(b=>{let v=o.createElement("button");return v.type="button",v.setAttribute("role","radio"),v.setAttribute("aria-checked",b===u?"true":"false"),v.setAttribute("tabindex",b===u?"0":"-1"),v.dataset.ncShadeChoice=String(b),b===0?(v.textContent="Auto",v.setAttribute("aria-label","Auto: alternate light and dark"),v.title="Auto: alternate light and dark"):(v.textContent=String(b),v.setAttribute("aria-label",`Shade ${b}`),v.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${b})`)),v.addEventListener("click",()=>{let y=n(e);p(!0),y?.type==="strip"&&y.onShade?.(b===0?null:b)}),v});if(d.append(...f),d.addEventListener("keydown",b=>{let v=f.indexOf(o.activeElement);if(v<0)return;let y=-1;b.key==="ArrowRight"||b.key==="ArrowDown"?y=(v+1)%f.length:b.key==="ArrowLeft"||b.key==="ArrowUp"?y=(v-1+f.length)%f.length:b.key==="Home"?y=0:b.key==="End"&&(y=f.length-1),!(y<0)&&(b.preventDefault(),f[v].setAttribute("tabindex","-1"),f[y].setAttribute("tabindex","0"),f[y].focus())}),l.append(c,d),typeof s.onMove=="function"){let b=[...e.parentElement?.children??[]].filter(y=>y.classList?.contains("nc-strip")&&!y.hasAttribute("data-nc-master")),v=b.indexOf(e);for(let[y,x,S]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let k=o.createElement("button");k.type="button",k.className="nc-strip-menu-item",k.dataset.ncStripMove=y<0?"left":"right";let $=o.createElement("span");$.textContent=x;let A=o.createElement("kbd");A.textContent=S,A.setAttribute("aria-hidden","true"),k.append($,A),k.disabled=y<0?v<=0:v<0||v>=b.length-1,k.addEventListener("click",()=>{let M=n(e);p(!0),M?.type==="strip"&&M.onMove?.(y)}),l.append(k)}}o.body.append(l),(()=>{let b=t.getBoundingClientRect?.()??{bottom:0,right:0},v=l.offsetWidth,y=l.offsetHeight,x=i.innerWidth||o.documentElement.clientWidth||v,S=i.innerHeight||o.documentElement.clientHeight||y,k=a?a.x:b.right-v,$=a?a.y:b.bottom+4;k=Math.max(4,Math.min(k,x-v-4)),$+y>S-4&&($=Math.max(4,(a?a.y:b.top)-y-4)),l.style.left=`${Math.round(k)}px`,l.style.top=`${Math.round($)}px`})();let g=b=>{if(b.key==="Escape")b.preventDefault(),b.stopPropagation(),p(!0);else if(b.key==="Tab"&&l.contains(o.activeElement)){let v=[...l.querySelectorAll("button:not([disabled])")].filter(x=>x.getAttribute("tabindex")!=="-1"),y=(v.indexOf(o.activeElement)+(b.shiftKey?-1:1)+v.length)%v.length;b.preventDefault(),v[y]?.focus()}},w=b=>{l.contains(b.target)||p(!1)},m=()=>p(!1);return o.addEventListener("keydown",g,!0),o.addEventListener("pointerdown",w,!0),i.addEventListener("resize",m),Oa=p,(f.find(b=>b.getAttribute("tabindex")==="0")??f[0]).focus({preventScroll:!0}),{el:l,close:()=>p(!1)}}var oi=typeof ResizeObserver=="function"?new ResizeObserver(ib):null;function ib(e){for(let t of e){if(!t.target.isConnected){oi.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&rb(n)}}function rb(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,s=n instanceof HTMLElement?n.offsetHeight:0,o=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+s+o}px`)}function lb(e){if(oi)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))oi.observe(t)}function cb(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let s=typeof e.onFold=="function",o=!!e.meter,i=typeof e.onRemove=="function";if(e.on===void 0&&!s&&!ps(e)&&!o&&!i)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),o&&l.append(ku(n,"head")),e.on!==void 0){let c=Cd({checked:e.on,labelledBy:a.id,onChange:d=>{let u=t(c.el);u?.type==="fx"&&u.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",l.append(c.el)}s&&l.append(ub(n,t)),ps(e)&&l.append(mb(n,t)),i&&l.append(gb(t)),n.append(l)}s&&n.prepend(pb(n,t)),o&&$u(n,e);for(let l of e.controls)n.append(Ht(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",l.append(c);for(let d of e.more)l.append(Ht(d,t));n.append(l)}return n.append(xe()),Su(n,e),lb(n),n}var db=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function yu(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&db(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function ub(e,t){let n=vu();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),yu(e))}),n}function vu(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function wu(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function pb(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let s=document.createElement("span");s.className="nc-ui-fx-fold-name",s.dataset.ncFxFoldName="";let o=document.createElement("span");return o.className="nc-fold-tri",o.setAttribute("aria-hidden","true"),n.append(o,a,s),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(ku(e,"fold")),n.addEventListener("click",()=>{let i=t(n);if(i?.type==="fx"){if(i.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}i.onFold?.(!1),yu(e)}}),n}var Sn=new Set;function Xa(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var ps=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),hb="(max-width: 768px)";function fb(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function mb(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(fb()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(xu(e,a,!Sn.has(a.id)),n.focus())}),n}function gb(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function xu(e,t,n){n?Sn.add(t.id):Sn.delete(t.id),Zi(e,t)}function bb(e,t){t?.type==="fx"&&Sn.has(t.id)&&xu(e,t,!1)}function yb(e){return e.ownerDocument.defaultView?.matchMedia?.(hb).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Zi(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=ps(t)&&Sn.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!ps(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Xa(e.ownerDocument,()=>{for(let i of e.querySelectorAll(".nc-eq"))i instanceof HTMLElement&&$n(i)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",Mt(n,t.maxHelp)),!a){e.dataset.ncMax&&Hl(e);return}if(!e.isConnected){let i=()=>e.isConnected&&Sn.has(t.id)&&Zi(e,t);queueMicrotask(()=>{e.isConnected?i():Xa(e.ownerDocument,i)});return}let s=yb(e),o=[...e.children].filter(i=>i.matches?.(".nc-field, [data-nc-slider]")).length;o>0&&e.style.setProperty("--nc-fx-dials",String(o)),e.dataset.ncMax!==s&&(e.dataset.ncMax&&Hl(e),e.dataset.ncMax=s,s==="over"&&vb(e,t)),wb(e.ownerDocument),s==="over"&&er(e),Xa(e.ownerDocument,()=>{for(let i of e.querySelectorAll(".nc-eq"))i instanceof HTMLElement&&$n(i)})}function Hl(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Xa(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&$n(n)})}function vb(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let s=e.querySelector("[data-nc-fx-max]");s instanceof HTMLElement&&s.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function er(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,s=e.ownerDocument.defaultView,o=Number.parseFloat(s?.getComputedStyle(a).columnGap??"")||0,i=Rm(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),o,s?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${i.left}px`,e.style.top=`${i.top}px`,e.style.width=`${i.width}px`}var jl=new WeakSet;function wb(e){jl.has(e)||(jl.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(s=>s.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&er(t)}))}var ii=new WeakMap;function ku(e,t){let n=fg(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function $u(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let s of n)Mt(s,t.meterHelp);let a=ii.get(e);a?a.set(t.meter):ii.set(e,yg(n,t.meter))}function Su(e,t){(t.meter||ii.has(e))&&$u(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let s=typeof t.onFold=="function"&&t.folded===!0;s?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let o=e.querySelector("[data-nc-fx-hide]");o instanceof HTMLElement&&(wu(o,s,t.title),Mt(o,t.foldHelp)),Zi(e,t);let i=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(i instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;i.hidden=s,i.setAttribute("aria-label",c),i.title=c}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";l.hidden=!s,l.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let u=l.querySelector("[data-nc-fx-fold-name]");u&&(u.textContent=t.title),Mt(l,t.foldHelp)}}function Mt(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function gn(e){return e.replace(/["\\]/g,"\\$&")}function xb(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(s=>s.type==="canvas"&&s.id===n.dataset.ncId);a?.type==="canvas"&&Dd(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&$n(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&er(n);Ng(e)}var kb=Et["toast-duration"];function $b({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function Sb(e,t,n,a){let s=l=>({top:l,bottom:l+n}),o=l=>e.some(c=>c&&c.bottom>l.top&&c.top<l.bottom),i=s(t-a-n);return o(i)?o(s(a))?"bottom":"top":"bottom"}function Eb(e,t,n,a,s,o){let i=e.bottom+s,l=Math.max(o,Math.min(e.left,a-o-n.width));for(let c=!0,d=0;c&&d<8;d++){c=!1;for(let u of t)u&&u.bottom>i&&u.top<i+n.height&&u.right>l&&u.left<l+n.width&&(i=u.bottom+s,c=!0)}return{top:i,left:l}}var Wl="data-nc-ui-toast-live";function Ab(e,t){let n=t.querySelector(`[${Wl}]`);return n||(n=e.createElement("div"),n.setAttribute(Wl,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function Mb({message:e,actionLabel:t,onAction:n,duration:a=kb,onClose:s,avoid:o=[],anchor:i,host:l,document:c=globalThis.document}={}){l=l??c.body;let d=c.defaultView??globalThis,u=c.createElement("div");u.className="nc-ui-toast",u.setAttribute("data-state","enter");let h=c.createElement("span");h.className="nc-ui-toast-message",h.textContent=e,u.appendChild(h);let p=null;t&&(p=c.createElement("button"),p.type="button",p.className="nc-ui-toast-action",p.textContent=t,u.appendChild(p)),l.appendChild(u);let f="open",g=W=>W&&typeof W.getBoundingClientRect=="function"?W.getBoundingClientRect():null,w=g(u),m=w?.height||44,b=d.getComputedStyle?.(u),v=Number.parseFloat(b?.getPropertyValue(ee("toast-offset")))||16,y=Number.parseFloat(b?.getPropertyValue(ee("toast-anchor-gap")))||8,x=g(i),S=d.innerHeight??0,k=o.map(g).filter(Boolean),$=x&&x.bottom>0&&x.top<S?Eb(x,k,{width:w?.width||0,height:m},d.innerWidth??0,y,v):null;$&&$.top+m<=S?(u.setAttribute("data-placement","anchor"),u.style.top=`${$.top+(d.scrollY??0)}px`,u.style.left=`${$.left+(d.scrollX??0)}px`):u.setAttribute("data-placement",Sb(k,S,m,v));let A=d.requestAnimationFrame?.bind(d)??(W=>setTimeout(W,16));A(()=>A(()=>{f==="open"&&u.setAttribute("data-state","open")})),Ab(c,l).textContent=$b({message:e,actionLabel:t});let M,R,K=new Promise(W=>{R=W}),de=W=>{clearTimeout(M),M=setTimeout(()=>Z("timeout"),W)},H=a,qe=Date.now(),B=()=>{f==="open"&&(clearTimeout(M),H=Math.max(0,H-(Date.now()-qe)))},G=()=>{f==="open"&&(qe=Date.now(),de(H))};u.addEventListener("pointerenter",B),u.addEventListener("pointerleave",G),u.addEventListener("focusin",B),u.addEventListener("focusout",G),p?.addEventListener("click",()=>{if(f==="open")try{n?.()}finally{Z("action")}}),Number.isFinite(a)&&de(a);function Z(W="close"){if(f!=="open")return;f="closing",clearTimeout(M),u.setAttribute("data-state","closing"),s?.(W);let Q=d.getComputedStyle?.(u),Se=Q?Math.max(0,...String(Q.transitionDuration||"").split(",").map(Rn=>Number.parseFloat(Rn)*(Rn.trim().endsWith("ms")?1:1e3)||0)):0,Bn=()=>{f!=="gone"&&(f="gone",u.remove(),R(W))};u.addEventListener("transitionend",Bn),setTimeout(Bn,Se+50)}return{el:u,close:Z,closed:K}}var Ul="data-nc-help";function Lb(e,t,n,a=0,s=6,o=8){let i=e.top-s-t.height,l=i>=a+o?"above":"below",c=l==="above"?i:e.bottom+s,d=Math.max(o,Math.min(e.left,n-o-t.width));return{top:Math.round(c),left:Math.round(d),side:l}}var yo=new WeakMap;function Tb(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Cb({document:e=globalThis.document,delay:t=1e3}={}){if(!e)return{uninstall(){},hide(){}};let n=yo.get(e);if(n)return n;let a=e.defaultView,s=null,o=null,i,l=!1,c,d=null,u=!1,h=0,p=()=>{clearTimeout(i),u&&!l&&(h=Date.now()+1500),u=!1,s&&(s.hidden=!0,delete s.dataset.pinned)},f=()=>{p(),clearTimeout(c),o=null,d=null,l=!1},g=($,A)=>{clearTimeout(i),d=A;let M=Date.now()<h?Math.min(t,300):t;i=setTimeout(()=>{o===$&&$.isConnected&&!l&&b($)&&(u=!0)},M)},w=$=>({x:Number($.clientX)||0,y:Number($.clientY)||0}),m=($,A,M)=>!$||Math.hypot($.x-A.x,$.y-A.y)>M,b=($,A)=>{let M=A??$.getAttribute(Ul);if(!M)return!1;s||(s=e.createElement("div"),s.className="nc-ui-help",s.setAttribute("role","tooltip"),s.dataset.testid="nc-help",s.style.position="fixed",s.style.pointerEvents="none",s.style.zIndex="6",e.body.appendChild(s)),s.textContent=M,s.hidden=!1,s.style.visibility="hidden",s.style.top="0px",s.style.left="0px";let R=$.getBoundingClientRect(),K=Lb(R,{width:s.offsetWidth,height:s.offsetHeight},a.innerWidth,Tb(e));return s.style.top=`${K.top}px`,s.style.left=`${K.left}px`,s.dataset.side=K.side,s.style.visibility="",!0},v=$=>{if(l||$.pointerType==="touch")return;let A=$.target&&$.target.closest?$.target.closest(`[${Ul}]`):null;A!==o&&(f(),!(!A||$.buttons)&&(o=A,g(A,w($))))},y=$=>{if(l||$.pointerType==="touch"||!o)return;if($.buttons){p(),d=null;return}let A=w($);u?m(d,A,8)&&(p(),g(o,A)):m(d,A,4)&&g(o,A)},x=$=>{!l&&!$.relatedTarget&&f()},S=$=>{(l||$.key==="Escape")&&f()};e.addEventListener("pointerover",v),e.addEventListener("pointermove",y,{passive:!0}),e.addEventListener("pointerout",x),e.addEventListener("pointerdown",f,!0),e.addEventListener("keydown",S),a.addEventListener("scroll",f,!0),a.addEventListener("blur",f);let k={hide:f,pin($,A,{ms:M=0}={}){return f(),!$||!$.isConnected||!b($,A)?!1:(l=!0,s.dataset.pinned="",M>0&&(c=setTimeout(f,M)),!0)},uninstall(){f(),e.removeEventListener("pointerover",v),e.removeEventListener("pointermove",y),e.removeEventListener("pointerout",x),e.removeEventListener("pointerdown",f,!0),e.removeEventListener("keydown",S),a.removeEventListener("scroll",f,!0),a.removeEventListener("blur",f),s?.remove(),s=null,yo.delete(e)}};return yo.set(e,k),k}var Nb="(max-width: 768px)",Fb='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',Pb='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',zb=0;function Ob({panel:e,button:t,label:n="Menu",media:a=Nb}){let s=e.ownerDocument,o=s.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++zb}`);let i=t??s.createElement("button");t||(i.type="button",i.innerHTML=Fb),i.classList.add("nc-page-menu-btn"),i.setAttribute("aria-label",n),i.setAttribute("aria-expanded","false"),i.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function c(){l()||(e.setAttribute("data-nc-open",""),i.setAttribute("aria-expanded","true"),s.addEventListener("keydown",u,!0),s.addEventListener("pointerdown",h,!0),[...e.querySelectorAll(Pb)].find(m=>!m.hidden&&m.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function d({focus:m}={}){if(!l())return;let b=e.contains(s.activeElement);e.removeAttribute("data-nc-open"),i.setAttribute("aria-expanded","false"),s.removeEventListener("keydown",u,!0),s.removeEventListener("pointerdown",h,!0),(m??b)&&i.focus?.({preventScroll:!0})}function u(m){m.key==="Escape"&&(m.preventDefault(),m.stopPropagation(),d({focus:!0}))}function h(m){let b=m.target;b instanceof o.Node&&(e.contains(b)||i.contains(b))||d({focus:!1})}let p=()=>l()?d({focus:!0}):c(),f=m=>{let b=m.target,v=b instanceof o.Element?b.closest("button"):null;!v||!e.contains(v)||v.closest("[data-nc-menu-stay]")||d({focus:!0})};i.addEventListener("click",p),e.addEventListener("click",f);let g=o.matchMedia?.(a),w=()=>{g?.matches||d({focus:!1})};return g?.addEventListener?.("change",w),{button:i,panel:e,open:c,close:d,isOpen:l,destroy(){d({focus:!1}),i.removeEventListener("click",p),e.removeEventListener("click",f),g?.removeEventListener?.("change",w)}}}var tr="netcomposer.rhythm.hidden.v1",it=new WeakMap;function vo(){try{return globalThis.localStorage??null}catch{return null}}function Eu(e,t=tr){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Yl(e,t,n,a=tr){let s=Eu(e,a);n?s.add(t):s.delete(t);try{e?.setItem(a,JSON.stringify([...s]))}catch{}}function nr(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(s=>s.controls)],n=[],a=s=>{if(n.push(s),s.type==="group")for(let o of s.controls)a(o)};for(let s of t)a(s),s.type==="fx"&&n.push(...s.controls,...s.more??[]),s.type==="strip"&&(n.push(...(s.sends??[]).map(o=>({...o,type:"knob",compact:!0}))),s.pan&&n.push(Qi(s)),s.trim&&n.push(Ji(s)));return n}function Au(e,t){if(!(!e||!t))return nr(e).find(n=>n.id===t)}function Db(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${nr(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Bb(e,t){if(!t.title)return;if(!t.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=t.title,e.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let s=document.createElement("span");s.className="nc-panel-subject",s.dataset.ncPanelSubject="",n.append(a,s),e.append(n),Mu(e,t)}function Mu(e,t){if(!t.panel)return;let n=[...e.children].find(o=>o.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),s=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),s&&(s.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Rb(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=it.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Au(n,a)}function Ib(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],s=Db(t);if(e.dataset.ncSignature===s){for(let o of a){let i=e.querySelector(`[data-nc-section="${Xl(o.id)}"]`);i&&Mu(i,o);for(let l of o.controls){let c=e.querySelector(`[data-nc-id="${Xl(l.id)}"]`);c instanceof Element&&Ue(c,l)}i instanceof HTMLElement&&ri(i,o,n)}return}e.dataset.ncSignature=s,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let o of a){let i=document.createElement("div");i.className="nc-section",i.dataset.ncSection=o.id,o.inset&&(i.dataset.ncInset="true"),o.area&&(i.dataset.ncArea=o.area),o.label&&(i.setAttribute("role","group"),i.setAttribute("aria-label",o.label)),o.panel&&(i.dataset.ncPanel="true",i.setAttribute("role","region"),o.title&&i.setAttribute("aria-label",o.title)),Bb(i,o);let l=o.panel?document.createElement("div"):i;o.panel&&(l.className="nc-panel-body",i.append(l));for(let c of o.controls)l.append(Ht(c,Rb));e.append(i),ri(i,o,n)}}function Lu(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,s=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,s))}}var qb="(max-width: 768px)",Tu=new WeakMap;function Kl(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function _b(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let s=Kl("prev"),o=Kl("next"),i=document.createElement("span");i.className="nc-fx-page-count",i.dataset.ncFxPageCount="",i.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(s,i,o,l);let c=(d,u)=>{let h=Tu.get(e);if(!h||u.getAttribute("aria-disabled")==="true")return;let p=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:f}=Lu(p,h.pageSize,(t.pages.get(h.id)??0)+d);t.pages.set(h.id,f),h.onPage?.(f),ri(e,{...h,page:f},t),u.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===u&&(u===s?o:s).focus(),t.redraw()};return s.addEventListener("click",()=>c(-1,s)),o.addEventListener("click",()=>c(1,o)),e.prepend(a),a}function ri(e,t,n){Tu.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],s=t.pageSize??0,{pages:o,page:i}=Lu(a.length,s,t.page??n.pages.get(t.id)??0);if(s>0&&n.pages.set(t.id,i),o<=1){for(let m of[...e.children])m.classList.contains("nc-fx-pager")&&m.remove();delete e.dataset.ncPaged;for(let m of a)delete m.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(qb).matches===!0,c=e.closest(".nc-module");a.forEach((m,b)=>{let v=Math.floor(b/s)!==i;if(v?m.dataset.ncOffPage="":delete m.dataset.ncOffPage,v&&!l){let y=c instanceof HTMLElement?it.get(c):void 0;bb(m,Au(y,m.dataset.ncId))}});let d=_b(e,n),u=d.querySelector('[data-nc-fx-page="prev"]'),h=d.querySelector('[data-nc-fx-page="next"]');u.setAttribute("aria-disabled",i===0?"true":"false"),h.setAttribute("aria-disabled",i===o-1?"true":"false");let p=d.querySelector("[data-nc-fx-page-count]"),f=`${i+1} / ${o}`;p.textContent!==f&&(p.textContent=f);let g=d.querySelector("[data-nc-fx-page-live]"),w=`Effects page ${i+1} of ${o}`;g.textContent!==w&&(g.textContent=w)}function Xl(e){return e.replace(/["\\]/g,"\\$&")}function Hb(e,t=tr){Md();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Eu(vo(),t).has(e.id),s=document.createElement("header");s.className="nc-module-hd",s.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${e.id}-title`;let i=document.createElement("span");i.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=Cd({labelledBy:o.id,onChange:v=>(it.get(n)??e).onToggle?.(v)});d.el.dataset.ncModuleSwitch="",i.append(d.el,l,c);let u=document.createElement("span");u.className="nc-snap-msg",u.dataset.ncStatus="",s.append(o,u,i);let h=document.createElement("div");h.className="nc-module-body",h.id=`${e.id}-body`;let p=document.createElement("button");p.type="button",p.className="nc-slim";let f=document.createElement("span");f.className="nc-slim-lines",p.append(f);let g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",n.append(g,s,h,p),n.setAttribute("aria-labelledby",o.id);let w=v=>{let y=it.get(n)??e;n.dataset.ncOpen=v?"false":"true",h.hidden=v,p.hidden=!v,l.textContent=v?"+":"−",l.setAttribute("aria-expanded",v?"false":"true"),l.setAttribute("aria-controls",h.id),l.setAttribute("aria-label",`${v?"Show":"Hide"} ${y.title}`),l.title=v?"Show":"Hide",v?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let v=n.dataset.ncOpen==="true";Yl(vo(),(it.get(n)??e).id,v,t),w(v),li(n.parentElement)}),p.addEventListener("click",()=>{Yl(vo(),(it.get(n)??e).id,!1,t),w(!1),li(n.parentElement)});let m={pages:new Map,redraw:()=>b.redraw()},b={el:n,update(v){it.set(n,v),v.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=v.title,u.textContent=v.status??"",v.status!==void 0?u.setAttribute("aria-live","polite"):u.removeAttribute("aria-live"),f.textContent=v.summary??v.title,d.el.hidden=v.on===void 0,d.set(v.on===!0),v.on===!1?h.dataset.ncDim="true":delete h.dataset.ncDim,p.setAttribute("aria-label",`Show ${v.title}`),Ib(h,v,m),w(h.hidden),b.redraw()},redraw(){let v=it.get(n);v&&xb(n,nr(v))}};return it.set(n,e),w(a),b.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>b.redraw()).observe(n),Sd(()=>b.redraw(),n.ownerDocument),b}function jb(e,t,n="adjacent"){Md(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((s,o)=>{let i=o%4+1;s.el.dataset.ncShade=String(i),s.el.dataset.ncPlace=a;let l=s.el.querySelector("[data-nc-index]");l&&(l.textContent=String(i).padStart(2,"0")),e.append(s.el),s.redraw()}),li(e)}function li(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=t.some(o=>o.hasAttribute("data-nc-lead")),a=t.map(o=>o.hasAttribute("data-nc-slim")?r("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let s=t.filter(o=>!o.hasAttribute("data-nc-slim"));n&&t.length===4&&s.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Wb="https://musicmatter.art/library/library.json",bn="musicmatter.art",Ub=["CC0-1.0","CC-BY-4.0","CC-BY-SA-4.0","PDM-1.0"],Cu=6,Yb=2,ar=["kick","snare","clap","hat","tom","perc","cymbal","fx","tonal"],Nu=["redistributable","personal","unknown"],hs=e=>typeof e=="number"&&Number.isFinite(e)&&e>=40&&e<=250;function Fu(e){const t=e.kind==="loop"?"loop":e.kind==="one-shot"?"one-shot":"";return{kind:t,bpm:t==="loop"&&hs(e.bpm)?e.bpm:0}}const $t=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{},V=(e,t=300)=>typeof e=="string"?e.trim().slice(0,t):"",Me=(e,t=0)=>typeof e=="number"&&Number.isFinite(e)?e:t,ze=e=>{const t=V(e,600);return/^https?:\/\/[^\s"'<>]+$/i.test(t)?t:""},sr=/^[0-9a-f]{64}$/,Pu="0123456789abcdefghijklmnopqrstuvwxyz";function Kb(e){const t=$t(e),n=Array.isArray(t.sounds)?t.sounds:[],a=new Set,s=[];for(const o of n){const i=$t(o),l=V(i.id,160),c=V(i.role),d=V(i.license,40),u=ze(i.audio),h=V(i.sha256,64).toLowerCase(),p=V(i.title,160);if(!l||a.has(l)||!ar.includes(c)||!u||!p||!Ub.includes(d)||!sr.test(h))continue;a.add(l);const f=$t(i.measures),g=Me(f.gain_db),w=$t(i.source);s.push({id:l,origin:"shelf",licenseStatus:"",permission:"",role:c,title:p,instrument:p.split(" · ")[0]??p,tags:(Array.isArray(i.tags)?i.tags:[]).filter(m=>typeof m=="string").map(m=>m.toLowerCase().slice(0,40)),license:d,licenseUrl:ze(i.license_url)||or(d),creator:V(i.creator,120)||"Unknown",creatorLink:ze(i.creator_link),source:ze(w.url),audio:u,manifest:ze(i.manifest),sha256:h,measures:{length:Me(f.length_s,1),attack:Me(f.attack_ms,10),decay:Me(f.decay_s,.3),centroid:Me(f.centroid_hz,1e3),level:Me(f.hit_dbfs,-20)+g,gain:g},wave:typeof i.wave=="string"?Array.from(i.wave.slice(0,96),m=>Math.max(0,Pu.indexOf(m))/35):[],...Fu(i)})}return{name:V(t.name,120)||bn,sounds:s}}function ci(e){const t=V(e,400).replace(/\\/g,"/");if(!t||t.startsWith("/")||/^[a-z][a-z0-9+.-]*:/i.test(t)||t.includes("\0"))return"";const n=t.split("/");return n.some(a=>!a||a==="."||a==="..")?"":n.join("/")}const Xb="local:";function zu(e,t){const n=$t(e),a=Array.isArray(n.sounds)?n.sounds:[],s=new Set,o=[];for(const i of a){const l=$t(i),c=V(l.id,160),d=`${Xb}${c}`,u=V(l.role),h=V(l.license,40)||"unknown",p=ci(l.audio),f=V(l.sha256,64).toLowerCase(),g=V(l.title,160);if(!c||s.has(d)||!ar.includes(u)||!p||!g||!sr.test(f))continue;s.add(d);const w=$t(l.measures),m=Me(w.gain_db),b=$t(l.source),v=V(l.license_status,20);o.push({id:d,origin:"local",licenseStatus:Nu.includes(v)?v:"unknown",permission:V(l.permission,300),role:u,title:g,instrument:g.split(" · ")[0]??g,tags:(Array.isArray(l.tags)?l.tags:[]).filter(y=>typeof y=="string").map(y=>y.toLowerCase().slice(0,40)),license:h,licenseUrl:ze(l.license_url)||or(h),creator:V(l.creator,120)||"Unknown",creatorLink:ze(l.creator_link),source:ze(b.url),audio:`local:${t}/${p}`,manifest:ci(l.manifest),sha256:f,measures:{length:Me(w.length_s,1),attack:Me(w.attack_ms,10),decay:Me(w.decay_s,.3),centroid:Me(w.centroid_hz,1e3),level:Me(w.hit_dbfs,-20)+m,gain:m},wave:typeof l.wave=="string"?Array.from(l.wave.slice(0,96),y=>Math.max(0,Pu.indexOf(y))/35):[],...Fu(l)})}return{name:V(n.name,120)||"Local Library",sounds:o}}function Ou(e){const t=/^local:[^/]+\/(.+)$/.exec(e);return t?ci(t[1]):""}function Gl(e,...t){return{name:e,sounds:t.flatMap(n=>n?.sounds??[])}}function or(e){return e==="CC0-1.0"?"https://creativecommons.org/publicdomain/zero/1.0/":e==="CC-BY-4.0"?"https://creativecommons.org/licenses/by/4.0/":e==="CC-BY-SA-4.0"?"https://creativecommons.org/licenses/by-sa/4.0/":e==="PDM-1.0"?"https://creativecommons.org/publicdomain/mark/1.0/":""}function ir(e,t="",n=""){return e==="CC0-1.0"?"CC0":e==="CC-BY-4.0"?"BY":e==="CC-BY-SA-4.0"?"BY-SA":e==="PDM-1.0"?"PD":e==="Permission-only"||n?"PERM":t==="personal"?"PERS":t==="unknown"||e==="unknown"?"?":e}function Du(e){return e.origin==="local"&&e.licenseStatus!=="redistributable"}function En(e,t=24){const n=e.trim();if(n.length<=t)return n;const[a=n,s=""]=n.split(" · "),o=s.split(/\s+/).at(-1)??"",i=/^(?:v|vl|rr|k)?\d{1,2}$|^(?:p{1,3}|mp|mf|f{1,3})\d*$/i.test(o)?o:"",l=i?`${a} ${i}`:"";return l&&l.length<=t?l:a.length<=t?a:n.slice(0,t).trim()}const di={kick:"kick",kicks:"kick",bd:"kick",bassdrum:"kick","bass drum":"kick","kick drum":"kick",snare:"snare",snares:"snare",sd:"snare","snare drum":"snare",rimshot:"snare",clap:"clap",claps:"clap",handclap:"clap",handclaps:"clap","hand clap":"clap","hand claps":"clap",hat:"hat",hats:"hat",hihat:"hat",hihats:"hat","hi-hat":"hat","hi-hats":"hat","hi hat":"hat","hi hats":"hat","high hat":"hat",hh:"hat",ch:"hat",oh:"hat",tom:"tom",toms:"tom",tomtom:"tom","floor tom":"tom",perc:"perc",percs:"perc",percussion:"perc",cymbal:"cymbal",cymbals:"cymbal",crash:"cymbal",ride:"cymbal",splash:"cymbal",china:"cymbal",fx:"fx",sfx:"fx",effect:"fx",effects:"fx",tonal:"tonal",melodic:"tonal",pitched:"tonal",bell:"tonal",bells:"tonal",mallet:"tonal",mallets:"tonal",chime:"tonal",chimes:"tonal"},Gb={ch:"closed",oh:"open"},Vl={punchy:{wants:[{measure:"attack",dir:-1},{measure:"decay",dir:-1}],tag:"punchy"},tight:{wants:[{measure:"decay",dir:-1}],tag:"tight"},snappy:{wants:[{measure:"decay",dir:-1},{measure:"centroid",dir:1}],tag:"snappy"},short:{wants:[{measure:"length",dir:-1},{measure:"decay",dir:-1}],tag:"short"},dry:{wants:[{measure:"decay",dir:-1}]},long:{wants:[{measure:"length",dir:1},{measure:"decay",dir:1}],tag:"long"},ringing:{wants:[{measure:"decay",dir:1}]},wet:{wants:[{measure:"decay",dir:1}]},big:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}],tag:"boomy"},boomy:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}],tag:"boomy"},fat:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}]},deep:{wants:[{measure:"centroid",dir:-1}],tag:"deep"},dark:{wants:[{measure:"centroid",dir:-1}],tag:"dark"},warm:{wants:[{measure:"centroid",dir:-1}]},low:{wants:[{measure:"centroid",dir:-1}]},muffled:{wants:[{measure:"centroid",dir:-1}]},bright:{wants:[{measure:"centroid",dir:1}],tag:"bright"},crisp:{wants:[{measure:"centroid",dir:1},{measure:"decay",dir:-1}]},sharp:{wants:[{measure:"centroid",dir:1},{measure:"attack",dir:-1}]},high:{wants:[{measure:"centroid",dir:1}]},airy:{wants:[{measure:"centroid",dir:1}]},loud:{wants:[{measure:"level",dir:1}],tag:"hard"},hard:{wants:[{measure:"level",dir:1}],tag:"hard"},heavy:{wants:[{measure:"level",dir:1},{measure:"centroid",dir:-1}]},soft:{wants:[{measure:"level",dir:-1}],tag:"soft"},quiet:{wants:[{measure:"level",dir:-1}],tag:"soft"},gentle:{wants:[{measure:"level",dir:-1}],tag:"soft"},ghost:{wants:[{measure:"level",dir:-1}],tag:"soft"}},ui={funk:["tight","punchy"],funky:["tight","punchy"],disco:["tight","bright"],dusty:["dark","soft"],lofi:["dark","soft"],"lo-fi":["dark","soft"],vintage:["dark"],"70s":["dark","tight"],"60s":["dark","soft"],old:["dark"],jazz:["soft","dark"],jazzy:["soft","dark"],rock:["hard","long"],metal:["hard","bright"],hiphop:["punchy","dark"],"hip-hop":["punchy","dark"],"boom bap":["punchy","dark"],boombap:["punchy","dark"],trap:["punchy","short"],techno:["tight","punchy"],house:["tight","punchy"],ambient:["long","soft"],cinematic:["big","long"],epic:["big","loud"]},Bu=new Set(["kit","kits","drumkit","drumkits","drums","set","drum kit"]),Vb=new Set("a an the some any with and or of for to me my give find get want need please like sound sounds sample samples one ones really very bit little more less that this".split(" "));function Qb(e){const t=e.toLowerCase().replace(/[^a-z0-9\s-]/g," ").split(/\s+/).filter(Boolean),n=[];for(let a=0;a<t.length;a++){const s=`${t[a]} ${t[a+1]??""}`;t[a+1]&&(s in di||s in ui||Bu.has(s))?(n.push(s),a++):n.push(t[a])}return n}function rr(e){return new Set(e.title.toLowerCase().split(/[^a-z0-9]+/).map(t=>t.replace(/\d+$/,"")).filter(t=>t.length>1))}function pi(e,t){const n={text:e.trim(),roles:[],tags:[],softTags:[],wants:[],kit:!1,kind:"",unknown:[]},a=new Set;if(t)for(const o of t.sounds){for(const i of o.tags)a.add(i);for(const i of rr(o))a.add(i)}const s=o=>{const i=Vl[o];i&&(n.wants.push(...i.wants),i.tag&&!n.softTags.includes(i.tag)&&n.softTags.push(i.tag))};for(const o of Qb(e))if(Bu.has(o))n.kit=!0;else if(o in di){const i=di[o];n.roles.includes(i)||n.roles.push(i);const l=Gb[o];(l==="open"||l==="closed")&&(n.kind=l)}else if(o in Vl)s(o);else if(o in ui)for(const i of ui[o]??[])s(i);else if(o==="open")n.kind="open";else if(o==="closed"||o==="close")n.kind="closed";else{if(Vb.has(o))continue;if(!t||a.has(o)||a.has(o.replace(/s$/,""))){const i=t&&!a.has(o)?o.replace(/s$/,""):o;n.tags.includes(i)||n.tags.push(i)}else n.unknown.push(o)}return n}function Jb(e,t){const n=[...e].sort((o,i)=>o.measures[t]-i.measures[t]),a=new Map,s=Math.max(1,n.length-1);return n.forEach((o,i)=>a.set(o.id,i/s)),a}const Zb=[{measure:"level",dir:1,weight:.5},{measure:"length",dir:-1,weight:.2}],ey=.2,ty={kick:-1,tom:-1,snare:1,clap:1,hat:1};function lr(e,t){const n=new Set(t.wants.map(i=>i.measure)),a=new Map,s=(i,l)=>{let c=a.get(i);return c||(c=Jb(e,i),a.set(i,c)),c.get(l)??.5},o=(i,l)=>i.reduce((c,d)=>{const u=s(d.measure,l);return c+(d.dir>0?u:1-u)},0)/Math.max(1,i.length);return e.map(i=>{const l=rr(i);let c=0;for(const u of t.tags)c+=i.tags.includes(u)?2:l.has(u)?1:0;t.wants.length&&(c+=2*o(t.wants,i.id));const d=ty[i.role];for(const u of[...Zb,...d?[{measure:"centroid",dir:d,weight:ey}]:[]])n.has(u.measure)||(c+=2*u.weight*o([u],i.id));for(const u of t.softTags)i.tags.includes(u)&&(c+=.4);return{sound:i,score:c}})}const Ql=(e,t)=>t.score-e.score||e.sound.title.localeCompare(t.sound.title)||e.sound.id.localeCompare(t.sound.id);function fs(e,t,n,a){let s=e.sounds.filter(o=>!a.has(o.id)&&(!t.length||t.includes(o.role)));if(n.length){const o=s.filter(i=>{const l=rr(i);return n.some(c=>i.tags.includes(c)||l.has(c))});o.length&&(s=o)}return s}function cr(e,t){const n=[...e].sort(Ql),a=[],s=new Map;for(const o of n){if(a.length>=t)break;const i=s.get(o.sound.instrument)??0;i>=Yb||(s.set(o.sound.instrument,i+1),a.push(o))}for(const o of n){if(a.length>=t)break;a.includes(o)||a.push(o)}return a.sort(Ql)}function ny(e,t){if(!t)return e;const n=e.filter(a=>a.role==="hat"&&ra(a)===t);return n.length?n:e}function ay(e,t,n={}){const a=t.kind&&!t.roles.length?["hat"]:t.roles,s=ny(fs(e,a,t.tags,n.exclude??new Set),t.kind);return cr(lr(s,t),n.limit??Cu)}const sy=[{key:"kick",label:"Kick",role:"kick",nearest:["tom","perc"]},{key:"snare",label:"Snare",role:"snare",nearest:["clap","perc"]},{key:"clap",label:"Clap",role:"clap",nearest:["snare","perc"]},{key:"closed-hat",label:"Closed hat",role:"hat",tag:"closed",nearest:["perc","cymbal"]},{key:"open-hat",label:"Open hat",role:"hat",tag:"open",nearest:["cymbal","perc"]},{key:"tom",label:"Tom",role:"tom",nearest:["perc","kick"]},{key:"perc",label:"Perc",role:"perc",nearest:["tom","tonal"]},{key:"fx",label:"FX",role:"fx",nearest:["tonal","cymbal","perc"]}];function ra(e){if(e.tags.includes("closed"))return"closed";if(e.tags.includes("open"))return"open";const t=e.title.toLowerCase();return/\bclose[d]?\b|hitc\b/.test(t)?"closed":/\bopen\b|hito\b/.test(t)?"open":""}function oy(e,t,n,a){const s=fs(e,[t.role],n.tags,a);if(t.tag){const o=s.filter(l=>ra(l)===t.tag);if(o.length)return{list:o,role:t.role,kindMissing:!1};const i=s.filter(l=>ra(l)==="");if(i.length)return{list:i,role:t.role,kindMissing:!0}}else if(s.length)return{list:s,role:t.role,kindMissing:!1};for(const o of t.nearest){const i=fs(e,[o],n.tags,a);if(i.length)return{list:i,role:o,kindMissing:!1}}return{list:[],role:t.role,kindMissing:!1}}const iy={kick:"a kick",snare:"a snare",clap:"a clap",hat:"a hat",tom:"a tom",perc:"a percussion sound",cymbal:"a cymbal",fx:"an effect",tonal:"a tonal sound"};function Jl(e,t){const n=t.wants.some(o=>o.measure==="level")?t:{...t,wants:[...t.wants,{measure:"level",dir:1}]},a=new Set,s=[];for(const o of sy){const{list:i,role:l,kindMissing:c}=oy(e,o,n,a),d=cr(lr(i,n),1)[0];if(!d)continue;a.add(d.sound.id);const u=l!==o.role?`No ${o.label.toLowerCase()} in the Library: ${iy[l]} instead.`:c?`No ${o.label.toLowerCase()} labelled as one: the nearest hat instead.`:void 0;s.push({slot:o,sound:d.sound,...u?{note:u}:{}})}return s}const dr="your local Library";function Ds(e,t){return{id:e.id,title:e.title,role:e.role,creator:e.creator,creatorLink:e.creatorLink,license:e.license,licenseUrl:e.licenseUrl,source:e.source,audio:e.audio,sha256:e.sha256,gainDb:e.measures.gain,curator:e.origin==="local"?dr:bn,query:t.trim().slice(0,120),kind:e.role==="hat"?ra(e):"",origin:e.origin,licenseStatus:e.licenseStatus}}function ry(e){if(!e||typeof e!="object"||Array.isArray(e))return null;const t=e,n=V(t.id,160),a=V(t.title,160),s=V(t.license,40),o=V(t.sha256,64).toLowerCase();if(!n||!a||!s)return null;const i=ar.includes(t.role)?t.role:"perc",l=t.kind==="closed"||t.kind==="open"?t.kind:"",c=t.origin==="local"?"local":"shelf",d=V(t.licenseStatus,20),u=c==="local"?Ou(V(t.audio,600))?V(t.audio,600):"":ze(t.audio);return{id:n,title:a,role:i,creator:V(t.creator,120)||"Unknown",creatorLink:ze(t.creatorLink),license:s,licenseUrl:ze(t.licenseUrl)||or(s),source:ze(t.source),audio:u,sha256:sr.test(o)?o:"",gainDb:Math.max(-60,Math.min(60,Me(t.gainDb))),curator:V(t.curator,80)||(c==="local"?dr:bn),query:V(t.query,120),kind:l,origin:c,licenseStatus:c==="local"&&Nu.includes(d)?d:c==="local"?"unknown":""}}function ly(e,t,n=new Set,a=3){const s=pi(t.query,e),o=new Set([...n,t.id]);let i=fs(e,[t.role],s.tags,o);if(t.role==="hat"&&t.kind){const l=i.filter(c=>ra(c)===t.kind);l.length&&(i=l)}return cr(lr(i,{...s,roles:[t.role]}),a)}function Ru(e){const t=new Map;return e.forEach((n,a)=>{const s=n.provenance;if(!s)return;const o=t.get(s.id);o?o.pads.push(a+1):t.set(s.id,{...s,pads:[a+1]})}),[...t.values()]}function cy(e){return["shelf","local"].map(n=>({origin:n,credits:e.filter(a=>(a.origin??"shelf")===n)})).filter(n=>n.credits.length)}const dy=-14,uy=-1,Iu=24,py=.05,hy=-80,Zl=e=>e>0?20*Math.log10(e):Number.NEGATIVE_INFINITY;function fy(e,t){const n=e[0]?.length??0,a=e.length;if(!n||!a)return{hit:Number.NEGATIVE_INFINITY,peak:Number.NEGATIVE_INFINITY};const s=Math.max(1,Math.round(py*t)),o=new Float64Array(n);let i=0;for(let d=0;d<n;d++){let u=0;for(const h of e){const p=h[d]??0;u+=p;const f=p<0?-p:p;f>i&&(i=f)}u/=a,o[d]=u*u}let l=0,c=0;for(let d=0;d<n;d++)l+=o[d]??0,d>=s&&(l-=o[d-s]??0),l>c&&(c=l);return{hit:Zl(Math.sqrt(Math.max(0,c)/s)),peak:Zl(i)}}function my(e){if(!Number.isFinite(e.hit)||e.hit<hy)return 0;let t=Math.min(dy-e.hit,Iu);Number.isFinite(e.peak)&&(t=Math.min(t,uy-e.peak));const n=Math.round(t*10)/10;return n===0?0:n}function An(e,t){return{on:!0,gainDb:my(fy(e,t))}}const gy=Object.freeze({on:!0,gainDb:0});function ec(e){return e.normalize?e.normalize.on:e.provenance!==null}function by(e){const t=e.normalize;return t?t.on?t.gainDb:e.provenance?-e.provenance.gainDb:0:0}function yy(e){const t=by(e);return t===0?1:10**(t/20)}function vy(e){if(!e||typeof e!="object"||Array.isArray(e))return null;const t=e;if(typeof t.on!="boolean")return null;const n=t.gainDb;return typeof n!="number"||!Number.isFinite(n)||n<-60||n>Iu?null:{on:t.on,gainDb:n}}function wy(e){const t=Math.round(e*10)/10;return t===0?"0.0 dB":`${t>0?"+":"−"}${Math.abs(t).toFixed(1)} dB`}const xy="nyx-limiter",ur={knee:.6,ceiling:.944,range:4,points:8193};function ky(e,{knee:t,ceiling:n}=ur){const a=Math.abs(e);if(a<=t)return e;const s=n-t;return Math.sign(e)*(t+s*Math.tanh((a-t)/s))}function $y({range:e,points:t}=ur){const n=new Float32Array(t);for(let a=0;a<t;a++)n[a]=ky((2*a/(t-1)-1)*e);return n}function Sy(e){const t=e.createGain();t.gain.value=1/ur.range;const n=e.createWaveShaper();return n.curve=$y(),n.oversample="none",t.connect(n),{input:t,output:n}}const la=6,Le=-60,qt=.75,qu=1.6;function Ey(e){return!Number.isFinite(e)||e<=Le?0:10**(Math.min(la,e)/20)}function Ay(e){return!Number.isFinite(e)||e<=Le?0:e>=0?qt+(1-qt)*(Math.min(e,la)/la):qt*((e-Le)/-Le)**qu}function My(e){const t=Math.min(1,Math.max(0,Number.isFinite(e)?e:0));let n;if(t>=qt)n=(t-qt)/(1-qt)*la;else{if(t<=0)return Le;n=Le+-Le*(t/qt)**(1/qu)}const a=Math.round(n*10)/10;return a<=Le+.05?Le:Math.abs(a)<.25?0:a}function Ly(e){if(!Number.isFinite(e)||e<=Le)return"−∞";const t=Math.round(e*10)/10;return t===0?"0.0 dB":`${t>0?"+":"−"}${Math.abs(t).toFixed(1)} dB`}const cn=[[0,.4],[-1.94,0],[-6.02,-2.2],[-12.04,-7.7],[-20,-15.7]];function Ty(e){if(!Number.isFinite(e)||e<=0)return Le;const t=20*Math.log10(Math.min(1,e)),n=cn[0];if(t>=n[0])return n[1];for(let o=1;o<cn.length;o++){const[i,l]=cn[o],[c,d]=cn[o-1];if(t>=i)return Math.round((d+(t-c)*(l-d)/(i-c))*10)/10}const[a,s]=cn[cn.length-1];return Math.max(Le,Math.round((t-a+s)*10)/10)}const Cy=.8,yn=["free","1/16","1/8","1/4","1/2","1","2","4","8"],Ny={free:0,"1/16":.25,"1/8":.5,"1/4":1,"1/2":2,1:4,2:8,4:16,8:32},Fy=e=>e==="hit"||yn.includes(e),_u=.5,pr=.01;function Dt(e){return e==="hit"?"To a hit":e==="free"?"Free":e.includes("/")?e:e==="1"?"1 bar":`${e} bars`}const Hu=[{id:"lfo",label:"NYX LFO",group:"nyx"},{id:"aria:phone-tilt-x",label:"Tilt X",group:"aria"},{id:"aria:phone-tilt-y",label:"Tilt Y",group:"aria"},{id:"aria:phone-heading",label:"Heading",group:"aria"},{id:"aria:phone-shake",label:"Shake",group:"aria"},{id:"aria:energy",label:"Ground Energy",group:"aria"}],tc=e=>typeof e=="string"&&Hu.some(t=>t.id===e),wo=e=>!!e&&e.startsWith("aria:"),ju=["sine","triangle","step"],Wu=[.25,.5,1,2,4,8,16],Ga=2,Uu=3,ca=16;function hr(){return{startSource:null,startAmount:.5,lengthSource:null,lengthSteps:1,lfoBars:4,lfoShape:"sine"}}const Qe=(e,t,n)=>e<t?t:e>n?n:e,nc=e=>typeof e=="number"&&Number.isFinite(e);function Py(e){const t=hr();if(typeof e!="object"||e===null)return t;const n=e;return{startSource:tc(n.startSource)?n.startSource:null,startAmount:nc(n.startAmount)?Qe(n.startAmount,0,Ga):t.startAmount,lengthSource:tc(n.lengthSource)?n.lengthSource:null,lengthSteps:nc(n.lengthSteps)?Qe(Math.round(n.lengthSteps),1,Uu):t.lengthSteps,lfoBars:Wu.includes(n.lfoBars)?n.lfoBars:t.lfoBars,lfoShape:ju.includes(n.lfoShape)?n.lfoShape:t.lfoShape}}const da=e=>!e.startSource&&!e.lengthSource;function vn(){return{aria:!1,tiltX:0,tiltY:0,heading:0,energy:.5,shakes:0,shakeRun:0,shakeBeat:Number.NEGATIVE_INFINITY}}function zy(e,t){const n=t-e.shakeBeat<=ca?e.shakeRun+1:1;return{...e,shakes:e.shakes+1,shakeRun:n,shakeBeat:t}}function Yu(e){let t=(Math.imul(e|0,2654435761)^2246822507)>>>0;return t=Math.imul(t^t>>>16,2146121005)>>>0,t=Math.imul(t^t>>>15,2221713035)>>>0,t=(t^t>>>16)>>>0,t/4294967295*2-1}function Oy(e,t){const n=Math.max(.25,e.lfoBars)*4,a=t/n,s=a-Math.floor(a);return e.lfoShape==="triangle"?s<.5?-1+4*s:3-4*s:e.lfoShape==="step"?Yu(Math.floor(a)):Math.sin(2*Math.PI*s)}function fr(e,t,n,a){if(e==="lfo")return Oy(t,a);if(!n.aria)return 0;switch(e){case"aria:phone-tilt-x":return Qe(n.tiltX,-1,1);case"aria:phone-tilt-y":return Qe(n.tiltY,-1,1);case"aria:phone-heading":return Qe(n.heading,0,1)*2-1;case"aria:energy":return Qe(n.energy,0,1)*2-1;case"aria:phone-shake":return n.shakes>0?Yu(n.shakes):0}return 0}function hi(e,t,n){return e.startSource?fr(e.startSource,e,t,n)*e.startAmount:0}function fi(e,t,n){const a=e.lengthSource;return a?a==="aria:phone-shake"?!t.aria||t.shakeRun<=0||n-t.shakeBeat>ca?0:-Math.min(t.shakeRun,e.lengthSteps):Math.round(fr(a,e,t,n)*e.lengthSteps):0}function mi(e,t,n){const a=e?.lengthSource;if(!e||!a)return 1;if(a==="aria:phone-shake")return!t.aria||t.shakeRun<=0||n-t.shakeBeat>ca?1:1+Math.min(t.shakeRun,e.lengthSteps);const s=fr(a,e,t,n);return 1+Math.round((Qe(s,-1,1)+1)/2*e.lengthSteps)}function Vn(e,t){if(e==="free"||!t)return e;const n=Qe(yn.indexOf(e)+t,1,yn.length-1);return yn[n]??e}function Ku(e,t){let n=t,a=Number.POSITIVE_INFINITY;for(const s of e){const o=Math.abs(s-t);o<a&&(a=o,n=s)}return n}function mr(e,t,n,a){let s=0;for(const o of e)if(o>t+a&&(s++,s>=Math.max(1,n)))return o;return null}function Dy(e,t,n){if(!e?.length)return null;const a=Ku(e,t);return Math.abs(a-t)<=n?a:null}function ms(e,t,n,a){return Ny[e]*60/Math.max(1,t)*n*Math.max(.001,a)}function By(e,t,n,a){const{frames:s,sampleRate:o}=e,i=e.mod,l=i?hi(i,t,n):0,c=Math.max(0,s-2),d=e.hits?.length?e.hits:null;let u=Qe(Math.round(e.start+l*o),0,c);e.land&&d&&i?.startSource&&(u=Qe(Ku(d,u),0,c));let h,p=!1,f;if(e.grid==="hit")if(f="hit",d){const g=mi(i,t,n);h=mr(d,u,g,pr*o)??s}else h=e.end+(u-e.start);else f=i?Vn(e.grid,fi(i,t,n)):e.grid,f==="free"?h=e.end+(u-e.start):h=u+Math.round(ms(f,a,o,e.rate));return h>s&&(h=s,p=f!=="free"&&f!=="hit"),h<u+2&&(h=Math.min(s,u+2)),{from:u,to:h,grid:f,shift:l,clamped:p}}const gi=["C","C♯","D","E♭","E","F","F♯","G","A♭","A","B♭","B"],Kt=21,Xt=108,Ry=4,bi=60,Xu=.25,Iy=4;function Je(e){const t=Math.round(e);return`${gi[(t%12+12)%12]}${Math.floor(t/12)-1}`}const qy={c:0,d:2,e:4,f:5,g:7,a:9,b:11};function Va(e){const t=e.trim();if(/^\d{1,3}$/.test(t)){const i=Number(t);return i>=0&&i<=127?i:null}const n=/^([a-gA-G])(#|♯|b|♭|s)?(-?\d)$/.exec(t);if(!n)return null;const a=qy[n[1].toLowerCase()],s=n[2]==="#"||n[2]==="♯"||n[2]==="s"?1:n[2]==="b"||n[2]==="♭"?-1:0,o=(Number(n[3])+1)*12+a+s;return o>=0&&o<=127?o:null}const ac=["ppp","pp","p","mp","mf","f","ff","fff"];function _y(e){const n=e.replace(/\.[^.]+$/,"").split(/[_\-\s.,()[\]]+/).filter(Boolean);let a=null,s=null,o=null,i=null;for(const l of n){const c=l,d=c.toLowerCase(),u=/^rr(\d{1,2})$/.exec(d);if(u){o=Number(u[1]);continue}const h=ac.indexOf(d);if(h>=0&&c.length<=3){s={label:d,rank:h*2+1};continue}const p=/^(?:v|vel|velocity)(\d{1,3})$/.exec(d);if(p){s={label:`v${Number(p[1])}`,rank:Number(p[1])};continue}const f=/^([a-gA-G](?:#|♯|b|♭|s)?-?\d)(v\d{1,3}|ppp|pp|p|mp|mf|f|ff|fff)$/.exec(c);if(f&&a===null){a=Va(f[1]);const g=f[2].toLowerCase(),w=ac.indexOf(g);s=w>=0?{label:g,rank:w*2+1}:{label:`v${Number(g.slice(1))}`,rank:Number(g.slice(1))};continue}if(a===null&&/^[A-G](#|♯|b|♭|s)?-?\d$/.test(c)){a=Va(c);continue}if(a===null&&/^[a-g](#|♯|b|♭)?-?\d$/.test(c)){a=Va(c);continue}if(/^\d{2,3}$/.test(c)){const g=Number(c);g>=Kt&&g<=Xt&&i===null&&(i=g)}}return a===null&&i!==null&&(a=i),{key:a,layer:s,rr:o}}const Hy=new Set(["sample","lokey","hikey","key","pitch_keycenter","lovel","hivel","tune","transpose","volume","loop_mode","loopmode","loop_start","loopstart","loop_end","loopend","ampeg_release","seq_length","seq_position","default_path","trigger"]);function Da(e){return e===void 0?null:Va(e.trim())}function jy(e){const t=[],n=new Map,a=new Set;let s=e.replace(/\/\*[\s\S]*?\*\//g," ");s=s.split(/\r?\n/).map(c=>{const d=c.indexOf("//");if(d>=0){const u=c.slice(d+2).trim();return u&&t.push(u),c.slice(0,d)}return c}).map(c=>{const d=/^\s*#define\s+(\$\w+)\s+(.+?)\s*$/.exec(c);return d?(n.set(d[1],d[2]),""):/^\s*#include/.test(c)?(a.add("#include"),""):c}).join(`
`);for(const[c,d]of n)s=s.split(c).join(d);const o={control:{},global:{},master:{},group:{}},i=[],l=s.split(/<(\w+)>/);for(let c=1;c<l.length;c+=2){const d=l[c].toLowerCase(),u=Wy(l[c+1]??"");if(d==="control")o.control=u;else if(d==="global")o.global=u,o.master={},o.group={};else if(d==="master")o.master=u,o.group={};else if(d==="group")o.group=u;else if(d==="region"){const h={...o.global,...o.master,...o.group,...u};for(const x of Object.keys(h))Hy.has(x)||a.add(x);const p=(h.trigger??"attack").toLowerCase();if(p==="release"||p==="release_key"||!h.sample)continue;const f=o.control.default_path??"",g=Da(h.key);let w=Da(h.lokey)??g??0,m=Da(h.hikey)??g??127;const b=Da(h.pitch_keycenter)??g??60;w>m&&([w,m]=[m,w]);const v=(h.loop_mode??h.loopmode??"").toLowerCase(),y=x=>x!==void 0&&Number.isFinite(Number(x))?Number(x):null;i.push({sample:(f+h.sample).replace(/\\/g,"/"),lokey:w,hikey:m,center:b,lovel:Math.max(1,Math.min(127,y(h.lovel)??1)),hivel:Math.max(1,Math.min(127,y(h.hivel)??127)),tune:(y(h.tune)??0)+(y(h.transpose)??0)*100,volume:y(h.volume)??0,loopMode:v==="loop_continuous"?"continuous":v==="loop_sustain"?"sustain":"none",loopStart:y(h.loop_start??h.loopstart),loopEnd:y(h.loop_end??h.loopend),release:y(h.ampeg_release),seqLength:Math.max(1,Math.round(y(h.seq_length)??1)),seqPosition:Math.max(1,Math.round(y(h.seq_position)??1))})}}return{regions:i,comments:t,unsupported:[...a].sort()}}function Wy(e){const t={},n=/([A-Za-z_][\w]*)=/g,a=[];let s=n.exec(e);for(;s;)a.push({name:s[1].toLowerCase(),at:s.index,end:s.index+s[0].length}),s=n.exec(e);for(let o=0;o<a.length;o++){const i=a[o],l=o+1<a.length?a[o+1].at:e.length;let c=e.slice(i.end,l);c=i.name==="sample"||i.name==="default_path"?c.trim():c.trim().split(/\s+/)[0]??"",t[i.name]=c}return t}function aa(e){return[...new Set(e.filter(t=>t.key!==null).map(t=>t.rank))].sort((t,n)=>t-n)}function Uy(e,t){const n=Math.max(1,Math.min(e.length,Math.round(t)));if(n>=e.length)return[...e];if(n===1)return[e[Math.round((e.length-1)*.6)]];const a=[];for(let s=0;s<n;s++)a.push(e[Math.round(s*(e.length-1)/(n-1))]);return[...new Set(a)]}function Gu(e,t,n){const a=e.filter(c=>c.key!==null&&t.includes(c.rank)),s=[...t].sort((c,d)=>c-d),o=c=>{const d=s.indexOf(c),u=d<=0?1:Math.floor(d*127/s.length)+1,h=d>=s.length-1?127:Math.floor((d+1)*127/s.length);return[u,h]},i=[],l=new Map;for(const c of a){const d=`${c.rank}|${c.key}`;l.set(d,Math.max(l.get(d)??0,c.rr))}for(const c of s){const d=a.filter(f=>f.rank===c),u=[...new Set(d.map(f=>f.key))].sort((f,g)=>f-g),[h,p]=o(c);for(const f of d){const g=f.region,w=f.key;let m,b;if(g&&!(f.source==="you"||f.source==="heard"))m=g.lokey,b=g.hikey;else{const v=u.indexOf(w);m=v<=0?Kt:Math.floor((u[v-1]+w)/2)+1,b=v>=u.length-1?Xt:Math.floor((w+u[v+1])/2)}i.push({s:n(f),key:g&&f.source==="sfz"?g.center:w,lo:m,hi:b,lv:h,hv:p,rr:g&&g.seqLength>1?g.seqPosition:Math.max(1,f.rr),of:g&&g.seqLength>1?g.seqLength:Math.max(1,l.get(`${f.rank}|${f.key}`)??1),tune:g?.tune??0,gain:g?.volume??0,loop:g&&g.loopMode!=="none"&&g.loopStart!==null&&g.loopEnd!==null&&g.loopEnd>g.loopStart?[g.loopStart,g.loopEnd]:null,release:g?.release??Xu})}}return i}function Yy(e,t,n,a=0){if(!e.length)return null;const s=Math.max(1,Math.min(127,Math.round(n)));let o=e.filter(l=>t>=l.lo&&t<=l.hi&&s>=l.lv&&s<=l.hv);if(o.length||(o=e.filter(l=>t>=l.lo&&t<=l.hi)),!o.length){let l=Number.POSITIVE_INFINITY;for(const d of e)l=Math.min(l,Math.abs(d.key-t));o=e.filter(d=>Math.abs(d.key-t)===l);const c=Math.min(...o.map(d=>Math.min(Math.abs(d.lv-s),Math.abs(d.hv-s))));o=o.filter(d=>Math.min(Math.abs(d.lv-s),Math.abs(d.hv-s))===c)}const i=Math.max(...o.map(l=>l.of));if(i>1){const l=a%i+1,c=o.filter(d=>d.rr===l);c.length&&(o=c)}return o[0]??null}function Ky(e,t){return t-e.key+e.tune/100}function Xy(e){const t=new Map;for(let n=Kt;n<=Xt;n++){const a=e.filter(o=>n>=o.lo&&n<=o.hi);if(!a.length){t.set(n,"silent");continue}const s=Math.min(...a.map(o=>Math.abs(o.key-n)));t.set(n,s===0?"sampled":s<=Ry?"near":"far")}return t}function Gy(e,t){return e*t*4}function Vy(e,t,n){let a=0;for(const s of e)s.frames&&s.channels&&s.rate?a+=Gy(s.frames*t/s.rate,s.channels):a+=s.bytes*(n[s.ext]??n.default??4);return Math.round(a)}function sc(e){const t=e/1048576;return t>=100?`${Math.round(t)} MB`:`${t.toFixed(t>=10?0:1)} MB`}function Vu(e){if(e.byteLength<44)return null;const t=new DataView(e),n=l=>String.fromCharCode(t.getUint8(l),t.getUint8(l+1),t.getUint8(l+2),t.getUint8(l+3));if(n(0)!=="RIFF"||n(8)!=="WAVE")return null;let a=12,s=0,o=0,i=0;for(;a+8<=e.byteLength;){const l=n(a),c=t.getUint32(a+4,!0);if(l==="fmt ")s=t.getUint16(a+10,!0),o=t.getUint32(a+12,!0),i=t.getUint16(a+22,!0);else if(l==="data")return!s||!i?null:{frames:Math.floor(c/(s*(i/8))),channels:s,rate:o};a+=8+c+c%2}return null}const Bs={major:[0,2,4,5,7,9,11],minor:[0,2,3,5,7,8,10],dorian:[0,2,3,5,7,9,10],pentatonic:[0,3,5,7,10],chromatic:[0,1,2,3,4,5,6,7,8,9,10,11]},oc={major:"Major",minor:"Minor",dorian:"Dorian",pentatonic:"Pentatonic",chromatic:"Chromatic"};function Qy(e,t,n,a){const s=Bs[t],o=Math.floor(a/s.length),i=(a%s.length+s.length)%s.length;return(n+1)*12+e+o*12+s[i]}function Jy(e,t,n,a){const s=[],o=Bs[t].length,i=a==="scale"?4:t==="chromatic"?5:o===5?2:3;for(let l=0;l<4;l++)for(let c=0;c<4;c++)s.push(Qy(e,t,n,l*i+c));return s}function Zy(e){return`${Je(Math.min(...e))}–${Je(Math.max(...e))}`}const e0=[["",[0,4,7]],["m",[0,3,7]],["dim",[0,3,6]],["aug",[0,4,8]],["sus2",[0,2,7]],["sus4",[0,5,7]],["7",[0,4,7,10]],["maj7",[0,4,7,11]],["m7",[0,3,7,10]],["mMaj7",[0,3,7,11]],["m7♭5",[0,3,6,10]],["dim7",[0,3,6,9]],["6",[0,4,7,9]],["m6",[0,3,7,9]],["add9",[0,2,4,7]],["madd9",[0,2,3,7]],["9",[0,2,4,7,10]],["maj9",[0,2,4,7,11]],["m9",[0,2,3,7,10]],["7sus4",[0,5,7,10]],["5",[0,7]]],ic=["C","C♯","D","E♭","E","F","F♯","G","A♭","A","B♭","B"];function t0(e){const t=[...new Set(e.map(o=>Math.round(o)))].sort((o,i)=>o-i);if(t.length<2)return null;const n=[...new Set(t.map(o=>(o%12+12)%12))];if(n.length<2)return null;const a=(t[0]%12+12)%12;let s=null;for(const o of n){const i=n.map(l=>(l-o+12)%12).sort((l,c)=>l-c);for(const[l,c]of e0){if(c.length!==i.length||!c.every((h,p)=>h===i[p]))continue;const d=`${ic[o]}${l}${o===a?"":`/${ic[a]}`}`,u=(o===a?0:1)+(l.length>3?.5:0);(!s||u<s.score)&&(s={name:d,score:u})}}return s?.name??null}const he=(e,t,n,a)=>typeof e=="number"&&Number.isFinite(e)?Math.min(n,Math.max(t,e)):a,n0=/^[0-9a-f]{16,64}$/;function a0(e){const t=e&&typeof e=="object"?e:null;if(!t||typeof t.s!="string"||!n0.test(t.s))return null;const n=Array.isArray(t.loop)&&t.loop.length===2?t.loop.map(a=>he(a,0,1e9,0)):null;return{s:t.s,key:Math.round(he(t.key,0,127,60)),lo:Math.round(he(t.lo,0,127,0)),hi:Math.round(he(t.hi,0,127,127)),lv:Math.round(he(t.lv,1,127,1)),hv:Math.round(he(t.hv,1,127,127)),rr:Math.round(he(t.rr,1,64,1)),of:Math.round(he(t.of,1,64,1)),tune:he(t.tune,-4800,4800,0),gain:he(t.gain,-96,24,0),loop:n&&n[1]>n[0]?[n[0],n[1]]:null,release:he(t.release,.005,20,Xu)}}function Qu(e){const t=e&&typeof e=="object"?e:null;if(!t)return null;const n=(Array.isArray(t.zones)?t.zones:[]).map(a0).filter(s=>!!s);if(!n.length)return null;const a=Object.keys(Bs).includes(t.scale)?t.scale:"minor";return{name:typeof t.name=="string"?t.name.slice(0,80):"Instrument",credit:typeof t.credit=="string"?t.credit.slice(0,200):"",zones:n,layers:Math.round(he(t.layers,1,64,1)),layersFound:Math.round(he(t.layersFound,1,64,1)),poly:t.poly!==!1,glideMs:he(t.glideMs,0,2e3,bi),root:Math.round(he(t.root,0,11,0)),scale:a,rows:t.rows==="fourth"?"fourth":"scale",octave:Math.round(he(t.octave,0,7,3)),gainDb:he(t.gainDb,-48,48,0)}}const ne=16,pe=16,Mn=10,yi=["1","2","3","4","5","6","7","8","9","0"],Ju=[0,2,4,8,16],Zu=[0,1,2,4,8],gs=["always","1:2","2:2","1:3","2:3","3:3","1:4","2:4","3:4","4:4","1:5","2:5","3:5","4:5","5:5","1:6","2:6","3:6","4:6","5:6","6:6","1:7","2:7","3:7","4:7","5:7","6:7","7:7","1:8","2:8","3:8","4:8","5:8","6:8","7:8","8:8","fill","!fill","pre","!pre"],bs={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}};function at(e){return{name:`Pad ${e+1}`,sample:null,mode:"oneshot",dir:"fwd",start:0,end:1,slices:0,cuts:[],tune:0,fine:0,fit:0,fitSpan:null,keepPitch:!0,attack:0,decay:4,cutoff:0,resonance:0,levelDb:0,pan:0,choke:0,provenance:null,rights:null,normalize:null,offsetDb:0,follow:null,note:0,retrigger:"cut",length:"free",hitSense:_u,landOnHits:!1,mod:hr()}}function ua(e){return!e.sample||e.fit>0?!1:e.follow??e.provenance?.role==="tonal"}function s0(e,t){const n=/^(\d):(\d)$/.exec(e.cond);return!e.on||!n?{}:{mark:n[1],markLabel:`${t===pe?"bar":"pass"} ${n[1]} of ${n[2]}`}}function $a(){return{on:!1,accent:!1,velocity:.8,chance:1,slice:null,pitch:0,reverse:!1,cond:"always"}}function Rs(){return{length:pe,mute:!1,solo:!1,steps:Array.from({length:pe},$a)}}function ep(){return{filter:{on:!0,mode:"lp",cutoff:1,resonance:.15},drive:structuredClone(bs.drive),compressor:structuredClone(bs.compressor)}}function vi(){return{v:1,pads:Array.from({length:ne},(e,t)=>at(t)),lanes:Array.from({length:ne},Rs),swing:.5,hacks:ep(),slots:Array.from({length:Mn},()=>null),active:null,selected:0,master:1,mode:"pads",inst:null}}const ut=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{},ue=(e,t,n,a)=>typeof e=="number"&&Number.isFinite(e)?Math.min(n,Math.max(t,e)):a,ct=(e,t,n,a)=>Math.round(ue(e,t,n,a)),Lt=(e,t)=>typeof e=="boolean"?e:t,ys=(e,t,n)=>t.includes(e)?e:n,jn=/^[0-9a-f]{16,64}$/,o0=1e-6;function i0(e,t){const n=ut(e),a=at(t);let s=ue(n.start,0,1,0),o=ue(n.end,0,1,1);o-s<o0&&([s,o]=[0,1]);const i=Ju.includes(n.slices)?n.slices:0,l=typeof n.cuts=="string"&&n.cuts.length<=np?n.cuts.split(" ").map(Number):n.cuts,c=Array.isArray(l)?l.filter(d=>typeof d=="number"&&d>0&&d<1).sort((d,u)=>d-u).slice(0,15):[];return{name:typeof n.name=="string"&&n.name.trim()?n.name.trim().slice(0,24):a.name,sample:typeof n.sample=="string"&&jn.test(n.sample)?n.sample:null,mode:ys(n.mode,["oneshot","gate","loop"],a.mode),dir:ys(n.dir,["fwd","rev","pingpong"],a.dir),start:s,end:o,slices:i,cuts:i?c:[],tune:ct(n.tune,-24,24,0),fine:ct(n.fine,-100,100,0),fit:Zu.includes(n.fit)?n.fit:0,fitSpan:w0(n.fitSpan),keepPitch:Lt(n.keepPitch,!0),attack:ue(n.attack,0,.1,a.attack),decay:ue(n.decay,.01,4,a.decay),cutoff:ue(n.cutoff,-1,1,0),resonance:ue(n.resonance,0,1,0),levelDb:typeof n.levelDb=="number"&&Number.isFinite(n.levelDb)?ue(n.levelDb,Le,la,a.levelDb):typeof n.level=="number"?Ty(ue(n.level,0,1,.8)):a.levelDb,pan:ue(n.pan,-1,1,0),choke:ct(n.choke,0,4,0),provenance:typeof n.sample=="string"&&jn.test(n.sample)?ry(n.provenance):null,rights:typeof n.sample=="string"&&jn.test(n.sample)&&n.rights==="unknown"?"unknown":null,normalize:typeof n.sample=="string"&&jn.test(n.sample)?vy(n.normalize):null,offsetDb:typeof n.sample=="string"&&jn.test(n.sample)?ue(n.offsetDb,-24,0,0):0,follow:typeof n.follow=="boolean"?n.follow:null,note:ct(n.note,0,11,0),retrigger:n.retrigger==="finish"?"finish":"cut",length:Fy(n.length)?n.length:"free",hitSense:ue(n.hitSense,0,1,_u),landOnHits:n.landOnHits===!0,mod:Py(n.mod)}}function r0(e){const t=ut(e);return{on:Lt(t.on,!1),accent:Lt(t.accent,!1),velocity:ue(t.velocity,0,1,.8),chance:ue(t.chance,0,1,1),slice:t.slice===null||t.slice===void 0?null:ct(t.slice,0,15,0),pitch:ct(t.pitch,-12,12,0),reverse:Lt(t.reverse,!1),cond:ys(t.cond,gs,"always")}}function l0(e){const t=ut(e),n=Array.isArray(t.steps)?t.steps:typeof t.steps=="string"?g0(t.steps):[];return{length:ct(t.length,1,pe,pe),mute:Lt(t.mute,!1),solo:Lt(t.solo,!1),steps:Array.from({length:pe},(a,s)=>r0(n[s]))}}function rc(e,t){const n=ut(e),a={...t.dials};for(const[s,o]of Object.entries(ut(n.dials)))s in t.dials&&typeof o=="number"&&Number.isFinite(o)&&(a[s]=o);return{on:Lt(n.on,t.on),dials:a}}function c0(e){const t=ut(e),n=ut(t.filter),a=ep();return{filter:{on:Lt(n.on,a.filter.on),mode:ys(n.mode,["lp","hp","bp"],a.filter.mode),cutoff:ue(n.cutoff,0,1,a.filter.cutoff),resonance:ue(n.resonance,0,1,a.filter.resonance)},drive:rc(t.drive,bs.drive),compressor:rc(t.compressor,bs.compressor)}}function vs(e){const t=ut(e),n=Array.isArray(t.pads)?t.pads:[],a=Array.isArray(t.lanes)?t.lanes:[];return{pads:Array.from({length:ne},(s,o)=>i0(n[o],o)),lanes:Array.from({length:ne},(s,o)=>l0(a[o])),swing:ue(t.swing,.5,.75,.5),hacks:c0(t.hacks)}}function tp(e){const t=ut(e);if(t.v!==1)return vi();const n=Array.isArray(t.slots)?t.slots:[],a=vs(t),s=Array.from({length:Mn},(i,l)=>n[l]?vs(n[l]):null),o=t.active===null?null:ct(t.active,0,Mn-1,-1);return{v:1,...a,slots:s,active:o!==null&&o>=0&&s[o]?o:null,selected:ct(t.selected,0,ne-1,0),master:ue(t.master,0,1,1),mode:t.mode==="instrument"?"instrument":"pads",inst:Qu(t.inst)}}function gr(e,t){return structuredClone({index:t,pad:e.pads[t]??at(t),lane:e.lanes[t]??Rs()})}function d0(e,t){const n=structuredClone(t);e.pads[n.index]=n.pad,e.lanes[n.index]=n.lane}function Is(e,t){const n=(o,i)=>o.index??i,a=t.map((o,i)=>gr(e,n(o,i))),s=t.map((o,i)=>o.hat?e.pads[n(o,i)]?.choke??0:0).find(o=>o>0)??1;return t.forEach((o,i)=>{const l=at(n(o,i));l.sample=o.sample,l.name=o.name.slice(0,24)||l.name,l.provenance=o.provenance,l.normalize=o.normalize!==void 0?o.normalize&&{...o.normalize}:o.provenance?{on:!0,gainDb:0}:null,o.hat&&(l.choke=s),e.pads[n(o,i)]=l}),a}function u0(e,t){const n=Array.from({length:ne},(a,s)=>gr(e,s));for(let a=0;a<ne;a++)e.pads[a]=at(a);return Is(e,t),n}const pa=8;function p0(e,t,n,a=0){const s=e.pads[t],o=e.lanes[t];if(!s||!o)return;s.mode="oneshot",s.dir="fwd",s.decay=4,s.attack=0,s.fit=n,s.keepPitch=!0,s.slices=0,s.cuts=[],o.length=pe;for(const l of o.steps)Object.assign(l,$a());const i=o.steps[0];n<=pa&&i&&(i.on=!0,i.cond=n===1?"always":`${a%n+1}:${n}`)}function h0(e,t=ne){if(typeof e!="string"||!/^\d{1,3}$/.test(e))return-1;const n=Number(e)-1;return n>=0&&n<t?n:-1}function br(e){return structuredClone({pads:e.pads,lanes:e.lanes,swing:e.swing,hacks:e.hacks})}const np=4096;function f0(e){const t=$a(),n=e.map(a=>{let s="";return a.on!==t.on&&(s+="x"),a.accent!==t.accent&&(s+="a"),a.reverse!==t.reverse&&(s+="r"),a.velocity!==t.velocity&&(s+=`v${a.velocity}`),a.chance!==t.chance&&(s+=`c${a.chance}`),a.slice!==t.slice&&a.slice!==null&&(s+=`s${a.slice}`),a.pitch!==t.pitch&&(s+=`p${a.pitch}`),a.cond!==t.cond&&(s+=`k${a.cond}`),s||"-"});for(;n.at(-1)==="-";)n.pop();return n.join(" ")}const m0="-?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[+-]?\\d+)?",lc=new RegExp(`[xar]|[vcsp]${m0}|k\\S+$`,"gy");function g0(e){return e.length>np?[]:e.split(" ").slice(0,pe).map(t=>{const n={};if(t==="-"||t==="")return n;lc.lastIndex=0;let a=0;for(const s of t.matchAll(lc)){const o=s[0];a+=o.length;const i=o.slice(1);o==="x"?n.on=!0:o==="a"?n.accent=!0:o==="r"?n.reverse=!0:o[0]==="v"?n.velocity=Number(i):o[0]==="c"?n.chance=Number(i):o[0]==="s"?n.slice=Number(i):o[0]==="p"?n.pitch=Number(i):o[0]==="k"&&(n.cond=i)}return a===t.length?n:{}})}function b0(e){const t=e.pads.map((a,s)=>{const o=at(s),i={};for(const[l,c]of Object.entries(a))l==="cuts"?a.cuts.length&&(i.cuts=a.cuts.join(" ")):l==="mod"?da(a.mod)||(i.mod=a.mod):o[l]!==c&&(i[l]=c);return i}),n=e.lanes.map(a=>({...a.length!==pe?{length:a.length}:{},...a.mute?{mute:!0}:{},...a.solo?{solo:!0}:{},steps:f0(a.steps)}));return structuredClone({pads:t,lanes:n,swing:e.swing,hacks:e.hacks})}function ha(e){const t=new Set;for(const n of[e,...e.slots])for(const a of n?.pads??[])a.sample&&t.add(a.sample);for(const n of e.inst?.zones??[])t.add(n.s);return t}function ap(){try{return globalThis.localStorage??null}catch{return null}}function y0(e,t=ap()){try{const n=t?.getItem(e);return n?tp(JSON.parse(n)):vi()}catch{return vi()}}function v0(e,t,n=ap()){try{return n?.setItem(e,JSON.stringify(t)),!!n}catch{return!1}}function w0(e){if(!Array.isArray(e)||e.length!==2)return null;const[t,n]=e;return typeof t!="number"||typeof n!="number"||!Number.isFinite(t)||!Number.isFinite(n)?null:t>=0&&n<=1&&n-t>1e-6?[t,n]:null}const yt=1e-6;function x0(e,t){return Math.min(127,Math.max(0,(t+1)*12+(e%12+12)%12))}class xo{entries=[];add(t){for(const n of t){let a=this.entries.find(o=>o.chord?.hit===n.hit&&Math.abs(o.startBeat-n.startBeat)<yt);a||(a={startBeat:n.startBeat,chord:{root:n.root,notes:[],startBeat:n.startBeat,lengthBeats:0,sounding:!0,hit:n.hit}},this.insert(a));const s=a.chord;s.notes.includes(n.note)||(s.notes.push(n.note),s.notes.sort((o,i)=>o-i)),s.lengthBeats=Math.max(s.lengthBeats,n.lengthBeats)}}off(t){if(t===void 0){this.entries=[];return}this.entries=this.entries.filter(n=>n.startBeat<t-yt),this.entries.push({startBeat:t,chord:null})}cut(t){this.entries=this.entries.filter(n=>n.startBeat<t-yt)}points(t=Number.NEGATIVE_INFINITY){let n=0;for(let a=0;a<this.entries.length;a++)this.entries[a].startBeat<=t+yt&&(n=a);return this.entries.slice(n).map(a=>({beat:a.startBeat,root:a.chord?a.chord.root:null}))}chordAt(t){let n=null;for(const s of this.entries){if(s.startBeat>t+yt)break;n=s}if(!n?.chord)return null;const a=n.chord;return{...a,notes:[...a.notes],sounding:t<a.startBeat+a.lengthBeats-yt}}pitchAt(t,{octave:n}={}){const a=this.chordAt(t);return a?n===void 0?a.root:x0(a.root,n):null}prune(t){let n=0;for(let a=0;a<this.entries.length;a++)this.entries[a].startBeat<=t+yt&&(n=a);n>0&&this.entries.splice(0,n)}get size(){return this.entries.length}insert(t){let n=this.entries.length;for(;n>0&&this.entries[n-1].startBeat>t.startBeat+yt;)n--;this.entries.splice(n,0,t)}}const Ve=1,ws=1024,k0=48,sp=128,xs=40,cc=64,dc=8,uc=16,pc=1024,yr=16,op=36,vr=255,$0=["chord","root","top"],S0=["chord","root","top","arp","note"],E0=e=>op+e-1;function A0(e){const t=e-op+1;return Number.isInteger(t)&&t>=1&&t<=yr?t:null}const Ba=256,hc=2,fc=128;function M0(e){const t=e.split("|");if(t.length<5)return null;const n=Number(t[t.length-4]);return Number.isInteger(n)?n:null}const fa=e=>typeof e=="object"&&e!==null,Ae=e=>typeof e=="string"&&e.length>0&&e.length<=sp,ve=e=>typeof e=="number"&&Number.isFinite(e);function mc(e){return fa(e)?Ae(e.id)?Ae(e.source)?!Number.isInteger(e.note)||e.note<0||e.note>127?"note must be a whole number 0–127":!ve(e.velocity)||e.velocity<0||e.velocity>1?"velocity must be 0–1":ve(e.startBeat)?!ve(e.lengthBeats)||e.lengthBeats<0?"bad lengthBeats":!ve(e.spanBeats)||e.spanBeats<=0?"bad spanBeats":!ve(e.gate)||e.gate<=0||e.gate>1?"gate must be above 0, at most 1":!ve(e.offsetSec)||Math.abs(e.offsetSec)>2?"bad offsetSec":typeof e.role!="string"||!S0.includes(e.role)?"bad role":Number.isInteger(e.hit)?!Number.isInteger(e.root)||e.root<0||e.root>127?"bad root":e.slice!==void 0&&!ip(e.slice)?`slice must be a whole number 0–${vr}`:null:"bad hit":"bad startBeat":"bad source":"bad id":"not an object"}const ip=e=>Number.isInteger(e)&&e>=0&&e<=vr,L0=e=>Number.isInteger(e)&&e>=1&&e<=yr;function rp(e){return fa(e)?Ae(e.id)?ve(e.beat)?e.type==="slot"?!Number.isInteger(e.slot)||e.slot<1||e.slot>uc?`slot must be a whole number 1–${uc}`:null:e.type==="chordPad"?e.pad!==null&&!L0(e.pad)?`pad must be a whole number 1–${yr}, or null`:null:e.type==="take"?Ae(e.take)?!ve(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>Ba?`lengthBeats must be above 0, at most ${Ba}`:e.gain!==void 0&&(!ve(e.gain)||e.gain<0||e.gain>hc)?`gain must be 0–${hc}`:e.offsetBeats!==void 0&&(!ve(e.offsetBeats)||e.offsetBeats<0||e.offsetBeats>=e.lengthBeats)?"offsetBeats must be from 0, below lengthBeats":e.peaks!==void 0&&!(Array.isArray(e.peaks)&&e.peaks.length<=fc&&e.peaks.every(t=>ve(t)&&t>=0&&t<=1))?`peaks must be at most ${fc} values 0–1`:null:"bad take":e.type==="lap"?!ve(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>Ba?`lengthBeats must be above 0, at most ${Ba}`:null:"bad type":"bad beat":"bad id":"not an object"}function T0(e){if(!fa(e))return"not an object";if(e.type!=="note")return rp(e);if(!Ae(e.id))return"bad id";if(!ve(e.beat))return"bad beat";if(typeof e.on!="boolean")return"on must be true or false";if(!Number.isInteger(e.note)||e.note<0||e.note>127)return"note must be a whole number 0–127";if(e.on){if(!ve(e.velocity)||e.velocity<=0||e.velocity>1)return"velocity must be above 0, at most 1";if(e.slice!==void 0&&!ip(e.slice))return`slice must be a whole number 0–${vr}`;if(e.name!==void 0&&(typeof e.name!="string"||!e.name.length||e.name.length>xs))return`name must be 1–${xs} characters`}else if(e.velocity!==void 0||e.slice!==void 0||e.name!==void 0)return"an off has no velocity, slice or name";return null}function gc(e,t){if(!Array.isArray(e))return"events must be a list";if(e.length>ws)return`more than ${ws} events`;for(let n=0;n<e.length;n++){const a=t(e[n]);if(a)return`event ${n}: ${a}`}return null}function C0(e){if(!fa(e))return"not an object";if(e.v!==Ve)return`version ${String(e.v)} is not ${Ve}`;if(e.kind==="notes"){if(!Ae(e.source))return"bad source";if(!Array.isArray(e.events))return"events must be a list";if(e.events.length>ws)return`more than ${ws} events`;for(let t=0;t<e.events.length;t++){const n=mc(e.events[t]);if(n)return`event ${t}: ${n}`;if(e.events[t].source!==e.source)return`event ${t}: from another source`}return null}if(e.kind==="audition"){if(!Ae(e.source))return"bad source";if(!Array.isArray(e.events))return"events must be a list";if(e.events.length>cc)return`more than ${cc} notes`;if(!ve(e.holdSec)||e.holdSec<=0||e.holdSec>dc)return`holdSec must be above 0, at most ${dc}`;for(let t=0;t<e.events.length;t++){const n=mc(e.events[t]);if(n)return`event ${t}: ${n}`;if(e.events[t].source!==e.source)return`event ${t}: from another source`}return null}if(e.kind==="played")return Ae(e.source)?gc(e.events,T0):"bad source";if(e.kind==="controls")return Ae(e.source)?gc(e.events,rp):"bad source";if(e.kind==="off")return Ae(e.source)?["stop","removed","off","restart"].includes(e.reason)?e.atBeat!==void 0&&!ve(e.atBeat)?"bad atBeat":null:"bad reason":"bad source";if(e.kind==="release"){if(!Ae(e.source))return"bad source";if(!Array.isArray(e.ids))return"ids must be a list";if(e.ids.length>pc)return`more than ${pc} ids`;for(let t=0;t<e.ids.length;t++)if(!Ae(e.ids[t]))return`id ${t}: bad id`;return null}if(e.kind==="routes"){if(!Array.isArray(e.routes)||e.routes.length>64)return"routes must be a list (at most 64)";for(const t of e.routes){if(!fa(t)||!Ae(t.source)||typeof t.name!="string"||t.name.length>sp)return"bad route";if(!$0.includes(t.role))return"bad route role";if(t.octave!==void 0&&!(Number.isInteger(t.octave)&&t.octave>=-1&&t.octave<=9))return"bad route octave";if(t.transpose!==void 0&&!(Number.isInteger(t.transpose)&&Math.abs(t.transpose)<=k0))return"bad route transpose";if(t.layer!==void 0&&typeof t.layer!="boolean")return"bad route layer"}return null}return"unknown kind"}const bc=e=>({id:e.id,source:e.source,note:e.note,velocity:e.velocity,startBeat:e.startBeat,lengthBeats:e.lengthBeats,role:e.role,offsetSec:e.offsetSec,spanBeats:e.spanBeats,gate:e.gate,hit:e.hit,root:e.root,...e.slice===void 0?{}:{slice:e.slice}}),lp=e=>e.type==="slot"?{type:"slot",id:e.id,beat:e.beat,slot:e.slot}:e.type==="take"?{type:"take",id:e.id,beat:e.beat,take:e.take,lengthBeats:e.lengthBeats,...e.gain===void 0?{}:{gain:e.gain},...e.offsetBeats===void 0?{}:{offsetBeats:e.offsetBeats},...e.peaks===void 0?{}:{peaks:[...e.peaks]}}:e.type==="lap"?{type:"lap",id:e.id,beat:e.beat,lengthBeats:e.lengthBeats}:{type:"chordPad",id:e.id,beat:e.beat,pad:e.pad},N0=e=>e.type!=="note"?lp(e):{type:"note",id:e.id,beat:e.beat,on:e.on,note:e.note,...e.on?{velocity:e.velocity}:{},...e.on&&e.slice!==void 0?{slice:e.slice}:{},...e.on&&e.name!==void 0?{name:e.name}:{}};function cp(e){if(C0(e))return null;const t=e;return t.kind==="notes"?{v:Ve,kind:"notes",source:t.source,events:t.events.map(bc)}:t.kind==="audition"?{v:Ve,kind:"audition",source:t.source,events:t.events.map(bc),holdSec:t.holdSec}:t.kind==="played"?{v:Ve,kind:"played",source:t.source,events:t.events.map(N0)}:t.kind==="controls"?{v:Ve,kind:"controls",source:t.source,events:t.events.map(lp)}:t.kind==="off"?{v:Ve,kind:"off",source:t.source,reason:t.reason,...t.atBeat===void 0?{}:{atBeat:t.atBeat}}:t.kind==="release"?{v:Ve,kind:"release",source:t.source,ids:[...t.ids]}:{v:Ve,kind:"routes",routes:t.routes.map(n=>({source:n.source,name:n.name,role:n.role,...n.octave===void 0?{}:{octave:n.octave},...n.transpose===void 0?{}:{transpose:n.transpose},...n.layer===void 0?{}:{layer:n.layer}}))}}const F0=e=>({v:Ve,kind:"routes",routes:e});class P0{track=new xo;run=null;current=[];serial=0;stats={accepted:0,ignored:0,invalid:0};get routes(){return this.current}get route(){return this.current[0]??null}get active(){return this.current.length>0}get version(){return this.serial}receive(t){const n=cp(t);if(!n)return this.stats.invalid++,null;if(n.kind==="routes"){const o=this.route?.source??null;return this.current=n.routes,(this.route?.source??null)!==o&&this.reset(),n}const a=this.route?.source;if(n.source!==a)return this.stats.ignored++,n;if(n.kind==="off")return n.reason==="stop"&&n.atBeat===void 0||(n.reason==="restart"&&n.atBeat!==void 0?this.track.cut(n.atBeat):n.atBeat!==void 0?this.track.off(n.atBeat):this.track.off(),this.serial++),n;if(n.kind==="played"||n.kind==="controls"||n.kind==="release")return this.stats.ignored++,n;let s=!1;for(const o of n.events){const i=M0(o.id);if(i!==null&&this.run!==null&&i<this.run){this.stats.ignored++;continue}i!==null&&(this.run===null||i>this.run)&&(this.track=new xo,this.run=i),this.track.add([o]),this.stats.accepted++,s=!0}return s&&this.serial++,n}rootAt(t){return this.active?this.track.chordAt(t)?.root??null:null}points(t=Number.NEGATIVE_INFINITY){return this.active?this.track.points(t):[]}prune(t){this.track.prune(t)}reset(){this.track=new xo,this.run=null,this.serial++}}const z0=.001,O0=(e,t,n)=>{const a=new Float32Array(Math.max(0,n-t)),s=e.length||1;for(const o of e)for(let i=t;i<n;i++)a[i-t]+=(o[i]??0)/s;return a};function D0(e,t,n,a,s){const o=e.length;for(let i=0;i<o;i++){const l=s[i];if(l>i){const c=e[i];e[i]=e[l],e[l]=c;const d=t[i];t[i]=t[l],t[l]=d}}for(let i=2;i<=o;i<<=1){const l=i>>1,c=o/i;for(let d=0;d<o;d+=i)for(let u=0;u<l;u++){const h=n[u*c],p=a[u*c],f=d+u,g=f+l,w=e[g]*h+t[g]*p,m=t[g]*h-e[g]*p;e[g]=e[f]-w,t[g]=t[f]-m,e[f]+=w,t[f]+=m}}}function B0(e,t){const n=t>64e3?2048:t>32e3?1024:512,a=n/4,s=Math.max(0,Math.floor((e.length-n)/a)+1),o=n/2,i=new Float32Array(n);for(let v=0;v<n;v++)i[v]=.5-.5*Math.cos(2*Math.PI*v/n);const l=new Float32Array(o),c=new Float32Array(o);for(let v=0;v<o;v++)l[v]=Math.cos(2*Math.PI*v/n),c[v]=Math.sin(2*Math.PI*v/n);const d=Math.log2(n),u=new Uint32Array(n);for(let v=0;v<n;v++){let y=0;for(let x=0;x<d;x++)y|=(v>>x&1)<<d-1-x;u[v]=y}const h=new Float32Array(n),p=new Float32Array(n);let f=new Float32Array(o),g=new Float32Array(o);const w=new Float32Array(s),m=4/n*1e3;let b=0;for(let v=0;v<s;v++){const y=v*a;for(let S=0;S<n;S++)h[S]=e[y+S]*i[S],p[S]=0;D0(h,p,l,c,u);for(let S=0;S<o;S++)g[S]=Math.log1p(m*Math.sqrt(h[S]*h[S]+p[S]*p[S]));let x=0;if(v>0)for(let S=1;S<o-1;S++){const k=Math.max(f[S-1],f[S],f[S+1]),$=g[S]-k;$>0&&(x+=$)}w[v]=x,x>b&&(b=x),[f,g]=[g,f]}if(b>0)for(let v=0;v<s;v++)w[v]/=b;return{flux:w,hop:a,size:n}}function R0(e,t,n,a){const s=Math.max(8,Math.round(5e-4*t)),o=Math.max(0,n-Math.round(.01*t)),i=Math.min(e.length,a),l=[];for(let p=o;p<i;p+=s){let f=0;for(let g=Math.max(1,p);g<Math.min(i,p+s);g++)f=Math.max(f,Math.abs(e[g]-e[g-1]));l.push(f)}if(!l.length)return{at:n,contrast:0};let c=0;for(let p=1;p<l.length;p++)l[p]>l[c]&&(c=p);let d=l[c];for(let p=0;p<=c;p++)d=Math.min(d,l[p]);const u=d+.1*(l[c]-d);let h=c;for(;h>0&&l[h-1]>u;)h--;return{at:o+Math.max(0,h-1)*s,contrast:l[c]>0?1-d/l[c]:0}}function I0(e,t,n){let a=Math.max(0,Math.min(e.length-1,t));for(let s=Math.max(0,t-n);s<=Math.min(e.length-1,t+n);s++)Math.abs(e[s])<Math.abs(e[a])&&(a=s);return a}function yc(e,t,n=0,a=e[0]?.length??0){const s=O0(e,n,a),{flux:o,hop:i,size:l}=B0(s,t),c=t/i/1e3,d=Math.max(1,Math.round(100*c)),u=Math.max(1,Math.round(30*c)),h=Math.max(1,Math.round(25*c)),p=new Float64Array(o.length+1);for(let m=0;m<o.length;m++)p[m+1]=p[m]+o[m];const f=[],g=Math.round(z0*t),w=Math.round(5e-4*t);for(let m=1;m<o.length;m++){const b=o[m],v=Math.max(0,m-d),y=Math.min(o.length,m+u+1),x=b-(p[y]-p[v])/(y-v);if(x<.02)continue;let S=!0;for(let M=Math.max(0,m-h);M<=Math.min(o.length-1,m+h);M++)if(o[M]>b||o[M]===b&&M<m){S=!1;break}if(!S)continue;const{at:k,contrast:$}=R0(s,t,m*i,m*i+l),A=I0(s,k-g,w);f.push({cut:n+A,hit:n+k,strength:b*(.25+.75*$),margin:x})}return f.sort((m,b)=>b.strength-m.strength),{from:n,to:a,sampleRate:t,candidates:f}}function q0(e){return .3*(1-Math.max(0,Math.min(1,e)))**1.6+.02}function wi(e,t){const n=q0(t);return e.candidates.filter(a=>a.margin>=n)}const _0=e=>e.offsetDb?10**(e.offsetDb/20):1,xi=.25,vc=new WeakMap;function qs(e,t){if(!e)return null;let n=vc.get(e);n||(n=new Map,vc.set(e,n));const a=Math.round(t*1e3)/1e3;let s=n.get(a);return s||(s=wi(e,a).map(o=>o.cut).sort((o,i)=>o-i),n.set(a,s)),s}function _s(e){return e.slices?e.cuts.length===e.slices-1?[0,...e.cuts,1]:Array.from({length:e.slices+1},(t,n)=>n/e.slices):[0,1]}function wr(e,t,n){const a=e.start*t.frames,s=e.end*t.frames;if(n===null||!e.slices)return[Math.floor(a),Math.ceil(s)];const o=_s(e),i=Math.min(n,o.length-2);return[Math.floor(a+o[i]*(s-a)),Math.ceil(a+o[i+1]*(s-a))]}function xr(e,t,n,a=0){let o=2**((e.tune+e.fine/100+a)/12);if(e.fit){const[i,l]=kr(e),c=(l-i)*t.frames/t.sampleRate,d=e.fit*4*(60/n);c>0&&d>0&&(o*=c/d)}return o}const wc=new WeakMap;function H0(e,t){let n=wc.get(e);n||(n=new Map,wc.set(e,n));let a=n.get(t);return a||(a=e.map(s=>Math.round(s*t)),n.set(t,a)),a}function j0(e){return!e.slices&&e.length!=="free"}function kr(e){return j0(e)?e.fitSpan??[0,1]:[e.start,e.end]}function Hs(e){return!e.slices&&(e.length!=="free"||!da(e.mod))}function dp(e,t,n){const a=W0(e.fit,n,t.sampleRate);if(!Hs(e))return a;const[s,o]=kr(e),i=Math.max(1,(o-s)*t.frames);return Math.max(1,Math.round(t.frames*a/i))}function W0(e,t,n){return Math.max(1,Math.round(e*4*60/Math.max(1,t)*n))}function js(e,t,n){if(!e.fit)return 1;const[a,s]=kr(e),o=(s-a)*t.frames/t.sampleRate;return o>0?o/(e.fit*4*(60/Math.max(1,n))):1}const Ln=[.75,1.5];function U0(e,t,n){if(n===null||!e.slices)return[0,t];const a=_s(e),s=Math.min(n,a.length-2);return[Math.floor((a[s]??0)*t),Math.ceil((a[s+1]??1)*t)]}const Y0=1.5;function Ws(e,t,n,a,s,o=!1,i){if(!n.on||!e.sample||!a)return null;const l=n.slice??(e.slices?t%e.slices:null),c=i!==void 0&&Hs(e),d=g=>i?c?[Math.floor(e.start*i.frames),Math.ceil(e.end*i.frames)]:U0(e,i.frames,g):wr(e,a,g);let[u,h]=d(l);const p=n.reverse?e.dir==="rev"?"fwd":"rev":e.dir;if(e.mode==="oneshot"&&l!==null&&e.slices&&!o){const[g,w]=d(null);p==="fwd"?h=w:p==="rev"&&(u=g)}const f=i?2**(n.pitch/12)*(i.frames/dp(e,a,s)):xr(e,a,s,n.pitch);return{sample:i?i.sample:e.sample,from:u,to:h,rate:f,trim:yy(e)*_0(e),gain:Math.min(1.5,n.velocity*(n.accent?Y0:1))*Ey(e.levelDb),pan:e.pan,mode:e.mode,dir:p,attack:e.attack,decay:e.decay,cutoff:e.cutoff,resonance:e.resonance,choke:e.choke,chance:n.chance,cond:n.cond,fit:e.fit>0,...!o&&ua(e)?{follow:e.note}:{},...K0(e,a,i,f)??{},...!o&&e.retrigger==="finish"?{finish:!0}:{}}}function K0(e,t,n,a){if(!rt(e)||e.length==="free"&&da(e.mod)||n&&!Hs(e))return null;const s=n?n.frames/Math.max(1,t.frames):1,o=n?n.frames:t.frames,[i,l]=n?[Math.floor(e.start*o),Math.ceil(e.end*o)]:wr(e,t,null),c=e.length==="hit"||e.landOnHits?qs(t.analysis,e.hitSense):void 0;return{region:{start:i,end:l,frames:o,sampleRate:t.sampleRate,rate:a,grid:e.length,mod:da(e.mod)?null:e.mod,...c!==void 0?{hits:c&&s!==1?H0(c,s):c,land:e.landOnHits}:{}}}}function rt(e){return!e.slices}function up(e,t,n,a=null,s,o=!1){const i=o&&e.slices?{...e,slices:0,cuts:[]}:e;return Ws(i,0,{on:!0,accent:!1,velocity:.8,chance:1,slice:a,pitch:0,reverse:!1,cond:"always"},t,n,!0,s)}function X0(e,t,n,a,s=null,o){return Ws(e,0,{on:!0,accent:!1,velocity:Math.min(1,Math.max(0,a)),chance:1,slice:s,pitch:0,reverse:!1,cond:"always"},t,n,!0,o)}function G0(e,t,n,a=()=>{}){const s=e.lanes.some(o=>o.solo);return{swing:e.swing,lanes:e.lanes.map((o,i)=>{const l=e.pads[i],c=l?.sample?t(l.sample):void 0,d=l?a(i):void 0;return{length:o.length,audible:s?o.solo:!o.mute,steps:o.steps.map((u,h)=>l?Ws(l,h,u,c,n,!1,d):null)}})}}const $r=4,V0=.03,Q0=new Set(["oneshot","oneshots","shot","shots","hit","hits","stab","stabs","single"]),J0=new Set(["loop","loops","break","breaks","breakbeat","groove","grooves","beat","riff"]);function pp(e){return e.replace(/^.*[\\/]/,"").replace(/\.[a-z0-9]{2,4}$/i,"").split(/[\s_\-.()[\],+&]+/).filter(Boolean)}function hp(e){const t=pp(e);for(let n=0;n<t.length;n++){const a=t[n]??"",s=/^(\d{2,3})bpm$/i.exec(a)??/^bpm(\d{2,3})$/i.exec(a);if(s&&hs(Number(s[1])))return Number(s[1]);if(/^\d{2,3}$/.test(a)&&/^bpm$/i.test(t[n+1]??"")&&hs(Number(a)))return Number(a)}for(const n of t)if(/^[1-9]\d{1,2}$/.test(n)&&Number(n)>=50&&Number(n)<=200)return Number(n);return 0}function Sr(e){const t=pp(e).map(s=>s.toLowerCase());if(t.some((s,o)=>Q0.has(s)||s==="one"&&/^shots?$/.test(t[o+1]??"")))return{kind:"one-shot",bpm:0};const a=hp(e);return a?{kind:"loop",bpm:a}:{kind:t.some(s=>J0.has(s))?"loop":"",bpm:0}}function fp(e,t,n=$r,a=Zu){if(!(e>0)||!hs(t)||!(n>0))return 0;const s=e*t/60/n,o=Math.round(s);return o<1||Math.abs(s-o)>V0*o?0:a.includes(o)?o:0}function Z0(e,t,n,a=$r){if(t.kind!=="loop")return null;const s=fp(e,t.bpm,a);if(!s)return null;const o=e/(s*a*(60/Math.max(1,n))),i=Number(o.toFixed(2));return{bars:s,bpm:t.bpm,speed:o,far:i<Ln[0]||i>Ln[1]}}function ev(e){const t=Number.isInteger(e.bpm)?String(e.bpm):e.bpm.toFixed(1);return`Fitted: ${e.bars} bar${e.bars===1?"":"s"}, ${t} BPM`}function xc(e){return e.far?`×${e.speed.toFixed(2)} may smear`:""}const mp="nyx.autofit.v1",gp=()=>{try{return globalThis.localStorage??null}catch{return null}};function tv(e=gp()){try{return e?.getItem(mp)!=="off"}catch{return!0}}function nv(e,t=gp()){try{t?.setItem(mp,e?"on":"off")}catch{}}function bp(e,t){return!!(e&&t.sample===e.sample&&t.fit===e.fit.bars)}function av(e,t){t.fit=e.before.fit,t.keepPitch=e.before.keepPitch}const kc={"page:title":"NYX, the NetComposer sampler. The number is which copy of NYX this is.","page:master":"The volume of everything NYX plays, after the Hacks.","page:save":"Downloads the pattern as a file: pads, steps, Hacks and the ten slots. The samples stay in this browser.","page:load":"Opens a saved pattern file (with its slots, if it has them), or puts an audio file onto the selected pad.","page:panic":"Silences every voice and effect tail at once. NYX then sits out until you press Play.","page:mode":"Pads plays the kit. Instrument plays one sampled instrument from a scale grid and the keys; NYX keeps both.","inst:load":"Loads a folder of note samples, or one with an .sfz file. You check the key map and the detail, then load.","module:transport":"Play and stop NYX, set the tempo and swing, and keep up to ten saved versions of the whole kit and pattern. Folded, the header's play icon does the same as Play.","module:pattern":"The 16-step grid, one lane per pad: a step that is on plays that lane's pad. The pads under the grid are the sounds.","module:params":"Everything about the selected pad: which part of the sample plays, its pitch, shape, filter and level. A selected step's locks show here too.","module:hacks":"Effects on everything NYX plays, in order: Filter, then Drive, then Compressor. They are saved with the pattern and its slots.","section:pads":"The 16 sounds: Q W E R A S D F play 1–8, Shift 9–16. Tap to play, double-click a name to rename; long-press or right-click to load or remove; Delete removes; drag to swap.",play:"Starts and stops NYX, including the play icon on the folded Transport header. In the Studio, Stop sits NYX out while the others play on, and Play brings it back on the next bar.","perform-label":"Effects you play live: hold a button down and NYX's sound changes until you let go. Nothing is saved.",perform:"Hold one of these down to change NYX's sound until you let go.",tempo:"Beats per minute: how fast the pattern plays. In the Studio every instrument shares this clock.",swing:"Pushes every second sixteenth note later for a looser, shuffled feel. 50% is straight.",status:"What NYX is doing now: stopped, playing, sitting out, or waiting to join on the next bar.","kit:slot":"A memory for the whole kit and pattern. Tap to recall it; Shift-click or long-press to store here, Option-click to clear.","kit:note":"Step tool: a tap on a step turns it on or off.","kit:accent":"Step tool: a tap on a step makes it an accent, played louder. Shift-click accents a step with either tool.","kit:fill":"Hold for a fill: steps set to play Only in Fill come in and Not in Fill steps drop out, until you let go.","kit:clear":"Turns every step off and resets lane lengths, mutes, solos and step locks; the pads keep their sounds. Undo brings it back.","kit:mute":"Mute: silences this lane. Its steps stay as they are.","kit:solo":"Solo: hear only the soloed lanes. Solo several to hear them together.","kit:length":"Drag to set how many steps this lane plays before it starts over. Lanes of different lengths drift against each other.","kit:lane-length":"Tap to set this lane's length, then tap the step it should end on.","kit:pad-key":"The key that plays this pad: lower case (q to f) is the key alone, upper case (Q to F) is Shift with it. A Gate pad holds while its key is down.","kit:pad-playing":"Playing: tap this pad, or press its key, to stop it. A sound under a second plays again instead, so drums stay playable.","kit:choke-badge":"Choke group: pads showing the same letter cut each other off, like an open and a closed hi-hat. Set it under Choke.",wave:"The selected pad's sample: the part between Start and End is what plays, lines mark the slices, and a cursor follows playback. Click it to edit the region large.",sample:"How much of the sample plays (between Start and End) out of its full length, and whether it is mono or stereo.",mode:"How the pad plays when hit: right through (One-shot), only as long as its step (Gate), or round and round (Loop).",dir:"Which way the pad plays through its sample: forwards, backwards, or forwards then back.",start:"Where the pad starts playing in the sample. Move it right to skip the beginning.",end:"Where the pad stops playing in the sample. Move it left to cut off the tail.",slices:"Cuts the played part into 2 to 16 pieces; each step plays the next piece in turn. Off plays the whole part every time.",chop:"Where the slices are cut: at equal spacing, or where the hits in the sound start.","chop-to-pads":"Cuts this pad's sound into up to 16 slices, one per pad, to play by hand or rearrange in the pattern.","chop:wave":"The slices and the pad each lands on. Tap a slice to hear it.",retrigger:"When the lane hits the pad again: Cut starts it again each time; Let it finish lets it play to its end first.","region:start":"Where the pad starts playing. Drag it (← → nudge it); with a length on the grid, End follows it.","region:end":"Where the pad stops. On the grid, drag it to the nearest note value or bar; on Free, anywhere.","region:overview":"The whole sample. The blue frame is what the stage shows: drag it, or tap to look there.","region:length":"How long the pad plays from Start: Free (where End is), or a note value or bars at the tempo, so End follows Start. On a pad fitted to bars, the bars are the Studio's: 2 bars plays exactly 2 bars.","region:fitted":"Fit to bars stretches this loop to whole bars at the Studio's tempo. The grid picks a part of it in Studio bars; moving Start never changes its speed.","region:fit-off":"Turns Fit to bars off for this pad, so it plays at its own speed and tempo. Undo brings it back.","region:retrigger":"Cut: each of the lane's hits starts the sound again. Let it finish: hits while it still plays are skipped (a tap or a key always starts it).","region:start-mod":"What moves Start while you play, and how far either way. The move lands on the next hit, never in a sound already playing.","region:length-mod":"What moves the length on the grid while you play, and by how many steps. Shake makes it one step shorter per shake.","region:lfo":"NYX's own LFO for this pad: how long one cycle takes on the Studio's beat, and its shape.","region:start-source":"Nothing, NYX's LFO, or one of ARIA's signals (your phone's tilt, heading or shake; the ground's energy).","region:length-source":"Nothing, NYX's LFO, or one of ARIA's signals. ARIA's need an ARIA in this Studio.","region:reset":"Puts Start and End back to the whole sample, the length to Free, and nothing moving.","region:hits":"How many hits NYX finds in the sound: more to the right. Start and End snap to them, and To a hit and Land on hits use them.","region:no-hits":"No hits found at this sensitivity. Move Hits to the right to find more.","region:to-hit":"End lands just before the next hit after Start, so the pad plays one hit, one chord or one word. Moves count on to the 2nd, 3rd hit.","region:land":"Land on hits: as Start moves, it jumps from hit to hit, so every trigger begins cleanly. Anywhere: it moves smoothly.","region:audition":"Plays the pad as a tap does; while it plays, stops it.","region:audition-slice":"Plays what a hit plays: slice 1 of this pad's slices. While it plays, stops it.","region:audition-region":"Plays the whole region, Start to End, across every slice. While it plays, stops it.","region:slices-off":"Turns this pad's slices off, so a hit plays the whole region and the grid can set its length. Undo brings them back.","chop:close":"Closes Chop to pads without changing any pad.","chop:mode":"How the sound is cut: where its hits start, into equal parts, or on the beat.","chop:mode:transients":"Cuts where each hit starts, so a slice is one hit (a drum, a note, a word).","chop:mode:even":"Cuts into equal parts: 16, 8 or 4.","chop:mode:beats":"Cuts on the beat at the sound's tempo: every beat, eighth or sixteenth.","chop:sensitivity":"Higher finds quieter hits; lower keeps only the strongest.","chop:count":"The most slices to make (Even: exactly this many). Never more than the pads left from Fill from.","chop:every":"Beats: a slice every beat, eighth or sixteenth at the sound's tempo. Choices past 16 slices are off.","chop:first":"The pad the first slice goes on; the rest follow, up to pad 16.","chop:play-back":"Writes steps that play the slices in order, so the pattern sounds like the original. On when the tempo is known.","chop:more":"The tempo used, Choke and Snap to hits.","chop:tempo":"The sound's tempo: from its Fit, its name, a take, or the Studio's when the length fits; else a guess.","chop:choke":"On, the slices cut each other: a new slice stops the last one.","chop:snap":"Even and Beats: moves each cut to a hit that starts within 20 ms, so an early hit isn't split.","chop:go":"Puts the slices on the pads. Pads with sounds are replaced; Undo puts them back.","library:chop":"Loads this loop onto the selected pad and opens Chop to pads on it.","tune-shape":"Pitch, speed and shape of the selected pad. Closed, it lists what differs from a new pad; NYX remembers in this browser whether it's open.","transport-more":"On a phone, Swing folds away; the line shows it. Tap to show or hide it.","nyx-presets":"The ten slots, folded away until you open them; the line says how many hold a pattern and which is in use. Keys 1 to 0 recall a slot either way.","pad-more":"On a phone, the pad's pan, choke group and Clear pad fold away; the line shows pan and choke. Tap to show or hide them.","hacks-more":"On a phone, Drive and Compressor fold away under the Filter; the line says which are on. Tap to show them.","kit:group-toggle":"Opens or closes this section.","pitch-label":"How high or low the pad plays. Pitch changes speed too, like a record, unless Fit's Keep pitch is on.",tune:"Pitch in semitones, up to two octaves either way. Higher also plays faster, unless the pad is fitted with Keep pitch on.",fine:"Fine pitch in cents (hundredths of a semitone), for small corrections.",fit:"Makes the pad last exactly this many bars at the current tempo, and keeps it in time when the tempo changes. Off plays it as recorded.","keep-pitch":"On, Fit stretches the pad to its bars without changing its pitch, and Tune moves the pitch only. Off, it speeds up or slows down like a record.","fit-speed":"How fast the pad plays to fit its bars: ×1 is as recorded. With Keep pitch, stretching far past ×0.75 to ×1.5 may smear the sound.","auto-fit":"On, a loop that arrives with its tempo (picker, My samples, or a name like Loop_100_Am) is fitted to its bars with Keep pitch. One-shots never are.","auto-fit-note":"This loop came with its tempo, so NYX set Fit to its bars with Keep pitch on. It plays in time at any tempo.","auto-fit-far":"Keep pitch is stretching this loop past ×0.75 to ×1.5, where it may smear. Fit it to other bars, or turn Keep pitch off.","auto-fit-undo":"Turns this pad's automatic Fit off again: the loop plays as recorded. The sound stays.","shape-label":"How each hit's volume moves over time: how it fades in and how it dies away.",attack:"How long each hit takes to fade in. Zero is instant; more softens the start.",decay:"How quickly each hit fades away (in Gate, once its step ends). All the way up is Hold: no fade.",cutoff:"Left of centre cuts the highs (darker), right of centre cuts the lows (thinner). Centre leaves the pad open.",resonance:"Boosts the sound right at the filter's edge for a sharper, ringing tone. It does nothing while the filter is open.","out-label":"Where the pad sits in the mix: how loud, how far left or right, and which pads cut it off.",level:"How loud this pad plays, in dB. 0 dB is the Studio's house level; double-click to go back to it.",normalize:"On, the pad plays at the Library's level, so a quiet file fits the kit; Level still sets how loud. Off, it plays as recorded.","normalize-label":"Plays the pad at the Library's level, so a quiet file fits the kit. Grabs and Takes are at mix level already.","normalize-gain":"What Normalize adds to this pad: the gain that brings your audio to the Library's level, never a peak past −1 dBFS.",pan:"Places the pad left or right in the stereo picture. C is the centre.",choke:"Pads in the same group cut each other off when one plays, like open and closed hi-hats. None lets it ring over the others.","clear-pad":"Removes this pad's sample and settings at once; its steps stay. Undo brings it back.","lock-label":"Locks for this one step: settings here change only this step, not the whole pad. Long-press another step to edit it.","lock-velocity":"How loud this step plays, before any accent.","lock-chance":"The odds this step plays each time round. At 100% it always plays; lower leaves it out at random.","lock-slice":"Which slice this step plays. In order plays the slice that matches the step's place, so a chopped beat plays back as it was.","lock-pitch":"Moves this step up or down in semitones, on top of the pad's own Tune.","lock-cond":"When this step plays: always, only on some passes through the lane, only with Fill held or not, or only if the lane's last conditional step did or didn't.","lock-reverse":"Whether this step plays the pad's own way or the other way round.","lock-done":"Closes this step's locks and goes back to the pad's settings.","notes-label":"CALLIOPE plays this NYX: your pattern keeps its hits, and pads that follow take its chord's root.","pad-follow":"On: this pad's hits play at the root of CALLIOPE's chord. Off: its own pitch, as drums want.","pad-note":"The note this sample plays at as recorded. NYX tunes from it to CALLIOPE's root, never more than six semitones away.","notes-open":"Shows CALLIOPE, the Studio's note generator that tunes this NYX's pads now.","notes-mine":"Take the pitch back: CALLIOPE stops playing this NYX, and every pad plays its own pitch again.","grab-label":"Brings sound from the Studio onto the selected pad: Grab the bars that just played, or Take a performance as it happens.","grab-from":"Which Studio sound to grab or take from: the master mix or one instrument's channel.","grab-bars":"How many bars Grab takes. One bar is cut into 16 slices with every step on; longer grabs are sliced at the hits.",grab:"Copies the bars that just played onto the selected pad, cut on the bar lines (the music must be playing). It asks before replacing a pad that has a sound.","grab-undo":"Puts back what this Grab, Take, sent take, Library Load or Build kit replaced: old sounds, slices and steps. Cmd/Ctrl+Z does the same.",library:"Opens the Library: openly licensed sounds checked by a person, found by plain words. Load fills the selected pad; Build kit fills pads 1–8.",rights:"A recording of a tab's or another app's sound (LUCY's Computer audio): nobody here knows who owns it. Fine to play with; check the licence before you release anything with it.",credit:"Who made this pad's sound, and its licence. Library › Credits has the full credit with links, and saved patterns keep it.","library:ask":"Plain words: a role (kick, snare, hat, clap, tom, perc, cymbal, fx) and a sound (punchy, tight, dark, bright, long, soft). Add kit for a whole kit.","library:close":"Closes the Library. Esc in the field does the same.","library:play":"Plays this sound through NYX's output, at the level it will have on a pad. Press again to stop.","library:load":"Puts this sound on the selected pad, named after it and with its credit; the steps stay. Undo brings the old sound back.","library:kit":"Fills pads 1–8 with a kit for your words (kick, snare, clap, hats, tom, perc, fx); the pattern stays and the hats cut each other. One Undo puts all eight back.","library:credits":"Every Library sound on the pads: who made it, its licence and its source. Saved patterns, slots and Studio Scenes keep these credits.","library:badge":"The licence. CC0 needs no credit (NYX credits it anyway); BY needs credit, and BY-SA credit plus the same licence on what you make.","library:wave":"The sound's shape, start to end: a tall start is a sharp hit, a long tail rings on.","library:source-shelf":"The curated shelf on musicmatter.art: openly licensed sounds, each checked by a person.","library:source-local":"My samples: your local Library, the folder the sample picker exported. Its sounds play in this browser and are never uploaded.","library:source-all":"Searches musicmatter.art and My samples (your local Library) together.","library:open-folder":"Opens a local Library folder (the sample picker's export) from this computer. NYX only reads it; nothing is uploaded.","library:reconnect":"Your local Library folder, remembered from last time: the browser asks once more before NYX can read it.","library:forget":"Closes your local Library and forgets the folder. The files stay where they are; pads keep their sounds.",take:"Records the chosen source onto the selected pad in whole bars until you press again (up to four minutes); takes of up to 8 bars loop. It asks first if the pad has a sound.","hack-filter":"A filter on all of NYX, to darken it, thin it or narrow it down. The switch turns it on.","filter-mode":"Which part the filter keeps: the lows (low pass), the highs (high pass) or a band in the middle (band pass).","filter-cutoff":"Where the filter cuts. In low pass, all the way up is open: no filtering.","filter-resonance":"Boosts the sound around the cutoff for a sharper, more nasal tone.","filter-curve":"A picture of the filter: how loud each pitch range comes out, lows on the left, highs on the right.","hack-meter":"The level going into this Hack (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. Off, it still shows the input, greyed.","hack-drive":"Distortion on all of NYX, from warm to gritty. The switch turns it on.","hack-drive-drive_db":"How hard the sound is pushed into distortion. 0 dB is clean.","hack-drive-output_db":"The level after the drive, to balance out the louder distorted sound.","hack-drive-mix":"How much of the driven sound is mixed with the clean one. 100% is all drive.","hack-drive-curve":"The kind of distortion: Smooth is warm and round, Acid is harder and buzzier.","hack-drive-tone":"Darkens the driven sound by cutting its highs. All the way up leaves it bright.","hack-compressor":"Evens out NYX's level: loud hits are turned down, so the whole sounds tighter and punchier. The switch turns it on.","hack-compressor-threshold_db":"The level above which the compressor starts turning the sound down. Lower catches more.","hack-compressor-ratio":"How strongly sound above the threshold is turned down. Higher is a firmer squeeze.","hack-compressor-attack_ms":"How fast the compressor reacts to a loud hit. Slower lets the start of each hit punch through.","hack-compressor-release_ms":"How fast the compressor lets go once the sound drops back below the threshold.","hack-compressor-makeup_db":"Turns the whole sound back up after compressing, to make up for the lost level.","kit:more":"More settings for this effect."},sv={perform:{repeat16:"While held, repeats the last sixteenth note over and over, like a stutter.",repeat8:"While held, repeats the last eighth note over and over.",reverse:"While held, plays what NYX just played backwards.",half:"While held, plays on at half speed, an octave lower.",stop:"While held, slows to a halt like a tape machine switched off."},mode:{oneshot:"One-shot: plays on from the hit until it ends or the lane's next hit cuts it. Good for drums.",gate:"Gate: plays only as long as its step (or its key is held), then fades by Decay. Good for chopping long sounds.",loop:"Loop: plays round and round until the pad plays again or the music stops."},dir:{fwd:"Plays the sample the normal way, start to end.",rev:"Plays the sample backwards, end to start.",pingpong:"Plays forwards, then back again. In Loop it keeps bouncing."},retrigger:{cut:"Cut: each of the lane's hits starts the sound again.",finish:"Let it finish: the lane's hits wait while the sound still plays (they show striped). A tap or a key always starts it."},normalize:{on:"Normalize on: the pad plays at the Library's level.",off:"Normalize off: the pad plays as recorded."},"keep-pitch":{on:"Keep pitch: the pad is stretched to its bars and stays at its pitch, whatever the tempo. Tune moves the pitch only.",off:"Varispeed: the pad speeds up or slows down to fit its bars, and its pitch moves with it, like a record."},"auto-fit":{on:"Auto-fit on: loops with a known tempo land fitted to their bars, Keep pitch on.",off:"Auto-fit off: loops land as recorded; set Fit yourself."},chop:{even:"Cuts the slices at equal spacing.",transients:"Cuts the slices where the hits in the sound start, so each slice is one hit."},"lock-reverse":{pad:"This step plays in the pad's own direction.",rev:"This step plays the other way round from the pad."}};function I(e){return Object.hasOwn(kc,e)?kc[e]:void 0}function ov(e,t){const n=sv[e];return(n&&Object.hasOwn(n,t)?n[t]:void 0)??I(e)}const sa="nyx-help-text",$c=new Map;function iv(e,t){const n=$c.get(t);if(n&&e.getElementById(n))return n;let a=e.getElementById(sa);a||(a=e.createElement("div"),a.id=sa,a.hidden=!0,e.body.append(a));const s=e.createElement("span");return s.id=`${sa}-${a.children.length+1}`,s.textContent=t,a.append(s),$c.set(t,s.id),s.id}function U(e,t,n){if(!e||!t||(e.getAttribute("data-nc-help")!==t&&e.setAttribute("data-nc-help",t),e.hasAttribute("title")&&e.removeAttribute("title"),!n))return;const a=iv(n.ownerDocument,t),s=(n.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);if(s.includes(a))return;const o=[...s.filter(i=>!i.startsWith(`${sa}-`)),a];n.setAttribute("aria-describedby",o.join(" "))}function rv(e,t=e){if(e?.removeAttribute("data-nc-help"),!t)return;const n=(t.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean),a=n.filter(s=>!s.startsWith(`${sa}-`));a.length!==n.length&&(a.length?t.setAttribute("aria-describedby",a.join(" ")):t.removeAttribute("aria-describedby"))}function lv(e){const t=I(e);return t?{"data-nc-help":t}:{}}const cv=[['.nc-seg [role="radio"]:not([data-nc-accent-mode])',"kit:note"],['.nc-seg [role="radio"][data-nc-accent-mode]',"kit:accent"],["[data-nc-fill]:not([data-nc-clear])","kit:fill"],["[data-nc-clear]","kit:clear"],['.nc-ms[data-nc-ms="mute"]',"kit:mute"],['.nc-ms[data-nc-ms="solo"]',"kit:solo"],[".nc-len-handle","kit:length"],["[data-nc-len-toggle]","kit:lane-length"],["[data-nc-pads-play]","play"],[".nc-snap","kit:slot"]];function Er(e){for(const t of e.querySelectorAll(".nc-module[data-nc-module]"))U(t.querySelector(".nc-module-hd .nc-title"),I(`module:${t.dataset.ncModule}`));for(const t of e.querySelectorAll("[data-nc-section]"))U(t.querySelector(":scope > .nc-ui-fx-name, :scope > .nc-panel-hd > .nc-panel-title"),I(`section:${t.dataset.ncSection}`));for(const t of e.querySelectorAll("[data-nc-id]")){const n=t.dataset.ncId??"";if(!t.matches("input, select, canvas"))if(t.classList.contains("nc-field")){const a=t.querySelector(":scope > input, :scope > select, :scope > canvas");U(t.querySelector(":scope > .nc-label"),I(n),a)}else if(t.classList.contains("nc-choice-row"))for(const a of t.querySelectorAll("[data-nc-choice]"))U(a,ov(n,a.dataset.ncChoice??""),a);else t.classList.contains("nc-btn")?U(t,I(n),t):t.matches(".nc-label[data-nc-text]")?U(t,I(n)):t.classList.contains("nc-ui-fx")&&(U(t.querySelector(":scope > .nc-ui-fx-hd > .nc-ui-fx-name, :scope > .nc-ui-fx-name"),I(n),t.querySelector("[data-nc-fx-switch]")),U(t.querySelector(":scope > .nc-ui-more > summary"),I("kit:more")))}for(const[t,n]of cv)for(const a of e.querySelectorAll(t)){const s=a.parentElement?.querySelector(":scope > .nc-hit")?a.parentElement:null;s&&a.removeAttribute("title"),U(s??a,I(n),a)}for(const t of e.querySelectorAll(".nc-group[data-nc-id]")){const n=t.querySelector(":scope > .nc-group-toggle");U(n?.querySelector(".nc-group-title")??null,I(t.dataset.ncId??""),n),U(n?.querySelector(".nc-group-mark")??null,I("kit:group-toggle"))}for(const t of e.querySelectorAll(".nc-padgrid-pad-badge"))t.textContent?U(t,I("kit:choke-badge")):t.removeAttribute("data-nc-help")}function dv(e){return e.embedded&&e.running?e.sittingOut?{action:"rejoin"}:{action:"sit-out",outId:e.instanceId}:e.running?{action:"stop"}:{action:"start",claimId:e.embedded?e.instanceId:null}}function Ar(e){return e?"Stop":"Play"}const Sc="http://www.w3.org/2000/svg";function Ec(e,t){const n=document.createElementNS(Sc,"svg");n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nyx-fold-play-icon"),n.dataset.nyxIcon=e;const a=document.createElementNS(Sc,"path");return a.setAttribute("fill","currentColor"),a.setAttribute("d",t),n.append(a),n}function uv(e,t){const n=document.createElement("button");n.type="button",n.className="nyx-fold-play",n.dataset.nyxFoldPlay="",n.append(Ec("play","M4.5 2.8 12.8 8 4.5 13.2Z"),Ec("stop","M4.2 4.2h7.6v7.6H4.2Z")),t.description&&(U(n,t.description,n),n.removeAttribute("data-nc-help")),n.addEventListener("click",l=>{l.stopPropagation(),t.onPress()});const a=e.querySelector(".nc-module-end"),s=a?.querySelector(".nc-hide");a&&s?a.insertBefore(n,s):(e.querySelector(".nc-module-hd")??e).append(n);const o=()=>{const l=t.playing(),c=Ar(l);n.setAttribute("aria-label",c),n.title=c,n.setAttribute("aria-pressed",l?"true":"false"),n.dataset.on=l?"true":"false",n.querySelector('[data-nyx-icon="play"]')?.toggleAttribute("hidden",l),n.querySelector('[data-nyx-icon="stop"]')?.toggleAttribute("hidden",!l);const d=e.hasAttribute("data-nc-slim");n.hidden=!d,d?n.removeAttribute("aria-hidden"):n.setAttribute("aria-hidden","true")},i=new MutationObserver(()=>o());return i.observe(e,{attributes:!0,attributeFilter:["data-nc-slim"]}),o(),{button:n,sync:o,destroy(){i.disconnect(),n.remove()}}}const dt=e=>`${Math.round(e*100)}%`,wt=e=>e<1?`${Math.round(e*1e3)} ms`:`${e.toFixed(2)} s`,ki=e=>e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`,ma=(e,t="")=>`${e>0?"+":""}${e}${t}`,pv=e=>`×${Number(e.toFixed(2))}`;function Qa(e){return Math.abs(e)<.001?"open":e<0?`LP ${ki(2e4*(60/2e4)**-e)}`:`HP ${ki(20*(8e3/20)**e)}`}const Ja=e=>e>=3.99?"Hold":wt(e);function hv(e){const t=at(0),n=[];return e.tune!==t.tune&&n.push(ma(e.tune," st")),e.fine!==t.fine&&n.push(ma(e.fine," ct")),e.fit!==t.fit&&n.push(`fit ${e.fit} bar${e.fit===1?"":"s"}`),e.fit&&e.keepPitch!==t.keepPitch&&n.push("varispeed"),Math.abs(e.attack-t.attack)>=5e-4&&n.push(`attack ${wt(e.attack)}`),Ja(e.decay)!==Ja(t.decay)&&n.push(`decay ${Ja(e.decay)}`),Qa(e.cutoff)!==Qa(t.cutoff)&&n.push(`filter ${Qa(e.cutoff)}`),dt(e.resonance)!==dt(t.resonance)&&n.push(`res ${dt(e.resonance)}`),n.join(" · ")}function yp(e){const t=Math.max(0,Math.min(1,e));return Math.min(2e4,40*2**(t*10))}const Ra=e=>Math.max(0,Math.min(100,e));function Mr(e){const t=yp(e.cutoff),n=Ra(Math.max(0,Math.min(1,e.resonance))*100);return e.mode==="hp"?{type:"highpass",dials:{cutoff:t<=20?0:Ra(100*Math.log(t/20)/Math.log(100)),q:n}}:e.mode==="bp"?{type:"bandpass",dials:{centre_hz:Ra(100*Math.log(Math.max(100,t)/100)/Math.log(80)),q:n,mix:100}}:{type:"lowpass",dials:{cutoff:e.cutoff>=.999?0:Ra(100*Math.log(t/2e4)/Math.log(150/2e4))}}}function fv(e){const{type:t,dials:n}=Mr(e);if(t==="highpass"){const s=n.cutoff??0;return{hz:20*100**(s/100),q:Math.SQRT1_2*(8/Math.SQRT1_2)**((n.q??0)/100),open:s<=0}}if(t==="bandpass")return{hz:100*80**((n.centre_hz??0)/100),q:.4*20**((n.q??0)/100),open:!1};const a=n.cutoff??0;return{hz:2e4*(150/2e4)**(a/100),q:Math.SQRT1_2,open:a<=0}}const vp=e=>!e.on||e.mode==="lp"&&e.cutoff>=.999;function $i(e){const t=Mr(e.filter);return{v:2,chain:[{id:`${t.type}-1`,type:t.type,bypass:vp(e.filter),dials:t.dials},{id:"drive-1",type:"drive",bypass:!e.drive.on,dials:{...e.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!e.compressor.on,dials:{...e.compressor.dials}}]}}function mv(e,t){if(!e||e.chain.length!==t.chain.length)return{whole:!0};if(e.chain.some((a,s)=>a.type!==t.chain[s]?.type))return{whole:!0};const n=[];return t.chain.forEach((a,s)=>{const o=e.chain[s];if(o){o.bypass!==a.bypass&&n.push([a.id,"bypass",a.bypass]);for(const[i,l]of Object.entries(a.dials))o.dials[i]!==l&&n.push([a.id,i,l])}}),{whole:!1,params:n}}const gv="/nyx/assets/instrument-processor-Cs9AixLE.js",wp={KeyA:0,KeyW:1,KeyS:2,KeyE:3,KeyD:4,KeyF:5,KeyT:6,KeyG:7,KeyY:8,KeyH:9,KeyU:10,KeyJ:11,KeyK:12,KeyO:13,KeyL:14,KeyP:15,Semicolon:16,Quote:17},xp="KeyZ",Si="KeyX",bv=[...Object.keys(wp),xp,Si],yv=/\.(wav|wave|flac|ogg|oga|mp3|m4a|aac|aif|aiff|webm)$/i,vv=-27,Ei=.8,Ac=e=>Math.max(.05,Math.min(1,e))**1.5,wv=e=>10**(e/20);class xv{constructor(t){this.host=t,this.panel=T("section",{class:"nyx-inst","data-nyx-inst":""}),this.picker=T("input",{type:"file",multiple:""}),this.picker.setAttribute("webkitdirectory",""),this.picker.hidden=!0,this.picker.addEventListener("change",()=>{const n=[...this.picker.files??[]].map(a=>({path:a.webkitRelativePath||a.name,file:a}));this.picker.value="",n.length&&this.open(n)}),this.panel.addEventListener("dragover",n=>{n.dataTransfer?.types.includes("Files")&&(n.preventDefault(),this.panel.setAttribute("data-drag",""))}),this.panel.addEventListener("dragleave",n=>{this.panel.contains(n.relatedTarget)||this.panel.removeAttribute("data-drag")}),this.panel.addEventListener("drop",n=>{this.panel.removeAttribute("data-drag"),n.dataTransfer&&(n.preventDefault(),n.stopPropagation(),kp(n.dataTransfer).then(a=>{a.length&&this.open(a)}))}),this.refresh()}panel;picker;sentHashes=new Set;turn=0;serial=0;hand=new Map;keysDown=new Map;busIds=new Set;scrim=null;memo="";log=[];inst(){return this.host.get()}async noteOn(t,n,a,s="hand",o=0){const i=this.inst();if(!i)return!1;const l=await this.host.audio();if(!l)return!1;await this.sendSamples(i,l.node);const c=Yy(i.zones,n,a*127,this.turn++);if(!c)return!1;const d=await this.host.store.get(c.s);if(!d)return!1;const u=2**(Ky(c,n)/12)*(d.sampleRate/l.ctx.sampleRate),h=wv(i.gainDb+c.gain)*Ac(a);return l.node.port.postMessage({type:"on",id:t,s:c.s,ratio:u,gain:h,at:o,loop:c.loop,rel:c.release,src:s,note:n}),this.log.push({note:n,key:c.key,ratio:u,at:o,src:s}),this.log.length>512&&this.log.splice(0,256),!0}async noteOff(t,n=0){(await this.host.audio())?.node.port.postMessage({type:"off",id:t,at:n})}handOn(t,n,a){this.hand.set(t,n),this.noteOn(`h|${t}`,n,a),this.host.report?.(t,n,!0,a),this.paintHeld()}handOff(t){this.hand.has(t)&&(this.hand.delete(t),this.noteOff(`h|${t}`),this.host.report?.(t,0,!1,0),this.paintHeld())}releaseAll(){for(const t of[...this.hand.keys()])this.handOff(t);this.keysDown.clear()}held(){return[...this.hand.values()].sort((t,n)=>t-n)}keyDown(t){const n=this.inst();if(!n)return!1;if(t.code===xp||t.code===Si)return this.setOctave(n.octave+(t.code===Si?1:-1)),!0;const a=wp[t.code];if(a===void 0)return!1;if(this.keysDown.has(t.code))return!0;const s=(n.octave+1)*12+a,o=`k|${t.code}`;return this.keysDown.set(t.code,o),this.handOn(o,s,Ei),!0}keyUp(t){const n=this.keysDown.get(t.code);return n?(this.keysDown.delete(t.code),this.handOff(n),!0):!1}bus(t){if(!this.inst())return;const n=t.source??"bus";if(t.kind==="notes"&&t.events){for(const a of t.events){const s=`${n}|${a.id}`;if(this.busIds.has(s))continue;const o=this.host.timeOf?.(a.startBeat),i=this.host.timeOf?.(a.startBeat+Math.max(.01,a.lengthBeats));if(o==null||i===null||i===void 0)continue;this.busIds.add(s);const l=a.offsetSec??0;this.noteOn(s,a.note,a.velocity,n,o+l).then(c=>{c&&this.noteOff(s,i+l)})}this.busIds.size>4096&&this.busIds.clear()}else if(t.kind==="audition"&&t.events){const a=Math.max(.05,t.holdSec??.5);for(const s of t.events){const o=`${n}|a|${++this.serial}`;this.noteOn(o,s.note,s.velocity,n).then(async i=>{if(!i)return;const l=await this.host.audio();l&&this.noteOff(o,l.ctx.currentTime+a)})}}else if(t.kind==="off"){this.host.audio().then(a=>{const s=t.atBeat===void 0?void 0:this.host.timeOf?.(t.atBeat)??void 0;a?.node.port.postMessage({type:"offsrc",src:n,...s===void 0?{}:{at:s}})});for(const a of[...this.busIds])a.startsWith(`${n}|`)&&this.busIds.delete(a)}else if(t.kind==="release"&&t.ids)for(const a of t.ids)this.noteOff(`${n}|${a}`)}async sendSamples(t=this.inst(),n){if(!t)return;const a=n??(await this.host.audio())?.node;if(!a)return;const s=`${t.poly}|${t.glideMs}`;s!==this.memo&&(this.memo=s,a.port.postMessage({type:"set",poly:t.poly,glide:t.glideMs/1e3,gain:1}));for(const o of t.zones){if(this.sentHashes.has(o.s))continue;const i=await this.host.store.get(o.s);i&&(this.sentHashes.add(o.s),a.port.postMessage({type:"sample",id:o.s,data:i.data.map(l=>l.slice())}))}}resend(){this.sentHashes.clear(),this.memo="",this.sendSamples()}setOctave(t){const n=this.inst();n&&(this.host.set({...n,octave:Math.max(1,Math.min(6,t))}),this.flashRange=!0,this.refresh(),setTimeout(()=>{this.flashRange=!1,this.refresh()},1e3))}flashRange=!1;edit(t){const n=this.inst();n&&(this.host.set({...n,...t}),("poly"in t||"glideMs"in t)&&this.sendSamples(),this.refresh())}openPicker(){this.picker.click()}refresh(){const t=this.inst(),n=this.panel;n.replaceChildren(this.picker);const a=T("div",{class:"nyx-inst-head"}),s=lt("Load another instrument…",!1,()=>this.openPicker(),"load");if(this.host.help?.(s,"inst:load"),!t){const f=T("button",{type:"button",class:"nyx-inst-empty","data-nyx-inst-empty":"","data-nyx-inst":"load"},T("span",{class:"nyx-inst-empty-lead"},"Drop a folder of note samples or an .sfz here, or click to choose one."),T("span",{class:"nyx-inst-empty-sub"},"NYX reads each note from the file names or the SFZ and shows you the key map before it loads."));f.addEventListener("click",()=>this.openPicker()),this.host.help?.(f,"inst:load"),n.append(f);return}const o=t.zones.length?`${t.layers} of ${t.layersFound} layers`:"";a.append(T("span",{class:"nyx-inst-name"},t.name),T("span",{class:"nyx-inst-meta"},[o,t.poly?"Poly":"Mono"].filter(Boolean).join(" · ")),s),n.append(a);const i=T("div",{class:"nyx-inst-body"}),l=T("div",{class:"nyx-inst-pads","data-nyx-inst-pads":""}),c=Jy(t.root,t.scale,t.octave,t.rows);for(let f=3;f>=0;f--)for(let g=0;g<4;g++){const w=f*4+g,m=c[w],b=T("button",{type:"button",class:"nyx-inst-pad","data-nyx-inst-pad":String(w),"data-note":String(m),...(m%12+12)%12===t.root?{"data-root":""}:{},"aria-label":`Play ${Je(m)}`},T("span",{class:"nyx-inst-pad-n"},gi[(m%12+12)%12]),T("span",{class:"nyx-inst-pad-d"},Je(m)));$v(this,b,m),l.append(b)}const d=T("div",{class:"nyx-inst-side"});d.append(T("div",{class:"nyx-inst-chord","data-nyx-inst-chord":""}));const u=T("div",{class:"nyx-inst-ctl"}),h=T("select",{class:"nyx-inst-select","aria-label":"Key","data-nyx-inst":"key"});gi.forEach((f,g)=>h.append(new Option(f,String(g),!1,g===t.root))),h.addEventListener("change",()=>this.edit({root:Number(h.value)})),u.append(dn("Key",h,T("span",{class:"nyx-inst-off"},oc[t.scale].toLowerCase()))),u.append(dn("Scale",...Object.keys(Bs).map(f=>lt(oc[f],t.scale===f,()=>this.edit({scale:f}),`scale-${f}`)))),u.append(dn("Rows",...[["scale","each row continues the scale"],["fourth","each row up a 4th"]].map(([f,g])=>lt(g,t.rows===f,()=>this.edit({rows:f}),`rows-${f}`))));const p=T("b",{class:"nyx-inst-range","data-nyx-inst":"range",...this.flashRange?{"data-flash":""}:{}},Zy(c));u.append(dn("Octave",lt("z −",!1,()=>this.setOctave(t.octave-1),"oct-down"),p,lt("+ x",!1,()=>this.setOctave(t.octave+1),"oct-up"))),u.append(dn("Plays",lt("Poly",t.poly,()=>this.edit({poly:!0}),"poly"),lt(`Mono · glide ${Math.round(t.glideMs)} ms`,!t.poly,()=>this.edit({poly:!1,glideMs:t.glideMs||bi}),"mono"))),u.append(dn("Also from",T("span",{class:"nyx-inst-off"},"QWERTY keys · CALLIOPE · LUPA replays"))),d.append(u),t.credit&&d.append(T("p",{class:"nyx-inst-credit"},t.credit)),i.append(l,d),n.append(i),this.paintHeld()}paintHeld(){const t=this.held(),n=new Set(t);for(const o of this.panel.querySelectorAll("[data-nyx-inst-pad]"))o.toggleAttribute("data-on",n.has(Number(o.dataset.note)));const a=this.panel.querySelector("[data-nyx-inst-chord]");if(!a)return;if(!t.length){a.replaceChildren(T("span",{class:"nyx-inst-chord-hint"},"Hold a few pads to play a chord; NYX names it here."));return}const s=t0(t)??(t.length===1?Je(t[0]):null);a.replaceChildren(T("span",{class:"nyx-inst-chord-name","data-nyx-inst":"chord"},s??"—"),T("small",{},`${t.map(Je).join(" · ")}${t.length>1?` — held on ${t.length} notes`:""}`))}async open(t,n){const s=(await this.host.audio())?.ctx.sampleRate??48e3,o=t.filter(b=>/\.sfz$/i.test(b.path)).sort((b,v)=>Tc(b.path)-Tc(v.path)||b.path.localeCompare(v.path))[0],i=t.filter(b=>yv.test(b.path)),l=new Map(i.map(b=>[$o(b.path),b]));let c=[],d=0,u=[],h=[],p=Av(t.map(b=>b.path))||"Instrument";if(o){const b=jy(await o.file.text());u=b.comments,h=b.unsupported,p=o.path.split("/").pop()?.replace(/\.sfz$/i,"")??p;const v=o.path.includes("/")?o.path.slice(0,o.path.lastIndexOf("/")+1):"";for(const x of b.regions){const S=l.get($o(v+x.sample))??l.get($o(x.sample));if(!S){d++;continue}c.push({path:S.path,file:S.path.split("/").pop()??S.path,key:x.center,source:"sfz",flag:null,layer:null,rank:x.hivel,rr:x.seqLength>1?x.seqPosition:1,bytes:S.file.size,region:x})}const y=aa(c);for(const x of c)x.layer=y.length>1?`${y.indexOf(x.rank)+1} of ${y.length}`:"—"}else c=i.map(b=>{const v=_y(b.path.split("/").pop()??b.path);return{path:b.path,file:b.path.split("/").pop()??b.path,key:v.key,source:v.key===null?null:"name",flag:v.key===null?"check":null,layer:v.layer?.label??null,rank:v.layer?.rank??0,rr:v.rr??1,bytes:b.file.size}});const f=aa(c.filter(b=>b.rank>0));if(f.length)for(const b of c)b.rank===0&&(b.rank=f[Math.floor((f.length-1)/2)]);if(!c.length){this.host.message?.(o?`The SFZ names ${d} samples that aren't in the folder. Drop the folder that holds them.`:"No audio files there. Drop a folder of note samples (WAV, FLAC, OGG or MP3).");return}n?.name&&(p=n.name),n?.note&&(d=0,this.host.message?.(n.note));const g=new Map(i.map(b=>[b.path,b.file])),w=n?.credit||await Mv(t,u),m=new kv(this,{name:p,entries:c,files:g,rate:s,missing:d,unsupported:h,credit:w,fromSfz:!!o});m.open(),m.hear()}async load(t,n,a,s,o){const l=(await this.host.audio())?.ctx.sampleRate??48e3,c=t.filter(y=>y.key!==null&&a.includes(y.rank)),d=new Map,u=new Map;let h=0,p=0,f=Number.NEGATIVE_INFINITY;const g=a[Math.floor((a.length-1)/2)];for(const y of c){const x=n.get(y.path);if(x){try{const S=await Mi(await x.arrayBuffer(),l),k=Array.from({length:Math.min(2,S.numberOfChannels)},(M,R)=>new Float32Array(S.getChannelData(R))),{sample:$}=await this.host.store.put(k,S.sampleRate);d.set(y.path,$.hash);const A=y.region?await Ev(x):null;u.set(y.path,A?S.sampleRate/A:1),y.rank===g&&y.key!==null&&Math.abs(y.key-60)<=12&&(f=Math.max(f,Lc(k[0],S.sampleRate)))}catch{p++}o(++h,c.length)}}if(!d.size)return!1;if(p&&this.host.message?.(`${p} ${p===1?"file":"files"} couldn't be read by this browser and ${p===1?"was":"were"} left out. WAV or FLAC copies of them will load.`),!Number.isFinite(f))for(const y of c){const x=d.get(y.path),S=x?await this.host.store.get(x):null;S&&y.rank===g&&(f=Math.max(f,Lc(S.data[0],S.sampleRate)))}const w=c.filter(y=>d.has(y.path)),m=Gu(w,a,y=>d.get(y.path)).map((y,x)=>{const S=w[x],k=u.get(S.path)??1;return y.loop?{...y,loop:[y.loop[0]*k,y.loop[1]*k]}:y}),b=this.inst(),v=Number.isFinite(f)?Math.max(-24,Math.min(36,vv-f-20*Math.log10(Ac(Ei)))):0;return this.host.set({name:s.name.slice(0,80)||"Instrument",credit:s.credit.slice(0,200),zones:m,layers:a.length,layersFound:s.layersFound,poly:s.poly,glideMs:b?.glideMs??bi,root:b?.root??0,scale:b?.scale??"minor",rows:b?.rows??"scale",octave:b?.octave??3,gainDb:v}),this.memo="",await this.sendSamples(),this.host.setMode("instrument"),this.refresh(),!0}}class kv{constructor(t,n){this.inst=t,this.o=n,this.layers=aa(n.entries),this.count=Math.min(Iy,Math.max(1,this.layers.length)),this.credit=n.credit,this.name=n.name,this.root=T("div",{class:"nyx-rgn nyx-inst-map",role:"dialog","aria-label":"Load instrument",tabindex:"-1"}),this.scrim=T("div",{class:"nyx-rgn-scrim","data-nyx-inst-map":""},this.root),this.scrim.addEventListener("pointerdown",a=>{a.target===this.scrim&&this.close()}),this.root.addEventListener("keydown",a=>{a.key==="Escape"&&this.close(),a.stopPropagation()})}layers;count;poly=!0;credit;name;root;scrim;ratio={};wav=new Map;busy="";error="";open(){document.body.append(this.scrim),document.documentElement.setAttribute("data-nyx-rgn-open",""),this.measure().then(()=>this.render()),this.render(),this.root.focus({preventScroll:!0})}close(){this.scrim.remove(),document.documentElement.removeAttribute("data-nyx-rgn-open")}async hear(){const t=this.o.entries.filter(a=>a.key===null).slice(0,256);if(!t.length)return;let n=null;try{n=new Worker(new URL("/nyx/assets/instrument-pitch-worker-CV5CCV4z.js",import.meta.url),{type:"module"})}catch{n=null}for(const a of t){const s=this.o.files.get(a.path);if(s){try{const o=await Mi(await s.arrayBuffer(),this.o.rate),i=o.getChannelData(0).slice(0,Math.round(o.sampleRate*1.2)),l=n?await new Promise(c=>{const d=n,u=h=>{h.data.id===a.path&&(d.removeEventListener("message",u),c(h.data.heard))};d.addEventListener("message",u),d.postMessage({id:a.path,data:i,rate:o.sampleRate},[i.buffer])}):null;l?(a.key=l.note,a.source="heard",a.flag="check"):a.flag="assign"}catch{a.flag="assign"}this.layers=aa(this.o.entries),this.render()}}n?.terminate()}async measure(){const t=new Set;for(const n of this.o.entries){const a=this.o.files.get(n.path);if(!a)continue;const s=ko(n.path);if(s==="wav"||s==="wave")try{this.wav.set(n.path,Vu(await a.slice(0,65536).arrayBuffer()))}catch{this.wav.set(n.path,null)}else t.add(s)}for(const n of t){const a=this.o.entries.find(o=>ko(o.path)===n),s=a&&this.o.files.get(a.path);if(s)try{const o=await Mi(await s.arrayBuffer(),this.o.rate);this.ratio[n]=o.length*Math.min(2,o.numberOfChannels)*4/Math.max(1,s.size)}catch{this.ratio[n]=4}}}chosen(){return Uy(this.layers,this.count)}bytesFor(t){const n=this.o.entries.filter(a=>a.key!==null&&t.includes(a.rank));return Vy(n.map(a=>{const s=this.wav.get(a.path);return{bytes:a.bytes,ext:ko(a.path),...s?{frames:s.frames,channels:Math.min(2,s.channels),rate:s.rate}:{}}}),this.o.rate,{default:4,...this.ratio})}render(){const t=this.root,n=this.chosen(),a=Gu(this.o.entries,n,k=>k.path),s=Xy(a),o=T("div",{class:"nyx-rgn-head"},T("span",{class:"nyx-rgn-brand"},"NYX"),T("span",{class:"nyx-rgn-pad"},"Load instrument"),T("span",{class:"nyx-rgn-file"},[this.name,`${new Set(this.o.entries.filter(k=>k.key!==null).map(k=>k.key)).size} notes`,`${this.layers.length} velocity layer${this.layers.length===1?"":"s"} found`,this.o.fromSfz?"from SFZ":"from file names"].join(" · "))),i=T("button",{type:"button",class:"nyx-rgn-x","aria-label":"Close"},"×");i.addEventListener("click",()=>this.close()),o.append(T("span",{class:"nyx-rgn-meta"}),i);const l=T("div",{class:"nyx-inst-kb","data-nyx-inst-map-kb":""});l.innerHTML=Sv(s);const c=T("div",{class:"nyx-inst-legend"},Ia("sampled","sampled note"),Ia("near","covered by stretching"),Ia("far","stretched more than 4 semitones"),Ia("silent","silent"),T("span",{class:"nyx-inst-legend-r"},`${Je(Kt)} – ${Je(Xt)}`)),d=T("table",{class:"nyx-inst-table"});d.append(T("tr",{},T("th",{},"File"),T("th",{},"Key"),T("th",{},"Layer"),T("th",{},"Read from")));const u=[...this.o.entries].sort((k,$)=>(k.flag?0:1)-($.flag?0:1)||(k.key??999)-($.key??999));for(const k of u.slice(0,200)){const $=T("td",{class:"nyx-inst-mono"});if(k.flag){const M=T("select",{class:"nyx-inst-select","aria-label":`Key for ${k.file}`,"data-nyx-inst-assign":k.file});M.append(new Option("—",""));for(let R=Kt;R<=Xt;R++)M.append(new Option(Je(R),String(R),!1,k.key===R));M.addEventListener("change",()=>{k.key=M.value===""?null:Number(M.value),k.source=k.key===null?null:"you",k.flag=k.key===null?"assign":null,this.layers=aa(this.o.entries),this.render()}),$.append(M)}else $.textContent=k.key===null?"—":Je(k.key);const A=T("td",{class:k.flag?"nyx-inst-warn":"nyx-inst-sub"});A.textContent=k.flag==="check"?k.key===null?"listening…":"heard pitch · check":k.flag==="assign"?"no pitch · assign":k.source==="sfz"?"SFZ":k.source==="you"?"you":k.source==="heard"?"heard pitch":"file name",d.append(T("tr",{"data-nyx-inst-row":k.file,...k.flag?{"data-flag":k.flag}:{}},T("td",{},k.file),$,T("td",{class:"nyx-inst-mono"},k.layer??"—"),A))}u.length>200&&d.append(T("tr",{},T("td",{colspan:"4",class:"nyx-inst-sub"},`and ${u.length-200} more`)));const h=T("div",{class:"nyx-inst-mapside"}),p=T("input",{type:"range",class:"nc-range nyx-inst-detail",min:"1",max:String(Math.max(1,this.layers.length)),step:"1",value:String(this.count),"aria-label":"Velocity layers to load","data-nyx-inst":"detail"});p.disabled=this.layers.length<=1,p.addEventListener("input",()=>{const k=p.matches(":focus-visible");this.count=Number(p.value),this.render(),this.root.querySelector('[data-nyx-inst="detail"]')?.focus({preventScroll:!0,focusVisible:k})});const f=this.bytesFor(n),g=this.bytesFor(this.layers);h.append(T("div",{class:"nyx-inst-k"},"Detail"),T("div",{},`${n.length} of ${this.layers.length} velocity layer${this.layers.length===1?"":"s"}`),p,T("div",{class:"nyx-inst-k","data-nyx-inst":"memory"},`${sc(f)} in memory${g>f?` · full detail would be ${sc(g)}`:""}`),T("div",{class:"nyx-inst-k nyx-inst-gap"},"Plays"),T("div",{},lt("Poly · up to 32 notes",this.poly,()=>{this.poly=!0,this.render()},"map-poly")," ",lt("Mono",!this.poly,()=>{this.poly=!1,this.render()},"map-mono")),T("div",{class:"nyx-inst-k nyx-inst-gap"},"Name"));const w=T("input",{type:"text",class:"nyx-inst-text",value:this.name,"aria-label":"Instrument name"});w.addEventListener("input",()=>{this.name=w.value});const m=T("input",{type:"text",class:"nyx-inst-text",value:this.credit,placeholder:"Who made it, and its licence","aria-label":"Credit"});m.addEventListener("input",()=>{this.credit=m.value}),h.append(w,T("div",{class:"nyx-inst-k nyx-inst-gap"},"Credit"),m),this.o.missing&&h.append(T("p",{class:"nyx-inst-warn"},`${this.o.missing} samples the SFZ names aren't in the folder.`));const b=this.o.entries.some(k=>k.key!==null&&n.includes(k.rank)),v=T("button",{type:"button",class:"nyx-inst-go","data-nyx-inst":"go"},this.busy||"Load into NYX");v.disabled=!!this.busy||!b;const y=this.error?this.error:b?"":"No file has a key yet. Pick a key for at least one file in the table.";v.addEventListener("click",async()=>{this.busy="Loading…",this.render();const k=await this.inst.load(this.o.entries,this.o.files,n,{name:this.name,credit:this.credit,poly:this.poly,layersFound:this.layers.length},($,A)=>{this.busy=`Loading ${$} of ${A}…`;const M=this.root.querySelector('[data-nyx-inst="go"]');M&&(M.textContent=this.busy)});this.busy="",this.error=k?"":"This browser couldn't read any of these files. Save them as WAV or FLAC and drop the folder again.",k?this.close():this.render()});const x=T("button",{type:"button",class:"nyx-inst-cancel"},"Cancel");x.addEventListener("click",()=>this.close()),h.append(T("div",{class:"nyx-inst-actions"},v,x)),y&&h.append(T("p",{class:"nyx-inst-error",role:"status","data-nyx-inst":"why"},y));const S=T("div",{class:"nyx-inst-mapgrid"},T("div",{class:"nyx-inst-tablewrap"},d),h);t.replaceChildren(o,T("div",{class:"nyx-inst-mapbody"},l,c,S))}}const Ai=new Map;let Mc=!1;function Wn(e){const t=Ai.get(e.pointerId);t&&(Ai.delete(e.pointerId),t.inst.handOff(t.key))}function $v(e,t,n){Mc||(Mc=!0,window.addEventListener("pointerup",Wn,!0),window.addEventListener("pointercancel",Wn,!0)),t.addEventListener("pointerdown",a=>{a.preventDefault();try{t.setPointerCapture?.(a.pointerId)}catch{}const s=t.getBoundingClientRect(),o=s.height?(a.clientY-s.top)/s.height:.5,i=.45+.55*Math.max(0,Math.min(1,1-o)),l=`p|${n}|${a.pointerId}`;Ai.set(a.pointerId,{inst:e,key:l}),e.handOn(l,n,i)}),t.addEventListener("pointerup",Wn),t.addEventListener("pointercancel",Wn),t.addEventListener("lostpointercapture",a=>{t.isConnected&&Wn(a)}),t.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&!a.repeat&&(a.preventDefault(),a.stopPropagation(),e.handOn(`p|${n}|key`,n,Ei))}),t.addEventListener("keyup",a=>{(a.key==="Enter"||a.key===" ")&&(a.stopPropagation(),e.handOff(`p|${n}|key`))})}function T(e,t={},...n){const a=document.createElement(e);for(const[s,o]of Object.entries(t))a.setAttribute(s,o);for(const s of n)a.append(s);return a}function lt(e,t,n,a){const s=T("button",{type:"button",class:"nyx-inst-choice","data-nyx-inst":a,"aria-pressed":t?"true":"false"},e);return s.addEventListener("click",n),s}function dn(e,...t){return T("div",{class:"nyx-inst-row"},T("span",{class:"nyx-inst-k"},e),T("span",{class:"nyx-inst-v"},...t))}function Ia(e,t){return T("span",{},T("span",{class:"nyx-inst-sw","data-mark":e}),t)}function Sv(e){const t=[0,2,4,5,7,9,11],n=[];for(let d=Kt;d<=Xt;d++)t.includes(d%12)&&n.push(d);const a=1040,s=96,o=a/n.length,i=d=>`var(--nyx-inst-${e.get(d)??"silent"})`;let l="";n.forEach((d,u)=>{l+=`<rect x="${(u*o+.5).toFixed(2)}" y="0" width="${(o-1).toFixed(2)}" height="${s}" fill="var(--nyx-inst-white)"/>`,l+=`<rect data-key="${d}" data-mark="${e.get(d)}" x="${(u*o+.5).toFixed(2)}" y="${s-14}" width="${(o-1).toFixed(2)}" height="14" fill="${i(d)}"/>`,d%12===0&&(l+=`<text x="${(u*o+o/2).toFixed(2)}" y="${s-20}" font-size="9" text-anchor="middle" fill="var(--nyx-inst-label)">C${d/12-1}</text>`)});let c=0;for(let d=Kt;d<=Xt;d++){if(t.includes(d%12)){c++;continue}const u=c*o-o*.32;l+=`<rect x="${u.toFixed(2)}" y="0" width="${(o*.64).toFixed(2)}" height="${(s*.58).toFixed(2)}" rx="1.5" fill="var(--nyx-inst-black)"/>`,l+=`<rect data-key="${d}" data-mark="${e.get(d)}" x="${(u+1).toFixed(2)}" y="${(s*.58-8).toFixed(2)}" width="${(o*.64-2).toFixed(2)}" height="6" fill="${i(d)}"/>`}return`<svg viewBox="0 0 ${a} ${s}" preserveAspectRatio="none" role="img" aria-label="Which sample plays each key">${l}</svg>`}async function Mi(e,t){return new OfflineAudioContext(1,1,t).decodeAudioData(e)}async function Ev(e){if(!/\.wave?$/i.test(e.name))return null;try{return Vu(await e.slice(0,65536).arrayBuffer())?.rate??null}catch{return null}}function Lc(e,t){const n=Math.max(1,Math.round(t*.05));let a=0,s=0;for(let o=0;o<e.length;o++)s+=e[o]*e[o],o>=n&&(s-=e[o-n]*e[o-n]),o>=n-1&&(a=Math.max(a,s/n));return a>0?10*Math.log10(a):Number.NEGATIVE_INFINITY}function ko(e){return(/\.([^.]+)$/.exec(e)?.[1]??"").toLowerCase()}function $o(e){const t=[];for(const n of e.replace(/\\/g,"/").split("/"))!n||n==="."||(n===".."?t.pop():t.push(n.toLowerCase()));return t.join("/")}function Tc(e){return e.split("/").length}function Av(e){const t=e[0]?.split("/")??[];return t.length>1&&e.every(n=>n.split("/")[0]===t[0])?t[0]:""}async function Mv(e,t){const n=[...t];for(const i of e)if(/(readme|licen[cs]e|credits?|about)[^/]*\.(txt|md)$/i.test(i.path)||/\/(licen[cs]e|readme)$/i.test(i.path))try{n.push(...(await i.file.slice(0,2e4).text()).split(/\r?\n/))}catch{}const a=n.find(i=>/\b(CC[- ]?BY(?:[- ][A-Z]{2})*(?:[- ]\d\.\d)?|CC0|public domain|creative commons)/i.test(i)),o=[n.find(i=>/\bby\s+[A-Z][\w.'-]+/.test(i))?.trim(),a?.trim()].filter(i=>!!i);return[...new Set(o)].join(" · ").slice(0,200)}async function kp(e){const t=[],a=[...e.items??[]].map(o=>o.webkitGetAsEntry?.()).filter(o=>!!o);if(!a.length){for(const o of[...e.files??[]])t.push({path:o.name,file:o});return t}const s=async(o,i)=>{if(o.isFile){const l=await new Promise(c=>o.file(c,()=>c(null)));l&&t.push({path:i+o.name,file:l})}else if(o.isDirectory){const l=o.createReader();for(;;){const c=await new Promise(d=>l.readEntries(d,()=>d([])));if(!c.length)break;for(const d of c)await s(d,`${i+o.name}/`)}}};for(const o of a)await s(o,"");return t}const jt=["KeyQ","KeyW","KeyE","KeyR","KeyA","KeyS","KeyD","KeyF"],Lv=Array.from({length:ne},(e,t)=>{const n=(jt[t%jt.length]??"").slice(3);return t<jt.length?n.toLowerCase():n.toUpperCase()});function $p(e){const t=jt.indexOf(e.code);if(t<0)return-1;const n=e.shiftKey?t+jt.length:t;return n<ne?n:-1}class Tv{down=new Map;press(t){if(this.down.has(t.code))return-1;const n=$p(t);return n>=0&&this.down.set(t.code,n),n}release(t){const n=this.down.get(t.code);return n===void 0?-1:(this.down.delete(t.code),n)}releaseAll(){const t=[...this.down.values()];return this.down.clear(),t}}const Qn="data-nc-pointer",Cv=new Set(["range","button","checkbox","radio","submit","reset","file","color","image"]);function Nv(e){const t=e;if(!t||typeof t.closest!="function")return!1;if(t.closest('textarea, [contenteditable]:not([contenteditable="false"])'))return!0;const n=t.closest("input");if(n&&!Cv.has(String(n.type??"text").toLowerCase()))return!0;const a=t.closest("select");return!!a&&a.hasAttribute?.(Qn)!==!0}function Fv(e){const t=n=>n?.tagName==="SELECT";e.addEventListener("pointerdown",n=>{t(n.target)&&n.target.setAttribute(Qn,"")},!0),(e.defaultView??window).addEventListener("change",n=>{const a=n.target;t(a)&&a.hasAttribute(Qn)&&e.activeElement===a&&a.blur()}),e.addEventListener("focusout",n=>{t(n.target)&&n.target.removeAttribute(Qn)},!0),e.addEventListener("keydown",n=>{n.code==="Tab"&&t(e.activeElement)&&e.activeElement.removeAttribute(Qn)},!0)}const Pv="/nyx/assets/limiter-processor-BPr7zuRH.js",zv=.05,Ov=50,Cc=.8;function Dv(e){const t=e.outputLatency;if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t;const n=e.baseLatency;return typeof n=="number"&&Number.isFinite(n)&&n>0?n:0}function Bv(e){const t=Dv(e.ctx),n=e.frameOrigin+e.eventMs,a=e.transport.beatAt(n/1e3-t);let s=null;try{const c=e.ctx.getOutputTimestamp?.();if(c&&Number.isFinite(c.contextTime)&&Number.isFinite(c.performanceTime)&&(c.contextTime??0)>0){const d=c.contextTime+(n-(e.ctxOrigin+c.performanceTime))/1e3;s=e.transport.beatAt(e.mapper.toSharedTime(d)-t)}}catch{s=null}if(s===null||!Number.isFinite(s))return{beat:a,wallBeat:a,audioBeat:s,fallback:!0};const o=n/1e3,i=Math.abs(e.transport.beatAt(o+1)-e.transport.beatAt(o))||1,l=Math.abs(s-a)/i>zv;return{beat:l?a:s,wallBeat:a,audioBeat:s,fallback:l}}function Rv(e){const t=e.win.performance;let n=null;const a=p=>{n={stamp:p.timeStamp,seen:t.now()}},s=["keydown","keyup","pointerdown","pointerup","pointercancel","click"];for(const p of s)e.win.addEventListener(p,a,!0);const o=new Map,i=new Map;let l=0;const c={sent:0,fallbacks:0,skipped:0},d=()=>{const p=t.now(),f=n;return f&&p-f.seen<Ov&&f.stamp<=p+1?f.stamp:p},u=p=>{const f=e.transport();if(!f.running){c.skipped++;return}const g=Bv({eventMs:d(),frameOrigin:t.timeOrigin,ctxOrigin:e.ctxOrigin,ctx:e.ctx,mapper:e.mapper,transport:f});g.fallback&&c.fallbacks++;try{e.send({v:1,kind:"played",events:[{...p,beat:g.beat}]})&&c.sent++}catch{}},h=p=>{const f=o.get(p);f&&(o.delete(p),u({type:"note",id:f.id,on:!1,note:f.note}))};return{hit(p,f=null){if(!Number.isInteger(p)||p<0||p>15)return;o.has(p)&&h(p);const g=`p|${++l}`,w=E0(p+1);o.set(p,{id:g,note:w});let m;try{m=e.nameOf?.(p)?.trim().slice(0,xs)||void 0}catch{m=void 0}u({type:"note",id:g,on:!0,note:w,velocity:Cc,...f==null?{}:{slice:f},...m?{name:m}:{}})},release:h,note(p,f,g,w,m){const b=w??Cc;if(!g){const S=i.get(p);if(!S)return;i.delete(p),u({type:"note",id:S.id,on:!1,note:S.note});return}if(!Number.isInteger(f)||f<0||f>127)return;const v=i.get(p);v&&(i.delete(p),u({type:"note",id:v.id,on:!1,note:v.note}));const y=`n|${++l}`;i.set(p,{id:y,note:f});const x=m?.trim().slice(0,xs);u({type:"note",id:y,on:!0,note:f,velocity:b,...x?{name:x}:{}})},slot(p){!Number.isInteger(p)||p<0||p>9||u({type:"slot",id:`s|${++l}`,slot:p+1})},stats:c,dispose(){for(const p of s)e.win.removeEventListener(p,a,!0);o.clear(),i.clear()}}}function Iv(e,t,n,a=2,s=4){const o=n.top+s,l=n.bottom-s-(e.bottom+a),c=e.top-a-o;let d=!1,u=e.bottom+a,h=null;t.h>l&&(t.h<=c?(d=!0,u=e.top-a-t.h):c>l?(d=!0,h=Math.max(0,c),u=e.top-a-h):h=Math.max(0,l));const p=n.right-s-t.w,f=Math.max(n.left+s,Math.min(e.left,p));return{left:Math.round(f),top:Math.round(u),up:d,maxHeight:h}}function qv(e=document){const t=e.defaultView,n=e.documentElement,a=n.clientWidth||t?.innerWidth||0,s=t?.innerHeight||n.clientHeight||0,o=t?.getComputedStyle(n),i=Number.parseFloat(o?.getPropertyValue("--nc-host-top")??""),l=Number.parseFloat(o?.getPropertyValue("--nc-host-height")??"");return Number.isFinite(i)&&Number.isFinite(l)&&l>0?{top:i,bottom:i+l,left:0,right:a}:{top:0,bottom:s,left:0,right:a}}function _v(e){let t=null;const n=()=>{try{return window.parent!==window?window.parent:null}catch{return null}},a=()=>{const d=n();t={x:window.scrollX,y:window.scrollY,px:d?.scrollX??0,py:d?.scrollY??0}};e.addEventListener("pointerdown",a,!0),e.addEventListener("contextmenu",a,!0);const s=()=>{if(!t)return;(window.scrollX!==t.x||window.scrollY!==t.y)&&window.scrollTo(t.x,t.y);const d=n();try{d&&(d.scrollX!==t.px||d.scrollY!==t.py)&&d.scrollTo(t.px,t.py)}catch{}t=null},o=d=>{const u=d.parentElement;if(!u)return;const h=u.getBoundingClientRect(),p=[...u.querySelectorAll(".nc-padgrid-pad")],f=Number.parseFloat(d.style.left),g=Number.parseFloat(d.style.top),w=p.find(v=>{const y=v.getBoundingClientRect();return Math.abs(y.left-h.left-f)<1&&Math.abs(y.bottom-h.top-g)<1})??p.find(v=>v.contains(document.activeElement));if(!w)return;d.style.maxHeight="";const m=w.getBoundingClientRect(),b=Iv(m,{w:d.offsetWidth,h:d.offsetHeight},qv());d.style.left=`${b.left-h.left}px`,d.style.top=`${b.top-h.top}px`,b.maxHeight!==null&&(d.style.maxHeight=`${b.maxHeight}px`),d.dataset.nyxUp=String(b.up),s(),d.querySelector("button")?.focus({preventScroll:!0})},i=new WeakSet,l=()=>{for(const d of e.querySelectorAll(".nc-padgrid-pad-menu"))i.has(d)||(i.add(d),o(d))},c=new MutationObserver(l);return c.observe(e,{childList:!0,subtree:!0}),()=>{c.disconnect(),e.removeEventListener("pointerdown",a,!0),e.removeEventListener("contextmenu",a,!0)}}function Hv(e,t){const n=new Map,a={sent:0,duplicates:0,notPads:0,empty:0};return{notes(s,o){const i=[];for(const l of o){if(n.has(l.id)){a.duplicates++;continue}const c=A0(l.note);if(c===null){a.notPads++;continue}const d=t(c-1,l.slice??null,l.velocity);if(!d){a.empty++;continue}n.set(l.id,{beat:l.startBeat,source:s}),i.push({pad:c-1,hit:d,beat:l.startBeat,source:s,id:l.id})}i.length&&(a.sent+=i.length,e({type:"hits",hits:i}))},off(s,o){for(const[i,l]of n)l.source===s&&(o===void 0||l.beat>=o-1e-9)&&n.delete(i);e(o===void 0?{type:"unhits",source:s}:{type:"unhits",source:s,atBeat:o})},release(s,o){const i=o.filter(l=>l.startsWith(`${s}|`));i.length&&e({type:"unring",ids:i})},prune(s){for(const[o,i]of n)i.beat<s-16&&n.delete(o)},stats:a}}const jv=1,Wv=3.99,Uv=.25*Math.log(1e3);function Yv(e,t){if(e.mode==="loop")return Number.POSITIVE_INFINITY;if(e.mode==="gate")return 0;const n=Math.abs(e.rate)*Math.max(1,t),a=e.dir==="pingpong"?2:1,s=Math.max(0,e.to-e.from)*a/Math.max(1e-6,n);return e.decay>=Wv?s:Math.min(s,Math.max(.01,e.decay)*Uv)}function Kv(e,t){return Yv(e,t)>=jv}const Xv=1;class Lr{reported=new Set;pending=new Map;static SEEN_MS=40;report(t,n){const a=new Set;for(const s of t)(Number(s[4])||0)&Xv&&a.add(Number(s[0]));this.reported=a;for(const[s,o]of this.pending)n-o>=Lr.SEEN_MS&&this.pending.delete(s)}posted(t,n,a){n?this.pending.set(t,a):(this.pending.delete(t),this.reported.delete(t))}stopped(t){this.pending.delete(t),this.reported.delete(t)}has(t){return this.reported.has(t)||this.pending.has(t)}pads(){return[...new Set([...this.reported,...this.pending.keys()])].sort((t,n)=>t-n)}}const Gv="nyx-presets";function Vv(e,t,n){const a=e.filter(Boolean).length,s=[a?`${a} of ${e.length} saved`:"none saved"];return t!=null&&e[t]&&s.push(`slot ${n[t]??t+1}`),s.join(" · ")}function L(e,t={},...n){const a=document.createElement(e);for(const[s,o]of Object.entries(t))a.setAttribute(s,o);return a.append(...n),a}const $e=(e,t)=>U(e,I(t),e),Pe=(e,t,n)=>e<t?t:e>n?n:e,qa=e=>`${e.toFixed(3)} s`,Nc=e=>`${e>=0?"+":"−"}${Math.abs(e).toFixed(2)} s`,Ee=[1,2,4,8,16,32,64,128],Qv=e=>`${e%1?e.toFixed(1):e}×`,_a=9,Jv=8,Fc=e=>e===1?"next":e===2?"2nd":e===3?"3rd":`${e}th`;class Zv{constructor(t){this.host=t,this.wave=L("canvas",{class:"nyx-rgn-wave","aria-hidden":"true"}),this.live=L("canvas",{class:"nyx-rgn-live","aria-hidden":"true"}),this.labels=L("div",{class:"nyx-rgn-labels","aria-hidden":"true"}),this.startTag=L("button",{type:"button",class:"nyx-rgn-tag","data-nyx-rgn":"start","aria-label":"Start"},"Start"),this.endTag=L("button",{type:"button",class:"nyx-rgn-tag","data-nyx-rgn":"end","aria-label":"End"},"End"),$e(this.startTag,"region:start"),$e(this.endTag,"region:end");const n=L("span",{class:"nyx-rgn-hint","data-nyx-rgn":"hint"},"");this.hint=n,this.stage=L("div",{class:"nyx-rgn-stage","data-nyx-rgn":"stage",role:"group","aria-label":"Waveform"},this.wave,this.live,this.labels,this.startTag,this.endTag,n),this.over=L("canvas",{class:"nyx-rgn-over","aria-hidden":"true"}),this.frame=L("div",{class:"nyx-rgn-frame","data-nyx-rgn":"frame"});const a=L("div",{class:"nyx-rgn-strip","data-nyx-rgn":"strip"},this.over,this.frame);$e(a,"region:overview"),this.zoomBtns=L("span",{class:"nyx-rgn-zbtns",role:"group","aria-label":"Zoom"}),this.hitsRange=L("input",{type:"range",class:"nyx-rgn-hair nyx-rgn-hair-gold",min:"0",max:"1",step:"0.01","aria-label":"Hits: how many the hit finder finds","data-nyx-rgn":"hit-sense"}),this.hitsRange.addEventListener("input",()=>{const o=Number(this.hitsRange.value);this.hitsRange.style.setProperty("--fill",`${(o*100).toFixed(1)}%`),this.host.edit(i=>{i.hitSense=o})}),this.hitsCount=L("span",{class:"nyx-rgn-zlevel","data-nyx-rgn":"hit-count"},"");const s=L("span",{class:"nyx-rgn-hitsk"},"Hits");$e(s,"region:hits"),this.hitsCtl=L("span",{class:"nyx-rgn-hits","data-nyx-rgn":"hits"},L("i",{class:"nyx-rgn-sep"}),s,this.hitsRange,this.hitsCount),this.zoomRow=L("div",{class:"nyx-rgn-zoom"},this.zoomBtns,this.hitsCtl),this.head=L("div",{class:"nyx-rgn-head"}),this.controls=L("div",{class:"nyx-rgn-ctl"}),this.foot=L("div",{class:"nyx-rgn-foot"}),this.dialog=L("div",{class:"nyx-rgn",role:"dialog","aria-modal":"true","aria-label":"Region","data-nyx-rgn":"dialog",tabindex:"-1"},this.head,this.stage,L("div",{class:"nyx-rgn-ov"},a,this.zoomRow),this.controls,this.foot),this.el=L("div",{class:"nyx-rgn-scrim","data-nyx-rgn":"scrim",hidden:""},this.dialog),this.el.addEventListener("pointerdown",o=>{o.target===this.el&&this.host.close()}),this.el.addEventListener("wheel",o=>{if(o.defaultPrevented)return;const i=this.dialog,l=i.contains(o.target),c=o.deltaY<0?i.scrollTop>0:i.scrollTop+i.clientHeight<i.scrollHeight-1;(!l||!c)&&o.preventDefault()},{passive:!1}),this.dialog.addEventListener("keydown",o=>this.key(o)),document.addEventListener("keydown",o=>{!this.isOpen||o.key!=="Escape"||this.dialog.contains(o.target)||(o.preventDefault(),o.stopPropagation(),this.host.close())},!0),this.wireStage(),this.wireStrip(a),this.wireTag(this.startTag,"start"),this.wireTag(this.endTag,"end"),typeof ResizeObserver<"u"&&new ResizeObserver(()=>{this.waveKey="",this.paint()}).observe(this.stage)}el;isOpen=!1;dialog;stage;wave;live;over;frame;startTag;endTag;labels;head;zoomRow;zoomBtns;hitsCtl;hitsRange;hitsCount;hint;controls;foot;zoom=1;view=0;drag=null;touches=new Map;raf=0;waveKey="";colours=null;lastFocus=null;controlsKey="";auditioned="one";open(){if(!this.host.sample())return!1;this.lastFocus=document.activeElement,this.isOpen=!0,this.el.hidden=!1,this.zoom=1,this.view=0,this.waveKey="",this.controlsKey="",this.colours=null,this.refresh(),document.documentElement.dataset.nyxRgnOpen="",this.dialog.focus({preventScroll:!0}),this.intoView();const n=()=>{this.isOpen&&(this.paintLive(),this.raf=requestAnimationFrame(n))};return this.raf=requestAnimationFrame(n),!0}close(){this.isOpen&&(this.isOpen=!1,this.el.hidden=!0,delete document.documentElement.dataset.nyxRgnOpen,cancelAnimationFrame(this.raf),this.lastFocus instanceof HTMLElement&&this.lastFocus.focus())}intoView(){const t=document.documentElement;if(!t.hasAttribute("data-nc-hosted"))return;const n=Number.parseFloat(getComputedStyle(t).getPropertyValue("--nc-host-height"));if(!Number.isFinite(n))return;let a=0;try{a=window.parent?.innerHeight??0}catch{a=0}const s=Number.parseFloat(getComputedStyle(this.el).paddingTop)*2||0,o=Math.min(this.dialog.scrollHeight+s,a||Number.POSITIVE_INFINITY);n+1>=o||t.scrollIntoView({block:"start",behavior:"instant"})}refresh(){if(!this.isOpen)return;const t=this.host.sample();if(!t){this.host.close();return}this.renderHead(t),this.renderZoom(),this.renderHits(t);const n=JSON.stringify([t.index,t.pad.length,t.pad.retrigger,t.pad.slices,t.pad.fit,t.pad.mod.startSource,t.pad.mod.lengthSource,t.pad.mod.lengthSteps,t.pad.mod.lfoBars,t.pad.mod.lfoShape,t.pad.landOnHits,this.hitState(),this.host.aria()]);n!==this.controlsKey?(this.controlsKey=n,this.renderControls(t),this.renderFoot()):this.updateReadouts(t),this.paint()}rateOf(t,n){const a={sampleRate:n.sampleRate,frames:n.frames};return t.fit&&t.keepPitch?js(t,a,this.host.bpm()):xr(t,a,this.host.bpm())}base(t){const n=this.rateOf(t.pad,t),a=t.pad.start*t.frames;if(t.pad.length==="free"||!rt(t.pad))return{start:a,end:t.pad.end*t.frames,rate:n,clamped:!1};if(t.pad.length==="hit"){const o=this.host.hits();if(!o?.length)return{start:a,end:t.pad.end*t.frames,rate:n,clamped:!1};const i=mr(o,a,1,pr*t.sampleRate)??t.frames;return{start:a,end:i,rate:n,clamped:!1}}const s=a+ms(t.pad.length,this.host.bpm(),t.sampleRate,n);return{start:a,end:Math.min(t.frames,s),rate:n,clamped:s>t.frames}}x(t,n){return(t-this.view)*this.zoom*n}f(t,n){return this.view+t/n/this.zoom}setView(t,n=this.zoom){this.zoom=Pe(n,1,Ee[Ee.length-1]),this.view=Pe(t,0,1-1/this.zoom),this.waveKey="";const a=this.zoomRow.contains(document.activeElement);this.renderZoom(),(a||document.activeElement===document.body)&&this.dialog.focus(),this.paint()}zoomAt(t,n){const a=this.stage.clientWidth||1,s=this.f(n,a),o=Pe(this.zoom*t,1,Ee[Ee.length-1]);this.setView(s-n/a/o,o)}zoomStep(t){const n=Ee.findIndex(o=>o>=this.zoom-1e-6),a=t>0?Ee[Math.min(Ee.length-1,n+(Ee[n]>this.zoom+1e-6?0:1))]:Ee[Math.max(0,n-1)],s=this.stage.clientWidth||1;this.zoomAt((a??this.zoom)/this.zoom,s/2)}zoomToRegion(){const t=this.host.sample();if(!t)return;const n=this.base(t),a=n.start/t.frames,s=n.end/t.frames,o=Math.max(.002,s-a)*1.25,i=Pe(1/o,1,Ee[Ee.length-1]);this.setView((a+s)/2-.5/i,i)}wireStage(){const t=this.stage;t.addEventListener("pointerdown",a=>{if(a.target.closest(".nyx-rgn-tag"))return;const s=this.host.sample();if(!s)return;t.setPointerCapture(a.pointerId),this.touches.set(a.pointerId,a.clientX);const o=t.getBoundingClientRect(),i=o.width||1,l=a.clientX-o.left;if(this.touches.size===2){const[p,f]=[...this.touches.values()];this.drag={kind:"pinch",x0:((p??0)+(f??0))/2-o.left,start0:0,end0:0,view0:this.view,zoom0:this.zoom,dist0:Math.max(10,Math.abs((p??0)-(f??0)))};return}const c=this.base(s),d=this.x(c.start/s.frames,i),u=this.x(c.end/s.frames,i),h={x0:a.clientX,start0:s.pad.start,end0:c.end/s.frames,view0:this.view};a.altKey&&l>d&&l<u?this.drag={kind:"move",...h}:Math.abs(l-d)<=_a?this.drag={kind:"start",...h}:Math.abs(l-u)<=_a?this.drag={kind:"end",...h}:this.drag={kind:"pan",...h},t.dataset.dragging=this.drag.kind}),t.addEventListener("pointermove",a=>{this.touches.has(a.pointerId)&&this.touches.set(a.pointerId,a.clientX);const s=this.drag,o=this.host.sample();if(!s||!o){this.hover(a);return}const i=t.clientWidth||1;if(s.kind==="pinch"){const[c,d]=[...this.touches.values()],u=Math.max(10,Math.abs((c??0)-(d??0))),h=Pe((s.zoom0??1)*(u/(s.dist0??u)),1,Ee[Ee.length-1]),p=s.view0+s.x0/i/(s.zoom0??1);this.setView(p-s.x0/i/h,h);return}const l=(a.clientX-s.x0)/i/this.zoom;s.kind==="pan"?this.setView(s.view0-l):this.dragRegion(s.kind,s.start0,s.end0,l,o,a.metaKey||a.ctrlKey)});const n=a=>{this.touches.delete(a.pointerId),this.drag&&this.drag.kind!=="pan"&&this.drag.kind!=="pinch"&&this.host.audition(),this.drag=null,delete t.dataset.dragging};t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n),t.addEventListener("wheel",a=>{const s=t.getBoundingClientRect();if(a.ctrlKey||a.metaKey)a.preventDefault(),this.zoomAt(Math.exp(-a.deltaY*.01),a.clientX-s.left);else if(this.zoom>1&&(Math.abs(a.deltaX)>Math.abs(a.deltaY)||a.shiftKey)){a.preventDefault();const o=a.shiftKey&&!a.deltaX?a.deltaY:a.deltaX;this.setView(this.view+o/(s.width||1)/this.zoom)}},{passive:!1})}hover(t){const n=this.host.sample();if(!n)return;const a=this.stage.getBoundingClientRect(),s=a.width||1,o=t.clientX-a.left,i=this.base(n),l=Math.abs(o-this.x(i.start/n.frames,s))<=_a||Math.abs(o-this.x(i.end/n.frames,s))<=_a;this.stage.dataset.near=l?"true":"false"}dragRegion(t,n,a,s,o,i=!1){const l=2/o.frames,c=o.pad.length!=="free"&&rt(o.pad),d=i?null:this.host.hits(),u=Jv/Math.max(1,this.stage.clientWidth)/this.zoom*o.frames,h=p=>{const f=Dy(d,p*o.frames,u);return f===null?p:f/o.frames};this.host.edit(p=>{if(t==="start")p.start=Pe(h(n+s),0,c?1-l:p.end-l);else if(t==="move"){const f=a-n,g=Pe(h(n+s),0,1-f);p.start=g,p.end=g+f}else if(t==="end"){const f=Pe(h(a+s),p.start+l,1);if(p.length==="hit")p.length="free",p.end=f;else if(c){const g=Pe(a+s,p.start+l,1),w=this.rateOf(p,o),m=(g-p.start)*o.frames;let b=p.length,v=Number.POSITIVE_INFINITY;for(const y of yn){if(y==="free")continue;const x=Math.abs(Math.log(ms(y,this.host.bpm(),o.sampleRate,w)/Math.max(1,m)));x<v&&(v=x,b=y)}p.length=b}else p.end=f}})}wireTag(t,n){t.addEventListener("pointerdown",s=>{const o=this.host.sample();o&&(s.stopPropagation(),t.setPointerCapture(s.pointerId),this.drag={kind:n,x0:s.clientX,start0:o.pad.start,end0:this.base(o).end/o.frames,view0:this.view},s.altKey&&(this.drag.kind="move"),this.stage.dataset.dragging=this.drag.kind)}),t.addEventListener("pointermove",s=>{const o=this.drag,i=this.host.sample();if(!o||!i||o.kind!==n&&o.kind!=="move")return;const l=this.stage.clientWidth||1;this.dragRegion(o.kind,o.start0,o.end0,(s.clientX-o.x0)/l/this.zoom,i,s.metaKey||s.ctrlKey)});const a=()=>{this.drag&&this.host.audition(),this.drag=null,delete this.stage.dataset.dragging};t.addEventListener("pointerup",a),t.addEventListener("pointercancel",a),t.addEventListener("keydown",s=>{const o=this.host.sample();if(!o)return;const i=s.key==="ArrowLeft"?-1:s.key==="ArrowRight"?1:0;if(!i)return;s.preventDefault();const l=s.shiftKey?.1:.01,c=i*l*o.sampleRate/o.frames;this.dragRegion(n,o.pad.start,this.base(o).end/o.frames,c,o,!0)})}wireStrip(t){t.addEventListener("pointerdown",a=>{const s=t.getBoundingClientRect(),o=s.width||1,i=(a.clientX-s.left)/o;t.setPointerCapture(a.pointerId),(i<this.view||i>this.view+1/this.zoom)&&this.setView(i-.5/this.zoom),this.drag={kind:"frame",x0:a.clientX,start0:0,end0:0,view0:this.view}}),t.addEventListener("pointermove",a=>{if(this.drag?.kind!=="frame")return;const s=t.clientWidth||1;this.setView(this.drag.view0+(a.clientX-this.drag.x0)/s)});const n=()=>{this.drag?.kind==="frame"&&(this.drag=null)};t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n)}key(t){t.key==="Escape"?(t.preventDefault(),this.host.close()):(t.key==="="||t.key==="+")&&!t.metaKey&&!t.ctrlKey?(t.preventDefault(),this.zoomStep(1)):t.key==="-"&&!t.metaKey&&!t.ctrlKey&&(t.preventDefault(),this.zoomStep(-1)),t.stopPropagation()}renderHead(t){const n=L("button",{type:"button",class:"nyx-rgn-x","aria-label":"Close"},"×");n.addEventListener("click",()=>this.host.close());const a=t.frames/t.sampleRate;this.head.replaceChildren(L("span",{class:"nyx-rgn-brand"},"NYX"),L("span",{class:"nyx-rgn-pad"},`Pad ${t.index+1}`),L("span",{class:"nyx-rgn-file","data-nyx-rgn":"name"},t.pad.name),L("span",{class:"nyx-rgn-meta"},`${a.toFixed(2)} s · ${Math.round(this.host.bpm())} BPM`),n)}renderZoom(){const t=(a,s,o,i="")=>{const l=L("button",{type:"button",class:`nyx-rgn-zb ${i}`,"aria-label":s},a);return l.addEventListener("click",o),l},n=L("span",{class:"nyx-rgn-zlevel","data-nyx-rgn":"zoom"},Qv(this.zoom));this.zoomBtns.replaceChildren(t("−","Zoom out",()=>this.zoomStep(-1),"nyx-rgn-zsign"),n,t("+","Zoom in",()=>this.zoomStep(1),"nyx-rgn-zsign"),L("i",{class:"nyx-rgn-sep"}),t("Fit","Show the whole sample",()=>this.setView(0,1)),t("Region","Zoom to the part that plays",()=>this.zoomToRegion()))}hitState(){const t=this.host.hits();return t===null?"wait":t.length?"some":"none"}renderHits(t){const n=this.host.hits();document.activeElement!==this.hitsRange&&(this.hitsRange.value=String(t.pad.hitSense)),this.hitsRange.style.setProperty("--fill",`${(t.pad.hitSense*100).toFixed(1)}%`),this.hitsRange.setAttribute("aria-valuetext",n===null?"finding hits":`${n.length} hit${n.length===1?"":"s"}`),this.hitsCount.textContent=n===null?"…":String(n.length),this.hitsCtl.hidden=!rt(t.pad),this.hint.textContent=n!==null&&!n.length?"No hits found · drag Start or End anywhere · ⌘-scroll to zoom":"Start and End snap to hits · hold ⌘ to place freely · ⌥-drag moves the region"}renderControls(t){const n=t.pad,a=rt(n),s=[],o=(y,x,S,k,$)=>{const A=L("span",{class:"nyx-rgn-k"},x);$e(A,y),s.push(A,L("div",{class:"nyx-rgn-v","data-nyx-rgn":$},S),L("div",{class:"nyx-rgn-read","data-nyx-rgn":`${$}-read`},k))},i=L("div",{class:"nyx-rgn-ticks",role:"radiogroup","aria-label":"Length from Start"});yn.forEach((y,x)=>{const S=L("button",{type:"button",role:"radio",class:"nyx-rgn-tick","aria-checked":String(n.length===y),"data-grid":y},Dt(y));a||(S.disabled=!0),S.addEventListener("click",()=>this.host.edit(k=>{if(k.length==="free"&&y!=="free")Pc(k),k.length=y;else if(y==="free"&&k.length!=="free"){if(k.fit){const[$,A]=k.fitSpan??[0,1];k.start=$,k.end=A,k.fitSpan=null}else{const $=this.base(t);k.end=Pe($.end/t.frames,k.start+2/t.frames,1)}k.length="free"}else k.length=y})),i.append(S),(x===0||x===4)&&i.append(L("i",{class:"nyx-rgn-sep"}))});const l=this.hitState();i.append(L("i",{class:"nyx-rgn-sep"}));const c=L("button",{type:"button",role:"radio",class:"nyx-rgn-tick","aria-checked":String(n.length==="hit"),"data-grid":"hit"},"To a hit");$e(c,l==="none"?"region:no-hits":"region:to-hit"),(!a||l==="none")&&(c.disabled=!0),c.addEventListener("click",()=>this.host.edit(y=>{y.length==="free"&&Pc(y),y.length="hit"})),i.append(c);let d=a?this.fittedRead(t):"Slices are on: the grid needs them off";if(!a&&n.slices){const y=L("button",{type:"button",class:"nyx-rgn-link","data-nyx-rgn":"slices-off"},"Turn slices off");$e(y,"region:slices-off"),y.addEventListener("click",()=>this.host.slicesOff()),d=L("span",{class:"nyx-rgn-slices-note"},`Slices are on: a hit plays one of ${n.slices} · `,y)}o("region:length","Length from Start",i,d,"length");const u=L("div",{class:"nyx-rgn-tog",role:"radiogroup","aria-label":"When it's hit again"});for(const[y,x]of[["cut","Cut"],["finish","Let it finish"]]){const S=L("button",{type:"button",role:"radio",class:"nyx-rgn-tick","aria-checked":String(n.retrigger===y),"data-retrigger":y},x);S.addEventListener("click",()=>this.host.edit(k=>{k.retrigger=y})),u.append(S)}o("region:retrigger","When it's hit again",u,n.retrigger==="finish"?"grid hits wait for the end":"each hit starts it again","retrigger");const h=n.mod,p=this.host.aria(),f=this.host.signals(),g=this.host.beat(),w=L("div",{class:"nyx-rgn-sentence"});if(w.append(this.sourcePill("start",h.startSource,a)),h.startSource){const y=L("input",{type:"range",class:"nyx-rgn-hair",min:"0",max:String(Ga),step:"0.01",value:String(h.startAmount),"aria-label":"How far Start moves","data-nyx-rgn":"start-amount"});y.style.setProperty("--fill",`${(h.startAmount/Ga*100).toFixed(1)}%`),y.addEventListener("input",()=>this.host.edit(S=>{S.mod.startAmount=Number(y.value)})),w.append(y,L("span",{class:"nyx-rgn-say"},`up to ${h.startAmount.toFixed(2)} s either way`));const x=L("div",{class:"nyx-rgn-tog nyx-rgn-land",role:"radiogroup","aria-label":"Where Start lands","data-nyx-rgn":"land"});$e(x,"region:land");for(const[S,k]of[[!1,"Anywhere"],[!0,"Land on hits"]]){const $=L("button",{type:"button",role:"radio",class:"nyx-rgn-tick","aria-checked":String(n.landOnHits===S),"data-land":String(S)},k);S&&l==="none"&&($.disabled=!0,$e($,"region:no-hits")),$.addEventListener("click",()=>this.host.edit(A=>{A.landOnHits=S})),x.append($)}w.append(x)}const m=h.startSource&&wo(h.startSource)&&!p?"ARIA not in this Studio":h.startSource?L("span",{},"now ",L("b",{},Nc(hi(h,f,g)))):"";o("region:start-mod","Start moves with",w,m,"start-mod");const b=L("div",{class:"nyx-rgn-sentence"});b.append(this.sourcePill("length",h.lengthSource,a));let v="";if(h.lengthSource){const y=L("div",{class:"nyx-rgn-steps",role:"radiogroup","aria-label":"How many steps"});for(let x=1;x<=Uu;x++){const S=L("button",{type:"button",role:"radio",class:"nyx-rgn-tick","aria-checked":String(h.lengthSteps===x)},String(x));S.addEventListener("click",()=>this.host.edit(k=>{k.mod.lengthSteps=x})),y.append(S)}b.append(L("span",{class:"nyx-rgn-say"},this.lengthSentence(n)),y),n.length==="free"?v="pick a length first":n.length==="hit"?v=wo(h.lengthSource)&&!p?"ARIA not in this Studio":L("span",{},"ends before the ",L("b",{},`${Fc(mi(h,f,g))} hit`)):wo(h.lengthSource)&&!p?v="ARIA not in this Studio":v=L("span",{},"next hit ",L("b",{},Dt(Vn(n.length,fi(h,f,g)))))}if(o("region:length-mod","Length moves with",b,v,"length-mod"),h.startSource==="lfo"||h.lengthSource==="lfo"){const y=L("div",{class:"nyx-rgn-sentence"}),x=L("select",{class:"nyx-rgn-inline","aria-label":"LFO period","data-nyx-rgn":"lfo-bars"});for(const k of Wu)x.append(L("option",{value:String(k)},k<1?`1/${1/k} bar`:k===1?"1 bar":`${k} bars`));x.value=String(h.lfoBars),x.addEventListener("change",()=>this.host.edit(k=>{k.mod.lfoBars=Number(x.value)}));const S=L("div",{class:"nyx-rgn-steps",role:"radiogroup","aria-label":"LFO shape"});for(const k of ju){const $=L("button",{type:"button",role:"radio",class:"nyx-rgn-tick","aria-checked":String(h.lfoShape===k)},k==="sine"?"Sine":k==="triangle"?"Triangle":"Steps");$.addEventListener("click",()=>this.host.edit(A=>{A.mod.lfoShape=k})),S.append($)}y.append(L("span",{class:"nyx-rgn-say"},"once every"),x,S),o("region:lfo","NYX LFO",y,"on the Studio's beat","lfo")}this.controls.replaceChildren(...s)}fittedRead(t){const n=L("span",{class:"nyx-rgn-len"},this.lengthReadout(t));if(!t.pad.fit)return n;const a=L("button",{type:"button",class:"nyx-rgn-link","data-nyx-rgn":"fit-off"},"Turn Fit off");$e(a,"region:fit-off"),a.addEventListener("click",()=>this.host.fitOff());const s=t.pad.fit,o=L("span",{class:"nyx-rgn-fit-note","data-nyx-rgn":"fit-note"},`Fitted to ${s} bar${s===1?"":"s"} at ${Math.round(this.host.bpm())} BPM · `,a);return $e(o,"region:fitted"),L("span",{class:"nyx-rgn-read-stack"},n,o)}lengthReadout(t){const n=this.base(t),a=t.pad.fit?Math.max(.001,n.rate):1,s=L("b",{},qa((n.end-n.start)/t.sampleRate/a));if(t.pad.length==="hit"){const o=this.host.hits(),i=o===null?" · finding hits":o.length?n.end>=t.frames?" · no hit after Start: to the end":" · ends before the next hit":" · no hits: End stays put";return L("span",{},s,i)}return L("span",{},s,` from ${qa(n.start/t.sampleRate)}${n.clamped?" · cut at the end":""}`)}updateReadouts(t){const n=this.controls.querySelector('[data-nyx-rgn="length-read"] .nyx-rgn-len');n&&rt(t.pad)&&n.replaceChildren(this.lengthReadout(t));const a=this.controls.querySelector('[data-nyx-rgn="start-mod"] .nyx-rgn-say');a&&(a.textContent=`up to ${t.pad.mod.startAmount.toFixed(2)} s either way`);const s=this.controls.querySelector('[data-nyx-rgn="start-amount"]');s&&(document.activeElement!==s&&(s.value=String(t.pad.mod.startAmount)),s.style.setProperty("--fill",`${(t.pad.mod.startAmount/Ga*100).toFixed(1)}%`))}lengthSentence(t){const n=t.mod;if(t.length==="free")return"moves the grid length";if(t.length==="hit")return n.lengthSource==="aria:phone-shake"?`each shake reaches a hit further, back to the next after ${ca/4} bars`:`ends 1–${1+n.lengthSteps} hits after Start`;const a=Dt(Vn(t.length,-n.lengthSteps)),s=Dt(Vn(t.length,n.lengthSteps));return n.lengthSource==="aria:phone-shake"?`each shake shortens it a step, back to ${Dt(t.length)} after ${ca/4} bars`:`steps between ${a} and ${s}`}sourcePill(t,n,a){const s=L("select",{class:"nyx-rgn-pick","aria-label":t==="start"?"Start moves with":"Length moves with","data-nyx-rgn":`${t}-source`});s.append(L("option",{value:""},"Nothing"));const o=L("optgroup",{label:"NYX"}),i=L("optgroup",{label:this.host.aria()??"ARIA"});for(const d of Hu){const u=L("option",{value:d.id},d.group==="aria"?`ARIA · ${d.label}`:d.label);(d.group==="aria"?i:o).append(u)}s.append(o,i),s.value=n??"",s.disabled=!a,s.addEventListener("change",()=>this.host.edit(d=>{const u=s.value||null;t==="start"?d.mod.startSource=u:d.mod.lengthSource=u}));const c=L("span",{class:"nyx-rgn-pill","data-kind":n?n==="lfo"?"lfo":"aria":"none"},s);return $e(c,`region:${t}-source`),c}renderFoot(){const t=L("button",{type:"button",class:"nyx-rgn-quiet","data-nyx-rgn":"reset"},"Reset region");$e(t,"region:reset"),t.addEventListener("click",()=>this.host.edit(l=>{l.start=0,l.end=1,l.length="free",l.fitSpan=null,l.landOnHits=!1,l.mod=hr()}));const n=this.host.playPos()!==null,a=(this.host.sample()?.pad.slices??0)>0,s=(l,c)=>{const d=L("button",{type:"button",class:"nyx-rgn-play","data-nyx-rgn":l==="region"?"audition-region":"audition","aria-pressed":String(n&&this.auditioned===l)},n&&this.auditioned===l?"Stop":c);return d.dataset.words=c,d.dataset.kind=l,$e(d,l==="region"?"region:audition-region":l==="slice"?"region:audition-slice":"region:audition"),d.addEventListener("click",()=>{this.auditioned=l,this.host.audition(l==="region")}),d},o=a?[s("slice","Audition slice"),s("region","Audition region")]:[s("one","Audition")],i=L("button",{type:"button",class:"nyx-rgn-done","data-nyx-rgn":"done"},"Done");i.addEventListener("click",()=>this.host.close()),this.foot.replaceChildren(t,L("span",{class:"nyx-rgn-sp"}),...o,i)}readColours(){if(this.colours)return this.colours;const t=getComputedStyle(this.dialog),n=a=>t.getPropertyValue(a).trim();return this.colours={top:n("--nyx-rgn-stage-top"),mid:n("--nyx-rgn-stage-mid"),bottom:n("--nyx-rgn-stage-bottom"),slate:n("--nyx-rgn-slate"),grid:n("--nyx-rgn-grid"),bar:n("--nyx-rgn-bar"),goldHi:n("--nyx-rgn-gold-hi"),gold:n("--nyx-rgn-gold"),goldLo:n("--nyx-rgn-gold-lo"),marker:n("--nyx-rgn-marker"),magma:n("--nyx-rgn-magma"),play:n("--nyx-rgn-play"),wash:n("--nyx-rgn-wash"),tick:n("--nyx-rgn-tick")},this.colours}fit(t){const n=t.clientWidth,a=t.clientHeight;if(!n||!a)return null;const s=Math.min(3,globalThis.devicePixelRatio||1);(t.width!==Math.round(n*s)||t.height!==Math.round(a*s))&&(t.width=Math.round(n*s),t.height=Math.round(a*s));const o=t.getContext("2d");return o?(o.setTransform(s,0,0,s,0,0),{ctx:o,w:n,h:a}):null}envelope(t,n,a,s){const o=new Float32Array(s),i=t.data,l=t.frames;for(let c=0;c<s;c++){const d=Math.floor((n+(a-n)*c/s)*l),u=Math.max(d+1,Math.floor((n+(a-n)*(c+1)/s)*l)),h=Math.max(1,Math.floor((u-d)/48));let p=0;for(let f=Math.max(0,d);f<Math.min(l,u);f+=h)for(const g of i){const w=Math.abs(g[f]??0);w>p&&(p=w)}o[c]=p}return o}paint(){if(!this.isOpen)return;const t=this.host.sample();if(!t)return;const n=this.base(t),a=JSON.stringify([t.pad.sample,n.start,n.end,this.zoom,this.view,this.host.bpm(),this.stage.clientWidth,this.stage.clientHeight,t.pad.mod.startSource?t.pad.mod.startAmount:-1,document.documentElement.dataset.theme??"",this.hitsKey(),t.pad.slices,t.pad.cuts]);a!==this.waveKey&&(this.waveKey=a,this.colours=null,this.paintWave(t,n),this.paintStrip(t,n)),this.paintLive()}hitsKey(){const t=this.host.hits();return t===null?"wait":`${t.length}:${t[0]??0}:${t[t.length-1]??0}`}paintWave(t,n){const a=this.fit(this.wave);if(!a)return;const{ctx:s,w:o,h:i}=a,l=this.readColours();s.clearRect(0,0,o,i);const c=s.createRadialGradient(o/2,0,0,o/2,0,Math.max(o,i)*1.1);c.addColorStop(0,l.top),c.addColorStop(.55,l.mid),c.addColorStop(1,l.bottom),s.fillStyle=c,s.fillRect(0,0,o,i);const d=Math.round(i*.14),u=d+(i-d)/2,h=(i-d)/2-6,p=this.view,f=this.zoom,g=1/f,w=60/Math.max(1,this.host.bpm())*t.sampleRate*n.rate/t.frames,m=n.start/t.frames,b=[];if(w*f*o>6){const B=Math.ceil((p-m)/w),G=Math.floor((p+g-m)/w);let Z=Number.NEGATIVE_INFINITY;for(let W=B;W<=G&&W-B<4e3;W++){const Q=this.x(m+W*w,o),Se=W%4===0;s.strokeStyle=Se?l.bar:l.grid,s.lineWidth=1,s.beginPath(),s.moveTo(Math.round(Q)+.5,Se?d:d+(i-d)*.08),s.lineTo(Math.round(Q)+.5,i),s.stroke(),Se&&W>=0&&Q-Z>64&&(Z=Q,b.push(L("span",{class:"nyx-rgn-bar",style:`left:${(Q/o*100).toFixed(3)}%`},`bar ${W/4+1}`)))}}const v=Math.max(2,Math.round(o/2)),y=this.envelope(t,p,p+g,v);let x=0;for(const B of y)B>x&&(x=B);const S=x>0?.92/Math.max(x,.05):1,k=(B,G)=>{const Z=new Path2D,W=Q=>Q/v*o;Z.moveTo(W(B),u);for(let Q=B;Q<=G;Q++)Z.lineTo(W(Q),u-Math.min(1,(y[Math.min(v-1,Q)]??0)*S)*h);for(let Q=G;Q>=B;Q--)Z.lineTo(W(Q),u+Math.min(1,(y[Math.min(v-1,Q)]??0)*S)*h);return Z.closePath(),Z};s.fillStyle=l.slate,s.fill(k(0,v-1));const $=this.x(m,o),A=this.x(n.end/t.frames,o),M=Pe(Math.floor($/o*v),0,v-1),R=Pe(Math.ceil(A/o*v),0,v-1);if(A>0&&$<o&&R>M){const B=s.createLinearGradient(0,d,0,i);B.addColorStop(0,l.wash),B.addColorStop(1,"transparent"),s.fillStyle=B,s.fillRect(Math.max(0,$),d,Math.min(o,A)-Math.max(0,$),i-d);const G=s.createLinearGradient(0,u-h,0,u+h);G.addColorStop(0,l.goldHi),G.addColorStop(.5,l.gold),G.addColorStop(1,l.goldLo);const Z=k(M,R);s.save(),s.beginPath(),s.rect(Math.max(0,$),0,Math.min(o,A)-Math.max(0,$),i),s.clip(),s.shadowColor=l.gold,s.shadowBlur=14,s.globalAlpha=.55,s.fillStyle=G,s.fill(Z),s.shadowBlur=0,s.globalAlpha=1,s.fill(Z),s.restore()}if(t.pad.slices>0&&A>$){const B=_s(t.pad),G=Q=>$+Q*(A-$);s.save(),s.globalAlpha=.16,s.fillStyle=l.goldHi;const Z=G(B[0]??0),W=G(B[1]??1);s.fillRect(Math.max(0,Z),d,Math.min(o,W)-Math.max(0,Z),i-d),s.restore(),s.save(),s.strokeStyle=l.marker,s.globalAlpha=.8,s.lineWidth=1,s.setLineDash([4,4]);for(const Q of B.slice(1,-1)){const Se=Math.round(G(Q))+.5;Se<0||Se>o||(s.beginPath(),s.moveTo(Se,d),s.lineTo(Se,i),s.stroke())}s.restore(),W>0&&Z<o&&b.push(L("span",{class:"nyx-rgn-bar nyx-rgn-slice","data-nyx-rgn":"slice-label",style:`left:${(Math.max(0,Z)/o*100).toFixed(3)}%`},`slice 1 of ${t.pad.slices} · a hit plays this`))}const K=this.host.hits();let de=!1,H=!1;if(K?.length&&rt(t.pad)){s.lineWidth=2,s.lineCap="round";for(const B of K){const G=this.x(B/t.frames,o);Math.abs(B-n.start)<=1&&(de=!0),Math.abs(B-n.end)<=1&&(H=!0),!(G<-2||G>o+2)&&(s.strokeStyle=B>=n.start-1&&B<=n.end+1?l.goldHi:l.tick,s.beginPath(),s.moveTo(Math.round(G)+.5,i-16),s.lineTo(Math.round(G)+.5,i-5),s.stroke())}s.lineCap="butt"}s.strokeStyle=l.marker,s.lineWidth=1.5;for(const B of[$,A])B>=-2&&B<=o+2&&(s.beginPath(),s.moveTo(B,d-4),s.lineTo(B,i),s.stroke());s.lineWidth=1.5;for(const[B,G]of[[$,de],[A,H]])G&&B>=-10&&B<=o+10&&(s.beginPath(),s.arc(B,i-10,8,0,Math.PI*2),s.stroke());this.stage.dataset.snapStart=String(de),this.stage.dataset.snapEnd=String(H),this.labels.replaceChildren(...b);const qe=(B,G,Z)=>{const W=G>=-1&&G<=o+1;B.hidden=!W,B.style.left=`${(G/o*100).toFixed(3)}%`,B.dataset.side=Z};qe(this.startTag,$,"l"),qe(this.endTag,A,"r"),this.endTag.textContent=n.clamped?"End · cut":"End",this.startTag.setAttribute("aria-valuetext",qa(n.start/t.sampleRate)),this.endTag.setAttribute("aria-valuetext",qa(n.end/t.sampleRate))}paintStrip(t,n){const a=this.fit(this.over);if(!a)return;const{ctx:s,w:o,h:i}=a,l=this.readColours();s.clearRect(0,0,o,i),s.fillStyle=l.bottom,s.fillRect(0,0,o,i);const c=Math.max(2,Math.round(o/3)),d=this.envelope(t,0,1,c);let u=0;for(const g of d)g>u&&(u=g);const h=u>0?1/u:1,p=n.start/t.frames,f=n.end/t.frames;for(let g=0;g<c;g++){const w=(g+.5)/c,m=Math.max(.08,(d[g]??0)*h)*(i/2-2);s.fillStyle=w>=p&&w<=f?l.gold:l.slate,s.fillRect(g/c*o,i/2-m,Math.max(1,o/c-1),m*2)}this.frame.style.left=`${(this.view*100).toFixed(3)}%`,this.frame.style.width=`${(100/this.zoom).toFixed(3)}%`}paintLive(){const t=this.host.sample(),n=this.fit(this.live);if(!t||!n)return;const{ctx:a,w:s,h:o}=n;a.clearRect(0,0,s,o);const i=this.readColours(),l=Math.round(o*.14),c=t.pad.mod,d=this.base(t);if(c.startSource&&rt(t.pad)&&!da(c)){const f=c.startAmount*t.sampleRate/t.frames,g=d.start/t.frames,w=this.x(Math.max(0,g-f),s),m=this.x(Math.min(1,g+f),s),b=a.createLinearGradient(w,0,m,0);b.addColorStop(0,"transparent"),b.addColorStop(.5,i.magma),b.addColorStop(1,"transparent"),a.globalAlpha=.22,a.fillStyle=b,a.fillRect(w,l,m-w,o-l),a.globalAlpha=1;const v=By({start:d.start,end:d.end,frames:t.frames,sampleRate:t.sampleRate,rate:d.rate,grid:t.pad.length,mod:c,hits:this.host.hits(),land:t.pad.landOnHits},this.host.signals(),this.host.beat(),this.host.bpm()),y=this.x(v.from/t.frames,s);a.strokeStyle=i.magma,a.lineWidth=1.2,a.setLineDash([3,4]),a.beginPath(),a.moveTo(y,l),a.lineTo(y,o),a.stroke(),a.setLineDash([]),a.fillStyle=i.magma,a.beginPath(),a.arc(y,o-8,3.5,0,Math.PI*2),a.fill()}const u=this.host.playPos();if(u!==null){const f=this.x(u,s);a.strokeStyle=i.play,a.globalAlpha=.85,a.lineWidth=1,a.beginPath(),a.moveTo(f,l),a.lineTo(f,o),a.stroke(),a.globalAlpha=1}for(const f of this.foot.querySelectorAll(".nyx-rgn-play")){const g=u!==null&&f.dataset.kind===this.auditioned;f.getAttribute("aria-pressed")!==String(g)&&(f.setAttribute("aria-pressed",String(g)),f.textContent=g?"Stop":f.dataset.words??"Audition")}const h=this.controls.querySelector('[data-nyx-rgn="start-mod-read"] b');h&&c.startSource&&(h.textContent=Nc(hi(c,this.host.signals(),this.host.beat())));const p=this.controls.querySelector('[data-nyx-rgn="length-mod-read"] b');p&&c.lengthSource&&t.pad.length==="hit"?p.textContent=`${Fc(mi(c,this.host.signals(),this.host.beat()))} hit`:p&&c.lengthSource&&t.pad.length!=="free"&&(p.textContent=Dt(Vn(t.pad.length,fi(c,this.host.signals(),this.host.beat()))))}}function Pc(e){e.fit&&!e.slices&&(e.fitSpan=[e.start,e.end])}const ew="/nyx/assets/sampler-processor-C5bMK5TY.js",kt=16,tw=.03,nw=.002,aw=.02,sw=.7;function Sp(e,t){const{from:n,to:a,sampleRate:s}=e,o=Math.round(tw*s),i=Math.max(2,Math.min(kt,Math.round(t.count??kt)));if(a-n<o*2)return{cuts:[n,a],hits:[n]};if(t.mode==="transients"){const p=wi(e,t.sensitivity??.5),f=p.find(w=>w.cut-n<o),g=[];for(const w of p){if(g.length>=i-1)break;w.cut-n<o||a-w.cut<o||g.every(m=>Math.abs(m.cut-w.cut)>=o)&&g.push(w)}return g.sort((w,m)=>w.cut-m.cut),{cuts:[n,...g.map(w=>w.cut),a],hits:[f?f.hit:n,...g.map(w=>w.hit)]}}let l,c=a;if(t.mode==="even")l=Array.from({length:i},(p,f)=>n+Math.round((a-n)*f/i));else{const p=60/(t.bpm&&t.bpm>0?t.bpm:120)/(t.perBeat??1)*s;l=[];for(let f=0;f<kt&&n+f*p<a-o;f++)l.push(n+Math.round(f*p));l.length>=kt&&(c=Math.min(a,n+Math.round(kt*p)))}const d=t.snap===!1?0:Math.round(aw*s),u=d?wi(e,sw):[];return{cuts:[...l.map((p,f)=>{if(f===0||!d)return p;let g=p,w=d+1;for(const m of u){const b=Math.abs(m.hit-p);b<=d&&b<w&&(w=b,g=m.cut)}return g}),c],hits:l}}function ow(e,t){const n=e.to-e.from;if(t<2||n<64)return[];const s=Sp(e,{mode:"transients",sensitivity:.5,count:t}).cuts.slice(1,-1).map(o=>(o-e.from)/n).filter(o=>o>.001&&o<.999);for(let o=1;s.length<t-1&&o<t;o++){const i=o/t;s.every(l=>Math.abs(l-i)>.5/t)&&s.push(i)}for(let o=1;s.length<t-1;o++)s.push(o/(t+1));return s.sort((o,i)=>o-i).slice(0,t-1)}function iw(e){const t=o=>Math.round(o*10)/10;if(e.fit>0&&e.seconds>0)return{bpm:t(e.fit*240/e.seconds),known:!0,from:"from its Fit"};if(e.given>0)return{bpm:e.given,known:!0,from:e.givenFrom??"from the take"};const n=hp(e.name);if(n)return{bpm:n,known:!0,from:"from its name"};const a=fp(e.seconds,e.studioBpm);if(a)return{bpm:t(a*240/e.seconds),known:!0,from:"the Studio's"};const s=rw(e.seconds);return s?{bpm:s.bpm,known:!1,from:"guessed from its length"}:{bpm:e.studioBpm,known:!1,from:"the Studio's"}}function rw(e,t=[]){let n=null;for(const a of[1,2,4,8]){const s=a*4*60/e;if(s<70||s>180)continue;const o=60/s/4,l=(t.length?t.reduce((c,d)=>c+Math.abs(d/o-Math.round(d/o)),0)/t.length:0)+Math.abs(s-110)/2e3;(!n||l<n.score)&&(n={bpm:s,bars:a,score:l})}return n?{bpm:Math.round(n.bpm*10)/10,bars:n.bars}:null}function Tr(e,t,n){const a=60/n/4*t,s=e.cuts[0],o=(e.cuts[e.cuts.length-1]-s)/a,i=Math.max(1,Math.ceil(o/pe-.06)),l=new Set;return{positions:e.hits.map(d=>{const u=Math.max(0,Math.round((d-s)/a));return l.has(u)?-1:(l.add(u),u)}),bars:i>8?0:i}}function Ep(e,t,n){const{positions:a}=Tr(e,t,n),s=a.map(o=>o>=0);return{cuts:e.cuts.filter((o,i)=>i===e.cuts.length-1||s[i]),hits:e.hits.filter((o,i)=>s[i])}}const lw=.006;function cw(e,t,n,a=lw){const s=60/n/4*t,o=e.cuts[0]??0,i=e.cuts[e.cuts.length-1]??0,l=a*t,c=[...e.cuts],d=[...e.hits];for(let u=1;u<d.length;u++){const h=d[u]??0,p=o+Math.round(Math.round((h-o)/s)*s);Math.abs(h-p)<=l&&p>o&&p<i&&(c[u]=p,d[u]=p)}return Ep({cuts:c,hits:d},t,n)}function dw(e,t){return e.cuts.length-1<=t?e:{cuts:[...e.cuts.slice(0,t),e.cuts[e.cuts.length-1]],hits:e.hits.slice(0,t)}}function uw(e){return e.replace(/\.[a-z0-9]{2,4}$/i,"").split(/[\s_\-.()[\],+&]+/).filter(Boolean).filter((a,s,o)=>!/^\d{2,3}bpm$/i.test(a)&&!/^bpm\d{2,3}$/i.test(a)&&!/^bpm$/i.test(a)&&!(/^[1-9]\d{1,2}$/.test(a)&&Number(a)>=50&&Number(a)<=200)&&!(/^\d{2,3}$/.test(a)&&/^bpm$/i.test(o[s+1]??""))&&!/^[A-G](?:#|b|s|sharp|flat)?(?:m|min|maj|minor|major)?$/.test(a)).join(" ").trim()||"Loop"}function Za(e,t){const n=String(t+1);return`${e.slice(0,23-n.length).trim()} ${n}`}function pw(e,t,n){const a=new Set(e.filter((s,o)=>(o<t||o>=t+n)&&s.sample&&s.choke).map(s=>s.choke));for(const s of[4,3,2,1])if(!a.has(s))return s;return 0}function hw(e,t,n){const a=Math.min(t.cuts.length-1,ne-n.first),s=n.playBack?Tr(t,n.sampleRate,n.playBack.bpm):null,o=Math.round(nw*n.sampleRate),i=[];for(let l=0;l<a;l++){const c=n.first+l,d=e.pads[c];if(!d)continue;const u=l<a-1?Math.min(n.frames,t.cuts[l+1]+o):t.cuts[l+1];if(Object.assign(d,{name:Za(n.stem,l),sample:n.sample,mode:"oneshot",dir:"fwd",start:t.cuts[l]/n.frames,end:u/n.frames,slices:0,cuts:[],tune:0,fine:0,fit:0,attack:0,decay:4,cutoff:0,resonance:0,levelDb:n.source?.levelDb??0,pan:0,choke:n.choke??0,provenance:n.source?.provenance?structuredClone(n.source.provenance):null,rights:n.source?.rights??null,normalize:n.source?.normalize?{...n.source.normalize}:null,offsetDb:n.source?.offsetDb??0,follow:!1,note:n.source?.note??0}),s?.bars){const h=e.lanes[c];h.length=pe,h.steps=Array.from({length:pe},()=>$a());const p=s.positions[l];if(p!==void 0&&p>=0){const f=h.steps[p%pe];f.on=!0;const g=s.bars>1?`${Math.floor(p/pe)+1}:${s.bars}`:"always";f.cond=gs.includes(g)?g:"always"}}i.push(c)}return i}const Ap=827873614,fw=60;async function mw(e,t){const n=new Float64Array([t,e.length,e[0]?.length??0]),a=[new Uint8Array(n.buffer),...e.map(c=>new Uint8Array(c.buffer))],s=a.reduce((c,d)=>c+d.byteLength,0),o=new Uint8Array(s);let i=0;for(const c of a)o.set(c,i),i+=c.byteLength;const l=new Uint8Array(await crypto.subtle.digest("SHA-256",o));return Array.from(l.subarray(0,16),c=>c.toString(16).padStart(2,"0")).join("")}function gw(e){const t=e.data[0]?.length??0,n=new Uint8Array(16+t*4*e.data.length);return new Uint32Array(n.buffer,0,4).set([Ap,e.sampleRate,e.data.length,t]),e.data.forEach((a,s)=>{n.set(new Uint8Array(a.buffer,a.byteOffset,t*4),16+s*t*4)}),n}function bw(e,t){if(t.byteLength<16)return null;const[n,a,s,o]=new Uint32Array(t,0,4);if(n!==Ap||!s||s>2||t.byteLength!==16+o*4*s)return null;const i=Array.from({length:s},(l,c)=>new Float32Array(t.slice(16+c*o*4,16+(c+1)*o*4)));return{hash:e,data:i,sampleRate:a,channels:s,frames:o}}class yw{constructor(t="nyx"){this.folderName=t}memory=new Map;dir=null;folder(){return this.dir??=(async()=>{try{const t=await navigator.storage?.getDirectory?.();return t?await t.getDirectoryHandle(this.folderName,{create:!0}):null}catch{return null}})(),this.dir}info(t){return this.memory.get(t)}held(t){return this.memory.get(t)}async put(t,n){const a=await mw(t,n),s={hash:a,data:t,sampleRate:n,channels:t.length,frames:t[0]?.length??0};this.memory.set(a,s);const o=await this.folder();if(!o)return{sample:s,saved:!1};try{const l=await(await o.getFileHandle(`${a}.f32`,{create:!0})).createWritable?.();return l?(await l.write(gw(s)),await l.close(),{sample:s,saved:!0}):{sample:s,saved:!1}}catch{return{sample:s,saved:!1}}}async get(t){const n=this.memory.get(t);if(n)return n;const a=await this.folder();if(!a)return null;try{const s=await(await a.getFileHandle(`${t}.f32`)).getFile(),o=bw(t,await s.arrayBuffer());return o&&this.memory.set(t,o),o}catch{return null}}async prune(t){for(const a of[...this.memory.keys()])t.has(a)||this.memory.delete(a);const n=await this.folder();if(n)try{const a=[];for await(const s of n.keys())a.push(s);for(const s of a){const o=s.replace(/\.f32$/,"");s.endsWith(".f32")&&!t.has(o)&&await n.removeEntry(s)}}catch{}}}function Mp(e){const t=Math.min(e.length,Math.round(fw*e.sampleRate));return{data:Array.from({length:Math.min(2,e.numberOfChannels)},(a,s)=>{const o=new Float32Array(t);return o.set(e.getChannelData(s).subarray(0,t)),o}),trimmed:t<e.length}}function zc(e,t=200){const n=e[0]?.length??0,a=[];if(!n)return a;const s=n/t;for(let o=0;o<t;o++){const i=Math.floor(o*s),l=Math.max(i+1,Math.floor((o+1)*s));let c=0,d=0;const u=Math.max(1,Math.floor((l-i)/256));for(let h=i;h<l&&h<n;h+=u){let p=0;for(const f of e)p+=f[h]??0;p/=e.length,p<c&&(c=p),p>d&&(d=p)}a.push(Math.max(-1,c),Math.min(1,d))}return a}function Li(e=ww()){try{const t=JSON.parse(e?.getItem("lucy.state")??"null");return Array.isArray(t?.takes)?t.takes.flatMap(n=>{const a=n&&typeof n=="object"?n:{},s=o=>typeof a[o]=="number"&&Number.isFinite(a[o])?a[o]:0;return a.saved!==!0||!s("id")||!s("frames")||!s("sampleRate")?[]:[{id:s("id"),bars:s("bars"),bpm:s("bpm"),sampleRate:s("sampleRate"),channels:Math.min(2,Math.max(1,s("channels"))),frames:s("frames"),rights:a.source==="computer"?"unknown":null}]}):[]}catch{return[]}}async function vw(e){try{const t=await navigator.storage?.getDirectory?.();if(!t)return null;const a=await(await(await t.getDirectoryHandle("lucy")).getFileHandle(`lucy-take-${e.id}.f32`)).getFile(),s=new Float32Array(await a.arrayBuffer());return s.length<e.frames*e.channels?null:Array.from({length:e.channels},(o,i)=>s.slice(i*e.frames,(i+1)*e.frames))}catch{return null}}function ww(){try{return globalThis.localStorage??null}catch{return null}}const Ot=1,So=1024,xw=[1,10,100],kw=32,$w=32,Lp=128,Sw=400,Ew=["off","blocked","live","paused","none"],es=e=>typeof e=="object"&&e!==null,ye=e=>typeof e=="number"&&Number.isFinite(e),Aw=(e,t=Lp)=>typeof e=="string"&&e.length>0&&e.length<=t,Eo=e=>e<0?0:e>1?1:e,Mw=["live","quiet","offline","off"],Lw=["removed","hold"],Oc=e=>e<-1?-1:e>1?1:e,Tw=/^[A-Z0-9?*-]{0,8}$/i;function Dc(e){if(!es(e))return null;const{net:t,sta:n,loc:a,cha:s,name:o,rate:i}=e;return typeof t!="string"||typeof n!="string"||typeof a!="string"||typeof s!="string"||![t,n,a,s].every(l=>Tw.test(l))||!t||!n||typeof o!="string"||o.length>Lp||!ye(i)||i<0||i>1e4?null:{net:t,sta:n,loc:a,cha:s,name:o,rate:i}}function Cw(e){const t=e?.length;if(!(e instanceof Float32Array)&&!Array.isArray(e)&&!ArrayBuffer.isView(e)||t!==So)return null;const n=new Float32Array(So),a=e;for(let s=0;s<So;s++){const o=Number(a[s]);if(!Number.isFinite(o))return null;n[s]=o<-1?-1:o>1?1:o}return n}function Nw(e){if(!es(e))return null;const t=e.v;if(typeof t!="number"||Math.floor(t)!==Ot||!Aw(e.source))return null;const n=e.source;switch(e.kind){case"energy":{if(!Array.isArray(e.frames))return null;const a=[];for(const s of e.frames.slice(0,kw)){if(!es(s)||!ye(s.at)||!ye(s.value))return null;a.push({at:s.at,value:Eo(s.value)})}return{v:Ot,kind:"energy",source:n,frames:a}}case"table":{if(!ye(e.seq)||e.seq<0||!ye(e.at)||!ye(e.rms)||e.rms<0||!xw.includes(e.speed))return null;const a=Cw(e.samples);if(!a)return null;const s=e.station===null?null:Dc(e.station);if(e.station!==null&&!s)return null;const o=e.behindSec===null?null:ye(e.behindSec)?e.behindSec:void 0;return o===void 0?null:{v:Ot,kind:"table",source:n,seq:Math.floor(e.seq),at:e.at,speed:e.speed,station:s,behindSec:o,samples:a,rms:Math.min(1,e.rms)}}case"status":{if(!Mw.includes(e.state))return null;const a=e.station===null?null:Dc(e.station);if(e.station!==null&&!a)return null;const s=c=>c===null?null:ye(c)?c:void 0,o=s(e.newestAgeSec),i=s(e.behindSec);if(o===void 0||i===void 0||typeof e.hold!="boolean"||typeof e.credit!="string"||e.credit.length>Sw)return null;const l={v:Ot,kind:"status",source:n,state:e.state,station:a,newestAgeSec:o,behindSec:i,hold:e.hold,credit:e.credit};return ye(e.retryAt)&&(l.retryAt=e.retryAt),e.recorded===!0&&(l.recorded=!0),Ew.includes(e.motion)&&(l.motion=e.motion),l}case"motion":{if(!Array.isArray(e.frames))return null;const a=[];for(const s of e.frames.slice(0,$w)){if(!es(s)||!ye(s.at)||!ye(s.tiltX)||!ye(s.tiltY)||!ye(s.heading)||!ye(s.shake))return null;const o=s.heading%1;a.push({at:s.at,tiltX:Oc(s.tiltX),tiltY:Oc(s.tiltY),heading:o<0?o+1:o,shake:Eo(s.shake)})}return{v:Ot,kind:"motion",source:n,frames:a}}case"shake":return!ye(e.at)||!ye(e.strength)?null:{v:Ot,kind:"shake",source:n,at:e.at,strength:Eo(e.strength)};case"off":return Lw.includes(e.reason)?{v:Ot,kind:"off",source:n,reason:e.reason}:null;default:return null}}const Fw=["aria:phone-tilt-x","aria:phone-tilt-y","aria:phone-heading","aria:phone-shake"];function Pw(e){let t=!1,n=!1;for(const a of e)if(a.sample)for(const s of[a.mod.startSource,a.mod.lengthSource])s&&Fw.includes(s)&&(t=!0),s==="aria:energy"&&(n=!0);return!t&&!n?null:{...n?{energy:!0}:{},...t?{motion:!0}:{}}}const Bc=e=>e?`${e.energy?"e":""}${e.motion?"m":""}`:"";function zw(e,t,n){const a=e;if(typeof a?.situationIn!="function")return null;let s=null,o="",i=vn();const l=()=>{try{return a.situationSources?.()??[]}catch{return[]}},c=p=>{i=p,t(i)},d=()=>{const p=l().length>0;p!==i.aria&&c(p?{...i,aria:p}:vn())},u=p=>{const f=Nw(p);if(f)if(f.kind==="motion"){const g=f.frames[f.frames.length-1];g&&c({...i,aria:!0,tiltX:g.tiltX,tiltY:g.tiltY,heading:g.heading})}else if(f.kind==="energy"){const g=f.frames[f.frames.length-1];g&&c({...i,aria:!0,energy:g.value})}else f.kind==="shake"?c(zy({...i,aria:!0},n())):f.kind==="off"&&f.reason==="removed"&&c(vn())},h=a.onSituationSources?.(d)??null;return d(),{update(p){const f=Pw(p);if(Bc(f)!==o&&(o=Bc(f),s?.(),s=null,f))try{s=a.situationIn?.(u,f)??null}catch{s=null}},signals:()=>i,source:()=>l()[0]?.name??null,dispose(){s?.(),h?.()}}}function Ow(e){const t=e.setTimer??((i,l)=>setTimeout(i,l)),n=e.clearTimer??(i=>clearTimeout(i)),a=new Map,s=new Set,o={scheduled:0,recalled:0,duplicates:0,late:0,cancelled:0,lastMs:0};return{controls(i,l){for(const c of l){if(c.type!=="slot")continue;const d=`${i}|${c.id}`;if(s.has(d)){o.duplicates++;continue}const u=e.timeAt(c.beat);if(u===null)continue;const h=u-e.now();if(h<-.25){o.late++;continue}s.add(d),s.size>512&&s.delete(s.values().next().value);const p=c.slot-1,f=t(()=>{a.delete(d),o.recalled++,o.lastMs=(e.now()-u)*1e3,e.recall(p)},Math.max(0,h*1e3));a.set(d,{source:i,beat:c.beat,timer:f}),o.scheduled++}},off(i,l){for(const[c,d]of a)d.source===i&&(l===void 0||d.beat>=l-1e-9)&&(n(d.timer),a.delete(c),s.delete(c),o.cancelled++)},stats:o,dispose(){for(const i of a.values())n(i.timer);a.clear()}}}const Dw=150,Tp=96*1024*1024,Bw=e=>Math.round(e*10)/10;function Rw(e,t,n){if(!e.sample||!e.fit||!e.keepPitch||!t)return null;const a=Hs(e),[s,o]=a?[0,t.frames]:wr(e,t,null);if(o-s<2)return null;const i=Bw(n);return{sample:e.sample,from:s,to:o,bars:e.fit,bpm:i,semitones:e.tune+e.fine/100,sampleRate:t.sampleRate,frames:dp(e,t,i),whole:a}}function un(e){return`${e.sample}:${e.from}-${e.to}:${e.bars}:${e.frames}:${e.bpm.toFixed(1)}:${Math.round(e.semitones*100)}`}const Iw=e=>`stretch:${e}`,qw=e=>e.startsWith("stretch:");class _w{constructor(t=Tp,n=()=>{}){this.maxBytes=t,this.drop=n}map=new Map;bytes=0;get size(){return this.map.size}has(t){return this.map.has(t)}get(t){const n=this.map.get(t);return n&&(this.map.delete(t),this.map.set(t,n)),n}byId(t){for(const n of this.map.values())if(n.sample===t)return n}put(t,n=new Set){const a=this.map.get(t.key);a&&(this.bytes-=a.bytes),this.map.delete(t.key),this.map.set(t.key,t),this.bytes+=t.bytes;for(const[s,o]of this.map){if(this.bytes<=this.maxBytes)break;s===t.key||n.has(s)||(this.map.delete(s),this.bytes-=o.bytes,this.drop(o))}}}class Hw{constructor(t,n=Tp){this.host=t,this.cache=new _w(n,a=>t.drop(a))}cache;current=new Map;wanted=new Map;inFlight=new Set;timer=null;queue=Promise.resolve();missingSig="";renders=0;lastMs=0;failed=!1;plan(t,n,a){this.wanted.clear();const s=[];t.forEach((c,d)=>{const u=c.sample?n(c.sample):void 0,h=Rw(c,u,a),p=this.current.get(d);if(!h){this.current.delete(d);return}this.wanted.set(d,h);const f=un(h),g=this.cache.get(f);g?this.current.set(d,g):(p&&!jw(p.job,h)&&this.current.delete(d),this.inFlight.has(f)||s.push(f))});const o=s.join("|");if(!s.length||this.failed){this.missingSig="";return}if(o===this.missingSig&&this.timer!==null)return;this.missingSig=o;const i=this.host.clearTimeout??(c=>clearTimeout(c)),l=this.host.setTimeout??((c,d)=>setTimeout(c,d));this.timer!==null&&i(this.timer),this.timer=l(()=>{this.timer=null,this.missingSig="",this.renderWanted()},Dw)}stretchedFor(t){const n=this.current.get(t),a=this.wanted.get(t);if(!(n&&a&&!!n.job.whole!=!!a.whole))return n}renderFor(t){return this.current.get(t)}pending(t){const n=this.wanted.get(t);return n?this.current.get(t)?.key!==un(n):!1}renderWanted(){for(const t of new Map([...this.wanted.values()].map(n=>[un(n),n])).values()){const n=un(t);this.cache.has(n)||this.inFlight.has(n)||(this.inFlight.add(n),this.queue=this.queue.then(()=>this.renderOne(n,t)))}}idle(){return this.queue}async renderOne(t,n){if(![...this.wanted.values()].some(i=>un(i)===t)){this.inFlight.delete(t);return}const a=Date.now();let s=null;try{s=await this.host.run(n)}catch(i){console.error("NYX stretch",i)}if(this.inFlight.delete(t),!s){this.failed=!0,this.host.changed();return}this.lastMs=Date.now()-a,this.renders++;const o={key:t,job:n,sample:Iw(t),frames:n.frames,bytes:s.reduce((i,l)=>i+l.byteLength,0)};this.host.deliver(o,s);for(const[i,l]of this.wanted)un(l)===t&&this.current.set(i,o);this.cache.put(o,new Set([...this.current.values()].map(i=>i.key))),this.host.changed()}}const jw=(e,t)=>e.sample===t.sample&&e.from===t.from&&e.to===t.to,Ww=48e3;function Cp(e,t){try{const n=e?.latency?.(t);return typeof n=="number"&&Number.isFinite(n)&&n>0&&n<=Ww?Math.round(n):0}catch{return 0}}function Uw(e,t){return{from:e.from+t,to:e.to+t}}const Yw="instance",Kw=99;function Us(e=typeof location>"u"?"":location.search){const t=new URLSearchParams(e).get(Yw)?.trim()??"";if(!/^\d+$/.test(t))return 1;const n=Number(t);return n>=2&&n<=Kw?n:1}function Xw(e,t){return t===1?e:`${e}#${t}`}function Gw(e,t){return t===1?e:`${e} ${t}`}let xt;function Vw(e,t=Us()){if(xt!==void 0)return xt;xt=null;try{if(typeof window>"u"||window.parent===window)return xt;const n=window.parent.ncStudio;n&&n.version===1&&(xt=n.attach(e,{instance:t}))}catch{}return xt}function Qw(){let e;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(e=a.syncScope)}}catch{}if(!e)return{};const t=`/studio/${e}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${t}`,locks:n?{request:(a,s,o)=>n.request(`${a}${t}`,s,o)}:null}}function Jw(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1&&typeof e.fxWorklet=="string"&&e.fxWorklet?e.fxWorklet:null}catch{return null}}function Ct(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.grab?e.grab:null}catch{return null}}function Tn(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.play?e.play:null}catch{return null}}function Ys(e,t=Us()){return t>1?`${e}#${t}`:e}function Zw(e,t=Us()){const n=Tn()?.owner()??null;return n===null||n==="studio"||n===Ys(e,t)}function ex(e){if(e.code!=="Space"&&e.code!=="Backspace")return!1;try{return xt?.studioKey?.({code:e.code,shiftKey:e.shiftKey===!0,repeat:e.repeat===!0})===!0}catch{return!1}}function Np(e){try{return xt?.playKeys?.(e)??(()=>{})}catch{return()=>{}}}const Rc=48;function tx(e){const t=[];for(const n of e.points().slice(-64))t.push(n.beat,n.root===null?Number.NaN:n.root);return{type:"follow",points:t,transpose:e.route?.transpose??0}}function nx(e){const t=Math.trunc((e.transpose??0)/12);return t?`Root, ${t>0?"+":"−"}${Math.abs(t)} oct`:"Root"}function ax(e,t,n=null,a=null){const s=e;if(typeof s?.notesIn!="function")return null;const o=new P0,i=new Set;let l=-1,c="",d=!1;const u=()=>{d=!1;const p=JSON.stringify(o.route),f=p!==c;if(!f&&o.version===l)return;c=p;const g=o.points();g.length>Rc&&o.prune(g[g.length-Rc].beat),l=o.version,t(tx(o));for(const w of[...i])w(f)};try{let p=new Set;s.notesIn(f=>{const g=cp(f);let w=f;if(g?.kind==="routes")p=new Set(g.routes.filter(m=>m.layer).map(m=>m.source)),w=F0(g.routes.filter(m=>!m.layer));else if(g&&"source"in g&&p.has(g.source)){g.kind==="notes"?n?.notes(g.source,g.events):g.kind==="off"?n?.off(g.source,g.atBeat):g.kind==="controls"?n?.controls?.(g.source,g.events):g.kind==="release"&&n?.release?.(g.source,g.ids);return}if(g&&g.kind!=="routes"&&a)try{a(g)}catch{}o.receive(w),d||(d=!0,queueMicrotask(u))},{takes:"pitch"})}catch{return null}const h=p=>{const f=o.route?.source;if(!f||typeof p!="function")return!1;try{return p.call(s,f),!0}catch{return!1}};return{follower:o,route:()=>o.route,resend(){l=-1,u()},takeBack:()=>h(s.notesTakeBack),open:()=>h(s.showInstance),onChange(p){i.add(p)}}}class sx{constructor(t){this.make=t}worker=null;seq=0;calls=new Map;cache=new Map;times=[];workerNow(){if(this.worker||!this.make)return this.worker;try{const t=this.make();t.onmessage=n=>{const a=n.data;this.calls.get(a.id)?.(a),this.calls.delete(a.id)},t.onerror=n=>{for(const a of this.calls.values())a({error:n.message||"worker failed"});this.calls.clear()},this.worker=t}catch{this.worker=null}return this.worker}analysis(t,n,a,s,o){const i=`${t}:${s}:${o}`;let l=this.cache.get(i);return l||(l=this.run(n,a,s,o),this.cache.set(i,l),l.catch(()=>this.cache.delete(i)),this.cache.size>16&&this.cache.delete(this.cache.keys().next().value),l)}run(t,n,a,s){const o=this.workerNow();if(!o)return Promise.resolve(yc(t,n,a,s));const i=++this.seq;return new Promise(l=>{this.calls.set(i,c=>{c.analysis?(c.ms!==void 0&&this.times.push(c.ms),l(c.analysis)):l(yc(t,n,a,s))}),o.postMessage({id:i,channels:t.map(c=>c.slice(a,s)),sampleRate:n,from:a})})}}function X(e,t={},...n){const a=document.createElement(e);for(const[s,o]of Object.entries(t))a.setAttribute(s,o);return a.append(...n),a}const vt=(e,t)=>U(e,I(t),e),ox=[{value:"transients",label:"At hits"},{value:"even",label:"Even"},{value:"beats",label:"Beats"}];class ix{constructor(t){this.host=t,this.canvas=X("canvas",{class:"nyx-chop-wave",role:"img","aria-label":"The slices","data-nyx-chop":"wave"}),vt(this.canvas,"chop:wave"),this.canvas.addEventListener("click",s=>this.clickWave(s)),this.title=X("span",{class:"nc-readout nyx-chop-name","data-nyx-chop":"name"});const n=X("button",{type:"button",class:"nc-btn nyx-chop-close","data-nyx-chop":"close"},"Close");vt(n,"chop:close"),n.addEventListener("click",()=>this.host.close()),this.body=X("div",{class:"nyx-chop-body"});const a=X("span",{class:"nc-label"},"Chop to pads");this.el=X("div",{class:"nyx-chop",role:"region","aria-label":"Chop to pads","data-nyx-chop":""},X("div",{class:"nyx-chop-head"},a,this.title,n),X("div",{class:"nyx-chop-wavebox"},this.canvas),this.body),typeof ResizeObserver<"u"&&new ResizeObserver(()=>this.paintWave()).observe(this.canvas)}el;isOpen=!1;src=null;analysisOf=null;mode="transients";sensitivity=.5;count=16;perBeat=2;first=0;playBack=!0;choke=!0;snap=!0;moreOpen=!1;result=null;status="";canvas;body;title;async open(){const t=await this.host.source();if(!t)return!1;this.isOpen=!0,this.src=t,this.first=t.pad,this.playBack=t.tempo.known,this.analysisOf=null,this.result=null,this.status="Finding the hits…",this.render();const n=await this.host.analysis(t);return this.src!==t||(this.analysisOf=n,this.status="",this.run()),!0}close(){this.isOpen=!1,this.src=null,this.analysisOf=null}set(t){Object.assign(this,t),this.run()}get preview(){return{chop:this.result,first:this.first,playBack:this.playBack,choke:this.choke,bpm:this.src?.tempo.bpm??0}}run(){this.compute(),this.render()}compute(){const t=this.src,n=this.analysisOf;if(!t||!n)return;const a=ne-this.first;let s=Sp(n,{mode:this.mode,sensitivity:this.sensitivity,count:Math.min(this.count,a),bpm:t.tempo.bpm,perBeat:this.perBeat,snap:this.snap});this.playBack&&(s=this.mode==="transients"&&t.tempo.known?cw(s,t.sampleRate,t.tempo.bpm):Ep(s,t.sampleRate,t.tempo.bpm)),this.result=dw(s,a)}field(t,n,a,s=""){const o=X("label",{class:"nc-label",for:`nyx-chop-${t}`},n);return vt(o,`chop:${t}`),X("div",{class:"nc-field","data-nc-row":"","data-nc-id":`chop-${t}`},o,X("span",{class:"nc-readout","data-nc-readout":""},s),a)}choices(t,n,a,s,o){const i=X("div",{class:"nc-choice-row",role:"tablist","aria-label":n,id:`nyx-chop-${t}`,"data-nyx-chop":t});for(const c of s){const d=X("button",{type:"button",class:"nc-choice",role:"tab","aria-selected":String(c.value===a),"data-nc-choice":c.value},c.label);vt(d,I(`chop:${t}:${c.value}`)?`chop:${t}:${c.value}`:`chop:${t}`),c.disabled&&(d.disabled=!0),d.addEventListener("click",()=>o(c.value)),i.append(d)}const l=X("span",{class:"nc-label"},n);return vt(l,`chop:${t}`),X("div",{class:"nc-field nyx-chop-choice","data-nc-row":"","data-nc-id":`chop-${t}`},l,i)}select(t,n,a,s){const o=X("select",{class:"nc-select",id:`nyx-chop-${t}`,"data-nyx-chop":t});for(const i of a)o.append(X("option",{value:i.value},i.label));return o.value=n,o.addEventListener("change",()=>s(o.value)),o}onOff(t,n,a,s,o=!1){return this.choices(t,n,a?"on":"off",[{value:"on",label:"On",disabled:o},{value:"off",label:"Off",disabled:o}],i=>s(i==="on"))}render(){const t=this.src;if(!t)return;const n=(t.to-t.from)/t.sampleRate;this.title.textContent=`${t.stem} · ${n<10?n.toFixed(2):n.toFixed(1)} s`;const a=this.result,s=[];if(s.push(this.choices("mode","Chop",this.mode,ox,p=>{this.mode=p,this.run()})),this.mode==="transients"){const p=X("input",{type:"range",class:"nc-range",id:"nyx-chop-sensitivity",min:"0",max:"1",step:"0.01","data-nyx-chop":"sensitivity"});p.value=String(this.sensitivity);const f=this.field("sensitivity","Sensitivity",p,`${Math.round(this.sensitivity*100)}%`);p.addEventListener("input",()=>{this.sensitivity=Number(p.value),this.compute();const g=f.querySelector(".nc-readout");g&&(g.textContent=`${Math.round(this.sensitivity*100)}%`),this.paintWave()}),p.addEventListener("change",()=>this.render()),f.setAttribute("data-nc-slider",""),f.append(f.querySelector(".nc-readout")),s.push(f)}if(this.mode!=="beats")s.push(this.field("count","Slices",this.select("count",String(this.count),[16,8,4].map(p=>({value:String(p),label:this.mode==="transients"?`Up to ${p}`:String(p)})),p=>{this.count=Number(p),this.run()})));else{const p=f=>Math.ceil(n*t.tempo.bpm/60*f-.05);s.push(this.choices("every","Every",String(this.perBeat),[{value:"1",label:"Beat",disabled:p(1)>kt},{value:"2",label:"1/8",disabled:p(2)>kt},{value:"4",label:"1/16",disabled:p(4)>kt}],f=>{this.perBeat=Number(f),this.run()}))}s.push(this.field("first","Fill from",this.select("first",String(this.first),Array.from({length:ne},(p,f)=>({value:String(f),label:`Pad ${f+1}`})),p=>{this.first=Number(p),this.run()})));const o=a?Tr(a,t.sampleRate,t.tempo.bpm):null,i=o!==null&&o.bars===0;if(s.push(this.onOff("play-back","Play it back",this.playBack&&!i,p=>{this.playBack=p,this.run()},i)),this.status&&s.push(X("p",{class:"nc-note","data-nyx-chop":"status"},this.status)),a&&o){const p=a.cuts.length-1,f=this.first+p,g=p>1?`${Za(t.stem,0)} to ${Za(t.stem,p-1)}`:Za(t.stem,0),w=this.playBack&&o.bars?` Play it back writes ${o.bars===1?"a bar":`${o.bars} bars`} on their lanes.`:i?" Longer than 8 bars: no Play it back.":"";s.push(X("p",{class:"nc-note","data-nyx-chop":"summary"},`${p} slices onto pads ${this.first+1}–${f}: ${g}.${w}`));const m=this.host.pads().slice(this.first,f).filter((b,v)=>b.sample&&this.first+v!==t.pad).length;m&&s.push(X("p",{class:"nc-note nyx-chop-warn","data-nyx-chop":"warn"},`${m===1?"1 of those pads has a sound":`${m} of those pads have sounds`}. Chop replaces ${m===1?"it":"them"}; Undo puts ${m===1?"it":"them"} back.`))}const l=X("div",{class:"nc-group","data-nc-id":"chop-more","data-nc-open":String(this.moreOpen)}),c=X("button",{type:"button",class:"nc-group-toggle","aria-expanded":String(this.moreOpen),"data-nyx-chop":"more"},X("span",{class:"nc-group-title"},"More"),X("span",{class:"nc-group-summary"},`${t.tempo.bpm} BPM · choke ${this.choke?"on":"off"}${this.mode!=="transients"?` · snap ${this.snap?"on":"off"}`:""}`),X("span",{class:"nc-group-mark","aria-hidden":"true"},this.moreOpen?"−":"+"));vt(c,"chop:more"),c.addEventListener("click",()=>{this.moreOpen=!this.moreOpen,this.render()});const d=X("div",{class:"nc-group-body",role:"group"});d.hidden=!this.moreOpen;const u=X("div",{class:"nc-field","data-nc-row":"","data-nc-id":"chop-tempo"},X("span",{class:"nc-label"},"Tempo"),X("span",{class:"nc-readout","data-nc-readout":""},`${t.tempo.bpm} BPM, ${t.tempo.from}`));vt(u.firstElementChild,"chop:tempo"),d.append(u,this.onOff("choke","Choke",this.choke,p=>{this.choke=p,this.render()})),this.mode!=="transients"&&d.append(this.onOff("snap","Snap to hits",this.snap,p=>{this.snap=p,this.run()})),l.append(c,d),s.push(l);const h=X("button",{type:"button",class:"nc-btn nyx-chop-go","data-nyx-chop":"go"},"Chop to pads");vt(h,"chop:go"),h.disabled=!a,h.addEventListener("click",()=>{this.src&&this.result&&this.host.apply(this.src,this.result,{first:this.first,playBack:this.playBack&&!i,choke:this.choke,bpm:this.src.tempo.bpm})}),s.push(h),this.body.replaceChildren(...s),this.paintWave()}clickWave(t){const n=this.src,a=this.result;if(!n||!a)return;const s=this.canvas.getBoundingClientRect(),o=n.from+(t.clientX-s.left)/Math.max(1,s.width)*(n.to-n.from);for(let i=0;i<a.cuts.length-1;i++)if(o>=a.cuts[i]&&o<a.cuts[i+1]){this.host.audition(n,a.cuts[i],a.cuts[i+1]);return}}paintWave(){const t=this.src,n=this.canvas,a=n.clientWidth,s=n.clientHeight;if(!t||!a||!s)return;const o=window.devicePixelRatio||1;n.width=Math.round(a*o),n.height=Math.round(s*o);const i=n.getContext("2d");if(!i)return;i.scale(o,o);const l=getComputedStyle(this.el),c=x=>l.getPropertyValue(x).trim(),d=c("--nc-ui-accent"),u=c("--nc-ui-accent-soft")||c("--nc-ui-divider"),h=c("--nc-ui-color-accent-pad")||c("--nc-ui-text-sub"),p=c("--nc-ui-font-readout")||"monospace",f=this.result;i.clearRect(0,0,a,s);const g=Math.max(1,t.to-t.from),w=x=>(x-t.from)/g*a,m=16,b=m+(s-m)/2,v=(s-m)/2-2;if(f)for(let x=1;x<f.cuts.length-1;x+=2)i.fillStyle=u,i.fillRect(w(f.cuts[x]),m,w(f.cuts[x+1])-w(f.cuts[x]),s-m);i.fillStyle=h;const y=g/a;for(let x=0;x<a;x++){const S=Math.floor(t.from+x*y),k=Math.min(t.to,Math.floor(t.from+(x+1)*y));let $=0,A=0;const M=Math.max(1,Math.floor((k-S)/64));for(let R=S;R<k;R+=M){let K=0;for(const de of t.data)K+=de[R]??0;K/=t.data.length||1,K<$&&($=K),K>A&&(A=K)}i.fillRect(x,b-A*v,1,Math.max(1,(A-$)*v))}if(f){i.fillStyle=d,i.strokeStyle=d,i.lineWidth=1,i.font=`600 10px ${p}`,i.textBaseline="top";for(let x=0;x<f.cuts.length-1;x++){const S=Math.round(w(f.cuts[x]))+.5;i.beginPath(),i.moveTo(S,m-2),i.lineTo(S,s),i.stroke();const k=String(this.first+x+1);w(f.cuts[x+1])-w(f.cuts[x])>i.measureText(k).width+6&&i.fillText(k,S+3,1)}}}attach(t){if(!this.isOpen||!t){this.el.isConnected&&this.el.remove();return}t.nextElementSibling!==this.el&&t.after(this.el),this.paintWave()}}const Ic="My samples";function Ao(e){return e.permission?"used with permission":e.licenseStatus==="redistributable"?"shareable licence":e.licenseStatus==="personal"?"personal use":"licence unknown: personal use"}const qc="http://www.w3.org/2000/svg";function q(e,t={},...n){const a=document.createElement(e);for(const[s,o]of Object.entries(t))a.setAttribute(s,o);return a.append(...n),a}function Un(e,t,n={}){return e?q("a",{href:e,target:"_blank",rel:"noopener noreferrer",...n},t):q("span",n,t)}function rx(e){const t=lx(e);if(!t.length)return"M0 1H48";const n=t.map(i=>Math.sqrt(Math.max(0,i))),a=n.length,s=n.map((i,l)=>`${(l+.5)*48/a} ${1-Math.max(.04,i)*.96}`),o=[...n].map((i,l)=>`${(l+.5)*48/a} ${1+Math.max(.04,i)*.96}`).reverse();return`M0 1L${s.join("L")}L48 1L${o.join("L")}Z`}function lx(e){let t=-1;for(let n=e.length-1;n>=0;n--)if((e[n]??0)>0){t=n;break}return t<0?[]:e.slice(0,Math.min(e.length,Math.max(8,t+2)))}function cx(e){const t=document.createElementNS(qc,"svg");t.setAttribute("viewBox","0 0 48 2"),t.setAttribute("preserveAspectRatio","none"),t.setAttribute("class","nyx-lib-wave"),t.setAttribute("aria-hidden","true");const n=document.createElementNS(qc,"path");return n.setAttribute("d",rx(e)),t.append(n),t}function dx(e){return e<1?`${e.toFixed(2)} s`:e<10?`${e.toFixed(1)} s`:`${Math.round(e)} s`}const ux={kick:"Kick",snare:"Snare",clap:"Clap",hat:"Hat",tom:"Tom",perc:"Perc",cymbal:"Cymbal",fx:"FX",tonal:"Tonal"};class px{constructor(t){this.host=t,this.input=q("input",{type:"search",class:"nyx-lib-input",id:"nyx-library-ask",placeholder:"punchy kick, dusty funk kit",autocomplete:"off",spellcheck:"false",enterkeyhint:"search","aria-label":"Ask the Library","data-nyx-lib":"ask"});const n=q("label",{class:"nc-label",for:"nyx-library-ask"},"Ask");U(n,I("library:ask"),this.input),this.input.addEventListener("input",()=>this.schedule()),this.input.addEventListener("keydown",o=>{o.key==="Enter"?(o.preventDefault(),this.run()):o.key==="Escape"&&(o.preventDefault(),this.host.close())});const a=q("button",{type:"button",class:"nc-btn nyx-lib-close","data-nyx-lib":"close"},"Close");U(a,I("library:close"),a),a.addEventListener("click",()=>this.host.close()),this.forLine=q("p",{class:"nc-note nyx-lib-for","data-nyx-lib":"for"}),this.status=q("p",{class:"nc-note nyx-lib-status","data-nyx-lib":"status","aria-live":"polite"}),this.list=q("ul",{class:"nyx-lib-results","data-nyx-lib":"results"}),this.kitBtn=q("button",{type:"button",class:"nc-btn","data-nyx-lib":"kit"},"Build kit"),U(this.kitBtn,I("library:kit"),this.kitBtn),this.kitBtn.addEventListener("click",()=>void this.buildKit()),this.creditsBtn=q("button",{type:"button",class:"nc-btn","data-nyx-lib":"credits","aria-expanded":"false"},"Credits"),U(this.creditsBtn,I("library:credits"),this.creditsBtn),this.creditsBtn.addEventListener("click",()=>{this.creditsOpen=!this.creditsOpen,this.render()}),this.creditsEl=q("div",{class:"nyx-lib-credits",id:"nyx-library-credits","data-nyx-lib":"credits-list"}),this.creditsBtn.setAttribute("aria-controls",this.creditsEl.id),this.sourcesEl=q("div",{class:"nyx-lib-sources",role:"group","aria-label":"Library source","data-nyx-lib":"sources"}),this.fileInput=q("input",{type:"file",hidden:"","data-nyx-lib":"folder-input","aria-label":"Open a local Library folder"}),this.fileInput.webkitdirectory=!0,this.fileInput.multiple=!0,this.fileInput.addEventListener("change",()=>{const o=this.fileInput.files;o?.length&&this.host.local?.openFiles(o),this.fileInput.value=""});const s=this.host.local;if(s){let o=s.state.status;s.onChange(()=>{const i=s.state.status;i==="ready"&&o!=="ready"&&(this.source="local"),i!=="ready"&&this.source!=="shelf"&&i!=="opening"&&(this.source="shelf"),o=i,this.isOpen?this.run():this.render()})}this.el=q("div",{class:"nyx-library",role:"region","aria-label":"Library","data-nyx-library":""},q("div",{class:"nyx-lib-ask"},n,this.input,a),this.sourcesEl,this.fileInput,this.forLine,this.list,this.status,q("div",{class:"nyx-lib-actions"},this.kitBtn,this.creditsBtn),this.creditsEl)}el;input;forLine;status;list;kitBtn;creditsBtn;creditsEl;sourcesEl;fileInput;source="shelf";lib=null;loading=null;failed=!1;query=null;hits=[];kit=[];playing=null;busy=null;creditsOpen=!1;message="";timer=null;isOpen=!1;open(t){this.isOpen=!0,t!==void 0&&(this.input.value=t),this.ensure().then(()=>this.run()),this.render()}closePanel(){this.isOpen=!1,this.host.stopPreview(),this.playing=null}focus(){this.input.focus()}get catalog(){const t=this.host.local?.lib??null;return t?Gl(bn,this.lib,t):this.lib}catalogFor(t){return t==="local"?this.host.local?.lib??null:this.lib}active(){const t=this.host.local?.lib??null;return this.source==="local"?t:this.source==="all"?t||this.lib?Gl("All",this.lib,t):null:this.lib}choose(t){t!=="shelf"&&!this.host.local?.lib||(this.source=t,this.run())}openFolder(){const t=this.host.local;t&&(t.canRemember?t.pick():this.fileInput.click())}ensure(){return this.lib?Promise.resolve(this.lib):(this.loading??=this.host.catalog().then(t=>(this.lib=t,this.failed=!1,this.render(),t),()=>(this.failed=!0,this.loading=null,this.render(),null)),this.render(),this.loading)}schedule(){this.timer&&clearTimeout(this.timer),this.timer=setTimeout(()=>this.run(),150)}run(){this.timer&&clearTimeout(this.timer),this.timer=null;const t=this.input.value;if(this.message="",!this.lib&&this.source!=="local"&&!this.failed&&(this.ensure().then(a=>a&&this.run()),this.source==="shelf"))return;const n=this.active();!n||!t.trim()?(this.query=null,this.hits=[],this.kit=[]):(this.query=pi(t,n),this.kit=this.query.kit?Jl(n,this.query):[],this.hits=this.query.kit?[]:ay(n,this.query,{limit:Cu})),this.render()}get results(){return{kit:!!this.query?.kit,ids:this.query?.kit?this.kit.map(t=>t.sound.id):this.hits.map(t=>t.sound.id),unknown:this.query?.unknown??[]}}async play(t){if(this.playing===t.id){this.host.stopPreview(),this.playing=null,this.render();return}this.playing=t.id,this.render();try{await this.host.preview(t)}finally{this.playing===t.id&&(this.playing=null,this.render())}}async load(t){if(!this.busy){this.busy=t.id,this.render();try{await this.host.load(t,this.input.value)}finally{this.busy=null,this.render()}}}async chopSound(t){if(!(this.busy||!this.host.chop)){this.busy=t.id,this.render();try{await this.host.chop(t,this.input.value)}finally{this.busy=null}}}async buildKit(){if(this.busy)return;this.source!=="local"&&!this.lib&&await this.ensure();const t=this.active();if(!t)return;const n=this.input.value,a=pi(n,t),s=Jl(t,{...a,roles:[],kit:!0});if(!s.length){this.message="The Library has nothing for a kit yet.",this.render();return}this.busy="kit",this.render();try{await this.host.buildKit(s,n)}finally{this.busy=null,this.render()}}row(t,n){const a=this.playing===t.id,s=q("button",{type:"button",class:"nyx-lib-play","data-nyx-lib":"play","aria-label":`${a?"Stop":"Play"} ${t.title}`,"aria-pressed":String(a)},a?"■":"▶");U(s,I("library:play"),s),s.addEventListener("click",()=>void this.play(t));const o=this.busy===t.id,i=q("button",{type:"button",class:"nc-btn nyx-lib-load","data-nyx-lib":"load","aria-label":`Load ${t.title} onto ${this.host.target().title}`},o?"Loading…":"Load");this.busy&&(i.disabled=!0),U(i,I("library:load"),i),i.addEventListener("click",()=>void this.load(t));const l=Un(t.licenseUrl,ir(t.license,t.licenseStatus,t.permission),{class:"nyx-lib-badge","data-nyx-lib":"badge",title:t.origin==="local"?`${t.license}: ${Ao(t)}`:t.license});U(l,I("library:badge"));const c=ux[t.role]??t.role,d=n?n.slot.role===t.role?n.slot.label:`${n.slot.label} · ${c}`:c,u=q("span",{class:"nyx-lib-meta"},...t.origin==="local"?[q("span",{class:"nyx-lib-chip","data-nyx-lib":"local-chip"},"LOCAL")," "]:[],`${d} · ${dx(t.measures.length)} · `,Un(t.creatorLink,t.creator,{class:"nyx-lib-creator"})),h=q("span",{class:"nyx-lib-name",title:t.title},t.title),p=q("span",{class:"nyx-lib-main"},h,u);n?.note&&p.append(q("span",{class:"nyx-lib-meta nyx-lib-warn"},n.note)),Du(t)&&p.append(q("span",{class:"nyx-lib-meta","data-nyx-lib":"personal"},t.license==="unknown"?"Licence unknown: personal use":`${t.license}, ${Ao(t)}`));const f=q("span",{class:"nyx-lib-wavebox"},cx(t.wave));U(f,I("library:wave"));const g=this.host.chop&&t.origin==="local"&&(t.kind==="loop"||Sr(t.title).kind==="loop")?q("button",{type:"button",class:"nc-btn nyx-lib-load nyx-lib-chop","data-nyx-lib":"chop","aria-label":`Chop ${t.title} to pads`},"Chop"):null;g&&(this.busy&&(g.disabled=!0),U(g,I("library:chop"),g),g.addEventListener("click",()=>void this.chopSound(t)));const w=q("li",{class:"nyx-lib-row","data-nyx-sound":t.id,"data-nyx-role":t.role},s,p,f,l,g?q("span",{class:"nyx-lib-loads"},i,g):i);return a&&(w.dataset.nyxPlaying=""),w}renderCredits(){if(this.creditsBtn.setAttribute("aria-expanded",String(this.creditsOpen)),this.creditsEl.hidden=!this.creditsOpen,!this.creditsOpen)return;const t=this.host.pads(),n=Ru(t);if(!n.length){this.creditsEl.replaceChildren(q("p",{class:"nc-note"},"No Library sounds on the pads yet."));return}const a=cy(n),s=[];for(const o of a){const i=o.origin==="local";a.length>1&&s.push(q("p",{class:"nc-label","data-nyx-lib":`credits-${o.origin}`},i?"Your local Library":bn));const l=q("ul",{class:"nyx-lib-credit-list","data-nyx-origin":o.origin});for(const c of o.credits){const d=`On pad${c.pads.length>1?"s":""} ${c.pads.join(", ")}`;l.append(q("li",{class:"nyx-lib-credit","data-nyx-credit":c.id},q("span",{class:"nyx-lib-name"},c.title),q("span",{class:"nyx-lib-meta"},"by ",Un(c.creatorLink,c.creator)," · ",Un(c.licenseUrl,c.license),...i?[` (${Ao(c)})`]:[],...c.source?[" · ",Un(c.source,"source")]:i?[]:[" · source"],i?` · from ${dr}`:` · via ${c.curator}`),q("span",{class:"nyx-lib-meta"},d)))}s.push(l)}this.creditsEl.replaceChildren(...s)}forText(){const t=this.host.target();return this.source==="local"?`Load goes on ${t.title}. Your local Library: it plays here and is never uploaded.`:this.source==="all"?`Load goes on ${t.title}. musicmatter.art and your local Library together.`:`Load goes on ${t.title}. Curated: every sound checked by a person.`}renderSources(){const t=this.host.local;if(!t){this.sourcesEl.hidden=!0;return}this.sourcesEl.hidden=!1;const n=t.state,a=(i,l,c="")=>{const d=q("button",{type:"button",class:"nc-btn","data-nyx-lib":`source-${i}`,...c?{title:c}:{},"aria-pressed":String(this.source===i),"data-on":String(this.source===i)},l);return U(d,I(`library:source-${i}`),d),d.addEventListener("click",()=>this.choose(i)),d},s=(i,l,c)=>{const d=q("button",{type:"button",class:"nc-btn","data-nyx-lib":i},l);return U(d,I(`library:${i}`),d),d.addEventListener("click",c),d},o=[a("shelf",bn)];if(n.status==="ready"&&o.push(a("local",Ic,n.name),a("all","All")),n.status==="reconnect"){const i=s("reconnect",`Reconnect ${Ic}`,()=>void t.reconnect());i.title=n.name,o.push(i)}else n.status!=="ready"&&o.push(s("open-folder",n.status==="opening"?"Opening…":"Open folder…",()=>this.openFolder()));(n.status==="ready"||n.status==="reconnect")&&o.push(s("forget","Forget",()=>void t.forget())),this.sourcesEl.replaceChildren(...o)}localStatus(){const t=this.host.local;if(!t)return null;const n=t.state;return n.status==="error"?{text:n.message,danger:!0}:this.source==="shelf"?null:n.status==="ready"&&!n.remembered&&!this.query?{text:`${n.lib.sounds.length} local sounds. This browser can't keep the folder: open it again next visit.`,danger:!1}:null}render(){this.renderSources(),this.forLine.textContent=this.forText();const t=[];if(this.query?.kit)for(const i of this.kit)t.push(this.row(i.sound,i));else for(const i of this.hits)t.push(this.row(i.sound));this.list.replaceChildren(...t);let n=this.message,a=!1;const s=this.active(),o=this.localStatus();!n&&o?(n=o.text,a=o.danger):!n&&this.source==="local"&&!s?n="Open your local Library: the folder the sample picker exported.":n||(this.failed&&!s?(n="The Library couldn't be reached. Check the connection, then ask again.",a=!0):s?this.busy==="kit"?n="Building the kit…":this.query?this.query.kit?n=this.kit.length?"A kit for pads 1–8: Build kit puts it on them and keeps the pattern.":"Nothing for a kit.":this.hits.length?n="":n="Nothing matches. Try a role (kick, snare, hat) and a word like dark or tight.":n=`${s.sounds.length} sounds. Try "punchy kick" or "funk kit".`:n="Opening the Library…",this.query?.unknown.length&&(n=`${n?`${n} `:""}Not in the Library's words: ${this.query.unknown.join(", ")}.`.trim())),this.status.textContent=n,this.status.hidden=!n,a?this.status.dataset.ncTone="danger":delete this.status.dataset.ncTone,this.kitBtn.textContent=this.busy==="kit"?"Building…":"Build kit",this.kitBtn.disabled=!!this.busy||!s,this.renderCredits()}refresh(){const t=this.host.target(),n=this.forText();if(this.forLine.textContent!==n){this.forLine.textContent=n;for(const a of this.list.querySelectorAll('[data-nyx-lib="load"]')){const s=a.closest("li")?.querySelector(".nyx-lib-name")?.textContent??"";a.setAttribute("aria-label",`Load ${s} onto ${t.title}`)}}this.creditsOpen&&this.renderCredits()}attach(t){if(!this.isOpen||!t){this.el.isConnected&&this.el.remove();return}if(t.nextElementSibling===this.el)return;const n=document.activeElement===this.input,{selectionStart:a,selectionEnd:s}=this.input;t.after(this.el),n&&(this.input.focus(),a!==null&&s!==null&&this.input.setSelectionRange(a,s))}}const Wt="nyx-local-library.json";function Mo(e){return{name:e.name,async read(t){const n=t.split("/"),a=n.pop();let s=e;for(const o of n)s=await s.getDirectoryHandle(o);return(await s.getFileHandle(a)).getFile()}}}function hx(e){const t=[...e].map(l=>({file:l,path:(l.webkitRelativePath||l.name).replace(/\\/g,"/")})),a=t.filter(l=>l.path===Wt||l.path.endsWith(`/${Wt}`)).sort((l,c)=>l.path.length-c.path.length)[0];if(!a)return null;const s=a.path.slice(0,a.path.length-Wt.length),o=new Map;for(const l of t)l.path.startsWith(s)&&o.set(l.path.slice(s.length),l.file);return{name:s.replace(/\/$/,"").split("/").pop()||"Local Library",async read(l){const c=o.get(l);if(!c)throw new Error(`${l} isn't in the folder`);return c}}}function fx(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60)||"local"}async function mx(e){let t;try{t=await(await e.read(Wt)).text()}catch{throw new Error(`${e.name} has no ${Wt}. Open the folder the sample picker exported.`)}let n;try{n=JSON.parse(t)}catch{throw new Error(`${Wt} in ${e.name} isn't readable JSON.`)}if(n?.kind!=="nyx-local-library")throw new Error(`${e.name} isn't a NYX local Library.`);return zu(n,fx(e.name))}async function gx(e){const t=new Uint8Array(await crypto.subtle.digest("SHA-256",e));return Array.from(t,n=>n.toString(16).padStart(2,"0")).join("")}async function bx(e,t){const n=Ou(t.audio);if(t.origin!=="local"||!n)throw new Error("it isn't a local sound");let a;try{a=await e.read(n)}catch{throw new Error(`${n} isn't in ${e.name} any more`)}const s=await a.arrayBuffer();if(await gx(s)!==t.sha256)throw new Error("the file isn't the one the local Library lists");return s}const yx="nyx-local-library",Ti="handles",Lo="folder";function vx(){return new Promise((e,t)=>{const n=indexedDB.open(yx,1);n.onupgradeneeded=()=>n.result.createObjectStore(Ti),n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}function To(e,t){return vx().then(n=>new Promise((a,s)=>{const o=t(n.transaction(Ti,e).objectStore(Ti));o.onsuccess=()=>a(o.result),o.onerror=()=>s(o.error)}).finally(()=>n.close()))}function wx(){return typeof indexedDB>"u"?{get:async()=>null,set:async()=>{},clear:async()=>{}}:{get:()=>To("readonly",e=>e.get(Lo)).then(e=>e??null),set:e=>To("readwrite",t=>t.put(e,Lo)),clear:()=>To("readwrite",e=>e.delete(Lo))}}function xx(){const e=globalThis;return typeof e.showDirectoryPicker=="function"?e.showDirectoryPicker.bind(globalThis):null}class kx{st={status:"none"};folder=null;handle=null;picker;handles;listeners=[];constructor(t={}){this.picker=t.picker===void 0?xx():t.picker,this.handles=t.handles??wx()}get state(){return this.st}get lib(){return this.st.status==="ready"?this.st.lib:null}get canRemember(){return!!this.picker}onChange(t){this.listeners.push(t)}set(t){this.st=t;for(const n of this.listeners)n()}async load(t,n){this.set({status:"opening",name:t.name});try{const a=await mx(t);return this.folder=t,this.set({status:"ready",name:t.name,lib:a,remembered:n}),!0}catch(a){return this.folder=null,this.set({status:"error",message:a.message}),!1}}async restore(){if(!this.picker)return;let t=null;try{t=await this.handles.get()}catch{return}if(!t)return;this.handle=t,(await t.queryPermission?.({mode:"read"}).catch(()=>"prompt")??"granted")==="granted"?await this.load(Mo(t),!0):this.set({status:"reconnect",name:t.name})}async reconnect(){const t=this.handle;return t?(await t.requestPermission?.({mode:"read"}).catch(()=>"denied")??"granted")!=="granted"?(this.set({status:"reconnect",name:t.name}),!1):this.load(Mo(t),!0):this.pick()}async pick(){if(!this.picker)return!1;let t;try{t=await this.picker({mode:"read",id:"nyx-local-library"})}catch(a){return a.name==="AbortError"||this.set({status:"error",message:`The folder couldn't be opened: ${a.message}`}),!1}const n=await this.load(Mo(t),!0);return n&&(this.handle=t,await this.handles.set(t).catch(()=>{})),n}async openFiles(t){const n=hx(t);return n?this.load(n,!1):(this.set({status:"error",message:`That folder has no ${Wt}. Open the folder the sample picker exported.`}),!1)}async forget(){this.folder=null,this.handle=null,await this.handles.clear().catch(()=>{}),this.set({status:"none"})}bytes(t){return this.folder?bx(this.folder,t):Promise.reject(new Error("its local Library folder isn't open. Open or reconnect it"))}}const _c="nyx-picker-bridge",Hc=1,$x=3e3,Sx=64*1024*1024,Ex=new Set(["127.0.0.1","localhost","[::1]"]);function Ax(e){const t=new URLSearchParams(e).get("picker");if(!t)return null;let n;try{n=new URL(t)}catch{return null}return n.protocol!=="http:"||!Ex.has(n.hostname)||!n.port||n.username||n.password||t.replace(/\/$/,"")!==n.origin?null:n.origin}function Mx(e){const t=e&&typeof e=="object"&&!Array.isArray(e)?e:{};if(t.kind!=="nyx-picker-kit")throw new Error("not a picker kit");const n=Array.isArray(t.sounds)?t.sounds:[];if(!n.length)throw new Error("the kit is empty");if(n.length>ne)throw new Error(`more than ${ne} sounds`);const a=new Set,s=[];for(const l of n){const c=l&&typeof l=="object"?l:{},d=c.pad;if(typeof d!="number"||!Number.isInteger(d)||d<1||d>ne||a.has(d))throw new Error("a sound has no pad of its own");const u=zu({sounds:[c]},"sample-picker").sounds[0];if(!u)throw new Error(`pad ${d}'s sound isn't complete`);a.add(d),s.push({pad:d-1,sound:u})}const o=typeof t.id=="string"?t.id.slice(0,80):"",i=typeof t.name=="string"&&t.name.trim()?t.name.trim().slice(0,80):"Sample picker";return{id:o,name:i,sounds:s}}function Lx(e,t,n){if(n==="replace"){const o=[];for(let i=0;i<ne;i++)e[i]&&o.push(i);return{to:[...t],replaced:o,clear:!0}}const a=new Set;for(let o=0;o<ne;o++)e[o]||a.add(o);const s=t.map(o=>a.delete(o)?o:-1);for(let o=0;o<s.length;o++){if(s[o]!==-1)continue;const i=[...a].sort((l,c)=>l-c)[0];if(i===void 0)break;a.delete(i),s[o]=i}return{to:s,replaced:[],clear:!1}}function Ci(e){const t=[...e].sort((n,a)=>n-a).map(n=>String(n+1));return t.length>1?`${t.slice(0,-1).join(", ")} and ${t[t.length-1]}`:t[0]??""}function Tx(e,t,n){const a=t.to.filter(d=>d>=0),s=t.to.length-a.length,o=a.length,i=`${o===1?"pad":"pads"} ${Ci(a)}`,l=[],c=t.clear&&t.replaced.length>0;if(c){l.push(`This clears all 16 pads in NYX and loads your picker kit onto ${i}; the other pads stay empty.`);const d=t.replaced.map(u=>`${u+1} (${n(u)})`).join(", ");l.push(`Gone: pad${t.replaced.length===1?"":"s"} ${d}. Undo brings all 16 back as they were.`)}else if(l.push(`From the sample picker on this computer, onto ${i}.`),t.replaced.length){const d=t.replaced.map(u=>`${u+1} (${n(u)})`).join(", ");l.push(`Replaces pad${t.replaced.length===1?"":"s"} ${d}. Undo brings ${t.replaced.length===1?"it":"them"} back.`)}return s&&l.push(`${s} won't fit: no empty pads left.`),e.sounds.some(d=>d.sound.licenseStatus==="personal")&&l.push("Some are for personal use only."),l.push("The pattern stays."),{title:c?"Replace everything in NYX?":`Load ${o} sound${o===1?"":"s"} from the picker?`,body:l.join(" ")}}async function Fp(e){const t=new Uint8Array(await crypto.subtle.digest("SHA-256",e));return Array.from(t,n=>n.toString(16).padStart(2,"0")).join("")}async function Cx(e,t,n,a){const s=h=>({ok:!1,placed:[],left:[],message:h}),o=Lx(a.filled(),e.sounds.map(h=>h.pad),t),i=e.sounds.flatMap((h,p)=>{const f=o.to[p]??-1;return f>=0?[{k:h,to:f}]:[]}),l=e.sounds.flatMap((h,p)=>(o.to[p]??-1)<0?[h.pad+1]:[]);if(!i.length)return{...s("Nothing loaded: NYX has no empty pads."),left:l};if(!await a.ask(Tx(e,o,a.padName)))return{...s("Not loaded: cancelled in NYX."),left:l};const c=[];try{for(const{k:h,to:p}of i){const f=n.get(h.pad+1);if(!f)throw new Error(`pad ${h.pad+1}'s audio is missing`);if(await Fp(f)!==h.sound.sha256)throw new Error(`pad ${h.pad+1}'s audio isn't the file named`);const{data:g,rate:w}=await a.decode(h.sound,f);c.push({index:p,sound:h.sound,data:g,rate:w})}}catch(h){return{...s(`Not loaded: ${h.message}. NYX's pads are as they were.`),left:l}}await a.place(c,o.clear);const d=i.map(({k:h,to:p})=>({from:h.pad+1,to:p+1})),u=l.length?` ${l.length} didn't fit (no empty pads).`:"";return{ok:!0,placed:d,left:l,message:o.clear&&o.replaced.length?`Replaced everything in NYX: pad${d.length===1?"":"s"} ${Ci(i.map(h=>h.to))} loaded, the others empty.`:`Loaded onto NYX pad${d.length===1?"":"s"} ${Ci(i.map(h=>h.to))}.${u}`}}const Nx=["pad","undo","play","remove","stop","instrument"],Fx=48,Px="0123456789abcdefghijklmnopqrstuvwxyz";function zx(e,t=Fx){const n=Math.floor((e?.length??0)/2);if(!e||!n)return"";const a=Math.min(t,n),s=[];let o=0;for(let i=0;i<a;i++){const l=Math.floor(i*n/a),c=Math.max(l+1,Math.floor((i+1)*n/a));let d=0;for(let u=l;u<c;u++)d=Math.max(d,Math.abs(e[2*u]??0),Math.abs(e[2*u+1]??0));s.push(d),o=Math.max(o,d)}return s.map(i=>Px[Math.round((o?i/o:0)*35)]).join("")}function Ox(e,t,n){const a=Number(n);if(!Number.isInteger(a)||a<1||a>ne)throw new Error("no such pad");const{kit:s,audio:o}=Cr(e,t);if(s.sounds.length!==1||s.sounds[0]?.pad!==a-1)throw new Error(`the sound isn't for pad ${a}`);return{kit:s,audio:o,pad:a-1}}async function Dx(e,t,n,a){const s=e.sounds[0];if(!s)return{ok:!1,placed:[],left:[],message:"Not loaded: no sound."};const o=s.pad+1;try{const i=t.get(o);if(!i)throw new Error(`pad ${o}'s audio is missing`);if(await Fp(i)!==s.sound.sha256)throw new Error("the audio isn't the file named");const{data:l,rate:c}=await a.decode(s.sound,i);await a.place({index:s.pad,sound:s.sound,data:l,rate:c},n)}catch(i){return{ok:!1,placed:[],left:[],message:`Not loaded: ${i.message}.`}}return{ok:!0,placed:[{from:o,to:o}],left:[],message:`Pad ${o} ← ${s.sound.title}`}}function Bx(e=8){const t=new Map;return{record(n,a){for(t.delete(n),t.set(n,a);t.size>e;)t.delete(t.keys().next().value)},get:n=>t.get(n)??null,drop(n){t.delete(n)},entries:()=>[...t.values()]}}function Rx(e,t){return e?t!==e.after?`Pad ${e.index+1} has changed since; nothing undone.`:null:"Nothing to undo: NYX doesn't know that load (reloaded?)."}function Ix(e){const t=e&&typeof e=="object"?e:{};if(t.kind!=="nyx-picker-instrument")throw new Error("that isn't an instrument");const n=t.layers&&typeof t.layers=="object"?t.layers:{},a=s=>typeof s=="number"&&Number.isInteger(s)&&s>=1&&s<=128?s:1;return{name:typeof t.name=="string"&&t.name.trim()?t.name.trim().slice(0,80):"Instrument",credit:typeof t.credit=="string"?t.credit.slice(0,200):"",source:t.source==="sfz"?"sfz":"folder",layers:{sent:a(n.sent),found:a(n.found)}}}function Pp(e){return Nx.filter(t=>t==="pad"||t==="undo"?!!(e.receivePad&&e.undo):!!e[t])}function zp(e){return Object.prototype.toString.call(e)==="[object ArrayBuffer]"}function Cr(e,t){const n=Mx(e),a=t&&typeof t=="object"?t:{},s=new Map;for(const{pad:o}of n.sounds){const i=a[String(o+1)];if(!zp(i)||i.byteLength>Sx)throw new Error(`pad ${o+1}'s audio is missing or too big`);s.set(o+1,i instanceof ArrayBuffer?i:new Uint8Array(i).slice().buffer)}return{kit:n,audio:s}}class qx{constructor(t){this.o=t}last="";busy=!1;start(){return this.o.self.addEventListener("message",t=>void this.onMessage(t)),this.o.self.setInterval(()=>this.update(!0),$x),this.update(!0),this}update(t=!1){const n=this.o.pads(),a=JSON.stringify(n);!t&&a===this.last||(this.last=a,this.post({type:"state",pads:n,busy:this.busy,can:this.can()}))}can(){return Pp(this.o)}post(t){try{this.o.picker.postMessage({nyx:_c,v:Hc,...t},this.o.origin)}catch{}}padChain=Promise.resolve();onPadMessage(t,n,a){const s=this.padChain.then(async()=>{a(await It(t,this.o,n)),this.update(!0)});return this.padChain=s.catch(()=>{}),s}async onMessage(t){if(t.origin!==this.o.origin||t.source!==this.o.picker)return;const n=t.data;if(!n||typeof n!="object"||n.nyx!==_c||n.v!==Hc)return;if(n.type==="hello")return this.update(!0);const a=typeof n.id=="string"?n.id.slice(0,80):"",s=c=>this.post({type:"result",id:a,...c});if(n.type==="play"||n.type==="stop")return void s(await It(n,this.o,a));if(n.type==="pad"||n.type==="undo"||n.type==="remove")return this.onPadMessage(n,a,s);if(n.type!=="kit")return;if(this.busy)return s({ok:!1,placed:[],left:[],message:"NYX is still loading the last kit."});let o,i;try{({kit:o,audio:i}=Cr(n.kit,n.audio))}catch(c){return s({ok:!1,placed:[],left:[],message:`Not loaded: ${c.message}.`})}const l=n.mode==="fill"?"fill":"replace";this.busy=!0;try{s(await this.o.receive(o,l,i))}catch(c){s({ok:!1,placed:[],left:[],message:`Not loaded: ${c.message}.`})}finally{this.busy=!1,this.update(!0)}}}const jc=e=>{const t=Number(e);return Number.isInteger(t)&&t>=1&&t<=ne?t:0};async function It(e,t,n){const a=s=>({ok:!1,placed:[],left:[],message:s});try{if(e.type==="stop"){const i=Number(e.pad)===0?0:jc(e.pad);return Number(e.pad)!==0&&!i?a("No such pad."):t.stop?await t.stop(i):a("This NYX can't stop a pad for the picker.")}if(e.type==="play"||e.type==="remove"){const i=jc(e.pad);return i?e.type==="play"?t.play?await t.play(i):a("This NYX can't play a pad for the picker."):t.remove?await t.remove(i,n):a("This NYX can't remove a sound for the picker."):a("No such pad.")}if(e.type==="undo")return t.undo?await t.undo(typeof e.of=="string"?e.of.slice(0,80):""):a("This NYX can't undo a picker load.");if(!t.receivePad)return a("This NYX can't load one pad.");const{kit:s,audio:o}=Ox(e.kit,e.audio,e.pad);return await t.receivePad(s,o,n)}catch(s){return a(`Not loaded: ${s.message}.`)}}function _x(e,t){const n=Ax(e.location.search),a=e.opener;return!n||!a||e.parent!==e?null:new qx({self:e,picker:a,origin:n,...t}).start()}function Hx(e){let t=!1,n=Promise.resolve();const a=s=>{const o=n.then(s);return n=o.catch(()=>{}),o};return{pads:()=>e.pads(),can:Pp(e),receivePad:(s,o,i,l)=>a(()=>It({type:"pad",kit:JSON.parse(JSON.stringify(s??null)),audio:o,pad:i},e,typeof l=="string"?l.slice(0,80):"")),undo:s=>a(()=>It({type:"undo",of:s},e,"")),play:s=>It({type:"play",pad:s},e,""),stop:s=>It({type:"stop",pad:s},e,""),remove:(s,o)=>a(()=>It({type:"remove",pad:s},e,typeof o=="string"?o.slice(0,80):"")),async instrument(s,o){const i=u=>({ok:!1,placed:[],left:[],message:u});if(!e.instrument)return i("This NYX can't take an instrument: reload the Studio tab.");let l;try{l=Ix(JSON.parse(JSON.stringify(s??null)))}catch(u){return i(`Not opened: ${u.message}.`)}const c=Array.isArray(o)?o:[],d=[];for(const u of c){const h=u&&typeof u=="object"?u:{};if(typeof h.path!="string"||!h.path||h.path.length>400||!zp(h.bytes))return i("Not opened: a file came without its name or bytes.");d.push({path:h.path.replace(/\\/g,"/"),bytes:h.bytes})}if(!d.length)return i("Not opened: the instrument came with no files.");try{return await e.instrument(l,d)}catch(u){return i(`Not opened: ${u.message}.`)}},async receive(s,o,i){const l=u=>({ok:!1,placed:[],left:[],message:u});if(t)return l("NYX is still loading the last kit.");let c,d;try{({kit:c,audio:d}=Cr(JSON.parse(JSON.stringify(s??null)),i))}catch(u){return l(`Not loaded: ${u.message}.`)}t=!0;try{return await e.receive(c,o==="fill"?"fill":"replace",d)}catch(u){return l(`Not loaded: ${u.message}.`)}finally{t=!1}}}}const jx="nyx",Wx=1;function Op(e){const t={nyx:1,...br(e)};e.inst&&(t.inst=structuredClone(e.inst)),e.mode==="instrument"&&(t.mode="instrument");const n=Ru(e.pads);if(n.length&&(t.credits=n),Array.isArray(e.slots)){const a=Array.from({length:Mn},(o,i)=>{const l=e.slots?.[i];return l?b0(l):null}),s=typeof e.active=="number"&&a[e.active]?e.active:null;Object.assign(t,{slots:a,active:s})}return t}function Dp(e){return Nr(e),vs(e)}function Ux(e){Nr(e);const t=e;if(!Array.isArray(t.slots))return null;const n=t.slots,a=Array.from({length:Mn},(i,l)=>{const c=n[l];return c&&typeof c=="object"&&!Array.isArray(c)?vs(c):null}),s=t.active,o=typeof s=="number"&&Number.isInteger(s)&&s>=0&&s<Mn&&a[s]?s:null;return{slots:a,active:o}}function Yx(e){Nr(e);const t=e,n=Qu(t.inst);return{mode:t.mode==="instrument"&&n?"instrument":"pads",inst:n}}function Nr(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Not a NYX pattern.");const t=e.nyx;if(t!==1)throw new Error(`Not a NYX pattern${typeof t=="number"?` (version ${t})`:""}.`)}function Fr(){try{return globalThis.localStorage??null}catch{return null}}function Kx(e,t,n=Fr()){let a;try{a=t?.storageKey?.(e)}catch{a=void 0}if(typeof a!="string"||!a||a===e)return e;try{if(t?.legacyCopy!==!1&&n&&n.getItem(a)===null){const s=n.getItem(e);s!==null&&n.setItem(a,s)}}catch{}return a}const Xx="nyx.state",Bp="nyx.scene-samples",Gx=/^[0-9a-f]{16,64}$/;function Rp(e){try{const t=JSON.parse(e?.getItem(Bp)??"[]");return Array.isArray(t)?t.filter(n=>typeof n=="string"&&Gx.test(n)):[]}catch{return[]}}function Vx(e,t=Fr()){if(!t)return;const n=new Set;for(const s of[e,...e.slots??[]])for(const o of s?.pads??[])o.sample&&n.add(o.sample);for(const s of e.inst?.zones??[])n.add(s.s);if(!n.size)return;const a=[...Rp(t).filter(s=>!n.has(s)),...n].slice(-2048);try{t.setItem(Bp,JSON.stringify(a))}catch{}}function Qx(e,t=Fr()){const n=ha(e);if(!t)return n;try{for(let a=0;a<t.length;a++){const s=t.key(a);if(s?.startsWith(Xx))try{for(const o of ha(tp(JSON.parse(t.getItem(s)??"null"))))n.add(o)}catch{}}}catch{return null}for(const a of Rp(t))n.add(a);return n}const Jx="NYX Sampler",Sa="nyx",Be=Us(),J=Vw(Sa,Be),Ip=Kx(Xw("nyx.state",Be),J),Pr=.15,E=y0(Ip),_=new yw(Be>1?`nyx-${Be}`:"nyx"),Pn=()=>v0(Ip,E),ga=Bx(),st=()=>{const e=Qx(E);if(e)for(const t of Ce?.before??[])t.pad.sample&&e.add(t.pad.sample);if(e)for(const t of Or)e.add(t);if(e)for(const t of ga.entries())t.before.sample&&e.add(t.before.sample);e&&_.prune(e)};let Ye=!1,Nt=0,we=null,Cn=!1,_t="",O="";const ks=new Map,Ni=new Map,Zx=1600,ek=96,Ha=new Map;function qp(e){ks.has(e.hash)||ks.set(e.hash,zc(e.data)),Ni.has(e.hash)||Ni.set(e.hash,zc(e.data,Zx))}function _p(e){if(!e.sample)return;const t=Ni.get(e.sample);if(!t||e.start<=0&&e.end>=1)return ks.get(e.sample);const n=`${e.sample}:${e.start}:${e.end}`,a=Ha.get(n);if(a)return a;const s=t.length/2,o=Math.max(0,Math.min(s-1,Math.floor(e.start*s))),i=Math.max(o+1,Math.min(s,Math.ceil(e.end*s))),l=[],c=Math.min(ek,i-o);for(let d=0;d<c;d++){const u=o+Math.floor((i-o)*d/c),h=Math.max(u+1,o+Math.floor((i-o)*(d+1)/c));let p=0,f=0;for(let g=u;g<h;g++)p=Math.min(p,t[g*2]??0),f=Math.max(f,t[g*2+1]??0);l.push(p,f)}return Ha.size>256&&Ha.clear(),Ha.set(n,l),l}let Hp=[];const Te=new Lr;let Gt=new Map,jp=null;const pt=new Dh({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let F=null,wn=null;const tk=new Kh({...Qw(),app:Gw(Jx,Be),version:"0.1.0",clock:pt,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const e=F?.state;return e==="running"?"running":e==="suspended"?"suspended":e?"none":"needs-gesture"},startGate:()=>wn?.whenSettled?.()??null}),Nn=e=>e+(wn?.offset??0),D=()=>pt.transport,en=()=>D().isPlayingAt(le()),Vt=()=>en()&&!Ye;let Co=null,Y=null,ba=null;const St=J?Hv(e=>Y?.port.postMessage(e),(e,t,n)=>{const a=z(e);return a.sample?X0(a,_.info(a.sample),D().bpm,n,t,nt.stretchedFor(e)):null}):null,$s=J?Ow({recall:e=>Kr(e,"recall",!1),now:le,timeAt:e=>D().running?D().timeAt(e):null}):null,No=()=>E.mode==="instrument"&&E.inst!==null,We=ax(J,e=>Y?.port.postMessage(e),St?{notes:(e,t)=>No()?fe.bus({kind:"notes",source:e,events:t}):St.notes(e,t),release:(e,t)=>No()?fe.bus({kind:"release",source:e,ids:t}):St.release(e,t),off:(e,t)=>{fe.bus({kind:"off",source:e,atBeat:t}),St.off(e,t),$s?.off(e,t)},controls:(e,t)=>$s?.controls(e,t)}:null,e=>{(No()||e.kind==="off")&&fe.bus(e)});St&&setInterval(()=>{const e=D();e.running&&St.prune(e.beatAt(le()))},5e3);const tt=J&&typeof J.notesOut=="function"?Rv({send:e=>J.notesOut?.(e)===!0,ctx:J.ctx,mapper:{toSharedTime:e=>e-(wn?.offset??0)},transport:D,win:window,nameOf:e=>z(e).sample?z(e).name:null,ctxOrigin:(()=>{try{return window.parent.performance.timeOrigin}catch{return performance.timeOrigin}})()}):null,fe=new xv({get:()=>E.inst,set:e=>{E.inst=e,Pn(),st(),wa()},mode:()=>E.mode,setMode:e=>eo(e),audio:async()=>await ge()&&F&&ba?{ctx:F,node:ba}:null,store:{put:async(e,t)=>_.put(e,t),get:e=>_.get(e)},report:(e,t,n,a)=>tt?.note(e,t,n,a,E.inst?.name??void 0),timeOf:e=>{const t=D();return t.running?Nn(t.timeAt(e)):null},message:e=>{O=e,C()},help:(e,t)=>U(e,I(t),e)}),Ss=[];let Es=!1,He=null,Qt=null,Wc=null;const Fi=new Set;function ge(){return Wc??=(async()=>{J?(F=J.ctx,Co=J.output,wn=J.mapper??new tl(J.ctx)):(F=new AudioContext({latencyHint:"interactive"}),Co=F.destination,wn=new tl(F)),wn.start();try{await F.audioWorklet.addModule(ew),await F.audioWorklet.addModule(Pv),await F.audioWorklet.addModule(gv)}catch{return O="Audio could not start (the sampler's worklet did not load). Reload to try again.",C(),!1}Y=new AudioWorkletNode(F,"nyx-sampler",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]}),Y.port.onmessage=n=>nk(n.data),He=Nf(F,{moduleUrl:Jw()??zf,bpm:D().bpm,slots:3,state:$i(E.hacks)}),Pi=$i(E.hacks),Qt=new GainNode(F,{gain:E.master}),Y.connect(He.input),ba=new AudioWorkletNode(F,"nyx-instrument",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]}),ba.connect(He.input);const e=new AudioWorkletNode(F,xy,{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),t=Sy(F);He.output.connect(Qt).connect(e).connect(t.input),t.output.connect(Co),Pf(He,pt,{toAudioTime:Nn,now:le});for(const n of ha(E))await ft(n);return Pt(),Y.port.postMessage({type:"sig",sig:Fn?.signals()??vn()}),We?.resend(),fe.resend(),Es&&Y.port.postMessage({type:"hitlog",on:!0}),zn(),!0})(),Wc}async function ft(e){const t=await _.get(e);return t?(qp(t),Y&&!Fi.has(e)&&(Fi.add(e),Y.port.postMessage({type:"sample",hash:e,channels:t.data.map(n=>n.slice()),rate:t.sampleRate})),t):null}function nk(e){if(e.type==="skip"&&e.hits){kk(e.hits);return}if(e.type==="hitlog"&&e.hits&&Es){for(const t of e.hits)Ss.length<2e4&&Ss.push(t);return}e.type!=="pos"||!e.voices||(Hp=e.voices,Te.report(e.voices,performance.now()),qr(),Gt=new Map(e.voices.map(([t,n,a,s])=>{const o=qw(s)?nt.cache.byId(s):void 0,i=o?_.info(o.job.sample):void 0;return o&&i?[t,(o.job.from+n/o.frames*(o.job.to-o.job.from))/i.frames]:[t,n/Math.max(1,a)]})))}let ts=null,ak=0;const Jn=new Map,Wp=[],sk=.25;function ok(){if(ts)return ts;const e=new Worker(new URL("/nyx/assets/stretch-worker-DVLOsvIo.js",import.meta.url),{type:"module"});return e.onmessage=t=>{const n=t.data;Jn.get(n.id)?.(n),Jn.delete(n.id)},e.onerror=t=>{console.error("NYX stretch worker",t.message);for(const n of Jn.values())n({error:t.message||"worker failed"});Jn.clear()},ts=e,e}async function Up(e){const t=await _.get(e.sample);if(!t)return null;const n=Math.ceil(sk*e.sampleRate),a=Math.max(0,e.from-n),s=Math.min(t.frames,e.to+n),o=t.data.map(c=>c.slice(a,s)),i=++ak,l=ok();return new Promise(c=>{Jn.set(i,d=>{if(d.error||!d.channels){console.error("NYX stretch",d.error),c(null);return}typeof d.ms=="number"&&Wp.push(Math.round(d.ms)),c(d.channels)}),l.postMessage({id:i,channels:o,sampleRate:e.sampleRate,from:e.from-a,to:e.to-a,frames:e.frames,semitones:e.semitones},o.map(d=>d.buffer))})}const nt=new Hw({run:Up,deliver(e,t){Y?.port.postMessage({type:"sample",hash:e.sample,channels:t,rate:e.job.sampleRate},t.map(n=>n.buffer))},drop(e){Y?.port.postMessage({type:"drop",hash:e.sample})},changed(){nt.failed&&!O&&(O="Keep pitch couldn't start in this browser: fitted pads change speed and pitch instead."),Pt(),C()}});function Pt(){if(Fn?.update(E.pads),!Y)return;for(const n of E.pads)n.sample&&(n.length==="hit"||n.landOnHits)&&xk(n.sample);const e=D().bpm,t=n=>_.info(n);nt.plan(E.pads,t,e),Y.port.postMessage({type:"program",program:G0(E,t,e,n=>nt.stretchedFor(n))})}let Uc="";function zn(e=!1){if(!Y)return;const t=D(),n=en(),a=Vt();let s=0,o=t.bpm;if(t.running||t.isPlayingAt(le())){const l=Math.max(0,t.beatAt(le())),c=t.timeAt(l);o=60/(t.timeAt(l+1)-c),s=Nn(c)-l*60/o}const i=JSON.stringify([n,a,Math.round(s*2e3),o,Nt]);!e&&i===Uc||(Uc=i,Y.port.postMessage({type:"clock",clock:{playing:n,pattern:a,zero:s,bpm:o,join:Nt}}))}let Pi=null;function Yp(){if(!He)return;const e=$i(E.hacks),t=mv(Pi,e);if(Pi=e,t.whole)He.setState(e);else for(const[n,a,s]of t.params)He.setParam(n,a,s)}let oa=null;function ik(){if(oa){const t=oa;se(()=>{E.lanes=t}),O="Pattern back.",C();return}const e=structuredClone(E.lanes);e.some(t=>t.steps.some(n=>n.on)||t.mute||t.solo||t.length!==pe)&&(se(()=>{E.lanes=E.lanes.map(()=>Rs())}),we=null,oa=e,O="Pattern cleared: press Undo to bring it back.",C())}function se(e){oa=null;const t=Br(!1);e(),t&&st(),E.active!==null&&(Cn=!0),_t="",Pn(),Pt(),Yp(),C()}const z=e=>E.pads[e]??at(e),je=e=>E.lanes[e]??Rs(),Ea=()=>z(E.selected);function De(e,t=E.selected){se(()=>e(z(t)))}async function rk(e,t){const n=z(e);if(n.normalize){De(s=>{s.normalize&&(s.normalize.on=t)},e);return}if(!n.sample)return;let a;if(n.provenance)a={on:t,gainDb:0};else{const s=_.held(n.sample)??await _.get(n.sample);if(!s)return;a={...An(s.data,s.sampleRate),on:t}}De(s=>{s.sample===n.sample&&(s.normalize=a)},e)}function As(e,t,n){se(()=>{const a=je(e).steps[t];a&&n(a)})}function Ke(e,t=!0,n=!1){E.selected=Math.max(0,Math.min(ne-1,e)),we&&we.lane!==E.selected&&(we=null),t&&Ze(E.selected,null,!1,n),Pn(),C()}function Yc(e,t,n,a,s=!1){if(!Y)return!1;const o=z(e),i=o.sample?_.info(o.sample):void 0,l=o.sample?up(o,i,D().bpm,t,nt.stretchedFor(e),s):null;return l&&(Y.port.postMessage({type:"play",pad:e,hit:l,hold:n,manual:!0,toggle:a}),a&&Te.has(e)?Te.stopped(e):Te.posted(e,Kv(l,i?.sampleRate??48e3),performance.now())),!0}async function Ze(e,t=null,n=!1,a=!1,s=!1){F?.state==="running"&&Yc(e,t,n,a,s)||!await ge()||!F||!Y||(F.state!=="running"&&await F.resume().catch(()=>{}),Yc(e,t,n,a,s))}let ns=tv();const Jt=new Map;function Aa(e){return e.kind?{kind:e.kind,bpm:e.bpm}:e.origin==="local"?Sr(e.title):{kind:"",bpm:0}}function Ks(e,t){Jt.delete(e);const n=z(e),a=n.sample?_.info(n.sample):void 0;if(!ns||!t||!n.sample||!a)return;const s=Z0(a.frames/a.sampleRate,t,D().bpm,$r);s&&(Jt.set(e,{sample:n.sample,fit:s,before:{fit:n.fit,keepPitch:n.keepPitch}}),n.fit=s.bars,n.keepPitch=!0)}function lk(e){const t=Jt.get(e);bp(t,z(e))&&(Jt.delete(e),De(n=>av(t,n),e),O=`Fit undone: ${Ne(e)} plays as recorded.`,C())}async function tn(e,t,n,a,s=!0,o=null,i=null,l=null,c=0,d=null){const{sample:u,saved:h}=await _.put(t,n);await ft(u.hash),se(()=>{const p=z(e);p.sample=u.hash,p.provenance=o,p.rights=d,p.normalize=l?{...l}:null,p.offsetDb=c,p.name=a.slice(0,24)||`Pad ${e+1}`,p.start=0,p.end=1,p.slices=0,p.cuts=[],p.fit=0,p.keepPitch=!0,p.follow=null,p.note=0,Ks(e,i)}),O=h?"":"Kept until you reload: this browser has no file storage here.",st(),s&&Ze(e)}async function zr(e,t=E.selected){if(/\.json$/i.test(e.name)||e.type==="application/json"){await Fk(e);return}if(!await ge()||!F)return;let n;try{n=await F.decodeAudioData(await e.arrayBuffer())}catch{O=`Couldn't read ${e.name}: not an audio file this browser can decode.`,C();return}const{data:a,trimmed:s}=Mp(n);await tn(t,a,n.sampleRate,e.name.replace(/\.[^.]+$/,""),!0,null,Sr(e.name),An(a,n.sampleRate)),s&&(O=`${e.name} was cut to its first minute.`,C())}const Or=new Set;let Ce=null;function Ne(e,t=z(e).name){const n=`Pad ${e+1}`;return t===n?n:`${n} (${t})`}async function Dr(e,t,n=""){return z(e).sample?Td({title:`Replace ${Ne(e)}?`,body:t==="Grab"?"Grab replaces its sound, its slices and that lane's steps. Undo brings them back.":t==="Sent"?`${n} replaces its sound, its slices and that lane's steps. Undo brings them back.`:"The take replaces its sound, its slices and that lane's steps when it lands. Undo brings them back.",confirmLabel:"Replace",cancelLabel:"Cancel"}):!0}function Fe(e){const t=gr(E,e);return t.pad.sample&&Or.add(t.pad.sample),t}function Re(e,t,n){Br();const a=Array.isArray(e)?e:[e],s=a[0],o=Mb({message:n??(s?.pad.sample?`${t}: replaced ${Ne(s.index,s.pad.name)}.`:`${t} onto Pad ${(s?.index??0)+1}.`),actionLabel:"Undo",onAction:()=>void Rr(),onClose:()=>{Ce&&(Ce.toast=null)}}),i=o.el.querySelector("button");i instanceof HTMLElement&&U(i,I("grab-undo"),i),Ce={before:a,what:t,toast:o};for(const l of a)l.pad.sample&&Or.delete(l.pad.sample)}function Br(e=!0){if(!Ce)return!1;const t=Ce;return Ce=null,t.toast?.close(),e&&st(),!0}async function Rr(){const e=Ce;if(!e)return!1;Ce=null,e.toast?.close();for(const n of e.before)n.pad.sample&&await ft(n.pad.sample);se(()=>{for(const n of e.before)d0(E,n)}),we&&e.before.some(n=>n.index===we?.lane)&&(we=null);const t=e.before[0];return O=e.before.length===1&&t?`Undone: ${Ne(t.index)} is back as it was.`:`Undone: pads ${e.before.map(n=>n.index+1).join(", ")} are back as they were.`,st(),C(),!0}let Fo=null;function Kp(){return Fo??=fetch(Wb,{mode:"cors"}).then(e=>{if(!e.ok)throw new Error(`Library: HTTP ${e.status}`);return e.json()}).then(e=>Kb(e)).catch(e=>{throw Fo=null,e}),Fo}const Xs=new kx;Xs.restore();const Xp=e=>`${e.id}#${e.sha256}`,Yn=new Map;function ck(e){const t=Xp(e);let n=Yn.get(t);return!n&&e.origin==="local"&&(n=Xs.bytes(e),n.catch(()=>Yn.delete(t)),Yn.set(t,n)),n||(n=(async()=>{const a=await fetch(e.audio,{mode:"cors"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const s=await a.arrayBuffer(),o=new Uint8Array(await crypto.subtle.digest("SHA-256",s));if(Array.from(o,l=>l.toString(16).padStart(2,"0")).join("")!==e.sha256)throw new Error("the file isn't the one the Library lists");return s})(),n.catch(()=>Yn.delete(t)),Yn.set(t,n)),n}const Po=new Map;async function Gp(e){if(!await ge()||!F)throw new Error("NYX's audio didn't start");const t=F,n=Xp(e);let a=Po.get(n);return a||(a=ck(e).then(s=>t.decodeAudioData(s.slice(0))),a.catch(()=>Po.delete(n)),Po.set(n,a)),a}const Vp=e=>10**(e/20);async function Qp(e){return zi(await Gp(e),e)}function zi(e,t){const{data:n}=Mp(e),a=Vp(t.measures.gain);for(const s of n)for(let o=0;o<s.length;o++)s[o]=(s[o]??0)*a;return{data:n,rate:e.sampleRate}}let xn=null;function Jp(){const e=xn;xn=null;try{e?.src.stop()}catch{}}async function Zp(e){Jp();let t;try{t=await Gp(e)}catch(o){Ir(`Couldn't play ${e.title}: ${o.message}.`);return}if(!F||!Qt)return;F.state!=="running"&&await F.resume().catch(()=>{});const n=new AudioBufferSourceNode(F,{buffer:t}),a=new GainNode(F,{gain:Vp(e.measures.gain)*Cy});n.connect(a).connect(Qt);const s={src:n,id:e.id};xn=s,await new Promise(o=>{n.onended=()=>{a.disconnect(),xn===s&&(xn=null),o()},n.start()})}function Ir(e){O=e,C()}async function Gs(e,t,n=E.selected){let a;try{a=await Qp(e)}catch(o){return Ir(`Couldn't load ${e.title}: ${o.message}.`),!1}const s=Fe(n);return await tn(n,a.data,a.rate,En(e.title),!0,Ds(e,t),Aa(e),gy),O=`${e.title} on Pad ${n+1}: ${e.creator}, ${ir(e.license,e.licenseStatus,e.permission)}${Du(e)?" (personal use)":""}.`,Re(s,"Library"),C(),!0}async function dk(e,t){if(!await ge())return!1;const n=await Promise.all(e.map(l=>Qp(l.sound).then(c=>({ok:!0,...c}),c=>({ok:!1,error:`${l.sound.title}: ${c.message}`})))),a=n.flatMap(l=>l.ok?[]:[l.error]);if(a.length)return Ir(`The kit couldn't load (${a.join("; ")}). The pads are as they were.`),!1;const s=[];for(const l of n){if(!l.ok)continue;const c=await _.put(l.data,l.rate);await ft(c.sample.hash),s.push(c)}for(let l=0;l<e.length;l++)Fe(l);let o=[];se(()=>{o=Is(E,e.map((l,c)=>({sample:s[c]?.sample.hash??"",name:En(l.sound.title),provenance:Ds(l.sound,t),hat:l.slot.role==="hat"}))),e.forEach((l,c)=>Ks(c,Aa(l.sound)))});const i=e.flatMap(l=>l.note?[l.note]:[]);return O=`Kit on pads 1–${e.length}${t.trim()?` for "${t.trim()}"`:""}; the pattern stays.${i.length?` ${i.join(" ")}`:""}${s.some(l=>!l.saved)?" Kept until you reload: this browser has no file storage here.":""}`,Re(o,"Build kit",`Build kit: pads 1–${e.length} replaced.`),st(),C(),!0}async function uk(e,t){const n=[];for(const c of e){const d=await _.put(c.data,c.rate);await ft(d.sample.hash),n.push(d)}if(t)for(let c=0;c<ne;c++)Fe(c);else for(const c of e)Fe(c.index);const a=e.map((c,d)=>({index:c.index,sample:n[d]?.sample.hash??"",name:En(c.sound.title),provenance:Ds(c.sound,""),hat:!1}));let s=[];se(()=>{s=t?u0(E,a):Is(E,a);for(const c of e)Ks(c.index,Aa(c.sound))});const o=e.map(c=>c.index+1).join(", "),i=t&&s.some(c=>c.pad.sample),l=n.some(c=>!c.saved)?" Kept until you reload: this browser has no file storage here.":"";O=i?`From the sample picker: everything replaced, pad${e.length===1?"":"s"} ${o} loaded; the pattern stays.${l}`:`From the sample picker: pad${e.length===1?"":"s"} ${o}; the pattern stays.${l}`,Re(s,"Sample picker",i?"Sample picker: replaced everything in NYX.":`Sample picker: pad${e.length===1?"":"s"} ${o} loaded.`),st(),C()}async function pk(e,t){const n=await _.put(e.data,e.rate);await ft(n.sample.hash),Fe(e.index);let a=[];se(()=>{a=Is(E,[{index:e.index,sample:n.sample.hash,name:En(e.sound.title),provenance:Ds(e.sound,""),hat:!1}]),Ks(e.index,Aa(e.sound))});const s=a[0];s&&ga.record(t,{index:e.index,before:s.pad,after:n.sample.hash}),O=`From the sample picker: pad ${e.index+1}; the pattern stays.${n.saved?"":" Kept until you reload: this browser has no file storage here."}`,Re(a,"Sample picker",`Sample picker: pad ${e.index+1} ← ${En(e.sound.title)}.`),st(),C()}async function hk(e){const t=ga.get(e),n=Rx(t,t?z(t.index).sample??"":null);return n||!t?{ok:!1,placed:[],left:[],message:n??""}:(t.before.sample&&await ft(t.before.sample),se(()=>{E.pads[t.index]=structuredClone(t.before)}),ga.drop(e),O=`Undone: ${Ne(t.index)} is back as it was.`,st(),C(),{ok:!0,placed:[],left:[],message:`Undone: pad ${t.index+1} is back as it was.`})}function fk(e,t){const n=e-1,a=z(n);if(!a.sample)return{ok:!1,placed:[],left:[],message:`Pad ${e} is already empty.`};const s=structuredClone(a),o=Ne(n,a.name);return La(n)?(t&&ga.record(t,{index:n,before:s,after:""}),O=`From the sample picker: ${o} removed from pad ${e}; its steps stay.`,C(),{ok:!0,placed:[],left:[],message:`Removed ${o} from pad ${e}.`}):{ok:!1,placed:[],left:[],message:`Pad ${e} wasn't removed.`}}let Kc="";function qr(){const e=Te.pads().join(",");e!==Kc&&(Kc=e,th?.update(),nh?.changed())}async function mk(e){const t=e-1;if(!z(t).sample)return{ok:!1,placed:[],left:[],message:`Pad ${e} is empty.`};const n=Te.has(t);return!await Promise.race([Ze(t,null,!1,!0).then(()=>!0),new Promise(s=>setTimeout(()=>s(!1),1500))])||F?.state!=="running"?{ok:!1,placed:[],left:[],message:"NYX's sound isn't on yet: click anywhere in the Studio tab once, then try again."}:(qr(),{ok:!0,placed:[],left:[],message:n?`Pad ${e} stopped.`:`Pad ${e} plays.`})}async function gk(e){const t=e===0?Te.pads():[e-1];for(const n of t)Y?.port.postMessage({type:"halt",pad:n}),Te.stopped(n);return qr(),C(),{ok:!0,placed:[],left:[],message:e===0?"Stopped.":`Pad ${e} stopped.`}}const Kn=new Map;function bk(e){if(!e.sample)return"";const t=`${e.sample}:${e.start}:${e.end}`,n=Kn.get(t);if(n!==void 0)return n;const a=zx(_p(e));return a&&Kn.set(t,a),Kn.size>64&&Kn.delete(Kn.keys().next().value),a}const eh={pads:()=>E.pads.map((e,t)=>{const n=je(t);return{pad:t+1,name:e.name,filled:!!e.sample,fp:e.sample?e.provenance?.sha256??"":"",sid:e.sample?e.provenance?.id??"":"",wave:bk(e),used:n.steps.slice(0,n.length).some(a=>a.on),playing:!!e.sample&&Te.has(t)}}),receivePad:(e,t,n)=>Dx(e,t,n,{decode:async(a,s)=>{if(!await ge()||!F)throw new Error("NYX's audio didn't start");return zi(await F.decodeAudioData(s),a)},place:pk}),undo:hk,play:mk,stop:gk,remove:async(e,t)=>fk(e,t),receive:(e,t,n)=>Cx(e,t,n,{filled:()=>Array.from({length:ne},(a,s)=>!!E.pads[s]?.sample),padName:a=>z(a).name,ask:a=>(J?.reveal?.(),Td({...a,confirmLabel:"Load",cancelLabel:"Cancel"})),decode:async(a,s)=>{if(!await ge()||!F)throw new Error("NYX's audio didn't start");return zi(await F.decodeAudioData(s),a)},place:uk}),instrument:async(e,t)=>{J?.reveal?.(),eo("instrument");const n=t.map(s=>({path:s.path,file:new File([s.bytes],s.path.slice(s.path.lastIndexOf("/")+1))})),a=e.layers.sent<e.layers.found;return await fe.open(n,{name:e.name,credit:e.credit,note:a?`From the Picker: ${e.layers.sent} of ${e.layers.found} velocity layers (NYX's default detail).`:""}),{ok:!0,placed:[],left:[],message:"NYX opened its key map: check it there, then click Load into NYX."}}},th=J?null:_x(window,eh),nh=J?.pickerTarget?.(Hx(eh))??null;function _r(e){const t=z(e).provenance,n=t?Oe.catalogFor(t.origin):null;if(!t||!n)return[];const a=new Set(E.pads.flatMap((s,o)=>o!==e&&s.provenance?[s.provenance.id]:[]));return ly(n,t,a).map(s=>s.sound)}const Oe=new px({catalog:Kp,target:()=>({index:E.selected,title:Ne(E.selected)}),pads:()=>E.pads,preview:Zp,stopPreview:Jp,load:(e,t)=>Gs(e,t),chop:(e,t)=>Sk(e,t),buildKit:dk,close:()=>Ft(!1),local:Xs}),Vs=new sx(typeof Worker>"u"?null:()=>new Worker(new URL("/nyx/assets/chop-worker-CbuieNQN.js",import.meta.url),{type:"module"})),Qs=new Map;async function yk(){const e=E.selected,t=z(e);if(!t.sample)return null;const n=await _.get(t.sample);if(!n)return null;const a=Math.floor(t.start*n.frames),s=Math.min(n.frames,Math.ceil(t.end*n.frames)),o=Qs.get(e),i=o&&o.sample===t.sample?o:null;return{sample:t.sample,stem:uw(t.name),data:n.data,sampleRate:n.sampleRate,from:a,to:s,pad:e,tempo:iw({seconds:(s-a)/n.sampleRate,fit:t.fit,given:i?.bpm??0,givenFrom:i?.from,name:t.name,studioBpm:D().bpm})}}async function vk(e,t,n){if(!await ge()||!F||!Y)return;F.state!=="running"&&await F.resume().catch(()=>{}),await ft(e.sample);const s={...z(e.pad),start:0,end:1,slices:0,cuts:[],fit:0,tune:0,fine:0,dir:"fwd",mode:"oneshot"},o=up(s,_.info(e.sample),D().bpm,null);o&&Y.port.postMessage({type:"play",pad:e.pad,hit:{...o,from:t,to:n}})}function wk(e,t,n){const a=_.info(e.sample);if(!a)return;const s=Math.min(t.cuts.length-1,ne-n.first);if(s<1)return;const o=Array.from({length:s},(d,u)=>Fe(n.first+u)),i=z(e.pad),l={provenance:i.provenance?structuredClone(i.provenance):null,rights:i.rights,normalize:i.normalize?{...i.normalize}:null,offsetDb:i.offsetDb,levelDb:i.levelDb,note:i.note},c=n.choke?pw(E.pads,n.first,s):0;se(()=>{hw(E,t,{sample:e.sample,frames:a.frames,sampleRate:e.sampleRate,first:n.first,stem:e.stem,source:l,choke:c,playBack:n.playBack?{bpm:n.bpm}:null});for(let d=0;d<s;d++)Jt.delete(n.first+d),Qs.delete(n.first+d)}),Zt.close(),Re(o,"Chop",`Chopped ${e.stem} onto pads ${n.first+1}–${n.first+s}.`),Ke(n.first,!1),C()}const Zt=new ix({source:yk,analysis:e=>Vs.analysis(e.sample,e.data,e.sampleRate,e.from,e.to),pads:()=>E.pads,audition:(e,t,n)=>void vk(e,t,n),apply:wk,close:()=>{Zt.close(),C()}});async function Ma(){Oe.isOpen&&Ft(!1),await Zt.open()&&(C(),Zt.el.scrollIntoView?.({block:"nearest",behavior:"smooth"}))}function ah(){const e=D();return en()?e.beatAt(le()):(F?.currentTime??performance.now()/1e3)*Math.max(1,e.bpm)/60}const Fn=J?zw(J,e=>{Y?.port.postMessage({type:"sig",sig:e})},ah):null;function Xc(e){const t=e.sample?_.info(e.sample):void 0;if(!t||e.length==="free"||e.slices||e.fit)return e.end;if(e.length==="hit"){const a=qs(t.analysis,e.hitSense);if(!a?.length)return e.end;const s=mr(a,e.start*t.frames,1,pr*t.sampleRate);return s===null?1:s/t.frames}const n=xr(e,t,D().bpm);return Math.min(1,e.start+ms(e.length,D().bpm,t.sampleRate,n)/t.frames)}const On=new Zv({sample:()=>{const e=E.selected,t=z(e),n=t.sample?_.held(t.sample):void 0;return!t.sample||!n?null:{index:e,pad:t,data:n.data,sampleRate:n.sampleRate,frames:n.data[0]?.length??0}},bpm:()=>D().bpm,beat:ah,signals:()=>Fn?.signals()??vn(),aria:()=>Fn?.source()??null,edit:e=>De(e),audition:e=>void Ze(E.selected,null,!1,!0,e===!0),slicesOff:()=>{const e=E.selected;if(!z(e).slices)return;const t=Fe(e);De(n=>{n.slices=0,n.cuts=[]},e),Re(t,"Slices off",`Slices off on ${Ne(e,t.pad.name)}.`),C()},fitOff:()=>{const e=E.selected;if(!z(e).fit)return;const t=Fe(e);De(n=>{n.fit=0,n.fitSpan=null},e),Re(t,"Fit off",`Fit to bars off on ${Ne(e,t.pad.name)}.`),C()},playPos:()=>Gt.get(E.selected)??null,hits:()=>{const e=z(E.selected);return e.sample?(Hr(e.sample),qs(_.info(e.sample)?.analysis,e.hitSense)):null},close:()=>{On.close(),C()}});document.body.append(On.el);jp=On;const as=new Set;function Hr(e){const t=_.info(e),n=_.held(e);if(!t||!n||t.analysis||as.has(e))return;as.add(e);const a=n.data[0]?.length??0;Vs.analysis(e,n.data,n.sampleRate,0,a).then(s=>{const o=_.info(e);o&&(o.analysis=s),Pt(),On.refresh()}).catch(()=>{}).finally(()=>as.delete(e))}function xk(e){_.info(e)?.analysis||as.has(e)||setTimeout(()=>Hr(e),0)}async function Js(){const e=Ea();e.sample&&(_.held(e.sample)||await _.get(e.sample),On.open()&&C())}function sh(e){const n=!!Ea().sample;for(const a of e.querySelectorAll('.nc-canvas[data-nc-id="wave"]')){const s=a.closest(".nc-field")??a;if(n){a.dataset.nyxRgnOpen!==""&&(a.dataset.nyxRgnOpen="",s.dataset.nyxRgnOpen=""),a.getAttribute("role")!=="button"&&a.setAttribute("role","button"),a.tabIndex!==0&&(a.tabIndex=0);const o=`Edit region of pad ${E.selected+1}`;a.getAttribute("aria-label")!==o&&a.setAttribute("aria-label",o),a.title!=="Edit region"&&(a.title="Edit region")}else a.dataset.nyxRgnOpen===""&&(delete a.dataset.nyxRgnOpen,delete s.dataset.nyxRgnOpen,a.removeAttribute("role"),a.removeAttribute("aria-label"),a.removeAttribute("tabindex"),a.title="")}}function oh(e){return e.target?.closest?.('.nc-canvas[data-nc-id="wave"][data-nyx-rgn-open]')??null}document.addEventListener("click",e=>{oh(e)&&(e.preventDefault(),Js())});document.addEventListener("keydown",e=>{e.key!=="Enter"&&e.key!==" "||e.repeat||!oh(e)||(e.preventDefault(),e.stopImmediatePropagation(),Js())});const Oi=[];function kk(e){const t=xi*6e4/Math.max(1,D().bpm);for(const[n,a]of e){if(n===void 0||a===void 0)continue;Oi.length<2e3&&Oi.push([n,a]);const s=je(n).length,o=Math.floor(a/xi+1e-6)%s;for(const i of document.querySelectorAll(`.nc-page [data-nc-step="pad-${n}:${o}"]`)){i.dataset.nyxSkip="";const l=Number(i.dataset.nyxSkipT??0);l&&clearTimeout(l),i.dataset.nyxSkipT=String(setTimeout(()=>{delete i.dataset.nyxSkip,delete i.dataset.nyxSkipT},Math.max(450,t*2)))}}}async function $k(e){const t=E.selected,n=Fe(t);await ph(e);const a=z(t).sample;a&&(e.bpm>0&&Qs.set(t,{sample:a,bpm:e.bpm,from:"from the take"}),Re(n,`LUCY take ${e.id}`),await Ma())}async function Sk(e,t){const n=E.selected;if(!await Gs(e,t,n))return;const a=z(n).sample,s=Aa(e);a&&s.bpm>0&&Qs.set(n,{sample:a,bpm:s.bpm,from:"from My samples"}),Ft(!1),await Ma()}function Ft(e=!Oe.isOpen,t){e?Oe.open(t):Oe.closePanel(),C(),e?Oe.focus():re.querySelector('[data-nc-section="pads"] [data-nc-id="library"]')?.focus()}const te={from:"master",bars:1,busy:!1};async function jr(){const e=Ct();if(!e||te.busy||!await ge()||!F)return;const t=D();if(!t.running){O="Play first: Grab takes the bars that just played.",C();return}const n=te.bars,a=Math.floor(t.beatAt(le())/4)*4,s=a-4*n;if(s<0){O=`Grab needs ${n} whole bar${n===1?"":"s"} played first.`,C();return}const o=F.sampleRate,{from:i,to:l}=Uw({from:Math.round(Nn(t.timeAt(s))*o),to:Math.round(Nn(t.timeAt(a))*o)},Cp(e,te.from)),c=E.selected;if(te.busy=!0,C(),!await Dr(c,"Grab")){te.busy=!1,C();return}const d=e.takeResult?await e.takeResult(te.from,i,l):{channels:await e.take(te.from,i,l)},u=d.channels;te.busy=!1;const h=e.sources().find(g=>g.id===te.from)?.name??te.from;if(!u){O="reason"in d&&d.reason==="gone"?`Those bars of ${h} are gone (the Studio keeps the last 20 seconds): Grab again.`:`${h} isn't kept that far back yet: let it play ${n} more bar${n===1?"":"s"}, then Grab again.`,C();return}let p=0;for(const g of u)for(const w of g)p=Math.max(p,Math.abs(w));if(p<1e-4){O=`${h} was silent for those ${n===1?"bar":"bars"}.`,C();return}const f=Fe(c);await tn(c,u,o,`${h} grab`,!0,null,null,null,-5),n===1?(se(()=>{const g=z(c);g.fit=1,g.keepPitch=!0,g.slices=16,g.cuts=[],g.decay=4;const w=je(c);w.length=pe;for(const m of w.steps)Object.assign(m,$a(),{on:!0})}),O=`Grabbed a bar of ${h}: 16 slices, every step on. Move, mute or lock steps to remix it.`):(De(g=>{g.fit=n,g.keepPitch=!0},c),await Di(8,"transients",c),O=`Grabbed ${n} bars of ${h}, fitted to ${n} bars and sliced at the hits.`),Re(f,`Grabbed ${n===1?"a bar":`${n} bars`}`),C()}const Gc=240,Ek=.25,N={phase:"idle",startBeat:0,pad:0,source:"master",rec:null,timer:0,lastBar:0,lastBarFrame:0,fromFrame:0,latency:0,bpm:120,warned:!1,label:""};function Wr(e){const t=Math.floor(e/4)*4;return e-t<Ek?t:t+4}function Ak(e){const t=F?.sampleRate??48e3;return Math.round(Nn(D().timeAt(e))*t)}function ih(e){const t=F?.sampleRate??48e3;return N.fromFrame+Math.round((e-N.startBeat)*60/N.bpm*t)}function Ms(e=N.source){return Ct()?.sources().find(t=>t.id===e)?.name??e}function Ur(){N.phase==="idle"?Mk():N.phase==="armed"?(N.phase="idle",O="",C()):N.phase==="rec"&&Yr()}async function Mk(){const e=Ct();if(!e?.record){O="Take needs the Studio (reload it to update).",C();return}if(!await ge()||!F)return;const t=E.selected;if(await Dr(t,"Take")&&N.phase==="idle"){if(N.source=te.from,N.pad=t,e.listen(N.source),!D().running){N.phase="armed",O="Take armed: starts with the music.",C();return}rh()}}function rh(){const e=Ct();if(!e?.record||!F){N.phase="idle";return}const t=D();N.startBeat=Math.max(0,Wr(t.beatAt(le()))),N.fromFrame=Ak(N.startBeat),N.bpm=t.bpm,N.latency=Cp(e,N.source);const n=e.record(N.source,N.fromFrame+N.latency);if(!n){N.phase="idle",O=`${Ms()} can't be recorded.`,C();return}N.rec=n,N.phase="rec",N.warned=!1,N.lastBar=N.startBeat,N.lastBarFrame=N.fromFrame,O=`Taking ${Ms()}: stop on any bar.`,window.clearInterval(N.timer),N.timer=window.setInterval(Lk,200),C()}function Lk(){if(N.phase!=="rec")return;const e=D();if(!e.running)return;const t=e.beatAt(le()),n=Math.floor(t/4)*4;n>N.lastBar&&(N.lastBar=n,N.lastBarFrame=ih(n));const a=240/Math.max(1,e.bpm),s=(Math.max(N.startBeat+4,Wr(t))-N.startBeat)*60/Math.max(1,e.bpm);if(s+a>Gc){Yr();return}!N.warned&&s>Gc-30&&(N.warned=!0,O="Take stops at four minutes: about 30 seconds left.");const o=lh();o!==N.label&&(N.label=o,C())}function lh(){if(N.phase==="armed")return"Armed: waits for Play";if(N.phase==="saving")return"Saving take…";if(N.phase!=="rec")return"Take";const e=D().beatAt(le());return e<N.startBeat?"Starts on the bar…":`Stop take · bar ${Math.floor((e-N.startBeat)/4)+1}`}async function Yr(e=!1){const t=N.rec;if(N.phase!=="rec"||!t)return;window.clearInterval(N.timer);let n,a;e?(n=N.lastBar,a=N.lastBarFrame):(n=Math.max(N.startBeat+4,Wr(D().beatAt(le()))),a=ih(n));const s=Math.round((n-N.startBeat)/4);if(N.rec=null,s<1){t.cancel(),N.phase="idle",O="The music stopped before a whole bar was taken.",C();return}N.phase="saving",C();try{await Tk(t,a,s,n)}finally{N.phase="idle",C()}}async function Tk(e,t,n,a){let s=null;try{s=await e.stop(t+N.latency)}catch(l){console.error("NYX take",l)}const o=Ms();if(!s?.[0]?.length){O=`The take from ${o} came back empty.`,C();return}let i=0;for(const l of s)for(const c of l)i=Math.max(i,Math.abs(c));if(i<1e-4){O=`${o} was silent for the whole take.`,C();return}try{await Ck(s,n,a,o)}catch(l){console.error("NYX take",l),O=`The take from ${o} couldn't be kept (${l instanceof Error?l.message:String(l)}).`,C()}}async function Ck(e,t,n,a){const s=N.pad,o=`${a} take`.slice(0,20),i=E.pads.filter(d=>d.name.startsWith(o)).length+1,l=Fe(s);await ch(s,e,F?.sampleRate??48e3,t,Math.round(N.startBeat/4),{name:`${o} ${i}`,endBeat:n,offsetDb:-5}),Re(l,`Took ${t===1?"a bar":`${t} bars`}`),O=t<=pa?`${t} bar${t===1?"":"s"} of ${a} on ${z(s).name}: it loops every ${t===1?"bar":`${t} bars`}. Tap the pad to play it any time.`:`${t} bars of ${a} on ${z(s).name}. Longer than ${pa} bars, so it plays from the pad (tap or hold it), not the grid.`,C()}async function ch(e,t,n,a,s,o){await tn(e,t,n,o.name,!1,null,null,o.normalize??null,o.offsetDb??0,o.rights??null);const i=a<=pa;se(()=>p0(E,e,a,s));const l=D(),c=o.endBeat;if(c!==void 0&&i&&l.running&&Y&&F){const d=z(e),u=je(e).steps[0],h=u?Ws(d,0,u,_.info(d.sample??""),l.bpm,!1,nt.stretchedFor(e)):null,f=l.beatAt(le()+Pr)-c;if(h&&f>0&&f<4*a){const g=Math.round(f*60/l.bpm*n*h.rate);h.from+g<h.to-1&&Y.port.postMessage({type:"play",pad:e,hit:{...h,from:h.from+g,attack:.005}})}}}let zo=!1;function dh(){return E.pads.map((e,t)=>({id:String(t+1),name:Ne(t),...e.sample?{filled:!0}:{}}))}async function uh(e,t){const n=h0(t,E.pads.length);if(n<0)return{ok:!1,reason:"refused",message:`NYX has no pad ${t}.`};if(zo||N.phase!=="idle"&&N.pad===n)return{ok:!1,reason:"busy",message:`Pad ${n+1} is busy: try again in a moment.`};if(!await ge()||!F)return{ok:!1,reason:"refused",message:"NYX's audio didn't start."};zo=!0;try{const a=`${e.fromName}'s ${e.name}`;if(Ke(n,!1),J?.reveal?.(),C(),z(n).sample&&!await Dr(n,"Sent",a))return O=`Kept ${Ne(n)}: ${a} was not placed.`,C(),{ok:!1,reason:"cancelled"};const s=e.channels.map(d=>new Float32Array(d)),o=e.bars,i=Fe(n),l=e.name.slice(0,24),c=e.rights==="unknown"?"unknown":null;return o!==void 0&&Number.isInteger(o)&&o>=1?(await ch(n,s,e.sampleRate,o,0,{name:l,normalize:An(s,e.sampleRate),rights:c}),O=o<=pa?`${a} on Pad ${n+1}: fitted to ${o===1?"a bar":`${o} bars`}, it loops every ${o===1?"bar":`${o} bars`}.`:`${a} on Pad ${n+1}: ${o} bars, so it plays from the pad, not the grid.`):(await tn(n,s,e.sampleRate,l,!1,null,null,An(s,e.sampleRate),0,c),O=`${a} on Pad ${n+1}.`),Re(i,a),C(),{ok:!0,target:t,targetName:Ne(n)}}finally{zo=!1}}async function ph(e){const t=await vw(e);if(!t){O=`LUCY take ${e.id} could not be read.`,C();return}await tn(E.selected,t,e.sampleRate,`LUCY take ${e.id}`,!0,null,null,An(t,e.sampleRate),0,e.rights)}function La(e=E.selected){const t=z(e);if(!t.sample)return!1;const n=t.sample;Y?.port.postMessage({type:"silence",pad:e});const a=Fe(e);return se(()=>{E.pads[e]=at(e)}),we?.lane===e&&(we=null),E.pads.some(s=>s.sample===n)||(Y?.port.postMessage({type:"drop",hash:n}),Fi.delete(n)),Re(a,"Remove",`Removed ${Ne(e,a.pad.name)}.`),O="",C(),!0}async function Di(e,t,n=E.selected){const a=z(n);let s=[];if(e&&t==="transients"&&a.sample){const o=await _.get(a.sample);if(o){const i=Math.floor(a.start*o.frames),l=Math.min(o.frames,Math.ceil(a.end*o.frames));s=ow(await Vs.analysis(a.sample,o.data,o.sampleRate,i,l),e)}}De(o=>{o.slices=e,o.cuts=s},n)}function Kr(e,t,n=!0){const a=yi[e]??String(e+1);if(Br(),t==="store")E.slots[e]=br(E),E.active=e,Cn=!1,_t=`Stored in ${a}`;else if(t==="clear")E.slots[e]=null,E.active===e&&(E.active=null),_t=`Cleared ${a}`,st();else{const s=E.slots[e];if(!s){_t=`${a} is empty: Shift-click or long-press to store`,C();return}hh(s),E.active=e,Cn=!1,_t=`Recalled ${a}`,n&&tt?.slot(e)}Pn(),Pt(),Yp(),C()}function hh(e){const t=structuredClone(e);E.pads=t.pads,E.lanes=t.lanes,E.swing=t.swing,E.hacks=t.hacks,we=null;for(const n of ha(E))ft(n).then(()=>Pt())}async function Zs(){await ge(),F&&F.state!=="running"&&await F.resume().catch(()=>{});const e=dv({embedded:J!==null,running:en(),sittingOut:Ye,instanceId:Ys(Sa,Be)});if(e.action==="sit-out"||e.action==="rejoin"){if(Ye=e.action==="sit-out",e.action==="rejoin"){const t=D();Nt=t.nextBar(t.beatAt(le()+Pr))}zn(!0),C(),e.action==="sit-out"&&Tn()?.out?.(e.outId);return}if(e.action==="stop"){pt.stop({at:le()});return}Ye=!1,Nt=0,e.claimId&&Tn()?.claim(e.claimId),pt.play({at:le()})}let Vc=D().running;pt.onChange(()=>{D().running&&!Vc&&J&&(Ye=!Zw(Sa,Be)),Vc=D().running,D().running&&N.phase==="armed"&&rh(),!D().running&&N.phase==="rec"&&Yr(!0),D().running||(Ye=!1,Nt=0),Pt(),zn(!0),C()});Tn()?.member?.(Ys(Sa,Be),()=>D().running&&!Ye);Tn()?.onAll(()=>{if(Ye){if(Ye=!1,en()){const e=D();Nt=e.nextBar(e.beatAt(le()+Pr))}zn(!0),C()}});function Nk(){const e=Op(E),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=`nyx${Be>1?`-${Be}`:""}-pattern-${new Date().toISOString().slice(0,10)}.json`,n.hidden=!0,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e4)}async function Fk(e){let t;try{t=JSON.parse(await e.text()),Dp(t)}catch{O=`Couldn't read ${e.name}: not a NYX pattern.`,C();return}await fh(t,`Loaded ${e.name}.`)}async function fh(e,t){const n=Dp(e),a=Ux(e),s=Yx(e);fe.releaseAll(),s.inst&&(E.inst=s.inst),E.mode=s.inst||E.mode==="pads"?s.mode:E.mode,wa(),se(()=>{a&&(E.slots=a.slots,E.active=a.active),hh(n)}),a&&(Cn=E.active!==null&&JSON.stringify(br(E))!==JSON.stringify(E.slots[E.active])),_t="";const o=[],i=new Set;for(const c of E.pads)c.sample&&!await _.get(c.sample)&&o.push(c.name);for(const c of E.slots)for(const d of c?.pads??[])d.sample&&!E.pads.some(u=>u.sample===d.sample)&&i.add(d.sample);let l=0;for(const c of i)await _.get(c)||l++;O=o.length?`Loaded. ${o.length===1?"One pad needs its":`${o.length} pads need their`} sample again (${o.join(", ")}): samples stay in the browser they were loaded in.`:l?`${t} ${l===1?"One sample":`${l} samples`} in the slots ${l===1?"isn't":"aren't"} in this browser: samples stay in the browser they were loaded in.`:t,Pt(),C()}function Pk(){Y?.port.postMessage({type:"stop"}),en()&&(J?(Ye=!0,Tn()?.out?.(Ys(Sa,Be))):pt.stop({at:le()})),zn(!0),He?.clear({fadeMs:20}),C()}function zk(e){E.master=Math.min(1,Math.max(0,e)),Pn(),Qt&&F&&Qt.gain.setTargetAtTime(E.master,F.currentTime,.01),ya.value=String(E.master),Xr.textContent=`${Math.round(E.master*100)}%`}const ie=(e,t={},...n)=>{const a=document.createElement(e);for(const[s,o]of Object.entries(t))a.setAttribute(s,o);return a.append(...n),a},Dn=document.getElementById("app");_v(Dn);Dn.classList.add("nc","nc-page");Cb();const mh=ie("header",{class:"nc-page-hd"},ie("div",{},ie("h1",{class:"nc-page-title",...lv("page:title")},ie("span",{style:"color: var(--nc-ui-instrument-nyx)"},"NYX")," ",ie("span",{class:"nc-page-sep"},"/")," SAMPLER ",ie("span",{class:"nc-page-sep"},"/")," ",ie("span",{class:"nc-mono"},String(Be).padStart(2,"0"))),ie("p",{class:"nc-page-sub"},"A NetComposer element."))),ya=ie("input",{type:"range",class:"nc-range",id:"nyx-master",min:"0",max:"1",step:"0.01",value:String(E.master),"data-nc-id":"nyx-master"});ya.addEventListener("input",()=>zk(Number(ya.value)));const Xr=ie("span",{class:"nc-readout","data-nc-readout":""});Xr.textContent=`${Math.round(E.master*100)}%`;const Qc="audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.aif,.aiff,.webm",Ut=ie("input",{type:"file"});Ut.hidden=!0;let Jc="pad";Ut.addEventListener("change",()=>{const e=Ut.files?.[0];Ut.value="",e&&zr(e)});function Gr(e){Jc=e,Ut.accept=Jc==="pad"?Qc:`${Qc},.json,application/json`,Ut.click()}const Bi=(e,t)=>{const n=ie("button",{type:"button",class:"nc-page-action","data-nyx-action":e.toLowerCase()},e);return U(n,I(`page:${e.toLowerCase()}`),n),n.addEventListener("click",t),n},gh=ie("label",{class:"nc-label",for:"nyx-master"},"Master");U(gh,I("page:master"),ya);const Zc=Ob({panel:ie("div",{},ie("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},gh,ya,Xr),Bi("Save",Nk),Bi("Load",()=>Gr("any")))}),va=ie("div",{class:"nyx-mode",role:"group","aria-label":"Mode","data-nyx-mode-switch":""});for(const[e,t]of[["pads","Pads"],["instrument","Instrument"]]){const n=ie("button",{type:"button",class:"nyx-mode-b","data-nyx-mode":e},t);n.addEventListener("click",()=>eo(e)),va.append(n)}U(va,I("page:mode"),va);mh.append(ie("div",{class:"nc-page-actions"},va,Zc.panel,Bi("Panic",Pk),Zc.button,Ut));const re=ie("div",{class:"nc-stack","data-nc-layout":"adjacent"});Dn.append(mh,ie("main",{class:"nc-page-body"},fe.panel,re));let ed=Np(jt);function wa(){const e=E.mode==="instrument";document.documentElement.toggleAttribute("data-nyx-instrument",e);for(const t of va.querySelectorAll("[data-nyx-mode]"))t.setAttribute("aria-pressed",String(t.dataset.nyxMode===E.mode));fe.panel.hidden=!e,ed(),ed=Np(e?bv:jt),e&&fe.refresh()}function eo(e){if(E.mode===e){wa();return}fe.releaseAll(),E.mode=e,Pn(),wa(),C()}wa();Dn.addEventListener("drop",e=>{E.mode!=="instrument"||!e.dataTransfer?.files?.length||(e.preventDefault(),e.stopImmediatePropagation(),kp(e.dataTransfer).then(t=>{t.length&&fe.open(t)}))},!0);Dn.addEventListener("dragover",e=>{e.dataTransfer?.types.includes("Files")&&e.preventDefault()});Dn.addEventListener("drop",e=>{const t=e.dataTransfer?.files?.[0];t&&(e.preventDefault(),zr(t))});function td(e){return Math.abs(e)<.01?"C":`${e<0?"L":"R"}${Math.round(Math.abs(e)*100)}`}function bh(){return en()?Ye?"Sitting out":D().beatAt(le())<Nt?"Joining on the next bar":"Playing":E.pads.some(t=>t.sample)?"Stopped":"Load a sample to start"}function Ok(e){if(e==="always")return"Always";if(e==="fill")return"Only in Fill";if(e==="!fill")return"Not in Fill";if(e==="pre")return"If the last one played";if(e==="!pre")return"If the last one didn't";const[t,n]=e.split(":");return`Pass ${t} of every ${n}`}const yh=[{mode:"repeat16",label:"1/16",title:"Repeat the last 16th while held"},{mode:"repeat8",label:"1/8",title:"Repeat the last 8th while held"},{mode:"reverse",label:"Rev",title:"Play what just happened backwards while held"},{mode:"half",label:"Half",title:"Half speed while held"},{mode:"stop",label:"Stop",title:"Slow to a halt like a tape machine while held"}],xa={fill:!1,perform:null};function Ls(e){xa.fill!==e&&(xa.fill=e,Y?.port.postMessage({type:"fill",on:e}),C())}function Ri(e){xa.perform!==e&&(xa.perform=e,Y?.port.postMessage({type:"perform",mode:e}),C())}function Dk(e){const t=s=>{const i=(s.target instanceof Element?s.target:null)?.closest('[data-nc-id="perform"] [data-nc-choice]'),l=i instanceof HTMLElement?i.dataset.ncChoice:void 0;return yh.some(c=>c.mode===l)?l:null},n=s=>{ge(),s==="fill"?Ls(!0):Ri(s)},a=()=>{Ls(!1),Ri(null)};e.addEventListener("pointerdown",s=>{const o=t(s);if(!o)return;s.preventDefault(),n(o);const i=()=>{a(),window.removeEventListener("pointerup",i),window.removeEventListener("pointercancel",i)};window.addEventListener("pointerup",i),window.addEventListener("pointercancel",i)}),e.addEventListener("keydown",s=>{if((s.key===" "||s.key==="Enter")&&!s.repeat){const o=t(s);if(!o)return;s.preventDefault(),n(o)}}),e.addEventListener("keyup",s=>{(s.key===" "||s.key==="Enter")&&t(s)&&a()}),window.addEventListener("blur",a)}function Bk(){return{id:"transport",title:"Transport",status:_t,controls:[{type:"button",id:"play",label:Ar(Vt()),on:Vt(),onPress:()=>void Zs()},{type:"label",id:"perform-label",text:"Hold to play"},{type:"choice",id:"perform",label:"Hold",value:xa.perform??"",options:yh.map(e=>({value:e.mode,label:e.label})),onChange:()=>{}},...J?[]:[{type:"slider",id:"tempo",label:"Tempo",min:40,max:240,step:1,value:Math.round(D().bpm),valueText:`${Math.round(D().bpm)} BPM`,onChange:e=>{pt.setTempo({bpm:e}),C()}}],{type:"group",id:"transport-more",title:"Swing",collapse:"phone",summary:dt(E.swing),controls:[{type:"slider",id:"swing",label:"Swing",min:.5,max:.75,step:.01,value:E.swing,valueText:dt(E.swing),onChange:e=>se(()=>{E.swing=e})}]},{type:"readout",id:"status",label:"Status",value:bh()},{type:"group",id:Gv,title:"Presets",summary:Vv(E.slots.map(e=>e!=null),E.active??null,yi),controls:[{type:"slotRow",id:"slots",morph:0,morphText:"",slots:yi.map((e,t)=>({label:e,filled:E.slots[t]!=null,active:E.active===t,edited:E.active===t&&Cn})),onMorph:()=>{},onSlot:(e,t)=>Kr(e,t)}]}]}}function vh(){if(!Vt())return-1;const e=D().beatAt(le());return e<0||e<Nt?-1:Math.floor(e/xi)%pe}function Rk(){const e=Ea(),t=vh();return{id:"pattern",title:"Pattern",lead:!0,summary:`${E.lanes.filter(n=>n.steps.some(a=>a.on)).length} lanes · ${e.name}`,sections:[{id:"grid",controls:[{type:"stepGrid",id:"grid",playhead:t,selectedRow:`pad-${E.selected}`,rows:E.lanes.map((n,a)=>({id:`pad-${a}`,label:z(a).name,length:n.length,lane:a%4+1,mute:n.mute,solo:n.solo,steps:n.steps.map(s=>({on:s.on,accent:s.accent,velocity:s.velocity,dim:!z(a).sample,...s0(s,n.length)}))})),onToggle:(n,a,s)=>As(n,a,o=>{s?(o.accent=o.on?!o.accent:!0,o.on=!0):(o.on=!o.on,o.on||(o.accent=!1))}),onSet:(n,a,s,o)=>As(n,a,i=>{s==="on"?(i.on=o,o||(i.accent=!1)):(i.accent=o,o&&(i.on=!0))}),onSelectRow:n=>Ke(n,!0,!0),onLongPress:(n,a)=>{we={lane:n,step:a},Ke(n,!1)},onMute:n=>se(()=>{je(n).mute=!je(n).mute}),onSolo:n=>se(()=>{je(n).solo=!je(n).solo}),onLength:(n,a)=>se(()=>{je(n).length=Math.max(1,Math.min(pe,a))}),transport:{playing:Vt(),label:Ar(Vt()),onToggle:()=>void Zs()},onFill:n=>Ls(n),onClear:()=>ik(),clearLabel:oa?"Undo":"Clear"},{type:"note",id:"grid-help",text:"Tap a name to hear it. Long-press a step for its locks."}]},{id:"pads",title:"Pad",controls:[{type:"padGrid",id:"pads",label:"Pads",columns:4,selected:E.selected,pads:E.pads.map((n,a)=>({label:n.name,empty:!n.sample,peaks:_p(n),lane:a%4+1,playing:Gt.has(a),badge:n.choke?Cs[n.choke-1]:void 0,badgeLabel:n.choke?`choke group ${Cs[n.choke-1]}`:void 0,hint:We?.route()&&ua(n)?"tuned · CALLIOPE":void 0})),onDown:n=>_k(n),onPress:n=>Hk(n),onFile:(n,a)=>{Ke(n,!1),zr(a,n)},onMove:(n,a,s)=>jk(n,a,s),menu:n=>Uk(n),onMenu:(n,a)=>void Yk(n,a),onRename:(n,a)=>Wk(n,a)},{type:"button",id:"library",label:"Library",on:!1,onPress:()=>Ft()}]}]}}function Ik(e){if(!we||we.lane!==E.selected)return[];const{lane:t,step:n}=we,a=je(t).steps[n];if(!a)return[];const s=o=>As(t,n,o);return[{type:"label",id:"lock-label",text:`Step ${n+1}`},{type:"slider",id:"lock-velocity",label:"Velocity",min:0,max:1,step:.01,value:a.velocity,valueText:dt(a.velocity),onChange:o=>s(i=>{i.velocity=o})},{type:"slider",id:"lock-chance",label:"Chance",min:0,max:1,step:.05,value:a.chance,valueText:dt(a.chance),onChange:o=>s(i=>{i.chance=o})},...e.slices?[{type:"select",id:"lock-slice",label:"Slice",value:a.slice===null?"auto":String(a.slice),options:[{value:"auto",label:`In order (${n%e.slices+1})`},...Array.from({length:e.slices},(o,i)=>({value:String(i),label:`Slice ${i+1}`}))],onChange:o=>s(i=>{i.slice=o==="auto"?null:Number(o)})}]:[],{type:"slider",id:"lock-pitch",label:"Pitch",min:-12,max:12,step:1,value:a.pitch,valueText:ma(a.pitch," st"),onChange:o=>s(i=>{i.pitch=o})},{type:"select",id:"lock-cond",label:"Plays",value:a.cond,options:gs.map(o=>({value:o,label:Ok(o)})),onChange:o=>s(i=>{gs.includes(o)&&(i.cond=o)})},{type:"choice",id:"lock-reverse",label:"Direction",value:a.reverse?"rev":"pad",options:[{value:"pad",label:"As the pad"},{value:"rev",label:"Reversed"}],onChange:o=>s(i=>{i.reverse=o==="rev"})},{type:"button",id:"lock-done",label:"Done",on:!1,onPress:()=>{we=null,C()}}]}function qk(){const e=Ct();if(!e)return[];const t=e.sources();return[{type:"label",id:"grab-label",text:e.record?"Grab or take":"Grab the bar"},{type:"select",id:"grab-from",label:"From",value:te.from,options:t.map(n=>({value:n.id,label:n.name})),onChange:n=>{te.from=n,e.listen(n),C()}},{type:"choice",id:"grab-bars",label:"Bars",value:String(te.bars),options:[1,2,4].map(n=>({value:String(n),label:String(n)})),onChange:n=>{te.bars=n==="4"?4:n==="2"?2:1,C()}},{type:"button",id:"grab",label:te.busy?"Grabbing…":te.bars===1?"Grab last bar":`Grab last ${te.bars} bars`,on:te.busy,onPress:()=>void jr()},...e.record?[{type:"button",id:"take",label:lh(),on:N.phase!=="idle",onPress:()=>Ur()}]:[]]}let Ts=-1;function _k(e){if(!z(e).sample)return;Ts=e,wh(e);const t=()=>{Ts=-1,tt?.release(e)};window.addEventListener("pointerup",()=>setTimeout(t),{once:!0})}function wh(e){Te.has(e)||tt?.hit(e),Ke(e,!0,!0)}function Hk(e){if(Ts===e){Ts=-1;return}if(!z(e).sample){Ke(e,!1),Gr("pad");return}wh(e),tt?.release(e)}function jk(e,t,n){se(()=>{const a=structuredClone(z(e)),s=structuredClone(z(t));E.pads[t]=a,n||(E.pads[e]=s.sample?s:at(e))}),Ke(t,!1)}const Cs=["A","B","C","D"];function Wk(e,t){De(n=>{n.name=t.slice(0,24)},e)}function Uk(e){const t=!!z(e).sample,n=[{id:"load",label:t?"Replace…":"Load a file…"}],a=Li().slice(-4).reverse();for(const i of a)n.push({id:`take-${i.id}`,label:`LUCY take ${i.id}`});const s=a[0];if(s&&n.push({id:`chop-take-${s.id}`,label:`Chop LUCY take ${s.id}…`}),Ct()&&n.push({id:"grab",label:te.bars===1?"Grab the last bar":`Grab the last ${te.bars} bars`}),Ct()?.record&&n.push({id:"record",label:N.phase==="rec"?"Stop the take":`Take from ${Ms(te.from)}`}),n.push({id:"library",label:"Library…"}),z(e).provenance){const i=_r(e);if(i.length)for(const l of i)n.push({id:`alt-${l.id}`,label:`Alternative: ${En(l.title)}`});else Oe.ensure().then(()=>C()),n.push({id:"alternatives",label:"Alternatives…"})}return t&&n.push({id:"region",label:"Edit region…"},{id:"chop",label:"Chop to pads…"}),t&&n.push({id:"rename",label:"Rename…"},{id:"remove",label:"Remove sample"}),n}async function Yk(e,t){if(Ke(e,!1),t==="load")Gr("pad");else if(t==="grab")await jr();else if(t==="record")Ur();else if(t==="remove"||t==="clear")La(e);else if(t==="library")Ft(!0);else if(t==="chop")await Ma();else if(t==="region")await Js();else if(t.startsWith("chop-take-")){const n=Li().find(a=>`chop-take-${a.id}`===t);n&&await $k(n)}else if(t==="alternatives"){const n=z(e).provenance;Ft(!0,n?n.query||n.role:void 0)}else if(t.startsWith("alt-")){const n=_r(e).find(a=>`alt-${a.id}`===t);n&&await Gs(n,z(e).provenance?.query??"",e)}else if(t.startsWith("take-")){const n=Li().find(a=>`take-${a.id}`===t);n&&await ph(n)}}const Vr=new Tv;document.addEventListener("keydown",e=>{!Ce||e.repeat||e.shiftKey||e.altKey||!(e.metaKey||e.ctrlKey)||e.key.toLowerCase()!=="z"||(e.target instanceof HTMLElement?e.target:null)?.closest("input, select, textarea, [contenteditable]")||(e.preventDefault(),Rr())});const xh=e=>Y?.port.postMessage({type:"release",pad:e});Fv(document);document.addEventListener("keydown",e=>{if(e.repeat||e.metaKey||e.ctrlKey||e.altKey||Nv(e.target))return;if(E.mode==="instrument"){fe.keyDown(e)&&e.preventDefault();return}const t=$p(e);t<0||!z(t).sample||(e.preventDefault(),!(Vr.press(e)<0)&&(Te.has(t)||tt?.hit(t),Ze(t,null,!0,!0)))});document.addEventListener("keyup",e=>{if(fe.keyUp(e))return;const t=Vr.release(e);t<0||(tt?.release(t),xh(t))});window.addEventListener("blur",()=>{fe.releaseAll();for(const e of Vr.releaseAll())tt?.release(e),xh(e)});document.addEventListener("keydown",e=>{if(e.code!=="Space"&&e.code!=="Backspace"&&e.code!=="Delete"||e.metaKey||e.ctrlKey||e.altKey)return;const t=e.target instanceof HTMLElement?e.target:null;if(t?.closest("input, select, textarea, [contenteditable]"))return;if(e.code!=="Delete"&&ex(e)){e.preventDefault();return}if(e.code==="Space"||e.repeat||e.shiftKey)return;const n=t?.closest('[data-nc-id="pads"] .nc-padgrid-pad');if(!n)return;const a=[...document.querySelectorAll('[data-nc-id="pads"] .nc-padgrid-pad')].indexOf(n);a<0||!z(a).sample||(e.preventDefault(),Ke(a,!1),La(a),n.focus())});function Qr(e){const t=I("kit:pad-key");e.querySelectorAll('[data-nc-id="pads"] .nc-padgrid-pad').forEach((n,a)=>{const s=Lv[a];if(!s)return;let o=n.querySelector(":scope > .nyx-pad-key");o||(o=ie("span",{class:"nyx-pad-key","aria-hidden":"true"}),n.append(o)),o.textContent!==s&&(o.textContent=s),U(o,t)})}function kh(e){const t=I("kit:pad-playing");e.querySelectorAll('[data-nc-id="pads"] .nc-padgrid-pad').forEach((n,a)=>{const s=Te.has(a);n.hasAttribute("data-nyx-stop")!==s&&(n.toggleAttribute("data-nyx-stop",s),s?U(n,t,n):rv(n))})}function nd(e,t){const n=js(e,t,D().bpm),a=Number(n.toFixed(2));return{speed:n,far:e.keepPitch&&(a<Ln[0]||a>Ln[1])}}function $h(e){const t=e.querySelector('[data-nc-id="fit-speed"]');if(!t)return;const n=Ea(),a=n.sample?_.info(n.sample):void 0,s=Number((a?js(n,a,D().bpm):1).toFixed(2)),o=n.keepPitch&&(s<Ln[0]||s>Ln[1]);t.toggleAttribute("data-nyx-far",o)}function Sh(e){const t=e.querySelector('[data-nc-id="level"][data-nc-slider]');!(t instanceof HTMLElement)||t.dataset.nyxLevel||(t.dataset.nyxLevel="",t.title="Double-click: back to 0 dB",t.addEventListener("dblclick",()=>{Ea().levelDb!==0&&De(n=>{n.levelDb=0})}))}const ad=["C","C♯","D","E♭","E","F","F♯","G","A♭","A","B♭","B"];function Kk(e,t){const n=We?.route();if(!n)return[];const a=ua(t),s=i=>De(i),o=t.sample?t.fit>0?`Pad ${e+1} is fitted to bars: it keeps its pitch.`:a?`Pad ${e+1}'s hits play at the root of CALLIOPE's chord, from ${ad[t.note]}. The pattern's own hits still play.`:`Pad ${e+1} keeps its own pitch. Follow tunes its hits to CALLIOPE's root.`:"Load a sound on this pad to tune it to CALLIOPE.";return[{type:"label",id:"notes-label",text:"Notes in"},{type:"note",id:"notes-by",text:`Played by ${n.name} · ${nx(n)}`},...t.sample&&t.fit===0?[{type:"toggle",id:"pad-follow",label:"Follow CALLIOPE",pressed:a,onPress:()=>s(i=>{i.follow=!ua(i)})},{type:"select",id:"pad-note",label:"Sample is",value:String(t.note),options:ad.map((i,l)=>({value:String(l),label:i})),onChange:i=>s(l=>{l.note=Number(i)})}]:[],{type:"note",id:"notes-how",text:o},{type:"button",id:"notes-open",label:`Open ${n.name.split(" ")[0]}`,on:!1,onPress:()=>void We?.open()},{type:"button",id:"notes-mine",label:"Play it myself",on:!1,onPress:()=>{We?.takeBack()&&C()}}]}function Xk(){const e=E.selected,t=z(e),n=t.sample?_.info(t.sample):void 0,a=_s(t).slice(1,-1),s=t.end-t.start,o=n?n.frames/n.sampleRate:0,i=!!t.sample,l=i&&!n,c=h=>De(h),d=Jt.get(e),u=i?[...t.rights==="unknown"?[{type:"readout",id:"rights",label:"Rights",value:"Unknown · computer audio"}]:[],...t.provenance?[{type:"readout",id:"credit",label:"Credit",value:`${t.provenance.creator} · ${ir(t.provenance.license,t.provenance.licenseStatus)}`}]:[],{type:"readout",id:"sample",label:"Length",value:l?t.provenance?.origin==="local"?"Local sound, not here: open its local Library":"Not in this browser: load it again":`${wt(o*s)} of ${wt(o)} · ${n?.channels===2?"stereo":"mono"}`},...bp(d,t)&&n?[{type:"note",id:"auto-fit-note",text:ev(d.fit)},...xc({...d.fit,...nd(t,n)})?[{type:"note",id:"auto-fit-far",text:xc({...d.fit,...nd(t,n)})}]:[],{type:"button",id:"auto-fit-undo",label:"Undo fit",on:!1,onPress:()=>lk(e)}]:[],{type:"choice",id:"mode",label:"Mode",value:t.mode,options:[{value:"oneshot",label:"One-shot"},{value:"gate",label:"Gate"},{value:"loop",label:"Loop"}],onChange:h=>c(p=>{p.mode=h})},{type:"choice",id:"retrigger",label:"Retrigger",value:t.retrigger,options:[{value:"cut",label:"Cut"},{value:"finish",label:"Let it finish"}],onChange:h=>c(p=>{p.retrigger=h==="finish"?"finish":"cut"})},{type:"choice",id:"dir",label:"Direction",value:t.dir,options:[{value:"fwd",label:"Forward"},{value:"rev",label:"Reverse"},{value:"pingpong",label:"Ping-pong"}],onChange:h=>c(p=>{(h==="fwd"||h==="rev"||h==="pingpong")&&(p.dir=h)})},{type:"slider",id:"start",label:"Start",min:0,max:1,step:.001,value:t.start,valueText:wt(t.start*o),onChange:h=>c(p=>{p.start=Math.min(h,p.end-.002)}),onCommit:()=>void Ze(e)},{type:"slider",id:"end",label:"End",min:0,max:1,step:.001,value:Xc(t),valueText:t.length!=="free"&&rt(t)?`${wt(Xc(t)*o)} · ${Dt(t.length)}`:wt(t.end*o),onChange:h=>c(p=>{p.length="free",p.end=Math.max(h,p.start+.002)}),onCommit:()=>void Ze(e)},{type:"select",id:"slices",label:"Slices",value:String(t.slices),options:Ju.map(h=>({value:String(h),label:h?`${h}`:"Off"})),onChange:h=>void Di(Number(h),t.cuts.length?"transients":"even")},...t.slices?[{type:"choice",id:"chop",label:"Chop",value:t.cuts.length?"transients":"even",options:[{value:"even",label:"Even"},{value:"transients",label:"At hits"}],onChange:h=>void Di(t.slices,h==="transients"?"transients":"even")}]:[],{type:"button",id:"chop-to-pads",label:"Chop to pads…",on:Zt.isOpen,onPress:()=>void Ma()},{type:"group",id:"tune-shape",title:"Tune & shape",summary:hv(t),controls:[{type:"label",id:"pitch-label",text:"Pitch"},{type:"slider",id:"tune",label:"Tune",min:-24,max:24,step:1,value:t.tune,valueText:ma(t.tune," st"),onChange:h=>c(p=>{p.tune=h}),onCommit:()=>void Ze(e)},{type:"slider",id:"fine",label:"Fine",min:-100,max:100,step:1,value:t.fine,valueText:ma(t.fine," ct"),onChange:h=>c(p=>{p.fine=h})},{type:"select",id:"fit",label:"Fit to bars",value:String(t.fit),options:[{value:"0",label:"Off"},...[1,2,4,8].map(h=>({value:String(h),label:`${h} bar${h===1?"":"s"}`}))],onChange:h=>{Jt.delete(e),c(p=>{p.fit=Number(h)})}},...t.fit&&n?[{type:"choice",id:"keep-pitch",label:"Keep pitch",value:t.keepPitch?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:h=>c(p=>{p.keepPitch=h==="on"})},{type:"readout",id:"fit-speed",label:"Speed",value:`${pv(js(t,n,D().bpm))}${t.keepPitch&&nt.pending(e)&&!nt.failed?" · stretching…":""}`}]:[],{type:"choice",id:"auto-fit",label:"Auto-fit loops",value:ns?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:h=>{ns=h==="on",nv(ns),C()}},{type:"label",id:"shape-label",text:"Shape"},{type:"slider",id:"attack",label:"Attack",min:0,max:.1,step:.001,taper:"time",value:t.attack,valueText:wt(t.attack),onChange:h=>c(p=>{p.attack=h})},{type:"slider",id:"decay",label:"Decay",min:.01,max:4,step:.01,taper:"time",value:t.decay,valueText:Ja(t.decay),onChange:h=>c(p=>{p.decay=h}),onCommit:()=>void Ze(e)},{type:"slider",id:"cutoff",label:"Filter",min:-1,max:1,step:.01,value:t.cutoff,valueText:Qa(t.cutoff),onChange:h=>c(p=>{p.cutoff=Math.abs(h)<.02?0:h})},{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:dt(t.resonance),onChange:h=>c(p=>{p.resonance=h})}]},{type:"label",id:"out-label",text:"Output"},{type:"slider",id:"level",label:"Level",min:0,max:1,step:.001,value:Ay(t.levelDb),valueText:Ly(t.levelDb),onChange:h=>c(p=>{p.levelDb=My(h)})},...t.sample?[{type:"label",id:"normalize-label",text:"Normalize"},{type:"choice",id:"normalize",label:"Normalize",value:ec(t)?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:h=>void rk(e,h==="on")},{type:"readout",id:"normalize-gain",label:"Gain",value:ec(t)?t.provenance?"Library level":wy(t.normalize?.gainDb??0):"As recorded"}]:[],{type:"group",id:"pad-more",title:"Pan & choke",collapse:"phone",summary:`Pan ${td(t.pan)} · Choke ${t.choke?Cs[t.choke-1]:"none"}`,controls:[{type:"slider",id:"pan",label:"Pan",min:-1,max:1,step:.01,value:t.pan,valueText:td(t.pan),onChange:h=>c(p=>{p.pan=Math.abs(h)<.02?0:h})},{type:"select",id:"choke",label:"Choke",value:String(t.choke),options:[{value:"0",label:"None"},...Cs.map((h,p)=>({value:String(p+1),label:`Group ${h}`}))],onChange:h=>c(p=>{p.choke=Number(h)})},{type:"button",id:"clear-pad",label:"Remove sample",on:!1,onPress:()=>void La()}]}]:[];return{id:"params",title:"Params",summary:t.name,controls:[...i?[{type:"canvas",id:"wave",label:"Wave",paint:"waveform",peaks:t.sample?ks.get(t.sample)??[]:[],region:[t.start,t.end],markers:a.map(h=>t.start+h*s),position:Gt.get(e)??-1}]:[],...O?[{type:"note",id:"notice",text:O}]:[],...Kk(e,t),...Ik(t),...u,...qk()]}}function Ii(e,t){se(()=>t(E.hacks[e]))}function Gk(e,t){const n=E.hacks[e].dials[t.key]??t.default,a=`hack-${e}-${t.key}`,s=o=>Ii(e,i=>{i.dials[t.key]=o});return t.options?{type:"select",id:a,label:t.label,value:String(n),options:t.options.map(o=>({value:String(o.value),label:o.label})),onChange:o=>s(Number(o))}:{type:"slider",id:a,label:t.label,min:t.min,max:t.max,step:t.step??1,taper:$m(t),value:n,valueText:hd(t,n,D().bpm),onChange:s}}const ja=(e,t)=>(ht(e)?.dials??[]).filter(n=>!n.key.startsWith("mod_")&&n.more===!0===t).map(n=>Gk(e,n)),sd=new Map;function Oo(e){let t=sd.get(e);if(t)return t;let n=0,a=null;const s={in:0,out:0},o=()=>{const i=Cf(He,e);if(i!==a){for(let l=0;l<n;l++)a?.close();a=i;for(let l=0;l<n;l++)a?.open()}};return t={open:()=>(o(),n++,a?.open(),!0),close:()=>{n!==0&&(o(),n--,a?.close())},read:()=>(o(),a?.read()??s)},sd.set(e,t),t}function Vk(){const e=E.hacks,t=e.filter,n=t.mode==="lp"&&t.cutoff>=.999,a=o=>se(()=>o(E.hacks.filter)),s=[vp(t)?"":"Filter",e.drive.on?"Drive":"",e.compressor.on?"Comp":""].filter(Boolean);return{id:"hacks",title:"Hacks",summary:s.length?s.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:t.on,meter:Oo(`${Mr(t).type}-1`),meterHelp:I("hack-meter"),onToggle:o=>a(i=>{i.on=o}),controls:[{type:"select",id:"filter-mode",label:"Mode",value:t.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:o=>a(i=>{(o==="lp"||o==="hp"||o==="bp")&&(i.mode=o)})},{type:"canvas",id:"filter-curve",label:"Curve",paint:"filter",mode:t.mode,cutoff:t.cutoff,resonance:t.mode==="lp"?0:t.resonance,...fv(t)},{type:"slider",id:"filter-cutoff",label:"Cutoff",min:0,max:1,step:.01,value:t.cutoff,valueText:n?"open":ki(yp(t.cutoff)),onChange:o=>a(i=>{i.cutoff=o})},...t.mode==="lp"?[]:[{type:"slider",id:"filter-resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:dt(t.resonance),onChange:o=>a(i=>{i.resonance=o})}]]},{type:"group",id:"hacks-more",title:"Drive & Compressor",collapse:"phone",summary:`Drive ${e.drive.on?"on":"off"} · Compressor ${e.compressor.on?"on":"off"}`,controls:[{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:e.drive.on,meter:Oo("drive-1"),meterHelp:I("hack-meter"),onToggle:o=>Ii("drive",i=>{i.on=o}),controls:ja("drive",!1),more:ja("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:e.compressor.on,meter:Oo("compressor-1"),meterHelp:I("hack-meter"),onToggle:o=>Ii("compressor",i=>{i.on=o}),controls:ja("compressor",!1),more:ja("compressor",!0)}]}]}}const Jr=[Bk,Rk,Xk,Vk].map(e=>({def:e,handle:Hb(e())}));jb(re,Jr.map(e=>e.handle),"adjacent");Dk(re);Qr(re);Er(re);const od=re.querySelector('[data-nc-module="transport"]'),Eh=od?uv(od,{playing:()=>Vt(),onPress:()=>void Zs(),description:I("play")}):null;function Ah(){const e=re.querySelector('[data-nc-section="pads"] [data-nc-id="library"]');Oe.attach(e),Zt.attach(e)}function C(){jp?.refresh(),th?.update(),nh?.changed();for(const e of Jr)e.handle.update(e.def());Ah(),Oe.isOpen&&Oe.refresh(),Qr(re),kh(re),$h(re),Sh(re),sh(re),Er(re),Eh?.sync()}let id="";function Mh(){zn();const e=Gt.get(E.selected)??-1,t=JSON.stringify([vh(),bh(),Math.round(e*400),[...Gt.keys()],Te.pads()]);if(t!==id){id=t;for(const n of Jr.slice(0,3))n.handle.update(n.def());Ah(),Qr(re),kh(re),$h(re),Sh(re),sh(re),Er(re),Eh?.sync()}requestAnimationFrame(Mh)}requestAnimationFrame(Mh);We?.onChange(e=>{e&&C()});We?.route()&&C();globalThis.__NC_NOTES__={read:()=>({routes:We?[...We.follower.routes]:[],points:We?We.follower.points():[],follows:E.pads.map(e=>ua(e)),replay:St?{...St.stats}:null,out:tt?{...tt.stats}:null,slots:$s?{...$s.stats}:null}),log:{start(){Ss.length=0,Es=!0,Y?.port.postMessage({type:"hitlog",on:!0})},take:()=>Ss.splice(0),stop(){Es=!1,Y?.port.postMessage({type:"hitlog",on:!1})}}};tk.start();Promise.all([...ha(E)].map(e=>_.get(e))).then(e=>{for(const t of e)t&&qp(t);C()});if(J)ge(),J.providePreset?.({format:jx,version:Wx,get:()=>(Vx(E),Op(E)),set:async e=>{await fh(e,"Loaded the Scene's pattern.")}}),Ct()?.listen(te.from),J.onAudio?.({label:"Pad",targets:dh,receive:uh});else{const e=()=>{ge()};document.addEventListener("pointerdown",e,{once:!0,capture:!0}),document.addEventListener("keydown",e,{once:!0,capture:!0})}window.__nyx={state:E,instrument:{open:e=>fe.open(e),get it(){return fe},get node(){return ba},setMode:eo},clock:pt,store:_,stretcher:nt,stretchTimes:Wp,selectPad:e=>Ke(e,!1),edit:e=>se(()=>e(E)),runStretch:Up,get stretchLoaded(){return ts!==null},get ctx(){return F},get masterOut(){return Qt},chop:{open:Ma,get panel(){return Zt},get times(){return Vs.times}},region:{open:Js,get editor(){return On},get skips(){return Oi},signals:()=>Fn?.signals()??null,signal(e){Y?.port.postMessage({type:"sig",sig:{...vn(),aria:!0,...e}})},togglePlay:Zs,get linked(){return Fn!==null},hits(){const e=z(E.selected);return e.sample?(Hr(e.sample),qs(_.info(e.sample)?.analysis,e.hitSense)):null}},get fx(){return He},get positions(){return Gt},get voices(){return Hp},ensureAudio:ge,play:Ze,async setSample(e,t,n,a="test"){await ge()&&await tn(e,t,n,a,!0,null,null,An(t,n))},grab:te,grabBars:jr,get padUndo(){const e=Ce?.before[0];return Ce&&e?{index:e.index,sample:e.pad.sample,pads:Ce.before.map(t=>t.index)}:null},undoPad:Rr,removePad:La,receiveAudio:uh,padTargets:dh,take:N,pressTake:Ur,get notice(){return O},setPerform:Ri,setFill:Ls,actSlot:Kr,get edited(){return Cn},library:{get panel(){return Oe},open:e=>Ft(!0,e),close:()=>Ft(!1),catalog:Kp,local:Xs,load:Gs,buildKit:()=>Oe.buildKit(),alternatives:e=>_r(e).map(t=>t.id),preview:Zp,get previewing(){return xn?.id??null}},toggleStep(e,t){As(e,t,n=>{n.on=!n.on})}};
