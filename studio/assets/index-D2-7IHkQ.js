(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const sn=1e-9;function gh(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class bo{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return gh(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let r=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+sn&&(r=s.bpm);const i=[{beat:t.beat,time:t.time,bpm:this.clamp(r)}];for(const s of a){if(s.beat<=t.beat+sn)continue;const l=this.clamp(s.bpm);l!==i[i.length-1].bpm&&i.push({beat:s.beat,time:0,bpm:l})}this.segs=i,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+sn){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-sn;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,r=.25){const i=this.bpmAt(n);if(!(a>0)||!(r>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/r));this.setTempoAt(i,n);for(let l=1;l<=s;l++)this.setTempoAt(i+(t-i)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new bo({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+sn)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+sn)return n[a];return n[0]}}const bh=Object.freeze({beatsPerBar:4,beatUnit:4}),fn=1e-9;function yh(e){return Math.floor(e+fn)}function Tc(e,t,n=!1){if(!(t>0))return e;const r=Math.ceil(e/t-fn)*t;return n&&r<=e+fn?r+t:r}class vh{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new bo({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??bh}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-fn&&(this.stopTime===null||t<this.stopTime-fn)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-fn?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=yh(t/n),r=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:r,barPhase:r/n}}nextBar(t,n=!1){return Tc(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const Lc="nc-clock/snapshot",Cc=1;function wh(e,t="local"){return{format:Lc,version:Cc,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function xh(e,t){const n=kh(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const nt=e=>typeof e=="number"&&Number.isFinite(e),Es=e=>e===null||nt(e);function kh(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==Lc&&n("format"),(!nt(t.version)||Math.floor(t.version)!==Cc)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!nt(t.anchor.beat)||!nt(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&nt(a.beat)&&nt(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!nt(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!nt(t.meter.beatUnit))&&n("meter"),(!Es(t.startTime)||!Es(t.stopTime)||!nt(t.stoppedBeat))&&n("transport times"),t}class $h{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new vh(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){xh(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return wh(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const Sh="nc-sync/1",Eh=1,Ah="nc-sync",Mh="nc-sync-leader",Th=0,Nc=.5,Fc=.75;function Lh(e){return typeof e=="number"&&Number.isFinite(e)&&e>=Nc&&e<=Fc?e:null}const qr=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Rn=e=>typeof e=="number"&&Number.isFinite(e),Ma=e=>typeof e=="string"&&e.length>0;function Ch(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==Eh||!Ma(t.type)||!Ma(t.from)||!Rn(t.term)||!Rn(t.seq)||!Rn(t.sentAt))return null;switch(t.type){case"hello":return Ma(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return Rn(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&Rn(t.slot)?t:null;case"ping":case"pong":return Ma(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function Nh(e,t,n,a,r){return{proto:Sh,from:t,term:n,seq:a,sentAt:r,...e}}function Be(){return(performance.timeOrigin+performance.now())/1e3}const Vr=.003,Fh=3,Hr=.002+1e-6,Ih=.01,As=500;class Ph{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Ih:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=Vr&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const r=n-(this.timeOrigin+a)/1e3,i=this.median(),s=r-i,l=Math.abs(r-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!d&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,i,d))):(this.pendingStep=s,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const r=this.heldBase()!==null,i=this.ctx.currentTime,s=i<=this.revertUntil;let l;if(a&&s){const d=this.offsets,u=this.preStep;d.length=0;for(let c=0;c<u.length;c++)d.push(u[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:i,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!s){const c=this.offsets,p=this.preStep;p.length=0;for(let f=0;f<c.length;f++)p.push(c[f]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?i+this.stepRevert:-1/0}const d=this.offsets,u=t-n;for(let c=0;c<d.length;c++)d[c]+=u;this.stepCount++,l={stepSeconds:t-n,confirmedAt:i,reanchors:this.stepCount,revert:!1}}if(!r)for(const d of[...this.stepListeners])d(l);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let i=0;i<a;i++){const s=t[i];let l=i-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const r=a>>1;return a%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const r=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(r&&Number.isFinite(r.contextTime)&&Number.isFinite(r.performanceTime)&&r.contextTime>=Vr&&r.performanceTime>0)if(this.waitSince=null,r.contextTime===this.lastStampC&&r.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<As)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=r.contextTime,this.lastStampP=r.performanceTime,this.stampSince=this.perfNow(),n=r.contextTime-(this.timeOrigin+r.performanceTime)/1e3,a=!0;else if(!r||!(r.contextTime>=Vr)&&!(r.contextTime>0&&!(r.performanceTime>0))){if(r){const i=this.perfNow();if(this.waitSince===null&&(this.waitSince=i),i-this.waitSince<As)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(Fh,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let r=-1,i=0;for(let l=0;l<n;l++){let d=0;for(let u=0;u<n;u++)Math.abs(t[u]-t[l])<=Hr&&d++;d>i&&(r=l,i=d)}if(i<a)return;const s=t[r];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>Hr&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-this.estimate())<=Hr}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const r=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(r,2)};setTimeout(r,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(r)&&r>0?r:null}}const Rh="let t=null;onmessage=e=>{clearInterval(t);t=null;if(e.data>0)t=setInterval(()=>postMessage(0),e.data)}";function Dh(){const e=globalThis;return typeof e.Worker=="function"&&typeof e.Blob=="function"&&typeof e.document=="object"&&typeof e.URL?.createObjectURL=="function"}function zh(e,t={}){const n=t.intervalMs??20,a=t.now??(typeof performance<"u"?()=>performance.now():()=>Date.now());let r=null,i=null,s=null,l=-1/0,d=!1;const u=()=>{if(!d)return;const c=a();c-l<n/2||(l=c,e())};if(t.worker===!0||t.worker!==!1&&Dh())try{i=URL.createObjectURL(new Blob([Rh],{type:"text/javascript"})),r=new Worker(i),r.onmessage=u}catch{r=null,i&&URL.revokeObjectURL(i),i=null}return{get running(){return d},get kind(){return r?"worker+timer":"timer"},start(){d||(d=!0,s=setInterval(u,n),r?.postMessage(n))},stop(){d=!1,s&&clearInterval(s),s=null,r?.postMessage(0)},dispose(){this.stop(),r?.terminate(),r=null,i&&URL.revokeObjectURL(i),i=null}}}class Oh{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...qr,...t.capabilities},this.channelOption=t.channel??Ah,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const r=this.o.now(),i=()=>{n===this.startWaits&&t(r)};return a.then(i,i),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const r=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(r),0)}else{const r=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?r:Math.max(t+this.o.gatedStartLeadSeconds,r),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[r,i]=this.tempoRange();t=Math.min(i,Math.max(r,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const d=s.beatAt(l+this.o.minLeadSeconds),u=Math.max(n??Tc(d,1),d);a&&a>0?(s.tempo.rampTempo(t,u,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,u),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(Fc,Math.max(Nc,t)):Th;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=Lh(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=Ch(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...qr,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const i of this.peers.values())i.leader=i.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...qr},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(r=>{this.leader&&this.decideStart(r)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const i=new AbortController;this.lockAbort=i,this.locks.request(Mh,{signal:i.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===i&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(i,s,l)=>[i?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const i of this.peers.values()){if(!i.capabilities.canLead)continue;const s=n(i.capabilities.prefersLeader,i.joinedAt,i.id);(r===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,r=i.id)}this.setLeader(r===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==r[0]?a[0]<r[0]:a[1]!==r[1]?a[1]<r[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const r=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>r&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(Nh(t,this.id,this.term,++this.seq,this.o.now()))}}const Bh="modulepreload",_h=function(e){return"/studio/"+e},Ms={},jh=function(t,n,a){let r=Promise.resolve();if(n&&n.length>0){let s=function(u){return Promise.all(u.map(c=>Promise.resolve(c).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),d=l?.nonce||l?.getAttribute("nonce");r=s(n.map(u=>{if(u=_h(u),u in Ms)return;Ms[u]=!0;const c=u.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":Bh,c||(f.as="script"),f.crossOrigin="",f.href=u,d&&f.setAttribute("nonce",d),document.head.appendChild(f),c)return new Promise((b,m)=>{f.addEventListener("load",b),f.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})};var qh=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Ei=[.25,.5,.75,1,1.5,2],Vh=4.9,ae={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0},hallTone:{exp2:[1500,3.7],div:100,round:!0}},Ue={fmt:"wet"},he={fmt:"pct"},ln={fmt:"db"},Ta={fmt:"signedPct"},Dn={fmt:"num",suffix:" ms"},X={div:100};function P(e,t,n,a,r,i,s,l){var d={key:e,label:t,min:n,max:a,default:r,step:1,k:i,unit:null,format:s};if(l)for(var u in l)d[u]=l[u];return d}function pt(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var Wn=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[P("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:ae.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[P("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:ae.hpHz,astrid:!0,zero:"off"}),P("q","Resonance",0,100,0,2,{fmt:"q",law:ae.hpQ},{dsp:{law:ae.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[P("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:ae.bpHz,astrid:!0},{dsp:{law:ae.bpHz}}),P("q","Q",0,100,0,2,{fmt:"q",law:ae.bpQ},{dsp:{law:ae.bpQ}}),P("mix","Mix",0,100,100,3,Ue,{dsp:X,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[P("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:pt(qh),overriddenBy:"beats_free",tempoSynced:!0}),P("feedback","Feedback",0,90,35,2,he,{dsp:X,unit:"%"}),P("mix","Wet/dry",0,100,0,3,Ue,{dsp:X,unit:"%",astridKey:"wet"}),P("tone","Tone",0,100,100,4,{fmt:"hz",law:ae.delayTone,offAt:100},{dsp:{div:99},more:!0}),P("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),P("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:pt([[0,"Insert"],[1,"Send"]]),more:!0}),P("send","Send",0,100,100,7,he,{dsp:X,unit:"%",more:!0}),P("mod_send","Accent → send",-100,100,0,8,Ta,{dsp:X,unit:"%",more:!0}),P("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[P("predelay","Pre-delay",0,200,0,1,Dn,{dsp:{div:1e3},unit:"ms"}),P("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:X,unit:"%"}),P("decay","Decay",0,100,50,3,he,{dsp:X,unit:"%"}),P("damping","Damping",0,100,0,4,he,{dsp:X,unit:"%"}),P("mix","Mix",0,100,0,5,Ue,{dsp:X,unit:"%"})]},{type:"hall",label:"Hall",own:!0,dials:[P("size","Size",0,100,60,1,he,{dsp:X,unit:"%"}),P("decay","Decay",5,120,35,2,{fmt:"fixed",div:10,add:0,digits:1,suffix:" s"},{dsp:{div:10},unit:"s"}),P("predelay","Pre-delay",0,250,20,3,Dn,{dsp:{div:1e3},unit:"ms"}),P("tone","Tone",0,100,60,4,{fmt:"hz",law:ae.hallTone,astrid:!0},{dsp:{law:ae.hallTone}}),P("mix","Mix",0,100,25,5,Ue,{dsp:X,unit:"%"}),P("low_cut","Low cut",0,1e3,120,6,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),P("width","Width",0,100,100,7,he,{dsp:X,unit:"%",more:!0}),P("motion","Motion",0,100,30,8,he,{dsp:X,unit:"%",more:!0})]},{type:"ensemble",label:"Ensemble",own:!0,dials:[P("rate","Rate",0,100,35,1,{fmt:"rate",law:ae.rate},{dsp:{law:ae.rate}}),P("depth","Depth",0,100,60,2,he,{dsp:X,unit:"%"}),P("width","Width",0,100,80,3,he,{dsp:X,unit:"%"}),P("mix","Mix",0,100,50,4,Ue,{dsp:X,unit:"%"}),P("voices","Voices",3,6,3,5,{fmt:"option"},{step:null,options:pt([[3,"3"],[6,"6"]]),more:!0}),P("vibrato","Vibrato",0,100,20,6,he,{dsp:X,unit:"%",more:!0})]},{type:"gate",label:"Gate",own:!0,tempoSynced:!0,pattern:!0,dials:[P("rate","Rate",4,16,4,1,{fmt:"option"},{step:null,options:pt([[4,"1/4"],[8,"1/8"],[16,"1/16"],[12,"1/8T"]])}),P("swing","Swing",0,100,0,3,he,{dsp:X,unit:"%"}),P("depth","Depth",0,100,90,4,he,{dsp:X,unit:"%"}),P("mix","Mix",0,100,100,5,Ue,{dsp:X,unit:"%"}),P("steps","Steps",8,16,8,2,{fmt:"option"},{step:null,options:pt([[8,"8"],[16,"16"]]),more:!0}),P("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:pt([[0,"Volume"],[1,"Filter"]]),more:!0}),P("smooth","Smooth",1,20,4,7,Dn,{unit:"ms",more:!0}),P("spread","Spread",0,100,0,8,he,{dsp:X,unit:"%",more:!0}),P("res","Resonance",0,100,20,9,he,{dsp:X,unit:"%",more:!0})]},{type:"flanger",label:"Flanger",dials:[P("rate","Rate",0,100,26,1,{fmt:"rate",law:ae.rate},{dsp:{law:ae.rate}}),P("depth","Depth",0,100,70,2,he,{dsp:X,unit:"%"}),P("feedback","Feedback",-90,90,50,3,Ta,{dsp:X,unit:"%"}),P("mix","Mix",0,100,50,4,Ue,{dsp:X,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[P("rate","Rate",0,100,52,1,{fmt:"rate",law:ae.rate},{dsp:{law:ae.rate}}),P("depth","Depth",0,100,50,2,he,{dsp:X,unit:"%"}),P("spread","Spread",0,100,70,3,he,{dsp:X,unit:"%"}),P("mix","Mix",0,100,40,4,Ue,{dsp:X,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[P("rate","Rate",0,100,39,1,{fmt:"rate",law:ae.rate},{dsp:{law:ae.rate}}),P("depth","Depth",0,100,70,2,he,{dsp:X,unit:"%"}),P("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:pt([[4,"4"],[6,"6"],[8,"8"]])}),P("feedback","Feedback",0,90,30,4,he,{dsp:X,unit:"%"}),P("mix","Mix",0,100,50,5,Ue,{dsp:X,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[P("low_db","Low",-18,18,0,1,ln,{unit:"dB"}),P("mid_db","Mid",-18,18,0,2,ln,{unit:"dB"}),P("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:ae.midHz,astrid:!0},{dsp:{law:ae.midHz}}),P("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:ae.eqQ},{dsp:{law:ae.eqQ}}),P("high_db","High",-18,18,0,4,ln,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[P("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),P("output_db","Output",-12,12,0,2,ln,{unit:"dB"}),P("mix","Mix",0,100,100,3,Ue,{dsp:X,unit:"%"}),P("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:pt([[0,"Smooth"],[1,"Acid"]]),more:!0}),P("tone","Tone",0,100,100,5,{fmt:"hz",law:ae.driveTone,offAt:100},{dsp:{div:99},more:!0}),P("mod_drive","Accent → drive",-100,100,0,6,Ta,{dsp:X,unit:"%",more:!0}),P("mod_tone","Accent → tone",-100,100,0,7,Ta,{dsp:X,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[P("threshold_db","Threshold",-60,0,0,1,ln,{unit:"dB"}),P("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:ae.ratio},{dsp:{law:ae.ratio}}),P("attack_ms","Attack",1,100,10,3,Dn,{unit:"ms"}),P("release_ms","Release",10,1e3,150,4,Dn,{unit:"ms"}),P("makeup_db","Makeup",0,24,0,5,ln,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[P("width","Width",0,200,100,1,he,{dsp:X,unit:"%"}),P("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:X})]}],Hh=Wn.map(function(e){return e.type}),Uh=Wn.filter(function(e){return!e.hidden}).map(function(e){return e.type}),Gh={reverb:"plate"},xn={},Ic=[],Kn=[];function Wh(e){xn[e.type]||Ic.push(e.type),xn[e.type]=e;for(var t=0;t<Kn.length;t++)try{Kn[t](e.type)}catch(n){typeof console<"u"&&console.error(n)}}function Kh(){return Ic.map(function(e){return xn[e]})}function Yh(e){return Kn.push(e),function(){var t=Kn.indexOf(e);t>=0&&Kn.splice(t,1)}}function Pc(e){return typeof e=="string"&&/^plugin:[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(e)&&e.length<=71}function yo(e){var t=Gh[e]||e;return Hh.indexOf(t)>=0||typeof t=="string"&&xn[t]?t:null}function oe(e){for(var t=yo(e),n=0;n<Wn.length;n++)if(Wn[n].type===t)return Wn[n];return t&&xn[t]?xn[t]:null}function Xh(e,t){var n=oe(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function un(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function Qa(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=un(n.law,t);return a===null?0:a}function Ts(e,t){return Math.min(Vh,e*60/(t>0?t:120))}var Ls=function(e){return e>0?"+":e<0?"−":""};function Jh(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function Rc(e,t,n){var a=e.format,r;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:Ls(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return Ls(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(r=un(a.law,t),r===null?a.zero||"open":a.astrid?Jh(r):r+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+un(a.law,t).toFixed(1);case"ratio":return un(a.law,t).toFixed(1)+":1";case"rate":return r=un(a.law,t),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var i=0;i<e.options.length;i++)if(e.options[i].value===t)return e.options[i].label;return String(t);case"tempoMs":return Math.round(Ts(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(Ts(t,n)*1e3)+" ms"}return String(t)}var Qh=1,kr=["drive","delay","plate"];function Zh(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,r){return Rc(e,a,r)},t}var mn=kr.map(function(e){var t=oe(e),n={type:e,label:t.label,dials:t.dials.map(Zh)};return t.tempoSynced&&(n.tempoSynced=!0),n}),ef={reverb:"plate"};function Za(e){var t=ef[e]||e;return kr.indexOf(t)>=0?t:null}function $r(e){for(var t=Za(e),n=0;n<mn.length;n++)if(mn[n].type===t)return mn[n];return null}function Dc(e,t){var n=$r(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function kn(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function ot(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,r=1;r<e.options.length;r++)Math.abs(e.options[r].value-t)<Math.abs(a-t)&&(a=e.options[r].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var i=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*i)/i))+0}function tf(){return{v:Qh,chain:mn.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function nf(e){return Ei.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},Ei[0])}function Ur(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function af(e){for(var t=Array.isArray(e)?e:Ur(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=tf(),r={},i=[],s=0;s<t.length;s++){var l=t[s];if(Ur(l)){var d=Za(l.type);if(!d){typeof l.type=="string"&&i.push(l.type);continue}if(r[d]){i.push(d);continue}r[d]=!0;var u=a.chain[kr.indexOf(d)],c=Ur(l.dials)?l.dials:{};d==="delay"&&c.mix===void 0&&c.wet!==void 0&&(c=Object.assign({},c,{mix:c.wet})),u.bypass=n?l.bypass===!0:l.bypass!==!1,$r(d).dials.forEach(function(p){u.dials[p.key]=ot(p,c[p.key])}),rf(d,u.dials,c)}}return{state:a,dropped:i}}function rf(e,t,n){for(var a=$r(e),r=0;r<a.dials.length;r++){var i=a.dials[r];i.stepWhen&&(t[i.key]=ot(i,n&&typeof n[i.key]=="number"?n[i.key]:t[i.key],kn(i,t)))}}function er(e){return af(e).state}function of(e){return JSON.parse(JSON.stringify(e))}var sf=24,Ai={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Mi(e,t,n){if(t==="bypass")return n?0:1;var a=Dc(e,t)||lf(e,t);return a?Qa(a,n):0}function lf(e,t){var n=oe(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var cf={};mn.forEach(function(e){e.dials.forEach(function(t){cf[e.type+"."+t.key]=t.format})});function Gr(e,t){var n=new Float64Array(sf),a=er(e);return a.chain.forEach(function(r){var i=Ai[r.type];n[i.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[i[s]]=Mi(r.type,s,r.dials[s])})}),n}var df="__ncFxLoop",uf=/^(?:return|typeof|instanceof|in|of|new|delete|void|throw|case|do|else|yield|await)$/,Cs=/[A-Za-z_$\u0080-\uffff]/,Wr=/[A-Za-z0-9_$\u0080-\uffff]/;function pf(e){var t=[],n=0,a=e.length,r=[],i,s;function l(){var f=t.length?t[t.length-1]:null;return f?f.t==="name"?uf.test(f.v):f.t==="num"||f.t==="str"||f.t==="tpl"||f.t==="re"?!1:f.v!==")"&&f.v!=="]":!0}function d(){for(var f=n-1;n<a;){if(i=e[n],i==="\\"){n+=2;continue}if(i==="`"){n++,t.push({t:"tpl",v:"",s:f,e:n});return}if(i==="$"&&e[n+1]==="{"){n+=2,r.push("tpl"),t.push({t:"tpl",v:"",s:f,e:n});return}n++}t.push({t:"tpl",v:"",s:f,e:a})}for(;n<a;){if(i=e[n],i===" "||i==="	"||i===`
`||i==="\r"||i==="\f"||i==="\v"||i===" "||i==="\uFEFF"||i==="\u2028"||i==="\u2029"){n++;continue}if(i==="/"&&e[n+1]==="/"){for(;n<a&&e[n]!==`
`&&e[n]!=="\r";)n++;continue}if(i==="/"&&e[n+1]==="*"){var u=e.indexOf("*/",n+2);n=u<0?a:u+2;continue}if(s=n,i==='"'||i==="'"){for(n++;n<a&&e[n]!==i&&e[n]!==`
`;)n+=e[n]==="\\"?2:1;n++,t.push({t:"str",v:"",s,e:n});continue}if(i==="`"){n++,d();continue}if(i==="/"&&l()){n++;for(var c=!1;n<a;){if(i=e[n],i==="\\"){n+=2;continue}if(i===`
`)break;if(c)i==="]"&&(c=!1);else if(i==="[")c=!0;else if(i==="/"){n++;break}n++}for(;n<a&&Wr.test(e[n]);)n++;t.push({t:"re",v:"",s,e:n});continue}if(Cs.test(i)||i==="\\"){for(n++;n<a&&(Wr.test(e[n])||e[n]==="\\");)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(i==="#"&&n+1<a&&Cs.test(e[n+1])){for(n+=2;n<a&&Wr.test(e[n]);)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(i>="0"&&i<="9"||i==="."&&e[n+1]>="0"&&e[n+1]<="9"){for(n++;n<a&&/[0-9A-Za-z_.]/.test(e[n]);)(e[n]==="e"||e[n]==="E")&&(e[n+1]==="+"||e[n+1]==="-")&&!/^0[xX]/.test(e.slice(s,n))&&n++,n++;t.push({t:"num",v:"",s,e:n});continue}if(i==="{")r.push("{");else if(i==="}"){var p=r.pop();if(p==="tpl"){n++,d();continue}}if(i==="?"&&e[n+1]==="."&&!(e[n+2]>="0"&&e[n+2]<="9")){n+=2,t.push({t:"p",v:"?.",s,e:n});continue}if(i==="."&&e[n+1]==="."&&e[n+2]==="."){n+=3,t.push({t:"p",v:"...",s,e:n});continue}n++,t.push({t:"p",v:i,s,e:n})}return t}function hf(e,t){for(var n=0,a=t;a<e.length;a++){var r=e[a].t==="p"?e[a].v:"";if(r==="("||r==="["||r==="{")n++;else if((r===")"||r==="]"||r==="}")&&(n--,n===0))return r===")"?a:-1}return-1}function ff(e){for(var t=String(e),n=pf(t),a=[],r=df+"()",i=0;i<n.length;i++){var s=n[i];if(!(s.t!=="name"||s.v!=="while"&&s.v!=="for")){var l=i>0?n[i-1]:null;if(!(l&&l.t==="p"&&(l.v==="."||l.v==="?."))){var d=i+1;if(!(s.v==="for"&&n[d]&&n[d].t==="name"&&n[d].v==="await")&&!(!n[d]||n[d].t!=="p"||n[d].v!=="(")){var u=hf(n,d);if(!(u<0)){if(s.v==="while"){if(u===d+1)continue;a.push([n[d].e,r+" && ("],[n[u].s,")"]);continue}for(var c=[],p=0,f=d+1;f<u;f++){var b=n[f].t==="p"?n[f].v:"";b==="("||b==="["||b==="{"?p++:b===")"||b==="]"||b==="}"?p--:b===";"&&p===0&&c.push(f)}c.length===2&&(c[1]===c[0]+1?a.push([n[c[0]].e," "+r]):a.push([n[c[0]].e," "+r+" && ("],[n[c[1]].s,")"]))}}}}}if(!a.length)return t;a.sort(function(g,x){return g[0]-x[0]});for(var m="",w=0,h=0;h<a.length;h++)m+=t.slice(w,a[h][0])+a[h][1],w=a[h][0];return m+t.slice(w)}var Kr=1,Ns=15,zc=/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/,mf=/^[a-z][a-z0-9_]{0,31}$/,Oc=/^\d+\.\d+\.\d+$/,Bc=/^[A-Za-z0-9.+-]+(?: (?:AND|OR|WITH) [A-Za-z0-9.+-]+)*$/,gf=/^[A-Za-z0-9_-][A-Za-z0-9._-]{0,63}\.js$/,Fs=["$schema","ncPlugin","id","name","version","author","licence","description","website","keywords","dsp","params"],Is=["id","label","type","defaultValue","minValue","maxValue","discreteStep","exponent","choices","units","more"],tr={1:"It failed to start.",2:"It crashed while playing.",3:"It made bad numbers (NaN, infinity or runaway level).",4:"It crashed when a dial moved.",5:"Its code is not loaded.",6:"It got stuck in a loop, so it was stopped."};function Yn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function cn(e){return typeof e=="number"&&isFinite(e)}function Bt(e,t){return typeof e=="string"&&e.trim().length>0&&e.length<=t}function Sr(e){var t=[],n=e,a=function(l,d){t.push(l+": "+d)};if(!Yn(n))return{ok:!1,errors:["manifest: must be a JSON object"],manifest:null};Object.keys(n).forEach(function(l){Fs.indexOf(l)<0&&a(l,"unknown field (allowed: "+Fs.slice(1).join(", ")+")")}),n.ncPlugin!==Kr&&a("ncPlugin","must be "+Kr),(typeof n.id!="string"||!zc.test(n.id)||n.id.length>64)&&a("id",'lowercase letters and digits, with dots or dashes between, up to 64 (e.g. "yourname.tremolo")'),Bt(n.name,40)||a("name","a name of 1 to 40 characters"),(typeof n.version!="string"||!Oc.test(n.version))&&a("version",'x.y.z, e.g. "1.0.0"'),Bt(n.author,80)||a("author","who made it, 1 to 80 characters"),(typeof n.licence!="string"||!Bc.test(n.licence)||n.licence.length>64)&&a("licence",'an SPDX licence id, e.g. "MIT"'),n.description!==void 0&&!(typeof n.description=="string"&&n.description.length<=200)&&a("description","up to 200 characters"),n.website!==void 0&&!(typeof n.website=="string"&&/^https:\/\/\S+$/.test(n.website)&&n.website.length<=2048)&&a("website","an https:// address"),n.keywords!==void 0&&!(Array.isArray(n.keywords)&&n.keywords.length<=8&&n.keywords.every(function(l){return Bt(l,24)}))&&a("keywords","up to 8 short strings"),(typeof n.dsp!="string"||!gf.test(n.dsp))&&a("dsp",`the DSP file's name, in the same folder as plugin.json, ending in .js (e.g. "tremolo.dsp.js")`);var r=[];if(!Array.isArray(n.params))a("params","a list of params (may be empty)");else if(n.params.length>Ns)a("params","at most "+Ns);else{var i={};n.params.forEach(function(l,d){var u="params["+d+"]";if(!Yn(l)){a(u,"must be an object");return}Object.keys(l).forEach(function(f){Is.indexOf(f)<0&&a(u+"."+f,"unknown field (allowed: "+Is.join(", ")+")")}),typeof l.id!="string"||!mf.test(l.id)||l.id==="bypass"?a(u+".id",'lowercase, starting with a letter: letters, digits, _ (not "bypass")'):i[l.id]?a(u+".id",'"'+l.id+'" is used twice'):i[l.id]=!0,Bt(l.label,24)||a(u+".label","the dial's name, 1 to 24 characters");var c=l.type===void 0?"float":l.type;if(["float","int","boolean","choice"].indexOf(c)<0){a(u+".type","float, int, boolean or choice");return}var p={id:l.id,label:l.label,type:c};if(c==="choice"){if(!Array.isArray(l.choices)||l.choices.length<2||l.choices.length>16||!l.choices.every(function(f){return Bt(f,24)})){a(u+".choices","2 to 16 names");return}p.choices=l.choices.slice(),p.minValue=0,p.maxValue=l.choices.length-1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==p.maxValue)&&a(u,"a choice's values are 0 to choices.length - 1: leave out minValue and maxValue")}else if(c==="boolean")p.minValue=0,p.maxValue=1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==1)&&a(u,"a boolean is 0 or 1: leave out minValue and maxValue");else{if(!cn(l.minValue)||!cn(l.maxValue)||!(l.minValue<l.maxValue)){a(u,"minValue and maxValue: numbers, minValue < maxValue");return}p.minValue=l.minValue,p.maxValue=l.maxValue,l.discreteStep!==void 0&&!(cn(l.discreteStep)&&l.discreteStep>0&&l.discreteStep<=l.maxValue-l.minValue)&&a(u+".discreteStep","a number > 0, at most the range"),p.discreteStep=c==="int"?Math.max(1,Math.round(l.discreteStep||1)):cn(l.discreteStep)&&l.discreteStep>0?l.discreteStep:bf(l.maxValue-l.minValue),c==="int"&&(!Number.isInteger(l.minValue)||!Number.isInteger(l.maxValue))&&a(u,"an int has whole-number minValue and maxValue")}l.defaultValue===void 0?p.defaultValue=p.minValue:!cn(l.defaultValue)||l.defaultValue<p.minValue||l.defaultValue>p.maxValue?a(u+".defaultValue","a number from "+p.minValue+" to "+p.maxValue):p.defaultValue=l.defaultValue,l.units!==void 0&&(typeof l.units=="string"&&l.units.length<=8?p.units=l.units:a(u+".units",'up to 8 characters, e.g. "Hz", "ms", "%", "dB"')),l.exponent!==void 0&&(cn(l.exponent)&&l.exponent>0?p.exponent=l.exponent:a(u+".exponent","a number > 0")),l.more!==void 0&&(typeof l.more=="boolean"?l.more&&(p.more=!0):a(u+".more","true or false")),r.push(p)})}if(t.length)return{ok:!1,errors:t,manifest:null};var s={ncPlugin:Kr,id:n.id,name:n.name.trim(),version:n.version,author:n.author.trim(),licence:n.licence,dsp:n.dsp,params:r};return n.description&&(s.description=n.description),n.website&&(s.website=n.website),n.keywords&&(s.keywords=n.keywords.slice()),{ok:!0,errors:[],manifest:s}}function bf(e){var t=Math.pow(10,Math.floor(Math.log10(e/100)));return t<.001?.001:t>1?1:+t.toFixed(3)}function yf(e){for(var t=0;t<3&&Math.abs(Math.round(e*Math.pow(10,t))-e*Math.pow(10,t))>1e-9;)t++;return t}function Er(e){return"plugin:"+e}function vf(e,t){var n=e,a=t||{},r=n.params.map(function(s,l){var d={key:s.id,label:s.label,min:s.minValue,max:s.maxValue,default:s.defaultValue,step:s.discreteStep,k:l+1,unit:s.units||null,format:null};if(s.type==="choice"||s.type==="boolean"){var u=s.type==="choice"?s.choices:["Off","On"];d.step=null,d.options=u.map(function(p,f){return{value:f,label:p}}),d.format={fmt:"option"}}else{var c=s.units?/^[%°×]/.test(s.units)?s.units:" "+s.units:"";d.format={fmt:"fixed",div:1,add:0,digits:yf(s.discreteStep),suffix:c}}return s.more&&(d.more=!0),d}),i={type:Er(n.id),label:n.name,dials:r,plugin:{id:n.id,version:n.version,author:n.author,licence:n.licence,engine:"plugin:"+n.id+"@"+n.version,idBase:n.id.split(".").pop(),url:typeof a.url=="string"?a.url:"",listed:a.listed===!0}};return n.description&&(i.note=n.description),n.website&&(i.plugin.website=n.website),i}function _c(e,t){var n=Sr(e);if(!n.ok)throw new Error("nc-fx plugin: "+n.errors.join("; "));var a=oe(Er(n.manifest.id));if(a&&a.plugin.version!==n.manifest.version)throw new Error("nc-fx plugin: "+n.manifest.id+" "+a.plugin.version+" is already loaded on this page; reload to use "+n.manifest.version);if(a)return a;var r=vf(n.manifest,t);return Wh(r),r}async function jc(e){var t=globalThis.crypto&&globalThis.crypto.subtle;if(!t)throw new Error("nc-fx plugin: no WebCrypto here (integrity needs a secure context: https or localhost)");for(var n=new Uint8Array(await t.digest("SHA-256",e)),a="",r=0;r<n.length;r++)a+=String.fromCharCode(n[r]);return"sha256-"+btoa(a)}function wf(e){if(e.protocol!=="https:"&&!(e.protocol==="http:"&&/^(localhost|127\.0\.0\.1|\[::1\])$/.test(e.hostname)))throw new Error("nc-fx plugin: load plugins over https (http only from localhost): "+e.href)}async function Ps(e,t,n,a){var r=await t(e,{credentials:"omit",cache:"no-cache"});if(!r.ok)throw new Error("nc-fx plugin: "+a+" "+e+" answered "+r.status);var i=new Uint8Array(await r.arrayBuffer());if(n){var s=await jc(i);if(s!==n)throw new Error("nc-fx plugin: "+a+" "+e+" does not match the registry (expected "+n+", got "+s+")")}return new TextDecoder().decode(i)}var La=typeof WeakMap=="function"?new WeakMap:null;function qc(e,t){var n=new Error("nc-fx plugin: "+e.name+" "+t+" is already loaded on this page. Reload the page to use "+e.version+".");return n.reload=!0,n}async function Vc(e,t,n,a,r){var i=t.id+"@"+t.version,s=La&&La.get(e);!s&&La&&(s={},La.set(e,s));var l=s&&s[i];if(l){var d=await l,u=await n();return{stale:u!==d}}var c=(async function(){var p=await n();await Qc(e,r);var f=URL.createObjectURL(new Blob([ff(p)+`
//# sourceURL=`+a+`
`],{type:"text/javascript"}));try{await e.audioWorklet.addModule(f)}finally{URL.revokeObjectURL(f)}return p})();return s&&(s[i]=c,c.catch(function(){delete s[i]})),await c,{stale:!1}}async function Hc(e,t,n){var a=n||{},r=new URL(String(t),a.base||(typeof location<"u"?location.href:void 0));wf(r);var i=a.fetch||globalThis.fetch.bind(globalThis),s=a.integrity||{},l=await Ps(r.href,i,s.manifest,"plugin.json"),d;try{d=JSON.parse(l)}catch{throw new Error("nc-fx plugin: "+r.href+" is not JSON")}var u=Sr(d);if(!u.ok)throw new Error("nc-fx plugin: "+r.href+": "+u.errors.join("; "));var c=u.manifest;if(a.expect&&(a.expect.id&&a.expect.id!==c.id||a.expect.version&&a.expect.version!==c.version))throw new Error("nc-fx plugin: "+r.href+" is "+c.id+" "+c.version+", not what the registry lists");var p=oe(Er(c.id));if(p&&p.plugin.version!==c.version)throw qc(c,p.plugin.version);var f=new URL(c.dsp,r),b=await Vc(e,c,function(){return Ps(f.href,i,s.dsp,"DSP file")},f.href,a.moduleUrl),m=_c(c,{url:r.href,listed:a.listed===!0});return{entry:m,manifest:c,url:r.href,stale:b.stale}}var xf=256*1024;async function Rs(e,t,n){var a=n||{},r=t||{},i=r.manifest;if(typeof i=="string")try{i=JSON.parse(i)}catch{throw new Error("nc-fx plugin: plugin.json is not JSON")}var s=Sr(i);if(!s.ok)throw new Error("nc-fx plugin: plugin.json: "+s.errors.join("; "));var l=s.manifest;if(typeof r.dsp!="string"||!r.dsp.trim())throw new Error("nc-fx plugin: "+l.name+" needs its DSP file, "+l.dsp);if(typeof r.dspName=="string"&&r.dspName!==l.dsp)throw new Error("nc-fx plugin: plugin.json names its DSP file "+l.dsp+", not "+r.dspName);if(new TextEncoder().encode(r.dsp).length>xf)throw new Error("nc-fx plugin: "+l.dsp+" is over 256 KB");var d=typeof a.url=="string"&&a.url?a.url:"local:"+l.id,u=oe(Er(l.id));if(u&&u.plugin.version!==l.version)throw qc(l,u.plugin.version);var c=r.dsp,p=await Vc(e,l,async function(){return c},d.replace(/[^A-Za-z0-9:._@\/-]/g,"_")+"/"+l.dsp,a.moduleUrl),f=_c(l,{url:d,listed:!1});return{entry:f,manifest:l,url:d,stale:p.stale}}function kf(e){var t=[];if(!Yn(e)||e.v!==1||!Array.isArray(e.plugins))return{ok:!1,errors:['registry: { "v": 1, "plugins": [...] }'],registry:{v:1,plugins:[]}};var n=[],a={};return e.plugins.forEach(function(r,i){var s="plugins["+i+"]",l=[];if(!Yn(r)){t.push(s+": must be an object");return}if((typeof r.id!="string"||!zc.test(r.id))&&l.push("id"),Bt(r.name,40)||l.push("name"),(typeof r.version!="string"||!Oc.test(r.version))&&l.push("version"),Bt(r.author,80)||l.push("author"),(typeof r.licence!="string"||!Bc.test(r.licence))&&l.push("licence"),(typeof r.manifest!="string"||!r.manifest)&&l.push("manifest"),(!Yn(r.integrity)||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(r.integrity.manifest||"")||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(r.integrity.dsp||""))&&l.push("integrity"),(typeof r.checked!="string"||!/^\d{4}-\d{2}-\d{2}/.test(r.checked))&&l.push("checked"),a[r.id]&&l.push("id (listed twice)"),l.length){t.push(s+": bad "+l.join(", "));return}a[r.id]=!0;var d={id:r.id,name:r.name,version:r.version,author:r.author,licence:r.licence,manifest:r.manifest,integrity:{manifest:r.integrity.manifest,dsp:r.integrity.dsp},checked:r.checked};typeof r.description=="string"&&(d.description=r.description.slice(0,200)),n.push(d)}),{ok:t.length===0,errors:t,registry:{v:1,plugins:n}}}async function $f(e,t){var n=t||{},a=new URL(String(e),n.base||(typeof location<"u"?location.href:void 0)),r=await(n.fetch||globalThis.fetch.bind(globalThis))(a.href,{credentials:"omit",cache:"no-cache"});if(!r.ok)throw new Error("nc-fx plugins: the registry "+a.href+" answered "+r.status);var i=kf(await r.json());return{registry:i.registry,url:a.href,errors:i.errors}}function Sf(e,t,n,a){return Hc(e,new URL(t.manifest,n).href,Object.assign({},a,{integrity:t.integrity,listed:!0,expect:{id:t.id,version:t.version}}))}function Ef(e,t){var n=t||{},a=n.stallMs>0?n.stallMs:1500,r=n.everyMs>0?n.everyMs:250,i=n.now||function(){return typeof performance<"u"?performance.now():Date.now()},s=n.setInterval||setInterval,l=n.clearInterval||clearInterval,d=e.currentTime,u=i(),c=0,p=!1,f=s(function(){var b=i(),m=b-u,w=e.currentTime;if(u=b,e.state!=="running"||w!==d){d=w,c=0,p&&e.state==="running"&&(p=!1,n.onResume&&n.onResume());return}if(m>4*r){c=0;return}c+=m,!p&&c>=a&&(p=!0,n.onStall&&n.onStall({frozenMs:c,at:w}))},r);return{stop:function(){l(f)},stalled:function(){return p}}}var Af=["hard","pump","swell","blip","glide"],Mf=["Hard","Pump","Swell","Blip","Glide"],Uc=16;function Ze(e){for(var t=[],n=0;n<Uc;n++)t.push(e[n%e.length]);return t}var $n=[{name:"Ducker",note:"The four-on-the-floor duck: every beat dips and comes back.",dials:{rate:4,steps:8,swing:0,depth:90,mode:0},levels:Ze([100]),shapes:Ze([1])},{name:"Tide",note:"One slow breath a bar.",dials:{rate:8,steps:16,swing:0,depth:85,mode:0},levels:Ze([15,35,60,85,100,85,60,35]),shapes:Ze([4])},{name:"Stutter",note:"A sixteenth gate with gaps.",dials:{rate:16,steps:16,swing:0,depth:100,mode:0},levels:[100,0,100,100,0,100,0,100,100,0,100,100,0,100,100,0],shapes:Ze([0])},{name:"Lope",note:"Swung eighths, short hits.",dials:{rate:8,steps:16,swing:50,depth:100,mode:0},levels:Ze([100,55,85,40,100,55,85,70]),shapes:Ze([3])},{name:"Embers",note:"Each eighth swells and cuts; the bar fades.",dials:{rate:8,steps:8,swing:0,depth:100,mode:0},levels:Ze([100,85,70,60,50,40,30,20]),shapes:Ze([2])},{name:"Sieve",note:"Filter mode: sixteenths open a low-pass, a climb at the end of the bar.",dials:{rate:16,steps:16,swing:0,depth:85,mode:1,res:35},levels:[100,20,55,25,95,25,60,35,100,20,55,25,70,80,90,100],shapes:[3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0]}],Tf="Ducker";function Gc(e){for(var t=String(e||"").toLowerCase(),n=0;n<$n.length;n++){var a=$n[n];if(a.name.toLowerCase()===t)return{name:a.name,dials:Object.assign({},a.dials),pattern:{levels:a.levels.slice(),shapes:a.shapes.slice()}}}return null}function Ds(e,t,n,a){return typeof e!="number"||!isFinite(e)?a:(e=Math.round(e),e<t?t:e>n?n:e)}function ma(e){for(var t=$n[0],n=e&&typeof e=="object"?e:{},a=Array.isArray(n.levels)?n.levels:[],r=Array.isArray(n.shapes)?n.shapes:[],i={levels:[],shapes:[]},s=0;s<Uc;s++)i.levels.push(Ds(a[s],0,100,t.levels[s])+0),i.shapes.push(Ds(r[s],0,Af.length-1,t.shapes[s])+0);return i}function Lf(e){var t=ma(e),n=[],a,r,i;for(a=0;a<4;a++){for(i=0,r=3;r>=0;r--)i=i*101+t.levels[a*4+r];n.push([10+a,i])}for(a=0;a<2;a++){for(i=0,r=7;r>=0;r--)i=i*5+t.shapes[a*8+r];n.push([14+a,i])}return n}function Cf(e){if(!e||!e.dials)return"Custom";for(var t=ma(e.pattern),n=0;n<$n.length;n++){var a=$n[n],r=!0,i;for(i in a.dials)e.dials[i]!==a.dials[i]&&(r=!1);var s=a.dials.steps;for(i=0;r&&i<s;i++)(t.levels[i]!==a.levels[i]||t.shapes[i]!==a.shapes[i])&&(r=!1);if(r)return a.name}return"Custom"}function Wc(e){var t=e&&e.steps===8?8:16;return e&&e.rate===12&&t>12?12:t}function Nf(e,t,n){var a=e&&(e.rate===4||e.rate===8||e.rate===12)?e.rate:16,r=e&&e.steps===8?8:16,i=4/a,s=+t||0;if(a===12){var l=n>0?n:4;s-=Math.floor(s/l)*l}var d=.5+.25*(e&&typeof e.swing=="number"?e.swing:0)/100,u=s/i*.5,c=Math.floor(u),p=u-c,f=(c%16+16)%16,b=p<d?f*2:f*2+1;return b&r-1}function Ff(e,t,n,a){for(var r=ma(t),i=e&&e.steps===8?8:16,s=Wc(e),l=(n%i+i)%i,d=l+1>=s?0:l+1,u=r.levels[l]/100,c=r.levels[d]/100,p=r.shapes[l],f=[],b=a>0?a:24,m=0;m<=b;m++){var w=m/b,h,g;switch(p){case 1:g=w*1.6667,g>1&&(g=1),h=u*g*(2-g);break;case 2:h=u*w*w;break;case 3:h=w<.12?u:u*Math.exp((.12-w)*18);break;case 4:g=w*w*(3-2*w),h=u+(c-u)*g;break;default:h=u}f.push(h)}return f}var If=2,nr=3,zs=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function _t(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var Pf=/^local:[A-Za-z0-9._@-]{1,200}$/,Rf=/^\d+\.\d+\.\d+$/;function Df(e,t){var n=_t(e)?e:{},a=t.slice(7),r={id:a,version:typeof n.version=="string"&&Rf.test(n.version)?n.version:"0.0.0",url:"",name:a};return typeof n.url=="string"&&n.url.length<=2048&&(/^https?:\/\//.test(n.url)||Pf.test(n.url))&&(r.url=n.url),typeof n.name=="string"&&n.name.trim()&&(r.name=n.name.trim().slice(0,40)),r}function Kc(e){var t=e.plugin;return{id:t.id,version:t.version,url:t.url,name:e.label}}function zf(e){var t={},n=0;if(_t(e))for(var a in e)n<16&&/^[a-z][a-z0-9_]{0,31}$/.test(a)&&typeof e[a]=="number"&&isFinite(e[a])&&(t[a]=e[a],n++);return t}function Of(e){return e.plugin?e.plugin.idBase:e.type}function Yc(e,t){var n=oe(e);if(!n)return null;var a={};(t||[]).forEach(function(u){u&&u.id&&(a[u.id]=!0)});for(var r=1,i=Of(n);a[i+"-"+r];)r++;var s={};n.dials.forEach(function(u){s[u.key]=u.default});var l={id:i+"-"+r,type:n.type,bypass:!1,dials:s};if(n.plugin&&(l.plugin=Kc(n)),n.pattern){var d=Gc(Tf);Object.assign(l.dials,d.dials),l.pattern=d.pattern}return l}function Bf(e){var t=oe(e.type),n=/-(\d+)$/.exec(e.id||""),a=t?t.label:e.plugin&&e.plugin.name?e.plugin.name:e.type;return a+(n&&+n[1]>1?" "+n[1]:"")}function _f(e,t,n){var a=e.length-1,r=Math.max(0,Math.min(a,n));if(t<0||t>a||t===r)return e;var i=e.slice(),s=i.splice(t,1)[0];return i.splice(r,0,s),i}function jf(e){return typeof e=="number"&&isFinite(e)?nf(e):e}function Os(e,t,n){var a={};return e.dials.forEach(function(r){var i=t[r.key];i===void 0&&r.astridKey&&(i=t[r.astridKey]),n&&e.type==="delay"&&r.key==="delay_beats"&&(i=jf(i)),a[r.key]=e.plugin?ot(r,i,r.step):ot(r,i)}),e.dials.forEach(function(r){r.stepWhen&&(a[r.key]=ot(r,typeof t[r.key]=="number"?t[r.key]:a[r.key],kn(r,a)))}),a}function qf(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,r=1/0,i=e.min;i<=e.max;i++){var s=un(n.law,i),l=s===null?1/0:Math.abs(s-t);l<r&&(r=l,a=i)}return a}}var Vf={rate:"rate_hz"};function Hf(e,t,n,a){var r={};return e.dials.forEach(function(i){if(!i.more){var s=i.astridKey||Vf[i.key]||i.key;r[i.key]=qf(i,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function Uf(e,t){var n=t>0?Math.floor(t):nr,a=[],r=[],i=[],s=!1,l=!1;Array.isArray(e)?(i=e,l=!0):_t(e)&&Array.isArray(e.chain)&&(i=e.chain,s=e.v===1,l=e.schema===2);for(var d=[],u=0;u<i.length;u++){var c=i[u];if(_t(c)&&!(c.type==="limiter"||c.fixed===!0)){var p=yo(c.type),f=p&&oe(p);if(!f&&!s&&Pc(c.type)){if(d.length>=n){a.push(c.id||c.type);continue}for(var b=Df(c.plugin,c.type),m=b.id.split(".").pop(),w=1;d.some(function(y){return y.id===m+"-"+w});)w++;var h=typeof c.id=="string"&&zs.test(c.id)&&!d.some(function(y){return y.id===c.id})?c.id:m+"-"+w;d.push({id:h,type:c.type,bypass:c.bypass===!0,dials:zf(c.dials),plugin:b});continue}if(!f||s&&["drive","delay","plate"].indexOf(p)<0){typeof c.type=="string"&&a.push(c.type);continue}if(d.length>=n){a.push(c.id||p);continue}var g;_t(c.params)&&!_t(c.dials)?g=Os(f,Hf(f,c.params,r,c.id||p),l):g=Os(f,_t(c.dials)?c.dials:{},l);var x=Yc(p,d),v=typeof c.id=="string"&&zs.test(c.id)&&!d.some(function(y){return y.id===c.id})?c.id:x.id,A=s?c.bypass!==!1:c.bypass===!0,T={id:s?x.id:v,type:p,bypass:A,dials:g};f.plugin&&(T.plugin=Kc(f)),f.pattern&&(T.pattern=ma(c.pattern)),d.push(T)}}return{state:{v:If,chain:d},dropped:a,notes:r}}function Gt(e,t){return Uf(e,t).state}function ht(e){var t=oe(e.type),n=[[0,e.bypass?0:1]];return t&&(t.dials.forEach(function(a){n.push([a.k,Qa(a,e.dials[a.key])])}),t.pattern&&(n=n.concat(Lf(e.pattern)))),n}function Gf(e){var t=Gt(e,8),n=[],a=t.chain.filter(function(r){if(r.plugin)return n.push(r.id+": ASTRID has no plugins"),!1;var i=oe(r.type);return i&&i.own?(n.push(r.id+": ASTRID has no "+i.label),!1):!0}).map(function(r,i){var s=oe(r.type),l={};return i>=nr&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(d){var u=r.dials[d.key];if(d.more){u!==d.default&&n.push(r.id+"."+d.key);return}d.key==="delay_beats"&&Ei.indexOf(u)<0&&n.push(r.id+".delay_beats"),l[d.astridKey||d.key]=u}),{id:r.id,type:r.type,bypass:r.bypass,dials:l}});return{hacks:a,lossy:n}}var Wf=150,Kf=6e3,Yf=18,Xc=6.283185307179586;function Ar(e,t,n){return e<t?t:e>n?n:e}function Xf(e,t,n,a,r){var i=Math.pow(10,n/40),s=Xc*t/r,l=Math.cos(s),d=Math.sin(s),u,c,p,f,b,m,w,h;if(e===0||e===2){w=d/2*Math.SQRT2,h=2*Math.sqrt(i)*w;var g=e===0?1:-1;u=i*(i+1-g*(i-1)*l+h),c=g*2*i*(i-1-g*(i+1)*l),p=i*(i+1-g*(i-1)*l-h),f=i+1+g*(i-1)*l+h,b=-g*2*(i-1+g*(i+1)*l),m=i+1+g*(i-1)*l-h}else w=d/(2*a),u=1+w*i,c=-2*l,p=1-w*i,f=1+w/i,b=-2*l,m=1-w/i;return[u/f,c/f,p/f,b/f,m/f]}function Jf(e,t,n){var a=Xc*t/n,r=Math.cos(a),i=Math.sin(a),s=Math.cos(2*a),l=Math.sin(2*a),d=e[0]+e[1]*r+e[2]*s,u=-(e[1]*i+e[2]*l),c=1+e[3]*r+e[4]*s,p=-(e[3]*i+e[4]*l);return 10*Math.log10((d*d+u*u)/(c*c+p*p))}var Bs={};function It(e){return Bs[e]||(Bs[e]=Xh("eq",e))}function dn(e,t){var n=It(t),a=e&&typeof e[t]=="number"&&isFinite(e[t])?e[t]:n.default;return Ar(a,n.min,n.max)}function Jc(e){return[{id:"low",kind:0,hz:Wf,db:dn(e,"low_db"),q:Math.SQRT1_2},{id:"mid",kind:1,hz:Qa(It("mid_hz"),dn(e,"mid_hz")),db:dn(e,"mid_db"),q:Qa(It("mid_q"),dn(e,"mid_q"))},{id:"high",kind:2,hz:Kf,db:dn(e,"high_db"),q:Math.SQRT1_2}]}function Qf(e,t,n){for(var a=Jc(e),r=n.length,i=new Float64Array(r),s=[],l=t/2,d=0;d<a.length;d++){var u=a[d],c=new Float64Array(r);if(u.db!==0)for(var p=Xf(u.kind,u.hz,u.db,u.q,t),f=0;f<r;f++){var b=n[f]<l?n[f]:l*.9999;c[f]=Jf(p,b,t),i[f]+=c[f]}s.push(c)}return{total:i,bands:s}}function Zf(e){var t=It("mid_hz").dsp.law;return Ar(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}function em(e){var t=It("mid_q").dsp.law;return Ar(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}var ar={low:"low_db",mid:"mid_db",high:"high_db"},tm={low:"Low",mid:"Mid",high:"High"};function nm(e,t,n){var a=[];function r(i,s){var l=It(i),d=l.step||1;s=Ar(Math.round(s/d)*d,l.min,l.max),s===0&&(s=0),s!==dn(e,i)&&a.push([i,s])}return typeof n.db=="number"&&ar[t]&&r(ar[t],n.db),t==="mid"&&typeof n.hz=="number"&&n.hz>0&&r("mid_hz",Zf(n.hz)),t==="mid"&&typeof n.q=="number"&&n.q>0&&r("mid_q",em(n.q)),a}function am(e){var t=e==="mid"?["mid_db","mid_hz","mid_q"]:ar[e]?[ar[e]]:[];return t.map(function(n){return[n,It(n).default]})}var Ca=typeof WeakMap=="function"?new WeakMap:null;function rm(e){var t=e&&e.output;if(!t||!t.context||typeof t.context.createAnalyser!="function")return null;var n=Ca&&Ca.get(e);return n||(n={node:null,users:0,handle:null},n.handle={open:function(){return e.status==="disposed"?null:(n.node||(n.node=t.context.createAnalyser(),n.node.fftSize=4096,n.node.smoothingTimeConstant=.8,n.node.minDecibels=-110,n.node.maxDecibels=0),n.users++===0&&t.connect(n.node),n.node)},close:function(){if(n.users!==0&&--n.users===0&&n.node)try{t.disconnect(n.node)}catch{}}},Ca&&Ca.set(e,n)),n.handle}function im(e,t,n){var a=n||{},r={};["low_db","mid_db","mid_hz","mid_q","high_db"].forEach(function(c){var p=e&&typeof e.getParam=="function"?e.getParam(t,c):void 0;r[c]=typeof p=="number"?p:It(c).default});var i=e&&e.output&&e.output.context,s=a.sampleRate||i&&i.sampleRate||48e3,l=a.help||{},d=Jc(r).map(function(c){var p=(c.db>0?"+":c.db<0?"−":"")+Math.abs(c.db)+" dB",f=c.hz>=1e3?(c.hz/1e3).toFixed(c.hz>=1e4?0:1)+" kHz":Math.round(c.hz)+" Hz";return{id:c.id,label:tm[c.id],kind:c.kind===0?"lowshelf":c.kind===1?"peak":"highshelf",hz:c.hz,db:c.db,q:c.q,moveHz:c.id==="mid",moveQ:c.id==="mid",minHz:c.id==="mid"?200:c.hz,maxHz:c.id==="mid"?5e3:c.hz,minQ:.3,maxQ:6,valueText:c.id==="mid"?p+" at "+f+", Q "+c.q.toFixed(1):p+(c.id==="low"?", shelf below ":", shelf above ")+f,help:l[c.id]}}),u=function(c){for(var p=0;p<c.length;p++)a.set(c[p][0],c[p][1])};return{type:"eqGraph",id:a.id,label:a.label||"EQ curve",range:Yf,sampleRate:s,on:a.on!==!1,bands:d,help:l.graph,response:function(c){return Qf(r,s,c)},spectrum:a.spectrum===!1?void 0:rm(e)||void 0,onBand:function(c,p){u(nm(r,c,p))},onReset:function(c){u(am(c).filter(function(p){return p[1]!==r[p[0]]}))}}}var om="nc-fx@1",sm=600,lm=256,cm=8,zn=typeof WeakMap=="function"?new WeakMap:null;function Qc(e,t){var n=zn&&zn.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await jh(async()=>{const{default:i}=await import("./worklet-source-DgIhZ4lI.js");return{default:i}},[])).default,r=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),zn&&(zn.set(e,n),n.catch(function(){zn.delete(e)})),n)}function ft(e,t){return typeof e=="number"&&isFinite(e)?e:t}function Zc(e,t,n,a){var r=Math.min(400,Math.max(20,ft(t.bpm,120))),i=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",d=ft(t.preGain,1),u=Math.max(0,ft(t.crossfade,.012)),c=ft(t.maxDelaySeconds,void 0),p=e.createGain(),f=e.createGain(),b=e.createGain(),m=e.createGain(),w=null;t.modInput===!0&&(w=e.createGain(),w.channelCount=1,w.channelCountMode="explicit",w.channelInterpretation="discrete"),m.gain.value=0,p.connect(b),b.connect(f),m.connect(f);var h={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r,mUsers:0,lv:null,lvAt:0,clk:null},g=n(r);h.post=function(y){h.node?h.node.port.postMessage(y):h.disposed||(i.length>=lm&&(i=a().concat([{t:"tempo",bpm:h.bpm,when:0}]),h.mUsers>0&&i.push({t:"meter",on:!0})),i.push(y))};function x(y){var k=i.map(function(E){var $=Object.assign({},E);return $.when>y||($.when=0,$.t!=="clear"&&($.snap=!0)),$});return i=[],k}h.emit=function(y){for(var k=0;k<h.listeners.length;k++)try{h.listeners[k](y)}catch(E){typeof console<"u"&&console.error(E)}},h.whenOf=function(y){return typeof y=="number"&&isFinite(y)&&y>0?y:0};var v=!1;h.tooFar=function(y){return typeof y=="number"&&y>e.currentTime+sm?(!v&&typeof console<"u"&&(v=!0,console.warn("nc-fx: ignoring a time "+Math.round(y-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var A=Qc(e,t.moduleUrl).then(function(){if(!h.disposed){var y=Object.assign({bpm:r,bypassMode:l,limiter:s,preGain:d,maxDelaySeconds:c},g);y.pending=x(e.currentTime),h.node=new AudioWorkletNode(e,om,{numberOfInputs:w?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:y}),h.node.port.onmessage=function(E){var $=E.data;if($&&$.t==="lv"&&h.mUsers>0)h.lv=$.d,h.lvAt=_s();else if($&&$.t==="clk"&&$.d)h.clk={beat:$.d[0],frame:$.d[1],perFrame:$.d[2],locked:$.d[3]===1,bar:$.d[4]||4};else if($&&$.t==="perr"&&h.onPluginError&&$.d)for(var L=0;L<($.n|0);L++)h.onPluginError($.d[2*L],$.d[2*L+1])},p.connect(h.node),w&&w.connect(h.node,0,1),h.node.connect(m);var k=e.currentTime;k<=0||u===0?(b.gain.value=0,m.gain.value=1):(b.gain.setValueAtTime(1,k),b.gain.linearRampToValueAtTime(0,k+u),m.gain.setValueAtTime(0,k),m.gain.linearRampToValueAtTime(1,k+u)),h.status="ready"}},function(y){h.status="unavailable",i=[],h.error=y});h.meterOpen=function(){return h.disposed||h.status==="unavailable"?!1:(h.mUsers++===0&&h.post({t:"meter",on:!0}),!0)},h.meterClose=function(){h.mUsers!==0&&--h.mUsers===0&&(h.lv=null,h.disposed||h.post({t:"meter",on:!1}))},h.levels=function(){return h.lv&&_s()-h.lvAt<dm?h.lv:null};var T={};return h.meter=function(y,k){if(T[y])return T[y];var E=0,$={in:0,out:0},L={open:function(){return h.meterOpen()?(E++,!0):!1},close:function(){E!==0&&(E--,h.meterClose())},read:function(){var N=E>0?h.levels():null;return $.in=0,$.out=0,N&&k(N,$),$}};return T[y]=L,L},h.core={input:p,output:f,modInput:w,ready:A,get status(){return h.status},get error(){return h.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function(y,k){var E=ft(y,NaN);!(E>0)||h.disposed||h.tooFar(k)||(h.bpm=Math.min(400,Math.max(20,E)),h.post({t:"tempo",bpm:h.bpm,when:h.whenOf(k)}),h.emit({effect:null,key:"tempo",value:h.bpm}))},getTempo:function(){return h.bpm},setBeat:function(y,k){var E=ft(y,NaN);E!==E||h.disposed||h.tooFar(k)||h.post({t:"beat",beat:E,when:h.whenOf(k)})},freeRun:function(y){h.disposed||h.tooFar(y)||h.post({t:"free",when:h.whenOf(y)})},setBar:function(y,k){var E=Math.round(ft(y,NaN));!(E>=1&&E<=16)||h.disposed||h.tooFar(k)||h.post({t:"bar",beats:E,when:h.whenOf(k)})},beatAt:function(y){var k=h.clk;if(!k)return null;var E=typeof y=="number"&&isFinite(y)?y:e.currentTime;return{beat:k.beat+(E*e.sampleRate-k.frame)*k.perFrame,bpm:k.perFrame*60*e.sampleRate,locked:k.locked,beatsPerBar:k.bar}},clear:function(y){var k=y&&typeof y=="object"?y:{at:y};if(!(h.disposed||h.tooFar(k.at))){var E=ft(k.fadeMs,0);h.post({t:"clear",when:h.whenOf(k.at),fadeMs:E>0?Math.min(1e3,E):0})}},onChange:function(y){return h.listeners.push(y),function(){var k=h.listeners.indexOf(y);k>=0&&h.listeners.splice(k,1)}},dispose:function(){if(!h.disposed){if(h.disposed=!0,h.status="disposed",i=[],h.listeners.length=0,h.node){h.node.port.postMessage({t:"dispose"}),h.node.port.close();try{h.node.disconnect()}catch{}}[p,b,m,f,w].forEach(function(y){try{y&&y.disconnect()}catch{}})}}},h}var dm=250;function _s(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function ed(e,t){t.in=e[0],t.out=e[1]}function Yr(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function Xr(e,t){var n=t||{};if(n.slots)return um(e,n);var a=er(n.state),r=Array.from(Gr(a)),i=Zc(e,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(Gr(a)),when:0}]}),s=i.core;function l(d){return a.chain[kr.indexOf(d)]}return s.setParam=function(d,u,c,p){var f=Za(d);if(!(!f||i.disposed||i.tooFar(p))){var b=l(f),m;if(u==="bypass")m=!!c;else{var w=Dc(f,u);if(!w)return;m=ot(w,c,kn(w,b.dials))}return u==="bypass"?b.bypass=m:b.dials[u]=m,i.post({t:"p",i:Ai[f][u],v:Mi(f,u,m),when:i.whenOf(p)}),i.emit({effect:f,key:u,value:m}),$r(f).dials.forEach(function(h){if(!(!h.stepWhen||!h.stepWhen.some(function(v){return v.key===u}))){var g=b.dials[h.key],x=ot(h,g,kn(h,b.dials));x!==g&&(b.dials[h.key]=x,i.post({t:"p",i:Ai[f][h.key],v:Mi(f,h.key,x),when:i.whenOf(p)}),i.emit({effect:f,key:h.key,value:x}))}}),m}},s.meter=function(){return i.meter("",ed)},s.getParam=function(d,u){var c=Za(d);if(c){var p=l(c);return u==="bypass"?p.bypass:p.dials[u]}},s.getState=function(){return of(a)},s.setState=function(d,u){i.disposed||i.tooFar(u&&u.at)||(a=er(d),i.post({t:"load",program:Array.from(Gr(a)),when:i.whenOf(u&&u.at)}),i.emit({effect:null,key:null,value:null}))},s}function um(e,t){var n=t.slots===!0?nr:Math.max(1,Math.min(cm,Math.floor(+t.slots)||nr)),a=Gt(t.state,n),r=1,i={},s={};function l(y){return!Pc(y.type)||oe(y.type)!==null}function d(y){var k=oe(y.type);return k&&k.plugin?k.plugin.engine:y.type}function u(y){return i[y.id]||(i[y.id]=r++),i[y.id]}function c(y){return y.filter(l).map(function(k){return{uid:u(k),type:d(k),program:ht(k)}})}function p(){return a.chain.filter(l).map(function(y){return i[y.id]})}var f=c(a.chain),b=p(),m=Zc(e,t,function(){return{slots:n,chain:f,order:b}},function(){return[{t:"sync",chain:c(a.chain),order:p(),when:0}]}),w=m.core;m.onPluginError=function(y,k){for(var E in i)i[E]===y&&(s[E]=k,m.emit({effect:E,key:"error",value:k}))};function h(y){var k;for(k=0;k<a.chain.length;k++)if(a.chain[k].id===y)return a.chain[k];var E=yo(y);if(E){for(k=0;k<a.chain.length;k++)if(a.chain[k].type===E)return a.chain[k]}return null}function g(y,k){var E=u(y);m.post({t:"add",uid:E,type:d(y),when:k}),ht(y).forEach(function($){m.post({t:"ps",uid:E,k:$[0],v:$[1],when:k,snap:!0})})}function x(y){m.post({t:"order",uids:p(),when:y})}function v(y,k){var E={};a.chain.forEach(function(N){E[N.id]=N});var $=p().join();y.chain.forEach(function(N){var _=E[N.id];if(!l(N)){delete i[N.id];return}if(!_||_.type!==N.type||!i[N.id]){delete i[N.id],delete s[N.id],g(N,k);return}var V={};ht(_).forEach(function(K){V[K[0]]=K[1]}),ht(N).forEach(function(K){V[K[0]]!==K[1]&&m.post({t:"ps",uid:i[N.id],k:K[0],v:K[1],when:k})})});var L={};y.chain.forEach(function(N){L[N.id]=!0}),Object.keys(i).forEach(function(N){L[N]||delete i[N]}),Object.keys(s).forEach(function(N){L[N]||delete s[N]}),a=y,p().join()!==$&&x(k)}var A=Yh(function(y){if(!(m.disposed||!a.chain.some(function(E){return E.type===y}))){var k=JSON.parse(JSON.stringify(a));k.chain=k.chain.map(function(E){return E.type===y?Gt({v:2,chain:[E]},1).chain[0]:E}),v(k,0),m.emit({effect:null,key:"plugin",value:y})}}),T=w.dispose;return w.dispose=function(){A(),T()},w.slots=n,w.meter=function(y){return y==null||y===""?m.meter("",ed):m.meter("#"+y,function(k,E){var $=h(y),L=$?i[$.id]:0,N=k[2];if(L){for(var _=3,V=0;V<N;V++,_+=3)if(k[_]===L){E.in=k[_+1],E.out=k[_+2];return}}})},w.setParam=function(y,k,E,$){var L=h(y);if(!(!L||m.disposed||m.tooFar($))){var N=oe(L.type),_,V=null;if(!N)return k!=="bypass"?void 0:(L.bypass=!!E,m.emit({effect:L.id,key:k,value:L.bypass}),L.bypass);if(k==="bypass")_=!!E;else{for(var K=0;K<N.dials.length;K++)N.dials[K].key===k&&(V=N.dials[K]);if(!V)return;_=ot(V,E,kn(V,L.dials))}var ne={},be={};ht(L).forEach(function(Y){ne[Y[0]]=Y[1]}),N.dials.forEach(function(Y){Y.stepWhen&&(be[Y.key]=L.dials[Y.key])}),k==="bypass"?L.bypass=_:L.dials[k]=_,N.dials.forEach(function(Y){Y.stepWhen&&(L.dials[Y.key]=ot(Y,L.dials[Y.key],kn(Y,L.dials)))});var ce=m.whenOf($),se=i[L.id];return se&&ht(L).forEach(function(Y){(ne[Y[0]]!==Y[1]||V&&Y[0]===V.k)&&m.post({t:"ps",uid:se,k:Y[0],v:Y[1],when:ce})}),m.emit({effect:L.id,key:k,value:_}),Object.keys(be).forEach(function(Y){Y!==k&&L.dials[Y]!==be[Y]&&m.emit({effect:L.id,key:Y,value:L.dials[Y]})}),_}},w.getParam=function(y,k){var E=h(y);if(E)return k==="bypass"?E.bypass:E.dials[k]},w.setPattern=function(y,k,E){var $=h(y);if(!(!$||!$.pattern||m.disposed||m.tooFar(E))){var L=k&&typeof k=="object"?k:{},N=ma({levels:Array.isArray(L.levels)?L.levels:$.pattern.levels,shapes:Array.isArray(L.shapes)?L.shapes:$.pattern.shapes}),_={};ht($).forEach(function(ne){_[ne[0]]=ne[1]}),$.pattern=N;var V=i[$.id],K=m.whenOf(E);return V&&ht($).forEach(function(ne){_[ne[0]]!==ne[1]&&m.post({t:"ps",uid:V,k:ne[0],v:ne[1],when:K})}),m.emit({effect:$.id,key:"pattern",value:JSON.parse(JSON.stringify(N))}),JSON.parse(JSON.stringify(N))}},w.getPattern=function(y){var k=h(y);return k&&k.pattern?JSON.parse(JSON.stringify(k.pattern)):void 0},w.setGatePattern=function(y,k,E){var $=h(y),L=Gc(k);return!$||!$.pattern||!L||m.disposed||m.tooFar(E)?!1:(Object.keys(L.dials).forEach(function(N){w.setParam($.id,N,L.dials[N],E)}),w.setPattern($.id,L.pattern,E),!0)},w.getState=function(){return JSON.parse(JSON.stringify(a))},w.setState=function(y,k){m.disposed||m.tooFar(k&&k.at)||(v(Gt(y,n),m.whenOf(k&&k.at)),m.emit({effect:null,key:null,value:null}))},w.addEffect=function(y,k){var E=k||{},$=Yc(y,a.chain);if(!(!$||a.chain.length>=n||m.disposed||m.tooFar(E.at))){if(E.dials){var L=Gt({v:2,chain:[{id:$.id,type:$.type,dials:E.dials}]},1).chain[0];$.dials=L.dials}E.bypass===!0&&($.bypass=!0);var N=a.chain.slice(),_=typeof E.index=="number"?Math.max(0,Math.min(N.length,E.index)):N.length;return N.splice(_,0,$),v({v:2,chain:N},m.whenOf(E.at)),m.emit({effect:$.id,key:"chain",value:"add"}),$.id}},w.removeEffect=function(y,k){var E=h(y),$=k&&k.at;return!E||m.disposed||m.tooFar($)?!1:(v({v:2,chain:a.chain.filter(function(L){return L!==E})},m.whenOf($)),m.emit({effect:E.id,key:"chain",value:"remove"}),!0)},w.moveEffect=function(y,k,E){var $=h(y),L=E&&E.at;if(!$||m.disposed||m.tooFar(L))return!1;var N=_f(a.chain,a.chain.indexOf($),k);return N===a.chain?!1:(v({v:2,chain:N},m.whenOf(L)),m.emit({effect:$.id,key:"chain",value:"move"}),!0)},w.getChain=function(){return a.chain.map(function(y){var k={id:y.id,type:y.type,name:Bf(y),bypass:y.bypass};if(y.plugin){var E=s[y.id]||0,$=!l(y)||E===5;k.plugin={id:y.plugin.id,version:y.plugin.version,url:y.plugin.url,name:y.plugin.name,status:$?"missing":E?"failed":"ready"},E&&!$&&(k.plugin.error=tr[E]||tr[2])}return k})},w.toAstrid=function(){return Gf(a)},w}function js(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function td(e,t,n){var a=n||{},r=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,i=typeof a.toAudioTime=="function"?a.toAudioTime:r?function(h){return r.toContextTime(h)}:t&&t.timebase==="shared"?null:function(h){return h},s=typeof a.now=="function"?a.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,l=t&&t.transport?t.transport:t,d=l&&l.tempo?l.tempo:l,u=!1;function c(h){if(!i){!u&&typeof console<"u"&&(u=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof h!="number")){var g=i(l.timeAt(h));return typeof g=="number"&&isFinite(g)?g:void 0}}function p(){var h=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(h)){var g=l&&typeof l.bpm=="number"?l.bpm:js(d,0);g>0&&e.setTempo(g);return}var x=js(d,h);x>0&&e.setTempo(x);for(var v=d&&(d.points||d.tempoPoints)||[],A=0;A<v.length;A++){var T=v[A];if(T.beat>h&&T.bpm>0){var y=c(T.beat);y!==void 0&&e.setTempo(T.bpm,y)}}}var f=typeof e.setBeat=="function";function b(){var h=l&&l.meter,g=h&&typeof h.beatsPerBar=="number"?h.beatsPerBar:0;f&&g>=1&&typeof e.setBar=="function"&&e.setBar(g)}function m(h){if(!(!i||typeof h!="number"||!isFinite(h))){var g=i(h);return typeof g=="number"&&isFinite(g)?g:void 0}}function w(){if(f){if(b(),!l||!l.running){e.freeRun();return}var h=s&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;isFinite(h)&&e.setBeat(h,c(h))}}return p(),w(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(h){h&&(h.kind==="tempo"&&h.bpm>0?e.setTempo(h.bpm,c(h.atBeat)):h.kind==="snapshot"?(p(),w()):h.kind==="start"?(p(),f&&typeof h.beat=="number"&&isFinite(h.beat)&&(b(),e.setBeat(h.beat,m(h.at)))):h.kind==="stop"&&f&&e.freeRun(m(h.at)))})}const Xn="/studio/assets/worklet-BuzpUTR0.js";var pm="nc-ui",hm={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},vo={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},rr={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},fm={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Mt={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},mm={light:{color:hm.color,semantic:vo,component:rr,runtime:fm},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},Hn=e=>`--${pm}-${e}`,Ti=vo["label-on-fill-dark"],qs=vo["label-on-fill-light"],gm=Mt["label-min-contrast"],bm=/^#[0-9a-f]{6}$/i,ym=e=>typeof e=="string"&&bm.test(e),Va=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Vs(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),r=i=>{let s=(i+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${Va(r(0)*255)}${Va(r(8)*255)}${Va(r(4)*255)}`}function nd(e){let[t,n,a]=[1,3,5].map(u=>parseInt(e.slice(u,u+2),16)/255),r=Math.max(t,n,a),i=Math.min(t,n,a),s=(r+i)/2,l=r-i;if(!l)return{h:0,s:0,l:s};let d=l/(1-Math.abs(2*s-1));return{h:((r===t?60*((n-a)/l%6):r===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:d,l:s}}function Hs(e){let[t,n,a]=[1,3,5].map(r=>{let i=parseInt(e.slice(r,r+2),16)/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function Li(e,t){let[n,a]=[Hs(e),Hs(t)].sort((r,i)=>i-r);return(n+.05)/(a+.05)}var ir=e=>Li(e,Ti)>=Li(e,qs)?Ti:qs;function ad(e,t,n,a=gm){let r=Vs(e,t,n),i=ir(r)===Ti?1:-1;for(let s=0;s<40&&Li(r,ir(r))<a;s++)n+=i*.01,r=Vs(e,t,n);return r}function vm(e){let{h:t,s:n}=nd(e),a=ad(t,Math.min(n,Mt["surprise-on-max-saturation"]),Mt["surprise-on-lightness"]);return{fill:e,ink:ir(e),on:a,onInk:ir(a)}}var wm=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function xm(e,t=Math.random){let[n,a]=Mt["surprise-saturation"],[r,i]=Mt["surprise-lightness"],s=Mt["surprise-min-hue-gap"],l=ym(e)?nd(e).h:null,d=t()*360;return l!==null&&wm(d,l)<s&&(d=(l+s+t()*(360-2*s))%360),ad(d,n+t()*(a-n),r+t()*(i-r))}function km(e){if(!e)return null;let t=vm(e);return{[Hn("surprise-fill")]:t.fill,[Hn("surprise-ink")]:t.ink,[Hn("surprise-on")]:t.on,[Hn("surprise-on-ink")]:t.onInk}}var $m=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Sm=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Us(e){let[t,n,a]=[1,3,5].map(l=>$m(parseInt(e.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),i=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*r+.793617785*i-.0040720468*s,1.9779984951*r-2.428592205*i+.4505937099*s,.0259040371*r+.7827717662*i-.808675766*s]}function Em([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,r=(e-.1055613458*t-.0638541728*n)**3,i=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*r+.2309699292*i,-1.2684380046*a+2.6097574011*r-.3413193965*i,-.0041960863*a-.7034186147*r+1.707614701*i].map(s=>Va(Sm(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Am=Mt["velocity-range"],rd={min:rr.rhythm["velocity-min"],max:rr.rhythm["velocity-max"]},Gs=Object.fromEntries(Object.entries(mm).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Mm(e,t=rd){let[n,a]=Am,r=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,i=(r-n)/(a-n),s=t.ink??rr.rhythm["step-cell-ink"];if(i<=0)return{velocity:r,t:0,fill:t.min.toUpperCase(),ink:s};if(i>=1)return{velocity:r,t:1,fill:t.max.toUpperCase(),ink:s};let l=Us(t.min),d=Us(t.max);return{velocity:r,t:i,fill:Em(l.map((u,c)=>u+(d[c]-u)*i)),ink:s}}function Ws(e,t=rd){return{[Hn("velocity-fill")]:Mm(e,t).fill}}var or="data-nc-theme",Ci="nc-ui-theme-change",Tm=Object.freeze(["system","light","dark"]),Lm="netcomposer.studio.theme.v1",Cm="(prefers-color-scheme: dark)",wo=e=>e?.documentElement??null,id=e=>e?.defaultView?.matchMedia?.(Cm)??null,xo=e=>e==="light"||e==="dark"?e:"system";function Nm(e=globalThis.document){return xo(wo(e)?.getAttribute(or))}function sr(e=globalThis.document){let t=Nm(e);return t!=="system"?t:id(e)?.matches?"dark":"light"}function ko(e,t=globalThis.document){let n=wo(t);if(!n)return"light";let a=xo(e);a==="system"?n.removeAttribute(or):n.setAttribute(or,a);let r=sr(t),i=t.defaultView?.CustomEvent;return i&&t.dispatchEvent(new i(Ci,{detail:{choice:a,theme:r}})),r}function od(e,t=globalThis.document){let n=wo(t);if(!n)return()=>{};let a=sr(t),r=()=>{let d=sr(t);d!==a&&(a=d,e(d))},i=t.defaultView?.MutationObserver,s=i?new i(r):null;s?.observe(n,{attributes:!0,attributeFilter:[or]});let l=id(t);return l?.addEventListener?.("change",r),t.addEventListener(Ci,r),()=>{s?.disconnect(),l?.removeEventListener?.("change",r),t.removeEventListener(Ci,r)}}var Fm={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Im={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Pm={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Rm={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Mr={};for(let[e,t]of Object.entries(Im))Mr[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(Rm))Mr[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Pm))Mr[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(Fm.renames.map(e=>[e.old,e.new]));function sd(e){let t=Mr[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function ie(e){return sd(e).prop}function o(e){return`var(${ie(e)})`}function Dm(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(ie(t)));return Number.isFinite(n)?n:0}function ge(e,t){let n=sd(t),a=e.ownerDocument??document,r=a.createElement("span");r.dataset.ncLive=t,r.style.position="absolute",r.style.pointerEvents="none";let i=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=i:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=i:r.style.color=i,(e instanceof Element?e:a.documentElement).append(r);let s=(a.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function ld(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function zm(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=o("font-ui"),n.style.fontSize=o("label-size"),n.style.fontWeight=o("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var Om="[data-modulated], [data-modulated] *",cd="(orientation: landscape) and (max-height: 500px) and (max-width: 1023px)";function Jr(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function Ks(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${o("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${o("hairline")} solid ${o("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function Bm(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${o(`module-bg-stack-${a}`)};
      ${ie("text-sub")}: ${o(`module-sub-stack-${a}`)};
      ${ie("divider")}: ${o(`module-div-stack-${a}`)};
      ${ie("slider-track")}: ${o(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${o(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${o(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${o("module-bg-stack-1")};
      ${ie("text-sub")}: ${o("module-sub-stack-1")};
      ${ie("divider")}: ${o("module-div-stack-1")};
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
${Om} { transition: none; }
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
/* A folded card's column width: fx-fold-width, or fx-fold-width-slim for a card with foldSlim (the Studio's send
   returns; Peter, 2026-11-01: "make send effect minimized state 50% thinner"). */
.nc-ui-fx { --nc-fx-fold-w: ${o("fx-fold-width")}; }
.nc-ui-fx[data-nc-fold-slim] { --nc-fx-fold-w: ${o("fx-fold-width-slim")}; }
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
/* The slim column (fx-fold-width-slim): the same parts, the on/off word a step smaller so OFF fits with room. */
.nc-ui-fx[data-nc-fold-slim] .nc-ui-fx-fold-state { font-size: ${o("scale-size")}; letter-spacing: 0; }
.nc-ui-fx-visual { display: block; width: 100%; height: ${o("display-height")}; }
/* Level steps (level-steps.js, Gate's strip): a display like the EQ graph's, a column per step (beats a gap apart,
   swing widening the first of each pair), the level a soft bar, the shape's curve in the accent over it, the playing
   step ringed (the accent while locked to Play, quieter while it runs free). Under it the step numbers and the shape
   tabs. A long press opens the shape picker over the step. */
.nc-lsteps { position: relative; min-width: 0; margin-bottom: ${o("control-gap")}; }
.nc-lsteps-plot {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: ${o("slot-gap")};
  height: ${o("level-steps-height")};
  padding: calc(${o("slot-gap")} * 2);
  background: ${o("eq-graph-bg")};
  border-radius: ${o("slot-radius")};
  box-shadow: inset 0 0 0 ${o("hairline")} ${o("divider")};
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  cursor: ns-resize;
}
.nc-lsteps-plot:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-ui-fx[data-nc-max] .nc-lsteps-plot { height: ${o("level-steps-height-max")}; }
.nc-lsteps-step { position: relative; flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; border-radius: ${o("slot-radius")}; }
.nc-lsteps-step[data-beat="true"], .nc-lsteps-axis > span[data-beat="true"] { margin-inline-start: calc(${o("beat-gap")} - ${o("slot-gap")}); }
.nc-lsteps-step > svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; overflow: visible; pointer-events: none; }
.nc-lsteps-level { fill: ${o("level-steps-bar")}; }
.nc-lsteps-env { fill: ${o("level-steps-curve")}; }
.nc-lsteps-top { fill: none; stroke: ${o("level-steps-curve")}; stroke-width: ${o("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-floor { stroke: ${o("divider")}; stroke-width: ${o("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-step[data-zero="true"] .nc-lsteps-floor { stroke: ${o("text-sub")}; stroke-dasharray: 2 2; }
/* 1/8T with 16 steps: 13-16 don't play. Dashed and empty, as a step grid's out-of-range steps. */
.nc-lsteps-step[data-out="true"] { box-shadow: inset 0 0 0 ${o("hairline")} ${o("divider")}; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-level, .nc-lsteps-step[data-out="true"] .nc-lsteps-env { fill: transparent; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-top { stroke: ${o("divider")}; }
.nc-lsteps-step[data-playhead="true"] { z-index: 1; outline: ${o("playhead-width")} solid ${o("playhead")}; outline-offset: ${o("playhead-offset")}; }
.nc-lsteps-step[data-playhead="true"][data-locked="false"] { outline-color: ${o("level-steps-free")}; outline-width: ${o("hairline")}; }
.nc-lsteps-step[data-focus="true"] { box-shadow: inset 0 calc(${o("playhead-width")} * -1) 0 0 ${o("focus-ring")}; }
.nc-lsteps-plot:not(:focus-visible) .nc-lsteps-step[data-focus="true"] { box-shadow: none; }
.nc-lsteps[data-on="false"] .nc-lsteps-env, .nc-lsteps[data-on="false"] .nc-lsteps-level { fill: ${o("divider")}; }
.nc-lsteps[data-on="false"] .nc-lsteps-top { stroke: ${o("text-sub")}; }
.nc-lsteps-step[data-dragging="true"]::after {
  content: attr(data-level);
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, calc(calc(${o("slot-gap")} * 2) * -1));
  padding: calc(${o("slot-gap")} / 2) calc(${o("slot-gap")} * 2);
  border-radius: ${o("slot-radius")};
  background: ${o("accent")};
  color: ${o("on-accent")};
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  white-space: nowrap;
  pointer-events: none;
}
.nc-lsteps-axis {
  display: flex;
  gap: ${o("slot-gap")};
  padding: ${o("slot-gap")} calc(${o("slot-gap")} * 2) 0;
  font-family: ${o("font-readout")};
  font-size: ${o("slot-font-size")};
  line-height: 1;
  color: ${o("text-sub")};
}
.nc-lsteps-axis > span { flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; }
.nc-lsteps-shapes { display: flex; border-bottom: ${o("hairline")} solid ${o("divider")}; margin-top: ${o("control-gap")}; min-width: 0; }
.nc-lsteps-shapes[hidden] { display: none; }
.nc-lsteps-shape, .nc-lsteps-pick > button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${o("slot-gap")};
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  font-family: ${o("font-ui")};
  font-size: ${o("label-size")};
  cursor: pointer;
  white-space: nowrap;
}
.nc-lsteps-shape { position: relative; flex: 1 1 0; min-width: 0; padding: ${o("slot-gap")} 0 ${o("control-gap")}; }
.nc-lsteps-shape:hover, .nc-lsteps-pick > button:hover { color: ${o("text")}; }
.nc-lsteps-shape[aria-selected="true"] { color: ${o("text")}; }
.nc-lsteps-shape[aria-selected="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${o("hairline")} * -1);
  height: ${o("tab-mark")};
  background: ${o("accent")};
}
.nc-lsteps-shape:focus-visible, .nc-lsteps-pick > button:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: calc(${o("focus-width")} * -1); }
.nc-lsteps-ico { width: calc(${o("label-size")} * 1.8); height: calc(${o("label-size")} * 0.9); overflow: visible; }
.nc-lsteps-ico path { fill: none; stroke: currentColor; stroke-width: ${o("curve-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-pick {
  position: absolute;
  z-index: 3;
  top: 0;
  left: var(--nc-lsteps-pick-x, 0);
  display: flex;
  align-items: stretch;
  gap: ${o("slot-gap")};
  padding: calc(${o("slot-gap")} * 2);
  background: ${o("surface-page")};
  border-radius: ${o("slot-radius")};
  box-shadow: 0 0 0 ${o("hairline")} ${o("divider")};
}
.nc-lsteps-pick[hidden] { display: none; }
.nc-lsteps-pick-head { align-self: center; padding: 0 calc(${o("slot-gap")} * 2); font-family: ${o("font-readout")}; font-size: ${o("readout-size-small")}; color: ${o("text-sub")}; white-space: nowrap; }
.nc-lsteps-pick > button { padding: calc(${o("slot-gap")} * 2); border-radius: ${o("slot-radius")}; }
.nc-lsteps-pick > button[aria-checked="true"] { color: ${o("on-accent")}; background: ${o("accent")}; }
@media (pointer: coarse) {
  .nc-lsteps-shape, .nc-lsteps-pick > button { min-height: ${o("target-min")}; justify-content: center; }
  .nc-lsteps-pick > button { min-width: ${o("target-min")}; }
}
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
  padding: 0 ${o("hairline")};
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  font-family: ${o("font-readout")};
  font-size: ${o("body-size")};
  line-height: 1;
  cursor: pointer;
}
.nc-fx-remove::before {
  content: "";
  position: absolute;
  top: 50%;
  left: calc(${o("control-gap")} * -1);
  right: calc(${o("control-gap")} * -1);
  height: max(100%, calc(${o("control-gap")} * 5));
  transform: translateY(-50%);
}
.nc-fx-remove:hover { color: ${o("text")}; }
.nc-fx-remove:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-fx-remove[hidden],
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd > .nc-fx-remove,
.nc-ui-fx[data-nc-max="over"] > .nc-ui-fx-hd > .nc-fx-remove { display: none; }
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
/* A captioned row (Gate's Rate in a narrow FX card): the label, then the tabs packed close so short ones never cut. */
.nc-choice-caption { flex: 0 0 auto; margin-inline-end: auto; }
.nc-choice-row[data-nc-caption] { gap: ${o("control-gap")}; margin-bottom: ${o("control-gap")}; }
.nc-choice-row[data-nc-caption] > .nc-choice { flex: 0 0 auto; overflow: visible; }
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
.nc-padgrid-pad[data-hint="true"] .nc-padgrid-pad-hint { display: block; justify-self: start; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
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
  /* The ×'s touch target: target-min tall, out to the card's padding on the right; never over maximize. */
  .nc-fx-remove::before { height: max(100%, ${o("target-min")}); right: calc(${o("control-gap")} * -3); }
  .nc-fold-toggle::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${o("target-min")});
    height: max(100%, ${o("target-min")});
    transform: translate(-50%, -50%);
  }
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
  ${ie("text-sub")}: ${o("module-sub-stack-1")};
  ${ie("divider")}: ${o("module-div-stack-1")};
  ${ie("slider-track")}: ${o("module-div-stack-1")};
}
/* The fx area is as wide as the cards it shows (Peter, 2026-11-01: "Weird empty slot next to Master slider"): one
   column per shown card, none held empty, so the master sits right after the last card and the strips area (the
   flexible column) takes the rest. A paged area keeps three cards' width (below). */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${o("fx-card-width")};
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
  ${ie("text-sub")}: ${o("module-sub-stack-1")};
  ${ie("divider")}: ${o("module-div-stack-1")};
  ${ie("slider-track")}: ${o("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${o("control-gap")} ${o("module-pad")};
  padding-bottom: ${o("module-pad")};
  background: ${o("module-bg-stack-1")};
  ${ie("text-sub")}: ${o("module-sub-stack-1")};
  ${ie("divider")}: ${o("module-div-stack-1")};
  ${ie("slider-track")}: ${o("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${o("stack-card-pad-y")} ${o("module-pad")} ${o("module-pad")};
  ${ie("text-sub")}: inherit;
  ${ie("divider")}: inherit;
  ${ie("slider-track")}: inherit;
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { --nc-fx-card-bg: ${o("module-bg-adjacent-2")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { --nc-fx-card-bg: ${o("module-bg-adjacent-3")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { --nc-fx-card-bg: ${o("module-bg-adjacent-4")}; background: var(--nc-fx-card-bg); }
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
    width: calc(${o("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] > .nc-ui-fx[data-nc-max="row"] { grid-column: span 3; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx[data-nc-max="row"][data-nc-max="row"] {
    width: calc(${o("fx-card-width")} * 3);
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
    scroll-padding-top: var(--nc-fx-pin-h, ${o("module-gap")});
    /* The foot shade (scroll) shows while there is more below; the card's own colour at the end of its content (local)
       covers it once scrolled to the end, or when nothing overflows. */
    background-image:
      linear-gradient(transparent, var(--nc-fx-card-bg) 70%),
      linear-gradient(transparent, ${o("divider")});
    background-position: bottom, bottom;
    background-size: 100% calc(${o("module-gap")} * 3), 100% ${o("module-gap")};
    background-repeat: no-repeat;
    background-attachment: local, scroll;
  }
  /* The pinned header (or bare name) holds the card's top padding, so nothing scrolls by above it; its fold triangle
     keeps its corner (the header is its containing block now, edge to edge). */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > :is(.nc-ui-fx-hd, .nc-ui-fx-name) {
    position: sticky;
    top: 0;
    z-index: 2;
    margin: 0 calc(${o("module-pad")} * -1) calc(${o("module-gap")} * -1);
    padding: ${o("stack-card-pad-y")} ${o("module-pad")} calc(${o("module-gap")} * 2);
    background-color: var(--nc-fx-card-bg);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > .nc-eq {
    position: sticky;
    top: var(--nc-fx-hd-h, 0);
    z-index: 1;
    margin-bottom: 0;
    padding-bottom: ${o("control-gap")};
    background-color: var(--nc-fx-card-bg);
    /* The card's colour out to its edges beside the graph (no spread: nothing below it is covered). */
    box-shadow: calc(${o("module-pad")} * -1) 0 0 var(--nc-fx-card-bg), ${o("module-pad")} 0 0 var(--nc-fx-card-bg);
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
   (the master too, with empty M/S and send rows) keeps the same row heights, so faders and ticks line up.
   Every row is a named area and every child is placed by name (never by auto-placement), so a row taken out (the
   sends, display: none) can't shift the rows after it, in any engine. Three columns: a control-gap gutter each side
   of the content; only M and S span the gutters, so on touch two target-min boxes fit side by side inside the strip
   (they overflowed it, and Safari drew S under the next strip; Peter, 2026-11-01). No negative margins. */
.nc-strip {
  /* The M/S row: the slider pitch; target-min on touch (the buttons' full boxes, so they never reach the pan row). */
  --nc-strip-ms-row: ${o("slider-pitch")};
  --nc-strip-knob-row: calc(${o("knob-size")} + ${o("control-gap")} + ${o("label-size")} * ${o("label-leading")});
  position: relative;
  flex: none;
  width: ${o("strip-width")};
  display: grid;
  grid-template-columns: ${o("control-gap")} minmax(0, 1fr) ${o("control-gap")};
  /* Name, Inserts, M/S, sends, pan, the fader body, the readout. */
  grid-template-rows: auto ${o("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
  justify-items: center;
  row-gap: ${o("module-gap")};
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
  .nc-strip { --nc-strip-ms-row: ${o("target-min")}; }
}
/* sendsHidden: no sends row (the host's "hide the sends"); give it to every strip so their rows still line up. */
.nc-strip[data-nc-sends-hidden] {
  grid-template-rows: auto ${o("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-sends-hidden] > .nc-strip-sends { display: none; }
.nc-strip + .nc-strip { border-inline-start: ${o("hairline")} solid ${o("divider")}; }
/* Channel strips alternate light and dark grey, full height, so a row of identical strips reads apart (Peter,
   2026-10-30); the master keeps the module's shade. */
.nc-strip:not([data-nc-master]) { --nc-strip-ground: var(--nc-strip-shade, ${o("strip-bg")}); background: var(--nc-strip-ground); }
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) { --nc-strip-ground: var(--nc-strip-shade, ${o("strip-alt-bg")}); }
/* A shade a player picked (shade, 1-8; Peter, 2026-11-04): one of eight neutral greys (strip-shade-1..8), in place of
   the alternation. 1 and 2 are the alternation's own greys. On the darker four (5-8) the Inserts word at rest takes
   text-sub, so it keeps its contrast (the lighter hacks grey falls to 2.2:1 there). */
${[1,2,3,4,5,6,7,8].map(a=>`.nc-strip[data-nc-shade="${a}"] { --nc-strip-shade: ${o(`strip-shade-${a}`)}; }`).join(`
`)}
/* A compact knob's centre is the strip's own grey (--nc-strip-ground), not the page's, so it never shows as a dot. On
   3-8 the M and S hairline is mixed from the strip's grey (strip-divider vanishes on the middle greys, and reads as a
   light box on the darkest). */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${ie("divider")}: color-mix(in oklab, ${o("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${ie("meter-track")}: color-mix(in oklab, ${o("text-sub")} 30%, var(--nc-strip-shade)); }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]) { color: ${o("text-sub")}; }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]):hover { color: ${o("text")}; }
/* The strip menu (onShade): a small sheet under the grip, or where the name was right-clicked: "Shade", a row of Auto
   and the eight swatches (the picked one ringed in ink), then Move left / Move right with their keys. Over the page,
   so it never shifts the layout; page ground and a hairline (the kit draws no shadows). */
.nc-strip-menu {
  position: fixed;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: ${o("control-gap")};
  min-width: calc(${o("strip-width")} * 2.5);
  padding: calc(${o("control-gap")} * 2) calc(${o("control-gap")} * 2.5);
  border: ${o("hairline")} solid ${o("divider")};
  border-radius: ${o("slot-radius")};
  background: ${o("surface-page")};
  color: ${o("text")};
  font-size: ${o("label-size")};
}
.nc-strip-menu-title { color: ${o("text-sub")}; font-weight: ${o("label-weight")}; letter-spacing: ${o("label-tracking")}; text-transform: uppercase; }
.nc-strip-menu-shades { display: flex; gap: ${o("control-gap")}; margin-bottom: ${o("control-gap")}; }
.nc-strip-menu-shades > button {
  flex: none;
  min-width: calc(${o("control-gap")} * 4.5);
  height: calc(${o("control-gap")} * 4.5);
  margin: 0;
  padding: 0 ${o("hairline")};
  border: ${o("hairline")} solid ${o("divider")};
  border-radius: ${o("slot-radius")};
  background: var(--nc-swatch, transparent);
  color: ${o("text-sub")};
  font: inherit;
  font-size: ${o("scale-size")};
  cursor: pointer;
}
.nc-strip-menu-shades > button[aria-checked="true"] { outline: calc(${o("hairline")} * 2) solid ${o("text")}; outline-offset: ${o("hairline")}; color: ${o("text")}; }
.nc-strip-menu-shades > button:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-strip-menu-item {
  display: flex;
  justify-content: space-between;
  gap: calc(${o("control-gap")} * 3);
  margin: 0;
  padding: ${o("control-gap")} 0;
  border: 0;
  border-top: ${o("hairline")} solid ${o("divider")};
  background: transparent;
  color: ${o("text")};
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.nc-strip-menu-item:disabled { color: ${o("text-sub")}; cursor: default; }
.nc-strip-menu-item > kbd { font: inherit; color: ${o("text-sub")}; }
.nc-strip-menu-item:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: calc(${o("focus-width")} * -1); }
@media (pointer: coarse) {
  .nc-strip-menu-shades > button { min-width: calc(${o("target-min")} * 0.7); height: calc(${o("target-min")} * 0.7); }
  .nc-strip-menu-item { min-height: ${o("target-min")}; align-items: center; }
}
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
/* Move (onMove): a grip of six dots in the top-right corner, across from the triangle, in text-sub (ink on hover), so a
   strip says it can be dragged. touch-action none: a drag from the grip moves the strip at once on touch, never the
   page. Not on a folded strip (its column is the handle there). */
.nc-strip > [data-nc-strip-grip] {
  position: absolute;
  top: ${o("control-gap")};
  right: ${o("control-gap")};
  /* Over the next strip's fold triangle, whose touch target reaches back across the strips' edge. */
  z-index: 2;
  display: inline-flex;
  margin: 0;
  padding: ${o("hairline")};
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  line-height: 1;
  cursor: grab;
  touch-action: none;
}
.nc-strip > [data-nc-strip-grip]:hover { color: ${o("text")}; }
.nc-strip > [data-nc-strip-grip]:active { cursor: grabbing; }
.nc-strip > [data-nc-strip-grip]:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-strip-grip-dots {
  display: block;
  width: calc(${o("control-gap")} * 1.5);
  height: calc(${o("control-gap")} * 2.25);
  background: radial-gradient(circle, currentColor ${o("hairline")}, transparent calc(${o("hairline")} * 1.5)) 0 0 / calc(${o("control-gap")} * 0.75) calc(${o("control-gap")} * 0.75);
}
.nc-strip[data-nc-folded] > [data-nc-strip-grip] { display: none; }
@media (pointer: coarse) {
  .nc-strip > [data-nc-strip-grip]::before {
    content: "";
    position: absolute;
    right: calc(${o("control-gap")} * -1);
    top: calc(${o("control-gap")} * -1);
    width: calc(${o("target-min")} / 2);
    height: calc(${o("target-min")} / 2);
  }
}
/* Folded: no gutters, and M and S take the Inserts, M/S and sends rows (sends hidden: the pan row) as one area, so the
   two fit stacked at full size with the rows unchanged. */
.nc-strip[data-nc-folded] {
  width: ${o("strip-fold-width")};
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
  grid-template-rows: auto var(--nc-strip-knob-row) ${o("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". trim ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-trim][data-nc-sends-hidden] {
  grid-template-rows: auto var(--nc-strip-knob-row) ${o("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
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
  grid-auto-columns: ${o("slider-pitch")};
  grid-auto-rows: ${o("slider-pitch")};
  gap: ${o("module-gap")};
  align-self: start;
  justify-self: center;
}
/* Touch: each folded M and S as wide as the column and target-min tall, touching (after the rule above, so it wins). */
@media (pointer: coarse) {
  .nc-strip[data-nc-folded] > .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-auto-rows: ${o("target-min")}; gap: 0; justify-self: stretch; }
}
.nc-strip[data-nc-folded] > .nc-strip-body {
  grid-template-columns: auto auto;
  column-gap: ${o("control-gap")};
}
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
/* M and S: an explicit two-column grid (never flex with overlapping margins), centred at the slider pitch; on touch
   it fills the strip's full width (the gutters too), two target-min boxes side by side, touching, nothing past the
   strip's edges. The kit's hit pads take any width short of target-min (the divider hairline) outward. */
.nc-strip-ms {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${o("slider-pitch")};
  grid-template-rows: ${o("slider-pitch")};
  column-gap: ${o("control-gap")};
  justify-self: center;
  align-self: start;
}
.nc-strip > .nc-strip-ms > .nc-ms-wrap { margin: 0; width: auto; }
/* The master's Sends button (onSendsView): Inserts' twin in the M/S row, the strip's width, the slider pitch tall. */
.nc-strip > .nc-strip-ms:has(> .nc-sends-view-wrap) { grid-auto-columns: minmax(0, 1fr); justify-self: stretch; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap { grid-column: 1 / -1; height: ${o("slider-pitch")}; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap > .nc-sends-view { inset-inline: ${o("control-gap")}; width: auto; }
@media (pointer: coarse) {
  .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-template-rows: ${o("target-min")}; column-gap: 0; justify-self: stretch; }
}
/* M and S on a channel strip: the kit's outlined squares, their hairline the one for the strip's own shade
   (strip-divider). The console's body hands its stack-1 hairline down, a near match for the light strip (gone there)
   but lighter than the alternate one (a light box there), so M and S showed boxes on every other strip only. */
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${ie("divider")}: ${o("strip-divider")}; }
/* Hacks: a full-width toggle above M and S, in mixed case and a lighter grey (Peter); pressed while the console's fx area shows this strip's stack. */
.nc-strip-hacks { display: flex; width: 100%; height: ${o("slider-pitch")}; }
.nc-hacks-wrap { position: relative; flex: 1 1 auto; height: ${o("slider-pitch")}; }
.nc-hacks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  /* A light outline at rest, the same on every strip (Peter, 2026-11-01: the box only says the stack has effects):
     text-sub at 50% over the strip hairline; text-sub on hover, so it still reads as a button. */
  border: ${o("hairline")} solid color-mix(in oklab, ${o("text-sub")} 50%, ${o("strip-divider")});
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
/* hacksEmpty (no effects in the stack): the plain word, no box, hover too; still a button with its focus ring. */
.nc-hacks[data-nc-empty]:not([aria-pressed="true"]) { border-color: transparent; }
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
    radial-gradient(closest-side, var(--nc-strip-ground, ${o("surface-page")}) 70%, transparent 72%),
    conic-gradient(from 225deg, ${o("meter-fill")} calc(var(--knob-turn, 0) * 1deg), ${o("meter-track")} 0 270deg, transparent 0);
}
/* A bipolar knob (pan) fills from the top of its travel (the centre) to the value, either way. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-knob {
  background:
    radial-gradient(closest-side, var(--nc-strip-ground, ${o("surface-page")}) 70%, transparent 72%),
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
${Ks("")}
}
@media (max-width: 1023px) {
${Ks("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Jr("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Jr("")}
}
@media (max-width: 1023px) {
${Jr("html[data-nc-landscape] ")}
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
`}var Qr=null,_m="nc-ui-fallback";function dd(e=globalThis.document){if(!e?.documentElement||(e.documentElement,Qr&&Qr.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${_m} {
${Bm()}
}
`,e.head.append(t),Qr=t}var On=null,jm=0,qm=new URL("/studio/assets/confirm-DwyQU4Nn.css",import.meta.url).href,ud=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=qm,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&ud(document);function We(e){return pd(e).then(t=>!!t.ok)}function pd({title:e,body:t,lines:n=[],extra:a,confirmLabel:r="Confirm",cancelLabel:i="Cancel",danger:s=!1,root:l,returnFocus:d,signal:u},c){if(On||u?.aborted)return Promise.resolve({});let p=l?.ownerDocument??document,f=ud(p),b=l??p.body,m=p.defaultView??globalThis,w=`nc-ui-confirm-${++jm}`,h=(U,Se,fe)=>{let Oe=p.createElement(U);return Oe.className=`nc-ui-confirm${Se}`,fe!=null&&(Oe.textContent=fe),Oe},g=h("div","-layer");g.dataset.state="enter";let x=h("div","");x.setAttribute("role","alertdialog"),x.setAttribute("aria-modal","true"),x.setAttribute("aria-labelledby",`${w}-t`);let v=h("h2","-title",e);v.id=`${w}-t`;let A=h("p","-body",t);A.id=`${w}-b`;let T=n.map((U,Se)=>{let fe=h("p","-body",U?.text??U);return fe.id=`${w}-b${Se}`,U?.tone==="danger"&&(fe.dataset.tone="danger"),fe});x.setAttribute("aria-describedby",[A,...T].map(U=>U.id).join(" "));let y=a&&h("button","-extra",a.label);y&&(y.type="button",y.dataset.ncConfirm="extra",y.addEventListener("click",()=>a.onAction?.()));let k=h("div","-actions"),E=(U,Se)=>{let fe=h("button","-btn",U);return fe.type="button",fe.dataset.ncConfirm=Se,fe.addEventListener("click",()=>ye(Se==="ok")),fe},$=E(i,"cancel"),L=E(r,"ok");s&&(L.dataset.danger="true"),k.append($,L);let[N,_]=c?.(h,L)??[];x.append(v,A,...T,...N?[N]:[],...y?[y]:[],k);let V=[_,y,$,L].filter(Boolean);g.append(x);let K={layer:g};On=K;let ne=d??p.activeElement,be=[];for(let U of b.children)U.hasAttribute("inert")||(U.setAttribute("inert",""),be.push(U));let ce=()=>{if(On!==K)return;b.append(g),(_??$).focus({preventScroll:!0});let U=m.requestAnimationFrame?.bind(m)??(Se=>setTimeout(Se,16));U(()=>U(()=>{g.dataset.state==="enter"&&(g.dataset.state="open")}))};f?f.then(ce):ce();let se=!1;g.addEventListener("pointerdown",U=>{se=U.target===g}),g.addEventListener("click",U=>{U.target===g&&se&&ye(!1),se=!1});let Y=U=>{if(U.stopImmediatePropagation(),U.key==="Escape")U.preventDefault(),ye(!1);else if(U.key==="Tab"){U.preventDefault();let Se=V.filter(Oe=>!Oe.disabled),fe=Se.length;Se[(Se.indexOf(p.activeElement)+(U.shiftKey?fe-1:1))%fe].focus()}else U.key==="Enter"&&(U.preventDefault(),p.activeElement===y?y.click():p.activeElement===$?ye(!1):L.disabled||ye(!0))},nn=U=>U.stopImmediatePropagation();m.addEventListener("keydown",Y,!0),m.addEventListener("keyup",nn,!0);let Rt=()=>ye(!1);u?.addEventListener("abort",Rt);let Dt,Sa=new Promise(U=>{Dt=U});function ye(U){if(On!==K)return;On=null,m.removeEventListener("keydown",Y,!0),m.removeEventListener("keyup",nn,!0),u?.removeEventListener("abort",Rt);for(let Qe of be)Qe.removeAttribute("inert");g.dataset.state="closing",ne?.isConnected&&typeof ne.focus=="function"&&ne.focus({preventScroll:!0});let Se=m.getComputedStyle?.(g),fe=Math.max(0,...String(Se?.transitionDuration??"").split(",").map(Qe=>Number.parseFloat(Qe)*(Qe.trim().endsWith("ms")?1:1e3)||0)),Oe=()=>g.remove();g.addEventListener("transitionend",Qe=>Qe.target===g&&Oe()),setTimeout(Oe,fe+50),Dt({ok:U,value:_?.value.trim()})}return Sa}function Vm(e){let t=e.field??{};return pd(e,(n,a)=>{let r=n("label","-field"),i=n("input","-input");i.type=t.type??"text",i.value=t.value??"",t.placeholder&&(i.placeholder=t.placeholder),i.spellcheck=!1,i.autocomplete="off";let s=()=>{a.disabled=i.value.trim()===""};return i.addEventListener("input",s),s(),r.append(n("span","-label",t.label??""),i),[r,i]}).then(n=>n.ok?n.value:null)}function $o(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.dataset.ncOn="",r.textContent=e.onText??"On";let i=t.createElement("span");i.dataset.ncOff="",i.textContent=e.offText??"Off",a.append(r,i),n.append(a);let s=!1,l=u=>{s=u===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let d=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",d),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",d),n.remove()}}}var hd=new WeakMap,Ys=.25;function Hm(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(a,r);let i=0,s=e.step??.005,l=e.onChange,d=e.onReset,u=h=>Math.min(1,Math.max(0,h)),c=()=>{n.style.setProperty("--fader-pos",String(i)),n.setAttribute("aria-valuenow",String(Math.round(i*1e3)/1e3))},p=h=>{let g=u(h);g!==i&&(i=g,c(),l?.(g))},f=0,b=!1;n.addEventListener("pointerdown",h=>{if(h.button!==0)return;h.preventDefault(),n.focus?.({preventScroll:!0});let g=n.getBoundingClientRect();h.target!==r&&g.height>0&&p(1-(h.clientY-g.top)/g.height),f=h.clientY,b=!0,n.dataset.dragging="true",n.setPointerCapture?.(h.pointerId)}),n.addEventListener("pointermove",h=>{if(!b)return;let g=n.getBoundingClientRect().height||1,x=(f-h.clientY)/g*(h.shiftKey?Ys:1);f=h.clientY,p(i+x)});let m=()=>{b=!1,delete n.dataset.dragging};n.addEventListener("pointerup",m),n.addEventListener("pointercancel",m),n.addEventListener("lostpointercapture",m),n.addEventListener("dblclick",h=>{h.preventDefault(),d?.()}),n.addEventListener("keydown",h=>{let g=h.shiftKey?s*Ys:s,x={ArrowUp:i+g,ArrowRight:i+g,ArrowDown:i-g,ArrowLeft:i-g,PageUp:i+s*10,PageDown:i-s*10,Home:0,End:1};h.key in x&&(h.preventDefault(),p(x[h.key]))});let w={el:n,get value(){return i},get dragging(){return b},set(h){b||(i=u(Number(h)||0),c())},setText(h){h?n.setAttribute("aria-valuetext",h):n.removeAttribute("aria-valuetext")},setLabel(h){n.setAttribute("aria-label",h)},configure(h){typeof h.step=="number"&&h.step>0&&(s=h.step),h.onChange&&(l=h.onChange),h.onReset&&(d=h.onReset)}};return w.setLabel(e.label),w.set(e.value??0),w.setText(e.valueText),hd.set(n,w),w}function Um(e){return hd.get(e)}var fd=new WeakMap,Gm=.2,Wm=1.5,Km=.5;function Ym(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function Xs(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Ym(a.getComputedStyle(e).getPropertyValue(ie(t)),n)}function Xm(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let r=t.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let i=t.createElement("div");i.className="nc-meter-bars",i.setAttribute("aria-hidden","true");let s=[];for(let w=0;w<n;w++){let h=t.createElement("span");h.className="nc-meter-bar";let g=t.createElement("span");g.className="nc-meter-peak";let x=t.createElement("span");x.className="nc-meter-rms";let v=t.createElement("span");v.className="nc-meter-hold",h.append(g,x,v),i.append(h),s.push({peak:g,rms:x,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(r,i);let l=e.label,d=e.onClear,u=!1,c=-1,p=-1,f=()=>{r.dataset.lit=u?"true":"false",r.setAttribute("aria-pressed",u?"true":"false"),r.setAttribute("aria-label",u?`${l} clipped: clear`:`${l} clip light`),r.title=u?"Clipped. Click to clear":"Clip light"},b=(w,h,g,x)=>{let v=Math.round(x*1e3)/1e3;g[h]!==v&&(g[h]=v,w.style.transform=h==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};r.addEventListener("click",()=>{m.clear(),d?.()});let m={el:a,get clipped(){return u},update(w,h){c<0&&(c=Xs(a,"motion-meter-fall",Gm)),p<0&&(p=Xs(a,"motion-meter-hold",Wm));let g=Math.max(0,Math.min(.25,Number(h)||0)),x=c>0?Math.exp(-g/c):0;s.forEach((v,A)=>{let T=w[A]??w[0]??{peak:0,rms:0},y=Math.min(1,Math.max(0,Number(T.peak)||0)),k=Math.min(y,Math.max(0,Number(T.rms)||0));T.over&&m.clip(),v.level.peak=y>=v.level.peak?y:y+(v.level.peak-y)*x,v.level.rms=k>=v.level.rms?k:k+(v.level.rms-k)*x,v.holdAge+=g,y>=v.holdAt?(v.holdAt=y,v.holdAge=0):v.holdAge>p&&(v.holdAt=Math.max(y,v.holdAt-Km*g)),b(v.peak,"peak",v.shown,v.level.peak),b(v.rms,"rms",v.shown,v.level.rms),b(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){u||(u=!0,f())},clear(){u=!1,f()},reset(){for(let w of s)w.level.peak=0,w.level.rms=0,w.holdAt=0,w.holdAge=0,b(w.peak,"peak",w.shown,0),b(w.rms,"rms",w.shown,0),b(w.hold,"hold",w.shown,0),w.hold.dataset.off="true"},setLabel(w){l=w,f()},configure(w){w.onClear&&(d=w.onClear)}};return f(),m.reset(),fd.set(a,m),m}function md(e){return e?fd.get(e):void 0}var Jm=3,Qm=new Set(["freq","q","rate","time","log"]);function So(e,t,n){return!e||!Qm.has(e)||!(n>t)?"linear":t>0?"log":"power"}function Tr(e,t,n){return So(e,t,n)!=="linear"}function lr(e,t,n,a){let r=Number(a);if(!(n>t)||!Number.isFinite(r))return 0;let i=Math.min(n,Math.max(t,r)),s=So(e,t,n);if(s==="log")return Math.log(i/t)/Math.log(n/t);let l=(i-t)/(n-t);return s==="power"?Math.cbrt(l):l}function gd(e,t,n,a){let r=Math.min(1,Math.max(0,Number(a)||0)),i=So(e,t,n);return i==="log"?t*(n/t)**r:t+(n-t)*(i==="power"?r**Jm:r)}function bd(e,t,n,a){let r=Math.min(n,Math.max(t,e));if(a>0){r=t+Math.round((r-t)/a)*a;let i=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));r=Number(r.toFixed(i)),r=Math.min(n,Math.max(t,r))}return r}function Eo(e,t,n,a){return Math.round(lr(e,t,n,a)*1e3)}function Ni(e,t,n,a,r){return bd(gd(e,t,n,Number(a)/1e3),t,n,r)}function Zm(e,t,n=!1){let a=Number(e)||0,r=n?1:1e3/100,i=null;return t==="ArrowRight"||t==="ArrowUp"?i=a+r:t==="ArrowLeft"||t==="ArrowDown"?i=a-r:t==="PageUp"?i=a+1e3/10:t==="PageDown"?i=a-1e3/10:t==="Home"?i=0:t==="End"&&(i=1e3),i===null?null:Math.min(1e3,Math.max(0,Math.round(i)))}function yd(e,t,n,a,r,i=!1,s){let l=Eo(e,t,n,a),d=Zm(l,r,i);if(d===null)return null;let u=Ni(e,t,n,d,s),c=Math.sign(d-l),p=bd(Number(a),t,n,s);for(;c!==0&&u===p&&d>0&&d<1e3;)d+=c,u=Ni(e,t,n,d,s);return u}function Js(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function Qs(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function eg(e,t,n,a=n/6){let r=e.some(c=>c===null),i=Math.max(0,n-(r?a:0)),s=e.reduce((c,p,f)=>p===null?c:c+Qs(t[f]),0),l=s>0?i/s:0,d=e.map(c=>c===null?0:Math.min(i,Qs(c)*l));if(r){let c=d.reduce((f,b)=>f+b,0),p=e.indexOf(null);d[p]=Math.max(a,n-c)}let u=[0];for(let c of d)u.push(Math.round((u[u.length-1]+c)*100)/100);return r&&(u[u.length-1]=n),u}function tg(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(t*a)),i=Math.max(1,Math.floor(n*a));(e.width!==r||e.height!==i)&&(e.width=r,e.height=i);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function mt(e){return Math.max(0,Math.min(1,e))}function vd(e,t){let{ctx:n,w:a,h:r}=tg(e);if(!n)return;n.clearRect(0,0,a,r);let i=zm(e);if(t.paint==="swatch"){let d=ge(e,"accent"),u=ge(e,"rhythm.step-cell-on");e.dataset.ncAccent=d,e.dataset.ncStep=u,n.fillStyle=d,n.fillRect(0,0,a/2,r),n.fillStyle=u,n.fillRect(a/2,0,a/2,r);return}if(t.paint==="filter"&&typeof t.hz=="number"){rg(n,a,r,t,e,i);return}if(t.paint==="filter"){let d=t.mode??"lp",u=ge(e,ld(d)),c=ge(e,"divider"),p=mt(t.cutoff??.5),f=.08+(1-mt(t.resonance??.2))*.22;n.strokeStyle=c,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(a,r*.72),n.stroke(),n.beginPath();for(let b=0;b<=a;b++){let m=b/Math.max(1,a),w=0;d==="lp"?w=m<p?1:Math.max(0,1-(m-p)/f):d==="hp"?w=m>p?1:Math.max(0,1-(p-m)/f):w=Math.max(0,1-Math.abs(m-p)/f);let h=r*.78-w*r*.62;b===0?n.moveTo(b,h):n.lineTo(b,h)}n.strokeStyle=u,n.stroke(),n.fillStyle=ge(e,"text-sub"),n.font=i,n.fillText(d.toUpperCase(),0,r),e.dataset.ncAccent=u;return}if(t.paint==="envelope"){n.strokeStyle=ge(e,"accent");let d=Math.max(0,t.attack??0),u=Math.max(0,t.decay??.4),[c,p,f]=eg([d,u],t.max??[1,4],a),b=2,m=r-1;n.beginPath(),n.moveTo(c,m),n.lineTo(p,b);let w=Math.max(1,Math.ceil(f-p));for(let h=1;h<=w;h++){let g=h/w;n.lineTo(p+(f-p)*g,m-(m-b)*Math.exp(-4.6*g)*(1-g*.01))}n.lineTo(f,m),n.lineTo(a,m),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let d=Array.isArray(t.peaks)?t.peaks:[],[u,c]=Array.isArray(t.region)?t.region:[0,1],p=ge(e,"accent"),f=ge(e,"text-sub"),b=r/2;n.fillStyle=ge(e,"accent-soft"),n.fillRect(mt(u)*a,0,(mt(c)-mt(u))*a,r),n.strokeStyle=ge(e,"divider"),n.beginPath(),n.moveTo(0,b),n.lineTo(a,b),n.stroke();let m=Math.floor(d.length/2);for(let w=0;w<m;w++){let h=(w+.5)/m*a,g=Math.max(-1,Math.min(1,d[w*2]??0)),x=Math.max(-1,Math.min(1,d[w*2+1]??0)),v=(w+.5)/m;n.strokeStyle=v>=u&&v<=c?p:f,n.beginPath(),n.moveTo(h,b-x*(b-1)),n.lineTo(h,b-g*(b-1)+.5),n.stroke()}n.strokeStyle=p;for(let w of[u,c,...Array.isArray(t.markers)?t.markers:[]]){let h=Math.round(mt(w)*(a-1))+.5;n.beginPath(),n.moveTo(h,0),n.lineTo(h,r),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=ge(e,"text"),n.fillRect(Math.round(mt(t.position)*(a-1)),0,1,r)),m||(n.fillStyle=f,n.font=i,n.fillText(t.empty??"Empty",0,b+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let d=mt(t.level??0);n.fillStyle=ge(e,"divider"),n.fillRect(0,r*.4,a,r*.2),n.fillStyle=ge(e,"accent"),n.fillRect(0,r*.4,a*d,r*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=ge(e,"rhythm.step-cell-off"),n.fillRect(0,r*.45,a,r*.1),n.fillStyle=ge(e,"rhythm.playhead"),n.fillRect(l/s*a,r*.3,Math.max(1,a/s),r*.4),e.dataset.ncAccent=ge(e,"accent")}var Jn=20,Fi=2e4,Zr=24,Zs=-60;function ng(e,t,n,a,r=48e3){let i=2*Math.PI*Math.min(t,r*.49)/r,s=Math.cos(i),l=Math.sin(i)/(2*n),d,u,c;e==="hp"?[d,u,c]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[d,u,c]=[l,0,-l]:[d,u,c]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,f=-2*s,b=1-l,m=2*Math.PI*a/r,w=(v,A,T)=>v+A*Math.cos(m)+T*Math.cos(2*m),h=(v,A)=>-(v*Math.sin(m)+A*Math.sin(2*m)),g=Math.hypot(w(d,u,c),h(u,c)),x=Math.hypot(w(p,f,b),h(f,b));return x>0?g/x:0}function ag(e,t){return Math.log(Math.max(Jn,Math.min(Fi,e))/Jn)/Math.log(Fi/Jn)*t}function el(e,t,n){let a=Math.max(Zs,Math.min(Zr,e));return t+(Zr-a)/(Zr-Zs)*(n-t)}function rg(e,t,n,a,r,i){let s=a.mode??"lp",l=ge(r,ld(s)),d=ge(r,"divider"),u=ge(r,"text-sub"),c=Number.parseFloat(String(i).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,f=Math.max(p+4,n-c-3),b=a.q??Math.SQRT1_2,m=Math.round(el(0,p,f))+.5;e.strokeStyle=d,e.lineWidth=1,e.beginPath(),e.moveTo(0,m),e.lineTo(t,m),e.stroke(),e.beginPath();for(let w=0;w<=t;w++){let h=Jn*(Fi/Jn)**(w/Math.max(1,t)),g=a.open?1:ng(s,a.hz,b,h,a.sampleRate),x=el(20*Math.log10(Math.max(1e-5,g)),p,f);w===0?e.moveTo(w,x):e.lineTo(w,x)}if(e.strokeStyle=l,e.stroke(),!a.open){let w=Math.round(ag(a.hz,t))+.5;e.strokeStyle=u,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(w,p),e.lineTo(w,f),e.stroke(),e.setLineDash?.([])}e.fillStyle=u,e.font=i,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",r.dataset.ncAccent=l,r.dataset.ncFilterHz=String(Math.round(a.hz))}function Ge(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let r=n.defaultView.getComputedStyle(a).color;return a.remove(),r}function ig(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var Qt=20,ga=2e4,Ao=Math.log(ga/Qt),Ii=32,og=250,sg=-100,lg=1200,cg=4.5,tl=-6,jt=-96,dg=48,nl=[100,1e3,1e4],ug=[6,12];function gn(e,t){return Math.log(Math.max(Qt,Math.min(ga,e))/Qt)/Ao*t}function Ha(e,t){return Qt*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Ao)}function Tt(e,t,n,a){let r=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*r}function Pi(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var wd=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function pg(e,t,n,a){let r=n?3:1,i=d=>({db:Math.max(-a,Math.min(a,e.db+d*r))}),s=d=>({hz:Math.max(e.minHz??Qt,Math.min(e.maxHz??ga,e.hz*2**(d*r/6)))}),l=d=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(d*r)))});switch(t){case"ArrowUp":return i(1);case"ArrowDown":return i(-1);case"ArrowRight":return e.moveHz?s(1):i(1);case"ArrowLeft":return e.moveHz?s(-1):i(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Mo(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function hg(e,t,n,a,r,i,s,l,d){let u=d?.25:1,c={},p=Math.max(1,i/2-l);if(c.db=Math.max(-s,Math.min(s,t.db-a*u/p*s/Mo(e))),e.moveHz){let f=t.hz*Math.exp(n*u/Math.max(1,r)*Ao);c.hz=Math.max(e.minHz??Qt,Math.min(e.maxHz??ga,f))}return c}function fg(e,t,n,a,r){let i=Math.max(0,n.left)+1,s=Math.min(n.right,r)-1,l=Math.min(t.width*3+a*2,s-i),d=Math.max(i,Math.min(e.left,s-l));return{left:Math.round(d-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var ke=new WeakMap;function mg(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let r=document.createElement("canvas");r.className="nc-eq-spectrum",r.setAttribute("aria-hidden","true");let i=document.createElement("canvas");i.className="nc-eq-curve",i.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(r,i);for(let d of e.bands)a.append(gg(n,d,t));a.append(s),a.addEventListener("click",d=>{if(!Ad(n)||d.button>0)return;let u=Ed(n)?.querySelector("[data-nc-max-toggle]");u instanceof HTMLElement&&u.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),ke.set(n,{control:e,cache:null,spec:null,active:null}),kd(n,e),n}function xd(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function gg(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let r=()=>{let u=n(e);return u?.type==="eqGraph"?u:null},i=()=>r()?.bands.find(u=>u.id===t.id)??null,s=null;a.addEventListener("pointerdown",u=>{if(u.button!==0)return;let c=i();c&&(u.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(u.pointerId),s={id:u.pointerId,x:u.clientX,y:u.clientY,start:{hz:c.hz,db:c.db}},a.dataset.drag="true",gt(e,t.id))}),a.addEventListener("pointermove",u=>{if(!s||u.pointerId!==s.id)return;let c=r(),p=i(),f=ke.get(e);if(!c||!p||!f?.box)return;let{w:b,h:m,pad:w}=f.box;c.onBand(p.id,hg(p,s.start,u.clientX-s.x,u.clientY-s.y,b,m,c.range??18,w,u.shiftKey))});let l=u=>{!s||u.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&gt(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",u=>{u.preventDefault(),r()?.onReset?.(t.id)}),a.addEventListener("keydown",u=>{let c=r(),p=i();if(!c||!p)return;let f=pg(p,u.key,u.shiftKey,c.range??18);f&&(u.preventDefault(),f==="reset"?c.onReset?.(p.id):c.onBand(p.id,f),gt(e,p.id))});let d=null;return a.addEventListener("wheel",u=>{let c=r(),p=i();if(!c||!p?.moveQ)return;u.preventDefault();let f=u.timeStamp;(!d||f-d.t>400)&&(d={q:p.q,t:f});let b=u.deltaMode===1?u.deltaY*16:u.deltaMode===2?u.deltaY*400:u.deltaY;d.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,d.q*2**(-b/240))),d.t=f,c.onBand(p.id,{q:d.q}),gt(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>gt(e,t.id)),a.addEventListener("focus",()=>gt(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&gt(e,null)}),a.addEventListener("blur",()=>{s||gt(e,null)}),a}function gt(e,t){let n=ke.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?Sn(e):To(e)}function To(e){let t=ke.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(m=>m.id===t.active):null;for(let m of e.querySelectorAll(".nc-eq-node"))m instanceof HTMLElement&&(a&&m.dataset.band===a.id?m.dataset.active="true":delete m.dataset.active);if(!a||!t.box){n.hidden=!0;return}let r=[a.label,wd(a.db)];a.kind==="peak"?r.push(Pi(a.hz),`Q ${a.q.toFixed(1)}`):r.push(`${a.kind==="lowshelf"?"below":"above"} ${Pi(a.hz)}`),n.textContent=r.join(" · "),n.dataset.tone=String(bg(t.control,a)),n.hidden=!1;let{w:i,h:s,pad:l}=t.box,d=gn(a.hz,i),u=Tt(a.db*Mo(a),s,t.control.range??18,l),c=n.offsetWidth,p=n.offsetHeight,f=Math.max(0,Math.min(i-c,d-c/2)),b=u-p-l*1.5>=0?u-p-l*1.5:Math.min(s-p,u+l*1.5);n.style.left=`${Math.round(f)}px`,n.style.top=`${Math.round(b)}px`}function bg(e,t){return e.bands.indexOf(t)%3+1}function kd(e,t){let n=ke.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Lo(e);let a=t.range??18;t.bands.forEach((r,i)=>{let s=xd(e,r.id);s instanceof HTMLElement&&(s.dataset.tone=String(i%3+1),s.dataset.kind=r.kind,s.setAttribute("aria-label",`${r.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(r.db)),s.setAttribute("aria-valuetext",r.valueText??`${wd(r.db)}, ${Pi(r.hz)}`),s.setAttribute("aria-keyshortcuts",r.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),r.help?s.setAttribute("data-nc-help",r.help):s.removeAttribute("data-nc-help"))}),Sn(e),$g(e)}function $d(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.round(t*a)),i=Math.max(1,Math.round(n*a));(e.width!==r||e.height!==i)&&(e.width=r,e.height=i);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function Sd(e){return{curve:Ge(e,"eq-curve"),fill:Ge(e,"eq-fill"),quiet:Ge(e,"text-sub"),grid:Ge(e,"eq-grid"),zero:Ge(e,"divider"),label:Ge(e,"text-sub"),spectrum:Ge(e,"eq-spectrum"),bands:[Ge(e,"eq-band-1"),Ge(e,"eq-band-2"),Ge(e,"eq-band-3")]}}function yg(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Sn(e){ke.has(e)&&Lo(e);let t=ke.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:r,w:i,h:s}=$d(n);if(!r)return;let l=Math.max(8,Math.round(s*.06)),d=a.range??18;t.box={w:i,h:s,pad:l},t.colours=Sd(e);let u=t.colours,c=yg(a,i);if(!t.cache||t.cache.key!==c){let A=Math.max(64,Math.ceil(i)+1),T=new Float64Array(A);for(let k=0;k<A;k++)T[k]=Ha(k/(A-1)*i,i);let y=null;try{y=typeof a.response=="function"?a.response(T):null}catch{y=null}t.cache={key:c,freqs:T,total:y?.total??new Float64Array(A),bands:y?.bands??[]}}r.clearRect(0,0,i,s);let p=ig(e),f=a.on!==!1;vg(r,i,s,d,l,u,p);let{freqs:b,total:m,bands:w}=t.cache,h=Array.from(b,A=>gn(A,i)),g=Tt(0,s,d,l);w.forEach((A,T)=>{if(!A||!A.some(E=>Math.abs(E)>.05))return;let y=f?u.bands[T%3]:u.quiet,k=Array.from(A,E=>Tt(E,s,d,l));r.save(),t.active&&a.bands[T]?.id===t.active&&(r.globalAlpha=.14,r.fillStyle=y,al(r,h,k,g)),r.globalAlpha=f?.75:.4,r.strokeStyle=y,r.lineWidth=.75,ei(r,h,k),r.restore()});let x=Array.from(m,A=>Tt(A,s,d,l)),v=f?u.curve:u.quiet;r.save(),r.fillStyle=f?u.fill:u.quiet,r.globalAlpha=f?.2:.08,al(r,h,x,g),r.restore(),r.save(),r.strokeStyle=f?u.fill:v,r.lineJoin="round",r.lineCap="round",f&&(r.globalAlpha=.16,r.lineWidth=4,ei(r,h,x)),r.globalAlpha=1,r.strokeStyle=v,r.lineWidth=1.25,ei(r,h,x),r.restore(),wg(e),To(e)}function vg(e,t,n,a,r,i,s){e.save(),e.lineWidth=1;for(let d=10;d<=1e4;d*=10)for(let u=1;u<=9;u++){let c=d*u;if(c<Qt||c>ga)continue;let p=Math.round(gn(c,t))+.5;e.globalAlpha=nl.includes(c)?.9:.35,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let d of ug)if(!(d>a))for(let u of[1,-1]){let c=Math.round(Tt(d*u,n,a,r))+.5;e.globalAlpha=d===12?.75:.4,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(0,c),e.lineTo(t,c),e.stroke()}e.globalAlpha=1,e.strokeStyle=i.zero;let l=Math.round(Tt(0,n,a,r))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=i.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let d of nl){let u=d>=1e3?`${d/1e3}k`:String(d),c=e.measureText(u).width,p=gn(d,t)+3;e.fillText(u,p+c+2>t?gn(d,t)-c-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let d of[12,0,-12]){if(Math.abs(d)>a)continue;let u=Tt(d,n,a,r);e.fillText(d>0?`+${d}`:d<0?`−${-d}`:"0",t-3,Math.round(u)-1)}e.restore()}function cr(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let r=(t[a]+t[a+1])/2,i=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],r,i)}e.lineTo(t[t.length-1],n[n.length-1])}function ei(e,t,n){e.beginPath(),cr(e,t,n),e.stroke()}function al(e,t,n,a){e.beginPath(),cr(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function Ed(e){return e.closest("[data-nc-maxable]")}function Ad(e){let t=Ed(e);return!!t&&!t.hasAttribute("data-nc-max")}function Lo(e){let t=Ad(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=ke.get(e);n?.active&&(n.active=null,To(e))}return t}function wg(e){Lo(e);let t=ke.get(e);if(!t?.box)return;let{w:n,h:a,pad:r}=t.box,i=t.control.range??18;for(let s of t.control.bands){let l=xd(e,s.id);l instanceof HTMLElement&&(l.style.left=`${gn(s.hz,n).toFixed(1)}px`,l.style.top=`${Tt(s.db*Mo(s),a,i,r).toFixed(1)}px`)}}function xg(e,t,n,a){let r=a/2/n,i=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let d=0;d<e;d++){let u=(d-.5)/(e-1)*t,c=(d+.5)/(e-1)*t,p=Ha(u,t),f=Ha(c,t),b=Ha(d/(e-1)*t,t);i[d]=Math.min(n-1,p/r),s[d]=Math.min(n-1,f/r),l[d]=cg*Math.log2(b/1e3)}return{lo:i,hi:s,tilt:l}}function kg(e,t,n){let a=Math.floor(t),r=Math.ceil(n);if(r-a<=1){let s=t-a,l=e[a]??-1/0,d=e[Math.min(e.length-1,a+1)]??l;return l+(d-l)*s}let i=-1/0;for(let s=a;s<=r&&s<e.length;s++)e[s]>i&&(i=e[s]);return i}function $g(e){let t=ke.get(e);if(t){if(!t.control.spectrum){Td(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let r=ke.get(e)?.spec;r&&(r.visible=a.some(i=>i.isIntersecting),Ri(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Ri(e)}}function Ri(e){let t=ke.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){Md(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Di(e),n.onVis||(n.onVis=()=>Ri(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&zi(e,!1)}function Di(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function zi(e,t){let n=ke.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,ti(e,Di(e))),og):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(r=>(n.raf=0,ti(e,r))):n.timer=a.setTimeout(()=>(n.timer=0,ti(e,Di(e))),Ii))}function Md(e){let t=ke.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function Td(e){let t=ke.get(e)?.spec;if(!t)return;Md(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=ke.get(e);n&&(n.spec=null)}function ti(e,t){let n=ke.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){Td(e);return}if(!a.analyser)return;if(t-a.last<Ii-4&&!a.idle){zi(e,!1);return}let r=a.last?Math.min(.25,(t-a.last)/1e3):Ii/1e3;a.last=t;let i=e.querySelector(".nc-eq-spectrum");if(!(i instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:d}=$d(i);if(!s)return;let u=Math.max(16,Math.round(l/2)),c=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==u||a.map.w!==l||a.map.sr!==c)&&(a.map={cols:u,w:l,sr:c,...xg(u,l,a.buf.length,c)},a.disp=new Float32Array(u).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,f=dg*r,{lo:b,hi:m,tilt:w}=a.map;for(let g=0;g<u;g++){let x=kg(a.buf,b[g],m[g]);x>p&&(p=x);let v=x+w[g],A=a.disp[g]-f;a.disp[g]=v>A?v:A}p>sg&&(a.loud=t);let h=t-a.loud>lg;s.clearRect(0,0,l,d),(!h||a.disp.some(g=>g>jt))&&Sg(s,l,d,a.disp,n.colours??Sd(e)),a.idle=h&&!a.disp.some(g=>g>jt),zi(e,a.idle)}function Sg(e,t,n,a,r){let i=a.length,s=new Array(i),l=new Array(i),d=u=>{let c=a[Math.max(0,Math.min(i-1,u))];return Number.isFinite(c)?c:jt};for(let u=0;u<i;u++){let c=d(u)*.36+(d(u-1)+d(u+1))*.22+(d(u-2)+d(u+2))*.1,p=(Math.max(jt,Math.min(tl,Number.isFinite(c)?c:jt))-jt)/(tl-jt);s[u]=u/(i-1)*t,l[u]=n-p*n}e.save(),e.fillStyle=r.spectrum,e.globalAlpha=.13,e.beginPath(),cr(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=r.spectrum,e.lineWidth=1,e.beginPath(),cr(e,s,l),e.stroke(),e.restore()}var De=new WeakMap,Eg=450,Ag=6,Mg=33,ni=24,Tg="http://www.w3.org/2000/svg";function Lg(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function Cg(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function Ng(e,t,n,a,r){let i=e.slice();if(t===a)return i[a]=r,i;let s=t<a?1:-1;for(let l=t;l!==a+s;l+=s){let d=(l-t)/(a-t);i[l]=Math.round((n+(r-n)*d)*100)/100}return i}function Fg(e,t){let n=e.steps[t],a=(e.shapes??[]).find(i=>i.value===n.shape),r=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${a?`, ${a.label}`:""}${r}`}function qt(e,t){let n=document.createElementNS(Tg,e);for(let[a,r]of Object.entries(t))n.setAttribute(a,String(r));return n}function Ld(e){let t=qt("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(qt("path",{d:e})),t}function Ig(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-lsteps-plot",a.tabIndex=0,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical"),a.setAttribute("aria-valuemin","0"),a.setAttribute("aria-valuemax","100"),a.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let r=document.createElement("div");r.className="nc-lsteps-axis",r.setAttribute("aria-hidden","true");let i=document.createElement("div");i.className="nc-lsteps-shapes",i.setAttribute("role","tablist");let s=document.createElement("div");s.className="nc-lsteps-pick",s.setAttribute("role","menu"),s.hidden=!0,n.append(a,r,i,s);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let d={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return De.set(n,d),Rg(n,a),Dg(n,s),Cd(n,e),n}function _e(e){let t=De.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function Pg(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function ai(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),a=Pg(e);return{i:Cg(t.clientX,a),level:Lg(t.clientY-n.top,n.height)}}function Rg(e,t){let n=De.get(e),a=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",i=>{let s=_e(e);if(!s||i.button>0||!s.steps.length)return;i.preventDefault(),dr(e),t.setPointerCapture?.(i.pointerId);let l=ai(t,i),d=s.steps.map(u=>u.level);n.drag={id:i.pointerId,x:i.clientX,y:i.clientY,start:d,levels:d,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,rl(e,l.i,l.level,l.i,l.level,!1),a(),n.timer=setTimeout(()=>{n.timer=0;let u=n.drag;!u||u.moved||(u.long=!0,_e(e)?.onLevels(u.start.slice(),!0),ri(e,u.i))},Eg)}),t.addEventListener("pointermove",i=>{let s=n.drag;if(!s||s.id!==i.pointerId||s.long||!s.moved&&Math.hypot(i.clientX-s.x,i.clientY-s.y)<Ag)return;s.moved=!0,a();let l=ai(t,i);rl(e,s.i,s.level,l.i,l.level,!1),s.i=l.i,s.level=l.level});let r=i=>{let s=n.drag;!s||s.id!==i.pointerId||(a(),n.drag=null,t.releasePointerCapture?.(i.pointerId),s.long||_e(e)?.onLevels(s.levels.slice(),!0),Oi(e,-1))};t.addEventListener("pointerup",r),t.addEventListener("pointercancel",i=>{let s=n.drag;!s||s.id!==i.pointerId||(a(),n.drag=null,s.long||_e(e)?.onLevels(s.start.slice(),!0),Oi(e,-1))}),t.addEventListener("contextmenu",i=>{_e(e)?.onShape&&(i.preventDefault(),ri(e,ai(t,i).i))}),t.addEventListener("keydown",i=>{let s=_e(e);if(!s||!s.steps.length)return;let l=s.steps.length,d=Math.min(n.focus,l-1),u=s.steps[d].level,c=p=>{let f=s.steps.map(b=>b.level);f[d]=Math.round(Math.max(0,Math.min(1,p))*100)/100,s.onLevels(f,!0)};switch(i.key){case"ArrowLeft":n.focus=(d-1+l)%l;break;case"ArrowRight":n.focus=(d+1)%l;break;case"ArrowUp":c(u+(i.shiftKey?.01:.05));break;case"ArrowDown":c(u-(i.shiftKey?.01:.05));break;case"PageUp":c(u+.25);break;case"PageDown":c(u-.25);break;case"Home":c(1);break;case"End":c(0);break;case"Enter":case" ":if(!s.onShape)return;ri(e,d);break;default:return}i.preventDefault(),Bi(e)}),t.addEventListener("focus",()=>Bi(e)),t.addEventListener("blur",()=>{for(let i of t.querySelectorAll("[data-focus]"))i.removeAttribute("data-focus")})}function rl(e,t,n,a,r,i){let s=De.get(e).drag;s&&(s.levels=Ng(s.levels,t,n,a,r),Oi(e,a,s.levels[a]),_e(e)?.onLevels(s.levels.slice(),i))}function Oi(e,t,n){for(let a of e.querySelectorAll(".nc-lsteps-step"))Number(a.dataset.i)===t?(a.dataset.dragging="true",a.dataset.level=`${Math.round(n*100)}%`):a.removeAttribute("data-dragging")}function Bi(e){let t=De.get(e),n=e.querySelector(".nc-lsteps-plot"),a=_e(e);if(!n||!a)return;for(let i of n.querySelectorAll(".nc-lsteps-step"))Number(i.dataset.i)===t.focus?i.dataset.focus="true":i.removeAttribute("data-focus");let r=Math.min(t.focus,a.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((a.steps[r]?.level??0)*100))),n.setAttribute("aria-valuetext",Fg(a,r))}function Dg(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),dr(e,!0);return}let a=[...t.querySelectorAll("button")],r=a.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),a[(r+1)%a.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),a[(r-1+a.length)%a.length]?.focus())}),De.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&dr(e)}}function ri(e,t){let n=_e(e),a=e.querySelector(".nc-lsteps-pick"),r=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!a||!r)return;let i=De.get(e);i.focus=t,a.textContent="";let s=document.createElement("span");s.className="nc-lsteps-pick-head",s.textContent=`Step ${t+1}`,a.append(s);for(let b of n.shapes??[]){let m=document.createElement("button");m.type="button",m.setAttribute("role","menuitemradio"),m.setAttribute("aria-checked",n.steps[t]?.shape===b.value?"true":"false"),b.icon&&m.append(Ld(b.icon)),m.append(document.createTextNode(b.label)),m.addEventListener("click",()=>{_e(e)?.onShape?.(t,b.value),dr(e,!0)}),a.append(m)}a.setAttribute("aria-label",`Shape of step ${t+1}`),a.hidden=!1,e.ownerDocument.addEventListener("pointerdown",i.outside,!0);let l=r.querySelector(`.nc-lsteps-step[data-i="${t}"]`),d=e.getBoundingClientRect(),u=l?.getBoundingClientRect(),c=a.getBoundingClientRect().width,p=u?u.left+u.width/2-d.left:0,f=Math.max(0,Math.min(d.width-c,p-c/2));a.style.setProperty("--nc-lsteps-pick-x",`${Math.round(f)}px`),a.querySelector('[aria-checked="true"]')?.focus?.()??a.querySelector("button")?.focus?.()}function dr(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",De.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function zg(e,t){let n=De.get(e),a=e.querySelector(".nc-lsteps-plot"),r=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,a.textContent="",r.textContent="";for(let i=0;i<t;i++){let s=document.createElement("div");s.className="nc-lsteps-step",s.dataset.i=String(i),i%4===0&&i>0&&(s.dataset.beat="true");let l=qt("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(qt("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),qt("path",{class:"nc-lsteps-env",d:""}),qt("path",{class:"nc-lsteps-top",d:""}),qt("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),s.append(l),a.append(s);let d=document.createElement("span");i%4===0&&(d.textContent=String(i+1)),i%4===0&&i>0&&(d.dataset.beat="true"),r.append(d)}}}function Cd(e,t){let n=De.get(e);if(!n)return;n.control=t;let a=t.steps.length;zg(e,a),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let r=e.querySelector(".nc-lsteps-plot");r.setAttribute("aria-label",t.label??"Steps");let i=Math.max(.5,Math.min(.75,t.swing??.5)),s=r.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((b,m)=>{let w=s[m];if(!w)return;let h=String((m%2?1-i:i)*2);w.style.setProperty("--nc-lsteps-grow",h),l[m]?.style.setProperty("--nc-lsteps-grow",h),t.played!==void 0&&m>=t.played?w.dataset.out="true":w.removeAttribute("data-out"),w.dataset.zero=b.level<=0?"true":"false";let g=Math.max(0,Math.min(1,b.level)),x=w.querySelector(".nc-lsteps-level");x.setAttribute("y",String(100-g*100)),x.setAttribute("height",String(g*100));let v=t.curve?t.curve(m,ni):null,A="M0 100",T="";for(let y=0;y<=ni;y++){let k=v?Math.max(0,Math.min(1,v[y]??g)):g,E=y/ni*100,$=100-k*100;A+=` L${E.toFixed(2)} ${$.toFixed(2)}`,T+=`${y?" L":"M"}${E.toFixed(2)} ${$.toFixed(2)}`}w.querySelector(".nc-lsteps-env").setAttribute("d",`${A} L100 100 Z`),w.querySelector(".nc-lsteps-top").setAttribute("d",T)});let d=e.querySelector(".nc-lsteps-shapes"),u=(t.shapes??[]).map(b=>`${b.value}:${b.label}`).join();if(u!==n.shapeKey){n.shapeKey=u,d.textContent="";for(let b of t.shapes??[]){let m=document.createElement("button");m.type="button",m.className="nc-lsteps-shape",m.setAttribute("role","tab"),m.dataset.shape=String(b.value),b.icon&&m.append(Ld(b.icon)),m.append(document.createTextNode(b.label)),m.addEventListener("click",()=>_e(e)?.onShapeAll?.(b.value)),d.append(m)}}d.hidden=!(t.shapes?.length&&t.onShapeAll),d.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let c=t.played??a,p=t.steps[0]?.shape,f=t.steps.slice(0,c).every(b=>b.shape===p);for(let b of d.querySelectorAll(".nc-lsteps-shape")){let m=f&&b.dataset.shape===String(p);b.setAttribute("aria-selected",m?"true":"false"),b.tabIndex=m||!f&&b===d.firstElementChild?0:-1}n.focus>=a&&(n.focus=0),Bi(e),n.last=-2,Og(e)}function Og(e){let t=De.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&ii(e,null);return}let a=0,r=i=>{if(t.loop=0,!e.isConnected||!t.control.playhead){ii(e,null);return}i-a>=Mg&&(a=i,ii(e,t.control.playhead())),t.loop=n.requestAnimationFrame(r)};t.loop=n.requestAnimationFrame(r)}function ii(e,t){let n=De.get(e),a=t&&Number.isInteger(t.step)?t.step:-1,r=!!t?.locked;if(!(n.last===a&&n.lastLocked===r)){n.last=a,n.lastLocked=r;for(let i of e.querySelectorAll(".nc-lsteps-step"))Number(i.dataset.i)===a?(i.dataset.playhead="true",i.dataset.locked=r?"true":"false"):(i.removeAttribute("data-playhead"),i.removeAttribute("data-locked"));e.dataset.free=t&&!r?"true":"false"}}var Bg=.8912509381337456,_i=32,_g=250,jg=1200,qg=.2,Nd=1.5;function Vg(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function Hg(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let r=e.createElement("span");r.className="nc-fx-level-fill",a.append(r),t.append(a)}return t}var ur=new WeakMap,il=new WeakMap;function ol(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let r=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),i=Number.parseFloat(r);return Number.isFinite(i)?r.endsWith("ms")?i/1e3:i:n}function Ug(e){let t=il.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(r=>{for(let i of r){let s=ur.get(i.target);s&&(s.seen.set(i.target,i.isIntersecting),Qn(s))}pn(t)})),e.addEventListener("visibilitychange",()=>{for(let r of t.recs)Qn(r);pn(t)}),il.set(e,t),t}var Fd=e=>e.els.some(t=>t.isConnected);function Gg(e){if(!e.loop.io)return Fd(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function Qn(e){let t=!e.dead&&!!e.source&&Gg(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Co(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Vi(e))}function Co(e){return e.doc.defaultView?.performance?.now()??Date.now()}function pn(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){Id(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Co(e)),!e.raf&&!e.timer&&ji(e,!1)}function ji(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>sl(e,Co(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),_g):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(r=>(e.raf=0,sl(e,r))):e.timer=n.setTimeout(()=>(e.timer=0,a()),_i)}function Id(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function sl(e,t){if(t-e.last<_i-4&&!e.idle&&e.last){ji(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):_i/1e3;e.last=t,e.frames++;let a=!1,r=!1;for(let i of e.recs){if(!Fd(i)){(i.placed||e.frames-i.born>90)&&Pd(i);continue}i.placed=!0,i.open&&(r=!0,Wg(i,n,t)&&(e.loud=t),(i.disp[0]>0||i.disp[1]>0)&&(a=!0))}if(!r){Id(e);return}e.idle=t-e.loud>jg&&!a,ji(e,e.idle)}function Wg(e,t,n){if(e.fall<0){let f=e.els[0];e.fall=ol(f,"motion-meter-fall",qg),e.hold=ol(f,"motion-meter-hold",Nd)}let a=null;try{a=e.source.read()}catch{a=null}let r=typeof a=="number",i=r?a:Number(a?.in)||0,s=!r&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,d=s?"2":"1";if(e.rows!==d){e.rows=d;for(let f of e.els)f.dataset.ncRows=d}let u=e.fall>0?Math.exp(-t/e.fall):0,c=[i,l],p=!1;for(let f=0;f<2;f++){let b=Vg(c[f]);b>0&&(p=!0),e.disp[f]=b>=e.disp[f]?b:b+(e.disp[f]-b)*u,e.disp[f]<.001&&(e.disp[f]=0),c[f]>=Bg&&(e.clipAt[f]=n);let m=e.clipAt[f]>0&&n-e.clipAt[f]<e.hold*1e3;qi(e,f,e.disp[f],m)}return p}function qi(e,t,n,a){let r=Math.round(n*1e3)/1e3,i=a?"true":"false";if(!(e.shown[t]===r&&e.clipShown[t]===i)){e.shown[t]=r,e.clipShown[t]=i;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${r})`,l.dataset.clip=i)}}}function Vi(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,qi(e,0,0,!1),qi(e,1,0,!1)}function Pd(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),ur.get(t)===e&&ur.delete(t)}function Kg(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,r=Ug(a),i={els:n,source:t??null,loop:r,open:!1,dead:!1,seen:new Map,born:r.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:Nd,rows:""};for(let s of n)ur.set(s,i),r.io?.observe(s);if(r.recs.add(i),Vi(i),!r.io){let s=a.defaultView,l=()=>{Qn(i),pn(r)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!i.dead){if(l===i.source){Qn(i),pn(r);return}i.open&&(i.open=!1,i.source?.close?.(),Vi(i)),i.source=l,Qn(i),pn(r)}},destroy(){i.dead||Pd(i),pn(r)}}}var Rd={slop:8,longPressMs:500,pitchPx:16},Yg=class{constructor(e,t,n=Rd){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let r=this.hit(t,n);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let r=t-this.x0,i=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(r,i)<this.config.slop)return;Math.abs(i)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-i/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Xg(e,t,n,a=Rd){let r=!1,i=0,s=(u,c)=>{let p=e.ownerDocument.elementFromPoint?.(u,c),f=[...e.querySelectorAll(t)],b=p?f.findIndex(h=>h===p||h.contains(p)):-1;if(b>=0)return b;let m=-1,w=Number.POSITIVE_INFINITY;return f.forEach((h,g)=>{if(h.hidden)return;let x=h.getBoundingClientRect();if(c<x.top||c>x.bottom)return;let v=Math.abs(u-(x.left+x.width/2));v<w&&v<=x.width&&(m=g,w=v)}),m},l=new Yg(s,u=>{(u.kind==="paint"||u.kind==="long")&&(r=!0),n(u)},a),d=()=>{i&&clearTimeout(i),i=0};return e.addEventListener("pointerdown",u=>{u.button>0||(r=!1,l.down(u.pointerId,u.clientX,u.clientY,u.timeStamp)&&(d(),i=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",u=>{l.state!=="idle"&&(l.move(u.pointerId,u.clientX,u.clientY,u.timeStamp),l.state!=="pending"&&d())}),e.addEventListener("pointerup",u=>{d(),l.up(u.pointerId,u.clientX,u.clientY,u.timeStamp)}),e.addEventListener("pointercancel",u=>{d(),l.cancel(u.pointerId)}),e.addEventListener("click",u=>{r&&(r=!1,u.stopPropagation(),u.preventDefault())},!0),e.addEventListener("contextmenu",u=>u.preventDefault()),l}var Dd="netcomposer.groups.v1";function No(){try{return globalThis.localStorage??null}catch{return null}}function zd(e=No(),t=Dd){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[r,i]of Object.entries(n))typeof i=="boolean"&&a.set(r,i);return a}catch{return new Map}}function Jg(e,t,n,a=Dd){let r=zd(e,a);r.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(r)))}catch{}}function Qg(e,t=No()){return zd(t).get(e.id)??e.open===!0}function Zg(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let r=document.createElement("button");r.type="button",r.className="nc-group-toggle",r.id=`${e.id}-group-toggle`;let i=document.createElement("span");i.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),r.append(i,s,l);let d=document.createElement("div");d.className="nc-group-body",d.id=`${e.id}-group-body`,d.setAttribute("role","group"),d.setAttribute("aria-labelledby",r.id),r.setAttribute("aria-controls",d.id);for(let u of e.controls)d.append(n(u,t));return r.addEventListener("click",()=>{let u=a.dataset.ncOpen!=="true";Jg(No(),e.id,u),Hi(a,u);let c=t(a);c?.type==="group"&&c.onToggle?.(u)}),a.append(r,d),Od(a,e),Hi(a,Qg(e)),Bd(a,e),a}function Hi(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let r=n?.querySelector(".nc-group-mark");r&&(r.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function Od(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function Bd(e,t){Od(e,t)&&Hi(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),r=t.summary??"";a&&a.textContent!==r&&(a.textContent=r)}var Na="application/x-nc-pad",ll="http://www.w3.org/2000/svg";function eb(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],r=[];for(let i=0;i<n;i++){let s=Math.floor(i*t/n),l=Math.max(s+1,Math.floor((i+1)*t/n)),d=0,u=0;for(let p=s;p<l;p++)d=Math.min(d,e[2*p]??0),u=Math.max(u,e[2*p+1]??0);let c=n===1?50:i/(n-1)*100;a.push(`${c.toFixed(1)} ${(10-Math.min(1,u)*10).toFixed(2)}`),r.push(`${c.toFixed(1)} ${(10-Math.max(-1,d)*10).toFixed(2)}`)}return`M${a.join("L")}L${r.reverse().join("L")}Z`}function tb(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((r,i)=>a.append(nb(n,i,t))),n.append(a),n.addEventListener("keydown",r=>{r.key==="Escape"&&Ua(n)}),jd(n,e),n}function nb(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let r=document.createElement("span");r.className="nc-padgrid-pad-bar",r.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let d=document.createElementNS(ll,"svg");d.setAttribute("class","nc-padgrid-pad-wave"),d.setAttribute("viewBox","0 0 100 20"),d.setAttribute("preserveAspectRatio","none"),d.setAttribute("aria-hidden","true");let u=document.createElementNS(ll,"path");return d.append(u),a.append(r,i,s,l,d),rb(e,a,t,n),i.addEventListener("dblclick",()=>{let c=n(e);c?.type==="padGrid"&&c.onRename&&a.dataset.empty!=="true"&&_d(e,a,t,n)}),a.addEventListener("dragstart",c=>{if(a.dataset.empty==="true"||!c.dataTransfer){c.preventDefault();return}c.dataTransfer.setData(Na,String(t)),c.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",c=>{let p=c.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(Na)||(c.preventDefault(),c.stopPropagation(),c.dataTransfer&&(c.dataTransfer.dropEffect=p.includes(Na)&&!c.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",c=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let f=c.dataTransfer?.getData(Na);if(f!==void 0&&f!==""){c.preventDefault(),c.stopPropagation();let m=Number(f);m!==t&&p.onMove?.(m,t,c.altKey);return}let b=c.dataTransfer?.files?.[0];b&&(c.preventDefault(),c.stopPropagation(),p.onFile?.(t,b))}),a}function ab(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function rb(e,t,n,a){let r=0,i=!1,s=0,l=0,d=()=>{window.clearTimeout(r),r=0};t.addEventListener("pointerdown",u=>{if(u.button!==0)return;i=!1,s=u.clientX,l=u.clientY,d();let c=a(e);c?.type==="padGrid"&&(c.onDown?.(n),!(c.onDown&&u.pointerType==="mouse")&&(r=window.setTimeout(()=>{r=0,i=cl(e,t,n,a)},450)))}),t.addEventListener("pointermove",u=>{r&&Math.hypot(u.clientX-s,u.clientY-l)>8&&d()});for(let u of["pointerup","pointercancel","pointerleave"])t.addEventListener(u,d);t.addEventListener("contextmenu",u=>{u.preventDefault(),d(),i=cl(e,t,n,a)}),t.addEventListener("click",()=>{if(i){i=!1;return}ab(e,n,a)})}function cl(e,t,n,a){let r=a(e);if(r?.type!=="padGrid"||!r.menu)return!1;let i=r.menu(n);if(!i.length)return!1;Ua(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),Ua(e)}),s.addEventListener("click",c=>c.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let c of i){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=c.id,p.textContent=c.label,p.addEventListener("click",()=>{Ua(e);let f=a(e);f?.type==="padGrid"&&(c.id==="rename"&&f.onRename?_d(e,t,n,a):f.onMenu?.(n,c.id))}),l.append(p)}e.append(s,l);let d=e.getBoundingClientRect(),u=t.getBoundingClientRect();return l.style.left=`${u.left-d.left}px`,l.style.top=`${u.bottom-d.top}px`,l.querySelector("button")?.focus(),!0}function _d(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let r=a(e);if(r?.type!=="padGrid")return;let i=document.createElement("input");i.type="text",i.className="nc-padgrid-rename",i.maxLength=r.nameMax??24,i.value=r.pads[n]?.label??"",i.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-s.left}px`,i.style.top=`${l.top-s.top}px`,i.style.width=`${l.width}px`;let d=!1,u=c=>{if(d)return;d=!0;let p=i.value.trim();i.remove(),t.focus();let f=a(e);c&&p&&f?.type==="padGrid"&&f.onRename?.(n,p)};i.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"?u(!0):c.key==="Escape"&&u(!1)}),i.addEventListener("blur",()=>u(!0));for(let c of["pointerdown","click","dblclick"])i.addEventListener(c,p=>p.stopPropagation());e.append(i),i.focus(),i.select()}function Ua(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function jd(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,r)=>{let i=n[r];if(!(i instanceof HTMLButtonElement))return;let s=i.querySelector(".nc-padgrid-pad-name"),l=i.querySelector(".nc-padgrid-pad-hint"),d=i.querySelector(".nc-padgrid-pad-wave path"),u=i.querySelector(".nc-padgrid-pad-badge");u&&(u.textContent=a.empty?"":a.badge??""),i.draggable=!a.empty,a.empty?(i.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),d?.setAttribute("d","")):(delete i.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=a.hint??""),d?.setAttribute("d",eb(a.peaks))),!a.empty&&a.hint?i.dataset.hint="true":delete i.dataset.hint,a.lane?i.dataset.ncLane=String(a.lane):delete i.dataset.ncLane;let c=t.selected===r;c?i.dataset.selected="true":delete i.dataset.selected,i.setAttribute("aria-pressed",c?"true":"false"),a.playing?i.dataset.playing="true":delete i.dataset.playing,i.setAttribute("aria-label",a.empty?`Pad ${r+1}, empty: load a sample`:`Pad ${r+1}, ${a.label}${a.hint?`, ${a.hint}`:""}${a.badgeLabel?`, ${a.badgeLabel}`:""}${c?", selected":""}`)})}function Te(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Lr(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(a,r),n}function dl(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function oa(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var ib=450,ul=8;function Ke(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function ob(e){let t=Dm(e,"target-min");return t>0?t:44}function sb(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=ob(e),a=n/2,r=t.map(i=>i.parentElement?.getBoundingClientRect()??null);for(let i=0;i<t.length;i++){let s=t[i],l=r[i];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let d=l.left+l.width/2,u=l.top+l.height/2,c=d-a,p=d+a,f=u-a,b=u+a;for(let m=0;m<t.length;m++){if(i===m)continue;let w=r[m];if(!w||w.width===0)continue;let h=w.left+w.width/2,g=w.top+w.height/2;Math.abs(g-u)<a*2&&(h>d?p=Math.min(p,(d+h)/2):h<d&&(c=Math.max(c,(d+h)/2))),Math.abs(h-d)<a*2&&(g>u?b=Math.min(b,(u+g)/2):g<u&&(f=Math.max(f,(u+g)/2)))}c=Math.min(c,l.left),p=Math.max(p,l.right),f=Math.min(f,l.top),b=Math.max(b,l.bottom),s.style.left=`${c-l.left}px`,s.style.top=`${f-l.top}px`,s.style.width=`${Math.max(0,p-c)}px`,s.style.height=`${Math.max(0,b-f)}px`,s.style.transform="none"}}function qd(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function pl(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Xt(e,t){switch(e.type){case"slider":return lb(e,t);case"select":return db(e,t);case"toggle":return ub(e,t);case"button":return pb(e,t);case"readout":return hb(e);case"label":return bb(e);case"note":return hl(e);case"knob":return wb(e,t);case"choice":return xb(e,t);case"slotRow":return kb(e,t);case"stepGrid":return Ab(e,t);case"canvas":return Cb(e);case"fx":return Bb(e,t);case"eqGraph":return mg(e,t);case"levelSteps":return Ig(e,t);case"group":return Zg(e,t,Xt);case"strip":return Nb(e,t);case"stripAdd":return Rb(e,t);case"padGrid":return tb(e,t);case"moves":return mb(e,t);default:return hl({id:"unknown",text:""})}}function je(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Ud(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(Vd(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let r=e.querySelector("[data-nc-readout]");r&&(r.textContent=t.valueText??oa(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),dl(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")dl(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&Lt(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&yb(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??oa(t.value))}else if(t.type==="choice")Gd(e,t);else if(t.type==="slotRow")Kd(e,t);else if(t.type==="stepGrid")Gi(e,t);else if(t.type==="padGrid")jd(e,t);else if(t.type==="moves")Hd(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&vd(n,t)}else if(t.type==="eqGraph")kd(e,t);else if(t.type==="levelSteps")Cd(e,t);else if(t.type==="strip"){Qd(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${Jt(n.id)}"]`);a instanceof Element&&je(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Xd(e,t);else if(t.type==="group"){Bd(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${Jt(n.id)}"]`);a instanceof Element&&je(a,n)}}else if(t.type==="fx"){su(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${Jt(n.id)}"]`);a instanceof Element&&je(a,n)}}}}function lb(e,t){let n=Lr(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let r=Tr(e.taper,e.min,e.max);a.min=String(r?0:e.min),a.max=String(r?1e3:e.max),a.step=String(r?1:e.step),r&&(a.dataset.ncTaper=e.taper),a.value=String(Vd(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let i=l=>r?Ni(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(i(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(i(l))}),r&&a.addEventListener("keydown",l=>{let d=t(a);if(d?.type!=="slider"||a.disabled)return;let u=d.taper??e.taper,c=yd(u,d.min,d.max,d.value,l.key,l.shiftKey,d.step);c!==null&&(l.preventDefault(),a.value=String(Eo(u,d.min,d.max,c)),d.onChange(c),d.onCommit?.(c))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(cb(e,a,t),s),n.append(Te()),je(n,e),n}function Vd(e){return Tr(e.taper,e.min,e.max)?Eo(e.taper,e.min,e.max,e.value):e.value}function cb(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(Ke());let r=i=>{let s=n(t);s?.type==="slider"&&s.onTap?.(i)};return a.addEventListener("pointerdown",i=>{i.button===0&&r(i.timeStamp)}),a.addEventListener("keydown",i=>{i.repeat||i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),r(i.timeStamp))}),a}function db(e,t){let n=Lr(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let r=null;for(let i of e.options){let s=document.createElement("option");s.value=i.value,s.textContent=i.label,i.disabled&&(s.disabled=!0),i.group?r?.getAttribute("label")!==i.group&&(r=document.createElement("optgroup"),r.setAttribute("label",i.group),a.append(r)):r=null,(r??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let i=t(a);i?.type==="select"&&i.onChange(a.value)}),n.append(a,Te()),n}function ub(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(Te()),je(n,e),n}function pb(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let i=t(n);i?.type==="button"&&i.onPress()}),n.append(Te()),je(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=e.id,r.setAttribute("aria-label","Surprise me"),r.title=e.sparkleTitle??"Surprise me",r.innerHTML=qd(),r.addEventListener("click",()=>{let i=n.closest(".nc-module")?.querySelector(".nc-slot-row");i instanceof HTMLElement&&Yd(i);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,r),a}function hb(e){let t=Lr(e.id,e.label);return t.append(Te()),je(t,e),t}var fb=450;function mb(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let r=document.createElement("div");r.className="nc-moves-row",r.setAttribute("role","group"),r.setAttribute("aria-label",a.label),a.title&&(r.title=a.title);let i=document.createElement("span");i.className="nc-moves-label",i.setAttribute("aria-hidden","true"),i.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let d=document.createElement("button");d.type="button",d.className="nc-moves-btn",d.dataset.ncMove=l.id,d.title=l.title??l.text,d.setAttribute("aria-label",`${a.label} ${l.text}`),d.append(gb(l.icon)),d.addEventListener("click",()=>{let u=t(n);u?.type==="moves"&&u.onMove(l.id)}),s.append(d)}r.append(i,s),n.append(r)}return Hd(n,e),n}function Hd(e,t){for(let n of t.groups)for(let a of n.moves){let r=e.querySelector(`[data-nc-move="${Jt(a.id)}"]`);r instanceof HTMLButtonElement&&(r.disabled=a.disabled===!0)}}function gb(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function bb(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(Te()),t}function hl(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(Te()),t}function fl(e){if(typeof e.valueText=="string")return e.valueText;let t=oa(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Ud(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function yb(e,t){let n=lr(t.taper,t.min,t.max,t.value);Ud(e,t.modulated===!0);let a=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(a)),t.bipolar){let r=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(lr(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(a,r))),e.style.setProperty("--knob-to",String(Math.max(a,r)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",fl(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${fl(t)}`}function vb(e,t){if(Tr(e.taper,e.min,e.max))return yd(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,r=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+r:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-r:null}function wb(e,t){let n=Lr(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let r=document.createElement("i");r.className="nc-knob-mark",a.append(r);let i=0,s=0;a.addEventListener("pointerdown",u=>{i=u.clientY;let c=t(a);s=c&&"value"in c?Number(c.value):0,a.setPointerCapture?.(u.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",u=>{if(a.hasPointerCapture&&!a.hasPointerCapture(u.pointerId))return;let c=t(a);if(c?.type!=="knob")return;if(Tr(c.taper,c.min,c.max)){let b=lr(c.taper,c.min,c.max,s)-(u.clientY-i)/120;c.onChange(gd(c.taper,c.min,c.max,b));return}let p=c.max-c.min||1,f=Math.min(c.max,Math.max(c.min,s-(u.clientY-i)*p/120));c.onChange(f)}),a.addEventListener("dblclick",()=>{let u=t(a);u?.type==="knob"&&typeof u.defaultValue=="number"&&u.onChange(u.defaultValue)}),a.addEventListener("keydown",u=>{let c=t(a);if(c?.type!=="knob")return;let p=vb(c,u);p!==null&&(u.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,p))))});let d=n.querySelector("[data-nc-readout]");return n.insertBefore(a,d),n.append(Te()),je(n,e),n}function xb(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let a=document.createElement("span");a.className="nc-label nc-choice-caption",a.setAttribute("aria-hidden","true"),a.textContent=e.caption,n.dataset.ncCaption="",n.append(a)}for(let a of e.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=a.value,r.setAttribute("role","tab"),r.textContent=a.label,r.addEventListener("click",()=>{let i=t(n);i?.type==="choice"&&i.onChange(a.value)}),r.addEventListener("keydown",i=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),d=l;if(i.key==="ArrowRight"||i.key==="ArrowDown")d=(l+1)%s.length;else if(i.key==="ArrowLeft"||i.key==="ArrowUp")d=(l-1+s.length)%s.length;else if(i.key==="Home")d=0;else if(i.key==="End")d=s.length-1;else return;let u=s[d];u instanceof HTMLButtonElement&&(i.preventDefault(),u.focus(),u.click())}),n.append(r)}return n.append(Te()),Gd(n,e),n}function Gd(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function kb(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let c=0;c<e.slots.length;c++){let p=e.slots[c],f=document.createElement("span");f.className="nc-snap-wrap";let b=document.createElement("button");b.type="button",b.className="nc-snap",b.dataset.ncSlot=String(c),b.textContent=p.label,b.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(b,Ke()),$b(f,b,n,c,t),a.append(f)}let r=e.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=qd(),r.append(Ke()),r.addEventListener("click",()=>{Yd(n);let c=t(n);c?.type==="slotRow"&&c.onSparkle?.()}));let i=document.createElement("div");i.className="nc-field nc-morph-field",i.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let c=t(n);c?.type==="slotRow"&&c.onMorph(Number(l.value))});let d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",i.append(s,d,l);let u=document.createElement("div");return u.className="nc-slot-line",u.append(a,...r?[r]:[]),n.append(u,i,Te()),Wd(n,t),Kd(n,e),n}function ml(e,t,n,a){let r=n(e);if(r?.type!=="slotRow")return;Un(e);let i=a.shiftKey?"store":a.altKey?"clear":"recall";r.onSlot(t,i)}function $b(e,t,n,a,r){let i=0,s=0,l=0,d=!1,u=!1,c=!1,p=!1,f=()=>{window.clearTimeout(i),i=0},b=g=>{let x=g.clientX-s,v=g.clientY-l;x*x+v*v>ul*ul&&(d=!0,f())},m=()=>{p&&(p=!1,window.removeEventListener("pointermove",b),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",h))},w=g=>{let x=i!==0&&!d&&!u;f(),m(),x&&(c=!0,ml(n,a,r,g))},h=()=>{d=!0,f(),m()};e.addEventListener("pointerdown",g=>{g.button===0&&(m(),u=!1,d=!1,c=!1,s=g.clientX,l=g.clientY,f(),i=window.setTimeout(()=>{i=0,!d&&(u=!0,Sb(n,t,a,r))},ib),p=!0,window.addEventListener("pointermove",b),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",h))}),e.addEventListener("contextmenu",g=>g.preventDefault()),e.addEventListener("click",g=>{if(c||u||d){c=!1,u=!1,d=!1;return}ml(n,a,r,g)})}function Wd(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=gl("Save","store"),r=gl("Clear","clear");n.append(a,r);let i=document.createElement("div");i.className="nc-slot-scrim",i.hidden=!0,i.setAttribute("aria-hidden","true"),i.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),Un(e)}),i.addEventListener("click",s=>s.stopPropagation()),e.append(i,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let d=t(e);if(d?.type!=="slotRow")return;let u=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(u,"store"),Un(e)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(u,"clear"),Un(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&Un(e)})}function gl(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Sb(e,t,n,a){Wd(e,a);let r=e.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let i=e.querySelector(".nc-slot-scrim");i instanceof HTMLElement&&(i.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function Un(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Kd(e,t){for(let r of e.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let i=Number(r.dataset.ncSlot),s=t.slots[i];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function Yd(e){let t=e.dataset.ncLastFill||null,n=xm(t);e.dataset.ncLastFill=n;let a=km(n);if(a)for(let[r,i]of Object.entries(a))e.style.setProperty(r,i)}function Eb(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,r=i=>{if(a===i)return;a=i,n.setAttribute("aria-pressed",i?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(i)};n.addEventListener("pointerdown",i=>{i.button===0&&(i.preventDefault(),n.setPointerCapture?.(i.pointerId),r(!0))});for(let i of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(i,()=>r(!1));return n.addEventListener("keydown",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),i.repeat||r(!0))}),n.addEventListener("keyup",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),r(!1))}),n.addEventListener("contextmenu",i=>i.preventDefault()),n}function Ab(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let r=h=>{let g=document.createElement("button");return g.type="button",g.setAttribute("role","radio"),g.textContent=h,a.append(g),g},i=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=h=>{for(let g of[i,s]){let x=g===h;g.setAttribute("aria-checked",x?"true":"false"),g.tabIndex=x?0:-1}};l(i);for(let h of[i,s])h.addEventListener("click",()=>l(h));a.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();let g=s.getAttribute("aria-checked")==="true"?i:s;l(g),g.focus()});let d=document.createElement("div");if(d.className="nc-step-tools",d.append(a),e.onFill&&d.append(Eb(n,t)),e.onClear){let h=document.createElement("button");h.type="button",h.className="nc-fill nc-clear",h.dataset.ncClear="",h.textContent=e.clearLabel??"Clear",h.title="Clear every step (Undo takes it back)",h.addEventListener("click",()=>{let g=t(n);g?.type==="stepGrid"&&g.onClear?.()}),d.append(h)}n.append(d);for(let h of e.rows){let g=document.createElement("div");g.className="nc-row",g.dataset.ncRow="";let x=document.createElement("button");x.type="button",x.className="nc-name",x.textContent=h.label,x.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(x.dataset.ncLane=String((h.lane-1)%4+1));let v=!1,A=0;x.addEventListener("pointerdown",k=>{v=!1,!(k.pointerType==="mouse"||k.button!==0)&&(A=window.setTimeout(()=>{let E=t(n);E?.type!=="stepGrid"||!E.selectedRows||(v=!0,E.onSelectRow?.(E.rows.findIndex($=>$.id===h.id),!0))},fb))});for(let k of["pointerup","pointercancel","pointerleave"])x.addEventListener(k,()=>window.clearTimeout(A));x.addEventListener("contextmenu",k=>{v&&k.preventDefault()}),x.addEventListener("click",k=>{let E=t(n);if(E?.type!=="stepGrid")return;if(v){v=!1;return}let $=E.rows.findIndex(N=>N.id===h.id),L=!!E.selectedRows&&(k.shiftKey||k.metaKey||k.ctrlKey);E.onSelectRow?.($,L)}),x.addEventListener("keydown",k=>Mb(n,x,k));let T=[];for(let k of["mute","solo"]){if(!(k==="mute"?e.onMute:e.onSolo))continue;let E=document.createElement("span");E.className="nc-ms-wrap";let $=document.createElement("button");$.type="button",$.className="nc-ms",$.dataset.ncMs=k,$.textContent=k==="mute"?"M":"S",$.setAttribute("aria-label",`${k==="mute"?"Mute":"Solo"} ${h.label}`),E.append($,Ke()),E.addEventListener("click",()=>{let L=t(n);if(L?.type!=="stepGrid")return;let N=L.rows.findIndex(_=>_.id===h.id);(k==="mute"?L.onMute:L.onSolo)?.(N)}),T.push(E)}let y=document.createElement("div");y.className="nc-steps";for(let k=0;k<h.steps.length;k++){let E=document.createElement("span");E.className="nc-step-wrap";let $=document.createElement("button");$.type="button",$.className="nc-step",$.dataset.ncStep=`${h.id}:${k}`,$.setAttribute("aria-label",`${h.label} step ${k+1}`),E.append($,Ke()),E.addEventListener("click",L=>{let N=t(n);if(N?.type!=="stepGrid")return;let _=N.rows.findIndex(K=>K.id===h.id),V=s.getAttribute("aria-checked")==="true";N.onToggle(_,k,L.shiftKey||V)}),y.append(E)}if(e.onLength&&y.append(Tb(n,y,h,t)),g.append(...T,x,y),e.onDice){let k=document.createElement("button");k.type="button",k.className="nc-sparkle nc-row-dice",k.dataset.ncDice=h.id,k.setAttribute("aria-label",`Re-roll ${h.label}`),k.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,k.innerHTML=pl(),k.append(Ke()),k.addEventListener("click",()=>{let E=t(n);E?.type==="stepGrid"&&E.onDice?.(E.rows.findIndex($=>$.id===h.id))}),g.append(k)}g.addEventListener("click",k=>{if(k.target!==g)return;let E=t(n);E?.type==="stepGrid"&&E.onSelectRow?.(E.rows.findIndex($=>$.id===h.id))}),bl(n,y,".nc-step-wrap",t,s,()=>h.id),n.append(g)}let u=document.createElement("div");u.className="nc-pads-head";let c=(h,g,x)=>{let v=document.createElement("button");return v.type="button",v.className=h,v.textContent=g,x&&v.setAttribute("aria-label",x),v},p=c("nc-pads-step","‹","Previous lane"),f=c("nc-pads-step","›","Next lane"),b=document.createElement(e.onLength?"button":"span");b.className="nc-pads-label",b.setAttribute("aria-live","polite"),e.onLength&&(b.type="button",b.dataset.ncLenToggle="",b.addEventListener("click",()=>{let h=t(n);h?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Gi(n,h))}));for(let[h,g]of[[p,-1],[f,1]])h.addEventListener("click",()=>{let x=t(n);if(x?.type!=="stepGrid"||x.rows.length===0)return;let v=x.rows.length;x.onSelectRow?.(((Fa(x)+g)%v+v)%v)});if(u.append(p,b,f),e.onDice){let h=c("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=pl(),h.addEventListener("click",()=>{let g=t(n);if(g?.type!=="stepGrid")return;let x=Fa(g);x>=0&&g.onDice?.(x)}),u.append(h)}if(e.transport){let h=c("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{let g=t(n);g?.type==="stepGrid"&&g.transport?.onToggle()}),u.append(h)}n.append(u);let m=document.createElement("div");m.className="nc-pads",m.setAttribute("role","group");let w=Math.max(0,...e.rows.map(h=>h.steps.length));for(let h=0;h<w;h++){let g=document.createElement("button");g.type="button",g.className="nc-pad",g.dataset.ncPad=String(h),g.textContent=String(h+1),g.addEventListener("click",x=>{let v=t(n);if(v?.type!=="stepGrid")return;let A=Fa(v);if(A<0)return;if(n.dataset.ncLenMode==="true"){v.onLength?.(A,h+1);return}let T=s.getAttribute("aria-checked")==="true";v.onToggle(A,h,x.shiftKey||T)}),m.append(g)}return bl(n,m,".nc-pad",t,s,()=>{let h=t(n);return h?.type==="stepGrid"?h.rows[Fa(h)]?.id:void 0}),n.append(m),n.append(Te()),Gi(n,e),n}function Fa(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function bl(e,t,n,a,r,i){let s="on",l=!0,d=-1,u=(c,p)=>{let f=c.rows[d]?.steps[p];!f||p>=c.rows[d].length||(c.onSet?c.onSet(d,p,s,l):!!f[s]!==l&&c.onToggle(d,p,s==="accent"))};Xg(t,n,c=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(c.kind!=="paint")return;let f=p.rows.findIndex(b=>b.id===i());f>=0&&p.rows[f].length!==c.pad+1&&p.onLength?.(f,c.pad+1);return}if(c.kind==="paint"){if(c.phase==="start"){let f=i();d=p.rows.findIndex(m=>m.id===f);let b=p.rows[d]?.steps[c.pad];if(!b)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!b[s]}u(p,c.pad)}else if(c.kind==="long"){let f=i(),b=p.rows.findIndex(w=>w.id===f),m=t.querySelectorAll(n)[c.pad];b>=0&&m instanceof HTMLElement&&p.onLongPress?.(b,c.pad,m)}}})}function Mb(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],r=a.indexOf(t),i=r;n.key==="ArrowDown"?i=r+1:n.key==="ArrowUp"?i=r-1:n.key==="Home"?i=0:i=a.length-1;let s=a[i];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function Tb(e,t,n,a){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(Ke());let i=u=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.findIndex(m=>m.id===n.id),f=c.rows[p];if(!f)return;let b=Math.max(1,Math.min(f.steps.length,u));b!==f.length&&c.onLength?.(p,b)},s=u=>{let c=[...t.querySelectorAll(".nc-step")],p=1;return c.forEach((f,b)=>{let m=f.getBoundingClientRect();m.width>0&&u>=m.left+m.width/2&&(p=b+1)}),p},l=u=>i(s(u.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete r.dataset.dragging};return r.addEventListener("pointerdown",u=>{u.button===0&&(u.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),r.addEventListener("keydown",u=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.find(b=>b.id===n.id);if(!p)return;let f={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};u.key in f&&(u.preventDefault(),i(f[u.key]))}),r}var oi=new WeakMap,Ia=new WeakMap;function Lb(e){return e?(Ia.has(e)||(Ia.set(e,sr(e)),od(t=>{Ia.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))Ui(n,Number(n.getAttribute("data-nc-velocity")))},e)),Ia.get(e)):"light"}function Ui(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:Lb(e.ownerDocument),r=n===null?null:`${a} ${n}`;if(!(oi.has(e)&&oi.get(e)===r)){if(oi.set(e,r),n===null){for(let i of Object.keys(Ws(1)))e.style.removeProperty(i);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[i,s]of Object.entries(Ws(n,Gs[a]??Gs.light)))e.style.setProperty(i,s)}}function Gi(e,t){let n=t.rows.some(c=>c.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let r=e.querySelector(".nc-pads"),i=t.rows.find(c=>c.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&i&&(s.textContent=l?`${i.label} · ${i.length}`:i.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${i.label} length ${i.length} steps: tap or drag the pads to set the end, tap here when done`:`${i.label}, ${i.length} steps: tap to set the length`)));let d=e.querySelector("[data-nc-pads-dice]");d instanceof HTMLElement&&i&&(d.setAttribute("aria-label",`Re-roll ${i.label}`),d.title=`Re-roll ${i.label}: new steps for this lane (Undo takes it back)`);let u=e.querySelector("[data-nc-pads-play]");if(u instanceof HTMLElement){let c=!!t.transport?.playing,p=t.transport?.label??(c?"Stop":"Play");u.textContent!==p&&(u.textContent=p),u.setAttribute("aria-pressed",c?"true":"false");let f=t.transport?.ariaLabel;f?u.setAttribute("aria-label",f):u.removeAttribute("aria-label")}if(r instanceof HTMLElement&&i){r.setAttribute("aria-label",`${i.label} steps`),i.lane&&(r.dataset.ncLane=String((i.lane-1)%4+1)),i.mute||n&&!i.solo?r.dataset.silent="true":delete r.dataset.silent;let c=i.length>0?(t.playhead%i.length+i.length)%i.length:-1;for(let p of r.querySelectorAll("[data-nc-pad]")){let f=Number(p.getAttribute("data-nc-pad")),b=i.steps[f];p instanceof HTMLButtonElement&&(p.hidden=!b||!l&&f>=i.length,l&&f>=i.length?p.dataset.out="true":delete p.dataset.out,l&&f===i.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${i.label} step ${f+1}`),p.setAttribute("aria-pressed",b?.on?"true":"false"),b?.accent?p.dataset.accent="true":delete p.dataset.accent,b?.dim?p.dataset.dim="true":delete p.dataset.dim,Ui(p,b?.velocity),t.playhead>=0&&f===c?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let c of t.rows){for(let b=0;b<c.steps.length;b++){let m=c.steps[b],w=e.querySelector(`[data-nc-step="${c.id}:${b}"]`);if(!(w instanceof HTMLButtonElement))continue;let h=w.closest(".nc-row");if(h instanceof HTMLElement){t.selectedRow===c.id?h.dataset.selected="true":delete h.dataset.selected;let v=t.selectedRow!==c.id&&(t.selectedRows??[]).includes(c.id);v?h.dataset.picked="true":delete h.dataset.picked;let A=h.querySelector(".nc-name");A instanceof HTMLElement&&(A.setAttribute("aria-pressed",t.selectedRow===c.id||v?"true":"false"),A.textContent!==c.label&&(A.textContent=c.label,A.setAttribute("aria-label",`Select ${c.label}`))),c.mute||n&&!c.solo?h.dataset.silent="true":delete h.dataset.silent;for(let T of h.querySelectorAll("[data-nc-ms]")){let y=T.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;T.setAttribute("aria-pressed",y?"true":"false")}}w.setAttribute("aria-pressed",m.on?"true":"false"),m.accent?w.dataset.accent="true":delete w.dataset.accent,m.dim?w.dataset.dim="true":delete w.dataset.dim,b%4===0?w.dataset.bar="true":delete w.dataset.bar,typeof m.velocity=="number"?(w.dataset.velocity="true",w.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,m.velocity))*100)}%`)):(delete w.dataset.velocity,w.style.removeProperty("--level")),Ui(w,m.velocity);let g=t.playhead>=0&&c.length>0?(t.playhead%c.length+c.length)%c.length:-1;b===g?w.dataset.playhead="true":delete w.dataset.playhead;let x=!!t.onLength&&t.selectedRow===c.id;w.hidden=b>=c.length&&!x,b>=c.length&&x?w.dataset.out="true":delete w.dataset.out}let p=e.querySelector(`[data-nc-len="${c.id}"]`),f=e.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&f&&f.nextElementSibling!==p){let b=document.activeElement===p;f.after(p),b&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(c.length)),p.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),p.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function Cb(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,Te()),t}function Nb(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let r=document.createElement("span");r.className="nc-strip-name",r.dataset.ncStripName="";let i=!e.master&&typeof e.onFold=="function",s=null;i&&(n.dataset.ncFoldable="",s=nu(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let v=t(n);v?.type==="strip"&&(v.onFold?.(v.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(r);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let v=document.createElement("span");v.className="nc-strip-grip-dots",v.setAttribute("aria-hidden","true"),l.append(v),l.addEventListener("keydown",A=>{if(A.key!=="ArrowLeft"&&A.key!=="ArrowRight"||A.ctrlKey||A.metaKey||A.shiftKey)return;let T=t(n);T?.type==="strip"&&(A.preventDefault(),T.onMove?.(A.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>wl(n,l,t))),!e.master&&typeof e.onShade=="function"&&a.addEventListener("contextmenu",v=>{v.pointerType==="touch"||v.pointerType==="pen"||v.target instanceof Element&&v.target.closest("input, .nc-strip-remove")||(v.preventDefault(),wl(n,a,t,{x:v.clientX,y:v.clientY}))}),e.onRemove){let v=document.createElement("button");v.type="button",v.className="nc-strip-remove",v.dataset.ncStripRemove="",v.textContent="×",v.addEventListener("click",()=>{let A=t(n);A?.type==="strip"&&A.onRemove?.(v)}),a.append(v)}let d=document.createElement("div");if(d.className="nc-strip-hacks",e.onHacks){let v=document.createElement("span");v.className="nc-hacks-wrap";let A=document.createElement("button");A.type="button",A.className="nc-hacks",A.dataset.ncHacks="",v.append(A,Ke()),v.addEventListener("click",()=>{let T=t(n);T?.type==="strip"&&T.onHacks?.()}),d.append(v)}let u=document.createElement("div");if(u.className="nc-strip-ms",e.onSendsView){let v=document.createElement("span");v.className="nc-hacks-wrap nc-sends-view-wrap";let A=document.createElement("button");A.type="button",A.className="nc-hacks nc-sends-view",A.dataset.ncSendsView="",v.append(A,Ke()),v.addEventListener("click",()=>{let T=t(n);T?.type==="strip"&&T.onSendsView?.()}),u.append(v)}for(let v of["mute","solo"]){if(!(v==="mute"?e.onMute:e.onSolo))continue;let A=document.createElement("span");A.className="nc-ms-wrap";let T=document.createElement("button");T.type="button",T.className="nc-ms",T.dataset.ncMs=v,T.textContent=v==="mute"?"M":"S",A.append(T,Ke()),A.addEventListener("click",()=>{let y=t(n);y?.type==="strip"&&(v==="mute"?y.onMute:y.onSolo)?.()}),u.append(A)}let c=document.createElement("div");c.className="nc-strip-sends";for(let v of e.sends??[])c.append(Xt({...v,type:"knob",compact:!0},t));let p=document.createElement("div");p.className="nc-strip-pan",e.pan&&p.append(Xt(Fo(e),t));let f=document.createElement("div");f.className="nc-strip-body";let b=document.createElement("span");b.className="nc-scale",b.setAttribute("aria-hidden","true");for(let v of e.ticks??[]){let A=document.createElement("span");A.className="nc-scale-tick",A.style.setProperty("--tick-pos",String(v.value)),A.textContent=v.label,b.append(A)}let m=Hm({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:v=>{let A=t(n);A?.type==="strip"&&A.onChange(v)},onReset:()=>{let v=t(n);v?.type==="strip"&&vl(v)}}),w=Xm({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let v=t(n);v?.type==="strip"&&v.onClipClear?.()}});if(f.append(b,m.el,w.el),i){let v=document.createElement("button");v.type="button",v.className="nc-ui-fx-fold nc-strip-fold",v.dataset.ncStripFold="",v.setAttribute("aria-expanded","false");let A=document.createElement("span");A.className="nc-strip-fold-cap",A.setAttribute("aria-hidden","true");let T=document.createElement("span");T.className="nc-ui-fx-fold-name",T.dataset.ncStripFoldName="";let y=document.createElement("span");y.className="nc-strip-fold-pan",y.setAttribute("aria-hidden","true"),y.hidden=!e.pan,v.append(A,y,T),v.addEventListener("click",()=>{let k=t(n);if(k?.type!=="strip")return;k.onFold?.(!1);let E=n.querySelector("[data-nc-strip-hide]");E instanceof HTMLElement&&E.focus()}),f.prepend(v)}let h=document.createElement("button");h.type="button",h.className="nc-strip-db",h.dataset.ncReadout="";let g=0;h.addEventListener("click",v=>{let A=t(n);A?.type!=="strip"||!A.onTypeIn||(window.clearTimeout(g),v.detail===0?yl(n,h,t):v.detail===1&&(g=window.setTimeout(()=>yl(n,h,t),Pb)))}),h.addEventListener("dblclick",()=>{window.clearTimeout(g);let v=t(n);v?.type==="strip"&&vl(v)});let x=document.createElement("div");return x.className="nc-strip-trim",e.trim&&x.append(Xt(Io(e),t)),s&&n.append(s),l&&n.append(l),n.append(a,x,d,u,c,p,f,h,Te()),Qd(n,e),n}function Fo(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??Ib(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function Io(e){let t=e.trim,n=t.min??-12,a=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:a,step:t.step??.5,value:t.value,valueText:t.valueText??Fb(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:r=>t.onChange(r)}}function Fb(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function Ib(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var Pb=250;function yl(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=a.valueText??oa(a.value),r.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(r),r.focus(),r.select?.();let i=!1,s=l=>{if(i)return;i=!0;let d=r.value;if(r.remove(),t.hidden=!1,l){let u=n(e);u?.type==="strip"&&u.onTypeIn?.(d)}t.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function Rb(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let i=document.createElement("span");i.className="nc-strip-add-label",a.append(r,i);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),d=s.value;Jd(s),l?.type==="stripAdd"&&d&&l.onAdd(d)}),n.append(a,s,Te()),Xd(n,e),n}function Xd(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let r=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],i=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");i!==s&&(a.replaceChildren(...r.map(l=>{let d=document.createElement("option");return d.value=l.value,d.textContent=l.label,d.disabled=l.disabled===!0,d})),Jd(a))}function Jd(e){let t=e.options[0];t&&(t.selected=!0)}function vl(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Qd(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let r=e.querySelector(".nc-fader"),i=r?Um(r):void 0;i&&(i.configure({step:t.step}),i.set(t.value),i.setText(t.valueText),i.setLabel(`${t.label} level`)),md(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let m=t.valueText??oa(t.value);s.textContent!==m&&(s.textContent=m),s.setAttribute("aria-label",`${t.label} level ${m}`);let w=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${w}`:w}for(let m of e.querySelectorAll("[data-nc-ms]")){let w=m.getAttribute("data-nc-ms"),h=w==="mute"?t.mute===!0:t.solo===!0;m.setAttribute("aria-pressed",h?"true":"false"),m.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let m=t.hacksLabel??"Hacks";l.textContent!==m&&(l.textContent=m),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${m}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let d=e.querySelector("[data-nc-sends-view]");if(d){let m=t.sendsViewLabel??"Sends";d.textContent!==m&&(d.textContent=m),d.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),d.setAttribute("aria-label",`${m}: ${t.sendsView===!0?"hide":"show"} the send effects`),d.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),Lt(d,t.sendsViewHelp)}let u=e.querySelector("[data-nc-strip-grip]");u instanceof HTMLElement&&(u.setAttribute("aria-label",`Move ${t.label}`),u.title=t.moveHelp??"Drag to move this channel");let c=Zd(t);if(c?e.dataset.ncShade=String(c):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let m=e.querySelector(`.nc-strip-trim [data-nc-id="${Jt(t.trim.id)}"]`);m&&je(m,Io(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let m=e.querySelector(`.nc-strip-pan [data-nc-id="${Jt(t.pan.id)}"]`);m&&je(m,Fo(t))}let p=!t.master&&typeof t.onFold=="function"&&t.folded===!0;p?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let f=e.querySelector("[data-nc-strip-hide]");f instanceof HTMLElement&&(au(f,p,t.label),Lt(f,t.foldHelp));let b=e.querySelector("[data-nc-strip-fold]");if(b instanceof HTMLElement){b.hidden=!p,b.setAttribute("aria-label",`Expand ${t.label}`);let m=b.querySelector("[data-nc-strip-fold-name]");m&&m.textContent!==t.label&&(m.textContent=t.label),Lt(b,t.foldedHelp??t.foldHelp)}}function Zd(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=eu?t:0}var eu=8,Pa=null;function wl(e,t,n,a){Pa?.();let r=n(e);if(r?.type!=="strip")return null;let i=e.ownerDocument,s=i.defaultView??globalThis,l=i.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${r.label}: shade and place`);let d=i.createElement("div");d.className="nc-strip-menu-title",d.id=`nc-strip-menu-title-${String(r.id).replace(/[^\w-]/g,"")}`,d.textContent="Shade";let u=i.createElement("div");u.className="nc-strip-menu-shades",u.setAttribute("role","radiogroup"),u.setAttribute("aria-labelledby",d.id);let c=Zd(r),p=e.querySelector("[data-nc-strip-grip]")??t,f=(g=!1)=>{if(Pa!==f)return;Pa=null;let x=l.contains(i.activeElement);l.remove(),i.removeEventListener("keydown",m,!0),i.removeEventListener("pointerdown",w,!0),s.removeEventListener("resize",h),(g||x)&&p?.isConnected&&p.focus?.({preventScroll:!0})},b=[0,...Array.from({length:eu},(g,x)=>x+1)].map(g=>{let x=i.createElement("button");return x.type="button",x.setAttribute("role","radio"),x.setAttribute("aria-checked",g===c?"true":"false"),x.setAttribute("tabindex",g===c?"0":"-1"),x.dataset.ncShadeChoice=String(g),g===0?(x.textContent="Auto",x.setAttribute("aria-label","Auto: alternate light and dark"),x.title="Auto: alternate light and dark"):(x.textContent=String(g),x.setAttribute("aria-label",`Shade ${g}`),x.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${g})`)),x.addEventListener("click",()=>{let v=n(e);f(!0),v?.type==="strip"&&v.onShade?.(g===0?null:g)}),x});if(u.append(...b),u.addEventListener("keydown",g=>{let x=b.indexOf(i.activeElement);if(x<0)return;let v=-1;g.key==="ArrowRight"||g.key==="ArrowDown"?v=(x+1)%b.length:g.key==="ArrowLeft"||g.key==="ArrowUp"?v=(x-1+b.length)%b.length:g.key==="Home"?v=0:g.key==="End"&&(v=b.length-1),!(v<0)&&(g.preventDefault(),b[x].setAttribute("tabindex","-1"),b[v].setAttribute("tabindex","0"),b[v].focus())}),l.append(d,u),typeof r.onMove=="function"){let g=[...e.parentElement?.children??[]].filter(v=>v.classList?.contains("nc-strip")&&!v.hasAttribute("data-nc-master")),x=g.indexOf(e);for(let[v,A,T]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let y=i.createElement("button");y.type="button",y.className="nc-strip-menu-item",y.dataset.ncStripMove=v<0?"left":"right";let k=i.createElement("span");k.textContent=A;let E=i.createElement("kbd");E.textContent=T,E.setAttribute("aria-hidden","true"),y.append(k,E),y.disabled=v<0?x<=0:x<0||x>=g.length-1,y.addEventListener("click",()=>{let $=n(e);f(!0),$?.type==="strip"&&$.onMove?.(v)}),l.append(y)}}i.body.append(l),(()=>{let g=t.getBoundingClientRect?.()??{bottom:0,right:0},x=l.offsetWidth,v=l.offsetHeight,A=s.innerWidth||i.documentElement.clientWidth||x,T=s.innerHeight||i.documentElement.clientHeight||v,y=a?a.x:g.right-x,k=a?a.y:g.bottom+4;y=Math.max(4,Math.min(y,A-x-4)),k+v>T-4&&(k=Math.max(4,(a?a.y:g.top)-v-4)),l.style.left=`${Math.round(y)}px`,l.style.top=`${Math.round(k)}px`})();let m=g=>{if(g.key==="Escape")g.preventDefault(),g.stopPropagation(),f(!0);else if(g.key==="Tab"&&l.contains(i.activeElement)){let x=[...l.querySelectorAll("button:not([disabled])")].filter(A=>A.getAttribute("tabindex")!=="-1"),v=(x.indexOf(i.activeElement)+(g.shiftKey?-1:1)+x.length)%x.length;g.preventDefault(),x[v]?.focus()}},w=g=>{l.contains(g.target)||f(!1)},h=()=>f(!1);return i.addEventListener("keydown",m,!0),i.addEventListener("pointerdown",w,!0),s.addEventListener("resize",h),Pa=f,(b.find(g=>g.getAttribute("tabindex")==="0")??b[0]).focus({preventScroll:!0}),{el:l,close:()=>f(!1)}}function xl(e,t){let n=e?.querySelector?.(`.nc-strip[data-nc-id="${Jt(t)}"]`);return md(n?.querySelector(".nc-meter")??void 0)}var Wi=typeof ResizeObserver=="function"?new ResizeObserver(Db):null;function Db(e){for(let t of e){if(!t.target.isConnected){Wi.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&zb(n)}}function zb(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,r=n instanceof HTMLElement?n.offsetHeight:0,i=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+r+i}px`)}function Ob(e){if(Wi)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))Wi.observe(t)}function Bb(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let r=typeof e.onFold=="function",i=!!e.meter,s=typeof e.onRemove=="function";if(e.on===void 0&&!r&&!pr(e)&&!i&&!s)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),i&&l.append(iu(n,"head")),e.on!==void 0){let d=$o({checked:e.on,labelledBy:a.id,onChange:u=>{let c=t(d.el);c?.type==="fx"&&c.onToggle?.(u)}});d.el.dataset.ncFxSwitch="",l.append(d.el)}r&&l.append(jb(n,t)),pr(e)&&l.append(Ub(n,t)),s&&l.append(Gb(t)),n.append(l)}r&&n.prepend(qb(n,t)),i&&ou(n,e);for(let l of e.controls)n.append(Xt(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let d=document.createElement("summary");d.textContent=e.moreLabel??"More",l.append(d);for(let u of e.more)l.append(Xt(u,t));n.append(l)}return n.append(Te()),su(n,e),Ob(n),n}var _b=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function tu(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&_b(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function jb(e,t){let n=nu();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),tu(e))}),n}function nu(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function au(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function qb(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let r=document.createElement("span");r.className="nc-ui-fx-fold-name",r.dataset.ncFxFoldName="";let i=document.createElement("span");return i.className="nc-fold-tri",i.setAttribute("aria-hidden","true"),n.append(i,a,r),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(iu(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),tu(e)}}),n}var En=new Set;function Ga(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var pr=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),Vb="(max-width: 768px)";function Hb(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function Ub(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(Hb()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(ru(e,a,!En.has(a.id)),n.focus())}),n}function Gb(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function ru(e,t,n){n?En.add(t.id):En.delete(t.id),Po(e,t)}function Wb(e,t){t?.type==="fx"&&En.has(t.id)&&ru(e,t,!1)}function Kb(e){return e.ownerDocument.defaultView?.matchMedia?.(Vb).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Po(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=pr(t)&&En.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!pr(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Ga(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Sn(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",Lt(n,t.maxHelp)),!a){e.dataset.ncMax&&kl(e);return}if(!e.isConnected){let s=()=>e.isConnected&&En.has(t.id)&&Po(e,t);queueMicrotask(()=>{e.isConnected?s():Ga(e.ownerDocument,s)});return}let r=Kb(e),i=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;i>0&&e.style.setProperty("--nc-fx-dials",String(i)),e.dataset.ncMax!==r&&(e.dataset.ncMax&&kl(e),e.dataset.ncMax=r,r==="over"&&Yb(e,t)),Xb(e.ownerDocument),r==="over"&&Ro(e),Ga(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Sn(s)})}function kl(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Ga(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Sn(n)})}function Yb(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let r=e.querySelector("[data-nc-fx-max]");r instanceof HTMLElement&&r.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function Ro(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,r=e.ownerDocument.defaultView,i=Number.parseFloat(r?.getComputedStyle(a).columnGap??"")||0,s=fg(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),i,r?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var $l=new WeakSet;function Xb(e){$l.has(e)||($l.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(r=>r.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&Ro(t)}))}var Ki=new WeakMap;function iu(e,t){let n=Hg(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function ou(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let r of n)Lt(r,t.meterHelp);let a=Ki.get(e);a?a.set(t.meter):Ki.set(e,Kg(n,t.meter))}function su(e,t){(t.meter||Ki.has(e))&&ou(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let r=typeof t.onFold=="function"&&t.folded===!0;r?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let i=e.querySelector("[data-nc-fx-hide]");i instanceof HTMLElement&&(au(i,r,t.title),Lt(i,t.foldHelp)),Po(e,t);let s=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let d=t.removeLabel??`Remove ${t.title}`;s.hidden=r,s.setAttribute("aria-label",d),s.title=d}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let d=t.on===void 0?"":t.on?"On":"Off";l.hidden=!r,l.setAttribute("aria-label",`Expand ${t.title}${d?`, ${d.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let u=l.querySelector("[data-nc-fx-fold-state]");u&&(u.textContent=d,u.hidden=d==="");let c=l.querySelector("[data-nc-fx-fold-name]");c&&(c.textContent=t.title),Lt(l,t.foldHelp)}}function Lt(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Jt(e){return e.replace(/["\\]/g,"\\$&")}function Jb(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);a?.type==="canvas"&&vd(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Sn(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&Ro(n);sb(e)}var Qb=Mt["toast-duration"];function Zb({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function e0(e,t,n,a){let r=l=>({top:l,bottom:l+n}),i=l=>e.some(d=>d&&d.bottom>l.top&&d.top<l.bottom),s=r(t-a-n);return i(s)?i(r(a))?"bottom":"top":"bottom"}function t0(e,t,n,a,r,i){let s=e.bottom+r,l=Math.max(i,Math.min(e.left,a-i-n.width));for(let d=!0,u=0;d&&u<8;u++){d=!1;for(let c of t)c&&c.bottom>s&&c.top<s+n.height&&c.right>l&&c.left<l+n.width&&(s=c.bottom+r,d=!0)}return{top:s,left:l}}var Sl="data-nc-ui-toast-live";function n0(e,t){let n=t.querySelector(`[${Sl}]`);return n||(n=e.createElement("div"),n.setAttribute(Sl,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function $t({message:e,actionLabel:t,onAction:n,duration:a=Qb,onClose:r,avoid:i=[],anchor:s,host:l,document:d=globalThis.document}={}){l=l??d.body;let u=d.defaultView??globalThis,c=d.createElement("div");c.className="nc-ui-toast",c.setAttribute("data-state","enter");let p=d.createElement("span");p.className="nc-ui-toast-message",p.textContent=e,c.appendChild(p);let f=null;t&&(f=d.createElement("button"),f.type="button",f.className="nc-ui-toast-action",f.textContent=t,c.appendChild(f)),l.appendChild(c);let b="open",m=se=>se&&typeof se.getBoundingClientRect=="function"?se.getBoundingClientRect():null,w=m(c),h=w?.height||44,g=u.getComputedStyle?.(c),x=Number.parseFloat(g?.getPropertyValue(ie("toast-offset")))||16,v=Number.parseFloat(g?.getPropertyValue(ie("toast-anchor-gap")))||8,A=m(s),T=u.innerHeight??0,y=i.map(m).filter(Boolean),k=A&&A.bottom>0&&A.top<T?t0(A,y,{width:w?.width||0,height:h},u.innerWidth??0,v,x):null;k&&k.top+h<=T?(c.setAttribute("data-placement","anchor"),c.style.top=`${k.top+(u.scrollY??0)}px`,c.style.left=`${k.left+(u.scrollX??0)}px`):c.setAttribute("data-placement",e0(y,T,h,x));let E=u.requestAnimationFrame?.bind(u)??(se=>setTimeout(se,16));E(()=>E(()=>{b==="open"&&c.setAttribute("data-state","open")})),n0(d,l).textContent=Zb({message:e,actionLabel:t});let $,L,N=new Promise(se=>{L=se}),_=se=>{clearTimeout($),$=setTimeout(()=>ce("timeout"),se)},V=a,K=Date.now(),ne=()=>{b==="open"&&(clearTimeout($),V=Math.max(0,V-(Date.now()-K)))},be=()=>{b==="open"&&(K=Date.now(),_(V))};c.addEventListener("pointerenter",ne),c.addEventListener("pointerleave",be),c.addEventListener("focusin",ne),c.addEventListener("focusout",be),f?.addEventListener("click",()=>{if(b==="open")try{n?.()}finally{ce("action")}}),Number.isFinite(a)&&_(a);function ce(se="close"){if(b!=="open")return;b="closing",clearTimeout($),c.setAttribute("data-state","closing"),r?.(se);let Y=u.getComputedStyle?.(c),nn=Y?Math.max(0,...String(Y.transitionDuration||"").split(",").map(Dt=>Number.parseFloat(Dt)*(Dt.trim().endsWith("ms")?1:1e3)||0)):0,Rt=()=>{b!=="gone"&&(b="gone",c.remove(),L(se))};c.addEventListener("transitionend",Rt),setTimeout(Rt,nn+50)}return{el:c,close:ce,closed:N}}var El="data-nc-help";function a0(e,t,n,a=0,r=6,i=8){let s=e.top-r-t.height,l=s>=a+i?"above":"below",d=l==="above"?s:e.bottom+r,u=Math.max(i,Math.min(e.left,n-i-t.width));return{top:Math.round(d),left:Math.round(u),side:l}}var si=new WeakMap;function r0(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function i0({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=si.get(e);if(n)return n;let a=e.defaultView,r=null,i=null,s,l=!1,d,u=()=>{clearTimeout(s),clearTimeout(d),i=null,l=!1,r&&(r.hidden=!0,delete r.dataset.pinned)},c=(m,w)=>{let h=w??m.getAttribute(El);if(!h)return!1;r||(r=e.createElement("div"),r.className="nc-ui-help",r.setAttribute("role","tooltip"),r.dataset.testid="nc-help",r.style.position="fixed",r.style.pointerEvents="none",r.style.zIndex="6",e.body.appendChild(r)),r.textContent=h,r.hidden=!1,r.style.visibility="hidden",r.style.top="0px",r.style.left="0px";let g=m.getBoundingClientRect(),x=a0(g,{width:r.offsetWidth,height:r.offsetHeight},a.innerWidth,r0(e));return r.style.top=`${x.top}px`,r.style.left=`${x.left}px`,r.dataset.side=x.side,r.style.visibility="",!0},p=m=>{if(l||m.pointerType==="touch")return;let w=m.target&&m.target.closest?m.target.closest(`[${El}]`):null;w!==i&&(u(),w&&(i=w,s=setTimeout(()=>{i===w&&w.isConnected&&c(w)},t)))},f=m=>{(l||m.key==="Escape")&&u()};e.addEventListener("pointerover",p),e.addEventListener("pointerdown",u,!0),e.addEventListener("keydown",f),a.addEventListener("scroll",u,!0),a.addEventListener("blur",u);let b={hide:u,pin(m,w,{ms:h=0}={}){return u(),!m||!m.isConnected||!c(m,w)?!1:(l=!0,r.dataset.pinned="",h>0&&(d=setTimeout(u,h)),!0)},uninstall(){u(),e.removeEventListener("pointerover",p),e.removeEventListener("pointerdown",u,!0),e.removeEventListener("keydown",f),a.removeEventListener("scroll",u,!0),a.removeEventListener("blur",u),r?.remove(),r=null,si.delete(e)}};return si.set(e,b),b}var lu="(max-width: 768px)",o0='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',s0='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',l0=0;function c0({panel:e,button:t,label:n="Menu",media:a=lu}){let r=e.ownerDocument,i=r.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++l0}`);let s=t??r.createElement("button");t||(s.type="button",s.innerHTML=o0),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function d(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),r.addEventListener("keydown",c,!0),r.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(s0)].find(h=>!h.hidden&&h.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function u({focus:h}={}){if(!l())return;let g=e.contains(r.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),r.removeEventListener("keydown",c,!0),r.removeEventListener("pointerdown",p,!0),(h??g)&&s.focus?.({preventScroll:!0})}function c(h){h.key==="Escape"&&(h.preventDefault(),h.stopPropagation(),u({focus:!0}))}function p(h){let g=h.target;g instanceof i.Node&&(e.contains(g)||s.contains(g))||u({focus:!1})}let f=()=>l()?u({focus:!0}):d(),b=h=>{let g=h.target,x=g instanceof i.Element?g.closest("button"):null;!x||!e.contains(x)||x.closest("[data-nc-menu-stay]")||u({focus:!0})};s.addEventListener("click",f),e.addEventListener("click",b);let m=i.matchMedia?.(a),w=()=>{m?.matches||u({focus:!1})};return m?.addEventListener?.("change",w),{button:s,panel:e,open:d,close:u,isOpen:l,destroy(){u({focus:!1}),s.removeEventListener("click",f),e.removeEventListener("click",b),m?.removeEventListener?.("change",w)}}}var Do="netcomposer.rhythm.hidden.v1",rt=new WeakMap;function li(){try{return globalThis.localStorage??null}catch{return null}}function cu(e,t=Do){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Al(e,t,n,a=Do){let r=cu(e,a);n?r.add(t):r.delete(t);try{e?.setItem(a,JSON.stringify([...r]))}catch{}}function zo(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(r=>r.controls)],n=[],a=r=>{if(n.push(r),r.type==="group")for(let i of r.controls)a(i)};for(let r of t)a(r),r.type==="fx"&&n.push(...r.controls,...r.more??[]),r.type==="strip"&&(n.push(...(r.sends??[]).map(i=>({...i,type:"knob",compact:!0}))),r.pan&&n.push(Fo(r)),r.trim&&n.push(Io(r)));return n}function du(e,t){if(!(!e||!t))return zo(e).find(n=>n.id===t)}function d0(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${zo(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function u0(e,t){if(!t.title)return;if(!t.panel){let i=document.createElement("h3");i.className="nc-ui-fx-name",i.textContent=t.title,e.append(i);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(a,r),e.append(n),uu(e,t)}function uu(e,t){if(!t.panel)return;let n=[...e.children].find(i=>i.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),r&&(r.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function p0(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=rt.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return du(n,a)}function h0(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],r=d0(t);if(e.dataset.ncSignature===r){for(let i of a){let s=e.querySelector(`[data-nc-section="${Tl(i.id)}"]`);s&&uu(s,i);for(let l of i.controls){let d=e.querySelector(`[data-nc-id="${Tl(l.id)}"]`);d instanceof Element&&je(d,l)}s instanceof HTMLElement&&Yi(s,i,n)}return}e.dataset.ncSignature=r,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let i of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=i.id,i.inset&&(s.dataset.ncInset="true"),i.area&&(s.dataset.ncArea=i.area),i.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",i.label)),i.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),i.title&&s.setAttribute("aria-label",i.title)),u0(s,i);let l=i.panel?document.createElement("div"):s;i.panel&&(l.className="nc-panel-body",s.append(l));for(let d of i.controls)l.append(Xt(d,p0));e.append(s),Yi(s,i,n)}}function pu(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,r=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,r))}}var f0="(max-width: 768px)",hu=new WeakMap;function Ml(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function m0(e,t){let n=[...e.children].find(u=>u.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let r=Ml("prev"),i=Ml("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(r,s,i,l);let d=(u,c)=>{let p=hu.get(e);if(!p||c.getAttribute("aria-disabled")==="true")return;let f=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:b}=pu(f,p.pageSize,(t.pages.get(p.id)??0)+u);t.pages.set(p.id,b),p.onPage?.(b),Yi(e,{...p,page:b},t),c.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===c&&(c===r?i:r).focus(),t.redraw()};return r.addEventListener("click",()=>d(-1,r)),i.addEventListener("click",()=>d(1,i)),e.prepend(a),a}function Yi(e,t,n){hu.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],r=t.pageSize??0,{pages:i,page:s}=pu(a.length,r,t.page??n.pages.get(t.id)??0);if(r>0&&n.pages.set(t.id,s),i<=1){for(let h of[...e.children])h.classList.contains("nc-fx-pager")&&h.remove();delete e.dataset.ncPaged;for(let h of a)delete h.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(f0).matches===!0,d=e.closest(".nc-module");a.forEach((h,g)=>{let x=Math.floor(g/r)!==s;if(x?h.dataset.ncOffPage="":delete h.dataset.ncOffPage,x&&!l){let v=d instanceof HTMLElement?rt.get(d):void 0;Wb(h,du(v,h.dataset.ncId))}});let u=m0(e,n),c=u.querySelector('[data-nc-fx-page="prev"]'),p=u.querySelector('[data-nc-fx-page="next"]');c.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===i-1?"true":"false");let f=u.querySelector("[data-nc-fx-page-count]"),b=`${s+1} / ${i}`;f.textContent!==b&&(f.textContent=b);let m=u.querySelector("[data-nc-fx-page-live]"),w=`Effects page ${s+1} of ${i}`;m.textContent!==w&&(m.textContent=w)}function Tl(e){return e.replace(/["\\]/g,"\\$&")}function g0(e,t=Do){dd();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=cu(li(),t).has(e.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let i=document.createElement("h2");i.className="nc-title",i.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";let u=$o({labelledBy:i.id,onChange:x=>(rt.get(n)??e).onToggle?.(x)});u.el.dataset.ncModuleSwitch="",s.append(u.el,l,d);let c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",r.append(i,c,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let b=document.createElement("span");b.className="nc-slim-lines",f.append(b);let m=document.createElement("i");m.className="nc-token-probe",m.dataset.ncProbe="",n.append(m,r,p,f),n.setAttribute("aria-labelledby",i.id);let w=x=>{let v=rt.get(n)??e;n.dataset.ncOpen=x?"false":"true",p.hidden=x,f.hidden=!x,l.textContent=x?"+":"−",l.setAttribute("aria-expanded",x?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${x?"Show":"Hide"} ${v.title}`),l.title=x?"Show":"Hide",x?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let x=n.dataset.ncOpen==="true";Al(li(),(rt.get(n)??e).id,x,t),w(x),Xi(n.parentElement)}),f.addEventListener("click",()=>{Al(li(),(rt.get(n)??e).id,!1,t),w(!1),Xi(n.parentElement)});let h={pages:new Map,redraw:()=>g.redraw()},g={el:n,update(x){rt.set(n,x),x.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,i.textContent=x.title,c.textContent=x.status??"",x.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),b.textContent=x.summary??x.title,u.el.hidden=x.on===void 0,u.set(x.on===!0),x.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,f.setAttribute("aria-label",`Show ${x.title}`),h0(p,x,h),w(p.hidden),g.redraw()},redraw(){let x=rt.get(n);x&&Jb(n,zo(x))}};return rt.set(n,e),w(a),g.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>g.redraw()).observe(n),od(()=>g.redraw(),n.ownerDocument),g}function b0(e,t,n="adjacent"){dd(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((r,i)=>{let s=i%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=a;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(r.el),r.redraw()}),Xi(e)}function Xi(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(i=>i instanceof HTMLElement&&i.classList.contains("nc-module")),n=t.some(i=>i.hasAttribute("data-nc-lead")),a=t.map(i=>i.hasAttribute("data-nc-slim")?o("module-slim-column"):n?i.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let r=t.filter(i=>!i.hasAttribute("data-nc-slim"));n&&t.length===4&&r.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Oo="netcomposer.studio.instances.v1",Ll="netcomposer.studio.types-seen.v1",y0=["petra-rhythm","olive-bass"];function fu(e,t){return t===1?e:`${e}#${t}`}function Bo(e){const t=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(e);if(!t?.[1])return null;const n=t[2]?Number(t[2]):1;return n===1&&t[2]?null:{type:t[1],n}}function v0(e,t){return t===1?e.name:`${e.name} ${t}`}function Ln(e,t,n){const a=v0(e,t),r=gu(n,a);return{id:fu(e.id,t),type:e.id,n:t,name:r,src:e.src,...r!==a?{custom:!0}:{}}}const mu=20;function gu(e,t){return typeof e!="string"?t:[...e.replace(/\s+/g," ").trim()].slice(0,mu).join("").trim()||t}function w0(e,t,n,a){return e.map(r=>{if(r.id!==t)return r;const i=a.find(s=>s.id===r.type);return i?Ln(i,r.n,n):r})}function bu(e,t,n){const a=new URLSearchParams({instance:String(e.n)});return t&&a.set("measure",""),n&&a.set("b",n),`${e.src}?${a.toString().replace(/=(&|$)/g,"$1")}`}function x0(e,t){const n=new Set(e.filter(r=>r.type===t.id).map(r=>r.n));let a=1;for(;n.has(a);)a++;return Ln(t,a)}function sa(e){return e.filter(t=>t.available!==!1).map(t=>Ln(t,1))}function k0(e,t){if(!Array.isArray(e))return sa(t);const n=[];for(const a of e){const r=a&&typeof a=="object"?a:null,i=typeof a=="string"?a:r?.id;if(typeof i!="string")continue;const s=Bo(i),l=s&&t.find(d=>d.id===s.type&&d.available!==!1);!s||!l||n.some(d=>d.id===i)||n.push(Ln(l,s.n,r?.name))}return n.length>0||e.length===0?n:sa(t)}function _o(){try{return globalThis.localStorage??null}catch{return null}}function $0(e,t=_o()){try{const n=t?.getItem(Oo);return n?k0(JSON.parse(n),e):sa(e)}catch{return sa(e)}}function S0(e,t,n=_o()){let a=y0;try{const s=JSON.parse(n?.getItem(Ll)??"null");Array.isArray(s)&&(a=s.filter(l=>typeof l=="string"))}catch{}const r=t.filter(s=>!a.includes(s.id)&&s.available!==!1);if(r.length===0)return[...e];const i=[...e];for(const s of r)i.some(l=>l.type===s.id)||i.push(Ln(s,1));try{n?.setItem(Ll,JSON.stringify([...new Set([...a,...r.map(s=>s.id)])]))}catch{}return i.length!==e.length&&Cn(i,n),i}function E0(e){return e.map(t=>t.custom?{id:t.id,name:t.name}:t.id)}function Cn(e,t=_o()){try{t?.setItem(Oo,JSON.stringify(E0(e)))}catch{}}function A0(e){const t=/^commit: ([0-9a-f]{7,40})\b/m.exec(e);return t?t[1].slice(0,12):null}function M0(e,t=1500){const n=new Map;return a=>{let r=n.get(a);if(!r){const i=e(`${a}BUILD.txt`,{cache:"no-cache"}).then(s=>s.ok?s.text():"").then(A0,()=>null);r=Promise.race([i,new Promise(s=>setTimeout(()=>s(null),t))]),n.set(a,r)}return r}}function T0(e,t){const n=new Map;return(a,r)=>{const i=Bo(a),s=i?.type??a,l=r?.instance!==void 0?Number(r.instance):a.includes("#")?i?.n:void 0,d=e().filter(c=>c.instance.type===s);let u;if(l!==void 0&&Number.isInteger(l)&&l>=1)u=d.find(c=>c.instance.n===l);else{const c=d.filter(p=>{const f=p.window();return f!=null&&f!==n.get(p.instance.id)});u=c.find(p=>p.readyState?.()!=="complete")??c[0]??d[0]}if(!u){if(t.some(p=>p.id===s))return null;const c=l!==void 0?fu(s,l):a;return{id:c,name:c}}return n.set(u.instance.id,u.window()),{id:u.instance.id,name:u.instance.name}}}const L0=2e4,C0=500,N0={waiting:"Waiting",loading:"Loading…",starting:"Starting audio…",ready:"Ready",failed:"Didn't load"},F0=["ready","failed"];function I0(e){const t=e.map(c=>({id:c.id,brand:c.brand,name:c.name,state:"waiting",loaded:!1,attached:!1,holds:0})),n=new Set;let a=!1,r=[];const i=new Map,s=c=>t.find(p=>p.id===c),l=c=>F0.includes(c.state),d=()=>{if(!a&&t.every(l)){a=!0;const c=r;r=[];for(const p of c)p()}for(const c of t){if(!l(c))continue;const p=i.get(c.id);if(p){i.delete(c.id);for(const f of p)f()}}for(const c of[...n])try{c()}catch{}},u=c=>{if(a||l(c))return;const p=c.loaded&&c.attached&&c.holds===0?"ready":c.loaded||c.attached?"starting":c.state==="waiting"?"waiting":"loading";p!==c.state&&(c.state=p,d())};return{items:()=>t.map(c=>({id:c.id,brand:c.brand,name:c.name,state:c.state})),counts:()=>({done:t.filter(l).length,total:t.length}),settled:()=>a||t.every(l),whenSettled(){return a||t.every(l)?Promise.resolve():new Promise(c=>r.push(c))},whenDone(c){const p=s(c);return!p||a||l(p)?Promise.resolve():new Promise(f=>i.set(c,[...i.get(c)??[],f]))},requested(c){const p=s(c);!p||a||p.state!=="waiting"||(p.state="loading",d(),u(p))},loaded(c){const p=s(c);p&&(p.loaded=!0,u(p))},attached(c){const p=s(c);p&&(p.attached=!0,u(p))},hold(c){const p=s(c);if(!p||a)return()=>{};p.holds++,u(p);let f=!1;return()=>{f||(f=!0,p.holds--,u(p))}},fail(c){const p=s(c);!p||a||l(p)||(p.state="failed",d())},remove(c){const p=t.findIndex(b=>b.id===c);if(p<0||a)return;t.splice(p,1);const f=i.get(c);i.delete(c);for(const b of f??[])b();d()},onChange(c){return n.add(c),()=>n.delete(c)}}}function P0(e,t){return e.includes(t)?[t,...e.filter(n=>n!==t)]:[...e]}async function R0(e,t,n){for(let a=0;a<e.length;a++)a>0&&await n(),await t(e[a])}function D0(e=C0,t=globalThis){return new Promise(n=>{typeof t.requestIdleCallback=="function"?t.requestIdleCallback(()=>n(),{timeout:e}):t.setTimeout(n,0)})}function z0(e,t){const n=new Set,a=new URL(t),r=/<(script|link)\b([^>]*)>/gi;for(const i of e.matchAll(r)){const s=(i[1]??"").toLowerCase(),l=i[2]??"",d=p=>new RegExp(`\\b${p}\\s*=\\s*("([^"]*)"|'([^']*)')`,"i").exec(l)?.slice(2).find(Boolean);let u;if(s==="script"&&/\btype\s*=\s*["']module["']/i.test(l)&&(u=d("src")),s==="link"){const p=(d("rel")??"").toLowerCase();(p==="modulepreload"||p==="stylesheet")&&(u=d("href"))}if(!u)continue;let c;try{c=new URL(u,a)}catch{continue}c.origin===a.origin&&n.add(c.href)}return[...n]}const Wa="netcomposer.studio.pending-presets.v1",O0=3e3,B0=6e4;function Cl(e){return!!e&&typeof e=="object"&&typeof e.format=="string"&&"data"in e}function _0(e,t){return new Promise(n=>{const a=setTimeout(()=>n(void 0),t);e.then(r=>{clearTimeout(a),n(r)},()=>{clearTimeout(a),n(void 0)})})}function j0(e){const t=new Map,n=[],a=()=>{try{const s=JSON.parse(e()?.getItem(Wa)??"{}"),l={};if(s&&typeof s=="object")for(const[d,u]of Object.entries(s))Cl(u)&&(l[d]=u);return l}catch{return{}}},r=s=>{try{const l=e();if(!l)return;Object.keys(s).length?l.setItem(Wa,JSON.stringify(s)):l.removeItem(Wa)}catch{}},i=async(s,l)=>{const d=a(),u=d[s];if(!u)return;delete d[s],r(d);let c=u.format===l.format;if(c)try{await l.set(u.data)}catch{c=!1}for(const p of n)p(s,c)};return{provide(s,l){!l||typeof l.get!="function"||typeof l.set!="function"||(t.set(s,l),i(s,l))},provided:()=>[...t.keys()],async collect(s,l=O0){const d={};return await Promise.all(s.map(async u=>{const c=t.get(u);if(!c)return;const p=await _0(Promise.resolve().then(()=>c.get()),l);p!=null&&(d[u]={format:c.format,...c.version!==void 0?{v:c.version}:{},data:p})})),d},stash(s){const l={};for(const[d,u]of Object.entries(s))Cl(u)&&(l[d]=u);r(l)},onApplied(s){n.push(s)},pending:()=>Object.keys(a()),dropPending(){const s=Object.keys(a());return r({}),s}}}function q0(e,t,n=""){return n?`${e}@studio/${n}/${t}`:`${e}@studio/${t}`}const V0=1,$e=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX",identity:"instrument-nyx"},{id:"calliope",name:"Generator",src:"/calliope/",brand:"CALLIOPE",identity:"instrument-calliope",sound:!1},{id:"aria",name:"Situation",src:"/aria/",brand:"ARIA",identity:"instrument-aria",sound:!1,single:!0,noteTarget:!1}],jo=[...$e];function H0(e,t,n={}){const a=n.instruments??$e;return{version:V0,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},...n.grab?{grab:n.grab}:{},...n.play?{play:n.play}:{},...n.countIn?{countIn:n.countIn}:{},attach(r,i){if(typeof r!="string"||r.length===0||r.length>64)return null;const s=n.resolve?n.resolve(r,i):{id:r,name:a.find(h=>h.id===r)?.name??r};if(!s)return null;const l=s.id.split("#")[0],u=a.find(h=>h.id===l)?.sound===!1?e.createGain():t.attach(s.id,s.name),c=s.id;n.attached?.(c);const p=n.presets,f=n.share?.host(c),b=n.picker?.host(c),m=n.notes?.host(c),w=n.situation?.host(c);return{ctx:e,output:u,...n.mapper===void 0?{}:{mapper:n.mapper},instance:c,storageKey:h=>q0(h,c,n.generation?.()??""),...n.legacyCopy?.()===!1?{legacyCopy:!1}:{},...n.holdFirstPlay?{holdFirstPlay:()=>n.holdFirstPlay?.(c)??(()=>{})}:{},...p?{providePreset:h=>p.provide(c,h)}:{},...f?{audioReceivers:f.audioReceivers,sendAudio:f.sendAudio,onAudio:f.onAudio,reveal:f.reveal}:{},...b?{pickerTarget:b.pickerTarget}:{},...m?{notesIn:m.notesIn,notesSource:m.notesSource,notesTakeBack:m.notesTakeBack}:{},...w?{situationIn:w.situationIn,situationSource:w.situationSource,situationSources:w.situationSources,onSituationSources:w.onSituationSources}:{},...n.clock?{clock:n.clock()}:{},...n.targets?{notesTargets:()=>n.targets?.list()??[],onNotesTargets:h=>typeof h=="function"?n.targets?.listen(h)??(()=>{}):()=>{}}:{},...n.show?{showInstance:h=>typeof h=="string"&&n.show?.(h)}:{}}}}}const Nl=16,U0=30;function G0(e){if(!e||typeof e!="object")return null;const t=e,n=Array.isArray(t.beats)?t.beats.slice(0,Nl+1):[],a=t.until;if(n.length<1||n.length>Nl||!n.every(l=>typeof l=="number"&&Number.isFinite(l))||n.some((l,d)=>d>0&&l<=n[d-1]))return null;const r=n[0],i=n[n.length-1];if(typeof a!="number"||!Number.isFinite(a)||a<=i||a-r>U0)return null;const s=Array.isArray(t.accents)?t.accents:[];return{beats:[...n],accents:n.map((l,d)=>s[d]===!0),until:a}}function W0(e,t){if(t>=e.until)return null;let n=-1;for(;n+1<e.beats.length&&e.beats[n+1]<=t;)n++;return{n:e.beats.length-Math.max(0,n),accent:n>=0&&e.accents?.[n]===!0}}function K0(e,t){return t===null?e:`${t} · ${e}`}function Y0(e){let t=0;for(const n of e)Number.isFinite(n)&&n>t&&(t=n);return Math.round(t)}function X0(e){const t=e.doc??document,n=t.createElement("div");n.className="count-in",n.hidden=!0,n.setAttribute("role","status");const a=t.createElement("span");a.className="count-in-who";const r=t.createElement("span");r.className="count-in-n",n.append(a,r);const i=t.title,s=new Map;let l=!1;const d=()=>{const c=e.now();for(const[v,A]of s)c>=A.until&&s.delete(v);const[p,f]=[...s][0]??[],b=f?W0(f,c):null;if(!p||!b){n.hidden=!0,delete n.dataset.accent,t.title=i,l=!1;return}n.hidden=!1;const m=e.clearOf?.()??[],w=`${Y0(m.map(v=>v.getBoundingClientRect().bottom))}px`;n.style.getPropertyValue("--count-in-top")!==w&&n.style.setProperty("--count-in-top",w);const h=e.labelOf(p);a.textContent!==h&&(a.textContent=h);const g=String(b.n);r.textContent!==g&&(r.textContent=g),n.toggleAttribute("data-accent",b.accent),n.setAttribute("aria-label",`${h} count-in ${g}`);const x=K0(i,b.n);t.title!==x&&(t.title=x),requestAnimationFrame(d)},u=()=>{l||(l=!0,requestAnimationFrame(d))};return{el:n,api:{show(c,p){if(typeof c!="string"||!c)return;const f=G0(p);f&&(s.set(c,f),u())},clear(c){s.delete(c)&&u()}}}}const J0=1e4;function Q0(e=J0,t=globalThis){const n=new Set;let a=[];const r=()=>{if(n.size>0)return;const i=a;a=[];for(const s of i)s()};return{hold(){const i={};n.add(i);const s=t.setTimeout(()=>l(),e),l=()=>{n.delete(i)&&(t.clearTimeout(s),r())};return l},get count(){return n.size},idle(){return n.size===0?Promise.resolve():new Promise(i=>a.push(i))}}}const yu="netcomposer.studio.fx-fold.v1",Z0=["a","b","insert"],vu={a:!0,b:!0,insert:!1};function wu(e){try{const t=e?.getItem(yu);if(!t)return{};const n=JSON.parse(t);if(!n||typeof n!="object")return{};const a=n,r={};for(const i of Z0)typeof a[i]=="boolean"&&(r[i]=a[i]);return r}catch{return{}}}function xu(e){return{...vu,...wu(e)}}function ku(e,t,n){const a={...wu(e),[t]:n};try{e?.setItem(yu,JSON.stringify(a))}catch{}return{...vu,...a}}const $u="netcomposer.studio.insert-fold.v1";function Su(e){try{const t=e?.getItem($u),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Eu(e,t,n){const a=[...Su(e)].filter(i=>i!==t);n&&a.push(t);const r=a.slice(-256);try{e?.setItem($u,JSON.stringify(r))}catch{}return new Set(r)}function ey(e,t){return xu(e).insert?(ku(e,"insert",!1),Eu(e,t,!0)):Su(e)}function ve(){try{return globalThis.localStorage??null}catch{return null}}const ty={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function Au(e,t){const n=t.fx[e],a=er(n);for(const r of a.chain){const i=ty[e][r.type];n===void 0&&i&&Object.assign(r.dials,i),e==="a"?(r.bypass=r.type!=="plate",r.type==="plate"&&(r.dials.mix=100)):e==="b"?(r.bypass=r.type!=="delay",r.type==="delay"&&(r.dials.mix=100,r.dials.mode=0,r.dials.send=100)):r.bypass=r.type!=="drive"||!t.insert.on}return a}const Mu="drive-1",Ji=3;function ny(e,t){if(e.masterFx!==null&&e.masterFx!==void 0)return Gt(e.masterFx,t);const n=e.insert.on?Au("insert",e).chain.find(a=>a.type==="drive"):void 0;return Gt({v:2,chain:n?[{id:Mu,type:"drive",bypass:!1,dials:{...n.dials}}]:[]},t)}function ay(e){return e.chain.some(t=>t.type==="drive"&&!t.bypass)}const ry={"no-source":"that source isn't there",empty:"the range is empty",gone:"that range is older than the 20 seconds kept","not-kept":"that source wasn't being kept yet when the range played",timeout:"no answer from the audio (is it running?)"};function iy(e,t,n,a=2e3){return(Number.isFinite(e-t)?Math.max(0,e-t):0)/n*1e3+a}const Ra=e=>({channels:null,reason:e,message:ry[e]});function oy(e,t){const n=new Map,a=new Map;let r=1;const i=l=>{const d=t.nodeFor(l);if(!d)return null;const u=n.get(l);if(u&&u.source===d)return u.node;u?.node.disconnect();const c=new AudioWorkletNode(e,"nc-studio-grab",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});return c.port.onmessage=p=>{const f=p.data;f.type!=="took"&&f.type!=="recorded"||(a.get(f.id)?.(f.channels,f.reason),a.delete(f.id))},d.connect(c),n.set(l,{node:c,source:d}),c},s=async(l,d,u)=>{await t.ready;const c=i(l);if(!c)return Ra("no-source");if(!(u>d))return Ra("empty");const p=r++;return new Promise(f=>{a.set(p,(b,m)=>f(b?{channels:b}:Ra(m??"gone"))),c.port.postMessage({type:"take",id:p,from:d,to:u}),setTimeout(()=>{a.delete(p)&&f(Ra("timeout"))},iy(u,e.currentTime*e.sampleRate,e.sampleRate))})};return{record(l,d){if(!t.nodeFor(l))return null;const u=n.get(l)?.node??null,c=r++;let p=u;const f=m=>p?.port.postMessage(m);p?f({type:"record",id:c,from:d}):t.ready.then(()=>{p=i(l),f({type:"record",id:c,from:d})});let b=!1;return{stop(m){return b?Promise.resolve(null):(b=!0,new Promise(w=>{a.set(c,w),f({type:"record-end",id:c,to:m}),setTimeout(()=>{a.delete(c)&&w(null)},Math.max(0,(m-e.currentTime*e.sampleRate)/e.sampleRate)*1e3+5e3)}))},cancel(){b=!0,f({type:"record-cancel",id:c})}}},sources:()=>t.sources(),latency(l){if(typeof l!="string")return 0;const d=t.latencyFor?.(l)??0;return Number.isFinite(d)&&d>0?Math.round(d):0},listen(l){return t.nodeFor(l)?(t.ready.then(()=>i(l)),!0):!1},take:(l,d,u)=>s(l,d,u).then(c=>c.channels),takeResult:s}}function sy(e){const t=()=>{};return new Proxy(e,{get(n,a,r){if(a==="stop")return t;const i=Reflect.get(n,a,r);return typeof i=="function"?i.bind(n):i}})}const ee={"picker:off":"Connects the Sample Picker on this computer, so its Send to NYX loads the pads of a NYX here. Off: the picker opens NYX on its own.","picker:connecting":"Connecting to the Sample Picker on this computer. Press to disconnect.","picker:on":"The Sample Picker is connected: its Send to NYX loads a NYX here (you choose which there). Press to disconnect.","picker:away":"The Sample Picker isn't answering: start it on this computer; the Studio keeps trying. Press to disconnect.","picker:ask":"The Sample Picker was connected. Press to connect again (Chrome may ask to let this site reach this computer).","picker:blocked":"Chrome blocks this site from reaching this computer. Allow it in the site's settings (Local network access), then press here.","transport:rec":"Records the Master to a WAV file. If nothing is sounding, Rec arms and waits: it starts on the first sound or on bar 1. Press again to cancel or stop.","transport:play-loading":"Play is ready once every instrument is in. The status line counts them as they load.","transport:keep":"Saves the last minutes of the Master as a WAV, no Rec needed. It holds up to 5 min of sound; silence isn't held, so 2 min is 2 minutes of sound. K opens it.","keep:held":"How much sound Keep holds now, up to 5 min. Silence longer than 2 seconds isn't held. While the clock runs, a Keep starts on a bar line.","keep:switch":"Keeping on holds the Master's last 5 minutes of sound in this tab (about 58 MB). Off forgets it and holds nothing.","mix:sends":"The two send effects every channel feeds with its A and B knobs. The master's Sends button shows and hides them. Folded, click a column to open it.","inserts:channel":"Shows this channel's own effects, applied before its fader and sends. Press again to close them.","inserts:master":"Shows the master's own effects on the whole mix: none until you add one, up to three (EQ, compressor, drive and so on). Press again to close them.","fx:fold":"Folds this effect sideways into a narrow column so the Mix takes less room. It keeps sounding as set; a click on the column (or its ▶) opens it again.","fx:meter":"The level going into this effect (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. It keeps showing the input, greyed, while the effect is off.","fx:meter-return":"The level the sends feed into this effect (left bar) and its return (right bar), from −48 dB up to full scale; orange near clipping. Silent while the return is off.","fx:max":"Widens this card to three cards so its graph is easy to see; the dials sit under it. Click again, or press Escape, to put it back.","gate:steps":"Tap or drag up and down to draw each step's level. Hold a step (or right-click it) to give it its own shape. The ring is the step playing: dimmed while stopped.","eq:graph":"The EQ's curve over the sound coming out right now: boosts rise above the middle line, cuts fall below it. Click it to open it wide, then drag a dot to shape it.","eq:low":"The lows, below 150 Hz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","eq:mid":"The middle band: drag up or down to boost or cut, sideways to move it, and scroll over it for narrower or wider. Double-click resets it.","eq:high":"The highs, above 6 kHz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","strip:fold":"Minimizes this channel sideways to a narrow column so more fit. It keeps playing at the same level; M and S still work, and ▶ expands it again.","strip:folded":"A minimized channel: its name, mute, solo and level meter. Click the name or ▶ to expand it. Drag the name to move it.","strip:trim":"Trim: this channel's input gain, before its Inserts and fader, −12 to +24 dB. Bring up a quiet instrument here; double-click for 0 dB.","strip:pan":"Balance: moves this channel left or right in the stereo mix by turning the other side down (its sends follow). Drag or use the arrow keys; double-click to centre it.","strip:name":"This channel's instrument. Click to show it below, drag (or touch and hold) to move the channel, double-click to rename it.","strip:rename":"Type a new name (up to 20 characters) and press Enter; Escape cancels. Leave it empty to go back to the default name.","sends:view":"Shows or hides the send effects, A · Reverb and B · Delay. Outlined while a channel sends to them. They keep sounding either way.","vu:add":"Adds analog VU meters for the finished mix beside the master: left on top, right below. 0 VU is −18 dBFS RMS.","vu:module":"The master's left (top) and right (bottom) as classic VU meters, which show average loudness. 0 VU is −18 dBFS RMS; the red is louder than that.","vu:remove":"Hides the VU meters. + Meters in the Mix header brings them back.","vu:fold":"Folds the meters to a narrow column with two thin level bars, L and R. The triangle opens them again.","load:ok":"Audio load {pct}%. Plenty of room.","load:busy":"Audio load {pct}%. Close an instrument if you hear crackles.","load:dropout":"A brief spike caused an audio dropout. Average load is {pct}%. If you hear crackles often, close an instrument.","load:over":"Audio load {pct}%. The audio is dropping out. Stop or close an instrument."},ly=[60,120,300],cy={on:!1,written:0,size:0,segments:[],lastDropped:null,bytes:0,sampleRate:48e3};function Tu(e){return Math.max(0,Math.min(e.written,e.size))}function ci(e,t){let n=null;for(const a of e){if(a.pos>t)break;n=a}return n?n.frame+(t-n.pos):null}function dy(e,t,n){for(let a=e.length-1;a>=0;a--){const r=e[a];if(r&&r.pos<=t)return{start:r.pos,end:e[a+1]?.pos??n}}return null}function uy(e,t,n){const a=Tu(e);if(a<=0)return null;const r=e.written-a;let i;if("last"in t){const u=Math.round(t.last*e.sampleRate);if(u<=0||u>a)return null;i=e.written-u}else{if(e.lastDropped!==null&&e.lastDropped>=t.since)return null;let u=null;for(let c=0;c<e.segments.length;c++){const p=e.segments[c];if(!p)continue;const f=e.segments[c+1]?.pos??e.written;if(t.since<p.frame+(f-p.pos)){u=Math.max(r,p.pos+Math.max(0,t.since-p.frame));break}}if(u===null||u>=e.written)return null;i=u}let s="exact";if(n&&n.barFrames>0){const u=ci(e.segments,i),c=dy(e.segments,i,e.written);if(u!==null&&c){const p=((u-n.origin)%n.barFrames+n.barFrames)%n.barFrames,f=i-Math.round(p),b=p===0?i:i+Math.round(n.barFrames-p);p===0?s="bar":f>=Math.max(r,c.start)&&"last"in t?(i=f,s="bar"):b<Math.min(e.written,c.end)&&(i=b,s="bar")}}const l=ci(e.segments,i)??0,d=(ci(e.segments,e.written-1)??l)+1;return{from:i,to:e.written,frame:l,endFrame:d,start:s}}function Qi(e){const t=Math.max(0,Math.floor(e));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function py(e,t,n){const a=l=>String(l).padStart(2,"0"),r=`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}-${a(e.getHours())}${a(e.getMinutes())}`,i=`${Math.round(t*10)/10}bpm`,s="last"in n?`${Math.round(n.last/60)}m`:"since-play";return`netcomposer-keep-${r}-${i}-${s}.wav`}const Lu="audio/wav";function hy(e){const t=a=>String(a).padStart(2,"0");return`netcomposer-studio-${`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}-${t(e.getHours())}${t(e.getMinutes())}`}.wav`}function fy(e,t){const n=Math.min(e.length,t.length),a=new Uint8Array(n*6);let r=0;for(let i=0;i<n;i++)for(const s of[e[i]??0,t[i]??0]){const l=Math.max(-1,Math.min(1,s)),d=Math.round(l<0?l*8388608:l*8388607);a[r++]=d&255,a[r++]=d>>8&255,a[r++]=d>>16&255}return a}function Cu(e,t,n=24){const r=n/8,i=e*2*r,s=new ArrayBuffer(44),l=new DataView(s),d=(u,c)=>{for(let p=0;p<4;p++)l.setUint8(u+p,c.charCodeAt(p))};return d(0,"RIFF"),l.setUint32(4,36+i,!0),d(8,"WAVE"),d(12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,2,!0),l.setUint32(24,t,!0),l.setUint32(28,t*2*r,!0),l.setUint16(32,2*r,!0),l.setUint16(34,r*8,!0),d(36,"data"),l.setUint32(40,i,!0),new Uint8Array(s)}class my{constructor(t,n){this.ctx=t,this.source=n}node=null;id=0;phase="idle";parts=[];frames=0;from=0;why="now";done=null;listeners=new Set;attach(){const t=this.source();if(this.node||!t)return;const n=new AudioWorkletNode(this.ctx,"nc-studio-rec",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n}get supported(){return typeof AudioWorkletNode<"u"}get state(){return this.phase}get started(){return this.phase==="recording"||this.phase==="stopping"?{from:this.from,why:this.why}:null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}arm(t=!1){this.phase==="idle"&&(this.attach(),this.node&&(this.id++,this.parts=[],this.frames=0,this.set("arming"),this.node.port.postMessage({type:"arm",id:this.id,force:t})))}schedule(t){this.phase!=="arming"&&this.phase!=="armed"||this.node?.port.postMessage({type:"at",id:this.id,at:t})}cancel(){this.phase!=="arming"&&this.phase!=="armed"||(this.node?.port.postMessage({type:"cancel",id:this.id}),this.parts=[],this.id++,this.set("idle"))}stop(){return this.phase!=="recording"||!this.node?Promise.resolve(null):(this.set("stopping"),new Promise(t=>{this.done=t,this.node?.port.postMessage({type:"stop",id:this.id})}))}set(t){if(this.phase!==t){this.phase=t;for(const n of this.listeners)n()}}message(t){if(t.id===this.id){if(t.type==="rec")t.phase==="armed"&&this.phase==="arming"?this.set("armed"):t.phase==="recording"&&(this.phase==="arming"||this.phase==="armed")?(this.from=t.from??0,this.why=t.why??"now",this.set("recording")):t.phase==="idle"&&this.phase==="stopping"&&this.finish(null);else if(t.type==="rec-data"){const[n,a]=t.channels??[];if(!n||!a)return;this.parts.push(fy(n,a)),this.frames+=n.length}else if(t.type==="rec-done"){const n=t.sampleRate??this.ctx.sampleRate,a=new Blob([Cu(this.frames,n),...this.parts],{type:Lu});this.finish({blob:a,name:hy(new Date),seconds:this.frames/n,from:t.from??this.from,why:this.why})}}}finish(t){this.parts=[],this.frames=0;const n=this.done;this.done=null,this.set("idle"),n?.(t)}}const Nu="netcomposer.studio.keeping.v1";function gy(e){try{return e?.getItem(Nu)!=="off"}catch{return!0}}function by(e,t){try{e?.setItem(Nu,t?"on":"off")}catch{}}class yy{constructor(t,n,a=!0){this.ctx=t,this.source=n,this.on=a}node=null;latest=cy;on;id=0;jobs=new Map;listeners=new Set;attach(){const t=this.source();if(this.node||!t||typeof AudioWorkletNode>"u")return;const n=new AudioWorkletNode(this.ctx,"nc-studio-keep",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n,n.port.postMessage({type:"keeping",on:this.on})}get supported(){return typeof AudioWorkletNode<"u"}get keeping(){return this.on}get status(){return this.latest}setKeeping(t){this.on=t,this.node?.port.postMessage({type:"keeping",on:t}),t||(this.latest={...this.latest,on:t,written:0,segments:[],bytes:0,lastDropped:null}),this.emit()}refresh(){this.node?.port.postMessage({type:"status"})}plan(t,n){return this.on?uy(this.latest,t,n):null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}keep(t,n){const a=this.node;if(!a||!this.on)return Promise.resolve(null);const r=++this.id;return new Promise(i=>{this.jobs.set(r,{parts:[],plan:null,rate:this.ctx.sampleRate,done:s=>{if(!s)return i(null);const l=s.plan.to-s.plan.from,d=new Blob([Cu(l,s.rate,16),...s.parts],{type:Lu});i({blob:d,name:py(n.when??new Date,n.bpm,t),seconds:l/s.rate,frame:s.plan.frame,endFrame:s.plan.endFrame,start:s.plan.start,choice:t})}}),a.port.postMessage({type:"keep",id:r,choice:t,grid:n.grid??null,now:this.ctx.state!=="running"})})}emit(){for(const t of this.listeners)t()}message(t){if(t.type==="keep-status"&&t.status){this.latest=t.status,this.emit();return}const n=t.id===void 0?void 0:this.jobs.get(t.id);if(!(!n||t.id===void 0)){if(t.type==="keep-plan")n.plan=t.plan??null,n.rate=t.sampleRate??n.rate,n.plan||(this.jobs.delete(t.id),n.done(null));else if(t.type==="keep-part"){if(t.data)n.parts.push(t.data);else if(t.done){this.jobs.delete(t.id),n.done(null);return}t.done&&n.plan&&(this.jobs.delete(t.id),n.done({plan:n.plan,parts:n.parts,rate:n.rate}))}}}}const Fu={threshold:-3,knee:0,ratio:20,attack:.001,release:.1};function vy(e){return Math.floor(.006*e)}const Zi=1024,Fl=Zi+8192,wy=.25;function xy(e,t){let n=0;for(let a=t;a<e.length;a++)n=Math.max(n,Math.abs(e[a]??0));if(!(n>1e-6))return null;for(let a=t;a<e.length;a++)if(Math.abs(e[a]??0)>=n/2)return a-t;return null}async function ky(e,t,n=OfflineAudioContext){const a=new n(1,Fl,e),r=a.createBuffer(1,Fl,e);r.getChannelData(0)[Zi]=wy;const i=new AudioBufferSourceNode(a,{buffer:r}),s=t(a);i.connect(s.input),s.output.connect(a.destination),i.start(0);const l=await a.startRendering();return xy(l.getChannelData(0),Zi)}function $y(e,t=()=>ky(e,n=>{const a=new DynamicsCompressorNode(n,Fu);return{input:a,output:a}})){let n=vy(e);const a=(async()=>{try{const r=await t();r!==null&&r>=0&&r<e/10&&(n=r)}catch{}})();return{get:()=>n,ready:a}}const Sy=65,Ey=90,Ay=5e3,Ka=3,Ya=1;function My(e,t){return e>=Ey||t>=Ka?"over":t>0?"dropout":e>=Sy?"busy":"ok"}function Ty(e){return e==="over"?"Overloaded":e==="busy"?"Busy":e==="dropout"?"· dropout":""}function Ly(e,t){return ee[`load:${t}`].replace("{pct}",String(Math.round(e)))}class Cy{pct=0;state="ok";underruns=0;recent=[];read(t,n){this.pct=Math.max(0,Math.min(100,Number.isFinite(t.pct)?t.pct:0));const a=Number.isFinite(t.underruns)?Math.max(0,Math.floor(t.underruns)):0;this.underruns+=a;for(let r=0;r<Math.min(a,Ka);r++)this.recent.push(n);return this.tick(n)}tick(t){for(;this.recent.length&&t-this.recent[0]>=Ay;)this.recent.shift();return this.recent.length>Ka&&this.recent.splice(0,this.recent.length-Ka),this.state=My(this.pct,this.recent.length),this.state}}class Ny{constructor(t=Ya){this.intervalS=t}lastStart=Number.NEGATIVE_INFINITY;take(t,n){return!((t??0)>0)||!Number.isFinite(n)||n<this.lastStart+this.intervalS*.9?0:(this.lastStart=n,1)}}function vt(e,t,n={}){const a=document.createElement(e);a.className=t;for(const[r,i]of Object.entries(n))a.setAttribute(r,i);return a}function Fy(e={}){const t=e.now??(()=>performance.now()),n=new Cy,a=vt("span","load-fill"),r=vt("span","load-pct"),i=vt("span","load-word"),s=vt("button","load",{type:"button","data-testid":"load-meter","data-state":"ok"});s.append(vt("span","load-label"),vt("span","load-bar",{"aria-hidden":"true"}),r,i),s.firstChild.textContent="Load",s.querySelector(".load-bar")?.append(a);const l=vt("div","nc-ui-help load-tip",{role:"tooltip",id:"load-tip","data-testid":"load-tip"});l.hidden=!0,s.setAttribute("aria-describedby","load-tip");let d=!1,u=0;const c={path:"none",pct:0,state:"ok",underruns:0,recent:0,readings:0,measured:!0,inject(v){d=v!==null,v&&f({pct:v.pct,underruns:v.underruns??(v.underrun?1:0)})}};window.__NC_LOAD__=c;function p(){const v=n.state;s.dataset.state=v,a.style.width=`${Math.round(n.pct)}%`,r.textContent=`${Math.round(n.pct)}%`,i.textContent=Ty(v);const A=Ly(n.pct,v);s.setAttribute("aria-label",A),l.textContent=A,c.pct=n.pct,c.state=v,c.underruns=n.underruns,c.recent=n.recent.length,c.readings=u,l.hidden||w()}function f(v){u++,n.read(v,t()),p()}function b(v){d||f(v)}window.setInterval(()=>{const v=n.state;n.tick(t())!==v&&p()},500);let m=0;function w(){l.isConnected||document.body.append(l);const v=s.getBoundingClientRect();l.style.visibility="hidden",l.style.top="0px",l.style.left="0px";const A=l.offsetWidth,T=8,y=Math.max(T,Math.min(v.left,window.innerWidth-A-T));l.style.top=`${Math.round(v.bottom+6)}px`,l.style.left=`${Math.round(y)}px`,l.dataset.side="below",l.style.visibility=""}function h(){l.hidden=!1,w()}function g(){window.clearTimeout(m),l.hidden=!0}l.style.position="fixed",l.style.pointerEvents="none",s.addEventListener("pointerenter",v=>{v.pointerType!=="touch"&&(window.clearTimeout(m),m=window.setTimeout(h,e.helpDelay??500))}),s.addEventListener("pointerleave",v=>{v.pointerType!=="touch"&&g()}),s.addEventListener("click",()=>l.hidden?h():g()),s.addEventListener("blur",g),document.addEventListener("pointerdown",v=>{s.contains(v.target)||g()}),document.addEventListener("keydown",v=>{v.key==="Escape"&&g()}),window.addEventListener("scroll",g,!0),p();let x=!1;return{el:s,start(v,A){if(x)return c.path;x=!0;const T=v.renderCapacity;if(T&&typeof T.start=="function"){const y=new Ny(Ya);return T.addEventListener("update",k=>{const E=k,$=typeof E.timestamp=="number"?E.timestamp:v.currentTime-Ya;b({pct:(E.averageLoad??0)*100,underruns:y.take(E.underrunRatio,$)})}),T.start({updateInterval:Ya}),c.path="renderCapacity",c.path}if(A&&typeof AudioWorkletNode=="function")try{const k=Math.round((v.baseLatency??0)*v.sampleRate),E=new AudioWorkletNode(v,"nc-studio-load",{numberOfInputs:1,numberOfOutputs:0,processorOptions:{framesPerCallback:k}});return E.port.onmessage=$=>{$.data?.type==="load"&&(c.measured=$.data.measured,b({pct:$.data.load,underruns:$.data.underruns}))},c.path="worklet",c.path}catch{}return c.path="none",c.path}}}function Iy(e,t){const n=vt("div","transport-col");e.replaceWith(n),n.append(e,t.el)}const Bn={noManifest:"No plugin.json there. Pick the plugin's folder, or plugin.json and its DSP file.",noDsp:e=>`plugin.json names its DSP file ${e}. Pick that file too.`,badJson:"plugin.json is not JSON.",bad:e=>`plugin.json has a problem: ${e}`,tooBig:e=>`${e} is over 256 KB.`},Py=256*1024,Ry=e=>e.includes("/")?e.slice(0,e.lastIndexOf("/")+1):"",Da=e=>e.webkitRelativePath||e.name;async function Dy(e){const t=[...e],a=t.filter(f=>f.name==="plugin.json").sort((f,b)=>Da(f).split("/").length-Da(b).split("/").length)[0];if(!a)throw new Error(Bn.noManifest);const r=await a.text();let i;try{i=JSON.parse(r)}catch{throw new Error(Bn.badJson)}const s=Sr(i);if(!s.ok||!s.manifest)throw new Error(Bn.bad(s.errors.join("; ")));const l=s.manifest,d=Ry(Da(a))+l.dsp,u=l.dsp.split("/").pop()??l.dsp,c=t.find(f=>Da(f)===d)??t.find(f=>f!==a&&f.name===u&&!f.webkitRelativePath);if(!c)throw new Error(Bn.noDsp(l.dsp));const p=await c.text();if(new TextEncoder().encode(p).length>Py)throw new Error(Bn.tooBig(l.dsp));return{manifest:l,manifestText:r,dspName:l.dsp,dsp:p}}async function zy(e,t=Date.now()){return{id:e.manifest.id,version:e.manifest.version,name:e.manifest.name,author:e.manifest.author,licence:e.manifest.licence,manifest:e.manifestText,dspName:e.dspName,dsp:e.dsp,sha256:await jc(new TextEncoder().encode(e.dsp)),added:t}}const Il=e=>`local:${e}`,hr=e=>e.startsWith("local:"),Iu=e=>({id:e.id,version:e.version,name:e.name,author:e.author,added:e.added});function Pu(){const e=new Map;return{list:async()=>[...e.values()].sort((t,n)=>t.added-n.added).map(Iu),get:async t=>e.get(t)??null,put:async t=>{e.set(t.id,t)},remove:async t=>{e.delete(t)}}}const Oy="netcomposer-studio-plugins",za="plugins";function By(e=globalThis.indexedDB){const t=Pu(),n=new Promise(i=>{if(!e)return i(null);try{const s=e.open(Oy,1);s.onupgradeneeded=()=>{s.result.objectStoreNames.contains(za)||s.result.createObjectStore(za,{keyPath:"id"})},s.onsuccess=()=>i(s.result),s.onerror=()=>i(null),s.onblocked=()=>i(null)}catch{i(null)}}),a=async(i,s,l)=>{const d=await n;return d?new Promise((u,c)=>{const p=d.transaction(za,i),f=s(p.objectStore(za));p.oncomplete=()=>u(f.result),p.onerror=()=>c(p.error??f.error),p.onabort=()=>c(p.error??f.error)}):l()},r=i=>{const s=i;return!!s&&typeof s.id=="string"&&typeof s.version=="string"&&typeof s.manifest=="string"&&typeof s.dsp=="string"};return{async list(){return(await a("readonly",s=>s.getAll(),async()=>{const s=await t.list();return Promise.all(s.map(l=>t.get(l.id)))})).filter(r).sort((s,l)=>s.added-l.added).map(Iu)},async get(i){const s=await a("readonly",l=>l.get(i),()=>t.get(i));return r(s)?s:null},put:i=>a("readwrite",s=>s.put(i),()=>t.put(i)).then(()=>{}),remove:i=>a("readwrite",s=>s.delete(i),()=>t.remove(i)).then(()=>{})}}const lt=-54,ba=6,Ye=-lt/(ba-lt),_y=-6,eo=(_y-lt)/(ba-lt);function Ru(e){const t=Math.min(1,Math.max(0,e));return t===0?Number.NEGATIVE_INFINITY:lt+t*(ba-lt)}function jy(e){return e===Number.NEGATIVE_INFINITY?0:10**(e/20)}function qy(e){return e<=0?Number.NEGATIVE_INFINITY:20*Math.log10(e)}function wt(e){return jy(Ru(e))}function Vy(e){if(e===Number.NEGATIVE_INFINITY||e<-99)return"−∞";const t=e.toFixed(1);return t.startsWith("-")?`−${t.slice(1)}`:e>.05?`+${t}`:t}function Hy(e){const t=e.some(n=>n.solo);return e.map(n=>n.mute||t&&!n.solo?0:wt(n.position))}function qo(e){return e===Number.NEGATIVE_INFINITY||Number.isNaN(e)?0:Math.min(1,Math.max(0,(e-lt)/(ba-lt)))}function Pl(e){return qo(qy(e))}const Rl=[0,-6,-12,-24,-48].map(e=>({value:qo(e),label:e===0?"0":`−${-e}`})),Uy=1;function Gy(e){let t=0,n=0;for(const a of e){const r=Math.abs(a);r>t&&(t=r),n+=a*a}return{peak:t,rms:e.length>0?Math.sqrt(n/e.length):0}}function Dl(e){const t=e.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(t==="")return null;if(t==="off"||t==="-inf"||t==="-∞"||t==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(t))return null;const n=Number(t.replace(",","."));return Number.isFinite(n)?n<lt?0:qo(Math.min(ba,n)):null}function Wy(e){const t=Math.min(1,Math.max(-1,Number.isFinite(e)?e:0)),n=Math.cos(Math.abs(t)*Math.PI/2);return t>0?[n,1]:t<0?[1,n]:[1,1]}const Vo="netcomposer.studio.mix.v1",Du={position:eo,mute:!1,solo:!1,sendA:0,sendB:0,pan:0,shade:0,trim:0},zu=-12,Ou=24,Ky=.5;function Bu(e){if(typeof e!="number"||!Number.isFinite(e))return 0;const t=Math.round(Math.min(Ou,Math.max(zu,e))*10)/10;return t===0?0:t}const Yy=8;function Xy(e){return typeof e=="number"&&Number.isInteger(e)&&e>=1&&e<=Yy?e:0}function la(){return{v:1,channels:{},master:Ye,returns:{a:{on:!0,level:Ye},b:{on:!0,level:Ye}},insert:{on:!1},fx:{},channelFx:{},masterFx:null}}const Zn=(e,t)=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t,Jy=e=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(-1,e)):0,fr=(e,t)=>typeof e=="boolean"?e:t,xt=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{};function Qy(e){const t=xt(e);return{position:Zn(t.position,Du.position),mute:fr(t.mute,!1),solo:fr(t.solo,!1),sendA:Math.min(Ye,Zn(t.sendA,0)),sendB:Math.min(Ye,Zn(t.sendB,0)),pan:Jy(t.pan),shade:Xy(t.shade),trim:Bu(t.trim)}}function _u(e){const t=la(),n=xt(e);if(n.v!==1)return t;const a={};for(const[u,c]of Object.entries(xt(n.channels)))u.length>0&&u.length<=64&&(a[u]=Qy(c));const r=xt(n.returns),i=(u,c)=>{const p=xt(u);return{on:fr(p.on,c.on),level:Zn(p.level,c.level)}},s={},l=xt(n.fx);for(const u of["a","b","insert"])l[u]!==void 0&&(s[u]=l[u]);const d={};for(const[u,c]of Object.entries(xt(n.channelFx)))u.length>0&&u.length<=64&&c&&typeof c=="object"&&(d[u]=c);return{v:1,channels:a,master:Zn(n.master,t.master),returns:{a:i(r.a,t.returns.a),b:i(r.b,t.returns.b)},insert:{on:fr(xt(n.insert).on,t.insert.on)},fx:s,channelFx:d,masterFx:n.masterFx&&typeof n.masterFx=="object"?n.masterFx:null}}function ju(){try{return globalThis.localStorage??null}catch{return null}}function Zy(e=ju()){try{const t=e?.getItem(Vo);return t?_u(JSON.parse(t)):la()}catch{return la()}}function qu(e,t=ju()){try{return t?.setItem(Vo,JSON.stringify(e)),t!==null}catch{return!1}}const Cr=3;function ev(e,t=Cr){return Math.max(1,Math.ceil(e/t))}function zl(e,t=Cr){return Math.max(0,Math.floor(e/t))}function tv(e,t,n,a=null,r=Cr){const i=ev(n.length,r)-1;if(!e||e.key!==t)return 0;const s=a===null?-1:n.indexOf(a);if(s>=0)return zl(s,r);const l=new Set(e.ids);let d=-1;return n.forEach((u,c)=>{l.has(u)||(d=c)}),d>=0?zl(d,r):Math.min(i,Math.max(0,e.page))}const nv=["M0 10 L0 1 L20 1 L20 10","M0 10 C3 10 6 1 12 1 L20 1","M0 10 C10 10 16 6 20 1 L20 10","M0 10 L0 1 L3 1 C5 1 6 9 11 10 L20 10","M0 8 C8 8 12 2 20 2"],Oa="Custom";function Ol(e,t){const n={};for(const a of oe("gate")?.dials??[])n[a.key]=Number(e.getParam(t,a.key)??a.default);return n}function av(e,t,n,a,r){const i=oe("gate"),s=y=>i?.dials.find(k=>k.key===y),l=t.getPattern(n)??{levels:Array(16).fill(100),shapes:Array(16).fill(0)},d=Ol(t,n),u=d.steps===8?8:16,c=Wc(d),p=y=>`hack-${e}-${n}-${y}`,f=Cf({dials:d,pattern:l}),b=(y,k)=>{t.setParam(n,y,k),r.render()},m=(y,k)=>{const E=s(y);return E?.options?{type:"choice",id:p(y),label:E.label,caption:k,value:String(d[y]),options:E.options.map($=>({value:String($.value),label:$.label})),onChange:$=>b(y,Number($))}:null},w=y=>{const k=s(y);return k?r.dial(k):null},h={type:"levelSteps",id:p("steps-strip"),label:`${f===Oa?"Gate":f} steps`,steps:l.levels.slice(0,u).map((y,k)=>({level:y/100,shape:l.shapes[k]})),played:c,swing:.5+.25*(d.swing??0)/100,on:a,shapes:Mf.map((y,k)=>({value:k,label:y,icon:nv[k]})),curve:(y,k)=>Ff(d,l,y,k),onLevels:y=>{const k=l.levels.slice();y.forEach((E,$)=>{k[$]=Math.round(E*100)}),t.setPattern(n,{levels:k}),r.render()},onShape:(y,k)=>{const E=l.shapes.slice();E[y]=k,t.setPattern(n,{shapes:E}),r.render()},onShapeAll:y=>{t.setPattern(n,{shapes:Array(16).fill(y)}),r.render()},playhead:()=>{const y=t.beatAt(r.heardAt());return y?{step:Nf(Ol(t,n),y.beat,y.beatsPerBar),locked:y.locked}:null},help:ee["gate:steps"]},x=[{type:"select",id:p("pattern"),label:"Pattern",value:f,options:[...$n.map(y=>({value:y.name,label:y.name})),{value:Oa,label:Oa}],onChange:y=>{y!==Oa&&(t.setGatePattern(n,y),r.render())}},h,m("rate","Rate"),w("swing"),w("depth"),w("mix")],v=d.mode===1,A=[m("steps","Steps"),m("mode","Mode"),w("smooth"),w("spread"),...v?[w("res")]:[]],T=y=>y!==null;return{controls:x.filter(T),more:A.filter(T)}}const Vu=e=>!!e&&typeof e=="object"&&Array.isArray(e.chain);function rv(e,t){if(!Vu(e))return null;const n=e.chain.findIndex(a=>a?.id===t);return n<0?null:{slot:JSON.parse(JSON.stringify(e.chain[n])),index:n}}function iv(e,t,n){if(!Vu(e)||e.chain.length>=n||e.chain.some(r=>r?.id===t.slot.id))return null;const a=e.chain.slice();return a.splice(Math.max(0,Math.min(a.length,t.index)),0,t.slot),{...e,v:2,chain:a}}const Bl="plugin-url",di="plugin-folder",_l="plugin-files",ui="kept:",pi="forget:",hi="listed:",ov="../plugins/registry.json",O={urlTitle:"Load a plugin from a URL",urlBody:"Paste the address of the plugin's plugin.json.",urlField:"Address",urlPlaceholder:"https://…/plugin.json",urlNext:"Next",warnTitle:"Run this plugin?",warnBody:e=>`This runs code from ${e} in your browser. Only load plugins from people you trust. Listed plugins are checked; this one is not.`,warnLoad:"Load and run",badUrl:"That isn't a plugin address. Use https://, or http://localhost while you build one.",badUrlLocal:"Plugins load from this computer for now: pick its files, or use http://localhost while you build one.",urlPlaceholderLocal:"http://localhost:…/plugin.json",folder:"Load plugin folder…",files:"Load plugin from files…",url:"Load plugin from URL…",thisComputer:"this computer",kept:e=>`${e} (this computer)`,fileWarnBody:(e,t)=>`This runs ${e} by ${t}, from files on this computer, in your browser. Only run code you made or trust. It is kept in this browser until you remove it.`,forget:e=>`Remove ${e} from this computer…`,forgetTitle:e=>`Remove ${e}?`,forgetBody:"This browser forgets its copy. Slots that use it keep their dials and play as a wire after a reload.",forgetConfirm:"Remove",forgotten:e=>`${e} is removed from this computer.`,reloadToUse:(e,t)=>`Kept ${e} ${t}. Reload the page to hear the new code.`,reloadToHear:e=>`${e} has new code. Reload the page to hear it; until then the old code plays.`,reloadAction:"Reload",newCode:"Reload page: new code.",stuck:(e,t)=>`${e} on ${t} got stuck in a loop and was stopped. The rest of the mix plays on.`,frozenTitle:"The sound stopped",frozenBody:e=>`${e} froze the audio on this page, and it can't be restarted here. In a new tab your mix comes back with ${e} off (add it again to retry). This page stops saving.`,frozenOpen:"Open new tab",frozenStay:"Stay here",frozenShort:"Stopped: froze audio.",notKept:"Not on this computer.",pickAgain:"Pick files…",badUrlShort:"Not a plugin address.",failedShort:"Couldn't load it.",missing:"Missing: not loaded.",missingNoUrl:"Missing: no address saved.",through:"Sound passes through.",dialsKept:"Its dials are kept.",from:e=>`From ${e}`,load:"Load",loadAsk:"Load…",loading:"Loading…",retry:"Remove, add to retry."};function sv(e){const t={1:"Stopped: failed to start.",2:"Stopped: it crashed.",3:"Stopped: bad numbers.",4:"Stopped: a dial crashed it.",5:"Stopped: code not loaded.",6:"Stopped: stuck in a loop."};for(const[n,a]of Object.entries(tr))if(a===e)return t[Number(n)];return"Stopped."}function _n(e){if(hr(e))return O.thisComputer;try{return new URL(e).host||e}catch{return e}}function lv(e,t,n=!0){let a;try{a=new URL(e.trim(),t)}catch{return null}const r=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(a.hostname);return a.protocol==="https:"&&(n||r)||a.protocol==="http:"&&r?a.href:null}function cv(e){const t=new URL(ov,e.base).href;let n=[];const a=new Set,r=new Map,i=[],s=new Set,l=()=>{for(const T of s)T()},d=T=>String(T?.message??T).replace(/^nc-fx plugins?: /,""),u=e.remote!==!1,c=e.store??Pu();let p=[];const f=new Map,b=new Set,m=T=>{b.has(T)||(b.add(T),l())},w=e.frozen,h=async()=>{try{p=await c.list()}catch(T){console.warn(`Studio plugins: can't read this computer's plugins (${d(T)})`)}l()},g=h(),x=u?$f(t,{fetch:e.fetch}).then(T=>{n=T.registry.plugins;for(const k of T.errors)console.warn(`Studio plugins: registry ${k}`);l();const y=i.splice(0);y.length&&A.restore(y)}).catch(T=>{console.info(`Studio plugins: no listed plugins (${d(T)})`)}):Promise.resolve(),v=async(T,y)=>{a.add(T),r.delete(T),l();try{const{entry:k,stale:E}=await y();return k.plugin&&(E&&m(k.plugin.id),w?.clear(k.plugin.id)),k.type}catch(k){throw r.set(T,d(k)),k}finally{a.delete(T),l()}},A={listed:()=>n,loaded:()=>Kh().filter(T=>!T.plugin.listed&&!hr(T.plugin.url)),remote:u,local:()=>p,stale:T=>b.has(T),frozen:T=>!!w?.has(T),async addPicked(T){const y=await zy(T);w?.clear(y.id);const k=oe(`plugin:${y.id}`);if(k){const $=k.plugin?.version===y.version&&f.get(y.id)===y.sha256;return await c.put(y),await h(),$||m(y.id),$?{type:k.type}:{reload:!0}}const E=await v(y.id,()=>Rs(e.ctx,{manifest:y.manifest,dsp:y.dsp,dspName:y.dspName},{moduleUrl:e.moduleUrl,url:Il(y.id)}));return f.set(y.id,y.sha256),await c.put(y),await h(),{type:E}},async loadKept(T){w?.clear(T);const y=oe(`plugin:${T}`),k=await c.get(T);if(y){const $=f.get(T);return k&&$&&$!==k.sha256&&m(T),y.type}if(!k)throw new Error(O.notKept);const E=await v(T,()=>Rs(e.ctx,{manifest:k.manifest,dsp:k.dsp,dspName:k.dspName},{moduleUrl:e.moduleUrl,url:Il(T)}));return f.set(T,k.sha256),E},async forget(T){await c.remove(T),await h()},listingFor(T){const y=n.find(E=>E.id===T.id);if(!y)return null;const k=new URL(y.manifest,t).href;return!T.url||T.url===k?y:null},loading:T=>a.has(T),async loadListed(T){w?.clear(T);const y=oe(`plugin:${T}`);if(y)return y.type;await x;const k=n.find(E=>E.id===T);if(!k)throw new Error(`${T} isn't listed`);return v(T,()=>Sf(e.ctx,k,t,{moduleUrl:e.moduleUrl,fetch:e.fetch}))},loadUrl(T){return v("url",()=>Hc(e.ctx,T,{moduleUrl:e.moduleUrl,fetch:e.fetch,base:e.base}))},restore(T){for(const y of T)if(!(y.status!=="missing"||a.has(y.id)||oe(`plugin:${y.id}`))&&!w?.has(y.id)){if(hr(y.url)){g.then(()=>{p.some(k=>k.id===y.id)&&!a.has(y.id)&&!oe(`plugin:${y.id}`)&&A.loadKept(y.id).catch(()=>{})});continue}if(u){if(!n.length){i.some(k=>k.id===y.id)||i.push(y);continue}A.listingFor(y)&&A.loadListed(y.id).catch(()=>{})}}},onChange(T){return s.add(T),()=>s.delete(T)},problem:T=>r.get(T)??null,clearProblem(T){r.delete(T)&&l()}};return A}const Hu="netcomposer.studio.sends.v2";function dv(e){try{return e?.getItem(Hu)==="1"}catch{return!1}}function uv(e,t){try{e?.setItem(Hu,t?"1":"0")}catch{}}function pv(e,t){try{return!!(e?.matchMedia(t.portrait).matches||e?.matchMedia(t.landscape).matches)}catch{return!1}}function mr(e){return e.hacksShown!==null?{kind:"stack",id:e.hacksShown}:e.sendsShown?{kind:"sends"}:{kind:"none"}}function hv(e){return mr(e).kind==="sends"?{hacksShown:null,sendsShown:!1}:{hacksShown:null,sendsShown:!0}}function fv(e){for(const t of e)if(t.sendA>0||t.sendB>0)return!0;return!1}function jl(e,t){return e&&!t}function mv(e,t,n){return e&&mr(t).kind==="none"&&n.every(a=>a===0)}const Uu="netcomposer.studio.strip-fold.v1";function Gu(e){try{const t=e?.getItem(Uu),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Wu(e,t){try{e?.setItem(Uu,JSON.stringify([...t].sort()))}catch{}return t}function Ku(e,t,n){const a=new Set(Gu(e));return n?a.add(t):a.delete(t),Wu(e,a)}function gv(e,t){return Ku(e,t,!1)}function bv(e,t){const n=new Set(t),a=Gu(e),r=new Set([...a].filter(i=>n.has(i)));return r.size===a.size?a:Wu(e,r)}function yv(e,t){if(!e.includes(t.id))return[...e];const n=e.filter(i=>i!==t.id),a=t.before===null?-1:n.indexOf(t.before),r=a<0?n.length:a;return[...n.slice(0,r),t.id,...n.slice(r)]}function vv(e,t,n){const a=e.indexOf(t);if(a<0)return null;const r=a+n;return r<0||r>=e.length?null:n<0?{id:t,before:e[r]}:{id:t,before:e[r+1]??null}}function wv(e,t){if(e.length===0)return null;let n=e[0],a=Number.POSITIVE_INFINITY;for(const r of e){const i=t<r.left?r.left-t:t>r.left+r.width?t-(r.left+r.width):0;i<a&&(n=r,a=i)}return{target:n.id,side:t<n.left+n.width/2?"before":"after"}}function ql(e,t,n){const a=e.indexOf(n.target);if(a<0||!e.includes(t))return null;const r=n.side==="before"?n.target:e[a+1]??null;if(r===t)return null;const i={id:t,before:r};return yv(e,i).every((l,d)=>l===e[d])?null:i}const xv=-18,kv=-20,Yu=3,$v=[-20,-10,-7,-5,-3,-2,-1,0,1,2,3],Vl=[-20,-10,-7,-5,-3,0,1,2,3],Sv=.3,Ev=6.638/Sv,Av=48;function Mv(e){return e-xv}function Xu(e){return Number.isFinite(e)?Math.min(1,Math.max(0,10**((e-Yu)/20))):e>0?1:0}function Tv(e){return e>0?Xu(Mv(20*Math.log10(e))):0}function Ho(e){return(Math.min(1,Math.max(0,e))*2-1)*Av}const Hl={x:0,v:0};function Lv(e,t,n,a=!1){if(a)return{x:t,v:0};if(!(n>0))return e;const r=Ev,i=e.x-t,s=e.v+r*i,l=Math.exp(-r*n),d=t+(i+s*n)*l,u=(e.v-r*s*n)*l;return d>=1?{x:1,v:0}:d<=0?{x:0,v:0}:{x:d,v:u}}function Cv(e,t){return Math.abs(e.x-t)<1e-4&&Math.abs(e.v)<.001}const Ju="netcomposer.studio.vu.v1";function Nv(e){try{return e?.getItem(Ju)==="1"}catch{return!1}}function Fv(e,t){try{e?.setItem(Ju,t?"1":"0")}catch{}}const Qu="netcomposer.studio.vu-fold.v1";function Iv(e){try{return e?.getItem(Qu)==="1"}catch{return!1}}function Pv(e,t){try{e?.setItem(Qu,t?"1":"0")}catch{}}const Rv="http://www.w3.org/2000/svg",to=200,fi=112,hn=to/2,ea=132,Ul=100,Dv=108,zv=105,Ov=116,Bv=103,_v=112,et=(e,t)=>{const n=document.createElementNS(Rv,e);for(const[a,r]of Object.entries(t))n.setAttribute(a,String(r));return n},Gl=e=>Math.round(e*100)/100;function ta(e,t){const n=Ho(Xu(e))*Math.PI/180;return[Gl(hn+t*Math.sin(n)),Gl(ea-t*Math.cos(n))]}function Wl(e,t,n){const[a,r]=ta(e,n),[i,s]=ta(t,n);return`M ${a} ${r} A ${n} ${n} 0 0 1 ${i} ${s}`}const jv=e=>e>0?`+${e}`:e<0?`−${-e}`:"0";function Kl(e){const t=et("svg",{class:"vu-meter",viewBox:`0 0 ${to} ${fi}`,role:"img","aria-label":`${e==="L"?"Left":"Right"} VU meter`,"data-vu-side":e});t.append(et("rect",{class:"vu-face",x:.5,y:.5,width:to-1,height:fi-1,rx:4})),t.append(et("path",{class:"vu-arc",d:Wl(kv,0,Ul)})),t.append(et("path",{class:"vu-zone",d:Wl(0,Yu,Bv)}));for(const i of $v){const[s,l]=ta(i,Ul),[d,u]=ta(i,Vl.includes(i)?Dv:zv);t.append(et("line",{class:i>0?"vu-tick vu-red":"vu-tick",x1:s,y1:l,x2:d,y2:u}))}for(const i of Vl){const[s,l]=ta(i,Ov),d=et("text",{class:i>0?"vu-num vu-red":"vu-num",x:s,y:l,"text-anchor":"middle"});d.textContent=Math.abs(i)===20||i===3?jv(i):String(Math.abs(i)),t.append(d)}const n=et("text",{class:"vu-legend",x:hn,y:92,"text-anchor":"middle"});n.textContent="VU";const a=et("text",{class:"vu-side",x:10,y:fi-10});a.textContent=e;const r=et("line",{class:"vu-needle",x1:hn,y1:ea,x2:hn,y2:ea-_v,transform:`rotate(${Ho(0)} ${hn} ${ea})`});return t.append(n,a,r),{svg:t,needle:r}}function qv(e){const t=document.createElement("div");t.className="vu",t.dataset.vu="",t.setAttribute("role","group"),t.setAttribute("aria-label","VU meters");const n=document.createElement("div");n.className="vu-hd";const a=document.createElement("button");a.type="button",a.className="nc-fold-toggle",a.dataset.vuFold="";const r=document.createElement("span");r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),a.append(r),a.setAttribute("data-nc-help",ee["vu:fold"]);const i=document.createElement("span");i.className="nc-strip-name vu-name",i.textContent="Meters",i.setAttribute("data-nc-help",ee["vu:module"]);const s=document.createElement("button");s.type="button",s.className="nc-page-action vu-hide",s.dataset.vuRemove="",s.textContent="Hide",s.setAttribute("aria-label","Hide VU meters"),s.setAttribute("data-nc-help",ee["vu:remove"]),s.addEventListener("click",()=>e.onRemove(s)),n.append(a,i,s);const l=document.createElement("div");l.className="vu-mini",l.setAttribute("aria-hidden","true");const d=["L","R"].map(g=>{const x=document.createElement("span");x.className="vu-bar",x.dataset.side=g;const v=document.createElement("span");return v.className="vu-bar-fill",x.append(v),l.append(x),v});let u=e.folded;const c=()=>{t.toggleAttribute("data-folded",u),a.setAttribute("aria-expanded",u?"false":"true"),a.setAttribute("aria-label",u?"Expand VU meters":"Minimize VU meters"),a.title=u?"Expand":"Minimize"};c(),a.addEventListener("click",()=>{u=!u,c(),e.onFold(u)});const p=Kl("L"),f=Kl("R");t.append(n,p.svg,f.svg,l);const b=matchMedia("(prefers-reduced-motion: reduce)"),m=[Hl,Hl],w=[Number.NaN,Number.NaN],h=[p.needle,f.needle];return{el:t,frame(g,x){let v=!1;for(const A of[0,1]){const T=g?Tv(g[A]):0;m[A]=Lv(m[A],T,x,b.matches),(!Cv(m[A],T)||T>0)&&(v=!0);const y=Math.round(Ho(m[A].x)*10)/10;y!==w[A]&&(w[A]=y,h[A].setAttribute("transform",`rotate(${y} ${hn} ${ea})`),d[A].style.transform=`scaleY(${Math.max(0,Math.min(1,m[A].x)).toFixed(3)})`,t.dataset[A===0?"vuL":"vuR"]=y.toFixed(1))}return v}}}const Vv="netcomposer.studio.hidden.v1",Ba=1/120,bt="master",Yl="Inserts",Hv="(max-width: 768px)",Zu=8,Xa=e=>Vy(Ru(e)),Xl=e=>{const t=Xa(e);return t==="−∞"?"off":`${t} dB`};function Uv(e,t){return mn.find(n=>n.type===e)?.dials.find(n=>n.key===t)}function Gv(e,t,n){const a=n.bpm,r=S=>{const C=n.order(),F=C.indexOf(S);return F<0?C.length:F},i=(S,C,F,z)=>{const D=Uv(F,z);if(!D||!C)return null;const J=Number(C.getParam(F,z)??D.default),te=`mix-${S}-${z}`;return D.options?{type:"select",id:te,label:D.label,value:String(J),options:D.options.map(R=>({value:String(R.value),label:R.label})),onChange:R=>{C.setParam(F,z,Number(R)),re.render()}}:{type:"slider",id:te,label:D.label,min:D.min,max:D.max,step:D.step??1,taper:Js(D),value:J,valueText:D.format(J,a()),onChange:R=>{C.setParam(F,z,R),re.render()}}},s=(S,C,F,z)=>z.map(D=>i(S,C,F,D)).filter(D=>D!==null),l=matchMedia(Hv);let d=null;const u=S=>{d=S,re.render()},c=S=>u(d===S?null:S);l.addEventListener("change",()=>re.render());const p=(S,C,F,z)=>{S.setParam(C,F,z),re.render()},f=(S,C,F,z)=>im(C,F,{id:`hack-${S}-${F}-graph`,on:z,set:(D,J)=>p(C,F,D,J),help:{graph:ee["eq:graph"],low:ee["eq:low"],mid:ee["eq:mid"],high:ee["eq:high"]}}),b=(S,C,F,z)=>{const D=Number(C.getParam(F,z.key)??z.default),J=`hack-${S}-${F}-${z.key}`,te=R=>p(C,F,z.key,R);return z.options?{type:"select",id:J,label:z.label,value:String(D),options:z.options.map(R=>({value:String(R.value),label:R.label})),onChange:R=>te(Number(R))}:{type:"slider",id:J,label:z.label,min:z.min,max:z.max,step:z.step??.001,taper:Js(z),value:D,valueText:Rc(z,D,a()),onChange:te}},m="",w={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3},drive:{drive_db:6}};let h=ey(ve(),`${bt}/${Mu}`);const g=S=>({folded:h.has(S),onFold:C=>{h=Eu(ve(),S,C),re.render()},foldHelp:ee["fx:fold"]}),x=n.plugins;x?.onChange(()=>re.render());const v=new Map,A=S=>String(S?.message??S).replace(/^nc-fx plugins?: /,""),T=(S,C,F)=>{v.set(S,C),re.render(),$t({message:F,duration:9e3,anchor:ue.el.querySelector(`[data-nc-id='hack-${S}-add']`)})},y=(S,C)=>{const F=$t({message:C,duration:12e3,actionLabel:O.reloadAction,onAction:()=>location.reload(),anchor:ue.el.querySelector(`[data-nc-id='hack-${S}-add']`)});F.el.dataset.pluginReload=S},k=S=>oe(S)?.label??S,E=S=>!!S&&S.startsWith("plugin:")&&!!x?.stale(S.slice(7)),$=async(S,C,F)=>{if(!x)return null;const z=F??await Vm({title:O.urlTitle,body:O.urlBody,field:{label:O.urlField,placeholder:x.remote?O.urlPlaceholder:O.urlPlaceholderLocal,type:"url"},confirmLabel:O.urlNext,returnFocus:C??void 0});if(!z)return null;const D=lv(z,location.href,x.remote);if(!D)return T(S,O.badUrlShort,x.remote?O.badUrl:O.badUrlLocal),null;if(!await We({title:O.warnTitle,body:O.warnBody(_n(D)),confirmLabel:O.warnLoad,danger:!0,returnFocus:C??void 0}))return null;try{const te=await x.loadUrl(D);return E(te)&&y(S,O.reloadToHear(k(te))),te}catch(te){return te?.reload?(v.set(S,O.failedShort),re.render(),y(S,A(te))):T(S,O.failedShort,A(te)),null}},L=S=>{const C=document.createElement("input");return C.type="file",C.hidden=!0,C.dataset.ncId="plugin-files",S?C.webkitdirectory=!0:(C.multiple=!0,C.accept=".json,.js,.mjs,application/json,text/javascript"),document.body.append(C),new Promise(F=>{const z=D=>{C.remove(),F(D)};C.addEventListener("change",()=>z(C.files?.length?[...C.files]:null)),C.addEventListener("cancel",()=>z(null)),C.click()})},N=async(S,C,F)=>{if(!x)return null;const z=await L(F);if(!z)return null;let D;try{D=await Dy(z)}catch(te){return T(S,O.failedShort,A(te)),null}if(!await We({title:O.warnTitle,body:O.fileWarnBody(D.manifest.name,D.manifest.author),confirmLabel:O.warnLoad,danger:!0,returnFocus:C??void 0}))return null;try{const te=await x.addPicked(D);return"reload"in te?(y(S,O.reloadToUse(D.manifest.name,D.manifest.version)),null):te.type}catch(te){return T(S,O.failedShort,A(te)),null}},_=async(S,C,F)=>{if(!x)return;const z=x.local().find(J=>J.id===C)?.name??C;await We({title:O.forgetTitle(z),body:O.forgetBody,confirmLabel:O.forgetConfirm,danger:!0,returnFocus:F??void 0})&&(await x.forget(C),$t({message:O.forgotten(z),duration:5e3,anchor:ue.el.querySelector(`[data-nc-id='hack-${S}-add']`)}))},V=async(S,C,F,z)=>{v.delete(S);let D=F;if(F===di||F===_l)D=await N(S,z,F===di);else if(F.startsWith(pi))await _(S,F.slice(pi.length),z),D=null;else if(F.startsWith(ui)&&x){re.render();try{D=await x.loadKept(F.slice(ui.length)),E(D)&&y(S,O.reloadToHear(k(D)))}catch(J){T(S,O.failedShort,A(J)),D=null}}else if(F===Bl)D=await $(S,z);else if(F.startsWith(hi)&&x){re.render();try{D=await x.loadListed(F.slice(hi.length))}catch(J){T(S,O.failedShort,A(J)),D=null}}D&&C.addEffect(D,{dials:w[D]}),re.render()},K=()=>x?[...x.listed().map(S=>({value:`${hi}${S.id}`,label:S.name,group:"Plugins"})),...x.local().map(S=>({value:`${ui}${S.id}`,label:O.kept(S.name),group:"Plugins"})),...x.loaded().map(S=>({value:S.type,label:`${S.label} (${_n(S.plugin.url)})`,group:"Plugins"})),{value:di,label:O.folder,group:"Plugins"},{value:_l,label:O.files,group:"Plugins"},{value:Bl,label:O.url,group:"Plugins"},...x.local().map(S=>({value:`${pi}${S.id}`,label:O.forget(S.name),group:"Plugins"}))]:[];let ne=null,be=null,ce=null;const se=S=>t.masterFx===S||t.list().some(C=>C.fx===S),Y=S=>requestAnimationFrame(()=>ue.el.querySelector(S)?.focus()),nn=(S,C,F,z,D,J,te)=>{const R=rv(F.getState(),z);if(!R||!F.removeEffect(z))return;const me=!!te&&te===document.activeElement;if(ce?.close(),re.render(),me){const zt=F.getChain()[R.index];Y(zt?`[data-nc-id='hack-${S}-${zt.id}'] [data-nc-fx-remove]`:`#hack-${S}-add-type`)}const G=$t({message:`${D} removed from ${C}.`,actionLabel:"Undo",anchor:ue.el.querySelector("[data-nc-area='fx']"),onAction:()=>Rt(S,F,R,J),onClose:()=>{ce===G&&(ce=null)}});G.el.dataset.insertUndo=S,ce=G},Rt=(S,C,F,z)=>{if(!se(C))return;const D=iv(C.getState(),F,z);let J=F.slot.id;if(D)C.setState(D);else{const{type:te,dials:R,bypass:me,pattern:G}=F.slot;J=C.addEffect(te,{index:F.index,dials:R,bypass:me}),J&&G&&C.setPattern(J,G)}J&&(d=S,be=`hack-${S}-${J}`,re.render(),Y(`[data-nc-id='hack-${S}-${J}'] [data-nc-fx-remove]`))},Dt=(S,C,F,z)=>{const D=F.getChain(),J=D.map((R,me)=>{const G=oe(R.type),zt=G?.dials??[],ws=de=>nn(S,C,F,R.id,R.name,z,de),xs=de=>{F.moveEffect(R.id,de),be=`hack-${S}-${R.id}`,re.render()},Pn=[];me>0&&Pn.push({type:"button",id:`hack-${S}-${R.id}-left`,label:"Move left",on:!1,onPress:()=>xs(me-1)}),me<D.length-1&&Pn.push({type:"button",id:`hack-${S}-${R.id}-right`,label:"Move right",on:!1,onPress:()=>xs(me+1)}),Pn.push({type:"button",id:`hack-${S}-${R.id}-remove`,label:"Remove",ariaLabel:`Remove ${R.name} from ${C}`,on:!1,onPress:()=>ws(document.getElementById(`hack-${S}-${R.id}-remove`))});const ks={onRemove:de=>ws(de),removeLabel:`Remove ${R.name}`},pe=R.plugin,Ie=(de,Ot,on=!1)=>({type:"note",id:`hack-${S}-${R.id}-${de}`,...on?{tone:"danger"}:{},text:Ot});if(pe&&pe.status==="missing"){const de=x?.listingFor(pe)??null,Ot=hr(pe.url),on=Ot&&!!x?.local().some(Aa=>Aa.id===pe.id),$s=x?.loading(pe.id)??!1,Ss=$s?[Ie("missing",O.loading)]:[Ie("missing",x?.frozen(pe.id)?O.frozenShort:Ot&&!on?O.notKept:pe.url?O.missing:O.missingNoUrl,!0),Ie("through",O.through),Ie("kept",O.dialsKept),...pe.url?[Ie("from",O.from(_n(pe.url)))]:[]];return x&&pe.url&&!$s&&Ss.push({type:"button",id:`hack-${S}-${R.id}-load`,label:de||on?O.load:Ot?O.pickAgain:O.loadAsk,ariaLabel:de||on?`Load ${pe.name}`:Ot?`Pick ${pe.name}'s folder (asks first)`:`Load ${pe.name} from ${_n(pe.url)} (asks first)`,on:!1,onPress:()=>{const Aa=document.getElementById(`hack-${S}-${R.id}-load`);de?x.loadListed(pe.id).catch(()=>re.render()):on?x.loadKept(pe.id).catch(()=>re.render()):Ot?N(S,Aa,!0).then(()=>re.render()):$(S,Aa,pe.url)}}),{type:"fx",id:`hack-${S}-${R.id}`,title:`${me+1} · ${R.name}`,...g(`${S}/${R.id}`),depth:me%4+1,controls:Ss,more:Pn,...ks}}const rn=G&&"plugin"in G?G.plugin:void 0,fh=rn?[Ie("by",`By ${rn.author}`),Ie("version",`${rn.licence} · ${rn.version}`),Ie("source",rn.listed?"Listed":O.from(_n(rn.url)))]:[],mh=pe?.status==="failed"?[Ie("failed",sv(pe.error),!0),Ie("through",O.through),Ie("retry",O.retry)]:pe&&x?.stale(pe.id)?[Ie("newcode",O.newCode)]:[],Ea=R.type==="gate"?av(S,F,R.id,!R.bypass,{dial:de=>b(S,F,R.id,de),render:()=>re.render(),heardAt:()=>t.ctx.currentTime-(t.ctx.outputLatency||0)}):null;return{type:"fx",id:`hack-${S}-${R.id}`,title:`${me+1} · ${R.name}`,...g(`${S}/${R.id}`),depth:me%4+1,on:!R.bypass,meter:Yr(F,R.id)??void 0,meterHelp:ee["fx:meter"],onToggle:de=>{F.setParam(R.id,"bypass",!de),re.render()},controls:Ea?Ea.controls:[...mh,...R.type==="eq"?[f(S,F,R.id,!R.bypass)]:[],...zt.filter(de=>!de.more).map(de=>b(S,F,R.id,de))],maxHelp:ee["fx:max"],...ks,more:[...Ea?Ea.more:zt.filter(de=>de.more).map(de=>b(S,F,R.id,de)),...fh,...Pn]}}),te=D.length>=z;return J.push({type:"fx",id:`hack-${S}-add`,title:`${C} · Inserts`,...g(`${S}/add`),depth:D.length%4+1,controls:[{type:"note",id:`hack-${S}-note`,...v.get(S)?{tone:"danger"}:{},text:v.get(S)??(x?.loading("url")||x?.listed().some(R=>x.loading(R.id))||x?.local().some(R=>x.loading(R.id))?O.loading:te?`${D.length} of ${z}: the stack is full.`:D.length===0?"No effects yet.":`${D.length} of ${z}, first to last.`)},...te?[]:[{type:"select",id:`hack-${S}-add-type`,label:"Add",value:m,options:[{value:m,label:"Effect…"},...Uh.map(R=>({value:R,label:oe(R)?.label??R})),...K()],onChange:R=>{if(R===m)return;const me=document.getElementById(`hack-${S}-add-type`);me instanceof HTMLSelectElement&&(me.value=m),V(S,F,R,me)}}]]}),J},Sa=S=>{const C=t.returns[S];return{type:"slider",id:`mix-${S}-return`,label:"Return",min:0,max:1,step:Ba,value:C.level,valueText:Xl(C.level),onChange:F=>t.setReturn(S,{level:F})}};let ye=dv(ve());const U=()=>pv(globalThis.window,{portrait:lu,landscape:cd}),Se=()=>{const S=hv({hacksShown:d,sendsShown:ye});d=S.hacksShown,S.sendsShown!==ye&&(ye=S.sendsShown,uv(ve(),ye)),re.render()},fe=(S,C,F)=>{const z=vv(n.order(),S,C);if(!z)return;n.onReorder?.(z.id,z.before);const J=ue.el.querySelector(`${St}[data-nc-id="strip-${CSS.escape(S)}"]`)?.querySelector(F);J&&document.activeElement!==J&&J.focus()};let Oe=bv(ve(),n.order());const Qe=()=>mv(U(),{hacksShown:d,sendsShown:ye},t.list().map(S=>S.strip.trim)),ph=()=>[...t.list()].sort((S,C)=>r(S.id)-r(C.id)).map(S=>({type:"strip",id:`strip-${S.id}`,label:S.name,value:S.strip.position,valueText:Xa(S.strip.position),step:Ba,defaultValue:eo,resetText:`${Xa(eo)} dB`,ticks:[...Rl],mute:S.strip.mute,solo:S.strip.solo,silent:S.silent,sendsHidden:jl(U(),ye),onChange:C=>t.set(S.id,{position:C}),onTypeIn:C=>{const F=Dl(C);F!==null&&t.set(S.id,{position:F})},onRemove:C=>n.onRemove(S.id,C),folded:Oe.has(S.id),onFold:C=>{Oe=Ku(ve(),S.id,C),re.render()},foldHelp:ee["strip:fold"],foldedHelp:ee["strip:folded"],onMove:C=>fe(S.id,C,"[data-nc-strip-grip]"),shade:S.strip.shade,onShade:C=>t.set(S.id,{shade:C??0}),...S.fx?{hacks:d===S.id,hacksLabel:Yl,hacksEmpty:S.fx.getChain().length===0,onHacks:()=>c(S.id)}:{},trim:{id:`trim-${S.id}`,value:S.strip.trim,min:zu,max:Ou,step:Ky,defaultValue:0,ariaLabel:`${S.name} trim`,help:ee["strip:trim"],onChange:C=>t.set(S.id,{trim:Bu(C)})},trimHidden:Qe(),pan:{id:`pan-${S.id}`,value:S.strip.pan,ariaLabel:`${S.name} pan`,help:ee["strip:pan"],onChange:C=>t.set(S.id,{pan:Math.abs(C)<.005?0:C})},onMute:()=>t.set(S.id,{mute:!S.strip.mute}),onSolo:()=>t.set(S.id,{solo:!S.strip.solo}),sends:["A","B"].map(C=>{const F=C==="A"?"sendA":"sendB",z=S.strip[F];return{id:`send-${C.toLowerCase()}-${S.id}`,label:C,ariaLabel:`${S.name} send ${C}`,min:0,max:Ye,step:Ba*2,value:z,valueText:Xl(z),defaultValue:0,onChange:D=>t.set(S.id,{[F]:D})}})})),hh=()=>({type:"strip",id:`strip-${bt}`,label:"Master",master:!0,sendsHidden:jl(U(),ye),trimRow:!0,trimHidden:Qe(),onSendsView:Se,sendsView:mr({hacksShown:d,sendsShown:ye}).kind==="sends",sendsViewEmpty:!fv(t.list().map(S=>S.strip)),sendsViewLabel:"Sends",sendsViewHelp:ee["sends:view"],...t.masterFx?{hacks:d===bt,hacksLabel:Yl,hacksEmpty:t.masterFx.getChain().length===0,onHacks:()=>c(bt)}:{},channels:2,value:t.masterPositionValue,valueText:Xa(t.masterPositionValue),step:Ba,defaultValue:Ye,resetText:"0.0 dB",ticks:[...Rl],onChange:S=>t.setMaster(S),onTypeIn:S=>{const C=Dl(S);C!==null&&t.setMaster(C)}});let ps=xu(ve());const hs=S=>({folded:ps[S],foldSlim:!0,onFold:C=>{ps=ku(ve(),S,C),re.render()},foldHelp:ee["fx:fold"]});let Fn=Nv(ve()),an=null,In=!0;const fs=S=>{Fn=S,In=!0,Fv(ve(),S),re.render()},ms=()=>{const S=t.returns.a,C=t.returns.b,F=d===bt&&t.masterFx?{id:bt,name:"Master",fx:t.masterFx}:(()=>{const G=t.list().find(zt=>zt.id===d);return G?.fx?{id:G.id,name:G.name,fx:G.fx}:null})();F||(d=null);const z=t.masterFx?.getChain()??[],D=[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:S.on,onToggle:G=>t.setReturn("a",{on:G}),meter:Yr(S.fx)??void 0,meterHelp:ee["fx:meter-return"],...hs("a"),controls:[Sa("a"),...s("a",S.fx,"plate",["decay","size"])],more:s("a",S.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:C.on,onToggle:G=>t.setReturn("b",{on:G}),meter:Yr(C.fx)??void 0,meterHelp:ee["fx:meter-return"],...hs("b"),controls:[Sa("b"),...s("b",C.fx,"delay",["delay_beats","feedback"])],more:s("b",C.fx,"delay",["tone","low_cut"])}],J=F?[...Dt(F.id,F.name,F.fx,F.id===bt?Ji:Zu)]:ye?D:[],te=F?.id??"sends",R=J.map(G=>G.id),me=tv(ne,te,R,be);return ne={key:te,ids:R,page:me},be=null,{id:"mix",title:"Mix",summary:`${t.list().map(G=>G.name).join(", ")||"No instruments"} · A Reverb · B Delay · Master ${z.filter(G=>!G.bypass).map(G=>G.name).join(", ")||"no inserts on"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[...ph(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(G=>({value:G.id,label:G.available===!1?`${G.name} (soon)`:G.name,disabled:G.available===!1})),onAdd:G=>n.onAdd(G)}]},{id:"fx",area:"fx",label:F?`${F.name} inserts`:"Send effects",pageSize:Cr,page:me,onPage:G=>{ne&&(ne={...ne,page:G})},controls:J},...Fn?[{id:"meters",area:"meters",label:"VU meters",controls:[]}]:[],{id:"master",area:"master",label:"Master",controls:[hh()]}]}},ue=g0(ms(),Vv),gs=()=>ue.el.toggleAttribute("data-hacks-folded",mr({hacksShown:d,sendsShown:ye}).kind==="none"&&l.matches);gs();const He=document.createElement("button");He.type="button",He.className="nc-page-action vu-add",He.dataset.vuAdd="",He.textContent="+ Meters",He.setAttribute("aria-label","Add VU meters"),He.setAttribute("data-nc-help",ee["vu:add"]),He.addEventListener("click",()=>{fs(!0),an?.el.querySelector("[data-vu-remove]")?.focus()}),ue.el.querySelector(".nc-module-end")?.prepend(He);const bs=()=>ue.el.toggleAttribute("data-sends-hidden",!ye);bs();const ys=()=>{He.hidden=Fn;const S=ue.el.querySelector('[data-nc-section="meters"]');!Fn||!S||(an??=qv({onRemove:()=>{fs(!1),He.focus()},folded:Iv(ve()),onFold:C=>{In=!0,Pv(ve(),C)}}),an.el.parentElement!==S&&S.append(an.el))};ys(),Jv(ue.el,n,fe),Xv(ue.el,t,n),Ql(ue.el),Jl(ue.el),b0(e,[ue],"adjacent");const vs=S=>({peak:Pl(S.peak),rms:Pl(S.rms),over:S.peak>=Uy}),re={module:ue,get hacksShown(){return d},showHacks:u,render(){ue.update(ms()),gs(),ys(),bs(),Ql(ue.el),Jl(ue.el)},frame(S){if(ue.el.dataset.ncOpen!=="true")return;for(const F of t.list())xl(ue.el,`strip-${F.id}`)?.update([vs(F.levels())],S);const C=t.masterLevels();if(xl(ue.el,`strip-${bt}`)?.update(C.map(vs),S),an&&Fn){const F=t.ctx.state==="running";F&&(In=!0),In&&(In=an.frame(F?[C[0].rms,C[1].rms]:null,S))}}};return re}const St=".nc-strip:not([data-nc-master])",Ja=e=>e?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null,Wv="[data-nc-strip-grip], .nc-strip-hd, .nc-strip-fold",Kv=6,Yv=400,_a=12;function Jl(e){for(const t of e.querySelectorAll(".nc-strip [data-nc-hacks]"))t.setAttribute("data-nc-help",t.closest("[data-nc-master]")?ee["inserts:master"]:ee["inserts:channel"]);for(const t of e.querySelectorAll(':is([data-nc-id="mix-a"], [data-nc-id="mix-b"]) .nc-ui-fx-hd .nc-ui-fx-name'))t.setAttribute("data-nc-help",ee["mix:sends"])}function Ql(e){for(const t of e.querySelectorAll(`${St} .nc-strip-hd > .nc-strip-name`))t.setAttribute("data-nc-help",ee["strip:name"]);for(const t of e.querySelectorAll(`${St} .nc-strip-hd`))t.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight")}function Xv(e,t,n){e.addEventListener("dblclick",a=>{const r=a.target instanceof Element?a.target.closest(".nc-strip-hd > .nc-strip-name"):null,i=r?.closest(St),s=Ja(i??null),l=r?.parentElement;if(!s||!l||!n.onRename||l.hasAttribute("data-renaming"))return;const d=t.list().find(f=>f.id===s)?.name??r.textContent??"",u=document.createElement("input");u.type="text",u.className="nc-strip-name-input",u.value=d,u.maxLength=mu,u.spellcheck=!1,u.autocomplete="off",u.setAttribute("aria-label",`Rename ${d}`),u.setAttribute("data-nc-help",ee["strip:rename"]),l.setAttribute("data-renaming",""),l.insertBefore(u,r),u.focus(),u.select();let c=!1;const p=f=>{if(c)return;c=!0;const b=u.value;u.remove(),l.removeAttribute("data-renaming"),f&&b!==d&&n.onRename?.(s,b)};u.addEventListener("keydown",f=>{f.key==="Enter"?(f.preventDefault(),p(!0)):f.key==="Escape"&&(f.preventDefault(),p(!1))}),u.addEventListener("blur",()=>p(!0)),u.addEventListener("click",f=>f.stopPropagation())})}function Jv(e,t,n){let a=null;const r=()=>{for(const c of e.querySelectorAll("[data-drop]"))c.removeAttribute("data-drop")},i=()=>{a&&(window.clearTimeout(a.timer),a.strip.removeAttribute("data-dragging"),e.removeAttribute("data-strip-drag"),r(),a=null)},s=c=>{c.active=!0,c.strip.setAttribute("data-dragging","true"),e.setAttribute("data-strip-drag",""),c.touch&&!c.grip&&navigator.vibrate?.(10)},l=()=>[...e.querySelectorAll(St)].map(c=>{const p=c.getBoundingClientRect();return{id:Ja(c)??"",left:p.left,width:p.width}}),d=(c,p)=>{const f=c.strip.parentElement;if(f&&f.scrollWidth>f.clientWidth){const w=f.getBoundingClientRect();p<w.left+_a*2?f.scrollLeft-=_a:p>w.right-_a*2&&(f.scrollLeft+=_a)}const b=wv(l(),p),m=b?ql(t.order(),c.id,b):null;c.mark=m?b:null,r(),c.mark&&e.querySelector(`${St}[data-nc-id="strip-${CSS.escape(c.mark.target)}"]`)?.setAttribute("data-drop",c.mark.side)},u=()=>{const c=p=>{p.stopPropagation(),p.preventDefault()};e.addEventListener("click",c,{capture:!0,once:!0}),window.setTimeout(()=>e.removeEventListener("click",c,{capture:!0}),0)};e.addEventListener("pointerdown",c=>{if(a||c.pointerType==="mouse"&&c.button!==0)return;const p=c.target instanceof Element?c.target:null;if(!p||p.closest("input, .nc-strip-remove, [data-nc-strip-hide], [data-renaming]"))return;const f=p.closest(Wv),b=f?.closest(St),m=Ja(b??null);if(!f||!b||!m)return;const w={id:m,strip:b,pointerId:c.pointerId,x0:c.clientX,y0:c.clientY,grip:f.matches("[data-nc-strip-grip]"),touch:c.pointerType!=="mouse",active:!1,timer:0,mark:null};a=w,w.touch&&!w.grip&&(w.timer=window.setTimeout(()=>{a===w&&!w.active&&s(w)},Yv)),w.grip&&!w.touch&&c.preventDefault()}),window.addEventListener("pointermove",c=>{const p=a;if(!(!p||c.pointerId!==p.pointerId)){if(!p.active){if(Math.hypot(c.clientX-p.x0,c.clientY-p.y0)<Kv)return;if(p.touch&&!p.grip)return i();s(p)}c.preventDefault(),d(p,c.clientX)}}),e.addEventListener("touchmove",c=>{a?.active&&c.preventDefault()},{passive:!1}),e.addEventListener("contextmenu",c=>{a?.touch&&c.preventDefault()}),window.addEventListener("pointerup",c=>{const p=a;if(!p||c.pointerId!==p.pointerId)return;const f=p.active?p.mark:null,b=p.active;if(i(),!b)return;u();const m=f?ql(t.order(),p.id,f):null;m&&t.onReorder?.(m.id,m.before)}),window.addEventListener("pointercancel",c=>{a&&c.pointerId===a.pointerId&&i()}),window.addEventListener("keydown",c=>{c.key==="Escape"&&a?.active&&i()}),e.addEventListener("keydown",c=>{if(!c.altKey||c.ctrlKey||c.metaKey||c.shiftKey||c.key!=="ArrowLeft"&&c.key!=="ArrowRight")return;const p=c.target instanceof Element?c.target:null,f=p?.closest(".nc-strip-hd, [data-nc-strip-hide], .nc-strip-fold");if(!p||!f||p.closest("input, [data-nc-strip-grip]"))return;const b=Ja(f.closest(St));if(!b)return;c.preventDefault();const m=f.matches("[data-nc-strip-hide]")?"[data-nc-strip-hide]":f.matches(".nc-strip-fold")?".nc-strip-fold":".nc-strip-hd :is(button, [tabindex])";n(b,c.key==="ArrowLeft"?-1:1,m)})}const Qv=1e-5,Zv=2e3,ew=500,na={parked:!1,quietSince:null};function tw(e,t,n,a){if(t)return na;if(e.parked)return e;if(!(n<Qv))return na;const r=e.quietSince??a;return{parked:a-r>=Zv,quietSince:r}}const Zl=e=>10**(e/20),tt=.012,mi=1024,ec=32768;class nw{ctx;bus;masterFx;master;limiter;masterMeter;masterMeters;insertMeters;returns;park={a:na,b:na};parkMeters;parkScratch=new Float32Array(ec);masterPosition=Ye;channels=[];listeners=new Set;scratch=new Float32Array(mi);restore;channelFx;applyQueued=!1;constructor(t,n={}){this.ctx=t,this.restore=n.restore,this.channelFx=n.channelFx;const a=()=>new AnalyserNode(t,{fftSize:mi});this.bus=new GainNode(t,{gain:1}),this.master=new GainNode(t,{gain:wt(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(t,Fu),this.masterMeter=a(),this.masterMeters=[a(),a()],this.insertMeters={pre:a(),post:a()},this.masterFx=n.masterFx?.()??null,this.bus.connect(this.insertMeters.pre),this.masterFx?(this.bus.connect(this.masterFx.input),this.masterFx.output.connect(this.master),this.masterFx.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(t.destination);const r=new ChannelSplitterNode(t,{numberOfOutputs:2});this.limiter.connect(r),r.connect(this.masterMeters[0],0),r.connect(this.masterMeters[1],1);const i=l=>{const d=new GainNode(t,{gain:1}),u=n.fx?.(l)??null,c=new GainNode(t,{gain:wt(Ye)}),p=a();return u?(d.connect(u.input),u.output.connect(c)):c.gain.value=0,c.connect(p),c.connect(this.bus),{bus:d,fx:u,gain:c,meter:p,on:u!==null,level:Ye}};this.returns={a:i("a"),b:i("b")};const s=l=>{const d=new AnalyserNode(t,{fftSize:ec});return this.returns[l].gain.connect(d),d};this.parkMeters={a:s("a"),b:s("b")}}attach(t,n){let a=this.channels.find(r=>r.id===t);if(a)a.input.disconnect(),a.input=new GainNode(this.ctx,{gain:1}),a.input.connect(a.trim);else{const r=new GainNode(this.ctx,{gain:1}),i=this.restore?.(t)??Du,s=new GainNode(this.ctx,{gain:Zl(i.trim)});r.connect(s);const l=new GainNode(this.ctx,{gain:0}),d=new AnalyserNode(this.ctx,{fftSize:mi}),u=new GainNode(this.ctx,{gain:0}),c=new GainNode(this.ctx,{gain:0}),p=this.channelFx?.(t)??null;p?(s.connect(p.input),p.output.connect(l)):s.connect(l);const f=new GainNode(this.ctx,{gain:1,channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),b=new ChannelSplitterNode(this.ctx,{numberOfOutputs:2}),m=new GainNode(this.ctx,{gain:1}),w=new GainNode(this.ctx,{gain:1}),h=new ChannelMergerNode(this.ctx,{numberOfInputs:2});l.connect(d),l.connect(f).connect(b),b.connect(m,0).connect(h,0,0),b.connect(w,1).connect(h,0,1),h.connect(this.bus),h.connect(u).connect(this.returns.a.bus),h.connect(c).connect(this.returns.b.bus),a={id:t,name:n,input:r,trim:s,fader:l,stereo:f,split:b,balL:m,balR:w,panner:h,meter:d,sendA:u,sendB:c,fx:p,strip:i},this.channels.push(a),this.queueApply()}return this.emit(),a.input}rename(t,n){const a=this.channels.find(r=>r.id===t);!a||a.name===n||(a.name=n,this.emit())}detach(t){const n=this.channels.findIndex(r=>r.id===t);if(n<0)return;const[a]=this.channels.splice(n,1);if(a){for(const r of[a.input,a.trim,a.fader,a.stereo,a.split,a.balL,a.balR,a.panner,a.meter,a.sendA,a.sendB])r.disconnect();a.fx?.output.disconnect(),a.fx?.dispose(),this.queueApply(),this.emit()}}tapNode(t){return t==="master"?this.limiter:this.channels.find(n=>n.id===t)?.panner??null}tapLatency(t,n){const a=i=>{const s=i?.latencySamples;return typeof s=="number"&&Number.isFinite(s)&&s>0?Math.round(s):0};if(t==="master")return Math.max(0,Math.round(n))+a(this.masterFx);const r=this.channels.find(i=>i.id===t);return r?a(r.fx):null}set(t,n){const a=this.channels.find(r=>r.id===t);a&&(a.strip={...a.strip,...n},this.queueApply(),this.emit())}setMaster(t){this.masterPosition=t,this.master.gain.setTargetAtTime(wt(t),this.ctx.currentTime,tt),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(t,n){const a=this.returns[t],r=this.ctx.currentTime;n.on!==void 0&&(a.on=n.on&&a.fx!==null,a.bus.gain.setTargetAtTime(a.on?1:0,r,tt),this.wakeFed()),n.level!==void 0&&(a.level=n.level,a.fx&&a.gain.gain.setTargetAtTime(wt(a.level),r,tt)),this.emit()}fed(t){const n=this.returns[t];if(!n.on||!n.fx)return!1;const a=t==="a"?"sendA":"sendB";return this.channels.some(r=>wt(r.strip[a])>0)}setParked(t,n){const a=this.returns[t];a.fx&&(n?(a.bus.disconnect(a.fx.input),a.fx.output.disconnect(a.gain),a.fx.clear()):(a.bus.connect(a.fx.input),a.fx.output.connect(a.gain)))}wakeFed(){for(const t of["a","b"])this.park[t].parked&&this.fed(t)&&(this.park[t]=na,this.setParked(t,!1))}parkIdleReturns(t=performance.now()){for(const n of["a","b"]){const a=this.park[n],r=tw(a,this.fed(n),a.parked?0:this.parkPeak(n),t);this.park[n]=r,r.parked!==a.parked&&this.setParked(n,r.parked)}}parkPeak(t){const n=this.parkScratch;this.parkMeters[t].getFloatTimeDomainData(n);let a=0;for(let r=0;r<n.length;r++)a=Math.max(a,Math.abs(n[r]??0));return a}returnParked(t){return this.park[t].parked}setTempo(t,n){for(const a of[this.returns.a.fx,this.returns.b.fx,this.masterFx])a?.setTempo(t,n);for(const a of this.channels)a.fx?.setTempo(t,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(t){return this.levelsOf(this.returns[t].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const t=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||t&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}queueApply(){this.applyQueued||(this.applyQueued=!0,queueMicrotask(()=>{this.applyQueued=!1,this.apply()}))}apply(){const t=Hy(this.channels.map(a=>a.strip)),n=this.ctx.currentTime;this.channels.forEach((a,r)=>{a.fader.gain.setTargetAtTime(t[r]??0,n,tt),a.trim.gain.setTargetAtTime(Zl(a.strip.trim),n,tt),a.sendA.gain.setTargetAtTime(wt(a.strip.sendA),n,tt),a.sendB.gain.setTargetAtTime(wt(a.strip.sendB),n,tt);const[i,s]=Wy(a.strip.pan);a.balL.gain.setTargetAtTime(i,n,tt),a.balR.gain.setTargetAtTime(s,n,tt)}),this.wakeFed()}levelsOf(t){return t.getFloatTimeDomainData(this.scratch),Gy(this.scratch)}emit(){for(const t of this.listeners)t()}}const aw=["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"],jn=(e,t)=>t.map(([n,a,r,i])=>({id:n,name:a,intervals:r,category:e,symbol:i})),ep=[...jn("Essential",[["major","Major",[0,4,7],""],["minor","Minor",[0,3,7],"m"],["diminished","Diminished",[0,3,6],"dim"],["augmented","Augmented",[0,4,8],"aug"],["sus2","Sus2",[0,2,7],"sus2"],["sus4","Sus4",[0,5,7],"sus4"],["power","Power Chord",[0,7,12],"5"],["major-6","Major 6",[0,4,7,9],"6"],["minor-6","Minor 6",[0,3,7,9],"m6"]]),...jn("Seventh",[["major-7","Major 7",[0,4,7,11],"maj7"],["minor-7","Minor 7",[0,3,7,10],"m7"],["dominant-7","Dominant 7",[0,4,7,10],"7"],["minor-major-7","Minor-Major 7",[0,3,7,11],"m(maj7)"],["half-diminished-7","Half-Diminished 7",[0,3,6,10],"m7b5"],["diminished-7","Diminished 7",[0,3,6,9],"dim7"],["augmented-major-7","Augmented Major 7",[0,4,8,11],"aug(maj7)"],["augmented-7","Augmented 7",[0,4,8,10],"aug7"],["7sus4","7sus4",[0,5,7,10],"7sus4"]]),...jn("Extended",[["add9","Add9",[0,4,7,14],"add9"],["minor-add9","Minor Add9",[0,3,7,14],"m(add9)"],["major-9","Major 9",[0,4,7,11,14],"maj9"],["minor-9","Minor 9",[0,3,7,10,14],"m9"],["dominant-9","Dominant 9",[0,4,7,10,14],"9"],["6-9","6/9",[0,4,7,9,14],"6/9"],["minor-6-9","Minor 6/9",[0,3,7,9,14],"m6/9"],["major-7-sharp11","Major 7#11",[0,4,7,11,18],"maj7#11"],["minor-11","Minor 11",[0,3,7,10,14,17],"m11"],["dominant-11","Dominant 11",[0,4,7,10,14,17],"11"],["9sus4","9sus4",[0,5,7,10,14],"9sus4"],["major-13","Major 13",[0,4,7,11,14,21],"maj13"],["minor-13","Minor 13",[0,3,7,10,14,17,21],"m13"],["dominant-13","Dominant 13",[0,4,7,10,14,21],"13"]]),...jn("Altered",[["7b9","7b9",[0,4,7,10,13],"7b9"],["7-sharp9","7#9",[0,4,7,10,15],"7#9"],["7b5","7b5",[0,4,6,10],"7b5"],["7-sharp5","7#5",[0,4,8,10],"7#5"],["7b9-sharp5","7b9#5",[0,4,8,10,13],"7b9#5"],["7-sharp9-b5","7#9b5",[0,4,6,10,15],"7#9b5"],["7alt","7alt",[0,4,10,13,15,18,20],"7alt"],["major-7b5","Major 7b5",[0,4,6,11],"maj7b5"],["minor-7b9","Minor 7b9",[0,3,7,10,13],"m7b9"]]),...jn("Experimental",[["quartal-3","Quartal 3",[0,5,10]," Quartal 3"],["quartal-4","Quartal 4",[0,5,10,15]," Quartal 4"],["quartal-5","Quartal 5",[0,5,10,15,20]," Quartal 5"],["quintal-3","Quintal 3",[0,7,14]," Quintal 3"],["quintal-4","Quintal 4",[0,7,14,21]," Quintal 4"],["chromatic-cluster","Chromatic Cluster",[0,1,2]," Chromatic Cluster"],["whole-tone-cluster","Whole-Tone Cluster",[0,2,4,6]," Whole-Tone Cluster"],["minor-second-cluster","Minor-Second Cluster",[0,1,5,7]," Minor-Second Cluster"],["major-second-stack","Major-Second Stack",[0,2,4,7,9]," Major-Second Stack"],["lydian-stack","Lydian Stack",[0,2,4,6,7,11]," Lydian Stack"],["major-pentatonic","Major Pentatonic",[0,2,4,7,9]," Major Pentatonic"],["minor-pentatonic","Minor Pentatonic",[0,3,5,7,10]," Minor Pentatonic"],["in-sen","In-sen",[0,1,5,7,10]," In-sen"],["whole-tone","Whole-Tone Collection",[0,2,4,6,8,10]," Whole-Tone"]])],tp=new Map(ep.map(e=>[e.id,e])),gi={Major:"major",Minor:"minor",Diminished:"diminished",Augmented:"augmented",Sus2:"sus2",Sus4:"sus4","Major 7th":"major-7","Minor 7th":"minor-7","Dominant 7th":"dominant-7"};function rw(e){if(typeof e!="string")return"major";if(tp.has(e))return e;if(gi[e])return gi[e];const t=a=>a.trim().toLowerCase().replace(/[\s_-]+/g,""),n=t(e);return Object.entries(gi).find(([a])=>t(a)===n)?.[1]??ep.find(a=>t(a.name)===n||t(a.id)===n)?.id??"major"}function Uo(e){return tp.get(rw(e))}const no=(e,t,n)=>Math.max(t,Math.min(n,Math.round(Number.isFinite(e)?e:t)));function np(e){if(!e.length)return[];const t=Math.min(...e),n=Math.max(...e),a=Math.ceil(-t/12),r=Math.floor((127-n)/12);if(a>r)throw new RangeError("Voicing spans more than the supported MIDI range.");const i=Math.max(a,Math.min(r,0))*12;return e.map(s=>s+i)}function iw(e,t,n=0,a="compact"){const i=Uo(t).intervals.map(l=>no(e,0,127)+l);for(let l=0;l<no(n,0,i.length-1);l++){const d=i.shift(),u=i[i.length-1];i.push(d+Math.ceil((u-d+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[a]??0;return np(i.map((l,d)=>l+12*Math.floor(d*s/Math.max(1,i.length-1))))}function ow(e,t=1){return[...new Set(Array.from({length:no(t,1,4)},(n,a)=>e.map(r=>r+a*12)).flat().filter(n=>n>=0&&n<=127))]}function sw(e,t){const n=[...new Set(e)].sort((i,s)=>i-s),a=n.length;if(a<2)return n;const r=[...n,...n.slice(1,-1).reverse()];switch(t){case"down":return n.reverse();case"up-down":return r;case"down-up":return r.map(i=>n[a-1-n.indexOf(i)]);case"up-down-repeat":return[...n,...[...n].reverse()];case"as-played":return[...new Set(e)];case"outside-in":{const i=[];for(let s=0,l=a-1;s<=l;s++,l--)i.push(n[s]),s!==l&&i.push(n[l]);return i}case"inside-out":return n.map((i,s)=>({note:i,i:s})).sort((i,s)=>Math.abs(i.i-(a-1)/2)-Math.abs(s.i-(a-1)/2)||i.i-s.i).map(i=>i.note);case"pendulum":{const i=Math.floor((a-1)/2);return[...r.slice(i),...r.slice(0,i)]}case"blossom-up":case"blossom-down":{const i=Math.floor((a-1)/2),s=t==="blossom-up"?1:-1,l=[n[i]];for(let d=1;l.length<a;d++)for(const u of[i+s*d,i-s*d])u>=0&&u<a&&l.push(n[u]);return l}case"low-and-up":case"low-and-down":case"hi-and-up":case"hi-and-down":{const i=t.startsWith("low"),s=i?n[0]:n[a-1],l=i?n.slice(1):n.slice(0,-1);return t.endsWith("down")&&l.reverse(),l.flatMap(d=>[s,d])}default:return n}}const lw=16,ao={hits:5,steps:8,rotate:0};function ap(e){const t=(a,r)=>typeof a=="number"&&Number.isFinite(a)?Math.round(a):r,n=Math.max(1,Math.min(lw,t(e?.arpSteps,ao.steps)));return{steps:n,hits:Math.max(0,Math.min(n,t(e?.arpHits,ao.hits))),rotate:(t(e?.arpRotate,0)%n+n)%n}}function rp(e,t){return((Math.floor(t)+e.rotate)%e.steps+e.steps)%e.steps*e.hits%e.steps<e.hits}function cw(e,t){let n=Math.floor(t/e.steps)*e.hits;for(let a=t-t%e.steps;a<t;a++)rp(e,a)&&n++;return n}const dw=1592598566;function uw(e){let t=(Math.imul(e^dw,2654435761)^2246822507)>>>0;return t=Math.imul(t^t>>>16,2146121005),t=Math.imul(t^t>>>15,2221713035),((t^t>>>16)>>>0)/2**32}const tc=new Map;function pw(e,t){if(e<2)return 0;const n=Math.max(0,Math.floor(t));let a=tc.get(e);(!a||a.step>n)&&(a={step:0,pos:0});let{step:r,pos:i}=a;for(;r<n;r++){const s=uw(r+1);i=(i+(s<.5?1:s<.75?0:e-1))%e}return tc.set(e,{step:r,pos:i}),i}function hw(e,t,n,a=ao,r=Math.random){if(t<1)return null;const i=s=>(Math.floor(s)%t+t)%t;if(e==="random")return Math.min(t-1,Math.max(0,Math.floor(r()*t)));if(e==="walk")return pw(t,n);if(e==="euclidean"){const s=ap({arpHits:a.hits,arpSteps:a.steps,arpRotate:a.rotate}),l=Math.max(0,Math.floor(n));return rp(s,l)?i(cw(s,l)):null}return i(n)}const Go=[{id:"off",num:0,name:"Off — chord",description:"No arp: the chord plays together"},{id:"up",num:1,name:"Up",description:"Low to high, then again"},{id:"down",num:2,name:"Down",description:"High to low, then again"},{id:"up-down",num:3,name:"Up/Down",description:"Up then down, ends not repeated"},{id:"up-down-repeat",num:4,name:"Up/Down Repeat",description:"Up then down, ends repeated"},{id:"random",num:5,name:"Random",description:"Any note each step"},{id:"as-played",num:6,name:"As Played",description:"The order the keys were pressed"},{id:"outside-in",num:7,name:"Outside-In",description:"Lowest, highest, then inward"},{id:"inside-out",num:8,name:"Inside-Out",description:"From the middle outward, lower first"},{id:"pendulum",num:9,name:"Pendulum",description:"From the lower middle, swing between the ends"},{id:"blossom-up",num:10,name:"Blossom Up",description:"From center, spiral up"},{id:"blossom-down",num:11,name:"Blossom Down",description:"From center, spiral down"},{id:"low-and-up",num:12,name:"Low&Up",description:"Low pedal, others ascending"},{id:"low-and-down",num:13,name:"Low&Down",description:"Low pedal, others descending"},{id:"hi-and-up",num:14,name:"Hi&Up",description:"High pedal, others ascending"},{id:"hi-and-down",num:15,name:"Hi&Down",description:"High pedal, others descending"},{id:"walk",num:16,name:"Walk",description:"Next 50%, repeat 25%, back 25%"},{id:"euclidean",num:17,name:"Euclidean",description:"Hits spread evenly over Steps, rests between"},{id:"down-up",num:18,name:"Down/Up (legacy)",description:"Down then up, ends not repeated",legacy:!0}];new Set(Go.map(e=>e.id));new Map(Go.map(e=>[e.num,e.id]));Go.map(e=>({value:e.id,label:e.name}));const ip=[{id:"block",label:"Block",kind:"repeat"},{id:"walk-up",label:"Inversion walk · up",kind:"repeat"},{id:"walk-down",label:"Inversion walk · down",kind:"repeat"},{id:"walk-up-down",label:"Inversion walk · up-down",kind:"repeat"},{id:"walk-random",label:"Inversion walk · random",kind:"repeat"},{id:"oom-pah",label:"Oom-pah",kind:"bar"},{id:"alberti",label:"Alberti",kind:"repeat"},{id:"pulse",label:"Pulse + accents",kind:"repeat"},{id:"charleston",label:"Charleston",kind:"bar"},{id:"skank",label:"Skank",kind:"bar"},{id:"house",label:"House stab",kind:"bar"},{id:"montuno",label:"Montuno",kind:"bar"},{id:"push",label:"Push",kind:"bar"},{id:"strum",label:"Strum",kind:"bar"},{id:"drift",label:"Voicing drift",kind:"repeat"}];ip.map(e=>e.id);const nc=e=>ip.find(t=>t.id===e)?.kind??"repeat",fw=15,mw=40,Ne=e=>[...e].sort((t,n)=>t-n);function op(e,t){const n=Ne(e);for(let a=0;a<t;a++){const r=n.shift(),i=n[n.length-1]??r;n.push(r+Math.ceil((i-r+1)/12)*12)}return n}const ja=e=>op(e,1);function gw(e,t){const n=e[0];return n-((n-t)%12+12)%12}function bw(e,t){const n=Ne(e);if(n.length<3)return n;switch((t%4+4)%4){case 1:return Ne([n[0],...n.slice(2),n[1]+12]);case 2:return Ne([n[0],...n.slice(3),n[1]+12,n[2]+12]);case 3:return Ne([n[0]-12,n[2],n[1]+12,...n.slice(3).map(r=>r+12)]);default:return n}}function yw(e,t,n,a=Math.random){const r=Math.max(1,Math.min(t,3)),i=Math.max(0,Math.floor(n));switch(e){case"walk-down":return(r-i%r)%r;case"walk-up-down":{if(r<2)return 0;const s=2*r-2,l=i%s;return l<r?l:s-l}case"walk-random":return Math.min(r-1,Math.floor(a()*r));default:return i%r}}function vw(e,t,n,a,r=Math.random){const i=Ne(t);if(!i.length)return{notes:[],velocity:1};switch(e){case"block":return{notes:i,velocity:1};case"walk-up":case"walk-down":case"walk-up-down":case"walk-random":return{notes:op(i,yw(e,i.length,n,r)),velocity:.9};case"alberti":return{notes:[[i[0],i[2]??i[i.length-1],i[1]??i[0],i[2]??i[i.length-1]][(Math.floor(n)%4+4)%4]],velocity:.85};case"pulse":{const s=Math.abs(a/2-Math.round(a/2))<1e-6;return{notes:i,velocity:s?1:.45}}case"drift":return{notes:bw(i,n),velocity:.9};default:return null}}function ww(e,t,n,a,r=t){const i=Ne(t);if(!i.length)return[];const s=(d,u,c,p)=>d.map(f=>({step:f,len:u,notes:c,velocity:p})),l=gw(i,n);switch(e){case"oom-pah":return[...s([0],3,[l-12],1),...s([4],2,ja(i),.75),...s([8],3,[l-12],1),...s([12],2,ja(i),.75)];case"charleston":return s([0,6],2,i,.9);case"skank":return s([4,12],1,ja(i),.9);case"house":return s([2,6,10,14],1,ja(i),.9);case"montuno":{const d=l+(a[1]??4),u=l+(a[2]??7),c=a[3]!==void 0&&a[3]<12?l+a[3]:l+12,p=[l,l+12],f=[d,u];return[[0,p],[3,f],[5,p],[6,f],[8,[u,c]],[10,p],[13,f],[14,[u,l+12]]].map(([b,m])=>({step:b,len:1,notes:Ne(m),velocity:.85}))}case"push":return[...s([0],6,i,.9),...s([6],2,i,.9),{step:14,len:2,notes:Ne(r),velocity:.9,next:!0}];case"strum":{const d=[...i,i[0]+12];return[{step:0,len:3.5,notes:d,velocity:.95,strum:"down"},{step:8,len:3.5,notes:d,velocity:.75,strum:"up"}]}default:return[]}}function xw(e,t,n){const a=n==="down"?Ne(e):Ne(e).reverse(),r=Math.max(0,Math.min(mw,t))/1e3;return a.map((i,s)=>({midi:i,offset:s*r}))}const ac=e=>Math.abs(e-Math.round(e))<1e-6?"down":"up";function kw(e){const t=new Set(e.map(i=>(i%12+12)%12)),n=i=>t.has(i);let a;const r=n(3)&&!n(4);return r&&n(6)&&n(9)?a=[14]:r&&n(6)?a=[17]:n(4)&&n(8)&&!n(7)?a=[14]:n(4)&&n(10)?a=[14,21]:n(4)?a=[14,18,21]:n(3)?a=[14,17]:n(5)||n(2)?a=[14,21]:a=[14],a.filter(i=>!n(i%12))}function $w(e,t,n,a=Math.random){const r=kw(n);if(!r.length||!e.length)return null;const i=(t+r[Math.min(r.length-1,Math.floor(a()*r.length))])%12,s=Math.max(...e),l=s+1+((i-(s+1))%12+12)%12;return l<=127?l:null}function ro(e,t,n=0,a="compact"){const r=t.map(l=>Math.max(0,Math.min(127,Math.round(e)))+l),i=Math.max(0,Math.min(r.length-1,Math.round(n)||0));for(let l=0;l<i;l++){const d=r.shift(),u=r[r.length-1];r.push(d+Math.ceil((u-d+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[a]??0;return np(r.map((l,d)=>l+12*Math.floor(d*s/Math.max(1,r.length-1))))}function Sw(e,t){const n=Ne(e),a=Ne(t);if(n.length===a.length)return n.reduce((i,s,l)=>i+Math.abs(s-a[l]),0);const r=(i,s)=>Math.min(...s.map(l=>Math.abs(l-i)));return n.reduce((i,s)=>i+r(s,a),0)+a.reduce((i,s)=>i+r(s,n),0)}function Ew(e,t,n,a,r,i="compact",s){const l=ro(t,n,s??r,i);if(!e||!e.length)return l;let d=l,u=1/0,c=1/0;const p=s!==void 0?[s]:n.map((f,b)=>b);for(const f of p)for(const b of[-24,-12,0,12]){const m=ro(t,n,f,i).map(g=>g+b);if(m[0]<a-7||m[0]>a+12||m[0]<0||m[m.length-1]>127)continue;const w=Sw(m,e),h=Math.abs(m.reduce((g,x)=>g+x,0)/m.length-e.reduce((g,x)=>g+x,0)/e.length);(w<u-1e-9||Math.abs(w-u)<1e-9&&h<c-1e-9)&&(d=m,u=w,c=h)}return d}const Aw={"Pop / Rock":"Pop",Blues:"Blues",Jazz:"Jazz","Soul / R&B / Neo-soul":"Soul",Gospel:"Gospel","EDM / House / Trance":"EDM","Cinematic / Ambient":"Cinematic","Latin / Flamenco":"Latin","Lo-fi / Chill":"Lo-fi",Modal:"Modal"},M=(e,t,n,a=1,r={})=>({degree:e,chord:t,numeral:n,bars:a,...r}),j="major",Ee="minor",q="dominant-7",Z="minor-7",Me="major-7",bi="half-diminished-7",yi="diminished-7",W=(e,t,n,a,r,i)=>({id:e,group:t,name:n,level:a,tonality:r,chords:i,short:Aw[t]}),rc=e=>[M(0,q,"I7"),M(e==="IV7"?5:0,q,e),M(0,q,"I7"),M(0,q,"I7"),M(5,q,"IV7"),M(5,q,"IV7"),M(0,q,"I7"),M(0,q,"I7"),M(7,q,"V7"),M(5,q,"IV7"),M(0,q,"I7"),M(7,q,"V7")],sp=[W("pop-1-5-6-4","Pop / Rock","I–V–vi–IV",1,"major",[M(0,j,"I"),M(7,j,"V"),M(9,Ee,"vi"),M(5,j,"IV")]),W("pop-6-4-1-5","Pop / Rock","vi–IV–I–V",1,"major",[M(9,Ee,"vi"),M(5,j,"IV"),M(0,j,"I"),M(7,j,"V")]),W("pop-50s","Pop / Rock","I–vi–IV–V · 50s",1,"major",[M(0,j,"I"),M(9,Ee,"vi"),M(5,j,"IV"),M(7,j,"V")]),W("rock-1-b7-4","Pop / Rock","I–♭VII–IV",2,"mixolydian",[M(0,j,"I"),M(10,j,"♭VII"),M(5,j,"IV",2)]),W("pop-canon","Pop / Rock","Canon · 8 chords",2,"major",[M(0,j,"I",.5),M(7,j,"V",.5),M(9,Ee,"vi",.5),M(4,Ee,"iii",.5),M(5,j,"IV",.5),M(0,j,"I",.5),M(5,j,"IV",.5),M(7,j,"V",.5)]),W("blues-12","Blues","12-bar",1,"blues",rc("I7")),W("blues-12-quick","Blues","12-bar quick change",2,"blues",rc("IV7")),W("blues-minor","Blues","Minor blues",2,"minor",[M(0,Z,"i7"),M(0,Z,"i7"),M(0,Z,"i7"),M(0,Z,"i7"),M(5,Z,"iv7"),M(5,Z,"iv7"),M(0,Z,"i7"),M(0,Z,"i7"),M(8,q,"♭VI7"),M(7,q,"V7"),M(0,Z,"i7"),M(7,q,"V7")]),W("blues-jazz","Blues","Jazz blues",3,"blues",[M(0,q,"I7"),M(5,q,"IV7"),M(0,q,"I7"),M(7,Z,"v7",.5),M(0,q,"I7",.5),M(5,q,"IV7"),M(6,yi,"♯iv°7"),M(0,q,"I7"),M(9,q,"VI7"),M(2,Z,"ii7"),M(7,q,"V7"),M(0,q,"I7",.5),M(9,q,"VI7",.5),M(2,Z,"ii7",.5),M(7,q,"V7",.5)]),W("jazz-2-5-1","Jazz","ii–V–I",1,"major",[M(2,Z,"ii7"),M(7,q,"V7"),M(0,Me,"Imaj7",2)]),W("jazz-2-5-1-minor","Jazz","ii–V–i minor",2,"minor",[M(2,bi,"iiø7"),M(7,"7b9","V7♭9"),M(0,"minor-6","i6",2)]),W("jazz-rhythm","Jazz","I–vi–ii–V · rhythm changes",2,"major",[M(0,Me,"Imaj7",.5),M(9,Z,"vi7",.5),M(2,Z,"ii7",.5),M(7,q,"V7",.5)]),W("jazz-turnaround","Jazz","iii–VI–ii–V turnaround",2,"major",[M(4,Z,"iii7",.5),M(9,q,"VI7",.5),M(2,Z,"ii7",.5),M(7,q,"V7",.5)]),W("jazz-autumn","Jazz","Autumn cycle",3,"minor",[M(5,Z,"iv7"),M(10,q,"♭VII7"),M(3,Me,"♭IIImaj7"),M(8,Me,"♭VImaj7"),M(2,bi,"iiø7"),M(7,"7b9","V7♭9"),M(0,Z,"i7",2)]),W("jazz-giant-steps","Jazz","Giant Steps cycle",3,"major",[M(0,Me,"Imaj7",.5),M(3,q,"♭III7",.5),M(8,Me,"♭VImaj7",.5),M(11,q,"VII7",.5),M(4,Me,"IIImaj7"),M(10,Z,"♭vii7",.5),M(3,q,"♭III7",.5),M(8,Me,"♭VImaj7",.5),M(11,q,"VII7",.5),M(4,Me,"IIImaj7",.5),M(7,q,"V7",.5),M(0,Me,"Imaj7"),M(6,Z,"♯iv7",.5),M(11,q,"VII7",.5)]),W("soul-dorian-vamp","Soul / R&B / Neo-soul","Dorian vamp i7–IV7",1,"dorian",[M(0,Z,"i7"),M(5,q,"IV7")]),W("soul-4-3-2-1","Soul / R&B / Neo-soul","IVmaj7–iii7–ii7–Imaj7",2,"major",[M(5,Me,"IVmaj7"),M(4,Z,"iii7"),M(2,Z,"ii7"),M(0,Me,"Imaj7")]),W("soul-two-of-us","Soul / R&B / Neo-soul","Just the Two of Us",3,"major",[M(5,Me,"IVmaj7"),M(4,q,"III7"),M(9,Z,"vi7"),M(7,Z,"v7",.5),M(0,q,"I7",.5)]),W("soul-2-5-1-ext","Soul / R&B / Neo-soul","ii9–V13sus–Imaj9",3,"major",[M(2,"minor-9","ii9"),M(7,"9sus4","V13sus",1,{intervals:[0,5,7,10,14,21],symbol:"13sus4"}),M(0,"major-9","Imaj9",2)]),W("gospel-1-4-1-dim","Gospel","1–4–1 passing dim",2,"major",[M(0,j,"I"),M(5,j,"IV",.5),M(6,yi,"♯iv°7",.5)]),W("gospel-7-3-6","Gospel","7–3–6",3,"major",[M(11,bi,"viiø7"),M(4,q,"III7"),M(9,Z,"vi7",2)]),W("gospel-1-17-4-dim","Gospel","I–I7–IV–♯iv°–I/V",3,"major",[M(0,j,"I",.5),M(0,q,"I7",.5),M(5,j,"IV",.5),M(6,yi,"♯iv°7",.5),M(0,j,"I/V",2,{inversion:2})]),W("edm-epic","EDM / House / Trance","i–VI–III–VII · epic",1,"minor",[M(0,Ee,"i"),M(8,j,"VI"),M(3,j,"III"),M(10,j,"VII")]),W("edm-1-7-6-7","EDM / House / Trance","i–VII–VI–VII",1,"minor",[M(0,Ee,"i"),M(10,j,"VII"),M(8,j,"VI"),M(10,j,"VII")]),W("house-organ","EDM / House / Trance","House organ i7–iv7",1,"minor",[M(0,Z,"i7"),M(5,Z,"iv7")]),W("trance-1-6-7-5","EDM / House / Trance","Trance i–VI–VII–v",2,"minor",[M(0,Ee,"i"),M(8,j,"VI"),M(10,j,"VII"),M(7,Ee,"v")]),W("cine-minor-plagal","Cinematic / Ambient","Minor plagal iv–i",1,"minor",[M(5,Ee,"iv"),M(0,Ee,"i")]),W("cine-hero","Cinematic / Ambient","Hero I–♭VI–♭VII–I",2,"major",[M(0,j,"I"),M(8,j,"♭VI"),M(10,j,"♭VII"),M(0,j,"I")]),W("cine-mediant","Cinematic / Ambient","Mediant I–III",2,"major",[M(0,j,"I"),M(4,j,"III")]),W("cine-lydian","Cinematic / Ambient","Lydian I–II",2,"lydian",[M(0,j,"I"),M(2,j,"II")]),W("latin-andalusian","Latin / Flamenco","Andalusian i–♭VII–♭VI–V",1,"minor",[M(0,Ee,"i"),M(10,j,"♭VII"),M(8,j,"♭VI"),M(7,j,"V")]),W("latin-montuno","Latin / Flamenco","Montuno i–iv–V7",1,"minor",[M(0,Ee,"i"),M(5,Ee,"iv"),M(7,q,"V7",2)]),W("latin-bossa","Latin / Flamenco","Bossa Imaj7–II7–ii7–V7",2,"major",[M(0,Me,"Imaj7",2),M(2,q,"II7",2),M(2,Z,"ii7"),M(7,q,"V7")]),W("lofi-2-5-1-6","Lo-fi / Chill","ii9–V9–Imaj9–vi9",2,"major",[M(2,"minor-9","ii9"),M(7,"dominant-9","V9"),M(0,"major-9","Imaj9"),M(9,"minor-9","vi9")]),W("lofi-4-3-6","Lo-fi / Chill","IVmaj7–iii7–vi7",2,"major",[M(5,Me,"IVmaj7"),M(4,Z,"iii7"),M(9,Z,"vi7",2)]),W("modal-dorian","Modal","Dorian i–IV",1,"dorian",[M(0,Ee,"i"),M(5,j,"IV")]),W("modal-mixolydian","Modal","Mixolydian I–♭VII",1,"mixolydian",[M(0,j,"I"),M(10,j,"♭VII")]),W("modal-phrygian","Modal","Phrygian i–♭II",1,"phrygian",[M(0,Ee,"i"),M(1,j,"♭II")])];sp.map(e=>e.id);const Mw=e=>sp.find(t=>t.id===e)??null;function vi(e,t,n,a=0){const r=Mw(e);if(!r)return null;const i=(n+1)*12+t;return r.chords.map((s,l)=>{const d=Uo(s.chord),u=s.intervals??d.intervals,c=(t+s.degree)%12;return{index:l,root:i+s.degree,rootPc:c,chord:d.id,intervals:u,numeral:s.numeral,name:`${aw[c]}${s.symbol??d.symbol}`,bars:a>0?a:s.bars,...s.inversion!==void 0?{inversion:s.inversion}:{}}})}const Tw=e=>e.reduce((t,n)=>t+n.bars,0),Lw=(e,t)=>e.slice(0,t).reduce((n,a)=>n+a.bars,0);function ic(e,t){const n=Tw(e),a=(t%n+n)%n;let r=0;for(let i=0;i<e.length;i++){if(a<r+e[i].bars-1e-9)return{chord:e[i],index:i,position:a,total:n};r+=e[i].bars}return{chord:e[e.length-1],index:e.length-1,position:a,total:n}}const Cw=16,Nw=()=>Array.from({length:Cw},()=>null),Fw=["off","single","chord","random"],Iw=e=>Fw.includes(e),Pw={mode:"single",note:0,octave:3,octaveRange:2,chord:"minor-7",inversion:0,interval:4,gate:75,arp:"off",arpOctaves:1,arpSpread:"compact",arpHits:5,arpSteps:8,arpRotate:0,chordStyle:"block",voiceLeading:"fixed",strum:0,tension:0,chordProgression:"off",progressionBars:0,favoriteChords:[],chordPads:Nw(),chordPadMode:"pad"};function oc(e,t,n=Math.random){if(e.mode==="off")return[];const a=Math.min(127,Math.max(0,(e.octave+1)*12+e.note));if(e.mode==="single")return[a];if(e.mode==="random"){const d=Math.min(127,(e.octave+1)*12),u=Math.min(127,d+e.octaveRange*12-1);return[d+Math.floor(n()*(u-d+1))]}const r=iw(a,e.chord,e.inversion,e.arpSpread);if(e.arp==="off")return r;const i=ow(r,e.arpOctaves),s=sw(i,e.arp),l=hw(e.arp,s.length,t,ap(e),n);return l===null?[]:[s[l]]}function sc(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function Rw(e,t,{octave:n}={}){if(t==="chord")return e.map(i=>({...i,role:"chord"}));const a=new Map;for(const i of e)a.set(i.hit,[...a.get(i.hit)??[],i]);const r=[];for(const i of a.values()){const s=i[0],l=Math.max(...i.map(d=>d.velocity));if(t==="top"){const d=i.reduce((u,c)=>c.note>u.note?c:u);r.push({...d,role:"top",offsetSec:0,velocity:l})}else{const d=n===void 0?s.root:Math.min(127,Math.max(0,(n+1)*12+(s.root%12+12)%12));r.push({...s,note:d,role:"root",offsetSec:0,velocity:l})}}return r}function Dw(e,t){return t.direction&&t.strumMs>0&&e.length>1?xw(e,t.strumMs,t.direction):e.map(n=>({midi:n,offset:0}))}function zw(e,t=0){return Dw(e.notes,e).map(({midi:n,offset:a})=>({note:n,velocity:e.velocity,startBeat:e.beat,lengthBeats:e.spanBeats*e.gate,role:e.role,offsetSec:a,spanBeats:e.spanBeats,gate:e.gate,hit:t,root:e.root}))}const lc=(e,t,n)=>Math.min(n,Math.max(t,e)),Ow=1e-9;function Bw(e,t){return t>0?Math.ceil(e/t-Ow)*t:e}const cc=(e,t)=>({from:e,origin:t,jump:null,last:null,lastKey:"",pushedTo:-1,bar:{bar:NaN,settings:null,hits:[]}});class Wo{step=0;grid={origin:0,index:0,interval:16};comp=cc(0,0);read;random;chordRandom;bpb;serial=0;constructor(t,n={}){this.read=typeof t=="function"?t:()=>t,this.random=n.random??Math.random,this.chordRandom=n.chordRandom??Math.random,this.bpb=n.beatsPerBar??(()=>4)}get settings(){return this.read()}beatsPerBar(){return Math.max(1,this.bpb())}beatInBar(t){const n=this.beatsPerBar();return(t%n+n)%n}start(t,{join:n=!1}={}){const a=this.settings.interval,r=4/a,i=n?Bw(t,r):t;this.grid={origin:i,index:0,interval:a},this.step=Math.max(0,Math.round(i/r));const s=this.beatsPerBar();return this.comp=cc(i,n?0:Math.floor(t/s+1e-9)*s),i}clone(t={}){const n=new Wo(t.settings??this.read,{random:t.random??this.random,chordRandom:t.chordRandom??this.chordRandom,beatsPerBar:t.beatsPerBar??this.bpb});n.step=this.step,n.grid={...this.grid},n.serial=this.serial;const a=this.comp;return n.comp={...a,jump:a.jump?{...a.jump}:null,last:a.last?[...a.last]:null,bar:{...a.bar}},n}resetGrid(){this.grid={origin:0,index:0,interval:this.settings.interval}}nextBeat(){return this.grid.origin+this.grid.index*4/this.grid.interval}stepBeats(){return 4/this.grid.interval}followInterval(){const t=this.settings.interval;t!==this.grid.interval&&(this.grid={origin:this.nextBeat(),index:0,interval:t})}skipTo(t){const n=Math.max(0,Math.ceil((t-this.nextBeat())/this.stepBeats()-1e-9));return this.grid.index+=n,this.step+=n,n}advance(){this.grid.index++}advanceStep(){this.step++}applyJump(t){const n=this.comp.jump;n&&t>=n.at-1e-9&&(this.comp.origin=n.origin,this.comp.jump=null)}plainChord(){const t=this.settings;return t.chordStyle==="block"&&t.chordProgression==="off"&&!(t.strum>0)&&!(t.tension>0)}barStyleActive(){const t=this.settings;return t.mode==="chord"&&t.arp==="off"&&!this.plainChord()&&nc(t.chordStyle)==="bar"}stepHit(t){const n=this.settings,a=this.stepBeats();if(n.mode==="chord"&&!this.plainChord()){if(n.arp!=="off"){const c=this.chordAt(t),p={...n,chord:c.chord,note:c.rootPc,octave:Math.floor(c.root/12)-1,...c.inversion!==void 0?{inversion:c.inversion}:{}},f=oc(p,this.step,this.random);return this.step++,f.length?this.hit(t,a,f,1,null,c,!1,"arp"):null}if(nc(n.chordStyle)==="bar")return this.step++,null;const l=this.chordAt(t),d=this.voicingFor(l),u=vw(n.chordStyle,d,this.step,this.beatInBar(t),this.chordRandom);return this.step++,!u||!u.notes.length?null:this.hit(t,a,u.notes,u.velocity,ac(this.beatInBar(t)),l,!0,"chord")}if(!Iw(n.mode))return this.step++,null;const r=oc(n,this.step,this.random);if(this.step++,!r.length)return null;const i=n.mode==="chord",s=i?Math.min(127,Math.max(0,(n.octave+1)*12+n.note)):r[0];return{beat:t,spanBeats:a,gate:lc(n.gate/100,.1,1),velocity:1,notes:r,kind:"plain",direction:null,strumMs:0,chord:i?this.plainChordAt():null,root:s,role:i?n.arp==="off"?"chord":"arp":"note"}}hit(t,n,a,r,i,s,l,d){const u=this.settings,c=[...a];if(l&&u.tension>0&&this.chordRandom()*100<u.tension){const f=$w(c,s.rootPc,s.intervals,this.chordRandom);f!==null&&c.push(f)}const p=u.chordStyle==="strum"&&i?u.strum>0?u.strum:fw:u.strum;return{beat:t,spanBeats:n,gate:lc(u.gate/100,.1,1),velocity:r,notes:c,kind:"comp",direction:i,strumMs:p,chord:s,root:s.root,role:d}}progressionOrigin(t){const n=this.comp.jump;return n&&t>=n.at-1e-9?n.origin:this.comp.origin}plainChordAt(){const t=this.settings,n=Uo(t.chord);return{index:0,root:(t.octave+1)*12+t.note,rootPc:t.note,chord:n.id,intervals:n.intervals,name:"",numeral:"",bars:1}}chordAt(t){const n=this.settings,a=vi(n.chordProgression,n.note,n.octave,n.progressionBars);return a?.length?ic(a,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar()).chord:this.plainChordAt()}voicingFor(t){const n=this.settings,a=t.inversion??Math.min(Math.max(0,n.inversion|0),t.intervals.length-1),r=`${t.root}|${t.intervals.join(",")}|${a}|${n.voiceLeading}|${n.arpSpread}`;if(this.comp.last&&r===this.comp.lastKey)return this.comp.last;const i=n.voiceLeading==="smooth"?Ew(this.comp.last,t.root,t.intervals,(n.octave+1)*12+n.note,a,n.arpSpread,t.inversion):ro(t.root,t.intervals,a,n.arpSpread);return this.comp.last=i,this.comp.lastKey=r,i}compBar(t){const n=this.comp.bar,a=this.settings;if(n.bar===t&&n.settings===a)return n.hits;const r=a,i=this.beatsPerBar(),s=r.chordStyle,l=this.chordAt(t*i),d=this.voicingFor(l);let u=d;if(s==="push"){const p=this.chordAt((t+1)*i);if(`${p.root}|${p.intervals.join(",")}`!=`${l.root}|${l.intervals.join(",")}`){const f={last:this.comp.last,key:this.comp.lastKey};u=this.voicingFor(p),this.comp.last=f.last,this.comp.lastKey=f.key}}let c=ww(s,d,l.rootPc,l.intervals,u).filter(p=>p.step/4<i-1e-9);return s==="push"&&this.comp.pushedTo===t&&(c=c.filter(p=>p.step!==0)),this.comp.bar={bar:t,settings:a,hits:c},c}barFrom(){return this.comp.from}catchUpBars(t){this.comp.from=t}syncBars(){this.comp.from=this.nextBeat()}barHits(t,n=()=>!1){const a=this.settings,r=this.beatsPerBar(),i=[];for(let s=0;s<128;s++){const l=Math.floor(this.comp.from/r+1e-9),u=this.compBar(l).find(b=>l*r+b.step/4>=this.comp.from-1e-9);if(!u){this.comp.from=(l+1)*r;continue}const c=l*r+u.step/4;if(!t(c))break;if(this.comp.from=c+1e-6,n())continue;const p=u.next&&a.chordStyle==="push"?u.len+6:u.len;u.next&&(this.comp.pushedTo=l+1);const f=this.chordAt(u.next?(l+1)*r:c);i.push(this.hit(c,p/4,u.notes,u.velocity,u.strum??ac(this.beatInBar(c)),f,!0,"chord"))}return i}chordPosition(t){const n=this.settings;if(n.mode!=="chord")return null;const a=vi(n.chordProgression,n.note,n.octave,n.progressionBars);if(!a?.length)return null;const r=ic(a,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar());return{index:r.index,bar:Math.floor(r.position+1e-9)+1,bars:r.total}}jumpToChord(t,n){const a=this.settings,r=vi(a.chordProgression,a.note,a.octave,a.progressionBars);if(!r?.length||t<0||t>=r.length)return!1;const i=this.beatsPerBar(),s=Math.max(n,this.nextBeat(),this.comp.from),l=Math.ceil(s/i-1e-9)*i;return this.comp.jump={at:l,origin:l-Lw(r,t)*i},!0}window(t,{muted:n=()=>!1}={}){const a=[];this.followInterval(),this.applyJump(this.nextBeat());for(let i=0;i<4096;i++){const s=this.nextBeat();if(!(s<t))break;if(n())this.advanceStep();else{const l=this.stepHit(s);l&&a.push(l)}this.advance()}this.barStyleActive()?a.push(...this.barHits(i=>i<t,n)):this.syncBars();const r=[];for(const i of a)r.push(...zw(i,++this.serial));return r.sort((i,s)=>i.startBeat-s.startBeat)}}const Nr=1,_w=8;function jw(e,t,n,a,r){return`${e}|${t}|${n}|${a}|${r}`}function dc(e,t,n,a,r={}){const i=new Map;return Rw(n,a,r).map(s=>{const l=i.get(s.hit)??0;return i.set(s.hit,l+1),{...s,id:jw(e,t,s.role,s.hit,l),source:e}})}const qw=(e,t)=>({v:Nr,kind:"notes",source:e,events:t}),qa=(e,t,n)=>({v:Nr,kind:"off",source:e,reason:t,...n===void 0?{}:{atBeat:n}}),Vw=e=>({v:Nr,kind:"routes",routes:e}),Hw=(e,t,n)=>({v:Nr,kind:"audition",source:e,events:t,holdSec:n}),yt=1e-9;function Uw(e={}){const t=new Map,n=new Map,a=new Set,r={sent:{notes:0,off:0,routes:0,audition:0},events:0,errors:0},i=()=>e.nowBeat?.()??null,s=new Set,l=()=>{for(const h of[...s])try{h()}catch{}},d=(h,g)=>{const x=n.get(h);if(x){r.sent[g.kind]++,g.kind==="notes"&&(r.events+=g.events.length);try{x(g)}catch{r.errors++}}},u=h=>{const g=[];for(const x of t.values()){const v=x.targets.get(h);v?.on&&g.push({source:x.handle.id,name:x.handle.name,role:v.role,...v.octave===void 0?{}:{octave:v.octave},...v.transpose?{transpose:v.transpose}:{}})}return g},c=h=>d(h,Vw(u(h))),p=(h,g,x)=>{const v=h.targets.get(g);if(!v?.on||!x.length)return;const A=uc(dc(h.handle.id,h.run,x,v.role,{...v.octave===void 0?{}:{octave:v.octave}}),v.transpose??0);A.length&&d(g,qw(h.handle.id,A))},f=(h,g)=>{const x=[...h.current,...h.kept.filter(A=>A.startBeat<g-yt)];if(!x.length)return[];let v=x[0];for(const A of x)A.startBeat>v.startBeat+yt&&(v=A);return x.filter(A=>A.hit===v.hit&&Math.abs(A.startBeat-v.startBeat)<=yt)},b=(h,g)=>{const x=i();if(x===null)return h.kept;const v=h.kept.filter(A=>A.startBeat>=x-yt);return a.has(g)?[...f(h,x),...v]:v},m=h=>{const g=i();g!==null&&h.kept.length&&h.kept[0].startBeat<g-yt&&(h.current=f(h,g),h.kept=h.kept.filter(x=>x.startBeat>=g-yt))};function w(h,g){const x=t.get(h);x&&x.handle.remove();const v={handle:void 0,run:1,kept:[],current:[],targets:new Map,status:null,takeBack:null},A=()=>t.get(h)===v,T={id:h,name:g,send(y){if(!A()||!y.length)return;m(v);const k=y.map(E=>({...E}));v.kept.push(...k);for(const E of v.targets.keys())p(v,E,k)},audition(y,k){if(!A()||!y.length||!(k>0))return;const E=Math.min(k,_w),$=y.map(_=>({..._})),L=()=>{if(A())for(const[_,V]of v.targets){if(!V.on||a.has(_))continue;const K=uc(dc(h,0,$,V.role,{...V.octave===void 0?{}:{octave:V.octave}}),V.transpose??0);K.length&&d(_,Hw(h,K,E))}};let N;try{N=e.startAudio?.()}catch{N=void 0}N?N.then(L,L):L()},restart(){A()&&(v.run++,v.kept=[],v.current=[])},off(y,k){if(A()){v.kept=k===void 0?[]:v.kept.filter(E=>E.startBeat<k-yt),(k===void 0||v.current.some(E=>E.startBeat>=k-yt))&&(v.current=[]);for(const[E,$]of v.targets)$.on&&d(E,qa(h,y??"stop",k))}},setTarget(y,k){if(!A()||typeof y!="string"||!y)return;const E=v.targets.get(y),$=Gw(k.transpose),L={role:k.role,on:k.on===!0,...k.octave===void 0?{}:{octave:k.octave},...$?{transpose:$}:{}};v.targets.set(y,L);const N=E&&(E.role!==L.role||E.octave!==L.octave||(E.transpose??0)!==(L.transpose??0))&&E.on;E?.on&&(!L.on||N)&&d(y,qa(h,"off")),(!E||E.on!==L.on||N)&&c(y),L.on&&(!E?.on||N)&&p(v,y,b(v,y)),(!E||E.on!==L.on)&&l()},removeTarget(y){const k=v.targets.get(y);!A()||!k||(v.targets.delete(y),k.on&&(d(y,qa(h,"removed")),c(y)))},targets:()=>[...v.targets].map(([y,k])=>({target:y,...k})),remove(){if(!A())return;const y=[...v.targets].filter(([,k])=>k.on).map(([k])=>k);for(const k of y)d(k,qa(h,"removed"));t.delete(h);for(const k of y)c(k);l()},status(y){if(!A())return;const k=y&&typeof y.now=="string"&&typeof y.next=="string"?{now:y.now.slice(0,32),next:y.next.slice(0,32)}:null;JSON.stringify(k)!==JSON.stringify(v.status)&&(v.status=k,l())},onTakeBack(y){A()&&(v.takeBack=typeof y=="function"?y:null)}};return v.handle=T,t.set(h,v),T}return{source:w,sources:()=>[...t.values()].map(h=>h.handle),host:h=>({notesIn(g,x){if(typeof g!="function")return()=>{};const v=x?.takes==="pitch",A=!n.has(h)||a.has(h)!==v;n.set(h,g),v?a.add(h):a.delete(h),A&&l(),c(h);for(const T of t.values())T.targets.get(h)?.on&&p(T,h,b(T,h));return()=>{n.get(h)===g&&(n.delete(h),a.delete(h),l())}},notesSource:g=>w(h,String(g).slice(0,64)),notesTakeBack(g){const x=t.get(g);if(!x?.takeBack||!x.targets.has(h))return null;try{const v=x.takeBack(h);return v==null?null:structuredClone(v)}catch{return null}}}),routesFor:u,listening:h=>n.has(h),takesPitch:h=>n.has(h)&&a.has(h),drop(h){n.delete(h),a.delete(h);for(const g of[...t.values()])g.handle.id===h?g.handle.remove():g.targets.delete(h);l()},statuses:()=>[...t.values()].filter(h=>h.status!==null).map(h=>({source:h.handle.id,name:h.handle.name,status:{...h.status}})),onChange(h){return s.add(h),()=>s.delete(h)},stats:()=>({sent:{...r.sent},events:r.events,errors:r.errors})}}function Gw(e){return typeof e=="number"&&Number.isFinite(e)?Math.max(-48,Math.min(48,Math.round(e))):0}function uc(e,t){if(!t)return e;const n=a=>Math.max(0,Math.min(127,a+t));return e.map(a=>({...a,note:n(a.note),root:n(a.root)}))}const Ww=.5,Kw=20;function Yw(e,t,n={}){const a=n.aheadSec??Ww,r=n.now??Be;let i={...Pw,...n.settings};const s=n.seed??1,l=()=>new Wo(()=>i,{random:sc(s),chordRandom:sc(s+1),beatsPerBar:()=>Math.max(1,t.transport.meter?.beatsPerBar??4)});let d=null,u=0,c=!1;const p=()=>{const h=t.transport;if(!d||!h.running)return;const g=d.window(h.beatAt(r()+a));g.length&&(u+=g.length,e.send(g))},f=(h,g)=>{d=l(),e.restart(),d.start(h,{join:g}),p()},b=t.onChange(h=>{if(!c){if(h.kind==="start")f(h.beat,!1);else if(h.kind==="stop")d=null,e.off("stop");else if(h.kind==="snapshot"){const g=t.transport;!g.running&&d?(d=null,e.off("stop")):g.running&&!d&&f(g.beatAt(Math.max(g.startTime??r(),r())),!0)}}}),m=(n.ticker??(h=>zh(h,{intervalMs:Kw})))(p);m.start();const w=t.transport;return w.running&&f(w.beatAt(Math.max(w.startTime??r(),r())),!0),{source:e,set(h){i={...i,...h}},settings:()=>i,sent:()=>u,remove(){c||(c=!0,b(),m.dispose(),e.remove())}}}const Ko="studio";function Xw(){let e=null;const t=new Set,n=new Set,a=new Set,r=new Map,i=u=>{try{return r.get(u)?.()===!0}catch{return!1}},s=u=>{for(const c of[...u])try{c()}catch{}},l=u=>{if(u!==e){e=u;for(const c of n)c()}},d=(u,c)=>(u.add(c),()=>{u.delete(c)});return{owner:()=>e,claim(u){e===null&&l(u)},claimAll(){l(Ko),s(t)},clear:()=>l(null),onAll:u=>d(t,u),member(u,c){return r.set(u,c),()=>{r.get(u)===c&&r.delete(u)}},out(u){for(const c of r.keys())if(c!==u&&i(c))return;s(a)},drop:u=>{r.delete(u)},onLastOut:u=>d(a,u),playing:()=>[...r.keys()].filter(i),onChange:u=>d(n,u)}}const pc="netcomposer.studio.plugins.frozen.v1",Jw=2e3;function Qw(e,t){const n=[],a=new Set;for(const r of t)r.plugin?.status!=="failed"||r.plugin.error!==tr[6]||(a.add(r.id),e.has(r.id)||n.push(r));for(const r of[...e])a.has(r)||e.delete(r);for(const r of a)e.add(r);return n}function Zw(e){const t=new Map;for(const n of e)for(const a of n)a.plugin?.status==="ready"&&!t.has(a.plugin.id)&&t.set(a.plugin.id,a.plugin.name);return[...t].map(([n,a])=>({id:n,name:a}))}function ex(e){let t=[];const n=()=>{if(!e)return t;try{const r=JSON.parse(e.getItem(pc)??"[]");return Array.isArray(r)?r.filter(i=>typeof i=="string"):[]}catch{return[]}},a=r=>{t=r;try{e?.setItem(pc,JSON.stringify(r))}catch{}};return{has:r=>n().includes(r),list:n,add(r){a([...new Set([...n(),...r])])},clear(r){const i=n();i.includes(r)&&a(i.filter(s=>s!==r))}}}function tx(e){let t=!1;const n=(e.watch??Ef)(e.ctx,{stallMs:e.stallMs??Jw,onStall:()=>{if(t)return;const a=e.running();a.length&&(t=!0,n.stop(),e.onFrozen(a))}});return{stop:()=>n.stop()}}const nx="NetComposer Studio",st=[40,240],ax="nc-sync";function rx(e,t=globalThis.navigator?.locks){const n=`/studio/${e}`;return{channel:`${ax}${n}`,locks:t?{request:(a,r,i)=>t.request(`${a}${n}`,r,i)}:null}}function ix(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}const ox=.2,hc=.5;function sx(e,t,n){const a=new $h({bpm:120,minBpm:st[0],maxBpm:st[1],timebase:"shared"}),r=new Oh({app:nx,version:"0.1.0",clock:a,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:st},startLeadSeconds:ox,...n?{startGate:()=>n(),gatedStartLeadSeconds:hc}:{},...t?{channel:t.channel,locks:t.locks}:{},audio:()=>{const d=e();return d==="running"?"running":d==="closed"?"none":"needs-gesture"}});let i=!1,s=0,l=!1;return{clock:a,peer:r,async start(){i||(i=!0,await r.start())},play(){const d=n?.()??null;if(!d){l=!1,a.play({at:Be()});return}const u=++s,c=Be();l=!0;const p=()=>{u!==s||!l||(l=!1,r.isLeader&&!a.transport.running?(a.commitStart(Math.max(c,Be())+hc,0),r.publishState()):a.play({at:Be()}))};d.then(p,p)},stop(){l&&(l=!1,s++,!a.transport.running)||a.stop({at:Be()})},setTempo:d=>a.setTempo({bpm:lx(d)}),playing:()=>a.transport.isPlayingAt(Be()),running:()=>l||a.transport.running,bpm:()=>a.transport.bpm,position(){const d=a.transport,u=Be();return d.isPlayingAt(u)?cx(d.beatAt(u)):null},beatPhase(){const d=a.transport,u=Be();if(!d.isPlayingAt(u))return null;const c=d.beatAt(u);return c-Math.floor(c)},peers:()=>[...r.peers.values()]}}function lx(e){return Number.isFinite(e)?Math.min(st[1],Math.max(st[0],Math.round(e*10)/10)):120}function cx(e){const t=Math.max(0,Math.floor(e));return{bar:Math.floor(t/4)+1,beat:t%4+1}}const io="netcomposer.scene",lp=1,Yo="netcomposer.studio.tempo.v1",Xo="netcomposer.studio.scene-name.v1",gr=120,Jo="Untitled scene",dx=2*1024*1024;function Fr(e){const t=typeof e=="number"?e:Number(e);return Number.isFinite(t)?Math.min(st[1],Math.max(st[0],Math.round(t*10)/10)):gr}function en(e){return(typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,60):"")||Jo}function ux(e){return{format:io,v:lp,name:en(e.name),saved:(e.now??new Date).toISOString(),tempo:{bpm:Fr(e.bpm)},meter:[4,4],instances:e.instances.map(t=>({id:t.id,type:t.type,name:t.name})),mix:e.mix,presets:e.presets??{},media:e.media??[]}}function px(e,t){if(e.length>dx)return{ok:!1,error:"That file is too large to be a Scene."};let n;try{n=JSON.parse(e)}catch{return{ok:!1,error:"That file isn't a Scene (it isn't JSON)."}}if(!n||typeof n!="object")return{ok:!1,error:"That file isn't a Scene."};const a=n;if(a.format!==io)return{ok:!1,error:"That file isn't a Scene. Load an instrument's own file from that instrument."};if((typeof a.v=="number"?a.v:0)<1)return{ok:!1,error:"That Scene has no version."};const i=new Set,s=[];for(const u of Array.isArray(a.instances)?a.instances:[]){if(!u||typeof u!="object")continue;const c=u.id;if(typeof c!="string")continue;const p=Bo(c);if(!p||!t.includes(p.type)||i.has(c))continue;i.add(c);const f=u.name;s.push({id:c,type:p.type,name:gu(f,"")})}if(!s.length)return{ok:!1,error:"That Scene has no instruments this Studio knows."};const l=a.tempo&&typeof a.tempo=="object"?a.tempo.bpm:void 0,d={};if(a.presets&&typeof a.presets=="object")for(const[u,c]of Object.entries(a.presets))i.has(u)&&(d[u]=c);return{ok:!0,scene:{format:io,v:lp,name:en(a.name),saved:typeof a.saved=="string"?a.saved:"",tempo:{bpm:Fr(l)},meter:[4,4],instances:s,mix:_u(a.mix??la()),presets:d,media:Array.isArray(a.media)?a.media:[]}}}function hx(e){return`${en(e).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"scene"}.scene.json`}function fx(e){try{const t=e?.getItem(Yo);return t?Fr(Number(t)):gr}catch{return gr}}function cp(e,t){try{t?.setItem(Yo,String(Fr(e)))}catch{}}function mx(e){try{return en(e?.getItem(Xo))}catch{return Jo}}function dp(e,t){try{t?.setItem(Xo,en(e))}catch{}}const oo="netcomposer.studio.reset-pending.v1",br="nc-reset",gx=6e4,Qo="netcomposer.studio.reset-undo.v1",Zo="netcomposer.studio.legacy-copy.v1",Ir="netcomposer.studio.generation.v1",bx=/^[a-z0-9]{1,16}$/,fc="nyx.scene-samples",yx=3e4,vx=[Oo,Vo,Yo,Xo,Zo,Ir];function wx(e){return e.includes("@studio/")||vx.includes(e)}function up(e){const t=[];for(let n=0;n<e.length;n++){const a=e.key(n);a!==null&&wx(a)&&t.push(a)}return t}const xx=/^[0-9a-f]{16,64}$/;function kx(e){const t=new Set,n=(a,r)=>{if(!(!a||typeof a!="object"||r>6))for(const[i,s]of Object.entries(a))i==="sample"&&typeof s=="string"&&xx.test(s)?t.add(s):n(s,r+1)};try{n(JSON.parse(e),0)}catch{}return[...t]}function $x(e,t){const n=new Set;for(const[i,s]of Object.entries(t))if(i.startsWith("nyx.state"))for(const l of kx(s))n.add(l);if(!n.size)return;let a=[];try{const i=JSON.parse(e.getItem(fc)??"[]");Array.isArray(i)&&(a=i.filter(s=>typeof s=="string"))}catch{}const r=[...a.filter(i=>!n.has(i)),...n].slice(-2048);e.setItem(fc,JSON.stringify(r))}function Sx(e,t){for(const n of[e,t])try{const a=n?.getItem(Qo);if(!a)continue;const r=JSON.parse(a);if(r?.v===1&&r.keys&&typeof r.keys=="object")return r}catch{}return null}function Pr(e,t){for(const n of[t,e])try{n?.removeItem(Qo)}catch{}}function Ex(e,t,n=Date.now(),a=Ax()){const r={};for(const l of up(e)){const d=e.getItem(l);d!==null&&(r[l]=d)}const i=JSON.stringify({v:1,at:n,keys:r});try{$x(e,r)}catch{}for(const l of Object.keys(r))e.removeItem(l);try{t?.removeItem(Wa)}catch{}Pr(e,t);let s=!1;for(const l of[e,t])if(!(s||!l))try{l.setItem(Qo,i),s=!0}catch{}if(!s){for(const[l,d]of Object.entries(r))e.setItem(l,d);return!1}try{e.setItem(Zo,"off")}catch{}try{e.setItem(Ir,a)}catch{}return!0}function Ax(){let e="";for(;e.length<8;)e+=Math.random().toString(36).slice(2);return e.slice(0,8)}function es(e){try{const t=e?.getItem(Ir)??"";return bx.test(t)?t:""}catch{return""}}function Mx(e){const t=e.indexOf("@studio/");if(t<0)return null;const n=e.slice(t+8),a=n.indexOf("/");return a<0?"":n.slice(0,a)}function Tx(e){const t=es(e),n=[];for(let a=0;a<e.length;a++){const r=e.key(a);if(r===null)continue;const i=Mx(r);i!==null&&i!==t&&n.push(r)}for(const a of n)try{e.removeItem(a)}catch{}return n}function Lx(e,t){const n=Sx(e,t);if(!n)return!1;for(const a of up(e))e.removeItem(a);Pr(e,t);for(const[a,r]of Object.entries(n.keys))typeof r=="string"&&e.setItem(a,r);return!0}function Cx(e){try{return e?.getItem(Zo)==="off"}catch{return!1}}function ts(){try{return globalThis.sessionStorage??null}catch{return null}}function Nx(e,t,n,a=Math.random().toString(36).slice(2,10),r=Date.now()){const i=JSON.stringify({what:n,nonce:a,at:r});let s=!1;for(const l of[e,t])try{l?.setItem(oo,i),l&&(s=!0)}catch{}return s?a:null}function Fx(e,t,n){const a=new URL(e);return a.searchParams.set(br,`${t}.${n}`),a.hash="",a.toString()}function Ix(e){const t=new URL(e);return t.searchParams.has(br)?(t.searchParams.delete(br),t.toString()):null}function Px(e,t,n,a=Date.now()){const r=new URLSearchParams(n).get(br);let i=null;for(const s of[e,t])try{const l=s?.getItem(oo);if(s?.removeItem(oo),!l||i)continue;const d=JSON.parse(l);if(d.what!=="reset"&&d.what!=="undo")continue;const u=r===`${d.what}.${d.nonce}`,c=typeof d.at=="number"&&a-d.at>=0&&a-d.at<gx;(u||r===null&&c)&&(i=d.what)}catch{}return i}function Rx(e,t,n="",a=Date.now()){if(!e)return null;const r=Px(e,t,n,a);try{if(r==="reset")return Ex(e,t,a)?"reset":"failed";if(r==="undo")return Lx(e,t)?"undo":null;Pr(e,t),Tx(e)}catch{}return null}const pp="netcomposer.studio.picker.v1",mc="http://127.0.0.1:5177",Dx=1,bn=16,gc=64*1024*1024,bc=[1e3,2e3,5e3,1e4],zx=new Set(["127.0.0.1","localhost","[::1]"]);function ns(e){if(typeof e!="string"||!e||e.length>64)return null;let t;try{t=new URL(e)}catch{return null}return t.protocol!=="http:"||!zx.has(t.hostname)||!t.port||t.username||t.password||e.replace(/\/$/,"")!==t.origin?null:t.origin}function hp(e){try{const t=JSON.parse(e?.getItem(pp)??"null"),n=t&&typeof t=="object"?t:{};return{on:n.on===!0,address:ns(n.address)??mc}}catch{return{on:!1,address:mc}}}function so(e,t){try{e?.setItem(pp,JSON.stringify(t))}catch{}}function Ox(e){let t=[];try{const n=e.pads();Array.isArray(n)&&(t=n)}catch{}return Array.from({length:bn},(n,a)=>{const r=t[a]&&typeof t[a]=="object"?t[a]:{};return{pad:a+1,name:typeof r.name=="string"?r.name.slice(0,40):"",filled:r.filled===!0}})}const wi=e=>({ok:!1,placed:[],left:[],message:e}),xi=e=>Array.isArray(e)?e.filter(t=>Number.isInteger(t)&&t>=1&&t<=bn).slice(0,16):[];function Bx(e){const t=e&&typeof e=="object"?e:{};return{ok:t.ok===!0,placed:(Array.isArray(t.placed)?t.placed:[]).flatMap(n=>{const a=n&&typeof n=="object"?n:{},[r]=xi([a.from]),[i]=xi([a.to]);return r&&i?[{from:r,to:i}]:[]}).slice(0,bn),left:xi(t.left),message:typeof t.message=="string"?t.message.slice(0,400):""}}function _x(e){const t=e&&typeof e=="object"?e:{};return t.type!=="kit"||typeof t.id!="string"||!/^[\w-]{1,40}$/.test(t.id)||typeof t.target!="string"||!t.target||t.target.length>64?null:{id:t.id,target:t.target,mode:t.mode==="fill"?"fill":"replace"}}function jx(e){const t=new Map,n=new Map,a=new Set,r=new Map,i=e.now??(()=>Date.now()),s=e.setTimeout??(($,L)=>setTimeout($,L)),l=e.clearTimeout??($=>clearTimeout($)),d=$=>e.live?.($)??!0;let u="off",c="",p=0,f=null,b=null,m="";const w=$=>{$!==u&&(u=$,e.onStatus?.($))},h=()=>[...t.entries()].filter(([$])=>d($)).map(([$,L])=>{const N=e.brandOf?.($);return{id:$,name:(e.nameOf?.($)??$).slice(0,40),...N?{brand:N.slice(0,40)}:{},shown:e.shown?.()===$,seen:n.get($)??0,pads:Ox(L)}}),g=$=>{const L=h();return m=JSON.stringify(L),JSON.stringify({v:Dx,studio:e.studio,label:(e.label?.()??"Studio").slice(0,60),targets:L,results:[...r.entries()].map(([N,_])=>({id:N,..._})),wait:$})},x=($,L)=>e.fetch(`${c}/api/studio/poll`,{method:"POST",headers:{"content-type":"application/json"},body:g($),cache:"no-store",...L?{signal:L}:{},targetAddressSpace:"loopback"}),v=async($,L)=>{if(!$.ok)throw new Error(`the picker said ${$.status}`);const N=await $.json();if(L!==p)return;if(w("on"),Array.isArray(N.ack))for(const V of N.ack)typeof V=="string"&&r.delete(V);const _=Array.isArray(N.commands)?N.commands:[];for(const V of _.slice(0,4)){const K=_x(V);K&&k(K,L)}},A=async $=>{let L=0,N=!1;for(;$===p;){const _=new AbortController;f=_;try{await v(await x(N,_.signal),$),L=0,N=!0}catch{if($!==p)return;N=!1,w("away");const V=bc[Math.min(L++,bc.length-1)];await new Promise(K=>s(K,V))}}},T=()=>{!c||b!==null||(b=s(()=>{b=null;const $=p;!c||u!=="on"||!r.size&&JSON.stringify(h())===m||x(!1).then(L=>v(L,$)).catch(()=>{})},150))},y=async $=>{const L=await e.fetch($,{cache:"no-store",targetAddressSpace:"loopback"});if(!L.ok){const N=await L.json().catch(()=>({}));throw new Error(typeof N.error=="string"?N.error.slice(0,120):`the picker said ${L.status}`)}return L},k=async($,L)=>{if(r.has($.id))return;let N;const _=t.get($.target);if(!_||!d($.target))N=wi("That NYX isn't in the Studio any more.");else if(a.has($.target))N=wi("NYX is still loading the last kit.");else{a.add($.target);try{const V=await(await y(`${c}/api/kit/manifest`)).json(),K=Array.isArray(V.sounds)?V.sounds:[];if(!K.length)throw new Error("the picker's pads are empty");if(K.length>bn)throw new Error(`more than ${bn} sounds`);const ne={};for(const be of K){const ce=be&&typeof be=="object"?be.pad:null;if(typeof ce!="number"||!Number.isInteger(ce)||ce<1||ce>bn||ne[ce])throw new Error("a sound has no pad of its own");const se=await y(`${c}/api/kit/audio?pad=${ce}`);if(Number(se.headers.get("content-length")??0)>gc)throw new Error(`pad ${ce}'s sound is too big`);const Y=await se.arrayBuffer();if(Y.byteLength>gc)throw new Error(`pad ${ce}'s sound is too big`);ne[String(ce)]=Y}if(L!==p)return;e.reveal?.($.target),N=Bx(await _.receive(V,$.mode,ne))}catch(V){N=wi(`Not loaded: ${V.message||"it went wrong"}.`)}finally{a.delete($.target)}}L===p&&(r.set($.id,N),T())},E=()=>{p++,f?.abort(),f=null,b!==null&&l(b),b=null,c="",r.clear(),w("off")};return{host($){return{pickerTarget(L){return t.set($,L),T(),{changed:T,remove(){t.get($)===L&&t.delete($),T()}}}}},start($){const L=ns($);L&&(E(),c=L,w("connecting"),A(++p))},stop:E,seen($){n.set($,i()),t.has($)&&T()},changed:T,forget($){t.delete($),n.delete($),T()},targets:h,get status(){return u}}}const qx=300,Vx=120*1e3;function Hx(e){return Object.prototype.toString.call(e)==="[object Float32Array]"}function Ux(e){const t=e&&typeof e=="object"?e:null;if(!t)return{ok:!1,message:"No audio."};const n=typeof t.name=="string"?t.name.trim().slice(0,64):"";if(!n)return{ok:!1,message:"The audio has no name."};const a=t.sampleRate;if(typeof a!="number"||!Number.isFinite(a)||a<8e3||a>192e3)return{ok:!1,message:"The sample rate is out of range (8–192 kHz)."};const r=t.channels;if(!Array.isArray(r)||r.length<1||r.length>2)return{ok:!1,message:"The audio needs one or two channels."};if(!r.every(Hx))return{ok:!1,message:"Channels must be 32-bit float arrays."};const i=r[0].length;if(i===0)return{ok:!1,message:"The audio is empty."};if(r.some(d=>d.length!==i))return{ok:!1,message:"The channels differ in length."};if(i>qx*a)return{ok:!1,message:"The audio is longer than five minutes."};const s=typeof t.bars=="number"&&Number.isInteger(t.bars)&&t.bars>=1&&t.bars<=256?t.bars:void 0,l=typeof t.bpm=="number"&&Number.isFinite(t.bpm)&&t.bpm>=20&&t.bpm<=300?t.bpm:void 0;return{ok:!0,audio:{name:n,sampleRate:a,channels:r.map(d=>new Float32Array(d)),...s===void 0?{}:{bars:s},...l===void 0?{}:{bpm:l}}}}function yc(e){try{const t=e.targets();return Array.isArray(t)?t.flatMap(n=>{if(!n||typeof n.id!="string"||!n.id)return[];const a=typeof n.name=="string"&&n.name?n.name.slice(0,64):n.id;return[{id:n.id,name:a,...n.filled?{filled:!0}:{}}]}):[]}catch{return[]}}function Gx(e={}){const t=new Map,n=s=>e.live?.(s)??!0,a=s=>e.nameOf?.(s)??s,r=e.answerMs??Vx,i=s=>[...t.entries()].filter(([l])=>l!==s&&n(l)).map(([l,d])=>{const u=e.brandOf?.(l);return{instance:l,name:a(l),...u?{brand:u}:{},label:typeof d.label=="string"&&d.label?d.label.slice(0,24):"Target",targets:yc(d)}});return{forget(s){t.delete(s)},host(s){return{audioReceivers:()=>i(s),async sendAudio(l,d,u){const c=t.get(l);if(l===s||!c||!n(l))return{ok:!1,reason:"gone",message:"That instrument isn't in the Studio."};if(typeof u!="string"||!yc(c).some(m=>m.id===u))return{ok:!1,reason:"invalid",message:`No ${u} there.`};const p=Ux(d);if(!p.ok)return{ok:!1,reason:"invalid",message:p.message};const f={...p.audio,from:s,fromName:e.brandOf?.(s)??a(s)};let b;try{const m=await Promise.race([Promise.resolve(c.receive(f,u)),new Promise(w=>{b=setTimeout(()=>w({ok:!1,reason:"timeout",message:"No answer."}),r)})]);return!m||typeof m!="object"||typeof m.ok!="boolean"?{ok:!1,reason:"error",message:"The instrument didn't answer."}:m}catch(m){return{ok:!1,reason:"error",message:m instanceof Error?m.message:String(m)}}finally{clearTimeout(b)}},onAudio(l){return t.set(s,l),()=>{t.get(s)===l&&t.delete(s)}},reveal(){n(s)&&e.reveal?.(s)}}}}}const Wx="/studio/assets/silence-processor-BBLKD9j-.js",qn=1,ki=1024,fp=[1,10,100],Kx=32,mp=128,Yx=400,ca=e=>typeof e=="object"&&e!==null,at=e=>typeof e=="number"&&Number.isFinite(e),Xx=(e,t=mp)=>typeof e=="string"&&e.length>0&&e.length<=t,Jx=e=>e<0?0:e>1?1:e,Qx=["live","quiet","offline","off"],Zx=["removed","hold"],e1=/^[A-Z0-9?*-]{0,8}$/i;function vc(e){if(!ca(e))return null;const{net:t,sta:n,loc:a,cha:r,name:i,rate:s}=e;return typeof t!="string"||typeof n!="string"||typeof a!="string"||typeof r!="string"||![t,n,a,r].every(l=>e1.test(l))||!t||!n||typeof i!="string"||i.length>mp||!at(s)||s<0||s>1e4?null:{net:t,sta:n,loc:a,cha:r,name:i,rate:s}}function t1(e){const t=e?.length;if(!(e instanceof Float32Array)&&!Array.isArray(e)&&!ArrayBuffer.isView(e)||t!==ki)return null;const n=new Float32Array(ki),a=e;for(let r=0;r<ki;r++){const i=Number(a[r]);if(!Number.isFinite(i))return null;n[r]=i<-1?-1:i>1?1:i}return n}function n1(e){if(!ca(e))return null;const t=e.v;if(typeof t!="number"||Math.floor(t)!==qn||!Xx(e.source))return null;const n=e.source;switch(e.kind){case"energy":{if(!Array.isArray(e.frames))return null;const a=[];for(const r of e.frames.slice(0,Kx)){if(!ca(r)||!at(r.at)||!at(r.value))return null;a.push({at:r.at,value:Jx(r.value)})}return{v:qn,kind:"energy",source:n,frames:a}}case"table":{if(!at(e.seq)||e.seq<0||!at(e.at)||!at(e.rms)||e.rms<0||!fp.includes(e.speed))return null;const a=t1(e.samples);if(!a)return null;const r=e.station===null?null:vc(e.station);if(e.station!==null&&!r)return null;const i=e.behindSec===null?null:at(e.behindSec)?e.behindSec:void 0;return i===void 0?null:{v:qn,kind:"table",source:n,seq:Math.floor(e.seq),at:e.at,speed:e.speed,station:r,behindSec:i,samples:a,rms:Math.min(1,e.rms)}}case"status":{if(!Qx.includes(e.state))return null;const a=e.station===null?null:vc(e.station);if(e.station!==null&&!a)return null;const r=d=>d===null?null:at(d)?d:void 0,i=r(e.newestAgeSec),s=r(e.behindSec);if(i===void 0||s===void 0||typeof e.hold!="boolean"||typeof e.credit!="string"||e.credit.length>Yx)return null;const l={v:qn,kind:"status",source:n,state:e.state,station:a,newestAgeSec:i,behindSec:s,hold:e.hold,credit:e.credit};return at(e.retryAt)&&(l.retryAt=e.retryAt),e.recorded===!0&&(l.recorded=!0),l}case"off":return Zx.includes(e.reason)?{v:qn,kind:"off",source:n,reason:e.reason}:null;default:return null}}function a1(e){if(!ca(e))return null;const t={};return e.energy===!0&&(t.energy=!0),ca(e.table)&&fp.includes(e.table.speed)&&(t.table={speed:e.table.speed}),t.energy||t.table?t:null}function r1(e={}){const t=new Map,n=new Map,a=new Set,r=new Set,i={sent:{energy:0,table:0,status:0,off:0},errors:0},s=m=>e.name?.(m)??m,l=m=>{for(const w of[...m])try{w()}catch{}},d=()=>{l(a);for(const m of t.values())l(m.demandListeners)},u=(m,w)=>{try{m.receiver(w),i.sent[w.kind]++}catch{i.errors++}},c=(m,w)=>w.kind==="energy"?!!m.wants.energy:w.kind==="table"?m.wants.table?.speed===w.speed:!0,p=m=>{for(const w of t.values()){w.status&&u(m,w.status),w.energy&&m.wants.energy&&u(m,w.energy);const h=m.wants.table&&w.tables.get(m.wants.table.speed);h&&u(m,h)}},f=()=>{const m=new Set;let w=!1;const h=[];for(const[g,x]of n)x.wants.energy&&(w=!0),x.wants.table&&m.add(x.wants.table.speed),h.push(s(g));return{energy:w,speeds:[...m].sort((g,x)=>g-x),receivers:n.size,names:h}};function b(m,w){const h=t.get(m),g=h??{id:m,name:w,status:null,energy:null,tables:new Map,demandListeners:new Set};return g.name=w,t.set(m,g),h||l(r),{id:m,name:w,send(x){const v=n1(x);if(!(!v||v.source!==m||t.get(m)!==g)){if(v.kind==="status"){const A=JSON.stringify(g.status);g.status=v,JSON.stringify(v)!==A&&l(a)}else v.kind==="energy"?g.energy=v:v.kind==="table"?g.tables.set(v.speed,v):v.kind==="off"&&v.reason==="removed"&&(g.energy=null);for(const A of n.values())c(A,v)&&u(A,v)}},demand:f,onDemand(x){return typeof x!="function"?()=>{}:(g.demandListeners.add(x),()=>g.demandListeners.delete(x))},remove(){if(t.get(m)!==g)return;t.delete(m);const x={v:1,kind:"off",source:m,reason:"removed"};for(const v of n.values())u(v,x);l(r),l(a)}}}return{host(m){return{situationIn(w,h){const g=a1(h);if(typeof w!="function"||!g)return n.delete(m)&&d(),()=>{};const x={receiver:w,wants:g};return n.set(m,x),d(),p(x),()=>{n.get(m)===x&&(n.delete(m),d())}},situationSource:w=>b(m,typeof w=="string"?w.slice(0,64):m),situationSources:()=>[...t.values()].map(w=>({id:w.id,name:w.name})),onSituationSources(w){return typeof w!="function"?()=>{}:(r.add(w),()=>r.delete(w))}}},statuses:()=>[...t.values()].flatMap(m=>m.status?[{source:m.id,name:m.name,status:m.status}]:[]),wants:m=>n.get(m)?.wants??null,drop(m){const w=t.get(m);if(w){t.delete(m);const h={v:1,kind:"off",source:m,reason:"removed"};for(const g of n.values())u(g,h);l(r)}(n.delete(m)||w)&&d()},onChange(m){return a.add(m),()=>a.delete(m)},stats:i}}function i1(e,t=jo){const n=t.find(i=>i.id===e.type),a=(n?.name??e.type).toUpperCase(),r=String(e.n).padStart(2,"0");return{brand:n?.brand??a,rest:e.custom&&e.name?` / ${e.name.toUpperCase()}`:` / ${a} / ${r}`,...n?.identity?{identity:n.identity}:{}}}const lo=Lm,it=Tm,$i={system:"System",light:"Light",dark:"Dark"};function o1(e){try{return xo(e?.getItem(lo))}catch{return"system"}}function s1(e,t){try{t==="system"?e?.removeItem(lo):e?.setItem(lo,t)}catch{}}const l1=e=>it[(it.indexOf(e)+1)%it.length]??"system";function c1(e){try{return e.contentDocument?.documentElement?e.contentDocument:null}catch{return null}}function gp(e,t){const n=c1(e);n&&ko(t,n)}function d1(e,t){const n=document.createElement("div");n.className="theme",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Theme"),n.dataset.theme="";let a=e;const r=it.map(s=>{const l=document.createElement("button");l.type="button",l.className="ghost theme-choice",l.setAttribute("role","radio"),l.dataset.themeChoice=s;const d=document.createElement("span");return d.className="theme-word",d.textContent=$i[s],l.append(d),l.setAttribute("aria-label",`${$i[s]} theme`),l.title=s==="system"?"Follow this computer's light or dark setting":`${$i[s]} theme`,l.addEventListener("click",()=>{const u=n.closest(".nc-page-menu[data-nc-open]")!==null,c=s===a&&!u?l1(s):s;i(c),t(c),r[it.indexOf(c)]?.focus({preventScroll:!0})}),l});n.append(...r);function i(s){a=s;for(const l of r){const d=l.dataset.themeChoice===s;l.setAttribute("aria-checked",d?"true":"false"),l.tabIndex=d?0:-1}}return i(e),n.addEventListener("keydown",s=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(s.key))return;s.preventDefault();const l=s.key==="ArrowLeft"||s.key==="ArrowUp"?-1:1,d=(it.indexOf(a)+l+it.length)%it.length,u=it[d]??"system";i(u),t(u),r[d]?.focus()}),{el:n,get choice(){return a},set:i}}function u1(e,t){const n=e.addModule.bind(e),a=new Map;return Object.defineProperty(e,"addModule",{value:(i,s)=>{const l=new URL(String(i),t).href;let d=a.get(l);return d||(d=n(i,s),a.set(l,d),d.catch(()=>{a.get(l)===d&&a.delete(l)})),d},configurable:!0}),e}const Vn=Rx(ve(),ts(),location.search);{const e=Ix(location.href);if(e)try{history.replaceState(history.state,"",e)}catch{}}const bp=es(ve());let Pt=!1;const Q=new AudioContext({latencyHint:"interactive"});u1(Q.audioWorklet,location.href);const as=ex(ve()),p1=new URLSearchParams(location.search).has("plugins"),h1=p1,aa=cv({ctx:Q,moduleUrl:Xn,base:location.href,remote:h1,store:By(),frozen:as});function wc(e,t){aa?.restore(e.getChain().flatMap(r=>r.plugin?[r.plugin]:[])),rs.add(e);let n=e.getChain().length;const a=new Set;return e.onChange(r=>{if(r.key==="error"||r.key==="plugin"){dt?.render();for(const s of Qw(a,e.getChain()))$t({message:O.stuck(s.plugin?.name??s.name,t()),duration:12e3,anchor:document.querySelector("[data-nc-area='fx']")}).el.dataset.pluginStuck=s.plugin?.id??s.id}const i=e.getChain().length;i!==n&&(n=i,queueMicrotask(()=>dt?.render()))}),e}function f1(e){return le.list().find(t=>t.id===e)?.name??e}const rs=new Set,Fe=Zy(),An={},m1=Zu,Rr=new Map,le=new nw(Q,{restore:e=>Fe.channels[e],fx:e=>{const t=Xr(Q,{moduleUrl:Xn,bpm:120,state:Au(e,Fe)});return An[e]=t,t},masterFx:()=>{const e=Xr(Q,{moduleUrl:Xn,bpm:120,slots:Ji,state:ny(Fe,Ji)});return e.onChange(pa),wc(e,()=>"Master")},channelFx:e=>{wr.delete(e);const t=Xr(Q,{moduleUrl:Xn,bpm:H.bpm(),slots:m1,state:Fe.channelFx[e]??{v:2,chain:[]}}),n=td(t,H.clock,{mapper:ut}),a=t.dispose.bind(t);return t.dispose=()=>{n(),a()},t.onChange(pa),Rr.set(e,t),t.dispose=(r=>()=>{rs.delete(t),r()})(t.dispose),wc(t,()=>f1(e))}});le.setMaster(Fe.master);le.setReturn("a",Fe.returns.a);le.setReturn("b",Fe.returns.b);let yp=()=>!1;const ut=new Ph(Q,{hold:()=>yp()});ut.start();const vp=ix();let wp=()=>{};const xp=$y(Q.sampleRate),Dr=oy(Q,{nodeFor:e=>le.tapNode(e),latencyFor:e=>le.tapLatency(e,xp.get()),sources:()=>[{id:"master",name:"Master"},...le.list().map(e=>({id:e.id,name:e.name}))],ready:new Promise(e=>{wp=e})}),qe=Xw(),yn=j0(()=>{try{return globalThis.sessionStorage??null}catch{return null}}),tn=e=>B.some(t=>t.id===e),kp=e=>B.find(t=>t.id===e)?.name??e,$p=e=>{const t=B.find(a=>a.id===e),n=$e.find(a=>a.id===t?.type)?.brand;return t&&n?t.n===1?n:`${n} ${t.n}`:void 0},ya=e=>{Je(e),document.getElementById(`tab-${e}`)?.scrollIntoView({block:"nearest"}),Ve.get(e)?.contentWindow?.focus()},Sp=Gx({live:tn,nameOf:kp,brandOf:$p,reveal:ya}),Et=jx({fetch:(e,t)=>fetch(e,t),studio:`studio-${Math.random().toString(36).slice(2,10)}`,label:()=>Yt.value.trim()||"Studio",live:tn,nameOf:kp,brandOf:$p,shown:()=>ze,reveal:ya,onStatus:e=>us(e)});let Ep=!1;const is=Q0(),Ap=X0({now:()=>Q.currentTime,labelOf:e=>{const t=B.find(a=>a.id===e),n=$e.find(a=>a.id===t?.type)?.brand??t?.name??e;return t&&t.n>1?`${n} ${t.n}`:n},clearOf:()=>[Pp,ct,zp]}),Ct=Uw({nowBeat:()=>{const e=H.clock.transport;return e.running?e.beatAt(Be()):null},startAudio:()=>Q.state==="running"?void 0:ha()}),co=new Set,zr=()=>{for(const e of[...co])try{e()}catch{}};Ct.onChange(()=>{zr(),g1()});const va=r1({name:e=>B.find(t=>t.id===e)?.name??e});va.onChange(()=>b1());window.ncStudio=H0(Q,le,{notes:Ct,situation:va,clock:()=>H.clock,targets:{list:()=>B.filter(e=>$e.find(t=>t.id===e.type)?.noteTarget!==!1).map(e=>({instance:e.id,name:e.name,type:e.type,n:e.n,takesNotes:Ct.listening(e.id),takesPitch:Ct.takesPitch(e.id)})),listen(e){return co.add(e),()=>co.delete(e)}},show:e=>{tn(e)&&ya(e)},countIn:Ap.api,holdFirstPlay:e=>{const t=is.hold(),n=xe.hold(e);return()=>{t(),n()}},attached:e=>xe.attached(e),presets:yn,share:Sp,picker:Et,legacyCopy:()=>!Cx(we()),generation:()=>bp,grab:Dr,play:qe,mapper:sy(ut),resolve:(e,t)=>x1(e,t),syncScope:vp,fxWorklet:new URL(Xn,location.href).href});const H=sx(()=>Q.state,rx(vp),()=>Ep&&Q.state==="running"&&ut.ready&&is.count===0&&xe.settled()?null:E1());yp=()=>H.clock.transport.isPlayingAt(Be());function we(){try{return globalThis.localStorage??null}catch{return null}}H.setTempo(fx(we()));const Ae=new my(Q,()=>le.tapNode("master"));let Wt=null,Mp=!0;const Ce=new yy(Q,()=>le.tapNode("master"),gy(we()));let Tp=null;function I(e,t={},...n){const a=document.createElement(e);for(const[r,i]of Object.entries(t))i===void 0||i===!1||a.setAttribute(r,i===!0?"":String(i));return a.append(...n),a}const Nt=I("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),Mn=I("input",{type:"number",class:"bpm",min:st[0],max:st[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),yr=I("output",{class:"position","aria-label":"Bar and beat"},"—"),At=I("button",{type:"button",class:"btn rec","aria-pressed":"false","data-state":"idle","data-nc-help":ee["transport:rec"]},"Rec"),Zt=I("button",{type:"button",class:"btn keep","aria-haspopup":"menu","aria-expanded":"false","aria-controls":"keep-menu","aria-keyshortcuts":"K","data-nc-help":ee["transport:keep"]},"Keep"),Lp=I("div",{class:"keep-held","data-nc-help":ee["keep:held"]}),os=[...ly.map(e=>({choice:()=>({last:e}),label:`Keep last ${e/60} min`,key:String(e)})),{choice:e=>({since:e}),label:"Keep since Play",key:"since"}],wa=os.map(e=>I("button",{type:"button",role:"menuitem",class:"keep-item","data-keep":e.key},e.label)),da=$o({checked:Ce.keeping,labelledBy:"keep-switch-label",onChange:e=>{by(we(),e),Ce.setKeeping(e),Re(e?"Keeping: on":"Keeping: off (nothing held)")}}),Xe=I("div",{class:"keep-menu",id:"keep-menu",role:"menu","aria-label":"Keep",hidden:!0},Lp,...wa,I("div",{class:"keep-switch","data-nc-help":ee["keep:switch"]},I("span",{id:"keep-switch-label"},"Keeping"),da.el)),Cp=I("div",{class:"keep-wrap"},Zt,Xe),Gn=I("a",{class:"take",hidden:!0}),Kt=I("button",{type:"button",class:"notes-chip",hidden:!0});Kt.addEventListener("click",()=>{const e=Kt.dataset.source;e&&tn(e)&&ya(e)});function g1(){const e=Ct.statuses().filter(i=>tn(i.source));Kt.hidden=e.length===0;const t=e[0];if(!t)return;Kt.dataset.source=t.source;const{now:n,next:a}=t.status,r=`${n}${a&&a!==n?` → ${a}`:""}`;Kt.replaceChildren(I("span",{class:"notes-chip-dot","aria-hidden":"true"}),I("span",{class:"notes-chip-name"},t.name),I("span",{class:"notes-chip-chord"},r),...e.length>1?[I("span",{class:"notes-chip-count",title:`${e.length} CALLIOPEs playing`},String(e.length))]:[]),Kt.setAttribute("aria-label",`${t.name} plays ${r}. Show it.`)}const kt=I("button",{type:"button",class:"notes-chip situation-chip",hidden:!0});kt.addEventListener("click",()=>{const e=kt.dataset.source;e&&tn(e)&&ya(e)});function b1(){const e=va.statuses().find(r=>tn(r.source)&&r.status.state!=="off");if(kt.hidden=!e,!e)return;const t=e.status;kt.dataset.source=e.source,kt.dataset.state=t.state;const n=t.station?`${t.station.net}.${t.station.sta}`:"",a=t.hold?`${n} · held`:t.recorded&&t.state!=="live"?"recording · offline":t.state==="live"&&t.behindSec!==null?`${n} · ${Math.round(t.behindSec)} s behind`:`${n} · ${t.state}`;kt.replaceChildren(I("span",{class:"notes-chip-dot situation-chip-dot","aria-hidden":"true"}),I("span",{class:"notes-chip-name"},e.name),I("span",{class:"notes-chip-chord"},a)),kt.setAttribute("aria-label",`${e.name}: ${a}. Show it.`)}const Vt=I("span",{class:"status",role:"status"}),Yt=I("input",{type:"text",class:"scene-name",maxlength:60,value:mx(we()),"aria-label":"Scene name",title:"Scene name (used when you Save)"}),Np=I("button",{type:"button",class:"ghost","data-scene":"save",title:"Save this Scene as a file"},"Save"),Fp=I("button",{type:"button",class:"ghost","data-scene":"load",title:"Load a Scene file"},"Load"),Ip=I("button",{type:"button",class:"ghost","data-scene":"new",title:"Start a new Scene"},"New"),ra=I("input",{type:"file",accept:".json,application/json",hidden:!0}),Ft=I("button",{type:"button",class:"ghost picker-link","data-picker":"off","aria-pressed":"false"},I("span",{class:"picker-dot","aria-hidden":"true"}),"Picker"),ss=d1(o1(we()),e=>{s1(we(),e),ko(e);for(const t of Ve.values())gp(t,e)});ko(ss.choice);const Pp=I("h1",{class:"brand","aria-label":"NetComposer Studio"},I("span",{"aria-hidden":"true"},"NetComposer",I("span",{class:"brand-sep"}," / "),"Studio")),uo=I("span",{class:"beat-light","aria-hidden":"true"}),Ht=I("span",{class:"status-long"}),Ut=I("span",{class:"status-short"});Vt.append(Ht,Ut);const ct=I("header",{class:"top"},I("div",{class:"transport"},Nt,I("label",{class:"tempo"},Mn,I("span",{class:"tempo-unit"},"BPM")),uo,yr),I("div",{class:"record-col"},I("div",{class:"record"},At,Cp,Gn),Kt,kt),Vt),Rp=Fy();Iy(ct.querySelector(".transport"),Rp);const ls=I("div",{class:"scene-actions"},Yt,Np,Fp,Ip,Ft,ss.el),Dp=I("button",{type:"button",class:"ghost menu-reset","data-reset":"menu"},"Reset Studio…");Dp.addEventListener("click",()=>void eh(vr.button));ls.append(Dp);const vr=c0({panel:ls}),po=I("button",{type:"button",class:"foot-reset","data-reset":"foot"},"Reset Studio…");po.addEventListener("click",()=>void eh(po));const y1=I("footer",{class:"studio-foot"},po),zp=I("div",{class:"scene",role:"group","aria-label":"Scene"},ls,ra,vr.button);Ae.supported||(At.disabled=!0,At.title="This browser can't record audio",Zt.disabled=!0);const Nn=I("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),Or=I("div",{class:"stage"}),xa=I("label",{class:"tab tab-add",title:"Add an instrument"},I("span",{"aria-hidden":"true"},"+")),vn=I("select",{class:"tab-add-select","aria-label":"Add an instrument"});vn.append(I("option",{value:""},"Add an instrument"),...jo.map(e=>{const t=I("option",{value:e.id},e.available===!1?`${e.name} (soon)`:e.name);return t.disabled=e.available===!1,t}));vn.addEventListener("change",()=>{const e=vn.value;vn.value="",e&&Wp(e)});xa.append(vn);Nn.append(xa);i0();const ua=I("div",{class:"spine","aria-hidden":"true"}),Ve=new Map;let B=S0($0($e),$e),ze=B[0]?.id??"";const Op=new URLSearchParams(location.search).has("measure"),xc=new Map,cs=M0((e,t)=>fetch(e,t));for(const e of B)cs(e.src);const v1=2e4,xe=I0(B.map(e=>{const t=$e.find(a=>a.id===e.type),n=t?.brand??e.name;return{id:e.id,brand:e.n>1?`${n} ${e.n}`:n,name:t?.name??e.name}})),Bp=new Set,ia=new Map;for(const e of B){let t=()=>{};const n=new Promise(a=>{t=a});ia.set(e.id,{go:t,turn:n})}function _p(e){const t=I("button",{type:"button",role:"tab",id:`tab-${e.id}`,"aria-controls":`panel-${e.id}`,class:"tab"},e.name);Yp(t,e),t.addEventListener("click",()=>Je(e.id)),Nn.insertBefore(t,xa);const n=xc.get(e.type)??Promise.resolve(),a=cs(e.src),r=Promise.all([n,a,ia.get(e.id)?.turn]).then(([,i])=>new Promise(s=>{if(!B.some(u=>u.id===e.id))return s();const l=I("iframe",{id:`panel-${e.id}`,role:"tabpanel","aria-labelledby":`tab-${e.id}`,title:e.name,src:bu(e,Op,i),allow:"autoplay; clipboard-read; clipboard-write; microphone"});Ve.set(e.id,l),xe.requested(e.id),window.setTimeout(()=>xe.fail(e.id),L0),l.addEventListener("load",()=>{Bp.add(e.id),xe.loaded(e.id),jr()},{once:!0});const d=window.setTimeout(s,v1);l.addEventListener("load",()=>w1(l)),l.addEventListener("load",()=>{window.clearTimeout(d),s()},{once:!0}),Or.append(l),Je(ze)}));return xc.set(e.type,r),r}const jp=window.matchMedia(cd);function qp(e){try{e.contentDocument?.documentElement.toggleAttribute("data-nc-landscape",jp.matches)}catch{}}jp.addEventListener("change",()=>{for(const e of Ve.values())qp(e)});function w1(e){let t=null;try{t=e.contentDocument}catch{return}if(!t?.documentElement)return;t.documentElement.dataset.ncHosted="",gp(e,ss.choice),qp(e);const n=e.id.replace(/^panel-/,""),a=()=>{const i=t?.querySelector(".nc-page"),s=i?i.getBoundingClientRect().height:t?.documentElement.scrollHeight??0;s>0&&(e.style.height=`${Math.ceil(s)}px`);const l=t?.querySelector(".nc-page-hd, .nc-title-band");l&&(Hp.set(n,Math.round(l.getBoundingClientRect().bottom)),n===ze&&Up())};a();const r=t.querySelector(".nc-page")??t.body;r&&new ResizeObserver(()=>{a(),Br()}).observe(r),ds.add(e),Vp(e)}const ds=new Set;function Vp(e){let t;try{t=e.contentDocument?.documentElement}catch{return}if(!t||!e.isConnected){ds.delete(e);return}const n=e.getBoundingClientRect();if(n.height<=0)return;const a=getComputedStyle(ct).position==="sticky"?ct.getBoundingClientRect().bottom:0,r=Math.min(n.height,Math.max(0,a-n.top)),i=Math.max(r,Math.min(n.height,window.innerHeight-n.top));t.style.setProperty("--nc-host-top",`${Math.round(r)}px`),t.style.setProperty("--nc-host-height",`${Math.round(i-r)}px`),t.style.setProperty("--nc-host-bottom",`${Math.round(n.height-i)}px`)}let Si=!1;function Br(){Si||(Si=!0,requestAnimationFrame(()=>{Si=!1;for(const e of ds)Vp(e)}))}window.addEventListener("scroll",Br,{passive:!0});window.addEventListener("resize",Br);const Hp=new Map;function Up(){const e=Hp.get(ze);e===void 0?ua.style.removeProperty("--spine-top"):ua.style.setProperty("--spine-top",`${e}px`)}function Gp(e){if(!e){ua.replaceChildren();return}const t=i1(e),n=I("span",{class:"spine-brand"},t.brand);t.identity&&(n.style.color=`var(--nc-ui-${t.identity})`),ua.replaceChildren(I("span",{class:"spine-text"},n,I("span",{class:"spine-rest"},t.rest)))}function Je(e){ze=e,jr(),Et.seen(e),Gp(B.find(t=>t.id===e)),Up(),Br();for(const t of B){const n=t.id===e;Ve.get(t.id)?.classList.toggle("shown",n);const a=document.getElementById(`tab-${t.id}`);a?.setAttribute("aria-selected",String(n)),a?.setAttribute("tabindex",n?"0":"-1")}}const x1=T0(()=>B.map(e=>({instance:e,window:()=>Ve.get(e.id)?.contentWindow,readyState:()=>{try{return Ve.get(e.id)?.contentDocument?.readyState}catch{return}}})),$e);function Wp(e){ah();const t=$e.find(i=>i.id===e);if(!t)return;const n=t.single?B.find(i=>i.type===t.id):void 0;if(n){Je(n.id);return}const a=x0(B,t),r=B.map(i=>i.type).lastIndexOf(a.type);B=r<0?[...B,a]:[...B.slice(0,r+1),a,...B.slice(r+1)],Pt||Cn(B),_p(a),zr();for(const i of B){const s=document.getElementById(`tab-${i.id}`);s&&Nn.insertBefore(s,xa)}Je(a.id),dt?.render()}function k1(e,t){const n=B.find(l=>l.id===e);if(!n)return;const a=B.filter(l=>l.id!==e),r=l=>$e.find(d=>d.id===l.type)?.sound===!1,i=a.reduce((l,d,u)=>r(d)?l:u,-1),s=t===null?r(n)?a.length:i+1:a.findIndex(l=>l.id===t);B=[...a.slice(0,s<0?a.length:s),n,...a.slice(s<0?a.length:s)],Pt||Cn(B);for(const l of B){const d=document.getElementById(`tab-${l.id}`);d&&Nn.insertBefore(d,xa)}dt?.render()}function $1(e,t){B=w0(B,e,t,$e),Pt||Cn(B);const n=B.find(r=>r.id===e);if(!n)return;const a=document.getElementById(`tab-${e}`);a&&Yp(a,n),Ve.get(e)?.setAttribute("title",n.name),zr(),ze===e&&Gp(n),le.rename(e,n.name)}async function Kp(e,t){const n=B.find(d=>d.id===e),a=n?.name??e,r=$e.find(d=>d.id===n?.type)?.sound===!1;if(!await We({title:`Remove ${a}?`,body:r?"Its tab goes, and what it plays stops. Its settings stay in this browser.":`Its channel, strip and mix settings go. ${a}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:t}))return;ah(),B=B.filter(d=>d.id!==e),Pt||Cn(B),Sp.forget(e),Et.forget(e),Ct.drop(e),va.drop(e);const s=qe.playing().includes(e);qe.drop(e),s&&qe.out(e);const l=Ve.get(e);Ve.delete(e),xe.remove(e),l?.setAttribute("src","about:blank"),l?.remove(),document.getElementById(`tab-${e}`)?.remove(),le.detach(e),S1(e),gv(ve(),e),ze===e&&Je(B[0]?.id??""),zr()}function Yp(e,t){const n=$e.find(s=>s.id===t.type);if(n?.sound!==!1){e.textContent=t.name;return}const a=I("span",{class:"tab-dot","aria-hidden":"true"});n.identity&&(a.style.background=`var(--nc-ui-${n.identity})`);const r=I("span",{class:"tab-remove",role:"button",tabindex:"0","aria-label":`Remove ${t.name}`,title:`Remove ${t.name}`});r.textContent="×";const i=s=>{s.stopPropagation(),Kp(t.id,e)};r.addEventListener("click",i),r.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&i(s)}),e.replaceChildren(a,I("span",{},t.name),r)}const ho=I("div",{class:"mix"});ho.addEventListener("click",e=>{const n=e.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==ze&&B.some(a=>a.id===n)&&Je(n)});let dt=null,Tn=0;const wr=new Set;function S1(e){wr.add(e),delete Fe.channels[e],delete Fe.channelFx[e],Rr.delete(e),pa()}let ka=!1;function pa(){window.clearTimeout(Tn),!ka&&(Tn=window.setTimeout(()=>{qu(Xp())},300))}function Xp(){const e={...Fe.channels};for(const r of le.list())e[r.id]=r.strip;for(const r of wr)delete e[r];const t={};for(const r of["a","b"]){const i=An[r];i&&(t[r]=i.getState())}const n=le.masterFx?.getState()??null,a={...Fe.channelFx};for(const[r,i]of Rr)a[r]=i.getState();for(const r of wr)delete a[r];return{v:1,channels:e,master:le.masterPositionValue,returns:{a:{on:le.returns.a.on,level:le.returns.a.level},b:{on:le.returns.b.on,level:le.returns.b.level}},insert:{on:n?ay(n):Fe.insert.on},fx:t,channelFx:a,masterFx:n??Fe.masterFx}}le.onChange(()=>{dt?.render(),pa()});for(const e of Object.values(An))e?.onChange(pa);async function ha(){Q.state!=="running"&&await Q.resume()}const kc=1500;async function E1(){xe.settled()||(ha(),await xe.whenSettled());const e=performance.now()+kc;await Promise.race([ha(),new Promise(t=>setTimeout(t,kc))]),await ut.whenSettled(Math.max(0,e-performance.now())),await Promise.race([is.idle(),new Promise(t=>setTimeout(t,Math.max(0,e-performance.now())))])}Nt.addEventListener("click",()=>{ha(),H.running()&&qe.owner()===Ko?H.stop():H.running()?qe.claimAll():(qe.claimAll(),H.play()),Pe()});function Jp(){const e=Number(Mn.value);H.setTempo(e),Pt||cp(H.bpm(),we())}Yt.addEventListener("change",()=>{Yt.value=en(Yt.value),Pt||dp(Yt.value,we())});function A1(e,t,n){const a=URL.createObjectURL(new Blob([t],{type:n})),r=I("a",{href:a,download:e});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e4)}Np.addEventListener("click",()=>void Qp());async function Qp(){const e=en(Yt.value),t=B.map(i=>i.id),n=await yn.collect(t),a=ux({name:e,bpm:H.bpm(),instances:B,mix:Xp(),presets:n});A1(hx(e),`${JSON.stringify(a,null,2)}
`,"application/json");const r=B.filter(i=>!n[i.id]).map(i=>i.name);Re(r.length?`Saved “${e}” (without ${r.join(", ")}: ${r.length===1?"it hasn't":"they haven't"} loaded yet)`:`Saved “${e}”`)}Fp.addEventListener("click",()=>ra.click());ra.addEventListener("change",async()=>{const e=ra.files?.[0];if(ra.value="",!e)return;const t=px(await e.text(),$e.filter(r=>r.available!==!1).map(r=>r.id));if(!t.ok){Re(t.error);return}const n=t.scene;await We({title:`Load “${n.name}”?`,body:"The music stops and the Studio reloads with this Scene's instruments, their sounds and patterns, the mix and the tempo. Save the current Scene first to keep it.",confirmLabel:"Load"})&&Zp({name:n.name,bpm:n.tempo.bpm,instances:n.instances,mix:n.mix,presets:n.presets})});Ip.addEventListener("click",async()=>{await We({title:"Start a new Scene?",body:"The music stops and the Studio reloads with one of each instrument, a fresh mix and 120 BPM. Each instrument keeps its own sound and pattern. Save the current Scene first to keep it.",confirmLabel:"New"})&&Zp({name:Jo,bpm:gr,instances:sa($e),mix:la()})});function Zp(e){H.running()&&H.stop(),ka=!0,window.clearTimeout(Tn);const t=e.instances.map(({id:n,name:a})=>{const[r,i]=n.split("#"),s=$e.find(l=>l.id===r);return s?Ln(s,i?Number(i):1,a):null}).filter(n=>n!==null);Cn(t),qu(e.mix),cp(e.bpm,we()),dp(e.name,we()),yn.stash({...e.presets??{}}),location.reload()}async function eh(e){try{vr.isOpen()&&vr.close()}catch{}Le("dialog: opened");const t=["Kept: your samples, LUCY takes and Scene files.","Kept: theme, folds and meters."];Ae.state==="recording"?t.push({text:"Rec is recording: its take will be lost.",tone:"danger"}):Wt&&!Mp&&t.push({text:`Your last Rec take (${Wt.take.seconds.toFixed(1)} s) isn't saved.`,tone:"danger"});const n=await We({title:"Reset the Studio?",body:"The music stops and the Studio starts over: one of each instrument at its factory sound and pattern, a fresh mix, 120 BPM. You can undo it for 30 seconds.",lines:t,extra:{label:"Save Scene first",onAction:()=>void Qp()},confirmLabel:"Reset",danger:!0,returnFocus:e});Le(n?"dialog: Reset":"dialog: Cancel"),n&&nh("reset")}const th=[];function Le(e,t){const n=t?`${e}: ${t instanceof Error?t.message:String(t)}`:e;th.push(n),t?console.error(`[reset] ${n}`):console.info(`[reset] ${n}`)}let wn=null;function nh(e){Le(`${e}: asked`);let t=null;try{t=Nx(ve(),ts(),e)}catch(n){Le(`${e}: storing the request failed`,n)}if(!t){$c("This browser's storage is blocked: the Studio can't reset");return}Le(`${e}: request stored`);try{H.running()&&H.stop()}catch(n){Le(`${e}: stopping the music failed (going on)`,n)}ka=!0,window.clearTimeout(Tn);try{wn=Fx(location.href,e,t),Le(`${e}: going to ${wn}`),location.replace(wn)}catch(n){Le(`${e}: navigating failed, reloading`,n);try{location.reload()}catch(a){Le(`${e}: reloading failed`,a)}}window.setTimeout(()=>{Le(`${e}: still on the page after 5 s`),$c(`The Studio didn't reload: reload to ${e==="reset"?"reset":"undo"}`,()=>location.reload())},5e3)}function $c(e,t){Re(e,Sc);try{const n=$t({message:e,duration:Sc,anchor:ct,...t?{actionLabel:"Reload",onAction:t}:{}});n.el.dataset.resetProblem=""}catch(n){Le("showing the problem failed",n)}}const Sc=12e3;addEventListener("pageshow",e=>{!e.persisted||!wn||(Le("restored from the page cache: going again"),location.replace(wn))});addEventListener("storage",e=>{if(!(Pt||wn||e.key!==Ir&&e.key!==null)&&es(we())!==bp){Pt=!0,ka=!0,window.clearTimeout(Tn),Le("another tab reset the Studio: this page saves nothing more"),document.documentElement.dataset.studioStale="";try{const t=$t({message:"The Studio was reset in another tab",actionLabel:"Reload",duration:M1,anchor:ct,onAction:()=>location.reload()});t.el.dataset.studioStale=""}catch{Re("The Studio was reset in another tab: reload")}}});const M1=6e5;let fo=null;function T1(){const e=$t({message:"Studio reset",actionLabel:"Undo",duration:yx,anchor:ct,onAction:()=>nh("undo"),onClose:t=>{fo=null,t!=="action"&&Pr(ve(),ts())}});e.el.dataset.resetUndo="",fo=e}function ah(){fo?.close("close")}let Ec=0,mo="",go=0;function Re(e,t=4e3){mo=e,go=performance.now()+t,Ht.textContent=e,Ut.textContent=e,window.clearTimeout(Ec),Ec=window.setTimeout(()=>{go=0,Pe()},t)}Mn.addEventListener("change",Jp);Mn.addEventListener("keydown",e=>{e.key==="Enter"&&Jp()});At.addEventListener("click",()=>{ha();const e=Ae.state;e==="recording"?L1():e==="arming"||e==="armed"?(Ae.cancel(),Re("Rec cancelled")):e==="idle"&&(Ae.arm(H.playing()),rh())});async function L1(){const e=await Ae.stop();e&&(Wt&&URL.revokeObjectURL(Wt.url),Wt={url:URL.createObjectURL(e.blob),take:e},Gn.href=Wt.url,Gn.download=e.name,Gn.textContent=`Save take (${e.seconds.toFixed(1)} s)`,Gn.hidden=!1,Mp=!1)}function rh(){const e=Ae.state;if(e!=="arming"&&e!=="armed")return;const t=H.clock.transport;if(!t.running||t.startTime===null){Ae.schedule(null);return}const n=Math.round(ut.toContextTime(t.startTime)*Q.sampleRate);Ae.schedule(n+Dr.latency("master"))}function C1(){const e=Ae.state,t=e==="arming"||e==="armed",n=e==="recording"||e==="stopping";At.dataset.state=t?"armed":n?"recording":"idle",At.setAttribute("aria-pressed",String(n)),At.textContent=t?"Armed":n?"Stop rec":"Rec",At.disabled=e==="stopping"||!Ae.supported,Pe()}Ae.onChange(C1);let fa=null;function N1(){const e=H.clock.transport;!e.running||e.startTime===null||(fa=Math.round(ut.toContextTime(e.startTime)*Q.sampleRate)+Dr.latency("master"))}function ih(){return!H.clock.transport.running||fa===null?null:{origin:fa,barFrames:240/H.bpm()*Q.sampleRate}}function oh(e){const t=os[e];return!t||t.key==="since"&&fa===null?null:t.choice(fa??0)}function _r(){const e=!Xe.hidden;if(Zt.setAttribute("aria-expanded",String(e)),Zt.dataset.keeping=Ce.keeping?"on":"off",!e)return;da.checked!==Ce.keeping&&da.set(Ce.keeping);const t=Ce.status,n=Tu(t)/(t.sampleRate||Q.sampleRate);Lp.textContent=Ce.keeping?`${Qi(n)} of sound held`:"Keeping is off";const a=ih();wa.forEach((r,i)=>{const s=oh(i),l=s?Ce.plan(s,a):null;r.disabled=!l;const d=os[i];d?.key==="since"&&(r.textContent=l?`Keep since Play (${Qi((l.to-l.from)/(t.sampleRate||Q.sampleRate))})`:d.label)})}Ce.onChange(_r);function sh(){Xe.hidden&&(Xe.hidden=!1,Ce.refresh(),_r(),(wa.find(e=>!e.disabled)??da.el).focus())}function $a(e=!1){Xe.hidden||(Xe.hidden=!0,_r(),e&&Zt.focus())}Zt.addEventListener("click",()=>{Xe.hidden?sh():$a()});document.addEventListener("pointerdown",e=>{!Xe.hidden&&!Cp.contains(e.target)&&$a()});Xe.addEventListener("keydown",e=>{if(e.key==="Escape"){e.preventDefault(),$a(!0);return}if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;e.preventDefault();const t=[...wa.filter(r=>!r.disabled),da.el],n=t.indexOf(document.activeElement);t[(n+(e.key==="ArrowDown"?1:t.length-1))%t.length]?.focus()});wa.forEach((e,t)=>e.addEventListener("click",()=>{const n=oh(t);n&&F1(n)}));async function F1(e){$a(!0);const t=await Ce.keep(e,{grid:ih(),bpm:H.bpm()});if(!t){Re("Nothing held to keep");return}Tp=t;const n=URL.createObjectURL(t.blob);I("a",{href:n,download:t.name}).click(),window.setTimeout(()=>URL.revokeObjectURL(n),6e4),Re(`Kept ${Qi(t.seconds)} as a WAV`)}document.addEventListener("keydown",e=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey||e.key!=="k"&&e.key!=="K")return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable)||Zt.disabled||(e.preventDefault(),Xe.hidden?sh():$a(!0))});document.addEventListener("keydown",e=>{if(e.code!=="Space"||e.repeat)return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable)||(e.preventDefault(),Nt.click())});Nn.addEventListener("keydown",e=>{if(e.target===vn)return;const t=B.map(r=>r.id),n=t.indexOf(ze),a=e.key==="ArrowRight"?t[(n+1)%t.length]:e.key==="ArrowLeft"?t[(n-1+t.length)%t.length]:null;a&&(e.preventDefault(),Je(a),document.getElementById(`tab-${a}`)?.focus())});function Pe(){const e=H.running()&&qe.owner()===Ko;Nt.textContent=e?"Stop":"Play",Nt.setAttribute("aria-pressed",String(e)),document.activeElement!==Mn&&(Mn.value=String(Math.round(H.bpm()*10)/10));const t=H.position();yr.value=t?`${t.bar}.${t.beat}`:"—";const n=H.peers().length;Ht.textContent=Q.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",Ut.textContent=Q.state==="running"?"":"Audio off";const a=Ae.state==="arming"||Ae.state==="armed";a&&(Ht.textContent="Rec armed: waiting for sound",Ut.textContent="Rec armed"),Vt.classList.toggle("off",Q.state!=="running");const{done:r,total:i}=xe.counts(),s=!xe.settled(),l=!s&&xr>0&&performance.now()-xr<lh;if(Vt.classList.toggle("loading",s),Vt.classList.toggle("just-ready",l),s)Ht.textContent=`Loading the Studio… ${r} of ${i} instruments ready`,Ut.textContent=`Loading ${r}/${i}`,Vt.classList.remove("off");else if(l&&!a){const d=xe.items().filter(u=>u.state==="failed");Ht.textContent=d.length?`Studio ready: ${d.map(u=>u.brand).join(", ")} didn't load`:"Studio ready: press Play",Ut.textContent="Ready",Vt.classList.remove("off")}go>performance.now()&&(Ht.textContent=mo,Ut.textContent=mo)}const lh=2500;let xr=0;H.clock.onChange(()=>{H.clock.transport.running&&(Ep=!0),N1(),_r(),H.running()||qe.clear(),rh(),Pe()});qe.onChange(Pe);qe.onLastOut(()=>{H.running()&&H.stop(),Pe()});H.clock.onChange(()=>dt?.render());H.peer.onPeers(Pe);Q.addEventListener("statechange",Pe);const I1=.25;let Ac=performance.now();function ch(e){const t=Math.min(.1,(e-Ac)/1e3);Ac=e,dt?.frame(t);const n=H.position(),a=n?`${n.bar}.${n.beat}`:"—";yr.value!==a&&(yr.value=a);const r=H.beatPhase(),i=r!==null&&r<I1;uo.hasAttribute("data-on")!==i&&uo.toggleAttribute("data-on",i),requestAnimationFrame(ch)}const dh=I("ul",{class:"boot-list"}),uh=I("div",{class:"boot-panel"},I("p",{class:"boot-title"},"Loading the Studio"),dh,I("p",{class:"boot-note"},"Play is ready once every instrument is in."));Or.append(uh);let Mc=!1;function jr(){const e=xe.items(),{done:t,total:n}=xe.counts(),a=xe.settled();if(a&&!xr&&(xr=performance.now(),document.documentElement.dataset.studioLoaded="",window.setTimeout(Pe,lh)),Mc){Pe();return}Mc=a,document.documentElement.toggleAttribute("data-studio-loading",!a),ct.style.setProperty("--boot-done",String(n?t/n:1)),Nt.disabled=!a,a?Nt.removeAttribute("data-nc-help"):Nt.setAttribute("data-nc-help",ee["transport:play-loading"]),dh.replaceChildren(...e.map(i=>I("li",{class:"boot-item","data-boot":i.state},I("span",{class:"boot-mark","aria-hidden":"true"}),I("span",{class:"boot-name"},I("span",{class:"boot-brand"},i.brand)," ",I("span",{class:"boot-type"},i.name)),I("span",{class:"boot-word"},N0[i.state]))));for(const i of B){const s=document.getElementById(`tab-${i.id}`),l=a?void 0:e.find(d=>d.id===i.id)?.state;l?s?.setAttribute("data-boot",l):s?.removeAttribute("data-boot")}const r=a||Bp.has(ze);uh.hidden=r,Or.classList.toggle("booting",!r),Pe()}xe.onChange(jr);function P1(e){cs(e.src).then(t=>{const n=new URL(bu(e,Op,t),location.href).href;return fetch(n,{priority:"low"}).then(a=>a.ok?a.text():"").then(a=>{for(const r of z0(a,n))document.head.querySelector(`link[rel="prefetch"][href="${CSS.escape(r)}"]`)||document.head.append(I("link",{rel:"prefetch",href:r}))})}).catch(()=>{})}function R1(){const e=P0(B.map(t=>t.id),ze);R0(e,t=>{if(ia.get(t)?.go(),t===e[0])for(const n of B)n.id!==t&&P1(n);return xe.whenDone(t)},()=>D0()).then(()=>{for(const t of ia.values())t.go();ia.clear()})}async function D1(){const e=document.getElementById("app");if(!e)throw new Error("Missing #app");e.replaceChildren(Pp,ct,zp,ho,I("main",{class:"instruments"},Nn,I("div",{class:"bay"},ua,Or),y1),Ap.el),dt=Gv(ho,le,{order:()=>B.map(t=>t.id),catalogue:jo.filter(t=>t.sound!==!1),bpm:()=>H.bpm(),onAdd:Wp,onRemove:(t,n)=>void Kp(t,n),onReorder:(t,n)=>k1(t,n),onRename:(t,n)=>$1(t,n),...aa?{plugins:aa}:{}});for(const t of B)_p(t);jr(),Q.state==="running"&&await Q.suspend(),await Q.audioWorklet.addModule(Wx),Rp.start(Q,!0),wp(),Ae.attach(),Ce.attach(),await H.start();for(const t of[An.a,An.b,le.masterFx])t&&td(t,H.clock,{mapper:ut});R1(),Je(ze),Pe(),requestAnimationFrame(ch),window.setInterval(()=>le.parkIdleReturns(),ew),document.documentElement.dataset.studioReady="",Vn&&(document.documentElement.dataset.studioReset=Vn),Vn==="reset"?T1():Vn==="undo"?Re("Reset undone"):Vn==="failed"&&Re("Couldn't reset: this browser's storage is full"),O1(),_1(),aa&&tx({ctx:Q,running:()=>Zw([...rs].map(t=>t.getChain())),onFrozen:z1})}async function z1(e){as.add(e.map(a=>a.id)),window.clearTimeout(Tn),ka=!0;const t=e.map(a=>a.name).join(", ");document.documentElement.dataset.pluginsFrozen=e.map(a=>a.id).join(" "),Re(`${t} froze the audio`),await We({title:O.frozenTitle,body:O.frozenBody(t),confirmLabel:O.frozenOpen,cancelLabel:O.frozenStay})&&window.open(location.href,"_blank")}function O1(){const e=new Set(yn.pending());if(!e.size)return;const t=[],n=i=>B.find(s=>s.id===i)?.name??i,a=()=>{window.clearTimeout(r);const i=[...t,...yn.dropPending()].map(n);Re(i.length?`Scene loaded; ${i.join(", ")} kept ${i.length===1?"its":"their"} own sound`:"Scene loaded")};yn.onApplied((i,s)=>{e.delete(i)&&(s||t.push(i),e.size||a())});const r=window.setTimeout(a,B0)}window.__studio={resetTrail:th,ctx:Q,mixer:le,grab:Dr,recorder:Ae,get lastTake(){return Wt?.take??null},keeper:Ce,get lastKeep(){return Tp},limiterDelay:xp,mapper:ut,transport:H,frames:Ve,show:Je,get instances(){return B},fx:An,plugins:aa,frozen:as,channelCores:Rr,get mix(){return dt},situation:va,notes:{bus:Ct,dev:(e,t,n={})=>{const a=Yw(Ct.source(e,e),H.clock,{settings:t});for(const[r,i]of Object.entries(n))a.source.setTarget(r,{role:i.role,on:i.on??!0,...i.octave===void 0?{}:{octave:i.octave}});return a}}};D1();function us(e){Ft.dataset.picker=e,Ft.setAttribute("aria-pressed",String(e==="on"||e==="connecting"||e==="away")),Ft.dataset.ncHelp=ee[`picker:${e}`]}us("off");async function B1(){if(["127.0.0.1","localhost","[::1]"].includes(location.hostname))return"granted";try{return(await navigator.permissions.query({name:"loopback-network"})).state}catch{return"unknown"}}async function _1(){let e=hp(we());const t=new URLSearchParams(location.search).get("picker");if(t!==null){const a=t?ns(t):e.address;a&&(e={on:!0,address:a},so(we(),e))}if(!e.on)return;const n=await B1();n==="granted"||n==="unknown"?Et.start(e.address):us(n==="denied"?"blocked":"ask")}Ft.addEventListener("click",()=>void j1());async function j1(){const e=hp(we()),t=Ft.dataset.picker;if(t==="ask"||t==="blocked"){Et.start(e.address);return}if(Et.status!=="off"){if(!await We({title:"Disconnect the Sample Picker?",body:"Its Send to NYX won't reach this Studio until you connect it again.",confirmLabel:"Disconnect",returnFocus:Ft}))return;so(we(),{...e,on:!1}),Et.stop();return}await We({title:"Connect the Sample Picker?",body:`The Studio talks to the Sample Picker on this computer (${e.address}), so its Send to NYX loads the pads of your NYX here. Chrome may ask to let this site reach this computer: allow it.`,confirmLabel:"Connect",returnFocus:Ft})&&(so(we(),{...e,on:!0}),Et.start(e.address))}
