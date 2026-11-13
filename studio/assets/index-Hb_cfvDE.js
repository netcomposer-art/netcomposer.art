(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const un=1e-9;function ef(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class Ri{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return ef(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let r=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+un&&(r=s.bpm);const o=[{beat:t.beat,time:t.time,bpm:this.clamp(r)}];for(const s of a){if(s.beat<=t.beat+un)continue;const l=this.clamp(s.bpm);l!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+un){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-un;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,r=.25){const o=this.bpmAt(n);if(!(a>0)||!(r>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/r));this.setTempoAt(o,n);for(let l=1;l<=s;l++)this.setTempoAt(o+(t-o)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new Ri({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+un)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+un)return n[a];return n[0]}}const tf=Object.freeze({beatsPerBar:4,beatUnit:4}),yn=1e-9;function nf(e){return Math.floor(e+yn)}function cd(e,t,n=!1){if(!(t>0))return e;const r=Math.ceil(e/t-yn)*t;return n&&r<=e+yn?r+t:r}class af{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new Ri({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??tf}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-yn&&(this.stopTime===null||t<this.stopTime-yn)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-yn?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=nf(t/n),r=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:r,barPhase:r/n}}nextBar(t,n=!1){return cd(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const dd="nc-clock/snapshot",ud=1;function rf(e,t="local"){return{format:dd,version:ud,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function of(e,t){const n=sf(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const pt=e=>typeof e=="number"&&Number.isFinite(e),Ws=e=>e===null||pt(e);function sf(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==dd&&n("format"),(!pt(t.version)||Math.floor(t.version)!==ud)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!pt(t.anchor.beat)||!pt(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&pt(a.beat)&&pt(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!pt(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!pt(t.meter.beatUnit))&&n("meter"),(!Ws(t.startTime)||!Ws(t.stopTime)||!pt(t.stoppedBeat))&&n("transport times"),t}class lf{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new af(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){of(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return rf(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const cf="nc-sync/1",df=1,uf="nc-sync",pf="nc-sync-leader",hf=0,pd=.5,hd=.75;function ff(e){return typeof e=="number"&&Number.isFinite(e)&&e>=pd&&e<=hd?e:null}const no=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),jn=e=>typeof e=="number"&&Number.isFinite(e),Ia=e=>typeof e=="string"&&e.length>0;function mf(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==df||!Ia(t.type)||!Ia(t.from)||!jn(t.term)||!jn(t.seq)||!jn(t.sentAt))return null;switch(t.type){case"hello":return Ia(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return jn(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&jn(t.slot)?t:null;case"ping":case"pong":return Ia(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function gf(e,t,n,a,r){return{proto:cf,from:t,term:n,seq:a,sentAt:r,...e}}function Be(){return(performance.timeOrigin+performance.now())/1e3}const ao=.003,bf=3,ro=.002+1e-6,yf=.01,Ks=500;class vf{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?yf:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=ao&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const r=n-(this.timeOrigin+a)/1e3,o=this.median(),s=r-o,l=Math.abs(r-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!d&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,o,d))):(this.pendingStep=s,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const r=this.heldBase()!==null,o=this.ctx.currentTime,s=o<=this.revertUntil;let l;if(a&&s){const d=this.offsets,u=this.preStep;d.length=0;for(let c=0;c<u.length;c++)d.push(u[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:o,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!s){const c=this.offsets,p=this.preStep;p.length=0;for(let f=0;f<c.length;f++)p.push(c[f]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?o+this.stepRevert:-1/0}const d=this.offsets,u=t-n;for(let c=0;c<d.length;c++)d[c]+=u;this.stepCount++,l={stepSeconds:t-n,confirmedAt:o,reanchors:this.stepCount,revert:!1}}if(!r)for(const d of[...this.stepListeners])d(l);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let o=0;o<a;o++){const s=t[o];let l=o-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const r=a>>1;return a%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const r=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(r&&Number.isFinite(r.contextTime)&&Number.isFinite(r.performanceTime)&&r.contextTime>=ao&&r.performanceTime>0)if(this.waitSince=null,r.contextTime===this.lastStampC&&r.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Ks)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=r.contextTime,this.lastStampP=r.performanceTime,this.stampSince=this.perfNow(),n=r.contextTime-(this.timeOrigin+r.performanceTime)/1e3,a=!0;else if(!r||!(r.contextTime>=ao)&&!(r.contextTime>0&&!(r.performanceTime>0))){if(r){const o=this.perfNow();if(this.waitSince===null&&(this.waitSince=o),o-this.waitSince<Ks)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(bf,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let r=-1,o=0;for(let l=0;l<n;l++){let d=0;for(let u=0;u<n;u++)Math.abs(t[u]-t[l])<=ro&&d++;d>o&&(r=l,o=d)}if(o<a)return;const s=t[r];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>ro&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-this.estimate())<=ro}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const r=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(r,2)};setTimeout(r,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(r)&&r>0?r:null}}const wf="let t=null;onmessage=e=>{clearInterval(t);t=null;if(e.data>0)t=setInterval(()=>postMessage(0),e.data)}";function xf(){const e=globalThis;return typeof e.Worker=="function"&&typeof e.Blob=="function"&&typeof e.document=="object"&&typeof e.URL?.createObjectURL=="function"}function fd(e,t={}){const n=t.intervalMs??20,a=t.now??(typeof performance<"u"?()=>performance.now():()=>Date.now());let r=null,o=null,s=null,l=-1/0,d=!1;const u=()=>{if(!d)return;const c=a();c-l<n/2||(l=c,e())};if(t.worker===!0||t.worker!==!1&&xf())try{o=URL.createObjectURL(new Blob([wf],{type:"text/javascript"})),r=new Worker(o),r.onmessage=u}catch{r=null,o&&URL.revokeObjectURL(o),o=null}return{get running(){return d},get kind(){return r?"worker+timer":"timer"},start(){d||(d=!0,s=setInterval(u,n),r?.postMessage(n))},stop(){d=!1,s&&clearInterval(s),s=null,r?.postMessage(0)},dispose(){this.stop(),r?.terminate(),r=null,o&&URL.revokeObjectURL(o),o=null}}}class kf{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...no,...t.capabilities},this.channelOption=t.channel??uf,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const r=this.o.now(),o=()=>{n===this.startWaits&&t(r)};return a.then(o,o),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const r=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(r),0)}else{const r=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?r:Math.max(t+this.o.gatedStartLeadSeconds,r),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[r,o]=this.tempoRange();t=Math.min(o,Math.max(r,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const d=s.beatAt(l+this.o.minLeadSeconds),u=Math.max(n??cd(d,1),d);a&&a>0?(s.tempo.rampTempo(t,u,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,u),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(hd,Math.max(pd,t)):hf;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=ff(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=mf(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...no,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...no},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(r=>{this.leader&&this.decideStart(r)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(pf,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,l)=>[o?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(r===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,r=o.id)}this.setLeader(r===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==r[0]?a[0]<r[0]:a[1]!==r[1]?a[1]<r[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const r=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>r&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(gf(t,this.id,this.term,++this.seq,this.o.now()))}}const $f="modulepreload",Sf=function(e){return"/studio/"+e},Ys={},Ef=function(t,n,a){let r=Promise.resolve();if(n&&n.length>0){let s=function(u){return Promise.all(u.map(c=>Promise.resolve(c).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),d=l?.nonce||l?.getAttribute("nonce");r=s(n.map(u=>{if(u=Sf(u),u in Ys)return;Ys[u]=!0;const c=u.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":$f,c||(f.as="script"),f.crossOrigin="",f.href=u,d&&f.setAttribute("nonce",d),document.head.appendChild(f),c)return new Promise((y,m)=>{f.addEventListener("load",y),f.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return t().catch(o)})};var Af=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Vo=[.25,.5,.75,1,1.5,2],Mf=4.9,oe={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0},hallTone:{exp2:[1500,3.7],div:100,round:!0}},Qe={fmt:"wet"},fe={fmt:"pct"},pn={fmt:"db"},Fa={fmt:"signedPct"},qn={fmt:"num",suffix:" ms"},J={div:100};function P(e,t,n,a,r,o,s,l){var d={key:e,label:t,min:n,max:a,default:r,step:1,k:o,unit:null,format:s};if(l)for(var u in l)d[u]=l[u];return d}function kt(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var Zn=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[P("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:oe.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[P("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:oe.hpHz,astrid:!0,zero:"off"}),P("q","Resonance",0,100,0,2,{fmt:"q",law:oe.hpQ},{dsp:{law:oe.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[P("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:oe.bpHz,astrid:!0},{dsp:{law:oe.bpHz}}),P("q","Q",0,100,0,2,{fmt:"q",law:oe.bpQ},{dsp:{law:oe.bpQ}}),P("mix","Mix",0,100,100,3,Qe,{dsp:J,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[P("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:kt(Af),overriddenBy:"beats_free",tempoSynced:!0}),P("feedback","Feedback",0,90,35,2,fe,{dsp:J,unit:"%"}),P("mix","Wet/dry",0,100,0,3,Qe,{dsp:J,unit:"%",astridKey:"wet"}),P("tone","Tone",0,100,100,4,{fmt:"hz",law:oe.delayTone,offAt:100},{dsp:{div:99},more:!0}),P("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),P("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:kt([[0,"Insert"],[1,"Send"]]),more:!0}),P("send","Send",0,100,100,7,fe,{dsp:J,unit:"%",more:!0}),P("mod_send","Accent → send",-100,100,0,8,Fa,{dsp:J,unit:"%",more:!0}),P("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[P("predelay","Pre-delay",0,200,0,1,qn,{dsp:{div:1e3},unit:"ms"}),P("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:J,unit:"%"}),P("decay","Decay",0,100,50,3,fe,{dsp:J,unit:"%"}),P("damping","Damping",0,100,0,4,fe,{dsp:J,unit:"%"}),P("mix","Mix",0,100,0,5,Qe,{dsp:J,unit:"%"})]},{type:"hall",label:"Hall",own:!0,dials:[P("size","Size",0,100,60,1,fe,{dsp:J,unit:"%"}),P("decay","Decay",5,120,35,2,{fmt:"fixed",div:10,add:0,digits:1,suffix:" s"},{dsp:{div:10},unit:"s"}),P("predelay","Pre-delay",0,250,20,3,qn,{dsp:{div:1e3},unit:"ms"}),P("tone","Tone",0,100,60,4,{fmt:"hz",law:oe.hallTone,astrid:!0},{dsp:{law:oe.hallTone}}),P("mix","Mix",0,100,25,5,Qe,{dsp:J,unit:"%"}),P("low_cut","Low cut",0,1e3,120,6,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),P("width","Width",0,100,100,7,fe,{dsp:J,unit:"%",more:!0}),P("motion","Motion",0,100,30,8,fe,{dsp:J,unit:"%",more:!0})]},{type:"ensemble",label:"Ensemble",own:!0,dials:[P("rate","Rate",0,100,35,1,{fmt:"rate",law:oe.rate},{dsp:{law:oe.rate}}),P("depth","Depth",0,100,60,2,fe,{dsp:J,unit:"%"}),P("width","Width",0,100,80,3,fe,{dsp:J,unit:"%"}),P("mix","Mix",0,100,50,4,Qe,{dsp:J,unit:"%"}),P("voices","Voices",3,6,3,5,{fmt:"option"},{step:null,options:kt([[3,"3"],[6,"6"]]),more:!0}),P("vibrato","Vibrato",0,100,20,6,fe,{dsp:J,unit:"%",more:!0})]},{type:"gate",label:"Gate",own:!0,tempoSynced:!0,pattern:!0,dials:[P("rate","Rate",4,16,4,1,{fmt:"option"},{step:null,options:kt([[4,"1/4"],[8,"1/8"],[16,"1/16"],[12,"1/8T"]])}),P("swing","Swing",0,100,0,3,fe,{dsp:J,unit:"%"}),P("depth","Depth",0,100,90,4,fe,{dsp:J,unit:"%"}),P("mix","Mix",0,100,100,5,Qe,{dsp:J,unit:"%"}),P("steps","Steps",8,16,8,2,{fmt:"option"},{step:null,options:kt([[8,"8"],[16,"16"]]),more:!0}),P("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:kt([[0,"Volume"],[1,"Filter"]]),more:!0}),P("smooth","Smooth",1,20,4,7,qn,{unit:"ms",more:!0}),P("spread","Spread",0,100,0,8,fe,{dsp:J,unit:"%",more:!0}),P("res","Resonance",0,100,20,9,fe,{dsp:J,unit:"%",more:!0})]},{type:"flanger",label:"Flanger",dials:[P("rate","Rate",0,100,26,1,{fmt:"rate",law:oe.rate},{dsp:{law:oe.rate}}),P("depth","Depth",0,100,70,2,fe,{dsp:J,unit:"%"}),P("feedback","Feedback",-90,90,50,3,Fa,{dsp:J,unit:"%"}),P("mix","Mix",0,100,50,4,Qe,{dsp:J,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[P("rate","Rate",0,100,52,1,{fmt:"rate",law:oe.rate},{dsp:{law:oe.rate}}),P("depth","Depth",0,100,50,2,fe,{dsp:J,unit:"%"}),P("spread","Spread",0,100,70,3,fe,{dsp:J,unit:"%"}),P("mix","Mix",0,100,40,4,Qe,{dsp:J,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[P("rate","Rate",0,100,39,1,{fmt:"rate",law:oe.rate},{dsp:{law:oe.rate}}),P("depth","Depth",0,100,70,2,fe,{dsp:J,unit:"%"}),P("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:kt([[4,"4"],[6,"6"],[8,"8"]])}),P("feedback","Feedback",0,90,30,4,fe,{dsp:J,unit:"%"}),P("mix","Mix",0,100,50,5,Qe,{dsp:J,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[P("low_db","Low",-18,18,0,1,pn,{unit:"dB"}),P("mid_db","Mid",-18,18,0,2,pn,{unit:"dB"}),P("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:oe.midHz,astrid:!0},{dsp:{law:oe.midHz}}),P("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:oe.eqQ},{dsp:{law:oe.eqQ}}),P("high_db","High",-18,18,0,4,pn,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[P("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),P("output_db","Output",-12,12,0,2,pn,{unit:"dB"}),P("mix","Mix",0,100,100,3,Qe,{dsp:J,unit:"%"}),P("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:kt([[0,"Smooth"],[1,"Acid"]]),more:!0}),P("tone","Tone",0,100,100,5,{fmt:"hz",law:oe.driveTone,offAt:100},{dsp:{div:99},more:!0}),P("mod_drive","Accent → drive",-100,100,0,6,Fa,{dsp:J,unit:"%",more:!0}),P("mod_tone","Accent → tone",-100,100,0,7,Fa,{dsp:J,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[P("threshold_db","Threshold",-60,0,0,1,pn,{unit:"dB"}),P("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:oe.ratio},{dsp:{law:oe.ratio}}),P("attack_ms","Attack",1,100,10,3,qn,{unit:"ms"}),P("release_ms","Release",10,1e3,150,4,qn,{unit:"ms"}),P("makeup_db","Makeup",0,24,0,5,pn,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[P("width","Width",0,200,100,1,fe,{dsp:J,unit:"%"}),P("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:J})]}],Tf=Zn.map(function(e){return e.type}),Lf=Zn.filter(function(e){return!e.hidden}).map(function(e){return e.type}),Cf={reverb:"plate"},En={},md=[],ea=[];function Nf(e){En[e.type]||md.push(e.type),En[e.type]=e;for(var t=0;t<ea.length;t++)try{ea[t](e.type)}catch(n){typeof console<"u"&&console.error(n)}}function If(){return md.map(function(e){return En[e]})}function Ff(e){return ea.push(e),function(){var t=ea.indexOf(e);t>=0&&ea.splice(t,1)}}function gd(e){return typeof e=="string"&&/^plugin:[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(e)&&e.length<=71}function Di(e){var t=Cf[e]||e;return Tf.indexOf(t)>=0||typeof t=="string"&&En[t]?t:null}function le(e){for(var t=Di(e),n=0;n<Zn.length;n++)if(Zn[n].type===t)return Zn[n];return t&&En[t]?En[t]:null}function Pf(e,t){var n=le(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function mn(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function or(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=mn(n.law,t);return a===null?0:a}function Xs(e,t){return Math.min(Mf,e*60/(t>0?t:120))}var Js=function(e){return e>0?"+":e<0?"−":""};function Rf(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function bd(e,t,n){var a=e.format,r;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:Js(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return Js(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(r=mn(a.law,t),r===null?a.zero||"open":a.astrid?Rf(r):r+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+mn(a.law,t).toFixed(1);case"ratio":return mn(a.law,t).toFixed(1)+":1";case"rate":return r=mn(a.law,t),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var o=0;o<e.options.length;o++)if(e.options[o].value===t)return e.options[o].label;return String(t);case"tempoMs":return Math.round(Xs(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(Xs(t,n)*1e3)+" ms"}return String(t)}var Df=1,Pr=["drive","delay","plate"];function zf(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,r){return bd(e,a,r)},t}var vn=Pr.map(function(e){var t=le(e),n={type:e,label:t.label,dials:t.dials.map(zf)};return t.tempoSynced&&(n.tempoSynced=!0),n}),Of={reverb:"plate"};function ir(e){var t=Of[e]||e;return Pr.indexOf(t)>=0?t:null}function Rr(e){for(var t=ir(e),n=0;n<vn.length;n++)if(vn[n].type===t)return vn[n];return null}function yd(e,t){var n=Rr(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function An(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function gt(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,r=1;r<e.options.length;r++)Math.abs(e.options[r].value-t)<Math.abs(a-t)&&(a=e.options[r].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*o)/o))+0}function Bf(){return{v:Df,chain:vn.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function _f(e){return Vo.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},Vo[0])}function oo(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function jf(e){for(var t=Array.isArray(e)?e:oo(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=Bf(),r={},o=[],s=0;s<t.length;s++){var l=t[s];if(oo(l)){var d=ir(l.type);if(!d){typeof l.type=="string"&&o.push(l.type);continue}if(r[d]){o.push(d);continue}r[d]=!0;var u=a.chain[Pr.indexOf(d)],c=oo(l.dials)?l.dials:{};d==="delay"&&c.mix===void 0&&c.wet!==void 0&&(c=Object.assign({},c,{mix:c.wet})),u.bypass=n?l.bypass===!0:l.bypass!==!1,Rr(d).dials.forEach(function(p){u.dials[p.key]=gt(p,c[p.key])}),qf(d,u.dials,c)}}return{state:a,dropped:o}}function qf(e,t,n){for(var a=Rr(e),r=0;r<a.dials.length;r++){var o=a.dials[r];o.stepWhen&&(t[o.key]=gt(o,n&&typeof n[o.key]=="number"?n[o.key]:t[o.key],An(o,t)))}}function sr(e){return jf(e).state}function Vf(e){return JSON.parse(JSON.stringify(e))}var Hf=24,Ho={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Uo(e,t,n){if(t==="bypass")return n?0:1;var a=yd(e,t)||Uf(e,t);return a?or(a,n):0}function Uf(e,t){var n=le(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var Gf={};vn.forEach(function(e){e.dials.forEach(function(t){Gf[e.type+"."+t.key]=t.format})});function io(e,t){var n=new Float64Array(Hf),a=sr(e);return a.chain.forEach(function(r){var o=Ho[r.type];n[o.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[o[s]]=Uo(r.type,s,r.dials[s])})}),n}var Wf="__ncFxLoop",Kf=/^(?:return|typeof|instanceof|in|of|new|delete|void|throw|case|do|else|yield|await)$/,Qs=/[A-Za-z_$\u0080-\uffff]/,so=/[A-Za-z0-9_$\u0080-\uffff]/;function Yf(e){var t=[],n=0,a=e.length,r=[],o,s;function l(){var f=t.length?t[t.length-1]:null;return f?f.t==="name"?Kf.test(f.v):f.t==="num"||f.t==="str"||f.t==="tpl"||f.t==="re"?!1:f.v!==")"&&f.v!=="]":!0}function d(){for(var f=n-1;n<a;){if(o=e[n],o==="\\"){n+=2;continue}if(o==="`"){n++,t.push({t:"tpl",v:"",s:f,e:n});return}if(o==="$"&&e[n+1]==="{"){n+=2,r.push("tpl"),t.push({t:"tpl",v:"",s:f,e:n});return}n++}t.push({t:"tpl",v:"",s:f,e:a})}for(;n<a;){if(o=e[n],o===" "||o==="	"||o===`
`||o==="\r"||o==="\f"||o==="\v"||o===" "||o==="\uFEFF"||o==="\u2028"||o==="\u2029"){n++;continue}if(o==="/"&&e[n+1]==="/"){for(;n<a&&e[n]!==`
`&&e[n]!=="\r";)n++;continue}if(o==="/"&&e[n+1]==="*"){var u=e.indexOf("*/",n+2);n=u<0?a:u+2;continue}if(s=n,o==='"'||o==="'"){for(n++;n<a&&e[n]!==o&&e[n]!==`
`;)n+=e[n]==="\\"?2:1;n++,t.push({t:"str",v:"",s,e:n});continue}if(o==="`"){n++,d();continue}if(o==="/"&&l()){n++;for(var c=!1;n<a;){if(o=e[n],o==="\\"){n+=2;continue}if(o===`
`)break;if(c)o==="]"&&(c=!1);else if(o==="[")c=!0;else if(o==="/"){n++;break}n++}for(;n<a&&so.test(e[n]);)n++;t.push({t:"re",v:"",s,e:n});continue}if(Qs.test(o)||o==="\\"){for(n++;n<a&&(so.test(e[n])||e[n]==="\\");)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(o==="#"&&n+1<a&&Qs.test(e[n+1])){for(n+=2;n<a&&so.test(e[n]);)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(o>="0"&&o<="9"||o==="."&&e[n+1]>="0"&&e[n+1]<="9"){for(n++;n<a&&/[0-9A-Za-z_.]/.test(e[n]);)(e[n]==="e"||e[n]==="E")&&(e[n+1]==="+"||e[n+1]==="-")&&!/^0[xX]/.test(e.slice(s,n))&&n++,n++;t.push({t:"num",v:"",s,e:n});continue}if(o==="{")r.push("{");else if(o==="}"){var p=r.pop();if(p==="tpl"){n++,d();continue}}if(o==="?"&&e[n+1]==="."&&!(e[n+2]>="0"&&e[n+2]<="9")){n+=2,t.push({t:"p",v:"?.",s,e:n});continue}if(o==="."&&e[n+1]==="."&&e[n+2]==="."){n+=3,t.push({t:"p",v:"...",s,e:n});continue}n++,t.push({t:"p",v:o,s,e:n})}return t}function Xf(e,t){for(var n=0,a=t;a<e.length;a++){var r=e[a].t==="p"?e[a].v:"";if(r==="("||r==="["||r==="{")n++;else if((r===")"||r==="]"||r==="}")&&(n--,n===0))return r===")"?a:-1}return-1}function Jf(e){for(var t=String(e),n=Yf(t),a=[],r=Wf+"()",o=0;o<n.length;o++){var s=n[o];if(!(s.t!=="name"||s.v!=="while"&&s.v!=="for")){var l=o>0?n[o-1]:null;if(!(l&&l.t==="p"&&(l.v==="."||l.v==="?."))){var d=o+1;if(!(s.v==="for"&&n[d]&&n[d].t==="name"&&n[d].v==="await")&&!(!n[d]||n[d].t!=="p"||n[d].v!=="(")){var u=Xf(n,d);if(!(u<0)){if(s.v==="while"){if(u===d+1)continue;a.push([n[d].e,r+" && ("],[n[u].s,")"]);continue}for(var c=[],p=0,f=d+1;f<u;f++){var y=n[f].t==="p"?n[f].v:"";y==="("||y==="["||y==="{"?p++:y===")"||y==="]"||y==="}"?p--:y===";"&&p===0&&c.push(f)}c.length===2&&(c[1]===c[0]+1?a.push([n[c[0]].e," "+r]):a.push([n[c[0]].e," "+r+" && ("],[n[c[1]].s,")"]))}}}}}if(!a.length)return t;a.sort(function(v,k){return v[0]-k[0]});for(var m="",w=0,h=0;h<a.length;h++)m+=t.slice(w,a[h][0])+a[h][1],w=a[h][0];return m+t.slice(w)}var lo=1,Zs=15,vd=/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/,Qf=/^[a-z][a-z0-9_]{0,31}$/,wd=/^\d+\.\d+\.\d+$/,xd=/^[A-Za-z0-9.+-]+(?: (?:AND|OR|WITH) [A-Za-z0-9.+-]+)*$/,Zf=/^[A-Za-z0-9_-][A-Za-z0-9._-]{0,63}\.js$/,el=["$schema","ncPlugin","id","name","version","author","licence","description","website","keywords","dsp","params"],tl=["id","label","type","defaultValue","minValue","maxValue","discreteStep","exponent","choices","units","more"],lr={1:"It failed to start.",2:"It crashed while playing.",3:"It made bad numbers (NaN, infinity or runaway level).",4:"It crashed when a dial moved.",5:"Its code is not loaded.",6:"It got stuck in a loop, so it was stopped."};function ta(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function hn(e){return typeof e=="number"&&isFinite(e)}function Ut(e,t){return typeof e=="string"&&e.trim().length>0&&e.length<=t}function Dr(e){var t=[],n=e,a=function(l,d){t.push(l+": "+d)};if(!ta(n))return{ok:!1,errors:["manifest: must be a JSON object"],manifest:null};Object.keys(n).forEach(function(l){el.indexOf(l)<0&&a(l,"unknown field (allowed: "+el.slice(1).join(", ")+")")}),n.ncPlugin!==lo&&a("ncPlugin","must be "+lo),(typeof n.id!="string"||!vd.test(n.id)||n.id.length>64)&&a("id",'lowercase letters and digits, with dots or dashes between, up to 64 (e.g. "yourname.tremolo")'),Ut(n.name,40)||a("name","a name of 1 to 40 characters"),(typeof n.version!="string"||!wd.test(n.version))&&a("version",'x.y.z, e.g. "1.0.0"'),Ut(n.author,80)||a("author","who made it, 1 to 80 characters"),(typeof n.licence!="string"||!xd.test(n.licence)||n.licence.length>64)&&a("licence",'an SPDX licence id, e.g. "MIT"'),n.description!==void 0&&!(typeof n.description=="string"&&n.description.length<=200)&&a("description","up to 200 characters"),n.website!==void 0&&!(typeof n.website=="string"&&/^https:\/\/\S+$/.test(n.website)&&n.website.length<=2048)&&a("website","an https:// address"),n.keywords!==void 0&&!(Array.isArray(n.keywords)&&n.keywords.length<=8&&n.keywords.every(function(l){return Ut(l,24)}))&&a("keywords","up to 8 short strings"),(typeof n.dsp!="string"||!Zf.test(n.dsp))&&a("dsp",`the DSP file's name, in the same folder as plugin.json, ending in .js (e.g. "tremolo.dsp.js")`);var r=[];if(!Array.isArray(n.params))a("params","a list of params (may be empty)");else if(n.params.length>Zs)a("params","at most "+Zs);else{var o={};n.params.forEach(function(l,d){var u="params["+d+"]";if(!ta(l)){a(u,"must be an object");return}Object.keys(l).forEach(function(f){tl.indexOf(f)<0&&a(u+"."+f,"unknown field (allowed: "+tl.join(", ")+")")}),typeof l.id!="string"||!Qf.test(l.id)||l.id==="bypass"?a(u+".id",'lowercase, starting with a letter: letters, digits, _ (not "bypass")'):o[l.id]?a(u+".id",'"'+l.id+'" is used twice'):o[l.id]=!0,Ut(l.label,24)||a(u+".label","the dial's name, 1 to 24 characters");var c=l.type===void 0?"float":l.type;if(["float","int","boolean","choice"].indexOf(c)<0){a(u+".type","float, int, boolean or choice");return}var p={id:l.id,label:l.label,type:c};if(c==="choice"){if(!Array.isArray(l.choices)||l.choices.length<2||l.choices.length>16||!l.choices.every(function(f){return Ut(f,24)})){a(u+".choices","2 to 16 names");return}p.choices=l.choices.slice(),p.minValue=0,p.maxValue=l.choices.length-1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==p.maxValue)&&a(u,"a choice's values are 0 to choices.length - 1: leave out minValue and maxValue")}else if(c==="boolean")p.minValue=0,p.maxValue=1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==1)&&a(u,"a boolean is 0 or 1: leave out minValue and maxValue");else{if(!hn(l.minValue)||!hn(l.maxValue)||!(l.minValue<l.maxValue)){a(u,"minValue and maxValue: numbers, minValue < maxValue");return}p.minValue=l.minValue,p.maxValue=l.maxValue,l.discreteStep!==void 0&&!(hn(l.discreteStep)&&l.discreteStep>0&&l.discreteStep<=l.maxValue-l.minValue)&&a(u+".discreteStep","a number > 0, at most the range"),p.discreteStep=c==="int"?Math.max(1,Math.round(l.discreteStep||1)):hn(l.discreteStep)&&l.discreteStep>0?l.discreteStep:em(l.maxValue-l.minValue),c==="int"&&(!Number.isInteger(l.minValue)||!Number.isInteger(l.maxValue))&&a(u,"an int has whole-number minValue and maxValue")}l.defaultValue===void 0?p.defaultValue=p.minValue:!hn(l.defaultValue)||l.defaultValue<p.minValue||l.defaultValue>p.maxValue?a(u+".defaultValue","a number from "+p.minValue+" to "+p.maxValue):p.defaultValue=l.defaultValue,l.units!==void 0&&(typeof l.units=="string"&&l.units.length<=8?p.units=l.units:a(u+".units",'up to 8 characters, e.g. "Hz", "ms", "%", "dB"')),l.exponent!==void 0&&(hn(l.exponent)&&l.exponent>0?p.exponent=l.exponent:a(u+".exponent","a number > 0")),l.more!==void 0&&(typeof l.more=="boolean"?l.more&&(p.more=!0):a(u+".more","true or false")),r.push(p)})}if(t.length)return{ok:!1,errors:t,manifest:null};var s={ncPlugin:lo,id:n.id,name:n.name.trim(),version:n.version,author:n.author.trim(),licence:n.licence,dsp:n.dsp,params:r};return n.description&&(s.description=n.description),n.website&&(s.website=n.website),n.keywords&&(s.keywords=n.keywords.slice()),{ok:!0,errors:[],manifest:s}}function em(e){var t=Math.pow(10,Math.floor(Math.log10(e/100)));return t<.001?.001:t>1?1:+t.toFixed(3)}function tm(e){for(var t=0;t<3&&Math.abs(Math.round(e*Math.pow(10,t))-e*Math.pow(10,t))>1e-9;)t++;return t}function zr(e){return"plugin:"+e}function nm(e,t){var n=e,a=t||{},r=n.params.map(function(s,l){var d={key:s.id,label:s.label,min:s.minValue,max:s.maxValue,default:s.defaultValue,step:s.discreteStep,k:l+1,unit:s.units||null,format:null};if(s.type==="choice"||s.type==="boolean"){var u=s.type==="choice"?s.choices:["Off","On"];d.step=null,d.options=u.map(function(p,f){return{value:f,label:p}}),d.format={fmt:"option"}}else{var c=s.units?/^[%°×]/.test(s.units)?s.units:" "+s.units:"";d.format={fmt:"fixed",div:1,add:0,digits:tm(s.discreteStep),suffix:c}}return s.more&&(d.more=!0),d}),o={type:zr(n.id),label:n.name,dials:r,plugin:{id:n.id,version:n.version,author:n.author,licence:n.licence,engine:"plugin:"+n.id+"@"+n.version,idBase:n.id.split(".").pop(),url:typeof a.url=="string"?a.url:"",listed:a.listed===!0}};return n.description&&(o.note=n.description),n.website&&(o.plugin.website=n.website),o}function kd(e,t){var n=Dr(e);if(!n.ok)throw new Error("nc-fx plugin: "+n.errors.join("; "));var a=le(zr(n.manifest.id));if(a&&a.plugin.version!==n.manifest.version)throw new Error("nc-fx plugin: "+n.manifest.id+" "+a.plugin.version+" is already loaded on this page; reload to use "+n.manifest.version);if(a)return a;var r=nm(n.manifest,t);return Nf(r),r}async function $d(e){var t=globalThis.crypto&&globalThis.crypto.subtle;if(!t)throw new Error("nc-fx plugin: no WebCrypto here (integrity needs a secure context: https or localhost)");for(var n=new Uint8Array(await t.digest("SHA-256",e)),a="",r=0;r<n.length;r++)a+=String.fromCharCode(n[r]);return"sha256-"+btoa(a)}function am(e){if(e.protocol!=="https:"&&!(e.protocol==="http:"&&/^(localhost|127\.0\.0\.1|\[::1\])$/.test(e.hostname)))throw new Error("nc-fx plugin: load plugins over https (http only from localhost): "+e.href)}async function nl(e,t,n,a){var r=await t(e,{credentials:"omit",cache:"no-cache"});if(!r.ok)throw new Error("nc-fx plugin: "+a+" "+e+" answered "+r.status);var o=new Uint8Array(await r.arrayBuffer());if(n){var s=await $d(o);if(s!==n)throw new Error("nc-fx plugin: "+a+" "+e+" does not match the registry (expected "+n+", got "+s+")")}return new TextDecoder().decode(o)}var Pa=typeof WeakMap=="function"?new WeakMap:null;function Sd(e,t){var n=new Error("nc-fx plugin: "+e.name+" "+t+" is already loaded on this page. Reload the page to use "+e.version+".");return n.reload=!0,n}async function Ed(e,t,n,a,r){var o=t.id+"@"+t.version,s=Pa&&Pa.get(e);!s&&Pa&&(s={},Pa.set(e,s));var l=s&&s[o];if(l){var d=await l,u=await n();return{stale:u!==d}}var c=(async function(){var p=await n();await Pd(e,r);var f=URL.createObjectURL(new Blob([Jf(p)+`
//# sourceURL=`+a+`
`],{type:"text/javascript"}));try{await e.audioWorklet.addModule(f)}finally{URL.revokeObjectURL(f)}return p})();return s&&(s[o]=c,c.catch(function(){delete s[o]})),await c,{stale:!1}}async function Ad(e,t,n){var a=n||{},r=new URL(String(t),a.base||(typeof location<"u"?location.href:void 0));am(r);var o=a.fetch||globalThis.fetch.bind(globalThis),s=a.integrity||{},l=await nl(r.href,o,s.manifest,"plugin.json"),d;try{d=JSON.parse(l)}catch{throw new Error("nc-fx plugin: "+r.href+" is not JSON")}var u=Dr(d);if(!u.ok)throw new Error("nc-fx plugin: "+r.href+": "+u.errors.join("; "));var c=u.manifest;if(a.expect&&(a.expect.id&&a.expect.id!==c.id||a.expect.version&&a.expect.version!==c.version))throw new Error("nc-fx plugin: "+r.href+" is "+c.id+" "+c.version+", not what the registry lists");var p=le(zr(c.id));if(p&&p.plugin.version!==c.version)throw Sd(c,p.plugin.version);var f=new URL(c.dsp,r),y=await Ed(e,c,function(){return nl(f.href,o,s.dsp,"DSP file")},f.href,a.moduleUrl),m=kd(c,{url:r.href,listed:a.listed===!0});return{entry:m,manifest:c,url:r.href,stale:y.stale}}var rm=256*1024;async function al(e,t,n){var a=n||{},r=t||{},o=r.manifest;if(typeof o=="string")try{o=JSON.parse(o)}catch{throw new Error("nc-fx plugin: plugin.json is not JSON")}var s=Dr(o);if(!s.ok)throw new Error("nc-fx plugin: plugin.json: "+s.errors.join("; "));var l=s.manifest;if(typeof r.dsp!="string"||!r.dsp.trim())throw new Error("nc-fx plugin: "+l.name+" needs its DSP file, "+l.dsp);if(typeof r.dspName=="string"&&r.dspName!==l.dsp)throw new Error("nc-fx plugin: plugin.json names its DSP file "+l.dsp+", not "+r.dspName);if(new TextEncoder().encode(r.dsp).length>rm)throw new Error("nc-fx plugin: "+l.dsp+" is over 256 KB");var d=typeof a.url=="string"&&a.url?a.url:"local:"+l.id,u=le(zr(l.id));if(u&&u.plugin.version!==l.version)throw Sd(l,u.plugin.version);var c=r.dsp,p=await Ed(e,l,async function(){return c},d.replace(/[^A-Za-z0-9:._@\/-]/g,"_")+"/"+l.dsp,a.moduleUrl),f=kd(l,{url:d,listed:!1});return{entry:f,manifest:l,url:d,stale:p.stale}}function om(e){var t=[];if(!ta(e)||e.v!==1||!Array.isArray(e.plugins))return{ok:!1,errors:['registry: { "v": 1, "plugins": [...] }'],registry:{v:1,plugins:[]}};var n=[],a={};return e.plugins.forEach(function(r,o){var s="plugins["+o+"]",l=[];if(!ta(r)){t.push(s+": must be an object");return}if((typeof r.id!="string"||!vd.test(r.id))&&l.push("id"),Ut(r.name,40)||l.push("name"),(typeof r.version!="string"||!wd.test(r.version))&&l.push("version"),Ut(r.author,80)||l.push("author"),(typeof r.licence!="string"||!xd.test(r.licence))&&l.push("licence"),(typeof r.manifest!="string"||!r.manifest)&&l.push("manifest"),(!ta(r.integrity)||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(r.integrity.manifest||"")||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(r.integrity.dsp||""))&&l.push("integrity"),(typeof r.checked!="string"||!/^\d{4}-\d{2}-\d{2}/.test(r.checked))&&l.push("checked"),a[r.id]&&l.push("id (listed twice)"),l.length){t.push(s+": bad "+l.join(", "));return}a[r.id]=!0;var d={id:r.id,name:r.name,version:r.version,author:r.author,licence:r.licence,manifest:r.manifest,integrity:{manifest:r.integrity.manifest,dsp:r.integrity.dsp},checked:r.checked};typeof r.description=="string"&&(d.description=r.description.slice(0,200)),n.push(d)}),{ok:t.length===0,errors:t,registry:{v:1,plugins:n}}}async function im(e,t){var n=t||{},a=new URL(String(e),n.base||(typeof location<"u"?location.href:void 0)),r=await(n.fetch||globalThis.fetch.bind(globalThis))(a.href,{credentials:"omit",cache:"no-cache"});if(!r.ok)throw new Error("nc-fx plugins: the registry "+a.href+" answered "+r.status);var o=om(await r.json());return{registry:o.registry,url:a.href,errors:o.errors}}function sm(e,t,n,a){return Ad(e,new URL(t.manifest,n).href,Object.assign({},a,{integrity:t.integrity,listed:!0,expect:{id:t.id,version:t.version}}))}function lm(e,t){var n=t||{},a=n.stallMs>0?n.stallMs:1500,r=n.everyMs>0?n.everyMs:250,o=n.now||function(){return typeof performance<"u"?performance.now():Date.now()},s=n.setInterval||setInterval,l=n.clearInterval||clearInterval,d=e.currentTime,u=o(),c=0,p=!1,f=s(function(){var y=o(),m=y-u,w=e.currentTime;if(u=y,e.state!=="running"||w!==d){d=w,c=0,p&&e.state==="running"&&(p=!1,n.onResume&&n.onResume());return}if(m>4*r){c=0;return}c+=m,!p&&c>=a&&(p=!0,n.onStall&&n.onStall({frozenMs:c,at:w}))},r);return{stop:function(){l(f)},stalled:function(){return p}}}var cm=["hard","pump","swell","blip","glide"],dm=["Hard","Pump","Swell","Blip","Glide"],Md=16;function ct(e){for(var t=[],n=0;n<Md;n++)t.push(e[n%e.length]);return t}var Mn=[{name:"Ducker",note:"The four-on-the-floor duck: every beat dips and comes back.",dials:{rate:4,steps:8,swing:0,depth:90,mode:0},levels:ct([100]),shapes:ct([1])},{name:"Tide",note:"One slow breath a bar.",dials:{rate:8,steps:16,swing:0,depth:85,mode:0},levels:ct([15,35,60,85,100,85,60,35]),shapes:ct([4])},{name:"Stutter",note:"A sixteenth gate with gaps.",dials:{rate:16,steps:16,swing:0,depth:100,mode:0},levels:[100,0,100,100,0,100,0,100,100,0,100,100,0,100,100,0],shapes:ct([0])},{name:"Lope",note:"Swung eighths, short hits.",dials:{rate:8,steps:16,swing:50,depth:100,mode:0},levels:ct([100,55,85,40,100,55,85,70]),shapes:ct([3])},{name:"Embers",note:"Each eighth swells and cuts; the bar fades.",dials:{rate:8,steps:8,swing:0,depth:100,mode:0},levels:ct([100,85,70,60,50,40,30,20]),shapes:ct([2])},{name:"Sieve",note:"Filter mode: sixteenths open a low-pass, a climb at the end of the bar.",dials:{rate:16,steps:16,swing:0,depth:85,mode:1,res:35},levels:[100,20,55,25,95,25,60,35,100,20,55,25,70,80,90,100],shapes:[3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0]}],um="Ducker";function Td(e){for(var t=String(e||"").toLowerCase(),n=0;n<Mn.length;n++){var a=Mn[n];if(a.name.toLowerCase()===t)return{name:a.name,dials:Object.assign({},a.dials),pattern:{levels:a.levels.slice(),shapes:a.shapes.slice()}}}return null}function rl(e,t,n,a){return typeof e!="number"||!isFinite(e)?a:(e=Math.round(e),e<t?t:e>n?n:e)}function xa(e){for(var t=Mn[0],n=e&&typeof e=="object"?e:{},a=Array.isArray(n.levels)?n.levels:[],r=Array.isArray(n.shapes)?n.shapes:[],o={levels:[],shapes:[]},s=0;s<Md;s++)o.levels.push(rl(a[s],0,100,t.levels[s])+0),o.shapes.push(rl(r[s],0,cm.length-1,t.shapes[s])+0);return o}function pm(e){var t=xa(e),n=[],a,r,o;for(a=0;a<4;a++){for(o=0,r=3;r>=0;r--)o=o*101+t.levels[a*4+r];n.push([10+a,o])}for(a=0;a<2;a++){for(o=0,r=7;r>=0;r--)o=o*5+t.shapes[a*8+r];n.push([14+a,o])}return n}function hm(e){if(!e||!e.dials)return"Custom";for(var t=xa(e.pattern),n=0;n<Mn.length;n++){var a=Mn[n],r=!0,o;for(o in a.dials)e.dials[o]!==a.dials[o]&&(r=!1);var s=a.dials.steps;for(o=0;r&&o<s;o++)(t.levels[o]!==a.levels[o]||t.shapes[o]!==a.shapes[o])&&(r=!1);if(r)return a.name}return"Custom"}function Ld(e){var t=e&&e.steps===8?8:16;return e&&e.rate===12&&t>12?12:t}function fm(e,t,n){var a=e&&(e.rate===4||e.rate===8||e.rate===12)?e.rate:16,r=e&&e.steps===8?8:16,o=4/a,s=+t||0;if(a===12){var l=n>0?n:4;s-=Math.floor(s/l)*l}var d=.5+.25*(e&&typeof e.swing=="number"?e.swing:0)/100,u=s/o*.5,c=Math.floor(u),p=u-c,f=(c%16+16)%16,y=p<d?f*2:f*2+1;return y&r-1}function mm(e,t,n,a){for(var r=xa(t),o=e&&e.steps===8?8:16,s=Ld(e),l=(n%o+o)%o,d=l+1>=s?0:l+1,u=r.levels[l]/100,c=r.levels[d]/100,p=r.shapes[l],f=[],y=a>0?a:24,m=0;m<=y;m++){var w=m/y,h,v;switch(p){case 1:v=w*1.6667,v>1&&(v=1),h=u*v*(2-v);break;case 2:h=u*w*w;break;case 3:h=w<.12?u:u*Math.exp((.12-w)*18);break;case 4:v=w*w*(3-2*w),h=u+(c-u)*v;break;default:h=u}f.push(h)}return f}var gm=2,cr=3,ol=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Gt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var bm=/^local:[A-Za-z0-9._@-]{1,200}$/,ym=/^\d+\.\d+\.\d+$/;function vm(e,t){var n=Gt(e)?e:{},a=t.slice(7),r={id:a,version:typeof n.version=="string"&&ym.test(n.version)?n.version:"0.0.0",url:"",name:a};return typeof n.url=="string"&&n.url.length<=2048&&(/^https?:\/\//.test(n.url)||bm.test(n.url))&&(r.url=n.url),typeof n.name=="string"&&n.name.trim()&&(r.name=n.name.trim().slice(0,40)),r}function Cd(e){var t=e.plugin;return{id:t.id,version:t.version,url:t.url,name:e.label}}function wm(e){var t={},n=0;if(Gt(e))for(var a in e)n<16&&/^[a-z][a-z0-9_]{0,31}$/.test(a)&&typeof e[a]=="number"&&isFinite(e[a])&&(t[a]=e[a],n++);return t}function xm(e){return e.plugin?e.plugin.idBase:e.type}function Nd(e,t){var n=le(e);if(!n)return null;var a={};(t||[]).forEach(function(u){u&&u.id&&(a[u.id]=!0)});for(var r=1,o=xm(n);a[o+"-"+r];)r++;var s={};n.dials.forEach(function(u){s[u.key]=u.default});var l={id:o+"-"+r,type:n.type,bypass:!1,dials:s};if(n.plugin&&(l.plugin=Cd(n)),n.pattern){var d=Td(um);Object.assign(l.dials,d.dials),l.pattern=d.pattern}return l}function km(e){var t=le(e.type),n=/-(\d+)$/.exec(e.id||""),a=t?t.label:e.plugin&&e.plugin.name?e.plugin.name:e.type;return a+(n&&+n[1]>1?" "+n[1]:"")}function $m(e,t,n){var a=e.length-1,r=Math.max(0,Math.min(a,n));if(t<0||t>a||t===r)return e;var o=e.slice(),s=o.splice(t,1)[0];return o.splice(r,0,s),o}function Sm(e){return typeof e=="number"&&isFinite(e)?_f(e):e}function il(e,t,n){var a={};return e.dials.forEach(function(r){var o=t[r.key];o===void 0&&r.astridKey&&(o=t[r.astridKey]),n&&e.type==="delay"&&r.key==="delay_beats"&&(o=Sm(o)),a[r.key]=e.plugin?gt(r,o,r.step):gt(r,o)}),e.dials.forEach(function(r){r.stepWhen&&(a[r.key]=gt(r,typeof t[r.key]=="number"?t[r.key]:a[r.key],An(r,a)))}),a}function Em(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,r=1/0,o=e.min;o<=e.max;o++){var s=mn(n.law,o),l=s===null?1/0:Math.abs(s-t);l<r&&(r=l,a=o)}return a}}var Am={rate:"rate_hz"};function Mm(e,t,n,a){var r={};return e.dials.forEach(function(o){if(!o.more){var s=o.astridKey||Am[o.key]||o.key;r[o.key]=Em(o,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function Tm(e,t){var n=t>0?Math.floor(t):cr,a=[],r=[],o=[],s=!1,l=!1;Array.isArray(e)?(o=e,l=!0):Gt(e)&&Array.isArray(e.chain)&&(o=e.chain,s=e.v===1,l=e.schema===2);for(var d=[],u=0;u<o.length;u++){var c=o[u];if(Gt(c)&&!(c.type==="limiter"||c.fixed===!0)){var p=Di(c.type),f=p&&le(p);if(!f&&!s&&gd(c.type)){if(d.length>=n){a.push(c.id||c.type);continue}for(var y=vm(c.plugin,c.type),m=y.id.split(".").pop(),w=1;d.some(function(g){return g.id===m+"-"+w});)w++;var h=typeof c.id=="string"&&ol.test(c.id)&&!d.some(function(g){return g.id===c.id})?c.id:m+"-"+w;d.push({id:h,type:c.type,bypass:c.bypass===!0,dials:wm(c.dials),plugin:y});continue}if(!f||s&&["drive","delay","plate"].indexOf(p)<0){typeof c.type=="string"&&a.push(c.type);continue}if(d.length>=n){a.push(c.id||p);continue}var v;Gt(c.params)&&!Gt(c.dials)?v=il(f,Mm(f,c.params,r,c.id||p),l):v=il(f,Gt(c.dials)?c.dials:{},l);var k=Nd(p,d),b=typeof c.id=="string"&&ol.test(c.id)&&!d.some(function(g){return g.id===c.id})?c.id:k.id,S=s?c.bypass!==!1:c.bypass===!0,E={id:s?k.id:b,type:p,bypass:S,dials:v};f.plugin&&(E.plugin=Cd(f)),f.pattern&&(E.pattern=xa(c.pattern)),d.push(E)}}return{state:{v:gm,chain:d},dropped:a,notes:r}}function Qt(e,t){return Tm(e,t).state}function $t(e){var t=le(e.type),n=[[0,e.bypass?0:1]];return t&&(t.dials.forEach(function(a){n.push([a.k,or(a,e.dials[a.key])])}),t.pattern&&(n=n.concat(pm(e.pattern)))),n}function Lm(e){var t=Qt(e,8),n=[],a=t.chain.filter(function(r){if(r.plugin)return n.push(r.id+": ASTRID has no plugins"),!1;var o=le(r.type);return o&&o.own?(n.push(r.id+": ASTRID has no "+o.label),!1):!0}).map(function(r,o){var s=le(r.type),l={};return o>=cr&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(d){var u=r.dials[d.key];if(d.more){u!==d.default&&n.push(r.id+"."+d.key);return}d.key==="delay_beats"&&Vo.indexOf(u)<0&&n.push(r.id+".delay_beats"),l[d.astridKey||d.key]=u}),{id:r.id,type:r.type,bypass:r.bypass,dials:l}});return{hacks:a,lossy:n}}var Cm=150,Nm=6e3,Im=18,Id=6.283185307179586;function Or(e,t,n){return e<t?t:e>n?n:e}function Fm(e,t,n,a,r){var o=Math.pow(10,n/40),s=Id*t/r,l=Math.cos(s),d=Math.sin(s),u,c,p,f,y,m,w,h;if(e===0||e===2){w=d/2*Math.SQRT2,h=2*Math.sqrt(o)*w;var v=e===0?1:-1;u=o*(o+1-v*(o-1)*l+h),c=v*2*o*(o-1-v*(o+1)*l),p=o*(o+1-v*(o-1)*l-h),f=o+1+v*(o-1)*l+h,y=-v*2*(o-1+v*(o+1)*l),m=o+1+v*(o-1)*l-h}else w=d/(2*a),u=1+w*o,c=-2*l,p=1-w*o,f=1+w/o,y=-2*l,m=1-w/o;return[u/f,c/f,p/f,y/f,m/f]}function Pm(e,t,n){var a=Id*t/n,r=Math.cos(a),o=Math.sin(a),s=Math.cos(2*a),l=Math.sin(2*a),d=e[0]+e[1]*r+e[2]*s,u=-(e[1]*o+e[2]*l),c=1+e[3]*r+e[4]*s,p=-(e[3]*o+e[4]*l);return 10*Math.log10((d*d+u*u)/(c*c+p*p))}var sl={};function _t(e){return sl[e]||(sl[e]=Pf("eq",e))}function fn(e,t){var n=_t(t),a=e&&typeof e[t]=="number"&&isFinite(e[t])?e[t]:n.default;return Or(a,n.min,n.max)}function Fd(e){return[{id:"low",kind:0,hz:Cm,db:fn(e,"low_db"),q:Math.SQRT1_2},{id:"mid",kind:1,hz:or(_t("mid_hz"),fn(e,"mid_hz")),db:fn(e,"mid_db"),q:or(_t("mid_q"),fn(e,"mid_q"))},{id:"high",kind:2,hz:Nm,db:fn(e,"high_db"),q:Math.SQRT1_2}]}function Rm(e,t,n){for(var a=Fd(e),r=n.length,o=new Float64Array(r),s=[],l=t/2,d=0;d<a.length;d++){var u=a[d],c=new Float64Array(r);if(u.db!==0)for(var p=Fm(u.kind,u.hz,u.db,u.q,t),f=0;f<r;f++){var y=n[f]<l?n[f]:l*.9999;c[f]=Pm(p,y,t),o[f]+=c[f]}s.push(c)}return{total:o,bands:s}}function Dm(e){var t=_t("mid_hz").dsp.law;return Or(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}function zm(e){var t=_t("mid_q").dsp.law;return Or(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}var dr={low:"low_db",mid:"mid_db",high:"high_db"},Om={low:"Low",mid:"Mid",high:"High"};function Bm(e,t,n){var a=[];function r(o,s){var l=_t(o),d=l.step||1;s=Or(Math.round(s/d)*d,l.min,l.max),s===0&&(s=0),s!==fn(e,o)&&a.push([o,s])}return typeof n.db=="number"&&dr[t]&&r(dr[t],n.db),t==="mid"&&typeof n.hz=="number"&&n.hz>0&&r("mid_hz",Dm(n.hz)),t==="mid"&&typeof n.q=="number"&&n.q>0&&r("mid_q",zm(n.q)),a}function _m(e){var t=e==="mid"?["mid_db","mid_hz","mid_q"]:dr[e]?[dr[e]]:[];return t.map(function(n){return[n,_t(n).default]})}var Ra=typeof WeakMap=="function"?new WeakMap:null;function jm(e){var t=e&&e.output;if(!t||!t.context||typeof t.context.createAnalyser!="function")return null;var n=Ra&&Ra.get(e);return n||(n={node:null,users:0,handle:null},n.handle={open:function(){return e.status==="disposed"?null:(n.node||(n.node=t.context.createAnalyser(),n.node.fftSize=4096,n.node.smoothingTimeConstant=.8,n.node.minDecibels=-110,n.node.maxDecibels=0),n.users++===0&&t.connect(n.node),n.node)},close:function(){if(n.users!==0&&--n.users===0&&n.node)try{t.disconnect(n.node)}catch{}}},Ra&&Ra.set(e,n)),n.handle}function qm(e,t,n){var a=n||{},r={};["low_db","mid_db","mid_hz","mid_q","high_db"].forEach(function(c){var p=e&&typeof e.getParam=="function"?e.getParam(t,c):void 0;r[c]=typeof p=="number"?p:_t(c).default});var o=e&&e.output&&e.output.context,s=a.sampleRate||o&&o.sampleRate||48e3,l=a.help||{},d=Fd(r).map(function(c){var p=(c.db>0?"+":c.db<0?"−":"")+Math.abs(c.db)+" dB",f=c.hz>=1e3?(c.hz/1e3).toFixed(c.hz>=1e4?0:1)+" kHz":Math.round(c.hz)+" Hz";return{id:c.id,label:Om[c.id],kind:c.kind===0?"lowshelf":c.kind===1?"peak":"highshelf",hz:c.hz,db:c.db,q:c.q,moveHz:c.id==="mid",moveQ:c.id==="mid",minHz:c.id==="mid"?200:c.hz,maxHz:c.id==="mid"?5e3:c.hz,minQ:.3,maxQ:6,valueText:c.id==="mid"?p+" at "+f+", Q "+c.q.toFixed(1):p+(c.id==="low"?", shelf below ":", shelf above ")+f,help:l[c.id]}}),u=function(c){for(var p=0;p<c.length;p++)a.set(c[p][0],c[p][1])};return{type:"eqGraph",id:a.id,label:a.label||"EQ curve",range:Im,sampleRate:s,on:a.on!==!1,bands:d,help:l.graph,response:function(c){return Rm(r,s,c)},spectrum:a.spectrum===!1?void 0:jm(e)||void 0,onBand:function(c,p){u(Bm(r,c,p))},onReset:function(c){u(_m(c).filter(function(p){return p[1]!==r[p[0]]}))}}}var Vm="nc-fx@1",Hm=600,Um=256,Gm=8,Vn=typeof WeakMap=="function"?new WeakMap:null;function Pd(e,t){var n=Vn&&Vn.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await Ef(async()=>{const{default:o}=await import("./worklet-source-DgIhZ4lI.js");return{default:o}},[])).default,r=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),Vn&&(Vn.set(e,n),n.catch(function(){Vn.delete(e)})),n)}function St(e,t){return typeof e=="number"&&isFinite(e)?e:t}function Rd(e,t,n,a){var r=Math.min(400,Math.max(20,St(t.bpm,120))),o=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",d=St(t.preGain,1),u=Math.max(0,St(t.crossfade,.012)),c=St(t.maxDelaySeconds,void 0),p=e.createGain(),f=e.createGain(),y=e.createGain(),m=e.createGain(),w=null;t.modInput===!0&&(w=e.createGain(),w.channelCount=1,w.channelCountMode="explicit",w.channelInterpretation="discrete"),m.gain.value=0,p.connect(y),y.connect(f),m.connect(f);var h={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r,mUsers:0,lv:null,lvAt:0,clk:null},v=n(r);h.post=function(g){h.node?h.node.port.postMessage(g):h.disposed||(o.length>=Um&&(o=a().concat([{t:"tempo",bpm:h.bpm,when:0}]),h.mUsers>0&&o.push({t:"meter",on:!0})),o.push(g))};function k(g){var x=o.map(function(A){var $=Object.assign({},A);return $.when>g||($.when=0,$.t!=="clear"&&($.snap=!0)),$});return o=[],x}h.emit=function(g){for(var x=0;x<h.listeners.length;x++)try{h.listeners[x](g)}catch(A){typeof console<"u"&&console.error(A)}},h.whenOf=function(g){return typeof g=="number"&&isFinite(g)&&g>0?g:0};var b=!1;h.tooFar=function(g){return typeof g=="number"&&g>e.currentTime+Hm?(!b&&typeof console<"u"&&(b=!0,console.warn("nc-fx: ignoring a time "+Math.round(g-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var S=Pd(e,t.moduleUrl).then(function(){if(!h.disposed){var g=Object.assign({bpm:r,bypassMode:l,limiter:s,preGain:d,maxDelaySeconds:c},v);g.pending=k(e.currentTime),h.node=new AudioWorkletNode(e,Vm,{numberOfInputs:w?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:g}),h.node.port.onmessage=function(A){var $=A.data;if($&&$.t==="lv"&&h.mUsers>0)h.lv=$.d,h.lvAt=ll();else if($&&$.t==="clk"&&$.d)h.clk={beat:$.d[0],frame:$.d[1],perFrame:$.d[2],locked:$.d[3]===1,bar:$.d[4]||4};else if($&&$.t==="perr"&&h.onPluginError&&$.d)for(var L=0;L<($.n|0);L++)h.onPluginError($.d[2*L],$.d[2*L+1])},p.connect(h.node),w&&w.connect(h.node,0,1),h.node.connect(m);var x=e.currentTime;x<=0||u===0?(y.gain.value=0,m.gain.value=1):(y.gain.setValueAtTime(1,x),y.gain.linearRampToValueAtTime(0,x+u),m.gain.setValueAtTime(0,x),m.gain.linearRampToValueAtTime(1,x+u)),h.status="ready"}},function(g){h.status="unavailable",o=[],h.error=g});h.meterOpen=function(){return h.disposed||h.status==="unavailable"?!1:(h.mUsers++===0&&h.post({t:"meter",on:!0}),!0)},h.meterClose=function(){h.mUsers!==0&&--h.mUsers===0&&(h.lv=null,h.disposed||h.post({t:"meter",on:!1}))},h.levels=function(){return h.lv&&ll()-h.lvAt<Wm?h.lv:null};var E={};return h.meter=function(g,x){if(E[g])return E[g];var A=0,$={in:0,out:0},L={open:function(){return h.meterOpen()?(A++,!0):!1},close:function(){A!==0&&(A--,h.meterClose())},read:function(){var C=A>0?h.levels():null;return $.in=0,$.out=0,C&&x(C,$),$}};return E[g]=L,L},h.core={input:p,output:f,modInput:w,ready:S,get status(){return h.status},get error(){return h.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function(g,x){var A=St(g,NaN);!(A>0)||h.disposed||h.tooFar(x)||(h.bpm=Math.min(400,Math.max(20,A)),h.post({t:"tempo",bpm:h.bpm,when:h.whenOf(x)}),h.emit({effect:null,key:"tempo",value:h.bpm}))},getTempo:function(){return h.bpm},setBeat:function(g,x){var A=St(g,NaN);A!==A||h.disposed||h.tooFar(x)||h.post({t:"beat",beat:A,when:h.whenOf(x)})},freeRun:function(g){h.disposed||h.tooFar(g)||h.post({t:"free",when:h.whenOf(g)})},setBar:function(g,x){var A=Math.round(St(g,NaN));!(A>=1&&A<=16)||h.disposed||h.tooFar(x)||h.post({t:"bar",beats:A,when:h.whenOf(x)})},beatAt:function(g){var x=h.clk;if(!x)return null;var A=typeof g=="number"&&isFinite(g)?g:e.currentTime;return{beat:x.beat+(A*e.sampleRate-x.frame)*x.perFrame,bpm:x.perFrame*60*e.sampleRate,locked:x.locked,beatsPerBar:x.bar}},clear:function(g){var x=g&&typeof g=="object"?g:{at:g};if(!(h.disposed||h.tooFar(x.at))){var A=St(x.fadeMs,0);h.post({t:"clear",when:h.whenOf(x.at),fadeMs:A>0?Math.min(1e3,A):0})}},onChange:function(g){return h.listeners.push(g),function(){var x=h.listeners.indexOf(g);x>=0&&h.listeners.splice(x,1)}},dispose:function(){if(!h.disposed){if(h.disposed=!0,h.status="disposed",o=[],h.listeners.length=0,h.node){h.node.port.postMessage({t:"dispose"}),h.node.port.close();try{h.node.disconnect()}catch{}}[p,y,m,f,w].forEach(function(g){try{g&&g.disconnect()}catch{}})}}},h}var Wm=250;function ll(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function Dd(e,t){t.in=e[0],t.out=e[1]}function co(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function uo(e,t){var n=t||{};if(n.slots)return Km(e,n);var a=sr(n.state),r=Array.from(io(a)),o=Rd(e,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(io(a)),when:0}]}),s=o.core;function l(d){return a.chain[Pr.indexOf(d)]}return s.setParam=function(d,u,c,p){var f=ir(d);if(!(!f||o.disposed||o.tooFar(p))){var y=l(f),m;if(u==="bypass")m=!!c;else{var w=yd(f,u);if(!w)return;m=gt(w,c,An(w,y.dials))}return u==="bypass"?y.bypass=m:y.dials[u]=m,o.post({t:"p",i:Ho[f][u],v:Uo(f,u,m),when:o.whenOf(p)}),o.emit({effect:f,key:u,value:m}),Rr(f).dials.forEach(function(h){if(!(!h.stepWhen||!h.stepWhen.some(function(b){return b.key===u}))){var v=y.dials[h.key],k=gt(h,v,An(h,y.dials));k!==v&&(y.dials[h.key]=k,o.post({t:"p",i:Ho[f][h.key],v:Uo(f,h.key,k),when:o.whenOf(p)}),o.emit({effect:f,key:h.key,value:k}))}}),m}},s.meter=function(){return o.meter("",Dd)},s.getParam=function(d,u){var c=ir(d);if(c){var p=l(c);return u==="bypass"?p.bypass:p.dials[u]}},s.getState=function(){return Vf(a)},s.setState=function(d,u){o.disposed||o.tooFar(u&&u.at)||(a=sr(d),o.post({t:"load",program:Array.from(io(a)),when:o.whenOf(u&&u.at)}),o.emit({effect:null,key:null,value:null}))},s}function Km(e,t){var n=t.slots===!0?cr:Math.max(1,Math.min(Gm,Math.floor(+t.slots)||cr)),a=Qt(t.state,n),r=1,o={},s={};function l(g){return!gd(g.type)||le(g.type)!==null}function d(g){var x=le(g.type);return x&&x.plugin?x.plugin.engine:g.type}function u(g){return o[g.id]||(o[g.id]=r++),o[g.id]}function c(g){return g.filter(l).map(function(x){return{uid:u(x),type:d(x),program:$t(x)}})}function p(){return a.chain.filter(l).map(function(g){return o[g.id]})}var f=c(a.chain),y=p(),m=Rd(e,t,function(){return{slots:n,chain:f,order:y}},function(){return[{t:"sync",chain:c(a.chain),order:p(),when:0}]}),w=m.core;m.onPluginError=function(g,x){for(var A in o)o[A]===g&&(s[A]=x,m.emit({effect:A,key:"error",value:x}))};function h(g){var x;for(x=0;x<a.chain.length;x++)if(a.chain[x].id===g)return a.chain[x];var A=Di(g);if(A){for(x=0;x<a.chain.length;x++)if(a.chain[x].type===A)return a.chain[x]}return null}function v(g,x){var A=u(g);m.post({t:"add",uid:A,type:d(g),when:x}),$t(g).forEach(function($){m.post({t:"ps",uid:A,k:$[0],v:$[1],when:x,snap:!0})})}function k(g){m.post({t:"order",uids:p(),when:g})}function b(g,x){var A={};a.chain.forEach(function(C){A[C.id]=C});var $=p().join();g.chain.forEach(function(C){var R=A[C.id];if(!l(C)){delete o[C.id];return}if(!R||R.type!==C.type||!o[C.id]){delete o[C.id],delete s[C.id],v(C,x);return}var _={};$t(R).forEach(function(U){_[U[0]]=U[1]}),$t(C).forEach(function(U){_[U[0]]!==U[1]&&m.post({t:"ps",uid:o[C.id],k:U[0],v:U[1],when:x})})});var L={};g.chain.forEach(function(C){L[C.id]=!0}),Object.keys(o).forEach(function(C){L[C]||delete o[C]}),Object.keys(s).forEach(function(C){L[C]||delete s[C]}),a=g,p().join()!==$&&k(x)}var S=Ff(function(g){if(!(m.disposed||!a.chain.some(function(A){return A.type===g}))){var x=JSON.parse(JSON.stringify(a));x.chain=x.chain.map(function(A){return A.type===g?Qt({v:2,chain:[A]},1).chain[0]:A}),b(x,0),m.emit({effect:null,key:"plugin",value:g})}}),E=w.dispose;return w.dispose=function(){S(),E()},w.slots=n,w.meter=function(g){return g==null||g===""?m.meter("",Dd):m.meter("#"+g,function(x,A){var $=h(g),L=$?o[$.id]:0,C=x[2];if(L){for(var R=3,_=0;_<C;_++,R+=3)if(x[R]===L){A.in=x[R+1],A.out=x[R+2];return}}})},w.setParam=function(g,x,A,$){var L=h(g);if(!(!L||m.disposed||m.tooFar($))){var C=le(L.type),R,_=null;if(!C)return x!=="bypass"?void 0:(L.bypass=!!A,m.emit({effect:L.id,key:x,value:L.bypass}),L.bypass);if(x==="bypass")R=!!A;else{for(var U=0;U<C.dials.length;U++)C.dials[U].key===x&&(_=C.dials[U]);if(!_)return;R=gt(_,A,An(_,L.dials))}var G={},re={};$t(L).forEach(function(X){G[X[0]]=X[1]}),C.dials.forEach(function(X){X.stepWhen&&(re[X.key]=L.dials[X.key])}),x==="bypass"?L.bypass=R:L.dials[x]=R,C.dials.forEach(function(X){X.stepWhen&&(L.dials[X.key]=gt(X,L.dials[X.key],An(X,L.dials)))});var he=m.whenOf($),ee=o[L.id];return ee&&$t(L).forEach(function(X){(G[X[0]]!==X[1]||_&&X[0]===_.k)&&m.post({t:"ps",uid:ee,k:X[0],v:X[1],when:he})}),m.emit({effect:L.id,key:x,value:R}),Object.keys(re).forEach(function(X){X!==x&&L.dials[X]!==re[X]&&m.emit({effect:L.id,key:X,value:L.dials[X]})}),R}},w.getParam=function(g,x){var A=h(g);if(A)return x==="bypass"?A.bypass:A.dials[x]},w.setPattern=function(g,x,A){var $=h(g);if(!(!$||!$.pattern||m.disposed||m.tooFar(A))){var L=x&&typeof x=="object"?x:{},C=xa({levels:Array.isArray(L.levels)?L.levels:$.pattern.levels,shapes:Array.isArray(L.shapes)?L.shapes:$.pattern.shapes}),R={};$t($).forEach(function(G){R[G[0]]=G[1]}),$.pattern=C;var _=o[$.id],U=m.whenOf(A);return _&&$t($).forEach(function(G){R[G[0]]!==G[1]&&m.post({t:"ps",uid:_,k:G[0],v:G[1],when:U})}),m.emit({effect:$.id,key:"pattern",value:JSON.parse(JSON.stringify(C))}),JSON.parse(JSON.stringify(C))}},w.getPattern=function(g){var x=h(g);return x&&x.pattern?JSON.parse(JSON.stringify(x.pattern)):void 0},w.setGatePattern=function(g,x,A){var $=h(g),L=Td(x);return!$||!$.pattern||!L||m.disposed||m.tooFar(A)?!1:(Object.keys(L.dials).forEach(function(C){w.setParam($.id,C,L.dials[C],A)}),w.setPattern($.id,L.pattern,A),!0)},w.getState=function(){return JSON.parse(JSON.stringify(a))},w.setState=function(g,x){m.disposed||m.tooFar(x&&x.at)||(b(Qt(g,n),m.whenOf(x&&x.at)),m.emit({effect:null,key:null,value:null}))},w.addEffect=function(g,x){var A=x||{},$=Nd(g,a.chain);if(!(!$||a.chain.length>=n||m.disposed||m.tooFar(A.at))){if(A.dials){var L=Qt({v:2,chain:[{id:$.id,type:$.type,dials:A.dials}]},1).chain[0];$.dials=L.dials}A.bypass===!0&&($.bypass=!0);var C=a.chain.slice(),R=typeof A.index=="number"?Math.max(0,Math.min(C.length,A.index)):C.length;return C.splice(R,0,$),b({v:2,chain:C},m.whenOf(A.at)),m.emit({effect:$.id,key:"chain",value:"add"}),$.id}},w.removeEffect=function(g,x){var A=h(g),$=x&&x.at;return!A||m.disposed||m.tooFar($)?!1:(b({v:2,chain:a.chain.filter(function(L){return L!==A})},m.whenOf($)),m.emit({effect:A.id,key:"chain",value:"remove"}),!0)},w.moveEffect=function(g,x,A){var $=h(g),L=A&&A.at;if(!$||m.disposed||m.tooFar(L))return!1;var C=$m(a.chain,a.chain.indexOf($),x);return C===a.chain?!1:(b({v:2,chain:C},m.whenOf(L)),m.emit({effect:$.id,key:"chain",value:"move"}),!0)},w.getChain=function(){return a.chain.map(function(g){var x={id:g.id,type:g.type,name:km(g),bypass:g.bypass};if(g.plugin){var A=s[g.id]||0,$=!l(g)||A===5;x.plugin={id:g.plugin.id,version:g.plugin.version,url:g.plugin.url,name:g.plugin.name,status:$?"missing":A?"failed":"ready"},A&&!$&&(x.plugin.error=lr[A]||lr[2])}return x})},w.toAstrid=function(){return Lm(a)},w}function cl(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function zd(e,t,n){var a=n||{},r=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,o=typeof a.toAudioTime=="function"?a.toAudioTime:r?function(h){return r.toContextTime(h)}:t&&t.timebase==="shared"?null:function(h){return h},s=typeof a.now=="function"?a.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,l=t&&t.transport?t.transport:t,d=l&&l.tempo?l.tempo:l,u=!1;function c(h){if(!o){!u&&typeof console<"u"&&(u=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof h!="number")){var v=o(l.timeAt(h));return typeof v=="number"&&isFinite(v)?v:void 0}}function p(){var h=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(h)){var v=l&&typeof l.bpm=="number"?l.bpm:cl(d,0);v>0&&e.setTempo(v);return}var k=cl(d,h);k>0&&e.setTempo(k);for(var b=d&&(d.points||d.tempoPoints)||[],S=0;S<b.length;S++){var E=b[S];if(E.beat>h&&E.bpm>0){var g=c(E.beat);g!==void 0&&e.setTempo(E.bpm,g)}}}var f=typeof e.setBeat=="function";function y(){var h=l&&l.meter,v=h&&typeof h.beatsPerBar=="number"?h.beatsPerBar:0;f&&v>=1&&typeof e.setBar=="function"&&e.setBar(v)}function m(h){if(!(!o||typeof h!="number"||!isFinite(h))){var v=o(h);return typeof v=="number"&&isFinite(v)?v:void 0}}function w(){if(f){if(y(),!l||!l.running){e.freeRun();return}var h=s&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;isFinite(h)&&e.setBeat(h,c(h))}}return p(),w(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(h){h&&(h.kind==="tempo"&&h.bpm>0?e.setTempo(h.bpm,c(h.atBeat)):h.kind==="snapshot"?(p(),w()):h.kind==="start"?(p(),f&&typeof h.beat=="number"&&isFinite(h.beat)&&(y(),e.setBeat(h.beat,m(h.at)))):h.kind==="stop"&&f&&e.freeRun(m(h.at)))})}const na="/studio/assets/worklet-BuzpUTR0.js";var Ym="nc-ui",Xm={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},zi={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},ur={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Jm={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Dt={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Qm={light:{color:Xm.color,semantic:zi,component:ur,runtime:Jm},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},Xn=e=>`--${Ym}-${e}`,Go=zi["label-on-fill-dark"],dl=zi["label-on-fill-light"],Zm=Dt["label-min-contrast"],eg=/^#[0-9a-f]{6}$/i,tg=e=>typeof e=="string"&&eg.test(e),Xa=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function ul(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),r=o=>{let s=(o+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${Xa(r(0)*255)}${Xa(r(8)*255)}${Xa(r(4)*255)}`}function Od(e){let[t,n,a]=[1,3,5].map(u=>parseInt(e.slice(u,u+2),16)/255),r=Math.max(t,n,a),o=Math.min(t,n,a),s=(r+o)/2,l=r-o;if(!l)return{h:0,s:0,l:s};let d=l/(1-Math.abs(2*s-1));return{h:((r===t?60*((n-a)/l%6):r===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:d,l:s}}function pl(e){let[t,n,a]=[1,3,5].map(r=>{let o=parseInt(e.slice(r,r+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function Wo(e,t){let[n,a]=[pl(e),pl(t)].sort((r,o)=>o-r);return(n+.05)/(a+.05)}var pr=e=>Wo(e,Go)>=Wo(e,dl)?Go:dl;function Bd(e,t,n,a=Zm){let r=ul(e,t,n),o=pr(r)===Go?1:-1;for(let s=0;s<40&&Wo(r,pr(r))<a;s++)n+=o*.01,r=ul(e,t,n);return r}function ng(e){let{h:t,s:n}=Od(e),a=Bd(t,Math.min(n,Dt["surprise-on-max-saturation"]),Dt["surprise-on-lightness"]);return{fill:e,ink:pr(e),on:a,onInk:pr(a)}}var ag=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function rg(e,t=Math.random){let[n,a]=Dt["surprise-saturation"],[r,o]=Dt["surprise-lightness"],s=Dt["surprise-min-hue-gap"],l=tg(e)?Od(e).h:null,d=t()*360;return l!==null&&ag(d,l)<s&&(d=(l+s+t()*(360-2*s))%360),Bd(d,n+t()*(a-n),r+t()*(o-r))}function og(e){if(!e)return null;let t=ng(e);return{[Xn("surprise-fill")]:t.fill,[Xn("surprise-ink")]:t.ink,[Xn("surprise-on")]:t.on,[Xn("surprise-on-ink")]:t.onInk}}var ig=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,sg=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function hl(e){let[t,n,a]=[1,3,5].map(l=>ig(parseInt(e.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),o=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*r+.793617785*o-.0040720468*s,1.9779984951*r-2.428592205*o+.4505937099*s,.0259040371*r+.7827717662*o-.808675766*s]}function lg([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,r=(e-.1055613458*t-.0638541728*n)**3,o=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*r+.2309699292*o,-1.2684380046*a+2.6097574011*r-.3413193965*o,-.0041960863*a-.7034186147*r+1.707614701*o].map(s=>Xa(sg(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var cg=Dt["velocity-range"],_d={min:ur.rhythm["velocity-min"],max:ur.rhythm["velocity-max"]},fl=Object.fromEntries(Object.entries(Qm).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function dg(e,t=_d){let[n,a]=cg,r=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,o=(r-n)/(a-n),s=t.ink??ur.rhythm["step-cell-ink"];if(o<=0)return{velocity:r,t:0,fill:t.min.toUpperCase(),ink:s};if(o>=1)return{velocity:r,t:1,fill:t.max.toUpperCase(),ink:s};let l=hl(t.min),d=hl(t.max);return{velocity:r,t:o,fill:lg(l.map((u,c)=>u+(d[c]-u)*o)),ink:s}}function ml(e,t=_d){return{[Xn("velocity-fill")]:dg(e,t).fill}}var hr="data-nc-theme",Ko="nc-ui-theme-change",ug=Object.freeze(["system","light","dark"]),pg="netcomposer.studio.theme.v1",hg="(prefers-color-scheme: dark)",Oi=e=>e?.documentElement??null,jd=e=>e?.defaultView?.matchMedia?.(hg)??null,Bi=e=>e==="light"||e==="dark"?e:"system";function fg(e=globalThis.document){return Bi(Oi(e)?.getAttribute(hr))}function fr(e=globalThis.document){let t=fg(e);return t!=="system"?t:jd(e)?.matches?"dark":"light"}function _i(e,t=globalThis.document){let n=Oi(t);if(!n)return"light";let a=Bi(e);a==="system"?n.removeAttribute(hr):n.setAttribute(hr,a);let r=fr(t),o=t.defaultView?.CustomEvent;return o&&t.dispatchEvent(new o(Ko,{detail:{choice:a,theme:r}})),r}function qd(e,t=globalThis.document){let n=Oi(t);if(!n)return()=>{};let a=fr(t),r=()=>{let d=fr(t);d!==a&&(a=d,e(d))},o=t.defaultView?.MutationObserver,s=o?new o(r):null;s?.observe(n,{attributes:!0,attributeFilter:[hr]});let l=jd(t);return l?.addEventListener?.("change",r),t.addEventListener(Ko,r),()=>{s?.disconnect(),l?.removeEventListener?.("change",r),t.removeEventListener(Ko,r)}}var mg={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},gg={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},bg={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},yg={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Br={};for(let[e,t]of Object.entries(gg))Br[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(yg))Br[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(bg))Br[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(mg.renames.map(e=>[e.old,e.new]));function Vd(e){let t=Br[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function se(e){return Vd(e).prop}function i(e){return`var(${se(e)})`}function vg(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(se(t)));return Number.isFinite(n)?n:0}function ye(e,t){let n=Vd(t),a=e.ownerDocument??document,r=a.createElement("span");r.dataset.ncLive=t,r.style.position="absolute",r.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=o:r.style.color=o,(e instanceof Element?e:a.documentElement).append(r);let s=(a.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function Hd(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function wg(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=i("font-ui"),n.style.fontSize=i("label-size"),n.style.fontWeight=i("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var xg="[data-modulated], [data-modulated] *",Ud="(orientation: landscape) and (max-height: 500px) and (max-width: 1023px)";function po(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function gl(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${i("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${i("hairline")} solid ${i("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function kg(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${se("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${se("divider")}: ${i(`module-div-stack-${a}`)};
      ${se("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${se("text-sub")}: ${i("module-sub-stack-1")};
      ${se("divider")}: ${i("module-div-stack-1")};
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
${xg} { transition: none; }
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
   ◀ while open, flipped to ▶ while folded; the flip takes motion-press, and reduced motion makes it instant. −/+
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
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
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
  ${se("text-sub")}: ${i("module-sub-stack-1")};
  ${se("divider")}: ${i("module-div-stack-1")};
  ${se("slider-track")}: ${i("module-div-stack-1")};
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
  ${se("text-sub")}: ${i("module-sub-stack-1")};
  ${se("divider")}: ${i("module-div-stack-1")};
  ${se("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${i("control-gap")} ${i("module-pad")};
  padding-bottom: ${i("module-pad")};
  background: ${i("module-bg-stack-1")};
  ${se("text-sub")}: ${i("module-sub-stack-1")};
  ${se("divider")}: ${i("module-div-stack-1")};
  ${se("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${se("text-sub")}: inherit;
  ${se("divider")}: inherit;
  ${se("slider-track")}: inherit;
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
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${se("divider")}: color-mix(in oklab, ${i("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${se("meter-track")}: color-mix(in oklab, ${i("text-sub")} 30%, var(--nc-strip-shade)); }
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
   ▶ in the corner, the name row kept but unseen, M and S stacked over the Inserts and M/S rows, then the name read bottom to top under a small mark in the
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
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${se("divider")}: ${i("strip-divider")}; }
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
${gl("")}
}
@media (max-width: 1023px) {
${gl("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${po("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${po("")}
}
@media (max-width: 1023px) {
${po("html[data-nc-landscape] ")}
}
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
`}var ho=null,$g="nc-ui-fallback";function Gd(e=globalThis.document){if(!e?.documentElement||(e.documentElement,ho&&ho.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${$g} {
${kg()}
}
`,e.head.append(t),ho=t}var Hn=null,Sg=0,Eg=new URL("/studio/assets/confirm-DwyQU4Nn.css",import.meta.url).href,Wd=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Eg,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Wd(document);function tt(e){return Kd(e).then(t=>!!t.ok)}function Kd({title:e,body:t,lines:n=[],extra:a,confirmLabel:r="Confirm",cancelLabel:o="Cancel",danger:s=!1,root:l,returnFocus:d,signal:u},c){if(Hn||u?.aborted)return Promise.resolve({});let p=l?.ownerDocument??document,f=Wd(p),y=l??p.body,m=p.defaultView??globalThis,w=`nc-ui-confirm-${++Sg}`,h=(W,Se,ge)=>{let He=p.createElement(W);return He.className=`nc-ui-confirm${Se}`,ge!=null&&(He.textContent=ge),He},v=h("div","-layer");v.dataset.state="enter";let k=h("div","");k.setAttribute("role","alertdialog"),k.setAttribute("aria-modal","true"),k.setAttribute("aria-labelledby",`${w}-t`);let b=h("h2","-title",e);b.id=`${w}-t`;let S=h("p","-body",t);S.id=`${w}-b`;let E=n.map((W,Se)=>{let ge=h("p","-body",W?.text??W);return ge.id=`${w}-b${Se}`,W?.tone==="danger"&&(ge.dataset.tone="danger"),ge});k.setAttribute("aria-describedby",[S,...E].map(W=>W.id).join(" "));let g=a&&h("button","-extra",a.label);g&&(g.type="button",g.dataset.ncConfirm="extra",g.addEventListener("click",()=>a.onAction?.()));let x=h("div","-actions"),A=(W,Se)=>{let ge=h("button","-btn",W);return ge.type="button",ge.dataset.ncConfirm=Se,ge.addEventListener("click",()=>ve(Se==="ok")),ge},$=A(o,"cancel"),L=A(r,"ok");s&&(L.dataset.danger="true"),x.append($,L);let[C,R]=c?.(h,L)??[];k.append(b,S,...E,...C?[C]:[],...g?[g]:[],x);let _=[R,g,$,L].filter(Boolean);v.append(k);let U={layer:v};Hn=U;let G=d??p.activeElement,re=[];for(let W of y.children)W.hasAttribute("inert")||(W.setAttribute("inert",""),re.push(W));let he=()=>{if(Hn!==U)return;y.append(v),(R??$).focus({preventScroll:!0});let W=m.requestAnimationFrame?.bind(m)??(Se=>setTimeout(Se,16));W(()=>W(()=>{v.dataset.state==="enter"&&(v.dataset.state="open")}))};f?f.then(he):he();let ee=!1;v.addEventListener("pointerdown",W=>{ee=W.target===v}),v.addEventListener("click",W=>{W.target===v&&ee&&ve(!1),ee=!1});let X=W=>{if(W.stopImmediatePropagation(),W.key==="Escape")W.preventDefault(),ve(!1);else if(W.key==="Tab"){W.preventDefault();let Se=_.filter(He=>!He.disabled),ge=Se.length;Se[(Se.indexOf(p.activeElement)+(W.shiftKey?ge-1:1))%ge].focus()}else W.key==="Enter"&&(W.preventDefault(),p.activeElement===g?g.click():p.activeElement===$?ve(!1):L.disabled||ve(!0))},Xe=W=>W.stopImmediatePropagation();m.addEventListener("keydown",X,!0),m.addEventListener("keyup",Xe,!0);let Ve=()=>ve(!1);u?.addEventListener("abort",Ve);let qt,La=new Promise(W=>{qt=W});function ve(W){if(Hn!==U)return;Hn=null,m.removeEventListener("keydown",X,!0),m.removeEventListener("keyup",Xe,!0),u?.removeEventListener("abort",Ve);for(let lt of re)lt.removeAttribute("inert");v.dataset.state="closing",G?.isConnected&&typeof G.focus=="function"&&G.focus({preventScroll:!0});let Se=m.getComputedStyle?.(v),ge=Math.max(0,...String(Se?.transitionDuration??"").split(",").map(lt=>Number.parseFloat(lt)*(lt.trim().endsWith("ms")?1:1e3)||0)),He=()=>v.remove();v.addEventListener("transitionend",lt=>lt.target===v&&He()),setTimeout(He,ge+50),qt({ok:W,value:R?.value.trim()})}return La}function Ag(e){let t=e.field??{};return Kd(e,(n,a)=>{let r=n("label","-field"),o=n("input","-input");o.type=t.type??"text",o.value=t.value??"",t.placeholder&&(o.placeholder=t.placeholder),o.spellcheck=!1,o.autocomplete="off";let s=()=>{a.disabled=o.value.trim()===""};return o.addEventListener("input",s),s(),r.append(n("span","-label",t.label??""),o),[r,o]}).then(n=>n.ok?n.value:null)}function ji(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.dataset.ncOn="",r.textContent=e.onText??"On";let o=t.createElement("span");o.dataset.ncOff="",o.textContent=e.offText??"Off",a.append(r,o),n.append(a);let s=!1,l=u=>{s=u===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let d=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",d),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",d),n.remove()}}}var Yd=new WeakMap,bl=.25;function Mg(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(a,r);let o=0,s=e.step??.005,l=e.onChange,d=e.onReset,u=h=>Math.min(1,Math.max(0,h)),c=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},p=h=>{let v=u(h);v!==o&&(o=v,c(),l?.(v))},f=0,y=!1;n.addEventListener("pointerdown",h=>{if(h.button!==0)return;h.preventDefault(),n.focus?.({preventScroll:!0});let v=n.getBoundingClientRect();h.target!==r&&v.height>0&&p(1-(h.clientY-v.top)/v.height),f=h.clientY,y=!0,n.dataset.dragging="true",n.setPointerCapture?.(h.pointerId)}),n.addEventListener("pointermove",h=>{if(!y)return;let v=n.getBoundingClientRect().height||1,k=(f-h.clientY)/v*(h.shiftKey?bl:1);f=h.clientY,p(o+k)});let m=()=>{y=!1,delete n.dataset.dragging};n.addEventListener("pointerup",m),n.addEventListener("pointercancel",m),n.addEventListener("lostpointercapture",m),n.addEventListener("dblclick",h=>{h.preventDefault(),d?.()}),n.addEventListener("keydown",h=>{let v=h.shiftKey?s*bl:s,k={ArrowUp:o+v,ArrowRight:o+v,ArrowDown:o-v,ArrowLeft:o-v,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};h.key in k&&(h.preventDefault(),p(k[h.key]))});let w={el:n,get value(){return o},get dragging(){return y},set(h){y||(o=u(Number(h)||0),c())},setText(h){h?n.setAttribute("aria-valuetext",h):n.removeAttribute("aria-valuetext")},setLabel(h){n.setAttribute("aria-label",h)},configure(h){typeof h.step=="number"&&h.step>0&&(s=h.step),h.onChange&&(l=h.onChange),h.onReset&&(d=h.onReset)}};return w.setLabel(e.label),w.set(e.value??0),w.setText(e.valueText),Yd.set(n,w),w}function Tg(e){return Yd.get(e)}var Xd=new WeakMap,Lg=.2,Cg=1.5,Ng=.5;function Ig(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function yl(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Ig(a.getComputedStyle(e).getPropertyValue(se(t)),n)}function Fg(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let r=t.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let o=t.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let w=0;w<n;w++){let h=t.createElement("span");h.className="nc-meter-bar";let v=t.createElement("span");v.className="nc-meter-peak";let k=t.createElement("span");k.className="nc-meter-rms";let b=t.createElement("span");b.className="nc-meter-hold",h.append(v,k,b),o.append(h),s.push({peak:v,rms:k,hold:b,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(r,o);let l=e.label,d=e.onClear,u=!1,c=-1,p=-1,f=()=>{r.dataset.lit=u?"true":"false",r.setAttribute("aria-pressed",u?"true":"false"),r.setAttribute("aria-label",u?`${l} clipped: clear`:`${l} clip light`),r.title=u?"Clipped. Click to clear":"Clip light"},y=(w,h,v,k)=>{let b=Math.round(k*1e3)/1e3;v[h]!==b&&(v[h]=b,w.style.transform=h==="hold"?`translateY(${Math.round((1-b)*1e3)/10}%)`:`scaleY(${b})`)};r.addEventListener("click",()=>{m.clear(),d?.()});let m={el:a,get clipped(){return u},update(w,h){c<0&&(c=yl(a,"motion-meter-fall",Lg)),p<0&&(p=yl(a,"motion-meter-hold",Cg));let v=Math.max(0,Math.min(.25,Number(h)||0)),k=c>0?Math.exp(-v/c):0;s.forEach((b,S)=>{let E=w[S]??w[0]??{peak:0,rms:0},g=Math.min(1,Math.max(0,Number(E.peak)||0)),x=Math.min(g,Math.max(0,Number(E.rms)||0));E.over&&m.clip(),b.level.peak=g>=b.level.peak?g:g+(b.level.peak-g)*k,b.level.rms=x>=b.level.rms?x:x+(b.level.rms-x)*k,b.holdAge+=v,g>=b.holdAt?(b.holdAt=g,b.holdAge=0):b.holdAge>p&&(b.holdAt=Math.max(g,b.holdAt-Ng*v)),y(b.peak,"peak",b.shown,b.level.peak),y(b.rms,"rms",b.shown,b.level.rms),y(b.hold,"hold",b.shown,b.holdAt),b.hold.dataset.off=b.holdAt<=.001?"true":"false"})},clip(){u||(u=!0,f())},clear(){u=!1,f()},reset(){for(let w of s)w.level.peak=0,w.level.rms=0,w.holdAt=0,w.holdAge=0,y(w.peak,"peak",w.shown,0),y(w.rms,"rms",w.shown,0),y(w.hold,"hold",w.shown,0),w.hold.dataset.off="true"},setLabel(w){l=w,f()},configure(w){w.onClear&&(d=w.onClear)}};return f(),m.reset(),Xd.set(a,m),m}function Jd(e){return e?Xd.get(e):void 0}var Pg=3,Rg=new Set(["freq","q","rate","time","log"]);function qi(e,t,n){return!e||!Rg.has(e)||!(n>t)?"linear":t>0?"log":"power"}function _r(e,t,n){return qi(e,t,n)!=="linear"}function mr(e,t,n,a){let r=Number(a);if(!(n>t)||!Number.isFinite(r))return 0;let o=Math.min(n,Math.max(t,r)),s=qi(e,t,n);if(s==="log")return Math.log(o/t)/Math.log(n/t);let l=(o-t)/(n-t);return s==="power"?Math.cbrt(l):l}function Qd(e,t,n,a){let r=Math.min(1,Math.max(0,Number(a)||0)),o=qi(e,t,n);return o==="log"?t*(n/t)**r:t+(n-t)*(o==="power"?r**Pg:r)}function Zd(e,t,n,a){let r=Math.min(n,Math.max(t,e));if(a>0){r=t+Math.round((r-t)/a)*a;let o=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));r=Number(r.toFixed(o)),r=Math.min(n,Math.max(t,r))}return r}function Vi(e,t,n,a){return Math.round(mr(e,t,n,a)*1e3)}function Yo(e,t,n,a,r){return Zd(Qd(e,t,n,Number(a)/1e3),t,n,r)}function Dg(e,t,n=!1){let a=Number(e)||0,r=n?1:1e3/100,o=null;return t==="ArrowRight"||t==="ArrowUp"?o=a+r:t==="ArrowLeft"||t==="ArrowDown"?o=a-r:t==="PageUp"?o=a+1e3/10:t==="PageDown"?o=a-1e3/10:t==="Home"?o=0:t==="End"&&(o=1e3),o===null?null:Math.min(1e3,Math.max(0,Math.round(o)))}function eu(e,t,n,a,r,o=!1,s){let l=Vi(e,t,n,a),d=Dg(l,r,o);if(d===null)return null;let u=Yo(e,t,n,d,s),c=Math.sign(d-l),p=Zd(Number(a),t,n,s);for(;c!==0&&u===p&&d>0&&d<1e3;)d+=c,u=Yo(e,t,n,d,s);return u}function vl(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function wl(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function zg(e,t,n,a=n/6){let r=e.some(c=>c===null),o=Math.max(0,n-(r?a:0)),s=e.reduce((c,p,f)=>p===null?c:c+wl(t[f]),0),l=s>0?o/s:0,d=e.map(c=>c===null?0:Math.min(o,wl(c)*l));if(r){let c=d.reduce((f,y)=>f+y,0),p=e.indexOf(null);d[p]=Math.max(a,n-c)}let u=[0];for(let c of d)u.push(Math.round((u[u.length-1]+c)*100)/100);return r&&(u[u.length-1]=n),u}function Og(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(t*a)),o=Math.max(1,Math.floor(n*a));(e.width!==r||e.height!==o)&&(e.width=r,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function Et(e){return Math.max(0,Math.min(1,e))}function tu(e,t){let{ctx:n,w:a,h:r}=Og(e);if(!n)return;n.clearRect(0,0,a,r);let o=wg(e);if(t.paint==="swatch"){let d=ye(e,"accent"),u=ye(e,"rhythm.step-cell-on");e.dataset.ncAccent=d,e.dataset.ncStep=u,n.fillStyle=d,n.fillRect(0,0,a/2,r),n.fillStyle=u,n.fillRect(a/2,0,a/2,r);return}if(t.paint==="filter"&&typeof t.hz=="number"){jg(n,a,r,t,e,o);return}if(t.paint==="filter"){let d=t.mode??"lp",u=ye(e,Hd(d)),c=ye(e,"divider"),p=Et(t.cutoff??.5),f=.08+(1-Et(t.resonance??.2))*.22;n.strokeStyle=c,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(a,r*.72),n.stroke(),n.beginPath();for(let y=0;y<=a;y++){let m=y/Math.max(1,a),w=0;d==="lp"?w=m<p?1:Math.max(0,1-(m-p)/f):d==="hp"?w=m>p?1:Math.max(0,1-(p-m)/f):w=Math.max(0,1-Math.abs(m-p)/f);let h=r*.78-w*r*.62;y===0?n.moveTo(y,h):n.lineTo(y,h)}n.strokeStyle=u,n.stroke(),n.fillStyle=ye(e,"text-sub"),n.font=o,n.fillText(d.toUpperCase(),0,r),e.dataset.ncAccent=u;return}if(t.paint==="envelope"){n.strokeStyle=ye(e,"accent");let d=Math.max(0,t.attack??0),u=Math.max(0,t.decay??.4),[c,p,f]=zg([d,u],t.max??[1,4],a),y=2,m=r-1;n.beginPath(),n.moveTo(c,m),n.lineTo(p,y);let w=Math.max(1,Math.ceil(f-p));for(let h=1;h<=w;h++){let v=h/w;n.lineTo(p+(f-p)*v,m-(m-y)*Math.exp(-4.6*v)*(1-v*.01))}n.lineTo(f,m),n.lineTo(a,m),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let d=Array.isArray(t.peaks)?t.peaks:[],[u,c]=Array.isArray(t.region)?t.region:[0,1],p=ye(e,"accent"),f=ye(e,"text-sub"),y=r/2;n.fillStyle=ye(e,"accent-soft"),n.fillRect(Et(u)*a,0,(Et(c)-Et(u))*a,r),n.strokeStyle=ye(e,"divider"),n.beginPath(),n.moveTo(0,y),n.lineTo(a,y),n.stroke();let m=Math.floor(d.length/2);for(let w=0;w<m;w++){let h=(w+.5)/m*a,v=Math.max(-1,Math.min(1,d[w*2]??0)),k=Math.max(-1,Math.min(1,d[w*2+1]??0)),b=(w+.5)/m;n.strokeStyle=b>=u&&b<=c?p:f,n.beginPath(),n.moveTo(h,y-k*(y-1)),n.lineTo(h,y-v*(y-1)+.5),n.stroke()}n.strokeStyle=p;for(let w of[u,c,...Array.isArray(t.markers)?t.markers:[]]){let h=Math.round(Et(w)*(a-1))+.5;n.beginPath(),n.moveTo(h,0),n.lineTo(h,r),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=ye(e,"text"),n.fillRect(Math.round(Et(t.position)*(a-1)),0,1,r)),m||(n.fillStyle=f,n.font=o,n.fillText(t.empty??"Empty",0,y+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let d=Et(t.level??0);n.fillStyle=ye(e,"divider"),n.fillRect(0,r*.4,a,r*.2),n.fillStyle=ye(e,"accent"),n.fillRect(0,r*.4,a*d,r*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=ye(e,"rhythm.step-cell-off"),n.fillRect(0,r*.45,a,r*.1),n.fillStyle=ye(e,"rhythm.playhead"),n.fillRect(l/s*a,r*.3,Math.max(1,a/s),r*.4),e.dataset.ncAccent=ye(e,"accent")}var aa=20,Xo=2e4,fo=24,xl=-60;function Bg(e,t,n,a,r=48e3){let o=2*Math.PI*Math.min(t,r*.49)/r,s=Math.cos(o),l=Math.sin(o)/(2*n),d,u,c;e==="hp"?[d,u,c]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[d,u,c]=[l,0,-l]:[d,u,c]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,f=-2*s,y=1-l,m=2*Math.PI*a/r,w=(b,S,E)=>b+S*Math.cos(m)+E*Math.cos(2*m),h=(b,S)=>-(b*Math.sin(m)+S*Math.sin(2*m)),v=Math.hypot(w(d,u,c),h(u,c)),k=Math.hypot(w(p,f,y),h(f,y));return k>0?v/k:0}function _g(e,t){return Math.log(Math.max(aa,Math.min(Xo,e))/aa)/Math.log(Xo/aa)*t}function kl(e,t,n){let a=Math.max(xl,Math.min(fo,e));return t+(fo-a)/(fo-xl)*(n-t)}function jg(e,t,n,a,r,o){let s=a.mode??"lp",l=ye(r,Hd(s)),d=ye(r,"divider"),u=ye(r,"text-sub"),c=Number.parseFloat(String(o).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,f=Math.max(p+4,n-c-3),y=a.q??Math.SQRT1_2,m=Math.round(kl(0,p,f))+.5;e.strokeStyle=d,e.lineWidth=1,e.beginPath(),e.moveTo(0,m),e.lineTo(t,m),e.stroke(),e.beginPath();for(let w=0;w<=t;w++){let h=aa*(Xo/aa)**(w/Math.max(1,t)),v=a.open?1:Bg(s,a.hz,y,h,a.sampleRate),k=kl(20*Math.log10(Math.max(1e-5,v)),p,f);w===0?e.moveTo(w,k):e.lineTo(w,k)}if(e.strokeStyle=l,e.stroke(),!a.open){let w=Math.round(_g(a.hz,t))+.5;e.strokeStyle=u,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(w,p),e.lineTo(w,f),e.stroke(),e.setLineDash?.([])}e.fillStyle=u,e.font=o,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",r.dataset.ncAccent=l,r.dataset.ncFilterHz=String(Math.round(a.hz))}function Ze(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let r=n.defaultView.getComputedStyle(a).color;return a.remove(),r}function qg(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var rn=20,ka=2e4,Hi=Math.log(ka/rn),Jo=32,Vg=250,Hg=-100,Ug=1200,Gg=4.5,$l=-6,Wt=-96,Wg=48,Sl=[100,1e3,1e4],Kg=[6,12];function wn(e,t){return Math.log(Math.max(rn,Math.min(ka,e))/rn)/Hi*t}function Ja(e,t){return rn*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Hi)}function zt(e,t,n,a){let r=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*r}function Qo(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var nu=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Yg(e,t,n,a){let r=n?3:1,o=d=>({db:Math.max(-a,Math.min(a,e.db+d*r))}),s=d=>({hz:Math.max(e.minHz??rn,Math.min(e.maxHz??ka,e.hz*2**(d*r/6)))}),l=d=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(d*r)))});switch(t){case"ArrowUp":return o(1);case"ArrowDown":return o(-1);case"ArrowRight":return e.moveHz?s(1):o(1);case"ArrowLeft":return e.moveHz?s(-1):o(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Ui(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function Xg(e,t,n,a,r,o,s,l,d){let u=d?.25:1,c={},p=Math.max(1,o/2-l);if(c.db=Math.max(-s,Math.min(s,t.db-a*u/p*s/Ui(e))),e.moveHz){let f=t.hz*Math.exp(n*u/Math.max(1,r)*Hi);c.hz=Math.max(e.minHz??rn,Math.min(e.maxHz??ka,f))}return c}function Jg(e,t,n,a,r){let o=Math.max(0,n.left)+1,s=Math.min(n.right,r)-1,l=Math.min(t.width*3+a*2,s-o),d=Math.max(o,Math.min(e.left,s-l));return{left:Math.round(d-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var $e=new WeakMap;function Qg(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let r=document.createElement("canvas");r.className="nc-eq-spectrum",r.setAttribute("aria-hidden","true");let o=document.createElement("canvas");o.className="nc-eq-curve",o.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(r,o);for(let d of e.bands)a.append(Zg(n,d,t));a.append(s),a.addEventListener("click",d=>{if(!lu(n)||d.button>0)return;let u=su(n)?.querySelector("[data-nc-max-toggle]");u instanceof HTMLElement&&u.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),$e.set(n,{control:e,cache:null,spec:null,active:null}),ru(n,e),n}function au(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function Zg(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let r=()=>{let u=n(e);return u?.type==="eqGraph"?u:null},o=()=>r()?.bands.find(u=>u.id===t.id)??null,s=null;a.addEventListener("pointerdown",u=>{if(u.button!==0)return;let c=o();c&&(u.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(u.pointerId),s={id:u.pointerId,x:u.clientX,y:u.clientY,start:{hz:c.hz,db:c.db}},a.dataset.drag="true",At(e,t.id))}),a.addEventListener("pointermove",u=>{if(!s||u.pointerId!==s.id)return;let c=r(),p=o(),f=$e.get(e);if(!c||!p||!f?.box)return;let{w:y,h:m,pad:w}=f.box;c.onBand(p.id,Xg(p,s.start,u.clientX-s.x,u.clientY-s.y,y,m,c.range??18,w,u.shiftKey))});let l=u=>{!s||u.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&At(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",u=>{u.preventDefault(),r()?.onReset?.(t.id)}),a.addEventListener("keydown",u=>{let c=r(),p=o();if(!c||!p)return;let f=Yg(p,u.key,u.shiftKey,c.range??18);f&&(u.preventDefault(),f==="reset"?c.onReset?.(p.id):c.onBand(p.id,f),At(e,p.id))});let d=null;return a.addEventListener("wheel",u=>{let c=r(),p=o();if(!c||!p?.moveQ)return;u.preventDefault();let f=u.timeStamp;(!d||f-d.t>400)&&(d={q:p.q,t:f});let y=u.deltaMode===1?u.deltaY*16:u.deltaMode===2?u.deltaY*400:u.deltaY;d.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,d.q*2**(-y/240))),d.t=f,c.onBand(p.id,{q:d.q}),At(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>At(e,t.id)),a.addEventListener("focus",()=>At(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&At(e,null)}),a.addEventListener("blur",()=>{s||At(e,null)}),a}function At(e,t){let n=$e.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?Tn(e):Gi(e)}function Gi(e){let t=$e.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(m=>m.id===t.active):null;for(let m of e.querySelectorAll(".nc-eq-node"))m instanceof HTMLElement&&(a&&m.dataset.band===a.id?m.dataset.active="true":delete m.dataset.active);if(!a||!t.box){n.hidden=!0;return}let r=[a.label,nu(a.db)];a.kind==="peak"?r.push(Qo(a.hz),`Q ${a.q.toFixed(1)}`):r.push(`${a.kind==="lowshelf"?"below":"above"} ${Qo(a.hz)}`),n.textContent=r.join(" · "),n.dataset.tone=String(eb(t.control,a)),n.hidden=!1;let{w:o,h:s,pad:l}=t.box,d=wn(a.hz,o),u=zt(a.db*Ui(a),s,t.control.range??18,l),c=n.offsetWidth,p=n.offsetHeight,f=Math.max(0,Math.min(o-c,d-c/2)),y=u-p-l*1.5>=0?u-p-l*1.5:Math.min(s-p,u+l*1.5);n.style.left=`${Math.round(f)}px`,n.style.top=`${Math.round(y)}px`}function eb(e,t){return e.bands.indexOf(t)%3+1}function ru(e,t){let n=$e.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Wi(e);let a=t.range??18;t.bands.forEach((r,o)=>{let s=au(e,r.id);s instanceof HTMLElement&&(s.dataset.tone=String(o%3+1),s.dataset.kind=r.kind,s.setAttribute("aria-label",`${r.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(r.db)),s.setAttribute("aria-valuetext",r.valueText??`${nu(r.db)}, ${Qo(r.hz)}`),s.setAttribute("aria-keyshortcuts",r.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),r.help?s.setAttribute("data-nc-help",r.help):s.removeAttribute("data-nc-help"))}),Tn(e),ib(e)}function ou(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.round(t*a)),o=Math.max(1,Math.round(n*a));(e.width!==r||e.height!==o)&&(e.width=r,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function iu(e){return{curve:Ze(e,"eq-curve"),fill:Ze(e,"eq-fill"),quiet:Ze(e,"text-sub"),grid:Ze(e,"eq-grid"),zero:Ze(e,"divider"),label:Ze(e,"text-sub"),spectrum:Ze(e,"eq-spectrum"),bands:[Ze(e,"eq-band-1"),Ze(e,"eq-band-2"),Ze(e,"eq-band-3")]}}function tb(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Tn(e){$e.has(e)&&Wi(e);let t=$e.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:r,w:o,h:s}=ou(n);if(!r)return;let l=Math.max(8,Math.round(s*.06)),d=a.range??18;t.box={w:o,h:s,pad:l},t.colours=iu(e);let u=t.colours,c=tb(a,o);if(!t.cache||t.cache.key!==c){let S=Math.max(64,Math.ceil(o)+1),E=new Float64Array(S);for(let x=0;x<S;x++)E[x]=Ja(x/(S-1)*o,o);let g=null;try{g=typeof a.response=="function"?a.response(E):null}catch{g=null}t.cache={key:c,freqs:E,total:g?.total??new Float64Array(S),bands:g?.bands??[]}}r.clearRect(0,0,o,s);let p=qg(e),f=a.on!==!1;nb(r,o,s,d,l,u,p);let{freqs:y,total:m,bands:w}=t.cache,h=Array.from(y,S=>wn(S,o)),v=zt(0,s,d,l);w.forEach((S,E)=>{if(!S||!S.some(A=>Math.abs(A)>.05))return;let g=f?u.bands[E%3]:u.quiet,x=Array.from(S,A=>zt(A,s,d,l));r.save(),t.active&&a.bands[E]?.id===t.active&&(r.globalAlpha=.14,r.fillStyle=g,El(r,h,x,v)),r.globalAlpha=f?.75:.4,r.strokeStyle=g,r.lineWidth=.75,mo(r,h,x),r.restore()});let k=Array.from(m,S=>zt(S,s,d,l)),b=f?u.curve:u.quiet;r.save(),r.fillStyle=f?u.fill:u.quiet,r.globalAlpha=f?.2:.08,El(r,h,k,v),r.restore(),r.save(),r.strokeStyle=f?u.fill:b,r.lineJoin="round",r.lineCap="round",f&&(r.globalAlpha=.16,r.lineWidth=4,mo(r,h,k)),r.globalAlpha=1,r.strokeStyle=b,r.lineWidth=1.25,mo(r,h,k),r.restore(),ab(e),Gi(e)}function nb(e,t,n,a,r,o,s){e.save(),e.lineWidth=1;for(let d=10;d<=1e4;d*=10)for(let u=1;u<=9;u++){let c=d*u;if(c<rn||c>ka)continue;let p=Math.round(wn(c,t))+.5;e.globalAlpha=Sl.includes(c)?.9:.35,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let d of Kg)if(!(d>a))for(let u of[1,-1]){let c=Math.round(zt(d*u,n,a,r))+.5;e.globalAlpha=d===12?.75:.4,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(0,c),e.lineTo(t,c),e.stroke()}e.globalAlpha=1,e.strokeStyle=o.zero;let l=Math.round(zt(0,n,a,r))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=o.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let d of Sl){let u=d>=1e3?`${d/1e3}k`:String(d),c=e.measureText(u).width,p=wn(d,t)+3;e.fillText(u,p+c+2>t?wn(d,t)-c-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let d of[12,0,-12]){if(Math.abs(d)>a)continue;let u=zt(d,n,a,r);e.fillText(d>0?`+${d}`:d<0?`−${-d}`:"0",t-3,Math.round(u)-1)}e.restore()}function gr(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let r=(t[a]+t[a+1])/2,o=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],r,o)}e.lineTo(t[t.length-1],n[n.length-1])}function mo(e,t,n){e.beginPath(),gr(e,t,n),e.stroke()}function El(e,t,n,a){e.beginPath(),gr(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function su(e){return e.closest("[data-nc-maxable]")}function lu(e){let t=su(e);return!!t&&!t.hasAttribute("data-nc-max")}function Wi(e){let t=lu(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=$e.get(e);n?.active&&(n.active=null,Gi(e))}return t}function ab(e){Wi(e);let t=$e.get(e);if(!t?.box)return;let{w:n,h:a,pad:r}=t.box,o=t.control.range??18;for(let s of t.control.bands){let l=au(e,s.id);l instanceof HTMLElement&&(l.style.left=`${wn(s.hz,n).toFixed(1)}px`,l.style.top=`${zt(s.db*Ui(s),a,o,r).toFixed(1)}px`)}}function rb(e,t,n,a){let r=a/2/n,o=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let d=0;d<e;d++){let u=(d-.5)/(e-1)*t,c=(d+.5)/(e-1)*t,p=Ja(u,t),f=Ja(c,t),y=Ja(d/(e-1)*t,t);o[d]=Math.min(n-1,p/r),s[d]=Math.min(n-1,f/r),l[d]=Gg*Math.log2(y/1e3)}return{lo:o,hi:s,tilt:l}}function ob(e,t,n){let a=Math.floor(t),r=Math.ceil(n);if(r-a<=1){let s=t-a,l=e[a]??-1/0,d=e[Math.min(e.length-1,a+1)]??l;return l+(d-l)*s}let o=-1/0;for(let s=a;s<=r&&s<e.length;s++)e[s]>o&&(o=e[s]);return o}function ib(e){let t=$e.get(e);if(t){if(!t.control.spectrum){du(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let r=$e.get(e)?.spec;r&&(r.visible=a.some(o=>o.isIntersecting),Zo(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Zo(e)}}function Zo(e){let t=$e.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){cu(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=ei(e),n.onVis||(n.onVis=()=>Zo(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&ti(e,!1)}function ei(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function ti(e,t){let n=$e.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,go(e,ei(e))),Vg):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(r=>(n.raf=0,go(e,r))):n.timer=a.setTimeout(()=>(n.timer=0,go(e,ei(e))),Jo))}function cu(e){let t=$e.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function du(e){let t=$e.get(e)?.spec;if(!t)return;cu(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=$e.get(e);n&&(n.spec=null)}function go(e,t){let n=$e.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){du(e);return}if(!a.analyser)return;if(t-a.last<Jo-4&&!a.idle){ti(e,!1);return}let r=a.last?Math.min(.25,(t-a.last)/1e3):Jo/1e3;a.last=t;let o=e.querySelector(".nc-eq-spectrum");if(!(o instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:d}=ou(o);if(!s)return;let u=Math.max(16,Math.round(l/2)),c=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==u||a.map.w!==l||a.map.sr!==c)&&(a.map={cols:u,w:l,sr:c,...rb(u,l,a.buf.length,c)},a.disp=new Float32Array(u).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,f=Wg*r,{lo:y,hi:m,tilt:w}=a.map;for(let v=0;v<u;v++){let k=ob(a.buf,y[v],m[v]);k>p&&(p=k);let b=k+w[v],S=a.disp[v]-f;a.disp[v]=b>S?b:S}p>Hg&&(a.loud=t);let h=t-a.loud>Ug;s.clearRect(0,0,l,d),(!h||a.disp.some(v=>v>Wt))&&sb(s,l,d,a.disp,n.colours??iu(e)),a.idle=h&&!a.disp.some(v=>v>Wt),ti(e,a.idle)}function sb(e,t,n,a,r){let o=a.length,s=new Array(o),l=new Array(o),d=u=>{let c=a[Math.max(0,Math.min(o-1,u))];return Number.isFinite(c)?c:Wt};for(let u=0;u<o;u++){let c=d(u)*.36+(d(u-1)+d(u+1))*.22+(d(u-2)+d(u+2))*.1,p=(Math.max(Wt,Math.min($l,Number.isFinite(c)?c:Wt))-Wt)/($l-Wt);s[u]=u/(o-1)*t,l[u]=n-p*n}e.save(),e.fillStyle=r.spectrum,e.globalAlpha=.13,e.beginPath(),gr(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=r.spectrum,e.lineWidth=1,e.beginPath(),gr(e,s,l),e.stroke(),e.restore()}var je=new WeakMap,lb=450,cb=6,db=33,bo=24,ub="http://www.w3.org/2000/svg";function pb(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function hb(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function fb(e,t,n,a,r){let o=e.slice();if(t===a)return o[a]=r,o;let s=t<a?1:-1;for(let l=t;l!==a+s;l+=s){let d=(l-t)/(a-t);o[l]=Math.round((n+(r-n)*d)*100)/100}return o}function mb(e,t){let n=e.steps[t],a=(e.shapes??[]).find(o=>o.value===n.shape),r=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${a?`, ${a.label}`:""}${r}`}function Kt(e,t){let n=document.createElementNS(ub,e);for(let[a,r]of Object.entries(t))n.setAttribute(a,String(r));return n}function uu(e){let t=Kt("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(Kt("path",{d:e})),t}function gb(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-lsteps-plot",a.tabIndex=0,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical"),a.setAttribute("aria-valuemin","0"),a.setAttribute("aria-valuemax","100"),a.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let r=document.createElement("div");r.className="nc-lsteps-axis",r.setAttribute("aria-hidden","true");let o=document.createElement("div");o.className="nc-lsteps-shapes",o.setAttribute("role","tablist");let s=document.createElement("div");s.className="nc-lsteps-pick",s.setAttribute("role","menu"),s.hidden=!0,n.append(a,r,o,s);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let d={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return je.set(n,d),yb(n,a),vb(n,s),pu(n,e),n}function Ge(e){let t=je.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function bb(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function yo(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),a=bb(e);return{i:hb(t.clientX,a),level:pb(t.clientY-n.top,n.height)}}function yb(e,t){let n=je.get(e),a=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",o=>{let s=Ge(e);if(!s||o.button>0||!s.steps.length)return;o.preventDefault(),br(e),t.setPointerCapture?.(o.pointerId);let l=yo(t,o),d=s.steps.map(u=>u.level);n.drag={id:o.pointerId,x:o.clientX,y:o.clientY,start:d,levels:d,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,Al(e,l.i,l.level,l.i,l.level,!1),a(),n.timer=setTimeout(()=>{n.timer=0;let u=n.drag;!u||u.moved||(u.long=!0,Ge(e)?.onLevels(u.start.slice(),!0),vo(e,u.i))},lb)}),t.addEventListener("pointermove",o=>{let s=n.drag;if(!s||s.id!==o.pointerId||s.long||!s.moved&&Math.hypot(o.clientX-s.x,o.clientY-s.y)<cb)return;s.moved=!0,a();let l=yo(t,o);Al(e,s.i,s.level,l.i,l.level,!1),s.i=l.i,s.level=l.level});let r=o=>{let s=n.drag;!s||s.id!==o.pointerId||(a(),n.drag=null,t.releasePointerCapture?.(o.pointerId),s.long||Ge(e)?.onLevels(s.levels.slice(),!0),ni(e,-1))};t.addEventListener("pointerup",r),t.addEventListener("pointercancel",o=>{let s=n.drag;!s||s.id!==o.pointerId||(a(),n.drag=null,s.long||Ge(e)?.onLevels(s.start.slice(),!0),ni(e,-1))}),t.addEventListener("contextmenu",o=>{Ge(e)?.onShape&&(o.preventDefault(),vo(e,yo(t,o).i))}),t.addEventListener("keydown",o=>{let s=Ge(e);if(!s||!s.steps.length)return;let l=s.steps.length,d=Math.min(n.focus,l-1),u=s.steps[d].level,c=p=>{let f=s.steps.map(y=>y.level);f[d]=Math.round(Math.max(0,Math.min(1,p))*100)/100,s.onLevels(f,!0)};switch(o.key){case"ArrowLeft":n.focus=(d-1+l)%l;break;case"ArrowRight":n.focus=(d+1)%l;break;case"ArrowUp":c(u+(o.shiftKey?.01:.05));break;case"ArrowDown":c(u-(o.shiftKey?.01:.05));break;case"PageUp":c(u+.25);break;case"PageDown":c(u-.25);break;case"Home":c(1);break;case"End":c(0);break;case"Enter":case" ":if(!s.onShape)return;vo(e,d);break;default:return}o.preventDefault(),ai(e)}),t.addEventListener("focus",()=>ai(e)),t.addEventListener("blur",()=>{for(let o of t.querySelectorAll("[data-focus]"))o.removeAttribute("data-focus")})}function Al(e,t,n,a,r,o){let s=je.get(e).drag;s&&(s.levels=fb(s.levels,t,n,a,r),ni(e,a,s.levels[a]),Ge(e)?.onLevels(s.levels.slice(),o))}function ni(e,t,n){for(let a of e.querySelectorAll(".nc-lsteps-step"))Number(a.dataset.i)===t?(a.dataset.dragging="true",a.dataset.level=`${Math.round(n*100)}%`):a.removeAttribute("data-dragging")}function ai(e){let t=je.get(e),n=e.querySelector(".nc-lsteps-plot"),a=Ge(e);if(!n||!a)return;for(let o of n.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===t.focus?o.dataset.focus="true":o.removeAttribute("data-focus");let r=Math.min(t.focus,a.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((a.steps[r]?.level??0)*100))),n.setAttribute("aria-valuetext",mb(a,r))}function vb(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),br(e,!0);return}let a=[...t.querySelectorAll("button")],r=a.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),a[(r+1)%a.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),a[(r-1+a.length)%a.length]?.focus())}),je.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&br(e)}}function vo(e,t){let n=Ge(e),a=e.querySelector(".nc-lsteps-pick"),r=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!a||!r)return;let o=je.get(e);o.focus=t,a.textContent="";let s=document.createElement("span");s.className="nc-lsteps-pick-head",s.textContent=`Step ${t+1}`,a.append(s);for(let y of n.shapes??[]){let m=document.createElement("button");m.type="button",m.setAttribute("role","menuitemradio"),m.setAttribute("aria-checked",n.steps[t]?.shape===y.value?"true":"false"),y.icon&&m.append(uu(y.icon)),m.append(document.createTextNode(y.label)),m.addEventListener("click",()=>{Ge(e)?.onShape?.(t,y.value),br(e,!0)}),a.append(m)}a.setAttribute("aria-label",`Shape of step ${t+1}`),a.hidden=!1,e.ownerDocument.addEventListener("pointerdown",o.outside,!0);let l=r.querySelector(`.nc-lsteps-step[data-i="${t}"]`),d=e.getBoundingClientRect(),u=l?.getBoundingClientRect(),c=a.getBoundingClientRect().width,p=u?u.left+u.width/2-d.left:0,f=Math.max(0,Math.min(d.width-c,p-c/2));a.style.setProperty("--nc-lsteps-pick-x",`${Math.round(f)}px`),a.querySelector('[aria-checked="true"]')?.focus?.()??a.querySelector("button")?.focus?.()}function br(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",je.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function wb(e,t){let n=je.get(e),a=e.querySelector(".nc-lsteps-plot"),r=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,a.textContent="",r.textContent="";for(let o=0;o<t;o++){let s=document.createElement("div");s.className="nc-lsteps-step",s.dataset.i=String(o),o%4===0&&o>0&&(s.dataset.beat="true");let l=Kt("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(Kt("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),Kt("path",{class:"nc-lsteps-env",d:""}),Kt("path",{class:"nc-lsteps-top",d:""}),Kt("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),s.append(l),a.append(s);let d=document.createElement("span");o%4===0&&(d.textContent=String(o+1)),o%4===0&&o>0&&(d.dataset.beat="true"),r.append(d)}}}function pu(e,t){let n=je.get(e);if(!n)return;n.control=t;let a=t.steps.length;wb(e,a),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let r=e.querySelector(".nc-lsteps-plot");r.setAttribute("aria-label",t.label??"Steps");let o=Math.max(.5,Math.min(.75,t.swing??.5)),s=r.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((y,m)=>{let w=s[m];if(!w)return;let h=String((m%2?1-o:o)*2);w.style.setProperty("--nc-lsteps-grow",h),l[m]?.style.setProperty("--nc-lsteps-grow",h),t.played!==void 0&&m>=t.played?w.dataset.out="true":w.removeAttribute("data-out"),w.dataset.zero=y.level<=0?"true":"false";let v=Math.max(0,Math.min(1,y.level)),k=w.querySelector(".nc-lsteps-level");k.setAttribute("y",String(100-v*100)),k.setAttribute("height",String(v*100));let b=t.curve?t.curve(m,bo):null,S="M0 100",E="";for(let g=0;g<=bo;g++){let x=b?Math.max(0,Math.min(1,b[g]??v)):v,A=g/bo*100,$=100-x*100;S+=` L${A.toFixed(2)} ${$.toFixed(2)}`,E+=`${g?" L":"M"}${A.toFixed(2)} ${$.toFixed(2)}`}w.querySelector(".nc-lsteps-env").setAttribute("d",`${S} L100 100 Z`),w.querySelector(".nc-lsteps-top").setAttribute("d",E)});let d=e.querySelector(".nc-lsteps-shapes"),u=(t.shapes??[]).map(y=>`${y.value}:${y.label}`).join();if(u!==n.shapeKey){n.shapeKey=u,d.textContent="";for(let y of t.shapes??[]){let m=document.createElement("button");m.type="button",m.className="nc-lsteps-shape",m.setAttribute("role","tab"),m.dataset.shape=String(y.value),y.icon&&m.append(uu(y.icon)),m.append(document.createTextNode(y.label)),m.addEventListener("click",()=>Ge(e)?.onShapeAll?.(y.value)),d.append(m)}}d.hidden=!(t.shapes?.length&&t.onShapeAll),d.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let c=t.played??a,p=t.steps[0]?.shape,f=t.steps.slice(0,c).every(y=>y.shape===p);for(let y of d.querySelectorAll(".nc-lsteps-shape")){let m=f&&y.dataset.shape===String(p);y.setAttribute("aria-selected",m?"true":"false"),y.tabIndex=m||!f&&y===d.firstElementChild?0:-1}n.focus>=a&&(n.focus=0),ai(e),n.last=-2,xb(e)}function xb(e){let t=je.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&wo(e,null);return}let a=0,r=o=>{if(t.loop=0,!e.isConnected||!t.control.playhead){wo(e,null);return}o-a>=db&&(a=o,wo(e,t.control.playhead())),t.loop=n.requestAnimationFrame(r)};t.loop=n.requestAnimationFrame(r)}function wo(e,t){let n=je.get(e),a=t&&Number.isInteger(t.step)?t.step:-1,r=!!t?.locked;if(!(n.last===a&&n.lastLocked===r)){n.last=a,n.lastLocked=r;for(let o of e.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===a?(o.dataset.playhead="true",o.dataset.locked=r?"true":"false"):(o.removeAttribute("data-playhead"),o.removeAttribute("data-locked"));e.dataset.free=t&&!r?"true":"false"}}var kb=.8912509381337456,ri=32,$b=250,Sb=1200,Eb=.2,hu=1.5;function Ab(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function Mb(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let r=e.createElement("span");r.className="nc-fx-level-fill",a.append(r),t.append(a)}return t}var yr=new WeakMap,Ml=new WeakMap;function Tl(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let r=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),o=Number.parseFloat(r);return Number.isFinite(o)?r.endsWith("ms")?o/1e3:o:n}function Tb(e){let t=Ml.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(r=>{for(let o of r){let s=yr.get(o.target);s&&(s.seen.set(o.target,o.isIntersecting),ra(s))}gn(t)})),e.addEventListener("visibilitychange",()=>{for(let r of t.recs)ra(r);gn(t)}),Ml.set(e,t),t}var fu=e=>e.els.some(t=>t.isConnected);function Lb(e){if(!e.loop.io)return fu(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function ra(e){let t=!e.dead&&!!e.source&&Lb(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Ki(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),si(e))}function Ki(e){return e.doc.defaultView?.performance?.now()??Date.now()}function gn(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){mu(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Ki(e)),!e.raf&&!e.timer&&oi(e,!1)}function oi(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>Ll(e,Ki(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),$b):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(r=>(e.raf=0,Ll(e,r))):e.timer=n.setTimeout(()=>(e.timer=0,a()),ri)}function mu(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Ll(e,t){if(t-e.last<ri-4&&!e.idle&&e.last){oi(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):ri/1e3;e.last=t,e.frames++;let a=!1,r=!1;for(let o of e.recs){if(!fu(o)){(o.placed||e.frames-o.born>90)&&gu(o);continue}o.placed=!0,o.open&&(r=!0,Cb(o,n,t)&&(e.loud=t),(o.disp[0]>0||o.disp[1]>0)&&(a=!0))}if(!r){mu(e);return}e.idle=t-e.loud>Sb&&!a,oi(e,e.idle)}function Cb(e,t,n){if(e.fall<0){let f=e.els[0];e.fall=Tl(f,"motion-meter-fall",Eb),e.hold=Tl(f,"motion-meter-hold",hu)}let a=null;try{a=e.source.read()}catch{a=null}let r=typeof a=="number",o=r?a:Number(a?.in)||0,s=!r&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,d=s?"2":"1";if(e.rows!==d){e.rows=d;for(let f of e.els)f.dataset.ncRows=d}let u=e.fall>0?Math.exp(-t/e.fall):0,c=[o,l],p=!1;for(let f=0;f<2;f++){let y=Ab(c[f]);y>0&&(p=!0),e.disp[f]=y>=e.disp[f]?y:y+(e.disp[f]-y)*u,e.disp[f]<.001&&(e.disp[f]=0),c[f]>=kb&&(e.clipAt[f]=n);let m=e.clipAt[f]>0&&n-e.clipAt[f]<e.hold*1e3;ii(e,f,e.disp[f],m)}return p}function ii(e,t,n,a){let r=Math.round(n*1e3)/1e3,o=a?"true":"false";if(!(e.shown[t]===r&&e.clipShown[t]===o)){e.shown[t]=r,e.clipShown[t]=o;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${r})`,l.dataset.clip=o)}}}function si(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,ii(e,0,0,!1),ii(e,1,0,!1)}function gu(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),yr.get(t)===e&&yr.delete(t)}function Nb(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,r=Tb(a),o={els:n,source:t??null,loop:r,open:!1,dead:!1,seen:new Map,born:r.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:hu,rows:""};for(let s of n)yr.set(s,o),r.io?.observe(s);if(r.recs.add(o),si(o),!r.io){let s=a.defaultView,l=()=>{ra(o),gn(r)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!o.dead){if(l===o.source){ra(o),gn(r);return}o.open&&(o.open=!1,o.source?.close?.(),si(o)),o.source=l,ra(o),gn(r)}},destroy(){o.dead||gu(o),gn(r)}}}var bu={slop:8,longPressMs:500,pitchPx:16},Ib=class{constructor(e,t,n=bu){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let r=this.hit(t,n);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let r=t-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-o/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Fb(e,t,n,a=bu){let r=!1,o=0,s=(u,c)=>{let p=e.ownerDocument.elementFromPoint?.(u,c),f=[...e.querySelectorAll(t)],y=p?f.findIndex(h=>h===p||h.contains(p)):-1;if(y>=0)return y;let m=-1,w=Number.POSITIVE_INFINITY;return f.forEach((h,v)=>{if(h.hidden)return;let k=h.getBoundingClientRect();if(c<k.top||c>k.bottom)return;let b=Math.abs(u-(k.left+k.width/2));b<w&&b<=k.width&&(m=v,w=b)}),m},l=new Ib(s,u=>{(u.kind==="paint"||u.kind==="long")&&(r=!0),n(u)},a),d=()=>{o&&clearTimeout(o),o=0};return e.addEventListener("pointerdown",u=>{u.button>0||(r=!1,l.down(u.pointerId,u.clientX,u.clientY,u.timeStamp)&&(d(),o=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",u=>{l.state!=="idle"&&(l.move(u.pointerId,u.clientX,u.clientY,u.timeStamp),l.state!=="pending"&&d())}),e.addEventListener("pointerup",u=>{d(),l.up(u.pointerId,u.clientX,u.clientY,u.timeStamp)}),e.addEventListener("pointercancel",u=>{d(),l.cancel(u.pointerId)}),e.addEventListener("click",u=>{r&&(r=!1,u.stopPropagation(),u.preventDefault())},!0),e.addEventListener("contextmenu",u=>u.preventDefault()),l}var yu="netcomposer.groups.v1";function Yi(){try{return globalThis.localStorage??null}catch{return null}}function vu(e=Yi(),t=yu){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[r,o]of Object.entries(n))typeof o=="boolean"&&a.set(r,o);return a}catch{return new Map}}function Pb(e,t,n,a=yu){let r=vu(e,a);r.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(r)))}catch{}}function Rb(e,t=Yi()){return vu(t).get(e.id)??e.open===!0}function Db(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let r=document.createElement("button");r.type="button",r.className="nc-group-toggle",r.id=`${e.id}-group-toggle`;let o=document.createElement("span");o.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),r.append(o,s,l);let d=document.createElement("div");d.className="nc-group-body",d.id=`${e.id}-group-body`,d.setAttribute("role","group"),d.setAttribute("aria-labelledby",r.id),r.setAttribute("aria-controls",d.id);for(let u of e.controls)d.append(n(u,t));return r.addEventListener("click",()=>{let u=a.dataset.ncOpen!=="true";Pb(Yi(),e.id,u),li(a,u);let c=t(a);c?.type==="group"&&c.onToggle?.(u)}),a.append(r,d),wu(a,e),li(a,Rb(e)),xu(a,e),a}function li(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let r=n?.querySelector(".nc-group-mark");r&&(r.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function wu(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function xu(e,t){wu(e,t)&&li(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),r=t.summary??"";a&&a.textContent!==r&&(a.textContent=r)}var Da="application/x-nc-pad",Cl="http://www.w3.org/2000/svg";function zb(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],r=[];for(let o=0;o<n;o++){let s=Math.floor(o*t/n),l=Math.max(s+1,Math.floor((o+1)*t/n)),d=0,u=0;for(let p=s;p<l;p++)d=Math.min(d,e[2*p]??0),u=Math.max(u,e[2*p+1]??0);let c=n===1?50:o/(n-1)*100;a.push(`${c.toFixed(1)} ${(10-Math.min(1,u)*10).toFixed(2)}`),r.push(`${c.toFixed(1)} ${(10-Math.max(-1,d)*10).toFixed(2)}`)}return`M${a.join("L")}L${r.reverse().join("L")}Z`}function Ob(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((r,o)=>a.append(Bb(n,o,t))),n.append(a),n.addEventListener("keydown",r=>{r.key==="Escape"&&Qa(n)}),$u(n,e),n}function Bb(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let r=document.createElement("span");r.className="nc-padgrid-pad-bar",r.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let d=document.createElementNS(Cl,"svg");d.setAttribute("class","nc-padgrid-pad-wave"),d.setAttribute("viewBox","0 0 100 20"),d.setAttribute("preserveAspectRatio","none"),d.setAttribute("aria-hidden","true");let u=document.createElementNS(Cl,"path");return d.append(u),a.append(r,o,s,l,d),jb(e,a,t,n),o.addEventListener("dblclick",()=>{let c=n(e);c?.type==="padGrid"&&c.onRename&&a.dataset.empty!=="true"&&ku(e,a,t,n)}),a.addEventListener("dragstart",c=>{if(a.dataset.empty==="true"||!c.dataTransfer){c.preventDefault();return}c.dataTransfer.setData(Da,String(t)),c.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",c=>{let p=c.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(Da)||(c.preventDefault(),c.stopPropagation(),c.dataTransfer&&(c.dataTransfer.dropEffect=p.includes(Da)&&!c.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",c=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let f=c.dataTransfer?.getData(Da);if(f!==void 0&&f!==""){c.preventDefault(),c.stopPropagation();let m=Number(f);m!==t&&p.onMove?.(m,t,c.altKey);return}let y=c.dataTransfer?.files?.[0];y&&(c.preventDefault(),c.stopPropagation(),p.onFile?.(t,y))}),a}function _b(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function jb(e,t,n,a){let r=0,o=!1,s=0,l=0,d=()=>{window.clearTimeout(r),r=0};t.addEventListener("pointerdown",u=>{if(u.button!==0)return;o=!1,s=u.clientX,l=u.clientY,d();let c=a(e);c?.type==="padGrid"&&(c.onDown?.(n),!(c.onDown&&u.pointerType==="mouse")&&(r=window.setTimeout(()=>{r=0,o=Nl(e,t,n,a)},450)))}),t.addEventListener("pointermove",u=>{r&&Math.hypot(u.clientX-s,u.clientY-l)>8&&d()});for(let u of["pointerup","pointercancel","pointerleave"])t.addEventListener(u,d);t.addEventListener("contextmenu",u=>{u.preventDefault(),d(),o=Nl(e,t,n,a)}),t.addEventListener("click",()=>{if(o){o=!1;return}_b(e,n,a)})}function Nl(e,t,n,a){let r=a(e);if(r?.type!=="padGrid"||!r.menu)return!1;let o=r.menu(n);if(!o.length)return!1;Qa(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),Qa(e)}),s.addEventListener("click",c=>c.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let c of o){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=c.id,p.textContent=c.label,p.addEventListener("click",()=>{Qa(e);let f=a(e);f?.type==="padGrid"&&(c.id==="rename"&&f.onRename?ku(e,t,n,a):f.onMenu?.(n,c.id))}),l.append(p)}e.append(s,l);let d=e.getBoundingClientRect(),u=t.getBoundingClientRect();return l.style.left=`${u.left-d.left}px`,l.style.top=`${u.bottom-d.top}px`,l.querySelector("button")?.focus(),!0}function ku(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let r=a(e);if(r?.type!=="padGrid")return;let o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=r.nameMax??24,o.value=r.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.top-s.top}px`,o.style.width=`${l.width}px`;let d=!1,u=c=>{if(d)return;d=!0;let p=o.value.trim();o.remove(),t.focus();let f=a(e);c&&p&&f?.type==="padGrid"&&f.onRename?.(n,p)};o.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"?u(!0):c.key==="Escape"&&u(!1)}),o.addEventListener("blur",()=>u(!0));for(let c of["pointerdown","click","dblclick"])o.addEventListener(c,p=>p.stopPropagation());e.append(o),o.focus(),o.select()}function Qa(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function $u(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,r)=>{let o=n[r];if(!(o instanceof HTMLButtonElement))return;let s=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),d=o.querySelector(".nc-padgrid-pad-wave path"),u=o.querySelector(".nc-padgrid-pad-badge");u&&(u.textContent=a.empty?"":a.badge??""),o.draggable=!a.empty,a.empty?(o.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),d?.setAttribute("d","")):(delete o.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=a.hint??""),d?.setAttribute("d",zb(a.peaks))),!a.empty&&a.hint?o.dataset.hint="true":delete o.dataset.hint,a.lane?o.dataset.ncLane=String(a.lane):delete o.dataset.ncLane;let c=t.selected===r;c?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",c?"true":"false"),a.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",a.empty?`Pad ${r+1}, empty: load a sample`:`Pad ${r+1}, ${a.label}${a.hint?`, ${a.hint}`:""}${a.badgeLabel?`, ${a.badgeLabel}`:""}${c?", selected":""}`)})}function Ce(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function jr(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(a,r),n}function Il(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function pa(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var qb=450,Fl=8;function nt(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Vb(e){let t=vg(e,"target-min");return t>0?t:44}function Hb(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=Vb(e),a=n/2,r=t.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<t.length;o++){let s=t[o],l=r[o];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let d=l.left+l.width/2,u=l.top+l.height/2,c=d-a,p=d+a,f=u-a,y=u+a;for(let m=0;m<t.length;m++){if(o===m)continue;let w=r[m];if(!w||w.width===0)continue;let h=w.left+w.width/2,v=w.top+w.height/2;Math.abs(v-u)<a*2&&(h>d?p=Math.min(p,(d+h)/2):h<d&&(c=Math.max(c,(d+h)/2))),Math.abs(h-d)<a*2&&(v>u?y=Math.min(y,(u+v)/2):v<u&&(f=Math.max(f,(u+v)/2)))}c=Math.min(c,l.left),p=Math.max(p,l.right),f=Math.min(f,l.top),y=Math.max(y,l.bottom),s.style.left=`${c-l.left}px`,s.style.top=`${f-l.top}px`,s.style.width=`${Math.max(0,p-c)}px`,s.style.height=`${Math.max(0,y-f)}px`,s.style.transform="none"}}function Su(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Pl(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function nn(e,t){switch(e.type){case"slider":return Ub(e,t);case"select":return Wb(e,t);case"toggle":return Kb(e,t);case"button":return Yb(e,t);case"readout":return Xb(e);case"label":return e0(e);case"note":return Rl(e);case"knob":return a0(e,t);case"choice":return r0(e,t);case"slotRow":return o0(e,t);case"stepGrid":return c0(e,t);case"canvas":return h0(e);case"fx":return k0(e,t);case"eqGraph":return Qg(e,t);case"levelSteps":return gb(e,t);case"group":return Db(e,t,nn);case"strip":return f0(e,t);case"stripAdd":return y0(e,t);case"padGrid":return Ob(e,t);case"moves":return Qb(e,t);default:return Rl({id:"unknown",text:""})}}function Ke(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Mu(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(Eu(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let r=e.querySelector("[data-nc-readout]");r&&(r.textContent=t.valueText??pa(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Il(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")Il(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&Ot(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&t0(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??pa(t.value))}else if(t.type==="choice")Tu(e,t);else if(t.type==="slotRow")Cu(e,t);else if(t.type==="stepGrid")di(e,t);else if(t.type==="padGrid")$u(e,t);else if(t.type==="moves")Au(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&tu(n,t)}else if(t.type==="eqGraph")ru(e,t);else if(t.type==="levelSteps")pu(e,t);else if(t.type==="strip"){Pu(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${an(n.id)}"]`);a instanceof Element&&Ke(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Iu(e,t);else if(t.type==="group"){xu(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${an(n.id)}"]`);a instanceof Element&&Ke(a,n)}}else if(t.type==="fx"){Vu(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${an(n.id)}"]`);a instanceof Element&&Ke(a,n)}}}}function Ub(e,t){let n=jr(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let r=_r(e.taper,e.min,e.max);a.min=String(r?0:e.min),a.max=String(r?1e3:e.max),a.step=String(r?1:e.step),r&&(a.dataset.ncTaper=e.taper),a.value=String(Eu(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let o=l=>r?Yo(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(o(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(o(l))}),r&&a.addEventListener("keydown",l=>{let d=t(a);if(d?.type!=="slider"||a.disabled)return;let u=d.taper??e.taper,c=eu(u,d.min,d.max,d.value,l.key,l.shiftKey,d.step);c!==null&&(l.preventDefault(),a.value=String(Vi(u,d.min,d.max,c)),d.onChange(c),d.onCommit?.(c))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(Gb(e,a,t),s),n.append(Ce()),Ke(n,e),n}function Eu(e){return _r(e.taper,e.min,e.max)?Vi(e.taper,e.min,e.max,e.value):e.value}function Gb(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(nt());let r=o=>{let s=n(t);s?.type==="slider"&&s.onTap?.(o)};return a.addEventListener("pointerdown",o=>{o.button===0&&r(o.timeStamp)}),a.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),r(o.timeStamp))}),a}function Wb(e,t){let n=jr(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let r=null;for(let o of e.options){let s=document.createElement("option");s.value=o.value,s.textContent=o.label,o.disabled&&(s.disabled=!0),o.group?r?.getAttribute("label")!==o.group&&(r=document.createElement("optgroup"),r.setAttribute("label",o.group),a.append(r)):r=null,(r??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let o=t(a);o?.type==="select"&&o.onChange(a.value)}),n.append(a,Ce()),n}function Kb(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(Ce()),Ke(n,e),n}function Yb(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let o=t(n);o?.type==="button"&&o.onPress()}),n.append(Ce()),Ke(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=e.id,r.setAttribute("aria-label","Surprise me"),r.title=e.sparkleTitle??"Surprise me",r.innerHTML=Su(),r.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&Nu(o);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,r),a}function Xb(e){let t=jr(e.id,e.label);return t.append(Ce()),Ke(t,e),t}var Jb=450;function Qb(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let r=document.createElement("div");r.className="nc-moves-row",r.setAttribute("role","group"),r.setAttribute("aria-label",a.label),a.title&&(r.title=a.title);let o=document.createElement("span");o.className="nc-moves-label",o.setAttribute("aria-hidden","true"),o.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let d=document.createElement("button");d.type="button",d.className="nc-moves-btn",d.dataset.ncMove=l.id,d.title=l.title??l.text,d.setAttribute("aria-label",`${a.label} ${l.text}`),d.append(Zb(l.icon)),d.addEventListener("click",()=>{let u=t(n);u?.type==="moves"&&u.onMove(l.id)}),s.append(d)}r.append(o,s),n.append(r)}return Au(n,e),n}function Au(e,t){for(let n of t.groups)for(let a of n.moves){let r=e.querySelector(`[data-nc-move="${an(a.id)}"]`);r instanceof HTMLButtonElement&&(r.disabled=a.disabled===!0)}}function Zb(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function e0(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(Ce()),t}function Rl(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(Ce()),t}function Dl(e){if(typeof e.valueText=="string")return e.valueText;let t=pa(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Mu(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function t0(e,t){let n=mr(t.taper,t.min,t.max,t.value);Mu(e,t.modulated===!0);let a=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(a)),t.bipolar){let r=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(mr(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(a,r))),e.style.setProperty("--knob-to",String(Math.max(a,r)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",Dl(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${Dl(t)}`}function n0(e,t){if(_r(e.taper,e.min,e.max))return eu(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,r=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+r:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-r:null}function a0(e,t){let n=jr(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let r=document.createElement("i");r.className="nc-knob-mark",a.append(r);let o=0,s=0;a.addEventListener("pointerdown",u=>{o=u.clientY;let c=t(a);s=c&&"value"in c?Number(c.value):0,a.setPointerCapture?.(u.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",u=>{if(a.hasPointerCapture&&!a.hasPointerCapture(u.pointerId))return;let c=t(a);if(c?.type!=="knob")return;if(_r(c.taper,c.min,c.max)){let y=mr(c.taper,c.min,c.max,s)-(u.clientY-o)/120;c.onChange(Qd(c.taper,c.min,c.max,y));return}let p=c.max-c.min||1,f=Math.min(c.max,Math.max(c.min,s-(u.clientY-o)*p/120));c.onChange(f)}),a.addEventListener("dblclick",()=>{let u=t(a);u?.type==="knob"&&typeof u.defaultValue=="number"&&u.onChange(u.defaultValue)}),a.addEventListener("keydown",u=>{let c=t(a);if(c?.type!=="knob")return;let p=n0(c,u);p!==null&&(u.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,p))))});let d=n.querySelector("[data-nc-readout]");return n.insertBefore(a,d),n.append(Ce()),Ke(n,e),n}function r0(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let a=document.createElement("span");a.className="nc-label nc-choice-caption",a.setAttribute("aria-hidden","true"),a.textContent=e.caption,n.dataset.ncCaption="",n.append(a)}for(let a of e.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=a.value,r.setAttribute("role","tab"),r.textContent=a.label,r.addEventListener("click",()=>{let o=t(n);o?.type==="choice"&&o.onChange(a.value)}),r.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),d=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")d=(l+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")d=(l-1+s.length)%s.length;else if(o.key==="Home")d=0;else if(o.key==="End")d=s.length-1;else return;let u=s[d];u instanceof HTMLButtonElement&&(o.preventDefault(),u.focus(),u.click())}),n.append(r)}return n.append(Ce()),Tu(n,e),n}function Tu(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function o0(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let c=0;c<e.slots.length;c++){let p=e.slots[c],f=document.createElement("span");f.className="nc-snap-wrap";let y=document.createElement("button");y.type="button",y.className="nc-snap",y.dataset.ncSlot=String(c),y.textContent=p.label,y.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(y,nt()),i0(f,y,n,c,t),a.append(f)}let r=e.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=Su(),r.append(nt()),r.addEventListener("click",()=>{Nu(n);let c=t(n);c?.type==="slotRow"&&c.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let c=t(n);c?.type==="slotRow"&&c.onMorph(Number(l.value))});let d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",o.append(s,d,l);let u=document.createElement("div");return u.className="nc-slot-line",u.append(a,...r?[r]:[]),n.append(u,o,Ce()),Lu(n,t),Cu(n,e),n}function zl(e,t,n,a){let r=n(e);if(r?.type!=="slotRow")return;Jn(e);let o=a.shiftKey?"store":a.altKey?"clear":"recall";r.onSlot(t,o)}function i0(e,t,n,a,r){let o=0,s=0,l=0,d=!1,u=!1,c=!1,p=!1,f=()=>{window.clearTimeout(o),o=0},y=v=>{let k=v.clientX-s,b=v.clientY-l;k*k+b*b>Fl*Fl&&(d=!0,f())},m=()=>{p&&(p=!1,window.removeEventListener("pointermove",y),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",h))},w=v=>{let k=o!==0&&!d&&!u;f(),m(),k&&(c=!0,zl(n,a,r,v))},h=()=>{d=!0,f(),m()};e.addEventListener("pointerdown",v=>{v.button===0&&(m(),u=!1,d=!1,c=!1,s=v.clientX,l=v.clientY,f(),o=window.setTimeout(()=>{o=0,!d&&(u=!0,s0(n,t,a,r))},qb),p=!0,window.addEventListener("pointermove",y),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",h))}),e.addEventListener("contextmenu",v=>v.preventDefault()),e.addEventListener("click",v=>{if(c||u||d){c=!1,u=!1,d=!1;return}zl(n,a,r,v)})}function Lu(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=Ol("Save","store"),r=Ol("Clear","clear");n.append(a,r);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),Jn(e)}),o.addEventListener("click",s=>s.stopPropagation()),e.append(o,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let d=t(e);if(d?.type!=="slotRow")return;let u=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(u,"store"),Jn(e)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(u,"clear"),Jn(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&Jn(e)})}function Ol(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function s0(e,t,n,a){Lu(e,a);let r=e.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let o=e.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function Jn(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Cu(e,t){for(let r of e.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let o=Number(r.dataset.ncSlot),s=t.slots[o];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function Nu(e){let t=e.dataset.ncLastFill||null,n=rg(t);e.dataset.ncLastFill=n;let a=og(n);if(a)for(let[r,o]of Object.entries(a))e.style.setProperty(r,o)}function l0(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,r=o=>{if(a===o)return;a=o,n.setAttribute("aria-pressed",o?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),r(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>r(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||r(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),r(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function c0(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let r=h=>{let v=document.createElement("button");return v.type="button",v.setAttribute("role","radio"),v.textContent=h,a.append(v),v},o=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=h=>{for(let v of[o,s]){let k=v===h;v.setAttribute("aria-checked",k?"true":"false"),v.tabIndex=k?0:-1}};l(o);for(let h of[o,s])h.addEventListener("click",()=>l(h));a.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();let v=s.getAttribute("aria-checked")==="true"?o:s;l(v),v.focus()});let d=document.createElement("div");if(d.className="nc-step-tools",d.append(a),e.onFill&&d.append(l0(n,t)),e.onClear){let h=document.createElement("button");h.type="button",h.className="nc-fill nc-clear",h.dataset.ncClear="",h.textContent=e.clearLabel??"Clear",h.title="Clear every step (Undo takes it back)",h.addEventListener("click",()=>{let v=t(n);v?.type==="stepGrid"&&v.onClear?.()}),d.append(h)}n.append(d);for(let h of e.rows){let v=document.createElement("div");v.className="nc-row",v.dataset.ncRow="";let k=document.createElement("button");k.type="button",k.className="nc-name",k.textContent=h.label,k.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(k.dataset.ncLane=String((h.lane-1)%4+1));let b=!1,S=0;k.addEventListener("pointerdown",x=>{b=!1,!(x.pointerType==="mouse"||x.button!==0)&&(S=window.setTimeout(()=>{let A=t(n);A?.type!=="stepGrid"||!A.selectedRows||(b=!0,A.onSelectRow?.(A.rows.findIndex($=>$.id===h.id),!0))},Jb))});for(let x of["pointerup","pointercancel","pointerleave"])k.addEventListener(x,()=>window.clearTimeout(S));k.addEventListener("contextmenu",x=>{b&&x.preventDefault()}),k.addEventListener("click",x=>{let A=t(n);if(A?.type!=="stepGrid")return;if(b){b=!1;return}let $=A.rows.findIndex(C=>C.id===h.id),L=!!A.selectedRows&&(x.shiftKey||x.metaKey||x.ctrlKey);A.onSelectRow?.($,L)}),k.addEventListener("keydown",x=>d0(n,k,x));let E=[];for(let x of["mute","solo"]){if(!(x==="mute"?e.onMute:e.onSolo))continue;let A=document.createElement("span");A.className="nc-ms-wrap";let $=document.createElement("button");$.type="button",$.className="nc-ms",$.dataset.ncMs=x,$.textContent=x==="mute"?"M":"S",$.setAttribute("aria-label",`${x==="mute"?"Mute":"Solo"} ${h.label}`),A.append($,nt()),A.addEventListener("click",()=>{let L=t(n);if(L?.type!=="stepGrid")return;let C=L.rows.findIndex(R=>R.id===h.id);(x==="mute"?L.onMute:L.onSolo)?.(C)}),E.push(A)}let g=document.createElement("div");g.className="nc-steps";for(let x=0;x<h.steps.length;x++){let A=document.createElement("span");A.className="nc-step-wrap";let $=document.createElement("button");$.type="button",$.className="nc-step",$.dataset.ncStep=`${h.id}:${x}`,$.setAttribute("aria-label",`${h.label} step ${x+1}`),A.append($,nt()),A.addEventListener("click",L=>{let C=t(n);if(C?.type!=="stepGrid")return;let R=C.rows.findIndex(U=>U.id===h.id),_=s.getAttribute("aria-checked")==="true";C.onToggle(R,x,L.shiftKey||_)}),g.append(A)}if(e.onLength&&g.append(u0(n,g,h,t)),v.append(...E,k,g),e.onDice){let x=document.createElement("button");x.type="button",x.className="nc-sparkle nc-row-dice",x.dataset.ncDice=h.id,x.setAttribute("aria-label",`Re-roll ${h.label}`),x.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,x.innerHTML=Pl(),x.append(nt()),x.addEventListener("click",()=>{let A=t(n);A?.type==="stepGrid"&&A.onDice?.(A.rows.findIndex($=>$.id===h.id))}),v.append(x)}v.addEventListener("click",x=>{if(x.target!==v)return;let A=t(n);A?.type==="stepGrid"&&A.onSelectRow?.(A.rows.findIndex($=>$.id===h.id))}),Bl(n,g,".nc-step-wrap",t,s,()=>h.id),n.append(v)}let u=document.createElement("div");u.className="nc-pads-head";let c=(h,v,k)=>{let b=document.createElement("button");return b.type="button",b.className=h,b.textContent=v,k&&b.setAttribute("aria-label",k),b},p=c("nc-pads-step","‹","Previous lane"),f=c("nc-pads-step","›","Next lane"),y=document.createElement(e.onLength?"button":"span");y.className="nc-pads-label",y.setAttribute("aria-live","polite"),e.onLength&&(y.type="button",y.dataset.ncLenToggle="",y.addEventListener("click",()=>{let h=t(n);h?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",di(n,h))}));for(let[h,v]of[[p,-1],[f,1]])h.addEventListener("click",()=>{let k=t(n);if(k?.type!=="stepGrid"||k.rows.length===0)return;let b=k.rows.length;k.onSelectRow?.(((za(k)+v)%b+b)%b)});if(u.append(p,y,f),e.onDice){let h=c("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=Pl(),h.addEventListener("click",()=>{let v=t(n);if(v?.type!=="stepGrid")return;let k=za(v);k>=0&&v.onDice?.(k)}),u.append(h)}if(e.transport){let h=c("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{let v=t(n);v?.type==="stepGrid"&&v.transport?.onToggle()}),u.append(h)}n.append(u);let m=document.createElement("div");m.className="nc-pads",m.setAttribute("role","group");let w=Math.max(0,...e.rows.map(h=>h.steps.length));for(let h=0;h<w;h++){let v=document.createElement("button");v.type="button",v.className="nc-pad",v.dataset.ncPad=String(h),v.textContent=String(h+1),v.addEventListener("click",k=>{let b=t(n);if(b?.type!=="stepGrid")return;let S=za(b);if(S<0)return;if(n.dataset.ncLenMode==="true"){b.onLength?.(S,h+1);return}let E=s.getAttribute("aria-checked")==="true";b.onToggle(S,h,k.shiftKey||E)}),m.append(v)}return Bl(n,m,".nc-pad",t,s,()=>{let h=t(n);return h?.type==="stepGrid"?h.rows[za(h)]?.id:void 0}),n.append(m),n.append(Ce()),di(n,e),n}function za(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function Bl(e,t,n,a,r,o){let s="on",l=!0,d=-1,u=(c,p)=>{let f=c.rows[d]?.steps[p];!f||p>=c.rows[d].length||(c.onSet?c.onSet(d,p,s,l):!!f[s]!==l&&c.onToggle(d,p,s==="accent"))};Fb(t,n,c=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(c.kind!=="paint")return;let f=p.rows.findIndex(y=>y.id===o());f>=0&&p.rows[f].length!==c.pad+1&&p.onLength?.(f,c.pad+1);return}if(c.kind==="paint"){if(c.phase==="start"){let f=o();d=p.rows.findIndex(m=>m.id===f);let y=p.rows[d]?.steps[c.pad];if(!y)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!y[s]}u(p,c.pad)}else if(c.kind==="long"){let f=o(),y=p.rows.findIndex(w=>w.id===f),m=t.querySelectorAll(n)[c.pad];y>=0&&m instanceof HTMLElement&&p.onLongPress?.(y,c.pad,m)}}})}function d0(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],r=a.indexOf(t),o=r;n.key==="ArrowDown"?o=r+1:n.key==="ArrowUp"?o=r-1:n.key==="Home"?o=0:o=a.length-1;let s=a[o];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function u0(e,t,n,a){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(nt());let o=u=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.findIndex(m=>m.id===n.id),f=c.rows[p];if(!f)return;let y=Math.max(1,Math.min(f.steps.length,u));y!==f.length&&c.onLength?.(p,y)},s=u=>{let c=[...t.querySelectorAll(".nc-step")],p=1;return c.forEach((f,y)=>{let m=f.getBoundingClientRect();m.width>0&&u>=m.left+m.width/2&&(p=y+1)}),p},l=u=>o(s(u.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete r.dataset.dragging};return r.addEventListener("pointerdown",u=>{u.button===0&&(u.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),r.addEventListener("keydown",u=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.find(y=>y.id===n.id);if(!p)return;let f={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};u.key in f&&(u.preventDefault(),o(f[u.key]))}),r}var xo=new WeakMap,Oa=new WeakMap;function p0(e){return e?(Oa.has(e)||(Oa.set(e,fr(e)),qd(t=>{Oa.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))ci(n,Number(n.getAttribute("data-nc-velocity")))},e)),Oa.get(e)):"light"}function ci(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:p0(e.ownerDocument),r=n===null?null:`${a} ${n}`;if(!(xo.has(e)&&xo.get(e)===r)){if(xo.set(e,r),n===null){for(let o of Object.keys(ml(1)))e.style.removeProperty(o);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[o,s]of Object.entries(ml(n,fl[a]??fl.light)))e.style.setProperty(o,s)}}function _l(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function di(e,t){let n=t.rows.some(c=>c.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let r=e.querySelector(".nc-pads"),o=t.rows.find(c=>c.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&o&&(s.textContent=l?`${o.label} · ${o.length}`:o.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let d=e.querySelector("[data-nc-pads-dice]");d instanceof HTMLElement&&o&&(d.setAttribute("aria-label",`Re-roll ${o.label}`),d.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let u=e.querySelector("[data-nc-pads-play]");if(u instanceof HTMLElement){let c=!!t.transport?.playing,p=t.transport?.label??(c?"Stop":"Play");u.textContent!==p&&(u.textContent=p),u.setAttribute("aria-pressed",c?"true":"false");let f=t.transport?.ariaLabel;f?u.setAttribute("aria-label",f):u.removeAttribute("aria-label")}if(r instanceof HTMLElement&&o){r.setAttribute("aria-label",`${o.label} steps`),o.lane&&(r.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?r.dataset.silent="true":delete r.dataset.silent;let c=o.length>0?(t.playhead%o.length+o.length)%o.length:-1;for(let p of r.querySelectorAll("[data-nc-pad]")){let f=Number(p.getAttribute("data-nc-pad")),y=o.steps[f];p instanceof HTMLButtonElement&&(p.hidden=!y||!l&&f>=o.length,l&&f>=o.length?p.dataset.out="true":delete p.dataset.out,l&&f===o.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${o.label} step ${f+1}${y?.markLabel?`, ${y.markLabel}`:""}`),_l(p,y),p.setAttribute("aria-pressed",y?.on?"true":"false"),y?.accent?p.dataset.accent="true":delete p.dataset.accent,y?.dim?p.dataset.dim="true":delete p.dataset.dim,ci(p,y?.velocity),t.playhead>=0&&f===c?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let c of t.rows){for(let y=0;y<c.steps.length;y++){let m=c.steps[y],w=e.querySelector(`[data-nc-step="${c.id}:${y}"]`);if(!(w instanceof HTMLButtonElement))continue;let h=w.closest(".nc-row");if(h instanceof HTMLElement){t.selectedRow===c.id?h.dataset.selected="true":delete h.dataset.selected;let S=t.selectedRow!==c.id&&(t.selectedRows??[]).includes(c.id);S?h.dataset.picked="true":delete h.dataset.picked;let E=h.querySelector(".nc-name");E instanceof HTMLElement&&(E.setAttribute("aria-pressed",t.selectedRow===c.id||S?"true":"false"),E.textContent!==c.label&&(E.textContent=c.label,E.setAttribute("aria-label",`Select ${c.label}`))),c.mute||n&&!c.solo?h.dataset.silent="true":delete h.dataset.silent;for(let g of h.querySelectorAll("[data-nc-ms]")){let x=g.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;g.setAttribute("aria-pressed",x?"true":"false")}}w.setAttribute("aria-pressed",m.on?"true":"false");let v=`${c.label} step ${y+1}${m.markLabel?`, ${m.markLabel}`:""}`;w.getAttribute("aria-label")!==v&&w.setAttribute("aria-label",v),_l(w,m),m.accent?w.dataset.accent="true":delete w.dataset.accent,m.dim?w.dataset.dim="true":delete w.dataset.dim,y%4===0?w.dataset.bar="true":delete w.dataset.bar,typeof m.velocity=="number"?(w.dataset.velocity="true",w.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,m.velocity))*100)}%`)):(delete w.dataset.velocity,w.style.removeProperty("--level")),ci(w,m.velocity);let k=t.playhead>=0&&c.length>0?(t.playhead%c.length+c.length)%c.length:-1;y===k?w.dataset.playhead="true":delete w.dataset.playhead;let b=!!t.onLength&&t.selectedRow===c.id;w.hidden=y>=c.length&&!b,y>=c.length&&b?w.dataset.out="true":delete w.dataset.out}let p=e.querySelector(`[data-nc-len="${c.id}"]`),f=e.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&f&&f.nextElementSibling!==p){let y=document.activeElement===p;f.after(p),y&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(c.length)),p.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),p.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function h0(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,Ce()),t}function f0(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let r=document.createElement("span");r.className="nc-strip-name",r.dataset.ncStripName="";let o=!e.master&&typeof e.onFold=="function",s=null;o&&(n.dataset.ncFoldable="",s=Ou(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let b=t(n);b?.type==="strip"&&(b.onFold?.(b.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(r);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let b=document.createElement("span");b.className="nc-strip-grip-dots",b.setAttribute("aria-hidden","true"),l.append(b),l.addEventListener("keydown",S=>{if(S.key!=="ArrowLeft"&&S.key!=="ArrowRight"||S.ctrlKey||S.metaKey||S.shiftKey)return;let E=t(n);E?.type==="strip"&&(S.preventDefault(),E.onMove?.(S.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>Vl(n,l,t))),!e.master&&typeof e.onShade=="function"&&a.addEventListener("contextmenu",b=>{b.pointerType==="touch"||b.pointerType==="pen"||b.target instanceof Element&&b.target.closest("input, .nc-strip-remove")||(b.preventDefault(),Vl(n,a,t,{x:b.clientX,y:b.clientY}))}),e.onRemove){let b=document.createElement("button");b.type="button",b.className="nc-strip-remove",b.dataset.ncStripRemove="",b.textContent="×",b.addEventListener("click",()=>{let S=t(n);S?.type==="strip"&&S.onRemove?.(b)}),a.append(b)}let d=document.createElement("div");if(d.className="nc-strip-hacks",e.onHacks){let b=document.createElement("span");b.className="nc-hacks-wrap";let S=document.createElement("button");S.type="button",S.className="nc-hacks",S.dataset.ncHacks="",b.append(S,nt()),b.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&E.onHacks?.()}),d.append(b)}let u=document.createElement("div");if(u.className="nc-strip-ms",e.onSendsView){let b=document.createElement("span");b.className="nc-hacks-wrap nc-sends-view-wrap";let S=document.createElement("button");S.type="button",S.className="nc-hacks nc-sends-view",S.dataset.ncSendsView="",b.append(S,nt()),b.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&E.onSendsView?.()}),u.append(b)}for(let b of["mute","solo"]){if(!(b==="mute"?e.onMute:e.onSolo))continue;let S=document.createElement("span");S.className="nc-ms-wrap";let E=document.createElement("button");E.type="button",E.className="nc-ms",E.dataset.ncMs=b,E.textContent=b==="mute"?"M":"S",S.append(E,nt()),S.addEventListener("click",()=>{let g=t(n);g?.type==="strip"&&(b==="mute"?g.onMute:g.onSolo)?.()}),u.append(S)}let c=document.createElement("div");c.className="nc-strip-sends";for(let b of e.sends??[])c.append(nn({...b,type:"knob",compact:!0},t));let p=document.createElement("div");p.className="nc-strip-pan",e.pan&&p.append(nn(Xi(e),t));let f=document.createElement("div");f.className="nc-strip-body";let y=document.createElement("span");y.className="nc-scale",y.setAttribute("aria-hidden","true");for(let b of e.ticks??[]){let S=document.createElement("span");S.className="nc-scale-tick",S.style.setProperty("--tick-pos",String(b.value)),S.textContent=b.label,y.append(S)}let m=Mg({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:b=>{let S=t(n);S?.type==="strip"&&S.onChange(b)},onReset:()=>{let b=t(n);b?.type==="strip"&&ql(b)}}),w=Fg({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let b=t(n);b?.type==="strip"&&b.onClipClear?.()}});if(f.append(y,m.el,w.el),o){let b=document.createElement("button");b.type="button",b.className="nc-ui-fx-fold nc-strip-fold",b.dataset.ncStripFold="",b.setAttribute("aria-expanded","false");let S=document.createElement("span");S.className="nc-strip-fold-cap",S.setAttribute("aria-hidden","true");let E=document.createElement("span");E.className="nc-ui-fx-fold-name",E.dataset.ncStripFoldName="";let g=document.createElement("span");g.className="nc-strip-fold-pan",g.setAttribute("aria-hidden","true"),g.hidden=!e.pan,b.append(S,g,E),b.addEventListener("click",()=>{let x=t(n);if(x?.type!=="strip")return;x.onFold?.(!1);let A=n.querySelector("[data-nc-strip-hide]");A instanceof HTMLElement&&A.focus()}),f.prepend(b)}let h=document.createElement("button");h.type="button",h.className="nc-strip-db",h.dataset.ncReadout="";let v=0;h.addEventListener("click",b=>{let S=t(n);S?.type!=="strip"||!S.onTypeIn||(window.clearTimeout(v),b.detail===0?jl(n,h,t):b.detail===1&&(v=window.setTimeout(()=>jl(n,h,t),b0)))}),h.addEventListener("dblclick",()=>{window.clearTimeout(v);let b=t(n);b?.type==="strip"&&ql(b)});let k=document.createElement("div");return k.className="nc-strip-trim",e.trim&&k.append(nn(Ji(e),t)),s&&n.append(s),l&&n.append(l),n.append(a,k,d,u,c,p,f,h,Ce()),Pu(n,e),n}function Xi(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??g0(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function Ji(e){let t=e.trim,n=t.min??-12,a=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:a,step:t.step??.5,value:t.value,valueText:t.valueText??m0(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:r=>t.onChange(r)}}function m0(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function g0(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var b0=250;function jl(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=a.valueText??pa(a.value),r.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(r),r.focus(),r.select?.();let o=!1,s=l=>{if(o)return;o=!0;let d=r.value;if(r.remove(),t.hidden=!1,l){let u=n(e);u?.type==="strip"&&u.onTypeIn?.(d)}t.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function y0(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",a.append(r,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),d=s.value;Fu(s),l?.type==="stripAdd"&&d&&l.onAdd(d)}),n.append(a,s,Ce()),Iu(n,e),n}function Iu(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let r=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],o=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==s&&(a.replaceChildren(...r.map(l=>{let d=document.createElement("option");return d.value=l.value,d.textContent=l.label,d.disabled=l.disabled===!0,d})),Fu(a))}function Fu(e){let t=e.options[0];t&&(t.selected=!0)}function ql(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Pu(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let r=e.querySelector(".nc-fader"),o=r?Tg(r):void 0;o&&(o.configure({step:t.step}),o.set(t.value),o.setText(t.valueText),o.setLabel(`${t.label} level`)),Jd(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let m=t.valueText??pa(t.value);s.textContent!==m&&(s.textContent=m),s.setAttribute("aria-label",`${t.label} level ${m}`);let w=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${w}`:w}for(let m of e.querySelectorAll("[data-nc-ms]")){let w=m.getAttribute("data-nc-ms"),h=w==="mute"?t.mute===!0:t.solo===!0;m.setAttribute("aria-pressed",h?"true":"false"),m.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let m=t.hacksLabel??"Hacks";l.textContent!==m&&(l.textContent=m),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${m}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let d=e.querySelector("[data-nc-sends-view]");if(d){let m=t.sendsViewLabel??"Sends";d.textContent!==m&&(d.textContent=m),d.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),d.setAttribute("aria-label",`${m}: ${t.sendsView===!0?"hide":"show"} the send effects`),d.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),Ot(d,t.sendsViewHelp)}let u=e.querySelector("[data-nc-strip-grip]");u instanceof HTMLElement&&(u.setAttribute("aria-label",`Move ${t.label}`),u.title=t.moveHelp??"Drag to move this channel");let c=Ru(t);if(c?e.dataset.ncShade=String(c):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let m=e.querySelector(`.nc-strip-trim [data-nc-id="${an(t.trim.id)}"]`);m&&Ke(m,Ji(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let m=e.querySelector(`.nc-strip-pan [data-nc-id="${an(t.pan.id)}"]`);m&&Ke(m,Xi(t))}let p=!t.master&&typeof t.onFold=="function"&&t.folded===!0;p?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let f=e.querySelector("[data-nc-strip-hide]");f instanceof HTMLElement&&(Bu(f,p,t.label),Ot(f,t.foldHelp));let y=e.querySelector("[data-nc-strip-fold]");if(y instanceof HTMLElement){y.hidden=!p,y.setAttribute("aria-label",`Expand ${t.label}`);let m=y.querySelector("[data-nc-strip-fold-name]");m&&m.textContent!==t.label&&(m.textContent=t.label),Ot(y,t.foldedHelp??t.foldHelp)}}function Ru(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=Du?t:0}var Du=8,Ba=null;function Vl(e,t,n,a){Ba?.();let r=n(e);if(r?.type!=="strip")return null;let o=e.ownerDocument,s=o.defaultView??globalThis,l=o.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${r.label}: shade and place`);let d=o.createElement("div");d.className="nc-strip-menu-title",d.id=`nc-strip-menu-title-${String(r.id).replace(/[^\w-]/g,"")}`,d.textContent="Shade";let u=o.createElement("div");u.className="nc-strip-menu-shades",u.setAttribute("role","radiogroup"),u.setAttribute("aria-labelledby",d.id);let c=Ru(r),p=e.querySelector("[data-nc-strip-grip]")??t,f=(v=!1)=>{if(Ba!==f)return;Ba=null;let k=l.contains(o.activeElement);l.remove(),o.removeEventListener("keydown",m,!0),o.removeEventListener("pointerdown",w,!0),s.removeEventListener("resize",h),(v||k)&&p?.isConnected&&p.focus?.({preventScroll:!0})},y=[0,...Array.from({length:Du},(v,k)=>k+1)].map(v=>{let k=o.createElement("button");return k.type="button",k.setAttribute("role","radio"),k.setAttribute("aria-checked",v===c?"true":"false"),k.setAttribute("tabindex",v===c?"0":"-1"),k.dataset.ncShadeChoice=String(v),v===0?(k.textContent="Auto",k.setAttribute("aria-label","Auto: alternate light and dark"),k.title="Auto: alternate light and dark"):(k.textContent=String(v),k.setAttribute("aria-label",`Shade ${v}`),k.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${v})`)),k.addEventListener("click",()=>{let b=n(e);f(!0),b?.type==="strip"&&b.onShade?.(v===0?null:v)}),k});if(u.append(...y),u.addEventListener("keydown",v=>{let k=y.indexOf(o.activeElement);if(k<0)return;let b=-1;v.key==="ArrowRight"||v.key==="ArrowDown"?b=(k+1)%y.length:v.key==="ArrowLeft"||v.key==="ArrowUp"?b=(k-1+y.length)%y.length:v.key==="Home"?b=0:v.key==="End"&&(b=y.length-1),!(b<0)&&(v.preventDefault(),y[k].setAttribute("tabindex","-1"),y[b].setAttribute("tabindex","0"),y[b].focus())}),l.append(d,u),typeof r.onMove=="function"){let v=[...e.parentElement?.children??[]].filter(b=>b.classList?.contains("nc-strip")&&!b.hasAttribute("data-nc-master")),k=v.indexOf(e);for(let[b,S,E]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let g=o.createElement("button");g.type="button",g.className="nc-strip-menu-item",g.dataset.ncStripMove=b<0?"left":"right";let x=o.createElement("span");x.textContent=S;let A=o.createElement("kbd");A.textContent=E,A.setAttribute("aria-hidden","true"),g.append(x,A),g.disabled=b<0?k<=0:k<0||k>=v.length-1,g.addEventListener("click",()=>{let $=n(e);f(!0),$?.type==="strip"&&$.onMove?.(b)}),l.append(g)}}o.body.append(l),(()=>{let v=t.getBoundingClientRect?.()??{bottom:0,right:0},k=l.offsetWidth,b=l.offsetHeight,S=s.innerWidth||o.documentElement.clientWidth||k,E=s.innerHeight||o.documentElement.clientHeight||b,g=a?a.x:v.right-k,x=a?a.y:v.bottom+4;g=Math.max(4,Math.min(g,S-k-4)),x+b>E-4&&(x=Math.max(4,(a?a.y:v.top)-b-4)),l.style.left=`${Math.round(g)}px`,l.style.top=`${Math.round(x)}px`})();let m=v=>{if(v.key==="Escape")v.preventDefault(),v.stopPropagation(),f(!0);else if(v.key==="Tab"&&l.contains(o.activeElement)){let k=[...l.querySelectorAll("button:not([disabled])")].filter(S=>S.getAttribute("tabindex")!=="-1"),b=(k.indexOf(o.activeElement)+(v.shiftKey?-1:1)+k.length)%k.length;v.preventDefault(),k[b]?.focus()}},w=v=>{l.contains(v.target)||f(!1)},h=()=>f(!1);return o.addEventListener("keydown",m,!0),o.addEventListener("pointerdown",w,!0),s.addEventListener("resize",h),Ba=f,(y.find(v=>v.getAttribute("tabindex")==="0")??y[0]).focus({preventScroll:!0}),{el:l,close:()=>f(!1)}}function Hl(e,t){let n=e?.querySelector?.(`.nc-strip[data-nc-id="${an(t)}"]`);return Jd(n?.querySelector(".nc-meter")??void 0)}var ui=typeof ResizeObserver=="function"?new ResizeObserver(v0):null;function v0(e){for(let t of e){if(!t.target.isConnected){ui.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&w0(n)}}function w0(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,r=n instanceof HTMLElement?n.offsetHeight:0,o=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+r+o}px`)}function x0(e){if(ui)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))ui.observe(t)}function k0(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let r=typeof e.onFold=="function",o=!!e.meter,s=typeof e.onRemove=="function";if(e.on===void 0&&!r&&!vr(e)&&!o&&!s)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),o&&l.append(ju(n,"head")),e.on!==void 0){let d=ji({checked:e.on,labelledBy:a.id,onChange:u=>{let c=t(d.el);c?.type==="fx"&&c.onToggle?.(u)}});d.el.dataset.ncFxSwitch="",l.append(d.el)}r&&l.append(S0(n,t)),vr(e)&&l.append(T0(n,t)),s&&l.append(L0(t)),n.append(l)}r&&n.prepend(E0(n,t)),o&&qu(n,e);for(let l of e.controls)n.append(nn(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let d=document.createElement("summary");d.textContent=e.moreLabel??"More",l.append(d);for(let u of e.more)l.append(nn(u,t));n.append(l)}return n.append(Ce()),Vu(n,e),x0(n),n}var $0=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function zu(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&$0(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function S0(e,t){let n=Ou();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),zu(e))}),n}function Ou(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Bu(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function E0(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let r=document.createElement("span");r.className="nc-ui-fx-fold-name",r.dataset.ncFxFoldName="";let o=document.createElement("span");return o.className="nc-fold-tri",o.setAttribute("aria-hidden","true"),n.append(o,a,r),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(ju(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),zu(e)}}),n}var Ln=new Set;function Za(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var vr=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),A0="(max-width: 768px)";function M0(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function T0(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(M0()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(_u(e,a,!Ln.has(a.id)),n.focus())}),n}function L0(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function _u(e,t,n){n?Ln.add(t.id):Ln.delete(t.id),Qi(e,t)}function C0(e,t){t?.type==="fx"&&Ln.has(t.id)&&_u(e,t,!1)}function N0(e){return e.ownerDocument.defaultView?.matchMedia?.(A0).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Qi(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=vr(t)&&Ln.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!vr(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Za(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Tn(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",Ot(n,t.maxHelp)),!a){e.dataset.ncMax&&Ul(e);return}if(!e.isConnected){let s=()=>e.isConnected&&Ln.has(t.id)&&Qi(e,t);queueMicrotask(()=>{e.isConnected?s():Za(e.ownerDocument,s)});return}let r=N0(e),o=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;o>0&&e.style.setProperty("--nc-fx-dials",String(o)),e.dataset.ncMax!==r&&(e.dataset.ncMax&&Ul(e),e.dataset.ncMax=r,r==="over"&&I0(e,t)),F0(e.ownerDocument),r==="over"&&Zi(e),Za(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Tn(s)})}function Ul(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Za(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Tn(n)})}function I0(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let r=e.querySelector("[data-nc-fx-max]");r instanceof HTMLElement&&r.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function Zi(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,r=e.ownerDocument.defaultView,o=Number.parseFloat(r?.getComputedStyle(a).columnGap??"")||0,s=Jg(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),o,r?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var Gl=new WeakSet;function F0(e){Gl.has(e)||(Gl.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(r=>r.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&Zi(t)}))}var pi=new WeakMap;function ju(e,t){let n=Mb(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function qu(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let r of n)Ot(r,t.meterHelp);let a=pi.get(e);a?a.set(t.meter):pi.set(e,Nb(n,t.meter))}function Vu(e,t){(t.meter||pi.has(e))&&qu(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let r=typeof t.onFold=="function"&&t.folded===!0;r?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let o=e.querySelector("[data-nc-fx-hide]");o instanceof HTMLElement&&(Bu(o,r,t.title),Ot(o,t.foldHelp)),Qi(e,t);let s=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let d=t.removeLabel??`Remove ${t.title}`;s.hidden=r,s.setAttribute("aria-label",d),s.title=d}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let d=t.on===void 0?"":t.on?"On":"Off";l.hidden=!r,l.setAttribute("aria-label",`Expand ${t.title}${d?`, ${d.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let u=l.querySelector("[data-nc-fx-fold-state]");u&&(u.textContent=d,u.hidden=d==="");let c=l.querySelector("[data-nc-fx-fold-name]");c&&(c.textContent=t.title),Ot(l,t.foldHelp)}}function Ot(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function an(e){return e.replace(/["\\]/g,"\\$&")}function P0(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);a?.type==="canvas"&&tu(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Tn(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&Zi(n);Hb(e)}var R0=Dt["toast-duration"];function D0({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function z0(e,t,n,a){let r=l=>({top:l,bottom:l+n}),o=l=>e.some(d=>d&&d.bottom>l.top&&d.top<l.bottom),s=r(t-a-n);return o(s)?o(r(a))?"bottom":"top":"bottom"}function O0(e,t,n,a,r,o){let s=e.bottom+r,l=Math.max(o,Math.min(e.left,a-o-n.width));for(let d=!0,u=0;d&&u<8;u++){d=!1;for(let c of t)c&&c.bottom>s&&c.top<s+n.height&&c.right>l&&c.left<l+n.width&&(s=c.bottom+r,d=!0)}return{top:s,left:l}}var Wl="data-nc-ui-toast-live";function B0(e,t){let n=t.querySelector(`[${Wl}]`);return n||(n=e.createElement("div"),n.setAttribute(Wl,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function Ft({message:e,actionLabel:t,onAction:n,duration:a=R0,onClose:r,avoid:o=[],anchor:s,host:l,document:d=globalThis.document}={}){l=l??d.body;let u=d.defaultView??globalThis,c=d.createElement("div");c.className="nc-ui-toast",c.setAttribute("data-state","enter");let p=d.createElement("span");p.className="nc-ui-toast-message",p.textContent=e,c.appendChild(p);let f=null;t&&(f=d.createElement("button"),f.type="button",f.className="nc-ui-toast-action",f.textContent=t,c.appendChild(f)),l.appendChild(c);let y="open",m=ee=>ee&&typeof ee.getBoundingClientRect=="function"?ee.getBoundingClientRect():null,w=m(c),h=w?.height||44,v=u.getComputedStyle?.(c),k=Number.parseFloat(v?.getPropertyValue(se("toast-offset")))||16,b=Number.parseFloat(v?.getPropertyValue(se("toast-anchor-gap")))||8,S=m(s),E=u.innerHeight??0,g=o.map(m).filter(Boolean),x=S&&S.bottom>0&&S.top<E?O0(S,g,{width:w?.width||0,height:h},u.innerWidth??0,b,k):null;x&&x.top+h<=E?(c.setAttribute("data-placement","anchor"),c.style.top=`${x.top+(u.scrollY??0)}px`,c.style.left=`${x.left+(u.scrollX??0)}px`):c.setAttribute("data-placement",z0(g,E,h,k));let A=u.requestAnimationFrame?.bind(u)??(ee=>setTimeout(ee,16));A(()=>A(()=>{y==="open"&&c.setAttribute("data-state","open")})),B0(d,l).textContent=D0({message:e,actionLabel:t});let $,L,C=new Promise(ee=>{L=ee}),R=ee=>{clearTimeout($),$=setTimeout(()=>he("timeout"),ee)},_=a,U=Date.now(),G=()=>{y==="open"&&(clearTimeout($),_=Math.max(0,_-(Date.now()-U)))},re=()=>{y==="open"&&(U=Date.now(),R(_))};c.addEventListener("pointerenter",G),c.addEventListener("pointerleave",re),c.addEventListener("focusin",G),c.addEventListener("focusout",re),f?.addEventListener("click",()=>{if(y==="open")try{n?.()}finally{he("action")}}),Number.isFinite(a)&&R(a);function he(ee="close"){if(y!=="open")return;y="closing",clearTimeout($),c.setAttribute("data-state","closing"),r?.(ee);let X=u.getComputedStyle?.(c),Xe=X?Math.max(0,...String(X.transitionDuration||"").split(",").map(qt=>Number.parseFloat(qt)*(qt.trim().endsWith("ms")?1:1e3)||0)):0,Ve=()=>{y!=="gone"&&(y="gone",c.remove(),L(ee))};c.addEventListener("transitionend",Ve),setTimeout(Ve,Xe+50)}return{el:c,close:he,closed:C}}var Kl="data-nc-help";function _0(e,t,n,a=0,r=6,o=8){let s=e.top-r-t.height,l=s>=a+o?"above":"below",d=l==="above"?s:e.bottom+r,u=Math.max(o,Math.min(e.left,n-o-t.width));return{top:Math.round(d),left:Math.round(u),side:l}}var ko=new WeakMap;function j0(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function q0({document:e=globalThis.document,delay:t=1e3}={}){if(!e)return{uninstall(){},hide(){}};let n=ko.get(e);if(n)return n;let a=e.defaultView,r=null,o=null,s,l=!1,d,u=null,c=!1,p=0,f=()=>{clearTimeout(s),c&&!l&&(p=Date.now()+1500),c=!1,r&&(r.hidden=!0,delete r.dataset.pinned)},y=()=>{f(),clearTimeout(d),o=null,u=null,l=!1},m=(x,A)=>{clearTimeout(s),u=A;let $=Date.now()<p?Math.min(t,300):t;s=setTimeout(()=>{o===x&&x.isConnected&&!l&&v(x)&&(c=!0)},$)},w=x=>({x:Number(x.clientX)||0,y:Number(x.clientY)||0}),h=(x,A,$)=>!x||Math.hypot(x.x-A.x,x.y-A.y)>$,v=(x,A)=>{let $=A??x.getAttribute(Kl);if(!$)return!1;r||(r=e.createElement("div"),r.className="nc-ui-help",r.setAttribute("role","tooltip"),r.dataset.testid="nc-help",r.style.position="fixed",r.style.pointerEvents="none",r.style.zIndex="6",e.body.appendChild(r)),r.textContent=$,r.hidden=!1,r.style.visibility="hidden",r.style.top="0px",r.style.left="0px";let L=x.getBoundingClientRect(),C=_0(L,{width:r.offsetWidth,height:r.offsetHeight},a.innerWidth,j0(e));return r.style.top=`${C.top}px`,r.style.left=`${C.left}px`,r.dataset.side=C.side,r.style.visibility="",!0},k=x=>{if(l||x.pointerType==="touch")return;let A=x.target&&x.target.closest?x.target.closest(`[${Kl}]`):null;A!==o&&(y(),!(!A||x.buttons)&&(o=A,m(A,w(x))))},b=x=>{if(l||x.pointerType==="touch"||!o)return;if(x.buttons){f(),u=null;return}let A=w(x);c?h(u,A,8)&&(f(),m(o,A)):h(u,A,4)&&m(o,A)},S=x=>{!l&&!x.relatedTarget&&y()},E=x=>{(l||x.key==="Escape")&&y()};e.addEventListener("pointerover",k),e.addEventListener("pointermove",b,{passive:!0}),e.addEventListener("pointerout",S),e.addEventListener("pointerdown",y,!0),e.addEventListener("keydown",E),a.addEventListener("scroll",y,!0),a.addEventListener("blur",y);let g={hide:y,pin(x,A,{ms:$=0}={}){return y(),!x||!x.isConnected||!v(x,A)?!1:(l=!0,r.dataset.pinned="",$>0&&(d=setTimeout(y,$)),!0)},uninstall(){y(),e.removeEventListener("pointerover",k),e.removeEventListener("pointermove",b),e.removeEventListener("pointerout",S),e.removeEventListener("pointerdown",y,!0),e.removeEventListener("keydown",E),a.removeEventListener("scroll",y,!0),a.removeEventListener("blur",y),r?.remove(),r=null,ko.delete(e)}};return ko.set(e,g),g}var Hu="(max-width: 768px)",V0='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',H0='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',U0=0;function G0({panel:e,button:t,label:n="Menu",media:a=Hu}){let r=e.ownerDocument,o=r.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++U0}`);let s=t??r.createElement("button");t||(s.type="button",s.innerHTML=V0),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function d(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),r.addEventListener("keydown",c,!0),r.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(H0)].find(h=>!h.hidden&&h.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function u({focus:h}={}){if(!l())return;let v=e.contains(r.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),r.removeEventListener("keydown",c,!0),r.removeEventListener("pointerdown",p,!0),(h??v)&&s.focus?.({preventScroll:!0})}function c(h){h.key==="Escape"&&(h.preventDefault(),h.stopPropagation(),u({focus:!0}))}function p(h){let v=h.target;v instanceof o.Node&&(e.contains(v)||s.contains(v))||u({focus:!1})}let f=()=>l()?u({focus:!0}):d(),y=h=>{let v=h.target,k=v instanceof o.Element?v.closest("button"):null;!k||!e.contains(k)||k.closest("[data-nc-menu-stay]")||u({focus:!0})};s.addEventListener("click",f),e.addEventListener("click",y);let m=o.matchMedia?.(a),w=()=>{m?.matches||u({focus:!1})};return m?.addEventListener?.("change",w),{button:s,panel:e,open:d,close:u,isOpen:l,destroy(){u({focus:!1}),s.removeEventListener("click",f),e.removeEventListener("click",y),m?.removeEventListener?.("change",w)}}}var es="netcomposer.rhythm.hidden.v1",ft=new WeakMap;function $o(){try{return globalThis.localStorage??null}catch{return null}}function Uu(e,t=es){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Yl(e,t,n,a=es){let r=Uu(e,a);n?r.add(t):r.delete(t);try{e?.setItem(a,JSON.stringify([...r]))}catch{}}function ts(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(r=>r.controls)],n=[],a=r=>{if(n.push(r),r.type==="group")for(let o of r.controls)a(o)};for(let r of t)a(r),r.type==="fx"&&n.push(...r.controls,...r.more??[]),r.type==="strip"&&(n.push(...(r.sends??[]).map(o=>({...o,type:"knob",compact:!0}))),r.pan&&n.push(Xi(r)),r.trim&&n.push(Ji(r)));return n}function Gu(e,t){if(!(!e||!t))return ts(e).find(n=>n.id===t)}function W0(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${ts(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function K0(e,t){if(!t.title)return;if(!t.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=t.title,e.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(a,r),e.append(n),Wu(e,t)}function Wu(e,t){if(!t.panel)return;let n=[...e.children].find(o=>o.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),r&&(r.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Y0(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=ft.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Gu(n,a)}function X0(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],r=W0(t);if(e.dataset.ncSignature===r){for(let o of a){let s=e.querySelector(`[data-nc-section="${Jl(o.id)}"]`);s&&Wu(s,o);for(let l of o.controls){let d=e.querySelector(`[data-nc-id="${Jl(l.id)}"]`);d instanceof Element&&Ke(d,l)}s instanceof HTMLElement&&hi(s,o,n)}return}e.dataset.ncSignature=r,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let o of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=o.id,o.inset&&(s.dataset.ncInset="true"),o.area&&(s.dataset.ncArea=o.area),o.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",o.label)),o.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),o.title&&s.setAttribute("aria-label",o.title)),K0(s,o);let l=o.panel?document.createElement("div"):s;o.panel&&(l.className="nc-panel-body",s.append(l));for(let d of o.controls)l.append(nn(d,Y0));e.append(s),hi(s,o,n)}}function Ku(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,r=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,r))}}var J0="(max-width: 768px)",Yu=new WeakMap;function Xl(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function Q0(e,t){let n=[...e.children].find(u=>u.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let r=Xl("prev"),o=Xl("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(r,s,o,l);let d=(u,c)=>{let p=Yu.get(e);if(!p||c.getAttribute("aria-disabled")==="true")return;let f=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:y}=Ku(f,p.pageSize,(t.pages.get(p.id)??0)+u);t.pages.set(p.id,y),p.onPage?.(y),hi(e,{...p,page:y},t),c.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===c&&(c===r?o:r).focus(),t.redraw()};return r.addEventListener("click",()=>d(-1,r)),o.addEventListener("click",()=>d(1,o)),e.prepend(a),a}function hi(e,t,n){Yu.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],r=t.pageSize??0,{pages:o,page:s}=Ku(a.length,r,t.page??n.pages.get(t.id)??0);if(r>0&&n.pages.set(t.id,s),o<=1){for(let h of[...e.children])h.classList.contains("nc-fx-pager")&&h.remove();delete e.dataset.ncPaged;for(let h of a)delete h.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(J0).matches===!0,d=e.closest(".nc-module");a.forEach((h,v)=>{let k=Math.floor(v/r)!==s;if(k?h.dataset.ncOffPage="":delete h.dataset.ncOffPage,k&&!l){let b=d instanceof HTMLElement?ft.get(d):void 0;C0(h,Gu(b,h.dataset.ncId))}});let u=Q0(e,n),c=u.querySelector('[data-nc-fx-page="prev"]'),p=u.querySelector('[data-nc-fx-page="next"]');c.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===o-1?"true":"false");let f=u.querySelector("[data-nc-fx-page-count]"),y=`${s+1} / ${o}`;f.textContent!==y&&(f.textContent=y);let m=u.querySelector("[data-nc-fx-page-live]"),w=`Effects page ${s+1} of ${o}`;m.textContent!==w&&(m.textContent=w)}function Jl(e){return e.replace(/["\\]/g,"\\$&")}function Z0(e,t=es){Gd();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Uu($o(),t).has(e.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";let u=ji({labelledBy:o.id,onChange:k=>(ft.get(n)??e).onToggle?.(k)});u.el.dataset.ncModuleSwitch="",s.append(u.el,l,d);let c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",r.append(o,c,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let y=document.createElement("span");y.className="nc-slim-lines",f.append(y);let m=document.createElement("i");m.className="nc-token-probe",m.dataset.ncProbe="",n.append(m,r,p,f),n.setAttribute("aria-labelledby",o.id);let w=k=>{let b=ft.get(n)??e;n.dataset.ncOpen=k?"false":"true",p.hidden=k,f.hidden=!k,l.textContent=k?"+":"−",l.setAttribute("aria-expanded",k?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${k?"Show":"Hide"} ${b.title}`),l.title=k?"Show":"Hide",k?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let k=n.dataset.ncOpen==="true";Yl($o(),(ft.get(n)??e).id,k,t),w(k),fi(n.parentElement)}),f.addEventListener("click",()=>{Yl($o(),(ft.get(n)??e).id,!1,t),w(!1),fi(n.parentElement)});let h={pages:new Map,redraw:()=>v.redraw()},v={el:n,update(k){ft.set(n,k),k.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=k.title,c.textContent=k.status??"",k.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),y.textContent=k.summary??k.title,u.el.hidden=k.on===void 0,u.set(k.on===!0),k.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,f.setAttribute("aria-label",`Show ${k.title}`),X0(p,k,h),w(p.hidden),v.redraw()},redraw(){let k=ft.get(n);k&&P0(n,ts(k))}};return ft.set(n,e),w(a),v.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>v.redraw()).observe(n),qd(()=>v.redraw(),n.ownerDocument),v}function ey(e,t,n="adjacent"){Gd(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((r,o)=>{let s=o%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=a;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(r.el),r.redraw()}),fi(e)}function fi(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=t.some(o=>o.hasAttribute("data-nc-lead")),a=t.map(o=>o.hasAttribute("data-nc-slim")?i("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let r=t.filter(o=>!o.hasAttribute("data-nc-slim"));n&&t.length===4&&r.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const ns="netcomposer.studio.instances.v1",Ql="netcomposer.studio.types-seen.v1",ty=["petra-rhythm","olive-bass"];function Xu(e,t){return t===1?e:`${e}#${t}`}function as(e){const t=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(e);if(!t?.[1])return null;const n=t[2]?Number(t[2]):1;return n===1&&t[2]?null:{type:t[1],n}}function ny(e,t){return t===1?e.name:`${e.name} ${t}`}function Pn(e,t,n){const a=ny(e,t),r=Qu(n,a);return{id:Xu(e.id,t),type:e.id,n:t,name:r,src:e.src,...r!==a?{custom:!0}:{}}}const Ju=20;function Qu(e,t){return typeof e!="string"?t:[...e.replace(/\s+/g," ").trim()].slice(0,Ju).join("").trim()||t}function ay(e,t,n,a){return e.map(r=>{if(r.id!==t)return r;const o=a.find(s=>s.id===r.type);return o?Pn(o,r.n,n):r})}function Zu(e,t,n){const a=new URLSearchParams({instance:String(e.n)});return t&&a.set("measure",""),n&&a.set("b",n),`${e.src}?${a.toString().replace(/=(&|$)/g,"$1")}`}function ry(e,t){const n=new Set(e.filter(r=>r.type===t.id).map(r=>r.n));let a=1;for(;n.has(a);)a++;return Pn(t,a)}function ha(e){return e.filter(t=>t.available!==!1&&t.addOnly!==!0).map(t=>Pn(t,1))}function oy(e,t){if(!Array.isArray(e))return ha(t);const n=[];for(const a of e){const r=a&&typeof a=="object"?a:null,o=typeof a=="string"?a:r?.id;if(typeof o!="string")continue;const s=as(o),l=s&&t.find(d=>d.id===s.type&&d.available!==!1);!s||!l||n.some(d=>d.id===o)||n.push(Pn(l,s.n,r?.name))}return n.length>0||e.length===0?n:ha(t)}function rs(){try{return globalThis.localStorage??null}catch{return null}}function iy(e,t=rs()){try{const n=t?.getItem(ns);return n?oy(JSON.parse(n),e):ha(e)}catch{return ha(e)}}function sy(e,t,n=rs()){let a=ty;try{const s=JSON.parse(n?.getItem(Ql)??"null");Array.isArray(s)&&(a=s.filter(l=>typeof l=="string"))}catch{}const r=t.filter(s=>!a.includes(s.id)&&s.available!==!1);if(r.length===0)return[...e];const o=[...e];for(const s of r.filter(l=>l.addOnly!==!0))o.some(l=>l.type===s.id)||o.push(Pn(s,1));try{n?.setItem(Ql,JSON.stringify([...new Set([...a,...r.map(s=>s.id)])]))}catch{}return o.length!==e.length&&Rn(o,n),o}function ly(e){return e.map(t=>t.custom?{id:t.id,name:t.name}:t.id)}function Rn(e,t=rs()){try{t?.setItem(ns,JSON.stringify(ly(e)))}catch{}}function cy(e){const t=/^commit: ([0-9a-f]{7,40})\b/m.exec(e);return t?t[1].slice(0,12):null}function dy(e,t=1500){const n=new Map;return a=>{let r=n.get(a);if(!r){const o=e(`${a}BUILD.txt`,{cache:"no-cache"}).then(s=>s.ok?s.text():"").then(cy,()=>null);r=Promise.race([o,new Promise(s=>setTimeout(()=>s(null),t))]),n.set(a,r)}return r}}function uy(e,t){const n=new Map;return(a,r)=>{const o=as(a),s=o?.type??a,l=r?.instance!==void 0?Number(r.instance):a.includes("#")?o?.n:void 0,d=e().filter(c=>c.instance.type===s);let u;if(l!==void 0&&Number.isInteger(l)&&l>=1)u=d.find(c=>c.instance.n===l);else{const c=d.filter(p=>{const f=p.window();return f!=null&&f!==n.get(p.instance.id)});u=c.find(p=>p.readyState?.()!=="complete")??c[0]??d[0]}if(!u){if(t.some(p=>p.id===s))return null;const c=l!==void 0?Xu(s,l):a;return{id:c,name:c}}return n.set(u.instance.id,u.window()),{id:u.instance.id,name:u.instance.name}}}const py=2e4,hy=500,fy={waiting:"Waiting",loading:"Loading…",starting:"Starting audio…",ready:"Ready",failed:"Didn't load"},my=["ready","failed"];function gy(e){const t=e.map(c=>({id:c.id,brand:c.brand,name:c.name,state:"waiting",loaded:!1,attached:!1,holds:0})),n=new Set;let a=!1,r=[];const o=new Map,s=c=>t.find(p=>p.id===c),l=c=>my.includes(c.state),d=()=>{if(!a&&t.every(l)){a=!0;const c=r;r=[];for(const p of c)p()}for(const c of t){if(!l(c))continue;const p=o.get(c.id);if(p){o.delete(c.id);for(const f of p)f()}}for(const c of[...n])try{c()}catch{}},u=c=>{if(a||l(c))return;const p=c.loaded&&c.attached&&c.holds===0?"ready":c.loaded||c.attached?"starting":c.state==="waiting"?"waiting":"loading";p!==c.state&&(c.state=p,d())};return{items:()=>t.map(c=>({id:c.id,brand:c.brand,name:c.name,state:c.state})),counts:()=>({done:t.filter(l).length,total:t.length}),settled:()=>a||t.every(l),whenSettled(){return a||t.every(l)?Promise.resolve():new Promise(c=>r.push(c))},whenDone(c){const p=s(c);return!p||a||l(p)?Promise.resolve():new Promise(f=>o.set(c,[...o.get(c)??[],f]))},requested(c){const p=s(c);!p||a||p.state!=="waiting"||(p.state="loading",d(),u(p))},loaded(c){const p=s(c);p&&(p.loaded=!0,u(p))},attached(c){const p=s(c);p&&(p.attached=!0,u(p))},hold(c){const p=s(c);if(!p||a)return()=>{};p.holds++,u(p);let f=!1;return()=>{f||(f=!0,p.holds--,u(p))}},fail(c){const p=s(c);!p||a||l(p)||(p.state="failed",d())},remove(c){const p=t.findIndex(y=>y.id===c);if(p<0||a)return;t.splice(p,1);const f=o.get(c);o.delete(c);for(const y of f??[])y();d()},onChange(c){return n.add(c),()=>n.delete(c)}}}function by(e,t){return e.includes(t)?[t,...e.filter(n=>n!==t)]:[...e]}async function yy(e,t,n){for(let a=0;a<e.length;a++)a>0&&await n(),await t(e[a])}function vy(e=hy,t=globalThis){return new Promise(n=>{typeof t.requestIdleCallback=="function"?t.requestIdleCallback(()=>n(),{timeout:e}):t.setTimeout(n,0)})}function wy(e,t){const n=new Set,a=new URL(t),r=/<(script|link)\b([^>]*)>/gi;for(const o of e.matchAll(r)){const s=(o[1]??"").toLowerCase(),l=o[2]??"",d=p=>new RegExp(`\\b${p}\\s*=\\s*("([^"]*)"|'([^']*)')`,"i").exec(l)?.slice(2).find(Boolean);let u;if(s==="script"&&/\btype\s*=\s*["']module["']/i.test(l)&&(u=d("src")),s==="link"){const p=(d("rel")??"").toLowerCase();(p==="modulepreload"||p==="stylesheet")&&(u=d("href"))}if(!u)continue;let c;try{c=new URL(u,a)}catch{continue}c.origin===a.origin&&n.add(c.href)}return[...n]}const er="netcomposer.studio.pending-presets.v1",xy=3e3,ky=6e4;function Zl(e){return!!e&&typeof e=="object"&&typeof e.format=="string"&&"data"in e}function $y(e,t){return new Promise(n=>{const a=setTimeout(()=>n(void 0),t);e.then(r=>{clearTimeout(a),n(r)},()=>{clearTimeout(a),n(void 0)})})}function Sy(e){const t=new Map,n=[],a=()=>{try{const s=JSON.parse(e()?.getItem(er)??"{}"),l={};if(s&&typeof s=="object")for(const[d,u]of Object.entries(s))Zl(u)&&(l[d]=u);return l}catch{return{}}},r=s=>{try{const l=e();if(!l)return;Object.keys(s).length?l.setItem(er,JSON.stringify(s)):l.removeItem(er)}catch{}},o=async(s,l)=>{const d=a(),u=d[s];if(!u)return;delete d[s],r(d);let c=u.format===l.format;if(c)try{await l.set(u.data)}catch{c=!1}for(const p of n)p(s,c)};return{provide(s,l){!l||typeof l.get!="function"||typeof l.set!="function"||(t.set(s,l),o(s,l))},provided:()=>[...t.keys()],async collect(s,l=xy){const d={};return await Promise.all(s.map(async u=>{const c=t.get(u);if(!c)return;const p=await $y(Promise.resolve().then(()=>c.get()),l);p!=null&&(d[u]={format:c.format,...c.version!==void 0?{v:c.version}:{},data:p})})),d},stash(s){const l={};for(const[d,u]of Object.entries(s))Zl(u)&&(l[d]=u);r(l)},onApplied(s){n.push(s)},pending:()=>Object.keys(a()),dropPending(){const s=Object.keys(a());return r({}),s}}}function Ey(e,t,n=""){return n?`${e}@studio/${n}/${t}`:`${e}@studio/${t}`}const Ay=1,xe=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX",identity:"instrument-nyx"},{id:"calliope",name:"Generator",src:"/calliope/",brand:"CALLIOPE",identity:"instrument-calliope",sound:!1},{id:"looper",name:"Looper",src:"/looper/",brand:"LUPA",identity:"instrument-looper",sound:!1,single:!0,noteTarget:!1,addOnly:!0},{id:"aria",name:"Situation",src:"/aria/",brand:"ARIA",identity:"instrument-aria",sound:!1,single:!0,noteTarget:!1}],os=[...xe];function My(e,t,n={}){const a=n.instruments??xe;return{version:Ay,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},...n.grab?{grab:n.grab}:{},...n.play?{play:n.play}:{},...n.countIn?{countIn:n.countIn}:{},attach(r,o){if(typeof r!="string"||r.length===0||r.length>64)return null;const s=n.resolve?n.resolve(r,o):{id:r,name:a.find(h=>h.id===r)?.name??r};if(!s)return null;const l=s.id.split("#")[0],u=a.find(h=>h.id===l)?.sound===!1?e.createGain():t.attach(s.id,s.name),c=s.id;n.attached?.(c);const p=n.presets,f=n.share?.host(c),y=n.picker?.host(c),m=n.notes?.host(c),w=n.situation?.host(c);return{ctx:e,output:u,...n.mapper===void 0?{}:{mapper:n.mapper},instance:c,storageKey:h=>Ey(h,c,n.generation?.()??""),...n.legacyCopy?.()===!1?{legacyCopy:!1}:{},...n.holdFirstPlay?{holdFirstPlay:()=>n.holdFirstPlay?.(c)??(()=>{})}:{},...p?{providePreset:h=>p.provide(c,h)}:{},...f?{audioReceivers:f.audioReceivers,sendAudio:f.sendAudio,onAudio:f.onAudio,reveal:f.reveal}:{},...y?{pickerTarget:y.pickerTarget}:{},...m?{notesIn:m.notesIn,notesSource:m.notesSource,notesTakeBack:m.notesTakeBack,notesOut:m.notesOut,onPlayed:m.onPlayed}:{},...n.keys?{studioKey:h=>n.keys?.press(c,h)===!0,claimKeys:(h,v)=>Array.isArray(h)?n.keys?.claim(c,h,v)??(()=>{}):()=>{}}:{},...n.metronome?{metronome:Ty(n.metronome,c)}:{},...n.readout?{readout:h=>n.readout?.set(c,h)}:{},...n.studioTransport?{studioTransport:n.studioTransport}:{},...n.chip?{chip:h=>n.chip?.(c,h&&typeof h=="object"?h:null)}:{},...w?{situationIn:w.situationIn,situationSource:w.situationSource,situationSources:w.situationSources,onSituationSources:w.onSituationSources}:{},...n.clock?{clock:n.clock()}:{},...n.targets?{notesTargets:()=>n.targets?.list()??[],onNotesTargets:h=>typeof h=="function"?n.targets?.listen(h)??(()=>{}):()=>{}}:{},...n.show?{showInstance:h=>typeof h=="string"&&n.show?.(h)}:{}}}}}function Ty(e,t){return{prefs:()=>e.prefs(),set:n=>e.set(n&&typeof n=="object"?n:{}),want:n=>e.want(t,n===!0),active:()=>e.active(),onChange:n=>typeof n=="function"?e.onChange(n):()=>{}}}const ec=16,Ly=30;function Cy(e){if(!e||typeof e!="object")return null;const t=e,n=Array.isArray(t.beats)?t.beats.slice(0,ec+1):[],a=t.until;if(n.length<1||n.length>ec||!n.every(l=>typeof l=="number"&&Number.isFinite(l))||n.some((l,d)=>d>0&&l<=n[d-1]))return null;const r=n[0],o=n[n.length-1];if(typeof a!="number"||!Number.isFinite(a)||a<=o||a-r>Ly)return null;const s=Array.isArray(t.accents)?t.accents:[];return{beats:[...n],accents:n.map((l,d)=>s[d]===!0),until:a}}function Ny(e,t){if(t>=e.until)return null;let n=-1;for(;n+1<e.beats.length&&e.beats[n+1]<=t;)n++;return{n:e.beats.length-Math.max(0,n),accent:n>=0&&e.accents?.[n]===!0}}function Iy(e,t){return t===null?e:`${t} · ${e}`}function Fy(e){let t=0;for(const n of e)Number.isFinite(n)&&n>t&&(t=n);return Math.round(t)}function Py(e){const t=e.doc??document,n=t.createElement("div");n.className="count-in",n.hidden=!0,n.setAttribute("role","status");const a=t.createElement("span");a.className="count-in-who";const r=t.createElement("span");r.className="count-in-n",n.append(a,r);const o=t.title,s=new Map;let l=!1;const d=()=>{const c=e.now();for(const[b,S]of s)c>=S.until&&s.delete(b);const[p,f]=[...s][0]??[],y=f?Ny(f,c):null;if(!p||!y){n.hidden=!0,delete n.dataset.accent,t.title=o,l=!1;return}n.hidden=!1;const m=e.clearOf?.()??[],w=`${Fy(m.map(b=>b.getBoundingClientRect().bottom))}px`;n.style.getPropertyValue("--count-in-top")!==w&&n.style.setProperty("--count-in-top",w);const h=e.labelOf(p);a.textContent!==h&&(a.textContent=h);const v=String(y.n);r.textContent!==v&&(r.textContent=v),n.toggleAttribute("data-accent",y.accent),n.setAttribute("aria-label",`${h} count-in ${v}`);const k=Iy(o,y.n);t.title!==k&&(t.title=k),requestAnimationFrame(d)},u=()=>{l||(l=!0,requestAnimationFrame(d))};return{el:n,api:{show(c,p){if(typeof c!="string"||!c)return;const f=Cy(p);f&&(s.set(c,f),u())},clear(c){s.delete(c)&&u()}}}}const Ry=1e4;function Dy(e=Ry,t=globalThis){const n=new Set;let a=[];const r=()=>{if(n.size>0)return;const o=a;a=[];for(const s of o)s()};return{hold(){const o={};n.add(o);const s=t.setTimeout(()=>l(),e),l=()=>{n.delete(o)&&(t.clearTimeout(s),r())};return l},get count(){return n.size},idle(){return n.size===0?Promise.resolve():new Promise(o=>a.push(o))}}}const ep="netcomposer.studio.fx-fold.v1",zy=["a","b","insert"],tp={a:!0,b:!0,insert:!1};function np(e){try{const t=e?.getItem(ep);if(!t)return{};const n=JSON.parse(t);if(!n||typeof n!="object")return{};const a=n,r={};for(const o of zy)typeof a[o]=="boolean"&&(r[o]=a[o]);return r}catch{return{}}}function ap(e){return{...tp,...np(e)}}function rp(e,t,n){const a={...np(e),[t]:n};try{e?.setItem(ep,JSON.stringify(a))}catch{}return{...tp,...a}}const op="netcomposer.studio.insert-fold.v1";function ip(e){try{const t=e?.getItem(op),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function sp(e,t,n){const a=[...ip(e)].filter(o=>o!==t);n&&a.push(t);const r=a.slice(-256);try{e?.setItem(op,JSON.stringify(r))}catch{}return new Set(r)}function Oy(e,t){return ap(e).insert?(rp(e,"insert",!1),sp(e,t,!0)):ip(e)}function we(){try{return globalThis.localStorage??null}catch{return null}}const By={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function lp(e,t){const n=t.fx[e],a=sr(n);for(const r of a.chain){const o=By[e][r.type];n===void 0&&o&&Object.assign(r.dials,o),e==="a"?(r.bypass=r.type!=="plate",r.type==="plate"&&(r.dials.mix=100)):e==="b"?(r.bypass=r.type!=="delay",r.type==="delay"&&(r.dials.mix=100,r.dials.mode=0,r.dials.send=100)):r.bypass=r.type!=="drive"||!t.insert.on}return a}const cp="drive-1",mi=3;function _y(e,t){if(e.masterFx!==null&&e.masterFx!==void 0)return Qt(e.masterFx,t);const n=e.insert.on?lp("insert",e).chain.find(a=>a.type==="drive"):void 0;return Qt({v:2,chain:n?[{id:cp,type:"drive",bypass:!1,dials:{...n.dials}}]:[]},t)}function jy(e){return e.chain.some(t=>t.type==="drive"&&!t.bypass)}const qy={"no-source":"that source isn't there",empty:"the range is empty",gone:"that range is older than the 20 seconds kept","not-kept":"that source wasn't being kept yet when the range played",timeout:"no answer from the audio (is it running?)"};function Vy(e,t,n,a=2e3){return(Number.isFinite(e-t)?Math.max(0,e-t):0)/n*1e3+a}const _a=e=>({channels:null,reason:e,message:qy[e]});function Hy(e,t){const n=new Map,a=new Map;let r=1;const o=l=>{const d=t.nodeFor(l);if(!d)return null;const u=n.get(l);if(u&&u.source===d)return u.node;u?.node.disconnect();const c=new AudioWorkletNode(e,"nc-studio-grab",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});return c.port.onmessage=p=>{const f=p.data;f.type!=="took"&&f.type!=="recorded"||(a.get(f.id)?.(f.channels,f.reason),a.delete(f.id))},d.connect(c),n.set(l,{node:c,source:d}),c},s=async(l,d,u)=>{await t.ready;const c=o(l);if(!c)return _a("no-source");if(!(u>d))return _a("empty");const p=r++;return new Promise(f=>{a.set(p,(y,m)=>f(y?{channels:y}:_a(m??"gone"))),c.port.postMessage({type:"take",id:p,from:d,to:u}),setTimeout(()=>{a.delete(p)&&f(_a("timeout"))},Vy(u,e.currentTime*e.sampleRate,e.sampleRate))})};return{record(l,d){if(!t.nodeFor(l))return null;const u=n.get(l)?.node??null,c=r++;let p=u;const f=m=>p?.port.postMessage(m);p?f({type:"record",id:c,from:d}):t.ready.then(()=>{p=o(l),f({type:"record",id:c,from:d})});let y=!1;return{stop(m){return y?Promise.resolve(null):(y=!0,new Promise(w=>{a.set(c,w),f({type:"record-end",id:c,to:m}),setTimeout(()=>{a.delete(c)&&w(null)},Math.max(0,(m-e.currentTime*e.sampleRate)/e.sampleRate)*1e3+5e3)}))},cancel(){y=!0,f({type:"record-cancel",id:c})}}},sources:()=>t.sources(),latency(l){if(typeof l!="string")return 0;const d=t.latencyFor?.(l)??0;return Number.isFinite(d)&&d>0?Math.round(d):0},listen(l){return t.nodeFor(l)?(t.ready.then(()=>o(l)),!0):!1},take:(l,d,u)=>s(l,d,u).then(c=>c.channels),takeResult:s}}function Uy(e){const t=()=>{};return new Proxy(e,{get(n,a,r){if(a==="stop")return t;const o=Reflect.get(n,a,r);return typeof o=="function"?o.bind(n):o}})}const ne={"picker:off":"Connects the Sample Picker on this computer, so its Send to NYX loads the pads of a NYX here. Off: the picker can't reach this Studio.","picker:connecting":"Connecting to the Sample Picker on this computer. Press to disconnect.","picker:on":"The Sample Picker is connected: its Send to NYX loads a NYX here (you choose which there). Press to disconnect.","picker:away":"The Sample Picker isn't answering: start it on this computer; the Studio keeps trying. Press to disconnect.","picker:ask":"The Sample Picker isn't connected yet. Press to connect (if Chrome asks to let this site reach this computer, choose Allow).","picker:blocked":"Chrome blocks this site from reaching this computer. Allow it in the site's settings (Local network access), then press here.","transport:rec":"Records the Master to a WAV file. If nothing is sounding, Rec arms and waits: it starts on the first sound or on bar 1. Press again to cancel or stop.","transport:play-loading":"Play is ready once every instrument is in. The status line counts them as they load.","transport:keep":"Saves the last minutes of the Master as a WAV, no Rec needed. It holds up to 5 min of sound; silence isn't held, so 2 min is 2 minutes of sound. K opens it.","keep:held":"How much sound Keep holds now, up to 5 min. Silence longer than 2 seconds isn't held. While the clock runs, a Keep starts on a bar line.","keep:switch":"Keeping on holds the Master's last 5 minutes of sound in this tab (about 58 MB). Off forgets it and holds nothing.","mix:sends":"The two send effects every channel feeds with its A and B knobs. The master's Sends button shows and hides them. Folded, click a column to open it.","inserts:channel":"Shows this channel's own effects, applied before its fader and sends. Press again to close them.","inserts:master":"Shows the master's own effects on the whole mix: none until you add one, up to three (EQ, compressor, drive and so on). Press again to close them.","fx:fold":"Folds this effect sideways into a narrow column so the Mix takes less room. It keeps sounding as set; a click on the column (or its ▶) opens it again.","fx:meter":"The level going into this effect (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. It keeps showing the input, greyed, while the effect is off.","fx:meter-return":"The level the sends feed into this effect (left bar) and its return (right bar), from −48 dB up to full scale; orange near clipping. Silent while the return is off.","fx:max":"Widens this card to three cards so its graph is easy to see; the dials sit under it. Click again, or press Escape, to put it back.","gate:steps":"Tap or drag up and down to draw each step's level. Hold a step (or right-click it) to give it its own shape. The ring is the step playing: dimmed while stopped.","eq:graph":"The EQ's curve over the sound coming out right now: boosts rise above the middle line, cuts fall below it. Click it to open it wide, then drag a dot to shape it.","eq:low":"The lows, below 150 Hz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","eq:mid":"The middle band: drag up or down to boost or cut, sideways to move it, and scroll over it for narrower or wider. Double-click resets it.","eq:high":"The highs, above 6 kHz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","strip:fold":"Minimizes this channel sideways to a narrow column so more fit. It keeps playing at the same level; M and S still work, and ▶ expands it again.","strip:folded":"A minimized channel: its name, mute, solo and level meter. Click the name or ▶ to expand it. Drag the name to move it.","strip:trim":"Trim: this channel's input gain, before its Inserts and fader, −12 to +24 dB. Bring up a quiet instrument here; double-click for 0 dB.","strip:pan":"Balance: moves this channel left or right in the stereo mix by turning the other side down (its sends follow). Drag or use the arrow keys; double-click to centre it.","strip:name":"This channel's instrument. Click to show it below, drag (or touch and hold) to move the channel, double-click to rename it.","strip:rename":"Type a new name (up to 20 characters) and press Enter; Escape cancels. Leave it empty to go back to the default name.","sends:view":"Shows or hides the send effects, A · Reverb and B · Delay. Outlined while a channel sends to them. They keep sounding either way.","vu:add":"Adds analog VU meters for the finished mix beside the master: left on top, right below. 0 VU is −18 dBFS RMS.","vu:module":"The master's left (top) and right (bottom) as classic VU meters, which show average loudness. 0 VU is −18 dBFS RMS; the red is louder than that.","vu:remove":"Hides the VU meters. + Meters in the Mix header brings them back.","vu:fold":"Folds the meters to a narrow column with two thin level bars, L and R. The triangle opens them again.","load:ok":"Audio load {pct}%. Plenty of room.","load:busy":"Audio load {pct}%. Close an instrument if you hear crackles.","load:dropout":"A brief spike caused an audio dropout. Average load is {pct}%. If you hear crackles often, close an instrument.","load:over":"Audio load {pct}%. The audio is dropping out. Stop or close an instrument."},Gy=[60,120,300],Wy={on:!1,written:0,size:0,segments:[],lastDropped:null,bytes:0,sampleRate:48e3};function dp(e){return Math.max(0,Math.min(e.written,e.size))}function So(e,t){let n=null;for(const a of e){if(a.pos>t)break;n=a}return n?n.frame+(t-n.pos):null}function Ky(e,t,n){for(let a=e.length-1;a>=0;a--){const r=e[a];if(r&&r.pos<=t)return{start:r.pos,end:e[a+1]?.pos??n}}return null}function Yy(e,t,n){const a=dp(e);if(a<=0)return null;const r=e.written-a;let o;if("last"in t){const u=Math.round(t.last*e.sampleRate);if(u<=0||u>a)return null;o=e.written-u}else{if(e.lastDropped!==null&&e.lastDropped>=t.since)return null;let u=null;for(let c=0;c<e.segments.length;c++){const p=e.segments[c];if(!p)continue;const f=e.segments[c+1]?.pos??e.written;if(t.since<p.frame+(f-p.pos)){u=Math.max(r,p.pos+Math.max(0,t.since-p.frame));break}}if(u===null||u>=e.written)return null;o=u}let s="exact";if(n&&n.barFrames>0){const u=So(e.segments,o),c=Ky(e.segments,o,e.written);if(u!==null&&c){const p=((u-n.origin)%n.barFrames+n.barFrames)%n.barFrames,f=o-Math.round(p),y=p===0?o:o+Math.round(n.barFrames-p);p===0?s="bar":f>=Math.max(r,c.start)&&"last"in t?(o=f,s="bar"):y<Math.min(e.written,c.end)&&(o=y,s="bar")}}const l=So(e.segments,o)??0,d=(So(e.segments,e.written-1)??l)+1;return{from:o,to:e.written,frame:l,endFrame:d,start:s}}function gi(e){const t=Math.max(0,Math.floor(e));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function Xy(e,t,n){const a=l=>String(l).padStart(2,"0"),r=`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}-${a(e.getHours())}${a(e.getMinutes())}`,o=`${Math.round(t*10)/10}bpm`,s="last"in n?`${Math.round(n.last/60)}m`:"since-play";return`netcomposer-keep-${r}-${o}-${s}.wav`}const up="audio/wav";function Jy(e){const t=a=>String(a).padStart(2,"0");return`netcomposer-studio-${`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}-${t(e.getHours())}${t(e.getMinutes())}`}.wav`}function Qy(e,t){const n=Math.min(e.length,t.length),a=new Uint8Array(n*6);let r=0;for(let o=0;o<n;o++)for(const s of[e[o]??0,t[o]??0]){const l=Math.max(-1,Math.min(1,s)),d=Math.round(l<0?l*8388608:l*8388607);a[r++]=d&255,a[r++]=d>>8&255,a[r++]=d>>16&255}return a}function pp(e,t,n=24){const r=n/8,o=e*2*r,s=new ArrayBuffer(44),l=new DataView(s),d=(u,c)=>{for(let p=0;p<4;p++)l.setUint8(u+p,c.charCodeAt(p))};return d(0,"RIFF"),l.setUint32(4,36+o,!0),d(8,"WAVE"),d(12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,2,!0),l.setUint32(24,t,!0),l.setUint32(28,t*2*r,!0),l.setUint16(32,2*r,!0),l.setUint16(34,r*8,!0),d(36,"data"),l.setUint32(40,o,!0),new Uint8Array(s)}class Zy{constructor(t,n){this.ctx=t,this.source=n}node=null;id=0;phase="idle";parts=[];frames=0;from=0;why="now";done=null;listeners=new Set;attach(){const t=this.source();if(this.node||!t)return;const n=new AudioWorkletNode(this.ctx,"nc-studio-rec",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n}get supported(){return typeof AudioWorkletNode<"u"}get state(){return this.phase}get started(){return this.phase==="recording"||this.phase==="stopping"?{from:this.from,why:this.why}:null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}arm(t=!1){this.phase==="idle"&&(this.attach(),this.node&&(this.id++,this.parts=[],this.frames=0,this.set("arming"),this.node.port.postMessage({type:"arm",id:this.id,force:t})))}schedule(t){this.phase!=="arming"&&this.phase!=="armed"||this.node?.port.postMessage({type:"at",id:this.id,at:t})}cancel(){this.phase!=="arming"&&this.phase!=="armed"||(this.node?.port.postMessage({type:"cancel",id:this.id}),this.parts=[],this.id++,this.set("idle"))}stop(){return this.phase!=="recording"||!this.node?Promise.resolve(null):(this.set("stopping"),new Promise(t=>{this.done=t,this.node?.port.postMessage({type:"stop",id:this.id})}))}set(t){if(this.phase!==t){this.phase=t;for(const n of this.listeners)n()}}message(t){if(t.id===this.id){if(t.type==="rec")t.phase==="armed"&&this.phase==="arming"?this.set("armed"):t.phase==="recording"&&(this.phase==="arming"||this.phase==="armed")?(this.from=t.from??0,this.why=t.why??"now",this.set("recording")):t.phase==="idle"&&this.phase==="stopping"&&this.finish(null);else if(t.type==="rec-data"){const[n,a]=t.channels??[];if(!n||!a)return;this.parts.push(Qy(n,a)),this.frames+=n.length}else if(t.type==="rec-done"){const n=t.sampleRate??this.ctx.sampleRate,a=new Blob([pp(this.frames,n),...this.parts],{type:up});this.finish({blob:a,name:Jy(new Date),seconds:this.frames/n,from:t.from??this.from,why:this.why})}}}finish(t){this.parts=[],this.frames=0;const n=this.done;this.done=null,this.set("idle"),n?.(t)}}const hp="netcomposer.studio.keeping.v1";function ev(e){try{return e?.getItem(hp)!=="off"}catch{return!0}}function tv(e,t){try{e?.setItem(hp,t?"on":"off")}catch{}}class nv{constructor(t,n,a=!0){this.ctx=t,this.source=n,this.on=a}node=null;latest=Wy;on;id=0;jobs=new Map;listeners=new Set;attach(){const t=this.source();if(this.node||!t||typeof AudioWorkletNode>"u")return;const n=new AudioWorkletNode(this.ctx,"nc-studio-keep",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n,n.port.postMessage({type:"keeping",on:this.on})}get supported(){return typeof AudioWorkletNode<"u"}get keeping(){return this.on}get status(){return this.latest}setKeeping(t){this.on=t,this.node?.port.postMessage({type:"keeping",on:t}),t||(this.latest={...this.latest,on:t,written:0,segments:[],bytes:0,lastDropped:null}),this.emit()}refresh(){this.node?.port.postMessage({type:"status"})}plan(t,n){return this.on?Yy(this.latest,t,n):null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}keep(t,n){const a=this.node;if(!a||!this.on)return Promise.resolve(null);const r=++this.id;return new Promise(o=>{this.jobs.set(r,{parts:[],plan:null,rate:this.ctx.sampleRate,done:s=>{if(!s)return o(null);const l=s.plan.to-s.plan.from,d=new Blob([pp(l,s.rate,16),...s.parts],{type:up});o({blob:d,name:Xy(n.when??new Date,n.bpm,t),seconds:l/s.rate,frame:s.plan.frame,endFrame:s.plan.endFrame,start:s.plan.start,choice:t})}}),a.port.postMessage({type:"keep",id:r,choice:t,grid:n.grid??null,now:this.ctx.state!=="running"})})}emit(){for(const t of this.listeners)t()}message(t){if(t.type==="keep-status"&&t.status){this.latest=t.status,this.emit();return}const n=t.id===void 0?void 0:this.jobs.get(t.id);if(!(!n||t.id===void 0)){if(t.type==="keep-plan")n.plan=t.plan??null,n.rate=t.sampleRate??n.rate,n.plan||(this.jobs.delete(t.id),n.done(null));else if(t.type==="keep-part"){if(t.data)n.parts.push(t.data);else if(t.done){this.jobs.delete(t.id),n.done(null);return}t.done&&n.plan&&(this.jobs.delete(t.id),n.done({plan:n.plan,parts:n.parts,rate:n.rate}))}}}}const fp={threshold:-3,knee:0,ratio:20,attack:.001,release:.1};function av(e){return Math.floor(.006*e)}const bi=1024,tc=bi+8192,rv=.25;function ov(e,t){let n=0;for(let a=t;a<e.length;a++)n=Math.max(n,Math.abs(e[a]??0));if(!(n>1e-6))return null;for(let a=t;a<e.length;a++)if(Math.abs(e[a]??0)>=n/2)return a-t;return null}async function iv(e,t,n=OfflineAudioContext){const a=new n(1,tc,e),r=a.createBuffer(1,tc,e);r.getChannelData(0)[bi]=rv;const o=new AudioBufferSourceNode(a,{buffer:r}),s=t(a);o.connect(s.input),s.output.connect(a.destination),o.start(0);const l=await a.startRendering();return ov(l.getChannelData(0),bi)}function sv(e,t=()=>iv(e,n=>{const a=new DynamicsCompressorNode(n,fp);return{input:a,output:a}})){let n=av(e);const a=(async()=>{try{const r=await t();r!==null&&r>=0&&r<e/10&&(n=r)}catch{}})();return{get:()=>n,ready:a}}const lv=65,cv=90,dv=5e3,tr=3,nr=1;function uv(e,t){return e>=cv||t>=tr?"over":t>0?"dropout":e>=lv?"busy":"ok"}function pv(e){return e==="over"?"Overloaded":e==="busy"?"Busy":e==="dropout"?"· dropout":""}function hv(e,t){return ne[`load:${t}`].replace("{pct}",String(Math.round(e)))}class fv{pct=0;state="ok";underruns=0;recent=[];read(t,n){this.pct=Math.max(0,Math.min(100,Number.isFinite(t.pct)?t.pct:0));const a=Number.isFinite(t.underruns)?Math.max(0,Math.floor(t.underruns)):0;this.underruns+=a;for(let r=0;r<Math.min(a,tr);r++)this.recent.push(n);return this.tick(n)}tick(t){for(;this.recent.length&&t-this.recent[0]>=dv;)this.recent.shift();return this.recent.length>tr&&this.recent.splice(0,this.recent.length-tr),this.state=uv(this.pct,this.recent.length),this.state}}class mv{constructor(t=nr){this.intervalS=t}lastStart=Number.NEGATIVE_INFINITY;take(t,n){return!((t??0)>0)||!Number.isFinite(n)||n<this.lastStart+this.intervalS*.9?0:(this.lastStart=n,1)}}function Tt(e,t,n={}){const a=document.createElement(e);a.className=t;for(const[r,o]of Object.entries(n))a.setAttribute(r,o);return a}function gv(e={}){const t=e.now??(()=>performance.now()),n=new fv,a=Tt("span","load-fill"),r=Tt("span","load-pct"),o=Tt("span","load-word"),s=Tt("button","load",{type:"button","data-testid":"load-meter","data-state":"ok"});s.append(Tt("span","load-label"),Tt("span","load-bar",{"aria-hidden":"true"}),r,o),s.firstChild.textContent="Load",s.querySelector(".load-bar")?.append(a);const l=Tt("div","nc-ui-help load-tip",{role:"tooltip",id:"load-tip","data-testid":"load-tip"});l.hidden=!0,s.setAttribute("aria-describedby","load-tip");let d=!1,u=0;const c={path:"none",pct:0,state:"ok",underruns:0,recent:0,readings:0,measured:!0,inject(b){d=b!==null,b&&f({pct:b.pct,underruns:b.underruns??(b.underrun?1:0)})}};window.__NC_LOAD__=c;function p(){const b=n.state;s.dataset.state=b,a.style.width=`${Math.round(n.pct)}%`,r.textContent=`${Math.round(n.pct)}%`,o.textContent=pv(b);const S=hv(n.pct,b);s.setAttribute("aria-label",S),l.textContent=S,c.pct=n.pct,c.state=b,c.underruns=n.underruns,c.recent=n.recent.length,c.readings=u,l.hidden||w()}function f(b){u++,n.read(b,t()),p()}function y(b){d||f(b)}window.setInterval(()=>{const b=n.state;n.tick(t())!==b&&p()},500);let m=0;function w(){l.isConnected||document.body.append(l);const b=s.getBoundingClientRect();l.style.visibility="hidden",l.style.top="0px",l.style.left="0px";const S=l.offsetWidth,E=8,g=Math.max(E,Math.min(b.left,window.innerWidth-S-E));l.style.top=`${Math.round(b.bottom+6)}px`,l.style.left=`${Math.round(g)}px`,l.dataset.side="below",l.style.visibility=""}function h(){l.hidden=!1,w()}function v(){window.clearTimeout(m),l.hidden=!0}l.style.position="fixed",l.style.pointerEvents="none",s.addEventListener("pointerenter",b=>{b.pointerType!=="touch"&&(window.clearTimeout(m),m=window.setTimeout(h,e.helpDelay??500))}),s.addEventListener("pointerleave",b=>{b.pointerType!=="touch"&&v()}),s.addEventListener("click",()=>l.hidden?h():v()),s.addEventListener("blur",v),document.addEventListener("pointerdown",b=>{s.contains(b.target)||v()}),document.addEventListener("keydown",b=>{b.key==="Escape"&&v()}),window.addEventListener("scroll",v,!0),p();let k=!1;return{el:s,start(b,S){if(k)return c.path;k=!0;const E=b.renderCapacity;if(E&&typeof E.start=="function"){const g=new mv(nr);return E.addEventListener("update",x=>{const A=x,$=typeof A.timestamp=="number"?A.timestamp:b.currentTime-nr;y({pct:(A.averageLoad??0)*100,underruns:g.take(A.underrunRatio,$)})}),E.start({updateInterval:nr}),c.path="renderCapacity",c.path}if(S&&typeof AudioWorkletNode=="function")try{const x=Math.round((b.baseLatency??0)*b.sampleRate),A=new AudioWorkletNode(b,"nc-studio-load",{numberOfInputs:1,numberOfOutputs:0,processorOptions:{framesPerCallback:x}});return A.port.onmessage=$=>{$.data?.type==="load"&&(c.measured=$.data.measured,y({pct:$.data.load,underruns:$.data.underruns}))},c.path="worklet",c.path}catch{}return c.path="none",c.path}}}function bv(e,t){const n=Tt("div","transport-col");e.replaceWith(n),n.append(e,t.el)}const Un={noManifest:"No plugin.json there. Pick the plugin's folder, or plugin.json and its DSP file.",noDsp:e=>`plugin.json names its DSP file ${e}. Pick that file too.`,badJson:"plugin.json is not JSON.",bad:e=>`plugin.json has a problem: ${e}`,tooBig:e=>`${e} is over 256 KB.`},yv=256*1024,vv=e=>e.includes("/")?e.slice(0,e.lastIndexOf("/")+1):"",ja=e=>e.webkitRelativePath||e.name;async function wv(e){const t=[...e],a=t.filter(f=>f.name==="plugin.json").sort((f,y)=>ja(f).split("/").length-ja(y).split("/").length)[0];if(!a)throw new Error(Un.noManifest);const r=await a.text();let o;try{o=JSON.parse(r)}catch{throw new Error(Un.badJson)}const s=Dr(o);if(!s.ok||!s.manifest)throw new Error(Un.bad(s.errors.join("; ")));const l=s.manifest,d=vv(ja(a))+l.dsp,u=l.dsp.split("/").pop()??l.dsp,c=t.find(f=>ja(f)===d)??t.find(f=>f!==a&&f.name===u&&!f.webkitRelativePath);if(!c)throw new Error(Un.noDsp(l.dsp));const p=await c.text();if(new TextEncoder().encode(p).length>yv)throw new Error(Un.tooBig(l.dsp));return{manifest:l,manifestText:r,dspName:l.dsp,dsp:p}}async function xv(e,t=Date.now()){return{id:e.manifest.id,version:e.manifest.version,name:e.manifest.name,author:e.manifest.author,licence:e.manifest.licence,manifest:e.manifestText,dspName:e.dspName,dsp:e.dsp,sha256:await $d(new TextEncoder().encode(e.dsp)),added:t}}const nc=e=>`local:${e}`,wr=e=>e.startsWith("local:"),mp=e=>({id:e.id,version:e.version,name:e.name,author:e.author,added:e.added});function gp(){const e=new Map;return{list:async()=>[...e.values()].sort((t,n)=>t.added-n.added).map(mp),get:async t=>e.get(t)??null,put:async t=>{e.set(t.id,t)},remove:async t=>{e.delete(t)}}}const kv="netcomposer-studio-plugins",qa="plugins";function $v(e=globalThis.indexedDB){const t=gp(),n=new Promise(o=>{if(!e)return o(null);try{const s=e.open(kv,1);s.onupgradeneeded=()=>{s.result.objectStoreNames.contains(qa)||s.result.createObjectStore(qa,{keyPath:"id"})},s.onsuccess=()=>o(s.result),s.onerror=()=>o(null),s.onblocked=()=>o(null)}catch{o(null)}}),a=async(o,s,l)=>{const d=await n;return d?new Promise((u,c)=>{const p=d.transaction(qa,o),f=s(p.objectStore(qa));p.oncomplete=()=>u(f.result),p.onerror=()=>c(p.error??f.error),p.onabort=()=>c(p.error??f.error)}):l()},r=o=>{const s=o;return!!s&&typeof s.id=="string"&&typeof s.version=="string"&&typeof s.manifest=="string"&&typeof s.dsp=="string"};return{async list(){return(await a("readonly",s=>s.getAll(),async()=>{const s=await t.list();return Promise.all(s.map(l=>t.get(l.id)))})).filter(r).sort((s,l)=>s.added-l.added).map(mp)},async get(o){const s=await a("readonly",l=>l.get(o),()=>t.get(o));return r(s)?s:null},put:o=>a("readwrite",s=>s.put(o),()=>t.put(o)).then(()=>{}),remove:o=>a("readwrite",s=>s.delete(o),()=>t.remove(o)).then(()=>{})}}const ac="netcomposer.studio.metronome.v1",Eo={on:!0,volume:.5},Sv=.2,Ao=.03,rc={accent:1600,beat:1e3};function oc(e){try{const t=e?JSON.parse(e):{},n=typeof t.volume=="number"&&Number.isFinite(t.volume)?Math.min(1,Math.max(0,t.volume)):Eo.volume;return{on:typeof t.on=="boolean"?t.on:Eo.on,volume:n}}catch{return{...Eo}}}function Ev(e,t,n,a=Number.NEGATIVE_INFINITY){const r=[],o=Math.max(1,Math.round(n)),s=Math.max(Math.ceil(e-1e-9),Math.ceil(a-1e-9))+0;for(let l=s;l<t-1e-9;l++)r.push({beat:l,accent:(l%o+o)%o===0});return r}const Av=(e,t)=>Math.min(1,Math.max(0,e))**2*(t?.9:.6);function Mv(e){const{ctx:t}=e,n=e.storage===void 0?Tv():e.storage;let a=oc(n?.getItem(ac)??null);const r=new Set,o=new Set,s=t.createGain();s.connect(e.destination??t.destination);const l={scheduled:0};let d=Number.NEGATIVE_INFINITY,u=!1;const c=[],p=()=>a.on&&r.size>0,f=()=>{for(const v of[...o])try{v()}catch{}},y=()=>{const v=t.currentTime;for(const k of c.splice(0))try{k.gain.gain.cancelScheduledValues(v),k.gain.gain.setValueAtTime(0,v),k.osc.stop(v+.005)}catch{}},m=(v,k)=>{const b=t.createOscillator(),S=t.createGain();b.frequency.value=k?rc.accent:rc.beat;const E=Av(a.volume,k);S.gain.setValueAtTime(0,v),S.gain.linearRampToValueAtTime(E,v+.001),S.gain.exponentialRampToValueAtTime(Math.max(E*.001,1e-5),v+Ao),b.connect(S).connect(s),b.start(v),b.stop(v+Ao+.005);const g={osc:b,gain:S,end:v+Ao+.005};c.push(g),b.onended=()=>{const x=c.indexOf(g);x>=0&&c.splice(x,1);try{S.disconnect()}catch{}},l.scheduled++},w=()=>{const v=e.transport();if(!v.running){u&&y(),u=!1,d=Number.NEGATIVE_INFINITY;return}if(u||(d=Number.NEGATIVE_INFINITY),u=!0,!p())return;const k=e.now(),b=v.beatAt(k),S=v.beatAt(k+Sv),E=Ev(Math.max(b,d+1),S,v.meter?.beatsPerBar??4);for(const g of E){const x=e.toContextTime(v.timeAt(g.beat));x<t.currentTime||(m(x,g.accent),d=g.beat)}},h=e.ticker(w);return h.start(),{prefs:()=>({...a}),set(v){const k=oc(JSON.stringify({...a,...v}));if(k.on===a.on&&k.volume===a.volume)return;const b=p();a=k;try{n?.setItem(ac,JSON.stringify(a))}catch{}b&&!p()&&y(),f()},want(v,k){if(typeof v!="string"||!v)return;const b=r.has(v);if(k===b)return;const S=p();k?r.add(v):r.delete(v),S&&!p()&&y(),f()},active:p,onChange(v){return o.add(v),()=>o.delete(v)},bus:s,stats:l,dispose(){h.dispose(),y(),s.disconnect(),o.clear()}}}function Tv(){try{return typeof localStorage>"u"?null:localStorage}catch{return null}}const vt=-54,$a=6,at=-vt/($a-vt),Lv=-6,yi=(Lv-vt)/($a-vt);function bp(e){const t=Math.min(1,Math.max(0,e));return t===0?Number.NEGATIVE_INFINITY:vt+t*($a-vt)}function Cv(e){return e===Number.NEGATIVE_INFINITY?0:10**(e/20)}function Nv(e){return e<=0?Number.NEGATIVE_INFINITY:20*Math.log10(e)}function Lt(e){return Cv(bp(e))}function Iv(e){if(e===Number.NEGATIVE_INFINITY||e<-99)return"−∞";const t=e.toFixed(1);return t.startsWith("-")?`−${t.slice(1)}`:e>.05?`+${t}`:t}function Fv(e){const t=e.some(n=>n.solo);return e.map(n=>n.mute||t&&!n.solo?0:Lt(n.position))}function is(e){return e===Number.NEGATIVE_INFINITY||Number.isNaN(e)?0:Math.min(1,Math.max(0,(e-vt)/($a-vt)))}function ic(e){return is(Nv(e))}const sc=[0,-6,-12,-24,-48].map(e=>({value:is(e),label:e===0?"0":`−${-e}`})),Pv=1;function Rv(e){let t=0,n=0;for(const a of e){const r=Math.abs(a);r>t&&(t=r),n+=a*a}return{peak:t,rms:e.length>0?Math.sqrt(n/e.length):0}}function lc(e){const t=e.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(t==="")return null;if(t==="off"||t==="-inf"||t==="-∞"||t==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(t))return null;const n=Number(t.replace(",","."));return Number.isFinite(n)?n<vt?0:is(Math.min($a,n)):null}function Dv(e){const t=Math.min(1,Math.max(-1,Number.isFinite(e)?e:0)),n=Math.cos(Math.abs(t)*Math.PI/2);return t>0?[n,1]:t<0?[1,n]:[1,1]}const ss="netcomposer.studio.mix.v1",yp={position:yi,mute:!1,solo:!1,sendA:0,sendB:0,pan:0,shade:0,trim:0},vp=-12,wp=24,zv=.5;function xp(e){if(typeof e!="number"||!Number.isFinite(e))return 0;const t=Math.round(Math.min(wp,Math.max(vp,e))*10)/10;return t===0?0:t}const Ov=8;function Bv(e){return typeof e=="number"&&Number.isInteger(e)&&e>=1&&e<=Ov?e:0}function fa(){return{v:1,channels:{},master:at,returns:{a:{on:!0,level:at},b:{on:!0,level:at}},insert:{on:!1},fx:{},channelFx:{},masterFx:null}}const oa=(e,t)=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t,_v=e=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(-1,e)):0,xr=(e,t)=>typeof e=="boolean"?e:t,Ct=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{};function jv(e){const t=Ct(e);return{position:oa(t.position,yp.position),mute:xr(t.mute,!1),solo:xr(t.solo,!1),sendA:Math.min(at,oa(t.sendA,0)),sendB:Math.min(at,oa(t.sendB,0)),pan:_v(t.pan),shade:Bv(t.shade),trim:xp(t.trim)}}function kp(e){const t=fa(),n=Ct(e);if(n.v!==1)return t;const a={};for(const[u,c]of Object.entries(Ct(n.channels)))u.length>0&&u.length<=64&&(a[u]=jv(c));const r=Ct(n.returns),o=(u,c)=>{const p=Ct(u);return{on:xr(p.on,c.on),level:oa(p.level,c.level)}},s={},l=Ct(n.fx);for(const u of["a","b","insert"])l[u]!==void 0&&(s[u]=l[u]);const d={};for(const[u,c]of Object.entries(Ct(n.channelFx)))u.length>0&&u.length<=64&&c&&typeof c=="object"&&(d[u]=c);return{v:1,channels:a,master:oa(n.master,t.master),returns:{a:o(r.a,t.returns.a),b:o(r.b,t.returns.b)},insert:{on:xr(Ct(n.insert).on,t.insert.on)},fx:s,channelFx:d,masterFx:n.masterFx&&typeof n.masterFx=="object"?n.masterFx:null}}function $p(){try{return globalThis.localStorage??null}catch{return null}}function qv(e=$p()){try{const t=e?.getItem(ss);return t?kp(JSON.parse(t)):fa()}catch{return fa()}}function Sp(e,t=$p()){try{return t?.setItem(ss,JSON.stringify(e)),t!==null}catch{return!1}}const qr=3;function Vv(e,t=qr){return Math.max(1,Math.ceil(e/t))}function cc(e,t=qr){return Math.max(0,Math.floor(e/t))}function Hv(e,t,n,a=null,r=qr){const o=Vv(n.length,r)-1;if(!e||e.key!==t)return 0;const s=a===null?-1:n.indexOf(a);if(s>=0)return cc(s,r);const l=new Set(e.ids);let d=-1;return n.forEach((u,c)=>{l.has(u)||(d=c)}),d>=0?cc(d,r):Math.min(o,Math.max(0,e.page))}const Uv=["M0 10 L0 1 L20 1 L20 10","M0 10 C3 10 6 1 12 1 L20 1","M0 10 C10 10 16 6 20 1 L20 10","M0 10 L0 1 L3 1 C5 1 6 9 11 10 L20 10","M0 8 C8 8 12 2 20 2"],Va="Custom";function dc(e,t){const n={};for(const a of le("gate")?.dials??[])n[a.key]=Number(e.getParam(t,a.key)??a.default);return n}function Gv(e,t,n,a,r){const o=le("gate"),s=g=>o?.dials.find(x=>x.key===g),l=t.getPattern(n)??{levels:Array(16).fill(100),shapes:Array(16).fill(0)},d=dc(t,n),u=d.steps===8?8:16,c=Ld(d),p=g=>`hack-${e}-${n}-${g}`,f=hm({dials:d,pattern:l}),y=(g,x)=>{t.setParam(n,g,x),r.render()},m=(g,x)=>{const A=s(g);return A?.options?{type:"choice",id:p(g),label:A.label,caption:x,value:String(d[g]),options:A.options.map($=>({value:String($.value),label:$.label})),onChange:$=>y(g,Number($))}:null},w=g=>{const x=s(g);return x?r.dial(x):null},h={type:"levelSteps",id:p("steps-strip"),label:`${f===Va?"Gate":f} steps`,steps:l.levels.slice(0,u).map((g,x)=>({level:g/100,shape:l.shapes[x]})),played:c,swing:.5+.25*(d.swing??0)/100,on:a,shapes:dm.map((g,x)=>({value:x,label:g,icon:Uv[x]})),curve:(g,x)=>mm(d,l,g,x),onLevels:g=>{const x=l.levels.slice();g.forEach((A,$)=>{x[$]=Math.round(A*100)}),t.setPattern(n,{levels:x}),r.render()},onShape:(g,x)=>{const A=l.shapes.slice();A[g]=x,t.setPattern(n,{shapes:A}),r.render()},onShapeAll:g=>{t.setPattern(n,{shapes:Array(16).fill(g)}),r.render()},playhead:()=>{const g=t.beatAt(r.heardAt());return g?{step:fm(dc(t,n),g.beat,g.beatsPerBar),locked:g.locked}:null},help:ne["gate:steps"]},k=[{type:"select",id:p("pattern"),label:"Pattern",value:f,options:[...Mn.map(g=>({value:g.name,label:g.name})),{value:Va,label:Va}],onChange:g=>{g!==Va&&(t.setGatePattern(n,g),r.render())}},h,m("rate","Rate"),w("swing"),w("depth"),w("mix")],b=d.mode===1,S=[m("steps","Steps"),m("mode","Mode"),w("smooth"),w("spread"),...b?[w("res")]:[]],E=g=>g!==null;return{controls:k.filter(E),more:S.filter(E)}}const Ep=e=>!!e&&typeof e=="object"&&Array.isArray(e.chain);function Wv(e,t){if(!Ep(e))return null;const n=e.chain.findIndex(a=>a?.id===t);return n<0?null:{slot:JSON.parse(JSON.stringify(e.chain[n])),index:n}}function Kv(e,t,n){if(!Ep(e)||e.chain.length>=n||e.chain.some(r=>r?.id===t.slot.id))return null;const a=e.chain.slice();return a.splice(Math.max(0,Math.min(a.length,t.index)),0,t.slot),{...e,v:2,chain:a}}const uc="plugin-url",Mo="plugin-folder",pc="plugin-files",To="kept:",Lo="forget:",Co="listed:",Yv="../plugins/registry.json",B={urlTitle:"Load a plugin from a URL",urlBody:"Paste the address of the plugin's plugin.json.",urlField:"Address",urlPlaceholder:"https://…/plugin.json",urlNext:"Next",warnTitle:"Run this plugin?",warnBody:e=>`This runs code from ${e} in your browser. Only load plugins from people you trust. Listed plugins are checked; this one is not.`,warnLoad:"Load and run",badUrl:"That isn't a plugin address. Use https://, or http://localhost while you build one.",badUrlLocal:"Plugins load from this computer for now: pick its files, or use http://localhost while you build one.",urlPlaceholderLocal:"http://localhost:…/plugin.json",folder:"Load plugin folder…",files:"Load plugin from files…",url:"Load plugin from URL…",thisComputer:"this computer",kept:e=>`${e} (this computer)`,fileWarnBody:(e,t)=>`This runs ${e} by ${t}, from files on this computer, in your browser. Only run code you made or trust. It is kept in this browser until you remove it.`,forget:e=>`Remove ${e} from this computer…`,forgetTitle:e=>`Remove ${e}?`,forgetBody:"This browser forgets its copy. Slots that use it keep their dials and play as a wire after a reload.",forgetConfirm:"Remove",forgotten:e=>`${e} is removed from this computer.`,reloadToUse:(e,t)=>`Kept ${e} ${t}. Reload the page to hear the new code.`,reloadToHear:e=>`${e} has new code. Reload the page to hear it; until then the old code plays.`,reloadAction:"Reload",newCode:"Reload page: new code.",stuck:(e,t)=>`${e} on ${t} got stuck in a loop and was stopped. The rest of the mix plays on.`,frozenTitle:"The sound stopped",frozenBody:e=>`${e} froze the audio on this page, and it can't be restarted here. In a new tab your mix comes back with ${e} off (add it again to retry). This page stops saving.`,frozenOpen:"Open new tab",frozenStay:"Stay here",frozenShort:"Stopped: froze audio.",notKept:"Not on this computer.",pickAgain:"Pick files…",badUrlShort:"Not a plugin address.",failedShort:"Couldn't load it.",missing:"Missing: not loaded.",missingNoUrl:"Missing: no address saved.",through:"Sound passes through.",dialsKept:"Its dials are kept.",from:e=>`From ${e}`,load:"Load",loadAsk:"Load…",loading:"Loading…",retry:"Remove, add to retry."};function Xv(e){const t={1:"Stopped: failed to start.",2:"Stopped: it crashed.",3:"Stopped: bad numbers.",4:"Stopped: a dial crashed it.",5:"Stopped: code not loaded.",6:"Stopped: stuck in a loop."};for(const[n,a]of Object.entries(lr))if(a===e)return t[Number(n)];return"Stopped."}function Gn(e){if(wr(e))return B.thisComputer;try{return new URL(e).host||e}catch{return e}}function Jv(e,t,n=!0){let a;try{a=new URL(e.trim(),t)}catch{return null}const r=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(a.hostname);return a.protocol==="https:"&&(n||r)||a.protocol==="http:"&&r?a.href:null}function Qv(e){const t=new URL(Yv,e.base).href;let n=[];const a=new Set,r=new Map,o=[],s=new Set,l=()=>{for(const E of s)E()},d=E=>String(E?.message??E).replace(/^nc-fx plugins?: /,""),u=e.remote!==!1,c=e.store??gp();let p=[];const f=new Map,y=new Set,m=E=>{y.has(E)||(y.add(E),l())},w=e.frozen,h=async()=>{try{p=await c.list()}catch(E){console.warn(`Studio plugins: can't read this computer's plugins (${d(E)})`)}l()},v=h(),k=u?im(t,{fetch:e.fetch}).then(E=>{n=E.registry.plugins;for(const x of E.errors)console.warn(`Studio plugins: registry ${x}`);l();const g=o.splice(0);g.length&&S.restore(g)}).catch(E=>{console.info(`Studio plugins: no listed plugins (${d(E)})`)}):Promise.resolve(),b=async(E,g)=>{a.add(E),r.delete(E),l();try{const{entry:x,stale:A}=await g();return x.plugin&&(A&&m(x.plugin.id),w?.clear(x.plugin.id)),x.type}catch(x){throw r.set(E,d(x)),x}finally{a.delete(E),l()}},S={listed:()=>n,loaded:()=>If().filter(E=>!E.plugin.listed&&!wr(E.plugin.url)),remote:u,local:()=>p,stale:E=>y.has(E),frozen:E=>!!w?.has(E),async addPicked(E){const g=await xv(E);w?.clear(g.id);const x=le(`plugin:${g.id}`);if(x){const $=x.plugin?.version===g.version&&f.get(g.id)===g.sha256;return await c.put(g),await h(),$||m(g.id),$?{type:x.type}:{reload:!0}}const A=await b(g.id,()=>al(e.ctx,{manifest:g.manifest,dsp:g.dsp,dspName:g.dspName},{moduleUrl:e.moduleUrl,url:nc(g.id)}));return f.set(g.id,g.sha256),await c.put(g),await h(),{type:A}},async loadKept(E){w?.clear(E);const g=le(`plugin:${E}`),x=await c.get(E);if(g){const $=f.get(E);return x&&$&&$!==x.sha256&&m(E),g.type}if(!x)throw new Error(B.notKept);const A=await b(E,()=>al(e.ctx,{manifest:x.manifest,dsp:x.dsp,dspName:x.dspName},{moduleUrl:e.moduleUrl,url:nc(E)}));return f.set(E,x.sha256),A},async forget(E){await c.remove(E),await h()},listingFor(E){const g=n.find(A=>A.id===E.id);if(!g)return null;const x=new URL(g.manifest,t).href;return!E.url||E.url===x?g:null},loading:E=>a.has(E),async loadListed(E){w?.clear(E);const g=le(`plugin:${E}`);if(g)return g.type;await k;const x=n.find(A=>A.id===E);if(!x)throw new Error(`${E} isn't listed`);return b(E,()=>sm(e.ctx,x,t,{moduleUrl:e.moduleUrl,fetch:e.fetch}))},loadUrl(E){return b("url",()=>Ad(e.ctx,E,{moduleUrl:e.moduleUrl,fetch:e.fetch,base:e.base}))},restore(E){for(const g of E)if(!(g.status!=="missing"||a.has(g.id)||le(`plugin:${g.id}`))&&!w?.has(g.id)){if(wr(g.url)){v.then(()=>{p.some(x=>x.id===g.id)&&!a.has(g.id)&&!le(`plugin:${g.id}`)&&S.loadKept(g.id).catch(()=>{})});continue}if(u){if(!n.length){o.some(x=>x.id===g.id)||o.push(g);continue}S.listingFor(g)&&S.loadListed(g.id).catch(()=>{})}}},onChange(E){return s.add(E),()=>s.delete(E)},problem:E=>r.get(E)??null,clearProblem(E){r.delete(E)&&l()}};return S}const Ap="netcomposer.studio.sends.v2";function Zv(e){try{return e?.getItem(Ap)==="1"}catch{return!1}}function ew(e,t){try{e?.setItem(Ap,t?"1":"0")}catch{}}function tw(e,t){try{return!!(e?.matchMedia(t.portrait).matches||e?.matchMedia(t.landscape).matches)}catch{return!1}}function kr(e){return e.hacksShown!==null?{kind:"stack",id:e.hacksShown}:e.sendsShown?{kind:"sends"}:{kind:"none"}}function nw(e){return kr(e).kind==="sends"?{hacksShown:null,sendsShown:!1}:{hacksShown:null,sendsShown:!0}}function aw(e){for(const t of e)if(t.sendA>0||t.sendB>0)return!0;return!1}function hc(e,t){return e&&!t}function rw(e,t,n){return e&&kr(t).kind==="none"&&n.every(a=>a===0)}const Mp="netcomposer.studio.strip-fold.v1";function Tp(e){try{const t=e?.getItem(Mp),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Lp(e,t){try{e?.setItem(Mp,JSON.stringify([...t].sort()))}catch{}return t}function Cp(e,t,n){const a=new Set(Tp(e));return n?a.add(t):a.delete(t),Lp(e,a)}function ow(e,t){return Cp(e,t,!1)}function iw(e,t){const n=new Set(t),a=Tp(e),r=new Set([...a].filter(o=>n.has(o)));return r.size===a.size?a:Lp(e,r)}function sw(e,t){if(!e.includes(t.id))return[...e];const n=e.filter(o=>o!==t.id),a=t.before===null?-1:n.indexOf(t.before),r=a<0?n.length:a;return[...n.slice(0,r),t.id,...n.slice(r)]}function lw(e,t,n){const a=e.indexOf(t);if(a<0)return null;const r=a+n;return r<0||r>=e.length?null:n<0?{id:t,before:e[r]}:{id:t,before:e[r+1]??null}}function cw(e,t){if(e.length===0)return null;let n=e[0],a=Number.POSITIVE_INFINITY;for(const r of e){const o=t<r.left?r.left-t:t>r.left+r.width?t-(r.left+r.width):0;o<a&&(n=r,a=o)}return{target:n.id,side:t<n.left+n.width/2?"before":"after"}}function fc(e,t,n){const a=e.indexOf(n.target);if(a<0||!e.includes(t))return null;const r=n.side==="before"?n.target:e[a+1]??null;if(r===t)return null;const o={id:t,before:r};return sw(e,o).every((l,d)=>l===e[d])?null:o}const dw=-18,uw=-20,Np=3,pw=[-20,-10,-7,-5,-3,-2,-1,0,1,2,3],mc=[-20,-10,-7,-5,-3,0,1,2,3],hw=.3,fw=6.638/hw,mw=48;function gw(e){return e-dw}function Ip(e){return Number.isFinite(e)?Math.min(1,Math.max(0,10**((e-Np)/20))):e>0?1:0}function bw(e){return e>0?Ip(gw(20*Math.log10(e))):0}function ls(e){return(Math.min(1,Math.max(0,e))*2-1)*mw}const gc={x:0,v:0};function yw(e,t,n,a=!1){if(a)return{x:t,v:0};if(!(n>0))return e;const r=fw,o=e.x-t,s=e.v+r*o,l=Math.exp(-r*n),d=t+(o+s*n)*l,u=(e.v-r*s*n)*l;return d>=1?{x:1,v:0}:d<=0?{x:0,v:0}:{x:d,v:u}}function vw(e,t){return Math.abs(e.x-t)<1e-4&&Math.abs(e.v)<.001}const Fp="netcomposer.studio.vu.v1";function ww(e){try{return e?.getItem(Fp)==="1"}catch{return!1}}function xw(e,t){try{e?.setItem(Fp,t?"1":"0")}catch{}}const Pp="netcomposer.studio.vu-fold.v1";function kw(e){try{return e?.getItem(Pp)==="1"}catch{return!1}}function $w(e,t){try{e?.setItem(Pp,t?"1":"0")}catch{}}const Sw="http://www.w3.org/2000/svg",vi=200,No=112,bn=vi/2,ia=132,bc=100,Ew=108,Aw=105,Mw=116,Tw=103,Lw=112,dt=(e,t)=>{const n=document.createElementNS(Sw,e);for(const[a,r]of Object.entries(t))n.setAttribute(a,String(r));return n},yc=e=>Math.round(e*100)/100;function sa(e,t){const n=ls(Ip(e))*Math.PI/180;return[yc(bn+t*Math.sin(n)),yc(ia-t*Math.cos(n))]}function vc(e,t,n){const[a,r]=sa(e,n),[o,s]=sa(t,n);return`M ${a} ${r} A ${n} ${n} 0 0 1 ${o} ${s}`}const Cw=e=>e>0?`+${e}`:e<0?`−${-e}`:"0";function wc(e){const t=dt("svg",{class:"vu-meter",viewBox:`0 0 ${vi} ${No}`,role:"img","aria-label":`${e==="L"?"Left":"Right"} VU meter`,"data-vu-side":e});t.append(dt("rect",{class:"vu-face",x:.5,y:.5,width:vi-1,height:No-1,rx:4})),t.append(dt("path",{class:"vu-arc",d:vc(uw,0,bc)})),t.append(dt("path",{class:"vu-zone",d:vc(0,Np,Tw)}));for(const o of pw){const[s,l]=sa(o,bc),[d,u]=sa(o,mc.includes(o)?Ew:Aw);t.append(dt("line",{class:o>0?"vu-tick vu-red":"vu-tick",x1:s,y1:l,x2:d,y2:u}))}for(const o of mc){const[s,l]=sa(o,Mw),d=dt("text",{class:o>0?"vu-num vu-red":"vu-num",x:s,y:l,"text-anchor":"middle"});d.textContent=Math.abs(o)===20||o===3?Cw(o):String(Math.abs(o)),t.append(d)}const n=dt("text",{class:"vu-legend",x:bn,y:92,"text-anchor":"middle"});n.textContent="VU";const a=dt("text",{class:"vu-side",x:10,y:No-10});a.textContent=e;const r=dt("line",{class:"vu-needle",x1:bn,y1:ia,x2:bn,y2:ia-Lw,transform:`rotate(${ls(0)} ${bn} ${ia})`});return t.append(n,a,r),{svg:t,needle:r}}function Nw(e){const t=document.createElement("div");t.className="vu",t.dataset.vu="",t.setAttribute("role","group"),t.setAttribute("aria-label","VU meters");const n=document.createElement("div");n.className="vu-hd";const a=document.createElement("button");a.type="button",a.className="nc-fold-toggle",a.dataset.vuFold="";const r=document.createElement("span");r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),a.append(r),a.setAttribute("data-nc-help",ne["vu:fold"]);const o=document.createElement("span");o.className="nc-strip-name vu-name",o.textContent="Meters",o.setAttribute("data-nc-help",ne["vu:module"]);const s=document.createElement("button");s.type="button",s.className="nc-page-action vu-hide",s.dataset.vuRemove="",s.textContent="Hide",s.setAttribute("aria-label","Hide VU meters"),s.setAttribute("data-nc-help",ne["vu:remove"]),s.addEventListener("click",()=>e.onRemove(s)),n.append(a,o,s);const l=document.createElement("div");l.className="vu-mini",l.setAttribute("aria-hidden","true");const d=["L","R"].map(v=>{const k=document.createElement("span");k.className="vu-bar",k.dataset.side=v;const b=document.createElement("span");return b.className="vu-bar-fill",k.append(b),l.append(k),b});let u=e.folded;const c=()=>{t.toggleAttribute("data-folded",u),a.setAttribute("aria-expanded",u?"false":"true"),a.setAttribute("aria-label",u?"Expand VU meters":"Minimize VU meters"),a.title=u?"Expand":"Minimize"};c(),a.addEventListener("click",()=>{u=!u,c(),e.onFold(u)});const p=wc("L"),f=wc("R");t.append(n,p.svg,f.svg,l);const y=matchMedia("(prefers-reduced-motion: reduce)"),m=[gc,gc],w=[Number.NaN,Number.NaN],h=[p.needle,f.needle];return{el:t,frame(v,k){let b=!1;for(const S of[0,1]){const E=v?bw(v[S]):0;m[S]=yw(m[S],E,k,y.matches),(!vw(m[S],E)||E>0)&&(b=!0);const g=Math.round(ls(m[S].x)*10)/10;g!==w[S]&&(w[S]=g,h[S].setAttribute("transform",`rotate(${g} ${bn} ${ia})`),d[S].style.transform=`scaleY(${Math.max(0,Math.min(1,m[S].x)).toFixed(3)})`,t.dataset[S===0?"vuL":"vuR"]=g.toFixed(1))}return b}}}const Iw="netcomposer.studio.hidden.v1",Ha=1/120,Mt="master",xc="Inserts",Fw="(max-width: 768px)",Rp=8,ar=e=>Iv(bp(e)),kc=e=>{const t=ar(e);return t==="−∞"?"off":`${t} dB`};function Pw(e,t){return vn.find(n=>n.type===e)?.dials.find(n=>n.key===t)}function Rw(e,t,n){const a=n.bpm,r=M=>{const N=n.order(),I=N.indexOf(M);return I<0?N.length:I},o=(M,N,I,O)=>{const z=Pw(I,O);if(!z||!N)return null;const Q=Number(N.getParam(I,O)??z.default),ae=`mix-${M}-${O}`;return z.options?{type:"select",id:ae,label:z.label,value:String(Q),options:z.options.map(D=>({value:String(D.value),label:D.label})),onChange:D=>{N.setParam(I,O,Number(D)),ie.render()}}:{type:"slider",id:ae,label:z.label,min:z.min,max:z.max,step:z.step??1,taper:vl(z),value:Q,valueText:z.format(Q,a()),onChange:D=>{N.setParam(I,O,D),ie.render()}}},s=(M,N,I,O)=>O.map(z=>o(M,N,I,z)).filter(z=>z!==null),l=matchMedia(Fw);let d=null;const u=M=>{d=M,ie.render()},c=M=>u(d===M?null:M);l.addEventListener("change",()=>ie.render());const p=(M,N,I,O)=>{M.setParam(N,I,O),ie.render()},f=(M,N,I,O)=>qm(N,I,{id:`hack-${M}-${I}-graph`,on:O,set:(z,Q)=>p(N,I,z,Q),help:{graph:ne["eq:graph"],low:ne["eq:low"],mid:ne["eq:mid"],high:ne["eq:high"]}}),y=(M,N,I,O)=>{const z=Number(N.getParam(I,O.key)??O.default),Q=`hack-${M}-${I}-${O.key}`,ae=D=>p(N,I,O.key,D);return O.options?{type:"select",id:Q,label:O.label,value:String(z),options:O.options.map(D=>({value:String(D.value),label:D.label})),onChange:D=>ae(Number(D))}:{type:"slider",id:Q,label:O.label,min:O.min,max:O.max,step:O.step??.001,taper:vl(O),value:z,valueText:bd(O,z,a()),onChange:ae}},m="",w={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3},drive:{drive_db:6}};let h=Oy(we(),`${Mt}/${cp}`);const v=M=>({folded:h.has(M),onFold:N=>{h=sp(we(),M,N),ie.render()},foldHelp:ne["fx:fold"]}),k=n.plugins;k?.onChange(()=>ie.render());const b=new Map,S=M=>String(M?.message??M).replace(/^nc-fx plugins?: /,""),E=(M,N,I)=>{b.set(M,N),ie.render(),Ft({message:I,duration:9e3,anchor:ue.el.querySelector(`[data-nc-id='hack-${M}-add']`)})},g=(M,N)=>{const I=Ft({message:N,duration:12e3,actionLabel:B.reloadAction,onAction:()=>location.reload(),anchor:ue.el.querySelector(`[data-nc-id='hack-${M}-add']`)});I.el.dataset.pluginReload=M},x=M=>le(M)?.label??M,A=M=>!!M&&M.startsWith("plugin:")&&!!k?.stale(M.slice(7)),$=async(M,N,I)=>{if(!k)return null;const O=I??await Ag({title:B.urlTitle,body:B.urlBody,field:{label:B.urlField,placeholder:k.remote?B.urlPlaceholder:B.urlPlaceholderLocal,type:"url"},confirmLabel:B.urlNext,returnFocus:N??void 0});if(!O)return null;const z=Jv(O,location.href,k.remote);if(!z)return E(M,B.badUrlShort,k.remote?B.badUrl:B.badUrlLocal),null;if(!await tt({title:B.warnTitle,body:B.warnBody(Gn(z)),confirmLabel:B.warnLoad,danger:!0,returnFocus:N??void 0}))return null;try{const ae=await k.loadUrl(z);return A(ae)&&g(M,B.reloadToHear(x(ae))),ae}catch(ae){return ae?.reload?(b.set(M,B.failedShort),ie.render(),g(M,S(ae))):E(M,B.failedShort,S(ae)),null}},L=M=>{const N=document.createElement("input");return N.type="file",N.hidden=!0,N.dataset.ncId="plugin-files",M?N.webkitdirectory=!0:(N.multiple=!0,N.accept=".json,.js,.mjs,application/json,text/javascript"),document.body.append(N),new Promise(I=>{const O=z=>{N.remove(),I(z)};N.addEventListener("change",()=>O(N.files?.length?[...N.files]:null)),N.addEventListener("cancel",()=>O(null)),N.click()})},C=async(M,N,I)=>{if(!k)return null;const O=await L(I);if(!O)return null;let z;try{z=await wv(O)}catch(ae){return E(M,B.failedShort,S(ae)),null}if(!await tt({title:B.warnTitle,body:B.fileWarnBody(z.manifest.name,z.manifest.author),confirmLabel:B.warnLoad,danger:!0,returnFocus:N??void 0}))return null;try{const ae=await k.addPicked(z);return"reload"in ae?(g(M,B.reloadToUse(z.manifest.name,z.manifest.version)),null):ae.type}catch(ae){return E(M,B.failedShort,S(ae)),null}},R=async(M,N,I)=>{if(!k)return;const O=k.local().find(Q=>Q.id===N)?.name??N;await tt({title:B.forgetTitle(O),body:B.forgetBody,confirmLabel:B.forgetConfirm,danger:!0,returnFocus:I??void 0})&&(await k.forget(N),Ft({message:B.forgotten(O),duration:5e3,anchor:ue.el.querySelector(`[data-nc-id='hack-${M}-add']`)}))},_=async(M,N,I,O)=>{b.delete(M);let z=I;if(I===Mo||I===pc)z=await C(M,O,I===Mo);else if(I.startsWith(Lo))await R(M,I.slice(Lo.length),O),z=null;else if(I.startsWith(To)&&k){ie.render();try{z=await k.loadKept(I.slice(To.length)),A(z)&&g(M,B.reloadToHear(x(z)))}catch(Q){E(M,B.failedShort,S(Q)),z=null}}else if(I===uc)z=await $(M,O);else if(I.startsWith(Co)&&k){ie.render();try{z=await k.loadListed(I.slice(Co.length))}catch(Q){E(M,B.failedShort,S(Q)),z=null}}z&&N.addEffect(z,{dials:w[z]}),ie.render()},U=()=>k?[...k.listed().map(M=>({value:`${Co}${M.id}`,label:M.name,group:"Plugins"})),...k.local().map(M=>({value:`${To}${M.id}`,label:B.kept(M.name),group:"Plugins"})),...k.loaded().map(M=>({value:M.type,label:`${M.label} (${Gn(M.plugin.url)})`,group:"Plugins"})),{value:Mo,label:B.folder,group:"Plugins"},{value:pc,label:B.files,group:"Plugins"},{value:uc,label:B.url,group:"Plugins"},...k.local().map(M=>({value:`${Lo}${M.id}`,label:B.forget(M.name),group:"Plugins"}))]:[];let G=null,re=null,he=null;const ee=M=>t.masterFx===M||t.list().some(N=>N.fx===M),X=M=>requestAnimationFrame(()=>ue.el.querySelector(M)?.focus()),Xe=(M,N,I,O,z,Q,ae)=>{const D=Wv(I.getState(),O);if(!D||!I.removeEffect(O))return;const be=!!ae&&ae===document.activeElement;if(he?.close(),ie.render(),be){const Vt=I.getChain()[D.index];X(Vt?`[data-nc-id='hack-${M}-${Vt.id}'] [data-nc-fx-remove]`:`#hack-${M}-add-type`)}const K=Ft({message:`${z} removed from ${N}.`,actionLabel:"Undo",anchor:ue.el.querySelector("[data-nc-area='fx']"),onAction:()=>Ve(M,I,D,Q),onClose:()=>{he===K&&(he=null)}});K.el.dataset.insertUndo=M,he=K},Ve=(M,N,I,O)=>{if(!ee(N))return;const z=Kv(N.getState(),I,O);let Q=I.slot.id;if(z)N.setState(z);else{const{type:ae,dials:D,bypass:be,pattern:K}=I.slot;Q=N.addEffect(ae,{index:I.index,dials:D,bypass:be}),Q&&K&&N.setPattern(Q,K)}Q&&(d=M,re=`hack-${M}-${Q}`,ie.render(),X(`[data-nc-id='hack-${M}-${Q}'] [data-nc-fx-remove]`))},qt=(M,N,I,O)=>{const z=I.getChain(),Q=z.map((D,be)=>{const K=le(D.type),Vt=K?.dials??[],qs=de=>Xe(M,N,I,D.id,D.name,O,de),Vs=de=>{I.moveEffect(D.id,de),re=`hack-${M}-${D.id}`,ie.render()},_n=[];be>0&&_n.push({type:"button",id:`hack-${M}-${D.id}-left`,label:"Move left",on:!1,onPress:()=>Vs(be-1)}),be<z.length-1&&_n.push({type:"button",id:`hack-${M}-${D.id}-right`,label:"Move right",on:!1,onPress:()=>Vs(be+1)}),_n.push({type:"button",id:`hack-${M}-${D.id}-remove`,label:"Remove",ariaLabel:`Remove ${D.name} from ${N}`,on:!1,onPress:()=>qs(document.getElementById(`hack-${M}-${D.id}-remove`))});const Hs={onRemove:de=>qs(de),removeLabel:`Remove ${D.name}`},pe=D.plugin,Oe=(de,Ht,dn=!1)=>({type:"note",id:`hack-${M}-${D.id}-${de}`,...dn?{tone:"danger"}:{},text:Ht});if(pe&&pe.status==="missing"){const de=k?.listingFor(pe)??null,Ht=wr(pe.url),dn=Ht&&!!k?.local().some(Na=>Na.id===pe.id),Us=k?.loading(pe.id)??!1,Gs=Us?[Oe("missing",B.loading)]:[Oe("missing",k?.frozen(pe.id)?B.frozenShort:Ht&&!dn?B.notKept:pe.url?B.missing:B.missingNoUrl,!0),Oe("through",B.through),Oe("kept",B.dialsKept),...pe.url?[Oe("from",B.from(Gn(pe.url)))]:[]];return k&&pe.url&&!Us&&Gs.push({type:"button",id:`hack-${M}-${D.id}-load`,label:de||dn?B.load:Ht?B.pickAgain:B.loadAsk,ariaLabel:de||dn?`Load ${pe.name}`:Ht?`Pick ${pe.name}'s folder (asks first)`:`Load ${pe.name} from ${Gn(pe.url)} (asks first)`,on:!1,onPress:()=>{const Na=document.getElementById(`hack-${M}-${D.id}-load`);de?k.loadListed(pe.id).catch(()=>ie.render()):dn?k.loadKept(pe.id).catch(()=>ie.render()):Ht?C(M,Na,!0).then(()=>ie.render()):$(M,Na,pe.url)}}),{type:"fx",id:`hack-${M}-${D.id}`,title:`${be+1} · ${D.name}`,...v(`${M}/${D.id}`),depth:be%4+1,controls:Gs,more:_n,...Hs}}const cn=K&&"plugin"in K?K.plugin:void 0,Qh=cn?[Oe("by",`By ${cn.author}`),Oe("version",`${cn.licence} · ${cn.version}`),Oe("source",cn.listed?"Listed":B.from(Gn(cn.url)))]:[],Zh=pe?.status==="failed"?[Oe("failed",Xv(pe.error),!0),Oe("through",B.through),Oe("retry",B.retry)]:pe&&k?.stale(pe.id)?[Oe("newcode",B.newCode)]:[],Ca=D.type==="gate"?Gv(M,I,D.id,!D.bypass,{dial:de=>y(M,I,D.id,de),render:()=>ie.render(),heardAt:()=>t.ctx.currentTime-(t.ctx.outputLatency||0)}):null;return{type:"fx",id:`hack-${M}-${D.id}`,title:`${be+1} · ${D.name}`,...v(`${M}/${D.id}`),depth:be%4+1,on:!D.bypass,meter:co(I,D.id)??void 0,meterHelp:ne["fx:meter"],onToggle:de=>{I.setParam(D.id,"bypass",!de),ie.render()},controls:Ca?Ca.controls:[...Zh,...D.type==="eq"?[f(M,I,D.id,!D.bypass)]:[],...Vt.filter(de=>!de.more).map(de=>y(M,I,D.id,de))],maxHelp:ne["fx:max"],...Hs,more:[...Ca?Ca.more:Vt.filter(de=>de.more).map(de=>y(M,I,D.id,de)),...Qh,..._n]}}),ae=z.length>=O;return Q.push({type:"fx",id:`hack-${M}-add`,title:`${N} · Inserts`,...v(`${M}/add`),depth:z.length%4+1,controls:[{type:"note",id:`hack-${M}-note`,...b.get(M)?{tone:"danger"}:{},text:b.get(M)??(k?.loading("url")||k?.listed().some(D=>k.loading(D.id))||k?.local().some(D=>k.loading(D.id))?B.loading:ae?`${z.length} of ${O}: the stack is full.`:z.length===0?"No effects yet.":`${z.length} of ${O}, first to last.`)},...ae?[]:[{type:"select",id:`hack-${M}-add-type`,label:"Add",value:m,options:[{value:m,label:"Effect…"},...Lf.map(D=>({value:D,label:le(D)?.label??D})),...U()],onChange:D=>{if(D===m)return;const be=document.getElementById(`hack-${M}-add-type`);be instanceof HTMLSelectElement&&(be.value=m),_(M,I,D,be)}}]]}),Q},La=M=>{const N=t.returns[M];return{type:"slider",id:`mix-${M}-return`,label:"Return",min:0,max:1,step:Ha,value:N.level,valueText:kc(N.level),onChange:I=>t.setReturn(M,{level:I})}};let ve=Zv(we());const W=()=>tw(globalThis.window,{portrait:Hu,landscape:Ud}),Se=()=>{const M=nw({hacksShown:d,sendsShown:ve});d=M.hacksShown,M.sendsShown!==ve&&(ve=M.sendsShown,ew(we(),ve)),ie.render()},ge=(M,N,I)=>{const O=lw(n.order(),M,N);if(!O)return;n.onReorder?.(O.id,O.before);const Q=ue.el.querySelector(`${Pt}[data-nc-id="strip-${CSS.escape(M)}"]`)?.querySelector(I);Q&&document.activeElement!==Q&&Q.focus()};let He=iw(we(),n.order());const lt=()=>rw(W(),{hacksShown:d,sendsShown:ve},t.list().map(M=>M.strip.trim)),Xh=()=>[...t.list()].sort((M,N)=>r(M.id)-r(N.id)).map(M=>({type:"strip",id:`strip-${M.id}`,label:M.name,value:M.strip.position,valueText:ar(M.strip.position),step:Ha,defaultValue:yi,resetText:`${ar(yi)} dB`,ticks:[...sc],mute:M.strip.mute,solo:M.strip.solo,silent:M.silent,sendsHidden:hc(W(),ve),onChange:N=>t.set(M.id,{position:N}),onTypeIn:N=>{const I=lc(N);I!==null&&t.set(M.id,{position:I})},onRemove:N=>n.onRemove(M.id,N),folded:He.has(M.id),onFold:N=>{He=Cp(we(),M.id,N),ie.render()},foldHelp:ne["strip:fold"],foldedHelp:ne["strip:folded"],onMove:N=>ge(M.id,N,"[data-nc-strip-grip]"),shade:M.strip.shade,onShade:N=>t.set(M.id,{shade:N??0}),...M.fx?{hacks:d===M.id,hacksLabel:xc,hacksEmpty:M.fx.getChain().length===0,onHacks:()=>c(M.id)}:{},trim:{id:`trim-${M.id}`,value:M.strip.trim,min:vp,max:wp,step:zv,defaultValue:0,ariaLabel:`${M.name} trim`,help:ne["strip:trim"],onChange:N=>t.set(M.id,{trim:xp(N)})},trimHidden:lt(),pan:{id:`pan-${M.id}`,value:M.strip.pan,ariaLabel:`${M.name} pan`,help:ne["strip:pan"],onChange:N=>t.set(M.id,{pan:Math.abs(N)<.005?0:N})},onMute:()=>t.set(M.id,{mute:!M.strip.mute}),onSolo:()=>t.set(M.id,{solo:!M.strip.solo}),sends:["A","B"].map(N=>{const I=N==="A"?"sendA":"sendB",O=M.strip[I];return{id:`send-${N.toLowerCase()}-${M.id}`,label:N,ariaLabel:`${M.name} send ${N}`,min:0,max:at,step:Ha*2,value:O,valueText:kc(O),defaultValue:0,onChange:z=>t.set(M.id,{[I]:z})}})})),Jh=()=>({type:"strip",id:`strip-${Mt}`,label:"Master",master:!0,sendsHidden:hc(W(),ve),trimRow:!0,trimHidden:lt(),onSendsView:Se,sendsView:kr({hacksShown:d,sendsShown:ve}).kind==="sends",sendsViewEmpty:!aw(t.list().map(M=>M.strip)),sendsViewLabel:"Sends",sendsViewHelp:ne["sends:view"],...t.masterFx?{hacks:d===Mt,hacksLabel:xc,hacksEmpty:t.masterFx.getChain().length===0,onHacks:()=>c(Mt)}:{},channels:2,value:t.masterPositionValue,valueText:ar(t.masterPositionValue),step:Ha,defaultValue:at,resetText:"0.0 dB",ticks:[...sc],onChange:M=>t.setMaster(M),onTypeIn:M=>{const N=lc(M);N!==null&&t.setMaster(N)}});let Ps=ap(we());const Rs=M=>({folded:Ps[M],foldSlim:!0,onFold:N=>{Ps=rp(we(),M,N),ie.render()},foldHelp:ne["fx:fold"]});let On=ww(we()),ln=null,Bn=!0;const Ds=M=>{On=M,Bn=!0,xw(we(),M),ie.render()},zs=()=>{const M=t.returns.a,N=t.returns.b,I=d===Mt&&t.masterFx?{id:Mt,name:"Master",fx:t.masterFx}:(()=>{const K=t.list().find(Vt=>Vt.id===d);return K?.fx?{id:K.id,name:K.name,fx:K.fx}:null})();I||(d=null);const O=t.masterFx?.getChain()??[],z=[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:M.on,onToggle:K=>t.setReturn("a",{on:K}),meter:co(M.fx)??void 0,meterHelp:ne["fx:meter-return"],...Rs("a"),controls:[La("a"),...s("a",M.fx,"plate",["decay","size"])],more:s("a",M.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:N.on,onToggle:K=>t.setReturn("b",{on:K}),meter:co(N.fx)??void 0,meterHelp:ne["fx:meter-return"],...Rs("b"),controls:[La("b"),...s("b",N.fx,"delay",["delay_beats","feedback"])],more:s("b",N.fx,"delay",["tone","low_cut"])}],Q=I?[...qt(I.id,I.name,I.fx,I.id===Mt?mi:Rp)]:ve?z:[],ae=I?.id??"sends",D=Q.map(K=>K.id),be=Hv(G,ae,D,re);return G={key:ae,ids:D,page:be},re=null,{id:"mix",title:"Mix",summary:`${t.list().map(K=>K.name).join(", ")||"No instruments"} · A Reverb · B Delay · Master ${O.filter(K=>!K.bypass).map(K=>K.name).join(", ")||"no inserts on"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[...Xh(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(K=>({value:K.id,label:K.available===!1?`${K.name} (soon)`:K.name,disabled:K.available===!1})),onAdd:K=>n.onAdd(K)}]},{id:"fx",area:"fx",label:I?`${I.name} inserts`:"Send effects",pageSize:qr,page:be,onPage:K=>{G&&(G={...G,page:K})},controls:Q},...On?[{id:"meters",area:"meters",label:"VU meters",controls:[]}]:[],{id:"master",area:"master",label:"Master",controls:[Jh()]}]}},ue=Z0(zs(),Iw),Os=()=>ue.el.toggleAttribute("data-hacks-folded",kr({hacksShown:d,sendsShown:ve}).kind==="none"&&l.matches);Os();const Je=document.createElement("button");Je.type="button",Je.className="nc-page-action vu-add",Je.dataset.vuAdd="",Je.textContent="+ Meters",Je.setAttribute("aria-label","Add VU meters"),Je.setAttribute("data-nc-help",ne["vu:add"]),Je.addEventListener("click",()=>{Ds(!0),ln?.el.querySelector("[data-vu-remove]")?.focus()}),ue.el.querySelector(".nc-module-end")?.prepend(Je);const Bs=()=>ue.el.toggleAttribute("data-sends-hidden",!ve);Bs();const _s=()=>{Je.hidden=On;const M=ue.el.querySelector('[data-nc-section="meters"]');!On||!M||(ln??=Nw({onRemove:()=>{Ds(!1),Je.focus()},folded:kw(we()),onFold:N=>{Bn=!0,$w(we(),N)}}),ln.el.parentElement!==M&&M.append(ln.el))};_s(),_w(ue.el,n,ge),Bw(ue.el,t,n),Sc(ue.el),$c(ue.el),ey(e,[ue],"adjacent");const js=M=>({peak:ic(M.peak),rms:ic(M.rms),over:M.peak>=Pv}),ie={module:ue,get hacksShown(){return d},showHacks:u,render(){ue.update(zs()),Os(),_s(),Bs(),Sc(ue.el),$c(ue.el)},frame(M){if(ue.el.dataset.ncOpen!=="true")return;for(const I of t.list())Hl(ue.el,`strip-${I.id}`)?.update([js(I.levels())],M);const N=t.masterLevels();if(Hl(ue.el,`strip-${Mt}`)?.update(N.map(js),M),ln&&On){const I=t.ctx.state==="running";I&&(Bn=!0),Bn&&(Bn=ln.frame(I?[N[0].rms,N[1].rms]:null,M))}}};return ie}const Pt=".nc-strip:not([data-nc-master])",rr=e=>e?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null,Dw="[data-nc-strip-grip], .nc-strip-hd, .nc-strip-fold",zw=6,Ow=400,Ua=12;function $c(e){for(const t of e.querySelectorAll(".nc-strip [data-nc-hacks]"))t.setAttribute("data-nc-help",t.closest("[data-nc-master]")?ne["inserts:master"]:ne["inserts:channel"]);for(const t of e.querySelectorAll(':is([data-nc-id="mix-a"], [data-nc-id="mix-b"]) .nc-ui-fx-hd .nc-ui-fx-name'))t.setAttribute("data-nc-help",ne["mix:sends"])}function Sc(e){for(const t of e.querySelectorAll(`${Pt} .nc-strip-hd > .nc-strip-name`))t.setAttribute("data-nc-help",ne["strip:name"]);for(const t of e.querySelectorAll(`${Pt} .nc-strip-hd`))t.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight")}function Bw(e,t,n){e.addEventListener("dblclick",a=>{const r=a.target instanceof Element?a.target.closest(".nc-strip-hd > .nc-strip-name"):null,o=r?.closest(Pt),s=rr(o??null),l=r?.parentElement;if(!s||!l||!n.onRename||l.hasAttribute("data-renaming"))return;const d=t.list().find(f=>f.id===s)?.name??r.textContent??"",u=document.createElement("input");u.type="text",u.className="nc-strip-name-input",u.value=d,u.maxLength=Ju,u.spellcheck=!1,u.autocomplete="off",u.setAttribute("aria-label",`Rename ${d}`),u.setAttribute("data-nc-help",ne["strip:rename"]),l.setAttribute("data-renaming",""),l.insertBefore(u,r),u.focus(),u.select();let c=!1;const p=f=>{if(c)return;c=!0;const y=u.value;u.remove(),l.removeAttribute("data-renaming"),f&&y!==d&&n.onRename?.(s,y)};u.addEventListener("keydown",f=>{f.key==="Enter"?(f.preventDefault(),p(!0)):f.key==="Escape"&&(f.preventDefault(),p(!1))}),u.addEventListener("blur",()=>p(!0)),u.addEventListener("click",f=>f.stopPropagation())})}function _w(e,t,n){let a=null;const r=()=>{for(const c of e.querySelectorAll("[data-drop]"))c.removeAttribute("data-drop")},o=()=>{a&&(window.clearTimeout(a.timer),a.strip.removeAttribute("data-dragging"),e.removeAttribute("data-strip-drag"),r(),a=null)},s=c=>{c.active=!0,c.strip.setAttribute("data-dragging","true"),e.setAttribute("data-strip-drag",""),c.touch&&!c.grip&&navigator.vibrate?.(10)},l=()=>[...e.querySelectorAll(Pt)].map(c=>{const p=c.getBoundingClientRect();return{id:rr(c)??"",left:p.left,width:p.width}}),d=(c,p)=>{const f=c.strip.parentElement;if(f&&f.scrollWidth>f.clientWidth){const w=f.getBoundingClientRect();p<w.left+Ua*2?f.scrollLeft-=Ua:p>w.right-Ua*2&&(f.scrollLeft+=Ua)}const y=cw(l(),p),m=y?fc(t.order(),c.id,y):null;c.mark=m?y:null,r(),c.mark&&e.querySelector(`${Pt}[data-nc-id="strip-${CSS.escape(c.mark.target)}"]`)?.setAttribute("data-drop",c.mark.side)},u=()=>{const c=p=>{p.stopPropagation(),p.preventDefault()};e.addEventListener("click",c,{capture:!0,once:!0}),window.setTimeout(()=>e.removeEventListener("click",c,{capture:!0}),0)};e.addEventListener("pointerdown",c=>{if(a||c.pointerType==="mouse"&&c.button!==0)return;const p=c.target instanceof Element?c.target:null;if(!p||p.closest("input, .nc-strip-remove, [data-nc-strip-hide], [data-renaming]"))return;const f=p.closest(Dw),y=f?.closest(Pt),m=rr(y??null);if(!f||!y||!m)return;const w={id:m,strip:y,pointerId:c.pointerId,x0:c.clientX,y0:c.clientY,grip:f.matches("[data-nc-strip-grip]"),touch:c.pointerType!=="mouse",active:!1,timer:0,mark:null};a=w,w.touch&&!w.grip&&(w.timer=window.setTimeout(()=>{a===w&&!w.active&&s(w)},Ow)),w.grip&&!w.touch&&c.preventDefault()}),window.addEventListener("pointermove",c=>{const p=a;if(!(!p||c.pointerId!==p.pointerId)){if(!p.active){if(Math.hypot(c.clientX-p.x0,c.clientY-p.y0)<zw)return;if(p.touch&&!p.grip)return o();s(p)}c.preventDefault(),d(p,c.clientX)}}),e.addEventListener("touchmove",c=>{a?.active&&c.preventDefault()},{passive:!1}),e.addEventListener("contextmenu",c=>{a?.touch&&c.preventDefault()}),window.addEventListener("pointerup",c=>{const p=a;if(!p||c.pointerId!==p.pointerId)return;const f=p.active?p.mark:null,y=p.active;if(o(),!y)return;u();const m=f?fc(t.order(),p.id,f):null;m&&t.onReorder?.(m.id,m.before)}),window.addEventListener("pointercancel",c=>{a&&c.pointerId===a.pointerId&&o()}),window.addEventListener("keydown",c=>{c.key==="Escape"&&a?.active&&o()}),e.addEventListener("keydown",c=>{if(!c.altKey||c.ctrlKey||c.metaKey||c.shiftKey||c.key!=="ArrowLeft"&&c.key!=="ArrowRight")return;const p=c.target instanceof Element?c.target:null,f=p?.closest(".nc-strip-hd, [data-nc-strip-hide], .nc-strip-fold");if(!p||!f||p.closest("input, [data-nc-strip-grip]"))return;const y=rr(f.closest(Pt));if(!y)return;c.preventDefault();const m=f.matches("[data-nc-strip-hide]")?"[data-nc-strip-hide]":f.matches(".nc-strip-fold")?".nc-strip-fold":".nc-strip-hd :is(button, [tabindex])";n(y,c.key==="ArrowLeft"?-1:1,m)})}const jw=1e-5,qw=2e3,Vw=500,la={parked:!1,quietSince:null};function Hw(e,t,n,a){if(t)return la;if(e.parked)return e;if(!(n<jw))return la;const r=e.quietSince??a;return{parked:a-r>=qw,quietSince:r}}const Ec=e=>10**(e/20),ut=.012,Io=1024,Ac=32768;class Uw{ctx;bus;masterFx;master;limiter;masterMeter;masterMeters;insertMeters;returns;park={a:la,b:la};parkMeters;parkScratch=new Float32Array(Ac);masterPosition=at;channels=[];listeners=new Set;scratch=new Float32Array(Io);restore;channelFx;applyQueued=!1;constructor(t,n={}){this.ctx=t,this.restore=n.restore,this.channelFx=n.channelFx;const a=()=>new AnalyserNode(t,{fftSize:Io});this.bus=new GainNode(t,{gain:1}),this.master=new GainNode(t,{gain:Lt(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(t,fp),this.masterMeter=a(),this.masterMeters=[a(),a()],this.insertMeters={pre:a(),post:a()},this.masterFx=n.masterFx?.()??null,this.bus.connect(this.insertMeters.pre),this.masterFx?(this.bus.connect(this.masterFx.input),this.masterFx.output.connect(this.master),this.masterFx.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(t.destination);const r=new ChannelSplitterNode(t,{numberOfOutputs:2});this.limiter.connect(r),r.connect(this.masterMeters[0],0),r.connect(this.masterMeters[1],1);const o=l=>{const d=new GainNode(t,{gain:1}),u=n.fx?.(l)??null,c=new GainNode(t,{gain:Lt(at)}),p=a();return u?(d.connect(u.input),u.output.connect(c)):c.gain.value=0,c.connect(p),c.connect(this.bus),{bus:d,fx:u,gain:c,meter:p,on:u!==null,level:at}};this.returns={a:o("a"),b:o("b")};const s=l=>{const d=new AnalyserNode(t,{fftSize:Ac});return this.returns[l].gain.connect(d),d};this.parkMeters={a:s("a"),b:s("b")}}attach(t,n){let a=this.channels.find(r=>r.id===t);if(a)a.input.disconnect(),a.input=new GainNode(this.ctx,{gain:1}),a.input.connect(a.trim);else{const r=new GainNode(this.ctx,{gain:1}),o=this.restore?.(t)??yp,s=new GainNode(this.ctx,{gain:Ec(o.trim)});r.connect(s);const l=new GainNode(this.ctx,{gain:0}),d=new AnalyserNode(this.ctx,{fftSize:Io}),u=new GainNode(this.ctx,{gain:0}),c=new GainNode(this.ctx,{gain:0}),p=this.channelFx?.(t)??null;p?(s.connect(p.input),p.output.connect(l)):s.connect(l);const f=new GainNode(this.ctx,{gain:1,channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),y=new ChannelSplitterNode(this.ctx,{numberOfOutputs:2}),m=new GainNode(this.ctx,{gain:1}),w=new GainNode(this.ctx,{gain:1}),h=new ChannelMergerNode(this.ctx,{numberOfInputs:2});l.connect(d),l.connect(f).connect(y),y.connect(m,0).connect(h,0,0),y.connect(w,1).connect(h,0,1),h.connect(this.bus),h.connect(u).connect(this.returns.a.bus),h.connect(c).connect(this.returns.b.bus),a={id:t,name:n,input:r,trim:s,fader:l,stereo:f,split:y,balL:m,balR:w,panner:h,meter:d,sendA:u,sendB:c,fx:p,strip:o},this.channels.push(a),this.queueApply()}return this.emit(),a.input}rename(t,n){const a=this.channels.find(r=>r.id===t);!a||a.name===n||(a.name=n,this.emit())}detach(t){const n=this.channels.findIndex(r=>r.id===t);if(n<0)return;const[a]=this.channels.splice(n,1);if(a){for(const r of[a.input,a.trim,a.fader,a.stereo,a.split,a.balL,a.balR,a.panner,a.meter,a.sendA,a.sendB])r.disconnect();a.fx?.output.disconnect(),a.fx?.dispose(),this.queueApply(),this.emit()}}tapNode(t){return t==="master"?this.limiter:this.channels.find(n=>n.id===t)?.panner??null}tapLatency(t,n){const a=o=>{const s=o?.latencySamples;return typeof s=="number"&&Number.isFinite(s)&&s>0?Math.round(s):0};if(t==="master")return Math.max(0,Math.round(n))+a(this.masterFx);const r=this.channels.find(o=>o.id===t);return r?a(r.fx):null}set(t,n){const a=this.channels.find(r=>r.id===t);a&&(a.strip={...a.strip,...n},this.queueApply(),this.emit())}setMaster(t){this.masterPosition=t,this.master.gain.setTargetAtTime(Lt(t),this.ctx.currentTime,ut),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(t,n){const a=this.returns[t],r=this.ctx.currentTime;n.on!==void 0&&(a.on=n.on&&a.fx!==null,a.bus.gain.setTargetAtTime(a.on?1:0,r,ut),this.wakeFed()),n.level!==void 0&&(a.level=n.level,a.fx&&a.gain.gain.setTargetAtTime(Lt(a.level),r,ut)),this.emit()}fed(t){const n=this.returns[t];if(!n.on||!n.fx)return!1;const a=t==="a"?"sendA":"sendB";return this.channels.some(r=>Lt(r.strip[a])>0)}setParked(t,n){const a=this.returns[t];a.fx&&(n?(a.bus.disconnect(a.fx.input),a.fx.output.disconnect(a.gain),a.fx.clear()):(a.bus.connect(a.fx.input),a.fx.output.connect(a.gain)))}wakeFed(){for(const t of["a","b"])this.park[t].parked&&this.fed(t)&&(this.park[t]=la,this.setParked(t,!1))}parkIdleReturns(t=performance.now()){for(const n of["a","b"]){const a=this.park[n],r=Hw(a,this.fed(n),a.parked?0:this.parkPeak(n),t);this.park[n]=r,r.parked!==a.parked&&this.setParked(n,r.parked)}}parkPeak(t){const n=this.parkScratch;this.parkMeters[t].getFloatTimeDomainData(n);let a=0;for(let r=0;r<n.length;r++)a=Math.max(a,Math.abs(n[r]??0));return a}returnParked(t){return this.park[t].parked}setTempo(t,n){for(const a of[this.returns.a.fx,this.returns.b.fx,this.masterFx])a?.setTempo(t,n);for(const a of this.channels)a.fx?.setTempo(t,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(t){return this.levelsOf(this.returns[t].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const t=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||t&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}queueApply(){this.applyQueued||(this.applyQueued=!0,queueMicrotask(()=>{this.applyQueued=!1,this.apply()}))}apply(){const t=Fv(this.channels.map(a=>a.strip)),n=this.ctx.currentTime;this.channels.forEach((a,r)=>{a.fader.gain.setTargetAtTime(t[r]??0,n,ut),a.trim.gain.setTargetAtTime(Ec(a.strip.trim),n,ut),a.sendA.gain.setTargetAtTime(Lt(a.strip.sendA),n,ut),a.sendB.gain.setTargetAtTime(Lt(a.strip.sendB),n,ut);const[o,s]=Dv(a.strip.pan);a.balL.gain.setTargetAtTime(o,n,ut),a.balR.gain.setTargetAtTime(s,n,ut)}),this.wakeFed()}levelsOf(t){return t.getFloatTimeDomainData(this.scratch),Rv(this.scratch)}emit(){for(const t of this.listeners)t()}}const Gw=["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"],Wn=(e,t)=>t.map(([n,a,r,o])=>({id:n,name:a,intervals:r,category:e,symbol:o})),Dp=[...Wn("Essential",[["major","Major",[0,4,7],""],["minor","Minor",[0,3,7],"m"],["diminished","Diminished",[0,3,6],"dim"],["augmented","Augmented",[0,4,8],"aug"],["sus2","Sus2",[0,2,7],"sus2"],["sus4","Sus4",[0,5,7],"sus4"],["power","Power Chord",[0,7,12],"5"],["major-6","Major 6",[0,4,7,9],"6"],["minor-6","Minor 6",[0,3,7,9],"m6"]]),...Wn("Seventh",[["major-7","Major 7",[0,4,7,11],"maj7"],["minor-7","Minor 7",[0,3,7,10],"m7"],["dominant-7","Dominant 7",[0,4,7,10],"7"],["minor-major-7","Minor-Major 7",[0,3,7,11],"m(maj7)"],["half-diminished-7","Half-Diminished 7",[0,3,6,10],"m7b5"],["diminished-7","Diminished 7",[0,3,6,9],"dim7"],["augmented-major-7","Augmented Major 7",[0,4,8,11],"aug(maj7)"],["augmented-7","Augmented 7",[0,4,8,10],"aug7"],["7sus4","7sus4",[0,5,7,10],"7sus4"]]),...Wn("Extended",[["add9","Add9",[0,4,7,14],"add9"],["minor-add9","Minor Add9",[0,3,7,14],"m(add9)"],["major-9","Major 9",[0,4,7,11,14],"maj9"],["minor-9","Minor 9",[0,3,7,10,14],"m9"],["dominant-9","Dominant 9",[0,4,7,10,14],"9"],["6-9","6/9",[0,4,7,9,14],"6/9"],["minor-6-9","Minor 6/9",[0,3,7,9,14],"m6/9"],["major-7-sharp11","Major 7#11",[0,4,7,11,18],"maj7#11"],["minor-11","Minor 11",[0,3,7,10,14,17],"m11"],["dominant-11","Dominant 11",[0,4,7,10,14,17],"11"],["9sus4","9sus4",[0,5,7,10,14],"9sus4"],["major-13","Major 13",[0,4,7,11,14,21],"maj13"],["minor-13","Minor 13",[0,3,7,10,14,17,21],"m13"],["dominant-13","Dominant 13",[0,4,7,10,14,21],"13"]]),...Wn("Altered",[["7b9","7b9",[0,4,7,10,13],"7b9"],["7-sharp9","7#9",[0,4,7,10,15],"7#9"],["7b5","7b5",[0,4,6,10],"7b5"],["7-sharp5","7#5",[0,4,8,10],"7#5"],["7b9-sharp5","7b9#5",[0,4,8,10,13],"7b9#5"],["7-sharp9-b5","7#9b5",[0,4,6,10,15],"7#9b5"],["7alt","7alt",[0,4,10,13,15,18,20],"7alt"],["major-7b5","Major 7b5",[0,4,6,11],"maj7b5"],["minor-7b9","Minor 7b9",[0,3,7,10,13],"m7b9"]]),...Wn("Experimental",[["quartal-3","Quartal 3",[0,5,10]," Quartal 3"],["quartal-4","Quartal 4",[0,5,10,15]," Quartal 4"],["quartal-5","Quartal 5",[0,5,10,15,20]," Quartal 5"],["quintal-3","Quintal 3",[0,7,14]," Quintal 3"],["quintal-4","Quintal 4",[0,7,14,21]," Quintal 4"],["chromatic-cluster","Chromatic Cluster",[0,1,2]," Chromatic Cluster"],["whole-tone-cluster","Whole-Tone Cluster",[0,2,4,6]," Whole-Tone Cluster"],["minor-second-cluster","Minor-Second Cluster",[0,1,5,7]," Minor-Second Cluster"],["major-second-stack","Major-Second Stack",[0,2,4,7,9]," Major-Second Stack"],["lydian-stack","Lydian Stack",[0,2,4,6,7,11]," Lydian Stack"],["major-pentatonic","Major Pentatonic",[0,2,4,7,9]," Major Pentatonic"],["minor-pentatonic","Minor Pentatonic",[0,3,5,7,10]," Minor Pentatonic"],["in-sen","In-sen",[0,1,5,7,10]," In-sen"],["whole-tone","Whole-Tone Collection",[0,2,4,6,8,10]," Whole-Tone"]])],zp=new Map(Dp.map(e=>[e.id,e])),Fo={Major:"major",Minor:"minor",Diminished:"diminished",Augmented:"augmented",Sus2:"sus2",Sus4:"sus4","Major 7th":"major-7","Minor 7th":"minor-7","Dominant 7th":"dominant-7"};function Ww(e){if(typeof e!="string")return"major";if(zp.has(e))return e;if(Fo[e])return Fo[e];const t=a=>a.trim().toLowerCase().replace(/[\s_-]+/g,""),n=t(e);return Object.entries(Fo).find(([a])=>t(a)===n)?.[1]??Dp.find(a=>t(a.name)===n||t(a.id)===n)?.id??"major"}function cs(e){return zp.get(Ww(e))}const wi=(e,t,n)=>Math.max(t,Math.min(n,Math.round(Number.isFinite(e)?e:t)));function Op(e){if(!e.length)return[];const t=Math.min(...e),n=Math.max(...e),a=Math.ceil(-t/12),r=Math.floor((127-n)/12);if(a>r)throw new RangeError("Voicing spans more than the supported MIDI range.");const o=Math.max(a,Math.min(r,0))*12;return e.map(s=>s+o)}function Kw(e,t,n=0,a="compact"){const o=cs(t).intervals.map(l=>wi(e,0,127)+l);for(let l=0;l<wi(n,0,o.length-1);l++){const d=o.shift(),u=o[o.length-1];o.push(d+Math.ceil((u-d+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[a]??0;return Op(o.map((l,d)=>l+12*Math.floor(d*s/Math.max(1,o.length-1))))}function Yw(e,t=1){return[...new Set(Array.from({length:wi(t,1,4)},(n,a)=>e.map(r=>r+a*12)).flat().filter(n=>n>=0&&n<=127))]}function Xw(e,t){const n=[...new Set(e)].sort((o,s)=>o-s),a=n.length;if(a<2)return n;const r=[...n,...n.slice(1,-1).reverse()];switch(t){case"down":return n.reverse();case"up-down":return r;case"down-up":return r.map(o=>n[a-1-n.indexOf(o)]);case"up-down-repeat":return[...n,...[...n].reverse()];case"as-played":return[...new Set(e)];case"outside-in":{const o=[];for(let s=0,l=a-1;s<=l;s++,l--)o.push(n[s]),s!==l&&o.push(n[l]);return o}case"inside-out":return n.map((o,s)=>({note:o,i:s})).sort((o,s)=>Math.abs(o.i-(a-1)/2)-Math.abs(s.i-(a-1)/2)||o.i-s.i).map(o=>o.note);case"pendulum":{const o=Math.floor((a-1)/2);return[...r.slice(o),...r.slice(0,o)]}case"blossom-up":case"blossom-down":{const o=Math.floor((a-1)/2),s=t==="blossom-up"?1:-1,l=[n[o]];for(let d=1;l.length<a;d++)for(const u of[o+s*d,o-s*d])u>=0&&u<a&&l.push(n[u]);return l}case"low-and-up":case"low-and-down":case"hi-and-up":case"hi-and-down":{const o=t.startsWith("low"),s=o?n[0]:n[a-1],l=o?n.slice(1):n.slice(0,-1);return t.endsWith("down")&&l.reverse(),l.flatMap(d=>[s,d])}default:return n}}const Jw=16,xi={hits:5,steps:8,rotate:0};function Bp(e){const t=(a,r)=>typeof a=="number"&&Number.isFinite(a)?Math.round(a):r,n=Math.max(1,Math.min(Jw,t(e?.arpSteps,xi.steps)));return{steps:n,hits:Math.max(0,Math.min(n,t(e?.arpHits,xi.hits))),rotate:(t(e?.arpRotate,0)%n+n)%n}}function _p(e,t){return((Math.floor(t)+e.rotate)%e.steps+e.steps)%e.steps*e.hits%e.steps<e.hits}function Qw(e,t){let n=Math.floor(t/e.steps)*e.hits;for(let a=t-t%e.steps;a<t;a++)_p(e,a)&&n++;return n}const Zw=1592598566;function e1(e){let t=(Math.imul(e^Zw,2654435761)^2246822507)>>>0;return t=Math.imul(t^t>>>16,2146121005),t=Math.imul(t^t>>>15,2221713035),((t^t>>>16)>>>0)/2**32}const Mc=new Map;function t1(e,t){if(e<2)return 0;const n=Math.max(0,Math.floor(t));let a=Mc.get(e);(!a||a.step>n)&&(a={step:0,pos:0});let{step:r,pos:o}=a;for(;r<n;r++){const s=e1(r+1);o=(o+(s<.5?1:s<.75?0:e-1))%e}return Mc.set(e,{step:r,pos:o}),o}function n1(e,t,n,a=xi,r=Math.random){if(t<1)return null;const o=s=>(Math.floor(s)%t+t)%t;if(e==="random")return Math.min(t-1,Math.max(0,Math.floor(r()*t)));if(e==="walk")return t1(t,n);if(e==="euclidean"){const s=Bp({arpHits:a.hits,arpSteps:a.steps,arpRotate:a.rotate}),l=Math.max(0,Math.floor(n));return _p(s,l)?o(Qw(s,l)):null}return o(n)}const ds=[{id:"off",num:0,name:"Off — chord",description:"No arp: the chord plays together"},{id:"up",num:1,name:"Up",description:"Low to high, then again"},{id:"down",num:2,name:"Down",description:"High to low, then again"},{id:"up-down",num:3,name:"Up/Down",description:"Up then down, ends not repeated"},{id:"up-down-repeat",num:4,name:"Up/Down Repeat",description:"Up then down, ends repeated"},{id:"random",num:5,name:"Random",description:"Any note each step"},{id:"as-played",num:6,name:"As Played",description:"The order the keys were pressed"},{id:"outside-in",num:7,name:"Outside-In",description:"Lowest, highest, then inward"},{id:"inside-out",num:8,name:"Inside-Out",description:"From the middle outward, lower first"},{id:"pendulum",num:9,name:"Pendulum",description:"From the lower middle, swing between the ends"},{id:"blossom-up",num:10,name:"Blossom Up",description:"From center, spiral up"},{id:"blossom-down",num:11,name:"Blossom Down",description:"From center, spiral down"},{id:"low-and-up",num:12,name:"Low&Up",description:"Low pedal, others ascending"},{id:"low-and-down",num:13,name:"Low&Down",description:"Low pedal, others descending"},{id:"hi-and-up",num:14,name:"Hi&Up",description:"High pedal, others ascending"},{id:"hi-and-down",num:15,name:"Hi&Down",description:"High pedal, others descending"},{id:"walk",num:16,name:"Walk",description:"Next 50%, repeat 25%, back 25%"},{id:"euclidean",num:17,name:"Euclidean",description:"Hits spread evenly over Steps, rests between"},{id:"down-up",num:18,name:"Down/Up (legacy)",description:"Down then up, ends not repeated",legacy:!0}];new Set(ds.map(e=>e.id));new Map(ds.map(e=>[e.num,e.id]));ds.map(e=>({value:e.id,label:e.name}));const jp=[{id:"block",label:"Block",kind:"repeat"},{id:"walk-up",label:"Inversion walk · up",kind:"repeat"},{id:"walk-down",label:"Inversion walk · down",kind:"repeat"},{id:"walk-up-down",label:"Inversion walk · up-down",kind:"repeat"},{id:"walk-random",label:"Inversion walk · random",kind:"repeat"},{id:"oom-pah",label:"Oom-pah",kind:"bar"},{id:"alberti",label:"Alberti",kind:"repeat"},{id:"pulse",label:"Pulse + accents",kind:"repeat"},{id:"charleston",label:"Charleston",kind:"bar"},{id:"skank",label:"Skank",kind:"bar"},{id:"house",label:"House stab",kind:"bar"},{id:"montuno",label:"Montuno",kind:"bar"},{id:"push",label:"Push",kind:"bar"},{id:"strum",label:"Strum",kind:"bar"},{id:"drift",label:"Voicing drift",kind:"repeat"}];jp.map(e=>e.id);const Tc=e=>jp.find(t=>t.id===e)?.kind??"repeat",a1=15,r1=40,Re=e=>[...e].sort((t,n)=>t-n);function qp(e,t){const n=Re(e);for(let a=0;a<t;a++){const r=n.shift(),o=n[n.length-1]??r;n.push(r+Math.ceil((o-r+1)/12)*12)}return n}const Ga=e=>qp(e,1);function o1(e,t){const n=e[0];return n-((n-t)%12+12)%12}function i1(e,t){const n=Re(e);if(n.length<3)return n;switch((t%4+4)%4){case 1:return Re([n[0],...n.slice(2),n[1]+12]);case 2:return Re([n[0],...n.slice(3),n[1]+12,n[2]+12]);case 3:return Re([n[0]-12,n[2],n[1]+12,...n.slice(3).map(r=>r+12)]);default:return n}}function s1(e,t,n,a=Math.random){const r=Math.max(1,Math.min(t,3)),o=Math.max(0,Math.floor(n));switch(e){case"walk-down":return(r-o%r)%r;case"walk-up-down":{if(r<2)return 0;const s=2*r-2,l=o%s;return l<r?l:s-l}case"walk-random":return Math.min(r-1,Math.floor(a()*r));default:return o%r}}function l1(e,t,n,a,r=Math.random){const o=Re(t);if(!o.length)return{notes:[],velocity:1};switch(e){case"block":return{notes:o,velocity:1};case"walk-up":case"walk-down":case"walk-up-down":case"walk-random":return{notes:qp(o,s1(e,o.length,n,r)),velocity:.9};case"alberti":return{notes:[[o[0],o[2]??o[o.length-1],o[1]??o[0],o[2]??o[o.length-1]][(Math.floor(n)%4+4)%4]],velocity:.85};case"pulse":{const s=Math.abs(a/2-Math.round(a/2))<1e-6;return{notes:o,velocity:s?1:.45}}case"drift":return{notes:i1(o,n),velocity:.9};default:return null}}function c1(e,t,n,a,r=t){const o=Re(t);if(!o.length)return[];const s=(d,u,c,p)=>d.map(f=>({step:f,len:u,notes:c,velocity:p})),l=o1(o,n);switch(e){case"oom-pah":return[...s([0],3,[l-12],1),...s([4],2,Ga(o),.75),...s([8],3,[l-12],1),...s([12],2,Ga(o),.75)];case"charleston":return s([0,6],2,o,.9);case"skank":return s([4,12],1,Ga(o),.9);case"house":return s([2,6,10,14],1,Ga(o),.9);case"montuno":{const d=l+(a[1]??4),u=l+(a[2]??7),c=a[3]!==void 0&&a[3]<12?l+a[3]:l+12,p=[l,l+12],f=[d,u];return[[0,p],[3,f],[5,p],[6,f],[8,[u,c]],[10,p],[13,f],[14,[u,l+12]]].map(([y,m])=>({step:y,len:1,notes:Re(m),velocity:.85}))}case"push":return[...s([0],6,o,.9),...s([6],2,o,.9),{step:14,len:2,notes:Re(r),velocity:.9,next:!0}];case"strum":{const d=[...o,o[0]+12];return[{step:0,len:3.5,notes:d,velocity:.95,strum:"down"},{step:8,len:3.5,notes:d,velocity:.75,strum:"up"}]}default:return[]}}function d1(e,t,n){const a=n==="down"?Re(e):Re(e).reverse(),r=Math.max(0,Math.min(r1,t))/1e3;return a.map((o,s)=>({midi:o,offset:s*r}))}const Lc=e=>Math.abs(e-Math.round(e))<1e-6?"down":"up";function u1(e){const t=new Set(e.map(o=>(o%12+12)%12)),n=o=>t.has(o);let a;const r=n(3)&&!n(4);return r&&n(6)&&n(9)?a=[14]:r&&n(6)?a=[17]:n(4)&&n(8)&&!n(7)?a=[14]:n(4)&&n(10)?a=[14,21]:n(4)?a=[14,18,21]:n(3)?a=[14,17]:n(5)||n(2)?a=[14,21]:a=[14],a.filter(o=>!n(o%12))}function p1(e,t,n,a=Math.random){const r=u1(n);if(!r.length||!e.length)return null;const o=(t+r[Math.min(r.length-1,Math.floor(a()*r.length))])%12,s=Math.max(...e),l=s+1+((o-(s+1))%12+12)%12;return l<=127?l:null}function ki(e,t,n=0,a="compact"){const r=t.map(l=>Math.max(0,Math.min(127,Math.round(e)))+l),o=Math.max(0,Math.min(r.length-1,Math.round(n)||0));for(let l=0;l<o;l++){const d=r.shift(),u=r[r.length-1];r.push(d+Math.ceil((u-d+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[a]??0;return Op(r.map((l,d)=>l+12*Math.floor(d*s/Math.max(1,r.length-1))))}function h1(e,t){const n=Re(e),a=Re(t);if(n.length===a.length)return n.reduce((o,s,l)=>o+Math.abs(s-a[l]),0);const r=(o,s)=>Math.min(...s.map(l=>Math.abs(l-o)));return n.reduce((o,s)=>o+r(s,a),0)+a.reduce((o,s)=>o+r(s,n),0)}function f1(e,t,n,a,r,o="compact",s){const l=ki(t,n,s??r,o);if(!e||!e.length)return l;let d=l,u=1/0,c=1/0;const p=s!==void 0?[s]:n.map((f,y)=>y);for(const f of p)for(const y of[-24,-12,0,12]){const m=ki(t,n,f,o).map(v=>v+y);if(m[0]<a-7||m[0]>a+12||m[0]<0||m[m.length-1]>127)continue;const w=h1(m,e),h=Math.abs(m.reduce((v,k)=>v+k,0)/m.length-e.reduce((v,k)=>v+k,0)/e.length);(w<u-1e-9||Math.abs(w-u)<1e-9&&h<c-1e-9)&&(d=m,u=w,c=h)}return d}const m1={"Pop / Rock":"Pop",Blues:"Blues",Jazz:"Jazz","Soul / R&B / Neo-soul":"Soul",Gospel:"Gospel","EDM / House / Trance":"EDM","Cinematic / Ambient":"Cinematic","Latin / Flamenco":"Latin","Lo-fi / Chill":"Lo-fi",Modal:"Modal"},T=(e,t,n,a=1,r={})=>({degree:e,chord:t,numeral:n,bars:a,...r}),V="major",Ee="minor",H="dominant-7",te="minor-7",Te="major-7",Po="half-diminished-7",Ro="diminished-7",Y=(e,t,n,a,r,o)=>({id:e,group:t,name:n,level:a,tonality:r,chords:o,short:m1[t]}),Cc=e=>[T(0,H,"I7"),T(e==="IV7"?5:0,H,e),T(0,H,"I7"),T(0,H,"I7"),T(5,H,"IV7"),T(5,H,"IV7"),T(0,H,"I7"),T(0,H,"I7"),T(7,H,"V7"),T(5,H,"IV7"),T(0,H,"I7"),T(7,H,"V7")],Vp=[Y("pop-1-5-6-4","Pop / Rock","I–V–vi–IV",1,"major",[T(0,V,"I"),T(7,V,"V"),T(9,Ee,"vi"),T(5,V,"IV")]),Y("pop-6-4-1-5","Pop / Rock","vi–IV–I–V",1,"major",[T(9,Ee,"vi"),T(5,V,"IV"),T(0,V,"I"),T(7,V,"V")]),Y("pop-50s","Pop / Rock","I–vi–IV–V · 50s",1,"major",[T(0,V,"I"),T(9,Ee,"vi"),T(5,V,"IV"),T(7,V,"V")]),Y("rock-1-b7-4","Pop / Rock","I–♭VII–IV",2,"mixolydian",[T(0,V,"I"),T(10,V,"♭VII"),T(5,V,"IV",2)]),Y("pop-canon","Pop / Rock","Canon · 8 chords",2,"major",[T(0,V,"I",.5),T(7,V,"V",.5),T(9,Ee,"vi",.5),T(4,Ee,"iii",.5),T(5,V,"IV",.5),T(0,V,"I",.5),T(5,V,"IV",.5),T(7,V,"V",.5)]),Y("blues-12","Blues","12-bar",1,"blues",Cc("I7")),Y("blues-12-quick","Blues","12-bar quick change",2,"blues",Cc("IV7")),Y("blues-minor","Blues","Minor blues",2,"minor",[T(0,te,"i7"),T(0,te,"i7"),T(0,te,"i7"),T(0,te,"i7"),T(5,te,"iv7"),T(5,te,"iv7"),T(0,te,"i7"),T(0,te,"i7"),T(8,H,"♭VI7"),T(7,H,"V7"),T(0,te,"i7"),T(7,H,"V7")]),Y("blues-jazz","Blues","Jazz blues",3,"blues",[T(0,H,"I7"),T(5,H,"IV7"),T(0,H,"I7"),T(7,te,"v7",.5),T(0,H,"I7",.5),T(5,H,"IV7"),T(6,Ro,"♯iv°7"),T(0,H,"I7"),T(9,H,"VI7"),T(2,te,"ii7"),T(7,H,"V7"),T(0,H,"I7",.5),T(9,H,"VI7",.5),T(2,te,"ii7",.5),T(7,H,"V7",.5)]),Y("jazz-2-5-1","Jazz","ii–V–I",1,"major",[T(2,te,"ii7"),T(7,H,"V7"),T(0,Te,"Imaj7",2)]),Y("jazz-2-5-1-minor","Jazz","ii–V–i minor",2,"minor",[T(2,Po,"iiø7"),T(7,"7b9","V7♭9"),T(0,"minor-6","i6",2)]),Y("jazz-rhythm","Jazz","I–vi–ii–V · rhythm changes",2,"major",[T(0,Te,"Imaj7",.5),T(9,te,"vi7",.5),T(2,te,"ii7",.5),T(7,H,"V7",.5)]),Y("jazz-turnaround","Jazz","iii–VI–ii–V turnaround",2,"major",[T(4,te,"iii7",.5),T(9,H,"VI7",.5),T(2,te,"ii7",.5),T(7,H,"V7",.5)]),Y("jazz-autumn","Jazz","Autumn cycle",3,"minor",[T(5,te,"iv7"),T(10,H,"♭VII7"),T(3,Te,"♭IIImaj7"),T(8,Te,"♭VImaj7"),T(2,Po,"iiø7"),T(7,"7b9","V7♭9"),T(0,te,"i7",2)]),Y("jazz-giant-steps","Jazz","Giant Steps cycle",3,"major",[T(0,Te,"Imaj7",.5),T(3,H,"♭III7",.5),T(8,Te,"♭VImaj7",.5),T(11,H,"VII7",.5),T(4,Te,"IIImaj7"),T(10,te,"♭vii7",.5),T(3,H,"♭III7",.5),T(8,Te,"♭VImaj7",.5),T(11,H,"VII7",.5),T(4,Te,"IIImaj7",.5),T(7,H,"V7",.5),T(0,Te,"Imaj7"),T(6,te,"♯iv7",.5),T(11,H,"VII7",.5)]),Y("soul-dorian-vamp","Soul / R&B / Neo-soul","Dorian vamp i7–IV7",1,"dorian",[T(0,te,"i7"),T(5,H,"IV7")]),Y("soul-4-3-2-1","Soul / R&B / Neo-soul","IVmaj7–iii7–ii7–Imaj7",2,"major",[T(5,Te,"IVmaj7"),T(4,te,"iii7"),T(2,te,"ii7"),T(0,Te,"Imaj7")]),Y("soul-two-of-us","Soul / R&B / Neo-soul","Just the Two of Us",3,"major",[T(5,Te,"IVmaj7"),T(4,H,"III7"),T(9,te,"vi7"),T(7,te,"v7",.5),T(0,H,"I7",.5)]),Y("soul-2-5-1-ext","Soul / R&B / Neo-soul","ii9–V13sus–Imaj9",3,"major",[T(2,"minor-9","ii9"),T(7,"9sus4","V13sus",1,{intervals:[0,5,7,10,14,21],symbol:"13sus4"}),T(0,"major-9","Imaj9",2)]),Y("gospel-1-4-1-dim","Gospel","1–4–1 passing dim",2,"major",[T(0,V,"I"),T(5,V,"IV",.5),T(6,Ro,"♯iv°7",.5)]),Y("gospel-7-3-6","Gospel","7–3–6",3,"major",[T(11,Po,"viiø7"),T(4,H,"III7"),T(9,te,"vi7",2)]),Y("gospel-1-17-4-dim","Gospel","I–I7–IV–♯iv°–I/V",3,"major",[T(0,V,"I",.5),T(0,H,"I7",.5),T(5,V,"IV",.5),T(6,Ro,"♯iv°7",.5),T(0,V,"I/V",2,{inversion:2})]),Y("edm-epic","EDM / House / Trance","i–VI–III–VII · epic",1,"minor",[T(0,Ee,"i"),T(8,V,"VI"),T(3,V,"III"),T(10,V,"VII")]),Y("edm-1-7-6-7","EDM / House / Trance","i–VII–VI–VII",1,"minor",[T(0,Ee,"i"),T(10,V,"VII"),T(8,V,"VI"),T(10,V,"VII")]),Y("house-organ","EDM / House / Trance","House organ i7–iv7",1,"minor",[T(0,te,"i7"),T(5,te,"iv7")]),Y("trance-1-6-7-5","EDM / House / Trance","Trance i–VI–VII–v",2,"minor",[T(0,Ee,"i"),T(8,V,"VI"),T(10,V,"VII"),T(7,Ee,"v")]),Y("cine-minor-plagal","Cinematic / Ambient","Minor plagal iv–i",1,"minor",[T(5,Ee,"iv"),T(0,Ee,"i")]),Y("cine-hero","Cinematic / Ambient","Hero I–♭VI–♭VII–I",2,"major",[T(0,V,"I"),T(8,V,"♭VI"),T(10,V,"♭VII"),T(0,V,"I")]),Y("cine-mediant","Cinematic / Ambient","Mediant I–III",2,"major",[T(0,V,"I"),T(4,V,"III")]),Y("cine-lydian","Cinematic / Ambient","Lydian I–II",2,"lydian",[T(0,V,"I"),T(2,V,"II")]),Y("latin-andalusian","Latin / Flamenco","Andalusian i–♭VII–♭VI–V",1,"minor",[T(0,Ee,"i"),T(10,V,"♭VII"),T(8,V,"♭VI"),T(7,V,"V")]),Y("latin-montuno","Latin / Flamenco","Montuno i–iv–V7",1,"minor",[T(0,Ee,"i"),T(5,Ee,"iv"),T(7,H,"V7",2)]),Y("latin-bossa","Latin / Flamenco","Bossa Imaj7–II7–ii7–V7",2,"major",[T(0,Te,"Imaj7",2),T(2,H,"II7",2),T(2,te,"ii7"),T(7,H,"V7")]),Y("lofi-2-5-1-6","Lo-fi / Chill","ii9–V9–Imaj9–vi9",2,"major",[T(2,"minor-9","ii9"),T(7,"dominant-9","V9"),T(0,"major-9","Imaj9"),T(9,"minor-9","vi9")]),Y("lofi-4-3-6","Lo-fi / Chill","IVmaj7–iii7–vi7",2,"major",[T(5,Te,"IVmaj7"),T(4,te,"iii7"),T(9,te,"vi7",2)]),Y("modal-dorian","Modal","Dorian i–IV",1,"dorian",[T(0,Ee,"i"),T(5,V,"IV")]),Y("modal-mixolydian","Modal","Mixolydian I–♭VII",1,"mixolydian",[T(0,V,"I"),T(10,V,"♭VII")]),Y("modal-phrygian","Modal","Phrygian i–♭II",1,"phrygian",[T(0,Ee,"i"),T(1,V,"♭II")])];Vp.map(e=>e.id);const g1=e=>Vp.find(t=>t.id===e)??null;function Do(e,t,n,a=0){const r=g1(e);if(!r)return null;const o=(n+1)*12+t;return r.chords.map((s,l)=>{const d=cs(s.chord),u=s.intervals??d.intervals,c=(t+s.degree)%12;return{index:l,root:o+s.degree,rootPc:c,chord:d.id,intervals:u,numeral:s.numeral,name:`${Gw[c]}${s.symbol??d.symbol}`,bars:a>0?a:s.bars,...s.inversion!==void 0?{inversion:s.inversion}:{}}})}const b1=e=>e.reduce((t,n)=>t+n.bars,0),y1=(e,t)=>e.slice(0,t).reduce((n,a)=>n+a.bars,0);function Nc(e,t){const n=b1(e),a=(t%n+n)%n;let r=0;for(let o=0;o<e.length;o++){if(a<r+e[o].bars-1e-9)return{chord:e[o],index:o,position:a,total:n};r+=e[o].bars}return{chord:e[e.length-1],index:e.length-1,position:a,total:n}}const v1=16,w1=()=>Array.from({length:v1},()=>null),x1=["off","single","chord","random"],k1=e=>x1.includes(e),$1={mode:"single",note:0,octave:3,octaveRange:2,chord:"minor-7",inversion:0,interval:4,gate:75,arp:"off",arpOctaves:1,arpSpread:"compact",arpHits:5,arpSteps:8,arpRotate:0,chordStyle:"block",voiceLeading:"fixed",strum:0,tension:0,chordProgression:"off",progressionBars:0,favoriteChords:[],chordPads:w1(),chordPadMode:"pad"};function Ic(e,t,n=Math.random){if(e.mode==="off")return[];const a=Math.min(127,Math.max(0,(e.octave+1)*12+e.note));if(e.mode==="single")return[a];if(e.mode==="random"){const d=Math.min(127,(e.octave+1)*12),u=Math.min(127,d+e.octaveRange*12-1);return[d+Math.floor(n()*(u-d+1))]}const r=Kw(a,e.chord,e.inversion,e.arpSpread);if(e.arp==="off")return r;const o=Yw(r,e.arpOctaves),s=Xw(o,e.arp),l=n1(e.arp,s.length,t,Bp(e),n);return l===null?[]:[s[l]]}function Fc(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function S1(e,t,{octave:n}={}){if(t==="chord")return e.map(o=>({...o,role:"chord"}));const a=new Map;for(const o of e)a.set(o.hit,[...a.get(o.hit)??[],o]);const r=[];for(const o of a.values()){const s=o[0],l=Math.max(...o.map(d=>d.velocity));if(t==="top"){const d=o.reduce((u,c)=>c.note>u.note?c:u);r.push({...d,role:"top",offsetSec:0,velocity:l})}else{const d=n===void 0?s.root:Math.min(127,Math.max(0,(n+1)*12+(s.root%12+12)%12));r.push({...s,note:d,role:"root",offsetSec:0,velocity:l})}}return r}function E1(e,t){return t.direction&&t.strumMs>0&&e.length>1?d1(e,t.strumMs,t.direction):e.map(n=>({midi:n,offset:0}))}function A1(e,t=0){return E1(e.notes,e).map(({midi:n,offset:a})=>({note:n,velocity:e.velocity,startBeat:e.beat,lengthBeats:e.spanBeats*e.gate,role:e.role,offsetSec:a,spanBeats:e.spanBeats,gate:e.gate,hit:t,root:e.root}))}const Pc=(e,t,n)=>Math.min(n,Math.max(t,e)),M1=1e-9;function T1(e,t){return t>0?Math.ceil(e/t-M1)*t:e}const Rc=(e,t)=>({from:e,origin:t,jump:null,last:null,lastKey:"",pushedTo:-1,bar:{bar:NaN,settings:null,hits:[]}});class us{step=0;grid={origin:0,index:0,interval:16};comp=Rc(0,0);read;random;chordRandom;bpb;serial=0;constructor(t,n={}){this.read=typeof t=="function"?t:()=>t,this.random=n.random??Math.random,this.chordRandom=n.chordRandom??Math.random,this.bpb=n.beatsPerBar??(()=>4)}get settings(){return this.read()}beatsPerBar(){return Math.max(1,this.bpb())}beatInBar(t){const n=this.beatsPerBar();return(t%n+n)%n}start(t,{join:n=!1}={}){const a=this.settings.interval,r=4/a,o=n?T1(t,r):t;this.grid={origin:o,index:0,interval:a},this.step=Math.max(0,Math.round(o/r));const s=this.beatsPerBar();return this.comp=Rc(o,n?0:Math.floor(t/s+1e-9)*s),o}clone(t={}){const n=new us(t.settings??this.read,{random:t.random??this.random,chordRandom:t.chordRandom??this.chordRandom,beatsPerBar:t.beatsPerBar??this.bpb});n.step=this.step,n.grid={...this.grid},n.serial=this.serial;const a=this.comp;return n.comp={...a,jump:a.jump?{...a.jump}:null,last:a.last?[...a.last]:null,bar:{...a.bar}},n}resetGrid(){this.grid={origin:0,index:0,interval:this.settings.interval}}nextBeat(){return this.grid.origin+this.grid.index*4/this.grid.interval}stepBeats(){return 4/this.grid.interval}followInterval(){const t=this.settings.interval;t!==this.grid.interval&&(this.grid={origin:this.nextBeat(),index:0,interval:t})}skipTo(t){const n=Math.max(0,Math.ceil((t-this.nextBeat())/this.stepBeats()-1e-9));return this.grid.index+=n,this.step+=n,n}advance(){this.grid.index++}advanceStep(){this.step++}applyJump(t){const n=this.comp.jump;n&&t>=n.at-1e-9&&(this.comp.origin=n.origin,this.comp.jump=null)}plainChord(){const t=this.settings;return t.chordStyle==="block"&&t.chordProgression==="off"&&!(t.strum>0)&&!(t.tension>0)}barStyleActive(){const t=this.settings;return t.mode==="chord"&&t.arp==="off"&&!this.plainChord()&&Tc(t.chordStyle)==="bar"}stepHit(t){const n=this.settings,a=this.stepBeats();if(n.mode==="chord"&&!this.plainChord()){if(n.arp!=="off"){const c=this.chordAt(t),p={...n,chord:c.chord,note:c.rootPc,octave:Math.floor(c.root/12)-1,...c.inversion!==void 0?{inversion:c.inversion}:{}},f=Ic(p,this.step,this.random);return this.step++,f.length?this.hit(t,a,f,1,null,c,!1,"arp"):null}if(Tc(n.chordStyle)==="bar")return this.step++,null;const l=this.chordAt(t),d=this.voicingFor(l),u=l1(n.chordStyle,d,this.step,this.beatInBar(t),this.chordRandom);return this.step++,!u||!u.notes.length?null:this.hit(t,a,u.notes,u.velocity,Lc(this.beatInBar(t)),l,!0,"chord")}if(!k1(n.mode))return this.step++,null;const r=Ic(n,this.step,this.random);if(this.step++,!r.length)return null;const o=n.mode==="chord",s=o?Math.min(127,Math.max(0,(n.octave+1)*12+n.note)):r[0];return{beat:t,spanBeats:a,gate:Pc(n.gate/100,.1,1),velocity:1,notes:r,kind:"plain",direction:null,strumMs:0,chord:o?this.plainChordAt():null,root:s,role:o?n.arp==="off"?"chord":"arp":"note"}}hit(t,n,a,r,o,s,l,d){const u=this.settings,c=[...a];if(l&&u.tension>0&&this.chordRandom()*100<u.tension){const f=p1(c,s.rootPc,s.intervals,this.chordRandom);f!==null&&c.push(f)}const p=u.chordStyle==="strum"&&o?u.strum>0?u.strum:a1:u.strum;return{beat:t,spanBeats:n,gate:Pc(u.gate/100,.1,1),velocity:r,notes:c,kind:"comp",direction:o,strumMs:p,chord:s,root:s.root,role:d}}progressionOrigin(t){const n=this.comp.jump;return n&&t>=n.at-1e-9?n.origin:this.comp.origin}plainChordAt(){const t=this.settings,n=cs(t.chord);return{index:0,root:(t.octave+1)*12+t.note,rootPc:t.note,chord:n.id,intervals:n.intervals,name:"",numeral:"",bars:1}}chordAt(t){const n=this.settings,a=Do(n.chordProgression,n.note,n.octave,n.progressionBars);return a?.length?Nc(a,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar()).chord:this.plainChordAt()}voicingFor(t){const n=this.settings,a=t.inversion??Math.min(Math.max(0,n.inversion|0),t.intervals.length-1),r=`${t.root}|${t.intervals.join(",")}|${a}|${n.voiceLeading}|${n.arpSpread}`;if(this.comp.last&&r===this.comp.lastKey)return this.comp.last;const o=n.voiceLeading==="smooth"?f1(this.comp.last,t.root,t.intervals,(n.octave+1)*12+n.note,a,n.arpSpread,t.inversion):ki(t.root,t.intervals,a,n.arpSpread);return this.comp.last=o,this.comp.lastKey=r,o}compBar(t){const n=this.comp.bar,a=this.settings;if(n.bar===t&&n.settings===a)return n.hits;const r=a,o=this.beatsPerBar(),s=r.chordStyle,l=this.chordAt(t*o),d=this.voicingFor(l);let u=d;if(s==="push"){const p=this.chordAt((t+1)*o);if(`${p.root}|${p.intervals.join(",")}`!=`${l.root}|${l.intervals.join(",")}`){const f={last:this.comp.last,key:this.comp.lastKey};u=this.voicingFor(p),this.comp.last=f.last,this.comp.lastKey=f.key}}let c=c1(s,d,l.rootPc,l.intervals,u).filter(p=>p.step/4<o-1e-9);return s==="push"&&this.comp.pushedTo===t&&(c=c.filter(p=>p.step!==0)),this.comp.bar={bar:t,settings:a,hits:c},c}barFrom(){return this.comp.from}catchUpBars(t){this.comp.from=t}syncBars(){this.comp.from=this.nextBeat()}barHits(t,n=()=>!1){const a=this.settings,r=this.beatsPerBar(),o=[];for(let s=0;s<128;s++){const l=Math.floor(this.comp.from/r+1e-9),u=this.compBar(l).find(y=>l*r+y.step/4>=this.comp.from-1e-9);if(!u){this.comp.from=(l+1)*r;continue}const c=l*r+u.step/4;if(!t(c))break;if(this.comp.from=c+1e-6,n())continue;const p=u.next&&a.chordStyle==="push"?u.len+6:u.len;u.next&&(this.comp.pushedTo=l+1);const f=this.chordAt(u.next?(l+1)*r:c);o.push(this.hit(c,p/4,u.notes,u.velocity,u.strum??Lc(this.beatInBar(c)),f,!0,"chord"))}return o}chordPosition(t){const n=this.settings;if(n.mode!=="chord")return null;const a=Do(n.chordProgression,n.note,n.octave,n.progressionBars);if(!a?.length)return null;const r=Nc(a,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar());return{index:r.index,bar:Math.floor(r.position+1e-9)+1,bars:r.total}}jumpToChord(t,n){const a=this.settings,r=Do(a.chordProgression,a.note,a.octave,a.progressionBars);if(!r?.length||t<0||t>=r.length)return!1;const o=this.beatsPerBar(),s=Math.max(n,this.nextBeat(),this.comp.from),l=Math.ceil(s/o-1e-9)*o;return this.comp.jump={at:l,origin:l-y1(r,t)*o},!0}window(t,{muted:n=()=>!1}={}){const a=[];this.followInterval(),this.applyJump(this.nextBeat());for(let o=0;o<4096;o++){const s=this.nextBeat();if(!(s<t))break;if(n())this.advanceStep();else{const l=this.stepHit(s);l&&a.push(l)}this.advance()}this.barStyleActive()?a.push(...this.barHits(o=>o<t,n)):this.syncBars();const r=[];for(const o of a)r.push(...A1(o,++this.serial));return r.sort((o,s)=>o.startBeat-s.startBeat)}}const Le=1,$r=1024,L1=48,Hp=128,Dc=40,zc=64,$i=8,Oc=16,Sr=1024,Up=16,ps=255,C1=["chord","root","top"],N1=["chord","root","top","arp","note"],Wa=256,Bc=2,_c=128;function I1(e,t,n,a,r){return`${e}|${t}|${n}|${a}|${r}`}function zo(e,t,n,a,r={}){const o=new Map;return S1(n,a,r).map(s=>{const l=o.get(s.hit)??0;return o.set(s.hit,l+1),{...s,id:I1(e,t,s.role,s.hit,l),source:e}})}const ma=e=>typeof e=="object"&&e!==null,Ie=e=>typeof e=="string"&&e.length>0&&e.length<=Hp,Ae=e=>typeof e=="number"&&Number.isFinite(e);function jc(e){return ma(e)?Ie(e.id)?Ie(e.source)?!Number.isInteger(e.note)||e.note<0||e.note>127?"note must be a whole number 0–127":!Ae(e.velocity)||e.velocity<0||e.velocity>1?"velocity must be 0–1":Ae(e.startBeat)?!Ae(e.lengthBeats)||e.lengthBeats<0?"bad lengthBeats":!Ae(e.spanBeats)||e.spanBeats<=0?"bad spanBeats":!Ae(e.gate)||e.gate<=0||e.gate>1?"gate must be above 0, at most 1":!Ae(e.offsetSec)||Math.abs(e.offsetSec)>2?"bad offsetSec":typeof e.role!="string"||!N1.includes(e.role)?"bad role":Number.isInteger(e.hit)?!Number.isInteger(e.root)||e.root<0||e.root>127?"bad root":e.slice!==void 0&&!Gp(e.slice)?`slice must be a whole number 0–${ps}`:null:"bad hit":"bad startBeat":"bad source":"bad id":"not an object"}const Gp=e=>Number.isInteger(e)&&e>=0&&e<=ps,F1=e=>Number.isInteger(e)&&e>=1&&e<=Up;function Wp(e){return ma(e)?Ie(e.id)?Ae(e.beat)?e.type==="slot"?!Number.isInteger(e.slot)||e.slot<1||e.slot>Oc?`slot must be a whole number 1–${Oc}`:null:e.type==="chordPad"?e.pad!==null&&!F1(e.pad)?`pad must be a whole number 1–${Up}, or null`:null:e.type==="take"?Ie(e.take)?!Ae(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>Wa?`lengthBeats must be above 0, at most ${Wa}`:e.gain!==void 0&&(!Ae(e.gain)||e.gain<0||e.gain>Bc)?`gain must be 0–${Bc}`:e.offsetBeats!==void 0&&(!Ae(e.offsetBeats)||e.offsetBeats<0||e.offsetBeats>=e.lengthBeats)?"offsetBeats must be from 0, below lengthBeats":e.peaks!==void 0&&!(Array.isArray(e.peaks)&&e.peaks.length<=_c&&e.peaks.every(t=>Ae(t)&&t>=0&&t<=1))?`peaks must be at most ${_c} values 0–1`:null:"bad take":e.type==="lap"?!Ae(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>Wa?`lengthBeats must be above 0, at most ${Wa}`:null:"bad type":"bad beat":"bad id":"not an object"}function P1(e){if(!ma(e))return"not an object";if(e.type!=="note")return Wp(e);if(!Ie(e.id))return"bad id";if(!Ae(e.beat))return"bad beat";if(typeof e.on!="boolean")return"on must be true or false";if(!Number.isInteger(e.note)||e.note<0||e.note>127)return"note must be a whole number 0–127";if(e.on){if(!Ae(e.velocity)||e.velocity<=0||e.velocity>1)return"velocity must be above 0, at most 1";if(e.slice!==void 0&&!Gp(e.slice))return`slice must be a whole number 0–${ps}`;if(e.name!==void 0&&(typeof e.name!="string"||!e.name.length||e.name.length>Dc))return`name must be 1–${Dc} characters`}else if(e.velocity!==void 0||e.slice!==void 0||e.name!==void 0)return"an off has no velocity, slice or name";return null}function qc(e,t){if(!Array.isArray(e))return"events must be a list";if(e.length>$r)return`more than ${$r} events`;for(let n=0;n<e.length;n++){const a=t(e[n]);if(a)return`event ${n}: ${a}`}return null}function R1(e){if(!ma(e))return"not an object";if(e.v!==Le)return`version ${String(e.v)} is not ${Le}`;if(e.kind==="notes"){if(!Ie(e.source))return"bad source";if(!Array.isArray(e.events))return"events must be a list";if(e.events.length>$r)return`more than ${$r} events`;for(let t=0;t<e.events.length;t++){const n=jc(e.events[t]);if(n)return`event ${t}: ${n}`;if(e.events[t].source!==e.source)return`event ${t}: from another source`}return null}if(e.kind==="audition"){if(!Ie(e.source))return"bad source";if(!Array.isArray(e.events))return"events must be a list";if(e.events.length>zc)return`more than ${zc} notes`;if(!Ae(e.holdSec)||e.holdSec<=0||e.holdSec>$i)return`holdSec must be above 0, at most ${$i}`;for(let t=0;t<e.events.length;t++){const n=jc(e.events[t]);if(n)return`event ${t}: ${n}`;if(e.events[t].source!==e.source)return`event ${t}: from another source`}return null}if(e.kind==="played")return Ie(e.source)?qc(e.events,P1):"bad source";if(e.kind==="controls")return Ie(e.source)?qc(e.events,Wp):"bad source";if(e.kind==="off")return Ie(e.source)?["stop","removed","off","restart"].includes(e.reason)?e.atBeat!==void 0&&!Ae(e.atBeat)?"bad atBeat":null:"bad reason":"bad source";if(e.kind==="release"){if(!Ie(e.source))return"bad source";if(!Array.isArray(e.ids))return"ids must be a list";if(e.ids.length>Sr)return`more than ${Sr} ids`;for(let t=0;t<e.ids.length;t++)if(!Ie(e.ids[t]))return`id ${t}: bad id`;return null}if(e.kind==="routes"){if(!Array.isArray(e.routes)||e.routes.length>64)return"routes must be a list (at most 64)";for(const t of e.routes){if(!ma(t)||!Ie(t.source)||typeof t.name!="string"||t.name.length>Hp)return"bad route";if(!C1.includes(t.role))return"bad route role";if(t.octave!==void 0&&!(Number.isInteger(t.octave)&&t.octave>=-1&&t.octave<=9))return"bad route octave";if(t.transpose!==void 0&&!(Number.isInteger(t.transpose)&&Math.abs(t.transpose)<=L1))return"bad route transpose";if(t.layer!==void 0&&typeof t.layer!="boolean")return"bad route layer"}return null}return"unknown kind"}const Vc=e=>({id:e.id,source:e.source,note:e.note,velocity:e.velocity,startBeat:e.startBeat,lengthBeats:e.lengthBeats,role:e.role,offsetSec:e.offsetSec,spanBeats:e.spanBeats,gate:e.gate,hit:e.hit,root:e.root,...e.slice===void 0?{}:{slice:e.slice}}),Kp=e=>e.type==="slot"?{type:"slot",id:e.id,beat:e.beat,slot:e.slot}:e.type==="take"?{type:"take",id:e.id,beat:e.beat,take:e.take,lengthBeats:e.lengthBeats,...e.gain===void 0?{}:{gain:e.gain},...e.offsetBeats===void 0?{}:{offsetBeats:e.offsetBeats},...e.peaks===void 0?{}:{peaks:[...e.peaks]}}:e.type==="lap"?{type:"lap",id:e.id,beat:e.beat,lengthBeats:e.lengthBeats}:{type:"chordPad",id:e.id,beat:e.beat,pad:e.pad},D1=e=>e.type!=="note"?Kp(e):{type:"note",id:e.id,beat:e.beat,on:e.on,note:e.note,...e.on?{velocity:e.velocity}:{},...e.on&&e.slice!==void 0?{slice:e.slice}:{},...e.on&&e.name!==void 0?{name:e.name}:{}};function Hc(e){if(R1(e))return null;const t=e;return t.kind==="notes"?{v:Le,kind:"notes",source:t.source,events:t.events.map(Vc)}:t.kind==="audition"?{v:Le,kind:"audition",source:t.source,events:t.events.map(Vc),holdSec:t.holdSec}:t.kind==="played"?{v:Le,kind:"played",source:t.source,events:t.events.map(D1)}:t.kind==="controls"?{v:Le,kind:"controls",source:t.source,events:t.events.map(Kp)}:t.kind==="off"?{v:Le,kind:"off",source:t.source,reason:t.reason,...t.atBeat===void 0?{}:{atBeat:t.atBeat}}:t.kind==="release"?{v:Le,kind:"release",source:t.source,ids:[...t.ids]}:{v:Le,kind:"routes",routes:t.routes.map(n=>({source:n.source,name:n.name,role:n.role,...n.octave===void 0?{}:{octave:n.octave},...n.transpose===void 0?{}:{transpose:n.transpose},...n.layer===void 0?{}:{layer:n.layer}}))}}const z1=(e,t)=>({v:Le,kind:"notes",source:e,events:t}),Ka=(e,t,n)=>({v:Le,kind:"off",source:e,reason:t,...n===void 0?{}:{atBeat:n}}),O1=(e,t)=>({v:Le,kind:"release",source:e,ids:t}),B1=e=>({v:Le,kind:"routes",routes:e}),_1=(e,t,n)=>({v:Le,kind:"audition",source:e,events:t,holdSec:n}),Uc=(e,t)=>({v:Le,kind:"controls",source:e,events:t}),Ue=1e-9,Ya=new WeakMap;function j1(e={}){const t=new Map,n=new Map,a=new Set,r={sent:{notes:0,off:0,routes:0,audition:0,controls:0,release:0},played:{events:0,refused:0},events:0,errors:0},o=new Set,s=()=>e.nowBeat?.()??null,l=new Set,d=()=>{for(const b of[...l])try{b()}catch{}},u=(b,S)=>{const E=n.get(b);if(!(!E||S.kind==="played")){r.sent[S.kind]++,S.kind==="notes"&&(r.events+=S.events.length);try{E(S)}catch{r.errors++}}},c=b=>{const S=[];for(const E of t.values()){const g=E.targets.get(b);g?.on&&S.push({source:E.handle.id,name:E.handle.name,role:g.role,...g.octave===void 0?{}:{octave:g.octave},...g.transpose?{transpose:g.transpose}:{},...g.layer?{layer:!0}:{}})}return S},p=(b,S,E)=>{!b.targets.get(S)?.on||!E.length||u(S,Uc(b.handle.id,E.map(g=>({...g}))))},f=(b,S)=>{const E=s();return b.controls.filter(g=>(E===null||g.beat>=E-Ue)&&(Ya.get(g)??S)===S)},y=b=>u(b,B1(c(b))),m=(b,S,E)=>{const g=b.targets.get(S);if(!g?.on||!E.length)return;const x=Gc(zo(b.handle.id,b.run,E,g.role,{...g.octave===void 0?{}:{octave:g.octave}}),g.transpose??0);x.length&&u(S,z1(b.handle.id,x))},w=(b,S)=>{const E=[...b.current,...b.kept.filter(x=>x.startBeat<S-Ue)];if(!E.length)return[];let g=E[0];for(const x of E)x.startBeat>g.startBeat+Ue&&(g=x);return E.filter(x=>x.hit===g.hit&&Math.abs(x.startBeat-g.startBeat)<=Ue)},h=(b,S)=>{const E=s(),g=A=>(Ya.get(A)??S)===S;if(E===null)return b.kept.filter(g);const x=b.kept.filter(A=>A.startBeat>=E-Ue);return(a.has(S)?[...w(b,E),...x]:x).filter(g)},v=b=>{const S=s();S!==null&&b.kept.length&&b.kept[0].startBeat<S-Ue&&(b.current=w(b,S),b.kept=b.kept.filter(E=>E.startBeat>=S-Ue)),S!==null&&b.controls.length&&(b.controls=b.controls.filter(E=>E.beat>=S-Ue))};function k(b,S){const E=t.get(b);E&&E.handle.remove();const g={handle:void 0,run:1,kept:[],current:[],controls:[],targets:new Map,status:null,takeBack:null},x=()=>t.get(b)===g,A={id:b,name:S,send($,L){if(!x()||!$.length||L!==void 0&&(typeof L!="string"||!L))return;v(g);const C=$.map(R=>({...R}));if(L!==void 0)for(const R of C)Ya.set(R,L);if(g.kept.push(...C),L!==void 0)g.targets.has(L)&&m(g,L,C);else for(const R of g.targets.keys())m(g,R,C)},sendControls($,L){if(!x()||!Array.isArray($)||!$.length||L!==void 0&&(typeof L!="string"||!L))return;const C=Hc(Uc(b,[...$]));if(!(!C||C.kind!=="controls")){if(v(g),L!==void 0)for(const R of C.events)Ya.set(R,L);if(g.controls.push(...C.events),L!==void 0)g.targets.has(L)&&p(g,L,C.events);else for(const R of g.targets.keys())p(g,R,C.events)}},audition($,L){if(!x()||!$.length||!(L>0))return;const C=Math.min(L,$i),R=$.map(G=>({...G})),_=()=>{if(x())for(const[G,re]of g.targets){if(!re.on||a.has(G))continue;const he=Gc(zo(b,0,R,re.role,{...re.octave===void 0?{}:{octave:re.octave}}),re.transpose??0);he.length&&u(G,_1(b,he,C))}};let U;try{U=e.startAudio?.()}catch{U=void 0}U?U.then(_,_):_()},restart(){x()&&(g.run++,g.kept=[],g.current=[],g.controls=[])},release($,L){if(!x()||!Array.isArray($)||!$.length||L!==void 0&&(typeof L!="string"||!L))return;const C=new Set($.map(R=>R.hit));g.kept=g.kept.filter(R=>!C.has(R.hit));for(const[R,_]of g.targets){if(!_.on||L!==void 0&&R!==L)continue;const U=zo(b,g.run,$,_.role,{..._.octave===void 0?{}:{octave:_.octave}});for(let G=0;G<U.length;G+=Sr)u(R,O1(b,U.slice(G,G+Sr).map(re=>re.id)))}},off($,L){if(x()){g.kept=L===void 0?[]:g.kept.filter(C=>C.startBeat<L-Ue),(L===void 0||g.current.some(C=>C.startBeat>=L-Ue))&&(g.current=[]),g.controls=L===void 0?[]:g.controls.filter(C=>C.beat<L-Ue);for(const[C,R]of g.targets)R.on&&u(C,Ka(b,$??"stop",L))}},setTarget($,L){if(!x()||typeof $!="string"||!$)return;const C=g.targets.get($),R=q1(L.transpose),_={role:L.role,on:L.on===!0,...L.octave===void 0?{}:{octave:L.octave},...R?{transpose:R}:{},...L.layer===!0?{layer:!0}:{}};g.targets.set($,_);const U=C!==void 0&&C.layer===!0!=(_.layer===!0),G=C&&(C.role!==_.role||C.octave!==_.octave||(C.transpose??0)!==(_.transpose??0))&&C.on;C?.on&&(!_.on||G)&&u($,Ka(b,"off")),(!C||C.on!==_.on||G||U)&&y($),_.on&&(!C?.on||G)&&(m(g,$,h(g,$)),p(g,$,f(g,$))),(!C||C.on!==_.on)&&d()},removeTarget($){const L=g.targets.get($);!x()||!L||(g.targets.delete($),L.on&&(u($,Ka(b,"removed")),y($)))},targets:()=>[...g.targets].map(([$,L])=>({target:$,...L})),remove(){if(!x())return;const $=[...g.targets].filter(([,L])=>L.on).map(([L])=>L);for(const L of $)u(L,Ka(b,"removed"));t.delete(b);for(const L of $)y(L);d()},status($){if(!x())return;const L=$&&typeof $.now=="string"&&typeof $.next=="string"?{now:$.now.slice(0,32),next:$.next.slice(0,32)}:null;JSON.stringify(L)!==JSON.stringify(g.status)&&(g.status=L,d())},onTakeBack($){x()&&(g.takeBack=typeof $=="function"?$:null)}};return g.handle=A,t.set(b,g),A}return{source:k,sources:()=>[...t.values()].map(b=>b.handle),host:b=>({notesIn(S,E){if(typeof S!="function")return()=>{};const g=E?.takes==="pitch",x=!n.has(b)||a.has(b)!==g;n.set(b,S),g?a.add(b):a.delete(b),x&&d(),y(b);for(const A of t.values())A.targets.get(b)?.on&&(m(A,b,h(A,b)),p(A,b,f(A,b)));return()=>{n.get(b)===S&&(n.delete(b),a.delete(b),d())}},notesSource:S=>k(b,String(S).slice(0,64)),notesTakeBack(S){const E=t.get(S);if(!E?.takeBack||!E.targets.has(b))return null;try{const g=E.takeBack(b);return g==null?null:structuredClone(g)}catch{return null}},notesOut(S){const E=S&&typeof S=="object"&&S.source===void 0?{...S,source:b}:S,g=Hc(E);if(!g||g.kind!=="played"||g.source!==b)return r.played.refused++,!1;if(!g.events.length)return!0;r.played.events+=g.events.length;for(const x of[...o])try{x(b,structuredClone(g.events))}catch{r.errors++}return!0},onPlayed(S){return typeof S!="function"?()=>{}:(o.add(S),()=>{o.delete(S)})}}),routesFor:c,listening:b=>n.has(b),takesPitch:b=>n.has(b)&&a.has(b),drop(b){n.delete(b),a.delete(b);for(const S of[...t.values()])S.handle.id===b?S.handle.remove():S.targets.delete(b);d()},statuses:()=>[...t.values()].filter(b=>b.status!==null).map(b=>({source:b.handle.id,name:b.handle.name,status:{...b.status}})),onChange(b){return l.add(b),()=>l.delete(b)},stats:()=>({sent:{...r.sent},played:{...r.played},events:r.events,errors:r.errors})}}function q1(e){return typeof e=="number"&&Number.isFinite(e)?Math.max(-48,Math.min(48,Math.round(e))):0}function Gc(e,t){if(!t)return e;const n=a=>Math.max(0,Math.min(127,a+t));return e.map(a=>({...a,note:n(a.note),root:n(a.root)}))}const V1=.5,H1=20;function U1(e,t,n={}){const a=n.aheadSec??V1,r=n.now??Be;let o={...$1,...n.settings};const s=n.seed??1,l=()=>new us(()=>o,{random:Fc(s),chordRandom:Fc(s+1),beatsPerBar:()=>Math.max(1,t.transport.meter?.beatsPerBar??4)});let d=null,u=0,c=!1;const p=()=>{const h=t.transport;if(!d||!h.running)return;const v=d.window(h.beatAt(r()+a));v.length&&(u+=v.length,e.send(v))},f=(h,v)=>{d=l(),e.restart(),d.start(h,{join:v}),p()},y=t.onChange(h=>{if(!c){if(h.kind==="start")f(h.beat,!1);else if(h.kind==="stop")d=null,e.off("stop");else if(h.kind==="snapshot"){const v=t.transport;!v.running&&d?(d=null,e.off("stop")):v.running&&!d&&f(v.beatAt(Math.max(v.startTime??r(),r())),!0)}}}),m=(n.ticker??(h=>fd(h,{intervalMs:H1})))(p);m.start();const w=t.transport;return w.running&&f(w.beatAt(Math.max(w.startTime??r(),r())),!0),{source:e,set(h){o={...o,...h}},settings:()=>o,sent:()=>u,remove(){c||(c=!0,y(),m.dispose(),e.remove())}}}const Vr="studio";function G1(){let e=null;const t=new Set,n=new Set,a=new Set,r=new Map,o=u=>{try{return r.get(u)?.()===!0}catch{return!1}},s=u=>{for(const c of[...u])try{c()}catch{}},l=u=>{if(u!==e){e=u;for(const c of n)c()}},d=(u,c)=>(u.add(c),()=>{u.delete(c)});return{owner:()=>e,claim(u){e===null&&l(u)},claimAll(){l(Vr),s(t)},clear:()=>l(null),onAll:u=>d(t,u),member(u,c){return r.set(u,c),()=>{r.get(u)===c&&r.delete(u)}},out(u){for(const c of r.keys())if(c!==u&&o(c))return;s(a)},drop:u=>{r.delete(u)},onLastOut:u=>d(a,u),playing:()=>[...r.keys()].filter(o),onChange:u=>d(n,u)}}const Wc="netcomposer.studio.plugins.frozen.v1",W1=2e3;function K1(e,t){const n=[],a=new Set;for(const r of t)r.plugin?.status!=="failed"||r.plugin.error!==lr[6]||(a.add(r.id),e.has(r.id)||n.push(r));for(const r of[...e])a.has(r)||e.delete(r);for(const r of a)e.add(r);return n}function Y1(e){const t=new Map;for(const n of e)for(const a of n)a.plugin?.status==="ready"&&!t.has(a.plugin.id)&&t.set(a.plugin.id,a.plugin.name);return[...t].map(([n,a])=>({id:n,name:a}))}function X1(e){let t=[];const n=()=>{if(!e)return t;try{const r=JSON.parse(e.getItem(Wc)??"[]");return Array.isArray(r)?r.filter(o=>typeof o=="string"):[]}catch{return[]}},a=r=>{t=r;try{e?.setItem(Wc,JSON.stringify(r))}catch{}};return{has:r=>n().includes(r),list:n,add(r){a([...new Set([...n(),...r])])},clear(r){const o=n();o.includes(r)&&a(o.filter(s=>s!==r))}}}function J1(e){let t=!1;const n=(e.watch??lm)(e.ctx,{stallMs:e.stallMs??W1,onStall:()=>{if(t)return;const a=e.running();a.length&&(t=!0,n.stop(),e.onFrozen(a))}});return{stop:()=>n.stop()}}const Q1=48;function Z1(e){return typeof e!="string"?null:e.replace(/\s+/g," ").trim().slice(0,Q1)||null}function ex(e){const n=(e.doc??document).createElement("div");n.className="studio-readout",n.hidden=!0,n.setAttribute("role","status"),n.setAttribute("aria-live","off");const a=new Map;let r=!1;const o=()=>[...a.values()].at(-1)??null,s=()=>{const d=o();if(!d||e.blocked?.()){n.hidden=!0,d?requestAnimationFrame(s):r=!1;return}n.hidden=!1;let u=0;for(const p of e.clearOf?.()??[])u=Math.max(u,p.getBoundingClientRect().bottom);const c=`${Math.round(u)}px`;n.style.getPropertyValue("--count-in-top")!==c&&n.style.setProperty("--count-in-top",c),n.textContent!==d&&(n.textContent=d),requestAnimationFrame(s)},l=()=>{r||(r=!0,requestAnimationFrame(s))};return{el:n,api:{set(d,u){if(typeof d!="string"||!d)return;const c=Z1(u);a.delete(d),c&&a.set(d,c),l()},current:o}}}const tx="NetComposer Studio",bt=[40,240],nx="nc-sync";function ax(e,t=globalThis.navigator?.locks){const n=`/studio/${e}`;return{channel:`${nx}${n}`,locks:t?{request:(a,r,o)=>t.request(`${a}${n}`,r,o)}:null}}function rx(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}const ox=.2,Kc=.5;function ix(e,t,n){const a=new lf({bpm:120,minBpm:bt[0],maxBpm:bt[1],timebase:"shared"}),r=new kf({app:tx,version:"0.1.0",clock:a,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:bt},startLeadSeconds:ox,...n?{startGate:()=>n(),gatedStartLeadSeconds:Kc}:{},...t?{channel:t.channel,locks:t.locks}:{},audio:()=>{const d=e();return d==="running"?"running":d==="closed"?"none":"needs-gesture"}});let o=!1,s=0,l=!1;return{clock:a,peer:r,async start(){o||(o=!0,await r.start())},play(){const d=n?.()??null;if(!d){l=!1,a.play({at:Be()});return}const u=++s,c=Be();l=!0;const p=()=>{u!==s||!l||(l=!1,r.isLeader&&!a.transport.running?(a.commitStart(Math.max(c,Be())+Kc,0),r.publishState()):a.play({at:Be()}))};d.then(p,p)},stop(){l&&(l=!1,s++,!a.transport.running)||a.stop({at:Be()})},setTempo:d=>a.setTempo({bpm:sx(d)}),playing:()=>a.transport.isPlayingAt(Be()),running:()=>l||a.transport.running,bpm:()=>a.transport.bpm,position(){const d=a.transport,u=Be();return d.isPlayingAt(u)?lx(d.beatAt(u)):null},beatPhase(){const d=a.transport,u=Be();if(!d.isPlayingAt(u))return null;const c=d.beatAt(u);return c-Math.floor(c)},peers:()=>[...r.peers.values()]}}function sx(e){return Number.isFinite(e)?Math.min(bt[1],Math.max(bt[0],Math.round(e*10)/10)):120}function lx(e){const t=Math.max(0,Math.floor(e));return{bar:Math.floor(t/4)+1,beat:t%4+1}}const Si="netcomposer.scene",Yp=1,hs="netcomposer.studio.tempo.v1",fs="netcomposer.studio.scene-name.v1",Er=120,ms="Untitled scene",cx=2*1024*1024;function Hr(e){const t=typeof e=="number"?e:Number(e);return Number.isFinite(t)?Math.min(bt[1],Math.max(bt[0],Math.round(t*10)/10)):Er}function sn(e){return(typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,60):"")||ms}function dx(e){return{format:Si,v:Yp,name:sn(e.name),saved:(e.now??new Date).toISOString(),tempo:{bpm:Hr(e.bpm)},meter:[4,4],instances:e.instances.map(t=>({id:t.id,type:t.type,name:t.name})),mix:e.mix,presets:e.presets??{},media:e.media??[]}}function ux(e,t){if(e.length>cx)return{ok:!1,error:"That file is too large to be a Scene."};let n;try{n=JSON.parse(e)}catch{return{ok:!1,error:"That file isn't a Scene (it isn't JSON)."}}if(!n||typeof n!="object")return{ok:!1,error:"That file isn't a Scene."};const a=n;if(a.format!==Si)return{ok:!1,error:"That file isn't a Scene. Load an instrument's own file from that instrument."};if((typeof a.v=="number"?a.v:0)<1)return{ok:!1,error:"That Scene has no version."};const o=new Set,s=[];for(const u of Array.isArray(a.instances)?a.instances:[]){if(!u||typeof u!="object")continue;const c=u.id;if(typeof c!="string")continue;const p=as(c);if(!p||!t.includes(p.type)||o.has(c))continue;o.add(c);const f=u.name;s.push({id:c,type:p.type,name:Qu(f,"")})}if(!s.length)return{ok:!1,error:"That Scene has no instruments this Studio knows."};const l=a.tempo&&typeof a.tempo=="object"?a.tempo.bpm:void 0,d={};if(a.presets&&typeof a.presets=="object")for(const[u,c]of Object.entries(a.presets))o.has(u)&&(d[u]=c);return{ok:!0,scene:{format:Si,v:Yp,name:sn(a.name),saved:typeof a.saved=="string"?a.saved:"",tempo:{bpm:Hr(l)},meter:[4,4],instances:s,mix:kp(a.mix??fa()),presets:d,media:Array.isArray(a.media)?a.media:[]}}}function px(e){return`${sn(e).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"scene"}.scene.json`}function hx(e){try{const t=e?.getItem(hs);return t?Hr(Number(t)):Er}catch{return Er}}function Xp(e,t){try{t?.setItem(hs,String(Hr(e)))}catch{}}function fx(e){try{return sn(e?.getItem(fs))}catch{return ms}}function Jp(e,t){try{t?.setItem(fs,sn(e))}catch{}}const Ei="netcomposer.studio.reset-pending.v1",Ar="nc-reset",mx=6e4,gs="netcomposer.studio.reset-undo.v1",bs="netcomposer.studio.legacy-copy.v1",Ur="netcomposer.studio.generation.v1",gx=/^[a-z0-9]{1,16}$/,Yc="nyx.scene-samples",bx=3e4,yx=[ns,ss,hs,fs,bs,Ur];function vx(e){return e.includes("@studio/")||yx.includes(e)}function Qp(e){const t=[];for(let n=0;n<e.length;n++){const a=e.key(n);a!==null&&vx(a)&&t.push(a)}return t}const wx=/^[0-9a-f]{16,64}$/;function xx(e){const t=new Set,n=(a,r)=>{if(!(!a||typeof a!="object"||r>6))for(const[o,s]of Object.entries(a))o==="sample"&&typeof s=="string"&&wx.test(s)?t.add(s):n(s,r+1)};try{n(JSON.parse(e),0)}catch{}return[...t]}function kx(e,t){const n=new Set;for(const[o,s]of Object.entries(t))if(o.startsWith("nyx.state"))for(const l of xx(s))n.add(l);if(!n.size)return;let a=[];try{const o=JSON.parse(e.getItem(Yc)??"[]");Array.isArray(o)&&(a=o.filter(s=>typeof s=="string"))}catch{}const r=[...a.filter(o=>!n.has(o)),...n].slice(-2048);e.setItem(Yc,JSON.stringify(r))}function $x(e,t){for(const n of[e,t])try{const a=n?.getItem(gs);if(!a)continue;const r=JSON.parse(a);if(r?.v===1&&r.keys&&typeof r.keys=="object")return r}catch{}return null}function Gr(e,t){for(const n of[t,e])try{n?.removeItem(gs)}catch{}}function Sx(e,t,n=Date.now(),a=Ex()){const r={};for(const l of Qp(e)){const d=e.getItem(l);d!==null&&(r[l]=d)}const o=JSON.stringify({v:1,at:n,keys:r});try{kx(e,r)}catch{}for(const l of Object.keys(r))e.removeItem(l);try{t?.removeItem(er)}catch{}Gr(e,t);let s=!1;for(const l of[e,t])if(!(s||!l))try{l.setItem(gs,o),s=!0}catch{}if(!s){for(const[l,d]of Object.entries(r))e.setItem(l,d);return!1}try{e.setItem(bs,"off")}catch{}try{e.setItem(Ur,a)}catch{}return!0}function Ex(){let e="";for(;e.length<8;)e+=Math.random().toString(36).slice(2);return e.slice(0,8)}function ys(e){try{const t=e?.getItem(Ur)??"";return gx.test(t)?t:""}catch{return""}}function Ax(e){const t=e.indexOf("@studio/");if(t<0)return null;const n=e.slice(t+8),a=n.indexOf("/");return a<0?"":n.slice(0,a)}function Mx(e){const t=ys(e),n=[];for(let a=0;a<e.length;a++){const r=e.key(a);if(r===null)continue;const o=Ax(r);o!==null&&o!==t&&n.push(r)}for(const a of n)try{e.removeItem(a)}catch{}return n}function Tx(e,t){const n=$x(e,t);if(!n)return!1;for(const a of Qp(e))e.removeItem(a);Gr(e,t);for(const[a,r]of Object.entries(n.keys))typeof r=="string"&&e.setItem(a,r);return!0}function Lx(e){try{return e?.getItem(bs)==="off"}catch{return!1}}function vs(){try{return globalThis.sessionStorage??null}catch{return null}}function Cx(e,t,n,a=Math.random().toString(36).slice(2,10),r=Date.now()){const o=JSON.stringify({what:n,nonce:a,at:r});let s=!1;for(const l of[e,t])try{l?.setItem(Ei,o),l&&(s=!0)}catch{}return s?a:null}function Nx(e,t,n){const a=new URL(e);return a.searchParams.set(Ar,`${t}.${n}`),a.hash="",a.toString()}function Ix(e){const t=new URL(e);return t.searchParams.has(Ar)?(t.searchParams.delete(Ar),t.toString()):null}function Fx(e,t,n,a=Date.now()){const r=new URLSearchParams(n).get(Ar);let o=null;for(const s of[e,t])try{const l=s?.getItem(Ei);if(s?.removeItem(Ei),!l||o)continue;const d=JSON.parse(l);if(d.what!=="reset"&&d.what!=="undo")continue;const u=r===`${d.what}.${d.nonce}`,c=typeof d.at=="number"&&a-d.at>=0&&a-d.at<mx;(u||r===null&&c)&&(o=d.what)}catch{}return o}function Px(e,t,n="",a=Date.now()){if(!e)return null;const r=Fx(e,t,n,a);try{if(r==="reset")return Sx(e,t,a)?"reset":"failed";if(r==="undo")return Tx(e,t)?"undo":null;Gr(e,t),Mx(e)}catch{}return null}const Zp="netcomposer.studio.picker.v1",Xc="http://127.0.0.1:5177",Rx=1,xn=16,Jc=64*1024*1024,Qc=[1e3,2e3,5e3,1e4],eh=new Set(["127.0.0.1","localhost","[::1]"]);function ws(e){if(typeof e!="string"||!e||e.length>64)return null;let t;try{t=new URL(e)}catch{return null}return t.protocol!=="http:"||!eh.has(t.hostname)||!t.port||t.username||t.password||e.replace(/\/$/,"")!==t.origin?null:t.origin}function Mr(e){try{const t=JSON.parse(e?.getItem(Zp)??"null"),n=t&&typeof t=="object"?t:{};return{on:n.on===!0,address:ws(n.address)??Xc,...n.ok===!0?{ok:!0}:{}}}catch{return{on:!1,address:Xc}}}function Tr(e,t){try{e?.setItem(Zp,JSON.stringify(t))}catch{}}async function Dx(e,t,n){if(eh.has(t))return"granted";try{const a=await e?.query({name:"loopback-network"});if(!a)return"unknown";const r=()=>a.state==="granted"||a.state==="denied"||a.state==="prompt"?a.state:"unknown";return n&&a.addEventListener?.("change",()=>n(r())),r()}catch{return"unknown"}}function zx(e,t){return e.on?t==="granted"?"start":t==="denied"?"blocked":t==="unknown"&&e.ok?"start":"ask":"off"}function Ox(e){let t=[];try{const n=e.pads();Array.isArray(n)&&(t=n)}catch{}return Array.from({length:xn},(n,a)=>{const r=t[a]&&typeof t[a]=="object"?t[a]:{};return{pad:a+1,name:typeof r.name=="string"?r.name.slice(0,40):"",filled:r.filled===!0}})}const Oo=e=>({ok:!1,placed:[],left:[],message:e}),Bo=e=>Array.isArray(e)?e.filter(t=>Number.isInteger(t)&&t>=1&&t<=xn).slice(0,16):[];function Bx(e){const t=e&&typeof e=="object"?e:{};return{ok:t.ok===!0,placed:(Array.isArray(t.placed)?t.placed:[]).flatMap(n=>{const a=n&&typeof n=="object"?n:{},[r]=Bo([a.from]),[o]=Bo([a.to]);return r&&o?[{from:r,to:o}]:[]}).slice(0,xn),left:Bo(t.left),message:typeof t.message=="string"?t.message.slice(0,400):""}}async function _x(e){const t=new Uint8Array(await crypto.subtle.digest("SHA-256",e));return Array.from(t,n=>n.toString(16).padStart(2,"0")).join("")}function jx(e){const t=e&&typeof e=="object"?e:{};return t.type!=="kit"||typeof t.id!="string"||!/^[\w-]{1,40}$/.test(t.id)||typeof t.target!="string"||!t.target||t.target.length>64?null:{id:t.id,target:t.target,mode:t.mode==="fill"?"fill":"replace"}}function qx(e){const t=new Map,n=new Map,a=new Set,r=new Map,o=e.now??(()=>Date.now()),s=e.setTimeout??(($,L)=>setTimeout($,L)),l=e.clearTimeout??($=>clearTimeout($)),d=$=>e.live?.($)??!0;let u="off",c="",p=0,f=null,y=null,m="";const w=$=>{$!==u&&(u=$,e.onStatus?.($))},h=()=>[...t.entries()].filter(([$])=>d($)).map(([$,L])=>{const C=e.brandOf?.($);return{id:$,name:(e.nameOf?.($)??$).slice(0,40),...C?{brand:C.slice(0,40)}:{},shown:e.shown?.()===$,seen:n.get($)??0,pads:Ox(L)}}),v=$=>{const L=h();return m=JSON.stringify(L),JSON.stringify({v:Rx,studio:e.studio,label:(e.label?.()??"Studio").slice(0,60),targets:L,results:[...r.entries()].map(([C,R])=>({id:C,...R})),wait:$})},k=($,L)=>e.fetch(`${c}/api/studio/poll`,{method:"POST",headers:{"content-type":"application/json"},body:v($),cache:"no-store",...L?{signal:L}:{},targetAddressSpace:"loopback"}),b=async($,L)=>{if(!$.ok)throw new Error(`the picker said ${$.status}`);const C=await $.json();if(L!==p)return;if(w("on"),Array.isArray(C.ack))for(const _ of C.ack)typeof _=="string"&&r.delete(_);const R=Array.isArray(C.commands)?C.commands:[];for(const _ of R.slice(0,4)){const U=jx(_);U&&x(U,L)}},S=async $=>{let L=0,C=!1;for(;$===p;){const R=new AbortController;f=R;try{await b(await k(C,R.signal),$),L=0,C=!0}catch{if($!==p)return;C=!1,w("away");const _=Qc[Math.min(L++,Qc.length-1)];await new Promise(U=>s(U,_))}}},E=()=>{!c||y!==null||(y=s(()=>{y=null;const $=p;!c||u!=="on"||!r.size&&JSON.stringify(h())===m||k(!1).then(L=>b(L,$)).catch(()=>{})},150))},g=async $=>{const L=await e.fetch($,{cache:"no-store",targetAddressSpace:"loopback"});if(!L.ok){const C=await L.json().catch(()=>({}));throw new Error(typeof C.error=="string"?C.error.slice(0,120):`the picker said ${L.status}`)}return L},x=async($,L)=>{if(r.has($.id))return;let C;const R=t.get($.target);if(!R||!d($.target))C=Oo("That NYX isn't in the Studio any more.");else if(a.has($.target))C=Oo("NYX is still loading the last kit.");else{a.add($.target);try{const _=`kit=${encodeURIComponent($.id)}`,U=await(await g(`${c}/api/kit/manifest?${_}`)).json(),G=Array.isArray(U.sounds)?U.sounds:[];if(!G.length)throw new Error("the picker's pads are empty");if(G.length>xn)throw new Error(`more than ${xn} sounds`);const re={};for(const he of G){const ee=he&&typeof he=="object"?he.pad:null;if(typeof ee!="number"||!Number.isInteger(ee)||ee<1||ee>xn||re[ee])throw new Error("a sound has no pad of its own");const X=await g(`${c}/api/kit/audio?${_}&pad=${ee}`);if(Number(X.headers.get("content-length")??0)>Jc)throw new Error(`pad ${ee}'s sound is too big`);const Xe=await X.arrayBuffer();if(Xe.byteLength>Jc)throw new Error(`pad ${ee}'s sound is too big`);const Ve=he.sha256;if(typeof Ve=="string"&&Ve&&await _x(Xe)!==Ve.toLowerCase())throw new Error(`pad ${ee}'s sound isn't the one sent`);re[String(ee)]=Xe}if(L!==p)return;e.reveal?.($.target),C=Bx(await R.receive(U,$.mode,re))}catch(_){C=Oo(`Not loaded: ${_.message||"it went wrong"}.`)}finally{a.delete($.target)}}L===p&&(r.set($.id,C),E())},A=()=>{p++,f?.abort(),f=null,y!==null&&l(y),y=null,c="",r.clear(),w("off")};return{host($){return{pickerTarget(L){return t.set($,L),E(),{changed:E,remove(){t.get($)===L&&t.delete($),E()}}}}},start($){const L=ws($);L&&(A(),c=L,w("connecting"),S(++p))},stop:A,seen($){n.set($,o()),t.has($)&&E()},changed:E,forget($){t.delete($),n.delete($),E()},targets:h,get status(){return u}}}const Vx=300,Hx=120*1e3;function Ux(e){return Object.prototype.toString.call(e)==="[object Float32Array]"}function Gx(e){const t=e&&typeof e=="object"?e:null;if(!t)return{ok:!1,message:"No audio."};const n=typeof t.name=="string"?t.name.trim().slice(0,64):"";if(!n)return{ok:!1,message:"The audio has no name."};const a=t.sampleRate;if(typeof a!="number"||!Number.isFinite(a)||a<8e3||a>192e3)return{ok:!1,message:"The sample rate is out of range (8–192 kHz)."};const r=t.channels;if(!Array.isArray(r)||r.length<1||r.length>2)return{ok:!1,message:"The audio needs one or two channels."};if(!r.every(Ux))return{ok:!1,message:"Channels must be 32-bit float arrays."};const o=r[0].length;if(o===0)return{ok:!1,message:"The audio is empty."};if(r.some(d=>d.length!==o))return{ok:!1,message:"The channels differ in length."};if(o>Vx*a)return{ok:!1,message:"The audio is longer than five minutes."};const s=typeof t.bars=="number"&&Number.isInteger(t.bars)&&t.bars>=1&&t.bars<=256?t.bars:void 0,l=typeof t.bpm=="number"&&Number.isFinite(t.bpm)&&t.bpm>=20&&t.bpm<=300?t.bpm:void 0;return{ok:!0,audio:{name:n,sampleRate:a,channels:r.map(d=>new Float32Array(d)),...s===void 0?{}:{bars:s},...l===void 0?{}:{bpm:l}}}}function Zc(e){try{const t=e.targets();return Array.isArray(t)?t.flatMap(n=>{if(!n||typeof n.id!="string"||!n.id)return[];const a=typeof n.name=="string"&&n.name?n.name.slice(0,64):n.id;return[{id:n.id,name:a,...n.filled?{filled:!0}:{}}]}):[]}catch{return[]}}function Wx(e={}){const t=new Map,n=s=>e.live?.(s)??!0,a=s=>e.nameOf?.(s)??s,r=e.answerMs??Hx,o=s=>[...t.entries()].filter(([l])=>l!==s&&n(l)).map(([l,d])=>{const u=e.brandOf?.(l);return{instance:l,name:a(l),...u?{brand:u}:{},label:typeof d.label=="string"&&d.label?d.label.slice(0,24):"Target",targets:Zc(d)}});return{forget(s){t.delete(s)},host(s){return{audioReceivers:()=>o(s),async sendAudio(l,d,u){const c=t.get(l);if(l===s||!c||!n(l))return{ok:!1,reason:"gone",message:"That instrument isn't in the Studio."};if(typeof u!="string"||!Zc(c).some(m=>m.id===u))return{ok:!1,reason:"invalid",message:`No ${u} there.`};const p=Gx(d);if(!p.ok)return{ok:!1,reason:"invalid",message:p.message};const f={...p.audio,from:s,fromName:e.brandOf?.(s)??a(s)};let y;try{const m=await Promise.race([Promise.resolve(c.receive(f,u)),new Promise(w=>{y=setTimeout(()=>w({ok:!1,reason:"timeout",message:"No answer."}),r)})]);return!m||typeof m!="object"||typeof m.ok!="boolean"?{ok:!1,reason:"error",message:"The instrument didn't answer."}:m}catch(m){return{ok:!1,reason:"error",message:m instanceof Error?m.message:String(m)}}finally{clearTimeout(y)}},onAudio(l){return t.set(s,l),()=>{t.get(s)===l&&t.delete(s)}},reveal(){n(s)&&e.reveal?.(s)}}}}}const Kx="/studio/assets/silence-processor-BBLKD9j-.js",Kn=1,_o=1024,th=[1,10,100],Yx=32,nh=128,Xx=400,ga=e=>typeof e=="object"&&e!==null,ht=e=>typeof e=="number"&&Number.isFinite(e),Jx=(e,t=nh)=>typeof e=="string"&&e.length>0&&e.length<=t,Qx=e=>e<0?0:e>1?1:e,Zx=["live","quiet","offline","off"],ek=["removed","hold"],tk=/^[A-Z0-9?*-]{0,8}$/i;function ed(e){if(!ga(e))return null;const{net:t,sta:n,loc:a,cha:r,name:o,rate:s}=e;return typeof t!="string"||typeof n!="string"||typeof a!="string"||typeof r!="string"||![t,n,a,r].every(l=>tk.test(l))||!t||!n||typeof o!="string"||o.length>nh||!ht(s)||s<0||s>1e4?null:{net:t,sta:n,loc:a,cha:r,name:o,rate:s}}function nk(e){const t=e?.length;if(!(e instanceof Float32Array)&&!Array.isArray(e)&&!ArrayBuffer.isView(e)||t!==_o)return null;const n=new Float32Array(_o),a=e;for(let r=0;r<_o;r++){const o=Number(a[r]);if(!Number.isFinite(o))return null;n[r]=o<-1?-1:o>1?1:o}return n}function ak(e){if(!ga(e))return null;const t=e.v;if(typeof t!="number"||Math.floor(t)!==Kn||!Jx(e.source))return null;const n=e.source;switch(e.kind){case"energy":{if(!Array.isArray(e.frames))return null;const a=[];for(const r of e.frames.slice(0,Yx)){if(!ga(r)||!ht(r.at)||!ht(r.value))return null;a.push({at:r.at,value:Qx(r.value)})}return{v:Kn,kind:"energy",source:n,frames:a}}case"table":{if(!ht(e.seq)||e.seq<0||!ht(e.at)||!ht(e.rms)||e.rms<0||!th.includes(e.speed))return null;const a=nk(e.samples);if(!a)return null;const r=e.station===null?null:ed(e.station);if(e.station!==null&&!r)return null;const o=e.behindSec===null?null:ht(e.behindSec)?e.behindSec:void 0;return o===void 0?null:{v:Kn,kind:"table",source:n,seq:Math.floor(e.seq),at:e.at,speed:e.speed,station:r,behindSec:o,samples:a,rms:Math.min(1,e.rms)}}case"status":{if(!Zx.includes(e.state))return null;const a=e.station===null?null:ed(e.station);if(e.station!==null&&!a)return null;const r=d=>d===null?null:ht(d)?d:void 0,o=r(e.newestAgeSec),s=r(e.behindSec);if(o===void 0||s===void 0||typeof e.hold!="boolean"||typeof e.credit!="string"||e.credit.length>Xx)return null;const l={v:Kn,kind:"status",source:n,state:e.state,station:a,newestAgeSec:o,behindSec:s,hold:e.hold,credit:e.credit};return ht(e.retryAt)&&(l.retryAt=e.retryAt),e.recorded===!0&&(l.recorded=!0),l}case"off":return ek.includes(e.reason)?{v:Kn,kind:"off",source:n,reason:e.reason}:null;default:return null}}function rk(e){if(!ga(e))return null;const t={};return e.energy===!0&&(t.energy=!0),ga(e.table)&&th.includes(e.table.speed)&&(t.table={speed:e.table.speed}),t.energy||t.table?t:null}function ok(e={}){const t=new Map,n=new Map,a=new Set,r=new Set,o={sent:{energy:0,table:0,status:0,off:0},errors:0},s=m=>e.name?.(m)??m,l=m=>{for(const w of[...m])try{w()}catch{}},d=()=>{l(a);for(const m of t.values())l(m.demandListeners)},u=(m,w)=>{try{m.receiver(w),o.sent[w.kind]++}catch{o.errors++}},c=(m,w)=>w.kind==="energy"?!!m.wants.energy:w.kind==="table"?m.wants.table?.speed===w.speed:!0,p=m=>{for(const w of t.values()){w.status&&u(m,w.status),w.energy&&m.wants.energy&&u(m,w.energy);const h=m.wants.table&&w.tables.get(m.wants.table.speed);h&&u(m,h)}},f=()=>{const m=new Set;let w=!1;const h=[];for(const[v,k]of n)k.wants.energy&&(w=!0),k.wants.table&&m.add(k.wants.table.speed),h.push(s(v));return{energy:w,speeds:[...m].sort((v,k)=>v-k),receivers:n.size,names:h}};function y(m,w){const h=t.get(m),v=h??{id:m,name:w,status:null,energy:null,tables:new Map,demandListeners:new Set};return v.name=w,t.set(m,v),h||l(r),{id:m,name:w,send(k){const b=ak(k);if(!(!b||b.source!==m||t.get(m)!==v)){if(b.kind==="status"){const S=JSON.stringify(v.status);v.status=b,JSON.stringify(b)!==S&&l(a)}else b.kind==="energy"?v.energy=b:b.kind==="table"?v.tables.set(b.speed,b):b.kind==="off"&&b.reason==="removed"&&(v.energy=null);for(const S of n.values())c(S,b)&&u(S,b)}},demand:f,onDemand(k){return typeof k!="function"?()=>{}:(v.demandListeners.add(k),()=>v.demandListeners.delete(k))},remove(){if(t.get(m)!==v)return;t.delete(m);const k={v:1,kind:"off",source:m,reason:"removed"};for(const b of n.values())u(b,k);l(r),l(a)}}}return{host(m){return{situationIn(w,h){const v=rk(h);if(typeof w!="function"||!v)return n.delete(m)&&d(),()=>{};const k={receiver:w,wants:v};return n.set(m,k),d(),p(k),()=>{n.get(m)===k&&(n.delete(m),d())}},situationSource:w=>y(m,typeof w=="string"?w.slice(0,64):m),situationSources:()=>[...t.values()].map(w=>({id:w.id,name:w.name})),onSituationSources(w){return typeof w!="function"?()=>{}:(r.add(w),()=>r.delete(w))}}},statuses:()=>[...t.values()].flatMap(m=>m.status?[{source:m.id,name:m.name,status:m.status}]:[]),wants:m=>n.get(m)?.wants??null,drop(m){const w=t.get(m);if(w){t.delete(m);const h={v:1,kind:"off",source:m,reason:"removed"};for(const v of n.values())u(v,h);l(r)}(n.delete(m)||w)&&d()},onChange(m){return a.add(m),()=>a.delete(m)},stats:o}}function ik(e,t=os){const n=t.find(o=>o.id===e.type),a=(n?.name??e.type).toUpperCase(),r=String(e.n).padStart(2,"0");return{brand:n?.brand??a,rest:e.custom&&e.name?` / ${e.name.toUpperCase()}`:` / ${a} / ${r}`,...n?.identity?{identity:n.identity}:{}}}const sk=["Space","Backspace"];function lk(){const e=new Map,t=n=>{const a=e.get(n);return a?.length?a[a.length-1]??null:null};return{claim(n,a,r){if(typeof n!="string"||!n||typeof r!="function")return()=>{};const o={owner:n,handler:r},s=[...new Set(a)].filter(l=>sk.includes(l));for(const l of s){const d=e.get(l)??[];d.push(o),e.set(l,d)}return()=>{for(const l of s){const d=e.get(l);if(!d)continue;const u=d.indexOf(o);u>=0&&d.splice(u,1),d.length||e.delete(l)}}},press(n,a){const r=typeof a?.code=="string"?a.code:"",o=t(r);if(!o)return!1;if(a.repeat===!0)return!0;try{return o.handler({code:r,shiftKey:a.shiftKey===!0,from:String(n)})===!0}catch{return!1}},owner:n=>t(n)?.owner??null,drop(n){for(const[a,r]of e){const o=r.filter(s=>s.owner!==n);o.length?e.set(a,o):e.delete(a)}}}}const Ai=pg,mt=ug,jo={system:"System",light:"Light",dark:"Dark"};function ck(e){try{return Bi(e?.getItem(Ai))}catch{return"system"}}function dk(e,t){try{t==="system"?e?.removeItem(Ai):e?.setItem(Ai,t)}catch{}}const uk=e=>mt[(mt.indexOf(e)+1)%mt.length]??"system";function pk(e){try{return e.contentDocument?.documentElement?e.contentDocument:null}catch{return null}}function ah(e,t){const n=pk(e);n&&_i(t,n)}function hk(e,t){const n=document.createElement("div");n.className="theme",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Theme"),n.dataset.theme="";let a=e;const r=mt.map(s=>{const l=document.createElement("button");l.type="button",l.className="ghost theme-choice",l.setAttribute("role","radio"),l.dataset.themeChoice=s;const d=document.createElement("span");return d.className="theme-word",d.textContent=jo[s],l.append(d),l.setAttribute("aria-label",`${jo[s]} theme`),l.title=s==="system"?"Follow this computer's light or dark setting":`${jo[s]} theme`,l.addEventListener("click",()=>{const u=n.closest(".nc-page-menu[data-nc-open]")!==null,c=s===a&&!u?uk(s):s;o(c),t(c),r[mt.indexOf(c)]?.focus({preventScroll:!0})}),l});n.append(...r);function o(s){a=s;for(const l of r){const d=l.dataset.themeChoice===s;l.setAttribute("aria-checked",d?"true":"false"),l.tabIndex=d?0:-1}}return o(e),n.addEventListener("keydown",s=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(s.key))return;s.preventDefault();const l=s.key==="ArrowLeft"||s.key==="ArrowUp"?-1:1,d=(mt.indexOf(a)+l+mt.length)%mt.length,u=mt[d]??"system";o(u),t(u),r[d]?.focus()}),{el:n,get choice(){return a},set:o}}function fk(e,t){const n=e.addModule.bind(e),a=new Map;return Object.defineProperty(e,"addModule",{value:(o,s)=>{const l=new URL(String(o),t).href;let d=a.get(l);return d||(d=n(o,s),a.set(l,d),d.catch(()=>{a.get(l)===d&&a.delete(l)})),d},configurable:!0}),e}const Yn=Px(we(),vs(),location.search);{const e=Ix(location.href);if(e)try{history.replaceState(history.state,"",e)}catch{}}const rh=ys(we());let jt=!1;const Z=new AudioContext({latencyHint:"interactive"});fk(Z.audioWorklet,location.href);const xs=X1(we()),mk=new URLSearchParams(location.search).has("plugins"),gk=mk,ca=Qv({ctx:Z,moduleUrl:na,base:location.href,remote:gk,store:$v(),frozen:xs});function td(e,t){ca?.restore(e.getChain().flatMap(r=>r.plugin?[r.plugin]:[])),ks.add(e);let n=e.getChain().length;const a=new Set;return e.onChange(r=>{if(r.key==="error"||r.key==="plugin"){wt?.render();for(const s of K1(a,e.getChain()))Ft({message:B.stuck(s.plugin?.name??s.name,t()),duration:12e3,anchor:document.querySelector("[data-nc-area='fx']")}).el.dataset.pluginStuck=s.plugin?.id??s.id}const o=e.getChain().length;o!==n&&(n=o,queueMicrotask(()=>wt?.render()))}),e}function bk(e){return ce.list().find(t=>t.id===e)?.name??e}const ks=new Set,De=qv(),Cn={},yk=Rp,Wr=new Map,ce=new Uw(Z,{restore:e=>De.channels[e],fx:e=>{const t=uo(Z,{moduleUrl:na,bpm:120,state:lp(e,De)});return Cn[e]=t,t},masterFx:()=>{const e=uo(Z,{moduleUrl:na,bpm:120,slots:mi,state:_y(De,mi)});return e.onChange(va),td(e,()=>"Master")},channelFx:e=>{Nr.delete(e);const t=uo(Z,{moduleUrl:na,bpm:q.bpm(),slots:yk,state:De.channelFx[e]??{v:2,chain:[]}}),n=zd(t,q.clock,{mapper:st}),a=t.dispose.bind(t);return t.dispose=()=>{n(),a()},t.onChange(va),Wr.set(e,t),t.dispose=(r=>()=>{ks.delete(t),r()})(t.dispose),td(t,()=>bk(e))}});ce.setMaster(De.master);ce.setReturn("a",De.returns.a);ce.setReturn("b",De.returns.b);let oh=()=>!1;const st=new vf(Z,{hold:()=>oh()});st.start();const ih=rx();let sh=()=>{};const lh=sv(Z.sampleRate),Kr=Hy(Z,{nodeFor:e=>ce.tapNode(e),latencyFor:e=>ce.tapLatency(e,lh.get()),sources:()=>[{id:"master",name:"Master"},...ce.list().map(e=>({id:e.id,name:e.name}))],ready:new Promise(e=>{sh=e})}),ze=G1(),kn=Sy(()=>{try{return globalThis.sessionStorage??null}catch{return null}}),xt=e=>j.some(t=>t.id===e),ch=e=>j.find(t=>t.id===e)?.name??e,dh=e=>{const t=j.find(a=>a.id===e),n=xe.find(a=>a.id===t?.type)?.brand;return t&&n?t.n===1?n:`${n} ${t.n}`:void 0},Dn=e=>{it(e),document.getElementById(`tab-${e}`)?.scrollIntoView({block:"nearest"}),Ye.get(e)?.contentWindow?.focus()},uh=Wx({live:xt,nameOf:ch,brandOf:dh,reveal:Dn}),We=qx({fetch:(e,t)=>fetch(e,t),studio:`studio-${Math.random().toString(36).slice(2,10)}`,label:()=>tn.value.trim()||"Studio",live:xt,nameOf:ch,brandOf:dh,shown:()=>qe,reveal:Dn,onStatus:e=>{if(Fr(e),e==="on"){const t=Mr(me());t.on&&!t.ok&&Tr(me(),{...t,ok:!0})}}});let ph=!1;const $s=Dy(),Ss=Py({now:()=>Z.currentTime,labelOf:e=>{const t=j.find(a=>a.id===e),n=xe.find(a=>a.id===t?.type)?.brand??t?.name??e;return t&&t.n>1?`${n} ${t.n}`:n},clearOf:()=>[Ls,ot,Ns]}),Yr=lk(),Xr=ex({blocked:()=>!Ss.el.hidden,clearOf:()=>[Ls,ot,Ns]}),Es=Mv({ctx:Z,transport:()=>q.clock.transport,toContextTime:e=>st.toContextTime(e),now:Be,ticker:e=>fd(e,{intervalMs:20})}),Bt=j1({nowBeat:()=>{const e=q.clock.transport;return e.running?e.beatAt(Be()):null},startAudio:()=>Z.state==="running"?void 0:Fn()}),Mi=new Set,Jr=()=>{for(const e of[...Mi])try{e()}catch{}};Bt.onChange(()=>{Jr(),vk()});const Sa=ok({name:e=>j.find(t=>t.id===e)?.name??e});Sa.onChange(()=>xk());window.ncStudio=My(Z,ce,{notes:Bt,situation:Sa,clock:()=>q.clock,targets:{list:()=>j.filter(e=>xe.find(t=>t.id===e.type)?.noteTarget!==!1).map(e=>({instance:e.id,name:e.name,type:e.type,n:e.n,takesNotes:Bt.listening(e.id),takesPitch:Bt.takesPitch(e.id)})),listen(e){return Mi.add(e),()=>Mi.delete(e)}},show:e=>{xt(e)&&Dn(e)},countIn:Ss.api,keys:Yr,metronome:Es,readout:Xr.api,studioTransport:{play:()=>{(!q.running()||ze.owner()!==Vr)&&yt.click()},playOnly:e=>{Fn(),!q.running()&&(ze.claim(e),q.play(),Ne())},stop:()=>{q.running()&&q.stop(),Ne()},running:()=>q.running(),bpm:()=>q.bpm()},chip:(e,t)=>Ms(e,t),holdFirstPlay:e=>{const t=$s.hold(),n=ke.hold(e);return()=>{t(),n()}},attached:e=>ke.attached(e),presets:kn,share:uh,picker:We,legacyCopy:()=>!Lx(me()),generation:()=>rh,grab:Kr,play:ze,mapper:Uy(st),resolve:(e,t)=>Ek(e,t),syncScope:ih,fxWorklet:new URL(na,location.href).href});const q=ix(()=>Z.state,ax(ih),()=>ph&&Z.state==="running"&&st.ready&&$s.count===0&&ke.settled()?null:Lk());oh=()=>q.clock.transport.isPlayingAt(Be());function me(){try{return globalThis.localStorage??null}catch{return null}}q.setTempo(hx(me()));const Me=new Zy(Z,()=>ce.tapNode("master"));let Zt=null,hh=!0;const Pe=new nv(Z,()=>ce.tapNode("master"),ev(me()));let fh=null;function F(e,t={},...n){const a=document.createElement(e);for(const[r,o]of Object.entries(t))o===void 0||o===!1||a.setAttribute(r,o===!0?"":String(o));return a.append(...n),a}const yt=F("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),Nn=F("input",{type:"number",class:"bpm",min:bt[0],max:bt[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),Lr=F("output",{class:"position","aria-label":"Bar and beat"},"—"),Rt=F("button",{type:"button",class:"btn rec","aria-pressed":"false","data-state":"idle","data-nc-help":ne["transport:rec"]},"Rec"),on=F("button",{type:"button",class:"btn keep","aria-haspopup":"menu","aria-expanded":"false","aria-controls":"keep-menu","aria-keyshortcuts":"K","data-nc-help":ne["transport:keep"]},"Keep"),mh=F("div",{class:"keep-held","data-nc-help":ne["keep:held"]}),As=[...Gy.map(e=>({choice:()=>({last:e}),label:`Keep last ${e/60} min`,key:String(e)})),{choice:e=>({since:e}),label:"Keep since Play",key:"since"}],Ea=As.map(e=>F("button",{type:"button",role:"menuitem",class:"keep-item","data-keep":e.key},e.label)),ba=ji({checked:Pe.keeping,labelledBy:"keep-switch-label",onChange:e=>{tv(me(),e),Pe.setKeeping(e),_e(e?"Keeping: on":"Keeping: off (nothing held)")}}),rt=F("div",{class:"keep-menu",id:"keep-menu",role:"menu","aria-label":"Keep",hidden:!0},mh,...Ea,F("div",{class:"keep-switch","data-nc-help":ne["keep:switch"]},F("span",{id:"keep-switch-label"},"Keeping"),ba.el)),gh=F("div",{class:"keep-wrap"},on,rt),Qn=F("a",{class:"take",hidden:!0}),en=F("button",{type:"button",class:"notes-chip",hidden:!0});en.addEventListener("click",()=>{const e=en.dataset.source;e&&xt(e)&&Dn(e)});function vk(){const e=Bt.statuses().filter(o=>xt(o.source));en.hidden=e.length===0;const t=e[0];if(!t)return;en.dataset.source=t.source;const{now:n,next:a}=t.status,r=`${n}${a&&a!==n?` → ${a}`:""}`;en.replaceChildren(F("span",{class:"notes-chip-dot","aria-hidden":"true"}),F("span",{class:"notes-chip-name"},t.name),F("span",{class:"notes-chip-chord"},r),...e.length>1?[F("span",{class:"notes-chip-count",title:`${e.length} CALLIOPEs playing`},String(e.length))]:[]),en.setAttribute("aria-label",`${t.name} plays ${r}. Show it.`)}const Ti=new Map,Nt=F("button",{type:"button",class:"notes-chip module-chip",hidden:!0});Nt.addEventListener("click",()=>{const e=Nt.dataset.source;e&&xt(e)&&Dn(e)});function wk(){const e=[...Ti].filter(([o])=>xt(o)),[t,n]=e[0]??[];if(Nt.hidden=!t||!n,!t||!n)return;Nt.dataset.source=t;const a=j.find(o=>o.id===t),r=xe.find(o=>o.id===a?.type)?.brand??t;Nt.toggleAttribute("data-recording",n.recording),Nt.replaceChildren(F("span",{class:"notes-chip-dot module-chip-dot","aria-hidden":"true"}),F("span",{class:"notes-chip-name"},r),F("span",{class:"notes-chip-chord"},n.text)),Nt.setAttribute("aria-label",`${r}: ${n.text}. Show it.`)}function Ms(e,t){const n=typeof t?.text=="string"?t.text.replace(/\s+/g," ").trim().slice(0,48):"";n?Ti.set(e,{text:n,recording:t?.recording===!0}):Ti.delete(e),wk()}const It=F("button",{type:"button",class:"notes-chip situation-chip",hidden:!0});It.addEventListener("click",()=>{const e=It.dataset.source;e&&xt(e)&&Dn(e)});function xk(){const e=Sa.statuses().find(r=>xt(r.source)&&r.status.state!=="off");if(It.hidden=!e,!e)return;const t=e.status;It.dataset.source=e.source,It.dataset.state=t.state;const n=t.station?`${t.station.net}.${t.station.sta}`:"",a=t.hold?`${n} · held`:t.recorded&&t.state!=="live"?"recording · offline":t.state==="live"&&t.behindSec!==null?`${n} · ${Math.round(t.behindSec)} s behind`:`${n} · ${t.state}`;It.replaceChildren(F("span",{class:"notes-chip-dot situation-chip-dot","aria-hidden":"true"}),F("span",{class:"notes-chip-name"},e.name),F("span",{class:"notes-chip-chord"},a)),It.setAttribute("aria-label",`${e.name}: ${a}. Show it.`)}const Yt=F("span",{class:"status",role:"status"}),tn=F("input",{type:"text",class:"scene-name",maxlength:60,value:fx(me()),"aria-label":"Scene name",title:"Scene name (used when you Save)"}),bh=F("button",{type:"button",class:"ghost","data-scene":"save",title:"Save this Scene as a file"},"Save"),yh=F("button",{type:"button",class:"ghost","data-scene":"load",title:"Load a Scene file"},"Load"),vh=F("button",{type:"button",class:"ghost","data-scene":"new",title:"Start a new Scene"},"New"),da=F("input",{type:"file",accept:".json,application/json",hidden:!0}),et=F("button",{type:"button",class:"ghost picker-link","data-picker":"off","aria-pressed":"false"},F("span",{class:"picker-dot","aria-hidden":"true"}),F("span",{class:"picker-label"},"Picker")),Ts=hk(ck(me()),e=>{dk(me(),e),_i(e);for(const t of Ye.values())ah(t,e)});_i(Ts.choice);const Ls=F("h1",{class:"brand","aria-label":"NetComposer Studio"},F("span",{"aria-hidden":"true"},"NetComposer",F("span",{class:"brand-sep"}," / "),"Studio")),Li=F("span",{class:"beat-light","aria-hidden":"true"}),Xt=F("span",{class:"status-long"}),Jt=F("span",{class:"status-short"});Yt.append(Xt,Jt);const ot=F("header",{class:"top"},F("div",{class:"transport"},yt,F("label",{class:"tempo"},Nn,F("span",{class:"tempo-unit"},"BPM")),Li,Lr),F("div",{class:"record-col"},F("div",{class:"record"},Rt,gh,Qn),en,It,Nt),Yt),wh=gv();bv(ot.querySelector(".transport"),wh);const Cs=F("div",{class:"scene-actions"},tn,bh,yh,vh,et,Ts.el),xh=F("button",{type:"button",class:"ghost menu-reset","data-reset":"menu"},"Reset Studio…");xh.addEventListener("click",()=>void Oh(Cr.button));Cs.append(xh);const Cr=G0({panel:Cs}),Ci=F("button",{type:"button",class:"foot-reset","data-reset":"foot"},"Reset Studio…");Ci.addEventListener("click",()=>void Oh(Ci));const kk=F("footer",{class:"studio-foot"},Ci),Ns=F("div",{class:"scene",role:"group","aria-label":"Scene"},Cs,da,Cr.button);Me.supported||(Rt.disabled=!0,Rt.title="This browser can't record audio",on.disabled=!0);const zn=F("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),Qr=F("div",{class:"stage"}),Aa=F("label",{class:"tab tab-add",title:"Add an instrument"},F("span",{"aria-hidden":"true"},"+")),$n=F("select",{class:"tab-add-select","aria-label":"Add an instrument"});$n.append(F("option",{value:""},"Add an instrument"),...os.map(e=>{const t=F("option",{value:e.id},e.available===!1?`${e.name} (soon)`:e.name);return t.disabled=e.available===!1,t}));$n.addEventListener("change",()=>{const e=$n.value;$n.value="",e&&Nh(e)});Aa.append($n);zn.append(Aa);q0();const ya=F("div",{class:"spine","aria-hidden":"true"}),Ye=new Map;let j=sy(iy(xe),xe),qe=j[0]?.id??"";const kh=new URLSearchParams(location.search).has("measure"),nd=new Map,Is=dy((e,t)=>fetch(e,t));for(const e of j)Is(e.src);const $k=2e4,ke=gy(j.map(e=>{const t=xe.find(a=>a.id===e.type),n=t?.brand??e.name;return{id:e.id,brand:e.n>1?`${n} ${e.n}`:n,name:t?.name??e.name}})),$h=new Set,ua=new Map;for(const e of j){let t=()=>{};const n=new Promise(a=>{t=a});ua.set(e.id,{go:t,turn:n})}function Sh(e){const t=F("button",{type:"button",role:"tab",id:`tab-${e.id}`,"aria-controls":`panel-${e.id}`,class:"tab"},e.name);Fh(t,e),t.addEventListener("click",()=>it(e.id)),zn.insertBefore(t,Aa);const n=nd.get(e.type)??Promise.resolve(),a=Is(e.src),r=Promise.all([n,a,ua.get(e.id)?.turn]).then(([,o])=>new Promise(s=>{if(!j.some(u=>u.id===e.id))return s();const l=F("iframe",{id:`panel-${e.id}`,role:"tabpanel","aria-labelledby":`tab-${e.id}`,title:e.name,src:Zu(e,kh,o),allow:"autoplay; clipboard-read; clipboard-write; microphone"});Ye.set(e.id,l),ke.requested(e.id),window.setTimeout(()=>ke.fail(e.id),py),l.addEventListener("load",()=>{$h.add(e.id),ke.loaded(e.id),to()},{once:!0});const d=window.setTimeout(s,$k);l.addEventListener("load",()=>Sk(l)),l.addEventListener("load",()=>{window.clearTimeout(d),s()},{once:!0}),Qr.append(l),it(qe)}));return nd.set(e.type,r),r}const Eh=window.matchMedia(Ud);function Ah(e){try{e.contentDocument?.documentElement.toggleAttribute("data-nc-landscape",Eh.matches)}catch{}}Eh.addEventListener("change",()=>{for(const e of Ye.values())Ah(e)});function Sk(e){let t=null;try{t=e.contentDocument}catch{return}if(!t?.documentElement)return;t.documentElement.dataset.ncHosted="",ah(e,Ts.choice),Ah(e);const n=e.id.replace(/^panel-/,""),a=()=>{const o=t?.querySelector(".nc-page"),s=o?o.getBoundingClientRect().height:t?.documentElement.scrollHeight??0;s>0&&(e.style.height=`${Math.ceil(s)}px`);const l=t?.querySelector(".nc-page-hd, .nc-title-band");l&&(Th.set(n,Math.round(l.getBoundingClientRect().bottom)),n===qe&&Lh())};a();const r=t.querySelector(".nc-page")??t.body;r&&new ResizeObserver(()=>{a(),Zr()}).observe(r),Fs.add(e),Mh(e)}const Fs=new Set;function Mh(e){let t;try{t=e.contentDocument?.documentElement}catch{return}if(!t||!e.isConnected){Fs.delete(e);return}const n=e.getBoundingClientRect();if(n.height<=0)return;const a=getComputedStyle(ot).position==="sticky"?ot.getBoundingClientRect().bottom:0,r=Math.min(n.height,Math.max(0,a-n.top)),o=Math.max(r,Math.min(n.height,window.innerHeight-n.top));t.style.setProperty("--nc-host-top",`${Math.round(r)}px`),t.style.setProperty("--nc-host-height",`${Math.round(o-r)}px`),t.style.setProperty("--nc-host-bottom",`${Math.round(n.height-o)}px`)}let qo=!1;function Zr(){qo||(qo=!0,requestAnimationFrame(()=>{qo=!1;for(const e of Fs)Mh(e)}))}window.addEventListener("scroll",Zr,{passive:!0});window.addEventListener("resize",Zr);const Th=new Map;function Lh(){const e=Th.get(qe);e===void 0?ya.style.removeProperty("--spine-top"):ya.style.setProperty("--spine-top",`${e}px`)}function Ch(e){if(!e){ya.replaceChildren();return}const t=ik(e),n=F("span",{class:"spine-brand"},t.brand);t.identity&&(n.style.color=`var(--nc-ui-${t.identity})`),ya.replaceChildren(F("span",{class:"spine-text"},n,F("span",{class:"spine-rest"},t.rest)))}function it(e){qe=e,to(),We.seen(e),Ch(j.find(t=>t.id===e)),Lh(),Zr();for(const t of j){const n=t.id===e;Ye.get(t.id)?.classList.toggle("shown",n);const a=document.getElementById(`tab-${t.id}`);a?.setAttribute("aria-selected",String(n)),a?.setAttribute("tabindex",n?"0":"-1")}}const Ek=uy(()=>j.map(e=>({instance:e,window:()=>Ye.get(e.id)?.contentWindow,readyState:()=>{try{return Ye.get(e.id)?.contentDocument?.readyState}catch{return}}})),xe);function Nh(e){jh();const t=xe.find(o=>o.id===e);if(!t)return;const n=t.single?j.find(o=>o.type===t.id):void 0;if(n){it(n.id);return}const a=ry(j,t),r=j.map(o=>o.type).lastIndexOf(a.type);j=r<0?[...j,a]:[...j.slice(0,r+1),a,...j.slice(r+1)],jt||Rn(j),Sh(a),Jr();for(const o of j){const s=document.getElementById(`tab-${o.id}`);s&&zn.insertBefore(s,Aa)}it(a.id),wt?.render()}function Ak(e,t){const n=j.find(l=>l.id===e);if(!n)return;const a=j.filter(l=>l.id!==e),r=l=>xe.find(d=>d.id===l.type)?.sound===!1,o=a.reduce((l,d,u)=>r(d)?l:u,-1),s=t===null?r(n)?a.length:o+1:a.findIndex(l=>l.id===t);j=[...a.slice(0,s<0?a.length:s),n,...a.slice(s<0?a.length:s)],jt||Rn(j);for(const l of j){const d=document.getElementById(`tab-${l.id}`);d&&zn.insertBefore(d,Aa)}wt?.render()}function Mk(e,t){j=ay(j,e,t,xe),jt||Rn(j);const n=j.find(r=>r.id===e);if(!n)return;const a=document.getElementById(`tab-${e}`);a&&Fh(a,n),Ye.get(e)?.setAttribute("title",n.name),Jr(),qe===e&&Ch(n),ce.rename(e,n.name)}async function Ih(e,t){const n=j.find(d=>d.id===e),a=n?.name??e,r=xe.find(d=>d.id===n?.type)?.sound===!1;if(!await tt({title:`Remove ${a}?`,body:r?"Its tab goes, and what it plays stops. Its settings stay in this browser.":`Its channel, strip and mix settings go. ${a}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:t}))return;jh(),j=j.filter(d=>d.id!==e),jt||Rn(j),uh.forget(e),We.forget(e),Bt.drop(e),Sa.drop(e),Yr.drop(e),Es.want(e,!1),Xr.api.set(e,null),Ms(e,null);const s=ze.playing().includes(e);ze.drop(e),s&&ze.out(e);const l=Ye.get(e);Ye.delete(e),ke.remove(e),l?.setAttribute("src","about:blank"),l?.remove(),document.getElementById(`tab-${e}`)?.remove(),ce.detach(e),Tk(e),ow(we(),e),qe===e&&it(j[0]?.id??""),Jr()}function Fh(e,t){const n=xe.find(s=>s.id===t.type);if(n?.sound!==!1){e.textContent=t.name;return}const a=F("span",{class:"tab-dot","aria-hidden":"true"});n.identity&&(a.style.background=`var(--nc-ui-${n.identity})`);const r=F("span",{class:"tab-remove",role:"button",tabindex:"0","aria-label":`Remove ${t.name}`,title:`Remove ${t.name}`});r.textContent="×";const o=s=>{s.stopPropagation(),Ih(t.id,e)};r.addEventListener("click",o),r.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&o(s)}),e.replaceChildren(a,F("span",{},t.name),r)}const Ni=F("div",{class:"mix"});Ni.addEventListener("click",e=>{const n=e.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==qe&&j.some(a=>a.id===n)&&it(n)});let wt=null,In=0;const Nr=new Set;function Tk(e){Nr.add(e),delete De.channels[e],delete De.channelFx[e],Wr.delete(e),va()}let Ma=!1;function va(){window.clearTimeout(In),!Ma&&(In=window.setTimeout(()=>{Sp(Ph())},300))}function Ph(){const e={...De.channels};for(const r of ce.list())e[r.id]=r.strip;for(const r of Nr)delete e[r];const t={};for(const r of["a","b"]){const o=Cn[r];o&&(t[r]=o.getState())}const n=ce.masterFx?.getState()??null,a={...De.channelFx};for(const[r,o]of Wr)a[r]=o.getState();for(const r of Nr)delete a[r];return{v:1,channels:e,master:ce.masterPositionValue,returns:{a:{on:ce.returns.a.on,level:ce.returns.a.level},b:{on:ce.returns.b.on,level:ce.returns.b.level}},insert:{on:n?jy(n):De.insert.on},fx:t,channelFx:a,masterFx:n??De.masterFx}}ce.onChange(()=>{wt?.render(),va()});for(const e of Object.values(Cn))e?.onChange(va);async function Fn(){Z.state!=="running"&&await Z.resume()}const ad=1500;async function Lk(){ke.settled()||(Fn(),await ke.whenSettled());const e=performance.now()+ad;await Promise.race([Fn(),new Promise(t=>setTimeout(t,ad))]),await st.whenSettled(Math.max(0,e-performance.now())),await Promise.race([$s.idle(),new Promise(t=>setTimeout(t,Math.max(0,e-performance.now())))])}yt.addEventListener("click",()=>{Fn(),q.running()&&ze.owner()===Vr?q.stop():q.running()?ze.claimAll():(ze.claimAll(),q.play()),Ne()});function Rh(){const e=Number(Nn.value);q.setTempo(e),jt||Xp(q.bpm(),me())}tn.addEventListener("change",()=>{tn.value=sn(tn.value),jt||Jp(tn.value,me())});function Ck(e,t,n){const a=URL.createObjectURL(new Blob([t],{type:n})),r=F("a",{href:a,download:e});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e4)}bh.addEventListener("click",()=>void Dh());async function Dh(){const e=sn(tn.value),t=j.map(o=>o.id),n=await kn.collect(t),a=dx({name:e,bpm:q.bpm(),instances:j,mix:Ph(),presets:n});Ck(px(e),`${JSON.stringify(a,null,2)}
`,"application/json");const r=j.filter(o=>!n[o.id]).map(o=>o.name);_e(r.length?`Saved “${e}” (without ${r.join(", ")}: ${r.length===1?"it hasn't":"they haven't"} loaded yet)`:`Saved “${e}”`)}yh.addEventListener("click",()=>da.click());da.addEventListener("change",async()=>{const e=da.files?.[0];if(da.value="",!e)return;const t=ux(await e.text(),xe.filter(r=>r.available!==!1).map(r=>r.id));if(!t.ok){_e(t.error);return}const n=t.scene;await tt({title:`Load “${n.name}”?`,body:"The music stops and the Studio reloads with this Scene's instruments, their sounds and patterns, the mix and the tempo. Save the current Scene first to keep it.",confirmLabel:"Load"})&&zh({name:n.name,bpm:n.tempo.bpm,instances:n.instances,mix:n.mix,presets:n.presets})});vh.addEventListener("click",async()=>{await tt({title:"Start a new Scene?",body:"The music stops and the Studio reloads with one of each instrument, a fresh mix and 120 BPM. Each instrument keeps its own sound and pattern. Save the current Scene first to keep it.",confirmLabel:"New"})&&zh({name:ms,bpm:Er,instances:ha(xe),mix:fa()})});function zh(e){q.running()&&q.stop(),Ma=!0,window.clearTimeout(In);const t=e.instances.map(({id:n,name:a})=>{const[r,o]=n.split("#"),s=xe.find(l=>l.id===r);return s?Pn(s,o?Number(o):1,a):null}).filter(n=>n!==null);Rn(t),Sp(e.mix),Xp(e.bpm,me()),Jp(e.name,me()),kn.stash({...e.presets??{}}),location.reload()}async function Oh(e){try{Cr.isOpen()&&Cr.close()}catch{}Fe("dialog: opened");const t=["Kept: your samples, LUCY takes and Scene files.","Kept: theme, folds and meters."];Me.state==="recording"?t.push({text:"Rec is recording: its take will be lost.",tone:"danger"}):Zt&&!hh&&t.push({text:`Your last Rec take (${Zt.take.seconds.toFixed(1)} s) isn't saved.`,tone:"danger"});const n=await tt({title:"Reset the Studio?",body:"The music stops and the Studio starts over: one of each instrument at its factory sound and pattern, a fresh mix, 120 BPM. You can undo it for 30 seconds.",lines:t,extra:{label:"Save Scene first",onAction:()=>void Dh()},confirmLabel:"Reset",danger:!0,returnFocus:e});Fe(n?"dialog: Reset":"dialog: Cancel"),n&&_h("reset")}const Bh=[];function Fe(e,t){const n=t?`${e}: ${t instanceof Error?t.message:String(t)}`:e;Bh.push(n),t?console.error(`[reset] ${n}`):console.info(`[reset] ${n}`)}let Sn=null;function _h(e){Fe(`${e}: asked`);let t=null;try{t=Cx(we(),vs(),e)}catch(n){Fe(`${e}: storing the request failed`,n)}if(!t){rd("This browser's storage is blocked: the Studio can't reset");return}Fe(`${e}: request stored`);try{q.running()&&q.stop()}catch(n){Fe(`${e}: stopping the music failed (going on)`,n)}Ma=!0,window.clearTimeout(In);try{Sn=Nx(location.href,e,t),Fe(`${e}: going to ${Sn}`),location.replace(Sn)}catch(n){Fe(`${e}: navigating failed, reloading`,n);try{location.reload()}catch(a){Fe(`${e}: reloading failed`,a)}}window.setTimeout(()=>{Fe(`${e}: still on the page after 5 s`),rd(`The Studio didn't reload: reload to ${e==="reset"?"reset":"undo"}`,()=>location.reload())},5e3)}function rd(e,t){_e(e,od);try{const n=Ft({message:e,duration:od,anchor:ot,...t?{actionLabel:"Reload",onAction:t}:{}});n.el.dataset.resetProblem=""}catch(n){Fe("showing the problem failed",n)}}const od=12e3;addEventListener("pageshow",e=>{!e.persisted||!Sn||(Fe("restored from the page cache: going again"),location.replace(Sn))});addEventListener("storage",e=>{if(!(jt||Sn||e.key!==Ur&&e.key!==null)&&ys(me())!==rh){jt=!0,Ma=!0,window.clearTimeout(In),Fe("another tab reset the Studio: this page saves nothing more"),document.documentElement.dataset.studioStale="";try{const t=Ft({message:"The Studio was reset in another tab",actionLabel:"Reload",duration:Nk,anchor:ot,onAction:()=>location.reload()});t.el.dataset.studioStale=""}catch{_e("The Studio was reset in another tab: reload")}}});const Nk=6e5;let Ii=null;function Ik(){const e=Ft({message:"Studio reset",actionLabel:"Undo",duration:bx,anchor:ot,onAction:()=>_h("undo"),onClose:t=>{Ii=null,t!=="action"&&Gr(we(),vs())}});e.el.dataset.resetUndo="",Ii=e}function jh(){Ii?.close("close")}let id=0,Fi="",Pi=0;function _e(e,t=4e3){Fi=e,Pi=performance.now()+t,Xt.textContent=e,Jt.textContent=e,window.clearTimeout(id),id=window.setTimeout(()=>{Pi=0,Ne()},t)}Nn.addEventListener("change",Rh);Nn.addEventListener("keydown",e=>{e.key==="Enter"&&Rh()});Rt.addEventListener("click",()=>{Fn();const e=Me.state;e==="recording"?Fk():e==="arming"||e==="armed"?(Me.cancel(),_e("Rec cancelled")):e==="idle"&&(Me.arm(q.playing()),qh())});async function Fk(){const e=await Me.stop();e&&(Zt&&URL.revokeObjectURL(Zt.url),Zt={url:URL.createObjectURL(e.blob),take:e},Qn.href=Zt.url,Qn.download=e.name,Qn.textContent=`Save take (${e.seconds.toFixed(1)} s)`,Qn.hidden=!1,hh=!1)}function qh(){const e=Me.state;if(e!=="arming"&&e!=="armed")return;const t=q.clock.transport;if(!t.running||t.startTime===null){Me.schedule(null);return}const n=Math.round(st.toContextTime(t.startTime)*Z.sampleRate);Me.schedule(n+Kr.latency("master"))}function Pk(){const e=Me.state,t=e==="arming"||e==="armed",n=e==="recording"||e==="stopping";Rt.dataset.state=t?"armed":n?"recording":"idle",Rt.setAttribute("aria-pressed",String(n)),Rt.textContent=t?"Armed":n?"Stop rec":"Rec",Rt.disabled=e==="stopping"||!Me.supported,Ne()}Me.onChange(Pk);let wa=null;function Rk(){const e=q.clock.transport;!e.running||e.startTime===null||(wa=Math.round(st.toContextTime(e.startTime)*Z.sampleRate)+Kr.latency("master"))}function Vh(){return!q.clock.transport.running||wa===null?null:{origin:wa,barFrames:240/q.bpm()*Z.sampleRate}}function Hh(e){const t=As[e];return!t||t.key==="since"&&wa===null?null:t.choice(wa??0)}function eo(){const e=!rt.hidden;if(on.setAttribute("aria-expanded",String(e)),on.dataset.keeping=Pe.keeping?"on":"off",!e)return;ba.checked!==Pe.keeping&&ba.set(Pe.keeping);const t=Pe.status,n=dp(t)/(t.sampleRate||Z.sampleRate);mh.textContent=Pe.keeping?`${gi(n)} of sound held`:"Keeping is off";const a=Vh();Ea.forEach((r,o)=>{const s=Hh(o),l=s?Pe.plan(s,a):null;r.disabled=!l;const d=As[o];d?.key==="since"&&(r.textContent=l?`Keep since Play (${gi((l.to-l.from)/(t.sampleRate||Z.sampleRate))})`:d.label)})}Pe.onChange(eo);function Uh(){rt.hidden&&(rt.hidden=!1,Pe.refresh(),eo(),(Ea.find(e=>!e.disabled)??ba.el).focus())}function Ta(e=!1){rt.hidden||(rt.hidden=!0,eo(),e&&on.focus())}on.addEventListener("click",()=>{rt.hidden?Uh():Ta()});document.addEventListener("pointerdown",e=>{!rt.hidden&&!gh.contains(e.target)&&Ta()});rt.addEventListener("keydown",e=>{if(e.key==="Escape"){e.preventDefault(),Ta(!0);return}if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;e.preventDefault();const t=[...Ea.filter(r=>!r.disabled),ba.el],n=t.indexOf(document.activeElement);t[(n+(e.key==="ArrowDown"?1:t.length-1))%t.length]?.focus()});Ea.forEach((e,t)=>e.addEventListener("click",()=>{const n=Hh(t);n&&Dk(n)}));async function Dk(e){Ta(!0);const t=await Pe.keep(e,{grid:Vh(),bpm:q.bpm()});if(!t){_e("Nothing held to keep");return}fh=t;const n=URL.createObjectURL(t.blob);F("a",{href:n,download:t.name}).click(),window.setTimeout(()=>URL.revokeObjectURL(n),6e4),_e(`Kept ${gi(t.seconds)} as a WAV`)}document.addEventListener("keydown",e=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey||e.key!=="k"&&e.key!=="K")return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable)||on.disabled||(e.preventDefault(),rt.hidden?Uh():Ta(!0))});document.addEventListener("keydown",e=>{if(e.code!=="Space"&&e.code!=="Backspace")return;const t=e.target;if(!(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable))){if(Yr.press("studio",e)){e.preventDefault();return}e.code!=="Space"||e.repeat||(e.preventDefault(),yt.click())}});zn.addEventListener("keydown",e=>{if(e.target===$n)return;const t=j.map(r=>r.id),n=t.indexOf(qe),a=e.key==="ArrowRight"?t[(n+1)%t.length]:e.key==="ArrowLeft"?t[(n-1+t.length)%t.length]:null;a&&(e.preventDefault(),it(a),document.getElementById(`tab-${a}`)?.focus())});function Ne(){const e=q.running()&&ze.owner()===Vr;yt.textContent=e?"Stop":"Play",yt.setAttribute("aria-pressed",String(e)),document.activeElement!==Nn&&(Nn.value=String(Math.round(q.bpm()*10)/10));const t=q.position();Lr.value=t?`${t.bar}.${t.beat}`:"—";const n=q.peers().length;Xt.textContent=Z.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",Jt.textContent=Z.state==="running"?"":"Audio off";const a=Me.state==="arming"||Me.state==="armed";a&&(Xt.textContent="Rec armed: waiting for sound",Jt.textContent="Rec armed"),Yt.classList.toggle("off",Z.state!=="running");const{done:r,total:o}=ke.counts(),s=!ke.settled(),l=!s&&Ir>0&&performance.now()-Ir<Gh;if(Yt.classList.toggle("loading",s),Yt.classList.toggle("just-ready",l),s)Xt.textContent=`Loading the Studio… ${r} of ${o} instruments ready`,Jt.textContent=`Loading ${r}/${o}`,Yt.classList.remove("off");else if(l&&!a){const d=ke.items().filter(u=>u.state==="failed");Xt.textContent=d.length?`Studio ready: ${d.map(u=>u.brand).join(", ")} didn't load`:"Studio ready: press Play",Jt.textContent="Ready",Yt.classList.remove("off")}Pi>performance.now()&&(Xt.textContent=Fi,Jt.textContent=Fi)}const Gh=2500;let Ir=0;q.clock.onChange(()=>{q.clock.transport.running&&(ph=!0),Rk(),eo(),q.running()||ze.clear(),qh(),Ne()});ze.onChange(Ne);ze.onLastOut(()=>{q.running()&&q.stop(),Ne()});q.clock.onChange(()=>wt?.render());q.peer.onPeers(Ne);Z.addEventListener("statechange",Ne);const zk=.25;let sd=performance.now();function Wh(e){const t=Math.min(.1,(e-sd)/1e3);sd=e,wt?.frame(t);const n=q.position(),a=n?`${n.bar}.${n.beat}`:"—";Lr.value!==a&&(Lr.value=a);const r=q.beatPhase(),o=r!==null&&r<zk;Li.hasAttribute("data-on")!==o&&Li.toggleAttribute("data-on",o),requestAnimationFrame(Wh)}const Kh=F("ul",{class:"boot-list"}),Yh=F("div",{class:"boot-panel"},F("p",{class:"boot-title"},"Loading the Studio"),Kh,F("p",{class:"boot-note"},"Play is ready once every instrument is in."));Qr.append(Yh);let ld=!1;function to(){const e=ke.items(),{done:t,total:n}=ke.counts(),a=ke.settled();if(a&&!Ir&&(Ir=performance.now(),document.documentElement.dataset.studioLoaded="",window.setTimeout(Ne,Gh)),ld){Ne();return}ld=a,document.documentElement.toggleAttribute("data-studio-loading",!a),ot.style.setProperty("--boot-done",String(n?t/n:1)),yt.disabled=!a,a?yt.removeAttribute("data-nc-help"):yt.setAttribute("data-nc-help",ne["transport:play-loading"]),Kh.replaceChildren(...e.map(o=>F("li",{class:"boot-item","data-boot":o.state},F("span",{class:"boot-mark","aria-hidden":"true"}),F("span",{class:"boot-name"},F("span",{class:"boot-brand"},o.brand)," ",F("span",{class:"boot-type"},o.name)),F("span",{class:"boot-word"},fy[o.state]))));for(const o of j){const s=document.getElementById(`tab-${o.id}`),l=a?void 0:e.find(d=>d.id===o.id)?.state;l?s?.setAttribute("data-boot",l):s?.removeAttribute("data-boot")}const r=a||$h.has(qe);Yh.hidden=r,Qr.classList.toggle("booting",!r),Ne()}ke.onChange(to);function Ok(e){Is(e.src).then(t=>{const n=new URL(Zu(e,kh,t),location.href).href;return fetch(n,{priority:"low"}).then(a=>a.ok?a.text():"").then(a=>{for(const r of wy(a,n))document.head.querySelector(`link[rel="prefetch"][href="${CSS.escape(r)}"]`)||document.head.append(F("link",{rel:"prefetch",href:r}))})}).catch(()=>{})}function Bk(){const e=by(j.map(t=>t.id),qe);yy(e,t=>{if(ua.get(t)?.go(),t===e[0])for(const n of j)n.id!==t&&Ok(n);return ke.whenDone(t)},()=>vy()).then(()=>{for(const t of ua.values())t.go();ua.clear()})}async function _k(){const e=document.getElementById("app");if(!e)throw new Error("Missing #app");e.replaceChildren(Ls,ot,Ns,Ni,F("main",{class:"instruments"},zn,F("div",{class:"bay"},ya,Qr),kk),Ss.el,Xr.el),wt=Rw(Ni,ce,{order:()=>j.map(t=>t.id),catalogue:os.filter(t=>t.sound!==!1),bpm:()=>q.bpm(),onAdd:Nh,onRemove:(t,n)=>void Ih(t,n),onReorder:(t,n)=>Ak(t,n),onRename:(t,n)=>Mk(t,n),...ca?{plugins:ca}:{}});for(const t of j)Sh(t);to(),Z.state==="running"&&await Z.suspend(),await Z.audioWorklet.addModule(Kx),wh.start(Z,!0),sh(),Me.attach(),Pe.attach(),await q.start();for(const t of[Cn.a,Cn.b,ce.masterFx])t&&zd(t,q.clock,{mapper:st});Bk(),it(qe),Ne(),requestAnimationFrame(Wh),window.setInterval(()=>ce.parkIdleReturns(),Vw),document.documentElement.dataset.studioReady="",Yn&&(document.documentElement.dataset.studioReset=Yn),Yn==="reset"?Ik():Yn==="undo"?_e("Reset undone"):Yn==="failed"&&_e("Couldn't reset: this browser's storage is full"),qk(),Hk(),ca&&J1({ctx:Z,running:()=>Y1([...ks].map(t=>t.getChain())),onFrozen:jk})}async function jk(e){xs.add(e.map(a=>a.id)),window.clearTimeout(In),Ma=!0;const t=e.map(a=>a.name).join(", ");document.documentElement.dataset.pluginsFrozen=e.map(a=>a.id).join(" "),_e(`${t} froze the audio`),await tt({title:B.frozenTitle,body:B.frozenBody(t),confirmLabel:B.frozenOpen,cancelLabel:B.frozenStay})&&window.open(location.href,"_blank")}function qk(){const e=new Set(kn.pending());if(!e.size)return;const t=[],n=o=>j.find(s=>s.id===o)?.name??o,a=()=>{window.clearTimeout(r);const o=[...t,...kn.dropPending()].map(n);_e(o.length?`Scene loaded; ${o.join(", ")} kept ${o.length===1?"its":"their"} own sound`:"Scene loaded")};kn.onApplied((o,s)=>{e.delete(o)&&(s||t.push(o),e.size||a())});const r=window.setTimeout(a,ky)}window.__studio={resetTrail:Bh,ctx:Z,mixer:ce,grab:Kr,recorder:Me,keys:Yr,metronome:Es,readout:Xr.api,moduleChip:Ms,get lastTake(){return Zt?.take??null},keeper:Pe,get lastKeep(){return fh},limiterDelay:lh,mapper:st,transport:q,frames:Ye,show:it,get instances(){return j},fx:Cn,plugins:ca,frozen:xs,channelCores:Wr,get mix(){return wt},situation:Sa,notes:{bus:Bt,dev:(e,t,n={})=>{const a=U1(Bt.source(e,e),q.clock,{settings:t});for(const[r,o]of Object.entries(n))a.source.setTarget(r,{role:o.role,on:o.on??!0,...o.octave===void 0?{}:{octave:o.octave}});return a}}};_k();const Vk={off:"Picker",connecting:"Picker…",on:"Picker on",away:"Picker: no answer",ask:"Picker: connect",blocked:"Picker: blocked"};function Fr(e){et.dataset.picker=e;const t=et.querySelector(".picker-label");t&&(t.textContent=Vk[e]),et.setAttribute("aria-pressed",String(e==="on"||e==="connecting"||e==="away")),et.dataset.ncHelp=ne[`picker:${e}`]}Fr("off");async function Hk(){let e=Mr(me());const t=new URLSearchParams(location.search).get("picker");if(t!==null){const r=t?ws(t):e.address;r&&(e={on:!0,address:r},Tr(me(),e))}if(!e.on)return;const n=await Dx(navigator.permissions,location.hostname,r=>{const o=Mr(me()),s=et.dataset.picker;o.on&&(r==="granted"&&(s==="ask"||s==="blocked")?We.start(o.address):r==="denied"&&We.status!=="on"&&(We.stop(),Fr("blocked")))}),a=zx(e,n);a==="start"?We.start(e.address):a!=="off"&&Fr(a)}et.addEventListener("click",()=>void Uk());async function Uk(){const e=Mr(me()),t=et.dataset.picker;if(t==="ask"||t==="blocked"){We.start(e.address);return}if(We.status!=="off"){if(!await tt({title:"Disconnect the Sample Picker?",body:"Its Send to NYX won't reach this Studio until you connect it again.",confirmLabel:"Disconnect",returnFocus:et}))return;Tr(me(),{...e,on:!1}),We.stop();return}await tt({title:"Connect the Sample Picker?",body:`The Studio talks to the Sample Picker on this computer (${e.address}), so its Send to NYX loads the pads of your NYX here. Chrome may ask to let this site reach this computer: allow it.`,confirmLabel:"Connect",returnFocus:et})&&(Tr(me(),{...e,on:!0}),We.start(e.address))}
