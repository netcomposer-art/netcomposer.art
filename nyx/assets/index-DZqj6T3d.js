(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const rn=1e-9;function Oh(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class Ui{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return Oh(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(i=>Number.isFinite(i.beat)&&Number.isFinite(i.bpm)).slice().sort((i,l)=>i.beat-l.beat);let s=a.length?a[0].bpm:this.bpm;for(const i of a)i.beat<=t.beat+rn&&(s=i.bpm);const o=[{beat:t.beat,time:t.time,bpm:this.clamp(s)}];for(const i of a){if(i.beat<=t.beat+rn)continue;const l=this.clamp(i.bpm);l!==o[o.length-1].bpm&&o.push({beat:i.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+rn){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-rn;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,s=.25){const o=this.bpmAt(n);if(!(a>0)||!(s>0)){this.setTempoAt(t,n);return}const i=Math.max(1,Math.round(a/s));this.setTempoAt(o,n);for(let l=1;l<=i;l++)this.setTempoAt(o+(t-o)*l/i,n+a*(l-1)/i)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new Ui({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+rn)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+rn)return n[a];return n[0]}}const Dh=Object.freeze({beatsPerBar:4,beatUnit:4}),mn=1e-9;function Bh(e){return Math.floor(e+mn)}function hd(e,t,n=!1){if(!(t>0))return e;const s=Math.ceil(e/t-mn)*t;return n&&s<=e+mn?s+t:s}class Rh{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new Ui({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??Dh}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-mn&&(this.stopTime===null||t<this.stopTime-mn)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-mn?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=Bh(t/n),s=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:s,barPhase:s/n}}nextBar(t,n=!1){return hd(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const fd="nc-clock/snapshot",md=1;function Ih(e,t="local"){return{format:fd,version:md,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function qh(e,t){const n=_h(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const rt=e=>typeof e=="number"&&Number.isFinite(e),ol=e=>e===null||rt(e);function _h(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==fd&&n("format"),(!rt(t.version)||Math.floor(t.version)!==md)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!rt(t.anchor.beat)||!rt(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&rt(a.beat)&&rt(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!rt(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!rt(t.meter.beatUnit))&&n("meter"),(!ol(t.startTime)||!ol(t.stopTime)||!rt(t.stoppedBeat))&&n("transport times"),t}class Hh{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new Rh(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){qh(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return Ih(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const jh="nc-sync/1",Wh=1,Yh="nc-sync",Uh="nc-sync-leader",Kh=0,gd=.5,bd=.75;function Xh(e){return typeof e=="number"&&Number.isFinite(e)&&e>=gd&&e<=bd?e:null}const ao=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),qn=e=>typeof e=="number"&&Number.isFinite(e),Na=e=>typeof e=="string"&&e.length>0;function Gh(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==Wh||!Na(t.type)||!Na(t.from)||!qn(t.term)||!qn(t.seq)||!qn(t.sentAt))return null;switch(t.type){case"hello":return Na(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return qn(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&qn(t.slot)?t:null;case"ping":case"pong":return Na(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function Vh(e,t,n,a,s){return{proto:jh,from:t,term:n,seq:a,sentAt:s,...e}}function ce(){return(performance.timeOrigin+performance.now())/1e3}const so=.003,Qh=3,oo=.002+1e-6,Jh=.01,il=500;class rl{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Jh:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=so&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const s=n-(this.timeOrigin+a)/1e3,o=this.median(),i=s-o,l=Math.abs(s-this.preStepBase),c=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(i);return!c&&Math.abs(i)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&c===this.pendingBack&&(c||Math.abs(i-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(s,o,c))):(this.pendingStep=i,this.pendingBack=c,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const s=this.heldBase()!==null,o=this.ctx.currentTime,i=o<=this.revertUntil;let l;if(a&&i){const c=this.offsets,d=this.preStep;c.length=0;for(let u=0;u<d.length;u++)c.push(d[u]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:o,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!i){const u=this.offsets,h=this.preStep;h.length=0;for(let p=0;p<u.length;p++)h.push(u[p]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?o+this.stepRevert:-1/0}const c=this.offsets,d=t-n;for(let u=0;u<c.length;u++)c[u]+=d;this.stepCount++,l={stepSeconds:t-n,confirmedAt:o,reanchors:this.stepCount,revert:!1}}if(!s)for(const c of[...this.stepListeners])c(l);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let o=0;o<a;o++){const i=t[o];let l=o-1;for(;l>=0&&n[l]>i;)n[l+1]=n[l],l--;n[l+1]=i}const s=a>>1;return a%2?n[s]:(n[s-1]+n[s])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const s=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(s&&Number.isFinite(s.contextTime)&&Number.isFinite(s.performanceTime)&&s.contextTime>=so&&s.performanceTime>0)if(this.waitSince=null,s.contextTime===this.lastStampC&&s.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<il)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=s.contextTime,this.lastStampP=s.performanceTime,this.stampSince=this.perfNow(),n=s.contextTime-(this.timeOrigin+s.performanceTime)/1e3,a=!0;else if(!s||!(s.contextTime>=so)&&!(s.contextTime>0&&!(s.performanceTime>0))){if(s){const o=this.perfNow();if(this.waitSince===null&&(this.waitSince=o),o-this.waitSince<il)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(Qh,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let s=-1,o=0;for(let l=0;l<n;l++){let c=0;for(let d=0;d<n;d++)Math.abs(t[d]-t[l])<=oo&&c++;c>o&&(s=l,o=c)}if(o<a)return;const i=t[s];for(let l=n-1;l>=0;l--)Math.abs(t[l]-i)>oo&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-this.estimate())<=oo}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const s=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(s,2)};setTimeout(s,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,s=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(s)&&s>0?s:null}}class Zh{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...ao,...t.capabilities},this.channelOption=t.channel??Yh,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const s=this.o.now(),o=()=>{n===this.startWaits&&t(s)};return a.then(o,o),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const s=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(s),0)}else{const s=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?s:Math.max(t+this.o.gatedStartLeadSeconds,s),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[s,o]=this.tempoRange();t=Math.min(o,Math.max(s,t));const i=this.clock.transport,l=this.o.now();if(!i.running){this.clock.commitTempo(t),this.broadcastState();return}const c=i.beatAt(l+this.o.minLeadSeconds),d=Math.max(n??hd(c,1),c);a&&a>0?(i.tempo.rampTempo(t,d,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,d),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(bd,Math.max(gd,t)):Kh;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=Xh(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=Gh(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const s=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...ao,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),s||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const s=this.peers.get(n.from);s?s.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...ao},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(s=>{this.leader&&this.decideStart(s)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const s of[...this.snapshotListeners])s(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const s of[...this.messageListeners])s(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const i=this.releaseLock;this.releaseLock=null,i()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(Uh,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(i=>{this.releaseLock=()=>{this.setLeader(!1),i()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,i,l)=>[o?0:1,i,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),s=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const i=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(s===null||i[0]<a[0]||i[0]===a[0]&&(i[1]<a[1]||i[1]===a[1]&&i[2]<a[2]))&&(a=i,s=o.id)}this.setLeader(s===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],s=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==s[0]?a[0]<s[0]:a[1]!==s[1]?a[1]<s[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const s=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>s&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(Vh(t,this.id,this.term,++this.seq,this.o.now()))}}const ef="modulepreload",tf=function(e){return"/nyx/"+e},ll={},nf=function(t,n,a){let s=Promise.resolve();if(n&&n.length>0){let i=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");s=i(n.map(d=>{if(d=tf(d),d in ll)return;ll[d]=!0;const u=d.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${h}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":ef,u||(p.as="script"),p.crossOrigin="",p.href=d,c&&p.setAttribute("nonce",c),document.head.appendChild(p),u)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(i){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=i,window.dispatchEvent(l),!l.defaultPrevented)throw i}return s.then(i=>{for(const l of i||[])l.status==="rejected"&&o(l.reason);return t().catch(o)})};var af=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],_o=[.25,.5,.75,1,1.5,2],sf=4.9,oe={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},Ot={fmt:"wet"},Ve={fmt:"pct"},ln={fmt:"db"},Fa={fmt:"signedPct"},io={fmt:"num",suffix:" ms"},ae={div:100};function P(e,t,n,a,s,o,i,l){var c={key:e,label:t,min:n,max:a,default:s,step:1,k:o,unit:null,format:i};if(l)for(var d in l)c[d]=l[d];return c}function Pa(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var ea=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[P("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:oe.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[P("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:oe.hpHz,astrid:!0,zero:"off"}),P("q","Resonance",0,100,0,2,{fmt:"q",law:oe.hpQ},{dsp:{law:oe.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[P("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:oe.bpHz,astrid:!0},{dsp:{law:oe.bpHz}}),P("q","Q",0,100,0,2,{fmt:"q",law:oe.bpQ},{dsp:{law:oe.bpQ}}),P("mix","Mix",0,100,100,3,Ot,{dsp:ae,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[P("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Pa(af),overriddenBy:"beats_free",tempoSynced:!0}),P("feedback","Feedback",0,90,35,2,Ve,{dsp:ae,unit:"%"}),P("mix","Wet/dry",0,100,0,3,Ot,{dsp:ae,unit:"%",astridKey:"wet"}),P("tone","Tone",0,100,100,4,{fmt:"hz",law:oe.delayTone,offAt:100},{dsp:{div:99},more:!0}),P("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),P("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Pa([[0,"Insert"],[1,"Send"]]),more:!0}),P("send","Send",0,100,100,7,Ve,{dsp:ae,unit:"%",more:!0}),P("mod_send","Accent → send",-100,100,0,8,Fa,{dsp:ae,unit:"%",more:!0}),P("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[P("predelay","Pre-delay",0,200,0,1,io,{dsp:{div:1e3},unit:"ms"}),P("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:ae,unit:"%"}),P("decay","Decay",0,100,50,3,Ve,{dsp:ae,unit:"%"}),P("damping","Damping",0,100,0,4,Ve,{dsp:ae,unit:"%"}),P("mix","Mix",0,100,0,5,Ot,{dsp:ae,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[P("rate","Rate",0,100,26,1,{fmt:"rate",law:oe.rate},{dsp:{law:oe.rate}}),P("depth","Depth",0,100,70,2,Ve,{dsp:ae,unit:"%"}),P("feedback","Feedback",-90,90,50,3,Fa,{dsp:ae,unit:"%"}),P("mix","Mix",0,100,50,4,Ot,{dsp:ae,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[P("rate","Rate",0,100,52,1,{fmt:"rate",law:oe.rate},{dsp:{law:oe.rate}}),P("depth","Depth",0,100,50,2,Ve,{dsp:ae,unit:"%"}),P("spread","Spread",0,100,70,3,Ve,{dsp:ae,unit:"%"}),P("mix","Mix",0,100,40,4,Ot,{dsp:ae,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[P("rate","Rate",0,100,39,1,{fmt:"rate",law:oe.rate},{dsp:{law:oe.rate}}),P("depth","Depth",0,100,70,2,Ve,{dsp:ae,unit:"%"}),P("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Pa([[4,"4"],[6,"6"],[8,"8"]])}),P("feedback","Feedback",0,90,30,4,Ve,{dsp:ae,unit:"%"}),P("mix","Mix",0,100,50,5,Ot,{dsp:ae,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[P("low_db","Low",-18,18,0,1,ln,{unit:"dB"}),P("mid_db","Mid",-18,18,0,2,ln,{unit:"dB"}),P("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:oe.midHz,astrid:!0},{dsp:{law:oe.midHz}}),P("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:oe.eqQ},{dsp:{law:oe.eqQ}}),P("high_db","High",-18,18,0,4,ln,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[P("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),P("output_db","Output",-12,12,0,2,ln,{unit:"dB"}),P("mix","Mix",0,100,100,3,Ot,{dsp:ae,unit:"%"}),P("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Pa([[0,"Smooth"],[1,"Acid"]]),more:!0}),P("tone","Tone",0,100,100,5,{fmt:"hz",law:oe.driveTone,offAt:100},{dsp:{div:99},more:!0}),P("mod_drive","Accent → drive",-100,100,0,6,Fa,{dsp:ae,unit:"%",more:!0}),P("mod_tone","Accent → tone",-100,100,0,7,Fa,{dsp:ae,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[P("threshold_db","Threshold",-60,0,0,1,ln,{unit:"dB"}),P("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:oe.ratio},{dsp:{law:oe.ratio}}),P("attack_ms","Attack",1,100,10,3,io,{unit:"ms"}),P("release_ms","Release",10,1e3,150,4,io,{unit:"ms"}),P("makeup_db","Makeup",0,24,0,5,ln,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[P("width","Width",0,200,100,1,Ve,{dsp:ae,unit:"%"}),P("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:ae})]}],of=ea.map(function(e){return e.type});ea.filter(function(e){return!e.hidden}).map(function(e){return e.type});var rf={reverb:"plate"};function Ki(e){var t=rf[e]||e;return of.indexOf(t)>=0?t:null}function ft(e){for(var t=Ki(e),n=0;n<ea.length;n++)if(ea[n].type===t)return ea[n];return null}function hn(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function yd(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=hn(n.law,t);return a===null?0:a}function cl(e,t){return Math.min(sf,e*60/(t>0?t:120))}var dl=function(e){return e>0?"+":e<0?"−":""};function lf(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function vd(e,t,n){var a=e.format,s;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:dl(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return dl(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(s=hn(a.law,t),s===null?a.zero||"open":a.astrid?lf(s):s+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+hn(a.law,t).toFixed(1);case"ratio":return hn(a.law,t).toFixed(1)+":1";case"rate":return s=hn(a.law,t),(s<1?s.toFixed(2):s<10?s.toFixed(1):s.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var o=0;o<e.options.length;o++)if(e.options[o].value===t)return e.options[o].label;return String(t);case"tempoMs":return Math.round(cl(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(cl(t,n)*1e3)+" ms"}return String(t)}var cf=1,Ps=["drive","delay","plate"];function df(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,s){return vd(e,a,s)},t}var ta=Ps.map(function(e){var t=ft(e),n={type:e,label:t.label,dials:t.dials.map(df)};return t.tempoSynced&&(n.tempoSynced=!0),n}),uf={reverb:"plate"};function is(e){var t=uf[e]||e;return Ps.indexOf(t)>=0?t:null}function zs(e){for(var t=is(e),n=0;n<ta.length;n++)if(ta[n].type===t)return ta[n];return null}function wd(e,t){var n=zs(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function $n(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function Ct(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,s=1;s<e.options.length;s++)Math.abs(e.options[s].value-t)<Math.abs(a-t)&&(a=e.options[s].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*o)/o))+0}function pf(){return{v:cf,chain:ta.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function hf(e){return _o.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},_o[0])}function ro(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ff(e){for(var t=Array.isArray(e)?e:ro(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=pf(),s={},o=[],i=0;i<t.length;i++){var l=t[i];if(ro(l)){var c=is(l.type);if(!c){typeof l.type=="string"&&o.push(l.type);continue}if(s[c]){o.push(c);continue}s[c]=!0;var d=a.chain[Ps.indexOf(c)],u=ro(l.dials)?l.dials:{};c==="delay"&&u.mix===void 0&&u.wet!==void 0&&(u=Object.assign({},u,{mix:u.wet})),d.bypass=n?l.bypass===!0:l.bypass!==!1,zs(c).dials.forEach(function(h){d.dials[h.key]=Ct(h,u[h.key])}),mf(c,d.dials,u)}}return{state:a,dropped:o}}function mf(e,t,n){for(var a=zs(e),s=0;s<a.dials.length;s++){var o=a.dials[s];o.stepWhen&&(t[o.key]=Ct(o,n&&typeof n[o.key]=="number"?n[o.key]:t[o.key],$n(o,t)))}}function Ho(e){return ff(e).state}function gf(e){return JSON.parse(JSON.stringify(e))}var bf=24,jo={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Wo(e,t,n){if(t==="bypass")return n?0:1;var a=wd(e,t)||yf(e,t);return a?yd(a,n):0}function yf(e,t){var n=ft(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var vf={};ta.forEach(function(e){e.dials.forEach(function(t){vf[e.type+"."+t.key]=t.format})});function lo(e,t){var n=new Float64Array(bf),a=Ho(e);return a.chain.forEach(function(s){var o=jo[s.type];n[o.bypass]=s.bypass?0:1,Object.keys(s.dials).forEach(function(i){n[o[i]]=Wo(s.type,i,s.dials[i])})}),n}var wf=2,rs=3,xf=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function _n(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function xd(e,t){var n=ft(e);if(!n)return null;var a={};(t||[]).forEach(function(i){i&&i.id&&(a[i.id]=!0)});for(var s=1;a[n.type+"-"+s];)s++;var o={};return n.dials.forEach(function(i){o[i.key]=i.default}),{id:n.type+"-"+s,type:n.type,bypass:!1,dials:o}}function kf(e){var t=ft(e.type),n=/-(\d+)$/.exec(e.id||"");return(t?t.label:e.type)+(n&&+n[1]>1?" "+n[1]:"")}function $f(e,t,n){var a=e.length-1,s=Math.max(0,Math.min(a,n));if(t<0||t>a||t===s)return e;var o=e.slice(),i=o.splice(t,1)[0];return o.splice(s,0,i),o}function Sf(e){return typeof e=="number"&&isFinite(e)?hf(e):e}function ul(e,t,n){var a={};return e.dials.forEach(function(s){var o=t[s.key];o===void 0&&s.astridKey&&(o=t[s.astridKey]),n&&e.type==="delay"&&s.key==="delay_beats"&&(o=Sf(o)),a[s.key]=Ct(s,o)}),e.dials.forEach(function(s){s.stepWhen&&(a[s.key]=Ct(s,typeof t[s.key]=="number"?t[s.key]:a[s.key],$n(s,a)))}),a}function Ef(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,s=1/0,o=e.min;o<=e.max;o++){var i=hn(n.law,o),l=i===null?1/0:Math.abs(i-t);l<s&&(s=l,a=o)}return a}}var Af={rate:"rate_hz"};function Mf(e,t,n,a){var s={};return e.dials.forEach(function(o){if(!o.more){var i=o.astridKey||Af[o.key]||o.key;s[o.key]=Ef(o,t[i])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),s}function Lf(e,t){var n=t>0?Math.floor(t):rs,a=[],s=[],o=[],i=!1,l=!1;Array.isArray(e)?(o=e,l=!0):_n(e)&&Array.isArray(e.chain)&&(o=e.chain,i=e.v===1,l=e.schema===2);for(var c=[],d=0;d<o.length;d++){var u=o[d];if(_n(u)&&!(u.type==="limiter"||u.fixed===!0)){var h=Ki(u.type),p=h&&ft(h);if(!p||i&&["drive","delay","plate"].indexOf(h)<0){typeof u.type=="string"&&a.push(u.type);continue}if(c.length>=n){a.push(u.id||h);continue}var f;_n(u.params)&&!_n(u.dials)?f=ul(p,Mf(p,u.params,s,u.id||h),l):f=ul(p,_n(u.dials)?u.dials:{},l);var g=xd(h,c),w=typeof u.id=="string"&&xf.test(u.id)&&!c.some(function(b){return b.id===u.id})?u.id:g.id,m=i?u.bypass!==!1:u.bypass===!0;c.push({id:i?g.id:w,type:h,bypass:m,dials:f})}}return{state:{v:wf,chain:c},dropped:a,notes:s}}function Ua(e,t){return Lf(e,t).state}function cn(e){var t=ft(e.type),n=[[0,e.bypass?0:1]];return t.dials.forEach(function(a){n.push([a.k,yd(a,e.dials[a.key])])}),n}function Tf(e){var t=Ua(e,8),n=[],a=t.chain.map(function(s,o){var i=ft(s.type),l={};return o>=rs&&n.push(s.id+": ASTRID keeps three hacks"),i.dials.forEach(function(c){var d=s.dials[c.key];if(c.more){d!==c.default&&n.push(s.id+"."+c.key);return}c.key==="delay_beats"&&_o.indexOf(d)<0&&n.push(s.id+".delay_beats"),l[c.astridKey||c.key]=d}),{id:s.id,type:s.type,bypass:s.bypass,dials:l}});return{hacks:a,lossy:n}}var Cf="nc-fx@1",Nf=600,Ff=256,Pf=8,Hn=typeof WeakMap=="function"?new WeakMap:null;function zf(e,t){var n=Hn&&Hn.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await nf(async()=>{const{default:o}=await import("./worklet-source-BibsVBZk.js");return{default:o}},[])).default,s=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(s)}finally{URL.revokeObjectURL(s)}})(),Hn&&(Hn.set(e,n),n.catch(function(){Hn.delete(e)})),n)}function dn(e,t){return typeof e=="number"&&isFinite(e)?e:t}function kd(e,t,n,a){var s=Math.min(400,Math.max(20,dn(t.bpm,120))),o=[],i=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",c=dn(t.preGain,1),d=Math.max(0,dn(t.crossfade,.012)),u=dn(t.maxDelaySeconds,void 0),h=e.createGain(),p=e.createGain(),f=e.createGain(),g=e.createGain(),w=null;t.modInput===!0&&(w=e.createGain(),w.channelCount=1,w.channelCountMode="explicit",w.channelInterpretation="discrete"),g.gain.value=0,h.connect(f),f.connect(p),g.connect(p);var m={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:s,mUsers:0,lv:null,lvAt:0},b=n(s);m.post=function(k){m.node?m.node.port.postMessage(k):m.disposed||(o.length>=Ff&&(o=a().concat([{t:"tempo",bpm:m.bpm,when:0}]),m.mUsers>0&&o.push({t:"meter",on:!0})),o.push(k))};function v(k){var $=o.map(function(E){var M=Object.assign({},E);return M.when>k||(M.when=0,M.t!=="clear"&&(M.snap=!0)),M});return o=[],$}m.emit=function(k){for(var $=0;$<m.listeners.length;$++)try{m.listeners[$](k)}catch(E){typeof console<"u"&&console.error(E)}},m.whenOf=function(k){return typeof k=="number"&&isFinite(k)&&k>0?k:0};var y=!1;m.tooFar=function(k){return typeof k=="number"&&k>e.currentTime+Nf?(!y&&typeof console<"u"&&(y=!0,console.warn("nc-fx: ignoring a time "+Math.round(k-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var x=zf(e,t.moduleUrl).then(function(){if(!m.disposed){var k=Object.assign({bpm:s,bypassMode:l,limiter:i,preGain:c,maxDelaySeconds:u},b);k.pending=v(e.currentTime),m.node=new AudioWorkletNode(e,Cf,{numberOfInputs:w?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:k}),m.node.port.onmessage=function(E){var M=E.data;M&&M.t==="lv"&&m.mUsers>0&&(m.lv=M.d,m.lvAt=pl())},h.connect(m.node),w&&w.connect(m.node,0,1),m.node.connect(g);var $=e.currentTime;$<=0||d===0?(f.gain.value=0,g.gain.value=1):(f.gain.setValueAtTime(1,$),f.gain.linearRampToValueAtTime(0,$+d),g.gain.setValueAtTime(0,$),g.gain.linearRampToValueAtTime(1,$+d)),m.status="ready"}},function(k){m.status="unavailable",o=[],m.error=k});m.meterOpen=function(){return m.disposed||m.status==="unavailable"?!1:(m.mUsers++===0&&m.post({t:"meter",on:!0}),!0)},m.meterClose=function(){m.mUsers!==0&&--m.mUsers===0&&(m.lv=null,m.disposed||m.post({t:"meter",on:!1}))},m.levels=function(){return m.lv&&pl()-m.lvAt<Of?m.lv:null};var S={};return m.meter=function(k,$){if(S[k])return S[k];var E=0,M={in:0,out:0},B={open:function(){return m.meterOpen()?(E++,!0):!1},close:function(){E!==0&&(E--,m.meterClose())},read:function(){var I=E>0?m.levels():null;return M.in=0,M.out=0,I&&$(I,M),M}};return S[k]=B,B},m.core={input:h,output:p,modInput:w,ready:x,get status(){return m.status},get error(){return m.error},latencySamples:i==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:i,setTempo:function(k,$){var E=dn(k,NaN);!(E>0)||m.disposed||m.tooFar($)||(m.bpm=Math.min(400,Math.max(20,E)),m.post({t:"tempo",bpm:m.bpm,when:m.whenOf($)}),m.emit({effect:null,key:"tempo",value:m.bpm}))},getTempo:function(){return m.bpm},clear:function(k){var $=k&&typeof k=="object"?k:{at:k};if(!(m.disposed||m.tooFar($.at))){var E=dn($.fadeMs,0);m.post({t:"clear",when:m.whenOf($.at),fadeMs:E>0?Math.min(1e3,E):0})}},onChange:function(k){return m.listeners.push(k),function(){var $=m.listeners.indexOf(k);$>=0&&m.listeners.splice($,1)}},dispose:function(){if(!m.disposed){if(m.disposed=!0,m.status="disposed",o=[],m.listeners.length=0,m.node){m.node.port.postMessage({t:"dispose"}),m.node.port.close();try{m.node.disconnect()}catch{}}[h,f,g,p,w].forEach(function(k){try{k&&k.disconnect()}catch{}})}}},m}var Of=250;function pl(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function $d(e,t){t.in=e[0],t.out=e[1]}function Df(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function Bf(e,t){var n=t||{};if(n.slots)return Rf(e,n);var a=Ho(n.state),s=Array.from(lo(a)),o=kd(e,n,function(){return{program:s}},function(){return[{t:"load",program:Array.from(lo(a)),when:0}]}),i=o.core;function l(c){return a.chain[Ps.indexOf(c)]}return i.setParam=function(c,d,u,h){var p=is(c);if(!(!p||o.disposed||o.tooFar(h))){var f=l(p),g;if(d==="bypass")g=!!u;else{var w=wd(p,d);if(!w)return;g=Ct(w,u,$n(w,f.dials))}return d==="bypass"?f.bypass=g:f.dials[d]=g,o.post({t:"p",i:jo[p][d],v:Wo(p,d,g),when:o.whenOf(h)}),o.emit({effect:p,key:d,value:g}),zs(p).dials.forEach(function(m){if(!(!m.stepWhen||!m.stepWhen.some(function(y){return y.key===d}))){var b=f.dials[m.key],v=Ct(m,b,$n(m,f.dials));v!==b&&(f.dials[m.key]=v,o.post({t:"p",i:jo[p][m.key],v:Wo(p,m.key,v),when:o.whenOf(h)}),o.emit({effect:p,key:m.key,value:v}))}}),g}},i.meter=function(){return o.meter("",$d)},i.getParam=function(c,d){var u=is(c);if(u){var h=l(u);return d==="bypass"?h.bypass:h.dials[d]}},i.getState=function(){return gf(a)},i.setState=function(c,d){o.disposed||o.tooFar(d&&d.at)||(a=Ho(c),o.post({t:"load",program:Array.from(lo(a)),when:o.whenOf(d&&d.at)}),o.emit({effect:null,key:null,value:null}))},i}function Rf(e,t){var n=t.slots===!0?rs:Math.max(1,Math.min(Pf,Math.floor(+t.slots)||rs)),a=Ua(t.state,n),s=1,o={};function i(m){return o[m.id]||(o[m.id]=s++),o[m.id]}function l(m){return m.map(function(b){return{uid:i(b),type:b.type,program:cn(b)}})}var c=l(a.chain),d=a.chain.map(function(m){return o[m.id]}),u=kd(e,t,function(){return{slots:n,chain:c,order:d}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(m){return o[m.id]}),when:0}]}),h=u.core;function p(m){var b;for(b=0;b<a.chain.length;b++)if(a.chain[b].id===m)return a.chain[b];var v=Ki(m);if(v){for(b=0;b<a.chain.length;b++)if(a.chain[b].type===v)return a.chain[b]}return null}function f(m,b){var v=i(m);u.post({t:"add",uid:v,type:m.type,when:b}),cn(m).forEach(function(y){u.post({t:"ps",uid:v,k:y[0],v:y[1],when:b,snap:!0})})}function g(m){u.post({t:"order",uids:a.chain.map(function(b){return o[b.id]}),when:m})}function w(m,b){var v={};a.chain.forEach(function(S){v[S.id]=S});var y=a.chain.map(function(S){return o[S.id]}).join();m.chain.forEach(function(S){var k=v[S.id];if(!k||k.type!==S.type){delete o[S.id],f(S,b);return}var $={};cn(k).forEach(function(E){$[E[0]]=E[1]}),cn(S).forEach(function(E){$[E[0]]!==E[1]&&u.post({t:"ps",uid:o[S.id],k:E[0],v:E[1],when:b})})});var x={};m.chain.forEach(function(S){x[S.id]=!0}),Object.keys(o).forEach(function(S){x[S]||delete o[S]}),a=m,a.chain.map(function(S){return o[S.id]}).join()!==y&&g(b)}return h.slots=n,h.meter=function(m){return m==null||m===""?u.meter("",$d):u.meter("#"+m,function(b,v){var y=p(m),x=y?o[y.id]:0,S=b[2];if(x){for(var k=3,$=0;$<S;$++,k+=3)if(b[k]===x){v.in=b[k+1],v.out=b[k+2];return}}})},h.setParam=function(m,b,v,y){var x=p(m);if(!(!x||u.disposed||u.tooFar(y))){var S=ft(x.type),k,$=null;if(b==="bypass")k=!!v;else{for(var E=0;E<S.dials.length;E++)S.dials[E].key===b&&($=S.dials[E]);if(!$)return;k=Ct($,v,$n($,x.dials))}var M={},B={};cn(x).forEach(function(j){M[j[0]]=j[1]}),S.dials.forEach(function(j){j.stepWhen&&(B[j.key]=x.dials[j.key])}),b==="bypass"?x.bypass=k:x.dials[b]=k,S.dials.forEach(function(j){j.stepWhen&&(x.dials[j.key]=Ct(j,x.dials[j.key],$n(j,x.dials)))});var I=u.whenOf(y),ie=o[x.id];return cn(x).forEach(function(j){(M[j[0]]!==j[1]||$&&j[0]===$.k)&&u.post({t:"ps",uid:ie,k:j[0],v:j[1],when:I})}),u.emit({effect:x.id,key:b,value:k}),Object.keys(B).forEach(function(j){j!==b&&x.dials[j]!==B[j]&&u.emit({effect:x.id,key:j,value:x.dials[j]})}),k}},h.getParam=function(m,b){var v=p(m);if(v)return b==="bypass"?v.bypass:v.dials[b]},h.getState=function(){return JSON.parse(JSON.stringify(a))},h.setState=function(m,b){u.disposed||u.tooFar(b&&b.at)||(w(Ua(m,n),u.whenOf(b&&b.at)),u.emit({effect:null,key:null,value:null}))},h.addEffect=function(m,b){var v=b||{},y=xd(m,a.chain);if(!(!y||a.chain.length>=n||u.disposed||u.tooFar(v.at))){if(v.dials){var x=Ua({v:2,chain:[{id:y.id,type:y.type,dials:v.dials}]},1).chain[0];y.dials=x.dials}v.bypass===!0&&(y.bypass=!0);var S=a.chain.slice(),k=typeof v.index=="number"?Math.max(0,Math.min(S.length,v.index)):S.length;return S.splice(k,0,y),w({v:2,chain:S},u.whenOf(v.at)),u.emit({effect:y.id,key:"chain",value:"add"}),y.id}},h.removeEffect=function(m,b){var v=p(m),y=b&&b.at;return!v||u.disposed||u.tooFar(y)?!1:(w({v:2,chain:a.chain.filter(function(x){return x!==v})},u.whenOf(y)),u.emit({effect:v.id,key:"chain",value:"remove"}),!0)},h.moveEffect=function(m,b,v){var y=p(m),x=v&&v.at;if(!y||u.disposed||u.tooFar(x))return!1;var S=$f(a.chain,a.chain.indexOf(y),b);return S===a.chain?!1:(w({v:2,chain:S},u.whenOf(x)),u.emit({effect:y.id,key:"chain",value:"move"}),!0)},h.getChain=function(){return a.chain.map(function(m){return{id:m.id,type:m.type,name:kf(m),bypass:m.bypass}})},h.toAstrid=function(){return Tf(a)},h}function hl(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function If(e,t,n){var a=n||{},s=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,o=typeof a.toAudioTime=="function"?a.toAudioTime:s?function(p){return s.toContextTime(p)}:t&&t.timebase==="shared"?null:function(p){return p},i=typeof a.now=="function"?a.now:s&&typeof s.sharedNow=="function"?function(){return s.sharedNow()}:null,l=t&&t.transport?t.transport:t,c=l&&l.tempo?l.tempo:l,d=!1;function u(p){if(!o){!d&&typeof console<"u"&&(d=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof p!="number")){var f=o(l.timeAt(p));return typeof f=="number"&&isFinite(f)?f:void 0}}function h(){var p=i&&l&&typeof l.beatAt=="function"?l.beatAt(i()):NaN;if(!isFinite(p)){var f=l&&typeof l.bpm=="number"?l.bpm:hl(c,0);f>0&&e.setTempo(f);return}var g=hl(c,p);g>0&&e.setTempo(g);for(var w=c&&(c.points||c.tempoPoints)||[],m=0;m<w.length;m++){var b=w[m];if(b.beat>p&&b.bpm>0){var v=u(b.beat);v!==void 0&&e.setTempo(b.bpm,v)}}}return h(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(p){p&&(p.kind==="tempo"&&p.bpm>0?e.setTempo(p.bpm,u(p.atBeat)):(p.kind==="snapshot"||p.kind==="start")&&h())})}const qf="/nyx/assets/worklet-CAv1bvAp.js";var _f="nc-ui",Hf={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Xi={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},ls={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},jf={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},At={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Wf={light:{color:Hf.color,semantic:Xi,component:ls,runtime:jf},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},Gn=e=>`--${_f}-${e}`,Yo=Xi["label-on-fill-dark"],fl=Xi["label-on-fill-light"],Yf=At["label-min-contrast"],Uf=/^#[0-9a-f]{6}$/i,Kf=e=>typeof e=="string"&&Uf.test(e),Ka=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function ml(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),s=o=>{let i=(o+e/30)%12;return n-a*Math.max(-1,Math.min(i-3,9-i,1))};return`#${Ka(s(0)*255)}${Ka(s(8)*255)}${Ka(s(4)*255)}`}function Sd(e){let[t,n,a]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),s=Math.max(t,n,a),o=Math.min(t,n,a),i=(s+o)/2,l=s-o;if(!l)return{h:0,s:0,l:i};let c=l/(1-Math.abs(2*i-1));return{h:((s===t?60*((n-a)/l%6):s===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:c,l:i}}function gl(e){let[t,n,a]=[1,3,5].map(s=>{let o=parseInt(e.slice(s,s+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function Uo(e,t){let[n,a]=[gl(e),gl(t)].sort((s,o)=>o-s);return(n+.05)/(a+.05)}var cs=e=>Uo(e,Yo)>=Uo(e,fl)?Yo:fl;function Ed(e,t,n,a=Yf){let s=ml(e,t,n),o=cs(s)===Yo?1:-1;for(let i=0;i<40&&Uo(s,cs(s))<a;i++)n+=o*.01,s=ml(e,t,n);return s}function Xf(e){let{h:t,s:n}=Sd(e),a=Ed(t,Math.min(n,At["surprise-on-max-saturation"]),At["surprise-on-lightness"]);return{fill:e,ink:cs(e),on:a,onInk:cs(a)}}var Gf=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function Vf(e,t=Math.random){let[n,a]=At["surprise-saturation"],[s,o]=At["surprise-lightness"],i=At["surprise-min-hue-gap"],l=Kf(e)?Sd(e).h:null,c=t()*360;return l!==null&&Gf(c,l)<i&&(c=(l+i+t()*(360-2*i))%360),Ed(c,n+t()*(a-n),s+t()*(o-s))}function Qf(e){if(!e)return null;let t=Xf(e);return{[Gn("surprise-fill")]:t.fill,[Gn("surprise-ink")]:t.ink,[Gn("surprise-on")]:t.on,[Gn("surprise-on-ink")]:t.onInk}}var Jf=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Zf=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function bl(e){let[t,n,a]=[1,3,5].map(l=>Jf(parseInt(e.slice(l,l+2),16)/255)),s=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),o=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),i=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*s+.793617785*o-.0040720468*i,1.9779984951*s-2.428592205*o+.4505937099*i,.0259040371*s+.7827717662*o-.808675766*i]}function em([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,s=(e-.1055613458*t-.0638541728*n)**3,o=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*s+.2309699292*o,-1.2684380046*a+2.6097574011*s-.3413193965*o,-.0041960863*a-.7034186147*s+1.707614701*o].map(i=>Ka(Zf(Math.max(0,Math.min(1,i)))*255)).join("")}`.toUpperCase()}var tm=At["velocity-range"],Ad={min:ls.rhythm["velocity-min"],max:ls.rhythm["velocity-max"]},yl=Object.fromEntries(Object.entries(Wf).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function nm(e,t=Ad){let[n,a]=tm,s=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,o=(s-n)/(a-n),i=t.ink??ls.rhythm["step-cell-ink"];if(o<=0)return{velocity:s,t:0,fill:t.min.toUpperCase(),ink:i};if(o>=1)return{velocity:s,t:1,fill:t.max.toUpperCase(),ink:i};let l=bl(t.min),c=bl(t.max);return{velocity:s,t:o,fill:em(l.map((d,u)=>d+(c[u]-d)*o)),ink:i}}function vl(e,t=Ad){return{[Gn("velocity-fill")]:nm(e,t).fill}}var Md="data-nc-theme",wl="nc-ui-theme-change",am="(prefers-color-scheme: dark)",Ld=e=>e?.documentElement??null,Td=e=>e?.defaultView?.matchMedia?.(am)??null,sm=e=>e==="light"||e==="dark"?e:"system";function om(e=globalThis.document){return sm(Ld(e)?.getAttribute(Md))}function Ko(e=globalThis.document){let t=om(e);return t!=="system"?t:Td(e)?.matches?"dark":"light"}function Cd(e,t=globalThis.document){let n=Ld(t);if(!n)return()=>{};let a=Ko(t),s=()=>{let c=Ko(t);c!==a&&(a=c,e(c))},o=t.defaultView?.MutationObserver,i=o?new o(s):null;i?.observe(n,{attributes:!0,attributeFilter:[Md]});let l=Td(t);return l?.addEventListener?.("change",s),t.addEventListener(wl,s),()=>{i?.disconnect(),l?.removeEventListener?.("change",s),t.removeEventListener(wl,s)}}var im={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},rm={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},lm={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},cm={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Os={};for(let[e,t]of Object.entries(rm))Os[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(cm))Os[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(lm))Os[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(im.renames.map(e=>[e.old,e.new]));function Nd(e){let t=Os[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function ee(e){return Nd(e).prop}function r(e){return`var(${ee(e)})`}function dm(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(ee(t)));return Number.isFinite(n)?n:0}function de(e,t){let n=Nd(t),a=e.ownerDocument??document,s=a.createElement("span");s.dataset.ncLive=t,s.style.position="absolute",s.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?s.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?s.style.paddingLeft=o:s.style.color=o,(e instanceof Element?e:a.documentElement).append(s);let i=(a.defaultView??window).getComputedStyle(s),l=n.kind==="family"?i.fontFamily:n.kind==="color"?i.color:i.paddingLeft;return s.remove(),l}function Fd(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function um(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=r("font-ui"),n.style.fontSize=r("label-size"),n.style.fontWeight=r("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var pm="[data-modulated], [data-modulated] *";function co(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function xl(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${r("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${r("hairline")} solid ${r("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function hm(){let e=a=>`
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
${pm} { transition: none; }
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
${xl("")}
}
@media (max-width: 1023px) {
${xl("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${co("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${co("")}
}
@media (max-width: 1023px) {
${co("html[data-nc-landscape] ")}
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
`}var uo=null,fm="nc-ui-fallback";function Pd(e=globalThis.document){if(!e?.documentElement||(e.documentElement,uo&&uo.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${fm} {
${hm()}
}
`,e.head.append(t),uo=t}var jn=null,mm=0,gm=new URL("/nyx/assets/confirm-DwyQU4Nn.css",import.meta.url).href,zd=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=gm,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&zd(document);function Od(e){return bm(e).then(t=>!!t.ok)}function bm({title:e,body:t,lines:n=[],extra:a,confirmLabel:s="Confirm",cancelLabel:o="Cancel",danger:i=!1,root:l,returnFocus:c,signal:d},u){if(jn||d?.aborted)return Promise.resolve({});let h=l?.ownerDocument??document,p=zd(h),f=l??h.body,g=h.defaultView??globalThis,w=`nc-ui-confirm-${++mm}`,m=(W,ke,be)=>{let gt=h.createElement(W);return gt.className=`nc-ui-confirm${ke}`,be!=null&&(gt.textContent=be),gt},b=m("div","-layer");b.dataset.state="enter";let v=m("div","");v.setAttribute("role","alertdialog"),v.setAttribute("aria-modal","true"),v.setAttribute("aria-labelledby",`${w}-t`);let y=m("h2","-title",e);y.id=`${w}-t`;let x=m("p","-body",t);x.id=`${w}-b`;let S=n.map((W,ke)=>{let be=m("p","-body",W?.text??W);return be.id=`${w}-b${ke}`,W?.tone==="danger"&&(be.dataset.tone="danger"),be});v.setAttribute("aria-describedby",[x,...S].map(W=>W.id).join(" "));let k=a&&m("button","-extra",a.label);k&&(k.type="button",k.dataset.ncConfirm="extra",k.addEventListener("click",()=>a.onAction?.()));let $=m("div","-actions"),E=(W,ke)=>{let be=m("button","-btn",W);return be.type="button",be.dataset.ncConfirm=ke,be.addEventListener("click",()=>sn(ke==="ok")),be},M=E(o,"cancel"),B=E(s,"ok");i&&(B.dataset.danger="true"),$.append(M,B);let[I,ie]=[];v.append(y,x,...S,...I?[I]:[],...k?[k]:[],$);let j=[ie,k,M,B].filter(Boolean);b.append(v);let _e={layer:b};jn=_e;let R=c??h.activeElement,G=[];for(let W of f.children)W.hasAttribute("inert")||(W.setAttribute("inert",""),G.push(W));let Z=()=>{if(jn!==_e)return;f.append(b),(ie??M).focus({preventScroll:!0});let W=g.requestAnimationFrame?.bind(g)??(ke=>setTimeout(ke,16));W(()=>W(()=>{b.dataset.state==="enter"&&(b.dataset.state="open")}))};p?p.then(Z):Z();let Y=!1;b.addEventListener("pointerdown",W=>{Y=W.target===b}),b.addEventListener("click",W=>{W.target===b&&Y&&sn(!1),Y=!1});let Q=W=>{if(W.stopImmediatePropagation(),W.key==="Escape")W.preventDefault(),sn(!1);else if(W.key==="Tab"){W.preventDefault();let ke=j.filter(gt=>!gt.disabled),be=ke.length;ke[(ke.indexOf(h.activeElement)+(W.shiftKey?be-1:1))%be].focus()}else W.key==="Enter"&&(W.preventDefault(),h.activeElement===k?k.click():h.activeElement===M?sn(!1):B.disabled||sn(!0))},Se=W=>W.stopImmediatePropagation();g.addEventListener("keydown",Q,!0),g.addEventListener("keyup",Se,!0);let Rn=()=>sn(!1);d?.addEventListener("abort",Rn);let In,zh=new Promise(W=>{In=W});function sn(W){if(jn!==_e)return;jn=null,g.removeEventListener("keydown",Q,!0),g.removeEventListener("keyup",Se,!0),d?.removeEventListener("abort",Rn);for(let on of G)on.removeAttribute("inert");b.dataset.state="closing",R?.isConnected&&typeof R.focus=="function"&&R.focus({preventScroll:!0});let ke=g.getComputedStyle?.(b),be=Math.max(0,...String(ke?.transitionDuration??"").split(",").map(on=>Number.parseFloat(on)*(on.trim().endsWith("ms")?1:1e3)||0)),gt=()=>b.remove();b.addEventListener("transitionend",on=>on.target===b&&gt()),setTimeout(gt,be+50),In({ok:W,value:ie?.value.trim()})}return zh}function Dd(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let s=t.createElement("span");s.dataset.ncOn="",s.textContent=e.onText??"On";let o=t.createElement("span");o.dataset.ncOff="",o.textContent=e.offText??"Off",a.append(s,o),n.append(a);let i=!1,l=d=>{i=d===!0,n.setAttribute("aria-checked",i?"true":"false")};l(e.checked);let c=()=>{l(!i),e.onChange?.(i)};return n.addEventListener("click",c),{el:n,get checked(){return i},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var Bd=new WeakMap,kl=.25;function ym(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let s=t.createElement("span");s.className="nc-fader-cap",s.setAttribute("aria-hidden","true"),n.append(a,s);let o=0,i=e.step??.005,l=e.onChange,c=e.onReset,d=m=>Math.min(1,Math.max(0,m)),u=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},h=m=>{let b=d(m);b!==o&&(o=b,u(),l?.(b))},p=0,f=!1;n.addEventListener("pointerdown",m=>{if(m.button!==0)return;m.preventDefault(),n.focus?.({preventScroll:!0});let b=n.getBoundingClientRect();m.target!==s&&b.height>0&&h(1-(m.clientY-b.top)/b.height),p=m.clientY,f=!0,n.dataset.dragging="true",n.setPointerCapture?.(m.pointerId)}),n.addEventListener("pointermove",m=>{if(!f)return;let b=n.getBoundingClientRect().height||1,v=(p-m.clientY)/b*(m.shiftKey?kl:1);p=m.clientY,h(o+v)});let g=()=>{f=!1,delete n.dataset.dragging};n.addEventListener("pointerup",g),n.addEventListener("pointercancel",g),n.addEventListener("lostpointercapture",g),n.addEventListener("dblclick",m=>{m.preventDefault(),c?.()}),n.addEventListener("keydown",m=>{let b=m.shiftKey?i*kl:i,v={ArrowUp:o+b,ArrowRight:o+b,ArrowDown:o-b,ArrowLeft:o-b,PageUp:o+i*10,PageDown:o-i*10,Home:0,End:1};m.key in v&&(m.preventDefault(),h(v[m.key]))});let w={el:n,get value(){return o},get dragging(){return f},set(m){f||(o=d(Number(m)||0),u())},setText(m){m?n.setAttribute("aria-valuetext",m):n.removeAttribute("aria-valuetext")},setLabel(m){n.setAttribute("aria-label",m)},configure(m){typeof m.step=="number"&&m.step>0&&(i=m.step),m.onChange&&(l=m.onChange),m.onReset&&(c=m.onReset)}};return w.setLabel(e.label),w.set(e.value??0),w.setText(e.valueText),Bd.set(n,w),w}function vm(e){return Bd.get(e)}var Rd=new WeakMap,wm=.2,xm=1.5,km=.5;function $m(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function $l(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:$m(a.getComputedStyle(e).getPropertyValue(ee(t)),n)}function Sm(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let s=t.createElement("button");s.type="button",s.className="nc-meter-clip",s.dataset.lit="false";let o=t.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let i=[];for(let w=0;w<n;w++){let m=t.createElement("span");m.className="nc-meter-bar";let b=t.createElement("span");b.className="nc-meter-peak";let v=t.createElement("span");v.className="nc-meter-rms";let y=t.createElement("span");y.className="nc-meter-hold",m.append(b,v,y),o.append(m),i.push({peak:b,rms:v,hold:y,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(s,o);let l=e.label,c=e.onClear,d=!1,u=-1,h=-1,p=()=>{s.dataset.lit=d?"true":"false",s.setAttribute("aria-pressed",d?"true":"false"),s.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),s.title=d?"Clipped. Click to clear":"Clip light"},f=(w,m,b,v)=>{let y=Math.round(v*1e3)/1e3;b[m]!==y&&(b[m]=y,w.style.transform=m==="hold"?`translateY(${Math.round((1-y)*1e3)/10}%)`:`scaleY(${y})`)};s.addEventListener("click",()=>{g.clear(),c?.()});let g={el:a,get clipped(){return d},update(w,m){u<0&&(u=$l(a,"motion-meter-fall",wm)),h<0&&(h=$l(a,"motion-meter-hold",xm));let b=Math.max(0,Math.min(.25,Number(m)||0)),v=u>0?Math.exp(-b/u):0;i.forEach((y,x)=>{let S=w[x]??w[0]??{peak:0,rms:0},k=Math.min(1,Math.max(0,Number(S.peak)||0)),$=Math.min(k,Math.max(0,Number(S.rms)||0));S.over&&g.clip(),y.level.peak=k>=y.level.peak?k:k+(y.level.peak-k)*v,y.level.rms=$>=y.level.rms?$:$+(y.level.rms-$)*v,y.holdAge+=b,k>=y.holdAt?(y.holdAt=k,y.holdAge=0):y.holdAge>h&&(y.holdAt=Math.max(k,y.holdAt-km*b)),f(y.peak,"peak",y.shown,y.level.peak),f(y.rms,"rms",y.shown,y.level.rms),f(y.hold,"hold",y.shown,y.holdAt),y.hold.dataset.off=y.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,p())},clear(){d=!1,p()},reset(){for(let w of i)w.level.peak=0,w.level.rms=0,w.holdAt=0,w.holdAge=0,f(w.peak,"peak",w.shown,0),f(w.rms,"rms",w.shown,0),f(w.hold,"hold",w.shown,0),w.hold.dataset.off="true"},setLabel(w){l=w,p()},configure(w){w.onClear&&(c=w.onClear)}};return p(),g.reset(),Rd.set(a,g),g}function Em(e){return e?Rd.get(e):void 0}var Am=3,Mm=new Set(["freq","q","rate","time","log"]);function Gi(e,t,n){return!e||!Mm.has(e)||!(n>t)?"linear":t>0?"log":"power"}function Ds(e,t,n){return Gi(e,t,n)!=="linear"}function ds(e,t,n,a){let s=Number(a);if(!(n>t)||!Number.isFinite(s))return 0;let o=Math.min(n,Math.max(t,s)),i=Gi(e,t,n);if(i==="log")return Math.log(o/t)/Math.log(n/t);let l=(o-t)/(n-t);return i==="power"?Math.cbrt(l):l}function Id(e,t,n,a){let s=Math.min(1,Math.max(0,Number(a)||0)),o=Gi(e,t,n);return o==="log"?t*(n/t)**s:t+(n-t)*(o==="power"?s**Am:s)}function qd(e,t,n,a){let s=Math.min(n,Math.max(t,e));if(a>0){s=t+Math.round((s-t)/a)*a;let o=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));s=Number(s.toFixed(o)),s=Math.min(n,Math.max(t,s))}return s}function Vi(e,t,n,a){return Math.round(ds(e,t,n,a)*1e3)}function Xo(e,t,n,a,s){return qd(Id(e,t,n,Number(a)/1e3),t,n,s)}function Lm(e,t,n=!1){let a=Number(e)||0,s=n?1:1e3/100,o=null;return t==="ArrowRight"||t==="ArrowUp"?o=a+s:t==="ArrowLeft"||t==="ArrowDown"?o=a-s:t==="PageUp"?o=a+1e3/10:t==="PageDown"?o=a-1e3/10:t==="Home"?o=0:t==="End"&&(o=1e3),o===null?null:Math.min(1e3,Math.max(0,Math.round(o)))}function _d(e,t,n,a,s,o=!1,i){let l=Vi(e,t,n,a),c=Lm(l,s,o);if(c===null)return null;let d=Xo(e,t,n,c,i),u=Math.sign(c-l),h=qd(Number(a),t,n,i);for(;u!==0&&d===h&&c>0&&c<1e3;)c+=u,d=Xo(e,t,n,c,i);return d}function Tm(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function Sl(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function Cm(e,t,n,a=n/6){let s=e.some(u=>u===null),o=Math.max(0,n-(s?a:0)),i=e.reduce((u,h,p)=>h===null?u:u+Sl(t[p]),0),l=i>0?o/i:0,c=e.map(u=>u===null?0:Math.min(o,Sl(u)*l));if(s){let u=c.reduce((p,f)=>p+f,0),h=e.indexOf(null);c[h]=Math.max(a,n-u)}let d=[0];for(let u of c)d.push(Math.round((d[d.length-1]+u)*100)/100);return s&&(d[d.length-1]=n),d}function Nm(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,s=Math.max(1,Math.floor(t*a)),o=Math.max(1,Math.floor(n*a));(e.width!==s||e.height!==o)&&(e.width=s,e.height=o);let i=e.getContext("2d");return i?.setTransform(a,0,0,a,0,0),{ctx:i,w:t,h:n}}function bt(e){return Math.max(0,Math.min(1,e))}function Hd(e,t){let{ctx:n,w:a,h:s}=Nm(e);if(!n)return;n.clearRect(0,0,a,s);let o=um(e);if(t.paint==="swatch"){let c=de(e,"accent"),d=de(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,a/2,s),n.fillStyle=d,n.fillRect(a/2,0,a/2,s);return}if(t.paint==="filter"&&typeof t.hz=="number"){zm(n,a,s,t,e,o);return}if(t.paint==="filter"){let c=t.mode??"lp",d=de(e,Fd(c)),u=de(e,"divider"),h=bt(t.cutoff??.5),p=.08+(1-bt(t.resonance??.2))*.22;n.strokeStyle=u,n.beginPath(),n.moveTo(0,s*.72),n.lineTo(a,s*.72),n.stroke(),n.beginPath();for(let f=0;f<=a;f++){let g=f/Math.max(1,a),w=0;c==="lp"?w=g<h?1:Math.max(0,1-(g-h)/p):c==="hp"?w=g>h?1:Math.max(0,1-(h-g)/p):w=Math.max(0,1-Math.abs(g-h)/p);let m=s*.78-w*s*.62;f===0?n.moveTo(f,m):n.lineTo(f,m)}n.strokeStyle=d,n.stroke(),n.fillStyle=de(e,"text-sub"),n.font=o,n.fillText(c.toUpperCase(),0,s),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=de(e,"accent");let c=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[u,h,p]=Cm([c,d],t.max??[1,4],a),f=2,g=s-1;n.beginPath(),n.moveTo(u,g),n.lineTo(h,f);let w=Math.max(1,Math.ceil(p-h));for(let m=1;m<=w;m++){let b=m/w;n.lineTo(h+(p-h)*b,g-(g-f)*Math.exp(-4.6*b)*(1-b*.01))}n.lineTo(p,g),n.lineTo(a,g),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[d,u]=Array.isArray(t.region)?t.region:[0,1],h=de(e,"accent"),p=de(e,"text-sub"),f=s/2;n.fillStyle=de(e,"accent-soft"),n.fillRect(bt(d)*a,0,(bt(u)-bt(d))*a,s),n.strokeStyle=de(e,"divider"),n.beginPath(),n.moveTo(0,f),n.lineTo(a,f),n.stroke();let g=Math.floor(c.length/2);for(let w=0;w<g;w++){let m=(w+.5)/g*a,b=Math.max(-1,Math.min(1,c[w*2]??0)),v=Math.max(-1,Math.min(1,c[w*2+1]??0)),y=(w+.5)/g;n.strokeStyle=y>=d&&y<=u?h:p,n.beginPath(),n.moveTo(m,f-v*(f-1)),n.lineTo(m,f-b*(f-1)+.5),n.stroke()}n.strokeStyle=h;for(let w of[d,u,...Array.isArray(t.markers)?t.markers:[]]){let m=Math.round(bt(w)*(a-1))+.5;n.beginPath(),n.moveTo(m,0),n.lineTo(m,s),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=de(e,"text"),n.fillRect(Math.round(bt(t.position)*(a-1)),0,1,s)),g||(n.fillStyle=p,n.font=o,n.fillText(t.empty??"Empty",0,f+4)),e.dataset.ncAccent=h;return}if(t.paint==="meter"){let c=bt(t.level??0);n.fillStyle=de(e,"divider"),n.fillRect(0,s*.4,a,s*.2),n.fillStyle=de(e,"accent"),n.fillRect(0,s*.4,a*c,s*.2),e.dataset.ncAccent=n.fillStyle;return}let i=Math.max(1,t.steps??16),l=((t.step??0)%i+i)%i;n.fillStyle=de(e,"rhythm.step-cell-off"),n.fillRect(0,s*.45,a,s*.1),n.fillStyle=de(e,"rhythm.playhead"),n.fillRect(l/i*a,s*.3,Math.max(1,a/i),s*.4),e.dataset.ncAccent=de(e,"accent")}var na=20,Go=2e4,po=24,El=-60;function Fm(e,t,n,a,s=48e3){let o=2*Math.PI*Math.min(t,s*.49)/s,i=Math.cos(o),l=Math.sin(o)/(2*n),c,d,u;e==="hp"?[c,d,u]=[(1+i)/2,-(1+i),(1+i)/2]:e==="bp"?[c,d,u]=[l,0,-l]:[c,d,u]=[(1-i)/2,1-i,(1-i)/2];let h=1+l,p=-2*i,f=1-l,g=2*Math.PI*a/s,w=(y,x,S)=>y+x*Math.cos(g)+S*Math.cos(2*g),m=(y,x)=>-(y*Math.sin(g)+x*Math.sin(2*g)),b=Math.hypot(w(c,d,u),m(d,u)),v=Math.hypot(w(h,p,f),m(p,f));return v>0?b/v:0}function Pm(e,t){return Math.log(Math.max(na,Math.min(Go,e))/na)/Math.log(Go/na)*t}function Al(e,t,n){let a=Math.max(El,Math.min(po,e));return t+(po-a)/(po-El)*(n-t)}function zm(e,t,n,a,s,o){let i=a.mode??"lp",l=de(s,Fd(i)),c=de(s,"divider"),d=de(s,"text-sub"),u=Number.parseFloat(String(o).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),h=1,p=Math.max(h+4,n-u-3),f=a.q??Math.SQRT1_2,g=Math.round(Al(0,h,p))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,g),e.lineTo(t,g),e.stroke(),e.beginPath();for(let w=0;w<=t;w++){let m=na*(Go/na)**(w/Math.max(1,t)),b=a.open?1:Fm(i,a.hz,f,m,a.sampleRate),v=Al(20*Math.log10(Math.max(1e-5,b)),h,p);w===0?e.moveTo(w,v):e.lineTo(w,v)}if(e.strokeStyle=l,e.stroke(),!a.open){let w=Math.round(Pm(a.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(w,h),e.lineTo(w,p),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=o,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",s.dataset.ncAccent=l,s.dataset.ncFilterHz=String(Math.round(a.hz))}function Qe(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let s=n.defaultView.getComputedStyle(a).color;return a.remove(),s}function Om(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var Xt=20,Sa=2e4,Qi=Math.log(Sa/Xt),Vo=32,Dm=250,Bm=-100,Rm=1200,Im=4.5,Ml=-6,Rt=-96,qm=48,Ll=[100,1e3,1e4],_m=[6,12];function gn(e,t){return Math.log(Math.max(Xt,Math.min(Sa,e))/Xt)/Qi*t}function Xa(e,t){return Xt*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Qi)}function Mt(e,t,n,a){let s=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*s}function Qo(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var jd=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Hm(e,t,n,a){let s=n?3:1,o=c=>({db:Math.max(-a,Math.min(a,e.db+c*s))}),i=c=>({hz:Math.max(e.minHz??Xt,Math.min(e.maxHz??Sa,e.hz*2**(c*s/6)))}),l=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*s)))});switch(t){case"ArrowUp":return o(1);case"ArrowDown":return o(-1);case"ArrowRight":return e.moveHz?i(1):o(1);case"ArrowLeft":return e.moveHz?i(-1):o(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Ji(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function jm(e,t,n,a,s,o,i,l,c){let d=c?.25:1,u={},h=Math.max(1,o/2-l);if(u.db=Math.max(-i,Math.min(i,t.db-a*d/h*i/Ji(e))),e.moveHz){let p=t.hz*Math.exp(n*d/Math.max(1,s)*Qi);u.hz=Math.max(e.minHz??Xt,Math.min(e.maxHz??Sa,p))}return u}function Wm(e,t,n,a,s){let o=Math.max(0,n.left)+1,i=Math.min(n.right,s)-1,l=Math.min(t.width*3+a*2,i-o),c=Math.max(o,Math.min(e.left,i-l));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var me=new WeakMap;function Ym(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let s=document.createElement("canvas");s.className="nc-eq-spectrum",s.setAttribute("aria-hidden","true");let o=document.createElement("canvas");o.className="nc-eq-curve",o.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-eq-tip",i.setAttribute("aria-hidden","true"),i.hidden=!0,a.append(s,o);for(let c of e.bands)a.append(Um(n,c,t));a.append(i),a.addEventListener("click",c=>{if(!Gd(n)||c.button>0)return;let d=Xd(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),me.set(n,{control:e,cache:null,spec:null,active:null}),Yd(n,e),n}function Wd(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function Um(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let s=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},o=()=>s()?.bands.find(d=>d.id===t.id)??null,i=null;a.addEventListener("pointerdown",d=>{if(d.button!==0)return;let u=o();u&&(d.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(d.pointerId),i={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:u.hz,db:u.db}},a.dataset.drag="true",yt(e,t.id))}),a.addEventListener("pointermove",d=>{if(!i||d.pointerId!==i.id)return;let u=s(),h=o(),p=me.get(e);if(!u||!h||!p?.box)return;let{w:f,h:g,pad:w}=p.box;u.onBand(h.id,jm(h,i.start,d.clientX-i.x,d.clientY-i.y,f,g,u.range??18,w,d.shiftKey))});let l=d=>{!i||d.pointerId!==i.id||(i=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&yt(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",d=>{d.preventDefault(),s()?.onReset?.(t.id)}),a.addEventListener("keydown",d=>{let u=s(),h=o();if(!u||!h)return;let p=Hm(h,d.key,d.shiftKey,u.range??18);p&&(d.preventDefault(),p==="reset"?u.onReset?.(h.id):u.onBand(h.id,p),yt(e,h.id))});let c=null;return a.addEventListener("wheel",d=>{let u=s(),h=o();if(!u||!h?.moveQ)return;d.preventDefault();let p=d.timeStamp;(!c||p-c.t>400)&&(c={q:h.q,t:p});let f=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(h.minQ??.1,Math.min(h.maxQ??20,c.q*2**(-f/240))),c.t=p,u.onBand(h.id,{q:c.q}),yt(e,h.id)},{passive:!1}),a.addEventListener("pointerenter",()=>yt(e,t.id)),a.addEventListener("focus",()=>yt(e,t.id)),a.addEventListener("pointerleave",()=>{!i&&e.ownerDocument.activeElement!==a&&yt(e,null)}),a.addEventListener("blur",()=>{i||yt(e,null)}),a}function yt(e,t){let n=me.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?Sn(e):Zi(e)}function Zi(e){let t=me.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(g=>g.id===t.active):null;for(let g of e.querySelectorAll(".nc-eq-node"))g instanceof HTMLElement&&(a&&g.dataset.band===a.id?g.dataset.active="true":delete g.dataset.active);if(!a||!t.box){n.hidden=!0;return}let s=[a.label,jd(a.db)];a.kind==="peak"?s.push(Qo(a.hz),`Q ${a.q.toFixed(1)}`):s.push(`${a.kind==="lowshelf"?"below":"above"} ${Qo(a.hz)}`),n.textContent=s.join(" · "),n.dataset.tone=String(Km(t.control,a)),n.hidden=!1;let{w:o,h:i,pad:l}=t.box,c=gn(a.hz,o),d=Mt(a.db*Ji(a),i,t.control.range??18,l),u=n.offsetWidth,h=n.offsetHeight,p=Math.max(0,Math.min(o-u,c-u/2)),f=d-h-l*1.5>=0?d-h-l*1.5:Math.min(i-h,d+l*1.5);n.style.left=`${Math.round(p)}px`,n.style.top=`${Math.round(f)}px`}function Km(e,t){return e.bands.indexOf(t)%3+1}function Yd(e,t){let n=me.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",er(e);let a=t.range??18;t.bands.forEach((s,o)=>{let i=Wd(e,s.id);i instanceof HTMLElement&&(i.dataset.tone=String(o%3+1),i.dataset.kind=s.kind,i.setAttribute("aria-label",`${s.label} band`),i.setAttribute("aria-valuemin",String(-a)),i.setAttribute("aria-valuemax",String(a)),i.setAttribute("aria-valuenow",String(s.db)),i.setAttribute("aria-valuetext",s.valueText??`${jd(s.db)}, ${Qo(s.hz)}`),i.setAttribute("aria-keyshortcuts",s.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),s.help?i.setAttribute("data-nc-help",s.help):i.removeAttribute("data-nc-help"))}),Sn(e),Zm(e)}function Ud(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,s=Math.max(1,Math.round(t*a)),o=Math.max(1,Math.round(n*a));(e.width!==s||e.height!==o)&&(e.width=s,e.height=o);let i=e.getContext("2d");return i?.setTransform(a,0,0,a,0,0),{ctx:i,w:t,h:n}}function Kd(e){return{curve:Qe(e,"eq-curve"),fill:Qe(e,"eq-fill"),quiet:Qe(e,"text-sub"),grid:Qe(e,"eq-grid"),zero:Qe(e,"divider"),label:Qe(e,"text-sub"),spectrum:Qe(e,"eq-spectrum"),bands:[Qe(e,"eq-band-1"),Qe(e,"eq-band-2"),Qe(e,"eq-band-3")]}}function Xm(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Sn(e){me.has(e)&&er(e);let t=me.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:s,w:o,h:i}=Ud(n);if(!s)return;let l=Math.max(8,Math.round(i*.06)),c=a.range??18;t.box={w:o,h:i,pad:l},t.colours=Kd(e);let d=t.colours,u=Xm(a,o);if(!t.cache||t.cache.key!==u){let x=Math.max(64,Math.ceil(o)+1),S=new Float64Array(x);for(let $=0;$<x;$++)S[$]=Xa($/(x-1)*o,o);let k=null;try{k=typeof a.response=="function"?a.response(S):null}catch{k=null}t.cache={key:u,freqs:S,total:k?.total??new Float64Array(x),bands:k?.bands??[]}}s.clearRect(0,0,o,i);let h=Om(e),p=a.on!==!1;Gm(s,o,i,c,l,d,h);let{freqs:f,total:g,bands:w}=t.cache,m=Array.from(f,x=>gn(x,o)),b=Mt(0,i,c,l);w.forEach((x,S)=>{if(!x||!x.some(E=>Math.abs(E)>.05))return;let k=p?d.bands[S%3]:d.quiet,$=Array.from(x,E=>Mt(E,i,c,l));s.save(),t.active&&a.bands[S]?.id===t.active&&(s.globalAlpha=.14,s.fillStyle=k,Tl(s,m,$,b)),s.globalAlpha=p?.75:.4,s.strokeStyle=k,s.lineWidth=.75,ho(s,m,$),s.restore()});let v=Array.from(g,x=>Mt(x,i,c,l)),y=p?d.curve:d.quiet;s.save(),s.fillStyle=p?d.fill:d.quiet,s.globalAlpha=p?.2:.08,Tl(s,m,v,b),s.restore(),s.save(),s.strokeStyle=p?d.fill:y,s.lineJoin="round",s.lineCap="round",p&&(s.globalAlpha=.16,s.lineWidth=4,ho(s,m,v)),s.globalAlpha=1,s.strokeStyle=y,s.lineWidth=1.25,ho(s,m,v),s.restore(),Vm(e),Zi(e)}function Gm(e,t,n,a,s,o,i){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let u=c*d;if(u<Xt||u>Sa)continue;let h=Math.round(gn(u,t))+.5;e.globalAlpha=Ll.includes(u)?.9:.35,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(h,0),e.lineTo(h,n),e.stroke()}for(let c of _m)if(!(c>a))for(let d of[1,-1]){let u=Math.round(Mt(c*d,n,a,s))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(0,u),e.lineTo(t,u),e.stroke()}e.globalAlpha=1,e.strokeStyle=o.zero;let l=Math.round(Mt(0,n,a,s))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=i,e.fillStyle=o.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of Ll){let d=c>=1e3?`${c/1e3}k`:String(c),u=e.measureText(d).width,h=gn(c,t)+3;e.fillText(d,h+u+2>t?gn(c,t)-u-3:h,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>a)continue;let d=Mt(c,n,a,s);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(d)-1)}e.restore()}function us(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let s=(t[a]+t[a+1])/2,o=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],s,o)}e.lineTo(t[t.length-1],n[n.length-1])}function ho(e,t,n){e.beginPath(),us(e,t,n),e.stroke()}function Tl(e,t,n,a){e.beginPath(),us(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function Xd(e){return e.closest("[data-nc-maxable]")}function Gd(e){let t=Xd(e);return!!t&&!t.hasAttribute("data-nc-max")}function er(e){let t=Gd(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=me.get(e);n?.active&&(n.active=null,Zi(e))}return t}function Vm(e){er(e);let t=me.get(e);if(!t?.box)return;let{w:n,h:a,pad:s}=t.box,o=t.control.range??18;for(let i of t.control.bands){let l=Wd(e,i.id);l instanceof HTMLElement&&(l.style.left=`${gn(i.hz,n).toFixed(1)}px`,l.style.top=`${Mt(i.db*Ji(i),a,o,s).toFixed(1)}px`)}}function Qm(e,t,n,a){let s=a/2/n,o=new Float32Array(e),i=new Float32Array(e),l=new Float32Array(e);for(let c=0;c<e;c++){let d=(c-.5)/(e-1)*t,u=(c+.5)/(e-1)*t,h=Xa(d,t),p=Xa(u,t),f=Xa(c/(e-1)*t,t);o[c]=Math.min(n-1,h/s),i[c]=Math.min(n-1,p/s),l[c]=Im*Math.log2(f/1e3)}return{lo:o,hi:i,tilt:l}}function Jm(e,t,n){let a=Math.floor(t),s=Math.ceil(n);if(s-a<=1){let i=t-a,l=e[a]??-1/0,c=e[Math.min(e.length-1,a+1)]??l;return l+(c-l)*i}let o=-1/0;for(let i=a;i<=s&&i<e.length;i++)e[i]>o&&(o=e[i]);return o}function Zm(e){let t=me.get(e);if(t){if(!t.control.spectrum){Qd(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let s=me.get(e)?.spec;s&&(s.visible=a.some(o=>o.isIntersecting),Jo(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Jo(e)}}function Jo(e){let t=me.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){Vd(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Zo(e),n.onVis||(n.onVis=()=>Jo(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&ei(e,!1)}function Zo(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function ei(e,t){let n=me.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,fo(e,Zo(e))),Dm):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(s=>(n.raf=0,fo(e,s))):n.timer=a.setTimeout(()=>(n.timer=0,fo(e,Zo(e))),Vo))}function Vd(e){let t=me.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function Qd(e){let t=me.get(e)?.spec;if(!t)return;Vd(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=me.get(e);n&&(n.spec=null)}function fo(e,t){let n=me.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){Qd(e);return}if(!a.analyser)return;if(t-a.last<Vo-4&&!a.idle){ei(e,!1);return}let s=a.last?Math.min(.25,(t-a.last)/1e3):Vo/1e3;a.last=t;let o=e.querySelector(".nc-eq-spectrum");if(!(o instanceof HTMLCanvasElement))return;let{ctx:i,w:l,h:c}=Ud(o);if(!i)return;let d=Math.max(16,Math.round(l/2)),u=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==d||a.map.w!==l||a.map.sr!==u)&&(a.map={cols:d,w:l,sr:u,...Qm(d,l,a.buf.length,u)},a.disp=new Float32Array(d).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let h=-1/0,p=qm*s,{lo:f,hi:g,tilt:w}=a.map;for(let b=0;b<d;b++){let v=Jm(a.buf,f[b],g[b]);v>h&&(h=v);let y=v+w[b],x=a.disp[b]-p;a.disp[b]=y>x?y:x}h>Bm&&(a.loud=t);let m=t-a.loud>Rm;i.clearRect(0,0,l,c),(!m||a.disp.some(b=>b>Rt))&&eg(i,l,c,a.disp,n.colours??Kd(e)),a.idle=m&&!a.disp.some(b=>b>Rt),ei(e,a.idle)}function eg(e,t,n,a,s){let o=a.length,i=new Array(o),l=new Array(o),c=d=>{let u=a[Math.max(0,Math.min(o-1,d))];return Number.isFinite(u)?u:Rt};for(let d=0;d<o;d++){let u=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,h=(Math.max(Rt,Math.min(Ml,Number.isFinite(u)?u:Rt))-Rt)/(Ml-Rt);i[d]=d/(o-1)*t,l[d]=n-h*n}e.save(),e.fillStyle=s.spectrum,e.globalAlpha=.13,e.beginPath(),us(e,i,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=s.spectrum,e.lineWidth=1,e.beginPath(),us(e,i,l),e.stroke(),e.restore()}var qe=new WeakMap,tg=450,ng=6,ag=33,mo=24,sg="http://www.w3.org/2000/svg";function og(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function ig(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function rg(e,t,n,a,s){let o=e.slice();if(t===a)return o[a]=s,o;let i=t<a?1:-1;for(let l=t;l!==a+i;l+=i){let c=(l-t)/(a-t);o[l]=Math.round((n+(s-n)*c)*100)/100}return o}function lg(e,t){let n=e.steps[t],a=(e.shapes??[]).find(o=>o.value===n.shape),s=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${a?`, ${a.label}`:""}${s}`}function It(e,t){let n=document.createElementNS(sg,e);for(let[a,s]of Object.entries(t))n.setAttribute(a,String(s));return n}function Jd(e){let t=It("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(It("path",{d:e})),t}function cg(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-lsteps-plot",a.tabIndex=0,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical"),a.setAttribute("aria-valuemin","0"),a.setAttribute("aria-valuemax","100"),a.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let s=document.createElement("div");s.className="nc-lsteps-axis",s.setAttribute("aria-hidden","true");let o=document.createElement("div");o.className="nc-lsteps-shapes",o.setAttribute("role","tablist");let i=document.createElement("div");i.className="nc-lsteps-pick",i.setAttribute("role","menu"),i.hidden=!0,n.append(a,s,o,i);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let c={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return qe.set(n,c),ug(n,a),pg(n,i),Zd(n,e),n}function He(e){let t=qe.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function dg(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function go(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),a=dg(e);return{i:ig(t.clientX,a),level:og(t.clientY-n.top,n.height)}}function ug(e,t){let n=qe.get(e),a=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",o=>{let i=He(e);if(!i||o.button>0||!i.steps.length)return;o.preventDefault(),ps(e),t.setPointerCapture?.(o.pointerId);let l=go(t,o),c=i.steps.map(d=>d.level);n.drag={id:o.pointerId,x:o.clientX,y:o.clientY,start:c,levels:c,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,Cl(e,l.i,l.level,l.i,l.level,!1),a(),n.timer=setTimeout(()=>{n.timer=0;let d=n.drag;!d||d.moved||(d.long=!0,He(e)?.onLevels(d.start.slice(),!0),bo(e,d.i))},tg)}),t.addEventListener("pointermove",o=>{let i=n.drag;if(!i||i.id!==o.pointerId||i.long||!i.moved&&Math.hypot(o.clientX-i.x,o.clientY-i.y)<ng)return;i.moved=!0,a();let l=go(t,o);Cl(e,i.i,i.level,l.i,l.level,!1),i.i=l.i,i.level=l.level});let s=o=>{let i=n.drag;!i||i.id!==o.pointerId||(a(),n.drag=null,t.releasePointerCapture?.(o.pointerId),i.long||He(e)?.onLevels(i.levels.slice(),!0),ti(e,-1))};t.addEventListener("pointerup",s),t.addEventListener("pointercancel",o=>{let i=n.drag;!i||i.id!==o.pointerId||(a(),n.drag=null,i.long||He(e)?.onLevels(i.start.slice(),!0),ti(e,-1))}),t.addEventListener("contextmenu",o=>{He(e)?.onShape&&(o.preventDefault(),bo(e,go(t,o).i))}),t.addEventListener("keydown",o=>{let i=He(e);if(!i||!i.steps.length)return;let l=i.steps.length,c=Math.min(n.focus,l-1),d=i.steps[c].level,u=h=>{let p=i.steps.map(f=>f.level);p[c]=Math.round(Math.max(0,Math.min(1,h))*100)/100,i.onLevels(p,!0)};switch(o.key){case"ArrowLeft":n.focus=(c-1+l)%l;break;case"ArrowRight":n.focus=(c+1)%l;break;case"ArrowUp":u(d+(o.shiftKey?.01:.05));break;case"ArrowDown":u(d-(o.shiftKey?.01:.05));break;case"PageUp":u(d+.25);break;case"PageDown":u(d-.25);break;case"Home":u(1);break;case"End":u(0);break;case"Enter":case" ":if(!i.onShape)return;bo(e,c);break;default:return}o.preventDefault(),ni(e)}),t.addEventListener("focus",()=>ni(e)),t.addEventListener("blur",()=>{for(let o of t.querySelectorAll("[data-focus]"))o.removeAttribute("data-focus")})}function Cl(e,t,n,a,s,o){let i=qe.get(e).drag;i&&(i.levels=rg(i.levels,t,n,a,s),ti(e,a,i.levels[a]),He(e)?.onLevels(i.levels.slice(),o))}function ti(e,t,n){for(let a of e.querySelectorAll(".nc-lsteps-step"))Number(a.dataset.i)===t?(a.dataset.dragging="true",a.dataset.level=`${Math.round(n*100)}%`):a.removeAttribute("data-dragging")}function ni(e){let t=qe.get(e),n=e.querySelector(".nc-lsteps-plot"),a=He(e);if(!n||!a)return;for(let o of n.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===t.focus?o.dataset.focus="true":o.removeAttribute("data-focus");let s=Math.min(t.focus,a.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((a.steps[s]?.level??0)*100))),n.setAttribute("aria-valuetext",lg(a,s))}function pg(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),ps(e,!0);return}let a=[...t.querySelectorAll("button")],s=a.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),a[(s+1)%a.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),a[(s-1+a.length)%a.length]?.focus())}),qe.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&ps(e)}}function bo(e,t){let n=He(e),a=e.querySelector(".nc-lsteps-pick"),s=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!a||!s)return;let o=qe.get(e);o.focus=t,a.textContent="";let i=document.createElement("span");i.className="nc-lsteps-pick-head",i.textContent=`Step ${t+1}`,a.append(i);for(let f of n.shapes??[]){let g=document.createElement("button");g.type="button",g.setAttribute("role","menuitemradio"),g.setAttribute("aria-checked",n.steps[t]?.shape===f.value?"true":"false"),f.icon&&g.append(Jd(f.icon)),g.append(document.createTextNode(f.label)),g.addEventListener("click",()=>{He(e)?.onShape?.(t,f.value),ps(e,!0)}),a.append(g)}a.setAttribute("aria-label",`Shape of step ${t+1}`),a.hidden=!1,e.ownerDocument.addEventListener("pointerdown",o.outside,!0);let l=s.querySelector(`.nc-lsteps-step[data-i="${t}"]`),c=e.getBoundingClientRect(),d=l?.getBoundingClientRect(),u=a.getBoundingClientRect().width,h=d?d.left+d.width/2-c.left:0,p=Math.max(0,Math.min(c.width-u,h-u/2));a.style.setProperty("--nc-lsteps-pick-x",`${Math.round(p)}px`),a.querySelector('[aria-checked="true"]')?.focus?.()??a.querySelector("button")?.focus?.()}function ps(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",qe.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function hg(e,t){let n=qe.get(e),a=e.querySelector(".nc-lsteps-plot"),s=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,a.textContent="",s.textContent="";for(let o=0;o<t;o++){let i=document.createElement("div");i.className="nc-lsteps-step",i.dataset.i=String(o),o%4===0&&o>0&&(i.dataset.beat="true");let l=It("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(It("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),It("path",{class:"nc-lsteps-env",d:""}),It("path",{class:"nc-lsteps-top",d:""}),It("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),i.append(l),a.append(i);let c=document.createElement("span");o%4===0&&(c.textContent=String(o+1)),o%4===0&&o>0&&(c.dataset.beat="true"),s.append(c)}}}function Zd(e,t){let n=qe.get(e);if(!n)return;n.control=t;let a=t.steps.length;hg(e,a),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let s=e.querySelector(".nc-lsteps-plot");s.setAttribute("aria-label",t.label??"Steps");let o=Math.max(.5,Math.min(.75,t.swing??.5)),i=s.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((f,g)=>{let w=i[g];if(!w)return;let m=String((g%2?1-o:o)*2);w.style.setProperty("--nc-lsteps-grow",m),l[g]?.style.setProperty("--nc-lsteps-grow",m),t.played!==void 0&&g>=t.played?w.dataset.out="true":w.removeAttribute("data-out"),w.dataset.zero=f.level<=0?"true":"false";let b=Math.max(0,Math.min(1,f.level)),v=w.querySelector(".nc-lsteps-level");v.setAttribute("y",String(100-b*100)),v.setAttribute("height",String(b*100));let y=t.curve?t.curve(g,mo):null,x="M0 100",S="";for(let k=0;k<=mo;k++){let $=y?Math.max(0,Math.min(1,y[k]??b)):b,E=k/mo*100,M=100-$*100;x+=` L${E.toFixed(2)} ${M.toFixed(2)}`,S+=`${k?" L":"M"}${E.toFixed(2)} ${M.toFixed(2)}`}w.querySelector(".nc-lsteps-env").setAttribute("d",`${x} L100 100 Z`),w.querySelector(".nc-lsteps-top").setAttribute("d",S)});let c=e.querySelector(".nc-lsteps-shapes"),d=(t.shapes??[]).map(f=>`${f.value}:${f.label}`).join();if(d!==n.shapeKey){n.shapeKey=d,c.textContent="";for(let f of t.shapes??[]){let g=document.createElement("button");g.type="button",g.className="nc-lsteps-shape",g.setAttribute("role","tab"),g.dataset.shape=String(f.value),f.icon&&g.append(Jd(f.icon)),g.append(document.createTextNode(f.label)),g.addEventListener("click",()=>He(e)?.onShapeAll?.(f.value)),c.append(g)}}c.hidden=!(t.shapes?.length&&t.onShapeAll),c.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let u=t.played??a,h=t.steps[0]?.shape,p=t.steps.slice(0,u).every(f=>f.shape===h);for(let f of c.querySelectorAll(".nc-lsteps-shape")){let g=p&&f.dataset.shape===String(h);f.setAttribute("aria-selected",g?"true":"false"),f.tabIndex=g||!p&&f===c.firstElementChild?0:-1}n.focus>=a&&(n.focus=0),ni(e),n.last=-2,fg(e)}function fg(e){let t=qe.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&yo(e,null);return}let a=0,s=o=>{if(t.loop=0,!e.isConnected||!t.control.playhead){yo(e,null);return}o-a>=ag&&(a=o,yo(e,t.control.playhead())),t.loop=n.requestAnimationFrame(s)};t.loop=n.requestAnimationFrame(s)}function yo(e,t){let n=qe.get(e),a=t&&Number.isInteger(t.step)?t.step:-1,s=!!t?.locked;if(!(n.last===a&&n.lastLocked===s)){n.last=a,n.lastLocked=s;for(let o of e.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===a?(o.dataset.playhead="true",o.dataset.locked=s?"true":"false"):(o.removeAttribute("data-playhead"),o.removeAttribute("data-locked"));e.dataset.free=t&&!s?"true":"false"}}var mg=.8912509381337456,ai=32,gg=250,bg=1200,yg=.2,eu=1.5;function vg(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function wg(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let s=e.createElement("span");s.className="nc-fx-level-fill",a.append(s),t.append(a)}return t}var hs=new WeakMap,Nl=new WeakMap;function Fl(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let s=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),o=Number.parseFloat(s);return Number.isFinite(o)?s.endsWith("ms")?o/1e3:o:n}function xg(e){let t=Nl.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(s=>{for(let o of s){let i=hs.get(o.target);i&&(i.seen.set(o.target,o.isIntersecting),aa(i))}fn(t)})),e.addEventListener("visibilitychange",()=>{for(let s of t.recs)aa(s);fn(t)}),Nl.set(e,t),t}var tu=e=>e.els.some(t=>t.isConnected);function kg(e){if(!e.loop.io)return tu(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function aa(e){let t=!e.dead&&!!e.source&&kg(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=tr(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),ii(e))}function tr(e){return e.doc.defaultView?.performance?.now()??Date.now()}function fn(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){nu(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=tr(e)),!e.raf&&!e.timer&&si(e,!1)}function si(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>Pl(e,tr(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),gg):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(s=>(e.raf=0,Pl(e,s))):e.timer=n.setTimeout(()=>(e.timer=0,a()),ai)}function nu(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Pl(e,t){if(t-e.last<ai-4&&!e.idle&&e.last){si(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):ai/1e3;e.last=t,e.frames++;let a=!1,s=!1;for(let o of e.recs){if(!tu(o)){(o.placed||e.frames-o.born>90)&&au(o);continue}o.placed=!0,o.open&&(s=!0,$g(o,n,t)&&(e.loud=t),(o.disp[0]>0||o.disp[1]>0)&&(a=!0))}if(!s){nu(e);return}e.idle=t-e.loud>bg&&!a,si(e,e.idle)}function $g(e,t,n){if(e.fall<0){let p=e.els[0];e.fall=Fl(p,"motion-meter-fall",yg),e.hold=Fl(p,"motion-meter-hold",eu)}let a=null;try{a=e.source.read()}catch{a=null}let s=typeof a=="number",o=s?a:Number(a?.in)||0,i=!s&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=i&&Number(a.out)||0,c=i?"2":"1";if(e.rows!==c){e.rows=c;for(let p of e.els)p.dataset.ncRows=c}let d=e.fall>0?Math.exp(-t/e.fall):0,u=[o,l],h=!1;for(let p=0;p<2;p++){let f=vg(u[p]);f>0&&(h=!0),e.disp[p]=f>=e.disp[p]?f:f+(e.disp[p]-f)*d,e.disp[p]<.001&&(e.disp[p]=0),u[p]>=mg&&(e.clipAt[p]=n);let g=e.clipAt[p]>0&&n-e.clipAt[p]<e.hold*1e3;oi(e,p,e.disp[p],g)}return h}function oi(e,t,n,a){let s=Math.round(n*1e3)/1e3,o=a?"true":"false";if(!(e.shown[t]===s&&e.clipShown[t]===o)){e.shown[t]=s,e.clipShown[t]=o;for(let i of e.els){let l=i.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${s})`,l.dataset.clip=o)}}}function ii(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,oi(e,0,0,!1),oi(e,1,0,!1)}function au(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),hs.get(t)===e&&hs.delete(t)}function Sg(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,s=xg(a),o={els:n,source:t??null,loop:s,open:!1,dead:!1,seen:new Map,born:s.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:eu,rows:""};for(let i of n)hs.set(i,o),s.io?.observe(i);if(s.recs.add(o),ii(o),!s.io){let i=a.defaultView,l=()=>{aa(o),fn(s)};typeof i?.requestAnimationFrame=="function"?i.requestAnimationFrame(l):setTimeout(l,0)}return{set(i){let l=i??null;if(!o.dead){if(l===o.source){aa(o),fn(s);return}o.open&&(o.open=!1,o.source?.close?.(),ii(o)),o.source=l,aa(o),fn(s)}},destroy(){o.dead||au(o),fn(s)}}}var su={slop:8,longPressMs:500,pitchPx:16},Eg=class{constructor(e,t,n=su){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let s=this.hit(t,n);return s<0?!1:(this.phase="pending",this.pointer=e,this.pad=s,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let s=t-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(s,o)<this.config.slop)return;Math.abs(o)>=Math.abs(s)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let i=Math.trunc(-o/this.config.pitchPx);i!==this.degrees&&(this.degrees=i,this.emit({kind:"pitch",pad:this.pad,degrees:i,phase:"move"}))}else if(this.phase==="paint"){let i=this.hit(t,n);i>=0&&i!==this.lastPad&&(this.lastPad=i,this.emit({kind:"paint",pad:i,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Ag(e,t,n,a=su){let s=!1,o=0,i=(d,u)=>{let h=e.ownerDocument.elementFromPoint?.(d,u),p=[...e.querySelectorAll(t)],f=h?p.findIndex(m=>m===h||m.contains(h)):-1;if(f>=0)return f;let g=-1,w=Number.POSITIVE_INFINITY;return p.forEach((m,b)=>{if(m.hidden)return;let v=m.getBoundingClientRect();if(u<v.top||u>v.bottom)return;let y=Math.abs(d-(v.left+v.width/2));y<w&&y<=v.width&&(g=b,w=y)}),g},l=new Eg(i,d=>{(d.kind==="paint"||d.kind==="long")&&(s=!0),n(d)},a),c=()=>{o&&clearTimeout(o),o=0};return e.addEventListener("pointerdown",d=>{d.button>0||(s=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),o=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),e.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{s&&(s=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var ou="netcomposer.groups.v1";function nr(){try{return globalThis.localStorage??null}catch{return null}}function iu(e=nr(),t=ou){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[s,o]of Object.entries(n))typeof o=="boolean"&&a.set(s,o);return a}catch{return new Map}}function Mg(e,t,n,a=ou){let s=iu(e,a);s.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(s)))}catch{}}function Lg(e,t=nr()){return iu(t).get(e.id)??e.open===!0}function Tg(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let s=document.createElement("button");s.type="button",s.className="nc-group-toggle",s.id=`${e.id}-group-toggle`;let o=document.createElement("span");o.className="nc-group-title";let i=document.createElement("span");i.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),s.append(o,i,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",s.id),s.setAttribute("aria-controls",c.id);for(let d of e.controls)c.append(n(d,t));return s.addEventListener("click",()=>{let d=a.dataset.ncOpen!=="true";Mg(nr(),e.id,d),ri(a,d);let u=t(a);u?.type==="group"&&u.onToggle?.(d)}),a.append(s,c),ru(a,e),ri(a,Lg(e)),lu(a,e),a}function ri(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let s=n?.querySelector(".nc-group-mark");s&&(s.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function ru(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function lu(e,t){ru(e,t)&&ri(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),s=t.summary??"";a&&a.textContent!==s&&(a.textContent=s)}var za="application/x-nc-pad",zl="http://www.w3.org/2000/svg";function Cg(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],s=[];for(let o=0;o<n;o++){let i=Math.floor(o*t/n),l=Math.max(i+1,Math.floor((o+1)*t/n)),c=0,d=0;for(let h=i;h<l;h++)c=Math.min(c,e[2*h]??0),d=Math.max(d,e[2*h+1]??0);let u=n===1?50:o/(n-1)*100;a.push(`${u.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),s.push(`${u.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${a.join("L")}L${s.reverse().join("L")}Z`}function Ng(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((s,o)=>a.append(Fg(n,o,t))),n.append(a),n.addEventListener("keydown",s=>{s.key==="Escape"&&Ga(n)}),du(n,e),n}function Fg(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let s=document.createElement("span");s.className="nc-padgrid-pad-bar",s.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-padgrid-pad-name";let i=document.createElement("span");i.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(zl,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(zl,"path");return c.append(d),a.append(s,o,i,l,c),zg(e,a,t,n),o.addEventListener("dblclick",()=>{let u=n(e);u?.type==="padGrid"&&u.onRename&&a.dataset.empty!=="true"&&cu(e,a,t,n)}),a.addEventListener("dragstart",u=>{if(a.dataset.empty==="true"||!u.dataTransfer){u.preventDefault();return}u.dataTransfer.setData(za,String(t)),u.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",u=>{let h=u.dataTransfer?.types??[];!h.includes("Files")&&!h.includes(za)||(u.preventDefault(),u.stopPropagation(),u.dataTransfer&&(u.dataTransfer.dropEffect=h.includes(za)&&!u.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",u=>{delete a.dataset.drop;let h=n(e);if(h?.type!=="padGrid")return;let p=u.dataTransfer?.getData(za);if(p!==void 0&&p!==""){u.preventDefault(),u.stopPropagation();let g=Number(p);g!==t&&h.onMove?.(g,t,u.altKey);return}let f=u.dataTransfer?.files?.[0];f&&(u.preventDefault(),u.stopPropagation(),h.onFile?.(t,f))}),a}function Pg(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function zg(e,t,n,a){let s=0,o=!1,i=0,l=0,c=()=>{window.clearTimeout(s),s=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;o=!1,i=d.clientX,l=d.clientY,c();let u=a(e);u?.type==="padGrid"&&(u.onDown?.(n),!(u.onDown&&d.pointerType==="mouse")&&(s=window.setTimeout(()=>{s=0,o=Ol(e,t,n,a)},450)))}),t.addEventListener("pointermove",d=>{s&&Math.hypot(d.clientX-i,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,c);t.addEventListener("contextmenu",d=>{d.preventDefault(),c(),o=Ol(e,t,n,a)}),t.addEventListener("click",()=>{if(o){o=!1;return}Pg(e,n,a)})}function Ol(e,t,n,a){let s=a(e);if(s?.type!=="padGrid"||!s.menu)return!1;let o=s.menu(n);if(!o.length)return!1;Ga(e);let i=document.createElement("div");i.className="nc-slot-scrim",i.setAttribute("aria-hidden","true"),i.addEventListener("pointerdown",u=>{u.preventDefault(),u.stopPropagation(),Ga(e)}),i.addEventListener("click",u=>u.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let u of o){let h=document.createElement("button");h.type="button",h.className="nc-menu-btn",h.setAttribute("role","menuitem"),h.dataset.ncMenuItem=u.id,h.textContent=u.label,h.addEventListener("click",()=>{Ga(e);let p=a(e);p?.type==="padGrid"&&(u.id==="rename"&&p.onRename?cu(e,t,n,a):p.onMenu?.(n,u.id))}),l.append(h)}e.append(i,l);let c=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function cu(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let s=a(e);if(s?.type!=="padGrid")return;let o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=s.nameMax??24,o.value=s.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);let i=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-i.left}px`,o.style.top=`${l.top-i.top}px`,o.style.width=`${l.width}px`;let c=!1,d=u=>{if(c)return;c=!0;let h=o.value.trim();o.remove(),t.focus();let p=a(e);u&&h&&p?.type==="padGrid"&&p.onRename?.(n,h)};o.addEventListener("keydown",u=>{u.stopPropagation(),u.key==="Enter"?d(!0):u.key==="Escape"&&d(!1)}),o.addEventListener("blur",()=>d(!0));for(let u of["pointerdown","click","dblclick"])o.addEventListener(u,h=>h.stopPropagation());e.append(o),o.focus(),o.select()}function Ga(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function du(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,s)=>{let o=n[s];if(!(o instanceof HTMLButtonElement))return;let i=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),c=o.querySelector(".nc-padgrid-pad-wave path"),d=o.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=a.empty?"":a.badge??""),o.draggable=!a.empty,a.empty?(o.dataset.empty="true",i&&(i.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete o.dataset.empty,i&&(i.textContent=a.label),l&&(l.textContent=a.hint??""),c?.setAttribute("d",Cg(a.peaks))),!a.empty&&a.hint?o.dataset.hint="true":delete o.dataset.hint,a.lane?o.dataset.ncLane=String(a.lane):delete o.dataset.ncLane;let u=t.selected===s;u?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",u?"true":"false"),a.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",a.empty?`Pad ${s+1}, empty: load a sample`:`Pad ${s+1}, ${a.label}${a.hint?`, ${a.hint}`:""}${a.badgeLabel?`, ${a.badgeLabel}`:""}${u?", selected":""}`)})}function xe(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Bs(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let s=document.createElement("span");return s.className="nc-readout",s.dataset.ncReadout="",n.append(a,s),n}function Dl(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function ra(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Og=450,Bl=8;function nt(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Dg(e){let t=dm(e,"target-min");return t>0?t:44}function Bg(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=Dg(e),a=n/2,s=t.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<t.length;o++){let i=t[o],l=s[o];if(!(i instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){i.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,u=c-a,h=c+a,p=d-a,f=d+a;for(let g=0;g<t.length;g++){if(o===g)continue;let w=s[g];if(!w||w.width===0)continue;let m=w.left+w.width/2,b=w.top+w.height/2;Math.abs(b-d)<a*2&&(m>c?h=Math.min(h,(c+m)/2):m<c&&(u=Math.max(u,(c+m)/2))),Math.abs(m-c)<a*2&&(b>d?f=Math.min(f,(d+b)/2):b<d&&(p=Math.max(p,(d+b)/2)))}u=Math.min(u,l.left),h=Math.max(h,l.right),p=Math.min(p,l.top),f=Math.max(f,l.bottom),i.style.left=`${u-l.left}px`,i.style.top=`${p-l.top}px`,i.style.width=`${Math.max(0,h-u)}px`,i.style.height=`${Math.max(0,f-p)}px`,i.style.transform="none"}}function uu(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Rl(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Wt(e,t){switch(e.type){case"slider":return Rg(e,t);case"select":return qg(e,t);case"toggle":return _g(e,t);case"button":return Hg(e,t);case"readout":return jg(e);case"label":return Kg(e);case"note":return Il(e);case"knob":return Vg(e,t);case"choice":return Qg(e,t);case"slotRow":return Jg(e,t);case"stepGrid":return nb(e,t);case"canvas":return ib(e);case"fx":return mb(e,t);case"eqGraph":return Ym(e,t);case"levelSteps":return cg(e,t);case"group":return Tg(e,t,Wt);case"strip":return rb(e,t);case"stripAdd":return ub(e,t);case"padGrid":return Ng(e,t);case"moves":return Yg(e,t);default:return Il({id:"unknown",text:""})}}function Ke(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,fu(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(pu(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let s=e.querySelector("[data-nc-readout]");s&&(s.textContent=t.valueText??ra(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Dl(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")Dl(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&Lt(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Xg(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??ra(t.value))}else if(t.type==="choice")mu(e,t);else if(t.type==="slotRow")bu(e,t);else if(t.type==="stepGrid")ci(e,t);else if(t.type==="padGrid")du(e,t);else if(t.type==="moves")hu(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&Hd(n,t)}else if(t.type==="eqGraph")Yd(e,t);else if(t.type==="levelSteps")Zd(e,t);else if(t.type==="strip"){xu(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${bn(n.id)}"]`);a instanceof Element&&Ke(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")vu(e,t);else if(t.type==="group"){lu(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${bn(n.id)}"]`);a instanceof Element&&Ke(a,n)}}else if(t.type==="fx"){Cu(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${bn(n.id)}"]`);a instanceof Element&&Ke(a,n)}}}}function Rg(e,t){let n=Bs(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let s=Ds(e.taper,e.min,e.max);a.min=String(s?0:e.min),a.max=String(s?1e3:e.max),a.step=String(s?1:e.step),s&&(a.dataset.ncTaper=e.taper),a.value=String(pu(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let o=l=>s?Xo(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(o(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(o(l))}),s&&a.addEventListener("keydown",l=>{let c=t(a);if(c?.type!=="slider"||a.disabled)return;let d=c.taper??e.taper,u=_d(d,c.min,c.max,c.value,l.key,l.shiftKey,c.step);u!==null&&(l.preventDefault(),a.value=String(Vi(d,c.min,c.max,u)),c.onChange(u),c.onCommit?.(u))});let i=n.querySelector("[data-nc-readout]");return n.insertBefore(a,i),e.onTap&&n.insertBefore(Ig(e,a,t),i),n.append(xe()),Ke(n,e),n}function pu(e){return Ds(e.taper,e.min,e.max)?Vi(e.taper,e.min,e.max,e.value):e.value}function Ig(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(nt());let s=o=>{let i=n(t);i?.type==="slider"&&i.onTap?.(o)};return a.addEventListener("pointerdown",o=>{o.button===0&&s(o.timeStamp)}),a.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),s(o.timeStamp))}),a}function qg(e,t){let n=Bs(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let s=null;for(let o of e.options){let i=document.createElement("option");i.value=o.value,i.textContent=o.label,o.disabled&&(i.disabled=!0),o.group?s?.getAttribute("label")!==o.group&&(s=document.createElement("optgroup"),s.setAttribute("label",o.group),a.append(s)):s=null,(s??a).append(i)}return a.value=e.value,a.addEventListener("change",()=>{let o=t(a);o?.type==="select"&&o.onChange(a.value)}),n.append(a,xe()),n}function _g(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(xe()),Ke(n,e),n}function Hg(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let o=t(n);o?.type==="button"&&o.onPress()}),n.append(xe()),Ke(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let s=document.createElement("button");return s.type="button",s.className="nc-sparkle-btn",s.dataset.ncSparkle=e.id,s.setAttribute("aria-label","Surprise me"),s.title=e.sparkleTitle??"Surprise me",s.innerHTML=uu(),s.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&yu(o);let i=t(n);i?.type==="button"&&i.onSparkle?.()}),a.append(n,s),a}function jg(e){let t=Bs(e.id,e.label);return t.append(xe()),Ke(t,e),t}var Wg=450;function Yg(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let s=document.createElement("div");s.className="nc-moves-row",s.setAttribute("role","group"),s.setAttribute("aria-label",a.label),a.title&&(s.title=a.title);let o=document.createElement("span");o.className="nc-moves-label",o.setAttribute("aria-hidden","true"),o.textContent=a.label;let i=document.createElement("div");i.className="nc-moves-btns";for(let l of a.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${a.label} ${l.text}`),c.append(Ug(l.icon)),c.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),i.append(c)}s.append(o,i),n.append(s)}return hu(n,e),n}function hu(e,t){for(let n of t.groups)for(let a of n.moves){let s=e.querySelector(`[data-nc-move="${bn(a.id)}"]`);s instanceof HTMLButtonElement&&(s.disabled=a.disabled===!0)}}function Ug(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function Kg(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(xe()),t}function Il(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(xe()),t}function ql(e){if(typeof e.valueText=="string")return e.valueText;let t=ra(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function fu(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Xg(e,t){let n=ds(t.taper,t.min,t.max,t.value);fu(e,t.modulated===!0);let a=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(a)),t.bipolar){let s=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(ds(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(a,s))),e.style.setProperty("--knob-to",String(Math.max(a,s)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",ql(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${ql(t)}`}function Gg(e,t){if(Ds(e.taper,e.min,e.max))return _d(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,s=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+s:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-s:null}function Vg(e,t){let n=Bs(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let s=document.createElement("i");s.className="nc-knob-mark",a.append(s);let o=0,i=0;a.addEventListener("pointerdown",d=>{o=d.clientY;let u=t(a);i=u&&"value"in u?Number(u.value):0,a.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",d=>{if(a.hasPointerCapture&&!a.hasPointerCapture(d.pointerId))return;let u=t(a);if(u?.type!=="knob")return;if(Ds(u.taper,u.min,u.max)){let f=ds(u.taper,u.min,u.max,i)-(d.clientY-o)/120;u.onChange(Id(u.taper,u.min,u.max,f));return}let h=u.max-u.min||1,p=Math.min(u.max,Math.max(u.min,i-(d.clientY-o)*h/120));u.onChange(p)}),a.addEventListener("dblclick",()=>{let d=t(a);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),a.addEventListener("keydown",d=>{let u=t(a);if(u?.type!=="knob")return;let h=Gg(u,d);h!==null&&(d.preventDefault(),u.onChange(Math.min(u.max,Math.max(u.min,h))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(a,c),n.append(xe()),Ke(n,e),n}function Qg(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let a=document.createElement("span");a.className="nc-label nc-choice-caption",a.setAttribute("aria-hidden","true"),a.textContent=e.caption,n.dataset.ncCaption="",n.append(a)}for(let a of e.options){let s=document.createElement("button");s.type="button",s.className="nc-choice",s.dataset.ncChoice=a.value,s.setAttribute("role","tab"),s.textContent=a.label,s.addEventListener("click",()=>{let o=t(n);o?.type==="choice"&&o.onChange(a.value)}),s.addEventListener("keydown",o=>{let i=[...n.querySelectorAll("[data-nc-choice]")],l=i.indexOf(s),c=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")c=(l+1)%i.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")c=(l-1+i.length)%i.length;else if(o.key==="Home")c=0;else if(o.key==="End")c=i.length-1;else return;let d=i[c];d instanceof HTMLButtonElement&&(o.preventDefault(),d.focus(),d.click())}),n.append(s)}return n.append(xe()),mu(n,e),n}function mu(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function Jg(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let u=0;u<e.slots.length;u++){let h=e.slots[u],p=document.createElement("span");p.className="nc-snap-wrap";let f=document.createElement("button");f.type="button",f.className="nc-snap",f.dataset.ncSlot=String(u),f.textContent=h.label,f.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",p.append(f,nt()),Zg(p,f,n,u,t),a.append(p)}let s=e.onSparkle?document.createElement("button"):null;s&&(s.type="button",s.className="nc-sparkle",s.setAttribute("aria-label","Surprise me"),s.innerHTML=uu(),s.append(nt()),s.addEventListener("click",()=>{yu(n);let u=t(n);u?.type==="slotRow"&&u.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let i=document.createElement("span");i.className="nc-label",i.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let u=t(n);u?.type==="slotRow"&&u.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",o.append(i,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(a,...s?[s]:[]),n.append(d,o,xe()),gu(n,t),bu(n,e),n}function _l(e,t,n,a){let s=n(e);if(s?.type!=="slotRow")return;Vn(e);let o=a.shiftKey?"store":a.altKey?"clear":"recall";s.onSlot(t,o)}function Zg(e,t,n,a,s){let o=0,i=0,l=0,c=!1,d=!1,u=!1,h=!1,p=()=>{window.clearTimeout(o),o=0},f=b=>{let v=b.clientX-i,y=b.clientY-l;v*v+y*y>Bl*Bl&&(c=!0,p())},g=()=>{h&&(h=!1,window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",m))},w=b=>{let v=o!==0&&!c&&!d;p(),g(),v&&(u=!0,_l(n,a,s,b))},m=()=>{c=!0,p(),g()};e.addEventListener("pointerdown",b=>{b.button===0&&(g(),d=!1,c=!1,u=!1,i=b.clientX,l=b.clientY,p(),o=window.setTimeout(()=>{o=0,!c&&(d=!0,eb(n,t,a,s))},Og),h=!0,window.addEventListener("pointermove",f),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",m))}),e.addEventListener("contextmenu",b=>b.preventDefault()),e.addEventListener("click",b=>{if(u||d||c){u=!1,d=!1,c=!1;return}_l(n,a,s,b)})}function gu(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=Hl("Save","store"),s=Hl("Clear","clear");n.append(a,s);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation(),Vn(e)}),o.addEventListener("click",i=>i.stopPropagation()),e.append(o,n),n.addEventListener("click",i=>{let l=i.target;if(!(l instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),Vn(e)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),Vn(e))}),e.addEventListener("keydown",i=>{i.key==="Escape"&&Vn(e)})}function Hl(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function eb(e,t,n,a){gu(e,a);let s=e.querySelector(".nc-slot-menu");if(!(s instanceof HTMLElement))return;let o=e.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),s.hidden=!1,s.dataset.ncIndex=String(n);let i=e.getBoundingClientRect(),l=t.getBoundingClientRect();s.style.left=`${l.left-i.left}px`,s.style.top=`${l.bottom-i.top}px`,s.querySelector("button")?.focus()}function Vn(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function bu(e,t){for(let s of e.querySelectorAll("[data-nc-slot]")){if(!(s instanceof HTMLButtonElement))continue;let o=Number(s.dataset.ncSlot),i=t.slots[o];if(!i)continue;s.textContent=i.label,i.filled?s.dataset.filled="true":delete s.dataset.filled,i.active?s.dataset.active="true":delete s.dataset.active,i.edited?s.dataset.edited="true":delete s.dataset.edited,i.queued?s.dataset.queued="true":delete s.dataset.queued,i.queued&&i.pulse?s.dataset.pulse="true":delete s.dataset.pulse;let l=[i.filled?"saved":"empty",i.active?"playing":"",i.edited?"edited":"",i.queued?"queued, tap again to switch now":""];s.setAttribute("aria-label",[i.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function yu(e){let t=e.dataset.ncLastFill||null,n=Vf(t);e.dataset.ncLastFill=n;let a=Qf(n);if(a)for(let[s,o]of Object.entries(a))e.style.setProperty(s,o)}function tb(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,s=o=>{if(a===o)return;a=o,n.setAttribute("aria-pressed",o?"true":"false");let i=t(e);i?.type==="stepGrid"&&i.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),s(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>s(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||s(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),s(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function nb(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let s=m=>{let b=document.createElement("button");return b.type="button",b.setAttribute("role","radio"),b.textContent=m,a.append(b),b},o=s("Note"),i=s("Accent");i.dataset.ncAccentMode="";let l=m=>{for(let b of[o,i]){let v=b===m;b.setAttribute("aria-checked",v?"true":"false"),b.tabIndex=v?0:-1}};l(o);for(let m of[o,i])m.addEventListener("click",()=>l(m));a.addEventListener("keydown",m=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(m.key))return;m.preventDefault();let b=i.getAttribute("aria-checked")==="true"?o:i;l(b),b.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(a),e.onFill&&c.append(tb(n,t)),e.onClear){let m=document.createElement("button");m.type="button",m.className="nc-fill nc-clear",m.dataset.ncClear="",m.textContent=e.clearLabel??"Clear",m.title="Clear every step (Undo takes it back)",m.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.onClear?.()}),c.append(m)}n.append(c);for(let m of e.rows){let b=document.createElement("div");b.className="nc-row",b.dataset.ncRow="";let v=document.createElement("button");v.type="button",v.className="nc-name",v.textContent=m.label,v.setAttribute("aria-label",`Select ${m.label}`),m.lane&&(v.dataset.ncLane=String((m.lane-1)%4+1));let y=!1,x=0;v.addEventListener("pointerdown",$=>{y=!1,!($.pointerType==="mouse"||$.button!==0)&&(x=window.setTimeout(()=>{let E=t(n);E?.type!=="stepGrid"||!E.selectedRows||(y=!0,E.onSelectRow?.(E.rows.findIndex(M=>M.id===m.id),!0))},Wg))});for(let $ of["pointerup","pointercancel","pointerleave"])v.addEventListener($,()=>window.clearTimeout(x));v.addEventListener("contextmenu",$=>{y&&$.preventDefault()}),v.addEventListener("click",$=>{let E=t(n);if(E?.type!=="stepGrid")return;if(y){y=!1;return}let M=E.rows.findIndex(I=>I.id===m.id),B=!!E.selectedRows&&($.shiftKey||$.metaKey||$.ctrlKey);E.onSelectRow?.(M,B)}),v.addEventListener("keydown",$=>ab(n,v,$));let S=[];for(let $ of["mute","solo"]){if(!($==="mute"?e.onMute:e.onSolo))continue;let E=document.createElement("span");E.className="nc-ms-wrap";let M=document.createElement("button");M.type="button",M.className="nc-ms",M.dataset.ncMs=$,M.textContent=$==="mute"?"M":"S",M.setAttribute("aria-label",`${$==="mute"?"Mute":"Solo"} ${m.label}`),E.append(M,nt()),E.addEventListener("click",()=>{let B=t(n);if(B?.type!=="stepGrid")return;let I=B.rows.findIndex(ie=>ie.id===m.id);($==="mute"?B.onMute:B.onSolo)?.(I)}),S.push(E)}let k=document.createElement("div");k.className="nc-steps";for(let $=0;$<m.steps.length;$++){let E=document.createElement("span");E.className="nc-step-wrap";let M=document.createElement("button");M.type="button",M.className="nc-step",M.dataset.ncStep=`${m.id}:${$}`,M.setAttribute("aria-label",`${m.label} step ${$+1}`),E.append(M,nt()),E.addEventListener("click",B=>{let I=t(n);if(I?.type!=="stepGrid")return;let ie=I.rows.findIndex(_e=>_e.id===m.id),j=i.getAttribute("aria-checked")==="true";I.onToggle(ie,$,B.shiftKey||j)}),k.append(E)}if(e.onLength&&k.append(sb(n,k,m,t)),b.append(...S,v,k),e.onDice){let $=document.createElement("button");$.type="button",$.className="nc-sparkle nc-row-dice",$.dataset.ncDice=m.id,$.setAttribute("aria-label",`Re-roll ${m.label}`),$.title=`Re-roll ${m.label}: new steps for this lane (Undo takes it back)`,$.innerHTML=Rl(),$.append(nt()),$.addEventListener("click",()=>{let E=t(n);E?.type==="stepGrid"&&E.onDice?.(E.rows.findIndex(M=>M.id===m.id))}),b.append($)}b.addEventListener("click",$=>{if($.target!==b)return;let E=t(n);E?.type==="stepGrid"&&E.onSelectRow?.(E.rows.findIndex(M=>M.id===m.id))}),jl(n,k,".nc-step-wrap",t,i,()=>m.id),n.append(b)}let d=document.createElement("div");d.className="nc-pads-head";let u=(m,b,v)=>{let y=document.createElement("button");return y.type="button",y.className=m,y.textContent=b,v&&y.setAttribute("aria-label",v),y},h=u("nc-pads-step","‹","Previous lane"),p=u("nc-pads-step","›","Next lane"),f=document.createElement(e.onLength?"button":"span");f.className="nc-pads-label",f.setAttribute("aria-live","polite"),e.onLength&&(f.type="button",f.dataset.ncLenToggle="",f.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",ci(n,m))}));for(let[m,b]of[[h,-1],[p,1]])m.addEventListener("click",()=>{let v=t(n);if(v?.type!=="stepGrid"||v.rows.length===0)return;let y=v.rows.length;v.onSelectRow?.(((Oa(v)+b)%y+y)%y)});if(d.append(h,f,p),e.onDice){let m=u("nc-pads-step nc-pads-dice","","Re-roll lane");m.dataset.ncPadsDice="",m.innerHTML=Rl(),m.addEventListener("click",()=>{let b=t(n);if(b?.type!=="stepGrid")return;let v=Oa(b);v>=0&&b.onDice?.(v)}),d.append(m)}if(e.transport){let m=u("nc-pads-play","Play");m.dataset.ncPadsPlay="",m.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.transport?.onToggle()}),d.append(m)}n.append(d);let g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");let w=Math.max(0,...e.rows.map(m=>m.steps.length));for(let m=0;m<w;m++){let b=document.createElement("button");b.type="button",b.className="nc-pad",b.dataset.ncPad=String(m),b.textContent=String(m+1),b.addEventListener("click",v=>{let y=t(n);if(y?.type!=="stepGrid")return;let x=Oa(y);if(x<0)return;if(n.dataset.ncLenMode==="true"){y.onLength?.(x,m+1);return}let S=i.getAttribute("aria-checked")==="true";y.onToggle(x,m,v.shiftKey||S)}),g.append(b)}return jl(n,g,".nc-pad",t,i,()=>{let m=t(n);return m?.type==="stepGrid"?m.rows[Oa(m)]?.id:void 0}),n.append(g),n.append(xe()),ci(n,e),n}function Oa(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function jl(e,t,n,a,s,o){let i="on",l=!0,c=-1,d=(u,h)=>{let p=u.rows[c]?.steps[h];!p||h>=u.rows[c].length||(u.onSet?u.onSet(c,h,i,l):!!p[i]!==l&&u.onToggle(c,h,i==="accent"))};Ag(t,n,u=>{let h=a(e);if(h?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(u.kind!=="paint")return;let p=h.rows.findIndex(f=>f.id===o());p>=0&&h.rows[p].length!==u.pad+1&&h.onLength?.(p,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){let p=o();c=h.rows.findIndex(g=>g.id===p);let f=h.rows[c]?.steps[u.pad];if(!f)return;i=s.getAttribute("aria-checked")==="true"?"accent":"on",l=!f[i]}d(h,u.pad)}else if(u.kind==="long"){let p=o(),f=h.rows.findIndex(w=>w.id===p),g=t.querySelectorAll(n)[u.pad];f>=0&&g instanceof HTMLElement&&h.onLongPress?.(f,u.pad,g)}}})}function ab(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],s=a.indexOf(t),o=s;n.key==="ArrowDown"?o=s+1:n.key==="ArrowUp"?o=s-1:n.key==="Home"?o=0:o=a.length-1;let i=a[o];!(i instanceof HTMLElement)||i===t||(n.preventDefault(),i.focus(),i.click())}function sb(e,t,n,a){let s=document.createElement("button");s.type="button",s.className="nc-len-handle",s.dataset.ncLen=n.id,s.setAttribute("role","slider"),s.setAttribute("aria-valuemin","1"),s.setAttribute("aria-valuemax",String(n.steps.length)),s.append(nt());let o=d=>{let u=a(e);if(u?.type!=="stepGrid")return;let h=u.rows.findIndex(g=>g.id===n.id),p=u.rows[h];if(!p)return;let f=Math.max(1,Math.min(p.steps.length,d));f!==p.length&&u.onLength?.(h,f)},i=d=>{let u=[...t.querySelectorAll(".nc-step")],h=1;return u.forEach((p,f)=>{let g=p.getBoundingClientRect();g.width>0&&d>=g.left+g.width/2&&(h=f+1)}),h},l=d=>o(i(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete s.dataset.dragging};return s.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),s.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),s.addEventListener("keydown",d=>{let u=a(e);if(u?.type!=="stepGrid")return;let h=u.rows.find(f=>f.id===n.id);if(!h)return;let p={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};d.key in p&&(d.preventDefault(),o(p[d.key]))}),s}var vo=new WeakMap,Da=new WeakMap;function ob(e){return e?(Da.has(e)||(Da.set(e,Ko(e)),Cd(t=>{Da.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))li(n,Number(n.getAttribute("data-nc-velocity")))},e)),Da.get(e)):"light"}function li(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:ob(e.ownerDocument),s=n===null?null:`${a} ${n}`;if(!(vo.has(e)&&vo.get(e)===s)){if(vo.set(e,s),n===null){for(let o of Object.keys(vl(1)))e.style.removeProperty(o);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[o,i]of Object.entries(vl(n,yl[a]??yl.light)))e.style.setProperty(o,i)}}function Wl(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function ci(e,t){let n=t.rows.some(u=>u.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let s=e.querySelector(".nc-pads"),o=t.rows.find(u=>u.id===t.selectedRow)??t.rows[0],i=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;i instanceof HTMLElement&&o&&(i.textContent=l?`${o.label} · ${o.length}`:o.label,t.onLength&&(i.setAttribute("aria-pressed",l?"true":"false"),i.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&o&&(c.setAttribute("aria-label",`Re-roll ${o.label}`),c.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let u=!!t.transport?.playing,h=t.transport?.label??(u?"Stop":"Play");d.textContent!==h&&(d.textContent=h),d.setAttribute("aria-pressed",u?"true":"false");let p=t.transport?.ariaLabel;p?d.setAttribute("aria-label",p):d.removeAttribute("aria-label")}if(s instanceof HTMLElement&&o){s.setAttribute("aria-label",`${o.label} steps`),o.lane&&(s.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?s.dataset.silent="true":delete s.dataset.silent;let u=o.length>0?(t.playhead%o.length+o.length)%o.length:-1;for(let h of s.querySelectorAll("[data-nc-pad]")){let p=Number(h.getAttribute("data-nc-pad")),f=o.steps[p];h instanceof HTMLButtonElement&&(h.hidden=!f||!l&&p>=o.length,l&&p>=o.length?h.dataset.out="true":delete h.dataset.out,l&&p===o.length-1?h.dataset.end="true":delete h.dataset.end,h.setAttribute("aria-label",`${o.label} step ${p+1}${f?.markLabel?`, ${f.markLabel}`:""}`),Wl(h,f),h.setAttribute("aria-pressed",f?.on?"true":"false"),f?.accent?h.dataset.accent="true":delete h.dataset.accent,f?.dim?h.dataset.dim="true":delete h.dataset.dim,li(h,f?.velocity),t.playhead>=0&&p===u?h.dataset.playhead="true":delete h.dataset.playhead)}}for(let u of t.rows){for(let f=0;f<u.steps.length;f++){let g=u.steps[f],w=e.querySelector(`[data-nc-step="${u.id}:${f}"]`);if(!(w instanceof HTMLButtonElement))continue;let m=w.closest(".nc-row");if(m instanceof HTMLElement){t.selectedRow===u.id?m.dataset.selected="true":delete m.dataset.selected;let x=t.selectedRow!==u.id&&(t.selectedRows??[]).includes(u.id);x?m.dataset.picked="true":delete m.dataset.picked;let S=m.querySelector(".nc-name");S instanceof HTMLElement&&(S.setAttribute("aria-pressed",t.selectedRow===u.id||x?"true":"false"),S.textContent!==u.label&&(S.textContent=u.label,S.setAttribute("aria-label",`Select ${u.label}`))),u.mute||n&&!u.solo?m.dataset.silent="true":delete m.dataset.silent;for(let k of m.querySelectorAll("[data-nc-ms]")){let $=k.getAttribute("data-nc-ms")==="mute"?u.mute:u.solo;k.setAttribute("aria-pressed",$?"true":"false")}}w.setAttribute("aria-pressed",g.on?"true":"false");let b=`${u.label} step ${f+1}${g.markLabel?`, ${g.markLabel}`:""}`;w.getAttribute("aria-label")!==b&&w.setAttribute("aria-label",b),Wl(w,g),g.accent?w.dataset.accent="true":delete w.dataset.accent,g.dim?w.dataset.dim="true":delete w.dataset.dim,f%4===0?w.dataset.bar="true":delete w.dataset.bar,typeof g.velocity=="number"?(w.dataset.velocity="true",w.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,g.velocity))*100)}%`)):(delete w.dataset.velocity,w.style.removeProperty("--level")),li(w,g.velocity);let v=t.playhead>=0&&u.length>0?(t.playhead%u.length+u.length)%u.length:-1;f===v?w.dataset.playhead="true":delete w.dataset.playhead;let y=!!t.onLength&&t.selectedRow===u.id;w.hidden=f>=u.length&&!y,f>=u.length&&y?w.dataset.out="true":delete w.dataset.out}let h=e.querySelector(`[data-nc-len="${u.id}"]`),p=e.querySelector(`[data-nc-step="${u.id}:${Math.max(0,u.length-1)}"]`)?.closest(".nc-step-wrap");if(h instanceof HTMLElement&&p&&p.nextElementSibling!==h){let f=document.activeElement===h;p.after(h),f&&h.focus()}h instanceof HTMLElement&&(h.setAttribute("aria-valuenow",String(u.length)),h.setAttribute("aria-label",`${u.label} length, ${u.length} steps`),h.title=`${u.label}: drag to set the length (${u.length} steps)`)}}function ib(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,xe()),t}function rb(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let s=document.createElement("span");s.className="nc-strip-name",s.dataset.ncStripName="";let o=!e.master&&typeof e.onFold=="function",i=null;o&&(n.dataset.ncFoldable="",i=Eu(),i.dataset.ncStripHide="",i.addEventListener("click",()=>{let y=t(n);y?.type==="strip"&&(y.onFold?.(y.folded!==!0),document.activeElement!==i&&i.focus())})),a.append(s);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let y=document.createElement("span");y.className="nc-strip-grip-dots",y.setAttribute("aria-hidden","true"),l.append(y),l.addEventListener("keydown",x=>{if(x.key!=="ArrowLeft"&&x.key!=="ArrowRight"||x.ctrlKey||x.metaKey||x.shiftKey)return;let S=t(n);S?.type==="strip"&&(x.preventDefault(),S.onMove?.(x.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>Kl(n,l,t))),!e.master&&typeof e.onShade=="function"&&a.addEventListener("contextmenu",y=>{y.pointerType==="touch"||y.pointerType==="pen"||y.target instanceof Element&&y.target.closest("input, .nc-strip-remove")||(y.preventDefault(),Kl(n,a,t,{x:y.clientX,y:y.clientY}))}),e.onRemove){let y=document.createElement("button");y.type="button",y.className="nc-strip-remove",y.dataset.ncStripRemove="",y.textContent="×",y.addEventListener("click",()=>{let x=t(n);x?.type==="strip"&&x.onRemove?.(y)}),a.append(y)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let y=document.createElement("span");y.className="nc-hacks-wrap";let x=document.createElement("button");x.type="button",x.className="nc-hacks",x.dataset.ncHacks="",y.append(x,nt()),y.addEventListener("click",()=>{let S=t(n);S?.type==="strip"&&S.onHacks?.()}),c.append(y)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let y=document.createElement("span");y.className="nc-hacks-wrap nc-sends-view-wrap";let x=document.createElement("button");x.type="button",x.className="nc-hacks nc-sends-view",x.dataset.ncSendsView="",y.append(x,nt()),y.addEventListener("click",()=>{let S=t(n);S?.type==="strip"&&S.onSendsView?.()}),d.append(y)}for(let y of["mute","solo"]){if(!(y==="mute"?e.onMute:e.onSolo))continue;let x=document.createElement("span");x.className="nc-ms-wrap";let S=document.createElement("button");S.type="button",S.className="nc-ms",S.dataset.ncMs=y,S.textContent=y==="mute"?"M":"S",x.append(S,nt()),x.addEventListener("click",()=>{let k=t(n);k?.type==="strip"&&(y==="mute"?k.onMute:k.onSolo)?.()}),d.append(x)}let u=document.createElement("div");u.className="nc-strip-sends";for(let y of e.sends??[])u.append(Wt({...y,type:"knob",compact:!0},t));let h=document.createElement("div");h.className="nc-strip-pan",e.pan&&h.append(Wt(ar(e),t));let p=document.createElement("div");p.className="nc-strip-body";let f=document.createElement("span");f.className="nc-scale",f.setAttribute("aria-hidden","true");for(let y of e.ticks??[]){let x=document.createElement("span");x.className="nc-scale-tick",x.style.setProperty("--tick-pos",String(y.value)),x.textContent=y.label,f.append(x)}let g=ym({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:y=>{let x=t(n);x?.type==="strip"&&x.onChange(y)},onReset:()=>{let y=t(n);y?.type==="strip"&&Ul(y)}}),w=Sm({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let y=t(n);y?.type==="strip"&&y.onClipClear?.()}});if(p.append(f,g.el,w.el),o){let y=document.createElement("button");y.type="button",y.className="nc-ui-fx-fold nc-strip-fold",y.dataset.ncStripFold="",y.setAttribute("aria-expanded","false");let x=document.createElement("span");x.className="nc-strip-fold-cap",x.setAttribute("aria-hidden","true");let S=document.createElement("span");S.className="nc-ui-fx-fold-name",S.dataset.ncStripFoldName="";let k=document.createElement("span");k.className="nc-strip-fold-pan",k.setAttribute("aria-hidden","true"),k.hidden=!e.pan,y.append(x,k,S),y.addEventListener("click",()=>{let $=t(n);if($?.type!=="strip")return;$.onFold?.(!1);let E=n.querySelector("[data-nc-strip-hide]");E instanceof HTMLElement&&E.focus()}),p.prepend(y)}let m=document.createElement("button");m.type="button",m.className="nc-strip-db",m.dataset.ncReadout="";let b=0;m.addEventListener("click",y=>{let x=t(n);x?.type!=="strip"||!x.onTypeIn||(window.clearTimeout(b),y.detail===0?Yl(n,m,t):y.detail===1&&(b=window.setTimeout(()=>Yl(n,m,t),db)))}),m.addEventListener("dblclick",()=>{window.clearTimeout(b);let y=t(n);y?.type==="strip"&&Ul(y)});let v=document.createElement("div");return v.className="nc-strip-trim",e.trim&&v.append(Wt(sr(e),t)),i&&n.append(i),l&&n.append(l),n.append(a,v,c,d,u,h,p,m,xe()),xu(n,e),n}function ar(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??cb(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function sr(e){let t=e.trim,n=t.min??-12,a=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:a,step:t.step??.5,value:t.value,valueText:t.valueText??lb(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:s=>t.onChange(s)}}function lb(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function cb(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var db=250;function Yl(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let s=document.createElement("input");s.type="text",s.className="nc-strip-db-input",s.inputMode="decimal",s.spellcheck=!1,s.autocomplete="off",s.value=a.valueText??ra(a.value),s.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(s),s.focus(),s.select?.();let o=!1,i=l=>{if(o)return;o=!0;let c=s.value;if(s.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(c)}t.focus?.()};s.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),i(!0)):l.key==="Escape"&&(l.preventDefault(),i(!1))}),s.addEventListener("blur",()=>i(!1))}function ub(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-strip-add-plus",s.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",a.append(s,o);let i=document.createElement("select");return i.className="nc-strip-add-select",i.addEventListener("change",()=>{let l=t(n),c=i.value;wu(i),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(a,i,xe()),vu(n,e),n}function vu(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let s=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],o=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),i=s.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==i&&(a.replaceChildren(...s.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),wu(a))}function wu(e){let t=e.options[0];t&&(t.selected=!0)}function Ul(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function xu(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let s=e.querySelector(".nc-fader"),o=s?vm(s):void 0;o&&(o.configure({step:t.step}),o.set(t.value),o.setText(t.valueText),o.setLabel(`${t.label} level`)),Em(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let i=e.querySelector(".nc-strip-db");if(i instanceof HTMLElement){let g=t.valueText??ra(t.value);i.textContent!==g&&(i.textContent=g),i.setAttribute("aria-label",`${t.label} level ${g}`);let w=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";i.title=t.onTypeIn?`Click to type a value. ${w}`:w}for(let g of e.querySelectorAll("[data-nc-ms]")){let w=g.getAttribute("data-nc-ms"),m=w==="mute"?t.mute===!0:t.solo===!0;g.setAttribute("aria-pressed",m?"true":"false"),g.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let g=t.hacksLabel??"Hacks";l.textContent!==g&&(l.textContent=g),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${g}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let g=t.sendsViewLabel??"Sends";c.textContent!==g&&(c.textContent=g),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${g}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),Lt(c,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let u=ku(t);if(u?e.dataset.ncShade=String(u):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let g=e.querySelector(`.nc-strip-trim [data-nc-id="${bn(t.trim.id)}"]`);g&&Ke(g,sr(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let g=e.querySelector(`.nc-strip-pan [data-nc-id="${bn(t.pan.id)}"]`);g&&Ke(g,ar(t))}let h=!t.master&&typeof t.onFold=="function"&&t.folded===!0;h?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let p=e.querySelector("[data-nc-strip-hide]");p instanceof HTMLElement&&(Au(p,h,t.label),Lt(p,t.foldHelp));let f=e.querySelector("[data-nc-strip-fold]");if(f instanceof HTMLElement){f.hidden=!h,f.setAttribute("aria-label",`Expand ${t.label}`);let g=f.querySelector("[data-nc-strip-fold-name]");g&&g.textContent!==t.label&&(g.textContent=t.label),Lt(f,t.foldedHelp??t.foldHelp)}}function ku(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=$u?t:0}var $u=8,Ba=null;function Kl(e,t,n,a){Ba?.();let s=n(e);if(s?.type!=="strip")return null;let o=e.ownerDocument,i=o.defaultView??globalThis,l=o.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${s.label}: shade and place`);let c=o.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(s.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=o.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let u=ku(s),h=e.querySelector("[data-nc-strip-grip]")??t,p=(b=!1)=>{if(Ba!==p)return;Ba=null;let v=l.contains(o.activeElement);l.remove(),o.removeEventListener("keydown",g,!0),o.removeEventListener("pointerdown",w,!0),i.removeEventListener("resize",m),(b||v)&&h?.isConnected&&h.focus?.({preventScroll:!0})},f=[0,...Array.from({length:$u},(b,v)=>v+1)].map(b=>{let v=o.createElement("button");return v.type="button",v.setAttribute("role","radio"),v.setAttribute("aria-checked",b===u?"true":"false"),v.setAttribute("tabindex",b===u?"0":"-1"),v.dataset.ncShadeChoice=String(b),b===0?(v.textContent="Auto",v.setAttribute("aria-label","Auto: alternate light and dark"),v.title="Auto: alternate light and dark"):(v.textContent=String(b),v.setAttribute("aria-label",`Shade ${b}`),v.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${b})`)),v.addEventListener("click",()=>{let y=n(e);p(!0),y?.type==="strip"&&y.onShade?.(b===0?null:b)}),v});if(d.append(...f),d.addEventListener("keydown",b=>{let v=f.indexOf(o.activeElement);if(v<0)return;let y=-1;b.key==="ArrowRight"||b.key==="ArrowDown"?y=(v+1)%f.length:b.key==="ArrowLeft"||b.key==="ArrowUp"?y=(v-1+f.length)%f.length:b.key==="Home"?y=0:b.key==="End"&&(y=f.length-1),!(y<0)&&(b.preventDefault(),f[v].setAttribute("tabindex","-1"),f[y].setAttribute("tabindex","0"),f[y].focus())}),l.append(c,d),typeof s.onMove=="function"){let b=[...e.parentElement?.children??[]].filter(y=>y.classList?.contains("nc-strip")&&!y.hasAttribute("data-nc-master")),v=b.indexOf(e);for(let[y,x,S]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let k=o.createElement("button");k.type="button",k.className="nc-strip-menu-item",k.dataset.ncStripMove=y<0?"left":"right";let $=o.createElement("span");$.textContent=x;let E=o.createElement("kbd");E.textContent=S,E.setAttribute("aria-hidden","true"),k.append($,E),k.disabled=y<0?v<=0:v<0||v>=b.length-1,k.addEventListener("click",()=>{let M=n(e);p(!0),M?.type==="strip"&&M.onMove?.(y)}),l.append(k)}}o.body.append(l),(()=>{let b=t.getBoundingClientRect?.()??{bottom:0,right:0},v=l.offsetWidth,y=l.offsetHeight,x=i.innerWidth||o.documentElement.clientWidth||v,S=i.innerHeight||o.documentElement.clientHeight||y,k=a?a.x:b.right-v,$=a?a.y:b.bottom+4;k=Math.max(4,Math.min(k,x-v-4)),$+y>S-4&&($=Math.max(4,(a?a.y:b.top)-y-4)),l.style.left=`${Math.round(k)}px`,l.style.top=`${Math.round($)}px`})();let g=b=>{if(b.key==="Escape")b.preventDefault(),b.stopPropagation(),p(!0);else if(b.key==="Tab"&&l.contains(o.activeElement)){let v=[...l.querySelectorAll("button:not([disabled])")].filter(x=>x.getAttribute("tabindex")!=="-1"),y=(v.indexOf(o.activeElement)+(b.shiftKey?-1:1)+v.length)%v.length;b.preventDefault(),v[y]?.focus()}},w=b=>{l.contains(b.target)||p(!1)},m=()=>p(!1);return o.addEventListener("keydown",g,!0),o.addEventListener("pointerdown",w,!0),i.addEventListener("resize",m),Ba=p,(f.find(b=>b.getAttribute("tabindex")==="0")??f[0]).focus({preventScroll:!0}),{el:l,close:()=>p(!1)}}var di=typeof ResizeObserver=="function"?new ResizeObserver(pb):null;function pb(e){for(let t of e){if(!t.target.isConnected){di.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&hb(n)}}function hb(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,s=n instanceof HTMLElement?n.offsetHeight:0,o=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+s+o}px`)}function fb(e){if(di)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))di.observe(t)}function mb(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let s=typeof e.onFold=="function",o=!!e.meter,i=typeof e.onRemove=="function";if(e.on===void 0&&!s&&!fs(e)&&!o&&!i)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),o&&l.append(Lu(n,"head")),e.on!==void 0){let c=Dd({checked:e.on,labelledBy:a.id,onChange:d=>{let u=t(c.el);u?.type==="fx"&&u.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",l.append(c.el)}s&&l.append(bb(n,t)),fs(e)&&l.append(xb(n,t)),i&&l.append(kb(t)),n.append(l)}s&&n.prepend(yb(n,t)),o&&Tu(n,e);for(let l of e.controls)n.append(Wt(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",l.append(c);for(let d of e.more)l.append(Wt(d,t));n.append(l)}return n.append(xe()),Cu(n,e),fb(n),n}var gb=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function Su(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&gb(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function bb(e,t){let n=Eu();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),Su(e))}),n}function Eu(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Au(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function yb(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let s=document.createElement("span");s.className="nc-ui-fx-fold-name",s.dataset.ncFxFoldName="";let o=document.createElement("span");return o.className="nc-fold-tri",o.setAttribute("aria-hidden","true"),n.append(o,a,s),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Lu(e,"fold")),n.addEventListener("click",()=>{let i=t(n);if(i?.type==="fx"){if(i.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}i.onFold?.(!1),Su(e)}}),n}var En=new Set;function Va(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var fs=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),vb="(max-width: 768px)";function wb(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function xb(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(wb()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(Mu(e,a,!En.has(a.id)),n.focus())}),n}function kb(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function Mu(e,t,n){n?En.add(t.id):En.delete(t.id),or(e,t)}function $b(e,t){t?.type==="fx"&&En.has(t.id)&&Mu(e,t,!1)}function Sb(e){return e.ownerDocument.defaultView?.matchMedia?.(vb).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function or(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=fs(t)&&En.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!fs(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Va(e.ownerDocument,()=>{for(let i of e.querySelectorAll(".nc-eq"))i instanceof HTMLElement&&Sn(i)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",Lt(n,t.maxHelp)),!a){e.dataset.ncMax&&Xl(e);return}if(!e.isConnected){let i=()=>e.isConnected&&En.has(t.id)&&or(e,t);queueMicrotask(()=>{e.isConnected?i():Va(e.ownerDocument,i)});return}let s=Sb(e),o=[...e.children].filter(i=>i.matches?.(".nc-field, [data-nc-slider]")).length;o>0&&e.style.setProperty("--nc-fx-dials",String(o)),e.dataset.ncMax!==s&&(e.dataset.ncMax&&Xl(e),e.dataset.ncMax=s,s==="over"&&Eb(e,t)),Ab(e.ownerDocument),s==="over"&&ir(e),Va(e.ownerDocument,()=>{for(let i of e.querySelectorAll(".nc-eq"))i instanceof HTMLElement&&Sn(i)})}function Xl(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Va(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Sn(n)})}function Eb(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let s=e.querySelector("[data-nc-fx-max]");s instanceof HTMLElement&&s.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function ir(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,s=e.ownerDocument.defaultView,o=Number.parseFloat(s?.getComputedStyle(a).columnGap??"")||0,i=Wm(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),o,s?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${i.left}px`,e.style.top=`${i.top}px`,e.style.width=`${i.width}px`}var Gl=new WeakSet;function Ab(e){Gl.has(e)||(Gl.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(s=>s.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&ir(t)}))}var ui=new WeakMap;function Lu(e,t){let n=wg(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Tu(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let s of n)Lt(s,t.meterHelp);let a=ui.get(e);a?a.set(t.meter):ui.set(e,Sg(n,t.meter))}function Cu(e,t){(t.meter||ui.has(e))&&Tu(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let s=typeof t.onFold=="function"&&t.folded===!0;s?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let o=e.querySelector("[data-nc-fx-hide]");o instanceof HTMLElement&&(Au(o,s,t.title),Lt(o,t.foldHelp)),or(e,t);let i=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(i instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;i.hidden=s,i.setAttribute("aria-label",c),i.title=c}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";l.hidden=!s,l.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let u=l.querySelector("[data-nc-fx-fold-name]");u&&(u.textContent=t.title),Lt(l,t.foldHelp)}}function Lt(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function bn(e){return e.replace(/["\\]/g,"\\$&")}function Mb(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(s=>s.type==="canvas"&&s.id===n.dataset.ncId);a?.type==="canvas"&&Hd(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Sn(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&ir(n);Bg(e)}var Lb=At["toast-duration"];function Tb({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function Cb(e,t,n,a){let s=l=>({top:l,bottom:l+n}),o=l=>e.some(c=>c&&c.bottom>l.top&&c.top<l.bottom),i=s(t-a-n);return o(i)?o(s(a))?"bottom":"top":"bottom"}function Nb(e,t,n,a,s,o){let i=e.bottom+s,l=Math.max(o,Math.min(e.left,a-o-n.width));for(let c=!0,d=0;c&&d<8;d++){c=!1;for(let u of t)u&&u.bottom>i&&u.top<i+n.height&&u.right>l&&u.left<l+n.width&&(i=u.bottom+s,c=!0)}return{top:i,left:l}}var Vl="data-nc-ui-toast-live";function Fb(e,t){let n=t.querySelector(`[${Vl}]`);return n||(n=e.createElement("div"),n.setAttribute(Vl,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function Pb({message:e,actionLabel:t,onAction:n,duration:a=Lb,onClose:s,avoid:o=[],anchor:i,host:l,document:c=globalThis.document}={}){l=l??c.body;let d=c.defaultView??globalThis,u=c.createElement("div");u.className="nc-ui-toast",u.setAttribute("data-state","enter");let h=c.createElement("span");h.className="nc-ui-toast-message",h.textContent=e,u.appendChild(h);let p=null;t&&(p=c.createElement("button"),p.type="button",p.className="nc-ui-toast-action",p.textContent=t,u.appendChild(p)),l.appendChild(u);let f="open",g=Y=>Y&&typeof Y.getBoundingClientRect=="function"?Y.getBoundingClientRect():null,w=g(u),m=w?.height||44,b=d.getComputedStyle?.(u),v=Number.parseFloat(b?.getPropertyValue(ee("toast-offset")))||16,y=Number.parseFloat(b?.getPropertyValue(ee("toast-anchor-gap")))||8,x=g(i),S=d.innerHeight??0,k=o.map(g).filter(Boolean),$=x&&x.bottom>0&&x.top<S?Nb(x,k,{width:w?.width||0,height:m},d.innerWidth??0,y,v):null;$&&$.top+m<=S?(u.setAttribute("data-placement","anchor"),u.style.top=`${$.top+(d.scrollY??0)}px`,u.style.left=`${$.left+(d.scrollX??0)}px`):u.setAttribute("data-placement",Cb(k,S,m,v));let E=d.requestAnimationFrame?.bind(d)??(Y=>setTimeout(Y,16));E(()=>E(()=>{f==="open"&&u.setAttribute("data-state","open")})),Fb(c,l).textContent=Tb({message:e,actionLabel:t});let M,B,I=new Promise(Y=>{B=Y}),ie=Y=>{clearTimeout(M),M=setTimeout(()=>Z("timeout"),Y)},j=a,_e=Date.now(),R=()=>{f==="open"&&(clearTimeout(M),j=Math.max(0,j-(Date.now()-_e)))},G=()=>{f==="open"&&(_e=Date.now(),ie(j))};u.addEventListener("pointerenter",R),u.addEventListener("pointerleave",G),u.addEventListener("focusin",R),u.addEventListener("focusout",G),p?.addEventListener("click",()=>{if(f==="open")try{n?.()}finally{Z("action")}}),Number.isFinite(a)&&ie(a);function Z(Y="close"){if(f!=="open")return;f="closing",clearTimeout(M),u.setAttribute("data-state","closing"),s?.(Y);let Q=d.getComputedStyle?.(u),Se=Q?Math.max(0,...String(Q.transitionDuration||"").split(",").map(In=>Number.parseFloat(In)*(In.trim().endsWith("ms")?1:1e3)||0)):0,Rn=()=>{f!=="gone"&&(f="gone",u.remove(),B(Y))};u.addEventListener("transitionend",Rn),setTimeout(Rn,Se+50)}return{el:u,close:Z,closed:I}}var Ql="data-nc-help";function zb(e,t,n,a=0,s=6,o=8){let i=e.top-s-t.height,l=i>=a+o?"above":"below",c=l==="above"?i:e.bottom+s,d=Math.max(o,Math.min(e.left,n-o-t.width));return{top:Math.round(c),left:Math.round(d),side:l}}var wo=new WeakMap;function Ob(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Db({document:e=globalThis.document,delay:t=1e3}={}){if(!e)return{uninstall(){},hide(){}};let n=wo.get(e);if(n)return n;let a=e.defaultView,s=null,o=null,i,l=!1,c,d=null,u=!1,h=0,p=()=>{clearTimeout(i),u&&!l&&(h=Date.now()+1500),u=!1,s&&(s.hidden=!0,delete s.dataset.pinned)},f=()=>{p(),clearTimeout(c),o=null,d=null,l=!1},g=($,E)=>{clearTimeout(i),d=E;let M=Date.now()<h?Math.min(t,300):t;i=setTimeout(()=>{o===$&&$.isConnected&&!l&&b($)&&(u=!0)},M)},w=$=>({x:Number($.clientX)||0,y:Number($.clientY)||0}),m=($,E,M)=>!$||Math.hypot($.x-E.x,$.y-E.y)>M,b=($,E)=>{let M=E??$.getAttribute(Ql);if(!M)return!1;s||(s=e.createElement("div"),s.className="nc-ui-help",s.setAttribute("role","tooltip"),s.dataset.testid="nc-help",s.style.position="fixed",s.style.pointerEvents="none",s.style.zIndex="6",e.body.appendChild(s)),s.textContent=M,s.hidden=!1,s.style.visibility="hidden",s.style.top="0px",s.style.left="0px";let B=$.getBoundingClientRect(),I=zb(B,{width:s.offsetWidth,height:s.offsetHeight},a.innerWidth,Ob(e));return s.style.top=`${I.top}px`,s.style.left=`${I.left}px`,s.dataset.side=I.side,s.style.visibility="",!0},v=$=>{if(l||$.pointerType==="touch")return;let E=$.target&&$.target.closest?$.target.closest(`[${Ql}]`):null;E!==o&&(f(),!(!E||$.buttons)&&(o=E,g(E,w($))))},y=$=>{if(l||$.pointerType==="touch"||!o)return;if($.buttons){p(),d=null;return}let E=w($);u?m(d,E,8)&&(p(),g(o,E)):m(d,E,4)&&g(o,E)},x=$=>{!l&&!$.relatedTarget&&f()},S=$=>{(l||$.key==="Escape")&&f()};e.addEventListener("pointerover",v),e.addEventListener("pointermove",y,{passive:!0}),e.addEventListener("pointerout",x),e.addEventListener("pointerdown",f,!0),e.addEventListener("keydown",S),a.addEventListener("scroll",f,!0),a.addEventListener("blur",f);let k={hide:f,pin($,E,{ms:M=0}={}){return f(),!$||!$.isConnected||!b($,E)?!1:(l=!0,s.dataset.pinned="",M>0&&(c=setTimeout(f,M)),!0)},uninstall(){f(),e.removeEventListener("pointerover",v),e.removeEventListener("pointermove",y),e.removeEventListener("pointerout",x),e.removeEventListener("pointerdown",f,!0),e.removeEventListener("keydown",S),a.removeEventListener("scroll",f,!0),a.removeEventListener("blur",f),s?.remove(),s=null,wo.delete(e)}};return wo.set(e,k),k}var Bb="(max-width: 768px)",Rb='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',Ib='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',qb=0;function _b({panel:e,button:t,label:n="Menu",media:a=Bb}){let s=e.ownerDocument,o=s.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++qb}`);let i=t??s.createElement("button");t||(i.type="button",i.innerHTML=Rb),i.classList.add("nc-page-menu-btn"),i.setAttribute("aria-label",n),i.setAttribute("aria-expanded","false"),i.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function c(){l()||(e.setAttribute("data-nc-open",""),i.setAttribute("aria-expanded","true"),s.addEventListener("keydown",u,!0),s.addEventListener("pointerdown",h,!0),[...e.querySelectorAll(Ib)].find(m=>!m.hidden&&m.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function d({focus:m}={}){if(!l())return;let b=e.contains(s.activeElement);e.removeAttribute("data-nc-open"),i.setAttribute("aria-expanded","false"),s.removeEventListener("keydown",u,!0),s.removeEventListener("pointerdown",h,!0),(m??b)&&i.focus?.({preventScroll:!0})}function u(m){m.key==="Escape"&&(m.preventDefault(),m.stopPropagation(),d({focus:!0}))}function h(m){let b=m.target;b instanceof o.Node&&(e.contains(b)||i.contains(b))||d({focus:!1})}let p=()=>l()?d({focus:!0}):c(),f=m=>{let b=m.target,v=b instanceof o.Element?b.closest("button"):null;!v||!e.contains(v)||v.closest("[data-nc-menu-stay]")||d({focus:!0})};i.addEventListener("click",p),e.addEventListener("click",f);let g=o.matchMedia?.(a),w=()=>{g?.matches||d({focus:!1})};return g?.addEventListener?.("change",w),{button:i,panel:e,open:c,close:d,isOpen:l,destroy(){d({focus:!1}),i.removeEventListener("click",p),e.removeEventListener("click",f),g?.removeEventListener?.("change",w)}}}var rr="netcomposer.rhythm.hidden.v1",lt=new WeakMap;function xo(){try{return globalThis.localStorage??null}catch{return null}}function Nu(e,t=rr){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Jl(e,t,n,a=rr){let s=Nu(e,a);n?s.add(t):s.delete(t);try{e?.setItem(a,JSON.stringify([...s]))}catch{}}function lr(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(s=>s.controls)],n=[],a=s=>{if(n.push(s),s.type==="group")for(let o of s.controls)a(o)};for(let s of t)a(s),s.type==="fx"&&n.push(...s.controls,...s.more??[]),s.type==="strip"&&(n.push(...(s.sends??[]).map(o=>({...o,type:"knob",compact:!0}))),s.pan&&n.push(ar(s)),s.trim&&n.push(sr(s)));return n}function Fu(e,t){if(!(!e||!t))return lr(e).find(n=>n.id===t)}function Hb(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${lr(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function jb(e,t){if(!t.title)return;if(!t.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=t.title,e.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let s=document.createElement("span");s.className="nc-panel-subject",s.dataset.ncPanelSubject="",n.append(a,s),e.append(n),Pu(e,t)}function Pu(e,t){if(!t.panel)return;let n=[...e.children].find(o=>o.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),s=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),s&&(s.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Wb(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=lt.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Fu(n,a)}function Yb(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],s=Hb(t);if(e.dataset.ncSignature===s){for(let o of a){let i=e.querySelector(`[data-nc-section="${ec(o.id)}"]`);i&&Pu(i,o);for(let l of o.controls){let c=e.querySelector(`[data-nc-id="${ec(l.id)}"]`);c instanceof Element&&Ke(c,l)}i instanceof HTMLElement&&pi(i,o,n)}return}e.dataset.ncSignature=s,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let o of a){let i=document.createElement("div");i.className="nc-section",i.dataset.ncSection=o.id,o.inset&&(i.dataset.ncInset="true"),o.area&&(i.dataset.ncArea=o.area),o.label&&(i.setAttribute("role","group"),i.setAttribute("aria-label",o.label)),o.panel&&(i.dataset.ncPanel="true",i.setAttribute("role","region"),o.title&&i.setAttribute("aria-label",o.title)),jb(i,o);let l=o.panel?document.createElement("div"):i;o.panel&&(l.className="nc-panel-body",i.append(l));for(let c of o.controls)l.append(Wt(c,Wb));e.append(i),pi(i,o,n)}}function zu(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,s=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,s))}}var Ub="(max-width: 768px)",Ou=new WeakMap;function Zl(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function Kb(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let s=Zl("prev"),o=Zl("next"),i=document.createElement("span");i.className="nc-fx-page-count",i.dataset.ncFxPageCount="",i.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(s,i,o,l);let c=(d,u)=>{let h=Ou.get(e);if(!h||u.getAttribute("aria-disabled")==="true")return;let p=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:f}=zu(p,h.pageSize,(t.pages.get(h.id)??0)+d);t.pages.set(h.id,f),h.onPage?.(f),pi(e,{...h,page:f},t),u.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===u&&(u===s?o:s).focus(),t.redraw()};return s.addEventListener("click",()=>c(-1,s)),o.addEventListener("click",()=>c(1,o)),e.prepend(a),a}function pi(e,t,n){Ou.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],s=t.pageSize??0,{pages:o,page:i}=zu(a.length,s,t.page??n.pages.get(t.id)??0);if(s>0&&n.pages.set(t.id,i),o<=1){for(let m of[...e.children])m.classList.contains("nc-fx-pager")&&m.remove();delete e.dataset.ncPaged;for(let m of a)delete m.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(Ub).matches===!0,c=e.closest(".nc-module");a.forEach((m,b)=>{let v=Math.floor(b/s)!==i;if(v?m.dataset.ncOffPage="":delete m.dataset.ncOffPage,v&&!l){let y=c instanceof HTMLElement?lt.get(c):void 0;$b(m,Fu(y,m.dataset.ncId))}});let d=Kb(e,n),u=d.querySelector('[data-nc-fx-page="prev"]'),h=d.querySelector('[data-nc-fx-page="next"]');u.setAttribute("aria-disabled",i===0?"true":"false"),h.setAttribute("aria-disabled",i===o-1?"true":"false");let p=d.querySelector("[data-nc-fx-page-count]"),f=`${i+1} / ${o}`;p.textContent!==f&&(p.textContent=f);let g=d.querySelector("[data-nc-fx-page-live]"),w=`Effects page ${i+1} of ${o}`;g.textContent!==w&&(g.textContent=w)}function ec(e){return e.replace(/["\\]/g,"\\$&")}function Xb(e,t=rr){Pd();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Nu(xo(),t).has(e.id),s=document.createElement("header");s.className="nc-module-hd",s.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${e.id}-title`;let i=document.createElement("span");i.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=Dd({labelledBy:o.id,onChange:v=>(lt.get(n)??e).onToggle?.(v)});d.el.dataset.ncModuleSwitch="",i.append(d.el,l,c);let u=document.createElement("span");u.className="nc-snap-msg",u.dataset.ncStatus="",s.append(o,u,i);let h=document.createElement("div");h.className="nc-module-body",h.id=`${e.id}-body`;let p=document.createElement("button");p.type="button",p.className="nc-slim";let f=document.createElement("span");f.className="nc-slim-lines",p.append(f);let g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",n.append(g,s,h,p),n.setAttribute("aria-labelledby",o.id);let w=v=>{let y=lt.get(n)??e;n.dataset.ncOpen=v?"false":"true",h.hidden=v,p.hidden=!v,l.textContent=v?"+":"−",l.setAttribute("aria-expanded",v?"false":"true"),l.setAttribute("aria-controls",h.id),l.setAttribute("aria-label",`${v?"Show":"Hide"} ${y.title}`),l.title=v?"Show":"Hide",v?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let v=n.dataset.ncOpen==="true";Jl(xo(),(lt.get(n)??e).id,v,t),w(v),hi(n.parentElement)}),p.addEventListener("click",()=>{Jl(xo(),(lt.get(n)??e).id,!1,t),w(!1),hi(n.parentElement)});let m={pages:new Map,redraw:()=>b.redraw()},b={el:n,update(v){lt.set(n,v),v.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=v.title,u.textContent=v.status??"",v.status!==void 0?u.setAttribute("aria-live","polite"):u.removeAttribute("aria-live"),f.textContent=v.summary??v.title,d.el.hidden=v.on===void 0,d.set(v.on===!0),v.on===!1?h.dataset.ncDim="true":delete h.dataset.ncDim,p.setAttribute("aria-label",`Show ${v.title}`),Yb(h,v,m),w(h.hidden),b.redraw()},redraw(){let v=lt.get(n);v&&Mb(n,lr(v))}};return lt.set(n,e),w(a),b.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>b.redraw()).observe(n),Cd(()=>b.redraw(),n.ownerDocument),b}function Gb(e,t,n="adjacent"){Pd(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((s,o)=>{let i=o%4+1;s.el.dataset.ncShade=String(i),s.el.dataset.ncPlace=a;let l=s.el.querySelector("[data-nc-index]");l&&(l.textContent=String(i).padStart(2,"0")),e.append(s.el),s.redraw()}),hi(e)}function hi(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=t.some(o=>o.hasAttribute("data-nc-lead")),a=t.map(o=>o.hasAttribute("data-nc-slim")?r("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let s=t.filter(o=>!o.hasAttribute("data-nc-slim"));n&&t.length===4&&s.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Vb="https://musicmatter.art/library/library.json",yn="musicmatter.art",Qb=["CC0-1.0","CC-BY-4.0","CC-BY-SA-4.0","PDM-1.0"],Du=6,Jb=2,cr=["kick","snare","clap","hat","tom","perc","cymbal","fx","tonal"],Bu=["redistributable","personal","unknown"],ms=e=>typeof e=="number"&&Number.isFinite(e)&&e>=40&&e<=250;function Ru(e){const t=e.kind==="loop"?"loop":e.kind==="one-shot"?"one-shot":"";return{kind:t,bpm:t==="loop"&&ms(e.bpm)?e.bpm:0}}const St=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{},V=(e,t=300)=>typeof e=="string"?e.trim().slice(0,t):"",Le=(e,t=0)=>typeof e=="number"&&Number.isFinite(e)?e:t,Oe=e=>{const t=V(e,600);return/^https?:\/\/[^\s"'<>]+$/i.test(t)?t:""},dr=/^[0-9a-f]{64}$/,Iu="0123456789abcdefghijklmnopqrstuvwxyz";function Zb(e){const t=St(e),n=Array.isArray(t.sounds)?t.sounds:[],a=new Set,s=[];for(const o of n){const i=St(o),l=V(i.id,160),c=V(i.role),d=V(i.license,40),u=Oe(i.audio),h=V(i.sha256,64).toLowerCase(),p=V(i.title,160);if(!l||a.has(l)||!cr.includes(c)||!u||!p||!Qb.includes(d)||!dr.test(h))continue;a.add(l);const f=St(i.measures),g=Le(f.gain_db),w=St(i.source);s.push({id:l,origin:"shelf",licenseStatus:"",permission:"",role:c,title:p,instrument:p.split(" · ")[0]??p,tags:(Array.isArray(i.tags)?i.tags:[]).filter(m=>typeof m=="string").map(m=>m.toLowerCase().slice(0,40)),license:d,licenseUrl:Oe(i.license_url)||ur(d),creator:V(i.creator,120)||"Unknown",creatorLink:Oe(i.creator_link),source:Oe(w.url),audio:u,manifest:Oe(i.manifest),sha256:h,measures:{length:Le(f.length_s,1),attack:Le(f.attack_ms,10),decay:Le(f.decay_s,.3),centroid:Le(f.centroid_hz,1e3),level:Le(f.hit_dbfs,-20)+g,gain:g},wave:typeof i.wave=="string"?Array.from(i.wave.slice(0,96),m=>Math.max(0,Iu.indexOf(m))/35):[],...Ru(i)})}return{name:V(t.name,120)||yn,sounds:s}}function fi(e){const t=V(e,400).replace(/\\/g,"/");if(!t||t.startsWith("/")||/^[a-z][a-z0-9+.-]*:/i.test(t)||t.includes("\0"))return"";const n=t.split("/");return n.some(a=>!a||a==="."||a==="..")?"":n.join("/")}const ey="local:";function qu(e,t){const n=St(e),a=Array.isArray(n.sounds)?n.sounds:[],s=new Set,o=[];for(const i of a){const l=St(i),c=V(l.id,160),d=`${ey}${c}`,u=V(l.role),h=V(l.license,40)||"unknown",p=fi(l.audio),f=V(l.sha256,64).toLowerCase(),g=V(l.title,160);if(!c||s.has(d)||!cr.includes(u)||!p||!g||!dr.test(f))continue;s.add(d);const w=St(l.measures),m=Le(w.gain_db),b=St(l.source),v=V(l.license_status,20);o.push({id:d,origin:"local",licenseStatus:Bu.includes(v)?v:"unknown",permission:V(l.permission,300),role:u,title:g,instrument:g.split(" · ")[0]??g,tags:(Array.isArray(l.tags)?l.tags:[]).filter(y=>typeof y=="string").map(y=>y.toLowerCase().slice(0,40)),license:h,licenseUrl:Oe(l.license_url)||ur(h),creator:V(l.creator,120)||"Unknown",creatorLink:Oe(l.creator_link),source:Oe(b.url),audio:`local:${t}/${p}`,manifest:fi(l.manifest),sha256:f,measures:{length:Le(w.length_s,1),attack:Le(w.attack_ms,10),decay:Le(w.decay_s,.3),centroid:Le(w.centroid_hz,1e3),level:Le(w.hit_dbfs,-20)+m,gain:m},wave:typeof l.wave=="string"?Array.from(l.wave.slice(0,96),y=>Math.max(0,Iu.indexOf(y))/35):[],...Ru(l)})}return{name:V(n.name,120)||"Local Library",sounds:o}}function _u(e){const t=/^local:[^/]+\/(.+)$/.exec(e);return t?fi(t[1]):""}function tc(e,...t){return{name:e,sounds:t.flatMap(n=>n?.sounds??[])}}function ur(e){return e==="CC0-1.0"?"https://creativecommons.org/publicdomain/zero/1.0/":e==="CC-BY-4.0"?"https://creativecommons.org/licenses/by/4.0/":e==="CC-BY-SA-4.0"?"https://creativecommons.org/licenses/by-sa/4.0/":e==="PDM-1.0"?"https://creativecommons.org/publicdomain/mark/1.0/":""}function pr(e,t="",n=""){return e==="CC0-1.0"?"CC0":e==="CC-BY-4.0"?"BY":e==="CC-BY-SA-4.0"?"BY-SA":e==="PDM-1.0"?"PD":e==="Permission-only"||n?"PERM":t==="personal"?"PERS":t==="unknown"||e==="unknown"?"?":e}function Hu(e){return e.origin==="local"&&e.licenseStatus!=="redistributable"}function An(e,t=24){const n=e.trim();if(n.length<=t)return n;const[a=n,s=""]=n.split(" · "),o=s.split(/\s+/).at(-1)??"",i=/^(?:v|vl|rr|k)?\d{1,2}$|^(?:p{1,3}|mp|mf|f{1,3})\d*$/i.test(o)?o:"",l=i?`${a} ${i}`:"";return l&&l.length<=t?l:a.length<=t?a:n.slice(0,t).trim()}const mi={kick:"kick",kicks:"kick",bd:"kick",bassdrum:"kick","bass drum":"kick","kick drum":"kick",snare:"snare",snares:"snare",sd:"snare","snare drum":"snare",rimshot:"snare",clap:"clap",claps:"clap",handclap:"clap",handclaps:"clap","hand clap":"clap","hand claps":"clap",hat:"hat",hats:"hat",hihat:"hat",hihats:"hat","hi-hat":"hat","hi-hats":"hat","hi hat":"hat","hi hats":"hat","high hat":"hat",hh:"hat",ch:"hat",oh:"hat",tom:"tom",toms:"tom",tomtom:"tom","floor tom":"tom",perc:"perc",percs:"perc",percussion:"perc",cymbal:"cymbal",cymbals:"cymbal",crash:"cymbal",ride:"cymbal",splash:"cymbal",china:"cymbal",fx:"fx",sfx:"fx",effect:"fx",effects:"fx",tonal:"tonal",melodic:"tonal",pitched:"tonal",bell:"tonal",bells:"tonal",mallet:"tonal",mallets:"tonal",chime:"tonal",chimes:"tonal"},ty={ch:"closed",oh:"open"},nc={punchy:{wants:[{measure:"attack",dir:-1},{measure:"decay",dir:-1}],tag:"punchy"},tight:{wants:[{measure:"decay",dir:-1}],tag:"tight"},snappy:{wants:[{measure:"decay",dir:-1},{measure:"centroid",dir:1}],tag:"snappy"},short:{wants:[{measure:"length",dir:-1},{measure:"decay",dir:-1}],tag:"short"},dry:{wants:[{measure:"decay",dir:-1}]},long:{wants:[{measure:"length",dir:1},{measure:"decay",dir:1}],tag:"long"},ringing:{wants:[{measure:"decay",dir:1}]},wet:{wants:[{measure:"decay",dir:1}]},big:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}],tag:"boomy"},boomy:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}],tag:"boomy"},fat:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}]},deep:{wants:[{measure:"centroid",dir:-1}],tag:"deep"},dark:{wants:[{measure:"centroid",dir:-1}],tag:"dark"},warm:{wants:[{measure:"centroid",dir:-1}]},low:{wants:[{measure:"centroid",dir:-1}]},muffled:{wants:[{measure:"centroid",dir:-1}]},bright:{wants:[{measure:"centroid",dir:1}],tag:"bright"},crisp:{wants:[{measure:"centroid",dir:1},{measure:"decay",dir:-1}]},sharp:{wants:[{measure:"centroid",dir:1},{measure:"attack",dir:-1}]},high:{wants:[{measure:"centroid",dir:1}]},airy:{wants:[{measure:"centroid",dir:1}]},loud:{wants:[{measure:"level",dir:1}],tag:"hard"},hard:{wants:[{measure:"level",dir:1}],tag:"hard"},heavy:{wants:[{measure:"level",dir:1},{measure:"centroid",dir:-1}]},soft:{wants:[{measure:"level",dir:-1}],tag:"soft"},quiet:{wants:[{measure:"level",dir:-1}],tag:"soft"},gentle:{wants:[{measure:"level",dir:-1}],tag:"soft"},ghost:{wants:[{measure:"level",dir:-1}],tag:"soft"}},gi={funk:["tight","punchy"],funky:["tight","punchy"],disco:["tight","bright"],dusty:["dark","soft"],lofi:["dark","soft"],"lo-fi":["dark","soft"],vintage:["dark"],"70s":["dark","tight"],"60s":["dark","soft"],old:["dark"],jazz:["soft","dark"],jazzy:["soft","dark"],rock:["hard","long"],metal:["hard","bright"],hiphop:["punchy","dark"],"hip-hop":["punchy","dark"],"boom bap":["punchy","dark"],boombap:["punchy","dark"],trap:["punchy","short"],techno:["tight","punchy"],house:["tight","punchy"],ambient:["long","soft"],cinematic:["big","long"],epic:["big","loud"]},ju=new Set(["kit","kits","drumkit","drumkits","drums","set","drum kit"]),ny=new Set("a an the some any with and or of for to me my give find get want need please like sound sounds sample samples one ones really very bit little more less that this".split(" "));function ay(e){const t=e.toLowerCase().replace(/[^a-z0-9\s-]/g," ").split(/\s+/).filter(Boolean),n=[];for(let a=0;a<t.length;a++){const s=`${t[a]} ${t[a+1]??""}`;t[a+1]&&(s in mi||s in gi||ju.has(s))?(n.push(s),a++):n.push(t[a])}return n}function hr(e){return new Set(e.title.toLowerCase().split(/[^a-z0-9]+/).map(t=>t.replace(/\d+$/,"")).filter(t=>t.length>1))}function bi(e,t){const n={text:e.trim(),roles:[],tags:[],softTags:[],wants:[],kit:!1,kind:"",unknown:[]},a=new Set;if(t)for(const o of t.sounds){for(const i of o.tags)a.add(i);for(const i of hr(o))a.add(i)}const s=o=>{const i=nc[o];i&&(n.wants.push(...i.wants),i.tag&&!n.softTags.includes(i.tag)&&n.softTags.push(i.tag))};for(const o of ay(e))if(ju.has(o))n.kit=!0;else if(o in mi){const i=mi[o];n.roles.includes(i)||n.roles.push(i);const l=ty[o];(l==="open"||l==="closed")&&(n.kind=l)}else if(o in nc)s(o);else if(o in gi)for(const i of gi[o]??[])s(i);else if(o==="open")n.kind="open";else if(o==="closed"||o==="close")n.kind="closed";else{if(ny.has(o))continue;if(!t||a.has(o)||a.has(o.replace(/s$/,""))){const i=t&&!a.has(o)?o.replace(/s$/,""):o;n.tags.includes(i)||n.tags.push(i)}else n.unknown.push(o)}return n}function sy(e,t){const n=[...e].sort((o,i)=>o.measures[t]-i.measures[t]),a=new Map,s=Math.max(1,n.length-1);return n.forEach((o,i)=>a.set(o.id,i/s)),a}const oy=[{measure:"level",dir:1,weight:.5},{measure:"length",dir:-1,weight:.2}],iy=.2,ry={kick:-1,tom:-1,snare:1,clap:1,hat:1};function fr(e,t){const n=new Set(t.wants.map(i=>i.measure)),a=new Map,s=(i,l)=>{let c=a.get(i);return c||(c=sy(e,i),a.set(i,c)),c.get(l)??.5},o=(i,l)=>i.reduce((c,d)=>{const u=s(d.measure,l);return c+(d.dir>0?u:1-u)},0)/Math.max(1,i.length);return e.map(i=>{const l=hr(i);let c=0;for(const u of t.tags)c+=i.tags.includes(u)?2:l.has(u)?1:0;t.wants.length&&(c+=2*o(t.wants,i.id));const d=ry[i.role];for(const u of[...oy,...d?[{measure:"centroid",dir:d,weight:iy}]:[]])n.has(u.measure)||(c+=2*u.weight*o([u],i.id));for(const u of t.softTags)i.tags.includes(u)&&(c+=.4);return{sound:i,score:c}})}const ac=(e,t)=>t.score-e.score||e.sound.title.localeCompare(t.sound.title)||e.sound.id.localeCompare(t.sound.id);function gs(e,t,n,a){let s=e.sounds.filter(o=>!a.has(o.id)&&(!t.length||t.includes(o.role)));if(n.length){const o=s.filter(i=>{const l=hr(i);return n.some(c=>i.tags.includes(c)||l.has(c))});o.length&&(s=o)}return s}function mr(e,t){const n=[...e].sort(ac),a=[],s=new Map;for(const o of n){if(a.length>=t)break;const i=s.get(o.sound.instrument)??0;i>=Jb||(s.set(o.sound.instrument,i+1),a.push(o))}for(const o of n){if(a.length>=t)break;a.includes(o)||a.push(o)}return a.sort(ac)}function ly(e,t){if(!t)return e;const n=e.filter(a=>a.role==="hat"&&la(a)===t);return n.length?n:e}function cy(e,t,n={}){const a=t.kind&&!t.roles.length?["hat"]:t.roles,s=ly(gs(e,a,t.tags,n.exclude??new Set),t.kind);return mr(fr(s,t),n.limit??Du)}const dy=[{key:"kick",label:"Kick",role:"kick",nearest:["tom","perc"]},{key:"snare",label:"Snare",role:"snare",nearest:["clap","perc"]},{key:"clap",label:"Clap",role:"clap",nearest:["snare","perc"]},{key:"closed-hat",label:"Closed hat",role:"hat",tag:"closed",nearest:["perc","cymbal"]},{key:"open-hat",label:"Open hat",role:"hat",tag:"open",nearest:["cymbal","perc"]},{key:"tom",label:"Tom",role:"tom",nearest:["perc","kick"]},{key:"perc",label:"Perc",role:"perc",nearest:["tom","tonal"]},{key:"fx",label:"FX",role:"fx",nearest:["tonal","cymbal","perc"]}];function la(e){if(e.tags.includes("closed"))return"closed";if(e.tags.includes("open"))return"open";const t=e.title.toLowerCase();return/\bclose[d]?\b|hitc\b/.test(t)?"closed":/\bopen\b|hito\b/.test(t)?"open":""}function uy(e,t,n,a){const s=gs(e,[t.role],n.tags,a);if(t.tag){const o=s.filter(l=>la(l)===t.tag);if(o.length)return{list:o,role:t.role,kindMissing:!1};const i=s.filter(l=>la(l)==="");if(i.length)return{list:i,role:t.role,kindMissing:!0}}else if(s.length)return{list:s,role:t.role,kindMissing:!1};for(const o of t.nearest){const i=gs(e,[o],n.tags,a);if(i.length)return{list:i,role:o,kindMissing:!1}}return{list:[],role:t.role,kindMissing:!1}}const py={kick:"a kick",snare:"a snare",clap:"a clap",hat:"a hat",tom:"a tom",perc:"a percussion sound",cymbal:"a cymbal",fx:"an effect",tonal:"a tonal sound"};function sc(e,t){const n=t.wants.some(o=>o.measure==="level")?t:{...t,wants:[...t.wants,{measure:"level",dir:1}]},a=new Set,s=[];for(const o of dy){const{list:i,role:l,kindMissing:c}=uy(e,o,n,a),d=mr(fr(i,n),1)[0];if(!d)continue;a.add(d.sound.id);const u=l!==o.role?`No ${o.label.toLowerCase()} in the Library: ${py[l]} instead.`:c?`No ${o.label.toLowerCase()} labelled as one: the nearest hat instead.`:void 0;s.push({slot:o,sound:d.sound,...u?{note:u}:{}})}return s}const gr="your local Library";function Rs(e,t){return{id:e.id,title:e.title,role:e.role,creator:e.creator,creatorLink:e.creatorLink,license:e.license,licenseUrl:e.licenseUrl,source:e.source,audio:e.audio,sha256:e.sha256,gainDb:e.measures.gain,curator:e.origin==="local"?gr:yn,query:t.trim().slice(0,120),kind:e.role==="hat"?la(e):"",origin:e.origin,licenseStatus:e.licenseStatus}}function hy(e){if(!e||typeof e!="object"||Array.isArray(e))return null;const t=e,n=V(t.id,160),a=V(t.title,160),s=V(t.license,40),o=V(t.sha256,64).toLowerCase();if(!n||!a||!s)return null;const i=cr.includes(t.role)?t.role:"perc",l=t.kind==="closed"||t.kind==="open"?t.kind:"",c=t.origin==="local"?"local":"shelf",d=V(t.licenseStatus,20),u=c==="local"?_u(V(t.audio,600))?V(t.audio,600):"":Oe(t.audio);return{id:n,title:a,role:i,creator:V(t.creator,120)||"Unknown",creatorLink:Oe(t.creatorLink),license:s,licenseUrl:Oe(t.licenseUrl)||ur(s),source:Oe(t.source),audio:u,sha256:dr.test(o)?o:"",gainDb:Math.max(-60,Math.min(60,Le(t.gainDb))),curator:V(t.curator,80)||(c==="local"?gr:yn),query:V(t.query,120),kind:l,origin:c,licenseStatus:c==="local"&&Bu.includes(d)?d:c==="local"?"unknown":""}}function fy(e,t,n=new Set,a=3){const s=bi(t.query,e),o=new Set([...n,t.id]);let i=gs(e,[t.role],s.tags,o);if(t.role==="hat"&&t.kind){const l=i.filter(c=>la(c)===t.kind);l.length&&(i=l)}return mr(fr(i,{...s,roles:[t.role]}),a)}function Wu(e){const t=new Map;return e.forEach((n,a)=>{const s=n.provenance;if(!s)return;const o=t.get(s.id);o?o.pads.push(a+1):t.set(s.id,{...s,pads:[a+1]})}),[...t.values()]}function my(e){return["shelf","local"].map(n=>({origin:n,credits:e.filter(a=>(a.origin??"shelf")===n)})).filter(n=>n.credits.length)}const gy=-14,by=-1,Yu=24,yy=.05,vy=-80,oc=e=>e>0?20*Math.log10(e):Number.NEGATIVE_INFINITY;function wy(e,t){const n=e[0]?.length??0,a=e.length;if(!n||!a)return{hit:Number.NEGATIVE_INFINITY,peak:Number.NEGATIVE_INFINITY};const s=Math.max(1,Math.round(yy*t)),o=new Float64Array(n);let i=0;for(let d=0;d<n;d++){let u=0;for(const h of e){const p=h[d]??0;u+=p;const f=p<0?-p:p;f>i&&(i=f)}u/=a,o[d]=u*u}let l=0,c=0;for(let d=0;d<n;d++)l+=o[d]??0,d>=s&&(l-=o[d-s]??0),l>c&&(c=l);return{hit:oc(Math.sqrt(Math.max(0,c)/s)),peak:oc(i)}}function xy(e){if(!Number.isFinite(e.hit)||e.hit<vy)return 0;let t=Math.min(gy-e.hit,Yu);Number.isFinite(e.peak)&&(t=Math.min(t,by-e.peak));const n=Math.round(t*10)/10;return n===0?0:n}function Mn(e,t){return{on:!0,gainDb:xy(wy(e,t))}}const ky=Object.freeze({on:!0,gainDb:0});function ic(e){return e.normalize?e.normalize.on:e.provenance!==null}function $y(e){const t=e.normalize;return t?t.on?t.gainDb:e.provenance?-e.provenance.gainDb:0:0}function Sy(e){const t=$y(e);return t===0?1:10**(t/20)}function Ey(e){if(!e||typeof e!="object"||Array.isArray(e))return null;const t=e;if(typeof t.on!="boolean")return null;const n=t.gainDb;return typeof n!="number"||!Number.isFinite(n)||n<-60||n>Yu?null:{on:t.on,gainDb:n}}function Ay(e){const t=Math.round(e*10)/10;return t===0?"0.0 dB":`${t>0?"+":"−"}${Math.abs(t).toFixed(1)} dB`}const My="nyx-limiter",br={knee:.6,ceiling:.944,range:4,points:8193};function Ly(e,{knee:t,ceiling:n}=br){const a=Math.abs(e);if(a<=t)return e;const s=n-t;return Math.sign(e)*(t+s*Math.tanh((a-t)/s))}function Ty({range:e,points:t}=br){const n=new Float32Array(t);for(let a=0;a<t;a++)n[a]=Ly((2*a/(t-1)-1)*e);return n}function Cy(e){const t=e.createGain();t.gain.value=1/br.range;const n=e.createWaveShaper();return n.curve=Ty(),n.oversample="none",t.connect(n),{input:t,output:n}}const ca=6,Te=-60,_t=.75,Uu=1.6;function Ny(e){return!Number.isFinite(e)||e<=Te?0:10**(Math.min(ca,e)/20)}function Fy(e){return!Number.isFinite(e)||e<=Te?0:e>=0?_t+(1-_t)*(Math.min(e,ca)/ca):_t*((e-Te)/-Te)**Uu}function Py(e){const t=Math.min(1,Math.max(0,Number.isFinite(e)?e:0));let n;if(t>=_t)n=(t-_t)/(1-_t)*ca;else{if(t<=0)return Te;n=Te+-Te*(t/_t)**(1/Uu)}const a=Math.round(n*10)/10;return a<=Te+.05?Te:Math.abs(a)<.25?0:a}function zy(e){if(!Number.isFinite(e)||e<=Te)return"−∞";const t=Math.round(e*10)/10;return t===0?"0.0 dB":`${t>0?"+":"−"}${Math.abs(t).toFixed(1)} dB`}const un=[[0,.4],[-1.94,0],[-6.02,-2.2],[-12.04,-7.7],[-20,-15.7]];function Oy(e){if(!Number.isFinite(e)||e<=0)return Te;const t=20*Math.log10(Math.min(1,e)),n=un[0];if(t>=n[0])return n[1];for(let o=1;o<un.length;o++){const[i,l]=un[o],[c,d]=un[o-1];if(t>=i)return Math.round((d+(t-c)*(l-d)/(i-c))*10)/10}const[a,s]=un[un.length-1];return Math.max(Te,Math.round((t-a+s)*10)/10)}const Dy=.8,vn=["free","1/16","1/8","1/4","1/2","1","2","4","8"],By={free:0,"1/16":.25,"1/8":.5,"1/4":1,"1/2":2,1:4,2:8,4:16,8:32},Ry=e=>e==="hit"||vn.includes(e),Ku=.5,yr=.01;function Bt(e){return e==="hit"?"To a hit":e==="free"?"Free":e.includes("/")?e:e==="1"?"1 bar":`${e} bars`}const Xu=[{id:"lfo",label:"NYX LFO",group:"nyx"},{id:"aria:phone-tilt-x",label:"Tilt X",group:"aria"},{id:"aria:phone-tilt-y",label:"Tilt Y",group:"aria"},{id:"aria:phone-heading",label:"Heading",group:"aria"},{id:"aria:phone-shake",label:"Shake",group:"aria"},{id:"aria:energy",label:"Ground Energy",group:"aria"}],rc=e=>typeof e=="string"&&Xu.some(t=>t.id===e),ko=e=>!!e&&e.startsWith("aria:"),Gu=["sine","triangle","step"],Vu=[.25,.5,1,2,4,8,16],Qa=2,Qu=3,da=16;function vr(){return{startSource:null,startAmount:.5,lengthSource:null,lengthSteps:1,lfoBars:4,lfoShape:"sine"}}const et=(e,t,n)=>e<t?t:e>n?n:e,lc=e=>typeof e=="number"&&Number.isFinite(e);function Iy(e){const t=vr();if(typeof e!="object"||e===null)return t;const n=e;return{startSource:rc(n.startSource)?n.startSource:null,startAmount:lc(n.startAmount)?et(n.startAmount,0,Qa):t.startAmount,lengthSource:rc(n.lengthSource)?n.lengthSource:null,lengthSteps:lc(n.lengthSteps)?et(Math.round(n.lengthSteps),1,Qu):t.lengthSteps,lfoBars:Vu.includes(n.lfoBars)?n.lfoBars:t.lfoBars,lfoShape:Gu.includes(n.lfoShape)?n.lfoShape:t.lfoShape}}const ua=e=>!e.startSource&&!e.lengthSource;function wn(){return{aria:!1,tiltX:0,tiltY:0,heading:0,energy:.5,shakes:0,shakeRun:0,shakeBeat:Number.NEGATIVE_INFINITY}}function qy(e,t){const n=t-e.shakeBeat<=da?e.shakeRun+1:1;return{...e,shakes:e.shakes+1,shakeRun:n,shakeBeat:t}}function Ju(e){let t=(Math.imul(e|0,2654435761)^2246822507)>>>0;return t=Math.imul(t^t>>>16,2146121005)>>>0,t=Math.imul(t^t>>>15,2221713035)>>>0,t=(t^t>>>16)>>>0,t/4294967295*2-1}function _y(e,t){const n=Math.max(.25,e.lfoBars)*4,a=t/n,s=a-Math.floor(a);return e.lfoShape==="triangle"?s<.5?-1+4*s:3-4*s:e.lfoShape==="step"?Ju(Math.floor(a)):Math.sin(2*Math.PI*s)}function wr(e,t,n,a){if(e==="lfo")return _y(t,a);if(!n.aria)return 0;switch(e){case"aria:phone-tilt-x":return et(n.tiltX,-1,1);case"aria:phone-tilt-y":return et(n.tiltY,-1,1);case"aria:phone-heading":return et(n.heading,0,1)*2-1;case"aria:energy":return et(n.energy,0,1)*2-1;case"aria:phone-shake":return n.shakes>0?Ju(n.shakes):0}return 0}function yi(e,t,n){return e.startSource?wr(e.startSource,e,t,n)*e.startAmount:0}function vi(e,t,n){const a=e.lengthSource;return a?a==="aria:phone-shake"?!t.aria||t.shakeRun<=0||n-t.shakeBeat>da?0:-Math.min(t.shakeRun,e.lengthSteps):Math.round(wr(a,e,t,n)*e.lengthSteps):0}function wi(e,t,n){const a=e?.lengthSource;if(!e||!a)return 1;if(a==="aria:phone-shake")return!t.aria||t.shakeRun<=0||n-t.shakeBeat>da?1:1+Math.min(t.shakeRun,e.lengthSteps);const s=wr(a,e,t,n);return 1+Math.round((et(s,-1,1)+1)/2*e.lengthSteps)}function Qn(e,t){if(e==="free"||!t)return e;const n=et(vn.indexOf(e)+t,1,vn.length-1);return vn[n]??e}function Zu(e,t){let n=t,a=Number.POSITIVE_INFINITY;for(const s of e){const o=Math.abs(s-t);o<a&&(a=o,n=s)}return n}function xr(e,t,n,a){let s=0;for(const o of e)if(o>t+a&&(s++,s>=Math.max(1,n)))return o;return null}function Hy(e,t,n){if(!e?.length)return null;const a=Zu(e,t);return Math.abs(a-t)<=n?a:null}function bs(e,t,n,a){return By[e]*60/Math.max(1,t)*n*Math.max(.001,a)}function jy(e,t,n,a){const{frames:s,sampleRate:o}=e,i=e.mod,l=i?yi(i,t,n):0,c=Math.max(0,s-2),d=e.hits?.length?e.hits:null;let u=et(Math.round(e.start+l*o),0,c);e.land&&d&&i?.startSource&&(u=et(Zu(d,u),0,c));let h,p=!1,f;if(e.grid==="hit")if(f="hit",d){const g=wi(i,t,n);h=xr(d,u,g,yr*o)??s}else h=e.end+(u-e.start);else f=i?Qn(e.grid,vi(i,t,n)):e.grid,f==="free"?h=e.end+(u-e.start):h=u+Math.round(bs(f,a,o,e.rate));return h>s&&(h=s,p=f!=="free"&&f!=="hit"),h<u+2&&(h=Math.min(s,u+2)),{from:u,to:h,grid:f,shift:l,clamped:p}}const xi=["C","C♯","D","E♭","E","F","F♯","G","A♭","A","B♭","B"],Gt=21,Vt=108,Wy=4,ki=60,ep=.25,Yy=4,pa=80,cc=[16,32,48,64,80,96,112,127],Ht=e=>Math.max(1,Math.min(127,Math.round(Number.isFinite(e)?e:pa)));function $o(e){return $i[Math.max(0,Math.min(7,Math.round(e/16)-1))]}function So(e,t){const n=Ht(e);return t>0?cc.find(a=>a>n)??n:[...cc].reverse().find(a=>a<n)??n}function Uy(e){const t=Math.max(0,Math.min(1,Number.isFinite(e)?e:.5));return Ht(1+126*t)}function Ky(e,t){const n=[...new Set(e.filter(a=>a.lo<=t.key&&a.hi>=t.key).map(a=>a.lv))].sort((a,s)=>a-s);return n.includes(t.lv)||n.push(t.lv),n.sort((a,s)=>a-s),{layer:n.indexOf(t.lv)+1,of:n.length}}function je(e){const t=Math.round(e);return`${xi[(t%12+12)%12]}${Math.floor(t/12)-1}`}const Xy={c:0,d:2,e:4,f:5,g:7,a:9,b:11};function Ja(e){const t=e.trim();if(/^\d{1,3}$/.test(t)){const i=Number(t);return i>=0&&i<=127?i:null}const n=/^([a-gA-G])(#|♯|b|♭|s)?(-?\d)$/.exec(t);if(!n)return null;const a=Xy[n[1].toLowerCase()],s=n[2]==="#"||n[2]==="♯"||n[2]==="s"?1:n[2]==="b"||n[2]==="♭"?-1:0,o=(Number(n[3])+1)*12+a+s;return o>=0&&o<=127?o:null}const $i=["ppp","pp","p","mp","mf","f","ff","fff"];function Gy(e){const n=e.replace(/\.[^.]+$/,"").split(/[_\-\s.,()[\]]+/).filter(Boolean);let a=null,s=null,o=null,i=null;for(const l of n){const c=l,d=c.toLowerCase(),u=/^rr(\d{1,2})$/.exec(d);if(u){o=Number(u[1]);continue}const h=$i.indexOf(d);if(h>=0&&c.length<=3){s={label:d,rank:h*2+1};continue}const p=/^(?:v|vel|velocity)(\d{1,3})$/.exec(d);if(p){s={label:`v${Number(p[1])}`,rank:Number(p[1])};continue}const f=/^([a-gA-G](?:#|♯|b|♭|s)?-?\d)(v\d{1,3}|ppp|pp|p|mp|mf|f|ff|fff)$/.exec(c);if(f&&a===null){a=Ja(f[1]);const g=f[2].toLowerCase(),w=$i.indexOf(g);s=w>=0?{label:g,rank:w*2+1}:{label:`v${Number(g.slice(1))}`,rank:Number(g.slice(1))};continue}if(a===null&&/^[A-G](#|♯|b|♭|s)?-?\d$/.test(c)){a=Ja(c);continue}if(a===null&&/^[a-g](#|♯|b|♭)?-?\d$/.test(c)){a=Ja(c);continue}if(/^\d{2,3}$/.test(c)){const g=Number(c);g>=Gt&&g<=Vt&&i===null&&(i=g)}}return a===null&&i!==null&&(a=i),{key:a,layer:s,rr:o}}const Vy=new Set(["sample","lokey","hikey","key","pitch_keycenter","lovel","hivel","tune","transpose","volume","loop_mode","loopmode","loop_start","loopstart","loop_end","loopend","ampeg_release","seq_length","seq_position","default_path","trigger"]);function Ra(e){return e===void 0?null:Ja(e.trim())}function Qy(e){const t=[],n=new Map,a=new Set;let s=e.replace(/\/\*[\s\S]*?\*\//g," ");s=s.split(/\r?\n/).map(c=>{const d=c.indexOf("//");if(d>=0){const u=c.slice(d+2).trim();return u&&t.push(u),c.slice(0,d)}return c}).map(c=>{const d=/^\s*#define\s+(\$\w+)\s+(.+?)\s*$/.exec(c);return d?(n.set(d[1],d[2]),""):/^\s*#include/.test(c)?(a.add("#include"),""):c}).join(`
`);for(const[c,d]of n)s=s.split(c).join(d);const o={control:{},global:{},master:{},group:{}},i=[],l=s.split(/<(\w+)>/);for(let c=1;c<l.length;c+=2){const d=l[c].toLowerCase(),u=Jy(l[c+1]??"");if(d==="control")o.control=u;else if(d==="global")o.global=u,o.master={},o.group={};else if(d==="master")o.master=u,o.group={};else if(d==="group")o.group=u;else if(d==="region"){const h={...o.global,...o.master,...o.group,...u};for(const x of Object.keys(h))Vy.has(x)||a.add(x);const p=(h.trigger??"attack").toLowerCase();if(p==="release"||p==="release_key"||!h.sample)continue;const f=o.control.default_path??"",g=Ra(h.key);let w=Ra(h.lokey)??g??0,m=Ra(h.hikey)??g??127;const b=Ra(h.pitch_keycenter)??g??60;w>m&&([w,m]=[m,w]);const v=(h.loop_mode??h.loopmode??"").toLowerCase(),y=x=>x!==void 0&&Number.isFinite(Number(x))?Number(x):null;i.push({sample:(f+h.sample).replace(/\\/g,"/"),lokey:w,hikey:m,center:b,lovel:Math.max(1,Math.min(127,y(h.lovel)??1)),hivel:Math.max(1,Math.min(127,y(h.hivel)??127)),tune:(y(h.tune)??0)+(y(h.transpose)??0)*100,volume:y(h.volume)??0,loopMode:v==="loop_continuous"?"continuous":v==="loop_sustain"?"sustain":"none",loopStart:y(h.loop_start??h.loopstart),loopEnd:y(h.loop_end??h.loopend),release:y(h.ampeg_release),seqLength:Math.max(1,Math.round(y(h.seq_length)??1)),seqPosition:Math.max(1,Math.round(y(h.seq_position)??1))})}}return{regions:i,comments:t,unsupported:[...a].sort()}}function Jy(e){const t={},n=/([A-Za-z_][\w]*)=/g,a=[];let s=n.exec(e);for(;s;)a.push({name:s[1].toLowerCase(),at:s.index,end:s.index+s[0].length}),s=n.exec(e);for(let o=0;o<a.length;o++){const i=a[o],l=o+1<a.length?a[o+1].at:e.length;let c=e.slice(i.end,l);c=i.name==="sample"||i.name==="default_path"?c.trim():c.trim().split(/\s+/)[0]??"",t[i.name]=c}return t}function sa(e){return[...new Set(e.filter(t=>t.key!==null).map(t=>t.rank))].sort((t,n)=>t-n)}function Zy(e,t){const n=Math.max(1,Math.min(e.length,Math.round(t)));if(n>=e.length)return[...e];if(n===1)return[e[Math.round((e.length-1)*.6)]];const a=[];for(let s=0;s<n;s++)a.push(e[Math.round(s*(e.length-1)/(n-1))]);return[...new Set(a)]}function tp(e,t,n){const a=e.filter(c=>c.key!==null&&t.includes(c.rank)),s=[...t].sort((c,d)=>c-d),o=c=>{const d=s.indexOf(c),u=d<=0?1:Math.floor(d*127/s.length)+1,h=d>=s.length-1?127:Math.floor((d+1)*127/s.length);return[u,h]},i=[],l=new Map;for(const c of a){const d=`${c.rank}|${c.key}`;l.set(d,Math.max(l.get(d)??0,c.rr))}for(const c of s){const d=a.filter(f=>f.rank===c),u=[...new Set(d.map(f=>f.key))].sort((f,g)=>f-g),[h,p]=o(c);for(const f of d){const g=f.region,w=f.key;let m,b;if(g&&!(f.source==="you"||f.source==="heard"))m=g.lokey,b=g.hikey;else{const v=u.indexOf(w);m=v<=0?Gt:Math.floor((u[v-1]+w)/2)+1,b=v>=u.length-1?Vt:Math.floor((w+u[v+1])/2)}i.push({s:n(f),key:g&&f.source==="sfz"?g.center:w,lo:m,hi:b,lv:h,hv:p,rr:g&&g.seqLength>1?g.seqPosition:Math.max(1,f.rr),of:g&&g.seqLength>1?g.seqLength:Math.max(1,l.get(`${f.rank}|${f.key}`)??1),tune:g?.tune??0,gain:g?.volume??0,loop:g&&g.loopMode!=="none"&&g.loopStart!==null&&g.loopEnd!==null&&g.loopEnd>g.loopStart?[g.loopStart,g.loopEnd]:null,release:g?.release??ep})}}return i}function e0(e,t,n,a=0){if(!e.length)return null;const s=Math.max(1,Math.min(127,Math.round(n)));let o=e.filter(l=>t>=l.lo&&t<=l.hi&&s>=l.lv&&s<=l.hv);if(o.length||(o=e.filter(l=>t>=l.lo&&t<=l.hi)),!o.length){let l=Number.POSITIVE_INFINITY;for(const d of e)l=Math.min(l,Math.abs(d.key-t));o=e.filter(d=>Math.abs(d.key-t)===l);const c=Math.min(...o.map(d=>Math.min(Math.abs(d.lv-s),Math.abs(d.hv-s))));o=o.filter(d=>Math.min(Math.abs(d.lv-s),Math.abs(d.hv-s))===c)}const i=Math.max(...o.map(l=>l.of));if(i>1){const l=a%i+1,c=o.filter(d=>d.rr===l);c.length&&(o=c)}return o[0]??null}function t0(e,t){return t-e.key+e.tune/100}function n0(e){const t=new Map;for(let n=Gt;n<=Vt;n++){const a=e.filter(o=>n>=o.lo&&n<=o.hi);if(!a.length){t.set(n,"silent");continue}const s=Math.min(...a.map(o=>Math.abs(o.key-n)));t.set(n,s===0?"sampled":s<=Wy?"near":"far")}return t}function a0(e,t){return e*t*4}function s0(e,t,n){let a=0;for(const s of e)s.frames&&s.channels&&s.rate?a+=a0(s.frames*t/s.rate,s.channels):a+=s.bytes*(n[s.ext]??n.default??4);return Math.round(a)}function dc(e){const t=e/1048576;return t>=100?`${Math.round(t)} MB`:`${t.toFixed(t>=10?0:1)} MB`}function np(e){if(e.byteLength<44)return null;const t=new DataView(e),n=l=>String.fromCharCode(t.getUint8(l),t.getUint8(l+1),t.getUint8(l+2),t.getUint8(l+3));if(n(0)!=="RIFF"||n(8)!=="WAVE")return null;let a=12,s=0,o=0,i=0;for(;a+8<=e.byteLength;){const l=n(a),c=t.getUint32(a+4,!0);if(l==="fmt ")s=t.getUint16(a+10,!0),o=t.getUint32(a+12,!0),i=t.getUint16(a+22,!0);else if(l==="data")return!s||!i?null:{frames:Math.floor(c/(s*(i/8))),channels:s,rate:o};a+=8+c+c%2}return null}const Is={major:[0,2,4,5,7,9,11],minor:[0,2,3,5,7,8,10],dorian:[0,2,3,5,7,9,10],pentatonic:[0,3,5,7,10],chromatic:[0,1,2,3,4,5,6,7,8,9,10,11]},uc={major:"Major",minor:"Minor",dorian:"Dorian",pentatonic:"Pentatonic",chromatic:"Chromatic"};function o0(e,t,n,a){const s=Is[t],o=Math.floor(a/s.length),i=(a%s.length+s.length)%s.length;return(n+1)*12+e+o*12+s[i]}function i0(e,t,n,a){const s=[],o=Is[t].length,i=a==="scale"?4:t==="chromatic"?5:o===5?2:3;for(let l=0;l<4;l++)for(let c=0;c<4;c++)s.push(o0(e,t,n,l*i+c));return s}function r0(e){return`${je(Math.min(...e))}–${je(Math.max(...e))}`}const l0=[["",[0,4,7]],["m",[0,3,7]],["dim",[0,3,6]],["aug",[0,4,8]],["sus2",[0,2,7]],["sus4",[0,5,7]],["7",[0,4,7,10]],["maj7",[0,4,7,11]],["m7",[0,3,7,10]],["mMaj7",[0,3,7,11]],["m7♭5",[0,3,6,10]],["dim7",[0,3,6,9]],["6",[0,4,7,9]],["m6",[0,3,7,9]],["add9",[0,2,4,7]],["madd9",[0,2,3,7]],["9",[0,2,4,7,10]],["maj9",[0,2,4,7,11]],["m9",[0,2,3,7,10]],["7sus4",[0,5,7,10]],["5",[0,7]]],pc=["C","C♯","D","E♭","E","F","F♯","G","A♭","A","B♭","B"];function c0(e){const t=[...new Set(e.map(o=>Math.round(o)))].sort((o,i)=>o-i);if(t.length<2)return null;const n=[...new Set(t.map(o=>(o%12+12)%12))];if(n.length<2)return null;const a=(t[0]%12+12)%12;let s=null;for(const o of n){const i=n.map(l=>(l-o+12)%12).sort((l,c)=>l-c);for(const[l,c]of l0){if(c.length!==i.length||!c.every((h,p)=>h===i[p]))continue;const d=`${pc[o]}${l}${o===a?"":`/${pc[a]}`}`,u=(o===a?0:1)+(l.length>3?.5:0);(!s||u<s.score)&&(s={name:d,score:u})}}return s?.name??null}const d0=30*Math.log10(.8/(pa/127)),ue=(e,t,n,a)=>typeof e=="number"&&Number.isFinite(e)?Math.min(n,Math.max(t,e)):a,u0=/^[0-9a-f]{16,64}$/;function p0(e){const t=e&&typeof e=="object"?e:null;if(!t||typeof t.s!="string"||!u0.test(t.s))return null;const n=Array.isArray(t.loop)&&t.loop.length===2?t.loop.map(a=>ue(a,0,1e9,0)):null;return{s:t.s,key:Math.round(ue(t.key,0,127,60)),lo:Math.round(ue(t.lo,0,127,0)),hi:Math.round(ue(t.hi,0,127,127)),lv:Math.round(ue(t.lv,1,127,1)),hv:Math.round(ue(t.hv,1,127,127)),rr:Math.round(ue(t.rr,1,64,1)),of:Math.round(ue(t.of,1,64,1)),tune:ue(t.tune,-4800,4800,0),gain:ue(t.gain,-96,24,0),loop:n&&n[1]>n[0]?[n[0],n[1]]:null,release:ue(t.release,.005,20,ep)}}function ap(e){const t=e&&typeof e=="object"?e:null;if(!t)return null;const n=(Array.isArray(t.zones)?t.zones:[]).map(p0).filter(s=>!!s);if(!n.length)return null;const a=Object.keys(Is).includes(t.scale)?t.scale:"minor";return{name:typeof t.name=="string"?t.name.slice(0,80):"Instrument",credit:typeof t.credit=="string"?t.credit.slice(0,200):"",zones:n,layers:Math.round(ue(t.layers,1,64,1)),layersFound:Math.round(ue(t.layersFound,1,64,1)),poly:t.poly!==!1,glideMs:ue(t.glideMs,0,2e3,ki),root:Math.round(ue(t.root,0,11,0)),scale:a,rows:t.rows==="fourth"?"fourth":"scale",octave:Math.round(ue(t.octave,0,7,3)),gainDb:ue(ue(t.gainDb,-48,48,0)+(t.velocity===void 0?d0:0),-48,48,0),velocity:Ht(ue(t.velocity,1,127,pa)),padVelocity:t.padVelocity==="keys"?"keys":"position"}}const ne=16,he=16,Ln=10,Si=["1","2","3","4","5","6","7","8","9","0"],sp=[0,2,4,8,16],op=[0,1,2,4,8],ys=["always","1:2","2:2","1:3","2:3","3:3","1:4","2:4","3:4","4:4","1:5","2:5","3:5","4:5","5:5","1:6","2:6","3:6","4:6","5:6","6:6","1:7","2:7","3:7","4:7","5:7","6:7","7:7","1:8","2:8","3:8","4:8","5:8","6:8","7:8","8:8","fill","!fill","pre","!pre"],vs={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}};function ot(e){return{name:`Pad ${e+1}`,sample:null,mode:"oneshot",dir:"fwd",start:0,end:1,slices:0,cuts:[],tune:0,fine:0,fit:0,fitSpan:null,keepPitch:!0,attack:0,decay:4,cutoff:0,resonance:0,levelDb:0,pan:0,choke:0,provenance:null,rights:null,normalize:null,offsetDb:0,follow:null,note:0,retrigger:"cut",length:"free",hitSense:Ku,landOnHits:!1,mod:vr()}}function ha(e){return!e.sample||e.fit>0?!1:e.follow??e.provenance?.role==="tonal"}function h0(e,t){const n=/^(\d):(\d)$/.exec(e.cond);return!e.on||!n?{}:{mark:n[1],markLabel:`${t===he?"bar":"pass"} ${n[1]} of ${n[2]}`}}function Ea(){return{on:!1,accent:!1,velocity:.8,chance:1,slice:null,pitch:0,reverse:!1,cond:"always"}}function qs(){return{length:he,mute:!1,solo:!1,steps:Array.from({length:he},Ea)}}function ip(){return{filter:{on:!0,mode:"lp",cutoff:1,resonance:.15},drive:structuredClone(vs.drive),compressor:structuredClone(vs.compressor)}}function Ei(){return{v:1,pads:Array.from({length:ne},(e,t)=>ot(t)),lanes:Array.from({length:ne},qs),swing:.5,hacks:ip(),slots:Array.from({length:Ln},()=>null),active:null,selected:0,master:1,mode:"pads",inst:null}}const pt=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{},pe=(e,t,n,a)=>typeof e=="number"&&Number.isFinite(e)?Math.min(n,Math.max(t,e)):a,dt=(e,t,n,a)=>Math.round(pe(e,t,n,a)),Tt=(e,t)=>typeof e=="boolean"?e:t,ws=(e,t,n)=>t.includes(e)?e:n,Wn=/^[0-9a-f]{16,64}$/,f0=1e-6;function m0(e,t){const n=pt(e),a=ot(t);let s=pe(n.start,0,1,0),o=pe(n.end,0,1,1);o-s<f0&&([s,o]=[0,1]);const i=sp.includes(n.slices)?n.slices:0,l=typeof n.cuts=="string"&&n.cuts.length<=lp?n.cuts.split(" ").map(Number):n.cuts,c=Array.isArray(l)?l.filter(d=>typeof d=="number"&&d>0&&d<1).sort((d,u)=>d-u).slice(0,15):[];return{name:typeof n.name=="string"&&n.name.trim()?n.name.trim().slice(0,24):a.name,sample:typeof n.sample=="string"&&Wn.test(n.sample)?n.sample:null,mode:ws(n.mode,["oneshot","gate","loop"],a.mode),dir:ws(n.dir,["fwd","rev","pingpong"],a.dir),start:s,end:o,slices:i,cuts:i?c:[],tune:dt(n.tune,-24,24,0),fine:dt(n.fine,-100,100,0),fit:op.includes(n.fit)?n.fit:0,fitSpan:T0(n.fitSpan),keepPitch:Tt(n.keepPitch,!0),attack:pe(n.attack,0,.1,a.attack),decay:pe(n.decay,.01,4,a.decay),cutoff:pe(n.cutoff,-1,1,0),resonance:pe(n.resonance,0,1,0),levelDb:typeof n.levelDb=="number"&&Number.isFinite(n.levelDb)?pe(n.levelDb,Te,ca,a.levelDb):typeof n.level=="number"?Oy(pe(n.level,0,1,.8)):a.levelDb,pan:pe(n.pan,-1,1,0),choke:dt(n.choke,0,4,0),provenance:typeof n.sample=="string"&&Wn.test(n.sample)?hy(n.provenance):null,rights:typeof n.sample=="string"&&Wn.test(n.sample)&&n.rights==="unknown"?"unknown":null,normalize:typeof n.sample=="string"&&Wn.test(n.sample)?Ey(n.normalize):null,offsetDb:typeof n.sample=="string"&&Wn.test(n.sample)?pe(n.offsetDb,-24,0,0):0,follow:typeof n.follow=="boolean"?n.follow:null,note:dt(n.note,0,11,0),retrigger:n.retrigger==="finish"?"finish":"cut",length:Ry(n.length)?n.length:"free",hitSense:pe(n.hitSense,0,1,Ku),landOnHits:n.landOnHits===!0,mod:Iy(n.mod)}}function g0(e){const t=pt(e);return{on:Tt(t.on,!1),accent:Tt(t.accent,!1),velocity:pe(t.velocity,0,1,.8),chance:pe(t.chance,0,1,1),slice:t.slice===null||t.slice===void 0?null:dt(t.slice,0,15,0),pitch:dt(t.pitch,-12,12,0),reverse:Tt(t.reverse,!1),cond:ws(t.cond,ys,"always")}}function b0(e){const t=pt(e),n=Array.isArray(t.steps)?t.steps:typeof t.steps=="string"?E0(t.steps):[];return{length:dt(t.length,1,he,he),mute:Tt(t.mute,!1),solo:Tt(t.solo,!1),steps:Array.from({length:he},(a,s)=>g0(n[s]))}}function hc(e,t){const n=pt(e),a={...t.dials};for(const[s,o]of Object.entries(pt(n.dials)))s in t.dials&&typeof o=="number"&&Number.isFinite(o)&&(a[s]=o);return{on:Tt(n.on,t.on),dials:a}}function y0(e){const t=pt(e),n=pt(t.filter),a=ip();return{filter:{on:Tt(n.on,a.filter.on),mode:ws(n.mode,["lp","hp","bp"],a.filter.mode),cutoff:pe(n.cutoff,0,1,a.filter.cutoff),resonance:pe(n.resonance,0,1,a.filter.resonance)},drive:hc(t.drive,vs.drive),compressor:hc(t.compressor,vs.compressor)}}function xs(e){const t=pt(e),n=Array.isArray(t.pads)?t.pads:[],a=Array.isArray(t.lanes)?t.lanes:[];return{pads:Array.from({length:ne},(s,o)=>m0(n[o],o)),lanes:Array.from({length:ne},(s,o)=>b0(a[o])),swing:pe(t.swing,.5,.75,.5),hacks:y0(t.hacks)}}function rp(e){const t=pt(e);if(t.v!==1)return Ei();const n=Array.isArray(t.slots)?t.slots:[],a=xs(t),s=Array.from({length:Ln},(i,l)=>n[l]?xs(n[l]):null),o=t.active===null?null:dt(t.active,0,Ln-1,-1);return{v:1,...a,slots:s,active:o!==null&&o>=0&&s[o]?o:null,selected:dt(t.selected,0,ne-1,0),master:pe(t.master,0,1,1),mode:t.mode==="instrument"?"instrument":"pads",inst:ap(t.inst)}}function kr(e,t){return structuredClone({index:t,pad:e.pads[t]??ot(t),lane:e.lanes[t]??qs()})}function v0(e,t){const n=structuredClone(t);e.pads[n.index]=n.pad,e.lanes[n.index]=n.lane}function _s(e,t){const n=(o,i)=>o.index??i,a=t.map((o,i)=>kr(e,n(o,i))),s=t.map((o,i)=>o.hat?e.pads[n(o,i)]?.choke??0:0).find(o=>o>0)??1;return t.forEach((o,i)=>{const l=ot(n(o,i));l.sample=o.sample,l.name=o.name.slice(0,24)||l.name,l.provenance=o.provenance,l.normalize=o.normalize!==void 0?o.normalize&&{...o.normalize}:o.provenance?{on:!0,gainDb:0}:null,o.hat&&(l.choke=s),e.pads[n(o,i)]=l}),a}function w0(e,t){const n=Array.from({length:ne},(a,s)=>kr(e,s));for(let a=0;a<ne;a++)e.pads[a]=ot(a);return _s(e,t),n}const fa=8;function x0(e,t,n,a=0){const s=e.pads[t],o=e.lanes[t];if(!s||!o)return;s.mode="oneshot",s.dir="fwd",s.decay=4,s.attack=0,s.fit=n,s.keepPitch=!0,s.slices=0,s.cuts=[],o.length=he;for(const l of o.steps)Object.assign(l,Ea());const i=o.steps[0];n<=fa&&i&&(i.on=!0,i.cond=n===1?"always":`${a%n+1}:${n}`)}function k0(e,t=ne){if(typeof e!="string"||!/^\d{1,3}$/.test(e))return-1;const n=Number(e)-1;return n>=0&&n<t?n:-1}function $r(e){return structuredClone({pads:e.pads,lanes:e.lanes,swing:e.swing,hacks:e.hacks})}const lp=4096;function $0(e){const t=Ea(),n=e.map(a=>{let s="";return a.on!==t.on&&(s+="x"),a.accent!==t.accent&&(s+="a"),a.reverse!==t.reverse&&(s+="r"),a.velocity!==t.velocity&&(s+=`v${a.velocity}`),a.chance!==t.chance&&(s+=`c${a.chance}`),a.slice!==t.slice&&a.slice!==null&&(s+=`s${a.slice}`),a.pitch!==t.pitch&&(s+=`p${a.pitch}`),a.cond!==t.cond&&(s+=`k${a.cond}`),s||"-"});for(;n.at(-1)==="-";)n.pop();return n.join(" ")}const S0="-?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[+-]?\\d+)?",fc=new RegExp(`[xar]|[vcsp]${S0}|k\\S+$`,"gy");function E0(e){return e.length>lp?[]:e.split(" ").slice(0,he).map(t=>{const n={};if(t==="-"||t==="")return n;fc.lastIndex=0;let a=0;for(const s of t.matchAll(fc)){const o=s[0];a+=o.length;const i=o.slice(1);o==="x"?n.on=!0:o==="a"?n.accent=!0:o==="r"?n.reverse=!0:o[0]==="v"?n.velocity=Number(i):o[0]==="c"?n.chance=Number(i):o[0]==="s"?n.slice=Number(i):o[0]==="p"?n.pitch=Number(i):o[0]==="k"&&(n.cond=i)}return a===t.length?n:{}})}function A0(e){const t=e.pads.map((a,s)=>{const o=ot(s),i={};for(const[l,c]of Object.entries(a))l==="cuts"?a.cuts.length&&(i.cuts=a.cuts.join(" ")):l==="mod"?ua(a.mod)||(i.mod=a.mod):o[l]!==c&&(i[l]=c);return i}),n=e.lanes.map(a=>({...a.length!==he?{length:a.length}:{},...a.mute?{mute:!0}:{},...a.solo?{solo:!0}:{},steps:$0(a.steps)}));return structuredClone({pads:t,lanes:n,swing:e.swing,hacks:e.hacks})}function ma(e){const t=new Set;for(const n of[e,...e.slots])for(const a of n?.pads??[])a.sample&&t.add(a.sample);for(const n of e.inst?.zones??[])t.add(n.s);return t}function cp(){try{return globalThis.localStorage??null}catch{return null}}function M0(e,t=cp()){try{const n=t?.getItem(e);return n?rp(JSON.parse(n)):Ei()}catch{return Ei()}}function L0(e,t,n=cp()){try{return n?.setItem(e,JSON.stringify(t)),!!n}catch{return!1}}function T0(e){if(!Array.isArray(e)||e.length!==2)return null;const[t,n]=e;return typeof t!="number"||typeof n!="number"||!Number.isFinite(t)||!Number.isFinite(n)?null:t>=0&&n<=1&&n-t>1e-6?[t,n]:null}const vt=1e-6;function C0(e,t){return Math.min(127,Math.max(0,(t+1)*12+(e%12+12)%12))}class Eo{entries=[];add(t){for(const n of t){let a=this.entries.find(o=>o.chord?.hit===n.hit&&Math.abs(o.startBeat-n.startBeat)<vt);a||(a={startBeat:n.startBeat,chord:{root:n.root,notes:[],startBeat:n.startBeat,lengthBeats:0,sounding:!0,hit:n.hit}},this.insert(a));const s=a.chord;s.notes.includes(n.note)||(s.notes.push(n.note),s.notes.sort((o,i)=>o-i)),s.lengthBeats=Math.max(s.lengthBeats,n.lengthBeats)}}off(t){if(t===void 0){this.entries=[];return}this.entries=this.entries.filter(n=>n.startBeat<t-vt),this.entries.push({startBeat:t,chord:null})}cut(t){this.entries=this.entries.filter(n=>n.startBeat<t-vt)}points(t=Number.NEGATIVE_INFINITY){let n=0;for(let a=0;a<this.entries.length;a++)this.entries[a].startBeat<=t+vt&&(n=a);return this.entries.slice(n).map(a=>({beat:a.startBeat,root:a.chord?a.chord.root:null}))}chordAt(t){let n=null;for(const s of this.entries){if(s.startBeat>t+vt)break;n=s}if(!n?.chord)return null;const a=n.chord;return{...a,notes:[...a.notes],sounding:t<a.startBeat+a.lengthBeats-vt}}pitchAt(t,{octave:n}={}){const a=this.chordAt(t);return a?n===void 0?a.root:C0(a.root,n):null}prune(t){let n=0;for(let a=0;a<this.entries.length;a++)this.entries[a].startBeat<=t+vt&&(n=a);n>0&&this.entries.splice(0,n)}get size(){return this.entries.length}insert(t){let n=this.entries.length;for(;n>0&&this.entries[n-1].startBeat>t.startBeat+vt;)n--;this.entries.splice(n,0,t)}}const Ze=1,ks=1024,N0=48,dp=128,$s=40,mc=64,gc=8,bc=16,yc=1024,Sr=16,up=36,Er=255,F0=["chord","root","top"],P0=["chord","root","top","arp","note"],z0=e=>up+e-1;function O0(e){const t=e-up+1;return Number.isInteger(t)&&t>=1&&t<=Sr?t:null}const Ia=256,vc=2,wc=128;function D0(e){const t=e.split("|");if(t.length<5)return null;const n=Number(t[t.length-4]);return Number.isInteger(n)?n:null}const ga=e=>typeof e=="object"&&e!==null,Me=e=>typeof e=="string"&&e.length>0&&e.length<=dp,ve=e=>typeof e=="number"&&Number.isFinite(e);function xc(e){return ga(e)?Me(e.id)?Me(e.source)?!Number.isInteger(e.note)||e.note<0||e.note>127?"note must be a whole number 0–127":!ve(e.velocity)||e.velocity<0||e.velocity>1?"velocity must be 0–1":ve(e.startBeat)?!ve(e.lengthBeats)||e.lengthBeats<0?"bad lengthBeats":!ve(e.spanBeats)||e.spanBeats<=0?"bad spanBeats":!ve(e.gate)||e.gate<=0||e.gate>1?"gate must be above 0, at most 1":!ve(e.offsetSec)||Math.abs(e.offsetSec)>2?"bad offsetSec":typeof e.role!="string"||!P0.includes(e.role)?"bad role":Number.isInteger(e.hit)?!Number.isInteger(e.root)||e.root<0||e.root>127?"bad root":e.slice!==void 0&&!pp(e.slice)?`slice must be a whole number 0–${Er}`:null:"bad hit":"bad startBeat":"bad source":"bad id":"not an object"}const pp=e=>Number.isInteger(e)&&e>=0&&e<=Er,B0=e=>Number.isInteger(e)&&e>=1&&e<=Sr;function hp(e){return ga(e)?Me(e.id)?ve(e.beat)?e.type==="slot"?!Number.isInteger(e.slot)||e.slot<1||e.slot>bc?`slot must be a whole number 1–${bc}`:null:e.type==="chordPad"?e.pad!==null&&!B0(e.pad)?`pad must be a whole number 1–${Sr}, or null`:null:e.type==="take"?Me(e.take)?!ve(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>Ia?`lengthBeats must be above 0, at most ${Ia}`:e.gain!==void 0&&(!ve(e.gain)||e.gain<0||e.gain>vc)?`gain must be 0–${vc}`:e.offsetBeats!==void 0&&(!ve(e.offsetBeats)||e.offsetBeats<0||e.offsetBeats>=e.lengthBeats)?"offsetBeats must be from 0, below lengthBeats":e.peaks!==void 0&&!(Array.isArray(e.peaks)&&e.peaks.length<=wc&&e.peaks.every(t=>ve(t)&&t>=0&&t<=1))?`peaks must be at most ${wc} values 0–1`:null:"bad take":e.type==="lap"?!ve(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>Ia?`lengthBeats must be above 0, at most ${Ia}`:null:"bad type":"bad beat":"bad id":"not an object"}function R0(e){if(!ga(e))return"not an object";if(e.type!=="note")return hp(e);if(!Me(e.id))return"bad id";if(!ve(e.beat))return"bad beat";if(typeof e.on!="boolean")return"on must be true or false";if(!Number.isInteger(e.note)||e.note<0||e.note>127)return"note must be a whole number 0–127";if(e.on){if(!ve(e.velocity)||e.velocity<=0||e.velocity>1)return"velocity must be above 0, at most 1";if(e.slice!==void 0&&!pp(e.slice))return`slice must be a whole number 0–${Er}`;if(e.name!==void 0&&(typeof e.name!="string"||!e.name.length||e.name.length>$s))return`name must be 1–${$s} characters`}else if(e.velocity!==void 0||e.slice!==void 0||e.name!==void 0)return"an off has no velocity, slice or name";return null}function kc(e,t){if(!Array.isArray(e))return"events must be a list";if(e.length>ks)return`more than ${ks} events`;for(let n=0;n<e.length;n++){const a=t(e[n]);if(a)return`event ${n}: ${a}`}return null}function I0(e){if(!ga(e))return"not an object";if(e.v!==Ze)return`version ${String(e.v)} is not ${Ze}`;if(e.kind==="notes"){if(!Me(e.source))return"bad source";if(!Array.isArray(e.events))return"events must be a list";if(e.events.length>ks)return`more than ${ks} events`;for(let t=0;t<e.events.length;t++){const n=xc(e.events[t]);if(n)return`event ${t}: ${n}`;if(e.events[t].source!==e.source)return`event ${t}: from another source`}return null}if(e.kind==="audition"){if(!Me(e.source))return"bad source";if(!Array.isArray(e.events))return"events must be a list";if(e.events.length>mc)return`more than ${mc} notes`;if(!ve(e.holdSec)||e.holdSec<=0||e.holdSec>gc)return`holdSec must be above 0, at most ${gc}`;for(let t=0;t<e.events.length;t++){const n=xc(e.events[t]);if(n)return`event ${t}: ${n}`;if(e.events[t].source!==e.source)return`event ${t}: from another source`}return null}if(e.kind==="played")return Me(e.source)?kc(e.events,R0):"bad source";if(e.kind==="controls")return Me(e.source)?kc(e.events,hp):"bad source";if(e.kind==="off")return Me(e.source)?["stop","removed","off","restart"].includes(e.reason)?e.atBeat!==void 0&&!ve(e.atBeat)?"bad atBeat":null:"bad reason":"bad source";if(e.kind==="release"){if(!Me(e.source))return"bad source";if(!Array.isArray(e.ids))return"ids must be a list";if(e.ids.length>yc)return`more than ${yc} ids`;for(let t=0;t<e.ids.length;t++)if(!Me(e.ids[t]))return`id ${t}: bad id`;return null}if(e.kind==="routes"){if(!Array.isArray(e.routes)||e.routes.length>64)return"routes must be a list (at most 64)";for(const t of e.routes){if(!ga(t)||!Me(t.source)||typeof t.name!="string"||t.name.length>dp)return"bad route";if(!F0.includes(t.role))return"bad route role";if(t.octave!==void 0&&!(Number.isInteger(t.octave)&&t.octave>=-1&&t.octave<=9))return"bad route octave";if(t.transpose!==void 0&&!(Number.isInteger(t.transpose)&&Math.abs(t.transpose)<=N0))return"bad route transpose";if(t.layer!==void 0&&typeof t.layer!="boolean")return"bad route layer"}return null}return"unknown kind"}const $c=e=>({id:e.id,source:e.source,note:e.note,velocity:e.velocity,startBeat:e.startBeat,lengthBeats:e.lengthBeats,role:e.role,offsetSec:e.offsetSec,spanBeats:e.spanBeats,gate:e.gate,hit:e.hit,root:e.root,...e.slice===void 0?{}:{slice:e.slice}}),fp=e=>e.type==="slot"?{type:"slot",id:e.id,beat:e.beat,slot:e.slot}:e.type==="take"?{type:"take",id:e.id,beat:e.beat,take:e.take,lengthBeats:e.lengthBeats,...e.gain===void 0?{}:{gain:e.gain},...e.offsetBeats===void 0?{}:{offsetBeats:e.offsetBeats},...e.peaks===void 0?{}:{peaks:[...e.peaks]}}:e.type==="lap"?{type:"lap",id:e.id,beat:e.beat,lengthBeats:e.lengthBeats}:{type:"chordPad",id:e.id,beat:e.beat,pad:e.pad},q0=e=>e.type!=="note"?fp(e):{type:"note",id:e.id,beat:e.beat,on:e.on,note:e.note,...e.on?{velocity:e.velocity}:{},...e.on&&e.slice!==void 0?{slice:e.slice}:{},...e.on&&e.name!==void 0?{name:e.name}:{}};function mp(e){if(I0(e))return null;const t=e;return t.kind==="notes"?{v:Ze,kind:"notes",source:t.source,events:t.events.map($c)}:t.kind==="audition"?{v:Ze,kind:"audition",source:t.source,events:t.events.map($c),holdSec:t.holdSec}:t.kind==="played"?{v:Ze,kind:"played",source:t.source,events:t.events.map(q0)}:t.kind==="controls"?{v:Ze,kind:"controls",source:t.source,events:t.events.map(fp)}:t.kind==="off"?{v:Ze,kind:"off",source:t.source,reason:t.reason,...t.atBeat===void 0?{}:{atBeat:t.atBeat}}:t.kind==="release"?{v:Ze,kind:"release",source:t.source,ids:[...t.ids]}:{v:Ze,kind:"routes",routes:t.routes.map(n=>({source:n.source,name:n.name,role:n.role,...n.octave===void 0?{}:{octave:n.octave},...n.transpose===void 0?{}:{transpose:n.transpose},...n.layer===void 0?{}:{layer:n.layer}}))}}const _0=e=>({v:Ze,kind:"routes",routes:e});class H0{track=new Eo;run=null;current=[];serial=0;stats={accepted:0,ignored:0,invalid:0};get routes(){return this.current}get route(){return this.current[0]??null}get active(){return this.current.length>0}get version(){return this.serial}receive(t){const n=mp(t);if(!n)return this.stats.invalid++,null;if(n.kind==="routes"){const o=this.route?.source??null;return this.current=n.routes,(this.route?.source??null)!==o&&this.reset(),n}const a=this.route?.source;if(n.source!==a)return this.stats.ignored++,n;if(n.kind==="off")return n.reason==="stop"&&n.atBeat===void 0||(n.reason==="restart"&&n.atBeat!==void 0?this.track.cut(n.atBeat):n.atBeat!==void 0?this.track.off(n.atBeat):this.track.off(),this.serial++),n;if(n.kind==="played"||n.kind==="controls"||n.kind==="release")return this.stats.ignored++,n;let s=!1;for(const o of n.events){const i=D0(o.id);if(i!==null&&this.run!==null&&i<this.run){this.stats.ignored++;continue}i!==null&&(this.run===null||i>this.run)&&(this.track=new Eo,this.run=i),this.track.add([o]),this.stats.accepted++,s=!0}return s&&this.serial++,n}rootAt(t){return this.active?this.track.chordAt(t)?.root??null:null}points(t=Number.NEGATIVE_INFINITY){return this.active?this.track.points(t):[]}prune(t){this.track.prune(t)}reset(){this.track=new Eo,this.run=null,this.serial++}}const j0=.001,W0=(e,t,n)=>{const a=new Float32Array(Math.max(0,n-t)),s=e.length||1;for(const o of e)for(let i=t;i<n;i++)a[i-t]+=(o[i]??0)/s;return a};function Y0(e,t,n,a,s){const o=e.length;for(let i=0;i<o;i++){const l=s[i];if(l>i){const c=e[i];e[i]=e[l],e[l]=c;const d=t[i];t[i]=t[l],t[l]=d}}for(let i=2;i<=o;i<<=1){const l=i>>1,c=o/i;for(let d=0;d<o;d+=i)for(let u=0;u<l;u++){const h=n[u*c],p=a[u*c],f=d+u,g=f+l,w=e[g]*h+t[g]*p,m=t[g]*h-e[g]*p;e[g]=e[f]-w,t[g]=t[f]-m,e[f]+=w,t[f]+=m}}}function U0(e,t){const n=t>64e3?2048:t>32e3?1024:512,a=n/4,s=Math.max(0,Math.floor((e.length-n)/a)+1),o=n/2,i=new Float32Array(n);for(let v=0;v<n;v++)i[v]=.5-.5*Math.cos(2*Math.PI*v/n);const l=new Float32Array(o),c=new Float32Array(o);for(let v=0;v<o;v++)l[v]=Math.cos(2*Math.PI*v/n),c[v]=Math.sin(2*Math.PI*v/n);const d=Math.log2(n),u=new Uint32Array(n);for(let v=0;v<n;v++){let y=0;for(let x=0;x<d;x++)y|=(v>>x&1)<<d-1-x;u[v]=y}const h=new Float32Array(n),p=new Float32Array(n);let f=new Float32Array(o),g=new Float32Array(o);const w=new Float32Array(s),m=4/n*1e3;let b=0;for(let v=0;v<s;v++){const y=v*a;for(let S=0;S<n;S++)h[S]=e[y+S]*i[S],p[S]=0;Y0(h,p,l,c,u);for(let S=0;S<o;S++)g[S]=Math.log1p(m*Math.sqrt(h[S]*h[S]+p[S]*p[S]));let x=0;if(v>0)for(let S=1;S<o-1;S++){const k=Math.max(f[S-1],f[S],f[S+1]),$=g[S]-k;$>0&&(x+=$)}w[v]=x,x>b&&(b=x),[f,g]=[g,f]}if(b>0)for(let v=0;v<s;v++)w[v]/=b;return{flux:w,hop:a,size:n}}function K0(e,t,n,a){const s=Math.max(8,Math.round(5e-4*t)),o=Math.max(0,n-Math.round(.01*t)),i=Math.min(e.length,a),l=[];for(let p=o;p<i;p+=s){let f=0;for(let g=Math.max(1,p);g<Math.min(i,p+s);g++)f=Math.max(f,Math.abs(e[g]-e[g-1]));l.push(f)}if(!l.length)return{at:n,contrast:0};let c=0;for(let p=1;p<l.length;p++)l[p]>l[c]&&(c=p);let d=l[c];for(let p=0;p<=c;p++)d=Math.min(d,l[p]);const u=d+.1*(l[c]-d);let h=c;for(;h>0&&l[h-1]>u;)h--;return{at:o+Math.max(0,h-1)*s,contrast:l[c]>0?1-d/l[c]:0}}function X0(e,t,n){let a=Math.max(0,Math.min(e.length-1,t));for(let s=Math.max(0,t-n);s<=Math.min(e.length-1,t+n);s++)Math.abs(e[s])<Math.abs(e[a])&&(a=s);return a}function Sc(e,t,n=0,a=e[0]?.length??0){const s=W0(e,n,a),{flux:o,hop:i,size:l}=U0(s,t),c=t/i/1e3,d=Math.max(1,Math.round(100*c)),u=Math.max(1,Math.round(30*c)),h=Math.max(1,Math.round(25*c)),p=new Float64Array(o.length+1);for(let m=0;m<o.length;m++)p[m+1]=p[m]+o[m];const f=[],g=Math.round(j0*t),w=Math.round(5e-4*t);for(let m=1;m<o.length;m++){const b=o[m],v=Math.max(0,m-d),y=Math.min(o.length,m+u+1),x=b-(p[y]-p[v])/(y-v);if(x<.02)continue;let S=!0;for(let M=Math.max(0,m-h);M<=Math.min(o.length-1,m+h);M++)if(o[M]>b||o[M]===b&&M<m){S=!1;break}if(!S)continue;const{at:k,contrast:$}=K0(s,t,m*i,m*i+l),E=X0(s,k-g,w);f.push({cut:n+E,hit:n+k,strength:b*(.25+.75*$),margin:x})}return f.sort((m,b)=>b.strength-m.strength),{from:n,to:a,sampleRate:t,candidates:f}}function G0(e){return .3*(1-Math.max(0,Math.min(1,e)))**1.6+.02}function Ai(e,t){const n=G0(t);return e.candidates.filter(a=>a.margin>=n)}const V0=e=>e.offsetDb?10**(e.offsetDb/20):1,Mi=.25,Ec=new WeakMap;function Hs(e,t){if(!e)return null;let n=Ec.get(e);n||(n=new Map,Ec.set(e,n));const a=Math.round(t*1e3)/1e3;let s=n.get(a);return s||(s=Ai(e,a).map(o=>o.cut).sort((o,i)=>o-i),n.set(a,s)),s}function js(e){return e.slices?e.cuts.length===e.slices-1?[0,...e.cuts,1]:Array.from({length:e.slices+1},(t,n)=>n/e.slices):[0,1]}function Ar(e,t,n){const a=e.start*t.frames,s=e.end*t.frames;if(n===null||!e.slices)return[Math.floor(a),Math.ceil(s)];const o=js(e),i=Math.min(n,o.length-2);return[Math.floor(a+o[i]*(s-a)),Math.ceil(a+o[i+1]*(s-a))]}function Mr(e,t,n,a=0){let o=2**((e.tune+e.fine/100+a)/12);if(e.fit){const[i,l]=Lr(e),c=(l-i)*t.frames/t.sampleRate,d=e.fit*4*(60/n);c>0&&d>0&&(o*=c/d)}return o}const Ac=new WeakMap;function Q0(e,t){let n=Ac.get(e);n||(n=new Map,Ac.set(e,n));let a=n.get(t);return a||(a=e.map(s=>Math.round(s*t)),n.set(t,a)),a}function J0(e){return!e.slices&&e.length!=="free"}function Lr(e){return J0(e)?e.fitSpan??[0,1]:[e.start,e.end]}function Ws(e){return!e.slices&&(e.length!=="free"||!ua(e.mod))}function gp(e,t,n){const a=Z0(e.fit,n,t.sampleRate);if(!Ws(e))return a;const[s,o]=Lr(e),i=Math.max(1,(o-s)*t.frames);return Math.max(1,Math.round(t.frames*a/i))}function Z0(e,t,n){return Math.max(1,Math.round(e*4*60/Math.max(1,t)*n))}function Ys(e,t,n){if(!e.fit)return 1;const[a,s]=Lr(e),o=(s-a)*t.frames/t.sampleRate;return o>0?o/(e.fit*4*(60/Math.max(1,n))):1}const Tn=[.75,1.5];function ev(e,t,n){if(n===null||!e.slices)return[0,t];const a=js(e),s=Math.min(n,a.length-2);return[Math.floor((a[s]??0)*t),Math.ceil((a[s+1]??1)*t)]}const tv=1.5;function Us(e,t,n,a,s,o=!1,i){if(!n.on||!e.sample||!a)return null;const l=n.slice??(e.slices?t%e.slices:null),c=i!==void 0&&Ws(e),d=g=>i?c?[Math.floor(e.start*i.frames),Math.ceil(e.end*i.frames)]:ev(e,i.frames,g):Ar(e,a,g);let[u,h]=d(l);const p=n.reverse?e.dir==="rev"?"fwd":"rev":e.dir;if(e.mode==="oneshot"&&l!==null&&e.slices&&!o){const[g,w]=d(null);p==="fwd"?h=w:p==="rev"&&(u=g)}const f=i?2**(n.pitch/12)*(i.frames/gp(e,a,s)):Mr(e,a,s,n.pitch);return{sample:i?i.sample:e.sample,from:u,to:h,rate:f,trim:Sy(e)*V0(e),gain:Math.min(1.5,n.velocity*(n.accent?tv:1))*Ny(e.levelDb),pan:e.pan,mode:e.mode,dir:p,attack:e.attack,decay:e.decay,cutoff:e.cutoff,resonance:e.resonance,choke:e.choke,chance:n.chance,cond:n.cond,fit:e.fit>0,...!o&&ha(e)?{follow:e.note}:{},...nv(e,a,i,f)??{},...!o&&e.retrigger==="finish"?{finish:!0}:{}}}function nv(e,t,n,a){if(!ct(e)||e.length==="free"&&ua(e.mod)||n&&!Ws(e))return null;const s=n?n.frames/Math.max(1,t.frames):1,o=n?n.frames:t.frames,[i,l]=n?[Math.floor(e.start*o),Math.ceil(e.end*o)]:Ar(e,t,null),c=e.length==="hit"||e.landOnHits?Hs(t.analysis,e.hitSense):void 0;return{region:{start:i,end:l,frames:o,sampleRate:t.sampleRate,rate:a,grid:e.length,mod:ua(e.mod)?null:e.mod,...c!==void 0?{hits:c&&s!==1?Q0(c,s):c,land:e.landOnHits}:{}}}}function ct(e){return!e.slices}function bp(e,t,n,a=null,s,o=!1){const i=o&&e.slices?{...e,slices:0,cuts:[]}:e;return Us(i,0,{on:!0,accent:!1,velocity:.8,chance:1,slice:a,pitch:0,reverse:!1,cond:"always"},t,n,!0,s)}function av(e,t,n,a,s=null,o){return Us(e,0,{on:!0,accent:!1,velocity:Math.min(1,Math.max(0,a)),chance:1,slice:s,pitch:0,reverse:!1,cond:"always"},t,n,!0,o)}function sv(e,t,n,a=()=>{}){const s=e.lanes.some(o=>o.solo);return{swing:e.swing,lanes:e.lanes.map((o,i)=>{const l=e.pads[i],c=l?.sample?t(l.sample):void 0,d=l?a(i):void 0;return{length:o.length,audible:s?o.solo:!o.mute,steps:o.steps.map((u,h)=>l?Us(l,h,u,c,n,!1,d):null)}})}}const Tr=4,ov=.03,iv=new Set(["oneshot","oneshots","shot","shots","hit","hits","stab","stabs","single"]),rv=new Set(["loop","loops","break","breaks","breakbeat","groove","grooves","beat","riff"]);function yp(e){return e.replace(/^.*[\\/]/,"").replace(/\.[a-z0-9]{2,4}$/i,"").split(/[\s_\-.()[\],+&]+/).filter(Boolean)}function vp(e){const t=yp(e);for(let n=0;n<t.length;n++){const a=t[n]??"",s=/^(\d{2,3})bpm$/i.exec(a)??/^bpm(\d{2,3})$/i.exec(a);if(s&&ms(Number(s[1])))return Number(s[1]);if(/^\d{2,3}$/.test(a)&&/^bpm$/i.test(t[n+1]??"")&&ms(Number(a)))return Number(a)}for(const n of t)if(/^[1-9]\d{1,2}$/.test(n)&&Number(n)>=50&&Number(n)<=200)return Number(n);return 0}function Cr(e){const t=yp(e).map(s=>s.toLowerCase());if(t.some((s,o)=>iv.has(s)||s==="one"&&/^shots?$/.test(t[o+1]??"")))return{kind:"one-shot",bpm:0};const a=vp(e);return a?{kind:"loop",bpm:a}:{kind:t.some(s=>rv.has(s))?"loop":"",bpm:0}}function wp(e,t,n=Tr,a=op){if(!(e>0)||!ms(t)||!(n>0))return 0;const s=e*t/60/n,o=Math.round(s);return o<1||Math.abs(s-o)>ov*o?0:a.includes(o)?o:0}function lv(e,t,n,a=Tr){if(t.kind!=="loop")return null;const s=wp(e,t.bpm,a);if(!s)return null;const o=e/(s*a*(60/Math.max(1,n))),i=Number(o.toFixed(2));return{bars:s,bpm:t.bpm,speed:o,far:i<Tn[0]||i>Tn[1]}}function cv(e){const t=Number.isInteger(e.bpm)?String(e.bpm):e.bpm.toFixed(1);return`Fitted: ${e.bars} bar${e.bars===1?"":"s"}, ${t} BPM`}function Mc(e){return e.far?`×${e.speed.toFixed(2)} may smear`:""}const xp="nyx.autofit.v1",kp=()=>{try{return globalThis.localStorage??null}catch{return null}};function dv(e=kp()){try{return e?.getItem(xp)!=="off"}catch{return!0}}function uv(e,t=kp()){try{t?.setItem(xp,e?"on":"off")}catch{}}function $p(e,t){return!!(e&&t.sample===e.sample&&t.fit===e.fit.bars)}function pv(e,t){t.fit=e.before.fit,t.keepPitch=e.before.keepPitch}const Lc={"page:title":"NYX, the NetComposer sampler. The number is which copy of NYX this is.","page:master":"The volume of everything NYX plays, after the Hacks.","page:save":"Downloads the pattern as a file: pads, steps, Hacks and the ten slots. The samples stay in this browser.","page:load":"Opens a saved pattern file (with its slots, if it has them), or puts an audio file onto the selected pad.","page:panic":"Silences every voice and effect tail at once. NYX then sits out until you press Play.","page:mode":"Pads plays the kit. Instrument plays one sampled instrument from a scale grid and the keys; NYX keeps both.","inst:load":"Loads a folder of note samples, or one with an .sfz file. You check the key map and the detail, then load.","inst:velocity":"How hard the QWERTY keys play, 1 to 127. Louder notes can also pick a brighter layer of the instrument.","inst:vel-down":"One dynamic softer for the keys (C): fff, ff, f, mf, mp, p, pp, ppp.","inst:vel-up":"One dynamic louder for the keys (V): ppp, pp, p, mp, mf, f, ff, fff.","inst:padvel-position":"Pads play louder the higher you hit them: 1 at the bottom edge, 127 at the top.","inst:padvel-keys":"Every pad plays at the keys' velocity, wherever you hit it.","inst:last":"The last note you played: its velocity, its dynamic, and which of the loaded layers it used.","inst:layers":"How many of the instrument's velocity layers are loaded. Each layer is a recording at a different strength.","inst:more":"Opens the layer chooser again for this instrument. More layers sound more natural and use more memory.","inst:more-folder":"Asks for the instrument's folder again (NYX doesn't keep the files after a reload), then opens the layer chooser.","module:transport":"Play and stop NYX, set the tempo and swing, and keep up to ten saved versions of the whole kit and pattern. Folded, the header's play icon does the same as Play.","module:pattern":"The 16-step grid, one lane per pad: a step that is on plays that lane's pad. The pads under the grid are the sounds.","module:params":"Everything about the selected pad: which part of the sample plays, its pitch, shape, filter and level. A selected step's locks show here too.","module:hacks":"Effects on everything NYX plays, in order: Filter, then Drive, then Compressor. They are saved with the pattern and its slots.","section:pads":"The 16 sounds: Q W E R A S D F play 1–8, Shift 9–16. Tap to play, double-click a name to rename; long-press or right-click to load or remove; Delete removes; drag to swap.",play:"Starts and stops NYX, including the play icon on the folded Transport header. In the Studio, Stop sits NYX out while the others play on, and Play brings it back on the next bar.","perform-label":"Effects you play live: hold a button down and NYX's sound changes until you let go. Nothing is saved.",perform:"Hold one of these down to change NYX's sound until you let go.",tempo:"Beats per minute: how fast the pattern plays. In the Studio every instrument shares this clock.",swing:"Pushes every second sixteenth note later for a looser, shuffled feel. 50% is straight.",status:"What NYX is doing now: stopped, playing, sitting out, or waiting to join on the next bar.","kit:slot":"A memory for the whole kit and pattern. Tap to recall it; Shift-click or long-press to store here, Option-click to clear.","kit:note":"Step tool: a tap on a step turns it on or off.","kit:accent":"Step tool: a tap on a step makes it an accent, played louder. Shift-click accents a step with either tool.","kit:fill":"Hold for a fill: steps set to play Only in Fill come in and Not in Fill steps drop out, until you let go.","kit:clear":"Turns every step off and resets lane lengths, mutes, solos and step locks; the pads keep their sounds. Undo brings it back.","kit:mute":"Mute: silences this lane. Its steps stay as they are.","kit:solo":"Solo: hear only the soloed lanes. Solo several to hear them together.","kit:length":"Drag to set how many steps this lane plays before it starts over. Lanes of different lengths drift against each other.","kit:lane-length":"Tap to set this lane's length, then tap the step it should end on.","kit:pad-key":"The key that plays this pad: lower case (q to f) is the key alone, upper case (Q to F) is Shift with it. A Gate pad holds while its key is down.","kit:pad-playing":"Playing: tap this pad, or press its key, to stop it. A sound under a second plays again instead, so drums stay playable.","kit:choke-badge":"Choke group: pads showing the same letter cut each other off, like an open and a closed hi-hat. Set it under Choke.",wave:"The selected pad's sample: the part between Start and End is what plays, lines mark the slices, and a cursor follows playback. Click it to edit the region large.",sample:"How much of the sample plays (between Start and End) out of its full length, and whether it is mono or stereo.",mode:"How the pad plays when hit: right through (One-shot), only as long as its step (Gate), or round and round (Loop).",dir:"Which way the pad plays through its sample: forwards, backwards, or forwards then back.",start:"Where the pad starts playing in the sample. Move it right to skip the beginning.",end:"Where the pad stops playing in the sample. Move it left to cut off the tail.",slices:"Cuts the played part into 2 to 16 pieces; each step plays the next piece in turn. Off plays the whole part every time.",chop:"Where the slices are cut: at equal spacing, or where the hits in the sound start.","chop-to-pads":"Cuts this pad's sound into up to 16 slices, one per pad, to play by hand or rearrange in the pattern.","chop:wave":"The slices and the pad each lands on. Tap a slice to hear it.",retrigger:"When the lane hits the pad again: Cut starts it again each time; Let it finish lets it play to its end first.","region:start":"Where the pad starts playing. Drag it (← → nudge it); with a length on the grid, End follows it.","region:end":"Where the pad stops. On the grid, drag it to the nearest note value or bar; on Free, anywhere.","region:overview":"The whole sample. The blue frame is what the stage shows: drag it, or tap to look there.","region:length":"How long the pad plays from Start: Free (where End is), or a note value or bars at the tempo, so End follows Start. On a pad fitted to bars, the bars are the Studio's: 2 bars plays exactly 2 bars.","region:fitted":"Fit to bars stretches this loop to whole bars at the Studio's tempo. The grid picks a part of it in Studio bars; moving Start never changes its speed.","region:fit-off":"Turns Fit to bars off for this pad, so it plays at its own speed and tempo. Undo brings it back.","region:retrigger":"Cut: each of the lane's hits starts the sound again. Let it finish: hits while it still plays are skipped (a tap or a key always starts it).","region:start-mod":"What moves Start while you play, and how far either way. The move lands on the next hit, never in a sound already playing.","region:length-mod":"What moves the length on the grid while you play, and by how many steps. Shake makes it one step shorter per shake.","region:lfo":"NYX's own LFO for this pad: how long one cycle takes on the Studio's beat, and its shape.","region:start-source":"Nothing, NYX's LFO, or one of ARIA's signals (your phone's tilt, heading or shake; the ground's energy).","region:length-source":"Nothing, NYX's LFO, or one of ARIA's signals. ARIA's need an ARIA in this Studio.","region:reset":"Puts Start and End back to the whole sample, the length to Free, and nothing moving.","region:hits":"How many hits NYX finds in the sound: more to the right. Start and End snap to them, and To a hit and Land on hits use them.","region:no-hits":"No hits found at this sensitivity. Move Hits to the right to find more.","region:to-hit":"End lands just before the next hit after Start, so the pad plays one hit, one chord or one word. Moves count on to the 2nd, 3rd hit.","region:land":"Land on hits: as Start moves, it jumps from hit to hit, so every trigger begins cleanly. Anywhere: it moves smoothly.","region:audition":"Plays the pad as a tap does; while it plays, stops it.","region:audition-slice":"Plays what a hit plays: slice 1 of this pad's slices. While it plays, stops it.","region:audition-region":"Plays the whole region, Start to End, across every slice. While it plays, stops it.","region:slices-off":"Turns this pad's slices off, so a hit plays the whole region and the grid can set its length. Undo brings them back.","chop:close":"Closes Chop to pads without changing any pad.","chop:mode":"How the sound is cut: where its hits start, into equal parts, or on the beat.","chop:mode:transients":"Cuts where each hit starts, so a slice is one hit (a drum, a note, a word).","chop:mode:even":"Cuts into equal parts: 16, 8 or 4.","chop:mode:beats":"Cuts on the beat at the sound's tempo: every beat, eighth or sixteenth.","chop:sensitivity":"Higher finds quieter hits; lower keeps only the strongest.","chop:count":"The most slices to make (Even: exactly this many). Never more than the pads left from Fill from.","chop:every":"Beats: a slice every beat, eighth or sixteenth at the sound's tempo. Choices past 16 slices are off.","chop:first":"The pad the first slice goes on; the rest follow, up to pad 16.","chop:play-back":"Writes steps that play the slices in order, so the pattern sounds like the original. On when the tempo is known.","chop:more":"The tempo used, Choke and Snap to hits.","chop:tempo":"The sound's tempo: from its Fit, its name, a take, or the Studio's when the length fits; else a guess.","chop:choke":"On, the slices cut each other: a new slice stops the last one.","chop:snap":"Even and Beats: moves each cut to a hit that starts within 20 ms, so an early hit isn't split.","chop:go":"Puts the slices on the pads. Pads with sounds are replaced; Undo puts them back.","library:chop":"Loads this loop onto the selected pad and opens Chop to pads on it.","tune-shape":"Pitch, speed and shape of the selected pad. Closed, it lists what differs from a new pad; NYX remembers in this browser whether it's open.","transport-more":"On a phone, Swing folds away; the line shows it. Tap to show or hide it.","nyx-presets":"The ten slots, folded away until you open them; the line says how many hold a pattern and which is in use. Keys 1 to 0 recall a slot either way.","pad-more":"On a phone, the pad's pan, choke group and Clear pad fold away; the line shows pan and choke. Tap to show or hide them.","hacks-more":"On a phone, Drive and Compressor fold away under the Filter; the line says which are on. Tap to show them.","kit:group-toggle":"Opens or closes this section.","pitch-label":"How high or low the pad plays. Pitch changes speed too, like a record, unless Fit's Keep pitch is on.",tune:"Pitch in semitones, up to two octaves either way. Higher also plays faster, unless the pad is fitted with Keep pitch on.",fine:"Fine pitch in cents (hundredths of a semitone), for small corrections.",fit:"Makes the pad last exactly this many bars at the current tempo, and keeps it in time when the tempo changes. Off plays it as recorded.","keep-pitch":"On, Fit stretches the pad to its bars without changing its pitch, and Tune moves the pitch only. Off, it speeds up or slows down like a record.","fit-speed":"How fast the pad plays to fit its bars: ×1 is as recorded. With Keep pitch, stretching far past ×0.75 to ×1.5 may smear the sound.","auto-fit":"On, a loop that arrives with its tempo (picker, My samples, or a name like Loop_100_Am) is fitted to its bars with Keep pitch. One-shots never are.","auto-fit-note":"This loop came with its tempo, so NYX set Fit to its bars with Keep pitch on. It plays in time at any tempo.","auto-fit-far":"Keep pitch is stretching this loop past ×0.75 to ×1.5, where it may smear. Fit it to other bars, or turn Keep pitch off.","auto-fit-undo":"Turns this pad's automatic Fit off again: the loop plays as recorded. The sound stays.","shape-label":"How each hit's volume moves over time: how it fades in and how it dies away.",attack:"How long each hit takes to fade in. Zero is instant; more softens the start.",decay:"How quickly each hit fades away (in Gate, once its step ends). All the way up is Hold: no fade.",cutoff:"Left of centre cuts the highs (darker), right of centre cuts the lows (thinner). Centre leaves the pad open.",resonance:"Boosts the sound right at the filter's edge for a sharper, ringing tone. It does nothing while the filter is open.","out-label":"Where the pad sits in the mix: how loud, how far left or right, and which pads cut it off.",level:"How loud this pad plays, in dB. 0 dB is the Studio's house level; double-click to go back to it.",normalize:"On, the pad plays at the Library's level, so a quiet file fits the kit; Level still sets how loud. Off, it plays as recorded.","normalize-label":"Plays the pad at the Library's level, so a quiet file fits the kit. Grabs and Takes are at mix level already.","normalize-gain":"What Normalize adds to this pad: the gain that brings your audio to the Library's level, never a peak past −1 dBFS.",pan:"Places the pad left or right in the stereo picture. C is the centre.",choke:"Pads in the same group cut each other off when one plays, like open and closed hi-hats. None lets it ring over the others.","clear-pad":"Removes this pad's sample and settings at once; its steps stay. Undo brings it back.","lock-label":"Locks for this one step: settings here change only this step, not the whole pad. Long-press another step to edit it.","lock-velocity":"How loud this step plays, before any accent.","lock-chance":"The odds this step plays each time round. At 100% it always plays; lower leaves it out at random.","lock-slice":"Which slice this step plays. In order plays the slice that matches the step's place, so a chopped beat plays back as it was.","lock-pitch":"Moves this step up or down in semitones, on top of the pad's own Tune.","lock-cond":"When this step plays: always, only on some passes through the lane, only with Fill held or not, or only if the lane's last conditional step did or didn't.","lock-reverse":"Whether this step plays the pad's own way or the other way round.","lock-done":"Closes this step's locks and goes back to the pad's settings.","notes-label":"CALLIOPE plays this NYX: your pattern keeps its hits, and pads that follow take its chord's root.","pad-follow":"On: this pad's hits play at the root of CALLIOPE's chord. Off: its own pitch, as drums want.","pad-note":"The note this sample plays at as recorded. NYX tunes from it to CALLIOPE's root, never more than six semitones away.","notes-open":"Shows CALLIOPE, the Studio's note generator that tunes this NYX's pads now.","notes-mine":"Take the pitch back: CALLIOPE stops playing this NYX, and every pad plays its own pitch again.","grab-label":"Brings sound from the Studio onto the selected pad: Grab the bars that just played, or Take a performance as it happens.","grab-from":"Which Studio sound to grab or take from: the master mix or one instrument's channel.","grab-bars":"How many bars Grab takes. One bar is cut into 16 slices with every step on; longer grabs are sliced at the hits.",grab:"Copies the bars that just played onto the selected pad, cut on the bar lines (the music must be playing). It asks before replacing a pad that has a sound.","grab-undo":"Puts back what this Grab, Take, sent take, Library Load or Build kit replaced: old sounds, slices and steps. Cmd/Ctrl+Z does the same.",library:"Opens the Library: openly licensed sounds checked by a person, found by plain words. Load fills the selected pad; Build kit fills pads 1–8.",rights:"A recording of a tab's or another app's sound (LUCY's Computer audio): nobody here knows who owns it. Fine to play with; check the licence before you release anything with it.",credit:"Who made this pad's sound, and its licence. Library › Credits has the full credit with links, and saved patterns keep it.","library:ask":"Plain words: a role (kick, snare, hat, clap, tom, perc, cymbal, fx) and a sound (punchy, tight, dark, bright, long, soft). Add kit for a whole kit.","library:close":"Closes the Library. Esc in the field does the same.","library:play":"Plays this sound through NYX's output, at the level it will have on a pad. Press again to stop.","library:load":"Puts this sound on the selected pad, named after it and with its credit; the steps stay. Undo brings the old sound back.","library:kit":"Fills pads 1–8 with a kit for your words (kick, snare, clap, hats, tom, perc, fx); the pattern stays and the hats cut each other. One Undo puts all eight back.","library:credits":"Every Library sound on the pads: who made it, its licence and its source. Saved patterns, slots and Studio Scenes keep these credits.","library:badge":"The licence. CC0 needs no credit (NYX credits it anyway); BY needs credit, and BY-SA credit plus the same licence on what you make.","library:wave":"The sound's shape, start to end: a tall start is a sharp hit, a long tail rings on.","library:source-shelf":"The curated shelf on musicmatter.art: openly licensed sounds, each checked by a person.","library:source-local":"My samples: your local Library, the folder the sample picker exported. Its sounds play in this browser and are never uploaded.","library:source-all":"Searches musicmatter.art and My samples (your local Library) together.","library:open-folder":"Opens a local Library folder (the sample picker's export) from this computer. NYX only reads it; nothing is uploaded.","library:reconnect":"Your local Library folder, remembered from last time: the browser asks once more before NYX can read it.","library:forget":"Closes your local Library and forgets the folder. The files stay where they are; pads keep their sounds.",take:"Records the chosen source onto the selected pad in whole bars until you press again (up to four minutes); takes of up to 8 bars loop. It asks first if the pad has a sound.","hack-filter":"A filter on all of NYX, to darken it, thin it or narrow it down. The switch turns it on.","filter-mode":"Which part the filter keeps: the lows (low pass), the highs (high pass) or a band in the middle (band pass).","filter-cutoff":"Where the filter cuts. In low pass, all the way up is open: no filtering.","filter-resonance":"Boosts the sound around the cutoff for a sharper, more nasal tone.","filter-curve":"A picture of the filter: how loud each pitch range comes out, lows on the left, highs on the right.","hack-meter":"The level going into this Hack (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. Off, it still shows the input, greyed.","hack-drive":"Distortion on all of NYX, from warm to gritty. The switch turns it on.","hack-drive-drive_db":"How hard the sound is pushed into distortion. 0 dB is clean.","hack-drive-output_db":"The level after the drive, to balance out the louder distorted sound.","hack-drive-mix":"How much of the driven sound is mixed with the clean one. 100% is all drive.","hack-drive-curve":"The kind of distortion: Smooth is warm and round, Acid is harder and buzzier.","hack-drive-tone":"Darkens the driven sound by cutting its highs. All the way up leaves it bright.","hack-compressor":"Evens out NYX's level: loud hits are turned down, so the whole sounds tighter and punchier. The switch turns it on.","hack-compressor-threshold_db":"The level above which the compressor starts turning the sound down. Lower catches more.","hack-compressor-ratio":"How strongly sound above the threshold is turned down. Higher is a firmer squeeze.","hack-compressor-attack_ms":"How fast the compressor reacts to a loud hit. Slower lets the start of each hit punch through.","hack-compressor-release_ms":"How fast the compressor lets go once the sound drops back below the threshold.","hack-compressor-makeup_db":"Turns the whole sound back up after compressing, to make up for the lost level.","kit:more":"More settings for this effect."},hv={perform:{repeat16:"While held, repeats the last sixteenth note over and over, like a stutter.",repeat8:"While held, repeats the last eighth note over and over.",reverse:"While held, plays what NYX just played backwards.",half:"While held, plays on at half speed, an octave lower.",stop:"While held, slows to a halt like a tape machine switched off."},mode:{oneshot:"One-shot: plays on from the hit until it ends or the lane's next hit cuts it. Good for drums.",gate:"Gate: plays only as long as its step (or its key is held), then fades by Decay. Good for chopping long sounds.",loop:"Loop: plays round and round until the pad plays again or the music stops."},dir:{fwd:"Plays the sample the normal way, start to end.",rev:"Plays the sample backwards, end to start.",pingpong:"Plays forwards, then back again. In Loop it keeps bouncing."},retrigger:{cut:"Cut: each of the lane's hits starts the sound again.",finish:"Let it finish: the lane's hits wait while the sound still plays (they show striped). A tap or a key always starts it."},normalize:{on:"Normalize on: the pad plays at the Library's level.",off:"Normalize off: the pad plays as recorded."},"keep-pitch":{on:"Keep pitch: the pad is stretched to its bars and stays at its pitch, whatever the tempo. Tune moves the pitch only.",off:"Varispeed: the pad speeds up or slows down to fit its bars, and its pitch moves with it, like a record."},"auto-fit":{on:"Auto-fit on: loops with a known tempo land fitted to their bars, Keep pitch on.",off:"Auto-fit off: loops land as recorded; set Fit yourself."},chop:{even:"Cuts the slices at equal spacing.",transients:"Cuts the slices where the hits in the sound start, so each slice is one hit."},"lock-reverse":{pad:"This step plays in the pad's own direction.",rev:"This step plays the other way round from the pad."}};function q(e){return Object.hasOwn(Lc,e)?Lc[e]:void 0}function fv(e,t){const n=hv[e];return(n&&Object.hasOwn(n,t)?n[t]:void 0)??q(e)}const oa="nyx-help-text",Tc=new Map;function mv(e,t){const n=Tc.get(t);if(n&&e.getElementById(n))return n;let a=e.getElementById(oa);a||(a=e.createElement("div"),a.id=oa,a.hidden=!0,e.body.append(a));const s=e.createElement("span");return s.id=`${oa}-${a.children.length+1}`,s.textContent=t,a.append(s),Tc.set(t,s.id),s.id}function U(e,t,n){if(!e||!t||(e.getAttribute("data-nc-help")!==t&&e.setAttribute("data-nc-help",t),e.hasAttribute("title")&&e.removeAttribute("title"),!n))return;const a=mv(n.ownerDocument,t),s=(n.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);if(s.includes(a))return;const o=[...s.filter(i=>!i.startsWith(`${oa}-`)),a];n.setAttribute("aria-describedby",o.join(" "))}function gv(e,t=e){if(e?.removeAttribute("data-nc-help"),!t)return;const n=(t.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean),a=n.filter(s=>!s.startsWith(`${oa}-`));a.length!==n.length&&(a.length?t.setAttribute("aria-describedby",a.join(" ")):t.removeAttribute("aria-describedby"))}function bv(e){const t=q(e);return t?{"data-nc-help":t}:{}}const yv=[['.nc-seg [role="radio"]:not([data-nc-accent-mode])',"kit:note"],['.nc-seg [role="radio"][data-nc-accent-mode]',"kit:accent"],["[data-nc-fill]:not([data-nc-clear])","kit:fill"],["[data-nc-clear]","kit:clear"],['.nc-ms[data-nc-ms="mute"]',"kit:mute"],['.nc-ms[data-nc-ms="solo"]',"kit:solo"],[".nc-len-handle","kit:length"],["[data-nc-len-toggle]","kit:lane-length"],["[data-nc-pads-play]","play"],[".nc-snap","kit:slot"]];function Nr(e){for(const t of e.querySelectorAll(".nc-module[data-nc-module]"))U(t.querySelector(".nc-module-hd .nc-title"),q(`module:${t.dataset.ncModule}`));for(const t of e.querySelectorAll("[data-nc-section]"))U(t.querySelector(":scope > .nc-ui-fx-name, :scope > .nc-panel-hd > .nc-panel-title"),q(`section:${t.dataset.ncSection}`));for(const t of e.querySelectorAll("[data-nc-id]")){const n=t.dataset.ncId??"";if(!t.matches("input, select, canvas"))if(t.classList.contains("nc-field")){const a=t.querySelector(":scope > input, :scope > select, :scope > canvas");U(t.querySelector(":scope > .nc-label"),q(n),a)}else if(t.classList.contains("nc-choice-row"))for(const a of t.querySelectorAll("[data-nc-choice]"))U(a,fv(n,a.dataset.ncChoice??""),a);else t.classList.contains("nc-btn")?U(t,q(n),t):t.matches(".nc-label[data-nc-text]")?U(t,q(n)):t.classList.contains("nc-ui-fx")&&(U(t.querySelector(":scope > .nc-ui-fx-hd > .nc-ui-fx-name, :scope > .nc-ui-fx-name"),q(n),t.querySelector("[data-nc-fx-switch]")),U(t.querySelector(":scope > .nc-ui-more > summary"),q("kit:more")))}for(const[t,n]of yv)for(const a of e.querySelectorAll(t)){const s=a.parentElement?.querySelector(":scope > .nc-hit")?a.parentElement:null;s&&a.removeAttribute("title"),U(s??a,q(n),a)}for(const t of e.querySelectorAll(".nc-group[data-nc-id]")){const n=t.querySelector(":scope > .nc-group-toggle");U(n?.querySelector(".nc-group-title")??null,q(t.dataset.ncId??""),n),U(n?.querySelector(".nc-group-mark")??null,q("kit:group-toggle"))}for(const t of e.querySelectorAll(".nc-padgrid-pad-badge"))t.textContent?U(t,q("kit:choke-badge")):t.removeAttribute("data-nc-help")}function vv(e){return e.embedded&&e.running?e.sittingOut?{action:"rejoin"}:{action:"sit-out",outId:e.instanceId}:e.running?{action:"stop"}:{action:"start",claimId:e.embedded?e.instanceId:null}}function Fr(e){return e?"Stop":"Play"}const Cc="http://www.w3.org/2000/svg";function Nc(e,t){const n=document.createElementNS(Cc,"svg");n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nyx-fold-play-icon"),n.dataset.nyxIcon=e;const a=document.createElementNS(Cc,"path");return a.setAttribute("fill","currentColor"),a.setAttribute("d",t),n.append(a),n}function wv(e,t){const n=document.createElement("button");n.type="button",n.className="nyx-fold-play",n.dataset.nyxFoldPlay="",n.append(Nc("play","M4.5 2.8 12.8 8 4.5 13.2Z"),Nc("stop","M4.2 4.2h7.6v7.6H4.2Z")),t.description&&(U(n,t.description,n),n.removeAttribute("data-nc-help")),n.addEventListener("click",l=>{l.stopPropagation(),t.onPress()});const a=e.querySelector(".nc-module-end"),s=a?.querySelector(".nc-hide");a&&s?a.insertBefore(n,s):(e.querySelector(".nc-module-hd")??e).append(n);const o=()=>{const l=t.playing(),c=Fr(l);n.setAttribute("aria-label",c),n.title=c,n.setAttribute("aria-pressed",l?"true":"false"),n.dataset.on=l?"true":"false",n.querySelector('[data-nyx-icon="play"]')?.toggleAttribute("hidden",l),n.querySelector('[data-nyx-icon="stop"]')?.toggleAttribute("hidden",!l);const d=e.hasAttribute("data-nc-slim");n.hidden=!d,d?n.removeAttribute("aria-hidden"):n.setAttribute("aria-hidden","true")},i=new MutationObserver(()=>o());return i.observe(e,{attributes:!0,attributeFilter:["data-nc-slim"]}),o(),{button:n,sync:o,destroy(){i.disconnect(),n.remove()}}}const ut=e=>`${Math.round(e*100)}%`,xt=e=>e<1?`${Math.round(e*1e3)} ms`:`${e.toFixed(2)} s`,Li=e=>e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`,ba=(e,t="")=>`${e>0?"+":""}${e}${t}`,xv=e=>`×${Number(e.toFixed(2))}`;function Za(e){return Math.abs(e)<.001?"open":e<0?`LP ${Li(2e4*(60/2e4)**-e)}`:`HP ${Li(20*(8e3/20)**e)}`}const es=e=>e>=3.99?"Hold":xt(e);function kv(e){const t=ot(0),n=[];return e.tune!==t.tune&&n.push(ba(e.tune," st")),e.fine!==t.fine&&n.push(ba(e.fine," ct")),e.fit!==t.fit&&n.push(`fit ${e.fit} bar${e.fit===1?"":"s"}`),e.fit&&e.keepPitch!==t.keepPitch&&n.push("varispeed"),Math.abs(e.attack-t.attack)>=5e-4&&n.push(`attack ${xt(e.attack)}`),es(e.decay)!==es(t.decay)&&n.push(`decay ${es(e.decay)}`),Za(e.cutoff)!==Za(t.cutoff)&&n.push(`filter ${Za(e.cutoff)}`),ut(e.resonance)!==ut(t.resonance)&&n.push(`res ${ut(e.resonance)}`),n.join(" · ")}function $v(e){const t=Math.max(0,Math.min(1,e));return Math.min(2e4,40*2**(t*10))}const qa=e=>Math.max(0,Math.min(100,e));function Pr(e){const t=$v(e.cutoff),n=qa(Math.max(0,Math.min(1,e.resonance))*100);return e.mode==="hp"?{type:"highpass",dials:{cutoff:t<=20?0:qa(100*Math.log(t/20)/Math.log(100)),q:n}}:e.mode==="bp"?{type:"bandpass",dials:{centre_hz:qa(100*Math.log(Math.max(100,t)/100)/Math.log(80)),q:n,mix:100}}:{type:"lowpass",dials:{cutoff:e.cutoff>=.999?0:qa(100*Math.log(t/2e4)/Math.log(150/2e4))}}}function Sv(e){const{type:t,dials:n}=Pr(e);if(t==="highpass"){const s=n.cutoff??0;return{hz:20*100**(s/100),q:Math.SQRT1_2*(8/Math.SQRT1_2)**((n.q??0)/100),open:s<=0}}if(t==="bandpass")return{hz:100*80**((n.centre_hz??0)/100),q:.4*20**((n.q??0)/100),open:!1};const a=n.cutoff??0;return{hz:2e4*(150/2e4)**(a/100),q:Math.SQRT1_2,open:a<=0}}const Sp=e=>!e.on||e.mode==="lp"&&e.cutoff>=.999;function Ti(e){const t=Pr(e.filter);return{v:2,chain:[{id:`${t.type}-1`,type:t.type,bypass:Sp(e.filter),dials:t.dials},{id:"drive-1",type:"drive",bypass:!e.drive.on,dials:{...e.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!e.compressor.on,dials:{...e.compressor.dials}}]}}function Ev(e,t){if(!e||e.chain.length!==t.chain.length)return{whole:!0};if(e.chain.some((a,s)=>a.type!==t.chain[s]?.type))return{whole:!0};const n=[];return t.chain.forEach((a,s)=>{const o=e.chain[s];if(o){o.bypass!==a.bypass&&n.push([a.id,"bypass",a.bypass]);for(const[i,l]of Object.entries(a.dials))o.dials[i]!==l&&n.push([a.id,i,l])}}),{whole:!1,params:n}}const Av="/nyx/assets/instrument-processor-Cs9AixLE.js",Ep={KeyA:0,KeyW:1,KeyS:2,KeyE:3,KeyD:4,KeyF:5,KeyT:6,KeyG:7,KeyY:8,KeyH:9,KeyU:10,KeyJ:11,KeyK:12,KeyO:13,KeyL:14,KeyP:15,Semicolon:16,Quote:17},Ap="KeyZ",Ci="KeyX",Mp="KeyC",Ni="KeyV",Mv=[...Object.keys(Ep),Ap,Ci,Mp,Ni],Lv=/\.(wav|wave|flac|ogg|oga|mp3|m4a|aac|aif|aiff|webm)$/i,Tv=-27,Fc=e=>Math.max(.05,Math.min(1,e))**1.5,Cv=e=>10**(e/20),Ao=e=>`${e.zones.length}|${e.zones[0]?.s}|${e.zones[e.zones.length-1]?.s}`;class Nv{constructor(t){this.host=t,this.panel=L("section",{class:"nyx-inst","data-nyx-inst":""}),this.picker=L("input",{type:"file",multiple:""}),this.picker.setAttribute("webkitdirectory",""),this.picker.hidden=!0,this.picker.addEventListener("change",()=>{const n=[...this.picker.files??[]].map(a=>({path:a.webkitRelativePath||a.name,file:a}));this.picker.value="",n.length&&this.open(n)}),this.panel.addEventListener("dragover",n=>{n.dataTransfer?.types.includes("Files")&&(n.preventDefault(),this.panel.setAttribute("data-drag",""))}),this.panel.addEventListener("dragleave",n=>{this.panel.contains(n.relatedTarget)||this.panel.removeAttribute("data-drag")}),this.panel.addEventListener("drop",n=>{this.panel.removeAttribute("data-drag"),n.dataTransfer&&(n.preventDefault(),n.stopPropagation(),Lp(n.dataTransfer).then(a=>{a.length&&this.open(a)}))}),this.refresh()}panel;picker;sentHashes=new Set;turn=0;serial=0;hand=new Map;keysDown=new Map;busIds=new Set;scrim=null;memo="";marks=new Map;last=null;kept=null;log=[];inst(){return this.host.get()}async noteOn(t,n,a,s="hand",o=0){const i=this.inst();if(!i)return!1;const l=await this.host.audio();if(!l)return!1;await this.sendSamples(i,l.node);const c=e0(i.zones,n,a*127,this.turn++);if(!c)return!1;const d={note:n,v:Ht(a*127),...Ky(i.zones,c),src:s},u=o?(o-l.ctx.currentTime)*1e3:0;u>5?setTimeout(()=>this.showLast(d),u):this.showLast(d);const h=await this.host.store.get(c.s);if(!h)return!1;const p=2**(t0(c,n)/12)*(h.sampleRate/l.ctx.sampleRate),f=Cv(i.gainDb+c.gain)*Fc(a);return l.node.port.postMessage({type:"on",id:t,s:c.s,ratio:p,gain:f,at:o,loop:c.loop,rel:c.release,src:s,note:n}),this.log.push({note:n,key:c.key,ratio:p,at:o,src:s,v:d.v,lv:c.lv}),this.log.length>512&&this.log.splice(0,256),!0}async noteOff(t,n=0){(await this.host.audio())?.node.port.postMessage({type:"off",id:t,at:n})}handOn(t,n,a,s){this.hand.set(t,n),s&&this.marks.set(t,s),this.noteOn(`h|${t}`,n,a),this.host.report?.(t,n,!0,a),this.paintHeld()}handOff(t){this.hand.has(t)&&(this.hand.delete(t),this.marks.delete(t),this.noteOff(`h|${t}`),this.host.report?.(t,0,!1,0),this.paintHeld())}releaseAll(){for(const t of[...this.hand.keys()])this.handOff(t);this.keysDown.clear()}padOn(t,n,a){const s=this.inst();if(!s)return;const o=s.padVelocity==="position"&&a!==null,i=o?Uy(a):s.velocity;this.handOn(t,n,i/127,{v:i,at:o?a:null})}held(){return[...this.hand.values()].sort((t,n)=>t-n)}keyDown(t){const n=this.inst();if(!n)return!1;if(t.code===Ap||t.code===Ci)return this.setOctave(n.octave+(t.code===Ci?1:-1)),!0;if(t.code===Mp||t.code===Ni)return this.setVelocity(So(n.velocity,t.code===Ni?1:-1)),!0;const a=Ep[t.code];if(a===void 0)return!1;if(this.keysDown.has(t.code))return!0;const s=(n.octave+1)*12+a,o=`k|${t.code}`;return this.keysDown.set(t.code,o),this.handOn(o,s,n.velocity/127),!0}keyUp(t){const n=this.keysDown.get(t.code);return n?(this.keysDown.delete(t.code),this.handOff(n),!0):!1}bus(t){if(!this.inst())return;const n=t.source??"bus";if(t.kind==="notes"&&t.events){for(const a of t.events){const s=`${n}|${a.id}`;if(this.busIds.has(s))continue;const o=this.host.timeOf?.(a.startBeat),i=this.host.timeOf?.(a.startBeat+Math.max(.01,a.lengthBeats));if(o==null||i===null||i===void 0)continue;this.busIds.add(s);const l=a.offsetSec??0;this.noteOn(s,a.note,a.velocity,n,o+l).then(c=>{c&&this.noteOff(s,i+l)})}this.busIds.size>4096&&this.busIds.clear()}else if(t.kind==="audition"&&t.events){const a=Math.max(.05,t.holdSec??.5);for(const s of t.events){const o=`${n}|a|${++this.serial}`;this.noteOn(o,s.note,s.velocity,n).then(async i=>{if(!i)return;const l=await this.host.audio();l&&this.noteOff(o,l.ctx.currentTime+a)})}}else if(t.kind==="off"){this.host.audio().then(a=>{const s=t.atBeat===void 0?void 0:this.host.timeOf?.(t.atBeat)??void 0;a?.node.port.postMessage({type:"offsrc",src:n,...s===void 0?{}:{at:s}})});for(const a of[...this.busIds])a.startsWith(`${n}|`)&&this.busIds.delete(a)}else if(t.kind==="release"&&t.ids)for(const a of t.ids)this.noteOff(`${n}|${a}`)}async sendSamples(t=this.inst(),n){if(!t)return;const a=n??(await this.host.audio())?.node;if(!a)return;const s=`${t.poly}|${t.glideMs}`;s!==this.memo&&(this.memo=s,a.port.postMessage({type:"set",poly:t.poly,glide:t.glideMs/1e3,gain:1}));for(const o of t.zones){if(this.sentHashes.has(o.s))continue;const i=await this.host.store.get(o.s);i&&(this.sentHashes.add(o.s),a.port.postMessage({type:"sample",id:o.s,data:i.data.map(l=>l.slice())}))}}resend(){this.sentHashes.clear(),this.memo="",this.sendSamples()}setOctave(t){const n=this.inst();n&&(this.host.set({...n,octave:Math.max(1,Math.min(6,t))}),this.flashRange=!0,this.refresh(),setTimeout(()=>{this.flashRange=!1,this.refresh()},1e3))}flashRange=!1;setVelocity(t){const n=this.inst();n&&(this.host.set({...n,velocity:Ht(t)}),this.flashVelocity=!0,this.refresh(),clearTimeout(this.flashTimer),this.flashTimer=setTimeout(()=>{this.flashVelocity=!1,this.refresh()},1e3))}flashVelocity=!1;flashTimer;keepMap(t){const n=this.inst();this.kept=n?{map:t,sig:Ao(n)}:null,this.refresh()}loadMore(){const t=this.inst();if(t&&this.kept&&this.kept.sig===Ao(t)){this.kept.map.more();return}this.openPicker()}canReopen(){const t=this.inst();return!!(t&&this.kept&&this.kept.sig===Ao(t))}showLast(t){this.last=t,this.paintLast()}paintLast(){const t=this.panel.querySelector("[data-nyx-inst-last]");if(!t)return;const n=this.last;if(!n){t.replaceChildren(L("span",{class:"nyx-inst-off"},"Play a pad to see its velocity and layer"));return}const a=L("span",{class:"nyx-inst-meter","aria-hidden":"true","data-nyx-inst":"meter"});for(let s=1;s<=n.of;s++)a.append(L("i",{style:`height: ${Math.round(35+65*(s-1)/Math.max(1,n.of-1))}%`,...s===n.layer?{"data-on":""}:{}}));t.replaceChildren(L("span",{"data-nyx-inst":"last"},`${je(n.note)} · velocity ${n.v} · ${$o(n.v)} · layer ${n.layer} of ${n.of}`),a)}edit(t){const n=this.inst();n&&(this.host.set({...n,...t}),("poly"in t||"glideMs"in t)&&this.sendSamples(),this.refresh())}openPicker(){this.picker.click()}refresh(){const t=this.inst(),n=this.panel;n.replaceChildren(this.picker);const a=L("div",{class:"nyx-inst-head"}),s=Ae("Load another instrument…",!1,()=>this.openPicker(),"load");if(this.host.help?.(s,"inst:load"),!t){const E=L("button",{type:"button",class:"nyx-inst-empty","data-nyx-inst-empty":"","data-nyx-inst":"load"},L("span",{class:"nyx-inst-empty-lead"},"Drop a folder of note samples or an .sfz here, or click to choose one."),L("span",{class:"nyx-inst-empty-sub"},"NYX reads each note from the file names or the SFZ and shows you the key map before it loads."));E.addEventListener("click",()=>this.openPicker()),this.host.help?.(E,"inst:load"),n.append(E);return}const o=t.zones.length?`${t.layers} of ${t.layersFound} layers`:"";a.append(L("span",{class:"nyx-inst-name"},t.name),L("span",{class:"nyx-inst-meta"},[o,t.poly?"Poly":"Mono"].filter(Boolean).join(" · ")),s),n.append(a);const i=L("div",{class:"nyx-inst-body"}),l=L("div",{class:"nyx-inst-pads","data-nyx-inst-pads":""}),c=i0(t.root,t.scale,t.octave,t.rows);for(let E=3;E>=0;E--)for(let M=0;M<4;M++){const B=E*4+M,I=c[B],ie=L("button",{type:"button",class:"nyx-inst-pad","data-nyx-inst-pad":String(B),"data-note":String(I),...(I%12+12)%12===t.root?{"data-root":""}:{},"aria-label":`Play ${je(I)}`},L("span",{class:"nyx-inst-pad-n"},xi[(I%12+12)%12]),L("span",{class:"nyx-inst-pad-d"},je(I)));Pv(this,ie,I),l.append(ie)}const d=L("div",{class:"nyx-inst-side"});d.append(L("div",{class:"nyx-inst-chord","data-nyx-inst-chord":""}));const u=L("div",{class:"nyx-inst-ctl"}),h=L("select",{class:"nyx-inst-select","aria-label":"Key","data-nyx-inst":"key"});xi.forEach((E,M)=>h.append(new Option(E,String(M),!1,M===t.root))),h.addEventListener("change",()=>this.edit({root:Number(h.value)})),u.append(Je("Key",h,L("span",{class:"nyx-inst-off"},uc[t.scale].toLowerCase()))),u.append(Je("Scale",...Object.keys(Is).map(E=>Ae(uc[E],t.scale===E,()=>this.edit({scale:E}),`scale-${E}`)))),u.append(Je("Rows",...[["scale","each row continues the scale"],["fourth","each row up a 4th"]].map(([E,M])=>Ae(M,t.rows===E,()=>this.edit({rows:E}),`rows-${E}`))));const p=L("b",{class:"nyx-inst-range","data-nyx-inst":"range",...this.flashRange?{"data-flash":""}:{}},r0(c));u.append(Je("Octave",Ae("z −",!1,()=>this.setOctave(t.octave-1),"oct-down"),p,Ae("+ x",!1,()=>this.setOctave(t.octave+1),"oct-up"))),u.append(Je("Plays",Ae("Poly",t.poly,()=>this.edit({poly:!0}),"poly"),Ae(`Mono · glide ${Math.round(t.glideMs)} ms`,!t.poly,()=>this.edit({poly:!1,glideMs:t.glideMs||ki}),"mono")));const f=t.velocity,g=L("b",{class:"nyx-inst-range nyx-inst-velout","data-nyx-inst":"velocity",...this.flashVelocity?{"data-flash":""}:{}},`${f} · ${$o(f)}`),w=L("input",{type:"range",class:"nc-range nyx-inst-velrange",min:"1",max:"127",step:"1",value:String(f),"aria-label":"Velocity","data-nyx-inst":"vel-slider"});w.addEventListener("input",()=>{const E=this.inst();E&&(E.velocity=Ht(Number(w.value)),g.textContent=`${E.velocity} · ${$o(E.velocity)}`)}),w.addEventListener("change",()=>{const E=w.matches(":focus-visible");this.edit({velocity:Ht(Number(w.value))}),this.panel.querySelector('[data-nyx-inst="vel-slider"]')?.focus({preventScroll:!0,focusVisible:E})});const m=Ae("c −",!1,()=>this.setVelocity(So(f,-1)),"vel-down"),b=Ae("+ v",!1,()=>this.setVelocity(So(f,1)),"vel-up");for(const[E,M]of[[g,"inst:velocity"],[w,"inst:velocity"],[m,"inst:vel-down"],[b,"inst:vel-up"]])this.host.help?.(E,M);u.append(Je("Velocity",L("span",{class:"nyx-inst-vel"},m,g,b,w),L("span",{class:"nyx-inst-note"},"QWERTY keys play at this. C and V step through ppp … fff.")));const v=t.padVelocity==="position",y=Ae("By position",v,()=>this.edit({padVelocity:"position"}),"padvel-position"),x=Ae("Same as keys",!v,()=>this.edit({padVelocity:"keys"}),"padvel-keys");this.host.help?.(y,"inst:padvel-position"),this.host.help?.(x,"inst:padvel-keys"),u.append(Je("Pads",y,x,L("span",{class:"nyx-inst-note"},v?"Higher on a pad plays louder, 1 at the bottom edge to 127 at the top.":"Every pad plays at the keys' velocity.")));const S=L("span",{class:"nyx-inst-last","data-nyx-inst-last":""});this.host.help?.(S,"inst:last"),u.append(Je("Last note",S));const k=L("span",{"data-nyx-inst":"layers"},`${t.layers} of ${t.layersFound} loaded`);this.host.help?.(k,"inst:layers");const $=[];if(t.layers<t.layersFound){const E=L("button",{type:"button",class:"nyx-inst-link","data-nyx-inst":"more"},"Load more…");E.addEventListener("click",()=>this.loadMore()),this.host.help?.(E,this.canReopen()?"inst:more":"inst:more-folder"),$.push(E,L("span",{class:"nyx-inst-note"},`More layers make soft and hard playing sound more different. All ${t.layersFound} use more memory.${this.canReopen()?"":" After a reload, choose the folder again."}`))}u.append(Je("Layers",k,...$)),u.append(Je("Also from",L("span",{class:"nyx-inst-off"},"QWERTY keys · CALLIOPE · LUPA replays"))),d.append(u),t.credit&&d.append(L("p",{class:"nyx-inst-credit"},t.credit)),i.append(l,d),n.append(i),this.paintHeld(),this.paintLast()}paintHeld(){const t=this.held(),n=new Set(t),a=new Map;for(const[i,l]of this.marks){const c=this.hand.get(i);c!==void 0&&a.set(c,l)}for(const i of this.panel.querySelectorAll("[data-nyx-inst-pad]")){const l=Number(i.dataset.note);i.toggleAttribute("data-on",n.has(l));for(const u of i.querySelectorAll("[data-nyx-inst-vel]"))u.remove();const c=a.get(l);if(i.toggleAttribute("data-vel",!!c),!c)continue;const d=c.v/127*100;i.append(L("span",{class:"nyx-inst-padbar","data-nyx-inst-vel":"bar",style:`height: ${d.toFixed(1)}%`})),c.at!==null&&i.append(L("span",{class:"nyx-inst-padline","data-nyx-inst-vel":"line",style:`bottom: ${(c.at*100).toFixed(1)}%`})),i.append(L("span",{class:"nyx-inst-padv","data-nyx-inst-vel":"v"},String(c.v)))}const s=this.panel.querySelector("[data-nyx-inst-chord]");if(!s)return;if(!t.length){s.replaceChildren(L("span",{class:"nyx-inst-chord-hint"},"Hold a few pads to play a chord; NYX names it here."));return}const o=c0(t)??(t.length===1?je(t[0]):null);s.replaceChildren(L("span",{class:"nyx-inst-chord-name","data-nyx-inst":"chord"},o??"—"),L("small",{},`${t.map(je).join(" · ")}${t.length>1?` — held on ${t.length} notes`:""}`))}async open(t,n){const s=(await this.host.audio())?.ctx.sampleRate??48e3,o=t.filter(b=>/\.sfz$/i.test(b.path)).sort((b,v)=>Oc(b.path)-Oc(v.path)||b.path.localeCompare(v.path))[0],i=t.filter(b=>Lv.test(b.path)),l=new Map(i.map(b=>[Lo(b.path),b]));let c=[],d=0,u=[],h=[],p=Dv(t.map(b=>b.path))||"Instrument";if(o){const b=Qy(await o.file.text());u=b.comments,h=b.unsupported,p=o.path.split("/").pop()?.replace(/\.sfz$/i,"")??p;const v=o.path.includes("/")?o.path.slice(0,o.path.lastIndexOf("/")+1):"";for(const x of b.regions){const S=l.get(Lo(v+x.sample))??l.get(Lo(x.sample));if(!S){d++;continue}c.push({path:S.path,file:S.path.split("/").pop()??S.path,key:x.center,source:"sfz",flag:null,layer:null,rank:x.hivel,rr:x.seqLength>1?x.seqPosition:1,bytes:S.file.size,region:x})}const y=sa(c);for(const x of c)x.layer=y.length>1?`${y.indexOf(x.rank)+1} of ${y.length}`:"—"}else c=i.map(b=>{const v=Gy(b.path.split("/").pop()??b.path);return{path:b.path,file:b.path.split("/").pop()??b.path,key:v.key,source:v.key===null?null:"name",flag:v.key===null?"check":null,layer:v.layer?.label??null,rank:v.layer?.rank??0,rr:v.rr??1,bytes:b.file.size}});const f=sa(c.filter(b=>b.rank>0));if(f.length)for(const b of c)b.rank===0&&(b.rank=f[Math.floor((f.length-1)/2)]);if(!c.length){this.host.message?.(o?`The SFZ names ${d} samples that aren't in the folder. Drop the folder that holds them.`:"No audio files there. Drop a folder of note samples (WAV, FLAC, OGG or MP3).");return}n?.name&&(p=n.name),n?.note&&(d=0,this.host.message?.(n.note));const g=new Map(i.map(b=>[b.path,b.file])),w=n?.credit||await Bv(t,u),m=new Fv(this,{name:p,entries:c,files:g,rate:s,missing:d,unsupported:h,credit:w,fromSfz:!!o});m.open(),m.hear()}async load(t,n,a,s,o){const l=(await this.host.audio())?.ctx.sampleRate??48e3,c=t.filter(y=>y.key!==null&&a.includes(y.rank)),d=new Map,u=new Map;let h=0,p=0,f=Number.NEGATIVE_INFINITY;const g=a[Math.floor((a.length-1)/2)];for(const y of c){const x=n.get(y.path);if(x){try{const S=await Pi(await x.arrayBuffer(),l),k=Array.from({length:Math.min(2,S.numberOfChannels)},(M,B)=>new Float32Array(S.getChannelData(B))),{sample:$}=await this.host.store.put(k,S.sampleRate);d.set(y.path,$.hash);const E=y.region?await Ov(x):null;u.set(y.path,E?S.sampleRate/E:1),y.rank===g&&y.key!==null&&Math.abs(y.key-60)<=12&&(f=Math.max(f,zc(k[0],S.sampleRate)))}catch{p++}o(++h,c.length)}}if(!d.size)return!1;if(p&&this.host.message?.(`${p} ${p===1?"file":"files"} couldn't be read by this browser and ${p===1?"was":"were"} left out. WAV or FLAC copies of them will load.`),!Number.isFinite(f))for(const y of c){const x=d.get(y.path),S=x?await this.host.store.get(x):null;S&&y.rank===g&&(f=Math.max(f,zc(S.data[0],S.sampleRate)))}const w=c.filter(y=>d.has(y.path)),m=tp(w,a,y=>d.get(y.path)).map((y,x)=>{const S=w[x],k=u.get(S.path)??1;return y.loop?{...y,loop:[y.loop[0]*k,y.loop[1]*k]}:y}),b=this.inst(),v=Number.isFinite(f)?Math.max(-24,Math.min(36,Tv-f-20*Math.log10(Fc(pa/127)))):0;return this.host.set({name:s.name.slice(0,80)||"Instrument",credit:s.credit.slice(0,200),zones:m,layers:a.length,layersFound:s.layersFound,poly:s.poly,glideMs:b?.glideMs??ki,root:b?.root??0,scale:b?.scale??"minor",rows:b?.rows??"scale",octave:b?.octave??3,gainDb:v,velocity:b?.velocity??pa,padVelocity:b?.padVelocity??"position"}),this.memo="",await this.sendSamples(),this.host.setMode("instrument"),this.refresh(),!0}}class Fv{constructor(t,n){this.inst=t,this.o=n,this.layers=sa(n.entries),this.count=Math.min(Yy,Math.max(1,this.layers.length)),this.credit=n.credit,this.name=n.name,this.root=L("div",{class:"nyx-rgn nyx-inst-map",role:"dialog","aria-label":"Load instrument",tabindex:"-1"}),this.scrim=L("div",{class:"nyx-rgn-scrim","data-nyx-inst-map":""},this.root),this.scrim.addEventListener("pointerdown",a=>{a.target===this.scrim&&this.close()}),this.root.addEventListener("keydown",a=>{a.key==="Escape"&&this.close(),a.stopPropagation()})}layers;count;poly=!0;credit;name;root;scrim;ratio={};wav=new Map;busy="";error="";open(){document.body.append(this.scrim),document.documentElement.setAttribute("data-nyx-rgn-open",""),this.measure().then(()=>this.render()),this.render(),this.root.focus({preventScroll:!0})}more(){this.count=Math.max(1,this.layers.length),this.busy="",this.error="",this.open()}close(){this.scrim.remove(),document.documentElement.removeAttribute("data-nyx-rgn-open")}async hear(){const t=this.o.entries.filter(a=>a.key===null).slice(0,256);if(!t.length)return;let n=null;try{n=new Worker(new URL("/nyx/assets/instrument-pitch-worker-CV5CCV4z.js",import.meta.url),{type:"module"})}catch{n=null}for(const a of t){const s=this.o.files.get(a.path);if(s){try{const o=await Pi(await s.arrayBuffer(),this.o.rate),i=o.getChannelData(0).slice(0,Math.round(o.sampleRate*1.2)),l=n?await new Promise(c=>{const d=n,u=h=>{h.data.id===a.path&&(d.removeEventListener("message",u),c(h.data.heard))};d.addEventListener("message",u),d.postMessage({id:a.path,data:i,rate:o.sampleRate},[i.buffer])}):null;l?(a.key=l.note,a.source="heard",a.flag="check"):a.flag="assign"}catch{a.flag="assign"}this.layers=sa(this.o.entries),this.render()}}n?.terminate()}async measure(){const t=new Set;for(const n of this.o.entries){const a=this.o.files.get(n.path);if(!a)continue;const s=Mo(n.path);if(s==="wav"||s==="wave")try{this.wav.set(n.path,np(await a.slice(0,65536).arrayBuffer()))}catch{this.wav.set(n.path,null)}else t.add(s)}for(const n of t){const a=this.o.entries.find(o=>Mo(o.path)===n),s=a&&this.o.files.get(a.path);if(s)try{const o=await Pi(await s.arrayBuffer(),this.o.rate);this.ratio[n]=o.length*Math.min(2,o.numberOfChannels)*4/Math.max(1,s.size)}catch{this.ratio[n]=4}}}chosen(){return Zy(this.layers,this.count)}bytesFor(t){const n=this.o.entries.filter(a=>a.key!==null&&t.includes(a.rank));return s0(n.map(a=>{const s=this.wav.get(a.path);return{bytes:a.bytes,ext:Mo(a.path),...s?{frames:s.frames,channels:Math.min(2,s.channels),rate:s.rate}:{}}}),this.o.rate,{default:4,...this.ratio})}render(){const t=this.root,n=this.chosen(),a=tp(this.o.entries,n,k=>k.path),s=n0(a),o=L("div",{class:"nyx-rgn-head"},L("span",{class:"nyx-rgn-brand"},"NYX"),L("span",{class:"nyx-rgn-pad"},"Load instrument"),L("span",{class:"nyx-rgn-file"},[this.name,`${new Set(this.o.entries.filter(k=>k.key!==null).map(k=>k.key)).size} notes`,`${this.layers.length} velocity layer${this.layers.length===1?"":"s"} found`,this.o.fromSfz?"from SFZ":"from file names"].join(" · "))),i=L("button",{type:"button",class:"nyx-rgn-x","aria-label":"Close"},"×");i.addEventListener("click",()=>this.close()),o.append(L("span",{class:"nyx-rgn-meta"}),i);const l=L("div",{class:"nyx-inst-kb","data-nyx-inst-map-kb":""});l.innerHTML=zv(s);const c=L("div",{class:"nyx-inst-legend"},_a("sampled","sampled note"),_a("near","covered by stretching"),_a("far","stretched more than 4 semitones"),_a("silent","silent"),L("span",{class:"nyx-inst-legend-r"},`${je(Gt)} – ${je(Vt)}`)),d=L("table",{class:"nyx-inst-table"});d.append(L("tr",{},L("th",{},"File"),L("th",{},"Key"),L("th",{},"Layer"),L("th",{},"Read from")));const u=[...this.o.entries].sort((k,$)=>(k.flag?0:1)-($.flag?0:1)||(k.key??999)-($.key??999));for(const k of u.slice(0,200)){const $=L("td",{class:"nyx-inst-mono"});if(k.flag){const M=L("select",{class:"nyx-inst-select","aria-label":`Key for ${k.file}`,"data-nyx-inst-assign":k.file});M.append(new Option("—",""));for(let B=Gt;B<=Vt;B++)M.append(new Option(je(B),String(B),!1,k.key===B));M.addEventListener("change",()=>{k.key=M.value===""?null:Number(M.value),k.source=k.key===null?null:"you",k.flag=k.key===null?"assign":null,this.layers=sa(this.o.entries),this.render()}),$.append(M)}else $.textContent=k.key===null?"—":je(k.key);const E=L("td",{class:k.flag?"nyx-inst-warn":"nyx-inst-sub"});E.textContent=k.flag==="check"?k.key===null?"listening…":"heard pitch · check":k.flag==="assign"?"no pitch · assign":k.source==="sfz"?"SFZ":k.source==="you"?"you":k.source==="heard"?"heard pitch":"file name",d.append(L("tr",{"data-nyx-inst-row":k.file,...k.flag?{"data-flag":k.flag}:{}},L("td",{},k.file),$,L("td",{class:"nyx-inst-mono"},k.layer??"—"),E))}u.length>200&&d.append(L("tr",{},L("td",{colspan:"4",class:"nyx-inst-sub"},`and ${u.length-200} more`)));const h=L("div",{class:"nyx-inst-mapside"}),p=L("input",{type:"range",class:"nc-range nyx-inst-detail",min:"1",max:String(Math.max(1,this.layers.length)),step:"1",value:String(this.count),"aria-label":"Velocity layers to load","data-nyx-inst":"detail"});p.disabled=this.layers.length<=1,p.addEventListener("input",()=>{const k=p.matches(":focus-visible");this.count=Number(p.value),this.render(),this.root.querySelector('[data-nyx-inst="detail"]')?.focus({preventScroll:!0,focusVisible:k})});const f=this.bytesFor(n),g=this.bytesFor(this.layers);h.append(L("div",{class:"nyx-inst-k"},"Detail"),L("div",{},`${n.length} of ${this.layers.length} velocity layer${this.layers.length===1?"":"s"}`),p,L("div",{class:"nyx-inst-k","data-nyx-inst":"memory"},`${dc(f)} in memory${g>f?` · full detail would be ${dc(g)}`:""}`),L("div",{class:"nyx-inst-k nyx-inst-gap"},"Plays"),L("div",{},Ae("Poly · up to 32 notes",this.poly,()=>{this.poly=!0,this.render()},"map-poly")," ",Ae("Mono",!this.poly,()=>{this.poly=!1,this.render()},"map-mono")),L("div",{class:"nyx-inst-k nyx-inst-gap"},"Name"));const w=L("input",{type:"text",class:"nyx-inst-text",value:this.name,"aria-label":"Instrument name"});w.addEventListener("input",()=>{this.name=w.value});const m=L("input",{type:"text",class:"nyx-inst-text",value:this.credit,placeholder:"Who made it, and its licence","aria-label":"Credit"});m.addEventListener("input",()=>{this.credit=m.value}),h.append(w,L("div",{class:"nyx-inst-k nyx-inst-gap"},"Credit"),m),this.o.missing&&h.append(L("p",{class:"nyx-inst-warn"},`${this.o.missing} samples the SFZ names aren't in the folder.`));const b=this.o.entries.some(k=>k.key!==null&&n.includes(k.rank)),v=L("button",{type:"button",class:"nyx-inst-go","data-nyx-inst":"go"},this.busy||"Load into NYX");v.disabled=!!this.busy||!b;const y=this.error?this.error:b?"":"No file has a key yet. Pick a key for at least one file in the table.";v.addEventListener("click",async()=>{this.busy="Loading…",this.render();const k=await this.inst.load(this.o.entries,this.o.files,n,{name:this.name,credit:this.credit,poly:this.poly,layersFound:this.layers.length},($,E)=>{this.busy=`Loading ${$} of ${E}…`;const M=this.root.querySelector('[data-nyx-inst="go"]');M&&(M.textContent=this.busy)});this.busy="",this.error=k?"":"This browser couldn't read any of these files. Save them as WAV or FLAC and drop the folder again.",k?(this.inst.keepMap(this),this.close()):this.render()});const x=L("button",{type:"button",class:"nyx-inst-cancel"},"Cancel");x.addEventListener("click",()=>this.close()),h.append(L("div",{class:"nyx-inst-actions"},v,x)),y&&h.append(L("p",{class:"nyx-inst-error",role:"status","data-nyx-inst":"why"},y));const S=L("div",{class:"nyx-inst-mapgrid"},L("div",{class:"nyx-inst-tablewrap"},d),h);t.replaceChildren(o,L("div",{class:"nyx-inst-mapbody"},l,c,S))}}const Fi=new Map;let Pc=!1;function Yn(e){const t=Fi.get(e.pointerId);t&&(Fi.delete(e.pointerId),t.inst.handOff(t.key))}function Pv(e,t,n){Pc||(Pc=!0,window.addEventListener("pointerup",Yn,!0),window.addEventListener("pointercancel",Yn,!0)),t.addEventListener("pointerdown",a=>{a.preventDefault();try{t.setPointerCapture?.(a.pointerId)}catch{}const s=t.getBoundingClientRect(),o=s.height?(a.clientY-s.top)/s.height:.5,i=`p|${n}|${a.pointerId}`;Fi.set(a.pointerId,{inst:e,key:i}),e.padOn(i,n,Math.max(0,Math.min(1,1-o)))}),t.addEventListener("pointerup",Yn),t.addEventListener("pointercancel",Yn),t.addEventListener("lostpointercapture",a=>{t.isConnected&&Yn(a)}),t.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&!a.repeat&&(a.preventDefault(),a.stopPropagation(),e.padOn(`p|${n}|key`,n,null))}),t.addEventListener("keyup",a=>{(a.key==="Enter"||a.key===" ")&&(a.stopPropagation(),e.handOff(`p|${n}|key`))})}function L(e,t={},...n){const a=document.createElement(e);for(const[s,o]of Object.entries(t))a.setAttribute(s,o);for(const s of n)a.append(s);return a}function Ae(e,t,n,a){const s=L("button",{type:"button",class:"nyx-inst-choice","data-nyx-inst":a,"aria-pressed":t?"true":"false"},e);return s.addEventListener("click",n),s}function Je(e,...t){return L("div",{class:"nyx-inst-row"},L("span",{class:"nyx-inst-k"},e),L("span",{class:"nyx-inst-v"},...t))}function _a(e,t){return L("span",{},L("span",{class:"nyx-inst-sw","data-mark":e}),t)}function zv(e){const t=[0,2,4,5,7,9,11],n=[];for(let d=Gt;d<=Vt;d++)t.includes(d%12)&&n.push(d);const a=1040,s=96,o=a/n.length,i=d=>`var(--nyx-inst-${e.get(d)??"silent"})`;let l="";n.forEach((d,u)=>{l+=`<rect x="${(u*o+.5).toFixed(2)}" y="0" width="${(o-1).toFixed(2)}" height="${s}" fill="var(--nyx-inst-white)"/>`,l+=`<rect data-key="${d}" data-mark="${e.get(d)}" x="${(u*o+.5).toFixed(2)}" y="${s-14}" width="${(o-1).toFixed(2)}" height="14" fill="${i(d)}"/>`,d%12===0&&(l+=`<text x="${(u*o+o/2).toFixed(2)}" y="${s-20}" font-size="9" text-anchor="middle" fill="var(--nyx-inst-label)">C${d/12-1}</text>`)});let c=0;for(let d=Gt;d<=Vt;d++){if(t.includes(d%12)){c++;continue}const u=c*o-o*.32;l+=`<rect x="${u.toFixed(2)}" y="0" width="${(o*.64).toFixed(2)}" height="${(s*.58).toFixed(2)}" rx="1.5" fill="var(--nyx-inst-black)"/>`,l+=`<rect data-key="${d}" data-mark="${e.get(d)}" x="${(u+1).toFixed(2)}" y="${(s*.58-8).toFixed(2)}" width="${(o*.64-2).toFixed(2)}" height="6" fill="${i(d)}"/>`}return`<svg viewBox="0 0 ${a} ${s}" preserveAspectRatio="none" role="img" aria-label="Which sample plays each key">${l}</svg>`}async function Pi(e,t){return new OfflineAudioContext(1,1,t).decodeAudioData(e)}async function Ov(e){if(!/\.wave?$/i.test(e.name))return null;try{return np(await e.slice(0,65536).arrayBuffer())?.rate??null}catch{return null}}function zc(e,t){const n=Math.max(1,Math.round(t*.05));let a=0,s=0;for(let o=0;o<e.length;o++)s+=e[o]*e[o],o>=n&&(s-=e[o-n]*e[o-n]),o>=n-1&&(a=Math.max(a,s/n));return a>0?10*Math.log10(a):Number.NEGATIVE_INFINITY}function Mo(e){return(/\.([^.]+)$/.exec(e)?.[1]??"").toLowerCase()}function Lo(e){const t=[];for(const n of e.replace(/\\/g,"/").split("/"))!n||n==="."||(n===".."?t.pop():t.push(n.toLowerCase()));return t.join("/")}function Oc(e){return e.split("/").length}function Dv(e){const t=e[0]?.split("/")??[];return t.length>1&&e.every(n=>n.split("/")[0]===t[0])?t[0]:""}async function Bv(e,t){const n=[...t];for(const i of e)if(/(readme|licen[cs]e|credits?|about)[^/]*\.(txt|md)$/i.test(i.path)||/\/(licen[cs]e|readme)$/i.test(i.path))try{n.push(...(await i.file.slice(0,2e4).text()).split(/\r?\n/))}catch{}const a=n.find(i=>/\b(CC[- ]?BY(?:[- ][A-Z]{2})*(?:[- ]\d\.\d)?|CC0|public domain|creative commons)/i.test(i)),o=[n.find(i=>/\bby\s+[A-Z][\w.'-]+/.test(i))?.trim(),a?.trim()].filter(i=>!!i);return[...new Set(o)].join(" · ").slice(0,200)}async function Lp(e){const t=[],a=[...e.items??[]].map(o=>o.webkitGetAsEntry?.()).filter(o=>!!o);if(!a.length){for(const o of[...e.files??[]])t.push({path:o.name,file:o});return t}const s=async(o,i)=>{if(o.isFile){const l=await new Promise(c=>o.file(c,()=>c(null)));l&&t.push({path:i+o.name,file:l})}else if(o.isDirectory){const l=o.createReader();for(;;){const c=await new Promise(d=>l.readEntries(d,()=>d([])));if(!c.length)break;for(const d of c)await s(d,`${i+o.name}/`)}}};for(const o of a)await s(o,"");return t}const Yt=["KeyQ","KeyW","KeyE","KeyR","KeyA","KeyS","KeyD","KeyF"],Rv=Array.from({length:ne},(e,t)=>{const n=(Yt[t%Yt.length]??"").slice(3);return t<Yt.length?n.toLowerCase():n.toUpperCase()});function Tp(e){const t=Yt.indexOf(e.code);if(t<0)return-1;const n=e.shiftKey?t+Yt.length:t;return n<ne?n:-1}class Iv{down=new Map;press(t){if(this.down.has(t.code))return-1;const n=Tp(t);return n>=0&&this.down.set(t.code,n),n}release(t){const n=this.down.get(t.code);return n===void 0?-1:(this.down.delete(t.code),n)}releaseAll(){const t=[...this.down.values()];return this.down.clear(),t}}const Jn="data-nc-pointer",qv=new Set(["range","button","checkbox","radio","submit","reset","file","color","image"]);function _v(e){const t=e;if(!t||typeof t.closest!="function")return!1;if(t.closest('textarea, [contenteditable]:not([contenteditable="false"])'))return!0;const n=t.closest("input");if(n&&!qv.has(String(n.type??"text").toLowerCase()))return!0;const a=t.closest("select");return!!a&&a.hasAttribute?.(Jn)!==!0}function Hv(e){const t=n=>n?.tagName==="SELECT";e.addEventListener("pointerdown",n=>{t(n.target)&&n.target.setAttribute(Jn,"")},!0),(e.defaultView??window).addEventListener("change",n=>{const a=n.target;t(a)&&a.hasAttribute(Jn)&&e.activeElement===a&&a.blur()}),e.addEventListener("focusout",n=>{t(n.target)&&n.target.removeAttribute(Jn)},!0),e.addEventListener("keydown",n=>{n.code==="Tab"&&t(e.activeElement)&&e.activeElement.removeAttribute(Jn)},!0)}const jv="/nyx/assets/limiter-processor-BPr7zuRH.js",Wv=.05,Yv=50,Dc=.8;function Uv(e){const t=e.outputLatency;if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t;const n=e.baseLatency;return typeof n=="number"&&Number.isFinite(n)&&n>0?n:0}function Kv(e){const t=Uv(e.ctx),n=e.frameOrigin+e.eventMs,a=e.transport.beatAt(n/1e3-t);let s=null;try{const c=e.ctx.getOutputTimestamp?.();if(c&&Number.isFinite(c.contextTime)&&Number.isFinite(c.performanceTime)&&(c.contextTime??0)>0){const d=c.contextTime+(n-(e.ctxOrigin+c.performanceTime))/1e3;s=e.transport.beatAt(e.mapper.toSharedTime(d)-t)}}catch{s=null}if(s===null||!Number.isFinite(s))return{beat:a,wallBeat:a,audioBeat:s,fallback:!0};const o=n/1e3,i=Math.abs(e.transport.beatAt(o+1)-e.transport.beatAt(o))||1,l=Math.abs(s-a)/i>Wv;return{beat:l?a:s,wallBeat:a,audioBeat:s,fallback:l}}function Xv(e){const t=e.win.performance;let n=null;const a=p=>{n={stamp:p.timeStamp,seen:t.now()}},s=["keydown","keyup","pointerdown","pointerup","pointercancel","click"];for(const p of s)e.win.addEventListener(p,a,!0);const o=new Map,i=new Map;let l=0;const c={sent:0,fallbacks:0,skipped:0,stopped:0},d=()=>{const p=t.now(),f=n;return f&&p-f.seen<Yv&&f.stamp<=p+1?f.stamp:p},u=p=>{const f=e.transport();if(!f.running){if(p.type!=="note"){c.skipped++;return}try{e.send({v:1,kind:"played",events:[{...p,beat:0,stopped:!0}]})&&c.stopped++}catch{}return}const g=Kv({eventMs:d(),frameOrigin:t.timeOrigin,ctxOrigin:e.ctxOrigin,ctx:e.ctx,mapper:e.mapper,transport:f});g.fallback&&c.fallbacks++;try{e.send({v:1,kind:"played",events:[{...p,beat:g.beat}]})&&c.sent++}catch{}},h=p=>{const f=o.get(p);f&&(o.delete(p),u({type:"note",id:f.id,on:!1,note:f.note}))};return{hit(p,f=null){if(!Number.isInteger(p)||p<0||p>15)return;o.has(p)&&h(p);const g=`p|${++l}`,w=z0(p+1);o.set(p,{id:g,note:w});let m;try{m=e.nameOf?.(p)?.trim().slice(0,$s)||void 0}catch{m=void 0}u({type:"note",id:g,on:!0,note:w,velocity:Dc,...f==null?{}:{slice:f},...m?{name:m}:{}})},release:h,note(p,f,g,w,m){const b=w??Dc;if(!g){const S=i.get(p);if(!S)return;i.delete(p),u({type:"note",id:S.id,on:!1,note:S.note});return}if(!Number.isInteger(f)||f<0||f>127)return;const v=i.get(p);v&&(i.delete(p),u({type:"note",id:v.id,on:!1,note:v.note}));const y=`n|${++l}`;i.set(p,{id:y,note:f});const x=m?.trim().slice(0,$s);u({type:"note",id:y,on:!0,note:f,velocity:b,...x?{name:x}:{}})},slot(p){!Number.isInteger(p)||p<0||p>9||u({type:"slot",id:`s|${++l}`,slot:p+1})},stats:c,dispose(){for(const p of s)e.win.removeEventListener(p,a,!0);o.clear(),i.clear()}}}function Gv(e,t,n,a=2,s=4){const o=n.top+s,l=n.bottom-s-(e.bottom+a),c=e.top-a-o;let d=!1,u=e.bottom+a,h=null;t.h>l&&(t.h<=c?(d=!0,u=e.top-a-t.h):c>l?(d=!0,h=Math.max(0,c),u=e.top-a-h):h=Math.max(0,l));const p=n.right-s-t.w,f=Math.max(n.left+s,Math.min(e.left,p));return{left:Math.round(f),top:Math.round(u),up:d,maxHeight:h}}function Vv(e=document){const t=e.defaultView,n=e.documentElement,a=n.clientWidth||t?.innerWidth||0,s=t?.innerHeight||n.clientHeight||0,o=t?.getComputedStyle(n),i=Number.parseFloat(o?.getPropertyValue("--nc-host-top")??""),l=Number.parseFloat(o?.getPropertyValue("--nc-host-height")??"");return Number.isFinite(i)&&Number.isFinite(l)&&l>0?{top:i,bottom:i+l,left:0,right:a}:{top:0,bottom:s,left:0,right:a}}function Qv(e){let t=null;const n=()=>{try{return window.parent!==window?window.parent:null}catch{return null}},a=()=>{const d=n();t={x:window.scrollX,y:window.scrollY,px:d?.scrollX??0,py:d?.scrollY??0}};e.addEventListener("pointerdown",a,!0),e.addEventListener("contextmenu",a,!0);const s=()=>{if(!t)return;(window.scrollX!==t.x||window.scrollY!==t.y)&&window.scrollTo(t.x,t.y);const d=n();try{d&&(d.scrollX!==t.px||d.scrollY!==t.py)&&d.scrollTo(t.px,t.py)}catch{}t=null},o=d=>{const u=d.parentElement;if(!u)return;const h=u.getBoundingClientRect(),p=[...u.querySelectorAll(".nc-padgrid-pad")],f=Number.parseFloat(d.style.left),g=Number.parseFloat(d.style.top),w=p.find(v=>{const y=v.getBoundingClientRect();return Math.abs(y.left-h.left-f)<1&&Math.abs(y.bottom-h.top-g)<1})??p.find(v=>v.contains(document.activeElement));if(!w)return;d.style.maxHeight="";const m=w.getBoundingClientRect(),b=Gv(m,{w:d.offsetWidth,h:d.offsetHeight},Vv());d.style.left=`${b.left-h.left}px`,d.style.top=`${b.top-h.top}px`,b.maxHeight!==null&&(d.style.maxHeight=`${b.maxHeight}px`),d.dataset.nyxUp=String(b.up),s(),d.querySelector("button")?.focus({preventScroll:!0})},i=new WeakSet,l=()=>{for(const d of e.querySelectorAll(".nc-padgrid-pad-menu"))i.has(d)||(i.add(d),o(d))},c=new MutationObserver(l);return c.observe(e,{childList:!0,subtree:!0}),()=>{c.disconnect(),e.removeEventListener("pointerdown",a,!0),e.removeEventListener("contextmenu",a,!0)}}function Jv(e,t){const n=new Map,a={sent:0,duplicates:0,notPads:0,empty:0};return{notes(s,o){const i=[];for(const l of o){if(n.has(l.id)){a.duplicates++;continue}const c=O0(l.note);if(c===null){a.notPads++;continue}const d=t(c-1,l.slice??null,l.velocity);if(!d){a.empty++;continue}n.set(l.id,{beat:l.startBeat,source:s}),i.push({pad:c-1,hit:d,beat:l.startBeat,source:s,id:l.id})}i.length&&(a.sent+=i.length,e({type:"hits",hits:i}))},off(s,o){for(const[i,l]of n)l.source===s&&(o===void 0||l.beat>=o-1e-9)&&n.delete(i);e(o===void 0?{type:"unhits",source:s}:{type:"unhits",source:s,atBeat:o})},release(s,o){const i=o.filter(l=>l.startsWith(`${s}|`));i.length&&e({type:"unring",ids:i})},prune(s){for(const[o,i]of n)i.beat<s-16&&n.delete(o)},stats:a}}const Zv=1,ew=3.99,tw=.25*Math.log(1e3);function nw(e,t){if(e.mode==="loop")return Number.POSITIVE_INFINITY;if(e.mode==="gate")return 0;const n=Math.abs(e.rate)*Math.max(1,t),a=e.dir==="pingpong"?2:1,s=Math.max(0,e.to-e.from)*a/Math.max(1e-6,n);return e.decay>=ew?s:Math.min(s,Math.max(.01,e.decay)*tw)}function aw(e,t){return nw(e,t)>=Zv}const sw=1;class zr{reported=new Set;pending=new Map;static SEEN_MS=40;report(t,n){const a=new Set;for(const s of t)(Number(s[4])||0)&sw&&a.add(Number(s[0]));this.reported=a;for(const[s,o]of this.pending)n-o>=zr.SEEN_MS&&this.pending.delete(s)}posted(t,n,a){n?this.pending.set(t,a):(this.pending.delete(t),this.reported.delete(t))}stopped(t){this.pending.delete(t),this.reported.delete(t)}has(t){return this.reported.has(t)||this.pending.has(t)}pads(){return[...new Set([...this.reported,...this.pending.keys()])].sort((t,n)=>t-n)}}const ow="nyx-presets";function iw(e,t,n){const a=e.filter(Boolean).length,s=[a?`${a} of ${e.length} saved`:"none saved"];return t!=null&&e[t]&&s.push(`slot ${n[t]??t+1}`),s.join(" · ")}function T(e,t={},...n){const a=document.createElement(e);for(const[s,o]of Object.entries(t))a.setAttribute(s,o);return a.append(...n),a}const $e=(e,t)=>U(e,q(t),e),ze=(e,t,n)=>e<t?t:e>n?n:e,Ha=e=>`${e.toFixed(3)} s`,Bc=e=>`${e>=0?"+":"−"}${Math.abs(e).toFixed(2)} s`,Ee=[1,2,4,8,16,32,64,128],rw=e=>`${e%1?e.toFixed(1):e}×`,ja=9,lw=8,Rc=e=>e===1?"next":e===2?"2nd":e===3?"3rd":`${e}th`;class cw{constructor(t){this.host=t,this.wave=T("canvas",{class:"nyx-rgn-wave","aria-hidden":"true"}),this.live=T("canvas",{class:"nyx-rgn-live","aria-hidden":"true"}),this.labels=T("div",{class:"nyx-rgn-labels","aria-hidden":"true"}),this.startTag=T("button",{type:"button",class:"nyx-rgn-tag","data-nyx-rgn":"start","aria-label":"Start"},"Start"),this.endTag=T("button",{type:"button",class:"nyx-rgn-tag","data-nyx-rgn":"end","aria-label":"End"},"End"),$e(this.startTag,"region:start"),$e(this.endTag,"region:end");const n=T("span",{class:"nyx-rgn-hint","data-nyx-rgn":"hint"},"");this.hint=n,this.stage=T("div",{class:"nyx-rgn-stage","data-nyx-rgn":"stage",role:"group","aria-label":"Waveform"},this.wave,this.live,this.labels,this.startTag,this.endTag,n),this.over=T("canvas",{class:"nyx-rgn-over","aria-hidden":"true"}),this.frame=T("div",{class:"nyx-rgn-frame","data-nyx-rgn":"frame"});const a=T("div",{class:"nyx-rgn-strip","data-nyx-rgn":"strip"},this.over,this.frame);$e(a,"region:overview"),this.zoomBtns=T("span",{class:"nyx-rgn-zbtns",role:"group","aria-label":"Zoom"}),this.hitsRange=T("input",{type:"range",class:"nyx-rgn-hair nyx-rgn-hair-gold",min:"0",max:"1",step:"0.01","aria-label":"Hits: how many the hit finder finds","data-nyx-rgn":"hit-sense"}),this.hitsRange.addEventListener("input",()=>{const o=Number(this.hitsRange.value);this.hitsRange.style.setProperty("--fill",`${(o*100).toFixed(1)}%`),this.host.edit(i=>{i.hitSense=o})}),this.hitsCount=T("span",{class:"nyx-rgn-zlevel","data-nyx-rgn":"hit-count"},"");const s=T("span",{class:"nyx-rgn-hitsk"},"Hits");$e(s,"region:hits"),this.hitsCtl=T("span",{class:"nyx-rgn-hits","data-nyx-rgn":"hits"},T("i",{class:"nyx-rgn-sep"}),s,this.hitsRange,this.hitsCount),this.zoomRow=T("div",{class:"nyx-rgn-zoom"},this.zoomBtns,this.hitsCtl),this.head=T("div",{class:"nyx-rgn-head"}),this.controls=T("div",{class:"nyx-rgn-ctl"}),this.foot=T("div",{class:"nyx-rgn-foot"}),this.dialog=T("div",{class:"nyx-rgn",role:"dialog","aria-modal":"true","aria-label":"Region","data-nyx-rgn":"dialog",tabindex:"-1"},this.head,this.stage,T("div",{class:"nyx-rgn-ov"},a,this.zoomRow),this.controls,this.foot),this.el=T("div",{class:"nyx-rgn-scrim","data-nyx-rgn":"scrim",hidden:""},this.dialog),this.el.addEventListener("pointerdown",o=>{o.target===this.el&&this.host.close()}),this.el.addEventListener("wheel",o=>{if(o.defaultPrevented)return;const i=this.dialog,l=i.contains(o.target),c=o.deltaY<0?i.scrollTop>0:i.scrollTop+i.clientHeight<i.scrollHeight-1;(!l||!c)&&o.preventDefault()},{passive:!1}),this.dialog.addEventListener("keydown",o=>this.key(o)),document.addEventListener("keydown",o=>{!this.isOpen||o.key!=="Escape"||this.dialog.contains(o.target)||(o.preventDefault(),o.stopPropagation(),this.host.close())},!0),this.wireStage(),this.wireStrip(a),this.wireTag(this.startTag,"start"),this.wireTag(this.endTag,"end"),typeof ResizeObserver<"u"&&new ResizeObserver(()=>{this.waveKey="",this.paint()}).observe(this.stage)}el;isOpen=!1;dialog;stage;wave;live;over;frame;startTag;endTag;labels;head;zoomRow;zoomBtns;hitsCtl;hitsRange;hitsCount;hint;controls;foot;zoom=1;view=0;drag=null;touches=new Map;raf=0;waveKey="";colours=null;lastFocus=null;controlsKey="";auditioned="one";open(){if(!this.host.sample())return!1;this.lastFocus=document.activeElement,this.isOpen=!0,this.el.hidden=!1,this.zoom=1,this.view=0,this.waveKey="",this.controlsKey="",this.colours=null,this.refresh(),document.documentElement.dataset.nyxRgnOpen="",this.dialog.focus({preventScroll:!0}),this.intoView();const n=()=>{this.isOpen&&(this.paintLive(),this.raf=requestAnimationFrame(n))};return this.raf=requestAnimationFrame(n),!0}close(){this.isOpen&&(this.isOpen=!1,this.el.hidden=!0,delete document.documentElement.dataset.nyxRgnOpen,cancelAnimationFrame(this.raf),this.lastFocus instanceof HTMLElement&&this.lastFocus.focus())}intoView(){const t=document.documentElement;if(!t.hasAttribute("data-nc-hosted"))return;const n=Number.parseFloat(getComputedStyle(t).getPropertyValue("--nc-host-height"));if(!Number.isFinite(n))return;let a=0;try{a=window.parent?.innerHeight??0}catch{a=0}const s=Number.parseFloat(getComputedStyle(this.el).paddingTop)*2||0,o=Math.min(this.dialog.scrollHeight+s,a||Number.POSITIVE_INFINITY);n+1>=o||t.scrollIntoView({block:"start",behavior:"instant"})}refresh(){if(!this.isOpen)return;const t=this.host.sample();if(!t){this.host.close();return}this.renderHead(t),this.renderZoom(),this.renderHits(t);const n=JSON.stringify([t.index,t.pad.length,t.pad.retrigger,t.pad.slices,t.pad.fit,t.pad.mod.startSource,t.pad.mod.lengthSource,t.pad.mod.lengthSteps,t.pad.mod.lfoBars,t.pad.mod.lfoShape,t.pad.landOnHits,this.hitState(),this.host.aria()]);n!==this.controlsKey?(this.controlsKey=n,this.renderControls(t),this.renderFoot()):this.updateReadouts(t),this.paint()}rateOf(t,n){const a={sampleRate:n.sampleRate,frames:n.frames};return t.fit&&t.keepPitch?Ys(t,a,this.host.bpm()):Mr(t,a,this.host.bpm())}base(t){const n=this.rateOf(t.pad,t),a=t.pad.start*t.frames;if(t.pad.length==="free"||!ct(t.pad))return{start:a,end:t.pad.end*t.frames,rate:n,clamped:!1};if(t.pad.length==="hit"){const o=this.host.hits();if(!o?.length)return{start:a,end:t.pad.end*t.frames,rate:n,clamped:!1};const i=xr(o,a,1,yr*t.sampleRate)??t.frames;return{start:a,end:i,rate:n,clamped:!1}}const s=a+bs(t.pad.length,this.host.bpm(),t.sampleRate,n);return{start:a,end:Math.min(t.frames,s),rate:n,clamped:s>t.frames}}x(t,n){return(t-this.view)*this.zoom*n}f(t,n){return this.view+t/n/this.zoom}setView(t,n=this.zoom){this.zoom=ze(n,1,Ee[Ee.length-1]),this.view=ze(t,0,1-1/this.zoom),this.waveKey="";const a=this.zoomRow.contains(document.activeElement);this.renderZoom(),(a||document.activeElement===document.body)&&this.dialog.focus(),this.paint()}zoomAt(t,n){const a=this.stage.clientWidth||1,s=this.f(n,a),o=ze(this.zoom*t,1,Ee[Ee.length-1]);this.setView(s-n/a/o,o)}zoomStep(t){const n=Ee.findIndex(o=>o>=this.zoom-1e-6),a=t>0?Ee[Math.min(Ee.length-1,n+(Ee[n]>this.zoom+1e-6?0:1))]:Ee[Math.max(0,n-1)],s=this.stage.clientWidth||1;this.zoomAt((a??this.zoom)/this.zoom,s/2)}zoomToRegion(){const t=this.host.sample();if(!t)return;const n=this.base(t),a=n.start/t.frames,s=n.end/t.frames,o=Math.max(.002,s-a)*1.25,i=ze(1/o,1,Ee[Ee.length-1]);this.setView((a+s)/2-.5/i,i)}wireStage(){const t=this.stage;t.addEventListener("pointerdown",a=>{if(a.target.closest(".nyx-rgn-tag"))return;const s=this.host.sample();if(!s)return;t.setPointerCapture(a.pointerId),this.touches.set(a.pointerId,a.clientX);const o=t.getBoundingClientRect(),i=o.width||1,l=a.clientX-o.left;if(this.touches.size===2){const[p,f]=[...this.touches.values()];this.drag={kind:"pinch",x0:((p??0)+(f??0))/2-o.left,start0:0,end0:0,view0:this.view,zoom0:this.zoom,dist0:Math.max(10,Math.abs((p??0)-(f??0)))};return}const c=this.base(s),d=this.x(c.start/s.frames,i),u=this.x(c.end/s.frames,i),h={x0:a.clientX,start0:s.pad.start,end0:c.end/s.frames,view0:this.view};a.altKey&&l>d&&l<u?this.drag={kind:"move",...h}:Math.abs(l-d)<=ja?this.drag={kind:"start",...h}:Math.abs(l-u)<=ja?this.drag={kind:"end",...h}:this.drag={kind:"pan",...h},t.dataset.dragging=this.drag.kind}),t.addEventListener("pointermove",a=>{this.touches.has(a.pointerId)&&this.touches.set(a.pointerId,a.clientX);const s=this.drag,o=this.host.sample();if(!s||!o){this.hover(a);return}const i=t.clientWidth||1;if(s.kind==="pinch"){const[c,d]=[...this.touches.values()],u=Math.max(10,Math.abs((c??0)-(d??0))),h=ze((s.zoom0??1)*(u/(s.dist0??u)),1,Ee[Ee.length-1]),p=s.view0+s.x0/i/(s.zoom0??1);this.setView(p-s.x0/i/h,h);return}const l=(a.clientX-s.x0)/i/this.zoom;s.kind==="pan"?this.setView(s.view0-l):this.dragRegion(s.kind,s.start0,s.end0,l,o,a.metaKey||a.ctrlKey)});const n=a=>{this.touches.delete(a.pointerId),this.drag&&this.drag.kind!=="pan"&&this.drag.kind!=="pinch"&&this.host.audition(),this.drag=null,delete t.dataset.dragging};t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n),t.addEventListener("wheel",a=>{const s=t.getBoundingClientRect();if(a.ctrlKey||a.metaKey)a.preventDefault(),this.zoomAt(Math.exp(-a.deltaY*.01),a.clientX-s.left);else if(this.zoom>1&&(Math.abs(a.deltaX)>Math.abs(a.deltaY)||a.shiftKey)){a.preventDefault();const o=a.shiftKey&&!a.deltaX?a.deltaY:a.deltaX;this.setView(this.view+o/(s.width||1)/this.zoom)}},{passive:!1})}hover(t){const n=this.host.sample();if(!n)return;const a=this.stage.getBoundingClientRect(),s=a.width||1,o=t.clientX-a.left,i=this.base(n),l=Math.abs(o-this.x(i.start/n.frames,s))<=ja||Math.abs(o-this.x(i.end/n.frames,s))<=ja;this.stage.dataset.near=l?"true":"false"}dragRegion(t,n,a,s,o,i=!1){const l=2/o.frames,c=o.pad.length!=="free"&&ct(o.pad),d=i?null:this.host.hits(),u=lw/Math.max(1,this.stage.clientWidth)/this.zoom*o.frames,h=p=>{const f=Hy(d,p*o.frames,u);return f===null?p:f/o.frames};this.host.edit(p=>{if(t==="start")p.start=ze(h(n+s),0,c?1-l:p.end-l);else if(t==="move"){const f=a-n,g=ze(h(n+s),0,1-f);p.start=g,p.end=g+f}else if(t==="end"){const f=ze(h(a+s),p.start+l,1);if(p.length==="hit")p.length="free",p.end=f;else if(c){const g=ze(a+s,p.start+l,1),w=this.rateOf(p,o),m=(g-p.start)*o.frames;let b=p.length,v=Number.POSITIVE_INFINITY;for(const y of vn){if(y==="free")continue;const x=Math.abs(Math.log(bs(y,this.host.bpm(),o.sampleRate,w)/Math.max(1,m)));x<v&&(v=x,b=y)}p.length=b}else p.end=f}})}wireTag(t,n){t.addEventListener("pointerdown",s=>{const o=this.host.sample();o&&(s.stopPropagation(),t.setPointerCapture(s.pointerId),this.drag={kind:n,x0:s.clientX,start0:o.pad.start,end0:this.base(o).end/o.frames,view0:this.view},s.altKey&&(this.drag.kind="move"),this.stage.dataset.dragging=this.drag.kind)}),t.addEventListener("pointermove",s=>{const o=this.drag,i=this.host.sample();if(!o||!i||o.kind!==n&&o.kind!=="move")return;const l=this.stage.clientWidth||1;this.dragRegion(o.kind,o.start0,o.end0,(s.clientX-o.x0)/l/this.zoom,i,s.metaKey||s.ctrlKey)});const a=()=>{this.drag&&this.host.audition(),this.drag=null,delete this.stage.dataset.dragging};t.addEventListener("pointerup",a),t.addEventListener("pointercancel",a),t.addEventListener("keydown",s=>{const o=this.host.sample();if(!o)return;const i=s.key==="ArrowLeft"?-1:s.key==="ArrowRight"?1:0;if(!i)return;s.preventDefault();const l=s.shiftKey?.1:.01,c=i*l*o.sampleRate/o.frames;this.dragRegion(n,o.pad.start,this.base(o).end/o.frames,c,o,!0)})}wireStrip(t){t.addEventListener("pointerdown",a=>{const s=t.getBoundingClientRect(),o=s.width||1,i=(a.clientX-s.left)/o;t.setPointerCapture(a.pointerId),(i<this.view||i>this.view+1/this.zoom)&&this.setView(i-.5/this.zoom),this.drag={kind:"frame",x0:a.clientX,start0:0,end0:0,view0:this.view}}),t.addEventListener("pointermove",a=>{if(this.drag?.kind!=="frame")return;const s=t.clientWidth||1;this.setView(this.drag.view0+(a.clientX-this.drag.x0)/s)});const n=()=>{this.drag?.kind==="frame"&&(this.drag=null)};t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n)}key(t){t.key==="Escape"?(t.preventDefault(),this.host.close()):(t.key==="="||t.key==="+")&&!t.metaKey&&!t.ctrlKey?(t.preventDefault(),this.zoomStep(1)):t.key==="-"&&!t.metaKey&&!t.ctrlKey&&(t.preventDefault(),this.zoomStep(-1)),t.stopPropagation()}renderHead(t){const n=T("button",{type:"button",class:"nyx-rgn-x","aria-label":"Close"},"×");n.addEventListener("click",()=>this.host.close());const a=t.frames/t.sampleRate;this.head.replaceChildren(T("span",{class:"nyx-rgn-brand"},"NYX"),T("span",{class:"nyx-rgn-pad"},`Pad ${t.index+1}`),T("span",{class:"nyx-rgn-file","data-nyx-rgn":"name"},t.pad.name),T("span",{class:"nyx-rgn-meta"},`${a.toFixed(2)} s · ${Math.round(this.host.bpm())} BPM`),n)}renderZoom(){const t=(a,s,o,i="")=>{const l=T("button",{type:"button",class:`nyx-rgn-zb ${i}`,"aria-label":s},a);return l.addEventListener("click",o),l},n=T("span",{class:"nyx-rgn-zlevel","data-nyx-rgn":"zoom"},rw(this.zoom));this.zoomBtns.replaceChildren(t("−","Zoom out",()=>this.zoomStep(-1),"nyx-rgn-zsign"),n,t("+","Zoom in",()=>this.zoomStep(1),"nyx-rgn-zsign"),T("i",{class:"nyx-rgn-sep"}),t("Fit","Show the whole sample",()=>this.setView(0,1)),t("Region","Zoom to the part that plays",()=>this.zoomToRegion()))}hitState(){const t=this.host.hits();return t===null?"wait":t.length?"some":"none"}renderHits(t){const n=this.host.hits();document.activeElement!==this.hitsRange&&(this.hitsRange.value=String(t.pad.hitSense)),this.hitsRange.style.setProperty("--fill",`${(t.pad.hitSense*100).toFixed(1)}%`),this.hitsRange.setAttribute("aria-valuetext",n===null?"finding hits":`${n.length} hit${n.length===1?"":"s"}`),this.hitsCount.textContent=n===null?"…":String(n.length),this.hitsCtl.hidden=!ct(t.pad),this.hint.textContent=n!==null&&!n.length?"No hits found · drag Start or End anywhere · ⌘-scroll to zoom":"Start and End snap to hits · hold ⌘ to place freely · ⌥-drag moves the region"}renderControls(t){const n=t.pad,a=ct(n),s=[],o=(y,x,S,k,$)=>{const E=T("span",{class:"nyx-rgn-k"},x);$e(E,y),s.push(E,T("div",{class:"nyx-rgn-v","data-nyx-rgn":$},S),T("div",{class:"nyx-rgn-read","data-nyx-rgn":`${$}-read`},k))},i=T("div",{class:"nyx-rgn-ticks",role:"radiogroup","aria-label":"Length from Start"});vn.forEach((y,x)=>{const S=T("button",{type:"button",role:"radio",class:"nyx-rgn-tick","aria-checked":String(n.length===y),"data-grid":y},Bt(y));a||(S.disabled=!0),S.addEventListener("click",()=>this.host.edit(k=>{if(k.length==="free"&&y!=="free")Ic(k),k.length=y;else if(y==="free"&&k.length!=="free"){if(k.fit){const[$,E]=k.fitSpan??[0,1];k.start=$,k.end=E,k.fitSpan=null}else{const $=this.base(t);k.end=ze($.end/t.frames,k.start+2/t.frames,1)}k.length="free"}else k.length=y})),i.append(S),(x===0||x===4)&&i.append(T("i",{class:"nyx-rgn-sep"}))});const l=this.hitState();i.append(T("i",{class:"nyx-rgn-sep"}));const c=T("button",{type:"button",role:"radio",class:"nyx-rgn-tick","aria-checked":String(n.length==="hit"),"data-grid":"hit"},"To a hit");$e(c,l==="none"?"region:no-hits":"region:to-hit"),(!a||l==="none")&&(c.disabled=!0),c.addEventListener("click",()=>this.host.edit(y=>{y.length==="free"&&Ic(y),y.length="hit"})),i.append(c);let d=a?this.fittedRead(t):"Slices are on: the grid needs them off";if(!a&&n.slices){const y=T("button",{type:"button",class:"nyx-rgn-link","data-nyx-rgn":"slices-off"},"Turn slices off");$e(y,"region:slices-off"),y.addEventListener("click",()=>this.host.slicesOff()),d=T("span",{class:"nyx-rgn-slices-note"},`Slices are on: a hit plays one of ${n.slices} · `,y)}o("region:length","Length from Start",i,d,"length");const u=T("div",{class:"nyx-rgn-tog",role:"radiogroup","aria-label":"When it's hit again"});for(const[y,x]of[["cut","Cut"],["finish","Let it finish"]]){const S=T("button",{type:"button",role:"radio",class:"nyx-rgn-tick","aria-checked":String(n.retrigger===y),"data-retrigger":y},x);S.addEventListener("click",()=>this.host.edit(k=>{k.retrigger=y})),u.append(S)}o("region:retrigger","When it's hit again",u,n.retrigger==="finish"?"grid hits wait for the end":"each hit starts it again","retrigger");const h=n.mod,p=this.host.aria(),f=this.host.signals(),g=this.host.beat(),w=T("div",{class:"nyx-rgn-sentence"});if(w.append(this.sourcePill("start",h.startSource,a)),h.startSource){const y=T("input",{type:"range",class:"nyx-rgn-hair",min:"0",max:String(Qa),step:"0.01",value:String(h.startAmount),"aria-label":"How far Start moves","data-nyx-rgn":"start-amount"});y.style.setProperty("--fill",`${(h.startAmount/Qa*100).toFixed(1)}%`),y.addEventListener("input",()=>this.host.edit(S=>{S.mod.startAmount=Number(y.value)})),w.append(y,T("span",{class:"nyx-rgn-say"},`up to ${h.startAmount.toFixed(2)} s either way`));const x=T("div",{class:"nyx-rgn-tog nyx-rgn-land",role:"radiogroup","aria-label":"Where Start lands","data-nyx-rgn":"land"});$e(x,"region:land");for(const[S,k]of[[!1,"Anywhere"],[!0,"Land on hits"]]){const $=T("button",{type:"button",role:"radio",class:"nyx-rgn-tick","aria-checked":String(n.landOnHits===S),"data-land":String(S)},k);S&&l==="none"&&($.disabled=!0,$e($,"region:no-hits")),$.addEventListener("click",()=>this.host.edit(E=>{E.landOnHits=S})),x.append($)}w.append(x)}const m=h.startSource&&ko(h.startSource)&&!p?"ARIA not in this Studio":h.startSource?T("span",{},"now ",T("b",{},Bc(yi(h,f,g)))):"";o("region:start-mod","Start moves with",w,m,"start-mod");const b=T("div",{class:"nyx-rgn-sentence"});b.append(this.sourcePill("length",h.lengthSource,a));let v="";if(h.lengthSource){const y=T("div",{class:"nyx-rgn-steps",role:"radiogroup","aria-label":"How many steps"});for(let x=1;x<=Qu;x++){const S=T("button",{type:"button",role:"radio",class:"nyx-rgn-tick","aria-checked":String(h.lengthSteps===x)},String(x));S.addEventListener("click",()=>this.host.edit(k=>{k.mod.lengthSteps=x})),y.append(S)}b.append(T("span",{class:"nyx-rgn-say"},this.lengthSentence(n)),y),n.length==="free"?v="pick a length first":n.length==="hit"?v=ko(h.lengthSource)&&!p?"ARIA not in this Studio":T("span",{},"ends before the ",T("b",{},`${Rc(wi(h,f,g))} hit`)):ko(h.lengthSource)&&!p?v="ARIA not in this Studio":v=T("span",{},"next hit ",T("b",{},Bt(Qn(n.length,vi(h,f,g)))))}if(o("region:length-mod","Length moves with",b,v,"length-mod"),h.startSource==="lfo"||h.lengthSource==="lfo"){const y=T("div",{class:"nyx-rgn-sentence"}),x=T("select",{class:"nyx-rgn-inline","aria-label":"LFO period","data-nyx-rgn":"lfo-bars"});for(const k of Vu)x.append(T("option",{value:String(k)},k<1?`1/${1/k} bar`:k===1?"1 bar":`${k} bars`));x.value=String(h.lfoBars),x.addEventListener("change",()=>this.host.edit(k=>{k.mod.lfoBars=Number(x.value)}));const S=T("div",{class:"nyx-rgn-steps",role:"radiogroup","aria-label":"LFO shape"});for(const k of Gu){const $=T("button",{type:"button",role:"radio",class:"nyx-rgn-tick","aria-checked":String(h.lfoShape===k)},k==="sine"?"Sine":k==="triangle"?"Triangle":"Steps");$.addEventListener("click",()=>this.host.edit(E=>{E.mod.lfoShape=k})),S.append($)}y.append(T("span",{class:"nyx-rgn-say"},"once every"),x,S),o("region:lfo","NYX LFO",y,"on the Studio's beat","lfo")}this.controls.replaceChildren(...s)}fittedRead(t){const n=T("span",{class:"nyx-rgn-len"},this.lengthReadout(t));if(!t.pad.fit)return n;const a=T("button",{type:"button",class:"nyx-rgn-link","data-nyx-rgn":"fit-off"},"Turn Fit off");$e(a,"region:fit-off"),a.addEventListener("click",()=>this.host.fitOff());const s=t.pad.fit,o=T("span",{class:"nyx-rgn-fit-note","data-nyx-rgn":"fit-note"},`Fitted to ${s} bar${s===1?"":"s"} at ${Math.round(this.host.bpm())} BPM · `,a);return $e(o,"region:fitted"),T("span",{class:"nyx-rgn-read-stack"},n,o)}lengthReadout(t){const n=this.base(t),a=t.pad.fit?Math.max(.001,n.rate):1,s=T("b",{},Ha((n.end-n.start)/t.sampleRate/a));if(t.pad.length==="hit"){const o=this.host.hits(),i=o===null?" · finding hits":o.length?n.end>=t.frames?" · no hit after Start: to the end":" · ends before the next hit":" · no hits: End stays put";return T("span",{},s,i)}return T("span",{},s,` from ${Ha(n.start/t.sampleRate)}${n.clamped?" · cut at the end":""}`)}updateReadouts(t){const n=this.controls.querySelector('[data-nyx-rgn="length-read"] .nyx-rgn-len');n&&ct(t.pad)&&n.replaceChildren(this.lengthReadout(t));const a=this.controls.querySelector('[data-nyx-rgn="start-mod"] .nyx-rgn-say');a&&(a.textContent=`up to ${t.pad.mod.startAmount.toFixed(2)} s either way`);const s=this.controls.querySelector('[data-nyx-rgn="start-amount"]');s&&(document.activeElement!==s&&(s.value=String(t.pad.mod.startAmount)),s.style.setProperty("--fill",`${(t.pad.mod.startAmount/Qa*100).toFixed(1)}%`))}lengthSentence(t){const n=t.mod;if(t.length==="free")return"moves the grid length";if(t.length==="hit")return n.lengthSource==="aria:phone-shake"?`each shake reaches a hit further, back to the next after ${da/4} bars`:`ends 1–${1+n.lengthSteps} hits after Start`;const a=Bt(Qn(t.length,-n.lengthSteps)),s=Bt(Qn(t.length,n.lengthSteps));return n.lengthSource==="aria:phone-shake"?`each shake shortens it a step, back to ${Bt(t.length)} after ${da/4} bars`:`steps between ${a} and ${s}`}sourcePill(t,n,a){const s=T("select",{class:"nyx-rgn-pick","aria-label":t==="start"?"Start moves with":"Length moves with","data-nyx-rgn":`${t}-source`});s.append(T("option",{value:""},"Nothing"));const o=T("optgroup",{label:"NYX"}),i=T("optgroup",{label:this.host.aria()??"ARIA"});for(const d of Xu){const u=T("option",{value:d.id},d.group==="aria"?`ARIA · ${d.label}`:d.label);(d.group==="aria"?i:o).append(u)}s.append(o,i),s.value=n??"",s.disabled=!a,s.addEventListener("change",()=>this.host.edit(d=>{const u=s.value||null;t==="start"?d.mod.startSource=u:d.mod.lengthSource=u}));const c=T("span",{class:"nyx-rgn-pill","data-kind":n?n==="lfo"?"lfo":"aria":"none"},s);return $e(c,`region:${t}-source`),c}renderFoot(){const t=T("button",{type:"button",class:"nyx-rgn-quiet","data-nyx-rgn":"reset"},"Reset region");$e(t,"region:reset"),t.addEventListener("click",()=>this.host.edit(l=>{l.start=0,l.end=1,l.length="free",l.fitSpan=null,l.landOnHits=!1,l.mod=vr()}));const n=this.host.playPos()!==null,a=(this.host.sample()?.pad.slices??0)>0,s=(l,c)=>{const d=T("button",{type:"button",class:"nyx-rgn-play","data-nyx-rgn":l==="region"?"audition-region":"audition","aria-pressed":String(n&&this.auditioned===l)},n&&this.auditioned===l?"Stop":c);return d.dataset.words=c,d.dataset.kind=l,$e(d,l==="region"?"region:audition-region":l==="slice"?"region:audition-slice":"region:audition"),d.addEventListener("click",()=>{this.auditioned=l,this.host.audition(l==="region")}),d},o=a?[s("slice","Audition slice"),s("region","Audition region")]:[s("one","Audition")],i=T("button",{type:"button",class:"nyx-rgn-done","data-nyx-rgn":"done"},"Done");i.addEventListener("click",()=>this.host.close()),this.foot.replaceChildren(t,T("span",{class:"nyx-rgn-sp"}),...o,i)}readColours(){if(this.colours)return this.colours;const t=getComputedStyle(this.dialog),n=a=>t.getPropertyValue(a).trim();return this.colours={top:n("--nyx-rgn-stage-top"),mid:n("--nyx-rgn-stage-mid"),bottom:n("--nyx-rgn-stage-bottom"),slate:n("--nyx-rgn-slate"),grid:n("--nyx-rgn-grid"),bar:n("--nyx-rgn-bar"),goldHi:n("--nyx-rgn-gold-hi"),gold:n("--nyx-rgn-gold"),goldLo:n("--nyx-rgn-gold-lo"),marker:n("--nyx-rgn-marker"),magma:n("--nyx-rgn-magma"),play:n("--nyx-rgn-play"),wash:n("--nyx-rgn-wash"),tick:n("--nyx-rgn-tick")},this.colours}fit(t){const n=t.clientWidth,a=t.clientHeight;if(!n||!a)return null;const s=Math.min(3,globalThis.devicePixelRatio||1);(t.width!==Math.round(n*s)||t.height!==Math.round(a*s))&&(t.width=Math.round(n*s),t.height=Math.round(a*s));const o=t.getContext("2d");return o?(o.setTransform(s,0,0,s,0,0),{ctx:o,w:n,h:a}):null}envelope(t,n,a,s){const o=new Float32Array(s),i=t.data,l=t.frames;for(let c=0;c<s;c++){const d=Math.floor((n+(a-n)*c/s)*l),u=Math.max(d+1,Math.floor((n+(a-n)*(c+1)/s)*l)),h=Math.max(1,Math.floor((u-d)/48));let p=0;for(let f=Math.max(0,d);f<Math.min(l,u);f+=h)for(const g of i){const w=Math.abs(g[f]??0);w>p&&(p=w)}o[c]=p}return o}paint(){if(!this.isOpen)return;const t=this.host.sample();if(!t)return;const n=this.base(t),a=JSON.stringify([t.pad.sample,n.start,n.end,this.zoom,this.view,this.host.bpm(),this.stage.clientWidth,this.stage.clientHeight,t.pad.mod.startSource?t.pad.mod.startAmount:-1,document.documentElement.dataset.theme??"",this.hitsKey(),t.pad.slices,t.pad.cuts]);a!==this.waveKey&&(this.waveKey=a,this.colours=null,this.paintWave(t,n),this.paintStrip(t,n)),this.paintLive()}hitsKey(){const t=this.host.hits();return t===null?"wait":`${t.length}:${t[0]??0}:${t[t.length-1]??0}`}paintWave(t,n){const a=this.fit(this.wave);if(!a)return;const{ctx:s,w:o,h:i}=a,l=this.readColours();s.clearRect(0,0,o,i);const c=s.createRadialGradient(o/2,0,0,o/2,0,Math.max(o,i)*1.1);c.addColorStop(0,l.top),c.addColorStop(.55,l.mid),c.addColorStop(1,l.bottom),s.fillStyle=c,s.fillRect(0,0,o,i);const d=Math.round(i*.14),u=d+(i-d)/2,h=(i-d)/2-6,p=this.view,f=this.zoom,g=1/f,w=60/Math.max(1,this.host.bpm())*t.sampleRate*n.rate/t.frames,m=n.start/t.frames,b=[];if(w*f*o>6){const R=Math.ceil((p-m)/w),G=Math.floor((p+g-m)/w);let Z=Number.NEGATIVE_INFINITY;for(let Y=R;Y<=G&&Y-R<4e3;Y++){const Q=this.x(m+Y*w,o),Se=Y%4===0;s.strokeStyle=Se?l.bar:l.grid,s.lineWidth=1,s.beginPath(),s.moveTo(Math.round(Q)+.5,Se?d:d+(i-d)*.08),s.lineTo(Math.round(Q)+.5,i),s.stroke(),Se&&Y>=0&&Q-Z>64&&(Z=Q,b.push(T("span",{class:"nyx-rgn-bar",style:`left:${(Q/o*100).toFixed(3)}%`},`bar ${Y/4+1}`)))}}const v=Math.max(2,Math.round(o/2)),y=this.envelope(t,p,p+g,v);let x=0;for(const R of y)R>x&&(x=R);const S=x>0?.92/Math.max(x,.05):1,k=(R,G)=>{const Z=new Path2D,Y=Q=>Q/v*o;Z.moveTo(Y(R),u);for(let Q=R;Q<=G;Q++)Z.lineTo(Y(Q),u-Math.min(1,(y[Math.min(v-1,Q)]??0)*S)*h);for(let Q=G;Q>=R;Q--)Z.lineTo(Y(Q),u+Math.min(1,(y[Math.min(v-1,Q)]??0)*S)*h);return Z.closePath(),Z};s.fillStyle=l.slate,s.fill(k(0,v-1));const $=this.x(m,o),E=this.x(n.end/t.frames,o),M=ze(Math.floor($/o*v),0,v-1),B=ze(Math.ceil(E/o*v),0,v-1);if(E>0&&$<o&&B>M){const R=s.createLinearGradient(0,d,0,i);R.addColorStop(0,l.wash),R.addColorStop(1,"transparent"),s.fillStyle=R,s.fillRect(Math.max(0,$),d,Math.min(o,E)-Math.max(0,$),i-d);const G=s.createLinearGradient(0,u-h,0,u+h);G.addColorStop(0,l.goldHi),G.addColorStop(.5,l.gold),G.addColorStop(1,l.goldLo);const Z=k(M,B);s.save(),s.beginPath(),s.rect(Math.max(0,$),0,Math.min(o,E)-Math.max(0,$),i),s.clip(),s.shadowColor=l.gold,s.shadowBlur=14,s.globalAlpha=.55,s.fillStyle=G,s.fill(Z),s.shadowBlur=0,s.globalAlpha=1,s.fill(Z),s.restore()}if(t.pad.slices>0&&E>$){const R=js(t.pad),G=Q=>$+Q*(E-$);s.save(),s.globalAlpha=.16,s.fillStyle=l.goldHi;const Z=G(R[0]??0),Y=G(R[1]??1);s.fillRect(Math.max(0,Z),d,Math.min(o,Y)-Math.max(0,Z),i-d),s.restore(),s.save(),s.strokeStyle=l.marker,s.globalAlpha=.8,s.lineWidth=1,s.setLineDash([4,4]);for(const Q of R.slice(1,-1)){const Se=Math.round(G(Q))+.5;Se<0||Se>o||(s.beginPath(),s.moveTo(Se,d),s.lineTo(Se,i),s.stroke())}s.restore(),Y>0&&Z<o&&b.push(T("span",{class:"nyx-rgn-bar nyx-rgn-slice","data-nyx-rgn":"slice-label",style:`left:${(Math.max(0,Z)/o*100).toFixed(3)}%`},`slice 1 of ${t.pad.slices} · a hit plays this`))}const I=this.host.hits();let ie=!1,j=!1;if(I?.length&&ct(t.pad)){s.lineWidth=2,s.lineCap="round";for(const R of I){const G=this.x(R/t.frames,o);Math.abs(R-n.start)<=1&&(ie=!0),Math.abs(R-n.end)<=1&&(j=!0),!(G<-2||G>o+2)&&(s.strokeStyle=R>=n.start-1&&R<=n.end+1?l.goldHi:l.tick,s.beginPath(),s.moveTo(Math.round(G)+.5,i-16),s.lineTo(Math.round(G)+.5,i-5),s.stroke())}s.lineCap="butt"}s.strokeStyle=l.marker,s.lineWidth=1.5;for(const R of[$,E])R>=-2&&R<=o+2&&(s.beginPath(),s.moveTo(R,d-4),s.lineTo(R,i),s.stroke());s.lineWidth=1.5;for(const[R,G]of[[$,ie],[E,j]])G&&R>=-10&&R<=o+10&&(s.beginPath(),s.arc(R,i-10,8,0,Math.PI*2),s.stroke());this.stage.dataset.snapStart=String(ie),this.stage.dataset.snapEnd=String(j),this.labels.replaceChildren(...b);const _e=(R,G,Z)=>{const Y=G>=-1&&G<=o+1;R.hidden=!Y,R.style.left=`${(G/o*100).toFixed(3)}%`,R.dataset.side=Z};_e(this.startTag,$,"l"),_e(this.endTag,E,"r"),this.endTag.textContent=n.clamped?"End · cut":"End",this.startTag.setAttribute("aria-valuetext",Ha(n.start/t.sampleRate)),this.endTag.setAttribute("aria-valuetext",Ha(n.end/t.sampleRate))}paintStrip(t,n){const a=this.fit(this.over);if(!a)return;const{ctx:s,w:o,h:i}=a,l=this.readColours();s.clearRect(0,0,o,i),s.fillStyle=l.bottom,s.fillRect(0,0,o,i);const c=Math.max(2,Math.round(o/3)),d=this.envelope(t,0,1,c);let u=0;for(const g of d)g>u&&(u=g);const h=u>0?1/u:1,p=n.start/t.frames,f=n.end/t.frames;for(let g=0;g<c;g++){const w=(g+.5)/c,m=Math.max(.08,(d[g]??0)*h)*(i/2-2);s.fillStyle=w>=p&&w<=f?l.gold:l.slate,s.fillRect(g/c*o,i/2-m,Math.max(1,o/c-1),m*2)}this.frame.style.left=`${(this.view*100).toFixed(3)}%`,this.frame.style.width=`${(100/this.zoom).toFixed(3)}%`}paintLive(){const t=this.host.sample(),n=this.fit(this.live);if(!t||!n)return;const{ctx:a,w:s,h:o}=n;a.clearRect(0,0,s,o);const i=this.readColours(),l=Math.round(o*.14),c=t.pad.mod,d=this.base(t);if(c.startSource&&ct(t.pad)&&!ua(c)){const f=c.startAmount*t.sampleRate/t.frames,g=d.start/t.frames,w=this.x(Math.max(0,g-f),s),m=this.x(Math.min(1,g+f),s),b=a.createLinearGradient(w,0,m,0);b.addColorStop(0,"transparent"),b.addColorStop(.5,i.magma),b.addColorStop(1,"transparent"),a.globalAlpha=.22,a.fillStyle=b,a.fillRect(w,l,m-w,o-l),a.globalAlpha=1;const v=jy({start:d.start,end:d.end,frames:t.frames,sampleRate:t.sampleRate,rate:d.rate,grid:t.pad.length,mod:c,hits:this.host.hits(),land:t.pad.landOnHits},this.host.signals(),this.host.beat(),this.host.bpm()),y=this.x(v.from/t.frames,s);a.strokeStyle=i.magma,a.lineWidth=1.2,a.setLineDash([3,4]),a.beginPath(),a.moveTo(y,l),a.lineTo(y,o),a.stroke(),a.setLineDash([]),a.fillStyle=i.magma,a.beginPath(),a.arc(y,o-8,3.5,0,Math.PI*2),a.fill()}const u=this.host.playPos();if(u!==null){const f=this.x(u,s);a.strokeStyle=i.play,a.globalAlpha=.85,a.lineWidth=1,a.beginPath(),a.moveTo(f,l),a.lineTo(f,o),a.stroke(),a.globalAlpha=1}for(const f of this.foot.querySelectorAll(".nyx-rgn-play")){const g=u!==null&&f.dataset.kind===this.auditioned;f.getAttribute("aria-pressed")!==String(g)&&(f.setAttribute("aria-pressed",String(g)),f.textContent=g?"Stop":f.dataset.words??"Audition")}const h=this.controls.querySelector('[data-nyx-rgn="start-mod-read"] b');h&&c.startSource&&(h.textContent=Bc(yi(c,this.host.signals(),this.host.beat())));const p=this.controls.querySelector('[data-nyx-rgn="length-mod-read"] b');p&&c.lengthSource&&t.pad.length==="hit"?p.textContent=`${Rc(wi(c,this.host.signals(),this.host.beat()))} hit`:p&&c.lengthSource&&t.pad.length!=="free"&&(p.textContent=Bt(Qn(t.pad.length,vi(c,this.host.signals(),this.host.beat()))))}}function Ic(e){e.fit&&!e.slices&&(e.fitSpan=[e.start,e.end])}const dw="/nyx/assets/sampler-processor-C5bMK5TY.js",$t=16,uw=.03,pw=.002,hw=.02,fw=.7;function Cp(e,t){const{from:n,to:a,sampleRate:s}=e,o=Math.round(uw*s),i=Math.max(2,Math.min($t,Math.round(t.count??$t)));if(a-n<o*2)return{cuts:[n,a],hits:[n]};if(t.mode==="transients"){const p=Ai(e,t.sensitivity??.5),f=p.find(w=>w.cut-n<o),g=[];for(const w of p){if(g.length>=i-1)break;w.cut-n<o||a-w.cut<o||g.every(m=>Math.abs(m.cut-w.cut)>=o)&&g.push(w)}return g.sort((w,m)=>w.cut-m.cut),{cuts:[n,...g.map(w=>w.cut),a],hits:[f?f.hit:n,...g.map(w=>w.hit)]}}let l,c=a;if(t.mode==="even")l=Array.from({length:i},(p,f)=>n+Math.round((a-n)*f/i));else{const p=60/(t.bpm&&t.bpm>0?t.bpm:120)/(t.perBeat??1)*s;l=[];for(let f=0;f<$t&&n+f*p<a-o;f++)l.push(n+Math.round(f*p));l.length>=$t&&(c=Math.min(a,n+Math.round($t*p)))}const d=t.snap===!1?0:Math.round(hw*s),u=d?Ai(e,fw):[];return{cuts:[...l.map((p,f)=>{if(f===0||!d)return p;let g=p,w=d+1;for(const m of u){const b=Math.abs(m.hit-p);b<=d&&b<w&&(w=b,g=m.cut)}return g}),c],hits:l}}function mw(e,t){const n=e.to-e.from;if(t<2||n<64)return[];const s=Cp(e,{mode:"transients",sensitivity:.5,count:t}).cuts.slice(1,-1).map(o=>(o-e.from)/n).filter(o=>o>.001&&o<.999);for(let o=1;s.length<t-1&&o<t;o++){const i=o/t;s.every(l=>Math.abs(l-i)>.5/t)&&s.push(i)}for(let o=1;s.length<t-1;o++)s.push(o/(t+1));return s.sort((o,i)=>o-i).slice(0,t-1)}function gw(e){const t=o=>Math.round(o*10)/10;if(e.fit>0&&e.seconds>0)return{bpm:t(e.fit*240/e.seconds),known:!0,from:"from its Fit"};if(e.given>0)return{bpm:e.given,known:!0,from:e.givenFrom??"from the take"};const n=vp(e.name);if(n)return{bpm:n,known:!0,from:"from its name"};const a=wp(e.seconds,e.studioBpm);if(a)return{bpm:t(a*240/e.seconds),known:!0,from:"the Studio's"};const s=bw(e.seconds);return s?{bpm:s.bpm,known:!1,from:"guessed from its length"}:{bpm:e.studioBpm,known:!1,from:"the Studio's"}}function bw(e,t=[]){let n=null;for(const a of[1,2,4,8]){const s=a*4*60/e;if(s<70||s>180)continue;const o=60/s/4,l=(t.length?t.reduce((c,d)=>c+Math.abs(d/o-Math.round(d/o)),0)/t.length:0)+Math.abs(s-110)/2e3;(!n||l<n.score)&&(n={bpm:s,bars:a,score:l})}return n?{bpm:Math.round(n.bpm*10)/10,bars:n.bars}:null}function Or(e,t,n){const a=60/n/4*t,s=e.cuts[0],o=(e.cuts[e.cuts.length-1]-s)/a,i=Math.max(1,Math.ceil(o/he-.06)),l=new Set;return{positions:e.hits.map(d=>{const u=Math.max(0,Math.round((d-s)/a));return l.has(u)?-1:(l.add(u),u)}),bars:i>8?0:i}}function Np(e,t,n){const{positions:a}=Or(e,t,n),s=a.map(o=>o>=0);return{cuts:e.cuts.filter((o,i)=>i===e.cuts.length-1||s[i]),hits:e.hits.filter((o,i)=>s[i])}}const yw=.006;function vw(e,t,n,a=yw){const s=60/n/4*t,o=e.cuts[0]??0,i=e.cuts[e.cuts.length-1]??0,l=a*t,c=[...e.cuts],d=[...e.hits];for(let u=1;u<d.length;u++){const h=d[u]??0,p=o+Math.round(Math.round((h-o)/s)*s);Math.abs(h-p)<=l&&p>o&&p<i&&(c[u]=p,d[u]=p)}return Np({cuts:c,hits:d},t,n)}function ww(e,t){return e.cuts.length-1<=t?e:{cuts:[...e.cuts.slice(0,t),e.cuts[e.cuts.length-1]],hits:e.hits.slice(0,t)}}function xw(e){return e.replace(/\.[a-z0-9]{2,4}$/i,"").split(/[\s_\-.()[\],+&]+/).filter(Boolean).filter((a,s,o)=>!/^\d{2,3}bpm$/i.test(a)&&!/^bpm\d{2,3}$/i.test(a)&&!/^bpm$/i.test(a)&&!(/^[1-9]\d{1,2}$/.test(a)&&Number(a)>=50&&Number(a)<=200)&&!(/^\d{2,3}$/.test(a)&&/^bpm$/i.test(o[s+1]??""))&&!/^[A-G](?:#|b|s|sharp|flat)?(?:m|min|maj|minor|major)?$/.test(a)).join(" ").trim()||"Loop"}function ts(e,t){const n=String(t+1);return`${e.slice(0,23-n.length).trim()} ${n}`}function kw(e,t,n){const a=new Set(e.filter((s,o)=>(o<t||o>=t+n)&&s.sample&&s.choke).map(s=>s.choke));for(const s of[4,3,2,1])if(!a.has(s))return s;return 0}function $w(e,t,n){const a=Math.min(t.cuts.length-1,ne-n.first),s=n.playBack?Or(t,n.sampleRate,n.playBack.bpm):null,o=Math.round(pw*n.sampleRate),i=[];for(let l=0;l<a;l++){const c=n.first+l,d=e.pads[c];if(!d)continue;const u=l<a-1?Math.min(n.frames,t.cuts[l+1]+o):t.cuts[l+1];if(Object.assign(d,{name:ts(n.stem,l),sample:n.sample,mode:"oneshot",dir:"fwd",start:t.cuts[l]/n.frames,end:u/n.frames,slices:0,cuts:[],tune:0,fine:0,fit:0,attack:0,decay:4,cutoff:0,resonance:0,levelDb:n.source?.levelDb??0,pan:0,choke:n.choke??0,provenance:n.source?.provenance?structuredClone(n.source.provenance):null,rights:n.source?.rights??null,normalize:n.source?.normalize?{...n.source.normalize}:null,offsetDb:n.source?.offsetDb??0,follow:!1,note:n.source?.note??0}),s?.bars){const h=e.lanes[c];h.length=he,h.steps=Array.from({length:he},()=>Ea());const p=s.positions[l];if(p!==void 0&&p>=0){const f=h.steps[p%he];f.on=!0;const g=s.bars>1?`${Math.floor(p/he)+1}:${s.bars}`:"always";f.cond=ys.includes(g)?g:"always"}}i.push(c)}return i}const Fp=827873614,Sw=60;async function Ew(e,t){const n=new Float64Array([t,e.length,e[0]?.length??0]),a=[new Uint8Array(n.buffer),...e.map(c=>new Uint8Array(c.buffer))],s=a.reduce((c,d)=>c+d.byteLength,0),o=new Uint8Array(s);let i=0;for(const c of a)o.set(c,i),i+=c.byteLength;const l=new Uint8Array(await crypto.subtle.digest("SHA-256",o));return Array.from(l.subarray(0,16),c=>c.toString(16).padStart(2,"0")).join("")}function Aw(e){const t=e.data[0]?.length??0,n=new Uint8Array(16+t*4*e.data.length);return new Uint32Array(n.buffer,0,4).set([Fp,e.sampleRate,e.data.length,t]),e.data.forEach((a,s)=>{n.set(new Uint8Array(a.buffer,a.byteOffset,t*4),16+s*t*4)}),n}function Mw(e,t){if(t.byteLength<16)return null;const[n,a,s,o]=new Uint32Array(t,0,4);if(n!==Fp||!s||s>2||t.byteLength!==16+o*4*s)return null;const i=Array.from({length:s},(l,c)=>new Float32Array(t.slice(16+c*o*4,16+(c+1)*o*4)));return{hash:e,data:i,sampleRate:a,channels:s,frames:o}}class Lw{constructor(t="nyx"){this.folderName=t}memory=new Map;dir=null;folder(){return this.dir??=(async()=>{try{const t=await navigator.storage?.getDirectory?.();return t?await t.getDirectoryHandle(this.folderName,{create:!0}):null}catch{return null}})(),this.dir}info(t){return this.memory.get(t)}held(t){return this.memory.get(t)}async put(t,n){const a=await Ew(t,n),s={hash:a,data:t,sampleRate:n,channels:t.length,frames:t[0]?.length??0};this.memory.set(a,s);const o=await this.folder();if(!o)return{sample:s,saved:!1};try{const l=await(await o.getFileHandle(`${a}.f32`,{create:!0})).createWritable?.();return l?(await l.write(Aw(s)),await l.close(),{sample:s,saved:!0}):{sample:s,saved:!1}}catch{return{sample:s,saved:!1}}}async get(t){const n=this.memory.get(t);if(n)return n;const a=await this.folder();if(!a)return null;try{const s=await(await a.getFileHandle(`${t}.f32`)).getFile(),o=Mw(t,await s.arrayBuffer());return o&&this.memory.set(t,o),o}catch{return null}}async prune(t){for(const a of[...this.memory.keys()])t.has(a)||this.memory.delete(a);const n=await this.folder();if(n)try{const a=[];for await(const s of n.keys())a.push(s);for(const s of a){const o=s.replace(/\.f32$/,"");s.endsWith(".f32")&&!t.has(o)&&await n.removeEntry(s)}}catch{}}}function Pp(e){const t=Math.min(e.length,Math.round(Sw*e.sampleRate));return{data:Array.from({length:Math.min(2,e.numberOfChannels)},(a,s)=>{const o=new Float32Array(t);return o.set(e.getChannelData(s).subarray(0,t)),o}),trimmed:t<e.length}}function qc(e,t=200){const n=e[0]?.length??0,a=[];if(!n)return a;const s=n/t;for(let o=0;o<t;o++){const i=Math.floor(o*s),l=Math.max(i+1,Math.floor((o+1)*s));let c=0,d=0;const u=Math.max(1,Math.floor((l-i)/256));for(let h=i;h<l&&h<n;h+=u){let p=0;for(const f of e)p+=f[h]??0;p/=e.length,p<c&&(c=p),p>d&&(d=p)}a.push(Math.max(-1,c),Math.min(1,d))}return a}function zi(e=Cw()){try{const t=JSON.parse(e?.getItem("lucy.state")??"null");return Array.isArray(t?.takes)?t.takes.flatMap(n=>{const a=n&&typeof n=="object"?n:{},s=o=>typeof a[o]=="number"&&Number.isFinite(a[o])?a[o]:0;return a.saved!==!0||!s("id")||!s("frames")||!s("sampleRate")?[]:[{id:s("id"),bars:s("bars"),bpm:s("bpm"),sampleRate:s("sampleRate"),channels:Math.min(2,Math.max(1,s("channels"))),frames:s("frames"),rights:a.source==="computer"?"unknown":null}]}):[]}catch{return[]}}async function Tw(e){try{const t=await navigator.storage?.getDirectory?.();if(!t)return null;const a=await(await(await t.getDirectoryHandle("lucy")).getFileHandle(`lucy-take-${e.id}.f32`)).getFile(),s=new Float32Array(await a.arrayBuffer());return s.length<e.frames*e.channels?null:Array.from({length:e.channels},(o,i)=>s.slice(i*e.frames,(i+1)*e.frames))}catch{return null}}function Cw(){try{return globalThis.localStorage??null}catch{return null}}const Dt=1,To=1024,Nw=[1,10,100],Fw=32,Pw=32,zp=128,zw=400,Ow=["off","blocked","live","paused","none"],ns=e=>typeof e=="object"&&e!==null,ye=e=>typeof e=="number"&&Number.isFinite(e),Dw=(e,t=zp)=>typeof e=="string"&&e.length>0&&e.length<=t,Co=e=>e<0?0:e>1?1:e,Bw=["live","quiet","offline","off"],Rw=["removed","hold"],_c=e=>e<-1?-1:e>1?1:e,Iw=/^[A-Z0-9?*-]{0,8}$/i;function Hc(e){if(!ns(e))return null;const{net:t,sta:n,loc:a,cha:s,name:o,rate:i}=e;return typeof t!="string"||typeof n!="string"||typeof a!="string"||typeof s!="string"||![t,n,a,s].every(l=>Iw.test(l))||!t||!n||typeof o!="string"||o.length>zp||!ye(i)||i<0||i>1e4?null:{net:t,sta:n,loc:a,cha:s,name:o,rate:i}}function qw(e){const t=e?.length;if(!(e instanceof Float32Array)&&!Array.isArray(e)&&!ArrayBuffer.isView(e)||t!==To)return null;const n=new Float32Array(To),a=e;for(let s=0;s<To;s++){const o=Number(a[s]);if(!Number.isFinite(o))return null;n[s]=o<-1?-1:o>1?1:o}return n}function _w(e){if(!ns(e))return null;const t=e.v;if(typeof t!="number"||Math.floor(t)!==Dt||!Dw(e.source))return null;const n=e.source;switch(e.kind){case"energy":{if(!Array.isArray(e.frames))return null;const a=[];for(const s of e.frames.slice(0,Fw)){if(!ns(s)||!ye(s.at)||!ye(s.value))return null;a.push({at:s.at,value:Co(s.value)})}return{v:Dt,kind:"energy",source:n,frames:a}}case"table":{if(!ye(e.seq)||e.seq<0||!ye(e.at)||!ye(e.rms)||e.rms<0||!Nw.includes(e.speed))return null;const a=qw(e.samples);if(!a)return null;const s=e.station===null?null:Hc(e.station);if(e.station!==null&&!s)return null;const o=e.behindSec===null?null:ye(e.behindSec)?e.behindSec:void 0;return o===void 0?null:{v:Dt,kind:"table",source:n,seq:Math.floor(e.seq),at:e.at,speed:e.speed,station:s,behindSec:o,samples:a,rms:Math.min(1,e.rms)}}case"status":{if(!Bw.includes(e.state))return null;const a=e.station===null?null:Hc(e.station);if(e.station!==null&&!a)return null;const s=c=>c===null?null:ye(c)?c:void 0,o=s(e.newestAgeSec),i=s(e.behindSec);if(o===void 0||i===void 0||typeof e.hold!="boolean"||typeof e.credit!="string"||e.credit.length>zw)return null;const l={v:Dt,kind:"status",source:n,state:e.state,station:a,newestAgeSec:o,behindSec:i,hold:e.hold,credit:e.credit};return ye(e.retryAt)&&(l.retryAt=e.retryAt),e.recorded===!0&&(l.recorded=!0),Ow.includes(e.motion)&&(l.motion=e.motion),l}case"motion":{if(!Array.isArray(e.frames))return null;const a=[];for(const s of e.frames.slice(0,Pw)){if(!ns(s)||!ye(s.at)||!ye(s.tiltX)||!ye(s.tiltY)||!ye(s.heading)||!ye(s.shake))return null;const o=s.heading%1;a.push({at:s.at,tiltX:_c(s.tiltX),tiltY:_c(s.tiltY),heading:o<0?o+1:o,shake:Co(s.shake)})}return{v:Dt,kind:"motion",source:n,frames:a}}case"shake":return!ye(e.at)||!ye(e.strength)?null:{v:Dt,kind:"shake",source:n,at:e.at,strength:Co(e.strength)};case"off":return Rw.includes(e.reason)?{v:Dt,kind:"off",source:n,reason:e.reason}:null;default:return null}}const Hw=["aria:phone-tilt-x","aria:phone-tilt-y","aria:phone-heading","aria:phone-shake"];function jw(e){let t=!1,n=!1;for(const a of e)if(a.sample)for(const s of[a.mod.startSource,a.mod.lengthSource])s&&Hw.includes(s)&&(t=!0),s==="aria:energy"&&(n=!0);return!t&&!n?null:{...n?{energy:!0}:{},...t?{motion:!0}:{}}}const jc=e=>e?`${e.energy?"e":""}${e.motion?"m":""}`:"";function Ww(e,t,n){const a=e;if(typeof a?.situationIn!="function")return null;let s=null,o="",i=wn();const l=()=>{try{return a.situationSources?.()??[]}catch{return[]}},c=p=>{i=p,t(i)},d=()=>{const p=l().length>0;p!==i.aria&&c(p?{...i,aria:p}:wn())},u=p=>{const f=_w(p);if(f)if(f.kind==="motion"){const g=f.frames[f.frames.length-1];g&&c({...i,aria:!0,tiltX:g.tiltX,tiltY:g.tiltY,heading:g.heading})}else if(f.kind==="energy"){const g=f.frames[f.frames.length-1];g&&c({...i,aria:!0,energy:g.value})}else f.kind==="shake"?c(qy({...i,aria:!0},n())):f.kind==="off"&&f.reason==="removed"&&c(wn())},h=a.onSituationSources?.(d)??null;return d(),{update(p){const f=jw(p);if(jc(f)!==o&&(o=jc(f),s?.(),s=null,f))try{s=a.situationIn?.(u,f)??null}catch{s=null}},signals:()=>i,source:()=>l()[0]?.name??null,dispose(){s?.(),h?.()}}}function Yw(e){const t=e.setTimer??((i,l)=>setTimeout(i,l)),n=e.clearTimer??(i=>clearTimeout(i)),a=new Map,s=new Set,o={scheduled:0,recalled:0,duplicates:0,late:0,cancelled:0,lastMs:0};return{controls(i,l){for(const c of l){if(c.type!=="slot")continue;const d=`${i}|${c.id}`;if(s.has(d)){o.duplicates++;continue}const u=e.timeAt(c.beat);if(u===null)continue;const h=u-e.now();if(h<-.25){o.late++;continue}s.add(d),s.size>512&&s.delete(s.values().next().value);const p=c.slot-1,f=t(()=>{a.delete(d),o.recalled++,o.lastMs=(e.now()-u)*1e3,e.recall(p)},Math.max(0,h*1e3));a.set(d,{source:i,beat:c.beat,timer:f}),o.scheduled++}},off(i,l){for(const[c,d]of a)d.source===i&&(l===void 0||d.beat>=l-1e-9)&&(n(d.timer),a.delete(c),s.delete(c),o.cancelled++)},stats:o,dispose(){for(const i of a.values())n(i.timer);a.clear()}}}const Uw=150,Op=96*1024*1024,Kw=e=>Math.round(e*10)/10;function Xw(e,t,n){if(!e.sample||!e.fit||!e.keepPitch||!t)return null;const a=Ws(e),[s,o]=a?[0,t.frames]:Ar(e,t,null);if(o-s<2)return null;const i=Kw(n);return{sample:e.sample,from:s,to:o,bars:e.fit,bpm:i,semitones:e.tune+e.fine/100,sampleRate:t.sampleRate,frames:gp(e,t,i),whole:a}}function pn(e){return`${e.sample}:${e.from}-${e.to}:${e.bars}:${e.frames}:${e.bpm.toFixed(1)}:${Math.round(e.semitones*100)}`}const Gw=e=>`stretch:${e}`,Vw=e=>e.startsWith("stretch:");class Qw{constructor(t=Op,n=()=>{}){this.maxBytes=t,this.drop=n}map=new Map;bytes=0;get size(){return this.map.size}has(t){return this.map.has(t)}get(t){const n=this.map.get(t);return n&&(this.map.delete(t),this.map.set(t,n)),n}byId(t){for(const n of this.map.values())if(n.sample===t)return n}put(t,n=new Set){const a=this.map.get(t.key);a&&(this.bytes-=a.bytes),this.map.delete(t.key),this.map.set(t.key,t),this.bytes+=t.bytes;for(const[s,o]of this.map){if(this.bytes<=this.maxBytes)break;s===t.key||n.has(s)||(this.map.delete(s),this.bytes-=o.bytes,this.drop(o))}}}class Jw{constructor(t,n=Op){this.host=t,this.cache=new Qw(n,a=>t.drop(a))}cache;current=new Map;wanted=new Map;inFlight=new Set;timer=null;queue=Promise.resolve();missingSig="";renders=0;lastMs=0;failed=!1;plan(t,n,a){this.wanted.clear();const s=[];t.forEach((c,d)=>{const u=c.sample?n(c.sample):void 0,h=Xw(c,u,a),p=this.current.get(d);if(!h){this.current.delete(d);return}this.wanted.set(d,h);const f=pn(h),g=this.cache.get(f);g?this.current.set(d,g):(p&&!Zw(p.job,h)&&this.current.delete(d),this.inFlight.has(f)||s.push(f))});const o=s.join("|");if(!s.length||this.failed){this.missingSig="";return}if(o===this.missingSig&&this.timer!==null)return;this.missingSig=o;const i=this.host.clearTimeout??(c=>clearTimeout(c)),l=this.host.setTimeout??((c,d)=>setTimeout(c,d));this.timer!==null&&i(this.timer),this.timer=l(()=>{this.timer=null,this.missingSig="",this.renderWanted()},Uw)}stretchedFor(t){const n=this.current.get(t),a=this.wanted.get(t);if(!(n&&a&&!!n.job.whole!=!!a.whole))return n}renderFor(t){return this.current.get(t)}pending(t){const n=this.wanted.get(t);return n?this.current.get(t)?.key!==pn(n):!1}renderWanted(){for(const t of new Map([...this.wanted.values()].map(n=>[pn(n),n])).values()){const n=pn(t);this.cache.has(n)||this.inFlight.has(n)||(this.inFlight.add(n),this.queue=this.queue.then(()=>this.renderOne(n,t)))}}idle(){return this.queue}async renderOne(t,n){if(![...this.wanted.values()].some(i=>pn(i)===t)){this.inFlight.delete(t);return}const a=Date.now();let s=null;try{s=await this.host.run(n)}catch(i){console.error("NYX stretch",i)}if(this.inFlight.delete(t),!s){this.failed=!0,this.host.changed();return}this.lastMs=Date.now()-a,this.renders++;const o={key:t,job:n,sample:Gw(t),frames:n.frames,bytes:s.reduce((i,l)=>i+l.byteLength,0)};this.host.deliver(o,s);for(const[i,l]of this.wanted)pn(l)===t&&this.current.set(i,o);this.cache.put(o,new Set([...this.current.values()].map(i=>i.key))),this.host.changed()}}const Zw=(e,t)=>e.sample===t.sample&&e.from===t.from&&e.to===t.to,ex=48e3;function Dp(e,t){try{const n=e?.latency?.(t);return typeof n=="number"&&Number.isFinite(n)&&n>0&&n<=ex?Math.round(n):0}catch{return 0}}function tx(e,t){return{from:e.from+t,to:e.to+t}}const nx="instance",ax=99;function Ks(e=typeof location>"u"?"":location.search){const t=new URLSearchParams(e).get(nx)?.trim()??"";if(!/^\d+$/.test(t))return 1;const n=Number(t);return n>=2&&n<=ax?n:1}function sx(e,t){return t===1?e:`${e}#${t}`}function ox(e,t){return t===1?e:`${e} ${t}`}let kt;function ix(e,t=Ks()){if(kt!==void 0)return kt;kt=null;try{if(typeof window>"u"||window.parent===window)return kt;const n=window.parent.ncStudio;n&&n.version===1&&(kt=n.attach(e,{instance:t}))}catch{}return kt}function rx(){let e;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(e=a.syncScope)}}catch{}if(!e)return{};const t=`/studio/${e}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${t}`,locks:n?{request:(a,s,o)=>n.request(`${a}${t}`,s,o)}:null}}function lx(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1&&typeof e.fxWorklet=="string"&&e.fxWorklet?e.fxWorklet:null}catch{return null}}function Nt(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.grab?e.grab:null}catch{return null}}function Cn(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.play?e.play:null}catch{return null}}function Xs(e,t=Ks()){return t>1?`${e}#${t}`:e}function cx(e,t=Ks()){const n=Cn()?.owner()??null;return n===null||n==="studio"||n===Xs(e,t)}function dx(e){if(e.code!=="Space"&&e.code!=="Backspace")return!1;try{return kt?.studioKey?.({code:e.code,shiftKey:e.shiftKey===!0,repeat:e.repeat===!0})===!0}catch{return!1}}function Bp(e){try{return kt?.playKeys?.(e)??(()=>{})}catch{return()=>{}}}const Wc=48;function ux(e){const t=[];for(const n of e.points().slice(-64))t.push(n.beat,n.root===null?Number.NaN:n.root);return{type:"follow",points:t,transpose:e.route?.transpose??0}}function px(e){const t=Math.trunc((e.transpose??0)/12);return t?`Root, ${t>0?"+":"−"}${Math.abs(t)} oct`:"Root"}function hx(e,t,n=null,a=null){const s=e;if(typeof s?.notesIn!="function")return null;const o=new H0,i=new Set;let l=-1,c="",d=!1;const u=()=>{d=!1;const p=JSON.stringify(o.route),f=p!==c;if(!f&&o.version===l)return;c=p;const g=o.points();g.length>Wc&&o.prune(g[g.length-Wc].beat),l=o.version,t(ux(o));for(const w of[...i])w(f)};try{let p=new Set;s.notesIn(f=>{const g=mp(f);let w=f;if(g?.kind==="routes")p=new Set(g.routes.filter(m=>m.layer).map(m=>m.source)),w=_0(g.routes.filter(m=>!m.layer));else if(g&&"source"in g&&p.has(g.source)){g.kind==="notes"?n?.notes(g.source,g.events):g.kind==="off"?n?.off(g.source,g.atBeat):g.kind==="controls"?n?.controls?.(g.source,g.events):g.kind==="release"&&n?.release?.(g.source,g.ids);return}if(g&&g.kind!=="routes"&&a)try{a(g)}catch{}o.receive(w),d||(d=!0,queueMicrotask(u))},{takes:"pitch"})}catch{return null}const h=p=>{const f=o.route?.source;if(!f||typeof p!="function")return!1;try{return p.call(s,f),!0}catch{return!1}};return{follower:o,route:()=>o.route,resend(){l=-1,u()},takeBack:()=>h(s.notesTakeBack),open:()=>h(s.showInstance),onChange(p){i.add(p)}}}class fx{constructor(t){this.make=t}worker=null;seq=0;calls=new Map;cache=new Map;times=[];workerNow(){if(this.worker||!this.make)return this.worker;try{const t=this.make();t.onmessage=n=>{const a=n.data;this.calls.get(a.id)?.(a),this.calls.delete(a.id)},t.onerror=n=>{for(const a of this.calls.values())a({error:n.message||"worker failed"});this.calls.clear()},this.worker=t}catch{this.worker=null}return this.worker}analysis(t,n,a,s,o){const i=`${t}:${s}:${o}`;let l=this.cache.get(i);return l||(l=this.run(n,a,s,o),this.cache.set(i,l),l.catch(()=>this.cache.delete(i)),this.cache.size>16&&this.cache.delete(this.cache.keys().next().value),l)}run(t,n,a,s){const o=this.workerNow();if(!o)return Promise.resolve(Sc(t,n,a,s));const i=++this.seq;return new Promise(l=>{this.calls.set(i,c=>{c.analysis?(c.ms!==void 0&&this.times.push(c.ms),l(c.analysis)):l(Sc(t,n,a,s))}),o.postMessage({id:i,channels:t.map(c=>c.slice(a,s)),sampleRate:n,from:a})})}}function X(e,t={},...n){const a=document.createElement(e);for(const[s,o]of Object.entries(t))a.setAttribute(s,o);return a.append(...n),a}const wt=(e,t)=>U(e,q(t),e),mx=[{value:"transients",label:"At hits"},{value:"even",label:"Even"},{value:"beats",label:"Beats"}];class gx{constructor(t){this.host=t,this.canvas=X("canvas",{class:"nyx-chop-wave",role:"img","aria-label":"The slices","data-nyx-chop":"wave"}),wt(this.canvas,"chop:wave"),this.canvas.addEventListener("click",s=>this.clickWave(s)),this.title=X("span",{class:"nc-readout nyx-chop-name","data-nyx-chop":"name"});const n=X("button",{type:"button",class:"nc-btn nyx-chop-close","data-nyx-chop":"close"},"Close");wt(n,"chop:close"),n.addEventListener("click",()=>this.host.close()),this.body=X("div",{class:"nyx-chop-body"});const a=X("span",{class:"nc-label"},"Chop to pads");this.el=X("div",{class:"nyx-chop",role:"region","aria-label":"Chop to pads","data-nyx-chop":""},X("div",{class:"nyx-chop-head"},a,this.title,n),X("div",{class:"nyx-chop-wavebox"},this.canvas),this.body),typeof ResizeObserver<"u"&&new ResizeObserver(()=>this.paintWave()).observe(this.canvas)}el;isOpen=!1;src=null;analysisOf=null;mode="transients";sensitivity=.5;count=16;perBeat=2;first=0;playBack=!0;choke=!0;snap=!0;moreOpen=!1;result=null;status="";canvas;body;title;async open(){const t=await this.host.source();if(!t)return!1;this.isOpen=!0,this.src=t,this.first=t.pad,this.playBack=t.tempo.known,this.analysisOf=null,this.result=null,this.status="Finding the hits…",this.render();const n=await this.host.analysis(t);return this.src!==t||(this.analysisOf=n,this.status="",this.run()),!0}close(){this.isOpen=!1,this.src=null,this.analysisOf=null}set(t){Object.assign(this,t),this.run()}get preview(){return{chop:this.result,first:this.first,playBack:this.playBack,choke:this.choke,bpm:this.src?.tempo.bpm??0}}run(){this.compute(),this.render()}compute(){const t=this.src,n=this.analysisOf;if(!t||!n)return;const a=ne-this.first;let s=Cp(n,{mode:this.mode,sensitivity:this.sensitivity,count:Math.min(this.count,a),bpm:t.tempo.bpm,perBeat:this.perBeat,snap:this.snap});this.playBack&&(s=this.mode==="transients"&&t.tempo.known?vw(s,t.sampleRate,t.tempo.bpm):Np(s,t.sampleRate,t.tempo.bpm)),this.result=ww(s,a)}field(t,n,a,s=""){const o=X("label",{class:"nc-label",for:`nyx-chop-${t}`},n);return wt(o,`chop:${t}`),X("div",{class:"nc-field","data-nc-row":"","data-nc-id":`chop-${t}`},o,X("span",{class:"nc-readout","data-nc-readout":""},s),a)}choices(t,n,a,s,o){const i=X("div",{class:"nc-choice-row",role:"tablist","aria-label":n,id:`nyx-chop-${t}`,"data-nyx-chop":t});for(const c of s){const d=X("button",{type:"button",class:"nc-choice",role:"tab","aria-selected":String(c.value===a),"data-nc-choice":c.value},c.label);wt(d,q(`chop:${t}:${c.value}`)?`chop:${t}:${c.value}`:`chop:${t}`),c.disabled&&(d.disabled=!0),d.addEventListener("click",()=>o(c.value)),i.append(d)}const l=X("span",{class:"nc-label"},n);return wt(l,`chop:${t}`),X("div",{class:"nc-field nyx-chop-choice","data-nc-row":"","data-nc-id":`chop-${t}`},l,i)}select(t,n,a,s){const o=X("select",{class:"nc-select",id:`nyx-chop-${t}`,"data-nyx-chop":t});for(const i of a)o.append(X("option",{value:i.value},i.label));return o.value=n,o.addEventListener("change",()=>s(o.value)),o}onOff(t,n,a,s,o=!1){return this.choices(t,n,a?"on":"off",[{value:"on",label:"On",disabled:o},{value:"off",label:"Off",disabled:o}],i=>s(i==="on"))}render(){const t=this.src;if(!t)return;const n=(t.to-t.from)/t.sampleRate;this.title.textContent=`${t.stem} · ${n<10?n.toFixed(2):n.toFixed(1)} s`;const a=this.result,s=[];if(s.push(this.choices("mode","Chop",this.mode,mx,p=>{this.mode=p,this.run()})),this.mode==="transients"){const p=X("input",{type:"range",class:"nc-range",id:"nyx-chop-sensitivity",min:"0",max:"1",step:"0.01","data-nyx-chop":"sensitivity"});p.value=String(this.sensitivity);const f=this.field("sensitivity","Sensitivity",p,`${Math.round(this.sensitivity*100)}%`);p.addEventListener("input",()=>{this.sensitivity=Number(p.value),this.compute();const g=f.querySelector(".nc-readout");g&&(g.textContent=`${Math.round(this.sensitivity*100)}%`),this.paintWave()}),p.addEventListener("change",()=>this.render()),f.setAttribute("data-nc-slider",""),f.append(f.querySelector(".nc-readout")),s.push(f)}if(this.mode!=="beats")s.push(this.field("count","Slices",this.select("count",String(this.count),[16,8,4].map(p=>({value:String(p),label:this.mode==="transients"?`Up to ${p}`:String(p)})),p=>{this.count=Number(p),this.run()})));else{const p=f=>Math.ceil(n*t.tempo.bpm/60*f-.05);s.push(this.choices("every","Every",String(this.perBeat),[{value:"1",label:"Beat",disabled:p(1)>$t},{value:"2",label:"1/8",disabled:p(2)>$t},{value:"4",label:"1/16",disabled:p(4)>$t}],f=>{this.perBeat=Number(f),this.run()}))}s.push(this.field("first","Fill from",this.select("first",String(this.first),Array.from({length:ne},(p,f)=>({value:String(f),label:`Pad ${f+1}`})),p=>{this.first=Number(p),this.run()})));const o=a?Or(a,t.sampleRate,t.tempo.bpm):null,i=o!==null&&o.bars===0;if(s.push(this.onOff("play-back","Play it back",this.playBack&&!i,p=>{this.playBack=p,this.run()},i)),this.status&&s.push(X("p",{class:"nc-note","data-nyx-chop":"status"},this.status)),a&&o){const p=a.cuts.length-1,f=this.first+p,g=p>1?`${ts(t.stem,0)} to ${ts(t.stem,p-1)}`:ts(t.stem,0),w=this.playBack&&o.bars?` Play it back writes ${o.bars===1?"a bar":`${o.bars} bars`} on their lanes.`:i?" Longer than 8 bars: no Play it back.":"";s.push(X("p",{class:"nc-note","data-nyx-chop":"summary"},`${p} slices onto pads ${this.first+1}–${f}: ${g}.${w}`));const m=this.host.pads().slice(this.first,f).filter((b,v)=>b.sample&&this.first+v!==t.pad).length;m&&s.push(X("p",{class:"nc-note nyx-chop-warn","data-nyx-chop":"warn"},`${m===1?"1 of those pads has a sound":`${m} of those pads have sounds`}. Chop replaces ${m===1?"it":"them"}; Undo puts ${m===1?"it":"them"} back.`))}const l=X("div",{class:"nc-group","data-nc-id":"chop-more","data-nc-open":String(this.moreOpen)}),c=X("button",{type:"button",class:"nc-group-toggle","aria-expanded":String(this.moreOpen),"data-nyx-chop":"more"},X("span",{class:"nc-group-title"},"More"),X("span",{class:"nc-group-summary"},`${t.tempo.bpm} BPM · choke ${this.choke?"on":"off"}${this.mode!=="transients"?` · snap ${this.snap?"on":"off"}`:""}`),X("span",{class:"nc-group-mark","aria-hidden":"true"},this.moreOpen?"−":"+"));wt(c,"chop:more"),c.addEventListener("click",()=>{this.moreOpen=!this.moreOpen,this.render()});const d=X("div",{class:"nc-group-body",role:"group"});d.hidden=!this.moreOpen;const u=X("div",{class:"nc-field","data-nc-row":"","data-nc-id":"chop-tempo"},X("span",{class:"nc-label"},"Tempo"),X("span",{class:"nc-readout","data-nc-readout":""},`${t.tempo.bpm} BPM, ${t.tempo.from}`));wt(u.firstElementChild,"chop:tempo"),d.append(u,this.onOff("choke","Choke",this.choke,p=>{this.choke=p,this.render()})),this.mode!=="transients"&&d.append(this.onOff("snap","Snap to hits",this.snap,p=>{this.snap=p,this.run()})),l.append(c,d),s.push(l);const h=X("button",{type:"button",class:"nc-btn nyx-chop-go","data-nyx-chop":"go"},"Chop to pads");wt(h,"chop:go"),h.disabled=!a,h.addEventListener("click",()=>{this.src&&this.result&&this.host.apply(this.src,this.result,{first:this.first,playBack:this.playBack&&!i,choke:this.choke,bpm:this.src.tempo.bpm})}),s.push(h),this.body.replaceChildren(...s),this.paintWave()}clickWave(t){const n=this.src,a=this.result;if(!n||!a)return;const s=this.canvas.getBoundingClientRect(),o=n.from+(t.clientX-s.left)/Math.max(1,s.width)*(n.to-n.from);for(let i=0;i<a.cuts.length-1;i++)if(o>=a.cuts[i]&&o<a.cuts[i+1]){this.host.audition(n,a.cuts[i],a.cuts[i+1]);return}}paintWave(){const t=this.src,n=this.canvas,a=n.clientWidth,s=n.clientHeight;if(!t||!a||!s)return;const o=window.devicePixelRatio||1;n.width=Math.round(a*o),n.height=Math.round(s*o);const i=n.getContext("2d");if(!i)return;i.scale(o,o);const l=getComputedStyle(this.el),c=x=>l.getPropertyValue(x).trim(),d=c("--nc-ui-accent"),u=c("--nc-ui-accent-soft")||c("--nc-ui-divider"),h=c("--nc-ui-color-accent-pad")||c("--nc-ui-text-sub"),p=c("--nc-ui-font-readout")||"monospace",f=this.result;i.clearRect(0,0,a,s);const g=Math.max(1,t.to-t.from),w=x=>(x-t.from)/g*a,m=16,b=m+(s-m)/2,v=(s-m)/2-2;if(f)for(let x=1;x<f.cuts.length-1;x+=2)i.fillStyle=u,i.fillRect(w(f.cuts[x]),m,w(f.cuts[x+1])-w(f.cuts[x]),s-m);i.fillStyle=h;const y=g/a;for(let x=0;x<a;x++){const S=Math.floor(t.from+x*y),k=Math.min(t.to,Math.floor(t.from+(x+1)*y));let $=0,E=0;const M=Math.max(1,Math.floor((k-S)/64));for(let B=S;B<k;B+=M){let I=0;for(const ie of t.data)I+=ie[B]??0;I/=t.data.length||1,I<$&&($=I),I>E&&(E=I)}i.fillRect(x,b-E*v,1,Math.max(1,(E-$)*v))}if(f){i.fillStyle=d,i.strokeStyle=d,i.lineWidth=1,i.font=`600 10px ${p}`,i.textBaseline="top";for(let x=0;x<f.cuts.length-1;x++){const S=Math.round(w(f.cuts[x]))+.5;i.beginPath(),i.moveTo(S,m-2),i.lineTo(S,s),i.stroke();const k=String(this.first+x+1);w(f.cuts[x+1])-w(f.cuts[x])>i.measureText(k).width+6&&i.fillText(k,S+3,1)}}}attach(t){if(!this.isOpen||!t){this.el.isConnected&&this.el.remove();return}t.nextElementSibling!==this.el&&t.after(this.el),this.paintWave()}}const Yc="My samples";function No(e){return e.permission?"used with permission":e.licenseStatus==="redistributable"?"shareable licence":e.licenseStatus==="personal"?"personal use":"licence unknown: personal use"}const Uc="http://www.w3.org/2000/svg";function _(e,t={},...n){const a=document.createElement(e);for(const[s,o]of Object.entries(t))a.setAttribute(s,o);return a.append(...n),a}function Un(e,t,n={}){return e?_("a",{href:e,target:"_blank",rel:"noopener noreferrer",...n},t):_("span",n,t)}function bx(e){const t=yx(e);if(!t.length)return"M0 1H48";const n=t.map(i=>Math.sqrt(Math.max(0,i))),a=n.length,s=n.map((i,l)=>`${(l+.5)*48/a} ${1-Math.max(.04,i)*.96}`),o=[...n].map((i,l)=>`${(l+.5)*48/a} ${1+Math.max(.04,i)*.96}`).reverse();return`M0 1L${s.join("L")}L48 1L${o.join("L")}Z`}function yx(e){let t=-1;for(let n=e.length-1;n>=0;n--)if((e[n]??0)>0){t=n;break}return t<0?[]:e.slice(0,Math.min(e.length,Math.max(8,t+2)))}function vx(e){const t=document.createElementNS(Uc,"svg");t.setAttribute("viewBox","0 0 48 2"),t.setAttribute("preserveAspectRatio","none"),t.setAttribute("class","nyx-lib-wave"),t.setAttribute("aria-hidden","true");const n=document.createElementNS(Uc,"path");return n.setAttribute("d",bx(e)),t.append(n),t}function wx(e){return e<1?`${e.toFixed(2)} s`:e<10?`${e.toFixed(1)} s`:`${Math.round(e)} s`}const xx={kick:"Kick",snare:"Snare",clap:"Clap",hat:"Hat",tom:"Tom",perc:"Perc",cymbal:"Cymbal",fx:"FX",tonal:"Tonal"};class kx{constructor(t){this.host=t,this.input=_("input",{type:"search",class:"nyx-lib-input",id:"nyx-library-ask",placeholder:"punchy kick, dusty funk kit",autocomplete:"off",spellcheck:"false",enterkeyhint:"search","aria-label":"Ask the Library","data-nyx-lib":"ask"});const n=_("label",{class:"nc-label",for:"nyx-library-ask"},"Ask");U(n,q("library:ask"),this.input),this.input.addEventListener("input",()=>this.schedule()),this.input.addEventListener("keydown",o=>{o.key==="Enter"?(o.preventDefault(),this.run()):o.key==="Escape"&&(o.preventDefault(),this.host.close())});const a=_("button",{type:"button",class:"nc-btn nyx-lib-close","data-nyx-lib":"close"},"Close");U(a,q("library:close"),a),a.addEventListener("click",()=>this.host.close()),this.forLine=_("p",{class:"nc-note nyx-lib-for","data-nyx-lib":"for"}),this.status=_("p",{class:"nc-note nyx-lib-status","data-nyx-lib":"status","aria-live":"polite"}),this.list=_("ul",{class:"nyx-lib-results","data-nyx-lib":"results"}),this.kitBtn=_("button",{type:"button",class:"nc-btn","data-nyx-lib":"kit"},"Build kit"),U(this.kitBtn,q("library:kit"),this.kitBtn),this.kitBtn.addEventListener("click",()=>void this.buildKit()),this.creditsBtn=_("button",{type:"button",class:"nc-btn","data-nyx-lib":"credits","aria-expanded":"false"},"Credits"),U(this.creditsBtn,q("library:credits"),this.creditsBtn),this.creditsBtn.addEventListener("click",()=>{this.creditsOpen=!this.creditsOpen,this.render()}),this.creditsEl=_("div",{class:"nyx-lib-credits",id:"nyx-library-credits","data-nyx-lib":"credits-list"}),this.creditsBtn.setAttribute("aria-controls",this.creditsEl.id),this.sourcesEl=_("div",{class:"nyx-lib-sources",role:"group","aria-label":"Library source","data-nyx-lib":"sources"}),this.fileInput=_("input",{type:"file",hidden:"","data-nyx-lib":"folder-input","aria-label":"Open a local Library folder"}),this.fileInput.webkitdirectory=!0,this.fileInput.multiple=!0,this.fileInput.addEventListener("change",()=>{const o=this.fileInput.files;o?.length&&this.host.local?.openFiles(o),this.fileInput.value=""});const s=this.host.local;if(s){let o=s.state.status;s.onChange(()=>{const i=s.state.status;i==="ready"&&o!=="ready"&&(this.source="local"),i!=="ready"&&this.source!=="shelf"&&i!=="opening"&&(this.source="shelf"),o=i,this.isOpen?this.run():this.render()})}this.el=_("div",{class:"nyx-library",role:"region","aria-label":"Library","data-nyx-library":""},_("div",{class:"nyx-lib-ask"},n,this.input,a),this.sourcesEl,this.fileInput,this.forLine,this.list,this.status,_("div",{class:"nyx-lib-actions"},this.kitBtn,this.creditsBtn),this.creditsEl)}el;input;forLine;status;list;kitBtn;creditsBtn;creditsEl;sourcesEl;fileInput;source="shelf";lib=null;loading=null;failed=!1;query=null;hits=[];kit=[];playing=null;busy=null;creditsOpen=!1;message="";timer=null;isOpen=!1;open(t){this.isOpen=!0,t!==void 0&&(this.input.value=t),this.ensure().then(()=>this.run()),this.render()}closePanel(){this.isOpen=!1,this.host.stopPreview(),this.playing=null}focus(){this.input.focus()}get catalog(){const t=this.host.local?.lib??null;return t?tc(yn,this.lib,t):this.lib}catalogFor(t){return t==="local"?this.host.local?.lib??null:this.lib}active(){const t=this.host.local?.lib??null;return this.source==="local"?t:this.source==="all"?t||this.lib?tc("All",this.lib,t):null:this.lib}choose(t){t!=="shelf"&&!this.host.local?.lib||(this.source=t,this.run())}openFolder(){const t=this.host.local;t&&(t.canRemember?t.pick():this.fileInput.click())}ensure(){return this.lib?Promise.resolve(this.lib):(this.loading??=this.host.catalog().then(t=>(this.lib=t,this.failed=!1,this.render(),t),()=>(this.failed=!0,this.loading=null,this.render(),null)),this.render(),this.loading)}schedule(){this.timer&&clearTimeout(this.timer),this.timer=setTimeout(()=>this.run(),150)}run(){this.timer&&clearTimeout(this.timer),this.timer=null;const t=this.input.value;if(this.message="",!this.lib&&this.source!=="local"&&!this.failed&&(this.ensure().then(a=>a&&this.run()),this.source==="shelf"))return;const n=this.active();!n||!t.trim()?(this.query=null,this.hits=[],this.kit=[]):(this.query=bi(t,n),this.kit=this.query.kit?sc(n,this.query):[],this.hits=this.query.kit?[]:cy(n,this.query,{limit:Du})),this.render()}get results(){return{kit:!!this.query?.kit,ids:this.query?.kit?this.kit.map(t=>t.sound.id):this.hits.map(t=>t.sound.id),unknown:this.query?.unknown??[]}}async play(t){if(this.playing===t.id){this.host.stopPreview(),this.playing=null,this.render();return}this.playing=t.id,this.render();try{await this.host.preview(t)}finally{this.playing===t.id&&(this.playing=null,this.render())}}async load(t){if(!this.busy){this.busy=t.id,this.render();try{await this.host.load(t,this.input.value)}finally{this.busy=null,this.render()}}}async chopSound(t){if(!(this.busy||!this.host.chop)){this.busy=t.id,this.render();try{await this.host.chop(t,this.input.value)}finally{this.busy=null}}}async buildKit(){if(this.busy)return;this.source!=="local"&&!this.lib&&await this.ensure();const t=this.active();if(!t)return;const n=this.input.value,a=bi(n,t),s=sc(t,{...a,roles:[],kit:!0});if(!s.length){this.message="The Library has nothing for a kit yet.",this.render();return}this.busy="kit",this.render();try{await this.host.buildKit(s,n)}finally{this.busy=null,this.render()}}row(t,n){const a=this.playing===t.id,s=_("button",{type:"button",class:"nyx-lib-play","data-nyx-lib":"play","aria-label":`${a?"Stop":"Play"} ${t.title}`,"aria-pressed":String(a)},a?"■":"▶");U(s,q("library:play"),s),s.addEventListener("click",()=>void this.play(t));const o=this.busy===t.id,i=_("button",{type:"button",class:"nc-btn nyx-lib-load","data-nyx-lib":"load","aria-label":`Load ${t.title} onto ${this.host.target().title}`},o?"Loading…":"Load");this.busy&&(i.disabled=!0),U(i,q("library:load"),i),i.addEventListener("click",()=>void this.load(t));const l=Un(t.licenseUrl,pr(t.license,t.licenseStatus,t.permission),{class:"nyx-lib-badge","data-nyx-lib":"badge",title:t.origin==="local"?`${t.license}: ${No(t)}`:t.license});U(l,q("library:badge"));const c=xx[t.role]??t.role,d=n?n.slot.role===t.role?n.slot.label:`${n.slot.label} · ${c}`:c,u=_("span",{class:"nyx-lib-meta"},...t.origin==="local"?[_("span",{class:"nyx-lib-chip","data-nyx-lib":"local-chip"},"LOCAL")," "]:[],`${d} · ${wx(t.measures.length)} · `,Un(t.creatorLink,t.creator,{class:"nyx-lib-creator"})),h=_("span",{class:"nyx-lib-name",title:t.title},t.title),p=_("span",{class:"nyx-lib-main"},h,u);n?.note&&p.append(_("span",{class:"nyx-lib-meta nyx-lib-warn"},n.note)),Hu(t)&&p.append(_("span",{class:"nyx-lib-meta","data-nyx-lib":"personal"},t.license==="unknown"?"Licence unknown: personal use":`${t.license}, ${No(t)}`));const f=_("span",{class:"nyx-lib-wavebox"},vx(t.wave));U(f,q("library:wave"));const g=this.host.chop&&t.origin==="local"&&(t.kind==="loop"||Cr(t.title).kind==="loop")?_("button",{type:"button",class:"nc-btn nyx-lib-load nyx-lib-chop","data-nyx-lib":"chop","aria-label":`Chop ${t.title} to pads`},"Chop"):null;g&&(this.busy&&(g.disabled=!0),U(g,q("library:chop"),g),g.addEventListener("click",()=>void this.chopSound(t)));const w=_("li",{class:"nyx-lib-row","data-nyx-sound":t.id,"data-nyx-role":t.role},s,p,f,l,g?_("span",{class:"nyx-lib-loads"},i,g):i);return a&&(w.dataset.nyxPlaying=""),w}renderCredits(){if(this.creditsBtn.setAttribute("aria-expanded",String(this.creditsOpen)),this.creditsEl.hidden=!this.creditsOpen,!this.creditsOpen)return;const t=this.host.pads(),n=Wu(t);if(!n.length){this.creditsEl.replaceChildren(_("p",{class:"nc-note"},"No Library sounds on the pads yet."));return}const a=my(n),s=[];for(const o of a){const i=o.origin==="local";a.length>1&&s.push(_("p",{class:"nc-label","data-nyx-lib":`credits-${o.origin}`},i?"Your local Library":yn));const l=_("ul",{class:"nyx-lib-credit-list","data-nyx-origin":o.origin});for(const c of o.credits){const d=`On pad${c.pads.length>1?"s":""} ${c.pads.join(", ")}`;l.append(_("li",{class:"nyx-lib-credit","data-nyx-credit":c.id},_("span",{class:"nyx-lib-name"},c.title),_("span",{class:"nyx-lib-meta"},"by ",Un(c.creatorLink,c.creator)," · ",Un(c.licenseUrl,c.license),...i?[` (${No(c)})`]:[],...c.source?[" · ",Un(c.source,"source")]:i?[]:[" · source"],i?` · from ${gr}`:` · via ${c.curator}`),_("span",{class:"nyx-lib-meta"},d)))}s.push(l)}this.creditsEl.replaceChildren(...s)}forText(){const t=this.host.target();return this.source==="local"?`Load goes on ${t.title}. Your local Library: it plays here and is never uploaded.`:this.source==="all"?`Load goes on ${t.title}. musicmatter.art and your local Library together.`:`Load goes on ${t.title}. Curated: every sound checked by a person.`}renderSources(){const t=this.host.local;if(!t){this.sourcesEl.hidden=!0;return}this.sourcesEl.hidden=!1;const n=t.state,a=(i,l,c="")=>{const d=_("button",{type:"button",class:"nc-btn","data-nyx-lib":`source-${i}`,...c?{title:c}:{},"aria-pressed":String(this.source===i),"data-on":String(this.source===i)},l);return U(d,q(`library:source-${i}`),d),d.addEventListener("click",()=>this.choose(i)),d},s=(i,l,c)=>{const d=_("button",{type:"button",class:"nc-btn","data-nyx-lib":i},l);return U(d,q(`library:${i}`),d),d.addEventListener("click",c),d},o=[a("shelf",yn)];if(n.status==="ready"&&o.push(a("local",Yc,n.name),a("all","All")),n.status==="reconnect"){const i=s("reconnect",`Reconnect ${Yc}`,()=>void t.reconnect());i.title=n.name,o.push(i)}else n.status!=="ready"&&o.push(s("open-folder",n.status==="opening"?"Opening…":"Open folder…",()=>this.openFolder()));(n.status==="ready"||n.status==="reconnect")&&o.push(s("forget","Forget",()=>void t.forget())),this.sourcesEl.replaceChildren(...o)}localStatus(){const t=this.host.local;if(!t)return null;const n=t.state;return n.status==="error"?{text:n.message,danger:!0}:this.source==="shelf"?null:n.status==="ready"&&!n.remembered&&!this.query?{text:`${n.lib.sounds.length} local sounds. This browser can't keep the folder: open it again next visit.`,danger:!1}:null}render(){this.renderSources(),this.forLine.textContent=this.forText();const t=[];if(this.query?.kit)for(const i of this.kit)t.push(this.row(i.sound,i));else for(const i of this.hits)t.push(this.row(i.sound));this.list.replaceChildren(...t);let n=this.message,a=!1;const s=this.active(),o=this.localStatus();!n&&o?(n=o.text,a=o.danger):!n&&this.source==="local"&&!s?n="Open your local Library: the folder the sample picker exported.":n||(this.failed&&!s?(n="The Library couldn't be reached. Check the connection, then ask again.",a=!0):s?this.busy==="kit"?n="Building the kit…":this.query?this.query.kit?n=this.kit.length?"A kit for pads 1–8: Build kit puts it on them and keeps the pattern.":"Nothing for a kit.":this.hits.length?n="":n="Nothing matches. Try a role (kick, snare, hat) and a word like dark or tight.":n=`${s.sounds.length} sounds. Try "punchy kick" or "funk kit".`:n="Opening the Library…",this.query?.unknown.length&&(n=`${n?`${n} `:""}Not in the Library's words: ${this.query.unknown.join(", ")}.`.trim())),this.status.textContent=n,this.status.hidden=!n,a?this.status.dataset.ncTone="danger":delete this.status.dataset.ncTone,this.kitBtn.textContent=this.busy==="kit"?"Building…":"Build kit",this.kitBtn.disabled=!!this.busy||!s,this.renderCredits()}refresh(){const t=this.host.target(),n=this.forText();if(this.forLine.textContent!==n){this.forLine.textContent=n;for(const a of this.list.querySelectorAll('[data-nyx-lib="load"]')){const s=a.closest("li")?.querySelector(".nyx-lib-name")?.textContent??"";a.setAttribute("aria-label",`Load ${s} onto ${t.title}`)}}this.creditsOpen&&this.renderCredits()}attach(t){if(!this.isOpen||!t){this.el.isConnected&&this.el.remove();return}if(t.nextElementSibling===this.el)return;const n=document.activeElement===this.input,{selectionStart:a,selectionEnd:s}=this.input;t.after(this.el),n&&(this.input.focus(),a!==null&&s!==null&&this.input.setSelectionRange(a,s))}}const Ut="nyx-local-library.json";function Fo(e){return{name:e.name,async read(t){const n=t.split("/"),a=n.pop();let s=e;for(const o of n)s=await s.getDirectoryHandle(o);return(await s.getFileHandle(a)).getFile()}}}function $x(e){const t=[...e].map(l=>({file:l,path:(l.webkitRelativePath||l.name).replace(/\\/g,"/")})),a=t.filter(l=>l.path===Ut||l.path.endsWith(`/${Ut}`)).sort((l,c)=>l.path.length-c.path.length)[0];if(!a)return null;const s=a.path.slice(0,a.path.length-Ut.length),o=new Map;for(const l of t)l.path.startsWith(s)&&o.set(l.path.slice(s.length),l.file);return{name:s.replace(/\/$/,"").split("/").pop()||"Local Library",async read(l){const c=o.get(l);if(!c)throw new Error(`${l} isn't in the folder`);return c}}}function Sx(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60)||"local"}async function Ex(e){let t;try{t=await(await e.read(Ut)).text()}catch{throw new Error(`${e.name} has no ${Ut}. Open the folder the sample picker exported.`)}let n;try{n=JSON.parse(t)}catch{throw new Error(`${Ut} in ${e.name} isn't readable JSON.`)}if(n?.kind!=="nyx-local-library")throw new Error(`${e.name} isn't a NYX local Library.`);return qu(n,Sx(e.name))}async function Ax(e){const t=new Uint8Array(await crypto.subtle.digest("SHA-256",e));return Array.from(t,n=>n.toString(16).padStart(2,"0")).join("")}async function Mx(e,t){const n=_u(t.audio);if(t.origin!=="local"||!n)throw new Error("it isn't a local sound");let a;try{a=await e.read(n)}catch{throw new Error(`${n} isn't in ${e.name} any more`)}const s=await a.arrayBuffer();if(await Ax(s)!==t.sha256)throw new Error("the file isn't the one the local Library lists");return s}const Lx="nyx-local-library",Oi="handles",Po="folder";function Tx(){return new Promise((e,t)=>{const n=indexedDB.open(Lx,1);n.onupgradeneeded=()=>n.result.createObjectStore(Oi),n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}function zo(e,t){return Tx().then(n=>new Promise((a,s)=>{const o=t(n.transaction(Oi,e).objectStore(Oi));o.onsuccess=()=>a(o.result),o.onerror=()=>s(o.error)}).finally(()=>n.close()))}function Cx(){return typeof indexedDB>"u"?{get:async()=>null,set:async()=>{},clear:async()=>{}}:{get:()=>zo("readonly",e=>e.get(Po)).then(e=>e??null),set:e=>zo("readwrite",t=>t.put(e,Po)),clear:()=>zo("readwrite",e=>e.delete(Po))}}function Nx(){const e=globalThis;return typeof e.showDirectoryPicker=="function"?e.showDirectoryPicker.bind(globalThis):null}class Fx{st={status:"none"};folder=null;handle=null;picker;handles;listeners=[];constructor(t={}){this.picker=t.picker===void 0?Nx():t.picker,this.handles=t.handles??Cx()}get state(){return this.st}get lib(){return this.st.status==="ready"?this.st.lib:null}get canRemember(){return!!this.picker}onChange(t){this.listeners.push(t)}set(t){this.st=t;for(const n of this.listeners)n()}async load(t,n){this.set({status:"opening",name:t.name});try{const a=await Ex(t);return this.folder=t,this.set({status:"ready",name:t.name,lib:a,remembered:n}),!0}catch(a){return this.folder=null,this.set({status:"error",message:a.message}),!1}}async restore(){if(!this.picker)return;let t=null;try{t=await this.handles.get()}catch{return}if(!t)return;this.handle=t,(await t.queryPermission?.({mode:"read"}).catch(()=>"prompt")??"granted")==="granted"?await this.load(Fo(t),!0):this.set({status:"reconnect",name:t.name})}async reconnect(){const t=this.handle;return t?(await t.requestPermission?.({mode:"read"}).catch(()=>"denied")??"granted")!=="granted"?(this.set({status:"reconnect",name:t.name}),!1):this.load(Fo(t),!0):this.pick()}async pick(){if(!this.picker)return!1;let t;try{t=await this.picker({mode:"read",id:"nyx-local-library"})}catch(a){return a.name==="AbortError"||this.set({status:"error",message:`The folder couldn't be opened: ${a.message}`}),!1}const n=await this.load(Fo(t),!0);return n&&(this.handle=t,await this.handles.set(t).catch(()=>{})),n}async openFiles(t){const n=$x(t);return n?this.load(n,!1):(this.set({status:"error",message:`That folder has no ${Ut}. Open the folder the sample picker exported.`}),!1)}async forget(){this.folder=null,this.handle=null,await this.handles.clear().catch(()=>{}),this.set({status:"none"})}bytes(t){return this.folder?Mx(this.folder,t):Promise.reject(new Error("its local Library folder isn't open. Open or reconnect it"))}}const Kc="nyx-picker-bridge",Xc=1,Px=3e3,zx=64*1024*1024,Ox=new Set(["127.0.0.1","localhost","[::1]"]);function Dx(e){const t=new URLSearchParams(e).get("picker");if(!t)return null;let n;try{n=new URL(t)}catch{return null}return n.protocol!=="http:"||!Ox.has(n.hostname)||!n.port||n.username||n.password||t.replace(/\/$/,"")!==n.origin?null:n.origin}function Bx(e){const t=e&&typeof e=="object"&&!Array.isArray(e)?e:{};if(t.kind!=="nyx-picker-kit")throw new Error("not a picker kit");const n=Array.isArray(t.sounds)?t.sounds:[];if(!n.length)throw new Error("the kit is empty");if(n.length>ne)throw new Error(`more than ${ne} sounds`);const a=new Set,s=[];for(const l of n){const c=l&&typeof l=="object"?l:{},d=c.pad;if(typeof d!="number"||!Number.isInteger(d)||d<1||d>ne||a.has(d))throw new Error("a sound has no pad of its own");const u=qu({sounds:[c]},"sample-picker").sounds[0];if(!u)throw new Error(`pad ${d}'s sound isn't complete`);a.add(d),s.push({pad:d-1,sound:u})}const o=typeof t.id=="string"?t.id.slice(0,80):"",i=typeof t.name=="string"&&t.name.trim()?t.name.trim().slice(0,80):"Sample picker";return{id:o,name:i,sounds:s}}function Rx(e,t,n){if(n==="replace"){const o=[];for(let i=0;i<ne;i++)e[i]&&o.push(i);return{to:[...t],replaced:o,clear:!0}}const a=new Set;for(let o=0;o<ne;o++)e[o]||a.add(o);const s=t.map(o=>a.delete(o)?o:-1);for(let o=0;o<s.length;o++){if(s[o]!==-1)continue;const i=[...a].sort((l,c)=>l-c)[0];if(i===void 0)break;a.delete(i),s[o]=i}return{to:s,replaced:[],clear:!1}}function Di(e){const t=[...e].sort((n,a)=>n-a).map(n=>String(n+1));return t.length>1?`${t.slice(0,-1).join(", ")} and ${t[t.length-1]}`:t[0]??""}function Ix(e,t,n){const a=t.to.filter(d=>d>=0),s=t.to.length-a.length,o=a.length,i=`${o===1?"pad":"pads"} ${Di(a)}`,l=[],c=t.clear&&t.replaced.length>0;if(c){l.push(`This clears all 16 pads in NYX and loads your picker kit onto ${i}; the other pads stay empty.`);const d=t.replaced.map(u=>`${u+1} (${n(u)})`).join(", ");l.push(`Gone: pad${t.replaced.length===1?"":"s"} ${d}. Undo brings all 16 back as they were.`)}else if(l.push(`From the sample picker on this computer, onto ${i}.`),t.replaced.length){const d=t.replaced.map(u=>`${u+1} (${n(u)})`).join(", ");l.push(`Replaces pad${t.replaced.length===1?"":"s"} ${d}. Undo brings ${t.replaced.length===1?"it":"them"} back.`)}return s&&l.push(`${s} won't fit: no empty pads left.`),e.sounds.some(d=>d.sound.licenseStatus==="personal")&&l.push("Some are for personal use only."),l.push("The pattern stays."),{title:c?"Replace everything in NYX?":`Load ${o} sound${o===1?"":"s"} from the picker?`,body:l.join(" ")}}async function Rp(e){const t=new Uint8Array(await crypto.subtle.digest("SHA-256",e));return Array.from(t,n=>n.toString(16).padStart(2,"0")).join("")}async function qx(e,t,n,a){const s=h=>({ok:!1,placed:[],left:[],message:h}),o=Rx(a.filled(),e.sounds.map(h=>h.pad),t),i=e.sounds.flatMap((h,p)=>{const f=o.to[p]??-1;return f>=0?[{k:h,to:f}]:[]}),l=e.sounds.flatMap((h,p)=>(o.to[p]??-1)<0?[h.pad+1]:[]);if(!i.length)return{...s("Nothing loaded: NYX has no empty pads."),left:l};if(!await a.ask(Ix(e,o,a.padName)))return{...s("Not loaded: cancelled in NYX."),left:l};const c=[];try{for(const{k:h,to:p}of i){const f=n.get(h.pad+1);if(!f)throw new Error(`pad ${h.pad+1}'s audio is missing`);if(await Rp(f)!==h.sound.sha256)throw new Error(`pad ${h.pad+1}'s audio isn't the file named`);const{data:g,rate:w}=await a.decode(h.sound,f);c.push({index:p,sound:h.sound,data:g,rate:w})}}catch(h){return{...s(`Not loaded: ${h.message}. NYX's pads are as they were.`),left:l}}await a.place(c,o.clear);const d=i.map(({k:h,to:p})=>({from:h.pad+1,to:p+1})),u=l.length?` ${l.length} didn't fit (no empty pads).`:"";return{ok:!0,placed:d,left:l,message:o.clear&&o.replaced.length?`Replaced everything in NYX: pad${d.length===1?"":"s"} ${Di(i.map(h=>h.to))} loaded, the others empty.`:`Loaded onto NYX pad${d.length===1?"":"s"} ${Di(i.map(h=>h.to))}.${u}`}}const _x=["pad","undo","play","remove","stop","instrument"],Hx=48,jx="0123456789abcdefghijklmnopqrstuvwxyz";function Wx(e,t=Hx){const n=Math.floor((e?.length??0)/2);if(!e||!n)return"";const a=Math.min(t,n),s=[];let o=0;for(let i=0;i<a;i++){const l=Math.floor(i*n/a),c=Math.max(l+1,Math.floor((i+1)*n/a));let d=0;for(let u=l;u<c;u++)d=Math.max(d,Math.abs(e[2*u]??0),Math.abs(e[2*u+1]??0));s.push(d),o=Math.max(o,d)}return s.map(i=>jx[Math.round((o?i/o:0)*35)]).join("")}function Yx(e,t,n){const a=Number(n);if(!Number.isInteger(a)||a<1||a>ne)throw new Error("no such pad");const{kit:s,audio:o}=Dr(e,t);if(s.sounds.length!==1||s.sounds[0]?.pad!==a-1)throw new Error(`the sound isn't for pad ${a}`);return{kit:s,audio:o,pad:a-1}}async function Ux(e,t,n,a){const s=e.sounds[0];if(!s)return{ok:!1,placed:[],left:[],message:"Not loaded: no sound."};const o=s.pad+1;try{const i=t.get(o);if(!i)throw new Error(`pad ${o}'s audio is missing`);if(await Rp(i)!==s.sound.sha256)throw new Error("the audio isn't the file named");const{data:l,rate:c}=await a.decode(s.sound,i);await a.place({index:s.pad,sound:s.sound,data:l,rate:c},n)}catch(i){return{ok:!1,placed:[],left:[],message:`Not loaded: ${i.message}.`}}return{ok:!0,placed:[{from:o,to:o}],left:[],message:`Pad ${o} ← ${s.sound.title}`}}function Kx(e=8){const t=new Map;return{record(n,a){for(t.delete(n),t.set(n,a);t.size>e;)t.delete(t.keys().next().value)},get:n=>t.get(n)??null,drop(n){t.delete(n)},entries:()=>[...t.values()]}}function Xx(e,t){return e?t!==e.after?`Pad ${e.index+1} has changed since; nothing undone.`:null:"Nothing to undo: NYX doesn't know that load (reloaded?)."}function Gx(e){const t=e&&typeof e=="object"?e:{};if(t.kind!=="nyx-picker-instrument")throw new Error("that isn't an instrument");const n=t.layers&&typeof t.layers=="object"?t.layers:{},a=s=>typeof s=="number"&&Number.isInteger(s)&&s>=1&&s<=128?s:1;return{name:typeof t.name=="string"&&t.name.trim()?t.name.trim().slice(0,80):"Instrument",credit:typeof t.credit=="string"?t.credit.slice(0,200):"",source:t.source==="sfz"?"sfz":"folder",layers:{sent:a(n.sent),found:a(n.found)}}}function Ip(e){return _x.filter(t=>t==="pad"||t==="undo"?!!(e.receivePad&&e.undo):!!e[t])}function qp(e){return Object.prototype.toString.call(e)==="[object ArrayBuffer]"}function Dr(e,t){const n=Bx(e),a=t&&typeof t=="object"?t:{},s=new Map;for(const{pad:o}of n.sounds){const i=a[String(o+1)];if(!qp(i)||i.byteLength>zx)throw new Error(`pad ${o+1}'s audio is missing or too big`);s.set(o+1,i instanceof ArrayBuffer?i:new Uint8Array(i).slice().buffer)}return{kit:n,audio:s}}class Vx{constructor(t){this.o=t}last="";busy=!1;start(){return this.o.self.addEventListener("message",t=>void this.onMessage(t)),this.o.self.setInterval(()=>this.update(!0),Px),this.update(!0),this}update(t=!1){const n=this.o.pads(),a=JSON.stringify(n);!t&&a===this.last||(this.last=a,this.post({type:"state",pads:n,busy:this.busy,can:this.can()}))}can(){return Ip(this.o)}post(t){try{this.o.picker.postMessage({nyx:Kc,v:Xc,...t},this.o.origin)}catch{}}padChain=Promise.resolve();onPadMessage(t,n,a){const s=this.padChain.then(async()=>{a(await qt(t,this.o,n)),this.update(!0)});return this.padChain=s.catch(()=>{}),s}async onMessage(t){if(t.origin!==this.o.origin||t.source!==this.o.picker)return;const n=t.data;if(!n||typeof n!="object"||n.nyx!==Kc||n.v!==Xc)return;if(n.type==="hello")return this.update(!0);const a=typeof n.id=="string"?n.id.slice(0,80):"",s=c=>this.post({type:"result",id:a,...c});if(n.type==="play"||n.type==="stop")return void s(await qt(n,this.o,a));if(n.type==="pad"||n.type==="undo"||n.type==="remove")return this.onPadMessage(n,a,s);if(n.type!=="kit")return;if(this.busy)return s({ok:!1,placed:[],left:[],message:"NYX is still loading the last kit."});let o,i;try{({kit:o,audio:i}=Dr(n.kit,n.audio))}catch(c){return s({ok:!1,placed:[],left:[],message:`Not loaded: ${c.message}.`})}const l=n.mode==="fill"?"fill":"replace";this.busy=!0;try{s(await this.o.receive(o,l,i))}catch(c){s({ok:!1,placed:[],left:[],message:`Not loaded: ${c.message}.`})}finally{this.busy=!1,this.update(!0)}}}const Gc=e=>{const t=Number(e);return Number.isInteger(t)&&t>=1&&t<=ne?t:0};async function qt(e,t,n){const a=s=>({ok:!1,placed:[],left:[],message:s});try{if(e.type==="stop"){const i=Number(e.pad)===0?0:Gc(e.pad);return Number(e.pad)!==0&&!i?a("No such pad."):t.stop?await t.stop(i):a("This NYX can't stop a pad for the picker.")}if(e.type==="play"||e.type==="remove"){const i=Gc(e.pad);return i?e.type==="play"?t.play?await t.play(i):a("This NYX can't play a pad for the picker."):t.remove?await t.remove(i,n):a("This NYX can't remove a sound for the picker."):a("No such pad.")}if(e.type==="undo")return t.undo?await t.undo(typeof e.of=="string"?e.of.slice(0,80):""):a("This NYX can't undo a picker load.");if(!t.receivePad)return a("This NYX can't load one pad.");const{kit:s,audio:o}=Yx(e.kit,e.audio,e.pad);return await t.receivePad(s,o,n)}catch(s){return a(`Not loaded: ${s.message}.`)}}function Qx(e,t){const n=Dx(e.location.search),a=e.opener;return!n||!a||e.parent!==e?null:new Vx({self:e,picker:a,origin:n,...t}).start()}function Jx(e){let t=!1,n=Promise.resolve();const a=s=>{const o=n.then(s);return n=o.catch(()=>{}),o};return{pads:()=>e.pads(),can:Ip(e),receivePad:(s,o,i,l)=>a(()=>qt({type:"pad",kit:JSON.parse(JSON.stringify(s??null)),audio:o,pad:i},e,typeof l=="string"?l.slice(0,80):"")),undo:s=>a(()=>qt({type:"undo",of:s},e,"")),play:s=>qt({type:"play",pad:s},e,""),stop:s=>qt({type:"stop",pad:s},e,""),remove:(s,o)=>a(()=>qt({type:"remove",pad:s},e,typeof o=="string"?o.slice(0,80):"")),async instrument(s,o){const i=u=>({ok:!1,placed:[],left:[],message:u});if(!e.instrument)return i("This NYX can't take an instrument: reload the Studio tab.");let l;try{l=Gx(JSON.parse(JSON.stringify(s??null)))}catch(u){return i(`Not opened: ${u.message}.`)}const c=Array.isArray(o)?o:[],d=[];for(const u of c){const h=u&&typeof u=="object"?u:{};if(typeof h.path!="string"||!h.path||h.path.length>400||!qp(h.bytes))return i("Not opened: a file came without its name or bytes.");d.push({path:h.path.replace(/\\/g,"/"),bytes:h.bytes})}if(!d.length)return i("Not opened: the instrument came with no files.");try{return await e.instrument(l,d)}catch(u){return i(`Not opened: ${u.message}.`)}},async receive(s,o,i){const l=u=>({ok:!1,placed:[],left:[],message:u});if(t)return l("NYX is still loading the last kit.");let c,d;try{({kit:c,audio:d}=Dr(JSON.parse(JSON.stringify(s??null)),i))}catch(u){return l(`Not loaded: ${u.message}.`)}t=!0;try{return await e.receive(c,o==="fill"?"fill":"replace",d)}catch(u){return l(`Not loaded: ${u.message}.`)}finally{t=!1}}}}const Zx="nyx",ek=1;function _p(e){const t={nyx:1,...$r(e)};e.inst&&(t.inst=structuredClone(e.inst)),e.mode==="instrument"&&(t.mode="instrument");const n=Wu(e.pads);if(n.length&&(t.credits=n),Array.isArray(e.slots)){const a=Array.from({length:Ln},(o,i)=>{const l=e.slots?.[i];return l?A0(l):null}),s=typeof e.active=="number"&&a[e.active]?e.active:null;Object.assign(t,{slots:a,active:s})}return t}function Hp(e){return Br(e),xs(e)}function tk(e){Br(e);const t=e;if(!Array.isArray(t.slots))return null;const n=t.slots,a=Array.from({length:Ln},(i,l)=>{const c=n[l];return c&&typeof c=="object"&&!Array.isArray(c)?xs(c):null}),s=t.active,o=typeof s=="number"&&Number.isInteger(s)&&s>=0&&s<Ln&&a[s]?s:null;return{slots:a,active:o}}function nk(e){Br(e);const t=e,n=ap(t.inst);return{mode:t.mode==="instrument"&&n?"instrument":"pads",inst:n}}function Br(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Not a NYX pattern.");const t=e.nyx;if(t!==1)throw new Error(`Not a NYX pattern${typeof t=="number"?` (version ${t})`:""}.`)}function Rr(){try{return globalThis.localStorage??null}catch{return null}}function ak(e,t,n=Rr()){let a;try{a=t?.storageKey?.(e)}catch{a=void 0}if(typeof a!="string"||!a||a===e)return e;try{if(t?.legacyCopy!==!1&&n&&n.getItem(a)===null){const s=n.getItem(e);s!==null&&n.setItem(a,s)}}catch{}return a}const sk="nyx.state",jp="nyx.scene-samples",ok=/^[0-9a-f]{16,64}$/;function Wp(e){try{const t=JSON.parse(e?.getItem(jp)??"[]");return Array.isArray(t)?t.filter(n=>typeof n=="string"&&ok.test(n)):[]}catch{return[]}}function ik(e,t=Rr()){if(!t)return;const n=new Set;for(const s of[e,...e.slots??[]])for(const o of s?.pads??[])o.sample&&n.add(o.sample);for(const s of e.inst?.zones??[])n.add(s.s);if(!n.size)return;const a=[...Wp(t).filter(s=>!n.has(s)),...n].slice(-2048);try{t.setItem(jp,JSON.stringify(a))}catch{}}function rk(e,t=Rr()){const n=ma(e);if(!t)return n;try{for(let a=0;a<t.length;a++){const s=t.key(a);if(s?.startsWith(sk))try{for(const o of ma(rp(JSON.parse(t.getItem(s)??"null"))))n.add(o)}catch{}}}catch{return null}for(const a of Wp(t))n.add(a);return n}const lk="NYX Sampler",Aa="nyx",Re=Ks(),J=ix(Aa,Re),Yp=ak(sx("nyx.state",Re),J),Ir=.15,A=M0(Yp),H=new Lw(Re>1?`nyx-${Re}`:"nyx"),zn=()=>L0(Yp,A),ya=Kx(),it=()=>{const e=rk(A);if(e)for(const t of Ne?.before??[])t.pad.sample&&e.add(t.pad.sample);if(e)for(const t of _r)e.add(t);if(e)for(const t of ya.entries())t.before.sample&&e.add(t.before.sample);e&&H.prune(e)};let Xe=!1,Ft=0,we=null,Nn=!1,jt="",O="";const Ss=new Map,Bi=new Map,ck=1600,dk=96,Wa=new Map;function Up(e){Ss.has(e.hash)||Ss.set(e.hash,qc(e.data)),Bi.has(e.hash)||Bi.set(e.hash,qc(e.data,ck))}function Kp(e){if(!e.sample)return;const t=Bi.get(e.sample);if(!t||e.start<=0&&e.end>=1)return Ss.get(e.sample);const n=`${e.sample}:${e.start}:${e.end}`,a=Wa.get(n);if(a)return a;const s=t.length/2,o=Math.max(0,Math.min(s-1,Math.floor(e.start*s))),i=Math.max(o+1,Math.min(s,Math.ceil(e.end*s))),l=[],c=Math.min(dk,i-o);for(let d=0;d<c;d++){const u=o+Math.floor((i-o)*d/c),h=Math.max(u+1,o+Math.floor((i-o)*(d+1)/c));let p=0,f=0;for(let g=u;g<h;g++)p=Math.min(p,t[g*2]??0),f=Math.max(f,t[g*2+1]??0);l.push(p,f)}return Wa.size>256&&Wa.clear(),Wa.set(n,l),l}let Xp=[];const Ce=new zr;let Qt=new Map,Gp=null;const ht=new Hh({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let F=null,xn=null;const uk=new Zh({...rx(),app:ox(lk,Re),version:"0.1.0",clock:ht,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const e=F?.state;return e==="running"?"running":e==="suspended"?"suspended":e?"none":"needs-gesture"},startGate:()=>xn?.whenSettled?.()??null}),Fn=e=>e+(xn?.offset??0),D=()=>ht.transport,nn=()=>D().isPlayingAt(ce()),Jt=()=>nn()&&!Xe;let Oo=null,K=null,va=null;const Et=J?Jv(e=>K?.port.postMessage(e),(e,t,n)=>{const a=z(e);return a.sample?av(a,H.info(a.sample),D().bpm,n,t,st.stretchedFor(e)):null}):null,Es=J?Yw({recall:e=>Zr(e,"recall",!1),now:ce,timeAt:e=>D().running?D().timeAt(e):null}):null,Do=()=>A.mode==="instrument"&&A.inst!==null,Ue=hx(J,e=>K?.port.postMessage(e),Et?{notes:(e,t)=>Do()?fe.bus({kind:"notes",source:e,events:t}):Et.notes(e,t),release:(e,t)=>Do()?fe.bus({kind:"release",source:e,ids:t}):Et.release(e,t),off:(e,t)=>{fe.bus({kind:"off",source:e,atBeat:t}),Et.off(e,t),Es?.off(e,t)},controls:(e,t)=>Es?.controls(e,t)}:null,e=>{(Do()||e.kind==="off")&&fe.bus(e)});Et&&setInterval(()=>{const e=D();e.running&&Et.prune(e.beatAt(ce()))},5e3);const at=J&&typeof J.notesOut=="function"?Xv({send:e=>J.notesOut?.(e)===!0,ctx:J.ctx,mapper:{toSharedTime:e=>e-(xn?.offset??0)},transport:D,win:window,nameOf:e=>z(e).sample?z(e).name:null,ctxOrigin:(()=>{try{return window.parent.performance.timeOrigin}catch{return performance.timeOrigin}})()}):null,fe=new Nv({get:()=>A.inst,set:e=>{A.inst=e,zn(),it(),ka()},mode:()=>A.mode,setMode:e=>no(e),audio:async()=>await ge()&&F&&va?{ctx:F,node:va}:null,store:{put:async(e,t)=>H.put(e,t),get:e=>H.get(e)},report:(e,t,n,a)=>at?.note(e,t,n,a,A.inst?.name??void 0),timeOf:e=>{const t=D();return t.running?Fn(t.timeAt(e)):null},message:e=>{O=e,C()},help:(e,t)=>U(e,q(t),e)}),As=[];let Ms=!1,We=null,Zt=null,Vc=null;const Ri=new Set;function ge(){return Vc??=(async()=>{J?(F=J.ctx,Oo=J.output,xn=J.mapper??new rl(J.ctx)):(F=new AudioContext({latencyHint:"interactive"}),Oo=F.destination,xn=new rl(F)),xn.start();try{await F.audioWorklet.addModule(dw),await F.audioWorklet.addModule(jv),await F.audioWorklet.addModule(Av)}catch{return O="Audio could not start (the sampler's worklet did not load). Reload to try again.",C(),!1}K=new AudioWorkletNode(F,"nyx-sampler",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]}),K.port.onmessage=n=>pk(n.data),We=Bf(F,{moduleUrl:lx()??qf,bpm:D().bpm,slots:3,state:Ti(A.hacks)}),Ii=Ti(A.hacks),Zt=new GainNode(F,{gain:A.master}),K.connect(We.input),va=new AudioWorkletNode(F,"nyx-instrument",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]}),va.connect(We.input);const e=new AudioWorkletNode(F,My,{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),t=Cy(F);We.output.connect(Zt).connect(e).connect(t.input),t.output.connect(Oo),If(We,ht,{toAudioTime:Fn,now:ce});for(const n of ma(A))await mt(n);return zt(),K.port.postMessage({type:"sig",sig:Pn?.signals()??wn()}),Ue?.resend(),fe.resend(),Ms&&K.port.postMessage({type:"hitlog",on:!0}),On(),!0})(),Vc}async function mt(e){const t=await H.get(e);return t?(Up(t),K&&!Ri.has(e)&&(Ri.add(e),K.port.postMessage({type:"sample",hash:e,channels:t.data.map(n=>n.slice()),rate:t.sampleRate})),t):null}function pk(e){if(e.type==="skip"&&e.hits){Fk(e.hits);return}if(e.type==="hitlog"&&e.hits&&Ms){for(const t of e.hits)As.length<2e4&&As.push(t);return}e.type!=="pos"||!e.voices||(Xp=e.voices,Ce.report(e.voices,performance.now()),Ur(),Qt=new Map(e.voices.map(([t,n,a,s])=>{const o=Vw(s)?st.cache.byId(s):void 0,i=o?H.info(o.job.sample):void 0;return o&&i?[t,(o.job.from+n/o.frames*(o.job.to-o.job.from))/i.frames]:[t,n/Math.max(1,a)]})))}let as=null,hk=0;const Zn=new Map,Vp=[],fk=.25;function mk(){if(as)return as;const e=new Worker(new URL("/nyx/assets/stretch-worker-DVLOsvIo.js",import.meta.url),{type:"module"});return e.onmessage=t=>{const n=t.data;Zn.get(n.id)?.(n),Zn.delete(n.id)},e.onerror=t=>{console.error("NYX stretch worker",t.message);for(const n of Zn.values())n({error:t.message||"worker failed"});Zn.clear()},as=e,e}async function Qp(e){const t=await H.get(e.sample);if(!t)return null;const n=Math.ceil(fk*e.sampleRate),a=Math.max(0,e.from-n),s=Math.min(t.frames,e.to+n),o=t.data.map(c=>c.slice(a,s)),i=++hk,l=mk();return new Promise(c=>{Zn.set(i,d=>{if(d.error||!d.channels){console.error("NYX stretch",d.error),c(null);return}typeof d.ms=="number"&&Vp.push(Math.round(d.ms)),c(d.channels)}),l.postMessage({id:i,channels:o,sampleRate:e.sampleRate,from:e.from-a,to:e.to-a,frames:e.frames,semitones:e.semitones},o.map(d=>d.buffer))})}const st=new Jw({run:Qp,deliver(e,t){K?.port.postMessage({type:"sample",hash:e.sample,channels:t,rate:e.job.sampleRate},t.map(n=>n.buffer))},drop(e){K?.port.postMessage({type:"drop",hash:e.sample})},changed(){st.failed&&!O&&(O="Keep pitch couldn't start in this browser: fitted pads change speed and pitch instead."),zt(),C()}});function zt(){if(Pn?.update(A.pads),!K)return;for(const n of A.pads)n.sample&&(n.length==="hit"||n.landOnHits)&&Nk(n.sample);const e=D().bpm,t=n=>H.info(n);st.plan(A.pads,t,e),K.port.postMessage({type:"program",program:sv(A,t,e,n=>st.stretchedFor(n))})}let Qc="";function On(e=!1){if(!K)return;const t=D(),n=nn(),a=Jt();let s=0,o=t.bpm;if(t.running||t.isPlayingAt(ce())){const l=Math.max(0,t.beatAt(ce())),c=t.timeAt(l);o=60/(t.timeAt(l+1)-c),s=Fn(c)-l*60/o}const i=JSON.stringify([n,a,Math.round(s*2e3),o,Ft]);!e&&i===Qc||(Qc=i,K.port.postMessage({type:"clock",clock:{playing:n,pattern:a,zero:s,bpm:o,join:Ft}}))}let Ii=null;function Jp(){if(!We)return;const e=Ti(A.hacks),t=Ev(Ii,e);if(Ii=e,t.whole)We.setState(e);else for(const[n,a,s]of t.params)We.setParam(n,a,s)}let ia=null;function gk(){if(ia){const t=ia;se(()=>{A.lanes=t}),O="Pattern back.",C();return}const e=structuredClone(A.lanes);e.some(t=>t.steps.some(n=>n.on)||t.mute||t.solo||t.length!==he)&&(se(()=>{A.lanes=A.lanes.map(()=>qs())}),we=null,ia=e,O="Pattern cleared: press Undo to bring it back.",C())}function se(e){ia=null;const t=jr(!1);e(),t&&it(),A.active!==null&&(Nn=!0),jt="",zn(),zt(),Jp(),C()}const z=e=>A.pads[e]??ot(e),Ye=e=>A.lanes[e]??qs(),Ma=()=>z(A.selected);function Be(e,t=A.selected){se(()=>e(z(t)))}async function bk(e,t){const n=z(e);if(n.normalize){Be(s=>{s.normalize&&(s.normalize.on=t)},e);return}if(!n.sample)return;let a;if(n.provenance)a={on:t,gainDb:0};else{const s=H.held(n.sample)??await H.get(n.sample);if(!s)return;a={...Mn(s.data,s.sampleRate),on:t}}Be(s=>{s.sample===n.sample&&(s.normalize=a)},e)}function Ls(e,t,n){se(()=>{const a=Ye(e).steps[t];a&&n(a)})}function Ge(e,t=!0,n=!1){A.selected=Math.max(0,Math.min(ne-1,e)),we&&we.lane!==A.selected&&(we=null),t&&tt(A.selected,null,!1,n),zn(),C()}function Jc(e,t,n,a,s=!1){if(!K)return!1;const o=z(e),i=o.sample?H.info(o.sample):void 0,l=o.sample?bp(o,i,D().bpm,t,st.stretchedFor(e),s):null;return l&&(K.port.postMessage({type:"play",pad:e,hit:l,hold:n,manual:!0,toggle:a}),a&&Ce.has(e)?Ce.stopped(e):Ce.posted(e,aw(l,i?.sampleRate??48e3),performance.now())),!0}async function tt(e,t=null,n=!1,a=!1,s=!1){F?.state==="running"&&Jc(e,t,n,a,s)||!await ge()||!F||!K||(F.state!=="running"&&await F.resume().catch(()=>{}),Jc(e,t,n,a,s))}let ss=dv();const en=new Map;function La(e){return e.kind?{kind:e.kind,bpm:e.bpm}:e.origin==="local"?Cr(e.title):{kind:"",bpm:0}}function Gs(e,t){en.delete(e);const n=z(e),a=n.sample?H.info(n.sample):void 0;if(!ss||!t||!n.sample||!a)return;const s=lv(a.frames/a.sampleRate,t,D().bpm,Tr);s&&(en.set(e,{sample:n.sample,fit:s,before:{fit:n.fit,keepPitch:n.keepPitch}}),n.fit=s.bars,n.keepPitch=!0)}function yk(e){const t=en.get(e);$p(t,z(e))&&(en.delete(e),Be(n=>pv(t,n),e),O=`Fit undone: ${Fe(e)} plays as recorded.`,C())}async function an(e,t,n,a,s=!0,o=null,i=null,l=null,c=0,d=null){const{sample:u,saved:h}=await H.put(t,n);await mt(u.hash),se(()=>{const p=z(e);p.sample=u.hash,p.provenance=o,p.rights=d,p.normalize=l?{...l}:null,p.offsetDb=c,p.name=a.slice(0,24)||`Pad ${e+1}`,p.start=0,p.end=1,p.slices=0,p.cuts=[],p.fit=0,p.keepPitch=!0,p.follow=null,p.note=0,Gs(e,i)}),O=h?"":"Kept until you reload: this browser has no file storage here.",it(),s&&tt(e)}async function qr(e,t=A.selected){if(/\.json$/i.test(e.name)||e.type==="application/json"){await Hk(e);return}if(!await ge()||!F)return;let n;try{n=await F.decodeAudioData(await e.arrayBuffer())}catch{O=`Couldn't read ${e.name}: not an audio file this browser can decode.`,C();return}const{data:a,trimmed:s}=Pp(n);await an(t,a,n.sampleRate,e.name.replace(/\.[^.]+$/,""),!0,null,Cr(e.name),Mn(a,n.sampleRate)),s&&(O=`${e.name} was cut to its first minute.`,C())}const _r=new Set;let Ne=null;function Fe(e,t=z(e).name){const n=`Pad ${e+1}`;return t===n?n:`${n} (${t})`}async function Hr(e,t,n=""){return z(e).sample?Od({title:`Replace ${Fe(e)}?`,body:t==="Grab"?"Grab replaces its sound, its slices and that lane's steps. Undo brings them back.":t==="Sent"?`${n} replaces its sound, its slices and that lane's steps. Undo brings them back.`:"The take replaces its sound, its slices and that lane's steps when it lands. Undo brings them back.",confirmLabel:"Replace",cancelLabel:"Cancel"}):!0}function Pe(e){const t=kr(A,e);return t.pad.sample&&_r.add(t.pad.sample),t}function Ie(e,t,n){jr();const a=Array.isArray(e)?e:[e],s=a[0],o=Pb({message:n??(s?.pad.sample?`${t}: replaced ${Fe(s.index,s.pad.name)}.`:`${t} onto Pad ${(s?.index??0)+1}.`),actionLabel:"Undo",onAction:()=>void Wr(),onClose:()=>{Ne&&(Ne.toast=null)}}),i=o.el.querySelector("button");i instanceof HTMLElement&&U(i,q("grab-undo"),i),Ne={before:a,what:t,toast:o};for(const l of a)l.pad.sample&&_r.delete(l.pad.sample)}function jr(e=!0){if(!Ne)return!1;const t=Ne;return Ne=null,t.toast?.close(),e&&it(),!0}async function Wr(){const e=Ne;if(!e)return!1;Ne=null,e.toast?.close();for(const n of e.before)n.pad.sample&&await mt(n.pad.sample);se(()=>{for(const n of e.before)v0(A,n)}),we&&e.before.some(n=>n.index===we?.lane)&&(we=null);const t=e.before[0];return O=e.before.length===1&&t?`Undone: ${Fe(t.index)} is back as it was.`:`Undone: pads ${e.before.map(n=>n.index+1).join(", ")} are back as they were.`,it(),C(),!0}let Bo=null;function Zp(){return Bo??=fetch(Vb,{mode:"cors"}).then(e=>{if(!e.ok)throw new Error(`Library: HTTP ${e.status}`);return e.json()}).then(e=>Zb(e)).catch(e=>{throw Bo=null,e}),Bo}const Vs=new Fx;Vs.restore();const eh=e=>`${e.id}#${e.sha256}`,Kn=new Map;function vk(e){const t=eh(e);let n=Kn.get(t);return!n&&e.origin==="local"&&(n=Vs.bytes(e),n.catch(()=>Kn.delete(t)),Kn.set(t,n)),n||(n=(async()=>{const a=await fetch(e.audio,{mode:"cors"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const s=await a.arrayBuffer(),o=new Uint8Array(await crypto.subtle.digest("SHA-256",s));if(Array.from(o,l=>l.toString(16).padStart(2,"0")).join("")!==e.sha256)throw new Error("the file isn't the one the Library lists");return s})(),n.catch(()=>Kn.delete(t)),Kn.set(t,n)),n}const Ro=new Map;async function th(e){if(!await ge()||!F)throw new Error("NYX's audio didn't start");const t=F,n=eh(e);let a=Ro.get(n);return a||(a=vk(e).then(s=>t.decodeAudioData(s.slice(0))),a.catch(()=>Ro.delete(n)),Ro.set(n,a)),a}const nh=e=>10**(e/20);async function ah(e){return qi(await th(e),e)}function qi(e,t){const{data:n}=Pp(e),a=nh(t.measures.gain);for(const s of n)for(let o=0;o<s.length;o++)s[o]=(s[o]??0)*a;return{data:n,rate:e.sampleRate}}let kn=null;function sh(){const e=kn;kn=null;try{e?.src.stop()}catch{}}async function oh(e){sh();let t;try{t=await th(e)}catch(o){Yr(`Couldn't play ${e.title}: ${o.message}.`);return}if(!F||!Zt)return;F.state!=="running"&&await F.resume().catch(()=>{});const n=new AudioBufferSourceNode(F,{buffer:t}),a=new GainNode(F,{gain:nh(e.measures.gain)*Dy});n.connect(a).connect(Zt);const s={src:n,id:e.id};kn=s,await new Promise(o=>{n.onended=()=>{a.disconnect(),kn===s&&(kn=null),o()},n.start()})}function Yr(e){O=e,C()}async function Qs(e,t,n=A.selected){let a;try{a=await ah(e)}catch(o){return Yr(`Couldn't load ${e.title}: ${o.message}.`),!1}const s=Pe(n);return await an(n,a.data,a.rate,An(e.title),!0,Rs(e,t),La(e),ky),O=`${e.title} on Pad ${n+1}: ${e.creator}, ${pr(e.license,e.licenseStatus,e.permission)}${Hu(e)?" (personal use)":""}.`,Ie(s,"Library"),C(),!0}async function wk(e,t){if(!await ge())return!1;const n=await Promise.all(e.map(l=>ah(l.sound).then(c=>({ok:!0,...c}),c=>({ok:!1,error:`${l.sound.title}: ${c.message}`})))),a=n.flatMap(l=>l.ok?[]:[l.error]);if(a.length)return Yr(`The kit couldn't load (${a.join("; ")}). The pads are as they were.`),!1;const s=[];for(const l of n){if(!l.ok)continue;const c=await H.put(l.data,l.rate);await mt(c.sample.hash),s.push(c)}for(let l=0;l<e.length;l++)Pe(l);let o=[];se(()=>{o=_s(A,e.map((l,c)=>({sample:s[c]?.sample.hash??"",name:An(l.sound.title),provenance:Rs(l.sound,t),hat:l.slot.role==="hat"}))),e.forEach((l,c)=>Gs(c,La(l.sound)))});const i=e.flatMap(l=>l.note?[l.note]:[]);return O=`Kit on pads 1–${e.length}${t.trim()?` for "${t.trim()}"`:""}; the pattern stays.${i.length?` ${i.join(" ")}`:""}${s.some(l=>!l.saved)?" Kept until you reload: this browser has no file storage here.":""}`,Ie(o,"Build kit",`Build kit: pads 1–${e.length} replaced.`),it(),C(),!0}async function xk(e,t){const n=[];for(const c of e){const d=await H.put(c.data,c.rate);await mt(d.sample.hash),n.push(d)}if(t)for(let c=0;c<ne;c++)Pe(c);else for(const c of e)Pe(c.index);const a=e.map((c,d)=>({index:c.index,sample:n[d]?.sample.hash??"",name:An(c.sound.title),provenance:Rs(c.sound,""),hat:!1}));let s=[];se(()=>{s=t?w0(A,a):_s(A,a);for(const c of e)Gs(c.index,La(c.sound))});const o=e.map(c=>c.index+1).join(", "),i=t&&s.some(c=>c.pad.sample),l=n.some(c=>!c.saved)?" Kept until you reload: this browser has no file storage here.":"";O=i?`From the sample picker: everything replaced, pad${e.length===1?"":"s"} ${o} loaded; the pattern stays.${l}`:`From the sample picker: pad${e.length===1?"":"s"} ${o}; the pattern stays.${l}`,Ie(s,"Sample picker",i?"Sample picker: replaced everything in NYX.":`Sample picker: pad${e.length===1?"":"s"} ${o} loaded.`),it(),C()}async function kk(e,t){const n=await H.put(e.data,e.rate);await mt(n.sample.hash),Pe(e.index);let a=[];se(()=>{a=_s(A,[{index:e.index,sample:n.sample.hash,name:An(e.sound.title),provenance:Rs(e.sound,""),hat:!1}]),Gs(e.index,La(e.sound))});const s=a[0];s&&ya.record(t,{index:e.index,before:s.pad,after:n.sample.hash}),O=`From the sample picker: pad ${e.index+1}; the pattern stays.${n.saved?"":" Kept until you reload: this browser has no file storage here."}`,Ie(a,"Sample picker",`Sample picker: pad ${e.index+1} ← ${An(e.sound.title)}.`),it(),C()}async function $k(e){const t=ya.get(e),n=Xx(t,t?z(t.index).sample??"":null);return n||!t?{ok:!1,placed:[],left:[],message:n??""}:(t.before.sample&&await mt(t.before.sample),se(()=>{A.pads[t.index]=structuredClone(t.before)}),ya.drop(e),O=`Undone: ${Fe(t.index)} is back as it was.`,it(),C(),{ok:!0,placed:[],left:[],message:`Undone: pad ${t.index+1} is back as it was.`})}function Sk(e,t){const n=e-1,a=z(n);if(!a.sample)return{ok:!1,placed:[],left:[],message:`Pad ${e} is already empty.`};const s=structuredClone(a),o=Fe(n,a.name);return Ca(n)?(t&&ya.record(t,{index:n,before:s,after:""}),O=`From the sample picker: ${o} removed from pad ${e}; its steps stay.`,C(),{ok:!0,placed:[],left:[],message:`Removed ${o} from pad ${e}.`}):{ok:!1,placed:[],left:[],message:`Pad ${e} wasn't removed.`}}let Zc="";function Ur(){const e=Ce.pads().join(",");e!==Zc&&(Zc=e,rh?.update(),lh?.changed())}async function Ek(e){const t=e-1;if(!z(t).sample)return{ok:!1,placed:[],left:[],message:`Pad ${e} is empty.`};const n=Ce.has(t);return!await Promise.race([tt(t,null,!1,!0).then(()=>!0),new Promise(s=>setTimeout(()=>s(!1),1500))])||F?.state!=="running"?{ok:!1,placed:[],left:[],message:"NYX's sound isn't on yet: click anywhere in the Studio tab once, then try again."}:(Ur(),{ok:!0,placed:[],left:[],message:n?`Pad ${e} stopped.`:`Pad ${e} plays.`})}async function Ak(e){const t=e===0?Ce.pads():[e-1];for(const n of t)K?.port.postMessage({type:"halt",pad:n}),Ce.stopped(n);return Ur(),C(),{ok:!0,placed:[],left:[],message:e===0?"Stopped.":`Pad ${e} stopped.`}}const Xn=new Map;function Mk(e){if(!e.sample)return"";const t=`${e.sample}:${e.start}:${e.end}`,n=Xn.get(t);if(n!==void 0)return n;const a=Wx(Kp(e));return a&&Xn.set(t,a),Xn.size>64&&Xn.delete(Xn.keys().next().value),a}const ih={pads:()=>A.pads.map((e,t)=>{const n=Ye(t);return{pad:t+1,name:e.name,filled:!!e.sample,fp:e.sample?e.provenance?.sha256??"":"",sid:e.sample?e.provenance?.id??"":"",wave:Mk(e),used:n.steps.slice(0,n.length).some(a=>a.on),playing:!!e.sample&&Ce.has(t)}}),receivePad:(e,t,n)=>Ux(e,t,n,{decode:async(a,s)=>{if(!await ge()||!F)throw new Error("NYX's audio didn't start");return qi(await F.decodeAudioData(s),a)},place:kk}),undo:$k,play:Ek,stop:Ak,remove:async(e,t)=>Sk(e,t),receive:(e,t,n)=>qx(e,t,n,{filled:()=>Array.from({length:ne},(a,s)=>!!A.pads[s]?.sample),padName:a=>z(a).name,ask:a=>(J?.reveal?.(),Od({...a,confirmLabel:"Load",cancelLabel:"Cancel"})),decode:async(a,s)=>{if(!await ge()||!F)throw new Error("NYX's audio didn't start");return qi(await F.decodeAudioData(s),a)},place:xk}),instrument:async(e,t)=>{J?.reveal?.(),no("instrument");const n=t.map(s=>({path:s.path,file:new File([s.bytes],s.path.slice(s.path.lastIndexOf("/")+1))})),a=e.layers.sent<e.layers.found;return await fe.open(n,{name:e.name,credit:e.credit,note:a?`From the Picker: ${e.layers.sent} of ${e.layers.found} velocity layers (NYX's default detail).`:""}),{ok:!0,placed:[],left:[],message:"NYX opened its key map: check it there, then click Load into NYX."}}},rh=J?null:Qx(window,ih),lh=J?.pickerTarget?.(Jx(ih))??null;function Kr(e){const t=z(e).provenance,n=t?De.catalogFor(t.origin):null;if(!t||!n)return[];const a=new Set(A.pads.flatMap((s,o)=>o!==e&&s.provenance?[s.provenance.id]:[]));return fy(n,t,a).map(s=>s.sound)}const De=new kx({catalog:Zp,target:()=>({index:A.selected,title:Fe(A.selected)}),pads:()=>A.pads,preview:oh,stopPreview:sh,load:(e,t)=>Qs(e,t),chop:(e,t)=>zk(e,t),buildKit:wk,close:()=>Pt(!1),local:Vs}),Js=new fx(typeof Worker>"u"?null:()=>new Worker(new URL("/nyx/assets/chop-worker-CbuieNQN.js",import.meta.url),{type:"module"})),Zs=new Map;async function Lk(){const e=A.selected,t=z(e);if(!t.sample)return null;const n=await H.get(t.sample);if(!n)return null;const a=Math.floor(t.start*n.frames),s=Math.min(n.frames,Math.ceil(t.end*n.frames)),o=Zs.get(e),i=o&&o.sample===t.sample?o:null;return{sample:t.sample,stem:xw(t.name),data:n.data,sampleRate:n.sampleRate,from:a,to:s,pad:e,tempo:gw({seconds:(s-a)/n.sampleRate,fit:t.fit,given:i?.bpm??0,givenFrom:i?.from,name:t.name,studioBpm:D().bpm})}}async function Tk(e,t,n){if(!await ge()||!F||!K)return;F.state!=="running"&&await F.resume().catch(()=>{}),await mt(e.sample);const s={...z(e.pad),start:0,end:1,slices:0,cuts:[],fit:0,tune:0,fine:0,dir:"fwd",mode:"oneshot"},o=bp(s,H.info(e.sample),D().bpm,null);o&&K.port.postMessage({type:"play",pad:e.pad,hit:{...o,from:t,to:n}})}function Ck(e,t,n){const a=H.info(e.sample);if(!a)return;const s=Math.min(t.cuts.length-1,ne-n.first);if(s<1)return;const o=Array.from({length:s},(d,u)=>Pe(n.first+u)),i=z(e.pad),l={provenance:i.provenance?structuredClone(i.provenance):null,rights:i.rights,normalize:i.normalize?{...i.normalize}:null,offsetDb:i.offsetDb,levelDb:i.levelDb,note:i.note},c=n.choke?kw(A.pads,n.first,s):0;se(()=>{$w(A,t,{sample:e.sample,frames:a.frames,sampleRate:e.sampleRate,first:n.first,stem:e.stem,source:l,choke:c,playBack:n.playBack?{bpm:n.bpm}:null});for(let d=0;d<s;d++)en.delete(n.first+d),Zs.delete(n.first+d)}),tn.close(),Ie(o,"Chop",`Chopped ${e.stem} onto pads ${n.first+1}–${n.first+s}.`),Ge(n.first,!1),C()}const tn=new gx({source:Lk,analysis:e=>Js.analysis(e.sample,e.data,e.sampleRate,e.from,e.to),pads:()=>A.pads,audition:(e,t,n)=>void Tk(e,t,n),apply:Ck,close:()=>{tn.close(),C()}});async function Ta(){De.isOpen&&Pt(!1),await tn.open()&&(C(),tn.el.scrollIntoView?.({block:"nearest",behavior:"smooth"}))}function ch(){const e=D();return nn()?e.beatAt(ce()):(F?.currentTime??performance.now()/1e3)*Math.max(1,e.bpm)/60}const Pn=J?Ww(J,e=>{K?.port.postMessage({type:"sig",sig:e})},ch):null;function ed(e){const t=e.sample?H.info(e.sample):void 0;if(!t||e.length==="free"||e.slices||e.fit)return e.end;if(e.length==="hit"){const a=Hs(t.analysis,e.hitSense);if(!a?.length)return e.end;const s=xr(a,e.start*t.frames,1,yr*t.sampleRate);return s===null?1:s/t.frames}const n=Mr(e,t,D().bpm);return Math.min(1,e.start+bs(e.length,D().bpm,t.sampleRate,n)/t.frames)}const Dn=new cw({sample:()=>{const e=A.selected,t=z(e),n=t.sample?H.held(t.sample):void 0;return!t.sample||!n?null:{index:e,pad:t,data:n.data,sampleRate:n.sampleRate,frames:n.data[0]?.length??0}},bpm:()=>D().bpm,beat:ch,signals:()=>Pn?.signals()??wn(),aria:()=>Pn?.source()??null,edit:e=>Be(e),audition:e=>void tt(A.selected,null,!1,!0,e===!0),slicesOff:()=>{const e=A.selected;if(!z(e).slices)return;const t=Pe(e);Be(n=>{n.slices=0,n.cuts=[]},e),Ie(t,"Slices off",`Slices off on ${Fe(e,t.pad.name)}.`),C()},fitOff:()=>{const e=A.selected;if(!z(e).fit)return;const t=Pe(e);Be(n=>{n.fit=0,n.fitSpan=null},e),Ie(t,"Fit off",`Fit to bars off on ${Fe(e,t.pad.name)}.`),C()},playPos:()=>Qt.get(A.selected)??null,hits:()=>{const e=z(A.selected);return e.sample?(Xr(e.sample),Hs(H.info(e.sample)?.analysis,e.hitSense)):null},close:()=>{Dn.close(),C()}});document.body.append(Dn.el);Gp=Dn;const os=new Set;function Xr(e){const t=H.info(e),n=H.held(e);if(!t||!n||t.analysis||os.has(e))return;os.add(e);const a=n.data[0]?.length??0;Js.analysis(e,n.data,n.sampleRate,0,a).then(s=>{const o=H.info(e);o&&(o.analysis=s),zt(),Dn.refresh()}).catch(()=>{}).finally(()=>os.delete(e))}function Nk(e){H.info(e)?.analysis||os.has(e)||setTimeout(()=>Xr(e),0)}async function eo(){const e=Ma();e.sample&&(H.held(e.sample)||await H.get(e.sample),Dn.open()&&C())}function dh(e){const n=!!Ma().sample;for(const a of e.querySelectorAll('.nc-canvas[data-nc-id="wave"]')){const s=a.closest(".nc-field")??a;if(n){a.dataset.nyxRgnOpen!==""&&(a.dataset.nyxRgnOpen="",s.dataset.nyxRgnOpen=""),a.getAttribute("role")!=="button"&&a.setAttribute("role","button"),a.tabIndex!==0&&(a.tabIndex=0);const o=`Edit region of pad ${A.selected+1}`;a.getAttribute("aria-label")!==o&&a.setAttribute("aria-label",o),a.title!=="Edit region"&&(a.title="Edit region")}else a.dataset.nyxRgnOpen===""&&(delete a.dataset.nyxRgnOpen,delete s.dataset.nyxRgnOpen,a.removeAttribute("role"),a.removeAttribute("aria-label"),a.removeAttribute("tabindex"),a.title="")}}function uh(e){return e.target?.closest?.('.nc-canvas[data-nc-id="wave"][data-nyx-rgn-open]')??null}document.addEventListener("click",e=>{uh(e)&&(e.preventDefault(),eo())});document.addEventListener("keydown",e=>{e.key!=="Enter"&&e.key!==" "||e.repeat||!uh(e)||(e.preventDefault(),e.stopImmediatePropagation(),eo())});const _i=[];function Fk(e){const t=Mi*6e4/Math.max(1,D().bpm);for(const[n,a]of e){if(n===void 0||a===void 0)continue;_i.length<2e3&&_i.push([n,a]);const s=Ye(n).length,o=Math.floor(a/Mi+1e-6)%s;for(const i of document.querySelectorAll(`.nc-page [data-nc-step="pad-${n}:${o}"]`)){i.dataset.nyxSkip="";const l=Number(i.dataset.nyxSkipT??0);l&&clearTimeout(l),i.dataset.nyxSkipT=String(setTimeout(()=>{delete i.dataset.nyxSkip,delete i.dataset.nyxSkipT},Math.max(450,t*2)))}}}async function Pk(e){const t=A.selected,n=Pe(t);await yh(e);const a=z(t).sample;a&&(e.bpm>0&&Zs.set(t,{sample:a,bpm:e.bpm,from:"from the take"}),Ie(n,`LUCY take ${e.id}`),await Ta())}async function zk(e,t){const n=A.selected;if(!await Qs(e,t,n))return;const a=z(n).sample,s=La(e);a&&s.bpm>0&&Zs.set(n,{sample:a,bpm:s.bpm,from:"from My samples"}),Pt(!1),await Ta()}function Pt(e=!De.isOpen,t){e?De.open(t):De.closePanel(),C(),e?De.focus():le.querySelector('[data-nc-section="pads"] [data-nc-id="library"]')?.focus()}const te={from:"master",bars:1,busy:!1};async function Gr(){const e=Nt();if(!e||te.busy||!await ge()||!F)return;const t=D();if(!t.running){O="Play first: Grab takes the bars that just played.",C();return}const n=te.bars,a=Math.floor(t.beatAt(ce())/4)*4,s=a-4*n;if(s<0){O=`Grab needs ${n} whole bar${n===1?"":"s"} played first.`,C();return}const o=F.sampleRate,{from:i,to:l}=tx({from:Math.round(Fn(t.timeAt(s))*o),to:Math.round(Fn(t.timeAt(a))*o)},Dp(e,te.from)),c=A.selected;if(te.busy=!0,C(),!await Hr(c,"Grab")){te.busy=!1,C();return}const d=e.takeResult?await e.takeResult(te.from,i,l):{channels:await e.take(te.from,i,l)},u=d.channels;te.busy=!1;const h=e.sources().find(g=>g.id===te.from)?.name??te.from;if(!u){O="reason"in d&&d.reason==="gone"?`Those bars of ${h} are gone (the Studio keeps the last 20 seconds): Grab again.`:`${h} isn't kept that far back yet: let it play ${n} more bar${n===1?"":"s"}, then Grab again.`,C();return}let p=0;for(const g of u)for(const w of g)p=Math.max(p,Math.abs(w));if(p<1e-4){O=`${h} was silent for those ${n===1?"bar":"bars"}.`,C();return}const f=Pe(c);await an(c,u,o,`${h} grab`,!0,null,null,null,-5),n===1?(se(()=>{const g=z(c);g.fit=1,g.keepPitch=!0,g.slices=16,g.cuts=[],g.decay=4;const w=Ye(c);w.length=he;for(const m of w.steps)Object.assign(m,Ea(),{on:!0})}),O=`Grabbed a bar of ${h}: 16 slices, every step on. Move, mute or lock steps to remix it.`):(Be(g=>{g.fit=n,g.keepPitch=!0},c),await Hi(8,"transients",c),O=`Grabbed ${n} bars of ${h}, fitted to ${n} bars and sliced at the hits.`),Ie(f,`Grabbed ${n===1?"a bar":`${n} bars`}`),C()}const td=240,Ok=.25,N={phase:"idle",startBeat:0,pad:0,source:"master",rec:null,timer:0,lastBar:0,lastBarFrame:0,fromFrame:0,latency:0,bpm:120,warned:!1,label:""};function Vr(e){const t=Math.floor(e/4)*4;return e-t<Ok?t:t+4}function Dk(e){const t=F?.sampleRate??48e3;return Math.round(Fn(D().timeAt(e))*t)}function ph(e){const t=F?.sampleRate??48e3;return N.fromFrame+Math.round((e-N.startBeat)*60/N.bpm*t)}function Ts(e=N.source){return Nt()?.sources().find(t=>t.id===e)?.name??e}function Qr(){N.phase==="idle"?Bk():N.phase==="armed"?(N.phase="idle",O="",C()):N.phase==="rec"&&Jr()}async function Bk(){const e=Nt();if(!e?.record){O="Take needs the Studio (reload it to update).",C();return}if(!await ge()||!F)return;const t=A.selected;if(await Hr(t,"Take")&&N.phase==="idle"){if(N.source=te.from,N.pad=t,e.listen(N.source),!D().running){N.phase="armed",O="Take armed: starts with the music.",C();return}hh()}}function hh(){const e=Nt();if(!e?.record||!F){N.phase="idle";return}const t=D();N.startBeat=Math.max(0,Vr(t.beatAt(ce()))),N.fromFrame=Dk(N.startBeat),N.bpm=t.bpm,N.latency=Dp(e,N.source);const n=e.record(N.source,N.fromFrame+N.latency);if(!n){N.phase="idle",O=`${Ts()} can't be recorded.`,C();return}N.rec=n,N.phase="rec",N.warned=!1,N.lastBar=N.startBeat,N.lastBarFrame=N.fromFrame,O=`Taking ${Ts()}: stop on any bar.`,window.clearInterval(N.timer),N.timer=window.setInterval(Rk,200),C()}function Rk(){if(N.phase!=="rec")return;const e=D();if(!e.running)return;const t=e.beatAt(ce()),n=Math.floor(t/4)*4;n>N.lastBar&&(N.lastBar=n,N.lastBarFrame=ph(n));const a=240/Math.max(1,e.bpm),s=(Math.max(N.startBeat+4,Vr(t))-N.startBeat)*60/Math.max(1,e.bpm);if(s+a>td){Jr();return}!N.warned&&s>td-30&&(N.warned=!0,O="Take stops at four minutes: about 30 seconds left.");const o=fh();o!==N.label&&(N.label=o,C())}function fh(){if(N.phase==="armed")return"Armed: waits for Play";if(N.phase==="saving")return"Saving take…";if(N.phase!=="rec")return"Take";const e=D().beatAt(ce());return e<N.startBeat?"Starts on the bar…":`Stop take · bar ${Math.floor((e-N.startBeat)/4)+1}`}async function Jr(e=!1){const t=N.rec;if(N.phase!=="rec"||!t)return;window.clearInterval(N.timer);let n,a;e?(n=N.lastBar,a=N.lastBarFrame):(n=Math.max(N.startBeat+4,Vr(D().beatAt(ce()))),a=ph(n));const s=Math.round((n-N.startBeat)/4);if(N.rec=null,s<1){t.cancel(),N.phase="idle",O="The music stopped before a whole bar was taken.",C();return}N.phase="saving",C();try{await Ik(t,a,s,n)}finally{N.phase="idle",C()}}async function Ik(e,t,n,a){let s=null;try{s=await e.stop(t+N.latency)}catch(l){console.error("NYX take",l)}const o=Ts();if(!s?.[0]?.length){O=`The take from ${o} came back empty.`,C();return}let i=0;for(const l of s)for(const c of l)i=Math.max(i,Math.abs(c));if(i<1e-4){O=`${o} was silent for the whole take.`,C();return}try{await qk(s,n,a,o)}catch(l){console.error("NYX take",l),O=`The take from ${o} couldn't be kept (${l instanceof Error?l.message:String(l)}).`,C()}}async function qk(e,t,n,a){const s=N.pad,o=`${a} take`.slice(0,20),i=A.pads.filter(d=>d.name.startsWith(o)).length+1,l=Pe(s);await mh(s,e,F?.sampleRate??48e3,t,Math.round(N.startBeat/4),{name:`${o} ${i}`,endBeat:n,offsetDb:-5}),Ie(l,`Took ${t===1?"a bar":`${t} bars`}`),O=t<=fa?`${t} bar${t===1?"":"s"} of ${a} on ${z(s).name}: it loops every ${t===1?"bar":`${t} bars`}. Tap the pad to play it any time.`:`${t} bars of ${a} on ${z(s).name}. Longer than ${fa} bars, so it plays from the pad (tap or hold it), not the grid.`,C()}async function mh(e,t,n,a,s,o){await an(e,t,n,o.name,!1,null,null,o.normalize??null,o.offsetDb??0,o.rights??null);const i=a<=fa;se(()=>x0(A,e,a,s));const l=D(),c=o.endBeat;if(c!==void 0&&i&&l.running&&K&&F){const d=z(e),u=Ye(e).steps[0],h=u?Us(d,0,u,H.info(d.sample??""),l.bpm,!1,st.stretchedFor(e)):null,f=l.beatAt(ce()+Ir)-c;if(h&&f>0&&f<4*a){const g=Math.round(f*60/l.bpm*n*h.rate);h.from+g<h.to-1&&K.port.postMessage({type:"play",pad:e,hit:{...h,from:h.from+g,attack:.005}})}}}let Io=!1;function gh(){return A.pads.map((e,t)=>({id:String(t+1),name:Fe(t),...e.sample?{filled:!0}:{}}))}async function bh(e,t){const n=k0(t,A.pads.length);if(n<0)return{ok:!1,reason:"refused",message:`NYX has no pad ${t}.`};if(Io||N.phase!=="idle"&&N.pad===n)return{ok:!1,reason:"busy",message:`Pad ${n+1} is busy: try again in a moment.`};if(!await ge()||!F)return{ok:!1,reason:"refused",message:"NYX's audio didn't start."};Io=!0;try{const a=`${e.fromName}'s ${e.name}`;if(Ge(n,!1),J?.reveal?.(),C(),z(n).sample&&!await Hr(n,"Sent",a))return O=`Kept ${Fe(n)}: ${a} was not placed.`,C(),{ok:!1,reason:"cancelled"};const s=e.channels.map(d=>new Float32Array(d)),o=e.bars,i=Pe(n),l=e.name.slice(0,24),c=e.rights==="unknown"?"unknown":null;return o!==void 0&&Number.isInteger(o)&&o>=1?(await mh(n,s,e.sampleRate,o,0,{name:l,normalize:Mn(s,e.sampleRate),rights:c}),O=o<=fa?`${a} on Pad ${n+1}: fitted to ${o===1?"a bar":`${o} bars`}, it loops every ${o===1?"bar":`${o} bars`}.`:`${a} on Pad ${n+1}: ${o} bars, so it plays from the pad, not the grid.`):(await an(n,s,e.sampleRate,l,!1,null,null,Mn(s,e.sampleRate),0,c),O=`${a} on Pad ${n+1}.`),Ie(i,a),C(),{ok:!0,target:t,targetName:Fe(n)}}finally{Io=!1}}async function yh(e){const t=await Tw(e);if(!t){O=`LUCY take ${e.id} could not be read.`,C();return}await an(A.selected,t,e.sampleRate,`LUCY take ${e.id}`,!0,null,null,Mn(t,e.sampleRate),0,e.rights)}function Ca(e=A.selected){const t=z(e);if(!t.sample)return!1;const n=t.sample;K?.port.postMessage({type:"silence",pad:e});const a=Pe(e);return se(()=>{A.pads[e]=ot(e)}),we?.lane===e&&(we=null),A.pads.some(s=>s.sample===n)||(K?.port.postMessage({type:"drop",hash:n}),Ri.delete(n)),Ie(a,"Remove",`Removed ${Fe(e,a.pad.name)}.`),O="",C(),!0}async function Hi(e,t,n=A.selected){const a=z(n);let s=[];if(e&&t==="transients"&&a.sample){const o=await H.get(a.sample);if(o){const i=Math.floor(a.start*o.frames),l=Math.min(o.frames,Math.ceil(a.end*o.frames));s=mw(await Js.analysis(a.sample,o.data,o.sampleRate,i,l),e)}}Be(o=>{o.slices=e,o.cuts=s},n)}function Zr(e,t,n=!0){const a=Si[e]??String(e+1);if(jr(),t==="store")A.slots[e]=$r(A),A.active=e,Nn=!1,jt=`Stored in ${a}`;else if(t==="clear")A.slots[e]=null,A.active===e&&(A.active=null),jt=`Cleared ${a}`,it();else{const s=A.slots[e];if(!s){jt=`${a} is empty: Shift-click or long-press to store`,C();return}vh(s),A.active=e,Nn=!1,jt=`Recalled ${a}`,n&&at?.slot(e)}zn(),zt(),Jp(),C()}function vh(e){const t=structuredClone(e);A.pads=t.pads,A.lanes=t.lanes,A.swing=t.swing,A.hacks=t.hacks,we=null;for(const n of ma(A))mt(n).then(()=>zt())}async function to(){await ge(),F&&F.state!=="running"&&await F.resume().catch(()=>{});const e=vv({embedded:J!==null,running:nn(),sittingOut:Xe,instanceId:Xs(Aa,Re)});if(e.action==="sit-out"||e.action==="rejoin"){if(Xe=e.action==="sit-out",e.action==="rejoin"){const t=D();Ft=t.nextBar(t.beatAt(ce()+Ir))}On(!0),C(),e.action==="sit-out"&&Cn()?.out?.(e.outId);return}if(e.action==="stop"){ht.stop({at:ce()});return}Xe=!1,Ft=0,e.claimId&&Cn()?.claim(e.claimId),ht.play({at:ce()})}let nd=D().running;ht.onChange(()=>{D().running&&!nd&&J&&(Xe=!cx(Aa,Re)),nd=D().running,D().running&&N.phase==="armed"&&hh(),!D().running&&N.phase==="rec"&&Jr(!0),D().running||(Xe=!1,Ft=0),zt(),On(!0),C()});Cn()?.member?.(Xs(Aa,Re),()=>D().running&&!Xe);Cn()?.onAll(()=>{if(Xe){if(Xe=!1,nn()){const e=D();Ft=e.nextBar(e.beatAt(ce()+Ir))}On(!0),C()}});function _k(){const e=_p(A),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=`nyx${Re>1?`-${Re}`:""}-pattern-${new Date().toISOString().slice(0,10)}.json`,n.hidden=!0,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e4)}async function Hk(e){let t;try{t=JSON.parse(await e.text()),Hp(t)}catch{O=`Couldn't read ${e.name}: not a NYX pattern.`,C();return}await wh(t,`Loaded ${e.name}.`)}async function wh(e,t){const n=Hp(e),a=tk(e),s=nk(e);fe.releaseAll(),s.inst&&(A.inst=s.inst),A.mode=s.inst||A.mode==="pads"?s.mode:A.mode,ka(),se(()=>{a&&(A.slots=a.slots,A.active=a.active),vh(n)}),a&&(Nn=A.active!==null&&JSON.stringify($r(A))!==JSON.stringify(A.slots[A.active])),jt="";const o=[],i=new Set;for(const c of A.pads)c.sample&&!await H.get(c.sample)&&o.push(c.name);for(const c of A.slots)for(const d of c?.pads??[])d.sample&&!A.pads.some(u=>u.sample===d.sample)&&i.add(d.sample);let l=0;for(const c of i)await H.get(c)||l++;O=o.length?`Loaded. ${o.length===1?"One pad needs its":`${o.length} pads need their`} sample again (${o.join(", ")}): samples stay in the browser they were loaded in.`:l?`${t} ${l===1?"One sample":`${l} samples`} in the slots ${l===1?"isn't":"aren't"} in this browser: samples stay in the browser they were loaded in.`:t,zt(),C()}function jk(){K?.port.postMessage({type:"stop"}),nn()&&(J?(Xe=!0,Cn()?.out?.(Xs(Aa,Re))):ht.stop({at:ce()})),On(!0),We?.clear({fadeMs:20}),C()}function Wk(e){A.master=Math.min(1,Math.max(0,e)),zn(),Zt&&F&&Zt.gain.setTargetAtTime(A.master,F.currentTime,.01),wa.value=String(A.master),el.textContent=`${Math.round(A.master*100)}%`}const re=(e,t={},...n)=>{const a=document.createElement(e);for(const[s,o]of Object.entries(t))a.setAttribute(s,o);return a.append(...n),a},Bn=document.getElementById("app");Qv(Bn);Bn.classList.add("nc","nc-page");Db();const xh=re("header",{class:"nc-page-hd"},re("div",{},re("h1",{class:"nc-page-title",...bv("page:title")},re("span",{style:"color: var(--nc-ui-instrument-nyx)"},"NYX")," ",re("span",{class:"nc-page-sep"},"/")," SAMPLER ",re("span",{class:"nc-page-sep"},"/")," ",re("span",{class:"nc-mono"},String(Re).padStart(2,"0"))),re("p",{class:"nc-page-sub"},"A NetComposer element."))),wa=re("input",{type:"range",class:"nc-range",id:"nyx-master",min:"0",max:"1",step:"0.01",value:String(A.master),"data-nc-id":"nyx-master"});wa.addEventListener("input",()=>Wk(Number(wa.value)));const el=re("span",{class:"nc-readout","data-nc-readout":""});el.textContent=`${Math.round(A.master*100)}%`;const ad="audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.aif,.aiff,.webm",Kt=re("input",{type:"file"});Kt.hidden=!0;let sd="pad";Kt.addEventListener("change",()=>{const e=Kt.files?.[0];Kt.value="",e&&qr(e)});function tl(e){sd=e,Kt.accept=sd==="pad"?ad:`${ad},.json,application/json`,Kt.click()}const ji=(e,t)=>{const n=re("button",{type:"button",class:"nc-page-action","data-nyx-action":e.toLowerCase()},e);return U(n,q(`page:${e.toLowerCase()}`),n),n.addEventListener("click",t),n},kh=re("label",{class:"nc-label",for:"nyx-master"},"Master");U(kh,q("page:master"),wa);const od=_b({panel:re("div",{},re("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},kh,wa,el),ji("Save",_k),ji("Load",()=>tl("any")))}),xa=re("div",{class:"nyx-mode",role:"group","aria-label":"Mode","data-nyx-mode-switch":""});for(const[e,t]of[["pads","Pads"],["instrument","Instrument"]]){const n=re("button",{type:"button",class:"nyx-mode-b","data-nyx-mode":e},t);n.addEventListener("click",()=>no(e)),xa.append(n)}U(xa,q("page:mode"),xa);xh.append(re("div",{class:"nc-page-actions"},xa,od.panel,ji("Panic",jk),od.button,Kt));const le=re("div",{class:"nc-stack","data-nc-layout":"adjacent"});Bn.append(xh,re("main",{class:"nc-page-body"},fe.panel,le));let id=Bp(Yt);function ka(){const e=A.mode==="instrument";document.documentElement.toggleAttribute("data-nyx-instrument",e);for(const t of xa.querySelectorAll("[data-nyx-mode]"))t.setAttribute("aria-pressed",String(t.dataset.nyxMode===A.mode));fe.panel.hidden=!e,id(),id=Bp(e?Mv:Yt),e&&fe.refresh()}function no(e){if(A.mode===e){ka();return}fe.releaseAll(),A.mode=e,zn(),ka(),C()}ka();Bn.addEventListener("drop",e=>{A.mode!=="instrument"||!e.dataTransfer?.files?.length||(e.preventDefault(),e.stopImmediatePropagation(),Lp(e.dataTransfer).then(t=>{t.length&&fe.open(t)}))},!0);Bn.addEventListener("dragover",e=>{e.dataTransfer?.types.includes("Files")&&e.preventDefault()});Bn.addEventListener("drop",e=>{const t=e.dataTransfer?.files?.[0];t&&(e.preventDefault(),qr(t))});function rd(e){return Math.abs(e)<.01?"C":`${e<0?"L":"R"}${Math.round(Math.abs(e)*100)}`}function $h(){return nn()?Xe?"Sitting out":D().beatAt(ce())<Ft?"Joining on the next bar":"Playing":A.pads.some(t=>t.sample)?"Stopped":"Load a sample to start"}function Yk(e){if(e==="always")return"Always";if(e==="fill")return"Only in Fill";if(e==="!fill")return"Not in Fill";if(e==="pre")return"If the last one played";if(e==="!pre")return"If the last one didn't";const[t,n]=e.split(":");return`Pass ${t} of every ${n}`}const Sh=[{mode:"repeat16",label:"1/16",title:"Repeat the last 16th while held"},{mode:"repeat8",label:"1/8",title:"Repeat the last 8th while held"},{mode:"reverse",label:"Rev",title:"Play what just happened backwards while held"},{mode:"half",label:"Half",title:"Half speed while held"},{mode:"stop",label:"Stop",title:"Slow to a halt like a tape machine while held"}],$a={fill:!1,perform:null};function Cs(e){$a.fill!==e&&($a.fill=e,K?.port.postMessage({type:"fill",on:e}),C())}function Wi(e){$a.perform!==e&&($a.perform=e,K?.port.postMessage({type:"perform",mode:e}),C())}function Uk(e){const t=s=>{const i=(s.target instanceof Element?s.target:null)?.closest('[data-nc-id="perform"] [data-nc-choice]'),l=i instanceof HTMLElement?i.dataset.ncChoice:void 0;return Sh.some(c=>c.mode===l)?l:null},n=s=>{ge(),s==="fill"?Cs(!0):Wi(s)},a=()=>{Cs(!1),Wi(null)};e.addEventListener("pointerdown",s=>{const o=t(s);if(!o)return;s.preventDefault(),n(o);const i=()=>{a(),window.removeEventListener("pointerup",i),window.removeEventListener("pointercancel",i)};window.addEventListener("pointerup",i),window.addEventListener("pointercancel",i)}),e.addEventListener("keydown",s=>{if((s.key===" "||s.key==="Enter")&&!s.repeat){const o=t(s);if(!o)return;s.preventDefault(),n(o)}}),e.addEventListener("keyup",s=>{(s.key===" "||s.key==="Enter")&&t(s)&&a()}),window.addEventListener("blur",a)}function Kk(){return{id:"transport",title:"Transport",status:jt,controls:[{type:"button",id:"play",label:Fr(Jt()),on:Jt(),onPress:()=>void to()},{type:"label",id:"perform-label",text:"Hold to play"},{type:"choice",id:"perform",label:"Hold",value:$a.perform??"",options:Sh.map(e=>({value:e.mode,label:e.label})),onChange:()=>{}},...J?[]:[{type:"slider",id:"tempo",label:"Tempo",min:40,max:240,step:1,value:Math.round(D().bpm),valueText:`${Math.round(D().bpm)} BPM`,onChange:e=>{ht.setTempo({bpm:e}),C()}}],{type:"group",id:"transport-more",title:"Swing",collapse:"phone",summary:ut(A.swing),controls:[{type:"slider",id:"swing",label:"Swing",min:.5,max:.75,step:.01,value:A.swing,valueText:ut(A.swing),onChange:e=>se(()=>{A.swing=e})}]},{type:"readout",id:"status",label:"Status",value:$h()},{type:"group",id:ow,title:"Presets",summary:iw(A.slots.map(e=>e!=null),A.active??null,Si),controls:[{type:"slotRow",id:"slots",morph:0,morphText:"",slots:Si.map((e,t)=>({label:e,filled:A.slots[t]!=null,active:A.active===t,edited:A.active===t&&Nn})),onMorph:()=>{},onSlot:(e,t)=>Zr(e,t)}]}]}}function Eh(){if(!Jt())return-1;const e=D().beatAt(ce());return e<0||e<Ft?-1:Math.floor(e/Mi)%he}function Xk(){const e=Ma(),t=Eh();return{id:"pattern",title:"Pattern",lead:!0,summary:`${A.lanes.filter(n=>n.steps.some(a=>a.on)).length} lanes · ${e.name}`,sections:[{id:"grid",controls:[{type:"stepGrid",id:"grid",playhead:t,selectedRow:`pad-${A.selected}`,rows:A.lanes.map((n,a)=>({id:`pad-${a}`,label:z(a).name,length:n.length,lane:a%4+1,mute:n.mute,solo:n.solo,steps:n.steps.map(s=>({on:s.on,accent:s.accent,velocity:s.velocity,dim:!z(a).sample,...h0(s,n.length)}))})),onToggle:(n,a,s)=>Ls(n,a,o=>{s?(o.accent=o.on?!o.accent:!0,o.on=!0):(o.on=!o.on,o.on||(o.accent=!1))}),onSet:(n,a,s,o)=>Ls(n,a,i=>{s==="on"?(i.on=o,o||(i.accent=!1)):(i.accent=o,o&&(i.on=!0))}),onSelectRow:n=>Ge(n,!0,!0),onLongPress:(n,a)=>{we={lane:n,step:a},Ge(n,!1)},onMute:n=>se(()=>{Ye(n).mute=!Ye(n).mute}),onSolo:n=>se(()=>{Ye(n).solo=!Ye(n).solo}),onLength:(n,a)=>se(()=>{Ye(n).length=Math.max(1,Math.min(he,a))}),transport:{playing:Jt(),label:Fr(Jt()),onToggle:()=>void to()},onFill:n=>Cs(n),onClear:()=>gk(),clearLabel:ia?"Undo":"Clear"},{type:"note",id:"grid-help",text:"Tap a name to hear it. Long-press a step for its locks."}]},{id:"pads",title:"Pad",controls:[{type:"padGrid",id:"pads",label:"Pads",columns:4,selected:A.selected,pads:A.pads.map((n,a)=>({label:n.name,empty:!n.sample,peaks:Kp(n),lane:a%4+1,playing:Qt.has(a),badge:n.choke?Fs[n.choke-1]:void 0,badgeLabel:n.choke?`choke group ${Fs[n.choke-1]}`:void 0,hint:Ue?.route()&&ha(n)?"tuned · CALLIOPE":void 0})),onDown:n=>Qk(n),onPress:n=>Jk(n),onFile:(n,a)=>{Ge(n,!1),qr(a,n)},onMove:(n,a,s)=>Zk(n,a,s),menu:n=>t1(n),onMenu:(n,a)=>void n1(n,a),onRename:(n,a)=>e1(n,a)},{type:"button",id:"library",label:"Library",on:!1,onPress:()=>Pt()}]}]}}function Gk(e){if(!we||we.lane!==A.selected)return[];const{lane:t,step:n}=we,a=Ye(t).steps[n];if(!a)return[];const s=o=>Ls(t,n,o);return[{type:"label",id:"lock-label",text:`Step ${n+1}`},{type:"slider",id:"lock-velocity",label:"Velocity",min:0,max:1,step:.01,value:a.velocity,valueText:ut(a.velocity),onChange:o=>s(i=>{i.velocity=o})},{type:"slider",id:"lock-chance",label:"Chance",min:0,max:1,step:.05,value:a.chance,valueText:ut(a.chance),onChange:o=>s(i=>{i.chance=o})},...e.slices?[{type:"select",id:"lock-slice",label:"Slice",value:a.slice===null?"auto":String(a.slice),options:[{value:"auto",label:`In order (${n%e.slices+1})`},...Array.from({length:e.slices},(o,i)=>({value:String(i),label:`Slice ${i+1}`}))],onChange:o=>s(i=>{i.slice=o==="auto"?null:Number(o)})}]:[],{type:"slider",id:"lock-pitch",label:"Pitch",min:-12,max:12,step:1,value:a.pitch,valueText:ba(a.pitch," st"),onChange:o=>s(i=>{i.pitch=o})},{type:"select",id:"lock-cond",label:"Plays",value:a.cond,options:ys.map(o=>({value:o,label:Yk(o)})),onChange:o=>s(i=>{ys.includes(o)&&(i.cond=o)})},{type:"choice",id:"lock-reverse",label:"Direction",value:a.reverse?"rev":"pad",options:[{value:"pad",label:"As the pad"},{value:"rev",label:"Reversed"}],onChange:o=>s(i=>{i.reverse=o==="rev"})},{type:"button",id:"lock-done",label:"Done",on:!1,onPress:()=>{we=null,C()}}]}function Vk(){const e=Nt();if(!e)return[];const t=e.sources();return[{type:"label",id:"grab-label",text:e.record?"Grab or take":"Grab the bar"},{type:"select",id:"grab-from",label:"From",value:te.from,options:t.map(n=>({value:n.id,label:n.name})),onChange:n=>{te.from=n,e.listen(n),C()}},{type:"choice",id:"grab-bars",label:"Bars",value:String(te.bars),options:[1,2,4].map(n=>({value:String(n),label:String(n)})),onChange:n=>{te.bars=n==="4"?4:n==="2"?2:1,C()}},{type:"button",id:"grab",label:te.busy?"Grabbing…":te.bars===1?"Grab last bar":`Grab last ${te.bars} bars`,on:te.busy,onPress:()=>void Gr()},...e.record?[{type:"button",id:"take",label:fh(),on:N.phase!=="idle",onPress:()=>Qr()}]:[]]}let Ns=-1;function Qk(e){if(!z(e).sample)return;Ns=e,Ah(e);const t=()=>{Ns=-1,at?.release(e)};window.addEventListener("pointerup",()=>setTimeout(t),{once:!0})}function Ah(e){Ce.has(e)||at?.hit(e),Ge(e,!0,!0)}function Jk(e){if(Ns===e){Ns=-1;return}if(!z(e).sample){Ge(e,!1),tl("pad");return}Ah(e),at?.release(e)}function Zk(e,t,n){se(()=>{const a=structuredClone(z(e)),s=structuredClone(z(t));A.pads[t]=a,n||(A.pads[e]=s.sample?s:ot(e))}),Ge(t,!1)}const Fs=["A","B","C","D"];function e1(e,t){Be(n=>{n.name=t.slice(0,24)},e)}function t1(e){const t=!!z(e).sample,n=[{id:"load",label:t?"Replace…":"Load a file…"}],a=zi().slice(-4).reverse();for(const i of a)n.push({id:`take-${i.id}`,label:`LUCY take ${i.id}`});const s=a[0];if(s&&n.push({id:`chop-take-${s.id}`,label:`Chop LUCY take ${s.id}…`}),Nt()&&n.push({id:"grab",label:te.bars===1?"Grab the last bar":`Grab the last ${te.bars} bars`}),Nt()?.record&&n.push({id:"record",label:N.phase==="rec"?"Stop the take":`Take from ${Ts(te.from)}`}),n.push({id:"library",label:"Library…"}),z(e).provenance){const i=Kr(e);if(i.length)for(const l of i)n.push({id:`alt-${l.id}`,label:`Alternative: ${An(l.title)}`});else De.ensure().then(()=>C()),n.push({id:"alternatives",label:"Alternatives…"})}return t&&n.push({id:"region",label:"Edit region…"},{id:"chop",label:"Chop to pads…"}),t&&n.push({id:"rename",label:"Rename…"},{id:"remove",label:"Remove sample"}),n}async function n1(e,t){if(Ge(e,!1),t==="load")tl("pad");else if(t==="grab")await Gr();else if(t==="record")Qr();else if(t==="remove"||t==="clear")Ca(e);else if(t==="library")Pt(!0);else if(t==="chop")await Ta();else if(t==="region")await eo();else if(t.startsWith("chop-take-")){const n=zi().find(a=>`chop-take-${a.id}`===t);n&&await Pk(n)}else if(t==="alternatives"){const n=z(e).provenance;Pt(!0,n?n.query||n.role:void 0)}else if(t.startsWith("alt-")){const n=Kr(e).find(a=>`alt-${a.id}`===t);n&&await Qs(n,z(e).provenance?.query??"",e)}else if(t.startsWith("take-")){const n=zi().find(a=>`take-${a.id}`===t);n&&await yh(n)}}const nl=new Iv;document.addEventListener("keydown",e=>{!Ne||e.repeat||e.shiftKey||e.altKey||!(e.metaKey||e.ctrlKey)||e.key.toLowerCase()!=="z"||(e.target instanceof HTMLElement?e.target:null)?.closest("input, select, textarea, [contenteditable]")||(e.preventDefault(),Wr())});const Mh=e=>K?.port.postMessage({type:"release",pad:e});Hv(document);document.addEventListener("keydown",e=>{if(e.repeat||e.metaKey||e.ctrlKey||e.altKey||_v(e.target))return;if(A.mode==="instrument"){fe.keyDown(e)&&e.preventDefault();return}const t=Tp(e);t<0||!z(t).sample||(e.preventDefault(),!(nl.press(e)<0)&&(Ce.has(t)||at?.hit(t),tt(t,null,!0,!0)))});document.addEventListener("keyup",e=>{if(fe.keyUp(e))return;const t=nl.release(e);t<0||(at?.release(t),Mh(t))});window.addEventListener("blur",()=>{fe.releaseAll();for(const e of nl.releaseAll())at?.release(e),Mh(e)});document.addEventListener("keydown",e=>{if(e.code!=="Space"&&e.code!=="Backspace"&&e.code!=="Delete"||e.metaKey||e.ctrlKey||e.altKey)return;const t=e.target instanceof HTMLElement?e.target:null;if(t?.closest("input, select, textarea, [contenteditable]"))return;if(e.code!=="Delete"&&dx(e)){e.preventDefault();return}if(e.code==="Space"||e.repeat||e.shiftKey)return;const n=t?.closest('[data-nc-id="pads"] .nc-padgrid-pad');if(!n)return;const a=[...document.querySelectorAll('[data-nc-id="pads"] .nc-padgrid-pad')].indexOf(n);a<0||!z(a).sample||(e.preventDefault(),Ge(a,!1),Ca(a),n.focus())});function al(e){const t=q("kit:pad-key");e.querySelectorAll('[data-nc-id="pads"] .nc-padgrid-pad').forEach((n,a)=>{const s=Rv[a];if(!s)return;let o=n.querySelector(":scope > .nyx-pad-key");o||(o=re("span",{class:"nyx-pad-key","aria-hidden":"true"}),n.append(o)),o.textContent!==s&&(o.textContent=s),U(o,t)})}function Lh(e){const t=q("kit:pad-playing");e.querySelectorAll('[data-nc-id="pads"] .nc-padgrid-pad').forEach((n,a)=>{const s=Ce.has(a);n.hasAttribute("data-nyx-stop")!==s&&(n.toggleAttribute("data-nyx-stop",s),s?U(n,t,n):gv(n))})}function ld(e,t){const n=Ys(e,t,D().bpm),a=Number(n.toFixed(2));return{speed:n,far:e.keepPitch&&(a<Tn[0]||a>Tn[1])}}function Th(e){const t=e.querySelector('[data-nc-id="fit-speed"]');if(!t)return;const n=Ma(),a=n.sample?H.info(n.sample):void 0,s=Number((a?Ys(n,a,D().bpm):1).toFixed(2)),o=n.keepPitch&&(s<Tn[0]||s>Tn[1]);t.toggleAttribute("data-nyx-far",o)}function Ch(e){const t=e.querySelector('[data-nc-id="level"][data-nc-slider]');!(t instanceof HTMLElement)||t.dataset.nyxLevel||(t.dataset.nyxLevel="",t.title="Double-click: back to 0 dB",t.addEventListener("dblclick",()=>{Ma().levelDb!==0&&Be(n=>{n.levelDb=0})}))}const cd=["C","C♯","D","E♭","E","F","F♯","G","A♭","A","B♭","B"];function a1(e,t){const n=Ue?.route();if(!n)return[];const a=ha(t),s=i=>Be(i),o=t.sample?t.fit>0?`Pad ${e+1} is fitted to bars: it keeps its pitch.`:a?`Pad ${e+1}'s hits play at the root of CALLIOPE's chord, from ${cd[t.note]}. The pattern's own hits still play.`:`Pad ${e+1} keeps its own pitch. Follow tunes its hits to CALLIOPE's root.`:"Load a sound on this pad to tune it to CALLIOPE.";return[{type:"label",id:"notes-label",text:"Notes in"},{type:"note",id:"notes-by",text:`Played by ${n.name} · ${px(n)}`},...t.sample&&t.fit===0?[{type:"toggle",id:"pad-follow",label:"Follow CALLIOPE",pressed:a,onPress:()=>s(i=>{i.follow=!ha(i)})},{type:"select",id:"pad-note",label:"Sample is",value:String(t.note),options:cd.map((i,l)=>({value:String(l),label:i})),onChange:i=>s(l=>{l.note=Number(i)})}]:[],{type:"note",id:"notes-how",text:o},{type:"button",id:"notes-open",label:`Open ${n.name.split(" ")[0]}`,on:!1,onPress:()=>void Ue?.open()},{type:"button",id:"notes-mine",label:"Play it myself",on:!1,onPress:()=>{Ue?.takeBack()&&C()}}]}function s1(){const e=A.selected,t=z(e),n=t.sample?H.info(t.sample):void 0,a=js(t).slice(1,-1),s=t.end-t.start,o=n?n.frames/n.sampleRate:0,i=!!t.sample,l=i&&!n,c=h=>Be(h),d=en.get(e),u=i?[...t.rights==="unknown"?[{type:"readout",id:"rights",label:"Rights",value:"Unknown · computer audio"}]:[],...t.provenance?[{type:"readout",id:"credit",label:"Credit",value:`${t.provenance.creator} · ${pr(t.provenance.license,t.provenance.licenseStatus)}`}]:[],{type:"readout",id:"sample",label:"Length",value:l?t.provenance?.origin==="local"?"Local sound, not here: open its local Library":"Not in this browser: load it again":`${xt(o*s)} of ${xt(o)} · ${n?.channels===2?"stereo":"mono"}`},...$p(d,t)&&n?[{type:"note",id:"auto-fit-note",text:cv(d.fit)},...Mc({...d.fit,...ld(t,n)})?[{type:"note",id:"auto-fit-far",text:Mc({...d.fit,...ld(t,n)})}]:[],{type:"button",id:"auto-fit-undo",label:"Undo fit",on:!1,onPress:()=>yk(e)}]:[],{type:"choice",id:"mode",label:"Mode",value:t.mode,options:[{value:"oneshot",label:"One-shot"},{value:"gate",label:"Gate"},{value:"loop",label:"Loop"}],onChange:h=>c(p=>{p.mode=h})},{type:"choice",id:"retrigger",label:"Retrigger",value:t.retrigger,options:[{value:"cut",label:"Cut"},{value:"finish",label:"Let it finish"}],onChange:h=>c(p=>{p.retrigger=h==="finish"?"finish":"cut"})},{type:"choice",id:"dir",label:"Direction",value:t.dir,options:[{value:"fwd",label:"Forward"},{value:"rev",label:"Reverse"},{value:"pingpong",label:"Ping-pong"}],onChange:h=>c(p=>{(h==="fwd"||h==="rev"||h==="pingpong")&&(p.dir=h)})},{type:"slider",id:"start",label:"Start",min:0,max:1,step:.001,value:t.start,valueText:xt(t.start*o),onChange:h=>c(p=>{p.start=Math.min(h,p.end-.002)}),onCommit:()=>void tt(e)},{type:"slider",id:"end",label:"End",min:0,max:1,step:.001,value:ed(t),valueText:t.length!=="free"&&ct(t)?`${xt(ed(t)*o)} · ${Bt(t.length)}`:xt(t.end*o),onChange:h=>c(p=>{p.length="free",p.end=Math.max(h,p.start+.002)}),onCommit:()=>void tt(e)},{type:"select",id:"slices",label:"Slices",value:String(t.slices),options:sp.map(h=>({value:String(h),label:h?`${h}`:"Off"})),onChange:h=>void Hi(Number(h),t.cuts.length?"transients":"even")},...t.slices?[{type:"choice",id:"chop",label:"Chop",value:t.cuts.length?"transients":"even",options:[{value:"even",label:"Even"},{value:"transients",label:"At hits"}],onChange:h=>void Hi(t.slices,h==="transients"?"transients":"even")}]:[],{type:"button",id:"chop-to-pads",label:"Chop to pads…",on:tn.isOpen,onPress:()=>void Ta()},{type:"group",id:"tune-shape",title:"Tune & shape",summary:kv(t),controls:[{type:"label",id:"pitch-label",text:"Pitch"},{type:"slider",id:"tune",label:"Tune",min:-24,max:24,step:1,value:t.tune,valueText:ba(t.tune," st"),onChange:h=>c(p=>{p.tune=h}),onCommit:()=>void tt(e)},{type:"slider",id:"fine",label:"Fine",min:-100,max:100,step:1,value:t.fine,valueText:ba(t.fine," ct"),onChange:h=>c(p=>{p.fine=h})},{type:"select",id:"fit",label:"Fit to bars",value:String(t.fit),options:[{value:"0",label:"Off"},...[1,2,4,8].map(h=>({value:String(h),label:`${h} bar${h===1?"":"s"}`}))],onChange:h=>{en.delete(e),c(p=>{p.fit=Number(h)})}},...t.fit&&n?[{type:"choice",id:"keep-pitch",label:"Keep pitch",value:t.keepPitch?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:h=>c(p=>{p.keepPitch=h==="on"})},{type:"readout",id:"fit-speed",label:"Speed",value:`${xv(Ys(t,n,D().bpm))}${t.keepPitch&&st.pending(e)&&!st.failed?" · stretching…":""}`}]:[],{type:"choice",id:"auto-fit",label:"Auto-fit loops",value:ss?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:h=>{ss=h==="on",uv(ss),C()}},{type:"label",id:"shape-label",text:"Shape"},{type:"slider",id:"attack",label:"Attack",min:0,max:.1,step:.001,taper:"time",value:t.attack,valueText:xt(t.attack),onChange:h=>c(p=>{p.attack=h})},{type:"slider",id:"decay",label:"Decay",min:.01,max:4,step:.01,taper:"time",value:t.decay,valueText:es(t.decay),onChange:h=>c(p=>{p.decay=h}),onCommit:()=>void tt(e)},{type:"slider",id:"cutoff",label:"Filter",min:-1,max:1,step:.01,value:t.cutoff,valueText:Za(t.cutoff),onChange:h=>c(p=>{p.cutoff=Math.abs(h)<.02?0:h})},{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:ut(t.resonance),onChange:h=>c(p=>{p.resonance=h})}]},{type:"label",id:"out-label",text:"Output"},{type:"slider",id:"level",label:"Level",min:0,max:1,step:.001,value:Fy(t.levelDb),valueText:zy(t.levelDb),onChange:h=>c(p=>{p.levelDb=Py(h)})},...t.sample?[{type:"label",id:"normalize-label",text:"Normalize"},{type:"choice",id:"normalize",label:"Normalize",value:ic(t)?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:h=>void bk(e,h==="on")},{type:"readout",id:"normalize-gain",label:"Gain",value:ic(t)?t.provenance?"Library level":Ay(t.normalize?.gainDb??0):"As recorded"}]:[],{type:"group",id:"pad-more",title:"Pan & choke",collapse:"phone",summary:`Pan ${rd(t.pan)} · Choke ${t.choke?Fs[t.choke-1]:"none"}`,controls:[{type:"slider",id:"pan",label:"Pan",min:-1,max:1,step:.01,value:t.pan,valueText:rd(t.pan),onChange:h=>c(p=>{p.pan=Math.abs(h)<.02?0:h})},{type:"select",id:"choke",label:"Choke",value:String(t.choke),options:[{value:"0",label:"None"},...Fs.map((h,p)=>({value:String(p+1),label:`Group ${h}`}))],onChange:h=>c(p=>{p.choke=Number(h)})},{type:"button",id:"clear-pad",label:"Remove sample",on:!1,onPress:()=>void Ca()}]}]:[];return{id:"params",title:"Params",summary:t.name,controls:[...i?[{type:"canvas",id:"wave",label:"Wave",paint:"waveform",peaks:t.sample?Ss.get(t.sample)??[]:[],region:[t.start,t.end],markers:a.map(h=>t.start+h*s),position:Qt.get(e)??-1}]:[],...O?[{type:"note",id:"notice",text:O}]:[],...a1(e,t),...Gk(t),...u,...Vk()]}}function Yi(e,t){se(()=>t(A.hacks[e]))}function o1(e,t){const n=A.hacks[e].dials[t.key]??t.default,a=`hack-${e}-${t.key}`,s=o=>Yi(e,i=>{i.dials[t.key]=o});return t.options?{type:"select",id:a,label:t.label,value:String(n),options:t.options.map(o=>({value:String(o.value),label:o.label})),onChange:o=>s(Number(o))}:{type:"slider",id:a,label:t.label,min:t.min,max:t.max,step:t.step??1,taper:Tm(t),value:n,valueText:vd(t,n,D().bpm),onChange:s}}const Ya=(e,t)=>(ft(e)?.dials??[]).filter(n=>!n.key.startsWith("mod_")&&n.more===!0===t).map(n=>o1(e,n)),dd=new Map;function qo(e){let t=dd.get(e);if(t)return t;let n=0,a=null;const s={in:0,out:0},o=()=>{const i=Df(We,e);if(i!==a){for(let l=0;l<n;l++)a?.close();a=i;for(let l=0;l<n;l++)a?.open()}};return t={open:()=>(o(),n++,a?.open(),!0),close:()=>{n!==0&&(o(),n--,a?.close())},read:()=>(o(),a?.read()??s)},dd.set(e,t),t}function i1(){const e=A.hacks,t=e.filter,n=t.mode==="lp"&&t.cutoff>=.999,a=Sv(t),s=i=>se(()=>i(A.hacks.filter)),o=[Sp(t)?"":"Filter",e.drive.on?"Drive":"",e.compressor.on?"Comp":""].filter(Boolean);return{id:"hacks",title:"Hacks",summary:o.length?o.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:t.on,meter:qo(`${Pr(t).type}-1`),meterHelp:q("hack-meter"),onToggle:i=>s(l=>{l.on=i}),controls:[{type:"select",id:"filter-mode",label:"Mode",value:t.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:i=>s(l=>{(i==="lp"||i==="hp"||i==="bp")&&(l.mode=i)})},{type:"canvas",id:"filter-curve",label:"Curve",paint:"filter",mode:t.mode,cutoff:t.cutoff,resonance:t.mode==="lp"?0:t.resonance,...a},{type:"slider",id:"filter-cutoff",label:"Cutoff",min:0,max:1,step:.01,value:t.cutoff,valueText:n?"open":Li(a.hz),onChange:i=>s(l=>{l.cutoff=i})},...t.mode==="lp"?[]:[{type:"slider",id:"filter-resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:ut(t.resonance),onChange:i=>s(l=>{l.resonance=i})}]]},{type:"group",id:"hacks-more",title:"Drive & Compressor",collapse:"phone",summary:`Drive ${e.drive.on?"on":"off"} · Compressor ${e.compressor.on?"on":"off"}`,controls:[{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:e.drive.on,meter:qo("drive-1"),meterHelp:q("hack-meter"),onToggle:i=>Yi("drive",l=>{l.on=i}),controls:Ya("drive",!1),more:Ya("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:e.compressor.on,meter:qo("compressor-1"),meterHelp:q("hack-meter"),onToggle:i=>Yi("compressor",l=>{l.on=i}),controls:Ya("compressor",!1),more:Ya("compressor",!0)}]}]}}const sl=[Kk,Xk,s1,i1].map(e=>({def:e,handle:Xb(e())}));Gb(le,sl.map(e=>e.handle),"adjacent");Uk(le);al(le);Nr(le);const ud=le.querySelector('[data-nc-module="transport"]'),Nh=ud?wv(ud,{playing:()=>Jt(),onPress:()=>void to(),description:q("play")}):null;function Fh(){const e=le.querySelector('[data-nc-section="pads"] [data-nc-id="library"]');De.attach(e),tn.attach(e)}function C(){Gp?.refresh(),rh?.update(),lh?.changed();for(const e of sl)e.handle.update(e.def());Fh(),De.isOpen&&De.refresh(),al(le),Lh(le),Th(le),Ch(le),dh(le),Nr(le),Nh?.sync()}let pd="";function Ph(){On();const e=Qt.get(A.selected)??-1,t=JSON.stringify([Eh(),$h(),Math.round(e*400),[...Qt.keys()],Ce.pads()]);if(t!==pd){pd=t;for(const n of sl.slice(0,3))n.handle.update(n.def());Fh(),al(le),Lh(le),Th(le),Ch(le),dh(le),Nr(le),Nh?.sync()}requestAnimationFrame(Ph)}requestAnimationFrame(Ph);Ue?.onChange(e=>{e&&C()});Ue?.route()&&C();globalThis.__NC_NOTES__={read:()=>({routes:Ue?[...Ue.follower.routes]:[],points:Ue?Ue.follower.points():[],follows:A.pads.map(e=>ha(e)),replay:Et?{...Et.stats}:null,out:at?{...at.stats}:null,slots:Es?{...Es.stats}:null}),log:{start(){As.length=0,Ms=!0,K?.port.postMessage({type:"hitlog",on:!0})},take:()=>As.splice(0),stop(){Ms=!1,K?.port.postMessage({type:"hitlog",on:!1})}}};uk.start();Promise.all([...ma(A)].map(e=>H.get(e))).then(e=>{for(const t of e)t&&Up(t);C()});if(J)ge(),J.providePreset?.({format:Zx,version:ek,get:()=>(ik(A),_p(A)),set:async e=>{await wh(e,"Loaded the Scene's pattern.")}}),Nt()?.listen(te.from),J.onAudio?.({label:"Pad",targets:gh,receive:bh});else{const e=()=>{ge()};document.addEventListener("pointerdown",e,{once:!0,capture:!0}),document.addEventListener("keydown",e,{once:!0,capture:!0})}window.__nyx={state:A,instrument:{open:e=>fe.open(e),get it(){return fe},get node(){return va},setMode:no},clock:ht,store:H,stretcher:st,stretchTimes:Vp,selectPad:e=>Ge(e,!1),edit:e=>se(()=>e(A)),runStretch:Qp,get stretchLoaded(){return as!==null},get ctx(){return F},get masterOut(){return Zt},chop:{open:Ta,get panel(){return tn},get times(){return Js.times}},region:{open:eo,get editor(){return Dn},get skips(){return _i},signals:()=>Pn?.signals()??null,signal(e){K?.port.postMessage({type:"sig",sig:{...wn(),aria:!0,...e}})},togglePlay:to,get linked(){return Pn!==null},hits(){const e=z(A.selected);return e.sample?(Xr(e.sample),Hs(H.info(e.sample)?.analysis,e.hitSense)):null}},get fx(){return We},get positions(){return Qt},get voices(){return Xp},ensureAudio:ge,play:tt,async setSample(e,t,n,a="test"){await ge()&&await an(e,t,n,a,!0,null,null,Mn(t,n))},grab:te,grabBars:Gr,get padUndo(){const e=Ne?.before[0];return Ne&&e?{index:e.index,sample:e.pad.sample,pads:Ne.before.map(t=>t.index)}:null},undoPad:Wr,removePad:Ca,receiveAudio:bh,padTargets:gh,take:N,pressTake:Qr,get notice(){return O},setPerform:Wi,setFill:Cs,actSlot:Zr,get edited(){return Nn},library:{get panel(){return De},open:e=>Pt(!0,e),close:()=>Pt(!1),catalog:Zp,local:Vs,load:Qs,buildKit:()=>De.buildKit(),alternatives:e=>Kr(e).map(t=>t.id),preview:oh,get previewing(){return kn?.id??null}},toggleStep(e,t){Ls(e,t,n=>{n.on=!n.on})}};
