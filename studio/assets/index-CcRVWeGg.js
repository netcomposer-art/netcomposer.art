(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Qt=1e-9;function Yp(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class no{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return Yp(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let r=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+Qt&&(r=s.bpm);const i=[{beat:t.beat,time:t.time,bpm:this.clamp(r)}];for(const s of a){if(s.beat<=t.beat+Qt)continue;const l=this.clamp(s.bpm);l!==i[i.length-1].bpm&&i.push({beat:s.beat,time:0,bpm:l})}this.segs=i,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+Qt){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-Qt;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,r=.25){const i=this.bpmAt(n);if(!(a>0)||!(r>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/r));this.setTempoAt(i,n);for(let l=1;l<=s;l++)this.setTempoAt(i+(t-i)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new no({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+Qt)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+Qt)return n[a];return n[0]}}const Xp=Object.freeze({beatsPerBar:4,beatUnit:4}),cn=1e-9;function Jp(e){return Math.floor(e+cn)}function dc(e,t,n=!1){if(!(t>0))return e;const r=Math.ceil(e/t-cn)*t;return n&&r<=e+cn?r+t:r}class Qp{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new no({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??Xp}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-cn&&(this.stopTime===null||t<this.stopTime-cn)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-cn?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=Jp(t/n),r=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:r,barPhase:r/n}}nextBar(t,n=!1){return dc(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const uc="nc-clock/snapshot",pc=1;function Zp(e,t="local"){return{format:uc,version:pc,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function eh(e,t){const n=th(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const et=e=>typeof e=="number"&&Number.isFinite(e),ds=e=>e===null||et(e);function th(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==uc&&n("format"),(!et(t.version)||Math.floor(t.version)!==pc)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!et(t.anchor.beat)||!et(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&et(a.beat)&&et(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!et(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!et(t.meter.beatUnit))&&n("meter"),(!ds(t.startTime)||!ds(t.stopTime)||!et(t.stoppedBeat))&&n("transport times"),t}class nh{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new Qp(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){eh(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return Zp(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const ah="nc-sync/1",rh=1,ih="nc-sync",oh="nc-sync-leader",sh=0,hc=.5,fc=.75;function lh(e){return typeof e=="number"&&Number.isFinite(e)&&e>=hc&&e<=fc?e:null}const Nr=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Tn=e=>typeof e=="number"&&Number.isFinite(e),ba=e=>typeof e=="string"&&e.length>0;function ch(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==rh||!ba(t.type)||!ba(t.from)||!Tn(t.term)||!Tn(t.seq)||!Tn(t.sentAt))return null;switch(t.type){case"hello":return ba(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return Tn(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&Tn(t.slot)?t:null;case"ping":case"pong":return ba(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function dh(e,t,n,a,r){return{proto:ah,from:t,term:n,seq:a,sentAt:r,...e}}function ze(){return(performance.timeOrigin+performance.now())/1e3}const Fr=.003,uh=3,Ir=.002+1e-6,ph=.01,us=500;class hh{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?ph:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=Fr&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const r=n-(this.timeOrigin+a)/1e3,i=this.median(),s=r-i,l=Math.abs(r-this.preStepBase),u=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!u&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&u===this.pendingBack&&(u||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,i,u))):(this.pendingStep=s,this.pendingBack=u,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const r=this.heldBase()!==null,i=this.ctx.currentTime,s=i<=this.revertUntil;let l;if(a&&s){const u=this.offsets,d=this.preStep;u.length=0;for(let c=0;c<d.length;c++)u.push(d[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:i,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!s){const c=this.offsets,p=this.preStep;p.length=0;for(let f=0;f<c.length;f++)p.push(c[f]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?i+this.stepRevert:-1/0}const u=this.offsets,d=t-n;for(let c=0;c<u.length;c++)u[c]+=d;this.stepCount++,l={stepSeconds:t-n,confirmedAt:i,reanchors:this.stepCount,revert:!1}}if(!r)for(const u of[...this.stepListeners])u(l);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let i=0;i<a;i++){const s=t[i];let l=i-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const r=a>>1;return a%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const r=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(r&&Number.isFinite(r.contextTime)&&Number.isFinite(r.performanceTime)&&r.contextTime>=Fr&&r.performanceTime>0)if(this.waitSince=null,r.contextTime===this.lastStampC&&r.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<us)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=r.contextTime,this.lastStampP=r.performanceTime,this.stampSince=this.perfNow(),n=r.contextTime-(this.timeOrigin+r.performanceTime)/1e3,a=!0;else if(!r||!(r.contextTime>=Fr)&&!(r.contextTime>0&&!(r.performanceTime>0))){if(r){const i=this.perfNow();if(this.waitSince===null&&(this.waitSince=i),i-this.waitSince<us)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(uh,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let r=-1,i=0;for(let l=0;l<n;l++){let u=0;for(let d=0;d<n;d++)Math.abs(t[d]-t[l])<=Ir&&u++;u>i&&(r=l,i=u)}if(i<a)return;const s=t[r];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>Ir&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-this.estimate())<=Ir}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const r=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(r,2)};setTimeout(r,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(r)&&r>0?r:null}}const fh="let t=null;onmessage=e=>{clearInterval(t);t=null;if(e.data>0)t=setInterval(()=>postMessage(0),e.data)}";function mh(){const e=globalThis;return typeof e.Worker=="function"&&typeof e.Blob=="function"&&typeof e.document=="object"&&typeof e.URL?.createObjectURL=="function"}function gh(e,t={}){const n=t.intervalMs??20,a=t.now??(typeof performance<"u"?()=>performance.now():()=>Date.now());let r=null,i=null,s=null,l=-1/0,u=!1;const d=()=>{if(!u)return;const c=a();c-l<n/2||(l=c,e())};if(t.worker===!0||t.worker!==!1&&mh())try{i=URL.createObjectURL(new Blob([fh],{type:"text/javascript"})),r=new Worker(i),r.onmessage=d}catch{r=null,i&&URL.revokeObjectURL(i),i=null}return{get running(){return u},get kind(){return r?"worker+timer":"timer"},start(){u||(u=!0,s=setInterval(d,n),r?.postMessage(n))},stop(){u=!1,s&&clearInterval(s),s=null,r?.postMessage(0)},dispose(){this.stop(),r?.terminate(),r=null,i&&URL.revokeObjectURL(i),i=null}}}class bh{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...Nr,...t.capabilities},this.channelOption=t.channel??ih,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const r=this.o.now(),i=()=>{n===this.startWaits&&t(r)};return a.then(i,i),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const r=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(r),0)}else{const r=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?r:Math.max(t+this.o.gatedStartLeadSeconds,r),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[r,i]=this.tempoRange();t=Math.min(i,Math.max(r,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const u=s.beatAt(l+this.o.minLeadSeconds),d=Math.max(n??dc(u,1),u);a&&a>0?(s.tempo.rampTempo(t,d,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,d),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(fc,Math.max(hc,t)):sh;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=lh(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=ch(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...Nr,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const i of this.peers.values())i.leader=i.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...Nr},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(r=>{this.leader&&this.decideStart(r)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const i=new AbortController;this.lockAbort=i,this.locks.request(oh,{signal:i.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===i&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(i,s,l)=>[i?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const i of this.peers.values()){if(!i.capabilities.canLead)continue;const s=n(i.capabilities.prefersLeader,i.joinedAt,i.id);(r===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,r=i.id)}this.setLeader(r===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==r[0]?a[0]<r[0]:a[1]!==r[1]?a[1]<r[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const r=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>r&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(dh(t,this.id,this.term,++this.seq,this.o.now()))}}const yh="modulepreload",vh=function(e){return"/studio/"+e},ps={},wh=function(t,n,a){let r=Promise.resolve();if(n&&n.length>0){let s=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=l?.nonce||l?.getAttribute("nonce");r=s(n.map(d=>{if(d=vh(d),d in ps)return;ps[d]=!0;const c=d.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":yh,c||(f.as="script"),f.crossOrigin="",f.href=d,u&&f.setAttribute("nonce",u),document.head.appendChild(f),c)return new Promise((g,m)=>{f.addEventListener("load",g),f.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${d}`)))})}))}function i(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})};var xh=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],hi=[.25,.5,.75,1,1.5,2],kh=4.9,ae={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0},hallTone:{exp2:[1500,3.7],div:100,round:!0}},He={fmt:"wet"},he={fmt:"pct"},Zt={fmt:"db"},ya={fmt:"signedPct"},Ln={fmt:"num",suffix:" ms"},X={div:100};function I(e,t,n,a,r,i,s,l){var u={key:e,label:t,min:n,max:a,default:r,step:1,k:i,unit:null,format:s};if(l)for(var d in l)u[d]=l[d];return u}function ct(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var Bn=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[I("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:ae.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[I("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:ae.hpHz,astrid:!0,zero:"off"}),I("q","Resonance",0,100,0,2,{fmt:"q",law:ae.hpQ},{dsp:{law:ae.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[I("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:ae.bpHz,astrid:!0},{dsp:{law:ae.bpHz}}),I("q","Q",0,100,0,2,{fmt:"q",law:ae.bpQ},{dsp:{law:ae.bpQ}}),I("mix","Mix",0,100,100,3,He,{dsp:X,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[I("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:ct(xh),overriddenBy:"beats_free",tempoSynced:!0}),I("feedback","Feedback",0,90,35,2,he,{dsp:X,unit:"%"}),I("mix","Wet/dry",0,100,0,3,He,{dsp:X,unit:"%",astridKey:"wet"}),I("tone","Tone",0,100,100,4,{fmt:"hz",law:ae.delayTone,offAt:100},{dsp:{div:99},more:!0}),I("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),I("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:ct([[0,"Insert"],[1,"Send"]]),more:!0}),I("send","Send",0,100,100,7,he,{dsp:X,unit:"%",more:!0}),I("mod_send","Accent → send",-100,100,0,8,ya,{dsp:X,unit:"%",more:!0}),I("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[I("predelay","Pre-delay",0,200,0,1,Ln,{dsp:{div:1e3},unit:"ms"}),I("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:X,unit:"%"}),I("decay","Decay",0,100,50,3,he,{dsp:X,unit:"%"}),I("damping","Damping",0,100,0,4,he,{dsp:X,unit:"%"}),I("mix","Mix",0,100,0,5,He,{dsp:X,unit:"%"})]},{type:"hall",label:"Hall",own:!0,dials:[I("size","Size",0,100,60,1,he,{dsp:X,unit:"%"}),I("decay","Decay",5,120,35,2,{fmt:"fixed",div:10,add:0,digits:1,suffix:" s"},{dsp:{div:10},unit:"s"}),I("predelay","Pre-delay",0,250,20,3,Ln,{dsp:{div:1e3},unit:"ms"}),I("tone","Tone",0,100,60,4,{fmt:"hz",law:ae.hallTone,astrid:!0},{dsp:{law:ae.hallTone}}),I("mix","Mix",0,100,25,5,He,{dsp:X,unit:"%"}),I("low_cut","Low cut",0,1e3,120,6,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),I("width","Width",0,100,100,7,he,{dsp:X,unit:"%",more:!0}),I("motion","Motion",0,100,30,8,he,{dsp:X,unit:"%",more:!0})]},{type:"ensemble",label:"Ensemble",own:!0,dials:[I("rate","Rate",0,100,35,1,{fmt:"rate",law:ae.rate},{dsp:{law:ae.rate}}),I("depth","Depth",0,100,60,2,he,{dsp:X,unit:"%"}),I("width","Width",0,100,80,3,he,{dsp:X,unit:"%"}),I("mix","Mix",0,100,50,4,He,{dsp:X,unit:"%"}),I("voices","Voices",3,6,3,5,{fmt:"option"},{step:null,options:ct([[3,"3"],[6,"6"]]),more:!0}),I("vibrato","Vibrato",0,100,20,6,he,{dsp:X,unit:"%",more:!0})]},{type:"gate",label:"Gate",own:!0,tempoSynced:!0,pattern:!0,dials:[I("rate","Rate",4,16,4,1,{fmt:"option"},{step:null,options:ct([[4,"1/4"],[8,"1/8"],[16,"1/16"],[12,"1/8T"]])}),I("swing","Swing",0,100,0,3,he,{dsp:X,unit:"%"}),I("depth","Depth",0,100,90,4,he,{dsp:X,unit:"%"}),I("mix","Mix",0,100,100,5,He,{dsp:X,unit:"%"}),I("steps","Steps",8,16,8,2,{fmt:"option"},{step:null,options:ct([[8,"8"],[16,"16"]]),more:!0}),I("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:ct([[0,"Volume"],[1,"Filter"]]),more:!0}),I("smooth","Smooth",1,20,4,7,Ln,{unit:"ms",more:!0}),I("spread","Spread",0,100,0,8,he,{dsp:X,unit:"%",more:!0}),I("res","Resonance",0,100,20,9,he,{dsp:X,unit:"%",more:!0})]},{type:"flanger",label:"Flanger",dials:[I("rate","Rate",0,100,26,1,{fmt:"rate",law:ae.rate},{dsp:{law:ae.rate}}),I("depth","Depth",0,100,70,2,he,{dsp:X,unit:"%"}),I("feedback","Feedback",-90,90,50,3,ya,{dsp:X,unit:"%"}),I("mix","Mix",0,100,50,4,He,{dsp:X,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[I("rate","Rate",0,100,52,1,{fmt:"rate",law:ae.rate},{dsp:{law:ae.rate}}),I("depth","Depth",0,100,50,2,he,{dsp:X,unit:"%"}),I("spread","Spread",0,100,70,3,he,{dsp:X,unit:"%"}),I("mix","Mix",0,100,40,4,He,{dsp:X,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[I("rate","Rate",0,100,39,1,{fmt:"rate",law:ae.rate},{dsp:{law:ae.rate}}),I("depth","Depth",0,100,70,2,he,{dsp:X,unit:"%"}),I("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:ct([[4,"4"],[6,"6"],[8,"8"]])}),I("feedback","Feedback",0,90,30,4,he,{dsp:X,unit:"%"}),I("mix","Mix",0,100,50,5,He,{dsp:X,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[I("low_db","Low",-18,18,0,1,Zt,{unit:"dB"}),I("mid_db","Mid",-18,18,0,2,Zt,{unit:"dB"}),I("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:ae.midHz,astrid:!0},{dsp:{law:ae.midHz}}),I("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:ae.eqQ},{dsp:{law:ae.eqQ}}),I("high_db","High",-18,18,0,4,Zt,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[I("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),I("output_db","Output",-12,12,0,2,Zt,{unit:"dB"}),I("mix","Mix",0,100,100,3,He,{dsp:X,unit:"%"}),I("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:ct([[0,"Smooth"],[1,"Acid"]]),more:!0}),I("tone","Tone",0,100,100,5,{fmt:"hz",law:ae.driveTone,offAt:100},{dsp:{div:99},more:!0}),I("mod_drive","Accent → drive",-100,100,0,6,ya,{dsp:X,unit:"%",more:!0}),I("mod_tone","Accent → tone",-100,100,0,7,ya,{dsp:X,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[I("threshold_db","Threshold",-60,0,0,1,Zt,{unit:"dB"}),I("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:ae.ratio},{dsp:{law:ae.ratio}}),I("attack_ms","Attack",1,100,10,3,Ln,{unit:"ms"}),I("release_ms","Release",10,1e3,150,4,Ln,{unit:"ms"}),I("makeup_db","Makeup",0,24,0,5,Zt,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[I("width","Width",0,200,100,1,he,{dsp:X,unit:"%"}),I("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:X})]}],$h=Bn.map(function(e){return e.type}),Eh=Bn.filter(function(e){return!e.hidden}).map(function(e){return e.type}),Sh={reverb:"plate"},mn={},mc=[],jn=[];function Ah(e){mn[e.type]||mc.push(e.type),mn[e.type]=e;for(var t=0;t<jn.length;t++)try{jn[t](e.type)}catch(n){typeof console<"u"&&console.error(n)}}function Mh(){return mc.map(function(e){return mn[e]})}function Th(e){return jn.push(e),function(){var t=jn.indexOf(e);t>=0&&jn.splice(t,1)}}function gc(e){return typeof e=="string"&&/^plugin:[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(e)&&e.length<=71}function ao(e){var t=Sh[e]||e;return $h.indexOf(t)>=0||typeof t=="string"&&mn[t]?t:null}function oe(e){for(var t=ao(e),n=0;n<Bn.length;n++)if(Bn[n].type===t)return Bn[n];return t&&mn[t]?mn[t]:null}function Lh(e,t){var n=oe(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function nn(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function _a(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=nn(n.law,t);return a===null?0:a}function hs(e,t){return Math.min(kh,e*60/(t>0?t:120))}var fs=function(e){return e>0?"+":e<0?"−":""};function Ch(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function bc(e,t,n){var a=e.format,r;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:fs(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return fs(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(r=nn(a.law,t),r===null?a.zero||"open":a.astrid?Ch(r):r+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+nn(a.law,t).toFixed(1);case"ratio":return nn(a.law,t).toFixed(1)+":1";case"rate":return r=nn(a.law,t),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var i=0;i<e.options.length;i++)if(e.options[i].value===t)return e.options[i].label;return String(t);case"tempoMs":return Math.round(hs(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(hs(t,n)*1e3)+" ms"}return String(t)}var Nh=1,dr=["drive","delay","plate"];function Fh(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,r){return bc(e,a,r)},t}var dn=dr.map(function(e){var t=oe(e),n={type:e,label:t.label,dials:t.dials.map(Fh)};return t.tempoSynced&&(n.tempoSynced=!0),n}),Ih={reverb:"plate"};function Va(e){var t=Ih[e]||e;return dr.indexOf(t)>=0?t:null}function ur(e){for(var t=Va(e),n=0;n<dn.length;n++)if(dn[n].type===t)return dn[n];return null}function yc(e,t){var n=ur(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function gn(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function at(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,r=1;r<e.options.length;r++)Math.abs(e.options[r].value-t)<Math.abs(a-t)&&(a=e.options[r].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var i=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*i)/i))+0}function Ph(){return{v:Nh,chain:dn.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function Rh(e){return hi.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},hi[0])}function Pr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Dh(e){for(var t=Array.isArray(e)?e:Pr(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=Ph(),r={},i=[],s=0;s<t.length;s++){var l=t[s];if(Pr(l)){var u=Va(l.type);if(!u){typeof l.type=="string"&&i.push(l.type);continue}if(r[u]){i.push(u);continue}r[u]=!0;var d=a.chain[dr.indexOf(u)],c=Pr(l.dials)?l.dials:{};u==="delay"&&c.mix===void 0&&c.wet!==void 0&&(c=Object.assign({},c,{mix:c.wet})),d.bypass=n?l.bypass===!0:l.bypass!==!1,ur(u).dials.forEach(function(p){d.dials[p.key]=at(p,c[p.key])}),zh(u,d.dials,c)}}return{state:a,dropped:i}}function zh(e,t,n){for(var a=ur(e),r=0;r<a.dials.length;r++){var i=a.dials[r];i.stepWhen&&(t[i.key]=at(i,n&&typeof n[i.key]=="number"?n[i.key]:t[i.key],gn(i,t)))}}function Ha(e){return Dh(e).state}function Oh(e){return JSON.parse(JSON.stringify(e))}var Bh=24,fi={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function mi(e,t,n){if(t==="bypass")return n?0:1;var a=yc(e,t)||jh(e,t);return a?_a(a,n):0}function jh(e,t){var n=oe(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var qh={};dn.forEach(function(e){e.dials.forEach(function(t){qh[e.type+"."+t.key]=t.format})});function Rr(e,t){var n=new Float64Array(Bh),a=Ha(e);return a.chain.forEach(function(r){var i=fi[r.type];n[i.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[i[s]]=mi(r.type,s,r.dials[s])})}),n}var _h="__ncFxLoop",Vh=/^(?:return|typeof|instanceof|in|of|new|delete|void|throw|case|do|else|yield|await)$/,ms=/[A-Za-z_$\u0080-\uffff]/,Dr=/[A-Za-z0-9_$\u0080-\uffff]/;function Hh(e){var t=[],n=0,a=e.length,r=[],i,s;function l(){var f=t.length?t[t.length-1]:null;return f?f.t==="name"?Vh.test(f.v):f.t==="num"||f.t==="str"||f.t==="tpl"||f.t==="re"?!1:f.v!==")"&&f.v!=="]":!0}function u(){for(var f=n-1;n<a;){if(i=e[n],i==="\\"){n+=2;continue}if(i==="`"){n++,t.push({t:"tpl",v:"",s:f,e:n});return}if(i==="$"&&e[n+1]==="{"){n+=2,r.push("tpl"),t.push({t:"tpl",v:"",s:f,e:n});return}n++}t.push({t:"tpl",v:"",s:f,e:a})}for(;n<a;){if(i=e[n],i===" "||i==="	"||i===`
`||i==="\r"||i==="\f"||i==="\v"||i===" "||i==="\uFEFF"||i==="\u2028"||i==="\u2029"){n++;continue}if(i==="/"&&e[n+1]==="/"){for(;n<a&&e[n]!==`
`&&e[n]!=="\r";)n++;continue}if(i==="/"&&e[n+1]==="*"){var d=e.indexOf("*/",n+2);n=d<0?a:d+2;continue}if(s=n,i==='"'||i==="'"){for(n++;n<a&&e[n]!==i&&e[n]!==`
`;)n+=e[n]==="\\"?2:1;n++,t.push({t:"str",v:"",s,e:n});continue}if(i==="`"){n++,u();continue}if(i==="/"&&l()){n++;for(var c=!1;n<a;){if(i=e[n],i==="\\"){n+=2;continue}if(i===`
`)break;if(c)i==="]"&&(c=!1);else if(i==="[")c=!0;else if(i==="/"){n++;break}n++}for(;n<a&&Dr.test(e[n]);)n++;t.push({t:"re",v:"",s,e:n});continue}if(ms.test(i)||i==="\\"){for(n++;n<a&&(Dr.test(e[n])||e[n]==="\\");)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(i==="#"&&n+1<a&&ms.test(e[n+1])){for(n+=2;n<a&&Dr.test(e[n]);)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(i>="0"&&i<="9"||i==="."&&e[n+1]>="0"&&e[n+1]<="9"){for(n++;n<a&&/[0-9A-Za-z_.]/.test(e[n]);)(e[n]==="e"||e[n]==="E")&&(e[n+1]==="+"||e[n+1]==="-")&&!/^0[xX]/.test(e.slice(s,n))&&n++,n++;t.push({t:"num",v:"",s,e:n});continue}if(i==="{")r.push("{");else if(i==="}"){var p=r.pop();if(p==="tpl"){n++,u();continue}}if(i==="?"&&e[n+1]==="."&&!(e[n+2]>="0"&&e[n+2]<="9")){n+=2,t.push({t:"p",v:"?.",s,e:n});continue}if(i==="."&&e[n+1]==="."&&e[n+2]==="."){n+=3,t.push({t:"p",v:"...",s,e:n});continue}n++,t.push({t:"p",v:i,s,e:n})}return t}function Uh(e,t){for(var n=0,a=t;a<e.length;a++){var r=e[a].t==="p"?e[a].v:"";if(r==="("||r==="["||r==="{")n++;else if((r===")"||r==="]"||r==="}")&&(n--,n===0))return r===")"?a:-1}return-1}function Gh(e){for(var t=String(e),n=Hh(t),a=[],r=_h+"()",i=0;i<n.length;i++){var s=n[i];if(!(s.t!=="name"||s.v!=="while"&&s.v!=="for")){var l=i>0?n[i-1]:null;if(!(l&&l.t==="p"&&(l.v==="."||l.v==="?."))){var u=i+1;if(!(s.v==="for"&&n[u]&&n[u].t==="name"&&n[u].v==="await")&&!(!n[u]||n[u].t!=="p"||n[u].v!=="(")){var d=Uh(n,u);if(!(d<0)){if(s.v==="while"){if(d===u+1)continue;a.push([n[u].e,r+" && ("],[n[d].s,")"]);continue}for(var c=[],p=0,f=u+1;f<d;f++){var g=n[f].t==="p"?n[f].v:"";g==="("||g==="["||g==="{"?p++:g===")"||g==="]"||g==="}"?p--:g===";"&&p===0&&c.push(f)}c.length===2&&(c[1]===c[0]+1?a.push([n[c[0]].e," "+r]):a.push([n[c[0]].e," "+r+" && ("],[n[c[1]].s,")"]))}}}}}if(!a.length)return t;a.sort(function(y,k){return y[0]-k[0]});for(var m="",w=0,h=0;h<a.length;h++)m+=t.slice(w,a[h][0])+a[h][1],w=a[h][0];return m+t.slice(w)}var zr=1,gs=15,vc=/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/,Wh=/^[a-z][a-z0-9_]{0,31}$/,wc=/^\d+\.\d+\.\d+$/,xc=/^[A-Za-z0-9.+-]+(?: (?:AND|OR|WITH) [A-Za-z0-9.+-]+)*$/,Kh=/^[A-Za-z0-9_-][A-Za-z0-9._-]{0,63}\.js$/,bs=["$schema","ncPlugin","id","name","version","author","licence","description","website","keywords","dsp","params"],ys=["id","label","type","defaultValue","minValue","maxValue","discreteStep","exponent","choices","units","more"],Ua={1:"It failed to start.",2:"It crashed while playing.",3:"It made bad numbers (NaN, infinity or runaway level).",4:"It crashed when a dial moved.",5:"Its code is not loaded.",6:"It got stuck in a loop, so it was stopped."};function qn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function en(e){return typeof e=="number"&&isFinite(e)}function It(e,t){return typeof e=="string"&&e.trim().length>0&&e.length<=t}function pr(e){var t=[],n=e,a=function(l,u){t.push(l+": "+u)};if(!qn(n))return{ok:!1,errors:["manifest: must be a JSON object"],manifest:null};Object.keys(n).forEach(function(l){bs.indexOf(l)<0&&a(l,"unknown field (allowed: "+bs.slice(1).join(", ")+")")}),n.ncPlugin!==zr&&a("ncPlugin","must be "+zr),(typeof n.id!="string"||!vc.test(n.id)||n.id.length>64)&&a("id",'lowercase letters and digits, with dots or dashes between, up to 64 (e.g. "yourname.tremolo")'),It(n.name,40)||a("name","a name of 1 to 40 characters"),(typeof n.version!="string"||!wc.test(n.version))&&a("version",'x.y.z, e.g. "1.0.0"'),It(n.author,80)||a("author","who made it, 1 to 80 characters"),(typeof n.licence!="string"||!xc.test(n.licence)||n.licence.length>64)&&a("licence",'an SPDX licence id, e.g. "MIT"'),n.description!==void 0&&!(typeof n.description=="string"&&n.description.length<=200)&&a("description","up to 200 characters"),n.website!==void 0&&!(typeof n.website=="string"&&/^https:\/\/\S+$/.test(n.website)&&n.website.length<=2048)&&a("website","an https:// address"),n.keywords!==void 0&&!(Array.isArray(n.keywords)&&n.keywords.length<=8&&n.keywords.every(function(l){return It(l,24)}))&&a("keywords","up to 8 short strings"),(typeof n.dsp!="string"||!Kh.test(n.dsp))&&a("dsp",`the DSP file's name, in the same folder as plugin.json, ending in .js (e.g. "tremolo.dsp.js")`);var r=[];if(!Array.isArray(n.params))a("params","a list of params (may be empty)");else if(n.params.length>gs)a("params","at most "+gs);else{var i={};n.params.forEach(function(l,u){var d="params["+u+"]";if(!qn(l)){a(d,"must be an object");return}Object.keys(l).forEach(function(f){ys.indexOf(f)<0&&a(d+"."+f,"unknown field (allowed: "+ys.join(", ")+")")}),typeof l.id!="string"||!Wh.test(l.id)||l.id==="bypass"?a(d+".id",'lowercase, starting with a letter: letters, digits, _ (not "bypass")'):i[l.id]?a(d+".id",'"'+l.id+'" is used twice'):i[l.id]=!0,It(l.label,24)||a(d+".label","the dial's name, 1 to 24 characters");var c=l.type===void 0?"float":l.type;if(["float","int","boolean","choice"].indexOf(c)<0){a(d+".type","float, int, boolean or choice");return}var p={id:l.id,label:l.label,type:c};if(c==="choice"){if(!Array.isArray(l.choices)||l.choices.length<2||l.choices.length>16||!l.choices.every(function(f){return It(f,24)})){a(d+".choices","2 to 16 names");return}p.choices=l.choices.slice(),p.minValue=0,p.maxValue=l.choices.length-1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==p.maxValue)&&a(d,"a choice's values are 0 to choices.length - 1: leave out minValue and maxValue")}else if(c==="boolean")p.minValue=0,p.maxValue=1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==1)&&a(d,"a boolean is 0 or 1: leave out minValue and maxValue");else{if(!en(l.minValue)||!en(l.maxValue)||!(l.minValue<l.maxValue)){a(d,"minValue and maxValue: numbers, minValue < maxValue");return}p.minValue=l.minValue,p.maxValue=l.maxValue,l.discreteStep!==void 0&&!(en(l.discreteStep)&&l.discreteStep>0&&l.discreteStep<=l.maxValue-l.minValue)&&a(d+".discreteStep","a number > 0, at most the range"),p.discreteStep=c==="int"?Math.max(1,Math.round(l.discreteStep||1)):en(l.discreteStep)&&l.discreteStep>0?l.discreteStep:Yh(l.maxValue-l.minValue),c==="int"&&(!Number.isInteger(l.minValue)||!Number.isInteger(l.maxValue))&&a(d,"an int has whole-number minValue and maxValue")}l.defaultValue===void 0?p.defaultValue=p.minValue:!en(l.defaultValue)||l.defaultValue<p.minValue||l.defaultValue>p.maxValue?a(d+".defaultValue","a number from "+p.minValue+" to "+p.maxValue):p.defaultValue=l.defaultValue,l.units!==void 0&&(typeof l.units=="string"&&l.units.length<=8?p.units=l.units:a(d+".units",'up to 8 characters, e.g. "Hz", "ms", "%", "dB"')),l.exponent!==void 0&&(en(l.exponent)&&l.exponent>0?p.exponent=l.exponent:a(d+".exponent","a number > 0")),l.more!==void 0&&(typeof l.more=="boolean"?l.more&&(p.more=!0):a(d+".more","true or false")),r.push(p)})}if(t.length)return{ok:!1,errors:t,manifest:null};var s={ncPlugin:zr,id:n.id,name:n.name.trim(),version:n.version,author:n.author.trim(),licence:n.licence,dsp:n.dsp,params:r};return n.description&&(s.description=n.description),n.website&&(s.website=n.website),n.keywords&&(s.keywords=n.keywords.slice()),{ok:!0,errors:[],manifest:s}}function Yh(e){var t=Math.pow(10,Math.floor(Math.log10(e/100)));return t<.001?.001:t>1?1:+t.toFixed(3)}function Xh(e){for(var t=0;t<3&&Math.abs(Math.round(e*Math.pow(10,t))-e*Math.pow(10,t))>1e-9;)t++;return t}function hr(e){return"plugin:"+e}function Jh(e,t){var n=e,a=t||{},r=n.params.map(function(s,l){var u={key:s.id,label:s.label,min:s.minValue,max:s.maxValue,default:s.defaultValue,step:s.discreteStep,k:l+1,unit:s.units||null,format:null};if(s.type==="choice"||s.type==="boolean"){var d=s.type==="choice"?s.choices:["Off","On"];u.step=null,u.options=d.map(function(p,f){return{value:f,label:p}}),u.format={fmt:"option"}}else{var c=s.units?/^[%°×]/.test(s.units)?s.units:" "+s.units:"";u.format={fmt:"fixed",div:1,add:0,digits:Xh(s.discreteStep),suffix:c}}return s.more&&(u.more=!0),u}),i={type:hr(n.id),label:n.name,dials:r,plugin:{id:n.id,version:n.version,author:n.author,licence:n.licence,engine:"plugin:"+n.id+"@"+n.version,idBase:n.id.split(".").pop(),url:typeof a.url=="string"?a.url:"",listed:a.listed===!0}};return n.description&&(i.note=n.description),n.website&&(i.plugin.website=n.website),i}function kc(e,t){var n=pr(e);if(!n.ok)throw new Error("nc-fx plugin: "+n.errors.join("; "));var a=oe(hr(n.manifest.id));if(a&&a.plugin.version!==n.manifest.version)throw new Error("nc-fx plugin: "+n.manifest.id+" "+a.plugin.version+" is already loaded on this page; reload to use "+n.manifest.version);if(a)return a;var r=Jh(n.manifest,t);return Ah(r),r}async function $c(e){var t=globalThis.crypto&&globalThis.crypto.subtle;if(!t)throw new Error("nc-fx plugin: no WebCrypto here (integrity needs a secure context: https or localhost)");for(var n=new Uint8Array(await t.digest("SHA-256",e)),a="",r=0;r<n.length;r++)a+=String.fromCharCode(n[r]);return"sha256-"+btoa(a)}function Qh(e){if(e.protocol!=="https:"&&!(e.protocol==="http:"&&/^(localhost|127\.0\.0\.1|\[::1\])$/.test(e.hostname)))throw new Error("nc-fx plugin: load plugins over https (http only from localhost): "+e.href)}async function vs(e,t,n,a){var r=await t(e,{credentials:"omit",cache:"no-cache"});if(!r.ok)throw new Error("nc-fx plugin: "+a+" "+e+" answered "+r.status);var i=new Uint8Array(await r.arrayBuffer());if(n){var s=await $c(i);if(s!==n)throw new Error("nc-fx plugin: "+a+" "+e+" does not match the registry (expected "+n+", got "+s+")")}return new TextDecoder().decode(i)}var va=typeof WeakMap=="function"?new WeakMap:null;function Ec(e,t){var n=new Error("nc-fx plugin: "+e.name+" "+t+" is already loaded on this page. Reload the page to use "+e.version+".");return n.reload=!0,n}async function Sc(e,t,n,a,r){var i=t.id+"@"+t.version,s=va&&va.get(e);!s&&va&&(s={},va.set(e,s));var l=s&&s[i];if(l){var u=await l,d=await n();return{stale:d!==u}}var c=(async function(){var p=await n();await Pc(e,r);var f=URL.createObjectURL(new Blob([Gh(p)+`
//# sourceURL=`+a+`
`],{type:"text/javascript"}));try{await e.audioWorklet.addModule(f)}finally{URL.revokeObjectURL(f)}return p})();return s&&(s[i]=c,c.catch(function(){delete s[i]})),await c,{stale:!1}}async function Ac(e,t,n){var a=n||{},r=new URL(String(t),a.base||(typeof location<"u"?location.href:void 0));Qh(r);var i=a.fetch||globalThis.fetch.bind(globalThis),s=a.integrity||{},l=await vs(r.href,i,s.manifest,"plugin.json"),u;try{u=JSON.parse(l)}catch{throw new Error("nc-fx plugin: "+r.href+" is not JSON")}var d=pr(u);if(!d.ok)throw new Error("nc-fx plugin: "+r.href+": "+d.errors.join("; "));var c=d.manifest;if(a.expect&&(a.expect.id&&a.expect.id!==c.id||a.expect.version&&a.expect.version!==c.version))throw new Error("nc-fx plugin: "+r.href+" is "+c.id+" "+c.version+", not what the registry lists");var p=oe(hr(c.id));if(p&&p.plugin.version!==c.version)throw Ec(c,p.plugin.version);var f=new URL(c.dsp,r),g=await Sc(e,c,function(){return vs(f.href,i,s.dsp,"DSP file")},f.href,a.moduleUrl),m=kc(c,{url:r.href,listed:a.listed===!0});return{entry:m,manifest:c,url:r.href,stale:g.stale}}var Zh=256*1024;async function ws(e,t,n){var a=n||{},r=t||{},i=r.manifest;if(typeof i=="string")try{i=JSON.parse(i)}catch{throw new Error("nc-fx plugin: plugin.json is not JSON")}var s=pr(i);if(!s.ok)throw new Error("nc-fx plugin: plugin.json: "+s.errors.join("; "));var l=s.manifest;if(typeof r.dsp!="string"||!r.dsp.trim())throw new Error("nc-fx plugin: "+l.name+" needs its DSP file, "+l.dsp);if(typeof r.dspName=="string"&&r.dspName!==l.dsp)throw new Error("nc-fx plugin: plugin.json names its DSP file "+l.dsp+", not "+r.dspName);if(new TextEncoder().encode(r.dsp).length>Zh)throw new Error("nc-fx plugin: "+l.dsp+" is over 256 KB");var u=typeof a.url=="string"&&a.url?a.url:"local:"+l.id,d=oe(hr(l.id));if(d&&d.plugin.version!==l.version)throw Ec(l,d.plugin.version);var c=r.dsp,p=await Sc(e,l,async function(){return c},u.replace(/[^A-Za-z0-9:._@\/-]/g,"_")+"/"+l.dsp,a.moduleUrl),f=kc(l,{url:u,listed:!1});return{entry:f,manifest:l,url:u,stale:p.stale}}function ef(e){var t=[];if(!qn(e)||e.v!==1||!Array.isArray(e.plugins))return{ok:!1,errors:['registry: { "v": 1, "plugins": [...] }'],registry:{v:1,plugins:[]}};var n=[],a={};return e.plugins.forEach(function(r,i){var s="plugins["+i+"]",l=[];if(!qn(r)){t.push(s+": must be an object");return}if((typeof r.id!="string"||!vc.test(r.id))&&l.push("id"),It(r.name,40)||l.push("name"),(typeof r.version!="string"||!wc.test(r.version))&&l.push("version"),It(r.author,80)||l.push("author"),(typeof r.licence!="string"||!xc.test(r.licence))&&l.push("licence"),(typeof r.manifest!="string"||!r.manifest)&&l.push("manifest"),(!qn(r.integrity)||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(r.integrity.manifest||"")||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(r.integrity.dsp||""))&&l.push("integrity"),(typeof r.checked!="string"||!/^\d{4}-\d{2}-\d{2}/.test(r.checked))&&l.push("checked"),a[r.id]&&l.push("id (listed twice)"),l.length){t.push(s+": bad "+l.join(", "));return}a[r.id]=!0;var u={id:r.id,name:r.name,version:r.version,author:r.author,licence:r.licence,manifest:r.manifest,integrity:{manifest:r.integrity.manifest,dsp:r.integrity.dsp},checked:r.checked};typeof r.description=="string"&&(u.description=r.description.slice(0,200)),n.push(u)}),{ok:t.length===0,errors:t,registry:{v:1,plugins:n}}}async function tf(e,t){var n=t||{},a=new URL(String(e),n.base||(typeof location<"u"?location.href:void 0)),r=await(n.fetch||globalThis.fetch.bind(globalThis))(a.href,{credentials:"omit",cache:"no-cache"});if(!r.ok)throw new Error("nc-fx plugins: the registry "+a.href+" answered "+r.status);var i=ef(await r.json());return{registry:i.registry,url:a.href,errors:i.errors}}function nf(e,t,n,a){return Ac(e,new URL(t.manifest,n).href,Object.assign({},a,{integrity:t.integrity,listed:!0,expect:{id:t.id,version:t.version}}))}function af(e,t){var n=t||{},a=n.stallMs>0?n.stallMs:1500,r=n.everyMs>0?n.everyMs:250,i=n.now||function(){return typeof performance<"u"?performance.now():Date.now()},s=n.setInterval||setInterval,l=n.clearInterval||clearInterval,u=e.currentTime,d=i(),c=0,p=!1,f=s(function(){var g=i(),m=g-d,w=e.currentTime;if(d=g,e.state!=="running"||w!==u){u=w,c=0,p&&e.state==="running"&&(p=!1,n.onResume&&n.onResume());return}if(m>4*r){c=0;return}c+=m,!p&&c>=a&&(p=!0,n.onStall&&n.onStall({frozenMs:c,at:w}))},r);return{stop:function(){l(f)},stalled:function(){return p}}}var rf=["hard","pump","swell","blip","glide"],of=["Hard","Pump","Swell","Blip","Glide"],Mc=16;function Je(e){for(var t=[],n=0;n<Mc;n++)t.push(e[n%e.length]);return t}var bn=[{name:"Ducker",note:"The four-on-the-floor duck: every beat dips and comes back.",dials:{rate:4,steps:8,swing:0,depth:90,mode:0},levels:Je([100]),shapes:Je([1])},{name:"Tide",note:"One slow breath a bar.",dials:{rate:8,steps:16,swing:0,depth:85,mode:0},levels:Je([15,35,60,85,100,85,60,35]),shapes:Je([4])},{name:"Stutter",note:"A sixteenth gate with gaps.",dials:{rate:16,steps:16,swing:0,depth:100,mode:0},levels:[100,0,100,100,0,100,0,100,100,0,100,100,0,100,100,0],shapes:Je([0])},{name:"Lope",note:"Swung eighths, short hits.",dials:{rate:8,steps:16,swing:50,depth:100,mode:0},levels:Je([100,55,85,40,100,55,85,70]),shapes:Je([3])},{name:"Embers",note:"Each eighth swells and cuts; the bar fades.",dials:{rate:8,steps:8,swing:0,depth:100,mode:0},levels:Je([100,85,70,60,50,40,30,20]),shapes:Je([2])},{name:"Sieve",note:"Filter mode: sixteenths open a low-pass, a climb at the end of the bar.",dials:{rate:16,steps:16,swing:0,depth:85,mode:1,res:35},levels:[100,20,55,25,95,25,60,35,100,20,55,25,70,80,90,100],shapes:[3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0]}],sf="Ducker";function Tc(e){for(var t=String(e||"").toLowerCase(),n=0;n<bn.length;n++){var a=bn[n];if(a.name.toLowerCase()===t)return{name:a.name,dials:Object.assign({},a.dials),pattern:{levels:a.levels.slice(),shapes:a.shapes.slice()}}}return null}function xs(e,t,n,a){return typeof e!="number"||!isFinite(e)?a:(e=Math.round(e),e<t?t:e>n?n:e)}function sa(e){for(var t=bn[0],n=e&&typeof e=="object"?e:{},a=Array.isArray(n.levels)?n.levels:[],r=Array.isArray(n.shapes)?n.shapes:[],i={levels:[],shapes:[]},s=0;s<Mc;s++)i.levels.push(xs(a[s],0,100,t.levels[s])+0),i.shapes.push(xs(r[s],0,rf.length-1,t.shapes[s])+0);return i}function lf(e){var t=sa(e),n=[],a,r,i;for(a=0;a<4;a++){for(i=0,r=3;r>=0;r--)i=i*101+t.levels[a*4+r];n.push([10+a,i])}for(a=0;a<2;a++){for(i=0,r=7;r>=0;r--)i=i*5+t.shapes[a*8+r];n.push([14+a,i])}return n}function cf(e){if(!e||!e.dials)return"Custom";for(var t=sa(e.pattern),n=0;n<bn.length;n++){var a=bn[n],r=!0,i;for(i in a.dials)e.dials[i]!==a.dials[i]&&(r=!1);var s=a.dials.steps;for(i=0;r&&i<s;i++)(t.levels[i]!==a.levels[i]||t.shapes[i]!==a.shapes[i])&&(r=!1);if(r)return a.name}return"Custom"}function Lc(e){var t=e&&e.steps===8?8:16;return e&&e.rate===12&&t>12?12:t}function df(e,t,n){var a=e&&(e.rate===4||e.rate===8||e.rate===12)?e.rate:16,r=e&&e.steps===8?8:16,i=4/a,s=+t||0;if(a===12){var l=n>0?n:4;s-=Math.floor(s/l)*l}var u=.5+.25*(e&&typeof e.swing=="number"?e.swing:0)/100,d=s/i*.5,c=Math.floor(d),p=d-c,f=(c%16+16)%16,g=p<u?f*2:f*2+1;return g&r-1}function uf(e,t,n,a){for(var r=sa(t),i=e&&e.steps===8?8:16,s=Lc(e),l=(n%i+i)%i,u=l+1>=s?0:l+1,d=r.levels[l]/100,c=r.levels[u]/100,p=r.shapes[l],f=[],g=a>0?a:24,m=0;m<=g;m++){var w=m/g,h,y;switch(p){case 1:y=w*1.6667,y>1&&(y=1),h=d*y*(2-y);break;case 2:h=d*w*w;break;case 3:h=w<.12?d:d*Math.exp((.12-w)*18);break;case 4:y=w*w*(3-2*w),h=d+(c-d)*y;break;default:h=d}f.push(h)}return f}var pf=2,Ga=3,ks=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Pt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var hf=/^local:[A-Za-z0-9._@-]{1,200}$/,ff=/^\d+\.\d+\.\d+$/;function mf(e,t){var n=Pt(e)?e:{},a=t.slice(7),r={id:a,version:typeof n.version=="string"&&ff.test(n.version)?n.version:"0.0.0",url:"",name:a};return typeof n.url=="string"&&n.url.length<=2048&&(/^https?:\/\//.test(n.url)||hf.test(n.url))&&(r.url=n.url),typeof n.name=="string"&&n.name.trim()&&(r.name=n.name.trim().slice(0,40)),r}function Cc(e){var t=e.plugin;return{id:t.id,version:t.version,url:t.url,name:e.label}}function gf(e){var t={},n=0;if(Pt(e))for(var a in e)n<16&&/^[a-z][a-z0-9_]{0,31}$/.test(a)&&typeof e[a]=="number"&&isFinite(e[a])&&(t[a]=e[a],n++);return t}function bf(e){return e.plugin?e.plugin.idBase:e.type}function Nc(e,t){var n=oe(e);if(!n)return null;var a={};(t||[]).forEach(function(d){d&&d.id&&(a[d.id]=!0)});for(var r=1,i=bf(n);a[i+"-"+r];)r++;var s={};n.dials.forEach(function(d){s[d.key]=d.default});var l={id:i+"-"+r,type:n.type,bypass:!1,dials:s};if(n.plugin&&(l.plugin=Cc(n)),n.pattern){var u=Tc(sf);Object.assign(l.dials,u.dials),l.pattern=u.pattern}return l}function yf(e){var t=oe(e.type),n=/-(\d+)$/.exec(e.id||""),a=t?t.label:e.plugin&&e.plugin.name?e.plugin.name:e.type;return a+(n&&+n[1]>1?" "+n[1]:"")}function vf(e,t,n){var a=e.length-1,r=Math.max(0,Math.min(a,n));if(t<0||t>a||t===r)return e;var i=e.slice(),s=i.splice(t,1)[0];return i.splice(r,0,s),i}function wf(e){return typeof e=="number"&&isFinite(e)?Rh(e):e}function $s(e,t,n){var a={};return e.dials.forEach(function(r){var i=t[r.key];i===void 0&&r.astridKey&&(i=t[r.astridKey]),n&&e.type==="delay"&&r.key==="delay_beats"&&(i=wf(i)),a[r.key]=e.plugin?at(r,i,r.step):at(r,i)}),e.dials.forEach(function(r){r.stepWhen&&(a[r.key]=at(r,typeof t[r.key]=="number"?t[r.key]:a[r.key],gn(r,a)))}),a}function xf(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,r=1/0,i=e.min;i<=e.max;i++){var s=nn(n.law,i),l=s===null?1/0:Math.abs(s-t);l<r&&(r=l,a=i)}return a}}var kf={rate:"rate_hz"};function $f(e,t,n,a){var r={};return e.dials.forEach(function(i){if(!i.more){var s=i.astridKey||kf[i.key]||i.key;r[i.key]=xf(i,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function Ef(e,t){var n=t>0?Math.floor(t):Ga,a=[],r=[],i=[],s=!1,l=!1;Array.isArray(e)?(i=e,l=!0):Pt(e)&&Array.isArray(e.chain)&&(i=e.chain,s=e.v===1,l=e.schema===2);for(var u=[],d=0;d<i.length;d++){var c=i[d];if(Pt(c)&&!(c.type==="limiter"||c.fixed===!0)){var p=ao(c.type),f=p&&oe(p);if(!f&&!s&&gc(c.type)){if(u.length>=n){a.push(c.id||c.type);continue}for(var g=mf(c.plugin,c.type),m=g.id.split(".").pop(),w=1;u.some(function(b){return b.id===m+"-"+w});)w++;var h=typeof c.id=="string"&&ks.test(c.id)&&!u.some(function(b){return b.id===c.id})?c.id:m+"-"+w;u.push({id:h,type:c.type,bypass:c.bypass===!0,dials:gf(c.dials),plugin:g});continue}if(!f||s&&["drive","delay","plate"].indexOf(p)<0){typeof c.type=="string"&&a.push(c.type);continue}if(u.length>=n){a.push(c.id||p);continue}var y;Pt(c.params)&&!Pt(c.dials)?y=$s(f,$f(f,c.params,r,c.id||p),l):y=$s(f,Pt(c.dials)?c.dials:{},l);var k=Nc(p,u),v=typeof c.id=="string"&&ks.test(c.id)&&!u.some(function(b){return b.id===c.id})?c.id:k.id,T=s?c.bypass!==!1:c.bypass===!0,M={id:s?k.id:v,type:p,bypass:T,dials:y};f.plugin&&(M.plugin=Cc(f)),f.pattern&&(M.pattern=sa(c.pattern)),u.push(M)}}return{state:{v:pf,chain:u},dropped:a,notes:r}}function Ot(e,t){return Ef(e,t).state}function dt(e){var t=oe(e.type),n=[[0,e.bypass?0:1]];return t&&(t.dials.forEach(function(a){n.push([a.k,_a(a,e.dials[a.key])])}),t.pattern&&(n=n.concat(lf(e.pattern)))),n}function Sf(e){var t=Ot(e,8),n=[],a=t.chain.filter(function(r){if(r.plugin)return n.push(r.id+": ASTRID has no plugins"),!1;var i=oe(r.type);return i&&i.own?(n.push(r.id+": ASTRID has no "+i.label),!1):!0}).map(function(r,i){var s=oe(r.type),l={};return i>=Ga&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(u){var d=r.dials[u.key];if(u.more){d!==u.default&&n.push(r.id+"."+u.key);return}u.key==="delay_beats"&&hi.indexOf(d)<0&&n.push(r.id+".delay_beats"),l[u.astridKey||u.key]=d}),{id:r.id,type:r.type,bypass:r.bypass,dials:l}});return{hacks:a,lossy:n}}var Af=150,Mf=6e3,Tf=18,Fc=6.283185307179586;function fr(e,t,n){return e<t?t:e>n?n:e}function Lf(e,t,n,a,r){var i=Math.pow(10,n/40),s=Fc*t/r,l=Math.cos(s),u=Math.sin(s),d,c,p,f,g,m,w,h;if(e===0||e===2){w=u/2*Math.SQRT2,h=2*Math.sqrt(i)*w;var y=e===0?1:-1;d=i*(i+1-y*(i-1)*l+h),c=y*2*i*(i-1-y*(i+1)*l),p=i*(i+1-y*(i-1)*l-h),f=i+1+y*(i-1)*l+h,g=-y*2*(i-1+y*(i+1)*l),m=i+1+y*(i-1)*l-h}else w=u/(2*a),d=1+w*i,c=-2*l,p=1-w*i,f=1+w/i,g=-2*l,m=1-w/i;return[d/f,c/f,p/f,g/f,m/f]}function Cf(e,t,n){var a=Fc*t/n,r=Math.cos(a),i=Math.sin(a),s=Math.cos(2*a),l=Math.sin(2*a),u=e[0]+e[1]*r+e[2]*s,d=-(e[1]*i+e[2]*l),c=1+e[3]*r+e[4]*s,p=-(e[3]*i+e[4]*l);return 10*Math.log10((u*u+d*d)/(c*c+p*p))}var Es={};function Tt(e){return Es[e]||(Es[e]=Lh("eq",e))}function tn(e,t){var n=Tt(t),a=e&&typeof e[t]=="number"&&isFinite(e[t])?e[t]:n.default;return fr(a,n.min,n.max)}function Ic(e){return[{id:"low",kind:0,hz:Af,db:tn(e,"low_db"),q:Math.SQRT1_2},{id:"mid",kind:1,hz:_a(Tt("mid_hz"),tn(e,"mid_hz")),db:tn(e,"mid_db"),q:_a(Tt("mid_q"),tn(e,"mid_q"))},{id:"high",kind:2,hz:Mf,db:tn(e,"high_db"),q:Math.SQRT1_2}]}function Nf(e,t,n){for(var a=Ic(e),r=n.length,i=new Float64Array(r),s=[],l=t/2,u=0;u<a.length;u++){var d=a[u],c=new Float64Array(r);if(d.db!==0)for(var p=Lf(d.kind,d.hz,d.db,d.q,t),f=0;f<r;f++){var g=n[f]<l?n[f]:l*.9999;c[f]=Cf(p,g,t),i[f]+=c[f]}s.push(c)}return{total:i,bands:s}}function Ff(e){var t=Tt("mid_hz").dsp.law;return fr(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}function If(e){var t=Tt("mid_q").dsp.law;return fr(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}var Wa={low:"low_db",mid:"mid_db",high:"high_db"},Pf={low:"Low",mid:"Mid",high:"High"};function Rf(e,t,n){var a=[];function r(i,s){var l=Tt(i),u=l.step||1;s=fr(Math.round(s/u)*u,l.min,l.max),s===0&&(s=0),s!==tn(e,i)&&a.push([i,s])}return typeof n.db=="number"&&Wa[t]&&r(Wa[t],n.db),t==="mid"&&typeof n.hz=="number"&&n.hz>0&&r("mid_hz",Ff(n.hz)),t==="mid"&&typeof n.q=="number"&&n.q>0&&r("mid_q",If(n.q)),a}function Df(e){var t=e==="mid"?["mid_db","mid_hz","mid_q"]:Wa[e]?[Wa[e]]:[];return t.map(function(n){return[n,Tt(n).default]})}var wa=typeof WeakMap=="function"?new WeakMap:null;function zf(e){var t=e&&e.output;if(!t||!t.context||typeof t.context.createAnalyser!="function")return null;var n=wa&&wa.get(e);return n||(n={node:null,users:0,handle:null},n.handle={open:function(){return e.status==="disposed"?null:(n.node||(n.node=t.context.createAnalyser(),n.node.fftSize=4096,n.node.smoothingTimeConstant=.8,n.node.minDecibels=-110,n.node.maxDecibels=0),n.users++===0&&t.connect(n.node),n.node)},close:function(){if(n.users!==0&&--n.users===0&&n.node)try{t.disconnect(n.node)}catch{}}},wa&&wa.set(e,n)),n.handle}function Of(e,t,n){var a=n||{},r={};["low_db","mid_db","mid_hz","mid_q","high_db"].forEach(function(c){var p=e&&typeof e.getParam=="function"?e.getParam(t,c):void 0;r[c]=typeof p=="number"?p:Tt(c).default});var i=e&&e.output&&e.output.context,s=a.sampleRate||i&&i.sampleRate||48e3,l=a.help||{},u=Ic(r).map(function(c){var p=(c.db>0?"+":c.db<0?"−":"")+Math.abs(c.db)+" dB",f=c.hz>=1e3?(c.hz/1e3).toFixed(c.hz>=1e4?0:1)+" kHz":Math.round(c.hz)+" Hz";return{id:c.id,label:Pf[c.id],kind:c.kind===0?"lowshelf":c.kind===1?"peak":"highshelf",hz:c.hz,db:c.db,q:c.q,moveHz:c.id==="mid",moveQ:c.id==="mid",minHz:c.id==="mid"?200:c.hz,maxHz:c.id==="mid"?5e3:c.hz,minQ:.3,maxQ:6,valueText:c.id==="mid"?p+" at "+f+", Q "+c.q.toFixed(1):p+(c.id==="low"?", shelf below ":", shelf above ")+f,help:l[c.id]}}),d=function(c){for(var p=0;p<c.length;p++)a.set(c[p][0],c[p][1])};return{type:"eqGraph",id:a.id,label:a.label||"EQ curve",range:Tf,sampleRate:s,on:a.on!==!1,bands:u,help:l.graph,response:function(c){return Nf(r,s,c)},spectrum:a.spectrum===!1?void 0:zf(e)||void 0,onBand:function(c,p){d(Rf(r,c,p))},onReset:function(c){d(Df(c).filter(function(p){return p[1]!==r[p[0]]}))}}}var Bf="nc-fx@1",jf=600,qf=256,_f=8,Cn=typeof WeakMap=="function"?new WeakMap:null;function Pc(e,t){var n=Cn&&Cn.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await wh(async()=>{const{default:i}=await import("./worklet-source-DgIhZ4lI.js");return{default:i}},[])).default,r=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),Cn&&(Cn.set(e,n),n.catch(function(){Cn.delete(e)})),n)}function ut(e,t){return typeof e=="number"&&isFinite(e)?e:t}function Rc(e,t,n,a){var r=Math.min(400,Math.max(20,ut(t.bpm,120))),i=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",u=ut(t.preGain,1),d=Math.max(0,ut(t.crossfade,.012)),c=ut(t.maxDelaySeconds,void 0),p=e.createGain(),f=e.createGain(),g=e.createGain(),m=e.createGain(),w=null;t.modInput===!0&&(w=e.createGain(),w.channelCount=1,w.channelCountMode="explicit",w.channelInterpretation="discrete"),m.gain.value=0,p.connect(g),g.connect(f),m.connect(f);var h={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r,mUsers:0,lv:null,lvAt:0,clk:null},y=n(r);h.post=function(b){h.node?h.node.port.postMessage(b):h.disposed||(i.length>=qf&&(i=a().concat([{t:"tempo",bpm:h.bpm,when:0}]),h.mUsers>0&&i.push({t:"meter",on:!0})),i.push(b))};function k(b){var x=i.map(function(S){var $=Object.assign({},S);return $.when>b||($.when=0,$.t!=="clear"&&($.snap=!0)),$});return i=[],x}h.emit=function(b){for(var x=0;x<h.listeners.length;x++)try{h.listeners[x](b)}catch(S){typeof console<"u"&&console.error(S)}},h.whenOf=function(b){return typeof b=="number"&&isFinite(b)&&b>0?b:0};var v=!1;h.tooFar=function(b){return typeof b=="number"&&b>e.currentTime+jf?(!v&&typeof console<"u"&&(v=!0,console.warn("nc-fx: ignoring a time "+Math.round(b-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var T=Pc(e,t.moduleUrl).then(function(){if(!h.disposed){var b=Object.assign({bpm:r,bypassMode:l,limiter:s,preGain:u,maxDelaySeconds:c},y);b.pending=k(e.currentTime),h.node=new AudioWorkletNode(e,Bf,{numberOfInputs:w?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:b}),h.node.port.onmessage=function(S){var $=S.data;if($&&$.t==="lv"&&h.mUsers>0)h.lv=$.d,h.lvAt=Ss();else if($&&$.t==="clk"&&$.d)h.clk={beat:$.d[0],frame:$.d[1],perFrame:$.d[2],locked:$.d[3]===1,bar:$.d[4]||4};else if($&&$.t==="perr"&&h.onPluginError&&$.d)for(var L=0;L<($.n|0);L++)h.onPluginError($.d[2*L],$.d[2*L+1])},p.connect(h.node),w&&w.connect(h.node,0,1),h.node.connect(m);var x=e.currentTime;x<=0||d===0?(g.gain.value=0,m.gain.value=1):(g.gain.setValueAtTime(1,x),g.gain.linearRampToValueAtTime(0,x+d),m.gain.setValueAtTime(0,x),m.gain.linearRampToValueAtTime(1,x+d)),h.status="ready"}},function(b){h.status="unavailable",i=[],h.error=b});h.meterOpen=function(){return h.disposed||h.status==="unavailable"?!1:(h.mUsers++===0&&h.post({t:"meter",on:!0}),!0)},h.meterClose=function(){h.mUsers!==0&&--h.mUsers===0&&(h.lv=null,h.disposed||h.post({t:"meter",on:!1}))},h.levels=function(){return h.lv&&Ss()-h.lvAt<Vf?h.lv:null};var M={};return h.meter=function(b,x){if(M[b])return M[b];var S=0,$={in:0,out:0},L={open:function(){return h.meterOpen()?(S++,!0):!1},close:function(){S!==0&&(S--,h.meterClose())},read:function(){var N=S>0?h.levels():null;return $.in=0,$.out=0,N&&x(N,$),$}};return M[b]=L,L},h.core={input:p,output:f,modInput:w,ready:T,get status(){return h.status},get error(){return h.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function(b,x){var S=ut(b,NaN);!(S>0)||h.disposed||h.tooFar(x)||(h.bpm=Math.min(400,Math.max(20,S)),h.post({t:"tempo",bpm:h.bpm,when:h.whenOf(x)}),h.emit({effect:null,key:"tempo",value:h.bpm}))},getTempo:function(){return h.bpm},setBeat:function(b,x){var S=ut(b,NaN);S!==S||h.disposed||h.tooFar(x)||h.post({t:"beat",beat:S,when:h.whenOf(x)})},freeRun:function(b){h.disposed||h.tooFar(b)||h.post({t:"free",when:h.whenOf(b)})},setBar:function(b,x){var S=Math.round(ut(b,NaN));!(S>=1&&S<=16)||h.disposed||h.tooFar(x)||h.post({t:"bar",beats:S,when:h.whenOf(x)})},beatAt:function(b){var x=h.clk;if(!x)return null;var S=typeof b=="number"&&isFinite(b)?b:e.currentTime;return{beat:x.beat+(S*e.sampleRate-x.frame)*x.perFrame,bpm:x.perFrame*60*e.sampleRate,locked:x.locked,beatsPerBar:x.bar}},clear:function(b){var x=b&&typeof b=="object"?b:{at:b};if(!(h.disposed||h.tooFar(x.at))){var S=ut(x.fadeMs,0);h.post({t:"clear",when:h.whenOf(x.at),fadeMs:S>0?Math.min(1e3,S):0})}},onChange:function(b){return h.listeners.push(b),function(){var x=h.listeners.indexOf(b);x>=0&&h.listeners.splice(x,1)}},dispose:function(){if(!h.disposed){if(h.disposed=!0,h.status="disposed",i=[],h.listeners.length=0,h.node){h.node.port.postMessage({t:"dispose"}),h.node.port.close();try{h.node.disconnect()}catch{}}[p,g,m,f,w].forEach(function(b){try{b&&b.disconnect()}catch{}})}}},h}var Vf=250;function Ss(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function Dc(e,t){t.in=e[0],t.out=e[1]}function Or(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function Br(e,t){var n=t||{};if(n.slots)return Hf(e,n);var a=Ha(n.state),r=Array.from(Rr(a)),i=Rc(e,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(Rr(a)),when:0}]}),s=i.core;function l(u){return a.chain[dr.indexOf(u)]}return s.setParam=function(u,d,c,p){var f=Va(u);if(!(!f||i.disposed||i.tooFar(p))){var g=l(f),m;if(d==="bypass")m=!!c;else{var w=yc(f,d);if(!w)return;m=at(w,c,gn(w,g.dials))}return d==="bypass"?g.bypass=m:g.dials[d]=m,i.post({t:"p",i:fi[f][d],v:mi(f,d,m),when:i.whenOf(p)}),i.emit({effect:f,key:d,value:m}),ur(f).dials.forEach(function(h){if(!(!h.stepWhen||!h.stepWhen.some(function(v){return v.key===d}))){var y=g.dials[h.key],k=at(h,y,gn(h,g.dials));k!==y&&(g.dials[h.key]=k,i.post({t:"p",i:fi[f][h.key],v:mi(f,h.key,k),when:i.whenOf(p)}),i.emit({effect:f,key:h.key,value:k}))}}),m}},s.meter=function(){return i.meter("",Dc)},s.getParam=function(u,d){var c=Va(u);if(c){var p=l(c);return d==="bypass"?p.bypass:p.dials[d]}},s.getState=function(){return Oh(a)},s.setState=function(u,d){i.disposed||i.tooFar(d&&d.at)||(a=Ha(u),i.post({t:"load",program:Array.from(Rr(a)),when:i.whenOf(d&&d.at)}),i.emit({effect:null,key:null,value:null}))},s}function Hf(e,t){var n=t.slots===!0?Ga:Math.max(1,Math.min(_f,Math.floor(+t.slots)||Ga)),a=Ot(t.state,n),r=1,i={},s={};function l(b){return!gc(b.type)||oe(b.type)!==null}function u(b){var x=oe(b.type);return x&&x.plugin?x.plugin.engine:b.type}function d(b){return i[b.id]||(i[b.id]=r++),i[b.id]}function c(b){return b.filter(l).map(function(x){return{uid:d(x),type:u(x),program:dt(x)}})}function p(){return a.chain.filter(l).map(function(b){return i[b.id]})}var f=c(a.chain),g=p(),m=Rc(e,t,function(){return{slots:n,chain:f,order:g}},function(){return[{t:"sync",chain:c(a.chain),order:p(),when:0}]}),w=m.core;m.onPluginError=function(b,x){for(var S in i)i[S]===b&&(s[S]=x,m.emit({effect:S,key:"error",value:x}))};function h(b){var x;for(x=0;x<a.chain.length;x++)if(a.chain[x].id===b)return a.chain[x];var S=ao(b);if(S){for(x=0;x<a.chain.length;x++)if(a.chain[x].type===S)return a.chain[x]}return null}function y(b,x){var S=d(b);m.post({t:"add",uid:S,type:u(b),when:x}),dt(b).forEach(function($){m.post({t:"ps",uid:S,k:$[0],v:$[1],when:x,snap:!0})})}function k(b){m.post({t:"order",uids:p(),when:b})}function v(b,x){var S={};a.chain.forEach(function(N){S[N.id]=N});var $=p().join();b.chain.forEach(function(N){var B=S[N.id];if(!l(N)){delete i[N.id];return}if(!B||B.type!==N.type||!i[N.id]){delete i[N.id],delete s[N.id],y(N,x);return}var V={};dt(B).forEach(function(K){V[K[0]]=K[1]}),dt(N).forEach(function(K){V[K[0]]!==K[1]&&m.post({t:"ps",uid:i[N.id],k:K[0],v:K[1],when:x})})});var L={};b.chain.forEach(function(N){L[N.id]=!0}),Object.keys(i).forEach(function(N){L[N]||delete i[N]}),Object.keys(s).forEach(function(N){L[N]||delete s[N]}),a=b,p().join()!==$&&k(x)}var T=Th(function(b){if(!(m.disposed||!a.chain.some(function(S){return S.type===b}))){var x=JSON.parse(JSON.stringify(a));x.chain=x.chain.map(function(S){return S.type===b?Ot({v:2,chain:[S]},1).chain[0]:S}),v(x,0),m.emit({effect:null,key:"plugin",value:b})}}),M=w.dispose;return w.dispose=function(){T(),M()},w.slots=n,w.meter=function(b){return b==null||b===""?m.meter("",Dc):m.meter("#"+b,function(x,S){var $=h(b),L=$?i[$.id]:0,N=x[2];if(L){for(var B=3,V=0;V<N;V++,B+=3)if(x[B]===L){S.in=x[B+1],S.out=x[B+2];return}}})},w.setParam=function(b,x,S,$){var L=h(b);if(!(!L||m.disposed||m.tooFar($))){var N=oe(L.type),B,V=null;if(!N)return x!=="bypass"?void 0:(L.bypass=!!S,m.emit({effect:L.id,key:x,value:L.bypass}),L.bypass);if(x==="bypass")B=!!S;else{for(var K=0;K<N.dials.length;K++)N.dials[K].key===x&&(V=N.dials[K]);if(!V)return;B=at(V,S,gn(V,L.dials))}var ne={},be={};dt(L).forEach(function(Y){ne[Y[0]]=Y[1]}),N.dials.forEach(function(Y){Y.stepWhen&&(be[Y.key]=L.dials[Y.key])}),x==="bypass"?L.bypass=B:L.dials[x]=B,N.dials.forEach(function(Y){Y.stepWhen&&(L.dials[Y.key]=at(Y,L.dials[Y.key],gn(Y,L.dials)))});var ce=m.whenOf($),se=i[L.id];return se&&dt(L).forEach(function(Y){(ne[Y[0]]!==Y[1]||V&&Y[0]===V.k)&&m.post({t:"ps",uid:se,k:Y[0],v:Y[1],when:ce})}),m.emit({effect:L.id,key:x,value:B}),Object.keys(be).forEach(function(Y){Y!==x&&L.dials[Y]!==be[Y]&&m.emit({effect:L.id,key:Y,value:L.dials[Y]})}),B}},w.getParam=function(b,x){var S=h(b);if(S)return x==="bypass"?S.bypass:S.dials[x]},w.setPattern=function(b,x,S){var $=h(b);if(!(!$||!$.pattern||m.disposed||m.tooFar(S))){var L=x&&typeof x=="object"?x:{},N=sa({levels:Array.isArray(L.levels)?L.levels:$.pattern.levels,shapes:Array.isArray(L.shapes)?L.shapes:$.pattern.shapes}),B={};dt($).forEach(function(ne){B[ne[0]]=ne[1]}),$.pattern=N;var V=i[$.id],K=m.whenOf(S);return V&&dt($).forEach(function(ne){B[ne[0]]!==ne[1]&&m.post({t:"ps",uid:V,k:ne[0],v:ne[1],when:K})}),m.emit({effect:$.id,key:"pattern",value:JSON.parse(JSON.stringify(N))}),JSON.parse(JSON.stringify(N))}},w.getPattern=function(b){var x=h(b);return x&&x.pattern?JSON.parse(JSON.stringify(x.pattern)):void 0},w.setGatePattern=function(b,x,S){var $=h(b),L=Tc(x);return!$||!$.pattern||!L||m.disposed||m.tooFar(S)?!1:(Object.keys(L.dials).forEach(function(N){w.setParam($.id,N,L.dials[N],S)}),w.setPattern($.id,L.pattern,S),!0)},w.getState=function(){return JSON.parse(JSON.stringify(a))},w.setState=function(b,x){m.disposed||m.tooFar(x&&x.at)||(v(Ot(b,n),m.whenOf(x&&x.at)),m.emit({effect:null,key:null,value:null}))},w.addEffect=function(b,x){var S=x||{},$=Nc(b,a.chain);if(!(!$||a.chain.length>=n||m.disposed||m.tooFar(S.at))){if(S.dials){var L=Ot({v:2,chain:[{id:$.id,type:$.type,dials:S.dials}]},1).chain[0];$.dials=L.dials}S.bypass===!0&&($.bypass=!0);var N=a.chain.slice(),B=typeof S.index=="number"?Math.max(0,Math.min(N.length,S.index)):N.length;return N.splice(B,0,$),v({v:2,chain:N},m.whenOf(S.at)),m.emit({effect:$.id,key:"chain",value:"add"}),$.id}},w.removeEffect=function(b,x){var S=h(b),$=x&&x.at;return!S||m.disposed||m.tooFar($)?!1:(v({v:2,chain:a.chain.filter(function(L){return L!==S})},m.whenOf($)),m.emit({effect:S.id,key:"chain",value:"remove"}),!0)},w.moveEffect=function(b,x,S){var $=h(b),L=S&&S.at;if(!$||m.disposed||m.tooFar(L))return!1;var N=vf(a.chain,a.chain.indexOf($),x);return N===a.chain?!1:(v({v:2,chain:N},m.whenOf(L)),m.emit({effect:$.id,key:"chain",value:"move"}),!0)},w.getChain=function(){return a.chain.map(function(b){var x={id:b.id,type:b.type,name:yf(b),bypass:b.bypass};if(b.plugin){var S=s[b.id]||0,$=!l(b)||S===5;x.plugin={id:b.plugin.id,version:b.plugin.version,url:b.plugin.url,name:b.plugin.name,status:$?"missing":S?"failed":"ready"},S&&!$&&(x.plugin.error=Ua[S]||Ua[2])}return x})},w.toAstrid=function(){return Sf(a)},w}function As(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function zc(e,t,n){var a=n||{},r=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,i=typeof a.toAudioTime=="function"?a.toAudioTime:r?function(h){return r.toContextTime(h)}:t&&t.timebase==="shared"?null:function(h){return h},s=typeof a.now=="function"?a.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,l=t&&t.transport?t.transport:t,u=l&&l.tempo?l.tempo:l,d=!1;function c(h){if(!i){!d&&typeof console<"u"&&(d=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof h!="number")){var y=i(l.timeAt(h));return typeof y=="number"&&isFinite(y)?y:void 0}}function p(){var h=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(h)){var y=l&&typeof l.bpm=="number"?l.bpm:As(u,0);y>0&&e.setTempo(y);return}var k=As(u,h);k>0&&e.setTempo(k);for(var v=u&&(u.points||u.tempoPoints)||[],T=0;T<v.length;T++){var M=v[T];if(M.beat>h&&M.bpm>0){var b=c(M.beat);b!==void 0&&e.setTempo(M.bpm,b)}}}var f=typeof e.setBeat=="function";function g(){var h=l&&l.meter,y=h&&typeof h.beatsPerBar=="number"?h.beatsPerBar:0;f&&y>=1&&typeof e.setBar=="function"&&e.setBar(y)}function m(h){if(!(!i||typeof h!="number"||!isFinite(h))){var y=i(h);return typeof y=="number"&&isFinite(y)?y:void 0}}function w(){if(f){if(g(),!l||!l.running){e.freeRun();return}var h=s&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;isFinite(h)&&e.setBeat(h,c(h))}}return p(),w(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(h){h&&(h.kind==="tempo"&&h.bpm>0?e.setTempo(h.bpm,c(h.atBeat)):h.kind==="snapshot"?(p(),w()):h.kind==="start"?(p(),f&&typeof h.beat=="number"&&isFinite(h.beat)&&(g(),e.setBeat(h.beat,m(h.at)))):h.kind==="stop"&&f&&e.freeRun(m(h.at)))})}const _n="/studio/assets/worklet-BuzpUTR0.js";var Uf="nc-ui",Gf={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},ro={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Ka={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Wf={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},kt={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Kf={light:{color:Gf.color,semantic:ro,component:Ka,runtime:Wf},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},Dn=e=>`--${Uf}-${e}`,gi=ro["label-on-fill-dark"],Ms=ro["label-on-fill-light"],Yf=kt["label-min-contrast"],Xf=/^#[0-9a-f]{6}$/i,Jf=e=>typeof e=="string"&&Xf.test(e),Ia=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Ts(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),r=i=>{let s=(i+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${Ia(r(0)*255)}${Ia(r(8)*255)}${Ia(r(4)*255)}`}function Oc(e){let[t,n,a]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),r=Math.max(t,n,a),i=Math.min(t,n,a),s=(r+i)/2,l=r-i;if(!l)return{h:0,s:0,l:s};let u=l/(1-Math.abs(2*s-1));return{h:((r===t?60*((n-a)/l%6):r===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:u,l:s}}function Ls(e){let[t,n,a]=[1,3,5].map(r=>{let i=parseInt(e.slice(r,r+2),16)/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function bi(e,t){let[n,a]=[Ls(e),Ls(t)].sort((r,i)=>i-r);return(n+.05)/(a+.05)}var Ya=e=>bi(e,gi)>=bi(e,Ms)?gi:Ms;function Bc(e,t,n,a=Yf){let r=Ts(e,t,n),i=Ya(r)===gi?1:-1;for(let s=0;s<40&&bi(r,Ya(r))<a;s++)n+=i*.01,r=Ts(e,t,n);return r}function Qf(e){let{h:t,s:n}=Oc(e),a=Bc(t,Math.min(n,kt["surprise-on-max-saturation"]),kt["surprise-on-lightness"]);return{fill:e,ink:Ya(e),on:a,onInk:Ya(a)}}var Zf=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function em(e,t=Math.random){let[n,a]=kt["surprise-saturation"],[r,i]=kt["surprise-lightness"],s=kt["surprise-min-hue-gap"],l=Jf(e)?Oc(e).h:null,u=t()*360;return l!==null&&Zf(u,l)<s&&(u=(l+s+t()*(360-2*s))%360),Bc(u,n+t()*(a-n),r+t()*(i-r))}function tm(e){if(!e)return null;let t=Qf(e);return{[Dn("surprise-fill")]:t.fill,[Dn("surprise-ink")]:t.ink,[Dn("surprise-on")]:t.on,[Dn("surprise-on-ink")]:t.onInk}}var nm=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,am=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Cs(e){let[t,n,a]=[1,3,5].map(l=>nm(parseInt(e.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),i=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*r+.793617785*i-.0040720468*s,1.9779984951*r-2.428592205*i+.4505937099*s,.0259040371*r+.7827717662*i-.808675766*s]}function rm([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,r=(e-.1055613458*t-.0638541728*n)**3,i=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*r+.2309699292*i,-1.2684380046*a+2.6097574011*r-.3413193965*i,-.0041960863*a-.7034186147*r+1.707614701*i].map(s=>Ia(am(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var im=kt["velocity-range"],jc={min:Ka.rhythm["velocity-min"],max:Ka.rhythm["velocity-max"]},Ns=Object.fromEntries(Object.entries(Kf).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function om(e,t=jc){let[n,a]=im,r=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,i=(r-n)/(a-n),s=t.ink??Ka.rhythm["step-cell-ink"];if(i<=0)return{velocity:r,t:0,fill:t.min.toUpperCase(),ink:s};if(i>=1)return{velocity:r,t:1,fill:t.max.toUpperCase(),ink:s};let l=Cs(t.min),u=Cs(t.max);return{velocity:r,t:i,fill:rm(l.map((d,c)=>d+(u[c]-d)*i)),ink:s}}function Fs(e,t=jc){return{[Dn("velocity-fill")]:om(e,t).fill}}var Xa="data-nc-theme",yi="nc-ui-theme-change",sm=Object.freeze(["system","light","dark"]),lm="netcomposer.studio.theme.v1",cm="(prefers-color-scheme: dark)",io=e=>e?.documentElement??null,qc=e=>e?.defaultView?.matchMedia?.(cm)??null,oo=e=>e==="light"||e==="dark"?e:"system";function dm(e=globalThis.document){return oo(io(e)?.getAttribute(Xa))}function Ja(e=globalThis.document){let t=dm(e);return t!=="system"?t:qc(e)?.matches?"dark":"light"}function so(e,t=globalThis.document){let n=io(t);if(!n)return"light";let a=oo(e);a==="system"?n.removeAttribute(Xa):n.setAttribute(Xa,a);let r=Ja(t),i=t.defaultView?.CustomEvent;return i&&t.dispatchEvent(new i(yi,{detail:{choice:a,theme:r}})),r}function _c(e,t=globalThis.document){let n=io(t);if(!n)return()=>{};let a=Ja(t),r=()=>{let u=Ja(t);u!==a&&(a=u,e(u))},i=t.defaultView?.MutationObserver,s=i?new i(r):null;s?.observe(n,{attributes:!0,attributeFilter:[Xa]});let l=qc(t);return l?.addEventListener?.("change",r),t.addEventListener(yi,r),()=>{s?.disconnect(),l?.removeEventListener?.("change",r),t.removeEventListener(yi,r)}}var um={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},pm={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},hm={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},fm={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},mr={};for(let[e,t]of Object.entries(pm))mr[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(fm))mr[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(hm))mr[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(um.renames.map(e=>[e.old,e.new]));function Vc(e){let t=mr[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function ie(e){return Vc(e).prop}function o(e){return`var(${ie(e)})`}function mm(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(ie(t)));return Number.isFinite(n)?n:0}function ge(e,t){let n=Vc(t),a=e.ownerDocument??document,r=a.createElement("span");r.dataset.ncLive=t,r.style.position="absolute",r.style.pointerEvents="none";let i=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=i:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=i:r.style.color=i,(e instanceof Element?e:a.documentElement).append(r);let s=(a.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function Hc(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function gm(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=o("font-ui"),n.style.fontSize=o("label-size"),n.style.fontWeight=o("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var bm="[data-modulated], [data-modulated] *",Uc="(orientation: landscape) and (max-height: 500px) and (max-width: 1023px)";function jr(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function Is(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${o("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${o("hairline")} solid ${o("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function ym(){let e=a=>`
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
${bm} { transition: none; }
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
${Is("")}
}
@media (max-width: 1023px) {
${Is("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${jr("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${jr("")}
}
@media (max-width: 1023px) {
${jr("html[data-nc-landscape] ")}
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
`}var qr=null,vm="nc-ui-fallback";function Gc(e=globalThis.document){if(!e?.documentElement||(e.documentElement,qr&&qr.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${vm} {
${ym()}
}
`,e.head.append(t),qr=t}var Nn=null,wm=0,xm=new URL("/studio/assets/confirm-DwyQU4Nn.css",import.meta.url).href,Wc=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=xm,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Wc(document);function Ge(e){return Kc(e).then(t=>!!t.ok)}function Kc({title:e,body:t,lines:n=[],extra:a,confirmLabel:r="Confirm",cancelLabel:i="Cancel",danger:s=!1,root:l,returnFocus:u,signal:d},c){if(Nn||d?.aborted)return Promise.resolve({});let p=l?.ownerDocument??document,f=Wc(p),g=l??p.body,m=p.defaultView??globalThis,w=`nc-ui-confirm-${++wm}`,h=(U,xe,fe)=>{let De=p.createElement(U);return De.className=`nc-ui-confirm${xe}`,fe!=null&&(De.textContent=fe),De},y=h("div","-layer");y.dataset.state="enter";let k=h("div","");k.setAttribute("role","alertdialog"),k.setAttribute("aria-modal","true"),k.setAttribute("aria-labelledby",`${w}-t`);let v=h("h2","-title",e);v.id=`${w}-t`;let T=h("p","-body",t);T.id=`${w}-b`;let M=n.map((U,xe)=>{let fe=h("p","-body",U?.text??U);return fe.id=`${w}-b${xe}`,U?.tone==="danger"&&(fe.dataset.tone="danger"),fe});k.setAttribute("aria-describedby",[T,...M].map(U=>U.id).join(" "));let b=a&&h("button","-extra",a.label);b&&(b.type="button",b.dataset.ncConfirm="extra",b.addEventListener("click",()=>a.onAction?.()));let x=h("div","-actions"),S=(U,xe)=>{let fe=h("button","-btn",U);return fe.type="button",fe.dataset.ncConfirm=xe,fe.addEventListener("click",()=>ye(xe==="ok")),fe},$=S(i,"cancel"),L=S(r,"ok");s&&(L.dataset.danger="true"),x.append($,L);let[N,B]=c?.(h,L)??[];k.append(v,T,...M,...N?[N]:[],...b?[b]:[],x);let V=[B,b,$,L].filter(Boolean);y.append(k);let K={layer:y};Nn=K;let ne=u??p.activeElement,be=[];for(let U of g.children)U.hasAttribute("inert")||(U.setAttribute("inert",""),be.push(U));let ce=()=>{if(Nn!==K)return;g.append(y),(B??$).focus({preventScroll:!0});let U=m.requestAnimationFrame?.bind(m)??(xe=>setTimeout(xe,16));U(()=>U(()=>{y.dataset.state==="enter"&&(y.dataset.state="open")}))};f?f.then(ce):ce();let se=!1;y.addEventListener("pointerdown",U=>{se=U.target===y}),y.addEventListener("click",U=>{U.target===y&&se&&ye(!1),se=!1});let Y=U=>{if(U.stopImmediatePropagation(),U.key==="Escape")U.preventDefault(),ye(!1);else if(U.key==="Tab"){U.preventDefault();let xe=V.filter(De=>!De.disabled),fe=xe.length;xe[(xe.indexOf(p.activeElement)+(U.shiftKey?fe-1:1))%fe].focus()}else U.key==="Enter"&&(U.preventDefault(),p.activeElement===b?b.click():p.activeElement===$?ye(!1):L.disabled||ye(!0))},Kt=U=>U.stopImmediatePropagation();m.addEventListener("keydown",Y,!0),m.addEventListener("keyup",Kt,!0);let Lt=()=>ye(!1);d?.addEventListener("abort",Lt);let Ct,fa=new Promise(U=>{Ct=U});function ye(U){if(Nn!==K)return;Nn=null,m.removeEventListener("keydown",Y,!0),m.removeEventListener("keyup",Kt,!0),d?.removeEventListener("abort",Lt);for(let Xe of be)Xe.removeAttribute("inert");y.dataset.state="closing",ne?.isConnected&&typeof ne.focus=="function"&&ne.focus({preventScroll:!0});let xe=m.getComputedStyle?.(y),fe=Math.max(0,...String(xe?.transitionDuration??"").split(",").map(Xe=>Number.parseFloat(Xe)*(Xe.trim().endsWith("ms")?1:1e3)||0)),De=()=>y.remove();y.addEventListener("transitionend",Xe=>Xe.target===y&&De()),setTimeout(De,fe+50),Ct({ok:U,value:B?.value.trim()})}return fa}function km(e){let t=e.field??{};return Kc(e,(n,a)=>{let r=n("label","-field"),i=n("input","-input");i.type=t.type??"text",i.value=t.value??"",t.placeholder&&(i.placeholder=t.placeholder),i.spellcheck=!1,i.autocomplete="off";let s=()=>{a.disabled=i.value.trim()===""};return i.addEventListener("input",s),s(),r.append(n("span","-label",t.label??""),i),[r,i]}).then(n=>n.ok?n.value:null)}function lo(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.dataset.ncOn="",r.textContent=e.onText??"On";let i=t.createElement("span");i.dataset.ncOff="",i.textContent=e.offText??"Off",a.append(r,i),n.append(a);let s=!1,l=d=>{s=d===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let u=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",u),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",u),n.remove()}}}var Yc=new WeakMap,Ps=.25;function $m(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(a,r);let i=0,s=e.step??.005,l=e.onChange,u=e.onReset,d=h=>Math.min(1,Math.max(0,h)),c=()=>{n.style.setProperty("--fader-pos",String(i)),n.setAttribute("aria-valuenow",String(Math.round(i*1e3)/1e3))},p=h=>{let y=d(h);y!==i&&(i=y,c(),l?.(y))},f=0,g=!1;n.addEventListener("pointerdown",h=>{if(h.button!==0)return;h.preventDefault(),n.focus?.({preventScroll:!0});let y=n.getBoundingClientRect();h.target!==r&&y.height>0&&p(1-(h.clientY-y.top)/y.height),f=h.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(h.pointerId)}),n.addEventListener("pointermove",h=>{if(!g)return;let y=n.getBoundingClientRect().height||1,k=(f-h.clientY)/y*(h.shiftKey?Ps:1);f=h.clientY,p(i+k)});let m=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",m),n.addEventListener("pointercancel",m),n.addEventListener("lostpointercapture",m),n.addEventListener("dblclick",h=>{h.preventDefault(),u?.()}),n.addEventListener("keydown",h=>{let y=h.shiftKey?s*Ps:s,k={ArrowUp:i+y,ArrowRight:i+y,ArrowDown:i-y,ArrowLeft:i-y,PageUp:i+s*10,PageDown:i-s*10,Home:0,End:1};h.key in k&&(h.preventDefault(),p(k[h.key]))});let w={el:n,get value(){return i},get dragging(){return g},set(h){g||(i=d(Number(h)||0),c())},setText(h){h?n.setAttribute("aria-valuetext",h):n.removeAttribute("aria-valuetext")},setLabel(h){n.setAttribute("aria-label",h)},configure(h){typeof h.step=="number"&&h.step>0&&(s=h.step),h.onChange&&(l=h.onChange),h.onReset&&(u=h.onReset)}};return w.setLabel(e.label),w.set(e.value??0),w.setText(e.valueText),Yc.set(n,w),w}function Em(e){return Yc.get(e)}var Xc=new WeakMap,Sm=.2,Am=1.5,Mm=.5;function Tm(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function Rs(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Tm(a.getComputedStyle(e).getPropertyValue(ie(t)),n)}function Lm(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let r=t.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let i=t.createElement("div");i.className="nc-meter-bars",i.setAttribute("aria-hidden","true");let s=[];for(let w=0;w<n;w++){let h=t.createElement("span");h.className="nc-meter-bar";let y=t.createElement("span");y.className="nc-meter-peak";let k=t.createElement("span");k.className="nc-meter-rms";let v=t.createElement("span");v.className="nc-meter-hold",h.append(y,k,v),i.append(h),s.push({peak:y,rms:k,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(r,i);let l=e.label,u=e.onClear,d=!1,c=-1,p=-1,f=()=>{r.dataset.lit=d?"true":"false",r.setAttribute("aria-pressed",d?"true":"false"),r.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),r.title=d?"Clipped. Click to clear":"Clip light"},g=(w,h,y,k)=>{let v=Math.round(k*1e3)/1e3;y[h]!==v&&(y[h]=v,w.style.transform=h==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};r.addEventListener("click",()=>{m.clear(),u?.()});let m={el:a,get clipped(){return d},update(w,h){c<0&&(c=Rs(a,"motion-meter-fall",Sm)),p<0&&(p=Rs(a,"motion-meter-hold",Am));let y=Math.max(0,Math.min(.25,Number(h)||0)),k=c>0?Math.exp(-y/c):0;s.forEach((v,T)=>{let M=w[T]??w[0]??{peak:0,rms:0},b=Math.min(1,Math.max(0,Number(M.peak)||0)),x=Math.min(b,Math.max(0,Number(M.rms)||0));M.over&&m.clip(),v.level.peak=b>=v.level.peak?b:b+(v.level.peak-b)*k,v.level.rms=x>=v.level.rms?x:x+(v.level.rms-x)*k,v.holdAge+=y,b>=v.holdAt?(v.holdAt=b,v.holdAge=0):v.holdAge>p&&(v.holdAt=Math.max(b,v.holdAt-Mm*y)),g(v.peak,"peak",v.shown,v.level.peak),g(v.rms,"rms",v.shown,v.level.rms),g(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,f())},clear(){d=!1,f()},reset(){for(let w of s)w.level.peak=0,w.level.rms=0,w.holdAt=0,w.holdAge=0,g(w.peak,"peak",w.shown,0),g(w.rms,"rms",w.shown,0),g(w.hold,"hold",w.shown,0),w.hold.dataset.off="true"},setLabel(w){l=w,f()},configure(w){w.onClear&&(u=w.onClear)}};return f(),m.reset(),Xc.set(a,m),m}function Jc(e){return e?Xc.get(e):void 0}var Cm=3,Nm=new Set(["freq","q","rate","time","log"]);function co(e,t,n){return!e||!Nm.has(e)||!(n>t)?"linear":t>0?"log":"power"}function gr(e,t,n){return co(e,t,n)!=="linear"}function Qa(e,t,n,a){let r=Number(a);if(!(n>t)||!Number.isFinite(r))return 0;let i=Math.min(n,Math.max(t,r)),s=co(e,t,n);if(s==="log")return Math.log(i/t)/Math.log(n/t);let l=(i-t)/(n-t);return s==="power"?Math.cbrt(l):l}function Qc(e,t,n,a){let r=Math.min(1,Math.max(0,Number(a)||0)),i=co(e,t,n);return i==="log"?t*(n/t)**r:t+(n-t)*(i==="power"?r**Cm:r)}function Zc(e,t,n,a){let r=Math.min(n,Math.max(t,e));if(a>0){r=t+Math.round((r-t)/a)*a;let i=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));r=Number(r.toFixed(i)),r=Math.min(n,Math.max(t,r))}return r}function uo(e,t,n,a){return Math.round(Qa(e,t,n,a)*1e3)}function vi(e,t,n,a,r){return Zc(Qc(e,t,n,Number(a)/1e3),t,n,r)}function Fm(e,t,n=!1){let a=Number(e)||0,r=n?1:1e3/100,i=null;return t==="ArrowRight"||t==="ArrowUp"?i=a+r:t==="ArrowLeft"||t==="ArrowDown"?i=a-r:t==="PageUp"?i=a+1e3/10:t==="PageDown"?i=a-1e3/10:t==="Home"?i=0:t==="End"&&(i=1e3),i===null?null:Math.min(1e3,Math.max(0,Math.round(i)))}function ed(e,t,n,a,r,i=!1,s){let l=uo(e,t,n,a),u=Fm(l,r,i);if(u===null)return null;let d=vi(e,t,n,u,s),c=Math.sign(u-l),p=Zc(Number(a),t,n,s);for(;c!==0&&d===p&&u>0&&u<1e3;)u+=c,d=vi(e,t,n,u,s);return d}function Ds(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function zs(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function Im(e,t,n,a=n/6){let r=e.some(c=>c===null),i=Math.max(0,n-(r?a:0)),s=e.reduce((c,p,f)=>p===null?c:c+zs(t[f]),0),l=s>0?i/s:0,u=e.map(c=>c===null?0:Math.min(i,zs(c)*l));if(r){let c=u.reduce((f,g)=>f+g,0),p=e.indexOf(null);u[p]=Math.max(a,n-c)}let d=[0];for(let c of u)d.push(Math.round((d[d.length-1]+c)*100)/100);return r&&(d[d.length-1]=n),d}function Pm(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(t*a)),i=Math.max(1,Math.floor(n*a));(e.width!==r||e.height!==i)&&(e.width=r,e.height=i);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function pt(e){return Math.max(0,Math.min(1,e))}function td(e,t){let{ctx:n,w:a,h:r}=Pm(e);if(!n)return;n.clearRect(0,0,a,r);let i=gm(e);if(t.paint==="swatch"){let u=ge(e,"accent"),d=ge(e,"rhythm.step-cell-on");e.dataset.ncAccent=u,e.dataset.ncStep=d,n.fillStyle=u,n.fillRect(0,0,a/2,r),n.fillStyle=d,n.fillRect(a/2,0,a/2,r);return}if(t.paint==="filter"&&typeof t.hz=="number"){zm(n,a,r,t,e,i);return}if(t.paint==="filter"){let u=t.mode??"lp",d=ge(e,Hc(u)),c=ge(e,"divider"),p=pt(t.cutoff??.5),f=.08+(1-pt(t.resonance??.2))*.22;n.strokeStyle=c,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(a,r*.72),n.stroke(),n.beginPath();for(let g=0;g<=a;g++){let m=g/Math.max(1,a),w=0;u==="lp"?w=m<p?1:Math.max(0,1-(m-p)/f):u==="hp"?w=m>p?1:Math.max(0,1-(p-m)/f):w=Math.max(0,1-Math.abs(m-p)/f);let h=r*.78-w*r*.62;g===0?n.moveTo(g,h):n.lineTo(g,h)}n.strokeStyle=d,n.stroke(),n.fillStyle=ge(e,"text-sub"),n.font=i,n.fillText(u.toUpperCase(),0,r),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=ge(e,"accent");let u=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[c,p,f]=Im([u,d],t.max??[1,4],a),g=2,m=r-1;n.beginPath(),n.moveTo(c,m),n.lineTo(p,g);let w=Math.max(1,Math.ceil(f-p));for(let h=1;h<=w;h++){let y=h/w;n.lineTo(p+(f-p)*y,m-(m-g)*Math.exp(-4.6*y)*(1-y*.01))}n.lineTo(f,m),n.lineTo(a,m),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let u=Array.isArray(t.peaks)?t.peaks:[],[d,c]=Array.isArray(t.region)?t.region:[0,1],p=ge(e,"accent"),f=ge(e,"text-sub"),g=r/2;n.fillStyle=ge(e,"accent-soft"),n.fillRect(pt(d)*a,0,(pt(c)-pt(d))*a,r),n.strokeStyle=ge(e,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(a,g),n.stroke();let m=Math.floor(u.length/2);for(let w=0;w<m;w++){let h=(w+.5)/m*a,y=Math.max(-1,Math.min(1,u[w*2]??0)),k=Math.max(-1,Math.min(1,u[w*2+1]??0)),v=(w+.5)/m;n.strokeStyle=v>=d&&v<=c?p:f,n.beginPath(),n.moveTo(h,g-k*(g-1)),n.lineTo(h,g-y*(g-1)+.5),n.stroke()}n.strokeStyle=p;for(let w of[d,c,...Array.isArray(t.markers)?t.markers:[]]){let h=Math.round(pt(w)*(a-1))+.5;n.beginPath(),n.moveTo(h,0),n.lineTo(h,r),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=ge(e,"text"),n.fillRect(Math.round(pt(t.position)*(a-1)),0,1,r)),m||(n.fillStyle=f,n.font=i,n.fillText(t.empty??"Empty",0,g+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let u=pt(t.level??0);n.fillStyle=ge(e,"divider"),n.fillRect(0,r*.4,a,r*.2),n.fillStyle=ge(e,"accent"),n.fillRect(0,r*.4,a*u,r*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=ge(e,"rhythm.step-cell-off"),n.fillRect(0,r*.45,a,r*.1),n.fillStyle=ge(e,"rhythm.playhead"),n.fillRect(l/s*a,r*.3,Math.max(1,a/s),r*.4),e.dataset.ncAccent=ge(e,"accent")}var Vn=20,wi=2e4,_r=24,Os=-60;function Rm(e,t,n,a,r=48e3){let i=2*Math.PI*Math.min(t,r*.49)/r,s=Math.cos(i),l=Math.sin(i)/(2*n),u,d,c;e==="hp"?[u,d,c]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[u,d,c]=[l,0,-l]:[u,d,c]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,f=-2*s,g=1-l,m=2*Math.PI*a/r,w=(v,T,M)=>v+T*Math.cos(m)+M*Math.cos(2*m),h=(v,T)=>-(v*Math.sin(m)+T*Math.sin(2*m)),y=Math.hypot(w(u,d,c),h(d,c)),k=Math.hypot(w(p,f,g),h(f,g));return k>0?y/k:0}function Dm(e,t){return Math.log(Math.max(Vn,Math.min(wi,e))/Vn)/Math.log(wi/Vn)*t}function Bs(e,t,n){let a=Math.max(Os,Math.min(_r,e));return t+(_r-a)/(_r-Os)*(n-t)}function zm(e,t,n,a,r,i){let s=a.mode??"lp",l=ge(r,Hc(s)),u=ge(r,"divider"),d=ge(r,"text-sub"),c=Number.parseFloat(String(i).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,f=Math.max(p+4,n-c-3),g=a.q??Math.SQRT1_2,m=Math.round(Bs(0,p,f))+.5;e.strokeStyle=u,e.lineWidth=1,e.beginPath(),e.moveTo(0,m),e.lineTo(t,m),e.stroke(),e.beginPath();for(let w=0;w<=t;w++){let h=Vn*(wi/Vn)**(w/Math.max(1,t)),y=a.open?1:Rm(s,a.hz,g,h,a.sampleRate),k=Bs(20*Math.log10(Math.max(1e-5,y)),p,f);w===0?e.moveTo(w,k):e.lineTo(w,k)}if(e.strokeStyle=l,e.stroke(),!a.open){let w=Math.round(Dm(a.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(w,p),e.lineTo(w,f),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=i,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",r.dataset.ncAccent=l,r.dataset.ncFilterHz=String(Math.round(a.hz))}function Ue(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let r=n.defaultView.getComputedStyle(a).color;return a.remove(),r}function Om(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var Ht=20,la=2e4,po=Math.log(la/Ht),xi=32,Bm=250,jm=-100,qm=1200,_m=4.5,js=-6,Rt=-96,Vm=48,qs=[100,1e3,1e4],Hm=[6,12];function un(e,t){return Math.log(Math.max(Ht,Math.min(la,e))/Ht)/po*t}function Pa(e,t){return Ht*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*po)}function $t(e,t,n,a){let r=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*r}function ki(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var nd=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Um(e,t,n,a){let r=n?3:1,i=u=>({db:Math.max(-a,Math.min(a,e.db+u*r))}),s=u=>({hz:Math.max(e.minHz??Ht,Math.min(e.maxHz??la,e.hz*2**(u*r/6)))}),l=u=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(u*r)))});switch(t){case"ArrowUp":return i(1);case"ArrowDown":return i(-1);case"ArrowRight":return e.moveHz?s(1):i(1);case"ArrowLeft":return e.moveHz?s(-1):i(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function ho(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function Gm(e,t,n,a,r,i,s,l,u){let d=u?.25:1,c={},p=Math.max(1,i/2-l);if(c.db=Math.max(-s,Math.min(s,t.db-a*d/p*s/ho(e))),e.moveHz){let f=t.hz*Math.exp(n*d/Math.max(1,r)*po);c.hz=Math.max(e.minHz??Ht,Math.min(e.maxHz??la,f))}return c}function Wm(e,t,n,a,r){let i=Math.max(0,n.left)+1,s=Math.min(n.right,r)-1,l=Math.min(t.width*3+a*2,s-i),u=Math.max(i,Math.min(e.left,s-l));return{left:Math.round(u-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var we=new WeakMap;function Km(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let r=document.createElement("canvas");r.className="nc-eq-spectrum",r.setAttribute("aria-hidden","true");let i=document.createElement("canvas");i.className="nc-eq-curve",i.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(r,i);for(let u of e.bands)a.append(Ym(n,u,t));a.append(s),a.addEventListener("click",u=>{if(!ld(n)||u.button>0)return;let d=sd(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),we.set(n,{control:e,cache:null,spec:null,active:null}),rd(n,e),n}function ad(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function Ym(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let r=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},i=()=>r()?.bands.find(d=>d.id===t.id)??null,s=null;a.addEventListener("pointerdown",d=>{if(d.button!==0)return;let c=i();c&&(d.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(d.pointerId),s={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:c.hz,db:c.db}},a.dataset.drag="true",ht(e,t.id))}),a.addEventListener("pointermove",d=>{if(!s||d.pointerId!==s.id)return;let c=r(),p=i(),f=we.get(e);if(!c||!p||!f?.box)return;let{w:g,h:m,pad:w}=f.box;c.onBand(p.id,Gm(p,s.start,d.clientX-s.x,d.clientY-s.y,g,m,c.range??18,w,d.shiftKey))});let l=d=>{!s||d.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&ht(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",d=>{d.preventDefault(),r()?.onReset?.(t.id)}),a.addEventListener("keydown",d=>{let c=r(),p=i();if(!c||!p)return;let f=Um(p,d.key,d.shiftKey,c.range??18);f&&(d.preventDefault(),f==="reset"?c.onReset?.(p.id):c.onBand(p.id,f),ht(e,p.id))});let u=null;return a.addEventListener("wheel",d=>{let c=r(),p=i();if(!c||!p?.moveQ)return;d.preventDefault();let f=d.timeStamp;(!u||f-u.t>400)&&(u={q:p.q,t:f});let g=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;u.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,u.q*2**(-g/240))),u.t=f,c.onBand(p.id,{q:u.q}),ht(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>ht(e,t.id)),a.addEventListener("focus",()=>ht(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&ht(e,null)}),a.addEventListener("blur",()=>{s||ht(e,null)}),a}function ht(e,t){let n=we.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?yn(e):fo(e)}function fo(e){let t=we.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(m=>m.id===t.active):null;for(let m of e.querySelectorAll(".nc-eq-node"))m instanceof HTMLElement&&(a&&m.dataset.band===a.id?m.dataset.active="true":delete m.dataset.active);if(!a||!t.box){n.hidden=!0;return}let r=[a.label,nd(a.db)];a.kind==="peak"?r.push(ki(a.hz),`Q ${a.q.toFixed(1)}`):r.push(`${a.kind==="lowshelf"?"below":"above"} ${ki(a.hz)}`),n.textContent=r.join(" · "),n.dataset.tone=String(Xm(t.control,a)),n.hidden=!1;let{w:i,h:s,pad:l}=t.box,u=un(a.hz,i),d=$t(a.db*ho(a),s,t.control.range??18,l),c=n.offsetWidth,p=n.offsetHeight,f=Math.max(0,Math.min(i-c,u-c/2)),g=d-p-l*1.5>=0?d-p-l*1.5:Math.min(s-p,d+l*1.5);n.style.left=`${Math.round(f)}px`,n.style.top=`${Math.round(g)}px`}function Xm(e,t){return e.bands.indexOf(t)%3+1}function rd(e,t){let n=we.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",mo(e);let a=t.range??18;t.bands.forEach((r,i)=>{let s=ad(e,r.id);s instanceof HTMLElement&&(s.dataset.tone=String(i%3+1),s.dataset.kind=r.kind,s.setAttribute("aria-label",`${r.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(r.db)),s.setAttribute("aria-valuetext",r.valueText??`${nd(r.db)}, ${ki(r.hz)}`),s.setAttribute("aria-keyshortcuts",r.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),r.help?s.setAttribute("data-nc-help",r.help):s.removeAttribute("data-nc-help"))}),yn(e),ng(e)}function id(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.round(t*a)),i=Math.max(1,Math.round(n*a));(e.width!==r||e.height!==i)&&(e.width=r,e.height=i);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function od(e){return{curve:Ue(e,"eq-curve"),fill:Ue(e,"eq-fill"),quiet:Ue(e,"text-sub"),grid:Ue(e,"eq-grid"),zero:Ue(e,"divider"),label:Ue(e,"text-sub"),spectrum:Ue(e,"eq-spectrum"),bands:[Ue(e,"eq-band-1"),Ue(e,"eq-band-2"),Ue(e,"eq-band-3")]}}function Jm(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function yn(e){we.has(e)&&mo(e);let t=we.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:r,w:i,h:s}=id(n);if(!r)return;let l=Math.max(8,Math.round(s*.06)),u=a.range??18;t.box={w:i,h:s,pad:l},t.colours=od(e);let d=t.colours,c=Jm(a,i);if(!t.cache||t.cache.key!==c){let T=Math.max(64,Math.ceil(i)+1),M=new Float64Array(T);for(let x=0;x<T;x++)M[x]=Pa(x/(T-1)*i,i);let b=null;try{b=typeof a.response=="function"?a.response(M):null}catch{b=null}t.cache={key:c,freqs:M,total:b?.total??new Float64Array(T),bands:b?.bands??[]}}r.clearRect(0,0,i,s);let p=Om(e),f=a.on!==!1;Qm(r,i,s,u,l,d,p);let{freqs:g,total:m,bands:w}=t.cache,h=Array.from(g,T=>un(T,i)),y=$t(0,s,u,l);w.forEach((T,M)=>{if(!T||!T.some(S=>Math.abs(S)>.05))return;let b=f?d.bands[M%3]:d.quiet,x=Array.from(T,S=>$t(S,s,u,l));r.save(),t.active&&a.bands[M]?.id===t.active&&(r.globalAlpha=.14,r.fillStyle=b,_s(r,h,x,y)),r.globalAlpha=f?.75:.4,r.strokeStyle=b,r.lineWidth=.75,Vr(r,h,x),r.restore()});let k=Array.from(m,T=>$t(T,s,u,l)),v=f?d.curve:d.quiet;r.save(),r.fillStyle=f?d.fill:d.quiet,r.globalAlpha=f?.2:.08,_s(r,h,k,y),r.restore(),r.save(),r.strokeStyle=f?d.fill:v,r.lineJoin="round",r.lineCap="round",f&&(r.globalAlpha=.16,r.lineWidth=4,Vr(r,h,k)),r.globalAlpha=1,r.strokeStyle=v,r.lineWidth=1.25,Vr(r,h,k),r.restore(),Zm(e),fo(e)}function Qm(e,t,n,a,r,i,s){e.save(),e.lineWidth=1;for(let u=10;u<=1e4;u*=10)for(let d=1;d<=9;d++){let c=u*d;if(c<Ht||c>la)continue;let p=Math.round(un(c,t))+.5;e.globalAlpha=qs.includes(c)?.9:.35,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let u of Hm)if(!(u>a))for(let d of[1,-1]){let c=Math.round($t(u*d,n,a,r))+.5;e.globalAlpha=u===12?.75:.4,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(0,c),e.lineTo(t,c),e.stroke()}e.globalAlpha=1,e.strokeStyle=i.zero;let l=Math.round($t(0,n,a,r))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=i.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let u of qs){let d=u>=1e3?`${u/1e3}k`:String(u),c=e.measureText(d).width,p=un(u,t)+3;e.fillText(d,p+c+2>t?un(u,t)-c-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let u of[12,0,-12]){if(Math.abs(u)>a)continue;let d=$t(u,n,a,r);e.fillText(u>0?`+${u}`:u<0?`−${-u}`:"0",t-3,Math.round(d)-1)}e.restore()}function Za(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let r=(t[a]+t[a+1])/2,i=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],r,i)}e.lineTo(t[t.length-1],n[n.length-1])}function Vr(e,t,n){e.beginPath(),Za(e,t,n),e.stroke()}function _s(e,t,n,a){e.beginPath(),Za(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function sd(e){return e.closest("[data-nc-maxable]")}function ld(e){let t=sd(e);return!!t&&!t.hasAttribute("data-nc-max")}function mo(e){let t=ld(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=we.get(e);n?.active&&(n.active=null,fo(e))}return t}function Zm(e){mo(e);let t=we.get(e);if(!t?.box)return;let{w:n,h:a,pad:r}=t.box,i=t.control.range??18;for(let s of t.control.bands){let l=ad(e,s.id);l instanceof HTMLElement&&(l.style.left=`${un(s.hz,n).toFixed(1)}px`,l.style.top=`${$t(s.db*ho(s),a,i,r).toFixed(1)}px`)}}function eg(e,t,n,a){let r=a/2/n,i=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let u=0;u<e;u++){let d=(u-.5)/(e-1)*t,c=(u+.5)/(e-1)*t,p=Pa(d,t),f=Pa(c,t),g=Pa(u/(e-1)*t,t);i[u]=Math.min(n-1,p/r),s[u]=Math.min(n-1,f/r),l[u]=_m*Math.log2(g/1e3)}return{lo:i,hi:s,tilt:l}}function tg(e,t,n){let a=Math.floor(t),r=Math.ceil(n);if(r-a<=1){let s=t-a,l=e[a]??-1/0,u=e[Math.min(e.length-1,a+1)]??l;return l+(u-l)*s}let i=-1/0;for(let s=a;s<=r&&s<e.length;s++)e[s]>i&&(i=e[s]);return i}function ng(e){let t=we.get(e);if(t){if(!t.control.spectrum){dd(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let r=we.get(e)?.spec;r&&(r.visible=a.some(i=>i.isIntersecting),$i(e))}),t.spec.io.observe(e)):t.spec.visible=!0}$i(e)}}function $i(e){let t=we.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){cd(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Ei(e),n.onVis||(n.onVis=()=>$i(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Si(e,!1)}function Ei(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function Si(e,t){let n=we.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,Hr(e,Ei(e))),Bm):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(r=>(n.raf=0,Hr(e,r))):n.timer=a.setTimeout(()=>(n.timer=0,Hr(e,Ei(e))),xi))}function cd(e){let t=we.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function dd(e){let t=we.get(e)?.spec;if(!t)return;cd(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=we.get(e);n&&(n.spec=null)}function Hr(e,t){let n=we.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){dd(e);return}if(!a.analyser)return;if(t-a.last<xi-4&&!a.idle){Si(e,!1);return}let r=a.last?Math.min(.25,(t-a.last)/1e3):xi/1e3;a.last=t;let i=e.querySelector(".nc-eq-spectrum");if(!(i instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:u}=id(i);if(!s)return;let d=Math.max(16,Math.round(l/2)),c=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==d||a.map.w!==l||a.map.sr!==c)&&(a.map={cols:d,w:l,sr:c,...eg(d,l,a.buf.length,c)},a.disp=new Float32Array(d).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,f=Vm*r,{lo:g,hi:m,tilt:w}=a.map;for(let y=0;y<d;y++){let k=tg(a.buf,g[y],m[y]);k>p&&(p=k);let v=k+w[y],T=a.disp[y]-f;a.disp[y]=v>T?v:T}p>jm&&(a.loud=t);let h=t-a.loud>qm;s.clearRect(0,0,l,u),(!h||a.disp.some(y=>y>Rt))&&ag(s,l,u,a.disp,n.colours??od(e)),a.idle=h&&!a.disp.some(y=>y>Rt),Si(e,a.idle)}function ag(e,t,n,a,r){let i=a.length,s=new Array(i),l=new Array(i),u=d=>{let c=a[Math.max(0,Math.min(i-1,d))];return Number.isFinite(c)?c:Rt};for(let d=0;d<i;d++){let c=u(d)*.36+(u(d-1)+u(d+1))*.22+(u(d-2)+u(d+2))*.1,p=(Math.max(Rt,Math.min(js,Number.isFinite(c)?c:Rt))-Rt)/(js-Rt);s[d]=d/(i-1)*t,l[d]=n-p*n}e.save(),e.fillStyle=r.spectrum,e.globalAlpha=.13,e.beginPath(),Za(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=r.spectrum,e.lineWidth=1,e.beginPath(),Za(e,s,l),e.stroke(),e.restore()}var Pe=new WeakMap,rg=450,ig=6,og=33,Ur=24,sg="http://www.w3.org/2000/svg";function lg(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function cg(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function dg(e,t,n,a,r){let i=e.slice();if(t===a)return i[a]=r,i;let s=t<a?1:-1;for(let l=t;l!==a+s;l+=s){let u=(l-t)/(a-t);i[l]=Math.round((n+(r-n)*u)*100)/100}return i}function ug(e,t){let n=e.steps[t],a=(e.shapes??[]).find(i=>i.value===n.shape),r=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${a?`, ${a.label}`:""}${r}`}function Dt(e,t){let n=document.createElementNS(sg,e);for(let[a,r]of Object.entries(t))n.setAttribute(a,String(r));return n}function ud(e){let t=Dt("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(Dt("path",{d:e})),t}function pg(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-lsteps-plot",a.tabIndex=0,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical"),a.setAttribute("aria-valuemin","0"),a.setAttribute("aria-valuemax","100"),a.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let r=document.createElement("div");r.className="nc-lsteps-axis",r.setAttribute("aria-hidden","true");let i=document.createElement("div");i.className="nc-lsteps-shapes",i.setAttribute("role","tablist");let s=document.createElement("div");s.className="nc-lsteps-pick",s.setAttribute("role","menu"),s.hidden=!0,n.append(a,r,i,s);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let u={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return Pe.set(n,u),fg(n,a),mg(n,s),pd(n,e),n}function Oe(e){let t=Pe.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function hg(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function Gr(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),a=hg(e);return{i:cg(t.clientX,a),level:lg(t.clientY-n.top,n.height)}}function fg(e,t){let n=Pe.get(e),a=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",i=>{let s=Oe(e);if(!s||i.button>0||!s.steps.length)return;i.preventDefault(),er(e),t.setPointerCapture?.(i.pointerId);let l=Gr(t,i),u=s.steps.map(d=>d.level);n.drag={id:i.pointerId,x:i.clientX,y:i.clientY,start:u,levels:u,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,Vs(e,l.i,l.level,l.i,l.level,!1),a(),n.timer=setTimeout(()=>{n.timer=0;let d=n.drag;!d||d.moved||(d.long=!0,Oe(e)?.onLevels(d.start.slice(),!0),Wr(e,d.i))},rg)}),t.addEventListener("pointermove",i=>{let s=n.drag;if(!s||s.id!==i.pointerId||s.long||!s.moved&&Math.hypot(i.clientX-s.x,i.clientY-s.y)<ig)return;s.moved=!0,a();let l=Gr(t,i);Vs(e,s.i,s.level,l.i,l.level,!1),s.i=l.i,s.level=l.level});let r=i=>{let s=n.drag;!s||s.id!==i.pointerId||(a(),n.drag=null,t.releasePointerCapture?.(i.pointerId),s.long||Oe(e)?.onLevels(s.levels.slice(),!0),Ai(e,-1))};t.addEventListener("pointerup",r),t.addEventListener("pointercancel",i=>{let s=n.drag;!s||s.id!==i.pointerId||(a(),n.drag=null,s.long||Oe(e)?.onLevels(s.start.slice(),!0),Ai(e,-1))}),t.addEventListener("contextmenu",i=>{Oe(e)?.onShape&&(i.preventDefault(),Wr(e,Gr(t,i).i))}),t.addEventListener("keydown",i=>{let s=Oe(e);if(!s||!s.steps.length)return;let l=s.steps.length,u=Math.min(n.focus,l-1),d=s.steps[u].level,c=p=>{let f=s.steps.map(g=>g.level);f[u]=Math.round(Math.max(0,Math.min(1,p))*100)/100,s.onLevels(f,!0)};switch(i.key){case"ArrowLeft":n.focus=(u-1+l)%l;break;case"ArrowRight":n.focus=(u+1)%l;break;case"ArrowUp":c(d+(i.shiftKey?.01:.05));break;case"ArrowDown":c(d-(i.shiftKey?.01:.05));break;case"PageUp":c(d+.25);break;case"PageDown":c(d-.25);break;case"Home":c(1);break;case"End":c(0);break;case"Enter":case" ":if(!s.onShape)return;Wr(e,u);break;default:return}i.preventDefault(),Mi(e)}),t.addEventListener("focus",()=>Mi(e)),t.addEventListener("blur",()=>{for(let i of t.querySelectorAll("[data-focus]"))i.removeAttribute("data-focus")})}function Vs(e,t,n,a,r,i){let s=Pe.get(e).drag;s&&(s.levels=dg(s.levels,t,n,a,r),Ai(e,a,s.levels[a]),Oe(e)?.onLevels(s.levels.slice(),i))}function Ai(e,t,n){for(let a of e.querySelectorAll(".nc-lsteps-step"))Number(a.dataset.i)===t?(a.dataset.dragging="true",a.dataset.level=`${Math.round(n*100)}%`):a.removeAttribute("data-dragging")}function Mi(e){let t=Pe.get(e),n=e.querySelector(".nc-lsteps-plot"),a=Oe(e);if(!n||!a)return;for(let i of n.querySelectorAll(".nc-lsteps-step"))Number(i.dataset.i)===t.focus?i.dataset.focus="true":i.removeAttribute("data-focus");let r=Math.min(t.focus,a.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((a.steps[r]?.level??0)*100))),n.setAttribute("aria-valuetext",ug(a,r))}function mg(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),er(e,!0);return}let a=[...t.querySelectorAll("button")],r=a.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),a[(r+1)%a.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),a[(r-1+a.length)%a.length]?.focus())}),Pe.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&er(e)}}function Wr(e,t){let n=Oe(e),a=e.querySelector(".nc-lsteps-pick"),r=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!a||!r)return;let i=Pe.get(e);i.focus=t,a.textContent="";let s=document.createElement("span");s.className="nc-lsteps-pick-head",s.textContent=`Step ${t+1}`,a.append(s);for(let g of n.shapes??[]){let m=document.createElement("button");m.type="button",m.setAttribute("role","menuitemradio"),m.setAttribute("aria-checked",n.steps[t]?.shape===g.value?"true":"false"),g.icon&&m.append(ud(g.icon)),m.append(document.createTextNode(g.label)),m.addEventListener("click",()=>{Oe(e)?.onShape?.(t,g.value),er(e,!0)}),a.append(m)}a.setAttribute("aria-label",`Shape of step ${t+1}`),a.hidden=!1,e.ownerDocument.addEventListener("pointerdown",i.outside,!0);let l=r.querySelector(`.nc-lsteps-step[data-i="${t}"]`),u=e.getBoundingClientRect(),d=l?.getBoundingClientRect(),c=a.getBoundingClientRect().width,p=d?d.left+d.width/2-u.left:0,f=Math.max(0,Math.min(u.width-c,p-c/2));a.style.setProperty("--nc-lsteps-pick-x",`${Math.round(f)}px`),a.querySelector('[aria-checked="true"]')?.focus?.()??a.querySelector("button")?.focus?.()}function er(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",Pe.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function gg(e,t){let n=Pe.get(e),a=e.querySelector(".nc-lsteps-plot"),r=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,a.textContent="",r.textContent="";for(let i=0;i<t;i++){let s=document.createElement("div");s.className="nc-lsteps-step",s.dataset.i=String(i),i%4===0&&i>0&&(s.dataset.beat="true");let l=Dt("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(Dt("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),Dt("path",{class:"nc-lsteps-env",d:""}),Dt("path",{class:"nc-lsteps-top",d:""}),Dt("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),s.append(l),a.append(s);let u=document.createElement("span");i%4===0&&(u.textContent=String(i+1)),i%4===0&&i>0&&(u.dataset.beat="true"),r.append(u)}}}function pd(e,t){let n=Pe.get(e);if(!n)return;n.control=t;let a=t.steps.length;gg(e,a),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let r=e.querySelector(".nc-lsteps-plot");r.setAttribute("aria-label",t.label??"Steps");let i=Math.max(.5,Math.min(.75,t.swing??.5)),s=r.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((g,m)=>{let w=s[m];if(!w)return;let h=String((m%2?1-i:i)*2);w.style.setProperty("--nc-lsteps-grow",h),l[m]?.style.setProperty("--nc-lsteps-grow",h),t.played!==void 0&&m>=t.played?w.dataset.out="true":w.removeAttribute("data-out"),w.dataset.zero=g.level<=0?"true":"false";let y=Math.max(0,Math.min(1,g.level)),k=w.querySelector(".nc-lsteps-level");k.setAttribute("y",String(100-y*100)),k.setAttribute("height",String(y*100));let v=t.curve?t.curve(m,Ur):null,T="M0 100",M="";for(let b=0;b<=Ur;b++){let x=v?Math.max(0,Math.min(1,v[b]??y)):y,S=b/Ur*100,$=100-x*100;T+=` L${S.toFixed(2)} ${$.toFixed(2)}`,M+=`${b?" L":"M"}${S.toFixed(2)} ${$.toFixed(2)}`}w.querySelector(".nc-lsteps-env").setAttribute("d",`${T} L100 100 Z`),w.querySelector(".nc-lsteps-top").setAttribute("d",M)});let u=e.querySelector(".nc-lsteps-shapes"),d=(t.shapes??[]).map(g=>`${g.value}:${g.label}`).join();if(d!==n.shapeKey){n.shapeKey=d,u.textContent="";for(let g of t.shapes??[]){let m=document.createElement("button");m.type="button",m.className="nc-lsteps-shape",m.setAttribute("role","tab"),m.dataset.shape=String(g.value),g.icon&&m.append(ud(g.icon)),m.append(document.createTextNode(g.label)),m.addEventListener("click",()=>Oe(e)?.onShapeAll?.(g.value)),u.append(m)}}u.hidden=!(t.shapes?.length&&t.onShapeAll),u.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let c=t.played??a,p=t.steps[0]?.shape,f=t.steps.slice(0,c).every(g=>g.shape===p);for(let g of u.querySelectorAll(".nc-lsteps-shape")){let m=f&&g.dataset.shape===String(p);g.setAttribute("aria-selected",m?"true":"false"),g.tabIndex=m||!f&&g===u.firstElementChild?0:-1}n.focus>=a&&(n.focus=0),Mi(e),n.last=-2,bg(e)}function bg(e){let t=Pe.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&Kr(e,null);return}let a=0,r=i=>{if(t.loop=0,!e.isConnected||!t.control.playhead){Kr(e,null);return}i-a>=og&&(a=i,Kr(e,t.control.playhead())),t.loop=n.requestAnimationFrame(r)};t.loop=n.requestAnimationFrame(r)}function Kr(e,t){let n=Pe.get(e),a=t&&Number.isInteger(t.step)?t.step:-1,r=!!t?.locked;if(!(n.last===a&&n.lastLocked===r)){n.last=a,n.lastLocked=r;for(let i of e.querySelectorAll(".nc-lsteps-step"))Number(i.dataset.i)===a?(i.dataset.playhead="true",i.dataset.locked=r?"true":"false"):(i.removeAttribute("data-playhead"),i.removeAttribute("data-locked"));e.dataset.free=t&&!r?"true":"false"}}var yg=.8912509381337456,Ti=32,vg=250,wg=1200,xg=.2,hd=1.5;function kg(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function $g(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let r=e.createElement("span");r.className="nc-fx-level-fill",a.append(r),t.append(a)}return t}var tr=new WeakMap,Hs=new WeakMap;function Us(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let r=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),i=Number.parseFloat(r);return Number.isFinite(i)?r.endsWith("ms")?i/1e3:i:n}function Eg(e){let t=Hs.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(r=>{for(let i of r){let s=tr.get(i.target);s&&(s.seen.set(i.target,i.isIntersecting),Hn(s))}an(t)})),e.addEventListener("visibilitychange",()=>{for(let r of t.recs)Hn(r);an(t)}),Hs.set(e,t),t}var fd=e=>e.els.some(t=>t.isConnected);function Sg(e){if(!e.loop.io)return fd(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function Hn(e){let t=!e.dead&&!!e.source&&Sg(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=go(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Ni(e))}function go(e){return e.doc.defaultView?.performance?.now()??Date.now()}function an(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){md(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=go(e)),!e.raf&&!e.timer&&Li(e,!1)}function Li(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>Gs(e,go(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),vg):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(r=>(e.raf=0,Gs(e,r))):e.timer=n.setTimeout(()=>(e.timer=0,a()),Ti)}function md(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Gs(e,t){if(t-e.last<Ti-4&&!e.idle&&e.last){Li(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):Ti/1e3;e.last=t,e.frames++;let a=!1,r=!1;for(let i of e.recs){if(!fd(i)){(i.placed||e.frames-i.born>90)&&gd(i);continue}i.placed=!0,i.open&&(r=!0,Ag(i,n,t)&&(e.loud=t),(i.disp[0]>0||i.disp[1]>0)&&(a=!0))}if(!r){md(e);return}e.idle=t-e.loud>wg&&!a,Li(e,e.idle)}function Ag(e,t,n){if(e.fall<0){let f=e.els[0];e.fall=Us(f,"motion-meter-fall",xg),e.hold=Us(f,"motion-meter-hold",hd)}let a=null;try{a=e.source.read()}catch{a=null}let r=typeof a=="number",i=r?a:Number(a?.in)||0,s=!r&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,u=s?"2":"1";if(e.rows!==u){e.rows=u;for(let f of e.els)f.dataset.ncRows=u}let d=e.fall>0?Math.exp(-t/e.fall):0,c=[i,l],p=!1;for(let f=0;f<2;f++){let g=kg(c[f]);g>0&&(p=!0),e.disp[f]=g>=e.disp[f]?g:g+(e.disp[f]-g)*d,e.disp[f]<.001&&(e.disp[f]=0),c[f]>=yg&&(e.clipAt[f]=n);let m=e.clipAt[f]>0&&n-e.clipAt[f]<e.hold*1e3;Ci(e,f,e.disp[f],m)}return p}function Ci(e,t,n,a){let r=Math.round(n*1e3)/1e3,i=a?"true":"false";if(!(e.shown[t]===r&&e.clipShown[t]===i)){e.shown[t]=r,e.clipShown[t]=i;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${r})`,l.dataset.clip=i)}}}function Ni(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Ci(e,0,0,!1),Ci(e,1,0,!1)}function gd(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),tr.get(t)===e&&tr.delete(t)}function Mg(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,r=Eg(a),i={els:n,source:t??null,loop:r,open:!1,dead:!1,seen:new Map,born:r.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:hd,rows:""};for(let s of n)tr.set(s,i),r.io?.observe(s);if(r.recs.add(i),Ni(i),!r.io){let s=a.defaultView,l=()=>{Hn(i),an(r)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!i.dead){if(l===i.source){Hn(i),an(r);return}i.open&&(i.open=!1,i.source?.close?.(),Ni(i)),i.source=l,Hn(i),an(r)}},destroy(){i.dead||gd(i),an(r)}}}var bd={slop:8,longPressMs:500,pitchPx:16},Tg=class{constructor(e,t,n=bd){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let r=this.hit(t,n);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let r=t-this.x0,i=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(r,i)<this.config.slop)return;Math.abs(i)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-i/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Lg(e,t,n,a=bd){let r=!1,i=0,s=(d,c)=>{let p=e.ownerDocument.elementFromPoint?.(d,c),f=[...e.querySelectorAll(t)],g=p?f.findIndex(h=>h===p||h.contains(p)):-1;if(g>=0)return g;let m=-1,w=Number.POSITIVE_INFINITY;return f.forEach((h,y)=>{if(h.hidden)return;let k=h.getBoundingClientRect();if(c<k.top||c>k.bottom)return;let v=Math.abs(d-(k.left+k.width/2));v<w&&v<=k.width&&(m=y,w=v)}),m},l=new Tg(s,d=>{(d.kind==="paint"||d.kind==="long")&&(r=!0),n(d)},a),u=()=>{i&&clearTimeout(i),i=0};return e.addEventListener("pointerdown",d=>{d.button>0||(r=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(u(),i=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&u())}),e.addEventListener("pointerup",d=>{u(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{u(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{r&&(r=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var yd="netcomposer.groups.v1";function bo(){try{return globalThis.localStorage??null}catch{return null}}function vd(e=bo(),t=yd){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[r,i]of Object.entries(n))typeof i=="boolean"&&a.set(r,i);return a}catch{return new Map}}function Cg(e,t,n,a=yd){let r=vd(e,a);r.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(r)))}catch{}}function Ng(e,t=bo()){return vd(t).get(e.id)??e.open===!0}function Fg(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let r=document.createElement("button");r.type="button",r.className="nc-group-toggle",r.id=`${e.id}-group-toggle`;let i=document.createElement("span");i.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),r.append(i,s,l);let u=document.createElement("div");u.className="nc-group-body",u.id=`${e.id}-group-body`,u.setAttribute("role","group"),u.setAttribute("aria-labelledby",r.id),r.setAttribute("aria-controls",u.id);for(let d of e.controls)u.append(n(d,t));return r.addEventListener("click",()=>{let d=a.dataset.ncOpen!=="true";Cg(bo(),e.id,d),Fi(a,d);let c=t(a);c?.type==="group"&&c.onToggle?.(d)}),a.append(r,u),wd(a,e),Fi(a,Ng(e)),xd(a,e),a}function Fi(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let r=n?.querySelector(".nc-group-mark");r&&(r.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function wd(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function xd(e,t){wd(e,t)&&Fi(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),r=t.summary??"";a&&a.textContent!==r&&(a.textContent=r)}var xa="application/x-nc-pad",Ws="http://www.w3.org/2000/svg";function Ig(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],r=[];for(let i=0;i<n;i++){let s=Math.floor(i*t/n),l=Math.max(s+1,Math.floor((i+1)*t/n)),u=0,d=0;for(let p=s;p<l;p++)u=Math.min(u,e[2*p]??0),d=Math.max(d,e[2*p+1]??0);let c=n===1?50:i/(n-1)*100;a.push(`${c.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),r.push(`${c.toFixed(1)} ${(10-Math.max(-1,u)*10).toFixed(2)}`)}return`M${a.join("L")}L${r.reverse().join("L")}Z`}function Pg(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((r,i)=>a.append(Rg(n,i,t))),n.append(a),n.addEventListener("keydown",r=>{r.key==="Escape"&&Ra(n)}),$d(n,e),n}function Rg(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let r=document.createElement("span");r.className="nc-padgrid-pad-bar",r.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let u=document.createElementNS(Ws,"svg");u.setAttribute("class","nc-padgrid-pad-wave"),u.setAttribute("viewBox","0 0 100 20"),u.setAttribute("preserveAspectRatio","none"),u.setAttribute("aria-hidden","true");let d=document.createElementNS(Ws,"path");return u.append(d),a.append(r,i,s,l,u),zg(e,a,t,n),i.addEventListener("dblclick",()=>{let c=n(e);c?.type==="padGrid"&&c.onRename&&a.dataset.empty!=="true"&&kd(e,a,t,n)}),a.addEventListener("dragstart",c=>{if(a.dataset.empty==="true"||!c.dataTransfer){c.preventDefault();return}c.dataTransfer.setData(xa,String(t)),c.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",c=>{let p=c.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(xa)||(c.preventDefault(),c.stopPropagation(),c.dataTransfer&&(c.dataTransfer.dropEffect=p.includes(xa)&&!c.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",c=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let f=c.dataTransfer?.getData(xa);if(f!==void 0&&f!==""){c.preventDefault(),c.stopPropagation();let m=Number(f);m!==t&&p.onMove?.(m,t,c.altKey);return}let g=c.dataTransfer?.files?.[0];g&&(c.preventDefault(),c.stopPropagation(),p.onFile?.(t,g))}),a}function Dg(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function zg(e,t,n,a){let r=0,i=!1,s=0,l=0,u=()=>{window.clearTimeout(r),r=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;i=!1,s=d.clientX,l=d.clientY,u();let c=a(e);c?.type==="padGrid"&&(c.onDown?.(n),!(c.onDown&&d.pointerType==="mouse")&&(r=window.setTimeout(()=>{r=0,i=Ks(e,t,n,a)},450)))}),t.addEventListener("pointermove",d=>{r&&Math.hypot(d.clientX-s,d.clientY-l)>8&&u()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,u);t.addEventListener("contextmenu",d=>{d.preventDefault(),u(),i=Ks(e,t,n,a)}),t.addEventListener("click",()=>{if(i){i=!1;return}Dg(e,n,a)})}function Ks(e,t,n,a){let r=a(e);if(r?.type!=="padGrid"||!r.menu)return!1;let i=r.menu(n);if(!i.length)return!1;Ra(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),Ra(e)}),s.addEventListener("click",c=>c.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let c of i){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=c.id,p.textContent=c.label,p.addEventListener("click",()=>{Ra(e);let f=a(e);f?.type==="padGrid"&&(c.id==="rename"&&f.onRename?kd(e,t,n,a):f.onMenu?.(n,c.id))}),l.append(p)}e.append(s,l);let u=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-u.left}px`,l.style.top=`${d.bottom-u.top}px`,l.querySelector("button")?.focus(),!0}function kd(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let r=a(e);if(r?.type!=="padGrid")return;let i=document.createElement("input");i.type="text",i.className="nc-padgrid-rename",i.maxLength=r.nameMax??24,i.value=r.pads[n]?.label??"",i.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-s.left}px`,i.style.top=`${l.top-s.top}px`,i.style.width=`${l.width}px`;let u=!1,d=c=>{if(u)return;u=!0;let p=i.value.trim();i.remove(),t.focus();let f=a(e);c&&p&&f?.type==="padGrid"&&f.onRename?.(n,p)};i.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"?d(!0):c.key==="Escape"&&d(!1)}),i.addEventListener("blur",()=>d(!0));for(let c of["pointerdown","click","dblclick"])i.addEventListener(c,p=>p.stopPropagation());e.append(i),i.focus(),i.select()}function Ra(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function $d(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,r)=>{let i=n[r];if(!(i instanceof HTMLButtonElement))return;let s=i.querySelector(".nc-padgrid-pad-name"),l=i.querySelector(".nc-padgrid-pad-hint"),u=i.querySelector(".nc-padgrid-pad-wave path"),d=i.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=a.empty?"":a.badge??""),i.draggable=!a.empty,a.empty?(i.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),u?.setAttribute("d","")):(delete i.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=a.hint??""),u?.setAttribute("d",Ig(a.peaks))),!a.empty&&a.hint?i.dataset.hint="true":delete i.dataset.hint,a.lane?i.dataset.ncLane=String(a.lane):delete i.dataset.ncLane;let c=t.selected===r;c?i.dataset.selected="true":delete i.dataset.selected,i.setAttribute("aria-pressed",c?"true":"false"),a.playing?i.dataset.playing="true":delete i.dataset.playing,i.setAttribute("aria-label",a.empty?`Pad ${r+1}, empty: load a sample`:`Pad ${r+1}, ${a.label}${a.hint?`, ${a.hint}`:""}${a.badgeLabel?`, ${a.badgeLabel}`:""}${c?", selected":""}`)})}function Te(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function br(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(a,r),n}function Ys(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function Qn(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Og=450,Xs=8;function We(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Bg(e){let t=mm(e,"target-min");return t>0?t:44}function jg(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=Bg(e),a=n/2,r=t.map(i=>i.parentElement?.getBoundingClientRect()??null);for(let i=0;i<t.length;i++){let s=t[i],l=r[i];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let u=l.left+l.width/2,d=l.top+l.height/2,c=u-a,p=u+a,f=d-a,g=d+a;for(let m=0;m<t.length;m++){if(i===m)continue;let w=r[m];if(!w||w.width===0)continue;let h=w.left+w.width/2,y=w.top+w.height/2;Math.abs(y-d)<a*2&&(h>u?p=Math.min(p,(u+h)/2):h<u&&(c=Math.max(c,(u+h)/2))),Math.abs(h-u)<a*2&&(y>d?g=Math.min(g,(d+y)/2):y<d&&(f=Math.max(f,(d+y)/2)))}c=Math.min(c,l.left),p=Math.max(p,l.right),f=Math.min(f,l.top),g=Math.max(g,l.bottom),s.style.left=`${c-l.left}px`,s.style.top=`${f-l.top}px`,s.style.width=`${Math.max(0,p-c)}px`,s.style.height=`${Math.max(0,g-f)}px`,s.style.transform="none"}}function Ed(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Js(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function _t(e,t){switch(e.type){case"slider":return qg(e,t);case"select":return Vg(e,t);case"toggle":return Hg(e,t);case"button":return Ug(e,t);case"readout":return Gg(e);case"label":return Xg(e);case"note":return Qs(e);case"knob":return Zg(e,t);case"choice":return eb(e,t);case"slotRow":return tb(e,t);case"stepGrid":return ib(e,t);case"canvas":return cb(e);case"fx":return yb(e,t);case"eqGraph":return Km(e,t);case"levelSteps":return pg(e,t);case"group":return Fg(e,t,_t);case"strip":return db(e,t);case"stripAdd":return fb(e,t);case"padGrid":return Pg(e,t);case"moves":return Kg(e,t);default:return Qs({id:"unknown",text:""})}}function Be(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Md(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(Sd(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let r=e.querySelector("[data-nc-readout]");r&&(r.textContent=t.valueText??Qn(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Ys(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")Ys(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&Et(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Jg(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??Qn(t.value))}else if(t.type==="choice")Td(e,t);else if(t.type==="slotRow")Cd(e,t);else if(t.type==="stepGrid")Pi(e,t);else if(t.type==="padGrid")$d(e,t);else if(t.type==="moves")Ad(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&td(n,t)}else if(t.type==="eqGraph")rd(e,t);else if(t.type==="levelSteps")pd(e,t);else if(t.type==="strip"){Pd(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${Vt(n.id)}"]`);a instanceof Element&&Be(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Fd(e,t);else if(t.type==="group"){xd(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${Vt(n.id)}"]`);a instanceof Element&&Be(a,n)}}else if(t.type==="fx"){Vd(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${Vt(n.id)}"]`);a instanceof Element&&Be(a,n)}}}}function qg(e,t){let n=br(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let r=gr(e.taper,e.min,e.max);a.min=String(r?0:e.min),a.max=String(r?1e3:e.max),a.step=String(r?1:e.step),r&&(a.dataset.ncTaper=e.taper),a.value=String(Sd(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let i=l=>r?vi(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(i(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(i(l))}),r&&a.addEventListener("keydown",l=>{let u=t(a);if(u?.type!=="slider"||a.disabled)return;let d=u.taper??e.taper,c=ed(d,u.min,u.max,u.value,l.key,l.shiftKey,u.step);c!==null&&(l.preventDefault(),a.value=String(uo(d,u.min,u.max,c)),u.onChange(c),u.onCommit?.(c))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(_g(e,a,t),s),n.append(Te()),Be(n,e),n}function Sd(e){return gr(e.taper,e.min,e.max)?uo(e.taper,e.min,e.max,e.value):e.value}function _g(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(We());let r=i=>{let s=n(t);s?.type==="slider"&&s.onTap?.(i)};return a.addEventListener("pointerdown",i=>{i.button===0&&r(i.timeStamp)}),a.addEventListener("keydown",i=>{i.repeat||i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),r(i.timeStamp))}),a}function Vg(e,t){let n=br(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let r=null;for(let i of e.options){let s=document.createElement("option");s.value=i.value,s.textContent=i.label,i.disabled&&(s.disabled=!0),i.group?r?.getAttribute("label")!==i.group&&(r=document.createElement("optgroup"),r.setAttribute("label",i.group),a.append(r)):r=null,(r??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let i=t(a);i?.type==="select"&&i.onChange(a.value)}),n.append(a,Te()),n}function Hg(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(Te()),Be(n,e),n}function Ug(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let i=t(n);i?.type==="button"&&i.onPress()}),n.append(Te()),Be(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=e.id,r.setAttribute("aria-label","Surprise me"),r.title=e.sparkleTitle??"Surprise me",r.innerHTML=Ed(),r.addEventListener("click",()=>{let i=n.closest(".nc-module")?.querySelector(".nc-slot-row");i instanceof HTMLElement&&Nd(i);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,r),a}function Gg(e){let t=br(e.id,e.label);return t.append(Te()),Be(t,e),t}var Wg=450;function Kg(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let r=document.createElement("div");r.className="nc-moves-row",r.setAttribute("role","group"),r.setAttribute("aria-label",a.label),a.title&&(r.title=a.title);let i=document.createElement("span");i.className="nc-moves-label",i.setAttribute("aria-hidden","true"),i.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let u=document.createElement("button");u.type="button",u.className="nc-moves-btn",u.dataset.ncMove=l.id,u.title=l.title??l.text,u.setAttribute("aria-label",`${a.label} ${l.text}`),u.append(Yg(l.icon)),u.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),s.append(u)}r.append(i,s),n.append(r)}return Ad(n,e),n}function Ad(e,t){for(let n of t.groups)for(let a of n.moves){let r=e.querySelector(`[data-nc-move="${Vt(a.id)}"]`);r instanceof HTMLButtonElement&&(r.disabled=a.disabled===!0)}}function Yg(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function Xg(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(Te()),t}function Qs(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(Te()),t}function Zs(e){if(typeof e.valueText=="string")return e.valueText;let t=Qn(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Md(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Jg(e,t){let n=Qa(t.taper,t.min,t.max,t.value);Md(e,t.modulated===!0);let a=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(a)),t.bipolar){let r=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(Qa(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(a,r))),e.style.setProperty("--knob-to",String(Math.max(a,r)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",Zs(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${Zs(t)}`}function Qg(e,t){if(gr(e.taper,e.min,e.max))return ed(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,r=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+r:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-r:null}function Zg(e,t){let n=br(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let r=document.createElement("i");r.className="nc-knob-mark",a.append(r);let i=0,s=0;a.addEventListener("pointerdown",d=>{i=d.clientY;let c=t(a);s=c&&"value"in c?Number(c.value):0,a.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",d=>{if(a.hasPointerCapture&&!a.hasPointerCapture(d.pointerId))return;let c=t(a);if(c?.type!=="knob")return;if(gr(c.taper,c.min,c.max)){let g=Qa(c.taper,c.min,c.max,s)-(d.clientY-i)/120;c.onChange(Qc(c.taper,c.min,c.max,g));return}let p=c.max-c.min||1,f=Math.min(c.max,Math.max(c.min,s-(d.clientY-i)*p/120));c.onChange(f)}),a.addEventListener("dblclick",()=>{let d=t(a);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),a.addEventListener("keydown",d=>{let c=t(a);if(c?.type!=="knob")return;let p=Qg(c,d);p!==null&&(d.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,p))))});let u=n.querySelector("[data-nc-readout]");return n.insertBefore(a,u),n.append(Te()),Be(n,e),n}function eb(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let a=document.createElement("span");a.className="nc-label nc-choice-caption",a.setAttribute("aria-hidden","true"),a.textContent=e.caption,n.dataset.ncCaption="",n.append(a)}for(let a of e.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=a.value,r.setAttribute("role","tab"),r.textContent=a.label,r.addEventListener("click",()=>{let i=t(n);i?.type==="choice"&&i.onChange(a.value)}),r.addEventListener("keydown",i=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),u=l;if(i.key==="ArrowRight"||i.key==="ArrowDown")u=(l+1)%s.length;else if(i.key==="ArrowLeft"||i.key==="ArrowUp")u=(l-1+s.length)%s.length;else if(i.key==="Home")u=0;else if(i.key==="End")u=s.length-1;else return;let d=s[u];d instanceof HTMLButtonElement&&(i.preventDefault(),d.focus(),d.click())}),n.append(r)}return n.append(Te()),Td(n,e),n}function Td(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function tb(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let c=0;c<e.slots.length;c++){let p=e.slots[c],f=document.createElement("span");f.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(c),g.textContent=p.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(g,We()),nb(f,g,n,c,t),a.append(f)}let r=e.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=Ed(),r.append(We()),r.addEventListener("click",()=>{Nd(n);let c=t(n);c?.type==="slotRow"&&c.onSparkle?.()}));let i=document.createElement("div");i.className="nc-field nc-morph-field",i.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let c=t(n);c?.type==="slotRow"&&c.onMorph(Number(l.value))});let u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",i.append(s,u,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(a,...r?[r]:[]),n.append(d,i,Te()),Ld(n,t),Cd(n,e),n}function el(e,t,n,a){let r=n(e);if(r?.type!=="slotRow")return;zn(e);let i=a.shiftKey?"store":a.altKey?"clear":"recall";r.onSlot(t,i)}function nb(e,t,n,a,r){let i=0,s=0,l=0,u=!1,d=!1,c=!1,p=!1,f=()=>{window.clearTimeout(i),i=0},g=y=>{let k=y.clientX-s,v=y.clientY-l;k*k+v*v>Xs*Xs&&(u=!0,f())},m=()=>{p&&(p=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",h))},w=y=>{let k=i!==0&&!u&&!d;f(),m(),k&&(c=!0,el(n,a,r,y))},h=()=>{u=!0,f(),m()};e.addEventListener("pointerdown",y=>{y.button===0&&(m(),d=!1,u=!1,c=!1,s=y.clientX,l=y.clientY,f(),i=window.setTimeout(()=>{i=0,!u&&(d=!0,ab(n,t,a,r))},Og),p=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",h))}),e.addEventListener("contextmenu",y=>y.preventDefault()),e.addEventListener("click",y=>{if(c||d||u){c=!1,d=!1,u=!1;return}el(n,a,r,y)})}function Ld(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=tl("Save","store"),r=tl("Clear","clear");n.append(a,r);let i=document.createElement("div");i.className="nc-slot-scrim",i.hidden=!0,i.setAttribute("aria-hidden","true"),i.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),zn(e)}),i.addEventListener("click",s=>s.stopPropagation()),e.append(i,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let u=t(e);if(u?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(u.onSlot(d,"store"),zn(e)):l.dataset.ncSlotOp==="clear"&&(u.onSlot(d,"clear"),zn(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&zn(e)})}function tl(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function ab(e,t,n,a){Ld(e,a);let r=e.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let i=e.querySelector(".nc-slot-scrim");i instanceof HTMLElement&&(i.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function zn(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Cd(e,t){for(let r of e.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let i=Number(r.dataset.ncSlot),s=t.slots[i];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function Nd(e){let t=e.dataset.ncLastFill||null,n=em(t);e.dataset.ncLastFill=n;let a=tm(n);if(a)for(let[r,i]of Object.entries(a))e.style.setProperty(r,i)}function rb(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,r=i=>{if(a===i)return;a=i,n.setAttribute("aria-pressed",i?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(i)};n.addEventListener("pointerdown",i=>{i.button===0&&(i.preventDefault(),n.setPointerCapture?.(i.pointerId),r(!0))});for(let i of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(i,()=>r(!1));return n.addEventListener("keydown",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),i.repeat||r(!0))}),n.addEventListener("keyup",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),r(!1))}),n.addEventListener("contextmenu",i=>i.preventDefault()),n}function ib(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let r=h=>{let y=document.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.textContent=h,a.append(y),y},i=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=h=>{for(let y of[i,s]){let k=y===h;y.setAttribute("aria-checked",k?"true":"false"),y.tabIndex=k?0:-1}};l(i);for(let h of[i,s])h.addEventListener("click",()=>l(h));a.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();let y=s.getAttribute("aria-checked")==="true"?i:s;l(y),y.focus()});let u=document.createElement("div");if(u.className="nc-step-tools",u.append(a),e.onFill&&u.append(rb(n,t)),e.onClear){let h=document.createElement("button");h.type="button",h.className="nc-fill nc-clear",h.dataset.ncClear="",h.textContent=e.clearLabel??"Clear",h.title="Clear every step (Undo takes it back)",h.addEventListener("click",()=>{let y=t(n);y?.type==="stepGrid"&&y.onClear?.()}),u.append(h)}n.append(u);for(let h of e.rows){let y=document.createElement("div");y.className="nc-row",y.dataset.ncRow="";let k=document.createElement("button");k.type="button",k.className="nc-name",k.textContent=h.label,k.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(k.dataset.ncLane=String((h.lane-1)%4+1));let v=!1,T=0;k.addEventListener("pointerdown",x=>{v=!1,!(x.pointerType==="mouse"||x.button!==0)&&(T=window.setTimeout(()=>{let S=t(n);S?.type!=="stepGrid"||!S.selectedRows||(v=!0,S.onSelectRow?.(S.rows.findIndex($=>$.id===h.id),!0))},Wg))});for(let x of["pointerup","pointercancel","pointerleave"])k.addEventListener(x,()=>window.clearTimeout(T));k.addEventListener("contextmenu",x=>{v&&x.preventDefault()}),k.addEventListener("click",x=>{let S=t(n);if(S?.type!=="stepGrid")return;if(v){v=!1;return}let $=S.rows.findIndex(N=>N.id===h.id),L=!!S.selectedRows&&(x.shiftKey||x.metaKey||x.ctrlKey);S.onSelectRow?.($,L)}),k.addEventListener("keydown",x=>ob(n,k,x));let M=[];for(let x of["mute","solo"]){if(!(x==="mute"?e.onMute:e.onSolo))continue;let S=document.createElement("span");S.className="nc-ms-wrap";let $=document.createElement("button");$.type="button",$.className="nc-ms",$.dataset.ncMs=x,$.textContent=x==="mute"?"M":"S",$.setAttribute("aria-label",`${x==="mute"?"Mute":"Solo"} ${h.label}`),S.append($,We()),S.addEventListener("click",()=>{let L=t(n);if(L?.type!=="stepGrid")return;let N=L.rows.findIndex(B=>B.id===h.id);(x==="mute"?L.onMute:L.onSolo)?.(N)}),M.push(S)}let b=document.createElement("div");b.className="nc-steps";for(let x=0;x<h.steps.length;x++){let S=document.createElement("span");S.className="nc-step-wrap";let $=document.createElement("button");$.type="button",$.className="nc-step",$.dataset.ncStep=`${h.id}:${x}`,$.setAttribute("aria-label",`${h.label} step ${x+1}`),S.append($,We()),S.addEventListener("click",L=>{let N=t(n);if(N?.type!=="stepGrid")return;let B=N.rows.findIndex(K=>K.id===h.id),V=s.getAttribute("aria-checked")==="true";N.onToggle(B,x,L.shiftKey||V)}),b.append(S)}if(e.onLength&&b.append(sb(n,b,h,t)),y.append(...M,k,b),e.onDice){let x=document.createElement("button");x.type="button",x.className="nc-sparkle nc-row-dice",x.dataset.ncDice=h.id,x.setAttribute("aria-label",`Re-roll ${h.label}`),x.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,x.innerHTML=Js(),x.append(We()),x.addEventListener("click",()=>{let S=t(n);S?.type==="stepGrid"&&S.onDice?.(S.rows.findIndex($=>$.id===h.id))}),y.append(x)}y.addEventListener("click",x=>{if(x.target!==y)return;let S=t(n);S?.type==="stepGrid"&&S.onSelectRow?.(S.rows.findIndex($=>$.id===h.id))}),nl(n,b,".nc-step-wrap",t,s,()=>h.id),n.append(y)}let d=document.createElement("div");d.className="nc-pads-head";let c=(h,y,k)=>{let v=document.createElement("button");return v.type="button",v.className=h,v.textContent=y,k&&v.setAttribute("aria-label",k),v},p=c("nc-pads-step","‹","Previous lane"),f=c("nc-pads-step","›","Next lane"),g=document.createElement(e.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),e.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let h=t(n);h?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Pi(n,h))}));for(let[h,y]of[[p,-1],[f,1]])h.addEventListener("click",()=>{let k=t(n);if(k?.type!=="stepGrid"||k.rows.length===0)return;let v=k.rows.length;k.onSelectRow?.(((ka(k)+y)%v+v)%v)});if(d.append(p,g,f),e.onDice){let h=c("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=Js(),h.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid")return;let k=ka(y);k>=0&&y.onDice?.(k)}),d.append(h)}if(e.transport){let h=c("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{let y=t(n);y?.type==="stepGrid"&&y.transport?.onToggle()}),d.append(h)}n.append(d);let m=document.createElement("div");m.className="nc-pads",m.setAttribute("role","group");let w=Math.max(0,...e.rows.map(h=>h.steps.length));for(let h=0;h<w;h++){let y=document.createElement("button");y.type="button",y.className="nc-pad",y.dataset.ncPad=String(h),y.textContent=String(h+1),y.addEventListener("click",k=>{let v=t(n);if(v?.type!=="stepGrid")return;let T=ka(v);if(T<0)return;if(n.dataset.ncLenMode==="true"){v.onLength?.(T,h+1);return}let M=s.getAttribute("aria-checked")==="true";v.onToggle(T,h,k.shiftKey||M)}),m.append(y)}return nl(n,m,".nc-pad",t,s,()=>{let h=t(n);return h?.type==="stepGrid"?h.rows[ka(h)]?.id:void 0}),n.append(m),n.append(Te()),Pi(n,e),n}function ka(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function nl(e,t,n,a,r,i){let s="on",l=!0,u=-1,d=(c,p)=>{let f=c.rows[u]?.steps[p];!f||p>=c.rows[u].length||(c.onSet?c.onSet(u,p,s,l):!!f[s]!==l&&c.onToggle(u,p,s==="accent"))};Lg(t,n,c=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(c.kind!=="paint")return;let f=p.rows.findIndex(g=>g.id===i());f>=0&&p.rows[f].length!==c.pad+1&&p.onLength?.(f,c.pad+1);return}if(c.kind==="paint"){if(c.phase==="start"){let f=i();u=p.rows.findIndex(m=>m.id===f);let g=p.rows[u]?.steps[c.pad];if(!g)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[s]}d(p,c.pad)}else if(c.kind==="long"){let f=i(),g=p.rows.findIndex(w=>w.id===f),m=t.querySelectorAll(n)[c.pad];g>=0&&m instanceof HTMLElement&&p.onLongPress?.(g,c.pad,m)}}})}function ob(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],r=a.indexOf(t),i=r;n.key==="ArrowDown"?i=r+1:n.key==="ArrowUp"?i=r-1:n.key==="Home"?i=0:i=a.length-1;let s=a[i];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function sb(e,t,n,a){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(We());let i=d=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.findIndex(m=>m.id===n.id),f=c.rows[p];if(!f)return;let g=Math.max(1,Math.min(f.steps.length,d));g!==f.length&&c.onLength?.(p,g)},s=d=>{let c=[...t.querySelectorAll(".nc-step")],p=1;return c.forEach((f,g)=>{let m=f.getBoundingClientRect();m.width>0&&d>=m.left+m.width/2&&(p=g+1)}),p},l=d=>i(s(d.clientX)),u=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete r.dataset.dragging};return r.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),r.addEventListener("keydown",d=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.find(g=>g.id===n.id);if(!p)return;let f={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};d.key in f&&(d.preventDefault(),i(f[d.key]))}),r}var Yr=new WeakMap,$a=new WeakMap;function lb(e){return e?($a.has(e)||($a.set(e,Ja(e)),_c(t=>{$a.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))Ii(n,Number(n.getAttribute("data-nc-velocity")))},e)),$a.get(e)):"light"}function Ii(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:lb(e.ownerDocument),r=n===null?null:`${a} ${n}`;if(!(Yr.has(e)&&Yr.get(e)===r)){if(Yr.set(e,r),n===null){for(let i of Object.keys(Fs(1)))e.style.removeProperty(i);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[i,s]of Object.entries(Fs(n,Ns[a]??Ns.light)))e.style.setProperty(i,s)}}function Pi(e,t){let n=t.rows.some(c=>c.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let r=e.querySelector(".nc-pads"),i=t.rows.find(c=>c.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&i&&(s.textContent=l?`${i.label} · ${i.length}`:i.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${i.label} length ${i.length} steps: tap or drag the pads to set the end, tap here when done`:`${i.label}, ${i.length} steps: tap to set the length`)));let u=e.querySelector("[data-nc-pads-dice]");u instanceof HTMLElement&&i&&(u.setAttribute("aria-label",`Re-roll ${i.label}`),u.title=`Re-roll ${i.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let c=!!t.transport?.playing,p=t.transport?.label??(c?"Stop":"Play");d.textContent!==p&&(d.textContent=p),d.setAttribute("aria-pressed",c?"true":"false");let f=t.transport?.ariaLabel;f?d.setAttribute("aria-label",f):d.removeAttribute("aria-label")}if(r instanceof HTMLElement&&i){r.setAttribute("aria-label",`${i.label} steps`),i.lane&&(r.dataset.ncLane=String((i.lane-1)%4+1)),i.mute||n&&!i.solo?r.dataset.silent="true":delete r.dataset.silent;let c=i.length>0?(t.playhead%i.length+i.length)%i.length:-1;for(let p of r.querySelectorAll("[data-nc-pad]")){let f=Number(p.getAttribute("data-nc-pad")),g=i.steps[f];p instanceof HTMLButtonElement&&(p.hidden=!g||!l&&f>=i.length,l&&f>=i.length?p.dataset.out="true":delete p.dataset.out,l&&f===i.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${i.label} step ${f+1}`),p.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?p.dataset.accent="true":delete p.dataset.accent,g?.dim?p.dataset.dim="true":delete p.dataset.dim,Ii(p,g?.velocity),t.playhead>=0&&f===c?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let c of t.rows){for(let g=0;g<c.steps.length;g++){let m=c.steps[g],w=e.querySelector(`[data-nc-step="${c.id}:${g}"]`);if(!(w instanceof HTMLButtonElement))continue;let h=w.closest(".nc-row");if(h instanceof HTMLElement){t.selectedRow===c.id?h.dataset.selected="true":delete h.dataset.selected;let v=t.selectedRow!==c.id&&(t.selectedRows??[]).includes(c.id);v?h.dataset.picked="true":delete h.dataset.picked;let T=h.querySelector(".nc-name");T instanceof HTMLElement&&(T.setAttribute("aria-pressed",t.selectedRow===c.id||v?"true":"false"),T.textContent!==c.label&&(T.textContent=c.label,T.setAttribute("aria-label",`Select ${c.label}`))),c.mute||n&&!c.solo?h.dataset.silent="true":delete h.dataset.silent;for(let M of h.querySelectorAll("[data-nc-ms]")){let b=M.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;M.setAttribute("aria-pressed",b?"true":"false")}}w.setAttribute("aria-pressed",m.on?"true":"false"),m.accent?w.dataset.accent="true":delete w.dataset.accent,m.dim?w.dataset.dim="true":delete w.dataset.dim,g%4===0?w.dataset.bar="true":delete w.dataset.bar,typeof m.velocity=="number"?(w.dataset.velocity="true",w.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,m.velocity))*100)}%`)):(delete w.dataset.velocity,w.style.removeProperty("--level")),Ii(w,m.velocity);let y=t.playhead>=0&&c.length>0?(t.playhead%c.length+c.length)%c.length:-1;g===y?w.dataset.playhead="true":delete w.dataset.playhead;let k=!!t.onLength&&t.selectedRow===c.id;w.hidden=g>=c.length&&!k,g>=c.length&&k?w.dataset.out="true":delete w.dataset.out}let p=e.querySelector(`[data-nc-len="${c.id}"]`),f=e.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&f&&f.nextElementSibling!==p){let g=document.activeElement===p;f.after(p),g&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(c.length)),p.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),p.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function cb(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,Te()),t}function db(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let r=document.createElement("span");r.className="nc-strip-name",r.dataset.ncStripName="";let i=!e.master&&typeof e.onFold=="function",s=null;i&&(n.dataset.ncFoldable="",s=Od(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let v=t(n);v?.type==="strip"&&(v.onFold?.(v.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(r);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let v=document.createElement("span");v.className="nc-strip-grip-dots",v.setAttribute("aria-hidden","true"),l.append(v),l.addEventListener("keydown",T=>{if(T.key!=="ArrowLeft"&&T.key!=="ArrowRight"||T.ctrlKey||T.metaKey||T.shiftKey)return;let M=t(n);M?.type==="strip"&&(T.preventDefault(),M.onMove?.(T.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>il(n,l,t))),!e.master&&typeof e.onShade=="function"&&a.addEventListener("contextmenu",v=>{v.pointerType==="touch"||v.pointerType==="pen"||v.target instanceof Element&&v.target.closest("input, .nc-strip-remove")||(v.preventDefault(),il(n,a,t,{x:v.clientX,y:v.clientY}))}),e.onRemove){let v=document.createElement("button");v.type="button",v.className="nc-strip-remove",v.dataset.ncStripRemove="",v.textContent="×",v.addEventListener("click",()=>{let T=t(n);T?.type==="strip"&&T.onRemove?.(v)}),a.append(v)}let u=document.createElement("div");if(u.className="nc-strip-hacks",e.onHacks){let v=document.createElement("span");v.className="nc-hacks-wrap";let T=document.createElement("button");T.type="button",T.className="nc-hacks",T.dataset.ncHacks="",v.append(T,We()),v.addEventListener("click",()=>{let M=t(n);M?.type==="strip"&&M.onHacks?.()}),u.append(v)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let v=document.createElement("span");v.className="nc-hacks-wrap nc-sends-view-wrap";let T=document.createElement("button");T.type="button",T.className="nc-hacks nc-sends-view",T.dataset.ncSendsView="",v.append(T,We()),v.addEventListener("click",()=>{let M=t(n);M?.type==="strip"&&M.onSendsView?.()}),d.append(v)}for(let v of["mute","solo"]){if(!(v==="mute"?e.onMute:e.onSolo))continue;let T=document.createElement("span");T.className="nc-ms-wrap";let M=document.createElement("button");M.type="button",M.className="nc-ms",M.dataset.ncMs=v,M.textContent=v==="mute"?"M":"S",T.append(M,We()),T.addEventListener("click",()=>{let b=t(n);b?.type==="strip"&&(v==="mute"?b.onMute:b.onSolo)?.()}),d.append(T)}let c=document.createElement("div");c.className="nc-strip-sends";for(let v of e.sends??[])c.append(_t({...v,type:"knob",compact:!0},t));let p=document.createElement("div");p.className="nc-strip-pan",e.pan&&p.append(_t(yo(e),t));let f=document.createElement("div");f.className="nc-strip-body";let g=document.createElement("span");g.className="nc-scale",g.setAttribute("aria-hidden","true");for(let v of e.ticks??[]){let T=document.createElement("span");T.className="nc-scale-tick",T.style.setProperty("--tick-pos",String(v.value)),T.textContent=v.label,g.append(T)}let m=$m({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:v=>{let T=t(n);T?.type==="strip"&&T.onChange(v)},onReset:()=>{let v=t(n);v?.type==="strip"&&rl(v)}}),w=Lm({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let v=t(n);v?.type==="strip"&&v.onClipClear?.()}});if(f.append(g,m.el,w.el),i){let v=document.createElement("button");v.type="button",v.className="nc-ui-fx-fold nc-strip-fold",v.dataset.ncStripFold="",v.setAttribute("aria-expanded","false");let T=document.createElement("span");T.className="nc-strip-fold-cap",T.setAttribute("aria-hidden","true");let M=document.createElement("span");M.className="nc-ui-fx-fold-name",M.dataset.ncStripFoldName="";let b=document.createElement("span");b.className="nc-strip-fold-pan",b.setAttribute("aria-hidden","true"),b.hidden=!e.pan,v.append(T,b,M),v.addEventListener("click",()=>{let x=t(n);if(x?.type!=="strip")return;x.onFold?.(!1);let S=n.querySelector("[data-nc-strip-hide]");S instanceof HTMLElement&&S.focus()}),f.prepend(v)}let h=document.createElement("button");h.type="button",h.className="nc-strip-db",h.dataset.ncReadout="";let y=0;h.addEventListener("click",v=>{let T=t(n);T?.type!=="strip"||!T.onTypeIn||(window.clearTimeout(y),v.detail===0?al(n,h,t):v.detail===1&&(y=window.setTimeout(()=>al(n,h,t),hb)))}),h.addEventListener("dblclick",()=>{window.clearTimeout(y);let v=t(n);v?.type==="strip"&&rl(v)});let k=document.createElement("div");return k.className="nc-strip-trim",e.trim&&k.append(_t(vo(e),t)),s&&n.append(s),l&&n.append(l),n.append(a,k,u,d,c,p,f,h,Te()),Pd(n,e),n}function yo(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??pb(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function vo(e){let t=e.trim,n=t.min??-12,a=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:a,step:t.step??.5,value:t.value,valueText:t.valueText??ub(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:r=>t.onChange(r)}}function ub(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function pb(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var hb=250;function al(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=a.valueText??Qn(a.value),r.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(r),r.focus(),r.select?.();let i=!1,s=l=>{if(i)return;i=!0;let u=r.value;if(r.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(u)}t.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function fb(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let i=document.createElement("span");i.className="nc-strip-add-label",a.append(r,i);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),u=s.value;Id(s),l?.type==="stripAdd"&&u&&l.onAdd(u)}),n.append(a,s,Te()),Fd(n,e),n}function Fd(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let r=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],i=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");i!==s&&(a.replaceChildren(...r.map(l=>{let u=document.createElement("option");return u.value=l.value,u.textContent=l.label,u.disabled=l.disabled===!0,u})),Id(a))}function Id(e){let t=e.options[0];t&&(t.selected=!0)}function rl(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Pd(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let r=e.querySelector(".nc-fader"),i=r?Em(r):void 0;i&&(i.configure({step:t.step}),i.set(t.value),i.setText(t.valueText),i.setLabel(`${t.label} level`)),Jc(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let m=t.valueText??Qn(t.value);s.textContent!==m&&(s.textContent=m),s.setAttribute("aria-label",`${t.label} level ${m}`);let w=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${w}`:w}for(let m of e.querySelectorAll("[data-nc-ms]")){let w=m.getAttribute("data-nc-ms"),h=w==="mute"?t.mute===!0:t.solo===!0;m.setAttribute("aria-pressed",h?"true":"false"),m.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let m=t.hacksLabel??"Hacks";l.textContent!==m&&(l.textContent=m),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${m}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let u=e.querySelector("[data-nc-sends-view]");if(u){let m=t.sendsViewLabel??"Sends";u.textContent!==m&&(u.textContent=m),u.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),u.setAttribute("aria-label",`${m}: ${t.sendsView===!0?"hide":"show"} the send effects`),u.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),Et(u,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let c=Rd(t);if(c?e.dataset.ncShade=String(c):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let m=e.querySelector(`.nc-strip-trim [data-nc-id="${Vt(t.trim.id)}"]`);m&&Be(m,vo(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let m=e.querySelector(`.nc-strip-pan [data-nc-id="${Vt(t.pan.id)}"]`);m&&Be(m,yo(t))}let p=!t.master&&typeof t.onFold=="function"&&t.folded===!0;p?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let f=e.querySelector("[data-nc-strip-hide]");f instanceof HTMLElement&&(Bd(f,p,t.label),Et(f,t.foldHelp));let g=e.querySelector("[data-nc-strip-fold]");if(g instanceof HTMLElement){g.hidden=!p,g.setAttribute("aria-label",`Expand ${t.label}`);let m=g.querySelector("[data-nc-strip-fold-name]");m&&m.textContent!==t.label&&(m.textContent=t.label),Et(g,t.foldedHelp??t.foldHelp)}}function Rd(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=Dd?t:0}var Dd=8,Ea=null;function il(e,t,n,a){Ea?.();let r=n(e);if(r?.type!=="strip")return null;let i=e.ownerDocument,s=i.defaultView??globalThis,l=i.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${r.label}: shade and place`);let u=i.createElement("div");u.className="nc-strip-menu-title",u.id=`nc-strip-menu-title-${String(r.id).replace(/[^\w-]/g,"")}`,u.textContent="Shade";let d=i.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",u.id);let c=Rd(r),p=e.querySelector("[data-nc-strip-grip]")??t,f=(y=!1)=>{if(Ea!==f)return;Ea=null;let k=l.contains(i.activeElement);l.remove(),i.removeEventListener("keydown",m,!0),i.removeEventListener("pointerdown",w,!0),s.removeEventListener("resize",h),(y||k)&&p?.isConnected&&p.focus?.({preventScroll:!0})},g=[0,...Array.from({length:Dd},(y,k)=>k+1)].map(y=>{let k=i.createElement("button");return k.type="button",k.setAttribute("role","radio"),k.setAttribute("aria-checked",y===c?"true":"false"),k.setAttribute("tabindex",y===c?"0":"-1"),k.dataset.ncShadeChoice=String(y),y===0?(k.textContent="Auto",k.setAttribute("aria-label","Auto: alternate light and dark"),k.title="Auto: alternate light and dark"):(k.textContent=String(y),k.setAttribute("aria-label",`Shade ${y}`),k.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${y})`)),k.addEventListener("click",()=>{let v=n(e);f(!0),v?.type==="strip"&&v.onShade?.(y===0?null:y)}),k});if(d.append(...g),d.addEventListener("keydown",y=>{let k=g.indexOf(i.activeElement);if(k<0)return;let v=-1;y.key==="ArrowRight"||y.key==="ArrowDown"?v=(k+1)%g.length:y.key==="ArrowLeft"||y.key==="ArrowUp"?v=(k-1+g.length)%g.length:y.key==="Home"?v=0:y.key==="End"&&(v=g.length-1),!(v<0)&&(y.preventDefault(),g[k].setAttribute("tabindex","-1"),g[v].setAttribute("tabindex","0"),g[v].focus())}),l.append(u,d),typeof r.onMove=="function"){let y=[...e.parentElement?.children??[]].filter(v=>v.classList?.contains("nc-strip")&&!v.hasAttribute("data-nc-master")),k=y.indexOf(e);for(let[v,T,M]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let b=i.createElement("button");b.type="button",b.className="nc-strip-menu-item",b.dataset.ncStripMove=v<0?"left":"right";let x=i.createElement("span");x.textContent=T;let S=i.createElement("kbd");S.textContent=M,S.setAttribute("aria-hidden","true"),b.append(x,S),b.disabled=v<0?k<=0:k<0||k>=y.length-1,b.addEventListener("click",()=>{let $=n(e);f(!0),$?.type==="strip"&&$.onMove?.(v)}),l.append(b)}}i.body.append(l),(()=>{let y=t.getBoundingClientRect?.()??{bottom:0,right:0},k=l.offsetWidth,v=l.offsetHeight,T=s.innerWidth||i.documentElement.clientWidth||k,M=s.innerHeight||i.documentElement.clientHeight||v,b=a?a.x:y.right-k,x=a?a.y:y.bottom+4;b=Math.max(4,Math.min(b,T-k-4)),x+v>M-4&&(x=Math.max(4,(a?a.y:y.top)-v-4)),l.style.left=`${Math.round(b)}px`,l.style.top=`${Math.round(x)}px`})();let m=y=>{if(y.key==="Escape")y.preventDefault(),y.stopPropagation(),f(!0);else if(y.key==="Tab"&&l.contains(i.activeElement)){let k=[...l.querySelectorAll("button:not([disabled])")].filter(T=>T.getAttribute("tabindex")!=="-1"),v=(k.indexOf(i.activeElement)+(y.shiftKey?-1:1)+k.length)%k.length;y.preventDefault(),k[v]?.focus()}},w=y=>{l.contains(y.target)||f(!1)},h=()=>f(!1);return i.addEventListener("keydown",m,!0),i.addEventListener("pointerdown",w,!0),s.addEventListener("resize",h),Ea=f,(g.find(y=>y.getAttribute("tabindex")==="0")??g[0]).focus({preventScroll:!0}),{el:l,close:()=>f(!1)}}function ol(e,t){let n=e?.querySelector?.(`.nc-strip[data-nc-id="${Vt(t)}"]`);return Jc(n?.querySelector(".nc-meter")??void 0)}var Ri=typeof ResizeObserver=="function"?new ResizeObserver(mb):null;function mb(e){for(let t of e){if(!t.target.isConnected){Ri.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&gb(n)}}function gb(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,r=n instanceof HTMLElement?n.offsetHeight:0,i=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+r+i}px`)}function bb(e){if(Ri)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))Ri.observe(t)}function yb(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let r=typeof e.onFold=="function",i=!!e.meter,s=typeof e.onRemove=="function";if(e.on===void 0&&!r&&!nr(e)&&!i&&!s)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),i&&l.append(qd(n,"head")),e.on!==void 0){let u=lo({checked:e.on,labelledBy:a.id,onChange:d=>{let c=t(u.el);c?.type==="fx"&&c.onToggle?.(d)}});u.el.dataset.ncFxSwitch="",l.append(u.el)}r&&l.append(wb(n,t)),nr(e)&&l.append(Eb(n,t)),s&&l.append(Sb(t)),n.append(l)}r&&n.prepend(xb(n,t)),i&&_d(n,e);for(let l of e.controls)n.append(_t(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let u=document.createElement("summary");u.textContent=e.moreLabel??"More",l.append(u);for(let d of e.more)l.append(_t(d,t));n.append(l)}return n.append(Te()),Vd(n,e),bb(n),n}var vb=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function zd(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&vb(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function wb(e,t){let n=Od();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),zd(e))}),n}function Od(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Bd(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function xb(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let r=document.createElement("span");r.className="nc-ui-fx-fold-name",r.dataset.ncFxFoldName="";let i=document.createElement("span");return i.className="nc-fold-tri",i.setAttribute("aria-hidden","true"),n.append(i,a,r),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(qd(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),zd(e)}}),n}var vn=new Set;function Da(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var nr=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),kb="(max-width: 768px)";function $b(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function Eb(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append($b()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(jd(e,a,!vn.has(a.id)),n.focus())}),n}function Sb(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function jd(e,t,n){n?vn.add(t.id):vn.delete(t.id),wo(e,t)}function Ab(e,t){t?.type==="fx"&&vn.has(t.id)&&jd(e,t,!1)}function Mb(e){return e.ownerDocument.defaultView?.matchMedia?.(kb).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function wo(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=nr(t)&&vn.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!nr(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Da(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&yn(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",Et(n,t.maxHelp)),!a){e.dataset.ncMax&&sl(e);return}if(!e.isConnected){let s=()=>e.isConnected&&vn.has(t.id)&&wo(e,t);queueMicrotask(()=>{e.isConnected?s():Da(e.ownerDocument,s)});return}let r=Mb(e),i=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;i>0&&e.style.setProperty("--nc-fx-dials",String(i)),e.dataset.ncMax!==r&&(e.dataset.ncMax&&sl(e),e.dataset.ncMax=r,r==="over"&&Tb(e,t)),Lb(e.ownerDocument),r==="over"&&xo(e),Da(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&yn(s)})}function sl(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Da(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&yn(n)})}function Tb(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let r=e.querySelector("[data-nc-fx-max]");r instanceof HTMLElement&&r.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function xo(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,r=e.ownerDocument.defaultView,i=Number.parseFloat(r?.getComputedStyle(a).columnGap??"")||0,s=Wm(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),i,r?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var ll=new WeakSet;function Lb(e){ll.has(e)||(ll.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(r=>r.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&xo(t)}))}var Di=new WeakMap;function qd(e,t){let n=$g(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function _d(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let r of n)Et(r,t.meterHelp);let a=Di.get(e);a?a.set(t.meter):Di.set(e,Mg(n,t.meter))}function Vd(e,t){(t.meter||Di.has(e))&&_d(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let r=typeof t.onFold=="function"&&t.folded===!0;r?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let i=e.querySelector("[data-nc-fx-hide]");i instanceof HTMLElement&&(Bd(i,r,t.title),Et(i,t.foldHelp)),wo(e,t);let s=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let u=t.removeLabel??`Remove ${t.title}`;s.hidden=r,s.setAttribute("aria-label",u),s.title=u}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let u=t.on===void 0?"":t.on?"On":"Off";l.hidden=!r,l.setAttribute("aria-label",`Expand ${t.title}${u?`, ${u.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=u,d.hidden=u==="");let c=l.querySelector("[data-nc-fx-fold-name]");c&&(c.textContent=t.title),Et(l,t.foldHelp)}}function Et(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Vt(e){return e.replace(/["\\]/g,"\\$&")}function Cb(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);a?.type==="canvas"&&td(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&yn(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&xo(n);jg(e)}var Nb=kt["toast-duration"];function Fb({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function Ib(e,t,n,a){let r=l=>({top:l,bottom:l+n}),i=l=>e.some(u=>u&&u.bottom>l.top&&u.top<l.bottom),s=r(t-a-n);return i(s)?i(r(a))?"bottom":"top":"bottom"}function Pb(e,t,n,a,r,i){let s=e.bottom+r,l=Math.max(i,Math.min(e.left,a-i-n.width));for(let u=!0,d=0;u&&d<8;d++){u=!1;for(let c of t)c&&c.bottom>s&&c.top<s+n.height&&c.right>l&&c.left<l+n.width&&(s=c.bottom+r,u=!0)}return{top:s,left:l}}var cl="data-nc-ui-toast-live";function Rb(e,t){let n=t.querySelector(`[${cl}]`);return n||(n=e.createElement("div"),n.setAttribute(cl,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function rn({message:e,actionLabel:t,onAction:n,duration:a=Nb,onClose:r,avoid:i=[],anchor:s,host:l,document:u=globalThis.document}={}){l=l??u.body;let d=u.defaultView??globalThis,c=u.createElement("div");c.className="nc-ui-toast",c.setAttribute("data-state","enter");let p=u.createElement("span");p.className="nc-ui-toast-message",p.textContent=e,c.appendChild(p);let f=null;t&&(f=u.createElement("button"),f.type="button",f.className="nc-ui-toast-action",f.textContent=t,c.appendChild(f)),l.appendChild(c);let g="open",m=se=>se&&typeof se.getBoundingClientRect=="function"?se.getBoundingClientRect():null,w=m(c),h=w?.height||44,y=d.getComputedStyle?.(c),k=Number.parseFloat(y?.getPropertyValue(ie("toast-offset")))||16,v=Number.parseFloat(y?.getPropertyValue(ie("toast-anchor-gap")))||8,T=m(s),M=d.innerHeight??0,b=i.map(m).filter(Boolean),x=T&&T.bottom>0&&T.top<M?Pb(T,b,{width:w?.width||0,height:h},d.innerWidth??0,v,k):null;x&&x.top+h<=M?(c.setAttribute("data-placement","anchor"),c.style.top=`${x.top+(d.scrollY??0)}px`,c.style.left=`${x.left+(d.scrollX??0)}px`):c.setAttribute("data-placement",Ib(b,M,h,k));let S=d.requestAnimationFrame?.bind(d)??(se=>setTimeout(se,16));S(()=>S(()=>{g==="open"&&c.setAttribute("data-state","open")})),Rb(u,l).textContent=Fb({message:e,actionLabel:t});let $,L,N=new Promise(se=>{L=se}),B=se=>{clearTimeout($),$=setTimeout(()=>ce("timeout"),se)},V=a,K=Date.now(),ne=()=>{g==="open"&&(clearTimeout($),V=Math.max(0,V-(Date.now()-K)))},be=()=>{g==="open"&&(K=Date.now(),B(V))};c.addEventListener("pointerenter",ne),c.addEventListener("pointerleave",be),c.addEventListener("focusin",ne),c.addEventListener("focusout",be),f?.addEventListener("click",()=>{if(g==="open")try{n?.()}finally{ce("action")}}),Number.isFinite(a)&&B(a);function ce(se="close"){if(g!=="open")return;g="closing",clearTimeout($),c.setAttribute("data-state","closing"),r?.(se);let Y=d.getComputedStyle?.(c),Kt=Y?Math.max(0,...String(Y.transitionDuration||"").split(",").map(Ct=>Number.parseFloat(Ct)*(Ct.trim().endsWith("ms")?1:1e3)||0)):0,Lt=()=>{g!=="gone"&&(g="gone",c.remove(),L(se))};c.addEventListener("transitionend",Lt),setTimeout(Lt,Kt+50)}return{el:c,close:ce,closed:N}}var dl="data-nc-help";function Db(e,t,n,a=0,r=6,i=8){let s=e.top-r-t.height,l=s>=a+i?"above":"below",u=l==="above"?s:e.bottom+r,d=Math.max(i,Math.min(e.left,n-i-t.width));return{top:Math.round(u),left:Math.round(d),side:l}}var Xr=new WeakMap;function zb(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Ob({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=Xr.get(e);if(n)return n;let a=e.defaultView,r=null,i=null,s,l=!1,u,d=()=>{clearTimeout(s),clearTimeout(u),i=null,l=!1,r&&(r.hidden=!0,delete r.dataset.pinned)},c=(m,w)=>{let h=w??m.getAttribute(dl);if(!h)return!1;r||(r=e.createElement("div"),r.className="nc-ui-help",r.setAttribute("role","tooltip"),r.dataset.testid="nc-help",r.style.position="fixed",r.style.pointerEvents="none",r.style.zIndex="6",e.body.appendChild(r)),r.textContent=h,r.hidden=!1,r.style.visibility="hidden",r.style.top="0px",r.style.left="0px";let y=m.getBoundingClientRect(),k=Db(y,{width:r.offsetWidth,height:r.offsetHeight},a.innerWidth,zb(e));return r.style.top=`${k.top}px`,r.style.left=`${k.left}px`,r.dataset.side=k.side,r.style.visibility="",!0},p=m=>{if(l||m.pointerType==="touch")return;let w=m.target&&m.target.closest?m.target.closest(`[${dl}]`):null;w!==i&&(d(),w&&(i=w,s=setTimeout(()=>{i===w&&w.isConnected&&c(w)},t)))},f=m=>{(l||m.key==="Escape")&&d()};e.addEventListener("pointerover",p),e.addEventListener("pointerdown",d,!0),e.addEventListener("keydown",f),a.addEventListener("scroll",d,!0),a.addEventListener("blur",d);let g={hide:d,pin(m,w,{ms:h=0}={}){return d(),!m||!m.isConnected||!c(m,w)?!1:(l=!0,r.dataset.pinned="",h>0&&(u=setTimeout(d,h)),!0)},uninstall(){d(),e.removeEventListener("pointerover",p),e.removeEventListener("pointerdown",d,!0),e.removeEventListener("keydown",f),a.removeEventListener("scroll",d,!0),a.removeEventListener("blur",d),r?.remove(),r=null,Xr.delete(e)}};return Xr.set(e,g),g}var Hd="(max-width: 768px)",Bb='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',jb='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',qb=0;function _b({panel:e,button:t,label:n="Menu",media:a=Hd}){let r=e.ownerDocument,i=r.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++qb}`);let s=t??r.createElement("button");t||(s.type="button",s.innerHTML=Bb),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function u(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),r.addEventListener("keydown",c,!0),r.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(jb)].find(h=>!h.hidden&&h.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function d({focus:h}={}){if(!l())return;let y=e.contains(r.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),r.removeEventListener("keydown",c,!0),r.removeEventListener("pointerdown",p,!0),(h??y)&&s.focus?.({preventScroll:!0})}function c(h){h.key==="Escape"&&(h.preventDefault(),h.stopPropagation(),d({focus:!0}))}function p(h){let y=h.target;y instanceof i.Node&&(e.contains(y)||s.contains(y))||d({focus:!1})}let f=()=>l()?d({focus:!0}):u(),g=h=>{let y=h.target,k=y instanceof i.Element?y.closest("button"):null;!k||!e.contains(k)||k.closest("[data-nc-menu-stay]")||d({focus:!0})};s.addEventListener("click",f),e.addEventListener("click",g);let m=i.matchMedia?.(a),w=()=>{m?.matches||d({focus:!1})};return m?.addEventListener?.("change",w),{button:s,panel:e,open:u,close:d,isOpen:l,destroy(){d({focus:!1}),s.removeEventListener("click",f),e.removeEventListener("click",g),m?.removeEventListener?.("change",w)}}}var ko="netcomposer.rhythm.hidden.v1",tt=new WeakMap;function Jr(){try{return globalThis.localStorage??null}catch{return null}}function Ud(e,t=ko){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function ul(e,t,n,a=ko){let r=Ud(e,a);n?r.add(t):r.delete(t);try{e?.setItem(a,JSON.stringify([...r]))}catch{}}function $o(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(r=>r.controls)],n=[],a=r=>{if(n.push(r),r.type==="group")for(let i of r.controls)a(i)};for(let r of t)a(r),r.type==="fx"&&n.push(...r.controls,...r.more??[]),r.type==="strip"&&(n.push(...(r.sends??[]).map(i=>({...i,type:"knob",compact:!0}))),r.pan&&n.push(yo(r)),r.trim&&n.push(vo(r)));return n}function Gd(e,t){if(!(!e||!t))return $o(e).find(n=>n.id===t)}function Vb(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${$o(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Hb(e,t){if(!t.title)return;if(!t.panel){let i=document.createElement("h3");i.className="nc-ui-fx-name",i.textContent=t.title,e.append(i);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(a,r),e.append(n),Wd(e,t)}function Wd(e,t){if(!t.panel)return;let n=[...e.children].find(i=>i.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),r&&(r.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Ub(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=tt.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Gd(n,a)}function Gb(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],r=Vb(t);if(e.dataset.ncSignature===r){for(let i of a){let s=e.querySelector(`[data-nc-section="${hl(i.id)}"]`);s&&Wd(s,i);for(let l of i.controls){let u=e.querySelector(`[data-nc-id="${hl(l.id)}"]`);u instanceof Element&&Be(u,l)}s instanceof HTMLElement&&zi(s,i,n)}return}e.dataset.ncSignature=r,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let i of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=i.id,i.inset&&(s.dataset.ncInset="true"),i.area&&(s.dataset.ncArea=i.area),i.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",i.label)),i.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),i.title&&s.setAttribute("aria-label",i.title)),Hb(s,i);let l=i.panel?document.createElement("div"):s;i.panel&&(l.className="nc-panel-body",s.append(l));for(let u of i.controls)l.append(_t(u,Ub));e.append(s),zi(s,i,n)}}function Kd(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,r=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,r))}}var Wb="(max-width: 768px)",Yd=new WeakMap;function pl(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function Kb(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let r=pl("prev"),i=pl("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(r,s,i,l);let u=(d,c)=>{let p=Yd.get(e);if(!p||c.getAttribute("aria-disabled")==="true")return;let f=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:g}=Kd(f,p.pageSize,(t.pages.get(p.id)??0)+d);t.pages.set(p.id,g),p.onPage?.(g),zi(e,{...p,page:g},t),c.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===c&&(c===r?i:r).focus(),t.redraw()};return r.addEventListener("click",()=>u(-1,r)),i.addEventListener("click",()=>u(1,i)),e.prepend(a),a}function zi(e,t,n){Yd.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],r=t.pageSize??0,{pages:i,page:s}=Kd(a.length,r,t.page??n.pages.get(t.id)??0);if(r>0&&n.pages.set(t.id,s),i<=1){for(let h of[...e.children])h.classList.contains("nc-fx-pager")&&h.remove();delete e.dataset.ncPaged;for(let h of a)delete h.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(Wb).matches===!0,u=e.closest(".nc-module");a.forEach((h,y)=>{let k=Math.floor(y/r)!==s;if(k?h.dataset.ncOffPage="":delete h.dataset.ncOffPage,k&&!l){let v=u instanceof HTMLElement?tt.get(u):void 0;Ab(h,Gd(v,h.dataset.ncId))}});let d=Kb(e,n),c=d.querySelector('[data-nc-fx-page="prev"]'),p=d.querySelector('[data-nc-fx-page="next"]');c.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===i-1?"true":"false");let f=d.querySelector("[data-nc-fx-page-count]"),g=`${s+1} / ${i}`;f.textContent!==g&&(f.textContent=g);let m=d.querySelector("[data-nc-fx-page-live]"),w=`Effects page ${s+1} of ${i}`;m.textContent!==w&&(m.textContent=w)}function hl(e){return e.replace(/["\\]/g,"\\$&")}function Yb(e,t=ko){Gc();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Ud(Jr(),t).has(e.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let i=document.createElement("h2");i.className="nc-title",i.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="";let d=lo({labelledBy:i.id,onChange:k=>(tt.get(n)??e).onToggle?.(k)});d.el.dataset.ncModuleSwitch="",s.append(d.el,l,u);let c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",r.append(i,c,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",f.append(g);let m=document.createElement("i");m.className="nc-token-probe",m.dataset.ncProbe="",n.append(m,r,p,f),n.setAttribute("aria-labelledby",i.id);let w=k=>{let v=tt.get(n)??e;n.dataset.ncOpen=k?"false":"true",p.hidden=k,f.hidden=!k,l.textContent=k?"+":"−",l.setAttribute("aria-expanded",k?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${k?"Show":"Hide"} ${v.title}`),l.title=k?"Show":"Hide",k?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let k=n.dataset.ncOpen==="true";ul(Jr(),(tt.get(n)??e).id,k,t),w(k),Oi(n.parentElement)}),f.addEventListener("click",()=>{ul(Jr(),(tt.get(n)??e).id,!1,t),w(!1),Oi(n.parentElement)});let h={pages:new Map,redraw:()=>y.redraw()},y={el:n,update(k){tt.set(n,k),k.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,i.textContent=k.title,c.textContent=k.status??"",k.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),g.textContent=k.summary??k.title,d.el.hidden=k.on===void 0,d.set(k.on===!0),k.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,f.setAttribute("aria-label",`Show ${k.title}`),Gb(p,k,h),w(p.hidden),y.redraw()},redraw(){let k=tt.get(n);k&&Cb(n,$o(k))}};return tt.set(n,e),w(a),y.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>y.redraw()).observe(n),_c(()=>y.redraw(),n.ownerDocument),y}function Xb(e,t,n="adjacent"){Gc(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((r,i)=>{let s=i%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=a;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(r.el),r.redraw()}),Oi(e)}function Oi(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(i=>i instanceof HTMLElement&&i.classList.contains("nc-module")),n=t.some(i=>i.hasAttribute("data-nc-lead")),a=t.map(i=>i.hasAttribute("data-nc-slim")?o("module-slim-column"):n?i.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let r=t.filter(i=>!i.hasAttribute("data-nc-slim"));n&&t.length===4&&r.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Eo="netcomposer.studio.instances.v1",fl="netcomposer.studio.types-seen.v1",Jb=["petra-rhythm","olive-bass"];function Xd(e,t){return t===1?e:`${e}#${t}`}function So(e){const t=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(e);if(!t?.[1])return null;const n=t[2]?Number(t[2]):1;return n===1&&t[2]?null:{type:t[1],n}}function Qb(e,t){return t===1?e.name:`${e.name} ${t}`}function kn(e,t,n){const a=Qb(e,t),r=Qd(n,a);return{id:Xd(e.id,t),type:e.id,n:t,name:r,src:e.src,...r!==a?{custom:!0}:{}}}const Jd=20;function Qd(e,t){return typeof e!="string"?t:[...e.replace(/\s+/g," ").trim()].slice(0,Jd).join("").trim()||t}function Zb(e,t,n,a){return e.map(r=>{if(r.id!==t)return r;const i=a.find(s=>s.id===r.type);return i?kn(i,r.n,n):r})}function Zd(e,t,n){const a=new URLSearchParams({instance:String(e.n)});return t&&a.set("measure",""),n&&a.set("b",n),`${e.src}?${a.toString().replace(/=(&|$)/g,"$1")}`}function e0(e,t){const n=new Set(e.filter(r=>r.type===t.id).map(r=>r.n));let a=1;for(;n.has(a);)a++;return kn(t,a)}function Zn(e){return e.filter(t=>t.available!==!1).map(t=>kn(t,1))}function t0(e,t){if(!Array.isArray(e))return Zn(t);const n=[];for(const a of e){const r=a&&typeof a=="object"?a:null,i=typeof a=="string"?a:r?.id;if(typeof i!="string")continue;const s=So(i),l=s&&t.find(u=>u.id===s.type&&u.available!==!1);!s||!l||n.some(u=>u.id===i)||n.push(kn(l,s.n,r?.name))}return n.length>0||e.length===0?n:Zn(t)}function Ao(){try{return globalThis.localStorage??null}catch{return null}}function n0(e,t=Ao()){try{const n=t?.getItem(Eo);return n?t0(JSON.parse(n),e):Zn(e)}catch{return Zn(e)}}function a0(e,t,n=Ao()){let a=Jb;try{const s=JSON.parse(n?.getItem(fl)??"null");Array.isArray(s)&&(a=s.filter(l=>typeof l=="string"))}catch{}const r=t.filter(s=>!a.includes(s.id)&&s.available!==!1);if(r.length===0)return[...e];const i=[...e];for(const s of r)i.some(l=>l.type===s.id)||i.push(kn(s,1));try{n?.setItem(fl,JSON.stringify([...new Set([...a,...r.map(s=>s.id)])]))}catch{}return i.length!==e.length&&$n(i,n),i}function r0(e){return e.map(t=>t.custom?{id:t.id,name:t.name}:t.id)}function $n(e,t=Ao()){try{t?.setItem(Eo,JSON.stringify(r0(e)))}catch{}}function i0(e){const t=/^commit: ([0-9a-f]{7,40})\b/m.exec(e);return t?t[1].slice(0,12):null}function o0(e,t=1500){const n=new Map;return a=>{let r=n.get(a);if(!r){const i=e(`${a}BUILD.txt`,{cache:"no-cache"}).then(s=>s.ok?s.text():"").then(i0,()=>null);r=Promise.race([i,new Promise(s=>setTimeout(()=>s(null),t))]),n.set(a,r)}return r}}function s0(e,t){const n=new Map;return(a,r)=>{const i=So(a),s=i?.type??a,l=r?.instance!==void 0?Number(r.instance):a.includes("#")?i?.n:void 0,u=e().filter(c=>c.instance.type===s);let d;if(l!==void 0&&Number.isInteger(l)&&l>=1)d=u.find(c=>c.instance.n===l);else{const c=u.filter(p=>{const f=p.window();return f!=null&&f!==n.get(p.instance.id)});d=c.find(p=>p.readyState?.()!=="complete")??c[0]??u[0]}if(!d){if(t.some(p=>p.id===s))return null;const c=l!==void 0?Xd(s,l):a;return{id:c,name:c}}return n.set(d.instance.id,d.window()),{id:d.instance.id,name:d.instance.name}}}const l0=2e4,c0=500,d0={waiting:"Waiting",loading:"Loading…",starting:"Starting audio…",ready:"Ready",failed:"Didn't load"},u0=["ready","failed"];function p0(e){const t=e.map(c=>({id:c.id,brand:c.brand,name:c.name,state:"waiting",loaded:!1,attached:!1,holds:0})),n=new Set;let a=!1,r=[];const i=new Map,s=c=>t.find(p=>p.id===c),l=c=>u0.includes(c.state),u=()=>{if(!a&&t.every(l)){a=!0;const c=r;r=[];for(const p of c)p()}for(const c of t){if(!l(c))continue;const p=i.get(c.id);if(p){i.delete(c.id);for(const f of p)f()}}for(const c of[...n])try{c()}catch{}},d=c=>{if(a||l(c))return;const p=c.loaded&&c.attached&&c.holds===0?"ready":c.loaded||c.attached?"starting":c.state==="waiting"?"waiting":"loading";p!==c.state&&(c.state=p,u())};return{items:()=>t.map(c=>({id:c.id,brand:c.brand,name:c.name,state:c.state})),counts:()=>({done:t.filter(l).length,total:t.length}),settled:()=>a||t.every(l),whenSettled(){return a||t.every(l)?Promise.resolve():new Promise(c=>r.push(c))},whenDone(c){const p=s(c);return!p||a||l(p)?Promise.resolve():new Promise(f=>i.set(c,[...i.get(c)??[],f]))},requested(c){const p=s(c);!p||a||p.state!=="waiting"||(p.state="loading",u(),d(p))},loaded(c){const p=s(c);p&&(p.loaded=!0,d(p))},attached(c){const p=s(c);p&&(p.attached=!0,d(p))},hold(c){const p=s(c);if(!p||a)return()=>{};p.holds++,d(p);let f=!1;return()=>{f||(f=!0,p.holds--,d(p))}},fail(c){const p=s(c);!p||a||l(p)||(p.state="failed",u())},remove(c){const p=t.findIndex(g=>g.id===c);if(p<0||a)return;t.splice(p,1);const f=i.get(c);i.delete(c);for(const g of f??[])g();u()},onChange(c){return n.add(c),()=>n.delete(c)}}}function h0(e,t){return e.includes(t)?[t,...e.filter(n=>n!==t)]:[...e]}async function f0(e,t,n){for(let a=0;a<e.length;a++)a>0&&await n(),await t(e[a])}function m0(e=c0,t=globalThis){return new Promise(n=>{typeof t.requestIdleCallback=="function"?t.requestIdleCallback(()=>n(),{timeout:e}):t.setTimeout(n,0)})}function g0(e,t){const n=new Set,a=new URL(t),r=/<(script|link)\b([^>]*)>/gi;for(const i of e.matchAll(r)){const s=(i[1]??"").toLowerCase(),l=i[2]??"",u=p=>new RegExp(`\\b${p}\\s*=\\s*("([^"]*)"|'([^']*)')`,"i").exec(l)?.slice(2).find(Boolean);let d;if(s==="script"&&/\btype\s*=\s*["']module["']/i.test(l)&&(d=u("src")),s==="link"){const p=(u("rel")??"").toLowerCase();(p==="modulepreload"||p==="stylesheet")&&(d=u("href"))}if(!d)continue;let c;try{c=new URL(d,a)}catch{continue}c.origin===a.origin&&n.add(c.href)}return[...n]}const za="netcomposer.studio.pending-presets.v1",b0=3e3,y0=6e4;function ml(e){return!!e&&typeof e=="object"&&typeof e.format=="string"&&"data"in e}function v0(e,t){return new Promise(n=>{const a=setTimeout(()=>n(void 0),t);e.then(r=>{clearTimeout(a),n(r)},()=>{clearTimeout(a),n(void 0)})})}function w0(e){const t=new Map,n=[],a=()=>{try{const s=JSON.parse(e()?.getItem(za)??"{}"),l={};if(s&&typeof s=="object")for(const[u,d]of Object.entries(s))ml(d)&&(l[u]=d);return l}catch{return{}}},r=s=>{try{const l=e();if(!l)return;Object.keys(s).length?l.setItem(za,JSON.stringify(s)):l.removeItem(za)}catch{}},i=async(s,l)=>{const u=a(),d=u[s];if(!d)return;delete u[s],r(u);let c=d.format===l.format;if(c)try{await l.set(d.data)}catch{c=!1}for(const p of n)p(s,c)};return{provide(s,l){!l||typeof l.get!="function"||typeof l.set!="function"||(t.set(s,l),i(s,l))},provided:()=>[...t.keys()],async collect(s,l=b0){const u={};return await Promise.all(s.map(async d=>{const c=t.get(d);if(!c)return;const p=await v0(Promise.resolve().then(()=>c.get()),l);p!=null&&(u[d]={format:c.format,...c.version!==void 0?{v:c.version}:{},data:p})})),u},stash(s){const l={};for(const[u,d]of Object.entries(s))ml(d)&&(l[u]=d);r(l)},onApplied(s){n.push(s)},pending:()=>Object.keys(a()),dropPending(){const s=Object.keys(a());return r({}),s}}}function x0(e,t){return`${e}@studio/${t}`}const k0=1,Ae=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX",identity:"instrument-nyx"},{id:"calliope",name:"Generator",src:"/calliope/",brand:"CALLIOPE",identity:"instrument-calliope",sound:!1}],Mo=[...Ae];function $0(e,t,n={}){const a=n.instruments??Ae;return{version:k0,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},...n.grab?{grab:n.grab}:{},...n.play?{play:n.play}:{},...n.countIn?{countIn:n.countIn}:{},attach(r,i){if(typeof r!="string"||r.length===0||r.length>64)return null;const s=n.resolve?n.resolve(r,i):{id:r,name:a.find(w=>w.id===r)?.name??r};if(!s)return null;const l=s.id.split("#")[0],d=a.find(w=>w.id===l)?.sound===!1?e.createGain():t.attach(s.id,s.name),c=s.id;n.attached?.(c);const p=n.presets,f=n.share?.host(c),g=n.picker?.host(c),m=n.notes?.host(c);return{ctx:e,output:d,...n.mapper===void 0?{}:{mapper:n.mapper},instance:c,storageKey:w=>x0(w,c),...n.legacyCopy?.()===!1?{legacyCopy:!1}:{},...n.holdFirstPlay?{holdFirstPlay:()=>n.holdFirstPlay?.(c)??(()=>{})}:{},...p?{providePreset:w=>p.provide(c,w)}:{},...f?{audioReceivers:f.audioReceivers,sendAudio:f.sendAudio,onAudio:f.onAudio,reveal:f.reveal}:{},...g?{pickerTarget:g.pickerTarget}:{},...m?{notesIn:m.notesIn,notesSource:m.notesSource,notesTakeBack:m.notesTakeBack}:{},...n.clock?{clock:n.clock()}:{},...n.targets?{notesTargets:()=>n.targets?.list()??[],onNotesTargets:w=>typeof w=="function"?n.targets?.listen(w)??(()=>{}):()=>{}}:{},...n.show?{showInstance:w=>typeof w=="string"&&n.show?.(w)}:{}}}}}const gl=16,E0=30;function S0(e){if(!e||typeof e!="object")return null;const t=e,n=Array.isArray(t.beats)?t.beats.slice(0,gl+1):[],a=t.until;if(n.length<1||n.length>gl||!n.every(l=>typeof l=="number"&&Number.isFinite(l))||n.some((l,u)=>u>0&&l<=n[u-1]))return null;const r=n[0],i=n[n.length-1];if(typeof a!="number"||!Number.isFinite(a)||a<=i||a-r>E0)return null;const s=Array.isArray(t.accents)?t.accents:[];return{beats:[...n],accents:n.map((l,u)=>s[u]===!0),until:a}}function A0(e,t){if(t>=e.until)return null;let n=-1;for(;n+1<e.beats.length&&e.beats[n+1]<=t;)n++;return{n:e.beats.length-Math.max(0,n),accent:n>=0&&e.accents?.[n]===!0}}function M0(e,t){return t===null?e:`${t} · ${e}`}function T0(e){let t=0;for(const n of e)Number.isFinite(n)&&n>t&&(t=n);return Math.round(t)}function L0(e){const t=e.doc??document,n=t.createElement("div");n.className="count-in",n.hidden=!0,n.setAttribute("role","status");const a=t.createElement("span");a.className="count-in-who";const r=t.createElement("span");r.className="count-in-n",n.append(a,r);const i=t.title,s=new Map;let l=!1;const u=()=>{const c=e.now();for(const[v,T]of s)c>=T.until&&s.delete(v);const[p,f]=[...s][0]??[],g=f?A0(f,c):null;if(!p||!g){n.hidden=!0,delete n.dataset.accent,t.title=i,l=!1;return}n.hidden=!1;const m=e.clearOf?.()??[],w=`${T0(m.map(v=>v.getBoundingClientRect().bottom))}px`;n.style.getPropertyValue("--count-in-top")!==w&&n.style.setProperty("--count-in-top",w);const h=e.labelOf(p);a.textContent!==h&&(a.textContent=h);const y=String(g.n);r.textContent!==y&&(r.textContent=y),n.toggleAttribute("data-accent",g.accent),n.setAttribute("aria-label",`${h} count-in ${y}`);const k=M0(i,g.n);t.title!==k&&(t.title=k),requestAnimationFrame(u)},d=()=>{l||(l=!0,requestAnimationFrame(u))};return{el:n,api:{show(c,p){if(typeof c!="string"||!c)return;const f=S0(p);f&&(s.set(c,f),d())},clear(c){s.delete(c)&&d()}}}}const C0=1e4;function N0(e=C0,t=globalThis){const n=new Set;let a=[];const r=()=>{if(n.size>0)return;const i=a;a=[];for(const s of i)s()};return{hold(){const i={};n.add(i);const s=t.setTimeout(()=>l(),e),l=()=>{n.delete(i)&&(t.clearTimeout(s),r())};return l},get count(){return n.size},idle(){return n.size===0?Promise.resolve():new Promise(i=>a.push(i))}}}const eu="netcomposer.studio.fx-fold.v1",F0=["a","b","insert"],tu={a:!0,b:!0,insert:!1};function nu(e){try{const t=e?.getItem(eu);if(!t)return{};const n=JSON.parse(t);if(!n||typeof n!="object")return{};const a=n,r={};for(const i of F0)typeof a[i]=="boolean"&&(r[i]=a[i]);return r}catch{return{}}}function au(e){return{...tu,...nu(e)}}function ru(e,t,n){const a={...nu(e),[t]:n};try{e?.setItem(eu,JSON.stringify(a))}catch{}return{...tu,...a}}const iu="netcomposer.studio.insert-fold.v1";function ou(e){try{const t=e?.getItem(iu),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function su(e,t,n){const a=[...ou(e)].filter(i=>i!==t);n&&a.push(t);const r=a.slice(-256);try{e?.setItem(iu,JSON.stringify(r))}catch{}return new Set(r)}function I0(e,t){return au(e).insert?(ru(e,"insert",!1),su(e,t,!0)):ou(e)}function $e(){try{return globalThis.localStorage??null}catch{return null}}const P0={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function lu(e,t){const n=t.fx[e],a=Ha(n);for(const r of a.chain){const i=P0[e][r.type];n===void 0&&i&&Object.assign(r.dials,i),e==="a"?(r.bypass=r.type!=="plate",r.type==="plate"&&(r.dials.mix=100)):e==="b"?(r.bypass=r.type!=="delay",r.type==="delay"&&(r.dials.mix=100,r.dials.mode=0,r.dials.send=100)):r.bypass=r.type!=="drive"||!t.insert.on}return a}const cu="drive-1",Bi=3;function R0(e,t){if(e.masterFx!==null&&e.masterFx!==void 0)return Ot(e.masterFx,t);const n=e.insert.on?lu("insert",e).chain.find(a=>a.type==="drive"):void 0;return Ot({v:2,chain:n?[{id:cu,type:"drive",bypass:!1,dials:{...n.dials}}]:[]},t)}function D0(e){return e.chain.some(t=>t.type==="drive"&&!t.bypass)}const z0={"no-source":"that source isn't there",empty:"the range is empty",gone:"that range is older than the 20 seconds kept","not-kept":"that source wasn't being kept yet when the range played",timeout:"no answer from the audio (is it running?)"};function O0(e,t,n,a=2e3){return(Number.isFinite(e-t)?Math.max(0,e-t):0)/n*1e3+a}const Sa=e=>({channels:null,reason:e,message:z0[e]});function B0(e,t){const n=new Map,a=new Map;let r=1;const i=l=>{const u=t.nodeFor(l);if(!u)return null;const d=n.get(l);if(d&&d.source===u)return d.node;d?.node.disconnect();const c=new AudioWorkletNode(e,"nc-studio-grab",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});return c.port.onmessage=p=>{const f=p.data;f.type!=="took"&&f.type!=="recorded"||(a.get(f.id)?.(f.channels,f.reason),a.delete(f.id))},u.connect(c),n.set(l,{node:c,source:u}),c},s=async(l,u,d)=>{await t.ready;const c=i(l);if(!c)return Sa("no-source");if(!(d>u))return Sa("empty");const p=r++;return new Promise(f=>{a.set(p,(g,m)=>f(g?{channels:g}:Sa(m??"gone"))),c.port.postMessage({type:"take",id:p,from:u,to:d}),setTimeout(()=>{a.delete(p)&&f(Sa("timeout"))},O0(d,e.currentTime*e.sampleRate,e.sampleRate))})};return{record(l,u){if(!t.nodeFor(l))return null;const d=n.get(l)?.node??null,c=r++;let p=d;const f=m=>p?.port.postMessage(m);p?f({type:"record",id:c,from:u}):t.ready.then(()=>{p=i(l),f({type:"record",id:c,from:u})});let g=!1;return{stop(m){return g?Promise.resolve(null):(g=!0,new Promise(w=>{a.set(c,w),f({type:"record-end",id:c,to:m}),setTimeout(()=>{a.delete(c)&&w(null)},Math.max(0,(m-e.currentTime*e.sampleRate)/e.sampleRate)*1e3+5e3)}))},cancel(){g=!0,f({type:"record-cancel",id:c})}}},sources:()=>t.sources(),latency(l){if(typeof l!="string")return 0;const u=t.latencyFor?.(l)??0;return Number.isFinite(u)&&u>0?Math.round(u):0},listen(l){return t.nodeFor(l)?(t.ready.then(()=>i(l)),!0):!1},take:(l,u,d)=>s(l,u,d).then(c=>c.channels),takeResult:s}}function j0(e){const t=()=>{};return new Proxy(e,{get(n,a,r){if(a==="stop")return t;const i=Reflect.get(n,a,r);return typeof i=="function"?i.bind(n):i}})}const ee={"picker:off":"Connects the Sample Picker on this computer, so its Send to NYX loads the pads of a NYX here. Off: the picker opens NYX on its own.","picker:connecting":"Connecting to the Sample Picker on this computer. Press to disconnect.","picker:on":"The Sample Picker is connected: its Send to NYX loads a NYX here (you choose which there). Press to disconnect.","picker:away":"The Sample Picker isn't answering: start it on this computer; the Studio keeps trying. Press to disconnect.","picker:ask":"The Sample Picker was connected. Press to connect again (Chrome may ask to let this site reach this computer).","picker:blocked":"Chrome blocks this site from reaching this computer. Allow it in the site's settings (Local network access), then press here.","transport:rec":"Records the Master to a WAV file. If nothing is sounding, Rec arms and waits: it starts on the first sound or on bar 1. Press again to cancel or stop.","transport:play-loading":"Play is ready once every instrument is in. The status line counts them as they load.","transport:keep":"Saves the last minutes of the Master as a WAV, no Rec needed. It holds up to 5 min of sound; silence isn't held, so 2 min is 2 minutes of sound. K opens it.","keep:held":"How much sound Keep holds now, up to 5 min. Silence longer than 2 seconds isn't held. While the clock runs, a Keep starts on a bar line.","keep:switch":"Keeping on holds the Master's last 5 minutes of sound in this tab (about 58 MB). Off forgets it and holds nothing.","mix:sends":"The two send effects every channel feeds with its A and B knobs. The master's Sends button shows and hides them. Folded, click a column to open it.","inserts:channel":"Shows this channel's own effects, applied before its fader and sends. Press again to close them.","inserts:master":"Shows the master's own effects on the whole mix: none until you add one, up to three (EQ, compressor, drive and so on). Press again to close them.","fx:fold":"Folds this effect sideways into a narrow column so the Mix takes less room. It keeps sounding as set; a click on the column (or its ▶) opens it again.","fx:meter":"The level going into this effect (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. It keeps showing the input, greyed, while the effect is off.","fx:meter-return":"The level the sends feed into this effect (left bar) and its return (right bar), from −48 dB up to full scale; orange near clipping. Silent while the return is off.","fx:max":"Widens this card to three cards so its graph is easy to see; the dials sit under it. Click again, or press Escape, to put it back.","gate:steps":"Tap or drag up and down to draw each step's level. Hold a step (or right-click it) to give it its own shape. The ring is the step playing: dimmed while stopped.","eq:graph":"The EQ's curve over the sound coming out right now: boosts rise above the middle line, cuts fall below it. Click it to open it wide, then drag a dot to shape it.","eq:low":"The lows, below 150 Hz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","eq:mid":"The middle band: drag up or down to boost or cut, sideways to move it, and scroll over it for narrower or wider. Double-click resets it.","eq:high":"The highs, above 6 kHz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","strip:fold":"Minimizes this channel sideways to a narrow column so more fit. It keeps playing at the same level; M and S still work, and ▶ expands it again.","strip:folded":"A minimized channel: its name, mute, solo and level meter. Click the name or ▶ to expand it. Drag the name to move it.","strip:trim":"Trim: this channel's input gain, before its Inserts and fader, −12 to +24 dB. Bring up a quiet instrument here; double-click for 0 dB.","strip:pan":"Balance: moves this channel left or right in the stereo mix by turning the other side down (its sends follow). Drag or use the arrow keys; double-click to centre it.","strip:name":"This channel's instrument. Click to show it below, drag (or touch and hold) to move the channel, double-click to rename it.","strip:rename":"Type a new name (up to 20 characters) and press Enter; Escape cancels. Leave it empty to go back to the default name.","sends:view":"Shows or hides the send effects, A · Reverb and B · Delay. Outlined while a channel sends to them. They keep sounding either way.","vu:add":"Adds analog VU meters for the finished mix beside the master: left on top, right below. 0 VU is −18 dBFS RMS.","vu:module":"The master's left (top) and right (bottom) as classic VU meters, which show average loudness. 0 VU is −18 dBFS RMS; the red is louder than that.","vu:remove":"Hides the VU meters. + Meters in the Mix header brings them back.","vu:fold":"Folds the meters to a narrow column with two thin level bars, L and R. The triangle opens them again.","load:ok":"Audio load {pct}%. Plenty of room.","load:busy":"Audio load {pct}%. Close an instrument if you hear crackles.","load:dropout":"A brief spike caused an audio dropout. Average load is {pct}%. If you hear crackles often, close an instrument.","load:over":"Audio load {pct}%. The audio is dropping out. Stop or close an instrument."},q0=[60,120,300],_0={on:!1,written:0,size:0,segments:[],lastDropped:null,bytes:0,sampleRate:48e3};function du(e){return Math.max(0,Math.min(e.written,e.size))}function Qr(e,t){let n=null;for(const a of e){if(a.pos>t)break;n=a}return n?n.frame+(t-n.pos):null}function V0(e,t,n){for(let a=e.length-1;a>=0;a--){const r=e[a];if(r&&r.pos<=t)return{start:r.pos,end:e[a+1]?.pos??n}}return null}function H0(e,t,n){const a=du(e);if(a<=0)return null;const r=e.written-a;let i;if("last"in t){const d=Math.round(t.last*e.sampleRate);if(d<=0||d>a)return null;i=e.written-d}else{if(e.lastDropped!==null&&e.lastDropped>=t.since)return null;let d=null;for(let c=0;c<e.segments.length;c++){const p=e.segments[c];if(!p)continue;const f=e.segments[c+1]?.pos??e.written;if(t.since<p.frame+(f-p.pos)){d=Math.max(r,p.pos+Math.max(0,t.since-p.frame));break}}if(d===null||d>=e.written)return null;i=d}let s="exact";if(n&&n.barFrames>0){const d=Qr(e.segments,i),c=V0(e.segments,i,e.written);if(d!==null&&c){const p=((d-n.origin)%n.barFrames+n.barFrames)%n.barFrames,f=i-Math.round(p),g=p===0?i:i+Math.round(n.barFrames-p);p===0?s="bar":f>=Math.max(r,c.start)&&"last"in t?(i=f,s="bar"):g<Math.min(e.written,c.end)&&(i=g,s="bar")}}const l=Qr(e.segments,i)??0,u=(Qr(e.segments,e.written-1)??l)+1;return{from:i,to:e.written,frame:l,endFrame:u,start:s}}function ji(e){const t=Math.max(0,Math.floor(e));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function U0(e,t,n){const a=l=>String(l).padStart(2,"0"),r=`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}-${a(e.getHours())}${a(e.getMinutes())}`,i=`${Math.round(t*10)/10}bpm`,s="last"in n?`${Math.round(n.last/60)}m`:"since-play";return`netcomposer-keep-${r}-${i}-${s}.wav`}const uu="audio/wav";function G0(e){const t=a=>String(a).padStart(2,"0");return`netcomposer-studio-${`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}-${t(e.getHours())}${t(e.getMinutes())}`}.wav`}function W0(e,t){const n=Math.min(e.length,t.length),a=new Uint8Array(n*6);let r=0;for(let i=0;i<n;i++)for(const s of[e[i]??0,t[i]??0]){const l=Math.max(-1,Math.min(1,s)),u=Math.round(l<0?l*8388608:l*8388607);a[r++]=u&255,a[r++]=u>>8&255,a[r++]=u>>16&255}return a}function pu(e,t,n=24){const r=n/8,i=e*2*r,s=new ArrayBuffer(44),l=new DataView(s),u=(d,c)=>{for(let p=0;p<4;p++)l.setUint8(d+p,c.charCodeAt(p))};return u(0,"RIFF"),l.setUint32(4,36+i,!0),u(8,"WAVE"),u(12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,2,!0),l.setUint32(24,t,!0),l.setUint32(28,t*2*r,!0),l.setUint16(32,2*r,!0),l.setUint16(34,r*8,!0),u(36,"data"),l.setUint32(40,i,!0),new Uint8Array(s)}class K0{constructor(t,n){this.ctx=t,this.source=n}node=null;id=0;phase="idle";parts=[];frames=0;from=0;why="now";done=null;listeners=new Set;attach(){const t=this.source();if(this.node||!t)return;const n=new AudioWorkletNode(this.ctx,"nc-studio-rec",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n}get supported(){return typeof AudioWorkletNode<"u"}get state(){return this.phase}get started(){return this.phase==="recording"||this.phase==="stopping"?{from:this.from,why:this.why}:null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}arm(t=!1){this.phase==="idle"&&(this.attach(),this.node&&(this.id++,this.parts=[],this.frames=0,this.set("arming"),this.node.port.postMessage({type:"arm",id:this.id,force:t})))}schedule(t){this.phase!=="arming"&&this.phase!=="armed"||this.node?.port.postMessage({type:"at",id:this.id,at:t})}cancel(){this.phase!=="arming"&&this.phase!=="armed"||(this.node?.port.postMessage({type:"cancel",id:this.id}),this.parts=[],this.id++,this.set("idle"))}stop(){return this.phase!=="recording"||!this.node?Promise.resolve(null):(this.set("stopping"),new Promise(t=>{this.done=t,this.node?.port.postMessage({type:"stop",id:this.id})}))}set(t){if(this.phase!==t){this.phase=t;for(const n of this.listeners)n()}}message(t){if(t.id===this.id){if(t.type==="rec")t.phase==="armed"&&this.phase==="arming"?this.set("armed"):t.phase==="recording"&&(this.phase==="arming"||this.phase==="armed")?(this.from=t.from??0,this.why=t.why??"now",this.set("recording")):t.phase==="idle"&&this.phase==="stopping"&&this.finish(null);else if(t.type==="rec-data"){const[n,a]=t.channels??[];if(!n||!a)return;this.parts.push(W0(n,a)),this.frames+=n.length}else if(t.type==="rec-done"){const n=t.sampleRate??this.ctx.sampleRate,a=new Blob([pu(this.frames,n),...this.parts],{type:uu});this.finish({blob:a,name:G0(new Date),seconds:this.frames/n,from:t.from??this.from,why:this.why})}}}finish(t){this.parts=[],this.frames=0;const n=this.done;this.done=null,this.set("idle"),n?.(t)}}const hu="netcomposer.studio.keeping.v1";function Y0(e){try{return e?.getItem(hu)!=="off"}catch{return!0}}function X0(e,t){try{e?.setItem(hu,t?"on":"off")}catch{}}class J0{constructor(t,n,a=!0){this.ctx=t,this.source=n,this.on=a}node=null;latest=_0;on;id=0;jobs=new Map;listeners=new Set;attach(){const t=this.source();if(this.node||!t||typeof AudioWorkletNode>"u")return;const n=new AudioWorkletNode(this.ctx,"nc-studio-keep",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n,n.port.postMessage({type:"keeping",on:this.on})}get supported(){return typeof AudioWorkletNode<"u"}get keeping(){return this.on}get status(){return this.latest}setKeeping(t){this.on=t,this.node?.port.postMessage({type:"keeping",on:t}),t||(this.latest={...this.latest,on:t,written:0,segments:[],bytes:0,lastDropped:null}),this.emit()}refresh(){this.node?.port.postMessage({type:"status"})}plan(t,n){return this.on?H0(this.latest,t,n):null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}keep(t,n){const a=this.node;if(!a||!this.on)return Promise.resolve(null);const r=++this.id;return new Promise(i=>{this.jobs.set(r,{parts:[],plan:null,rate:this.ctx.sampleRate,done:s=>{if(!s)return i(null);const l=s.plan.to-s.plan.from,u=new Blob([pu(l,s.rate,16),...s.parts],{type:uu});i({blob:u,name:U0(n.when??new Date,n.bpm,t),seconds:l/s.rate,frame:s.plan.frame,endFrame:s.plan.endFrame,start:s.plan.start,choice:t})}}),a.port.postMessage({type:"keep",id:r,choice:t,grid:n.grid??null,now:this.ctx.state!=="running"})})}emit(){for(const t of this.listeners)t()}message(t){if(t.type==="keep-status"&&t.status){this.latest=t.status,this.emit();return}const n=t.id===void 0?void 0:this.jobs.get(t.id);if(!(!n||t.id===void 0)){if(t.type==="keep-plan")n.plan=t.plan??null,n.rate=t.sampleRate??n.rate,n.plan||(this.jobs.delete(t.id),n.done(null));else if(t.type==="keep-part"){if(t.data)n.parts.push(t.data);else if(t.done){this.jobs.delete(t.id),n.done(null);return}t.done&&n.plan&&(this.jobs.delete(t.id),n.done({plan:n.plan,parts:n.parts,rate:n.rate}))}}}}const fu={threshold:-3,knee:0,ratio:20,attack:.001,release:.1};function Q0(e){return Math.floor(.006*e)}const qi=1024,bl=qi+8192,Z0=.25;function ey(e,t){let n=0;for(let a=t;a<e.length;a++)n=Math.max(n,Math.abs(e[a]??0));if(!(n>1e-6))return null;for(let a=t;a<e.length;a++)if(Math.abs(e[a]??0)>=n/2)return a-t;return null}async function ty(e,t,n=OfflineAudioContext){const a=new n(1,bl,e),r=a.createBuffer(1,bl,e);r.getChannelData(0)[qi]=Z0;const i=new AudioBufferSourceNode(a,{buffer:r}),s=t(a);i.connect(s.input),s.output.connect(a.destination),i.start(0);const l=await a.startRendering();return ey(l.getChannelData(0),qi)}function ny(e,t=()=>ty(e,n=>{const a=new DynamicsCompressorNode(n,fu);return{input:a,output:a}})){let n=Q0(e);const a=(async()=>{try{const r=await t();r!==null&&r>=0&&r<e/10&&(n=r)}catch{}})();return{get:()=>n,ready:a}}const ay=65,ry=90,iy=5e3,Oa=3,Ba=1;function oy(e,t){return e>=ry||t>=Oa?"over":t>0?"dropout":e>=ay?"busy":"ok"}function sy(e){return e==="over"?"Overloaded":e==="busy"?"Busy":e==="dropout"?"· dropout":""}function ly(e,t){return ee[`load:${t}`].replace("{pct}",String(Math.round(e)))}class cy{pct=0;state="ok";underruns=0;recent=[];read(t,n){this.pct=Math.max(0,Math.min(100,Number.isFinite(t.pct)?t.pct:0));const a=Number.isFinite(t.underruns)?Math.max(0,Math.floor(t.underruns)):0;this.underruns+=a;for(let r=0;r<Math.min(a,Oa);r++)this.recent.push(n);return this.tick(n)}tick(t){for(;this.recent.length&&t-this.recent[0]>=iy;)this.recent.shift();return this.recent.length>Oa&&this.recent.splice(0,this.recent.length-Oa),this.state=oy(this.pct,this.recent.length),this.state}}class dy{constructor(t=Ba){this.intervalS=t}lastStart=Number.NEGATIVE_INFINITY;take(t,n){return!((t??0)>0)||!Number.isFinite(n)||n<this.lastStart+this.intervalS*.9?0:(this.lastStart=n,1)}}function gt(e,t,n={}){const a=document.createElement(e);a.className=t;for(const[r,i]of Object.entries(n))a.setAttribute(r,i);return a}function uy(e={}){const t=e.now??(()=>performance.now()),n=new cy,a=gt("span","load-fill"),r=gt("span","load-pct"),i=gt("span","load-word"),s=gt("button","load",{type:"button","data-testid":"load-meter","data-state":"ok"});s.append(gt("span","load-label"),gt("span","load-bar",{"aria-hidden":"true"}),r,i),s.firstChild.textContent="Load",s.querySelector(".load-bar")?.append(a);const l=gt("div","nc-ui-help load-tip",{role:"tooltip",id:"load-tip","data-testid":"load-tip"});l.hidden=!0,s.setAttribute("aria-describedby","load-tip");let u=!1,d=0;const c={path:"none",pct:0,state:"ok",underruns:0,recent:0,readings:0,measured:!0,inject(v){u=v!==null,v&&f({pct:v.pct,underruns:v.underruns??(v.underrun?1:0)})}};window.__NC_LOAD__=c;function p(){const v=n.state;s.dataset.state=v,a.style.width=`${Math.round(n.pct)}%`,r.textContent=`${Math.round(n.pct)}%`,i.textContent=sy(v);const T=ly(n.pct,v);s.setAttribute("aria-label",T),l.textContent=T,c.pct=n.pct,c.state=v,c.underruns=n.underruns,c.recent=n.recent.length,c.readings=d,l.hidden||w()}function f(v){d++,n.read(v,t()),p()}function g(v){u||f(v)}window.setInterval(()=>{const v=n.state;n.tick(t())!==v&&p()},500);let m=0;function w(){l.isConnected||document.body.append(l);const v=s.getBoundingClientRect();l.style.visibility="hidden",l.style.top="0px",l.style.left="0px";const T=l.offsetWidth,M=8,b=Math.max(M,Math.min(v.left,window.innerWidth-T-M));l.style.top=`${Math.round(v.bottom+6)}px`,l.style.left=`${Math.round(b)}px`,l.dataset.side="below",l.style.visibility=""}function h(){l.hidden=!1,w()}function y(){window.clearTimeout(m),l.hidden=!0}l.style.position="fixed",l.style.pointerEvents="none",s.addEventListener("pointerenter",v=>{v.pointerType!=="touch"&&(window.clearTimeout(m),m=window.setTimeout(h,e.helpDelay??500))}),s.addEventListener("pointerleave",v=>{v.pointerType!=="touch"&&y()}),s.addEventListener("click",()=>l.hidden?h():y()),s.addEventListener("blur",y),document.addEventListener("pointerdown",v=>{s.contains(v.target)||y()}),document.addEventListener("keydown",v=>{v.key==="Escape"&&y()}),window.addEventListener("scroll",y,!0),p();let k=!1;return{el:s,start(v,T){if(k)return c.path;k=!0;const M=v.renderCapacity;if(M&&typeof M.start=="function"){const b=new dy(Ba);return M.addEventListener("update",x=>{const S=x,$=typeof S.timestamp=="number"?S.timestamp:v.currentTime-Ba;g({pct:(S.averageLoad??0)*100,underruns:b.take(S.underrunRatio,$)})}),M.start({updateInterval:Ba}),c.path="renderCapacity",c.path}if(T&&typeof AudioWorkletNode=="function")try{const x=Math.round((v.baseLatency??0)*v.sampleRate),S=new AudioWorkletNode(v,"nc-studio-load",{numberOfInputs:1,numberOfOutputs:0,processorOptions:{framesPerCallback:x}});return S.port.onmessage=$=>{$.data?.type==="load"&&(c.measured=$.data.measured,g({pct:$.data.load,underruns:$.data.underruns}))},c.path="worklet",c.path}catch{}return c.path="none",c.path}}}function py(e,t){const n=gt("div","transport-col");e.replaceWith(n),n.append(e,t.el)}const Fn={noManifest:"No plugin.json there. Pick the plugin's folder, or plugin.json and its DSP file.",noDsp:e=>`plugin.json names its DSP file ${e}. Pick that file too.`,badJson:"plugin.json is not JSON.",bad:e=>`plugin.json has a problem: ${e}`,tooBig:e=>`${e} is over 256 KB.`},hy=256*1024,fy=e=>e.includes("/")?e.slice(0,e.lastIndexOf("/")+1):"",Aa=e=>e.webkitRelativePath||e.name;async function my(e){const t=[...e],a=t.filter(f=>f.name==="plugin.json").sort((f,g)=>Aa(f).split("/").length-Aa(g).split("/").length)[0];if(!a)throw new Error(Fn.noManifest);const r=await a.text();let i;try{i=JSON.parse(r)}catch{throw new Error(Fn.badJson)}const s=pr(i);if(!s.ok||!s.manifest)throw new Error(Fn.bad(s.errors.join("; ")));const l=s.manifest,u=fy(Aa(a))+l.dsp,d=l.dsp.split("/").pop()??l.dsp,c=t.find(f=>Aa(f)===u)??t.find(f=>f!==a&&f.name===d&&!f.webkitRelativePath);if(!c)throw new Error(Fn.noDsp(l.dsp));const p=await c.text();if(new TextEncoder().encode(p).length>hy)throw new Error(Fn.tooBig(l.dsp));return{manifest:l,manifestText:r,dspName:l.dsp,dsp:p}}async function gy(e,t=Date.now()){return{id:e.manifest.id,version:e.manifest.version,name:e.manifest.name,author:e.manifest.author,licence:e.manifest.licence,manifest:e.manifestText,dspName:e.dspName,dsp:e.dsp,sha256:await $c(new TextEncoder().encode(e.dsp)),added:t}}const yl=e=>`local:${e}`,ar=e=>e.startsWith("local:"),mu=e=>({id:e.id,version:e.version,name:e.name,author:e.author,added:e.added});function gu(){const e=new Map;return{list:async()=>[...e.values()].sort((t,n)=>t.added-n.added).map(mu),get:async t=>e.get(t)??null,put:async t=>{e.set(t.id,t)},remove:async t=>{e.delete(t)}}}const by="netcomposer-studio-plugins",Ma="plugins";function yy(e=globalThis.indexedDB){const t=gu(),n=new Promise(i=>{if(!e)return i(null);try{const s=e.open(by,1);s.onupgradeneeded=()=>{s.result.objectStoreNames.contains(Ma)||s.result.createObjectStore(Ma,{keyPath:"id"})},s.onsuccess=()=>i(s.result),s.onerror=()=>i(null),s.onblocked=()=>i(null)}catch{i(null)}}),a=async(i,s,l)=>{const u=await n;return u?new Promise((d,c)=>{const p=u.transaction(Ma,i),f=s(p.objectStore(Ma));p.oncomplete=()=>d(f.result),p.onerror=()=>c(p.error??f.error),p.onabort=()=>c(p.error??f.error)}):l()},r=i=>{const s=i;return!!s&&typeof s.id=="string"&&typeof s.version=="string"&&typeof s.manifest=="string"&&typeof s.dsp=="string"};return{async list(){return(await a("readonly",s=>s.getAll(),async()=>{const s=await t.list();return Promise.all(s.map(l=>t.get(l.id)))})).filter(r).sort((s,l)=>s.added-l.added).map(mu)},async get(i){const s=await a("readonly",l=>l.get(i),()=>t.get(i));return r(s)?s:null},put:i=>a("readwrite",s=>s.put(i),()=>t.put(i)).then(()=>{}),remove:i=>a("readwrite",s=>s.delete(i),()=>t.remove(i)).then(()=>{})}}const it=-54,ca=6,Ke=-it/(ca-it),vy=-6,_i=(vy-it)/(ca-it);function bu(e){const t=Math.min(1,Math.max(0,e));return t===0?Number.NEGATIVE_INFINITY:it+t*(ca-it)}function wy(e){return e===Number.NEGATIVE_INFINITY?0:10**(e/20)}function xy(e){return e<=0?Number.NEGATIVE_INFINITY:20*Math.log10(e)}function bt(e){return wy(bu(e))}function ky(e){if(e===Number.NEGATIVE_INFINITY||e<-99)return"−∞";const t=e.toFixed(1);return t.startsWith("-")?`−${t.slice(1)}`:e>.05?`+${t}`:t}function $y(e){const t=e.some(n=>n.solo);return e.map(n=>n.mute||t&&!n.solo?0:bt(n.position))}function To(e){return e===Number.NEGATIVE_INFINITY||Number.isNaN(e)?0:Math.min(1,Math.max(0,(e-it)/(ca-it)))}function vl(e){return To(xy(e))}const wl=[0,-6,-12,-24,-48].map(e=>({value:To(e),label:e===0?"0":`−${-e}`})),Ey=1;function Sy(e){let t=0,n=0;for(const a of e){const r=Math.abs(a);r>t&&(t=r),n+=a*a}return{peak:t,rms:e.length>0?Math.sqrt(n/e.length):0}}function xl(e){const t=e.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(t==="")return null;if(t==="off"||t==="-inf"||t==="-∞"||t==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(t))return null;const n=Number(t.replace(",","."));return Number.isFinite(n)?n<it?0:To(Math.min(ca,n)):null}function Ay(e){const t=Math.min(1,Math.max(-1,Number.isFinite(e)?e:0)),n=Math.cos(Math.abs(t)*Math.PI/2);return t>0?[n,1]:t<0?[1,n]:[1,1]}const Lo="netcomposer.studio.mix.v1",yu={position:_i,mute:!1,solo:!1,sendA:0,sendB:0,pan:0,shade:0,trim:0},vu=-12,wu=24,My=.5;function xu(e){if(typeof e!="number"||!Number.isFinite(e))return 0;const t=Math.round(Math.min(wu,Math.max(vu,e))*10)/10;return t===0?0:t}const Ty=8;function Ly(e){return typeof e=="number"&&Number.isInteger(e)&&e>=1&&e<=Ty?e:0}function ea(){return{v:1,channels:{},master:Ke,returns:{a:{on:!0,level:Ke},b:{on:!0,level:Ke}},insert:{on:!1},fx:{},channelFx:{},masterFx:null}}const Un=(e,t)=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t,Cy=e=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(-1,e)):0,rr=(e,t)=>typeof e=="boolean"?e:t,yt=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{};function Ny(e){const t=yt(e);return{position:Un(t.position,yu.position),mute:rr(t.mute,!1),solo:rr(t.solo,!1),sendA:Math.min(Ke,Un(t.sendA,0)),sendB:Math.min(Ke,Un(t.sendB,0)),pan:Cy(t.pan),shade:Ly(t.shade),trim:xu(t.trim)}}function ku(e){const t=ea(),n=yt(e);if(n.v!==1)return t;const a={};for(const[d,c]of Object.entries(yt(n.channels)))d.length>0&&d.length<=64&&(a[d]=Ny(c));const r=yt(n.returns),i=(d,c)=>{const p=yt(d);return{on:rr(p.on,c.on),level:Un(p.level,c.level)}},s={},l=yt(n.fx);for(const d of["a","b","insert"])l[d]!==void 0&&(s[d]=l[d]);const u={};for(const[d,c]of Object.entries(yt(n.channelFx)))d.length>0&&d.length<=64&&c&&typeof c=="object"&&(u[d]=c);return{v:1,channels:a,master:Un(n.master,t.master),returns:{a:i(r.a,t.returns.a),b:i(r.b,t.returns.b)},insert:{on:rr(yt(n.insert).on,t.insert.on)},fx:s,channelFx:u,masterFx:n.masterFx&&typeof n.masterFx=="object"?n.masterFx:null}}function $u(){try{return globalThis.localStorage??null}catch{return null}}function Fy(e=$u()){try{const t=e?.getItem(Lo);return t?ku(JSON.parse(t)):ea()}catch{return ea()}}function Eu(e,t=$u()){try{return t?.setItem(Lo,JSON.stringify(e)),t!==null}catch{return!1}}const yr=3;function Iy(e,t=yr){return Math.max(1,Math.ceil(e/t))}function kl(e,t=yr){return Math.max(0,Math.floor(e/t))}function Py(e,t,n,a=null,r=yr){const i=Iy(n.length,r)-1;if(!e||e.key!==t)return 0;const s=a===null?-1:n.indexOf(a);if(s>=0)return kl(s,r);const l=new Set(e.ids);let u=-1;return n.forEach((d,c)=>{l.has(d)||(u=c)}),u>=0?kl(u,r):Math.min(i,Math.max(0,e.page))}const Ry=["M0 10 L0 1 L20 1 L20 10","M0 10 C3 10 6 1 12 1 L20 1","M0 10 C10 10 16 6 20 1 L20 10","M0 10 L0 1 L3 1 C5 1 6 9 11 10 L20 10","M0 8 C8 8 12 2 20 2"],Ta="Custom";function $l(e,t){const n={};for(const a of oe("gate")?.dials??[])n[a.key]=Number(e.getParam(t,a.key)??a.default);return n}function Dy(e,t,n,a,r){const i=oe("gate"),s=b=>i?.dials.find(x=>x.key===b),l=t.getPattern(n)??{levels:Array(16).fill(100),shapes:Array(16).fill(0)},u=$l(t,n),d=u.steps===8?8:16,c=Lc(u),p=b=>`hack-${e}-${n}-${b}`,f=cf({dials:u,pattern:l}),g=(b,x)=>{t.setParam(n,b,x),r.render()},m=(b,x)=>{const S=s(b);return S?.options?{type:"choice",id:p(b),label:S.label,caption:x,value:String(u[b]),options:S.options.map($=>({value:String($.value),label:$.label})),onChange:$=>g(b,Number($))}:null},w=b=>{const x=s(b);return x?r.dial(x):null},h={type:"levelSteps",id:p("steps-strip"),label:`${f===Ta?"Gate":f} steps`,steps:l.levels.slice(0,d).map((b,x)=>({level:b/100,shape:l.shapes[x]})),played:c,swing:.5+.25*(u.swing??0)/100,on:a,shapes:of.map((b,x)=>({value:x,label:b,icon:Ry[x]})),curve:(b,x)=>uf(u,l,b,x),onLevels:b=>{const x=l.levels.slice();b.forEach((S,$)=>{x[$]=Math.round(S*100)}),t.setPattern(n,{levels:x}),r.render()},onShape:(b,x)=>{const S=l.shapes.slice();S[b]=x,t.setPattern(n,{shapes:S}),r.render()},onShapeAll:b=>{t.setPattern(n,{shapes:Array(16).fill(b)}),r.render()},playhead:()=>{const b=t.beatAt(r.heardAt());return b?{step:df($l(t,n),b.beat,b.beatsPerBar),locked:b.locked}:null},help:ee["gate:steps"]},k=[{type:"select",id:p("pattern"),label:"Pattern",value:f,options:[...bn.map(b=>({value:b.name,label:b.name})),{value:Ta,label:Ta}],onChange:b=>{b!==Ta&&(t.setGatePattern(n,b),r.render())}},h,m("rate","Rate"),w("swing"),w("depth"),w("mix")],v=u.mode===1,T=[m("steps","Steps"),m("mode","Mode"),w("smooth"),w("spread"),...v?[w("res")]:[]],M=b=>b!==null;return{controls:k.filter(M),more:T.filter(M)}}const Su=e=>!!e&&typeof e=="object"&&Array.isArray(e.chain);function zy(e,t){if(!Su(e))return null;const n=e.chain.findIndex(a=>a?.id===t);return n<0?null:{slot:JSON.parse(JSON.stringify(e.chain[n])),index:n}}function Oy(e,t,n){if(!Su(e)||e.chain.length>=n||e.chain.some(r=>r?.id===t.slot.id))return null;const a=e.chain.slice();return a.splice(Math.max(0,Math.min(a.length,t.index)),0,t.slot),{...e,v:2,chain:a}}const El="plugin-url",Zr="plugin-folder",Sl="plugin-files",ei="kept:",ti="forget:",ni="listed:",By="../plugins/registry.json",O={urlTitle:"Load a plugin from a URL",urlBody:"Paste the address of the plugin's plugin.json.",urlField:"Address",urlPlaceholder:"https://…/plugin.json",urlNext:"Next",warnTitle:"Run this plugin?",warnBody:e=>`This runs code from ${e} in your browser. Only load plugins from people you trust. Listed plugins are checked; this one is not.`,warnLoad:"Load and run",badUrl:"That isn't a plugin address. Use https://, or http://localhost while you build one.",badUrlLocal:"Plugins load from this computer for now: pick its files, or use http://localhost while you build one.",urlPlaceholderLocal:"http://localhost:…/plugin.json",folder:"Load plugin folder…",files:"Load plugin from files…",url:"Load plugin from URL…",thisComputer:"this computer",kept:e=>`${e} (this computer)`,fileWarnBody:(e,t)=>`This runs ${e} by ${t}, from files on this computer, in your browser. Only run code you made or trust. It is kept in this browser until you remove it.`,forget:e=>`Remove ${e} from this computer…`,forgetTitle:e=>`Remove ${e}?`,forgetBody:"This browser forgets its copy. Slots that use it keep their dials and play as a wire after a reload.",forgetConfirm:"Remove",forgotten:e=>`${e} is removed from this computer.`,reloadToUse:(e,t)=>`Kept ${e} ${t}. Reload the page to hear the new code.`,reloadToHear:e=>`${e} has new code. Reload the page to hear it; until then the old code plays.`,reloadAction:"Reload",newCode:"Reload page: new code.",stuck:(e,t)=>`${e} on ${t} got stuck in a loop and was stopped. The rest of the mix plays on.`,frozenTitle:"The sound stopped",frozenBody:e=>`${e} froze the audio on this page, and it can't be restarted here. In a new tab your mix comes back with ${e} off (add it again to retry). This page stops saving.`,frozenOpen:"Open new tab",frozenStay:"Stay here",frozenShort:"Stopped: froze audio.",notKept:"Not on this computer.",pickAgain:"Pick files…",badUrlShort:"Not a plugin address.",failedShort:"Couldn't load it.",missing:"Missing: not loaded.",missingNoUrl:"Missing: no address saved.",through:"Sound passes through.",dialsKept:"Its dials are kept.",from:e=>`From ${e}`,load:"Load",loadAsk:"Load…",loading:"Loading…",retry:"Remove, add to retry."};function jy(e){const t={1:"Stopped: failed to start.",2:"Stopped: it crashed.",3:"Stopped: bad numbers.",4:"Stopped: a dial crashed it.",5:"Stopped: code not loaded.",6:"Stopped: stuck in a loop."};for(const[n,a]of Object.entries(Ua))if(a===e)return t[Number(n)];return"Stopped."}function In(e){if(ar(e))return O.thisComputer;try{return new URL(e).host||e}catch{return e}}function qy(e,t,n=!0){let a;try{a=new URL(e.trim(),t)}catch{return null}const r=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(a.hostname);return a.protocol==="https:"&&(n||r)||a.protocol==="http:"&&r?a.href:null}function _y(e){const t=new URL(By,e.base).href;let n=[];const a=new Set,r=new Map,i=[],s=new Set,l=()=>{for(const M of s)M()},u=M=>String(M?.message??M).replace(/^nc-fx plugins?: /,""),d=e.remote!==!1,c=e.store??gu();let p=[];const f=new Map,g=new Set,m=M=>{g.has(M)||(g.add(M),l())},w=e.frozen,h=async()=>{try{p=await c.list()}catch(M){console.warn(`Studio plugins: can't read this computer's plugins (${u(M)})`)}l()},y=h(),k=d?tf(t,{fetch:e.fetch}).then(M=>{n=M.registry.plugins;for(const x of M.errors)console.warn(`Studio plugins: registry ${x}`);l();const b=i.splice(0);b.length&&T.restore(b)}).catch(M=>{console.info(`Studio plugins: no listed plugins (${u(M)})`)}):Promise.resolve(),v=async(M,b)=>{a.add(M),r.delete(M),l();try{const{entry:x,stale:S}=await b();return x.plugin&&(S&&m(x.plugin.id),w?.clear(x.plugin.id)),x.type}catch(x){throw r.set(M,u(x)),x}finally{a.delete(M),l()}},T={listed:()=>n,loaded:()=>Mh().filter(M=>!M.plugin.listed&&!ar(M.plugin.url)),remote:d,local:()=>p,stale:M=>g.has(M),frozen:M=>!!w?.has(M),async addPicked(M){const b=await gy(M);w?.clear(b.id);const x=oe(`plugin:${b.id}`);if(x){const $=x.plugin?.version===b.version&&f.get(b.id)===b.sha256;return await c.put(b),await h(),$||m(b.id),$?{type:x.type}:{reload:!0}}const S=await v(b.id,()=>ws(e.ctx,{manifest:b.manifest,dsp:b.dsp,dspName:b.dspName},{moduleUrl:e.moduleUrl,url:yl(b.id)}));return f.set(b.id,b.sha256),await c.put(b),await h(),{type:S}},async loadKept(M){w?.clear(M);const b=oe(`plugin:${M}`),x=await c.get(M);if(b){const $=f.get(M);return x&&$&&$!==x.sha256&&m(M),b.type}if(!x)throw new Error(O.notKept);const S=await v(M,()=>ws(e.ctx,{manifest:x.manifest,dsp:x.dsp,dspName:x.dspName},{moduleUrl:e.moduleUrl,url:yl(M)}));return f.set(M,x.sha256),S},async forget(M){await c.remove(M),await h()},listingFor(M){const b=n.find(S=>S.id===M.id);if(!b)return null;const x=new URL(b.manifest,t).href;return!M.url||M.url===x?b:null},loading:M=>a.has(M),async loadListed(M){w?.clear(M);const b=oe(`plugin:${M}`);if(b)return b.type;await k;const x=n.find(S=>S.id===M);if(!x)throw new Error(`${M} isn't listed`);return v(M,()=>nf(e.ctx,x,t,{moduleUrl:e.moduleUrl,fetch:e.fetch}))},loadUrl(M){return v("url",()=>Ac(e.ctx,M,{moduleUrl:e.moduleUrl,fetch:e.fetch,base:e.base}))},restore(M){for(const b of M)if(!(b.status!=="missing"||a.has(b.id)||oe(`plugin:${b.id}`))&&!w?.has(b.id)){if(ar(b.url)){y.then(()=>{p.some(x=>x.id===b.id)&&!a.has(b.id)&&!oe(`plugin:${b.id}`)&&T.loadKept(b.id).catch(()=>{})});continue}if(d){if(!n.length){i.some(x=>x.id===b.id)||i.push(b);continue}T.listingFor(b)&&T.loadListed(b.id).catch(()=>{})}}},onChange(M){return s.add(M),()=>s.delete(M)},problem:M=>r.get(M)??null,clearProblem(M){r.delete(M)&&l()}};return T}const Au="netcomposer.studio.sends.v2";function Vy(e){try{return e?.getItem(Au)==="1"}catch{return!1}}function Hy(e,t){try{e?.setItem(Au,t?"1":"0")}catch{}}function Uy(e,t){try{return!!(e?.matchMedia(t.portrait).matches||e?.matchMedia(t.landscape).matches)}catch{return!1}}function ir(e){return e.hacksShown!==null?{kind:"stack",id:e.hacksShown}:e.sendsShown?{kind:"sends"}:{kind:"none"}}function Gy(e){return ir(e).kind==="sends"?{hacksShown:null,sendsShown:!1}:{hacksShown:null,sendsShown:!0}}function Wy(e){for(const t of e)if(t.sendA>0||t.sendB>0)return!0;return!1}function Al(e,t){return e&&!t}function Ky(e,t,n){return e&&ir(t).kind==="none"&&n.every(a=>a===0)}const Mu="netcomposer.studio.strip-fold.v1";function Tu(e){try{const t=e?.getItem(Mu),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Lu(e,t){try{e?.setItem(Mu,JSON.stringify([...t].sort()))}catch{}return t}function Cu(e,t,n){const a=new Set(Tu(e));return n?a.add(t):a.delete(t),Lu(e,a)}function Yy(e,t){return Cu(e,t,!1)}function Xy(e,t){const n=new Set(t),a=Tu(e),r=new Set([...a].filter(i=>n.has(i)));return r.size===a.size?a:Lu(e,r)}function Jy(e,t){if(!e.includes(t.id))return[...e];const n=e.filter(i=>i!==t.id),a=t.before===null?-1:n.indexOf(t.before),r=a<0?n.length:a;return[...n.slice(0,r),t.id,...n.slice(r)]}function Qy(e,t,n){const a=e.indexOf(t);if(a<0)return null;const r=a+n;return r<0||r>=e.length?null:n<0?{id:t,before:e[r]}:{id:t,before:e[r+1]??null}}function Zy(e,t){if(e.length===0)return null;let n=e[0],a=Number.POSITIVE_INFINITY;for(const r of e){const i=t<r.left?r.left-t:t>r.left+r.width?t-(r.left+r.width):0;i<a&&(n=r,a=i)}return{target:n.id,side:t<n.left+n.width/2?"before":"after"}}function Ml(e,t,n){const a=e.indexOf(n.target);if(a<0||!e.includes(t))return null;const r=n.side==="before"?n.target:e[a+1]??null;if(r===t)return null;const i={id:t,before:r};return Jy(e,i).every((l,u)=>l===e[u])?null:i}const ev=-18,tv=-20,Nu=3,nv=[-20,-10,-7,-5,-3,-2,-1,0,1,2,3],Tl=[-20,-10,-7,-5,-3,0,1,2,3],av=.3,rv=6.638/av,iv=48;function ov(e){return e-ev}function Fu(e){return Number.isFinite(e)?Math.min(1,Math.max(0,10**((e-Nu)/20))):e>0?1:0}function sv(e){return e>0?Fu(ov(20*Math.log10(e))):0}function Co(e){return(Math.min(1,Math.max(0,e))*2-1)*iv}const Ll={x:0,v:0};function lv(e,t,n,a=!1){if(a)return{x:t,v:0};if(!(n>0))return e;const r=rv,i=e.x-t,s=e.v+r*i,l=Math.exp(-r*n),u=t+(i+s*n)*l,d=(e.v-r*s*n)*l;return u>=1?{x:1,v:0}:u<=0?{x:0,v:0}:{x:u,v:d}}function cv(e,t){return Math.abs(e.x-t)<1e-4&&Math.abs(e.v)<.001}const Iu="netcomposer.studio.vu.v1";function dv(e){try{return e?.getItem(Iu)==="1"}catch{return!1}}function uv(e,t){try{e?.setItem(Iu,t?"1":"0")}catch{}}const Pu="netcomposer.studio.vu-fold.v1";function pv(e){try{return e?.getItem(Pu)==="1"}catch{return!1}}function hv(e,t){try{e?.setItem(Pu,t?"1":"0")}catch{}}const fv="http://www.w3.org/2000/svg",Vi=200,ai=112,on=Vi/2,Gn=132,Cl=100,mv=108,gv=105,bv=116,yv=103,vv=112,Qe=(e,t)=>{const n=document.createElementNS(fv,e);for(const[a,r]of Object.entries(t))n.setAttribute(a,String(r));return n},Nl=e=>Math.round(e*100)/100;function Wn(e,t){const n=Co(Fu(e))*Math.PI/180;return[Nl(on+t*Math.sin(n)),Nl(Gn-t*Math.cos(n))]}function Fl(e,t,n){const[a,r]=Wn(e,n),[i,s]=Wn(t,n);return`M ${a} ${r} A ${n} ${n} 0 0 1 ${i} ${s}`}const wv=e=>e>0?`+${e}`:e<0?`−${-e}`:"0";function Il(e){const t=Qe("svg",{class:"vu-meter",viewBox:`0 0 ${Vi} ${ai}`,role:"img","aria-label":`${e==="L"?"Left":"Right"} VU meter`,"data-vu-side":e});t.append(Qe("rect",{class:"vu-face",x:.5,y:.5,width:Vi-1,height:ai-1,rx:4})),t.append(Qe("path",{class:"vu-arc",d:Fl(tv,0,Cl)})),t.append(Qe("path",{class:"vu-zone",d:Fl(0,Nu,yv)}));for(const i of nv){const[s,l]=Wn(i,Cl),[u,d]=Wn(i,Tl.includes(i)?mv:gv);t.append(Qe("line",{class:i>0?"vu-tick vu-red":"vu-tick",x1:s,y1:l,x2:u,y2:d}))}for(const i of Tl){const[s,l]=Wn(i,bv),u=Qe("text",{class:i>0?"vu-num vu-red":"vu-num",x:s,y:l,"text-anchor":"middle"});u.textContent=Math.abs(i)===20||i===3?wv(i):String(Math.abs(i)),t.append(u)}const n=Qe("text",{class:"vu-legend",x:on,y:92,"text-anchor":"middle"});n.textContent="VU";const a=Qe("text",{class:"vu-side",x:10,y:ai-10});a.textContent=e;const r=Qe("line",{class:"vu-needle",x1:on,y1:Gn,x2:on,y2:Gn-vv,transform:`rotate(${Co(0)} ${on} ${Gn})`});return t.append(n,a,r),{svg:t,needle:r}}function xv(e){const t=document.createElement("div");t.className="vu",t.dataset.vu="",t.setAttribute("role","group"),t.setAttribute("aria-label","VU meters");const n=document.createElement("div");n.className="vu-hd";const a=document.createElement("button");a.type="button",a.className="nc-fold-toggle",a.dataset.vuFold="";const r=document.createElement("span");r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),a.append(r),a.setAttribute("data-nc-help",ee["vu:fold"]);const i=document.createElement("span");i.className="nc-strip-name vu-name",i.textContent="Meters",i.setAttribute("data-nc-help",ee["vu:module"]);const s=document.createElement("button");s.type="button",s.className="nc-page-action vu-hide",s.dataset.vuRemove="",s.textContent="Hide",s.setAttribute("aria-label","Hide VU meters"),s.setAttribute("data-nc-help",ee["vu:remove"]),s.addEventListener("click",()=>e.onRemove(s)),n.append(a,i,s);const l=document.createElement("div");l.className="vu-mini",l.setAttribute("aria-hidden","true");const u=["L","R"].map(y=>{const k=document.createElement("span");k.className="vu-bar",k.dataset.side=y;const v=document.createElement("span");return v.className="vu-bar-fill",k.append(v),l.append(k),v});let d=e.folded;const c=()=>{t.toggleAttribute("data-folded",d),a.setAttribute("aria-expanded",d?"false":"true"),a.setAttribute("aria-label",d?"Expand VU meters":"Minimize VU meters"),a.title=d?"Expand":"Minimize"};c(),a.addEventListener("click",()=>{d=!d,c(),e.onFold(d)});const p=Il("L"),f=Il("R");t.append(n,p.svg,f.svg,l);const g=matchMedia("(prefers-reduced-motion: reduce)"),m=[Ll,Ll],w=[Number.NaN,Number.NaN],h=[p.needle,f.needle];return{el:t,frame(y,k){let v=!1;for(const T of[0,1]){const M=y?sv(y[T]):0;m[T]=lv(m[T],M,k,g.matches),(!cv(m[T],M)||M>0)&&(v=!0);const b=Math.round(Co(m[T].x)*10)/10;b!==w[T]&&(w[T]=b,h[T].setAttribute("transform",`rotate(${b} ${on} ${Gn})`),u[T].style.transform=`scaleY(${Math.max(0,Math.min(1,m[T].x)).toFixed(3)})`,t.dataset[T===0?"vuL":"vuR"]=b.toFixed(1))}return v}}}const kv="netcomposer.studio.hidden.v1",La=1/120,ft="master",Pl="Inserts",$v="(max-width: 768px)",Ru=8,ja=e=>ky(bu(e)),Rl=e=>{const t=ja(e);return t==="−∞"?"off":`${t} dB`};function Ev(e,t){return dn.find(n=>n.type===e)?.dials.find(n=>n.key===t)}function Sv(e,t,n){const a=n.bpm,r=E=>{const C=n.order(),F=C.indexOf(E);return F<0?C.length:F},i=(E,C,F,z)=>{const D=Ev(F,z);if(!D||!C)return null;const J=Number(C.getParam(F,z)??D.default),te=`mix-${E}-${z}`;return D.options?{type:"select",id:te,label:D.label,value:String(J),options:D.options.map(R=>({value:String(R.value),label:R.label})),onChange:R=>{C.setParam(F,z,Number(R)),re.render()}}:{type:"slider",id:te,label:D.label,min:D.min,max:D.max,step:D.step??1,taper:Ds(D),value:J,valueText:D.format(J,a()),onChange:R=>{C.setParam(F,z,R),re.render()}}},s=(E,C,F,z)=>z.map(D=>i(E,C,F,D)).filter(D=>D!==null),l=matchMedia($v);let u=null;const d=E=>{u=E,re.render()},c=E=>d(u===E?null:E);l.addEventListener("change",()=>re.render());const p=(E,C,F,z)=>{E.setParam(C,F,z),re.render()},f=(E,C,F,z)=>Of(C,F,{id:`hack-${E}-${F}-graph`,on:z,set:(D,J)=>p(C,F,D,J),help:{graph:ee["eq:graph"],low:ee["eq:low"],mid:ee["eq:mid"],high:ee["eq:high"]}}),g=(E,C,F,z)=>{const D=Number(C.getParam(F,z.key)??z.default),J=`hack-${E}-${F}-${z.key}`,te=R=>p(C,F,z.key,R);return z.options?{type:"select",id:J,label:z.label,value:String(D),options:z.options.map(R=>({value:String(R.value),label:R.label})),onChange:R=>te(Number(R))}:{type:"slider",id:J,label:z.label,min:z.min,max:z.max,step:z.step??.001,taper:Ds(z),value:D,valueText:bc(z,D,a()),onChange:te}},m="",w={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3},drive:{drive_db:6}};let h=I0($e(),`${ft}/${cu}`);const y=E=>({folded:h.has(E),onFold:C=>{h=su($e(),E,C),re.render()},foldHelp:ee["fx:fold"]}),k=n.plugins;k?.onChange(()=>re.render());const v=new Map,T=E=>String(E?.message??E).replace(/^nc-fx plugins?: /,""),M=(E,C,F)=>{v.set(E,C),re.render(),rn({message:F,duration:9e3,anchor:ue.el.querySelector(`[data-nc-id='hack-${E}-add']`)})},b=(E,C)=>{const F=rn({message:C,duration:12e3,actionLabel:O.reloadAction,onAction:()=>location.reload(),anchor:ue.el.querySelector(`[data-nc-id='hack-${E}-add']`)});F.el.dataset.pluginReload=E},x=E=>oe(E)?.label??E,S=E=>!!E&&E.startsWith("plugin:")&&!!k?.stale(E.slice(7)),$=async(E,C,F)=>{if(!k)return null;const z=F??await km({title:O.urlTitle,body:O.urlBody,field:{label:O.urlField,placeholder:k.remote?O.urlPlaceholder:O.urlPlaceholderLocal,type:"url"},confirmLabel:O.urlNext,returnFocus:C??void 0});if(!z)return null;const D=qy(z,location.href,k.remote);if(!D)return M(E,O.badUrlShort,k.remote?O.badUrl:O.badUrlLocal),null;if(!await Ge({title:O.warnTitle,body:O.warnBody(In(D)),confirmLabel:O.warnLoad,danger:!0,returnFocus:C??void 0}))return null;try{const te=await k.loadUrl(D);return S(te)&&b(E,O.reloadToHear(x(te))),te}catch(te){return te?.reload?(v.set(E,O.failedShort),re.render(),b(E,T(te))):M(E,O.failedShort,T(te)),null}},L=E=>{const C=document.createElement("input");return C.type="file",C.hidden=!0,C.dataset.ncId="plugin-files",E?C.webkitdirectory=!0:(C.multiple=!0,C.accept=".json,.js,.mjs,application/json,text/javascript"),document.body.append(C),new Promise(F=>{const z=D=>{C.remove(),F(D)};C.addEventListener("change",()=>z(C.files?.length?[...C.files]:null)),C.addEventListener("cancel",()=>z(null)),C.click()})},N=async(E,C,F)=>{if(!k)return null;const z=await L(F);if(!z)return null;let D;try{D=await my(z)}catch(te){return M(E,O.failedShort,T(te)),null}if(!await Ge({title:O.warnTitle,body:O.fileWarnBody(D.manifest.name,D.manifest.author),confirmLabel:O.warnLoad,danger:!0,returnFocus:C??void 0}))return null;try{const te=await k.addPicked(D);return"reload"in te?(b(E,O.reloadToUse(D.manifest.name,D.manifest.version)),null):te.type}catch(te){return M(E,O.failedShort,T(te)),null}},B=async(E,C,F)=>{if(!k)return;const z=k.local().find(J=>J.id===C)?.name??C;await Ge({title:O.forgetTitle(z),body:O.forgetBody,confirmLabel:O.forgetConfirm,danger:!0,returnFocus:F??void 0})&&(await k.forget(C),rn({message:O.forgotten(z),duration:5e3,anchor:ue.el.querySelector(`[data-nc-id='hack-${E}-add']`)}))},V=async(E,C,F,z)=>{v.delete(E);let D=F;if(F===Zr||F===Sl)D=await N(E,z,F===Zr);else if(F.startsWith(ti))await B(E,F.slice(ti.length),z),D=null;else if(F.startsWith(ei)&&k){re.render();try{D=await k.loadKept(F.slice(ei.length)),S(D)&&b(E,O.reloadToHear(x(D)))}catch(J){M(E,O.failedShort,T(J)),D=null}}else if(F===El)D=await $(E,z);else if(F.startsWith(ni)&&k){re.render();try{D=await k.loadListed(F.slice(ni.length))}catch(J){M(E,O.failedShort,T(J)),D=null}}D&&C.addEffect(D,{dials:w[D]}),re.render()},K=()=>k?[...k.listed().map(E=>({value:`${ni}${E.id}`,label:E.name,group:"Plugins"})),...k.local().map(E=>({value:`${ei}${E.id}`,label:O.kept(E.name),group:"Plugins"})),...k.loaded().map(E=>({value:E.type,label:`${E.label} (${In(E.plugin.url)})`,group:"Plugins"})),{value:Zr,label:O.folder,group:"Plugins"},{value:Sl,label:O.files,group:"Plugins"},{value:El,label:O.url,group:"Plugins"},...k.local().map(E=>({value:`${ti}${E.id}`,label:O.forget(E.name),group:"Plugins"}))]:[];let ne=null,be=null,ce=null;const se=E=>t.masterFx===E||t.list().some(C=>C.fx===E),Y=E=>requestAnimationFrame(()=>ue.el.querySelector(E)?.focus()),Kt=(E,C,F,z,D,J,te)=>{const R=zy(F.getState(),z);if(!R||!F.removeEffect(z))return;const me=!!te&&te===document.activeElement;if(ce?.close(),re.render(),me){const Nt=F.getChain()[R.index];Y(Nt?`[data-nc-id='hack-${E}-${Nt.id}'] [data-nc-fx-remove]`:`#hack-${E}-add-type`)}const G=rn({message:`${D} removed from ${C}.`,actionLabel:"Undo",anchor:ue.el.querySelector("[data-nc-area='fx']"),onAction:()=>Lt(E,F,R,J),onClose:()=>{ce===G&&(ce=null)}});G.el.dataset.insertUndo=E,ce=G},Lt=(E,C,F,z)=>{if(!se(C))return;const D=Oy(C.getState(),F,z);let J=F.slot.id;if(D)C.setState(D);else{const{type:te,dials:R,bypass:me,pattern:G}=F.slot;J=C.addEffect(te,{index:F.index,dials:R,bypass:me}),J&&G&&C.setPattern(J,G)}J&&(u=E,be=`hack-${E}-${J}`,re.render(),Y(`[data-nc-id='hack-${E}-${J}'] [data-nc-fx-remove]`))},Ct=(E,C,F,z)=>{const D=F.getChain(),J=D.map((R,me)=>{const G=oe(R.type),Nt=G?.dials??[],is=de=>Kt(E,C,F,R.id,R.name,z,de),os=de=>{F.moveEffect(R.id,de),be=`hack-${E}-${R.id}`,re.render()},Mn=[];me>0&&Mn.push({type:"button",id:`hack-${E}-${R.id}-left`,label:"Move left",on:!1,onPress:()=>os(me-1)}),me<D.length-1&&Mn.push({type:"button",id:`hack-${E}-${R.id}-right`,label:"Move right",on:!1,onPress:()=>os(me+1)}),Mn.push({type:"button",id:`hack-${E}-${R.id}-remove`,label:"Remove",ariaLabel:`Remove ${R.name} from ${C}`,on:!1,onPress:()=>is(document.getElementById(`hack-${E}-${R.id}-remove`))});const ss={onRemove:de=>is(de),removeLabel:`Remove ${R.name}`},pe=R.plugin,Fe=(de,Ft,Jt=!1)=>({type:"note",id:`hack-${E}-${R.id}-${de}`,...Jt?{tone:"danger"}:{},text:Ft});if(pe&&pe.status==="missing"){const de=k?.listingFor(pe)??null,Ft=ar(pe.url),Jt=Ft&&!!k?.local().some(ga=>ga.id===pe.id),ls=k?.loading(pe.id)??!1,cs=ls?[Fe("missing",O.loading)]:[Fe("missing",k?.frozen(pe.id)?O.frozenShort:Ft&&!Jt?O.notKept:pe.url?O.missing:O.missingNoUrl,!0),Fe("through",O.through),Fe("kept",O.dialsKept),...pe.url?[Fe("from",O.from(In(pe.url)))]:[]];return k&&pe.url&&!ls&&cs.push({type:"button",id:`hack-${E}-${R.id}-load`,label:de||Jt?O.load:Ft?O.pickAgain:O.loadAsk,ariaLabel:de||Jt?`Load ${pe.name}`:Ft?`Pick ${pe.name}'s folder (asks first)`:`Load ${pe.name} from ${In(pe.url)} (asks first)`,on:!1,onPress:()=>{const ga=document.getElementById(`hack-${E}-${R.id}-load`);de?k.loadListed(pe.id).catch(()=>re.render()):Jt?k.loadKept(pe.id).catch(()=>re.render()):Ft?N(E,ga,!0).then(()=>re.render()):$(E,ga,pe.url)}}),{type:"fx",id:`hack-${E}-${R.id}`,title:`${me+1} · ${R.name}`,...y(`${E}/${R.id}`),depth:me%4+1,controls:cs,more:Mn,...ss}}const Xt=G&&"plugin"in G?G.plugin:void 0,Wp=Xt?[Fe("by",`By ${Xt.author}`),Fe("version",`${Xt.licence} · ${Xt.version}`),Fe("source",Xt.listed?"Listed":O.from(In(Xt.url)))]:[],Kp=pe?.status==="failed"?[Fe("failed",jy(pe.error),!0),Fe("through",O.through),Fe("retry",O.retry)]:pe&&k?.stale(pe.id)?[Fe("newcode",O.newCode)]:[],ma=R.type==="gate"?Dy(E,F,R.id,!R.bypass,{dial:de=>g(E,F,R.id,de),render:()=>re.render(),heardAt:()=>t.ctx.currentTime-(t.ctx.outputLatency||0)}):null;return{type:"fx",id:`hack-${E}-${R.id}`,title:`${me+1} · ${R.name}`,...y(`${E}/${R.id}`),depth:me%4+1,on:!R.bypass,meter:Or(F,R.id)??void 0,meterHelp:ee["fx:meter"],onToggle:de=>{F.setParam(R.id,"bypass",!de),re.render()},controls:ma?ma.controls:[...Kp,...R.type==="eq"?[f(E,F,R.id,!R.bypass)]:[],...Nt.filter(de=>!de.more).map(de=>g(E,F,R.id,de))],maxHelp:ee["fx:max"],...ss,more:[...ma?ma.more:Nt.filter(de=>de.more).map(de=>g(E,F,R.id,de)),...Wp,...Mn]}}),te=D.length>=z;return J.push({type:"fx",id:`hack-${E}-add`,title:`${C} · Inserts`,...y(`${E}/add`),depth:D.length%4+1,controls:[{type:"note",id:`hack-${E}-note`,...v.get(E)?{tone:"danger"}:{},text:v.get(E)??(k?.loading("url")||k?.listed().some(R=>k.loading(R.id))||k?.local().some(R=>k.loading(R.id))?O.loading:te?`${D.length} of ${z}: the stack is full.`:D.length===0?"No effects yet.":`${D.length} of ${z}, first to last.`)},...te?[]:[{type:"select",id:`hack-${E}-add-type`,label:"Add",value:m,options:[{value:m,label:"Effect…"},...Eh.map(R=>({value:R,label:oe(R)?.label??R})),...K()],onChange:R=>{if(R===m)return;const me=document.getElementById(`hack-${E}-add-type`);me instanceof HTMLSelectElement&&(me.value=m),V(E,F,R,me)}}]]}),J},fa=E=>{const C=t.returns[E];return{type:"slider",id:`mix-${E}-return`,label:"Return",min:0,max:1,step:La,value:C.level,valueText:Rl(C.level),onChange:F=>t.setReturn(E,{level:F})}};let ye=Vy($e());const U=()=>Uy(globalThis.window,{portrait:Hd,landscape:Uc}),xe=()=>{const E=Gy({hacksShown:u,sendsShown:ye});u=E.hacksShown,E.sendsShown!==ye&&(ye=E.sendsShown,Hy($e(),ye)),re.render()},fe=(E,C,F)=>{const z=Qy(n.order(),E,C);if(!z)return;n.onReorder?.(z.id,z.before);const J=ue.el.querySelector(`${vt}[data-nc-id="strip-${CSS.escape(E)}"]`)?.querySelector(F);J&&document.activeElement!==J&&J.focus()};let De=Xy($e(),n.order());const Xe=()=>Ky(U(),{hacksShown:u,sendsShown:ye},t.list().map(E=>E.strip.trim)),Up=()=>[...t.list()].sort((E,C)=>r(E.id)-r(C.id)).map(E=>({type:"strip",id:`strip-${E.id}`,label:E.name,value:E.strip.position,valueText:ja(E.strip.position),step:La,defaultValue:_i,resetText:`${ja(_i)} dB`,ticks:[...wl],mute:E.strip.mute,solo:E.strip.solo,silent:E.silent,sendsHidden:Al(U(),ye),onChange:C=>t.set(E.id,{position:C}),onTypeIn:C=>{const F=xl(C);F!==null&&t.set(E.id,{position:F})},onRemove:C=>n.onRemove(E.id,C),folded:De.has(E.id),onFold:C=>{De=Cu($e(),E.id,C),re.render()},foldHelp:ee["strip:fold"],foldedHelp:ee["strip:folded"],onMove:C=>fe(E.id,C,"[data-nc-strip-grip]"),shade:E.strip.shade,onShade:C=>t.set(E.id,{shade:C??0}),...E.fx?{hacks:u===E.id,hacksLabel:Pl,hacksEmpty:E.fx.getChain().length===0,onHacks:()=>c(E.id)}:{},trim:{id:`trim-${E.id}`,value:E.strip.trim,min:vu,max:wu,step:My,defaultValue:0,ariaLabel:`${E.name} trim`,help:ee["strip:trim"],onChange:C=>t.set(E.id,{trim:xu(C)})},trimHidden:Xe(),pan:{id:`pan-${E.id}`,value:E.strip.pan,ariaLabel:`${E.name} pan`,help:ee["strip:pan"],onChange:C=>t.set(E.id,{pan:Math.abs(C)<.005?0:C})},onMute:()=>t.set(E.id,{mute:!E.strip.mute}),onSolo:()=>t.set(E.id,{solo:!E.strip.solo}),sends:["A","B"].map(C=>{const F=C==="A"?"sendA":"sendB",z=E.strip[F];return{id:`send-${C.toLowerCase()}-${E.id}`,label:C,ariaLabel:`${E.name} send ${C}`,min:0,max:Ke,step:La*2,value:z,valueText:Rl(z),defaultValue:0,onChange:D=>t.set(E.id,{[F]:D})}})})),Gp=()=>({type:"strip",id:`strip-${ft}`,label:"Master",master:!0,sendsHidden:Al(U(),ye),trimRow:!0,trimHidden:Xe(),onSendsView:xe,sendsView:ir({hacksShown:u,sendsShown:ye}).kind==="sends",sendsViewEmpty:!Wy(t.list().map(E=>E.strip)),sendsViewLabel:"Sends",sendsViewHelp:ee["sends:view"],...t.masterFx?{hacks:u===ft,hacksLabel:Pl,hacksEmpty:t.masterFx.getChain().length===0,onHacks:()=>c(ft)}:{},channels:2,value:t.masterPositionValue,valueText:ja(t.masterPositionValue),step:La,defaultValue:Ke,resetText:"0.0 dB",ticks:[...wl],onChange:E=>t.setMaster(E),onTypeIn:E=>{const C=xl(E);C!==null&&t.setMaster(C)}});let Jo=au($e());const Qo=E=>({folded:Jo[E],foldSlim:!0,onFold:C=>{Jo=ru($e(),E,C),re.render()},foldHelp:ee["fx:fold"]});let Sn=dv($e()),Yt=null,An=!0;const Zo=E=>{Sn=E,An=!0,uv($e(),E),re.render()},es=()=>{const E=t.returns.a,C=t.returns.b,F=u===ft&&t.masterFx?{id:ft,name:"Master",fx:t.masterFx}:(()=>{const G=t.list().find(Nt=>Nt.id===u);return G?.fx?{id:G.id,name:G.name,fx:G.fx}:null})();F||(u=null);const z=t.masterFx?.getChain()??[],D=[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:E.on,onToggle:G=>t.setReturn("a",{on:G}),meter:Or(E.fx)??void 0,meterHelp:ee["fx:meter-return"],...Qo("a"),controls:[fa("a"),...s("a",E.fx,"plate",["decay","size"])],more:s("a",E.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:C.on,onToggle:G=>t.setReturn("b",{on:G}),meter:Or(C.fx)??void 0,meterHelp:ee["fx:meter-return"],...Qo("b"),controls:[fa("b"),...s("b",C.fx,"delay",["delay_beats","feedback"])],more:s("b",C.fx,"delay",["tone","low_cut"])}],J=F?[...Ct(F.id,F.name,F.fx,F.id===ft?Bi:Ru)]:ye?D:[],te=F?.id??"sends",R=J.map(G=>G.id),me=Py(ne,te,R,be);return ne={key:te,ids:R,page:me},be=null,{id:"mix",title:"Mix",summary:`${t.list().map(G=>G.name).join(", ")||"No instruments"} · A Reverb · B Delay · Master ${z.filter(G=>!G.bypass).map(G=>G.name).join(", ")||"no inserts on"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[...Up(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(G=>({value:G.id,label:G.available===!1?`${G.name} (soon)`:G.name,disabled:G.available===!1})),onAdd:G=>n.onAdd(G)}]},{id:"fx",area:"fx",label:F?`${F.name} inserts`:"Send effects",pageSize:yr,page:me,onPage:G=>{ne&&(ne={...ne,page:G})},controls:J},...Sn?[{id:"meters",area:"meters",label:"VU meters",controls:[]}]:[],{id:"master",area:"master",label:"Master",controls:[Gp()]}]}},ue=Yb(es(),kv),ts=()=>ue.el.toggleAttribute("data-hacks-folded",ir({hacksShown:u,sendsShown:ye}).kind==="none"&&l.matches);ts();const Ve=document.createElement("button");Ve.type="button",Ve.className="nc-page-action vu-add",Ve.dataset.vuAdd="",Ve.textContent="+ Meters",Ve.setAttribute("aria-label","Add VU meters"),Ve.setAttribute("data-nc-help",ee["vu:add"]),Ve.addEventListener("click",()=>{Zo(!0),Yt?.el.querySelector("[data-vu-remove]")?.focus()}),ue.el.querySelector(".nc-module-end")?.prepend(Ve);const ns=()=>ue.el.toggleAttribute("data-sends-hidden",!ye);ns();const as=()=>{Ve.hidden=Sn;const E=ue.el.querySelector('[data-nc-section="meters"]');!Sn||!E||(Yt??=xv({onRemove:()=>{Zo(!1),Ve.focus()},folded:pv($e()),onFold:C=>{An=!0,hv($e(),C)}}),Yt.el.parentElement!==E&&E.append(Yt.el))};as(),Cv(ue.el,n,fe),Lv(ue.el,t,n),zl(ue.el),Dl(ue.el),Xb(e,[ue],"adjacent");const rs=E=>({peak:vl(E.peak),rms:vl(E.rms),over:E.peak>=Ey}),re={module:ue,get hacksShown(){return u},showHacks:d,render(){ue.update(es()),ts(),as(),ns(),zl(ue.el),Dl(ue.el)},frame(E){if(ue.el.dataset.ncOpen!=="true")return;for(const F of t.list())ol(ue.el,`strip-${F.id}`)?.update([rs(F.levels())],E);const C=t.masterLevels();if(ol(ue.el,`strip-${ft}`)?.update(C.map(rs),E),Yt&&Sn){const F=t.ctx.state==="running";F&&(An=!0),An&&(An=Yt.frame(F?[C[0].rms,C[1].rms]:null,E))}}};return re}const vt=".nc-strip:not([data-nc-master])",qa=e=>e?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null,Av="[data-nc-strip-grip], .nc-strip-hd, .nc-strip-fold",Mv=6,Tv=400,Ca=12;function Dl(e){for(const t of e.querySelectorAll(".nc-strip [data-nc-hacks]"))t.setAttribute("data-nc-help",t.closest("[data-nc-master]")?ee["inserts:master"]:ee["inserts:channel"]);for(const t of e.querySelectorAll(':is([data-nc-id="mix-a"], [data-nc-id="mix-b"]) .nc-ui-fx-hd .nc-ui-fx-name'))t.setAttribute("data-nc-help",ee["mix:sends"])}function zl(e){for(const t of e.querySelectorAll(`${vt} .nc-strip-hd > .nc-strip-name`))t.setAttribute("data-nc-help",ee["strip:name"]);for(const t of e.querySelectorAll(`${vt} .nc-strip-hd`))t.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight")}function Lv(e,t,n){e.addEventListener("dblclick",a=>{const r=a.target instanceof Element?a.target.closest(".nc-strip-hd > .nc-strip-name"):null,i=r?.closest(vt),s=qa(i??null),l=r?.parentElement;if(!s||!l||!n.onRename||l.hasAttribute("data-renaming"))return;const u=t.list().find(f=>f.id===s)?.name??r.textContent??"",d=document.createElement("input");d.type="text",d.className="nc-strip-name-input",d.value=u,d.maxLength=Jd,d.spellcheck=!1,d.autocomplete="off",d.setAttribute("aria-label",`Rename ${u}`),d.setAttribute("data-nc-help",ee["strip:rename"]),l.setAttribute("data-renaming",""),l.insertBefore(d,r),d.focus(),d.select();let c=!1;const p=f=>{if(c)return;c=!0;const g=d.value;d.remove(),l.removeAttribute("data-renaming"),f&&g!==u&&n.onRename?.(s,g)};d.addEventListener("keydown",f=>{f.key==="Enter"?(f.preventDefault(),p(!0)):f.key==="Escape"&&(f.preventDefault(),p(!1))}),d.addEventListener("blur",()=>p(!0)),d.addEventListener("click",f=>f.stopPropagation())})}function Cv(e,t,n){let a=null;const r=()=>{for(const c of e.querySelectorAll("[data-drop]"))c.removeAttribute("data-drop")},i=()=>{a&&(window.clearTimeout(a.timer),a.strip.removeAttribute("data-dragging"),e.removeAttribute("data-strip-drag"),r(),a=null)},s=c=>{c.active=!0,c.strip.setAttribute("data-dragging","true"),e.setAttribute("data-strip-drag",""),c.touch&&!c.grip&&navigator.vibrate?.(10)},l=()=>[...e.querySelectorAll(vt)].map(c=>{const p=c.getBoundingClientRect();return{id:qa(c)??"",left:p.left,width:p.width}}),u=(c,p)=>{const f=c.strip.parentElement;if(f&&f.scrollWidth>f.clientWidth){const w=f.getBoundingClientRect();p<w.left+Ca*2?f.scrollLeft-=Ca:p>w.right-Ca*2&&(f.scrollLeft+=Ca)}const g=Zy(l(),p),m=g?Ml(t.order(),c.id,g):null;c.mark=m?g:null,r(),c.mark&&e.querySelector(`${vt}[data-nc-id="strip-${CSS.escape(c.mark.target)}"]`)?.setAttribute("data-drop",c.mark.side)},d=()=>{const c=p=>{p.stopPropagation(),p.preventDefault()};e.addEventListener("click",c,{capture:!0,once:!0}),window.setTimeout(()=>e.removeEventListener("click",c,{capture:!0}),0)};e.addEventListener("pointerdown",c=>{if(a||c.pointerType==="mouse"&&c.button!==0)return;const p=c.target instanceof Element?c.target:null;if(!p||p.closest("input, .nc-strip-remove, [data-nc-strip-hide], [data-renaming]"))return;const f=p.closest(Av),g=f?.closest(vt),m=qa(g??null);if(!f||!g||!m)return;const w={id:m,strip:g,pointerId:c.pointerId,x0:c.clientX,y0:c.clientY,grip:f.matches("[data-nc-strip-grip]"),touch:c.pointerType!=="mouse",active:!1,timer:0,mark:null};a=w,w.touch&&!w.grip&&(w.timer=window.setTimeout(()=>{a===w&&!w.active&&s(w)},Tv)),w.grip&&!w.touch&&c.preventDefault()}),window.addEventListener("pointermove",c=>{const p=a;if(!(!p||c.pointerId!==p.pointerId)){if(!p.active){if(Math.hypot(c.clientX-p.x0,c.clientY-p.y0)<Mv)return;if(p.touch&&!p.grip)return i();s(p)}c.preventDefault(),u(p,c.clientX)}}),e.addEventListener("touchmove",c=>{a?.active&&c.preventDefault()},{passive:!1}),e.addEventListener("contextmenu",c=>{a?.touch&&c.preventDefault()}),window.addEventListener("pointerup",c=>{const p=a;if(!p||c.pointerId!==p.pointerId)return;const f=p.active?p.mark:null,g=p.active;if(i(),!g)return;d();const m=f?Ml(t.order(),p.id,f):null;m&&t.onReorder?.(m.id,m.before)}),window.addEventListener("pointercancel",c=>{a&&c.pointerId===a.pointerId&&i()}),window.addEventListener("keydown",c=>{c.key==="Escape"&&a?.active&&i()}),e.addEventListener("keydown",c=>{if(!c.altKey||c.ctrlKey||c.metaKey||c.shiftKey||c.key!=="ArrowLeft"&&c.key!=="ArrowRight")return;const p=c.target instanceof Element?c.target:null,f=p?.closest(".nc-strip-hd, [data-nc-strip-hide], .nc-strip-fold");if(!p||!f||p.closest("input, [data-nc-strip-grip]"))return;const g=qa(f.closest(vt));if(!g)return;c.preventDefault();const m=f.matches("[data-nc-strip-hide]")?"[data-nc-strip-hide]":f.matches(".nc-strip-fold")?".nc-strip-fold":".nc-strip-hd :is(button, [tabindex])";n(g,c.key==="ArrowLeft"?-1:1,m)})}const Nv=1e-5,Fv=2e3,Iv=500,Kn={parked:!1,quietSince:null};function Pv(e,t,n,a){if(t)return Kn;if(e.parked)return e;if(!(n<Nv))return Kn;const r=e.quietSince??a;return{parked:a-r>=Fv,quietSince:r}}const Ol=e=>10**(e/20),Ze=.012,ri=1024,Bl=32768;class Rv{ctx;bus;masterFx;master;limiter;masterMeter;masterMeters;insertMeters;returns;park={a:Kn,b:Kn};parkMeters;parkScratch=new Float32Array(Bl);masterPosition=Ke;channels=[];listeners=new Set;scratch=new Float32Array(ri);restore;channelFx;applyQueued=!1;constructor(t,n={}){this.ctx=t,this.restore=n.restore,this.channelFx=n.channelFx;const a=()=>new AnalyserNode(t,{fftSize:ri});this.bus=new GainNode(t,{gain:1}),this.master=new GainNode(t,{gain:bt(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(t,fu),this.masterMeter=a(),this.masterMeters=[a(),a()],this.insertMeters={pre:a(),post:a()},this.masterFx=n.masterFx?.()??null,this.bus.connect(this.insertMeters.pre),this.masterFx?(this.bus.connect(this.masterFx.input),this.masterFx.output.connect(this.master),this.masterFx.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(t.destination);const r=new ChannelSplitterNode(t,{numberOfOutputs:2});this.limiter.connect(r),r.connect(this.masterMeters[0],0),r.connect(this.masterMeters[1],1);const i=l=>{const u=new GainNode(t,{gain:1}),d=n.fx?.(l)??null,c=new GainNode(t,{gain:bt(Ke)}),p=a();return d?(u.connect(d.input),d.output.connect(c)):c.gain.value=0,c.connect(p),c.connect(this.bus),{bus:u,fx:d,gain:c,meter:p,on:d!==null,level:Ke}};this.returns={a:i("a"),b:i("b")};const s=l=>{const u=new AnalyserNode(t,{fftSize:Bl});return this.returns[l].gain.connect(u),u};this.parkMeters={a:s("a"),b:s("b")}}attach(t,n){let a=this.channels.find(r=>r.id===t);if(a)a.input.disconnect(),a.input=new GainNode(this.ctx,{gain:1}),a.input.connect(a.trim);else{const r=new GainNode(this.ctx,{gain:1}),i=this.restore?.(t)??yu,s=new GainNode(this.ctx,{gain:Ol(i.trim)});r.connect(s);const l=new GainNode(this.ctx,{gain:0}),u=new AnalyserNode(this.ctx,{fftSize:ri}),d=new GainNode(this.ctx,{gain:0}),c=new GainNode(this.ctx,{gain:0}),p=this.channelFx?.(t)??null;p?(s.connect(p.input),p.output.connect(l)):s.connect(l);const f=new GainNode(this.ctx,{gain:1,channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),g=new ChannelSplitterNode(this.ctx,{numberOfOutputs:2}),m=new GainNode(this.ctx,{gain:1}),w=new GainNode(this.ctx,{gain:1}),h=new ChannelMergerNode(this.ctx,{numberOfInputs:2});l.connect(u),l.connect(f).connect(g),g.connect(m,0).connect(h,0,0),g.connect(w,1).connect(h,0,1),h.connect(this.bus),h.connect(d).connect(this.returns.a.bus),h.connect(c).connect(this.returns.b.bus),a={id:t,name:n,input:r,trim:s,fader:l,stereo:f,split:g,balL:m,balR:w,panner:h,meter:u,sendA:d,sendB:c,fx:p,strip:i},this.channels.push(a),this.queueApply()}return this.emit(),a.input}rename(t,n){const a=this.channels.find(r=>r.id===t);!a||a.name===n||(a.name=n,this.emit())}detach(t){const n=this.channels.findIndex(r=>r.id===t);if(n<0)return;const[a]=this.channels.splice(n,1);if(a){for(const r of[a.input,a.trim,a.fader,a.stereo,a.split,a.balL,a.balR,a.panner,a.meter,a.sendA,a.sendB])r.disconnect();a.fx?.output.disconnect(),a.fx?.dispose(),this.queueApply(),this.emit()}}tapNode(t){return t==="master"?this.limiter:this.channels.find(n=>n.id===t)?.panner??null}tapLatency(t,n){const a=i=>{const s=i?.latencySamples;return typeof s=="number"&&Number.isFinite(s)&&s>0?Math.round(s):0};if(t==="master")return Math.max(0,Math.round(n))+a(this.masterFx);const r=this.channels.find(i=>i.id===t);return r?a(r.fx):null}set(t,n){const a=this.channels.find(r=>r.id===t);a&&(a.strip={...a.strip,...n},this.queueApply(),this.emit())}setMaster(t){this.masterPosition=t,this.master.gain.setTargetAtTime(bt(t),this.ctx.currentTime,Ze),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(t,n){const a=this.returns[t],r=this.ctx.currentTime;n.on!==void 0&&(a.on=n.on&&a.fx!==null,a.bus.gain.setTargetAtTime(a.on?1:0,r,Ze),this.wakeFed()),n.level!==void 0&&(a.level=n.level,a.fx&&a.gain.gain.setTargetAtTime(bt(a.level),r,Ze)),this.emit()}fed(t){const n=this.returns[t];if(!n.on||!n.fx)return!1;const a=t==="a"?"sendA":"sendB";return this.channels.some(r=>bt(r.strip[a])>0)}setParked(t,n){const a=this.returns[t];a.fx&&(n?(a.bus.disconnect(a.fx.input),a.fx.output.disconnect(a.gain),a.fx.clear()):(a.bus.connect(a.fx.input),a.fx.output.connect(a.gain)))}wakeFed(){for(const t of["a","b"])this.park[t].parked&&this.fed(t)&&(this.park[t]=Kn,this.setParked(t,!1))}parkIdleReturns(t=performance.now()){for(const n of["a","b"]){const a=this.park[n],r=Pv(a,this.fed(n),a.parked?0:this.parkPeak(n),t);this.park[n]=r,r.parked!==a.parked&&this.setParked(n,r.parked)}}parkPeak(t){const n=this.parkScratch;this.parkMeters[t].getFloatTimeDomainData(n);let a=0;for(let r=0;r<n.length;r++)a=Math.max(a,Math.abs(n[r]??0));return a}returnParked(t){return this.park[t].parked}setTempo(t,n){for(const a of[this.returns.a.fx,this.returns.b.fx,this.masterFx])a?.setTempo(t,n);for(const a of this.channels)a.fx?.setTempo(t,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(t){return this.levelsOf(this.returns[t].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const t=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||t&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}queueApply(){this.applyQueued||(this.applyQueued=!0,queueMicrotask(()=>{this.applyQueued=!1,this.apply()}))}apply(){const t=$y(this.channels.map(a=>a.strip)),n=this.ctx.currentTime;this.channels.forEach((a,r)=>{a.fader.gain.setTargetAtTime(t[r]??0,n,Ze),a.trim.gain.setTargetAtTime(Ol(a.strip.trim),n,Ze),a.sendA.gain.setTargetAtTime(bt(a.strip.sendA),n,Ze),a.sendB.gain.setTargetAtTime(bt(a.strip.sendB),n,Ze);const[i,s]=Ay(a.strip.pan);a.balL.gain.setTargetAtTime(i,n,Ze),a.balR.gain.setTargetAtTime(s,n,Ze)}),this.wakeFed()}levelsOf(t){return t.getFloatTimeDomainData(this.scratch),Sy(this.scratch)}emit(){for(const t of this.listeners)t()}}const Dv=["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"],Pn=(e,t)=>t.map(([n,a,r,i])=>({id:n,name:a,intervals:r,category:e,symbol:i})),Du=[...Pn("Essential",[["major","Major",[0,4,7],""],["minor","Minor",[0,3,7],"m"],["diminished","Diminished",[0,3,6],"dim"],["augmented","Augmented",[0,4,8],"aug"],["sus2","Sus2",[0,2,7],"sus2"],["sus4","Sus4",[0,5,7],"sus4"],["power","Power Chord",[0,7,12],"5"],["major-6","Major 6",[0,4,7,9],"6"],["minor-6","Minor 6",[0,3,7,9],"m6"]]),...Pn("Seventh",[["major-7","Major 7",[0,4,7,11],"maj7"],["minor-7","Minor 7",[0,3,7,10],"m7"],["dominant-7","Dominant 7",[0,4,7,10],"7"],["minor-major-7","Minor-Major 7",[0,3,7,11],"m(maj7)"],["half-diminished-7","Half-Diminished 7",[0,3,6,10],"m7b5"],["diminished-7","Diminished 7",[0,3,6,9],"dim7"],["augmented-major-7","Augmented Major 7",[0,4,8,11],"aug(maj7)"],["augmented-7","Augmented 7",[0,4,8,10],"aug7"],["7sus4","7sus4",[0,5,7,10],"7sus4"]]),...Pn("Extended",[["add9","Add9",[0,4,7,14],"add9"],["minor-add9","Minor Add9",[0,3,7,14],"m(add9)"],["major-9","Major 9",[0,4,7,11,14],"maj9"],["minor-9","Minor 9",[0,3,7,10,14],"m9"],["dominant-9","Dominant 9",[0,4,7,10,14],"9"],["6-9","6/9",[0,4,7,9,14],"6/9"],["minor-6-9","Minor 6/9",[0,3,7,9,14],"m6/9"],["major-7-sharp11","Major 7#11",[0,4,7,11,18],"maj7#11"],["minor-11","Minor 11",[0,3,7,10,14,17],"m11"],["dominant-11","Dominant 11",[0,4,7,10,14,17],"11"],["9sus4","9sus4",[0,5,7,10,14],"9sus4"],["major-13","Major 13",[0,4,7,11,14,21],"maj13"],["minor-13","Minor 13",[0,3,7,10,14,17,21],"m13"],["dominant-13","Dominant 13",[0,4,7,10,14,21],"13"]]),...Pn("Altered",[["7b9","7b9",[0,4,7,10,13],"7b9"],["7-sharp9","7#9",[0,4,7,10,15],"7#9"],["7b5","7b5",[0,4,6,10],"7b5"],["7-sharp5","7#5",[0,4,8,10],"7#5"],["7b9-sharp5","7b9#5",[0,4,8,10,13],"7b9#5"],["7-sharp9-b5","7#9b5",[0,4,6,10,15],"7#9b5"],["7alt","7alt",[0,4,10,13,15,18,20],"7alt"],["major-7b5","Major 7b5",[0,4,6,11],"maj7b5"],["minor-7b9","Minor 7b9",[0,3,7,10,13],"m7b9"]]),...Pn("Experimental",[["quartal-3","Quartal 3",[0,5,10]," Quartal 3"],["quartal-4","Quartal 4",[0,5,10,15]," Quartal 4"],["quartal-5","Quartal 5",[0,5,10,15,20]," Quartal 5"],["quintal-3","Quintal 3",[0,7,14]," Quintal 3"],["quintal-4","Quintal 4",[0,7,14,21]," Quintal 4"],["chromatic-cluster","Chromatic Cluster",[0,1,2]," Chromatic Cluster"],["whole-tone-cluster","Whole-Tone Cluster",[0,2,4,6]," Whole-Tone Cluster"],["minor-second-cluster","Minor-Second Cluster",[0,1,5,7]," Minor-Second Cluster"],["major-second-stack","Major-Second Stack",[0,2,4,7,9]," Major-Second Stack"],["lydian-stack","Lydian Stack",[0,2,4,6,7,11]," Lydian Stack"],["major-pentatonic","Major Pentatonic",[0,2,4,7,9]," Major Pentatonic"],["minor-pentatonic","Minor Pentatonic",[0,3,5,7,10]," Minor Pentatonic"],["in-sen","In-sen",[0,1,5,7,10]," In-sen"],["whole-tone","Whole-Tone Collection",[0,2,4,6,8,10]," Whole-Tone"]])],zu=new Map(Du.map(e=>[e.id,e])),ii={Major:"major",Minor:"minor",Diminished:"diminished",Augmented:"augmented",Sus2:"sus2",Sus4:"sus4","Major 7th":"major-7","Minor 7th":"minor-7","Dominant 7th":"dominant-7"};function zv(e){if(typeof e!="string")return"major";if(zu.has(e))return e;if(ii[e])return ii[e];const t=a=>a.trim().toLowerCase().replace(/[\s_-]+/g,""),n=t(e);return Object.entries(ii).find(([a])=>t(a)===n)?.[1]??Du.find(a=>t(a.name)===n||t(a.id)===n)?.id??"major"}function No(e){return zu.get(zv(e))}const Hi=(e,t,n)=>Math.max(t,Math.min(n,Math.round(Number.isFinite(e)?e:t)));function Ou(e){if(!e.length)return[];const t=Math.min(...e),n=Math.max(...e),a=Math.ceil(-t/12),r=Math.floor((127-n)/12);if(a>r)throw new RangeError("Voicing spans more than the supported MIDI range.");const i=Math.max(a,Math.min(r,0))*12;return e.map(s=>s+i)}function Ov(e,t,n=0,a="compact"){const i=No(t).intervals.map(l=>Hi(e,0,127)+l);for(let l=0;l<Hi(n,0,i.length-1);l++){const u=i.shift(),d=i[i.length-1];i.push(u+Math.ceil((d-u+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[a]??0;return Ou(i.map((l,u)=>l+12*Math.floor(u*s/Math.max(1,i.length-1))))}function Bv(e,t=1){return[...new Set(Array.from({length:Hi(t,1,4)},(n,a)=>e.map(r=>r+a*12)).flat().filter(n=>n>=0&&n<=127))]}function jv(e,t){const n=[...new Set(e)].sort((i,s)=>i-s),a=n.length;if(a<2)return n;const r=[...n,...n.slice(1,-1).reverse()];switch(t){case"down":return n.reverse();case"up-down":return r;case"down-up":return r.map(i=>n[a-1-n.indexOf(i)]);case"up-down-repeat":return[...n,...[...n].reverse()];case"as-played":return[...new Set(e)];case"outside-in":{const i=[];for(let s=0,l=a-1;s<=l;s++,l--)i.push(n[s]),s!==l&&i.push(n[l]);return i}case"inside-out":return n.map((i,s)=>({note:i,i:s})).sort((i,s)=>Math.abs(i.i-(a-1)/2)-Math.abs(s.i-(a-1)/2)||i.i-s.i).map(i=>i.note);case"pendulum":{const i=Math.floor((a-1)/2);return[...r.slice(i),...r.slice(0,i)]}case"blossom-up":case"blossom-down":{const i=Math.floor((a-1)/2),s=t==="blossom-up"?1:-1,l=[n[i]];for(let u=1;l.length<a;u++)for(const d of[i+s*u,i-s*u])d>=0&&d<a&&l.push(n[d]);return l}case"low-and-up":case"low-and-down":case"hi-and-up":case"hi-and-down":{const i=t.startsWith("low"),s=i?n[0]:n[a-1],l=i?n.slice(1):n.slice(0,-1);return t.endsWith("down")&&l.reverse(),l.flatMap(u=>[s,u])}default:return n}}const qv=16,Ui={hits:5,steps:8,rotate:0};function Bu(e){const t=(a,r)=>typeof a=="number"&&Number.isFinite(a)?Math.round(a):r,n=Math.max(1,Math.min(qv,t(e?.arpSteps,Ui.steps)));return{steps:n,hits:Math.max(0,Math.min(n,t(e?.arpHits,Ui.hits))),rotate:(t(e?.arpRotate,0)%n+n)%n}}function ju(e,t){return((Math.floor(t)+e.rotate)%e.steps+e.steps)%e.steps*e.hits%e.steps<e.hits}function _v(e,t){let n=Math.floor(t/e.steps)*e.hits;for(let a=t-t%e.steps;a<t;a++)ju(e,a)&&n++;return n}const Vv=1592598566;function Hv(e){let t=(Math.imul(e^Vv,2654435761)^2246822507)>>>0;return t=Math.imul(t^t>>>16,2146121005),t=Math.imul(t^t>>>15,2221713035),((t^t>>>16)>>>0)/2**32}const jl=new Map;function Uv(e,t){if(e<2)return 0;const n=Math.max(0,Math.floor(t));let a=jl.get(e);(!a||a.step>n)&&(a={step:0,pos:0});let{step:r,pos:i}=a;for(;r<n;r++){const s=Hv(r+1);i=(i+(s<.5?1:s<.75?0:e-1))%e}return jl.set(e,{step:r,pos:i}),i}function Gv(e,t,n,a=Ui,r=Math.random){if(t<1)return null;const i=s=>(Math.floor(s)%t+t)%t;if(e==="random")return Math.min(t-1,Math.max(0,Math.floor(r()*t)));if(e==="walk")return Uv(t,n);if(e==="euclidean"){const s=Bu({arpHits:a.hits,arpSteps:a.steps,arpRotate:a.rotate}),l=Math.max(0,Math.floor(n));return ju(s,l)?i(_v(s,l)):null}return i(n)}const Fo=[{id:"off",num:0,name:"Off — chord",description:"No arp: the chord plays together"},{id:"up",num:1,name:"Up",description:"Low to high, then again"},{id:"down",num:2,name:"Down",description:"High to low, then again"},{id:"up-down",num:3,name:"Up/Down",description:"Up then down, ends not repeated"},{id:"up-down-repeat",num:4,name:"Up/Down Repeat",description:"Up then down, ends repeated"},{id:"random",num:5,name:"Random",description:"Any note each step"},{id:"as-played",num:6,name:"As Played",description:"The order the keys were pressed"},{id:"outside-in",num:7,name:"Outside-In",description:"Lowest, highest, then inward"},{id:"inside-out",num:8,name:"Inside-Out",description:"From the middle outward, lower first"},{id:"pendulum",num:9,name:"Pendulum",description:"From the lower middle, swing between the ends"},{id:"blossom-up",num:10,name:"Blossom Up",description:"From center, spiral up"},{id:"blossom-down",num:11,name:"Blossom Down",description:"From center, spiral down"},{id:"low-and-up",num:12,name:"Low&Up",description:"Low pedal, others ascending"},{id:"low-and-down",num:13,name:"Low&Down",description:"Low pedal, others descending"},{id:"hi-and-up",num:14,name:"Hi&Up",description:"High pedal, others ascending"},{id:"hi-and-down",num:15,name:"Hi&Down",description:"High pedal, others descending"},{id:"walk",num:16,name:"Walk",description:"Next 50%, repeat 25%, back 25%"},{id:"euclidean",num:17,name:"Euclidean",description:"Hits spread evenly over Steps, rests between"},{id:"down-up",num:18,name:"Down/Up (legacy)",description:"Down then up, ends not repeated",legacy:!0}];new Set(Fo.map(e=>e.id));new Map(Fo.map(e=>[e.num,e.id]));Fo.map(e=>({value:e.id,label:e.name}));const qu=[{id:"block",label:"Block",kind:"repeat"},{id:"walk-up",label:"Inversion walk · up",kind:"repeat"},{id:"walk-down",label:"Inversion walk · down",kind:"repeat"},{id:"walk-up-down",label:"Inversion walk · up-down",kind:"repeat"},{id:"walk-random",label:"Inversion walk · random",kind:"repeat"},{id:"oom-pah",label:"Oom-pah",kind:"bar"},{id:"alberti",label:"Alberti",kind:"repeat"},{id:"pulse",label:"Pulse + accents",kind:"repeat"},{id:"charleston",label:"Charleston",kind:"bar"},{id:"skank",label:"Skank",kind:"bar"},{id:"house",label:"House stab",kind:"bar"},{id:"montuno",label:"Montuno",kind:"bar"},{id:"push",label:"Push",kind:"bar"},{id:"strum",label:"Strum",kind:"bar"},{id:"drift",label:"Voicing drift",kind:"repeat"}];qu.map(e=>e.id);const ql=e=>qu.find(t=>t.id===e)?.kind??"repeat",Wv=15,Kv=40,Ce=e=>[...e].sort((t,n)=>t-n);function _u(e,t){const n=Ce(e);for(let a=0;a<t;a++){const r=n.shift(),i=n[n.length-1]??r;n.push(r+Math.ceil((i-r+1)/12)*12)}return n}const Na=e=>_u(e,1);function Yv(e,t){const n=e[0];return n-((n-t)%12+12)%12}function Xv(e,t){const n=Ce(e);if(n.length<3)return n;switch((t%4+4)%4){case 1:return Ce([n[0],...n.slice(2),n[1]+12]);case 2:return Ce([n[0],...n.slice(3),n[1]+12,n[2]+12]);case 3:return Ce([n[0]-12,n[2],n[1]+12,...n.slice(3).map(r=>r+12)]);default:return n}}function Jv(e,t,n,a=Math.random){const r=Math.max(1,Math.min(t,3)),i=Math.max(0,Math.floor(n));switch(e){case"walk-down":return(r-i%r)%r;case"walk-up-down":{if(r<2)return 0;const s=2*r-2,l=i%s;return l<r?l:s-l}case"walk-random":return Math.min(r-1,Math.floor(a()*r));default:return i%r}}function Qv(e,t,n,a,r=Math.random){const i=Ce(t);if(!i.length)return{notes:[],velocity:1};switch(e){case"block":return{notes:i,velocity:1};case"walk-up":case"walk-down":case"walk-up-down":case"walk-random":return{notes:_u(i,Jv(e,i.length,n,r)),velocity:.9};case"alberti":return{notes:[[i[0],i[2]??i[i.length-1],i[1]??i[0],i[2]??i[i.length-1]][(Math.floor(n)%4+4)%4]],velocity:.85};case"pulse":{const s=Math.abs(a/2-Math.round(a/2))<1e-6;return{notes:i,velocity:s?1:.45}}case"drift":return{notes:Xv(i,n),velocity:.9};default:return null}}function Zv(e,t,n,a,r=t){const i=Ce(t);if(!i.length)return[];const s=(u,d,c,p)=>u.map(f=>({step:f,len:d,notes:c,velocity:p})),l=Yv(i,n);switch(e){case"oom-pah":return[...s([0],3,[l-12],1),...s([4],2,Na(i),.75),...s([8],3,[l-12],1),...s([12],2,Na(i),.75)];case"charleston":return s([0,6],2,i,.9);case"skank":return s([4,12],1,Na(i),.9);case"house":return s([2,6,10,14],1,Na(i),.9);case"montuno":{const u=l+(a[1]??4),d=l+(a[2]??7),c=a[3]!==void 0&&a[3]<12?l+a[3]:l+12,p=[l,l+12],f=[u,d];return[[0,p],[3,f],[5,p],[6,f],[8,[d,c]],[10,p],[13,f],[14,[d,l+12]]].map(([g,m])=>({step:g,len:1,notes:Ce(m),velocity:.85}))}case"push":return[...s([0],6,i,.9),...s([6],2,i,.9),{step:14,len:2,notes:Ce(r),velocity:.9,next:!0}];case"strum":{const u=[...i,i[0]+12];return[{step:0,len:3.5,notes:u,velocity:.95,strum:"down"},{step:8,len:3.5,notes:u,velocity:.75,strum:"up"}]}default:return[]}}function ew(e,t,n){const a=n==="down"?Ce(e):Ce(e).reverse(),r=Math.max(0,Math.min(Kv,t))/1e3;return a.map((i,s)=>({midi:i,offset:s*r}))}const _l=e=>Math.abs(e-Math.round(e))<1e-6?"down":"up";function tw(e){const t=new Set(e.map(i=>(i%12+12)%12)),n=i=>t.has(i);let a;const r=n(3)&&!n(4);return r&&n(6)&&n(9)?a=[14]:r&&n(6)?a=[17]:n(4)&&n(8)&&!n(7)?a=[14]:n(4)&&n(10)?a=[14,21]:n(4)?a=[14,18,21]:n(3)?a=[14,17]:n(5)||n(2)?a=[14,21]:a=[14],a.filter(i=>!n(i%12))}function nw(e,t,n,a=Math.random){const r=tw(n);if(!r.length||!e.length)return null;const i=(t+r[Math.min(r.length-1,Math.floor(a()*r.length))])%12,s=Math.max(...e),l=s+1+((i-(s+1))%12+12)%12;return l<=127?l:null}function Gi(e,t,n=0,a="compact"){const r=t.map(l=>Math.max(0,Math.min(127,Math.round(e)))+l),i=Math.max(0,Math.min(r.length-1,Math.round(n)||0));for(let l=0;l<i;l++){const u=r.shift(),d=r[r.length-1];r.push(u+Math.ceil((d-u+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[a]??0;return Ou(r.map((l,u)=>l+12*Math.floor(u*s/Math.max(1,r.length-1))))}function aw(e,t){const n=Ce(e),a=Ce(t);if(n.length===a.length)return n.reduce((i,s,l)=>i+Math.abs(s-a[l]),0);const r=(i,s)=>Math.min(...s.map(l=>Math.abs(l-i)));return n.reduce((i,s)=>i+r(s,a),0)+a.reduce((i,s)=>i+r(s,n),0)}function rw(e,t,n,a,r,i="compact",s){const l=Gi(t,n,s??r,i);if(!e||!e.length)return l;let u=l,d=1/0,c=1/0;const p=s!==void 0?[s]:n.map((f,g)=>g);for(const f of p)for(const g of[-24,-12,0,12]){const m=Gi(t,n,f,i).map(y=>y+g);if(m[0]<a-7||m[0]>a+12||m[0]<0||m[m.length-1]>127)continue;const w=aw(m,e),h=Math.abs(m.reduce((y,k)=>y+k,0)/m.length-e.reduce((y,k)=>y+k,0)/e.length);(w<d-1e-9||Math.abs(w-d)<1e-9&&h<c-1e-9)&&(u=m,d=w,c=h)}return u}const iw={"Pop / Rock":"Pop",Blues:"Blues",Jazz:"Jazz","Soul / R&B / Neo-soul":"Soul",Gospel:"Gospel","EDM / House / Trance":"EDM","Cinematic / Ambient":"Cinematic","Latin / Flamenco":"Latin","Lo-fi / Chill":"Lo-fi",Modal:"Modal"},A=(e,t,n,a=1,r={})=>({degree:e,chord:t,numeral:n,bars:a,...r}),q="major",ke="minor",_="dominant-7",Z="minor-7",Me="major-7",oi="half-diminished-7",si="diminished-7",W=(e,t,n,a,r,i)=>({id:e,group:t,name:n,level:a,tonality:r,chords:i,short:iw[t]}),Vl=e=>[A(0,_,"I7"),A(e==="IV7"?5:0,_,e),A(0,_,"I7"),A(0,_,"I7"),A(5,_,"IV7"),A(5,_,"IV7"),A(0,_,"I7"),A(0,_,"I7"),A(7,_,"V7"),A(5,_,"IV7"),A(0,_,"I7"),A(7,_,"V7")],Vu=[W("pop-1-5-6-4","Pop / Rock","I–V–vi–IV",1,"major",[A(0,q,"I"),A(7,q,"V"),A(9,ke,"vi"),A(5,q,"IV")]),W("pop-6-4-1-5","Pop / Rock","vi–IV–I–V",1,"major",[A(9,ke,"vi"),A(5,q,"IV"),A(0,q,"I"),A(7,q,"V")]),W("pop-50s","Pop / Rock","I–vi–IV–V · 50s",1,"major",[A(0,q,"I"),A(9,ke,"vi"),A(5,q,"IV"),A(7,q,"V")]),W("rock-1-b7-4","Pop / Rock","I–♭VII–IV",2,"mixolydian",[A(0,q,"I"),A(10,q,"♭VII"),A(5,q,"IV",2)]),W("pop-canon","Pop / Rock","Canon · 8 chords",2,"major",[A(0,q,"I",.5),A(7,q,"V",.5),A(9,ke,"vi",.5),A(4,ke,"iii",.5),A(5,q,"IV",.5),A(0,q,"I",.5),A(5,q,"IV",.5),A(7,q,"V",.5)]),W("blues-12","Blues","12-bar",1,"blues",Vl("I7")),W("blues-12-quick","Blues","12-bar quick change",2,"blues",Vl("IV7")),W("blues-minor","Blues","Minor blues",2,"minor",[A(0,Z,"i7"),A(0,Z,"i7"),A(0,Z,"i7"),A(0,Z,"i7"),A(5,Z,"iv7"),A(5,Z,"iv7"),A(0,Z,"i7"),A(0,Z,"i7"),A(8,_,"♭VI7"),A(7,_,"V7"),A(0,Z,"i7"),A(7,_,"V7")]),W("blues-jazz","Blues","Jazz blues",3,"blues",[A(0,_,"I7"),A(5,_,"IV7"),A(0,_,"I7"),A(7,Z,"v7",.5),A(0,_,"I7",.5),A(5,_,"IV7"),A(6,si,"♯iv°7"),A(0,_,"I7"),A(9,_,"VI7"),A(2,Z,"ii7"),A(7,_,"V7"),A(0,_,"I7",.5),A(9,_,"VI7",.5),A(2,Z,"ii7",.5),A(7,_,"V7",.5)]),W("jazz-2-5-1","Jazz","ii–V–I",1,"major",[A(2,Z,"ii7"),A(7,_,"V7"),A(0,Me,"Imaj7",2)]),W("jazz-2-5-1-minor","Jazz","ii–V–i minor",2,"minor",[A(2,oi,"iiø7"),A(7,"7b9","V7♭9"),A(0,"minor-6","i6",2)]),W("jazz-rhythm","Jazz","I–vi–ii–V · rhythm changes",2,"major",[A(0,Me,"Imaj7",.5),A(9,Z,"vi7",.5),A(2,Z,"ii7",.5),A(7,_,"V7",.5)]),W("jazz-turnaround","Jazz","iii–VI–ii–V turnaround",2,"major",[A(4,Z,"iii7",.5),A(9,_,"VI7",.5),A(2,Z,"ii7",.5),A(7,_,"V7",.5)]),W("jazz-autumn","Jazz","Autumn cycle",3,"minor",[A(5,Z,"iv7"),A(10,_,"♭VII7"),A(3,Me,"♭IIImaj7"),A(8,Me,"♭VImaj7"),A(2,oi,"iiø7"),A(7,"7b9","V7♭9"),A(0,Z,"i7",2)]),W("jazz-giant-steps","Jazz","Giant Steps cycle",3,"major",[A(0,Me,"Imaj7",.5),A(3,_,"♭III7",.5),A(8,Me,"♭VImaj7",.5),A(11,_,"VII7",.5),A(4,Me,"IIImaj7"),A(10,Z,"♭vii7",.5),A(3,_,"♭III7",.5),A(8,Me,"♭VImaj7",.5),A(11,_,"VII7",.5),A(4,Me,"IIImaj7",.5),A(7,_,"V7",.5),A(0,Me,"Imaj7"),A(6,Z,"♯iv7",.5),A(11,_,"VII7",.5)]),W("soul-dorian-vamp","Soul / R&B / Neo-soul","Dorian vamp i7–IV7",1,"dorian",[A(0,Z,"i7"),A(5,_,"IV7")]),W("soul-4-3-2-1","Soul / R&B / Neo-soul","IVmaj7–iii7–ii7–Imaj7",2,"major",[A(5,Me,"IVmaj7"),A(4,Z,"iii7"),A(2,Z,"ii7"),A(0,Me,"Imaj7")]),W("soul-two-of-us","Soul / R&B / Neo-soul","Just the Two of Us",3,"major",[A(5,Me,"IVmaj7"),A(4,_,"III7"),A(9,Z,"vi7"),A(7,Z,"v7",.5),A(0,_,"I7",.5)]),W("soul-2-5-1-ext","Soul / R&B / Neo-soul","ii9–V13sus–Imaj9",3,"major",[A(2,"minor-9","ii9"),A(7,"9sus4","V13sus",1,{intervals:[0,5,7,10,14,21],symbol:"13sus4"}),A(0,"major-9","Imaj9",2)]),W("gospel-1-4-1-dim","Gospel","1–4–1 passing dim",2,"major",[A(0,q,"I"),A(5,q,"IV",.5),A(6,si,"♯iv°7",.5)]),W("gospel-7-3-6","Gospel","7–3–6",3,"major",[A(11,oi,"viiø7"),A(4,_,"III7"),A(9,Z,"vi7",2)]),W("gospel-1-17-4-dim","Gospel","I–I7–IV–♯iv°–I/V",3,"major",[A(0,q,"I",.5),A(0,_,"I7",.5),A(5,q,"IV",.5),A(6,si,"♯iv°7",.5),A(0,q,"I/V",2,{inversion:2})]),W("edm-epic","EDM / House / Trance","i–VI–III–VII · epic",1,"minor",[A(0,ke,"i"),A(8,q,"VI"),A(3,q,"III"),A(10,q,"VII")]),W("edm-1-7-6-7","EDM / House / Trance","i–VII–VI–VII",1,"minor",[A(0,ke,"i"),A(10,q,"VII"),A(8,q,"VI"),A(10,q,"VII")]),W("house-organ","EDM / House / Trance","House organ i7–iv7",1,"minor",[A(0,Z,"i7"),A(5,Z,"iv7")]),W("trance-1-6-7-5","EDM / House / Trance","Trance i–VI–VII–v",2,"minor",[A(0,ke,"i"),A(8,q,"VI"),A(10,q,"VII"),A(7,ke,"v")]),W("cine-minor-plagal","Cinematic / Ambient","Minor plagal iv–i",1,"minor",[A(5,ke,"iv"),A(0,ke,"i")]),W("cine-hero","Cinematic / Ambient","Hero I–♭VI–♭VII–I",2,"major",[A(0,q,"I"),A(8,q,"♭VI"),A(10,q,"♭VII"),A(0,q,"I")]),W("cine-mediant","Cinematic / Ambient","Mediant I–III",2,"major",[A(0,q,"I"),A(4,q,"III")]),W("cine-lydian","Cinematic / Ambient","Lydian I–II",2,"lydian",[A(0,q,"I"),A(2,q,"II")]),W("latin-andalusian","Latin / Flamenco","Andalusian i–♭VII–♭VI–V",1,"minor",[A(0,ke,"i"),A(10,q,"♭VII"),A(8,q,"♭VI"),A(7,q,"V")]),W("latin-montuno","Latin / Flamenco","Montuno i–iv–V7",1,"minor",[A(0,ke,"i"),A(5,ke,"iv"),A(7,_,"V7",2)]),W("latin-bossa","Latin / Flamenco","Bossa Imaj7–II7–ii7–V7",2,"major",[A(0,Me,"Imaj7",2),A(2,_,"II7",2),A(2,Z,"ii7"),A(7,_,"V7")]),W("lofi-2-5-1-6","Lo-fi / Chill","ii9–V9–Imaj9–vi9",2,"major",[A(2,"minor-9","ii9"),A(7,"dominant-9","V9"),A(0,"major-9","Imaj9"),A(9,"minor-9","vi9")]),W("lofi-4-3-6","Lo-fi / Chill","IVmaj7–iii7–vi7",2,"major",[A(5,Me,"IVmaj7"),A(4,Z,"iii7"),A(9,Z,"vi7",2)]),W("modal-dorian","Modal","Dorian i–IV",1,"dorian",[A(0,ke,"i"),A(5,q,"IV")]),W("modal-mixolydian","Modal","Mixolydian I–♭VII",1,"mixolydian",[A(0,q,"I"),A(10,q,"♭VII")]),W("modal-phrygian","Modal","Phrygian i–♭II",1,"phrygian",[A(0,ke,"i"),A(1,q,"♭II")])];Vu.map(e=>e.id);const ow=e=>Vu.find(t=>t.id===e)??null;function li(e,t,n,a=0){const r=ow(e);if(!r)return null;const i=(n+1)*12+t;return r.chords.map((s,l)=>{const u=No(s.chord),d=s.intervals??u.intervals,c=(t+s.degree)%12;return{index:l,root:i+s.degree,rootPc:c,chord:u.id,intervals:d,numeral:s.numeral,name:`${Dv[c]}${s.symbol??u.symbol}`,bars:a>0?a:s.bars,...s.inversion!==void 0?{inversion:s.inversion}:{}}})}const sw=e=>e.reduce((t,n)=>t+n.bars,0),lw=(e,t)=>e.slice(0,t).reduce((n,a)=>n+a.bars,0);function Hl(e,t){const n=sw(e),a=(t%n+n)%n;let r=0;for(let i=0;i<e.length;i++){if(a<r+e[i].bars-1e-9)return{chord:e[i],index:i,position:a,total:n};r+=e[i].bars}return{chord:e[e.length-1],index:e.length-1,position:a,total:n}}const cw=16,dw=()=>Array.from({length:cw},()=>null),uw=["off","single","chord","random"],pw=e=>uw.includes(e),hw={mode:"single",note:0,octave:3,octaveRange:2,chord:"minor-7",inversion:0,interval:4,gate:75,arp:"off",arpOctaves:1,arpSpread:"compact",arpHits:5,arpSteps:8,arpRotate:0,chordStyle:"block",voiceLeading:"fixed",strum:0,tension:0,chordProgression:"off",progressionBars:0,favoriteChords:[],chordPads:dw(),chordPadMode:"pad"};function Ul(e,t,n=Math.random){if(e.mode==="off")return[];const a=Math.min(127,Math.max(0,(e.octave+1)*12+e.note));if(e.mode==="single")return[a];if(e.mode==="random"){const u=Math.min(127,(e.octave+1)*12),d=Math.min(127,u+e.octaveRange*12-1);return[u+Math.floor(n()*(d-u+1))]}const r=Ov(a,e.chord,e.inversion,e.arpSpread);if(e.arp==="off")return r;const i=Bv(r,e.arpOctaves),s=jv(i,e.arp),l=Gv(e.arp,s.length,t,Bu(e),n);return l===null?[]:[s[l]]}function Gl(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function fw(e,t,{octave:n}={}){if(t==="chord")return e.map(i=>({...i,role:"chord"}));const a=new Map;for(const i of e)a.set(i.hit,[...a.get(i.hit)??[],i]);const r=[];for(const i of a.values()){const s=i[0],l=Math.max(...i.map(u=>u.velocity));if(t==="top"){const u=i.reduce((d,c)=>c.note>d.note?c:d);r.push({...u,role:"top",offsetSec:0,velocity:l})}else{const u=n===void 0?s.root:Math.min(127,Math.max(0,(n+1)*12+(s.root%12+12)%12));r.push({...s,note:u,role:"root",offsetSec:0,velocity:l})}}return r}function mw(e,t){return t.direction&&t.strumMs>0&&e.length>1?ew(e,t.strumMs,t.direction):e.map(n=>({midi:n,offset:0}))}function gw(e,t=0){return mw(e.notes,e).map(({midi:n,offset:a})=>({note:n,velocity:e.velocity,startBeat:e.beat,lengthBeats:e.spanBeats*e.gate,role:e.role,offsetSec:a,spanBeats:e.spanBeats,gate:e.gate,hit:t,root:e.root}))}const Wl=(e,t,n)=>Math.min(n,Math.max(t,e)),bw=1e-9;function yw(e,t){return t>0?Math.ceil(e/t-bw)*t:e}const Kl=(e,t)=>({from:e,origin:t,jump:null,last:null,lastKey:"",pushedTo:-1,bar:{bar:NaN,settings:null,hits:[]}});class Io{step=0;grid={origin:0,index:0,interval:16};comp=Kl(0,0);read;random;chordRandom;bpb;serial=0;constructor(t,n={}){this.read=typeof t=="function"?t:()=>t,this.random=n.random??Math.random,this.chordRandom=n.chordRandom??Math.random,this.bpb=n.beatsPerBar??(()=>4)}get settings(){return this.read()}beatsPerBar(){return Math.max(1,this.bpb())}beatInBar(t){const n=this.beatsPerBar();return(t%n+n)%n}start(t,{join:n=!1}={}){const a=this.settings.interval,r=4/a,i=n?yw(t,r):t;this.grid={origin:i,index:0,interval:a},this.step=Math.max(0,Math.round(i/r));const s=this.beatsPerBar();return this.comp=Kl(i,n?0:Math.floor(t/s+1e-9)*s),i}clone(t={}){const n=new Io(t.settings??this.read,{random:t.random??this.random,chordRandom:t.chordRandom??this.chordRandom,beatsPerBar:t.beatsPerBar??this.bpb});n.step=this.step,n.grid={...this.grid},n.serial=this.serial;const a=this.comp;return n.comp={...a,jump:a.jump?{...a.jump}:null,last:a.last?[...a.last]:null,bar:{...a.bar}},n}resetGrid(){this.grid={origin:0,index:0,interval:this.settings.interval}}nextBeat(){return this.grid.origin+this.grid.index*4/this.grid.interval}stepBeats(){return 4/this.grid.interval}followInterval(){const t=this.settings.interval;t!==this.grid.interval&&(this.grid={origin:this.nextBeat(),index:0,interval:t})}skipTo(t){const n=Math.max(0,Math.ceil((t-this.nextBeat())/this.stepBeats()-1e-9));return this.grid.index+=n,this.step+=n,n}advance(){this.grid.index++}advanceStep(){this.step++}applyJump(t){const n=this.comp.jump;n&&t>=n.at-1e-9&&(this.comp.origin=n.origin,this.comp.jump=null)}plainChord(){const t=this.settings;return t.chordStyle==="block"&&t.chordProgression==="off"&&!(t.strum>0)&&!(t.tension>0)}barStyleActive(){const t=this.settings;return t.mode==="chord"&&t.arp==="off"&&!this.plainChord()&&ql(t.chordStyle)==="bar"}stepHit(t){const n=this.settings,a=this.stepBeats();if(n.mode==="chord"&&!this.plainChord()){if(n.arp!=="off"){const c=this.chordAt(t),p={...n,chord:c.chord,note:c.rootPc,octave:Math.floor(c.root/12)-1,...c.inversion!==void 0?{inversion:c.inversion}:{}},f=Ul(p,this.step,this.random);return this.step++,f.length?this.hit(t,a,f,1,null,c,!1,"arp"):null}if(ql(n.chordStyle)==="bar")return this.step++,null;const l=this.chordAt(t),u=this.voicingFor(l),d=Qv(n.chordStyle,u,this.step,this.beatInBar(t),this.chordRandom);return this.step++,!d||!d.notes.length?null:this.hit(t,a,d.notes,d.velocity,_l(this.beatInBar(t)),l,!0,"chord")}if(!pw(n.mode))return this.step++,null;const r=Ul(n,this.step,this.random);if(this.step++,!r.length)return null;const i=n.mode==="chord",s=i?Math.min(127,Math.max(0,(n.octave+1)*12+n.note)):r[0];return{beat:t,spanBeats:a,gate:Wl(n.gate/100,.1,1),velocity:1,notes:r,kind:"plain",direction:null,strumMs:0,chord:i?this.plainChordAt():null,root:s,role:i?n.arp==="off"?"chord":"arp":"note"}}hit(t,n,a,r,i,s,l,u){const d=this.settings,c=[...a];if(l&&d.tension>0&&this.chordRandom()*100<d.tension){const f=nw(c,s.rootPc,s.intervals,this.chordRandom);f!==null&&c.push(f)}const p=d.chordStyle==="strum"&&i?d.strum>0?d.strum:Wv:d.strum;return{beat:t,spanBeats:n,gate:Wl(d.gate/100,.1,1),velocity:r,notes:c,kind:"comp",direction:i,strumMs:p,chord:s,root:s.root,role:u}}progressionOrigin(t){const n=this.comp.jump;return n&&t>=n.at-1e-9?n.origin:this.comp.origin}plainChordAt(){const t=this.settings,n=No(t.chord);return{index:0,root:(t.octave+1)*12+t.note,rootPc:t.note,chord:n.id,intervals:n.intervals,name:"",numeral:"",bars:1}}chordAt(t){const n=this.settings,a=li(n.chordProgression,n.note,n.octave,n.progressionBars);return a?.length?Hl(a,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar()).chord:this.plainChordAt()}voicingFor(t){const n=this.settings,a=t.inversion??Math.min(Math.max(0,n.inversion|0),t.intervals.length-1),r=`${t.root}|${t.intervals.join(",")}|${a}|${n.voiceLeading}|${n.arpSpread}`;if(this.comp.last&&r===this.comp.lastKey)return this.comp.last;const i=n.voiceLeading==="smooth"?rw(this.comp.last,t.root,t.intervals,(n.octave+1)*12+n.note,a,n.arpSpread,t.inversion):Gi(t.root,t.intervals,a,n.arpSpread);return this.comp.last=i,this.comp.lastKey=r,i}compBar(t){const n=this.comp.bar,a=this.settings;if(n.bar===t&&n.settings===a)return n.hits;const r=a,i=this.beatsPerBar(),s=r.chordStyle,l=this.chordAt(t*i),u=this.voicingFor(l);let d=u;if(s==="push"){const p=this.chordAt((t+1)*i);if(`${p.root}|${p.intervals.join(",")}`!=`${l.root}|${l.intervals.join(",")}`){const f={last:this.comp.last,key:this.comp.lastKey};d=this.voicingFor(p),this.comp.last=f.last,this.comp.lastKey=f.key}}let c=Zv(s,u,l.rootPc,l.intervals,d).filter(p=>p.step/4<i-1e-9);return s==="push"&&this.comp.pushedTo===t&&(c=c.filter(p=>p.step!==0)),this.comp.bar={bar:t,settings:a,hits:c},c}barFrom(){return this.comp.from}catchUpBars(t){this.comp.from=t}syncBars(){this.comp.from=this.nextBeat()}barHits(t,n=()=>!1){const a=this.settings,r=this.beatsPerBar(),i=[];for(let s=0;s<128;s++){const l=Math.floor(this.comp.from/r+1e-9),d=this.compBar(l).find(g=>l*r+g.step/4>=this.comp.from-1e-9);if(!d){this.comp.from=(l+1)*r;continue}const c=l*r+d.step/4;if(!t(c))break;if(this.comp.from=c+1e-6,n())continue;const p=d.next&&a.chordStyle==="push"?d.len+6:d.len;d.next&&(this.comp.pushedTo=l+1);const f=this.chordAt(d.next?(l+1)*r:c);i.push(this.hit(c,p/4,d.notes,d.velocity,d.strum??_l(this.beatInBar(c)),f,!0,"chord"))}return i}chordPosition(t){const n=this.settings;if(n.mode!=="chord")return null;const a=li(n.chordProgression,n.note,n.octave,n.progressionBars);if(!a?.length)return null;const r=Hl(a,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar());return{index:r.index,bar:Math.floor(r.position+1e-9)+1,bars:r.total}}jumpToChord(t,n){const a=this.settings,r=li(a.chordProgression,a.note,a.octave,a.progressionBars);if(!r?.length||t<0||t>=r.length)return!1;const i=this.beatsPerBar(),s=Math.max(n,this.nextBeat(),this.comp.from),l=Math.ceil(s/i-1e-9)*i;return this.comp.jump={at:l,origin:l-lw(r,t)*i},!0}window(t,{muted:n=()=>!1}={}){const a=[];this.followInterval(),this.applyJump(this.nextBeat());for(let i=0;i<4096;i++){const s=this.nextBeat();if(!(s<t))break;if(n())this.advanceStep();else{const l=this.stepHit(s);l&&a.push(l)}this.advance()}this.barStyleActive()?a.push(...this.barHits(i=>i<t,n)):this.syncBars();const r=[];for(const i of a)r.push(...gw(i,++this.serial));return r.sort((i,s)=>i.startBeat-s.startBeat)}}const vr=1,vw=8;function ww(e,t,n,a,r){return`${e}|${t}|${n}|${a}|${r}`}function Yl(e,t,n,a,r={}){const i=new Map;return fw(n,a,r).map(s=>{const l=i.get(s.hit)??0;return i.set(s.hit,l+1),{...s,id:ww(e,t,s.role,s.hit,l),source:e}})}const xw=(e,t)=>({v:vr,kind:"notes",source:e,events:t}),Fa=(e,t,n)=>({v:vr,kind:"off",source:e,reason:t,...n===void 0?{}:{atBeat:n}}),kw=e=>({v:vr,kind:"routes",routes:e}),$w=(e,t,n)=>({v:vr,kind:"audition",source:e,events:t,holdSec:n}),mt=1e-9;function Ew(e={}){const t=new Map,n=new Map,a=new Set,r={sent:{notes:0,off:0,routes:0,audition:0},events:0,errors:0},i=()=>e.nowBeat?.()??null,s=new Set,l=()=>{for(const h of[...s])try{h()}catch{}},u=(h,y)=>{const k=n.get(h);if(k){r.sent[y.kind]++,y.kind==="notes"&&(r.events+=y.events.length);try{k(y)}catch{r.errors++}}},d=h=>{const y=[];for(const k of t.values()){const v=k.targets.get(h);v?.on&&y.push({source:k.handle.id,name:k.handle.name,role:v.role,...v.octave===void 0?{}:{octave:v.octave},...v.transpose?{transpose:v.transpose}:{}})}return y},c=h=>u(h,kw(d(h))),p=(h,y,k)=>{const v=h.targets.get(y);if(!v?.on||!k.length)return;const T=Xl(Yl(h.handle.id,h.run,k,v.role,{...v.octave===void 0?{}:{octave:v.octave}}),v.transpose??0);T.length&&u(y,xw(h.handle.id,T))},f=(h,y)=>{const k=[...h.current,...h.kept.filter(T=>T.startBeat<y-mt)];if(!k.length)return[];let v=k[0];for(const T of k)T.startBeat>v.startBeat+mt&&(v=T);return k.filter(T=>T.hit===v.hit&&Math.abs(T.startBeat-v.startBeat)<=mt)},g=(h,y)=>{const k=i();if(k===null)return h.kept;const v=h.kept.filter(T=>T.startBeat>=k-mt);return a.has(y)?[...f(h,k),...v]:v},m=h=>{const y=i();y!==null&&h.kept.length&&h.kept[0].startBeat<y-mt&&(h.current=f(h,y),h.kept=h.kept.filter(k=>k.startBeat>=y-mt))};function w(h,y){const k=t.get(h);k&&k.handle.remove();const v={handle:void 0,run:1,kept:[],current:[],targets:new Map,status:null,takeBack:null},T=()=>t.get(h)===v,M={id:h,name:y,send(b){if(!T()||!b.length)return;m(v);const x=b.map(S=>({...S}));v.kept.push(...x);for(const S of v.targets.keys())p(v,S,x)},audition(b,x){if(!T()||!b.length||!(x>0))return;const S=Math.min(x,vw),$=b.map(B=>({...B})),L=()=>{if(T())for(const[B,V]of v.targets){if(!V.on||a.has(B))continue;const K=Xl(Yl(h,0,$,V.role,{...V.octave===void 0?{}:{octave:V.octave}}),V.transpose??0);K.length&&u(B,$w(h,K,S))}};let N;try{N=e.startAudio?.()}catch{N=void 0}N?N.then(L,L):L()},restart(){T()&&(v.run++,v.kept=[],v.current=[])},off(b,x){if(T()){v.kept=x===void 0?[]:v.kept.filter(S=>S.startBeat<x-mt),(x===void 0||v.current.some(S=>S.startBeat>=x-mt))&&(v.current=[]);for(const[S,$]of v.targets)$.on&&u(S,Fa(h,b??"stop",x))}},setTarget(b,x){if(!T()||typeof b!="string"||!b)return;const S=v.targets.get(b),$=Sw(x.transpose),L={role:x.role,on:x.on===!0,...x.octave===void 0?{}:{octave:x.octave},...$?{transpose:$}:{}};v.targets.set(b,L);const N=S&&(S.role!==L.role||S.octave!==L.octave||(S.transpose??0)!==(L.transpose??0))&&S.on;S?.on&&(!L.on||N)&&u(b,Fa(h,"off")),(!S||S.on!==L.on||N)&&c(b),L.on&&(!S?.on||N)&&p(v,b,g(v,b)),(!S||S.on!==L.on)&&l()},removeTarget(b){const x=v.targets.get(b);!T()||!x||(v.targets.delete(b),x.on&&(u(b,Fa(h,"removed")),c(b)))},targets:()=>[...v.targets].map(([b,x])=>({target:b,...x})),remove(){if(!T())return;const b=[...v.targets].filter(([,x])=>x.on).map(([x])=>x);for(const x of b)u(x,Fa(h,"removed"));t.delete(h);for(const x of b)c(x);l()},status(b){if(!T())return;const x=b&&typeof b.now=="string"&&typeof b.next=="string"?{now:b.now.slice(0,32),next:b.next.slice(0,32)}:null;JSON.stringify(x)!==JSON.stringify(v.status)&&(v.status=x,l())},onTakeBack(b){T()&&(v.takeBack=typeof b=="function"?b:null)}};return v.handle=M,t.set(h,v),M}return{source:w,sources:()=>[...t.values()].map(h=>h.handle),host:h=>({notesIn(y,k){if(typeof y!="function")return()=>{};const v=k?.takes==="pitch",T=!n.has(h)||a.has(h)!==v;n.set(h,y),v?a.add(h):a.delete(h),T&&l(),c(h);for(const M of t.values())M.targets.get(h)?.on&&p(M,h,g(M,h));return()=>{n.get(h)===y&&(n.delete(h),a.delete(h),l())}},notesSource:y=>w(h,String(y).slice(0,64)),notesTakeBack(y){const k=t.get(y);if(!k?.takeBack||!k.targets.has(h))return null;try{const v=k.takeBack(h);return v==null?null:structuredClone(v)}catch{return null}}}),routesFor:d,listening:h=>n.has(h),takesPitch:h=>n.has(h)&&a.has(h),drop(h){n.delete(h),a.delete(h);for(const y of[...t.values()])y.handle.id===h?y.handle.remove():y.targets.delete(h);l()},statuses:()=>[...t.values()].filter(h=>h.status!==null).map(h=>({source:h.handle.id,name:h.handle.name,status:{...h.status}})),onChange(h){return s.add(h),()=>s.delete(h)},stats:()=>({sent:{...r.sent},events:r.events,errors:r.errors})}}function Sw(e){return typeof e=="number"&&Number.isFinite(e)?Math.max(-48,Math.min(48,Math.round(e))):0}function Xl(e,t){if(!t)return e;const n=a=>Math.max(0,Math.min(127,a+t));return e.map(a=>({...a,note:n(a.note),root:n(a.root)}))}const Aw=.5,Mw=20;function Tw(e,t,n={}){const a=n.aheadSec??Aw,r=n.now??ze;let i={...hw,...n.settings};const s=n.seed??1,l=()=>new Io(()=>i,{random:Gl(s),chordRandom:Gl(s+1),beatsPerBar:()=>Math.max(1,t.transport.meter?.beatsPerBar??4)});let u=null,d=0,c=!1;const p=()=>{const h=t.transport;if(!u||!h.running)return;const y=u.window(h.beatAt(r()+a));y.length&&(d+=y.length,e.send(y))},f=(h,y)=>{u=l(),e.restart(),u.start(h,{join:y}),p()},g=t.onChange(h=>{if(!c){if(h.kind==="start")f(h.beat,!1);else if(h.kind==="stop")u=null,e.off("stop");else if(h.kind==="snapshot"){const y=t.transport;!y.running&&u?(u=null,e.off("stop")):y.running&&!u&&f(y.beatAt(Math.max(y.startTime??r(),r())),!0)}}}),m=(n.ticker??(h=>gh(h,{intervalMs:Mw})))(p);m.start();const w=t.transport;return w.running&&f(w.beatAt(Math.max(w.startTime??r(),r())),!0),{source:e,set(h){i={...i,...h}},settings:()=>i,sent:()=>d,remove(){c||(c=!0,g(),m.dispose(),e.remove())}}}const Po="studio";function Lw(){let e=null;const t=new Set,n=new Set,a=new Set,r=new Map,i=d=>{try{return r.get(d)?.()===!0}catch{return!1}},s=d=>{for(const c of[...d])try{c()}catch{}},l=d=>{if(d!==e){e=d;for(const c of n)c()}},u=(d,c)=>(d.add(c),()=>{d.delete(c)});return{owner:()=>e,claim(d){e===null&&l(d)},claimAll(){l(Po),s(t)},clear:()=>l(null),onAll:d=>u(t,d),member(d,c){return r.set(d,c),()=>{r.get(d)===c&&r.delete(d)}},out(d){for(const c of r.keys())if(c!==d&&i(c))return;s(a)},drop:d=>{r.delete(d)},onLastOut:d=>u(a,d),playing:()=>[...r.keys()].filter(i),onChange:d=>u(n,d)}}const Jl="netcomposer.studio.plugins.frozen.v1",Cw=2e3;function Nw(e,t){const n=[],a=new Set;for(const r of t)r.plugin?.status!=="failed"||r.plugin.error!==Ua[6]||(a.add(r.id),e.has(r.id)||n.push(r));for(const r of[...e])a.has(r)||e.delete(r);for(const r of a)e.add(r);return n}function Fw(e){const t=new Map;for(const n of e)for(const a of n)a.plugin?.status==="ready"&&!t.has(a.plugin.id)&&t.set(a.plugin.id,a.plugin.name);return[...t].map(([n,a])=>({id:n,name:a}))}function Iw(e){let t=[];const n=()=>{if(!e)return t;try{const r=JSON.parse(e.getItem(Jl)??"[]");return Array.isArray(r)?r.filter(i=>typeof i=="string"):[]}catch{return[]}},a=r=>{t=r;try{e?.setItem(Jl,JSON.stringify(r))}catch{}};return{has:r=>n().includes(r),list:n,add(r){a([...new Set([...n(),...r])])},clear(r){const i=n();i.includes(r)&&a(i.filter(s=>s!==r))}}}function Pw(e){let t=!1;const n=(e.watch??af)(e.ctx,{stallMs:e.stallMs??Cw,onStall:()=>{if(t)return;const a=e.running();a.length&&(t=!0,n.stop(),e.onFrozen(a))}});return{stop:()=>n.stop()}}const Rw="NetComposer Studio",rt=[40,240],Dw="nc-sync";function zw(e,t=globalThis.navigator?.locks){const n=`/studio/${e}`;return{channel:`${Dw}${n}`,locks:t?{request:(a,r,i)=>t.request(`${a}${n}`,r,i)}:null}}function Ow(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}const Bw=.2,Ql=.5;function jw(e,t,n){const a=new nh({bpm:120,minBpm:rt[0],maxBpm:rt[1],timebase:"shared"}),r=new bh({app:Rw,version:"0.1.0",clock:a,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:rt},startLeadSeconds:Bw,...n?{startGate:()=>n(),gatedStartLeadSeconds:Ql}:{},...t?{channel:t.channel,locks:t.locks}:{},audio:()=>{const u=e();return u==="running"?"running":u==="closed"?"none":"needs-gesture"}});let i=!1,s=0,l=!1;return{clock:a,peer:r,async start(){i||(i=!0,await r.start())},play(){const u=n?.()??null;if(!u){l=!1,a.play({at:ze()});return}const d=++s,c=ze();l=!0;const p=()=>{d!==s||!l||(l=!1,r.isLeader&&!a.transport.running?(a.commitStart(Math.max(c,ze())+Ql,0),r.publishState()):a.play({at:ze()}))};u.then(p,p)},stop(){l&&(l=!1,s++,!a.transport.running)||a.stop({at:ze()})},setTempo:u=>a.setTempo({bpm:qw(u)}),playing:()=>a.transport.isPlayingAt(ze()),running:()=>l||a.transport.running,bpm:()=>a.transport.bpm,position(){const u=a.transport,d=ze();return u.isPlayingAt(d)?_w(u.beatAt(d)):null},beatPhase(){const u=a.transport,d=ze();if(!u.isPlayingAt(d))return null;const c=u.beatAt(d);return c-Math.floor(c)},peers:()=>[...r.peers.values()]}}function qw(e){return Number.isFinite(e)?Math.min(rt[1],Math.max(rt[0],Math.round(e*10)/10)):120}function _w(e){const t=Math.max(0,Math.floor(e));return{bar:Math.floor(t/4)+1,beat:t%4+1}}const Wi="netcomposer.scene",Hu=1,Ro="netcomposer.studio.tempo.v1",Do="netcomposer.studio.scene-name.v1",or=120,zo="Untitled scene",Vw=2*1024*1024;function wr(e){const t=typeof e=="number"?e:Number(e);return Number.isFinite(t)?Math.min(rt[1],Math.max(rt[0],Math.round(t*10)/10)):or}function Wt(e){return(typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,60):"")||zo}function Hw(e){return{format:Wi,v:Hu,name:Wt(e.name),saved:(e.now??new Date).toISOString(),tempo:{bpm:wr(e.bpm)},meter:[4,4],instances:e.instances.map(t=>({id:t.id,type:t.type,name:t.name})),mix:e.mix,presets:e.presets??{},media:e.media??[]}}function Uw(e,t){if(e.length>Vw)return{ok:!1,error:"That file is too large to be a Scene."};let n;try{n=JSON.parse(e)}catch{return{ok:!1,error:"That file isn't a Scene (it isn't JSON)."}}if(!n||typeof n!="object")return{ok:!1,error:"That file isn't a Scene."};const a=n;if(a.format!==Wi)return{ok:!1,error:"That file isn't a Scene. Load an instrument's own file from that instrument."};if((typeof a.v=="number"?a.v:0)<1)return{ok:!1,error:"That Scene has no version."};const i=new Set,s=[];for(const d of Array.isArray(a.instances)?a.instances:[]){if(!d||typeof d!="object")continue;const c=d.id;if(typeof c!="string")continue;const p=So(c);if(!p||!t.includes(p.type)||i.has(c))continue;i.add(c);const f=d.name;s.push({id:c,type:p.type,name:Qd(f,"")})}if(!s.length)return{ok:!1,error:"That Scene has no instruments this Studio knows."};const l=a.tempo&&typeof a.tempo=="object"?a.tempo.bpm:void 0,u={};if(a.presets&&typeof a.presets=="object")for(const[d,c]of Object.entries(a.presets))i.has(d)&&(u[d]=c);return{ok:!0,scene:{format:Wi,v:Hu,name:Wt(a.name),saved:typeof a.saved=="string"?a.saved:"",tempo:{bpm:wr(l)},meter:[4,4],instances:s,mix:ku(a.mix??ea()),presets:u,media:Array.isArray(a.media)?a.media:[]}}}function Gw(e){return`${Wt(e).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"scene"}.scene.json`}function Ww(e){try{const t=e?.getItem(Ro);return t?wr(Number(t)):or}catch{return or}}function Uu(e,t){try{t?.setItem(Ro,String(wr(e)))}catch{}}function Kw(e){try{return Wt(e?.getItem(Do))}catch{return zo}}function Gu(e,t){try{t?.setItem(Do,Wt(e))}catch{}}const Ki="netcomposer.studio.reset-pending.v1",Oo="netcomposer.studio.reset-undo.v1",Bo="netcomposer.studio.legacy-copy.v1",Zl="nyx.scene-samples",Yw=3e4,Xw=[Eo,Lo,Ro,Do,Bo];function Jw(e){return e.includes("@studio/")||Xw.includes(e)}function Wu(e){const t=[];for(let n=0;n<e.length;n++){const a=e.key(n);a!==null&&Jw(a)&&t.push(a)}return t}const Qw=/^[0-9a-f]{16,64}$/;function Zw(e){const t=new Set,n=(a,r)=>{if(!(!a||typeof a!="object"||r>6))for(const[i,s]of Object.entries(a))i==="sample"&&typeof s=="string"&&Qw.test(s)?t.add(s):n(s,r+1)};try{n(JSON.parse(e),0)}catch{}return[...t]}function ex(e,t){const n=new Set;for(const[i,s]of Object.entries(t))if(i.startsWith("nyx.state"))for(const l of Zw(s))n.add(l);if(!n.size)return;let a=[];try{const i=JSON.parse(e.getItem(Zl)??"[]");Array.isArray(i)&&(a=i.filter(s=>typeof s=="string"))}catch{}const r=[...a.filter(i=>!n.has(i)),...n].slice(-2048);e.setItem(Zl,JSON.stringify(r))}function tx(e,t){for(const n of[t,e])try{const a=n?.getItem(Oo);if(!a)continue;const r=JSON.parse(a);if(r?.v===1&&r.keys&&typeof r.keys=="object")return r}catch{}return null}function xr(e,t){for(const n of[t,e])try{n?.removeItem(Oo)}catch{}}function nx(e,t,n=Date.now()){const a={};for(const s of Wu(e)){const l=e.getItem(s);l!==null&&(a[s]=l)}const r=JSON.stringify({v:1,at:n,keys:a});try{ex(e,a)}catch{}for(const s of Object.keys(a))e.removeItem(s);try{t?.removeItem(za)}catch{}xr(e,t);let i=!1;for(const s of[t,e])if(!(i||!s))try{s.setItem(Oo,r),i=!0}catch{}if(!i){for(const[s,l]of Object.entries(a))e.setItem(s,l);return!1}try{e.setItem(Bo,"off")}catch{}return!0}function ax(e,t){const n=tx(e,t);if(!n)return!1;for(const a of Wu(e))e.removeItem(a);xr(e,t);for(const[a,r]of Object.entries(n.keys))typeof r=="string"&&e.setItem(a,r);return!0}function rx(e){try{return e?.getItem(Bo)==="off"}catch{return!1}}function jo(){try{return globalThis.sessionStorage??null}catch{return null}}function ix(e,t){try{return e?.setItem(Ki,t),!!e}catch{return!1}}function ox(e,t){if(!e)return null;let n=null;try{n=t?.getItem(Ki)??null,t?.removeItem(Ki)}catch{n=null}try{if(n==="reset")return nx(e,t)?"reset":"failed";if(n==="undo")return ax(e,t)?"undo":null;xr(e,t)}catch{}return null}const Ku="netcomposer.studio.picker.v1",ec="http://127.0.0.1:5177",sx=1,pn=16,tc=64*1024*1024,nc=[1e3,2e3,5e3,1e4],lx=new Set(["127.0.0.1","localhost","[::1]"]);function qo(e){if(typeof e!="string"||!e||e.length>64)return null;let t;try{t=new URL(e)}catch{return null}return t.protocol!=="http:"||!lx.has(t.hostname)||!t.port||t.username||t.password||e.replace(/\/$/,"")!==t.origin?null:t.origin}function Yu(e){try{const t=JSON.parse(e?.getItem(Ku)??"null"),n=t&&typeof t=="object"?t:{};return{on:n.on===!0,address:qo(n.address)??ec}}catch{return{on:!1,address:ec}}}function Yi(e,t){try{e?.setItem(Ku,JSON.stringify(t))}catch{}}function cx(e){let t=[];try{const n=e.pads();Array.isArray(n)&&(t=n)}catch{}return Array.from({length:pn},(n,a)=>{const r=t[a]&&typeof t[a]=="object"?t[a]:{};return{pad:a+1,name:typeof r.name=="string"?r.name.slice(0,40):"",filled:r.filled===!0}})}const ci=e=>({ok:!1,placed:[],left:[],message:e}),di=e=>Array.isArray(e)?e.filter(t=>Number.isInteger(t)&&t>=1&&t<=pn).slice(0,16):[];function dx(e){const t=e&&typeof e=="object"?e:{};return{ok:t.ok===!0,placed:(Array.isArray(t.placed)?t.placed:[]).flatMap(n=>{const a=n&&typeof n=="object"?n:{},[r]=di([a.from]),[i]=di([a.to]);return r&&i?[{from:r,to:i}]:[]}).slice(0,pn),left:di(t.left),message:typeof t.message=="string"?t.message.slice(0,400):""}}function ux(e){const t=e&&typeof e=="object"?e:{};return t.type!=="kit"||typeof t.id!="string"||!/^[\w-]{1,40}$/.test(t.id)||typeof t.target!="string"||!t.target||t.target.length>64?null:{id:t.id,target:t.target,mode:t.mode==="fill"?"fill":"replace"}}function px(e){const t=new Map,n=new Map,a=new Set,r=new Map,i=e.now??(()=>Date.now()),s=e.setTimeout??(($,L)=>setTimeout($,L)),l=e.clearTimeout??($=>clearTimeout($)),u=$=>e.live?.($)??!0;let d="off",c="",p=0,f=null,g=null,m="";const w=$=>{$!==d&&(d=$,e.onStatus?.($))},h=()=>[...t.entries()].filter(([$])=>u($)).map(([$,L])=>{const N=e.brandOf?.($);return{id:$,name:(e.nameOf?.($)??$).slice(0,40),...N?{brand:N.slice(0,40)}:{},shown:e.shown?.()===$,seen:n.get($)??0,pads:cx(L)}}),y=$=>{const L=h();return m=JSON.stringify(L),JSON.stringify({v:sx,studio:e.studio,label:(e.label?.()??"Studio").slice(0,60),targets:L,results:[...r.entries()].map(([N,B])=>({id:N,...B})),wait:$})},k=($,L)=>e.fetch(`${c}/api/studio/poll`,{method:"POST",headers:{"content-type":"application/json"},body:y($),cache:"no-store",...L?{signal:L}:{},targetAddressSpace:"loopback"}),v=async($,L)=>{if(!$.ok)throw new Error(`the picker said ${$.status}`);const N=await $.json();if(L!==p)return;if(w("on"),Array.isArray(N.ack))for(const V of N.ack)typeof V=="string"&&r.delete(V);const B=Array.isArray(N.commands)?N.commands:[];for(const V of B.slice(0,4)){const K=ux(V);K&&x(K,L)}},T=async $=>{let L=0,N=!1;for(;$===p;){const B=new AbortController;f=B;try{await v(await k(N,B.signal),$),L=0,N=!0}catch{if($!==p)return;N=!1,w("away");const V=nc[Math.min(L++,nc.length-1)];await new Promise(K=>s(K,V))}}},M=()=>{!c||g!==null||(g=s(()=>{g=null;const $=p;!c||d!=="on"||!r.size&&JSON.stringify(h())===m||k(!1).then(L=>v(L,$)).catch(()=>{})},150))},b=async $=>{const L=await e.fetch($,{cache:"no-store",targetAddressSpace:"loopback"});if(!L.ok){const N=await L.json().catch(()=>({}));throw new Error(typeof N.error=="string"?N.error.slice(0,120):`the picker said ${L.status}`)}return L},x=async($,L)=>{if(r.has($.id))return;let N;const B=t.get($.target);if(!B||!u($.target))N=ci("That NYX isn't in the Studio any more.");else if(a.has($.target))N=ci("NYX is still loading the last kit.");else{a.add($.target);try{const V=await(await b(`${c}/api/kit/manifest`)).json(),K=Array.isArray(V.sounds)?V.sounds:[];if(!K.length)throw new Error("the picker's pads are empty");if(K.length>pn)throw new Error(`more than ${pn} sounds`);const ne={};for(const be of K){const ce=be&&typeof be=="object"?be.pad:null;if(typeof ce!="number"||!Number.isInteger(ce)||ce<1||ce>pn||ne[ce])throw new Error("a sound has no pad of its own");const se=await b(`${c}/api/kit/audio?pad=${ce}`);if(Number(se.headers.get("content-length")??0)>tc)throw new Error(`pad ${ce}'s sound is too big`);const Y=await se.arrayBuffer();if(Y.byteLength>tc)throw new Error(`pad ${ce}'s sound is too big`);ne[String(ce)]=Y}if(L!==p)return;e.reveal?.($.target),N=dx(await B.receive(V,$.mode,ne))}catch(V){N=ci(`Not loaded: ${V.message||"it went wrong"}.`)}finally{a.delete($.target)}}L===p&&(r.set($.id,N),M())},S=()=>{p++,f?.abort(),f=null,g!==null&&l(g),g=null,c="",r.clear(),w("off")};return{host($){return{pickerTarget(L){return t.set($,L),M(),{changed:M,remove(){t.get($)===L&&t.delete($),M()}}}}},start($){const L=qo($);L&&(S(),c=L,w("connecting"),T(++p))},stop:S,seen($){n.set($,i()),t.has($)&&M()},changed:M,forget($){t.delete($),n.delete($),M()},targets:h,get status(){return d}}}const hx=300,fx=120*1e3;function mx(e){return Object.prototype.toString.call(e)==="[object Float32Array]"}function gx(e){const t=e&&typeof e=="object"?e:null;if(!t)return{ok:!1,message:"No audio."};const n=typeof t.name=="string"?t.name.trim().slice(0,64):"";if(!n)return{ok:!1,message:"The audio has no name."};const a=t.sampleRate;if(typeof a!="number"||!Number.isFinite(a)||a<8e3||a>192e3)return{ok:!1,message:"The sample rate is out of range (8–192 kHz)."};const r=t.channels;if(!Array.isArray(r)||r.length<1||r.length>2)return{ok:!1,message:"The audio needs one or two channels."};if(!r.every(mx))return{ok:!1,message:"Channels must be 32-bit float arrays."};const i=r[0].length;if(i===0)return{ok:!1,message:"The audio is empty."};if(r.some(u=>u.length!==i))return{ok:!1,message:"The channels differ in length."};if(i>hx*a)return{ok:!1,message:"The audio is longer than five minutes."};const s=typeof t.bars=="number"&&Number.isInteger(t.bars)&&t.bars>=1&&t.bars<=256?t.bars:void 0,l=typeof t.bpm=="number"&&Number.isFinite(t.bpm)&&t.bpm>=20&&t.bpm<=300?t.bpm:void 0;return{ok:!0,audio:{name:n,sampleRate:a,channels:r.map(u=>new Float32Array(u)),...s===void 0?{}:{bars:s},...l===void 0?{}:{bpm:l}}}}function ac(e){try{const t=e.targets();return Array.isArray(t)?t.flatMap(n=>{if(!n||typeof n.id!="string"||!n.id)return[];const a=typeof n.name=="string"&&n.name?n.name.slice(0,64):n.id;return[{id:n.id,name:a,...n.filled?{filled:!0}:{}}]}):[]}catch{return[]}}function bx(e={}){const t=new Map,n=s=>e.live?.(s)??!0,a=s=>e.nameOf?.(s)??s,r=e.answerMs??fx,i=s=>[...t.entries()].filter(([l])=>l!==s&&n(l)).map(([l,u])=>{const d=e.brandOf?.(l);return{instance:l,name:a(l),...d?{brand:d}:{},label:typeof u.label=="string"&&u.label?u.label.slice(0,24):"Target",targets:ac(u)}});return{forget(s){t.delete(s)},host(s){return{audioReceivers:()=>i(s),async sendAudio(l,u,d){const c=t.get(l);if(l===s||!c||!n(l))return{ok:!1,reason:"gone",message:"That instrument isn't in the Studio."};if(typeof d!="string"||!ac(c).some(m=>m.id===d))return{ok:!1,reason:"invalid",message:`No ${d} there.`};const p=gx(u);if(!p.ok)return{ok:!1,reason:"invalid",message:p.message};const f={...p.audio,from:s,fromName:e.brandOf?.(s)??a(s)};let g;try{const m=await Promise.race([Promise.resolve(c.receive(f,d)),new Promise(w=>{g=setTimeout(()=>w({ok:!1,reason:"timeout",message:"No answer."}),r)})]);return!m||typeof m!="object"||typeof m.ok!="boolean"?{ok:!1,reason:"error",message:"The instrument didn't answer."}:m}catch(m){return{ok:!1,reason:"error",message:m instanceof Error?m.message:String(m)}}finally{clearTimeout(g)}},onAudio(l){return t.set(s,l),()=>{t.get(s)===l&&t.delete(s)}},reveal(){n(s)&&e.reveal?.(s)}}}}}const yx="/studio/assets/silence-processor-BBLKD9j-.js";function vx(e,t=Mo){const n=t.find(i=>i.id===e.type),a=(n?.name??e.type).toUpperCase(),r=String(e.n).padStart(2,"0");return{brand:n?.brand??a,rest:e.custom&&e.name?` / ${e.name.toUpperCase()}`:` / ${a} / ${r}`,...n?.identity?{identity:n.identity}:{}}}const Xi=lm,nt=sm,ui={system:"System",light:"Light",dark:"Dark"};function wx(e){try{return oo(e?.getItem(Xi))}catch{return"system"}}function xx(e,t){try{t==="system"?e?.removeItem(Xi):e?.setItem(Xi,t)}catch{}}const kx=e=>nt[(nt.indexOf(e)+1)%nt.length]??"system";function $x(e){try{return e.contentDocument?.documentElement?e.contentDocument:null}catch{return null}}function Xu(e,t){const n=$x(e);n&&so(t,n)}function Ex(e,t){const n=document.createElement("div");n.className="theme",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Theme"),n.dataset.theme="";let a=e;const r=nt.map(s=>{const l=document.createElement("button");l.type="button",l.className="ghost theme-choice",l.setAttribute("role","radio"),l.dataset.themeChoice=s;const u=document.createElement("span");return u.className="theme-word",u.textContent=ui[s],l.append(u),l.setAttribute("aria-label",`${ui[s]} theme`),l.title=s==="system"?"Follow this computer's light or dark setting":`${ui[s]} theme`,l.addEventListener("click",()=>{const d=n.closest(".nc-page-menu[data-nc-open]")!==null,c=s===a&&!d?kx(s):s;i(c),t(c),r[nt.indexOf(c)]?.focus({preventScroll:!0})}),l});n.append(...r);function i(s){a=s;for(const l of r){const u=l.dataset.themeChoice===s;l.setAttribute("aria-checked",u?"true":"false"),l.tabIndex=u?0:-1}}return i(e),n.addEventListener("keydown",s=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(s.key))return;s.preventDefault();const l=s.key==="ArrowLeft"||s.key==="ArrowUp"?-1:1,u=(nt.indexOf(a)+l+nt.length)%nt.length,d=nt[u]??"system";i(d),t(d),r[u]?.focus()}),{el:n,get choice(){return a},set:i}}function Sx(e,t){const n=e.addModule.bind(e),a=new Map;return Object.defineProperty(e,"addModule",{value:(i,s)=>{const l=new URL(String(i),t).href;let u=a.get(l);return u||(u=n(i,s),a.set(l,u),u.catch(()=>{a.get(l)===u&&a.delete(l)})),u},configurable:!0}),e}const Rn=ox($e(),jo()),Q=new AudioContext({latencyHint:"interactive"});Sx(Q.audioWorklet,location.href);const _o=Iw($e()),Ax=new URLSearchParams(location.search).has("plugins"),Mx=Ax,Yn=_y({ctx:Q,moduleUrl:_n,base:location.href,remote:Mx,store:yy(),frozen:_o});function rc(e,t){Yn?.restore(e.getChain().flatMap(r=>r.plugin?[r.plugin]:[])),Vo.add(e);let n=e.getChain().length;const a=new Set;return e.onChange(r=>{if(r.key==="error"||r.key==="plugin"){st?.render();for(const s of Nw(a,e.getChain()))rn({message:O.stuck(s.plugin?.name??s.name,t()),duration:12e3,anchor:document.querySelector("[data-nc-area='fx']")}).el.dataset.pluginStuck=s.plugin?.id??s.id}const i=e.getChain().length;i!==n&&(n=i,queueMicrotask(()=>st?.render()))}),e}function Tx(e){return le.list().find(t=>t.id===e)?.name??e}const Vo=new Set,Ne=Fy(),wn={},Lx=Ru,kr=new Map,le=new Rv(Q,{restore:e=>Ne.channels[e],fx:e=>{const t=Br(Q,{moduleUrl:_n,bpm:120,state:lu(e,Ne)});return wn[e]=t,t},masterFx:()=>{const e=Br(Q,{moduleUrl:_n,bpm:120,slots:Bi,state:R0(Ne,Bi)});return e.onChange(ra),rc(e,()=>"Master")},channelFx:e=>{lr.delete(e);const t=Br(Q,{moduleUrl:_n,bpm:H.bpm(),slots:Lx,state:Ne.channelFx[e]??{v:2,chain:[]}}),n=zc(t,H.clock,{mapper:lt}),a=t.dispose.bind(t);return t.dispose=()=>{n(),a()},t.onChange(ra),kr.set(e,t),t.dispose=(r=>()=>{Vo.delete(t),r()})(t.dispose),rc(t,()=>Tx(e))}});le.setMaster(Ne.master);le.setReturn("a",Ne.returns.a);le.setReturn("b",Ne.returns.b);let Ju=()=>!1;const lt=new hh(Q,{hold:()=>Ju()});lt.start();const Qu=Ow();let Zu=()=>{};const ep=ny(Q.sampleRate),$r=B0(Q,{nodeFor:e=>le.tapNode(e),latencyFor:e=>le.tapLatency(e,ep.get()),sources:()=>[{id:"master",name:"Master"},...le.list().map(e=>({id:e.id,name:e.name}))],ready:new Promise(e=>{Zu=e})}),je=Lw(),hn=w0(()=>{try{return globalThis.sessionStorage??null}catch{return null}}),da=e=>j.some(t=>t.id===e),tp=e=>j.find(t=>t.id===e)?.name??e,np=e=>{const t=j.find(a=>a.id===e),n=Ae.find(a=>a.id===t?.type)?.brand;return t&&n?t.n===1?n:`${n} ${t.n}`:void 0},Er=e=>{ot(e),document.getElementById(`tab-${e}`)?.scrollIntoView({block:"nearest"}),qe.get(e)?.contentWindow?.focus()},ap=bx({live:da,nameOf:tp,brandOf:np,reveal:Er}),wt=px({fetch:(e,t)=>fetch(e,t),studio:`studio-${Math.random().toString(36).slice(2,10)}`,label:()=>qt.value.trim()||"Studio",live:da,nameOf:tp,brandOf:np,shown:()=>Re,reveal:Er,onStatus:e=>Xo(e)});let rp=!1;const Ho=N0(),ip=L0({now:()=>Q.currentTime,labelOf:e=>{const t=j.find(a=>a.id===e),n=Ae.find(a=>a.id===t?.type)?.brand??t?.name??e;return t&&t.n>1?`${n} ${t.n}`:n},clearOf:()=>[hp,Gt,bp]}),St=Ew({nowBeat:()=>{const e=H.clock.transport;return e.running?e.beatAt(ze()):null},startAudio:()=>Q.state==="running"?void 0:ia()}),Ji=new Set,Sr=()=>{for(const e of[...Ji])try{e()}catch{}};St.onChange(()=>{Sr(),Cx()});window.ncStudio=$0(Q,le,{notes:St,clock:()=>H.clock,targets:{list:()=>j.map(e=>({instance:e.id,name:e.name,type:e.type,n:e.n,takesNotes:St.listening(e.id),takesPitch:St.takesPitch(e.id)})),listen(e){return Ji.add(e),()=>Ji.delete(e)}},show:e=>{da(e)&&Er(e)},countIn:ip.api,holdFirstPlay:e=>{const t=Ho.hold(),n=ve.hold(e);return()=>{t(),n()}},attached:e=>ve.attached(e),presets:hn,share:ap,picker:wt,legacyCopy:()=>!rx(Ee()),grab:$r,play:je,mapper:j0(lt),resolve:(e,t)=>Px(e,t),syncScope:Qu,fxWorklet:new URL(_n,location.href).href});const H=jw(()=>Q.state,zw(Qu),()=>rp&&Q.state==="running"&&lt.ready&&Ho.count===0&&ve.settled()?null:Ox());Ju=()=>H.clock.transport.isPlayingAt(ze());function Ee(){try{return globalThis.localStorage??null}catch{return null}}H.setTempo(Ww(Ee()));const Se=new K0(Q,()=>le.tapNode("master"));let Bt=null,op=!0;const Le=new J0(Q,()=>le.tapNode("master"),Y0(Ee()));let sp=null;function P(e,t={},...n){const a=document.createElement(e);for(const[r,i]of Object.entries(t))i===void 0||i===!1||a.setAttribute(r,i===!0?"":String(i));return a.append(...n),a}const At=P("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),xn=P("input",{type:"number",class:"bpm",min:rt[0],max:rt[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),sr=P("output",{class:"position","aria-label":"Bar and beat"},"—"),xt=P("button",{type:"button",class:"btn rec","aria-pressed":"false","data-state":"idle","data-nc-help":ee["transport:rec"]},"Rec"),Ut=P("button",{type:"button",class:"btn keep","aria-haspopup":"menu","aria-expanded":"false","aria-controls":"keep-menu","aria-keyshortcuts":"K","data-nc-help":ee["transport:keep"]},"Keep"),lp=P("div",{class:"keep-held","data-nc-help":ee["keep:held"]}),Uo=[...q0.map(e=>({choice:()=>({last:e}),label:`Keep last ${e/60} min`,key:String(e)})),{choice:e=>({since:e}),label:"Keep since Play",key:"since"}],ua=Uo.map(e=>P("button",{type:"button",role:"menuitem",class:"keep-item","data-keep":e.key},e.label)),ta=lo({checked:Le.keeping,labelledBy:"keep-switch-label",onChange:e=>{X0(Ee(),e),Le.setKeeping(e),_e(e?"Keeping: on":"Keeping: off (nothing held)")}}),Ye=P("div",{class:"keep-menu",id:"keep-menu",role:"menu","aria-label":"Keep",hidden:!0},lp,...ua,P("div",{class:"keep-switch","data-nc-help":ee["keep:switch"]},P("span",{id:"keep-switch-label"},"Keeping"),ta.el)),cp=P("div",{class:"keep-wrap"},Ut,Ye),On=P("a",{class:"take",hidden:!0}),jt=P("button",{type:"button",class:"notes-chip",hidden:!0});jt.addEventListener("click",()=>{const e=jt.dataset.source;e&&da(e)&&Er(e)});function Cx(){const e=St.statuses().filter(i=>da(i.source));jt.hidden=e.length===0;const t=e[0];if(!t)return;jt.dataset.source=t.source;const{now:n,next:a}=t.status,r=`${n}${a&&a!==n?` → ${a}`:""}`;jt.replaceChildren(P("span",{class:"notes-chip-dot","aria-hidden":"true"}),P("span",{class:"notes-chip-name"},t.name),P("span",{class:"notes-chip-chord"},r),...e.length>1?[P("span",{class:"notes-chip-count",title:`${e.length} CALLIOPEs playing`},String(e.length))]:[]),jt.setAttribute("aria-label",`${t.name} plays ${r}. Show it.`)}const zt=P("span",{class:"status",role:"status"}),qt=P("input",{type:"text",class:"scene-name",maxlength:60,value:Kw(Ee()),"aria-label":"Scene name",title:"Scene name (used when you Save)"}),dp=P("button",{type:"button",class:"ghost","data-scene":"save",title:"Save this Scene as a file"},"Save"),up=P("button",{type:"button",class:"ghost","data-scene":"load",title:"Load a Scene file"},"Load"),pp=P("button",{type:"button",class:"ghost","data-scene":"new",title:"Start a new Scene"},"New"),Xn=P("input",{type:"file",accept:".json,application/json",hidden:!0}),Mt=P("button",{type:"button",class:"ghost picker-link","data-picker":"off","aria-pressed":"false"},P("span",{class:"picker-dot","aria-hidden":"true"}),"Picker"),Go=Ex(wx(Ee()),e=>{xx(Ee(),e),so(e);for(const t of qe.values())Xu(t,e)});so(Go.choice);const hp=P("h1",{class:"brand","aria-label":"NetComposer Studio"},P("span",{"aria-hidden":"true"},"NetComposer",P("span",{class:"brand-sep"}," / "),"Studio")),Qi=P("span",{class:"beat-light","aria-hidden":"true"}),sn=P("span",{class:"status-long"}),ln=P("span",{class:"status-short"});zt.append(sn,ln);const Gt=P("header",{class:"top"},P("div",{class:"transport"},At,P("label",{class:"tempo"},xn,P("span",{class:"tempo-unit"},"BPM")),Qi,sr),P("div",{class:"record-col"},P("div",{class:"record"},xt,cp,On),jt),zt),fp=uy();py(Gt.querySelector(".transport"),fp);const Wo=P("div",{class:"scene-actions"},qt,dp,up,pp,Mt,Go.el),mp=P("button",{type:"button",class:"ghost menu-reset","data-reset":"menu"},"Reset Studio…");mp.addEventListener("click",()=>void Pp(gp.button));Wo.append(mp);const gp=_b({panel:Wo}),Zi=P("button",{type:"button",class:"foot-reset","data-reset":"foot"},"Reset Studio…");Zi.addEventListener("click",()=>void Pp(Zi));const Nx=P("footer",{class:"studio-foot"},Zi),bp=P("div",{class:"scene",role:"group","aria-label":"Scene"},Wo,Xn,gp.button);Se.supported||(xt.disabled=!0,xt.title="This browser can't record audio",Ut.disabled=!0);const En=P("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),Ar=P("div",{class:"stage"}),pa=P("label",{class:"tab tab-add",title:"Add an instrument"},P("span",{"aria-hidden":"true"},"+")),fn=P("select",{class:"tab-add-select","aria-label":"Add an instrument"});fn.append(P("option",{value:""},"Add an instrument"),...Mo.map(e=>{const t=P("option",{value:e.id},e.available===!1?`${e.name} (soon)`:e.name);return t.disabled=e.available===!1,t}));fn.addEventListener("change",()=>{const e=fn.value;fn.value="",e&&Mp(e)});pa.append(fn);En.append(pa);Ob();const na=P("div",{class:"spine","aria-hidden":"true"}),qe=new Map;let j=a0(n0(Ae),Ae),Re=j[0]?.id??"";const yp=new URLSearchParams(location.search).has("measure"),ic=new Map,Ko=o0((e,t)=>fetch(e,t));for(const e of j)Ko(e.src);const Fx=2e4,ve=p0(j.map(e=>{const t=Ae.find(a=>a.id===e.type),n=t?.brand??e.name;return{id:e.id,brand:e.n>1?`${n} ${e.n}`:n,name:t?.name??e.name}})),vp=new Set,Jn=new Map;for(const e of j){let t=()=>{};const n=new Promise(a=>{t=a});Jn.set(e.id,{go:t,turn:n})}function wp(e){const t=P("button",{type:"button",role:"tab",id:`tab-${e.id}`,"aria-controls":`panel-${e.id}`,class:"tab"},e.name);Lp(t,e),t.addEventListener("click",()=>ot(e.id)),En.insertBefore(t,pa);const n=ic.get(e.type)??Promise.resolve(),a=Ko(e.src),r=Promise.all([n,a,Jn.get(e.id)?.turn]).then(([,i])=>new Promise(s=>{if(!j.some(d=>d.id===e.id))return s();const l=P("iframe",{id:`panel-${e.id}`,role:"tabpanel","aria-labelledby":`tab-${e.id}`,title:e.name,src:Zd(e,yp,i),allow:"autoplay; clipboard-read; clipboard-write; microphone"});qe.set(e.id,l),ve.requested(e.id),window.setTimeout(()=>ve.fail(e.id),l0),l.addEventListener("load",()=>{vp.add(e.id),ve.loaded(e.id),Cr()},{once:!0});const u=window.setTimeout(s,Fx);l.addEventListener("load",()=>Ix(l)),l.addEventListener("load",()=>{window.clearTimeout(u),s()},{once:!0}),Ar.append(l),ot(Re)}));return ic.set(e.type,r),r}const xp=window.matchMedia(Uc);function kp(e){try{e.contentDocument?.documentElement.toggleAttribute("data-nc-landscape",xp.matches)}catch{}}xp.addEventListener("change",()=>{for(const e of qe.values())kp(e)});function Ix(e){let t=null;try{t=e.contentDocument}catch{return}if(!t?.documentElement)return;t.documentElement.dataset.ncHosted="",Xu(e,Go.choice),kp(e);const n=e.id.replace(/^panel-/,""),a=()=>{const i=t?.querySelector(".nc-page"),s=i?i.getBoundingClientRect().height:t?.documentElement.scrollHeight??0;s>0&&(e.style.height=`${Math.ceil(s)}px`);const l=t?.querySelector(".nc-page-hd, .nc-title-band");l&&(Ep.set(n,Math.round(l.getBoundingClientRect().bottom)),n===Re&&Sp())};a();const r=t.querySelector(".nc-page")??t.body;r&&new ResizeObserver(()=>{a(),Mr()}).observe(r),Yo.add(e),$p(e)}const Yo=new Set;function $p(e){let t;try{t=e.contentDocument?.documentElement}catch{return}if(!t||!e.isConnected){Yo.delete(e);return}const n=e.getBoundingClientRect();if(n.height<=0)return;const a=getComputedStyle(Gt).position==="sticky"?Gt.getBoundingClientRect().bottom:0,r=Math.min(n.height,Math.max(0,a-n.top)),i=Math.max(r,Math.min(n.height,window.innerHeight-n.top));t.style.setProperty("--nc-host-top",`${Math.round(r)}px`),t.style.setProperty("--nc-host-height",`${Math.round(i-r)}px`),t.style.setProperty("--nc-host-bottom",`${Math.round(n.height-i)}px`)}let pi=!1;function Mr(){pi||(pi=!0,requestAnimationFrame(()=>{pi=!1;for(const e of Yo)$p(e)}))}window.addEventListener("scroll",Mr,{passive:!0});window.addEventListener("resize",Mr);const Ep=new Map;function Sp(){const e=Ep.get(Re);e===void 0?na.style.removeProperty("--spine-top"):na.style.setProperty("--spine-top",`${e}px`)}function Ap(e){if(!e){na.replaceChildren();return}const t=vx(e),n=P("span",{class:"spine-brand"},t.brand);t.identity&&(n.style.color=`var(--nc-ui-${t.identity})`),na.replaceChildren(P("span",{class:"spine-text"},n,P("span",{class:"spine-rest"},t.rest)))}function ot(e){Re=e,Cr(),wt.seen(e),Ap(j.find(t=>t.id===e)),Sp(),Mr();for(const t of j){const n=t.id===e;qe.get(t.id)?.classList.toggle("shown",n);const a=document.getElementById(`tab-${t.id}`);a?.setAttribute("aria-selected",String(n)),a?.setAttribute("tabindex",n?"0":"-1")}}const Px=s0(()=>j.map(e=>({instance:e,window:()=>qe.get(e.id)?.contentWindow,readyState:()=>{try{return qe.get(e.id)?.contentDocument?.readyState}catch{return}}})),Ae);function Mp(e){Dp();const t=Ae.find(r=>r.id===e);if(!t)return;const n=e0(j,t),a=j.map(r=>r.type).lastIndexOf(n.type);j=a<0?[...j,n]:[...j.slice(0,a+1),n,...j.slice(a+1)],$n(j),wp(n),Sr();for(const r of j){const i=document.getElementById(`tab-${r.id}`);i&&En.insertBefore(i,pa)}ot(n.id),st?.render()}function Rx(e,t){const n=j.find(l=>l.id===e);if(!n)return;const a=j.filter(l=>l.id!==e),r=l=>Ae.find(u=>u.id===l.type)?.sound===!1,i=a.reduce((l,u,d)=>r(u)?l:d,-1),s=t===null?r(n)?a.length:i+1:a.findIndex(l=>l.id===t);j=[...a.slice(0,s<0?a.length:s),n,...a.slice(s<0?a.length:s)],$n(j);for(const l of j){const u=document.getElementById(`tab-${l.id}`);u&&En.insertBefore(u,pa)}st?.render()}function Dx(e,t){j=Zb(j,e,t,Ae),$n(j);const n=j.find(r=>r.id===e);if(!n)return;const a=document.getElementById(`tab-${e}`);a&&Lp(a,n),qe.get(e)?.setAttribute("title",n.name),Sr(),Re===e&&Ap(n),le.rename(e,n.name)}async function Tp(e,t){const n=j.find(u=>u.id===e),a=n?.name??e,r=Ae.find(u=>u.id===n?.type)?.sound===!1;if(!await Ge({title:`Remove ${a}?`,body:r?"Its tab goes, and what it plays stops. Its settings stay in this browser.":`Its channel, strip and mix settings go. ${a}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:t}))return;Dp(),j=j.filter(u=>u.id!==e),$n(j),ap.forget(e),wt.forget(e),St.drop(e);const s=je.playing().includes(e);je.drop(e),s&&je.out(e);const l=qe.get(e);qe.delete(e),ve.remove(e),l?.setAttribute("src","about:blank"),l?.remove(),document.getElementById(`tab-${e}`)?.remove(),le.detach(e),zx(e),Yy($e(),e),Re===e&&ot(j[0]?.id??""),Sr()}function Lp(e,t){const n=Ae.find(s=>s.id===t.type);if(n?.sound!==!1){e.textContent=t.name;return}const a=P("span",{class:"tab-dot","aria-hidden":"true"});n.identity&&(a.style.background=`var(--nc-ui-${n.identity})`);const r=P("span",{class:"tab-remove",role:"button",tabindex:"0","aria-label":`Remove ${t.name}`,title:`Remove ${t.name}`});r.textContent="×";const i=s=>{s.stopPropagation(),Tp(t.id,e)};r.addEventListener("click",i),r.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&i(s)}),e.replaceChildren(a,P("span",{},t.name),r)}const eo=P("div",{class:"mix"});eo.addEventListener("click",e=>{const n=e.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==Re&&j.some(a=>a.id===n)&&ot(n)});let st=null,aa=0;const lr=new Set;function zx(e){lr.add(e),delete Ne.channels[e],delete Ne.channelFx[e],kr.delete(e),ra()}let Tr=!1;function ra(){window.clearTimeout(aa),!Tr&&(aa=window.setTimeout(()=>{Eu(Cp())},300))}function Cp(){const e={...Ne.channels};for(const r of le.list())e[r.id]=r.strip;for(const r of lr)delete e[r];const t={};for(const r of["a","b"]){const i=wn[r];i&&(t[r]=i.getState())}const n=le.masterFx?.getState()??null,a={...Ne.channelFx};for(const[r,i]of kr)a[r]=i.getState();for(const r of lr)delete a[r];return{v:1,channels:e,master:le.masterPositionValue,returns:{a:{on:le.returns.a.on,level:le.returns.a.level},b:{on:le.returns.b.on,level:le.returns.b.level}},insert:{on:n?D0(n):Ne.insert.on},fx:t,channelFx:a,masterFx:n??Ne.masterFx}}le.onChange(()=>{st?.render(),ra()});for(const e of Object.values(wn))e?.onChange(ra);async function ia(){Q.state!=="running"&&await Q.resume()}const oc=1500;async function Ox(){ve.settled()||(ia(),await ve.whenSettled());const e=performance.now()+oc;await Promise.race([ia(),new Promise(t=>setTimeout(t,oc))]),await lt.whenSettled(Math.max(0,e-performance.now())),await Promise.race([Ho.idle(),new Promise(t=>setTimeout(t,Math.max(0,e-performance.now())))])}At.addEventListener("click",()=>{ia(),H.running()&&je.owner()===Po?H.stop():H.running()?je.claimAll():(je.claimAll(),H.play()),Ie()});function Np(){const e=Number(xn.value);H.setTempo(e),Uu(H.bpm(),Ee())}qt.addEventListener("change",()=>{qt.value=Wt(qt.value),Gu(qt.value,Ee())});function Bx(e,t,n){const a=URL.createObjectURL(new Blob([t],{type:n})),r=P("a",{href:a,download:e});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e4)}dp.addEventListener("click",()=>void Fp());async function Fp(){const e=Wt(qt.value),t=j.map(i=>i.id),n=await hn.collect(t),a=Hw({name:e,bpm:H.bpm(),instances:j,mix:Cp(),presets:n});Bx(Gw(e),`${JSON.stringify(a,null,2)}
`,"application/json");const r=j.filter(i=>!n[i.id]).map(i=>i.name);_e(r.length?`Saved “${e}” (without ${r.join(", ")}: ${r.length===1?"it hasn't":"they haven't"} loaded yet)`:`Saved “${e}”`)}up.addEventListener("click",()=>Xn.click());Xn.addEventListener("change",async()=>{const e=Xn.files?.[0];if(Xn.value="",!e)return;const t=Uw(await e.text(),Ae.filter(r=>r.available!==!1).map(r=>r.id));if(!t.ok){_e(t.error);return}const n=t.scene;await Ge({title:`Load “${n.name}”?`,body:"The music stops and the Studio reloads with this Scene's instruments, their sounds and patterns, the mix and the tempo. Save the current Scene first to keep it.",confirmLabel:"Load"})&&Ip({name:n.name,bpm:n.tempo.bpm,instances:n.instances,mix:n.mix,presets:n.presets})});pp.addEventListener("click",async()=>{await Ge({title:"Start a new Scene?",body:"The music stops and the Studio reloads with one of each instrument, a fresh mix and 120 BPM. Each instrument keeps its own sound and pattern. Save the current Scene first to keep it.",confirmLabel:"New"})&&Ip({name:zo,bpm:or,instances:Zn(Ae),mix:ea()})});function Ip(e){H.running()&&H.stop(),Tr=!0,window.clearTimeout(aa);const t=e.instances.map(({id:n,name:a})=>{const[r,i]=n.split("#"),s=Ae.find(l=>l.id===r);return s?kn(s,i?Number(i):1,a):null}).filter(n=>n!==null);$n(t),Eu(e.mix),Uu(e.bpm,Ee()),Gu(e.name,Ee()),hn.stash({...e.presets??{}}),location.reload()}async function Pp(e){const t=["Kept: your samples, LUCY takes and Scene files.","Kept: theme, folds and meters."];Se.state==="recording"?t.push({text:"Rec is recording: its take will be lost.",tone:"danger"}):Bt&&!op&&t.push({text:`Your last Rec take (${Bt.take.seconds.toFixed(1)} s) isn't saved.`,tone:"danger"}),await Ge({title:"Reset the Studio?",body:"The music stops and the Studio starts over: one of each instrument at its factory sound and pattern, a fresh mix, 120 BPM. You can undo it for 30 seconds.",lines:t,extra:{label:"Save Scene first",onAction:()=>void Fp()},confirmLabel:"Reset",danger:!0,returnFocus:e})&&Rp("reset")}function Rp(e){if(!ix(jo(),e)){_e("This browser can't reset the Studio");return}H.running()&&H.stop(),Tr=!0,window.clearTimeout(aa),location.reload()}let to=null;function jx(){const e=rn({message:"Studio reset",actionLabel:"Undo",duration:Yw,anchor:Gt,onAction:()=>Rp("undo"),onClose:t=>{to=null,t!=="action"&&xr($e(),jo())}});e.el.dataset.resetUndo="",to=e}function Dp(){to?.close("close")}let sc=0;function _e(e){sn.textContent=e,ln.textContent=e,window.clearTimeout(sc),sc=window.setTimeout(Ie,4e3)}xn.addEventListener("change",Np);xn.addEventListener("keydown",e=>{e.key==="Enter"&&Np()});xt.addEventListener("click",()=>{ia();const e=Se.state;e==="recording"?qx():e==="arming"||e==="armed"?(Se.cancel(),_e("Rec cancelled")):e==="idle"&&(Se.arm(H.playing()),zp())});async function qx(){const e=await Se.stop();e&&(Bt&&URL.revokeObjectURL(Bt.url),Bt={url:URL.createObjectURL(e.blob),take:e},On.href=Bt.url,On.download=e.name,On.textContent=`Save take (${e.seconds.toFixed(1)} s)`,On.hidden=!1,op=!1)}function zp(){const e=Se.state;if(e!=="arming"&&e!=="armed")return;const t=H.clock.transport;if(!t.running||t.startTime===null){Se.schedule(null);return}const n=Math.round(lt.toContextTime(t.startTime)*Q.sampleRate);Se.schedule(n+$r.latency("master"))}function _x(){const e=Se.state,t=e==="arming"||e==="armed",n=e==="recording"||e==="stopping";xt.dataset.state=t?"armed":n?"recording":"idle",xt.setAttribute("aria-pressed",String(n)),xt.textContent=t?"Armed":n?"Stop rec":"Rec",xt.disabled=e==="stopping"||!Se.supported,Ie()}Se.onChange(_x);let oa=null;function Vx(){const e=H.clock.transport;!e.running||e.startTime===null||(oa=Math.round(lt.toContextTime(e.startTime)*Q.sampleRate)+$r.latency("master"))}function Op(){return!H.clock.transport.running||oa===null?null:{origin:oa,barFrames:240/H.bpm()*Q.sampleRate}}function Bp(e){const t=Uo[e];return!t||t.key==="since"&&oa===null?null:t.choice(oa??0)}function Lr(){const e=!Ye.hidden;if(Ut.setAttribute("aria-expanded",String(e)),Ut.dataset.keeping=Le.keeping?"on":"off",!e)return;ta.checked!==Le.keeping&&ta.set(Le.keeping);const t=Le.status,n=du(t)/(t.sampleRate||Q.sampleRate);lp.textContent=Le.keeping?`${ji(n)} of sound held`:"Keeping is off";const a=Op();ua.forEach((r,i)=>{const s=Bp(i),l=s?Le.plan(s,a):null;r.disabled=!l;const u=Uo[i];u?.key==="since"&&(r.textContent=l?`Keep since Play (${ji((l.to-l.from)/(t.sampleRate||Q.sampleRate))})`:u.label)})}Le.onChange(Lr);function jp(){Ye.hidden&&(Ye.hidden=!1,Le.refresh(),Lr(),(ua.find(e=>!e.disabled)??ta.el).focus())}function ha(e=!1){Ye.hidden||(Ye.hidden=!0,Lr(),e&&Ut.focus())}Ut.addEventListener("click",()=>{Ye.hidden?jp():ha()});document.addEventListener("pointerdown",e=>{!Ye.hidden&&!cp.contains(e.target)&&ha()});Ye.addEventListener("keydown",e=>{if(e.key==="Escape"){e.preventDefault(),ha(!0);return}if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;e.preventDefault();const t=[...ua.filter(r=>!r.disabled),ta.el],n=t.indexOf(document.activeElement);t[(n+(e.key==="ArrowDown"?1:t.length-1))%t.length]?.focus()});ua.forEach((e,t)=>e.addEventListener("click",()=>{const n=Bp(t);n&&Hx(n)}));async function Hx(e){ha(!0);const t=await Le.keep(e,{grid:Op(),bpm:H.bpm()});if(!t){_e("Nothing held to keep");return}sp=t;const n=URL.createObjectURL(t.blob);P("a",{href:n,download:t.name}).click(),window.setTimeout(()=>URL.revokeObjectURL(n),6e4),_e(`Kept ${ji(t.seconds)} as a WAV`)}document.addEventListener("keydown",e=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey||e.key!=="k"&&e.key!=="K")return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable)||Ut.disabled||(e.preventDefault(),Ye.hidden?jp():ha(!0))});document.addEventListener("keydown",e=>{if(e.code!=="Space"||e.repeat)return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable)||(e.preventDefault(),At.click())});En.addEventListener("keydown",e=>{if(e.target===fn)return;const t=j.map(r=>r.id),n=t.indexOf(Re),a=e.key==="ArrowRight"?t[(n+1)%t.length]:e.key==="ArrowLeft"?t[(n-1+t.length)%t.length]:null;a&&(e.preventDefault(),ot(a),document.getElementById(`tab-${a}`)?.focus())});function Ie(){const e=H.running()&&je.owner()===Po;At.textContent=e?"Stop":"Play",At.setAttribute("aria-pressed",String(e)),document.activeElement!==xn&&(xn.value=String(Math.round(H.bpm()*10)/10));const t=H.position();sr.value=t?`${t.bar}.${t.beat}`:"—";const n=H.peers().length;sn.textContent=Q.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",ln.textContent=Q.state==="running"?"":"Audio off";const a=Se.state==="arming"||Se.state==="armed";a&&(sn.textContent="Rec armed: waiting for sound",ln.textContent="Rec armed"),zt.classList.toggle("off",Q.state!=="running");const{done:r,total:i}=ve.counts(),s=!ve.settled(),l=!s&&cr>0&&performance.now()-cr<qp;if(zt.classList.toggle("loading",s),zt.classList.toggle("just-ready",l),s)sn.textContent=`Loading the Studio… ${r} of ${i} instruments ready`,ln.textContent=`Loading ${r}/${i}`,zt.classList.remove("off");else if(l&&!a){const u=ve.items().filter(d=>d.state==="failed");sn.textContent=u.length?`Studio ready: ${u.map(d=>d.brand).join(", ")} didn't load`:"Studio ready: press Play",ln.textContent="Ready",zt.classList.remove("off")}}const qp=2500;let cr=0;H.clock.onChange(()=>{H.clock.transport.running&&(rp=!0),Vx(),Lr(),H.running()||je.clear(),zp(),Ie()});je.onChange(Ie);je.onLastOut(()=>{H.running()&&H.stop(),Ie()});H.clock.onChange(()=>st?.render());H.peer.onPeers(Ie);Q.addEventListener("statechange",Ie);const Ux=.25;let lc=performance.now();function _p(e){const t=Math.min(.1,(e-lc)/1e3);lc=e,st?.frame(t);const n=H.position(),a=n?`${n.bar}.${n.beat}`:"—";sr.value!==a&&(sr.value=a);const r=H.beatPhase(),i=r!==null&&r<Ux;Qi.hasAttribute("data-on")!==i&&Qi.toggleAttribute("data-on",i),requestAnimationFrame(_p)}const Vp=P("ul",{class:"boot-list"}),Hp=P("div",{class:"boot-panel"},P("p",{class:"boot-title"},"Loading the Studio"),Vp,P("p",{class:"boot-note"},"Play is ready once every instrument is in."));Ar.append(Hp);let cc=!1;function Cr(){const e=ve.items(),{done:t,total:n}=ve.counts(),a=ve.settled();if(a&&!cr&&(cr=performance.now(),document.documentElement.dataset.studioLoaded="",window.setTimeout(Ie,qp)),cc){Ie();return}cc=a,document.documentElement.toggleAttribute("data-studio-loading",!a),Gt.style.setProperty("--boot-done",String(n?t/n:1)),At.disabled=!a,a?At.removeAttribute("data-nc-help"):At.setAttribute("data-nc-help",ee["transport:play-loading"]),Vp.replaceChildren(...e.map(i=>P("li",{class:"boot-item","data-boot":i.state},P("span",{class:"boot-mark","aria-hidden":"true"}),P("span",{class:"boot-name"},P("span",{class:"boot-brand"},i.brand)," ",P("span",{class:"boot-type"},i.name)),P("span",{class:"boot-word"},d0[i.state]))));for(const i of j){const s=document.getElementById(`tab-${i.id}`),l=a?void 0:e.find(u=>u.id===i.id)?.state;l?s?.setAttribute("data-boot",l):s?.removeAttribute("data-boot")}const r=a||vp.has(Re);Hp.hidden=r,Ar.classList.toggle("booting",!r),Ie()}ve.onChange(Cr);function Gx(e){Ko(e.src).then(t=>{const n=new URL(Zd(e,yp,t),location.href).href;return fetch(n,{priority:"low"}).then(a=>a.ok?a.text():"").then(a=>{for(const r of g0(a,n))document.head.querySelector(`link[rel="prefetch"][href="${CSS.escape(r)}"]`)||document.head.append(P("link",{rel:"prefetch",href:r}))})}).catch(()=>{})}function Wx(){const e=h0(j.map(t=>t.id),Re);f0(e,t=>{if(Jn.get(t)?.go(),t===e[0])for(const n of j)n.id!==t&&Gx(n);return ve.whenDone(t)},()=>m0()).then(()=>{for(const t of Jn.values())t.go();Jn.clear()})}async function Kx(){const e=document.getElementById("app");if(!e)throw new Error("Missing #app");e.replaceChildren(hp,Gt,bp,eo,P("main",{class:"instruments"},En,P("div",{class:"bay"},na,Ar),Nx),ip.el),st=Sv(eo,le,{order:()=>j.map(t=>t.id),catalogue:Mo.filter(t=>t.sound!==!1),bpm:()=>H.bpm(),onAdd:Mp,onRemove:(t,n)=>void Tp(t,n),onReorder:(t,n)=>Rx(t,n),onRename:(t,n)=>Dx(t,n),...Yn?{plugins:Yn}:{}}),Cr(),Q.state==="running"&&await Q.suspend(),await Q.audioWorklet.addModule(yx),fp.start(Q,!0),Zu(),Se.attach(),Le.attach(),await H.start();for(const t of[wn.a,wn.b,le.masterFx])t&&zc(t,H.clock,{mapper:lt});for(const t of j)wp(t);Wx(),ot(Re),Ie(),requestAnimationFrame(_p),window.setInterval(()=>le.parkIdleReturns(),Iv),document.documentElement.dataset.studioReady="",Rn&&(document.documentElement.dataset.studioReset=Rn),Rn==="reset"?jx():Rn==="undo"?_e("Reset undone"):Rn==="failed"&&_e("Couldn't reset: this browser's storage is full"),Xx(),Qx(),Yn&&Pw({ctx:Q,running:()=>Fw([...Vo].map(t=>t.getChain())),onFrozen:Yx})}async function Yx(e){_o.add(e.map(a=>a.id)),window.clearTimeout(aa),Tr=!0;const t=e.map(a=>a.name).join(", ");document.documentElement.dataset.pluginsFrozen=e.map(a=>a.id).join(" "),_e(`${t} froze the audio`),await Ge({title:O.frozenTitle,body:O.frozenBody(t),confirmLabel:O.frozenOpen,cancelLabel:O.frozenStay})&&window.open(location.href,"_blank")}function Xx(){const e=new Set(hn.pending());if(!e.size)return;const t=[],n=i=>j.find(s=>s.id===i)?.name??i,a=()=>{window.clearTimeout(r);const i=[...t,...hn.dropPending()].map(n);_e(i.length?`Scene loaded; ${i.join(", ")} kept ${i.length===1?"its":"their"} own sound`:"Scene loaded")};hn.onApplied((i,s)=>{e.delete(i)&&(s||t.push(i),e.size||a())});const r=window.setTimeout(a,y0)}window.__studio={ctx:Q,mixer:le,grab:$r,recorder:Se,get lastTake(){return Bt?.take??null},keeper:Le,get lastKeep(){return sp},limiterDelay:ep,mapper:lt,transport:H,frames:qe,show:ot,get instances(){return j},fx:wn,plugins:Yn,frozen:_o,channelCores:kr,get mix(){return st},notes:{bus:St,dev:(e,t,n={})=>{const a=Tw(St.source(e,e),H.clock,{settings:t});for(const[r,i]of Object.entries(n))a.source.setTarget(r,{role:i.role,on:i.on??!0,...i.octave===void 0?{}:{octave:i.octave}});return a}}};Kx();function Xo(e){Mt.dataset.picker=e,Mt.setAttribute("aria-pressed",String(e==="on"||e==="connecting"||e==="away")),Mt.dataset.ncHelp=ee[`picker:${e}`]}Xo("off");async function Jx(){if(["127.0.0.1","localhost","[::1]"].includes(location.hostname))return"granted";try{return(await navigator.permissions.query({name:"loopback-network"})).state}catch{return"unknown"}}async function Qx(){let e=Yu(Ee());const t=new URLSearchParams(location.search).get("picker");if(t!==null){const a=t?qo(t):e.address;a&&(e={on:!0,address:a},Yi(Ee(),e))}if(!e.on)return;const n=await Jx();n==="granted"||n==="unknown"?wt.start(e.address):Xo(n==="denied"?"blocked":"ask")}Mt.addEventListener("click",()=>void Zx());async function Zx(){const e=Yu(Ee()),t=Mt.dataset.picker;if(t==="ask"||t==="blocked"){wt.start(e.address);return}if(wt.status!=="off"){if(!await Ge({title:"Disconnect the Sample Picker?",body:"Its Send to NYX won't reach this Studio until you connect it again.",confirmLabel:"Disconnect",returnFocus:Mt}))return;Yi(Ee(),{...e,on:!1}),wt.stop();return}await Ge({title:"Connect the Sample Picker?",body:`The Studio talks to the Sample Picker on this computer (${e.address}), so its Send to NYX loads the pads of your NYX here. Chrome may ask to let this site reach this computer: allow it.`,confirmLabel:"Connect",returnFocus:Mt})&&(Yi(Ee(),{...e,on:!0}),wt.start(e.address))}
