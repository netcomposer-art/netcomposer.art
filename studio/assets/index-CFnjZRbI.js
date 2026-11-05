(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Dt=1e-9;function Uu(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class vi{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return Uu(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let r=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+Dt&&(r=s.bpm);const i=[{beat:t.beat,time:t.time,bpm:this.clamp(r)}];for(const s of a){if(s.beat<=t.beat+Dt)continue;const l=this.clamp(s.bpm);l!==i[i.length-1].bpm&&i.push({beat:s.beat,time:0,bpm:l})}this.segs=i,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+Dt){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-Dt;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,r=.25){const i=this.bpmAt(n);if(!(a>0)||!(r>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/r));this.setTempoAt(i,n);for(let l=1;l<=s;l++)this.setTempoAt(i+(t-i)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new vi({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+Dt)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+Dt)return n[a];return n[0]}}const Gu=Object.freeze({beatsPerBar:4,beatUnit:4}),Ut=1e-9;function Wu(e){return Math.floor(e+Ut)}function wl(e,t,n=!1){if(!(t>0))return e;const r=Math.ceil(e/t-Ut)*t;return n&&r<=e+Ut?r+t:r}class Ku{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new vi({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??Gu}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-Ut&&(this.stopTime===null||t<this.stopTime-Ut)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-Ut?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=Wu(t/n),r=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:r,barPhase:r/n}}nextBar(t,n=!1){return wl(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const vl="nc-clock/snapshot",xl=1;function Yu(e,t="local"){return{format:vl,version:xl,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function Xu(e,t){const n=Ju(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const Ge=e=>typeof e=="number"&&Number.isFinite(e),Ao=e=>e===null||Ge(e);function Ju(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==vl&&n("format"),(!Ge(t.version)||Math.floor(t.version)!==xl)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!Ge(t.anchor.beat)||!Ge(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&Ge(a.beat)&&Ge(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!Ge(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!Ge(t.meter.beatUnit))&&n("meter"),(!Ao(t.startTime)||!Ao(t.stopTime)||!Ge(t.stoppedBeat))&&n("transport times"),t}class Qu{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new Ku(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){Xu(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return Yu(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const Zu="nc-sync/1",ep=1,tp="nc-sync",np="nc-sync-leader",ap=0,kl=.5,$l=.75;function rp(e){return typeof e=="number"&&Number.isFinite(e)&&e>=kl&&e<=$l?e:null}const nr=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),dn=e=>typeof e=="number"&&Number.isFinite(e),Kn=e=>typeof e=="string"&&e.length>0;function ip(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==ep||!Kn(t.type)||!Kn(t.from)||!dn(t.term)||!dn(t.seq)||!dn(t.sentAt))return null;switch(t.type){case"hello":return Kn(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return dn(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&dn(t.slot)?t:null;case"ping":case"pong":return Kn(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function op(e,t,n,a,r){return{proto:Zu,from:t,term:n,seq:a,sentAt:r,...e}}function Ne(){return(performance.timeOrigin+performance.now())/1e3}const ar=.003,sp=3,rr=.002+1e-6,lp=.01,Mo=500;class cp{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?lp:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=ar&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const r=n-(this.timeOrigin+a)/1e3,i=this.median(),s=r-i,l=Math.abs(r-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!d&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,i,d))):(this.pendingStep=s,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const r=this.heldBase()!==null,i=this.ctx.currentTime,s=i<=this.revertUntil;let l;if(a&&s){const d=this.offsets,u=this.preStep;d.length=0;for(let c=0;c<u.length;c++)d.push(u[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:i,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!s){const c=this.offsets,p=this.preStep;p.length=0;for(let h=0;h<c.length;h++)p.push(c[h]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?i+this.stepRevert:-1/0}const d=this.offsets,u=t-n;for(let c=0;c<d.length;c++)d[c]+=u;this.stepCount++,l={stepSeconds:t-n,confirmedAt:i,reanchors:this.stepCount,revert:!1}}if(!r)for(const d of[...this.stepListeners])d(l);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let i=0;i<a;i++){const s=t[i];let l=i-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const r=a>>1;return a%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const r=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(r&&Number.isFinite(r.contextTime)&&Number.isFinite(r.performanceTime)&&r.contextTime>=ar&&r.performanceTime>0)if(this.waitSince=null,r.contextTime===this.lastStampC&&r.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Mo)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=r.contextTime,this.lastStampP=r.performanceTime,this.stampSince=this.perfNow(),n=r.contextTime-(this.timeOrigin+r.performanceTime)/1e3,a=!0;else if(!r||!(r.contextTime>=ar)&&!(r.contextTime>0&&!(r.performanceTime>0))){if(r){const i=this.perfNow();if(this.waitSince===null&&(this.waitSince=i),i-this.waitSince<Mo)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(sp,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let r=-1,i=0;for(let l=0;l<n;l++){let d=0;for(let u=0;u<n;u++)Math.abs(t[u]-t[l])<=rr&&d++;d>i&&(r=l,i=d)}if(i<a)return;const s=t[r];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>rr&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-this.estimate())<=rr}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const r=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(r,2)};setTimeout(r,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(r)&&r>0?r:null}}const dp="let t=null;onmessage=e=>{clearInterval(t);t=null;if(e.data>0)t=setInterval(()=>postMessage(0),e.data)}";function up(){const e=globalThis;return typeof e.Worker=="function"&&typeof e.Blob=="function"&&typeof e.document=="object"&&typeof e.URL?.createObjectURL=="function"}function pp(e,t={}){const n=t.intervalMs??20,a=t.now??(typeof performance<"u"?()=>performance.now():()=>Date.now());let r=null,i=null,s=null,l=-1/0,d=!1;const u=()=>{if(!d)return;const c=a();c-l<n/2||(l=c,e())};if(t.worker===!0||t.worker!==!1&&up())try{i=URL.createObjectURL(new Blob([dp],{type:"text/javascript"})),r=new Worker(i),r.onmessage=u}catch{r=null,i&&URL.revokeObjectURL(i),i=null}return{get running(){return d},get kind(){return r?"worker+timer":"timer"},start(){d||(d=!0,s=setInterval(u,n),r?.postMessage(n))},stop(){d=!1,s&&clearInterval(s),s=null,r?.postMessage(0)},dispose(){this.stop(),r?.terminate(),r=null,i&&URL.revokeObjectURL(i),i=null}}}class hp{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...nr,...t.capabilities},this.channelOption=t.channel??tp,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const r=this.o.now(),i=()=>{n===this.startWaits&&t(r)};return a.then(i,i),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const r=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(r),0)}else{const r=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?r:Math.max(t+this.o.gatedStartLeadSeconds,r),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[r,i]=this.tempoRange();t=Math.min(i,Math.max(r,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const d=s.beatAt(l+this.o.minLeadSeconds),u=Math.max(n??wl(d,1),d);a&&a>0?(s.tempo.rampTempo(t,u,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,u),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min($l,Math.max(kl,t)):ap;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=rp(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=ip(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...nr,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const i of this.peers.values())i.leader=i.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...nr},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(r=>{this.leader&&this.decideStart(r)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const i=new AbortController;this.lockAbort=i,this.locks.request(np,{signal:i.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===i&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(i,s,l)=>[i?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const i of this.peers.values()){if(!i.capabilities.canLead)continue;const s=n(i.capabilities.prefersLeader,i.joinedAt,i.id);(r===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,r=i.id)}this.setLeader(r===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==r[0]?a[0]<r[0]:a[1]!==r[1]?a[1]<r[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const r=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>r&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(op(t,this.id,this.term,++this.seq,this.o.now()))}}const mp="modulepreload",fp=function(e){return"/studio/"+e},To={},gp=function(t,n,a){let r=Promise.resolve();if(n&&n.length>0){let s=function(u){return Promise.all(u.map(c=>Promise.resolve(c).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),d=l?.nonce||l?.getAttribute("nonce");r=s(n.map(u=>{if(u=fp(u),u in To)return;To[u]=!0;const c=u.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const h=document.createElement("link");if(h.rel=c?"stylesheet":mp,c||(h.as="script"),h.crossOrigin="",h.href=u,d&&h.setAttribute("nonce",d),document.head.appendChild(h),c)return new Promise((f,g)=>{h.addEventListener("load",f),h.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})};var bp=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Dr=[.25,.5,.75,1,1.5,2],yp=4.9,ce={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},xt={fmt:"wet"},Oe={fmt:"pct"},Rt={fmt:"db"},Yn={fmt:"signedPct"},ir={fmt:"num",suffix:" ms"},oe={div:100};function O(e,t,n,a,r,i,s,l){var d={key:e,label:t,min:n,max:a,default:r,step:1,k:i,unit:null,format:s};if(l)for(var u in l)d[u]=l[u];return d}function Xn(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var xn=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[O("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:ce.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[O("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:ce.hpHz,astrid:!0,zero:"off"}),O("q","Resonance",0,100,0,2,{fmt:"q",law:ce.hpQ},{dsp:{law:ce.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[O("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:ce.bpHz,astrid:!0},{dsp:{law:ce.bpHz}}),O("q","Q",0,100,0,2,{fmt:"q",law:ce.bpQ},{dsp:{law:ce.bpQ}}),O("mix","Mix",0,100,100,3,xt,{dsp:oe,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[O("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Xn(bp),overriddenBy:"beats_free",tempoSynced:!0}),O("feedback","Feedback",0,90,35,2,Oe,{dsp:oe,unit:"%"}),O("mix","Wet/dry",0,100,0,3,xt,{dsp:oe,unit:"%",astridKey:"wet"}),O("tone","Tone",0,100,100,4,{fmt:"hz",law:ce.delayTone,offAt:100},{dsp:{div:99},more:!0}),O("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),O("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Xn([[0,"Insert"],[1,"Send"]]),more:!0}),O("send","Send",0,100,100,7,Oe,{dsp:oe,unit:"%",more:!0}),O("mod_send","Accent → send",-100,100,0,8,Yn,{dsp:oe,unit:"%",more:!0}),O("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[O("predelay","Pre-delay",0,200,0,1,ir,{dsp:{div:1e3},unit:"ms"}),O("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:oe,unit:"%"}),O("decay","Decay",0,100,50,3,Oe,{dsp:oe,unit:"%"}),O("damping","Damping",0,100,0,4,Oe,{dsp:oe,unit:"%"}),O("mix","Mix",0,100,0,5,xt,{dsp:oe,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[O("rate","Rate",0,100,26,1,{fmt:"rate",law:ce.rate},{dsp:{law:ce.rate}}),O("depth","Depth",0,100,70,2,Oe,{dsp:oe,unit:"%"}),O("feedback","Feedback",-90,90,50,3,Yn,{dsp:oe,unit:"%"}),O("mix","Mix",0,100,50,4,xt,{dsp:oe,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[O("rate","Rate",0,100,52,1,{fmt:"rate",law:ce.rate},{dsp:{law:ce.rate}}),O("depth","Depth",0,100,50,2,Oe,{dsp:oe,unit:"%"}),O("spread","Spread",0,100,70,3,Oe,{dsp:oe,unit:"%"}),O("mix","Mix",0,100,40,4,xt,{dsp:oe,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[O("rate","Rate",0,100,39,1,{fmt:"rate",law:ce.rate},{dsp:{law:ce.rate}}),O("depth","Depth",0,100,70,2,Oe,{dsp:oe,unit:"%"}),O("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Xn([[4,"4"],[6,"6"],[8,"8"]])}),O("feedback","Feedback",0,90,30,4,Oe,{dsp:oe,unit:"%"}),O("mix","Mix",0,100,50,5,xt,{dsp:oe,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[O("low_db","Low",-18,18,0,1,Rt,{unit:"dB"}),O("mid_db","Mid",-18,18,0,2,Rt,{unit:"dB"}),O("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:ce.midHz,astrid:!0},{dsp:{law:ce.midHz}}),O("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:ce.eqQ},{dsp:{law:ce.eqQ}}),O("high_db","High",-18,18,0,4,Rt,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[O("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),O("output_db","Output",-12,12,0,2,Rt,{unit:"dB"}),O("mix","Mix",0,100,100,3,xt,{dsp:oe,unit:"%"}),O("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Xn([[0,"Smooth"],[1,"Acid"]]),more:!0}),O("tone","Tone",0,100,100,5,{fmt:"hz",law:ce.driveTone,offAt:100},{dsp:{div:99},more:!0}),O("mod_drive","Accent → drive",-100,100,0,6,Yn,{dsp:oe,unit:"%",more:!0}),O("mod_tone","Accent → tone",-100,100,0,7,Yn,{dsp:oe,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[O("threshold_db","Threshold",-60,0,0,1,Rt,{unit:"dB"}),O("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:ce.ratio},{dsp:{law:ce.ratio}}),O("attack_ms","Attack",1,100,10,3,ir,{unit:"ms"}),O("release_ms","Release",10,1e3,150,4,ir,{unit:"ms"}),O("makeup_db","Makeup",0,24,0,5,Rt,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[O("width","Width",0,200,100,1,Oe,{dsp:oe,unit:"%"}),O("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:oe})]}],wp=xn.map(function(e){return e.type}),vp=xn.filter(function(e){return!e.hidden}).map(function(e){return e.type}),xp={reverb:"plate"},Jt={},El=[],kn=[];function kp(e){Jt[e.type]||El.push(e.type),Jt[e.type]=e;for(var t=0;t<kn.length;t++)try{kn[t](e.type)}catch(n){typeof console<"u"&&console.error(n)}}function $p(){return El.map(function(e){return Jt[e]})}function Ep(e){return kn.push(e),function(){var t=kn.indexOf(e);t>=0&&kn.splice(t,1)}}function Sl(e){return typeof e=="string"&&/^plugin:[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(e)&&e.length<=71}function xi(e){var t=xp[e]||e;return wp.indexOf(t)>=0||typeof t=="string"&&Jt[t]?t:null}function de(e){for(var t=xi(e),n=0;n<xn.length;n++)if(xn[n].type===t)return xn[n];return t&&Jt[t]?Jt[t]:null}function Sp(e,t){var n=de(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function qt(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function ga(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=qt(n.law,t);return a===null?0:a}function Lo(e,t){return Math.min(yp,e*60/(t>0?t:120))}var Co=function(e){return e>0?"+":e<0?"−":""};function Ap(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function Al(e,t,n){var a=e.format,r;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:Co(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return Co(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(r=qt(a.law,t),r===null?a.zero||"open":a.astrid?Ap(r):r+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+qt(a.law,t).toFixed(1);case"ratio":return qt(a.law,t).toFixed(1)+":1";case"rate":return r=qt(a.law,t),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var i=0;i<e.options.length;i++)if(e.options[i].value===t)return e.options[i].label;return String(t);case"tempoMs":return Math.round(Lo(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(Lo(t,n)*1e3)+" ms"}return String(t)}var Mp=1,ja=["drive","delay","plate"];function Tp(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,r){return Al(e,a,r)},t}var Gt=ja.map(function(e){var t=de(e),n={type:e,label:t.label,dials:t.dials.map(Tp)};return t.tempoSynced&&(n.tempoSynced=!0),n}),Lp={reverb:"plate"};function ba(e){var t=Lp[e]||e;return ja.indexOf(t)>=0?t:null}function _a(e){for(var t=ba(e),n=0;n<Gt.length;n++)if(Gt[n].type===t)return Gt[n];return null}function Ml(e,t){var n=_a(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function Qt(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function Ye(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,r=1;r<e.options.length;r++)Math.abs(e.options[r].value-t)<Math.abs(a-t)&&(a=e.options[r].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var i=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*i)/i))+0}function Cp(){return{v:Mp,chain:Gt.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function Np(e){return Dr.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},Dr[0])}function or(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Fp(e){for(var t=Array.isArray(e)?e:or(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=Cp(),r={},i=[],s=0;s<t.length;s++){var l=t[s];if(or(l)){var d=ba(l.type);if(!d){typeof l.type=="string"&&i.push(l.type);continue}if(r[d]){i.push(d);continue}r[d]=!0;var u=a.chain[ja.indexOf(d)],c=or(l.dials)?l.dials:{};d==="delay"&&c.mix===void 0&&c.wet!==void 0&&(c=Object.assign({},c,{mix:c.wet})),u.bypass=n?l.bypass===!0:l.bypass!==!1,_a(d).dials.forEach(function(p){u.dials[p.key]=Ye(p,c[p.key])}),Ip(d,u.dials,c)}}return{state:a,dropped:i}}function Ip(e,t,n){for(var a=_a(e),r=0;r<a.dials.length;r++){var i=a.dials[r];i.stepWhen&&(t[i.key]=Ye(i,n&&typeof n[i.key]=="number"?n[i.key]:t[i.key],Qt(i,t)))}}function ya(e){return Fp(e).state}function Pp(e){return JSON.parse(JSON.stringify(e))}var zp=24,Rr={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Or(e,t,n){if(t==="bypass")return n?0:1;var a=Ml(e,t)||Dp(e,t);return a?ga(a,n):0}function Dp(e,t){var n=de(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var Rp={};Gt.forEach(function(e){e.dials.forEach(function(t){Rp[e.type+"."+t.key]=t.format})});function sr(e,t){var n=new Float64Array(zp),a=ya(e);return a.chain.forEach(function(r){var i=Rr[r.type];n[i.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[i[s]]=Or(r.type,s,r.dials[s])})}),n}var Op="__ncFxLoop",Bp=/^(?:return|typeof|instanceof|in|of|new|delete|void|throw|case|do|else|yield|await)$/,No=/[A-Za-z_$\u0080-\uffff]/,lr=/[A-Za-z0-9_$\u0080-\uffff]/;function jp(e){var t=[],n=0,a=e.length,r=[],i,s;function l(){var h=t.length?t[t.length-1]:null;return h?h.t==="name"?Bp.test(h.v):h.t==="num"||h.t==="str"||h.t==="tpl"||h.t==="re"?!1:h.v!==")"&&h.v!=="]":!0}function d(){for(var h=n-1;n<a;){if(i=e[n],i==="\\"){n+=2;continue}if(i==="`"){n++,t.push({t:"tpl",v:"",s:h,e:n});return}if(i==="$"&&e[n+1]==="{"){n+=2,r.push("tpl"),t.push({t:"tpl",v:"",s:h,e:n});return}n++}t.push({t:"tpl",v:"",s:h,e:a})}for(;n<a;){if(i=e[n],i===" "||i==="	"||i===`
`||i==="\r"||i==="\f"||i==="\v"||i===" "||i==="\uFEFF"||i==="\u2028"||i==="\u2029"){n++;continue}if(i==="/"&&e[n+1]==="/"){for(;n<a&&e[n]!==`
`&&e[n]!=="\r";)n++;continue}if(i==="/"&&e[n+1]==="*"){var u=e.indexOf("*/",n+2);n=u<0?a:u+2;continue}if(s=n,i==='"'||i==="'"){for(n++;n<a&&e[n]!==i&&e[n]!==`
`;)n+=e[n]==="\\"?2:1;n++,t.push({t:"str",v:"",s,e:n});continue}if(i==="`"){n++,d();continue}if(i==="/"&&l()){n++;for(var c=!1;n<a;){if(i=e[n],i==="\\"){n+=2;continue}if(i===`
`)break;if(c)i==="]"&&(c=!1);else if(i==="[")c=!0;else if(i==="/"){n++;break}n++}for(;n<a&&lr.test(e[n]);)n++;t.push({t:"re",v:"",s,e:n});continue}if(No.test(i)||i==="\\"){for(n++;n<a&&(lr.test(e[n])||e[n]==="\\");)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(i==="#"&&n+1<a&&No.test(e[n+1])){for(n+=2;n<a&&lr.test(e[n]);)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(i>="0"&&i<="9"||i==="."&&e[n+1]>="0"&&e[n+1]<="9"){for(n++;n<a&&/[0-9A-Za-z_.]/.test(e[n]);)(e[n]==="e"||e[n]==="E")&&(e[n+1]==="+"||e[n+1]==="-")&&!/^0[xX]/.test(e.slice(s,n))&&n++,n++;t.push({t:"num",v:"",s,e:n});continue}if(i==="{")r.push("{");else if(i==="}"){var p=r.pop();if(p==="tpl"){n++,d();continue}}if(i==="?"&&e[n+1]==="."&&!(e[n+2]>="0"&&e[n+2]<="9")){n+=2,t.push({t:"p",v:"?.",s,e:n});continue}if(i==="."&&e[n+1]==="."&&e[n+2]==="."){n+=3,t.push({t:"p",v:"...",s,e:n});continue}n++,t.push({t:"p",v:i,s,e:n})}return t}function _p(e,t){for(var n=0,a=t;a<e.length;a++){var r=e[a].t==="p"?e[a].v:"";if(r==="("||r==="["||r==="{")n++;else if((r===")"||r==="]"||r==="}")&&(n--,n===0))return r===")"?a:-1}return-1}function qp(e){for(var t=String(e),n=jp(t),a=[],r=Op+"()",i=0;i<n.length;i++){var s=n[i];if(!(s.t!=="name"||s.v!=="while"&&s.v!=="for")){var l=i>0?n[i-1]:null;if(!(l&&l.t==="p"&&(l.v==="."||l.v==="?."))){var d=i+1;if(!(s.v==="for"&&n[d]&&n[d].t==="name"&&n[d].v==="await")&&!(!n[d]||n[d].t!=="p"||n[d].v!=="(")){var u=_p(n,d);if(!(u<0)){if(s.v==="while"){if(u===d+1)continue;a.push([n[d].e,r+" && ("],[n[u].s,")"]);continue}for(var c=[],p=0,h=d+1;h<u;h++){var f=n[h].t==="p"?n[h].v:"";f==="("||f==="["||f==="{"?p++:f===")"||f==="]"||f==="}"?p--:f===";"&&p===0&&c.push(h)}c.length===2&&(c[1]===c[0]+1?a.push([n[c[0]].e," "+r]):a.push([n[c[0]].e," "+r+" && ("],[n[c[1]].s,")"]))}}}}}if(!a.length)return t;a.sort(function(b,v){return b[0]-v[0]});for(var g="",w=0,m=0;m<a.length;m++)g+=t.slice(w,a[m][0])+a[m][1],w=a[m][0];return g+t.slice(w)}var cr=1,Fo=15,Tl=/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/,Vp=/^[a-z][a-z0-9_]{0,31}$/,Ll=/^\d+\.\d+\.\d+$/,Cl=/^[A-Za-z0-9.+-]+(?: (?:AND|OR|WITH) [A-Za-z0-9.+-]+)*$/,Hp=/^[A-Za-z0-9_-][A-Za-z0-9._-]{0,63}\.js$/,Io=["$schema","ncPlugin","id","name","version","author","licence","description","website","keywords","dsp","params"],Po=["id","label","type","defaultValue","minValue","maxValue","discreteStep","exponent","choices","units","more"],wa={1:"It failed to start.",2:"It crashed while playing.",3:"It made bad numbers (NaN, infinity or runaway level).",4:"It crashed when a dial moved.",5:"Its code is not loaded.",6:"It got stuck in a loop, so it was stopped."};function $n(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ot(e){return typeof e=="number"&&isFinite(e)}function kt(e,t){return typeof e=="string"&&e.trim().length>0&&e.length<=t}function qa(e){var t=[],n=e,a=function(l,d){t.push(l+": "+d)};if(!$n(n))return{ok:!1,errors:["manifest: must be a JSON object"],manifest:null};Object.keys(n).forEach(function(l){Io.indexOf(l)<0&&a(l,"unknown field (allowed: "+Io.slice(1).join(", ")+")")}),n.ncPlugin!==cr&&a("ncPlugin","must be "+cr),(typeof n.id!="string"||!Tl.test(n.id)||n.id.length>64)&&a("id",'lowercase letters and digits, with dots or dashes between, up to 64 (e.g. "yourname.tremolo")'),kt(n.name,40)||a("name","a name of 1 to 40 characters"),(typeof n.version!="string"||!Ll.test(n.version))&&a("version",'x.y.z, e.g. "1.0.0"'),kt(n.author,80)||a("author","who made it, 1 to 80 characters"),(typeof n.licence!="string"||!Cl.test(n.licence)||n.licence.length>64)&&a("licence",'an SPDX licence id, e.g. "MIT"'),n.description!==void 0&&!(typeof n.description=="string"&&n.description.length<=200)&&a("description","up to 200 characters"),n.website!==void 0&&!(typeof n.website=="string"&&/^https:\/\/\S+$/.test(n.website)&&n.website.length<=2048)&&a("website","an https:// address"),n.keywords!==void 0&&!(Array.isArray(n.keywords)&&n.keywords.length<=8&&n.keywords.every(function(l){return kt(l,24)}))&&a("keywords","up to 8 short strings"),(typeof n.dsp!="string"||!Hp.test(n.dsp))&&a("dsp",`the DSP file's name, in the same folder as plugin.json, ending in .js (e.g. "tremolo.dsp.js")`);var r=[];if(!Array.isArray(n.params))a("params","a list of params (may be empty)");else if(n.params.length>Fo)a("params","at most "+Fo);else{var i={};n.params.forEach(function(l,d){var u="params["+d+"]";if(!$n(l)){a(u,"must be an object");return}Object.keys(l).forEach(function(h){Po.indexOf(h)<0&&a(u+"."+h,"unknown field (allowed: "+Po.join(", ")+")")}),typeof l.id!="string"||!Vp.test(l.id)||l.id==="bypass"?a(u+".id",'lowercase, starting with a letter: letters, digits, _ (not "bypass")'):i[l.id]?a(u+".id",'"'+l.id+'" is used twice'):i[l.id]=!0,kt(l.label,24)||a(u+".label","the dial's name, 1 to 24 characters");var c=l.type===void 0?"float":l.type;if(["float","int","boolean","choice"].indexOf(c)<0){a(u+".type","float, int, boolean or choice");return}var p={id:l.id,label:l.label,type:c};if(c==="choice"){if(!Array.isArray(l.choices)||l.choices.length<2||l.choices.length>16||!l.choices.every(function(h){return kt(h,24)})){a(u+".choices","2 to 16 names");return}p.choices=l.choices.slice(),p.minValue=0,p.maxValue=l.choices.length-1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==p.maxValue)&&a(u,"a choice's values are 0 to choices.length - 1: leave out minValue and maxValue")}else if(c==="boolean")p.minValue=0,p.maxValue=1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==1)&&a(u,"a boolean is 0 or 1: leave out minValue and maxValue");else{if(!Ot(l.minValue)||!Ot(l.maxValue)||!(l.minValue<l.maxValue)){a(u,"minValue and maxValue: numbers, minValue < maxValue");return}p.minValue=l.minValue,p.maxValue=l.maxValue,l.discreteStep!==void 0&&!(Ot(l.discreteStep)&&l.discreteStep>0&&l.discreteStep<=l.maxValue-l.minValue)&&a(u+".discreteStep","a number > 0, at most the range"),p.discreteStep=c==="int"?Math.max(1,Math.round(l.discreteStep||1)):Ot(l.discreteStep)&&l.discreteStep>0?l.discreteStep:Up(l.maxValue-l.minValue),c==="int"&&(!Number.isInteger(l.minValue)||!Number.isInteger(l.maxValue))&&a(u,"an int has whole-number minValue and maxValue")}l.defaultValue===void 0?p.defaultValue=p.minValue:!Ot(l.defaultValue)||l.defaultValue<p.minValue||l.defaultValue>p.maxValue?a(u+".defaultValue","a number from "+p.minValue+" to "+p.maxValue):p.defaultValue=l.defaultValue,l.units!==void 0&&(typeof l.units=="string"&&l.units.length<=8?p.units=l.units:a(u+".units",'up to 8 characters, e.g. "Hz", "ms", "%", "dB"')),l.exponent!==void 0&&(Ot(l.exponent)&&l.exponent>0?p.exponent=l.exponent:a(u+".exponent","a number > 0")),l.more!==void 0&&(typeof l.more=="boolean"?l.more&&(p.more=!0):a(u+".more","true or false")),r.push(p)})}if(t.length)return{ok:!1,errors:t,manifest:null};var s={ncPlugin:cr,id:n.id,name:n.name.trim(),version:n.version,author:n.author.trim(),licence:n.licence,dsp:n.dsp,params:r};return n.description&&(s.description=n.description),n.website&&(s.website=n.website),n.keywords&&(s.keywords=n.keywords.slice()),{ok:!0,errors:[],manifest:s}}function Up(e){var t=Math.pow(10,Math.floor(Math.log10(e/100)));return t<.001?.001:t>1?1:+t.toFixed(3)}function Gp(e){for(var t=0;t<3&&Math.abs(Math.round(e*Math.pow(10,t))-e*Math.pow(10,t))>1e-9;)t++;return t}function Va(e){return"plugin:"+e}function Wp(e,t){var n=e,a=t||{},r=n.params.map(function(s,l){var d={key:s.id,label:s.label,min:s.minValue,max:s.maxValue,default:s.defaultValue,step:s.discreteStep,k:l+1,unit:s.units||null,format:null};if(s.type==="choice"||s.type==="boolean"){var u=s.type==="choice"?s.choices:["Off","On"];d.step=null,d.options=u.map(function(p,h){return{value:h,label:p}}),d.format={fmt:"option"}}else{var c=s.units?/^[%°×]/.test(s.units)?s.units:" "+s.units:"";d.format={fmt:"fixed",div:1,add:0,digits:Gp(s.discreteStep),suffix:c}}return s.more&&(d.more=!0),d}),i={type:Va(n.id),label:n.name,dials:r,plugin:{id:n.id,version:n.version,author:n.author,licence:n.licence,engine:"plugin:"+n.id+"@"+n.version,idBase:n.id.split(".").pop(),url:typeof a.url=="string"?a.url:"",listed:a.listed===!0}};return n.description&&(i.note=n.description),n.website&&(i.plugin.website=n.website),i}function Nl(e,t){var n=qa(e);if(!n.ok)throw new Error("nc-fx plugin: "+n.errors.join("; "));var a=de(Va(n.manifest.id));if(a&&a.plugin.version!==n.manifest.version)throw new Error("nc-fx plugin: "+n.manifest.id+" "+a.plugin.version+" is already loaded on this page; reload to use "+n.manifest.version);if(a)return a;var r=Wp(n.manifest,t);return kp(r),r}async function Fl(e){var t=globalThis.crypto&&globalThis.crypto.subtle;if(!t)throw new Error("nc-fx plugin: no WebCrypto here (integrity needs a secure context: https or localhost)");for(var n=new Uint8Array(await t.digest("SHA-256",e)),a="",r=0;r<n.length;r++)a+=String.fromCharCode(n[r]);return"sha256-"+btoa(a)}function Kp(e){if(e.protocol!=="https:"&&!(e.protocol==="http:"&&/^(localhost|127\.0\.0\.1|\[::1\])$/.test(e.hostname)))throw new Error("nc-fx plugin: load plugins over https (http only from localhost): "+e.href)}async function zo(e,t,n,a){var r=await t(e,{credentials:"omit",cache:"no-cache"});if(!r.ok)throw new Error("nc-fx plugin: "+a+" "+e+" answered "+r.status);var i=new Uint8Array(await r.arrayBuffer());if(n){var s=await Fl(i);if(s!==n)throw new Error("nc-fx plugin: "+a+" "+e+" does not match the registry (expected "+n+", got "+s+")")}return new TextDecoder().decode(i)}var Jn=typeof WeakMap=="function"?new WeakMap:null;function Il(e,t){var n=new Error("nc-fx plugin: "+e.name+" "+t+" is already loaded on this page. Reload the page to use "+e.version+".");return n.reload=!0,n}async function Pl(e,t,n,a,r){var i=t.id+"@"+t.version,s=Jn&&Jn.get(e);!s&&Jn&&(s={},Jn.set(e,s));var l=s&&s[i];if(l){var d=await l,u=await n();return{stale:u!==d}}var c=(async function(){var p=await n();await jl(e,r);var h=URL.createObjectURL(new Blob([qp(p)+`
//# sourceURL=`+a+`
`],{type:"text/javascript"}));try{await e.audioWorklet.addModule(h)}finally{URL.revokeObjectURL(h)}return p})();return s&&(s[i]=c,c.catch(function(){delete s[i]})),await c,{stale:!1}}async function zl(e,t,n){var a=n||{},r=new URL(String(t),a.base||(typeof location<"u"?location.href:void 0));Kp(r);var i=a.fetch||globalThis.fetch.bind(globalThis),s=a.integrity||{},l=await zo(r.href,i,s.manifest,"plugin.json"),d;try{d=JSON.parse(l)}catch{throw new Error("nc-fx plugin: "+r.href+" is not JSON")}var u=qa(d);if(!u.ok)throw new Error("nc-fx plugin: "+r.href+": "+u.errors.join("; "));var c=u.manifest;if(a.expect&&(a.expect.id&&a.expect.id!==c.id||a.expect.version&&a.expect.version!==c.version))throw new Error("nc-fx plugin: "+r.href+" is "+c.id+" "+c.version+", not what the registry lists");var p=de(Va(c.id));if(p&&p.plugin.version!==c.version)throw Il(c,p.plugin.version);var h=new URL(c.dsp,r),f=await Pl(e,c,function(){return zo(h.href,i,s.dsp,"DSP file")},h.href,a.moduleUrl),g=Nl(c,{url:r.href,listed:a.listed===!0});return{entry:g,manifest:c,url:r.href,stale:f.stale}}var Yp=256*1024;async function Do(e,t,n){var a=n||{},r=t||{},i=r.manifest;if(typeof i=="string")try{i=JSON.parse(i)}catch{throw new Error("nc-fx plugin: plugin.json is not JSON")}var s=qa(i);if(!s.ok)throw new Error("nc-fx plugin: plugin.json: "+s.errors.join("; "));var l=s.manifest;if(typeof r.dsp!="string"||!r.dsp.trim())throw new Error("nc-fx plugin: "+l.name+" needs its DSP file, "+l.dsp);if(typeof r.dspName=="string"&&r.dspName!==l.dsp)throw new Error("nc-fx plugin: plugin.json names its DSP file "+l.dsp+", not "+r.dspName);if(new TextEncoder().encode(r.dsp).length>Yp)throw new Error("nc-fx plugin: "+l.dsp+" is over 256 KB");var d=typeof a.url=="string"&&a.url?a.url:"local:"+l.id,u=de(Va(l.id));if(u&&u.plugin.version!==l.version)throw Il(l,u.plugin.version);var c=r.dsp,p=await Pl(e,l,async function(){return c},d.replace(/[^A-Za-z0-9:._@\/-]/g,"_")+"/"+l.dsp,a.moduleUrl),h=Nl(l,{url:d,listed:!1});return{entry:h,manifest:l,url:d,stale:p.stale}}function Xp(e){var t=[];if(!$n(e)||e.v!==1||!Array.isArray(e.plugins))return{ok:!1,errors:['registry: { "v": 1, "plugins": [...] }'],registry:{v:1,plugins:[]}};var n=[],a={};return e.plugins.forEach(function(r,i){var s="plugins["+i+"]",l=[];if(!$n(r)){t.push(s+": must be an object");return}if((typeof r.id!="string"||!Tl.test(r.id))&&l.push("id"),kt(r.name,40)||l.push("name"),(typeof r.version!="string"||!Ll.test(r.version))&&l.push("version"),kt(r.author,80)||l.push("author"),(typeof r.licence!="string"||!Cl.test(r.licence))&&l.push("licence"),(typeof r.manifest!="string"||!r.manifest)&&l.push("manifest"),(!$n(r.integrity)||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(r.integrity.manifest||"")||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(r.integrity.dsp||""))&&l.push("integrity"),(typeof r.checked!="string"||!/^\d{4}-\d{2}-\d{2}/.test(r.checked))&&l.push("checked"),a[r.id]&&l.push("id (listed twice)"),l.length){t.push(s+": bad "+l.join(", "));return}a[r.id]=!0;var d={id:r.id,name:r.name,version:r.version,author:r.author,licence:r.licence,manifest:r.manifest,integrity:{manifest:r.integrity.manifest,dsp:r.integrity.dsp},checked:r.checked};typeof r.description=="string"&&(d.description=r.description.slice(0,200)),n.push(d)}),{ok:t.length===0,errors:t,registry:{v:1,plugins:n}}}async function Jp(e,t){var n=t||{},a=new URL(String(e),n.base||(typeof location<"u"?location.href:void 0)),r=await(n.fetch||globalThis.fetch.bind(globalThis))(a.href,{credentials:"omit",cache:"no-cache"});if(!r.ok)throw new Error("nc-fx plugins: the registry "+a.href+" answered "+r.status);var i=Xp(await r.json());return{registry:i.registry,url:a.href,errors:i.errors}}function Qp(e,t,n,a){return zl(e,new URL(t.manifest,n).href,Object.assign({},a,{integrity:t.integrity,listed:!0,expect:{id:t.id,version:t.version}}))}function Zp(e,t){var n=t||{},a=n.stallMs>0?n.stallMs:1500,r=n.everyMs>0?n.everyMs:250,i=n.now||function(){return typeof performance<"u"?performance.now():Date.now()},s=n.setInterval||setInterval,l=n.clearInterval||clearInterval,d=e.currentTime,u=i(),c=0,p=!1,h=s(function(){var f=i(),g=f-u,w=e.currentTime;if(u=f,e.state!=="running"||w!==d){d=w,c=0,p&&e.state==="running"&&(p=!1,n.onResume&&n.onResume());return}if(g>4*r){c=0;return}c+=g,!p&&c>=a&&(p=!0,n.onStall&&n.onStall({frozenMs:c,at:w}))},r);return{stop:function(){l(h)},stalled:function(){return p}}}var eh=2,va=3,Ro=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function $t(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var th=/^local:[A-Za-z0-9._@-]{1,200}$/,nh=/^\d+\.\d+\.\d+$/;function ah(e,t){var n=$t(e)?e:{},a=t.slice(7),r={id:a,version:typeof n.version=="string"&&nh.test(n.version)?n.version:"0.0.0",url:"",name:a};return typeof n.url=="string"&&n.url.length<=2048&&(/^https?:\/\//.test(n.url)||th.test(n.url))&&(r.url=n.url),typeof n.name=="string"&&n.name.trim()&&(r.name=n.name.trim().slice(0,40)),r}function Dl(e){var t=e.plugin;return{id:t.id,version:t.version,url:t.url,name:e.label}}function rh(e){var t={},n=0;if($t(e))for(var a in e)n<16&&/^[a-z][a-z0-9_]{0,31}$/.test(a)&&typeof e[a]=="number"&&isFinite(e[a])&&(t[a]=e[a],n++);return t}function ih(e){return e.plugin?e.plugin.idBase:e.type}function Rl(e,t){var n=de(e);if(!n)return null;var a={};(t||[]).forEach(function(d){d&&d.id&&(a[d.id]=!0)});for(var r=1,i=ih(n);a[i+"-"+r];)r++;var s={};n.dials.forEach(function(d){s[d.key]=d.default});var l={id:i+"-"+r,type:n.type,bypass:!1,dials:s};return n.plugin&&(l.plugin=Dl(n)),l}function oh(e){var t=de(e.type),n=/-(\d+)$/.exec(e.id||""),a=t?t.label:e.plugin&&e.plugin.name?e.plugin.name:e.type;return a+(n&&+n[1]>1?" "+n[1]:"")}function sh(e,t,n){var a=e.length-1,r=Math.max(0,Math.min(a,n));if(t<0||t>a||t===r)return e;var i=e.slice(),s=i.splice(t,1)[0];return i.splice(r,0,s),i}function lh(e){return typeof e=="number"&&isFinite(e)?Np(e):e}function Oo(e,t,n){var a={};return e.dials.forEach(function(r){var i=t[r.key];i===void 0&&r.astridKey&&(i=t[r.astridKey]),n&&e.type==="delay"&&r.key==="delay_beats"&&(i=lh(i)),a[r.key]=e.plugin?Ye(r,i,r.step):Ye(r,i)}),e.dials.forEach(function(r){r.stepWhen&&(a[r.key]=Ye(r,typeof t[r.key]=="number"?t[r.key]:a[r.key],Qt(r,a)))}),a}function ch(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,r=1/0,i=e.min;i<=e.max;i++){var s=qt(n.law,i),l=s===null?1/0:Math.abs(s-t);l<r&&(r=l,a=i)}return a}}var dh={rate:"rate_hz"};function uh(e,t,n,a){var r={};return e.dials.forEach(function(i){if(!i.more){var s=i.astridKey||dh[i.key]||i.key;r[i.key]=ch(i,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function ph(e,t){var n=t>0?Math.floor(t):va,a=[],r=[],i=[],s=!1,l=!1;Array.isArray(e)?(i=e,l=!0):$t(e)&&Array.isArray(e.chain)&&(i=e.chain,s=e.v===1,l=e.schema===2);for(var d=[],u=0;u<i.length;u++){var c=i[u];if($t(c)&&!(c.type==="limiter"||c.fixed===!0)){var p=xi(c.type),h=p&&de(p);if(!h&&!s&&Sl(c.type)){if(d.length>=n){a.push(c.id||c.type);continue}for(var f=ah(c.plugin,c.type),g=f.id.split(".").pop(),w=1;d.some(function(x){return x.id===g+"-"+w});)w++;var m=typeof c.id=="string"&&Ro.test(c.id)&&!d.some(function(x){return x.id===c.id})?c.id:g+"-"+w;d.push({id:m,type:c.type,bypass:c.bypass===!0,dials:rh(c.dials),plugin:f});continue}if(!h||s&&["drive","delay","plate"].indexOf(p)<0){typeof c.type=="string"&&a.push(c.type);continue}if(d.length>=n){a.push(c.id||p);continue}var b;$t(c.params)&&!$t(c.dials)?b=Oo(h,uh(h,c.params,r,c.id||p),l):b=Oo(h,$t(c.dials)?c.dials:{},l);var v=Rl(p,d),y=typeof c.id=="string"&&Ro.test(c.id)&&!d.some(function(x){return x.id===c.id})?c.id:v.id,T=s?c.bypass!==!1:c.bypass===!0,A={id:s?v.id:y,type:p,bypass:T,dials:b};h.plugin&&(A.plugin=Dl(h)),d.push(A)}}return{state:{v:eh,chain:d},dropped:a,notes:r}}function St(e,t){return ph(e,t).state}function Bt(e){var t=de(e.type),n=[[0,e.bypass?0:1]];return t&&t.dials.forEach(function(a){n.push([a.k,ga(a,e.dials[a.key])])}),n}function hh(e){var t=St(e,8),n=[],a=t.chain.filter(function(r){return r.plugin?(n.push(r.id+": ASTRID has no plugins"),!1):!0}).map(function(r,i){var s=de(r.type),l={};return i>=va&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(d){var u=r.dials[d.key];if(d.more){u!==d.default&&n.push(r.id+"."+d.key);return}d.key==="delay_beats"&&Dr.indexOf(u)<0&&n.push(r.id+".delay_beats"),l[d.astridKey||d.key]=u}),{id:r.id,type:r.type,bypass:r.bypass,dials:l}});return{hacks:a,lossy:n}}var mh=150,fh=6e3,gh=18,Ol=6.283185307179586;function Ha(e,t,n){return e<t?t:e>n?n:e}function bh(e,t,n,a,r){var i=Math.pow(10,n/40),s=Ol*t/r,l=Math.cos(s),d=Math.sin(s),u,c,p,h,f,g,w,m;if(e===0||e===2){w=d/2*Math.SQRT2,m=2*Math.sqrt(i)*w;var b=e===0?1:-1;u=i*(i+1-b*(i-1)*l+m),c=b*2*i*(i-1-b*(i+1)*l),p=i*(i+1-b*(i-1)*l-m),h=i+1+b*(i-1)*l+m,f=-b*2*(i-1+b*(i+1)*l),g=i+1+b*(i-1)*l-m}else w=d/(2*a),u=1+w*i,c=-2*l,p=1-w*i,h=1+w/i,f=-2*l,g=1-w/i;return[u/h,c/h,p/h,f/h,g/h]}function yh(e,t,n){var a=Ol*t/n,r=Math.cos(a),i=Math.sin(a),s=Math.cos(2*a),l=Math.sin(2*a),d=e[0]+e[1]*r+e[2]*s,u=-(e[1]*i+e[2]*l),c=1+e[3]*r+e[4]*s,p=-(e[3]*i+e[4]*l);return 10*Math.log10((d*d+u*u)/(c*c+p*p))}var Bo={};function bt(e){return Bo[e]||(Bo[e]=Sp("eq",e))}function _t(e,t){var n=bt(t),a=e&&typeof e[t]=="number"&&isFinite(e[t])?e[t]:n.default;return Ha(a,n.min,n.max)}function Bl(e){return[{id:"low",kind:0,hz:mh,db:_t(e,"low_db"),q:Math.SQRT1_2},{id:"mid",kind:1,hz:ga(bt("mid_hz"),_t(e,"mid_hz")),db:_t(e,"mid_db"),q:ga(bt("mid_q"),_t(e,"mid_q"))},{id:"high",kind:2,hz:fh,db:_t(e,"high_db"),q:Math.SQRT1_2}]}function wh(e,t,n){for(var a=Bl(e),r=n.length,i=new Float64Array(r),s=[],l=t/2,d=0;d<a.length;d++){var u=a[d],c=new Float64Array(r);if(u.db!==0)for(var p=bh(u.kind,u.hz,u.db,u.q,t),h=0;h<r;h++){var f=n[h]<l?n[h]:l*.9999;c[h]=yh(p,f,t),i[h]+=c[h]}s.push(c)}return{total:i,bands:s}}function vh(e){var t=bt("mid_hz").dsp.law;return Ha(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}function xh(e){var t=bt("mid_q").dsp.law;return Ha(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}var xa={low:"low_db",mid:"mid_db",high:"high_db"},kh={low:"Low",mid:"Mid",high:"High"};function $h(e,t,n){var a=[];function r(i,s){var l=bt(i),d=l.step||1;s=Ha(Math.round(s/d)*d,l.min,l.max),s===0&&(s=0),s!==_t(e,i)&&a.push([i,s])}return typeof n.db=="number"&&xa[t]&&r(xa[t],n.db),t==="mid"&&typeof n.hz=="number"&&n.hz>0&&r("mid_hz",vh(n.hz)),t==="mid"&&typeof n.q=="number"&&n.q>0&&r("mid_q",xh(n.q)),a}function Eh(e){var t=e==="mid"?["mid_db","mid_hz","mid_q"]:xa[e]?[xa[e]]:[];return t.map(function(n){return[n,bt(n).default]})}var Qn=typeof WeakMap=="function"?new WeakMap:null;function Sh(e){var t=e&&e.output;if(!t||!t.context||typeof t.context.createAnalyser!="function")return null;var n=Qn&&Qn.get(e);return n||(n={node:null,users:0,handle:null},n.handle={open:function(){return e.status==="disposed"?null:(n.node||(n.node=t.context.createAnalyser(),n.node.fftSize=4096,n.node.smoothingTimeConstant=.8,n.node.minDecibels=-110,n.node.maxDecibels=0),n.users++===0&&t.connect(n.node),n.node)},close:function(){if(n.users!==0&&--n.users===0&&n.node)try{t.disconnect(n.node)}catch{}}},Qn&&Qn.set(e,n)),n.handle}function Ah(e,t,n){var a=n||{},r={};["low_db","mid_db","mid_hz","mid_q","high_db"].forEach(function(c){var p=e&&typeof e.getParam=="function"?e.getParam(t,c):void 0;r[c]=typeof p=="number"?p:bt(c).default});var i=e&&e.output&&e.output.context,s=a.sampleRate||i&&i.sampleRate||48e3,l=a.help||{},d=Bl(r).map(function(c){var p=(c.db>0?"+":c.db<0?"−":"")+Math.abs(c.db)+" dB",h=c.hz>=1e3?(c.hz/1e3).toFixed(c.hz>=1e4?0:1)+" kHz":Math.round(c.hz)+" Hz";return{id:c.id,label:kh[c.id],kind:c.kind===0?"lowshelf":c.kind===1?"peak":"highshelf",hz:c.hz,db:c.db,q:c.q,moveHz:c.id==="mid",moveQ:c.id==="mid",minHz:c.id==="mid"?200:c.hz,maxHz:c.id==="mid"?5e3:c.hz,minQ:.3,maxQ:6,valueText:c.id==="mid"?p+" at "+h+", Q "+c.q.toFixed(1):p+(c.id==="low"?", shelf below ":", shelf above ")+h,help:l[c.id]}}),u=function(c){for(var p=0;p<c.length;p++)a.set(c[p][0],c[p][1])};return{type:"eqGraph",id:a.id,label:a.label||"EQ curve",range:gh,sampleRate:s,on:a.on!==!1,bands:d,help:l.graph,response:function(c){return wh(r,s,c)},spectrum:a.spectrum===!1?void 0:Sh(e)||void 0,onBand:function(c,p){u($h(r,c,p))},onReset:function(c){u(Eh(c).filter(function(p){return p[1]!==r[p[0]]}))}}}var Mh="nc-fx@1",Th=600,Lh=256,Ch=8,un=typeof WeakMap=="function"?new WeakMap:null;function jl(e,t){var n=un&&un.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await gp(async()=>{const{default:i}=await import("./worklet-source-Dvdj1jcP.js");return{default:i}},[])).default,r=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),un&&(un.set(e,n),n.catch(function(){un.delete(e)})),n)}function jt(e,t){return typeof e=="number"&&isFinite(e)?e:t}function _l(e,t,n,a){var r=Math.min(400,Math.max(20,jt(t.bpm,120))),i=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",d=jt(t.preGain,1),u=Math.max(0,jt(t.crossfade,.012)),c=jt(t.maxDelaySeconds,void 0),p=e.createGain(),h=e.createGain(),f=e.createGain(),g=e.createGain(),w=null;t.modInput===!0&&(w=e.createGain(),w.channelCount=1,w.channelCountMode="explicit",w.channelInterpretation="discrete"),g.gain.value=0,p.connect(f),f.connect(h),g.connect(h);var m={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r,mUsers:0,lv:null,lvAt:0},b=n(r);m.post=function(x){m.node?m.node.port.postMessage(x):m.disposed||(i.length>=Lh&&(i=a().concat([{t:"tempo",bpm:m.bpm,when:0}]),m.mUsers>0&&i.push({t:"meter",on:!0})),i.push(x))};function v(x){var k=i.map(function(M){var S=Object.assign({},M);return S.when>x||(S.when=0,S.t!=="clear"&&(S.snap=!0)),S});return i=[],k}m.emit=function(x){for(var k=0;k<m.listeners.length;k++)try{m.listeners[k](x)}catch(M){typeof console<"u"&&console.error(M)}},m.whenOf=function(x){return typeof x=="number"&&isFinite(x)&&x>0?x:0};var y=!1;m.tooFar=function(x){return typeof x=="number"&&x>e.currentTime+Th?(!y&&typeof console<"u"&&(y=!0,console.warn("nc-fx: ignoring a time "+Math.round(x-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var T=jl(e,t.moduleUrl).then(function(){if(!m.disposed){var x=Object.assign({bpm:r,bypassMode:l,limiter:s,preGain:d,maxDelaySeconds:c},b);x.pending=v(e.currentTime),m.node=new AudioWorkletNode(e,Mh,{numberOfInputs:w?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:x}),m.node.port.onmessage=function(M){var S=M.data;if(S&&S.t==="lv"&&m.mUsers>0)m.lv=S.d,m.lvAt=jo();else if(S&&S.t==="perr"&&m.onPluginError&&S.d)for(var C=0;C<(S.n|0);C++)m.onPluginError(S.d[2*C],S.d[2*C+1])},p.connect(m.node),w&&w.connect(m.node,0,1),m.node.connect(g);var k=e.currentTime;k<=0||u===0?(f.gain.value=0,g.gain.value=1):(f.gain.setValueAtTime(1,k),f.gain.linearRampToValueAtTime(0,k+u),g.gain.setValueAtTime(0,k),g.gain.linearRampToValueAtTime(1,k+u)),m.status="ready"}},function(x){m.status="unavailable",i=[],m.error=x});m.meterOpen=function(){return m.disposed||m.status==="unavailable"?!1:(m.mUsers++===0&&m.post({t:"meter",on:!0}),!0)},m.meterClose=function(){m.mUsers!==0&&--m.mUsers===0&&(m.lv=null,m.disposed||m.post({t:"meter",on:!1}))},m.levels=function(){return m.lv&&jo()-m.lvAt<Nh?m.lv:null};var A={};return m.meter=function(x,k){if(A[x])return A[x];var M=0,S={in:0,out:0},C={open:function(){return m.meterOpen()?(M++,!0):!1},close:function(){M!==0&&(M--,m.meterClose())},read:function(){var F=M>0?m.levels():null;return S.in=0,S.out=0,F&&k(F,S),S}};return A[x]=C,C},m.core={input:p,output:h,modInput:w,ready:T,get status(){return m.status},get error(){return m.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function(x,k){var M=jt(x,NaN);!(M>0)||m.disposed||m.tooFar(k)||(m.bpm=Math.min(400,Math.max(20,M)),m.post({t:"tempo",bpm:m.bpm,when:m.whenOf(k)}),m.emit({effect:null,key:"tempo",value:m.bpm}))},getTempo:function(){return m.bpm},clear:function(x){var k=x&&typeof x=="object"?x:{at:x};if(!(m.disposed||m.tooFar(k.at))){var M=jt(k.fadeMs,0);m.post({t:"clear",when:m.whenOf(k.at),fadeMs:M>0?Math.min(1e3,M):0})}},onChange:function(x){return m.listeners.push(x),function(){var k=m.listeners.indexOf(x);k>=0&&m.listeners.splice(k,1)}},dispose:function(){if(!m.disposed){if(m.disposed=!0,m.status="disposed",i=[],m.listeners.length=0,m.node){m.node.port.postMessage({t:"dispose"}),m.node.port.close();try{m.node.disconnect()}catch{}}[p,f,g,h,w].forEach(function(x){try{x&&x.disconnect()}catch{}})}}},m}var Nh=250;function jo(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function ql(e,t){t.in=e[0],t.out=e[1]}function dr(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function ur(e,t){var n=t||{};if(n.slots)return Fh(e,n);var a=ya(n.state),r=Array.from(sr(a)),i=_l(e,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(sr(a)),when:0}]}),s=i.core;function l(d){return a.chain[ja.indexOf(d)]}return s.setParam=function(d,u,c,p){var h=ba(d);if(!(!h||i.disposed||i.tooFar(p))){var f=l(h),g;if(u==="bypass")g=!!c;else{var w=Ml(h,u);if(!w)return;g=Ye(w,c,Qt(w,f.dials))}return u==="bypass"?f.bypass=g:f.dials[u]=g,i.post({t:"p",i:Rr[h][u],v:Or(h,u,g),when:i.whenOf(p)}),i.emit({effect:h,key:u,value:g}),_a(h).dials.forEach(function(m){if(!(!m.stepWhen||!m.stepWhen.some(function(y){return y.key===u}))){var b=f.dials[m.key],v=Ye(m,b,Qt(m,f.dials));v!==b&&(f.dials[m.key]=v,i.post({t:"p",i:Rr[h][m.key],v:Or(h,m.key,v),when:i.whenOf(p)}),i.emit({effect:h,key:m.key,value:v}))}}),g}},s.meter=function(){return i.meter("",ql)},s.getParam=function(d,u){var c=ba(d);if(c){var p=l(c);return u==="bypass"?p.bypass:p.dials[u]}},s.getState=function(){return Pp(a)},s.setState=function(d,u){i.disposed||i.tooFar(u&&u.at)||(a=ya(d),i.post({t:"load",program:Array.from(sr(a)),when:i.whenOf(u&&u.at)}),i.emit({effect:null,key:null,value:null}))},s}function Fh(e,t){var n=t.slots===!0?va:Math.max(1,Math.min(Ch,Math.floor(+t.slots)||va)),a=St(t.state,n),r=1,i={},s={};function l(x){return!Sl(x.type)||de(x.type)!==null}function d(x){var k=de(x.type);return k&&k.plugin?k.plugin.engine:x.type}function u(x){return i[x.id]||(i[x.id]=r++),i[x.id]}function c(x){return x.filter(l).map(function(k){return{uid:u(k),type:d(k),program:Bt(k)}})}function p(){return a.chain.filter(l).map(function(x){return i[x.id]})}var h=c(a.chain),f=p(),g=_l(e,t,function(){return{slots:n,chain:h,order:f}},function(){return[{t:"sync",chain:c(a.chain),order:p(),when:0}]}),w=g.core;g.onPluginError=function(x,k){for(var M in i)i[M]===x&&(s[M]=k,g.emit({effect:M,key:"error",value:k}))};function m(x){var k;for(k=0;k<a.chain.length;k++)if(a.chain[k].id===x)return a.chain[k];var M=xi(x);if(M){for(k=0;k<a.chain.length;k++)if(a.chain[k].type===M)return a.chain[k]}return null}function b(x,k){var M=u(x);g.post({t:"add",uid:M,type:d(x),when:k}),Bt(x).forEach(function(S){g.post({t:"ps",uid:M,k:S[0],v:S[1],when:k,snap:!0})})}function v(x){g.post({t:"order",uids:p(),when:x})}function y(x,k){var M={};a.chain.forEach(function(F){M[F.id]=F});var S=p().join();x.chain.forEach(function(F){var q=M[F.id];if(!l(F)){delete i[F.id];return}if(!q||q.type!==F.type||!i[F.id]){delete i[F.id],delete s[F.id],b(F,k);return}var U={};Bt(q).forEach(function(X){U[X[0]]=X[1]}),Bt(F).forEach(function(X){U[X[0]]!==X[1]&&g.post({t:"ps",uid:i[F.id],k:X[0],v:X[1],when:k})})});var C={};x.chain.forEach(function(F){C[F.id]=!0}),Object.keys(i).forEach(function(F){C[F]||delete i[F]}),Object.keys(s).forEach(function(F){C[F]||delete s[F]}),a=x,p().join()!==S&&v(k)}var T=Ep(function(x){if(!(g.disposed||!a.chain.some(function(M){return M.type===x}))){var k=JSON.parse(JSON.stringify(a));k.chain=k.chain.map(function(M){return M.type===x?St({v:2,chain:[M]},1).chain[0]:M}),y(k,0),g.emit({effect:null,key:"plugin",value:x})}}),A=w.dispose;return w.dispose=function(){T(),A()},w.slots=n,w.meter=function(x){return x==null||x===""?g.meter("",ql):g.meter("#"+x,function(k,M){var S=m(x),C=S?i[S.id]:0,F=k[2];if(C){for(var q=3,U=0;U<F;U++,q+=3)if(k[q]===C){M.in=k[q+1],M.out=k[q+2];return}}})},w.setParam=function(x,k,M,S){var C=m(x);if(!(!C||g.disposed||g.tooFar(S))){var F=de(C.type),q,U=null;if(!F)return k!=="bypass"?void 0:(C.bypass=!!M,g.emit({effect:C.id,key:k,value:C.bypass}),C.bypass);if(k==="bypass")q=!!M;else{for(var X=0;X<F.dials.length;X++)F.dials[X].key===k&&(U=F.dials[X]);if(!U)return;q=Ye(U,M,Qt(U,C.dials))}var fe={},ge={};Bt(C).forEach(function(G){fe[G[0]]=G[1]}),F.dials.forEach(function(G){G.stepWhen&&(ge[G.key]=C.dials[G.key])}),k==="bypass"?C.bypass=q:C.dials[k]=q,F.dials.forEach(function(G){G.stepWhen&&(C.dials[G.key]=Ye(G,C.dials[G.key],Qt(G,C.dials)))});var re=g.whenOf(S),ie=i[C.id];return ie&&Bt(C).forEach(function(G){(fe[G[0]]!==G[1]||U&&G[0]===U.k)&&g.post({t:"ps",uid:ie,k:G[0],v:G[1],when:re})}),g.emit({effect:C.id,key:k,value:q}),Object.keys(ge).forEach(function(G){G!==k&&C.dials[G]!==ge[G]&&g.emit({effect:C.id,key:G,value:C.dials[G]})}),q}},w.getParam=function(x,k){var M=m(x);if(M)return k==="bypass"?M.bypass:M.dials[k]},w.getState=function(){return JSON.parse(JSON.stringify(a))},w.setState=function(x,k){g.disposed||g.tooFar(k&&k.at)||(y(St(x,n),g.whenOf(k&&k.at)),g.emit({effect:null,key:null,value:null}))},w.addEffect=function(x,k){var M=k||{},S=Rl(x,a.chain);if(!(!S||a.chain.length>=n||g.disposed||g.tooFar(M.at))){if(M.dials){var C=St({v:2,chain:[{id:S.id,type:S.type,dials:M.dials}]},1).chain[0];S.dials=C.dials}M.bypass===!0&&(S.bypass=!0);var F=a.chain.slice(),q=typeof M.index=="number"?Math.max(0,Math.min(F.length,M.index)):F.length;return F.splice(q,0,S),y({v:2,chain:F},g.whenOf(M.at)),g.emit({effect:S.id,key:"chain",value:"add"}),S.id}},w.removeEffect=function(x,k){var M=m(x),S=k&&k.at;return!M||g.disposed||g.tooFar(S)?!1:(y({v:2,chain:a.chain.filter(function(C){return C!==M})},g.whenOf(S)),g.emit({effect:M.id,key:"chain",value:"remove"}),!0)},w.moveEffect=function(x,k,M){var S=m(x),C=M&&M.at;if(!S||g.disposed||g.tooFar(C))return!1;var F=sh(a.chain,a.chain.indexOf(S),k);return F===a.chain?!1:(y({v:2,chain:F},g.whenOf(C)),g.emit({effect:S.id,key:"chain",value:"move"}),!0)},w.getChain=function(){return a.chain.map(function(x){var k={id:x.id,type:x.type,name:oh(x),bypass:x.bypass};if(x.plugin){var M=s[x.id]||0,S=!l(x)||M===5;k.plugin={id:x.plugin.id,version:x.plugin.version,url:x.plugin.url,name:x.plugin.name,status:S?"missing":M?"failed":"ready"},M&&!S&&(k.plugin.error=wa[M]||wa[2])}return k})},w.toAstrid=function(){return hh(a)},w}function _o(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function Vl(e,t,n){var a=n||{},r=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,i=typeof a.toAudioTime=="function"?a.toAudioTime:r?function(h){return r.toContextTime(h)}:t&&t.timebase==="shared"?null:function(h){return h},s=typeof a.now=="function"?a.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,l=t&&t.transport?t.transport:t,d=l&&l.tempo?l.tempo:l,u=!1;function c(h){if(!i){!u&&typeof console<"u"&&(u=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof h!="number")){var f=i(l.timeAt(h));return typeof f=="number"&&isFinite(f)?f:void 0}}function p(){var h=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(h)){var f=l&&typeof l.bpm=="number"?l.bpm:_o(d,0);f>0&&e.setTempo(f);return}var g=_o(d,h);g>0&&e.setTempo(g);for(var w=d&&(d.points||d.tempoPoints)||[],m=0;m<w.length;m++){var b=w[m];if(b.beat>h&&b.bpm>0){var v=c(b.beat);v!==void 0&&e.setTempo(b.bpm,v)}}}return p(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(h){h&&(h.kind==="tempo"&&h.bpm>0?e.setTempo(h.bpm,c(h.atBeat)):(h.kind==="snapshot"||h.kind==="start")&&p())})}const En="/studio/assets/worklet-C1cegAfk.js";var Ih="nc-ui",Ph={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FF2E97","nyx-amber":"#FEAA02","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},ki={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#9B30FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FF2E97","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},ka={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},zh={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},pt={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Dh={light:{color:Ph.color,semantic:ki,component:ka,runtime:zh},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FF2E97","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FF2E97","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},gn=e=>`--${Ih}-${e}`,Br=ki["label-on-fill-dark"],qo=ki["label-on-fill-light"],Rh=pt["label-min-contrast"],Oh=/^#[0-9a-f]{6}$/i,Bh=e=>typeof e=="string"&&Oh.test(e),da=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Vo(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),r=i=>{let s=(i+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${da(r(0)*255)}${da(r(8)*255)}${da(r(4)*255)}`}function Hl(e){let[t,n,a]=[1,3,5].map(u=>parseInt(e.slice(u,u+2),16)/255),r=Math.max(t,n,a),i=Math.min(t,n,a),s=(r+i)/2,l=r-i;if(!l)return{h:0,s:0,l:s};let d=l/(1-Math.abs(2*s-1));return{h:((r===t?60*((n-a)/l%6):r===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:d,l:s}}function Ho(e){let[t,n,a]=[1,3,5].map(r=>{let i=parseInt(e.slice(r,r+2),16)/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function jr(e,t){let[n,a]=[Ho(e),Ho(t)].sort((r,i)=>i-r);return(n+.05)/(a+.05)}var $a=e=>jr(e,Br)>=jr(e,qo)?Br:qo;function Ul(e,t,n,a=Rh){let r=Vo(e,t,n),i=$a(r)===Br?1:-1;for(let s=0;s<40&&jr(r,$a(r))<a;s++)n+=i*.01,r=Vo(e,t,n);return r}function jh(e){let{h:t,s:n}=Hl(e),a=Ul(t,Math.min(n,pt["surprise-on-max-saturation"]),pt["surprise-on-lightness"]);return{fill:e,ink:$a(e),on:a,onInk:$a(a)}}var _h=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function qh(e,t=Math.random){let[n,a]=pt["surprise-saturation"],[r,i]=pt["surprise-lightness"],s=pt["surprise-min-hue-gap"],l=Bh(e)?Hl(e).h:null,d=t()*360;return l!==null&&_h(d,l)<s&&(d=(l+s+t()*(360-2*s))%360),Ul(d,n+t()*(a-n),r+t()*(i-r))}function Vh(e){if(!e)return null;let t=jh(e);return{[gn("surprise-fill")]:t.fill,[gn("surprise-ink")]:t.ink,[gn("surprise-on")]:t.on,[gn("surprise-on-ink")]:t.onInk}}var Hh=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Uh=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Uo(e){let[t,n,a]=[1,3,5].map(l=>Hh(parseInt(e.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),i=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*r+.793617785*i-.0040720468*s,1.9779984951*r-2.428592205*i+.4505937099*s,.0259040371*r+.7827717662*i-.808675766*s]}function Gh([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,r=(e-.1055613458*t-.0638541728*n)**3,i=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*r+.2309699292*i,-1.2684380046*a+2.6097574011*r-.3413193965*i,-.0041960863*a-.7034186147*r+1.707614701*i].map(s=>da(Uh(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Wh=pt["velocity-range"],Gl={min:ka.rhythm["velocity-min"],max:ka.rhythm["velocity-max"]},Go=Object.fromEntries(Object.entries(Dh).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Kh(e,t=Gl){let[n,a]=Wh,r=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,i=(r-n)/(a-n),s=t.ink??ka.rhythm["step-cell-ink"];if(i<=0)return{velocity:r,t:0,fill:t.min.toUpperCase(),ink:s};if(i>=1)return{velocity:r,t:1,fill:t.max.toUpperCase(),ink:s};let l=Uo(t.min),d=Uo(t.max);return{velocity:r,t:i,fill:Gh(l.map((u,c)=>u+(d[c]-u)*i)),ink:s}}function Wo(e,t=Gl){return{[gn("velocity-fill")]:Kh(e,t).fill}}var Ea="data-nc-theme",_r="nc-ui-theme-change",Yh=Object.freeze(["system","light","dark"]),Xh="netcomposer.studio.theme.v1",Jh="(prefers-color-scheme: dark)",$i=e=>e?.documentElement??null,Wl=e=>e?.defaultView?.matchMedia?.(Jh)??null,Ei=e=>e==="light"||e==="dark"?e:"system";function Qh(e=globalThis.document){return Ei($i(e)?.getAttribute(Ea))}function Sa(e=globalThis.document){let t=Qh(e);return t!=="system"?t:Wl(e)?.matches?"dark":"light"}function Si(e,t=globalThis.document){let n=$i(t);if(!n)return"light";let a=Ei(e);a==="system"?n.removeAttribute(Ea):n.setAttribute(Ea,a);let r=Sa(t),i=t.defaultView?.CustomEvent;return i&&t.dispatchEvent(new i(_r,{detail:{choice:a,theme:r}})),r}function Kl(e,t=globalThis.document){let n=$i(t);if(!n)return()=>{};let a=Sa(t),r=()=>{let d=Sa(t);d!==a&&(a=d,e(d))},i=t.defaultView?.MutationObserver,s=i?new i(r):null;s?.observe(n,{attributes:!0,attributeFilter:[Ea]});let l=Wl(t);return l?.addEventListener?.("change",r),t.addEventListener(_r,r),()=>{s?.disconnect(),l?.removeEventListener?.("change",r),t.removeEventListener(_r,r)}}var Zh={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},em={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},tm={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},nm={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Ua={};for(let[e,t]of Object.entries(em))Ua[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(nm))Ua[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(tm))Ua[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(Zh.renames.map(e=>[e.old,e.new]));function Yl(e){let t=Ua[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function te(e){return Yl(e).prop}function o(e){return`var(${te(e)})`}function am(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(te(t)));return Number.isFinite(n)?n:0}function me(e,t){let n=Yl(t),a=e.ownerDocument??document,r=a.createElement("span");r.dataset.ncLive=t,r.style.position="absolute",r.style.pointerEvents="none";let i=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=i:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=i:r.style.color=i,(e instanceof Element?e:a.documentElement).append(r);let s=(a.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function Xl(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function rm(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=o("font-ui"),n.style.fontSize=o("label-size"),n.style.fontWeight=o("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var im="[data-modulated], [data-modulated] *",Jl="(orientation: landscape) and (max-height: 500px) and (max-width: 1023px)";function pr(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function Ko(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${o("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${o("hairline")} solid ${o("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function om(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${o(`module-bg-stack-${a}`)};
      ${te("text-sub")}: ${o(`module-sub-stack-${a}`)};
      ${te("divider")}: ${o(`module-div-stack-${a}`)};
      ${te("slider-track")}: ${o(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${o(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${o(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${o("module-bg-stack-1")};
      ${te("text-sub")}: ${o("module-sub-stack-1")};
      ${te("divider")}: ${o("module-div-stack-1")};
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
${im} { transition: none; }
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
  ${te("text-sub")}: ${o("module-sub-stack-1")};
  ${te("divider")}: ${o("module-div-stack-1")};
  ${te("slider-track")}: ${o("module-div-stack-1")};
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
  ${te("text-sub")}: ${o("module-sub-stack-1")};
  ${te("divider")}: ${o("module-div-stack-1")};
  ${te("slider-track")}: ${o("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${o("control-gap")} ${o("module-pad")};
  padding-bottom: ${o("module-pad")};
  background: ${o("module-bg-stack-1")};
  ${te("text-sub")}: ${o("module-sub-stack-1")};
  ${te("divider")}: ${o("module-div-stack-1")};
  ${te("slider-track")}: ${o("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${o("stack-card-pad-y")} ${o("module-pad")} ${o("module-pad")};
  ${te("text-sub")}: inherit;
  ${te("divider")}: inherit;
  ${te("slider-track")}: inherit;
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
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${te("divider")}: color-mix(in oklab, ${o("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${te("meter-track")}: color-mix(in oklab, ${o("text-sub")} 30%, var(--nc-strip-shade)); }
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
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${te("divider")}: ${o("strip-divider")}; }
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
${Ko("")}
}
@media (max-width: 1023px) {
${Ko("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${pr("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${pr("")}
}
@media (max-width: 1023px) {
${pr("html[data-nc-landscape] ")}
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
`}var hr=null,sm="nc-ui-fallback";function Ql(e=globalThis.document){if(!e?.documentElement||(e.documentElement,hr&&hr.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${sm} {
${om()}
}
`,e.head.append(t),hr=t}var pn=null,lm=0,cm=new URL("/studio/assets/confirm-BSJWrX8s.css",import.meta.url).href,Zl=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=cm,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Zl(document);function Xe(e){return ec(e).then(t=>!!t.ok)}function ec({title:e,body:t,confirmLabel:n="Confirm",cancelLabel:a="Cancel",danger:r=!1,root:i,returnFocus:s,signal:l},d){if(pn||l?.aborted)return Promise.resolve({});let u=i?.ownerDocument??document,c=Zl(u),p=i??u.body,h=u.defaultView??globalThis,f=`nc-ui-confirm-${++lm}`,g=(K,be,ve)=>{let pe=u.createElement(K);return pe.className=`nc-ui-confirm${be}`,ve!=null&&(pe.textContent=ve),pe},w=g("div","-layer");w.dataset.state="enter";let m=g("div","");m.setAttribute("role","alertdialog"),m.setAttribute("aria-modal","true"),m.setAttribute("aria-labelledby",`${f}-t`),m.setAttribute("aria-describedby",`${f}-b`);let b=g("h2","-title",e);b.id=`${f}-t`;let v=g("p","-body",t);v.id=`${f}-b`;let y=g("div","-actions"),T=(K,be)=>{let ve=g("button","-btn",K);return ve.type="button",ve.dataset.ncConfirm=be,ve.addEventListener("click",()=>ze(be==="ok")),ve},A=T(a,"cancel"),x=T(n,"ok");r&&(x.dataset.danger="true"),y.append(A,x);let[k,M]=d?.(g,x)??[];m.append(b,v,...k?[k]:[],y);let S=[M,A,x].filter(Boolean);w.append(m);let C={layer:w};pn=C;let F=s??u.activeElement,q=[];for(let K of p.children)K.hasAttribute("inert")||(K.setAttribute("inert",""),q.push(K));let U=()=>{if(pn!==C)return;p.append(w),(M??A).focus({preventScroll:!0});let K=h.requestAnimationFrame?.bind(h)??(be=>setTimeout(be,16));K(()=>K(()=>{w.dataset.state==="enter"&&(w.dataset.state="open")}))};c?c.then(U):U();let X=!1;w.addEventListener("pointerdown",K=>{X=K.target===w}),w.addEventListener("click",K=>{K.target===w&&X&&ze(!1),X=!1});let fe=K=>{if(K.stopImmediatePropagation(),K.key==="Escape")K.preventDefault(),ze(!1);else if(K.key==="Tab"){K.preventDefault();let be=S.filter(pe=>!pe.disabled),ve=be.length;be[(be.indexOf(u.activeElement)+(K.shiftKey?ve-1:1))%ve].focus()}else K.key==="Enter"&&(K.preventDefault(),u.activeElement===A?ze(!1):x.disabled||ze(!0))},ge=K=>K.stopImmediatePropagation();h.addEventListener("keydown",fe,!0),h.addEventListener("keyup",ge,!0);let re=()=>ze(!1);l?.addEventListener("abort",re);let ie,G=new Promise(K=>{ie=K});function ze(K){if(pn!==C)return;pn=null,h.removeEventListener("keydown",fe,!0),h.removeEventListener("keyup",ge,!0),l?.removeEventListener("abort",re);for(let De of q)De.removeAttribute("inert");w.dataset.state="closing",F?.isConnected&&typeof F.focus=="function"&&F.focus({preventScroll:!0});let be=h.getComputedStyle?.(w),ve=Math.max(0,...String(be?.transitionDuration??"").split(",").map(De=>Number.parseFloat(De)*(De.trim().endsWith("ms")?1:1e3)||0)),pe=()=>w.remove();w.addEventListener("transitionend",De=>De.target===w&&pe()),setTimeout(pe,ve+50),ie({ok:K,value:M?.value.trim()})}return G}function dm(e){let t=e.field??{};return ec(e,(n,a)=>{let r=n("label","-field"),i=n("input","-input");i.type=t.type??"text",i.value=t.value??"",t.placeholder&&(i.placeholder=t.placeholder),i.spellcheck=!1,i.autocomplete="off";let s=()=>{a.disabled=i.value.trim()===""};return i.addEventListener("input",s),s(),r.append(n("span","-label",t.label??""),i),[r,i]}).then(n=>n.ok?n.value:null)}function Ai(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.dataset.ncOn="",r.textContent=e.onText??"On";let i=t.createElement("span");i.dataset.ncOff="",i.textContent=e.offText??"Off",a.append(r,i),n.append(a);let s=!1,l=u=>{s=u===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let d=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",d),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",d),n.remove()}}}var tc=new WeakMap,Yo=.25;function um(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(a,r);let i=0,s=e.step??.005,l=e.onChange,d=e.onReset,u=m=>Math.min(1,Math.max(0,m)),c=()=>{n.style.setProperty("--fader-pos",String(i)),n.setAttribute("aria-valuenow",String(Math.round(i*1e3)/1e3))},p=m=>{let b=u(m);b!==i&&(i=b,c(),l?.(b))},h=0,f=!1;n.addEventListener("pointerdown",m=>{if(m.button!==0)return;m.preventDefault(),n.focus?.({preventScroll:!0});let b=n.getBoundingClientRect();m.target!==r&&b.height>0&&p(1-(m.clientY-b.top)/b.height),h=m.clientY,f=!0,n.dataset.dragging="true",n.setPointerCapture?.(m.pointerId)}),n.addEventListener("pointermove",m=>{if(!f)return;let b=n.getBoundingClientRect().height||1,v=(h-m.clientY)/b*(m.shiftKey?Yo:1);h=m.clientY,p(i+v)});let g=()=>{f=!1,delete n.dataset.dragging};n.addEventListener("pointerup",g),n.addEventListener("pointercancel",g),n.addEventListener("lostpointercapture",g),n.addEventListener("dblclick",m=>{m.preventDefault(),d?.()}),n.addEventListener("keydown",m=>{let b=m.shiftKey?s*Yo:s,v={ArrowUp:i+b,ArrowRight:i+b,ArrowDown:i-b,ArrowLeft:i-b,PageUp:i+s*10,PageDown:i-s*10,Home:0,End:1};m.key in v&&(m.preventDefault(),p(v[m.key]))});let w={el:n,get value(){return i},get dragging(){return f},set(m){f||(i=u(Number(m)||0),c())},setText(m){m?n.setAttribute("aria-valuetext",m):n.removeAttribute("aria-valuetext")},setLabel(m){n.setAttribute("aria-label",m)},configure(m){typeof m.step=="number"&&m.step>0&&(s=m.step),m.onChange&&(l=m.onChange),m.onReset&&(d=m.onReset)}};return w.setLabel(e.label),w.set(e.value??0),w.setText(e.valueText),tc.set(n,w),w}function pm(e){return tc.get(e)}var nc=new WeakMap,hm=.2,mm=1.5,fm=.5;function gm(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function Xo(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:gm(a.getComputedStyle(e).getPropertyValue(te(t)),n)}function bm(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let r=t.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let i=t.createElement("div");i.className="nc-meter-bars",i.setAttribute("aria-hidden","true");let s=[];for(let w=0;w<n;w++){let m=t.createElement("span");m.className="nc-meter-bar";let b=t.createElement("span");b.className="nc-meter-peak";let v=t.createElement("span");v.className="nc-meter-rms";let y=t.createElement("span");y.className="nc-meter-hold",m.append(b,v,y),i.append(m),s.push({peak:b,rms:v,hold:y,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(r,i);let l=e.label,d=e.onClear,u=!1,c=-1,p=-1,h=()=>{r.dataset.lit=u?"true":"false",r.setAttribute("aria-pressed",u?"true":"false"),r.setAttribute("aria-label",u?`${l} clipped: clear`:`${l} clip light`),r.title=u?"Clipped. Click to clear":"Clip light"},f=(w,m,b,v)=>{let y=Math.round(v*1e3)/1e3;b[m]!==y&&(b[m]=y,w.style.transform=m==="hold"?`translateY(${Math.round((1-y)*1e3)/10}%)`:`scaleY(${y})`)};r.addEventListener("click",()=>{g.clear(),d?.()});let g={el:a,get clipped(){return u},update(w,m){c<0&&(c=Xo(a,"motion-meter-fall",hm)),p<0&&(p=Xo(a,"motion-meter-hold",mm));let b=Math.max(0,Math.min(.25,Number(m)||0)),v=c>0?Math.exp(-b/c):0;s.forEach((y,T)=>{let A=w[T]??w[0]??{peak:0,rms:0},x=Math.min(1,Math.max(0,Number(A.peak)||0)),k=Math.min(x,Math.max(0,Number(A.rms)||0));A.over&&g.clip(),y.level.peak=x>=y.level.peak?x:x+(y.level.peak-x)*v,y.level.rms=k>=y.level.rms?k:k+(y.level.rms-k)*v,y.holdAge+=b,x>=y.holdAt?(y.holdAt=x,y.holdAge=0):y.holdAge>p&&(y.holdAt=Math.max(x,y.holdAt-fm*b)),f(y.peak,"peak",y.shown,y.level.peak),f(y.rms,"rms",y.shown,y.level.rms),f(y.hold,"hold",y.shown,y.holdAt),y.hold.dataset.off=y.holdAt<=.001?"true":"false"})},clip(){u||(u=!0,h())},clear(){u=!1,h()},reset(){for(let w of s)w.level.peak=0,w.level.rms=0,w.holdAt=0,w.holdAge=0,f(w.peak,"peak",w.shown,0),f(w.rms,"rms",w.shown,0),f(w.hold,"hold",w.shown,0),w.hold.dataset.off="true"},setLabel(w){l=w,h()},configure(w){w.onClear&&(d=w.onClear)}};return h(),g.reset(),nc.set(a,g),g}function ac(e){return e?nc.get(e):void 0}var ym=3,wm=new Set(["freq","q","rate","time","log"]);function Mi(e,t,n){return!e||!wm.has(e)||!(n>t)?"linear":t>0?"log":"power"}function Ga(e,t,n){return Mi(e,t,n)!=="linear"}function Aa(e,t,n,a){let r=Number(a);if(!(n>t)||!Number.isFinite(r))return 0;let i=Math.min(n,Math.max(t,r)),s=Mi(e,t,n);if(s==="log")return Math.log(i/t)/Math.log(n/t);let l=(i-t)/(n-t);return s==="power"?Math.cbrt(l):l}function rc(e,t,n,a){let r=Math.min(1,Math.max(0,Number(a)||0)),i=Mi(e,t,n);return i==="log"?t*(n/t)**r:t+(n-t)*(i==="power"?r**ym:r)}function ic(e,t,n,a){let r=Math.min(n,Math.max(t,e));if(a>0){r=t+Math.round((r-t)/a)*a;let i=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));r=Number(r.toFixed(i)),r=Math.min(n,Math.max(t,r))}return r}function Ti(e,t,n,a){return Math.round(Aa(e,t,n,a)*1e3)}function qr(e,t,n,a,r){return ic(rc(e,t,n,Number(a)/1e3),t,n,r)}function vm(e,t,n=!1){let a=Number(e)||0,r=n?1:1e3/100,i=null;return t==="ArrowRight"||t==="ArrowUp"?i=a+r:t==="ArrowLeft"||t==="ArrowDown"?i=a-r:t==="PageUp"?i=a+1e3/10:t==="PageDown"?i=a-1e3/10:t==="Home"?i=0:t==="End"&&(i=1e3),i===null?null:Math.min(1e3,Math.max(0,Math.round(i)))}function oc(e,t,n,a,r,i=!1,s){let l=Ti(e,t,n,a),d=vm(l,r,i);if(d===null)return null;let u=qr(e,t,n,d,s),c=Math.sign(d-l),p=ic(Number(a),t,n,s);for(;c!==0&&u===p&&d>0&&d<1e3;)d+=c,u=qr(e,t,n,d,s);return u}function Jo(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function Qo(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function xm(e,t,n,a=n/6){let r=e.some(c=>c===null),i=Math.max(0,n-(r?a:0)),s=e.reduce((c,p,h)=>p===null?c:c+Qo(t[h]),0),l=s>0?i/s:0,d=e.map(c=>c===null?0:Math.min(i,Qo(c)*l));if(r){let c=d.reduce((h,f)=>h+f,0),p=e.indexOf(null);d[p]=Math.max(a,n-c)}let u=[0];for(let c of d)u.push(Math.round((u[u.length-1]+c)*100)/100);return r&&(u[u.length-1]=n),u}function km(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(t*a)),i=Math.max(1,Math.floor(n*a));(e.width!==r||e.height!==i)&&(e.width=r,e.height=i);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function at(e){return Math.max(0,Math.min(1,e))}function sc(e,t){let{ctx:n,w:a,h:r}=km(e);if(!n)return;n.clearRect(0,0,a,r);let i=rm(e);if(t.paint==="swatch"){let d=me(e,"accent"),u=me(e,"rhythm.step-cell-on");e.dataset.ncAccent=d,e.dataset.ncStep=u,n.fillStyle=d,n.fillRect(0,0,a/2,r),n.fillStyle=u,n.fillRect(a/2,0,a/2,r);return}if(t.paint==="filter"&&typeof t.hz=="number"){Sm(n,a,r,t,e,i);return}if(t.paint==="filter"){let d=t.mode??"lp",u=me(e,Xl(d)),c=me(e,"divider"),p=at(t.cutoff??.5),h=.08+(1-at(t.resonance??.2))*.22;n.strokeStyle=c,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(a,r*.72),n.stroke(),n.beginPath();for(let f=0;f<=a;f++){let g=f/Math.max(1,a),w=0;d==="lp"?w=g<p?1:Math.max(0,1-(g-p)/h):d==="hp"?w=g>p?1:Math.max(0,1-(p-g)/h):w=Math.max(0,1-Math.abs(g-p)/h);let m=r*.78-w*r*.62;f===0?n.moveTo(f,m):n.lineTo(f,m)}n.strokeStyle=u,n.stroke(),n.fillStyle=me(e,"text-sub"),n.font=i,n.fillText(d.toUpperCase(),0,r),e.dataset.ncAccent=u;return}if(t.paint==="envelope"){n.strokeStyle=me(e,"accent");let d=Math.max(0,t.attack??0),u=Math.max(0,t.decay??.4),[c,p,h]=xm([d,u],t.max??[1,4],a),f=2,g=r-1;n.beginPath(),n.moveTo(c,g),n.lineTo(p,f);let w=Math.max(1,Math.ceil(h-p));for(let m=1;m<=w;m++){let b=m/w;n.lineTo(p+(h-p)*b,g-(g-f)*Math.exp(-4.6*b)*(1-b*.01))}n.lineTo(h,g),n.lineTo(a,g),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let d=Array.isArray(t.peaks)?t.peaks:[],[u,c]=Array.isArray(t.region)?t.region:[0,1],p=me(e,"accent"),h=me(e,"text-sub"),f=r/2;n.fillStyle=me(e,"accent-soft"),n.fillRect(at(u)*a,0,(at(c)-at(u))*a,r),n.strokeStyle=me(e,"divider"),n.beginPath(),n.moveTo(0,f),n.lineTo(a,f),n.stroke();let g=Math.floor(d.length/2);for(let w=0;w<g;w++){let m=(w+.5)/g*a,b=Math.max(-1,Math.min(1,d[w*2]??0)),v=Math.max(-1,Math.min(1,d[w*2+1]??0)),y=(w+.5)/g;n.strokeStyle=y>=u&&y<=c?p:h,n.beginPath(),n.moveTo(m,f-v*(f-1)),n.lineTo(m,f-b*(f-1)+.5),n.stroke()}n.strokeStyle=p;for(let w of[u,c,...Array.isArray(t.markers)?t.markers:[]]){let m=Math.round(at(w)*(a-1))+.5;n.beginPath(),n.moveTo(m,0),n.lineTo(m,r),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=me(e,"text"),n.fillRect(Math.round(at(t.position)*(a-1)),0,1,r)),g||(n.fillStyle=h,n.font=i,n.fillText(t.empty??"Empty",0,f+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let d=at(t.level??0);n.fillStyle=me(e,"divider"),n.fillRect(0,r*.4,a,r*.2),n.fillStyle=me(e,"accent"),n.fillRect(0,r*.4,a*d,r*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=me(e,"rhythm.step-cell-off"),n.fillRect(0,r*.45,a,r*.1),n.fillStyle=me(e,"rhythm.playhead"),n.fillRect(l/s*a,r*.3,Math.max(1,a/s),r*.4),e.dataset.ncAccent=me(e,"accent")}var Sn=20,Vr=2e4,mr=24,Zo=-60;function $m(e,t,n,a,r=48e3){let i=2*Math.PI*Math.min(t,r*.49)/r,s=Math.cos(i),l=Math.sin(i)/(2*n),d,u,c;e==="hp"?[d,u,c]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[d,u,c]=[l,0,-l]:[d,u,c]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,h=-2*s,f=1-l,g=2*Math.PI*a/r,w=(y,T,A)=>y+T*Math.cos(g)+A*Math.cos(2*g),m=(y,T)=>-(y*Math.sin(g)+T*Math.sin(2*g)),b=Math.hypot(w(d,u,c),m(u,c)),v=Math.hypot(w(p,h,f),m(h,f));return v>0?b/v:0}function Em(e,t){return Math.log(Math.max(Sn,Math.min(Vr,e))/Sn)/Math.log(Vr/Sn)*t}function es(e,t,n){let a=Math.max(Zo,Math.min(mr,e));return t+(mr-a)/(mr-Zo)*(n-t)}function Sm(e,t,n,a,r,i){let s=a.mode??"lp",l=me(r,Xl(s)),d=me(r,"divider"),u=me(r,"text-sub"),c=Number.parseFloat(String(i).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,h=Math.max(p+4,n-c-3),f=a.q??Math.SQRT1_2,g=Math.round(es(0,p,h))+.5;e.strokeStyle=d,e.lineWidth=1,e.beginPath(),e.moveTo(0,g),e.lineTo(t,g),e.stroke(),e.beginPath();for(let w=0;w<=t;w++){let m=Sn*(Vr/Sn)**(w/Math.max(1,t)),b=a.open?1:$m(s,a.hz,f,m,a.sampleRate),v=es(20*Math.log10(Math.max(1e-5,b)),p,h);w===0?e.moveTo(w,v):e.lineTo(w,v)}if(e.strokeStyle=l,e.stroke(),!a.open){let w=Math.round(Em(a.hz,t))+.5;e.strokeStyle=u,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(w,p),e.lineTo(w,h),e.stroke(),e.setLineDash?.([])}e.fillStyle=u,e.font=i,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",r.dataset.ncAccent=l,r.dataset.ncFilterHz=String(Math.round(a.hz))}function Be(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let r=n.defaultView.getComputedStyle(a).color;return a.remove(),r}function Am(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var Ct=20,_n=2e4,Li=Math.log(_n/Ct),Hr=32,Mm=250,Tm=-100,Lm=1200,Cm=4.5,ts=-6,Et=-96,Nm=48,ns=[100,1e3,1e4],Fm=[6,12];function Wt(e,t){return Math.log(Math.max(Ct,Math.min(_n,e))/Ct)/Li*t}function ua(e,t){return Ct*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Li)}function ht(e,t,n,a){let r=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*r}function Ur(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var lc=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Im(e,t,n,a){let r=n?3:1,i=d=>({db:Math.max(-a,Math.min(a,e.db+d*r))}),s=d=>({hz:Math.max(e.minHz??Ct,Math.min(e.maxHz??_n,e.hz*2**(d*r/6)))}),l=d=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(d*r)))});switch(t){case"ArrowUp":return i(1);case"ArrowDown":return i(-1);case"ArrowRight":return e.moveHz?s(1):i(1);case"ArrowLeft":return e.moveHz?s(-1):i(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Ci(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function Pm(e,t,n,a,r,i,s,l,d){let u=d?.25:1,c={},p=Math.max(1,i/2-l);if(c.db=Math.max(-s,Math.min(s,t.db-a*u/p*s/Ci(e))),e.moveHz){let h=t.hz*Math.exp(n*u/Math.max(1,r)*Li);c.hz=Math.max(e.minHz??Ct,Math.min(e.maxHz??_n,h))}return c}function zm(e,t,n,a,r){let i=Math.max(0,n.left)+1,s=Math.min(n.right,r)-1,l=Math.min(t.width*3+a*2,s-i),d=Math.max(i,Math.min(e.left,s-l));return{left:Math.round(d-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var ye=new WeakMap;function Dm(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let r=document.createElement("canvas");r.className="nc-eq-spectrum",r.setAttribute("aria-hidden","true");let i=document.createElement("canvas");i.className="nc-eq-curve",i.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(r,i);for(let d of e.bands)a.append(Rm(n,d,t));a.append(s),a.addEventListener("click",d=>{if(!mc(n)||d.button>0)return;let u=hc(n)?.querySelector("[data-nc-max-toggle]");u instanceof HTMLElement&&u.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),ye.set(n,{control:e,cache:null,spec:null,active:null}),dc(n,e),n}function cc(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function Rm(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let r=()=>{let u=n(e);return u?.type==="eqGraph"?u:null},i=()=>r()?.bands.find(u=>u.id===t.id)??null,s=null;a.addEventListener("pointerdown",u=>{if(u.button!==0)return;let c=i();c&&(u.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(u.pointerId),s={id:u.pointerId,x:u.clientX,y:u.clientY,start:{hz:c.hz,db:c.db}},a.dataset.drag="true",rt(e,t.id))}),a.addEventListener("pointermove",u=>{if(!s||u.pointerId!==s.id)return;let c=r(),p=i(),h=ye.get(e);if(!c||!p||!h?.box)return;let{w:f,h:g,pad:w}=h.box;c.onBand(p.id,Pm(p,s.start,u.clientX-s.x,u.clientY-s.y,f,g,c.range??18,w,u.shiftKey))});let l=u=>{!s||u.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&rt(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",u=>{u.preventDefault(),r()?.onReset?.(t.id)}),a.addEventListener("keydown",u=>{let c=r(),p=i();if(!c||!p)return;let h=Im(p,u.key,u.shiftKey,c.range??18);h&&(u.preventDefault(),h==="reset"?c.onReset?.(p.id):c.onBand(p.id,h),rt(e,p.id))});let d=null;return a.addEventListener("wheel",u=>{let c=r(),p=i();if(!c||!p?.moveQ)return;u.preventDefault();let h=u.timeStamp;(!d||h-d.t>400)&&(d={q:p.q,t:h});let f=u.deltaMode===1?u.deltaY*16:u.deltaMode===2?u.deltaY*400:u.deltaY;d.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,d.q*2**(-f/240))),d.t=h,c.onBand(p.id,{q:d.q}),rt(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>rt(e,t.id)),a.addEventListener("focus",()=>rt(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&rt(e,null)}),a.addEventListener("blur",()=>{s||rt(e,null)}),a}function rt(e,t){let n=ye.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?Zt(e):Ni(e)}function Ni(e){let t=ye.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(g=>g.id===t.active):null;for(let g of e.querySelectorAll(".nc-eq-node"))g instanceof HTMLElement&&(a&&g.dataset.band===a.id?g.dataset.active="true":delete g.dataset.active);if(!a||!t.box){n.hidden=!0;return}let r=[a.label,lc(a.db)];a.kind==="peak"?r.push(Ur(a.hz),`Q ${a.q.toFixed(1)}`):r.push(`${a.kind==="lowshelf"?"below":"above"} ${Ur(a.hz)}`),n.textContent=r.join(" · "),n.dataset.tone=String(Om(t.control,a)),n.hidden=!1;let{w:i,h:s,pad:l}=t.box,d=Wt(a.hz,i),u=ht(a.db*Ci(a),s,t.control.range??18,l),c=n.offsetWidth,p=n.offsetHeight,h=Math.max(0,Math.min(i-c,d-c/2)),f=u-p-l*1.5>=0?u-p-l*1.5:Math.min(s-p,u+l*1.5);n.style.left=`${Math.round(h)}px`,n.style.top=`${Math.round(f)}px`}function Om(e,t){return e.bands.indexOf(t)%3+1}function dc(e,t){let n=ye.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Fi(e);let a=t.range??18;t.bands.forEach((r,i)=>{let s=cc(e,r.id);s instanceof HTMLElement&&(s.dataset.tone=String(i%3+1),s.dataset.kind=r.kind,s.setAttribute("aria-label",`${r.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(r.db)),s.setAttribute("aria-valuetext",r.valueText??`${lc(r.db)}, ${Ur(r.hz)}`),s.setAttribute("aria-keyshortcuts",r.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),r.help?s.setAttribute("data-nc-help",r.help):s.removeAttribute("data-nc-help"))}),Zt(e),Hm(e)}function uc(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.round(t*a)),i=Math.max(1,Math.round(n*a));(e.width!==r||e.height!==i)&&(e.width=r,e.height=i);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function pc(e){return{curve:Be(e,"eq-curve"),fill:Be(e,"eq-fill"),quiet:Be(e,"text-sub"),grid:Be(e,"eq-grid"),zero:Be(e,"divider"),label:Be(e,"text-sub"),spectrum:Be(e,"eq-spectrum"),bands:[Be(e,"eq-band-1"),Be(e,"eq-band-2"),Be(e,"eq-band-3")]}}function Bm(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Zt(e){ye.has(e)&&Fi(e);let t=ye.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:r,w:i,h:s}=uc(n);if(!r)return;let l=Math.max(8,Math.round(s*.06)),d=a.range??18;t.box={w:i,h:s,pad:l},t.colours=pc(e);let u=t.colours,c=Bm(a,i);if(!t.cache||t.cache.key!==c){let T=Math.max(64,Math.ceil(i)+1),A=new Float64Array(T);for(let k=0;k<T;k++)A[k]=ua(k/(T-1)*i,i);let x=null;try{x=typeof a.response=="function"?a.response(A):null}catch{x=null}t.cache={key:c,freqs:A,total:x?.total??new Float64Array(T),bands:x?.bands??[]}}r.clearRect(0,0,i,s);let p=Am(e),h=a.on!==!1;jm(r,i,s,d,l,u,p);let{freqs:f,total:g,bands:w}=t.cache,m=Array.from(f,T=>Wt(T,i)),b=ht(0,s,d,l);w.forEach((T,A)=>{if(!T||!T.some(M=>Math.abs(M)>.05))return;let x=h?u.bands[A%3]:u.quiet,k=Array.from(T,M=>ht(M,s,d,l));r.save(),t.active&&a.bands[A]?.id===t.active&&(r.globalAlpha=.14,r.fillStyle=x,as(r,m,k,b)),r.globalAlpha=h?.75:.4,r.strokeStyle=x,r.lineWidth=.75,fr(r,m,k),r.restore()});let v=Array.from(g,T=>ht(T,s,d,l)),y=h?u.curve:u.quiet;r.save(),r.fillStyle=h?u.fill:u.quiet,r.globalAlpha=h?.2:.08,as(r,m,v,b),r.restore(),r.save(),r.strokeStyle=h?u.fill:y,r.lineJoin="round",r.lineCap="round",h&&(r.globalAlpha=.16,r.lineWidth=4,fr(r,m,v)),r.globalAlpha=1,r.strokeStyle=y,r.lineWidth=1.25,fr(r,m,v),r.restore(),_m(e),Ni(e)}function jm(e,t,n,a,r,i,s){e.save(),e.lineWidth=1;for(let d=10;d<=1e4;d*=10)for(let u=1;u<=9;u++){let c=d*u;if(c<Ct||c>_n)continue;let p=Math.round(Wt(c,t))+.5;e.globalAlpha=ns.includes(c)?.9:.35,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let d of Fm)if(!(d>a))for(let u of[1,-1]){let c=Math.round(ht(d*u,n,a,r))+.5;e.globalAlpha=d===12?.75:.4,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(0,c),e.lineTo(t,c),e.stroke()}e.globalAlpha=1,e.strokeStyle=i.zero;let l=Math.round(ht(0,n,a,r))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=i.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let d of ns){let u=d>=1e3?`${d/1e3}k`:String(d),c=e.measureText(u).width,p=Wt(d,t)+3;e.fillText(u,p+c+2>t?Wt(d,t)-c-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let d of[12,0,-12]){if(Math.abs(d)>a)continue;let u=ht(d,n,a,r);e.fillText(d>0?`+${d}`:d<0?`−${-d}`:"0",t-3,Math.round(u)-1)}e.restore()}function Ma(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let r=(t[a]+t[a+1])/2,i=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],r,i)}e.lineTo(t[t.length-1],n[n.length-1])}function fr(e,t,n){e.beginPath(),Ma(e,t,n),e.stroke()}function as(e,t,n,a){e.beginPath(),Ma(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function hc(e){return e.closest("[data-nc-maxable]")}function mc(e){let t=hc(e);return!!t&&!t.hasAttribute("data-nc-max")}function Fi(e){let t=mc(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=ye.get(e);n?.active&&(n.active=null,Ni(e))}return t}function _m(e){Fi(e);let t=ye.get(e);if(!t?.box)return;let{w:n,h:a,pad:r}=t.box,i=t.control.range??18;for(let s of t.control.bands){let l=cc(e,s.id);l instanceof HTMLElement&&(l.style.left=`${Wt(s.hz,n).toFixed(1)}px`,l.style.top=`${ht(s.db*Ci(s),a,i,r).toFixed(1)}px`)}}function qm(e,t,n,a){let r=a/2/n,i=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let d=0;d<e;d++){let u=(d-.5)/(e-1)*t,c=(d+.5)/(e-1)*t,p=ua(u,t),h=ua(c,t),f=ua(d/(e-1)*t,t);i[d]=Math.min(n-1,p/r),s[d]=Math.min(n-1,h/r),l[d]=Cm*Math.log2(f/1e3)}return{lo:i,hi:s,tilt:l}}function Vm(e,t,n){let a=Math.floor(t),r=Math.ceil(n);if(r-a<=1){let s=t-a,l=e[a]??-1/0,d=e[Math.min(e.length-1,a+1)]??l;return l+(d-l)*s}let i=-1/0;for(let s=a;s<=r&&s<e.length;s++)e[s]>i&&(i=e[s]);return i}function Hm(e){let t=ye.get(e);if(t){if(!t.control.spectrum){gc(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let r=ye.get(e)?.spec;r&&(r.visible=a.some(i=>i.isIntersecting),Gr(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Gr(e)}}function Gr(e){let t=ye.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){fc(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Wr(e),n.onVis||(n.onVis=()=>Gr(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Kr(e,!1)}function Wr(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function Kr(e,t){let n=ye.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,gr(e,Wr(e))),Mm):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(r=>(n.raf=0,gr(e,r))):n.timer=a.setTimeout(()=>(n.timer=0,gr(e,Wr(e))),Hr))}function fc(e){let t=ye.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function gc(e){let t=ye.get(e)?.spec;if(!t)return;fc(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=ye.get(e);n&&(n.spec=null)}function gr(e,t){let n=ye.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){gc(e);return}if(!a.analyser)return;if(t-a.last<Hr-4&&!a.idle){Kr(e,!1);return}let r=a.last?Math.min(.25,(t-a.last)/1e3):Hr/1e3;a.last=t;let i=e.querySelector(".nc-eq-spectrum");if(!(i instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:d}=uc(i);if(!s)return;let u=Math.max(16,Math.round(l/2)),c=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==u||a.map.w!==l||a.map.sr!==c)&&(a.map={cols:u,w:l,sr:c,...qm(u,l,a.buf.length,c)},a.disp=new Float32Array(u).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,h=Nm*r,{lo:f,hi:g,tilt:w}=a.map;for(let b=0;b<u;b++){let v=Vm(a.buf,f[b],g[b]);v>p&&(p=v);let y=v+w[b],T=a.disp[b]-h;a.disp[b]=y>T?y:T}p>Tm&&(a.loud=t);let m=t-a.loud>Lm;s.clearRect(0,0,l,d),(!m||a.disp.some(b=>b>Et))&&Um(s,l,d,a.disp,n.colours??pc(e)),a.idle=m&&!a.disp.some(b=>b>Et),Kr(e,a.idle)}function Um(e,t,n,a,r){let i=a.length,s=new Array(i),l=new Array(i),d=u=>{let c=a[Math.max(0,Math.min(i-1,u))];return Number.isFinite(c)?c:Et};for(let u=0;u<i;u++){let c=d(u)*.36+(d(u-1)+d(u+1))*.22+(d(u-2)+d(u+2))*.1,p=(Math.max(Et,Math.min(ts,Number.isFinite(c)?c:Et))-Et)/(ts-Et);s[u]=u/(i-1)*t,l[u]=n-p*n}e.save(),e.fillStyle=r.spectrum,e.globalAlpha=.13,e.beginPath(),Ma(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=r.spectrum,e.lineWidth=1,e.beginPath(),Ma(e,s,l),e.stroke(),e.restore()}var Gm=.8912509381337456,Yr=32,Wm=250,Km=1200,Ym=.2,bc=1.5;function Xm(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function Jm(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let r=e.createElement("span");r.className="nc-fx-level-fill",a.append(r),t.append(a)}return t}var Ta=new WeakMap,rs=new WeakMap;function is(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let r=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),i=Number.parseFloat(r);return Number.isFinite(i)?r.endsWith("ms")?i/1e3:i:n}function Qm(e){let t=rs.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(r=>{for(let i of r){let s=Ta.get(i.target);s&&(s.seen.set(i.target,i.isIntersecting),An(s))}Vt(t)})),e.addEventListener("visibilitychange",()=>{for(let r of t.recs)An(r);Vt(t)}),rs.set(e,t),t}var yc=e=>e.els.some(t=>t.isConnected);function Zm(e){if(!e.loop.io)return yc(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function An(e){let t=!e.dead&&!!e.source&&Zm(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Ii(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Qr(e))}function Ii(e){return e.doc.defaultView?.performance?.now()??Date.now()}function Vt(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){wc(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Ii(e)),!e.raf&&!e.timer&&Xr(e,!1)}function Xr(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>os(e,Ii(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),Wm):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(r=>(e.raf=0,os(e,r))):e.timer=n.setTimeout(()=>(e.timer=0,a()),Yr)}function wc(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function os(e,t){if(t-e.last<Yr-4&&!e.idle&&e.last){Xr(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):Yr/1e3;e.last=t,e.frames++;let a=!1,r=!1;for(let i of e.recs){if(!yc(i)){(i.placed||e.frames-i.born>90)&&vc(i);continue}i.placed=!0,i.open&&(r=!0,ef(i,n,t)&&(e.loud=t),(i.disp[0]>0||i.disp[1]>0)&&(a=!0))}if(!r){wc(e);return}e.idle=t-e.loud>Km&&!a,Xr(e,e.idle)}function ef(e,t,n){if(e.fall<0){let h=e.els[0];e.fall=is(h,"motion-meter-fall",Ym),e.hold=is(h,"motion-meter-hold",bc)}let a=null;try{a=e.source.read()}catch{a=null}let r=typeof a=="number",i=r?a:Number(a?.in)||0,s=!r&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,d=s?"2":"1";if(e.rows!==d){e.rows=d;for(let h of e.els)h.dataset.ncRows=d}let u=e.fall>0?Math.exp(-t/e.fall):0,c=[i,l],p=!1;for(let h=0;h<2;h++){let f=Xm(c[h]);f>0&&(p=!0),e.disp[h]=f>=e.disp[h]?f:f+(e.disp[h]-f)*u,e.disp[h]<.001&&(e.disp[h]=0),c[h]>=Gm&&(e.clipAt[h]=n);let g=e.clipAt[h]>0&&n-e.clipAt[h]<e.hold*1e3;Jr(e,h,e.disp[h],g)}return p}function Jr(e,t,n,a){let r=Math.round(n*1e3)/1e3,i=a?"true":"false";if(!(e.shown[t]===r&&e.clipShown[t]===i)){e.shown[t]=r,e.clipShown[t]=i;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${r})`,l.dataset.clip=i)}}}function Qr(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Jr(e,0,0,!1),Jr(e,1,0,!1)}function vc(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),Ta.get(t)===e&&Ta.delete(t)}function tf(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,r=Qm(a),i={els:n,source:t??null,loop:r,open:!1,dead:!1,seen:new Map,born:r.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:bc,rows:""};for(let s of n)Ta.set(s,i),r.io?.observe(s);if(r.recs.add(i),Qr(i),!r.io){let s=a.defaultView,l=()=>{An(i),Vt(r)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!i.dead){if(l===i.source){An(i),Vt(r);return}i.open&&(i.open=!1,i.source?.close?.(),Qr(i)),i.source=l,An(i),Vt(r)}},destroy(){i.dead||vc(i),Vt(r)}}}var xc={slop:8,longPressMs:500,pitchPx:16},nf=class{constructor(e,t,n=xc){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let r=this.hit(t,n);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let r=t-this.x0,i=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(r,i)<this.config.slop)return;Math.abs(i)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-i/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function af(e,t,n,a=xc){let r=!1,i=0,s=(u,c)=>{let p=e.ownerDocument.elementFromPoint?.(u,c),h=[...e.querySelectorAll(t)],f=p?h.findIndex(m=>m===p||m.contains(p)):-1;if(f>=0)return f;let g=-1,w=Number.POSITIVE_INFINITY;return h.forEach((m,b)=>{if(m.hidden)return;let v=m.getBoundingClientRect();if(c<v.top||c>v.bottom)return;let y=Math.abs(u-(v.left+v.width/2));y<w&&y<=v.width&&(g=b,w=y)}),g},l=new nf(s,u=>{(u.kind==="paint"||u.kind==="long")&&(r=!0),n(u)},a),d=()=>{i&&clearTimeout(i),i=0};return e.addEventListener("pointerdown",u=>{u.button>0||(r=!1,l.down(u.pointerId,u.clientX,u.clientY,u.timeStamp)&&(d(),i=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",u=>{l.state!=="idle"&&(l.move(u.pointerId,u.clientX,u.clientY,u.timeStamp),l.state!=="pending"&&d())}),e.addEventListener("pointerup",u=>{d(),l.up(u.pointerId,u.clientX,u.clientY,u.timeStamp)}),e.addEventListener("pointercancel",u=>{d(),l.cancel(u.pointerId)}),e.addEventListener("click",u=>{r&&(r=!1,u.stopPropagation(),u.preventDefault())},!0),e.addEventListener("contextmenu",u=>u.preventDefault()),l}var kc="netcomposer.groups.v1";function Pi(){try{return globalThis.localStorage??null}catch{return null}}function $c(e=Pi(),t=kc){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[r,i]of Object.entries(n))typeof i=="boolean"&&a.set(r,i);return a}catch{return new Map}}function rf(e,t,n,a=kc){let r=$c(e,a);r.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(r)))}catch{}}function of(e,t=Pi()){return $c(t).get(e.id)??e.open===!0}function sf(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let r=document.createElement("button");r.type="button",r.className="nc-group-toggle",r.id=`${e.id}-group-toggle`;let i=document.createElement("span");i.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),r.append(i,s,l);let d=document.createElement("div");d.className="nc-group-body",d.id=`${e.id}-group-body`,d.setAttribute("role","group"),d.setAttribute("aria-labelledby",r.id),r.setAttribute("aria-controls",d.id);for(let u of e.controls)d.append(n(u,t));return r.addEventListener("click",()=>{let u=a.dataset.ncOpen!=="true";rf(Pi(),e.id,u),Zr(a,u);let c=t(a);c?.type==="group"&&c.onToggle?.(u)}),a.append(r,d),Ec(a,e),Zr(a,of(e)),Sc(a,e),a}function Zr(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let r=n?.querySelector(".nc-group-mark");r&&(r.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function Ec(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function Sc(e,t){Ec(e,t)&&Zr(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),r=t.summary??"";a&&a.textContent!==r&&(a.textContent=r)}var Zn="application/x-nc-pad",ss="http://www.w3.org/2000/svg";function lf(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],r=[];for(let i=0;i<n;i++){let s=Math.floor(i*t/n),l=Math.max(s+1,Math.floor((i+1)*t/n)),d=0,u=0;for(let p=s;p<l;p++)d=Math.min(d,e[2*p]??0),u=Math.max(u,e[2*p+1]??0);let c=n===1?50:i/(n-1)*100;a.push(`${c.toFixed(1)} ${(10-Math.min(1,u)*10).toFixed(2)}`),r.push(`${c.toFixed(1)} ${(10-Math.max(-1,d)*10).toFixed(2)}`)}return`M${a.join("L")}L${r.reverse().join("L")}Z`}function cf(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((r,i)=>a.append(df(n,i,t))),n.append(a),n.addEventListener("keydown",r=>{r.key==="Escape"&&pa(n)}),Mc(n,e),n}function df(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let r=document.createElement("span");r.className="nc-padgrid-pad-bar",r.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let d=document.createElementNS(ss,"svg");d.setAttribute("class","nc-padgrid-pad-wave"),d.setAttribute("viewBox","0 0 100 20"),d.setAttribute("preserveAspectRatio","none"),d.setAttribute("aria-hidden","true");let u=document.createElementNS(ss,"path");return d.append(u),a.append(r,i,s,l,d),pf(e,a,t,n),i.addEventListener("dblclick",()=>{let c=n(e);c?.type==="padGrid"&&c.onRename&&a.dataset.empty!=="true"&&Ac(e,a,t,n)}),a.addEventListener("dragstart",c=>{if(a.dataset.empty==="true"||!c.dataTransfer){c.preventDefault();return}c.dataTransfer.setData(Zn,String(t)),c.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",c=>{let p=c.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(Zn)||(c.preventDefault(),c.stopPropagation(),c.dataTransfer&&(c.dataTransfer.dropEffect=p.includes(Zn)&&!c.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",c=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let h=c.dataTransfer?.getData(Zn);if(h!==void 0&&h!==""){c.preventDefault(),c.stopPropagation();let g=Number(h);g!==t&&p.onMove?.(g,t,c.altKey);return}let f=c.dataTransfer?.files?.[0];f&&(c.preventDefault(),c.stopPropagation(),p.onFile?.(t,f))}),a}function uf(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function pf(e,t,n,a){let r=0,i=!1,s=0,l=0,d=()=>{window.clearTimeout(r),r=0};t.addEventListener("pointerdown",u=>{if(u.button!==0)return;i=!1,s=u.clientX,l=u.clientY,d();let c=a(e);c?.type==="padGrid"&&(c.onDown?.(n),!(c.onDown&&u.pointerType==="mouse")&&(r=window.setTimeout(()=>{r=0,i=ls(e,t,n,a)},450)))}),t.addEventListener("pointermove",u=>{r&&Math.hypot(u.clientX-s,u.clientY-l)>8&&d()});for(let u of["pointerup","pointercancel","pointerleave"])t.addEventListener(u,d);t.addEventListener("contextmenu",u=>{u.preventDefault(),d(),i=ls(e,t,n,a)}),t.addEventListener("click",()=>{if(i){i=!1;return}uf(e,n,a)})}function ls(e,t,n,a){let r=a(e);if(r?.type!=="padGrid"||!r.menu)return!1;let i=r.menu(n);if(!i.length)return!1;pa(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),pa(e)}),s.addEventListener("click",c=>c.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let c of i){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=c.id,p.textContent=c.label,p.addEventListener("click",()=>{pa(e);let h=a(e);h?.type==="padGrid"&&(c.id==="rename"&&h.onRename?Ac(e,t,n,a):h.onMenu?.(n,c.id))}),l.append(p)}e.append(s,l);let d=e.getBoundingClientRect(),u=t.getBoundingClientRect();return l.style.left=`${u.left-d.left}px`,l.style.top=`${u.bottom-d.top}px`,l.querySelector("button")?.focus(),!0}function Ac(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let r=a(e);if(r?.type!=="padGrid")return;let i=document.createElement("input");i.type="text",i.className="nc-padgrid-rename",i.maxLength=r.nameMax??24,i.value=r.pads[n]?.label??"",i.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-s.left}px`,i.style.top=`${l.top-s.top}px`,i.style.width=`${l.width}px`;let d=!1,u=c=>{if(d)return;d=!0;let p=i.value.trim();i.remove(),t.focus();let h=a(e);c&&p&&h?.type==="padGrid"&&h.onRename?.(n,p)};i.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"?u(!0):c.key==="Escape"&&u(!1)}),i.addEventListener("blur",()=>u(!0));for(let c of["pointerdown","click","dblclick"])i.addEventListener(c,p=>p.stopPropagation());e.append(i),i.focus(),i.select()}function pa(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function Mc(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,r)=>{let i=n[r];if(!(i instanceof HTMLButtonElement))return;let s=i.querySelector(".nc-padgrid-pad-name"),l=i.querySelector(".nc-padgrid-pad-hint"),d=i.querySelector(".nc-padgrid-pad-wave path"),u=i.querySelector(".nc-padgrid-pad-badge");u&&(u.textContent=a.empty?"":a.badge??""),i.draggable=!a.empty,a.empty?(i.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),d?.setAttribute("d","")):(delete i.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=""),d?.setAttribute("d",lf(a.peaks))),a.lane?i.dataset.ncLane=String(a.lane):delete i.dataset.ncLane;let c=t.selected===r;c?i.dataset.selected="true":delete i.dataset.selected,i.setAttribute("aria-pressed",c?"true":"false"),a.playing?i.dataset.playing="true":delete i.dataset.playing,i.setAttribute("aria-label",a.empty?`Pad ${r+1}, empty: load a sample`:`Pad ${r+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${c?", selected":""}`)})}function Se(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Wa(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(a,r),n}function cs(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function In(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var hf=450,ds=8;function je(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function mf(e){let t=am(e,"target-min");return t>0?t:44}function ff(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=mf(e),a=n/2,r=t.map(i=>i.parentElement?.getBoundingClientRect()??null);for(let i=0;i<t.length;i++){let s=t[i],l=r[i];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let d=l.left+l.width/2,u=l.top+l.height/2,c=d-a,p=d+a,h=u-a,f=u+a;for(let g=0;g<t.length;g++){if(i===g)continue;let w=r[g];if(!w||w.width===0)continue;let m=w.left+w.width/2,b=w.top+w.height/2;Math.abs(b-u)<a*2&&(m>d?p=Math.min(p,(d+m)/2):m<d&&(c=Math.max(c,(d+m)/2))),Math.abs(m-d)<a*2&&(b>u?f=Math.min(f,(u+b)/2):b<u&&(h=Math.max(h,(u+b)/2)))}c=Math.min(c,l.left),p=Math.max(p,l.right),h=Math.min(h,l.top),f=Math.max(f,l.bottom),s.style.left=`${c-l.left}px`,s.style.top=`${h-l.top}px`,s.style.width=`${Math.max(0,p-c)}px`,s.style.height=`${Math.max(0,f-h)}px`,s.style.transform="none"}}function Tc(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function us(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Tt(e,t){switch(e.type){case"slider":return gf(e,t);case"select":return yf(e,t);case"toggle":return wf(e,t);case"button":return vf(e,t);case"readout":return xf(e);case"label":return Sf(e);case"note":return ps(e);case"knob":return Tf(e,t);case"choice":return Lf(e,t);case"slotRow":return Cf(e,t);case"stepGrid":return Pf(e,t);case"canvas":return Of(e);case"fx":return Wf(e,t);case"eqGraph":return Dm(e,t);case"group":return sf(e,t,Tt);case"strip":return Bf(e,t);case"stripAdd":return Vf(e,t);case"padGrid":return cf(e,t);case"moves":return $f(e,t);default:return ps({id:"unknown",text:""})}}function Fe(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Nc(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(Lc(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let r=e.querySelector("[data-nc-readout]");r&&(r.textContent=t.valueText??In(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),cs(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")cs(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&mt(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Af(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??In(t.value))}else if(t.type==="choice")Fc(e,t);else if(t.type==="slotRow")Pc(e,t);else if(t.type==="stepGrid")ti(e,t);else if(t.type==="padGrid")Mc(e,t);else if(t.type==="moves")Cc(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&sc(n,t)}else if(t.type==="eqGraph")dc(e,t);else if(t.type==="strip"){Oc(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${Lt(n.id)}"]`);a instanceof Element&&Fe(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Dc(e,t);else if(t.type==="group"){Sc(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${Lt(n.id)}"]`);a instanceof Element&&Fe(a,n)}}else if(t.type==="fx"){Wc(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${Lt(n.id)}"]`);a instanceof Element&&Fe(a,n)}}}}function gf(e,t){let n=Wa(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let r=Ga(e.taper,e.min,e.max);a.min=String(r?0:e.min),a.max=String(r?1e3:e.max),a.step=String(r?1:e.step),r&&(a.dataset.ncTaper=e.taper),a.value=String(Lc(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let i=l=>r?qr(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(i(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(i(l))}),r&&a.addEventListener("keydown",l=>{let d=t(a);if(d?.type!=="slider"||a.disabled)return;let u=d.taper??e.taper,c=oc(u,d.min,d.max,d.value,l.key,l.shiftKey,d.step);c!==null&&(l.preventDefault(),a.value=String(Ti(u,d.min,d.max,c)),d.onChange(c),d.onCommit?.(c))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(bf(e,a,t),s),n.append(Se()),Fe(n,e),n}function Lc(e){return Ga(e.taper,e.min,e.max)?Ti(e.taper,e.min,e.max,e.value):e.value}function bf(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(je());let r=i=>{let s=n(t);s?.type==="slider"&&s.onTap?.(i)};return a.addEventListener("pointerdown",i=>{i.button===0&&r(i.timeStamp)}),a.addEventListener("keydown",i=>{i.repeat||i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),r(i.timeStamp))}),a}function yf(e,t){let n=Wa(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let r=null;for(let i of e.options){let s=document.createElement("option");s.value=i.value,s.textContent=i.label,i.disabled&&(s.disabled=!0),i.group?r?.getAttribute("label")!==i.group&&(r=document.createElement("optgroup"),r.setAttribute("label",i.group),a.append(r)):r=null,(r??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let i=t(a);i?.type==="select"&&i.onChange(a.value)}),n.append(a,Se()),n}function wf(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(Se()),Fe(n,e),n}function vf(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let i=t(n);i?.type==="button"&&i.onPress()}),n.append(Se()),Fe(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=e.id,r.setAttribute("aria-label","Surprise me"),r.title=e.sparkleTitle??"Surprise me",r.innerHTML=Tc(),r.addEventListener("click",()=>{let i=n.closest(".nc-module")?.querySelector(".nc-slot-row");i instanceof HTMLElement&&zc(i);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,r),a}function xf(e){let t=Wa(e.id,e.label);return t.append(Se()),Fe(t,e),t}var kf=450;function $f(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let r=document.createElement("div");r.className="nc-moves-row",r.setAttribute("role","group"),r.setAttribute("aria-label",a.label),a.title&&(r.title=a.title);let i=document.createElement("span");i.className="nc-moves-label",i.setAttribute("aria-hidden","true"),i.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let d=document.createElement("button");d.type="button",d.className="nc-moves-btn",d.dataset.ncMove=l.id,d.title=l.title??l.text,d.setAttribute("aria-label",`${a.label} ${l.text}`),d.append(Ef(l.icon)),d.addEventListener("click",()=>{let u=t(n);u?.type==="moves"&&u.onMove(l.id)}),s.append(d)}r.append(i,s),n.append(r)}return Cc(n,e),n}function Cc(e,t){for(let n of t.groups)for(let a of n.moves){let r=e.querySelector(`[data-nc-move="${Lt(a.id)}"]`);r instanceof HTMLButtonElement&&(r.disabled=a.disabled===!0)}}function Ef(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function Sf(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(Se()),t}function ps(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(Se()),t}function hs(e){if(typeof e.valueText=="string")return e.valueText;let t=In(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Nc(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Af(e,t){let n=Aa(t.taper,t.min,t.max,t.value);Nc(e,t.modulated===!0);let a=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(a)),t.bipolar){let r=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(Aa(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(a,r))),e.style.setProperty("--knob-to",String(Math.max(a,r)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",hs(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${hs(t)}`}function Mf(e,t){if(Ga(e.taper,e.min,e.max))return oc(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,r=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+r:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-r:null}function Tf(e,t){let n=Wa(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let r=document.createElement("i");r.className="nc-knob-mark",a.append(r);let i=0,s=0;a.addEventListener("pointerdown",u=>{i=u.clientY;let c=t(a);s=c&&"value"in c?Number(c.value):0,a.setPointerCapture?.(u.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",u=>{if(a.hasPointerCapture&&!a.hasPointerCapture(u.pointerId))return;let c=t(a);if(c?.type!=="knob")return;if(Ga(c.taper,c.min,c.max)){let f=Aa(c.taper,c.min,c.max,s)-(u.clientY-i)/120;c.onChange(rc(c.taper,c.min,c.max,f));return}let p=c.max-c.min||1,h=Math.min(c.max,Math.max(c.min,s-(u.clientY-i)*p/120));c.onChange(h)}),a.addEventListener("dblclick",()=>{let u=t(a);u?.type==="knob"&&typeof u.defaultValue=="number"&&u.onChange(u.defaultValue)}),a.addEventListener("keydown",u=>{let c=t(a);if(c?.type!=="knob")return;let p=Mf(c,u);p!==null&&(u.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,p))))});let d=n.querySelector("[data-nc-readout]");return n.insertBefore(a,d),n.append(Se()),Fe(n,e),n}function Lf(e,t){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label);for(let a of e.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=a.value,r.setAttribute("role","tab"),r.textContent=a.label,r.addEventListener("click",()=>{let i=t(n);i?.type==="choice"&&i.onChange(a.value)}),r.addEventListener("keydown",i=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),d=l;if(i.key==="ArrowRight"||i.key==="ArrowDown")d=(l+1)%s.length;else if(i.key==="ArrowLeft"||i.key==="ArrowUp")d=(l-1+s.length)%s.length;else if(i.key==="Home")d=0;else if(i.key==="End")d=s.length-1;else return;let u=s[d];u instanceof HTMLButtonElement&&(i.preventDefault(),u.focus(),u.click())}),n.append(r)}return n.append(Se()),Fc(n,e),n}function Fc(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function Cf(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let c=0;c<e.slots.length;c++){let p=e.slots[c],h=document.createElement("span");h.className="nc-snap-wrap";let f=document.createElement("button");f.type="button",f.className="nc-snap",f.dataset.ncSlot=String(c),f.textContent=p.label,f.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",h.append(f,je()),Nf(h,f,n,c,t),a.append(h)}let r=e.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=Tc(),r.append(je()),r.addEventListener("click",()=>{zc(n);let c=t(n);c?.type==="slotRow"&&c.onSparkle?.()}));let i=document.createElement("div");i.className="nc-field nc-morph-field",i.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let c=t(n);c?.type==="slotRow"&&c.onMorph(Number(l.value))});let d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",i.append(s,d,l);let u=document.createElement("div");return u.className="nc-slot-line",u.append(a,...r?[r]:[]),n.append(u,i,Se()),Ic(n,t),Pc(n,e),n}function ms(e,t,n,a){let r=n(e);if(r?.type!=="slotRow")return;bn(e);let i=a.shiftKey?"store":a.altKey?"clear":"recall";r.onSlot(t,i)}function Nf(e,t,n,a,r){let i=0,s=0,l=0,d=!1,u=!1,c=!1,p=!1,h=()=>{window.clearTimeout(i),i=0},f=b=>{let v=b.clientX-s,y=b.clientY-l;v*v+y*y>ds*ds&&(d=!0,h())},g=()=>{p&&(p=!1,window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",m))},w=b=>{let v=i!==0&&!d&&!u;h(),g(),v&&(c=!0,ms(n,a,r,b))},m=()=>{d=!0,h(),g()};e.addEventListener("pointerdown",b=>{b.button===0&&(g(),u=!1,d=!1,c=!1,s=b.clientX,l=b.clientY,h(),i=window.setTimeout(()=>{i=0,!d&&(u=!0,Ff(n,t,a,r))},hf),p=!0,window.addEventListener("pointermove",f),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",m))}),e.addEventListener("contextmenu",b=>b.preventDefault()),e.addEventListener("click",b=>{if(c||u||d){c=!1,u=!1,d=!1;return}ms(n,a,r,b)})}function Ic(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=fs("Save","store"),r=fs("Clear","clear");n.append(a,r);let i=document.createElement("div");i.className="nc-slot-scrim",i.hidden=!0,i.setAttribute("aria-hidden","true"),i.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),bn(e)}),i.addEventListener("click",s=>s.stopPropagation()),e.append(i,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let d=t(e);if(d?.type!=="slotRow")return;let u=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(u,"store"),bn(e)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(u,"clear"),bn(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&bn(e)})}function fs(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Ff(e,t,n,a){Ic(e,a);let r=e.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let i=e.querySelector(".nc-slot-scrim");i instanceof HTMLElement&&(i.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function bn(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Pc(e,t){for(let r of e.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let i=Number(r.dataset.ncSlot),s=t.slots[i];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function zc(e){let t=e.dataset.ncLastFill||null,n=qh(t);e.dataset.ncLastFill=n;let a=Vh(n);if(a)for(let[r,i]of Object.entries(a))e.style.setProperty(r,i)}function If(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,r=i=>{if(a===i)return;a=i,n.setAttribute("aria-pressed",i?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(i)};n.addEventListener("pointerdown",i=>{i.button===0&&(i.preventDefault(),n.setPointerCapture?.(i.pointerId),r(!0))});for(let i of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(i,()=>r(!1));return n.addEventListener("keydown",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),i.repeat||r(!0))}),n.addEventListener("keyup",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),r(!1))}),n.addEventListener("contextmenu",i=>i.preventDefault()),n}function Pf(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let r=m=>{let b=document.createElement("button");return b.type="button",b.setAttribute("role","radio"),b.textContent=m,a.append(b),b},i=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=m=>{for(let b of[i,s]){let v=b===m;b.setAttribute("aria-checked",v?"true":"false"),b.tabIndex=v?0:-1}};l(i);for(let m of[i,s])m.addEventListener("click",()=>l(m));a.addEventListener("keydown",m=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(m.key))return;m.preventDefault();let b=s.getAttribute("aria-checked")==="true"?i:s;l(b),b.focus()});let d=document.createElement("div");if(d.className="nc-step-tools",d.append(a),e.onFill&&d.append(If(n,t)),e.onClear){let m=document.createElement("button");m.type="button",m.className="nc-fill nc-clear",m.dataset.ncClear="",m.textContent=e.clearLabel??"Clear",m.title="Clear every step (Undo takes it back)",m.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.onClear?.()}),d.append(m)}n.append(d);for(let m of e.rows){let b=document.createElement("div");b.className="nc-row",b.dataset.ncRow="";let v=document.createElement("button");v.type="button",v.className="nc-name",v.textContent=m.label,v.setAttribute("aria-label",`Select ${m.label}`),m.lane&&(v.dataset.ncLane=String((m.lane-1)%4+1));let y=!1,T=0;v.addEventListener("pointerdown",k=>{y=!1,!(k.pointerType==="mouse"||k.button!==0)&&(T=window.setTimeout(()=>{let M=t(n);M?.type!=="stepGrid"||!M.selectedRows||(y=!0,M.onSelectRow?.(M.rows.findIndex(S=>S.id===m.id),!0))},kf))});for(let k of["pointerup","pointercancel","pointerleave"])v.addEventListener(k,()=>window.clearTimeout(T));v.addEventListener("contextmenu",k=>{y&&k.preventDefault()}),v.addEventListener("click",k=>{let M=t(n);if(M?.type!=="stepGrid")return;if(y){y=!1;return}let S=M.rows.findIndex(F=>F.id===m.id),C=!!M.selectedRows&&(k.shiftKey||k.metaKey||k.ctrlKey);M.onSelectRow?.(S,C)}),v.addEventListener("keydown",k=>zf(n,v,k));let A=[];for(let k of["mute","solo"]){if(!(k==="mute"?e.onMute:e.onSolo))continue;let M=document.createElement("span");M.className="nc-ms-wrap";let S=document.createElement("button");S.type="button",S.className="nc-ms",S.dataset.ncMs=k,S.textContent=k==="mute"?"M":"S",S.setAttribute("aria-label",`${k==="mute"?"Mute":"Solo"} ${m.label}`),M.append(S,je()),M.addEventListener("click",()=>{let C=t(n);if(C?.type!=="stepGrid")return;let F=C.rows.findIndex(q=>q.id===m.id);(k==="mute"?C.onMute:C.onSolo)?.(F)}),A.push(M)}let x=document.createElement("div");x.className="nc-steps";for(let k=0;k<m.steps.length;k++){let M=document.createElement("span");M.className="nc-step-wrap";let S=document.createElement("button");S.type="button",S.className="nc-step",S.dataset.ncStep=`${m.id}:${k}`,S.setAttribute("aria-label",`${m.label} step ${k+1}`),M.append(S,je()),M.addEventListener("click",C=>{let F=t(n);if(F?.type!=="stepGrid")return;let q=F.rows.findIndex(X=>X.id===m.id),U=s.getAttribute("aria-checked")==="true";F.onToggle(q,k,C.shiftKey||U)}),x.append(M)}if(e.onLength&&x.append(Df(n,x,m,t)),b.append(...A,v,x),e.onDice){let k=document.createElement("button");k.type="button",k.className="nc-sparkle nc-row-dice",k.dataset.ncDice=m.id,k.setAttribute("aria-label",`Re-roll ${m.label}`),k.title=`Re-roll ${m.label}: new steps for this lane (Undo takes it back)`,k.innerHTML=us(),k.append(je()),k.addEventListener("click",()=>{let M=t(n);M?.type==="stepGrid"&&M.onDice?.(M.rows.findIndex(S=>S.id===m.id))}),b.append(k)}b.addEventListener("click",k=>{if(k.target!==b)return;let M=t(n);M?.type==="stepGrid"&&M.onSelectRow?.(M.rows.findIndex(S=>S.id===m.id))}),gs(n,x,".nc-step-wrap",t,s,()=>m.id),n.append(b)}let u=document.createElement("div");u.className="nc-pads-head";let c=(m,b,v)=>{let y=document.createElement("button");return y.type="button",y.className=m,y.textContent=b,v&&y.setAttribute("aria-label",v),y},p=c("nc-pads-step","‹","Previous lane"),h=c("nc-pads-step","›","Next lane"),f=document.createElement(e.onLength?"button":"span");f.className="nc-pads-label",f.setAttribute("aria-live","polite"),e.onLength&&(f.type="button",f.dataset.ncLenToggle="",f.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",ti(n,m))}));for(let[m,b]of[[p,-1],[h,1]])m.addEventListener("click",()=>{let v=t(n);if(v?.type!=="stepGrid"||v.rows.length===0)return;let y=v.rows.length;v.onSelectRow?.(((ea(v)+b)%y+y)%y)});if(u.append(p,f,h),e.onDice){let m=c("nc-pads-step nc-pads-dice","","Re-roll lane");m.dataset.ncPadsDice="",m.innerHTML=us(),m.addEventListener("click",()=>{let b=t(n);if(b?.type!=="stepGrid")return;let v=ea(b);v>=0&&b.onDice?.(v)}),u.append(m)}if(e.transport){let m=c("nc-pads-play","Play");m.dataset.ncPadsPlay="",m.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.transport?.onToggle()}),u.append(m)}n.append(u);let g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");let w=Math.max(0,...e.rows.map(m=>m.steps.length));for(let m=0;m<w;m++){let b=document.createElement("button");b.type="button",b.className="nc-pad",b.dataset.ncPad=String(m),b.textContent=String(m+1),b.addEventListener("click",v=>{let y=t(n);if(y?.type!=="stepGrid")return;let T=ea(y);if(T<0)return;if(n.dataset.ncLenMode==="true"){y.onLength?.(T,m+1);return}let A=s.getAttribute("aria-checked")==="true";y.onToggle(T,m,v.shiftKey||A)}),g.append(b)}return gs(n,g,".nc-pad",t,s,()=>{let m=t(n);return m?.type==="stepGrid"?m.rows[ea(m)]?.id:void 0}),n.append(g),n.append(Se()),ti(n,e),n}function ea(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function gs(e,t,n,a,r,i){let s="on",l=!0,d=-1,u=(c,p)=>{let h=c.rows[d]?.steps[p];!h||p>=c.rows[d].length||(c.onSet?c.onSet(d,p,s,l):!!h[s]!==l&&c.onToggle(d,p,s==="accent"))};af(t,n,c=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(c.kind!=="paint")return;let h=p.rows.findIndex(f=>f.id===i());h>=0&&p.rows[h].length!==c.pad+1&&p.onLength?.(h,c.pad+1);return}if(c.kind==="paint"){if(c.phase==="start"){let h=i();d=p.rows.findIndex(g=>g.id===h);let f=p.rows[d]?.steps[c.pad];if(!f)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!f[s]}u(p,c.pad)}else if(c.kind==="long"){let h=i(),f=p.rows.findIndex(w=>w.id===h),g=t.querySelectorAll(n)[c.pad];f>=0&&g instanceof HTMLElement&&p.onLongPress?.(f,c.pad,g)}}})}function zf(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],r=a.indexOf(t),i=r;n.key==="ArrowDown"?i=r+1:n.key==="ArrowUp"?i=r-1:n.key==="Home"?i=0:i=a.length-1;let s=a[i];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function Df(e,t,n,a){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(je());let i=u=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.findIndex(g=>g.id===n.id),h=c.rows[p];if(!h)return;let f=Math.max(1,Math.min(h.steps.length,u));f!==h.length&&c.onLength?.(p,f)},s=u=>{let c=[...t.querySelectorAll(".nc-step")],p=1;return c.forEach((h,f)=>{let g=h.getBoundingClientRect();g.width>0&&u>=g.left+g.width/2&&(p=f+1)}),p},l=u=>i(s(u.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete r.dataset.dragging};return r.addEventListener("pointerdown",u=>{u.button===0&&(u.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),r.addEventListener("keydown",u=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.find(f=>f.id===n.id);if(!p)return;let h={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};u.key in h&&(u.preventDefault(),i(h[u.key]))}),r}var br=new WeakMap,ta=new WeakMap;function Rf(e){return e?(ta.has(e)||(ta.set(e,Sa(e)),Kl(t=>{ta.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))ei(n,Number(n.getAttribute("data-nc-velocity")))},e)),ta.get(e)):"light"}function ei(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:Rf(e.ownerDocument),r=n===null?null:`${a} ${n}`;if(!(br.has(e)&&br.get(e)===r)){if(br.set(e,r),n===null){for(let i of Object.keys(Wo(1)))e.style.removeProperty(i);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[i,s]of Object.entries(Wo(n,Go[a]??Go.light)))e.style.setProperty(i,s)}}function ti(e,t){let n=t.rows.some(c=>c.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let r=e.querySelector(".nc-pads"),i=t.rows.find(c=>c.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&i&&(s.textContent=l?`${i.label} · ${i.length}`:i.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${i.label} length ${i.length} steps: tap or drag the pads to set the end, tap here when done`:`${i.label}, ${i.length} steps: tap to set the length`)));let d=e.querySelector("[data-nc-pads-dice]");d instanceof HTMLElement&&i&&(d.setAttribute("aria-label",`Re-roll ${i.label}`),d.title=`Re-roll ${i.label}: new steps for this lane (Undo takes it back)`);let u=e.querySelector("[data-nc-pads-play]");if(u instanceof HTMLElement){let c=!!t.transport?.playing,p=t.transport?.label??(c?"Stop":"Play");u.textContent!==p&&(u.textContent=p),u.setAttribute("aria-pressed",c?"true":"false");let h=t.transport?.ariaLabel;h?u.setAttribute("aria-label",h):u.removeAttribute("aria-label")}if(r instanceof HTMLElement&&i){r.setAttribute("aria-label",`${i.label} steps`),i.lane&&(r.dataset.ncLane=String((i.lane-1)%4+1)),i.mute||n&&!i.solo?r.dataset.silent="true":delete r.dataset.silent;let c=i.length>0?(t.playhead%i.length+i.length)%i.length:-1;for(let p of r.querySelectorAll("[data-nc-pad]")){let h=Number(p.getAttribute("data-nc-pad")),f=i.steps[h];p instanceof HTMLButtonElement&&(p.hidden=!f||!l&&h>=i.length,l&&h>=i.length?p.dataset.out="true":delete p.dataset.out,l&&h===i.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${i.label} step ${h+1}`),p.setAttribute("aria-pressed",f?.on?"true":"false"),f?.accent?p.dataset.accent="true":delete p.dataset.accent,f?.dim?p.dataset.dim="true":delete p.dataset.dim,ei(p,f?.velocity),t.playhead>=0&&h===c?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let c of t.rows){for(let f=0;f<c.steps.length;f++){let g=c.steps[f],w=e.querySelector(`[data-nc-step="${c.id}:${f}"]`);if(!(w instanceof HTMLButtonElement))continue;let m=w.closest(".nc-row");if(m instanceof HTMLElement){t.selectedRow===c.id?m.dataset.selected="true":delete m.dataset.selected;let y=t.selectedRow!==c.id&&(t.selectedRows??[]).includes(c.id);y?m.dataset.picked="true":delete m.dataset.picked;let T=m.querySelector(".nc-name");T instanceof HTMLElement&&(T.setAttribute("aria-pressed",t.selectedRow===c.id||y?"true":"false"),T.textContent!==c.label&&(T.textContent=c.label,T.setAttribute("aria-label",`Select ${c.label}`))),c.mute||n&&!c.solo?m.dataset.silent="true":delete m.dataset.silent;for(let A of m.querySelectorAll("[data-nc-ms]")){let x=A.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;A.setAttribute("aria-pressed",x?"true":"false")}}w.setAttribute("aria-pressed",g.on?"true":"false"),g.accent?w.dataset.accent="true":delete w.dataset.accent,g.dim?w.dataset.dim="true":delete w.dataset.dim,f%4===0?w.dataset.bar="true":delete w.dataset.bar,typeof g.velocity=="number"?(w.dataset.velocity="true",w.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,g.velocity))*100)}%`)):(delete w.dataset.velocity,w.style.removeProperty("--level")),ei(w,g.velocity);let b=t.playhead>=0&&c.length>0?(t.playhead%c.length+c.length)%c.length:-1;f===b?w.dataset.playhead="true":delete w.dataset.playhead;let v=!!t.onLength&&t.selectedRow===c.id;w.hidden=f>=c.length&&!v,f>=c.length&&v?w.dataset.out="true":delete w.dataset.out}let p=e.querySelector(`[data-nc-len="${c.id}"]`),h=e.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&h&&h.nextElementSibling!==p){let f=document.activeElement===p;h.after(p),f&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(c.length)),p.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),p.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function Of(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,Se()),t}function Bf(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let r=document.createElement("span");r.className="nc-strip-name",r.dataset.ncStripName="";let i=!e.master&&typeof e.onFold=="function",s=null;i&&(n.dataset.ncFoldable="",s=qc(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let y=t(n);y?.type==="strip"&&(y.onFold?.(y.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(r);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let y=document.createElement("span");y.className="nc-strip-grip-dots",y.setAttribute("aria-hidden","true"),l.append(y),l.addEventListener("keydown",T=>{if(T.key!=="ArrowLeft"&&T.key!=="ArrowRight"||T.ctrlKey||T.metaKey||T.shiftKey)return;let A=t(n);A?.type==="strip"&&(T.preventDefault(),A.onMove?.(T.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>ws(n,l,t))),!e.master&&typeof e.onShade=="function"&&a.addEventListener("contextmenu",y=>{y.pointerType==="touch"||y.pointerType==="pen"||y.target instanceof Element&&y.target.closest("input, .nc-strip-remove")||(y.preventDefault(),ws(n,a,t,{x:y.clientX,y:y.clientY}))}),e.onRemove){let y=document.createElement("button");y.type="button",y.className="nc-strip-remove",y.dataset.ncStripRemove="",y.textContent="×",y.addEventListener("click",()=>{let T=t(n);T?.type==="strip"&&T.onRemove?.(y)}),a.append(y)}let d=document.createElement("div");if(d.className="nc-strip-hacks",e.onHacks){let y=document.createElement("span");y.className="nc-hacks-wrap";let T=document.createElement("button");T.type="button",T.className="nc-hacks",T.dataset.ncHacks="",y.append(T,je()),y.addEventListener("click",()=>{let A=t(n);A?.type==="strip"&&A.onHacks?.()}),d.append(y)}let u=document.createElement("div");if(u.className="nc-strip-ms",e.onSendsView){let y=document.createElement("span");y.className="nc-hacks-wrap nc-sends-view-wrap";let T=document.createElement("button");T.type="button",T.className="nc-hacks nc-sends-view",T.dataset.ncSendsView="",y.append(T,je()),y.addEventListener("click",()=>{let A=t(n);A?.type==="strip"&&A.onSendsView?.()}),u.append(y)}for(let y of["mute","solo"]){if(!(y==="mute"?e.onMute:e.onSolo))continue;let T=document.createElement("span");T.className="nc-ms-wrap";let A=document.createElement("button");A.type="button",A.className="nc-ms",A.dataset.ncMs=y,A.textContent=y==="mute"?"M":"S",T.append(A,je()),T.addEventListener("click",()=>{let x=t(n);x?.type==="strip"&&(y==="mute"?x.onMute:x.onSolo)?.()}),u.append(T)}let c=document.createElement("div");c.className="nc-strip-sends";for(let y of e.sends??[])c.append(Tt({...y,type:"knob",compact:!0},t));let p=document.createElement("div");p.className="nc-strip-pan",e.pan&&p.append(Tt(zi(e),t));let h=document.createElement("div");h.className="nc-strip-body";let f=document.createElement("span");f.className="nc-scale",f.setAttribute("aria-hidden","true");for(let y of e.ticks??[]){let T=document.createElement("span");T.className="nc-scale-tick",T.style.setProperty("--tick-pos",String(y.value)),T.textContent=y.label,f.append(T)}let g=um({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:y=>{let T=t(n);T?.type==="strip"&&T.onChange(y)},onReset:()=>{let y=t(n);y?.type==="strip"&&ys(y)}}),w=bm({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let y=t(n);y?.type==="strip"&&y.onClipClear?.()}});if(h.append(f,g.el,w.el),i){let y=document.createElement("button");y.type="button",y.className="nc-ui-fx-fold nc-strip-fold",y.dataset.ncStripFold="",y.setAttribute("aria-expanded","false");let T=document.createElement("span");T.className="nc-strip-fold-cap",T.setAttribute("aria-hidden","true");let A=document.createElement("span");A.className="nc-ui-fx-fold-name",A.dataset.ncStripFoldName="";let x=document.createElement("span");x.className="nc-strip-fold-pan",x.setAttribute("aria-hidden","true"),x.hidden=!e.pan,y.append(T,x,A),y.addEventListener("click",()=>{let k=t(n);if(k?.type!=="strip")return;k.onFold?.(!1);let M=n.querySelector("[data-nc-strip-hide]");M instanceof HTMLElement&&M.focus()}),h.prepend(y)}let m=document.createElement("button");m.type="button",m.className="nc-strip-db",m.dataset.ncReadout="";let b=0;m.addEventListener("click",y=>{let T=t(n);T?.type!=="strip"||!T.onTypeIn||(window.clearTimeout(b),y.detail===0?bs(n,m,t):y.detail===1&&(b=window.setTimeout(()=>bs(n,m,t),qf)))}),m.addEventListener("dblclick",()=>{window.clearTimeout(b);let y=t(n);y?.type==="strip"&&ys(y)});let v=document.createElement("div");return v.className="nc-strip-trim",e.trim&&v.append(Tt(Di(e),t)),s&&n.append(s),l&&n.append(l),n.append(a,v,d,u,c,p,h,m,Se()),Oc(n,e),n}function zi(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??_f(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function Di(e){let t=e.trim,n=t.min??-12,a=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:a,step:t.step??.5,value:t.value,valueText:t.valueText??jf(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:r=>t.onChange(r)}}function jf(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function _f(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var qf=250;function bs(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=a.valueText??In(a.value),r.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(r),r.focus(),r.select?.();let i=!1,s=l=>{if(i)return;i=!0;let d=r.value;if(r.remove(),t.hidden=!1,l){let u=n(e);u?.type==="strip"&&u.onTypeIn?.(d)}t.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function Vf(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let i=document.createElement("span");i.className="nc-strip-add-label",a.append(r,i);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),d=s.value;Rc(s),l?.type==="stripAdd"&&d&&l.onAdd(d)}),n.append(a,s,Se()),Dc(n,e),n}function Dc(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let r=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],i=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");i!==s&&(a.replaceChildren(...r.map(l=>{let d=document.createElement("option");return d.value=l.value,d.textContent=l.label,d.disabled=l.disabled===!0,d})),Rc(a))}function Rc(e){let t=e.options[0];t&&(t.selected=!0)}function ys(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Oc(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let r=e.querySelector(".nc-fader"),i=r?pm(r):void 0;i&&(i.configure({step:t.step}),i.set(t.value),i.setText(t.valueText),i.setLabel(`${t.label} level`)),ac(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let g=t.valueText??In(t.value);s.textContent!==g&&(s.textContent=g),s.setAttribute("aria-label",`${t.label} level ${g}`);let w=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${w}`:w}for(let g of e.querySelectorAll("[data-nc-ms]")){let w=g.getAttribute("data-nc-ms"),m=w==="mute"?t.mute===!0:t.solo===!0;g.setAttribute("aria-pressed",m?"true":"false"),g.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let g=t.hacksLabel??"Hacks";l.textContent!==g&&(l.textContent=g),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${g}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let d=e.querySelector("[data-nc-sends-view]");if(d){let g=t.sendsViewLabel??"Sends";d.textContent!==g&&(d.textContent=g),d.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),d.setAttribute("aria-label",`${g}: ${t.sendsView===!0?"hide":"show"} the send effects`),d.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),mt(d,t.sendsViewHelp)}let u=e.querySelector("[data-nc-strip-grip]");u instanceof HTMLElement&&(u.setAttribute("aria-label",`Move ${t.label}`),u.title=t.moveHelp??"Drag to move this channel");let c=Bc(t);if(c?e.dataset.ncShade=String(c):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let g=e.querySelector(`.nc-strip-trim [data-nc-id="${Lt(t.trim.id)}"]`);g&&Fe(g,Di(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let g=e.querySelector(`.nc-strip-pan [data-nc-id="${Lt(t.pan.id)}"]`);g&&Fe(g,zi(t))}let p=!t.master&&typeof t.onFold=="function"&&t.folded===!0;p?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let h=e.querySelector("[data-nc-strip-hide]");h instanceof HTMLElement&&(Vc(h,p,t.label),mt(h,t.foldHelp));let f=e.querySelector("[data-nc-strip-fold]");if(f instanceof HTMLElement){f.hidden=!p,f.setAttribute("aria-label",`Expand ${t.label}`);let g=f.querySelector("[data-nc-strip-fold-name]");g&&g.textContent!==t.label&&(g.textContent=t.label),mt(f,t.foldedHelp??t.foldHelp)}}function Bc(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=jc?t:0}var jc=8,na=null;function ws(e,t,n,a){na?.();let r=n(e);if(r?.type!=="strip")return null;let i=e.ownerDocument,s=i.defaultView??globalThis,l=i.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${r.label}: shade and place`);let d=i.createElement("div");d.className="nc-strip-menu-title",d.id=`nc-strip-menu-title-${String(r.id).replace(/[^\w-]/g,"")}`,d.textContent="Shade";let u=i.createElement("div");u.className="nc-strip-menu-shades",u.setAttribute("role","radiogroup"),u.setAttribute("aria-labelledby",d.id);let c=Bc(r),p=e.querySelector("[data-nc-strip-grip]")??t,h=(b=!1)=>{if(na!==h)return;na=null;let v=l.contains(i.activeElement);l.remove(),i.removeEventListener("keydown",g,!0),i.removeEventListener("pointerdown",w,!0),s.removeEventListener("resize",m),(b||v)&&p?.isConnected&&p.focus?.({preventScroll:!0})},f=[0,...Array.from({length:jc},(b,v)=>v+1)].map(b=>{let v=i.createElement("button");return v.type="button",v.setAttribute("role","radio"),v.setAttribute("aria-checked",b===c?"true":"false"),v.setAttribute("tabindex",b===c?"0":"-1"),v.dataset.ncShadeChoice=String(b),b===0?(v.textContent="Auto",v.setAttribute("aria-label","Auto: alternate light and dark"),v.title="Auto: alternate light and dark"):(v.textContent=String(b),v.setAttribute("aria-label",`Shade ${b}`),v.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${b})`)),v.addEventListener("click",()=>{let y=n(e);h(!0),y?.type==="strip"&&y.onShade?.(b===0?null:b)}),v});if(u.append(...f),u.addEventListener("keydown",b=>{let v=f.indexOf(i.activeElement);if(v<0)return;let y=-1;b.key==="ArrowRight"||b.key==="ArrowDown"?y=(v+1)%f.length:b.key==="ArrowLeft"||b.key==="ArrowUp"?y=(v-1+f.length)%f.length:b.key==="Home"?y=0:b.key==="End"&&(y=f.length-1),!(y<0)&&(b.preventDefault(),f[v].setAttribute("tabindex","-1"),f[y].setAttribute("tabindex","0"),f[y].focus())}),l.append(d,u),typeof r.onMove=="function"){let b=[...e.parentElement?.children??[]].filter(y=>y.classList?.contains("nc-strip")&&!y.hasAttribute("data-nc-master")),v=b.indexOf(e);for(let[y,T,A]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let x=i.createElement("button");x.type="button",x.className="nc-strip-menu-item",x.dataset.ncStripMove=y<0?"left":"right";let k=i.createElement("span");k.textContent=T;let M=i.createElement("kbd");M.textContent=A,M.setAttribute("aria-hidden","true"),x.append(k,M),x.disabled=y<0?v<=0:v<0||v>=b.length-1,x.addEventListener("click",()=>{let S=n(e);h(!0),S?.type==="strip"&&S.onMove?.(y)}),l.append(x)}}i.body.append(l),(()=>{let b=t.getBoundingClientRect?.()??{bottom:0,right:0},v=l.offsetWidth,y=l.offsetHeight,T=s.innerWidth||i.documentElement.clientWidth||v,A=s.innerHeight||i.documentElement.clientHeight||y,x=a?a.x:b.right-v,k=a?a.y:b.bottom+4;x=Math.max(4,Math.min(x,T-v-4)),k+y>A-4&&(k=Math.max(4,(a?a.y:b.top)-y-4)),l.style.left=`${Math.round(x)}px`,l.style.top=`${Math.round(k)}px`})();let g=b=>{if(b.key==="Escape")b.preventDefault(),b.stopPropagation(),h(!0);else if(b.key==="Tab"&&l.contains(i.activeElement)){let v=[...l.querySelectorAll("button:not([disabled])")].filter(T=>T.getAttribute("tabindex")!=="-1"),y=(v.indexOf(i.activeElement)+(b.shiftKey?-1:1)+v.length)%v.length;b.preventDefault(),v[y]?.focus()}},w=b=>{l.contains(b.target)||h(!1)},m=()=>h(!1);return i.addEventListener("keydown",g,!0),i.addEventListener("pointerdown",w,!0),s.addEventListener("resize",m),na=h,(f.find(b=>b.getAttribute("tabindex")==="0")??f[0]).focus({preventScroll:!0}),{el:l,close:()=>h(!1)}}function vs(e,t){let n=e?.querySelector?.(`.nc-strip[data-nc-id="${Lt(t)}"]`);return ac(n?.querySelector(".nc-meter")??void 0)}var ni=typeof ResizeObserver=="function"?new ResizeObserver(Hf):null;function Hf(e){for(let t of e){if(!t.target.isConnected){ni.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&Uf(n)}}function Uf(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,r=n instanceof HTMLElement?n.offsetHeight:0,i=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+r+i}px`)}function Gf(e){if(ni)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))ni.observe(t)}function Wf(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let r=typeof e.onFold=="function",i=!!e.meter,s=typeof e.onRemove=="function";if(e.on===void 0&&!r&&!La(e)&&!i&&!s)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),i&&l.append(Uc(n,"head")),e.on!==void 0){let d=Ai({checked:e.on,labelledBy:a.id,onChange:u=>{let c=t(d.el);c?.type==="fx"&&c.onToggle?.(u)}});d.el.dataset.ncFxSwitch="",l.append(d.el)}r&&l.append(Yf(n,t)),La(e)&&l.append(Zf(n,t)),s&&l.append(eg(t)),n.append(l)}r&&n.prepend(Xf(n,t)),i&&Gc(n,e);for(let l of e.controls)n.append(Tt(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let d=document.createElement("summary");d.textContent=e.moreLabel??"More",l.append(d);for(let u of e.more)l.append(Tt(u,t));n.append(l)}return n.append(Se()),Wc(n,e),Gf(n),n}var Kf=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function _c(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&Kf(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function Yf(e,t){let n=qc();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),_c(e))}),n}function qc(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Vc(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function Xf(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let r=document.createElement("span");r.className="nc-ui-fx-fold-name",r.dataset.ncFxFoldName="";let i=document.createElement("span");return i.className="nc-fold-tri",i.setAttribute("aria-hidden","true"),n.append(i,a,r),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Uc(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),_c(e)}}),n}var en=new Set;function ha(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var La=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"),Jf="(max-width: 768px)";function Qf(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function Zf(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(Qf()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(Hc(e,a,!en.has(a.id)),n.focus())}),n}function eg(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function Hc(e,t,n){n?en.add(t.id):en.delete(t.id),Ri(e,t)}function tg(e,t){t?.type==="fx"&&en.has(t.id)&&Hc(e,t,!1)}function ng(e){return e.ownerDocument.defaultView?.matchMedia?.(Jf).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Ri(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=La(t)&&en.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!La(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),ha(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Zt(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",mt(n,t.maxHelp)),!a){e.dataset.ncMax&&xs(e);return}if(!e.isConnected){let s=()=>e.isConnected&&en.has(t.id)&&Ri(e,t);queueMicrotask(()=>{e.isConnected?s():ha(e.ownerDocument,s)});return}let r=ng(e),i=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;i>0&&e.style.setProperty("--nc-fx-dials",String(i)),e.dataset.ncMax!==r&&(e.dataset.ncMax&&xs(e),e.dataset.ncMax=r,r==="over"&&ag(e,t)),rg(e.ownerDocument),r==="over"&&Oi(e),ha(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Zt(s)})}function xs(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),ha(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Zt(n)})}function ag(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let r=e.querySelector("[data-nc-fx-max]");r instanceof HTMLElement&&r.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function Oi(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,r=e.ownerDocument.defaultView,i=Number.parseFloat(r?.getComputedStyle(a).columnGap??"")||0,s=zm(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),i,r?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var ks=new WeakSet;function rg(e){ks.has(e)||(ks.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(r=>r.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&Oi(t)}))}var ai=new WeakMap;function Uc(e,t){let n=Jm(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Gc(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let r of n)mt(r,t.meterHelp);let a=ai.get(e);a?a.set(t.meter):ai.set(e,tf(n,t.meter))}function Wc(e,t){(t.meter||ai.has(e))&&Gc(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let r=typeof t.onFold=="function"&&t.folded===!0;r?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let i=e.querySelector("[data-nc-fx-hide]");i instanceof HTMLElement&&(Vc(i,r,t.title),mt(i,t.foldHelp)),Ri(e,t);let s=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let d=t.removeLabel??`Remove ${t.title}`;s.hidden=r,s.setAttribute("aria-label",d),s.title=d}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let d=t.on===void 0?"":t.on?"On":"Off";l.hidden=!r,l.setAttribute("aria-label",`Expand ${t.title}${d?`, ${d.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let u=l.querySelector("[data-nc-fx-fold-state]");u&&(u.textContent=d,u.hidden=d==="");let c=l.querySelector("[data-nc-fx-fold-name]");c&&(c.textContent=t.title),mt(l,t.foldHelp)}}function mt(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Lt(e){return e.replace(/["\\]/g,"\\$&")}function ig(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);a?.type==="canvas"&&sc(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Zt(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&Oi(n);ff(e)}var og=pt["toast-duration"];function sg({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function lg(e,t,n,a){let r=l=>({top:l,bottom:l+n}),i=l=>e.some(d=>d&&d.bottom>l.top&&d.top<l.bottom),s=r(t-a-n);return i(s)?i(r(a))?"bottom":"top":"bottom"}function cg(e,t,n,a,r,i){let s=e.bottom+r,l=Math.max(i,Math.min(e.left,a-i-n.width));for(let d=!0,u=0;d&&u<8;u++){d=!1;for(let c of t)c&&c.bottom>s&&c.top<s+n.height&&c.right>l&&c.left<l+n.width&&(s=c.bottom+r,d=!0)}return{top:s,left:l}}var $s="data-nc-ui-toast-live";function dg(e,t){let n=t.querySelector(`[${$s}]`);return n||(n=e.createElement("div"),n.setAttribute($s,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function yn({message:e,actionLabel:t,onAction:n,duration:a=og,onClose:r,avoid:i=[],anchor:s,host:l,document:d=globalThis.document}={}){l=l??d.body;let u=d.defaultView??globalThis,c=d.createElement("div");c.className="nc-ui-toast",c.setAttribute("data-state","enter");let p=d.createElement("span");p.className="nc-ui-toast-message",p.textContent=e,c.appendChild(p);let h=null;t&&(h=d.createElement("button"),h.type="button",h.className="nc-ui-toast-action",h.textContent=t,c.appendChild(h)),l.appendChild(c);let f="open",g=ie=>ie&&typeof ie.getBoundingClientRect=="function"?ie.getBoundingClientRect():null,w=g(c),m=w?.height||44,b=u.getComputedStyle?.(c),v=Number.parseFloat(b?.getPropertyValue(te("toast-offset")))||16,y=Number.parseFloat(b?.getPropertyValue(te("toast-anchor-gap")))||8,T=g(s),A=u.innerHeight??0,x=i.map(g).filter(Boolean),k=T&&T.bottom>0&&T.top<A?cg(T,x,{width:w?.width||0,height:m},u.innerWidth??0,y,v):null;k&&k.top+m<=A?(c.setAttribute("data-placement","anchor"),c.style.top=`${k.top+(u.scrollY??0)}px`,c.style.left=`${k.left+(u.scrollX??0)}px`):c.setAttribute("data-placement",lg(x,A,m,v));let M=u.requestAnimationFrame?.bind(u)??(ie=>setTimeout(ie,16));M(()=>M(()=>{f==="open"&&c.setAttribute("data-state","open")})),dg(d,l).textContent=sg({message:e,actionLabel:t});let S,C,F=new Promise(ie=>{C=ie}),q=ie=>{clearTimeout(S),S=setTimeout(()=>re("timeout"),ie)},U=a,X=Date.now(),fe=()=>{f==="open"&&(clearTimeout(S),U=Math.max(0,U-(Date.now()-X)))},ge=()=>{f==="open"&&(X=Date.now(),q(U))};c.addEventListener("pointerenter",fe),c.addEventListener("pointerleave",ge),c.addEventListener("focusin",fe),c.addEventListener("focusout",ge),h?.addEventListener("click",()=>{if(f==="open")try{n?.()}finally{re("action")}}),Number.isFinite(a)&&q(a);function re(ie="close"){if(f!=="open")return;f="closing",clearTimeout(S),c.setAttribute("data-state","closing"),r?.(ie);let G=u.getComputedStyle?.(c),ze=G?Math.max(0,...String(G.transitionDuration||"").split(",").map(be=>Number.parseFloat(be)*(be.trim().endsWith("ms")?1:1e3)||0)):0,K=()=>{f!=="gone"&&(f="gone",c.remove(),C(ie))};c.addEventListener("transitionend",K),setTimeout(K,ze+50)}return{el:c,close:re,closed:F}}var Es="data-nc-help";function ug(e,t,n,a=0,r=6,i=8){let s=e.top-r-t.height,l=s>=a+i?"above":"below",d=l==="above"?s:e.bottom+r,u=Math.max(i,Math.min(e.left,n-i-t.width));return{top:Math.round(d),left:Math.round(u),side:l}}var yr=new WeakMap;function pg(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function hg({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=yr.get(e);if(n)return n;let a=e.defaultView,r=null,i=null,s,l=()=>{clearTimeout(s),i=null,r&&(r.hidden=!0)},d=h=>{let f=h.getAttribute(Es);if(!f)return;r||(r=e.createElement("div"),r.className="nc-ui-help",r.setAttribute("role","tooltip"),r.dataset.testid="nc-help",r.style.position="fixed",r.style.pointerEvents="none",r.style.zIndex="6",e.body.appendChild(r)),r.textContent=f,r.hidden=!1,r.style.visibility="hidden",r.style.top="0px",r.style.left="0px";let g=h.getBoundingClientRect(),w=ug(g,{width:r.offsetWidth,height:r.offsetHeight},a.innerWidth,pg(e));r.style.top=`${w.top}px`,r.style.left=`${w.left}px`,r.dataset.side=w.side,r.style.visibility=""},u=h=>{if(h.pointerType==="touch")return;let f=h.target&&h.target.closest?h.target.closest(`[${Es}]`):null;f!==i&&(l(),f&&(i=f,s=setTimeout(()=>{i===f&&f.isConnected&&d(f)},t)))},c=h=>{h.key==="Escape"&&l()};e.addEventListener("pointerover",u),e.addEventListener("pointerdown",l,!0),e.addEventListener("keydown",c),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);let p={hide:l,uninstall(){l(),e.removeEventListener("pointerover",u),e.removeEventListener("pointerdown",l,!0),e.removeEventListener("keydown",c),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),r?.remove(),r=null,yr.delete(e)}};return yr.set(e,p),p}var Kc="(max-width: 768px)",mg='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',fg='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',gg=0;function bg({panel:e,button:t,label:n="Menu",media:a=Kc}){let r=e.ownerDocument,i=r.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++gg}`);let s=t??r.createElement("button");t||(s.type="button",s.innerHTML=mg),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function d(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),r.addEventListener("keydown",c,!0),r.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(fg)].find(m=>!m.hidden&&m.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function u({focus:m}={}){if(!l())return;let b=e.contains(r.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),r.removeEventListener("keydown",c,!0),r.removeEventListener("pointerdown",p,!0),(m??b)&&s.focus?.({preventScroll:!0})}function c(m){m.key==="Escape"&&(m.preventDefault(),m.stopPropagation(),u({focus:!0}))}function p(m){let b=m.target;b instanceof i.Node&&(e.contains(b)||s.contains(b))||u({focus:!1})}let h=()=>l()?u({focus:!0}):d(),f=m=>{let b=m.target,v=b instanceof i.Element?b.closest("button"):null;!v||!e.contains(v)||v.closest("[data-nc-menu-stay]")||u({focus:!0})};s.addEventListener("click",h),e.addEventListener("click",f);let g=i.matchMedia?.(a),w=()=>{g?.matches||u({focus:!1})};return g?.addEventListener?.("change",w),{button:s,panel:e,open:d,close:u,isOpen:l,destroy(){u({focus:!1}),s.removeEventListener("click",h),e.removeEventListener("click",f),g?.removeEventListener?.("change",w)}}}var Bi="netcomposer.rhythm.hidden.v1",We=new WeakMap;function wr(){try{return globalThis.localStorage??null}catch{return null}}function Yc(e,t=Bi){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Ss(e,t,n,a=Bi){let r=Yc(e,a);n?r.add(t):r.delete(t);try{e?.setItem(a,JSON.stringify([...r]))}catch{}}function ji(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(r=>r.controls)],n=[],a=r=>{if(n.push(r),r.type==="group")for(let i of r.controls)a(i)};for(let r of t)a(r),r.type==="fx"&&n.push(...r.controls,...r.more??[]),r.type==="strip"&&(n.push(...(r.sends??[]).map(i=>({...i,type:"knob",compact:!0}))),r.pan&&n.push(zi(r)),r.trim&&n.push(Di(r)));return n}function Xc(e,t){if(!(!e||!t))return ji(e).find(n=>n.id===t)}function yg(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${ji(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function wg(e,t){if(!t.title)return;if(!t.panel){let i=document.createElement("h3");i.className="nc-ui-fx-name",i.textContent=t.title,e.append(i);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(a,r),e.append(n),Jc(e,t)}function Jc(e,t){if(!t.panel)return;let n=[...e.children].find(i=>i.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),r&&(r.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function vg(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=We.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Xc(n,a)}function xg(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],r=yg(t);if(e.dataset.ncSignature===r){for(let i of a){let s=e.querySelector(`[data-nc-section="${Ms(i.id)}"]`);s&&Jc(s,i);for(let l of i.controls){let d=e.querySelector(`[data-nc-id="${Ms(l.id)}"]`);d instanceof Element&&Fe(d,l)}s instanceof HTMLElement&&ri(s,i,n)}return}e.dataset.ncSignature=r,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let i of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=i.id,i.inset&&(s.dataset.ncInset="true"),i.area&&(s.dataset.ncArea=i.area),i.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",i.label)),i.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),i.title&&s.setAttribute("aria-label",i.title)),wg(s,i);let l=i.panel?document.createElement("div"):s;i.panel&&(l.className="nc-panel-body",s.append(l));for(let d of i.controls)l.append(Tt(d,vg));e.append(s),ri(s,i,n)}}function Qc(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,r=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,r))}}var kg="(max-width: 768px)",Zc=new WeakMap;function As(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function $g(e,t){let n=[...e.children].find(u=>u.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let r=As("prev"),i=As("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(r,s,i,l);let d=(u,c)=>{let p=Zc.get(e);if(!p||c.getAttribute("aria-disabled")==="true")return;let h=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:f}=Qc(h,p.pageSize,(t.pages.get(p.id)??0)+u);t.pages.set(p.id,f),p.onPage?.(f),ri(e,{...p,page:f},t),c.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===c&&(c===r?i:r).focus(),t.redraw()};return r.addEventListener("click",()=>d(-1,r)),i.addEventListener("click",()=>d(1,i)),e.prepend(a),a}function ri(e,t,n){Zc.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],r=t.pageSize??0,{pages:i,page:s}=Qc(a.length,r,t.page??n.pages.get(t.id)??0);if(r>0&&n.pages.set(t.id,s),i<=1){for(let m of[...e.children])m.classList.contains("nc-fx-pager")&&m.remove();delete e.dataset.ncPaged;for(let m of a)delete m.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(kg).matches===!0,d=e.closest(".nc-module");a.forEach((m,b)=>{let v=Math.floor(b/r)!==s;if(v?m.dataset.ncOffPage="":delete m.dataset.ncOffPage,v&&!l){let y=d instanceof HTMLElement?We.get(d):void 0;tg(m,Xc(y,m.dataset.ncId))}});let u=$g(e,n),c=u.querySelector('[data-nc-fx-page="prev"]'),p=u.querySelector('[data-nc-fx-page="next"]');c.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===i-1?"true":"false");let h=u.querySelector("[data-nc-fx-page-count]"),f=`${s+1} / ${i}`;h.textContent!==f&&(h.textContent=f);let g=u.querySelector("[data-nc-fx-page-live]"),w=`Effects page ${s+1} of ${i}`;g.textContent!==w&&(g.textContent=w)}function Ms(e){return e.replace(/["\\]/g,"\\$&")}function Eg(e,t=Bi){Ql();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Yc(wr(),t).has(e.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let i=document.createElement("h2");i.className="nc-title",i.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";let u=Ai({labelledBy:i.id,onChange:v=>(We.get(n)??e).onToggle?.(v)});u.el.dataset.ncModuleSwitch="",s.append(u.el,l,d);let c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",r.append(i,c,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let h=document.createElement("button");h.type="button",h.className="nc-slim";let f=document.createElement("span");f.className="nc-slim-lines",h.append(f);let g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",n.append(g,r,p,h),n.setAttribute("aria-labelledby",i.id);let w=v=>{let y=We.get(n)??e;n.dataset.ncOpen=v?"false":"true",p.hidden=v,h.hidden=!v,l.textContent=v?"+":"−",l.setAttribute("aria-expanded",v?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${v?"Show":"Hide"} ${y.title}`),l.title=v?"Show":"Hide",v?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let v=n.dataset.ncOpen==="true";Ss(wr(),(We.get(n)??e).id,v,t),w(v),ii(n.parentElement)}),h.addEventListener("click",()=>{Ss(wr(),(We.get(n)??e).id,!1,t),w(!1),ii(n.parentElement)});let m={pages:new Map,redraw:()=>b.redraw()},b={el:n,update(v){We.set(n,v),v.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,i.textContent=v.title,c.textContent=v.status??"",v.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),f.textContent=v.summary??v.title,u.el.hidden=v.on===void 0,u.set(v.on===!0),v.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,h.setAttribute("aria-label",`Show ${v.title}`),xg(p,v,m),w(p.hidden),b.redraw()},redraw(){let v=We.get(n);v&&ig(n,ji(v))}};return We.set(n,e),w(a),b.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>b.redraw()).observe(n),Kl(()=>b.redraw(),n.ownerDocument),b}function Sg(e,t,n="adjacent"){Ql(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((r,i)=>{let s=i%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=a;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(r.el),r.redraw()}),ii(e)}function ii(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(i=>i instanceof HTMLElement&&i.classList.contains("nc-module")),n=t.some(i=>i.hasAttribute("data-nc-lead")),a=t.map(i=>i.hasAttribute("data-nc-slim")?o("module-slim-column"):n?i.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let r=t.filter(i=>!i.hasAttribute("data-nc-slim"));n&&t.length===4&&r.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const ed="netcomposer.studio.instances.v1",Ts="netcomposer.studio.types-seen.v1",Ag=["petra-rhythm","olive-bass"];function td(e,t){return t===1?e:`${e}#${t}`}function _i(e){const t=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(e);if(!t?.[1])return null;const n=t[2]?Number(t[2]):1;return n===1&&t[2]?null:{type:t[1],n}}function Mg(e,t){return t===1?e.name:`${e.name} ${t}`}function an(e,t,n){const a=Mg(e,t),r=ad(n,a);return{id:td(e.id,t),type:e.id,n:t,name:r,src:e.src,...r!==a?{custom:!0}:{}}}const nd=20;function ad(e,t){return typeof e!="string"?t:[...e.replace(/\s+/g," ").trim()].slice(0,nd).join("").trim()||t}function Tg(e,t,n,a){return e.map(r=>{if(r.id!==t)return r;const i=a.find(s=>s.id===r.type);return i?an(i,r.n,n):r})}function Lg(e,t){const n=new URLSearchParams({instance:String(e.n)});return t&&n.set("measure",""),`${e.src}?${n.toString().replace(/=(&|$)/g,"$1")}`}function Cg(e,t){const n=new Set(e.filter(r=>r.type===t.id).map(r=>r.n));let a=1;for(;n.has(a);)a++;return an(t,a)}function Pn(e){return e.filter(t=>t.available!==!1).map(t=>an(t,1))}function Ng(e,t){if(!Array.isArray(e))return Pn(t);const n=[];for(const a of e){const r=a&&typeof a=="object"?a:null,i=typeof a=="string"?a:r?.id;if(typeof i!="string")continue;const s=_i(i),l=s&&t.find(d=>d.id===s.type&&d.available!==!1);!s||!l||n.some(d=>d.id===i)||n.push(an(l,s.n,r?.name))}return n.length>0||e.length===0?n:Pn(t)}function qi(){try{return globalThis.localStorage??null}catch{return null}}function Fg(e,t=qi()){try{const n=t?.getItem(ed);return n?Ng(JSON.parse(n),e):Pn(e)}catch{return Pn(e)}}function Ig(e,t,n=qi()){let a=Ag;try{const s=JSON.parse(n?.getItem(Ts)??"null");Array.isArray(s)&&(a=s.filter(l=>typeof l=="string"))}catch{}const r=t.filter(s=>!a.includes(s.id)&&s.available!==!1);if(r.length===0)return[...e];const i=[...e];for(const s of r)i.some(l=>l.type===s.id)||i.push(an(s,1));try{n?.setItem(Ts,JSON.stringify([...new Set([...a,...r.map(s=>s.id)])]))}catch{}return i.length!==e.length&&rn(i,n),i}function Pg(e){return e.map(t=>t.custom?{id:t.id,name:t.name}:t.id)}function rn(e,t=qi()){try{t?.setItem(ed,JSON.stringify(Pg(e)))}catch{}}function zg(e,t){const n=new Map;return(a,r)=>{const i=_i(a),s=i?.type??a,l=r?.instance!==void 0?Number(r.instance):a.includes("#")?i?.n:void 0,d=e().filter(c=>c.instance.type===s);let u;if(l!==void 0&&Number.isInteger(l)&&l>=1)u=d.find(c=>c.instance.n===l);else{const c=d.filter(p=>{const h=p.window();return h!=null&&h!==n.get(p.instance.id)});u=c.find(p=>p.readyState?.()!=="complete")??c[0]??d[0]}if(!u){if(t.some(p=>p.id===s))return null;const c=l!==void 0?td(s,l):a;return{id:c,name:c}}return n.set(u.instance.id,u.window()),{id:u.instance.id,name:u.instance.name}}}const vr="netcomposer.studio.pending-presets.v1",Dg=3e3,Rg=6e4;function Ls(e){return!!e&&typeof e=="object"&&typeof e.format=="string"&&"data"in e}function Og(e,t){return new Promise(n=>{const a=setTimeout(()=>n(void 0),t);e.then(r=>{clearTimeout(a),n(r)},()=>{clearTimeout(a),n(void 0)})})}function Bg(e){const t=new Map,n=[],a=()=>{try{const s=JSON.parse(e()?.getItem(vr)??"{}"),l={};if(s&&typeof s=="object")for(const[d,u]of Object.entries(s))Ls(u)&&(l[d]=u);return l}catch{return{}}},r=s=>{try{const l=e();if(!l)return;Object.keys(s).length?l.setItem(vr,JSON.stringify(s)):l.removeItem(vr)}catch{}},i=async(s,l)=>{const d=a(),u=d[s];if(!u)return;delete d[s],r(d);let c=u.format===l.format;if(c)try{await l.set(u.data)}catch{c=!1}for(const p of n)p(s,c)};return{provide(s,l){!l||typeof l.get!="function"||typeof l.set!="function"||(t.set(s,l),i(s,l))},provided:()=>[...t.keys()],async collect(s,l=Dg){const d={};return await Promise.all(s.map(async u=>{const c=t.get(u);if(!c)return;const p=await Og(Promise.resolve().then(()=>c.get()),l);p!=null&&(d[u]={format:c.format,...c.version!==void 0?{v:c.version}:{},data:p})})),d},stash(s){const l={};for(const[d,u]of Object.entries(s))Ls(u)&&(l[d]=u);r(l)},onApplied(s){n.push(s)},pending:()=>Object.keys(a()),dropPending(){const s=Object.keys(a());return r({}),s}}}function jg(e,t){return`${e}@studio/${t}`}const _g=1,Ee=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX",identity:"instrument-nyx"},{id:"calliope",name:"Generator",src:"/calliope/",brand:"CALLIOPE",identity:"instrument-calliope",sound:!1}],Vi=[...Ee];function qg(e,t,n={}){const a=n.instruments??Ee;return{version:_g,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},...n.grab?{grab:n.grab}:{},...n.play?{play:n.play}:{},...n.countIn?{countIn:n.countIn}:{},attach(r,i){if(typeof r!="string"||r.length===0||r.length>64)return null;const s=n.resolve?n.resolve(r,i):{id:r,name:a.find(w=>w.id===r)?.name??r};if(!s)return null;const l=s.id.split("#")[0],u=a.find(w=>w.id===l)?.sound===!1?e.createGain():t.attach(s.id,s.name),c=s.id,p=n.presets,h=n.share?.host(c),f=n.picker?.host(c),g=n.notes?.host(c);return{ctx:e,output:u,...n.mapper===void 0?{}:{mapper:n.mapper},instance:c,storageKey:w=>jg(w,c),...n.holdFirstPlay?{holdFirstPlay:n.holdFirstPlay}:{},...p?{providePreset:w=>p.provide(c,w)}:{},...h?{audioReceivers:h.audioReceivers,sendAudio:h.sendAudio,onAudio:h.onAudio,reveal:h.reveal}:{},...f?{pickerTarget:f.pickerTarget}:{},...g?{notesIn:g.notesIn,notesSource:g.notesSource,notesTakeBack:g.notesTakeBack}:{},...n.clock?{clock:n.clock()}:{},...n.targets?{notesTargets:()=>n.targets?.list()??[],onNotesTargets:w=>typeof w=="function"?n.targets?.listen(w)??(()=>{}):()=>{}}:{},...n.show?{showInstance:w=>typeof w=="string"&&n.show?.(w)}:{}}}}}const Cs=16,Vg=30;function Hg(e){if(!e||typeof e!="object")return null;const t=e,n=Array.isArray(t.beats)?t.beats.slice(0,Cs+1):[],a=t.until;if(n.length<1||n.length>Cs||!n.every(l=>typeof l=="number"&&Number.isFinite(l))||n.some((l,d)=>d>0&&l<=n[d-1]))return null;const r=n[0],i=n[n.length-1];if(typeof a!="number"||!Number.isFinite(a)||a<=i||a-r>Vg)return null;const s=Array.isArray(t.accents)?t.accents:[];return{beats:[...n],accents:n.map((l,d)=>s[d]===!0),until:a}}function Ug(e,t){if(t>=e.until)return null;let n=-1;for(;n+1<e.beats.length&&e.beats[n+1]<=t;)n++;return{n:e.beats.length-Math.max(0,n),accent:n>=0&&e.accents?.[n]===!0}}function Gg(e,t){return t===null?e:`${t} · ${e}`}function Wg(e){let t=0;for(const n of e)Number.isFinite(n)&&n>t&&(t=n);return Math.round(t)}function Kg(e){const t=e.doc??document,n=t.createElement("div");n.className="count-in",n.hidden=!0,n.setAttribute("role","status");const a=t.createElement("span");a.className="count-in-who";const r=t.createElement("span");r.className="count-in-n",n.append(a,r);const i=t.title,s=new Map;let l=!1;const d=()=>{const c=e.now();for(const[y,T]of s)c>=T.until&&s.delete(y);const[p,h]=[...s][0]??[],f=h?Ug(h,c):null;if(!p||!f){n.hidden=!0,delete n.dataset.accent,t.title=i,l=!1;return}n.hidden=!1;const g=e.clearOf?.()??[],w=`${Wg(g.map(y=>y.getBoundingClientRect().bottom))}px`;n.style.getPropertyValue("--count-in-top")!==w&&n.style.setProperty("--count-in-top",w);const m=e.labelOf(p);a.textContent!==m&&(a.textContent=m);const b=String(f.n);r.textContent!==b&&(r.textContent=b),n.toggleAttribute("data-accent",f.accent),n.setAttribute("aria-label",`${m} count-in ${b}`);const v=Gg(i,f.n);t.title!==v&&(t.title=v),requestAnimationFrame(d)},u=()=>{l||(l=!0,requestAnimationFrame(d))};return{el:n,api:{show(c,p){if(typeof c!="string"||!c)return;const h=Hg(p);h&&(s.set(c,h),u())},clear(c){s.delete(c)&&u()}}}}const Yg=1e4;function Xg(e=Yg,t=globalThis){const n=new Set;let a=[];const r=()=>{if(n.size>0)return;const i=a;a=[];for(const s of i)s()};return{hold(){const i={};n.add(i);const s=t.setTimeout(()=>l(),e),l=()=>{n.delete(i)&&(t.clearTimeout(s),r())};return l},get count(){return n.size},idle(){return n.size===0?Promise.resolve():new Promise(i=>a.push(i))}}}const rd="netcomposer.studio.fx-fold.v1",Jg=["a","b","insert"],id={a:!0,b:!0,insert:!1};function od(e){try{const t=e?.getItem(rd);if(!t)return{};const n=JSON.parse(t);if(!n||typeof n!="object")return{};const a=n,r={};for(const i of Jg)typeof a[i]=="boolean"&&(r[i]=a[i]);return r}catch{return{}}}function sd(e){return{...id,...od(e)}}function ld(e,t,n){const a={...od(e),[t]:n};try{e?.setItem(rd,JSON.stringify(a))}catch{}return{...id,...a}}const cd="netcomposer.studio.insert-fold.v1";function dd(e){try{const t=e?.getItem(cd),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function ud(e,t,n){const a=[...dd(e)].filter(i=>i!==t);n&&a.push(t);const r=a.slice(-256);try{e?.setItem(cd,JSON.stringify(r))}catch{}return new Set(r)}function Qg(e,t){return sd(e).insert?(ld(e,"insert",!1),ud(e,t,!0)):dd(e)}function Ae(){try{return globalThis.localStorage??null}catch{return null}}const Zg={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function pd(e,t){const n=t.fx[e],a=ya(n);for(const r of a.chain){const i=Zg[e][r.type];n===void 0&&i&&Object.assign(r.dials,i),e==="a"?(r.bypass=r.type!=="plate",r.type==="plate"&&(r.dials.mix=100)):e==="b"?(r.bypass=r.type!=="delay",r.type==="delay"&&(r.dials.mix=100,r.dials.mode=0,r.dials.send=100)):r.bypass=r.type!=="drive"||!t.insert.on}return a}const hd="drive-1",oi=3;function eb(e,t){if(e.masterFx!==null&&e.masterFx!==void 0)return St(e.masterFx,t);const n=e.insert.on?pd("insert",e).chain.find(a=>a.type==="drive"):void 0;return St({v:2,chain:n?[{id:hd,type:"drive",bypass:!1,dials:{...n.dials}}]:[]},t)}function tb(e){return e.chain.some(t=>t.type==="drive"&&!t.bypass)}const nb={"no-source":"that source isn't there",empty:"the range is empty",gone:"that range is older than the 20 seconds kept","not-kept":"that source wasn't being kept yet when the range played",timeout:"no answer from the audio (is it running?)"};function ab(e,t,n,a=2e3){return(Number.isFinite(e-t)?Math.max(0,e-t):0)/n*1e3+a}const aa=e=>({channels:null,reason:e,message:nb[e]});function rb(e,t){const n=new Map,a=new Map;let r=1;const i=l=>{const d=t.nodeFor(l);if(!d)return null;const u=n.get(l);if(u&&u.source===d)return u.node;u?.node.disconnect();const c=new AudioWorkletNode(e,"nc-studio-grab",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});return c.port.onmessage=p=>{const h=p.data;h.type!=="took"&&h.type!=="recorded"||(a.get(h.id)?.(h.channels,h.reason),a.delete(h.id))},d.connect(c),n.set(l,{node:c,source:d}),c},s=async(l,d,u)=>{await t.ready;const c=i(l);if(!c)return aa("no-source");if(!(u>d))return aa("empty");const p=r++;return new Promise(h=>{a.set(p,(f,g)=>h(f?{channels:f}:aa(g??"gone"))),c.port.postMessage({type:"take",id:p,from:d,to:u}),setTimeout(()=>{a.delete(p)&&h(aa("timeout"))},ab(u,e.currentTime*e.sampleRate,e.sampleRate))})};return{record(l,d){if(!t.nodeFor(l))return null;const u=n.get(l)?.node??null,c=r++;let p=u;const h=g=>p?.port.postMessage(g);p?h({type:"record",id:c,from:d}):t.ready.then(()=>{p=i(l),h({type:"record",id:c,from:d})});let f=!1;return{stop(g){return f?Promise.resolve(null):(f=!0,new Promise(w=>{a.set(c,w),h({type:"record-end",id:c,to:g}),setTimeout(()=>{a.delete(c)&&w(null)},Math.max(0,(g-e.currentTime*e.sampleRate)/e.sampleRate)*1e3+5e3)}))},cancel(){f=!0,h({type:"record-cancel",id:c})}}},sources:()=>t.sources(),latency(l){if(typeof l!="string")return 0;const d=t.latencyFor?.(l)??0;return Number.isFinite(d)&&d>0?Math.round(d):0},listen(l){return t.nodeFor(l)?(t.ready.then(()=>i(l)),!0):!1},take:(l,d,u)=>s(l,d,u).then(c=>c.channels),takeResult:s}}function ib(e){const t=()=>{};return new Proxy(e,{get(n,a,r){if(a==="stop")return t;const i=Reflect.get(n,a,r);return typeof i=="function"?i.bind(n):i}})}const ee={"picker:off":"Connects the Sample Picker on this computer, so its Send to NYX loads the pads of a NYX here. Off: the picker opens NYX on its own.","picker:connecting":"Connecting to the Sample Picker on this computer. Press to disconnect.","picker:on":"The Sample Picker is connected: its Send to NYX loads a NYX here (you choose which there). Press to disconnect.","picker:away":"The Sample Picker isn't answering: start it on this computer; the Studio keeps trying. Press to disconnect.","picker:ask":"The Sample Picker was connected. Press to connect again (Chrome may ask to let this site reach this computer).","picker:blocked":"Chrome blocks this site from reaching this computer. Allow it in the site's settings (Local network access), then press here.","transport:rec":"Records the Master to a WAV file. If nothing is sounding, Rec arms and waits: it starts on the first sound or on bar 1. Press again to cancel or stop.","transport:keep":"Saves the last minutes of the Master as a WAV, no Rec needed. It holds up to 5 min of sound; silence isn't held, so 2 min is 2 minutes of sound. K opens it.","keep:held":"How much sound Keep holds now, up to 5 min. Silence longer than 2 seconds isn't held. While the clock runs, a Keep starts on a bar line.","keep:switch":"Keeping on holds the Master's last 5 minutes of sound in this tab (about 58 MB). Off forgets it and holds nothing.","mix:sends":"The two send effects every channel feeds with its A and B knobs. The master's Sends button shows and hides them. Folded, click a column to open it.","inserts:channel":"Shows this channel's own effects, applied before its fader and sends. Press again to close them.","inserts:master":"Shows the master's own effects on the whole mix: none until you add one, up to three (EQ, compressor, drive and so on). Press again to close them.","fx:fold":"Folds this effect sideways into a narrow column so the Mix takes less room. It keeps sounding as set; a click on the column (or its ▶) opens it again.","fx:meter":"The level going into this effect (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. It keeps showing the input, greyed, while the effect is off.","fx:meter-return":"The level the sends feed into this effect (left bar) and its return (right bar), from −48 dB up to full scale; orange near clipping. Silent while the return is off.","fx:max":"Widens this card to three cards so its graph is easy to see; the dials sit under it. Click again, or press Escape, to put it back.","eq:graph":"The EQ's curve over the sound coming out right now: boosts rise above the middle line, cuts fall below it. Click it to open it wide, then drag a dot to shape it.","eq:low":"The lows, below 150 Hz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","eq:mid":"The middle band: drag up or down to boost or cut, sideways to move it, and scroll over it for narrower or wider. Double-click resets it.","eq:high":"The highs, above 6 kHz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","strip:fold":"Minimizes this channel sideways to a narrow column so more fit. It keeps playing at the same level; M and S still work, and ▶ expands it again.","strip:folded":"A minimized channel: its name, mute, solo and level meter. Click the name or ▶ to expand it. Drag the name to move it.","strip:trim":"Trim: this channel's input gain, before its Inserts and fader, −12 to +24 dB. Bring up a quiet instrument here; double-click for 0 dB.","strip:pan":"Balance: moves this channel left or right in the stereo mix by turning the other side down (its sends follow). Drag or use the arrow keys; double-click to centre it.","strip:name":"This channel's instrument. Click to show it below, drag (or touch and hold) to move the channel, double-click to rename it.","strip:rename":"Type a new name (up to 20 characters) and press Enter; Escape cancels. Leave it empty to go back to the default name.","sends:view":"Shows or hides the send effects, A · Reverb and B · Delay. Outlined while a channel sends to them. They keep sounding either way.","vu:add":"Adds analog VU meters for the finished mix beside the master: left on top, right below. 0 VU is −18 dBFS RMS.","vu:module":"The master's left (top) and right (bottom) as classic VU meters, which show average loudness. 0 VU is −18 dBFS RMS; the red is louder than that.","vu:remove":"Hides the VU meters. + Meters in the Mix header brings them back.","vu:fold":"Folds the meters to a narrow column with two thin level bars, L and R. The triangle opens them again."},ob=[60,120,300],sb={on:!1,written:0,size:0,segments:[],lastDropped:null,bytes:0,sampleRate:48e3};function md(e){return Math.max(0,Math.min(e.written,e.size))}function xr(e,t){let n=null;for(const a of e){if(a.pos>t)break;n=a}return n?n.frame+(t-n.pos):null}function lb(e,t,n){for(let a=e.length-1;a>=0;a--){const r=e[a];if(r&&r.pos<=t)return{start:r.pos,end:e[a+1]?.pos??n}}return null}function cb(e,t,n){const a=md(e);if(a<=0)return null;const r=e.written-a;let i;if("last"in t){const u=Math.round(t.last*e.sampleRate);if(u<=0||u>a)return null;i=e.written-u}else{if(e.lastDropped!==null&&e.lastDropped>=t.since)return null;let u=null;for(let c=0;c<e.segments.length;c++){const p=e.segments[c];if(!p)continue;const h=e.segments[c+1]?.pos??e.written;if(t.since<p.frame+(h-p.pos)){u=Math.max(r,p.pos+Math.max(0,t.since-p.frame));break}}if(u===null||u>=e.written)return null;i=u}let s="exact";if(n&&n.barFrames>0){const u=xr(e.segments,i),c=lb(e.segments,i,e.written);if(u!==null&&c){const p=((u-n.origin)%n.barFrames+n.barFrames)%n.barFrames,h=i-Math.round(p),f=p===0?i:i+Math.round(n.barFrames-p);p===0?s="bar":h>=Math.max(r,c.start)&&"last"in t?(i=h,s="bar"):f<Math.min(e.written,c.end)&&(i=f,s="bar")}}const l=xr(e.segments,i)??0,d=(xr(e.segments,e.written-1)??l)+1;return{from:i,to:e.written,frame:l,endFrame:d,start:s}}function si(e){const t=Math.max(0,Math.floor(e));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function db(e,t,n){const a=l=>String(l).padStart(2,"0"),r=`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}-${a(e.getHours())}${a(e.getMinutes())}`,i=`${Math.round(t*10)/10}bpm`,s="last"in n?`${Math.round(n.last/60)}m`:"since-play";return`netcomposer-keep-${r}-${i}-${s}.wav`}const fd="audio/wav";function ub(e){const t=a=>String(a).padStart(2,"0");return`netcomposer-studio-${`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}-${t(e.getHours())}${t(e.getMinutes())}`}.wav`}function pb(e,t){const n=Math.min(e.length,t.length),a=new Uint8Array(n*6);let r=0;for(let i=0;i<n;i++)for(const s of[e[i]??0,t[i]??0]){const l=Math.max(-1,Math.min(1,s)),d=Math.round(l<0?l*8388608:l*8388607);a[r++]=d&255,a[r++]=d>>8&255,a[r++]=d>>16&255}return a}function gd(e,t,n=24){const r=n/8,i=e*2*r,s=new ArrayBuffer(44),l=new DataView(s),d=(u,c)=>{for(let p=0;p<4;p++)l.setUint8(u+p,c.charCodeAt(p))};return d(0,"RIFF"),l.setUint32(4,36+i,!0),d(8,"WAVE"),d(12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,2,!0),l.setUint32(24,t,!0),l.setUint32(28,t*2*r,!0),l.setUint16(32,2*r,!0),l.setUint16(34,r*8,!0),d(36,"data"),l.setUint32(40,i,!0),new Uint8Array(s)}class hb{constructor(t,n){this.ctx=t,this.source=n}node=null;id=0;phase="idle";parts=[];frames=0;from=0;why="now";done=null;listeners=new Set;attach(){const t=this.source();if(this.node||!t)return;const n=new AudioWorkletNode(this.ctx,"nc-studio-rec",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n}get supported(){return typeof AudioWorkletNode<"u"}get state(){return this.phase}get started(){return this.phase==="recording"||this.phase==="stopping"?{from:this.from,why:this.why}:null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}arm(t=!1){this.phase==="idle"&&(this.attach(),this.node&&(this.id++,this.parts=[],this.frames=0,this.set("arming"),this.node.port.postMessage({type:"arm",id:this.id,force:t})))}schedule(t){this.phase!=="arming"&&this.phase!=="armed"||this.node?.port.postMessage({type:"at",id:this.id,at:t})}cancel(){this.phase!=="arming"&&this.phase!=="armed"||(this.node?.port.postMessage({type:"cancel",id:this.id}),this.parts=[],this.id++,this.set("idle"))}stop(){return this.phase!=="recording"||!this.node?Promise.resolve(null):(this.set("stopping"),new Promise(t=>{this.done=t,this.node?.port.postMessage({type:"stop",id:this.id})}))}set(t){if(this.phase!==t){this.phase=t;for(const n of this.listeners)n()}}message(t){if(t.id===this.id){if(t.type==="rec")t.phase==="armed"&&this.phase==="arming"?this.set("armed"):t.phase==="recording"&&(this.phase==="arming"||this.phase==="armed")?(this.from=t.from??0,this.why=t.why??"now",this.set("recording")):t.phase==="idle"&&this.phase==="stopping"&&this.finish(null);else if(t.type==="rec-data"){const[n,a]=t.channels??[];if(!n||!a)return;this.parts.push(pb(n,a)),this.frames+=n.length}else if(t.type==="rec-done"){const n=t.sampleRate??this.ctx.sampleRate,a=new Blob([gd(this.frames,n),...this.parts],{type:fd});this.finish({blob:a,name:ub(new Date),seconds:this.frames/n,from:t.from??this.from,why:this.why})}}}finish(t){this.parts=[],this.frames=0;const n=this.done;this.done=null,this.set("idle"),n?.(t)}}const bd="netcomposer.studio.keeping.v1";function mb(e){try{return e?.getItem(bd)!=="off"}catch{return!0}}function fb(e,t){try{e?.setItem(bd,t?"on":"off")}catch{}}class gb{constructor(t,n,a=!0){this.ctx=t,this.source=n,this.on=a}node=null;latest=sb;on;id=0;jobs=new Map;listeners=new Set;attach(){const t=this.source();if(this.node||!t||typeof AudioWorkletNode>"u")return;const n=new AudioWorkletNode(this.ctx,"nc-studio-keep",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n,n.port.postMessage({type:"keeping",on:this.on})}get supported(){return typeof AudioWorkletNode<"u"}get keeping(){return this.on}get status(){return this.latest}setKeeping(t){this.on=t,this.node?.port.postMessage({type:"keeping",on:t}),t||(this.latest={...this.latest,on:t,written:0,segments:[],bytes:0,lastDropped:null}),this.emit()}refresh(){this.node?.port.postMessage({type:"status"})}plan(t,n){return this.on?cb(this.latest,t,n):null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}keep(t,n){const a=this.node;if(!a||!this.on)return Promise.resolve(null);const r=++this.id;return new Promise(i=>{this.jobs.set(r,{parts:[],plan:null,rate:this.ctx.sampleRate,done:s=>{if(!s)return i(null);const l=s.plan.to-s.plan.from,d=new Blob([gd(l,s.rate,16),...s.parts],{type:fd});i({blob:d,name:db(n.when??new Date,n.bpm,t),seconds:l/s.rate,frame:s.plan.frame,endFrame:s.plan.endFrame,start:s.plan.start,choice:t})}}),a.port.postMessage({type:"keep",id:r,choice:t,grid:n.grid??null,now:this.ctx.state!=="running"})})}emit(){for(const t of this.listeners)t()}message(t){if(t.type==="keep-status"&&t.status){this.latest=t.status,this.emit();return}const n=t.id===void 0?void 0:this.jobs.get(t.id);if(!(!n||t.id===void 0)){if(t.type==="keep-plan")n.plan=t.plan??null,n.rate=t.sampleRate??n.rate,n.plan||(this.jobs.delete(t.id),n.done(null));else if(t.type==="keep-part"){if(t.data)n.parts.push(t.data);else if(t.done){this.jobs.delete(t.id),n.done(null);return}t.done&&n.plan&&(this.jobs.delete(t.id),n.done({plan:n.plan,parts:n.parts,rate:n.rate}))}}}}const yd={threshold:-3,knee:0,ratio:20,attack:.001,release:.1};function bb(e){return Math.floor(.006*e)}const li=1024,Ns=li+8192,yb=.25;function wb(e,t){let n=0;for(let a=t;a<e.length;a++)n=Math.max(n,Math.abs(e[a]??0));if(!(n>1e-6))return null;for(let a=t;a<e.length;a++)if(Math.abs(e[a]??0)>=n/2)return a-t;return null}async function vb(e,t,n=OfflineAudioContext){const a=new n(1,Ns,e),r=a.createBuffer(1,Ns,e);r.getChannelData(0)[li]=yb;const i=new AudioBufferSourceNode(a,{buffer:r}),s=t(a);i.connect(s.input),s.output.connect(a.destination),i.start(0);const l=await a.startRendering();return wb(l.getChannelData(0),li)}function xb(e,t=()=>vb(e,n=>{const a=new DynamicsCompressorNode(n,yd);return{input:a,output:a}})){let n=bb(e);const a=(async()=>{try{const r=await t();r!==null&&r>=0&&r<e/10&&(n=r)}catch{}})();return{get:()=>n,ready:a}}const hn={noManifest:"No plugin.json there. Pick the plugin's folder, or plugin.json and its DSP file.",noDsp:e=>`plugin.json names its DSP file ${e}. Pick that file too.`,badJson:"plugin.json is not JSON.",bad:e=>`plugin.json has a problem: ${e}`,tooBig:e=>`${e} is over 256 KB.`},kb=256*1024,$b=e=>e.includes("/")?e.slice(0,e.lastIndexOf("/")+1):"",ra=e=>e.webkitRelativePath||e.name;async function Eb(e){const t=[...e],a=t.filter(h=>h.name==="plugin.json").sort((h,f)=>ra(h).split("/").length-ra(f).split("/").length)[0];if(!a)throw new Error(hn.noManifest);const r=await a.text();let i;try{i=JSON.parse(r)}catch{throw new Error(hn.badJson)}const s=qa(i);if(!s.ok||!s.manifest)throw new Error(hn.bad(s.errors.join("; ")));const l=s.manifest,d=$b(ra(a))+l.dsp,u=l.dsp.split("/").pop()??l.dsp,c=t.find(h=>ra(h)===d)??t.find(h=>h!==a&&h.name===u&&!h.webkitRelativePath);if(!c)throw new Error(hn.noDsp(l.dsp));const p=await c.text();if(new TextEncoder().encode(p).length>kb)throw new Error(hn.tooBig(l.dsp));return{manifest:l,manifestText:r,dspName:l.dsp,dsp:p}}async function Sb(e,t=Date.now()){return{id:e.manifest.id,version:e.manifest.version,name:e.manifest.name,author:e.manifest.author,licence:e.manifest.licence,manifest:e.manifestText,dspName:e.dspName,dsp:e.dsp,sha256:await Fl(new TextEncoder().encode(e.dsp)),added:t}}const Fs=e=>`local:${e}`,Ca=e=>e.startsWith("local:"),wd=e=>({id:e.id,version:e.version,name:e.name,author:e.author,added:e.added});function vd(){const e=new Map;return{list:async()=>[...e.values()].sort((t,n)=>t.added-n.added).map(wd),get:async t=>e.get(t)??null,put:async t=>{e.set(t.id,t)},remove:async t=>{e.delete(t)}}}const Ab="netcomposer-studio-plugins",ia="plugins";function Mb(e=globalThis.indexedDB){const t=vd(),n=new Promise(i=>{if(!e)return i(null);try{const s=e.open(Ab,1);s.onupgradeneeded=()=>{s.result.objectStoreNames.contains(ia)||s.result.createObjectStore(ia,{keyPath:"id"})},s.onsuccess=()=>i(s.result),s.onerror=()=>i(null),s.onblocked=()=>i(null)}catch{i(null)}}),a=async(i,s,l)=>{const d=await n;return d?new Promise((u,c)=>{const p=d.transaction(ia,i),h=s(p.objectStore(ia));p.oncomplete=()=>u(h.result),p.onerror=()=>c(p.error??h.error),p.onabort=()=>c(p.error??h.error)}):l()},r=i=>{const s=i;return!!s&&typeof s.id=="string"&&typeof s.version=="string"&&typeof s.manifest=="string"&&typeof s.dsp=="string"};return{async list(){return(await a("readonly",s=>s.getAll(),async()=>{const s=await t.list();return Promise.all(s.map(l=>t.get(l.id)))})).filter(r).sort((s,l)=>s.added-l.added).map(wd)},async get(i){const s=await a("readonly",l=>l.get(i),()=>t.get(i));return r(s)?s:null},put:i=>a("readwrite",s=>s.put(i),()=>t.put(i)).then(()=>{}),remove:i=>a("readwrite",s=>s.delete(i),()=>t.remove(i)).then(()=>{})}}const Qe=-54,qn=6,_e=-Qe/(qn-Qe),Tb=-6,ci=(Tb-Qe)/(qn-Qe);function xd(e){const t=Math.min(1,Math.max(0,e));return t===0?Number.NEGATIVE_INFINITY:Qe+t*(qn-Qe)}function Lb(e){return e===Number.NEGATIVE_INFINITY?0:10**(e/20)}function Cb(e){return e<=0?Number.NEGATIVE_INFINITY:20*Math.log10(e)}function st(e){return Lb(xd(e))}function Nb(e){if(e===Number.NEGATIVE_INFINITY||e<-99)return"−∞";const t=e.toFixed(1);return t.startsWith("-")?`−${t.slice(1)}`:e>.05?`+${t}`:t}function Fb(e){const t=e.some(n=>n.solo);return e.map(n=>n.mute||t&&!n.solo?0:st(n.position))}function Hi(e){return e===Number.NEGATIVE_INFINITY||Number.isNaN(e)?0:Math.min(1,Math.max(0,(e-Qe)/(qn-Qe)))}function Is(e){return Hi(Cb(e))}const Ps=[0,-6,-12,-24,-48].map(e=>({value:Hi(e),label:e===0?"0":`−${-e}`})),Ib=1;function Pb(e){let t=0,n=0;for(const a of e){const r=Math.abs(a);r>t&&(t=r),n+=a*a}return{peak:t,rms:e.length>0?Math.sqrt(n/e.length):0}}function zs(e){const t=e.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(t==="")return null;if(t==="off"||t==="-inf"||t==="-∞"||t==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(t))return null;const n=Number(t.replace(",","."));return Number.isFinite(n)?n<Qe?0:Hi(Math.min(qn,n)):null}function zb(e){const t=Math.min(1,Math.max(-1,Number.isFinite(e)?e:0)),n=Math.cos(Math.abs(t)*Math.PI/2);return t>0?[n,1]:t<0?[1,n]:[1,1]}const kd="netcomposer.studio.mix.v1",$d={position:ci,mute:!1,solo:!1,sendA:0,sendB:0,pan:0,shade:0,trim:0},Ed=-12,Sd=24,Db=.5;function Ad(e){if(typeof e!="number"||!Number.isFinite(e))return 0;const t=Math.round(Math.min(Sd,Math.max(Ed,e))*10)/10;return t===0?0:t}const Rb=8;function Ob(e){return typeof e=="number"&&Number.isInteger(e)&&e>=1&&e<=Rb?e:0}function zn(){return{v:1,channels:{},master:_e,returns:{a:{on:!0,level:_e},b:{on:!0,level:_e}},insert:{on:!1},fx:{},channelFx:{},masterFx:null}}const Mn=(e,t)=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t,Bb=e=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(-1,e)):0,Na=(e,t)=>typeof e=="boolean"?e:t,lt=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{};function jb(e){const t=lt(e);return{position:Mn(t.position,$d.position),mute:Na(t.mute,!1),solo:Na(t.solo,!1),sendA:Math.min(_e,Mn(t.sendA,0)),sendB:Math.min(_e,Mn(t.sendB,0)),pan:Bb(t.pan),shade:Ob(t.shade),trim:Ad(t.trim)}}function Md(e){const t=zn(),n=lt(e);if(n.v!==1)return t;const a={};for(const[u,c]of Object.entries(lt(n.channels)))u.length>0&&u.length<=64&&(a[u]=jb(c));const r=lt(n.returns),i=(u,c)=>{const p=lt(u);return{on:Na(p.on,c.on),level:Mn(p.level,c.level)}},s={},l=lt(n.fx);for(const u of["a","b","insert"])l[u]!==void 0&&(s[u]=l[u]);const d={};for(const[u,c]of Object.entries(lt(n.channelFx)))u.length>0&&u.length<=64&&c&&typeof c=="object"&&(d[u]=c);return{v:1,channels:a,master:Mn(n.master,t.master),returns:{a:i(r.a,t.returns.a),b:i(r.b,t.returns.b)},insert:{on:Na(lt(n.insert).on,t.insert.on)},fx:s,channelFx:d,masterFx:n.masterFx&&typeof n.masterFx=="object"?n.masterFx:null}}function Td(){try{return globalThis.localStorage??null}catch{return null}}function _b(e=Td()){try{const t=e?.getItem(kd);return t?Md(JSON.parse(t)):zn()}catch{return zn()}}function Ld(e,t=Td()){try{return t?.setItem(kd,JSON.stringify(e)),t!==null}catch{return!1}}const Ka=3;function qb(e,t=Ka){return Math.max(1,Math.ceil(e/t))}function Ds(e,t=Ka){return Math.max(0,Math.floor(e/t))}function Vb(e,t,n,a=null,r=Ka){const i=qb(n.length,r)-1;if(!e||e.key!==t)return 0;const s=a===null?-1:n.indexOf(a);if(s>=0)return Ds(s,r);const l=new Set(e.ids);let d=-1;return n.forEach((u,c)=>{l.has(u)||(d=c)}),d>=0?Ds(d,r):Math.min(i,Math.max(0,e.page))}const Cd=e=>!!e&&typeof e=="object"&&Array.isArray(e.chain);function Hb(e,t){if(!Cd(e))return null;const n=e.chain.findIndex(a=>a?.id===t);return n<0?null:{slot:JSON.parse(JSON.stringify(e.chain[n])),index:n}}function Ub(e,t,n){if(!Cd(e)||e.chain.length>=n||e.chain.some(r=>r?.id===t.slot.id))return null;const a=e.chain.slice();return a.splice(Math.max(0,Math.min(a.length,t.index)),0,t.slot),{...e,v:2,chain:a}}const Rs="plugin-url",kr="plugin-folder",Os="plugin-files",$r="kept:",Er="forget:",Sr="listed:",Gb="../plugins/registry.json",R={urlTitle:"Load a plugin from a URL",urlBody:"Paste the address of the plugin's plugin.json.",urlField:"Address",urlPlaceholder:"https://…/plugin.json",urlNext:"Next",warnTitle:"Run this plugin?",warnBody:e=>`This runs code from ${e} in your browser. Only load plugins from people you trust. Listed plugins are checked; this one is not.`,warnLoad:"Load and run",badUrl:"That isn't a plugin address. Use https://, or http://localhost while you build one.",badUrlLocal:"Plugins load from this computer for now: pick its files, or use http://localhost while you build one.",urlPlaceholderLocal:"http://localhost:…/plugin.json",folder:"Load plugin folder…",files:"Load plugin from files…",url:"Load plugin from URL…",thisComputer:"this computer",kept:e=>`${e} (this computer)`,fileWarnBody:(e,t)=>`This runs ${e} by ${t}, from files on this computer, in your browser. Only run code you made or trust. It is kept in this browser until you remove it.`,forget:e=>`Remove ${e} from this computer…`,forgetTitle:e=>`Remove ${e}?`,forgetBody:"This browser forgets its copy. Slots that use it keep their dials and play as a wire after a reload.",forgetConfirm:"Remove",forgotten:e=>`${e} is removed from this computer.`,reloadToUse:(e,t)=>`Kept ${e} ${t}. Reload the page to hear the new code.`,reloadToHear:e=>`${e} has new code. Reload the page to hear it; until then the old code plays.`,reloadAction:"Reload",newCode:"Reload page: new code.",stuck:(e,t)=>`${e} on ${t} got stuck in a loop and was stopped. The rest of the mix plays on.`,frozenTitle:"The sound stopped",frozenBody:e=>`${e} froze the audio on this page, and it can't be restarted here. In a new tab your mix comes back with ${e} off (add it again to retry). This page stops saving.`,frozenOpen:"Open new tab",frozenStay:"Stay here",frozenShort:"Stopped: froze audio.",notKept:"Not on this computer.",pickAgain:"Pick files…",badUrlShort:"Not a plugin address.",failedShort:"Couldn't load it.",missing:"Missing: not loaded.",missingNoUrl:"Missing: no address saved.",through:"Sound passes through.",dialsKept:"Its dials are kept.",from:e=>`From ${e}`,load:"Load",loadAsk:"Load…",loading:"Loading…",retry:"Remove, add to retry."};function Wb(e){const t={1:"Stopped: failed to start.",2:"Stopped: it crashed.",3:"Stopped: bad numbers.",4:"Stopped: a dial crashed it.",5:"Stopped: code not loaded.",6:"Stopped: stuck in a loop."};for(const[n,a]of Object.entries(wa))if(a===e)return t[Number(n)];return"Stopped."}function mn(e){if(Ca(e))return R.thisComputer;try{return new URL(e).host||e}catch{return e}}function Kb(e,t,n=!0){let a;try{a=new URL(e.trim(),t)}catch{return null}const r=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(a.hostname);return a.protocol==="https:"&&(n||r)||a.protocol==="http:"&&r?a.href:null}function Yb(e){const t=new URL(Gb,e.base).href;let n=[];const a=new Set,r=new Map,i=[],s=new Set,l=()=>{for(const A of s)A()},d=A=>String(A?.message??A).replace(/^nc-fx plugins?: /,""),u=e.remote!==!1,c=e.store??vd();let p=[];const h=new Map,f=new Set,g=A=>{f.has(A)||(f.add(A),l())},w=e.frozen,m=async()=>{try{p=await c.list()}catch(A){console.warn(`Studio plugins: can't read this computer's plugins (${d(A)})`)}l()},b=m(),v=u?Jp(t,{fetch:e.fetch}).then(A=>{n=A.registry.plugins;for(const k of A.errors)console.warn(`Studio plugins: registry ${k}`);l();const x=i.splice(0);x.length&&T.restore(x)}).catch(A=>{console.info(`Studio plugins: no listed plugins (${d(A)})`)}):Promise.resolve(),y=async(A,x)=>{a.add(A),r.delete(A),l();try{const{entry:k,stale:M}=await x();return k.plugin&&(M&&g(k.plugin.id),w?.clear(k.plugin.id)),k.type}catch(k){throw r.set(A,d(k)),k}finally{a.delete(A),l()}},T={listed:()=>n,loaded:()=>$p().filter(A=>!A.plugin.listed&&!Ca(A.plugin.url)),remote:u,local:()=>p,stale:A=>f.has(A),frozen:A=>!!w?.has(A),async addPicked(A){const x=await Sb(A);w?.clear(x.id);const k=de(`plugin:${x.id}`);if(k){const S=k.plugin?.version===x.version&&h.get(x.id)===x.sha256;return await c.put(x),await m(),S||g(x.id),S?{type:k.type}:{reload:!0}}const M=await y(x.id,()=>Do(e.ctx,{manifest:x.manifest,dsp:x.dsp,dspName:x.dspName},{moduleUrl:e.moduleUrl,url:Fs(x.id)}));return h.set(x.id,x.sha256),await c.put(x),await m(),{type:M}},async loadKept(A){w?.clear(A);const x=de(`plugin:${A}`),k=await c.get(A);if(x){const S=h.get(A);return k&&S&&S!==k.sha256&&g(A),x.type}if(!k)throw new Error(R.notKept);const M=await y(A,()=>Do(e.ctx,{manifest:k.manifest,dsp:k.dsp,dspName:k.dspName},{moduleUrl:e.moduleUrl,url:Fs(A)}));return h.set(A,k.sha256),M},async forget(A){await c.remove(A),await m()},listingFor(A){const x=n.find(M=>M.id===A.id);if(!x)return null;const k=new URL(x.manifest,t).href;return!A.url||A.url===k?x:null},loading:A=>a.has(A),async loadListed(A){w?.clear(A);const x=de(`plugin:${A}`);if(x)return x.type;await v;const k=n.find(M=>M.id===A);if(!k)throw new Error(`${A} isn't listed`);return y(A,()=>Qp(e.ctx,k,t,{moduleUrl:e.moduleUrl,fetch:e.fetch}))},loadUrl(A){return y("url",()=>zl(e.ctx,A,{moduleUrl:e.moduleUrl,fetch:e.fetch,base:e.base}))},restore(A){for(const x of A)if(!(x.status!=="missing"||a.has(x.id)||de(`plugin:${x.id}`))&&!w?.has(x.id)){if(Ca(x.url)){b.then(()=>{p.some(k=>k.id===x.id)&&!a.has(x.id)&&!de(`plugin:${x.id}`)&&T.loadKept(x.id).catch(()=>{})});continue}if(u){if(!n.length){i.some(k=>k.id===x.id)||i.push(x);continue}T.listingFor(x)&&T.loadListed(x.id).catch(()=>{})}}},onChange(A){return s.add(A),()=>s.delete(A)},problem:A=>r.get(A)??null,clearProblem(A){r.delete(A)&&l()}};return T}const Nd="netcomposer.studio.sends.v2";function Xb(e){try{return e?.getItem(Nd)==="1"}catch{return!1}}function Jb(e,t){try{e?.setItem(Nd,t?"1":"0")}catch{}}function Qb(e,t){try{return!!(e?.matchMedia(t.portrait).matches||e?.matchMedia(t.landscape).matches)}catch{return!1}}function Fa(e){return e.hacksShown!==null?{kind:"stack",id:e.hacksShown}:e.sendsShown?{kind:"sends"}:{kind:"none"}}function Zb(e){return Fa(e).kind==="sends"?{hacksShown:null,sendsShown:!1}:{hacksShown:null,sendsShown:!0}}function ey(e){for(const t of e)if(t.sendA>0||t.sendB>0)return!0;return!1}function Bs(e,t){return e&&!t}function ty(e,t,n){return e&&Fa(t).kind==="none"&&n.every(a=>a===0)}const Fd="netcomposer.studio.strip-fold.v1";function Id(e){try{const t=e?.getItem(Fd),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Pd(e,t){try{e?.setItem(Fd,JSON.stringify([...t].sort()))}catch{}return t}function zd(e,t,n){const a=new Set(Id(e));return n?a.add(t):a.delete(t),Pd(e,a)}function ny(e,t){return zd(e,t,!1)}function ay(e,t){const n=new Set(t),a=Id(e),r=new Set([...a].filter(i=>n.has(i)));return r.size===a.size?a:Pd(e,r)}function ry(e,t){if(!e.includes(t.id))return[...e];const n=e.filter(i=>i!==t.id),a=t.before===null?-1:n.indexOf(t.before),r=a<0?n.length:a;return[...n.slice(0,r),t.id,...n.slice(r)]}function iy(e,t,n){const a=e.indexOf(t);if(a<0)return null;const r=a+n;return r<0||r>=e.length?null:n<0?{id:t,before:e[r]}:{id:t,before:e[r+1]??null}}function oy(e,t){if(e.length===0)return null;let n=e[0],a=Number.POSITIVE_INFINITY;for(const r of e){const i=t<r.left?r.left-t:t>r.left+r.width?t-(r.left+r.width):0;i<a&&(n=r,a=i)}return{target:n.id,side:t<n.left+n.width/2?"before":"after"}}function js(e,t,n){const a=e.indexOf(n.target);if(a<0||!e.includes(t))return null;const r=n.side==="before"?n.target:e[a+1]??null;if(r===t)return null;const i={id:t,before:r};return ry(e,i).every((l,d)=>l===e[d])?null:i}const sy=-18,ly=-20,Dd=3,cy=[-20,-10,-7,-5,-3,-2,-1,0,1,2,3],_s=[-20,-10,-7,-5,-3,0,1,2,3],dy=.3,uy=6.638/dy,py=48;function hy(e){return e-sy}function Rd(e){return Number.isFinite(e)?Math.min(1,Math.max(0,10**((e-Dd)/20))):e>0?1:0}function my(e){return e>0?Rd(hy(20*Math.log10(e))):0}function Ui(e){return(Math.min(1,Math.max(0,e))*2-1)*py}const qs={x:0,v:0};function fy(e,t,n,a=!1){if(a)return{x:t,v:0};if(!(n>0))return e;const r=uy,i=e.x-t,s=e.v+r*i,l=Math.exp(-r*n),d=t+(i+s*n)*l,u=(e.v-r*s*n)*l;return d>=1?{x:1,v:0}:d<=0?{x:0,v:0}:{x:d,v:u}}function gy(e,t){return Math.abs(e.x-t)<1e-4&&Math.abs(e.v)<.001}const Od="netcomposer.studio.vu.v1";function by(e){try{return e?.getItem(Od)==="1"}catch{return!1}}function yy(e,t){try{e?.setItem(Od,t?"1":"0")}catch{}}const Bd="netcomposer.studio.vu-fold.v1";function wy(e){try{return e?.getItem(Bd)==="1"}catch{return!1}}function vy(e,t){try{e?.setItem(Bd,t?"1":"0")}catch{}}const xy="http://www.w3.org/2000/svg",di=200,Ar=112,Ht=di/2,Tn=132,Vs=100,ky=108,$y=105,Ey=116,Sy=103,Ay=112,He=(e,t)=>{const n=document.createElementNS(xy,e);for(const[a,r]of Object.entries(t))n.setAttribute(a,String(r));return n},Hs=e=>Math.round(e*100)/100;function Ln(e,t){const n=Ui(Rd(e))*Math.PI/180;return[Hs(Ht+t*Math.sin(n)),Hs(Tn-t*Math.cos(n))]}function Us(e,t,n){const[a,r]=Ln(e,n),[i,s]=Ln(t,n);return`M ${a} ${r} A ${n} ${n} 0 0 1 ${i} ${s}`}const My=e=>e>0?`+${e}`:e<0?`−${-e}`:"0";function Gs(e){const t=He("svg",{class:"vu-meter",viewBox:`0 0 ${di} ${Ar}`,role:"img","aria-label":`${e==="L"?"Left":"Right"} VU meter`,"data-vu-side":e});t.append(He("rect",{class:"vu-face",x:.5,y:.5,width:di-1,height:Ar-1,rx:4})),t.append(He("path",{class:"vu-arc",d:Us(ly,0,Vs)})),t.append(He("path",{class:"vu-zone",d:Us(0,Dd,Sy)}));for(const i of cy){const[s,l]=Ln(i,Vs),[d,u]=Ln(i,_s.includes(i)?ky:$y);t.append(He("line",{class:i>0?"vu-tick vu-red":"vu-tick",x1:s,y1:l,x2:d,y2:u}))}for(const i of _s){const[s,l]=Ln(i,Ey),d=He("text",{class:i>0?"vu-num vu-red":"vu-num",x:s,y:l,"text-anchor":"middle"});d.textContent=Math.abs(i)===20||i===3?My(i):String(Math.abs(i)),t.append(d)}const n=He("text",{class:"vu-legend",x:Ht,y:92,"text-anchor":"middle"});n.textContent="VU";const a=He("text",{class:"vu-side",x:10,y:Ar-10});a.textContent=e;const r=He("line",{class:"vu-needle",x1:Ht,y1:Tn,x2:Ht,y2:Tn-Ay,transform:`rotate(${Ui(0)} ${Ht} ${Tn})`});return t.append(n,a,r),{svg:t,needle:r}}function Ty(e){const t=document.createElement("div");t.className="vu",t.dataset.vu="",t.setAttribute("role","group"),t.setAttribute("aria-label","VU meters");const n=document.createElement("div");n.className="vu-hd";const a=document.createElement("button");a.type="button",a.className="nc-fold-toggle",a.dataset.vuFold="";const r=document.createElement("span");r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),a.append(r),a.setAttribute("data-nc-help",ee["vu:fold"]);const i=document.createElement("span");i.className="nc-strip-name vu-name",i.textContent="Meters",i.setAttribute("data-nc-help",ee["vu:module"]);const s=document.createElement("button");s.type="button",s.className="nc-page-action vu-hide",s.dataset.vuRemove="",s.textContent="Hide",s.setAttribute("aria-label","Hide VU meters"),s.setAttribute("data-nc-help",ee["vu:remove"]),s.addEventListener("click",()=>e.onRemove(s)),n.append(a,i,s);const l=document.createElement("div");l.className="vu-mini",l.setAttribute("aria-hidden","true");const d=["L","R"].map(b=>{const v=document.createElement("span");v.className="vu-bar",v.dataset.side=b;const y=document.createElement("span");return y.className="vu-bar-fill",v.append(y),l.append(v),y});let u=e.folded;const c=()=>{t.toggleAttribute("data-folded",u),a.setAttribute("aria-expanded",u?"false":"true"),a.setAttribute("aria-label",u?"Expand VU meters":"Minimize VU meters"),a.title=u?"Expand":"Minimize"};c(),a.addEventListener("click",()=>{u=!u,c(),e.onFold(u)});const p=Gs("L"),h=Gs("R");t.append(n,p.svg,h.svg,l);const f=matchMedia("(prefers-reduced-motion: reduce)"),g=[qs,qs],w=[Number.NaN,Number.NaN],m=[p.needle,h.needle];return{el:t,frame(b,v){let y=!1;for(const T of[0,1]){const A=b?my(b[T]):0;g[T]=fy(g[T],A,v,f.matches),(!gy(g[T],A)||A>0)&&(y=!0);const x=Math.round(Ui(g[T].x)*10)/10;x!==w[T]&&(w[T]=x,m[T].setAttribute("transform",`rotate(${x} ${Ht} ${Tn})`),d[T].style.transform=`scaleY(${Math.max(0,Math.min(1,g[T].x)).toFixed(3)})`,t.dataset[T===0?"vuL":"vuR"]=x.toFixed(1))}return y}}}const Ly="netcomposer.studio.hidden.v1",oa=1/120,it="master",Ws="Inserts",Cy="(max-width: 768px)",jd=8,ma=e=>Nb(xd(e)),Ks=e=>{const t=ma(e);return t==="−∞"?"off":`${t} dB`};function Ny(e,t){return Gt.find(n=>n.type===e)?.dials.find(n=>n.key===t)}function Fy(e,t,n){const a=n.bpm,r=$=>{const L=n.order(),N=L.indexOf($);return N<0?L.length:N},i=($,L,N,z)=>{const I=Ny(N,z);if(!I||!L)return null;const Y=Number(L.getParam(N,z)??I.default),Q=`mix-${$}-${z}`;return I.options?{type:"select",id:Q,label:I.label,value:String(Y),options:I.options.map(P=>({value:String(P.value),label:P.label})),onChange:P=>{L.setParam(N,z,Number(P)),ne.render()}}:{type:"slider",id:Q,label:I.label,min:I.min,max:I.max,step:I.step??1,taper:Jo(I),value:Y,valueText:I.format(Y,a()),onChange:P=>{L.setParam(N,z,P),ne.render()}}},s=($,L,N,z)=>z.map(I=>i($,L,N,I)).filter(I=>I!==null),l=matchMedia(Cy);let d=null;const u=$=>{d=$,ne.render()},c=$=>u(d===$?null:$);l.addEventListener("change",()=>ne.render());const p=($,L,N,z)=>{$.setParam(L,N,z),ne.render()},h=($,L,N,z)=>Ah(L,N,{id:`hack-${$}-${N}-graph`,on:z,set:(I,Y)=>p(L,N,I,Y),help:{graph:ee["eq:graph"],low:ee["eq:low"],mid:ee["eq:mid"],high:ee["eq:high"]}}),f=($,L,N,z)=>{const I=Number(L.getParam(N,z.key)??z.default),Y=`hack-${$}-${N}-${z.key}`,Q=P=>p(L,N,z.key,P);return z.options?{type:"select",id:Y,label:z.label,value:String(I),options:z.options.map(P=>({value:String(P.value),label:P.label})),onChange:P=>Q(Number(P))}:{type:"slider",id:Y,label:z.label,min:z.min,max:z.max,step:z.step??.001,taper:Jo(z),value:I,valueText:Al(z,I,a()),onChange:Q}},g="",w={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3},drive:{drive_db:6}};let m=Qg(Ae(),`${it}/${hd}`);const b=$=>({folded:m.has($),onFold:L=>{m=ud(Ae(),$,L),ne.render()},foldHelp:ee["fx:fold"]}),v=n.plugins;v?.onChange(()=>ne.render());const y=new Map,T=$=>String($?.message??$).replace(/^nc-fx plugins?: /,""),A=($,L,N)=>{y.set($,L),ne.render(),yn({message:N,duration:9e3,anchor:se.el.querySelector(`[data-nc-id='hack-${$}-add']`)})},x=($,L)=>{const N=yn({message:L,duration:12e3,actionLabel:R.reloadAction,onAction:()=>location.reload(),anchor:se.el.querySelector(`[data-nc-id='hack-${$}-add']`)});N.el.dataset.pluginReload=$},k=$=>de($)?.label??$,M=$=>!!$&&$.startsWith("plugin:")&&!!v?.stale($.slice(7)),S=async($,L,N)=>{if(!v)return null;const z=N??await dm({title:R.urlTitle,body:R.urlBody,field:{label:R.urlField,placeholder:v.remote?R.urlPlaceholder:R.urlPlaceholderLocal,type:"url"},confirmLabel:R.urlNext,returnFocus:L??void 0});if(!z)return null;const I=Kb(z,location.href,v.remote);if(!I)return A($,R.badUrlShort,v.remote?R.badUrl:R.badUrlLocal),null;if(!await Xe({title:R.warnTitle,body:R.warnBody(mn(I)),confirmLabel:R.warnLoad,danger:!0,returnFocus:L??void 0}))return null;try{const Q=await v.loadUrl(I);return M(Q)&&x($,R.reloadToHear(k(Q))),Q}catch(Q){return Q?.reload?(y.set($,R.failedShort),ne.render(),x($,T(Q))):A($,R.failedShort,T(Q)),null}},C=$=>{const L=document.createElement("input");return L.type="file",L.hidden=!0,L.dataset.ncId="plugin-files",$?L.webkitdirectory=!0:(L.multiple=!0,L.accept=".json,.js,.mjs,application/json,text/javascript"),document.body.append(L),new Promise(N=>{const z=I=>{L.remove(),N(I)};L.addEventListener("change",()=>z(L.files?.length?[...L.files]:null)),L.addEventListener("cancel",()=>z(null)),L.click()})},F=async($,L,N)=>{if(!v)return null;const z=await C(N);if(!z)return null;let I;try{I=await Eb(z)}catch(Q){return A($,R.failedShort,T(Q)),null}if(!await Xe({title:R.warnTitle,body:R.fileWarnBody(I.manifest.name,I.manifest.author),confirmLabel:R.warnLoad,danger:!0,returnFocus:L??void 0}))return null;try{const Q=await v.addPicked(I);return"reload"in Q?(x($,R.reloadToUse(I.manifest.name,I.manifest.version)),null):Q.type}catch(Q){return A($,R.failedShort,T(Q)),null}},q=async($,L,N)=>{if(!v)return;const z=v.local().find(Y=>Y.id===L)?.name??L;await Xe({title:R.forgetTitle(z),body:R.forgetBody,confirmLabel:R.forgetConfirm,danger:!0,returnFocus:N??void 0})&&(await v.forget(L),yn({message:R.forgotten(z),duration:5e3,anchor:se.el.querySelector(`[data-nc-id='hack-${$}-add']`)}))},U=async($,L,N,z)=>{y.delete($);let I=N;if(N===kr||N===Os)I=await F($,z,N===kr);else if(N.startsWith(Er))await q($,N.slice(Er.length),z),I=null;else if(N.startsWith($r)&&v){ne.render();try{I=await v.loadKept(N.slice($r.length)),M(I)&&x($,R.reloadToHear(k(I)))}catch(Y){A($,R.failedShort,T(Y)),I=null}}else if(N===Rs)I=await S($,z);else if(N.startsWith(Sr)&&v){ne.render();try{I=await v.loadListed(N.slice(Sr.length))}catch(Y){A($,R.failedShort,T(Y)),I=null}}I&&L.addEffect(I,{dials:w[I]}),ne.render()},X=()=>v?[...v.listed().map($=>({value:`${Sr}${$.id}`,label:$.name,group:"Plugins"})),...v.local().map($=>({value:`${$r}${$.id}`,label:R.kept($.name),group:"Plugins"})),...v.loaded().map($=>({value:$.type,label:`${$.label} (${mn($.plugin.url)})`,group:"Plugins"})),{value:kr,label:R.folder,group:"Plugins"},{value:Os,label:R.files,group:"Plugins"},{value:Rs,label:R.url,group:"Plugins"},...v.local().map($=>({value:`${Er}${$.id}`,label:R.forget($.name),group:"Plugins"}))]:[];let fe=null,ge=null,re=null;const ie=$=>t.masterFx===$||t.list().some(L=>L.fx===$),G=$=>requestAnimationFrame(()=>se.el.querySelector($)?.focus()),ze=($,L,N,z,I,Y,Q)=>{const P=Hb(N.getState(),z);if(!P||!N.removeEffect(z))return;const he=!!Q&&Q===document.activeElement;if(re?.close(),ne.render(),he){const wt=N.getChain()[P.index];G(wt?`[data-nc-id='hack-${$}-${wt.id}'] [data-nc-fx-remove]`:`#hack-${$}-add-type`)}const W=yn({message:`${I} removed from ${L}.`,actionLabel:"Undo",anchor:se.el.querySelector("[data-nc-area='fx']"),onAction:()=>K($,N,P,Y),onClose:()=>{re===W&&(re=null)}});W.el.dataset.insertUndo=$,re=W},K=($,L,N,z)=>{if(!ie(L))return;const I=Ub(L.getState(),N,z);let Y=N.slot.id;if(I)L.setState(I);else{const{type:Q,dials:P,bypass:he}=N.slot;Y=L.addEffect(Q,{index:N.index,dials:P,bypass:he})}Y&&(d=$,ge=`hack-${$}-${Y}`,ne.render(),G(`[data-nc-id='hack-${$}-${Y}'] [data-nc-fx-remove]`))},be=($,L,N,z)=>{const I=N.getChain(),Y=I.map((P,he)=>{const W=de(P.type),wt=W?.dials??[],xo=ue=>ze($,L,N,P.id,P.name,z,ue),ko=ue=>{N.moveEffect(P.id,ue),ge=`hack-${$}-${P.id}`,ne.render()},cn=[];he>0&&cn.push({type:"button",id:`hack-${$}-${P.id}-left`,label:"Move left",on:!1,onPress:()=>ko(he-1)}),he<I.length-1&&cn.push({type:"button",id:`hack-${$}-${P.id}-right`,label:"Move right",on:!1,onPress:()=>ko(he+1)}),cn.push({type:"button",id:`hack-${$}-${P.id}-remove`,label:"Remove",ariaLabel:`Remove ${P.name} from ${L}`,on:!1,onPress:()=>xo(document.getElementById(`hack-${$}-${P.id}-remove`))});const $o={onRemove:ue=>xo(ue),removeLabel:`Remove ${P.name}`},le=P.plugin,Ce=(ue,vt,zt=!1)=>({type:"note",id:`hack-${$}-${P.id}-${ue}`,...zt?{tone:"danger"}:{},text:vt});if(le&&le.status==="missing"){const ue=v?.listingFor(le)??null,vt=Ca(le.url),zt=vt&&!!v?.local().some(Wn=>Wn.id===le.id),Eo=v?.loading(le.id)??!1,So=Eo?[Ce("missing",R.loading)]:[Ce("missing",v?.frozen(le.id)?R.frozenShort:vt&&!zt?R.notKept:le.url?R.missing:R.missingNoUrl,!0),Ce("through",R.through),Ce("kept",R.dialsKept),...le.url?[Ce("from",R.from(mn(le.url)))]:[]];return v&&le.url&&!Eo&&So.push({type:"button",id:`hack-${$}-${P.id}-load`,label:ue||zt?R.load:vt?R.pickAgain:R.loadAsk,ariaLabel:ue||zt?`Load ${le.name}`:vt?`Pick ${le.name}'s folder (asks first)`:`Load ${le.name} from ${mn(le.url)} (asks first)`,on:!1,onPress:()=>{const Wn=document.getElementById(`hack-${$}-${P.id}-load`);ue?v.loadListed(le.id).catch(()=>ne.render()):zt?v.loadKept(le.id).catch(()=>ne.render()):vt?F($,Wn,!0).then(()=>ne.render()):S($,Wn,le.url)}}),{type:"fx",id:`hack-${$}-${P.id}`,title:`${he+1} · ${P.name}`,...b(`${$}/${P.id}`),depth:he%4+1,controls:So,more:cn,...$o}}const Pt=W&&"plugin"in W?W.plugin:void 0,Vu=Pt?[Ce("by",`By ${Pt.author}`),Ce("version",`${Pt.licence} · ${Pt.version}`),Ce("source",Pt.listed?"Listed":R.from(mn(Pt.url)))]:[],Hu=le?.status==="failed"?[Ce("failed",Wb(le.error),!0),Ce("through",R.through),Ce("retry",R.retry)]:le&&v?.stale(le.id)?[Ce("newcode",R.newCode)]:[];return{type:"fx",id:`hack-${$}-${P.id}`,title:`${he+1} · ${P.name}`,...b(`${$}/${P.id}`),depth:he%4+1,on:!P.bypass,meter:dr(N,P.id)??void 0,meterHelp:ee["fx:meter"],onToggle:ue=>{N.setParam(P.id,"bypass",!ue),ne.render()},controls:[...Hu,...P.type==="eq"?[h($,N,P.id,!P.bypass)]:[],...wt.filter(ue=>!ue.more).map(ue=>f($,N,P.id,ue))],maxHelp:ee["fx:max"],...$o,more:[...wt.filter(ue=>ue.more).map(ue=>f($,N,P.id,ue)),...Vu,...cn]}}),Q=I.length>=z;return Y.push({type:"fx",id:`hack-${$}-add`,title:`${L} · Inserts`,...b(`${$}/add`),depth:I.length%4+1,controls:[{type:"note",id:`hack-${$}-note`,...y.get($)?{tone:"danger"}:{},text:y.get($)??(v?.loading("url")||v?.listed().some(P=>v.loading(P.id))||v?.local().some(P=>v.loading(P.id))?R.loading:Q?`${I.length} of ${z}: the stack is full.`:I.length===0?"No effects yet.":`${I.length} of ${z}, first to last.`)},...Q?[]:[{type:"select",id:`hack-${$}-add-type`,label:"Add",value:g,options:[{value:g,label:"Effect…"},...vp.map(P=>({value:P,label:de(P)?.label??P})),...X()],onChange:P=>{if(P===g)return;const he=document.getElementById(`hack-${$}-add-type`);he instanceof HTMLSelectElement&&(he.value=g),U($,N,P,he)}}]]}),Y},ve=$=>{const L=t.returns[$];return{type:"slider",id:`mix-${$}-return`,label:"Return",min:0,max:1,step:oa,value:L.level,valueText:Ks(L.level),onChange:N=>t.setReturn($,{level:N})}};let pe=Xb(Ae());const De=()=>Qb(globalThis.window,{portrait:Kc,landscape:Jl}),ju=()=>{const $=Zb({hacksShown:d,sendsShown:pe});d=$.hacksShown,$.sendsShown!==pe&&(pe=$.sendsShown,Jb(Ae(),pe)),ne.render()},co=($,L,N)=>{const z=iy(n.order(),$,L);if(!z)return;n.onReorder?.(z.id,z.before);const Y=se.el.querySelector(`${ct}[data-nc-id="strip-${CSS.escape($)}"]`)?.querySelector(N);Y&&document.activeElement!==Y&&Y.focus()};let uo=ay(Ae(),n.order());const po=()=>ty(De(),{hacksShown:d,sendsShown:pe},t.list().map($=>$.strip.trim)),_u=()=>[...t.list()].sort(($,L)=>r($.id)-r(L.id)).map($=>({type:"strip",id:`strip-${$.id}`,label:$.name,value:$.strip.position,valueText:ma($.strip.position),step:oa,defaultValue:ci,resetText:`${ma(ci)} dB`,ticks:[...Ps],mute:$.strip.mute,solo:$.strip.solo,silent:$.silent,sendsHidden:Bs(De(),pe),onChange:L=>t.set($.id,{position:L}),onTypeIn:L=>{const N=zs(L);N!==null&&t.set($.id,{position:N})},onRemove:L=>n.onRemove($.id,L),folded:uo.has($.id),onFold:L=>{uo=zd(Ae(),$.id,L),ne.render()},foldHelp:ee["strip:fold"],foldedHelp:ee["strip:folded"],onMove:L=>co($.id,L,"[data-nc-strip-grip]"),shade:$.strip.shade,onShade:L=>t.set($.id,{shade:L??0}),...$.fx?{hacks:d===$.id,hacksLabel:Ws,hacksEmpty:$.fx.getChain().length===0,onHacks:()=>c($.id)}:{},trim:{id:`trim-${$.id}`,value:$.strip.trim,min:Ed,max:Sd,step:Db,defaultValue:0,ariaLabel:`${$.name} trim`,help:ee["strip:trim"],onChange:L=>t.set($.id,{trim:Ad(L)})},trimHidden:po(),pan:{id:`pan-${$.id}`,value:$.strip.pan,ariaLabel:`${$.name} pan`,help:ee["strip:pan"],onChange:L=>t.set($.id,{pan:Math.abs(L)<.005?0:L})},onMute:()=>t.set($.id,{mute:!$.strip.mute}),onSolo:()=>t.set($.id,{solo:!$.strip.solo}),sends:["A","B"].map(L=>{const N=L==="A"?"sendA":"sendB",z=$.strip[N];return{id:`send-${L.toLowerCase()}-${$.id}`,label:L,ariaLabel:`${$.name} send ${L}`,min:0,max:_e,step:oa*2,value:z,valueText:Ks(z),defaultValue:0,onChange:I=>t.set($.id,{[N]:I})}})})),qu=()=>({type:"strip",id:`strip-${it}`,label:"Master",master:!0,sendsHidden:Bs(De(),pe),trimRow:!0,trimHidden:po(),onSendsView:ju,sendsView:Fa({hacksShown:d,sendsShown:pe}).kind==="sends",sendsViewEmpty:!ey(t.list().map($=>$.strip)),sendsViewLabel:"Sends",sendsViewHelp:ee["sends:view"],...t.masterFx?{hacks:d===it,hacksLabel:Ws,hacksEmpty:t.masterFx.getChain().length===0,onHacks:()=>c(it)}:{},channels:2,value:t.masterPositionValue,valueText:ma(t.masterPositionValue),step:oa,defaultValue:_e,resetText:"0.0 dB",ticks:[...Ps],onChange:$=>t.setMaster($),onTypeIn:$=>{const L=zs($);L!==null&&t.setMaster(L)}});let ho=sd(Ae());const mo=$=>({folded:ho[$],foldSlim:!0,onFold:L=>{ho=ld(Ae(),$,L),ne.render()},foldHelp:ee["fx:fold"]});let sn=by(Ae()),It=null,ln=!0;const fo=$=>{sn=$,ln=!0,yy(Ae(),$),ne.render()},go=()=>{const $=t.returns.a,L=t.returns.b,N=d===it&&t.masterFx?{id:it,name:"Master",fx:t.masterFx}:(()=>{const W=t.list().find(wt=>wt.id===d);return W?.fx?{id:W.id,name:W.name,fx:W.fx}:null})();N||(d=null);const z=t.masterFx?.getChain()??[],I=[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:$.on,onToggle:W=>t.setReturn("a",{on:W}),meter:dr($.fx)??void 0,meterHelp:ee["fx:meter-return"],...mo("a"),controls:[ve("a"),...s("a",$.fx,"plate",["decay","size"])],more:s("a",$.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:L.on,onToggle:W=>t.setReturn("b",{on:W}),meter:dr(L.fx)??void 0,meterHelp:ee["fx:meter-return"],...mo("b"),controls:[ve("b"),...s("b",L.fx,"delay",["delay_beats","feedback"])],more:s("b",L.fx,"delay",["tone","low_cut"])}],Y=N?[...be(N.id,N.name,N.fx,N.id===it?oi:jd)]:pe?I:[],Q=N?.id??"sends",P=Y.map(W=>W.id),he=Vb(fe,Q,P,ge);return fe={key:Q,ids:P,page:he},ge=null,{id:"mix",title:"Mix",summary:`${t.list().map(W=>W.name).join(", ")||"No instruments"} · A Reverb · B Delay · Master ${z.filter(W=>!W.bypass).map(W=>W.name).join(", ")||"no inserts on"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[..._u(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(W=>({value:W.id,label:W.available===!1?`${W.name} (soon)`:W.name,disabled:W.available===!1})),onAdd:W=>n.onAdd(W)}]},{id:"fx",area:"fx",label:N?`${N.name} inserts`:"Send effects",pageSize:Ka,page:he,onPage:W=>{fe&&(fe={...fe,page:W})},controls:Y},...sn?[{id:"meters",area:"meters",label:"VU meters",controls:[]}]:[],{id:"master",area:"master",label:"Master",controls:[qu()]}]}},se=Eg(go(),Ly),bo=()=>se.el.toggleAttribute("data-hacks-folded",Fa({hacksShown:d,sendsShown:pe}).kind==="none"&&l.matches);bo();const Re=document.createElement("button");Re.type="button",Re.className="nc-page-action vu-add",Re.dataset.vuAdd="",Re.textContent="+ Meters",Re.setAttribute("aria-label","Add VU meters"),Re.setAttribute("data-nc-help",ee["vu:add"]),Re.addEventListener("click",()=>{fo(!0),It?.el.querySelector("[data-vu-remove]")?.focus()}),se.el.querySelector(".nc-module-end")?.prepend(Re);const yo=()=>se.el.toggleAttribute("data-sends-hidden",!pe);yo();const wo=()=>{Re.hidden=sn;const $=se.el.querySelector('[data-nc-section="meters"]');!sn||!$||(It??=Ty({onRemove:()=>{fo(!1),Re.focus()},folded:wy(Ae()),onFold:L=>{ln=!0,vy(Ae(),L)}}),It.el.parentElement!==$&&$.append(It.el))};wo(),Ry(se.el,n,co),Dy(se.el,t,n),Xs(se.el),Ys(se.el),Sg(e,[se],"adjacent");const vo=$=>({peak:Is($.peak),rms:Is($.rms),over:$.peak>=Ib}),ne={module:se,get hacksShown(){return d},showHacks:u,render(){se.update(go()),bo(),wo(),yo(),Xs(se.el),Ys(se.el)},frame($){if(se.el.dataset.ncOpen!=="true")return;for(const N of t.list())vs(se.el,`strip-${N.id}`)?.update([vo(N.levels())],$);const L=t.masterLevels();if(vs(se.el,`strip-${it}`)?.update(L.map(vo),$),It&&sn){const N=t.ctx.state==="running";N&&(ln=!0),ln&&(ln=It.frame(N?[L[0].rms,L[1].rms]:null,$))}}};return ne}const ct=".nc-strip:not([data-nc-master])",fa=e=>e?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null,Iy="[data-nc-strip-grip], .nc-strip-hd, .nc-strip-fold",Py=6,zy=400,sa=12;function Ys(e){for(const t of e.querySelectorAll(".nc-strip [data-nc-hacks]"))t.setAttribute("data-nc-help",t.closest("[data-nc-master]")?ee["inserts:master"]:ee["inserts:channel"]);for(const t of e.querySelectorAll(':is([data-nc-id="mix-a"], [data-nc-id="mix-b"]) .nc-ui-fx-hd .nc-ui-fx-name'))t.setAttribute("data-nc-help",ee["mix:sends"])}function Xs(e){for(const t of e.querySelectorAll(`${ct} .nc-strip-hd > .nc-strip-name`))t.setAttribute("data-nc-help",ee["strip:name"]);for(const t of e.querySelectorAll(`${ct} .nc-strip-hd`))t.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight")}function Dy(e,t,n){e.addEventListener("dblclick",a=>{const r=a.target instanceof Element?a.target.closest(".nc-strip-hd > .nc-strip-name"):null,i=r?.closest(ct),s=fa(i??null),l=r?.parentElement;if(!s||!l||!n.onRename||l.hasAttribute("data-renaming"))return;const d=t.list().find(h=>h.id===s)?.name??r.textContent??"",u=document.createElement("input");u.type="text",u.className="nc-strip-name-input",u.value=d,u.maxLength=nd,u.spellcheck=!1,u.autocomplete="off",u.setAttribute("aria-label",`Rename ${d}`),u.setAttribute("data-nc-help",ee["strip:rename"]),l.setAttribute("data-renaming",""),l.insertBefore(u,r),u.focus(),u.select();let c=!1;const p=h=>{if(c)return;c=!0;const f=u.value;u.remove(),l.removeAttribute("data-renaming"),h&&f!==d&&n.onRename?.(s,f)};u.addEventListener("keydown",h=>{h.key==="Enter"?(h.preventDefault(),p(!0)):h.key==="Escape"&&(h.preventDefault(),p(!1))}),u.addEventListener("blur",()=>p(!0)),u.addEventListener("click",h=>h.stopPropagation())})}function Ry(e,t,n){let a=null;const r=()=>{for(const c of e.querySelectorAll("[data-drop]"))c.removeAttribute("data-drop")},i=()=>{a&&(window.clearTimeout(a.timer),a.strip.removeAttribute("data-dragging"),e.removeAttribute("data-strip-drag"),r(),a=null)},s=c=>{c.active=!0,c.strip.setAttribute("data-dragging","true"),e.setAttribute("data-strip-drag",""),c.touch&&!c.grip&&navigator.vibrate?.(10)},l=()=>[...e.querySelectorAll(ct)].map(c=>{const p=c.getBoundingClientRect();return{id:fa(c)??"",left:p.left,width:p.width}}),d=(c,p)=>{const h=c.strip.parentElement;if(h&&h.scrollWidth>h.clientWidth){const w=h.getBoundingClientRect();p<w.left+sa*2?h.scrollLeft-=sa:p>w.right-sa*2&&(h.scrollLeft+=sa)}const f=oy(l(),p),g=f?js(t.order(),c.id,f):null;c.mark=g?f:null,r(),c.mark&&e.querySelector(`${ct}[data-nc-id="strip-${CSS.escape(c.mark.target)}"]`)?.setAttribute("data-drop",c.mark.side)},u=()=>{const c=p=>{p.stopPropagation(),p.preventDefault()};e.addEventListener("click",c,{capture:!0,once:!0}),window.setTimeout(()=>e.removeEventListener("click",c,{capture:!0}),0)};e.addEventListener("pointerdown",c=>{if(a||c.pointerType==="mouse"&&c.button!==0)return;const p=c.target instanceof Element?c.target:null;if(!p||p.closest("input, .nc-strip-remove, [data-nc-strip-hide], [data-renaming]"))return;const h=p.closest(Iy),f=h?.closest(ct),g=fa(f??null);if(!h||!f||!g)return;const w={id:g,strip:f,pointerId:c.pointerId,x0:c.clientX,y0:c.clientY,grip:h.matches("[data-nc-strip-grip]"),touch:c.pointerType!=="mouse",active:!1,timer:0,mark:null};a=w,w.touch&&!w.grip&&(w.timer=window.setTimeout(()=>{a===w&&!w.active&&s(w)},zy)),w.grip&&!w.touch&&c.preventDefault()}),window.addEventListener("pointermove",c=>{const p=a;if(!(!p||c.pointerId!==p.pointerId)){if(!p.active){if(Math.hypot(c.clientX-p.x0,c.clientY-p.y0)<Py)return;if(p.touch&&!p.grip)return i();s(p)}c.preventDefault(),d(p,c.clientX)}}),e.addEventListener("touchmove",c=>{a?.active&&c.preventDefault()},{passive:!1}),e.addEventListener("contextmenu",c=>{a?.touch&&c.preventDefault()}),window.addEventListener("pointerup",c=>{const p=a;if(!p||c.pointerId!==p.pointerId)return;const h=p.active?p.mark:null,f=p.active;if(i(),!f)return;u();const g=h?js(t.order(),p.id,h):null;g&&t.onReorder?.(g.id,g.before)}),window.addEventListener("pointercancel",c=>{a&&c.pointerId===a.pointerId&&i()}),window.addEventListener("keydown",c=>{c.key==="Escape"&&a?.active&&i()}),e.addEventListener("keydown",c=>{if(!c.altKey||c.ctrlKey||c.metaKey||c.shiftKey||c.key!=="ArrowLeft"&&c.key!=="ArrowRight")return;const p=c.target instanceof Element?c.target:null,h=p?.closest(".nc-strip-hd, [data-nc-strip-hide], .nc-strip-fold");if(!p||!h||p.closest("input, [data-nc-strip-grip]"))return;const f=fa(h.closest(ct));if(!f)return;c.preventDefault();const g=h.matches("[data-nc-strip-hide]")?"[data-nc-strip-hide]":h.matches(".nc-strip-fold")?".nc-strip-fold":".nc-strip-hd :is(button, [tabindex])";n(f,c.key==="ArrowLeft"?-1:1,g)})}const Oy=1e-5,By=2e3,jy=500,Cn={parked:!1,quietSince:null};function _y(e,t,n,a){if(t)return Cn;if(e.parked)return e;if(!(n<Oy))return Cn;const r=e.quietSince??a;return{parked:a-r>=By,quietSince:r}}const Js=e=>10**(e/20),Ue=.012,Mr=1024,Qs=32768;class qy{ctx;bus;masterFx;master;limiter;masterMeter;masterMeters;insertMeters;returns;park={a:Cn,b:Cn};parkMeters;parkScratch=new Float32Array(Qs);masterPosition=_e;channels=[];listeners=new Set;scratch=new Float32Array(Mr);restore;channelFx;applyQueued=!1;constructor(t,n={}){this.ctx=t,this.restore=n.restore,this.channelFx=n.channelFx;const a=()=>new AnalyserNode(t,{fftSize:Mr});this.bus=new GainNode(t,{gain:1}),this.master=new GainNode(t,{gain:st(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(t,yd),this.masterMeter=a(),this.masterMeters=[a(),a()],this.insertMeters={pre:a(),post:a()},this.masterFx=n.masterFx?.()??null,this.bus.connect(this.insertMeters.pre),this.masterFx?(this.bus.connect(this.masterFx.input),this.masterFx.output.connect(this.master),this.masterFx.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(t.destination);const r=new ChannelSplitterNode(t,{numberOfOutputs:2});this.limiter.connect(r),r.connect(this.masterMeters[0],0),r.connect(this.masterMeters[1],1);const i=l=>{const d=new GainNode(t,{gain:1}),u=n.fx?.(l)??null,c=new GainNode(t,{gain:st(_e)}),p=a();return u?(d.connect(u.input),u.output.connect(c)):c.gain.value=0,c.connect(p),c.connect(this.bus),{bus:d,fx:u,gain:c,meter:p,on:u!==null,level:_e}};this.returns={a:i("a"),b:i("b")};const s=l=>{const d=new AnalyserNode(t,{fftSize:Qs});return this.returns[l].gain.connect(d),d};this.parkMeters={a:s("a"),b:s("b")}}attach(t,n){let a=this.channels.find(r=>r.id===t);if(a)a.input.disconnect(),a.input=new GainNode(this.ctx,{gain:1}),a.input.connect(a.trim);else{const r=new GainNode(this.ctx,{gain:1}),i=this.restore?.(t)??$d,s=new GainNode(this.ctx,{gain:Js(i.trim)});r.connect(s);const l=new GainNode(this.ctx,{gain:0}),d=new AnalyserNode(this.ctx,{fftSize:Mr}),u=new GainNode(this.ctx,{gain:0}),c=new GainNode(this.ctx,{gain:0}),p=this.channelFx?.(t)??null;p?(s.connect(p.input),p.output.connect(l)):s.connect(l);const h=new GainNode(this.ctx,{gain:1,channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),f=new ChannelSplitterNode(this.ctx,{numberOfOutputs:2}),g=new GainNode(this.ctx,{gain:1}),w=new GainNode(this.ctx,{gain:1}),m=new ChannelMergerNode(this.ctx,{numberOfInputs:2});l.connect(d),l.connect(h).connect(f),f.connect(g,0).connect(m,0,0),f.connect(w,1).connect(m,0,1),m.connect(this.bus),m.connect(u).connect(this.returns.a.bus),m.connect(c).connect(this.returns.b.bus),a={id:t,name:n,input:r,trim:s,fader:l,stereo:h,split:f,balL:g,balR:w,panner:m,meter:d,sendA:u,sendB:c,fx:p,strip:i},this.channels.push(a),this.queueApply()}return this.emit(),a.input}rename(t,n){const a=this.channels.find(r=>r.id===t);!a||a.name===n||(a.name=n,this.emit())}detach(t){const n=this.channels.findIndex(r=>r.id===t);if(n<0)return;const[a]=this.channels.splice(n,1);if(a){for(const r of[a.input,a.trim,a.fader,a.stereo,a.split,a.balL,a.balR,a.panner,a.meter,a.sendA,a.sendB])r.disconnect();a.fx?.output.disconnect(),a.fx?.dispose(),this.queueApply(),this.emit()}}tapNode(t){return t==="master"?this.limiter:this.channels.find(n=>n.id===t)?.panner??null}tapLatency(t,n){const a=i=>{const s=i?.latencySamples;return typeof s=="number"&&Number.isFinite(s)&&s>0?Math.round(s):0};if(t==="master")return Math.max(0,Math.round(n))+a(this.masterFx);const r=this.channels.find(i=>i.id===t);return r?a(r.fx):null}set(t,n){const a=this.channels.find(r=>r.id===t);a&&(a.strip={...a.strip,...n},this.queueApply(),this.emit())}setMaster(t){this.masterPosition=t,this.master.gain.setTargetAtTime(st(t),this.ctx.currentTime,Ue),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(t,n){const a=this.returns[t],r=this.ctx.currentTime;n.on!==void 0&&(a.on=n.on&&a.fx!==null,a.bus.gain.setTargetAtTime(a.on?1:0,r,Ue),this.wakeFed()),n.level!==void 0&&(a.level=n.level,a.fx&&a.gain.gain.setTargetAtTime(st(a.level),r,Ue)),this.emit()}fed(t){const n=this.returns[t];if(!n.on||!n.fx)return!1;const a=t==="a"?"sendA":"sendB";return this.channels.some(r=>st(r.strip[a])>0)}setParked(t,n){const a=this.returns[t];a.fx&&(n?(a.bus.disconnect(a.fx.input),a.fx.output.disconnect(a.gain),a.fx.clear()):(a.bus.connect(a.fx.input),a.fx.output.connect(a.gain)))}wakeFed(){for(const t of["a","b"])this.park[t].parked&&this.fed(t)&&(this.park[t]=Cn,this.setParked(t,!1))}parkIdleReturns(t=performance.now()){for(const n of["a","b"]){const a=this.park[n],r=_y(a,this.fed(n),a.parked?0:this.parkPeak(n),t);this.park[n]=r,r.parked!==a.parked&&this.setParked(n,r.parked)}}parkPeak(t){const n=this.parkScratch;this.parkMeters[t].getFloatTimeDomainData(n);let a=0;for(let r=0;r<n.length;r++)a=Math.max(a,Math.abs(n[r]??0));return a}returnParked(t){return this.park[t].parked}setTempo(t,n){for(const a of[this.returns.a.fx,this.returns.b.fx,this.masterFx])a?.setTempo(t,n);for(const a of this.channels)a.fx?.setTempo(t,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(t){return this.levelsOf(this.returns[t].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const t=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||t&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}queueApply(){this.applyQueued||(this.applyQueued=!0,queueMicrotask(()=>{this.applyQueued=!1,this.apply()}))}apply(){const t=Fb(this.channels.map(a=>a.strip)),n=this.ctx.currentTime;this.channels.forEach((a,r)=>{a.fader.gain.setTargetAtTime(t[r]??0,n,Ue),a.trim.gain.setTargetAtTime(Js(a.strip.trim),n,Ue),a.sendA.gain.setTargetAtTime(st(a.strip.sendA),n,Ue),a.sendB.gain.setTargetAtTime(st(a.strip.sendB),n,Ue);const[i,s]=zb(a.strip.pan);a.balL.gain.setTargetAtTime(i,n,Ue),a.balR.gain.setTargetAtTime(s,n,Ue)}),this.wakeFed()}levelsOf(t){return t.getFloatTimeDomainData(this.scratch),Pb(this.scratch)}emit(){for(const t of this.listeners)t()}}const Vy=["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"],fn=(e,t)=>t.map(([n,a,r,i])=>({id:n,name:a,intervals:r,category:e,symbol:i})),_d=[...fn("Essential",[["major","Major",[0,4,7],""],["minor","Minor",[0,3,7],"m"],["diminished","Diminished",[0,3,6],"dim"],["augmented","Augmented",[0,4,8],"aug"],["sus2","Sus2",[0,2,7],"sus2"],["sus4","Sus4",[0,5,7],"sus4"],["power","Power Chord",[0,7,12],"5"],["major-6","Major 6",[0,4,7,9],"6"],["minor-6","Minor 6",[0,3,7,9],"m6"]]),...fn("Seventh",[["major-7","Major 7",[0,4,7,11],"maj7"],["minor-7","Minor 7",[0,3,7,10],"m7"],["dominant-7","Dominant 7",[0,4,7,10],"7"],["minor-major-7","Minor-Major 7",[0,3,7,11],"m(maj7)"],["half-diminished-7","Half-Diminished 7",[0,3,6,10],"m7b5"],["diminished-7","Diminished 7",[0,3,6,9],"dim7"],["augmented-major-7","Augmented Major 7",[0,4,8,11],"aug(maj7)"],["augmented-7","Augmented 7",[0,4,8,10],"aug7"],["7sus4","7sus4",[0,5,7,10],"7sus4"]]),...fn("Extended",[["add9","Add9",[0,4,7,14],"add9"],["minor-add9","Minor Add9",[0,3,7,14],"m(add9)"],["major-9","Major 9",[0,4,7,11,14],"maj9"],["minor-9","Minor 9",[0,3,7,10,14],"m9"],["dominant-9","Dominant 9",[0,4,7,10,14],"9"],["6-9","6/9",[0,4,7,9,14],"6/9"],["minor-6-9","Minor 6/9",[0,3,7,9,14],"m6/9"],["major-7-sharp11","Major 7#11",[0,4,7,11,18],"maj7#11"],["minor-11","Minor 11",[0,3,7,10,14,17],"m11"],["dominant-11","Dominant 11",[0,4,7,10,14,17],"11"],["9sus4","9sus4",[0,5,7,10,14],"9sus4"],["major-13","Major 13",[0,4,7,11,14,21],"maj13"],["minor-13","Minor 13",[0,3,7,10,14,17,21],"m13"],["dominant-13","Dominant 13",[0,4,7,10,14,21],"13"]]),...fn("Altered",[["7b9","7b9",[0,4,7,10,13],"7b9"],["7-sharp9","7#9",[0,4,7,10,15],"7#9"],["7b5","7b5",[0,4,6,10],"7b5"],["7-sharp5","7#5",[0,4,8,10],"7#5"],["7b9-sharp5","7b9#5",[0,4,8,10,13],"7b9#5"],["7-sharp9-b5","7#9b5",[0,4,6,10,15],"7#9b5"],["7alt","7alt",[0,4,10,13,15,18,20],"7alt"],["major-7b5","Major 7b5",[0,4,6,11],"maj7b5"],["minor-7b9","Minor 7b9",[0,3,7,10,13],"m7b9"]]),...fn("Experimental",[["quartal-3","Quartal 3",[0,5,10]," Quartal 3"],["quartal-4","Quartal 4",[0,5,10,15]," Quartal 4"],["quartal-5","Quartal 5",[0,5,10,15,20]," Quartal 5"],["quintal-3","Quintal 3",[0,7,14]," Quintal 3"],["quintal-4","Quintal 4",[0,7,14,21]," Quintal 4"],["chromatic-cluster","Chromatic Cluster",[0,1,2]," Chromatic Cluster"],["whole-tone-cluster","Whole-Tone Cluster",[0,2,4,6]," Whole-Tone Cluster"],["minor-second-cluster","Minor-Second Cluster",[0,1,5,7]," Minor-Second Cluster"],["major-second-stack","Major-Second Stack",[0,2,4,7,9]," Major-Second Stack"],["lydian-stack","Lydian Stack",[0,2,4,6,7,11]," Lydian Stack"],["major-pentatonic","Major Pentatonic",[0,2,4,7,9]," Major Pentatonic"],["minor-pentatonic","Minor Pentatonic",[0,3,5,7,10]," Minor Pentatonic"],["in-sen","In-sen",[0,1,5,7,10]," In-sen"],["whole-tone","Whole-Tone Collection",[0,2,4,6,8,10]," Whole-Tone"]])],qd=new Map(_d.map(e=>[e.id,e])),Tr={Major:"major",Minor:"minor",Diminished:"diminished",Augmented:"augmented",Sus2:"sus2",Sus4:"sus4","Major 7th":"major-7","Minor 7th":"minor-7","Dominant 7th":"dominant-7"};function Hy(e){if(typeof e!="string")return"major";if(qd.has(e))return e;if(Tr[e])return Tr[e];const t=a=>a.trim().toLowerCase().replace(/[\s_-]+/g,""),n=t(e);return Object.entries(Tr).find(([a])=>t(a)===n)?.[1]??_d.find(a=>t(a.name)===n||t(a.id)===n)?.id??"major"}function Gi(e){return qd.get(Hy(e))}const ui=(e,t,n)=>Math.max(t,Math.min(n,Math.round(Number.isFinite(e)?e:t)));function Vd(e){if(!e.length)return[];const t=Math.min(...e),n=Math.max(...e),a=Math.ceil(-t/12),r=Math.floor((127-n)/12);if(a>r)throw new RangeError("Voicing spans more than the supported MIDI range.");const i=Math.max(a,Math.min(r,0))*12;return e.map(s=>s+i)}function Uy(e,t,n=0,a="compact"){const i=Gi(t).intervals.map(l=>ui(e,0,127)+l);for(let l=0;l<ui(n,0,i.length-1);l++){const d=i.shift(),u=i[i.length-1];i.push(d+Math.ceil((u-d+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[a]??0;return Vd(i.map((l,d)=>l+12*Math.floor(d*s/Math.max(1,i.length-1))))}function Gy(e,t=1){return[...new Set(Array.from({length:ui(t,1,4)},(n,a)=>e.map(r=>r+a*12)).flat().filter(n=>n>=0&&n<=127))]}function Wy(e,t){const n=[...new Set(e)].sort((i,s)=>i-s),a=n.length;if(a<2)return n;const r=[...n,...n.slice(1,-1).reverse()];switch(t){case"down":return n.reverse();case"up-down":return r;case"down-up":return r.map(i=>n[a-1-n.indexOf(i)]);case"up-down-repeat":return[...n,...[...n].reverse()];case"as-played":return[...new Set(e)];case"outside-in":{const i=[];for(let s=0,l=a-1;s<=l;s++,l--)i.push(n[s]),s!==l&&i.push(n[l]);return i}case"inside-out":return n.map((i,s)=>({note:i,i:s})).sort((i,s)=>Math.abs(i.i-(a-1)/2)-Math.abs(s.i-(a-1)/2)||i.i-s.i).map(i=>i.note);case"pendulum":{const i=Math.floor((a-1)/2);return[...r.slice(i),...r.slice(0,i)]}case"blossom-up":case"blossom-down":{const i=Math.floor((a-1)/2),s=t==="blossom-up"?1:-1,l=[n[i]];for(let d=1;l.length<a;d++)for(const u of[i+s*d,i-s*d])u>=0&&u<a&&l.push(n[u]);return l}case"low-and-up":case"low-and-down":case"hi-and-up":case"hi-and-down":{const i=t.startsWith("low"),s=i?n[0]:n[a-1],l=i?n.slice(1):n.slice(0,-1);return t.endsWith("down")&&l.reverse(),l.flatMap(d=>[s,d])}default:return n}}const Ky=16,pi={hits:5,steps:8,rotate:0};function Hd(e){const t=(a,r)=>typeof a=="number"&&Number.isFinite(a)?Math.round(a):r,n=Math.max(1,Math.min(Ky,t(e?.arpSteps,pi.steps)));return{steps:n,hits:Math.max(0,Math.min(n,t(e?.arpHits,pi.hits))),rotate:(t(e?.arpRotate,0)%n+n)%n}}function Ud(e,t){return((Math.floor(t)+e.rotate)%e.steps+e.steps)%e.steps*e.hits%e.steps<e.hits}function Yy(e,t){let n=Math.floor(t/e.steps)*e.hits;for(let a=t-t%e.steps;a<t;a++)Ud(e,a)&&n++;return n}const Xy=1592598566;function Jy(e){let t=(Math.imul(e^Xy,2654435761)^2246822507)>>>0;return t=Math.imul(t^t>>>16,2146121005),t=Math.imul(t^t>>>15,2221713035),((t^t>>>16)>>>0)/2**32}const Zs=new Map;function Qy(e,t){if(e<2)return 0;const n=Math.max(0,Math.floor(t));let a=Zs.get(e);(!a||a.step>n)&&(a={step:0,pos:0});let{step:r,pos:i}=a;for(;r<n;r++){const s=Jy(r+1);i=(i+(s<.5?1:s<.75?0:e-1))%e}return Zs.set(e,{step:r,pos:i}),i}function Zy(e,t,n,a=pi,r=Math.random){if(t<1)return null;const i=s=>(Math.floor(s)%t+t)%t;if(e==="random")return Math.min(t-1,Math.max(0,Math.floor(r()*t)));if(e==="walk")return Qy(t,n);if(e==="euclidean"){const s=Hd({arpHits:a.hits,arpSteps:a.steps,arpRotate:a.rotate}),l=Math.max(0,Math.floor(n));return Ud(s,l)?i(Yy(s,l)):null}return i(n)}const Wi=[{id:"off",num:0,name:"Off — chord",description:"No arp: the chord plays together"},{id:"up",num:1,name:"Up",description:"Low to high, then again"},{id:"down",num:2,name:"Down",description:"High to low, then again"},{id:"up-down",num:3,name:"Up/Down",description:"Up then down, ends not repeated"},{id:"up-down-repeat",num:4,name:"Up/Down Repeat",description:"Up then down, ends repeated"},{id:"random",num:5,name:"Random",description:"Any note each step"},{id:"as-played",num:6,name:"As Played",description:"The order the keys were pressed"},{id:"outside-in",num:7,name:"Outside-In",description:"Lowest, highest, then inward"},{id:"inside-out",num:8,name:"Inside-Out",description:"From the middle outward, lower first"},{id:"pendulum",num:9,name:"Pendulum",description:"From the lower middle, swing between the ends"},{id:"blossom-up",num:10,name:"Blossom Up",description:"From center, spiral up"},{id:"blossom-down",num:11,name:"Blossom Down",description:"From center, spiral down"},{id:"low-and-up",num:12,name:"Low&Up",description:"Low pedal, others ascending"},{id:"low-and-down",num:13,name:"Low&Down",description:"Low pedal, others descending"},{id:"hi-and-up",num:14,name:"Hi&Up",description:"High pedal, others ascending"},{id:"hi-and-down",num:15,name:"Hi&Down",description:"High pedal, others descending"},{id:"walk",num:16,name:"Walk",description:"Next 50%, repeat 25%, back 25%"},{id:"euclidean",num:17,name:"Euclidean",description:"Hits spread evenly over Steps, rests between"},{id:"down-up",num:18,name:"Down/Up (legacy)",description:"Down then up, ends not repeated",legacy:!0}];new Set(Wi.map(e=>e.id));new Map(Wi.map(e=>[e.num,e.id]));Wi.map(e=>({value:e.id,label:e.name}));const Gd=[{id:"block",label:"Block",kind:"repeat"},{id:"walk-up",label:"Inversion walk · up",kind:"repeat"},{id:"walk-down",label:"Inversion walk · down",kind:"repeat"},{id:"walk-up-down",label:"Inversion walk · up-down",kind:"repeat"},{id:"walk-random",label:"Inversion walk · random",kind:"repeat"},{id:"oom-pah",label:"Oom-pah",kind:"bar"},{id:"alberti",label:"Alberti",kind:"repeat"},{id:"pulse",label:"Pulse + accents",kind:"repeat"},{id:"charleston",label:"Charleston",kind:"bar"},{id:"skank",label:"Skank",kind:"bar"},{id:"house",label:"House stab",kind:"bar"},{id:"montuno",label:"Montuno",kind:"bar"},{id:"push",label:"Push",kind:"bar"},{id:"strum",label:"Strum",kind:"bar"},{id:"drift",label:"Voicing drift",kind:"repeat"}];Gd.map(e=>e.id);const el=e=>Gd.find(t=>t.id===e)?.kind??"repeat",e0=15,t0=40,Te=e=>[...e].sort((t,n)=>t-n);function Wd(e,t){const n=Te(e);for(let a=0;a<t;a++){const r=n.shift(),i=n[n.length-1]??r;n.push(r+Math.ceil((i-r+1)/12)*12)}return n}const la=e=>Wd(e,1);function n0(e,t){const n=e[0];return n-((n-t)%12+12)%12}function a0(e,t){const n=Te(e);if(n.length<3)return n;switch((t%4+4)%4){case 1:return Te([n[0],...n.slice(2),n[1]+12]);case 2:return Te([n[0],...n.slice(3),n[1]+12,n[2]+12]);case 3:return Te([n[0]-12,n[2],n[1]+12,...n.slice(3).map(r=>r+12)]);default:return n}}function r0(e,t,n,a=Math.random){const r=Math.max(1,Math.min(t,3)),i=Math.max(0,Math.floor(n));switch(e){case"walk-down":return(r-i%r)%r;case"walk-up-down":{if(r<2)return 0;const s=2*r-2,l=i%s;return l<r?l:s-l}case"walk-random":return Math.min(r-1,Math.floor(a()*r));default:return i%r}}function i0(e,t,n,a,r=Math.random){const i=Te(t);if(!i.length)return{notes:[],velocity:1};switch(e){case"block":return{notes:i,velocity:1};case"walk-up":case"walk-down":case"walk-up-down":case"walk-random":return{notes:Wd(i,r0(e,i.length,n,r)),velocity:.9};case"alberti":return{notes:[[i[0],i[2]??i[i.length-1],i[1]??i[0],i[2]??i[i.length-1]][(Math.floor(n)%4+4)%4]],velocity:.85};case"pulse":{const s=Math.abs(a/2-Math.round(a/2))<1e-6;return{notes:i,velocity:s?1:.45}}case"drift":return{notes:a0(i,n),velocity:.9};default:return null}}function o0(e,t,n,a,r=t){const i=Te(t);if(!i.length)return[];const s=(d,u,c,p)=>d.map(h=>({step:h,len:u,notes:c,velocity:p})),l=n0(i,n);switch(e){case"oom-pah":return[...s([0],3,[l-12],1),...s([4],2,la(i),.75),...s([8],3,[l-12],1),...s([12],2,la(i),.75)];case"charleston":return s([0,6],2,i,.9);case"skank":return s([4,12],1,la(i),.9);case"house":return s([2,6,10,14],1,la(i),.9);case"montuno":{const d=l+(a[1]??4),u=l+(a[2]??7),c=a[3]!==void 0&&a[3]<12?l+a[3]:l+12,p=[l,l+12],h=[d,u];return[[0,p],[3,h],[5,p],[6,h],[8,[u,c]],[10,p],[13,h],[14,[u,l+12]]].map(([f,g])=>({step:f,len:1,notes:Te(g),velocity:.85}))}case"push":return[...s([0],6,i,.9),...s([6],2,i,.9),{step:14,len:2,notes:Te(r),velocity:.9,next:!0}];case"strum":{const d=[...i,i[0]+12];return[{step:0,len:3.5,notes:d,velocity:.95,strum:"down"},{step:8,len:3.5,notes:d,velocity:.75,strum:"up"}]}default:return[]}}function s0(e,t,n){const a=n==="down"?Te(e):Te(e).reverse(),r=Math.max(0,Math.min(t0,t))/1e3;return a.map((i,s)=>({midi:i,offset:s*r}))}const tl=e=>Math.abs(e-Math.round(e))<1e-6?"down":"up";function l0(e){const t=new Set(e.map(i=>(i%12+12)%12)),n=i=>t.has(i);let a;const r=n(3)&&!n(4);return r&&n(6)&&n(9)?a=[14]:r&&n(6)?a=[17]:n(4)&&n(8)&&!n(7)?a=[14]:n(4)&&n(10)?a=[14,21]:n(4)?a=[14,18,21]:n(3)?a=[14,17]:n(5)||n(2)?a=[14,21]:a=[14],a.filter(i=>!n(i%12))}function c0(e,t,n,a=Math.random){const r=l0(n);if(!r.length||!e.length)return null;const i=(t+r[Math.min(r.length-1,Math.floor(a()*r.length))])%12,s=Math.max(...e),l=s+1+((i-(s+1))%12+12)%12;return l<=127?l:null}function hi(e,t,n=0,a="compact"){const r=t.map(l=>Math.max(0,Math.min(127,Math.round(e)))+l),i=Math.max(0,Math.min(r.length-1,Math.round(n)||0));for(let l=0;l<i;l++){const d=r.shift(),u=r[r.length-1];r.push(d+Math.ceil((u-d+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[a]??0;return Vd(r.map((l,d)=>l+12*Math.floor(d*s/Math.max(1,r.length-1))))}function d0(e,t){const n=Te(e),a=Te(t);if(n.length===a.length)return n.reduce((i,s,l)=>i+Math.abs(s-a[l]),0);const r=(i,s)=>Math.min(...s.map(l=>Math.abs(l-i)));return n.reduce((i,s)=>i+r(s,a),0)+a.reduce((i,s)=>i+r(s,n),0)}function u0(e,t,n,a,r,i="compact",s){const l=hi(t,n,s??r,i);if(!e||!e.length)return l;let d=l,u=1/0,c=1/0;const p=s!==void 0?[s]:n.map((h,f)=>f);for(const h of p)for(const f of[-24,-12,0,12]){const g=hi(t,n,h,i).map(b=>b+f);if(g[0]<a-7||g[0]>a+12||g[0]<0||g[g.length-1]>127)continue;const w=d0(g,e),m=Math.abs(g.reduce((b,v)=>b+v,0)/g.length-e.reduce((b,v)=>b+v,0)/e.length);(w<u-1e-9||Math.abs(w-u)<1e-9&&m<c-1e-9)&&(d=g,u=w,c=m)}return d}const p0={"Pop / Rock":"Pop",Blues:"Blues",Jazz:"Jazz","Soul / R&B / Neo-soul":"Soul",Gospel:"Gospel","EDM / House / Trance":"EDM","Cinematic / Ambient":"Cinematic","Latin / Flamenco":"Latin","Lo-fi / Chill":"Lo-fi",Modal:"Modal"},E=(e,t,n,a=1,r={})=>({degree:e,chord:t,numeral:n,bars:a,...r}),B="major",we="minor",j="dominant-7",J="minor-7",xe="major-7",Lr="half-diminished-7",Cr="diminished-7",H=(e,t,n,a,r,i)=>({id:e,group:t,name:n,level:a,tonality:r,chords:i,short:p0[t]}),nl=e=>[E(0,j,"I7"),E(e==="IV7"?5:0,j,e),E(0,j,"I7"),E(0,j,"I7"),E(5,j,"IV7"),E(5,j,"IV7"),E(0,j,"I7"),E(0,j,"I7"),E(7,j,"V7"),E(5,j,"IV7"),E(0,j,"I7"),E(7,j,"V7")],Kd=[H("pop-1-5-6-4","Pop / Rock","I–V–vi–IV",1,"major",[E(0,B,"I"),E(7,B,"V"),E(9,we,"vi"),E(5,B,"IV")]),H("pop-6-4-1-5","Pop / Rock","vi–IV–I–V",1,"major",[E(9,we,"vi"),E(5,B,"IV"),E(0,B,"I"),E(7,B,"V")]),H("pop-50s","Pop / Rock","I–vi–IV–V · 50s",1,"major",[E(0,B,"I"),E(9,we,"vi"),E(5,B,"IV"),E(7,B,"V")]),H("rock-1-b7-4","Pop / Rock","I–♭VII–IV",2,"mixolydian",[E(0,B,"I"),E(10,B,"♭VII"),E(5,B,"IV",2)]),H("pop-canon","Pop / Rock","Canon · 8 chords",2,"major",[E(0,B,"I",.5),E(7,B,"V",.5),E(9,we,"vi",.5),E(4,we,"iii",.5),E(5,B,"IV",.5),E(0,B,"I",.5),E(5,B,"IV",.5),E(7,B,"V",.5)]),H("blues-12","Blues","12-bar",1,"blues",nl("I7")),H("blues-12-quick","Blues","12-bar quick change",2,"blues",nl("IV7")),H("blues-minor","Blues","Minor blues",2,"minor",[E(0,J,"i7"),E(0,J,"i7"),E(0,J,"i7"),E(0,J,"i7"),E(5,J,"iv7"),E(5,J,"iv7"),E(0,J,"i7"),E(0,J,"i7"),E(8,j,"♭VI7"),E(7,j,"V7"),E(0,J,"i7"),E(7,j,"V7")]),H("blues-jazz","Blues","Jazz blues",3,"blues",[E(0,j,"I7"),E(5,j,"IV7"),E(0,j,"I7"),E(7,J,"v7",.5),E(0,j,"I7",.5),E(5,j,"IV7"),E(6,Cr,"♯iv°7"),E(0,j,"I7"),E(9,j,"VI7"),E(2,J,"ii7"),E(7,j,"V7"),E(0,j,"I7",.5),E(9,j,"VI7",.5),E(2,J,"ii7",.5),E(7,j,"V7",.5)]),H("jazz-2-5-1","Jazz","ii–V–I",1,"major",[E(2,J,"ii7"),E(7,j,"V7"),E(0,xe,"Imaj7",2)]),H("jazz-2-5-1-minor","Jazz","ii–V–i minor",2,"minor",[E(2,Lr,"iiø7"),E(7,"7b9","V7♭9"),E(0,"minor-6","i6",2)]),H("jazz-rhythm","Jazz","I–vi–ii–V · rhythm changes",2,"major",[E(0,xe,"Imaj7",.5),E(9,J,"vi7",.5),E(2,J,"ii7",.5),E(7,j,"V7",.5)]),H("jazz-turnaround","Jazz","iii–VI–ii–V turnaround",2,"major",[E(4,J,"iii7",.5),E(9,j,"VI7",.5),E(2,J,"ii7",.5),E(7,j,"V7",.5)]),H("jazz-autumn","Jazz","Autumn cycle",3,"minor",[E(5,J,"iv7"),E(10,j,"♭VII7"),E(3,xe,"♭IIImaj7"),E(8,xe,"♭VImaj7"),E(2,Lr,"iiø7"),E(7,"7b9","V7♭9"),E(0,J,"i7",2)]),H("jazz-giant-steps","Jazz","Giant Steps cycle",3,"major",[E(0,xe,"Imaj7",.5),E(3,j,"♭III7",.5),E(8,xe,"♭VImaj7",.5),E(11,j,"VII7",.5),E(4,xe,"IIImaj7"),E(10,J,"♭vii7",.5),E(3,j,"♭III7",.5),E(8,xe,"♭VImaj7",.5),E(11,j,"VII7",.5),E(4,xe,"IIImaj7",.5),E(7,j,"V7",.5),E(0,xe,"Imaj7"),E(6,J,"♯iv7",.5),E(11,j,"VII7",.5)]),H("soul-dorian-vamp","Soul / R&B / Neo-soul","Dorian vamp i7–IV7",1,"dorian",[E(0,J,"i7"),E(5,j,"IV7")]),H("soul-4-3-2-1","Soul / R&B / Neo-soul","IVmaj7–iii7–ii7–Imaj7",2,"major",[E(5,xe,"IVmaj7"),E(4,J,"iii7"),E(2,J,"ii7"),E(0,xe,"Imaj7")]),H("soul-two-of-us","Soul / R&B / Neo-soul","Just the Two of Us",3,"major",[E(5,xe,"IVmaj7"),E(4,j,"III7"),E(9,J,"vi7"),E(7,J,"v7",.5),E(0,j,"I7",.5)]),H("soul-2-5-1-ext","Soul / R&B / Neo-soul","ii9–V13sus–Imaj9",3,"major",[E(2,"minor-9","ii9"),E(7,"9sus4","V13sus",1,{intervals:[0,5,7,10,14,21],symbol:"13sus4"}),E(0,"major-9","Imaj9",2)]),H("gospel-1-4-1-dim","Gospel","1–4–1 passing dim",2,"major",[E(0,B,"I"),E(5,B,"IV",.5),E(6,Cr,"♯iv°7",.5)]),H("gospel-7-3-6","Gospel","7–3–6",3,"major",[E(11,Lr,"viiø7"),E(4,j,"III7"),E(9,J,"vi7",2)]),H("gospel-1-17-4-dim","Gospel","I–I7–IV–♯iv°–I/V",3,"major",[E(0,B,"I",.5),E(0,j,"I7",.5),E(5,B,"IV",.5),E(6,Cr,"♯iv°7",.5),E(0,B,"I/V",2,{inversion:2})]),H("edm-epic","EDM / House / Trance","i–VI–III–VII · epic",1,"minor",[E(0,we,"i"),E(8,B,"VI"),E(3,B,"III"),E(10,B,"VII")]),H("edm-1-7-6-7","EDM / House / Trance","i–VII–VI–VII",1,"minor",[E(0,we,"i"),E(10,B,"VII"),E(8,B,"VI"),E(10,B,"VII")]),H("house-organ","EDM / House / Trance","House organ i7–iv7",1,"minor",[E(0,J,"i7"),E(5,J,"iv7")]),H("trance-1-6-7-5","EDM / House / Trance","Trance i–VI–VII–v",2,"minor",[E(0,we,"i"),E(8,B,"VI"),E(10,B,"VII"),E(7,we,"v")]),H("cine-minor-plagal","Cinematic / Ambient","Minor plagal iv–i",1,"minor",[E(5,we,"iv"),E(0,we,"i")]),H("cine-hero","Cinematic / Ambient","Hero I–♭VI–♭VII–I",2,"major",[E(0,B,"I"),E(8,B,"♭VI"),E(10,B,"♭VII"),E(0,B,"I")]),H("cine-mediant","Cinematic / Ambient","Mediant I–III",2,"major",[E(0,B,"I"),E(4,B,"III")]),H("cine-lydian","Cinematic / Ambient","Lydian I–II",2,"lydian",[E(0,B,"I"),E(2,B,"II")]),H("latin-andalusian","Latin / Flamenco","Andalusian i–♭VII–♭VI–V",1,"minor",[E(0,we,"i"),E(10,B,"♭VII"),E(8,B,"♭VI"),E(7,B,"V")]),H("latin-montuno","Latin / Flamenco","Montuno i–iv–V7",1,"minor",[E(0,we,"i"),E(5,we,"iv"),E(7,j,"V7",2)]),H("latin-bossa","Latin / Flamenco","Bossa Imaj7–II7–ii7–V7",2,"major",[E(0,xe,"Imaj7",2),E(2,j,"II7",2),E(2,J,"ii7"),E(7,j,"V7")]),H("lofi-2-5-1-6","Lo-fi / Chill","ii9–V9–Imaj9–vi9",2,"major",[E(2,"minor-9","ii9"),E(7,"dominant-9","V9"),E(0,"major-9","Imaj9"),E(9,"minor-9","vi9")]),H("lofi-4-3-6","Lo-fi / Chill","IVmaj7–iii7–vi7",2,"major",[E(5,xe,"IVmaj7"),E(4,J,"iii7"),E(9,J,"vi7",2)]),H("modal-dorian","Modal","Dorian i–IV",1,"dorian",[E(0,we,"i"),E(5,B,"IV")]),H("modal-mixolydian","Modal","Mixolydian I–♭VII",1,"mixolydian",[E(0,B,"I"),E(10,B,"♭VII")]),H("modal-phrygian","Modal","Phrygian i–♭II",1,"phrygian",[E(0,we,"i"),E(1,B,"♭II")])];Kd.map(e=>e.id);const h0=e=>Kd.find(t=>t.id===e)??null;function Nr(e,t,n,a=0){const r=h0(e);if(!r)return null;const i=(n+1)*12+t;return r.chords.map((s,l)=>{const d=Gi(s.chord),u=s.intervals??d.intervals,c=(t+s.degree)%12;return{index:l,root:i+s.degree,rootPc:c,chord:d.id,intervals:u,numeral:s.numeral,name:`${Vy[c]}${s.symbol??d.symbol}`,bars:a>0?a:s.bars,...s.inversion!==void 0?{inversion:s.inversion}:{}}})}const m0=e=>e.reduce((t,n)=>t+n.bars,0),f0=(e,t)=>e.slice(0,t).reduce((n,a)=>n+a.bars,0);function al(e,t){const n=m0(e),a=(t%n+n)%n;let r=0;for(let i=0;i<e.length;i++){if(a<r+e[i].bars-1e-9)return{chord:e[i],index:i,position:a,total:n};r+=e[i].bars}return{chord:e[e.length-1],index:e.length-1,position:a,total:n}}const g0=16,b0=()=>Array.from({length:g0},()=>null),y0=["off","single","chord","random"],w0=e=>y0.includes(e),v0={mode:"single",note:0,octave:3,octaveRange:2,chord:"minor-7",inversion:0,interval:4,gate:75,arp:"off",arpOctaves:1,arpSpread:"compact",arpHits:5,arpSteps:8,arpRotate:0,chordStyle:"block",voiceLeading:"fixed",strum:0,tension:0,chordProgression:"off",progressionBars:0,favoriteChords:[],chordPads:b0(),chordPadMode:"pad"};function rl(e,t,n=Math.random){if(e.mode==="off")return[];const a=Math.min(127,Math.max(0,(e.octave+1)*12+e.note));if(e.mode==="single")return[a];if(e.mode==="random"){const d=Math.min(127,(e.octave+1)*12),u=Math.min(127,d+e.octaveRange*12-1);return[d+Math.floor(n()*(u-d+1))]}const r=Uy(a,e.chord,e.inversion,e.arpSpread);if(e.arp==="off")return r;const i=Gy(r,e.arpOctaves),s=Wy(i,e.arp),l=Zy(e.arp,s.length,t,Hd(e),n);return l===null?[]:[s[l]]}function il(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function x0(e,t,{octave:n}={}){if(t==="chord")return e.map(i=>({...i,role:"chord"}));const a=new Map;for(const i of e)a.set(i.hit,[...a.get(i.hit)??[],i]);const r=[];for(const i of a.values()){const s=i[0],l=Math.max(...i.map(d=>d.velocity));if(t==="top"){const d=i.reduce((u,c)=>c.note>u.note?c:u);r.push({...d,role:"top",offsetSec:0,velocity:l})}else{const d=n===void 0?s.root:Math.min(127,Math.max(0,(n+1)*12+(s.root%12+12)%12));r.push({...s,note:d,role:"root",offsetSec:0,velocity:l})}}return r}function k0(e,t){return t.direction&&t.strumMs>0&&e.length>1?s0(e,t.strumMs,t.direction):e.map(n=>({midi:n,offset:0}))}function $0(e,t=0){return k0(e.notes,e).map(({midi:n,offset:a})=>({note:n,velocity:e.velocity,startBeat:e.beat,lengthBeats:e.spanBeats*e.gate,role:e.role,offsetSec:a,spanBeats:e.spanBeats,gate:e.gate,hit:t,root:e.root}))}const ol=(e,t,n)=>Math.min(n,Math.max(t,e)),E0=1e-9;function S0(e,t){return t>0?Math.ceil(e/t-E0)*t:e}const sl=(e,t)=>({from:e,origin:t,jump:null,last:null,lastKey:"",pushedTo:-1,bar:{bar:NaN,settings:null,hits:[]}});class Ki{step=0;grid={origin:0,index:0,interval:16};comp=sl(0,0);read;random;chordRandom;bpb;serial=0;constructor(t,n={}){this.read=typeof t=="function"?t:()=>t,this.random=n.random??Math.random,this.chordRandom=n.chordRandom??Math.random,this.bpb=n.beatsPerBar??(()=>4)}get settings(){return this.read()}beatsPerBar(){return Math.max(1,this.bpb())}beatInBar(t){const n=this.beatsPerBar();return(t%n+n)%n}start(t,{join:n=!1}={}){const a=this.settings.interval,r=4/a,i=n?S0(t,r):t;this.grid={origin:i,index:0,interval:a},this.step=Math.max(0,Math.round(i/r));const s=this.beatsPerBar();return this.comp=sl(i,n?0:Math.floor(t/s+1e-9)*s),i}clone(t={}){const n=new Ki(t.settings??this.read,{random:t.random??this.random,chordRandom:t.chordRandom??this.chordRandom,beatsPerBar:t.beatsPerBar??this.bpb});n.step=this.step,n.grid={...this.grid},n.serial=this.serial;const a=this.comp;return n.comp={...a,jump:a.jump?{...a.jump}:null,last:a.last?[...a.last]:null,bar:{...a.bar}},n}resetGrid(){this.grid={origin:0,index:0,interval:this.settings.interval}}nextBeat(){return this.grid.origin+this.grid.index*4/this.grid.interval}stepBeats(){return 4/this.grid.interval}followInterval(){const t=this.settings.interval;t!==this.grid.interval&&(this.grid={origin:this.nextBeat(),index:0,interval:t})}skipTo(t){const n=Math.max(0,Math.ceil((t-this.nextBeat())/this.stepBeats()-1e-9));return this.grid.index+=n,this.step+=n,n}advance(){this.grid.index++}advanceStep(){this.step++}applyJump(t){const n=this.comp.jump;n&&t>=n.at-1e-9&&(this.comp.origin=n.origin,this.comp.jump=null)}plainChord(){const t=this.settings;return t.chordStyle==="block"&&t.chordProgression==="off"&&!(t.strum>0)&&!(t.tension>0)}barStyleActive(){const t=this.settings;return t.mode==="chord"&&t.arp==="off"&&!this.plainChord()&&el(t.chordStyle)==="bar"}stepHit(t){const n=this.settings,a=this.stepBeats();if(n.mode==="chord"&&!this.plainChord()){if(n.arp!=="off"){const c=this.chordAt(t),p={...n,chord:c.chord,note:c.rootPc,octave:Math.floor(c.root/12)-1,...c.inversion!==void 0?{inversion:c.inversion}:{}},h=rl(p,this.step,this.random);return this.step++,h.length?this.hit(t,a,h,1,null,c,!1,"arp"):null}if(el(n.chordStyle)==="bar")return this.step++,null;const l=this.chordAt(t),d=this.voicingFor(l),u=i0(n.chordStyle,d,this.step,this.beatInBar(t),this.chordRandom);return this.step++,!u||!u.notes.length?null:this.hit(t,a,u.notes,u.velocity,tl(this.beatInBar(t)),l,!0,"chord")}if(!w0(n.mode))return this.step++,null;const r=rl(n,this.step,this.random);if(this.step++,!r.length)return null;const i=n.mode==="chord",s=i?Math.min(127,Math.max(0,(n.octave+1)*12+n.note)):r[0];return{beat:t,spanBeats:a,gate:ol(n.gate/100,.1,1),velocity:1,notes:r,kind:"plain",direction:null,strumMs:0,chord:i?this.plainChordAt():null,root:s,role:i?n.arp==="off"?"chord":"arp":"note"}}hit(t,n,a,r,i,s,l,d){const u=this.settings,c=[...a];if(l&&u.tension>0&&this.chordRandom()*100<u.tension){const h=c0(c,s.rootPc,s.intervals,this.chordRandom);h!==null&&c.push(h)}const p=u.chordStyle==="strum"&&i?u.strum>0?u.strum:e0:u.strum;return{beat:t,spanBeats:n,gate:ol(u.gate/100,.1,1),velocity:r,notes:c,kind:"comp",direction:i,strumMs:p,chord:s,root:s.root,role:d}}progressionOrigin(t){const n=this.comp.jump;return n&&t>=n.at-1e-9?n.origin:this.comp.origin}plainChordAt(){const t=this.settings,n=Gi(t.chord);return{index:0,root:(t.octave+1)*12+t.note,rootPc:t.note,chord:n.id,intervals:n.intervals,name:"",numeral:"",bars:1}}chordAt(t){const n=this.settings,a=Nr(n.chordProgression,n.note,n.octave,n.progressionBars);return a?.length?al(a,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar()).chord:this.plainChordAt()}voicingFor(t){const n=this.settings,a=t.inversion??Math.min(Math.max(0,n.inversion|0),t.intervals.length-1),r=`${t.root}|${t.intervals.join(",")}|${a}|${n.voiceLeading}|${n.arpSpread}`;if(this.comp.last&&r===this.comp.lastKey)return this.comp.last;const i=n.voiceLeading==="smooth"?u0(this.comp.last,t.root,t.intervals,(n.octave+1)*12+n.note,a,n.arpSpread,t.inversion):hi(t.root,t.intervals,a,n.arpSpread);return this.comp.last=i,this.comp.lastKey=r,i}compBar(t){const n=this.comp.bar,a=this.settings;if(n.bar===t&&n.settings===a)return n.hits;const r=a,i=this.beatsPerBar(),s=r.chordStyle,l=this.chordAt(t*i),d=this.voicingFor(l);let u=d;if(s==="push"){const p=this.chordAt((t+1)*i);if(`${p.root}|${p.intervals.join(",")}`!=`${l.root}|${l.intervals.join(",")}`){const h={last:this.comp.last,key:this.comp.lastKey};u=this.voicingFor(p),this.comp.last=h.last,this.comp.lastKey=h.key}}let c=o0(s,d,l.rootPc,l.intervals,u).filter(p=>p.step/4<i-1e-9);return s==="push"&&this.comp.pushedTo===t&&(c=c.filter(p=>p.step!==0)),this.comp.bar={bar:t,settings:a,hits:c},c}barFrom(){return this.comp.from}catchUpBars(t){this.comp.from=t}syncBars(){this.comp.from=this.nextBeat()}barHits(t,n=()=>!1){const a=this.settings,r=this.beatsPerBar(),i=[];for(let s=0;s<128;s++){const l=Math.floor(this.comp.from/r+1e-9),u=this.compBar(l).find(f=>l*r+f.step/4>=this.comp.from-1e-9);if(!u){this.comp.from=(l+1)*r;continue}const c=l*r+u.step/4;if(!t(c))break;if(this.comp.from=c+1e-6,n())continue;const p=u.next&&a.chordStyle==="push"?u.len+6:u.len;u.next&&(this.comp.pushedTo=l+1);const h=this.chordAt(u.next?(l+1)*r:c);i.push(this.hit(c,p/4,u.notes,u.velocity,u.strum??tl(this.beatInBar(c)),h,!0,"chord"))}return i}chordPosition(t){const n=this.settings;if(n.mode!=="chord")return null;const a=Nr(n.chordProgression,n.note,n.octave,n.progressionBars);if(!a?.length)return null;const r=al(a,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar());return{index:r.index,bar:Math.floor(r.position+1e-9)+1,bars:r.total}}jumpToChord(t,n){const a=this.settings,r=Nr(a.chordProgression,a.note,a.octave,a.progressionBars);if(!r?.length||t<0||t>=r.length)return!1;const i=this.beatsPerBar(),s=Math.max(n,this.nextBeat(),this.comp.from),l=Math.ceil(s/i-1e-9)*i;return this.comp.jump={at:l,origin:l-f0(r,t)*i},!0}window(t,{muted:n=()=>!1}={}){const a=[];this.followInterval(),this.applyJump(this.nextBeat());for(let i=0;i<4096;i++){const s=this.nextBeat();if(!(s<t))break;if(n())this.advanceStep();else{const l=this.stepHit(s);l&&a.push(l)}this.advance()}this.barStyleActive()?a.push(...this.barHits(i=>i<t,n)):this.syncBars();const r=[];for(const i of a)r.push(...$0(i,++this.serial));return r.sort((i,s)=>i.startBeat-s.startBeat)}}const Yi=1;function A0(e,t,n,a,r){return`${e}|${t}|${n}|${a}|${r}`}function M0(e,t,n,a,r={}){const i=new Map;return x0(n,a,r).map(s=>{const l=i.get(s.hit)??0;return i.set(s.hit,l+1),{...s,id:A0(e,t,s.role,s.hit,l),source:e}})}const T0=(e,t)=>({v:Yi,kind:"notes",source:e,events:t}),ca=(e,t,n)=>({v:Yi,kind:"off",source:e,reason:t,...n===void 0?{}:{atBeat:n}}),L0=e=>({v:Yi,kind:"routes",routes:e}),ot=1e-9;function C0(e={}){const t=new Map,n=new Map,a=new Set,r={sent:{notes:0,off:0,routes:0},events:0,errors:0},i=()=>e.nowBeat?.()??null,s=new Set,l=()=>{for(const m of[...s])try{m()}catch{}},d=(m,b)=>{const v=n.get(m);if(v){r.sent[b.kind]++,b.kind==="notes"&&(r.events+=b.events.length);try{v(b)}catch{r.errors++}}},u=m=>{const b=[];for(const v of t.values()){const y=v.targets.get(m);y?.on&&b.push({source:v.handle.id,name:v.handle.name,role:y.role,...y.octave===void 0?{}:{octave:y.octave},...y.transpose?{transpose:y.transpose}:{}})}return b},c=m=>d(m,L0(u(m))),p=(m,b,v)=>{const y=m.targets.get(b);if(!y?.on||!v.length)return;const T=F0(M0(m.handle.id,m.run,v,y.role,{...y.octave===void 0?{}:{octave:y.octave}}),y.transpose??0);T.length&&d(b,T0(m.handle.id,T))},h=(m,b)=>{const v=[...m.current,...m.kept.filter(T=>T.startBeat<b-ot)];if(!v.length)return[];let y=v[0];for(const T of v)T.startBeat>y.startBeat+ot&&(y=T);return v.filter(T=>T.hit===y.hit&&Math.abs(T.startBeat-y.startBeat)<=ot)},f=(m,b)=>{const v=i();if(v===null)return m.kept;const y=m.kept.filter(T=>T.startBeat>=v-ot);return a.has(b)?[...h(m,v),...y]:y},g=m=>{const b=i();b!==null&&m.kept.length&&m.kept[0].startBeat<b-ot&&(m.current=h(m,b),m.kept=m.kept.filter(v=>v.startBeat>=b-ot))};function w(m,b){const v=t.get(m);v&&v.handle.remove();const y={handle:void 0,run:1,kept:[],current:[],targets:new Map,status:null,takeBack:null},T=()=>t.get(m)===y,A={id:m,name:b,send(x){if(!T()||!x.length)return;g(y);const k=x.map(M=>({...M}));y.kept.push(...k);for(const M of y.targets.keys())p(y,M,k)},restart(){T()&&(y.run++,y.kept=[],y.current=[])},off(x,k){if(T()){y.kept=k===void 0?[]:y.kept.filter(M=>M.startBeat<k-ot),(k===void 0||y.current.some(M=>M.startBeat>=k-ot))&&(y.current=[]);for(const[M,S]of y.targets)S.on&&d(M,ca(m,x??"stop",k))}},setTarget(x,k){if(!T()||typeof x!="string"||!x)return;const M=y.targets.get(x),S=N0(k.transpose),C={role:k.role,on:k.on===!0,...k.octave===void 0?{}:{octave:k.octave},...S?{transpose:S}:{}};y.targets.set(x,C);const F=M&&(M.role!==C.role||M.octave!==C.octave||(M.transpose??0)!==(C.transpose??0))&&M.on;M?.on&&(!C.on||F)&&d(x,ca(m,"off")),(!M||M.on!==C.on||F)&&c(x),C.on&&(!M?.on||F)&&p(y,x,f(y,x)),(!M||M.on!==C.on)&&l()},removeTarget(x){const k=y.targets.get(x);!T()||!k||(y.targets.delete(x),k.on&&(d(x,ca(m,"removed")),c(x)))},targets:()=>[...y.targets].map(([x,k])=>({target:x,...k})),remove(){if(!T())return;const x=[...y.targets].filter(([,k])=>k.on).map(([k])=>k);for(const k of x)d(k,ca(m,"removed"));t.delete(m);for(const k of x)c(k);l()},status(x){if(!T())return;const k=x&&typeof x.now=="string"&&typeof x.next=="string"?{now:x.now.slice(0,32),next:x.next.slice(0,32)}:null;JSON.stringify(k)!==JSON.stringify(y.status)&&(y.status=k,l())},onTakeBack(x){T()&&(y.takeBack=typeof x=="function"?x:null)}};return y.handle=A,t.set(m,y),A}return{source:w,sources:()=>[...t.values()].map(m=>m.handle),host:m=>({notesIn(b,v){if(typeof b!="function")return()=>{};const y=v?.takes==="pitch",T=!n.has(m)||a.has(m)!==y;n.set(m,b),y?a.add(m):a.delete(m),T&&l(),c(m);for(const A of t.values())A.targets.get(m)?.on&&p(A,m,f(A,m));return()=>{n.get(m)===b&&(n.delete(m),a.delete(m),l())}},notesSource:b=>w(m,String(b).slice(0,64)),notesTakeBack(b){const v=t.get(b);if(!v?.takeBack||!v.targets.has(m))return null;try{const y=v.takeBack(m);return y==null?null:structuredClone(y)}catch{return null}}}),routesFor:u,listening:m=>n.has(m),takesPitch:m=>n.has(m)&&a.has(m),drop(m){n.delete(m),a.delete(m);for(const b of[...t.values()])b.handle.id===m?b.handle.remove():b.targets.delete(m);l()},statuses:()=>[...t.values()].filter(m=>m.status!==null).map(m=>({source:m.handle.id,name:m.handle.name,status:{...m.status}})),onChange(m){return s.add(m),()=>s.delete(m)},stats:()=>({sent:{...r.sent},events:r.events,errors:r.errors})}}function N0(e){return typeof e=="number"&&Number.isFinite(e)?Math.max(-48,Math.min(48,Math.round(e))):0}function F0(e,t){if(!t)return e;const n=a=>Math.max(0,Math.min(127,a+t));return e.map(a=>({...a,note:n(a.note),root:n(a.root)}))}const I0=.5,P0=20;function z0(e,t,n={}){const a=n.aheadSec??I0,r=n.now??Ne;let i={...v0,...n.settings};const s=n.seed??1,l=()=>new Ki(()=>i,{random:il(s),chordRandom:il(s+1),beatsPerBar:()=>Math.max(1,t.transport.meter?.beatsPerBar??4)});let d=null,u=0,c=!1;const p=()=>{const m=t.transport;if(!d||!m.running)return;const b=d.window(m.beatAt(r()+a));b.length&&(u+=b.length,e.send(b))},h=(m,b)=>{d=l(),e.restart(),d.start(m,{join:b}),p()},f=t.onChange(m=>{if(!c){if(m.kind==="start")h(m.beat,!1);else if(m.kind==="stop")d=null,e.off("stop");else if(m.kind==="snapshot"){const b=t.transport;!b.running&&d?(d=null,e.off("stop")):b.running&&!d&&h(b.beatAt(Math.max(b.startTime??r(),r())),!0)}}}),g=(n.ticker??(m=>pp(m,{intervalMs:P0})))(p);g.start();const w=t.transport;return w.running&&h(w.beatAt(Math.max(w.startTime??r(),r())),!0),{source:e,set(m){i={...i,...m}},settings:()=>i,sent:()=>u,remove(){c||(c=!0,f(),g.dispose(),e.remove())}}}const Xi="studio";function D0(){let e=null;const t=new Set,n=new Set,a=new Set,r=new Map,i=u=>{try{return r.get(u)?.()===!0}catch{return!1}},s=u=>{for(const c of[...u])try{c()}catch{}},l=u=>{if(u!==e){e=u;for(const c of n)c()}},d=(u,c)=>(u.add(c),()=>{u.delete(c)});return{owner:()=>e,claim(u){e===null&&l(u)},claimAll(){l(Xi),s(t)},clear:()=>l(null),onAll:u=>d(t,u),member(u,c){return r.set(u,c),()=>{r.get(u)===c&&r.delete(u)}},out(u){for(const c of r.keys())if(c!==u&&i(c))return;s(a)},drop:u=>{r.delete(u)},onLastOut:u=>d(a,u),playing:()=>[...r.keys()].filter(i),onChange:u=>d(n,u)}}const ll="netcomposer.studio.plugins.frozen.v1",R0=2e3;function O0(e,t){const n=[],a=new Set;for(const r of t)r.plugin?.status!=="failed"||r.plugin.error!==wa[6]||(a.add(r.id),e.has(r.id)||n.push(r));for(const r of[...e])a.has(r)||e.delete(r);for(const r of a)e.add(r);return n}function B0(e){const t=new Map;for(const n of e)for(const a of n)a.plugin?.status==="ready"&&!t.has(a.plugin.id)&&t.set(a.plugin.id,a.plugin.name);return[...t].map(([n,a])=>({id:n,name:a}))}function j0(e){let t=[];const n=()=>{if(!e)return t;try{const r=JSON.parse(e.getItem(ll)??"[]");return Array.isArray(r)?r.filter(i=>typeof i=="string"):[]}catch{return[]}},a=r=>{t=r;try{e?.setItem(ll,JSON.stringify(r))}catch{}};return{has:r=>n().includes(r),list:n,add(r){a([...new Set([...n(),...r])])},clear(r){const i=n();i.includes(r)&&a(i.filter(s=>s!==r))}}}function _0(e){let t=!1;const n=(e.watch??Zp)(e.ctx,{stallMs:e.stallMs??R0,onStall:()=>{if(t)return;const a=e.running();a.length&&(t=!0,n.stop(),e.onFrozen(a))}});return{stop:()=>n.stop()}}const Yd="netcomposer.studio.picker.v1",cl="http://127.0.0.1:5177",q0=1,Kt=16,dl=64*1024*1024,ul=[1e3,2e3,5e3,1e4],V0=new Set(["127.0.0.1","localhost","[::1]"]);function Ji(e){if(typeof e!="string"||!e||e.length>64)return null;let t;try{t=new URL(e)}catch{return null}return t.protocol!=="http:"||!V0.has(t.hostname)||!t.port||t.username||t.password||e.replace(/\/$/,"")!==t.origin?null:t.origin}function Xd(e){try{const t=JSON.parse(e?.getItem(Yd)??"null"),n=t&&typeof t=="object"?t:{};return{on:n.on===!0,address:Ji(n.address)??cl}}catch{return{on:!1,address:cl}}}function mi(e,t){try{e?.setItem(Yd,JSON.stringify(t))}catch{}}function H0(e){let t=[];try{const n=e.pads();Array.isArray(n)&&(t=n)}catch{}return Array.from({length:Kt},(n,a)=>{const r=t[a]&&typeof t[a]=="object"?t[a]:{};return{pad:a+1,name:typeof r.name=="string"?r.name.slice(0,40):"",filled:r.filled===!0}})}const Fr=e=>({ok:!1,placed:[],left:[],message:e}),Ir=e=>Array.isArray(e)?e.filter(t=>Number.isInteger(t)&&t>=1&&t<=Kt).slice(0,16):[];function U0(e){const t=e&&typeof e=="object"?e:{};return{ok:t.ok===!0,placed:(Array.isArray(t.placed)?t.placed:[]).flatMap(n=>{const a=n&&typeof n=="object"?n:{},[r]=Ir([a.from]),[i]=Ir([a.to]);return r&&i?[{from:r,to:i}]:[]}).slice(0,Kt),left:Ir(t.left),message:typeof t.message=="string"?t.message.slice(0,400):""}}function G0(e){const t=e&&typeof e=="object"?e:{};return t.type!=="kit"||typeof t.id!="string"||!/^[\w-]{1,40}$/.test(t.id)||typeof t.target!="string"||!t.target||t.target.length>64?null:{id:t.id,target:t.target,mode:t.mode==="fill"?"fill":"replace"}}function W0(e){const t=new Map,n=new Map,a=new Set,r=new Map,i=e.now??(()=>Date.now()),s=e.setTimeout??((S,C)=>setTimeout(S,C)),l=e.clearTimeout??(S=>clearTimeout(S)),d=S=>e.live?.(S)??!0;let u="off",c="",p=0,h=null,f=null,g="";const w=S=>{S!==u&&(u=S,e.onStatus?.(S))},m=()=>[...t.entries()].filter(([S])=>d(S)).map(([S,C])=>{const F=e.brandOf?.(S);return{id:S,name:(e.nameOf?.(S)??S).slice(0,40),...F?{brand:F.slice(0,40)}:{},shown:e.shown?.()===S,seen:n.get(S)??0,pads:H0(C)}}),b=S=>{const C=m();return g=JSON.stringify(C),JSON.stringify({v:q0,studio:e.studio,label:(e.label?.()??"Studio").slice(0,60),targets:C,results:[...r.entries()].map(([F,q])=>({id:F,...q})),wait:S})},v=(S,C)=>e.fetch(`${c}/api/studio/poll`,{method:"POST",headers:{"content-type":"application/json"},body:b(S),cache:"no-store",...C?{signal:C}:{},targetAddressSpace:"loopback"}),y=async(S,C)=>{if(!S.ok)throw new Error(`the picker said ${S.status}`);const F=await S.json();if(C!==p)return;if(w("on"),Array.isArray(F.ack))for(const U of F.ack)typeof U=="string"&&r.delete(U);const q=Array.isArray(F.commands)?F.commands:[];for(const U of q.slice(0,4)){const X=G0(U);X&&k(X,C)}},T=async S=>{let C=0,F=!1;for(;S===p;){const q=new AbortController;h=q;try{await y(await v(F,q.signal),S),C=0,F=!0}catch{if(S!==p)return;F=!1,w("away");const U=ul[Math.min(C++,ul.length-1)];await new Promise(X=>s(X,U))}}},A=()=>{!c||f!==null||(f=s(()=>{f=null;const S=p;!c||u!=="on"||!r.size&&JSON.stringify(m())===g||v(!1).then(C=>y(C,S)).catch(()=>{})},150))},x=async S=>{const C=await e.fetch(S,{cache:"no-store",targetAddressSpace:"loopback"});if(!C.ok){const F=await C.json().catch(()=>({}));throw new Error(typeof F.error=="string"?F.error.slice(0,120):`the picker said ${C.status}`)}return C},k=async(S,C)=>{if(r.has(S.id))return;let F;const q=t.get(S.target);if(!q||!d(S.target))F=Fr("That NYX isn't in the Studio any more.");else if(a.has(S.target))F=Fr("NYX is still loading the last kit.");else{a.add(S.target);try{const U=await(await x(`${c}/api/kit/manifest`)).json(),X=Array.isArray(U.sounds)?U.sounds:[];if(!X.length)throw new Error("the picker's pads are empty");if(X.length>Kt)throw new Error(`more than ${Kt} sounds`);const fe={};for(const ge of X){const re=ge&&typeof ge=="object"?ge.pad:null;if(typeof re!="number"||!Number.isInteger(re)||re<1||re>Kt||fe[re])throw new Error("a sound has no pad of its own");const ie=await x(`${c}/api/kit/audio?pad=${re}`);if(Number(ie.headers.get("content-length")??0)>dl)throw new Error(`pad ${re}'s sound is too big`);const G=await ie.arrayBuffer();if(G.byteLength>dl)throw new Error(`pad ${re}'s sound is too big`);fe[String(re)]=G}if(C!==p)return;e.reveal?.(S.target),F=U0(await q.receive(U,S.mode,fe))}catch(U){F=Fr(`Not loaded: ${U.message||"it went wrong"}.`)}finally{a.delete(S.target)}}C===p&&(r.set(S.id,F),A())},M=()=>{p++,h?.abort(),h=null,f!==null&&l(f),f=null,c="",r.clear(),w("off")};return{host(S){return{pickerTarget(C){return t.set(S,C),A(),{changed:A,remove(){t.get(S)===C&&t.delete(S),A()}}}}},start(S){const C=Ji(S);C&&(M(),c=C,w("connecting"),T(++p))},stop:M,seen(S){n.set(S,i()),t.has(S)&&A()},changed:A,forget(S){t.delete(S),n.delete(S),A()},targets:m,get status(){return u}}}const K0="NetComposer Studio",Je=[40,240],Y0="nc-sync";function X0(e,t=globalThis.navigator?.locks){const n=`/studio/${e}`;return{channel:`${Y0}${n}`,locks:t?{request:(a,r,i)=>t.request(`${a}${n}`,r,i)}:null}}function J0(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}const Q0=.2,pl=.5;function Z0(e,t,n){const a=new Qu({bpm:120,minBpm:Je[0],maxBpm:Je[1],timebase:"shared"}),r=new hp({app:K0,version:"0.1.0",clock:a,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:Je},startLeadSeconds:Q0,...n?{startGate:()=>n(),gatedStartLeadSeconds:pl}:{},...t?{channel:t.channel,locks:t.locks}:{},audio:()=>{const d=e();return d==="running"?"running":d==="closed"?"none":"needs-gesture"}});let i=!1,s=0,l=!1;return{clock:a,peer:r,async start(){i||(i=!0,await r.start())},play(){const d=n?.()??null;if(!d){l=!1,a.play({at:Ne()});return}const u=++s,c=Ne();l=!0;const p=()=>{u!==s||!l||(l=!1,r.isLeader&&!a.transport.running?(a.commitStart(Math.max(c,Ne())+pl,0),r.publishState()):a.play({at:Ne()}))};d.then(p,p)},stop(){l&&(l=!1,s++,!a.transport.running)||a.stop({at:Ne()})},setTempo:d=>a.setTempo({bpm:ew(d)}),playing:()=>a.transport.isPlayingAt(Ne()),running:()=>l||a.transport.running,bpm:()=>a.transport.bpm,position(){const d=a.transport,u=Ne();return d.isPlayingAt(u)?tw(d.beatAt(u)):null},beatPhase(){const d=a.transport,u=Ne();if(!d.isPlayingAt(u))return null;const c=d.beatAt(u);return c-Math.floor(c)},peers:()=>[...r.peers.values()]}}function ew(e){return Number.isFinite(e)?Math.min(Je[1],Math.max(Je[0],Math.round(e*10)/10)):120}function tw(e){const t=Math.max(0,Math.floor(e));return{bar:Math.floor(t/4)+1,beat:t%4+1}}const fi="netcomposer.scene",Jd=1,Qd="netcomposer.studio.tempo.v1",Zd="netcomposer.studio.scene-name.v1",Ia=120,Qi="Untitled scene",nw=2*1024*1024;function Ya(e){const t=typeof e=="number"?e:Number(e);return Number.isFinite(t)?Math.min(Je[1],Math.max(Je[0],Math.round(t*10)/10)):Ia}function Ft(e){return(typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,60):"")||Qi}function aw(e){return{format:fi,v:Jd,name:Ft(e.name),saved:(e.now??new Date).toISOString(),tempo:{bpm:Ya(e.bpm)},meter:[4,4],instances:e.instances.map(t=>({id:t.id,type:t.type,name:t.name})),mix:e.mix,presets:e.presets??{},media:e.media??[]}}function rw(e,t){if(e.length>nw)return{ok:!1,error:"That file is too large to be a Scene."};let n;try{n=JSON.parse(e)}catch{return{ok:!1,error:"That file isn't a Scene (it isn't JSON)."}}if(!n||typeof n!="object")return{ok:!1,error:"That file isn't a Scene."};const a=n;if(a.format!==fi)return{ok:!1,error:"That file isn't a Scene. Load an instrument's own file from that instrument."};if((typeof a.v=="number"?a.v:0)<1)return{ok:!1,error:"That Scene has no version."};const i=new Set,s=[];for(const u of Array.isArray(a.instances)?a.instances:[]){if(!u||typeof u!="object")continue;const c=u.id;if(typeof c!="string")continue;const p=_i(c);if(!p||!t.includes(p.type)||i.has(c))continue;i.add(c);const h=u.name;s.push({id:c,type:p.type,name:ad(h,"")})}if(!s.length)return{ok:!1,error:"That Scene has no instruments this Studio knows."};const l=a.tempo&&typeof a.tempo=="object"?a.tempo.bpm:void 0,d={};if(a.presets&&typeof a.presets=="object")for(const[u,c]of Object.entries(a.presets))i.has(u)&&(d[u]=c);return{ok:!0,scene:{format:fi,v:Jd,name:Ft(a.name),saved:typeof a.saved=="string"?a.saved:"",tempo:{bpm:Ya(l)},meter:[4,4],instances:s,mix:Md(a.mix??zn()),presets:d,media:Array.isArray(a.media)?a.media:[]}}}function iw(e){return`${Ft(e).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"scene"}.scene.json`}function ow(e){try{const t=e?.getItem(Qd);return t?Ya(Number(t)):Ia}catch{return Ia}}function eu(e,t){try{t?.setItem(Qd,String(Ya(e)))}catch{}}function sw(e){try{return Ft(e?.getItem(Zd))}catch{return Qi}}function tu(e,t){try{t?.setItem(Zd,Ft(e))}catch{}}const lw=300,cw=120*1e3;function dw(e){return Object.prototype.toString.call(e)==="[object Float32Array]"}function uw(e){const t=e&&typeof e=="object"?e:null;if(!t)return{ok:!1,message:"No audio."};const n=typeof t.name=="string"?t.name.trim().slice(0,64):"";if(!n)return{ok:!1,message:"The audio has no name."};const a=t.sampleRate;if(typeof a!="number"||!Number.isFinite(a)||a<8e3||a>192e3)return{ok:!1,message:"The sample rate is out of range (8–192 kHz)."};const r=t.channels;if(!Array.isArray(r)||r.length<1||r.length>2)return{ok:!1,message:"The audio needs one or two channels."};if(!r.every(dw))return{ok:!1,message:"Channels must be 32-bit float arrays."};const i=r[0].length;if(i===0)return{ok:!1,message:"The audio is empty."};if(r.some(d=>d.length!==i))return{ok:!1,message:"The channels differ in length."};if(i>lw*a)return{ok:!1,message:"The audio is longer than five minutes."};const s=typeof t.bars=="number"&&Number.isInteger(t.bars)&&t.bars>=1&&t.bars<=256?t.bars:void 0,l=typeof t.bpm=="number"&&Number.isFinite(t.bpm)&&t.bpm>=20&&t.bpm<=300?t.bpm:void 0;return{ok:!0,audio:{name:n,sampleRate:a,channels:r.map(d=>new Float32Array(d)),...s===void 0?{}:{bars:s},...l===void 0?{}:{bpm:l}}}}function hl(e){try{const t=e.targets();return Array.isArray(t)?t.flatMap(n=>{if(!n||typeof n.id!="string"||!n.id)return[];const a=typeof n.name=="string"&&n.name?n.name.slice(0,64):n.id;return[{id:n.id,name:a,...n.filled?{filled:!0}:{}}]}):[]}catch{return[]}}function pw(e={}){const t=new Map,n=s=>e.live?.(s)??!0,a=s=>e.nameOf?.(s)??s,r=e.answerMs??cw,i=s=>[...t.entries()].filter(([l])=>l!==s&&n(l)).map(([l,d])=>{const u=e.brandOf?.(l);return{instance:l,name:a(l),...u?{brand:u}:{},label:typeof d.label=="string"&&d.label?d.label.slice(0,24):"Target",targets:hl(d)}});return{forget(s){t.delete(s)},host(s){return{audioReceivers:()=>i(s),async sendAudio(l,d,u){const c=t.get(l);if(l===s||!c||!n(l))return{ok:!1,reason:"gone",message:"That instrument isn't in the Studio."};if(typeof u!="string"||!hl(c).some(g=>g.id===u))return{ok:!1,reason:"invalid",message:`No ${u} there.`};const p=uw(d);if(!p.ok)return{ok:!1,reason:"invalid",message:p.message};const h={...p.audio,from:s,fromName:e.brandOf?.(s)??a(s)};let f;try{const g=await Promise.race([Promise.resolve(c.receive(h,u)),new Promise(w=>{f=setTimeout(()=>w({ok:!1,reason:"timeout",message:"No answer."}),r)})]);return!g||typeof g!="object"||typeof g.ok!="boolean"?{ok:!1,reason:"error",message:"The instrument didn't answer."}:g}catch(g){return{ok:!1,reason:"error",message:g instanceof Error?g.message:String(g)}}finally{clearTimeout(f)}},onAudio(l){return t.set(s,l),()=>{t.get(s)===l&&t.delete(s)}},reveal(){n(s)&&e.reveal?.(s)}}}}}const hw="/studio/assets/silence-processor--fvxD5Gm.js";function mw(e,t=Vi){const n=t.find(i=>i.id===e.type),a=(n?.name??e.type).toUpperCase(),r=String(e.n).padStart(2,"0");return{brand:n?.brand??a,rest:e.custom&&e.name?` / ${e.name.toUpperCase()}`:` / ${a} / ${r}`,...n?.identity?{identity:n.identity}:{}}}const gi=Xh,Ke=Yh,Pr={system:"System",light:"Light",dark:"Dark"};function fw(e){try{return Ei(e?.getItem(gi))}catch{return"system"}}function gw(e,t){try{t==="system"?e?.removeItem(gi):e?.setItem(gi,t)}catch{}}const bw=e=>Ke[(Ke.indexOf(e)+1)%Ke.length]??"system";function yw(e){try{return e.contentDocument?.documentElement?e.contentDocument:null}catch{return null}}function nu(e,t){const n=yw(e);n&&Si(t,n)}function ww(e,t){const n=document.createElement("div");n.className="theme",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Theme"),n.dataset.theme="";let a=e;const r=Ke.map(s=>{const l=document.createElement("button");l.type="button",l.className="ghost theme-choice",l.setAttribute("role","radio"),l.dataset.themeChoice=s;const d=document.createElement("span");return d.className="theme-word",d.textContent=Pr[s],l.append(d),l.setAttribute("aria-label",`${Pr[s]} theme`),l.title=s==="system"?"Follow this computer's light or dark setting":`${Pr[s]} theme`,l.addEventListener("click",()=>{const u=n.closest(".nc-page-menu[data-nc-open]")!==null,c=s===a&&!u?bw(s):s;i(c),t(c),r[Ke.indexOf(c)]?.focus({preventScroll:!0})}),l});n.append(...r);function i(s){a=s;for(const l of r){const d=l.dataset.themeChoice===s;l.setAttribute("aria-checked",d?"true":"false"),l.tabIndex=d?0:-1}}return i(e),n.addEventListener("keydown",s=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(s.key))return;s.preventDefault();const l=s.key==="ArrowLeft"||s.key==="ArrowUp"?-1:1,d=(Ke.indexOf(a)+l+Ke.length)%Ke.length,u=Ke[d]??"system";i(u),t(u),r[d]?.focus()}),{el:n,get choice(){return a},set:i}}function vw(e,t){const n=e.addModule.bind(e),a=new Map;return Object.defineProperty(e,"addModule",{value:(i,s)=>{const l=new URL(String(i),t).href;let d=a.get(l);return d||(d=n(i,s),a.set(l,d),d.catch(()=>{a.get(l)===d&&a.delete(l)})),d},configurable:!0}),e}const Z=new AudioContext({latencyHint:"interactive"});vw(Z.audioWorklet,location.href);const Zi=j0(Ae()),xw=new URLSearchParams(location.search).has("plugins"),kw=xw,Nn=Yb({ctx:Z,moduleUrl:En,base:location.href,remote:kw,store:Mb(),frozen:Zi});function ml(e,t){Nn?.restore(e.getChain().flatMap(r=>r.plugin?[r.plugin]:[])),eo.add(e);let n=e.getChain().length;const a=new Set;return e.onChange(r=>{if(r.key==="error"||r.key==="plugin"){et?.render();for(const s of O0(a,e.getChain()))yn({message:R.stuck(s.plugin?.name??s.name,t()),duration:12e3,anchor:document.querySelector("[data-nc-area='fx']")}).el.dataset.pluginStuck=s.plugin?.id??s.id}const i=e.getChain().length;i!==n&&(n=i,queueMicrotask(()=>et?.render()))}),e}function $w(e){return ae.list().find(t=>t.id===e)?.name??e}const eo=new Set,Le=_b(),tn={},Ew=jd,Xa=new Map,ae=new qy(Z,{restore:e=>Le.channels[e],fx:e=>{const t=ur(Z,{moduleUrl:En,bpm:120,state:pd(e,Le)});return tn[e]=t,t},masterFx:()=>{const e=ur(Z,{moduleUrl:En,bpm:120,slots:oi,state:eb(Le,oi)});return e.onChange(Bn),ml(e,()=>"Master")},channelFx:e=>{Ba.delete(e);const t=ur(Z,{moduleUrl:En,bpm:V.bpm(),slots:Ew,state:Le.channelFx[e]??{v:2,chain:[]}}),n=Vl(t,V.clock,{mapper:tt}),a=t.dispose.bind(t);return t.dispose=()=>{n(),a()},t.onChange(Bn),Xa.set(e,t),t.dispose=(r=>()=>{eo.delete(t),r()})(t.dispose),ml(t,()=>$w(e))}});ae.setMaster(Le.master);ae.setReturn("a",Le.returns.a);ae.setReturn("b",Le.returns.b);let au=()=>!1;const tt=new cp(Z,{hold:()=>au()});tt.start();const ru=J0();let iu=()=>{};const ou=xb(Z.sampleRate),Ja=rb(Z,{nodeFor:e=>ae.tapNode(e),latencyFor:e=>ae.tapLatency(e,ou.get()),sources:()=>[{id:"master",name:"Master"},...ae.list().map(e=>({id:e.id,name:e.name}))],ready:new Promise(e=>{iu=e})}),Ie=D0(),Yt=Bg(()=>{try{return globalThis.sessionStorage??null}catch{return null}}),Vn=e=>_.some(t=>t.id===e),su=e=>_.find(t=>t.id===e)?.name??e,lu=e=>{const t=_.find(a=>a.id===e),n=Ee.find(a=>a.id===t?.type)?.brand;return t&&n?t.n===1?n:`${n} ${t.n}`:void 0},Qa=e=>{Ze(e),document.getElementById(`tab-${e}`)?.scrollIntoView({block:"nearest"}),Pe.get(e)?.contentWindow?.focus()},cu=pw({live:Vn,nameOf:su,brandOf:lu,reveal:Qa}),dt=W0({fetch:(e,t)=>fetch(e,t),studio:`studio-${Math.random().toString(36).slice(2,10)}`,label:()=>Mt.value.trim()||"Studio",live:Vn,nameOf:su,brandOf:lu,shown:()=>Ve,reveal:Qa,onStatus:e=>lo(e)});let du=!1;const to=Xg(),uu=Kg({now:()=>Z.currentTime,labelOf:e=>{const t=_.find(a=>a.id===e),n=Ee.find(a=>a.id===t?.type)?.brand??t?.name??e;return t&&t.n>1?`${n} ${t.n}`:n},clearOf:()=>[yu,Ra,vu]}),ft=C0({nowBeat:()=>{const e=V.clock.transport;return e.running?e.beatAt(Ne()):null}}),bi=new Set,Za=()=>{for(const e of[...bi])try{e()}catch{}};ft.onChange(()=>{Za(),Sw()});window.ncStudio=qg(Z,ae,{notes:ft,clock:()=>V.clock,targets:{list:()=>_.map(e=>({instance:e.id,name:e.name,type:e.type,n:e.n,takesNotes:ft.listening(e.id),takesPitch:ft.takesPitch(e.id)})),listen(e){return bi.add(e),()=>bi.delete(e)}},show:e=>{Vn(e)&&Qa(e)},countIn:uu.api,holdFirstPlay:()=>to.hold(),presets:Yt,share:cu,picker:dt,grab:Ja,play:Ie,mapper:ib(tt),resolve:(e,t)=>Cw(e,t),syncScope:ru,fxWorklet:new URL(En,location.href).href});const V=Z0(()=>Z.state,X0(ru),()=>du&&Z.state==="running"&&tt.ready&&to.count===0?null:Pw());au=()=>V.clock.transport.isPlayingAt(Ne());function ke(){try{return globalThis.localStorage??null}catch{return null}}V.setTempo(ow(ke()));const $e=new hb(Z,()=>ae.tapNode("master"));let wn=null;const Me=new gb(Z,()=>ae.tapNode("master"),mb(ke()));let pu=null;function D(e,t={},...n){const a=document.createElement(e);for(const[r,i]of Object.entries(t))i===void 0||i===!1||a.setAttribute(r,i===!0?"":String(i));return a.append(...n),a}const Dn=D("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),nn=D("input",{type:"number",class:"bpm",min:Je[0],max:Je[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),Pa=D("output",{class:"position","aria-label":"Bar and beat"},"—"),ut=D("button",{type:"button",class:"btn rec","aria-pressed":"false","data-state":"idle","data-nc-help":ee["transport:rec"]},"Rec"),Nt=D("button",{type:"button",class:"btn keep","aria-haspopup":"menu","aria-expanded":"false","aria-controls":"keep-menu","aria-keyshortcuts":"K","data-nc-help":ee["transport:keep"]},"Keep"),hu=D("div",{class:"keep-held","data-nc-help":ee["keep:held"]}),no=[...ob.map(e=>({choice:()=>({last:e}),label:`Keep last ${e/60} min`,key:String(e)})),{choice:e=>({since:e}),label:"Keep since Play",key:"since"}],Hn=no.map(e=>D("button",{type:"button",role:"menuitem",class:"keep-item","data-keep":e.key},e.label)),Rn=Ai({checked:Me.keeping,labelledBy:"keep-switch-label",onChange:e=>{fb(ke(),e),Me.setKeeping(e),yt(e?"Keeping: on":"Keeping: off (nothing held)")}}),qe=D("div",{class:"keep-menu",id:"keep-menu",role:"menu","aria-label":"Keep",hidden:!0},hu,...Hn,D("div",{class:"keep-switch","data-nc-help":ee["keep:switch"]},D("span",{id:"keep-switch-label"},"Keeping"),Rn.el)),mu=D("div",{class:"keep-wrap"},Nt,qe),vn=D("a",{class:"take",hidden:!0}),At=D("button",{type:"button",class:"notes-chip",hidden:!0});At.addEventListener("click",()=>{const e=At.dataset.source;e&&Vn(e)&&Qa(e)});function Sw(){const e=ft.statuses().filter(i=>Vn(i.source));At.hidden=e.length===0;const t=e[0];if(!t)return;At.dataset.source=t.source;const{now:n,next:a}=t.status,r=`${n}${a&&a!==n?` → ${a}`:""}`;At.replaceChildren(D("span",{class:"notes-chip-dot","aria-hidden":"true"}),D("span",{class:"notes-chip-name"},t.name),D("span",{class:"notes-chip-chord"},r),...e.length>1?[D("span",{class:"notes-chip-count",title:`${e.length} CALLIOPEs playing`},String(e.length))]:[]),At.setAttribute("aria-label",`${t.name} plays ${r}. Show it.`)}const ao=D("span",{class:"status",role:"status"}),Mt=D("input",{type:"text",class:"scene-name",maxlength:60,value:sw(ke()),"aria-label":"Scene name",title:"Scene name (used when you Save)"}),fu=D("button",{type:"button",class:"ghost","data-scene":"save",title:"Save this Scene as a file"},"Save"),gu=D("button",{type:"button",class:"ghost","data-scene":"load",title:"Load a Scene file"},"Load"),bu=D("button",{type:"button",class:"ghost","data-scene":"new",title:"Start a new Scene"},"New"),Fn=D("input",{type:"file",accept:".json,application/json",hidden:!0}),gt=D("button",{type:"button",class:"ghost picker-link","data-picker":"off","aria-pressed":"false"},D("span",{class:"picker-dot","aria-hidden":"true"}),"Picker"),ro=ww(fw(ke()),e=>{gw(ke(),e),Si(e);for(const t of Pe.values())nu(t,e)});Si(ro.choice);const yu=D("h1",{class:"brand","aria-label":"NetComposer Studio"},D("span",{"aria-hidden":"true"},"NetComposer",D("span",{class:"brand-sep"}," / "),"Studio")),yi=D("span",{class:"beat-light","aria-hidden":"true"}),za=D("span",{class:"status-long"}),Da=D("span",{class:"status-short"});ao.append(za,Da);const Ra=D("header",{class:"top"},D("div",{class:"transport"},Dn,D("label",{class:"tempo"},nn,D("span",{class:"tempo-unit"},"BPM")),yi,Pa),D("div",{class:"record-col"},D("div",{class:"record"},ut,mu,vn),At),ao),wu=D("div",{class:"scene-actions"},Mt,fu,gu,bu,gt,ro.el),Aw=bg({panel:wu}),vu=D("div",{class:"scene",role:"group","aria-label":"Scene"},wu,Fn,Aw.button);$e.supported||(ut.disabled=!0,ut.title="This browser can't record audio",Nt.disabled=!0);const on=D("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),xu=D("div",{class:"stage"}),Un=D("label",{class:"tab tab-add",title:"Add an instrument"},D("span",{"aria-hidden":"true"},"+")),Xt=D("select",{class:"tab-add-select","aria-label":"Add an instrument"});Xt.append(D("option",{value:""},"Add an instrument"),...Vi.map(e=>{const t=D("option",{value:e.id},e.available===!1?`${e.name} (soon)`:e.name);return t.disabled=e.available===!1,t}));Xt.addEventListener("change",()=>{const e=Xt.value;Xt.value="",e&&Lu(e)});Un.append(Xt);on.append(Un);hg();const On=D("div",{class:"spine","aria-hidden":"true"}),Pe=new Map;let _=Ig(Fg(Ee),Ee),Ve=_[0]?.id??"";const Mw=new URLSearchParams(location.search).has("measure"),fl=new Map,Tw=2e4;function ku(e){const t=D("button",{type:"button",role:"tab",id:`tab-${e.id}`,"aria-controls":`panel-${e.id}`,class:"tab"},e.name);Nu(t,e),t.addEventListener("click",()=>Ze(e.id)),on.insertBefore(t,Un);const a=(fl.get(e.type)??Promise.resolve()).then(()=>new Promise(r=>{if(!_.some(l=>l.id===e.id))return r();const i=D("iframe",{id:`panel-${e.id}`,role:"tabpanel","aria-labelledby":`tab-${e.id}`,title:e.name,src:Lg(e,Mw),allow:"autoplay; clipboard-read; clipboard-write; microphone"});Pe.set(e.id,i);const s=window.setTimeout(r,Tw);i.addEventListener("load",()=>Lw(i)),i.addEventListener("load",()=>{window.clearTimeout(s),r()},{once:!0}),xu.append(i),Ze(Ve)}));return fl.set(e.type,a),a}const $u=window.matchMedia(Jl);function Eu(e){try{e.contentDocument?.documentElement.toggleAttribute("data-nc-landscape",$u.matches)}catch{}}$u.addEventListener("change",()=>{for(const e of Pe.values())Eu(e)});function Lw(e){let t=null;try{t=e.contentDocument}catch{return}if(!t?.documentElement)return;t.documentElement.dataset.ncHosted="",nu(e,ro.choice),Eu(e);const n=e.id.replace(/^panel-/,""),a=()=>{const i=t?.querySelector(".nc-page"),s=i?i.getBoundingClientRect().height:t?.documentElement.scrollHeight??0;s>0&&(e.style.height=`${Math.ceil(s)}px`);const l=t?.querySelector(".nc-page-hd, .nc-title-band");l&&(Au.set(n,Math.round(l.getBoundingClientRect().bottom)),n===Ve&&Mu())};a();const r=t.querySelector(".nc-page")??t.body;r&&new ResizeObserver(()=>{a(),er()}).observe(r),io.add(e),Su(e)}const io=new Set;function Su(e){let t;try{t=e.contentDocument?.documentElement}catch{return}if(!t||!e.isConnected){io.delete(e);return}const n=e.getBoundingClientRect();if(n.height<=0)return;const a=getComputedStyle(Ra).position==="sticky"?Ra.getBoundingClientRect().bottom:0,r=Math.min(n.height,Math.max(0,a-n.top)),i=Math.max(r,Math.min(n.height,window.innerHeight-n.top));t.style.setProperty("--nc-host-top",`${Math.round(r)}px`),t.style.setProperty("--nc-host-height",`${Math.round(i-r)}px`),t.style.setProperty("--nc-host-bottom",`${Math.round(n.height-i)}px`)}let zr=!1;function er(){zr||(zr=!0,requestAnimationFrame(()=>{zr=!1;for(const e of io)Su(e)}))}window.addEventListener("scroll",er,{passive:!0});window.addEventListener("resize",er);const Au=new Map;function Mu(){const e=Au.get(Ve);e===void 0?On.style.removeProperty("--spine-top"):On.style.setProperty("--spine-top",`${e}px`)}function Tu(e){if(!e){On.replaceChildren();return}const t=mw(e),n=D("span",{class:"spine-brand"},t.brand);t.identity&&(n.style.color=`var(--nc-ui-${t.identity})`),On.replaceChildren(D("span",{class:"spine-text"},n,D("span",{class:"spine-rest"},t.rest)))}function Ze(e){Ve=e,dt.seen(e),Tu(_.find(t=>t.id===e)),Mu(),er();for(const t of _){const n=t.id===e;Pe.get(t.id)?.classList.toggle("shown",n);const a=document.getElementById(`tab-${t.id}`);a?.setAttribute("aria-selected",String(n)),a?.setAttribute("tabindex",n?"0":"-1")}}const Cw=zg(()=>_.map(e=>({instance:e,window:()=>Pe.get(e.id)?.contentWindow,readyState:()=>{try{return Pe.get(e.id)?.contentDocument?.readyState}catch{return}}})),Ee);function Lu(e){const t=Ee.find(r=>r.id===e);if(!t)return;const n=Cg(_,t),a=_.map(r=>r.type).lastIndexOf(n.type);_=a<0?[..._,n]:[..._.slice(0,a+1),n,..._.slice(a+1)],rn(_),ku(n),Za();for(const r of _){const i=document.getElementById(`tab-${r.id}`);i&&on.insertBefore(i,Un)}Ze(n.id),et?.render()}function Nw(e,t){const n=_.find(l=>l.id===e);if(!n)return;const a=_.filter(l=>l.id!==e),r=l=>Ee.find(d=>d.id===l.type)?.sound===!1,i=a.reduce((l,d,u)=>r(d)?l:u,-1),s=t===null?r(n)?a.length:i+1:a.findIndex(l=>l.id===t);_=[...a.slice(0,s<0?a.length:s),n,...a.slice(s<0?a.length:s)],rn(_);for(const l of _){const d=document.getElementById(`tab-${l.id}`);d&&on.insertBefore(d,Un)}et?.render()}function Fw(e,t){_=Tg(_,e,t,Ee),rn(_);const n=_.find(r=>r.id===e);if(!n)return;const a=document.getElementById(`tab-${e}`);a&&Nu(a,n),Pe.get(e)?.setAttribute("title",n.name),Za(),Ve===e&&Tu(n),ae.rename(e,n.name)}async function Cu(e,t){const n=_.find(d=>d.id===e),a=n?.name??e,r=Ee.find(d=>d.id===n?.type)?.sound===!1;if(!await Xe({title:`Remove ${a}?`,body:r?"Its tab goes, and what it plays stops. Its settings stay in this browser.":`Its channel, strip and mix settings go. ${a}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:t}))return;_=_.filter(d=>d.id!==e),rn(_),cu.forget(e),dt.forget(e),ft.drop(e);const s=Ie.playing().includes(e);Ie.drop(e),s&&Ie.out(e);const l=Pe.get(e);Pe.delete(e),l?.setAttribute("src","about:blank"),l?.remove(),document.getElementById(`tab-${e}`)?.remove(),ae.detach(e),Iw(e),ny(Ae(),e),Ve===e&&Ze(_[0]?.id??""),Za()}function Nu(e,t){const n=Ee.find(s=>s.id===t.type);if(n?.sound!==!1){e.textContent=t.name;return}const a=D("span",{class:"tab-dot","aria-hidden":"true"});n.identity&&(a.style.background=`var(--nc-ui-${n.identity})`);const r=D("span",{class:"tab-remove",role:"button",tabindex:"0","aria-label":`Remove ${t.name}`,title:`Remove ${t.name}`});r.textContent="×";const i=s=>{s.stopPropagation(),Cu(t.id,e)};r.addEventListener("click",i),r.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&i(s)}),e.replaceChildren(a,D("span",{},t.name),r)}const wi=D("div",{class:"mix"});wi.addEventListener("click",e=>{const n=e.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==Ve&&_.some(a=>a.id===n)&&Ze(n)});let et=null,Oa=0;const Ba=new Set;function Iw(e){Ba.add(e),delete Le.channels[e],delete Le.channelFx[e],Xa.delete(e),Bn()}let oo=!1;function Bn(){window.clearTimeout(Oa),!oo&&(Oa=window.setTimeout(()=>{Ld(Fu())},300))}function Fu(){const e={...Le.channels};for(const r of ae.list())e[r.id]=r.strip;for(const r of Ba)delete e[r];const t={};for(const r of["a","b"]){const i=tn[r];i&&(t[r]=i.getState())}const n=ae.masterFx?.getState()??null,a={...Le.channelFx};for(const[r,i]of Xa)a[r]=i.getState();for(const r of Ba)delete a[r];return{v:1,channels:e,master:ae.masterPositionValue,returns:{a:{on:ae.returns.a.on,level:ae.returns.a.level},b:{on:ae.returns.b.on,level:ae.returns.b.level}},insert:{on:n?tb(n):Le.insert.on},fx:t,channelFx:a,masterFx:n??Le.masterFx}}ae.onChange(()=>{et?.render(),Bn()});for(const e of Object.values(tn))e?.onChange(Bn);async function so(){Z.state!=="running"&&await Z.resume()}const gl=1500;async function Pw(){const e=performance.now()+gl;await Promise.race([so(),new Promise(t=>setTimeout(t,gl))]),await tt.whenSettled(Math.max(0,e-performance.now())),await Promise.race([to.idle(),new Promise(t=>setTimeout(t,Math.max(0,e-performance.now())))])}Dn.addEventListener("click",()=>{so(),V.running()&&Ie.owner()===Xi?V.stop():V.running()?Ie.claimAll():(Ie.claimAll(),V.play()),nt()});function Iu(){const e=Number(nn.value);V.setTempo(e),eu(V.bpm(),ke())}Mt.addEventListener("change",()=>{Mt.value=Ft(Mt.value),tu(Mt.value,ke())});function zw(e,t,n){const a=URL.createObjectURL(new Blob([t],{type:n})),r=D("a",{href:a,download:e});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e4)}fu.addEventListener("click",async()=>{const e=Ft(Mt.value),t=_.map(i=>i.id),n=await Yt.collect(t),a=aw({name:e,bpm:V.bpm(),instances:_,mix:Fu(),presets:n});zw(iw(e),`${JSON.stringify(a,null,2)}
`,"application/json");const r=_.filter(i=>!n[i.id]).map(i=>i.name);yt(r.length?`Saved “${e}” (without ${r.join(", ")}: ${r.length===1?"it hasn't":"they haven't"} loaded yet)`:`Saved “${e}”`)});gu.addEventListener("click",()=>Fn.click());Fn.addEventListener("change",async()=>{const e=Fn.files?.[0];if(Fn.value="",!e)return;const t=rw(await e.text(),Ee.filter(r=>r.available!==!1).map(r=>r.id));if(!t.ok){yt(t.error);return}const n=t.scene;await Xe({title:`Load “${n.name}”?`,body:"The music stops and the Studio reloads with this Scene's instruments, their sounds and patterns, the mix and the tempo. Save the current Scene first to keep it.",confirmLabel:"Load"})&&Pu({name:n.name,bpm:n.tempo.bpm,instances:n.instances,mix:n.mix,presets:n.presets})});bu.addEventListener("click",async()=>{await Xe({title:"Start a new Scene?",body:"The music stops and the Studio reloads with one of each instrument, a fresh mix and 120 BPM. Each instrument keeps its own sound and pattern. Save the current Scene first to keep it.",confirmLabel:"New"})&&Pu({name:Qi,bpm:Ia,instances:Pn(Ee),mix:zn()})});function Pu(e){V.running()&&V.stop(),oo=!0,window.clearTimeout(Oa);const t=e.instances.map(({id:n,name:a})=>{const[r,i]=n.split("#"),s=Ee.find(l=>l.id===r);return s?an(s,i?Number(i):1,a):null}).filter(n=>n!==null);rn(t),Ld(e.mix),eu(e.bpm,ke()),tu(e.name,ke()),Yt.stash({...e.presets??{}}),location.reload()}let bl=0;function yt(e){za.textContent=e,Da.textContent=e,window.clearTimeout(bl),bl=window.setTimeout(nt,4e3)}nn.addEventListener("change",Iu);nn.addEventListener("keydown",e=>{e.key==="Enter"&&Iu()});ut.addEventListener("click",()=>{so();const e=$e.state;e==="recording"?Dw():e==="arming"||e==="armed"?($e.cancel(),yt("Rec cancelled")):e==="idle"&&($e.arm(V.playing()),zu())});async function Dw(){const e=await $e.stop();e&&(wn&&URL.revokeObjectURL(wn.url),wn={url:URL.createObjectURL(e.blob),take:e},vn.href=wn.url,vn.download=e.name,vn.textContent=`Save take (${e.seconds.toFixed(1)} s)`,vn.hidden=!1)}function zu(){const e=$e.state;if(e!=="arming"&&e!=="armed")return;const t=V.clock.transport;if(!t.running||t.startTime===null){$e.schedule(null);return}const n=Math.round(tt.toContextTime(t.startTime)*Z.sampleRate);$e.schedule(n+Ja.latency("master"))}function Rw(){const e=$e.state,t=e==="arming"||e==="armed",n=e==="recording"||e==="stopping";ut.dataset.state=t?"armed":n?"recording":"idle",ut.setAttribute("aria-pressed",String(n)),ut.textContent=t?"Armed":n?"Stop rec":"Rec",ut.disabled=e==="stopping"||!$e.supported,nt()}$e.onChange(Rw);let jn=null;function Ow(){const e=V.clock.transport;!e.running||e.startTime===null||(jn=Math.round(tt.toContextTime(e.startTime)*Z.sampleRate)+Ja.latency("master"))}function Du(){return!V.clock.transport.running||jn===null?null:{origin:jn,barFrames:240/V.bpm()*Z.sampleRate}}function Ru(e){const t=no[e];return!t||t.key==="since"&&jn===null?null:t.choice(jn??0)}function tr(){const e=!qe.hidden;if(Nt.setAttribute("aria-expanded",String(e)),Nt.dataset.keeping=Me.keeping?"on":"off",!e)return;Rn.checked!==Me.keeping&&Rn.set(Me.keeping);const t=Me.status,n=md(t)/(t.sampleRate||Z.sampleRate);hu.textContent=Me.keeping?`${si(n)} of sound held`:"Keeping is off";const a=Du();Hn.forEach((r,i)=>{const s=Ru(i),l=s?Me.plan(s,a):null;r.disabled=!l;const d=no[i];d?.key==="since"&&(r.textContent=l?`Keep since Play (${si((l.to-l.from)/(t.sampleRate||Z.sampleRate))})`:d.label)})}Me.onChange(tr);function Ou(){qe.hidden&&(qe.hidden=!1,Me.refresh(),tr(),(Hn.find(e=>!e.disabled)??Rn.el).focus())}function Gn(e=!1){qe.hidden||(qe.hidden=!0,tr(),e&&Nt.focus())}Nt.addEventListener("click",()=>{qe.hidden?Ou():Gn()});document.addEventListener("pointerdown",e=>{!qe.hidden&&!mu.contains(e.target)&&Gn()});qe.addEventListener("keydown",e=>{if(e.key==="Escape"){e.preventDefault(),Gn(!0);return}if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;e.preventDefault();const t=[...Hn.filter(r=>!r.disabled),Rn.el],n=t.indexOf(document.activeElement);t[(n+(e.key==="ArrowDown"?1:t.length-1))%t.length]?.focus()});Hn.forEach((e,t)=>e.addEventListener("click",()=>{const n=Ru(t);n&&Bw(n)}));async function Bw(e){Gn(!0);const t=await Me.keep(e,{grid:Du(),bpm:V.bpm()});if(!t){yt("Nothing held to keep");return}pu=t;const n=URL.createObjectURL(t.blob);D("a",{href:n,download:t.name}).click(),window.setTimeout(()=>URL.revokeObjectURL(n),6e4),yt(`Kept ${si(t.seconds)} as a WAV`)}document.addEventListener("keydown",e=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey||e.key!=="k"&&e.key!=="K")return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable)||Nt.disabled||(e.preventDefault(),qe.hidden?Ou():Gn(!0))});document.addEventListener("keydown",e=>{if(e.code!=="Space"||e.repeat)return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable)||(e.preventDefault(),Dn.click())});on.addEventListener("keydown",e=>{if(e.target===Xt)return;const t=_.map(r=>r.id),n=t.indexOf(Ve),a=e.key==="ArrowRight"?t[(n+1)%t.length]:e.key==="ArrowLeft"?t[(n-1+t.length)%t.length]:null;a&&(e.preventDefault(),Ze(a),document.getElementById(`tab-${a}`)?.focus())});function nt(){const e=V.running()&&Ie.owner()===Xi;Dn.textContent=e?"Stop":"Play",Dn.setAttribute("aria-pressed",String(e)),document.activeElement!==nn&&(nn.value=String(Math.round(V.bpm()*10)/10));const t=V.position();Pa.value=t?`${t.bar}.${t.beat}`:"—";const n=V.peers().length;za.textContent=Z.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",Da.textContent=Z.state==="running"?"":"Audio off",($e.state==="arming"||$e.state==="armed")&&(za.textContent="Rec armed: waiting for sound",Da.textContent="Rec armed"),ao.classList.toggle("off",Z.state!=="running")}V.clock.onChange(()=>{V.clock.transport.running&&(du=!0),Ow(),tr(),V.running()||Ie.clear(),zu(),nt()});Ie.onChange(nt);Ie.onLastOut(()=>{V.running()&&V.stop(),nt()});V.clock.onChange(()=>et?.render());V.peer.onPeers(nt);Z.addEventListener("statechange",nt);const jw=.25;let yl=performance.now();function Bu(e){const t=Math.min(.1,(e-yl)/1e3);yl=e,et?.frame(t);const n=V.position(),a=n?`${n.bar}.${n.beat}`:"—";Pa.value!==a&&(Pa.value=a);const r=V.beatPhase(),i=r!==null&&r<jw;yi.hasAttribute("data-on")!==i&&yi.toggleAttribute("data-on",i),requestAnimationFrame(Bu)}async function _w(){const e=document.getElementById("app");if(!e)throw new Error("Missing #app");e.append(yu,Ra,vu,wi,D("main",{class:"instruments"},on,D("div",{class:"bay"},On,xu)),uu.el),et=Fy(wi,ae,{order:()=>_.map(t=>t.id),catalogue:Vi.filter(t=>t.sound!==!1),bpm:()=>V.bpm(),onAdd:Lu,onRemove:(t,n)=>void Cu(t,n),onReorder:(t,n)=>Nw(t,n),onRename:(t,n)=>Fw(t,n),...Nn?{plugins:Nn}:{}}),Z.state==="running"&&await Z.suspend(),await Z.audioWorklet.addModule(hw),iu(),$e.attach(),Me.attach(),await V.start();for(const t of[tn.a,tn.b,ae.masterFx])t&&Vl(t,V.clock,{mapper:tt});for(const t of _)ku(t);Ze(Ve),nt(),requestAnimationFrame(Bu),window.setInterval(()=>ae.parkIdleReturns(),jy),document.documentElement.dataset.studioReady="",Vw(),Uw(),Nn&&_0({ctx:Z,running:()=>B0([...eo].map(t=>t.getChain())),onFrozen:qw})}async function qw(e){Zi.add(e.map(a=>a.id)),window.clearTimeout(Oa),oo=!0;const t=e.map(a=>a.name).join(", ");document.documentElement.dataset.pluginsFrozen=e.map(a=>a.id).join(" "),yt(`${t} froze the audio`),await Xe({title:R.frozenTitle,body:R.frozenBody(t),confirmLabel:R.frozenOpen,cancelLabel:R.frozenStay})&&window.open(location.href,"_blank")}function Vw(){const e=new Set(Yt.pending());if(!e.size)return;const t=[],n=i=>_.find(s=>s.id===i)?.name??i,a=()=>{window.clearTimeout(r);const i=[...t,...Yt.dropPending()].map(n);yt(i.length?`Scene loaded; ${i.join(", ")} kept ${i.length===1?"its":"their"} own sound`:"Scene loaded")};Yt.onApplied((i,s)=>{e.delete(i)&&(s||t.push(i),e.size||a())});const r=window.setTimeout(a,Rg)}window.__studio={ctx:Z,mixer:ae,grab:Ja,recorder:$e,get lastTake(){return wn?.take??null},keeper:Me,get lastKeep(){return pu},limiterDelay:ou,mapper:tt,transport:V,frames:Pe,show:Ze,get instances(){return _},fx:tn,plugins:Nn,frozen:Zi,channelCores:Xa,get mix(){return et},notes:{bus:ft,dev:(e,t,n={})=>{const a=z0(ft.source(e,e),V.clock,{settings:t});for(const[r,i]of Object.entries(n))a.source.setTarget(r,{role:i.role,on:i.on??!0,...i.octave===void 0?{}:{octave:i.octave}});return a}}};_w();function lo(e){gt.dataset.picker=e,gt.setAttribute("aria-pressed",String(e==="on"||e==="connecting"||e==="away")),gt.dataset.ncHelp=ee[`picker:${e}`]}lo("off");async function Hw(){if(["127.0.0.1","localhost","[::1]"].includes(location.hostname))return"granted";try{return(await navigator.permissions.query({name:"loopback-network"})).state}catch{return"unknown"}}async function Uw(){let e=Xd(ke());const t=new URLSearchParams(location.search).get("picker");if(t!==null){const a=t?Ji(t):e.address;a&&(e={on:!0,address:a},mi(ke(),e))}if(!e.on)return;const n=await Hw();n==="granted"||n==="unknown"?dt.start(e.address):lo(n==="denied"?"blocked":"ask")}gt.addEventListener("click",()=>void Gw());async function Gw(){const e=Xd(ke()),t=gt.dataset.picker;if(t==="ask"||t==="blocked"){dt.start(e.address);return}if(dt.status!=="off"){if(!await Xe({title:"Disconnect the Sample Picker?",body:"Its Send to NYX won't reach this Studio until you connect it again.",confirmLabel:"Disconnect",returnFocus:gt}))return;mi(ke(),{...e,on:!1}),dt.stop();return}await Xe({title:"Connect the Sample Picker?",body:`The Studio talks to the Sample Picker on this computer (${e.address}), so its Send to NYX loads the pads of your NYX here. Chrome may ask to let this site reach this computer: allow it.`,confirmLabel:"Connect",returnFocus:gt})&&(mi(ke(),{...e,on:!0}),dt.start(e.address))}
