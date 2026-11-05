(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const zt=1e-9;function Uu(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class vi{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return Uu(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let r=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+zt&&(r=s.bpm);const i=[{beat:t.beat,time:t.time,bpm:this.clamp(r)}];for(const s of a){if(s.beat<=t.beat+zt)continue;const l=this.clamp(s.bpm);l!==i[i.length-1].bpm&&i.push({beat:s.beat,time:0,bpm:l})}this.segs=i,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+zt){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-zt;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,r=.25){const i=this.bpmAt(n);if(!(a>0)||!(r>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/r));this.setTempoAt(i,n);for(let l=1;l<=s;l++)this.setTempoAt(i+(t-i)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new vi({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+zt)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+zt)return n[a];return n[0]}}const Gu=Object.freeze({beatsPerBar:4,beatUnit:4}),Ht=1e-9;function Wu(e){return Math.floor(e+Ht)}function wl(e,t,n=!1){if(!(t>0))return e;const r=Math.ceil(e/t-Ht)*t;return n&&r<=e+Ht?r+t:r}class Ku{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new vi({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??Gu}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-Ht&&(this.stopTime===null||t<this.stopTime-Ht)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-Ht?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=Wu(t/n),r=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:r,barPhase:r/n}}nextBar(t,n=!1){return wl(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const vl="nc-clock/snapshot",xl=1;function Yu(e,t="local"){return{format:vl,version:xl,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function Xu(e,t){const n=Ju(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const Ge=e=>typeof e=="number"&&Number.isFinite(e),Ao=e=>e===null||Ge(e);function Ju(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==vl&&n("format"),(!Ge(t.version)||Math.floor(t.version)!==xl)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!Ge(t.anchor.beat)||!Ge(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&Ge(a.beat)&&Ge(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!Ge(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!Ge(t.meter.beatUnit))&&n("meter"),(!Ao(t.startTime)||!Ao(t.stopTime)||!Ge(t.stoppedBeat))&&n("transport times"),t}class Qu{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new Ku(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){Xu(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return Yu(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const Zu="nc-sync/1",ep=1,tp="nc-sync",np="nc-sync-leader",ap=0,kl=.5,$l=.75;function rp(e){return typeof e=="number"&&Number.isFinite(e)&&e>=kl&&e<=$l?e:null}const nr=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),cn=e=>typeof e=="number"&&Number.isFinite(e),Wn=e=>typeof e=="string"&&e.length>0;function ip(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==ep||!Wn(t.type)||!Wn(t.from)||!cn(t.term)||!cn(t.seq)||!cn(t.sentAt))return null;switch(t.type){case"hello":return Wn(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return cn(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&cn(t.slot)?t:null;case"ping":case"pong":return Wn(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function op(e,t,n,a,r){return{proto:Zu,from:t,term:n,seq:a,sentAt:r,...e}}function Ne(){return(performance.timeOrigin+performance.now())/1e3}const ar=.003,sp=3,rr=.002+1e-6,lp=.01,Mo=500;class cp{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?lp:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=ar&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const r=n-(this.timeOrigin+a)/1e3,i=this.median(),s=r-i,l=Math.abs(r-this.preStepBase),u=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!u&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&u===this.pendingBack&&(u||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,i,u))):(this.pendingStep=s,this.pendingBack=u,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const r=this.heldBase()!==null,i=this.ctx.currentTime,s=i<=this.revertUntil;let l;if(a&&s){const u=this.offsets,d=this.preStep;u.length=0;for(let c=0;c<d.length;c++)u.push(d[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:i,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!s){const c=this.offsets,p=this.preStep;p.length=0;for(let h=0;h<c.length;h++)p.push(c[h]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?i+this.stepRevert:-1/0}const u=this.offsets,d=t-n;for(let c=0;c<u.length;c++)u[c]+=d;this.stepCount++,l={stepSeconds:t-n,confirmedAt:i,reanchors:this.stepCount,revert:!1}}if(!r)for(const u of[...this.stepListeners])u(l);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let i=0;i<a;i++){const s=t[i];let l=i-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const r=a>>1;return a%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const r=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(r&&Number.isFinite(r.contextTime)&&Number.isFinite(r.performanceTime)&&r.contextTime>=ar&&r.performanceTime>0)if(this.waitSince=null,r.contextTime===this.lastStampC&&r.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Mo)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=r.contextTime,this.lastStampP=r.performanceTime,this.stampSince=this.perfNow(),n=r.contextTime-(this.timeOrigin+r.performanceTime)/1e3,a=!0;else if(!r||!(r.contextTime>=ar)&&!(r.contextTime>0&&!(r.performanceTime>0))){if(r){const i=this.perfNow();if(this.waitSince===null&&(this.waitSince=i),i-this.waitSince<Mo)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(sp,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let r=-1,i=0;for(let l=0;l<n;l++){let u=0;for(let d=0;d<n;d++)Math.abs(t[d]-t[l])<=rr&&u++;u>i&&(r=l,i=u)}if(i<a)return;const s=t[r];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>rr&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-this.estimate())<=rr}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const r=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(r,2)};setTimeout(r,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(r)&&r>0?r:null}}const dp="let t=null;onmessage=e=>{clearInterval(t);t=null;if(e.data>0)t=setInterval(()=>postMessage(0),e.data)}";function up(){const e=globalThis;return typeof e.Worker=="function"&&typeof e.Blob=="function"&&typeof e.document=="object"&&typeof e.URL?.createObjectURL=="function"}function pp(e,t={}){const n=t.intervalMs??20,a=t.now??(typeof performance<"u"?()=>performance.now():()=>Date.now());let r=null,i=null,s=null,l=-1/0,u=!1;const d=()=>{if(!u)return;const c=a();c-l<n/2||(l=c,e())};if(t.worker===!0||t.worker!==!1&&up())try{i=URL.createObjectURL(new Blob([dp],{type:"text/javascript"})),r=new Worker(i),r.onmessage=d}catch{r=null,i&&URL.revokeObjectURL(i),i=null}return{get running(){return u},get kind(){return r?"worker+timer":"timer"},start(){u||(u=!0,s=setInterval(d,n),r?.postMessage(n))},stop(){u=!1,s&&clearInterval(s),s=null,r?.postMessage(0)},dispose(){this.stop(),r?.terminate(),r=null,i&&URL.revokeObjectURL(i),i=null}}}class hp{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...nr,...t.capabilities},this.channelOption=t.channel??tp,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const r=this.o.now(),i=()=>{n===this.startWaits&&t(r)};return a.then(i,i),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const r=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(r),0)}else{const r=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?r:Math.max(t+this.o.gatedStartLeadSeconds,r),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[r,i]=this.tempoRange();t=Math.min(i,Math.max(r,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const u=s.beatAt(l+this.o.minLeadSeconds),d=Math.max(n??wl(u,1),u);a&&a>0?(s.tempo.rampTempo(t,d,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,d),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min($l,Math.max(kl,t)):ap;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=rp(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=ip(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...nr,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const i of this.peers.values())i.leader=i.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...nr},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(r=>{this.leader&&this.decideStart(r)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const i=new AbortController;this.lockAbort=i,this.locks.request(np,{signal:i.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===i&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(i,s,l)=>[i?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const i of this.peers.values()){if(!i.capabilities.canLead)continue;const s=n(i.capabilities.prefersLeader,i.joinedAt,i.id);(r===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,r=i.id)}this.setLeader(r===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==r[0]?a[0]<r[0]:a[1]!==r[1]?a[1]<r[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const r=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>r&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(op(t,this.id,this.term,++this.seq,this.o.now()))}}const mp="modulepreload",fp=function(e){return"/studio/"+e},To={},gp=function(t,n,a){let r=Promise.resolve();if(n&&n.length>0){let s=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=l?.nonce||l?.getAttribute("nonce");r=s(n.map(d=>{if(d=fp(d),d in To)return;To[d]=!0;const c=d.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const h=document.createElement("link");if(h.rel=c?"stylesheet":mp,c||(h.as="script"),h.crossOrigin="",h.href=d,u&&h.setAttribute("nonce",u),document.head.appendChild(h),c)return new Promise((g,f)=>{h.addEventListener("load",g),h.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${d}`)))})}))}function i(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})};var bp=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Dr=[.25,.5,.75,1,1.5,2],yp=4.9,ce={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},wt={fmt:"wet"},Oe={fmt:"pct"},Dt={fmt:"db"},Kn={fmt:"signedPct"},ir={fmt:"num",suffix:" ms"},oe={div:100};function O(e,t,n,a,r,i,s,l){var u={key:e,label:t,min:n,max:a,default:r,step:1,k:i,unit:null,format:s};if(l)for(var d in l)u[d]=l[d];return u}function Yn(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var vn=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[O("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:ce.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[O("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:ce.hpHz,astrid:!0,zero:"off"}),O("q","Resonance",0,100,0,2,{fmt:"q",law:ce.hpQ},{dsp:{law:ce.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[O("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:ce.bpHz,astrid:!0},{dsp:{law:ce.bpHz}}),O("q","Q",0,100,0,2,{fmt:"q",law:ce.bpQ},{dsp:{law:ce.bpQ}}),O("mix","Mix",0,100,100,3,wt,{dsp:oe,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[O("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Yn(bp),overriddenBy:"beats_free",tempoSynced:!0}),O("feedback","Feedback",0,90,35,2,Oe,{dsp:oe,unit:"%"}),O("mix","Wet/dry",0,100,0,3,wt,{dsp:oe,unit:"%",astridKey:"wet"}),O("tone","Tone",0,100,100,4,{fmt:"hz",law:ce.delayTone,offAt:100},{dsp:{div:99},more:!0}),O("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),O("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Yn([[0,"Insert"],[1,"Send"]]),more:!0}),O("send","Send",0,100,100,7,Oe,{dsp:oe,unit:"%",more:!0}),O("mod_send","Accent → send",-100,100,0,8,Kn,{dsp:oe,unit:"%",more:!0}),O("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[O("predelay","Pre-delay",0,200,0,1,ir,{dsp:{div:1e3},unit:"ms"}),O("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:oe,unit:"%"}),O("decay","Decay",0,100,50,3,Oe,{dsp:oe,unit:"%"}),O("damping","Damping",0,100,0,4,Oe,{dsp:oe,unit:"%"}),O("mix","Mix",0,100,0,5,wt,{dsp:oe,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[O("rate","Rate",0,100,26,1,{fmt:"rate",law:ce.rate},{dsp:{law:ce.rate}}),O("depth","Depth",0,100,70,2,Oe,{dsp:oe,unit:"%"}),O("feedback","Feedback",-90,90,50,3,Kn,{dsp:oe,unit:"%"}),O("mix","Mix",0,100,50,4,wt,{dsp:oe,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[O("rate","Rate",0,100,52,1,{fmt:"rate",law:ce.rate},{dsp:{law:ce.rate}}),O("depth","Depth",0,100,50,2,Oe,{dsp:oe,unit:"%"}),O("spread","Spread",0,100,70,3,Oe,{dsp:oe,unit:"%"}),O("mix","Mix",0,100,40,4,wt,{dsp:oe,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[O("rate","Rate",0,100,39,1,{fmt:"rate",law:ce.rate},{dsp:{law:ce.rate}}),O("depth","Depth",0,100,70,2,Oe,{dsp:oe,unit:"%"}),O("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Yn([[4,"4"],[6,"6"],[8,"8"]])}),O("feedback","Feedback",0,90,30,4,Oe,{dsp:oe,unit:"%"}),O("mix","Mix",0,100,50,5,wt,{dsp:oe,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[O("low_db","Low",-18,18,0,1,Dt,{unit:"dB"}),O("mid_db","Mid",-18,18,0,2,Dt,{unit:"dB"}),O("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:ce.midHz,astrid:!0},{dsp:{law:ce.midHz}}),O("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:ce.eqQ},{dsp:{law:ce.eqQ}}),O("high_db","High",-18,18,0,4,Dt,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[O("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),O("output_db","Output",-12,12,0,2,Dt,{unit:"dB"}),O("mix","Mix",0,100,100,3,wt,{dsp:oe,unit:"%"}),O("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Yn([[0,"Smooth"],[1,"Acid"]]),more:!0}),O("tone","Tone",0,100,100,5,{fmt:"hz",law:ce.driveTone,offAt:100},{dsp:{div:99},more:!0}),O("mod_drive","Accent → drive",-100,100,0,6,Kn,{dsp:oe,unit:"%",more:!0}),O("mod_tone","Accent → tone",-100,100,0,7,Kn,{dsp:oe,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[O("threshold_db","Threshold",-60,0,0,1,Dt,{unit:"dB"}),O("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:ce.ratio},{dsp:{law:ce.ratio}}),O("attack_ms","Attack",1,100,10,3,ir,{unit:"ms"}),O("release_ms","Release",10,1e3,150,4,ir,{unit:"ms"}),O("makeup_db","Makeup",0,24,0,5,Dt,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[O("width","Width",0,200,100,1,Oe,{dsp:oe,unit:"%"}),O("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:oe})]}],wp=vn.map(function(e){return e.type}),vp=vn.filter(function(e){return!e.hidden}).map(function(e){return e.type}),xp={reverb:"plate"},Xt={},El=[],xn=[];function kp(e){Xt[e.type]||El.push(e.type),Xt[e.type]=e;for(var t=0;t<xn.length;t++)try{xn[t](e.type)}catch(n){typeof console<"u"&&console.error(n)}}function $p(){return El.map(function(e){return Xt[e]})}function Ep(e){return xn.push(e),function(){var t=xn.indexOf(e);t>=0&&xn.splice(t,1)}}function Sl(e){return typeof e=="string"&&/^plugin:[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(e)&&e.length<=71}function xi(e){var t=xp[e]||e;return wp.indexOf(t)>=0||typeof t=="string"&&Xt[t]?t:null}function de(e){for(var t=xi(e),n=0;n<vn.length;n++)if(vn[n].type===t)return vn[n];return t&&Xt[t]?Xt[t]:null}function Sp(e,t){var n=de(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function _t(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function ga(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=_t(n.law,t);return a===null?0:a}function Lo(e,t){return Math.min(yp,e*60/(t>0?t:120))}var Co=function(e){return e>0?"+":e<0?"−":""};function Ap(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function Al(e,t,n){var a=e.format,r;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:Co(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return Co(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(r=_t(a.law,t),r===null?a.zero||"open":a.astrid?Ap(r):r+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+_t(a.law,t).toFixed(1);case"ratio":return _t(a.law,t).toFixed(1)+":1";case"rate":return r=_t(a.law,t),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var i=0;i<e.options.length;i++)if(e.options[i].value===t)return e.options[i].label;return String(t);case"tempoMs":return Math.round(Lo(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(Lo(t,n)*1e3)+" ms"}return String(t)}var Mp=1,ja=["drive","delay","plate"];function Tp(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,r){return Al(e,a,r)},t}var Ut=ja.map(function(e){var t=de(e),n={type:e,label:t.label,dials:t.dials.map(Tp)};return t.tempoSynced&&(n.tempoSynced=!0),n}),Lp={reverb:"plate"};function ba(e){var t=Lp[e]||e;return ja.indexOf(t)>=0?t:null}function _a(e){for(var t=ba(e),n=0;n<Ut.length;n++)if(Ut[n].type===t)return Ut[n];return null}function Ml(e,t){var n=_a(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function Jt(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function Ye(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,r=1;r<e.options.length;r++)Math.abs(e.options[r].value-t)<Math.abs(a-t)&&(a=e.options[r].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var i=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*i)/i))+0}function Cp(){return{v:Mp,chain:Ut.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function Np(e){return Dr.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},Dr[0])}function or(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Fp(e){for(var t=Array.isArray(e)?e:or(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=Cp(),r={},i=[],s=0;s<t.length;s++){var l=t[s];if(or(l)){var u=ba(l.type);if(!u){typeof l.type=="string"&&i.push(l.type);continue}if(r[u]){i.push(u);continue}r[u]=!0;var d=a.chain[ja.indexOf(u)],c=or(l.dials)?l.dials:{};u==="delay"&&c.mix===void 0&&c.wet!==void 0&&(c=Object.assign({},c,{mix:c.wet})),d.bypass=n?l.bypass===!0:l.bypass!==!1,_a(u).dials.forEach(function(p){d.dials[p.key]=Ye(p,c[p.key])}),Ip(u,d.dials,c)}}return{state:a,dropped:i}}function Ip(e,t,n){for(var a=_a(e),r=0;r<a.dials.length;r++){var i=a.dials[r];i.stepWhen&&(t[i.key]=Ye(i,n&&typeof n[i.key]=="number"?n[i.key]:t[i.key],Jt(i,t)))}}function ya(e){return Fp(e).state}function Pp(e){return JSON.parse(JSON.stringify(e))}var zp=24,Rr={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Or(e,t,n){if(t==="bypass")return n?0:1;var a=Ml(e,t)||Dp(e,t);return a?ga(a,n):0}function Dp(e,t){var n=de(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var Rp={};Ut.forEach(function(e){e.dials.forEach(function(t){Rp[e.type+"."+t.key]=t.format})});function sr(e,t){var n=new Float64Array(zp),a=ya(e);return a.chain.forEach(function(r){var i=Rr[r.type];n[i.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[i[s]]=Or(r.type,s,r.dials[s])})}),n}var Op="__ncFxLoop",Bp=/^(?:return|typeof|instanceof|in|of|new|delete|void|throw|case|do|else|yield|await)$/,No=/[A-Za-z_$\u0080-\uffff]/,lr=/[A-Za-z0-9_$\u0080-\uffff]/;function jp(e){var t=[],n=0,a=e.length,r=[],i,s;function l(){var h=t.length?t[t.length-1]:null;return h?h.t==="name"?Bp.test(h.v):h.t==="num"||h.t==="str"||h.t==="tpl"||h.t==="re"?!1:h.v!==")"&&h.v!=="]":!0}function u(){for(var h=n-1;n<a;){if(i=e[n],i==="\\"){n+=2;continue}if(i==="`"){n++,t.push({t:"tpl",v:"",s:h,e:n});return}if(i==="$"&&e[n+1]==="{"){n+=2,r.push("tpl"),t.push({t:"tpl",v:"",s:h,e:n});return}n++}t.push({t:"tpl",v:"",s:h,e:a})}for(;n<a;){if(i=e[n],i===" "||i==="	"||i===`
`||i==="\r"||i==="\f"||i==="\v"||i===" "||i==="\uFEFF"||i==="\u2028"||i==="\u2029"){n++;continue}if(i==="/"&&e[n+1]==="/"){for(;n<a&&e[n]!==`
`&&e[n]!=="\r";)n++;continue}if(i==="/"&&e[n+1]==="*"){var d=e.indexOf("*/",n+2);n=d<0?a:d+2;continue}if(s=n,i==='"'||i==="'"){for(n++;n<a&&e[n]!==i&&e[n]!==`
`;)n+=e[n]==="\\"?2:1;n++,t.push({t:"str",v:"",s,e:n});continue}if(i==="`"){n++,u();continue}if(i==="/"&&l()){n++;for(var c=!1;n<a;){if(i=e[n],i==="\\"){n+=2;continue}if(i===`
`)break;if(c)i==="]"&&(c=!1);else if(i==="[")c=!0;else if(i==="/"){n++;break}n++}for(;n<a&&lr.test(e[n]);)n++;t.push({t:"re",v:"",s,e:n});continue}if(No.test(i)||i==="\\"){for(n++;n<a&&(lr.test(e[n])||e[n]==="\\");)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(i==="#"&&n+1<a&&No.test(e[n+1])){for(n+=2;n<a&&lr.test(e[n]);)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(i>="0"&&i<="9"||i==="."&&e[n+1]>="0"&&e[n+1]<="9"){for(n++;n<a&&/[0-9A-Za-z_.]/.test(e[n]);)(e[n]==="e"||e[n]==="E")&&(e[n+1]==="+"||e[n+1]==="-")&&!/^0[xX]/.test(e.slice(s,n))&&n++,n++;t.push({t:"num",v:"",s,e:n});continue}if(i==="{")r.push("{");else if(i==="}"){var p=r.pop();if(p==="tpl"){n++,u();continue}}if(i==="?"&&e[n+1]==="."&&!(e[n+2]>="0"&&e[n+2]<="9")){n+=2,t.push({t:"p",v:"?.",s,e:n});continue}if(i==="."&&e[n+1]==="."&&e[n+2]==="."){n+=3,t.push({t:"p",v:"...",s,e:n});continue}n++,t.push({t:"p",v:i,s,e:n})}return t}function _p(e,t){for(var n=0,a=t;a<e.length;a++){var r=e[a].t==="p"?e[a].v:"";if(r==="("||r==="["||r==="{")n++;else if((r===")"||r==="]"||r==="}")&&(n--,n===0))return r===")"?a:-1}return-1}function qp(e){for(var t=String(e),n=jp(t),a=[],r=Op+"()",i=0;i<n.length;i++){var s=n[i];if(!(s.t!=="name"||s.v!=="while"&&s.v!=="for")){var l=i>0?n[i-1]:null;if(!(l&&l.t==="p"&&(l.v==="."||l.v==="?."))){var u=i+1;if(!(s.v==="for"&&n[u]&&n[u].t==="name"&&n[u].v==="await")&&!(!n[u]||n[u].t!=="p"||n[u].v!=="(")){var d=_p(n,u);if(!(d<0)){if(s.v==="while"){if(d===u+1)continue;a.push([n[u].e,r+" && ("],[n[d].s,")"]);continue}for(var c=[],p=0,h=u+1;h<d;h++){var g=n[h].t==="p"?n[h].v:"";g==="("||g==="["||g==="{"?p++:g===")"||g==="]"||g==="}"?p--:g===";"&&p===0&&c.push(h)}c.length===2&&(c[1]===c[0]+1?a.push([n[c[0]].e," "+r]):a.push([n[c[0]].e," "+r+" && ("],[n[c[1]].s,")"]))}}}}}if(!a.length)return t;a.sort(function(y,v){return y[0]-v[0]});for(var f="",b=0,m=0;m<a.length;m++)f+=t.slice(b,a[m][0])+a[m][1],b=a[m][0];return f+t.slice(b)}var cr=1,Fo=15,Tl=/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/,Vp=/^[a-z][a-z0-9_]{0,31}$/,Ll=/^\d+\.\d+\.\d+$/,Cl=/^[A-Za-z0-9.+-]+(?: (?:AND|OR|WITH) [A-Za-z0-9.+-]+)*$/,Hp=/^[A-Za-z0-9_-][A-Za-z0-9._-]{0,63}\.js$/,Io=["$schema","ncPlugin","id","name","version","author","licence","description","website","keywords","dsp","params"],Po=["id","label","type","defaultValue","minValue","maxValue","discreteStep","exponent","choices","units","more"],wa={1:"It failed to start.",2:"It crashed while playing.",3:"It made bad numbers (NaN, infinity or runaway level).",4:"It crashed when a dial moved.",5:"Its code is not loaded.",6:"It got stuck in a loop, so it was stopped."};function kn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Rt(e){return typeof e=="number"&&isFinite(e)}function vt(e,t){return typeof e=="string"&&e.trim().length>0&&e.length<=t}function qa(e){var t=[],n=e,a=function(l,u){t.push(l+": "+u)};if(!kn(n))return{ok:!1,errors:["manifest: must be a JSON object"],manifest:null};Object.keys(n).forEach(function(l){Io.indexOf(l)<0&&a(l,"unknown field (allowed: "+Io.slice(1).join(", ")+")")}),n.ncPlugin!==cr&&a("ncPlugin","must be "+cr),(typeof n.id!="string"||!Tl.test(n.id)||n.id.length>64)&&a("id",'lowercase letters and digits, with dots or dashes between, up to 64 (e.g. "yourname.tremolo")'),vt(n.name,40)||a("name","a name of 1 to 40 characters"),(typeof n.version!="string"||!Ll.test(n.version))&&a("version",'x.y.z, e.g. "1.0.0"'),vt(n.author,80)||a("author","who made it, 1 to 80 characters"),(typeof n.licence!="string"||!Cl.test(n.licence)||n.licence.length>64)&&a("licence",'an SPDX licence id, e.g. "MIT"'),n.description!==void 0&&!(typeof n.description=="string"&&n.description.length<=200)&&a("description","up to 200 characters"),n.website!==void 0&&!(typeof n.website=="string"&&/^https:\/\/\S+$/.test(n.website)&&n.website.length<=2048)&&a("website","an https:// address"),n.keywords!==void 0&&!(Array.isArray(n.keywords)&&n.keywords.length<=8&&n.keywords.every(function(l){return vt(l,24)}))&&a("keywords","up to 8 short strings"),(typeof n.dsp!="string"||!Hp.test(n.dsp))&&a("dsp",`the DSP file's name, in the same folder as plugin.json, ending in .js (e.g. "tremolo.dsp.js")`);var r=[];if(!Array.isArray(n.params))a("params","a list of params (may be empty)");else if(n.params.length>Fo)a("params","at most "+Fo);else{var i={};n.params.forEach(function(l,u){var d="params["+u+"]";if(!kn(l)){a(d,"must be an object");return}Object.keys(l).forEach(function(h){Po.indexOf(h)<0&&a(d+"."+h,"unknown field (allowed: "+Po.join(", ")+")")}),typeof l.id!="string"||!Vp.test(l.id)||l.id==="bypass"?a(d+".id",'lowercase, starting with a letter: letters, digits, _ (not "bypass")'):i[l.id]?a(d+".id",'"'+l.id+'" is used twice'):i[l.id]=!0,vt(l.label,24)||a(d+".label","the dial's name, 1 to 24 characters");var c=l.type===void 0?"float":l.type;if(["float","int","boolean","choice"].indexOf(c)<0){a(d+".type","float, int, boolean or choice");return}var p={id:l.id,label:l.label,type:c};if(c==="choice"){if(!Array.isArray(l.choices)||l.choices.length<2||l.choices.length>16||!l.choices.every(function(h){return vt(h,24)})){a(d+".choices","2 to 16 names");return}p.choices=l.choices.slice(),p.minValue=0,p.maxValue=l.choices.length-1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==p.maxValue)&&a(d,"a choice's values are 0 to choices.length - 1: leave out minValue and maxValue")}else if(c==="boolean")p.minValue=0,p.maxValue=1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==1)&&a(d,"a boolean is 0 or 1: leave out minValue and maxValue");else{if(!Rt(l.minValue)||!Rt(l.maxValue)||!(l.minValue<l.maxValue)){a(d,"minValue and maxValue: numbers, minValue < maxValue");return}p.minValue=l.minValue,p.maxValue=l.maxValue,l.discreteStep!==void 0&&!(Rt(l.discreteStep)&&l.discreteStep>0&&l.discreteStep<=l.maxValue-l.minValue)&&a(d+".discreteStep","a number > 0, at most the range"),p.discreteStep=c==="int"?Math.max(1,Math.round(l.discreteStep||1)):Rt(l.discreteStep)&&l.discreteStep>0?l.discreteStep:Up(l.maxValue-l.minValue),c==="int"&&(!Number.isInteger(l.minValue)||!Number.isInteger(l.maxValue))&&a(d,"an int has whole-number minValue and maxValue")}l.defaultValue===void 0?p.defaultValue=p.minValue:!Rt(l.defaultValue)||l.defaultValue<p.minValue||l.defaultValue>p.maxValue?a(d+".defaultValue","a number from "+p.minValue+" to "+p.maxValue):p.defaultValue=l.defaultValue,l.units!==void 0&&(typeof l.units=="string"&&l.units.length<=8?p.units=l.units:a(d+".units",'up to 8 characters, e.g. "Hz", "ms", "%", "dB"')),l.exponent!==void 0&&(Rt(l.exponent)&&l.exponent>0?p.exponent=l.exponent:a(d+".exponent","a number > 0")),l.more!==void 0&&(typeof l.more=="boolean"?l.more&&(p.more=!0):a(d+".more","true or false")),r.push(p)})}if(t.length)return{ok:!1,errors:t,manifest:null};var s={ncPlugin:cr,id:n.id,name:n.name.trim(),version:n.version,author:n.author.trim(),licence:n.licence,dsp:n.dsp,params:r};return n.description&&(s.description=n.description),n.website&&(s.website=n.website),n.keywords&&(s.keywords=n.keywords.slice()),{ok:!0,errors:[],manifest:s}}function Up(e){var t=Math.pow(10,Math.floor(Math.log10(e/100)));return t<.001?.001:t>1?1:+t.toFixed(3)}function Gp(e){for(var t=0;t<3&&Math.abs(Math.round(e*Math.pow(10,t))-e*Math.pow(10,t))>1e-9;)t++;return t}function Va(e){return"plugin:"+e}function Wp(e,t){var n=e,a=t||{},r=n.params.map(function(s,l){var u={key:s.id,label:s.label,min:s.minValue,max:s.maxValue,default:s.defaultValue,step:s.discreteStep,k:l+1,unit:s.units||null,format:null};if(s.type==="choice"||s.type==="boolean"){var d=s.type==="choice"?s.choices:["Off","On"];u.step=null,u.options=d.map(function(p,h){return{value:h,label:p}}),u.format={fmt:"option"}}else{var c=s.units?/^[%°×]/.test(s.units)?s.units:" "+s.units:"";u.format={fmt:"fixed",div:1,add:0,digits:Gp(s.discreteStep),suffix:c}}return s.more&&(u.more=!0),u}),i={type:Va(n.id),label:n.name,dials:r,plugin:{id:n.id,version:n.version,author:n.author,licence:n.licence,engine:"plugin:"+n.id+"@"+n.version,idBase:n.id.split(".").pop(),url:typeof a.url=="string"?a.url:"",listed:a.listed===!0}};return n.description&&(i.note=n.description),n.website&&(i.plugin.website=n.website),i}function Nl(e,t){var n=qa(e);if(!n.ok)throw new Error("nc-fx plugin: "+n.errors.join("; "));var a=de(Va(n.manifest.id));if(a&&a.plugin.version!==n.manifest.version)throw new Error("nc-fx plugin: "+n.manifest.id+" "+a.plugin.version+" is already loaded on this page; reload to use "+n.manifest.version);if(a)return a;var r=Wp(n.manifest,t);return kp(r),r}async function Fl(e){var t=globalThis.crypto&&globalThis.crypto.subtle;if(!t)throw new Error("nc-fx plugin: no WebCrypto here (integrity needs a secure context: https or localhost)");for(var n=new Uint8Array(await t.digest("SHA-256",e)),a="",r=0;r<n.length;r++)a+=String.fromCharCode(n[r]);return"sha256-"+btoa(a)}function Kp(e){if(e.protocol!=="https:"&&!(e.protocol==="http:"&&/^(localhost|127\.0\.0\.1|\[::1\])$/.test(e.hostname)))throw new Error("nc-fx plugin: load plugins over https (http only from localhost): "+e.href)}async function zo(e,t,n,a){var r=await t(e,{credentials:"omit",cache:"no-cache"});if(!r.ok)throw new Error("nc-fx plugin: "+a+" "+e+" answered "+r.status);var i=new Uint8Array(await r.arrayBuffer());if(n){var s=await Fl(i);if(s!==n)throw new Error("nc-fx plugin: "+a+" "+e+" does not match the registry (expected "+n+", got "+s+")")}return new TextDecoder().decode(i)}var Xn=typeof WeakMap=="function"?new WeakMap:null;function Il(e,t){var n=new Error("nc-fx plugin: "+e.name+" "+t+" is already loaded on this page. Reload the page to use "+e.version+".");return n.reload=!0,n}async function Pl(e,t,n,a,r){var i=t.id+"@"+t.version,s=Xn&&Xn.get(e);!s&&Xn&&(s={},Xn.set(e,s));var l=s&&s[i];if(l){var u=await l,d=await n();return{stale:d!==u}}var c=(async function(){var p=await n();await jl(e,r);var h=URL.createObjectURL(new Blob([qp(p)+`
//# sourceURL=`+a+`
`],{type:"text/javascript"}));try{await e.audioWorklet.addModule(h)}finally{URL.revokeObjectURL(h)}return p})();return s&&(s[i]=c,c.catch(function(){delete s[i]})),await c,{stale:!1}}async function zl(e,t,n){var a=n||{},r=new URL(String(t),a.base||(typeof location<"u"?location.href:void 0));Kp(r);var i=a.fetch||globalThis.fetch.bind(globalThis),s=a.integrity||{},l=await zo(r.href,i,s.manifest,"plugin.json"),u;try{u=JSON.parse(l)}catch{throw new Error("nc-fx plugin: "+r.href+" is not JSON")}var d=qa(u);if(!d.ok)throw new Error("nc-fx plugin: "+r.href+": "+d.errors.join("; "));var c=d.manifest;if(a.expect&&(a.expect.id&&a.expect.id!==c.id||a.expect.version&&a.expect.version!==c.version))throw new Error("nc-fx plugin: "+r.href+" is "+c.id+" "+c.version+", not what the registry lists");var p=de(Va(c.id));if(p&&p.plugin.version!==c.version)throw Il(c,p.plugin.version);var h=new URL(c.dsp,r),g=await Pl(e,c,function(){return zo(h.href,i,s.dsp,"DSP file")},h.href,a.moduleUrl),f=Nl(c,{url:r.href,listed:a.listed===!0});return{entry:f,manifest:c,url:r.href,stale:g.stale}}var Yp=256*1024;async function Do(e,t,n){var a=n||{},r=t||{},i=r.manifest;if(typeof i=="string")try{i=JSON.parse(i)}catch{throw new Error("nc-fx plugin: plugin.json is not JSON")}var s=qa(i);if(!s.ok)throw new Error("nc-fx plugin: plugin.json: "+s.errors.join("; "));var l=s.manifest;if(typeof r.dsp!="string"||!r.dsp.trim())throw new Error("nc-fx plugin: "+l.name+" needs its DSP file, "+l.dsp);if(typeof r.dspName=="string"&&r.dspName!==l.dsp)throw new Error("nc-fx plugin: plugin.json names its DSP file "+l.dsp+", not "+r.dspName);if(new TextEncoder().encode(r.dsp).length>Yp)throw new Error("nc-fx plugin: "+l.dsp+" is over 256 KB");var u=typeof a.url=="string"&&a.url?a.url:"local:"+l.id,d=de(Va(l.id));if(d&&d.plugin.version!==l.version)throw Il(l,d.plugin.version);var c=r.dsp,p=await Pl(e,l,async function(){return c},u.replace(/[^A-Za-z0-9:._@\/-]/g,"_")+"/"+l.dsp,a.moduleUrl),h=Nl(l,{url:u,listed:!1});return{entry:h,manifest:l,url:u,stale:p.stale}}function Xp(e){var t=[];if(!kn(e)||e.v!==1||!Array.isArray(e.plugins))return{ok:!1,errors:['registry: { "v": 1, "plugins": [...] }'],registry:{v:1,plugins:[]}};var n=[],a={};return e.plugins.forEach(function(r,i){var s="plugins["+i+"]",l=[];if(!kn(r)){t.push(s+": must be an object");return}if((typeof r.id!="string"||!Tl.test(r.id))&&l.push("id"),vt(r.name,40)||l.push("name"),(typeof r.version!="string"||!Ll.test(r.version))&&l.push("version"),vt(r.author,80)||l.push("author"),(typeof r.licence!="string"||!Cl.test(r.licence))&&l.push("licence"),(typeof r.manifest!="string"||!r.manifest)&&l.push("manifest"),(!kn(r.integrity)||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(r.integrity.manifest||"")||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(r.integrity.dsp||""))&&l.push("integrity"),(typeof r.checked!="string"||!/^\d{4}-\d{2}-\d{2}/.test(r.checked))&&l.push("checked"),a[r.id]&&l.push("id (listed twice)"),l.length){t.push(s+": bad "+l.join(", "));return}a[r.id]=!0;var u={id:r.id,name:r.name,version:r.version,author:r.author,licence:r.licence,manifest:r.manifest,integrity:{manifest:r.integrity.manifest,dsp:r.integrity.dsp},checked:r.checked};typeof r.description=="string"&&(u.description=r.description.slice(0,200)),n.push(u)}),{ok:t.length===0,errors:t,registry:{v:1,plugins:n}}}async function Jp(e,t){var n=t||{},a=new URL(String(e),n.base||(typeof location<"u"?location.href:void 0)),r=await(n.fetch||globalThis.fetch.bind(globalThis))(a.href,{credentials:"omit",cache:"no-cache"});if(!r.ok)throw new Error("nc-fx plugins: the registry "+a.href+" answered "+r.status);var i=Xp(await r.json());return{registry:i.registry,url:a.href,errors:i.errors}}function Qp(e,t,n,a){return zl(e,new URL(t.manifest,n).href,Object.assign({},a,{integrity:t.integrity,listed:!0,expect:{id:t.id,version:t.version}}))}function Zp(e,t){var n=t||{},a=n.stallMs>0?n.stallMs:1500,r=n.everyMs>0?n.everyMs:250,i=n.now||function(){return typeof performance<"u"?performance.now():Date.now()},s=n.setInterval||setInterval,l=n.clearInterval||clearInterval,u=e.currentTime,d=i(),c=0,p=!1,h=s(function(){var g=i(),f=g-d,b=e.currentTime;if(d=g,e.state!=="running"||b!==u){u=b,c=0,p&&e.state==="running"&&(p=!1,n.onResume&&n.onResume());return}if(f>4*r){c=0;return}c+=f,!p&&c>=a&&(p=!0,n.onStall&&n.onStall({frozenMs:c,at:b}))},r);return{stop:function(){l(h)},stalled:function(){return p}}}var eh=2,va=3,Ro=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function xt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var th=/^local:[A-Za-z0-9._@-]{1,200}$/,nh=/^\d+\.\d+\.\d+$/;function ah(e,t){var n=xt(e)?e:{},a=t.slice(7),r={id:a,version:typeof n.version=="string"&&nh.test(n.version)?n.version:"0.0.0",url:"",name:a};return typeof n.url=="string"&&n.url.length<=2048&&(/^https?:\/\//.test(n.url)||th.test(n.url))&&(r.url=n.url),typeof n.name=="string"&&n.name.trim()&&(r.name=n.name.trim().slice(0,40)),r}function Dl(e){var t=e.plugin;return{id:t.id,version:t.version,url:t.url,name:e.label}}function rh(e){var t={},n=0;if(xt(e))for(var a in e)n<16&&/^[a-z][a-z0-9_]{0,31}$/.test(a)&&typeof e[a]=="number"&&isFinite(e[a])&&(t[a]=e[a],n++);return t}function ih(e){return e.plugin?e.plugin.idBase:e.type}function Rl(e,t){var n=de(e);if(!n)return null;var a={};(t||[]).forEach(function(u){u&&u.id&&(a[u.id]=!0)});for(var r=1,i=ih(n);a[i+"-"+r];)r++;var s={};n.dials.forEach(function(u){s[u.key]=u.default});var l={id:i+"-"+r,type:n.type,bypass:!1,dials:s};return n.plugin&&(l.plugin=Dl(n)),l}function oh(e){var t=de(e.type),n=/-(\d+)$/.exec(e.id||""),a=t?t.label:e.plugin&&e.plugin.name?e.plugin.name:e.type;return a+(n&&+n[1]>1?" "+n[1]:"")}function sh(e,t,n){var a=e.length-1,r=Math.max(0,Math.min(a,n));if(t<0||t>a||t===r)return e;var i=e.slice(),s=i.splice(t,1)[0];return i.splice(r,0,s),i}function lh(e){return typeof e=="number"&&isFinite(e)?Np(e):e}function Oo(e,t,n){var a={};return e.dials.forEach(function(r){var i=t[r.key];i===void 0&&r.astridKey&&(i=t[r.astridKey]),n&&e.type==="delay"&&r.key==="delay_beats"&&(i=lh(i)),a[r.key]=e.plugin?Ye(r,i,r.step):Ye(r,i)}),e.dials.forEach(function(r){r.stepWhen&&(a[r.key]=Ye(r,typeof t[r.key]=="number"?t[r.key]:a[r.key],Jt(r,a)))}),a}function ch(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,r=1/0,i=e.min;i<=e.max;i++){var s=_t(n.law,i),l=s===null?1/0:Math.abs(s-t);l<r&&(r=l,a=i)}return a}}var dh={rate:"rate_hz"};function uh(e,t,n,a){var r={};return e.dials.forEach(function(i){if(!i.more){var s=i.astridKey||dh[i.key]||i.key;r[i.key]=ch(i,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function ph(e,t){var n=t>0?Math.floor(t):va,a=[],r=[],i=[],s=!1,l=!1;Array.isArray(e)?(i=e,l=!0):xt(e)&&Array.isArray(e.chain)&&(i=e.chain,s=e.v===1,l=e.schema===2);for(var u=[],d=0;d<i.length;d++){var c=i[d];if(xt(c)&&!(c.type==="limiter"||c.fixed===!0)){var p=xi(c.type),h=p&&de(p);if(!h&&!s&&Sl(c.type)){if(u.length>=n){a.push(c.id||c.type);continue}for(var g=ah(c.plugin,c.type),f=g.id.split(".").pop(),b=1;u.some(function(w){return w.id===f+"-"+b});)b++;var m=typeof c.id=="string"&&Ro.test(c.id)&&!u.some(function(w){return w.id===c.id})?c.id:f+"-"+b;u.push({id:m,type:c.type,bypass:c.bypass===!0,dials:rh(c.dials),plugin:g});continue}if(!h||s&&["drive","delay","plate"].indexOf(p)<0){typeof c.type=="string"&&a.push(c.type);continue}if(u.length>=n){a.push(c.id||p);continue}var y;xt(c.params)&&!xt(c.dials)?y=Oo(h,uh(h,c.params,r,c.id||p),l):y=Oo(h,xt(c.dials)?c.dials:{},l);var v=Rl(p,u),x=typeof c.id=="string"&&Ro.test(c.id)&&!u.some(function(w){return w.id===c.id})?c.id:v.id,A=s?c.bypass!==!1:c.bypass===!0,E={id:s?v.id:x,type:p,bypass:A,dials:y};h.plugin&&(E.plugin=Dl(h)),u.push(E)}}return{state:{v:eh,chain:u},dropped:a,notes:r}}function $t(e,t){return ph(e,t).state}function Ot(e){var t=de(e.type),n=[[0,e.bypass?0:1]];return t&&t.dials.forEach(function(a){n.push([a.k,ga(a,e.dials[a.key])])}),n}function hh(e){var t=$t(e,8),n=[],a=t.chain.filter(function(r){return r.plugin?(n.push(r.id+": ASTRID has no plugins"),!1):!0}).map(function(r,i){var s=de(r.type),l={};return i>=va&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(u){var d=r.dials[u.key];if(u.more){d!==u.default&&n.push(r.id+"."+u.key);return}u.key==="delay_beats"&&Dr.indexOf(d)<0&&n.push(r.id+".delay_beats"),l[u.astridKey||u.key]=d}),{id:r.id,type:r.type,bypass:r.bypass,dials:l}});return{hacks:a,lossy:n}}var mh=150,fh=6e3,gh=18,Ol=6.283185307179586;function Ha(e,t,n){return e<t?t:e>n?n:e}function bh(e,t,n,a,r){var i=Math.pow(10,n/40),s=Ol*t/r,l=Math.cos(s),u=Math.sin(s),d,c,p,h,g,f,b,m;if(e===0||e===2){b=u/2*Math.SQRT2,m=2*Math.sqrt(i)*b;var y=e===0?1:-1;d=i*(i+1-y*(i-1)*l+m),c=y*2*i*(i-1-y*(i+1)*l),p=i*(i+1-y*(i-1)*l-m),h=i+1+y*(i-1)*l+m,g=-y*2*(i-1+y*(i+1)*l),f=i+1+y*(i-1)*l-m}else b=u/(2*a),d=1+b*i,c=-2*l,p=1-b*i,h=1+b/i,g=-2*l,f=1-b/i;return[d/h,c/h,p/h,g/h,f/h]}function yh(e,t,n){var a=Ol*t/n,r=Math.cos(a),i=Math.sin(a),s=Math.cos(2*a),l=Math.sin(2*a),u=e[0]+e[1]*r+e[2]*s,d=-(e[1]*i+e[2]*l),c=1+e[3]*r+e[4]*s,p=-(e[3]*i+e[4]*l);return 10*Math.log10((u*u+d*d)/(c*c+p*p))}var Bo={};function ft(e){return Bo[e]||(Bo[e]=Sp("eq",e))}function jt(e,t){var n=ft(t),a=e&&typeof e[t]=="number"&&isFinite(e[t])?e[t]:n.default;return Ha(a,n.min,n.max)}function Bl(e){return[{id:"low",kind:0,hz:mh,db:jt(e,"low_db"),q:Math.SQRT1_2},{id:"mid",kind:1,hz:ga(ft("mid_hz"),jt(e,"mid_hz")),db:jt(e,"mid_db"),q:ga(ft("mid_q"),jt(e,"mid_q"))},{id:"high",kind:2,hz:fh,db:jt(e,"high_db"),q:Math.SQRT1_2}]}function wh(e,t,n){for(var a=Bl(e),r=n.length,i=new Float64Array(r),s=[],l=t/2,u=0;u<a.length;u++){var d=a[u],c=new Float64Array(r);if(d.db!==0)for(var p=bh(d.kind,d.hz,d.db,d.q,t),h=0;h<r;h++){var g=n[h]<l?n[h]:l*.9999;c[h]=yh(p,g,t),i[h]+=c[h]}s.push(c)}return{total:i,bands:s}}function vh(e){var t=ft("mid_hz").dsp.law;return Ha(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}function xh(e){var t=ft("mid_q").dsp.law;return Ha(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}var xa={low:"low_db",mid:"mid_db",high:"high_db"},kh={low:"Low",mid:"Mid",high:"High"};function $h(e,t,n){var a=[];function r(i,s){var l=ft(i),u=l.step||1;s=Ha(Math.round(s/u)*u,l.min,l.max),s===0&&(s=0),s!==jt(e,i)&&a.push([i,s])}return typeof n.db=="number"&&xa[t]&&r(xa[t],n.db),t==="mid"&&typeof n.hz=="number"&&n.hz>0&&r("mid_hz",vh(n.hz)),t==="mid"&&typeof n.q=="number"&&n.q>0&&r("mid_q",xh(n.q)),a}function Eh(e){var t=e==="mid"?["mid_db","mid_hz","mid_q"]:xa[e]?[xa[e]]:[];return t.map(function(n){return[n,ft(n).default]})}var Jn=typeof WeakMap=="function"?new WeakMap:null;function Sh(e){var t=e&&e.output;if(!t||!t.context||typeof t.context.createAnalyser!="function")return null;var n=Jn&&Jn.get(e);return n||(n={node:null,users:0,handle:null},n.handle={open:function(){return e.status==="disposed"?null:(n.node||(n.node=t.context.createAnalyser(),n.node.fftSize=4096,n.node.smoothingTimeConstant=.8,n.node.minDecibels=-110,n.node.maxDecibels=0),n.users++===0&&t.connect(n.node),n.node)},close:function(){if(n.users!==0&&--n.users===0&&n.node)try{t.disconnect(n.node)}catch{}}},Jn&&Jn.set(e,n)),n.handle}function Ah(e,t,n){var a=n||{},r={};["low_db","mid_db","mid_hz","mid_q","high_db"].forEach(function(c){var p=e&&typeof e.getParam=="function"?e.getParam(t,c):void 0;r[c]=typeof p=="number"?p:ft(c).default});var i=e&&e.output&&e.output.context,s=a.sampleRate||i&&i.sampleRate||48e3,l=a.help||{},u=Bl(r).map(function(c){var p=(c.db>0?"+":c.db<0?"−":"")+Math.abs(c.db)+" dB",h=c.hz>=1e3?(c.hz/1e3).toFixed(c.hz>=1e4?0:1)+" kHz":Math.round(c.hz)+" Hz";return{id:c.id,label:kh[c.id],kind:c.kind===0?"lowshelf":c.kind===1?"peak":"highshelf",hz:c.hz,db:c.db,q:c.q,moveHz:c.id==="mid",moveQ:c.id==="mid",minHz:c.id==="mid"?200:c.hz,maxHz:c.id==="mid"?5e3:c.hz,minQ:.3,maxQ:6,valueText:c.id==="mid"?p+" at "+h+", Q "+c.q.toFixed(1):p+(c.id==="low"?", shelf below ":", shelf above ")+h,help:l[c.id]}}),d=function(c){for(var p=0;p<c.length;p++)a.set(c[p][0],c[p][1])};return{type:"eqGraph",id:a.id,label:a.label||"EQ curve",range:gh,sampleRate:s,on:a.on!==!1,bands:u,help:l.graph,response:function(c){return wh(r,s,c)},spectrum:a.spectrum===!1?void 0:Sh(e)||void 0,onBand:function(c,p){d($h(r,c,p))},onReset:function(c){d(Eh(c).filter(function(p){return p[1]!==r[p[0]]}))}}}var Mh="nc-fx@1",Th=600,Lh=256,Ch=8,dn=typeof WeakMap=="function"?new WeakMap:null;function jl(e,t){var n=dn&&dn.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await gp(async()=>{const{default:i}=await import("./worklet-source-Dvdj1jcP.js");return{default:i}},[])).default,r=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),dn&&(dn.set(e,n),n.catch(function(){dn.delete(e)})),n)}function Bt(e,t){return typeof e=="number"&&isFinite(e)?e:t}function _l(e,t,n,a){var r=Math.min(400,Math.max(20,Bt(t.bpm,120))),i=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",u=Bt(t.preGain,1),d=Math.max(0,Bt(t.crossfade,.012)),c=Bt(t.maxDelaySeconds,void 0),p=e.createGain(),h=e.createGain(),g=e.createGain(),f=e.createGain(),b=null;t.modInput===!0&&(b=e.createGain(),b.channelCount=1,b.channelCountMode="explicit",b.channelInterpretation="discrete"),f.gain.value=0,p.connect(g),g.connect(h),f.connect(h);var m={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r,mUsers:0,lv:null,lvAt:0},y=n(r);m.post=function(w){m.node?m.node.port.postMessage(w):m.disposed||(i.length>=Lh&&(i=a().concat([{t:"tempo",bpm:m.bpm,when:0}]),m.mUsers>0&&i.push({t:"meter",on:!0})),i.push(w))};function v(w){var k=i.map(function(T){var M=Object.assign({},T);return M.when>w||(M.when=0,M.t!=="clear"&&(M.snap=!0)),M});return i=[],k}m.emit=function(w){for(var k=0;k<m.listeners.length;k++)try{m.listeners[k](w)}catch(T){typeof console<"u"&&console.error(T)}},m.whenOf=function(w){return typeof w=="number"&&isFinite(w)&&w>0?w:0};var x=!1;m.tooFar=function(w){return typeof w=="number"&&w>e.currentTime+Th?(!x&&typeof console<"u"&&(x=!0,console.warn("nc-fx: ignoring a time "+Math.round(w-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var A=jl(e,t.moduleUrl).then(function(){if(!m.disposed){var w=Object.assign({bpm:r,bypassMode:l,limiter:s,preGain:u,maxDelaySeconds:c},y);w.pending=v(e.currentTime),m.node=new AudioWorkletNode(e,Mh,{numberOfInputs:b?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:w}),m.node.port.onmessage=function(T){var M=T.data;if(M&&M.t==="lv"&&m.mUsers>0)m.lv=M.d,m.lvAt=jo();else if(M&&M.t==="perr"&&m.onPluginError&&M.d)for(var C=0;C<(M.n|0);C++)m.onPluginError(M.d[2*C],M.d[2*C+1])},p.connect(m.node),b&&b.connect(m.node,0,1),m.node.connect(f);var k=e.currentTime;k<=0||d===0?(g.gain.value=0,f.gain.value=1):(g.gain.setValueAtTime(1,k),g.gain.linearRampToValueAtTime(0,k+d),f.gain.setValueAtTime(0,k),f.gain.linearRampToValueAtTime(1,k+d)),m.status="ready"}},function(w){m.status="unavailable",i=[],m.error=w});m.meterOpen=function(){return m.disposed||m.status==="unavailable"?!1:(m.mUsers++===0&&m.post({t:"meter",on:!0}),!0)},m.meterClose=function(){m.mUsers!==0&&--m.mUsers===0&&(m.lv=null,m.disposed||m.post({t:"meter",on:!1}))},m.levels=function(){return m.lv&&jo()-m.lvAt<Nh?m.lv:null};var E={};return m.meter=function(w,k){if(E[w])return E[w];var T=0,M={in:0,out:0},C={open:function(){return m.meterOpen()?(T++,!0):!1},close:function(){T!==0&&(T--,m.meterClose())},read:function(){var F=T>0?m.levels():null;return M.in=0,M.out=0,F&&k(F,M),M}};return E[w]=C,C},m.core={input:p,output:h,modInput:b,ready:A,get status(){return m.status},get error(){return m.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function(w,k){var T=Bt(w,NaN);!(T>0)||m.disposed||m.tooFar(k)||(m.bpm=Math.min(400,Math.max(20,T)),m.post({t:"tempo",bpm:m.bpm,when:m.whenOf(k)}),m.emit({effect:null,key:"tempo",value:m.bpm}))},getTempo:function(){return m.bpm},clear:function(w){var k=w&&typeof w=="object"?w:{at:w};if(!(m.disposed||m.tooFar(k.at))){var T=Bt(k.fadeMs,0);m.post({t:"clear",when:m.whenOf(k.at),fadeMs:T>0?Math.min(1e3,T):0})}},onChange:function(w){return m.listeners.push(w),function(){var k=m.listeners.indexOf(w);k>=0&&m.listeners.splice(k,1)}},dispose:function(){if(!m.disposed){if(m.disposed=!0,m.status="disposed",i=[],m.listeners.length=0,m.node){m.node.port.postMessage({t:"dispose"}),m.node.port.close();try{m.node.disconnect()}catch{}}[p,g,f,h,b].forEach(function(w){try{w&&w.disconnect()}catch{}})}}},m}var Nh=250;function jo(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function ql(e,t){t.in=e[0],t.out=e[1]}function dr(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function ur(e,t){var n=t||{};if(n.slots)return Fh(e,n);var a=ya(n.state),r=Array.from(sr(a)),i=_l(e,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(sr(a)),when:0}]}),s=i.core;function l(u){return a.chain[ja.indexOf(u)]}return s.setParam=function(u,d,c,p){var h=ba(u);if(!(!h||i.disposed||i.tooFar(p))){var g=l(h),f;if(d==="bypass")f=!!c;else{var b=Ml(h,d);if(!b)return;f=Ye(b,c,Jt(b,g.dials))}return d==="bypass"?g.bypass=f:g.dials[d]=f,i.post({t:"p",i:Rr[h][d],v:Or(h,d,f),when:i.whenOf(p)}),i.emit({effect:h,key:d,value:f}),_a(h).dials.forEach(function(m){if(!(!m.stepWhen||!m.stepWhen.some(function(x){return x.key===d}))){var y=g.dials[m.key],v=Ye(m,y,Jt(m,g.dials));v!==y&&(g.dials[m.key]=v,i.post({t:"p",i:Rr[h][m.key],v:Or(h,m.key,v),when:i.whenOf(p)}),i.emit({effect:h,key:m.key,value:v}))}}),f}},s.meter=function(){return i.meter("",ql)},s.getParam=function(u,d){var c=ba(u);if(c){var p=l(c);return d==="bypass"?p.bypass:p.dials[d]}},s.getState=function(){return Pp(a)},s.setState=function(u,d){i.disposed||i.tooFar(d&&d.at)||(a=ya(u),i.post({t:"load",program:Array.from(sr(a)),when:i.whenOf(d&&d.at)}),i.emit({effect:null,key:null,value:null}))},s}function Fh(e,t){var n=t.slots===!0?va:Math.max(1,Math.min(Ch,Math.floor(+t.slots)||va)),a=$t(t.state,n),r=1,i={},s={};function l(w){return!Sl(w.type)||de(w.type)!==null}function u(w){var k=de(w.type);return k&&k.plugin?k.plugin.engine:w.type}function d(w){return i[w.id]||(i[w.id]=r++),i[w.id]}function c(w){return w.filter(l).map(function(k){return{uid:d(k),type:u(k),program:Ot(k)}})}function p(){return a.chain.filter(l).map(function(w){return i[w.id]})}var h=c(a.chain),g=p(),f=_l(e,t,function(){return{slots:n,chain:h,order:g}},function(){return[{t:"sync",chain:c(a.chain),order:p(),when:0}]}),b=f.core;f.onPluginError=function(w,k){for(var T in i)i[T]===w&&(s[T]=k,f.emit({effect:T,key:"error",value:k}))};function m(w){var k;for(k=0;k<a.chain.length;k++)if(a.chain[k].id===w)return a.chain[k];var T=xi(w);if(T){for(k=0;k<a.chain.length;k++)if(a.chain[k].type===T)return a.chain[k]}return null}function y(w,k){var T=d(w);f.post({t:"add",uid:T,type:u(w),when:k}),Ot(w).forEach(function(M){f.post({t:"ps",uid:T,k:M[0],v:M[1],when:k,snap:!0})})}function v(w){f.post({t:"order",uids:p(),when:w})}function x(w,k){var T={};a.chain.forEach(function(F){T[F.id]=F});var M=p().join();w.chain.forEach(function(F){var q=T[F.id];if(!l(F)){delete i[F.id];return}if(!q||q.type!==F.type||!i[F.id]){delete i[F.id],delete s[F.id],y(F,k);return}var U={};Ot(q).forEach(function(X){U[X[0]]=X[1]}),Ot(F).forEach(function(X){U[X[0]]!==X[1]&&f.post({t:"ps",uid:i[F.id],k:X[0],v:X[1],when:k})})});var C={};w.chain.forEach(function(F){C[F.id]=!0}),Object.keys(i).forEach(function(F){C[F]||delete i[F]}),Object.keys(s).forEach(function(F){C[F]||delete s[F]}),a=w,p().join()!==M&&v(k)}var A=Ep(function(w){if(!(f.disposed||!a.chain.some(function(T){return T.type===w}))){var k=JSON.parse(JSON.stringify(a));k.chain=k.chain.map(function(T){return T.type===w?$t({v:2,chain:[T]},1).chain[0]:T}),x(k,0),f.emit({effect:null,key:"plugin",value:w})}}),E=b.dispose;return b.dispose=function(){A(),E()},b.slots=n,b.meter=function(w){return w==null||w===""?f.meter("",ql):f.meter("#"+w,function(k,T){var M=m(w),C=M?i[M.id]:0,F=k[2];if(C){for(var q=3,U=0;U<F;U++,q+=3)if(k[q]===C){T.in=k[q+1],T.out=k[q+2];return}}})},b.setParam=function(w,k,T,M){var C=m(w);if(!(!C||f.disposed||f.tooFar(M))){var F=de(C.type),q,U=null;if(!F)return k!=="bypass"?void 0:(C.bypass=!!T,f.emit({effect:C.id,key:k,value:C.bypass}),C.bypass);if(k==="bypass")q=!!T;else{for(var X=0;X<F.dials.length;X++)F.dials[X].key===k&&(U=F.dials[X]);if(!U)return;q=Ye(U,T,Jt(U,C.dials))}var fe={},ge={};Ot(C).forEach(function(G){fe[G[0]]=G[1]}),F.dials.forEach(function(G){G.stepWhen&&(ge[G.key]=C.dials[G.key])}),k==="bypass"?C.bypass=q:C.dials[k]=q,F.dials.forEach(function(G){G.stepWhen&&(C.dials[G.key]=Ye(G,C.dials[G.key],Jt(G,C.dials)))});var re=f.whenOf(M),ie=i[C.id];return ie&&Ot(C).forEach(function(G){(fe[G[0]]!==G[1]||U&&G[0]===U.k)&&f.post({t:"ps",uid:ie,k:G[0],v:G[1],when:re})}),f.emit({effect:C.id,key:k,value:q}),Object.keys(ge).forEach(function(G){G!==k&&C.dials[G]!==ge[G]&&f.emit({effect:C.id,key:G,value:C.dials[G]})}),q}},b.getParam=function(w,k){var T=m(w);if(T)return k==="bypass"?T.bypass:T.dials[k]},b.getState=function(){return JSON.parse(JSON.stringify(a))},b.setState=function(w,k){f.disposed||f.tooFar(k&&k.at)||(x($t(w,n),f.whenOf(k&&k.at)),f.emit({effect:null,key:null,value:null}))},b.addEffect=function(w,k){var T=k||{},M=Rl(w,a.chain);if(!(!M||a.chain.length>=n||f.disposed||f.tooFar(T.at))){if(T.dials){var C=$t({v:2,chain:[{id:M.id,type:M.type,dials:T.dials}]},1).chain[0];M.dials=C.dials}T.bypass===!0&&(M.bypass=!0);var F=a.chain.slice(),q=typeof T.index=="number"?Math.max(0,Math.min(F.length,T.index)):F.length;return F.splice(q,0,M),x({v:2,chain:F},f.whenOf(T.at)),f.emit({effect:M.id,key:"chain",value:"add"}),M.id}},b.removeEffect=function(w,k){var T=m(w),M=k&&k.at;return!T||f.disposed||f.tooFar(M)?!1:(x({v:2,chain:a.chain.filter(function(C){return C!==T})},f.whenOf(M)),f.emit({effect:T.id,key:"chain",value:"remove"}),!0)},b.moveEffect=function(w,k,T){var M=m(w),C=T&&T.at;if(!M||f.disposed||f.tooFar(C))return!1;var F=sh(a.chain,a.chain.indexOf(M),k);return F===a.chain?!1:(x({v:2,chain:F},f.whenOf(C)),f.emit({effect:M.id,key:"chain",value:"move"}),!0)},b.getChain=function(){return a.chain.map(function(w){var k={id:w.id,type:w.type,name:oh(w),bypass:w.bypass};if(w.plugin){var T=s[w.id]||0,M=!l(w)||T===5;k.plugin={id:w.plugin.id,version:w.plugin.version,url:w.plugin.url,name:w.plugin.name,status:M?"missing":T?"failed":"ready"},T&&!M&&(k.plugin.error=wa[T]||wa[2])}return k})},b.toAstrid=function(){return hh(a)},b}function _o(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function Vl(e,t,n){var a=n||{},r=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,i=typeof a.toAudioTime=="function"?a.toAudioTime:r?function(h){return r.toContextTime(h)}:t&&t.timebase==="shared"?null:function(h){return h},s=typeof a.now=="function"?a.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,l=t&&t.transport?t.transport:t,u=l&&l.tempo?l.tempo:l,d=!1;function c(h){if(!i){!d&&typeof console<"u"&&(d=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof h!="number")){var g=i(l.timeAt(h));return typeof g=="number"&&isFinite(g)?g:void 0}}function p(){var h=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(h)){var g=l&&typeof l.bpm=="number"?l.bpm:_o(u,0);g>0&&e.setTempo(g);return}var f=_o(u,h);f>0&&e.setTempo(f);for(var b=u&&(u.points||u.tempoPoints)||[],m=0;m<b.length;m++){var y=b[m];if(y.beat>h&&y.bpm>0){var v=c(y.beat);v!==void 0&&e.setTempo(y.bpm,v)}}}return p(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(h){h&&(h.kind==="tempo"&&h.bpm>0?e.setTempo(h.bpm,c(h.atBeat)):(h.kind==="snapshot"||h.kind==="start")&&p())})}const $n="/studio/assets/worklet-C1cegAfk.js";var Ih="nc-ui",Ph={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FF2E97","nyx-amber":"#FEAA02","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},ki={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#9B30FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FF2E97","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},ka={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},zh={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},ut={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Dh={light:{color:Ph.color,semantic:ki,component:ka,runtime:zh},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FF2E97","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FF2E97","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},fn=e=>`--${Ih}-${e}`,Br=ki["label-on-fill-dark"],qo=ki["label-on-fill-light"],Rh=ut["label-min-contrast"],Oh=/^#[0-9a-f]{6}$/i,Bh=e=>typeof e=="string"&&Oh.test(e),da=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Vo(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),r=i=>{let s=(i+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${da(r(0)*255)}${da(r(8)*255)}${da(r(4)*255)}`}function Hl(e){let[t,n,a]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),r=Math.max(t,n,a),i=Math.min(t,n,a),s=(r+i)/2,l=r-i;if(!l)return{h:0,s:0,l:s};let u=l/(1-Math.abs(2*s-1));return{h:((r===t?60*((n-a)/l%6):r===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:u,l:s}}function Ho(e){let[t,n,a]=[1,3,5].map(r=>{let i=parseInt(e.slice(r,r+2),16)/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function jr(e,t){let[n,a]=[Ho(e),Ho(t)].sort((r,i)=>i-r);return(n+.05)/(a+.05)}var $a=e=>jr(e,Br)>=jr(e,qo)?Br:qo;function Ul(e,t,n,a=Rh){let r=Vo(e,t,n),i=$a(r)===Br?1:-1;for(let s=0;s<40&&jr(r,$a(r))<a;s++)n+=i*.01,r=Vo(e,t,n);return r}function jh(e){let{h:t,s:n}=Hl(e),a=Ul(t,Math.min(n,ut["surprise-on-max-saturation"]),ut["surprise-on-lightness"]);return{fill:e,ink:$a(e),on:a,onInk:$a(a)}}var _h=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function qh(e,t=Math.random){let[n,a]=ut["surprise-saturation"],[r,i]=ut["surprise-lightness"],s=ut["surprise-min-hue-gap"],l=Bh(e)?Hl(e).h:null,u=t()*360;return l!==null&&_h(u,l)<s&&(u=(l+s+t()*(360-2*s))%360),Ul(u,n+t()*(a-n),r+t()*(i-r))}function Vh(e){if(!e)return null;let t=jh(e);return{[fn("surprise-fill")]:t.fill,[fn("surprise-ink")]:t.ink,[fn("surprise-on")]:t.on,[fn("surprise-on-ink")]:t.onInk}}var Hh=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Uh=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Uo(e){let[t,n,a]=[1,3,5].map(l=>Hh(parseInt(e.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),i=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*r+.793617785*i-.0040720468*s,1.9779984951*r-2.428592205*i+.4505937099*s,.0259040371*r+.7827717662*i-.808675766*s]}function Gh([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,r=(e-.1055613458*t-.0638541728*n)**3,i=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*r+.2309699292*i,-1.2684380046*a+2.6097574011*r-.3413193965*i,-.0041960863*a-.7034186147*r+1.707614701*i].map(s=>da(Uh(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Wh=ut["velocity-range"],Gl={min:ka.rhythm["velocity-min"],max:ka.rhythm["velocity-max"]},Go=Object.fromEntries(Object.entries(Dh).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Kh(e,t=Gl){let[n,a]=Wh,r=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,i=(r-n)/(a-n),s=t.ink??ka.rhythm["step-cell-ink"];if(i<=0)return{velocity:r,t:0,fill:t.min.toUpperCase(),ink:s};if(i>=1)return{velocity:r,t:1,fill:t.max.toUpperCase(),ink:s};let l=Uo(t.min),u=Uo(t.max);return{velocity:r,t:i,fill:Gh(l.map((d,c)=>d+(u[c]-d)*i)),ink:s}}function Wo(e,t=Gl){return{[fn("velocity-fill")]:Kh(e,t).fill}}var Ea="data-nc-theme",_r="nc-ui-theme-change",Yh=Object.freeze(["system","light","dark"]),Xh="netcomposer.studio.theme.v1",Jh="(prefers-color-scheme: dark)",$i=e=>e?.documentElement??null,Wl=e=>e?.defaultView?.matchMedia?.(Jh)??null,Ei=e=>e==="light"||e==="dark"?e:"system";function Qh(e=globalThis.document){return Ei($i(e)?.getAttribute(Ea))}function Sa(e=globalThis.document){let t=Qh(e);return t!=="system"?t:Wl(e)?.matches?"dark":"light"}function Si(e,t=globalThis.document){let n=$i(t);if(!n)return"light";let a=Ei(e);a==="system"?n.removeAttribute(Ea):n.setAttribute(Ea,a);let r=Sa(t),i=t.defaultView?.CustomEvent;return i&&t.dispatchEvent(new i(_r,{detail:{choice:a,theme:r}})),r}function Kl(e,t=globalThis.document){let n=$i(t);if(!n)return()=>{};let a=Sa(t),r=()=>{let u=Sa(t);u!==a&&(a=u,e(u))},i=t.defaultView?.MutationObserver,s=i?new i(r):null;s?.observe(n,{attributes:!0,attributeFilter:[Ea]});let l=Wl(t);return l?.addEventListener?.("change",r),t.addEventListener(_r,r),()=>{s?.disconnect(),l?.removeEventListener?.("change",r),t.removeEventListener(_r,r)}}var Zh={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},em={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},tm={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},nm={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Ua={};for(let[e,t]of Object.entries(em))Ua[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(nm))Ua[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(tm))Ua[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(Zh.renames.map(e=>[e.old,e.new]));function Yl(e){let t=Ua[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function te(e){return Yl(e).prop}function o(e){return`var(${te(e)})`}function am(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(te(t)));return Number.isFinite(n)?n:0}function me(e,t){let n=Yl(t),a=e.ownerDocument??document,r=a.createElement("span");r.dataset.ncLive=t,r.style.position="absolute",r.style.pointerEvents="none";let i=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=i:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=i:r.style.color=i,(e instanceof Element?e:a.documentElement).append(r);let s=(a.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function Xl(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function rm(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=o("font-ui"),n.style.fontSize=o("label-size"),n.style.fontWeight=o("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var im="[data-modulated], [data-modulated] *",Jl="(orientation: landscape) and (max-height: 500px) and (max-width: 1023px)";function pr(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
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
`,e.head.append(t),hr=t}var un=null,lm=0,cm=new URL("/studio/assets/confirm-BSJWrX8s.css",import.meta.url).href,Zl=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=cm,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Zl(document);function Xe(e){return ec(e).then(t=>!!t.ok)}function ec({title:e,body:t,confirmLabel:n="Confirm",cancelLabel:a="Cancel",danger:r=!1,root:i,returnFocus:s,signal:l},u){if(un||l?.aborted)return Promise.resolve({});let d=i?.ownerDocument??document,c=Zl(d),p=i??d.body,h=d.defaultView??globalThis,g=`nc-ui-confirm-${++lm}`,f=(K,be,ve)=>{let pe=d.createElement(K);return pe.className=`nc-ui-confirm${be}`,ve!=null&&(pe.textContent=ve),pe},b=f("div","-layer");b.dataset.state="enter";let m=f("div","");m.setAttribute("role","alertdialog"),m.setAttribute("aria-modal","true"),m.setAttribute("aria-labelledby",`${g}-t`),m.setAttribute("aria-describedby",`${g}-b`);let y=f("h2","-title",e);y.id=`${g}-t`;let v=f("p","-body",t);v.id=`${g}-b`;let x=f("div","-actions"),A=(K,be)=>{let ve=f("button","-btn",K);return ve.type="button",ve.dataset.ncConfirm=be,ve.addEventListener("click",()=>ze(be==="ok")),ve},E=A(a,"cancel"),w=A(n,"ok");r&&(w.dataset.danger="true"),x.append(E,w);let[k,T]=u?.(f,w)??[];m.append(y,v,...k?[k]:[],x);let M=[T,E,w].filter(Boolean);b.append(m);let C={layer:b};un=C;let F=s??d.activeElement,q=[];for(let K of p.children)K.hasAttribute("inert")||(K.setAttribute("inert",""),q.push(K));let U=()=>{if(un!==C)return;p.append(b),(T??E).focus({preventScroll:!0});let K=h.requestAnimationFrame?.bind(h)??(be=>setTimeout(be,16));K(()=>K(()=>{b.dataset.state==="enter"&&(b.dataset.state="open")}))};c?c.then(U):U();let X=!1;b.addEventListener("pointerdown",K=>{X=K.target===b}),b.addEventListener("click",K=>{K.target===b&&X&&ze(!1),X=!1});let fe=K=>{if(K.stopImmediatePropagation(),K.key==="Escape")K.preventDefault(),ze(!1);else if(K.key==="Tab"){K.preventDefault();let be=M.filter(pe=>!pe.disabled),ve=be.length;be[(be.indexOf(d.activeElement)+(K.shiftKey?ve-1:1))%ve].focus()}else K.key==="Enter"&&(K.preventDefault(),d.activeElement===E?ze(!1):w.disabled||ze(!0))},ge=K=>K.stopImmediatePropagation();h.addEventListener("keydown",fe,!0),h.addEventListener("keyup",ge,!0);let re=()=>ze(!1);l?.addEventListener("abort",re);let ie,G=new Promise(K=>{ie=K});function ze(K){if(un!==C)return;un=null,h.removeEventListener("keydown",fe,!0),h.removeEventListener("keyup",ge,!0),l?.removeEventListener("abort",re);for(let De of q)De.removeAttribute("inert");b.dataset.state="closing",F?.isConnected&&typeof F.focus=="function"&&F.focus({preventScroll:!0});let be=h.getComputedStyle?.(b),ve=Math.max(0,...String(be?.transitionDuration??"").split(",").map(De=>Number.parseFloat(De)*(De.trim().endsWith("ms")?1:1e3)||0)),pe=()=>b.remove();b.addEventListener("transitionend",De=>De.target===b&&pe()),setTimeout(pe,ve+50),ie({ok:K,value:T?.value.trim()})}return G}function dm(e){let t=e.field??{};return ec(e,(n,a)=>{let r=n("label","-field"),i=n("input","-input");i.type=t.type??"text",i.value=t.value??"",t.placeholder&&(i.placeholder=t.placeholder),i.spellcheck=!1,i.autocomplete="off";let s=()=>{a.disabled=i.value.trim()===""};return i.addEventListener("input",s),s(),r.append(n("span","-label",t.label??""),i),[r,i]}).then(n=>n.ok?n.value:null)}function Ai(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.dataset.ncOn="",r.textContent=e.onText??"On";let i=t.createElement("span");i.dataset.ncOff="",i.textContent=e.offText??"Off",a.append(r,i),n.append(a);let s=!1,l=d=>{s=d===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let u=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",u),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",u),n.remove()}}}var tc=new WeakMap,Yo=.25;function um(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(a,r);let i=0,s=e.step??.005,l=e.onChange,u=e.onReset,d=m=>Math.min(1,Math.max(0,m)),c=()=>{n.style.setProperty("--fader-pos",String(i)),n.setAttribute("aria-valuenow",String(Math.round(i*1e3)/1e3))},p=m=>{let y=d(m);y!==i&&(i=y,c(),l?.(y))},h=0,g=!1;n.addEventListener("pointerdown",m=>{if(m.button!==0)return;m.preventDefault(),n.focus?.({preventScroll:!0});let y=n.getBoundingClientRect();m.target!==r&&y.height>0&&p(1-(m.clientY-y.top)/y.height),h=m.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(m.pointerId)}),n.addEventListener("pointermove",m=>{if(!g)return;let y=n.getBoundingClientRect().height||1,v=(h-m.clientY)/y*(m.shiftKey?Yo:1);h=m.clientY,p(i+v)});let f=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",f),n.addEventListener("pointercancel",f),n.addEventListener("lostpointercapture",f),n.addEventListener("dblclick",m=>{m.preventDefault(),u?.()}),n.addEventListener("keydown",m=>{let y=m.shiftKey?s*Yo:s,v={ArrowUp:i+y,ArrowRight:i+y,ArrowDown:i-y,ArrowLeft:i-y,PageUp:i+s*10,PageDown:i-s*10,Home:0,End:1};m.key in v&&(m.preventDefault(),p(v[m.key]))});let b={el:n,get value(){return i},get dragging(){return g},set(m){g||(i=d(Number(m)||0),c())},setText(m){m?n.setAttribute("aria-valuetext",m):n.removeAttribute("aria-valuetext")},setLabel(m){n.setAttribute("aria-label",m)},configure(m){typeof m.step=="number"&&m.step>0&&(s=m.step),m.onChange&&(l=m.onChange),m.onReset&&(u=m.onReset)}};return b.setLabel(e.label),b.set(e.value??0),b.setText(e.valueText),tc.set(n,b),b}function pm(e){return tc.get(e)}var nc=new WeakMap,hm=.2,mm=1.5,fm=.5;function gm(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function Xo(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:gm(a.getComputedStyle(e).getPropertyValue(te(t)),n)}function bm(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let r=t.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let i=t.createElement("div");i.className="nc-meter-bars",i.setAttribute("aria-hidden","true");let s=[];for(let b=0;b<n;b++){let m=t.createElement("span");m.className="nc-meter-bar";let y=t.createElement("span");y.className="nc-meter-peak";let v=t.createElement("span");v.className="nc-meter-rms";let x=t.createElement("span");x.className="nc-meter-hold",m.append(y,v,x),i.append(m),s.push({peak:y,rms:v,hold:x,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(r,i);let l=e.label,u=e.onClear,d=!1,c=-1,p=-1,h=()=>{r.dataset.lit=d?"true":"false",r.setAttribute("aria-pressed",d?"true":"false"),r.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),r.title=d?"Clipped. Click to clear":"Clip light"},g=(b,m,y,v)=>{let x=Math.round(v*1e3)/1e3;y[m]!==x&&(y[m]=x,b.style.transform=m==="hold"?`translateY(${Math.round((1-x)*1e3)/10}%)`:`scaleY(${x})`)};r.addEventListener("click",()=>{f.clear(),u?.()});let f={el:a,get clipped(){return d},update(b,m){c<0&&(c=Xo(a,"motion-meter-fall",hm)),p<0&&(p=Xo(a,"motion-meter-hold",mm));let y=Math.max(0,Math.min(.25,Number(m)||0)),v=c>0?Math.exp(-y/c):0;s.forEach((x,A)=>{let E=b[A]??b[0]??{peak:0,rms:0},w=Math.min(1,Math.max(0,Number(E.peak)||0)),k=Math.min(w,Math.max(0,Number(E.rms)||0));E.over&&f.clip(),x.level.peak=w>=x.level.peak?w:w+(x.level.peak-w)*v,x.level.rms=k>=x.level.rms?k:k+(x.level.rms-k)*v,x.holdAge+=y,w>=x.holdAt?(x.holdAt=w,x.holdAge=0):x.holdAge>p&&(x.holdAt=Math.max(w,x.holdAt-fm*y)),g(x.peak,"peak",x.shown,x.level.peak),g(x.rms,"rms",x.shown,x.level.rms),g(x.hold,"hold",x.shown,x.holdAt),x.hold.dataset.off=x.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,h())},clear(){d=!1,h()},reset(){for(let b of s)b.level.peak=0,b.level.rms=0,b.holdAt=0,b.holdAge=0,g(b.peak,"peak",b.shown,0),g(b.rms,"rms",b.shown,0),g(b.hold,"hold",b.shown,0),b.hold.dataset.off="true"},setLabel(b){l=b,h()},configure(b){b.onClear&&(u=b.onClear)}};return h(),f.reset(),nc.set(a,f),f}function ac(e){return e?nc.get(e):void 0}var ym=3,wm=new Set(["freq","q","rate","time","log"]);function Mi(e,t,n){return!e||!wm.has(e)||!(n>t)?"linear":t>0?"log":"power"}function Ga(e,t,n){return Mi(e,t,n)!=="linear"}function Aa(e,t,n,a){let r=Number(a);if(!(n>t)||!Number.isFinite(r))return 0;let i=Math.min(n,Math.max(t,r)),s=Mi(e,t,n);if(s==="log")return Math.log(i/t)/Math.log(n/t);let l=(i-t)/(n-t);return s==="power"?Math.cbrt(l):l}function rc(e,t,n,a){let r=Math.min(1,Math.max(0,Number(a)||0)),i=Mi(e,t,n);return i==="log"?t*(n/t)**r:t+(n-t)*(i==="power"?r**ym:r)}function ic(e,t,n,a){let r=Math.min(n,Math.max(t,e));if(a>0){r=t+Math.round((r-t)/a)*a;let i=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));r=Number(r.toFixed(i)),r=Math.min(n,Math.max(t,r))}return r}function Ti(e,t,n,a){return Math.round(Aa(e,t,n,a)*1e3)}function qr(e,t,n,a,r){return ic(rc(e,t,n,Number(a)/1e3),t,n,r)}function vm(e,t,n=!1){let a=Number(e)||0,r=n?1:1e3/100,i=null;return t==="ArrowRight"||t==="ArrowUp"?i=a+r:t==="ArrowLeft"||t==="ArrowDown"?i=a-r:t==="PageUp"?i=a+1e3/10:t==="PageDown"?i=a-1e3/10:t==="Home"?i=0:t==="End"&&(i=1e3),i===null?null:Math.min(1e3,Math.max(0,Math.round(i)))}function oc(e,t,n,a,r,i=!1,s){let l=Ti(e,t,n,a),u=vm(l,r,i);if(u===null)return null;let d=qr(e,t,n,u,s),c=Math.sign(u-l),p=ic(Number(a),t,n,s);for(;c!==0&&d===p&&u>0&&u<1e3;)u+=c,d=qr(e,t,n,u,s);return d}function Jo(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function Qo(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function xm(e,t,n,a=n/6){let r=e.some(c=>c===null),i=Math.max(0,n-(r?a:0)),s=e.reduce((c,p,h)=>p===null?c:c+Qo(t[h]),0),l=s>0?i/s:0,u=e.map(c=>c===null?0:Math.min(i,Qo(c)*l));if(r){let c=u.reduce((h,g)=>h+g,0),p=e.indexOf(null);u[p]=Math.max(a,n-c)}let d=[0];for(let c of u)d.push(Math.round((d[d.length-1]+c)*100)/100);return r&&(d[d.length-1]=n),d}function km(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(t*a)),i=Math.max(1,Math.floor(n*a));(e.width!==r||e.height!==i)&&(e.width=r,e.height=i);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function at(e){return Math.max(0,Math.min(1,e))}function sc(e,t){let{ctx:n,w:a,h:r}=km(e);if(!n)return;n.clearRect(0,0,a,r);let i=rm(e);if(t.paint==="swatch"){let u=me(e,"accent"),d=me(e,"rhythm.step-cell-on");e.dataset.ncAccent=u,e.dataset.ncStep=d,n.fillStyle=u,n.fillRect(0,0,a/2,r),n.fillStyle=d,n.fillRect(a/2,0,a/2,r);return}if(t.paint==="filter"&&typeof t.hz=="number"){Sm(n,a,r,t,e,i);return}if(t.paint==="filter"){let u=t.mode??"lp",d=me(e,Xl(u)),c=me(e,"divider"),p=at(t.cutoff??.5),h=.08+(1-at(t.resonance??.2))*.22;n.strokeStyle=c,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(a,r*.72),n.stroke(),n.beginPath();for(let g=0;g<=a;g++){let f=g/Math.max(1,a),b=0;u==="lp"?b=f<p?1:Math.max(0,1-(f-p)/h):u==="hp"?b=f>p?1:Math.max(0,1-(p-f)/h):b=Math.max(0,1-Math.abs(f-p)/h);let m=r*.78-b*r*.62;g===0?n.moveTo(g,m):n.lineTo(g,m)}n.strokeStyle=d,n.stroke(),n.fillStyle=me(e,"text-sub"),n.font=i,n.fillText(u.toUpperCase(),0,r),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=me(e,"accent");let u=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[c,p,h]=xm([u,d],t.max??[1,4],a),g=2,f=r-1;n.beginPath(),n.moveTo(c,f),n.lineTo(p,g);let b=Math.max(1,Math.ceil(h-p));for(let m=1;m<=b;m++){let y=m/b;n.lineTo(p+(h-p)*y,f-(f-g)*Math.exp(-4.6*y)*(1-y*.01))}n.lineTo(h,f),n.lineTo(a,f),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let u=Array.isArray(t.peaks)?t.peaks:[],[d,c]=Array.isArray(t.region)?t.region:[0,1],p=me(e,"accent"),h=me(e,"text-sub"),g=r/2;n.fillStyle=me(e,"accent-soft"),n.fillRect(at(d)*a,0,(at(c)-at(d))*a,r),n.strokeStyle=me(e,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(a,g),n.stroke();let f=Math.floor(u.length/2);for(let b=0;b<f;b++){let m=(b+.5)/f*a,y=Math.max(-1,Math.min(1,u[b*2]??0)),v=Math.max(-1,Math.min(1,u[b*2+1]??0)),x=(b+.5)/f;n.strokeStyle=x>=d&&x<=c?p:h,n.beginPath(),n.moveTo(m,g-v*(g-1)),n.lineTo(m,g-y*(g-1)+.5),n.stroke()}n.strokeStyle=p;for(let b of[d,c,...Array.isArray(t.markers)?t.markers:[]]){let m=Math.round(at(b)*(a-1))+.5;n.beginPath(),n.moveTo(m,0),n.lineTo(m,r),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=me(e,"text"),n.fillRect(Math.round(at(t.position)*(a-1)),0,1,r)),f||(n.fillStyle=h,n.font=i,n.fillText(t.empty??"Empty",0,g+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let u=at(t.level??0);n.fillStyle=me(e,"divider"),n.fillRect(0,r*.4,a,r*.2),n.fillStyle=me(e,"accent"),n.fillRect(0,r*.4,a*u,r*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=me(e,"rhythm.step-cell-off"),n.fillRect(0,r*.45,a,r*.1),n.fillStyle=me(e,"rhythm.playhead"),n.fillRect(l/s*a,r*.3,Math.max(1,a/s),r*.4),e.dataset.ncAccent=me(e,"accent")}var En=20,Vr=2e4,mr=24,Zo=-60;function $m(e,t,n,a,r=48e3){let i=2*Math.PI*Math.min(t,r*.49)/r,s=Math.cos(i),l=Math.sin(i)/(2*n),u,d,c;e==="hp"?[u,d,c]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[u,d,c]=[l,0,-l]:[u,d,c]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,h=-2*s,g=1-l,f=2*Math.PI*a/r,b=(x,A,E)=>x+A*Math.cos(f)+E*Math.cos(2*f),m=(x,A)=>-(x*Math.sin(f)+A*Math.sin(2*f)),y=Math.hypot(b(u,d,c),m(d,c)),v=Math.hypot(b(p,h,g),m(h,g));return v>0?y/v:0}function Em(e,t){return Math.log(Math.max(En,Math.min(Vr,e))/En)/Math.log(Vr/En)*t}function es(e,t,n){let a=Math.max(Zo,Math.min(mr,e));return t+(mr-a)/(mr-Zo)*(n-t)}function Sm(e,t,n,a,r,i){let s=a.mode??"lp",l=me(r,Xl(s)),u=me(r,"divider"),d=me(r,"text-sub"),c=Number.parseFloat(String(i).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,h=Math.max(p+4,n-c-3),g=a.q??Math.SQRT1_2,f=Math.round(es(0,p,h))+.5;e.strokeStyle=u,e.lineWidth=1,e.beginPath(),e.moveTo(0,f),e.lineTo(t,f),e.stroke(),e.beginPath();for(let b=0;b<=t;b++){let m=En*(Vr/En)**(b/Math.max(1,t)),y=a.open?1:$m(s,a.hz,g,m,a.sampleRate),v=es(20*Math.log10(Math.max(1e-5,y)),p,h);b===0?e.moveTo(b,v):e.lineTo(b,v)}if(e.strokeStyle=l,e.stroke(),!a.open){let b=Math.round(Em(a.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(b,p),e.lineTo(b,h),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=i,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",r.dataset.ncAccent=l,r.dataset.ncFilterHz=String(Math.round(a.hz))}function Be(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let r=n.defaultView.getComputedStyle(a).color;return a.remove(),r}function Am(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var Tt=20,jn=2e4,Li=Math.log(jn/Tt),Hr=32,Mm=250,Tm=-100,Lm=1200,Cm=4.5,ts=-6,kt=-96,Nm=48,ns=[100,1e3,1e4],Fm=[6,12];function Gt(e,t){return Math.log(Math.max(Tt,Math.min(jn,e))/Tt)/Li*t}function ua(e,t){return Tt*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Li)}function pt(e,t,n,a){let r=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*r}function Ur(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var lc=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Im(e,t,n,a){let r=n?3:1,i=u=>({db:Math.max(-a,Math.min(a,e.db+u*r))}),s=u=>({hz:Math.max(e.minHz??Tt,Math.min(e.maxHz??jn,e.hz*2**(u*r/6)))}),l=u=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(u*r)))});switch(t){case"ArrowUp":return i(1);case"ArrowDown":return i(-1);case"ArrowRight":return e.moveHz?s(1):i(1);case"ArrowLeft":return e.moveHz?s(-1):i(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Ci(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function Pm(e,t,n,a,r,i,s,l,u){let d=u?.25:1,c={},p=Math.max(1,i/2-l);if(c.db=Math.max(-s,Math.min(s,t.db-a*d/p*s/Ci(e))),e.moveHz){let h=t.hz*Math.exp(n*d/Math.max(1,r)*Li);c.hz=Math.max(e.minHz??Tt,Math.min(e.maxHz??jn,h))}return c}function zm(e,t,n,a,r){let i=Math.max(0,n.left)+1,s=Math.min(n.right,r)-1,l=Math.min(t.width*3+a*2,s-i),u=Math.max(i,Math.min(e.left,s-l));return{left:Math.round(u-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var ye=new WeakMap;function Dm(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let r=document.createElement("canvas");r.className="nc-eq-spectrum",r.setAttribute("aria-hidden","true");let i=document.createElement("canvas");i.className="nc-eq-curve",i.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(r,i);for(let u of e.bands)a.append(Rm(n,u,t));a.append(s),a.addEventListener("click",u=>{if(!mc(n)||u.button>0)return;let d=hc(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),ye.set(n,{control:e,cache:null,spec:null,active:null}),dc(n,e),n}function cc(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function Rm(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let r=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},i=()=>r()?.bands.find(d=>d.id===t.id)??null,s=null;a.addEventListener("pointerdown",d=>{if(d.button!==0)return;let c=i();c&&(d.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(d.pointerId),s={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:c.hz,db:c.db}},a.dataset.drag="true",rt(e,t.id))}),a.addEventListener("pointermove",d=>{if(!s||d.pointerId!==s.id)return;let c=r(),p=i(),h=ye.get(e);if(!c||!p||!h?.box)return;let{w:g,h:f,pad:b}=h.box;c.onBand(p.id,Pm(p,s.start,d.clientX-s.x,d.clientY-s.y,g,f,c.range??18,b,d.shiftKey))});let l=d=>{!s||d.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&rt(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",d=>{d.preventDefault(),r()?.onReset?.(t.id)}),a.addEventListener("keydown",d=>{let c=r(),p=i();if(!c||!p)return;let h=Im(p,d.key,d.shiftKey,c.range??18);h&&(d.preventDefault(),h==="reset"?c.onReset?.(p.id):c.onBand(p.id,h),rt(e,p.id))});let u=null;return a.addEventListener("wheel",d=>{let c=r(),p=i();if(!c||!p?.moveQ)return;d.preventDefault();let h=d.timeStamp;(!u||h-u.t>400)&&(u={q:p.q,t:h});let g=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;u.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,u.q*2**(-g/240))),u.t=h,c.onBand(p.id,{q:u.q}),rt(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>rt(e,t.id)),a.addEventListener("focus",()=>rt(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&rt(e,null)}),a.addEventListener("blur",()=>{s||rt(e,null)}),a}function rt(e,t){let n=ye.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?Qt(e):Ni(e)}function Ni(e){let t=ye.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(f=>f.id===t.active):null;for(let f of e.querySelectorAll(".nc-eq-node"))f instanceof HTMLElement&&(a&&f.dataset.band===a.id?f.dataset.active="true":delete f.dataset.active);if(!a||!t.box){n.hidden=!0;return}let r=[a.label,lc(a.db)];a.kind==="peak"?r.push(Ur(a.hz),`Q ${a.q.toFixed(1)}`):r.push(`${a.kind==="lowshelf"?"below":"above"} ${Ur(a.hz)}`),n.textContent=r.join(" · "),n.dataset.tone=String(Om(t.control,a)),n.hidden=!1;let{w:i,h:s,pad:l}=t.box,u=Gt(a.hz,i),d=pt(a.db*Ci(a),s,t.control.range??18,l),c=n.offsetWidth,p=n.offsetHeight,h=Math.max(0,Math.min(i-c,u-c/2)),g=d-p-l*1.5>=0?d-p-l*1.5:Math.min(s-p,d+l*1.5);n.style.left=`${Math.round(h)}px`,n.style.top=`${Math.round(g)}px`}function Om(e,t){return e.bands.indexOf(t)%3+1}function dc(e,t){let n=ye.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Fi(e);let a=t.range??18;t.bands.forEach((r,i)=>{let s=cc(e,r.id);s instanceof HTMLElement&&(s.dataset.tone=String(i%3+1),s.dataset.kind=r.kind,s.setAttribute("aria-label",`${r.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(r.db)),s.setAttribute("aria-valuetext",r.valueText??`${lc(r.db)}, ${Ur(r.hz)}`),s.setAttribute("aria-keyshortcuts",r.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),r.help?s.setAttribute("data-nc-help",r.help):s.removeAttribute("data-nc-help"))}),Qt(e),Hm(e)}function uc(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.round(t*a)),i=Math.max(1,Math.round(n*a));(e.width!==r||e.height!==i)&&(e.width=r,e.height=i);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function pc(e){return{curve:Be(e,"eq-curve"),fill:Be(e,"eq-fill"),quiet:Be(e,"text-sub"),grid:Be(e,"eq-grid"),zero:Be(e,"divider"),label:Be(e,"text-sub"),spectrum:Be(e,"eq-spectrum"),bands:[Be(e,"eq-band-1"),Be(e,"eq-band-2"),Be(e,"eq-band-3")]}}function Bm(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Qt(e){ye.has(e)&&Fi(e);let t=ye.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:r,w:i,h:s}=uc(n);if(!r)return;let l=Math.max(8,Math.round(s*.06)),u=a.range??18;t.box={w:i,h:s,pad:l},t.colours=pc(e);let d=t.colours,c=Bm(a,i);if(!t.cache||t.cache.key!==c){let A=Math.max(64,Math.ceil(i)+1),E=new Float64Array(A);for(let k=0;k<A;k++)E[k]=ua(k/(A-1)*i,i);let w=null;try{w=typeof a.response=="function"?a.response(E):null}catch{w=null}t.cache={key:c,freqs:E,total:w?.total??new Float64Array(A),bands:w?.bands??[]}}r.clearRect(0,0,i,s);let p=Am(e),h=a.on!==!1;jm(r,i,s,u,l,d,p);let{freqs:g,total:f,bands:b}=t.cache,m=Array.from(g,A=>Gt(A,i)),y=pt(0,s,u,l);b.forEach((A,E)=>{if(!A||!A.some(T=>Math.abs(T)>.05))return;let w=h?d.bands[E%3]:d.quiet,k=Array.from(A,T=>pt(T,s,u,l));r.save(),t.active&&a.bands[E]?.id===t.active&&(r.globalAlpha=.14,r.fillStyle=w,as(r,m,k,y)),r.globalAlpha=h?.75:.4,r.strokeStyle=w,r.lineWidth=.75,fr(r,m,k),r.restore()});let v=Array.from(f,A=>pt(A,s,u,l)),x=h?d.curve:d.quiet;r.save(),r.fillStyle=h?d.fill:d.quiet,r.globalAlpha=h?.2:.08,as(r,m,v,y),r.restore(),r.save(),r.strokeStyle=h?d.fill:x,r.lineJoin="round",r.lineCap="round",h&&(r.globalAlpha=.16,r.lineWidth=4,fr(r,m,v)),r.globalAlpha=1,r.strokeStyle=x,r.lineWidth=1.25,fr(r,m,v),r.restore(),_m(e),Ni(e)}function jm(e,t,n,a,r,i,s){e.save(),e.lineWidth=1;for(let u=10;u<=1e4;u*=10)for(let d=1;d<=9;d++){let c=u*d;if(c<Tt||c>jn)continue;let p=Math.round(Gt(c,t))+.5;e.globalAlpha=ns.includes(c)?.9:.35,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let u of Fm)if(!(u>a))for(let d of[1,-1]){let c=Math.round(pt(u*d,n,a,r))+.5;e.globalAlpha=u===12?.75:.4,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(0,c),e.lineTo(t,c),e.stroke()}e.globalAlpha=1,e.strokeStyle=i.zero;let l=Math.round(pt(0,n,a,r))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=i.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let u of ns){let d=u>=1e3?`${u/1e3}k`:String(u),c=e.measureText(d).width,p=Gt(u,t)+3;e.fillText(d,p+c+2>t?Gt(u,t)-c-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let u of[12,0,-12]){if(Math.abs(u)>a)continue;let d=pt(u,n,a,r);e.fillText(u>0?`+${u}`:u<0?`−${-u}`:"0",t-3,Math.round(d)-1)}e.restore()}function Ma(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let r=(t[a]+t[a+1])/2,i=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],r,i)}e.lineTo(t[t.length-1],n[n.length-1])}function fr(e,t,n){e.beginPath(),Ma(e,t,n),e.stroke()}function as(e,t,n,a){e.beginPath(),Ma(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function hc(e){return e.closest("[data-nc-maxable]")}function mc(e){let t=hc(e);return!!t&&!t.hasAttribute("data-nc-max")}function Fi(e){let t=mc(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=ye.get(e);n?.active&&(n.active=null,Ni(e))}return t}function _m(e){Fi(e);let t=ye.get(e);if(!t?.box)return;let{w:n,h:a,pad:r}=t.box,i=t.control.range??18;for(let s of t.control.bands){let l=cc(e,s.id);l instanceof HTMLElement&&(l.style.left=`${Gt(s.hz,n).toFixed(1)}px`,l.style.top=`${pt(s.db*Ci(s),a,i,r).toFixed(1)}px`)}}function qm(e,t,n,a){let r=a/2/n,i=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let u=0;u<e;u++){let d=(u-.5)/(e-1)*t,c=(u+.5)/(e-1)*t,p=ua(d,t),h=ua(c,t),g=ua(u/(e-1)*t,t);i[u]=Math.min(n-1,p/r),s[u]=Math.min(n-1,h/r),l[u]=Cm*Math.log2(g/1e3)}return{lo:i,hi:s,tilt:l}}function Vm(e,t,n){let a=Math.floor(t),r=Math.ceil(n);if(r-a<=1){let s=t-a,l=e[a]??-1/0,u=e[Math.min(e.length-1,a+1)]??l;return l+(u-l)*s}let i=-1/0;for(let s=a;s<=r&&s<e.length;s++)e[s]>i&&(i=e[s]);return i}function Hm(e){let t=ye.get(e);if(t){if(!t.control.spectrum){gc(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let r=ye.get(e)?.spec;r&&(r.visible=a.some(i=>i.isIntersecting),Gr(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Gr(e)}}function Gr(e){let t=ye.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){fc(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Wr(e),n.onVis||(n.onVis=()=>Gr(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Kr(e,!1)}function Wr(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function Kr(e,t){let n=ye.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,gr(e,Wr(e))),Mm):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(r=>(n.raf=0,gr(e,r))):n.timer=a.setTimeout(()=>(n.timer=0,gr(e,Wr(e))),Hr))}function fc(e){let t=ye.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function gc(e){let t=ye.get(e)?.spec;if(!t)return;fc(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=ye.get(e);n&&(n.spec=null)}function gr(e,t){let n=ye.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){gc(e);return}if(!a.analyser)return;if(t-a.last<Hr-4&&!a.idle){Kr(e,!1);return}let r=a.last?Math.min(.25,(t-a.last)/1e3):Hr/1e3;a.last=t;let i=e.querySelector(".nc-eq-spectrum");if(!(i instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:u}=uc(i);if(!s)return;let d=Math.max(16,Math.round(l/2)),c=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==d||a.map.w!==l||a.map.sr!==c)&&(a.map={cols:d,w:l,sr:c,...qm(d,l,a.buf.length,c)},a.disp=new Float32Array(d).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,h=Nm*r,{lo:g,hi:f,tilt:b}=a.map;for(let y=0;y<d;y++){let v=Vm(a.buf,g[y],f[y]);v>p&&(p=v);let x=v+b[y],A=a.disp[y]-h;a.disp[y]=x>A?x:A}p>Tm&&(a.loud=t);let m=t-a.loud>Lm;s.clearRect(0,0,l,u),(!m||a.disp.some(y=>y>kt))&&Um(s,l,u,a.disp,n.colours??pc(e)),a.idle=m&&!a.disp.some(y=>y>kt),Kr(e,a.idle)}function Um(e,t,n,a,r){let i=a.length,s=new Array(i),l=new Array(i),u=d=>{let c=a[Math.max(0,Math.min(i-1,d))];return Number.isFinite(c)?c:kt};for(let d=0;d<i;d++){let c=u(d)*.36+(u(d-1)+u(d+1))*.22+(u(d-2)+u(d+2))*.1,p=(Math.max(kt,Math.min(ts,Number.isFinite(c)?c:kt))-kt)/(ts-kt);s[d]=d/(i-1)*t,l[d]=n-p*n}e.save(),e.fillStyle=r.spectrum,e.globalAlpha=.13,e.beginPath(),Ma(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=r.spectrum,e.lineWidth=1,e.beginPath(),Ma(e,s,l),e.stroke(),e.restore()}var Gm=.8912509381337456,Yr=32,Wm=250,Km=1200,Ym=.2,bc=1.5;function Xm(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function Jm(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let r=e.createElement("span");r.className="nc-fx-level-fill",a.append(r),t.append(a)}return t}var Ta=new WeakMap,rs=new WeakMap;function is(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let r=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),i=Number.parseFloat(r);return Number.isFinite(i)?r.endsWith("ms")?i/1e3:i:n}function Qm(e){let t=rs.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(r=>{for(let i of r){let s=Ta.get(i.target);s&&(s.seen.set(i.target,i.isIntersecting),Sn(s))}qt(t)})),e.addEventListener("visibilitychange",()=>{for(let r of t.recs)Sn(r);qt(t)}),rs.set(e,t),t}var yc=e=>e.els.some(t=>t.isConnected);function Zm(e){if(!e.loop.io)return yc(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function Sn(e){let t=!e.dead&&!!e.source&&Zm(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Ii(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Qr(e))}function Ii(e){return e.doc.defaultView?.performance?.now()??Date.now()}function qt(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){wc(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Ii(e)),!e.raf&&!e.timer&&Xr(e,!1)}function Xr(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>os(e,Ii(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),Wm):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(r=>(e.raf=0,os(e,r))):e.timer=n.setTimeout(()=>(e.timer=0,a()),Yr)}function wc(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function os(e,t){if(t-e.last<Yr-4&&!e.idle&&e.last){Xr(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):Yr/1e3;e.last=t,e.frames++;let a=!1,r=!1;for(let i of e.recs){if(!yc(i)){(i.placed||e.frames-i.born>90)&&vc(i);continue}i.placed=!0,i.open&&(r=!0,ef(i,n,t)&&(e.loud=t),(i.disp[0]>0||i.disp[1]>0)&&(a=!0))}if(!r){wc(e);return}e.idle=t-e.loud>Km&&!a,Xr(e,e.idle)}function ef(e,t,n){if(e.fall<0){let h=e.els[0];e.fall=is(h,"motion-meter-fall",Ym),e.hold=is(h,"motion-meter-hold",bc)}let a=null;try{a=e.source.read()}catch{a=null}let r=typeof a=="number",i=r?a:Number(a?.in)||0,s=!r&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,u=s?"2":"1";if(e.rows!==u){e.rows=u;for(let h of e.els)h.dataset.ncRows=u}let d=e.fall>0?Math.exp(-t/e.fall):0,c=[i,l],p=!1;for(let h=0;h<2;h++){let g=Xm(c[h]);g>0&&(p=!0),e.disp[h]=g>=e.disp[h]?g:g+(e.disp[h]-g)*d,e.disp[h]<.001&&(e.disp[h]=0),c[h]>=Gm&&(e.clipAt[h]=n);let f=e.clipAt[h]>0&&n-e.clipAt[h]<e.hold*1e3;Jr(e,h,e.disp[h],f)}return p}function Jr(e,t,n,a){let r=Math.round(n*1e3)/1e3,i=a?"true":"false";if(!(e.shown[t]===r&&e.clipShown[t]===i)){e.shown[t]=r,e.clipShown[t]=i;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${r})`,l.dataset.clip=i)}}}function Qr(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Jr(e,0,0,!1),Jr(e,1,0,!1)}function vc(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),Ta.get(t)===e&&Ta.delete(t)}function tf(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,r=Qm(a),i={els:n,source:t??null,loop:r,open:!1,dead:!1,seen:new Map,born:r.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:bc,rows:""};for(let s of n)Ta.set(s,i),r.io?.observe(s);if(r.recs.add(i),Qr(i),!r.io){let s=a.defaultView,l=()=>{Sn(i),qt(r)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!i.dead){if(l===i.source){Sn(i),qt(r);return}i.open&&(i.open=!1,i.source?.close?.(),Qr(i)),i.source=l,Sn(i),qt(r)}},destroy(){i.dead||vc(i),qt(r)}}}var xc={slop:8,longPressMs:500,pitchPx:16},nf=class{constructor(e,t,n=xc){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let r=this.hit(t,n);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let r=t-this.x0,i=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(r,i)<this.config.slop)return;Math.abs(i)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-i/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function af(e,t,n,a=xc){let r=!1,i=0,s=(d,c)=>{let p=e.ownerDocument.elementFromPoint?.(d,c),h=[...e.querySelectorAll(t)],g=p?h.findIndex(m=>m===p||m.contains(p)):-1;if(g>=0)return g;let f=-1,b=Number.POSITIVE_INFINITY;return h.forEach((m,y)=>{if(m.hidden)return;let v=m.getBoundingClientRect();if(c<v.top||c>v.bottom)return;let x=Math.abs(d-(v.left+v.width/2));x<b&&x<=v.width&&(f=y,b=x)}),f},l=new nf(s,d=>{(d.kind==="paint"||d.kind==="long")&&(r=!0),n(d)},a),u=()=>{i&&clearTimeout(i),i=0};return e.addEventListener("pointerdown",d=>{d.button>0||(r=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(u(),i=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&u())}),e.addEventListener("pointerup",d=>{u(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{u(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{r&&(r=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var kc="netcomposer.groups.v1";function Pi(){try{return globalThis.localStorage??null}catch{return null}}function $c(e=Pi(),t=kc){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[r,i]of Object.entries(n))typeof i=="boolean"&&a.set(r,i);return a}catch{return new Map}}function rf(e,t,n,a=kc){let r=$c(e,a);r.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(r)))}catch{}}function of(e,t=Pi()){return $c(t).get(e.id)??e.open===!0}function sf(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let r=document.createElement("button");r.type="button",r.className="nc-group-toggle",r.id=`${e.id}-group-toggle`;let i=document.createElement("span");i.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),r.append(i,s,l);let u=document.createElement("div");u.className="nc-group-body",u.id=`${e.id}-group-body`,u.setAttribute("role","group"),u.setAttribute("aria-labelledby",r.id),r.setAttribute("aria-controls",u.id);for(let d of e.controls)u.append(n(d,t));return r.addEventListener("click",()=>{let d=a.dataset.ncOpen!=="true";rf(Pi(),e.id,d),Zr(a,d);let c=t(a);c?.type==="group"&&c.onToggle?.(d)}),a.append(r,u),Ec(a,e),Zr(a,of(e)),Sc(a,e),a}function Zr(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let r=n?.querySelector(".nc-group-mark");r&&(r.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function Ec(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function Sc(e,t){Ec(e,t)&&Zr(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),r=t.summary??"";a&&a.textContent!==r&&(a.textContent=r)}var Qn="application/x-nc-pad",ss="http://www.w3.org/2000/svg";function lf(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],r=[];for(let i=0;i<n;i++){let s=Math.floor(i*t/n),l=Math.max(s+1,Math.floor((i+1)*t/n)),u=0,d=0;for(let p=s;p<l;p++)u=Math.min(u,e[2*p]??0),d=Math.max(d,e[2*p+1]??0);let c=n===1?50:i/(n-1)*100;a.push(`${c.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),r.push(`${c.toFixed(1)} ${(10-Math.max(-1,u)*10).toFixed(2)}`)}return`M${a.join("L")}L${r.reverse().join("L")}Z`}function cf(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((r,i)=>a.append(df(n,i,t))),n.append(a),n.addEventListener("keydown",r=>{r.key==="Escape"&&pa(n)}),Mc(n,e),n}function df(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let r=document.createElement("span");r.className="nc-padgrid-pad-bar",r.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let u=document.createElementNS(ss,"svg");u.setAttribute("class","nc-padgrid-pad-wave"),u.setAttribute("viewBox","0 0 100 20"),u.setAttribute("preserveAspectRatio","none"),u.setAttribute("aria-hidden","true");let d=document.createElementNS(ss,"path");return u.append(d),a.append(r,i,s,l,u),pf(e,a,t,n),i.addEventListener("dblclick",()=>{let c=n(e);c?.type==="padGrid"&&c.onRename&&a.dataset.empty!=="true"&&Ac(e,a,t,n)}),a.addEventListener("dragstart",c=>{if(a.dataset.empty==="true"||!c.dataTransfer){c.preventDefault();return}c.dataTransfer.setData(Qn,String(t)),c.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",c=>{let p=c.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(Qn)||(c.preventDefault(),c.stopPropagation(),c.dataTransfer&&(c.dataTransfer.dropEffect=p.includes(Qn)&&!c.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",c=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let h=c.dataTransfer?.getData(Qn);if(h!==void 0&&h!==""){c.preventDefault(),c.stopPropagation();let f=Number(h);f!==t&&p.onMove?.(f,t,c.altKey);return}let g=c.dataTransfer?.files?.[0];g&&(c.preventDefault(),c.stopPropagation(),p.onFile?.(t,g))}),a}function uf(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function pf(e,t,n,a){let r=0,i=!1,s=0,l=0,u=()=>{window.clearTimeout(r),r=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;i=!1,s=d.clientX,l=d.clientY,u();let c=a(e);c?.type==="padGrid"&&(c.onDown?.(n),!(c.onDown&&d.pointerType==="mouse")&&(r=window.setTimeout(()=>{r=0,i=ls(e,t,n,a)},450)))}),t.addEventListener("pointermove",d=>{r&&Math.hypot(d.clientX-s,d.clientY-l)>8&&u()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,u);t.addEventListener("contextmenu",d=>{d.preventDefault(),u(),i=ls(e,t,n,a)}),t.addEventListener("click",()=>{if(i){i=!1;return}uf(e,n,a)})}function ls(e,t,n,a){let r=a(e);if(r?.type!=="padGrid"||!r.menu)return!1;let i=r.menu(n);if(!i.length)return!1;pa(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),pa(e)}),s.addEventListener("click",c=>c.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let c of i){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=c.id,p.textContent=c.label,p.addEventListener("click",()=>{pa(e);let h=a(e);h?.type==="padGrid"&&(c.id==="rename"&&h.onRename?Ac(e,t,n,a):h.onMenu?.(n,c.id))}),l.append(p)}e.append(s,l);let u=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-u.left}px`,l.style.top=`${d.bottom-u.top}px`,l.querySelector("button")?.focus(),!0}function Ac(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let r=a(e);if(r?.type!=="padGrid")return;let i=document.createElement("input");i.type="text",i.className="nc-padgrid-rename",i.maxLength=r.nameMax??24,i.value=r.pads[n]?.label??"",i.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-s.left}px`,i.style.top=`${l.top-s.top}px`,i.style.width=`${l.width}px`;let u=!1,d=c=>{if(u)return;u=!0;let p=i.value.trim();i.remove(),t.focus();let h=a(e);c&&p&&h?.type==="padGrid"&&h.onRename?.(n,p)};i.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"?d(!0):c.key==="Escape"&&d(!1)}),i.addEventListener("blur",()=>d(!0));for(let c of["pointerdown","click","dblclick"])i.addEventListener(c,p=>p.stopPropagation());e.append(i),i.focus(),i.select()}function pa(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function Mc(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,r)=>{let i=n[r];if(!(i instanceof HTMLButtonElement))return;let s=i.querySelector(".nc-padgrid-pad-name"),l=i.querySelector(".nc-padgrid-pad-hint"),u=i.querySelector(".nc-padgrid-pad-wave path"),d=i.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=a.empty?"":a.badge??""),i.draggable=!a.empty,a.empty?(i.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),u?.setAttribute("d","")):(delete i.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=""),u?.setAttribute("d",lf(a.peaks))),a.lane?i.dataset.ncLane=String(a.lane):delete i.dataset.ncLane;let c=t.selected===r;c?i.dataset.selected="true":delete i.dataset.selected,i.setAttribute("aria-pressed",c?"true":"false"),a.playing?i.dataset.playing="true":delete i.dataset.playing,i.setAttribute("aria-label",a.empty?`Pad ${r+1}, empty: load a sample`:`Pad ${r+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${c?", selected":""}`)})}function Se(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Wa(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(a,r),n}function cs(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function Fn(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var hf=450,ds=8;function je(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function mf(e){let t=am(e,"target-min");return t>0?t:44}function ff(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=mf(e),a=n/2,r=t.map(i=>i.parentElement?.getBoundingClientRect()??null);for(let i=0;i<t.length;i++){let s=t[i],l=r[i];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let u=l.left+l.width/2,d=l.top+l.height/2,c=u-a,p=u+a,h=d-a,g=d+a;for(let f=0;f<t.length;f++){if(i===f)continue;let b=r[f];if(!b||b.width===0)continue;let m=b.left+b.width/2,y=b.top+b.height/2;Math.abs(y-d)<a*2&&(m>u?p=Math.min(p,(u+m)/2):m<u&&(c=Math.max(c,(u+m)/2))),Math.abs(m-u)<a*2&&(y>d?g=Math.min(g,(d+y)/2):y<d&&(h=Math.max(h,(d+y)/2)))}c=Math.min(c,l.left),p=Math.max(p,l.right),h=Math.min(h,l.top),g=Math.max(g,l.bottom),s.style.left=`${c-l.left}px`,s.style.top=`${h-l.top}px`,s.style.width=`${Math.max(0,p-c)}px`,s.style.height=`${Math.max(0,g-h)}px`,s.style.transform="none"}}function Tc(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function us(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function At(e,t){switch(e.type){case"slider":return gf(e,t);case"select":return yf(e,t);case"toggle":return wf(e,t);case"button":return vf(e,t);case"readout":return xf(e);case"label":return Sf(e);case"note":return ps(e);case"knob":return Tf(e,t);case"choice":return Lf(e,t);case"slotRow":return Cf(e,t);case"stepGrid":return Pf(e,t);case"canvas":return Of(e);case"fx":return Wf(e,t);case"eqGraph":return Dm(e,t);case"group":return sf(e,t,At);case"strip":return Bf(e,t);case"stripAdd":return Vf(e,t);case"padGrid":return cf(e,t);case"moves":return $f(e,t);default:return ps({id:"unknown",text:""})}}function Fe(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Nc(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(Lc(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let r=e.querySelector("[data-nc-readout]");r&&(r.textContent=t.valueText??Fn(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),cs(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")cs(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&ht(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Af(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??Fn(t.value))}else if(t.type==="choice")Fc(e,t);else if(t.type==="slotRow")Pc(e,t);else if(t.type==="stepGrid")ti(e,t);else if(t.type==="padGrid")Mc(e,t);else if(t.type==="moves")Cc(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&sc(n,t)}else if(t.type==="eqGraph")dc(e,t);else if(t.type==="strip"){Oc(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${Mt(n.id)}"]`);a instanceof Element&&Fe(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Dc(e,t);else if(t.type==="group"){Sc(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${Mt(n.id)}"]`);a instanceof Element&&Fe(a,n)}}else if(t.type==="fx"){Wc(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${Mt(n.id)}"]`);a instanceof Element&&Fe(a,n)}}}}function gf(e,t){let n=Wa(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let r=Ga(e.taper,e.min,e.max);a.min=String(r?0:e.min),a.max=String(r?1e3:e.max),a.step=String(r?1:e.step),r&&(a.dataset.ncTaper=e.taper),a.value=String(Lc(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let i=l=>r?qr(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(i(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(i(l))}),r&&a.addEventListener("keydown",l=>{let u=t(a);if(u?.type!=="slider"||a.disabled)return;let d=u.taper??e.taper,c=oc(d,u.min,u.max,u.value,l.key,l.shiftKey,u.step);c!==null&&(l.preventDefault(),a.value=String(Ti(d,u.min,u.max,c)),u.onChange(c),u.onCommit?.(c))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(bf(e,a,t),s),n.append(Se()),Fe(n,e),n}function Lc(e){return Ga(e.taper,e.min,e.max)?Ti(e.taper,e.min,e.max,e.value):e.value}function bf(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(je());let r=i=>{let s=n(t);s?.type==="slider"&&s.onTap?.(i)};return a.addEventListener("pointerdown",i=>{i.button===0&&r(i.timeStamp)}),a.addEventListener("keydown",i=>{i.repeat||i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),r(i.timeStamp))}),a}function yf(e,t){let n=Wa(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let r=null;for(let i of e.options){let s=document.createElement("option");s.value=i.value,s.textContent=i.label,i.disabled&&(s.disabled=!0),i.group?r?.getAttribute("label")!==i.group&&(r=document.createElement("optgroup"),r.setAttribute("label",i.group),a.append(r)):r=null,(r??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let i=t(a);i?.type==="select"&&i.onChange(a.value)}),n.append(a,Se()),n}function wf(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(Se()),Fe(n,e),n}function vf(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let i=t(n);i?.type==="button"&&i.onPress()}),n.append(Se()),Fe(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=e.id,r.setAttribute("aria-label","Surprise me"),r.title=e.sparkleTitle??"Surprise me",r.innerHTML=Tc(),r.addEventListener("click",()=>{let i=n.closest(".nc-module")?.querySelector(".nc-slot-row");i instanceof HTMLElement&&zc(i);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,r),a}function xf(e){let t=Wa(e.id,e.label);return t.append(Se()),Fe(t,e),t}var kf=450;function $f(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let r=document.createElement("div");r.className="nc-moves-row",r.setAttribute("role","group"),r.setAttribute("aria-label",a.label),a.title&&(r.title=a.title);let i=document.createElement("span");i.className="nc-moves-label",i.setAttribute("aria-hidden","true"),i.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let u=document.createElement("button");u.type="button",u.className="nc-moves-btn",u.dataset.ncMove=l.id,u.title=l.title??l.text,u.setAttribute("aria-label",`${a.label} ${l.text}`),u.append(Ef(l.icon)),u.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),s.append(u)}r.append(i,s),n.append(r)}return Cc(n,e),n}function Cc(e,t){for(let n of t.groups)for(let a of n.moves){let r=e.querySelector(`[data-nc-move="${Mt(a.id)}"]`);r instanceof HTMLButtonElement&&(r.disabled=a.disabled===!0)}}function Ef(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function Sf(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(Se()),t}function ps(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(Se()),t}function hs(e){if(typeof e.valueText=="string")return e.valueText;let t=Fn(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Nc(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Af(e,t){let n=Aa(t.taper,t.min,t.max,t.value);Nc(e,t.modulated===!0);let a=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(a)),t.bipolar){let r=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(Aa(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(a,r))),e.style.setProperty("--knob-to",String(Math.max(a,r)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",hs(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${hs(t)}`}function Mf(e,t){if(Ga(e.taper,e.min,e.max))return oc(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,r=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+r:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-r:null}function Tf(e,t){let n=Wa(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let r=document.createElement("i");r.className="nc-knob-mark",a.append(r);let i=0,s=0;a.addEventListener("pointerdown",d=>{i=d.clientY;let c=t(a);s=c&&"value"in c?Number(c.value):0,a.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",d=>{if(a.hasPointerCapture&&!a.hasPointerCapture(d.pointerId))return;let c=t(a);if(c?.type!=="knob")return;if(Ga(c.taper,c.min,c.max)){let g=Aa(c.taper,c.min,c.max,s)-(d.clientY-i)/120;c.onChange(rc(c.taper,c.min,c.max,g));return}let p=c.max-c.min||1,h=Math.min(c.max,Math.max(c.min,s-(d.clientY-i)*p/120));c.onChange(h)}),a.addEventListener("dblclick",()=>{let d=t(a);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),a.addEventListener("keydown",d=>{let c=t(a);if(c?.type!=="knob")return;let p=Mf(c,d);p!==null&&(d.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,p))))});let u=n.querySelector("[data-nc-readout]");return n.insertBefore(a,u),n.append(Se()),Fe(n,e),n}function Lf(e,t){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label);for(let a of e.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=a.value,r.setAttribute("role","tab"),r.textContent=a.label,r.addEventListener("click",()=>{let i=t(n);i?.type==="choice"&&i.onChange(a.value)}),r.addEventListener("keydown",i=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),u=l;if(i.key==="ArrowRight"||i.key==="ArrowDown")u=(l+1)%s.length;else if(i.key==="ArrowLeft"||i.key==="ArrowUp")u=(l-1+s.length)%s.length;else if(i.key==="Home")u=0;else if(i.key==="End")u=s.length-1;else return;let d=s[u];d instanceof HTMLButtonElement&&(i.preventDefault(),d.focus(),d.click())}),n.append(r)}return n.append(Se()),Fc(n,e),n}function Fc(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function Cf(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let c=0;c<e.slots.length;c++){let p=e.slots[c],h=document.createElement("span");h.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(c),g.textContent=p.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",h.append(g,je()),Nf(h,g,n,c,t),a.append(h)}let r=e.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=Tc(),r.append(je()),r.addEventListener("click",()=>{zc(n);let c=t(n);c?.type==="slotRow"&&c.onSparkle?.()}));let i=document.createElement("div");i.className="nc-field nc-morph-field",i.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let c=t(n);c?.type==="slotRow"&&c.onMorph(Number(l.value))});let u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",i.append(s,u,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(a,...r?[r]:[]),n.append(d,i,Se()),Ic(n,t),Pc(n,e),n}function ms(e,t,n,a){let r=n(e);if(r?.type!=="slotRow")return;gn(e);let i=a.shiftKey?"store":a.altKey?"clear":"recall";r.onSlot(t,i)}function Nf(e,t,n,a,r){let i=0,s=0,l=0,u=!1,d=!1,c=!1,p=!1,h=()=>{window.clearTimeout(i),i=0},g=y=>{let v=y.clientX-s,x=y.clientY-l;v*v+x*x>ds*ds&&(u=!0,h())},f=()=>{p&&(p=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",m))},b=y=>{let v=i!==0&&!u&&!d;h(),f(),v&&(c=!0,ms(n,a,r,y))},m=()=>{u=!0,h(),f()};e.addEventListener("pointerdown",y=>{y.button===0&&(f(),d=!1,u=!1,c=!1,s=y.clientX,l=y.clientY,h(),i=window.setTimeout(()=>{i=0,!u&&(d=!0,Ff(n,t,a,r))},hf),p=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",b),window.addEventListener("pointercancel",m))}),e.addEventListener("contextmenu",y=>y.preventDefault()),e.addEventListener("click",y=>{if(c||d||u){c=!1,d=!1,u=!1;return}ms(n,a,r,y)})}function Ic(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=fs("Save","store"),r=fs("Clear","clear");n.append(a,r);let i=document.createElement("div");i.className="nc-slot-scrim",i.hidden=!0,i.setAttribute("aria-hidden","true"),i.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),gn(e)}),i.addEventListener("click",s=>s.stopPropagation()),e.append(i,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let u=t(e);if(u?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(u.onSlot(d,"store"),gn(e)):l.dataset.ncSlotOp==="clear"&&(u.onSlot(d,"clear"),gn(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&gn(e)})}function fs(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Ff(e,t,n,a){Ic(e,a);let r=e.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let i=e.querySelector(".nc-slot-scrim");i instanceof HTMLElement&&(i.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function gn(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Pc(e,t){for(let r of e.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let i=Number(r.dataset.ncSlot),s=t.slots[i];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function zc(e){let t=e.dataset.ncLastFill||null,n=qh(t);e.dataset.ncLastFill=n;let a=Vh(n);if(a)for(let[r,i]of Object.entries(a))e.style.setProperty(r,i)}function If(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,r=i=>{if(a===i)return;a=i,n.setAttribute("aria-pressed",i?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(i)};n.addEventListener("pointerdown",i=>{i.button===0&&(i.preventDefault(),n.setPointerCapture?.(i.pointerId),r(!0))});for(let i of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(i,()=>r(!1));return n.addEventListener("keydown",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),i.repeat||r(!0))}),n.addEventListener("keyup",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),r(!1))}),n.addEventListener("contextmenu",i=>i.preventDefault()),n}function Pf(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let r=m=>{let y=document.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.textContent=m,a.append(y),y},i=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=m=>{for(let y of[i,s]){let v=y===m;y.setAttribute("aria-checked",v?"true":"false"),y.tabIndex=v?0:-1}};l(i);for(let m of[i,s])m.addEventListener("click",()=>l(m));a.addEventListener("keydown",m=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(m.key))return;m.preventDefault();let y=s.getAttribute("aria-checked")==="true"?i:s;l(y),y.focus()});let u=document.createElement("div");if(u.className="nc-step-tools",u.append(a),e.onFill&&u.append(If(n,t)),e.onClear){let m=document.createElement("button");m.type="button",m.className="nc-fill nc-clear",m.dataset.ncClear="",m.textContent=e.clearLabel??"Clear",m.title="Clear every step (Undo takes it back)",m.addEventListener("click",()=>{let y=t(n);y?.type==="stepGrid"&&y.onClear?.()}),u.append(m)}n.append(u);for(let m of e.rows){let y=document.createElement("div");y.className="nc-row",y.dataset.ncRow="";let v=document.createElement("button");v.type="button",v.className="nc-name",v.textContent=m.label,v.setAttribute("aria-label",`Select ${m.label}`),m.lane&&(v.dataset.ncLane=String((m.lane-1)%4+1));let x=!1,A=0;v.addEventListener("pointerdown",k=>{x=!1,!(k.pointerType==="mouse"||k.button!==0)&&(A=window.setTimeout(()=>{let T=t(n);T?.type!=="stepGrid"||!T.selectedRows||(x=!0,T.onSelectRow?.(T.rows.findIndex(M=>M.id===m.id),!0))},kf))});for(let k of["pointerup","pointercancel","pointerleave"])v.addEventListener(k,()=>window.clearTimeout(A));v.addEventListener("contextmenu",k=>{x&&k.preventDefault()}),v.addEventListener("click",k=>{let T=t(n);if(T?.type!=="stepGrid")return;if(x){x=!1;return}let M=T.rows.findIndex(F=>F.id===m.id),C=!!T.selectedRows&&(k.shiftKey||k.metaKey||k.ctrlKey);T.onSelectRow?.(M,C)}),v.addEventListener("keydown",k=>zf(n,v,k));let E=[];for(let k of["mute","solo"]){if(!(k==="mute"?e.onMute:e.onSolo))continue;let T=document.createElement("span");T.className="nc-ms-wrap";let M=document.createElement("button");M.type="button",M.className="nc-ms",M.dataset.ncMs=k,M.textContent=k==="mute"?"M":"S",M.setAttribute("aria-label",`${k==="mute"?"Mute":"Solo"} ${m.label}`),T.append(M,je()),T.addEventListener("click",()=>{let C=t(n);if(C?.type!=="stepGrid")return;let F=C.rows.findIndex(q=>q.id===m.id);(k==="mute"?C.onMute:C.onSolo)?.(F)}),E.push(T)}let w=document.createElement("div");w.className="nc-steps";for(let k=0;k<m.steps.length;k++){let T=document.createElement("span");T.className="nc-step-wrap";let M=document.createElement("button");M.type="button",M.className="nc-step",M.dataset.ncStep=`${m.id}:${k}`,M.setAttribute("aria-label",`${m.label} step ${k+1}`),T.append(M,je()),T.addEventListener("click",C=>{let F=t(n);if(F?.type!=="stepGrid")return;let q=F.rows.findIndex(X=>X.id===m.id),U=s.getAttribute("aria-checked")==="true";F.onToggle(q,k,C.shiftKey||U)}),w.append(T)}if(e.onLength&&w.append(Df(n,w,m,t)),y.append(...E,v,w),e.onDice){let k=document.createElement("button");k.type="button",k.className="nc-sparkle nc-row-dice",k.dataset.ncDice=m.id,k.setAttribute("aria-label",`Re-roll ${m.label}`),k.title=`Re-roll ${m.label}: new steps for this lane (Undo takes it back)`,k.innerHTML=us(),k.append(je()),k.addEventListener("click",()=>{let T=t(n);T?.type==="stepGrid"&&T.onDice?.(T.rows.findIndex(M=>M.id===m.id))}),y.append(k)}y.addEventListener("click",k=>{if(k.target!==y)return;let T=t(n);T?.type==="stepGrid"&&T.onSelectRow?.(T.rows.findIndex(M=>M.id===m.id))}),gs(n,w,".nc-step-wrap",t,s,()=>m.id),n.append(y)}let d=document.createElement("div");d.className="nc-pads-head";let c=(m,y,v)=>{let x=document.createElement("button");return x.type="button",x.className=m,x.textContent=y,v&&x.setAttribute("aria-label",v),x},p=c("nc-pads-step","‹","Previous lane"),h=c("nc-pads-step","›","Next lane"),g=document.createElement(e.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),e.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",ti(n,m))}));for(let[m,y]of[[p,-1],[h,1]])m.addEventListener("click",()=>{let v=t(n);if(v?.type!=="stepGrid"||v.rows.length===0)return;let x=v.rows.length;v.onSelectRow?.(((Zn(v)+y)%x+x)%x)});if(d.append(p,g,h),e.onDice){let m=c("nc-pads-step nc-pads-dice","","Re-roll lane");m.dataset.ncPadsDice="",m.innerHTML=us(),m.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid")return;let v=Zn(y);v>=0&&y.onDice?.(v)}),d.append(m)}if(e.transport){let m=c("nc-pads-play","Play");m.dataset.ncPadsPlay="",m.addEventListener("click",()=>{let y=t(n);y?.type==="stepGrid"&&y.transport?.onToggle()}),d.append(m)}n.append(d);let f=document.createElement("div");f.className="nc-pads",f.setAttribute("role","group");let b=Math.max(0,...e.rows.map(m=>m.steps.length));for(let m=0;m<b;m++){let y=document.createElement("button");y.type="button",y.className="nc-pad",y.dataset.ncPad=String(m),y.textContent=String(m+1),y.addEventListener("click",v=>{let x=t(n);if(x?.type!=="stepGrid")return;let A=Zn(x);if(A<0)return;if(n.dataset.ncLenMode==="true"){x.onLength?.(A,m+1);return}let E=s.getAttribute("aria-checked")==="true";x.onToggle(A,m,v.shiftKey||E)}),f.append(y)}return gs(n,f,".nc-pad",t,s,()=>{let m=t(n);return m?.type==="stepGrid"?m.rows[Zn(m)]?.id:void 0}),n.append(f),n.append(Se()),ti(n,e),n}function Zn(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function gs(e,t,n,a,r,i){let s="on",l=!0,u=-1,d=(c,p)=>{let h=c.rows[u]?.steps[p];!h||p>=c.rows[u].length||(c.onSet?c.onSet(u,p,s,l):!!h[s]!==l&&c.onToggle(u,p,s==="accent"))};af(t,n,c=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(c.kind!=="paint")return;let h=p.rows.findIndex(g=>g.id===i());h>=0&&p.rows[h].length!==c.pad+1&&p.onLength?.(h,c.pad+1);return}if(c.kind==="paint"){if(c.phase==="start"){let h=i();u=p.rows.findIndex(f=>f.id===h);let g=p.rows[u]?.steps[c.pad];if(!g)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[s]}d(p,c.pad)}else if(c.kind==="long"){let h=i(),g=p.rows.findIndex(b=>b.id===h),f=t.querySelectorAll(n)[c.pad];g>=0&&f instanceof HTMLElement&&p.onLongPress?.(g,c.pad,f)}}})}function zf(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],r=a.indexOf(t),i=r;n.key==="ArrowDown"?i=r+1:n.key==="ArrowUp"?i=r-1:n.key==="Home"?i=0:i=a.length-1;let s=a[i];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function Df(e,t,n,a){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(je());let i=d=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.findIndex(f=>f.id===n.id),h=c.rows[p];if(!h)return;let g=Math.max(1,Math.min(h.steps.length,d));g!==h.length&&c.onLength?.(p,g)},s=d=>{let c=[...t.querySelectorAll(".nc-step")],p=1;return c.forEach((h,g)=>{let f=h.getBoundingClientRect();f.width>0&&d>=f.left+f.width/2&&(p=g+1)}),p},l=d=>i(s(d.clientX)),u=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete r.dataset.dragging};return r.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),r.addEventListener("keydown",d=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.find(g=>g.id===n.id);if(!p)return;let h={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};d.key in h&&(d.preventDefault(),i(h[d.key]))}),r}var br=new WeakMap,ea=new WeakMap;function Rf(e){return e?(ea.has(e)||(ea.set(e,Sa(e)),Kl(t=>{ea.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))ei(n,Number(n.getAttribute("data-nc-velocity")))},e)),ea.get(e)):"light"}function ei(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:Rf(e.ownerDocument),r=n===null?null:`${a} ${n}`;if(!(br.has(e)&&br.get(e)===r)){if(br.set(e,r),n===null){for(let i of Object.keys(Wo(1)))e.style.removeProperty(i);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[i,s]of Object.entries(Wo(n,Go[a]??Go.light)))e.style.setProperty(i,s)}}function ti(e,t){let n=t.rows.some(c=>c.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let r=e.querySelector(".nc-pads"),i=t.rows.find(c=>c.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&i&&(s.textContent=l?`${i.label} · ${i.length}`:i.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${i.label} length ${i.length} steps: tap or drag the pads to set the end, tap here when done`:`${i.label}, ${i.length} steps: tap to set the length`)));let u=e.querySelector("[data-nc-pads-dice]");u instanceof HTMLElement&&i&&(u.setAttribute("aria-label",`Re-roll ${i.label}`),u.title=`Re-roll ${i.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let c=!!t.transport?.playing,p=t.transport?.label??(c?"Stop":"Play");d.textContent!==p&&(d.textContent=p),d.setAttribute("aria-pressed",c?"true":"false");let h=t.transport?.ariaLabel;h?d.setAttribute("aria-label",h):d.removeAttribute("aria-label")}if(r instanceof HTMLElement&&i){r.setAttribute("aria-label",`${i.label} steps`),i.lane&&(r.dataset.ncLane=String((i.lane-1)%4+1)),i.mute||n&&!i.solo?r.dataset.silent="true":delete r.dataset.silent;let c=i.length>0?(t.playhead%i.length+i.length)%i.length:-1;for(let p of r.querySelectorAll("[data-nc-pad]")){let h=Number(p.getAttribute("data-nc-pad")),g=i.steps[h];p instanceof HTMLButtonElement&&(p.hidden=!g||!l&&h>=i.length,l&&h>=i.length?p.dataset.out="true":delete p.dataset.out,l&&h===i.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${i.label} step ${h+1}`),p.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?p.dataset.accent="true":delete p.dataset.accent,g?.dim?p.dataset.dim="true":delete p.dataset.dim,ei(p,g?.velocity),t.playhead>=0&&h===c?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let c of t.rows){for(let g=0;g<c.steps.length;g++){let f=c.steps[g],b=e.querySelector(`[data-nc-step="${c.id}:${g}"]`);if(!(b instanceof HTMLButtonElement))continue;let m=b.closest(".nc-row");if(m instanceof HTMLElement){t.selectedRow===c.id?m.dataset.selected="true":delete m.dataset.selected;let x=t.selectedRow!==c.id&&(t.selectedRows??[]).includes(c.id);x?m.dataset.picked="true":delete m.dataset.picked;let A=m.querySelector(".nc-name");A instanceof HTMLElement&&(A.setAttribute("aria-pressed",t.selectedRow===c.id||x?"true":"false"),A.textContent!==c.label&&(A.textContent=c.label,A.setAttribute("aria-label",`Select ${c.label}`))),c.mute||n&&!c.solo?m.dataset.silent="true":delete m.dataset.silent;for(let E of m.querySelectorAll("[data-nc-ms]")){let w=E.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;E.setAttribute("aria-pressed",w?"true":"false")}}b.setAttribute("aria-pressed",f.on?"true":"false"),f.accent?b.dataset.accent="true":delete b.dataset.accent,f.dim?b.dataset.dim="true":delete b.dataset.dim,g%4===0?b.dataset.bar="true":delete b.dataset.bar,typeof f.velocity=="number"?(b.dataset.velocity="true",b.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,f.velocity))*100)}%`)):(delete b.dataset.velocity,b.style.removeProperty("--level")),ei(b,f.velocity);let y=t.playhead>=0&&c.length>0?(t.playhead%c.length+c.length)%c.length:-1;g===y?b.dataset.playhead="true":delete b.dataset.playhead;let v=!!t.onLength&&t.selectedRow===c.id;b.hidden=g>=c.length&&!v,g>=c.length&&v?b.dataset.out="true":delete b.dataset.out}let p=e.querySelector(`[data-nc-len="${c.id}"]`),h=e.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&h&&h.nextElementSibling!==p){let g=document.activeElement===p;h.after(p),g&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(c.length)),p.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),p.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function Of(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,Se()),t}function Bf(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let r=document.createElement("span");r.className="nc-strip-name",r.dataset.ncStripName="";let i=!e.master&&typeof e.onFold=="function",s=null;i&&(n.dataset.ncFoldable="",s=qc(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let x=t(n);x?.type==="strip"&&(x.onFold?.(x.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(r);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let x=document.createElement("span");x.className="nc-strip-grip-dots",x.setAttribute("aria-hidden","true"),l.append(x),l.addEventListener("keydown",A=>{if(A.key!=="ArrowLeft"&&A.key!=="ArrowRight"||A.ctrlKey||A.metaKey||A.shiftKey)return;let E=t(n);E?.type==="strip"&&(A.preventDefault(),E.onMove?.(A.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>ws(n,l,t))),!e.master&&typeof e.onShade=="function"&&a.addEventListener("contextmenu",x=>{x.pointerType==="touch"||x.pointerType==="pen"||x.target instanceof Element&&x.target.closest("input, .nc-strip-remove")||(x.preventDefault(),ws(n,a,t,{x:x.clientX,y:x.clientY}))}),e.onRemove){let x=document.createElement("button");x.type="button",x.className="nc-strip-remove",x.dataset.ncStripRemove="",x.textContent="×",x.addEventListener("click",()=>{let A=t(n);A?.type==="strip"&&A.onRemove?.(x)}),a.append(x)}let u=document.createElement("div");if(u.className="nc-strip-hacks",e.onHacks){let x=document.createElement("span");x.className="nc-hacks-wrap";let A=document.createElement("button");A.type="button",A.className="nc-hacks",A.dataset.ncHacks="",x.append(A,je()),x.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&E.onHacks?.()}),u.append(x)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let x=document.createElement("span");x.className="nc-hacks-wrap nc-sends-view-wrap";let A=document.createElement("button");A.type="button",A.className="nc-hacks nc-sends-view",A.dataset.ncSendsView="",x.append(A,je()),x.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&E.onSendsView?.()}),d.append(x)}for(let x of["mute","solo"]){if(!(x==="mute"?e.onMute:e.onSolo))continue;let A=document.createElement("span");A.className="nc-ms-wrap";let E=document.createElement("button");E.type="button",E.className="nc-ms",E.dataset.ncMs=x,E.textContent=x==="mute"?"M":"S",A.append(E,je()),A.addEventListener("click",()=>{let w=t(n);w?.type==="strip"&&(x==="mute"?w.onMute:w.onSolo)?.()}),d.append(A)}let c=document.createElement("div");c.className="nc-strip-sends";for(let x of e.sends??[])c.append(At({...x,type:"knob",compact:!0},t));let p=document.createElement("div");p.className="nc-strip-pan",e.pan&&p.append(At(zi(e),t));let h=document.createElement("div");h.className="nc-strip-body";let g=document.createElement("span");g.className="nc-scale",g.setAttribute("aria-hidden","true");for(let x of e.ticks??[]){let A=document.createElement("span");A.className="nc-scale-tick",A.style.setProperty("--tick-pos",String(x.value)),A.textContent=x.label,g.append(A)}let f=um({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:x=>{let A=t(n);A?.type==="strip"&&A.onChange(x)},onReset:()=>{let x=t(n);x?.type==="strip"&&ys(x)}}),b=bm({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let x=t(n);x?.type==="strip"&&x.onClipClear?.()}});if(h.append(g,f.el,b.el),i){let x=document.createElement("button");x.type="button",x.className="nc-ui-fx-fold nc-strip-fold",x.dataset.ncStripFold="",x.setAttribute("aria-expanded","false");let A=document.createElement("span");A.className="nc-strip-fold-cap",A.setAttribute("aria-hidden","true");let E=document.createElement("span");E.className="nc-ui-fx-fold-name",E.dataset.ncStripFoldName="";let w=document.createElement("span");w.className="nc-strip-fold-pan",w.setAttribute("aria-hidden","true"),w.hidden=!e.pan,x.append(A,w,E),x.addEventListener("click",()=>{let k=t(n);if(k?.type!=="strip")return;k.onFold?.(!1);let T=n.querySelector("[data-nc-strip-hide]");T instanceof HTMLElement&&T.focus()}),h.prepend(x)}let m=document.createElement("button");m.type="button",m.className="nc-strip-db",m.dataset.ncReadout="";let y=0;m.addEventListener("click",x=>{let A=t(n);A?.type!=="strip"||!A.onTypeIn||(window.clearTimeout(y),x.detail===0?bs(n,m,t):x.detail===1&&(y=window.setTimeout(()=>bs(n,m,t),qf)))}),m.addEventListener("dblclick",()=>{window.clearTimeout(y);let x=t(n);x?.type==="strip"&&ys(x)});let v=document.createElement("div");return v.className="nc-strip-trim",e.trim&&v.append(At(Di(e),t)),s&&n.append(s),l&&n.append(l),n.append(a,v,u,d,c,p,h,m,Se()),Oc(n,e),n}function zi(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??_f(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function Di(e){let t=e.trim,n=t.min??-12,a=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:a,step:t.step??.5,value:t.value,valueText:t.valueText??jf(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:r=>t.onChange(r)}}function jf(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function _f(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var qf=250;function bs(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=a.valueText??Fn(a.value),r.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(r),r.focus(),r.select?.();let i=!1,s=l=>{if(i)return;i=!0;let u=r.value;if(r.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(u)}t.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function Vf(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let i=document.createElement("span");i.className="nc-strip-add-label",a.append(r,i);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),u=s.value;Rc(s),l?.type==="stripAdd"&&u&&l.onAdd(u)}),n.append(a,s,Se()),Dc(n,e),n}function Dc(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let r=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],i=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");i!==s&&(a.replaceChildren(...r.map(l=>{let u=document.createElement("option");return u.value=l.value,u.textContent=l.label,u.disabled=l.disabled===!0,u})),Rc(a))}function Rc(e){let t=e.options[0];t&&(t.selected=!0)}function ys(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Oc(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let r=e.querySelector(".nc-fader"),i=r?pm(r):void 0;i&&(i.configure({step:t.step}),i.set(t.value),i.setText(t.valueText),i.setLabel(`${t.label} level`)),ac(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let f=t.valueText??Fn(t.value);s.textContent!==f&&(s.textContent=f),s.setAttribute("aria-label",`${t.label} level ${f}`);let b=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${b}`:b}for(let f of e.querySelectorAll("[data-nc-ms]")){let b=f.getAttribute("data-nc-ms"),m=b==="mute"?t.mute===!0:t.solo===!0;f.setAttribute("aria-pressed",m?"true":"false"),f.setAttribute("aria-label",`${b==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let f=t.hacksLabel??"Hacks";l.textContent!==f&&(l.textContent=f),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${f}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let u=e.querySelector("[data-nc-sends-view]");if(u){let f=t.sendsViewLabel??"Sends";u.textContent!==f&&(u.textContent=f),u.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),u.setAttribute("aria-label",`${f}: ${t.sendsView===!0?"hide":"show"} the send effects`),u.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),ht(u,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let c=Bc(t);if(c?e.dataset.ncShade=String(c):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let f=e.querySelector(`.nc-strip-trim [data-nc-id="${Mt(t.trim.id)}"]`);f&&Fe(f,Di(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let f=e.querySelector(`.nc-strip-pan [data-nc-id="${Mt(t.pan.id)}"]`);f&&Fe(f,zi(t))}let p=!t.master&&typeof t.onFold=="function"&&t.folded===!0;p?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let h=e.querySelector("[data-nc-strip-hide]");h instanceof HTMLElement&&(Vc(h,p,t.label),ht(h,t.foldHelp));let g=e.querySelector("[data-nc-strip-fold]");if(g instanceof HTMLElement){g.hidden=!p,g.setAttribute("aria-label",`Expand ${t.label}`);let f=g.querySelector("[data-nc-strip-fold-name]");f&&f.textContent!==t.label&&(f.textContent=t.label),ht(g,t.foldedHelp??t.foldHelp)}}function Bc(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=jc?t:0}var jc=8,ta=null;function ws(e,t,n,a){ta?.();let r=n(e);if(r?.type!=="strip")return null;let i=e.ownerDocument,s=i.defaultView??globalThis,l=i.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${r.label}: shade and place`);let u=i.createElement("div");u.className="nc-strip-menu-title",u.id=`nc-strip-menu-title-${String(r.id).replace(/[^\w-]/g,"")}`,u.textContent="Shade";let d=i.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",u.id);let c=Bc(r),p=e.querySelector("[data-nc-strip-grip]")??t,h=(y=!1)=>{if(ta!==h)return;ta=null;let v=l.contains(i.activeElement);l.remove(),i.removeEventListener("keydown",f,!0),i.removeEventListener("pointerdown",b,!0),s.removeEventListener("resize",m),(y||v)&&p?.isConnected&&p.focus?.({preventScroll:!0})},g=[0,...Array.from({length:jc},(y,v)=>v+1)].map(y=>{let v=i.createElement("button");return v.type="button",v.setAttribute("role","radio"),v.setAttribute("aria-checked",y===c?"true":"false"),v.setAttribute("tabindex",y===c?"0":"-1"),v.dataset.ncShadeChoice=String(y),y===0?(v.textContent="Auto",v.setAttribute("aria-label","Auto: alternate light and dark"),v.title="Auto: alternate light and dark"):(v.textContent=String(y),v.setAttribute("aria-label",`Shade ${y}`),v.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${y})`)),v.addEventListener("click",()=>{let x=n(e);h(!0),x?.type==="strip"&&x.onShade?.(y===0?null:y)}),v});if(d.append(...g),d.addEventListener("keydown",y=>{let v=g.indexOf(i.activeElement);if(v<0)return;let x=-1;y.key==="ArrowRight"||y.key==="ArrowDown"?x=(v+1)%g.length:y.key==="ArrowLeft"||y.key==="ArrowUp"?x=(v-1+g.length)%g.length:y.key==="Home"?x=0:y.key==="End"&&(x=g.length-1),!(x<0)&&(y.preventDefault(),g[v].setAttribute("tabindex","-1"),g[x].setAttribute("tabindex","0"),g[x].focus())}),l.append(u,d),typeof r.onMove=="function"){let y=[...e.parentElement?.children??[]].filter(x=>x.classList?.contains("nc-strip")&&!x.hasAttribute("data-nc-master")),v=y.indexOf(e);for(let[x,A,E]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let w=i.createElement("button");w.type="button",w.className="nc-strip-menu-item",w.dataset.ncStripMove=x<0?"left":"right";let k=i.createElement("span");k.textContent=A;let T=i.createElement("kbd");T.textContent=E,T.setAttribute("aria-hidden","true"),w.append(k,T),w.disabled=x<0?v<=0:v<0||v>=y.length-1,w.addEventListener("click",()=>{let M=n(e);h(!0),M?.type==="strip"&&M.onMove?.(x)}),l.append(w)}}i.body.append(l),(()=>{let y=t.getBoundingClientRect?.()??{bottom:0,right:0},v=l.offsetWidth,x=l.offsetHeight,A=s.innerWidth||i.documentElement.clientWidth||v,E=s.innerHeight||i.documentElement.clientHeight||x,w=a?a.x:y.right-v,k=a?a.y:y.bottom+4;w=Math.max(4,Math.min(w,A-v-4)),k+x>E-4&&(k=Math.max(4,(a?a.y:y.top)-x-4)),l.style.left=`${Math.round(w)}px`,l.style.top=`${Math.round(k)}px`})();let f=y=>{if(y.key==="Escape")y.preventDefault(),y.stopPropagation(),h(!0);else if(y.key==="Tab"&&l.contains(i.activeElement)){let v=[...l.querySelectorAll("button:not([disabled])")].filter(A=>A.getAttribute("tabindex")!=="-1"),x=(v.indexOf(i.activeElement)+(y.shiftKey?-1:1)+v.length)%v.length;y.preventDefault(),v[x]?.focus()}},b=y=>{l.contains(y.target)||h(!1)},m=()=>h(!1);return i.addEventListener("keydown",f,!0),i.addEventListener("pointerdown",b,!0),s.addEventListener("resize",m),ta=h,(g.find(y=>y.getAttribute("tabindex")==="0")??g[0]).focus({preventScroll:!0}),{el:l,close:()=>h(!1)}}function vs(e,t){let n=e?.querySelector?.(`.nc-strip[data-nc-id="${Mt(t)}"]`);return ac(n?.querySelector(".nc-meter")??void 0)}var ni=typeof ResizeObserver=="function"?new ResizeObserver(Hf):null;function Hf(e){for(let t of e){if(!t.target.isConnected){ni.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&Uf(n)}}function Uf(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,r=n instanceof HTMLElement?n.offsetHeight:0,i=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+r+i}px`)}function Gf(e){if(ni)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))ni.observe(t)}function Wf(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let r=typeof e.onFold=="function",i=!!e.meter,s=typeof e.onRemove=="function";if(e.on===void 0&&!r&&!La(e)&&!i&&!s)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),i&&l.append(Uc(n,"head")),e.on!==void 0){let u=Ai({checked:e.on,labelledBy:a.id,onChange:d=>{let c=t(u.el);c?.type==="fx"&&c.onToggle?.(d)}});u.el.dataset.ncFxSwitch="",l.append(u.el)}r&&l.append(Yf(n,t)),La(e)&&l.append(Zf(n,t)),s&&l.append(eg(t)),n.append(l)}r&&n.prepend(Xf(n,t)),i&&Gc(n,e);for(let l of e.controls)n.append(At(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let u=document.createElement("summary");u.textContent=e.moreLabel??"More",l.append(u);for(let d of e.more)l.append(At(d,t));n.append(l)}return n.append(Se()),Wc(n,e),Gf(n),n}var Kf=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function _c(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&Kf(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function Yf(e,t){let n=qc();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),_c(e))}),n}function qc(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Vc(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function Xf(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let r=document.createElement("span");r.className="nc-ui-fx-fold-name",r.dataset.ncFxFoldName="";let i=document.createElement("span");return i.className="nc-fold-tri",i.setAttribute("aria-hidden","true"),n.append(i,a,r),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Uc(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),_c(e)}}),n}var Zt=new Set;function ha(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var La=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"),Jf="(max-width: 768px)";function Qf(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function Zf(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(Qf()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(Hc(e,a,!Zt.has(a.id)),n.focus())}),n}function eg(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function Hc(e,t,n){n?Zt.add(t.id):Zt.delete(t.id),Ri(e,t)}function tg(e,t){t?.type==="fx"&&Zt.has(t.id)&&Hc(e,t,!1)}function ng(e){return e.ownerDocument.defaultView?.matchMedia?.(Jf).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Ri(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=La(t)&&Zt.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!La(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),ha(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Qt(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",ht(n,t.maxHelp)),!a){e.dataset.ncMax&&xs(e);return}if(!e.isConnected){let s=()=>e.isConnected&&Zt.has(t.id)&&Ri(e,t);queueMicrotask(()=>{e.isConnected?s():ha(e.ownerDocument,s)});return}let r=ng(e),i=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;i>0&&e.style.setProperty("--nc-fx-dials",String(i)),e.dataset.ncMax!==r&&(e.dataset.ncMax&&xs(e),e.dataset.ncMax=r,r==="over"&&ag(e,t)),rg(e.ownerDocument),r==="over"&&Oi(e),ha(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Qt(s)})}function xs(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),ha(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Qt(n)})}function ag(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let r=e.querySelector("[data-nc-fx-max]");r instanceof HTMLElement&&r.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function Oi(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,r=e.ownerDocument.defaultView,i=Number.parseFloat(r?.getComputedStyle(a).columnGap??"")||0,s=zm(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),i,r?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var ks=new WeakSet;function rg(e){ks.has(e)||(ks.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(r=>r.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&Oi(t)}))}var ai=new WeakMap;function Uc(e,t){let n=Jm(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Gc(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let r of n)ht(r,t.meterHelp);let a=ai.get(e);a?a.set(t.meter):ai.set(e,tf(n,t.meter))}function Wc(e,t){(t.meter||ai.has(e))&&Gc(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let r=typeof t.onFold=="function"&&t.folded===!0;r?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let i=e.querySelector("[data-nc-fx-hide]");i instanceof HTMLElement&&(Vc(i,r,t.title),ht(i,t.foldHelp)),Ri(e,t);let s=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let u=t.removeLabel??`Remove ${t.title}`;s.hidden=r,s.setAttribute("aria-label",u),s.title=u}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let u=t.on===void 0?"":t.on?"On":"Off";l.hidden=!r,l.setAttribute("aria-label",`Expand ${t.title}${u?`, ${u.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=u,d.hidden=u==="");let c=l.querySelector("[data-nc-fx-fold-name]");c&&(c.textContent=t.title),ht(l,t.foldHelp)}}function ht(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Mt(e){return e.replace(/["\\]/g,"\\$&")}function ig(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);a?.type==="canvas"&&sc(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Qt(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&Oi(n);ff(e)}var og=ut["toast-duration"];function sg({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function lg(e,t,n,a){let r=l=>({top:l,bottom:l+n}),i=l=>e.some(u=>u&&u.bottom>l.top&&u.top<l.bottom),s=r(t-a-n);return i(s)?i(r(a))?"bottom":"top":"bottom"}function cg(e,t,n,a,r,i){let s=e.bottom+r,l=Math.max(i,Math.min(e.left,a-i-n.width));for(let u=!0,d=0;u&&d<8;d++){u=!1;for(let c of t)c&&c.bottom>s&&c.top<s+n.height&&c.right>l&&c.left<l+n.width&&(s=c.bottom+r,u=!0)}return{top:s,left:l}}var $s="data-nc-ui-toast-live";function dg(e,t){let n=t.querySelector(`[${$s}]`);return n||(n=e.createElement("div"),n.setAttribute($s,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function bn({message:e,actionLabel:t,onAction:n,duration:a=og,onClose:r,avoid:i=[],anchor:s,host:l,document:u=globalThis.document}={}){l=l??u.body;let d=u.defaultView??globalThis,c=u.createElement("div");c.className="nc-ui-toast",c.setAttribute("data-state","enter");let p=u.createElement("span");p.className="nc-ui-toast-message",p.textContent=e,c.appendChild(p);let h=null;t&&(h=u.createElement("button"),h.type="button",h.className="nc-ui-toast-action",h.textContent=t,c.appendChild(h)),l.appendChild(c);let g="open",f=ie=>ie&&typeof ie.getBoundingClientRect=="function"?ie.getBoundingClientRect():null,b=f(c),m=b?.height||44,y=d.getComputedStyle?.(c),v=Number.parseFloat(y?.getPropertyValue(te("toast-offset")))||16,x=Number.parseFloat(y?.getPropertyValue(te("toast-anchor-gap")))||8,A=f(s),E=d.innerHeight??0,w=i.map(f).filter(Boolean),k=A&&A.bottom>0&&A.top<E?cg(A,w,{width:b?.width||0,height:m},d.innerWidth??0,x,v):null;k&&k.top+m<=E?(c.setAttribute("data-placement","anchor"),c.style.top=`${k.top+(d.scrollY??0)}px`,c.style.left=`${k.left+(d.scrollX??0)}px`):c.setAttribute("data-placement",lg(w,E,m,v));let T=d.requestAnimationFrame?.bind(d)??(ie=>setTimeout(ie,16));T(()=>T(()=>{g==="open"&&c.setAttribute("data-state","open")})),dg(u,l).textContent=sg({message:e,actionLabel:t});let M,C,F=new Promise(ie=>{C=ie}),q=ie=>{clearTimeout(M),M=setTimeout(()=>re("timeout"),ie)},U=a,X=Date.now(),fe=()=>{g==="open"&&(clearTimeout(M),U=Math.max(0,U-(Date.now()-X)))},ge=()=>{g==="open"&&(X=Date.now(),q(U))};c.addEventListener("pointerenter",fe),c.addEventListener("pointerleave",ge),c.addEventListener("focusin",fe),c.addEventListener("focusout",ge),h?.addEventListener("click",()=>{if(g==="open")try{n?.()}finally{re("action")}}),Number.isFinite(a)&&q(a);function re(ie="close"){if(g!=="open")return;g="closing",clearTimeout(M),c.setAttribute("data-state","closing"),r?.(ie);let G=d.getComputedStyle?.(c),ze=G?Math.max(0,...String(G.transitionDuration||"").split(",").map(be=>Number.parseFloat(be)*(be.trim().endsWith("ms")?1:1e3)||0)):0,K=()=>{g!=="gone"&&(g="gone",c.remove(),C(ie))};c.addEventListener("transitionend",K),setTimeout(K,ze+50)}return{el:c,close:re,closed:F}}var Es="data-nc-help";function ug(e,t,n,a=0,r=6,i=8){let s=e.top-r-t.height,l=s>=a+i?"above":"below",u=l==="above"?s:e.bottom+r,d=Math.max(i,Math.min(e.left,n-i-t.width));return{top:Math.round(u),left:Math.round(d),side:l}}var yr=new WeakMap;function pg(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function hg({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=yr.get(e);if(n)return n;let a=e.defaultView,r=null,i=null,s,l=()=>{clearTimeout(s),i=null,r&&(r.hidden=!0)},u=h=>{let g=h.getAttribute(Es);if(!g)return;r||(r=e.createElement("div"),r.className="nc-ui-help",r.setAttribute("role","tooltip"),r.dataset.testid="nc-help",r.style.position="fixed",r.style.pointerEvents="none",r.style.zIndex="6",e.body.appendChild(r)),r.textContent=g,r.hidden=!1,r.style.visibility="hidden",r.style.top="0px",r.style.left="0px";let f=h.getBoundingClientRect(),b=ug(f,{width:r.offsetWidth,height:r.offsetHeight},a.innerWidth,pg(e));r.style.top=`${b.top}px`,r.style.left=`${b.left}px`,r.dataset.side=b.side,r.style.visibility=""},d=h=>{if(h.pointerType==="touch")return;let g=h.target&&h.target.closest?h.target.closest(`[${Es}]`):null;g!==i&&(l(),g&&(i=g,s=setTimeout(()=>{i===g&&g.isConnected&&u(g)},t)))},c=h=>{h.key==="Escape"&&l()};e.addEventListener("pointerover",d),e.addEventListener("pointerdown",l,!0),e.addEventListener("keydown",c),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);let p={hide:l,uninstall(){l(),e.removeEventListener("pointerover",d),e.removeEventListener("pointerdown",l,!0),e.removeEventListener("keydown",c),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),r?.remove(),r=null,yr.delete(e)}};return yr.set(e,p),p}var Kc="(max-width: 768px)",mg='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',fg='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',gg=0;function bg({panel:e,button:t,label:n="Menu",media:a=Kc}){let r=e.ownerDocument,i=r.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++gg}`);let s=t??r.createElement("button");t||(s.type="button",s.innerHTML=mg),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function u(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),r.addEventListener("keydown",c,!0),r.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(fg)].find(m=>!m.hidden&&m.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function d({focus:m}={}){if(!l())return;let y=e.contains(r.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),r.removeEventListener("keydown",c,!0),r.removeEventListener("pointerdown",p,!0),(m??y)&&s.focus?.({preventScroll:!0})}function c(m){m.key==="Escape"&&(m.preventDefault(),m.stopPropagation(),d({focus:!0}))}function p(m){let y=m.target;y instanceof i.Node&&(e.contains(y)||s.contains(y))||d({focus:!1})}let h=()=>l()?d({focus:!0}):u(),g=m=>{let y=m.target,v=y instanceof i.Element?y.closest("button"):null;!v||!e.contains(v)||v.closest("[data-nc-menu-stay]")||d({focus:!0})};s.addEventListener("click",h),e.addEventListener("click",g);let f=i.matchMedia?.(a),b=()=>{f?.matches||d({focus:!1})};return f?.addEventListener?.("change",b),{button:s,panel:e,open:u,close:d,isOpen:l,destroy(){d({focus:!1}),s.removeEventListener("click",h),e.removeEventListener("click",g),f?.removeEventListener?.("change",b)}}}var Bi="netcomposer.rhythm.hidden.v1",We=new WeakMap;function wr(){try{return globalThis.localStorage??null}catch{return null}}function Yc(e,t=Bi){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Ss(e,t,n,a=Bi){let r=Yc(e,a);n?r.add(t):r.delete(t);try{e?.setItem(a,JSON.stringify([...r]))}catch{}}function ji(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(r=>r.controls)],n=[],a=r=>{if(n.push(r),r.type==="group")for(let i of r.controls)a(i)};for(let r of t)a(r),r.type==="fx"&&n.push(...r.controls,...r.more??[]),r.type==="strip"&&(n.push(...(r.sends??[]).map(i=>({...i,type:"knob",compact:!0}))),r.pan&&n.push(zi(r)),r.trim&&n.push(Di(r)));return n}function Xc(e,t){if(!(!e||!t))return ji(e).find(n=>n.id===t)}function yg(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${ji(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function wg(e,t){if(!t.title)return;if(!t.panel){let i=document.createElement("h3");i.className="nc-ui-fx-name",i.textContent=t.title,e.append(i);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(a,r),e.append(n),Jc(e,t)}function Jc(e,t){if(!t.panel)return;let n=[...e.children].find(i=>i.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),r&&(r.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function vg(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=We.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Xc(n,a)}function xg(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],r=yg(t);if(e.dataset.ncSignature===r){for(let i of a){let s=e.querySelector(`[data-nc-section="${Ms(i.id)}"]`);s&&Jc(s,i);for(let l of i.controls){let u=e.querySelector(`[data-nc-id="${Ms(l.id)}"]`);u instanceof Element&&Fe(u,l)}s instanceof HTMLElement&&ri(s,i,n)}return}e.dataset.ncSignature=r,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let i of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=i.id,i.inset&&(s.dataset.ncInset="true"),i.area&&(s.dataset.ncArea=i.area),i.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",i.label)),i.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),i.title&&s.setAttribute("aria-label",i.title)),wg(s,i);let l=i.panel?document.createElement("div"):s;i.panel&&(l.className="nc-panel-body",s.append(l));for(let u of i.controls)l.append(At(u,vg));e.append(s),ri(s,i,n)}}function Qc(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,r=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,r))}}var kg="(max-width: 768px)",Zc=new WeakMap;function As(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function $g(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let r=As("prev"),i=As("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(r,s,i,l);let u=(d,c)=>{let p=Zc.get(e);if(!p||c.getAttribute("aria-disabled")==="true")return;let h=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:g}=Qc(h,p.pageSize,(t.pages.get(p.id)??0)+d);t.pages.set(p.id,g),p.onPage?.(g),ri(e,{...p,page:g},t),c.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===c&&(c===r?i:r).focus(),t.redraw()};return r.addEventListener("click",()=>u(-1,r)),i.addEventListener("click",()=>u(1,i)),e.prepend(a),a}function ri(e,t,n){Zc.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],r=t.pageSize??0,{pages:i,page:s}=Qc(a.length,r,t.page??n.pages.get(t.id)??0);if(r>0&&n.pages.set(t.id,s),i<=1){for(let m of[...e.children])m.classList.contains("nc-fx-pager")&&m.remove();delete e.dataset.ncPaged;for(let m of a)delete m.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(kg).matches===!0,u=e.closest(".nc-module");a.forEach((m,y)=>{let v=Math.floor(y/r)!==s;if(v?m.dataset.ncOffPage="":delete m.dataset.ncOffPage,v&&!l){let x=u instanceof HTMLElement?We.get(u):void 0;tg(m,Xc(x,m.dataset.ncId))}});let d=$g(e,n),c=d.querySelector('[data-nc-fx-page="prev"]'),p=d.querySelector('[data-nc-fx-page="next"]');c.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===i-1?"true":"false");let h=d.querySelector("[data-nc-fx-page-count]"),g=`${s+1} / ${i}`;h.textContent!==g&&(h.textContent=g);let f=d.querySelector("[data-nc-fx-page-live]"),b=`Effects page ${s+1} of ${i}`;f.textContent!==b&&(f.textContent=b)}function Ms(e){return e.replace(/["\\]/g,"\\$&")}function Eg(e,t=Bi){Ql();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Yc(wr(),t).has(e.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let i=document.createElement("h2");i.className="nc-title",i.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="";let d=Ai({labelledBy:i.id,onChange:v=>(We.get(n)??e).onToggle?.(v)});d.el.dataset.ncModuleSwitch="",s.append(d.el,l,u);let c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",r.append(i,c,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let h=document.createElement("button");h.type="button",h.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",h.append(g);let f=document.createElement("i");f.className="nc-token-probe",f.dataset.ncProbe="",n.append(f,r,p,h),n.setAttribute("aria-labelledby",i.id);let b=v=>{let x=We.get(n)??e;n.dataset.ncOpen=v?"false":"true",p.hidden=v,h.hidden=!v,l.textContent=v?"+":"−",l.setAttribute("aria-expanded",v?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${v?"Show":"Hide"} ${x.title}`),l.title=v?"Show":"Hide",v?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let v=n.dataset.ncOpen==="true";Ss(wr(),(We.get(n)??e).id,v,t),b(v),ii(n.parentElement)}),h.addEventListener("click",()=>{Ss(wr(),(We.get(n)??e).id,!1,t),b(!1),ii(n.parentElement)});let m={pages:new Map,redraw:()=>y.redraw()},y={el:n,update(v){We.set(n,v),v.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,i.textContent=v.title,c.textContent=v.status??"",v.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),g.textContent=v.summary??v.title,d.el.hidden=v.on===void 0,d.set(v.on===!0),v.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,h.setAttribute("aria-label",`Show ${v.title}`),xg(p,v,m),b(p.hidden),y.redraw()},redraw(){let v=We.get(n);v&&ig(n,ji(v))}};return We.set(n,e),b(a),y.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>y.redraw()).observe(n),Kl(()=>y.redraw(),n.ownerDocument),y}function Sg(e,t,n="adjacent"){Ql(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((r,i)=>{let s=i%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=a;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(r.el),r.redraw()}),ii(e)}function ii(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(i=>i instanceof HTMLElement&&i.classList.contains("nc-module")),n=t.some(i=>i.hasAttribute("data-nc-lead")),a=t.map(i=>i.hasAttribute("data-nc-slim")?o("module-slim-column"):n?i.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let r=t.filter(i=>!i.hasAttribute("data-nc-slim"));n&&t.length===4&&r.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const ed="netcomposer.studio.instances.v1",Ts="netcomposer.studio.types-seen.v1",Ag=["petra-rhythm","olive-bass"];function td(e,t){return t===1?e:`${e}#${t}`}function _i(e){const t=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(e);if(!t?.[1])return null;const n=t[2]?Number(t[2]):1;return n===1&&t[2]?null:{type:t[1],n}}function Mg(e,t){return t===1?e.name:`${e.name} ${t}`}function nn(e,t,n){const a=Mg(e,t),r=ad(n,a);return{id:td(e.id,t),type:e.id,n:t,name:r,src:e.src,...r!==a?{custom:!0}:{}}}const nd=20;function ad(e,t){return typeof e!="string"?t:[...e.replace(/\s+/g," ").trim()].slice(0,nd).join("").trim()||t}function Tg(e,t,n,a){return e.map(r=>{if(r.id!==t)return r;const i=a.find(s=>s.id===r.type);return i?nn(i,r.n,n):r})}function Lg(e,t){const n=new URLSearchParams({instance:String(e.n)});return t&&n.set("measure",""),`${e.src}?${n.toString().replace(/=(&|$)/g,"$1")}`}function Cg(e,t){const n=new Set(e.filter(r=>r.type===t.id).map(r=>r.n));let a=1;for(;n.has(a);)a++;return nn(t,a)}function In(e){return e.filter(t=>t.available!==!1).map(t=>nn(t,1))}function Ng(e,t){if(!Array.isArray(e))return In(t);const n=[];for(const a of e){const r=a&&typeof a=="object"?a:null,i=typeof a=="string"?a:r?.id;if(typeof i!="string")continue;const s=_i(i),l=s&&t.find(u=>u.id===s.type&&u.available!==!1);!s||!l||n.some(u=>u.id===i)||n.push(nn(l,s.n,r?.name))}return n.length>0||e.length===0?n:In(t)}function qi(){try{return globalThis.localStorage??null}catch{return null}}function Fg(e,t=qi()){try{const n=t?.getItem(ed);return n?Ng(JSON.parse(n),e):In(e)}catch{return In(e)}}function Ig(e,t,n=qi()){let a=Ag;try{const s=JSON.parse(n?.getItem(Ts)??"null");Array.isArray(s)&&(a=s.filter(l=>typeof l=="string"))}catch{}const r=t.filter(s=>!a.includes(s.id)&&s.available!==!1);if(r.length===0)return[...e];const i=[...e];for(const s of r)i.some(l=>l.type===s.id)||i.push(nn(s,1));try{n?.setItem(Ts,JSON.stringify([...new Set([...a,...r.map(s=>s.id)])]))}catch{}return i.length!==e.length&&an(i,n),i}function Pg(e){return e.map(t=>t.custom?{id:t.id,name:t.name}:t.id)}function an(e,t=qi()){try{t?.setItem(ed,JSON.stringify(Pg(e)))}catch{}}function zg(e,t){const n=new Map;return(a,r)=>{const i=_i(a),s=i?.type??a,l=r?.instance!==void 0?Number(r.instance):a.includes("#")?i?.n:void 0,u=e().filter(c=>c.instance.type===s);let d;if(l!==void 0&&Number.isInteger(l)&&l>=1)d=u.find(c=>c.instance.n===l);else{const c=u.filter(p=>{const h=p.window();return h!=null&&h!==n.get(p.instance.id)});d=c.find(p=>p.readyState?.()!=="complete")??c[0]??u[0]}if(!d){if(t.some(p=>p.id===s))return null;const c=l!==void 0?td(s,l):a;return{id:c,name:c}}return n.set(d.instance.id,d.window()),{id:d.instance.id,name:d.instance.name}}}const vr="netcomposer.studio.pending-presets.v1",Dg=3e3,Rg=6e4;function Ls(e){return!!e&&typeof e=="object"&&typeof e.format=="string"&&"data"in e}function Og(e,t){return new Promise(n=>{const a=setTimeout(()=>n(void 0),t);e.then(r=>{clearTimeout(a),n(r)},()=>{clearTimeout(a),n(void 0)})})}function Bg(e){const t=new Map,n=[],a=()=>{try{const s=JSON.parse(e()?.getItem(vr)??"{}"),l={};if(s&&typeof s=="object")for(const[u,d]of Object.entries(s))Ls(d)&&(l[u]=d);return l}catch{return{}}},r=s=>{try{const l=e();if(!l)return;Object.keys(s).length?l.setItem(vr,JSON.stringify(s)):l.removeItem(vr)}catch{}},i=async(s,l)=>{const u=a(),d=u[s];if(!d)return;delete u[s],r(u);let c=d.format===l.format;if(c)try{await l.set(d.data)}catch{c=!1}for(const p of n)p(s,c)};return{provide(s,l){!l||typeof l.get!="function"||typeof l.set!="function"||(t.set(s,l),i(s,l))},provided:()=>[...t.keys()],async collect(s,l=Dg){const u={};return await Promise.all(s.map(async d=>{const c=t.get(d);if(!c)return;const p=await Og(Promise.resolve().then(()=>c.get()),l);p!=null&&(u[d]={format:c.format,...c.version!==void 0?{v:c.version}:{},data:p})})),u},stash(s){const l={};for(const[u,d]of Object.entries(s))Ls(d)&&(l[u]=d);r(l)},onApplied(s){n.push(s)},pending:()=>Object.keys(a()),dropPending(){const s=Object.keys(a());return r({}),s}}}function jg(e,t){return`${e}@studio/${t}`}const _g=1,Ee=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX",identity:"instrument-nyx"},{id:"calliope",name:"Generator",src:"/calliope/",brand:"CALLIOPE",identity:"instrument-calliope",sound:!1}],Vi=[...Ee];function qg(e,t,n={}){const a=n.instruments??Ee;return{version:_g,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},...n.grab?{grab:n.grab}:{},...n.play?{play:n.play}:{},...n.countIn?{countIn:n.countIn}:{},attach(r,i){if(typeof r!="string"||r.length===0||r.length>64)return null;const s=n.resolve?n.resolve(r,i):{id:r,name:a.find(b=>b.id===r)?.name??r};if(!s)return null;const l=s.id.split("#")[0],d=a.find(b=>b.id===l)?.sound===!1?e.createGain():t.attach(s.id,s.name),c=s.id,p=n.presets,h=n.share?.host(c),g=n.picker?.host(c),f=n.notes?.host(c);return{ctx:e,output:d,...n.mapper===void 0?{}:{mapper:n.mapper},instance:c,storageKey:b=>jg(b,c),...n.holdFirstPlay?{holdFirstPlay:n.holdFirstPlay}:{},...p?{providePreset:b=>p.provide(c,b)}:{},...h?{audioReceivers:h.audioReceivers,sendAudio:h.sendAudio,onAudio:h.onAudio,reveal:h.reveal}:{},...g?{pickerTarget:g.pickerTarget}:{},...f?{notesIn:f.notesIn,notesSource:f.notesSource,notesTakeBack:f.notesTakeBack}:{},...n.clock?{clock:n.clock()}:{},...n.targets?{notesTargets:()=>n.targets?.list()??[],onNotesTargets:b=>typeof b=="function"?n.targets?.listen(b)??(()=>{}):()=>{}}:{},...n.show?{showInstance:b=>typeof b=="string"&&n.show?.(b)}:{}}}}}const Cs=16,Vg=30;function Hg(e){if(!e||typeof e!="object")return null;const t=e,n=Array.isArray(t.beats)?t.beats.slice(0,Cs+1):[],a=t.until;if(n.length<1||n.length>Cs||!n.every(l=>typeof l=="number"&&Number.isFinite(l))||n.some((l,u)=>u>0&&l<=n[u-1]))return null;const r=n[0],i=n[n.length-1];if(typeof a!="number"||!Number.isFinite(a)||a<=i||a-r>Vg)return null;const s=Array.isArray(t.accents)?t.accents:[];return{beats:[...n],accents:n.map((l,u)=>s[u]===!0),until:a}}function Ug(e,t){if(t>=e.until)return null;let n=-1;for(;n+1<e.beats.length&&e.beats[n+1]<=t;)n++;return{n:e.beats.length-Math.max(0,n),accent:n>=0&&e.accents?.[n]===!0}}function Gg(e,t){return t===null?e:`${t} · ${e}`}function Wg(e){let t=0;for(const n of e)Number.isFinite(n)&&n>t&&(t=n);return Math.round(t)}function Kg(e){const t=e.doc??document,n=t.createElement("div");n.className="count-in",n.hidden=!0,n.setAttribute("role","status");const a=t.createElement("span");a.className="count-in-who";const r=t.createElement("span");r.className="count-in-n",n.append(a,r);const i=t.title,s=new Map;let l=!1;const u=()=>{const c=e.now();for(const[x,A]of s)c>=A.until&&s.delete(x);const[p,h]=[...s][0]??[],g=h?Ug(h,c):null;if(!p||!g){n.hidden=!0,delete n.dataset.accent,t.title=i,l=!1;return}n.hidden=!1;const f=e.clearOf?.()??[],b=`${Wg(f.map(x=>x.getBoundingClientRect().bottom))}px`;n.style.getPropertyValue("--count-in-top")!==b&&n.style.setProperty("--count-in-top",b);const m=e.labelOf(p);a.textContent!==m&&(a.textContent=m);const y=String(g.n);r.textContent!==y&&(r.textContent=y),n.toggleAttribute("data-accent",g.accent),n.setAttribute("aria-label",`${m} count-in ${y}`);const v=Gg(i,g.n);t.title!==v&&(t.title=v),requestAnimationFrame(u)},d=()=>{l||(l=!0,requestAnimationFrame(u))};return{el:n,api:{show(c,p){if(typeof c!="string"||!c)return;const h=Hg(p);h&&(s.set(c,h),d())},clear(c){s.delete(c)&&d()}}}}const Yg=1e4;function Xg(e=Yg,t=globalThis){const n=new Set;let a=[];const r=()=>{if(n.size>0)return;const i=a;a=[];for(const s of i)s()};return{hold(){const i={};n.add(i);const s=t.setTimeout(()=>l(),e),l=()=>{n.delete(i)&&(t.clearTimeout(s),r())};return l},get count(){return n.size},idle(){return n.size===0?Promise.resolve():new Promise(i=>a.push(i))}}}const rd="netcomposer.studio.fx-fold.v1",Jg=["a","b","insert"],id={a:!0,b:!0,insert:!1};function od(e){try{const t=e?.getItem(rd);if(!t)return{};const n=JSON.parse(t);if(!n||typeof n!="object")return{};const a=n,r={};for(const i of Jg)typeof a[i]=="boolean"&&(r[i]=a[i]);return r}catch{return{}}}function sd(e){return{...id,...od(e)}}function ld(e,t,n){const a={...od(e),[t]:n};try{e?.setItem(rd,JSON.stringify(a))}catch{}return{...id,...a}}const cd="netcomposer.studio.insert-fold.v1";function dd(e){try{const t=e?.getItem(cd),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function ud(e,t,n){const a=[...dd(e)].filter(i=>i!==t);n&&a.push(t);const r=a.slice(-256);try{e?.setItem(cd,JSON.stringify(r))}catch{}return new Set(r)}function Qg(e,t){return sd(e).insert?(ld(e,"insert",!1),ud(e,t,!0)):dd(e)}function Ae(){try{return globalThis.localStorage??null}catch{return null}}const Zg={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function pd(e,t){const n=t.fx[e],a=ya(n);for(const r of a.chain){const i=Zg[e][r.type];n===void 0&&i&&Object.assign(r.dials,i),e==="a"?(r.bypass=r.type!=="plate",r.type==="plate"&&(r.dials.mix=100)):e==="b"?(r.bypass=r.type!=="delay",r.type==="delay"&&(r.dials.mix=100,r.dials.mode=0,r.dials.send=100)):r.bypass=r.type!=="drive"||!t.insert.on}return a}const hd="drive-1",oi=3;function eb(e,t){if(e.masterFx!==null&&e.masterFx!==void 0)return $t(e.masterFx,t);const n=e.insert.on?pd("insert",e).chain.find(a=>a.type==="drive"):void 0;return $t({v:2,chain:n?[{id:hd,type:"drive",bypass:!1,dials:{...n.dials}}]:[]},t)}function tb(e){return e.chain.some(t=>t.type==="drive"&&!t.bypass)}const nb={"no-source":"that source isn't there",empty:"the range is empty",gone:"that range is older than the 20 seconds kept","not-kept":"that source wasn't being kept yet when the range played",timeout:"no answer from the audio (is it running?)"};function ab(e,t,n,a=2e3){return(Number.isFinite(e-t)?Math.max(0,e-t):0)/n*1e3+a}const na=e=>({channels:null,reason:e,message:nb[e]});function rb(e,t){const n=new Map,a=new Map;let r=1;const i=l=>{const u=t.nodeFor(l);if(!u)return null;const d=n.get(l);if(d&&d.source===u)return d.node;d?.node.disconnect();const c=new AudioWorkletNode(e,"nc-studio-grab",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});return c.port.onmessage=p=>{const h=p.data;h.type!=="took"&&h.type!=="recorded"||(a.get(h.id)?.(h.channels,h.reason),a.delete(h.id))},u.connect(c),n.set(l,{node:c,source:u}),c},s=async(l,u,d)=>{await t.ready;const c=i(l);if(!c)return na("no-source");if(!(d>u))return na("empty");const p=r++;return new Promise(h=>{a.set(p,(g,f)=>h(g?{channels:g}:na(f??"gone"))),c.port.postMessage({type:"take",id:p,from:u,to:d}),setTimeout(()=>{a.delete(p)&&h(na("timeout"))},ab(d,e.currentTime*e.sampleRate,e.sampleRate))})};return{record(l,u){if(!t.nodeFor(l))return null;const d=n.get(l)?.node??null,c=r++;let p=d;const h=f=>p?.port.postMessage(f);p?h({type:"record",id:c,from:u}):t.ready.then(()=>{p=i(l),h({type:"record",id:c,from:u})});let g=!1;return{stop(f){return g?Promise.resolve(null):(g=!0,new Promise(b=>{a.set(c,b),h({type:"record-end",id:c,to:f}),setTimeout(()=>{a.delete(c)&&b(null)},Math.max(0,(f-e.currentTime*e.sampleRate)/e.sampleRate)*1e3+5e3)}))},cancel(){g=!0,h({type:"record-cancel",id:c})}}},sources:()=>t.sources(),latency(l){if(typeof l!="string")return 0;const u=t.latencyFor?.(l)??0;return Number.isFinite(u)&&u>0?Math.round(u):0},listen(l){return t.nodeFor(l)?(t.ready.then(()=>i(l)),!0):!1},take:(l,u,d)=>s(l,u,d).then(c=>c.channels),takeResult:s}}function ib(e){const t=()=>{};return new Proxy(e,{get(n,a,r){if(a==="stop")return t;const i=Reflect.get(n,a,r);return typeof i=="function"?i.bind(n):i}})}const ee={"picker:off":"Connects the Sample Picker on this computer, so its Send to NYX loads the pads of a NYX here. Off: the picker opens NYX on its own.","picker:connecting":"Connecting to the Sample Picker on this computer. Press to disconnect.","picker:on":"The Sample Picker is connected: its Send to NYX loads a NYX here (you choose which there). Press to disconnect.","picker:away":"The Sample Picker isn't answering: start it on this computer; the Studio keeps trying. Press to disconnect.","picker:ask":"The Sample Picker was connected. Press to connect again (Chrome may ask to let this site reach this computer).","picker:blocked":"Chrome blocks this site from reaching this computer. Allow it in the site's settings (Local network access), then press here.","transport:rec":"Records the Master to a WAV file. If nothing is sounding, Rec arms and waits: it starts on the first sound or on bar 1. Press again to cancel or stop.","transport:keep":"Saves the last minutes of the Master as a WAV, no Rec needed. It holds up to 5 min of sound; silence isn't held, so 2 min is 2 minutes of sound. K opens it.","keep:held":"How much sound Keep holds now, up to 5 min. Silence longer than 2 seconds isn't held. While the clock runs, a Keep starts on a bar line.","keep:switch":"Keeping on holds the Master's last 5 minutes of sound in this tab (about 58 MB). Off forgets it and holds nothing.","mix:sends":"The two send effects every channel feeds with its A and B knobs. The master's Sends button shows and hides them. Folded, click a column to open it.","inserts:channel":"Shows this channel's own effects, applied before its fader and sends. Press again to close them.","inserts:master":"Shows the master's own effects on the whole mix: none until you add one, up to three (EQ, compressor, drive and so on). Press again to close them.","fx:fold":"Folds this effect sideways into a narrow column so the Mix takes less room. It keeps sounding as set; a click on the column (or its ▶) opens it again.","fx:meter":"The level going into this effect (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. It keeps showing the input, greyed, while the effect is off.","fx:meter-return":"The level the sends feed into this effect (left bar) and its return (right bar), from −48 dB up to full scale; orange near clipping. Silent while the return is off.","fx:max":"Widens this card to three cards so its graph is easy to see; the dials sit under it. Click again, or press Escape, to put it back.","eq:graph":"The EQ's curve over the sound coming out right now: boosts rise above the middle line, cuts fall below it. Click it to open it wide, then drag a dot to shape it.","eq:low":"The lows, below 150 Hz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","eq:mid":"The middle band: drag up or down to boost or cut, sideways to move it, and scroll over it for narrower or wider. Double-click resets it.","eq:high":"The highs, above 6 kHz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","strip:fold":"Minimizes this channel sideways to a narrow column so more fit. It keeps playing at the same level; M and S still work, and ▶ expands it again.","strip:folded":"A minimized channel: its name, mute, solo and level meter. Click the name or ▶ to expand it. Drag the name to move it.","strip:trim":"Trim: this channel's input gain, before its Inserts and fader, −12 to +24 dB. Bring up a quiet instrument here; double-click for 0 dB.","strip:pan":"Balance: moves this channel left or right in the stereo mix by turning the other side down (its sends follow). Drag or use the arrow keys; double-click to centre it.","strip:name":"This channel's instrument. Click to show it below, drag (or touch and hold) to move the channel, double-click to rename it.","strip:rename":"Type a new name (up to 20 characters) and press Enter; Escape cancels. Leave it empty to go back to the default name.","sends:view":"Shows or hides the send effects, A · Reverb and B · Delay. Outlined while a channel sends to them. They keep sounding either way.","vu:add":"Adds analog VU meters for the finished mix beside the master: left on top, right below. 0 VU is −18 dBFS RMS.","vu:module":"The master's left (top) and right (bottom) as classic VU meters, which show average loudness. 0 VU is −18 dBFS RMS; the red is louder than that.","vu:remove":"Hides the VU meters. + Meters in the Mix header brings them back.","vu:fold":"Folds the meters to a narrow column with two thin level bars, L and R. The triangle opens them again."},ob=[60,120,300],sb={on:!1,written:0,size:0,segments:[],lastDropped:null,bytes:0,sampleRate:48e3};function md(e){return Math.max(0,Math.min(e.written,e.size))}function xr(e,t){let n=null;for(const a of e){if(a.pos>t)break;n=a}return n?n.frame+(t-n.pos):null}function lb(e,t,n){for(let a=e.length-1;a>=0;a--){const r=e[a];if(r&&r.pos<=t)return{start:r.pos,end:e[a+1]?.pos??n}}return null}function cb(e,t,n){const a=md(e);if(a<=0)return null;const r=e.written-a;let i;if("last"in t){const d=Math.round(t.last*e.sampleRate);if(d<=0||d>a)return null;i=e.written-d}else{if(e.lastDropped!==null&&e.lastDropped>=t.since)return null;let d=null;for(let c=0;c<e.segments.length;c++){const p=e.segments[c];if(!p)continue;const h=e.segments[c+1]?.pos??e.written;if(t.since<p.frame+(h-p.pos)){d=Math.max(r,p.pos+Math.max(0,t.since-p.frame));break}}if(d===null||d>=e.written)return null;i=d}let s="exact";if(n&&n.barFrames>0){const d=xr(e.segments,i),c=lb(e.segments,i,e.written);if(d!==null&&c){const p=((d-n.origin)%n.barFrames+n.barFrames)%n.barFrames,h=i-Math.round(p),g=p===0?i:i+Math.round(n.barFrames-p);p===0?s="bar":h>=Math.max(r,c.start)&&"last"in t?(i=h,s="bar"):g<Math.min(e.written,c.end)&&(i=g,s="bar")}}const l=xr(e.segments,i)??0,u=(xr(e.segments,e.written-1)??l)+1;return{from:i,to:e.written,frame:l,endFrame:u,start:s}}function si(e){const t=Math.max(0,Math.floor(e));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function db(e,t,n){const a=l=>String(l).padStart(2,"0"),r=`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}-${a(e.getHours())}${a(e.getMinutes())}`,i=`${Math.round(t*10)/10}bpm`,s="last"in n?`${Math.round(n.last/60)}m`:"since-play";return`netcomposer-keep-${r}-${i}-${s}.wav`}const fd="audio/wav";function ub(e){const t=a=>String(a).padStart(2,"0");return`netcomposer-studio-${`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}-${t(e.getHours())}${t(e.getMinutes())}`}.wav`}function pb(e,t){const n=Math.min(e.length,t.length),a=new Uint8Array(n*6);let r=0;for(let i=0;i<n;i++)for(const s of[e[i]??0,t[i]??0]){const l=Math.max(-1,Math.min(1,s)),u=Math.round(l<0?l*8388608:l*8388607);a[r++]=u&255,a[r++]=u>>8&255,a[r++]=u>>16&255}return a}function gd(e,t,n=24){const r=n/8,i=e*2*r,s=new ArrayBuffer(44),l=new DataView(s),u=(d,c)=>{for(let p=0;p<4;p++)l.setUint8(d+p,c.charCodeAt(p))};return u(0,"RIFF"),l.setUint32(4,36+i,!0),u(8,"WAVE"),u(12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,2,!0),l.setUint32(24,t,!0),l.setUint32(28,t*2*r,!0),l.setUint16(32,2*r,!0),l.setUint16(34,r*8,!0),u(36,"data"),l.setUint32(40,i,!0),new Uint8Array(s)}class hb{constructor(t,n){this.ctx=t,this.source=n}node=null;id=0;phase="idle";parts=[];frames=0;from=0;why="now";done=null;listeners=new Set;attach(){const t=this.source();if(this.node||!t)return;const n=new AudioWorkletNode(this.ctx,"nc-studio-rec",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n}get supported(){return typeof AudioWorkletNode<"u"}get state(){return this.phase}get started(){return this.phase==="recording"||this.phase==="stopping"?{from:this.from,why:this.why}:null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}arm(t=!1){this.phase==="idle"&&(this.attach(),this.node&&(this.id++,this.parts=[],this.frames=0,this.set("arming"),this.node.port.postMessage({type:"arm",id:this.id,force:t})))}schedule(t){this.phase!=="arming"&&this.phase!=="armed"||this.node?.port.postMessage({type:"at",id:this.id,at:t})}cancel(){this.phase!=="arming"&&this.phase!=="armed"||(this.node?.port.postMessage({type:"cancel",id:this.id}),this.parts=[],this.id++,this.set("idle"))}stop(){return this.phase!=="recording"||!this.node?Promise.resolve(null):(this.set("stopping"),new Promise(t=>{this.done=t,this.node?.port.postMessage({type:"stop",id:this.id})}))}set(t){if(this.phase!==t){this.phase=t;for(const n of this.listeners)n()}}message(t){if(t.id===this.id){if(t.type==="rec")t.phase==="armed"&&this.phase==="arming"?this.set("armed"):t.phase==="recording"&&(this.phase==="arming"||this.phase==="armed")?(this.from=t.from??0,this.why=t.why??"now",this.set("recording")):t.phase==="idle"&&this.phase==="stopping"&&this.finish(null);else if(t.type==="rec-data"){const[n,a]=t.channels??[];if(!n||!a)return;this.parts.push(pb(n,a)),this.frames+=n.length}else if(t.type==="rec-done"){const n=t.sampleRate??this.ctx.sampleRate,a=new Blob([gd(this.frames,n),...this.parts],{type:fd});this.finish({blob:a,name:ub(new Date),seconds:this.frames/n,from:t.from??this.from,why:this.why})}}}finish(t){this.parts=[],this.frames=0;const n=this.done;this.done=null,this.set("idle"),n?.(t)}}const bd="netcomposer.studio.keeping.v1";function mb(e){try{return e?.getItem(bd)!=="off"}catch{return!0}}function fb(e,t){try{e?.setItem(bd,t?"on":"off")}catch{}}class gb{constructor(t,n,a=!0){this.ctx=t,this.source=n,this.on=a}node=null;latest=sb;on;id=0;jobs=new Map;listeners=new Set;attach(){const t=this.source();if(this.node||!t||typeof AudioWorkletNode>"u")return;const n=new AudioWorkletNode(this.ctx,"nc-studio-keep",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n,n.port.postMessage({type:"keeping",on:this.on})}get supported(){return typeof AudioWorkletNode<"u"}get keeping(){return this.on}get status(){return this.latest}setKeeping(t){this.on=t,this.node?.port.postMessage({type:"keeping",on:t}),t||(this.latest={...this.latest,on:t,written:0,segments:[],bytes:0,lastDropped:null}),this.emit()}refresh(){this.node?.port.postMessage({type:"status"})}plan(t,n){return this.on?cb(this.latest,t,n):null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}keep(t,n){const a=this.node;if(!a||!this.on)return Promise.resolve(null);const r=++this.id;return new Promise(i=>{this.jobs.set(r,{parts:[],plan:null,rate:this.ctx.sampleRate,done:s=>{if(!s)return i(null);const l=s.plan.to-s.plan.from,u=new Blob([gd(l,s.rate,16),...s.parts],{type:fd});i({blob:u,name:db(n.when??new Date,n.bpm,t),seconds:l/s.rate,frame:s.plan.frame,endFrame:s.plan.endFrame,start:s.plan.start,choice:t})}}),a.port.postMessage({type:"keep",id:r,choice:t,grid:n.grid??null,now:this.ctx.state!=="running"})})}emit(){for(const t of this.listeners)t()}message(t){if(t.type==="keep-status"&&t.status){this.latest=t.status,this.emit();return}const n=t.id===void 0?void 0:this.jobs.get(t.id);if(!(!n||t.id===void 0)){if(t.type==="keep-plan")n.plan=t.plan??null,n.rate=t.sampleRate??n.rate,n.plan||(this.jobs.delete(t.id),n.done(null));else if(t.type==="keep-part"){if(t.data)n.parts.push(t.data);else if(t.done){this.jobs.delete(t.id),n.done(null);return}t.done&&n.plan&&(this.jobs.delete(t.id),n.done({plan:n.plan,parts:n.parts,rate:n.rate}))}}}}const yd={threshold:-3,knee:0,ratio:20,attack:.001,release:.1};function bb(e){return Math.floor(.006*e)}const li=1024,Ns=li+8192,yb=.25;function wb(e,t){let n=0;for(let a=t;a<e.length;a++)n=Math.max(n,Math.abs(e[a]??0));if(!(n>1e-6))return null;for(let a=t;a<e.length;a++)if(Math.abs(e[a]??0)>=n/2)return a-t;return null}async function vb(e,t,n=OfflineAudioContext){const a=new n(1,Ns,e),r=a.createBuffer(1,Ns,e);r.getChannelData(0)[li]=yb;const i=new AudioBufferSourceNode(a,{buffer:r}),s=t(a);i.connect(s.input),s.output.connect(a.destination),i.start(0);const l=await a.startRendering();return wb(l.getChannelData(0),li)}function xb(e,t=()=>vb(e,n=>{const a=new DynamicsCompressorNode(n,yd);return{input:a,output:a}})){let n=bb(e);const a=(async()=>{try{const r=await t();r!==null&&r>=0&&r<e/10&&(n=r)}catch{}})();return{get:()=>n,ready:a}}const pn={noManifest:"No plugin.json there. Pick the plugin's folder, or plugin.json and its DSP file.",noDsp:e=>`plugin.json names its DSP file ${e}. Pick that file too.`,badJson:"plugin.json is not JSON.",bad:e=>`plugin.json has a problem: ${e}`,tooBig:e=>`${e} is over 256 KB.`},kb=256*1024,$b=e=>e.includes("/")?e.slice(0,e.lastIndexOf("/")+1):"",aa=e=>e.webkitRelativePath||e.name;async function Eb(e){const t=[...e],a=t.filter(h=>h.name==="plugin.json").sort((h,g)=>aa(h).split("/").length-aa(g).split("/").length)[0];if(!a)throw new Error(pn.noManifest);const r=await a.text();let i;try{i=JSON.parse(r)}catch{throw new Error(pn.badJson)}const s=qa(i);if(!s.ok||!s.manifest)throw new Error(pn.bad(s.errors.join("; ")));const l=s.manifest,u=$b(aa(a))+l.dsp,d=l.dsp.split("/").pop()??l.dsp,c=t.find(h=>aa(h)===u)??t.find(h=>h!==a&&h.name===d&&!h.webkitRelativePath);if(!c)throw new Error(pn.noDsp(l.dsp));const p=await c.text();if(new TextEncoder().encode(p).length>kb)throw new Error(pn.tooBig(l.dsp));return{manifest:l,manifestText:r,dspName:l.dsp,dsp:p}}async function Sb(e,t=Date.now()){return{id:e.manifest.id,version:e.manifest.version,name:e.manifest.name,author:e.manifest.author,licence:e.manifest.licence,manifest:e.manifestText,dspName:e.dspName,dsp:e.dsp,sha256:await Fl(new TextEncoder().encode(e.dsp)),added:t}}const Fs=e=>`local:${e}`,Ca=e=>e.startsWith("local:"),wd=e=>({id:e.id,version:e.version,name:e.name,author:e.author,added:e.added});function vd(){const e=new Map;return{list:async()=>[...e.values()].sort((t,n)=>t.added-n.added).map(wd),get:async t=>e.get(t)??null,put:async t=>{e.set(t.id,t)},remove:async t=>{e.delete(t)}}}const Ab="netcomposer-studio-plugins",ra="plugins";function Mb(e=globalThis.indexedDB){const t=vd(),n=new Promise(i=>{if(!e)return i(null);try{const s=e.open(Ab,1);s.onupgradeneeded=()=>{s.result.objectStoreNames.contains(ra)||s.result.createObjectStore(ra,{keyPath:"id"})},s.onsuccess=()=>i(s.result),s.onerror=()=>i(null),s.onblocked=()=>i(null)}catch{i(null)}}),a=async(i,s,l)=>{const u=await n;return u?new Promise((d,c)=>{const p=u.transaction(ra,i),h=s(p.objectStore(ra));p.oncomplete=()=>d(h.result),p.onerror=()=>c(p.error??h.error),p.onabort=()=>c(p.error??h.error)}):l()},r=i=>{const s=i;return!!s&&typeof s.id=="string"&&typeof s.version=="string"&&typeof s.manifest=="string"&&typeof s.dsp=="string"};return{async list(){return(await a("readonly",s=>s.getAll(),async()=>{const s=await t.list();return Promise.all(s.map(l=>t.get(l.id)))})).filter(r).sort((s,l)=>s.added-l.added).map(wd)},async get(i){const s=await a("readonly",l=>l.get(i),()=>t.get(i));return r(s)?s:null},put:i=>a("readwrite",s=>s.put(i),()=>t.put(i)).then(()=>{}),remove:i=>a("readwrite",s=>s.delete(i),()=>t.remove(i)).then(()=>{})}}const Qe=-54,_n=6,_e=-Qe/(_n-Qe),Tb=-6,ci=(Tb-Qe)/(_n-Qe);function xd(e){const t=Math.min(1,Math.max(0,e));return t===0?Number.NEGATIVE_INFINITY:Qe+t*(_n-Qe)}function Lb(e){return e===Number.NEGATIVE_INFINITY?0:10**(e/20)}function Cb(e){return e<=0?Number.NEGATIVE_INFINITY:20*Math.log10(e)}function ot(e){return Lb(xd(e))}function Nb(e){if(e===Number.NEGATIVE_INFINITY||e<-99)return"−∞";const t=e.toFixed(1);return t.startsWith("-")?`−${t.slice(1)}`:e>.05?`+${t}`:t}function Fb(e){const t=e.some(n=>n.solo);return e.map(n=>n.mute||t&&!n.solo?0:ot(n.position))}function Hi(e){return e===Number.NEGATIVE_INFINITY||Number.isNaN(e)?0:Math.min(1,Math.max(0,(e-Qe)/(_n-Qe)))}function Is(e){return Hi(Cb(e))}const Ps=[0,-6,-12,-24,-48].map(e=>({value:Hi(e),label:e===0?"0":`−${-e}`})),Ib=1;function Pb(e){let t=0,n=0;for(const a of e){const r=Math.abs(a);r>t&&(t=r),n+=a*a}return{peak:t,rms:e.length>0?Math.sqrt(n/e.length):0}}function zs(e){const t=e.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(t==="")return null;if(t==="off"||t==="-inf"||t==="-∞"||t==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(t))return null;const n=Number(t.replace(",","."));return Number.isFinite(n)?n<Qe?0:Hi(Math.min(_n,n)):null}function zb(e){const t=Math.min(1,Math.max(-1,Number.isFinite(e)?e:0)),n=Math.cos(Math.abs(t)*Math.PI/2);return t>0?[n,1]:t<0?[1,n]:[1,1]}const kd="netcomposer.studio.mix.v1",$d={position:ci,mute:!1,solo:!1,sendA:0,sendB:0,pan:0,shade:0,trim:0},Ed=-12,Sd=24,Db=.5;function Ad(e){if(typeof e!="number"||!Number.isFinite(e))return 0;const t=Math.round(Math.min(Sd,Math.max(Ed,e))*10)/10;return t===0?0:t}const Rb=8;function Ob(e){return typeof e=="number"&&Number.isInteger(e)&&e>=1&&e<=Rb?e:0}function Pn(){return{v:1,channels:{},master:_e,returns:{a:{on:!0,level:_e},b:{on:!0,level:_e}},insert:{on:!1},fx:{},channelFx:{},masterFx:null}}const An=(e,t)=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t,Bb=e=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(-1,e)):0,Na=(e,t)=>typeof e=="boolean"?e:t,st=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{};function jb(e){const t=st(e);return{position:An(t.position,$d.position),mute:Na(t.mute,!1),solo:Na(t.solo,!1),sendA:Math.min(_e,An(t.sendA,0)),sendB:Math.min(_e,An(t.sendB,0)),pan:Bb(t.pan),shade:Ob(t.shade),trim:Ad(t.trim)}}function Md(e){const t=Pn(),n=st(e);if(n.v!==1)return t;const a={};for(const[d,c]of Object.entries(st(n.channels)))d.length>0&&d.length<=64&&(a[d]=jb(c));const r=st(n.returns),i=(d,c)=>{const p=st(d);return{on:Na(p.on,c.on),level:An(p.level,c.level)}},s={},l=st(n.fx);for(const d of["a","b","insert"])l[d]!==void 0&&(s[d]=l[d]);const u={};for(const[d,c]of Object.entries(st(n.channelFx)))d.length>0&&d.length<=64&&c&&typeof c=="object"&&(u[d]=c);return{v:1,channels:a,master:An(n.master,t.master),returns:{a:i(r.a,t.returns.a),b:i(r.b,t.returns.b)},insert:{on:Na(st(n.insert).on,t.insert.on)},fx:s,channelFx:u,masterFx:n.masterFx&&typeof n.masterFx=="object"?n.masterFx:null}}function Td(){try{return globalThis.localStorage??null}catch{return null}}function _b(e=Td()){try{const t=e?.getItem(kd);return t?Md(JSON.parse(t)):Pn()}catch{return Pn()}}function Ld(e,t=Td()){try{return t?.setItem(kd,JSON.stringify(e)),t!==null}catch{return!1}}const Ka=3;function qb(e,t=Ka){return Math.max(1,Math.ceil(e/t))}function Ds(e,t=Ka){return Math.max(0,Math.floor(e/t))}function Vb(e,t,n,a=null,r=Ka){const i=qb(n.length,r)-1;if(!e||e.key!==t)return 0;const s=a===null?-1:n.indexOf(a);if(s>=0)return Ds(s,r);const l=new Set(e.ids);let u=-1;return n.forEach((d,c)=>{l.has(d)||(u=c)}),u>=0?Ds(u,r):Math.min(i,Math.max(0,e.page))}const Cd=e=>!!e&&typeof e=="object"&&Array.isArray(e.chain);function Hb(e,t){if(!Cd(e))return null;const n=e.chain.findIndex(a=>a?.id===t);return n<0?null:{slot:JSON.parse(JSON.stringify(e.chain[n])),index:n}}function Ub(e,t,n){if(!Cd(e)||e.chain.length>=n||e.chain.some(r=>r?.id===t.slot.id))return null;const a=e.chain.slice();return a.splice(Math.max(0,Math.min(a.length,t.index)),0,t.slot),{...e,v:2,chain:a}}const Rs="plugin-url",kr="plugin-folder",Os="plugin-files",$r="kept:",Er="forget:",Sr="listed:",Gb="../plugins/registry.json",R={urlTitle:"Load a plugin from a URL",urlBody:"Paste the address of the plugin's plugin.json.",urlField:"Address",urlPlaceholder:"https://…/plugin.json",urlNext:"Next",warnTitle:"Run this plugin?",warnBody:e=>`This runs code from ${e} in your browser. Only load plugins from people you trust. Listed plugins are checked; this one is not.`,warnLoad:"Load and run",badUrl:"That isn't a plugin address. Use https://, or http://localhost while you build one.",badUrlLocal:"Plugins load from this computer for now: pick its files, or use http://localhost while you build one.",urlPlaceholderLocal:"http://localhost:…/plugin.json",folder:"Load plugin folder…",files:"Load plugin from files…",url:"Load plugin from URL…",thisComputer:"this computer",kept:e=>`${e} (this computer)`,fileWarnBody:(e,t)=>`This runs ${e} by ${t}, from files on this computer, in your browser. Only run code you made or trust. It is kept in this browser until you remove it.`,forget:e=>`Remove ${e} from this computer…`,forgetTitle:e=>`Remove ${e}?`,forgetBody:"This browser forgets its copy. Slots that use it keep their dials and play as a wire after a reload.",forgetConfirm:"Remove",forgotten:e=>`${e} is removed from this computer.`,reloadToUse:(e,t)=>`Kept ${e} ${t}. Reload the page to hear the new code.`,reloadToHear:e=>`${e} has new code. Reload the page to hear it; until then the old code plays.`,reloadAction:"Reload",newCode:"Reload page: new code.",stuck:(e,t)=>`${e} on ${t} got stuck in a loop and was stopped. The rest of the mix plays on.`,frozenTitle:"The sound stopped",frozenBody:e=>`${e} froze the audio on this page, and it can't be restarted here. In a new tab your mix comes back with ${e} off (add it again to retry). This page stops saving.`,frozenOpen:"Open new tab",frozenStay:"Stay here",frozenShort:"Stopped: froze audio.",notKept:"Not on this computer.",pickAgain:"Pick files…",badUrlShort:"Not a plugin address.",failedShort:"Couldn't load it.",missing:"Missing: not loaded.",missingNoUrl:"Missing: no address saved.",through:"Sound passes through.",dialsKept:"Its dials are kept.",from:e=>`From ${e}`,load:"Load",loadAsk:"Load…",loading:"Loading…",retry:"Remove, add to retry."};function Wb(e){const t={1:"Stopped: failed to start.",2:"Stopped: it crashed.",3:"Stopped: bad numbers.",4:"Stopped: a dial crashed it.",5:"Stopped: code not loaded.",6:"Stopped: stuck in a loop."};for(const[n,a]of Object.entries(wa))if(a===e)return t[Number(n)];return"Stopped."}function hn(e){if(Ca(e))return R.thisComputer;try{return new URL(e).host||e}catch{return e}}function Kb(e,t,n=!0){let a;try{a=new URL(e.trim(),t)}catch{return null}const r=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(a.hostname);return a.protocol==="https:"&&(n||r)||a.protocol==="http:"&&r?a.href:null}function Yb(e){const t=new URL(Gb,e.base).href;let n=[];const a=new Set,r=new Map,i=[],s=new Set,l=()=>{for(const E of s)E()},u=E=>String(E?.message??E).replace(/^nc-fx plugins?: /,""),d=e.remote!==!1,c=e.store??vd();let p=[];const h=new Map,g=new Set,f=E=>{g.has(E)||(g.add(E),l())},b=e.frozen,m=async()=>{try{p=await c.list()}catch(E){console.warn(`Studio plugins: can't read this computer's plugins (${u(E)})`)}l()},y=m(),v=d?Jp(t,{fetch:e.fetch}).then(E=>{n=E.registry.plugins;for(const k of E.errors)console.warn(`Studio plugins: registry ${k}`);l();const w=i.splice(0);w.length&&A.restore(w)}).catch(E=>{console.info(`Studio plugins: no listed plugins (${u(E)})`)}):Promise.resolve(),x=async(E,w)=>{a.add(E),r.delete(E),l();try{const{entry:k,stale:T}=await w();return k.plugin&&(T&&f(k.plugin.id),b?.clear(k.plugin.id)),k.type}catch(k){throw r.set(E,u(k)),k}finally{a.delete(E),l()}},A={listed:()=>n,loaded:()=>$p().filter(E=>!E.plugin.listed&&!Ca(E.plugin.url)),remote:d,local:()=>p,stale:E=>g.has(E),frozen:E=>!!b?.has(E),async addPicked(E){const w=await Sb(E);b?.clear(w.id);const k=de(`plugin:${w.id}`);if(k){const M=k.plugin?.version===w.version&&h.get(w.id)===w.sha256;return await c.put(w),await m(),M||f(w.id),M?{type:k.type}:{reload:!0}}const T=await x(w.id,()=>Do(e.ctx,{manifest:w.manifest,dsp:w.dsp,dspName:w.dspName},{moduleUrl:e.moduleUrl,url:Fs(w.id)}));return h.set(w.id,w.sha256),await c.put(w),await m(),{type:T}},async loadKept(E){b?.clear(E);const w=de(`plugin:${E}`),k=await c.get(E);if(w){const M=h.get(E);return k&&M&&M!==k.sha256&&f(E),w.type}if(!k)throw new Error(R.notKept);const T=await x(E,()=>Do(e.ctx,{manifest:k.manifest,dsp:k.dsp,dspName:k.dspName},{moduleUrl:e.moduleUrl,url:Fs(E)}));return h.set(E,k.sha256),T},async forget(E){await c.remove(E),await m()},listingFor(E){const w=n.find(T=>T.id===E.id);if(!w)return null;const k=new URL(w.manifest,t).href;return!E.url||E.url===k?w:null},loading:E=>a.has(E),async loadListed(E){b?.clear(E);const w=de(`plugin:${E}`);if(w)return w.type;await v;const k=n.find(T=>T.id===E);if(!k)throw new Error(`${E} isn't listed`);return x(E,()=>Qp(e.ctx,k,t,{moduleUrl:e.moduleUrl,fetch:e.fetch}))},loadUrl(E){return x("url",()=>zl(e.ctx,E,{moduleUrl:e.moduleUrl,fetch:e.fetch,base:e.base}))},restore(E){for(const w of E)if(!(w.status!=="missing"||a.has(w.id)||de(`plugin:${w.id}`))&&!b?.has(w.id)){if(Ca(w.url)){y.then(()=>{p.some(k=>k.id===w.id)&&!a.has(w.id)&&!de(`plugin:${w.id}`)&&A.loadKept(w.id).catch(()=>{})});continue}if(d){if(!n.length){i.some(k=>k.id===w.id)||i.push(w);continue}A.listingFor(w)&&A.loadListed(w.id).catch(()=>{})}}},onChange(E){return s.add(E),()=>s.delete(E)},problem:E=>r.get(E)??null,clearProblem(E){r.delete(E)&&l()}};return A}const Nd="netcomposer.studio.sends.v2";function Xb(e){try{return e?.getItem(Nd)==="1"}catch{return!1}}function Jb(e,t){try{e?.setItem(Nd,t?"1":"0")}catch{}}function Qb(e,t){try{return!!(e?.matchMedia(t.portrait).matches||e?.matchMedia(t.landscape).matches)}catch{return!1}}function Fa(e){return e.hacksShown!==null?{kind:"stack",id:e.hacksShown}:e.sendsShown?{kind:"sends"}:{kind:"none"}}function Zb(e){return Fa(e).kind==="sends"?{hacksShown:null,sendsShown:!1}:{hacksShown:null,sendsShown:!0}}function ey(e){for(const t of e)if(t.sendA>0||t.sendB>0)return!0;return!1}function Bs(e,t){return e&&!t}function ty(e,t,n){return e&&Fa(t).kind==="none"&&n.every(a=>a===0)}const Fd="netcomposer.studio.strip-fold.v1";function Id(e){try{const t=e?.getItem(Fd),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Pd(e,t){try{e?.setItem(Fd,JSON.stringify([...t].sort()))}catch{}return t}function zd(e,t,n){const a=new Set(Id(e));return n?a.add(t):a.delete(t),Pd(e,a)}function ny(e,t){return zd(e,t,!1)}function ay(e,t){const n=new Set(t),a=Id(e),r=new Set([...a].filter(i=>n.has(i)));return r.size===a.size?a:Pd(e,r)}function ry(e,t){if(!e.includes(t.id))return[...e];const n=e.filter(i=>i!==t.id),a=t.before===null?-1:n.indexOf(t.before),r=a<0?n.length:a;return[...n.slice(0,r),t.id,...n.slice(r)]}function iy(e,t,n){const a=e.indexOf(t);if(a<0)return null;const r=a+n;return r<0||r>=e.length?null:n<0?{id:t,before:e[r]}:{id:t,before:e[r+1]??null}}function oy(e,t){if(e.length===0)return null;let n=e[0],a=Number.POSITIVE_INFINITY;for(const r of e){const i=t<r.left?r.left-t:t>r.left+r.width?t-(r.left+r.width):0;i<a&&(n=r,a=i)}return{target:n.id,side:t<n.left+n.width/2?"before":"after"}}function js(e,t,n){const a=e.indexOf(n.target);if(a<0||!e.includes(t))return null;const r=n.side==="before"?n.target:e[a+1]??null;if(r===t)return null;const i={id:t,before:r};return ry(e,i).every((l,u)=>l===e[u])?null:i}const sy=-18,ly=-20,Dd=3,cy=[-20,-10,-7,-5,-3,-2,-1,0,1,2,3],_s=[-20,-10,-7,-5,-3,0,1,2,3],dy=.3,uy=6.638/dy,py=48;function hy(e){return e-sy}function Rd(e){return Number.isFinite(e)?Math.min(1,Math.max(0,10**((e-Dd)/20))):e>0?1:0}function my(e){return e>0?Rd(hy(20*Math.log10(e))):0}function Ui(e){return(Math.min(1,Math.max(0,e))*2-1)*py}const qs={x:0,v:0};function fy(e,t,n,a=!1){if(a)return{x:t,v:0};if(!(n>0))return e;const r=uy,i=e.x-t,s=e.v+r*i,l=Math.exp(-r*n),u=t+(i+s*n)*l,d=(e.v-r*s*n)*l;return u>=1?{x:1,v:0}:u<=0?{x:0,v:0}:{x:u,v:d}}function gy(e,t){return Math.abs(e.x-t)<1e-4&&Math.abs(e.v)<.001}const Od="netcomposer.studio.vu.v1";function by(e){try{return e?.getItem(Od)==="1"}catch{return!1}}function yy(e,t){try{e?.setItem(Od,t?"1":"0")}catch{}}const Bd="netcomposer.studio.vu-fold.v1";function wy(e){try{return e?.getItem(Bd)==="1"}catch{return!1}}function vy(e,t){try{e?.setItem(Bd,t?"1":"0")}catch{}}const xy="http://www.w3.org/2000/svg",di=200,Ar=112,Vt=di/2,Mn=132,Vs=100,ky=108,$y=105,Ey=116,Sy=103,Ay=112,He=(e,t)=>{const n=document.createElementNS(xy,e);for(const[a,r]of Object.entries(t))n.setAttribute(a,String(r));return n},Hs=e=>Math.round(e*100)/100;function Tn(e,t){const n=Ui(Rd(e))*Math.PI/180;return[Hs(Vt+t*Math.sin(n)),Hs(Mn-t*Math.cos(n))]}function Us(e,t,n){const[a,r]=Tn(e,n),[i,s]=Tn(t,n);return`M ${a} ${r} A ${n} ${n} 0 0 1 ${i} ${s}`}const My=e=>e>0?`+${e}`:e<0?`−${-e}`:"0";function Gs(e){const t=He("svg",{class:"vu-meter",viewBox:`0 0 ${di} ${Ar}`,role:"img","aria-label":`${e==="L"?"Left":"Right"} VU meter`,"data-vu-side":e});t.append(He("rect",{class:"vu-face",x:.5,y:.5,width:di-1,height:Ar-1,rx:4})),t.append(He("path",{class:"vu-arc",d:Us(ly,0,Vs)})),t.append(He("path",{class:"vu-zone",d:Us(0,Dd,Sy)}));for(const i of cy){const[s,l]=Tn(i,Vs),[u,d]=Tn(i,_s.includes(i)?ky:$y);t.append(He("line",{class:i>0?"vu-tick vu-red":"vu-tick",x1:s,y1:l,x2:u,y2:d}))}for(const i of _s){const[s,l]=Tn(i,Ey),u=He("text",{class:i>0?"vu-num vu-red":"vu-num",x:s,y:l,"text-anchor":"middle"});u.textContent=Math.abs(i)===20||i===3?My(i):String(Math.abs(i)),t.append(u)}const n=He("text",{class:"vu-legend",x:Vt,y:92,"text-anchor":"middle"});n.textContent="VU";const a=He("text",{class:"vu-side",x:10,y:Ar-10});a.textContent=e;const r=He("line",{class:"vu-needle",x1:Vt,y1:Mn,x2:Vt,y2:Mn-Ay,transform:`rotate(${Ui(0)} ${Vt} ${Mn})`});return t.append(n,a,r),{svg:t,needle:r}}function Ty(e){const t=document.createElement("div");t.className="vu",t.dataset.vu="",t.setAttribute("role","group"),t.setAttribute("aria-label","VU meters");const n=document.createElement("div");n.className="vu-hd";const a=document.createElement("button");a.type="button",a.className="nc-fold-toggle",a.dataset.vuFold="";const r=document.createElement("span");r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),a.append(r),a.setAttribute("data-nc-help",ee["vu:fold"]);const i=document.createElement("span");i.className="nc-strip-name vu-name",i.textContent="Meters",i.setAttribute("data-nc-help",ee["vu:module"]);const s=document.createElement("button");s.type="button",s.className="nc-page-action vu-hide",s.dataset.vuRemove="",s.textContent="Hide",s.setAttribute("aria-label","Hide VU meters"),s.setAttribute("data-nc-help",ee["vu:remove"]),s.addEventListener("click",()=>e.onRemove(s)),n.append(a,i,s);const l=document.createElement("div");l.className="vu-mini",l.setAttribute("aria-hidden","true");const u=["L","R"].map(y=>{const v=document.createElement("span");v.className="vu-bar",v.dataset.side=y;const x=document.createElement("span");return x.className="vu-bar-fill",v.append(x),l.append(v),x});let d=e.folded;const c=()=>{t.toggleAttribute("data-folded",d),a.setAttribute("aria-expanded",d?"false":"true"),a.setAttribute("aria-label",d?"Expand VU meters":"Minimize VU meters"),a.title=d?"Expand":"Minimize"};c(),a.addEventListener("click",()=>{d=!d,c(),e.onFold(d)});const p=Gs("L"),h=Gs("R");t.append(n,p.svg,h.svg,l);const g=matchMedia("(prefers-reduced-motion: reduce)"),f=[qs,qs],b=[Number.NaN,Number.NaN],m=[p.needle,h.needle];return{el:t,frame(y,v){let x=!1;for(const A of[0,1]){const E=y?my(y[A]):0;f[A]=fy(f[A],E,v,g.matches),(!gy(f[A],E)||E>0)&&(x=!0);const w=Math.round(Ui(f[A].x)*10)/10;w!==b[A]&&(b[A]=w,m[A].setAttribute("transform",`rotate(${w} ${Vt} ${Mn})`),u[A].style.transform=`scaleY(${Math.max(0,Math.min(1,f[A].x)).toFixed(3)})`,t.dataset[A===0?"vuL":"vuR"]=w.toFixed(1))}return x}}}const Ly="netcomposer.studio.hidden.v1",ia=1/120,it="master",Ws="Inserts",Cy="(max-width: 768px)",jd=8,ma=e=>Nb(xd(e)),Ks=e=>{const t=ma(e);return t==="−∞"?"off":`${t} dB`};function Ny(e,t){return Ut.find(n=>n.type===e)?.dials.find(n=>n.key===t)}function Fy(e,t,n){const a=n.bpm,r=$=>{const L=n.order(),N=L.indexOf($);return N<0?L.length:N},i=($,L,N,z)=>{const I=Ny(N,z);if(!I||!L)return null;const Y=Number(L.getParam(N,z)??I.default),Q=`mix-${$}-${z}`;return I.options?{type:"select",id:Q,label:I.label,value:String(Y),options:I.options.map(P=>({value:String(P.value),label:P.label})),onChange:P=>{L.setParam(N,z,Number(P)),ne.render()}}:{type:"slider",id:Q,label:I.label,min:I.min,max:I.max,step:I.step??1,taper:Jo(I),value:Y,valueText:I.format(Y,a()),onChange:P=>{L.setParam(N,z,P),ne.render()}}},s=($,L,N,z)=>z.map(I=>i($,L,N,I)).filter(I=>I!==null),l=matchMedia(Cy);let u=null;const d=$=>{u=$,ne.render()},c=$=>d(u===$?null:$);l.addEventListener("change",()=>ne.render());const p=($,L,N,z)=>{$.setParam(L,N,z),ne.render()},h=($,L,N,z)=>Ah(L,N,{id:`hack-${$}-${N}-graph`,on:z,set:(I,Y)=>p(L,N,I,Y),help:{graph:ee["eq:graph"],low:ee["eq:low"],mid:ee["eq:mid"],high:ee["eq:high"]}}),g=($,L,N,z)=>{const I=Number(L.getParam(N,z.key)??z.default),Y=`hack-${$}-${N}-${z.key}`,Q=P=>p(L,N,z.key,P);return z.options?{type:"select",id:Y,label:z.label,value:String(I),options:z.options.map(P=>({value:String(P.value),label:P.label})),onChange:P=>Q(Number(P))}:{type:"slider",id:Y,label:z.label,min:z.min,max:z.max,step:z.step??.001,taper:Jo(z),value:I,valueText:Al(z,I,a()),onChange:Q}},f="",b={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3},drive:{drive_db:6}};let m=Qg(Ae(),`${it}/${hd}`);const y=$=>({folded:m.has($),onFold:L=>{m=ud(Ae(),$,L),ne.render()},foldHelp:ee["fx:fold"]}),v=n.plugins;v?.onChange(()=>ne.render());const x=new Map,A=$=>String($?.message??$).replace(/^nc-fx plugins?: /,""),E=($,L,N)=>{x.set($,L),ne.render(),bn({message:N,duration:9e3,anchor:se.el.querySelector(`[data-nc-id='hack-${$}-add']`)})},w=($,L)=>{const N=bn({message:L,duration:12e3,actionLabel:R.reloadAction,onAction:()=>location.reload(),anchor:se.el.querySelector(`[data-nc-id='hack-${$}-add']`)});N.el.dataset.pluginReload=$},k=$=>de($)?.label??$,T=$=>!!$&&$.startsWith("plugin:")&&!!v?.stale($.slice(7)),M=async($,L,N)=>{if(!v)return null;const z=N??await dm({title:R.urlTitle,body:R.urlBody,field:{label:R.urlField,placeholder:v.remote?R.urlPlaceholder:R.urlPlaceholderLocal,type:"url"},confirmLabel:R.urlNext,returnFocus:L??void 0});if(!z)return null;const I=Kb(z,location.href,v.remote);if(!I)return E($,R.badUrlShort,v.remote?R.badUrl:R.badUrlLocal),null;if(!await Xe({title:R.warnTitle,body:R.warnBody(hn(I)),confirmLabel:R.warnLoad,danger:!0,returnFocus:L??void 0}))return null;try{const Q=await v.loadUrl(I);return T(Q)&&w($,R.reloadToHear(k(Q))),Q}catch(Q){return Q?.reload?(x.set($,R.failedShort),ne.render(),w($,A(Q))):E($,R.failedShort,A(Q)),null}},C=$=>{const L=document.createElement("input");return L.type="file",L.hidden=!0,L.dataset.ncId="plugin-files",$?L.webkitdirectory=!0:(L.multiple=!0,L.accept=".json,.js,.mjs,application/json,text/javascript"),document.body.append(L),new Promise(N=>{const z=I=>{L.remove(),N(I)};L.addEventListener("change",()=>z(L.files?.length?[...L.files]:null)),L.addEventListener("cancel",()=>z(null)),L.click()})},F=async($,L,N)=>{if(!v)return null;const z=await C(N);if(!z)return null;let I;try{I=await Eb(z)}catch(Q){return E($,R.failedShort,A(Q)),null}if(!await Xe({title:R.warnTitle,body:R.fileWarnBody(I.manifest.name,I.manifest.author),confirmLabel:R.warnLoad,danger:!0,returnFocus:L??void 0}))return null;try{const Q=await v.addPicked(I);return"reload"in Q?(w($,R.reloadToUse(I.manifest.name,I.manifest.version)),null):Q.type}catch(Q){return E($,R.failedShort,A(Q)),null}},q=async($,L,N)=>{if(!v)return;const z=v.local().find(Y=>Y.id===L)?.name??L;await Xe({title:R.forgetTitle(z),body:R.forgetBody,confirmLabel:R.forgetConfirm,danger:!0,returnFocus:N??void 0})&&(await v.forget(L),bn({message:R.forgotten(z),duration:5e3,anchor:se.el.querySelector(`[data-nc-id='hack-${$}-add']`)}))},U=async($,L,N,z)=>{x.delete($);let I=N;if(N===kr||N===Os)I=await F($,z,N===kr);else if(N.startsWith(Er))await q($,N.slice(Er.length),z),I=null;else if(N.startsWith($r)&&v){ne.render();try{I=await v.loadKept(N.slice($r.length)),T(I)&&w($,R.reloadToHear(k(I)))}catch(Y){E($,R.failedShort,A(Y)),I=null}}else if(N===Rs)I=await M($,z);else if(N.startsWith(Sr)&&v){ne.render();try{I=await v.loadListed(N.slice(Sr.length))}catch(Y){E($,R.failedShort,A(Y)),I=null}}I&&L.addEffect(I,{dials:b[I]}),ne.render()},X=()=>v?[...v.listed().map($=>({value:`${Sr}${$.id}`,label:$.name,group:"Plugins"})),...v.local().map($=>({value:`${$r}${$.id}`,label:R.kept($.name),group:"Plugins"})),...v.loaded().map($=>({value:$.type,label:`${$.label} (${hn($.plugin.url)})`,group:"Plugins"})),{value:kr,label:R.folder,group:"Plugins"},{value:Os,label:R.files,group:"Plugins"},{value:Rs,label:R.url,group:"Plugins"},...v.local().map($=>({value:`${Er}${$.id}`,label:R.forget($.name),group:"Plugins"}))]:[];let fe=null,ge=null,re=null;const ie=$=>t.masterFx===$||t.list().some(L=>L.fx===$),G=$=>requestAnimationFrame(()=>se.el.querySelector($)?.focus()),ze=($,L,N,z,I,Y,Q)=>{const P=Hb(N.getState(),z);if(!P||!N.removeEffect(z))return;const he=!!Q&&Q===document.activeElement;if(re?.close(),ne.render(),he){const bt=N.getChain()[P.index];G(bt?`[data-nc-id='hack-${$}-${bt.id}'] [data-nc-fx-remove]`:`#hack-${$}-add-type`)}const W=bn({message:`${I} removed from ${L}.`,actionLabel:"Undo",anchor:se.el.querySelector("[data-nc-area='fx']"),onAction:()=>K($,N,P,Y),onClose:()=>{re===W&&(re=null)}});W.el.dataset.insertUndo=$,re=W},K=($,L,N,z)=>{if(!ie(L))return;const I=Ub(L.getState(),N,z);let Y=N.slot.id;if(I)L.setState(I);else{const{type:Q,dials:P,bypass:he}=N.slot;Y=L.addEffect(Q,{index:N.index,dials:P,bypass:he})}Y&&(u=$,ge=`hack-${$}-${Y}`,ne.render(),G(`[data-nc-id='hack-${$}-${Y}'] [data-nc-fx-remove]`))},be=($,L,N,z)=>{const I=N.getChain(),Y=I.map((P,he)=>{const W=de(P.type),bt=W?.dials??[],xo=ue=>ze($,L,N,P.id,P.name,z,ue),ko=ue=>{N.moveEffect(P.id,ue),ge=`hack-${$}-${P.id}`,ne.render()},ln=[];he>0&&ln.push({type:"button",id:`hack-${$}-${P.id}-left`,label:"Move left",on:!1,onPress:()=>ko(he-1)}),he<I.length-1&&ln.push({type:"button",id:`hack-${$}-${P.id}-right`,label:"Move right",on:!1,onPress:()=>ko(he+1)}),ln.push({type:"button",id:`hack-${$}-${P.id}-remove`,label:"Remove",ariaLabel:`Remove ${P.name} from ${L}`,on:!1,onPress:()=>xo(document.getElementById(`hack-${$}-${P.id}-remove`))});const $o={onRemove:ue=>xo(ue),removeLabel:`Remove ${P.name}`},le=P.plugin,Ce=(ue,yt,Pt=!1)=>({type:"note",id:`hack-${$}-${P.id}-${ue}`,...Pt?{tone:"danger"}:{},text:yt});if(le&&le.status==="missing"){const ue=v?.listingFor(le)??null,yt=Ca(le.url),Pt=yt&&!!v?.local().some(Gn=>Gn.id===le.id),Eo=v?.loading(le.id)??!1,So=Eo?[Ce("missing",R.loading)]:[Ce("missing",v?.frozen(le.id)?R.frozenShort:yt&&!Pt?R.notKept:le.url?R.missing:R.missingNoUrl,!0),Ce("through",R.through),Ce("kept",R.dialsKept),...le.url?[Ce("from",R.from(hn(le.url)))]:[]];return v&&le.url&&!Eo&&So.push({type:"button",id:`hack-${$}-${P.id}-load`,label:ue||Pt?R.load:yt?R.pickAgain:R.loadAsk,ariaLabel:ue||Pt?`Load ${le.name}`:yt?`Pick ${le.name}'s folder (asks first)`:`Load ${le.name} from ${hn(le.url)} (asks first)`,on:!1,onPress:()=>{const Gn=document.getElementById(`hack-${$}-${P.id}-load`);ue?v.loadListed(le.id).catch(()=>ne.render()):Pt?v.loadKept(le.id).catch(()=>ne.render()):yt?F($,Gn,!0).then(()=>ne.render()):M($,Gn,le.url)}}),{type:"fx",id:`hack-${$}-${P.id}`,title:`${he+1} · ${P.name}`,...y(`${$}/${P.id}`),depth:he%4+1,controls:So,more:ln,...$o}}const It=W&&"plugin"in W?W.plugin:void 0,Vu=It?[Ce("by",`By ${It.author}`),Ce("version",`${It.licence} · ${It.version}`),Ce("source",It.listed?"Listed":R.from(hn(It.url)))]:[],Hu=le?.status==="failed"?[Ce("failed",Wb(le.error),!0),Ce("through",R.through),Ce("retry",R.retry)]:le&&v?.stale(le.id)?[Ce("newcode",R.newCode)]:[];return{type:"fx",id:`hack-${$}-${P.id}`,title:`${he+1} · ${P.name}`,...y(`${$}/${P.id}`),depth:he%4+1,on:!P.bypass,meter:dr(N,P.id)??void 0,meterHelp:ee["fx:meter"],onToggle:ue=>{N.setParam(P.id,"bypass",!ue),ne.render()},controls:[...Hu,...P.type==="eq"?[h($,N,P.id,!P.bypass)]:[],...bt.filter(ue=>!ue.more).map(ue=>g($,N,P.id,ue))],maxHelp:ee["fx:max"],...$o,more:[...bt.filter(ue=>ue.more).map(ue=>g($,N,P.id,ue)),...Vu,...ln]}}),Q=I.length>=z;return Y.push({type:"fx",id:`hack-${$}-add`,title:`${L} · Inserts`,...y(`${$}/add`),depth:I.length%4+1,controls:[{type:"note",id:`hack-${$}-note`,...x.get($)?{tone:"danger"}:{},text:x.get($)??(v?.loading("url")||v?.listed().some(P=>v.loading(P.id))||v?.local().some(P=>v.loading(P.id))?R.loading:Q?`${I.length} of ${z}: the stack is full.`:I.length===0?"No effects yet.":`${I.length} of ${z}, first to last.`)},...Q?[]:[{type:"select",id:`hack-${$}-add-type`,label:"Add",value:f,options:[{value:f,label:"Effect…"},...vp.map(P=>({value:P,label:de(P)?.label??P})),...X()],onChange:P=>{if(P===f)return;const he=document.getElementById(`hack-${$}-add-type`);he instanceof HTMLSelectElement&&(he.value=f),U($,N,P,he)}}]]}),Y},ve=$=>{const L=t.returns[$];return{type:"slider",id:`mix-${$}-return`,label:"Return",min:0,max:1,step:ia,value:L.level,valueText:Ks(L.level),onChange:N=>t.setReturn($,{level:N})}};let pe=Xb(Ae());const De=()=>Qb(globalThis.window,{portrait:Kc,landscape:Jl}),ju=()=>{const $=Zb({hacksShown:u,sendsShown:pe});u=$.hacksShown,$.sendsShown!==pe&&(pe=$.sendsShown,Jb(Ae(),pe)),ne.render()},co=($,L,N)=>{const z=iy(n.order(),$,L);if(!z)return;n.onReorder?.(z.id,z.before);const Y=se.el.querySelector(`${lt}[data-nc-id="strip-${CSS.escape($)}"]`)?.querySelector(N);Y&&document.activeElement!==Y&&Y.focus()};let uo=ay(Ae(),n.order());const po=()=>ty(De(),{hacksShown:u,sendsShown:pe},t.list().map($=>$.strip.trim)),_u=()=>[...t.list()].sort(($,L)=>r($.id)-r(L.id)).map($=>({type:"strip",id:`strip-${$.id}`,label:$.name,value:$.strip.position,valueText:ma($.strip.position),step:ia,defaultValue:ci,resetText:`${ma(ci)} dB`,ticks:[...Ps],mute:$.strip.mute,solo:$.strip.solo,silent:$.silent,sendsHidden:Bs(De(),pe),onChange:L=>t.set($.id,{position:L}),onTypeIn:L=>{const N=zs(L);N!==null&&t.set($.id,{position:N})},onRemove:L=>n.onRemove($.id,L),folded:uo.has($.id),onFold:L=>{uo=zd(Ae(),$.id,L),ne.render()},foldHelp:ee["strip:fold"],foldedHelp:ee["strip:folded"],onMove:L=>co($.id,L,"[data-nc-strip-grip]"),shade:$.strip.shade,onShade:L=>t.set($.id,{shade:L??0}),...$.fx?{hacks:u===$.id,hacksLabel:Ws,hacksEmpty:$.fx.getChain().length===0,onHacks:()=>c($.id)}:{},trim:{id:`trim-${$.id}`,value:$.strip.trim,min:Ed,max:Sd,step:Db,defaultValue:0,ariaLabel:`${$.name} trim`,help:ee["strip:trim"],onChange:L=>t.set($.id,{trim:Ad(L)})},trimHidden:po(),pan:{id:`pan-${$.id}`,value:$.strip.pan,ariaLabel:`${$.name} pan`,help:ee["strip:pan"],onChange:L=>t.set($.id,{pan:Math.abs(L)<.005?0:L})},onMute:()=>t.set($.id,{mute:!$.strip.mute}),onSolo:()=>t.set($.id,{solo:!$.strip.solo}),sends:["A","B"].map(L=>{const N=L==="A"?"sendA":"sendB",z=$.strip[N];return{id:`send-${L.toLowerCase()}-${$.id}`,label:L,ariaLabel:`${$.name} send ${L}`,min:0,max:_e,step:ia*2,value:z,valueText:Ks(z),defaultValue:0,onChange:I=>t.set($.id,{[N]:I})}})})),qu=()=>({type:"strip",id:`strip-${it}`,label:"Master",master:!0,sendsHidden:Bs(De(),pe),trimRow:!0,trimHidden:po(),onSendsView:ju,sendsView:Fa({hacksShown:u,sendsShown:pe}).kind==="sends",sendsViewEmpty:!ey(t.list().map($=>$.strip)),sendsViewLabel:"Sends",sendsViewHelp:ee["sends:view"],...t.masterFx?{hacks:u===it,hacksLabel:Ws,hacksEmpty:t.masterFx.getChain().length===0,onHacks:()=>c(it)}:{},channels:2,value:t.masterPositionValue,valueText:ma(t.masterPositionValue),step:ia,defaultValue:_e,resetText:"0.0 dB",ticks:[...Ps],onChange:$=>t.setMaster($),onTypeIn:$=>{const L=zs($);L!==null&&t.setMaster(L)}});let ho=sd(Ae());const mo=$=>({folded:ho[$],foldSlim:!0,onFold:L=>{ho=ld(Ae(),$,L),ne.render()},foldHelp:ee["fx:fold"]});let on=by(Ae()),Ft=null,sn=!0;const fo=$=>{on=$,sn=!0,yy(Ae(),$),ne.render()},go=()=>{const $=t.returns.a,L=t.returns.b,N=u===it&&t.masterFx?{id:it,name:"Master",fx:t.masterFx}:(()=>{const W=t.list().find(bt=>bt.id===u);return W?.fx?{id:W.id,name:W.name,fx:W.fx}:null})();N||(u=null);const z=t.masterFx?.getChain()??[],I=[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:$.on,onToggle:W=>t.setReturn("a",{on:W}),meter:dr($.fx)??void 0,meterHelp:ee["fx:meter-return"],...mo("a"),controls:[ve("a"),...s("a",$.fx,"plate",["decay","size"])],more:s("a",$.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:L.on,onToggle:W=>t.setReturn("b",{on:W}),meter:dr(L.fx)??void 0,meterHelp:ee["fx:meter-return"],...mo("b"),controls:[ve("b"),...s("b",L.fx,"delay",["delay_beats","feedback"])],more:s("b",L.fx,"delay",["tone","low_cut"])}],Y=N?[...be(N.id,N.name,N.fx,N.id===it?oi:jd)]:pe?I:[],Q=N?.id??"sends",P=Y.map(W=>W.id),he=Vb(fe,Q,P,ge);return fe={key:Q,ids:P,page:he},ge=null,{id:"mix",title:"Mix",summary:`${t.list().map(W=>W.name).join(", ")||"No instruments"} · A Reverb · B Delay · Master ${z.filter(W=>!W.bypass).map(W=>W.name).join(", ")||"no inserts on"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[..._u(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(W=>({value:W.id,label:W.available===!1?`${W.name} (soon)`:W.name,disabled:W.available===!1})),onAdd:W=>n.onAdd(W)}]},{id:"fx",area:"fx",label:N?`${N.name} inserts`:"Send effects",pageSize:Ka,page:he,onPage:W=>{fe&&(fe={...fe,page:W})},controls:Y},...on?[{id:"meters",area:"meters",label:"VU meters",controls:[]}]:[],{id:"master",area:"master",label:"Master",controls:[qu()]}]}},se=Eg(go(),Ly),bo=()=>se.el.toggleAttribute("data-hacks-folded",Fa({hacksShown:u,sendsShown:pe}).kind==="none"&&l.matches);bo();const Re=document.createElement("button");Re.type="button",Re.className="nc-page-action vu-add",Re.dataset.vuAdd="",Re.textContent="+ Meters",Re.setAttribute("aria-label","Add VU meters"),Re.setAttribute("data-nc-help",ee["vu:add"]),Re.addEventListener("click",()=>{fo(!0),Ft?.el.querySelector("[data-vu-remove]")?.focus()}),se.el.querySelector(".nc-module-end")?.prepend(Re);const yo=()=>se.el.toggleAttribute("data-sends-hidden",!pe);yo();const wo=()=>{Re.hidden=on;const $=se.el.querySelector('[data-nc-section="meters"]');!on||!$||(Ft??=Ty({onRemove:()=>{fo(!1),Re.focus()},folded:wy(Ae()),onFold:L=>{sn=!0,vy(Ae(),L)}}),Ft.el.parentElement!==$&&$.append(Ft.el))};wo(),Ry(se.el,n,co),Dy(se.el,t,n),Xs(se.el),Ys(se.el),Sg(e,[se],"adjacent");const vo=$=>({peak:Is($.peak),rms:Is($.rms),over:$.peak>=Ib}),ne={module:se,get hacksShown(){return u},showHacks:d,render(){se.update(go()),bo(),wo(),yo(),Xs(se.el),Ys(se.el)},frame($){if(se.el.dataset.ncOpen!=="true")return;for(const N of t.list())vs(se.el,`strip-${N.id}`)?.update([vo(N.levels())],$);const L=t.masterLevels();if(vs(se.el,`strip-${it}`)?.update(L.map(vo),$),Ft&&on){const N=t.ctx.state==="running";N&&(sn=!0),sn&&(sn=Ft.frame(N?[L[0].rms,L[1].rms]:null,$))}}};return ne}const lt=".nc-strip:not([data-nc-master])",fa=e=>e?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null,Iy="[data-nc-strip-grip], .nc-strip-hd, .nc-strip-fold",Py=6,zy=400,oa=12;function Ys(e){for(const t of e.querySelectorAll(".nc-strip [data-nc-hacks]"))t.setAttribute("data-nc-help",t.closest("[data-nc-master]")?ee["inserts:master"]:ee["inserts:channel"]);for(const t of e.querySelectorAll(':is([data-nc-id="mix-a"], [data-nc-id="mix-b"]) .nc-ui-fx-hd .nc-ui-fx-name'))t.setAttribute("data-nc-help",ee["mix:sends"])}function Xs(e){for(const t of e.querySelectorAll(`${lt} .nc-strip-hd > .nc-strip-name`))t.setAttribute("data-nc-help",ee["strip:name"]);for(const t of e.querySelectorAll(`${lt} .nc-strip-hd`))t.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight")}function Dy(e,t,n){e.addEventListener("dblclick",a=>{const r=a.target instanceof Element?a.target.closest(".nc-strip-hd > .nc-strip-name"):null,i=r?.closest(lt),s=fa(i??null),l=r?.parentElement;if(!s||!l||!n.onRename||l.hasAttribute("data-renaming"))return;const u=t.list().find(h=>h.id===s)?.name??r.textContent??"",d=document.createElement("input");d.type="text",d.className="nc-strip-name-input",d.value=u,d.maxLength=nd,d.spellcheck=!1,d.autocomplete="off",d.setAttribute("aria-label",`Rename ${u}`),d.setAttribute("data-nc-help",ee["strip:rename"]),l.setAttribute("data-renaming",""),l.insertBefore(d,r),d.focus(),d.select();let c=!1;const p=h=>{if(c)return;c=!0;const g=d.value;d.remove(),l.removeAttribute("data-renaming"),h&&g!==u&&n.onRename?.(s,g)};d.addEventListener("keydown",h=>{h.key==="Enter"?(h.preventDefault(),p(!0)):h.key==="Escape"&&(h.preventDefault(),p(!1))}),d.addEventListener("blur",()=>p(!0)),d.addEventListener("click",h=>h.stopPropagation())})}function Ry(e,t,n){let a=null;const r=()=>{for(const c of e.querySelectorAll("[data-drop]"))c.removeAttribute("data-drop")},i=()=>{a&&(window.clearTimeout(a.timer),a.strip.removeAttribute("data-dragging"),e.removeAttribute("data-strip-drag"),r(),a=null)},s=c=>{c.active=!0,c.strip.setAttribute("data-dragging","true"),e.setAttribute("data-strip-drag",""),c.touch&&!c.grip&&navigator.vibrate?.(10)},l=()=>[...e.querySelectorAll(lt)].map(c=>{const p=c.getBoundingClientRect();return{id:fa(c)??"",left:p.left,width:p.width}}),u=(c,p)=>{const h=c.strip.parentElement;if(h&&h.scrollWidth>h.clientWidth){const b=h.getBoundingClientRect();p<b.left+oa*2?h.scrollLeft-=oa:p>b.right-oa*2&&(h.scrollLeft+=oa)}const g=oy(l(),p),f=g?js(t.order(),c.id,g):null;c.mark=f?g:null,r(),c.mark&&e.querySelector(`${lt}[data-nc-id="strip-${CSS.escape(c.mark.target)}"]`)?.setAttribute("data-drop",c.mark.side)},d=()=>{const c=p=>{p.stopPropagation(),p.preventDefault()};e.addEventListener("click",c,{capture:!0,once:!0}),window.setTimeout(()=>e.removeEventListener("click",c,{capture:!0}),0)};e.addEventListener("pointerdown",c=>{if(a||c.pointerType==="mouse"&&c.button!==0)return;const p=c.target instanceof Element?c.target:null;if(!p||p.closest("input, .nc-strip-remove, [data-nc-strip-hide], [data-renaming]"))return;const h=p.closest(Iy),g=h?.closest(lt),f=fa(g??null);if(!h||!g||!f)return;const b={id:f,strip:g,pointerId:c.pointerId,x0:c.clientX,y0:c.clientY,grip:h.matches("[data-nc-strip-grip]"),touch:c.pointerType!=="mouse",active:!1,timer:0,mark:null};a=b,b.touch&&!b.grip&&(b.timer=window.setTimeout(()=>{a===b&&!b.active&&s(b)},zy)),b.grip&&!b.touch&&c.preventDefault()}),window.addEventListener("pointermove",c=>{const p=a;if(!(!p||c.pointerId!==p.pointerId)){if(!p.active){if(Math.hypot(c.clientX-p.x0,c.clientY-p.y0)<Py)return;if(p.touch&&!p.grip)return i();s(p)}c.preventDefault(),u(p,c.clientX)}}),e.addEventListener("touchmove",c=>{a?.active&&c.preventDefault()},{passive:!1}),e.addEventListener("contextmenu",c=>{a?.touch&&c.preventDefault()}),window.addEventListener("pointerup",c=>{const p=a;if(!p||c.pointerId!==p.pointerId)return;const h=p.active?p.mark:null,g=p.active;if(i(),!g)return;d();const f=h?js(t.order(),p.id,h):null;f&&t.onReorder?.(f.id,f.before)}),window.addEventListener("pointercancel",c=>{a&&c.pointerId===a.pointerId&&i()}),window.addEventListener("keydown",c=>{c.key==="Escape"&&a?.active&&i()}),e.addEventListener("keydown",c=>{if(!c.altKey||c.ctrlKey||c.metaKey||c.shiftKey||c.key!=="ArrowLeft"&&c.key!=="ArrowRight")return;const p=c.target instanceof Element?c.target:null,h=p?.closest(".nc-strip-hd, [data-nc-strip-hide], .nc-strip-fold");if(!p||!h||p.closest("input, [data-nc-strip-grip]"))return;const g=fa(h.closest(lt));if(!g)return;c.preventDefault();const f=h.matches("[data-nc-strip-hide]")?"[data-nc-strip-hide]":h.matches(".nc-strip-fold")?".nc-strip-fold":".nc-strip-hd :is(button, [tabindex])";n(g,c.key==="ArrowLeft"?-1:1,f)})}const Oy=1e-5,By=2e3,jy=500,Ln={parked:!1,quietSince:null};function _y(e,t,n,a){if(t)return Ln;if(e.parked)return e;if(!(n<Oy))return Ln;const r=e.quietSince??a;return{parked:a-r>=By,quietSince:r}}const Js=e=>10**(e/20),Ue=.012,Mr=1024,Qs=32768;class qy{ctx;bus;masterFx;master;limiter;masterMeter;masterMeters;insertMeters;returns;park={a:Ln,b:Ln};parkMeters;parkScratch=new Float32Array(Qs);masterPosition=_e;channels=[];listeners=new Set;scratch=new Float32Array(Mr);restore;channelFx;applyQueued=!1;constructor(t,n={}){this.ctx=t,this.restore=n.restore,this.channelFx=n.channelFx;const a=()=>new AnalyserNode(t,{fftSize:Mr});this.bus=new GainNode(t,{gain:1}),this.master=new GainNode(t,{gain:ot(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(t,yd),this.masterMeter=a(),this.masterMeters=[a(),a()],this.insertMeters={pre:a(),post:a()},this.masterFx=n.masterFx?.()??null,this.bus.connect(this.insertMeters.pre),this.masterFx?(this.bus.connect(this.masterFx.input),this.masterFx.output.connect(this.master),this.masterFx.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(t.destination);const r=new ChannelSplitterNode(t,{numberOfOutputs:2});this.limiter.connect(r),r.connect(this.masterMeters[0],0),r.connect(this.masterMeters[1],1);const i=l=>{const u=new GainNode(t,{gain:1}),d=n.fx?.(l)??null,c=new GainNode(t,{gain:ot(_e)}),p=a();return d?(u.connect(d.input),d.output.connect(c)):c.gain.value=0,c.connect(p),c.connect(this.bus),{bus:u,fx:d,gain:c,meter:p,on:d!==null,level:_e}};this.returns={a:i("a"),b:i("b")};const s=l=>{const u=new AnalyserNode(t,{fftSize:Qs});return this.returns[l].gain.connect(u),u};this.parkMeters={a:s("a"),b:s("b")}}attach(t,n){let a=this.channels.find(r=>r.id===t);if(a)a.input.disconnect(),a.input=new GainNode(this.ctx,{gain:1}),a.input.connect(a.trim);else{const r=new GainNode(this.ctx,{gain:1}),i=this.restore?.(t)??$d,s=new GainNode(this.ctx,{gain:Js(i.trim)});r.connect(s);const l=new GainNode(this.ctx,{gain:0}),u=new AnalyserNode(this.ctx,{fftSize:Mr}),d=new GainNode(this.ctx,{gain:0}),c=new GainNode(this.ctx,{gain:0}),p=this.channelFx?.(t)??null;p?(s.connect(p.input),p.output.connect(l)):s.connect(l);const h=new GainNode(this.ctx,{gain:1,channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),g=new ChannelSplitterNode(this.ctx,{numberOfOutputs:2}),f=new GainNode(this.ctx,{gain:1}),b=new GainNode(this.ctx,{gain:1}),m=new ChannelMergerNode(this.ctx,{numberOfInputs:2});l.connect(u),l.connect(h).connect(g),g.connect(f,0).connect(m,0,0),g.connect(b,1).connect(m,0,1),m.connect(this.bus),m.connect(d).connect(this.returns.a.bus),m.connect(c).connect(this.returns.b.bus),a={id:t,name:n,input:r,trim:s,fader:l,stereo:h,split:g,balL:f,balR:b,panner:m,meter:u,sendA:d,sendB:c,fx:p,strip:i},this.channels.push(a),this.queueApply()}return this.emit(),a.input}rename(t,n){const a=this.channels.find(r=>r.id===t);!a||a.name===n||(a.name=n,this.emit())}detach(t){const n=this.channels.findIndex(r=>r.id===t);if(n<0)return;const[a]=this.channels.splice(n,1);if(a){for(const r of[a.input,a.trim,a.fader,a.stereo,a.split,a.balL,a.balR,a.panner,a.meter,a.sendA,a.sendB])r.disconnect();a.fx?.output.disconnect(),a.fx?.dispose(),this.queueApply(),this.emit()}}tapNode(t){return t==="master"?this.limiter:this.channels.find(n=>n.id===t)?.panner??null}tapLatency(t,n){const a=i=>{const s=i?.latencySamples;return typeof s=="number"&&Number.isFinite(s)&&s>0?Math.round(s):0};if(t==="master")return Math.max(0,Math.round(n))+a(this.masterFx);const r=this.channels.find(i=>i.id===t);return r?a(r.fx):null}set(t,n){const a=this.channels.find(r=>r.id===t);a&&(a.strip={...a.strip,...n},this.queueApply(),this.emit())}setMaster(t){this.masterPosition=t,this.master.gain.setTargetAtTime(ot(t),this.ctx.currentTime,Ue),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(t,n){const a=this.returns[t],r=this.ctx.currentTime;n.on!==void 0&&(a.on=n.on&&a.fx!==null,a.bus.gain.setTargetAtTime(a.on?1:0,r,Ue),this.wakeFed()),n.level!==void 0&&(a.level=n.level,a.fx&&a.gain.gain.setTargetAtTime(ot(a.level),r,Ue)),this.emit()}fed(t){const n=this.returns[t];if(!n.on||!n.fx)return!1;const a=t==="a"?"sendA":"sendB";return this.channels.some(r=>ot(r.strip[a])>0)}setParked(t,n){const a=this.returns[t];a.fx&&(n?(a.bus.disconnect(a.fx.input),a.fx.output.disconnect(a.gain),a.fx.clear()):(a.bus.connect(a.fx.input),a.fx.output.connect(a.gain)))}wakeFed(){for(const t of["a","b"])this.park[t].parked&&this.fed(t)&&(this.park[t]=Ln,this.setParked(t,!1))}parkIdleReturns(t=performance.now()){for(const n of["a","b"]){const a=this.park[n],r=_y(a,this.fed(n),a.parked?0:this.parkPeak(n),t);this.park[n]=r,r.parked!==a.parked&&this.setParked(n,r.parked)}}parkPeak(t){const n=this.parkScratch;this.parkMeters[t].getFloatTimeDomainData(n);let a=0;for(let r=0;r<n.length;r++)a=Math.max(a,Math.abs(n[r]??0));return a}returnParked(t){return this.park[t].parked}setTempo(t,n){for(const a of[this.returns.a.fx,this.returns.b.fx,this.masterFx])a?.setTempo(t,n);for(const a of this.channels)a.fx?.setTempo(t,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(t){return this.levelsOf(this.returns[t].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const t=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||t&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}queueApply(){this.applyQueued||(this.applyQueued=!0,queueMicrotask(()=>{this.applyQueued=!1,this.apply()}))}apply(){const t=Fb(this.channels.map(a=>a.strip)),n=this.ctx.currentTime;this.channels.forEach((a,r)=>{a.fader.gain.setTargetAtTime(t[r]??0,n,Ue),a.trim.gain.setTargetAtTime(Js(a.strip.trim),n,Ue),a.sendA.gain.setTargetAtTime(ot(a.strip.sendA),n,Ue),a.sendB.gain.setTargetAtTime(ot(a.strip.sendB),n,Ue);const[i,s]=zb(a.strip.pan);a.balL.gain.setTargetAtTime(i,n,Ue),a.balR.gain.setTargetAtTime(s,n,Ue)}),this.wakeFed()}levelsOf(t){return t.getFloatTimeDomainData(this.scratch),Pb(this.scratch)}emit(){for(const t of this.listeners)t()}}const Vy=["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"],mn=(e,t)=>t.map(([n,a,r,i])=>({id:n,name:a,intervals:r,category:e,symbol:i})),_d=[...mn("Essential",[["major","Major",[0,4,7],""],["minor","Minor",[0,3,7],"m"],["diminished","Diminished",[0,3,6],"dim"],["augmented","Augmented",[0,4,8],"aug"],["sus2","Sus2",[0,2,7],"sus2"],["sus4","Sus4",[0,5,7],"sus4"],["power","Power Chord",[0,7,12],"5"],["major-6","Major 6",[0,4,7,9],"6"],["minor-6","Minor 6",[0,3,7,9],"m6"]]),...mn("Seventh",[["major-7","Major 7",[0,4,7,11],"maj7"],["minor-7","Minor 7",[0,3,7,10],"m7"],["dominant-7","Dominant 7",[0,4,7,10],"7"],["minor-major-7","Minor-Major 7",[0,3,7,11],"m(maj7)"],["half-diminished-7","Half-Diminished 7",[0,3,6,10],"m7b5"],["diminished-7","Diminished 7",[0,3,6,9],"dim7"],["augmented-major-7","Augmented Major 7",[0,4,8,11],"aug(maj7)"],["augmented-7","Augmented 7",[0,4,8,10],"aug7"],["7sus4","7sus4",[0,5,7,10],"7sus4"]]),...mn("Extended",[["add9","Add9",[0,4,7,14],"add9"],["minor-add9","Minor Add9",[0,3,7,14],"m(add9)"],["major-9","Major 9",[0,4,7,11,14],"maj9"],["minor-9","Minor 9",[0,3,7,10,14],"m9"],["dominant-9","Dominant 9",[0,4,7,10,14],"9"],["6-9","6/9",[0,4,7,9,14],"6/9"],["minor-6-9","Minor 6/9",[0,3,7,9,14],"m6/9"],["major-7-sharp11","Major 7#11",[0,4,7,11,18],"maj7#11"],["minor-11","Minor 11",[0,3,7,10,14,17],"m11"],["dominant-11","Dominant 11",[0,4,7,10,14,17],"11"],["9sus4","9sus4",[0,5,7,10,14],"9sus4"],["major-13","Major 13",[0,4,7,11,14,21],"maj13"],["minor-13","Minor 13",[0,3,7,10,14,17,21],"m13"],["dominant-13","Dominant 13",[0,4,7,10,14,21],"13"]]),...mn("Altered",[["7b9","7b9",[0,4,7,10,13],"7b9"],["7-sharp9","7#9",[0,4,7,10,15],"7#9"],["7b5","7b5",[0,4,6,10],"7b5"],["7-sharp5","7#5",[0,4,8,10],"7#5"],["7b9-sharp5","7b9#5",[0,4,8,10,13],"7b9#5"],["7-sharp9-b5","7#9b5",[0,4,6,10,15],"7#9b5"],["7alt","7alt",[0,4,10,13,15,18,20],"7alt"],["major-7b5","Major 7b5",[0,4,6,11],"maj7b5"],["minor-7b9","Minor 7b9",[0,3,7,10,13],"m7b9"]]),...mn("Experimental",[["quartal-3","Quartal 3",[0,5,10]," Quartal 3"],["quartal-4","Quartal 4",[0,5,10,15]," Quartal 4"],["quartal-5","Quartal 5",[0,5,10,15,20]," Quartal 5"],["quintal-3","Quintal 3",[0,7,14]," Quintal 3"],["quintal-4","Quintal 4",[0,7,14,21]," Quintal 4"],["chromatic-cluster","Chromatic Cluster",[0,1,2]," Chromatic Cluster"],["whole-tone-cluster","Whole-Tone Cluster",[0,2,4,6]," Whole-Tone Cluster"],["minor-second-cluster","Minor-Second Cluster",[0,1,5,7]," Minor-Second Cluster"],["major-second-stack","Major-Second Stack",[0,2,4,7,9]," Major-Second Stack"],["lydian-stack","Lydian Stack",[0,2,4,6,7,11]," Lydian Stack"],["major-pentatonic","Major Pentatonic",[0,2,4,7,9]," Major Pentatonic"],["minor-pentatonic","Minor Pentatonic",[0,3,5,7,10]," Minor Pentatonic"],["in-sen","In-sen",[0,1,5,7,10]," In-sen"],["whole-tone","Whole-Tone Collection",[0,2,4,6,8,10]," Whole-Tone"]])],qd=new Map(_d.map(e=>[e.id,e])),Tr={Major:"major",Minor:"minor",Diminished:"diminished",Augmented:"augmented",Sus2:"sus2",Sus4:"sus4","Major 7th":"major-7","Minor 7th":"minor-7","Dominant 7th":"dominant-7"};function Hy(e){if(typeof e!="string")return"major";if(qd.has(e))return e;if(Tr[e])return Tr[e];const t=a=>a.trim().toLowerCase().replace(/[\s_-]+/g,""),n=t(e);return Object.entries(Tr).find(([a])=>t(a)===n)?.[1]??_d.find(a=>t(a.name)===n||t(a.id)===n)?.id??"major"}function Gi(e){return qd.get(Hy(e))}const ui=(e,t,n)=>Math.max(t,Math.min(n,Math.round(Number.isFinite(e)?e:t)));function Vd(e){if(!e.length)return[];const t=Math.min(...e),n=Math.max(...e),a=Math.ceil(-t/12),r=Math.floor((127-n)/12);if(a>r)throw new RangeError("Voicing spans more than the supported MIDI range.");const i=Math.max(a,Math.min(r,0))*12;return e.map(s=>s+i)}function Uy(e,t,n=0,a="compact"){const i=Gi(t).intervals.map(l=>ui(e,0,127)+l);for(let l=0;l<ui(n,0,i.length-1);l++){const u=i.shift(),d=i[i.length-1];i.push(u+Math.ceil((d-u+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[a]??0;return Vd(i.map((l,u)=>l+12*Math.floor(u*s/Math.max(1,i.length-1))))}function Gy(e,t=1){return[...new Set(Array.from({length:ui(t,1,4)},(n,a)=>e.map(r=>r+a*12)).flat().filter(n=>n>=0&&n<=127))]}function Wy(e,t){const n=[...new Set(e)].sort((i,s)=>i-s),a=n.length;if(a<2)return n;const r=[...n,...n.slice(1,-1).reverse()];switch(t){case"down":return n.reverse();case"up-down":return r;case"down-up":return r.map(i=>n[a-1-n.indexOf(i)]);case"up-down-repeat":return[...n,...[...n].reverse()];case"as-played":return[...new Set(e)];case"outside-in":{const i=[];for(let s=0,l=a-1;s<=l;s++,l--)i.push(n[s]),s!==l&&i.push(n[l]);return i}case"inside-out":return n.map((i,s)=>({note:i,i:s})).sort((i,s)=>Math.abs(i.i-(a-1)/2)-Math.abs(s.i-(a-1)/2)||i.i-s.i).map(i=>i.note);case"pendulum":{const i=Math.floor((a-1)/2);return[...r.slice(i),...r.slice(0,i)]}case"blossom-up":case"blossom-down":{const i=Math.floor((a-1)/2),s=t==="blossom-up"?1:-1,l=[n[i]];for(let u=1;l.length<a;u++)for(const d of[i+s*u,i-s*u])d>=0&&d<a&&l.push(n[d]);return l}case"low-and-up":case"low-and-down":case"hi-and-up":case"hi-and-down":{const i=t.startsWith("low"),s=i?n[0]:n[a-1],l=i?n.slice(1):n.slice(0,-1);return t.endsWith("down")&&l.reverse(),l.flatMap(u=>[s,u])}default:return n}}const Ky=16,pi={hits:5,steps:8,rotate:0};function Hd(e){const t=(a,r)=>typeof a=="number"&&Number.isFinite(a)?Math.round(a):r,n=Math.max(1,Math.min(Ky,t(e?.arpSteps,pi.steps)));return{steps:n,hits:Math.max(0,Math.min(n,t(e?.arpHits,pi.hits))),rotate:(t(e?.arpRotate,0)%n+n)%n}}function Ud(e,t){return((Math.floor(t)+e.rotate)%e.steps+e.steps)%e.steps*e.hits%e.steps<e.hits}function Yy(e,t){let n=Math.floor(t/e.steps)*e.hits;for(let a=t-t%e.steps;a<t;a++)Ud(e,a)&&n++;return n}const Xy=1592598566;function Jy(e){let t=(Math.imul(e^Xy,2654435761)^2246822507)>>>0;return t=Math.imul(t^t>>>16,2146121005),t=Math.imul(t^t>>>15,2221713035),((t^t>>>16)>>>0)/2**32}const Zs=new Map;function Qy(e,t){if(e<2)return 0;const n=Math.max(0,Math.floor(t));let a=Zs.get(e);(!a||a.step>n)&&(a={step:0,pos:0});let{step:r,pos:i}=a;for(;r<n;r++){const s=Jy(r+1);i=(i+(s<.5?1:s<.75?0:e-1))%e}return Zs.set(e,{step:r,pos:i}),i}function Zy(e,t,n,a=pi,r=Math.random){if(t<1)return null;const i=s=>(Math.floor(s)%t+t)%t;if(e==="random")return Math.min(t-1,Math.max(0,Math.floor(r()*t)));if(e==="walk")return Qy(t,n);if(e==="euclidean"){const s=Hd({arpHits:a.hits,arpSteps:a.steps,arpRotate:a.rotate}),l=Math.max(0,Math.floor(n));return Ud(s,l)?i(Yy(s,l)):null}return i(n)}const Wi=[{id:"off",num:0,name:"Off — chord",description:"No arp: the chord plays together"},{id:"up",num:1,name:"Up",description:"Low to high, then again"},{id:"down",num:2,name:"Down",description:"High to low, then again"},{id:"up-down",num:3,name:"Up/Down",description:"Up then down, ends not repeated"},{id:"up-down-repeat",num:4,name:"Up/Down Repeat",description:"Up then down, ends repeated"},{id:"random",num:5,name:"Random",description:"Any note each step"},{id:"as-played",num:6,name:"As Played",description:"The order the keys were pressed"},{id:"outside-in",num:7,name:"Outside-In",description:"Lowest, highest, then inward"},{id:"inside-out",num:8,name:"Inside-Out",description:"From the middle outward, lower first"},{id:"pendulum",num:9,name:"Pendulum",description:"From the lower middle, swing between the ends"},{id:"blossom-up",num:10,name:"Blossom Up",description:"From center, spiral up"},{id:"blossom-down",num:11,name:"Blossom Down",description:"From center, spiral down"},{id:"low-and-up",num:12,name:"Low&Up",description:"Low pedal, others ascending"},{id:"low-and-down",num:13,name:"Low&Down",description:"Low pedal, others descending"},{id:"hi-and-up",num:14,name:"Hi&Up",description:"High pedal, others ascending"},{id:"hi-and-down",num:15,name:"Hi&Down",description:"High pedal, others descending"},{id:"walk",num:16,name:"Walk",description:"Next 50%, repeat 25%, back 25%"},{id:"euclidean",num:17,name:"Euclidean",description:"Hits spread evenly over Steps, rests between"},{id:"down-up",num:18,name:"Down/Up (legacy)",description:"Down then up, ends not repeated",legacy:!0}];new Set(Wi.map(e=>e.id));new Map(Wi.map(e=>[e.num,e.id]));Wi.map(e=>({value:e.id,label:e.name}));const Gd=[{id:"block",label:"Block",kind:"repeat"},{id:"walk-up",label:"Inversion walk · up",kind:"repeat"},{id:"walk-down",label:"Inversion walk · down",kind:"repeat"},{id:"walk-up-down",label:"Inversion walk · up-down",kind:"repeat"},{id:"walk-random",label:"Inversion walk · random",kind:"repeat"},{id:"oom-pah",label:"Oom-pah",kind:"bar"},{id:"alberti",label:"Alberti",kind:"repeat"},{id:"pulse",label:"Pulse + accents",kind:"repeat"},{id:"charleston",label:"Charleston",kind:"bar"},{id:"skank",label:"Skank",kind:"bar"},{id:"house",label:"House stab",kind:"bar"},{id:"montuno",label:"Montuno",kind:"bar"},{id:"push",label:"Push",kind:"bar"},{id:"strum",label:"Strum",kind:"bar"},{id:"drift",label:"Voicing drift",kind:"repeat"}];Gd.map(e=>e.id);const el=e=>Gd.find(t=>t.id===e)?.kind??"repeat",e0=15,t0=40,Te=e=>[...e].sort((t,n)=>t-n);function Wd(e,t){const n=Te(e);for(let a=0;a<t;a++){const r=n.shift(),i=n[n.length-1]??r;n.push(r+Math.ceil((i-r+1)/12)*12)}return n}const sa=e=>Wd(e,1);function n0(e,t){const n=e[0];return n-((n-t)%12+12)%12}function a0(e,t){const n=Te(e);if(n.length<3)return n;switch((t%4+4)%4){case 1:return Te([n[0],...n.slice(2),n[1]+12]);case 2:return Te([n[0],...n.slice(3),n[1]+12,n[2]+12]);case 3:return Te([n[0]-12,n[2],n[1]+12,...n.slice(3).map(r=>r+12)]);default:return n}}function r0(e,t,n,a=Math.random){const r=Math.max(1,Math.min(t,3)),i=Math.max(0,Math.floor(n));switch(e){case"walk-down":return(r-i%r)%r;case"walk-up-down":{if(r<2)return 0;const s=2*r-2,l=i%s;return l<r?l:s-l}case"walk-random":return Math.min(r-1,Math.floor(a()*r));default:return i%r}}function i0(e,t,n,a,r=Math.random){const i=Te(t);if(!i.length)return{notes:[],velocity:1};switch(e){case"block":return{notes:i,velocity:1};case"walk-up":case"walk-down":case"walk-up-down":case"walk-random":return{notes:Wd(i,r0(e,i.length,n,r)),velocity:.9};case"alberti":return{notes:[[i[0],i[2]??i[i.length-1],i[1]??i[0],i[2]??i[i.length-1]][(Math.floor(n)%4+4)%4]],velocity:.85};case"pulse":{const s=Math.abs(a/2-Math.round(a/2))<1e-6;return{notes:i,velocity:s?1:.45}}case"drift":return{notes:a0(i,n),velocity:.9};default:return null}}function o0(e,t,n,a,r=t){const i=Te(t);if(!i.length)return[];const s=(u,d,c,p)=>u.map(h=>({step:h,len:d,notes:c,velocity:p})),l=n0(i,n);switch(e){case"oom-pah":return[...s([0],3,[l-12],1),...s([4],2,sa(i),.75),...s([8],3,[l-12],1),...s([12],2,sa(i),.75)];case"charleston":return s([0,6],2,i,.9);case"skank":return s([4,12],1,sa(i),.9);case"house":return s([2,6,10,14],1,sa(i),.9);case"montuno":{const u=l+(a[1]??4),d=l+(a[2]??7),c=a[3]!==void 0&&a[3]<12?l+a[3]:l+12,p=[l,l+12],h=[u,d];return[[0,p],[3,h],[5,p],[6,h],[8,[d,c]],[10,p],[13,h],[14,[d,l+12]]].map(([g,f])=>({step:g,len:1,notes:Te(f),velocity:.85}))}case"push":return[...s([0],6,i,.9),...s([6],2,i,.9),{step:14,len:2,notes:Te(r),velocity:.9,next:!0}];case"strum":{const u=[...i,i[0]+12];return[{step:0,len:3.5,notes:u,velocity:.95,strum:"down"},{step:8,len:3.5,notes:u,velocity:.75,strum:"up"}]}default:return[]}}function s0(e,t,n){const a=n==="down"?Te(e):Te(e).reverse(),r=Math.max(0,Math.min(t0,t))/1e3;return a.map((i,s)=>({midi:i,offset:s*r}))}const tl=e=>Math.abs(e-Math.round(e))<1e-6?"down":"up";function l0(e){const t=new Set(e.map(i=>(i%12+12)%12)),n=i=>t.has(i);let a;const r=n(3)&&!n(4);return r&&n(6)&&n(9)?a=[14]:r&&n(6)?a=[17]:n(4)&&n(8)&&!n(7)?a=[14]:n(4)&&n(10)?a=[14,21]:n(4)?a=[14,18,21]:n(3)?a=[14,17]:n(5)||n(2)?a=[14,21]:a=[14],a.filter(i=>!n(i%12))}function c0(e,t,n,a=Math.random){const r=l0(n);if(!r.length||!e.length)return null;const i=(t+r[Math.min(r.length-1,Math.floor(a()*r.length))])%12,s=Math.max(...e),l=s+1+((i-(s+1))%12+12)%12;return l<=127?l:null}function hi(e,t,n=0,a="compact"){const r=t.map(l=>Math.max(0,Math.min(127,Math.round(e)))+l),i=Math.max(0,Math.min(r.length-1,Math.round(n)||0));for(let l=0;l<i;l++){const u=r.shift(),d=r[r.length-1];r.push(u+Math.ceil((d-u+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[a]??0;return Vd(r.map((l,u)=>l+12*Math.floor(u*s/Math.max(1,r.length-1))))}function d0(e,t){const n=Te(e),a=Te(t);if(n.length===a.length)return n.reduce((i,s,l)=>i+Math.abs(s-a[l]),0);const r=(i,s)=>Math.min(...s.map(l=>Math.abs(l-i)));return n.reduce((i,s)=>i+r(s,a),0)+a.reduce((i,s)=>i+r(s,n),0)}function u0(e,t,n,a,r,i="compact",s){const l=hi(t,n,s??r,i);if(!e||!e.length)return l;let u=l,d=1/0,c=1/0;const p=s!==void 0?[s]:n.map((h,g)=>g);for(const h of p)for(const g of[-24,-12,0,12]){const f=hi(t,n,h,i).map(y=>y+g);if(f[0]<a-7||f[0]>a+12||f[0]<0||f[f.length-1]>127)continue;const b=d0(f,e),m=Math.abs(f.reduce((y,v)=>y+v,0)/f.length-e.reduce((y,v)=>y+v,0)/e.length);(b<d-1e-9||Math.abs(b-d)<1e-9&&m<c-1e-9)&&(u=f,d=b,c=m)}return u}const p0={"Pop / Rock":"Pop",Blues:"Blues",Jazz:"Jazz","Soul / R&B / Neo-soul":"Soul",Gospel:"Gospel","EDM / House / Trance":"EDM","Cinematic / Ambient":"Cinematic","Latin / Flamenco":"Latin","Lo-fi / Chill":"Lo-fi",Modal:"Modal"},S=(e,t,n,a=1,r={})=>({degree:e,chord:t,numeral:n,bars:a,...r}),B="major",we="minor",j="dominant-7",J="minor-7",xe="major-7",Lr="half-diminished-7",Cr="diminished-7",H=(e,t,n,a,r,i)=>({id:e,group:t,name:n,level:a,tonality:r,chords:i,short:p0[t]}),nl=e=>[S(0,j,"I7"),S(e==="IV7"?5:0,j,e),S(0,j,"I7"),S(0,j,"I7"),S(5,j,"IV7"),S(5,j,"IV7"),S(0,j,"I7"),S(0,j,"I7"),S(7,j,"V7"),S(5,j,"IV7"),S(0,j,"I7"),S(7,j,"V7")],Kd=[H("pop-1-5-6-4","Pop / Rock","I–V–vi–IV",1,"major",[S(0,B,"I"),S(7,B,"V"),S(9,we,"vi"),S(5,B,"IV")]),H("pop-6-4-1-5","Pop / Rock","vi–IV–I–V",1,"major",[S(9,we,"vi"),S(5,B,"IV"),S(0,B,"I"),S(7,B,"V")]),H("pop-50s","Pop / Rock","I–vi–IV–V · 50s",1,"major",[S(0,B,"I"),S(9,we,"vi"),S(5,B,"IV"),S(7,B,"V")]),H("rock-1-b7-4","Pop / Rock","I–♭VII–IV",2,"mixolydian",[S(0,B,"I"),S(10,B,"♭VII"),S(5,B,"IV",2)]),H("pop-canon","Pop / Rock","Canon · 8 chords",2,"major",[S(0,B,"I",.5),S(7,B,"V",.5),S(9,we,"vi",.5),S(4,we,"iii",.5),S(5,B,"IV",.5),S(0,B,"I",.5),S(5,B,"IV",.5),S(7,B,"V",.5)]),H("blues-12","Blues","12-bar",1,"blues",nl("I7")),H("blues-12-quick","Blues","12-bar quick change",2,"blues",nl("IV7")),H("blues-minor","Blues","Minor blues",2,"minor",[S(0,J,"i7"),S(0,J,"i7"),S(0,J,"i7"),S(0,J,"i7"),S(5,J,"iv7"),S(5,J,"iv7"),S(0,J,"i7"),S(0,J,"i7"),S(8,j,"♭VI7"),S(7,j,"V7"),S(0,J,"i7"),S(7,j,"V7")]),H("blues-jazz","Blues","Jazz blues",3,"blues",[S(0,j,"I7"),S(5,j,"IV7"),S(0,j,"I7"),S(7,J,"v7",.5),S(0,j,"I7",.5),S(5,j,"IV7"),S(6,Cr,"♯iv°7"),S(0,j,"I7"),S(9,j,"VI7"),S(2,J,"ii7"),S(7,j,"V7"),S(0,j,"I7",.5),S(9,j,"VI7",.5),S(2,J,"ii7",.5),S(7,j,"V7",.5)]),H("jazz-2-5-1","Jazz","ii–V–I",1,"major",[S(2,J,"ii7"),S(7,j,"V7"),S(0,xe,"Imaj7",2)]),H("jazz-2-5-1-minor","Jazz","ii–V–i minor",2,"minor",[S(2,Lr,"iiø7"),S(7,"7b9","V7♭9"),S(0,"minor-6","i6",2)]),H("jazz-rhythm","Jazz","I–vi–ii–V · rhythm changes",2,"major",[S(0,xe,"Imaj7",.5),S(9,J,"vi7",.5),S(2,J,"ii7",.5),S(7,j,"V7",.5)]),H("jazz-turnaround","Jazz","iii–VI–ii–V turnaround",2,"major",[S(4,J,"iii7",.5),S(9,j,"VI7",.5),S(2,J,"ii7",.5),S(7,j,"V7",.5)]),H("jazz-autumn","Jazz","Autumn cycle",3,"minor",[S(5,J,"iv7"),S(10,j,"♭VII7"),S(3,xe,"♭IIImaj7"),S(8,xe,"♭VImaj7"),S(2,Lr,"iiø7"),S(7,"7b9","V7♭9"),S(0,J,"i7",2)]),H("jazz-giant-steps","Jazz","Giant Steps cycle",3,"major",[S(0,xe,"Imaj7",.5),S(3,j,"♭III7",.5),S(8,xe,"♭VImaj7",.5),S(11,j,"VII7",.5),S(4,xe,"IIImaj7"),S(10,J,"♭vii7",.5),S(3,j,"♭III7",.5),S(8,xe,"♭VImaj7",.5),S(11,j,"VII7",.5),S(4,xe,"IIImaj7",.5),S(7,j,"V7",.5),S(0,xe,"Imaj7"),S(6,J,"♯iv7",.5),S(11,j,"VII7",.5)]),H("soul-dorian-vamp","Soul / R&B / Neo-soul","Dorian vamp i7–IV7",1,"dorian",[S(0,J,"i7"),S(5,j,"IV7")]),H("soul-4-3-2-1","Soul / R&B / Neo-soul","IVmaj7–iii7–ii7–Imaj7",2,"major",[S(5,xe,"IVmaj7"),S(4,J,"iii7"),S(2,J,"ii7"),S(0,xe,"Imaj7")]),H("soul-two-of-us","Soul / R&B / Neo-soul","Just the Two of Us",3,"major",[S(5,xe,"IVmaj7"),S(4,j,"III7"),S(9,J,"vi7"),S(7,J,"v7",.5),S(0,j,"I7",.5)]),H("soul-2-5-1-ext","Soul / R&B / Neo-soul","ii9–V13sus–Imaj9",3,"major",[S(2,"minor-9","ii9"),S(7,"9sus4","V13sus",1,{intervals:[0,5,7,10,14,21],symbol:"13sus4"}),S(0,"major-9","Imaj9",2)]),H("gospel-1-4-1-dim","Gospel","1–4–1 passing dim",2,"major",[S(0,B,"I"),S(5,B,"IV",.5),S(6,Cr,"♯iv°7",.5)]),H("gospel-7-3-6","Gospel","7–3–6",3,"major",[S(11,Lr,"viiø7"),S(4,j,"III7"),S(9,J,"vi7",2)]),H("gospel-1-17-4-dim","Gospel","I–I7–IV–♯iv°–I/V",3,"major",[S(0,B,"I",.5),S(0,j,"I7",.5),S(5,B,"IV",.5),S(6,Cr,"♯iv°7",.5),S(0,B,"I/V",2,{inversion:2})]),H("edm-epic","EDM / House / Trance","i–VI–III–VII · epic",1,"minor",[S(0,we,"i"),S(8,B,"VI"),S(3,B,"III"),S(10,B,"VII")]),H("edm-1-7-6-7","EDM / House / Trance","i–VII–VI–VII",1,"minor",[S(0,we,"i"),S(10,B,"VII"),S(8,B,"VI"),S(10,B,"VII")]),H("house-organ","EDM / House / Trance","House organ i7–iv7",1,"minor",[S(0,J,"i7"),S(5,J,"iv7")]),H("trance-1-6-7-5","EDM / House / Trance","Trance i–VI–VII–v",2,"minor",[S(0,we,"i"),S(8,B,"VI"),S(10,B,"VII"),S(7,we,"v")]),H("cine-minor-plagal","Cinematic / Ambient","Minor plagal iv–i",1,"minor",[S(5,we,"iv"),S(0,we,"i")]),H("cine-hero","Cinematic / Ambient","Hero I–♭VI–♭VII–I",2,"major",[S(0,B,"I"),S(8,B,"♭VI"),S(10,B,"♭VII"),S(0,B,"I")]),H("cine-mediant","Cinematic / Ambient","Mediant I–III",2,"major",[S(0,B,"I"),S(4,B,"III")]),H("cine-lydian","Cinematic / Ambient","Lydian I–II",2,"lydian",[S(0,B,"I"),S(2,B,"II")]),H("latin-andalusian","Latin / Flamenco","Andalusian i–♭VII–♭VI–V",1,"minor",[S(0,we,"i"),S(10,B,"♭VII"),S(8,B,"♭VI"),S(7,B,"V")]),H("latin-montuno","Latin / Flamenco","Montuno i–iv–V7",1,"minor",[S(0,we,"i"),S(5,we,"iv"),S(7,j,"V7",2)]),H("latin-bossa","Latin / Flamenco","Bossa Imaj7–II7–ii7–V7",2,"major",[S(0,xe,"Imaj7",2),S(2,j,"II7",2),S(2,J,"ii7"),S(7,j,"V7")]),H("lofi-2-5-1-6","Lo-fi / Chill","ii9–V9–Imaj9–vi9",2,"major",[S(2,"minor-9","ii9"),S(7,"dominant-9","V9"),S(0,"major-9","Imaj9"),S(9,"minor-9","vi9")]),H("lofi-4-3-6","Lo-fi / Chill","IVmaj7–iii7–vi7",2,"major",[S(5,xe,"IVmaj7"),S(4,J,"iii7"),S(9,J,"vi7",2)]),H("modal-dorian","Modal","Dorian i–IV",1,"dorian",[S(0,we,"i"),S(5,B,"IV")]),H("modal-mixolydian","Modal","Mixolydian I–♭VII",1,"mixolydian",[S(0,B,"I"),S(10,B,"♭VII")]),H("modal-phrygian","Modal","Phrygian i–♭II",1,"phrygian",[S(0,we,"i"),S(1,B,"♭II")])];Kd.map(e=>e.id);const h0=e=>Kd.find(t=>t.id===e)??null;function Nr(e,t,n,a=0){const r=h0(e);if(!r)return null;const i=(n+1)*12+t;return r.chords.map((s,l)=>{const u=Gi(s.chord),d=s.intervals??u.intervals,c=(t+s.degree)%12;return{index:l,root:i+s.degree,rootPc:c,chord:u.id,intervals:d,numeral:s.numeral,name:`${Vy[c]}${s.symbol??u.symbol}`,bars:a>0?a:s.bars,...s.inversion!==void 0?{inversion:s.inversion}:{}}})}const m0=e=>e.reduce((t,n)=>t+n.bars,0),f0=(e,t)=>e.slice(0,t).reduce((n,a)=>n+a.bars,0);function al(e,t){const n=m0(e),a=(t%n+n)%n;let r=0;for(let i=0;i<e.length;i++){if(a<r+e[i].bars-1e-9)return{chord:e[i],index:i,position:a,total:n};r+=e[i].bars}return{chord:e[e.length-1],index:e.length-1,position:a,total:n}}const g0=16,b0=()=>Array.from({length:g0},()=>null),y0=["off","single","chord","random"],w0=e=>y0.includes(e),v0={mode:"single",note:0,octave:3,octaveRange:2,chord:"minor-7",inversion:0,interval:4,gate:75,arp:"off",arpOctaves:1,arpSpread:"compact",arpHits:5,arpSteps:8,arpRotate:0,chordStyle:"block",voiceLeading:"fixed",strum:0,tension:0,chordProgression:"off",progressionBars:0,favoriteChords:[],chordPads:b0(),chordPadMode:"pad"};function rl(e,t,n=Math.random){if(e.mode==="off")return[];const a=Math.min(127,Math.max(0,(e.octave+1)*12+e.note));if(e.mode==="single")return[a];if(e.mode==="random"){const u=Math.min(127,(e.octave+1)*12),d=Math.min(127,u+e.octaveRange*12-1);return[u+Math.floor(n()*(d-u+1))]}const r=Uy(a,e.chord,e.inversion,e.arpSpread);if(e.arp==="off")return r;const i=Gy(r,e.arpOctaves),s=Wy(i,e.arp),l=Zy(e.arp,s.length,t,Hd(e),n);return l===null?[]:[s[l]]}function il(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function x0(e,t){return t.direction&&t.strumMs>0&&e.length>1?s0(e,t.strumMs,t.direction):e.map(n=>({midi:n,offset:0}))}function k0(e,t=0){return x0(e.notes,e).map(({midi:n,offset:a})=>({note:n,velocity:e.velocity,startBeat:e.beat,lengthBeats:e.spanBeats*e.gate,role:e.role,offsetSec:a,spanBeats:e.spanBeats,gate:e.gate,hit:t,root:e.root}))}function $0(e,t,{octave:n}={}){if(t==="chord")return e.map(i=>({...i,role:"chord"}));const a=new Map;for(const i of e)a.set(i.hit,[...a.get(i.hit)??[],i]);const r=[];for(const i of a.values()){const s=i[0],l=Math.max(...i.map(u=>u.velocity));if(t==="top"){const u=i.reduce((d,c)=>c.note>d.note?c:d);r.push({...u,role:"top",offsetSec:0,velocity:l})}else{const u=n===void 0?s.root:Math.min(127,Math.max(0,(n+1)*12+(s.root%12+12)%12));r.push({...s,note:u,role:"root",offsetSec:0,velocity:l})}}return r}const ol=(e,t,n)=>Math.min(n,Math.max(t,e)),E0=1e-9;function S0(e,t){return t>0?Math.ceil(e/t-E0)*t:e}const sl=(e,t)=>({from:e,origin:t,jump:null,last:null,lastKey:"",pushedTo:-1,bar:{bar:NaN,settings:null,hits:[]}});class Ki{step=0;grid={origin:0,index:0,interval:16};comp=sl(0,0);read;random;chordRandom;bpb;serial=0;constructor(t,n={}){this.read=typeof t=="function"?t:()=>t,this.random=n.random??Math.random,this.chordRandom=n.chordRandom??Math.random,this.bpb=n.beatsPerBar??(()=>4)}get settings(){return this.read()}beatsPerBar(){return Math.max(1,this.bpb())}beatInBar(t){const n=this.beatsPerBar();return(t%n+n)%n}start(t,{join:n=!1}={}){const a=this.settings.interval,r=4/a,i=n?S0(t,r):t;this.grid={origin:i,index:0,interval:a},this.step=Math.max(0,Math.round(i/r));const s=this.beatsPerBar();return this.comp=sl(i,n?0:Math.floor(t/s+1e-9)*s),i}clone(t={}){const n=new Ki(t.settings??this.read,{random:t.random??this.random,chordRandom:t.chordRandom??this.chordRandom,beatsPerBar:t.beatsPerBar??this.bpb});n.step=this.step,n.grid={...this.grid},n.serial=this.serial;const a=this.comp;return n.comp={...a,jump:a.jump?{...a.jump}:null,last:a.last?[...a.last]:null,bar:{...a.bar}},n}resetGrid(){this.grid={origin:0,index:0,interval:this.settings.interval}}nextBeat(){return this.grid.origin+this.grid.index*4/this.grid.interval}stepBeats(){return 4/this.grid.interval}followInterval(){const t=this.settings.interval;t!==this.grid.interval&&(this.grid={origin:this.nextBeat(),index:0,interval:t})}skipTo(t){const n=Math.max(0,Math.ceil((t-this.nextBeat())/this.stepBeats()-1e-9));return this.grid.index+=n,this.step+=n,n}advance(){this.grid.index++}advanceStep(){this.step++}applyJump(t){const n=this.comp.jump;n&&t>=n.at-1e-9&&(this.comp.origin=n.origin,this.comp.jump=null)}plainChord(){const t=this.settings;return t.chordStyle==="block"&&t.chordProgression==="off"&&!(t.strum>0)&&!(t.tension>0)}barStyleActive(){const t=this.settings;return t.mode==="chord"&&t.arp==="off"&&!this.plainChord()&&el(t.chordStyle)==="bar"}stepHit(t){const n=this.settings,a=this.stepBeats();if(n.mode==="chord"&&!this.plainChord()){if(n.arp!=="off"){const c=this.chordAt(t),p={...n,chord:c.chord,note:c.rootPc,octave:Math.floor(c.root/12)-1,...c.inversion!==void 0?{inversion:c.inversion}:{}},h=rl(p,this.step,this.random);return this.step++,h.length?this.hit(t,a,h,1,null,c,!1,"arp"):null}if(el(n.chordStyle)==="bar")return this.step++,null;const l=this.chordAt(t),u=this.voicingFor(l),d=i0(n.chordStyle,u,this.step,this.beatInBar(t),this.chordRandom);return this.step++,!d||!d.notes.length?null:this.hit(t,a,d.notes,d.velocity,tl(this.beatInBar(t)),l,!0,"chord")}if(!w0(n.mode))return this.step++,null;const r=rl(n,this.step,this.random);if(this.step++,!r.length)return null;const i=n.mode==="chord",s=i?Math.min(127,Math.max(0,(n.octave+1)*12+n.note)):r[0];return{beat:t,spanBeats:a,gate:ol(n.gate/100,.1,1),velocity:1,notes:r,kind:"plain",direction:null,strumMs:0,chord:i?this.plainChordAt():null,root:s,role:i?n.arp==="off"?"chord":"arp":"note"}}hit(t,n,a,r,i,s,l,u){const d=this.settings,c=[...a];if(l&&d.tension>0&&this.chordRandom()*100<d.tension){const h=c0(c,s.rootPc,s.intervals,this.chordRandom);h!==null&&c.push(h)}const p=d.chordStyle==="strum"&&i?d.strum>0?d.strum:e0:d.strum;return{beat:t,spanBeats:n,gate:ol(d.gate/100,.1,1),velocity:r,notes:c,kind:"comp",direction:i,strumMs:p,chord:s,root:s.root,role:u}}progressionOrigin(t){const n=this.comp.jump;return n&&t>=n.at-1e-9?n.origin:this.comp.origin}plainChordAt(){const t=this.settings,n=Gi(t.chord);return{index:0,root:(t.octave+1)*12+t.note,rootPc:t.note,chord:n.id,intervals:n.intervals,name:"",numeral:"",bars:1}}chordAt(t){const n=this.settings,a=Nr(n.chordProgression,n.note,n.octave,n.progressionBars);return a?.length?al(a,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar()).chord:this.plainChordAt()}voicingFor(t){const n=this.settings,a=t.inversion??Math.min(Math.max(0,n.inversion|0),t.intervals.length-1),r=`${t.root}|${t.intervals.join(",")}|${a}|${n.voiceLeading}|${n.arpSpread}`;if(this.comp.last&&r===this.comp.lastKey)return this.comp.last;const i=n.voiceLeading==="smooth"?u0(this.comp.last,t.root,t.intervals,(n.octave+1)*12+n.note,a,n.arpSpread,t.inversion):hi(t.root,t.intervals,a,n.arpSpread);return this.comp.last=i,this.comp.lastKey=r,i}compBar(t){const n=this.comp.bar,a=this.settings;if(n.bar===t&&n.settings===a)return n.hits;const r=a,i=this.beatsPerBar(),s=r.chordStyle,l=this.chordAt(t*i),u=this.voicingFor(l);let d=u;if(s==="push"){const p=this.chordAt((t+1)*i);if(`${p.root}|${p.intervals.join(",")}`!=`${l.root}|${l.intervals.join(",")}`){const h={last:this.comp.last,key:this.comp.lastKey};d=this.voicingFor(p),this.comp.last=h.last,this.comp.lastKey=h.key}}let c=o0(s,u,l.rootPc,l.intervals,d).filter(p=>p.step/4<i-1e-9);return s==="push"&&this.comp.pushedTo===t&&(c=c.filter(p=>p.step!==0)),this.comp.bar={bar:t,settings:a,hits:c},c}barFrom(){return this.comp.from}catchUpBars(t){this.comp.from=t}syncBars(){this.comp.from=this.nextBeat()}barHits(t,n=()=>!1){const a=this.settings,r=this.beatsPerBar(),i=[];for(let s=0;s<128;s++){const l=Math.floor(this.comp.from/r+1e-9),d=this.compBar(l).find(g=>l*r+g.step/4>=this.comp.from-1e-9);if(!d){this.comp.from=(l+1)*r;continue}const c=l*r+d.step/4;if(!t(c))break;if(this.comp.from=c+1e-6,n())continue;const p=d.next&&a.chordStyle==="push"?d.len+6:d.len;d.next&&(this.comp.pushedTo=l+1);const h=this.chordAt(d.next?(l+1)*r:c);i.push(this.hit(c,p/4,d.notes,d.velocity,d.strum??tl(this.beatInBar(c)),h,!0,"chord"))}return i}chordPosition(t){const n=this.settings;if(n.mode!=="chord")return null;const a=Nr(n.chordProgression,n.note,n.octave,n.progressionBars);if(!a?.length)return null;const r=al(a,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar());return{index:r.index,bar:Math.floor(r.position+1e-9)+1,bars:r.total}}jumpToChord(t,n){const a=this.settings,r=Nr(a.chordProgression,a.note,a.octave,a.progressionBars);if(!r?.length||t<0||t>=r.length)return!1;const i=this.beatsPerBar(),s=Math.max(n,this.nextBeat(),this.comp.from),l=Math.ceil(s/i-1e-9)*i;return this.comp.jump={at:l,origin:l-f0(r,t)*i},!0}window(t,{muted:n=()=>!1}={}){const a=[];this.followInterval(),this.applyJump(this.nextBeat());for(let i=0;i<4096;i++){const s=this.nextBeat();if(!(s<t))break;if(n())this.advanceStep();else{const l=this.stepHit(s);l&&a.push(l)}this.advance()}this.barStyleActive()?a.push(...this.barHits(i=>i<t,n)):this.syncBars();const r=[];for(const i of a)r.push(...k0(i,++this.serial));return r.sort((i,s)=>i.startBeat-s.startBeat)}}const Yi=1;function A0(e,t,n,a,r){return`${e}|${t}|${n}|${a}|${r}`}function M0(e,t,n,a,r={}){const i=new Map;return $0(n,a,r).map(s=>{const l=i.get(s.hit)??0;return i.set(s.hit,l+1),{...s,id:A0(e,t,s.role,s.hit,l),source:e}})}const T0=(e,t)=>({v:Yi,kind:"notes",source:e,events:t}),la=(e,t,n)=>({v:Yi,kind:"off",source:e,reason:t,...n===void 0?{}:{atBeat:n}}),L0=e=>({v:Yi,kind:"routes",routes:e}),ca=1e-9;function C0(e={}){const t=new Map,n=new Map,a={sent:{notes:0,off:0,routes:0},events:0,errors:0},r=()=>e.nowBeat?.()??null,i=new Set,s=()=>{for(const f of[...i])try{f()}catch{}},l=(f,b)=>{const m=n.get(f);if(m){a.sent[b.kind]++,b.kind==="notes"&&(a.events+=b.events.length);try{m(b)}catch{a.errors++}}},u=f=>{const b=[];for(const m of t.values()){const y=m.targets.get(f);y?.on&&b.push({source:m.handle.id,name:m.handle.name,role:y.role,...y.octave===void 0?{}:{octave:y.octave}})}return b},d=f=>l(f,L0(u(f))),c=(f,b,m)=>{const y=f.targets.get(b);if(!y?.on||!m.length)return;const v=F0(M0(f.handle.id,f.run,m,y.role,{...y.octave===void 0?{}:{octave:y.octave}}),y.transpose??0);v.length&&l(b,T0(f.handle.id,v))},p=f=>{const b=r();return b===null?f.kept:f.kept.filter(m=>m.startBeat>=b-ca)},h=f=>{const b=r();b!==null&&f.kept.length&&f.kept[0].startBeat<b-ca&&(f.kept=f.kept.filter(m=>m.startBeat>=b-ca))};function g(f,b){const m=t.get(f);m&&m.handle.remove();const y={handle:void 0,run:1,kept:[],targets:new Map,status:null,takeBack:null},v=()=>t.get(f)===y,x={id:f,name:b,send(A){if(!v()||!A.length)return;h(y);const E=A.map(w=>({...w}));y.kept.push(...E);for(const w of y.targets.keys())c(y,w,E)},restart(){v()&&(y.run++,y.kept=[])},off(A,E){if(v()){y.kept=E===void 0?[]:y.kept.filter(w=>w.startBeat<E-ca);for(const[w,k]of y.targets)k.on&&l(w,la(f,A??"stop",E))}},setTarget(A,E){if(!v()||typeof A!="string"||!A)return;const w=y.targets.get(A),k=N0(E.transpose),T={role:E.role,on:E.on===!0,...E.octave===void 0?{}:{octave:E.octave},...k?{transpose:k}:{}};y.targets.set(A,T);const M=w&&(w.role!==T.role||w.octave!==T.octave||(w.transpose??0)!==(T.transpose??0))&&w.on;w?.on&&(!T.on||M)&&l(A,la(f,"off")),(!w||w.on!==T.on||M)&&d(A),T.on&&(!w?.on||M)&&c(y,A,p(y)),(!w||w.on!==T.on)&&s()},removeTarget(A){const E=y.targets.get(A);!v()||!E||(y.targets.delete(A),E.on&&(l(A,la(f,"removed")),d(A)))},targets:()=>[...y.targets].map(([A,E])=>({target:A,...E})),remove(){if(!v())return;const A=[...y.targets].filter(([,E])=>E.on).map(([E])=>E);for(const E of A)l(E,la(f,"removed"));t.delete(f);for(const E of A)d(E);s()},status(A){if(!v())return;const E=A&&typeof A.now=="string"&&typeof A.next=="string"?{now:A.now.slice(0,32),next:A.next.slice(0,32)}:null;JSON.stringify(E)!==JSON.stringify(y.status)&&(y.status=E,s())},onTakeBack(A){v()&&(y.takeBack=typeof A=="function"?A:null)}};return y.handle=x,t.set(f,y),x}return{source:g,sources:()=>[...t.values()].map(f=>f.handle),host:f=>({notesIn(b){if(typeof b!="function")return()=>{};const m=!n.has(f);n.set(f,b),m&&s(),d(f);for(const y of t.values())y.targets.get(f)?.on&&c(y,f,p(y));return()=>{n.get(f)===b&&(n.delete(f),s())}},notesSource:b=>g(f,String(b).slice(0,64)),notesTakeBack(b){const m=t.get(b);if(!m?.takeBack||!m.targets.has(f))return null;try{const y=m.takeBack(f);return y==null?null:structuredClone(y)}catch{return null}}}),routesFor:u,listening:f=>n.has(f),drop(f){n.delete(f);for(const b of[...t.values()])b.handle.id===f?b.handle.remove():b.targets.delete(f);s()},statuses:()=>[...t.values()].filter(f=>f.status!==null).map(f=>({source:f.handle.id,name:f.handle.name,status:{...f.status}})),onChange(f){return i.add(f),()=>i.delete(f)},stats:()=>({sent:{...a.sent},events:a.events,errors:a.errors})}}function N0(e){return typeof e=="number"&&Number.isFinite(e)?Math.max(-48,Math.min(48,Math.round(e))):0}function F0(e,t){if(!t)return e;const n=a=>Math.max(0,Math.min(127,a+t));return e.map(a=>({...a,note:n(a.note),root:n(a.root)}))}const I0=.5,P0=20;function z0(e,t,n={}){const a=n.aheadSec??I0,r=n.now??Ne;let i={...v0,...n.settings};const s=n.seed??1,l=()=>new Ki(()=>i,{random:il(s),chordRandom:il(s+1),beatsPerBar:()=>Math.max(1,t.transport.meter?.beatsPerBar??4)});let u=null,d=0,c=!1;const p=()=>{const m=t.transport;if(!u||!m.running)return;const y=u.window(m.beatAt(r()+a));y.length&&(d+=y.length,e.send(y))},h=(m,y)=>{u=l(),e.restart(),u.start(m,{join:y}),p()},g=t.onChange(m=>{if(!c){if(m.kind==="start")h(m.beat,!1);else if(m.kind==="stop")u=null,e.off("stop");else if(m.kind==="snapshot"){const y=t.transport;!y.running&&u?(u=null,e.off("stop")):y.running&&!u&&h(y.beatAt(Math.max(y.startTime??r(),r())),!0)}}}),f=(n.ticker??(m=>pp(m,{intervalMs:P0})))(p);f.start();const b=t.transport;return b.running&&h(b.beatAt(Math.max(b.startTime??r(),r())),!0),{source:e,set(m){i={...i,...m}},settings:()=>i,sent:()=>d,remove(){c||(c=!0,g(),f.dispose(),e.remove())}}}const Xi="studio";function D0(){let e=null;const t=new Set,n=new Set,a=new Set,r=new Map,i=d=>{try{return r.get(d)?.()===!0}catch{return!1}},s=d=>{for(const c of[...d])try{c()}catch{}},l=d=>{if(d!==e){e=d;for(const c of n)c()}},u=(d,c)=>(d.add(c),()=>{d.delete(c)});return{owner:()=>e,claim(d){e===null&&l(d)},claimAll(){l(Xi),s(t)},clear:()=>l(null),onAll:d=>u(t,d),member(d,c){return r.set(d,c),()=>{r.get(d)===c&&r.delete(d)}},out(d){for(const c of r.keys())if(c!==d&&i(c))return;s(a)},drop:d=>{r.delete(d)},onLastOut:d=>u(a,d),playing:()=>[...r.keys()].filter(i),onChange:d=>u(n,d)}}const ll="netcomposer.studio.plugins.frozen.v1",R0=2e3;function O0(e,t){const n=[],a=new Set;for(const r of t)r.plugin?.status!=="failed"||r.plugin.error!==wa[6]||(a.add(r.id),e.has(r.id)||n.push(r));for(const r of[...e])a.has(r)||e.delete(r);for(const r of a)e.add(r);return n}function B0(e){const t=new Map;for(const n of e)for(const a of n)a.plugin?.status==="ready"&&!t.has(a.plugin.id)&&t.set(a.plugin.id,a.plugin.name);return[...t].map(([n,a])=>({id:n,name:a}))}function j0(e){let t=[];const n=()=>{if(!e)return t;try{const r=JSON.parse(e.getItem(ll)??"[]");return Array.isArray(r)?r.filter(i=>typeof i=="string"):[]}catch{return[]}},a=r=>{t=r;try{e?.setItem(ll,JSON.stringify(r))}catch{}};return{has:r=>n().includes(r),list:n,add(r){a([...new Set([...n(),...r])])},clear(r){const i=n();i.includes(r)&&a(i.filter(s=>s!==r))}}}function _0(e){let t=!1;const n=(e.watch??Zp)(e.ctx,{stallMs:e.stallMs??R0,onStall:()=>{if(t)return;const a=e.running();a.length&&(t=!0,n.stop(),e.onFrozen(a))}});return{stop:()=>n.stop()}}const Yd="netcomposer.studio.picker.v1",cl="http://127.0.0.1:5177",q0=1,Wt=16,dl=64*1024*1024,ul=[1e3,2e3,5e3,1e4],V0=new Set(["127.0.0.1","localhost","[::1]"]);function Ji(e){if(typeof e!="string"||!e||e.length>64)return null;let t;try{t=new URL(e)}catch{return null}return t.protocol!=="http:"||!V0.has(t.hostname)||!t.port||t.username||t.password||e.replace(/\/$/,"")!==t.origin?null:t.origin}function Xd(e){try{const t=JSON.parse(e?.getItem(Yd)??"null"),n=t&&typeof t=="object"?t:{};return{on:n.on===!0,address:Ji(n.address)??cl}}catch{return{on:!1,address:cl}}}function mi(e,t){try{e?.setItem(Yd,JSON.stringify(t))}catch{}}function H0(e){let t=[];try{const n=e.pads();Array.isArray(n)&&(t=n)}catch{}return Array.from({length:Wt},(n,a)=>{const r=t[a]&&typeof t[a]=="object"?t[a]:{};return{pad:a+1,name:typeof r.name=="string"?r.name.slice(0,40):"",filled:r.filled===!0}})}const Fr=e=>({ok:!1,placed:[],left:[],message:e}),Ir=e=>Array.isArray(e)?e.filter(t=>Number.isInteger(t)&&t>=1&&t<=Wt).slice(0,16):[];function U0(e){const t=e&&typeof e=="object"?e:{};return{ok:t.ok===!0,placed:(Array.isArray(t.placed)?t.placed:[]).flatMap(n=>{const a=n&&typeof n=="object"?n:{},[r]=Ir([a.from]),[i]=Ir([a.to]);return r&&i?[{from:r,to:i}]:[]}).slice(0,Wt),left:Ir(t.left),message:typeof t.message=="string"?t.message.slice(0,400):""}}function G0(e){const t=e&&typeof e=="object"?e:{};return t.type!=="kit"||typeof t.id!="string"||!/^[\w-]{1,40}$/.test(t.id)||typeof t.target!="string"||!t.target||t.target.length>64?null:{id:t.id,target:t.target,mode:t.mode==="fill"?"fill":"replace"}}function W0(e){const t=new Map,n=new Map,a=new Set,r=new Map,i=e.now??(()=>Date.now()),s=e.setTimeout??((M,C)=>setTimeout(M,C)),l=e.clearTimeout??(M=>clearTimeout(M)),u=M=>e.live?.(M)??!0;let d="off",c="",p=0,h=null,g=null,f="";const b=M=>{M!==d&&(d=M,e.onStatus?.(M))},m=()=>[...t.entries()].filter(([M])=>u(M)).map(([M,C])=>{const F=e.brandOf?.(M);return{id:M,name:(e.nameOf?.(M)??M).slice(0,40),...F?{brand:F.slice(0,40)}:{},shown:e.shown?.()===M,seen:n.get(M)??0,pads:H0(C)}}),y=M=>{const C=m();return f=JSON.stringify(C),JSON.stringify({v:q0,studio:e.studio,label:(e.label?.()??"Studio").slice(0,60),targets:C,results:[...r.entries()].map(([F,q])=>({id:F,...q})),wait:M})},v=(M,C)=>e.fetch(`${c}/api/studio/poll`,{method:"POST",headers:{"content-type":"application/json"},body:y(M),cache:"no-store",...C?{signal:C}:{},targetAddressSpace:"loopback"}),x=async(M,C)=>{if(!M.ok)throw new Error(`the picker said ${M.status}`);const F=await M.json();if(C!==p)return;if(b("on"),Array.isArray(F.ack))for(const U of F.ack)typeof U=="string"&&r.delete(U);const q=Array.isArray(F.commands)?F.commands:[];for(const U of q.slice(0,4)){const X=G0(U);X&&k(X,C)}},A=async M=>{let C=0,F=!1;for(;M===p;){const q=new AbortController;h=q;try{await x(await v(F,q.signal),M),C=0,F=!0}catch{if(M!==p)return;F=!1,b("away");const U=ul[Math.min(C++,ul.length-1)];await new Promise(X=>s(X,U))}}},E=()=>{!c||g!==null||(g=s(()=>{g=null;const M=p;!c||d!=="on"||!r.size&&JSON.stringify(m())===f||v(!1).then(C=>x(C,M)).catch(()=>{})},150))},w=async M=>{const C=await e.fetch(M,{cache:"no-store",targetAddressSpace:"loopback"});if(!C.ok){const F=await C.json().catch(()=>({}));throw new Error(typeof F.error=="string"?F.error.slice(0,120):`the picker said ${C.status}`)}return C},k=async(M,C)=>{if(r.has(M.id))return;let F;const q=t.get(M.target);if(!q||!u(M.target))F=Fr("That NYX isn't in the Studio any more.");else if(a.has(M.target))F=Fr("NYX is still loading the last kit.");else{a.add(M.target);try{const U=await(await w(`${c}/api/kit/manifest`)).json(),X=Array.isArray(U.sounds)?U.sounds:[];if(!X.length)throw new Error("the picker's pads are empty");if(X.length>Wt)throw new Error(`more than ${Wt} sounds`);const fe={};for(const ge of X){const re=ge&&typeof ge=="object"?ge.pad:null;if(typeof re!="number"||!Number.isInteger(re)||re<1||re>Wt||fe[re])throw new Error("a sound has no pad of its own");const ie=await w(`${c}/api/kit/audio?pad=${re}`);if(Number(ie.headers.get("content-length")??0)>dl)throw new Error(`pad ${re}'s sound is too big`);const G=await ie.arrayBuffer();if(G.byteLength>dl)throw new Error(`pad ${re}'s sound is too big`);fe[String(re)]=G}if(C!==p)return;e.reveal?.(M.target),F=U0(await q.receive(U,M.mode,fe))}catch(U){F=Fr(`Not loaded: ${U.message||"it went wrong"}.`)}finally{a.delete(M.target)}}C===p&&(r.set(M.id,F),E())},T=()=>{p++,h?.abort(),h=null,g!==null&&l(g),g=null,c="",r.clear(),b("off")};return{host(M){return{pickerTarget(C){return t.set(M,C),E(),{changed:E,remove(){t.get(M)===C&&t.delete(M),E()}}}}},start(M){const C=Ji(M);C&&(T(),c=C,b("connecting"),A(++p))},stop:T,seen(M){n.set(M,i()),t.has(M)&&E()},changed:E,forget(M){t.delete(M),n.delete(M),E()},targets:m,get status(){return d}}}const K0="NetComposer Studio",Je=[40,240],Y0="nc-sync";function X0(e,t=globalThis.navigator?.locks){const n=`/studio/${e}`;return{channel:`${Y0}${n}`,locks:t?{request:(a,r,i)=>t.request(`${a}${n}`,r,i)}:null}}function J0(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}const Q0=.2,pl=.5;function Z0(e,t,n){const a=new Qu({bpm:120,minBpm:Je[0],maxBpm:Je[1],timebase:"shared"}),r=new hp({app:K0,version:"0.1.0",clock:a,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:Je},startLeadSeconds:Q0,...n?{startGate:()=>n(),gatedStartLeadSeconds:pl}:{},...t?{channel:t.channel,locks:t.locks}:{},audio:()=>{const u=e();return u==="running"?"running":u==="closed"?"none":"needs-gesture"}});let i=!1,s=0,l=!1;return{clock:a,peer:r,async start(){i||(i=!0,await r.start())},play(){const u=n?.()??null;if(!u){l=!1,a.play({at:Ne()});return}const d=++s,c=Ne();l=!0;const p=()=>{d!==s||!l||(l=!1,r.isLeader&&!a.transport.running?(a.commitStart(Math.max(c,Ne())+pl,0),r.publishState()):a.play({at:Ne()}))};u.then(p,p)},stop(){l&&(l=!1,s++,!a.transport.running)||a.stop({at:Ne()})},setTempo:u=>a.setTempo({bpm:ew(u)}),playing:()=>a.transport.isPlayingAt(Ne()),running:()=>l||a.transport.running,bpm:()=>a.transport.bpm,position(){const u=a.transport,d=Ne();return u.isPlayingAt(d)?tw(u.beatAt(d)):null},beatPhase(){const u=a.transport,d=Ne();if(!u.isPlayingAt(d))return null;const c=u.beatAt(d);return c-Math.floor(c)},peers:()=>[...r.peers.values()]}}function ew(e){return Number.isFinite(e)?Math.min(Je[1],Math.max(Je[0],Math.round(e*10)/10)):120}function tw(e){const t=Math.max(0,Math.floor(e));return{bar:Math.floor(t/4)+1,beat:t%4+1}}const fi="netcomposer.scene",Jd=1,Qd="netcomposer.studio.tempo.v1",Zd="netcomposer.studio.scene-name.v1",Ia=120,Qi="Untitled scene",nw=2*1024*1024;function Ya(e){const t=typeof e=="number"?e:Number(e);return Number.isFinite(t)?Math.min(Je[1],Math.max(Je[0],Math.round(t*10)/10)):Ia}function Nt(e){return(typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,60):"")||Qi}function aw(e){return{format:fi,v:Jd,name:Nt(e.name),saved:(e.now??new Date).toISOString(),tempo:{bpm:Ya(e.bpm)},meter:[4,4],instances:e.instances.map(t=>({id:t.id,type:t.type,name:t.name})),mix:e.mix,presets:e.presets??{},media:e.media??[]}}function rw(e,t){if(e.length>nw)return{ok:!1,error:"That file is too large to be a Scene."};let n;try{n=JSON.parse(e)}catch{return{ok:!1,error:"That file isn't a Scene (it isn't JSON)."}}if(!n||typeof n!="object")return{ok:!1,error:"That file isn't a Scene."};const a=n;if(a.format!==fi)return{ok:!1,error:"That file isn't a Scene. Load an instrument's own file from that instrument."};if((typeof a.v=="number"?a.v:0)<1)return{ok:!1,error:"That Scene has no version."};const i=new Set,s=[];for(const d of Array.isArray(a.instances)?a.instances:[]){if(!d||typeof d!="object")continue;const c=d.id;if(typeof c!="string")continue;const p=_i(c);if(!p||!t.includes(p.type)||i.has(c))continue;i.add(c);const h=d.name;s.push({id:c,type:p.type,name:ad(h,"")})}if(!s.length)return{ok:!1,error:"That Scene has no instruments this Studio knows."};const l=a.tempo&&typeof a.tempo=="object"?a.tempo.bpm:void 0,u={};if(a.presets&&typeof a.presets=="object")for(const[d,c]of Object.entries(a.presets))i.has(d)&&(u[d]=c);return{ok:!0,scene:{format:fi,v:Jd,name:Nt(a.name),saved:typeof a.saved=="string"?a.saved:"",tempo:{bpm:Ya(l)},meter:[4,4],instances:s,mix:Md(a.mix??Pn()),presets:u,media:Array.isArray(a.media)?a.media:[]}}}function iw(e){return`${Nt(e).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"scene"}.scene.json`}function ow(e){try{const t=e?.getItem(Qd);return t?Ya(Number(t)):Ia}catch{return Ia}}function eu(e,t){try{t?.setItem(Qd,String(Ya(e)))}catch{}}function sw(e){try{return Nt(e?.getItem(Zd))}catch{return Qi}}function tu(e,t){try{t?.setItem(Zd,Nt(e))}catch{}}const lw=300,cw=120*1e3;function dw(e){return Object.prototype.toString.call(e)==="[object Float32Array]"}function uw(e){const t=e&&typeof e=="object"?e:null;if(!t)return{ok:!1,message:"No audio."};const n=typeof t.name=="string"?t.name.trim().slice(0,64):"";if(!n)return{ok:!1,message:"The audio has no name."};const a=t.sampleRate;if(typeof a!="number"||!Number.isFinite(a)||a<8e3||a>192e3)return{ok:!1,message:"The sample rate is out of range (8–192 kHz)."};const r=t.channels;if(!Array.isArray(r)||r.length<1||r.length>2)return{ok:!1,message:"The audio needs one or two channels."};if(!r.every(dw))return{ok:!1,message:"Channels must be 32-bit float arrays."};const i=r[0].length;if(i===0)return{ok:!1,message:"The audio is empty."};if(r.some(u=>u.length!==i))return{ok:!1,message:"The channels differ in length."};if(i>lw*a)return{ok:!1,message:"The audio is longer than five minutes."};const s=typeof t.bars=="number"&&Number.isInteger(t.bars)&&t.bars>=1&&t.bars<=256?t.bars:void 0,l=typeof t.bpm=="number"&&Number.isFinite(t.bpm)&&t.bpm>=20&&t.bpm<=300?t.bpm:void 0;return{ok:!0,audio:{name:n,sampleRate:a,channels:r.map(u=>new Float32Array(u)),...s===void 0?{}:{bars:s},...l===void 0?{}:{bpm:l}}}}function hl(e){try{const t=e.targets();return Array.isArray(t)?t.flatMap(n=>{if(!n||typeof n.id!="string"||!n.id)return[];const a=typeof n.name=="string"&&n.name?n.name.slice(0,64):n.id;return[{id:n.id,name:a,...n.filled?{filled:!0}:{}}]}):[]}catch{return[]}}function pw(e={}){const t=new Map,n=s=>e.live?.(s)??!0,a=s=>e.nameOf?.(s)??s,r=e.answerMs??cw,i=s=>[...t.entries()].filter(([l])=>l!==s&&n(l)).map(([l,u])=>{const d=e.brandOf?.(l);return{instance:l,name:a(l),...d?{brand:d}:{},label:typeof u.label=="string"&&u.label?u.label.slice(0,24):"Target",targets:hl(u)}});return{forget(s){t.delete(s)},host(s){return{audioReceivers:()=>i(s),async sendAudio(l,u,d){const c=t.get(l);if(l===s||!c||!n(l))return{ok:!1,reason:"gone",message:"That instrument isn't in the Studio."};if(typeof d!="string"||!hl(c).some(f=>f.id===d))return{ok:!1,reason:"invalid",message:`No ${d} there.`};const p=uw(u);if(!p.ok)return{ok:!1,reason:"invalid",message:p.message};const h={...p.audio,from:s,fromName:e.brandOf?.(s)??a(s)};let g;try{const f=await Promise.race([Promise.resolve(c.receive(h,d)),new Promise(b=>{g=setTimeout(()=>b({ok:!1,reason:"timeout",message:"No answer."}),r)})]);return!f||typeof f!="object"||typeof f.ok!="boolean"?{ok:!1,reason:"error",message:"The instrument didn't answer."}:f}catch(f){return{ok:!1,reason:"error",message:f instanceof Error?f.message:String(f)}}finally{clearTimeout(g)}},onAudio(l){return t.set(s,l),()=>{t.get(s)===l&&t.delete(s)}},reveal(){n(s)&&e.reveal?.(s)}}}}}const hw="/studio/assets/silence-processor--fvxD5Gm.js";function mw(e,t=Vi){const n=t.find(i=>i.id===e.type),a=(n?.name??e.type).toUpperCase(),r=String(e.n).padStart(2,"0");return{brand:n?.brand??a,rest:e.custom&&e.name?` / ${e.name.toUpperCase()}`:` / ${a} / ${r}`,...n?.identity?{identity:n.identity}:{}}}const gi=Xh,Ke=Yh,Pr={system:"System",light:"Light",dark:"Dark"};function fw(e){try{return Ei(e?.getItem(gi))}catch{return"system"}}function gw(e,t){try{t==="system"?e?.removeItem(gi):e?.setItem(gi,t)}catch{}}const bw=e=>Ke[(Ke.indexOf(e)+1)%Ke.length]??"system";function yw(e){try{return e.contentDocument?.documentElement?e.contentDocument:null}catch{return null}}function nu(e,t){const n=yw(e);n&&Si(t,n)}function ww(e,t){const n=document.createElement("div");n.className="theme",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Theme"),n.dataset.theme="";let a=e;const r=Ke.map(s=>{const l=document.createElement("button");l.type="button",l.className="ghost theme-choice",l.setAttribute("role","radio"),l.dataset.themeChoice=s;const u=document.createElement("span");return u.className="theme-word",u.textContent=Pr[s],l.append(u),l.setAttribute("aria-label",`${Pr[s]} theme`),l.title=s==="system"?"Follow this computer's light or dark setting":`${Pr[s]} theme`,l.addEventListener("click",()=>{const d=n.closest(".nc-page-menu[data-nc-open]")!==null,c=s===a&&!d?bw(s):s;i(c),t(c),r[Ke.indexOf(c)]?.focus({preventScroll:!0})}),l});n.append(...r);function i(s){a=s;for(const l of r){const u=l.dataset.themeChoice===s;l.setAttribute("aria-checked",u?"true":"false"),l.tabIndex=u?0:-1}}return i(e),n.addEventListener("keydown",s=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(s.key))return;s.preventDefault();const l=s.key==="ArrowLeft"||s.key==="ArrowUp"?-1:1,u=(Ke.indexOf(a)+l+Ke.length)%Ke.length,d=Ke[u]??"system";i(d),t(d),r[u]?.focus()}),{el:n,get choice(){return a},set:i}}function vw(e,t){const n=e.addModule.bind(e),a=new Map;return Object.defineProperty(e,"addModule",{value:(i,s)=>{const l=new URL(String(i),t).href;let u=a.get(l);return u||(u=n(i,s),a.set(l,u),u.catch(()=>{a.get(l)===u&&a.delete(l)})),u},configurable:!0}),e}const Z=new AudioContext({latencyHint:"interactive"});vw(Z.audioWorklet,location.href);const Zi=j0(Ae()),xw=new URLSearchParams(location.search).has("plugins"),kw=xw,Cn=Yb({ctx:Z,moduleUrl:$n,base:location.href,remote:kw,store:Mb(),frozen:Zi});function ml(e,t){Cn?.restore(e.getChain().flatMap(r=>r.plugin?[r.plugin]:[])),eo.add(e);let n=e.getChain().length;const a=new Set;return e.onChange(r=>{if(r.key==="error"||r.key==="plugin"){et?.render();for(const s of O0(a,e.getChain()))bn({message:R.stuck(s.plugin?.name??s.name,t()),duration:12e3,anchor:document.querySelector("[data-nc-area='fx']")}).el.dataset.pluginStuck=s.plugin?.id??s.id}const i=e.getChain().length;i!==n&&(n=i,queueMicrotask(()=>et?.render()))}),e}function $w(e){return ae.list().find(t=>t.id===e)?.name??e}const eo=new Set,Le=_b(),en={},Ew=jd,Xa=new Map,ae=new qy(Z,{restore:e=>Le.channels[e],fx:e=>{const t=ur(Z,{moduleUrl:$n,bpm:120,state:pd(e,Le)});return en[e]=t,t},masterFx:()=>{const e=ur(Z,{moduleUrl:$n,bpm:120,slots:oi,state:eb(Le,oi)});return e.onChange(On),ml(e,()=>"Master")},channelFx:e=>{Ba.delete(e);const t=ur(Z,{moduleUrl:$n,bpm:V.bpm(),slots:Ew,state:Le.channelFx[e]??{v:2,chain:[]}}),n=Vl(t,V.clock,{mapper:tt}),a=t.dispose.bind(t);return t.dispose=()=>{n(),a()},t.onChange(On),Xa.set(e,t),t.dispose=(r=>()=>{eo.delete(t),r()})(t.dispose),ml(t,()=>$w(e))}});ae.setMaster(Le.master);ae.setReturn("a",Le.returns.a);ae.setReturn("b",Le.returns.b);let au=()=>!1;const tt=new cp(Z,{hold:()=>au()});tt.start();const ru=J0();let iu=()=>{};const ou=xb(Z.sampleRate),Ja=rb(Z,{nodeFor:e=>ae.tapNode(e),latencyFor:e=>ae.tapLatency(e,ou.get()),sources:()=>[{id:"master",name:"Master"},...ae.list().map(e=>({id:e.id,name:e.name}))],ready:new Promise(e=>{iu=e})}),Ie=D0(),Kt=Bg(()=>{try{return globalThis.sessionStorage??null}catch{return null}}),qn=e=>_.some(t=>t.id===e),su=e=>_.find(t=>t.id===e)?.name??e,lu=e=>{const t=_.find(a=>a.id===e),n=Ee.find(a=>a.id===t?.type)?.brand;return t&&n?t.n===1?n:`${n} ${t.n}`:void 0},Qa=e=>{Ze(e),document.getElementById(`tab-${e}`)?.scrollIntoView({block:"nearest"}),Pe.get(e)?.contentWindow?.focus()},cu=pw({live:qn,nameOf:su,brandOf:lu,reveal:Qa}),ct=W0({fetch:(e,t)=>fetch(e,t),studio:`studio-${Math.random().toString(36).slice(2,10)}`,label:()=>St.value.trim()||"Studio",live:qn,nameOf:su,brandOf:lu,shown:()=>Ve,reveal:Qa,onStatus:e=>lo(e)});let du=!1;const to=Xg(),uu=Kg({now:()=>Z.currentTime,labelOf:e=>{const t=_.find(a=>a.id===e),n=Ee.find(a=>a.id===t?.type)?.brand??t?.name??e;return t&&t.n>1?`${n} ${t.n}`:n},clearOf:()=>[yu,Ra,vu]}),Lt=C0({nowBeat:()=>{const e=V.clock.transport;return e.running?e.beatAt(Ne()):null}}),bi=new Set,Za=()=>{for(const e of[...bi])try{e()}catch{}};Lt.onChange(()=>{Za(),Sw()});window.ncStudio=qg(Z,ae,{notes:Lt,clock:()=>V.clock,targets:{list:()=>_.map(e=>({instance:e.id,name:e.name,type:e.type,n:e.n,takesNotes:Lt.listening(e.id)})),listen(e){return bi.add(e),()=>bi.delete(e)}},show:e=>{qn(e)&&Qa(e)},countIn:uu.api,holdFirstPlay:()=>to.hold(),presets:Kt,share:cu,picker:ct,grab:Ja,play:Ie,mapper:ib(tt),resolve:(e,t)=>Cw(e,t),syncScope:ru,fxWorklet:new URL($n,location.href).href});const V=Z0(()=>Z.state,X0(ru),()=>du&&Z.state==="running"&&tt.ready&&to.count===0?null:Pw());au=()=>V.clock.transport.isPlayingAt(Ne());function ke(){try{return globalThis.localStorage??null}catch{return null}}V.setTempo(ow(ke()));const $e=new hb(Z,()=>ae.tapNode("master"));let yn=null;const Me=new gb(Z,()=>ae.tapNode("master"),mb(ke()));let pu=null;function D(e,t={},...n){const a=document.createElement(e);for(const[r,i]of Object.entries(t))i===void 0||i===!1||a.setAttribute(r,i===!0?"":String(i));return a.append(...n),a}const zn=D("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),tn=D("input",{type:"number",class:"bpm",min:Je[0],max:Je[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),Pa=D("output",{class:"position","aria-label":"Bar and beat"},"—"),dt=D("button",{type:"button",class:"btn rec","aria-pressed":"false","data-state":"idle","data-nc-help":ee["transport:rec"]},"Rec"),Ct=D("button",{type:"button",class:"btn keep","aria-haspopup":"menu","aria-expanded":"false","aria-controls":"keep-menu","aria-keyshortcuts":"K","data-nc-help":ee["transport:keep"]},"Keep"),hu=D("div",{class:"keep-held","data-nc-help":ee["keep:held"]}),no=[...ob.map(e=>({choice:()=>({last:e}),label:`Keep last ${e/60} min`,key:String(e)})),{choice:e=>({since:e}),label:"Keep since Play",key:"since"}],Vn=no.map(e=>D("button",{type:"button",role:"menuitem",class:"keep-item","data-keep":e.key},e.label)),Dn=Ai({checked:Me.keeping,labelledBy:"keep-switch-label",onChange:e=>{fb(ke(),e),Me.setKeeping(e),gt(e?"Keeping: on":"Keeping: off (nothing held)")}}),qe=D("div",{class:"keep-menu",id:"keep-menu",role:"menu","aria-label":"Keep",hidden:!0},hu,...Vn,D("div",{class:"keep-switch","data-nc-help":ee["keep:switch"]},D("span",{id:"keep-switch-label"},"Keeping"),Dn.el)),mu=D("div",{class:"keep-wrap"},Ct,qe),wn=D("a",{class:"take",hidden:!0}),Et=D("button",{type:"button",class:"notes-chip",hidden:!0});Et.addEventListener("click",()=>{const e=Et.dataset.source;e&&qn(e)&&Qa(e)});function Sw(){const e=Lt.statuses().filter(i=>qn(i.source));Et.hidden=e.length===0;const t=e[0];if(!t)return;Et.dataset.source=t.source;const{now:n,next:a}=t.status,r=`${n}${a&&a!==n?` → ${a}`:""}`;Et.replaceChildren(D("span",{class:"notes-chip-dot","aria-hidden":"true"}),D("span",{class:"notes-chip-name"},t.name),D("span",{class:"notes-chip-chord"},r),...e.length>1?[D("span",{class:"notes-chip-count",title:`${e.length} CALLIOPEs playing`},String(e.length))]:[]),Et.setAttribute("aria-label",`${t.name} plays ${r}. Show it.`)}const ao=D("span",{class:"status",role:"status"}),St=D("input",{type:"text",class:"scene-name",maxlength:60,value:sw(ke()),"aria-label":"Scene name",title:"Scene name (used when you Save)"}),fu=D("button",{type:"button",class:"ghost","data-scene":"save",title:"Save this Scene as a file"},"Save"),gu=D("button",{type:"button",class:"ghost","data-scene":"load",title:"Load a Scene file"},"Load"),bu=D("button",{type:"button",class:"ghost","data-scene":"new",title:"Start a new Scene"},"New"),Nn=D("input",{type:"file",accept:".json,application/json",hidden:!0}),mt=D("button",{type:"button",class:"ghost picker-link","data-picker":"off","aria-pressed":"false"},D("span",{class:"picker-dot","aria-hidden":"true"}),"Picker"),ro=ww(fw(ke()),e=>{gw(ke(),e),Si(e);for(const t of Pe.values())nu(t,e)});Si(ro.choice);const yu=D("h1",{class:"brand","aria-label":"NetComposer Studio"},D("span",{"aria-hidden":"true"},"NetComposer",D("span",{class:"brand-sep"}," / "),"Studio")),yi=D("span",{class:"beat-light","aria-hidden":"true"}),za=D("span",{class:"status-long"}),Da=D("span",{class:"status-short"});ao.append(za,Da);const Ra=D("header",{class:"top"},D("div",{class:"transport"},zn,D("label",{class:"tempo"},tn,D("span",{class:"tempo-unit"},"BPM")),yi,Pa),D("div",{class:"record-col"},D("div",{class:"record"},dt,mu,wn),Et),ao),wu=D("div",{class:"scene-actions"},St,fu,gu,bu,mt,ro.el),Aw=bg({panel:wu}),vu=D("div",{class:"scene",role:"group","aria-label":"Scene"},wu,Nn,Aw.button);$e.supported||(dt.disabled=!0,dt.title="This browser can't record audio",Ct.disabled=!0);const rn=D("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),xu=D("div",{class:"stage"}),Hn=D("label",{class:"tab tab-add",title:"Add an instrument"},D("span",{"aria-hidden":"true"},"+")),Yt=D("select",{class:"tab-add-select","aria-label":"Add an instrument"});Yt.append(D("option",{value:""},"Add an instrument"),...Vi.map(e=>{const t=D("option",{value:e.id},e.available===!1?`${e.name} (soon)`:e.name);return t.disabled=e.available===!1,t}));Yt.addEventListener("change",()=>{const e=Yt.value;Yt.value="",e&&Lu(e)});Hn.append(Yt);rn.append(Hn);hg();const Rn=D("div",{class:"spine","aria-hidden":"true"}),Pe=new Map;let _=Ig(Fg(Ee),Ee),Ve=_[0]?.id??"";const Mw=new URLSearchParams(location.search).has("measure"),fl=new Map,Tw=2e4;function ku(e){const t=D("button",{type:"button",role:"tab",id:`tab-${e.id}`,"aria-controls":`panel-${e.id}`,class:"tab"},e.name);Nu(t,e),t.addEventListener("click",()=>Ze(e.id)),rn.insertBefore(t,Hn);const a=(fl.get(e.type)??Promise.resolve()).then(()=>new Promise(r=>{if(!_.some(l=>l.id===e.id))return r();const i=D("iframe",{id:`panel-${e.id}`,role:"tabpanel","aria-labelledby":`tab-${e.id}`,title:e.name,src:Lg(e,Mw),allow:"autoplay; clipboard-read; clipboard-write; microphone"});Pe.set(e.id,i);const s=window.setTimeout(r,Tw);i.addEventListener("load",()=>Lw(i)),i.addEventListener("load",()=>{window.clearTimeout(s),r()},{once:!0}),xu.append(i),Ze(Ve)}));return fl.set(e.type,a),a}const $u=window.matchMedia(Jl);function Eu(e){try{e.contentDocument?.documentElement.toggleAttribute("data-nc-landscape",$u.matches)}catch{}}$u.addEventListener("change",()=>{for(const e of Pe.values())Eu(e)});function Lw(e){let t=null;try{t=e.contentDocument}catch{return}if(!t?.documentElement)return;t.documentElement.dataset.ncHosted="",nu(e,ro.choice),Eu(e);const n=e.id.replace(/^panel-/,""),a=()=>{const i=t?.querySelector(".nc-page"),s=i?i.getBoundingClientRect().height:t?.documentElement.scrollHeight??0;s>0&&(e.style.height=`${Math.ceil(s)}px`);const l=t?.querySelector(".nc-page-hd, .nc-title-band");l&&(Au.set(n,Math.round(l.getBoundingClientRect().bottom)),n===Ve&&Mu())};a();const r=t.querySelector(".nc-page")??t.body;r&&new ResizeObserver(()=>{a(),er()}).observe(r),io.add(e),Su(e)}const io=new Set;function Su(e){let t;try{t=e.contentDocument?.documentElement}catch{return}if(!t||!e.isConnected){io.delete(e);return}const n=e.getBoundingClientRect();if(n.height<=0)return;const a=getComputedStyle(Ra).position==="sticky"?Ra.getBoundingClientRect().bottom:0,r=Math.min(n.height,Math.max(0,a-n.top)),i=Math.max(r,Math.min(n.height,window.innerHeight-n.top));t.style.setProperty("--nc-host-top",`${Math.round(r)}px`),t.style.setProperty("--nc-host-height",`${Math.round(i-r)}px`),t.style.setProperty("--nc-host-bottom",`${Math.round(n.height-i)}px`)}let zr=!1;function er(){zr||(zr=!0,requestAnimationFrame(()=>{zr=!1;for(const e of io)Su(e)}))}window.addEventListener("scroll",er,{passive:!0});window.addEventListener("resize",er);const Au=new Map;function Mu(){const e=Au.get(Ve);e===void 0?Rn.style.removeProperty("--spine-top"):Rn.style.setProperty("--spine-top",`${e}px`)}function Tu(e){if(!e){Rn.replaceChildren();return}const t=mw(e),n=D("span",{class:"spine-brand"},t.brand);t.identity&&(n.style.color=`var(--nc-ui-${t.identity})`),Rn.replaceChildren(D("span",{class:"spine-text"},n,D("span",{class:"spine-rest"},t.rest)))}function Ze(e){Ve=e,ct.seen(e),Tu(_.find(t=>t.id===e)),Mu(),er();for(const t of _){const n=t.id===e;Pe.get(t.id)?.classList.toggle("shown",n);const a=document.getElementById(`tab-${t.id}`);a?.setAttribute("aria-selected",String(n)),a?.setAttribute("tabindex",n?"0":"-1")}}const Cw=zg(()=>_.map(e=>({instance:e,window:()=>Pe.get(e.id)?.contentWindow,readyState:()=>{try{return Pe.get(e.id)?.contentDocument?.readyState}catch{return}}})),Ee);function Lu(e){const t=Ee.find(r=>r.id===e);if(!t)return;const n=Cg(_,t),a=_.map(r=>r.type).lastIndexOf(n.type);_=a<0?[..._,n]:[..._.slice(0,a+1),n,..._.slice(a+1)],an(_),ku(n),Za();for(const r of _){const i=document.getElementById(`tab-${r.id}`);i&&rn.insertBefore(i,Hn)}Ze(n.id),et?.render()}function Nw(e,t){const n=_.find(l=>l.id===e);if(!n)return;const a=_.filter(l=>l.id!==e),r=l=>Ee.find(u=>u.id===l.type)?.sound===!1,i=a.reduce((l,u,d)=>r(u)?l:d,-1),s=t===null?r(n)?a.length:i+1:a.findIndex(l=>l.id===t);_=[...a.slice(0,s<0?a.length:s),n,...a.slice(s<0?a.length:s)],an(_);for(const l of _){const u=document.getElementById(`tab-${l.id}`);u&&rn.insertBefore(u,Hn)}et?.render()}function Fw(e,t){_=Tg(_,e,t,Ee),an(_);const n=_.find(r=>r.id===e);if(!n)return;const a=document.getElementById(`tab-${e}`);a&&Nu(a,n),Pe.get(e)?.setAttribute("title",n.name),Za(),Ve===e&&Tu(n),ae.rename(e,n.name)}async function Cu(e,t){const n=_.find(u=>u.id===e),a=n?.name??e,r=Ee.find(u=>u.id===n?.type)?.sound===!1;if(!await Xe({title:`Remove ${a}?`,body:r?"Its tab goes, and what it plays stops. Its settings stay in this browser.":`Its channel, strip and mix settings go. ${a}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:t}))return;_=_.filter(u=>u.id!==e),an(_),cu.forget(e),ct.forget(e),Lt.drop(e);const s=Ie.playing().includes(e);Ie.drop(e),s&&Ie.out(e);const l=Pe.get(e);Pe.delete(e),l?.setAttribute("src","about:blank"),l?.remove(),document.getElementById(`tab-${e}`)?.remove(),ae.detach(e),Iw(e),ny(Ae(),e),Ve===e&&Ze(_[0]?.id??""),Za()}function Nu(e,t){const n=Ee.find(s=>s.id===t.type);if(n?.sound!==!1){e.textContent=t.name;return}const a=D("span",{class:"tab-dot","aria-hidden":"true"});n.identity&&(a.style.background=`var(--nc-ui-${n.identity})`);const r=D("span",{class:"tab-remove",role:"button",tabindex:"0","aria-label":`Remove ${t.name}`,title:`Remove ${t.name}`});r.textContent="×";const i=s=>{s.stopPropagation(),Cu(t.id,e)};r.addEventListener("click",i),r.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&i(s)}),e.replaceChildren(a,D("span",{},t.name),r)}const wi=D("div",{class:"mix"});wi.addEventListener("click",e=>{const n=e.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==Ve&&_.some(a=>a.id===n)&&Ze(n)});let et=null,Oa=0;const Ba=new Set;function Iw(e){Ba.add(e),delete Le.channels[e],delete Le.channelFx[e],Xa.delete(e),On()}let oo=!1;function On(){window.clearTimeout(Oa),!oo&&(Oa=window.setTimeout(()=>{Ld(Fu())},300))}function Fu(){const e={...Le.channels};for(const r of ae.list())e[r.id]=r.strip;for(const r of Ba)delete e[r];const t={};for(const r of["a","b"]){const i=en[r];i&&(t[r]=i.getState())}const n=ae.masterFx?.getState()??null,a={...Le.channelFx};for(const[r,i]of Xa)a[r]=i.getState();for(const r of Ba)delete a[r];return{v:1,channels:e,master:ae.masterPositionValue,returns:{a:{on:ae.returns.a.on,level:ae.returns.a.level},b:{on:ae.returns.b.on,level:ae.returns.b.level}},insert:{on:n?tb(n):Le.insert.on},fx:t,channelFx:a,masterFx:n??Le.masterFx}}ae.onChange(()=>{et?.render(),On()});for(const e of Object.values(en))e?.onChange(On);async function so(){Z.state!=="running"&&await Z.resume()}const gl=1500;async function Pw(){const e=performance.now()+gl;await Promise.race([so(),new Promise(t=>setTimeout(t,gl))]),await tt.whenSettled(Math.max(0,e-performance.now())),await Promise.race([to.idle(),new Promise(t=>setTimeout(t,Math.max(0,e-performance.now())))])}zn.addEventListener("click",()=>{so(),V.running()&&Ie.owner()===Xi?V.stop():V.running()?Ie.claimAll():(Ie.claimAll(),V.play()),nt()});function Iu(){const e=Number(tn.value);V.setTempo(e),eu(V.bpm(),ke())}St.addEventListener("change",()=>{St.value=Nt(St.value),tu(St.value,ke())});function zw(e,t,n){const a=URL.createObjectURL(new Blob([t],{type:n})),r=D("a",{href:a,download:e});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e4)}fu.addEventListener("click",async()=>{const e=Nt(St.value),t=_.map(i=>i.id),n=await Kt.collect(t),a=aw({name:e,bpm:V.bpm(),instances:_,mix:Fu(),presets:n});zw(iw(e),`${JSON.stringify(a,null,2)}
`,"application/json");const r=_.filter(i=>!n[i.id]).map(i=>i.name);gt(r.length?`Saved “${e}” (without ${r.join(", ")}: ${r.length===1?"it hasn't":"they haven't"} loaded yet)`:`Saved “${e}”`)});gu.addEventListener("click",()=>Nn.click());Nn.addEventListener("change",async()=>{const e=Nn.files?.[0];if(Nn.value="",!e)return;const t=rw(await e.text(),Ee.filter(r=>r.available!==!1).map(r=>r.id));if(!t.ok){gt(t.error);return}const n=t.scene;await Xe({title:`Load “${n.name}”?`,body:"The music stops and the Studio reloads with this Scene's instruments, their sounds and patterns, the mix and the tempo. Save the current Scene first to keep it.",confirmLabel:"Load"})&&Pu({name:n.name,bpm:n.tempo.bpm,instances:n.instances,mix:n.mix,presets:n.presets})});bu.addEventListener("click",async()=>{await Xe({title:"Start a new Scene?",body:"The music stops and the Studio reloads with one of each instrument, a fresh mix and 120 BPM. Each instrument keeps its own sound and pattern. Save the current Scene first to keep it.",confirmLabel:"New"})&&Pu({name:Qi,bpm:Ia,instances:In(Ee),mix:Pn()})});function Pu(e){V.running()&&V.stop(),oo=!0,window.clearTimeout(Oa);const t=e.instances.map(({id:n,name:a})=>{const[r,i]=n.split("#"),s=Ee.find(l=>l.id===r);return s?nn(s,i?Number(i):1,a):null}).filter(n=>n!==null);an(t),Ld(e.mix),eu(e.bpm,ke()),tu(e.name,ke()),Kt.stash({...e.presets??{}}),location.reload()}let bl=0;function gt(e){za.textContent=e,Da.textContent=e,window.clearTimeout(bl),bl=window.setTimeout(nt,4e3)}tn.addEventListener("change",Iu);tn.addEventListener("keydown",e=>{e.key==="Enter"&&Iu()});dt.addEventListener("click",()=>{so();const e=$e.state;e==="recording"?Dw():e==="arming"||e==="armed"?($e.cancel(),gt("Rec cancelled")):e==="idle"&&($e.arm(V.playing()),zu())});async function Dw(){const e=await $e.stop();e&&(yn&&URL.revokeObjectURL(yn.url),yn={url:URL.createObjectURL(e.blob),take:e},wn.href=yn.url,wn.download=e.name,wn.textContent=`Save take (${e.seconds.toFixed(1)} s)`,wn.hidden=!1)}function zu(){const e=$e.state;if(e!=="arming"&&e!=="armed")return;const t=V.clock.transport;if(!t.running||t.startTime===null){$e.schedule(null);return}const n=Math.round(tt.toContextTime(t.startTime)*Z.sampleRate);$e.schedule(n+Ja.latency("master"))}function Rw(){const e=$e.state,t=e==="arming"||e==="armed",n=e==="recording"||e==="stopping";dt.dataset.state=t?"armed":n?"recording":"idle",dt.setAttribute("aria-pressed",String(n)),dt.textContent=t?"Armed":n?"Stop rec":"Rec",dt.disabled=e==="stopping"||!$e.supported,nt()}$e.onChange(Rw);let Bn=null;function Ow(){const e=V.clock.transport;!e.running||e.startTime===null||(Bn=Math.round(tt.toContextTime(e.startTime)*Z.sampleRate)+Ja.latency("master"))}function Du(){return!V.clock.transport.running||Bn===null?null:{origin:Bn,barFrames:240/V.bpm()*Z.sampleRate}}function Ru(e){const t=no[e];return!t||t.key==="since"&&Bn===null?null:t.choice(Bn??0)}function tr(){const e=!qe.hidden;if(Ct.setAttribute("aria-expanded",String(e)),Ct.dataset.keeping=Me.keeping?"on":"off",!e)return;Dn.checked!==Me.keeping&&Dn.set(Me.keeping);const t=Me.status,n=md(t)/(t.sampleRate||Z.sampleRate);hu.textContent=Me.keeping?`${si(n)} of sound held`:"Keeping is off";const a=Du();Vn.forEach((r,i)=>{const s=Ru(i),l=s?Me.plan(s,a):null;r.disabled=!l;const u=no[i];u?.key==="since"&&(r.textContent=l?`Keep since Play (${si((l.to-l.from)/(t.sampleRate||Z.sampleRate))})`:u.label)})}Me.onChange(tr);function Ou(){qe.hidden&&(qe.hidden=!1,Me.refresh(),tr(),(Vn.find(e=>!e.disabled)??Dn.el).focus())}function Un(e=!1){qe.hidden||(qe.hidden=!0,tr(),e&&Ct.focus())}Ct.addEventListener("click",()=>{qe.hidden?Ou():Un()});document.addEventListener("pointerdown",e=>{!qe.hidden&&!mu.contains(e.target)&&Un()});qe.addEventListener("keydown",e=>{if(e.key==="Escape"){e.preventDefault(),Un(!0);return}if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;e.preventDefault();const t=[...Vn.filter(r=>!r.disabled),Dn.el],n=t.indexOf(document.activeElement);t[(n+(e.key==="ArrowDown"?1:t.length-1))%t.length]?.focus()});Vn.forEach((e,t)=>e.addEventListener("click",()=>{const n=Ru(t);n&&Bw(n)}));async function Bw(e){Un(!0);const t=await Me.keep(e,{grid:Du(),bpm:V.bpm()});if(!t){gt("Nothing held to keep");return}pu=t;const n=URL.createObjectURL(t.blob);D("a",{href:n,download:t.name}).click(),window.setTimeout(()=>URL.revokeObjectURL(n),6e4),gt(`Kept ${si(t.seconds)} as a WAV`)}document.addEventListener("keydown",e=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey||e.key!=="k"&&e.key!=="K")return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable)||Ct.disabled||(e.preventDefault(),qe.hidden?Ou():Un(!0))});document.addEventListener("keydown",e=>{if(e.code!=="Space"||e.repeat)return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable)||(e.preventDefault(),zn.click())});rn.addEventListener("keydown",e=>{if(e.target===Yt)return;const t=_.map(r=>r.id),n=t.indexOf(Ve),a=e.key==="ArrowRight"?t[(n+1)%t.length]:e.key==="ArrowLeft"?t[(n-1+t.length)%t.length]:null;a&&(e.preventDefault(),Ze(a),document.getElementById(`tab-${a}`)?.focus())});function nt(){const e=V.running()&&Ie.owner()===Xi;zn.textContent=e?"Stop":"Play",zn.setAttribute("aria-pressed",String(e)),document.activeElement!==tn&&(tn.value=String(Math.round(V.bpm()*10)/10));const t=V.position();Pa.value=t?`${t.bar}.${t.beat}`:"—";const n=V.peers().length;za.textContent=Z.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",Da.textContent=Z.state==="running"?"":"Audio off",($e.state==="arming"||$e.state==="armed")&&(za.textContent="Rec armed: waiting for sound",Da.textContent="Rec armed"),ao.classList.toggle("off",Z.state!=="running")}V.clock.onChange(()=>{V.clock.transport.running&&(du=!0),Ow(),tr(),V.running()||Ie.clear(),zu(),nt()});Ie.onChange(nt);Ie.onLastOut(()=>{V.running()&&V.stop(),nt()});V.clock.onChange(()=>et?.render());V.peer.onPeers(nt);Z.addEventListener("statechange",nt);const jw=.25;let yl=performance.now();function Bu(e){const t=Math.min(.1,(e-yl)/1e3);yl=e,et?.frame(t);const n=V.position(),a=n?`${n.bar}.${n.beat}`:"—";Pa.value!==a&&(Pa.value=a);const r=V.beatPhase(),i=r!==null&&r<jw;yi.hasAttribute("data-on")!==i&&yi.toggleAttribute("data-on",i),requestAnimationFrame(Bu)}async function _w(){const e=document.getElementById("app");if(!e)throw new Error("Missing #app");e.append(yu,Ra,vu,wi,D("main",{class:"instruments"},rn,D("div",{class:"bay"},Rn,xu)),uu.el),et=Fy(wi,ae,{order:()=>_.map(t=>t.id),catalogue:Vi.filter(t=>t.sound!==!1),bpm:()=>V.bpm(),onAdd:Lu,onRemove:(t,n)=>void Cu(t,n),onReorder:(t,n)=>Nw(t,n),onRename:(t,n)=>Fw(t,n),...Cn?{plugins:Cn}:{}}),Z.state==="running"&&await Z.suspend(),await Z.audioWorklet.addModule(hw),iu(),$e.attach(),Me.attach(),await V.start();for(const t of[en.a,en.b,ae.masterFx])t&&Vl(t,V.clock,{mapper:tt});for(const t of _)ku(t);Ze(Ve),nt(),requestAnimationFrame(Bu),window.setInterval(()=>ae.parkIdleReturns(),jy),document.documentElement.dataset.studioReady="",Vw(),Uw(),Cn&&_0({ctx:Z,running:()=>B0([...eo].map(t=>t.getChain())),onFrozen:qw})}async function qw(e){Zi.add(e.map(a=>a.id)),window.clearTimeout(Oa),oo=!0;const t=e.map(a=>a.name).join(", ");document.documentElement.dataset.pluginsFrozen=e.map(a=>a.id).join(" "),gt(`${t} froze the audio`),await Xe({title:R.frozenTitle,body:R.frozenBody(t),confirmLabel:R.frozenOpen,cancelLabel:R.frozenStay})&&window.open(location.href,"_blank")}function Vw(){const e=new Set(Kt.pending());if(!e.size)return;const t=[],n=i=>_.find(s=>s.id===i)?.name??i,a=()=>{window.clearTimeout(r);const i=[...t,...Kt.dropPending()].map(n);gt(i.length?`Scene loaded; ${i.join(", ")} kept ${i.length===1?"its":"their"} own sound`:"Scene loaded")};Kt.onApplied((i,s)=>{e.delete(i)&&(s||t.push(i),e.size||a())});const r=window.setTimeout(a,Rg)}window.__studio={ctx:Z,mixer:ae,grab:Ja,recorder:$e,get lastTake(){return yn?.take??null},keeper:Me,get lastKeep(){return pu},limiterDelay:ou,mapper:tt,transport:V,frames:Pe,show:Ze,get instances(){return _},fx:en,plugins:Cn,frozen:Zi,channelCores:Xa,get mix(){return et},notes:{bus:Lt,dev:(e,t,n={})=>{const a=z0(Lt.source(e,e),V.clock,{settings:t});for(const[r,i]of Object.entries(n))a.source.setTarget(r,{role:i.role,on:i.on??!0,...i.octave===void 0?{}:{octave:i.octave}});return a}}};_w();function lo(e){mt.dataset.picker=e,mt.setAttribute("aria-pressed",String(e==="on"||e==="connecting"||e==="away")),mt.dataset.ncHelp=ee[`picker:${e}`]}lo("off");async function Hw(){if(["127.0.0.1","localhost","[::1]"].includes(location.hostname))return"granted";try{return(await navigator.permissions.query({name:"loopback-network"})).state}catch{return"unknown"}}async function Uw(){let e=Xd(ke());const t=new URLSearchParams(location.search).get("picker");if(t!==null){const a=t?Ji(t):e.address;a&&(e={on:!0,address:a},mi(ke(),e))}if(!e.on)return;const n=await Hw();n==="granted"||n==="unknown"?ct.start(e.address):lo(n==="denied"?"blocked":"ask")}mt.addEventListener("click",()=>void Gw());async function Gw(){const e=Xd(ke()),t=mt.dataset.picker;if(t==="ask"||t==="blocked"){ct.start(e.address);return}if(ct.status!=="off"){if(!await Xe({title:"Disconnect the Sample Picker?",body:"Its Send to NYX won't reach this Studio until you connect it again.",confirmLabel:"Disconnect",returnFocus:mt}))return;mi(ke(),{...e,on:!1}),ct.stop();return}await Xe({title:"Connect the Sample Picker?",body:`The Studio talks to the Sample Picker on this computer (${e.address}), so its Send to NYX loads the pads of your NYX here. Chrome may ask to let this site reach this computer: allow it.`,confirmLabel:"Connect",returnFocus:mt})&&(mi(ke(),{...e,on:!0}),ct.start(e.address))}
